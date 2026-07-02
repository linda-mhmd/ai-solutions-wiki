---
title: "Google Gemini"
description: "Google's family of frontier multimodal models, available through the Gemini app, the Gemini API, and Google Cloud Vertex AI."
date: 2026-06-29
tags: ["gemini", "google", "multimodal", "foundation-models", "llm"]
tool_category: "AI"
related:
  - glossary/foundation-models
  - glossary/llm
  - tools/claude-anthropic
  - tools/azure-openai
  - comparisons/llm-landscape-2026
---

<figure class="bz-figure">
  <img src="/img/juggling/neural-network-nodes-notext.png" alt="Interconnected glowing nodes forming a network, representing a frontier multimodal model family." loading="lazy">
  <figcaption>Gemini is a family of models, not one model. Each tier trades cost against capability while sharing the same multimodal core.</figcaption>
</figure>

Google Gemini is Google DeepMind's family of frontier multimodal models. The models process text, images, audio, video, PDFs, and code in a single request, and they support long context windows measured in the hundreds of thousands to millions of tokens. Gemini solves a common problem for builders: instead of stitching together separate models for vision, speech, and text, you send mixed inputs to one model and get one reasoned answer back.

Gemini is one of the three widely used frontier model families alongside OpenAI's GPT and Anthropic's [Claude](/tools/claude-anthropic/). For background on what a [foundation model](/glossary/foundation-models/) is and what a [large language model](/glossary/llm/) does, follow those links first.

## The family

Google ships Gemini as tiers, not a single model. The naming follows a generation number plus a tier label. Google DeepMind currently lists tiers including Flash (frontier performance for agents and coding), Pro (complex tasks and creative work), Deep Think (research, science, and engineering challenges), and Flash-Lite (high-volume, efficiency-first workloads). Google publishes the current model list and version identifiers on its developer and Vertex AI documentation, and it changes often. Always check the official model list before you pin a version in production.

<div class="bz-arch">
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Access surface</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Gemini app</span>
      <span class="bz-arch-chip">Google AI Studio</span>
      <span class="bz-arch-chip">Gemini API</span>
      <span class="bz-arch-chip">Vertex AI</span>
      <span class="bz-arch-chip-note">consumer chat through to enterprise deployment</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Model tiers</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Flash</span>
      <span class="bz-arch-chip">Pro</span>
      <span class="bz-arch-chip">Deep Think</span>
      <span class="bz-arch-chip">Flash-Lite</span>
      <span class="bz-arch-chip-note">pick a tier by cost against capability</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Multimodal core</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Text</span>
      <span class="bz-arch-chip">Images</span>
      <span class="bz-arch-chip">Audio</span>
      <span class="bz-arch-chip">Video</span>
      <span class="bz-arch-chip">PDFs and code</span>
      <span class="bz-arch-chip-note">mixed inputs in one request</span>
    </div>
  </div>
</div>

The multimodal core is the reason to reach for Gemini. Google describes the models as processing and generating multiple modalities together, so you can send a video, a PDF, and a question in one call, and the model reasons across all three.

## How to access it and how it fits

You reach the same underlying models through several surfaces, chosen by who you are and what you are building.

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Try</span>
    <span class="bz-flow-step-name">Gemini app</span>
    <span class="bz-flow-step-desc">Consumer chat interface. No code. Good for testing prompts and multimodal input by hand.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Prototype</span>
    <span class="bz-flow-step-name">Google AI Studio</span>
    <span class="bz-flow-step-desc">Browser development environment. Tune prompts, generate an API key, export starter code.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Build</span>
    <span class="bz-flow-step-name">Gemini API</span>
    <span class="bz-flow-step-desc">Direct HTTP and SDK access for developers. Fastest path from a key to a working call.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Deploy</span>
    <span class="bz-flow-step-name">Vertex AI</span>
    <span class="bz-flow-step-desc">Google Cloud platform for production. Regional infrastructure, governance, and enterprise controls.</span>
  </div>
