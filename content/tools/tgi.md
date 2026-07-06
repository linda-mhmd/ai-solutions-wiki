---
title: "Text Generation Inference (TGI)"
description: "Hugging Face's open-source, production-grade server for deploying open large language models with continuous batching, tensor parallelism, and an OpenAI-compatible API."
date: 2026-06-29
tags: ["inference", "serving", "llm", "self-hosting", "hugging-face"]
tool_category: "AI"
related:
  - glossary/inference
  - glossary/llm
  - tools/nvidia-ai
  - tools/together-ai
  - comparisons/gpu-clouds-and-neoclouds
status: deprecated
status_detail: "Hugging Face put TGI into maintenance mode and archived its GitHub repository (read-only) on 21 March 2026. It now accepts only minor bug fixes, and Hugging Face directs new self-hosted deployments to vLLM, SGLang, llama.cpp, or MLX."
status_source: "https://github.com/huggingface/text-generation-inference"
last_updated: 2026-07-05
lastmod: 2026-07-05
---

<figure class="bz-figure">
  <img src="/img/dark-cherry/cable-sparks.png" alt="An industrial cable throwing red sparks at a junction, representing a high-throughput model-serving engine." loading="lazy">
  <figcaption>TGI is the junction box between your GPUs and your users: it turns raw model weights into a fast, batched, streaming API.</figcaption>
</figure>

Text Generation Inference (TGI) is Hugging Face's open-source toolkit for deploying and serving large language models. It takes an open model such as Llama, Falcon, StarCoder, or BLOOM and exposes it as a fast HTTP service with token streaming and an API that matches the OpenAI Chat Completions format. TGI solves the gap between a model that runs in a notebook and a model that serves thousands of concurrent users without falling over. It is released under the Apache-2.0 license and powers production systems at Hugging Face, including Hugging Chat and the Inference API.

TGI sits at the [inference](/glossary/inference/) layer of a self-hosted stack. You bring the GPUs and the model weights; TGI handles batching, memory, streaming, and the request interface. This makes it a common choice when you want to run open models on your own hardware or in your own cloud account instead of calling a hosted API.

## Where TGI sits in the stack

<div class="bz-arch">
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Client</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Application code</span>
      <span class="bz-arch-chip">OpenAI SDK</span>
      <span class="bz-arch-chip-note">Talks to TGI over the Messages API, compatible with OpenAI Chat Completions</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Serving engine</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">TGI router</span>
      <span class="bz-arch-chip">Continuous batching</span>
      <span class="bz-arch-chip">Token streaming (SSE)</span>
      <span class="bz-arch-chip-note">Rust, Python, and gRPC server that schedules requests and streams tokens</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Model runtime</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Flash Attention</span>
      <span class="bz-arch-chip">Paged Attention</span>
      <span class="bz-arch-chip">Tensor parallelism</span>
      <span class="bz-arch-chip">Quantization</span>
      <span class="bz-arch-chip-note">Optimized transformer code with bitsandbytes, GPT-Q, AWQ, Marlin, fp8</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Hardware</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">NVIDIA GPU</span>
      <span class="bz-arch-chip">AMD Instinct</span>
      <span class="bz-arch-chip">AWS Inferentia</span>
      <span class="bz-arch-chip">Intel Gaudi</span>
      <span class="bz-arch-chip">Google TPU</span>
    </div>
  </div>
</div>

## How to use it and how it fits

TGI ships as a container. You start it, point it at a model on the Hugging Face Hub, and it downloads the weights and serves them. The fastest path is Docker.

```bash
docker run --gpus all --shm-size 1g -p 8080:80 \
  -v $PWD/data:/data \
  ghcr.io/huggingface/text-generation-inference:3.3.5 \
  --model-id HuggingFaceH4/zephyr-7b-beta
```

Once the server reports ready, you call it. TGI exposes a Messages API compatible with the OpenAI Chat Completions API, so an existing OpenAI client works by changing the base URL.

```python
from openai import OpenAI

client = OpenAI(base_url="http://localhost:8080/v1", api_key="not-needed")

response = client.chat.completions.create(
    model="tgi",
    messages=[{"role": "user", "content": "Explain continuous batching in one sentence."}],
    stream=True,
)
for chunk in response:
    print(chunk.choices[0].delta.content or "", end="")
```

