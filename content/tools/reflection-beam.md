---
title: "Reflection Beam"
description: "Beam 1.0 is Reflection's first open-weight model: a 501B total, 23B active mixture-of-experts text model with a 1M token context, released under Apache 2.0. Architecture, training scale, licence, hardware, access paths and self-reported benchmarks."
date: 2026-10-25
last_updated: 2026-10-25
lastmod: 2026-10-25
last_verified: 2026-10-25
tags: ["open-weight", "llm", "reflection", "beam", "mixture-of-experts", "apache-2.0", "agentic-coding", "self-hosting"]
tool_category: "AI"
related:
  - glossary/mixture-of-experts
  - glossary/llm
  - glossary/knowledge-distillation
  - glossary/speculative-decoding
  - tools/meta-llama
  - tools/deepseek
  - tools/minimax
  - tools/amazon-sagemaker
  - comparisons/llm-landscape-2026
  - news/thinking-machines-inkling
---

<figure class="bz-figure">
  <img src="/img/dark-cherry/signal-ember-notext.png" alt="A single glowing red ember in a dark void, representing a lab's first model release." loading="lazy">
  <figcaption>Beam is Reflection's first model, and it shipped as downloadable weights under a standard permissive licence.</figcaption>
</figure>

**Beam** is the first open-weight model family from **Reflection**, released as **Beam-1.0-501B-A23B**. It is a sparse [mixture-of-experts](/glossary/mixture-of-experts/) model with 501 billion total and 23 billion active parameters, takes text in and produces text out, supports a 1 million token context, and ships under the **Apache 2.0** licence. Reflection built it for coding, reasoning and long-running agent work, and its pitch is efficiency: the company says Beam reaches comparable quality to leading open models while generating fewer reasoning tokens.

This page covers what Reflection, Hugging Face and AWS have published about Beam as of 25 October 2026. Every benchmark on it is Reflection's own and has not been independently reproduced.

## Who Reflection is

Only what Reflection and its distribution partners state is included here.

- In an August 2025 post, Reflection said it had "raised $2 billion" and that its team had "pioneered breakthroughs including PaLM, Gemini, AlphaGo, AlphaCode, AlphaProof", naming investors including NVIDIA, Sequoia, Lightspeed and Eric Schmidt.
- Reflection's About page lists three commitments: open weights, published research including technical reports, and open-source software for customisation.
- AWS describes the company as "US-based Reflection" and quotes **Misha Laskin** as its co-founder and CEO. Hugging Face calls it "the new US lab, Reflection".
- Reflection frames Beam as advancing "the Western open-weight frontier".

## What Beam is

The architecture comes from the model card and `config.json` on Hugging Face, with detail from the Hugging Face welcome post.

| Property | Beam-1.0-501B-A23B |
|---|---|
| **Total parameters** | 501.3B |
| **Active parameters** | 23.4B per token |
| **Layers** | 52: 3 dense, then 49 mixture-of-experts |
| **Experts** | 256 per MoE layer, 8 routed per token, no shared expert |
| **Attention** | Gated grouped-query attention (48 query heads, 8 key-value heads) plus sliding-window attention over 512 tokens |
| **Layer mix** | 43 sliding-window layers and 9 global layers (every sixth layer and the last) |
| **Context length** | 1M tokens (`max_position_embeddings` 1,048,576) |
| **Vocabulary** | 152k tokens (151,936 in the config) |
| **Modalities** | Text in, text out |
| **Knowledge cutoff** | 30 June 2026 |
| **Numerics** | BF16, FP8 and NVFP4 checkpoints |
| **Chat template** | "Modified Harmony format" |
| **Reasoning effort** | low, medium, high, xhigh, max |

Hugging Face's post adds two details worth knowing. The router follows DeepSeek-V3's group-limited scheme (8 groups of 32 experts, best 4 groups kept, top 8 experts chosen inside them), and the global attention layers use no positional encoding, relying instead on a query scaling that grows with context length. Because only the 9 global layers keep the full sequence, Hugging Face calculates the KV cache at about 36 KiB per token, or 36.08 GiB per sequence at the full 1M context in BF16, against 208 GiB if all 52 layers were global.

## How Reflection trained it

