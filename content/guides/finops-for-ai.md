---
title: "FinOps for AI: Controlling the Cost of LLMs and GPUs"
description: "A practical guide to controlling AI spend. Learn the cost drivers behind LLM APIs and GPUs, then the concrete levers to right-size, cache, batch, and monitor cost per request."
date: 2026-06-29
categories: [Guides]
tags: ["finops", "cost-optimization", "inference", "gpu", "llm", "infrastructure"]
related:
  - glossary/inference
  - glossary/kv-cache
  - glossary/continuous-batching
  - comparisons/gpu-clouds-and-neoclouds
  - comparisons/llm-landscape-2026
  - tools/groq
---

<figure class="bz-figure">
  <img src="/img/obsidian-lab/cycle-five-nodes-notext.png" alt="A circular five-node cycle in dark grey and red, representing the ongoing loop of measuring and controlling AI spend." loading="lazy">
  <figcaption>Cost control for AI is a loop, not a one-off audit: you measure, optimize, then operate, and repeat.</figcaption>
</figure>

AI bills grow in ways that surprise finance teams. A single feature can jump from a few euros a day to thousands once traffic scales, and the reasons are rarely obvious from the invoice alone. FinOps for AI applies a simple discipline to that problem: make spend visible, tie it to business value, and give engineers the levers to change it.

