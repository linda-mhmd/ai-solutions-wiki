---
title: "What is SSR vs CSR?"
description: "Server-side rendering vs client-side rendering. Why Next.js exists, what hydration means, and when to use each approach."
date: 2026-07-30
level: 1
categories: [Basics]
tags: [beginner, react, nextjs, rendering, web, performance]
faqs:
  - question: "Which should I use—SSR or CSR?"
    answer: "For most apps, start with the framework defaults (Next.js does SSR/SSG by default). Use SSR for SEO-important pages, content sites, and e-commerce. Use CSR for dashboards, admin panels, and highly interactive apps behind login."
  - question: "What is hydration?"
    answer: "Hydration is when React takes over a server-rendered page. The HTML arrives from the server (fast, visible immediately), then React loads and 'hydrates' it—attaching event listeners and making it interactive. The page is visible before it's interactive."
  - question: "Why do I get hydration errors?"
    answer: "The server rendered one thing, but React on the client tried to render something different. Common causes: using browser-only APIs during render (window, localStorage), dates/random values that differ, browser extensions modifying the HTML."
last_updated: 2026-07-30
---

{{< quickanswer >}}
SSR (Server-Side Rendering) generates HTML on the server for each request—pages load fast and work for SEO. CSR (Client-Side Rendering) sends a blank page and JavaScript builds it in the browser—better for interactive apps but slower initial load and invisible to search engines. Most modern frameworks like Next.js blend both approaches.
{{< /quickanswer >}}

## The core difference

### Client-Side Rendering (CSR)

The server sends a nearly empty HTML file:

```html
<!DOCTYPE html>
<html>
<body>
  <div id="root"></div>
  <script src="app.js"></script>
</body>
</html>
```

Then JavaScript runs in the browser, fetches data, and builds the page:

```
1. Browser requests page
2. Server sends empty HTML + JavaScript
3. Browser downloads JavaScript
4. JavaScript executes
5. JavaScript fetches data from API
6. JavaScript renders the page
7. User finally sees content
```

**Timeline:**
```
[Empty page] → [Loading...] → [Content appears]
     0s             2s              4s
```

### Server-Side Rendering (SSR)

The server builds the complete HTML before sending:

```html
<!DOCTYPE html>
<html>
<body>
  <div id="root">
    <h1>Welcome, Alice</h1>
    <ul>
      <li>Item 1</li>
      <li>Item 2</li>
    </ul>
  </div>
  <script src="app.js"></script>
</body>
</html>
```

```
1. Browser requests page
2. Server fetches data
3. Server renders HTML with data
4. Server sends complete HTML
5. User sees content immediately
6. JavaScript loads (hydration)
7. Page becomes interactive
```

**Timeline:**
```
[Content visible] → [Becomes interactive]
       1s                   2s
```

## Why it matters

### SEO (Search Engine Optimization)

Google's crawler sees what the server sends.

**CSR**: Crawler sees empty `<div id="root"></div>`. Your content is invisible to search.

**SSR**: Crawler sees full content. Your pages can rank in search results.

If SEO matters (blog, e-commerce, marketing site), you need SSR or SSG.

### Initial load performance

**CSR**: Users stare at a blank screen or spinner while JavaScript downloads and runs.

**SSR**: Users see content immediately, even on slow connections.

### Time to Interactive (TTI)

**CSR**: Nothing works until JavaScript loads.

**SSR**: Content is visible early, but buttons don't work until hydration completes.

## Static Site Generation (SSG)

A third option: generate HTML at build time, not request time.

```
Build time: Generate all HTML pages
Runtime: Serve pre-built HTML (instant)
```

**Best for:**
- Blogs
- Documentation
- Marketing sites
- Any content that doesn't change per user

**Tools**: Next.js, Astro, Gatsby, Hugo, Jekyll

**Tradeoff**: Content is static. Updates require a rebuild.

## Modern hybrid approaches

Next.js and similar frameworks let you mix approaches per page:

