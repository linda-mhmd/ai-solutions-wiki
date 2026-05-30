---
title: "Design Tokens"
description: "What design tokens are, how Jina Anne coined the term at Salesforce in 2014, and how the W3C Design Tokens Community Group is standardizing the format."
date: 2026-03-28
categories: [Glossary]
tags: [design-tokens, design-systems, Salesforce, W3C, CSS, theming]
related:
  - glossary/design-system
last_updated: 2026-05-30
---

Design tokens are named entities that store visual design attributes -- colors, typography, spacing, border radii, shadows, motion timing -- as platform-agnostic data rather than hard-coded values. They serve as the single source of truth for design decisions, allowing those decisions to be translated into variables, classes, or constants for any platform: CSS custom properties for web, XML resources for Android, Swift constants for iOS, or JSON for design tools.

## Origins and History

The term "design token" was coined by Jina Anne in 2014 while she was working as the founding designer on the Salesforce Lightning Design System (SLDS). Jina had been contributing to the Sass project and had experimented with storing color, spacing, and typography values in a YAML file, converting them into Sass variables and CSS classes using the Middleman static site generator. When she presented this approach to her team at Salesforce, it became the foundation for Theo, the first design token generator.

The motivation was scale. Salesforce needed to deliver consistent visual design across Android, iOS, and web platforms used by internal teams on Java, React, Angular, and PHP, as well as external partners and customers. Hard-coding design values in each platform's native format created drift, inconsistency, and maintenance burden. By storing values as structured data and generating platform-specific output, one change to a token propagated everywhere.

At the time, the Salesforce team still called their work a "style guide." The language shifted to "design system" as they launched design tokens into the Salesforce platform. Jina later founded Clarity, the first conference dedicated to design systems, and co-chairs the W3C Design Tokens Community Group.

## How Tokens Work

A design token has three components: a **name** (semantic, describing purpose rather than value, such as `color-background-primary` rather than `blue-500`), a **value** (the actual design attribute, such as `#0070D2` or `16px`), and a **type** (color, dimension, font family, etc.).

Tokens are typically organized in tiers. **Global tokens** (or reference tokens) define the raw palette: `blue-500: #0070D2`. **Semantic tokens** (or alias tokens) assign meaning: `color-action-primary: {blue-500}`. **Component tokens** apply semantic values to specific components: `button-background-color: {color-action-primary}`. This hierarchy enables theming -- switching from a light theme to a dark theme means remapping semantic tokens to different global values without changing component code.

**Token generators** transform token source files into platform-specific output. Salesforce's Theo was the first. Amazon's Style Dictionary (by Danny Banks) became the most widely adopted open-source alternative, supporting custom transforms and format templates. As of version 4, Style Dictionary has first-class support for the W3C DTCG format.

## W3C Design Tokens Specification

The Design Tokens Community Group (DTCG), co-chaired by Jina Anne, has developed a vendor-neutral JSON format for exchanging design tokens between tools. The specification reached its first stable version (2025.10) on October 28, 2025, after years of collaborative development.

The DTCG format uses JSON with `$`-prefixed properties: `$value` for the token's value, `$type` for its type, and `$description` for documentation. Token values can reference other tokens, enabling the alias/semantic pattern. The stable release introduced full support for modern CSS color spaces (Display P3, Oklch), theming and multi-brand support, and cross-platform code generation.

Tool support includes Tokens Studio, Penpot, Figma, Supernova, Knapsack, and zeroheight, among others. The specification is published by the W3C Community Group but is not a W3C Standard or on the W3C Standards Track.

## Sources

1. Anne, J. "Salesforce Lightning Design System." [https://www.jina.me/work/salesforce-lightning-design-system](https://www.jina.me/work/salesforce-lightning-design-system)
2. Smashing Magazine. "Smashing Podcast Episode 3 With Jina Anne: What Are Design Tokens?" November 2019. [https://www.smashingmagazine.com/2019/11/smashing-podcast-episode-3/](https://www.smashingmagazine.com/2019/11/smashing-podcast-episode-3/)
3. W3C Design Tokens Community Group. "Design Tokens specification reaches first stable version." October 28, 2025. [https://www.w3.org/community/design-tokens/2025/10/28/design-tokens-specification-reaches-first-stable-version/](https://www.w3.org/community/design-tokens/2025/10/28/design-tokens-specification-reaches-first-stable-version/)
4. Design Tokens Format Module 2025.10. [https://www.designtokens.org/tr/drafts/format/](https://www.designtokens.org/tr/drafts/format/)
