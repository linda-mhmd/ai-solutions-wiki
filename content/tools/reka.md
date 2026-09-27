---
title: "Reka AI"
description: "Reka AI is a research lab building natively multimodal models, now focused on physical AI, world models, and edge deployment rather than general-purpose chat models."
date: 2026-06-29
last_updated: 2026-09-09
lastmod: 2026-09-09
last_verified: 2026-09-09
tags: ["multimodal", "foundation models", "llm", "inference", "on-premise", "edge-ai"]
tool_category: "AI"
related:
  - glossary/foundation-models
  - glossary/llm
  - comparisons/llm-landscape-2026
  - tools/mistral-ai
  - tools/deepseek
---

<figure class="bz-figure">
  <img src="/img/obsidian-lab/lens-cylinder-copper-notext.png" alt="A precision machined lens on dark slate, representing a multimodal model provider." loading="lazy">
  <figcaption>Reka builds one model that reads text, images, video, and audio through a single lens, rather than bolting separate systems together.</figcaption>
</figure>

Reka AI is an AI research lab that builds natively multimodal models. Natively multimodal means one model processes text, images, video, and audio inside a single architecture, rather than stitching a language model to a separate vision or audio system. Reka positions this as a way to handle mixed enterprise content - documents, screenshots, recordings, and clips - with one model and one API call. The lab describes itself as staffed by researchers who previously worked at organisations such as Google DeepMind and Meta.

Reka's original family, described in its 2024 technical report, spanned three sizes: Reka Core (a frontier-class model with a 128K token context window), Reka Flash (a compact model trained from scratch, positioned as the fast turbo-class option), and Reka Edge (a smaller model built for local and latency-sensitive deployments). That lineup is now largely historic. Reka Core has had no refresh since the 2024 report, and Reka Flash 3.1 (21B) has not been updated since July 2025.

The company's only 2026 model release is a new **Reka Edge** (`reka-edge-2603`, March 2026 - Reka's own article body is dated 11 March while other sources say 20 March), which reuses the Edge name for something quite different. It is a 7B vision-language model aimed at physical AI and edge deployment: a 657M-parameter ConvNeXt V2 vision encoder in front of a 6.4B transformer backbone, covering image understanding, video analysis, object detection, and tool use. Reka claims it consumes roughly 3x fewer input tokens and runs about 65% faster than leading 8B models; that is a vendor claim, not an independently reproduced benchmark. Reka does not publish a context window on the model card.

**The licence is the decision-relevant fact.** Reka Edge is not open weight in the usual sense. It ships under a custom `reka-edge-2603-license` that permits commercial use only for organisations under $1M USD in annual revenue. For most enterprise readers that is a hard blocker, and it needs checking before any evaluation work starts.

## Where Reka sits

Reka is a model provider. You send it multimodal input and it returns text or structured output, either through Reka's own hosted inference platform or in a deployment you run yourself.

<div class="bz-arch">
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Your application</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Document review</span>
      <span class="bz-arch-chip">Video tagging</span>
      <span class="bz-arch-chip">Audio analysis</span>
      <span class="bz-arch-chip-note">Sends mixed text, image, video, and audio input</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Access layer</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Hosted API</span>
      <span class="bz-arch-chip">On-premises</span>
      <span class="bz-arch-chip">On-device</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Models</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Reka Edge (2026, 7B)</span>
      <span class="bz-arch-chip">Reka Flash 3.1 (2025, 21B)</span>
      <span class="bz-arch-chip">Reka Core (2024)</span>
      <span class="bz-arch-chip-note">One architecture reads text, image, video, and audio. Only Edge saw a 2026 refresh</span>
    </div>
  </div>
</div>

Because a single model handles every modality, you avoid the usual pattern of running one service to transcribe audio, another to caption images, and a third to reason over the combined text. Reka is one of many independent labs in the current [large language model landscape](/comparisons/llm-landscape-2026/), competing with much larger providers on the specific angle of native multimodality and flexible deployment.

## What Reka is working on now

If you are evaluating Reka as a general-purpose multimodal LLM vendor, look at what the lab actually publishes. Through 2026 its news page is almost entirely physical AI and video research rather than model releases: PhysicalRealismBench and a partnership with Moonvalley (9 June), the CS2 10K dataset (24 June), WorldModelGym (2 July), a world-model data pipeline (10 July), video reasoning work (30 July), the Reka Daily 10K egocentric dataset (6 August), real-time video generation (14 August), and a Responsible AI and model risk framework (3 September 2026).

The direction is clear enough: world models, robotics and egocentric data, video generation and evaluation. That is a real specialism, and it is the right reason to talk to Reka. It is not the same company as the one that shipped a frontier-class general chat model in 2024, and a page-one product comparison against a general-purpose provider will mislead you.

## How to access it and how it fits

