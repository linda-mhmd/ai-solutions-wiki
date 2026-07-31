---
title: "What is CORS?"
description: "CORS is why your frontend can't talk to your backend. It's a browser security feature that blocks requests between different domains—and understanding it saves hours of frustration."
date: 2026-07-30
level: 2
categories: [Basics]
tags: [beginner, cors, security, api, frontend, backend]
faqs:
  - question: "Why do I get CORS errors locally but not in Postman?"
    answer: "CORS is enforced by browsers, not servers. Postman is not a browser—it doesn't implement CORS. Your terminal, curl, and server-to-server requests also skip CORS. Only browser-based JavaScript hits this wall."
  - question: "Should I just set Access-Control-Allow-Origin to * in production?"
    answer: "Probably not. * means 'allow requests from anywhere,' which is fine for public APIs but risky for anything with authentication or private data. Be specific: allow only the origins you trust."
  - question: "My frontend and backend are both on localhost but different ports. Why is that cross-origin?"
    answer: "Origin = protocol + domain + port. localhost:3000 and localhost:8080 are different origins because the ports differ. Same-origin would be identical protocol, domain, AND port."
last_updated: 2026-07-30
---

{{< quickanswer >}}
CORS (Cross-Origin Resource Sharing) is a browser security feature that blocks web pages from making requests to a different domain than the one serving the page. If your frontend at `myapp.com` tries to fetch data from `api.example.com`, the browser blocks it by default. CORS headers tell the browser "it's okay, I allow this."
{{< /quickanswer >}}

## Why CORS exists

Imagine you're logged into your bank at `bank.com`. A malicious site at `evil.com` has JavaScript that tries to fetch `bank.com/transfer-money`. Without CORS, that request would include your bank's cookies and potentially transfer your money.

CORS prevents this. By default, browsers block requests from one origin to another unless the target server explicitly says "I allow requests from this origin."

This is why CORS errors only happen in browsers. Postman, curl, and server-to-server requests don't have this restriction—they're not protecting a user session.

## What's an "origin"?

An origin is the combination of:
- **Protocol**: http or https
- **Domain**: myapp.com
- **Port**: 3000, 8080, etc.

All three must match for two URLs to be "same-origin."

| URL A | URL B | Same origin? |
|---|---|---|
| `https://myapp.com` | `https://myapp.com/page` | ✅ Yes |
| `https://myapp.com` | `http://myapp.com` | ❌ No (different protocol) |
| `https://myapp.com` | `https://api.myapp.com` | ❌ No (different subdomain) |
| `http://localhost:3000` | `http://localhost:8080` | ❌ No (different port) |

## The error you see

When CORS blocks a request, you get an error like:

```
Access to fetch at 'http://localhost:8080/api/data' from origin 
'http://localhost:3000' has been blocked by CORS policy: 
No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

The browser made the request. The server responded. But the response didn't include CORS headers saying your origin is allowed. So the browser throws away the response and gives you an error.

**Important**: The request actually went through. The server processed it. CORS is enforced on the response, not the request. (For "simple" requests, anyway.)

## How to fix CORS

The fix is always on the **server** side. The server needs to include headers that tell browsers "requests from X origin are allowed."

### Option 1: Add CORS headers to your backend

**Node.js/Express**:
```javascript
const cors = require('cors');

// Allow all origins (use for development only)
app.use(cors());

// Or specify allowed origins
app.use(cors({
  origin: 'https://myapp.com'
}));
```

**Python/Flask**:
```python
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow all origins

# Or specify
CORS(app, origins=['https://myapp.com'])
```

### Option 2: Use a proxy in development

Instead of calling `http://localhost:8080/api` from your frontend, proxy through your dev server:

**Vite** (vite.config.js):
```javascript
export default {
  server: {
    proxy: {
      '/api': 'http://localhost:8080'
    }
  }
}
```

Now your frontend calls `/api/data` (same origin), and Vite forwards it to `localhost:8080/api/data`. No CORS issue because the browser thinks it's same-origin.

### Option 3: In production, serve from the same origin

If your frontend and backend are both at `myapp.com`, there's no cross-origin request. Many deployment setups route `/api/*` to your backend and everything else to your frontend, all under one domain.

## Preflight requests

For "complex" requests (with custom headers, methods other than GET/POST, or certain content types), the browser sends a preflight OPTIONS request first:

```
OPTIONS /api/data HTTP/1.1
Origin: https://myapp.com
Access-Control-Request-Method: POST
Access-Control-Request-Headers: content-type
```

The server must respond with appropriate headers:

```
Access-Control-Allow-Origin: https://myapp.com
Access-Control-Allow-Methods: POST, GET, OPTIONS
Access-Control-Allow-Headers: content-type
```

Only then does the browser send the actual request.

If you're seeing two requests in your network tab (OPTIONS then the real one), this is why.

## CORS headers explained

**Access-Control-Allow-Origin**: Which origins can access the response
- `*` = anyone (don't use for authenticated endpoints)
- `https://myapp.com` = only this specific origin

**Access-Control-Allow-Methods**: Which HTTP methods are allowed
- `GET, POST, PUT, DELETE, OPTIONS`

**Access-Control-Allow-Headers**: Which headers the request can include
- `content-type, authorization`

**Access-Control-Allow-Credentials**: Whether cookies/auth can be included
- `true` (requires a specific origin, not `*`)

## Common scenarios

**Frontend and backend on different ports locally**

Your React app is at `localhost:3000`, your Express API at `localhost:8080`. Add `cors()` middleware to Express or set up a proxy in your frontend dev server.

**Frontend and API on different subdomains**

`app.mysite.com` calling `api.mysite.com`. Your API needs to return `Access-Control-Allow-Origin: https://app.mysite.com`.

**Calling a third-party API from the browser**

Some APIs allow browser access, some don't. If they don't have CORS headers, you can't call them from the browser. You'll need to proxy through your own backend.

## What CORS doesn't do

CORS is not authentication. It doesn't verify who's making the request—only where the request is coming from (based on browser headers that can be spoofed outside browsers).

CORS is not encryption. It doesn't protect data in transit. That's HTTPS.

CORS is not a firewall. It only affects browser-based requests. Your API is still accessible from anywhere via curl or server-side code.

## Further reading

- [What is an API?](/basics/what-is-an-api/): What you're trying to call
- [What is localhost?](/basics/what-is-localhost/): Where CORS commonly bites you first
- [Frontend vs backend](/basics/frontend-vs-backend/): The two sides CORS sits between
