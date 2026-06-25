---
title: "Why AI Companies Are Building Their Own Chips"
description: "Why OpenAI, Google, and Amazon design custom AI silicon: inference cost, performance per watt, supply limits, and control of the full stack."
date: 2026-06-25
categories: [Guides]
tags: ["ai-hardware", "inference", "chips", "infrastructure"]
---

<figure class="bz-figure"><img src="/img/enterprise-dark/server-cpu-split-notext.png" alt="Split image of a dark server room on the left and a red-lit processor chip on the right." loading="lazy"><figcaption>The split between buying off-the-shelf compute and designing your own chip is now a strategic choice for large AI companies.</figcaption></figure>

On 24 June 2026, OpenAI and Broadcom unveiled Jalapeno, OpenAI's first custom chip, built for one job: running AI models in response to user requests. It joins a growing set of in-house chips from Google, Amazon, Microsoft, and Meta. The pattern matters to anyone building with AI because the chip a model runs on shapes both the price you pay per request and how much capacity exists to serve you.

## What just happened with OpenAI Jalapeno

Jalapeno is an inference chip. Inference is the act of running a trained model to answer a query, as opposed to training, which is the process of building the model in the first place. OpenAI designed Jalapeno around the workload behind ChatGPT and its coding models, and Broadcom handles the silicon implementation, networking, and connectivity.

The chip was co-developed from initial design to manufacturing tape-out in about nine months, which OpenAI and Broadcom describe as one of the fastest cycles for a chip of this class. OpenAI used its own models to speed parts of the design. Early reporting put the cost saving at roughly 50% compared with typical AI graphics processing units, and OpenAI cites better performance per watt than current alternatives. The first Jalapeno servers are due online by the end of 2026, expanding toward gigawatt-scale data centres in the years after.

> "We have a deep understanding of the workload. How can we build something that will be able to accelerate what's possible?" - Greg Brockman, OpenAI president, as quoted by TechCrunch.

## ASIC vs GPU in plain words

The two main chip types in this story are the GPU and the ASIC.

A GPU, or graphics processing unit, is a general-purpose accelerator. It was first built for graphics, then adapted for AI. It runs many kinds of model and many kinds of software. Nvidia dominates this market, and its CUDA software is the reason most AI code runs on Nvidia hardware today.

An ASIC, or application-specific integrated circuit, is a chip designed for one narrow task. Google's TPU, Amazon's Trainium and Inferentia, and OpenAI's Jalapeno are all ASICs. Because an ASIC does fewer things, it can do its one thing with less wasted power and silicon. The trade-off is flexibility: change the workload and the chip may no longer fit.

| | GPU (e.g. Nvidia) | ASIC (e.g. TPU, Jalapeno) |
|---|---|---|
| **Designed for** | Many AI and graphics tasks | One narrow workload |
| **Flexibility** | High, runs most models | Low, tuned to specific models |
| **Performance per watt** | Good, general | Higher for the target task |
| **Software ecosystem** | Mature (CUDA) | Owner-controlled, narrower |
| **Best for** | Research, mixed workloads | High-volume, repeated workloads |

## Training chips vs inference chips

Not all AI chips do the same job. Training and inference put different demands on hardware.

<div class="bz-flow"><div class="bz-flow-step"><span class="bz-flow-step-tag">Step 1</span><span class="bz-flow-step-name">Training</span><span class="bz-flow-step-desc">A model learns from data once. Heavy, parallel maths over weeks or months. Needs huge memory and bandwidth.</span></div><div class="bz-flow-arrow">&rarr;</div><div class="bz-flow-step"><span class="bz-flow-step-tag">Step 2</span><span class="bz-flow-step-name">Deployment</span><span class="bz-flow-step-desc">The finished model is copied into data centres to serve users.</span></div><div class="bz-flow-arrow">&rarr;</div><div class="bz-flow-step"><span class="bz-flow-step-tag">Step 3</span><span class="bz-flow-step-name">Inference</span><span class="bz-flow-step-desc">The model answers each query. This runs billions of times. Cost per request and latency dominate.</span></div></div>

Training happens once per model version. Inference happens on every single request, forever. As products like ChatGPT scale to billions of queries, the cost of inference becomes the larger and more predictable bill. That is why several custom chips, including Jalapeno and Google's Ironwood, target inference first. Amazon splits the two jobs across two chip lines: Trainium for training and Inferentia for inference.

## The four reasons companies design their own chips

### 1. The recurring cost of inference

Every query a model answers costs money in electricity and hardware time. A custom chip tuned to a known workload can cut that per-query cost sharply. Amazon reports that workloads moved from Nvidia GPUs to Inferentia can see cost reductions in the range of 80 to 90% for some inference tasks, and its first Inferentia chip delivered up to 70% lower cost per inference than comparable instances. OpenAI's stated 50% saving on Jalapeno follows the same logic. When you run a model billions of times, a fraction off each request adds up fast.

### 2. Performance per watt

Power is a hard limit on how much AI a data centre can run. The bottleneck is increasingly electricity and cooling, not floor space. A chip that does more useful work per watt lets a company serve more users from the same power budget. Google describes its seventh-generation Ironwood TPU as its most energy-efficient custom silicon, with large gains per chip over the prior generation. OpenAI makes performance per watt a central claim for Jalapeno.

