---
title: "What is an Environment Variable?"
description: "Environment variables are settings that live outside your code. They're how you keep API keys secret, configure different environments, and not accidentally push passwords to GitHub."
date: 2026-07-30
level: 1
categories: [Basics]
tags: [beginner, environment-variables, secrets, configuration, security]
faqs:
  - question: "Why can't I just put the API key directly in my code?"
    answer: "Because code gets shared—Git, GitHub, Stack Overflow questions, pair programming. The moment your key is in code, it's one push away from being public. Environment variables keep secrets separate from code so you can share your code without sharing your secrets."
  - question: "How do environment variables work on Vercel/Netlify?"
    answer: "Every hosting platform has a settings page where you add environment variables. They're stored encrypted on their servers. When your code runs, it can read them with process.env.VARIABLE_NAME. You never commit them to Git."
  - question: "My .env file isn't working. What's wrong?"
    answer: "Common issues: You forgot to install dotenv (npm install dotenv), you didn't import it at the top of your entry file, the .env file isn't in the right directory, you have a typo in the variable name, or you didn't restart your dev server after changing the file."
last_updated: 2026-07-30
---

{{< quickanswer >}}
An environment variable is a value stored outside your code that your code can read. Instead of writing `apiKey = "sk-abc123"` directly in your code, you write `apiKey = process.env.API_KEY` and store the actual value separately. This keeps secrets out of your codebase and lets the same code run differently in different places.
{{< /quickanswer >}}

## The problem environment variables solve

Imagine your code has an API key in it:

```javascript
// BAD - key is in code
const openai = new OpenAI({
  apiKey: "sk-proj-abc123xyz789"
});
```

Now you push to GitHub. That key is public. Bots find it in minutes. Someone else uses your API key. You get a bill for $5,000.

Environment variables fix this:

```javascript
// GOOD - key comes from environment
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});
```

The code doesn't contain the secret. The secret lives in the environment where the code runs.

## How it works locally

**Step 1**: Create a `.env` file in your project root:

```
# .env
OPENAI_API_KEY=sk-proj-abc123xyz789
DATABASE_URL=postgres://user:pass@localhost:5432/mydb
STRIPE_SECRET_KEY=sk_test_abc123
```

**Step 2**: Add `.env` to your `.gitignore`:

```
# .gitignore
.env
.env.local
.env*.local
```

**Step 3**: Load the variables in your code. For Node.js:

```javascript
// At the very top of your entry file
require('dotenv').config();
// or with ES modules
import 'dotenv/config';

// Now you can use them
console.log(process.env.OPENAI_API_KEY);
```

**Note**: Many frameworks (Next.js, Vite, Create React App) load `.env` files automatically—you don't need dotenv.

## The environment part

"Environment" refers to where your code runs:

- **Development** (your laptop): Uses local database, test API keys
- **Staging** (test server): Uses staging database, test API keys
- **Production** (live server): Uses real database, real API keys

Same code, different configuration:

```
# .env (development)
DATABASE_URL=postgres://localhost:5432/myapp_dev
STRIPE_KEY=sk_test_xxx

# Production (set in Vercel dashboard)
DATABASE_URL=postgres://prod-server:5432/myapp_prod
STRIPE_KEY=sk_live_xxx
```

Your code just reads `process.env.DATABASE_URL`. It doesn't know or care which environment it's in.

## Setting variables in production

You don't upload `.env` files to production. Instead, you set environment variables in your hosting platform's dashboard:

**Vercel**: Settings → Environment Variables → Add
**Netlify**: Site settings → Environment variables
**Railway**: Variables tab in your service
**Heroku**: Settings → Config Vars

The platform stores them encrypted and injects them when your code runs.

## What goes in environment variables

**Secrets** (always):
- API keys
- Database passwords
- Auth secrets
- Private keys

**Configuration** (often):
- Database URLs
- Third-party service endpoints
- Feature flags
- Environment name (development/staging/production)

**Not typically**:
- Static content
- Things that never change
- Large amounts of data (use files instead)

## Common patterns

**Different files for different environments**:
```
.env              # Default, committed (no secrets!)
.env.local        # Local overrides, gitignored
.env.development  # Dev-specific
.env.production   # Prod-specific (but don't commit secrets)
```

**Public vs private variables** (in Next.js):
```
# Server-only (never sent to browser)
DATABASE_URL=...

# Available in browser (prefix with NEXT_PUBLIC_)
NEXT_PUBLIC_API_URL=https://api.myapp.com
```

**Checking if variables exist**:
```javascript
if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing OPENAI_API_KEY environment variable');
}
```

## Common mistakes

**Committing .env files**:
The whole point is to NOT commit them. Check your `.gitignore`.

**Forgetting to set production variables**:
Your app works locally, you deploy, it breaks. You forgot to add the variables to your hosting platform.

**Typos in variable names**:
`OPENAI_API_KEY` vs `OPENAI_APIKEY`. JavaScript won't error—it'll just be `undefined`.

**Not restarting after changes**:
Most dev servers don't hot-reload environment variables. Restart after editing `.env`.

**Using .env in the browser**:
Regular environment variables only exist on the server. If you need something in the browser, your framework probably has a special prefix (like `NEXT_PUBLIC_` or `VITE_`).

## Security notes

**.env files are plaintext**: Anyone with access to your computer can read them. Don't store truly critical secrets (like production AWS root keys) in .env files on your laptop.

**Don't log them**: `console.log(process.env)` in production is a security incident waiting to happen.

**Rotate compromised keys**: If a key might have leaked, generate a new one. Don't assume it's fine.

**Use a secrets manager for serious stuff**: For production systems with many secrets, tools like AWS Secrets Manager, HashiCorp Vault, or 1Password for Teams are more secure than environment variables alone.

## Further reading

- [What is an API key?](/basics/what-is-an-api-key/): The most common thing stored in environment variables
- [What is deployment?](/basics/what-is-deployment/): When you need to set these in production
- [Security and Auth basics](/basics/what-is-security-and-auth/): The broader picture of keeping things safe
