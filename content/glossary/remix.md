---
title: "Remix"
description: "The full-stack React framework created by Ryan Florence and Michael Jackson in 2021, built on web standards and the loader/action pattern for server-centric data handling."
date: 2026-03-28
categories: [Glossary]
tags: [Remix, React, full-stack, web-standards, routing, loaders, actions, React-Router]
related:
  - glossary/react
  - glossary/react-router
  - glossary/nextjs
  - glossary/server-side-rendering
last_updated: 2026-09-25
lastmod: 2026-09-25
last_verified: 2026-09-25
---

Remix is a full-stack web framework for React that emphasizes web standards, progressive enhancement, and server-centric data loading. Created by Ryan Florence and Michael Jackson --- the same developers behind React Router --- Remix introduced the loader/action pattern and nested routing to simplify how React applications fetch data and handle form submissions.

## Origins and History

Ryan Florence and Michael Jackson had been central figures in the React ecosystem since 2014 through their work on React Router and their company React Training. After years of teaching thousands of teams how to build React applications, they identified a persistent pain point: data loading and mutation in React applications was unnecessarily complex. Client-side state management libraries like Redux had become de facto requirements, and the disconnect between routing and data fetching produced cascading loading states and waterfall requests.

In early 2020, Florence and Jackson began building Remix as a framework that would leverage web platform primitives --- HTTP, HTML forms, cookies, and standard Request/Response objects --- rather than inventing framework-specific abstractions. They launched a paid "supporter preview" in October 2020 to fund development [1].

On October 10, 2021, they announced $3 million in seed funding led by OSS Capital, with participation from Naval Ravikant, Ram Shriram, and Sahil Lavingia [2]. With the funding, they committed to releasing Remix under the MIT license. Remix v1 shipped as a free, open-source framework on November 22, 2021 [3].

## Key Concepts

**Nested routing.** Remix's routing model, inherited from React Router, maps URL segments to nested layout components. Each route segment can independently load data, handle errors, and render loading states. When a user navigates, only the route segments that change re-fetch data and re-render, avoiding full-page reloads and reducing redundant data fetching.

**Loader/action pattern.** Every route can export a `loader` function (for GET requests) and an `action` function (for mutations via POST, PUT, DELETE). Loaders run on the server before the component renders, providing data as serialized JSON. Actions handle form submissions using standard HTML `<form>` elements. This pattern eliminates the need for client-side state management for most data operations.

**Web standards-first.** Remix builds on the Web Fetch API. Loaders and actions receive standard `Request` objects and return standard `Response` objects. Cookies, headers, and status codes use their web-standard APIs. This means knowledge of Remix transfers directly to knowledge of the web platform, and code can run on any JavaScript runtime that supports the Fetch API (Node.js, Deno, Cloudflare Workers).

**Progressive enhancement.** Remix applications work without JavaScript. HTML forms submit data, pages render server-side HTML, and links navigate with full page loads. When JavaScript loads, Remix progressively enhances these interactions: forms submit via fetch, navigations happen client-side, and transitions animate. The application never breaks if JavaScript fails to load.

## Merger with React Router

In 2023, the Remix team recognized that Remix v2 had become a thin wrapper around React Router. Rather than maintain the artificial separation, they announced in May 2024 that they would merge Remix's server runtime and bundler capabilities directly into React Router v7, released on 22 November 2024. React Router v7 in "framework mode" provides the full Remix feature set --- loaders, actions, server rendering --- under the React Router name, and it is the upgrade path for Remix v1 and v2 applications.

## Remix 3

In May 2025 the team announced that the Remix name would be reused for a new framework rather than a new version of the React-based one [5]. Remix 3 is not built on React: it started from a fork of Preact and ships its own component model, router, asset server, and data tools as a single `remix` package, designed around web APIs with as few dependencies as possible. A beta followed on 30 April 2026 and the first release candidate on 31 August 2026, with the stable release scheduled for 2 October 2026 [6]. For existing Remix v1 and v2 applications, the team describes React Router as the stable, long-term-supported path [5].

## Sources

1. Florence, R. and Jackson, M. (2020). Remix supporter preview launch, October 2020. https://remix.run
2. Jackson, M. and Florence, R. (2021). "Seed Funding for Remix." Remix Blog, October 10, 2021. https://remix.run/blog/seed-funding-for-remix
3. Florence, R. and Jackson, M. (2021). "Remix v1." Remix Blog, November 22, 2021. https://remix.run/blog/remix-v1
4. Remix Documentation. https://remix.run/docs
5. Jackson, M. and Florence, R. (2025). "Wake up, Remix!" Remix Blog, May 28, 2025. https://remix.run/blog/wake-up-remix
6. Lybrand, B. (2026). "Remix 3 Release Candidate." Remix Blog, August 31, 2026. https://remix.run/blog/remix-3-release-candidate
