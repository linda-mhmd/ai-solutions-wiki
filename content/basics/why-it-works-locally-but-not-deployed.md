---
title: "Why It Works Locally But Not Deployed"
description: "The classic developer frustration explained. Environment variables, build differences, and the checklist for debugging deployment failures."
date: 2026-07-30
level: 1
categories: [Basics]
tags: [beginner, deployment, debugging, environment, production]
faqs:
  - question: "Why is deployment so different from local?"
    answer: "Your laptop has months of accumulated state—installed tools, environment variables, cached files, specific versions. A fresh deployment has none of that. It only has what you explicitly configured."
  - question: "How do I prevent this?"
    answer: "Use environment variables properly, lock dependency versions, test in a staging environment, and automate deployments so they're reproducible. Docker helps by making environments identical."
  - question: "My API works locally but fails deployed. Why?"
    answer: "Check: Is the API URL hardcoded to localhost? Is the environment variable for the API URL set in production? Are CORS settings blocking the deployed domain? Is the API server actually reachable from the deployment?"
last_updated: 2026-07-30
---

{{< quickanswer >}}
"Works on my machine" usually means: missing environment variables, hardcoded localhost URLs, different Node/Python versions, files that exist locally but weren't committed, or APIs only accessible from your network. The production environment doesn't have your laptop's accumulated state—it only has what you explicitly deployed.
{{< /quickanswer >}}

## Why this happens

Your local machine is unique:
- Months of installed packages and tools
- Environment variables you set and forgot
- Files not tracked by Git
- Services running (database, Redis)
- Network access to internal APIs
- Browser cache and stored credentials

Production is fresh:
- Clean install of dependencies
- Only the environment variables you configured
- Only the files in your repository
- Different network (can't reach localhost or internal services)
- No accumulated state

The gap between these causes most deployment failures.

## The usual suspects

### 1. Missing environment variables

**Symptoms:**
- "API key undefined"
- Empty config values
- Auth failures
- Database connection errors

**What happened:**
Your `.env` file has `DATABASE_URL=postgres://...` but `.env` isn't committed (and shouldn't be). Production doesn't have it.

**The fix:**
Set environment variables in your deployment platform:
- Vercel: Settings → Environment Variables
- Railway: Variables tab
- Netlify: Site settings → Environment variables

**Debug tip:**
```javascript
// Add temporary logging (remove after debugging!)
console.log('DATABASE_URL exists:', !!process.env.DATABASE_URL);
```

### 2. Hardcoded localhost

**Symptoms:**
- API calls fail
- "Network error" or "Connection refused"
- Works for you, fails for everyone else

**What happened:**
```javascript
// This works locally but nowhere else
const response = await fetch('http://localhost:3000/api/users');
```

**The fix:**
Use environment variables for URLs:
```javascript
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
const response = await fetch(`${API_URL}/api/users`);
```

Then set `NEXT_PUBLIC_API_URL=https://myapp.com` in production.

### 3. Different Node/Python versions

**Symptoms:**
- Syntax errors on deployed version
- "X is not a function"
- Package compatibility errors

**What happened:**
You have Node 20 locally. Production has Node 18. You used a feature that only exists in Node 20.

**The fix:**
Specify version in your project:

```json
// package.json
{
  "engines": {
    "node": ">=20.0.0"
  }
}
```

Or `.nvmrc` file:
```
20
```

Most platforms let you set the Node version in settings.

### 4. Files not in Git

**Symptoms:**
- "Module not found"
- "File not found"
- Missing assets

**What happened:**
You have a file locally that you never committed. Maybe it's in `.gitignore`.

**Debug:**
```bash
git status
# Shows untracked files that exist locally but aren't in repo
```

