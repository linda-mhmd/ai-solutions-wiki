---
title: "Vast.ai"
description: "Vast.ai is a marketplace that rents GPU compute from many providers, trading lower prices for variable reliability."
date: 2026-06-29
tags: ["gpu", "infrastructure", "marketplace", "compute", "inference"]
tool_category: "Infrastructure"
related:
  - glossary/inference
  - tools/runpod
  - tools/coreweave
  - tools/lambda-cloud
  - comparisons/gpu-clouds-and-neoclouds
---

<figure class="bz-figure">
  <img src="/img/enterprise-dark/pcb-aerial-red-notext.png" alt="An aerial dark circuit board with a red trace network, representing a marketplace of GPU capacity." loading="lazy">
  <figcaption>Vast.ai routes your workload to whichever host in its network offers the capacity you need at the price you accept.</figcaption>
</figure>

Vast.ai is a marketplace for renting GPU compute. It connects people who need GPUs with providers who have spare capacity, and it lets supply and demand set the price. That capacity ranges from professional data centre operators to smaller hosts, so a single search can return the same GPU model at very different prices and reliability levels. The problem it solves is cost: training and [inference](/glossary/inference/) on rented GPUs is expensive, and a marketplace exposes cheaper capacity that a single managed cloud would not surface.

According to Vast.ai, hosts set their own prices and the market determines rates in real time across a network the company describes as 20,000+ GPUs, 68+ GPU types, and 40+ data centres. You pay per second while an instance runs, and you can start with a small balance. The trade-off is that a marketplace shifts some risk to you: cheaper hosts can be less reliable, and the cheapest instances can be reclaimed while you work.

## Where it sits

Vast.ai is an aggregation layer. It does not own most of the hardware. It brokers access to GPUs owned by many separate hosts and gives you one interface to search, rent, and run across all of them.

<div class="bz-arch">
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Your workload</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Training</span>
      <span class="bz-arch-chip">Batch inference</span>
      <span class="bz-arch-chip">Rendering</span>
      <span class="bz-arch-chip-note">Container image you supply</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Vast.ai marketplace</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Search and filters</span>
      <span class="bz-arch-chip">Reliability score</span>
      <span class="bz-arch-chip">Per-second billing</span>
      <span class="bz-arch-chip-note">Matches your request to a host</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Host network</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Data centre operators</span>
      <span class="bz-arch-chip">Independent hosts</span>
      <span class="bz-arch-chip-note">Each sets its own price</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Physical GPUs</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">68+ GPU types</span>
      <span class="bz-arch-chip">40+ data centres</span>
    </div>
  </div>
</div>

## The marketplace model and its trade-offs

Vast.ai offers three ways to rent, each with a different balance of price and certainty.

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Type 1</span>
    <span class="bz-flow-step-name">On-demand</span>
    <span class="bz-flow-step-desc">Fixed price and guaranteed resources while you run. Highest certainty, highest price for a given host.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Type 2</span>
    <span class="bz-flow-step-name">Reserved</span>
    <span class="bz-flow-step-desc">Discounted rate in exchange for a commitment. Vast.ai cites up to 50% off with pre-payment.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Type 3</span>
    <span class="bz-flow-step-name">Interruptible</span>
    <span class="bz-flow-step-desc">Lowest cost, but the host can reclaim the GPU. Vast.ai describes these as often 50%+ cheaper.</span>
  </div>
</div>

Two ideas drive the trade-off. First, host reliability varies. Vast.ai publishes a reliability score per host and lets you filter and sort by it. Its own pricing documentation notes that higher reliability scores typically correlate with higher prices, and lower scores may offer better rates. Second, billing has three parts: GPU compute charged only while the instance runs, storage charged continuously as long as the instance exists even when stopped, and bandwidth charged for data transfer. A cheap hourly GPU rate can still cost more than expected once storage and bandwidth are counted, so read all three when you compare hosts.

The practical result: you decide how much reliability to pay for. A long-running production endpoint wants a high-reliability host on on-demand or reserved pricing. A checkpointed batch job that can restart wants an interruptible instance from a cheaper host.

## How to access it

Vast.ai is API-native. You provision capacity through three interfaces, so you never touch a physical machine directly.

- Web console at cloud.vast.ai for searching, launching, and managing instances in a browser.
- Command line and Python SDK, installed with `pip install vastai`.
- REST API for programmatic provisioning from your own systems.

A typical run looks like this: search the marketplace with filters for GPU model, price ceiling, and minimum reliability score; launch an instance from a container image you supply; run your workload; then stop or destroy the instance so compute billing ends. Remember that storage keeps billing while a stopped instance still exists, so destroy instances you no longer need.

## Vast.ai vs managed GPU clouds

Managed GPU clouds own or tightly control their hardware and sell a consistent product. Vast.ai brokers a diverse supply and lets price float. The right choice depends on whether you optimise for lowest cost or predictable operations.

| | Vast.ai | RunPod | CoreWeave | Lambda |
|---|---|---|---|---|
| **Model** | Open marketplace | Marketplace plus managed pods | Managed GPU cloud | Managed GPU cloud |
| **Price driver** | Supply and demand | Tiered pricing | Contract and reserved | Reserved and on-demand |
| **Reliability** | Varies by host score | More consistent | Data centre grade | Data centre grade |
| **Best for** | Lowest-cost, restartable jobs | Fast dev and inference | Large-scale training | Training and research teams |

Managed clouds cost more per GPU-hour on comparable hardware, and they buy you predictability: known reliability, support, and stable networking. Vast.ai wins on headline price and on breadth of available GPU types, and it asks you to manage variability yourself. See [RunPod](/tools/runpod/) for a platform that sits between the two, and the broader [GPU clouds and neoclouds comparison](/comparisons/gpu-clouds-and-neoclouds/) for how these categories differ.

## When not to use it

- You run a latency-sensitive production service that cannot tolerate a host being reclaimed or a variable reliability score. Choose a managed cloud such as [CoreWeave](/tools/coreweave/) or [Lambda](/tools/lambda-cloud/).
- You need a formal SLA, enterprise support, and compliance guarantees tied to a single provider. A marketplace of independent hosts is a poor fit.
- Your workload cannot checkpoint and restart. Interruptible pricing is the main saving, and it is unusable without safe restarts.
- You need multi-node clusters with guaranteed low-latency interconnect for large distributed training. Verify that available hosts meet this before committing, and compare against purpose-built training clouds.
- Data residency or governance rules require known, audited facilities. A marketplace host may not meet them.

## Further reading

- [What is inference?](/glossary/inference/): why serving models is the recurring GPU cost this marketplace targets.
- [RunPod](/tools/runpod/): a GPU platform blending marketplace supply with managed pods.
- [CoreWeave](/tools/coreweave/): a managed GPU cloud built for large-scale training and inference.
- [Lambda](/tools/lambda-cloud/): a GPU cloud focused on training and research teams.
- [GPU clouds and neoclouds compared](/comparisons/gpu-clouds-and-neoclouds/): how marketplaces, neoclouds, and hyperscalers differ.
- [Vast.ai documentation](https://docs.vast.ai/): official guides for the CLI, API, and pricing.

## Sources

- [Vast.ai](https://vast.ai/): marketplace overview, network scale figures, and access methods.
- [Vast.ai pricing documentation](https://docs.vast.ai/documentation/instances/pricing): instance types, per-second billing, storage and bandwidth components, and reliability score pricing.
