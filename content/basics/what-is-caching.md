---
title: "What is Caching?"
description: "Why your changes don't appear immediately. Browser cache, CDN cache, server cache—what gets cached, why, and how to bust through it."
date: 2026-07-30
level: 1
categories: [Basics]
tags: [beginner, caching, cdn, performance, debugging, web]
faqs:
  - question: "Why don't my changes show up after deployment?"
    answer: "Probably caching. Your browser cached the old version, or a CDN is serving stale files. Try hard refresh (Cmd+Shift+R or Ctrl+Shift+R), incognito mode, or wait for the cache to expire."
  - question: "How do I force everyone to see my new version?"
    answer: "Change the filename or add a version query string. Instead of `style.css`, use `style.v2.css` or `style.css?v=123`. Build tools do this automatically with hashed filenames like `style.a3f8b2.css`."
  - question: "Is caching good or bad?"
    answer: "Mostly good. It makes websites fast and reduces server load. The annoyance comes when you want to update something and caches serve the old version. Understanding how to bust caches when needed while keeping them for performance is the balance."
last_updated: 2026-07-30
---

{{< quickanswer >}}
Caching stores copies of data closer to where it's needed so it doesn't have to be fetched again. Your browser caches images so pages load faster. CDNs cache content on servers worldwide. The downside: when you update something, the old cached version might still be served until the cache expires or gets cleared.
{{< /quickanswer >}}

## Why caching exists

Without caching, every page load would:
- Download every image again
- Fetch every CSS and JS file again
- Hit your server for every request
- Take longer and cost more

Caching keeps copies of things that don't change often, so they load instantly instead of being fetched every time.

**The tradeoff**: When things DO change, caches might serve the old version.

## The layers of caching

```
User request
    ↓
[Browser cache] → cached? serve it
    ↓ (miss)
[CDN/Edge cache] → cached? serve it
    ↓ (miss)
[Server/App cache] → cached? serve it
    ↓ (miss)
[Database] → fetch fresh data
```

### Browser cache

Your browser saves files locally after the first download.

**What gets cached**: Images, CSS, JavaScript, fonts, API responses (sometimes)

**How long**: Depends on cache headers. Could be minutes, hours, days, or "forever."

