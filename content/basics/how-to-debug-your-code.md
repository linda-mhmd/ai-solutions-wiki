---
title: "How to Debug Your Code"
description: "Systematic approaches to finding bugs. console.log, browser DevTools, reading error messages, and the mindset that makes debugging faster."
date: 2026-07-30
level: 1
categories: [Basics]
tags: [beginner, debugging, troubleshooting, devtools, errors, javascript]
faqs:
  - question: "How do I get better at debugging?"
    answer: "Practice and pattern recognition. The more bugs you fix, the faster you recognize common patterns. Keep a mental (or actual) list of 'things to check first' for different error types. Reading other people's code also helps—you learn to trace logic flow."
  - question: "Should I just ask AI to fix my bugs?"
    answer: "AI can help, but you'll learn faster by understanding what's wrong first. Use AI to explain error messages or suggest what to investigate. If you just paste code and say 'fix it' without understanding, you'll hit the same bugs repeatedly."
  - question: "When should I give up debugging and start over?"
    answer: "Rarely. Most bugs have specific causes. But if you've spent hours and the code is a tangled mess, sometimes rewriting a small section from scratch with clearer logic is faster than untangling it. This is different from 'delete everything and hope.'"
last_updated: 2026-07-30
---

{{< quickanswer >}}
Debugging is finding why code doesn't work as expected. The approach: understand what should happen, figure out what's actually happening, narrow down where they diverge. Tools like console.log, browser DevTools, and debuggers help you see inside your running code.
{{< /quickanswer >}}

## The debugging mindset

Bugs aren't random. Code does exactly what you told it to do—it just isn't what you meant.

**The goal**: Find where your mental model of the code differs from what the code actually does.

**The approach**:
1. What should happen?
2. What actually happens?
3. Where does it diverge?
4. Why?

## Step 1: Reproduce the bug

Before fixing anything, make sure you can reliably trigger the bug.

- What exact steps cause it?
- Does it happen every time or intermittently?
- Does it happen on all devices/browsers or just some?

**Write it down**: "Click submit with empty form → should show error → instead shows blank page"

If you can't reproduce it, you can't verify you fixed it.

## Step 2: Read the error message

Error messages tell you what's wrong. Read them carefully.

```javascript
TypeError: Cannot read properties of undefined (reading 'name')
    at UserProfile (UserProfile.jsx:15:23)
```

This tells you:
- **Error type**: TypeError
- **What happened**: Tried to read `.name` on `undefined`
- **Where**: UserProfile.jsx, line 15, column 23

Go to that line. What's supposed to have `.name`? Why might it be `undefined`?

See [Common error messages explained](/basics/common-error-messages-explained/) for specific errors.

## Step 3: Add visibility

You need to see what the code is actually doing.

### console.log (the reliable friend)

Print values to see what they are at runtime:

```javascript
function processUser(user) {
  console.log('processUser called with:', user);  // What did we receive?
  
  const name = user.name;
  console.log('name is:', name);  // What's the name value?
  
  return name.toUpperCase();
}
```

**Tips**:
- Log at the start of functions to see if they're being called
- Log variables before you use them
- Use labels: `console.log('user:', user)` not just `console.log(user)`
- Log both the variable and its type if unsure: `console.log(typeof user, user)`

### console.table (for arrays/objects)

```javascript
console.table(users);  // Shows array as formatted table
```

### console.trace (where did this come from?)

```javascript
console.trace('Called from:');  // Prints call stack
```

## Browser DevTools

Press `F12` or `Cmd+Option+I` (Mac) / `Ctrl+Shift+I` (Windows).

### Console tab
- See console.log output
- See errors (red)
- Run JavaScript directly

### Network tab
- See API requests
- Check if requests succeed/fail
- Inspect request/response data
- See timing (is something slow?)

Common checks:
- Is the request being made?
- What status code? (200, 404, 500?)
- What does the response contain?

### Elements tab
- Inspect HTML structure
- See computed CSS styles
- Check if elements exist or are hidden

### Sources tab (Debugger)
- Set breakpoints (code pauses there)
- Step through code line by line
- Inspect variables at each step

## Using the debugger

More powerful than console.log, but takes more setup.

### Set a breakpoint

1. DevTools → Sources
2. Find your file
3. Click line number to add breakpoint (blue marker)
4. Trigger the bug
5. Code pauses at breakpoint