Reka offers three access paths, which is the main reason regulated and infrastructure-heavy teams look at it.

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Option 1</span>
    <span class="bz-flow-step-name">Hosted API</span>
    <span class="bz-flow-step-desc">Call Reka's inference platform over the network. Fastest to start, no infrastructure to manage.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Option 2</span>
    <span class="bz-flow-step-name">On-premises</span>
    <span class="bz-flow-step-desc">Run the model inside your own data centre or private cloud so data never leaves your boundary.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Option 3</span>
    <span class="bz-flow-step-name">On-device</span>
    <span class="bz-flow-step-desc">Deploy the 7B Reka Edge close to the data or on a robot for low latency, subject to its revenue-capped licence.</span>
  </div>
</div>

The on-premises and on-device paths are the differentiator. Many frontier [foundation models](/glossary/foundation-models/) are available only as a hosted API, which is a problem for teams with strict data-residency rules or air-gapped environments. Reka states that its models can be served by API, on-premises, or on-device to meet customer deployment constraints. If your blocker is that video or audio recordings cannot leave your network, a provider that supports local deployment changes what is possible.

Reka also ships tooling around video specifically, including infrastructure for tagging, searching, and clipping video, exposed through an API. For general background on how these models work, see [what a large language model is](/glossary/llm/).

## Reka compared to larger providers

| | Reka | Mistral AI | DeepSeek | Amazon Nova |
|---|---|---|---|---|
| **Core focus** | Physical AI, world models, edge multimodal | Open-weight LLMs | Efficient reasoning LLMs | Multimodal via cloud |
| **Text, image, video, audio** | All four natively | Text and image; speech via Voxtral | Mainly text | Text, image, video |
| **Newest model** | Reka Edge, 7B, March 2026 | Mistral Large 3, December 2025 | See provider page | See provider page |
| **Licence** | Custom, commercial use capped at $1M revenue | Apache 2.0 on the flagship | Open weights on many models | Proprietary, AWS-hosted |
| **On-premises option** | Yes | Yes, open weights | Yes, open weights | No, cloud only |
| **On-device option** | Yes, Reka Edge | Ministral 3 at 3B/8B | Distilled models exist | No |
| **Best for** | Robotics, video, edge deployment | Open-weight flexibility | Low-cost reasoning | Teams already on AWS |

See the individual pages for [Mistral AI](/tools/mistral-ai/), [DeepSeek](/tools/deepseek/), and [Amazon Nova](/tools/amazon-nova/) for deeper comparisons. Feature sets change often, so confirm current capabilities against each provider's documentation before you decide.

## When not to use it

- **You need the broadest ecosystem and tooling.** The largest providers have more third-party integrations, community examples, and framework support. A smaller lab has a thinner ecosystem.
- **You only work with text.** If your workload never touches images, video, or audio, native multimodality gives you nothing. A strong text-only model may be cheaper and easier to source. Reka has also not refreshed a general-purpose text model since 2025.
- **Your organisation earns more than $1M a year and you want to run the weights.** Reka Edge's licence permits commercial use only below $1M USD annual revenue, so for most enterprises the download is not usable in production. If genuinely open weights are the requirement, look at [Mistral](/tools/mistral-ai/) or another Apache 2.0 family instead.
- **You need published, independently reproduced benchmarks for a specific task.** Verify current results for your exact use case rather than relying on a general multimodal claim.

Always run your own evaluation on your own data. A model's headline positioning rarely predicts how it performs on your specific documents, recordings, and questions.

## Further reading

- [What is a foundation model?](/glossary/foundation-models/): the general category Reka's models belong to.
- [What is a large language model?](/glossary/llm/): the underlying technology behind text generation and reasoning.
- [The LLM landscape in 2026](/comparisons/llm-landscape-2026/): how independent labs like Reka fit among the larger providers.
- [Mistral AI](/tools/mistral-ai/): an open-weight European provider to compare deployment options against.
- [DeepSeek](/tools/deepseek/): an efficiency-focused provider for cost-sensitive reasoning workloads.
- [Reka technical report (arXiv)](https://arxiv.org/abs/2404.12387): the paper describing the original Reka Core, Flash, and Edge.
- [Reka Edge model card](https://huggingface.co/RekaAI/reka-edge-2603): the 2026 model, its architecture, and its licence.

## Sources

- [Reka AI official site](https://www.reka.ai/): company description, model families, and deployment options.
- [Reka news](https://reka.ai/news): the 2026 research output - world models, video, robotics datasets, and the September 2026 governance framework. Reka publishes no dated model list or changelog, and article pages carry a site-wide date that differs from the body date.
- [Reka Edge: frontier-level edge intelligence for physical AI](https://reka.ai/news/reka-edge-frontier-level-edge-intelligence-for-physical-ai): the March 2026 release and its performance claims.
- [RekaAI/reka-edge-2603 on Hugging Face](https://huggingface.co/RekaAI/reka-edge-2603): 7B size and the revenue-capped custom licence.
- [RekaAI on Hugging Face](https://huggingface.co/RekaAI): repository dates showing reka-flash-3.1 last updated July 2025.
- [Reka Core, Flash, and Edge technical report (arXiv 2404.12387)](https://arxiv.org/abs/2404.12387): original model sizes, context window, and native multimodal architecture.
- [Reka Core announcement](https://reka.ai/news/reka-core-our-frontier-class-multimodal-language-model): frontier-class positioning and 128K context window.
