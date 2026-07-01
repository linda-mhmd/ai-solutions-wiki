---
title: "Amazon Nova"
description: "Amazon's own family of foundation models for text, image, and video, delivered through Amazon Bedrock."
date: 2026-06-29
tags: ["aws", "foundation-models", "bedrock", "multimodal"]
tool_category: "AI"
related:
  - tools/amazon-bedrock
  - tools/claude-anthropic
  - glossary/foundation-models
  - glossary/inference
  - comparisons/llm-landscape-2026
---

<figure class="bz-figure">
  <img src="/img/shaping-ai/stacked-server-block-red-notext.png" alt="A multi-layer server block with red glowing strips, representing Amazon's own foundation model family." loading="lazy">
  <figcaption>Amazon Nova is a stacked family of models, each tier tuned for a different balance of speed, cost, and capability.</figcaption>
</figure>

Amazon Nova is Amazon's own family of [foundation models](/glossary/foundation-models/), announced in December 2024. The family covers text, image, and video, and every model is delivered through [Amazon Bedrock](/tools/amazon-bedrock/), the managed service that exposes many providers behind a single API. Nova solves a specific procurement problem for AWS customers: it gives them a first-party model line that AWS prices, supports, and integrates directly, rather than depending only on third-party models hosted on the platform.

The idea behind a model family is tiering. Instead of one model, Amazon ships several, each set at a different point on the speed, cost, and capability curve. You pick the smallest model that still handles your task well, then move up a tier only when accuracy demands it.

## Where Nova sits in the stack

Nova is not a standalone product with its own console. It is a set of models you call through Bedrock, alongside models from other providers such as Anthropic's [Claude](/tools/claude-anthropic/).

<div class="bz-arch">
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Your application</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Web or mobile app</span>
      <span class="bz-arch-chip">Backend service</span>
      <span class="bz-arch-chip-note">Sends prompts, receives completions</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Access layer</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Amazon Bedrock API</span>
      <span class="bz-arch-chip">Knowledge Bases</span>
      <span class="bz-arch-chip">Agents</span>
      <span class="bz-arch-chip">Guardrails</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Understanding models</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Nova Micro</span>
      <span class="bz-arch-chip">Nova Lite</span>
      <span class="bz-arch-chip">Nova Pro</span>
      <span class="bz-arch-chip">Nova Premier</span>
      <span class="bz-arch-chip-note">Text and multimodal input, text output</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Creative models</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Nova Canvas</span>
      <span class="bz-arch-chip">Nova Reel</span>
      <span class="bz-arch-chip-note">Image and video generation</span>
    </div>
  </div>
</div>

### The understanding models

These take text, and in most cases images and video, and return text.

- **Nova Micro** is the text-only tier. It targets the lowest latency and lowest cost per call in the family. Use it for high-volume, simple tasks like classification or short extraction.
- **Nova Lite** is a low-cost multimodal model. It accepts image, video, and text input and returns text. Amazon positions it for fast, real-time interactions.
- **Nova Pro** is the more capable multimodal model. AWS points it at complex tasks and agentic workflows, and it supports function calling and tool use.
- **Nova Premier** is the most capable tier in the family and is positioned as a teacher model for distilling smaller custom variants.

### The creative models

These generate media rather than text.

- **Nova Canvas** generates images from text or image prompts and includes editing features such as inpainting, outpainting, and background removal.
- **Nova Reel** generates short videos from text or image prompts, with camera controls such as zoom and movement.

## How to access it and typical use

You do not install Nova. You call it through Amazon Bedrock, so the prerequisite is an AWS account with Bedrock access enabled for the Nova models you want in your Region.

A typical text request flows like this.

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 1</span>
    <span class="bz-flow-step-name">Enable access</span>
    <span class="bz-flow-step-desc">Request model access to the Nova tiers in the Bedrock console for your Region.</span>
  </div>
  <div class="bz-flow-arrow">&rarr;</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 2</span>
    <span class="bz-flow-step-name">Pick a tier</span>
    <span class="bz-flow-step-desc">Start with Micro or Lite. Move to Pro or Premier only if accuracy needs it.</span>
  </div>
  <div class="bz-flow-arrow">&rarr;</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 3</span>
    <span class="bz-flow-step-name">Call the API</span>
    <span class="bz-flow-step-desc">Send the model ID and prompt through the Bedrock Converse or InvokeModel API.</span>
  </div>
  <div class="bz-flow-arrow">&rarr;</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 4</span>
    <span class="bz-flow-step-name">Add context</span>
    <span class="bz-flow-step-desc">Wire in Knowledge Bases for retrieval, Agents for tool use, Guardrails for policy.</span>
  </div>
