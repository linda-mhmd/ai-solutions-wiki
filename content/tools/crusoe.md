---
title: "Crusoe"
description: "Crusoe is an energy-first AI cloud that builds its own data centers and rents NVIDIA and AMD GPU capacity for training and inference."
date: 2026-06-29
tags: ["gpu-cloud", "neocloud", "infrastructure", "ai-cloud", "inference"]
tool_category: "Infrastructure"
related:
  - tools/coreweave
  - tools/nebius
  - tools/lambda-cloud
  - tools/together-ai
  - glossary/inference
---

<figure class="bz-figure">
  <img src="/img/obsidian-lab/server-cables-copper-notext.png" alt="A dark server rack with copper braided cables, representing energy-focused AI data centers." loading="lazy">
  <figcaption>Crusoe pairs the compute layer with the power layer, building and operating the data centers its GPUs run in.</figcaption>
</figure>

Crusoe is a vertically integrated AI cloud that describes itself as "the energy-first AI factory company." It sources energy, builds and operates hyperscale AI data centers, and rents that capacity as a GPU cloud for training and [inference](/glossary/inference/). The problem it targets is the bottleneck behind every large model project: not chips alone, but the power and physical buildings to run them. Crusoe controls the whole stack, from the turbine to the GPU, so it can add capacity without waiting on a landlord or a utility.

The company started in 2018 with patented Digital Flare Mitigation technology, converting wasted natural gas into electricity for computing. In 2025 it divested its bitcoin mining business to focus on AI infrastructure, and it now runs a diversified energy portfolio that includes geothermal and hydro power, gas turbines, and second-life EV batteries.

## Where Crusoe sits in the stack

Crusoe operates lower in the stack than a typical model API provider. It owns the energy and buildings, then layers cloud services on top.

<div class="bz-arch">
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Managed AI</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Crusoe Managed Inference</span>
      <span class="bz-arch-chip">Intelligence Foundry model marketplace</span>
      <span class="bz-arch-chip-note">Serve open models like Llama and DeepSeek behind an endpoint</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Cloud platform</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Crusoe Cloud</span>
      <span class="bz-arch-chip">Managed Kubernetes</span>
      <span class="bz-arch-chip">Managed Slurm</span>
      <span class="bz-arch-chip">AutoClusters</span>
      <span class="bz-arch-chip">Command Center</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Compute</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">NVIDIA GB200 NVL72</span>
      <span class="bz-arch-chip">NVIDIA HGX B200</span>
      <span class="bz-arch-chip">NVIDIA H200 / H100</span>
      <span class="bz-arch-chip">AMD MI355X / MI300X</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Facilities</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Crusoe Spark modular data centers</span>
      <span class="bz-arch-chip">Crusoe Edge Zones</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Energy</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Geothermal and hydro</span>
      <span class="bz-arch-chip">Gas turbines</span>
      <span class="bz-arch-chip">Second-life EV batteries</span>
    </div>
  </div>
</div>

## How to access it and typical use

Crusoe sells two things depending on how much you want to manage yourself.

- **Crusoe Cloud** gives you raw GPU infrastructure. You rent clusters of NVIDIA or AMD accelerators and run your own training or serving stack on top, with Managed Kubernetes, Managed Slurm, and AutoClusters to schedule the work. This suits teams training or fine-tuning large models who want dense, high-end GPU capacity without buying hardware.
- **Crusoe Managed Inference** is a platform service. You call an endpoint and Crusoe serves an open model for you, drawing from its Intelligence Foundry marketplace, which lists models such as Llama, DeepSeek, GLM, Kimi, and Nemotron. This suits teams that want production inference without operating clusters.

