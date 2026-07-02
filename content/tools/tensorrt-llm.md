---
title: "NVIDIA TensorRT-LLM"
description: "An open-source library that compiles and optimizes large language models for fast inference on NVIDIA GPUs."
date: 2026-06-29
tags: ["inference", "nvidia", "gpu", "optimization", "serving"]
tool_category: "AI"
related:
  - glossary/inference
  - glossary/kv-cache
  - tools/nvidia-ai
  - tools/tgi
---

<figure class="bz-figure">
  <img src="/img/enterprise-dark/server-cpu-split-notext.png" alt="A split image of a server room and a red-lit processor, representing GPU-optimized model inference." loading="lazy">
  <figcaption>TensorRT-LLM turns a trained model into a compiled engine tuned for the exact NVIDIA GPU it runs on.</figcaption>
</figure>

NVIDIA TensorRT-LLM is an open-source library that optimizes large language model [inference](/glossary/inference/) on NVIDIA GPUs. It takes a trained model and applies GPU-specific techniques - custom kernels, quantization, in-flight batching, and a paged [KV cache](/glossary/kv-cache/) - so the model serves more requests per second at lower cost. It solves a common problem: a model that runs correctly in a research notebook is often too slow and too expensive to serve in production without hardware-level tuning.

The library is built for NVIDIA hardware only. It targets data-center GPUs such as H100, H200, and B200, and it supports single-GPU, multi-GPU, and multi-node deployments through tensor, pipeline, and expert parallelism. Released under the Apache 2.0 license, it is the optimization layer behind NVIDIA's higher-level serving products, including NVIDIA NIM microservices and the Triton Inference Server.

## Where it sits in the stack

TensorRT-LLM is not a serving endpoint on its own. It sits between the trained model and the server that clients call, compiling the model into an optimized engine and providing the runtime that executes it.

<div class="bz-arch">
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Client</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Application</span>
      <span class="bz-arch-chip">OpenAI-compatible API</span>
      <span class="bz-arch-chip-note">sends prompts, receives tokens</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Serving</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">NVIDIA NIM</span>
      <span class="bz-arch-chip">Triton Inference Server</span>
      <span class="bz-arch-chip-note">packaging, scaling, request routing</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Optimization runtime</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">TensorRT-LLM engine</span>
      <span class="bz-arch-chip">In-flight batching</span>
      <span class="bz-arch-chip">Paged KV cache</span>
      <span class="bz-arch-chip-note">custom kernels, quantization, speculative decoding</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Hardware</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">NVIDIA GPU</span>
      <span class="bz-arch-chip-note">H100, H200, B200 and other supported cards</span>
    </div>
  </div>
</div>

## What it does to a model

TensorRT-LLM applies several optimizations that work together. Understanding them helps you decide whether the extra compilation step is worth it.

- **Custom kernels.** Hand-tuned GPU code for attention, GEMM (matrix multiply), and mixture-of-experts operations replaces the generic implementations a model ships with.
- **Quantization.** The library supports FP8, FP4, INT8, and INT4 formats, including AWQ and SmoothQuant. Lower-precision weights use less memory and run faster, with a small accuracy trade-off you control.
- **In-flight batching.** Also called continuous batching, this groups incoming requests dynamically and releases each result as soon as it finishes, instead of waiting for a whole batch. It raises throughput and GPU utilization.
- **Paged KV cache.** The [KV cache](/glossary/kv-cache/) holds attention state for each active request. Paging it into fixed blocks, plus cache reuse and quantization, lets more requests share GPU memory at once.
- **Speculative decoding.** A smaller draft model proposes several tokens ahead, and the main model verifies them in one pass. When drafts are accepted, the model produces multiple tokens per step.

## How to use it and how it fits

You install the Python library on a Linux host with a supported NVIDIA GPU and CUDA toolkit, then build an engine from a model checkpoint and serve it. Install the package with pip:

```bash
pip3 install --ignore-installed pip setuptools wheel
pip3 install tensorrt_llm
```

The library exposes a Python API. This minimal example loads a Hugging Face checkpoint, builds an optimized engine, and generates text:

```python
from tensorrt_llm import LLM, SamplingParams

# Build an optimized engine from a checkpoint
llm = LLM(model="meta-llama/Llama-3.1-8B-Instruct")

sampling = SamplingParams(temperature=0.7, max_tokens=256)

outputs = llm.generate(
    ["Explain in-flight batching in one paragraph."],
    sampling,
)

for output in outputs:
    print(output.outputs[0].text)
```

