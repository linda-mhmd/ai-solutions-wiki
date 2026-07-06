---
title: "Google Ships Gemini 3.5 Flash at I/O 2026"
description: "Google announced Gemini 3.5 Flash at I/O on 19 May 2026 as the first model in the Gemini 3.5 family, with gains on coding and agentic benchmarks."
date: 2026-07-06
lastmod: 2026-07-06
last_updated: 2026-07-06
categories: [News]
tags: [google, gemini, reasoning, multimodal, model-release]
related:
  - tools/google-gemini
  - glossary/reasoning-models
  - glossary/multimodal-model
---

Google announced Gemini 3.5 Flash at Google I/O on 19 May 2026. It is the first released model in the Gemini 3.5 family. Google reports gains on coding and agentic benchmarks over the previous Gemini 3.1 Pro, along with faster output.

## What happened

Google introduced Gemini 3.5 Flash at Google I/O on 19 May 2026. It is the first released model in the Gemini 3.5 family.

Google states that Gemini 3.5 Flash outperforms the previous Gemini 3.1 Pro on coding and agentic benchmarks. As one example, Google cites Terminal-Bench 2.1 at 76.2 percent. The company also reports that the model produces output roughly 4x faster than other frontier models.

## Why it matters for builders

A Flash-tier model that beats the prior Pro tier on coding and agentic tasks shifts what you can run in latency-sensitive paths. Faster output matters most for interactive tools and agent loops, where each step waits on the previous one. Roughly 4x faster generation compresses the wait in those loops.

For teams comparing {{< relref "glossary/reasoning-models" >}} across providers, the Terminal-Bench 2.1 figure of 76.2 percent gives a concrete point to benchmark against. Because Gemini is a {{< relref "glossary/multimodal-model" >}}, the same model handles text, image, and other inputs in one call. See {{< relref "tools/google-gemini" >}} for API and tooling details.

## Sources

1. Google. "Gemini 3.5" (19 May 2026). [https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-5/](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-5/)
