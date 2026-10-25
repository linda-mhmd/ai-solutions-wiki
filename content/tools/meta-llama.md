---
title: "Meta Muse Spark and Llama"
description: "Meta's model line-up in 2026: the proprietary Muse Wonder and Muse Spark models sold through the Meta Model API, the open-weight Muse Spark Open (bespoke licence) and Muse Glimmer (Apache 2.0), and the legacy Llama family."
date: 2026-06-29
last_updated: 2026-10-25
lastmod: 2026-10-25
last_verified: 2026-10-25
tags: ["open-weight", "llm", "foundation-models", "meta", "muse-spark", "muse-spark-open", "muse-wonder", "muse-glimmer", "self-hosting"]
tool_category: "AI"
related:
  - glossary/foundation-models
  - glossary/llm
  - glossary/mixture-of-experts
  - tools/alibaba-qwen
  - tools/mistral-ai
  - tools/deepseek
  - comparisons/llm-landscape-2026
  - comparisons/meta-ai-vs-chatgpt
  - news/meta-muse-spark-model-api
  - news/ai-agent-security-roundup-september-2026
  - news/meta-muse-wonder-and-spark-open
  - tools/meta-muse
---

<figure class="bz-figure">
  <img src="/img/shaping-ai/stacked-server-block-red-notext.png" alt="A multi-layer server block with red strips, representing a model vendor selling both downloadable weights and a hosted API." loading="lazy">
  <figcaption>Meta now sits on both sides of the open-versus-closed line: downloadable weights for Muse Spark Open, Muse Glimmer and Llama, a paid proprietary API for Muse Wonder and Muse Spark.</figcaption>
</figure>

Meta ships models under two brands, and the balance between them has changed completely during 2026. **Muse Spark** is the proprietary model line from Meta Superintelligence Labs, announced on 8 April 2026: closed weights, sold through the paid Meta Model API, and the model running the Meta AI assistant across Meta's apps. Since 12 October 2026 it is no longer Meta's top model: Meta calls **Muse Wonder** and **Muse Wonder Full** "our most capable models to date". And since 15 October 2026 an open-weight Muse Spark exists, **Muse Spark Open**, under a bespoke licence. **Llama** is the open-weight family that built Meta's reputation in [foundation models](/glossary/foundation-models/), first released on 24 February 2023. Llama weights are still downloadable and still widely used, but Meta has shipped no new Llama model since Llama 4 on 5 April 2025, and Llama's role as Meta's active open-weight line has passed to the Muse models: **Muse Glimmer**, a 30 billion parameter Apache 2.0 model released on 10 August 2026, and **Muse Spark Open**, an 816 billion parameter model released on 15 October 2026 under the Muse Model License.

If you came here to pick a Meta model in October 2026, the short version is this. Muse Wonder is Meta's most capable hosted model, and Muse Spark 1.3 the cheaper hosted, frontier-class [LLM](/glossary/llm/), both with a 1 million token context. Muse Spark Open is the large open-weight option if its licence and its hardware needs fit. Muse Glimmer is the choice for local or single-GPU agent work, and it is still the only Meta model with a genuinely permissive (Apache 2.0) licence and ungated download. Llama 4 remains a reasonable choice only when you specifically want its [mixture-of-experts](/glossary/mixture-of-experts/) architecture, its very large ecosystem of community fine-tunes, or its extreme stated context window - not because it is where Meta's engineering effort now goes.

## Where Meta's models sit

<div class="bz-arch">
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Application</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Meta AI assistant</span>
      <span class="bz-arch-chip">Muse agent and Muse Code</span>
      <span class="bz-arch-chip">Your own apps and agents</span>
      <span class="bz-arch-chip-note">Meta's products and yours call the same models</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Access</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Meta Model API</span>
      <span class="bz-arch-chip">Hugging Face, Ollama, vLLM</span>
      <span class="bz-arch-chip">Third-party hosts</span>
      <span class="bz-arch-chip-note">Closed endpoint, your own servers, or someone else's</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Models</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Muse Wonder (closed)</span>
      <span class="bz-arch-chip">Muse Spark 1.3 (closed)</span>
      <span class="bz-arch-chip">Muse Spark Open (Muse Model License)</span>
      <span class="bz-arch-chip">Muse Glimmer (Apache 2.0)</span>
      <span class="bz-arch-chip">Llama 4 (community license)</span>
      <span class="bz-arch-chip-note">Three lines, three licenses</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Hardware</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Meta's cloud</span>
      <span class="bz-arch-chip">Your GPU servers</span>
      <span class="bz-arch-chip">A single 24GB GPU or Mac</span>
      <span class="bz-arch-chip-note">Muse Glimmer is sized to run locally</span>
    </div>
  </div>
