---
title: "LLM Landscape 2026: Every Major Model Compared"
description: "A comprehensive reference for every major large language model available in 2026. Covers OpenAI GPT, Anthropic Claude, Google Gemini and Gemma, Meta Muse Spark and Llama, Mistral, DeepSeek, Qwen, Kimi, GLM, MiniMax, Xiaomi MiMo, Tencent Hy, xAI Grok, Cohere, Amazon Nova, Microsoft Phi and MAI, NVIDIA Nemotron, IBM Granite, OLMo, Falcon, StarCoder2, DBRX, plus inference providers Groq, Together AI, Fireworks AI, Hugging Face, Ollama, vLLM, and hyperscaler platforms Azure AI, Vertex AI, and OCI Generative AI."
date: 2026-06-01
last_verified: 2026-09-25
categories: [Comparisons]
tags: ["llm", "gpt", "claude", "gemini", "gemma", "llama", "muse-spark", "mistral", "deepseek", "qwen", "kimi", "glm", "minimax", "mimo", "xiaomi", "tencent-hy", "grok", "nova", "nemotron", "granite", "ibm", "olmo", "falcon", "starcoder", "dbrx", "groq", "together-ai", "fireworks-ai", "ollama", "vllm", "hugging-face", "azure-ai", "vertex-ai", "oci", "open-source", "inference-providers", "comparison", "foundation-models", "model-selection"]
last_updated: 2026-09-25
lastmod: 2026-09-25
related:
  - glossary/llm
  - glossary/foundation-models
  - comparisons/claude-vs-chatgpt
  - guides/llm-evaluation-methods
  - guides/llm-cost-optimization
  - tools/claude-anthropic
  - tools/amazon-bedrock
---

<figure class="bz-figure">
  <img src="/img/enterprise-dark/twin-gears-red-notext.png" alt="Two heavy gear clusters with red-accented teeth interlocking in the dark: parallel systems designed for different loads, each turning independently but driving the same output." loading="lazy">
  <figcaption>Every LLM is a different gear: different tooth count, different torque, different speed. Choosing the wrong one does not mean the system breaks - it means you are working against the grain.</figcaption>
</figure>

The LLM market consolidated rapidly between 2023 and 2026. A handful of providers now offer models that are genuinely competitive for most enterprise tasks, while the open-weight ecosystem has expanded to the point where self-hosted options match hosted APIs for many workloads. This article covers every significant model currently in production use, organized by provider.

Prices listed are approximate as of 25 September 2026 and change frequently. Verify current pricing at each provider before architecture decisions. Two current rates are explicitly temporary and worth flagging before you build a cost model on them: OpenAI's GPT-5.6 Sol rate is marked promotional "at least through November 21, 2026" on OpenAI's own pricing page, and Google's Gemini 3.x Flash introductory rate expires 31 December 2026 and doubles on 1 January 2027. Two more are structural rather than temporary: DeepSeek bills on a peak/off-peak schedule (since 16 August 2026), and cut its Flash-tier prices again with the **DeepSeek-V4.1-Flash** release on 10 September 2026; and OpenAI's GPT-6 models, like GPT-5.6, bill the **whole request** at 2x input and 1.5x output once a prompt exceeds 272,000 tokens, so a long-context workload does not cost what the headline rate implies.

---

## How to Read This Reference

Each model entry covers:

- **What it is**: model family, architecture class, release date
- **Context window**: maximum tokens per call (input + output combined unless noted)
- **Strengths**: what this model does measurably better than alternatives
- **Weaknesses**: documented failure modes and known limitations
- **When to use it**: concrete decision guidance
- **API access**: where to call this model

---

## OpenAI

OpenAI's current lineup is the **GPT-6** generation: **GPT-6 Astra** (top tier, API since 3 September 2026), and **GPT-6 Sol** and **GPT-6 Luna** (released 22 September 2026). In GPT-6, **Astra is the flagship**, **Sol is the mid tier** (positioned and priced where GPT-5.6 Terra sat) and **Luna** is the low-cost, high-volume tier; **there is no GPT-6 Terra**, and `gpt-5.6-terra` remains available. The naming is easy to misread: in GPT-5.6, Sol was the flagship, in GPT-6 it is not. The **GPT-5.6** family (GA 9 July 2026) is now the previous generation and remains available, with no retirement date. See [OpenAI API](/tools/openai-api/) for the full current lineup, model IDs, and pricing rather than the point-in-time entries below.

Astra's rollout was staged and publicly rocky, and it is worth being precise about what is and is not gated today, because the two are often conflated. The **base `gpt-6-astra` model is not access-gated**: OpenAI's model documentation lists it with no eligibility note, its rate-limits guide sets no tier minimum, and it is generally available in the API, on Amazon Bedrock (8 September 2026) and in Microsoft Foundry. What *is* gated is the **elevated-cybersecurity configuration**, behind OpenAI's Daybreak program - Daybreak Blue for general security work and Daybreak Red for pen-testing and exploit validation, both introduced on 7 August 2026. Published Astra cyber results reflect Daybreak-configured access rather than default production behaviour. Secondary reporting agrees that OpenAI's Preparedness Framework classifies Astra's cyber capability at the "Critical" threshold (see [Astra crosses the "Critical" cyber threshold](/news/openai-astra-critical-cyber-threshold/)); OpenAI's own launch post could not be re-read directly to confirm the wording, so treat that classification as reported rather than quoted. Sam Altman publicly apologised for the "messy rollout", and in early September some organisations reported uneven API entitlement, so confirm access on your own account rather than assuming it. Microsoft Foundry moved Astra, Sol and Luna to GA together on 22 September 2026 (see the Azure section below).

