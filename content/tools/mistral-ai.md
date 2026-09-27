---
title: "Mistral AI"
description: "A French model provider offering open-weight and commercial LLMs plus a hosted API platform, positioned around EU infrastructure and data control. Current lineup, licensing tracks, pricing, and API usage."
date: 2026-06-29
aliases: ["/tools/mistral/"]
tags: ["llm", "mistral", "open-weight", "open-source", "european-ai", "model-provider", "api", "multilingual"]
tool_category: "AI"
related:
  - glossary/llm
  - glossary/foundation-models
  - comparisons/llm-landscape-2026
  - tools/alibaba-qwen
  - tools/claude-anthropic
  - tools/amazon-bedrock
  - tools/openai-api
last_updated: 2026-09-25
lastmod: 2026-09-25
last_verified: 2026-09-25
---

<figure class="bz-figure">
  <img src="/img/dark-cherry/prism-precision.png" alt="A black prism splitting a red laser, representing a European model provider with open and commercial models." loading="lazy">
  <figcaption>Mistral splits its offering two ways: open-weight models you can run yourself, and commercial models you rent through an API.</figcaption>
</figure>

Mistral AI is a French artificial intelligence company that builds [large language models](/glossary/llm/) and sells access to them. It solves a specific problem for European teams: how to use frontier-grade AI while keeping data inside the EU and, when needed, running the model on your own hardware. Mistral was founded in 2023 in Paris by Arthur Mensch, Guillaume Lample, and Timothée Lacroix. Its distinctive move is a split catalogue - some models ship as open weights under permissive licences, and others stay commercial and API-only.

That split is the whole story, and since December 2025 it has run to three tracks rather than two:

- **Apache 2.0 open weights.** Mistral Large 3 (announced 2 December 2025), the current flagship, is a sparse mixture-of-experts model of roughly 675B total and 41B active parameters with a 256K context window and image input - and Mistral published both base and instruct weights under Apache 2.0. Mistral Small 4 (16 March 2026) and the Ministral 3 line at 14B, 8B and 3B (2 December 2025) are Apache 2.0 too, as are Voxtral Small, Shieldstral and Leanstral. The older exemplars, Mistral 7B and the Mixtral models, are retired from the hosted API and superseded by Ministral 3.
- **Modified MIT.** Mistral Medium 3.5 (late April 2026), a 128B dense model that merges the former Magistral reasoning and Devstral 2 coding lines, publishes its weights under a "Modified MIT" licence: commercial use is permitted, with a carve-out for high-revenue companies. It is neither fully open nor API-only, so read the licence before you assume either.
- **Commercial and premier.** Codestral, Mistral OCR, Moderation 2 and the Embed models stay closed and are served only through Mistral's hosted API.

That gives you a spectrum: self-host an open model for full data control, or call a commercial model when you want a capability Mistral does not release as weights.

<div class="bz-arch">
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Models</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Mistral Large 3</span>
      <span class="bz-arch-chip">Mistral Medium 3.5</span>
      <span class="bz-arch-chip">Mistral Small 4</span>
      <span class="bz-arch-chip">Ministral 3 (14B / 8B / 3B)</span>
      <span class="bz-arch-chip-note">Apache 2.0 open weights: Large 3, Small 4, Ministral 3. Medium 3.5 ships under a Modified MIT licence</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Access</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">la Plateforme API</span>
      <span class="bz-arch-chip">Vibe (formerly Le Chat)</span>
      <span class="bz-arch-chip">Microsoft Foundry</span>
      <span class="bz-arch-chip">AWS Bedrock</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Self-host</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Ollama</span>
      <span class="bz-arch-chip">vLLM</span>
      <span class="bz-arch-chip">Hugging Face</span>
      <span class="bz-arch-chip-note">Ministral 3 runs on a single GPU or a laptop; Large 3 needs a multi-GPU node</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Specialised</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Codestral (code)</span>
      <span class="bz-arch-chip">Mistral OCR 4.1</span>
      <span class="bz-arch-chip">Voxtral (speech)</span>
      <span class="bz-arch-chip">Mistral Embed</span>
      <span class="bz-arch-chip">Moderation 2 / Shieldstral</span>
    </div>
  </div>
