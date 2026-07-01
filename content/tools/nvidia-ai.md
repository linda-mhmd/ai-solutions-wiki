---
title: "NVIDIA AI Platform (NIM, NeMo, DGX)"
description: "How NVIDIA combines GPUs, DGX systems, NVIDIA AI Enterprise, NIM inference microservices, and the NeMo framework into one full-stack AI platform."
date: 2026-06-29
tags: ["nvidia", "gpu", "inference", "infrastructure", "enterprise-ai"]
tool_category: "Infrastructure"
related:
  - glossary/inference
  - glossary/foundation-models
  - tools/coreweave
  - tools/amazon-bedrock
  - tools/azure-openai
  - guides/multi-cloud-ai-strategy
---

<figure class="bz-figure">
  <img src="/img/enterprise-dark/gears-neural-wires-notext.png" alt="Interlocking gears laced with red neural wires, representing hardware and software combined into one AI platform." loading="lazy">
  <figcaption>NVIDIA sells a full stack: silicon at the bottom, model software at the top, and validated glue in between.</figcaption>
</figure>

NVIDIA supplies the dominant hardware for training and running AI models, plus a layered software stack that turns raw GPUs into a supported enterprise platform. The problem it solves is fragmentation. Teams that buy GPUs still face driver management, inference optimisation, model packaging, and lifecycle tooling. NVIDIA bundles these into named products so you can deploy models in your own data center or cloud with vendor support instead of assembling everything yourself.

This page covers the platform at a high level: GPUs and DGX systems as the hardware, NVIDIA AI Enterprise as the supported software suite, NIM as the [inference](/glossary/inference/) delivery layer, and NeMo as the framework for building and customising models. It also explains when a NVIDIA-based deployment makes sense versus a cloud-managed model API.

## Where it sits in the stack

<div class="bz-arch">
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Build and customise</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">NeMo</span>
      <span class="bz-arch-chip">Nemotron models</span>
      <span class="bz-arch-chip-note">data prep, fine-tuning, evaluation, guardrails</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Serve and deploy</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">NIM microservices</span>
      <span class="bz-arch-chip">TensorRT-LLM</span>
      <span class="bz-arch-chip">vLLM</span>
      <span class="bz-arch-chip-note">containerised models behind industry-standard APIs</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Supported software suite</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">NVIDIA AI Enterprise</span>
      <span class="bz-arch-chip-note">security, stability, enterprise support</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Hardware</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">NVIDIA GPUs</span>
      <span class="bz-arch-chip">DGX systems</span>
      <span class="bz-arch-chip">DGX SuperPOD</span>
      <span class="bz-arch-chip-note">workstation to on-premises cluster</span>
    </div>
  </div>
</div>

## How it fits together

The four layers are designed to work as one validated system. Each layer targets a different job.

**GPUs and DGX systems (hardware).** NVIDIA GPUs supply the acceleration for training and inference. DGX systems package those GPUs with software and support into a unified AI development solution. DGX SuperPOD extends this to on-premises cluster scale, adding NVIDIA Mission Control for operations. This is the compute foundation used by telcos, pharmaceutical companies, automotive manufacturers, and government institutions.

**NVIDIA AI Enterprise (supported software).** This is an enterprise AI software suite for data center deployments. It wraps the model tooling with security, stability, and vendor support so production workloads run on a maintained platform rather than loosely versioned open-source parts.

**NIM (inference microservices).** NIM delivers GPU-accelerated inference microservices for pretrained and customised models across clouds, data centers, and RTX AI PCs. Each NIM is a container that exposes an industry-standard API and is pre-optimised for a given model and GPU combination. Under the hood it uses inference engines including TensorRT-LLM, vLLM, and SGLang. You either download the container to self-host or call NVIDIA-hosted endpoints. This is the layer that closes the gap between a trained model and a production endpoint.

