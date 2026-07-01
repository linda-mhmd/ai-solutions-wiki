---
title: "Modal"
description: "Modal is a serverless cloud platform for running Python and AI workloads on GPUs without managing servers, billing per second of usage."
date: 2026-06-29
tags: ["serverless", "gpu", "inference", "python", "infrastructure"]
tool_category: "Infrastructure"
related:
  - glossary/inference
  - glossary/fine-tuning
  - tools/runpod
  - tools/baseten
  - comparisons/gpu-clouds-and-neoclouds
---

<figure class="bz-figure">
  <img src="/img/dark-cherry/grid-foundation.png" alt="A dark floor with a red neon grid, representing serverless cloud infrastructure for AI workloads." loading="lazy">
  <figcaption>Modal is the grid beneath your code: you write Python functions, and the platform provisions the GPUs to run them.</figcaption>
</figure>

Modal is a serverless cloud platform for running Python and AI workloads on GPUs. You write ordinary Python functions, add a decorator that declares the hardware you want, and Modal provisions containers in the cloud to run them. There are no servers to configure, no Kubernetes clusters to manage, and no idle machines to pay for. Modal bills per second of compute and scales to zero when nothing is running.

The problem it solves is the gap between a working model on your laptop and a scalable service in production. Renting a GPU virtual machine means paying for it around the clock, patching the operating system, and writing autoscaling logic yourself. Modal removes that operational layer. It handles container builds, cold starts, autoscaling, and scheduling, so you keep your attention on the Python code that does the work.

## Where it sits in the stack

Modal is a compute layer. It sits below your application logic and above the raw GPU hardware, turning a Python function into a scheduled, autoscaling cloud job.

<div class="bz-arch">
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Your code</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Python functions</span>
      <span class="bz-arch-chip">@app.function decorators</span>
      <span class="bz-arch-chip-note">Hardware and dependencies declared in code</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Modal platform</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Container builds</span>
      <span class="bz-arch-chip">Autoscaling</span>
      <span class="bz-arch-chip">Scheduling</span>
      <span class="bz-arch-chip-note">Scale to zero, per-second billing</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">GPU hardware</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">H100</span>
      <span class="bz-arch-chip">A100</span>
      <span class="bz-arch-chip">A10</span>
      <span class="bz-arch-chip-note">Fleet spread across multiple cloud providers</span>
    </div>
  </div>
</div>

## How to access it and how it fits

You define infrastructure inside your Python file. A decorator tells Modal what image to build and which GPU to attach, and the Modal command line tool deploys or runs the function.

```bash
pip install modal
modal setup
```

The `modal setup` step links your account through the browser. From there you write a function and declare its hardware in the decorator.

```python
import modal

app = modal.App("llm-inference")

image = modal.Image.debian_slim().pip_install("vllm", "torch")

@app.function(gpu="A100", image=image)
def generate(prompt: str) -> str:
    from vllm import LLM
    model = LLM("meta-llama/Llama-3.1-8B-Instruct")
    output = model.generate(prompt)
    return output[0].outputs[0].text
```

You run it from the command line, and Modal builds the container, starts a GPU instance, executes the function, and shuts the instance down afterward.

```bash
modal run inference.py
```

To turn the same function into a live HTTP endpoint, you add a web decorator and deploy it. Modal keeps the code warm while traffic arrives and scales back to zero when it stops.

```python
@app.function(gpu="A100")
@modal.fastapi_endpoint(method="POST")
def api(prompt: str) -> dict:
    return {"text": generate.local(prompt)}
```

