---
title: "MiniMax"
description: "MiniMax's current language models, MiniMax-M3 and MiniMax-M3.1-Flash: a 428B total, 23B active multimodal mixture-of-experts line with sparse attention and a 1M token context. Architecture, API prices, the MiniMax Community License and self-reported benchmarks."
date: 2026-10-25
last_updated: 2026-10-25
lastmod: 2026-10-25
last_verified: 2026-10-25
tags: ["open-weight", "llm", "minimax", "mixture-of-experts", "sparse-attention", "multimodal", "model-provider", "api"]
tool_category: "AI"
related:
  - glossary/mixture-of-experts
  - glossary/llm
  - glossary/attention-mechanism
  - glossary/speculative-decoding
  - tools/deepseek
  - tools/alibaba-qwen
  - tools/reflection-beam
  - tools/together-ai
  - comparisons/llm-landscape-2026
  - news/open-weight-models-september-2026
---

<figure class="bz-figure">
  <img src="/img/hidden-ecosystem/geological-strata-layers-notext.png" alt="Five stacked mineral strata floating in an exploded view on black, representing successive model generations built on one core." loading="lazy">
  <figcaption>M3.1-Flash keeps M3's core and changes the layers around it: attention, quantisation and decoding.</figcaption>
</figure>

**MiniMax** builds foundation models across text, video, speech and music, and sells them through its own apps and an API. Its current language models are **MiniMax-M3** (1 June 2026) and **MiniMax-M3.1-Flash** (19 October 2026). Both are natively multimodal [mixture-of-experts](/glossary/mixture-of-experts/) models of roughly 428 billion total and 23 billion active parameters, built on MiniMax's own sparse attention, with a context window of up to 1 million tokens. Both are published as open weights under the **MINIMAX COMMUNITY LICENSE**, which is not an open-source licence: read the licence section before you build on either.

MiniMax describes itself as "a global AI foundation model company" founded in early 2022. Its M3.1 Flash announcement compares the model against "Chinese models", and the wiki groups it with the Chinese open-weight labs in the [2026 LLM landscape](/comparisons/llm-landscape-2026/). Every benchmark on this page is MiniMax's own and has not been independently reproduced.

## The current line-up

As of 25 October 2026:

| Model | Released | Shape | Input / output | Context | Licence |
|---|---|---|---|---|---|
| **MiniMax-M3.1-Flash** | API 19 October 2026; open weights on Hugging Face (date not published, see below) | ~428B total, 23B active MoE | Text, image, video in; text out | Up to 1,000,000 tokens | MINIMAX COMMUNITY LICENSE |
| **MiniMax-M3** | 1 June 2026 | ~428B total, ~23B active MoE | Text, image, video in; text out | Up to 1M tokens on the API, "with a guaranteed minimum of 512K tokens" | MINIMAX COMMUNITY LICENSE |
| **MiniMax-H3** | 31 July 2026 | 33B dense single-stream transformer (H3-Omni-Transformer) | Text, image, video, audio in; video with audio out | Not applicable | MiniMax H3 Community License, with excluded territories |

MiniMax-M3 remains available on the API alongside M3.1-Flash. MiniMax says a larger **Pro** model "will also arrive later"; no date is given.

### Dates, precisely

- **MiniMax-M3:** MiniMax's release notes give 1 June 2026. The Hugging Face repository was created on 2 June. OpenRouter's listing carries a 31 May 2026 timestamp, which may be why some sources give 31 May.
- **MiniMax-M3.1-Flash:** the release notes and MiniMax's announcement both date the launch to **19 October 2026**, and the announcement says it is "available through the MiniMax API, M Plan, and MiniMax Code. Model weights will be released later." The Hugging Face repository was created on 17 October 2026 (repository metadata), and the only commit in its history, "Init", is dated 23 October 2026. The weights were public when this page was checked on 25 October, but MiniMax has not stated the date they were published.
- MiniMax says an early version of M3.1 Flash ran anonymously as **"Space Bunny"** and "processed more than 200 trillion tokens while operating anonymously". MiniMax does not say where it ran.

## Architecture

Figures come from the model cards and the `config.json` files on Hugging Face.

