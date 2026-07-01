---
title: "RunPod"
description: "RunPod is a GPU cloud offering on-demand pods, a lower-cost community marketplace, and serverless inference endpoints for developers and startups."
date: 2026-06-29
tags: ["gpu-cloud", "neocloud", "inference", "serverless", "infrastructure"]
tool_category: "Infrastructure"
related:
  - glossary/inference
  - tools/coreweave
  - tools/lambda-cloud
  - tools/together-ai
  - tools/groq
  - glossary/llm
---

<figure class="bz-figure">
  <img src="/img/enterprise-dark/server-cpu-split-notext.png" alt="A split image of a server room and a red-lit processor, representing on-demand GPU rental." loading="lazy">
  <figcaption>RunPod rents the two halves of this picture by the second: physical GPU servers and the compute inside them.</figcaption>
</figure>

RunPod is a GPU cloud. It rents NVIDIA GPUs by the second so you can train, fine-tune, and run [inference](/glossary/inference/) on models without buying hardware or committing to a hyperscaler contract. It targets developers and startups who need a specific GPU for a few hours or a scale-to-zero endpoint for production, and who do not want the price and complexity of AWS, Azure, or Google Cloud. RunPod solves one problem well: getting a working GPU environment running fast, then paying only for the time you use it.

The platform splits into three products. Pods are dedicated GPU instances you control directly, for development and long-running jobs. Serverless provides auto-scaling inference endpoints that scale from zero and bill per millisecond of work. Clusters connect multiple nodes for distributed training. Within Pods, you choose between two supply tiers: Community Cloud, a marketplace of peer-supplied hardware at lower prices, and Secure Cloud, data-centre-grade machines with SOC 2 Type II compliance and more consistent availability.

## Where it sits in the stack

<div class="bz-arch">
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Your application</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Chat app</span>
      <span class="bz-arch-chip">Batch pipeline</span>
      <span class="bz-arch-chip">Training script</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">RunPod product</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Serverless endpoints</span>
      <span class="bz-arch-chip">Pods</span>
      <span class="bz-arch-chip">Clusters</span>
      <span class="bz-arch-chip-note">Serverless scales from zero, Pods stay running, Clusters span nodes</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Supply tier</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Community Cloud</span>
      <span class="bz-arch-chip">Secure Cloud</span>
      <span class="bz-arch-chip-note">Marketplace hardware versus data-centre-grade with SOC 2 Type II</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Hardware</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">H100</span>
      <span class="bz-arch-chip">H200</span>
      <span class="bz-arch-chip">A100</span>
      <span class="bz-arch-chip">RTX 4090</span>
      <span class="bz-arch-chip">L40S</span>
    </div>
  </div>
</div>

## How to access it and how it fits

RunPod is a hosted platform. You do not install a server. You sign up, add credit, and launch resources from the web console, the REST API, or the RunPod CLI. A typical path moves from an interactive Pod during development to a Serverless endpoint in production.

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 1</span>
    <span class="bz-flow-step-name">Pick a GPU</span>
    <span class="bz-flow-step-desc">Choose a GPU type and a Community or Secure Cloud tier in the console.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 2</span>
    <span class="bz-flow-step-name">Launch a Pod</span>
    <span class="bz-flow-step-desc">RunPod boots a container from your image. Develop and test on the live GPU.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 3</span>
    <span class="bz-flow-step-name">Package a worker</span>
    <span class="bz-flow-step-desc">Wrap your model in a handler and build a container image for Serverless.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 4</span>
    <span class="bz-flow-step-name">Deploy an endpoint</span>
    <span class="bz-flow-step-desc">Serverless scales workers up on request and back to zero when idle.</span>
  </div>
</div>

The Serverless model matters most for production inference. RunPod states endpoints scale from zero to hundreds of concurrent workers, use FlashBoot for sub-200ms cold starts, and charge zero idle cost when no requests arrive. Billing runs from when a worker starts until it fully stops. This differs from a Pod, which bills for every second it stays alive whether or not it is doing work.

## RunPod versus the alternatives

|  | RunPod | Hyperscaler GPU (AWS, Azure, GCP) | Modal | Vast.ai |
|---|---|---|---|---|
| **Model** | GPU cloud (neocloud) | General cloud, GPU as one service | Serverless compute platform | GPU rental marketplace |
| **Billing** | Per-second, per-millisecond serverless | Per-second to per-hour, complex | Per-second serverless | Per-second, host-set prices |
| **Cheapest tier** | Community Cloud marketplace | On-demand or spot | Managed serverless only | Peer-supplied hosts |
| **Scale to zero** | Yes, Serverless | Extra services needed | Yes, native | No, rented instances |
| **Best for** | Fast GPU access, startup inference | Enterprises already on that cloud | Python-first serverless jobs | Lowest-cost raw GPU hours |

For a wider view of how these providers relate, see the [GPU clouds and neoclouds comparison](/comparisons/gpu-clouds-and-neoclouds/). For a Python-first serverless alternative, see [Modal](/tools/modal/). For a marketplace focused purely on the lowest raw price, see [Vast.ai](/tools/vast-ai/).

## When not to use it

Do not reach for RunPod in these cases:

- **You are standardised on one hyperscaler.** If your data, identity, and networking already live in AWS, Azure, or Google Cloud, running GPUs inside that same cloud avoids egress friction and keeps one billing and security boundary, even at a higher price.
- **You need strict, audited data residency guarantees.** Community Cloud runs on peer-supplied hardware with reliability that varies by host. Regulated workloads should use Secure Cloud or a provider with contractual residency terms.
- **You want a managed model API, not a machine.** If you only need to call a hosted model, a managed inference provider removes all the container and scaling work RunPod still expects you to do.
- **Your workload runs constantly at large scale.** For steady, high-volume training, a reserved capacity contract with a provider like CoreWeave can undercut on-demand pricing.

## Further reading

- [What is inference?](/glossary/inference/): why serving a model differs from training it, and why it drives GPU cost
- [GPU clouds and neoclouds compared](/comparisons/gpu-clouds-and-neoclouds/): how RunPod sits against the wider market
- [Modal](/tools/modal/): a Python-first serverless GPU platform for jobs and endpoints
- [Vast.ai](/tools/vast-ai/): a GPU rental marketplace focused on the lowest hourly price
- [CoreWeave](/tools/coreweave/): a neocloud built for large-scale, reserved GPU capacity
- [Lambda Cloud](/tools/lambda-cloud/): a GPU cloud aimed at training and research teams
- [Together AI](/tools/together-ai/): managed inference and fine-tuning across open models
- [RunPod documentation](https://docs.runpod.io/): official guides for Pods, Serverless, and the API

## Sources

- [RunPod home page](https://www.runpod.io/): product overview for Pods, Serverless, and Clusters
- [RunPod pricing](https://www.runpod.io/pricing): GPU types, Community and Secure Cloud tiers, per-second billing
- [RunPod Serverless pricing docs](https://docs.runpod.io/serverless/pricing): per-second billing detail and worker lifecycle
- [RunPod documentation](https://docs.runpod.io/): reference for Pods, Serverless, Clusters, and the API