</div>

The Gemini API through Google AI Studio suits a solo developer who wants a key and a quick integration. Vertex AI, part of Google Cloud, suits teams that need regional data controls, identity and access management, and production reliability. Both call the same model tiers. You choose the surface, not a different model.

Where it sits in a stack: Gemini is the reasoning and generation layer. Your application sends structured or mixed-media input, the model returns text or structured output, and your code handles storage, retrieval, and orchestration around it. It plays the same architectural role that GPT or Claude does in a typical build. See the wider picture in the [LLM landscape for 2026](/comparisons/llm-landscape-2026/).

## Compared to the alternatives

All three families are frontier multimodal models with large context windows. The differences that matter in practice are the access surfaces, the cloud you are already on, and the tooling around each.

| | Google Gemini | Anthropic Claude | OpenAI GPT | Amazon Nova |
|---|---|---|---|---|
| **Vendor** | Google DeepMind | Anthropic | OpenAI | Amazon |
| **Native cloud** | Google Cloud Vertex AI | Amazon Bedrock, others | Azure, OpenAI API | AWS Bedrock |
| **Multimodal** | Text, image, audio, video | Text, image | Text, image, audio | Text, image, video |
| **Consumer app** | Gemini app | Claude app | ChatGPT | none direct |
| **Best fit** | Google Cloud teams, video and audio input | Long-form reasoning, coding | Broad ecosystem, tooling | AWS-native builds |

Treat this table as a starting point for a shortlist, not a verdict. Model rankings shift with each release, so benchmark the current tiers on your own workload before committing. Compare [Claude](/tools/claude-anthropic/) and the Azure-hosted GPT option in [Azure OpenAI](/tools/azure-openai/) alongside Gemini.

## When not to use it

Gemini is not always the right call.

- **You are standardised on AWS with no Google Cloud footprint.** If your data, identity, and networking all live in AWS, a model served through [Amazon Bedrock](/tools/amazon-bedrock/) or [Amazon Nova](/tools/amazon-nova/) keeps traffic and governance in one place.
- **You need a fully self-hosted or open-weights model.** Gemini is a proprietary hosted model. If you must run weights on your own hardware for compliance or cost reasons, choose an open model family instead.
- **Your task is narrow and small.** A frontier multimodal model is overkill for simple classification or extraction that a small specialised model handles at a fraction of the cost.
- **You cannot send data to a third-party API.** If regulation forbids sending inputs off-premises, a hosted API of any vendor is a poor fit.

Match the tier to the task even when Gemini is the right family. Flash-Lite for high volume, Pro or Deep Think for hard reasoning. Paying Pro rates for a Flash-Lite job wastes money.

## Further reading

- [Foundation models](/glossary/foundation-models/): what a general-purpose pretrained model is and why tiers exist.
- [What is an LLM](/glossary/llm/): the language model concepts behind every tier of Gemini.
- [Claude by Anthropic](/tools/claude-anthropic/): the closest comparable frontier family, useful for a side-by-side trial.
- [Azure OpenAI](/tools/azure-openai/): the Azure-hosted GPT option, relevant if you are a Microsoft cloud shop.
- [The LLM landscape in 2026](/comparisons/llm-landscape-2026/): how Gemini, GPT, and Claude compare across the market.
- [Gemini on Google DeepMind](https://deepmind.google/technologies/gemini/): the official model family overview and tier descriptions.
- [Gemini API models](https://ai.google.dev/gemini-api/docs/models): the current, authoritative list of model versions and identifiers.

## Sources

- [Google DeepMind: Gemini](https://deepmind.google/technologies/gemini/): official family overview, tier names, and multimodal description.
- [Gemini API: Models](https://ai.google.dev/gemini-api/docs/models): current model list, context windows, and version identifiers.
- [Google Cloud: Vertex AI generative models](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/models): enterprise access and supported models on Vertex AI.
