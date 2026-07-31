---
title: "Full-Stack Frameworks Compared"
description: "Next.js, Remix, Nuxt, SvelteKit, Astro—which full-stack framework should you use? An honest comparison of rendering strategies, tradeoffs, and when to choose each."
date: 2026-07-30
level: 1
categories: [Basics]
tags: [beginner, fullstack, nextjs, remix, nuxt, sveltekit, astro, ssr, ssg, frameworks]
faqs:
  - question: "What makes a framework 'full-stack'?"
    answer: "Full-stack frameworks handle both frontend and backend in one codebase. They manage routing, data fetching, server-side rendering, API routes, and deployment. You build your UI and your API together."
  - question: "Do I need a full-stack framework?"
    answer: "Not always. If you're building a simple static site, a basic frontend framework is fine. Full-stack frameworks shine when you need server-side rendering, API routes, or complex data fetching patterns."
  - question: "Can I use these with a separate backend?"
    answer: "Yes. Many teams use Next.js or similar as a 'backend for frontend' that talks to separate APIs. The built-in API routes are optional—you can fetch from any backend."
last_updated: 2026-07-30
---

{{< quickanswer >}}
**Next.js** is the React default with the largest ecosystem. **Remix** focuses on web fundamentals and progressive enhancement. **Nuxt** brings the same to Vue. **SvelteKit** offers the best performance with Svelte. **Astro** is content-first with optional interactivity. For most React developers: Next.js. For content sites: Astro. For Vue developers: Nuxt.
{{< /quickanswer >}}

## The landscape

| Framework | Based on | Rendering | Best for |
|-----------|----------|-----------|----------|
| Next.js | React | SSR, SSG, ISR | Most React projects |
| Remix | React | SSR, progressive | Web-standard apps |
| Nuxt | Vue | SSR, SSG | Vue full-stack |
| SvelteKit | Svelte | SSR, SSG | Performance-critical |
| Astro | Any/none | Static-first | Content sites, blogs |

## Rendering strategies explained

Before comparing frameworks, understand the options:

| Strategy | What it means | Good for |
|----------|---------------|----------|
| **CSR** (Client-Side) | JavaScript renders in browser | SPAs, dashboards |
| **SSR** (Server-Side) | Server renders each request | Dynamic, personalized |
| **SSG** (Static Gen) | Pre-built at deploy time | Blogs, marketing sites |
| **ISR** (Incremental) | Static with background updates | Large sites, e-commerce |
| **Streaming** | Send HTML progressively | Fast perceived loading |

---

## Next.js

The dominant React full-stack framework. Vercel-backed, widely adopted.

### Philosophy
- React-first with server capabilities
- Flexible rendering per page
- File-based routing
- Deploy anywhere, optimized for Vercel

### Code example
```tsx
// app/users/page.tsx (App Router)
async function getUsers() {
  const res = await fetch('https://api.example.com/users');
  return res.json();
}

export default async function UsersPage() {
  const users = await getUsers();
  
  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

```tsx
// app/api/users/route.ts (API Route)
import { NextResponse } from 'next/server';

export async function GET() {
  const users = await db.users.findMany();
  return NextResponse.json(users);
}
```

### Strengths
- **Ecosystem**: Largest, most tutorials, most examples
- **Flexibility**: SSR, SSG, ISR, CSR—all available
- **Vercel integration**: Seamless deployment
- **React Server Components**: Latest React features first
- **AI support**: Best coverage from coding assistants

### Weaknesses
- **Complexity**: App Router has a learning curve
- **Vercel-optimized**: Some features work best on Vercel
- **Bundle size**: Can be heavy if not careful
- **Changing patterns**: Pages Router → App Router transition
- **Lock-in concerns**: Deep Vercel integration

### When to choose Next.js
- You're using React (most common choice)
- Want flexible rendering options
- Need large ecosystem of examples
- Using AI coding assistants heavily
- Team already knows React

### Ecosystem highlights
- **next-auth**: Authentication
- **Prisma**: Database ORM
- **tRPC**: Type-safe APIs
- **Tailwind**: Styling (built-in support)
- **shadcn/ui**: Component library

---

## Remix

Web-standards-focused React framework. Emphasizes progressive enhancement.

### Philosophy
- Embrace web platform fundamentals
- Progressive enhancement by default
- Nested routing with data loading
- Works without JavaScript

### Code example
```tsx
// app/routes/users.tsx
import { json } from '@remix-run/node';
import { useLoaderData, Form } from '@remix-run/react';

