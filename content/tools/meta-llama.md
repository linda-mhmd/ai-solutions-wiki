---
title: "Meta Llama"
description: "Meta's family of open-weight large language models, downloadable for self-hosting and served across many cloud platforms."
date: 2026-06-29
tags: ["open-weight", "llm", "foundation-models", "meta", "self-hosting"]
tool_category: "AI"
related:
  - glossary/foundation-models
  - glossary/llm
  - glossary/mixture-of-experts
  - tools/alibaba-qwen
  - tools/mistral-ai
  - tools/deepseek
  - comparisons/llm-landscape-2026
---

<figure class="bz-figure">
  <img src="/img/shaping-ai/stacked-server-block-red-notext.png" alt="A multi-layer server block with red strips, representing a widely deployed open-weight model family." loading="lazy">
  <figcaption>Llama weights are downloadable, so the model runs on your own servers rather than only behind a vendor API.</figcaption>
</figure>

Meta Llama is Meta's family of open-weight [large language models](/glossary/llm/). The weights are published for download, so you can run the model on your own hardware, fine-tune it, and serve it through the platform of your choice. This solves a problem that closed model APIs cannot: full control over where the model runs, what data it sees, and how it is customised, without sending every request to a third-party endpoint. Llama became one of the most widely deployed open-weight model ecosystems since its first release on 24 February 2023.

The current generation, Llama 4, is Meta's first family built on a [mixture-of-experts](/glossary/mixture-of-experts/) architecture and its first that is natively multimodal, meaning a single model handles text and images together.

## Where Llama sits

Llama is a set of downloadable [foundation models](/glossary/foundation-models/). It occupies the model layer of a stack: you supply the serving infrastructure and application code around it.

<div class="bz-arch">
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Application</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Chat and agents</span>
      <span class="bz-arch-chip">RAG pipelines</span>
      <span class="bz-arch-chip-note">Your product logic and prompts</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Serving</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">vLLM</span>
      <span class="bz-arch-chip">Ollama</span>
      <span class="bz-arch-chip">Hosted inference APIs</span>
      <span class="bz-arch-chip-note">Self-hosted or via a provider</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Model weights</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Llama 4 Scout</span>
      <span class="bz-arch-chip">Llama 4 Maverick</span>
      <span class="bz-arch-chip-note">Downloadable, open-weight</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Hardware</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">GPU servers</span>
      <span class="bz-arch-chip">Cloud GPU rental</span>
      <span class="bz-arch-chip-note">You own or rent the compute</span>
    </div>
  </div>
</div>

## The Llama 4 family

Meta released two open-weight Llama 4 models and announced a third, larger model that was still in training at the last public update.

- **Llama 4 Scout**: a 17 billion active parameter model with 16 experts, 109 billion total parameters, and a stated context window of 10 million tokens. Natively multimodal.
- **Llama 4 Maverick**: a 17 billion active parameter model with 128 experts and 400 billion total parameters. Natively multimodal.
- **Llama 4 Behemoth**: a 288 billion active parameter model with 16 experts and nearly two trillion total parameters. Announced as still in training and not released as of Meta's April 2026 update.

Scout and Maverick use a mixture-of-experts design. Only a fraction of the total parameters activate for any given token, which lowers the compute cost of running a large model.

## How to access it

There are two main paths, and you can mix them.

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 1</span>
    <span class="bz-flow-step-name">Get the weights</span>
    <span class="bz-flow-step-desc">Download from llama.com or Hugging Face after accepting the license.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 2</span>
    <span class="bz-flow-step-name">Choose serving</span>
    <span class="bz-flow-step-desc">Self-host with vLLM or Ollama, or use a hosted inference provider.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 3</span>
    <span class="bz-flow-step-name">Customise</span>
    <span class="bz-flow-step-desc">Fine-tune on your data or wire the model into a RAG or agent pipeline.</span>
  </div>
</div>

**Self-hosting.** Download Scout or Maverick from llama.com or Hugging Face, then serve the weights on your own GPU servers or rented cloud GPUs. This gives you data residency, offline operation, and the ability to fine-tune freely.

**Hosted APIs.** Many providers serve Llama behind an API so you skip infrastructure work. That includes cloud model catalogues and dedicated inference vendors. The trade-off is that you no longer control where the model runs.

Both paths are governed by the Llama 4 Community License Agreement and the Llama 4 Acceptable Use Policy. This license permits commercial use but is not an OSI-approved open-source license. It carries conditions, including a threshold clause that has historically required a separate license for the largest deployers, and use restrictions defined by the acceptable use policy. Read the license before shipping to production.

## How it compares

Llama competes with other open-weight families and with closed model APIs. The main axis is control versus convenience.

| | Meta Llama | Alibaba Qwen | Mistral | Closed API (Claude, Gemini) |
|---|---|---|---|---|
| **Weights** | Downloadable | Downloadable | Downloadable | Not released |
| **Self-host** | Yes | Yes | Yes | No |
| **License type** | Community license, use limits | Apache 2.0 on many models | Apache 2.0 on open models | Proprietary API only |
| **Multimodal** | Yes (Llama 4) | Yes (several models) | Yes (several models) | Yes |
| **Best for** | Control and fine-tuning | Multilingual, permissive terms | European stack, efficiency | No infra, fastest to start |

See [Alibaba Qwen](/tools/alibaba-qwen/), [Mistral AI](/tools/mistral-ai/), and [DeepSeek](/tools/deepseek/) for the other major open-weight options, and the [LLM landscape 2026](/comparisons/llm-landscape-2026/) for the full picture including closed providers.

## When not to use it

- **You want zero infrastructure.** If you have no wish to manage GPUs or a serving stack, a closed API removes that burden. Hosted Llama providers narrow the gap but you still pick and manage a vendor.
- **The license clashes with your case.** The Llama Community License is not a permissive open-source license. If you need Apache 2.0 style freedom, a Qwen or Mistral open model may fit better.
- **You need the single strongest general model regardless of openness.** Frontier closed models may lead on specific tasks. Benchmark against your own workload before committing.
- **Your deployment crosses the license thresholds.** Very large-scale deployers face extra conditions. Confirm your obligations with legal counsel first.

## Further reading

- [What are foundation models?](/glossary/foundation-models/): the model category Llama belongs to.
- [What is a large language model?](/glossary/llm/): the core concept behind Llama.
- [What is mixture of experts?](/glossary/mixture-of-experts/): the architecture Llama 4 uses.
- [Alibaba Qwen](/tools/alibaba-qwen/): a permissively licensed open-weight alternative.
- [Mistral AI](/tools/mistral-ai/): open models from a European provider.
- [LLM landscape 2026](/comparisons/llm-landscape-2026/): how open and closed models compare.
- [Llama official site](https://www.llama.com/): downloads and documentation from Meta.

## Sources

- [Llama official site](https://www.llama.com/): Meta's Llama home, download and license entry point.
- [The Llama 4 herd, Meta AI blog](https://ai.meta.com/blog/llama-4-multimodal-intelligence/): model specifications for Scout, Maverick, and Behemoth, and the mixture-of-experts and multimodal claims.
- [Llama (language model), Wikipedia](https://en.wikipedia.org/wiki/Llama_(language_model)): release history, license name, and documented use restrictions.
