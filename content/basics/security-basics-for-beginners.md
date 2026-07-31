---
title: "Security Basics for Beginners"
description: "The security mistakes that get vibecoders hacked. SQL injection, XSS, leaked API keys, and the checklist to run before going live."
date: 2026-07-30
level: 1
categories: [Basics]
tags: [beginner, security, web, deployment, safety]
faqs:
  - question: "Do I really need to worry about security for a small app?"
    answer: "Yes. Automated bots scan the entire internet for vulnerabilities. They don't care if you have 5 users or 5 million. An exposed database or leaked API key will be found, usually within hours."
  - question: "Can AI-generated code be insecure?"
    answer: "Absolutely. AI often generates code that works but isn't secure—SQL built with string concatenation, secrets hardcoded, inputs not validated. Always review AI code for these patterns."
  - question: "When do I need a security professional?"
    answer: "When you handle payments, health data, or sensitive personal information. When you have real users who trust you. A security review before launch is much cheaper than a breach after."
last_updated: 2026-07-30
---

{{< quickanswer >}}
The biggest security mistakes: leaking API keys in code, building SQL queries with user input, displaying user input without escaping it, and leaving databases open to the internet. These are the vulnerabilities that actually get beginners hacked—not sophisticated attacks, but basic oversights that bots find automatically.
{{< /quickanswer >}}

## The attacks that actually happen

Most beginners don't get hacked by elite hackers. They get hacked by:
- Automated bots scanning for exposed databases
- Scripts looking for leaked API keys on GitHub
- Basic SQL injection on login forms
- Scrapers exploiting open APIs

These aren't sophisticated. They're automated and constant.

## 1. Leaked secrets (the #1 beginner mistake)

### What happens

You commit your `.env` file or hardcode an API key:

```javascript
// DON'T DO THIS
const stripe = require('stripe')('sk_live_abc123realkey');
```

Bots scan GitHub constantly. Within hours, your key is stolen. Your Stripe account gets charged. Your AWS bill explodes.

### How to prevent it

**Never commit secrets.** Use environment variables:

```javascript
// DO THIS
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
```

**Add `.env` to `.gitignore` immediately:**
```
# .gitignore
.env
.env.local
.env.production
```

**If you already committed a secret:**
1. Revoke the key immediately (generate a new one)
2. The old key is compromised forever—it's in Git history
3. Removing it from current code isn't enough

**Check for exposed secrets:**
```bash
# Search your code for potential secrets
grep -r "sk_live\|api_key\|password\|secret" --include="*.js" --include="*.ts"
```

## 2. SQL Injection

### What happens

You build SQL queries with user input:

```javascript
// VULNERABLE - DON'T DO THIS
const query = `SELECT * FROM users WHERE email = '${userInput}'`;
```

An attacker enters: `' OR '1'='1' --`

Your query becomes:
```sql
SELECT * FROM users WHERE email = '' OR '1'='1' --'
```

This returns all users. Worse inputs can delete data or extract passwords.

### How to prevent it

**Use parameterized queries:**

```javascript
// SAFE - DO THIS
// With Prisma
const user = await prisma.user.findUnique({
  where: { email: userInput }
});

// With raw SQL (parameterized)
const result = await db.query(
  'SELECT * FROM users WHERE email = $1',
  [userInput]
);
```

**Use an ORM** (Prisma, Drizzle, Sequelize). They handle parameterization automatically.

**Never build SQL strings with concatenation or template literals.**

## 3. Cross-Site Scripting (XSS)

### What happens

You display user input without escaping it:

```html
<!-- VULNERABLE -->
<div>Welcome, ${userName}</div>
```

An attacker sets their name to: `<script>stealCookies()</script>`

Now that script runs in every visitor's browser, stealing their session.

### How to prevent it

**Escape user input before displaying:**

React does this automatically:
```jsx
// SAFE in React - automatically escaped
<div>Welcome, {userName}</div>
```

But `dangerouslySetInnerHTML` bypasses it:
```jsx
// VULNERABLE - never use with user input
<div dangerouslySetInnerHTML={{__html: userInput}} />
```

**Sanitize if you must render HTML:**
```javascript
import DOMPurify from 'dompurify';
const clean = DOMPurify.sanitize(userInput);
```

**Set Content Security Policy headers** to limit what scripts can run.

## 4. Exposed databases

### What happens

Your database is accessible from the internet without authentication:
- MongoDB with no password
- PostgreSQL allowing all connections
- Firebase with open rules

Bots find these in minutes and download everything.

### How to prevent it

**Require authentication:**
```
# MongoDB connection string WITH auth
mongodb://username:password@host:27017/database

# Not just
mongodb://host:27017/database
```