All figures here are Reflection's, from its 5 October launch post.

- **Pretraining:** 23.8 trillion tokens "from the web, public sources, and proprietary licensed datasets", pretrained "in under four weeks on a cluster of 6,144 NVIDIA GB300 NVL72 GPUs". Reflection reports a goodput of 92.3% towards the end of the run and nine semi-automatic rewinds.
- **Reinforcement learning:** "10.5K NVIDIA GB300 GPUs for four weeks generating more than 100 million rollouts with a maximum context length of 256K tokens", using about 1.3 billion sandboxes and close to one million environments. Reflection calls this "one of the largest scale RL runs conducted by any open lab to date", a claim it does not support with a comparison table.
- **Context extension:** mid-training extended "Beam's effective context length to 1M tokens".
- **Safety:** a second model trained from the same pretrained checkpoint on safety and alignment data, merged with the RL model through multi-teacher on-policy distillation.

## The licence

The weights carry the unmodified **Apache 2.0** licence, and the Hugging Face repository is not gated: there is no access request to approve. The model card goes further than the licence text and states it plainly:

> "Reflection does not prohibit distillation, use of outputs to train other models, fine-tuning, parameter-efficient adaptation, quantization, merging, defensive security research on systems you are authorized to test, and good-faith adversarial evaluation of the model."

The card also says it "is informational only and does not modify or restrict the model's license". Use is still subject to Reflection's Usage Policy, which the card links.

That matters because the large open-weight releases around Beam mostly carry conditions. Meta's **Muse Spark Open** (816B total, 42B active, released 15 October 2026) ships under the Muse Model License, which requires every product to display "Built with Muse Spark Open" and requires a separate written agreement with Meta for Model-as-a-Service businesses above US$20 million in gross revenue over any twelve months; its Hugging Face repository is also gated with manual approval. The Chinese flagships have their own revenue-triggered licences, covered on [MiniMax](/tools/minimax/), [Alibaba Qwen](/tools/alibaba-qwen/) and the [2026 LLM landscape](/comparisons/llm-landscape-2026/).

## Release timeline

| Date (2026) | What happened |
|---|---|
| 5 October | Reflection announces Beam as a preview with a waitlist and says it will "release the weights, technical report, model card, and developer artifacts later this month" |
| 7 October | The Hugging Face repository is created (repository metadata, 19:52 UTC); creation is not the same as public availability |
| 8 October | Reflection updates the launch post's benchmark table |
| 16 October | Reflection's "Beam is now available" post: "Today, we have released Beam's model weights on Hugging Face under an Apache 2.0 license." The same day: the Hugging Face welcome post, the Reflection API public beta, the Mirror CLI coding agent, and the Beam Safety Technical Report |
| 19 October | The AWS Weekly Roundup lists Beam on SageMaker JumpStart |
| 21 October | AWS What's New post on SageMaker JumpStart and Trainium is dated 21 October; the same day the model card's NVFP4 LiveCodeBench score is updated |

Two loose ends. The full technical report is still marked "Technical Report (coming)" on the model card as of 25 October; only the safety report has been published. And the AWS What's New URL contains `/2026/01/` although the post is dated 21 October and the 19 October roundup already mentions the launch, so treat the AWS dates as approximate.

## Where to run it

- **Download the weights** from Hugging Face: `reflection/Beam-1.0-501B-A23B` (BF16), plus `-FP8` and `-NVFP4` repositories and a DFlash2 speculative-decoding drafter.
- **Reflection API**, public beta, OpenAI-compatible at `https://api.reflection.ai/openai/v1`. The models page lists a 1M context window and a 128K maximum output (131,072 tokens). Reasoning is mandatory; the example response shows a default effort of `max`, which Reflection says can differ by organisation, while Hugging Face's post gives `medium` as the default in the chat template.
- **Amazon SageMaker JumpStart**, in US East (N. Virginia) and US East (Ohio), with BF16, FP8 and NVFP4 variants. AWS says Beam "was ported and optimized for AWS Trainium3", and its roundup notes that "Reflection reports an effective context length of 1 million tokens". SageMaker HyperPod Inference with SGLang or vLLM is the self-managed option.
- **Hugging Face Inference Providers** (Baseten, Fireworks and Together at launch) and Inference Endpoints.
- **Other platforms Reflection lists**, which this page has not verified on each partner's own site: Google Cloud, Microsoft Foundry, Databricks, Oracle, CoreWeave, Nebius, Modal, Cloudflare, Vercel, OpenRouter, Ollama, LM Studio, NVIDIA NIM, and Dell and HPE for on-premises deployments.
- **Serving software** with day-zero support, per Reflection and Hugging Face: Transformers (5.20.1 or later), vLLM, SGLang, Unsloth, Axolotl, TokenSpeed and NVIDIA Dynamo.