Access starts through the Crusoe website: request access, then provision resources through the Crusoe Cloud console and the Command Center operations view. Because Crusoe builds its own sites, capacity is often contracted in advance for larger commitments rather than clicked into existence like a hyperscaler instance.

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 1</span>
    <span class="bz-flow-step-name">Choose the layer</span>
    <span class="bz-flow-step-desc">Raw GPU clusters through Crusoe Cloud, or a served endpoint through Managed Inference.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 2</span>
    <span class="bz-flow-step-name">Provision capacity</span>
    <span class="bz-flow-step-desc">Pick GPU type and cluster size, then schedule with Kubernetes or Slurm.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 3</span>
    <span class="bz-flow-step-name">Run the workload</span>
    <span class="bz-flow-step-desc">Train, fine-tune, or serve models on the allocated GPUs.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 4</span>
    <span class="bz-flow-step-name">Operate and monitor</span>
    <span class="bz-flow-step-desc">Track jobs, usage, and health through the Command Center.</span>
  </div>
</div>

## How Crusoe compares

Crusoe belongs to the "neocloud" category: specialist GPU clouds that compete with hyperscalers on price and availability of scarce accelerators. Its differentiator is owning the energy and buildings, not renting them.

| | Crusoe | CoreWeave | Nebius | Lambda |
|---|---|---|---|---|
| **Primary focus** | Energy plus GPU cloud | GPU cloud at scale | GPU cloud and platform | GPU cloud for AI |
| **Owns energy layer** | Yes, energy-first | No | No | No |
| **Managed inference** | Yes | Limited | Yes | Yes |
| **GPU vendors** | NVIDIA and AMD | Mainly NVIDIA | Mainly NVIDIA | Mainly NVIDIA |
| **Best for** | Power-constrained scale | Large NVIDIA fleets | Full AI platform | Fast GPU access |

For the neighboring options, see [CoreWeave](/tools/coreweave/), [Nebius](/tools/nebius/), [Lambda Cloud](/tools/lambda-cloud/), and the serving-focused [Together AI](/tools/together-ai/). If you want a fully managed model API instead of infrastructure, [Amazon Bedrock](/tools/amazon-bedrock/) sits one layer higher again.

## When not to use it

- **You want a plug-and-play model API and nothing else.** A managed API like Bedrock or a first-party lab endpoint is faster to adopt than provisioning cloud capacity.
- **You need instant, self-serve elastic scaling for small jobs.** Neoclouds shine at reserved, dense GPU capacity, less so at spiky micro-workloads that a hyperscaler spot instance handles cheaply.
- **You are locked into one hyperscaler's managed services.** If your data, IAM, and pipelines live inside AWS, Azure, or Google Cloud, moving GPU workloads to a separate cloud adds integration and egress work.
- **You need a specific region Crusoe does not serve.** Because Crusoe builds physical sites, availability follows its footprint rather than a global default.

## Further reading

- [What is inference?](/glossary/inference/): the serving step Crusoe Managed Inference is built to accelerate.
- [CoreWeave](/tools/coreweave/): a large NVIDIA-focused neocloud competitor.
- [Nebius](/tools/nebius/): a neocloud with a broader managed AI platform.
- [Lambda Cloud](/tools/lambda-cloud/): GPU cloud focused on fast access for AI teams.
- [From zero to production](/guides/from-zero-to-production/): how a model workload moves from prototype to a served endpoint.
- [Crusoe company page](https://www.crusoe.ai/about/company): founding story, mission, and energy approach.
- [Crusoe Cloud](https://www.crusoe.ai/cloud): GPU cloud services and supported accelerators.

## Sources

- [Crusoe homepage](https://www.crusoe.ai/)
- [About Crusoe](https://www.crusoe.ai/about/company)
- [Crusoe: contracted AI infrastructure capacity approaches 5 gigawatts](https://www.crusoe.ai/resources/newsroom/crusoes-contracted-ai-infrastructure-capacity-approaches-5-gigawatts-across-data-centers-and-cloud)
- [Crusoe announces new manufacturing facility to produce modular AI factories](https://www.crusoe.ai/resources/newsroom/crusoe-announces-new-manufacturing-facility-to-produce-modular-ai-factories)
- [Crusoe to become first cloud operator in space through partnership with Starcloud](https://www.crusoe.ai/resources/newsroom/crusoe-to-become-first-cloud-operator-in-space-through-partnership-with-starcloud)