### Or add debugger statement

```javascript
function processUser(user) {
  debugger;  // Code will pause here when DevTools is open
  return user.name.toUpperCase();
}
```

### Stepping through

When paused:
- **Step over** (F10): Execute current line, move to next
- **Step into** (F11): If current line calls a function, go inside it
- **Step out** (Shift+F11): Finish current function, return to caller
- **Continue** (F8): Run until next breakpoint

### Watch variables

While paused, hover over variables to see values. Or add to Watch panel.

## Common debugging patterns

### "It's not doing anything"

Check if the code runs at all:
```javascript
function handleSubmit() {
  console.log('handleSubmit called');  // Does this appear?
  // ...
}
```

If it doesn't appear:
- Is the function attached to the right event?
- Is the event firing? (Add console.log to event handler)
- Is there an error earlier that stops execution?

### "The data is wrong"

Log the data at each transformation:
```javascript
const raw = await fetch('/api/users');
console.log('raw response:', raw);

const data = await raw.json();
console.log('parsed data:', data);

const names = data.map(u => u.name);
console.log('mapped names:', names);
```

Find where it goes wrong.

### "It works sometimes"

Timing or race condition. Check:
- Is async data loaded before you use it?
- Are multiple things modifying the same variable?
- Does order of operations matter?

```javascript
// Bug: data might not be loaded yet
useEffect(() => {
  fetchData();
}, []);

return <div>{data.name}</div>;  // Crashes if data is undefined initially

// Fix: handle loading state
if (!data) return <div>Loading...</div>;
return <div>{data.name}</div>;
```

### "It worked before"

What changed?
- Check git diff: `git diff HEAD~5`
- Look at recent commits
- Did dependencies update?
- Did environment change?

### "It works locally but not in production"

Environment difference:
- Different environment variables?
- Different Node/Python version?
- Different database content?
- CORS or HTTPS issues?
- API endpoints pointing to wrong server?

Check deployment logs. Add logging that shows in production.

## The binary search method

For "something in this big chunk of code is broken":

1. Find the midpoint
2. Add console.log there
3. Is the data correct at midpoint?
4. If yes: bug is in second half
5. If no: bug is in first half
6. Repeat, narrowing down

## Rubber duck debugging

Explain the code out loud, line by line, to a rubber duck (or anyone/anything).

"This function receives a user object. It should have a name property. We call .toUpperCase() on name. Oh wait—what if user is null?"

Often you find the bug while explaining.

## When to ask for help

After you've:
1. Read the error message
2. Found the line where it fails
3. Verified what the actual values are
4. Formed a hypothesis and tested it
5. Spent a reasonable amount of time

Then ask with:
- What you're trying to do
- What actually happens
- What you've already tried
- Relevant code snippets
- The actual error message

This isn't gatekeeping—it's that this information is what anyone helping you needs anyway.

## Debugging checklist

When stuck, run through this:

- [ ] Read the full error message
- [ ] Find the file and line number
- [ ] Add console.log before the failing line
- [ ] Check if function is being called at all
- [ ] Verify the input data is what you expect
- [ ] Check the Network tab for API issues
- [ ] Check browser console for other errors
- [ ] Try in incognito (no extensions/cache)
- [ ] Check if it works with simpler input
- [ ] Git diff to see what changed recently
- [ ] Restart dev server (sometimes stale state)

## Preventing bugs

**Type checking**: TypeScript catches many bugs before runtime.

**Linting**: ESLint catches common mistakes.

**Testing**: Tests catch regressions before production.

**Small changes**: Commit and test frequently. Easier to find what broke.

**Handle edge cases**: What if the array is empty? What if user is null?

## Tools summary

| Tool | Use for |
|------|---------|
| console.log | Quick visibility into values |
| Browser DevTools Console | See logs and errors |
| Browser DevTools Network | Check API calls |
| Browser DevTools Debugger | Step through code |
| TypeScript | Catch type errors before runtime |
| ESLint | Catch common mistakes |
| React DevTools | React component state/props |
| Redux DevTools | State management debugging |

## Further reading

- [Common error messages explained](/basics/common-error-messages-explained/): What specific errors mean
- [What is a terminal?](/basics/what-is-a-terminal/): Where server errors appear
- [What is testing?](/basics/what-is-testing/): Catching bugs before they ship
- [What is localhost?](/basics/what-is-localhost/): Debugging local development
