---
title: "Microsoft Phi"
description: "Microsoft Phi is a family of small, open-weight language models built to stay capable at sizes that run on-device and cut inference cost."
date: 2026-06-29
tags: ["ai", "small language models", "open weights", "microsoft", "on-device"]
tool_category: "AI"
related:
  - glossary/foundation-models
  - glossary/llm
  - glossary/inference
  - glossary/mixture-of-experts
  - tools/azure-openai
  - tools/mistral-ai
  - tools/deepseek
---

<figure class="bz-figure">
  <img src="/img/juggling/three-balls-rgb-convergence-notext.png" alt="Three small glowing spheres converging, representing a family of small, efficient language models." loading="lazy">
  <figcaption>Phi is a family of small models tuned so that quality does not have to scale with size.</figcaption>
</figure>

Microsoft Phi is a family of small language models (SLMs) released as open weights under the MIT license. The models solve a specific problem: most capable [large language models](/glossary/llm/) are big, slow, and expensive to run, which puts them out of reach for phones, laptops, and cost-sensitive workloads. Phi trades raw scale for carefully curated training data, aiming to keep quality high while the parameter count stays small enough to run on modest hardware.

A small language model is a [foundation model](/glossary/foundation-models/) with far fewer parameters than a frontier system. Parameters are the learned weights a model uses to generate output. Fewer parameters mean smaller memory footprint, faster [inference](/glossary/inference/), and lower cost per request. Microsoft's bet with Phi is that data quality, not sheer size, drives much of a model's usefulness. Phi models are trained on heavily filtered and synthetic "textbook-quality" data rather than the whole web.

## Where Phi sits

Phi occupies the small end of the model-size spectrum. You reach for it when a frontier model is more than the task needs, or when the deployment target cannot host one.

<div class="bz-arch">
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Frontier models</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">GPT class</span>
      <span class="bz-arch-chip">Claude</span>
      <span class="bz-arch-chip-note">Highest capability, hosted, higher cost and latency</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Mid-size open models</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Llama</span>
      <span class="bz-arch-chip">Mistral</span>
      <span class="bz-arch-chip-note">Strong general models, still need server-class GPUs</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Small language models</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Phi-4</span>
      <span class="bz-arch-chip">Phi-4-mini</span>
      <span class="bz-arch-chip">Phi-4-multimodal</span>
      <span class="bz-arch-chip-note">Runs on-device or on cheap GPUs, low latency, open weights</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Deployment target</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Laptop</span>
      <span class="bz-arch-chip">Phone</span>
      <span class="bz-arch-chip">Edge device</span>
      <span class="bz-arch-chip">Small cloud instance</span>
    </div>
  </div>
</div>

## The Phi family

Microsoft has shipped several generations. The current Phi-4 line covers a text model, a compact model, a multimodal model, and reasoning-tuned variants.

- **Phi-4** is a 14 billion parameter text model, first presented in December 2024. It is built on a decoder-only Transformer, was pretrained on roughly 10 trillion tokens of curated and synthetic data, and supports a 16k-token context length. Microsoft targeted mathematics and multi-step reasoning with this release.
- **Phi-4-mini** is a 3.8 billion parameter model aimed at even lighter deployment.
- **Phi-4-multimodal** is a 5.6 billion parameter model that handles speech, vision, and text in one model using a mixture-of-LoRAs design, with a 128k-token context length. Microsoft reports it ranked first on the Hugging Face OpenASR leaderboard with a 6.14% word error rate at the time of release.
- **Phi-4-reasoning** (14B) and **Phi-4-reasoning-plus** (14B) are reasoning-tuned variants. Phi-4-reasoning-plus is further trained with reinforcement learning to spend more inference-time compute. Phi-4-reasoning-plus supports a 32k-token context by default.
- **Phi-4-mini-reasoning** (3.8B) targets multi-step mathematical problem solving at small size.

Earlier generations remain available too. The Phi-3.5 line, released in August 2024, includes Phi-3.5-mini (3.82B), Phi-3.5-vision (4.15B), and Phi-3.5-MoE, a [mixture-of-experts](/glossary/mixture-of-experts/) model with 41.9 billion total parameters that activates about 6.6 billion per token. All three support a 128k-token context.

## How to access it

