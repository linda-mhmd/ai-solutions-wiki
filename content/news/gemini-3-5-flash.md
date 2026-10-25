---
title: "Google Ships Gemini 3.5 Flash at I/O 2026"
description: "Google announced Gemini 3.5 Flash at I/O on 19 May 2026 as the first model in the Gemini 3.5 family, with gains on coding and agentic benchmarks."
date: 2026-07-06
lastmod: 2026-10-25
last_updated: 2026-10-25
categories: [News]
tags: [google, gemini, reasoning, multimodal, model-release]
related:
  - tools/google-gemini
  - glossary/reasoning-models
  - glossary/multimodal-model
---

Google announced Gemini 3.5 Flash at Google I/O on 19 May 2026. It is the first released model in the Gemini 3.5 family. Google reports gains on coding and agentic benchmarks over the previous Gemini 3.1 Pro, along with faster output.

> **Update, 25 October 2026: deprecated on 8 October.** The Gemini API release notes for 8 October 2026 say `gemini-3.5-flash` "is deprecated and has been replaced by `gemini-3.6-flash`. It is no longer available to select in Google AI Studio, and API requests to `gemini-3.5-flash` are automatically routed to `gemini-3.6-flash`." Google suggests updating the model string to `gemini-3.6-flash` or `gemini-3.8-flash`. The deprecations page adds that "the endpoint is not shutting down", so no shutdown date exists. The rest of this entry describes the model as it launched.

## What happened

Google introduced Gemini 3.5 Flash at Google I/O on 19 May 2026. It is the first released model in the Gemini 3.5 family.

Google states that Gemini 3.5 Flash outperforms the previous Gemini 3.1 Pro on coding and agentic benchmarks. As one example, Google cites Terminal-Bench 2.1 at 76.2 percent. The company also reports that the model produces output roughly 4x faster than other frontier models.

## Why it matters for builders

A Flash-tier model that beats the prior Pro tier on coding and agentic tasks shifts what you can run in latency-sensitive paths. Faster output matters most for interactive tools and agent loops, where each step waits on the previous one. Roughly 4x faster generation compresses the wait in those loops.

For teams comparing {{< relref "glossary/reasoning-models" >}} across providers, the Terminal-Bench 2.1 figure of 76.2 percent gives a concrete point to benchmark against. Because Gemini is a {{< relref "glossary/multimodal-model" >}}, the same model handles text, image, and other inputs in one call. See {{< relref "tools/google-gemini" >}} for API and tooling details.

## Sources

1. Google. "Gemini 3.5" (19 May 2026). [https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-5/](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-5/)
2. Google, Gemini API release notes, 8 October 2026 entry (fetched 25 October 2026). [https://ai.google.dev/gemini-api/docs/changelog](https://ai.google.dev/gemini-api/docs/changelog)
3. Google, Gemini API deprecations (fetched 25 October 2026). [https://ai.google.dev/gemini-api/docs/deprecations](https://ai.google.dev/gemini-api/docs/deprecations)

## Further reading

- [The 2026 LLM landscape](/comparisons/llm-landscape-2026/): how Gemini 3.5 Flash compares across providers.
- [What are reasoning models?](/glossary/reasoning-models/): the class Gemini's agentic gains build on.
- [OpenAI ships GPT-5.5 and GPT-5.6](/news/openai-gpt-5-5-and-5-6/): the competing frontier family.
- [Google Gemini](/tools/google-gemini/): API and tooling details.
