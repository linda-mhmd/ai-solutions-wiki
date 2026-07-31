---
title: "What is Authentication vs. Authorization?"
description: "Authentication is proving who you are (logging in). Authorization is checking what you're allowed to do (permissions). Both are essential—and confusing them breaks security."
date: 2026-07-30
level: 2
categories: [Basics]
tags: [beginner, authentication, authorization, security, login, permissions, auth]
faqs:
  - question: "Why do I get 401 vs 403 errors?"
    answer: "401 Unauthorized means you're not authenticated—the server doesn't know who you are. 403 Forbidden means you're authenticated but not authorized—the server knows who you are but won't let you do that action."
  - question: "What's the difference between OAuth and API keys?"
    answer: "API keys are simple: one key, one identity, often all-or-nothing access. OAuth is a protocol where users grant limited permissions to apps without sharing passwords. OAuth is for 'let this app access my Google Drive' scenarios."
  - question: "Should I build my own auth system?"
    answer: "No, unless you have a very good reason. Auth is hard to get right, and mistakes are security breaches. Use services like Clerk, Auth0, Firebase Auth, or Supabase Auth. They handle the hard parts (password hashing, session management, OAuth) correctly."
last_updated: 2026-07-30
---

{{< quickanswer >}}
**Authentication** answers "Who are you?" — proving your identity through passwords, tokens, or biometrics. **Authorization** answers "What can you do?" — checking if you have permission for the action you're attempting. You must authenticate before the system can authorize.
{{< /quickanswer >}}

## The two questions

Every secure system asks two questions:

| Question | Concept | Example |
|----------|---------|---------|
| **"Who are you?"** | Authentication | Logging in with email/password |
| **"Can you do this?"** | Authorization | Checking if you can delete a post |

They're different concerns:
- You can be authenticated (logged in) but not authorized (no permission)
- You can't be authorized without being authenticated first
- Different users have different authorizations

## Authentication methods

### 1. Username + Password
The classic. You prove identity by knowing a secret.

```javascript
// User submits credentials
const response = await fetch('/api/login', {
  method: 'POST',
  body: JSON.stringify({ 
    email: 'user@example.com',
    password: 'hunter2'  // Never store plaintext!
  })
});
// Server checks password hash, returns session token
```

**Problems**: Passwords get reused, phished, and leaked. Use a proper auth service that handles hashing, rate limiting, and breach detection.

### 2. API Keys
Simple authentication for services. One key per app/user.

```javascript
// Include key in request headers
const response = await fetch('https://api.anthropic.com/v1/messages', {
  headers: {
    'x-api-key': process.env.ANTHROPIC_API_KEY
  }
});
```

**Problems**: API keys are often all-or-nothing (full access or none). They don't expire automatically. They're easy to leak in code.

### 3. OAuth / Social Login
"Login with Google/GitHub/etc." The user authorizes your app through the provider.

```
1. User clicks "Login with Google"
2. Redirected to Google's login page
3. User approves: "Allow MyApp to see your email"
4. Google redirects back with a code
5. Your server exchanges code for user info
```

**Benefit**: You never see the user's password. The provider handles authentication.

### 4. Magic Links
Email a one-time login link. No password to remember.

```
1. User enters email
2. You send email with link: https://app.com/login?token=abc123
3. User clicks link
4. Token is verified, user is logged in
```

**Benefit**: No passwords to leak or forget.

### 5. JWTs (JSON Web Tokens)
A token containing user info, cryptographically signed. The server can verify it without database lookups.

```javascript
// JWT structure: header.payload.signature
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
// eyJ1c2VySWQiOiIxMjM0NTYifQ.
// SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

// Server verifies signature, trusts payload
const decoded = jwt.verify(token, process.env.JWT_SECRET);
console.log(decoded.userId);  // "123456"
```

**Benefit**: Stateless—no session database needed. **Risk**: Can't revoke until expiration (use short lifetimes).

