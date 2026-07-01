---
title: "Alibaba Qwen"
description: "Qwen is Alibaba Cloud's family of large language models, many released as open weights under Apache 2.0 and widely used across the open-model ecosystem."
date: 2026-06-29
tags: ["open weights", "llm", "alibaba", "foundation models"]
tool_category: "AI"
related:
  - glossary/llm
  - glossary/foundation-models
  - tools/deepseek
  - tools/mistral-ai
  - comparisons/llm-landscape-2026
---

<figure class="bz-figure">
  <img src="/img/enterprise-dark/pcb-aerial-red-notext.png" alt="An aerial view of a dark circuit board with a red trace network, representing a widely used open model family." loading="lazy">
  <figcaption>Qwen sits deep in the open-model supply chain, powering derivatives and applications well beyond Alibaba's own products.</figcaption>
</figure>

Qwen is the family of [large language models](/glossary/llm/) developed by the Qwen team at Alibaba Cloud, first launched in April 2023 under the Chinese name Tongyi Qianwen. Many Qwen models ship as open weights under the permissive Apache 2.0 license, which means you can download, run, fine-tune, and redistribute them for commercial use without royalty. That combination of capability and open licensing has made Qwen one of the most downloaded and forked model families in the open-model ecosystem, with hundreds of thousands of derivative variations published on Hugging Face.

The problem Qwen solves is access. Frontier-quality [foundation models](/glossary/foundation-models/) are usually locked behind proprietary APIs. Qwen gives teams a route to run competitive models on their own infrastructure, keep data in their own environment, and avoid per-token API lock-in, while still offering a hosted API for teams that prefer it.

## Where Qwen sits in the stack

<div class="bz-arch">
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Applications</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Chat assistants</span>
      <span class="bz-arch-chip">Agents</span>
      <span class="bz-arch-chip">RAG pipelines</span>
      <span class="bz-arch-chip-note">Qwen powers Alibaba products and third-party apps</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Access layer</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Open weights</span>
      <span class="bz-arch-chip">Alibaba Cloud Model Studio API</span>
      <span class="bz-arch-chip">Local runtimes</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Model family</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Qwen3 dense</span>
      <span class="bz-arch-chip">Qwen3 MoE</span>
      <span class="bz-arch-chip">Qwen-VL</span>
      <span class="bz-arch-chip">Qwen-Coder</span>
      <span class="bz-arch-chip-note">Text, vision, audio, code and math variants</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Infrastructure</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Your own GPUs</span>
      <span class="bz-arch-chip">Cloud GPU rental</span>
      <span class="bz-arch-chip">Alibaba Cloud</span>
    </div>
  </div>
</div>

## The model family

Qwen has grown into a broad family rather than a single model. The main lines are:

- **Base text models**: general-purpose language models, evolving through Qwen, Qwen2, Qwen2.5, and Qwen3.
- **Qwen3**: announced in April 2025, released in both dense sizes (0.6B, 1.7B, 4B, 8B, 14B, 32B) and Mixture-of-Experts sizes (30B-A3B and 235B-A22B, where the second number is the active parameter count). Qwen3 supports both a thinking mode for step-by-step reasoning and a faster non-thinking mode.
- **Qwen-VL and Qwen2-VL**: vision-language models that read images alongside text.
- **Qwen2.5-Coder**: code-focused models for generation and completion.
- **Specialized variants**: including math and audio-focused releases, plus multimodal releases that handle voice.

Alibaba also runs proprietary, API-only models such as Qwen3-Max that are not distributed as open weights. Licensing varies across the family: most open-weight releases use Apache 2.0, while some releases use the Qwen License or a research-only license. Check the license on each specific model card before you build on it.

## How to access it

You can use Qwen in three ways, depending on how much control you need.

