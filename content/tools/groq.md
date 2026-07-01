---
title: "Groq"
description: "Groq builds the LPU, a custom inference chip, and GroqCloud, a fast, OpenAI-compatible API for running open models."
date: 2026-06-29
tags: ["inference", "hardware", "llm", "cloud"]
tool_category: "AI"
related:
  - glossary/inference
  - glossary/foundation-models
  - tools/fireworks-ai
  - tools/together-ai
  - comparisons/llm-landscape-2026
---

<figure class="bz-figure">
  <img src="/img/enterprise-dark/server-cpu-split-notext.png" alt="A split image of a server room and a red-lit processor, representing custom inference hardware." loading="lazy">
  <figcaption>Groq designs its own silicon, the LPU, so that running a model is fast and predictable rather than an afterthought on general-purpose chips.</figcaption>
</figure>

Groq is a hardware and cloud company built around one job: running models that already exist, not training them. It designs the LPU (Language Processing Unit), a chip purpose-built for [inference](/glossary/inference/), and offers GroqCloud, an API for calling open [foundation models](/glossary/foundation-models/) at high speed. The problem it solves is latency. Most inference runs on GPUs designed for training, where memory movement and unpredictable scheduling add delay. Groq rearranges the hardware so tokens come back fast and at a predictable rate.

Jonathan Ross, who earlier worked on Google's Tensor Processing Unit, founded Groq in 2016. The company frames the LPU with the line "Designed for inference. Not adapted for it."

## Where it sits in the stack

<div class="bz-arch">
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Your app</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Chatbot</span>
      <span class="bz-arch-chip">Agent loop</span>
      <span class="bz-arch-chip">RAG backend</span>
      <span class="bz-arch-chip-note">Calls an OpenAI-compatible endpoint</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">API layer</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">GroqCloud API</span>
      <span class="bz-arch-chip">OpenAI-compatible routes</span>
      <span class="bz-arch-chip-note">Swap the base URL and key, keep your client code</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Model layer</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Open-weight LLMs</span>
      <span class="bz-arch-chip">Llama family</span>
      <span class="bz-arch-chip-note">Hosted open models, not Groq's own model</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Hardware layer</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">LPU</span>
      <span class="bz-arch-chip">On-chip SRAM</span>
      <span class="bz-arch-chip">Deterministic compiler</span>
      <span class="bz-arch-chip-note">Custom silicon instead of GPUs</span>
    </div>
  </div>
</div>

## What an LPU is

An LPU is a processor built for one shape of work: the linear algebra that runs a language model forward, token by token. Groq describes several design choices that set it apart from a GPU.

- **On-chip memory as primary storage.** The LPU holds hundreds of megabytes of SRAM as the main place model weights live, not as a cache. Groq says this keeps the compute units fed at full speed and cuts latency. A GPU, by contrast, moves weights back and forth from separate high-bandwidth memory, which adds delay.
- **Deterministic execution.** A purpose-built compiler schedules every operation ahead of time. Groq calls this static scheduling and says "every cycle is accounted for," so the chip runs at a consistent, predictable rate rather than reacting to runtime surprises.
- **Direct chip-to-chip links.** For large models spread across many chips, Groq connects LPUs directly so hundreds of them "act as a single core," with the compiler predicting when data arrives instead of relying on switches.
- **Air-cooled by design.** Groq states the LPU is air-cooled, which avoids the liquid-cooling plumbing that dense GPU racks often need.

The short version: a GPU is a flexible engine that can train and serve many workloads. An LPU narrows the target to inference and trades generality for speed and predictability.

## How to access it

You do not buy an LPU. You call GroqCloud, a hosted API. GroqCloud is OpenAI-compatible, so if your code already talks to an OpenAI-style endpoint, you point it at Groq by changing the base URL and API key.

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 1</span>
    <span class="bz-flow-step-name">Get a key</span>
    <span class="bz-flow-step-desc">Sign up at console.groq.com and create an API key.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 2</span>
    <span class="bz-flow-step-name">Pick a model</span>
    <span class="bz-flow-step-desc">Choose a hosted open model, such as a Llama variant, from the model list.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 3</span>
    <span class="bz-flow-step-name">Point your client</span>
    <span class="bz-flow-step-desc">Set the base URL to Groq and reuse your OpenAI-style client.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 4</span>
    <span class="bz-flow-step-name">Stream tokens</span>
    <span class="bz-flow-step-desc">Send prompts and stream responses back to your app.</span>
  </div>
</div>

Groq reports that roughly three million developers and teams use its platform, and names customers including Vercel, Canva, and Robinhood. The typical use is any workload where response speed matters: live chat, voice interfaces, and agent loops that make many model calls in sequence.

## How it compares

Groq competes with other providers that host open models behind fast APIs. The main difference is that Groq runs custom silicon, while most rivals run GPUs.

| | Groq | [Fireworks AI](/tools/fireworks-ai/) | [Together AI](/tools/together-ai/) | Major GPU clouds |
|---|---|---|---|---|
| **Hardware** | Custom LPU | GPU | GPU | GPU |
| **Main pitch** | Very fast, predictable inference | Fast open-model serving | Broad open-model catalog | General compute and inference |
| **Own model** | No, hosts open models | No, hosts open models | No, hosts open models | Varies |
| **API style** | OpenAI-compatible | OpenAI-compatible | OpenAI-compatible | Varies by provider |
| **Best for** | Latency-sensitive apps | Tuned open-model endpoints | Model variety and fine-tuning | Mixed training and serving |

## When not to use it

- **You need to train or fine-tune models.** The LPU targets inference. For training runs, use a GPU cloud.
- **You need a specific closed model.** Groq hosts open-weight models. If your product depends on a proprietary model such as Claude, use that vendor's API or a platform like [Amazon Bedrock](/tools/amazon-bedrock/).
- **Latency is not your bottleneck.** If your workload is batch processing where total cost matters more than speed per token, compare per-token pricing across providers before committing.
- **You need a model Groq does not host.** Check the current model list first. If your chosen model is absent, a broader catalog provider may fit better.

## Further reading

- [What is inference?](/glossary/inference/): why running a trained model is a separate problem from training it.
- [What are foundation models?](/glossary/foundation-models/): the large open models that GroqCloud serves.
- [Fireworks AI](/tools/fireworks-ai/): a GPU-based provider for fast open-model serving.
- [The LLM landscape in 2026](/comparisons/llm-landscape-2026/): where inference providers fit among model makers.
- [What is a Language Processing Unit? (Groq)](https://groq.com/blog/the-groq-lpu-explained): Groq's own explanation of the chip.
- [LPU architecture (Groq)](https://groq.com/lpu-architecture): the official architecture overview.

## Sources

- [Groq homepage](https://groq.com/)
- [LPU architecture](https://groq.com/lpu-architecture)
- [What is a Language Processing Unit?](https://groq.com/blog/the-groq-lpu-explained)
- [Inside the LPU: Deconstructing Groq's Speed](https://groq.com/blog/inside-the-lpu-deconstructing-groq-speed)
