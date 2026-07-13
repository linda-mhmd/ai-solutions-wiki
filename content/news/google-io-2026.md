---
title: "Google I/O 2026: Gemini Omni, an Agentic Search, and the End of Gemini CLI"
description: "At I/O on 19 May 2026 Google introduced Gemini Omni for video generation, made Search's AI Mode agentic at 1B+ users, launched the persistent Gemini Spark agent, and began replacing Gemini CLI with an Antigravity CLI."
date: 2026-05-19
lastmod: 2026-07-13
last_updated: 2026-07-13
categories: [News]
tags: [google, gemini, google-io, agentic-ai, search, developer-tools]
related:
  - news/gemini-3-5-flash
  - comparisons/llm-landscape-2026
  - tools/google-gemini
---

Google I/O on 19 May 2026 was an agentic release across the board. Google introduced Gemini Omni, a generative model that starts with video; made Search's AI Mode agentic at more than a billion monthly users; launched Gemini Spark, a persistent personal agent that keeps working after you close your laptop; and told developers it is replacing the Gemini CLI with a new Antigravity CLI. Alongside [Gemini 3.5 Flash](/news/gemini-3-5-flash/), the theme was clear: Google is moving its whole stack from assistant to autonomous agent.

## What happened

**Gemini Omni** is Google's "any input, any output" generative model, launched starting with video generation and folding Google's world-knowledge and generative-media work into one model; it became the headline video model at I/O, with a developer availability wave (Gemini Omni Flash) following in June. **Search's AI Mode** crossed a billion monthly users, moved to Gemini 3.5 Flash as its default, and gained "information agents" that monitor in the background plus agentic booking that can call businesses on your behalf.

For consumers, **Gemini Spark** is a 24/7 personal agent that runs on Google Cloud, paired with a proactive Daily Brief. For developers, Google announced it is **transitioning the Gemini CLI to an Antigravity CLI**, an agent-first, Go-based terminal tool that orchestrates multiple background agents; the older Gemini CLI and Code Assist extensions stopped serving Pro, Ultra, and free requests on 18 June 2026 (enterprise licenses unaffected). This built on the Gemini Enterprise Agent Platform, the evolution of Vertex AI into a unified agent-lifecycle platform launched at Cloud Next in April.

## Why it matters for builders

Two things matter concretely. First, if you use the Gemini CLI as a coding agent, plan the move to Antigravity CLI: the old extensions have already stopped serving consumer tiers. This wiki's [open-source coding agents](/comparisons/open-source-coding-agents/) page tracks that transition. Second, agentic Search changes discovery: if AI Mode books and monitors on a user's behalf, the surface your product is discovered through is itself becoming an agent, which reshapes SEO and integration.

Gemini Spark and the Enterprise Agent Platform point the same way as Anthropic's and OpenAI's agent tooling: the unit of work is shifting from a single prompt to a persistent, multi-step agent. Build for that, and see the [2026 LLM landscape](/comparisons/llm-landscape-2026/) for how Gemini compares.

## Sources

- Google, "The next evolution of the Gemini app" (Gemini Spark, 19 May 2026): https://blog.google/innovation-and-ai/products/gemini-app/next-evolution-gemini-app/
- Google, "Search at I/O 2026" (AI Mode agents): https://blog.google/products-and-platforms/products/search/search-io-2026/
- Google Developers, "Transitioning Gemini CLI to Antigravity CLI" (19 May 2026): https://developers.googleblog.com/an-important-update-transitioning-gemini-cli-to-antigravity-cli/
- Google, "Gemini Omni": https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-omni/

## Further reading

- [Google ships Gemini 3.5 Flash at I/O 2026](/news/gemini-3-5-flash/): the model powering the agentic Search default.
- [Open-source coding agents compared](/comparisons/open-source-coding-agents/): where the Gemini/Antigravity CLI fits.
- [The 2026 LLM landscape](/comparisons/llm-landscape-2026/): how Gemini compares across the field.