In production you rarely call the library directly. You wrap the engine in Triton Inference Server for scaling and request routing, or you deploy a pre-packaged NVIDIA NIM microservice that already bundles a TensorRT-LLM engine behind an OpenAI-compatible API. See [NVIDIA AI](/tools/nvidia-ai/) for the wider platform, and [From zero to production](/guides/from-zero-to-production/) for the deployment path around it.

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 1</span>
    <span class="bz-flow-step-name">Pick a checkpoint</span>
    <span class="bz-flow-step-desc">Start from a trained model, for example a Llama or Qwen checkpoint.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 2</span>
    <span class="bz-flow-step-name">Choose quantization</span>
    <span class="bz-flow-step-desc">Select FP8, INT8, or INT4 based on your accuracy and memory budget.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 3</span>
    <span class="bz-flow-step-name">Build the engine</span>
    <span class="bz-flow-step-desc">Compile the model for the target GPU. The engine is hardware-specific.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 4</span>
    <span class="bz-flow-step-name">Serve</span>
    <span class="bz-flow-step-desc">Run behind Triton or NIM with in-flight batching and paged KV cache.</span>
  </div>
</div>

## How it compares

TensorRT-LLM competes with other inference engines. The main difference is that it targets NVIDIA hardware exclusively and leans on ahead-of-time compilation, while some alternatives run across more hardware with less setup.

| | TensorRT-LLM | vLLM | TGI | SGLang |
|---|---|---|---|---|
| **Origin** | NVIDIA | UC Berkeley, community | Hugging Face | Community |
| **Hardware** | NVIDIA GPUs only | NVIDIA, AMD, others | NVIDIA, AMD, others | NVIDIA, AMD |
| **Setup** | Compile engine per GPU | Load model, run | Load model, run | Load model, run |
| **Continuous batching** | Yes | Yes | Yes | Yes |
| **Paged KV cache** | Yes | Yes (PagedAttention) | Yes | Yes (RadixAttention) |
| **License** | Apache 2.0 | Apache 2.0 | Apache 2.0 | Apache 2.0 |
| **Best for** | Peak NVIDIA throughput | Portable, easy start | Hugging Face stack | Structured, multi-turn |

For a portable option tied to the Hugging Face ecosystem, see [Text Generation Inference (TGI)](/tools/tgi/). For managed inference where you skip serving entirely, compare [Groq](/tools/groq/), [Fireworks AI](/tools/fireworks-ai/), and [Together AI](/tools/together-ai/).

## When not to use it

TensorRT-LLM rewards heavy, sustained traffic on NVIDIA hardware. It is the wrong choice in several cases.

- **You do not run NVIDIA GPUs.** The library only targets NVIDIA hardware. On AMD or other accelerators, use vLLM, TGI, or SGLang instead.
- **You want to skip infrastructure.** If you would rather call an API than build and serve engines, a managed provider like [Together AI](/tools/together-ai/) or [Fireworks AI](/tools/fireworks-ai/) removes the whole serving layer.
- **You are prototyping or serving low traffic.** The per-GPU compilation step and tuning add operational overhead that a small or bursty workload will not repay.
- **You need instant model swaps.** Because an engine is compiled for a specific model, precision, and GPU, changing any of those means rebuilding. Engines that load weights at runtime react faster to frequent model changes.

## Further reading

- [What is inference?](/glossary/inference/): what happens when a trained model answers a request.
- [What is a KV cache?](/glossary/kv-cache/): the attention state that paged KV cache manages.
- [NVIDIA AI](/tools/nvidia-ai/): the wider NVIDIA platform that packages TensorRT-LLM.
- [Text Generation Inference (TGI)](/tools/tgi/): Hugging Face's portable serving alternative.
- [TensorRT-LLM documentation](https://nvidia.github.io/TensorRT-LLM/): official guides, feature reference, and support matrix.
- [TensorRT-LLM on GitHub](https://github.com/NVIDIA/TensorRT-LLM): source code, examples, and release notes.

## Sources

- [TensorRT-LLM documentation home](https://nvidia.github.io/TensorRT-LLM/): feature list, in-flight batching, paged KV cache, quantization, and speculative decoding.
- [TensorRT-LLM installation guide](https://nvidia.github.io/TensorRT-LLM/installation/linux.html): pip package name and Linux prerequisites.
- [TensorRT-LLM on GitHub](https://github.com/NVIDIA/TensorRT-LLM): open-source library scope, kernels, parallelism, and Apache 2.0 license.
- [NVIDIA TensorRT developer page](https://developer.nvidia.com/tensorrt): TensorRT ecosystem, optimization techniques, and Triton serving relationship.
- [NVIDIA TensorRT-LLM developer page](https://developer.nvidia.com/tensorrt-llm): supported optimizations and GPU inference positioning.