**Common culprits:**
- `.env` files (correct—shouldn't commit, but vars need to be set elsewhere)
- Generated files that should be built
- Large files added to `.gitignore`

### 5. Build vs development mode

**Symptoms:**
- Works with `npm run dev`, fails after `npm run build`
- Missing pages
- Different behavior

**What happened:**
Development mode is forgiving. Build mode is strict.
- Dev mode: Hot reload, detailed errors, development APIs
- Build mode: Optimized, minified, no dev tools

**The fix:**
Test the build locally:
```bash
npm run build
npm run start
# Now test—is it still broken?
```

Fix build errors before deploying.

### 6. Case sensitivity

**Symptoms:**
- "Module not found: ./Components/Button"
- Works on Mac/Windows, fails on Linux

**What happened:**
Mac and Windows file systems are case-insensitive by default.
```
import Button from './components/Button';  // File is ./Components/Button.jsx
```

This works locally but fails on Linux (most servers).

**The fix:**
Match exact case. Rename files if needed.

### 7. Database not accessible

**Symptoms:**
- Connection timeouts
- "Connection refused"
- Auth errors

**What happened:**
Your local database isn't the production database. Either:
- Production database isn't set up
- Connection string is wrong
- Firewall blocks the connection
- IP allowlist doesn't include deployment server

**The fix:**
Check your database provider's connection settings. Most require:
- Correct connection string in environment variables
- Deployment server IP added to allowlist (or allow from anywhere)
- SSL enabled for remote connections

### 8. API CORS issues

**Symptoms:**
- Works in Postman, fails in browser
- "CORS policy" errors
- Works locally, blocked deployed

**What happened:**
Your API allows requests from `localhost:3000` but not from `myapp.vercel.app`.

**The fix:**
Update CORS settings to include your production domain:
```javascript
// Express
app.use(cors({
  origin: ['http://localhost:3000', 'https://myapp.vercel.app']
}));
```

### 9. Missing build step

**Symptoms:**
- Old version still showing
- Changes not reflected
- "File not found" for new files

**What happened:**
You pushed code but the build didn't run, or it used cached old build.

**Debug:**
Check deployment logs. Did the build actually run? Did it succeed?

**The fix:**
Clear build cache in deployment platform. Trigger a fresh deploy.

### 10. Serverless function issues

**Symptoms:**
- API routes timeout
- "Function crashed"
- Memory errors

**What happened:**
Serverless functions have limits:
- Execution time (often 10-30 seconds)
- Memory (often 128MB-1GB)
- No persistent file system
- Cold starts

**The fix:**
- Optimize slow operations
- Increase timeout/memory limits if needed
- Don't write to local file system
- Handle cold starts gracefully

## Debugging checklist

When deployment fails:

- [ ] **Check deployment logs** - Most platforms show build and runtime logs
- [ ] **Verify environment variables** - Are they all set in production?
- [ ] **Check the URL** - Is the API URL pointing to production, not localhost?
- [ ] **Test build locally** - `npm run build && npm run start`
- [ ] **Check Node version** - Matches between local and production?
- [ ] **Review recent changes** - What did you change since last working deploy?
- [ ] **Check database connection** - Is production database accessible?
- [ ] **Verify domain/CORS** - Is your production domain allowed?
- [ ] **Clear caches** - CDN cache, build cache, browser cache
- [ ] **Check function logs** - For serverless, check individual function logs

## Preventing future issues

### Use environment variables consistently

```javascript
// Good: always use env vars
const apiUrl = process.env.API_URL;

// Bad: hardcoding with fallback
const apiUrl = process.env.API_URL || 'http://localhost:3000';
// This fallback hides missing env vars in production
```

Better pattern:
```javascript
const apiUrl = process.env.API_URL;
if (!apiUrl) throw new Error('API_URL environment variable is required');
```

### Lock your versions

```bash
# Lock dependencies
npm ci  # Uses exact versions from lock file

# Specify Node version
# .nvmrc, package.json engines, or platform settings
```

### Test production builds locally

```bash
# Before deploying:
npm run build
npm run start
# Test thoroughly
```

### Use staging environments

Deploy to a staging environment first. If it works there, production will likely work too.

### Containerize with Docker

Docker makes your environment identical everywhere:
- Same OS
- Same versions
- Same file structure

This eliminates most "works locally" issues.

## Quick diagnostics by error type

| Error | Likely cause |
|-------|--------------|
| "Cannot find module" | Dependency issue, case sensitivity |
| "Connection refused" | Wrong URL, database not accessible |
| "Unauthorized" / 401 | Missing or wrong API key/token |
| "CORS error" | Production domain not allowed |
| "Timeout" | Slow operation, function limit |
| "Cannot read property of undefined" | Missing env var, data not loaded |
| "Build failed" | Syntax error, missing dependency |
| Old version showing | Cache issue, build didn't run |

## Further reading

- [What is deployment?](/basics/what-is-deployment/): Understanding the deployment process
- [What is an environment variable?](/basics/what-is-an-environment-variable/): Managing configuration
- [Common error messages explained](/basics/common-error-messages-explained/): Understanding what went wrong
- [What is caching?](/basics/what-is-caching/): When the old version keeps showing