| | MiniMax-M3 | MiniMax-M3.1-Flash |
|---|---|---|
| **Parameters** | ~428B total, ~23B active | ~428B total, 23B active |
| **Layers** | 60 | 60 |
| **Experts** | 128 routed plus 1 shared, 4 routed per token | Same |
| **Attention heads** | 64 query, 4 key-value (grouped-query) | Same |
| **Attention type** | MiniMax Sparse Attention on layers 4 to 60; the first three layers use full attention | MiniMax Sparse Attention on all 60 layers |
| **Positions in config** | 1,048,576 | 1,048,576 |
| **Vocabulary** | 200,064 | 200,064 |
| **Speculative decoding** | Multi-token prediction modules (7 in the config) | DSpark draft head, included in the release |
| **Weights** | BF16, plus a separate MXFP8 repository | Quantisation-aware trained; published with an MXFP8 quantisation config; the repository holds about 252 GB of files |
| **Reasoning control** | `thinking`: enabled, adaptive or disabled | `effort`: low, medium, high, xhigh or max (default max on the API) |

MiniMax lists three changes in M3.1-Flash: sparse attention "throughout" (the first three full-attention layers are replaced), quantisation-aware training of "the routed MoE experts and the attention paths", and DSpark speculative decoding, which "replaces the earlier EAGLE-like MTP approach". The MoE core is otherwise unchanged from M3.

On context, the model card says "up to 1,000,000 tokens" and the API documentation lists 1,000,000, while both configs allow 1,048,576 positions. Use 1,000,000 as the supported figure. MiniMax does not publish a maximum output length on the pages this page read, so it is **not published** here.

### MiniMax Sparse Attention

MiniMax Sparse Attention (MSA) is described in the arXiv paper *MiniMax Sparse Attention* (arXiv 2606.13392, first submitted 11 June 2026, revised 25 October 2026). Per its abstract, MSA is "a blockwise sparse attention built upon Grouped Query Attention (GQA)": a lightweight index branch scores key-value blocks and selects a top-k subset for each GQA group, and the main branch computes exact attention over only those blocks. The paper reports that on a 109B-parameter model MSA "performs on par with GQA while reducing per-token attention compute by 28.4x at 1M context", and gives 14.2x prefill and 7.6x decoding wall-clock speedups on H800 GPUs. The kernel is open source at `github.com/MiniMax-AI/MSA`.

The M3 model card quotes different numbers, "9× prefill and 15× decode speedups compared to M2 at 1M context". Those compare M3 with the previous M2 model rather than MSA with GQA on the same model, so the two sets of numbers are not interchangeable. See [attention mechanisms](/glossary/attention-mechanism/) and [DeepSeek Sparse Attention](/glossary/deepseek-sparse-attention/) for the wider family of techniques.

## API pricing

From MiniMax's pricing page, fetched 25 October 2026, in US dollars per million tokens:

| Model | Input | Output | Cache read |
|---|---|---|---|
| **MiniMax-M3.1-Flash** | $0.15 | $0.60 | $0.015 |
| **MiniMax-M3**, up to 512K input tokens, Standard | $0.30 | $1.20 | $0.06 |
| **MiniMax-M3**, over 512K input tokens, Standard | $0.60 | $2.40 | $0.12 |
| **MiniMax-M3**, up to 512K input tokens, Priority | $0.45 | $1.80 | $0.09 |
| **MiniMax-M3**, over 512K input tokens, Priority | $0.90 | $3.60 | $0.18 |

How to read it:

- **M3.1-Flash is flat.** MiniMax's announcement calls it "Flat pricing per 1M tokens", with no long-context surcharge. On the pricing page its row sits in its own table above the Standard and Priority tabs and carries no tier label, so it is most likely the standard rate. The page does not say whether Priority applies to M3.1-Flash.
- **M3's rates are discounted list prices.** Each M3 row is labelled "Permanent 50% off" against a struck-through price twice as high ($0.60 and $2.40 standard, up to 512K).
- **Priority** "provides priority admission for faster response times and improved request reliability", is enabled with `service_tier: priority`, and "is 1.5x standard". The M3 Priority rows match that rule exactly.
- **The "70% cheaper" claim is not a per-token figure.** MiniMax says that for agentic tasks M3.1-Flash's "overall usage cost is 70% lower than its predecessor". Per token, against M3's discounted standard rate up to 512K, M3.1-Flash is 50% lower on input ($0.15 against $0.30) and output ($0.60 against $1.20), and 75% lower on cache reads ($0.015 against $0.06). Any saving beyond that would have to come from using fewer tokens per task, which MiniMax asserts but does not break down.

