---
title: "Next.js"
description: "The React framework created by Vercel (formerly Zeit) in 2016 that popularized server-side rendering, file-based routing, and hybrid rendering strategies for production React applications."
date: 2026-03-28
categories: [Glossary]
tags: [Next.js, React, SSR, Vercel, framework, server-side-rendering, file-based-routing]
related:
  - glossary/react
  - glossary/server-side-rendering
  - glossary/static-site-generation
  - glossary/typescript
  - glossary/jamstack
last_updated: 2026-05-30
---

Next.js is a React framework for building full-stack web applications. Created by Guillermo Rauch and the team at Zeit (now Vercel), Next.js provides server-side rendering, static site generation, file-based routing, and API routes out of the box, solving the configuration complexity that plagued production React deployments.

## Origins and History

By 2016, React had established itself as the dominant UI library, but deploying a React application to production required assembling a complex toolchain: Webpack configuration, Babel presets, server-side rendering setup, code splitting, and routing. Each project reinvented these solutions.

Guillermo Rauch, CEO of Zeit (later Vercel), recognized this gap. Rauch was already known in the JavaScript community as the creator of Socket.IO. His philosophy was that rendering should occur as close to the data source as possible, and that server-side rendering should be a default rather than an afterthought.

On October 25, 2016, Rauch and the Zeit team released Next.js as an open-source project on GitHub [1]. The initial release was built on six principles: zero-configuration setup, JavaScript everywhere (same language on client and server), automatic code splitting, server-side rendering by default, file-system-based routing, and simplicity of deployment. The framework aimed to be the "Ruby on Rails" of the React ecosystem --- opinionated defaults with the ability to eject when needed.

Tim Neutkens joined as lead maintainer and drove much of the framework's subsequent evolution, alongside contributors Naoyuki Kanezawa, Arunoda Susiripala, Tony Kovanen, and Dan Zajdband [2].

## Key Concepts

**File-based routing.** Pages are defined by their filesystem path within the `pages/` directory (or `app/` directory in Next.js 13+). A file at `pages/about.js` automatically maps to the `/about` route, eliminating manual route configuration.

**Server-side rendering (SSR).** Next.js renders React components to HTML on the server for each request. The browser receives fully rendered HTML that is immediately visible, then React hydrates the page to make it interactive. This improves both perceived performance and search engine indexing.

**Static site generation (SSG).** Pages can be pre-rendered at build time using `getStaticProps`, producing static HTML files served from a CDN. Incremental Static Regeneration (ISR), introduced in Next.js 9.5, allows individual pages to be regenerated in the background after deployment without a full rebuild.

**The shift from SPA to hybrid rendering.** Next.js was instrumental in moving the React community away from pure single-page application architecture. By enabling per-page rendering strategy selection (SSR, SSG, or client-side), it introduced the concept of hybrid rendering where different pages in the same application use different rendering approaches based on their requirements.

**API routes.** Serverless API endpoints defined as files in `pages/api/` allow backend logic to coexist with frontend code in the same project, reducing the need for separate backend services for simple operations.

## App Router and React Server Components

Next.js 13 (October 2022) introduced the App Router, a fundamental architectural shift built on React Server Components. Server Components render entirely on the server and send zero JavaScript to the client, while Client Components handle interactivity. This architecture significantly reduces client-side bundle sizes and enables co-located data fetching at the component level rather than the page level.

## Impact

Next.js became the de facto framework for production React applications. In April 2020, Zeit rebranded to Vercel, reflecting the company's evolution from deployment tool to full frontend platform. By 2026, Next.js powers applications at companies including Netflix, Hulu, Nike, Twitch, and the Washington Post, and the framework has accumulated over 130,000 GitHub stars.

## Sources

1. Rauch, G. et al. (2016). "Next.js: A minimalist framework for server-rendered React applications." GitHub initial release, October 25, 2016. https://github.com/vercel/next.js
2. Zeit Blog. (2016). "Next.js." Original announcement. https://vercel.com/blog/next
3. Next.js Documentation. https://nextjs.org/docs
