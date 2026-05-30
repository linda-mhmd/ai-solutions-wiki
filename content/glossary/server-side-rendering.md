---
title: "Server-Side Rendering (SSR)"
description: "The web rendering paradigm where HTML is generated on the server for each request, from its origins as the default web model through its modern return via Next.js, Remix, and React Server Components."
date: 2026-03-28
categories: [Glossary]
tags: [SSR, server-side-rendering, hydration, React, Next.js, Remix, web-architecture, isomorphic]
related:
  - glossary/nextjs
  - glossary/remix
  - glossary/static-site-generation
  - glossary/single-page-application
  - glossary/react
last_updated: 2026-05-30
---

Server-side rendering (SSR) is the practice of generating HTML on the server in response to each client request, sending a fully rendered page to the browser. In its modern form, SSR combines server-generated HTML for fast initial display with client-side JavaScript that makes the page interactive --- a process called hydration.

## Origins and History

Server-side rendering was the original web paradigm. When Tim Berners-Lee created the World Wide Web in 1991, every page was a static or server-generated HTML document. CGI scripts (1993), PHP (1995), ASP (1996), and JSP (1999) generated HTML on the server in response to requests. Java Servlets, Ruby on Rails (2004), and Django (2005) formalized this model into MVC frameworks where the server assembled complete HTML pages using templates and database queries [1].

The SPA (single-page application) movement of 2010-2016 inverted this model. Frameworks like AngularJS, Backbone, and React moved rendering to the browser: the server sent a minimal HTML shell with a JavaScript bundle, and the browser constructed the page client-side. This improved interactivity but degraded initial load performance, search engine indexability, and accessibility.

The return of SSR began with **Next.js** (Vercel, October 2016), which made server-side rendering a default behavior for React applications [2]. Instead of requiring developers to configure complex server-rendering pipelines with React's `renderToString` API, Express server setup, and hydration plumbing, Next.js handled it automatically. A React component rendered on the server, sent HTML to the browser, and React hydrated it client-side.

**Remix** (Ryan Florence and Michael Jackson, November 2021) pushed SSR further by building on web standards: loaders fetch data on the server using the Fetch API, actions handle mutations, and the framework progressively enhances from server-rendered HTML to interactive client-side behavior [3].

## How Modern SSR Works

**1. Server rendering.** When a request arrives, the server executes the React (or Vue, Svelte, etc.) component tree, fetching data and producing an HTML string. This HTML includes the full page content --- text, images, layout --- visible immediately when the browser receives it.

**2. HTML delivery.** The server sends the HTML response along with references to JavaScript bundles. The user sees a fully rendered page before any JavaScript loads. This dramatically improves Time to First Contentful Paint (FCP) compared to client-side rendering, where the user sees a blank page or loading spinner until JavaScript executes.

**3. Hydration.** The browser downloads the JavaScript bundle and React (or the relevant framework) "hydrates" the server-rendered HTML. Hydration attaches event handlers, initializes state, and makes the page interactive. React compares its virtual DOM with the server-rendered DOM and expects them to match. If they differ, a hydration mismatch error occurs.

**4. Client-side navigation.** After hydration, subsequent navigations happen client-side. The framework fetches data via API calls or server functions and updates the DOM without a full page reload, preserving the SPA-like interactive experience.

## Key Concepts

**Hydration.** The process of making server-rendered HTML interactive by attaching JavaScript event handlers and state. The term reflects the metaphor of "rehydrating" dry HTML with the "water" of interactivity. Hydration must produce a DOM identical to the server-rendered HTML; mismatches cause errors and visual glitches.

**Isomorphic (Universal) JavaScript.** Code that runs identically on both server and client. SSR frameworks require components to be isomorphic --- they cannot reference browser-only APIs (window, document) during server rendering. This constraint shapes how SSR applications are architected.

**Streaming SSR.** React 18 introduced streaming server-side rendering, where the server begins sending HTML to the browser before the entire page is rendered. Components that depend on slow data sources are wrapped in `<Suspense>` boundaries and stream in when ready. This allows the browser to start rendering the page progressively rather than waiting for the slowest data source.

**React Server Components (RSC).** Introduced in Next.js 13 (October 2022), RSC represents the next evolution of SSR. Server Components render entirely on the server and send their output as a serialized format (not HTML) to the client. They never hydrate and ship zero client-side JavaScript. Client Components handle interactivity and hydrate normally. This hybrid model significantly reduces the amount of JavaScript shipped to the browser.

## SSR vs. SSG vs. CSR

**SSR** generates HTML per request. Best for personalized, frequently updated, or user-specific content where build-time rendering is impractical.

**SSG** generates HTML at build time. Best for content that changes infrequently (blogs, documentation, marketing pages) and benefits from CDN caching.

**CSR** (client-side rendering) generates HTML in the browser. Best for highly interactive applications behind authentication where SEO is not a concern (dashboards, internal tools).

Modern frameworks like Next.js allow mixing all three strategies within a single application, choosing the optimal rendering approach per page or per component.

## Sources

1. Fielding, R. (2000). "Architectural Styles and the Design of Network-based Software Architectures." Doctoral dissertation, UC Irvine. Describes the original web architecture. https://www.ics.uci.edu/~fielding/pubs/dissertation/top.htm
2. Rauch, G. et al. (2016). Next.js initial release, October 25, 2016. https://github.com/vercel/next.js
3. Florence, R. and Jackson, M. (2021). "Remix v1." Remix Blog, November 22, 2021. https://remix.run/blog/remix-v1
4. React Documentation. "Server Components." https://react.dev/reference/rsc/server-components