**NeMo (build and customise).** NeMo is an open suite of libraries for building, customising, and governing models and AI agents. It covers data preparation, fine-tuning, evaluation, and guardrails across the agent lifecycle. NeMo produces the models that NIM then serves, so the two products connect directly.

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 1</span>
    <span class="bz-flow-step-name">Build with NeMo</span>
    <span class="bz-flow-step-desc">Prepare data, select or fine-tune a foundation model, and evaluate it.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 2</span>
    <span class="bz-flow-step-name">Package as NIM</span>
    <span class="bz-flow-step-desc">Wrap the model in a NIM container with an industry-standard API.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 3</span>
    <span class="bz-flow-step-name">Run on NVIDIA hardware</span>
    <span class="bz-flow-step-desc">Deploy the NIM on GPUs or DGX systems under NVIDIA AI Enterprise support.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 4</span>
    <span class="bz-flow-step-name">Integrate and optimise</span>
    <span class="bz-flow-step-desc">Call the API from your application, then monitor and tune over time.</span>
  </div>
</div>

## How to access it

You do not install NVIDIA AI as a single package. You choose an entry point that matches where you want the compute to live.

- **Own hardware.** Buy DGX systems or GPU servers, license NVIDIA AI Enterprise, and pull NIM containers to self-host models behind your firewall.
- **A GPU cloud.** Rent NVIDIA GPUs from a specialist provider such as [CoreWeave](/tools/coreweave/) or a hyperscaler, then run NIM and NeMo on that capacity.
- **Hosted endpoints.** Call NVIDIA-hosted NIM endpoints and API catalog models without managing infrastructure, useful for prototyping before you commit to hardware.

NIM containers are built to run under Kubernetes, so they slot into an existing orchestration platform rather than forcing a new one. That keeps a NVIDIA deployment portable across data center and cloud.

## NVIDIA platform vs cloud-managed model APIs

The main strategic choice is whether you run models yourself on NVIDIA infrastructure or consume them through a managed cloud API. The trade-off is control and data locality versus operational simplicity.

| | NVIDIA AI Platform | Amazon Bedrock | Azure OpenAI | CoreWeave GPU cloud |
|---|---|---|---|---|
| **What you get** | GPUs plus model software | Managed model API | Managed model API | Rented raw GPUs |
| **You manage** | Deployment and models | Almost nothing | Almost nothing | Deployment and models |
| **Data locality** | Your data center or cloud | AWS region | Azure region | Provider region |
| **Model choice** | Open and custom models | Curated catalog | OpenAI family | Any you deploy |
| **Best for** | On-prem, regulated, custom | Fast AWS integration | Microsoft-centric teams | Cheap GPU capacity |

For deeper comparison across providers, see the [multi-cloud AI strategy guide](/guides/multi-cloud-ai-strategy/), [Amazon Bedrock](/tools/amazon-bedrock/), and [Azure OpenAI](/tools/azure-openai/).

## When not to use it

- **You want zero infrastructure work.** If your team has no platform engineers, a managed API such as Bedrock or Azure OpenAI removes the deployment burden that NIM and NeMo assume you can handle.
- **Your workload is small or spiky.** For low, irregular traffic, per-token API pricing usually beats reserving GPU capacity that sits idle.
- **You only need a single hosted frontier model.** If a provider API already gives you the model you want, self-hosting adds cost and operational risk for no gain.
- **You cannot secure GPU supply.** Committing to a NVIDIA-based platform without a clear path to hardware, whether owned or rented, leaves you unable to scale.

Choose the NVIDIA platform when data must stay in your environment, when you customise or run open [foundation models](/glossary/foundation-models/), or when steady high-volume inference makes owned or reserved GPUs cheaper than a metered API.

## Further reading

- [What is inference?](/glossary/inference/): the runtime step NIM is built to optimise.
- [What are foundation models?](/glossary/foundation-models/): the models NeMo builds and NIM serves.
- [CoreWeave](/tools/coreweave/): a specialist cloud for renting NVIDIA GPUs.
- [Multi-cloud AI strategy](/guides/multi-cloud-ai-strategy/): where self-hosted and managed options fit together.
- [NVIDIA NIM developer page](https://developer.nvidia.com/nim): official overview of the inference microservices.
- [NVIDIA AI Enterprise and platform overview](https://www.nvidia.com/en-us/ai/): the supported software suite and how the pieces connect.

## Sources

- [NVIDIA NIM](https://developer.nvidia.com/nim)
- [NVIDIA AI platform](https://www.nvidia.com/en-us/ai/)
- [NVIDIA AI and data science](https://www.nvidia.com/en-us/ai-data-science/)
- [NVIDIA NeMo](https://www.nvidia.com/en-us/ai-data-science/products/nemo/)
- [NVIDIA DGX platform](https://www.nvidia.com/en-us/data-center/dgx-platform/)
