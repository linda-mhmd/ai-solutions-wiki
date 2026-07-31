---
title: "What is Async/Await?"
description: "Making JavaScript wait for things. Promises, async functions, and why your code runs out of order."
date: 2026-07-30
level: 1
categories: [Basics]
tags: [beginner, javascript, async, promises, programming]
faqs:
  - question: "Why does my code run out of order?"
    answer: "JavaScript doesn't wait for slow operations by default. It starts the operation, moves on, and handles the result later. This is asynchronous execution. Without await, your code continues before the data arrives."
  - question: "When do I need async/await?"
    answer: "Whenever you're doing something slow that returns a Promise: API calls (fetch), database queries, file operations, timers. If it might take time, it's probably async."
  - question: "What's the difference between async/await and .then()?"
    answer: "They do the same thing differently. async/await looks like normal code (top to bottom). .then() chains callbacks. async/await is usually easier to read and debug. Use whichever your codebase uses, but async/await is more common now."
last_updated: 2026-07-30
---

{{< quickanswer >}}
`async/await` makes JavaScript wait for slow operations (like API calls) before continuing. Without it, JavaScript starts the operation and immediately moves on, causing "undefined" errors because the data hasn't arrived yet. Put `await` before anything that takes time, and `async` before the function that contains it.
{{< /quickanswer >}}

## The problem

JavaScript doesn't wait:

```javascript
const response = fetch('/api/users');  // Starts fetching
console.log(response);  // Doesn't wait—logs a Promise, not the data
```

Output: `Promise { <pending> }`

The fetch started, but JavaScript moved on immediately. The data isn't there yet.

## The solution: await

```javascript
const response = await fetch('/api/users');  // Waits for response
const data = await response.json();          // Waits for parsing
console.log(data);  // Now we have the actual data
```

`await` means: "Stop here and wait until this finishes."

## You need async to use await

`await` only works inside an `async` function:

```javascript
// This won't work (await outside async)
const data = await fetch('/api/users');

// This works
async function getUsers() {
  const response = await fetch('/api/users');
  const data = await response.json();
  return data;
}
```

Mark the function with `async`:
```javascript
async function myFunction() { ... }
const myFunction = async () => { ... }
```

## What's actually happening

When you call an async operation:

1. **Operation starts** (request sent, timer begins)
2. **JavaScript continues** (doesn't block)
3. **Operation completes** (response received)
4. **Promise resolves** (result is available)

Without `await`, step 2 happens immediately—before you have the result.

With `await`, JavaScript pauses that function until step 4.

## Common patterns

### Fetching data

```javascript
async function getUser(id) {
  const response = await fetch(`/api/users/${id}`);
  
  if (!response.ok) {
    throw new Error('User not found');
  }
  
  const user = await response.json();
  return user;
}

// Using it
const user = await getUser(123);
console.log(user.name);
```

### Sequential operations

```javascript
async function processOrder(orderId) {
  // These happen one after another
  const order = await getOrder(orderId);
  const payment = await processPayment(order);
  const shipping = await createShipping(order);
  
  return { order, payment, shipping };
}
```

### Parallel operations

When operations don't depend on each other, run them simultaneously:

```javascript
async function getDashboardData(userId) {
  // These run at the same time—faster!
  const [user, orders, notifications] = await Promise.all([
    getUser(userId),
    getOrders(userId),
    getNotifications(userId)
  ]);
  
  return { user, orders, notifications };
}
```

### Handling errors

```javascript
async function fetchUser(id) {
  try {
    const response = await fetch(`/api/users/${id}`);
    const user = await response.json();
    return user;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    return null;  // Or throw, or return default
  }
}
```

## Common mistakes

### Forgetting await

```javascript
// Bug: returns Promise, not data
async function getUser() {
  return fetch('/api/user').then(r => r.json());  // Missing await is fine here
}

const user = getUser();  // Missing await here—user is a Promise!
console.log(user.name);  // undefined
```

Fix:
```javascript
const user = await getUser();
```

### Using await in non-async function

```javascript
// Error: SyntaxError
function getUser() {
  const response = await fetch('/api/user');  // Can't await here
}
```

Fix:
```javascript
async function getUser() {  // Add async
  const response = await fetch('/api/user');
}
```

### Await in loops (sequential when parallel is better)

```javascript
// Slow: waits for each one before starting next
for (const id of userIds) {
  const user = await getUser(id);  // One at a time
  users.push(user);
}

// Fast: starts all at once
const users = await Promise.all(
  userIds.map(id => getUser(id))
);
```

### Not handling errors

```javascript
// If this fails, it throws and crashes
const data = await fetch('/api/data').then(r => r.json());

// Better: handle the error
try {
  const data = await fetch('/api/data').then(r => r.json());
} catch (error) {
  // Handle failure
}
```

## Promises: what's under the hood

`async/await` is built on Promises. A Promise represents a future value:

```javascript
// A Promise
const promise = fetch('/api/users');
// promise is a Promise that will eventually have the response

// Getting the value with .then()
promise.then(response => {
  console.log(response);
});

// Same thing with await
const response = await promise;
console.log(response);
```

### Promise states

- **Pending**: Still working
- **Fulfilled**: Completed successfully (has value)
- **Rejected**: Failed (has error)

### .then() vs await

They do the same thing:

```javascript
// With .then()
fetch('/api/users')
  .then(response => response.json())
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error(error);
  });

// With async/await
async function getUsers() {
  try {
    const response = await fetch('/api/users');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}
```

`async/await` is usually easier to read and debug.

## In React

### useEffect with async

```jsx
// Wrong: useEffect callback can't be async
useEffect(async () => {
  const data = await fetchData();  // Don't do this
}, []);

// Right: create async function inside
useEffect(() => {
  async function loadData() {
    const data = await fetchData();
    setData(data);
  }
  loadData();
}, []);

// Or with IIFE
useEffect(() => {
  (async () => {
    const data = await fetchData();
    setData(data);
  })();
}, []);
```

### Loading states

```jsx
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadUser() {
      try {
        setLoading(true);
        const data = await fetchUser(userId);
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadUser();
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return <div>{user.name}</div>;
}
```

## Quick reference

```javascript
// Mark function as async
async function myFunction() { }
const myFunction = async () => { }

// Wait for a Promise
const result = await someAsyncFunction();

// Wait for multiple things in parallel
const [a, b, c] = await Promise.all([funcA(), funcB(), funcC()]);

// Handle errors
try {
  const result = await riskyOperation();
} catch (error) {
  // Handle error
}

// Top-level await (in modules)
const data = await fetch('/api').then(r => r.json());
```

## When you need async/await

- `fetch()` - HTTP requests
- Database queries (Prisma, MongoDB, etc.)
- File operations (`fs.promises`)
- `setTimeout`/delays
- Any function that returns a Promise
- Any function marked `async`

## Debugging async code

When things aren't working:

1. **Add console.log before and after await**
   ```javascript
   console.log('About to fetch');
   const data = await fetch('/api/users');
   console.log('Fetch complete', data);
   ```

2. **Check if you're awaiting**
   ```javascript
   const data = fetchUsers();  // Forgot await?
   console.log(typeof data);   // "object" (Promise) not the actual data
   ```

3. **Check the Promise resolution**
   ```javascript
   const data = await fetchUsers();
   console.log('Data received:', data);  // undefined? Check what fetchUsers returns
   ```

## Further reading

- [How to debug your code](/basics/how-to-debug-your-code/): When async code misbehaves
- [What is an API?](/basics/what-is-an-api/): What you're fetching
- [Common error messages explained](/basics/common-error-messages-explained/): Async-related errors