This model suits three workload shapes well. Serve a model behind an endpoint for real-time [inference](/glossary/inference/). Run a batch of thousands of parallel jobs for embeddings or data processing. Launch a [fine-tuning](/glossary/fine-tuning/) run that finishes in minutes and stops billing the moment it completes. The teams that reach for Modal are usually ML engineers and application developers who want production GPU compute without standing up their own platform team.

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 1</span>
    <span class="bz-flow-step-name">Write function</span>
    <span class="bz-flow-step-desc">Add a decorator declaring the GPU and container image.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 2</span>
    <span class="bz-flow-step-name">Deploy</span>
    <span class="bz-flow-step-desc">Modal builds the image and registers the app.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 3</span>
    <span class="bz-flow-step-name">Autoscale</span>
    <span class="bz-flow-step-desc">Containers start on demand and scale with traffic.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 4</span>
    <span class="bz-flow-step-name">Scale to zero</span>
    <span class="bz-flow-step-desc">Idle containers stop, and billing stops with them.</span>
  </div>
</div>

## Pricing model

Modal bills per second of compute. You pay for the GPU, CPU, and memory a container uses while it runs, and nothing while it sits idle. According to Modal's pricing page, the Starter plan carries no platform fee and includes free monthly compute credits, the Team plan adds a fixed monthly fee with more credits, and an Enterprise tier offers custom volume pricing. GPU rates are published per second for hardware such as the H100, A100, and A10. Because billing stops when a job finishes, a fine-tuning run that completes in 47 minutes costs 47 minutes, not a full rounded-up hour.

## How it compares

Modal is a serverless abstraction. It differs from raw GPU clouds, where you rent a machine and manage it yourself, and from inference-only endpoints, where you deploy a model but cannot run arbitrary code.

| | Modal | [RunPod](/tools/runpod/) | [Baseten](/tools/baseten/) | [CoreWeave](/tools/coreweave/) |
|---|---|---|---|---|
| **Model** | Serverless Python | GPU pods and serverless | Model serving | GPU cloud infrastructure |
| **Runs arbitrary code** | Yes | Yes | Model focused | Yes |
| **Scales to zero** | Yes | Serverless tier | Yes | No, you rent capacity |
| **Billing** | Per second | Per second or hourly | Per usage | Reserved and on demand |
| **Best for** | Batch, inference, training in Python | Cheap raw GPU access | Production model endpoints | Large reserved GPU fleets |

For a wider survey of GPU providers and how serverless platforms sit against dedicated clouds, see the [GPU clouds and neoclouds comparison](/comparisons/gpu-clouds-and-neoclouds/).

## When not to use it

Modal is not the right tool for every job.

- **Steady, always-on high load.** If a GPU runs at full use around the clock, a reserved instance on a GPU cloud is often cheaper than per-second serverless rates.
- **Non-Python stacks.** Modal centers on Python. A service written in Go, Rust, or Java fits a general container platform better.
- **Bare-metal control.** Workloads that need a specific kernel, custom drivers, or direct hardware tuning are constrained by the managed abstraction.
- **Strict data residency in one region.** Modal spreads its fleet across providers. If regulation pins you to a single region or cloud account, a dedicated deployment gives firmer control.

For teams shipping their first GPU service, the [from zero to production guide](/guides/from-zero-to-production/) covers the surrounding deployment decisions.

## Further reading

- [Modal documentation](https://modal.com/docs): official guides for functions, images, GPUs, and deployment
- [Modal pricing](https://modal.com/pricing): plan tiers, free credits, and per-second GPU rates
- [What is inference](/glossary/inference/): the runtime step Modal endpoints serve
- [What is fine-tuning](/glossary/fine-tuning/): the training workload Modal runs as short GPU jobs
- [RunPod](/tools/runpod/): a GPU cloud alternative with raw pods and a serverless tier
- [GPU clouds and neoclouds compared](/comparisons/gpu-clouds-and-neoclouds/): where serverless platforms sit among GPU providers

## Sources

- [Modal homepage](https://modal.com/): platform overview, workload types, and GPU support
- [Modal pricing page](https://modal.com/pricing): plan structure, free credits, and per-second GPU pricing
- [Modal documentation](https://modal.com/docs): Python SDK, decorators, and deployment workflow
