---
title: "OpenAI Unveils Jalapeno, Its First Custom AI Inference Chip"
description: "OpenAI and Broadcom revealed Jalapeno, a custom ASIC built for running large language models, with deployment targeted for late 2026 at gigawatt scale."
date: 2026-06-25
lastmod: 2026-06-25
categories: [News]
tags: ["openai", "broadcom", "ai-hardware", "inference", "chips"]
related:
  - glossary/inference
  - glossary/ai-hardware
  - glossary/ai-factory
---

<figure class="bz-figure"><img src="/img/enterprise-dark/server-cpu-split-notext.png" alt="Split image of a dark server room on the left and a red-lit processor chip on the right, representing custom inference silicon inside a data center." loading="lazy"><figcaption>Jalapeno is a processor designed for one job: running OpenAI's models inside data centers at scale.</figcaption></figure>

On 24 June 2026, OpenAI and Broadcom unveiled Jalapeno, OpenAI's first custom processor. It is an application-specific integrated circuit (ASIC) built only for inference, the work of running a trained model to answer a request. For anyone building products on OpenAI's models, the announcement signals that the company is moving to control its own hardware, the layer that sets the recurring cost of every API call.

## What Jalapeno is

Jalapeno is a custom accelerator, not a general-purpose chip. OpenAI calls it an "Intelligence Processor" and says it is the first in a multi-generation hardware platform the two companies are building together. OpenAI handled the chip design. Broadcom contributed silicon implementation and networking technology. Celestica manages boards, racks, and system integration.

The chip targets [inference](/glossary/inference/) rather than training. Training is the one-time process of building a model. Inference is the repeated process of serving answers from that model. Inference is where the cost shows up every day, because a product like ChatGPT runs inference on every message a user sends.

OpenAI says the design reached tape-out, the point where a finished design is sent for manufacturing, in about nine months. OpenAI describes this as the fastest ASIC development cycle for high-performance semiconductors it is aware of. The company says its own models helped accelerate parts of the design and optimization work.

## How an inference chip fits the stack

A custom inference chip sits at the bottom of the stack that serves an AI product. The model and the application run on top of it. Owning this layer lets OpenAI tune the hardware to its specific models.

<div class="bz-arch"><div class="bz-arch-layer"><span class="bz-arch-layer-label">Application</span><div class="bz-arch-layer-content"><span class="bz-arch-chip">ChatGPT</span><span class="bz-arch-chip">API products</span></div></div><div class="bz-arch-layer"><span class="bz-arch-layer-label">Model</span><div class="bz-arch-layer-content"><span class="bz-arch-chip">Trained LLM weights</span></div></div><div class="bz-arch-layer"><span class="bz-arch-layer-label">Serving software</span><div class="bz-arch-layer-content"><span class="bz-arch-chip">Inference runtime</span><span class="bz-arch-chip-note">Schedules and batches requests onto the hardware</span></div></div><div class="bz-arch-layer"><span class="bz-arch-layer-label">Silicon</span><div class="bz-arch-layer-content"><span class="bz-arch-chip">Jalapeno ASIC</span><span class="bz-arch-chip">Broadcom networking</span></div></div></div>

## Performance and cost claims

OpenAI says early testing shows performance per watt "substantially better" than current state-of-the-art hardware for its target inference workloads. OpenAI also notes these are its own numbers and have not been independently verified.

Broadcom chief executive Hock Tan told Reuters the chip delivers performance on par with Nvidia's Blackwell processors and Google's Tensor Processing Units. He claimed roughly 50% cost savings per inference token compared with current-generation graphics processing units (GPUs).

| | Jalapeno | Nvidia GPU | Google TPU |
|---|---|---|---|
| **Type** | Custom ASIC | General-purpose GPU | Custom ASIC |
| **Primary use** | Inference | Training and inference | Training and inference |
| **Owner** | OpenAI | Nvidia (sold to all) | Google (internal) |
| **Availability** | OpenAI data centers | Open market | Google Cloud |
| **Status** | Tape-out, deploying late 2026 | Shipping | Shipping |