### Hardware

The figures are from the Hugging Face post. The BF16 checkpoint is about 1 TB in safetensors; NVFP4 brings it to about 280 GB. Hugging Face suggests planning for four B200s (720 GB) for the NVFP4 build, shows SGLang serving NVFP4 on 4 B300s and FP8 on 8 H200s, and serves BF16 with vLLM across 16 H200s (two 8-GPU nodes). NVFP4 needs Blackwell; FP8 is the option for older GPUs. This is a multi-GPU server model, not a workstation model. See [self-hosting LLMs: hardware and economics](/guides/self-hosting-llms-hardware-and-economics/) before budgeting.

## What it costs

**Not published.** Reflection's site says the API is "free to start" during the public beta, and no per-token price appears in the developer documentation or on any public Reflection page this page could read on 25 October 2026. For colour only: OpenRouter's public model list showed Beam at $0.25 per million input tokens, $1.00 per million output tokens and $0.05 per million cached input tokens when fetched on 25 October 2026. That is a router's price and not a Reflection price list.

## Benchmarks (self-reported)

Every score below is Reflection's own. None has been independently reproduced. Reflection's launch post ran on preview numbers (updated 8 October); the model card, which the 16 October post calls "final benchmarks", differs from the post on most rows. The card notes all evaluations used temperature 0.7 and top_p 0.99.

| Benchmark | Launch post (5 Oct, updated 8 Oct) | Card BF16 | Card FP8 | Card NVFP4 |
|---|---|---|---|---|
| DeepSWE v1.1 | 44.4 | 43.3 | 43.0 | 42.7 |
| SWE-bench Verified | 80.9 | 81.6 | 80.2 | 80.7 |
| SWE-bench Pro v1 | 65.5 | 66.1 | 65.9 | 65.6 |
| SWE-bench Pro v2-Hard | 77.2 | 76.5 | 78.4 | 78.6 |
| SWE-bench Multilingual | 78.0 | 78.3 | 78.1 | 77.5 |
| Terminal-Bench 2.1 | 80.1 | 80.1 | 78.9 | 78.4 |
| SWE Atlas Codebase QnA | 34.6 | 31.8 | 32.2 | 31.4 |
| AIME 2026 | 97.8 | 97.7 | 98.0 | 97.5 |
| GPQA Diamond | 90.5 | 90.6 | 90.3 | 89.3 |
| HLE, no tools | 36.2 | 36.0 | 36.0 | 34.8 |
| HLE, with tools | not reported | 51.1 | 51.1 | 51.1 |
| LiveCodeBench | not reported | 88.3 | 88.1 | 88.3 |
| MCP Atlas | 78.7 | 80.8 | 81.5 | 80.5 |
| BrowseComp (context management) | 77.4 | 76.8 | 76.7 | 75.6 |
| tau3 Banking | 38.0 | 36.1 | 36.8 | 35.4 |
| AA-LCR | 79.3 | 78.2 | 79.4 | 78.7 |
| IFBench | 79.7 | 79.6 | 80.7 | 79.2 |

Scores are percentages. Some rows went down between the launch post and the card, for example DeepSWE from 44.4 to 43.3 and SWE Atlas from 34.6 to 31.8, and some went up, for example SWE-bench Verified from 80.9 to 81.6. Quote the card figures and say which precision they are for. The Hugging Face welcome post reproduces the card as it stood on 16 October, so it shows the earlier NVFP4 LiveCodeBench (87.4) and Terminal-Bench (78.2) values.

### What Reflection claims against other models

