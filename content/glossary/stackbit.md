---
title: "Stackbit"
description: "The visual editing platform for Jamstack sites founded by Ohad Eder-Pressman in 2019, which pioneered real-time inline editing for headless CMS and static site generator workflows."
date: 2026-03-28
categories: [Glossary]
tags: [Stackbit, Jamstack, visual-editing, headless-CMS, Netlify, developer-tools]
related:
  - glossary/jamstack
  - glossary/static-site-generation
  - glossary/nextjs
last_updated: 2026-05-30
---

Stackbit is a visual editing platform that enables real-time, inline content editing for websites built on the Jamstack architecture. Founded by Ohad Eder-Pressman, Dan Barak, and Simon Hanukaev, Stackbit addressed the fundamental usability gap in Jamstack development: the disconnect between developer-optimized build workflows and content editor expectations for visual, WYSIWYG editing.

## Origins and History

The Jamstack architecture --- JavaScript, APIs, and Markup --- had gained significant developer adoption by 2018, but it introduced a content editing problem. Traditional CMSs like WordPress provided visual editing interfaces where content creators could see their changes in context. Headless CMSs, which Jamstack sites typically used, offered only abstract form-based editing disconnected from the final rendered output. Content creators lost the ability to preview their work visually, and the developer-editor collaboration workflow suffered.

Ohad Eder-Pressman, Dan Barak (CPO), and Simon Hanukaev (CTO) began exploring this problem in late 2018 and incorporated Stackbit in early 2019 [1]. Eder-Pressman's vision was to become both "the create button and the edit button for the Jamstack" --- making the architecture accessible to non-developers without compromising the developer experience that made Jamstack appealing.

At the JAMstack Conference in San Francisco in 2019, Eder-Pressman announced Stackbit Live, a browser-based widget that provided inline, on-page editing for Jamstack sites [2]. The widget acted as a control panel connecting the static site generator, headless CMS, and deployment pipeline. Content editors could click directly on page elements, make text and image changes, preview them in real time, and publish --- with changes automatically propagated to the underlying CMS and triggering a site rebuild.

In 2020, the team launched Stackbit Studio, a more comprehensive editing environment built around the same principle of real-time visual editing [3]. Stackbit Studio worked with multiple static site generators (Next.js, Gatsby, Hugo, Jekyll) and headless CMSs (Contentful, Sanity, or plain Git-based content), providing a unified editing layer regardless of the underlying technology stack.

## Key Concepts

**Visual editing for headless architectures.** Stackbit renders the actual site in an editing interface and overlays editable regions on top of the live content. Editors interact with the site as it will appear to users, not with abstract form fields in a CMS dashboard.

**Technology-agnostic integration.** Rather than replacing existing tools, Stackbit sits as a layer between the content source and the rendering framework. Developers choose their preferred static site generator and CMS; Stackbit provides the editing experience on top.

**Git-based content workflow.** Changes flow through Git, maintaining the version control and review workflows that developers depend on. Content edits produce commits, enabling pull request-based review and rollback.

**Developer-editor contract.** Stackbit attempted to establish a healthy boundary between developer concerns (site structure, components, deployment) and editor concerns (content, images, copy), allowing both roles to work efficiently within their domains.

## Acquisition by Netlify

Netlify acquired Stackbit in early 2024, integrating its visual editing technology into the Netlify platform. The acquisition aligned with Netlify's broader strategy of providing a complete Jamstack development and content management platform, combining deployment, serverless functions, and now visual editing under a single product.

## Sources

1. Eder-Pressman, O. (2019). Stackbit founding and early vision. https://www.heavybit.com/library/podcasts/jamstack-radio/ep-65-unbundling-the-web-with-ohad-eder-pressman-of-stackbit
2. Myers, A. (2019). "JAMstack Conference SF 2019." Medium. https://medium.com/memory-leak/jamstack-conference-sf-2019-d6030cfe30e9
3. Stackbit. (2020). "Announcing Stackbit Studio." Stackbit Blog. https://www.stackbit.com/blog/announcing-stackbit-studio