## Authorization patterns

### 1. Role-Based Access Control (RBAC)
Users have roles. Roles have permissions.

```javascript
const roles = {
  admin: ['read', 'write', 'delete', 'manage-users'],
  editor: ['read', 'write'],
  viewer: ['read']
};

function canDelete(user) {
  return roles[user.role].includes('delete');
}
```

**Good for**: Most apps. Simple to understand and implement.

### 2. Attribute-Based Access Control (ABAC)
Permissions based on attributes of user, resource, and context.

```javascript
function canEdit(user, post) {
  // User is owner OR user is admin OR user is editor of this category
  return post.authorId === user.id || 
         user.role === 'admin' ||
         user.editableCategories.includes(post.category);
}
```

**Good for**: Complex rules that depend on resource properties.

### 3. Resource Ownership
Users can only access their own stuff.

```javascript
// Get only posts by the authenticated user
const posts = await db.post.findMany({
  where: { authorId: currentUser.id }
});
```

**Good for**: Multi-tenant apps, user data isolation.

## The 401 vs 403 distinction

This trips everyone up:

| Code | Name | Meaning |
|------|------|---------|
| **401** | Unauthorized | You're not authenticated (we don't know who you are) |
| **403** | Forbidden | You're authenticated but not authorized (we know you, but no) |

```javascript
app.delete('/api/posts/:id', async (req, res) => {
  // Step 1: Authentication
  const user = await getAuthenticatedUser(req);
  if (!user) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  
  // Step 2: Authorization
  const post = await getPost(req.params.id);
  if (post.authorId !== user.id && user.role !== 'admin') {
    return res.status(403).json({ error: 'Not authorized to delete this post' });
  }
  
  // Both passed: proceed
  await deletePost(post.id);
  return res.status(200).json({ success: true });
});
```

## Implementing auth in your app

**Option 1: Use an auth service (recommended)**

Services like Clerk, Auth0, Firebase Auth, or Supabase Auth handle:
- Password hashing and storage
- Session management
- OAuth integrations
- Security best practices
- Multi-factor authentication

```javascript
// With Clerk in Next.js
import { auth } from '@clerk/nextjs';

export async function POST(request) {
  const { userId } = auth();
  
  if (!userId) {
    return new Response('Unauthorized', { status: 401 });
  }
  
  // userId is authenticated, proceed with authorization...
}
```

**Option 2: Build it yourself (only if necessary)**

If you must, use established libraries:
- Node.js: Passport.js, bcrypt, jose (JWTs)
- Python: Flask-Login, itsdangerous, PyJWT

Never:
- Store passwords in plain text
- Hash passwords with MD5 or SHA1 (use bcrypt or argon2)
- Roll your own crypto

## Middleware pattern

Most frameworks support auth middleware—check authentication once, apply to many routes:

```javascript
// Express middleware
function requireAuth(req, res, next) {
  const user = verifySession(req.headers.authorization);
  if (!user) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  req.user = user;
  next();
}

// Apply to routes
app.get('/api/profile', requireAuth, getProfile);
app.post('/api/posts', requireAuth, createPost);
app.delete('/api/posts/:id', requireAuth, requireAdmin, deletePost);
```

## Common auth mistakes

**Storing passwords in plain text**: Use bcrypt or argon2.

**Not validating JWTs**: Always verify the signature and check expiration.

**Authorization in the frontend only**: The frontend can hide UI, but the backend MUST enforce rules. Users can call APIs directly.

**Overly broad permissions**: Give minimum necessary access. Don't make everyone an admin.

**Not rate limiting login attempts**: Attackers can brute-force passwords. Add delays after failed attempts.

## Further reading

- [What is an API key?](/basics/what-is-an-api-key/): Simple authentication for APIs
- [What is HTTPS?](/basics/what-is-https/): Protecting credentials in transit
- [What is a 404 error?](/basics/what-is-a-404-error/): Understanding 401 and 403 codes