</div>

## The Muse line

Muse Spark versions have arrived roughly every four weeks, so check Meta's developer site before pinning anything in production.

- **Muse Wonder** and **Muse Wonder Full** (12 October 2026): Meta's "most capable models to date", built on Muse Spark. Muse Wonder (`muse-wonder-1.0`) is on the Meta Model API at $4.00 input, $0.20 cached input and $20.00 output per MTok with a 1M context; Muse Wonder Full (`muse-wonder-full-1.0`, 1M context) is available only through a Muse Code subscription, on the Power Usage and Maximum Usage plans. Meta says Muse Wonder "will soon power experiences in Muse, and will roll out first to subscribers", so the consumer agent still runs on Muse Spark for now. Meta's benchmark table compares both against Claude Fable 5.1, GPT-6 Astra and Claude Opus 5.5; those are Meta's figures, not independent runs. Closed weights. See [Meta Muse](/tools/meta-muse/).
- **Muse Spark Open** (15 October 2026): the open-weight Muse Spark, which Meta calls "the most capable US open-weight model to date". A natively multimodal mixture-of-experts model with **816B total and 42B active parameters** (256 experts, 8 active per token, per the model card) and a 1M-token context. Weights are on Hugging Face (`meta-models/Muse-Spark-Open-816B-A42B`), SageMaker AI, Google Cloud Model Garden and Microsoft Foundry, and hosted by Baseten, Fireworks AI, Groq, Modal, Nebius, OpenRouter and Together AI. The Hugging Face repository is **gated with manual approval**. Meta says it runs on two Apple M5 Ultra Mac Studios with MLX. Meta's model page says it is "derived from the Muse Spark model we released in August", which on the dates below is Muse Spark 1.2 (5 August), the version pledged for open weights; Meta does not give a version number itself. Licence: the **Muse Model License**, see below.
- **Muse Spark 1.3** (2 September 2026): the current Muse Spark API model, now below Muse Wonder. Multimodal input and text output, with a 1 million token context window. Meta lists text, image and video input; some third-party trackers also list audio, which we could not confirm against Meta. Both reasoning tiers are now available through the Meta Model API and Muse Code: "xhigh" shipped broadly on launch day, and the stronger "max" tier - held back at launch for additional safety testing, and still described as a limited partner preview in reporting on 3 September - was announced as generally available by Meta in the week after launch. Meta's own headline claim is efficiency rather than raw ceiling: roughly 20% fewer tool calls and 25% fewer tokens than 1.2 on comparable engineering tasks, plus a model more willing to ask clarifying questions on ambiguous prompts. Closed weights.
- **Muse Spark 1.2** (5 August 2026): the coding-focused release, launched alongside Muse Code and still listed as available. Mark Zuckerberg and Alexandr Wang publicly pledged on 10 August 2026 that 1.2 would get an open-weight release "soon", with no date attached. That pledge was met in a different form on 15 October 2026 with Muse Spark Open (above); this page said until then that no Muse Spark weights had been published and to plan as if Muse Spark was closed, which is no longer true for the open release. The hosted Muse Spark 1.x models remain closed.
- **Muse Spark 1.1** (9 July 2026): the release that opened the Meta Model API to developers in public preview, OpenAI-compatible and US-first at launch. It introduced native tool use, MCP server support and custom skills, and shipped as "Thinking" mode in the Meta AI app.
- **Muse Glimmer** (10 August 2026): Meta's small open-weight model, and since 15 October no longer its only one. A 30 billion parameter dense multimodal model with a 128,000 token context, distilled from Muse Spark and then mid-trained, fine-tuned and reinforcement-trained for long-context agent work rather than chat. Weights are ungated on Hugging Face under **Apache 2.0**, with quantized variants and a speculative-decoding drafter; at roughly 4-bit it fits under 20GB, so it runs on a single 24GB or 32GB GPU or an Apple silicon Mac. Also served through Ollama, LM Studio, vLLM and OpenRouter.
- **Muse Code** (5 August 2026, beta): a terminal coding agent for macOS and Linux that plans changes, writes code and validates results across large repositories, with background subagents and a local event log for replay-exact restarts. It bills against Meta Model API tokens at Muse Spark rates. This is Meta's entry into the same category as Claude Code and Codex.
- **Muse** (8 September 2026): a consumer personal AI agent, not a model, now covered in full on its own page, [Meta Muse, explained](/tools/meta-muse/), including its Sentinel security design, the controversies of its first month and why it is not available in the EU. In short: it is rolling out in the US on iOS, Android and the muse.ai website, also reachable by messaging it in WhatsApp, with AI glasses support to follow. It runs on Muse Spark inside a dedicated VM ("Muse Secure VM") in Meta's cloud, with a separate Sentinel agent approving internet-bound actions, and connects to email, calendar, payments, shopping and smart home. Meta's own announcement describes a free tier "for most of what people need" plus subscription plans without naming prices; launch coverage across several outlets consistently quotes $20/month and $100/month tiers. Treat those figures as well corroborated but not stated by Meta. A macOS app is also available. At **Connect 2026 (23-24 September)** Meta said Muse is coming to its AI glasses "in the coming months" (able to act on what the wearer is looking at), added a voice mode that keeps working in the background during a conversation, gave Muse its own email address, and added connectors including Walmart, Best Buy, Sephora, Wayfair, Shop Pay and PayPal for shopping and Notion, Granola, GitHub and Box for work. It also previewed **Muse Charm**, a pocket device for talking to Muse with a real-time voice model, with details promised later in 2026.
- **Muse security, September 2026**: on 21 September Ars Technica reported a zero-day in the **Muse macOS app**, found by macOS security researcher Patrick Wardle: any locally running app or terminal command could change undocumented Muse settings, including the endpoint used for cloud transcription, and so capture the token that authenticates the user's Muse account - giving malware on the Mac full control of an agent that holds the user's email, calendar, payment and device permissions. Meta shipped a hotfix more than 12 hours after the report was published. The flaw was in the Mac client rather than the model, but it is a concrete example of the risk of giving one agent broad delegated access. See [AI agent security, September 2026](/news/ai-agent-security-roundup-september-2026/).
- **Meta One** (15 September 2026): a subscription umbrella, not a model. The Core ($7.99/month) and Premium bundles add higher usage of compute-intensive Meta AI features, including image and video generation powered by Muse models; single-app plans start at $2.99/month and creator and business bundles at $14.99/month. Meta says the core Meta AI experience stays free. For developers it changes nothing about Meta Model API pricing, which is billed separately per token.
- **Muse Image** and **Muse Voice Transcribe**: listed on Meta's developer site at $0.01 per image and $0.18 per hour respectively. We could not establish release dates or specifications for either.

