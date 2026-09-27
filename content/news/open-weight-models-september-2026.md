---
title: "September 2026: Big Open Weights, and More Non-Commercial Licences"
description: "Xiaomi, Tencent, DeepSeek, NVIDIA, and Shanghai AI Lab shipped large open-weight models between late August and September 2026, mostly under MIT or Apache 2.0. Alibaba's Qwen-Image-2.1 and Cohere's North Small Translate are the exceptions: both are non-commercial."
date: 2026-09-24
lastmod: 2026-09-25
last_verified: 2026-09-25
categories: [News]
tags: [open-weight-models, licensing, model-release, mimo, tencent, qwen, cohere, nemotron, deepseek, glm]
related:
  - news/open-weight-models-august-2026
  - news/deepseek-v4-1-flash
  - tools/alibaba-qwen
  - guides/software-licensing-and-vendor-lock-in
---

[August's roundup](/news/open-weight-models-august-2026/) was about flagship weights that came with bespoke licences. September went mostly the other way. The largest releases, from Xiaomi, Tencent, DeepSeek, and Shanghai AI Lab, came under **MIT or Apache 2.0**, and NVIDIA used its permissive OpenMDW licence. The traps moved to smaller, specialist models. **Alibaba's Qwen-Image-2.1 and Cohere's North Small Translate are both non-commercial**, even though both appear in the same "open" listings as the MIT flagships.

## What happened

### Xiaomi MiMo-V2.6 (21 September, MIT)

Xiaomi published three checkpoints on Hugging Face:

- **MiMo-V2.6-Pro-RL:** a 1.02-trillion-parameter [mixture-of-experts](/glossary/mixture-of-experts/) model with **42B active**. It has 384 routed experts, with 8 active per token.
- **MiMo-V2.6-Flash-RL:** 310B total and 15B active.
- **MiMo-V2.6-Distill-Qwen-9B:** a supervised fine-tune of Qwen3.5-9B on MiMo-generated data. Xiaomi releases it as a starting point for agentic-RL research.

Pro and Flash are omnimodal (text, image, video, and audio input) with a 1M-token context. Xiaomi describes a single mixed RL run across coding, agents, vision, and cybersecurity. On its own evaluations, Pro scores 71.9 on DeepSWE v1.1 against Claude Opus 5's 74.0. The self-reported **CyberGym** scores are **94.0 for Pro and 95.1 for Flash**. Taken at face value, that is among the highest cyber scores of any downloadable model.

### Tencent Hy4-preview (27 August, Apache 2.0)

Tencent's Hy team posted **Hy4-preview** the day before our August roundup was published, and it was not covered there. It is a **770B-parameter MoE with 49B active**: 256 routed experts plus 1 shared, with the top 8 active per token. It has a 1M-token context and a built-in multi-token-prediction layer for speculative decoding. Tencent calls it a preview. Expect a final checkpoint, which may differ.

### DeepSeek-V4.1-Flash (10 September, MIT)

DeepSeek-V4.1-Flash is a 552B multimodal MoE with 8B active in prefill and 16B in decode. Its KV cache is about a quarter the size of V4-Flash's, and it is licensed under MIT. See [the full write-up](/news/deepseek-v4-1-flash/). NVIDIA followed with an MIT-licensed NVFP4 quantization on 16 September.

### Qwen-Image-2.1 (14 September, Qwen Research Licence)

**Qwen-Image-2.1** combines text-to-image generation and image editing in one model, with a **7B DiT visual generator**. It can output transparent (RGBA) images and accepts up to 10 reference images for editing. Hugging Face's metadata shows the licence only as "other". The LICENSE file is the **Qwen RESEARCH LICENSE AGREEMENT**. It grants rights "FOR NON-COMMERCIAL PURPOSES ONLY", defines non-commercial as "research or evaluation purposes only", and says commercial use requires a separate licence from Alibaba. That is a departure from the Apache 2.0 licence on Alibaba's recent small LLMs, such as Qwen3.8-27B.

### Cohere North Small Translate (9 September, CC BY-NC 4.0)

**North Small Translate** (`north-small-translate-1-0`) is a translation-specific MoE:

- **218B total and 25B active parameters**
- 16K context
- 50+ languages and locale variants
- Free tier on Cohere's Chat V2 API
- Weights in W4A16, FP8, and BF16 under **Creative Commons Attribution-NonCommercial 4.0**

The Hugging Face repo is gated. Cohere suggests two H100s or one B200 for W4A16. Cohere's small tiny-aya "thinker" models (early September) are also CC BY-NC.

### NVIDIA Nemotron-3-Labs-Ultra-Math (3 September, OpenMDW-1.1)

NVIDIA published **Nemotron-3-Labs-Ultra-Math-RL** and **-SFT**. They are math-reasoning and proof-checking specialists built on Nemotron-3-Ultra, a hybrid Mamba2-Transformer LatentMoE with **550B total and 55B active** parameters. The model card says the RL checkpoint was "deployed as part of an ensemble system" that reached a gold-medal-level score at IMO 2026. That gold was scored by the ensemble, not by this checkpoint on its own. The licence is OpenMDW-1.1, and the card states the model is "ready for commercial and non-commercial use". The recipe is in arXiv 2609.10712. See [NVIDIA Nemotron 3](/news/nvidia-nemotron-3/) for the base family.

### Shanghai AI Lab Intern-S2-397B (13 September, Apache 2.0)

**Intern-S2-397B** is a multimodal model for scientific reasoning and long-horizon agents. It is pre-trained directly on raw pages of scientific literature and trained with RL across more than 20 scientific domains. The same lab's **Atria-Dawn-Preview** (11 September, MIT) is an agentic model. It has FP8 and Ascend W8A8 variants.

### GLM-5.3-Flash: check which GLM you mean

**GLM-5.3-Flash** (320B total, 18B active, natively multimodal) is **MIT-licensed**. The full GLM-5.3 from August is not. It uses Z.ai's bespoke GLM-5.3 License, with a security-review condition for large Model-as-a-Service operators. Same family name, different terms.

### Smaller releases

- **inclusionAI Ling-3.0-flash-VL** (4 September, MIT): 124B total and 5.5B active, image and video input, 256K context.
- **OpenBMB MiniCPM5-2B** (6 September, Apache 2.0).
- **Liquid AI LFM2.5-VL-3B-DSpark** (18 September) uses Liquid's own LFM 1.0 licence. It limits commercial use by organisations above a **$10M annual revenue threshold**.
- **Qwen-Drive-1.0-4B** (27 August, Apache 2.0): a driving-domain model.

## Licence summary

| Model | Size (total / active) | Licence | Commercial use |
|---|---|---|---|
| MiMo-V2.6-Pro-RL / Flash-RL | 1.02T / 42B; 310B / 15B | MIT | Yes |
| Tencent Hy4-preview | 770B / 49B | Apache 2.0 | Yes |
| DeepSeek-V4.1-Flash | 552B / 8B–16B | MIT | Yes |
| Intern-S2-397B | 397B | Apache 2.0 | Yes |
| Nemotron-3-Labs-Ultra-Math | 550B / 55B | OpenMDW-1.1 | Yes |
| GLM-5.3-Flash | 320B / 18B | MIT | Yes |
| GLM-5.3 (August) | 753B | GLM-5.3 License (bespoke) | Yes, with conditions |
| Ling-3.0-flash-VL | 124B / 5.5B | MIT | Yes |
| **Qwen-Image-2.1** | 7B generator | **Qwen Research Licence** | **No, separate licence needed** |
| **North Small Translate** | 218B / 25B | **CC BY-NC 4.0** | **No** |
| LFM2.5-VL-3B-DSpark | 3B | LFM 1.0 | Restricted above $10M revenue |

## Why it matters for builders

**Hugging Face metadata is not a licence review.** Qwen-Image-2.1 shows up as "other", and you only find "research or evaluation purposes only" in the LICENSE file. North Small Translate is available on a free API tier, which makes it easy to assume the weights are free to use commercially. They are not. Make "open the LICENSE file" a required step in model intake. See [software licensing and vendor lock-in](/guides/software-licensing-and-vendor-lock-in/).

**The permissive frontier is now very large and very cyber-capable.** MIT and Apache 2.0 now cover 500B–1T-parameter models with self-reported CyberGym scores near or above 90 (MiMo-V2.6, DeepSeek-V4.1-Flash). Security teams should assume attackers can download these capabilities and use them without restriction. This is the downloadable counterpart to the gated cyber tiers closed labs launched this month.

**Sizes still decide who can run what.** Every flagship here needs multi-GPU serving. The practical self-hosting tier is still around 30B total or less, or low-active MoEs like Ling-3.0-flash-VL. [Quantization](/glossary/quantization/) (NVIDIA's NVFP4 builds, Cohere's W4A16) is how the larger models become deployable. See [small vs large language models](/comparisons/small-vs-large-language-models/).

**Every benchmark above is self-reported.** Labs used different harnesses and effort settings. Use the numbers as directional and run your own [evaluations](/guides/llm-evaluation-methods/).

## Sources

1. Xiaomi MiMo, "MiMo-V2.6-Pro-RL" model card and technical report (21 September 2026): [https://huggingface.co/XiaomiMiMo/MiMo-V2.6-Pro-RL](https://huggingface.co/XiaomiMiMo/MiMo-V2.6-Pro-RL)
2. Xiaomi MiMo, "MiMo-V2.6-Distill-Qwen-9B": [https://huggingface.co/XiaomiMiMo/MiMo-V2.6-Distill-Qwen-9B](https://huggingface.co/XiaomiMiMo/MiMo-V2.6-Distill-Qwen-9B)
3. Tencent Hy, "Hy4-preview" (27 August 2026): [https://huggingface.co/tencent/Hy4-preview](https://huggingface.co/tencent/Hy4-preview)
4. DeepSeek, "DeepSeek-V4.1-Flash" (10 September 2026): [https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash)
5. Qwen, "Qwen-Image-2.1" model card and LICENSE (14 September 2026): [https://huggingface.co/Qwen/Qwen-Image-2.1](https://huggingface.co/Qwen/Qwen-Image-2.1)
6. Qwen, "Qwen-Image-2.1" blog: [https://qwen.ai/blog?id=qwen-image-2.1](https://qwen.ai/blog?id=qwen-image-2.1)
7. Cohere, Changelog, "Announcing Cohere's North Small Translate" (9 September 2026): [https://docs.cohere.com/changelog](https://docs.cohere.com/changelog)
8. NVIDIA, "Nemotron-3-Labs-Ultra-Math-RL" (3 September 2026): [https://huggingface.co/nvidia/Nemotron-3-Labs-Ultra-Math-RL](https://huggingface.co/nvidia/Nemotron-3-Labs-Ultra-Math-RL)
9. NVIDIA, "An Open Recipe for IMO Gold: Training Nemotron for Olympiad Mathematics", arXiv 2609.10712: [https://arxiv.org/abs/2609.10712](https://arxiv.org/abs/2609.10712)
10. Shanghai AI Lab, "Intern-S2-397B" (13 September 2026): [https://huggingface.co/internlm/Intern-S2-397B](https://huggingface.co/internlm/Intern-S2-397B)
11. Z.ai, "GLM-5.3-Flash": [https://huggingface.co/zai-org/GLM-5.3-Flash](https://huggingface.co/zai-org/GLM-5.3-Flash)
12. inclusionAI, "Ling-3.0-flash-VL" (4 September 2026): [https://huggingface.co/inclusionAI/Ling-3.0-flash-VL](https://huggingface.co/inclusionAI/Ling-3.0-flash-VL)
13. Liquid AI, "LFM2.5-VL-3B-DSpark" and LICENSE (18 September 2026): [https://huggingface.co/LiquidAI/LFM2.5-VL-3B-DSpark](https://huggingface.co/LiquidAI/LFM2.5-VL-3B-DSpark)
14. NVIDIA, "DeepSeek-V4.1-Flash-NVFP4" (16 September 2026): [https://huggingface.co/nvidia/DeepSeek-V4.1-Flash-NVFP4](https://huggingface.co/nvidia/DeepSeek-V4.1-Flash-NVFP4)

## Further reading

- [August 2026: the month open weights came with conditions](/news/open-weight-models-august-2026/): the previous roundup, including GLM-5.3's bespoke licence.
- [DeepSeek-V4.1-Flash](/news/deepseek-v4-1-flash/): architecture and API pricing in detail.
- [Alibaba Qwen](/tools/alibaba-qwen/): the Qwen family and its mix of licences.
- [Cohere](/tools/cohere/): North and Command model lines.
- [Software licensing and vendor lock-in](/guides/software-licensing-and-vendor-lock-in/): how to read a model licence.