### 3. Supply constraints and dependence on Nvidia

Nvidia holds roughly 80% of the AI accelerator market in 2026, and its GPUs are both costly and supply-limited. Hyperscaler capital spending on AI infrastructure in 2026 runs into the hundreds of billions of euros, which strains the supply of chips, networking, power, and cooling. Designing an in-house chip gives a company a second source of compute that it controls, reducing the risk of waiting in line for Nvidia parts. Notably, a large share of Nvidia's revenue comes from the same handful of cloud companies now building their own alternatives.

### 4. Control of the full stack

When a company designs the chip, the networking, and the software together, it can tune each layer to the others. OpenAI co-designed Jalapeno's hardware with its own model software. Google trains and serves Gemini largely on its own TPUs. This vertical control can improve efficiency and reduce reliance on outside vendors for the most strategic part of the business.

## Who is building what

<div class="bz-arch"><div class="bz-arch-layer"><span class="bz-arch-layer-label">OpenAI</span><div class="bz-arch-layer-content"><span class="bz-arch-chip">Jalapeno</span><span class="bz-arch-chip">Inference ASIC</span><span class="bz-arch-chip">Built with Broadcom</span></div></div><div class="bz-arch-layer"><span class="bz-arch-layer-label">Google</span><div class="bz-arch-layer-content"><span class="bz-arch-chip">TPU (Ironwood)</span><span class="bz-arch-chip">Training and inference</span><span class="bz-arch-chip">Serves Gemini</span></div></div><div class="bz-arch-layer"><span class="bz-arch-layer-label">Amazon</span><div class="bz-arch-layer-content"><span class="bz-arch-chip">Trainium</span><span class="bz-arch-chip">Inferentia</span><span class="bz-arch-chip">Used by Anthropic</span></div></div><div class="bz-arch-layer"><span class="bz-arch-layer-label">Others</span><div class="bz-arch-layer-content"><span class="bz-arch-chip">Microsoft Maia</span><span class="bz-arch-chip">Meta MTIA</span><span class="bz-arch-chip">Often via Broadcom</span></div></div></div>

Amazon's custom silicon business, which includes Trainium, Inferentia, and its Graviton general-compute line, passed a 20 billion US dollar annualised run rate by early 2026. Broadcom is the common partner behind much of this work, providing design and manufacturing support for several of these chips.

## What this means if you build with AI

Custom chips do not replace Nvidia GPUs. The consensus in 2026 reporting is that Nvidia's lead holds for training and for flexible, fast-changing research, where its CUDA software is hard to match. Custom ASICs win where the workload is high-volume, stable, and cost-sensitive, which describes most production inference.

For you as a builder, the practical effect is downstream pricing. As providers shift inference onto cheaper in-house chips, the cost per token of running a model can fall, and capacity can expand. You rarely choose the chip directly. You choose a model and a provider, and the chip sits underneath. Knowing which chip a workload runs on helps explain why some inference is cheap and abundant while frontier training stays scarce and expensive.

## Further reading

- [What is AI hardware](/glossary/ai-hardware/): the chips, memory, and networking behind AI systems.
- [What is inference](/glossary/inference/): the difference between training a model and running it.
- [What is an AI factory](/glossary/ai-factory/): the data-centre model behind large-scale AI compute.
- [Ironwood: The first Google TPU for the age of inference](https://blog.google/innovation-and-ai/infrastructure-and-cloud/google-cloud/ironwood-tpu-age-of-inference/): Google's own account of its inference TPU.
- [AI Chip - Amazon Inferentia](https://aws.amazon.com/ai/machine-learning/inferentia/): AWS documentation on its inference accelerator.

## Sources

- [OpenAI](https://openai.com/index/openai-broadcom-jalapeno-inference-chip/)
- [Broadcom](https://investors.broadcom.com/news-releases/news-release-details/openai-and-broadcom-unveil-llm-optimized-intelligence-processor)
- [CNBC](https://www.cnbc.com/2026/06/24/openai-and-broadcom-reveal-jalapeno-first-ai-chip-in-partnership.html)
- [TechCrunch](https://techcrunch.com/2026/06/24/openai-unveils-its-first-custom-chip-built-by-broadcom/)
- [SiliconANGLE](https://siliconangle.com/2026/06/24/openai-broadcom-debut-custom-jalapeno-chip-llm-inference/)
- [ANI News](https://aninews.in/news/business/openai-broadcom-roll-out-jalapeno-ai-chip-for-llm-inference-target-gigawatt-scale-data-centres-from-202620260624210023/)
- [Google Cloud Blog](https://cloud.google.com/blog/products/compute/ironwood-tpus-and-new-axion-based-vms-for-your-ai-workloads)
- [AWS Inferentia](https://aws.amazon.com/ai/machine-learning/inferentia/)
- [EE Times](https://www.eetimes.com/amazon-newest-gambit-selling-ai-chips/)
- [Introl](https://introl.com/blog/custom-silicon-inflection-2026-hyperscaler-asics-nvidia-gpu)