## What Muse Spark costs

The commercially distinctive thing about Meta right now is not the flagship model, it is the second price tier attached to it.

| Endpoint | Input | Cached input | Output | Catch |
|---|---|---|---|---|
| **Standard** | $1.25 / MTok | $0.15 / MTok | $4.25 / MTok | Normal commercial terms; reported 3,000 requests per minute |
| **Contributor** | $0.10 / MTok | $0.002 / MTok | $0.20 / MTok | Meta may train on your prompts and completions; 100 requests per minute |

These are Meta's own published figures, not a tracker's reconstruction: the Muse Spark page on Meta's developer site lists the two tiers as separately named served models, `muse-spark-1.3` and `muse-spark-1.3-contributor`, with the cache rates shown above. Artificial Analysis independently corroborates the standard tier's $0.15 cache-hit rate. Web Search Grounding is charged at $2.50 per 1,000 queries on top of whatever tokens the request burns.

The structure is the point. The Contributor endpoint is roughly a twelvefold discount on input in exchange for training rights over everything you send. That is a reasonable trade for public content, evaluation runs and hobby projects, and the wrong trade for anything confidential, regulated or customer-owned. Read the endpoint name as the data policy it is.

## The Llama family, now legacy

Llama has shipped nothing new since 5 April 2025. There is no Llama 4.5 and no Llama 5, despite claims to that effect circulating on AI-generated content sites; Meta's own announcements and release history contradict them. What actually exists:

