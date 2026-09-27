---
title: "DeepSeek-V4.1-Flash: A New Architecture, MIT Weights, and Lower Flash Prices"
description: "DeepSeek released DeepSeek-V4.1-Flash on 10 September 2026. It is a 552B-parameter multimodal MoE under the MIT licence, with 8B/16B active parameters and a KV cache about a quarter the size of V4-Flash's. It replaces V4-Flash on the API at lower prices, and V4-Pro stays in service."
date: 2026-09-10
lastmod: 2026-09-25
last_verified: 2026-09-25
categories: [News]
tags: [deepseek, open-weight-models, model-release, pricing, mixture-of-experts, multimodal, kv-cache]
related:
  - news/deepseek-v4
  - tools/deepseek
  - news/open-weight-models-august-2026
  - glossary/mixture-of-experts
---

DeepSeek released **DeepSeek-V4.1-Flash on 10 September 2026**. DeepSeek describes it as the smallest model in a new architecture family, "designed for a higher capability ceiling, faster inference, higher throughput, and scaling to larger models". It is natively multimodal. Unlike the V4-Pro GA release a month earlier, it shipped with **open weights under the MIT licence** on Hugging Face (`deepseek-ai/DeepSeek-V4.1-Flash`). On the API it replaces V4-Flash under the new model name **`deepseek-flash`**, and Flash prices went down.

## What happened

### Architecture

The model card describes a significant redesign rather than a refresh:

- **552B-parameter mixture-of-experts backbone.** The earlier V4-Flash had 284B. Each MoE layer has 1 shared expert and 384 routed experts, with 6 routed experts active per token. See [mixture of experts](/glossary/mixture-of-experts/).
- **Causal Encoder-Decoder (CED).** A 40-layer Transformer split into a 20-layer causal encoder and a 20-layer decoder. The decoder's global KV cache is projected from the encoder's final hidden states. This lets the model activate **8B parameters per token during prefill and 16B during decode**, which DeepSeek says improves cost efficiency for "input-heavy agentic workloads". V4-Flash activated 13B.
- **A much smaller [KV cache](/glossary/kv-cache/).** Compressed Sparse Attention 2 (CSA2) is combined with FP4 KV caching. It brings the global KV cache down to **890 bytes per token, about a quarter of V4-Flash's**. A separate technique, SWA Bounded Replay, cuts the persistent KV footprint to about an eighth.
- **Engram conditional memory.** 196B parameters, accessed sparsely by token-based lookup.
- **DSpark [speculative decoding](/glossary/speculative-decoding/).**
- **A vision encoder trained from scratch.** Images and text are processed jointly from the start of pre-training.

The model was pre-trained on **45T tokens**, supports **1M-token context**, and has a continuously adjustable reasoning-effort setting from 1 to 100.

### Benchmarks (DeepSeek's own)

DeepSeek reports:

| Benchmark | DeepSeek-V4.1-Flash | DeepSeek-V4-Pro (13 Aug GA) |
|---|---|---|
| DeepSWE v1.1 | 74.2 | 62.7 |
| CyberGym | 88.1 | 83.3 |
| Terminal-Bench 2.1 | 90.6 | 87.9 |
| NL2Repo | 65.4 | 61.5 |

Other results include 90.9 on GPQA Diamond and 31.2 on Terminal-Bench 4.0. On DeepSeek's own numbers, the new Flash model beats the larger Pro model on agentic coding.

### API changes

- **`deepseek-flash`** now points to DeepSeek-V4.1-Flash, with 1M context, up to 384K output, vision input, thinking and non-thinking modes, and both OpenAI-format and Anthropic-format base URLs.
- **V4-Flash and V4-Flash-Vision-Exp are retired.** For compatibility, `deepseek-v4-flash` and `deepseek-v4-flash-vision-exp` are temporarily routed to V4.1-Flash and billed at the Flash price. Vision-Exp had only gone live on 21 August.
- **V4-Pro continues.** DeepSeek had signalled an end date. Its changelog now says, "in response to user demand, we have decided to continue providing API services for DeepSeek V4 Pro after September 14, 2026, with the billing method remaining unchanged." `deepseek-v4-pro` remains DeepSeek-V4-Pro-0813 and is **not** routed to V4.1-Flash. V4-Pro does not support vision.

### Flash price cuts (per 1M tokens, off-peak / peak)

| | Before (V4-Flash, 16 Aug–10 Sep) | Now (V4.1-Flash) | Change |
|---|---|---|---|
| Input, cache hit | $0.007 / $0.014 | **$0.003 / $0.006** | about −57% |
| Input, cache miss | $0.22 / $0.44 | **$0.15 / $0.30** | about −32% |
| Output | $0.66 / $1.32 | **$0.60 / $1.20** | about −9% |
| *V4-Pro (unchanged)* | *$0.022 / $0.044 hit, $0.66 / $1.32 miss, $1.98 / $3.96 output* | | |

