---
title: "Moonshot AI Announces Kimi K3, a 2.8-Trillion-Parameter Open-Weight Flagship"
description: "Moonshot AI announced Kimi K3, a 2.8T-parameter mixture-of-experts model with a 1 million token context window and native vision. Open weights are scheduled for 27 July 2026."
date: 2026-07-17
lastmod: 2026-07-17
last_updated: 2026-07-17
categories: [News]
tags: [moonshot, kimi, open-weights, mixture-of-experts, china, model-release]
related:
  - comparisons/llm-landscape-2026
  - news/deepseek-v4
  - news/qwen-3-7-max
---

Moonshot AI announced Kimi K3, its new flagship model, on 16 July 2026. Moonshot frames it as the first open model in the 3-trillion-parameter class. One detail matters before any of the excitement: the weights are not downloadable yet. The model is live today in Moonshot's own app and API, and the open weights are scheduled to arrive on Hugging Face on 27 July 2026.

<figure class="bz-figure">
  <img src="/img/ai-machine/filament-sphere-core-notext.png" alt="A glowing orange filament sphere suspended inside a dark concrete chamber, standing in for the core of a large neural network." loading="lazy">
  <figcaption>Kimi K3 is a mixture-of-experts model: 2.8 trillion parameters in total, but only a small fraction light up for any single token.</figcaption>
</figure>

## What happened

Moonshot AI, the Chinese lab behind the Kimi assistant, published the Kimi K3 announcement on its official blog. The headline numbers, as stated by Moonshot:

- **2.8 trillion total parameters**, in a mixture-of-experts design that activates 16 of 896 experts per token (Moonshot calls the routing scheme "Stable LatentMoE"). A [mixture-of-experts](/glossary/mixture-of-experts/) model keeps inference cost far below what the total parameter count suggests, because most of the network stays idle on any given token.
- A **new attention architecture**, which Moonshot names Kimi Delta Attention and Attention Residuals, alongside Gated MLA and low-precision MXFP4 weights.
- A **1 million token context window** and **native vision** (text, images, and video as input).
- **Reasoning on by default**, with lower- and higher-effort thinking modes promised in later updates.

The model is available now in the Kimi app (iOS, Android, HarmonyOS), the Kimi Work desktop app, the Kimi Code command-line tool, and the Kimi API. API pricing, per Moonshot's platform, is about **€0.28, €2.75, and €13.80 per million tokens** (USD 0.30 cache-hit input, 3.00 input, 15.00 output). Open weights are listed on Hugging Face as an upcoming release dated 27 July 2026, so as of today the model is announced-open, not yet downloadable.

Moonshot published benchmark comparisons against Claude Fable 5, Claude Opus 4.8, GPT-5.6 Sol, and GPT-5.5. Treat these as the lab's own claims: they include leading scores on some coding and terminal benchmarks, and, to Moonshot's credit, an explicit admission of a "noticeable gap in user experience compared with Claude Fable 5 and GPT-5.6 Sol." Moonshot has not stated the license for K3, so its openness terms are not yet known.

## Why it matters for builders

The open-weight tier keeps climbing. If the weights land as scheduled, K3 joins [DeepSeek-V4](/news/deepseek-v4/) and [Qwen's open family](/news/grok-4-5-and-qwen-open-models/) as a frontier-scale model you could, in principle, self-host. That matters when you need data residency, offline deployment, or freedom from a single vendor's pricing.

Two cautions keep this honest. First, an announced model is not a shipped one: until the 27 July weights and the license appear, K3 is something you can call through Moonshot's API but not run yourself, and "open" cannot be confirmed. Second, the benchmark lead is Moonshot's own measurement, and the lab itself concedes the day-to-day experience still trails the top closed models. For a build decision, wait for the weights, read the license, and run your own [evaluations](/guides/how-ai-models-are-evaluated/) rather than trusting any single leaderboard. See the [2026 LLM landscape](/comparisons/llm-landscape-2026/) for how the families compare.

## Sources

- Moonshot AI, "Kimi K3" announcement: https://www.kimi.com/blog/kimi-k3
- Moonshot AI on Hugging Face, Kimi-K3 (upcoming release, weights scheduled 27 July 2026): https://huggingface.co/moonshotai/Kimi-K3
- Moonshot AI developer platform (API pricing): https://platform.kimi.ai

## Further reading

- [DeepSeek releases V4 open-weight models](/news/deepseek-v4/): another leading open-weight family from China.
- [Grok 4.5 and Qwen's open models](/news/grok-4-5-and-qwen-open-models/): the open-versus-closed split among 2026 flagships.
- [Qwen 3.7 Max](/news/qwen-3-7-max/): Alibaba's proprietary top tier, for contrast with the open route.
- [The 2026 LLM landscape](/comparisons/llm-landscape-2026/): how the model families compare.
- [What is a mixture of experts?](/glossary/mixture-of-experts/): why a 2.8T model can be cheap to run.