The launch post says Beam "is competitive with larger open models like GLM 5.2 and approaching Qwen 3.8-Max on coding and agentic tasks", and adds: "Where frontier open models like Kimi K3 remain ahead on raw capability, Beam's advantage is efficiency at inference time." It also says Beam scores comparably to GLM-5.2 on advanced reasoning benchmarks while using 3 to 4 times less inference compute.

Read the efficiency claim with its method. Reflection estimated compute as 2 times active parameters times mean generated tokens, using other models' results from Artificial Analysis and DataCurve, and says the estimates exclude prompt prefill, context-dependent attention and serving overhead, so they "represent an approximate compute comparison rather than measured inference cost".

Reflection's own comparison table is also candid about the gaps. On its numbers, DeepSWE v1.1 is 44.4 for Beam against 44.0 for GLM 5.2, 68.0 for Kimi K3 and 74.2 for DeepSeek V4.1 Flash, and Terminal-Bench 2.1 is 80.1 for Beam against 88.3 for Kimi K3 and 90.6 for DeepSeek V4.1 Flash. "Competitive with GLM 5.2" is the accurate summary. "Frontier coding model" is not.

### Safety evaluations (self-reported)

Reflection's safety report rates Beam "Limited" in all four systemic-risk categories of its Open Safety Framework (biological weapons, chemical weapons, loss of control and cyber offence), which it defines as "no material shift in the offense-defense balance attributable to the model". On its in-house Iris Safety Evaluations, the card reports that the BF16 model refuses or pivots on 88.9% of harmful requests and complies with 81.5% of harmless ones. These are Reflection's own assessments. The 16 October post thanks partners who tested Beam's capabilities and safety before release, including Gray Swan, Irregular and SecureBio, but their own results are not published on the pages this page read.

## When to use it

- **You need a large open-weight model with no strings in the licence.** Apache 2.0, an ungated download, and an explicit statement that distillation and training on outputs are not prohibited make Beam simple to clear through procurement. Among large open-weight models from US labs as of October 2026 it is in the permissive group with Thinking Machines' [Inkling](/news/thinking-machines-inkling/) (975B, Apache 2.0) and NVIDIA's [Nemotron 3 Ultra](/news/nvidia-nemotron-3/) (550B, OpenMDW-1.1). Beam is not the largest of these. Meta's Muse Spark Open, by contrast, carries an attribution requirement and a revenue-gated Model-as-a-Service clause, and needs approval to download.
- **You want a teacher model for distillation or synthetic data.** The card's explicit permission is unusual, and Reflection's documentation includes recipes for exactly this, such as distilling a coding agent into Gemma 4.
- **You want to fine-tune or run RL on a large model yourself.** Hugging Face published LoRA SFT (TRL) and GRPO (Miles) recipes on 16 October, and Reflection lists fine-tuning and RL workflows built with NVIDIA NeMo, Anyscale SkyRL and Axolotl. See [fine-tuning](/glossary/fine-tuning/) for the basics.
- **Token efficiency matters more than peak scores.** Reflection's claim is fewer reasoning tokens for comparable quality. Measure it on your own tasks before relying on it.

## When not to use it

- **You need image, audio or video input.** Beam is text only. MiniMax-M3.1-Flash and Muse Spark Open accept images and video.
- **You need the strongest open coding model.** On Reflection's own table, Kimi K3 and DeepSeek V4.1 Flash score well ahead on DeepSWE and Terminal-Bench.
- **You do not have multi-GPU servers.** Even the NVFP4 build is about 280 GB. Use a hosted endpoint instead.
- **You need a published API price list or an SLA.** The Reflection API is a public beta with no published per-token price, and Reflection says details on requesting higher rate limits are "coming soon".
- **You need non-English work.** The card says Beam "was developed predominantly for English".

## Further reading

