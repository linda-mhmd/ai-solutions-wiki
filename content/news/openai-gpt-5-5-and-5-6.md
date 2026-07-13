---
title: "OpenAI Ships GPT-5.5, then the GPT-5.6 Sol/Terra/Luna Family"
description: "OpenAI released GPT-5.5 in April 2026 with a 1M-token context, then in mid-2026 moved to named capability tiers with the GPT-5.6 family: Sol, Terra, and Luna."
date: 2026-07-09
lastmod: 2026-07-13
last_updated: 2026-07-13
categories: [News]
tags: [openai, gpt-5, model-release, agentic-ai, reasoning]
related:
  - comparisons/llm-landscape-2026
  - glossary/reasoning-models
  - news/claude-opus-4-8
---

OpenAI moved quickly through the first half of 2026. It released GPT-5.5 on 23 April 2026 with a one-million-token context window and an agentic focus, then changed how it names models: the GPT-5.6 family, previewed 25 June 2026 and generally available 9 July 2026, splits into three named tiers, Sol (flagship), Terra (balanced), and Luna (low-cost). The shift from point releases to a named-tier lineup is itself the story, because it mirrors how the rest of the field now packages models by cost and capability.

## What happened

GPT-5.5 (and GPT-5.5 Pro, which adds extended-compute reasoning) shipped to ChatGPT, the Codex coding tool, and the API together, positioned around long-horizon agentic work: plan, use tools, self-check. The 1M-token context window put it on par with the largest context windows in the field.

GPT-5.6 replaced point versions with three tiers under one family: Sol for the hardest work, Terra for balanced use, and Luna for cost-sensitive volume. OpenAI shipped it across ChatGPT, Codex, and the API, and added a multi-agent orchestration beta. Because OpenAI's announcement pages block automated retrieval, these dates were confirmed against OpenAI's own system-card documents rather than the marketing pages; treat the exact preview-versus-GA day as OpenAI-stated.

## Why it matters for builders

Named tiers are a practical convenience: instead of guessing which point release fits, you pick Sol, Terra, or Luna by how much the task is worth, much as you would choose between an Opus, Sonnet, and Haiku tier. The 1M-token context in GPT-5.5 also reduces the need for aggressive retrieval on large inputs, though bigger context is not free and does not fix [context rot](/glossary/context-rot/).

The multi-agent orchestration beta is the direction to watch: OpenAI, like Anthropic and Google, is pushing tooling for running many model calls in a coordinated loop rather than one prompt at a time. If you are choosing a tier, benchmark Sol/Terra/Luna against [Claude Opus 4.8](/news/claude-opus-4-8/) and the rest of the field on your own workload; see the [2026 LLM landscape](/comparisons/llm-landscape-2026/).

## Sources

- OpenAI, "Introducing GPT-5.5" (23 April 2026): https://openai.com/index/introducing-gpt-5-5/ (system card: https://openai.com/index/gpt-5-5-system-card/)
- OpenAI, "GPT-5.6" (preview 25 June 2026, GA 9 July 2026): https://openai.com/index/gpt-5-6/
- OpenAI developer changelog: https://developers.openai.com/api/docs/changelog

## Further reading

- [The 2026 LLM landscape](/comparisons/llm-landscape-2026/): how the GPT-5.x tiers compare to rivals.
- [What are reasoning models?](/glossary/reasoning-models/): the capability GPT-5.5 Pro extends.
- [Context rot](/glossary/context-rot/): why a 1M-token window is not a substitute for good retrieval.
