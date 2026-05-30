---
title: "GitHub Pages"
description: "What GitHub Pages is, how it provides static site hosting directly from Git repositories, and its role in popularizing the static site generation workflow."
date: 2026-03-28
categories: [Glossary]
tags: [github-pages, static-sites, Jekyll, hosting, GitHub, git]
related:
  - glossary/ci-cd
  - glossary/cdn
  - glossary/pagefind
last_updated: 2026-05-30
---

GitHub Pages is a static site hosting service that serves websites directly from a GitHub repository. It supports custom domains, HTTPS, and automated builds from Markdown and HTML source files, making it one of the most widely used free hosting platforms for documentation, blogs, and project sites.

## Origins and History

GitHub Pages launched on December 18, 2008, less than a year after GitHub itself opened to the public in April 2008. The feature was closely tied to Jekyll, a static site generator created by GitHub co-founder Tom Preston-Werner.

On November 17, 2008, Preston-Werner published a blog post titled "Blogging Like a Hacker" that introduced Jekyll and articulated the philosophy behind what would become GitHub Pages. Preston-Werner argued that existing blogging platforms imposed unnecessary complexity -- databases, admin panels, comment systems -- when all a developer really needed was a way to write in a text editor, manage content with version control, and publish static files. Jekyll converted Markdown files and Liquid templates into plain HTML, with no server-side runtime required.

Preston-Werner did not originally build Jekyll for GitHub. He wrote it to power his own blog. When the GitHub team conceived of a hosting service that would let users push a repository and have it automatically built and published, Jekyll was the natural fit. The result was a workflow where writing a blog post meant committing a Markdown file and pushing to a `gh-pages` branch (later the `main` branch of a specially named repository).

## How It Works

**Repository-based publishing** -- A GitHub Pages site is served from a repository. For user or organization sites, the repository must be named `<username>.github.io`. For project sites, Pages can be served from the `main` branch, a `gh-pages` branch, or a `/docs` folder, configurable in repository settings.

**Build process** -- When source files are pushed, GitHub Pages runs a build pipeline. Historically this was limited to Jekyll, but in 2022 GitHub introduced custom GitHub Actions workflows for Pages, allowing any static site generator (Hugo, Eleventy, Astro, Next.js static export) to build and deploy to Pages.

**Custom domains** -- Users can configure a custom domain by adding a CNAME record and configuring the repository settings. GitHub provides free HTTPS certificates via Let's Encrypt for both `*.github.io` domains and custom domains.

**Limitations** -- GitHub Pages is designed for static content only. Sites have a soft limit of 1 GB in size and 100 GB of monthly bandwidth. Server-side code, databases, and dynamic request handling are not supported. The build environment for Jekyll restricts which plugins can be used, though the GitHub Actions build path removes this limitation.

## Impact on the Static Site Ecosystem

GitHub Pages was a catalyst for the modern static site movement. By providing free, zero-configuration hosting tied to Git workflows, it lowered the barrier for developers to publish documentation and personal sites. The popularity of GitHub Pages drove adoption of Jekyll, which in turn influenced the design of later static site generators including Hugo (2013), Hexo (2012), and Eleventy (2018).

The "push to publish" model -- where deploying a website is indistinguishable from committing code -- established a pattern that later evolved into the Jamstack architecture. Services like Netlify (2014) and Vercel (2015) built on the same core idea while adding features like serverless functions, form handling, and preview deployments.

GitHub Pages remains one of the most popular platforms for open-source project documentation, with projects like Bootstrap, React, and Kubernetes hosting their documentation sites on Pages.

## Sources

1. Preston-Werner, T. "Blogging Like a Hacker." November 17, 2008. [https://tom.preston-werner.com/2008/11/17/blogging-like-a-hacker.html](https://tom.preston-werner.com/2008/11/17/blogging-like-a-hacker.html)
2. GitHub Blog. "GitHub Pages." [https://github.blog/author/mojombo/](https://github.blog/author/mojombo/)
3. GitHub Docs. "About GitHub Pages." [https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages](https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages)
4. "Tom Preston-Werner." Wikipedia. [https://en.wikipedia.org/wiki/Tom_Preston-Werner](https://en.wikipedia.org/wiki/Tom_Preston-Werner)
