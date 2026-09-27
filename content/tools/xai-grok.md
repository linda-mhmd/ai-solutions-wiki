---
title: "xAI Grok"
description: "xAI, now a SpaceX subsidiary trading as SpaceXAI, builds the Grok family of large language models, offered through a developer API and a consumer app."
date: 2026-06-29
last_updated: 2026-09-25
lastmod: 2026-09-25
last_verified: 2026-09-25
tags: ["llm", "foundation-models", "api", "frontier-models"]
tool_category: "AI"
related:
  - glossary/llm
  - glossary/foundation-models
  - comparisons/llm-landscape-2026
  - comparisons/claude-vs-chatgpt
  - tools/claude-anthropic
  - tools/azure-openai
  - tools/amazon-bedrock
---

<figure class="bz-figure">
  <img src="/img/enterprise-dark/circuit-board-angled-notext.png" alt="A dark angled circuit board with red traces, representing a frontier model provider." loading="lazy">
  <figcaption>Grok sits at the model layer of your stack, reached through an API rather than run on your own hardware.</figcaption>
</figure>

xAI is the company that builds the Grok family of [large language models](/glossary/llm/). Grok is available two ways: as a consumer chat app and as a developer API that you call from your own applications. If you build software that needs to generate text, hold a conversation, use tools, or work with images and voice, xAI is one of several [foundation model](/glossary/foundation-models/) providers you can wire into your product. This page explains what Grok is, where it fits among frontier model providers, and how you access it.

**Who you are actually buying from.** xAI is no longer an independent company. SpaceX acquired it in an all-stock deal that closed on 2 February 2026, making xAI a wholly owned subsidiary, and the business was rebranded SpaceXAI in July 2026 - x.ai pages now carry "&copy; 2026 SpaceXAI LLC" in the footer. Press reporting puts xAI's value in the deal at roughly $250bn and the combined entity at around $1.25tn, and SpaceX itself listed on Nasdaq in June 2026; those valuation figures come from secondary sources rather than a filing. None of this changes the product surface: the models are still called Grok, the docs still say "xAI", and the API endpoint is still `api.x.ai/v1`. It does change your counterparty for procurement, due diligence, and vendor-risk paperwork, so check which legal entity your contract names.

## Where Grok sits in your stack

You do not host Grok. xAI runs the models and exposes them over an HTTP API. Your application sends a request, xAI runs [inference](/glossary/inference/), and returns a response. This is the same pattern used by other hosted model providers.

<div class="bz-arch">
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Your app</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Backend service</span>
      <span class="bz-arch-chip">Agent or workflow</span>
      <span class="bz-arch-chip-note">Sends prompts, tool calls, and context</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">API layer</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">api.x.ai/v1</span>
      <span class="bz-arch-chip">OpenAI-SDK compatible</span>
      <span class="bz-arch-chip-note">Responses, Voice, and Imagine endpoints</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Model layer</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Grok chat models</span>
      <span class="bz-arch-chip">Grok coding model</span>
      <span class="bz-arch-chip">Image and voice models</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Infrastructure</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">xAI compute</span>
      <span class="bz-arch-chip-note">Managed by xAI, not by you</span>
    </div>
  </div>
</div>

## How to access it

There are two front doors.

**Consumer app.** Grok is available as a chat product for end users. This is the fastest way to try the model with no code, useful for evaluating tone and behaviour before you commit to an integration.

**Developer API.** For product work, you use the xAI API. The base endpoint is `https://api.x.ai/v1`. According to the official docs, the API is compatible with OpenAI's client library, so you point the OpenAI SDK at the xAI base URL and pass an xAI API key as a bearer token. That compatibility matters: if your code already targets an OpenAI-style client, switching to Grok is mostly a configuration change rather than a rewrite.

The API groups its capabilities into a few families:

- **Responses API** - generate text, hold conversations, and call functions and tools.
- **Voice API** - text-to-speech, speech-to-text, and real-time voice.
- **Imagine API** - generate and edit images, and generate video from text or images.

### The current models

**Grok 4.7 (`grok-4.7`) is the flagship as of September 2026.** xAI's docs describe it as "the most capable model we've built" and recommend it for everything except dedicated audio, image and video work. It was released on **21 September 2026**, the date on xAI's announcement, and GitHub added it to Copilot the same day. For the launch story, see [Grok 4.7](/news/grok-4-7/). Key facts from the Grok 4.7 overview:

