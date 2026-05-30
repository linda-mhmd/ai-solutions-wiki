---
title: "Static Site Generation (SSG)"
description: "The approach of pre-rendering web pages to static HTML at build time, tracing from Jekyll (Tom Preston-Werner, 2008) through modern frameworks like Next.js, Gatsby, and Astro."
date: 2026-03-28
categories: [Glossary]
tags: [SSG, static-site-generation, Jekyll, Hugo, Gatsby, pre-rendering, build-time, CDN]
related:
  - glossary/jamstack
  - glossary/server-side-rendering
  - glossary/nextjs
  - glossary/single-page-application
last_updated: 2026-05-30
---

Static site generation (SSG) is the practice of rendering web pages to static HTML files at build time rather than at request time. A static site generator takes source content (Markdown, data files, API responses), applies templates, and produces a directory of HTML, CSS, and JavaScript files that can be deployed to any web server or CDN without a runtime application server.

## Origins and History

Static HTML was the original web. The first websites in the early 1990s were hand-authored HTML files served directly from web servers. As websites grew in complexity, server-side scripting (CGI, PHP, ASP) and content management systems (WordPress, Drupal) replaced static files with dynamically generated pages. By the mid-2000s, the web development mainstream had moved almost entirely to dynamic, database-backed architectures.

The modern static site generator movement began when Tom Preston-Werner, one of the four co-founders of GitHub, sat down in his San Francisco apartment in October 2008 and decided to build his own blogging engine [1]. Frustrated with the complexity of WordPress and other blogging platforms, Preston-Werner wanted something simpler: write content in Markdown, run a build command, and get a directory of static HTML files.

He released Jekyll in November/December 2008 under the MIT license. Jekyll introduced two features that became standard across all subsequent static site generators: front matter (YAML metadata at the top of each content file) and "blog-aware" generation (placing Markdown files in a dated folder structure to automatically produce a blog). The project's tagline --- "Blog Like a Hacker" --- captured its developer-centric ethos [2].

Jekyll's impact multiplied when GitHub launched GitHub Pages, a free hosting service for Jekyll sites built directly from GitHub repositories. This combination --- write Markdown, push to GitHub, get a website --- lowered the barrier to static site publishing dramatically and propelled Jekyll to become the most popular static site generator by 2017.

## The Generator Explosion (2011-2020)

Jekyll's success inspired a wave of static site generators in different languages and with different design philosophies.

**Middleman** (Thomas Reynolds, 2009) and **Nanoc** (Denis Defreyne, 2007, predating Jekyll) served the Ruby community with more flexible asset pipelines. **Pelican** (Alexis Metaireau, 2010) brought SSG to Python developers. **Hugo** (Steve Francia, 2013) used Go for dramatically faster build times --- sites that took minutes to build with Jekyll built in seconds with Hugo. **Hexo** (Tommy Chen, 2012) targeted the Node.js community.

The JavaScript SSG era began with **Gatsby** (Kyle Mathews, 2015), which combined React components with GraphQL data fetching to build static sites that hydrated into full React SPAs on the client. **Next.js** (Vercel, 2016) added static export alongside its server-rendering capabilities, and its Incremental Static Regeneration (ISR) feature allowed individual pages to be regenerated without full rebuilds. **Eleventy** (Zach Leatherman, 2018) offered a simpler, zero-config JavaScript alternative that intentionally avoided client-side JavaScript frameworks. **Astro** (Fred K. Schott, 2021) introduced an "islands architecture" that shipped zero JavaScript by default, hydrating only interactive components.

## Key Concepts

**Build-time rendering.** Content is processed and HTML is generated during a build step, not when a user requests a page. The output is a directory of files that can be served by any static file server.

**Content sources.** Modern SSGs can pull content from Markdown files, YAML/JSON data, headless CMSs (Contentful, Sanity, Strapi), databases, or any API. The build process fetches, transforms, and renders this content into HTML.

**Template systems.** SSGs apply templates (Liquid, Nunjucks, JSX, Go templates) to content, producing consistent page layouts with dynamic content insertion. Templates handle navigation, headers, footers, and page-specific layouts.

**CDN deployment.** Static files deploy naturally to CDN edge networks. Every page is served from the nearest edge node, producing sub-10ms response times. There is no origin server to overload, no database to scale, and no application framework to patch.

**Incremental builds.** A persistent challenge with SSG is that changing one page requires rebuilding the entire site. Modern solutions address this: Hugo's sub-second builds make full rebuilds practical even for large sites, while Next.js ISR and Gatsby's incremental builds regenerate only changed pages.

## Tradeoffs

SSG works best for content that changes infrequently relative to how often it is read. Sites with thousands of pages that update every few seconds (real-time dashboards, social feeds) are poor candidates for build-time generation. The build step also introduces a delay between content authoring and publication that dynamic CMSs do not have.

## Sources

1. Preston-Werner, T. (2008). "Blogging Like a Hacker." November 17, 2008. https://tom.preston-werner.com/2008/11/17/blogging-like-a-hacker.html
2. Jekyll GitHub Repository. https://github.com/jekyll/jekyll
3. CloudCannon. "The History of Static Site Generators." https://cloudcannon.com/blog/ssg-history-2-after-jekyll/
4. O'Reilly. "Static Site Generators." https://www.oreilly.com/content/static-site-generators/