Off-peak rates are half the peak rates. Peak hours are 01:00–04:00 and 06:00–10:00 UTC, Monday to Friday. Weekends and Chinese public holidays are now off-peak in full. The Flash concurrency limit is 2,500, against 500 for V4-Pro.

### Third-party availability

- **Alibaba Cloud Model Studio** listed `deepseek-v4.1-flash` on 13 September.
- **Fireworks AI** announced hosting in a blog post published 14 September, headlined "Astra-level DeepSWE at 1/15th the cost".
- **NVIDIA** published an NVFP4 quantization (`nvidia/DeepSeek-V4.1-Flash-NVFP4`, MIT) on 16 September.

## Why it matters for builders

**Most of the saving is on input.** Cache-hit input fell by more than half, and cache-miss input fell by about a third. Output fell by under 10%. Agent loops that re-read large contexts benefit most, and output-heavy generation benefits least. The architecture points the same way: 8B active parameters in prefill and a KV cache a quarter of the size are both optimisations for long inputs. Re-run your cost model with your actual input-to-output ratio instead of taking a flat percentage. Don't assume DeepSeek is the cheapest option overall. [OpenAI's GPT-6 Luna](/news/gpt-6-sol-and-luna/), released twelve days later, costs $0.10 for uncached input and $0.50 for output. That undercuts V4.1-Flash even at off-peak rates. V4.1-Flash is cheaper only on cache-hit input ($0.003 against Luna's $0.01). See [LLM cost optimization](/guides/llm-cost-optimization/).

**Update the model name now, not when the alias breaks.** DeepSeek describes the `deepseek-v4-flash` routing as temporary. Switch to `deepseek-flash` and re-test, since the alias already serves a different model. If you pinned V4-Flash for reproducibility, that guarantee has already gone.

**V4-Pro vs V4.1-Flash is now a real choice.** Pro still costs about 3x Flash on output and lacks vision. On DeepSeek's own agentic benchmarks it scores below the new Flash model. Unless your own evaluations show Pro winning on your workload, the default choice has moved to Flash. Earlier secondary reports that V4-Pro would be routed to V4.1-Flash were wrong. Pro is still served as its own model.

**Open weights are back, under MIT, and more runnable than the headline suggests.** After the August releases that came with bespoke licences (see [August's open-weight roundup](/news/open-weight-models-august-2026/)), this is a plain MIT release. At 552B total parameters it is still a multi-GPU deployment. The small active-parameter count and the 4x KV reduction lower serving costs at long context, and NVIDIA's NVFP4 build narrows the hardware gap. The self-reported CyberGym score of 88.1 also means strong vulnerability-discovery capability is now freely downloadable. Factor that into your threat model.

## Sources

1. DeepSeek API Docs, Change Log, "DeepSeek-V4.1-Flash Release" (10 September 2026): [https://api-docs.deepseek.com/updates](https://api-docs.deepseek.com/updates)
2. DeepSeek, "DeepSeek-V4.1-Flash" model card (architecture, licence): [https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash)
3. DeepSeek API Docs, "Models & Pricing": [https://api-docs.deepseek.com/quick_start/pricing](https://api-docs.deepseek.com/quick_start/pricing)
4. Alibaba Cloud Model Studio, "Newly released models" (13 September 2026 entry): [https://www.alibabacloud.com/help/en/model-studio/newly-released-models](https://www.alibabacloud.com/help/en/model-studio/newly-released-models)
5. Fireworks AI, "DeepSeek-V4.1-Flash on Fireworks: Astra-level DeepSWE at 1/15th the cost" (14 September 2026): [https://fireworks.ai/blog/DeepSeek-V4.1-Flash-Astra](https://fireworks.ai/blog/DeepSeek-V4.1-Flash-Astra)
6. NVIDIA, "DeepSeek-V4.1-Flash-NVFP4" (16 September 2026): [https://huggingface.co/nvidia/DeepSeek-V4.1-Flash-NVFP4](https://huggingface.co/nvidia/DeepSeek-V4.1-Flash-NVFP4)

## Further reading

- [DeepSeek releases V4 open-weight models](/news/deepseek-v4/): the July generation V4.1-Flash replaces.
- [DeepSeek](/tools/deepseek/): API details, model names, and pricing.
- [August 2026: the month open weights came with conditions](/news/open-weight-models-august-2026/): V4-Pro GA and the August licensing context.
- [September 2026 open-weight roundup](/news/open-weight-models-september-2026/): what else shipped alongside it.
- [KV cache](/glossary/kv-cache/): why a 4x smaller cache matters for long-context serving.