- **500K context window**, text and image input, text-only output, no text output limit, **May 2026 knowledge cutoff**.
- **Same price as Grok 4.6**: $2.00 input / $0.50 cached / $6.00 output per 1M tokens below 200K prompt tokens, and $4.00 / $1.00 / $12.00 above that.
- **Reasoning effort** `low`, `medium`, `high` (default) or `xhigh`.
- **Encrypted reasoning is always returned on the Responses API.** `reasoning.encrypted_content` comes back even when `include` does not ask for it, so pass reasoning items back unchanged in the next turn's `input`. Chat Completions behaviour is unchanged.
- **Caching needs a routing key.** xAI "highly recommends" setting `prompt_cache_key` (Responses API) or the `x-grok-conv-id` header (Chat Completions), because without it requests land on cache-cold servers and pay full input price.
- Also served on the **US regional endpoint** `https://us.api.x.ai/v1` at a 10% premium, which keeps inference in the United States. It is also available through OpenRouter, Vercel and Cloudflare gateways.
- **Grok 4.7 Fast** is the same model on faster infrastructure at twice the token rates. xAI lists it at $4.00 / $1.00 cached / $12.00 below 200K prompt tokens and $6.00 / $1.50 / $18.00 above. It is available **only in Cursor and Grok Build** (not Grok Build's free tier), not on the public xAI API, and Cursor bills its own Fast variant through the Cursor plan. Cursor describes Grok 4.7 as jointly trained by Cursor and SpaceXAI.

Grok 4.6, announced on 12 August 2026, is now the **previous generation, superseded by Grok 4.7**. It remains listed at the same price, and Google made it generally available in Vertex AI Model Garden on 18 September 2026. Like every Grok model, both are closed-weight: you rent them, you cannot download them. Grok 5 has not shipped as of 25 September 2026.

The lineup has one counter-intuitive shape worth knowing before you pick: the older Grok 4.3 has a **larger** context window than the newer 4.5, 4.6 and 4.7, and costs less. Every model also has a two-tier price that roughly doubles once a prompt crosses 200K tokens.

| Model | Context | Input / output per 1M tokens (<200K prompt) | Input / output (&ge;200K prompt) | Notes |
|---|---|---|---|---|
| **grok-4.7** | 500K | $2.00 / $6.00 | $4.00 / $12.00 | Current flagship (September 2026); cached input $0.50 / $1.00 |
| **grok-4.6** | 500K | $2.00 / $6.00 | $4.00 / $12.00 | Previous generation, superseded by Grok 4.7; announced 12 August 2026 |
| **grok-4.5** | 500K | $2.00 / $6.00 | $4.00 / $12.00 | Superseded by 4.6 and 4.7; cached input $0.30, cheaper than 4.6/4.7; GitHub Copilot drops it on 19 October 2026; x.ai's announcement page is stamped 16 July 2026, though some reports date it to 8 July |
| **grok-4.3** | 1M | $1.25 / $2.50 | $2.50 / $5.00 | Cheapest route to a very long context |
| **grok-4.20-0309** | 1M | $1.25 / $2.50 | $2.50 / $5.00 | Priced as grok-4.3; billed separately as `-reasoning`, `-non-reasoning`, and `-multi-agent` ids |
| **grok-build-0.1** | 256K | $1.00 / $2.00 | $2.00 / $4.00 | Smaller coding-focused model |

Figures are from xAI's own models documentation as of 25 September 2026. Check that page for the current list before you build, because the lineup changes quickly: three flagship releases (4.5, 4.6, 4.7) landed between July and September 2026.

**Other September changes on the API.** `grok-voice-transcribe-2.0` is now available for speech-to-text, but `grok-voice-transcribe-1.0` remains the default, so request 2.0 explicitly if you want it. And **`grok-imagine-image-quality` retires on 2 November 2026**. After that date requests to the slug are served by `grok-imagine-image-2.0` with `quality` set to `low`, with the same request and response shape and a lower per-image price ($0.04 against $0.05 today). The one catch: you will silently get low-quality output, so switch explicitly to `grok-imagine-image-2.0` and pin the `quality` you want. The original `grok-imagine-image` (1.0) is not affected. xAI does not publish a release date for grok-4.3 on its docs page, so treat the ordering above as the catalogue's, not a dated timeline.

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 1</span>
    <span class="bz-flow-step-name">Get a key</span>
    <span class="bz-flow-step-desc">Create an account and generate an xAI API key.</span>
  </div>
  <div class="bz-flow-arrow">&rarr;</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 2</span>
    <span class="bz-flow-step-name">Point your client</span>
    <span class="bz-flow-step-desc">Set the base URL to api.x.ai/v1 in an OpenAI-compatible SDK.</span>
  </div>
  <div class="bz-flow-arrow">&rarr;</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 3</span>
    <span class="bz-flow-step-name">Pick a model</span>
    <span class="bz-flow-step-desc">Choose a Grok model that fits the task, chat, reasoning, or coding.</span>
  </div>
  <div class="bz-flow-arrow">&rarr;</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 4</span>
    <span class="bz-flow-step-name">Send requests</span>
    <span class="bz-flow-step-desc">Call the Responses API with prompts, tools, or images.</span>
  </div>
</div>

## How it compares

Grok is one of four frontier model families you will weigh most often. The others are OpenAI's GPT models, Anthropic's Claude models, and Google's Gemini models. They cover similar ground: text generation, tool use, code, and multimodal input. The differences that matter for a buyer are ecosystem, integration surface, and how each provider is packaged in the clouds you already use.

| | xAI Grok | OpenAI GPT | Anthropic Claude | Google Gemini |
|---|---|---|---|---|
| **Maker** | xAI, a SpaceX subsidiary (SpaceXAI) | OpenAI | Anthropic | Google DeepMind |
| **Consumer app** | Grok | ChatGPT | Claude | Gemini |
| **API style** | OpenAI-SDK compatible | Native OpenAI SDK | Anthropic SDK | Google SDK |
| **Cloud packaging** | Also via third-party clouds | Azure OpenAI | Amazon Bedrock, others | Google Cloud |
| **Best for** | Teams wanting an OpenAI-style swap-in | Broad ecosystem and tooling | Long-context reasoning work | Google Cloud shops |

The OpenAI-compatible surface is Grok's most practical selling point for engineering teams: you can trial it against existing code with little friction. For a wider view of how the model market fits together, see the [LLM landscape for 2026](/comparisons/llm-landscape-2026/) and the head-to-head on [Claude versus ChatGPT](/comparisons/claude-vs-chatgpt/).

## When not to use it

Grok is not always the right pick.

- **You need a specific cloud's contract and controls.** If your procurement, data residency, or billing has to sit inside one cloud, a model packaged natively there, such as [Azure OpenAI](/tools/azure-openai/) or a model on [Amazon Bedrock](/tools/amazon-bedrock/), may be the cleaner fit.
- **You have standardised on another SDK and ecosystem.** If your team already runs deeply on [Anthropic's Claude](/tools/claude-anthropic/) or another provider, the migration cost can outweigh the benefit of switching.
- **You require a capability Grok does not document.** Match your requirements to the official model and API docs. Do not assume a feature exists.
- **You need open weights or an on-premises deployment.** Every current Grok model is closed-weight and hosted by xAI. xAI has published weights only for older generations (Grok-1 under Apache 2.0 in March 2024, and Grok 2 on Hugging Face in August 2025), which are far behind the current API models. If your requirement is to run the model inside your own perimeter, look at an open-weight family such as [Mistral](/tools/mistral-ai/) instead.
- **Your vendor-risk process is sensitive to ownership changes.** Grok is now built inside SpaceX. If your governance rules care about ultimate parent, jurisdiction, or concentration risk, that is a fresh review rather than a formality.
- **You need reproducible, benchmarked evidence for a regulated use case.** Run your own evaluation against your tasks rather than relying on marketing claims. See [how AI models are evaluated](/guides/how-ai-models-are-evaluated/).

## Further reading

- [What is an LLM?](/glossary/llm/): plain-English explanation of the model type Grok belongs to.
- [What are foundation models?](/glossary/foundation-models/): why hosted models like Grok are a shared base layer.
- [The LLM landscape in 2026](/comparisons/llm-landscape-2026/): where Grok sits among the frontier providers.
- [Claude versus ChatGPT](/comparisons/claude-vs-chatgpt/): a detailed head-to-head of two of Grok's main rivals.
- [How AI models are evaluated](/guides/how-ai-models-are-evaluated/): run your own tests before you commit.
- [xAI developer documentation](https://docs.x.ai/): the official developer docs.
- [xAI models list](https://docs.x.ai/developers/models): the current, authoritative model lineup, context windows, and pricing.

## Sources

- [xAI](https://x.ai/): official company and product site, now carrying the SpaceXAI corporate footer.
- [xAI models documentation](https://docs.x.ai/developers/models): available Grok models, context windows, and tiered pricing, checked 25 September 2026.
- [Grok 4.7 overview, xAI docs](https://docs.x.ai/developers/grok-4-7): context, cutoff, pricing, effort levels, encrypted reasoning, Fast variant, US endpoint.
- [Grok 4.7 announcement](https://x.ai/news/grok-4-7): dated 21 September 2026.
- [xAI pricing](https://docs.x.ai/developers/pricing): Grok 4.7 Fast rates and the 1.1x US regional endpoint multiplier.
- [This wiki: Grok 4.7](/news/grok-4-7/).
- [xAI release notes](https://docs.x.ai/docs/release-notes): Grok 4.7, Grok Voice Transcribe 2.0 and the `grok-imagine-image-quality` retirement (September 2026).
- [Grok 4.7 is now available in GitHub Copilot, GitHub Changelog](https://github.blog/changelog/2026-09-21-grok-4-7-is-now-available-in-github-copilot): 21 September 2026.
- [Cursor, Grok 4.7 model page](https://cursor.com/docs/models/grok-4-7): Fast variant pricing and "jointly trained by Cursor and SpaceXAI".
- [Google Cloud release notes](https://cloud.google.com/feeds/gcp-release-notes.xml): Grok 4.6 GA in Vertex AI Model Garden, 18 September 2026.
- [Grok 4.6 announcement](https://x.ai/news/grok-4-6): flagship release, stamped 12 August 2026.
- [Grok 4.5 announcement](https://x.ai/news/grok-4-5): stamped 16 July 2026.
- [SpaceXAI, Wikipedia](https://en.wikipedia.org/wiki/SpaceXAI): acquisition close date, rebrand, and reported valuations. Secondary source; the rebrand itself is corroborated by x.ai's own page footers, the valuation figures are not.
- [xai-org on Hugging Face](https://huggingface.co/xai-org): open-weight releases of Grok-1 (Apache 2.0, March 2024) and Grok 2 (August 2025), checked 25 September 2026.