export async function loader() {
  const users = await db.users.findMany();
  return json({ users });
}

export async function action({ request }) {
  const formData = await request.formData();
  const name = formData.get('name');
  await db.users.create({ data: { name } });
  return json({ success: true });
}

export default function Users() {
  const { users } = useLoaderData();
  
  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
      
      <Form method="post">
        <input name="name" />
        <button type="submit">Add User</button>
      </Form>
    </div>
  );
}
```

### Strengths
- **Web standards**: Forms, HTTP, progressive enhancement
- **No JavaScript required**: Works without client JS
- **Nested routing**: Parallel data loading
- **Error boundaries**: Graceful error handling
- **Simpler mental model**: Less magic than Next.js

### Weaknesses
- **Smaller ecosystem**: Less examples, fewer integrations
- **Less SSG**: Primarily SSR-focused
- **Newer**: Less battle-tested
- **Shopify-owned**: Some uncertainty about direction
- **Learning curve**: Different patterns from typical React

### When to choose Remix
- Care about progressive enhancement
- Building forms-heavy applications
- Want simpler mental model
- Performance without heavy JavaScript
- Web standards matter to you

### Ecosystem highlights
- **Remix Auth**: Authentication strategies
- **Conform**: Form validation
- **Remix Flat Routes**: Alternative routing

---

## Nuxt

The Vue.js full-stack framework. Everything Vue needs for production.

### Philosophy
- Vue's official full-stack solution
- Convention over configuration
- Auto-imports and zero-config
- Modular architecture

### Code example
```vue
<!-- pages/users.vue -->
<script setup>
const { data: users } = await useFetch('/api/users');

async function addUser(name) {
  await $fetch('/api/users', {
    method: 'POST',
    body: { name }
  });
  refreshNuxtData('users');
}
</script>

<template>
  <div>
    <h1>Users</h1>
    <ul>
      <li v-for="user in users" :key="user.id">
        {{ user.name }}
      </li>
    </ul>
  </div>
</template>
```

```typescript
// server/api/users.ts
export default defineEventHandler(async (event) => {
  if (event.method === 'GET') {
    return await db.users.findMany();
  }
  
  if (event.method === 'POST') {
    const body = await readBody(event);
    return await db.users.create({ data: body });
  }
});
```

### Strengths
- **Vue ecosystem**: Official solution, perfect integration
- **Auto-imports**: Components and composables just work
- **Modules**: Rich plugin ecosystem
- **TypeScript**: First-class support
- **Developer experience**: Excellent tooling

### Weaknesses
- **Vue-only**: Can't use React libraries
- **Smaller than Next**: Less examples, tutorials
- **Nuxt 2 → 3 migration**: Breaking changes
- **AI support**: Less than Next.js

### When to choose Nuxt
- You're using Vue (obvious choice)
- Want batteries-included Vue experience
- Like auto-imports and conventions
- Building Vue applications professionally

### Ecosystem highlights
- **Nuxt UI**: Component library
- **Nuxt Content**: Markdown/MDX support
- **Nuxt Auth**: Authentication
- **Pinia**: State management (built-in)

---

## SvelteKit

The official Svelte full-stack framework. Performance and simplicity.

### Philosophy
- Svelte's compiler advantage extended
- File-based routing
- Server and client unified
- Adapters for any deployment

### Code example
```svelte
<!-- src/routes/users/+page.svelte -->
<script>
  export let data;
</script>