For colour: OpenRouter's public model list showed M3.1-Flash at the same $0.15, $0.60 and $0.015 and M3 at $0.30, $1.20 and $0.06 when fetched on 25 October 2026.

MiniMax also claims output speeds of "200+ TPS" in everyday use and a median "170+ TPS" for M3.1-Flash. These are MiniMax's own measurements.

## The licence

Both language models use the **MINIMAX COMMUNITY LICENSE**. The M3.1-Flash text is identical to the M3 text apart from the model name in the attribution and email subject lines; this page compared the two LICENSE files line by line on 25 October 2026.

What it says:

- **The base grant is non-commercial.** Permission is granted "to deal in the Software for non-commercial purposes", including to use, copy, modify, merge, publish and distribute it.
- **Commercial use has two conditions.** If the model or a derivative is used commercially, you "shall prominently display 'Built with MiniMax M3.1-Flash'" (or M3) on a related website, interface, blog post, about page or documentation. And if "such products and services generate more than 20 million US dollars (or equivalent in other currencies) in yearly revenue", you must obtain "a separate, prior written authorization from MiniMax" by emailing api@minimax.io. Below that threshold, "you only need to send a one-time notice" to the same address.
- **The threshold is product revenue, not company revenue.** The licence ties the US$20 million to the revenue of the products and services using the model, and the test is "more than", not "at or above".
- **"Commercial Use" is broad.** It covers paid products and services built on the model, commercial use of APIs serving the model, and commercial deployment of fine-tuned or otherwise modified versions.
- **Prohibited uses** include "any military purpose", harm to minors, illegal content, and disinformation intended to cause harm.

The licence does not mention distillation or training other models on outputs one way or the other. Compare Reflection's [Beam](/tools/reflection-beam/), whose model card states that distillation and training on outputs are not prohibited, under Apache 2.0.

**MiniMax-H3 has a different and stricter licence.** Its "Applicable Territory" is "worldwide, excluding the Excluded Territories", defined as "the European Union, the United Kingdom, the Republic of Korea and the United States of America". People in those territories are invited to contact MiniMax about a licence. For a team in the EU, H3's weights are not licensed for use by default.

## Benchmarks (self-reported)

From the M3.1-Flash model card. All scores are MiniMax's, and the baselines are MiniMax's selection and, in most cases, its own runs.

| Benchmark | M3.1-Flash | DeepSeek V4.1 Flash-1017 | DeepSeek V4.1 Flash | Kimi K3 | GLM-5.3 | GPT-5.6 Sol | Opus 5 |
|---|---|---|---|---|---|---|---|
| Automation-Bench v1.0.6 | 62.8 | 60.5 | 54.8 | 46.7 | 48.8 | 45.8 | 50.3 |
| BankerToolBench | 76.2 | not reported | 73.7 | 69.1 | 74.5 | 74.6 | 76.2 |
| Terminal Bench 4.0 | 38.1 | 42.3 | 31.2 | 12.6 | 37.9 | 39.9 | 51.8 |
| LOCA-Bench 256K | 60.3 | not reported | not reported | 49.7 | 50.3 | 60.0 | 53.7 |
| Agents' Last Exam | 29.6 | not reported | not reported | 28.3 | not reported | 30.6 | 32.2 |
| OSWorld 2.0 | 61.7 | not reported | 54.3 | 58.3 | not reported | 65.7 | 70.6 |
| DeepSWE v1.1 | 73.7 | 77.0 | 74.2 | 67.5 | 66.9 | 73.0 | 74.0 |
| NL2Repo-Bench | 61.2 | 68.2 | 65.4 | 58.0 | 58.0 | 56.8 | 75.3 |
| CyberGym | 82.2 | not reported | not reported | 80.0 | 84.5 | 83.6 | not reported |
| HLE (without tools) | 43.4 | 42.6 | 39.2 | 43.5 | 42.3 | 49.5 | 55.6 |