- **Llama 4 Scout**: 17 billion active parameters, 16 experts, 109 billion total, natively multimodal, with a stated context window of 10 million tokens.
- **Llama 4 Maverick**: 17 billion active parameters, 128 experts, 400 billion total, natively multimodal, 1 million token context.
- **Llama 4 Behemoth**: previewed in April 2025 at roughly 288 billion active and 2 trillion total parameters, delayed from mid-2025 and never released. Reporting attributed the delay to a mid-training change to expert routing and to chunked attention creating blind spots at chunk boundaries. Meta has never formally cancelled it and has given no timeline, so treat it as shelved rather than upcoming.

Two practical consequences. Meta retired its own hosted Llama API on 6 July 2026 and pointed developers at third parties, so Meta no longer serves Llama inference itself - use [Amazon Bedrock](/tools/amazon-bedrock/), [Together AI](/tools/together-ai/), [Groq](/tools/groq/) or your own hardware. And llama.com now 301-redirects to developer.meta.com/ai/, where Llama 4 and Llama 3 appear as two entries among Muse Spark 1.1, 1.2 and 1.3, Muse Glimmer, Muse Image and Muse Voice Transcribe.

Muse Spark is also displacing Llama inside Meta's own hardware: it is replacing Llama 4 as the assistant on Ray-Ban Meta and Oakley Meta glasses in the US and Canada, with Meta Ray-Ban Display still running a custom Llama 4 at the most recent report. Meta's stated justification is that Muse Spark matches Llama 4 Maverick's performance at roughly one tenth the compute.

## How to access it

Pick the line first, because the access path and the license follow from it.

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 1</span>
    <span class="bz-flow-step-name">Pick a line</span>
    <span class="bz-flow-step-desc">Muse Spark for a hosted frontier model, Muse Glimmer for weights you run, Llama 4 for the legacy ecosystem.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 2</span>
    <span class="bz-flow-step-name">Get access</span>
    <span class="bz-flow-step-desc">An OpenAI-compatible key from the Meta Model API, or weights from Hugging Face after accepting the license.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 3</span>
    <span class="bz-flow-step-name">Serve and customise</span>
    <span class="bz-flow-step-desc">Call the API, or self-host with vLLM or Ollama and fine-tune on your own data.</span>
  </div>
</div>

**The Meta Model API.** Launched with Muse Spark 1.1 on 9 July 2026 and OpenAI-compatible, so a client library swap is usually enough to try it. It serves the Muse Spark versions and backs Muse Code. Standard and Contributor endpoints are exposed as distinct served models, including on OpenRouter, which makes the data-terms choice explicit rather than a hidden account setting.

**Self-hosting.** Download Muse Glimmer, Muse Spark Open (after Meta approves your access request) or Llama 4 from [Hugging Face](/tools/huggingface/) and serve with [vLLM](/tools/vllm/) or [Ollama](/tools/ollama/) on your own GPUs. This is the path for data residency, offline operation and unrestricted fine-tuning. Muse Glimmer is the one Meta designed for it - a single-GPU, always-on local agent model - where Llama 4 Maverick's 400 billion total parameters need real infrastructure.

**Licensing differs by line, and the difference is material.** Muse Wonder and the hosted Muse Spark 1.x models are proprietary. **Muse Spark Open** is under the **Muse Model License**, which Meta describes as having "limited commercial terms". It reads like a permissive licence (use, modify, fine-tune, distill, sell) with three conditions: you must comply with an attached Usage Policy; you must "prominently display 'Built with Muse Spark Open'" in each product or service that uses it or a derivative; and if you offer models to third parties as a service ("Model as a Service") and your group's "aggregate gross revenue ... exceeds twenty (20) million US dollars" in any 12 months, you must notify Meta and sign a separate agreement before offering it. Internal use, research and using it to power features of your own product are excluded from that trigger. It is not an OSI-approved licence. Muse Glimmer is Apache 2.0, which is a genuine change: it drops the conditions that made Llama awkward in legal review. Llama 4 remains governed by the Llama 4 Community License Agreement and its Acceptable Use Policy - commercial use is permitted, but it is not an OSI-approved open-source license, it carries use restrictions, and it has historically required a separate license above a large-deployer threshold. Read whichever one applies before you ship.

## How it compares

Meta is now on both sides of the axis this table used to have it on.

