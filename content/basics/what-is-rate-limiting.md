---
title: "What is Rate Limiting?"
description: "Rate limiting is why the AI stops responding with '429 Too Many Requests.' It's how services protect themselves from being overwhelmed—and why you need to build your app to handle it gracefully."
date: 2026-07-30
level: 2
categories: [Basics]
tags: [beginner, rate-limiting, api, errors, throttling]
faqs:
  - question: "Why do I hit rate limits even though I'm not doing much?"
    answer: "Check if you're in a loop, making requests on every keystroke, or have multiple tabs/instances running. Also check if you're on a free tier with strict limits. One user testing might be fine; ten users simultaneously might exceed your quota."
  - question: "How do I know what the rate limit is?"
    answer: "Check the API's documentation. Also check response headers—many APIs include headers like X-RateLimit-Remaining and X-RateLimit-Reset that tell you how many requests you have left and when the limit resets."
  - question: "Should I retry immediately when I get a 429?"
    answer: "No. That makes things worse. Wait before retrying. The Retry-After header tells you how long. If there's no header, use exponential backoff—wait 1 second, then 2, then 4, etc."
last_updated: 2026-07-30
---

{{< quickanswer >}}
Rate limiting is when a service restricts how many requests you can make in a time period. Hit the limit and you get a 429 "Too Many Requests" error. It's how APIs protect themselves from being overwhelmed—and why your app needs to handle "slow down" responses gracefully.
{{< /quickanswer >}}

## Why rate limits exist

APIs cost money to run. Every request uses server resources. Without limits:
- One buggy script could make millions of requests
- Bad actors could overwhelm the service
- Fair usage becomes impossible
- Bills become unpredictable

Rate limiting says "you can make X requests per minute/hour/day." Go over, and requests get rejected until the window resets.

## The error you see

```
HTTP 429 Too Many Requests

{
  "error": {
    "message": "Rate limit exceeded. Please slow down.",
    "type": "rate_limit_error"
  }
}
```

This isn't a bug in your code. It's the API saying "you've asked for too much, too fast."

## Common rate limit structures

**Requests per minute (RPM)**:
"100 requests per minute." Make your 101st request within a minute? Rejected.

**Requests per day (RPD)**:
"1000 requests per day." Often combined with per-minute limits.

**Tokens per minute (TPM)** (AI APIs):
"100,000 tokens per minute." Large requests count more. A request that uses 10,000 tokens counts 100x more than one using 100 tokens.

**Concurrent requests**:
"Maximum 5 requests in flight at once." You must wait for responses before sending more.

## AI API rate limits (examples)

| Service | Free tier | Paid tier |
|---|---|---|
| OpenAI GPT-4o | 3 RPM, 200 RPD | 500 RPM, 10,000 RPD |
| Claude Sonnet | 5 RPM | 50 RPM (scales with spend) |
| Gemini | 15 RPM | 1,000 RPM |

These vary by model and your usage history. Check current docs—limits change often.

## How to handle rate limits

### 1. Check headers before you're blocked

Many APIs tell you where you stand:

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 23
X-RateLimit-Reset: 1640995200
```

You have 23 requests left before hitting 100. The limit resets at that timestamp.

### 2. Implement exponential backoff

When you get a 429, don't immediately retry. Wait, then try again. If it fails again, wait longer.

```javascript
async function callWithRetry(fn, maxRetries = 5) {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (error.status === 429 && attempt < maxRetries - 1) {
        const waitTime = Math.pow(2, attempt) * 1000; // 1s, 2s, 4s, 8s...
        await sleep(waitTime);
        continue;
      }
      throw error;
    }
  }
}
```

### 3. Respect Retry-After headers

Some APIs tell you exactly how long to wait:

```
Retry-After: 30
```

Wait 30 seconds before retrying.

### 4. Queue and throttle requests

Don't fire requests as fast as possible. Space them out:

```javascript
// Instead of Promise.all on 100 items at once...
// Process them in batches with delays

for (const batch of chunks(items, 10)) {
  await Promise.all(batch.map(processItem));
  await sleep(1000); // Wait 1 second between batches
}
```

### 5. Cache responses

If you're making the same request repeatedly, cache the response instead:

```javascript
const cache = new Map();

async function getCached(key, fetchFn) {
  if (cache.has(key)) return cache.get(key);
  const result = await fetchFn();
  cache.set(key, result);
  return result;
}
```

## Why vibecoders hit rate limits

**Calling the API on every keystroke**:
User types "hello"—that's 5 API calls if you call on each letter. Debounce inputs.

**No caching**:
Same question asked 100 times = 100 API calls. Cache identical requests.

**Runaway loops**:
A bug that makes infinite API calls. Add circuit breakers.

**Development hot reload**:
Every code save restarts your app and hits the API again.

**Multiple users, single key**:
Your rate limit is per API key, not per user. 10 users sharing your key = 10x the load.

## Architecture for rate limits

**Client-side throttling**: Your app limits how often it makes requests, regardless of server limits.

**Queue processing**: Instead of immediate requests, add to a queue and process at a controlled rate.

**Multiple API keys**: For high-volume apps, rotate between keys (if allowed by ToS).

**Caching layer**: Redis or similar to cache responses and avoid repeat calls.

**Fallback providers**: If OpenAI is rate-limited, fall back to Anthropic (if your app supports it).

## Monitoring rate limit issues

Track 429 errors in your logging:
- How often are you hitting limits?
- Which endpoints?
- Which users/features?

If you're constantly at the limit, you need to either optimize your usage or upgrade your plan.

## Further reading

- [What is a token?](/basics/what-is-a-token/): AI rate limits often use tokens, not just request counts
- [What is an API?](/basics/what-is-an-api/): The services that enforce these limits
- [What is caching?](/glossary/cdn/): One way to reduce API calls