The card has further rows (GDP.pdf AA, PostTrain Bench, SWE Refactor Bench, BabyVision, CharXiv RQ) with the same pattern.

What to notice before quoting any of it:

- **The harnesses vary by benchmark.** Several ran inside Claude Code, at versions from 2.1.220 (SWE Refactor Bench) through 2.1.233 (NL2Repo-Bench), 2.1.251 (PostTrain Bench) and 2.1.263 (CyberGym, 1M context) to 2.1.285 (BabyVision). Terminal Bench 4.0 ran in Codex 0.149.1, DeepSWE in mini-SWE-agent 2.4.5 at 512K context, and BankerToolBench in OpenCode 1.17.18. Scores from different harnesses are not directly comparable across vendors' tables.
- **One benchmark is judged by MiniMax's own model.** BankerToolBench used a "MiniMax-M2.7 judge". CharXiv RQ used a GPT-5.5 judge.
- **The closed-model baselines are not the newest.** The columns are GPT-5.6 Sol and Opus 5. The wiki's pages already list newer models from both vendors, such as [GPT-6 Sol](/tools/openai-api/) (22 September 2026) and [Claude Opus 5.5](/tools/claude-anthropic/).
- **On MiniMax's own table, M3.1-Flash does not lead coding.** DeepSeek V4.1 Flash-1017 is ahead on DeepSWE (77.0 against 73.7), Terminal Bench 4.0 and NL2Repo-Bench, and Opus 5 leads most rows. M3.1-Flash's clearest leads are Automation-Bench and LOCA-Bench 256K.
- **MiniMax's announcement rounds CyberGym to "82%"**; the card gives 82.2. The announcement also says M3.1-Flash ranks "first among Chinese models" on OSWorld V2 and Agents' Last Exam.

## How to access it

1. **MiniMax API.** MiniMax recommends its Anthropic-compatible endpoint and also offers an OpenAI-compatible one; its documentation covers using M-series models inside Claude Code, Cursor and other coding tools. M3.1-Flash is also in MiniMax's **M Plan** subscription and its **MiniMax Code** app.
2. **Download the weights** from Hugging Face (`MiniMaxAI/MiniMax-M3.1-Flash`, `MiniMaxAI/MiniMax-M3`) and serve them with SGLang, vLLM or TokenSpeed, which the M3.1-Flash card recommends; Transformers, KTransformers, Unsloth and ATOM support are listed as "in progress". At about 428B total parameters, this is a multi-GPU server model.
3. **Third-party hosts.** The wiki's [Together AI](/tools/together-ai/) page lists MiniMax M3 on serverless and provisioned throughput as of September 2026, and OpenRouter lists both M3 and M3.1-Flash. Check each host's current catalogue; availability of M3.1-Flash on other hosts was not verified for this page.

Recommended sampling for both models is `temperature=1.0` and `top_p=0.95`.

## When to use it

- **You want a cheap multimodal agent model on an API.** M3.1-Flash costs $0.15 input and $0.60 output with no long-context surcharge, in the same range as Alibaba's API-only Qwen3.8-Flash, which the Qwen team quotes at $0.15 input and $0.47 output (see [Alibaba Qwen](/tools/alibaba-qwen/)).
- **You need long context on self-hosted hardware.** Sparse attention on every layer is aimed squarely at million-token workloads.
- **You need image and video input in an open-weight model.** Reflection's Beam is text only, and the wiki's [DeepSeek](/tools/deepseek/) page notes no video input on DeepSeek's current line.

## When not to use it

