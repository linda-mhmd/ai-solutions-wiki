---
title: "Pagefind"
description: "What Pagefind is, how it provides static search for static sites using WebAssembly-based indexing, and why its chunked index design enables low-bandwidth search at scale."
date: 2026-03-28
categories: [Glossary]
tags: [pagefind, static-search, WebAssembly, static-sites, CloudCannon, search]
related:
  - glossary/github-pages
  - glossary/cdn
last_updated: 2026-05-30
---

Pagefind is an open-source static search library that adds full-text search to static websites without requiring any server-side infrastructure. Developed by CloudCannon, it runs entirely in the browser using WebAssembly, indexing the site at build time and loading only the minimal index fragments needed to answer each query.

## Origins and History

Pagefind was introduced by Liam Bigelow, a Senior Software Engineer at CloudCannon, on July 15, 2022. CloudCannon used HugoConf 2022 as the venue for the announcement, and Bigelow published an accompanying blog post titled "Introducing Pagefind: static low-bandwidth search at scale."

The project was motivated by a fundamental problem with existing static search solutions: they required downloading the entire search index to the browser before a single query could run. For small sites this was acceptable, but for large sites with thousands of pages, the search index could be many megabytes -- an unacceptable download for users on low-bandwidth connections or mobile devices. Existing tools like Lunr.js and Fuse.js loaded everything upfront, making them impractical at scale.

Pagefind's key innovation is a chunked index architecture. Rather than building one monolithic index, Pagefind splits the search space into ordered chunks at build time. A search for "CloudCannon" does not need to load the index region containing "Jamstack." Full-text content and metadata for results are stored in separate files, giving fine-grained control over network loading. The result is that the total data transferred for a typical search interaction is in the range of tens to hundreds of kilobytes, regardless of total site size.

## How It Works

**Build-time indexing** -- After a static site generator produces HTML output, Pagefind runs as a post-build step. It crawls the generated HTML files, extracts text content from specified elements (by default, the `<body>` tag, configurable via `data-pagefind-body` attributes), and generates a compressed, chunked index as static files alongside the site.

**Browser-side search** -- The Pagefind JavaScript library and its WebAssembly search engine are loaded in the browser. When a user types a query, the library fetches only the relevant index chunks via standard HTTP requests. The WebAssembly module performs the actual search logic -- tokenization, stemming, and ranking -- in the browser with near-native performance.

**Progressive loading** -- As the user types, Pagefind progressively loads index chunks. Each additional character narrows the search space and may require fetching additional (smaller) chunks or may already have sufficient data from previous fetches. This incremental approach means search feels instantaneous even on large sites.

**UI components** -- Pagefind ships with optional prebuilt UI components (`pagefind-ui`) that provide a search input, results list, and filtering interface with no configuration required. For custom interfaces, the Pagefind JavaScript API provides programmatic access to search results, filters, and metadata.

## Technical Design

The index is built in Rust and compiled to both a native binary (for build-time indexing) and WebAssembly (for browser-side search). This dual-compilation strategy means the same search logic runs at build time and in the browser. Pagefind supports multilingual search with language-specific stemming, content filtering and faceted search via `data-pagefind-filter` attributes, custom metadata via `data-pagefind-meta` attributes, and indexing of non-HTML content through a Node.js API.

Pagefind is static site generator agnostic -- it operates on the HTML output, not the source files, so it works with Hugo, Eleventy, Astro, Jekyll, Next.js static export, or any tool that produces HTML.

## Sources

1. Bigelow, L. "Introducing Pagefind: static low-bandwidth search at scale." CloudCannon Blog. July 15, 2022. [https://cloudcannon.com/blog/introducing-pagefind/](https://cloudcannon.com/blog/introducing-pagefind/)
2. Wray, B. "Pagefind is quite a find for site search." BryceWray.com. July 2022. [https://www.brycewray.com/posts/2022/07/pagefind-quite-find-site-search/](https://www.brycewray.com/posts/2022/07/pagefind-quite-find-site-search/)
3. Pagefind GitHub Repository. [https://github.com/CloudCannon/pagefind](https://github.com/CloudCannon/pagefind)
4. Pagefind Documentation. [https://pagefind.app](https://pagefind.app)
