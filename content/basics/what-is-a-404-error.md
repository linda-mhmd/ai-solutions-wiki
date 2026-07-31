---
title: "What is a 404 Error?"
description: "404 means 'page not found'—the server understood your request but couldn't find what you asked for. Here's why they happen and what the other HTTP status codes mean."
date: 2026-07-30
level: 1
categories: [Basics]
tags: [beginner, http, errors, status codes, web development, debugging]
faqs:
  - question: "Why is it called 404?"
    answer: "HTTP status codes are organized by category. 1xx = informational, 2xx = success, 3xx = redirect, 4xx = client error, 5xx = server error. 404 is the fourth code in the 4xx category, meaning 'Not Found'."
  - question: "Is a 404 error my fault or the server's fault?"
    answer: "4xx errors are 'client errors'—something about your request was wrong (bad URL, unauthorized, etc.). 5xx errors are 'server errors'—the server broke trying to handle a valid request. 404 usually means you requested something that doesn't exist."
  - question: "How do I create a custom 404 page for my app?"
    answer: "Every framework handles this differently. In Next.js, create a `not-found.tsx` file. In Express, add a catch-all route at the end. The goal is showing users a helpful page instead of a generic error."
last_updated: 2026-07-30
---

{{< quickanswer >}}
A 404 error means "Not Found"—the server received your request, understood what you wanted, but couldn't find it. Maybe the page was deleted, the URL has a typo, or the link is broken. It's the most famous HTTP status code because everyone has seen it.
{{< /quickanswer >}}

## Why 404s happen

When you visit a URL, your browser asks a server: "Give me this page." The server looks for it and responds with a status code.

**404 scenarios:**
- The page existed but was deleted
- The URL has a typo (`/abuot` instead of `/about`)
- Someone linked to a page that never existed
- The site restructured and old URLs no longer work
- You're trying to access a resource that requires different permissions

The server isn't broken—it just can't find what you asked for.

## HTTP status codes explained

404 is part of a larger system. Every HTTP response includes a status code telling you what happened:

### Success (2xx) ✅
| Code | Meaning | When you see it |
|------|---------|-----------------|
| **200** | OK | Everything worked |
| **201** | Created | You created a new resource (POST succeeded) |
| **204** | No Content | Success, but nothing to return (DELETE succeeded) |

### Redirect (3xx) ↪️
| Code | Meaning | When you see it |
|------|---------|-----------------|
| **301** | Moved Permanently | Page has a new URL forever |
| **302** | Found (Temporary Redirect) | Page temporarily at different URL |
| **304** | Not Modified | Use your cached version |

### Client Error (4xx) ❌
| Code | Meaning | When you see it |
|------|---------|-----------------|
| **400** | Bad Request | Your request was malformed |
| **401** | Unauthorized | You need to log in |
| **403** | Forbidden | You're logged in but don't have permission |
| **404** | Not Found | Resource doesn't exist |
| **405** | Method Not Allowed | Wrong HTTP method (GET vs POST) |
| **429** | Too Many Requests | You hit a rate limit |

### Server Error (5xx) 💥
| Code | Meaning | When you see it |
|------|---------|-----------------|
| **500** | Internal Server Error | Server crashed |
| **502** | Bad Gateway | Server got bad response from upstream |
| **503** | Service Unavailable | Server overloaded or down for maintenance |
| **504** | Gateway Timeout | Upstream server took too long |

## The codes you'll see most as a vibecoder

**200**: Your API call worked. Parse the response and use the data.

**400**: Your request body is malformed. Check your JSON syntax, required fields, and data types.

**401**: Your API key is missing or invalid. Check your authentication headers.

**403**: Your API key is valid but doesn't have permission for this action. Check your account settings or plan limits.

**404**: The endpoint or resource doesn't exist. Check the URL, check the API docs.

**429**: You hit the rate limit. Slow down, implement backoff, or upgrade your plan.

**500**: The server broke. Usually not your fault—try again later or check the service's status page.

## Debugging API errors

When your API call fails, the status code tells you where to look:

```javascript
const response = await fetch('/api/chat', {
  method: 'POST',
  body: JSON.stringify({ message: 'Hello' })
});

if (!response.ok) {
  console.log('Status:', response.status);
  const error = await response.json();
  console.log('Error:', error);
  
  // Now you know:
  // 400 → Check your request body
  // 401 → Check your API key
  // 404 → Check the URL
  // 429 → Slow down
  // 500 → Server problem, retry later
}
```

## Handling errors in your app

Good error handling means showing users helpful messages, not cryptic codes:

```javascript
async function callAI(prompt) {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt })
  });

  if (response.status === 429) {
    return { error: "We're getting too many requests. Please wait a moment." };
  }
  
  if (response.status === 401) {
    return { error: "There's a problem with our AI connection. We're on it." };
  }
  
  if (response.status >= 500) {
    return { error: "The AI service is temporarily unavailable. Try again soon." };
  }
  
  if (!response.ok) {
    return { error: "Something went wrong. Please try again." };
  }
  
  return await response.json();
}
```

## Creating custom 404 pages

When users hit a 404 on your site, don't show them a blank error. Help them:

**Next.js:**
```tsx
// app/not-found.tsx
export default function NotFound() {
  return (
    <div>
      <h1>Page not found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <a href="/">Go home</a>
    </div>
  );
}
```

**Express:**
```javascript
// Put this LAST, after all other routes
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Not found',
    message: `No route matches ${req.method} ${req.path}`
  });
});
```

## 404 vs. other "not working" situations

| Symptom | Likely cause | Status code |
|---------|-------------|-------------|
| Page not found | Bad URL or deleted content | 404 |
| "Access denied" | Not logged in | 401 |
| "Permission denied" | Logged in but not authorized | 403 |
| Page loads but empty | Successful request, no data | 200 with empty response |
| Page never loads | Network issue, server down | No response (timeout) |
| Page loads with error message | Server crashed while processing | 500 |

## The developer tools trick

When something isn't working:

1. Open browser DevTools (F12 or Cmd+Opt+I)
2. Go to the Network tab
3. Refresh the page or retry the action
4. Look at the status codes

This shows you exactly what's happening at the HTTP level—which requests succeeded, which failed, and why.

## Further reading

- [What is an API?](/basics/what-is-an-api/): How HTTP requests work
- [What is rate limiting?](/basics/what-is-rate-limiting/): Understanding 429 errors
- [What is localhost?](/basics/what-is-localhost/): Where these errors happen during development
