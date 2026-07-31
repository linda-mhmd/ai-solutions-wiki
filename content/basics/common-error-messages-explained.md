---
title: "Common Error Messages Explained"
description: "npm ERR!, ModuleNotFoundError, 502 Bad Gateway, Cannot read property of undefined—what these errors actually mean and how to fix them."
date: 2026-07-30
level: 1
categories: [Basics]
tags: [beginner, errors, debugging, troubleshooting, npm, javascript, python]
faqs:
  - question: "Why are error messages so cryptic?"
    answer: "They're written by developers for developers, and often include technical context (stack traces, line numbers) that's useful for debugging but overwhelming for beginners. The key is learning to find the actual message in all that noise."
  - question: "Should I just copy errors into ChatGPT?"
    answer: "That works, but you'll learn faster and debug faster if you understand common patterns. Many errors have the same root cause—once you recognize 'npm ERR! ENOENT' you'll fix it in seconds instead of waiting for AI help."
  - question: "How do I know which part of the error matters?"
    answer: "Look for: the error name/type (ModuleNotFoundError), the message (what went wrong), and the location (which file, which line). Stack traces show the path the code took—the top lines are usually most relevant."
last_updated: 2026-07-30
---

{{< quickanswer >}}
Error messages tell you what went wrong, but you need to know how to read them. This guide covers the most common errors vibecoders encounter—from npm failures to server errors to JavaScript undefined errors—with plain-English explanations and fixes.
{{< /quickanswer >}}

## How to read an error message

Most error messages have three parts:

```
1. Error Type/Name    →  ModuleNotFoundError
2. Error Message      →  No module named 'requests'
3. Location/Context   →  File "app.py", line 3
```

**Focus on the message first**, then check the location. Stack traces (the long list of function calls) show you the path—start from the top.

---

## npm / Node.js errors

### npm ERR! ENOENT

```
npm ERR! code ENOENT
npm ERR! syscall open
npm ERR! path /your/project/package.json
npm ERR! errno -2
npm ERR! enoent ENOENT: no such file or directory
```

**What it means**: "ENOENT" = "Error NO ENTry" = file not found. npm can't find `package.json`.

**Fixes**:
- Are you in the right folder? Run `ls` or `dir` to check
- Run `npm init -y` to create a package.json
- You might be one folder too deep or too shallow

### npm ERR! ERESOLVE unable to resolve dependency tree

```
npm ERR! ERESOLVE unable to resolve dependency tree
npm ERR! peer dep missing: react@^17.0.0
```

**What it means**: Two packages want different versions of the same dependency.

**Fixes**:
```bash
# Try forcing it (usually works)
npm install --legacy-peer-deps

# Or use the force flag
npm install --force

# Nuclear option: delete and reinstall
rm -rf node_modules package-lock.json
npm install
```

### npm ERR! code EACCES (permission denied)

```
npm ERR! code EACCES
npm ERR! syscall mkdir
npm ERR! path /usr/local/lib/node_modules
```

**What it means**: npm is trying to install globally but doesn't have permission.

**Fixes**:
- Don't use `sudo npm install` (creates more problems)
- Install locally instead: `npm install package-name` (no `-g`)
- Fix npm permissions: [npm docs on permissions](https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally)

### Module not found: Can't resolve 'package-name'

```
Module not found: Can't resolve 'axios'
```

**What it means**: You're importing a package that isn't installed.

**Fixes**:
```bash
npm install axios
# Then restart your dev server
```

### Error: listen EADDRINUSE: address already in use :::3000

**What it means**: Something is already running on port 3000.

**Fixes**:
```bash
# Find what's using the port (Mac/Linux)
lsof -i :3000

# Kill it
kill -9 <PID>

# Or just use a different port
PORT=3001 npm run dev
```

---

## JavaScript errors

### TypeError: Cannot read properties of undefined (reading 'x')

```javascript
TypeError: Cannot read properties of undefined (reading 'name')
    at UserProfile (UserProfile.js:15)
```

**What it means**: You tried to access `.name` on something that's `undefined`.

**Common causes**:
```javascript
// The data hasn't loaded yet
const user = undefined;
console.log(user.name);  // Crash!

// The API response doesn't have what you expected
const data = { results: [] };
console.log(data.user.name);  // data.user is undefined
```

**Fixes**:
```javascript
// Optional chaining
console.log(user?.name);  // Returns undefined instead of crashing

// Check before accessing
if (user) {
  console.log(user.name);
}

// Default value
console.log(user?.name || 'Unknown');
```

### ReferenceError: x is not defined

```javascript
ReferenceError: userName is not defined
```

**What it means**: You're using a variable that doesn't exist.

**Common causes**:
- Typo in variable name (`userName` vs `username`)
- Variable declared in a different scope
- Forgot to import something

**Fix**: Check spelling, check imports, check if variable is in scope.

### SyntaxError: Unexpected token

```javascript
SyntaxError: Unexpected token ')'
SyntaxError: Unexpected end of input
```

**What it means**: The code has a syntax error—missing bracket, extra comma, etc.

**Fixes**:
- Look at the line number
- Check for missing `}` or `)`
- Check for extra commas in objects/arrays
- Use an editor with syntax highlighting

### Uncaught (in promise) Error / Unhandled promise rejection

**What it means**: An async operation failed and you didn't handle the error.

```javascript
// This will show unhandled rejection if the fetch fails
fetch('/api/data').then(r => r.json())

// Fix: add .catch() or try/catch
fetch('/api/data')
  .then(r => r.json())
  .catch(err => console.error('Fetch failed:', err));

// Or with async/await
try {
  const response = await fetch('/api/data');
  const data = await response.json();
} catch (err) {
  console.error('Fetch failed:', err);
}
```