</div>

Because Nova is a first-party AWS line, it plugs into the rest of Bedrock without extra glue. You can ground a Nova model on your own documents with Bedrock Knowledge Bases, give it tools through Bedrock Agents, and enforce content policy with Bedrock Guardrails. Amazon also documents [fine-tuning](/glossary/fine-tuning/) and model distillation for the understanding tiers, where a larger model such as Premier teaches a smaller, cheaper custom variant.

Common uses:

- **Document and image understanding** with Lite or Pro, where a request mixes text and visual input.
- **High-volume text classification** with Micro, where cost per call matters more than depth.
- **Agentic workflows** with Pro, using function calling and tool use to act on external systems.
- **Marketing and product media** with Canvas and Reel for generated images and short video.

## How it compares

Nova competes on two fronts: against other models hosted inside Bedrock, and against first-party model families from other clouds and labs.

| | Amazon Nova | Claude (Anthropic) | Azure OpenAI | Google Gemini |
|---|---|---|---|---|
| **Maker** | Amazon | Anthropic | OpenAI | Google |
| **Primary access** | Amazon Bedrock | Bedrock, direct API | Azure | Google Cloud |
| **First-party to a cloud** | Yes, AWS | No | Yes, Azure | Yes, GCP |
| **Modalities** | Text, image, video | Text, image | Text, image | Text, image, audio, video |
| **Best for** | AWS-native, cost-tiered work | Reasoning, long context | Azure shops | GCP shops |

Inside Bedrock, the practical choice is often Nova versus Claude. Nova is Amazon's cost-and-speed play across a wide task range. Claude tends to be the reach-for model when a task needs deeper reasoning or careful instruction following. See the wider field in the [LLM landscape for 2026](/comparisons/llm-landscape-2026/).

## When not to use it

- **You are not on AWS.** Nova is delivered through Bedrock. If your stack lives on Azure or Google Cloud, a first-party family there fits your billing and IAM better.
- **You want a portable, cloud-neutral contract.** Building on a first-party model ties you more tightly to one cloud. Weigh that lock-in against the integration benefits.
- **The task needs top-end reasoning.** For the hardest reasoning or agentic tasks inside Bedrock, evaluate Claude against Nova on your own data before committing.
- **You need a capability Nova does not cover.** Match the specific modality and context needs of your task to a model's documented specs, and confirm current specs in the AWS docs rather than assuming.

## Further reading

- [Amazon Bedrock](/tools/amazon-bedrock/): the managed service that hosts Nova and many other models behind one API.
- [What are foundation models](/glossary/foundation-models/): the model category Nova belongs to.
- [Claude by Anthropic](/tools/claude-anthropic/): the model family most often compared to Nova inside Bedrock.
- [The LLM landscape in 2026](/comparisons/llm-landscape-2026/): where Nova sits among competing model families.
- [Amazon Nova product page](https://aws.amazon.com/ai/generative-ai/nova/): the official overview from AWS.
- [Introducing Amazon Nova (AWS News Blog)](https://aws.amazon.com/blogs/aws/introducing-amazon-nova-frontier-intelligence-and-industry-leading-price-performance/): the launch post with per-model detail.

## Sources

- Amazon Nova product page: https://aws.amazon.com/ai/generative-ai/nova/
- Introducing Amazon Nova, AWS News Blog: https://aws.amazon.com/blogs/aws/introducing-amazon-nova-frontier-intelligence-and-industry-leading-price-performance/
- Amazon Nova AI Service Cards (Micro, Lite, Pro, Premier): https://docs.aws.amazon.com/ai/responsible-ai/nova-micro-lite-pro/overview.html
- Introducing Amazon Nova, Amazon press release: https://press.aboutamazon.com/2024/12/introducing-amazon-nova-a-new-generation-of-foundation-models