In ChatGPT, Astra access is per-surface rather than per-plan, and at the time of Astra's launch **GPT-5.6 Sol was the default model everywhere**; check OpenAI's help centre for whether GPT-6 Sol has since replaced it. Per secondary reporting (OpenAI's help centre could not be fetched to verify), Pro, Business Premium and Enterprise see Astra in the regular chat picker labelled "GPT-6 Pro" - Enterprise off by default until an admin enables it - while Plus gets it only inside ChatGPT Work and Codex, not the chat picker, and Free and Go do not get it at all.

The GPT-4o and o1/o3/o4-mini models profiled after the current entries were OpenAI's production lineup through 2024 and into 2025. They are now multiple generations behind GPT-5.6 and GPT-6 and are not what a new integration should default to, but the split they established - a fast general-purpose model alongside a separate reasoning-optimized line - is still useful context for how the current tiers are organized, and comparisons to "GPT-4o" elsewhere in this article (for models released while GPT-4o was current) are left as originally benchmarked. Most of them now carry published retirement dates, noted in their entries.

### GPT-6 Astra (`gpt-6-astra`)

**Released:** 3 September 2026 (API). **Context:** 1,050,000 tokens (922,000 max input, 128,000 max output). **Knowledge cutoff:** 30 April 2026.

OpenAI's most capable model and the top of the current lineup. Text and image in, text out - there is no audio or video input. Reasoning effort is selectable across low, medium, high, xhigh and max; there is no `none` level, and custom `temperature`/`top_p` and `logprobs` are not supported. Available through the Responses API and Chat Completions, with tool calling limited to the Responses API, alongside web search, file search, code interpreter and computer use. Astra shipped alongside three Responses API features: asynchronous tool calling, mid-turn steering over WebSockets, and changing reasoning effort mid-conversation. An **asynchronous misalignment monitor** runs alongside it and can halt a conversation.

**Pricing:** $10.00 input / $1.00 cached input / $12.50 cache write / $50.00 output per million tokens. Prompts above 272,000 input tokens are billed at 2x input and cache and 1.5x output, giving $20 / $2 / $75. Fast mode is 2x standard; Batch and Flex are both 50%.

**Strengths:** Best-in-portfolio reasoning and long-horizon agentic work. Very large context with a documented, rather than implied, long-context billing threshold. Broad first-party tool surface.

**Weaknesses:** The most expensive OpenAI text model by a wide margin. No audio or video input. Astra introduces in-flight safety stops - safety monitors can interrupt a job mid-trajectory, and because these are not timeouts or rate limits, retrying the same request automatically will simply have it stopped again. Azure's documentation likewise notes Astra may apply enhanced safety controls at inference time, including classifier threshold changes and system-injected safety instructions.

**When to use it:** Work where GPT-6 Sol at high reasoning effort has measurably fallen short - long-horizon agents, deep multi-step analysis, hard code work. Not a default: at $2/$10 against Astra's $10/$50, GPT-6 Sol is one fifth of the price and covers most production traffic.

**API access:** OpenAI API (`gpt-6-astra`), Amazon Bedrock (GA 8 September 2026), Microsoft Foundry (model version `2026-09-03`), GitHub Copilot (GA 4 September 2026 on Pro+, Max, Business and Enterprise). On Azure, the early-September picture - Global and US Data Zone only, no EU Data Zone, and contemporaneous reports of a limited-access approval queue - **has changed**: Microsoft's 22 September 2026 Foundry announcement lists Standard deployment for Astra across all 28 Global regions **and the US and EU Data Zones**, plus Provisioned Throughput in Global, US and EU Data Zones. Azure's model documentation has also stated that quota is available by default only on Tier 5 and Tier 6 subscriptions and that mid-conversation reasoning-effort changes and mid-turn steering are not supported; check the current Foundry docs before relying on either.

### GPT-6 Sol (`gpt-6-sol`)

**Released:** 22 September 2026. **Context:** 1,050,000 tokens (922,000 max input, 128,000 max output). **Knowledge cutoff:** 20 April 2026.

The GPT-6 **mid tier** - below the flagship Astra - which OpenAI describes as "built for complex coding and agentic workflows". Do not read the name as "flagship": that was Sol's role in GPT-5.6, not in GPT-6. A reasoning model, text and image in, text out. Unlike Astra it keeps a `none` effort level: reasoning effort is none, low, medium (default), high, xhigh or max. Available on the Responses API, Chat Completions and Batch; built-in tools and function calling are Responses API features, and Chat Completions supports function calling only with `reasoning_effort` set to `none`. EU data residency is available with Standard processing only.

**Pricing per million tokens** (prompts up to 272,000 tokens): **$2.00 input / $0.20 cached input / $2.50 cache write / $10.00 output**. Above 272,000 input tokens the full request is billed at 2x input and cache and 1.5x output ($4 / $0.40 / $15). Batch and Flex are 50%, Fast mode 2x, and regional processing adds 10%. OpenAI also introduced explicit prompt-cache breakpoints with the GPT-6 models.

**The price comparison that matters:** GPT-6 Sol at $2/$10 is **half** the promotional GPT-5.6 Sol rate ($4/$20) and well under half of GPT-5.6 Sol's pre-promotion $5/$30 - so, unusually, the newer model is the cheaper one. It sits where GPT-5.6 Terra sat in the lineup, at Terra's $2 input rate and a lower output rate than Terra's $12.

**When to use it:** The default starting point for new OpenAI integrations - general production work, coding, agents and most reasoning. Escalate to the flagship Astra only where evals show a gap.

**API access:** OpenAI API (`gpt-6-sol`), Microsoft Foundry (GA 22 September 2026, with Provisioned Throughput and Priority Processing), Amazon Bedrock (GA 22 September 2026, 1M context), GitHub Copilot (Pro+ and above).

### GPT-6 Luna (`gpt-6-luna`)

**Released:** 22 September 2026. **Context:** 1,050,000 tokens (922,000 max input, 128,000 max output). **Knowledge cutoff:** 18 May 2026.

The low-cost, high-volume GPT-6 tier: a reasoning model with the same modalities, endpoints and context window as Sol. **Pricing:** $0.10 input / $0.01 cached input / $0.125 cache write / $0.50 output per million tokens (prompts up to 272,000 tokens; the same 2x / 1.5x long-context multipliers apply above that). That is **half the price of GPT-5.6 Luna** ($0.20/$1.20 before its long-context step).

**When to use it:** Classification, extraction, routing and preprocessing at volume, and as the cheap tier in a Luna-to-Sol-to-Astra escalation chain.

**API access:** OpenAI API (`gpt-6-luna`), Microsoft Foundry (GA 22 September 2026), Amazon Bedrock (GA 22 September 2026), GitHub Copilot (Pro and above). See [GPT-6 Sol and Luna](/news/gpt-6-sol-and-luna/).

### GPT-5.6 Sol / Terra / Luna (previous generation, superseded by the GPT-6 family)

**Released:** 9 July 2026 (all three). **Context:** 1,050,000 tokens each, 128,000 max output. **Knowledge cutoff:** 16 February 2026 (Sol).

The workhorse tier from July to September 2026, and still available with no announced retirement. Sol is the flagship, Terra the balanced middle, Luna the cost-optimised tier that also backs ChatGPT's free plan. Text and image in, text out. The `gpt-5.6` alias routes to Sol. There is no GPT-6 Terra - GPT-6 Sol now occupies the mid tier - but `gpt-5.6-terra` remains available and is the named replacement in several of the retirements below. OpenAI still names `gpt-5.6-*` models as migration targets throughout its deprecations page, and GitHub Copilot is moving its older GPT-5.x models onto GPT-5.6 Sol and Luna on 19 October 2026.

**Pricing per million tokens** (long-context rates apply above 272,000 input tokens):

| Model | Input | Cached input | Output | Long-context in / cached / out |
|---|---|---|---|---|
| `gpt-5.6-sol` | $4.00 | $0.40 | $20.00 | $8.00 / $0.80 / $30.00 |
| `gpt-5.6-terra` | $2.00 | $0.20 | $12.00 | $4.00 / $0.40 / $18.00 |
| `gpt-5.6-luna` | $0.20 | $0.02 | $1.20 | $0.40 / $0.04 / $1.80 |

**Budget warning:** Sol's $4.00/$20.00 rate is *promotional*. OpenAI's own pricing page and the `gpt-5.6-sol` model page both state it is available "at least through November 21, 2026". It followed a 21 August 2026 cut of 20% on input and 33% on output from $5/$30. Any cost model that runs past November 2026 should assume the promotion can end.

**When to use it today:** Terra remains available and is the migration target OpenAI itself names for `gpt-3.5-turbo`, `o4-mini`, `gpt-3.5-turbo-instruct` and the base models retiring on 28 September 2026. For Sol and Luna, existing integrations can stay put, but new work should start on GPT-6 Sol and GPT-6 Luna, which are cheaper as well as newer.

**API access:** OpenAI API, Azure OpenAI / Microsoft Foundry, Amazon Bedrock (Sol GA 13 July 2026).

### GPT-5.5 and GPT-5.5 Pro

**Released:** 23 April 2026 (API 24 April 2026). **Context:** 1M, with long-context pricing above 272,000 input tokens.

The first fully agentic retrained OpenAI model, still sold and still listed on Azure Foundry, with no published retirement date. GPT-5.5 is $5.00 / $0.50 cached / $30.00 per MTok ($10 / $1 / $45 long-context); GPT-5.5 Pro, the extended-compute reasoning variant, is $30.00 input / $180.00 output ($60 / $270 long-context), with no published cached-input rate.

**When to use it today:** Existing integrations only. New work at this tier should start on GPT-6 Sol or GPT-6 Astra. GitHub Copilot retires GPT-5.5 in favour of GPT-5.6 Sol on 19 October 2026.

### GPT-4o (previous generation, superseded by GPT-5.6)

**Released:** May 2024. **Context:** 128,000 tokens. **Output limit:** 16,384 tokens.

GPT-4o ("omni") was OpenAI's flagship general-purpose model through 2024 and into 2025. It processes text, images, audio, and video natively in a single model rather than through separate pipelines. The -4o suffix signals the multimodal-first architecture.

**Strengths:** Strong general reasoning, excellent instruction following, consistent JSON output, native vision, broad tool use. The most widely tested model in enterprise deployments during its production run.

**Weaknesses:** Hallucination rate is meaningful on factual tasks without RAG. Vision understanding lags specialist models. Context window is large but performance degrades at very long contexts. Cost is high relative to smaller alternatives for simple tasks.

**When to use it today:** Rarely as a first choice - GPT-5.6 Terra or Sol covers the same ground with more current capability (see [OpenAI API](/tools/openai-api/)). GPT-4o remains relevant for reproducing older evaluations, comparing against legacy production deployments, or where an existing integration is still pinned to it.

**Retirement:** GPT-4o was removed from ChatGPT on 13 February 2026, with Business, Enterprise and Edu retaining it inside Custom GPTs until 3 April 2026, and the `chatgpt-4o-latest` API model was retired in February 2026. The base API snapshots (`gpt-4o-2024-11-20`, `gpt-4o-2024-08-06`) remain listed with no announced shutdown, but `gpt-4o-2024-05-13` shuts down **23 October 2026**. If you are pinned to a dated snapshot, check which one.

**API access:** OpenAI API (`gpt-4o`), Azure OpenAI (`gpt-4o`), Amazon Bedrock.

### GPT-4o mini (previous generation, superseded by GPT-5.6 Luna)

**Released:** July 2024. **Context:** 128,000 tokens. **Output limit:** 16,384 tokens.

Smaller, faster, cheaper version of GPT-4o. Matches or exceeds older GPT-4 on many benchmarks at significantly lower cost. Designed for high-volume, latency-sensitive workloads.

**Strengths:** Excellent price-to-performance for classification, extraction, and structured output tasks. Fast inference. Good instruction following.

**Weaknesses:** Noticeably weaker on multi-step reasoning and complex analysis than GPT-4o. Reduced quality on nuanced writing tasks.

**When to use it today:** For new low-cost, high-volume work, start with GPT-5.6 Luna instead (see [OpenAI API](/tools/openai-api/)). This entry is kept for comparison against deployments still running on it.

**API access:** OpenAI API (`gpt-4o-mini`), Azure OpenAI.

### o1, o3, o4-mini (Reasoning Series, previous generation)

**o1 released:** September 2024. **o3 released:** December 2024. **o4-mini:** 2025.

Extended reasoning now lives in the GPT-6 models (Astra, Sol, Luna) and GPT-5.6; the entries below describe the o-series that established the pattern. The o-series models use chain-of-thought reasoning internally before producing output. They spend compute at inference time thinking through problems, not just generating the most likely next token. This produces measurably better results on tasks requiring multi-step logic, mathematics, and code analysis.

**o1:** First reasoning model. Strong on graduate-level math and science problems. Slower and more expensive than GPT-4o.

**o3:** Significantly improved reasoning over o1. Top benchmark performance on competitive coding (Codeforces) and mathematics (AIME). High cost.

**o4-mini:** Smaller reasoning model. Surprisingly capable for its size. Best cost-to-reasoning ratio in the OpenAI portfolio.

**Strengths:** Multi-step mathematical reasoning, formal verification, code analysis, science problems with clear correct answers.

**Weaknesses:** Significantly slower than non-reasoning models. Not suited for conversational use or tasks where latency matters. Cost can be 10-50x a standard model call. No native tool use (varies by version).

**What they were used for:** Mathematical calculations that need to be correct, complex code debugging, scientific reasoning where accuracy matters more than speed - never summarization, extraction, or general chat. That job now belongs to GPT-6 Sol and GPT-6 Astra with reasoning effort set high, which is a request parameter rather than a separate model.

**Retirement:** the whole line is either gone or dated. `o1` and `o1-mini` were retired on **27 October 2025** and `o1-preview` on 28 July 2025 - the API access line below is already false for those. `o3-mini` and `o4-mini` shut down **23 October 2026**; `o3` shuts down **11 December 2026**. OpenAI names `gpt-5.6-sol` as the replacement for o1, o3 and o3-mini, and `gpt-5.6-terra` for o4-mini.

**API access (historical):** OpenAI API (`o3`, `o4-mini` until October/December 2026), Azure OpenAI. `o1` is no longer callable.

### OpenAI's published retirement schedule

OpenAI now publishes dates for most of its legacy catalogue, and one sweep in particular is large enough to plan around.

| Date | Retiring | Named replacement |
|---|---|---|
| 28 September 2026 | `gpt-3.5-turbo-instruct`, `gpt-3.5-turbo-1106`, `babbage-002`, `davinci-002` | `gpt-5.6-terra` |
| 1 October 2026 | `gpt-5.4-cyber` | `gpt-5.6-cyber` |
| 23 October 2026 | `gpt-3.5-turbo`, `gpt-4`, `gpt-4-turbo`, `gpt-4-1106-preview`, `gpt-4o-2024-05-13`, `o1`, `o1-pro`, `o3-mini`, `o4-mini`, `gpt-4.1-nano`, `gpt-image-1` | `gpt-5.6-sol` / `terra` / `luna`, `gpt-image-2` |
| 1 December 2026 | `gpt-image-1.5`, `gpt-image-1-mini` | `gpt-image-2` |
| 11 December 2026 | `o3` | `gpt-5.6-sol` |
| 20 January 2027 | `gpt-realtime`, `gpt-4o-realtime`, `gpt-4o-audio` | `gpt-realtime-2.1`, `gpt-audio-1.5` |
| 26 February 2027 | `whisper-1`, `gpt-4o-transcribe`, `gpt-4o-mini-transcribe`, `gpt-4o-transcribe-diarize` | `gpt-transcribe`, `gpt-live-transcribe` |

Already gone: `o1-preview` (28 July 2025), `o1-mini` (27 October 2025), `gpt-5.1` variants (23 July 2026), `gpt-5.2-chat-latest` (10 August 2026), `dall-e-2` and `dall-e-3` (12 May 2026), the **Assistants API**, which shut down on **26 August 2026** in favour of the Responses and Conversations APIs, and the **Videos API together with `sora-2` and `sora-2-pro`**, which shut down on **24 September 2026 with no named replacement** - OpenAI no longer offers a video-generation API. Any code still calling `v1/assistants` or `v1/videos` now fails.

Outside the text lineup, several September 2026 moves matter. **GPT-Live 1** (`gpt-live-1`) reached GA on 10 September 2026 on a new `v1/live/sessions` endpoint - full-duplex voice with custom voices and telephony, billed at $0.05 per minute (per second) plus the backend model's tokens. The **Agents API** entered public beta the same day, offering a managed Codex harness with durable sessions, MCP, and hosted or bring-your-own sandboxes. And two moves on 8 September 2026 matter for anyone building multimodal pipelines: OpenAI shipped `gpt-image-2.5-flare` (now the default image model for most applications, up to 50% lower generation latency than `gpt-image-2`) and `gpt-image-2.5-sunburst` (premium precision editing), both billed at `gpt-image-2` rates, alongside a consumer ChatGPT Images 2.5 rollout to all tiers. On the audio side, `gpt-transcribe` has been OpenAI's recommended speech-to-text model since 28 July 2026 at $0.0045 per audio minute - 25% below `whisper-1` - with `gpt-live-transcribe` as the streaming counterpart. Text-to-speech is unchanged: `gpt-4o-mini-tts` is still described in OpenAI's own guide as its newest and most reliable TTS model.

---

## Anthropic: Claude

Anthropic's models are designed around safety, instruction following, and long-document analysis. Anthropic's current lineup spans four tiers: **Haiku 4.5** (fastest, lowest cost), **Sonnet 5** (balanced, GA 30 June 2026), **Opus 5.5** (flagship and default recommendation, GA 22 September 2026), and **Fable 5.1** - plus the access-gated **Mythos 5.1** - Anthropic's most capable models, positioned above Opus (both GA 1 September 2026). Opus 5.5 is the first model of a **Claude 5.5 family**; Anthropic has announced **Sonnet 5.5 and Haiku 5.5 "in the coming weeks"**, but neither is released as of 25 September 2026. Claude Opus 5 (24 July 2026) has dropped off Anthropic's current-models list and is now the previous generation. See [Claude by Anthropic](/tools/claude-anthropic/) for the full current lineup, model IDs, and pricing rather than the point-in-time entries below.

Two structural points before the entries. First, **every current Claude model is a 1M-token context model** except Haiku 4.5 - that has been true since the 4.6 generation, and any comparison that still files Claude under "200K" is a generation out of date. Second, Claude's token accounting changed with Opus 4.7: models from 4.7 onward use a newer tokenizer that Anthropic says produces roughly 30% more tokens for the same text, so 1M tokens is about 555k words on current models where pre-4.7 models fit about 750k words in the same budget. Haiku 4.5, being pre-4.7, is on the old tokenizer, and its 200K window is roughly 150k words.

The Claude 4 models profiled below (Sonnet 4.6, Opus 4.8) were Anthropic's production flagship and mid-tier through mid-2026 and are now superseded by Sonnet 5 and Opus 5 respectively; Opus 5 is in turn superseded by Opus 5.5, and Claude Fable 5 by Fable 5.1. Claude Haiku 4.5 remains part of the current lineup, though it now has the nearest retirement floor in the family.

### Claude Fable 5.1 (`claude-fable-5-1`)

**Released:** 1 September 2026. **Context:** 1,000,000 tokens. **Output limit:** 128,000 tokens. **Knowledge cutoff:** June 2026.

Anthropic's most capable widely released model - but explicitly not its default recommendation. Anthropic's own guidance is to start with Opus 5.5 for most workloads and reach for Fable 5.1 for demanding reasoning and long-horizon agentic work, or when evals on Opus 5.5 at higher effort still fall short. Adaptive thinking is always on, with default effort "high".

**Pricing:** $10.00 input / $50.00 output per MTok, unchanged from Fable 5. The change that matters is cache reads: $0.25/MTok, a 75% cut from Fable 5's $1.00, using a 0.025x multiplier that no other Claude model has (every other model uses 0.1x). Cache writes are $12.50 for the 5-minute TTL and $20.00 for the 1-hour. Batch API is $5/$25. Anthropic claims roughly 25% overall cost reduction on typical workloads and up to 45% on complex agentic tasks.

**Strengths:** Top-tier reasoning and long-horizon agentic work. Benchmark gains over Fable 5 on Terminal-Bench-Science 0.1 (52.6% vs 24.7%), Terminal-Bench 4.0 (55.8% vs 42.0%) and OSWorld 2.0 strict (41.7% vs 36.1%), per Anthropic's announcement. The cache-read pricing makes long, repeatedly-referenced context genuinely cheap.

**Weaknesses and compliance constraints:** This is the entry where the fine print is the decision. Fable 5.1 **requires 30-day data retention and is not available under zero-data-retention arrangements** unless expressly authorised by Anthropic - a request from an org or workspace without 30-day retention returns a 400. It is designated a Covered Model and is **not supported on Priority Tier**. Output text carries an Anthropic watermark, and media produced by the code execution tool carries C2PA Content Credentials, which matters if the output is client-facing. Three breaking changes versus Fable 5: forced `tool_choice` (`any`/`tool`) now returns 400; thinking blocks are readable only by the producing model or newer; and editing earlier turns invalidates thinking blocks.

**When to use it:** Demanding reasoning and long-horizon agents where Opus 5.5 has been evaluated and found short - and where a 30-day retention requirement is acceptable. Anthropic says Opus 5.5 performs at the level of Fable 5.1 on most work, at $4/$20 against Fable's $10/$50, so that evaluation is now worth running before defaulting to Fable. If you are on a ZDR contract, Fable 5.1 is not available to you; use Opus 5.5, which is.

**API access:** Anthropic API (`claude-fable-5-1`), Amazon Bedrock (`anthropic.claude-fable-5-1`), Google Cloud, Microsoft Foundry, Claude Platform on AWS.

### Claude Mythos 5.1 (`claude-mythos-5-1`)

**Released:** 1 September 2026. **Context:** 1,000,000 tokens. **Output limit:** 128,000 tokens. **Status:** Active, invite only.

Same capabilities and specifications as Fable 5.1, and identical pricing down to the $0.25/MTok cache read, offered by invitation through Project Glasswing. Anthropic's docs say to contact your Anthropic, AWS or Google Cloud account team for access. The 1 September 2026 announcement names two gating programmes, and **which of them actually reaches Mythos 5.1 today is worth reading carefully**. The **Life Sciences Verification Program** - developed with the US government - is the one that grants Mythos 5.1 access now, with the first participants already enrolled. The **Cyber Verification Program**, as of that same announcement, provides access only to certain Opus- and Sonnet-class models with reduced cyber safeguards for defensive security work; Anthropic says it "will also include access to Claude Mythos-class models" in the near future, but that is a stated plan rather than a shipped capability, so a defensive-security team should not assume CVP enrolment currently yields a Mythos 5.1 key. Availability is in both cases restricted to a set of US organisations, with expansion planned through government coordination.

The usual shorthand is that Mythos is Fable run with a lighter safeguard stack. That is directionally right but only *confirmed* for the previous generation: Anthropic states plainly that Fable 5 includes safety classifiers and Mythos 5 does not. For 5.1, Anthropic's migration guide lists safety classifiers under "where the two models diverge" and describes only Fable 5.1's behaviour, while still instructing Mythos 5.1 users to handle `stop_reason: "refusal"` - so the exact safeguard stack on Mythos 5.1 is not stated. Unlike Fable 5.1, Mythos 5.1 does not run the conversation check on thinking blocks, so editing earlier turns does not invalidate them.

**API access:** Anthropic API (`claude-mythos-5-1`), Amazon Bedrock, Google Cloud, Microsoft Foundry - **not** Claude Platform on AWS, which Fable 5.1 does support. Same 30-day retention, no-ZDR and Covered Model constraints as Fable 5.1, and likewise not on Priority Tier.

### Claude Opus 5.5 (`claude-opus-5-5`)

**Released:** 22 September 2026. **Context:** 1,000,000 tokens. **Output limit:** 128,000 tokens. **Knowledge cutoff:** June 2026 (reliable and training). **Retirement:** not sooner than 22 September 2027.

Anthropic's new default recommendation - "if you're unsure which model to use, start with Claude Opus 5.5 for most workloads" - and the first model of the Claude 5.5 family. Anthropic says it performs at the level of Claude Fable 5.1 on most work, generates output more than 30% faster than Opus 5, and costs about 40% less than Opus 5 to run at default settings on typical workloads, because the per-token price is lower and it uses fewer tokens per task. Adaptive thinking is **always on** - Opus 5.5 can no longer be run with thinking switched off - and default effort drops from **high on Opus 5 to medium**.

**Pricing:** **$4.00 input / $20.00 output per MTok** (20% below Opus 5's $5/$25). Cache reads $0.20 (60% below Opus 5's $0.50) and 5-minute cache writes $5.00 (Opus 5: $6.25). Fast mode, available in Claude Code and on the Claude Platform, is $8/$40 for up to 2.5x speed.

**Strengths:** Near-Fable capability at Opus price, with cache reads priced for agentic and coding work, where cached context is the majority of the bill. Anthropic highlights long, sprawling jobs such as codebase-wide migrations and audits. Like earlier Opus models it **is available under zero data retention**, which Fable 5.1 is not.

**Weaknesses and constraints:** Because Anthropic rates it comparable to Mythos 5.1 in biology and cybersecurity, it ships with **safeguards similar to Fable 5.1's**. Anthropic says users can still find and fix bugs in their own code as part of routine development, but **"most cybersecurity tasks will be re-routed to Opus 4.8"** - so a security-tooling pipeline that targets Opus 5.5 will in practice be served largely by an older model. The benchmark footnote makes the same point: where safeguards intervened during evaluation, cyber tasks were completed by Opus 4.8 and biology and frontier-LLM-development tasks by Opus 5, which Anthropic says likely lowers Opus 5.5's published scores on those benchmarks. Biology research access runs through the Life Sciences Verification Program, and Anthropic says it will soon extend the Cyber Verification Program to Opus 5.5, with three tiers of increasingly permissive trusted access. Output carries Anthropic's EU AI Act watermarking, as on Fable 5.1. It also launches with **preserved thinking**, the anti-distillation safeguard introduced with Fable 5.1, which stops API users editing Claude's prior context to extract its reasoning; it applies to API accounts created on or after 31 August 2026, so test multi-turn integrations that rewrite history before migrating.

**Breaking changes from Opus 5 (each returns a 400):** disabling thinking or setting `budget_tokens`; forced `tool_choice` (`any` or a named tool); non-default `temperature`, `top_p` or `top_k`; a prefilled final assistant turn; and, on the Claude API and Google Cloud, the older `computer_20251124` computer-use tool. Migrating from Opus 5 is therefore a code change, not just a model-ID swap.

**When to use it:** The default for new Claude work that needs more than Sonnet 5, and the first migration target for Opus 5 and Opus 4.x deployments once the breaking changes above are handled. Test it against Fable 5.1 before paying for Fable. See [Claude Opus 5.5](/news/claude-opus-5-5/).

**API access:** Anthropic API (`claude-opus-5-5`), Amazon Bedrock (`anthropic.claude-opus-5-5`, including GovCloud), Google Cloud Vertex AI / Model Garden, Microsoft Foundry (all from 22 September 2026), and GitHub Copilot.

### Claude Opus 5 (`claude-opus-5`) (previous generation, superseded by Opus 5.5)

**Released:** 24 July 2026. **Context:** 1,000,000 tokens. **Output limit:** 128,000 tokens (300,000 on the Message Batches API with the `output-300k-2026-03-24` beta header). **Knowledge cutoff:** May 2026.

Anthropic's default recommendation from July to September 2026, and no longer on its current-models list since Opus 5.5 took that place on 22 September 2026. It remains Active, with a retirement floor of not sooner than 24 July 2027. A step change over Opus 4.8, with the largest gains in deep reasoning, agentic and long-horizon tasks, and test-time compute scaling. Adaptive thinking is on by default - a breaking change from Opus 4.8 - and thinking can only be disabled at effort "high" or below. Minimum cacheable prompt is 512 tokens.

**Pricing:** $5.00 input / $25.00 output per MTok. Cache writes $6.25 (5m) and $10.00 (1h), cache read $0.50. Batch API $2.50/$12.50. A separate fast mode - research preview, Claude API only - is billed at $10/$50, double the standard rate.

**Strengths:** Was the best balance in the lineup, and available under zero data retention.

**Weaknesses:** Not supported on Priority Tier. Opus 5.5 is cheaper per token ($4/$20 and $0.20 cache reads), so staying on Opus 5 now costs more for less. Platform availability is genuinely ambiguous - see below.

**When to use it today:** Existing integrations pinned to `claude-opus-5` while they are evaluated against Opus 5.5. Opus 5 is still **Active** (retirement not sooner than 24 July 2027), not deprecated. Note that Opus 5.5 changes default effort from high to medium and adds several 400-error breaking changes (listed in its entry), so migration is a code and behaviour change to test, not just an ID swap.

**API access:** Anthropic API (`claude-opus-5`), Amazon Bedrock, Google Cloud, Microsoft Foundry. Whether it is orderable on **Claude Platform on AWS is disputed inside Anthropic's own documentation**: the 24 July 2026 API release note lists Claude Platform on AWS among its platforms, while the Opus 5 model page omits it from both the model-ID table and the availability row, and the models-overview comparison table prints an em-dash for that column. Confirm with your account team before committing an architecture to that path.

### Claude Sonnet 5 (`claude-sonnet-5`)

**Released:** 30 June 2026. **Context:** 1,000,000 tokens. **Output limit:** 128,000 tokens (300,000 on the Batch API with the `output-300k` beta header). **Knowledge cutoff:** January 2026.

The balanced production tier, and the volume model for most Claude deployments. Adaptive thinking is on by default; manual extended thinking and non-default `temperature`/`top_p`/`top_k` all return 400.

**Pricing:** $2.00 input / $10.00 output per MTok - **and this is now the permanent price**. Anthropic's pricing page carries a standing note that the $2/$10 rate, announced at launch as introductory through 31 August 2026, is now standard, and that the scheduled 1 September 2026 increase to $3/$15 will not occur. The change was dated 10 August 2026. Cache writes $2.50 (5m) and $4.00 (1h), cache read $0.20. Batch API $1/$5.

**When to use it:** The default for production traffic that does not need Opus 5.5's depth - coding, analysis, long-document work, structured output at scale. Anthropic has announced a Sonnet 5.5 "in the coming weeks"; it was not released as of 25 September 2026.

**API access:** Anthropic API (`claude-sonnet-5`), Amazon Bedrock, Google Cloud, Microsoft Foundry, Claude Platform on AWS.

### Pricing modifiers that do not appear in headline rates

Four items change a real Claude bill and none of them are visible in a per-token table. `inference_geo: 'us'` applies a **1.1x multiplier to every token category** - input, output, cache writes and cache reads - on Claude 4.6 and later, via the Claude API and Claude Platform on AWS, and on Foundry US Data Zone Standard deployments; first-party data residency costs 10% more. Cache *writes* are 1.25x base for the 5-minute TTL and 2x base for the 1-hour. Claude Managed Agents add a session-runtime SKU at $0.08 per session-hour on top of tokens. And tools bill separately: web search is $10 per 1,000 searches, web fetch is free, and code execution is free when paired with web search or fetch, otherwise $0.05 per container-hour beyond 1,550 free hours per organisation per month.

### Claude 4 Sonnet (claude-sonnet-4-6) (previous generation, superseded by Sonnet 5)

**Context:** 1,000,000 tokens. **Output limit:** 128,000 tokens (300,000 on the Batch API with the beta header). **Released:** 17 February 2026. **Retirement:** not sooner than 17 February 2027.

Claude Sonnet 4.6 was Anthropic's production workhorse through mid-2026, at $3/$15 per MTok. Strong across coding, analysis, and writing. It supported extended thinking (visible chain-of-thought reasoning mode) for complex tasks - a mode now deprecated on Sonnet 4.6 itself and removed entirely from Sonnet 5 and later, which return 400 for it and use adaptive thinking steered by the `effort` parameter instead.

Sonnet 4.6 is also the last Sonnet on the **previous tokenizer**, so its 1M window holds roughly 750k words where Sonnet 5's holds roughly 555k - a real difference if you are comparing "same context window" across the two.

**Strengths:** Exceptional at long-document analysis and synthesis. Best-in-class instruction following on complex, multi-part prompts. Reliable structured output. Strong code generation and debugging.

**Weaknesses:** Pricing is higher than the model that replaced it - Sonnet 5 is $2/$10 against Sonnet 4.6's $3/$15. Vision is solid but not the primary strength. The extended-thinking API surface it was built around no longer exists on current models, so a migration is a code change, not just a model-ID swap.

**When to use it today:** Rarely as a first choice - Claude Sonnet 5 covers the same ground with more current capability (see [Claude by Anthropic](/tools/claude-anthropic/)). This entry is kept for comparison against deployments still running on it.

**API access:** Anthropic API (`claude-sonnet-4-6`), Amazon Bedrock, Google Cloud Vertex AI (rebranded [Gemini Enterprise Agent Platform](/tools/google-vertex-ai/) in April 2026 - see that page for the full story; "Vertex AI" is used throughout this reference for continuity with existing model IDs and docs).

### Claude 4 Opus (claude-opus-4-8) (previous generation, superseded by Opus 5)

**Context:** 1,000,000 tokens. **Output limit:** 128,000 tokens (300,000 on the Batch API beta). **Released:** 28 May 2026. **Retirement:** not sooner than 28 May 2027.

Anthropic's most capable model through mid-2026, launched alongside the company's $65bn Series H at a $965bn post-money valuation. Higher accuracy on complex tasks, better long-context comprehension, stronger creative and analytical writing.

**Strengths:** Best overall quality in the Claude family. Handles the most ambiguous, complex prompts reliably. Strong research synthesis over many documents.

**Weaknesses:** Highest cost in the Claude lineup. Slower inference. Not necessary for most workloads that Sonnet handles well.

**When to use it today:** Opus 5.5 (GA 22 September 2026) is Anthropic's current flagship and default recommendation at this tier, at a lower $4/$20 - see [Claude by Anthropic](/tools/claude-anthropic/). This entry is kept for comparison against deployments still running on it. Note that Opus 4.8 remains served, as do Opus 4.7 (retirement floor 16 April 2027), Opus 4.6 (5 February 2027) and Opus 4.5 (24 November 2026). Opus 4.1 was retired on 5 August 2026, and Opus 4 and Sonnet 4 on 15 June 2026.

**API access:** Anthropic API (`claude-opus-4-8`), Amazon Bedrock.

### Claude Haiku 4.5 (claude-haiku-4-5)

**Released:** 15 October 2025. **Context:** 200,000 tokens. **Output limit:** 64,000 tokens. **Knowledge cutoff:** February 2025.

Anthropic's fastest and most cost-efficient model, and the one tier that has not turned over in the 5 generation. Trades some reasoning depth for speed and lower cost. $1.00 input / $5.00 output per MTok; cache read $0.10; Batch API $0.50/$2.50.

**Strengths:** Fastest response latency in the Claude family. Lowest cost per token. Good for simple tasks and real-time applications.

**Weaknesses, and the number people get wrong:** at $1/$5 against Sonnet 5's $2/$10, Haiku 4.5 is exactly **half** Sonnet 5's per-token price, not a fifth - the ratio narrowed sharply when Sonnet dropped to $2/$10, so routing volume down to Haiku buys less than it used to. It is also the only current model still on the **previous tokenizer** and the only one that does not support the `effort` parameter, using manual extended thinking with `budget_tokens` instead. Its February 2025 reliable knowledge cutoff is by far the oldest in the lineup.

**Lifecycle:** Haiku 4.5 (`claude-haiku-4-5-20251001`) has the nearest retirement floor in the current lineup - not sooner than **15 October 2026**. As of 25 September 2026 Anthropic's deprecations table still lists it as Active and not deprecated, and Anthropic commits to at least 60 days' notice for publicly released models, so it **cannot retire on 15 October** - the earliest possible date is now late November 2026 - but it is the current model closest to end of life. The same logic applies to **Sonnet 4.5** (`claude-sonnet-4-5-20250929`), whose floor of **29 September 2026** is days away but which is likewise still Active with no deprecation notice; Opus 4.5's floor is 24 November 2026. Anthropic has announced a **Haiku 5.5** "in the coming weeks", which is the likely successor, but it was not released as of 25 September 2026.

**When to use it:** Chatbot responses, simple classification, autocomplete-style interactions, high-volume preprocessing - with the price ratio above checked against Sonnet 5 for your actual traffic mix.

**API access:** Anthropic API (`claude-haiku-4-5-20251001`, alias `claude-haiku-4-5`), Amazon Bedrock, Google Cloud, Microsoft Foundry, Claude Platform on AWS.

### Claude Fable 5 (previous generation, superseded by Fable 5.1)

**Released:** 9 June 2026. **Context:** 1,000,000 tokens. **Output limit:** 128,000 tokens. **Status:** Active (legacy). **Retirement:** not sooner than 9 June 2027.

The most capable model in the Anthropic portfolio through August 2026, and the release that opened a new top tier above Opus. Designed for the most demanding enterprise tasks. Same $10/$50 headline price as Fable 5.1 but with $1.00/MTok cache reads rather than $0.25 - the cache-read cut is the whole economic argument for the 5.1 upgrade. Fable 5 *is* supported on Priority Tier, where Fable 5.1 is not, which is the one reason a deployment might deliberately stay put.

Fable 5's launch is also the reason Mythos exists as a separate line: Anthropic states that Fable 5 includes safety classifiers and Claude Mythos 5 does not.

**A note on the June 2026 export-control episode**, which is often collapsed into a single date. The US government's order of 12 June 2026 barred access to Fable 5 and Mythos 5 for any foreign national, and Anthropic disabled both worldwide. Mythos 5 returned first, on 26 June 2026, for roughly 100 vetted US critical-infrastructure entities. Commerce lifted the order on 30 June 2026, and Fable 5 returned worldwide on 1 July 2026 after Anthropic shipped a classifier blocking the reported jailbreak. That sequence - Mythos back first and only for vetted US entities - is why the Mythos line stayed gated afterwards.

**When to use it today:** Claude Fable 5.1 (GA 1 September 2026) supersedes it at the same headline price with cache reads cut 75%, and the access-gated Claude Mythos 5.1 sits alongside it for verified cybersecurity and life-sciences use cases - see [Claude by Anthropic](/tools/claude-anthropic/) for the current top-tier lineup. This entry is kept for comparison against deployments still running on it, and for Priority Tier workloads that 5.1 cannot serve.

**API access:** Anthropic API (`claude-fable-5`).

---

## Google: Gemini and Gemma

Google maintains two parallel LLM families: the commercial Gemini series (via API) and the open-weight Gemma series.

The single most important structural fact about Google's 2026 lineup is that **the Flash line has run ahead of the Pro line**. Gemini 3.5 Pro was trailed at Google I/O on 19 May 2026 for a June launch and has still not shipped as of 25 September 2026 - DeepMind's own Pro page carries only a "3.5 Pro coming soon" note, and reporting attributes repeated slips to coding-benchmark shortfalls. Meanwhile Google shipped three Flash releases in under two months: 3.6 Flash (21 July 2026), 3.7 Flash (13 August 2026) and 3.8 Flash (2 September 2026). The Pro tier is still on Gemini 3.1 Pro, released 19 February 2026 and **still in preview** (`gemini-3.1-pro-preview`) seven months later - and GitHub Copilot deprecated it on 1 September 2026. In practice, Gemini 3.8 Flash is Google's current flagship shipping model.

Note also that Google no longer offers a 2M-token context model. Current Gemini context is 1M in / 64K out across both the Pro and Flash tiers.

### Gemini 3.8 Flash (`gemini-3.8-flash`)

**Released:** 2 September 2026. **Status:** GA. **Context:** 1,000,000 input / 64,000 output tokens.

The current top Flash model and, given the Pro line's stall, Google's de facto flagship. Google positions it for long-horizon software engineering, autonomous agents and complex enterprise workflows.

**Pricing:** $0.75 input / $3.75 output per MTok (cache $0.075) - **introductory, expiring 31 December 2026**. From 1 January 2027 it doubles to $1.50 / $7.50 (cache $0.15). A free tier is available. The same introductory-then-doubling structure applies to 3.7 Flash and 3.6 Flash, so a cost model built on today's Flash price has a hard cliff in it.

**Strengths:** Frontier-adjacent capability at Flash pricing. Very broad surface coverage - Gemini API, Google AI Studio, Android Studio, Gemini Enterprise, Google Antigravity, Search AI Mode, Google Sheets.

**Weaknesses:** The introductory price is temporary. In the Gemini app it is limited to AI Pro and AI Ultra subscribers, not the free tier.

**When to use it:** Production applications needing speed plus large context, agentic workflows, and most work that would previously have gone to a Pro-tier model.

**API access:** Gemini API, Google AI Studio, Gemini Enterprise Agent Platform (the rebranded Vertex AI).

### Gemini 3.1 Pro (`gemini-3.1-pro-preview`)

**Released:** 19 February 2026. **Status:** still preview. **Context:** 1,048,576 input / 65,536 output tokens.

The current Pro-tier model. There is no GA Pro-tier Gemini 3.x model - Google said at launch it was releasing 3.1 Pro in preview with GA to follow, and no GA has been announced since. Claimed 77.1% on ARC-AGI-2 at launch.

**Pricing:** $2.00 input / $12.00 output per MTok for prompts up to 200k tokens; $4.00 / $18.00 above 200k.

**When to use it:** Long-document comparison, full-codebase analysis and multimodal workflows where you want the Pro tier specifically - accepting that the model ID still carries a `-preview` suffix and Google has not committed to a GA date.

**API access:** Gemini API, Google AI Studio, Gemini CLI, Google Antigravity, Android Studio, Gemini Enterprise Agent Platform; in the Gemini app and NotebookLM for AI Pro and Ultra subscribers.

### Gemini 3 Deep Think

**First released:** 3-4 December 2025; substantially upgraded 12 February 2026.

Not a model tier you can simply select - an Ultra-gated reasoning mode using parallel reasoning over multiple simultaneous hypotheses. In the Gemini app it is available to Google AI Ultra subscribers only ($99.99 or $199.99/month). **API access is by early-access application only**, so a developer cannot call it self-serve.

Google's own published figures from the February 2026 upgrade: 48.4% on Humanity's Last Exam without tools, 84.6% on ARC-AGI-2, Codeforces Elo 3455, and IMO 2025 gold-medal level. Beware of stale numbers in circulation - the widely quoted 41.0% HLE / 45.1% ARC-AGI-2 figures are from the December 2025 launch, not the current version. Deep Think has not been refreshed since February 2026.

### Gemini 3.8 Flash Cyber

**Released:** 2 September 2026, alongside 3.8 Flash. **Status:** closed access.

A cybersecurity-specialised variant for autonomous vulnerability discovery, security research and automated patching, paired with Google's CodeMender remediation agent. It is not purchasable: access runs through the new **Fairwind Program**, which prioritises vetted government authorities, critical infrastructure operators and maintainers of widely used software. Google says it vets applicants for a proven track record of ethical operations and research, and participants must restrict access to security, incident-response and pen-test staff and enforce MFA. Whether Fairwind participants call it through the ordinary Gemini API or a separate managed offering is not stated in Google's announcement.

This is the same pattern as OpenAI's Daybreak and Anthropic's Project Glasswing: a frontier cyber capability that exists but cannot simply be bought.

### Gemini Omni 1.1 Flash (`gemini-omni-1.1-flash`)

**Family announced:** 19 May 2026 (Google I/O). **Version 1.1 released:** 27 August 2026. **Status:** disputed - Google's own model list places it under Preview, while multiple outlets described the 27 August release as generally available.

Not a text flagship: a unified multimodal *generative video* family. Text, image, audio and video in; video with native audio out, with conversational multi-turn editing. Version 1.1 adds first/last-frame interpolation, scene extension in 10-second increments to 40 seconds total, 4K upscaling, and a 360p draft mode roughly 60% faster at about a third of the cost.

**Pricing:** $1.50 input per MTok; output $9.00 for text and $17.50 for video.

**When to use it:** Video generation workflows. This is the entry that makes Google's "multimodal" claim different in kind from the rest of this article - the family *generates* video, it does not merely ingest it. Consumer access is through Google Flow for AI Plus/Pro/Ultra, scene extension in the Gemini app, and free in YouTube Shorts Remix. If you are still calling the older **`gemini-omni-flash-preview`** ID, note that it **shuts down on 30 September 2026**.

### Gemini 3.8 Live (`gemini-3.8-live`)

**Released:** 15 September 2026. **Status:** GA. Also `gemini-3.8-live-extended-thinking`.

Google's native **audio-to-audio** model for real-time voice agents, replacing `gemini-3.1-flash-live-preview`, with an Extended Thinking variant for turns that need more reasoning. **Pricing:** $0.75 text / $3.00 audio input and $4.50 text / $12.00 audio output per MTok. Google announced a **Live Avatar** capability on top of it on 24 September 2026.

**When to use it:** Speech-to-speech assistants and telephony where you want a GA Google model rather than a preview one - the first time Google's Live line has been out of preview.

### Gemini 3.8 Flash TTS and Flash-Lite TTS

**Released:** 22 September 2026. **Status:** GA. **IDs:** `gemini-3.8-flash-tts`, `gemini-3.8-flash-lite-tts`.

Text-to-speech models replacing `gemini-3.1-flash-tts-preview`, with 150+ voices listed via a new `/v1beta/voices` endpoint, plus **voice design and voice replication**. Replication requires consent verification, which is worth building into the workflow rather than discovering at integration time.

### Gemini 3.7 / 3.6 / 3.5 Flash and Flash-Lite

Still listed and priced. **3.7 Flash** (13 August 2026) and **3.6 Flash** (21 July 2026) are both $0.75/$3.75 introductory through 31 December 2026 then $1.50/$7.50; 3.6 Flash is reported to be the default model for free-tier Gemini app users, though no Google page states that directly. **3.5 Flash** (19 May 2026) is oddly the most expensive of the group at $1.50/$9.00 with no scheduled increase - newer is cheaper here, which is worth checking before pinning a version. **Gemini 3.5 Flash-Lite** is $0.30/$2.50 and **Gemini 3.1 Flash-Lite** (3 March 2026) is the cheapest current Gemini text model at $0.25 input for text, image and video ($0.50 audio) and $1.50 output.

### Gemini 2.5 (previous generation, restricted to existing users)

Since **18 September 2026** the Gemini 2.5 models are available only to projects that were already using them; new projects are directed to **Gemini 3.5 Flash-Lite** or **Gemini 3.8 Flash**. If a new environment (a fresh project, a new region rollout, a DR account) depends on a 2.5 model ID, it will not get access - migrate before provisioning, not after.

### Gemini 2.0 Pro and Gemini 2.0 Flash (previous generation, superseded by Gemini 3.x)

**Gemini 2.0 Pro** was Google's flagship with a 2,000,000-token experimental context window - for a period genuinely the largest of any major hosted model. **Gemini 2.0 Flash** was the most widely deployed Gemini model for production applications.

**When to use them today:** Neither is listed on Google's current model page, and no 2M-token Gemini is offered. The successors are Gemini 3.1 Pro at 1,048,576 tokens and Gemini 3.8 Flash at 1,000,000 - so if you selected Gemini specifically for the 2M window, that advantage no longer exists and the choice is worth revisiting. Exact retirement dates were not published. These entries are kept for comparison against deployments and evaluations still referencing them.

### Gemini 1.5 Flash / 1.5 Pro (superseded by Gemini 3.x)

Earlier generation, no longer on the current models page. Flash for speed, Pro for capability; both supported 1M context. Gemini 3.8 Flash and 3.1 Pro are the current equivalents.

### Gemma 4 (Open Weight)

**Released:** 2 April 2026 (E2B, E4B, 26B A4B, 31B); Gemma 4 12B added 3 June 2026. **License:** Apache 2.0.

Google's current open-weight family, and the licence is the headline. Gemma 4 ships under **Apache 2.0**, replacing the restrictive Gemma Terms of Use that governed Gemma 3 - a genuine liberalisation that changes the "can I use this commercially" answer, not a cosmetic relicensing.

**Sizes and context** (parameter counts from Google's model card): E2B at 2.3B effective / 5.1B with embeddings and E4B at 4.5B effective / 8B, both 128K context; 12B Unified at 11.95B, 26B A4B as a MoE at 25.2B total / 3.8B active, and a 31B dense at 30.7B, all at 256K context. Text and image across the family; audio on E2B, E4B and 12B. 140+ languages.

**Strengths:** Apache 2.0 open weights. The 12B is encoder-free and unified - a 35M-parameter vision embedder and a linear audio projection into one decoder-only transformer - and runs on a 16GB laptop. Gemma passed 1 billion cumulative downloads in August 2026.

**When to use it:** Self-hosted deployments, cost-sensitive applications, privacy-sensitive workloads where data cannot leave your infrastructure. E2B and E4B for edge and on-device inference.

**API access:** Hugging Face, Ollama, self-hosted via vLLM, Gemini Enterprise Agent Platform. Gemma is free of charge on the Gemini API across all tiers.

### Gemma 3 (previous generation, superseded by Gemma 4)

**Sizes:** 1B, 4B, 12B, 27B parameters. **Context:** Up to 128K tokens. **License:** Gemma Terms of Use - *not* Apache 2.0, despite how often it is described that way.

Google's prior open-weight family, still documented on Google's Gemma docs as a prior generation rather than withdrawn.

**When to use it today:** Gemma 4 supersedes it at every size and, more importantly, under a materially more permissive licence. If a procurement review previously stalled on the Gemma Terms of Use, Gemma 4 under Apache 2.0 is the answer. This entry is kept for deployments still pinned to Gemma 3.

### Other current Google models worth knowing

The Gemini API catalogue is much wider than the text tiers: **Nano Banana Pro** (`gemini-3-pro-image`), **Nano Banana 2** (`gemini-3.1-flash-image`) and Nano Banana 2 Lite for image generation, with **Imagen 4 shut down on 17 August 2026** (replacement `gemini-3.1-flash-image`); **Gemini 3.5 Transcribe** and **3.5 Transcribe Live** for speech-to-text (GA 26 August 2026); Gemini 3.8 Live and 3.8 Flash TTS (GA, above) and Gemini 3.5 Live Translate; Gemini Deep Research and Deep Research Max; Gemini Embedding 2; Gemini Robotics ER 2; Veo 3.1 and Veo 3.1 Lite; and the Lyria music models, with **Lyria 3.5** (`lyria-3.5`) GA on 3 September 2026. The coding agent **Google Antigravity** moved to `antigravity-preview-09-2026` on 17 September 2026, and the `antigravity-preview-05-2026` ID shuts down on 5 October 2026. Further out, `gemini-3.1-flash-lite` has a published shutdown of 7 May 2027.

**Consumer tiers**, restructured at I/O on 19 May 2026: a free tier, Google AI Plus at $4.99/month with 400 GB (cut from $7.99/200 GB on 8 June 2026), Google AI Pro at $19.99/month with 5 TB, and Google AI Ultra at $99.99 and $199.99/month - the top level cut from $249.99 at I/O, with a new $99.99 level added below it. Google's own I/O post states the two Ultra prices but not the Plus and Pro figures, which rest on multiple agreeing secondary sources. Deep Think is Ultra only; Gemini 3.8 Flash and 3.1 Pro in the app are Pro and Ultra.

---

## Meta: Muse Spark, Muse Glimmer, and Llama

Meta's lineup changed more than any other vendor's in 2026, and the change is easy to miss because the Llama brand is still everywhere in the ecosystem. **Llama is no longer Meta's frontier line, and it is no longer Meta's open-weight line either.**

Since 8 April 2026, Meta's flagship and assistant model has been **Muse Spark**, a proprietary, closed-weight family from Meta Superintelligence Labs under Alexandr Wang. Since 10 August 2026, Meta's active open-weight model has been **Muse Glimmer**, a 30B dense multimodal model under Apache 2.0 - not a Llama. Llama's newest release remains Llama 4 Scout and Maverick from 5 April 2025; **Meta shipped no new Llama model in 2026**. There is no Llama 4.5 and no Llama 5, whatever content farms claim, and Llama 4 Behemoth was previewed in April 2025, delayed, and never shipped, with no formal cancellation and no timeline.

Meta also now sells a closed commercial API. The **Meta Model API** launched with Muse Spark 1.1 on 9 July 2026, is OpenAI-compatible, and carries a genuinely novel pricing structure described in the Muse Spark entry below. Meta retired its own hosted Llama API on 6 July 2026 and now points developers to third-party hosts - so Meta itself no longer serves Llama inference. `llama.com` 301-redirects to `developer.meta.com/ai/`, where Llama 4 and Llama 3 sit as two entries among the Muse models.

### Muse Spark 1.3

**Released:** 2 September 2026. **Context:** 1,000,000 tokens. **Weights:** proprietary, closed.

Meta's current flagship. Multimodal input (text, image, video; some listings also report audio, which is inconsistent across sources) with text output. It powers Meta AI across Meta's apps and the new Muse consumer agent, and is replacing Llama 4 as the assistant on Ray-Ban Meta and Oakley Meta glasses in the US and Canada - Meta's stated justification being that Muse Spark matches Llama 4 Maverick's performance at roughly one tenth the compute. Meta Ray-Ban Display was still running a custom Llama 4 as of the latest reporting.

**Pricing - and the distinctive part:** the standard endpoint is $1.25 input / $4.25 output per MTok. The **Contributor endpoint is $0.10 / $0.20 per MTok in exchange for permission to train on your prompts and completions**, rate-limited to roughly 100 RPM. That data-for-price trade is the most distinctive commercial fact about Meta's API right now, and it is a procurement decision as much as a cost one. Web Search Grounding is reported at $2.50 per 1,000 queries. Meta's own pricing page could not be fetched to verify these figures; they are consistent across several independent sources but should be confirmed before contracting. Cached-input pricing is genuinely disputed between sources and is not reproduced here.

**Strengths:** 1M context with strong long-context retrieval, aggressive pricing, and Meta's claim of roughly 20% fewer tool calls and 25% fewer tokens than Muse Spark 1.2 on comparable engineering tasks - that efficiency claim is from Meta's own research blog and is the most solidly sourced part of the release. It also asks clarifying questions on ambiguous prompts rather than guessing.

**Weaknesses and honest positioning:** Muse Spark is competitive but not clearly frontier-leading, and third-party rankings do not agree on where it sits - Artificial Analysis places Muse Spark 1.3 (max) at Intelligence Index 48, rank #13 of 202, while llm-stats ranks it #6 of 636 on its own index. Different methodologies; quote either with its source attached, never as "the" ranking. Meta benchmarks it against GPT-5.6 Sol (max) and Claude Opus 5 (max), and secondary analysis of Meta's own scorecard notes Opus 5 (max) wins four of six agent benchmarks while 1.3 leads on long context and coding. Meta's differentiators here are price, context and long-context retrieval - not raw ceiling. The `max` reasoning tier was gated to partners pending safety testing at launch; `xhigh` is generally available.

**When to use it:** Long-context work and agentic pipelines where price per token is a first-order constraint, and where sending prompts to Meta is acceptable. The Contributor tier only where training on your data is genuinely fine.

**API access:** Meta Model API (OpenAI-compatible), Muse Code, OpenRouter. Muse Spark 1.2 (5 August 2026) and 1.1 (9 July 2026) remain listed and available at the same price structure.

### Muse Glimmer

**Released:** 10 August 2026. **Context:** 128,000 tokens (with extension). **Parameters:** 30B dense, multimodal. **License:** Apache 2.0.

This, not Llama, is Meta's current open-weight line - and the licence upgrade is significant: Apache 2.0 rather than the Llama Community License, which resolves the OSI-compatibility objection that has followed Llama since 2023.

Distilled from Muse Spark via logit distillation, then agent-heavy long-context mid-training, supervised fine-tuning, on-policy distillation and RL. Tuned for local always-on agentic workflows rather than chat. Runs on a single 24GB or 32GB GPU, or a Mac, at roughly 4-bit quantisation - under 20GB. Ships with quantized variants and a speculative-decoding drafter.

**When to use it:** Local and self-hosted agentic work, and any deployment that previously wanted Llama but stalled on the community licence. This is Meta's own current recommendation for local agent workloads.

**API access:** Hugging Face (ungated), Ollama, LM Studio, vLLM, OpenRouter.

### Muse Code

**Released:** 5 August 2026. **Status:** beta.

A terminal-based coding agent for macOS and Linux - Meta's direct answer to Claude Code and Codex, and a product category Meta was entirely absent from in mid-2026. It plans changes, writes code and validates results across large repositories, with async background subagents that persist across a session, a local event log giving replay-exact and restart-safe runs, and bundled `/plan`, `/grill` and `/goal` skills. It consumes Meta Model API tokens at Muse Spark rates.

Separately, **Muse**, a consumer personal AI agent, launched on 8 September 2026 in the US on iOS, Android and web, running on Muse Spark on a dedicated VM with a user-visible built-in browser. Meta's own announcement says only that it is free for most uses with subscription plans above that; secondary reporting gives those as $20/month (Power) and $100/month (Maximum). On 15 September 2026 Meta introduced **Meta One**, a subscription that raises AI usage limits across its apps, and at Connect (23-24 September 2026) it announced Muse coming to its AI glasses, a voice mode, third-party connectors (including GitHub, Notion, Box and Walmart) and a pocket device, Muse Charm. None of these changes the model underneath: it is still Muse Spark. Ars Technica reported on 21 September 2026 a since-patched flaw in the Mac version of Muse that let malware on the machine hijack the assistant - a reminder that a highly privileged local agent is an attack surface in its own right.

### On the promised Muse Spark open weights

Zuckerberg and Alexandr Wang publicly pledged on 10 August 2026, alongside the Muse Glimmer launch, that **Muse Spark 1.2 would get an open-weight release "soon"**, with no date. As of 25 September 2026, no Muse Spark weights of any version have been published - Connect 2026 did not change that - and Meta's own Muse Spark 1.3 blog still lists "Muse Spark open weights release" as a roadmap item rather than a shipped thing. Do not plan around it having happened.

### Llama 4 Scout and Maverick (Meta's last Llama release)

**Released:** 5 April 2025. **License:** Llama 4 Community License.

**Scout:** 17B active / 109B total, 16 experts, MoE, natively multimodal, with a claimed 10,000,000-token context window. **Maverick:** 17B active / 400B total, 128 experts, MoE, natively multimodal, 1,000,000-token context.

Both are still downloadable and still real, usable models - Scout's claimed context window is still the largest figure any major vendor advertises. What has changed is the positioning around them: this is a maintenance line, not an advancing one, and Meta no longer hosts inference for it. Meta says Muse Spark matches Maverick's performance at roughly one tenth the compute, which is why Muse Spark is displacing it even on constrained devices like smart glasses.

**When to use it:** Existing Llama deployments and fine-tunes, and cases where Scout's very large advertised context is specifically what you need. For new open-weight work Meta's own current answer is Muse Glimmer.

**API access:** Third-party hosts only - AWS Bedrock, Together AI, Groq, Fireworks AI, Hugging Face, Ollama (self-hosted). Meta's own hosted Llama API was retired on 6 July 2026.

### Llama 4 Behemoth (never released)

Previewed in April 2025 at roughly 288B active / 2T total, delayed from mid-2025, and never shipped. Reported causes are a mid-training MoE-routing change that disrupted expert specialisation and chunked attention creating blind spots at chunk boundaries that hurt long-form reasoning at 2T scale. Meta has never formally cancelled it, which is precisely why stale references can keep describing it as "in training" indefinitely. Treat it as shelved.

### Llama 3.3 70B (previous generation, superseded by Llama 4 and then in role by Muse Glimmer)

**Released:** December 2024. **Context:** 128,000 tokens.

The best open-weight model per parameter count as of its release. Outperforms Llama 3.1 405B on many benchmarks at 70B parameters, due to improved training.

**Strengths:** Strong open-weight quality-to-size ratio for its era. 128K context. Widely available via inference providers, which is why it remains the model most inference platforms benchmark their latency against.

**When to use it today:** Existing deployments and fine-tunes. For new self-hosted work it is two Meta generations behind - Llama 4 Scout and Maverick superseded it in April 2025, and Muse Glimmer superseded it in *role* in August 2026 at 30B with a permissive Apache 2.0 licence and a single-GPU footprint.

**API access:** Together AI, Groq, Fireworks AI, AWS Bedrock, Azure AI, Hugging Face Inference, Ollama (self-hosted).

### Llama 3.2 (Multimodal) (previous generation)

**Sizes:** 1B, 3B (text), 11B, 90B (vision).

The 3.2 family introduced vision capabilities to the Llama line. The 1B and 3B models are optimized for on-device and edge deployment.

**When to use it today:** Still reasonable for very small on-device footprints where 1B-3B is the constraint. Above that, Llama 4 Scout or Muse Glimmer is the current answer.

### Llama 3.1 405B (previous generation)

**Context:** 128,000 tokens.

The largest dense Llama model. Competitive with GPT-4 on many tasks. Requires substantial hardware for self-hosting (8x H100 or equivalent). Available via hosted inference.

**When to use it today:** Research and evaluation, and reproduction of older benchmarks. Llama 4 Maverick supersedes it on capability per unit of compute, and the current open-weight frontier sits well above it - see the Chinese open-weight labs below.

---

## Mistral AI

Mistral produces both open-weight models and commercial APIs. Known for efficient architectures and strong European data residency story.

Mistral's entire lineup turned over between December 2025 and April 2026, and it got substantially *more* open in the process: the current flagship, Mistral Large 3, is a frontier-scale model released under Apache 2.0. Mistral Large 2, Pixtral Large, Mistral 7B and the Mixtral models are all retired from the API, and the separate Magistral (reasoning), Devstral (agentic coding) and Pixtral (vision) lines have been folded into the general-purpose models. Mistral also now distributes a third party's model on its own platform - Z.ai's GLM 5.2, at 1M context, is served on la Plateforme. The company raised a reported €3bn Series D at more than €21bn post-money in early September 2026, and renamed its chat product from Le Chat to **Vibe** in May 2026. It also reportedly acquired Pimento on 22 September 2026, its third acquisition.

Mistral now publishes in **US dollars**, not euros.

### Mistral Large 3 (`mistral-large-3`, v25.12)

**Released:** 2 December 2025. **Context:** 256,000 tokens. **Parameters:** 675B total / 41B active, sparse MoE. **License:** Apache 2.0 (base and instruct).

Mistral's flagship, and the most consequential open-weight release from a Western lab in the period: a frontier-scale flagship given away under Apache 2.0. Multimodal - text and image in, text out - across 40+ languages, trained on roughly 3,000 H200s.

**Pricing:** $0.50 input / $1.50 output per MTok. That is roughly a quarter of what Mistral Large 2 cost, and cheap enough to change where Mistral sits in a routing decision.

**Strengths:** Frontier-scale capability with fully permissive weights. Multilingual, especially French, German, Spanish and Italian. EU data residency for GDPR-sensitive deployments. MoE sparsity keeps inference cost manageable relative to total parameter count.

**When to use it:** European enterprise deployments with data residency requirements; multilingual applications; and self-hosted deployments that need frontier-class quality without a bespoke licence review.

**API access:** Mistral API (`mistral-large-3`), Azure AI, AWS Bedrock, Hugging Face (self-hosted).

### Mistral Medium 3.5 (v26.04)

**Released:** late April 2026 (sources give 28, 29 or 30 April). **Context:** 256,000 tokens. **Parameters:** 128B dense. **License:** "Modified MIT" - see below.

A merged model folding Magistral (reasoning) and Devstral 2 (coding) into one checkpoint, with configurable reasoning effort and multimodal input. $1.50 input / $7.50 output per MTok.

**Licence caution:** weights are published on Hugging Face under a *Modified MIT License* - commercial use is permitted with a carve-out for high-revenue companies. It is not Apache 2.0, and it breaks the clean "either Apache 2.0 or API-only" split that used to describe Mistral's catalogue. Read the licence before assuming Medium 3.5 is as freely usable as Large 3 or Small 4.

### Mistral Small 4 (v26.03)

**Released:** 16 March 2026. **Context:** 256,000 tokens. **Parameters:** 119B total / ~6B active (8B including embedding and output layers), MoE. **License:** Apache 2.0.

The first Mistral model to unify reasoning, vision and agentic coding in one self-hostable checkpoint. $0.15 input / $0.60 output per MTok.

**When to use it:** High-volume workloads where cost matters - classification, extraction, simple reasoning - and self-hosted deployments that want one model instead of three specialised ones.

**API access:** Mistral API, AWS Bedrock, Hugging Face.

### Ministral 3 - 14B / 8B / 3B (v25.12)

**Released:** 2 December 2025. **License:** Apache 2.0.

The small open-weight line that replaces Mistral 7B and Mixtral. Each size ships in base, instruct **and reasoning** variants, and all have image understanding. Pricing is symmetric: 14B $0.20/$0.20, 8B $0.15/$0.15, 3B $0.10/$0.10 per MTok.

**When to use it:** Edge and on-device deployment, high-volume cheap inference, and fine-tuning bases where Apache 2.0 is a requirement.

### Codestral (v25.08)

Mistral's code-specialized model, trained on 80+ programming languages, supporting code completion, fill-in-the-middle, and instruction-following for code tasks. $0.30 input / $0.90 output per MTok.

**Licence note:** current Codestral is a **Premier (closed-weight)** model. The older MNPL-licensed 22B Codestral that many references still describe is superseded.

**When to use it:** Coding assistants, code review automation, IDE integrations.

### Mistral's specialist models

Beyond text: **Mistral OCR 4.1** (`mistral-ocr-4-1`) reached GA on 31 August 2026 at $4 per 1,000 pages (OCR 4.0 and OCR 3 remain); the **Voxtral** audio family covers TTS at $0.016 per 1,000 characters and transcription at $0.003 per audio minute; plus **Shieldstral 1.0**, **Mistral Moderation 2**, **Mistral Embed** ($0.10 input) and **Codestral Embed** ($0.15 input). The Lean theorem-proving model **Leanstral 1.5** (`labs-leanstral-1-5`) **retires on 30 September 2026**, so do not start new work on it.

Licences split across this group and are worth checking individually: Voxtral Small, Voxtral Mini Transcribe Realtime, Shieldstral 1.0 and Leanstral 1.5 are Apache 2.0; Voxtral TTS is CC BY-NC 4.0 (non-commercial); and OCR, Moderation 2, the embedding models and Codestral are Premier/closed.

### Mixtral 8x22B, Mistral Large 2, Mistral Small 3, Pixtral Large (previous generation)

**Mixtral 8x22B** was the MoE open-weight workhorse: 141B total parameters activating 39B per forward pass, Apache 2.0. **Mistral Large 2** (July 2024, 128K) was the flagship commercial model at €2.00/€6.00 per MTok. **Mistral Small 3** was the cost tier at 128K. **Pixtral Large** was the multimodal model, pairing Mistral Large 2's text capability with a purpose-built vision encoder.

**When to use them today:** none of these is still sold on la Plateforme - all four are on Mistral's retired list. Their successors are, respectively, Mistral Small 4 and Ministral 3 (open weights), Mistral Large 3 (flagship, and now four times cheaper), Mistral Small 4 (cost tier), and vision folded natively into Large 3, Medium 3.5, Small 4 and Ministral 3. The Mixtral checkpoints remain downloadable under Apache 2.0 for existing self-hosted deployments; note that Databricks also retired Mixtral 8x7B and Mistral 7B from its Foundation Model APIs, provisioned throughput ending 27 February 2026.

---

## DeepSeek

DeepSeek is a Chinese AI lab that released several models with benchmark performance matching or exceeding much larger Western models.

Three things about DeepSeek changed in 2026 and all three affect how you would use it. First, the API catalogue is now **V4.1-Flash plus V4-Pro only** - `deepseek-chat` and `deepseek-reasoner`, and the V3 and R1 models behind them, were discontinued on 24 July 2026. Second, **there is no separate reasoning model any more**: reasoning is a `reasoning_effort` request parameter on the V4 models (low / high / max on V4-Pro; V4.1-Flash's model card describes a continuous 1-100 scale), not a model choice. There is no R2, and no R2 model ID, model card or technical report exists - Reuters and The Information reported it was held back over performance and a failed Huawei Ascend training run. Third, DeepSeek's flat promotional pricing ended on 16 August 2026 and was replaced with **peak/off-peak billing**, which makes scheduling a first-class cost lever for the first time.

**Peak/off-peak, and why it matters.** Peak hours are 01:00-04:00 and 06:00-10:00 UTC, Monday to Friday; off-peak is 50% of peak. Output pricing roughly quadrupled at peak against the prior flat rate - V4-Flash output went from a flat $0.28 to $1.32 per MTok at peak, and V4-Pro from $0.87 to $3.96 - before the V4.1-Flash release cut the Flash tier again (below). If your workload is batch-shaped, moving it out of those windows halves the bill.

**The 10 September 2026 V4.1-Flash release, and what it did and did not change.** DeepSeek released **DeepSeek-V4.1-Flash** on 10 September 2026, called as `deepseek-flash`. The previous Flash models, **V4-Flash (0731) and V4-Flash-Vision-Exp, are retired**: the `deepseek-v4-flash` and `deepseek-v4-flash-vision-exp` names are still accepted but are **temporarily routed to V4.1-Flash** and billed at the Flash price. **V4-Pro is not affected.** Earlier secondary reports that V4-Pro requests would be routed to V4.1-Flash were wrong: DeepSeek's changelog says it will "continue providing API services for DeepSeek V4 Pro after September 14, 2026, with the billing method remaining unchanged", and `deepseek-v4-pro` still serves V4-Pro-0813 at the prices below. Peak hours still exclude Chinese public holidays, which are now fully off-peak.

### DeepSeek-V4-Pro (`deepseek-v4-pro`, checkpoint V4-Pro-0813)

**GA:** 13 August 2026. **Context:** 1,000,000 tokens. **Max output:** 384,000 tokens. **License:** MIT.

DeepSeek's current flagship, and still fully open-weight at the top tier - the weights are on Hugging Face as `deepseek-ai/DeepSeek-V4-Pro-0813`, listed at 1.7T parameters and roughly 893 GB. Secondary sources put the active parameter count at 48-49B, which is not confirmed on the model card. Text only. Native support for the OpenAI Responses API.

**Pricing per MTok, peak / off-peak:** cache-hit input $0.044 / $0.022; cache-miss input $1.32 / $0.66; output $3.96 / $1.98 - **unchanged** by the September V4.1-Flash release. V4-Pro does not take image input; the Flash tier does.

**When to use it:** Price-sensitive frontier-adjacent work where data sovereignty is not a constraint, and self-hosted deployment where MIT licensing matters. Set `reasoning_effort` to `max` for the work that used to go to R1.

**API access:** DeepSeek API, OpenRouter, self-hosted from Hugging Face.

### DeepSeek-V4.1-Flash (`deepseek-flash`)

**Released:** 10 September 2026. **Context:** 1,000,000 tokens. **Max output:** 384,000 tokens. **Parameters:** 552B MoE backbone, activating **8B per token in prefill and 16B in decode**, plus a 196B "Engram" conditional-memory table accessed by token lookup; 1 shared and 384 routed experts per layer, 6 routed experts active. **License:** MIT, weights on Hugging Face as `deepseek-ai/DeepSeek-V4.1-Flash`.

The volume tier, and DeepSeek's first model on a new architecture family it says is built for "a higher capability ceiling, faster inference, higher throughput, and scaling to larger models". It is **natively multimodal** - image and text in, text out - which folds the experimental vision model into the mainline Flash tier. Architecturally it is a Causal Encoder-Decoder (a 20-layer causal encoder feeding a 20-layer decoder) with CSA2 sparse attention and an FP4 KV cache that DeepSeek puts at roughly **a quarter of V4-Flash's KV footprint** (890 bytes per token). Trained on 45T tokens. Thinking and non-thinking modes are both supported (thinking by default), with a continuous `reasoning_effort` from 1 to 100 per the model card. There is no Jinja chat template; DeepSeek ships a reference encoder and the **`deepseek-recipe`** toolkit for the prompt format instead, which matters if you self-host.

**Pricing per MTok, peak / off-peak:** cache-hit input **$0.006 / $0.003**; cache-miss input **$0.30 / $0.15**; output **$1.20 / $0.60**. Against V4-Flash that is a 57% cut on cache hits, 32% on cache misses and 9% on output.

**Strengths:** Very low price per token at 1M context, vision in the base model, and a small active-parameter count during prefill that suits input-heavy agent workloads. DeepSeek's own launch benchmarks include GPQA Diamond 90.9, Codeforces 3471 and Terminal-Bench 2.1 90.6 - vendor-reported, at maximum effort.

**When to use it:** High-volume and agentic work where data sovereignty permits a Chinese provider, and self-hosting where MIT licensing matters. Migrate any `deepseek-v4-flash` or `deepseek-v4-flash-vision-exp` calls to `deepseek-flash` now: the legacy routing is described as temporary. See [DeepSeek-V4.1-Flash](/news/deepseek-v4-1-flash/).

**API access:** DeepSeek API (`deepseek-flash`), Alibaba Cloud Model Studio (`deepseek-v4.1-flash`, from 13 September 2026), Fireworks AI (14 September 2026), NVIDIA's NVFP4 quantization (`nvidia/DeepSeek-V4.1-Flash-NVFP4`, 16 September 2026), self-hosted from Hugging Face.

### DeepSeek-V4-Flash and V4-Flash-Vision-Exp (retired, superseded by V4.1-Flash)

**V4-Flash** (`deepseek-v4-flash`, checkpoint V4-Flash-0731, released 31 July 2026, 304B, 1M context) was the volume tier until 10 September 2026, at $0.014 / $0.007 cache-hit, $0.44 / $0.22 cache-miss and $1.32 / $0.66 output per MTok (peak / off-peak). **V4-Flash-Vision-Exp** (`deepseek-v4-flash-vision-exp`, API from 21 August 2026, 305B) was DeepSeek's first multimodal model, explicitly experimental and priced identically. Both are **retired from the DeepSeek API**; their names are temporarily routed to V4.1-Flash at V4.1-Flash prices, so existing code keeps working but is no longer calling the model it names. The MIT weights, and the `DeepSeek-V4-Flash-DSpark` speculative-decoding variant, remain on Hugging Face for self-hosting.

### DeepSeek Harness (`dsh`)

**Released:** 13 August 2026 (v0.1 developer preview). **License:** MIT.

Not a model: DeepSeek's open-source agent runtime, built on the Cordis framework on an "everything is a plugin" model. It drew roughly 95k GitHub stars within two days. Worth knowing because the standard criticism of DeepSeek - capable models but no agentic tooling around them - is now weaker than it was.

### DeepSeek V3 (previous generation, superseded by DeepSeek-V4.1-Flash)

**Released:** December 2024. **Context:** 128,000 tokens. **Parameters:** 671B MoE (37B active).

Trained at significantly lower cost than comparable Western models due to architectural and infrastructure innovations. Benchmark performance matches GPT-4o on many tasks.

**Strengths:** Exceptional price-to-performance on the API. Strong coding, mathematics, and reasoning. Open weights available.

**Weaknesses:** Data privacy concerns for enterprise use (Chinese ownership). Safety filtering behavior may differ from Western models. Knowledge cutoff may lag.

**When to use it today:** Self-hosted deployments already built on the V3 weights, and benchmark reproduction. It is **retired from the DeepSeek API** - as are V3.1, V3.2 and V3.2-Speciale - so `deepseek-chat` calls will fail. The current equivalent is `deepseek-flash` (V4.1-Flash) at 1M context, or `deepseek-v4-pro` if you want the top tier. The weights remain downloadable under MIT.

**API access (historical):** DeepSeek API until 24 July 2026; open weights still available via Together AI, Fireworks AI and self-hosting.

### DeepSeek R1 (previous generation, superseded by `reasoning_effort` on V4)

**Released:** January 2025.

DeepSeek's reasoning model. Competitive with OpenAI o1 on mathematics and coding benchmarks. Released open-weight with MIT license - one of the most permissive licenses for a reasoning model, and the release that did most to normalise open reasoning models.

**When to use it today:** Self-hosted reasoning where you already run the R1 weights. On the DeepSeek API there is nothing to migrate *to* as a model - the `deepseek-reasoner` alias was discontinued on 24 July 2026 and reasoning is now a `reasoning_effort` parameter set high on `deepseek-v4-pro` or `deepseek-flash`. **There is no DeepSeek R2**, despite persistent reporting that one was planned.

**API access (historical):** DeepSeek API until 24 July 2026; open weights still available via Groq, Together AI and self-hosting.

---

## Alibaba: Qwen

Alibaba's Qwen (Tongyi Qianwen) family covers general-purpose, code, math, and vision tasks. Strong multilingual with excellent Chinese-language capability.

The current generation is **Qwen3.8**, and two structural changes matter more than the version bump. First, the separate `-VL` and `-Coder` lines are gone: current Qwen base models are **natively multimodal**, so there is no distinct vision or coding Qwen to go looking for. Second, and more consequentially for procurement, **Apache 2.0 is no longer Qwen's default licence at the flagship tier** - of the current generation only Qwen3.8-27B is Apache 2.0, and the two larger open releases ship under bespoke, revenue-triggered licences. Alibaba also now runs two official API platforms: Alibaba Cloud Model Studio and **QwenCloud** (launched 26 May 2026 in Singapore), which is OpenAI- and Anthropic-protocol compatible, agent-oriented, and sold on subscription "Token Plan" pricing from around $6/month.

Model Studio's current text-generation line is `qwen3.8-max`, `qwen3.7-plus` and `qwen3.8-flash` - note the version skew, with Plus still on 3.7 while Max and Flash are on 3.8. `qwen3.7-max` is no longer listed. Watch snapshot pinning too: the `qwen3.8-max` endpoint was automatically moved to the `qwen3.8-max-0902` snapshot on 5 September 2026 with billing unchanged, and Alibaba gives snapshot models 30 days' sunset notice against three months for mainline models.

### Qwen3.8-Max (`qwen3.8-max`)

**Announced:** 3 August 2026; current snapshot `qwen3.8-max-0902`. **Context:** 1,000,000 tokens (API). **Parameters:** 2.4T total / ~95B active, MoE.

Alibaba's current top tier. Natively multimodal - text, image and video in, text out. The **`qwen3.8-max-0902`** snapshot (alias `qwen3.8-max-2026-09-02`), released 2 September 2026, is an upgraded Max with improvements Alibaba lists in coding, agents and vision; it is API-only, and the open-weight checkpoint below is not the same model.

**Pricing:** reported at $2.00 input / $6.00 output per MTok, flat across the full 1M context, with a roughly 90% prompt-cache discount and 50% batch discount. Alibaba's price tables do not render to automated fetching, so these figures are secondary-sourced; verify in the Model Studio console before budgeting.

**API access:** Alibaba Cloud Model Studio, QwenCloud.

### Qwen3.8-2.4T-A95B (open-weight Max checkpoint)

**Released:** 12 August 2026. **Context:** 262,144 native, extendable to ~1,010,000. **License:** bespoke "Qwen3.8-Max License" - **not Apache 2.0**.

The first time a Qwen Max-class model has been downloadable, and a real reversal of Alibaba's closed-flagship posture. But it is not the same product as the hosted Max: the checkpoint is **text-only** where the API model takes image and video, its native context is 262K rather than 1M, thinking mode is forced on, and it ships without built-in tools.

**Licence terms that matter:** the model name must be displayed prominently above 100M monthly active users or US$20M monthly revenue; a separate licence is required for Model-as-a-Service or AI-assistant businesses above US$50M revenue over any consecutive 12 months; purely internal use with no third-party exposure is exempt.

**API access:** Hugging Face (`Qwen/Qwen3.8-2.4T-A95B`), ModelScope, self-hosted.

### Qwen3.8-27B

**Released:** 14 August 2026. **Context:** 262,144 native, extensible to ~1,000,000 via YaRN. **Parameters:** ~27B dense. **License:** Apache 2.0.

The largest current Qwen release a normal team can actually self-host, and **the only current flagship-generation Qwen model under a standard permissive licence**. Natively vision-language: text, image and video.

**When to use it:** Chinese-language applications, self-hosted deployments, and cost-efficient coding assistance - all the jobs Qwen 2.5 72B, Qwen 2.5 Coder and Qwen VL used to be split across. If your procurement process requires an OSI-approved licence, this is the Qwen you can use.

**API access:** Hugging Face, ModelScope, Ollama, self-hosted via vLLM.

### Qwen3.8-Flash-Next

**Released:** 26 August 2026. **Context:** 262,144 native, extensible to ~1,000,000. **License:** Qwen Community License 1.0 - **not Apache 2.0**.

Described by Qwen as an experimental architecture preview of Qwen4: a 125B backbone plus a 51B N-gram embedding table and a 4B multi-token-prediction module (Hugging Face lists the repo at 180B), with roughly 6B active per token. Multimodal across text, image and video. The licence carries the same 100M MAU / $20M monthly revenue attribution trigger and Model-as-a-Service separate-licence condition as the Max checkpoint.

**Do not confuse it with the API model `qwen3.8-flash`.** The production **Qwen3.8-Flash** (`qwen3.8-flash`, Model Studio from 26 August 2026) is a separate, API-only multimodal model with a 1M context, quoted by Qwen at $0.16 input / $0.47 output per MTok on the QwenCloud API. Flash-Next is the open-weight architecture preview; `qwen3.8-flash` is what you call in production.

### Qwen3.8-Omni-Flash and other September 2026 Qwen releases

**`qwen3.8-omni-flash`** (Model Studio, 17 September 2026) takes text, image, audio and video in and returns text, with thinking and non-thinking modes; **`qwen3.8-omni-flash-realtime`** (21 September 2026) is the real-time audio-video variant and can call remote MCP tools. Alongside them Model Studio added `qwen-audio-3.1-realtime-plus` (duplex speech, 262,144-token context, 20 September 2026). All are API models.

On the downloadable-weights side, **Qwen-Image-2.1** (Hugging Face, 14 September 2026) unifies text-to-image generation and image editing in one model with a 7B diffusion-transformer generator, RGBA (transparent) output and up to 10 reference images. Hugging Face lists the licence only as "other"; the LICENSE file is the **Qwen Research License Agreement**, which permits research and evaluation only - **commercial use needs a separate licence from Alibaba**. Treat it as a research release, not commercially usable open weights.

### Qwen 2.5 72B, QwQ-32B, Qwen 2.5 Coder, Qwen VL (previous generation)

**Qwen 2.5 72B** (128K, Apache 2.0) was Alibaba's best general-purpose open-weight model. **QwQ-32B** was its reasoning model, trained similarly to DeepSeek R1. **Qwen 2.5 Coder** was the code-specialised variant across 1.5B to 72B, and **Qwen VL** the vision-language line.

**When to use them today:** existing self-hosted deployments and fine-tunes only. Alibaba has shipped Qwen3.5 (February 2026), Qwen3.6 (April 2026), Qwen3.7 (May 2026) and Qwen3.8 (August 2026) since. QwQ's role is now filled by thinking mode inside the Qwen3.x models rather than a separate checkpoint, and the Coder and VL lines have been folded into natively multimodal base models. The nearest current equivalent for a self-hosted deployment is **Qwen3.8-27B**, which is also the one that keeps the Apache 2.0 licence these models had.

**API access (historical):** Alibaba Cloud, Hugging Face, Together AI, AWS Bedrock, self-hosted.

---

## Moonshot, Z.ai, MiniMax, Xiaomi and Tencent

Three more Chinese labs shipped frontier-scale models with published weights between June and August 2026, and two large consumer-tech companies - Xiaomi and Tencent - joined them at the trillion-parameter-class frontier in late August and September. Together with DeepSeek and Qwen they now account for most of the open-weight frontier, and any 2026 landscape that stops at DeepSeek and Qwen is missing roughly half of it.

**Read the licences.** The single most actionable change across all five labs is that bespoke, revenue-gated licences became the norm in July and August 2026 - the Qwen3.8-Max License, Qwen Community License 1.0, the Kimi K3 License, the GLM-5.3 License and the MiniMax Community License all carry revenue or user-count triggers. Among these five labs only three current releases are standard permissive: DeepSeek's V4 and V4.1 line (MIT), Qwen3.8-27B (Apache 2.0) and GLM-5.3-Flash (MIT). The two newcomers below cut the other way - Xiaomi's MiMo-V2.6 is MIT and Tencent's Hy4-preview Apache 2.0. "Open weights" can no longer be read as a synonym for "permissive" when clearing procurement.

### Kimi K3 (Moonshot AI)

**Announced:** 16 July 2026; **weights published:** 27 July 2026. **Context:** 1,048,576 tokens. **Parameters:** 2.8T total / 104B active MoE, 16 of 896 experts per token ("Stable LatentMoE"). **License:** bespoke "Kimi K3 License".

Native text, image and video. Weights are on Hugging Face as `moonshotai/Kimi-K3` with a native MXFP4 checkpoint. Reported as third on the Artificial Analysis Intelligence Index, making it one of the strongest open-weight models available.

**Pricing:** $0.30 per MTok cache-hit input, $3.00 input, $15.00 output. Moonshot's pricing pages did not render figures to verification, so these are secondary-sourced but consistent across sources.

**Licence caution:** Moonshot pre-announced a "Modified MIT" licence and then shipped something else. The Kimi K3 License requires a separate commercial agreement for Model-as-a-Service businesses above US$20M revenue over any consecutive 12 months, and "Kimi K3" attribution above 100M MAU or US$20M monthly revenue. Internal use is exempt.

**API access:** Kimi API - note the developer platform moved from `platform.moonshot.ai` to `platform.kimi.ai`, which the old host now 301-redirects to - plus Amazon Bedrock (GA 18 September 2026, 1M context, with explicit prompt caching), Alibaba Cloud Model Studio (from 19 August 2026) and Hugging Face for self-hosting.

### GLM-5.3 and GLM-5.3-Flash (Z.ai / Zhipu)

**GLM-5.3:** API 14 August 2026, **weights published 28 August 2026** after a deliberate two-week hold. **Context:** 1,000,000 tokens. **Parameters:** 753B total, MoE, text-only. **License:** bespoke "GLM-5.3 License". **Pricing:** $1.40 input / $4.40 output per MTok.

A post-training-only upgrade over GLM-5.2 - the base model was not retrained. The licence is MIT-style with one addition: Model-as-a-Service operators above US$10bn revenue over any consecutive 12 months must pass a Z.ai security review before commercial use.

**The weights delay is the story.** Z.ai stated it withheld the weights because cyber capability improved faster than expected during post-training scaling. This is believed to be the first publicly stated offensive-cyber weights delay by a major open-weight lab, and it introduces a scheduling risk that did not previously exist: a published API date no longer implies a weights date.

**GLM-5.3-Flash:** weights published 26 August 2026. **Context:** ~300,000 tokens. **Parameters:** 320B total / 18B active. **License:** MIT. **Pricing:** $0.15 input / $0.50 output per MTok, after a launch discount of around $0.075/$0.25 reported through 9 September 2026. Described on its model card as the first natively multimodal model in the GLM-5 series. **This is the permissively licensed one of the pair** - the 753B GLM-5.3 is not.

Z.ai also ships **ZCode**, a GLM-coupled agentic coding environment first released 2 July 2026, and keeps GLM-4.7-Flash and GLM-4.5-Flash free on its API. GLM-5.2 remains listed and priced at $1.40/$4.40, and is the model Mistral resells on la Plateforme.

### MiniMax-M3 and MiniMax-H3

**MiniMax-M3:** released 1 June 2026 per MiniMax's own release notes (some sources say 31 May). **Context:** 1,048,576 tokens, max output reported at 262,144. **Parameters:** ~428B total / ~23B active MoE, using MiniMax Sparse Attention. Native text, image and video input. Still MiniMax's flagship as of 25 September 2026.

**Pricing:** reported around $0.23-0.30 per MTok input and $0.96-1.20 output, cached input around $0.06, with a higher long-context rate above 512K input tokens. MiniMax's own price page returned a 404 and the secondary sources do not agree precisely, so treat these as indicative only and check before committing.

**License:** MINIMAX COMMUNITY LICENSE - not OSI-approved. It requires "Built with MiniMax M3" attribution for commercial use; organisations at or above US$20M annual revenue need prior written authorisation from MiniMax, and below that a one-time email notice; plus acceptable-use restrictions including no military use.

**MiniMax-H3:** released 31 July 2026. An omni-modal generative system - text, image, video and audio in, synchronised video with stereo audio out - at 33B parameters per its model card. Its licence adds something the others do not: **a separate application process for users in the USA, EU, UK and South Korea**, which is a geographic gate rather than a revenue one.

### Xiaomi MiMo-V2.6

**Released:** 21 September 2026 (Hugging Face). **License:** MIT. **Context:** 1,000,000 tokens.

Xiaomi's MiMo team published three checkpoints: **MiMo-V2.6-Pro-RL** at **1.02T total / 42B active** (384 routed experts, 8 active), **MiMo-V2.6-Flash-RL** at roughly 310B total / 15B active (the model card rounds it to 309B), and a small **MiMo-V2.6-Distill-Qwen-9B**. The Pro model is **natively omnimodal** - text, image, video and audio in one model - with a 681M-parameter vision encoder and a hybrid sliding-window/global attention backbone. That makes it the largest MIT-licensed omnimodal model in this article, and one of very few trillion-parameter-class releases under a standard permissive licence.

**When to use it:** Evaluate the Flash-RL checkpoint for self-hosted multimodal agent work where MIT licensing matters; the Pro model sits in the same "exceeds one node" band as Kimi K3 and DeepSeek-V4-Pro. It is new enough that independent benchmarks and hosted-API availability are still thin, so treat the model card's results as vendor-reported.

**API access:** Hugging Face (`XiaomiMiMo/MiMo-V2.6-Pro-RL`, `XiaomiMiMo/MiMo-V2.6-Flash-RL`), self-hosted.

### Tencent Hy4-preview

**Released:** 27 August 2026 (Hugging Face). **License:** Apache 2.0. **Context:** 1,000,000 tokens. **Parameters:** 770B total / 49B active MoE (256 routed experts plus 1 shared, 8 active), plus a built-in multi-token-prediction layer for speculative decoding.

Tencent's Hy team positions the preview at the open-source frontier and is candid that it ships "with known issues", including reasoning longer than necessary and over-verifying its own work. Text generation, with reasoning on by default (`high`) and a `no_think` option. Together with MiMo-V2.6, it is the other large new open-weight release under a standard permissive licence. See [open-weight models, September 2026](/news/open-weight-models-september-2026/) for the wider round-up.

**When to use it:** Evaluation and research; the "preview" label and Tencent's own caveats argue against a production dependency yet.

**API access:** Hugging Face (`tencent/Hy4-preview`), self-hosted.

### A note on running these at all

The open-weight frontier has moved beyond what most teams can self-host. GLM-5.3 at 753B is roughly 756 GB in FP8 and exceeds an 8x80GB node; DeepSeek-V4-Pro-0813 is roughly 893 GB; Qwen3.8-2.4T-A95B is 2.4T total. The models a team can realistically run in-house are the 27B-to-320B class - which is precisely the band where Apache 2.0 and MIT survived.

---

## xAI / SpaceXAI: Grok

Grok is developed by the company formerly known as xAI. **SpaceX acquired xAI in an all-stock deal that closed on 2 February 2026** - xAI valued at roughly $250bn against SpaceX's roughly $1tn, for a combined ~$1.25tn - making it a wholly owned subsidiary, and the entity rebranded to **SpaceXAI** in July 2026. SpaceX itself listed on Nasdaq in June 2026. Product naming is unchanged: Grok is still Grok, the API endpoint is still `api.x.ai/v1`, and the developer docs still say "xAI", but `x.ai` pages now carry "© 2026 SpaceXAI LLC". For contracting and due diligence, the counterparty is a SpaceX subsidiary, not an independent company.

Grok remains integrated into X and available via API. Grok 5 has not shipped as of 25 September 2026.

### Grok 4.7 (`grok-4.7`)

**Released:** 21 September 2026 (reaching GitHub Copilot the same day). **Context:** 500,000 tokens. **Knowledge cutoff:** May 2026. **Weights:** proprietary.

The current flagship, described by xAI as "SpaceXAI's frontier model built for coding, agentic tasks, and knowledge work". Text and image in, text out, with no fixed text output limit. Reasoning effort is low, medium, high (default) or xhigh, and the Responses API returns reasoning in encrypted form. Tools: function calling, web search, X search and code execution.

**Pricing:** $2.00 input / $0.50 cached / $6.00 output per MTok below 200,000 prompt tokens; $4.00 / $1.00 / $12.00 at or above 200,000 - the same structure and rates as Grok 4.6, so the upgrade is price-neutral. xAI strongly recommends setting a `prompt_cache_key` (or the `x-grok-conv-id` header on Chat Completions): without it, requests often land on a cache-cold server and pay full input price. A faster **Grok 4.7 Fast** (the same model on faster infrastructure, at 2x rates: $4.00 / $1.00 cached / $12.00 below 200,000 prompt tokens and $6.00 / $1.50 / $18.00 above) is available only in Cursor and Grok Build, not on the public xAI API. The US regional endpoint adds 10%.

**Strengths:** Access to X real-time data when integrated with the X platform. Strong STEM reasoning. Competitive coding and agentic performance. Less restricted content filtering than some competitors.

**Weaknesses:** Smaller model ecosystem and tooling than OpenAI or Anthropic. Data provenance concerns from X training data. Less enterprise testing than GPT or Claude. The 200K price step doubles the rate rather than tapering.

**When to use it:** Applications integrated with X data or real-time social content. Long-horizon coding and agent work. Less filtered content generation for appropriate use cases.

**API access:** xAI/SpaceXAI API (`grok-4.7`, Responses API and Chat Completions), OpenRouter, Vercel, Cloudflare, GitHub Copilot. See [Grok 4.7](/news/grok-4-7/).

### Grok 4.6 (`grok-4.6`) (previous generation, superseded by Grok 4.7)

**Released:** 12 August 2026. **Context:** 500,000 tokens. **Knowledge cutoff:** reported as 1 February 2026, from secondary sources only.

The flagship from August to September 2026, targeting long-horizon agents, multi-step coding and self-verification, at the same $2/$6 and $4/$12 tiered pricing as Grok 4.7. Still listed and served, and it reached GA in Google's Vertex AI Model Garden on 18 September 2026 - so on Google Cloud it is the Grok you can actually buy today. GitHub Copilot is moving Grok 4.5 users onto Grok 4.6 on 19 October 2026.

**API access:** xAI/SpaceXAI API (`grok-4.6`), Vertex AI Model Garden.

### Grok 4.5 and Grok 4.3

**Grok 4.5** (`grok-4.5`) is the flagship before 4.6, at the same 500,000-token context and the same $2/$6 and $4/$12 tiered pricing. Its release date is disputed: x.ai's own page for it is stamped 16 July 2026, while some reporting - including this site's own earlier news coverage - gives 8 July 2026.

**Grok 4.3** (`grok-4.3`) is the counter-intuitive one and worth knowing about: it is *older* than 4.5, 4.6 and 4.7 but has a **larger 1,000,000-token context window**, and it is cheaper, at $1.25 / $2.50 per MTok below 200K prompt tokens and $2.50 / $5.00 above. If context size is your binding constraint rather than raw capability, the newest Grok is not the right Grok. The catalogue also lists `grok-4.20-0309` reasoning, non-reasoning and multi-agent variants at 1M context, and `grok-build-0.1` for coding at 256K context and $1.00 / $2.00. Outside text, xAI shipped `grok-voice-transcribe-2.0` in September 2026, and `grok-imagine-image-quality` retires on 2 November 2026 in favour of `grok-imagine-image-2.0`.

### Grok 3 and Grok 3 mini (previous generation, superseded by Grok 4.7)

**Context:** 131,072 tokens. Grok 3 was xAI's flagship through 2025, with Grok 3 mini as the cost-sensitive variant.

**When to use them today:** neither is listed in the current xAI/SpaceXAI model catalogue. The current equivalents are Grok 4.7 for capability and Grok 4.3 where a larger context window or lower price matters more. This entry is kept for comparison against older evaluations.

---

## Cohere: Command

Cohere focuses on enterprise RAG and search use cases. Models are optimized for retrieval-augmented generation rather than general-purpose chat.

Cohere's long-standing position - private deployment yes, permissive open weights no - **no longer holds**. In 2026 it shipped two Apache 2.0 models, and the first of them is its flagship.

### Command A+ (`command-a-plus-05-2026`)

**Released:** 20 May 2026. **Context:** 128,000 input, 64,000 max generation. **Parameters:** 218B total / 25B active, MoE. **License:** Apache 2.0.

Cohere's current flagship, its first Mixture-of-Experts model, and **its first model under a full Apache 2.0 licence**. Covers 48 languages including all official EU languages, and is explicitly positioned for sovereign and air-gapped deployment.

**Strengths:** Native RAG with grounded citations. Downloadable weights under an OSI-approved licence, which is the combination sovereign and regulated buyers have been asking Cohere for. MoE sparsity keeps serving cost proportionate.

**Note on a documentation conflict:** Cohere's own docs model table renders an "open weights: No" column for Command A+, which contradicts Cohere's launch blog, the CohereLabs Hugging Face repository and independent coverage. The column appears to track API hosting rather than weight availability; the Apache 2.0 release is well attested, but confirm with Cohere before making it a contractual assumption.

**When to use it:** Enterprise RAG where citation accuracy and multilingual support matter; legal, financial and compliance document analysis; and sovereign deployments that need the weights on-premises.

**API access:** Cohere API, AWS Bedrock, Azure AI, Hugging Face (self-hosted).

### North Mini Code

**Released:** 9 June 2026 (some sources say 11 June); production model ID rolled out on the Chat V2 API in August 2026. **Context:** 256,000 input, 64,000 output. **Parameters:** 30B MoE / ~3B active. **License:** Apache 2.0.

Cohere's first fully open developer-facing model, purpose-built for agentic software engineering, and small enough to run on a single H100 in FP8.

**When to use it:** Self-hosted agentic coding where you want an Apache 2.0 model from a Western vendor with enterprise support behind it.

### North Small Translate (`north-small-translate-1-0`)

**Released:** 9 September 2026. **Context:** 16,000 tokens. **Parameters:** 218B total / 25B active, MoE. **License:** CC-BY-NC-4.0 (open weights, non-commercial).

A dedicated translation model covering 50+ languages, on the same 218B/25B MoE scale as Command A+. Weights are on Hugging Face as `CohereLabs/North-Small-Translate-1.0` in W4A16, FP8 and BF16, and a free tier is available on the Chat V2 API. Note the licence split: unlike Command A+ and North Mini Code, this one is **non-commercial** as downloaded, so commercial self-hosting needs a Cohere licence; commercial use through Cohere's API is the straightforward route. The short 16K context suits segment- or document-chunk translation rather than whole-book jobs.

### Cohere's supporting lineup

**Command A** (256K) remains available alongside `command-a-reasoning-08-2025` (256K), `command-a-vision-07-2025` (128K), `command-a-translate-08-2025` (8K) and Command R7B (128K). For retrieval: **Embed v4.0** (128K) and a rerank line that has split into **`rerank-v4.0-pro` and `rerank-v4.0-fast`** (32K) rather than a single v4.0 model. **Cohere Parse** (`parse-v5.0`, 27 August 2026) is a 2.3B document-to-Markdown model with an 8K context, for turning PDFs and scans into clean input for RAG, and `cohere-transcribe-03-2026` (open source) and `cohere-transcribe-arabic-07-2026` cover speech. The multilingual **Aya** research models continue as `c4ai-aya-expanse-32b`, `c4ai-aya-vision-32b` and the tiny-aya series, which gained 3.35B reasoning variants (`tiny-aya-en-thinker`, `tiny-aya-l2-thinker`) and a 32K-context `tiny-aya-base-32K` on Hugging Face in early September 2026, all CC-BY-NC.

### Command R+ (previous generation, superseded by Command A+)

**Context:** 128,000 tokens.

Cohere's flagship retrieval-focused model through 2024 and 2025, with native RAG citations and strong multilingual performance across 100+ languages.

**When to use it today:** existing integrations only. `command-r-plus-04-2024`, `command-r-03-2024`, `command`, `command-light` and the `command-r` / `command-r-plus` aliases were all deprecated on 15 September 2025, and the current flagship is Command A+ - which is both more capable and, unusually for an upgrade path, downloadable. Cohere also retired `c4ai-aya-expanse-8b` and `c4ai-aya-vision-8b` on 4 April 2026 in favour of the 32B versions.

**API access:** Cohere API, AWS Bedrock, Azure AI.

---

## Amazon: Nova

Amazon's own model family, available exclusively on Amazon Bedrock. Designed for tight AWS ecosystem integration.

The current generation is **Nova 2**, announced at re:Invent on 2 December 2025 - and the important detail is how little of it actually reached general availability. **Nova 2 Lite is the only GA Nova 2 understanding model.** Nova 2 Pro and Nova 2 Omni were announced in preview on the same day and, nine months later, are still labelled "(Preview)" on AWS's live Bedrock pricing page, have no Bedrock model cards, and do not appear in the Nova 2 user guide's model table. Access to both runs through Nova Forge customership or an AWS account team request. Treat neither as production-available.

**September 2026 is a retirement month for Nova 1.** Nova Premier and Nova Sonic v1 **reached End-of-Life on 14 September 2026** (Legacy since 13 March 2026) and no longer serve requests. Nova Canvas, Nova Reel v1:0 and Nova Reel v1:1 reach End-of-Life on **30 September 2026** (Legacy since 30 March 2026). After EOL the model IDs stop serving requests in all regions, with no automatic migration. Nova Micro, Nova Lite and Nova Pro remain Active with no EOL date, but have been dropped from AWS's own Nova models marketing page, which now shows only Nova 2 Lite, Nova 2 Sonic and Nova Multimodal Embeddings.

**Amazon has no first-party replacement for its creative models.** There is no Nova 2 image or video model. With Canvas and both Reel versions retiring on 30 September 2026, the Bedrock-native successors are third-party - Stability AI for images, Luma Ray v2 for video - or Nova 2 Omni's image output, which is preview-gated. Any guidance that tells you to migrate to "a newer Nova Reel or Nova Canvas release" is pointing at something that does not exist.

Also note a lifecycle policy change: under Bedrock's new model lifecycle policy, models launched on or after **7 September 2026** move through **Active → Legacy → EOL**, and their model cards carry an explicit "EOL no sooner than" date and a stated Legacy period of either 6 months or 45 days. Bedrock's tokens-per-day limit is now also a **cross-model, per-account quota** rather than a per-model one, which matters if several teams share an account. Every Nova model predates that and stays on the legacy policy, which since February 2026 adds a public extended-access phase - after at least 3 months in Legacy, continued use is allowed until EOL but at provider-set, potentially higher prices.

**Bedrock's third-party catalogue moved faster than Nova in September.** Claude Opus 5.5 (`anthropic.claude-opus-5-5`, including GovCloud), GPT-6 Sol and GPT-6 Luna (both GA with 1M context) arrived on 22 September 2026, GPT-6 Astra earlier in the month, and Kimi K3 reached GA on 18 September 2026 with 1M context and explicit prompt caching. For most new Bedrock workloads the choice is now among these rather than within Nova.

### Nova 2 Lite (`amazon.nova-2-lite-v1:0`)

**GA:** 2 December 2025. **Context:** 1,000,000 tokens. **Max output:** 64,000 tokens. **Knowledge cutoff:** October 2025. **Modalities:** Text, image, video, document in; text out.

The current default Nova workhorse and the only GA Nova 2 understanding model. Extended thinking is available at three budget levels (low, medium, high) and is **off by default**. Built-in tools cover web grounding with cited retrieval and a code interpreter, with support for remote MCP tools and client-side tool calling. Supervised fine-tuning and reinforcement fine-tuning are supported on both Bedrock and SageMaker AI.

**Pricing (us-east-1, Standard tier, per MTok):** $0.30 in / $2.50 out via **global** cross-region inference, or $0.33 / $2.75 via **geo** cross-region or in-region - a 10% premium for narrower routing that explains most of the conflicting Nova figures circulating in third-party trackers. Flex and Batch are $0.15 / $1.25 (global); Priority is $0.525 / $4.375 (global). Cache read is $0.075 per MTok.

**Strengths:** No data egress from AWS. Native integration with Bedrock, S3 and Lambda. Video understanding with temporal reasoning. AWS's own March 2026 migration guide routes Nova 1 Lite, Nova 1 Pro **and Nova Premier** all onto Nova 2 Lite, claiming it beats Premier on multi-step problem-solving at roughly 7x lower cost and up to 5x faster.

**Weaknesses:** It is not available in-region anywhere - you reach it via geo (`us.`, `eu.`, `jp.`) or global cross-region inference across roughly 26 regions, which is a constraint if your residency posture requires single-region inference.

**Lifecycle:** Active, EOL no sooner than 2 December 2026, with at least a 6-month Legacy period after any deprecation notice.

**When to use it:** AWS-native architectures where data residency in AWS matters; multimodal pipelines with video; and any Nova 1 workload, since this is AWS's stated migration target for all of them.

**API access:** Amazon Bedrock (`amazon.nova-2-lite-v1:0` / `global.amazon.nova-2-lite-v1:0`).

### Nova 2 Sonic (`amazon.nova-2-sonic-v1:0`)

**GA:** 2 December 2025. **Context:** 1,000,000 tokens. **Max output:** 64,000 tokens.

A speech-to-speech foundation model for real-time voice: speech and text in, speech and text out, across 7 languages. It uses `InvokeModelWithBidirectionalStream` rather than the Converse or Invoke APIs, so it is not a drop-in for text model code.

**Pricing (us-east-1, per MTok):** speech $3.00 in / $12.00 out; text $0.33 in / $2.75 out.

**Worth knowing:** Nova 2 Sonic has been refreshed twice **in place** since GA, with no API or configuration change required - so the same model ID behaves materially better than at launch. March 2026 added Polly-compatible voices, cut p50 latency by roughly 150 ms and improved 8 kHz telephony turn-taking. May 2026 (deployed 21-28 May) reported 88% fewer speech-generation hallucinations, 52% less speaker drift and 28% fewer critical errors on AWS's internal data sets.

**Regions:** us-east-1, us-west-2, eu-north-1, ap-northeast-1, plus ap-southeast-1, eu-west-2, ap-northeast-2 and eu-central-1 via Amazon Connect.

### Nova Multimodal Embeddings

**GA:** 28 October 2025; AWS GovCloud (US-West) added 12 August 2026.

Amazon's unified embedding model, placing text, documents, images, video and audio into one semantic space, with a synchronous API for near-real-time work and an asynchronous API for large files. $0.135 per MTok on-demand, $0.0675 batch (us-east-1). AWS counts it as part of the Nova 2 generation alongside Nova 2 Lite and Nova 2 Sonic.

### Nova 2 Pro (preview)

**Announced:** 2 December 2025. **Status:** still preview as of 25 September 2026. **Context:** 1,000,000 tokens.

Positioned as the most intelligent Nova for highly complex multistep work - multi-document analysis, video reasoning, software migrations, agentic coding - with the same extended-thinking levels, built-in tools and MCP support as Nova 2 Lite. Early access runs to Amazon Nova Forge customers, otherwise via your AWS account team.

**Pricing is published despite the preview status** (us-east-1, Standard, per MTok): global cross-region $1.25 input - the same rate for text, image, video and audio - and $10.00 output; geo/in-region $1.375 / $11.00; Flex and Batch $0.625 / $5.00; Priority $2.1875 / $17.50.

**When to use it:** not yet in production. Nine months after announcement there is no GA what's-new post, no model card and no release note. If you need Nova at this tier today, Nova 2 Lite is the model AWS itself points you to.

### Nova 2 Omni (preview)

**Announced:** 2 December 2025 (AWS's what's-new page is dated 2 December; several write-ups say 3 December - the re:Invent keynote spanned both). **Status:** still preview. **Context:** 1,000,000 tokens.

A unified multimodal reasoning **and generation** model: text, image, video and speech in; text **and images** out. 200+ languages for text, 10 for speech input. Native reasoning, image generation and editing by natural language, speech transcription and translation, and multi-speaker summarisation.

**Pricing** (us-east-1, Standard, per MTok): global cross-region $0.30 input for text, image and video, $1.00 for audio input, $2.50 text output and $40.00 image output; geo/in-region $0.30 across text/image/video plus $1.10 audio in, $2.80 text out and $44.00 image out.

**Caution:** Business Insider reported in late July 2026 that Amazon moved Nova 2 Omni - along with Nova Premier, Nova Reel and Nova Canvas - into maintenance-only development, shifting engineers and compute to a new Frontier Model Research group under Pieter Abbeel with a new frontier model expected at re:Invent 2026. **AWS has published no such statement**, no deprecation and no EOL notice, and Nova 2 Omni remains listed and priced as a preview model. Treat the wind-down reporting as reported, not confirmed - but do not plan a production dependency on a preview model that has not moved in nine months.

### Nova Forge and Nova Act (services, not models)

**Nova Forge** (GA 2 December 2025, US East N. Virginia only) lets organisations build their own frontier models from early Amazon Nova pre-trained, mid-trained and post-trained checkpoints, blending proprietary data with Amazon-curated training data, with RL on custom reward functions and a responsible-AI toolkit; custom models host on SageMaker AI and Bedrock. A Nova Forge SDK shipped around 23 March 2026. Forge customers are also the gate for Nova 2 Pro and Nova 2 Omni preview access. AWS publishes no price; CNBC reported at launch a subscription starting around $100,000/year with training compute billed separately through SageMaker and Amazon engineering assistance not included - reported, not vendor-published.

**Nova Act** (GA 2 December 2025, US East N. Virginia only) is a service for building, deploying and managing fleets of AI agents that automate production browser and UI workflows, powered by a custom Nova 2 Lite model. AWS claims over 90% task reliability.

### Nova Pro (Nova 1, previous generation, superseded by Nova 2 Lite)

**Released:** December 2024. **Context:** 300,000 tokens. **Max output:** 5,000 tokens. **Modalities:** Text, image, video. **Knowledge cutoff:** October 2024.

Amazon's highest-capability Nova 1 model. Native multimodal including video understanding. $0.80 / $3.20 per MTok; latency-optimized inference $1.00 / $4.00; Flex and Batch $0.40 / $1.60; Priority $1.40 / $5.60 (us-east-1). Does not support structured outputs or knowledge bases.

**When to use it today:** still Active with no EOL date, so existing integrations are safe for now - but it has been removed from AWS's Nova marketing page, and **AWS's own guidance is to migrate Nova 1 Pro workloads to Nova 2 Lite**, which has a 1M context against Nova Pro's 300K, a 64K output limit against 5K, extended thinking, built-in tools, and a lower input price.

**API access:** Amazon Bedrock only.

### Nova Lite and Nova Micro (Nova 1, previous generation)

**Nova Lite:** 300,000 tokens, 5,000 max output, text/image/video in, $0.06 / $0.24 per MTok ($0.03 / $0.12 batch). **Nova Micro:** 128,000 tokens, 5,000 max output, text only, $0.035 / $0.14 per MTok ($0.0175 / $0.07 batch). Both have an October 2024 knowledge cutoff.

**When to use them today:** both remain Active with no EOL date and Nova Micro is still the cheapest Nova per token, so high-volume simple tasks can reasonably stay put. Both have been dropped from AWS's Nova models page, and AWS's March 2026 migration guide routes Nova 1 Lite to Nova 2 Lite.

### Nova Premier, Nova Sonic v1 (retired 14 September 2026), Nova Canvas, Nova Reel (retiring 30 September 2026)

**Nova Premier** was the top of the Nova 1 lineup (1M context, 25K max output) and **Nova Sonic v1** the original speech-to-speech model; both were Legacy from 13 March 2026 and **reached End-of-Life on 14 September 2026**, so calls to them now fail. **Nova Canvas** (image generation) and **Nova Reel v1:0 and v1:1** (video generation) are Legacy since 30 March 2026 with **End-of-Life on 30 September 2026**.

**What to do:** Premier workloads go to Nova 2 Lite, per AWS's own migration guide - Nova 2 Pro is the notional successor but is still preview-gated. Sonic v1 goes to Nova 2 Sonic. Canvas and Reel have **no first-party successor**; the Bedrock-native options are third-party models (Stability AI Stable Image Ultra/Core/SD3.5 Large for images, Luma Ray v2 in us-west-2 for video), and those suggestions come from third-party analysis rather than an AWS migration path. New customers can already not adopt Legacy models, and existing customers can lose access after 15 days of inactivity.

Note also a documentation inconsistency worth flagging if you are auditing dates: Nova Premier's Bedrock model card gives a launch date of 31 October 2025, while AWS's original announcement and independent timelines put Nova Premier GA at 30 April 2025. The EOL date of 14 September 2026 is consistent everywhere.

---

## Microsoft: Phi and MAI

Microsoft now has two model stories, not one. **Phi** remains the small-model family, and there is no Phi-5 - treat any claim of one as unverified. Separately, at Build on 2 June 2026 Microsoft launched **MAI**, its own first-party model family trained from scratch on commercially licensed data with no distillation from third-party model families. That is a deliberate step away from OpenAI dependence, and for a vendor this article already covers it is now the more consequential Microsoft-models story.

Note also that Microsoft's 2026 announcements say "Microsoft Foundry" where earlier material said Azure AI Foundry or Azure AI Studio.

### Phi-4-reasoning-vision-15B

**Released:** 4 March 2026. **Parameters:** 15B. **License:** MIT / permissive.

The newest Phi model and the one a reader picking a Phi variant today should look at first. A vision-language reasoning model with **selective reasoning** - it decides when to emit a chain of thought and when to answer directly, which removes the usual reasoning-model latency tax on easy inputs. Built on the Phi-4-Reasoning backbone with a SigLIP-2 vision encoder and mid-fusion. Weights, fine-tuning code and benchmark logs are all published.

**When to use it:** On-device and edge multimodal reasoning; any workload that wants reasoning quality without paying reasoning latency on every request.

**API access:** Hugging Face, GitHub, Microsoft Foundry, self-hosted.

### Phi-4 family

**Sizes:** Phi-4 14B (16K context), Phi-4-mini 3.8B, Phi-4-multimodal 5.6B (128K context), Phi-4-reasoning and reasoning-plus 14B, Phi-4-mini-reasoning 3.8B. **License:** MIT throughout.

Microsoft's small-model line, still current alongside the March 2026 vision-reasoning model. These outperform many much larger models on reasoning and coding benchmarks due to high-quality synthetic training data.

**Strengths:** Runs on commodity hardware. Strong reasoning for size. MIT license across the family.

**Weaknesses:** Phi-4's 16K context window is small compared to essentially everything else in this article. General knowledge can lag on niche topics.

**When to use it:** On-device inference, edge applications, cost-sensitive enterprise deployments. Runs on laptop-class hardware.

**API access:** Microsoft Foundry, Hugging Face, Ollama (self-hosted).

### Microsoft MAI

**Announced:** 2 June 2026 at Build. **Models:** MAI-Thinking-1 (flagship reasoner), MAI-Code-1.1-Flash (5B), MAI-Image-2.6 and MAI-Image-2.6-Flash, MAI-Transcribe-2 (43 languages), MAI-Voice-2 (15 languages) and MAI-Voice-2-Flash.

Microsoft's own frontier-adjacent lineup, trained from scratch on commercially licensed data. MAI-Code-1.1-Flash ships inside GitHub Copilot and VS Code, and MAI-Thinking-1 is reported to match Claude Opus 4.6 on SWE-Bench Pro.

**Availability is inconsistent in Microsoft's own material:** Microsoft's post says six of the seven are generally available with MAI-Voice-2-Flash "coming soon", while some press reported MAI-Thinking-1 as private preview via Foundry. Version numbers also conflict inside that same post - the headings say MAI-Image-2.6 and MAI-Transcribe-2 while the body text says MAI-Image-2.5 and MAI-Transcribe-1.5. No pricing has been published. Microsoft says developers can tune the weights themselves for the first time, but **no open-weight licence has been announced**, and secondary sources say MAI-Thinking-1 is not downloadable.

**August-September 2026 updates** clear up some of that. **MAI-Thinking-1** entered **public preview** in Microsoft Foundry on 12 August 2026 as a mid-size reasoning model - so "preview", not GA, is the accurate status - with Microsoft claiming blind-test preference over Claude Sonnet 4.6 and still no published price. **MAI-Transcribe-2** (3 September 2026) is priced at **$0.10 per audio hour** with speaker diarization, and Microsoft reports a 5.2% average word error rate on FLEURS across 60 languages. **MAI-Image-2.6** shipped on 10 August 2026 and **MAI-Image-2.6-Flash** reached Foundry on 4 September 2026. **MAI-Code-1.1-Flash** (11 August 2026) replaced MAI-Code-1-Flash, which GitHub Copilot deprecated on 10 September 2026. A security-specific **MAI-Cyber-1-Flash** runs inside Microsoft's MDASH multi-agent vulnerability-finding system (13 August 2026) rather than as a general API model.

**API access:** Microsoft Foundry, plus OpenRouter, Fireworks AI and Baseten.

### Phi-3 Mini / Small / Medium (previous generation)

Earlier Phi generation. Still widely deployed. Good baseline for small-model comparison; Phi-4 and Phi-4-reasoning-vision-15B supersede it for new work.

---

## NVIDIA: Nemotron

NVIDIA became a serious open-weight lab in 2026. The Nemotron 3 family is fully open in the strongest sense available - weights, pre- and post-training software, recipes, and the training data NVIDIA is able to redistribute (3T pre-training tokens, 13M post-training samples, 10+ RL environments) - under the Linux Foundation's **OpenMDW-1.1** licence, which covers all three. That puts it alongside IBM Granite and OLMo in the "truly open source" tier rather than the "open weight" tier, and at considerably larger scale than either.

All Nemotron 3 models are hybrid Mamba-Transformer MoE architectures with a **1,000,000-token context window**.

### Nemotron 3.5 Lightning (`NVIDIA-Nemotron-3.5-Lightning-30B-A3B`)

**Released:** 11 August 2026. **Parameters:** 31.6B total / ~3-3.6B active, MoE. **Context:** 1,000,000 tokens. **License:** OpenMDW-1.1.

The newest Nemotron. NVIDIA claims performance near `gpt-oss-120b` at roughly a quarter of the total parameters. Free weights, a free tier on OpenRouter, and a NIM microservice on build.nvidia.com.

It shipped alongside **NeMo Switchyard**, an open-source model-router library that picks the cheapest appropriate model per task - directly relevant if you are building the kind of multi-model routing this article's selection tables imply.

### Nemotron 3 family

**Nano** (31.6B, 15 December 2025), **Super** (120B total / 12B active, 11 March 2026 at GTC), **Nano Omni** (30B / 3B active, multimodal, 28 April 2026) and **Ultra** (550B / 55B active, 4 June 2026). Ultra was pretrained largely in NVFP4 for Blackwell. Specialised siblings cover retrieval, parsing, speech and safety: Nemotron Retriever, Parse, Speech and Safety.

### Nemotron-3 Ultra Math (research checkpoints)

**Released:** 3 September 2026. **IDs:** `nvidia/Nemotron-3-Labs-Ultra-Math-RL` and `nvidia/Nemotron-3-Labs-Ultra-Math-SFT`. **Parameters:** 550B total / 55B active (the Ultra architecture). **License:** OpenMDW-1.1, commercial use permitted.

Maths-specialised post-trains of Nemotron 3 Ultra from NVIDIA's labs track, published with a paper (arXiv 2609.10712). NVIDIA reports they were part of an **ensemble** that scored at gold-medal level on IMO 2026 - the result belongs to the ensemble, not to either checkpoint on its own, so do not read it as a single-model benchmark. NVIDIA also published **Nemotron-3-Diarization** (1 September 2026) and NVFP4 quantizations of third-party models including GLM-5.3, Qwen3.8-27B and DeepSeek-V4.1-Flash, but no new general-purpose Nemotron LLM since 3.5 Lightning.

**Honest positioning:** Artificial Analysis scores Nemotron 3 Ultra at 47.7 on its Intelligence Index - ahead of other US open-weight models, but behind the Chinese-led open frontier described above. There is **no Nemotron 4**; the Nemotron Coalition announced at GTC on 16 March 2026 is positioned as groundwork for a future one.

**When to use it:** Self-hosted deployments in regulated environments that need auditable provenance at frontier-adjacent scale, and NVIDIA-native stacks already using NeMo and NIM.

**API access:** Hugging Face, NVIDIA NIM (build.nvidia.com), OpenRouter, self-hosted.

---

## IBM: Granite

IBM's Granite model family is one of the few LLM families that qualifies as genuinely open source under the OSI definition. IBM discloses not only weights but the sources and composition of training data. No web-scraped general internet content: Granite is trained on curated, enterprise-appropriate sources with documented provenance. This makes it the default choice when your industry (finance, healthcare, legal) requires that you be able to audit what the model learned from.

### Granite 4.2

**Released:** 25 August 2026. **Parameters:** 3B, 8B and 30B, dense decoder-only. **Context:** 128,000 native, with documented extension to 512,000. **License:** Apache 2.0.

The current Granite generation. The headline feature is **native toggleable thinking** - full, low-effort, or off - plus an agentic reinforcement-learning post-training phase aimed at software engineering, terminal coding and search workflows. The 30B scores 57.0 on SWE-bench Verified. The same announcement shipped **Granite Speech 5.0 Turbo CTC** and **Turbo CTC NC** (470M each) for edge ASR.

**Strengths:** Genuinely open source (weights + training data + code). Enterprise-appropriate training data sources with documented provenance. IBM provides compliance documentation for regulated industries. Runs on modest hardware, and the 30B is a real jump in capability over the 8B ceiling of the 3.x generation. Naming the generation matters most on a page like this precisely because Granite's whole argument is auditability.

**Weaknesses:** Parameter count is still small compared to frontier models. General reasoning quality lags the frontier. Brand recognition is lower than Llama in the open-source community. Note that IBM's Granite 4.2 post describes a dense architecture and does not mention hybrid Mamba, contradicting secondary write-ups that describe Granite 4.x as hybrid Mamba-2; and IBM's 4.2 post does not itself state a context window, so the 128K/512K figures come from IBM's Granite 4.1 material and secondary coverage.

**When to use it:** Regulated enterprise environments where training data provenance must be documented. Self-hosted deployments in financial services, healthcare, or legal. Fine-tuning base for domain-specific tasks. Agentic coding where you need an auditable model.

**API access:** IBM watsonx.ai, Hugging Face (`ibm-granite`), Ollama, self-hosted.

### Granite 4.1

**Released:** 29 April 2026. **Context:** up to 512,000 tokens. **License:** Apache 2.0.

The generation Granite 4.2's dense models are post-trained on top of, and still the broadest family: language models at 3B, 8B and 30B in base and instruct form, plus **Granite Vision 4.1**, **Granite Speech 4.1** (2B, 2B Plus and 2B NAR), **Granite Guardian 4.1** and **Granite Embedding Multilingual R2**. If you need a vision, speech, guardrail or embedding model with Granite's provenance story, this is where they live.

### Granite 3.2 (previous generation, superseded by Granite 4.1 and 4.2)

**Parameters:** 2B and 8B. **Context:** 128,000 tokens. **License:** Apache 2.0.

The prior general-purpose Granite generation, with strong instruction following for its size.

**When to use it today:** existing deployments only. Granite 4.1 (April 2026) and Granite 4.2 (August 2026) supersede it, add a 30B size, extend context to 512K, and add native toggleable thinking - all still under Apache 2.0 with the same provenance disclosure, so there is no licensing reason to stay.

**API access:** IBM watsonx.ai, Hugging Face (`ibm-granite/granite-3.2-8b-instruct`), Ollama, self-hosted.

### Granite Code

**Sizes:** 3B, 8B, 20B, 34B. **License:** Apache 2.0.

Code generation variants trained on 116 programming languages. Used inside IBM's and Red Hat's AI coding assistants.

**When to use it:** Enterprise coding assistance where you need open-source weights with clean data provenance. Runs well on a single GPU for the 8B variant.

---

## Allen Institute for AI: OLMo

OLMo (Open Language Model) from the Allen Institute for AI (AllenAI) is the benchmark for transparent LLM development. Everything is released publicly under Apache 2.0: model weights, training code, training data (Dolmino dataset), training logs on Weights and Biases, and evaluation results. There is no comparable level of transparency from any other lab at this capability level.

### Olmo 3 and Olmo 3.1

**Olmo 3 released:** 20 November 2025. **Parameters:** 7B and 32B. **Context:** 65,536 tokens. **License:** Apache 2.0.

The current Olmo generation, and a substantial step up from Olmo 2 on both capability and context - 65,536 tokens against Olmo 2's 4,096, a sixteen-fold increase that removes the main practical objection to using it. Four variants at each size: **Base**, **Think**, **Instruct** and **RL Zero**. Olmo 3-Think is Ai2's first open reasoning model. **Olmo 3.1** followed with updated 32B Think and Instruct models.

The transparency package is still the point and still unmatched: weights, the **Dolma 3** training data, the **Dolci** post-training stack, intermediate checkpoints at each training milestone, training logs, and a full technical report.

**Strengths:** True open source. Full training transparency. Reproducible. Academic and research community backing. No usage restrictions.

**Weaknesses:** Performance is competitive but not frontier - the differentiator is what you can know about how it was built, not raw capability. There is no Olmo 3.5 or Olmo 4.

**When to use it:** Research requiring fully reproducible LLM experiments. Academic work that needs to cite training data sources. Any context where "open source" must be auditable all the way to the training run.

**API access:** Hugging Face (`allenai`), Ollama, self-hosted.

### OLMo 2 (previous generation, superseded by Olmo 3)

**Released:** November 2024. **Parameters:** 7B and 13B. **Context:** 4,096 tokens (base). **License:** Apache 2.0.

Performance competitive with Llama 3.1 8B and Mistral 7B on standard benchmarks.

**When to use it today:** reproducing published OLMo 2 results. For new work Olmo 3 supersedes it at every axis - larger sizes, a 65,536-token context, a reasoning variant, and the same Apache 2.0 licence and full-transparency release. The "context window is limited" weakness that used to qualify OLMo no longer applies to the current generation.

**API access:** Hugging Face (`allenai/OLMo-2-1124-7B`), self-hosted.

---

## Databricks: DBRX (retired from Databricks' own platform)

DBRX is Databricks' open model, released 27 March 2024. It uses a fine-grained Mixture-of-Experts architecture with 132B total parameters and 36B active per forward pass.

**Context:** 32,768 tokens. **License:** Databricks Open Model License (permissive commercial).

**Strengths:** Strong on coding, instruction following, and mathematics at release.

**When to use it today:** effectively nowhere new, and the reason is pointed. The one argument for DBRX used to be that it ran natively inside Databricks - and **Databricks has retired it from its own platform**. Per Databricks' AI models maintenance policy, DBRX and DBRX Instruct left Foundation Model APIs pay-per-token on 30 April 2025 and provisioned throughput on 19 December 2025, and DBRX left Foundation Model Fine-tuning on 30 April 2025. Databricks' own recommended replacements are Meta-Llama-4-Maverick for pay-per-token and Llama-3.1-70B for fine-tuning. The weights remain downloadable under the Databricks Open Model License, but the line is abandoned; reports of a "DBRX 2" in development are single-source and unverified. This entry is kept as history.

**API access (historical):** Databricks Model Serving until December 2025; weights still self-hostable.

---

## Technology Innovation Institute: Falcon

Falcon is developed by the Technology Innovation Institute (TII) in Abu Dhabi, UAE. It was briefly the leading open-weight model in 2023, and the line is very much alive - but it is three generations past Falcon 2. TII has since shipped Falcon 3, Falcon-H1, Falcon Arabic and, in 2026, the models below.

One licensing caution: **Falcon licences vary by model** and are not consistently stated on TII's own pages. Falcon 7B is Apache 2.0; others are described as "royalty-free" or as permitting research and commercial use under model-specific terms. Check the individual model card rather than assuming the family is uniformly Apache 2.0.

### Falcon-H1R 7B

**Released:** 5 January 2026. **Parameters:** 7B. **Context:** 256,000 tokens.

A hybrid Mamba-Transformer reasoning model, reported at 68.6% on code and agentic tasks and described by TII as best-in-class under 8B. This is the current Falcon a new deployment should evaluate, not Falcon 2.

### Falcon-H1 Arabic

**Released:** 5 January 2026.

Tops the Open Arabic LLM Leaderboard. **This, not Falcon 2 11B, is the current answer for Arabic-language applications** - a recommendation that has moved by three generations and is easy to get wrong from older references.

### Falcon-H1-Tiny-R and Falcon Perception

**Falcon-H1-Tiny-R** ships at 0.6B and 0.09B for very small footprints. **Falcon Perception** is listed as TII's newest model on the Falcon site, but TII publishes no release date, parameter count or licence for it, so treat it as announced rather than specified.

### Falcon 2 11B (previous generation, superseded by Falcon-H1R and Falcon-H1 Arabic)

**Parameters:** 11B. **License:** Apache 2.0.

Competitive with Llama 3 8B on standard benchmarks at its release, with a multimodal variant (Falcon 2 11B VL) adding vision, and strong Arabic performance that gave it an advantage in MENA-region deployments.

**When to use it today:** existing deployments, and cases where you specifically need the Apache 2.0 terms Falcon 2 carries and the newer models may not. For Arabic work and for reasoning, Falcon-H1 Arabic and Falcon-H1R 7B respectively supersede it - the latter with a 256K context against Falcon 2's much smaller window.

**API access:** Hugging Face (`tiiuae/falcon-11b`), self-hosted.

---

## BigCode: StarCoder2

StarCoder2 is developed by BigCode, a collaboration between Hugging Face and ServiceNow Research. It is a code-specialized model trained on The Stack v2, a curated dataset of permissively licensed code.

**Frame this as a maintained legacy line rather than an actively developed family.** There is no StarCoder3. The newest model artifact in the BigCode Hugging Face organisation was updated in February 2025, and BigCode's 2025 output was BigCodeArena evaluation datasets and papers rather than new models. The checkpoints below remain downloadable and useful, but nothing is coming after them.

### StarCoder2-15B

**Parameters:** 15.5B. **Context:** 16,384 tokens. **License:** BigCode OpenRAIL-M (permissive, prohibits harmful use).

Trained on 600+ programming languages with fill-in-the-middle capability for code completion. Competitive with GPT-3.5 on code benchmarks at a fraction of the inference cost when self-hosted.

**Strengths:** Strong fill-in-the-middle (code completion). Large programming language coverage. Permissive license for commercial use. Available on Hugging Face and Ollama.

**Weaknesses:** Not general-purpose. Smaller context window than frontier models. Instruction-following quality lags Codestral and Claude for code review tasks.

**When to use it:** Self-hosted IDE autocomplete. Code search and indexing. Any coding tool where cost-per-completion matters and a dedicated code model beats a general model.

**API access:** Hugging Face (`bigcode/starcoder2-15b`), Ollama, self-hosted.

---

## Two vendors that have left the model business

Both of these still present as model vendors on their own sites, which is exactly why they are worth naming.

### AI21 Labs: Jamba

AI21's Jamba family - `jamba-large` (currently resolving to a July 2025 build), `jamba-mini-2-2026-01` and Jamba 3B, all at 256,000 tokens - is still documented and still callable. **But AI21 stopped selling standalone models.** On 18 May 2026 it cut more than 60% of its workforce, from roughly 180 staff to roughly 70, halted Jamba development and redirected all resources to its Maestro agent-optimisation platform, with the stated reason that selling models alone was not a sufficiently sustainable revenue stream.

This is reported by the Israeli business press (Calcalist/ctech, Globes), which agree on the numbers. **AI21's own site, blog and docs carry no such announcement** - the docs still present Jamba as available and the docs changelog's last entry is 1 December 2025. That silence is consistent with the reports but is not confirmation of them. Jamba 2 shipped on 8 January 2026 under Apache 2.0 (3B dense plus a Mini at 52B total / 12B active), four months before the pivot, so "recent open-weight releases" framing from early 2026 now misleads. Jamba Mini 1.7 was deprecated on 1 February 2026, and the 1.6 and 1.5 lines earlier.

**When to use it:** do not select AI21 as your model provider on the strength of the Jamba catalogue without confirming its status directly with AI21.

### Reka

Reka's 2024 tech-report lineup - Reka Core, Reka Flash, Reka Edge - is what most references still describe. In reality **Reka has pivoted away from general-purpose multimodal LLMs**. Reka Flash 3.1 (21B) has not been updated since July 2025, Reka Core has had no refresh since 2024, and Reka's entire 2026 output is world models, video generation, robotics datasets and evaluation frameworks: PhysicalRealismBench and a Moonvalley partnership (9 June 2026), the CS2 10K dataset (24 June), WorldModelGym (2 July), a world-model data pipeline (10 July), video reasoning (30 July), the Reka Daily 10K egocentric dataset (6 August), real-time video generation (14 August) and a Responsible AI / Model Risk framework (3 September 2026).

Its only 2026 model release is **Reka Edge** (`reka-edge-2603`, March 2026 - the exact day is disputed between sources): a 7B vision-language model for **physical AI** and edge deployment, pairing a 657M ConvNeXt V2 vision encoder with a 6.4B transformer backbone, covering image understanding, video analysis, object detection and tool use, with a claimed 3x fewer input tokens and 65% faster throughput than leading 8B models.

**The licence is the decision.** Reka Edge ships under a custom `reka-edge-2603-license` permitting commercial use **only for organisations under US$1M annual revenue**. For the enterprise readers this article is written for, that is a hard blocker, and it is the single most decision-relevant fact about Reka today.

---

## Open Source vs Open Weight: What the Distinction Means

"Open source" is used loosely across the LLM industry. The distinction matters for legal, compliance, and reproducibility reasons.

| Term | Weights | Training Code | Training Data | License |
|---|---|---|---|---|
| **Truly open source** | Yes | Yes | Yes, disclosed | OSI-compatible (Apache 2.0, MIT, OpenMDW) |
| **Open weight, permissive** | Yes | Sometimes | No | OSI-compatible (Apache 2.0, MIT) |
| **Open weight, conditional** | Yes | No | No | Custom, with revenue or user-count triggers |
| **Research release** | Restricted | No | No | Non-commercial only |
| **Proprietary** | No | No | No | API only |

**Truly open source** (weights + training data + code): IBM Granite 4.2, Olmo 3 and 3.1, NVIDIA Nemotron 3 and 3.5 (OpenMDW-1.1, covering weights, data and recipes), Pythia (EleutherAI), BLOOM (BigScience RAIL), SmolLM (HuggingFace).

**Open weight and genuinely permissive**: Mistral Large 3 and Small 4 and Ministral 3 (Apache 2.0), Gemma 4 (Apache 2.0 - a change from Gemma 3), Meta Muse Glimmer (Apache 2.0), Cohere Command A+ and North Mini Code (Apache 2.0), Qwen3.8-27B (Apache 2.0), DeepSeek V4-Pro and V4.1-Flash (MIT), GLM-5.3-Flash (MIT), Xiaomi MiMo-V2.6 (MIT), Tencent Hy4-preview (Apache 2.0), Microsoft Phi (MIT).

**Open weight with conditions attached** - this category grew sharply in mid-2026 and is where most of the current open frontier now sits: Qwen3.8-2.4T-A95B (Qwen3.8-Max License), Qwen3.8-Flash-Next (Qwen Community License 1.0), Kimi K3 (Kimi K3 License), GLM-5.3 (GLM-5.3 License), MiniMax-M3 and H3 (MiniMax Community License, H3 adding a geographic application gate for the USA, EU, UK and South Korea), Mistral Medium 3.5 (Modified MIT), Llama 3.x and Llama 4 (Llama Community License), Gemma 3 (Gemma Terms of Use), Reka Edge (commercial use capped at US$1M annual revenue), DBRX (Databricks Open Model License), and Cohere's older Command A and Command R+ research weights and the new North Small Translate (CC-BY-NC 4.0 - downloadable, but non-commercial unless you hold a Cohere licence, which is exactly the restriction Command A+ removed). **Qwen-Image-2.1** belongs in the research-release row rather than here: its Qwen Research License Agreement allows research and evaluation only.

**The practical consequences are now two, not one.** First, the original point still holds: "open weight" models can be self-hosted and fine-tuned, but you cannot audit, reproduce, or publish the training process, and that gap is increasingly scrutinised under frameworks like the EU AI Act's transparency obligations. Second, and newer: **"open weights" no longer implies "permissively licensed."** Between July and August 2026 the bespoke, revenue-triggered licence became the norm for frontier open-weight releases from the Chinese labs, and Mistral and Reka have their own variants. The common triggers are attribution above 100M monthly active users or US$20M monthly revenue, and a separate commercial licence for Model-as-a-Service businesses above a revenue threshold that ranges from US$20M to US$10bn depending on the lab. Read the LICENSE file on the model card, not the "open weights" badge.

---

## Inference Providers

The models above are available through multiple inference providers beyond their original developers. The provider choice affects latency, cost, available model versions, and the compliance posture of your deployment.

The "available models" lists below describe each provider's characteristic catalogue rather than a verified current inventory - these catalogues turn over faster than any comparison page can track, and several of the models named are the previous-generation entries flagged above. Check the provider's own model list before assuming a specific model ID is served.

### Groq

Groq builds custom LPU (Language Processing Unit) hardware designed specifically for LLM inference. The architecture eliminates the memory bandwidth bottlenecks that limit GPU throughput for sequential token generation. The result: 10-20x faster token output than GPU-based inference at comparable cost.

**Available models (September 2026):** OpenAI gpt-oss-120b and gpt-oss-20b as the self-serve production models, Qwen3.8-27B and MiniMax M2.7 in preview, Whisper Large v3 for speech, and Llama 3.3 70B / Llama 3.1 8B now as enterprise (contact-sales) models. The older Mixtral, Gemma 2 and DeepSeek R1 Distill listings are gone. Groq's catalogue is much narrower than Together's or Fireworks'.

**Strengths:** Fastest time-to-first-token and tokens-per-second of any hosted provider. OpenAI-compatible API (swap one line of code). Competitive pricing.

**Weaknesses:** Model selection is limited to what Groq has ported to their hardware. No model fine-tuning or hosting.

**When to use it:** Real-time chat interfaces where response latency is a product requirement. Streaming applications. Any workload where open-model quality is enough and hosted-frontier-model latency is not.

**API access:** Groq API (`api.groq.com/openai/v1`), OpenAI SDK compatible.

### Together AI

GPU cloud with 100+ open-weight models and custom fine-tuned model hosting.

**Available models (September 2026, serverless):** Kimi K3, GLM-5.3 and GLM-5.3 Flash, DeepSeek V4-Pro and V4-Flash, the Qwen3.6-3.8 family, MiniMax M3, Thinking Machines Inkling, gpt-oss-120b, Meta's Muse Glimmer 30B and Llama 3.3 70B, plus image, video, audio and embedding models. Dedicated endpoints cover a wider set.

**Strengths:** Largest open-model catalog of any inference provider. Custom model deployment (upload your fine-tuned weights). Competitive pricing for large models. Fine-tuning API.

**When to use it:** Open-weight model inference without GPU infrastructure. Evaluating multiple models against each other before committing to self-hosting. Hosting your own fine-tuned Llama or Mistral.

**API access:** Together AI API (OpenAI-compatible), Together Python SDK.

### Fireworks AI

Inference provider focused on production throughput and structured output reliability.

**Available models (September 2026):** DeepSeek V4.1-Flash and V4-Pro, Kimi K3, GLM-5.3, Qwen3.8 Max and Qwen3.8 Flash Next, MiniMax M3, gpt-oss, Gemma 4, NVIDIA Nemotron 3, Llama 3.3 70B, and Fireworks' own **Ember-1**.

**Differentiator:** "FireOptimizer" applies automatic quantization and batching for cost reduction without measurable quality loss. Structured output (JSON schema) is fully supported across all major open models, not just proprietary APIs. Function calling reliability is documented and tested.

**When to use it:** Production pipelines requiring reliable structured output from open models. High-throughput batch inference. When switching from OpenAI function calling to an open-model alternative.

**API access:** Fireworks AI API (OpenAI-compatible).

### Hugging Face

Hugging Face operates both a model hub (the largest public model repository) and managed inference.

**Inference Providers:** The successor to the old free Serverless Inference API. One Hugging Face token and an OpenAI-compatible router give serverless access to hundreds of models served by partner providers (Cerebras, Groq, Together, Fireworks, Baseten and others) plus HF's own infrastructure, with a small monthly free credit and pay-as-you-go beyond it.

**Inference Endpoints:** Dedicated GPU instances for production. Any model from the hub. Pay per hour of endpoint uptime.

**Strengths:** Virtually any open-weight model available. Consistent API format across models. Hosting for fine-tuned model checkpoints.

**When to use it:** Prototyping with models not available elsewhere. Hosting your fine-tuned weights for team access. Production inference for models that inference providers do not carry.

**API access:** Inference Providers (`router.huggingface.co/v1`, OpenAI-compatible), Inference Endpoints (custom URL), `huggingface_hub` Python and `@huggingface/inference` JS clients.

### Replicate

API-first platform hosting open-weight models and community fine-tunes via a simple REST API.

**Available models:** Llama, Mistral, Stable Diffusion, Whisper, Flux (image generation), and thousands of community models.

**Strengths:** Zero infrastructure management. Any community model accessible in minutes. Image generation models alongside text on the same API.

**When to use it:** Rapid prototyping with any model in the Replicate catalog. Multimodal workflows mixing text generation and image generation.

**API access:** Replicate API, Replicate Python and JavaScript SDKs.

### Ollama

Open-source tool for running LLMs locally on your own hardware. Downloads and manages GGUF-quantized model weights, runs an inference server, and exposes an OpenAI-compatible API on localhost.

**Available models:** Llama 4, Gemma 4, Qwen3.8, DeepSeek V4.1-Flash, gpt-oss, Mistral Small, Phi-4, Granite 4, and hundreds more. Install any model with `ollama pull model-name`.

**Strengths:** No API cost. Full privacy (data never leaves your machine). No internet connection required after download. OpenAI-compatible API enables drop-in replacement for local development. Works on Apple Silicon with Metal GPU acceleration.

**When to use it:** Local development and testing. Privacy-sensitive personal use. Offline operation. Zero-cost local inference on a developer machine.

**API:** `http://localhost:11434` (Ollama native) or `http://localhost:11434/v1` (OpenAI-compatible).

### vLLM

Open-source inference server for self-hosted LLMs at production scale. Uses PagedAttention for efficient KV-cache memory management, enabling significantly higher request throughput than naive inference.

**Available models:** Any Hugging Face model. Supports all major architectures (Llama, Mistral, Qwen, Falcon, Gemma, Phi, Mixtral, and more).

**Strengths:** Highest throughput of any open-source inference server. OpenAI-compatible API. Tensor parallelism for distributing a model across multiple GPUs. Streaming support. Active development with frequent releases.

**When to use it:** Self-hosted production inference at scale. Running Llama 70B or larger across multiple GPUs. Kubernetes-based inference services with autoscaling.

**API:** OpenAI-compatible (`/v1/completions`, `/v1/chat/completions`).

---

## Hyperscaler AI Platforms

The major cloud providers wrap multiple models with enterprise controls, compliance certifications, and native cloud integrations. The model itself is often secondary to the platform's governance, data residency, and ecosystem integration story.

### Azure AI (Microsoft)

**Azure OpenAI Service:** First-party OpenAI models on Azure infrastructure. **GPT-6 Astra, GPT-6 Sol and GPT-6 Luna are generally available in Microsoft Foundry** as of 22 September 2026, the GPT-5.6 family (Sol, Terra, Luna) remains available, and legacy models like GPT-4o remain supported for existing integrations (see [OpenAI API](/tools/openai-api/) for the full current lineup). Enterprise SLA, EU and US data residency options, Microsoft Entra ID integration, content filtering. The most commonly chosen path when an enterprise already holds a Microsoft Enterprise Agreement.

**GPT-6 on Azure: what changed on 22 September 2026.** Microsoft's GA announcement lists **Standard deployment for Astra, Sol and Luna across all 28 Global regions and the US and EU Data Zones**, **Provisioned Throughput for Astra and Sol** across Global, US and EU Data Zones, and **Priority Processing for Sol** in Global and US Data Zones. That closes the gap this page flagged in early September, when Astra was Global and US Data Zone only with no EU Data Zone - the material issue for a buyer who chose Azure for EU residency. Two earlier Astra caveats from Azure's model documentation are worth re-checking against the current docs rather than assuming resolved: default quota only on Tier 5 and Tier 6 subscriptions (others file a quota request), and no support for mid-conversation reasoning-effort changes or mid-turn steering, both of which the direct OpenAI API supports. Azure's docs also note Astra may apply enhanced safety controls at inference time, including classifier threshold changes and system-injected safety instructions. Azure Foundry pricing for Astra was published at $10/$1/$50 per MTok short-context and $20/$2/$75 long-context on Global Standard, and $11/$1.10/$55 and $22/$2.20/$82.50 on US Data Zone.

**Microsoft Foundry (formerly Azure AI Foundry, formerly Azure AI Studio):** Development platform for building AI applications. Model catalog includes OpenAI, Meta, Mistral, Cohere, Phi and Microsoft's own **MAI** models. Includes prompt flow, RAG pipeline tooling, evaluation, content safety, and fine-tuning. Anthropic's Fable 5.1, Mythos 5.1, Opus 5.5 (from 22 September 2026), Opus 5 and Sonnet 5 are also served here.

**Azure AI Search:** Managed vector and hybrid search. Integrates directly with Azure OpenAI for RAG pipelines without data leaving the Azure tenant.

**Compliance:** ISO 27001, SOC 2, GDPR, HIPAA, FedRAMP. Required for many regulated US and EU enterprise deployments.

**When to use it:** Enterprises with Microsoft agreements needing OpenAI models on Azure infrastructure. Regulated industries requiring documented compliance certifications. Teams already using Azure AD, Key Vault, and Azure Monitor.

### Google Cloud: Vertex AI

**Vertex AI:** Google's managed ML platform, rebranded the Gemini Enterprise Agent Platform in April 2026 - Google's own model documentation is now served under `docs.cloud.google.com/gemini-enterprise-agent-platform/`. Gemini 3.x access (Gemini 3.1 Pro at 1,048,576 tokens, Gemini 3.8 Flash at 1,000,000), Model Garden with 150+ open and commercial models, Gemma 4, Mistral, and more - including Claude Opus 5.5 (from 22 September 2026) and Grok 4.6 (GA 18 September 2026). Fine-tuning, evaluation, and serving pipelines; Computer Use and Shell sandboxes reached GA on 9 September 2026.

**Note on the old 2M-context pitch:** Google no longer offers a 2,000,000-token model. If Vertex AI was on your shortlist specifically because of Gemini 2.0 Pro's experimental 2M window, that differentiator is gone and the comparison against Bedrock and Azure is now closer on context alone - several vendors sit at 1M.

**Vertex AI Search:** Managed RAG with grounding options. Search grounding links LLM answers to Google Search results for factual queries.

**Vertex AI Pipelines:** MLOps orchestration for training and evaluation. Native integration with BigQuery for large-scale data.

**When to use it:** GCP-native architectures. Teams using BigQuery for data. Workloads that want Gemini's 1M context plus Search grounding in one platform. Production ML pipelines with training and evaluation workflows.

### Oracle Cloud Infrastructure: OCI Generative AI

**OCI Generative AI Service:** Managed LLM inference on Oracle Cloud. Available models: Cohere Command R+, Meta Llama 3, Cohere Embed. Available in select OCI regions.

**OCI AI Vector Search (Oracle Database 23ai):** Vector similarity search built directly into Oracle Database. Enables RAG without a separate vector database. Queries run inside the same database that holds production transactional data.

**The Oracle differentiator:** If your data already lives in Oracle Database, AI Vector Search eliminates the data movement that separate vector databases require. For regulated industries with strict data residency, keeping vectors and source data in the same Oracle Database instance simplifies compliance.

**When to use it:** Enterprises with existing Oracle Database agreements. Regulated financial services or healthcare workloads where data cannot be moved to a separate vector store. Oracle Database 23ai as a combined operational + AI data store.

---

## Comparison Tables

### Context Window

Current models only. Where a model's max output ceiling is materially lower than its input window, that is noted - a 1M context with a 5K output limit is a different tool from a 1M context with a 128K one.

| Model | Context Window | Max Output |
|---|---|---|
| Llama 4 Scout (Meta, legacy line) | 10,000,000 tokens (claimed) | - |
| GPT-6 Astra / Sol / Luna (OpenAI) | 1,050,000 tokens (922,000 max input) | 128,000 |
| GPT-5.6 Sol / Terra / Luna (OpenAI) | 1,050,000 tokens | 128,000 |
| Gemini 3.1 Pro (Google) | 1,048,576 tokens | 65,536 |
| Kimi K3 (Moonshot) | 1,048,576 tokens | - |
| MiniMax-M3 | 1,048,576 tokens | 262,144 |
| Claude Fable 5.1 / Mythos 5.1 / Opus 5.5 / Sonnet 5 (Anthropic) | 1,000,000 tokens | 128,000 (300,000 on Batch beta for Sonnet 5) |
| Gemini 3.8 Flash (Google) | 1,000,000 tokens | 64,000 |
| Nova 2 Lite / 2 Sonic / 2 Pro / 2 Omni (Amazon) | 1,000,000 tokens | 64,000 |
| Muse Spark 1.3 (Meta) | 1,000,000 tokens | - |
| DeepSeek V4-Pro / V4.1-Flash | 1,000,000 tokens | 384,000 |
| Xiaomi MiMo-V2.6 Pro / Flash | 1,000,000 tokens | - |
| Tencent Hy4-preview | 1,000,000 tokens | - |
| GLM-5.3 (Z.ai) | 1,000,000 tokens | - |
| Qwen3.8-Max (Alibaba, API) | 1,000,000 tokens | - |
| Nemotron 3 / 3.5 family (NVIDIA) | 1,000,000 tokens | - |
| Grok 4.3 (xAI/SpaceXAI) | 1,000,000 tokens | - |
| Grok 4.7 / 4.6 / 4.5 (xAI/SpaceXAI) | 500,000 tokens | - (no fixed text output limit on 4.7) |
| Granite 4.1 / 4.2 (IBM) | 128,000 native, 512,000 extended | - |
| GLM-5.3-Flash (Z.ai) | ~300,000 tokens | - |
| Nova Pro / Nova Lite (Amazon, Nova 1) | 300,000 tokens | 5,000 |
| Mistral Large 3 / Medium 3.5 / Small 4 | 256,000 tokens | - |
| North Mini Code (Cohere) | 256,000 tokens | 64,000 |
| Command A (Cohere, supporting lineup) | 256,000 tokens | - |
| Qwen3.8-27B / Flash-Next (open weights) | 262,144 native, ~1,000,000 extended | - |
| Falcon-H1R 7B (TII) | 256,000 tokens | - |
| Gemma 4 12B / 26B / 31B (Google) | 256,000 tokens | - |
| Claude Haiku 4.5 (Anthropic) | 200,000 tokens | 64,000 |
| Command A+ (Cohere, current flagship) | 128,000 tokens | 64,000 |
| Muse Glimmer (Meta) | 128,000 tokens | - |
| Gemma 4 E2B / E4B (Google) | 128,000 tokens | - |
| Olmo 3 / 3.1 (Ai2) | 65,536 tokens | - |
| StarCoder2-15B (BigCode) | 16,384 tokens | - |
| Phi-4 (Microsoft) | 16,000 tokens | - |

Two cautions on reading this table. **Token counts are not comparable across tokenizers** - Anthropic's models from Opus 4.7 onward use a tokenizer producing roughly 30% more tokens for the same text, so Claude's 1M window is about 555k words where a pre-4.7 model's 1M held about 750k. And **a large advertised window is not the same as reliable retrieval across it**; verify against your own long-context evaluations before treating the top of this table as interchangeable.

### Licensing

| Model | License | Self-Hostable | Training Data Open |
|---|---|---|---|
| IBM Granite 4.2 | Apache 2.0 | Yes | Yes (documented sources) |
| Olmo 3 / 3.1 | Apache 2.0 | Yes | Yes (Dolma 3 / Dolci) |
| NVIDIA Nemotron 3 / 3.5 | OpenMDW-1.1 | Yes | Yes (weights, data and recipes) |
| StarCoder2 | BigCode OpenRAIL-M | Yes | Yes (The Stack v2) |
| Mistral Large 3 | Apache 2.0 | Yes | No |
| Mistral Small 4 / Ministral 3 | Apache 2.0 | Yes | No |
| Gemma 4 | Apache 2.0 | Yes | No |
| Meta Muse Glimmer | Apache 2.0 | Yes | No |
| Cohere Command A+ / North Mini Code | Apache 2.0 | Yes | No |
| Qwen3.8-27B | Apache 2.0 | Yes | No |
| DeepSeek V4-Pro / V4.1-Flash | MIT | Yes | No |
| Xiaomi MiMo-V2.6 | MIT | Yes | No |
| Tencent Hy4-preview | Apache 2.0 | Yes | No |
| GLM-5.3-Flash | MIT | Yes | No |
| Phi-4 / Phi-4-reasoning-vision-15B | MIT | Yes | No |
| Falcon-H1R 7B / Falcon-H1 Arabic | Model-specific (varies) | Yes | No |
| Mistral Medium 3.5 | Modified MIT (high-revenue carve-out) | Yes | No |
| Qwen3.8-2.4T-A95B | Qwen3.8-Max License (revenue triggers) | Yes | No |
| Qwen3.8-Flash-Next | Qwen Community License 1.0 | Yes | No |
| Kimi K3 | Kimi K3 License (MaaS above $20M) | Yes | No |
| GLM-5.3 | GLM-5.3 License (MaaS above $10bn) | Yes | No |
| MiniMax-M3 / H3 | MiniMax Community License (+ geo gate on H3) | Yes | No |
| Reka Edge | Custom (commercial use under $1M revenue only) | Yes | No |
| Cohere Command A / Command R+ / North Small Translate | CC-BY-NC 4.0 (research weights; commercial use needs a Cohere licence) | Yes (non-commercial) | No |
| Qwen-Image-2.1 | Qwen Research License (research and evaluation only) | Yes (non-commercial) | No |
| DBRX | Databricks Open Model License | Yes | No |
| Llama 3.x / Llama 4 | Llama Community License | Yes | No |
| Gemma 3 | Gemma Terms of Use | Yes | No |
| GPT-6 Astra / Sol / Luna, GPT-5.6 | Proprietary | No | No |
| Claude 5 and 5.5 family (Fable / Mythos / Opus / Sonnet) | Proprietary | No | No |
| Gemini 3.x | Proprietary | No | No |
| Meta Muse Spark | Proprietary | No | No |
| Grok 4.x | Proprietary | No | No |
| Amazon Nova / Nova 2 | Proprietary | No | No |
| Microsoft MAI | Proprietary (no open-weight licence announced) | No | No |

### Recommended by Use Case

| Use Case | Primary Choice | Alternative |
|---|---|---|
| Complex reasoning and analysis | Claude Opus 5.5 | GPT-6 Sol, or GPT-6 Astra / Claude Fable 5.1 where evals show a gap |
| Long document processing | Claude Sonnet 5 or Opus 5.5 | Gemini 3.1 Pro |
| Mathematics and proofs | GPT-6 Sol or GPT-6 Astra at high reasoning effort | DeepSeek V4-Pro with `reasoning_effort: max` |
| Code generation | Claude Sonnet 5 or Opus 5.5 | GPT-6 Sol, Grok 4.7, Muse Spark 1.3 |
| Agentic coding, terminal | Claude Code (Opus 5.5 / Fable 5.1) | Muse Code, Cohere North Mini Code (self-hosted) |
| Code completion (IDE) | Codestral | StarCoder2 (legacy, maintained) |
| Self-hosted: best quality | Mistral Large 3 (Apache 2.0) | DeepSeek-V4-Pro (MIT), Xiaomi MiMo-V2.6-Pro (MIT), Kimi K3 (conditional licence) |
| Self-hosted: single GPU, agentic | Meta Muse Glimmer (Apache 2.0, 24GB) | Cohere North Mini Code, Qwen3.8-27B |
| Self-hosted: on-device | Gemma 4 E2B / E4B | Phi-4-mini, Ministral 3 3B |
| Truly open source (auditable) | IBM Granite 4.2 | Olmo 3, NVIDIA Nemotron 3 |
| Regulated industry, clean data | IBM Granite 4.2 | Olmo 3 |
| Arabic-language applications | Falcon-H1 Arabic | Qwen3.8-Max |
| Enterprise RAG with citations | Cohere Command A+ | Claude Sonnet 5 |
| Sovereign / air-gapped deployment | Cohere Command A+ (Apache 2.0) | Mistral Large 3 |
| Multilingual (European) | Mistral Large 3 | Cohere Command A+, GPT-5.6 Terra |
| Machine translation | Cohere North Small Translate (API; free tier) | Cohere `command-a-translate-08-2025` |
| Chinese language | Qwen3.8-Max | Qwen3.8-27B (self-hosted), DeepSeek-V4-Pro |
| Video *understanding* | Gemini 3.1 Pro | Amazon Nova 2 Lite |
| Video *generation* | Gemini Omni 1.1 Flash | MiniMax-H3 |
| Real-time voice (speech-to-speech) | Amazon Nova 2 Sonic | OpenAI `gpt-live-1`, Google Gemini 3.8 Live |
| Speech-to-text | OpenAI `gpt-transcribe` | Gemini 3.5 Transcribe, MAI-Transcribe-2, Mistral Voxtral |
| Image generation | OpenAI `gpt-image-2.5-flare` | Google Nano Banana Pro |
| AWS-native, data residency | Amazon Nova 2 Lite | Claude Sonnet 5 or Opus 5.5 via Bedrock |
| Azure enterprise, OpenAI models | Azure OpenAI Service (GPT-6 Astra / Sol / Luna, GPT-5.6) | Microsoft Foundry |
| GCP-native, large context | Gemini Enterprise Agent Platform + Gemini 3.1 Pro | Gemini 3.8 Flash |
| Oracle Database environment | OCI AI Vector Search | OCI Generative AI |
| Real-time social data | Grok 4.7 | GPT-6 Sol + search |
| Largest context per dollar | Grok 4.3 (1M at $1.25/$2.50) | Gemini 3.8 Flash (1M, introductory pricing) |
| Ultra-low latency (open models) | Groq | Fireworks AI |
| Many open models, one API | Together AI | Fireworks AI, OpenRouter |
| Local development, zero cost | Ollama | LM Studio |
| Self-hosted production serving | vLLM | SGLang (Hugging Face TGI was archived in March 2026) |
| High volume, low cost | GPT-6 Luna ($0.10/$0.50) | DeepSeek V4.1-Flash, Gemini 3.1 Flash-Lite, Claude Haiku 4.5, Amazon Nova 2 Lite |
| Lowest token price, data trade acceptable | Meta Muse Spark Contributor tier ($0.10/$0.20) | GPT-6 Luna (no data trade), DeepSeek V4.1-Flash off-peak for cache-heavy work |

Two rows deserve a caveat rather than a footnote. The **Muse Spark Contributor tier** is cheap because Meta may train on your prompts and completions - it is a data-governance decision before it is a cost decision. And the **DeepSeek off-peak** row depends on your workload being schedulable outside 01:00-04:00 and 06:00-10:00 UTC on weekdays; if it is not, use the peak column. Note too that **DeepSeek is not the cheapest at every tier any more**: GPT-6 Luna's $0.10 input and $0.50 output undercut V4.1-Flash's off-peak cache-miss input ($0.15) and output ($0.60); DeepSeek wins clearly only on cache-hit input ($0.003 off-peak against Luna's $0.01 cached).

---

## Architectural Distinctions

### Dense vs. Mixture-of-Experts

Most LLMs are **dense models**: every parameter is active for every forward pass. **Mixture-of-Experts (MoE)** models route each token through a subset of specialist sub-networks, reducing active parameter count while maintaining total model capacity.

MoE is now the dominant architecture at the open-weight frontier, and the sparsity ratios have become extreme. Current examples: DeepSeek-V4-Pro (roughly 1.7T total, reportedly 48-49B active), Kimi K3 (2.8T total / 104B active, 16 of 896 experts per token), Qwen3.8-Max (2.4T / ~95B active), Mistral Large 3 (675B / 41B), Cohere Command A+ (218B / 25B), MiniMax-M3 (~428B / ~23B), GLM-5.3-Flash (320B / 18B), NVIDIA Nemotron 3 Ultra (550B / 55B), Qwen3.8-Flash-Next (180B repo, ~6B active), Xiaomi MiMo-V2.6-Pro (1.02T / 42B), Tencent Hy4-preview (770B / 49B) and DeepSeek-V4.1-Flash (552B backbone, 8B active in prefill and 16B in decode, plus a 196B lookup memory - a sign that "active parameters" is becoming a less meaningful single number). Historic examples: Mixtral 8x22B (141B / 39B) and DeepSeek V3 (671B / 37B); GPT-4 was widely believed to be MoE but never confirmed.

The practical implication: MoE models at a given quality level require less compute per inference call, but need to load the full model into memory. **That second half is now the binding constraint** - GLM-5.3 at 753B is roughly 756 GB in FP8 and exceeds an 8x80GB node, and DeepSeek-V4-Pro is roughly 893 GB. The models a team can realistically self-host are in the 27B-to-320B band, regardless of how favourable the active-parameter count looks.

A related architectural shift: several current families are **hybrid Mamba-Transformer** rather than pure attention - NVIDIA's whole Nemotron 3 line and TII's Falcon-H1R among them - trading some attention capacity for cheaper long-sequence handling.

### Standard vs. Reasoning Models

**Standard models** generate output token by token based on learned patterns. **Reasoning models** generate an internal chain-of-thought before producing the final answer, spending more compute per call in exchange for higher accuracy on tasks with definite correct answers.

**The separate-reasoning-model era has largely ended.** The models that established the pattern - o1, o3, o4-mini, DeepSeek R1, QwQ-32B - are retired, retiring, or superseded. Reasoning is now a **request parameter** on a general-purpose model almost everywhere: OpenAI exposes `reasoning_effort` across low/medium/high/xhigh/max on GPT-6 Astra, with an added `none` level on GPT-6 Sol; Anthropic uses adaptive thinking steered by an `effort` parameter, with manual extended thinking now returning 400 on Sonnet 5 and later; DeepSeek V4-Pro takes `reasoning_effort` at low/high/max and V4.1-Flash a continuous 1-100 scale; Qwen3.x and IBM Granite 4.2 use a toggleable thinking mode; and Microsoft's Phi-4-reasoning-vision-15B goes further still, deciding for itself when to emit a chain of thought.

What has not changed is the trade-off. Reasoning is not better on all tasks - it is slower and more expensive, and its advantage concentrates on mathematics, formal logic, and complex code analysis. For summarization, translation, or general chat, dial effort down or off; a standard pass is faster and cheaper with equivalent quality. The difference is that you can now make that choice per request instead of per integration.

### Gated Frontier Capabilities

A pattern that did not exist in mid-2026 and now appears at three of the largest labs: a frontier capability - specifically cyber - that exists, is documented, and **cannot simply be bought**. OpenAI gates its elevated-cyber Astra configuration behind **Daybreak** (Blue for general security work, Red for pen-testing and exploit validation, both from 7 August 2026). Google gates **Gemini 3.8 Flash Cyber** behind the **Fairwind Program**, prioritising vetted government authorities, critical infrastructure operators and maintainers of widely used software. Anthropic gates **Mythos 5.1** behind **Project Glasswing**, via a Cyber Verification Program and a Life Sciences Verification Program, currently restricted to a set of US organisations - and applies the same logic one tier down: **Opus 5.5** ships with Fable-level safeguards, with biology research access through the Life Sciences Verification Program and cyber access promised through the Cyber Verification Program "in the coming weeks". Z.ai went further in the other direction, delaying GLM-5.3's weights by two weeks on stated offensive-cyber grounds.

Two practical consequences. First, **published benchmark results for these configurations do not describe what you will get by default** - Astra's cyber results in particular reflect Daybreak-configured access. Second, if security work is your use case, access is an application process with a lead time, not a procurement line item, and it belongs in your project schedule.

---

## Further Reading

- [LLM Glossary Entry](/glossary/llm/): technical foundations of how large language models work
- [Claude vs ChatGPT: Enterprise Comparison](/comparisons/claude-vs-chatgpt/): detailed side-by-side of the two most deployed models
- [LLM Evaluation Methods](/guides/llm-evaluation-methods/): how to evaluate which model fits your workload
- [LLM Cost Optimization](/guides/llm-cost-optimization/): reducing inference spend across providers
- [LLM Gateway Architecture](/guides/llm-gateway-architecture/): routing between providers, fallback, and cost control
- [Multi-Provider LLM Failover](/patterns/multi-provider-llm-failover/): resilience patterns across model providers
- [Amazon Bedrock](/tools/amazon-bedrock/): accessing multiple models via a single AWS API
- [Anthropic Models Overview](https://platform.claude.com/docs/en/about-claude/models/overview): official model IDs, context windows, and retirement floors
- [Anthropic Pricing](https://platform.claude.com/docs/en/about-claude/pricing): per-model rates, cache-write and cache-read multipliers, the tokenizer note, and the Sonnet 5 permanent-pricing statement
- [Anthropic Model Deprecations](https://platform.claude.com/docs/en/about-claude/model-deprecations): full lifecycle table with retirement dates
- [Introducing Claude Fable 5.1 and Claude Mythos 5.1](https://www.anthropic.com/claude-fable-and-mythos-5-1): the 1 September 2026 announcement, including the CVP and LSVP gating programmes
- [Introducing Claude Opus 5.5](https://www.anthropic.com/claude-opus-5-5): Anthropic's 22 September 2026 announcement, with pricing against Opus 5, safeguards, preserved thinking and ZDR availability
- [Claude Opus 5.5 on Amazon Bedrock](https://aws.amazon.com/about-aws/whats-new/2026/09/claude-opus-5-5-aws/): AWS's 22 September 2026 availability announcement, including GovCloud
- [OpenAI API Models](https://developers.openai.com/api/docs/models): current model list, context windows, and knowledge cutoffs
- [OpenAI API Pricing](https://developers.openai.com/api/docs/pricing): per-MTok rates, the GPT-5.6 Sol promotional footnote, and Fast/Batch/Flex multipliers
- [OpenAI Deprecations](https://developers.openai.com/api/docs/deprecations): every retirement date cited above, with named replacements
- [OpenAI API Changelog](https://developers.openai.com/api/docs/changelog): the GPT-6 Astra release, the Daybreak access tiers, and the September 2026 image and platform changes
- [GPT-6 Sol model page](https://developers.openai.com/api/docs/models/gpt-6-sol.md): context, knowledge cutoff, effort levels, endpoints and the 272K long-context billing rule (22 September 2026)
- [GPT-6 Luna model page](https://developers.openai.com/api/docs/models/gpt-6-luna.md): Luna's specifications and pricing (22 September 2026)
- [GPT-6 Astra, Sol and Luna in Microsoft Foundry](https://azure.microsoft.com/en-us/blog/gpt-6-astra-sol-and-luna-for-production-agents-in-microsoft-foundry/): Microsoft's 22 September 2026 GA announcement, including US and EU Data Zone availability
- [GPT-6 Astra on Amazon Bedrock](https://aws.amazon.com/about-aws/whats-new/2026/09/openai-gpt-6-astra-on-amazon-bedrock/): AWS's 8 September 2026 general-availability announcement
- [Foundry Models sold directly by Azure](https://learn.microsoft.com/en-us/azure/foundry/foundry-models/concepts/models-sold-directly-by-azure): Astra's Azure version, context limits, quota tiering, and deployment constraints
- [Google Gemini API Models](https://ai.google.dev/gemini-api/docs/models): current Gemini and Gemma model list with stable/preview status
- [Google Gemini API Pricing](https://ai.google.dev/gemini-api/docs/pricing): current per-MTok rates and the expiring introductory Flash window
- [Gemini 3.8 Flash and 3.8 Flash Cyber](https://blog.google/innovation-and-ai/models-and-research/gemini-models/3-8-flash-and-3-8-flash-cyber/): Google's 2 September 2026 announcement
- [Gemini API changelog](https://ai.google.dev/gemini-api/docs/changelog): Gemini 3.8 Live (15 September 2026), 3.8 Flash TTS (22 September 2026), the Gemini 2.5 restriction (18 September 2026) and the `gemini-omni-flash-preview` shutdown
- [Gemini 3.8 Live with Live Avatar](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-8-live-with-live-avatar/): Google's 24 September 2026 post
- [Gemma 4 model card](https://ai.google.dev/gemma/docs/core/model_card_4): sizes, parameter counts, context windows, modalities, and the Apache 2.0 licence
- [Meta AI developer site](https://developer.meta.com/ai/): the current Meta model catalogue - Muse Spark, Muse Glimmer, Muse Image, Muse Voice Transcribe, Llama 4 and Llama 3. `llama.com` now redirects here
- [Introducing Muse Spark 1.3](https://research.meta.ai/blog/introducing-muse-spark-1-3): Meta's 2 September 2026 release post, including the efficiency claims and the open-weights roadmap item
- [Introducing Muse Spark and the Meta Model API](https://ai.meta.com/blog/introducing-muse-spark-meta-model-api/): the 9 July 2026 API launch
- [Introducing Muse, a personal AI agent](https://about.fb.com/news/2026/09/introducing-muse-personal-ai-agent/): Meta's 8 September 2026 launch post
- [Introducing Meta One](https://about.fb.com/news/2026/09/introducing-meta-one-subscription-service-more-features-ai/): Meta's 15 September 2026 subscription announcement
- [The biggest news from Connect 2026](https://about.fb.com/news/2026/09/the-biggest-news-from-connect-2026/): Meta's 23-24 September 2026 roundup
- [Muse, Meta's extraordinarily privileged AI assistant, has a serious 0-day](https://arstechnica.com/security/2026/09/muse-metas-extraordinarily-privileged-ai-assistant-has-a-serious-0-day/): Ars Technica, 21 September 2026
- [Mistral Models Documentation](https://docs.mistral.ai/getting-started/models/): current catalogue, version stamps, licences, and deprecations
- [Mistral API Pricing](https://mistral.ai/pricing/api): current per-MTok USD pricing across the lineup
- [Mistral changelog](https://docs.mistral.ai/getting-started/changelog): OCR 4.1 GA (31 August 2026) and the Leanstral 1.5 retirement (30 September 2026)
- [DeepSeek API Pricing](https://api-docs.deepseek.com/quick_start/pricing): the current V4 model list and the peak/off-peak price table
- [DeepSeek API Updates](https://api-docs.deepseek.com/updates): the full changelog, including the July 2026 alias discontinuation, the V4-Pro GA, and the 10 September 2026 V4.1-Flash release with the V4-Flash retirement and V4-Pro continuation notice
- [DeepSeek-V4.1-Flash on Hugging Face](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash): architecture, parameter counts, reasoning-effort scale and the MIT licence (10 September 2026)
- [Alibaba Cloud Model Studio models](https://www.alibabacloud.com/help/en/model-studio/models): the current Qwen text-generation line-up and model IDs
- [Alibaba Cloud Model Studio: newly released models](https://www.alibabacloud.com/help/en/model-studio/newly-released-models): `qwen3.8-max-0902`, Qwen3.8-Omni-Flash and the other September 2026 releases
- [Qwen-Image-2.1](https://qwen.ai/blog?id=qwen-image-2.1): Qwen's 14 September 2026 release post
- [Qwen on Hugging Face](https://huggingface.co/Qwen): Qwen3.8 open-weight model cards and their individual LICENSE files
- [Kimi K3 on Hugging Face](https://huggingface.co/moonshotai/Kimi-K3): specifications and the Kimi K3 License
- [Z.ai pricing](https://docs.z.ai/guides/overview/pricing): current GLM model rates
- [Xiaomi MiMo-V2.6-Pro-RL on Hugging Face](https://huggingface.co/XiaomiMiMo/MiMo-V2.6-Pro-RL): specifications and MIT licence (21 September 2026)
- [Tencent Hy4-preview on Hugging Face](https://huggingface.co/tencent/Hy4-preview): specifications, known issues and Apache 2.0 licence (27 August 2026)
- [xAI Model Catalogue](https://docs.x.ai/developers/models): current Grok models, context windows, and tiered pricing
- [Grok 4.7 developer guide](https://docs.x.ai/developers/grok-4-7.md): Grok 4.7's context, cutoff, reasoning levels, pricing and prompt-caching advice (September 2026)
- [xAI release notes](https://docs.x.ai/docs/release-notes.md): Grok 4.7, `grok-voice-transcribe-2.0` and the `grok-imagine-image-quality` retirement
- [Cohere Models](https://docs.cohere.com/docs/models): full current catalogue with context windows, deprecations, and retirements
- [Introducing Command A+](https://cohere.com/blog/command-a-plus): the 20 May 2026 announcement and Apache 2.0 release
- [Cohere changelog](https://docs.cohere.com/changelog): North Small Translate (9 September 2026), Cohere Parse (27 August 2026) and the tiny-aya releases
- [Amazon Bedrock model lifecycle (legacy)](https://docs.aws.amazon.com/bedrock/latest/userguide/model-lifecycle-legacy.html): the Legacy and End-of-Life dates for Nova Premier, Sonic v1, Canvas, and both Reel versions
- [Amazon Bedrock model lifecycle](https://docs.aws.amazon.com/bedrock/latest/userguide/model-lifecycle.html): the Active, Legacy and EOL policy for models launched on or after 7 September 2026
- [Amazon Nova 2 user guide](https://docs.aws.amazon.com/nova/latest/nova2-userguide/what-is-nova-2.html): the current Nova 2 model table and feature set
- [Migrating from Amazon Nova 1 to Amazon Nova 2](https://aws.amazon.com/blogs/machine-learning/migrate-from-amazon-nova-1-to-amazon-nova-2-on-amazon-bedrock/): AWS's own March 2026 migration guidance routing Nova 1 Lite, Pro, and Premier to Nova 2 Lite
- [Amazon Bedrock Pricing](https://aws.amazon.com/bedrock/pricing/): Nova per-MTok rates and the Global vs Geo cross-region tiers
- [Microsoft MAI launch announcement](https://microsoft.ai/news/building-a-hillclimbing-machine-launching-seven-new-mai-models/): the seven first-party MAI models from Build 2026
- [Introducing MAI-Thinking-1](https://microsoft.ai/news/introducing-mai-thinking-1/): Microsoft's 12 August 2026 public-preview announcement
- [Phi-4-reasoning-vision](https://www.microsoft.com/en-us/research/blog/phi-4-reasoning-vision-and-the-lessons-of-training-a-multimodal-reasoning-model/): Microsoft Research's 4 March 2026 post on selective reasoning
- [NVIDIA Nemotron](https://developer.nvidia.com/topics/ai/nemotron): the current Nemotron family, context windows, and NIM endpoints
- [Nemotron 3.5 Lightning and NeMo Switchyard](https://blogs.nvidia.com/blog/nemotron-lightning-switchyard-rtx-dgx/): the 11 August 2026 release
- [Nemotron-3-Labs-Ultra-Math-RL on Hugging Face](https://huggingface.co/nvidia/Nemotron-3-Labs-Ultra-Math-RL): the 3 September 2026 maths checkpoint and its IMO 2026 ensemble context
- [Introducing Granite 4.2](https://research.ibm.com/blog/introducing-granite-4-2): IBM's 25 August 2026 announcement with sizes, thinking modes, and benchmarks
- [IBM Granite Models on Hugging Face](https://huggingface.co/ibm-granite): official IBM Granite model cards with training data disclosure
- [Olmo 3](https://allenai.org/blog/olmo3): Ai2's release post covering the 7B and 32B models, Dolma 3, and Dolci
- [AllenAI on Hugging Face](https://huggingface.co/allenai): OLMo model weights, training code, and datasets
- [BigCode StarCoder2 on Hugging Face](https://huggingface.co/bigcode): StarCoder2 model cards and The Stack v2 dataset documentation
- [TII Falcon Models](https://falconllm.tii.ae/falcon-models.html): the current Falcon family, including Falcon-H1R and Falcon-H1 Arabic
- [Databricks retired models policy](https://learn.microsoft.com/en-us/azure/databricks/machine-learning/retired-models-policy): DBRX and Mixtral retirement dates and Databricks' recommended replacements
- [Groq API Documentation](https://console.groq.com/docs/openai): OpenAI-compatible API reference
- [Groq Supported Models](https://console.groq.com/docs/models): production, preview and enterprise model list (checked 25 September 2026)
- [Together AI Serverless Models](https://docs.together.ai/docs/serverless-models): hosted open-weight models and pricing (checked 25 September 2026)
- [Hugging Face Inference Providers](https://huggingface.co/docs/inference-providers/index): serverless access to partner-hosted models with one token
- [Fireworks AI Models](https://fireworks.ai/models): model catalog with structured output documentation
- [Ollama Model Library](https://ollama.com/library): searchable catalog of locally runnable models and pull commands
- [vLLM Documentation](https://docs.vllm.ai/): installation, configuration, and OpenAI-compatible server setup
- [Microsoft Foundry Model Catalog](https://ai.azure.com/explore/models): browsable model catalog with deployment options
- [Vertex AI Model Garden](https://cloud.google.com/vertex-ai/generative-ai/docs/model-garden/explore-models): GCP-hosted open and commercial models
- [OCI Generative AI Service](https://docs.oracle.com/en-us/iaas/Content/generative-ai/home.htm): Oracle's managed LLM API documentation