Phi models are open weights. You do not need a Microsoft account to download and run them.

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 1</span>
    <span class="bz-flow-step-name">Pick a variant</span>
    <span class="bz-flow-step-desc">Match model size to hardware and task. Use mini for edge, Phi-4 for general text, multimodal for speech and vision.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 2</span>
    <span class="bz-flow-step-name">Get the weights</span>
    <span class="bz-flow-step-desc">Download from Hugging Face under the MIT license, or select the model in Azure AI Foundry.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 3</span>
    <span class="bz-flow-step-name">Run or host</span>
    <span class="bz-flow-step-desc">Run locally with common inference runtimes, or serve it as a managed endpoint through Azure.</span>
  </div>
</div>

The MIT license allows free use, modification, and distribution, including for commercial products. Phi-4 and the reasoning variants are published on Hugging Face and in the Azure AI Foundry catalog. If you already run other Microsoft-hosted models through [Azure OpenAI Service](/tools/azure-openai/), Foundry gives you Phi alongside them without changing clouds.

## How it compares

Phi competes with other small and open model families. The comparison below is about positioning, not a benchmark ranking.

| | Phi-4 | Mistral small models | DeepSeek distills |
|---|---|---|---|
| **Maker** | Microsoft | Mistral AI | DeepSeek |
| **Size focus** | 3.8B to 14B | Small to mid | Distilled small variants |
| **License** | MIT (open weights) | Open weights on many models | Open weights on many models |
| **Strength** | Reasoning at small size | General European multilingual | Distilled reasoning |
| **Best for** | On-device, cost-sensitive apps | Broad general use | Reasoning on a budget |

For the mid-size and multilingual end, see [Mistral AI](/tools/mistral-ai/). For distilled reasoning models released as open weights, see [DeepSeek](/tools/deepseek/).

## When not to use it

Small models trade capability for size. Phi is the wrong choice when:

- **You need frontier-level breadth.** For the hardest open-ended reasoning, broad world knowledge, or long complex documents, a large model still leads. Phi-4's base text context is 16k tokens, smaller than many hosted frontier models.
- **You need the widest tool and ecosystem support.** Frontier hosted APIs ship mature tool-calling, function-calling, and safety tooling. Verify Phi's support for your exact features before committing.
- **Accuracy on rare edge cases is safety-critical.** A smaller parameter count means less capacity to memorise long-tail facts. Add retrieval or human review for high-stakes output.
- **You have no capacity to self-host and want a fully managed frontier experience.** In that case a hosted API may be less operational work, even at higher cost per call.

Match the model to the job. Phi shines when latency, cost, or on-device privacy matter more than absolute peak capability.

## Further reading

- [What is a large language model?](/glossary/llm/): how model size and parameters shape capability and cost.
- [Foundation models](/glossary/foundation-models/): the broad category Phi belongs to.
- [Inference](/glossary/inference/): why running a model is where the cost and latency of small models pays off.
- [Mixture of experts](/glossary/mixture-of-experts/): the architecture behind Phi-3.5-MoE.
- [Azure OpenAI Service](/tools/azure-openai/): Microsoft's hosted model platform, where Phi is also available.
- [Phi open models on Azure](https://azure.microsoft.com/en-us/products/phi): Microsoft's official product page for the family.

## Sources

- [Phi Open Models, Microsoft Azure](https://azure.microsoft.com/en-us/products/phi): official product page for the Phi family.
- [Empowering innovation: the next generation of the Phi family, Microsoft Azure Blog](https://azure.microsoft.com/en-us/blog/empowering-innovation-the-next-generation-of-the-phi-family/): Phi-4-mini and Phi-4-multimodal announcement.
- [Microsoft launches Phi-4-reasoning-plus, VentureBeat](https://venturebeat.com/ai/microsoft-launches-phi-4-reasoning-plus-a-small-powerful-open-weights-reasoning-model): reasoning variant sizes and context length.
- [Microsoft AI released Phi-4 under the MIT license, MarkTechPost](https://www.marktechpost.com/2025/01/08/microsoft-ai-just-fully-open-sourced-phi-4-a-small-language-model-available-on-hugging-face-under-the-mit-license/): open weights and MIT licensing.
- [Microsoft AI releases Phi-3.5 mini, MoE and Vision, MarkTechPost](https://www.marktechpost.com/2024/08/21/microsoft-ai-releases-phi-3-5-mini-moe-and-vision-with-128k-context-multilingual-and-mit-license/): Phi-3.5 family sizes and context.
- [microsoft/phi-4, Hugging Face](https://huggingface.co/microsoft/phi-4): model card for the 14B text model.