The [FinOps Foundation](https://www.finops.org/introduction/what-is-finops/) defines FinOps as an operational framework and cultural practice that maximizes the business value of technology through collaboration between engineering, finance, and business teams. The word combines Finance and DevOps. The point is not to cut spend blindly. It is to make informed trade-offs between speed, cost, and quality.

This guide covers the cost drivers specific to AI, the levers that move them, and a step-by-step plan to build cost visibility you can act on.

## The FinOps loop applied to AI

The FinOps Foundation describes a maturity progression it calls Crawl, Walk, Run, moving from reactive fixes to cost-aware architecture. In practice most teams run a repeating three-stage loop.

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Stage 1</span>
    <span class="bz-flow-step-name">Inform</span>
    <span class="bz-flow-step-desc">Instrument every AI call. Attribute spend to teams, features, and requests. Nobody optimizes what they cannot see.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Stage 2</span>
    <span class="bz-flow-step-name">Optimize</span>
    <span class="bz-flow-step-desc">Pull the levers: right-size models, cache, batch, quantize, and pick the right deployment model for each workload.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Stage 3</span>
    <span class="bz-flow-step-name">Operate</span>
    <span class="bz-flow-step-desc">Set budgets and alerts. Track cost per request over time. Fold cost targets into design reviews.</span>
  </div>
</div>

## The cost drivers behind AI

Before you optimize, understand where the money goes. AI spend comes from a small set of drivers.

### Per-token API pricing

When you call a hosted model, providers charge per token of input and output. Output tokens usually cost more than input tokens. Two things blow up this bill: long prompts (large system prompts, retrieved documents, chat history) and long generations. A request that re-sends a 10,000 token system prompt on every call pays for those tokens every time. See [inference](/glossary/inference/) for how a model turns your prompt into output tokens.

### GPU compute for training and inference

If you self-host models, you rent or own GPUs. Training a model from scratch is expensive and rare for most teams. The recurring cost is inference: keeping GPUs available to serve requests. GPUs are billed by the hour whether they are busy or idle, so utilization is the number that matters.

### The KV cache and context length

This driver is invisible on an API invoice but dominates self-hosted memory. During generation a model stores attention keys and values for every token in the active context. This is the [KV cache](/glossary/kv-cache/). It grows linearly with context length and with the number of concurrent requests (batch size). Long contexts consume large amounts of GPU memory, and that memory ceiling limits how many requests one GPU can serve at once. Fewer concurrent requests per GPU means more GPUs for the same traffic, which means higher cost.

### Idle capacity

A GPU reserved but not serving requests still costs money. Traffic is rarely flat: it spikes during the day and drops at night. If you provision for peak, you pay for idle hardware most of the time. On the API side, idle cost is lower because providers pool capacity across customers, but you trade that for less control.

<div class="bz-arch">
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Business layer</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Cost per request</span>
      <span class="bz-arch-chip">Cost per active user</span>
      <span class="bz-arch-chip-note">The numbers finance and product actually care about</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Serving layer</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Batching</span>
      <span class="bz-arch-chip">Prompt caching</span>
      <span class="bz-arch-chip">Quantization</span>
      <span class="bz-arch-chip-note">Levers that raise throughput per euro</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Model layer</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Small vs large model</span>
      <span class="bz-arch-chip">Context length</span>
      <span class="bz-arch-chip">KV cache footprint</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Compute layer</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">API tokens</span>
      <span class="bz-arch-chip">Self-hosted GPUs</span>
      <span class="bz-arch-chip">Neocloud rental</span>
      <span class="bz-arch-chip-note">Spot, reserved, or on-demand</span>
    </div>
  </div>
</div>

## The levers that move the bill

Each lever below targets one or more of the drivers above. Combine them; they compound.

### Right-size the model

The biggest and easiest win is using a smaller model where it is good enough. Large frontier models cost more per token and per GPU. Many tasks (classification, extraction, routing, short summaries) run well on smaller models. A common pattern is a router: send simple requests to a small model, escalate only hard ones to a large model. Evaluate quality before you switch, not after. See [how AI models are evaluated](/guides/how-ai-models-are-evaluated/) for a rigorous approach.

### Cache repeated context

If many requests share the same prefix (a long system prompt, a fixed instruction set, a retrieved document), prompt caching lets the provider reuse the work instead of reprocessing those tokens every time. Both Anthropic and OpenAI offer prompt caching. Anthropic documents cache reads billed at a fraction of the standard input rate, and OpenAI applies an automatic discount to cached input tokens. The exact discount depends on the provider and model, so check current pricing. The structural rule is the same everywhere: put stable content at the front of the prompt and keep it identical between calls so the cache hits.

### Batch requests

Serving requests one at a time wastes the GPU. [Continuous batching](/glossary/continuous-batching/) packs many requests through the model together and adds new requests as slots free up, which raises throughput per GPU dramatically. For work that is not latency-sensitive (nightly reports, bulk classification, data enrichment), API providers also offer asynchronous batch tiers. Anthropic documents its Message Batches API at 50 percent off standard token prices with results returned within 24 hours. If you can wait, batch.

### Quantize the model weights

Quantization stores model weights at lower numeric precision (for example 8-bit or 4-bit instead of 16-bit). Lower precision means less memory and often faster inference, so the same GPU serves more traffic or a smaller GPU suffices. The trade-off is a possible drop in quality, which varies by model and task. Measure quality on your own evaluation set before shipping a quantized model.

### Shorten context and control output

Every token you send and every token you generate costs money and KV cache memory. Trim system prompts. Retrieve fewer, more relevant documents rather than dumping everything. Cap output length with a max-tokens limit. On self-hosted setups, shorter contexts shrink the KV cache, which lets you batch more requests per GPU.

### Choose the right deployment model

The single largest architectural decision is where the model runs: a hosted API, your own self-hosted GPUs, or a specialized GPU cloud (a neocloud). Each has a different cost curve against scale. The decision table below breaks it down.

### Use spot and reserved GPU pricing

If you self-host or rent from a neocloud, match the pricing model to the workload. Spot or preemptible instances cost far less than on-demand but can be reclaimed with little notice, so use them for fault-tolerant batch jobs. Reserved or committed capacity discounts steady, predictable inference traffic. On-demand is the most expensive per hour and fits unpredictable spikes only.

### Monitor cost per request

The metric that ties everything together is cost per request (or cost per successful task). It normalizes spend against usage, so a rising total bill with flat cost per request means healthy growth, while a rising cost per request means waste creeping in. Track it per feature and per model.

## Decision table: API vs self-host vs neocloud

Match the deployment model to your scale and control needs. Compare specialized providers in [GPU clouds and neoclouds](/comparisons/gpu-clouds-and-neoclouds/).

| | Hosted API | Self-hosted GPU | Neocloud (rented GPU) |
|---|---|---|---|
| **Upfront effort** | Lowest | Highest | Medium |
| **Cost at low volume** | Cheapest | Expensive (idle GPUs) | Expensive |
| **Cost at high steady volume** | Can get expensive | Cheapest if well utilized | Competitive |
| **Utilization risk** | Provider absorbs it | You pay for idle | You pay for idle |
| **Model choice** | Provider catalog | Any open model | Any open model |
| **Data control** | Sent to provider | Fully in your stack | In rented environment |
| **Best for** | Early stage, spiky traffic | Large steady load, strict data rules | Scaling open models, GPU access |

A common path: start on an API to ship fast, then move high-volume steady workloads to self-hosted or neocloud once cost per request justifies the operational overhead. For running across several environments at once, see [multi-cloud AI strategy](/guides/multi-cloud-ai-strategy/). Latency-focused inference providers like [Groq](/tools/groq/) sit alongside these options for workloads where speed is the priority. For picking the model itself, see the [LLM landscape 2026](/comparisons/llm-landscape-2026/).

## Step by step: set up cost visibility

You cannot optimize what you cannot see. Build the Inform stage first.

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 1</span>
    <span class="bz-flow-step-name">Tag every call</span>
    <span class="bz-flow-step-desc">Attach metadata to each request: team, feature, environment, model. Cloud and API bills are useless without attribution.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 2</span>
    <span class="bz-flow-step-name">Log tokens and GPU time</span>
    <span class="bz-flow-step-desc">Record input tokens, output tokens, and GPU seconds per request. These are the raw units of AI cost.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 3</span>
    <span class="bz-flow-step-name">Compute cost per request</span>
    <span class="bz-flow-step-desc">Turn raw usage into euro per request and per feature using current rate cards. Make it a dashboard, not a spreadsheet.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 4</span>
    <span class="bz-flow-step-name">Set budgets and alerts</span>
    <span class="bz-flow-step-desc">Define per-feature budgets. Alert when cost per request or daily total crosses a threshold, before the monthly invoice.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 5</span>
    <span class="bz-flow-step-name">Review and design in</span>
    <span class="bz-flow-step-desc">Bring cost per request into architecture reviews. Treat a cost regression like a performance regression.</span>
  </div>
</div>

### Concrete actions for each step

Step 1: most API SDKs accept a metadata or user field on each request. Populate it with a stable identifier for the feature and team. For self-hosted serving, add the same tags to your request logs.

Step 2: log the token counts the API returns in its response, not estimates. For GPU workloads, capture the GPU hours from your cloud billing export and divide by request count for that window.

Step 3: multiply logged tokens by the current per-token rate for the model, and GPU seconds by the hourly rate divided by 3600. Group by feature. Publish a shared dashboard so finance and engineering read the same numbers.

Step 4: set a daily budget per feature based on expected traffic. Wire alerts to the channel the on-call engineer watches, not a mailbox nobody reads.

Step 5: add a line to your design review checklist: what is the expected cost per request, and which lever holds it down? This is the Operate stage that keeps the loop turning.

## Common mistakes to avoid

Do not provision GPUs for peak and forget them: idle GPUs are the most common source of waste. Do not re-send unchanged context on every call when caching is available. Do not default to the largest model out of caution; measure whether a smaller one passes your evaluations. Do not treat the monthly invoice as your only signal; by then the money is spent. For a broader path from prototype to running system, see [from zero to production](/guides/from-zero-to-production/).

## Further reading

- [What is FinOps](https://www.finops.org/introduction/what-is-finops/): the FinOps Foundation's definition, principles, and maturity model.
- [Inference](/glossary/inference/): how a model turns a prompt into output tokens, the unit most AI cost is billed against.
- [KV cache](/glossary/kv-cache/): why context length drives GPU memory and limits how many requests one GPU can serve.
- [Continuous batching](/glossary/continuous-batching/): the serving technique that raises throughput per GPU by packing requests together.
- [GPU clouds and neoclouds](/comparisons/gpu-clouds-and-neoclouds/): a comparison of specialized GPU rental providers for self-hosted inference.
- [LLM landscape 2026](/comparisons/llm-landscape-2026/): a survey of current models to help right-size your model choice.
- [How AI models are evaluated](/guides/how-ai-models-are-evaluated/): how to confirm a smaller or quantized model is good enough before you switch.
- [Multi-cloud AI strategy](/guides/multi-cloud-ai-strategy/): running AI workloads across more than one provider to balance cost and resilience.
