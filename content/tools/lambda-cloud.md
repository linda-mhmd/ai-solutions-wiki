---
title: "Lambda (GPU Cloud)"
description: "Lambda is a developer-friendly GPU cloud for training and inference, offering on-demand instances, reserved clusters, and its own on-prem hardware."
date: 2026-06-29
tags: ["gpu", "cloud", "infrastructure", "training", "inference", "nvidia"]
tool_category: "Infrastructure"
related:
  - tools/coreweave
  - tools/amazon-bedrock
  - glossary/inference
  - glossary/fine-tuning
  - guides/from-zero-to-production
---

<figure class="bz-figure">
  <img src="/img/dark-cherry/grid-foundation.png" alt="A dark floor with a red neon grid, representing the foundational GPU infrastructure a cloud rents out." loading="lazy">
  <figcaption>A GPU cloud is the grid beneath your models: raw compute that someone else racks, cools, and wires so you do not have to.</figcaption>
</figure>

Lambda is a GPU cloud built for people who train and serve AI models. It rents NVIDIA GPUs by the hour, provisions large interconnected clusters for distributed training, and also sells its own on-prem GPU systems for teams that want hardware in their own building. The problem it solves is access: high-end NVIDIA GPUs are scarce and expensive, and Lambda packages them so a researcher or startup can start a training run in minutes instead of negotiating a hardware purchase.

The company positions itself around one job, running AI workloads, rather than the sprawling menu of a general-purpose hyperscaler. Instances arrive preloaded with Lambda Stack, the company's bundle of NVIDIA drivers, CUDA, and common deep learning frameworks, so you skip driver installs and get straight to [training and inference](/glossary/inference/).

<div class="bz-arch">
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Your workload</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Model training</span>
      <span class="bz-arch-chip">Fine-tuning</span>
      <span class="bz-arch-chip">Inference serving</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Software layer</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Lambda Stack</span>
      <span class="bz-arch-chip">CUDA</span>
      <span class="bz-arch-chip">PyTorch / TensorFlow</span>
      <span class="bz-arch-chip-note">Preinstalled drivers and frameworks on every instance</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Compute layer</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">On-demand instances</span>
      <span class="bz-arch-chip">1-Click Clusters</span>
      <span class="bz-arch-chip">Superclusters</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Hardware layer</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">NVIDIA HGX B200</span>
      <span class="bz-arch-chip">NVIDIA H100</span>
      <span class="bz-arch-chip">GB300 NVL72</span>
      <span class="bz-arch-chip">Quantum-2 InfiniBand</span>
    </div>
  </div>
</div>

## How to access it and typical use

Lambda groups its cloud offering into tiers that scale with the size of your workload. You pick the tier, and the layer beneath it stays the same NVIDIA hardware.

- **On-demand instances**: single GPU nodes you spin up in a browser or through the Lambda Cloud API. You choose 1x, 2x, 4x, or 8x GPU configurations. Best for prototyping, single-node fine-tuning, and testing before you commit to scale.
- **1-Click Clusters**: production clusters of interconnected HGX B200 and H100 GPUs, spanning from tens to over two thousand GPUs, wired with Quantum-2 InfiniBand for distributed training. You reserve these for a fixed term.
- **Superclusters**: single-tenant deployments on the largest NVIDIA systems, including GB300 NVL72, for organisations doing frontier-scale training with dedicated isolation.
- **Reserved capacity**: longer commitments at Lambda's lowest rates, arranged by contacting their team.
- **On-prem systems**: Lambda also sells GPU workstations and servers for teams that want hardware on their own premises rather than in the cloud.

A common path starts with an on-demand instance to get code working, then moves to a 1-Click Cluster once the training job needs many GPUs in parallel.

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 1</span>
    <span class="bz-flow-step-name">Launch instance</span>
    <span class="bz-flow-step-desc">Start an on-demand GPU node from the dashboard or the Cloud API.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 2</span>
    <span class="bz-flow-step-name">Run on Lambda Stack</span>
    <span class="bz-flow-step-desc">Drivers, CUDA, and frameworks are preinstalled, so training starts immediately.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 3</span>
    <span class="bz-flow-step-name">Scale to a cluster</span>
    <span class="bz-flow-step-desc">Move the job to a 1-Click Cluster for multi-node distributed training.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 4</span>
    <span class="bz-flow-step-name">Serve the model</span>
    <span class="bz-flow-step-desc">Deploy inference on dedicated GPU instances you manage yourself.</span>
  </div>
</div>

You automate all of this with the Lambda Cloud API, which lets you create, stop, and restart instances from a CLI, a CI/CD pipeline, or an orchestration script. Note that Lambda has announced its fully managed Inference API is winding down; the durable paths are self-managed GPU instances and clusters.

## How it compares

| | Lambda | CoreWeave | Hyperscaler GPU instances |
|---|---|---|---|
| **Primary focus** | AI training and inference | AI and rendering at scale | General-purpose cloud |
| **Hardware** | NVIDIA GPUs, own on-prem systems | NVIDIA GPUs | NVIDIA plus in-house chips |
| **Setup** | Preloaded Lambda Stack | Kubernetes-native | Full cloud services menu |
| **Scale ceiling** | Superclusters, GB300 NVL72 | Very large GPU fleets | Very large, region-wide |
| **Best for** | Researchers, startups, ML teams | Large-scale GPU-heavy workloads | Teams already on that cloud |

CoreWeave targets similar GPU-heavy workloads with a Kubernetes-native approach, covered in [our CoreWeave page](/tools/coreweave/). Hyperscalers such as AWS pair GPU instances with a full services catalogue and managed model platforms like [Amazon Bedrock](/tools/amazon-bedrock/), which suits teams already committed to that ecosystem.

## When not to use it

- **You want a managed model API, not raw GPUs.** If you would rather call a model over an endpoint than manage servers, a managed platform fits better. Lambda's own managed Inference API is winding down, so it is not the path for that need.
- **You need a full cloud platform.** Databases, queues, identity, and dozens of managed services live on hyperscalers. Lambda is compute-focused, not a one-stop platform.
- **You are already deep in one hyperscaler.** If your data, networking, and billing already sit in AWS, Azure, or GCP, adding a separate GPU cloud means moving data across providers and managing a second bill.
- **Your workload is small and bursty.** For occasional light inference, a per-token managed endpoint is usually cheaper than renting a GPU by the hour.

## Further reading

- [What is inference?](/glossary/inference/): the runtime step where a trained model produces outputs, the workload GPU clouds serve.
- [What is fine-tuning?](/glossary/fine-tuning/): adapting a base model on your own data, a common reason to rent training GPUs.
- [CoreWeave](/tools/coreweave/): a Kubernetes-native GPU cloud that competes directly with Lambda.
- [From zero to production](/guides/from-zero-to-production/): how compute choices fit into shipping a working system.
- [Lambda Cloud documentation](https://docs.lambda.ai/): official guides for instances, clusters, and the Cloud API.
- [Lambda pricing](https://lambda.ai/pricing): current per-hour and reserved rates from the vendor.

## Sources

- [Lambda homepage](https://lambda.ai/)
- [Lambda instances](https://lambda.ai/instances)
- [Lambda 1-Click Clusters](https://lambda.ai/1-click-clusters)
- [Lambda pricing](https://lambda.ai/pricing)
- [Lambda documentation](https://docs.lambda.ai/)
