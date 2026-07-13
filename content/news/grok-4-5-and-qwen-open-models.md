---
title: "More 2026 Model Releases: Grok 4.5 and Qwen's Open Family"
description: "Two more significant 2026 model tracks: xAI's Grok 4.5, a closed coding-and-agentic flagship, and Alibaba's open-weight Qwen 3.5 and 3.6 models, natively multimodal and Apache-licensed."
date: 2026-07-08
lastmod: 2026-07-13
last_updated: 2026-07-13
categories: [News]
tags: [xai, grok, alibaba, qwen, open-weights, model-release]
related:
  - comparisons/llm-landscape-2026
  - news/deepseek-v4
  - glossary/mixture-of-experts
---

Two more model tracks rounded out the 2026 frontier. xAI shipped Grok 4.5, a closed model built for coding and agentic work, while Alibaba pushed its open-weight Qwen family forward with the natively multimodal Qwen 3.5 and the coding-focused Qwen 3.6. They sit at opposite ends of the open-versus-closed spectrum, which is exactly why both are worth tracking.

## What happened

**xAI Grok 4.5** was announced on 8 July 2026 as xAI's most capable model, aimed at coding, agentic tasks, and knowledge work, with a 500,000-token context window. It is available through the API and the Grok apps; xAI does not release open weights for its frontier Grok models.

**Alibaba's Qwen** went the open route. Qwen 3.5 (announced 15 February 2026) is a natively multimodal mixture-of-experts flagship, roughly 397 billion total parameters with about 17 billion active, spanning some 201 languages, with open weights. Qwen 3.6 (Qwen3.6-35B-A3B, 15 April 2026) is a smaller open-weight MoE (35 billion total, 3 billion active) focused on agentic coding, released under Apache 2.0. Note that Alibaba's *top* tier, Qwen3.7-Max, went the other way as a proprietary, API-only model; the open weights cover the 3.5 and 3.6 families rather than the flagship.

## Why it matters for builders

The split is the point. Grok 4.5 is a capable closed model you reach through an API, which suits teams that want performance without running infrastructure. Qwen 3.5 and 3.6 are open weights you can download, fine-tune, and self-host, which suits teams that need control, data residency, or offline deployment, and their [mixture-of-experts](/glossary/mixture-of-experts/) design keeps inference cost well below what the total parameter counts suggest.

For a 2026 stack, Qwen's open family plus [DeepSeek-V4](/news/deepseek-v4/) and [NVIDIA's Nemotron 3](/news/nvidia-nemotron-3/) mean the open-weight tier is now genuinely frontier-adjacent, not a compromise. Choose by whether you need to own the model or just call it; the [2026 LLM landscape](/comparisons/llm-landscape-2026/) lays out the trade-offs.

## Sources

- xAI, "Grok 4.5" (8 July 2026): https://x.ai/news/grok-4-5
- Alibaba Qwen, "Qwen3.5" (15 February 2026): https://qwen.ai/blog?id=qwen3.5
- Alibaba Qwen, "Qwen3.6-35B-A3B" (15 April 2026): https://qwen.ai/blog?id=qwen3.6-35b-a3b

## Further reading

- [DeepSeek releases V4 open-weight models](/news/deepseek-v4/): another leading open-weight family.
- [NVIDIA Nemotron 3 open models](/news/nvidia-nemotron-3/): open frontier-scale weights and recipes.
- [The 2026 LLM landscape](/comparisons/llm-landscape-2026/): how open and closed models compare.