<h1>Users</h1>
<ul>
  {#each data.users as user}
    <li>{user.name}</li>
  {/each}
</ul>
```

```typescript
// src/routes/users/+page.server.ts
export async function load() {
  const users = await db.users.findMany();
  return { users };
}

export const actions = {
  create: async ({ request }) => {
    const data = await request.formData();
    await db.users.create({
      data: { name: data.get('name') }
    });
  }
};
```

### Strengths
- **Performance**: Smallest bundles, fastest runtime
- **Simplicity**: Less boilerplate than React frameworks
- **Adapters**: Deploy to any platform easily
- **Forms**: Built-in progressive enhancement
- **TypeScript**: Excellent support

### Weaknesses
- **Smaller ecosystem**: Fewer libraries and examples
- **Job market**: Less demand than React
- **AI support**: Less training data
- **Community size**: Smaller but passionate

### When to choose SvelteKit
- Performance is critical
- You prefer Svelte's approach
- Building content-focused sites
- Want minimal JavaScript shipped
- Personal projects where ecosystem size doesn't matter

### Ecosystem highlights
- **Skeleton**: UI component library
- **Superforms**: Form handling
- **Lucia**: Authentication
- **Paraglide**: i18n

---

## Astro

Content-first framework with islands architecture.

### Philosophy
- Ship zero JavaScript by default
- Use any UI framework (or none)
- Islands of interactivity
- Content collections built-in

### Code example
```astro
---
// src/pages/users.astro
import Layout from '../layouts/Layout.astro';
import UserList from '../components/UserList.jsx'; // React component

const users = await fetch('https://api.example.com/users')
  .then(r => r.json());
---

<Layout title="Users">
  <h1>Users</h1>
  
  <!-- Static list, no JS -->
  <ul>
    {users.map(user => (
      <li>{user.name}</li>
    ))}
  </ul>
  
  <!-- Interactive React island -->
  <UserList client:visible users={users} />
</Layout>
```

### Strengths
- **Performance**: Zero JS by default, incredible speed
- **Framework agnostic**: Use React, Vue, Svelte, or nothing
- **Content focus**: Built for blogs, docs, marketing
- **Islands**: Add interactivity only where needed
- **SEO**: Static HTML is search engine perfect

### Weaknesses
- **Not for SPAs**: Wrong tool for app-like experiences
- **Limited interactivity**: Islands have boundaries
- **Newer patterns**: Different mental model
- **Server features**: API routes exist but not the focus

### When to choose Astro
- Content-heavy sites (blogs, docs, marketing)
- SEO is critical
- Want fastest possible page loads
- Interactivity is secondary
- Migrating from static site generators

### Ecosystem highlights
- **Starlight**: Documentation theme
- **Astro DB**: Built-in database
- **Content Collections**: Type-safe content
- **Integrations**: React, Vue, Svelte, Tailwind

---

## Quick comparison

| Aspect | Next.js | Remix | Nuxt | SvelteKit | Astro |
|--------|---------|-------|------|-----------|-------|
| Based on | React | React | Vue | Svelte | Any |
| Primary mode | SSR/SSG/ISR | SSR | SSR/SSG | SSR/SSG | Static |
| JS shipped | Medium-High | Medium | Medium | Low | Minimal |
| Learning curve | Medium | Medium | Low | Low | Low |
| Ecosystem | Huge | Medium | Large | Small | Medium |
| Best for | Most apps | Forms, PE | Vue apps | Performance | Content |

## Bundle size comparison (typical app)

```
Initial JS bundle (approximate):
Astro:      10-50 KB (depends on islands)
SvelteKit:  30-80 KB
Remix:      70-150 KB
Nuxt:       80-150 KB
Next.js:    80-200 KB
```

## Decision flowchart

```
Building a blog or docs site?
  → Astro
  
Using Vue?
  → Nuxt
  
Using Svelte?
  → SvelteKit
  
Heavy forms, progressive enhancement?
  → Remix
  
Using React, need flexibility?
  → Next.js
  
Content site with some interactivity?
  → Astro
  
Don't know what to pick?
  → Next.js (safest default)
```

## Deployment compatibility

| Framework | Vercel | Netlify | Cloudflare | Railway | Self-host |
|-----------|--------|---------|------------|---------|-----------|
| Next.js | Best | Good | Partial | Good | Good |
| Remix | Good | Good | Best | Good | Good |
| Nuxt | Good | Good | Good | Good | Good |
| SvelteKit | Good | Good | Good | Good | Good |
| Astro | Good | Good | Good | Good | Good |

Next.js has the deepest Vercel integration. SvelteKit and Astro have the most flexible adapter systems.

## The honest take

**For React developers**: Next.js is the safe default. Remix if you care about web standards and progressive enhancement.

**For Vue developers**: Nuxt. It's the obvious choice with excellent DX.

**For Svelte developers**: SvelteKit. Perfect Svelte integration.

**For content sites**: Astro. Nothing beats it for blogs, docs, and marketing sites.

**For apps that feel like apps**: Next.js or Remix. They handle complex interactivity better.

**If unsure**: Next.js has the largest ecosystem and most AI support. You can always learn others later.

## Further reading

- [Frontend frameworks compared](/basics/frontend-frameworks-compared/): React, Vue, Svelte basics
- [Backend frameworks compared](/basics/backend-frameworks-compared/): When you need separate backends
- [Deployment platforms compared](/basics/deployment-platforms-compared/): Where to host
- [What is SSR vs CSR?](/basics/what-is-ssr-vs-csr/): Rendering explained