---

## Python errors

### ModuleNotFoundError: No module named 'x'

```python
ModuleNotFoundError: No module named 'requests'
```

**What it means**: The package isn't installed.

**Fixes**:
```bash
pip install requests

# Or if you're using a virtual environment
python -m pip install requests
```

### IndentationError: unexpected indent

**What it means**: Python is very strict about indentation. Your spaces/tabs are inconsistent.

**Fixes**:
- Use consistent indentation (4 spaces is standard)
- Don't mix tabs and spaces
- Your editor might have "convert tabs to spaces" setting

### TypeError: 'NoneType' object is not subscriptable

```python
result = some_function()
print(result['key'])  # Crash if result is None
```

**What it means**: You're trying to access `['key']` on `None`.

**Fix**:
```python
if result is not None:
    print(result['key'])
```

---

## HTTP errors (browser/server)

### 400 Bad Request

**What it means**: Your request is malformed. The server can't understand it.

**Common causes**:
- Invalid JSON in request body
- Missing required fields
- Wrong data types

**Fix**: Check your request format, validate JSON, check API documentation.

### 401 Unauthorized

**What it means**: You're not authenticated. No API key, or it's wrong/expired.

**Fix**: Check your API key or token. Check that it's being sent correctly (header, bearer token, etc.).

### 403 Forbidden

**What it means**: You're authenticated but don't have permission for this action.

**Fix**: Check user permissions, API scopes, or if you're accessing the right resource.

### 404 Not Found

**What it means**: The URL doesn't exist.

**Common causes**:
- Typo in URL
- Resource was deleted
- Wrong API endpoint

**Fix**: Check the URL, check API documentation, verify the resource exists.

### 500 Internal Server Error

**What it means**: The server crashed. It's not your fault (usually).

**What to do**:
- Check server logs (if it's your server)
- Try again later (if it's someone else's server)
- The error is on the backend, not your frontend code

### 502 Bad Gateway

**What it means**: A server in the middle (proxy, load balancer) couldn't reach the actual server.

**Common causes**:
- Server is down
- Server is overloaded
- Deployment is in progress

**Fix**: Usually wait and retry. If it's your server, check if it's running.

### 503 Service Unavailable

**What it means**: Server is temporarily unable to handle requests. Often during maintenance or overload.

**Fix**: Wait and retry.

### CORS error

```
Access to fetch at 'https://api.example.com' from origin 'http://localhost:3000' 
has been blocked by CORS policy
```

**What it means**: The browser is blocking a request to a different domain for security reasons.

**See**: [What is CORS?](/basics/what-is-cors/) for full explanation and fixes.

---

## Git errors

### fatal: not a git repository

**What it means**: You're not in a Git repository.

**Fixes**:
```bash
# Initialize a new repo
git init

# Or navigate to the right folder
cd your-project
```

### error: failed to push some refs

```
error: failed to push some refs to 'github.com/user/repo.git'
hint: Updates were rejected because the remote contains work that you do not have locally.
```

**What it means**: Someone else pushed changes (or you pushed from another machine). Your local is behind.

**Fix**:
```bash
git pull origin main
# Resolve any conflicts if needed
git push origin main
```

### CONFLICT: Merge conflict in file.js

**What it means**: Two changes touched the same lines, and Git can't automatically combine them.

**Fix**: Open the file, look for `<<<<<<<`, `=======`, `>>>>>>>` markers. Keep the code you want, delete the markers, save, then:
```bash
git add file.js
git commit -m "Resolved merge conflict"
```

---

## React / Next.js errors

### Hydration mismatch

```
Error: Hydration failed because the initial UI does not match what was rendered on the server.
```

**What it means**: Server-rendered HTML differs from what React renders on the client.

**Common causes**:
- Using `Date.now()` or `Math.random()` during render
- Browser extensions modifying the page
- Conditional rendering based on `window` or `document`

**Fix**: Make sure server and client render the same thing initially. Use `useEffect` for client-only code.

### Invalid hook call

```
Invalid hook call. Hooks can only be called inside of the body of a function component.
```

**What it means**: You're using a hook (`useState`, `useEffect`) wrong.

**Common causes**:
- Hook inside a regular function (not a component)
- Hook inside a condition or loop
- Multiple React versions

**Fix**: Hooks must be at the top level of a function component, not nested.

---

## Database errors

### Connection refused (PostgreSQL, MySQL)

```
ECONNREFUSED 127.0.0.1:5432
```

**What it means**: Can't connect to the database.

**Common causes**:
- Database isn't running
- Wrong host/port
- Firewall blocking connection

**Fix**: Start the database, check connection string, check if you're connecting to the right place.

### Relation/table does not exist

```
relation "users" does not exist
```

**What it means**: You're querying a table that doesn't exist.

**Fix**: Run migrations, check table name spelling, check you're connected to the right database.

---

## The debugging mindset

1. **Read the error** - The actual message, not just "it's broken"
2. **Find the location** - Which file, which line?
3. **Understand what it's saying** - Look up unfamiliar error types
4. **Form a hypothesis** - "I think the API isn't returning what I expect"
5. **Test it** - Add a `console.log`, check the data
6. **Fix and verify** - Does the error go away?

When you're stuck, search for the exact error message. Someone else has had this problem.

## Further reading

- [How to debug your code](/basics/how-to-debug-your-code/): Systematic debugging approaches
- [What is a 404 error?](/basics/what-is-a-404-error/): Deep dive into this common error
- [What is CORS?](/basics/what-is-cors/): Understanding browser security errors
- [What is a dependency?](/basics/what-is-a-dependency/): Understanding npm errors