| | Muse Spark 1.3 | Muse Spark Open | Muse Glimmer | Llama 4 | Alibaba Qwen | Closed API (Claude, Gemini) |
|---|---|---|---|---|---|---|
| **Weights** | Not released | Downloadable, gated (manual approval) | Downloadable, ungated | Downloadable | Downloadable | Not released |
| **License** | Proprietary | Muse Model License (attribution, usage policy, US$20M MaaS revenue trigger) | Apache 2.0 | Community license, use limits | Apache 2.0 on many models | Proprietary API only |
| **Size** | not published | 816B total, 42B active | 30B dense | MoE; Maverick 400B total | Varies by model | not published |
| **Context** | 1M tokens | 1M tokens | 128K tokens | 10M (Scout), 1M (Maverick) claimed | Varies by model | Varies by model |
| **Multimodal** | Text, image, video in | Yes | Yes | Yes | Yes (several models) | Yes |
| **Actively developed** | Yes, roughly monthly | New, 15 Oct 2026 | Yes | No new release since April 2025 | Yes | Yes |
| **Best for** | Cheap long-context agent work | Large self-hosted agent and coding work | Local always-on agents | Existing fine-tune ecosystems | Multilingual, permissive terms | No infra, fastest to start |

On where Muse Spark actually ranks, use the tier-by-tier numbers rather than a single headline figure. Artificial Analysis scores Muse Spark 1.3 at 61 on its Intelligence Index at the xhigh tier - level with GPT-5.6 Sol (max), Grok 4.6 (high) and Claude Opus 5 (high) - and 62 at the max tier, behind only Claude Fable 5.1 and Claude Opus 5 at their own top settings. That is a real climb: 1.1 entered at 53 in July and 1.2 at 57 in August. Note that Artificial Analysis's per-model summary page has at times shown a much lower unqualified figure than its own published analysis, so cite the tier you mean. The widely quoted "sixth of 636 models" figure is Artificial Analysis's own overall ranking for the max tier, not a rival tracker's; llm-stats, scoring separately, places 1.3 fifth on its LLM Stats Score. Different indices land in the same neighbourhood but not the same slot, so treat any single leaderboard position as one methodology's opinion rather than a fact about the model. Meta's own scorecard benchmarks 1.3 against GPT-5.6 Sol and Claude Opus 5 at their top tiers, and a secondary reading of that chart has Opus 5 ahead on four of six agent benchmarks while Muse Spark takes the coding rows and near-perfect long-context retrieval. Meta's published figures render as an image, so quote specific benchmark scores with the source attached or not at all. These rankings predate two September releases: Anthropic's **Claude Opus 5.5** (22 September 2026), which superseded Opus 5 as Anthropic's recommended Opus model, and xAI's **Grok 4.7**, which replaced Grok 4.6 as xAI's flagship in September 2026. Neither was in the comparison set above, so read "level with Opus 5 and Grok 4.6" as a comparison with the previous generation of both. The fair summary is that Muse Spark 1.3 is genuinely in the frontier cluster without setting the frontier, and that its distinguishing features are price, the 1 million token window and long-context retrieval.

See [Alibaba Qwen](/tools/alibaba-qwen/), [Mistral AI](/tools/mistral-ai/), and [DeepSeek](/tools/deepseek/) for the other major open-weight options, and the [LLM landscape 2026](/comparisons/llm-landscape-2026/) for the full picture including closed providers.

## When not to use it