</div>

## Current model lineup

The lineup turned over completely between December 2025 and April 2026. Mistral Large 2, Pixtral Large, Mistral 7B and the Mixtral models are retired from la Plateforme and appear only on Mistral's deprecation list.

- **Mistral Large 3** (announced 2 December 2025) is the flagship: a sparse mixture-of-experts model with roughly 675B total and 41B active parameters, a 256K context window, image input, and coverage of 40+ languages. Mistral released both the base and instruct weights under Apache 2.0.
- **Mistral Medium 3.5** (late April 2026 — Mistral's own sources vary between 28, 29 and 30 April) is a 128B dense model that folds the former Magistral reasoning line and Devstral 2 coding line into a single checkpoint with configurable reasoning effort, 256K context, and image input. Its weights are published under a "Modified MIT" licence that permits commercial use with a carve-out for high-revenue companies, so it is neither Apache 2.0 nor API-only.
- **Mistral Small 4** (16 March 2026) is a 119B-total / ~6B-active MoE under Apache 2.0, with 256K context. It is the first Mistral model to unify reasoning, vision and agentic coding in one self-hostable checkpoint.
- **Ministral 3** (2 December 2025) covers 14B, 8B and 3B, each shipping base, instruct and reasoning variants with image understanding, all Apache 2.0. These replace the retired Mistral 7B and Mixtral open-weight line.

Choosing between them is mostly a cost-versus-capability call: Ministral 3 or Small 4 for high-volume, cost-sensitive work, Large 3 for complex reasoning, and Medium 3.5 when you want reasoning effort you can tune per request.

Alongside its own catalogue, Mistral now also serves a third-party model on la Plateforme: Z.ai's GLM 5.2, with a 1M context window.

### Specialist models: OCR and Lean

- **Mistral OCR 4.1** (`mistral-ocr-4-1`) was released on 16 July 2026 and became **generally available on 31 August 2026**. The `mistral-ocr-latest` and `mistral-ocr-4` aliases point to it. It is API-only and priced at $4 per 1,000 pages (see pricing below). If you pinned `mistral-ocr-4-0` (June 2026), move to the 4.1 id or the alias.
- **Leanstral 1.5** (`labs-leanstral-1-5`, 30 June 2026), the Apache 2.0 Lean 4 formal-proof engineering model, **retires from the API on 30 September 2026**; Mistral announced the date when it released the model. The models page lists no hosted successor, so if you rely on it, plan to self-host the open weights or switch provider before then. (Its predecessor, `labs-leanstral-2603`, retired on 30 June 2026.)

### Company news: Pimento acquisition

Sifted reported on 22 September 2026, citing company filings, that Mistral is **acquiring Pimento**, a Paris-based startup that builds AI-assisted advertising creation, in a **cash-and-shares deal worth €12.7 million**. Sifted and FW.media both describe it as Mistral's third acquisition of 2026, after Koyeb (infrastructure) and Emmi AI (industrial engineering). FW.media and other coverage link the purchase to Mistral's Vibe assistant and business applications. Mistral had not published its own announcement in its changelog as of 25 September 2026, so treat the deal terms as reported rather than confirmed.

## Where Mistral sits in your stack

Mistral is a model provider, not a full application platform. It supplies the intelligence layer that your application calls, whether you self-host the weights or hit the hosted API.

<div class="bz-arch">
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Your application</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Web app</span>
      <span class="bz-arch-chip">Backend service</span>
      <span class="bz-arch-chip">Agent</span>
      <span class="bz-arch-chip-note">Sends prompts, receives completions</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Access path</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Hosted API</span>
      <span class="bz-arch-chip">Le Chat / Vibe</span>
      <span class="bz-arch-chip">Self-hosted weights</span>
      <span class="bz-arch-chip-note">Pick per data-control need</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Models</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Open-weight (Apache 2.0)</span>
      <span class="bz-arch-chip">Modified MIT (Medium 3.5)</span>
      <span class="bz-arch-chip">Commercial / premier</span>
      <span class="bz-arch-chip-note">Text, code, vision, speech, OCR</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Compute</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Mistral EU infrastructure</span>
      <span class="bz-arch-chip">Cloud partners</span>
      <span class="bz-arch-chip">Your own hardware</span>
    </div>
  </div>
</div>

## How to access it

You reach Mistral three ways, depending on how much control you want.

**Le Chat, now Vibe.** The consumer-facing chat product, comparable to other chat assistants. It runs Mistral's models behind a web and mobile interface. Mistral rebranded it to Vibe in May 2026; sources disagree on the exact day, and the Vibe name had already been used for a separate terminal coding agent earlier that year. Use it to try the models before building anything.

**The hosted API.** Mistral serves both open-weight and commercial models through la Plateforme, an API with a developer console. You send a prompt, you get a completion, and Mistral runs the [inference](/glossary/llm/) on its own infrastructure. Mistral states that its servers are hosted in the EU, which matters for teams with data-residency requirements. The platform is no longer Mistral-only: it also resells a third-party model, Z.ai's GLM 5.2 with a 1M context window, which is currently the longest context you can reach through a Mistral endpoint.

**Self-hosting the open weights.** For the open-weight models, you download the weights and run them on your own GPUs or through a third-party inference host. This keeps every request inside your own perimeter. It costs more operationally, and you own the scaling and reliability work.

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 1</span>
    <span class="bz-flow-step-name">Prototype in Vibe</span>
    <span class="bz-flow-step-desc">Test whether the models handle your task at all.</span>
  </div>
  <div class="bz-flow-arrow">&rarr;</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 2</span>
    <span class="bz-flow-step-name">Build on the API</span>
    <span class="bz-flow-step-desc">Wire the hosted API into your app for speed of delivery.</span>
  </div>
  <div class="bz-flow-arrow">&rarr;</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 3</span>
    <span class="bz-flow-step-name">Decide on control</span>
    <span class="bz-flow-step-desc">If data must stay in-house, move an open model onto your own compute.</span>
  </div>
</div>

## Using the API

Mistral's API is OpenAI-compatible. Use the official SDK, or point the `openai` package at Mistral's base URL.

```bash
pip install mistralai
```

```python
from mistralai import Mistral

client = Mistral(api_key="YOUR_MISTRAL_API_KEY")

response = client.chat.complete(
    model="mistral-large-latest",
    messages=[{"role": "user", "content": "Summarise the EU AI Act in three bullet points."}]
)
print(response.choices[0].message.content)
```

Via the `openai` SDK (drop-in replacement):

```python
from openai import OpenAI

client = OpenAI(
    api_key="YOUR_MISTRAL_API_KEY",
    base_url="https://api.mistral.ai/v1"
)

chat = client.chat.completions.create(
    model="mistral-small-latest",
    messages=[{"role": "user", "content": "What is RAG?"}]
)
```

### Function calling

Mistral supports OpenAI-compatible function calling on all large models.

```python
import json
from mistralai import Mistral

client = Mistral(api_key="YOUR_MISTRAL_API_KEY")

tools = [
    {
        "type": "function",
        "function": {
            "name": "get_company_info",
            "description": "Return firmenbuch (company register) data for an Austrian company.",
            "parameters": {
                "type": "object",
                "properties": {
                    "company_name": {"type": "string", "description": "Legal name of the company"},
                    "country": {"type": "string", "enum": ["AT", "DE", "CH"]}
                },
                "required": ["company_name", "country"]
            }
        }
    }
]

response = client.chat.complete(
    model="mistral-large-latest",
    messages=[{"role": "user", "content": "Look up Erste Bank AG in Austria."}],
    tools=tools,
    tool_choice="auto"
)

tool_call = response.choices[0].message.tool_calls[0]
args = json.loads(tool_call.function.arguments)
print(args)  # {'company_name': 'Erste Bank AG', 'country': 'AT'}
```

### Codestral for code generation

Codestral remains Mistral's dedicated code-completion model, currently at version stamp v25.08. Unlike the general-purpose lineup it sits in the Premier tier with closed weights, so you call it rather than self-host it. The older MNPL-licensed 22B Codestral is superseded. If you want a self-hostable coding model, Mistral now points you at Small 4 or Medium 3.5, which absorbed the Devstral agentic-coding line. Check the models page for the current context window before you design around it.

```python
client = Mistral(api_key="YOUR_MISTRAL_API_KEY")

response = client.chat.complete(
    model="codestral-latest",
    messages=[
        {
            "role": "user",
            "content": "Write a FastAPI endpoint that accepts a PDF and returns extracted text using AWS Textract."
        }
    ]
)
print(response.choices[0].message.content)
```

## Pricing (la Plateforme, as of 9 September 2026)

Mistral publishes per-model rates in US dollars on its API pricing page. Earlier versions of this page quoted euro figures for a lineup that no longer exists.

| Model | Input per 1M tokens | Output per 1M tokens |
|---|---|---|
| **Mistral Large 3** | $0.50 | $1.50 |
| **Mistral Medium 3.5** | $1.50 | $7.50 |
| **Mistral Small 4** | $0.15 | $0.60 |
| **Ministral 3 14B** | $0.20 | $0.20 |
| **Ministral 3 8B** | $0.15 | $0.15 |
| **Ministral 3 3B** | $0.10 | $0.10 |
| **Codestral** | $0.30 | $0.90 |
| **Mistral Embed** | $0.10 | n/a |
| **Codestral Embed** | $0.15 | n/a |

The specialised models price on their own units: Mistral OCR 4.1 at $4 per 1,000 pages, Voxtral TTS at $0.016 per 1,000 characters, and Voxtral Mini Transcribe at $0.003 per audio minute.

## Typical use

Teams reach for Mistral when European data residency or the option to self-host is a hard requirement, not a nice-to-have. Common patterns:

- **Regulated workloads** where data cannot leave EU infrastructure, so an EU-hosted API or self-hosted weights is the deciding factor.
- **On-premise or private-cloud deployment** using an Apache 2.0 open-weight model, where owning the weights removes vendor lock-in.
- **Cost-sensitive backends** that run a smaller open model locally instead of paying per-token for a commercial API.
- **Multilingual and code tasks**. Mistral Large 3 covers 40+ languages, and Mistral ships dedicated models for coding (Codestral), speech (Voxtral), document OCR, embeddings and moderation alongside the general-purpose line.

## How it compares

At the provider level, the distinguishing axes are where the company is based, whether you can get the weights, and where inference runs.

| | Mistral AI | Anthropic (Claude) | Alibaba (Qwen) | Amazon Bedrock |
|---|---|---|---|---|
| **Origin** | France | United States | China | United States |
| **Open weights** | Yes, including the flagship | No | Yes, some models | No, it is a hosting layer |
| **Access model** | API and self-host | API only | API and self-host | Managed multi-model API |
| **Data hosting** | EU infrastructure | US-based | China / global | Your chosen AWS region |
| **Best for** | EU residency, self-host option | Strongest reasoning via API | Open-weight multilingual | One API over many providers |

Model against model, the flagship comparison looks like this:

| | Mistral Large 3 | GPT-5.6 | Claude Sonnet 5 | Llama 3.3 70B |
|---|---|---|---|---|
| **Data residency** | EU (Paris) | US | US | Self-host or US |
| **Open weight** | Yes (Apache 2.0) | No | No | Yes (community licence) |
| **Languages** | 40+ (strong FR/DE) | 50+ | 10+ | 50+ |
| **Context window** | 256K | 128K | 1M | 128K |
| **Image input** | Yes | Yes | Yes | Text-only base model |
| **Price (input/1M)** | $0.50 | ~$4.50 (indicative) | $2.00 | ~$0.80 (host-dependent) |
| **GDPR DPA** | Yes (EU entity) | SCCs required | SCCs required | Self-host |
| **Best for** | EU-regulated enterprise, self-host at frontier scale | General purpose | Long documents | Cost-sensitive |

Only the Mistral column is quoted from Mistral's own published price list. GPT-5.6 and Llama figures above are indicative — check [OpenAI API](/tools/openai-api/) for current context windows and pricing across its Sol/Terra/Luna tiers. Claude Sonnet 5's $2.00/MTok input price is now Anthropic's permanent standard rate (see [Claude Anthropic](/tools/claude-anthropic/) for the full current lineup and pricing table). Note that Llama is no longer Meta's frontier line — see [Meta Llama](/tools/meta-llama/) for what replaced it. The [2026 LLM landscape comparison](/comparisons/llm-landscape-2026/) places all these providers side by side.

## When not to use it

- **You want a single API across many vendors.** A managed aggregator like [Amazon Bedrock](/tools/amazon-bedrock/) or [Azure OpenAI](/tools/azure-openai/) lets you switch models without changing providers.
- **You need a million-token context.** Mistral's own models top out at 256K. For 1M context, use [Gemini](/tools/google-gemini/) or [Claude Opus 5](/tools/claude-anthropic/) — or the third-party GLM 5.2 that Mistral resells on la Plateforme, which carries a 1M window.
- **You need video or audio-native reasoning.** Large 3, Medium 3.5, Small 4 and Ministral 3 all accept image input, so still images are no longer a reason to route elsewhere. Speech is handled by the separate Voxtral models rather than in the chat models, and there is no video input. For a single model that reasons over video, use [Gemini](/tools/google-gemini/).
- **You need the strongest available reasoning right now.** Benchmark the specific task against [Claude](/tools/claude-anthropic/) and others rather than assuming any single provider leads. See [how AI models are evaluated](/guides/how-ai-models-are-evaluated/).
- **You have no data-residency or self-host requirement.** Mistral's main differentiators are EU hosting and open weights. Without those needs, choose on capability and price alone.
- **You lack the operations capacity to self-host.** Running open weights yourself means owning GPU provisioning, scaling, and uptime. If you cannot staff that, stay on a hosted API.

## Further reading

- [What is an LLM?](/glossary/llm/): plain-English explanation of large language models.
- [What are foundation models?](/glossary/foundation-models/): the broader model category Mistral builds within.
- [The 2026 LLM landscape](/comparisons/llm-landscape-2026/): how providers compare across capability and access.
- [Alibaba Qwen](/tools/alibaba-qwen/): another provider that ships open-weight models.
- [Building RAG systems](/guides/building-rag-systems/): how to build a retrieval-augmented generation pipeline with any LLM provider.
- [LLM gateway architecture](/guides/llm-gateway-architecture/): route between Mistral, OpenAI, and Anthropic with fallback logic.
- [la Plateforme documentation](https://docs.mistral.ai/): API reference, model cards, rate limits.
- [Mistral open-weight models](https://docs.mistral.ai/getting-started/open_weight_models): which models ship as downloadable weights, and under which licence.

## Sources

- [Mistral AI homepage](https://mistral.ai/)
- [Mistral models and deprecations](https://docs.mistral.ai/getting-started/models/): the authoritative current lineup, version stamps, and retired models.
- [Mistral changelog](https://docs.mistral.ai/getting-started/changelog): OCR 4.1 released 16 July and GA 31 August 2026; Leanstral 1.5 released 30 June 2026 with retirement on 30 September 2026.
- [Exclusive: Mistral acquires adtech startup Pimento in €12.7m cash-and-shares deal, filings show, Sifted, 22 September 2026](https://sifted.eu/articles/exclusive-mistral-pimento-acquisition) (secondary source)
- [MISTRAL AI acquires Pimento, moving further into business applications, FW.media, September 2026](https://www.fw.media/mistral-ai-acquires-pimento-moving-further-into-business-applications/557) (secondary source)
- [Mistral open-weight model list and licences](https://docs.mistral.ai/getting-started/open_weight_models)
- [Mistral 3 announcement, 2 December 2025](https://mistral.ai/news/mistral-3): Mistral Large 3 and Ministral 3 under Apache 2.0.
- [Mistral Small 4 announcement, 16 March 2026](https://mistral.ai/news/mistral-small-4)
- [Mistral Medium 3.5 model card](https://huggingface.co/mistralai/Mistral-Medium-3.5-128B): the Modified MIT licence terms.
- [Mistral API pricing](https://mistral.ai/pricing/api): current per-model USD rates.
- [Mistralai Python SDK on PyPI](https://pypi.org/project/mistralai/): package source and changelog.
- [Mistral AI on Wikipedia](https://en.wikipedia.org/wiki/Mistral_AI)
