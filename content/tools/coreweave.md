---
title: "CoreWeave"
description: "CoreWeave is a GPU-focused cloud provider, a neocloud built for training and running AI models at scale."
date: 2026-06-29
tags: ["infrastructure", "gpu", "cloud", "ai-training", "inference"]
tool_category: "Infrastructure"
related:
  - glossary/inference
  - glossary/foundation-models
  - tools/amazon-bedrock
  - tools/lambda-cloud
  - tools/nebius
---

<figure class="bz-figure">
  <img src="/img/enterprise-dark/server-room-corridor-notext.png" alt="A dark server room corridor lit in red, representing a specialized GPU cloud data center." loading="lazy">
  <figcaption>CoreWeave rents fleets of NVIDIA GPUs wired together for one job: training and serving large AI models.</figcaption>
</figure>

CoreWeave is a cloud provider built around one thing: renting NVIDIA GPUs for artificial intelligence work. General clouds like AWS or Azure serve every kind of workload, from email servers to databases. CoreWeave narrows the focus to GPU compute for training foundation models and running [inference](/glossary/inference/) at scale. It calls itself an AI-native cloud. The industry calls this category a "neocloud": a provider that specializes in GPU capacity instead of offering a broad menu of general services.

The problem it solves is supply and specialization. Large AI teams need thousands of the newest GPUs, connected by fast networking, available now, and tuned so a training run does not stall or crash halfway through. Hyperscalers offer GPUs too, but capacity is often scarce and the stack is general-purpose. CoreWeave concentrates its data centers, networking, and software on that narrow demand.

## Where CoreWeave sits in the stack

<div class="bz-arch">
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Your workload</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Model training</span>
      <span class="bz-arch-chip">Fine-tuning</span>
      <span class="bz-arch-chip">Inference serving</span>
      <span class="bz-arch-chip-note">What you run on the rented GPUs</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Orchestration</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">CoreWeave Kubernetes Service</span>
      <span class="bz-arch-chip">Slurm on Kubernetes (SUNK)</span>
      <span class="bz-arch-chip">Mission Control</span>
      <span class="bz-arch-chip-note">Scheduling, observability, job management</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Networking</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">InfiniBand fabric</span>
      <span class="bz-arch-chip">NVIDIA SHARP</span>
      <span class="bz-arch-chip-note">Low-latency links between GPU nodes at cluster scale</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Compute and storage</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">NVIDIA GPUs (Blackwell, Hopper)</span>
      <span class="bz-arch-chip">Bare metal servers</span>
      <span class="bz-arch-chip">Object and file storage</span>
      <span class="bz-arch-chip-note">The physical hardware in CoreWeave data centers</span>
    </div>
  </div>
</div>

CoreWeave sits at the infrastructure layer, below the model. You bring the model and the training code. CoreWeave provides the GPUs, the fast links between them, and the tools to schedule and watch the jobs.

## Neocloud versus hyperscaler

A hyperscaler is a large general-purpose cloud: Amazon Web Services, Microsoft Azure, Google Cloud. It offers hundreds of services across compute, storage, databases, analytics, and more. GPUs are one product among many.

A neocloud specializes. It rents GPU compute and the networking and software that AI teams need around it, and little else. The bet is that focus produces better availability of new hardware, tighter tuning for large training runs, and lower prices per GPU-hour than a general cloud.

## What CoreWeave rents

CoreWeave offers access to NVIDIA GPUs, including current Blackwell-generation parts (such as GB200 and HGX B200) and Hopper-generation parts (H100 and H200), alongside older data-center GPUs. It provides bare-metal servers, an InfiniBand networking fabric that connects GPUs across a cluster, and storage options including object storage and distributed file storage. On top of the hardware, it offers a managed Kubernetes service, a Slurm-on-Kubernetes scheduler for large training jobs, and Mission Control for observability.

## How to access it and typical use

