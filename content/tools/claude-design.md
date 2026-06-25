---
title: "Claude Design - Anthropic's Conversational Design Tool"
description: "Claude Design is Anthropic Labs' tool for turning conversation into editable HTML and CSS prototypes, slides, and one-pagers. It lives in claude.ai and needs a Pro, Max, Team, or Enterprise plan."
date: 2026-06-25
categories: [Tools]
tags: ["ai-ml", "claude", "claude-design", "design", "prototyping", "anthropic-labs"]
tool_category: "AI"
last_updated: 2026-06-25
lastmod: 2026-06-25
---

<figure class="bz-figure">
  <img src="/img/shaping-ai/boardroom-wireframe-building-notext.png" alt="A red wireframe building model floating above a dark boardroom table, representing a design blueprint generated from a conversation." loading="lazy">
  <figcaption>Claude Design produces a working blueprint you can edit and ship, not a flat picture of one.</figcaption>
</figure>

Claude Design is a tool from Anthropic Labs for creating visual work by talking to Claude. You describe what you want and it produces designs, prototypes, slides, and one-pagers. The important distinction: the output is not a static image. It is an interactive prototype built from HTML and CSS that you refine through conversation, then export or hand to engineering. Claude Design was launched on 17 April 2026 and is powered by Claude Opus 4.7, Anthropic's vision-capable model.

## Where it lives

Claude Design runs inside [claude.ai](/tools/claude-anthropic/), under the Anthropic Labs section of the product. There is nothing to install. You open it in the browser as part of your Claude subscription.

## What it is for

Claude Design targets the gap between a chat description and a shippable layout. It does three things a plain chat does not.

- **Generates interactive prototypes.** The result is live HTML and CSS you can click and test, not a screenshot. You refine it through conversation, inline comments, direct edits, or sliders.
- **Learns your design system.** It can read your codebase and your Figma files to extract an existing design system, then apply that system consistently to new work.
- **Hands off to engineering.** A finished design can be passed to Claude Code for implementation, and exported to Canva, PDF, PPTX, or a standalone HTML file.

<div class="bz-flow">
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Step 1</span><span class="bz-flow-step-name">Describe</span><span class="bz-flow-step-desc">You explain the screen, deck, or page you want, or point at a codebase or Figma file.</span></div>
  <div class="bz-flow-arrow">&rarr;</div>
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Step 2</span><span class="bz-flow-step-name">Generate</span><span class="bz-flow-step-desc">Claude builds an interactive HTML and CSS prototype from your description.</span></div>
  <div class="bz-flow-arrow">&rarr;</div>
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Step 3</span><span class="bz-flow-step-name">Refine</span><span class="bz-flow-step-desc">You adjust it through conversation, comments, direct edits, or sliders.</span></div>
  <div class="bz-flow-arrow">&rarr;</div>
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Step 4</span><span class="bz-flow-step-name">Ship</span><span class="bz-flow-step-desc">Export to Canva, PDF, PPTX, or HTML, or hand it to Claude Code to build.</span></div>
</div>

## It is not image generation

This is the most common confusion, so it is worth stating plainly. Claude Design makes interface and document layouts as code. It does not generate photographs, illustrations, or artwork. Claude has no native text-to-image model. If you need pixels, use [ChatGPT](/comparisons/claude-vs-chatgpt/) or a dedicated diffusion model such as [Stable Diffusion](/tools/stable-diffusion/). The full distinction is covered in [Claude vs ChatGPT](/comparisons/claude-vs-chatgpt/).

## Which subscription you need

Claude Design is available to paying Claude subscribers.

- **Pro** (about 19 EUR per month, listed at 20 US dollars) and **Max** (about 92 or 185 EUR per month, listed at 100 or 200 US dollars): full access in claude.ai.
- **Team**: available to members.
- **Enterprise**: available, but off by default. An administrator enables it in the organization settings before the team can use it.

## The Claude product family

Claude Design is one of several products built on the same models. They differ mainly in where they run and what they produce.

| | Where it lives | What it is for | Plan needed |
|---|---|---|---|
| **[Claude Code](/tools/claude-code/)** | Terminal and IDEs | Editing, running, and shipping code | Pro, Max, Team Premium, or API |
| **[Claude Design](/tools/claude-design/)** | claude.ai (Anthropic Labs) | Designing UI and documents as HTML | Pro, Max, Team, Enterprise |
| **[Claude Cowork](/tools/claude-cowork/)** | Claude Desktop app | Autonomous multi-step knowledge work | Any paid plan |
| **[Claude apps and API](/tools/claude-anthropic/)** | Web, mobile, desktop, API | Chat, analysis, building on the model | Free and up |

## When not to use it

- **You need a photograph or artwork.** Claude Design makes layouts, not pixels. Use [ChatGPT](/comparisons/claude-vs-chatgpt/) or [Stable Diffusion](/tools/stable-diffusion/).
- **You want production-grade code from day one.** Claude Design produces a prototype; pass it to [Claude Code](/tools/claude-code/) for a real implementation.
- **You only need a quick mockup sketch.** A plain [Claude chat](/tools/claude-anthropic/) with an artifact may be enough without the full design surface.

## Further reading

- [Claude Code](/tools/claude-code/): the coding agent that turns a Claude Design prototype into shipped code
- [Claude Cowork](/tools/claude-cowork/): the same agent engine for everyday knowledge work
- [Claude by Anthropic](/tools/claude-anthropic/): the models and apps underneath all of these products
- [Claude vs ChatGPT](/comparisons/claude-vs-chatgpt/): why Claude Design is not the same as image generation
- [Stable Diffusion](/tools/stable-diffusion/): an open-weight model for generating actual images
- [Introducing Claude Design (Anthropic Labs)](https://www.anthropic.com/news/claude-design-anthropic-labs): the official launch announcement and feature list