The engine detail that matters for throughput is [continuous batching](/glossary/continuous-batching/). Instead of waiting to fill a fixed batch, TGI adds and removes requests from the running batch at each generation step. A short request can finish and free its slot while a long request keeps generating. This keeps the GPU busy and raises total throughput under mixed traffic. Tensor parallelism lets a model that does not fit on one GPU spread across several.

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 1</span>
    <span class="bz-flow-step-name">Request arrives</span>
    <span class="bz-flow-step-desc">A chat completion call hits the TGI router over HTTP.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 2</span>
    <span class="bz-flow-step-name">Batched</span>
    <span class="bz-flow-step-desc">The router adds it to the running batch on the next step, no wait for a full batch.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 3</span>
    <span class="bz-flow-step-name">Generate</span>
    <span class="bz-flow-step-desc">The model runtime produces tokens with Flash Attention and Paged Attention.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 4</span>
    <span class="bz-flow-step-name">Stream out</span>
    <span class="bz-flow-step-desc">Tokens stream back over Server-Sent Events as they are produced.</span>
  </div>
</div>

TGI is production oriented. It emits Prometheus metrics and supports distributed tracing with OpenTelemetry, so you can watch latency and queue depth in the same dashboards as the rest of your services. It also supports guided generation for structured JSON output and function calling.

## How it compares

TGI is one of several open serving engines. The choice usually comes down to hardware, feature needs, and how much tuning you want to do.

| | TGI | vLLM | TensorRT-LLM | SGLang |
|---|---|---|---|---|
| **Maintainer** | Hugging Face | vLLM project | NVIDIA | SGLang project |
| **License** | Apache-2.0 | Apache-2.0 | Apache-2.0 | Apache-2.0 |
| **Continuous batching** | Yes | Yes | Yes | Yes |
| **OpenAI-compatible API** | Yes | Yes | Via wrapper | Yes |
| **Hardware focus** | Broad: NVIDIA, AMD, Inferentia, Gaudi, TPU | Broad, NVIDIA-first | NVIDIA only | NVIDIA-first |
| **Best for** | Hugging Face stack, quick open-model deploys | General self-hosting, high throughput | Peak NVIDIA performance | Structured output, complex prompts |

vLLM and [SGLang](/tools/sglang/) grew out of the same wave of batched serving engines, and Hugging Face now recommends them for new work. [TensorRT-LLM](/tools/tensorrt-llm/) targets peak performance on NVIDIA hardware at the cost of a heavier build and compilation step. TGI keeps the widest hardware coverage and the tightest fit with the Hugging Face Hub.

## When not to use it

- **You do not want to run GPUs.** If self-hosting is not your goal, a hosted API such as [Together AI](/tools/together-ai/) or a managed endpoint removes the operational burden entirely.
- **You need the newest engine features first.** As of 2026 TGI is in maintenance mode. Hugging Face accepts bug fixes and documentation changes but points new work toward vLLM and SGLang, which ship new optimizations faster.
- **You are locked to peak NVIDIA throughput.** If squeezing maximum tokens per second on NVIDIA hardware is the whole point, TensorRT-LLM's compiled kernels may serve you better than a general engine.
- **You only serve one user at low volume.** Continuous batching pays off under concurrency. For a single-user local tool, a lighter runtime such as llama.cpp is enough.

## Further reading

- [What is inference?](/glossary/inference/): the runtime step TGI optimizes, explained in plain terms.
- [SGLang](/tools/sglang/): a serving engine Hugging Face recommends for new deployments, strong on structured output.
- [TensorRT-LLM](/tools/tensorrt-llm/): NVIDIA's compiled engine for peak GPU throughput.
- [GPU clouds and neoclouds compared](/comparisons/gpu-clouds-and-neoclouds/): where to rent the hardware TGI runs on.
- [NVIDIA AI stack](/tools/nvidia-ai/): the drivers, CUDA, and hardware layer beneath any GPU serving engine.
- [TGI documentation](https://huggingface.co/docs/text-generation-inference): the official launcher, API, and configuration reference.

## Sources

- [Text Generation Inference, GitHub repository](https://github.com/huggingface/text-generation-inference): features, supported hardware, Docker usage, and Apache-2.0 license.
- [Text Generation Inference documentation](https://huggingface.co/docs/text-generation-inference): feature list, supported models, maintenance-mode notice, and production users.