```jsx
// Static page (SSG) - built at deploy time
export default function About() {
  return <h1>About Us</h1>;
}

// Server-rendered page (SSR) - rendered per request
export async function getServerSideProps() {
  const data = await fetchUserData();
  return { props: { data } };
}

// Client-side page - rendered in browser
'use client';
export default function Dashboard() {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetchData().then(setData);
  }, []);
  return <div>{data}</div>;
}
```

## When to use each

| Approach | Best for | Examples |
|----------|----------|----------|
| **SSG** | Content that rarely changes | Blog, docs, marketing site |
| **SSR** | Dynamic content, SEO needed | E-commerce, news, social feeds |
| **CSR** | Highly interactive, behind auth | Dashboard, admin panel, web apps |

### Decision flowchart

```
Does the page need SEO?
├── No → Does it need real-time data?
│        ├── Yes → CSR
│        └── No → CSR or SSG (either works)
└── Yes → Does content change per request?
         ├── Yes → SSR
         └── No → SSG
```

## Hydration explained

Hydration is the process where React "takes over" server-rendered HTML.

```
1. Server sends HTML (page is visible but static)
2. Browser loads React JavaScript
3. React looks at existing HTML
4. React attaches event listeners
5. React "hydrates" - page is now interactive
```

The HTML from the server and the HTML React would generate must match. If they don't, you get hydration errors.

### Common hydration errors

**Using browser APIs during render:**
```jsx
// Bug: window doesn't exist on server
function Component() {
  const width = window.innerWidth;  // Crashes on server
  return <div>Width: {width}</div>;
}

// Fix: use useEffect for browser-only code
function Component() {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);
  return <div>Width: {width}</div>;
}
```

**Different content server vs client:**
```jsx
// Bug: Date differs between server and client
function Component() {
  return <div>Time: {new Date().toISOString()}</div>;
}

// Fix: render on client only, or use consistent value
function Component() {
  const [time, setTime] = useState(null);
  useEffect(() => {
    setTime(new Date().toISOString());
  }, []);
  return <div>Time: {time ?? 'Loading...'}</div>;
}
```

## Next.js rendering modes

Next.js (App Router) has multiple rendering options:

### Server Components (default)
```jsx
// This runs on the server
async function Page() {
  const data = await fetchData();  // Fetch on server
  return <div>{data.title}</div>;
}
```

### Client Components
```jsx
'use client';  // Opt into client rendering

function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

### Static vs Dynamic
```jsx
// Force static (SSG)
export const dynamic = 'force-static';

// Force dynamic (SSR)
export const dynamic = 'force-dynamic';
```

## Performance comparison

| Metric | CSR | SSR | SSG |
|--------|-----|-----|-----|
| First Contentful Paint | Slow | Fast | Fastest |
| Time to Interactive | Medium | Medium | Fast |
| Server load | Low | High | Lowest |
| Build time | Fast | Fast | Slower |
| Freshness | Real-time | Real-time | Stale until rebuild |

## Common patterns

### Public pages: SSG/SSR, Private pages: CSR

```
/             → SSG (marketing, SEO matters)
/blog         → SSG (content, SEO matters)
/products     → SSR (dynamic prices, SEO matters)
/dashboard    → CSR (interactive, auth required, no SEO)
/settings     → CSR (interactive, auth required, no SEO)
```

### Progressive enhancement

Start with SSR, enhance with client-side interactivity:

```jsx
// Server renders the content
// Client adds interactivity

export default async function ProductPage({ params }) {
  const product = await getProduct(params.id);  // Server
  
  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <AddToCartButton productId={product.id} />  {/* Client component */}
    </div>
  );
}
```

## Quick reference

| Term | Meaning |
|------|---------|
| CSR | JavaScript builds the page in the browser |
| SSR | Server builds HTML for each request |
| SSG | HTML built once at deploy time |
| Hydration | React takes over server-rendered HTML |
| ISR | Incremental Static Regeneration—SSG that updates |

## Further reading

- [What is a build process?](/basics/what-is-a-build-process/): How code becomes deployable
- [What is a server?](/basics/what-is-a-server/): Where SSR happens
- [What is the DOM?](/basics/what-is-the-dom/): What gets rendered
- [What is caching?](/basics/what-is-caching/): How SSG pages are served fast
