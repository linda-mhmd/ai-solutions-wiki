---
title: "NVIDIA Ships the Nemotron 3 Open-Weight Model Family"
description: "Across GTC 2026 and the following months NVIDIA released the Nemotron 3 open-weights family, a hybrid Mamba-Transformer mixture-of-experts line from a 120B Super to a 550B Ultra, with open weights, data, and training recipes."
date: 2026-06-04
lastmod: 2026-07-13
last_updated: 2026-07-13
categories: [News]
tags: [nvidia, nemotron, open-weights, model-release, mixture-of-experts, agentic-ai]
related:
  - comparisons/llm-landscape-2026
  - glossary/inference
  - news/nvidia-blueprints-vendor-independent-alternative
---

NVIDIA spent the first half of 2026 rolling out Nemotron 3, an open-weights model family built on a hybrid Mamba-Transformer mixture-of-experts architecture and aimed at long-running agentic workloads. The line staged out from Nemotron 3 Super (120B total parameters, 12B active) in March to Nemotron 3 Ultra (550B total, 55B active) in June, with a multimodal Nano Omni in between. NVIDIA released not just the weights but the training data and recipes, positioning Nemotron 3 as a genuinely open frontier-scale family rather than a demo.

## What happened

The releases came in sequence. Nemotron 3 Super arrived on 11 March 2026, featured at GTC 2026, with a native 1-million-token context window and pretraining largely in NVFP4 4-bit precision for Blackwell hardware. Nemotron 3 Nano Omni (30B total, 3B active) followed on 28 April 2026 as a single open model unifying video, audio, image, and text. Nemotron 3 Ultra, NVIDIA's largest open-weights model to date, shipped on 4 June 2026 under the permissive Linux Foundation OpenMDW-1.1 license.

At GTC on 16 March 2026 NVIDIA also launched the Nemotron Coalition, a collaboration with eight AI labs (including Mistral AI, Perplexity, Cursor, and Thinking Machines) to co-train an open base model on DGX Cloud, positioned as the foundation for a future Nemotron 4. The hybrid Mamba-Transformer design is the technical thread: it mixes state-space and attention layers to cut the cost of very long contexts.

## Why it matters for builders

Open weights plus open data plus a documented recipe is a different offer from a downloadable checkpoint. It lets teams fine-tune, audit, and self-host frontier-scale models without a vendor API in the loop, which matters for regulated, sovereign, or cost-sensitive deployments. The Mamba-Transformer architecture is also a signal: pure-attention transformers are no longer the only frontier design, and the hybrid approach targets exactly the long-context agentic workloads that are getting expensive to serve.

If you are choosing an open model to build on, Nemotron 3 now spans sizes from a 30B multimodal Nano to a 550B Ultra, so you can match the tier to your hardware. Pair this with [what inference costs](/glossary/inference/) and the [2026 LLM landscape](/comparisons/llm-landscape-2026/) to weigh it against other open-weight families.

## Sources

- NVIDIA Developer, "NVIDIA Nemotron 3 Ultra" (4 June 2026): https://developer.nvidia.com/blog/nvidia-nemotron-3-ultra-powers-faster-more-efficient-reasoning-for-long-running-agents/
- NVIDIA Developer, "Introducing Nemotron 3 Super" (11 March 2026): https://developer.nvidia.com/blog/introducing-nemotron-3-super-an-open-hybrid-mamba-transformer-moe-for-agentic-reasoning/
- NVIDIA Developer, "Nemotron 3 Nano Omni" (28 April 2026): https://developer.nvidia.com/blog/nvidia-nemotron-3-nano-omni-powers-multimodal-agent-reasoning-in-a-single-efficient-open-model/
- NVIDIA, "NVIDIA launches Nemotron Coalition" (16 March 2026): https://nvidianews.nvidia.com/news/nvidia-launches-nemotron-coalition-of-leading-global-ai-labs-to-advance-open-frontier-models

## Further reading

- [The 2026 LLM landscape](/comparisons/llm-landscape-2026/): how Nemotron 3 compares to other open and closed models.
- [What is inference?](/glossary/inference/): the serving cost that the hybrid architecture targets.
- [NVIDIA's free model playgrounds](/news/nvidia-blueprints-vendor-independent-alternative/): where to try NVIDIA models in the browser.