- **You need frontier-class weights you can hold under a standard licence.** Muse Spark Open is now downloadable, but it is gated, it carries an attribution requirement and a US$20M revenue trigger for model-as-a-service businesses, and at 816B parameters it needs serious hardware (Meta's smallest stated setup is two 512 GB Mac Studios). If you need an OSI-approved licence, Muse Glimmer's 30B ceiling or another vendor's Apache 2.0 or MIT model is the plan.
- **A vendor must not train on your data.** The Contributor tier's discount is paid for in training rights. Use the standard endpoint, or self-host.
- **You are standardising on Llama for the long term.** Nothing new has shipped since April 2025, Meta's frontier work has moved wholesale to Muse, and Meta no longer hosts Llama itself. Continuing to run Llama 4 is fine; building a multi-year roadmap on future Llama releases is not.
- **The Llama Community License clashes with your case.** Muse Glimmer resolves this inside Meta's own line-up at Apache 2.0, and Qwen or Mistral open models are alternatives if you need a larger permissively licensed option.
- **You want the single strongest general model regardless of price.** Muse Spark competes on cost and context, not on topping every index. Benchmark against your own workload before committing.

## Further reading

- [What are foundation models?](/glossary/foundation-models/): the model category both Muse and Llama belong to.
- [What is a large language model?](/glossary/llm/): the core concept behind every model on this page.
- [What is mixture of experts?](/glossary/mixture-of-experts/): the architecture Llama 4 uses.
- [Meta AI vs ChatGPT](/comparisons/meta-ai-vs-chatgpt/): what actually runs inside the consumer assistant, and what it costs.
- [Meta Muse, explained](/tools/meta-muse/): the personal agent built on Muse Spark, in depth.
- [Meta ships Muse Spark 1.1 and opens the Meta Model API](/news/meta-muse-spark-model-api/): how Meta's first-party API changed the build-versus-download decision.
- [Alibaba Qwen](/tools/alibaba-qwen/): a permissively licensed open-weight alternative.
- [LLM landscape 2026](/comparisons/llm-landscape-2026/): how open and closed models compare.
- [Meta AI developer site](https://developer.meta.com/ai/): the current model list, downloads and documentation, and where llama.com now redirects.

## Sources

- [Introducing Muse Spark, Meta newsroom, 8 April 2026](https://about.fb.com/news/2026/04/introducing-muse-spark-meta-superintelligence-labs/): the launch announcement, closed-weight status, and the assistant rollout across Meta's apps.
- [Introducing Muse Spark 1.1 and the Meta Model API, Meta AI blog, 9 July 2026](https://ai.meta.com/blog/introducing-muse-spark-meta-model-api/): API public preview, OpenAI compatibility, 1M context, MCP and skills support.
- [Muse Spark Open model page, Meta for Developers, fetched 25 October 2026](https://dev.meta.ai/models/muse-spark-open): "derived from the Muse Spark model we released in August".
- [Introducing Muse Code and Muse Spark 1.2, Meta AI Research, 5 August 2026](https://research.meta.ai/blog/introducing-muse-code-and-muse-spark-1-2): the coding release and Muse Code beta details.
- [Introducing Muse Spark 1.3, Meta AI Research, 2 September 2026](https://research.meta.ai/blog/introducing-muse-spark-1-3): the ~20% fewer tool calls and ~25% fewer tokens claims, availability, and open weights listed as a roadmap item.
- [Introducing Muse, Meta newsroom, 8 September 2026](https://about.fb.com/news/2026/09/introducing-muse-personal-ai-agent/): the consumer agent, its Muse Spark basis, and the free-plus-subscription framing.
- [Introducing Meta One, Meta newsroom, 15 September 2026](https://about.fb.com/news/2026/09/introducing-meta-one-subscription-service-more-features-ai/): plan structure, prices and the Muse-powered media-generation allowances.
- [The biggest news from Connect 2026, Meta newsroom, 24 September 2026](https://about.fb.com/news/2026/09/the-biggest-news-from-connect-2026/): Muse on AI glasses, voice mode, new connectors, Muse's own email address and Muse Charm.
- [Muse, Meta's extraordinarily privileged AI assistant, has a serious 0-day, Ars Technica, 21 September 2026](https://arstechnica.com/security/2026/09/muse-metas-extraordinarily-privileged-ai-assistant-has-a-serious-0-day/): the macOS token-theft flaw found by Patrick Wardle and Meta's hotfix.
- [Anthropic, Introducing Claude Opus 5.5, 22 September 2026](https://www.anthropic.com/claude-opus-5-5) and [xAI, Grok 4.7 developer docs](https://docs.x.ai/developers/grok-4-7.md): the two September releases that postdate the Artificial Analysis comparison set.
- [Meta AI developer site](https://developer.meta.com/ai/): current model listing including Muse Image at $0.01 per image and Muse Voice Transcribe at $0.18 per hour; llama.com 301-redirects here.
- [Meta returns to open source with Muse Glimmer, VentureBeat, 10 August 2026](https://venturebeat.com/technology/meta-returns-to-open-source-with-muse-glimmer-an-apache-2-0-licensed-30b-parameter-ai-model-optimized-for-agents-available-now): Muse Glimmer's 30B size, Apache 2.0 license and agent focus.
- [Meta releases open-weight Muse Glimmer, Constellation Research](https://www.constellationr.com/insights/news/meta-releases-open-weight-muse-glimmer-model-open-muse-spark-12-tap): the undated pledge to open-weight Muse Spark 1.2.
- [Meta opens Muse Glimmer, GCN, 3 September 2026](https://gcn.com/meta-opens-muse-glimmer-billion-parameter/21144/): corroboration that no Muse Spark weights had been published as of early September 2026.
- [Muse Spark 1.3: Meta reaches the frontier, Artificial Analysis](https://artificialanalysis.ai/articles/muse-spark-1-3): Intelligence Index of 61 at xhigh and 62 at max, the comparison set, the 53 and 57 scores for 1.1 and 1.2, the $0.15 per MTok cache-hit rate, and the rank of sixth out of 636 models.
- [Muse Spark 1.3 on Artificial Analysis](https://artificialanalysis.ai/models/muse-spark-1-3): the $1.25/$4.25 standard pricing, 1M context, and text/image/video input with text output; also the lower unqualified index figure noted above.
- [Muse Spark on the Meta developer site](https://developer.meta.com/ai/models/muse-spark/): Meta's own published pricing for both tiers, including the $0.15 and $0.002 per MTok cache rates, the 1M context window, and the video/image/document/text input list with no audio.
- [Introducing Muse Spark Open, Meta AI Research, 15 October 2026](https://research.meta.ai/blog/muse-spark-open): 816B total / 42B active, 1M context, the hosting and download partners, the two-Mac-Studio claim and the Muse Model License with "limited commercial terms".
- [Muse-Spark-Open-816B-A42B on Hugging Face, fetched 25 October 2026](https://huggingface.co/meta-models/Muse-Spark-Open-816B-A42B): the model card, the architecture (256 experts, 8 active), the manual gate and the full Muse Model License text, including the attribution clause and the US$20 million Model-as-a-Service trigger.
- [Introducing Muse Wonder and Muse Wonder Full, Meta newsroom, 12 October 2026](https://about.fb.com/news/2026/10/introducing-muse-wonder-models/): "our most capable models to date", API and Muse Code availability, and Muse agent rollout "soon".
- [Muse Wonder on the Meta developer site, fetched 25 October 2026](https://developer.meta.ai/models/muse-wonder/): model IDs, the $4.00 / $0.20 / $20.00 price, 1M context and the Muse Code plans that include Muse Wonder Full.
- [Muse Spark 1.3 on llm-stats](https://llm-stats.com/models/muse-spark-1.3): the Contributor-tier rates of $0.10 input, $0.002 cached input and $0.20 output, the modality listing that adds audio, and the fifth-place LLM Stats Score ranking.
- [AI at Meta on X, 5 September 2026](https://x.com/AIatMeta/status/2095940043294847084): the announcement that Muse Spark 1.3 with max reasoning is available on Muse Code and the Meta Model API.
- [Meta says Muse Spark 1.3 has frontier performance, VentureBeat, 3 September 2026](https://venturebeat.com/technology/meta-says-muse-spark-1-3-has-frontier-performance-but-its-best-results-come-from-a-model-developers-cant-broadly-use-yet): the launch-week gating of the max tier and the xhigh-versus-max split.
- [Meta's Muse Spark 1.1 API pricing, The Decoder](https://the-decoder.com/metas-muse-spark-1-1-api-pricing-squeezes-openai-and-anthropic-as-the-ai-price-war-heats-up/): the standard and Contributor tier rates and the training-rights condition.
- [Muse Spark arrives on AI glasses, Android Central](https://www.androidcentral.com/apps-software/meta/metas-muse-spark-arrives-on-ai-glasses-gen-1-ray-ban-display-waits-for-now): Muse Spark replacing Llama 4 on Ray-Ban and Oakley Meta glasses, and the one-tenth-the-compute claim.
- [The Llama 4 herd, Meta AI blog, 5 April 2025](https://ai.meta.com/blog/llama-4-multimodal-intelligence/): Scout, Maverick and Behemoth specifications.
- [Meta hits pause on Llama 4 Behemoth, Computerworld](https://www.computerworld.com/article/3987990/meta-hits-pause-on-llama-4-behemoth-ai-model-amid-capability-concerns.html): the Behemoth delay and the capability concerns behind it.
- [Llama (language model), Wikipedia](https://en.wikipedia.org/wiki/Llama_(language_model)): the release history ending at Llama 4 in April 2025, and Muse Spark's arrival as its replacement.