1. **Download the open weights.** Open-weight Qwen models are published on Hugging Face and ModelScope. You pull the weights and run them on hardware you control. This keeps your prompts and data in your own environment.
2. **Run it locally or self-host.** Qwen open-weight models run through common runtimes such as llama.cpp, Ollama, and LM Studio for local use, or through serving stacks like vLLM for production. You can also [fine-tune](/glossary/fine-tuning/) the open weights on your own data.
3. **Call the hosted API.** Alibaba Cloud Model Studio exposes Qwen models, including proprietary variants, over an API. This route removes the need to manage GPUs and gives you access to models that are not released as open weights.

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 1</span>
    <span class="bz-flow-step-name">Pick a model</span>
    <span class="bz-flow-step-desc">Choose a size and variant. Small dense models for local use, MoE models for higher capability.</span>
  </div>
  <div class="bz-flow-arrow">&rarr;</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 2</span>
    <span class="bz-flow-step-name">Check the license</span>
    <span class="bz-flow-step-desc">Confirm Apache 2.0 or the applicable license on the model card before commercial use.</span>
  </div>
  <div class="bz-flow-arrow">&rarr;</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 3</span>
    <span class="bz-flow-step-name">Deploy or call the API</span>
    <span class="bz-flow-step-desc">Serve the weights on your own GPUs, or call Alibaba Cloud Model Studio.</span>
  </div>
  <div class="bz-flow-arrow">&rarr;</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 4</span>
    <span class="bz-flow-step-name">Adapt</span>
    <span class="bz-flow-step-desc">Fine-tune on your data or wire the model into an agent or RAG pipeline.</span>
  </div>
</div>

## How it compares

Qwen competes most directly with other open-weight model families. The table compares it against three widely used alternatives.

| | Alibaba Qwen | Meta Llama | Mistral AI | DeepSeek |
|---|---|---|---|---|
| **Maker** | Alibaba Cloud | Meta | Mistral AI (France) | DeepSeek (China) |
| **Open weights** | Yes, most releases | Yes | Yes, several models | Yes |
| **Common license** | Apache 2.0 (varies) | Llama community license | Apache 2.0 (varies) | MIT and others (varies) |
| **Architectures** | Dense and MoE | Dense and MoE | Dense and MoE | Dense and MoE |
| **Best for** | Multilingual, wide size range | Large community, tooling | European hosting, efficiency | Reasoning, cost efficiency |

For a broader view of where these families sit, see the [2026 LLM landscape comparison](/comparisons/llm-landscape-2026/), [Mistral AI](/tools/mistral-ai/), and [DeepSeek](/tools/deepseek/).

## When not to use it

- **You need a fully managed frontier product with enterprise support baked in.** A proprietary hosted API from a single vendor may fit your procurement and support needs better than self-hosting open weights.
- **You have strict data-residency or vendor-governance rules that exclude the provider.** Some organizations restrict models developed by specific companies or countries. Confirm your policy before adopting Qwen through the hosted API.
- **You cannot run the model you want.** The largest MoE models need serious GPU capacity. If you lack that hardware and do not want to pay for the hosted API, a smaller model or a different provider may suit you.
- **The license does not permit your use.** Not every Qwen release is Apache 2.0. If a model ships under a research-only or restricted license, do not use it commercially.

## Further reading

- [What is an LLM?](/glossary/llm/): the plain-English explanation of large language models.
- [Foundation models](/glossary/foundation-models/): why large pretrained models are reused across many tasks.
- [Mistral AI](/tools/mistral-ai/): a European open-weight model family and a common Qwen alternative.
- [DeepSeek](/tools/deepseek/): another open-weight family known for reasoning and cost efficiency.
- [The 2026 LLM landscape](/comparisons/llm-landscape-2026/): where open and closed model families sit relative to each other.
- [Qwen official site](https://qwen.ai/): the Qwen team's home page.
- [Qwen3 on GitHub](https://github.com/QwenLM/Qwen3): the official repository with model details and usage.
- [Qwen3 launch blog](https://qwenlm.github.io/blog/qwen3/): the Qwen team's own write-up of Qwen3.

## Sources

- Qwen official site: https://qwen.ai/
- Qwen3 GitHub repository (QwenLM/Qwen3): https://github.com/QwenLM/Qwen3
- Qwen3 blog post (Qwen team): https://qwenlm.github.io/blog/qwen3/
- Qwen on Wikipedia: https://en.wikipedia.org/wiki/Qwen
