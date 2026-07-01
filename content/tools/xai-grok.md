---
title: "xAI Grok"
description: "xAI is the company behind the Grok family of large language models, offered through a developer API and a consumer app."
date: 2026-06-29
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

xAI documents several models. Grok 4.3 is presented as the default recommendation for chat and coding, alongside reasoning, non-reasoning, and multi-agent variants, plus a smaller coding-focused model. Check the official models page for the current list and specifications before you build, because the lineup changes.

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
| **Maker** | xAI | OpenAI | Anthropic | Google DeepMind |
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
- **You need reproducible, benchmarked evidence for a regulated use case.** Run your own evaluation against your tasks rather than relying on marketing claims. See [how AI models are evaluated](/guides/how-ai-models-are-evaluated/).

## Further reading

- [What is an LLM?](/glossary/llm/): plain-English explanation of the model type Grok belongs to.
- [What are foundation models?](/glossary/foundation-models/): why hosted models like Grok are a shared base layer.
- [The LLM landscape in 2026](/comparisons/llm-landscape-2026/): where Grok sits among the frontier providers.
- [Claude versus ChatGPT](/comparisons/claude-vs-chatgpt/): a detailed head-to-head of two of Grok's main rivals.
- [How AI models are evaluated](/guides/how-ai-models-are-evaluated/): run your own tests before you commit.
- [xAI API overview](https://docs.x.ai/overview): the official developer documentation.
- [xAI models list](https://docs.x.ai/developers/models): the current, authoritative model lineup and specs.

## Sources

- [xAI](https://x.ai/): official company and product site.
- [xAI API overview](https://docs.x.ai/overview): endpoints, SDK compatibility, and API families.
- [xAI models documentation](https://docs.x.ai/developers/models): available Grok models and capabilities.