- [Mixture of experts](/glossary/mixture-of-experts/): why 501B total parameters run at the cost of about 23B.
- [Knowledge distillation](/glossary/knowledge-distillation/): what the card's permission to distil actually allows you to do.
- [Speculative decoding](/glossary/speculative-decoding/): what the DFlash2 drafter shipped with Beam does.
- [Quantization](/glossary/quantization/): the difference between the BF16, FP8 and NVFP4 checkpoints.
- [Self-hosting LLMs: hardware and economics](/guides/self-hosting-llms-hardware-and-economics/): sizing a deployment for a model of this class.
- [How AI models are evaluated](/guides/how-ai-models-are-evaluated/): why vendor benchmark tables need a second look.
- [Thinking Machines releases Inkling](/news/thinking-machines-inkling/): the other new US lab that launched with Apache 2.0 weights.
- [Meta Muse Spark and Llama](/tools/meta-llama/): Meta's model line, including its licensing.
- [MiniMax](/tools/minimax/): a Chinese open-weight family with a revenue-gated licence, for comparison.
- [Amazon SageMaker](/tools/amazon-sagemaker/): the AWS platform that hosts Beam through JumpStart.
- [The 2026 LLM landscape](/comparisons/llm-landscape-2026/): where Beam sits among open and closed models.

## Sources

Primary sources first. All fetched 25 October 2026.

1. Reflection, "Introducing Beam: Reflection's 501B open-weight model", 5 October 2026, updated 8 October 2026 (architecture summary, training scale, comparative table, efficiency claims and method): https://reflection.ai/blog/introducing-beam
2. Reflection, "Beam is now available", 16 October 2026 (weights released under Apache 2.0, partners, Reflection API public beta, Mirror CLI, hardware and harness support): https://reflection.ai/blog/beam-is-available
3. Reflection, Beam-1.0-501B-A23B model card on Hugging Face (architecture table, final benchmarks, usage and distillation statement, safety results); repository created 7 October 2026, last updated 21 October 2026: https://huggingface.co/reflection/Beam-1.0-501B-A23B
4. Reflection, Beam-1.0-501B-A23B `config.json` (8 experts per token, 1,048,576 positions, 512-token sliding window, layer pattern): https://huggingface.co/reflection/Beam-1.0-501B-A23B/blob/main/config.json
5. Reflection, Beam LICENSE (Apache License 2.0): https://huggingface.co/reflection/Beam-1.0-501B-A23B/blob/main/LICENSE
6. Reflection, "Beam Safety Technical Report" (Open Safety Framework ratings, Iris Safety Evaluations): https://reflection.ai/beam-safety-report
7. Reflection Developer Docs, "Models" (model ID, 1M context, 128K max output, reasoning efforts) and "Rate limits": https://developers.reflection.ai/models
8. Reflection, "Building Frontier Open Intelligence", 9 August 2025 (US$2 billion raised, team background, investors): https://reflection.ai/blog/building-frontier-open-intelligencence
9. Reflection, About page (open-weights, research and software commitments): https://reflection.ai/about
10. Hugging Face, "Welcome Beam: a 501B open model you can own, customize, and scale", 16 October 2026 (router, attention, KV cache, checkpoint sizes, hardware and serving commands, Inference Providers): https://huggingface.co/blog/reflection-beam
11. AWS What's New, "Beam model by Reflection is now available on Amazon SageMaker JumpStart and AWS Trainium", posted 21 October 2026 (regions, variants, Trainium3, Misha Laskin quote): https://aws.amazon.com/about-aws/whats-new/2026/01/reflection-beam-on-sagemaker-jumpstart-and-aws-trainium/
12. AWS News Blog, "AWS Weekly Roundup: AWS Lambda Web Functions, Amazon S3 on the Vercel Marketplace, and more (October 19, 2026)" ("Reflection reports an effective context length of 1 million tokens"): https://aws.amazon.com/blogs/aws/aws-weekly-roundup-aws-lambda-web-functions-amazon-s3-on-the-vercel-marketplace-and-more-october-19-2026/
13. Meta, Muse Spark Open model card and Muse Model License, released 15 October 2026 (816B/42B, attribution and Model-as-a-Service clauses, gated access): https://huggingface.co/meta-models/Muse-Spark-Open-816B-A42B
14. Thinking Machines, Inkling repository metadata (Apache 2.0, not gated): https://huggingface.co/thinkingmachines/Inkling
15. NVIDIA, Nemotron 3 Ultra 550B-A55B repository metadata (OpenMDW-1.1): https://huggingface.co/nvidia/NVIDIA-Nemotron-3-Ultra-550B-A55B-BF16
16. OpenRouter, public models API (Beam listing and per-token prices; third-party router, secondary source): https://openrouter.ai/api/v1/models