The token cost claim matters because inference is the steady operating expense behind any AI product. A lower cost per token lowers the unit economics of serving millions of users.

## Deployment timeline

Initial large-scale deployment is targeted for late 2026 at gigawatt scale, a measure of the electrical capacity the chips will draw across data centers. OpenAI and Broadcom have described a commitment to deploy OpenAI-designed accelerators at 10 gigawatts of capacity through 2029.

<div class="bz-flow"><div class="bz-flow-step"><span class="bz-flow-step-tag">Step 1</span><span class="bz-flow-step-name">Design</span><span class="bz-flow-step-desc">OpenAI designs the ASIC for its own models.</span></div><div class="bz-flow-arrow">&rarr;</div><div class="bz-flow-step"><span class="bz-flow-step-tag">Step 2</span><span class="bz-flow-step-name">Tape-out</span><span class="bz-flow-step-desc">Finished design sent to manufacturing in about nine months.</span></div><div class="bz-flow-arrow">&rarr;</div><div class="bz-flow-step"><span class="bz-flow-step-tag">Step 3</span><span class="bz-flow-step-name">Deploy</span><span class="bz-flow-step-desc">Initial rollout targeted for late 2026 at gigawatt scale.</span></div><div class="bz-flow-arrow">&rarr;</div><div class="bz-flow-step"><span class="bz-flow-step-tag">Step 4</span><span class="bz-flow-step-name">Scale</span><span class="bz-flow-step-desc">Capacity grows toward 10 gigawatts through 2029.</span></div></div>

The buildout involves partners including Microsoft. Reporting indicates Microsoft has committed to a large share of the initial production run.

## Why it matters

Designing its own inference silicon puts OpenAI alongside the other large model operators that already build custom chips. Google runs its TPUs. Amazon runs Trainium for training and Inferentia for inference. Each company built its own [AI hardware](/glossary/ai-hardware/) to cut its dependence on Nvidia GPUs and to lower the cost of serving models.

For OpenAI, the move marks a shift toward a full-stack infrastructure company that owns the chip, the data center capacity, the model, and the product. It also reduces exposure to GPU supply and pricing. For developers building on OpenAI's API, the relevant question is whether cheaper inference flows through to lower prices over time. The chip is one input into the broader [AI factory](/glossary/ai-factory/) model, where compute capacity is treated as the core production asset.

## Further reading

- [What is inference?](/glossary/inference/): how a trained model serves an answer to a request.
- [AI hardware glossary](/glossary/ai-hardware/): GPUs, TPUs, ASICs, and the chips that run AI.
- [GPU vs TPU](/comparisons/gpu-vs-tpu/): how general-purpose and custom accelerators differ.
- [The LLM landscape in 2026](/comparisons/llm-landscape-2026/): the major model providers and their stacks.
- [OpenAI and Broadcom unveil Jalapeno](https://openai.com/index/openai-broadcom-jalapeno-inference-chip/): the official announcement.

## Sources

- [OpenAI](https://openai.com/index/openai-broadcom-jalapeno-inference-chip/)
- [Broadcom](https://investors.broadcom.com/news-releases)
- [Reuters](https://www.reuters.com/world/asia-pacific/openai-unveils-custom-chip-it-designed-with-broadcom-boost-its-ai-infrastructure-2026-06-24/)
- [TechCrunch](https://techcrunch.com/2026/06/24/openai-unveils-its-first-custom-chip-built-by-broadcom/)
- [The Decoder](https://the-decoder.com/openai-and-broadcom-unveil-jalapeno-a-custom-chip-built-for-llm-inference/)
- [CNBC](https://www.cnbc.com/2026/06/24/openai-and-broadcom-reveal-jalapeno-first-ai-chip-in-partnership.html)