**Restrict network access:**
- Only allow connections from your server's IP
- Use VPC/private networking when available
- Never expose database port (5432, 27017, etc.) to public internet

**Check Firebase/Firestore rules:**
```javascript
// VULNERABLE - anyone can read/write
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;  // DON'T DO THIS
    }
  }
}

// SAFER - require authentication
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## 5. Broken authentication

### Common mistakes

- Weak password requirements
- No rate limiting on login (allows brute force)
- Session tokens that don't expire
- Password reset links that don't expire
- Storing passwords in plain text

### How to prevent it

**Use an auth library** (NextAuth, Clerk, Auth0, Supabase Auth). Don't build auth from scratch.

**If you must handle passwords:**
```javascript
// NEVER store plain text passwords
// ALWAYS hash with bcrypt
import bcrypt from 'bcrypt';

// Storing
const hash = await bcrypt.hash(password, 10);

// Verifying
const valid = await bcrypt.compare(inputPassword, storedHash);
```

**Add rate limiting:**
```javascript
// Limit login attempts
if (failedAttempts > 5) {
  throw new Error('Too many attempts. Try again later.');
}
```

## 6. Insecure API endpoints

### Common mistakes

```javascript
// VULNERABLE - no authentication check
app.delete('/api/users/:id', async (req, res) => {
  await deleteUser(req.params.id);  // Anyone can delete any user!
  res.json({ success: true });
});
```

### How to prevent it

**Always verify authorization:**
```javascript
app.delete('/api/users/:id', async (req, res) => {
  // Check if user is authenticated
  if (!req.user) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  
  // Check if user can delete this resource
  if (req.user.id !== req.params.id && !req.user.isAdmin) {
    return res.status(403).json({ error: 'Not authorized' });
  }
  
  await deleteUser(req.params.id);
  res.json({ success: true });
});
```

**Validate all input:**
```javascript
// Use a validation library like Zod
import { z } from 'zod';

const userSchema = z.object({
  email: z.string().email(),
  age: z.number().min(0).max(150),
});

const validated = userSchema.parse(req.body);
```

## Pre-launch security checklist

Run through this before going live:

### Secrets
- [ ] `.env` is in `.gitignore`
- [ ] No API keys or passwords in code
- [ ] No secrets in Git history (check with `git log -p | grep -i password`)
- [ ] Production secrets are set in deployment platform, not committed

### Database
- [ ] Database requires authentication
- [ ] Database not accessible from public internet
- [ ] Firebase/Firestore rules restrict access
- [ ] Sensitive data is encrypted at rest

### Authentication
- [ ] Using established auth library (not DIY)
- [ ] Passwords are hashed (bcrypt)
- [ ] Sessions expire
- [ ] Password reset tokens expire
- [ ] Rate limiting on login endpoint

### Input/Output
- [ ] User input is validated
- [ ] SQL uses parameterized queries (or ORM)
- [ ] User-generated content is escaped before display
- [ ] File uploads are validated and sanitized

### HTTPS
- [ ] Site uses HTTPS (not HTTP)
- [ ] HTTP redirects to HTTPS
- [ ] Cookies are set with `Secure` flag

### API
- [ ] All endpoints check authentication
- [ ] All endpoints check authorization
- [ ] Sensitive endpoints are rate-limited
- [ ] Error messages don't leak internal details

## When you need professional help

DIY security is fine for:
- Personal projects
- MVPs with no sensitive data
- Learning and experimentation

Get professional review when:
- Handling payments
- Storing health or financial data
- Building for enterprise customers
- You have real users who trust you
- Compliance requirements (HIPAA, SOC2, GDPR)

A security review before launch costs far less than a breach after.

## Quick reference: secure patterns

```javascript
// Environment variables for secrets
const apiKey = process.env.API_KEY;

// Parameterized SQL
await db.query('SELECT * FROM users WHERE id = $1', [userId]);

// ORM (automatically safe)
await prisma.user.findUnique({ where: { id: userId } });

// Password hashing
const hash = await bcrypt.hash(password, 10);

// Input validation
const data = schema.parse(req.body);

// Auth check
if (!req.user) return res.status(401).json({ error: 'Unauthorized' });

// Authorization check
if (resource.ownerId !== req.user.id) return res.status(403).json({ error: 'Forbidden' });
```

## Further reading

- [What is an API key?](/basics/what-is-an-api-key/): Why keys matter and how to handle them
- [What is an environment variable?](/basics/what-is-an-environment-variable/): Where secrets should live
- [What is authentication vs authorization?](/basics/what-is-authentication-vs-authorization/): Who you are vs what you can do
- [Vibe coding in public: the safety check](/guides/vibe-coding-in-public-safety-check/): Pre-launch security checklist