**How to bypass**:
- Hard refresh: `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows)
- Open DevTools → Network tab → "Disable cache" checkbox
- Incognito/private window (starts with fresh cache)
- Clear browser cache in settings

### CDN cache

CDNs (Content Delivery Networks) like Cloudflare, Fastly, or Vercel Edge cache content on servers worldwide.

**What gets cached**: Static files, sometimes full pages

**Why**: A user in Tokyo gets content from a Tokyo server instead of your server in Virginia.

**The problem**: You deploy new code, but CDN servers worldwide still have the old version.

**How to bypass**:
- Purge cache in CDN dashboard
- Wait for TTL to expire
- Use versioned filenames (automatic cache busting)

### Server/Application cache

Your app might cache database queries, computed results, or rendered pages.

**Examples**:
- Redis cache storing frequently-accessed data
- Memoized function results
- Server-side rendered pages cached in memory

**How to bypass**: Usually requires cache invalidation in your code or restarting the server.

### Database cache

Databases cache query results and data in memory.

This is usually transparent—you don't manage it directly.

## Cache headers

Servers tell browsers how to cache using HTTP headers.

### Cache-Control

```
Cache-Control: max-age=3600
```
"Cache this for 3600 seconds (1 hour)"

```
Cache-Control: no-cache
```
"Check with server before using cached version"

```
Cache-Control: no-store
```
"Don't cache this at all"

### Common patterns

| Content type | Typical caching |
|--------------|-----------------|
| HTML pages | Short or no cache (content changes) |
| CSS/JS with hashed filenames | Long cache (filename changes = new file) |
| Images | Long cache |
| API responses | Varies—often no cache or short cache |
| User-specific data | No cache |

## Why your changes aren't showing

You deployed. The server has new code. But you still see the old version. Here's the checklist:

### 1. Browser cache
**Test**: Hard refresh (`Cmd+Shift+R`) or incognito window
**Fix**: If it works in incognito, it's browser cache. Wait or clear cache.

### 2. CDN cache
**Test**: Check directly on your server (bypass CDN) or purge CDN cache
**Fix**: Purge cache in CDN dashboard, or wait for TTL

### 3. Build not deployed
**Test**: Check deployment logs, verify the new build actually went out
**Fix**: Redeploy, check CI/CD pipeline

### 4. Service worker (PWA)
**Test**: DevTools → Application → Service Workers → Unregister
**Fix**: Update service worker versioning, or skip waiting

### 5. DNS cache
**Test**: If you changed DNS recently, might still resolve to old server
**Fix**: Wait for propagation, flush local DNS cache

## Cache busting

Cache busting forces browsers to download new files instead of using cached ones.

### Versioned filenames (recommended)

Build tools generate hashed filenames:
```
style.css         → style.a3f8b2c1.css
main.js           → main.7d2e4f89.js
```

When content changes, the hash changes, so the filename changes. Browsers treat it as a new file.

**Tools that do this**: Webpack, Vite, Next.js, most modern build tools.

### Query strings

Append a version number:
```html
<link rel="stylesheet" href="style.css?v=2">
<script src="main.js?v=1.2.3"></script>
```

Works but some CDNs ignore query strings for caching.

### Manual cache purge

Most CDNs have a "purge cache" button. Use it after deploying when you need immediate updates.

Cloudflare: Dashboard → Caching → Purge Everything
Vercel: Usually automatic with new deployments
Netlify: Deploy creates new cache automatically

## Debugging cache issues

### Check what's actually cached

DevTools → Network tab → Click a request → Headers

Look for:
- `Cache-Control` response header
- `Age` header (how long it's been cached)
- Status `(from disk cache)` or `(from memory cache)`

### Check cache headers

```bash
curl -I https://example.com/style.css
```

Look at `Cache-Control`, `ETag`, `Last-Modified` headers.

### Common scenarios

**"Works on my phone but not my laptop"**
Different devices have different caches. Your laptop has old files cached.

**"Works in incognito but not normal browser"**
Browser cache in your normal session. Clear cache or hard refresh.

**"Deployed but old version still showing for everyone"**
CDN cache. Purge it or wait for TTL.

**"API returning stale data"**
Server-side cache (Redis, in-memory). Might need cache invalidation in code.

## CDNs explained

CDNs have servers worldwide. When someone requests your file:

1. Request goes to nearest CDN edge server
2. If cached: serve immediately (fast!)
3. If not: fetch from your origin server, cache it, serve it

**Popular CDNs**:
- Cloudflare (also DNS, DDoS protection)
- Vercel Edge (automatic with Vercel hosting)
- Netlify Edge
- AWS CloudFront
- Fastly

**Why use them**:
- Faster load times globally
- Less load on your server
- DDoS protection
- Often free tiers

## Caching strategies by content type

### Static assets (CSS, JS, images)
**Strategy**: Long cache with hashed filenames
```
Cache-Control: public, max-age=31536000, immutable
```
Cache for 1 year. Filename hash ensures new versions get new URLs.

### HTML pages
**Strategy**: Short cache or revalidate
```
Cache-Control: no-cache
```
or
```
Cache-Control: public, max-age=60
```
Check for updates frequently since content changes.

### API responses
**Strategy**: Depends on data
```
Cache-Control: private, max-age=300
```
Cache for 5 minutes, only in user's browser (not CDN).

For user-specific data:
```
Cache-Control: no-store
```
Never cache.

### Dynamic pages with user data
**Strategy**: Don't cache, or use cache keys that include user identity
```
Cache-Control: private, no-store
```

## Quick fixes cheat sheet

| Problem | Quick fix |
|---------|-----------|
| My changes aren't showing | Hard refresh: `Cmd+Shift+R` |
| Works in incognito only | Clear browser cache |
| Not updating for anyone | Purge CDN cache |
| CSS/JS stuck on old version | Check if build generated new hashed filename |
| Service worker caching old version | DevTools → Application → Unregister service worker |
| DNS change not working | Flush local DNS, wait for propagation |

## Further reading

- [How DNS and domains work](/basics/how-dns-and-domains-work/): Another thing that gets cached
- [What is a CDN?](/glossary/cdn/): Content delivery networks in depth
- [What is deployment?](/basics/what-is-deployment/): Getting new code live
- [Common error messages explained](/basics/common-error-messages-explained/): When caching isn't the problem
