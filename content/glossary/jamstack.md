---
title: "JAMstack"
description: "The web architecture pattern coined by Mathias Biilmann of Netlify in 2016, combining JavaScript, APIs, and Markup to deliver fast, secure, and scalable websites served from CDNs."
date: 2026-03-28
categories: [Glossary]
tags: [JAMstack, Jamstack, Netlify, static-sites, CDN, APIs, JavaScript, web-architecture]
related:
  - glossary/static-site-generation
  - glossary/single-page-application
  - glossary/nextjs
  - glossary/stackbit
  - glossary/nodejs
last_updated: 2026-05-30
---

JAMstack (JavaScript, APIs, and Markup) is a web architecture pattern that decouples the frontend presentation layer from backend services. Sites are pre-built as static files served from CDNs, with dynamic functionality handled by client-side JavaScript calling APIs. The term was coined by Mathias Biilmann, CEO of Netlify, to describe an architectural approach that had been emerging across the web development community.

## Origins and History

The practices that would become JAMstack had roots in the static site generator movement (Jekyll, 2008) and the rise of headless CMSs and third-party APIs. By 2015, developers were building sites that combined static HTML generation with client-side JavaScript and API calls, but the pattern lacked a name and a coherent identity.

Mathias Biilmann, co-founder and CEO of Netlify, coined the term "JAMstack" and formally introduced it on stage at a Smashing Magazine conference in San Francisco in 2016 [1]. A friend of Biilmann's, Andreas Saebjoernsen (then at Uber), originally suggested the name. Biilmann's insight was that this was not a new technology but a new architecture --- a way of composing existing technologies (static site generators, CDNs, APIs, client-side JavaScript) into a coherent stack that could replace the traditional LAMP (Linux, Apache, MySQL, PHP) stack for many use cases.

The name itself encoded the three layers: **J**avaScript for dynamic functionality in the browser, **A**PIs for server-side operations accessed over HTTPS, and **M**arkup pre-built at deploy time (typically by a static site generator). The critical architectural principle was that the markup was pre-rendered --- not generated on each request by an application server --- and served directly from a CDN.

Smashing Magazine itself became a high-profile case study. Biilmann scraped Smashing's entire WordPress site, hosted the static HTML on Netlify, and demonstrated that the static version was more than six times faster on average [2]. Smashing Magazine subsequently completed a full migration from WordPress to a JAMstack architecture.

## Key Concepts

**Pre-rendering.** Pages are generated at build time, not at request time. Whether using a static site generator (Jekyll, Hugo, Gatsby, Eleventy) or a framework with static export (Next.js), the output is HTML files that can be served without a running application server.

**CDN-first delivery.** Because the output is static files, the entire site can be deployed to a CDN edge network. Users receive content from the geographically nearest edge node, with response times measured in single-digit milliseconds rather than the hundreds of milliseconds typical of origin-server rendering.

**Decoupled architecture.** The frontend is separated from backend services. Content comes from headless CMSs (Contentful, Sanity, Strapi), authentication from identity providers (Auth0, Netlify Identity), search from dedicated services (Algolia), and commerce from headless platforms (Shopify Storefront API). Each service is accessed via its API.

**Atomic deploys.** Each deployment produces a complete, immutable snapshot of the site. Rollbacks are instant (point the CDN at a previous snapshot), and there is no risk of partial deployments or version mismatches between files.

**Security surface reduction.** With no application server, database, or dynamic runtime exposed to the public internet, the attack surface is minimal. Static files on a CDN present far fewer vulnerability vectors than a running WordPress or Rails instance.

## Evolution of the Term

By 2020, the community dropped the capitalization from "JAMstack" to "Jamstack," reflecting that the term had evolved from an acronym describing specific technologies to a proper noun describing an architectural philosophy. Sites built with Next.js ISR (Incremental Static Regeneration) or Remix server rendering stretched the original definition, leading to debates about what qualified as "Jamstack." The core principle --- pre-rendering where possible, enhancing with JavaScript, accessing services via APIs --- remained the unifying thread.

## Sources

1. Biilmann, M. (2016). "The New Front-end Stack." Smashing Magazine Conference, San Francisco, 2016. Referenced in: https://www.smashingmagazine.com/author/mathias-biilmann/
2. Biilmann, M. and Bach, C. (2017). "JAMstack, Netlify CMS, and 10x-ing Smashing Magazine." The Changelog, Episode 251. https://changelog.com/podcast/251
3. Biilmann, M. and Hawksworth, P. (2019). *Modern Web Development on the Jamstack.* O'Reilly Media / Netlify. https://www.netlify.com/oreilly-jamstack/
4. Jamstack.org. https://jamstack.org/