CoreWeave is a cloud service, so there is no local install. You access it as an account and provision GPU clusters through its console, Kubernetes service, or APIs.

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 1</span>
    <span class="bz-flow-step-name">Contact and onboard</span>
    <span class="bz-flow-step-desc">Engage CoreWeave for an account and reserve capacity for your GPU class and cluster size.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 2</span>
    <span class="bz-flow-step-name">Provision a cluster</span>
    <span class="bz-flow-step-desc">Spin up GPU nodes through the CoreWeave Kubernetes Service, connected over InfiniBand.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 3</span>
    <span class="bz-flow-step-name">Run the job</span>
    <span class="bz-flow-step-desc">Schedule training or inference workloads with SUNK or Kubernetes; watch them in Mission Control.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-name">Scale and serve</span>
    <span class="bz-flow-step-desc">Grow the cluster for larger runs, then serve the trained model for inference.</span>
  </div>
</div>

Typical users are AI labs, model builders, and enterprises with heavy AI workloads. CoreWeave has named customers including OpenAI, Mistral AI, IBM, and Google. The common thread is a need for large blocks of current GPUs, wired for distributed training, available on demand.

## How it compares

| | CoreWeave | AWS / Azure / GCP | Lambda Cloud | Nebius |
|---|---|---|---|---|
| **Type** | Neocloud, GPU-focused | Hyperscaler, general | Neocloud, GPU-focused | Neocloud, GPU-focused |
| **Primary offering** | NVIDIA GPU clusters | Full cloud menu | NVIDIA GPU cloud | NVIDIA GPU cloud |
| **Networking** | InfiniBand fabric | Varies by instance | InfiniBand on clusters | InfiniBand on clusters |
| **Managed AI stack** | Kubernetes, SUNK, Mission Control | Broad managed services | GPU-focused tooling | GPU-focused tooling |
| **Best for** | Large-scale training and inference | Teams wanting one cloud for everything | GPU rentals for research and startups | GPU capacity, Europe presence |

CoreWeave is a public company. It listed on Nasdaq under the ticker CRWV on 2025-03-28, at an IPO price of 40 US dollars per share. It was founded in 2017 and is headquartered in Livingston, New Jersey. It began as a crypto-mining startup before pivoting to AI cloud infrastructure.

## When not to use it

CoreWeave is a poor fit if you do not run heavy GPU workloads. If your app is a standard web service, a database, or a batch job on CPUs, a hyperscaler or a smaller host serves you better and cheaper. If you want a single cloud for everything, from your database to your queue to your GPUs, the specialization that makes CoreWeave attractive becomes a limitation, because you would still need another provider for the rest of the stack.

CoreWeave is also aimed at scale. If you want to call a model through a simple API and never manage hardware, a managed model service such as [Amazon Bedrock](/tools/amazon-bedrock/) fits better than renting and operating your own GPU cluster. Renting GPUs means you own the job of scheduling, monitoring, and keeping large runs healthy.

## Further reading

- [What is inference?](/glossary/inference/): why running a trained model is the workload CoreWeave serves at scale.
- [What are foundation models?](/glossary/foundation-models/): the large models that neoclouds like CoreWeave exist to train.
- [Amazon Bedrock](/tools/amazon-bedrock/): a managed alternative when you want models via API instead of raw GPUs.
- [Lambda Cloud](/tools/lambda-cloud/): another GPU-focused neocloud aimed at researchers and startups.
- [Nebius](/tools/nebius/): a neocloud with a strong European footprint.
- [CoreWeave](https://www.coreweave.com/): the official site, with the current product and hardware catalog.
- [CoreWeave IPO pricing announcement](https://www.coreweave.com/news/coreweave-announces-pricing-of-initial-public-offering): the primary source for the listing and share price.

## Sources

- CoreWeave official site: https://www.coreweave.com/
- CoreWeave IPO pricing press release: https://www.coreweave.com/news/coreweave-announces-pricing-of-initial-public-offering
- CNBC, CoreWeave Nasdaq debut, 2025-03-28: https://www.cnbc.com/2025/03/28/coreweave-starts-trading-on-nasdaq-at-per-share.html