- **Your product will earn more than US$20 million a year.** You need MiniMax's prior written authorisation, not just a download.
- **Your use touches defence.** The licence prohibits "any military purpose".
- **You need an OSI-approved licence.** For permissive terms, look at [Reflection Beam](/tools/reflection-beam/) (Apache 2.0) or [DeepSeek](/tools/deepseek/) (MIT).
- **You are in the EU, UK, Korea or the US and want H3.** Its licence excludes those territories.
- **You need the strongest coding model.** On MiniMax's own numbers, the DeepSeek V4.1 Flash-1017 snapshot it tested and Anthropic's Opus 5 score higher on most coding rows.

## Further reading

- [Mixture of experts](/glossary/mixture-of-experts/): why a 428B model runs with about 23B active parameters.
- [Attention mechanism](/glossary/attention-mechanism/): the baseline that sparse attention is cutting down.
- [DeepSeek Sparse Attention](/glossary/deepseek-sparse-attention/): a comparable sparse-attention design from DeepSeek.
- [Speculative decoding](/glossary/speculative-decoding/): what a draft head like DSpark does.
- [Software licensing and vendor lock-in](/guides/software-licensing-and-vendor-lock-in/): how to read a bespoke model licence.
- [Reflection Beam](/tools/reflection-beam/): a permissively licensed open-weight model for comparison.
- [DeepSeek](/tools/deepseek/): the family that leads several rows of MiniMax's own table.
- [Alibaba Qwen](/tools/alibaba-qwen/): another Chinese family with revenue-triggered licences.
- [Open-weight models, September 2026](/news/open-weight-models-september-2026/): the release month before M3.1-Flash.
- [The 2026 LLM landscape](/comparisons/llm-landscape-2026/): where MiniMax sits among open and closed models.

## Sources

Primary sources first. All fetched 25 October 2026.

1. MiniMax, MiniMax-M3.1-Flash model card on Hugging Face (architecture, what changed from M3, benchmarks and evaluation notes, deployment); repository created 17 October 2026, only commit dated 23 October 2026: https://huggingface.co/MiniMaxAI/MiniMax-M3.1-Flash
2. MiniMax, MiniMax-M3.1-Flash LICENSE (MINIMAX COMMUNITY LICENSE): https://huggingface.co/MiniMaxAI/MiniMax-M3.1-Flash/blob/main/LICENSE
3. MiniMax, MiniMax-M3.1-Flash and MiniMax-M3 `config.json` files (layers, experts, sparse-attention layout, MTP modules, quantisation config): https://huggingface.co/MiniMaxAI/MiniMax-M3.1-Flash/blob/main/config.json
4. MiniMax, "MiniMax M3.1 Flash: Redefining Agent Performance and Cost", 19 October 2026 (launch, Space Bunny, flat pricing, 70% claim, speeds, weights "later", Pro "later"): https://www.minimax.io/blog/minimax-m31f
5. MiniMax API Docs, release notes for models (M3.1 Flash 19 October 2026, H3 31 July 2026, M3 1 June 2026): https://platform.minimax.io/docs/release-notes/models
6. MiniMax API Docs, pricing (M3.1-Flash and M3 rates, Standard and Priority tabs, Priority at 1.5x): https://platform.minimax.io/docs/guides/pricing-paygo
7. MiniMax API Docs, text generation guide (supported models, 1,000,000 context window, effort levels and default): https://platform.minimax.io/docs/guides/text-generation
8. MiniMax, MiniMax-M3 model card and LICENSE (428B/23B, MSA, reasoning modes, M2 speedup figures): https://huggingface.co/MiniMaxAI/MiniMax-M3
9. MiniMax, MiniMax M3 model page (1M context "with a guaranteed minimum of 512K tokens"): https://www.minimax.io/models/text/m3
10. Lai, Xu, Yang, Chen, Xu et al., "MiniMax Sparse Attention", arXiv 2606.13392, submitted 11 June 2026, revised 25 October 2026: https://arxiv.org/abs/2606.13392
11. MiniMax, MiniMax-H3 model card and LICENSE (33B dense transformer, Excluded Territories): https://huggingface.co/MiniMaxAI/MiniMax-H3
12. MiniMax, About page (company description, founded early 2022): https://www.minimax.io/about
13. OpenRouter, public models API (MiniMax listings, timestamps and per-token prices; third-party router, secondary source): https://openrouter.ai/api/v1/models
