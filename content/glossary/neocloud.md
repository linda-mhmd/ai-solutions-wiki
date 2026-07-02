---
title: "Neocloud"
description: "A newer cloud provider specialized in GPU compute for AI training and inference, as distinct from a general-purpose hyperscaler."
date: 2026-06-29
tags: ["glossary", "gpu", "cloud", "infrastructure", "inference"]
related:
  - glossary/hyperscaler
  - glossary/inference
  - tools/coreweave
  - tools/lambda-cloud
  - tools/nebius
  - tools/crusoe
  - comparisons/gpu-clouds-and-neoclouds
---

<figure class="bz-figure">
  <img src="/img/enterprise-dark/server-room-corridor-notext.png" alt="A dark server-room corridor lit in red, representing a cloud specialized in GPU compute for AI." loading="lazy">
  <figcaption>A neocloud fills its floor with GPU racks and little else. Compute for AI is the whole product.</figcaption>
</figure>

A neocloud is a newer cloud provider built around one job: renting out GPU compute for AI training and [inference](/glossary/inference/). Instead of offering the broad menu of a general-purpose [hyperscaler](/glossary/hyperscaler/), a neocloud concentrates on fast access to large fleets of Nvidia and other AI accelerators. You get the chips, the high-speed networking that connects them, and the storage that feeds them. The rest of the traditional cloud catalogue, managed databases, email, identity, dozens of regions, is thin or absent by design.

## A plain analogy

Think of the big clouds as sprawling supermarkets. They stock everything, so you can fill an entire shopping cart in one trip, but the shelf you actually need can be picked over or expensive. A neocloud is the specialist deli next door. It sells one category, does it well, and often has stock when the supermarket has run dry. If your only goal is training a model or serving predictions, the deli gets you what you came for at a lower price and with fewer detours.

## Why neoclouds emerged

Three pressures created room for a new kind of provider.

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Pressure 1</span>
    <span class="bz-flow-step-name">GPU scarcity</span>
    <span class="bz-flow-step-desc">Demand for AI accelerators outran supply, so teams needed any provider that could deliver capacity now.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Pressure 2</span>
    <span class="bz-flow-step-name">Price</span>
    <span class="bz-flow-step-desc">Raw GPU rental on general clouds carried a premium. A focused stack cut the cost per GPU hour.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Pressure 3</span>
    <span class="bz-flow-step-name">AI-specific needs</span>
    <span class="bz-flow-step-desc">Large training runs want fast interconnect between many GPUs, not a catalogue of unrelated services.</span>
  </div>
</div>

Reporting on the sector places raw GPU access on neoclouds well below the equivalent on the big clouds, though neoclouds typically ship fewer managed services and fewer regions in exchange. Read the exact trade-off, provider by provider, in the [GPU clouds and neoclouds comparison](/comparisons/gpu-clouds-and-neoclouds/).

## How it works

A neocloud stacks a narrow set of layers, all aimed at feeding the GPUs.

<div class="bz-arch">
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Access</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">On-demand rental</span>
      <span class="bz-arch-chip">Reserved clusters</span>
      <span class="bz-arch-chip-note">Rent by the hour or reserve a block for a training run</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Compute</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">GPU nodes</span>
      <span class="bz-arch-chip">AI accelerators</span>
      <span class="bz-arch-chip-note">Large fleets of Nvidia and other chips, the core product</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Interconnect</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">High-speed networking</span>
      <span class="bz-arch-chip-note">Links many GPUs so a single job can span hundreds of chips</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Storage</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Fast object and file storage</span>
      <span class="bz-arch-chip-note">Streams training data to the GPUs without starving them</span>
    </div>
  </div>
</div>

You spin up GPU nodes, mount your data, run your training or inference job, and release the nodes when you are done. Some neoclouds go a step further and offer managed inference endpoints, so you send prompts to a model and pay per token instead of managing servers yourself.

## How a neocloud differs from a hyperscaler

| | Neocloud | [Hyperscaler](/glossary/hyperscaler/) |
|---|---|---|
| **Focus** | GPU compute for AI | Full cloud catalogue |
| **Service breadth** | Narrow, compute-first | Broad, hundreds of services |
| **GPU price** | Often lower per hour | Usually higher per hour |
| **Regions** | Fewer locations | Global footprint |
| **Best for** | Training and inference at scale | General-purpose apps plus AI |

The line is not absolute. Hyperscalers rent GPUs too, and some neoclouds now add managed services. The useful question is where the provider puts its attention.

## Examples

- [CoreWeave](/tools/coreweave/): one of the largest neoclouds by capacity, focused on GPU clusters at scale.
- [Lambda](/tools/lambda-cloud/): GPU cloud aimed at deep learning and AI research teams.
- [Nebius](/tools/nebius/): AI cloud that also offers managed inference endpoints.
- [Crusoe](/tools/crusoe/): builds GPU capacity around specific energy sources, positioning on power and sustainability.
- [RunPod](/tools/runpod/): on-demand GPU rental popular for smaller jobs and experiments.
- [Vast.ai](/tools/vast-ai/): a marketplace that matches renters with available GPU capacity.

## Further reading

- [What is a hyperscaler?](/glossary/hyperscaler/): the general-purpose clouds neoclouds define themselves against.
- [What is inference?](/glossary/inference/): the workload many neoclouds are optimised to serve.
- [GPU clouds and neoclouds compared](/comparisons/gpu-clouds-and-neoclouds/): provider-by-provider trade-offs on price, services, and regions.
- [CoreWeave](/tools/coreweave/): profile of a leading neocloud.
- [What are Neocloud providers (DriveNets)](https://drivenets.com/resources/education-center/what-are-neocloud-providers/): vendor education page on GPU-as-a-Service.
- [Profiling leading neocloud companies (ABI Research)](https://www.abiresearch.com/blog/leading-neocloud-companies): analyst view of the market and its players.
