---
title: "NVIDIA AI Platform (NIM, NeMo, DGX)"
description: "How NVIDIA combines GPUs, DGX systems, NVIDIA AI Enterprise, NIM inference microservices, and the NeMo framework into one full-stack AI platform."
date: 2026-06-29
last_updated: 2026-09-25
lastmod: 2026-09-25
last_verified: 2026-09-25
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
      <span class="bz-arch-chip">NeMo Switchyard</span>
      <span class="bz-arch-chip">Nemotron 3 / 3.5 open models</span>
      <span class="bz-arch-chip-note">data prep, fine-tuning, evaluation, guardrails, model routing</span>
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

**NeMo (build and customise).** NeMo is an open suite of libraries for building, customising, and governing models and AI agents. It covers data preparation, fine-tuning, evaluation, and guardrails across the agent lifecycle. NeMo produces the models that NIM then serves, so the two products connect directly. In August 2026 NVIDIA added **NeMo Switchyard**, an open-source model-router library that picks the cheapest model capable of a given task, which is directly relevant if you run a mix of small and large models behind one endpoint.

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

## Nemotron: NVIDIA's own open-weight models

NVIDIA is no longer only a hardware and tooling vendor. Nemotron is its family of open-weight models, and by 2026 it is one of the more significant Western open-weight lines. The models are hybrid Mamba-Transformer mixture-of-experts designs. Context windows are not uniform: NVIDIA's topic page advertises 1M tokens, and the Nano, Super and Lightning cards do document up to 1M, but Nemotron 3 Nano Omni is 300K, and Lightning's card notes that a single-H100 deployment is practically limited to 256K. Check the card for the model and the hardware you are actually deploying.

| Model | Released | Size | Notes |
|---|---|---|---|
| **Nemotron 3 Nano** | 15 December 2025 | 31.6B total / 3.2B active | The generation opener |
| **Nemotron 3 Super** | 11 March 2026 | 120B total / 12B active | Mid-tier reasoning; announced days ahead of GTC, not at it |
| **Nemotron 3 Nano Omni** | 28 April 2026 | 30B total / 3B active | Multimodal; 300K context, the shortest in the family |
| **Nemotron 3 Ultra** | 4 June 2026 | 550B total / 55B active | Pretrained largely in NVFP4 for Blackwell |
| **Nemotron 3.5 Lightning** | 11 August 2026 | 30B total / 3B active | Newest; NVIDIA claims performance near gpt-oss-120b at roughly a quarter of the total parameters |

There is **no new general-purpose Nemotron LLM** since 3.5 Lightning. September 2026 brought specialist releases instead:

- **Nemotron-3-Labs-Ultra-Math-RL and -SFT** (Hugging Face, 3 September 2026): math-reasoning fine-tunes of Nemotron 3 Ultra (**550B total / 55B active**, up to 1M context), trained to solve hard problems and find mistakes in proofs. NVIDIA says the RL model was deployed **as part of an ensemble system that achieved a gold-medal-level score at the International Mathematical Olympiad 2026**; the gold is the ensemble's, not the single checkpoint's. Both are under OpenMDW-1.1 and marked ready for commercial use. NVIDIA published the recipe with them: the technical report "An Open Recipe for IMO Gold" (arXiv 2609.10712), the RL training recipe, the inference pipeline and submitted proofs, and the Nemotron-Math-Proofs-v3-RL dataset. The "Labs" prefix signals a research release rather than a supported NIM.
- **Nemotron 3 Diarization** (`nvidia/Nemotron-3-Diarization`, OpenMDW-1.1, commercial use allowed): a Streaming Sortformer speaker-diarization model that answers "who spoke when" for **up to eight speakers**, in streaming (input buffer down to 80 ms; 0.32 s is the lowest recommended setting) or offline mode. It runs in NeMo Speech or the native NeMo-Speech.cpp runtime and can add word-level speaker tags to transcripts. The repository appeared on 1 September 2026; the model card gives 23 September 2026 as the release date.
- **NVFP4 quantizations of third-party open models**, which NVIDIA now publishes routinely for Blackwell: in September these included `nvidia/GLM-5.3-NVFP4` (14 September), `nvidia/Qwen3.8-27B-NVFP4` (4 September) and `nvidia/DeepSeek-V4.1-Flash-NVFP4` (16 September, six days after [DeepSeek](/tools/deepseek/) released the model). If you plan to serve a Chinese open-weight model on Blackwell GPUs, check NVIDIA's Hugging Face organisation for an NVFP4 build before quantizing it yourself.

What makes Nemotron unusual is the release scope. NVIDIA publishes under the Linux Foundation's OpenMDW-1.1 licence and ships not just weights but the pre- and post-training software, the recipes, and the training data it is able to redistribute - reported as roughly 3T pre-training tokens, 13M post-training samples, and a set of reinforcement-learning environments. That puts Nemotron in the small group of families that are open in the training-data sense, not only the downloadable-weights sense.

Sources vary slightly on the details. Watch the parameter counts in particular: Nemotron 3 Nano and Nemotron 3.5 Lightning are easy to confuse because both are roughly 30B with about 3B active, but they are different models - Nano is 31.6B total with 3.2B active (3.6B counting embeddings), while Lightning's card and repo name it 30B with 3B active. At least one outlet also dates the Nemotron 3 launch to 17 December 2025 against the model's own 15 December date. Artificial Analysis places Nemotron 3 Ultra at 47.7 on its Intelligence Index, ahead of other US open-weight models but behind the Chinese-led open frontier - useful calibration if you are choosing between Nemotron and an open model from Moonshot, Z.ai, or DeepSeek.

Specialised siblings cover retrieval, document parsing, speech, and safety (Nemotron Retriever, Parse, Speech, and Safety). Weights are free to download, hosted NIM endpoints are available on build.nvidia.com, and beyond the 3.5 Lightning refresh there is no Nemotron 4 - the Nemotron Coalition, announced at GTC on 16 March 2026, is positioned as groundwork for a future generation rather than a shipped one. See the [Nemotron 3 news item](/news/nvidia-nemotron-3/) for background on the launch.

## How to access it

You do not install NVIDIA AI as a single package. You choose an entry point that matches where you want the compute to live.

- **Own hardware.** Buy DGX systems or GPU servers, license NVIDIA AI Enterprise, and pull NIM containers to self-host models behind your firewall.
- **A GPU cloud.** Rent NVIDIA GPUs from a specialist provider such as [CoreWeave](/tools/coreweave/) or a hyperscaler, then run NIM and NeMo on that capacity.
- **Hosted endpoints.** Call NVIDIA-hosted NIM endpoints and API catalog models without managing infrastructure, useful for prototyping before you commit to hardware.
- **Just the weights.** Download Nemotron from Hugging Face under OpenMDW-1.1 and serve it on any GPU you already have. This is the lowest-commitment entry point and it does not require NVIDIA AI Enterprise.

NIM containers are built to run under Kubernetes, so they slot into an existing orchestration platform rather than forcing a new one. That keeps a NVIDIA deployment portable across data center and cloud.

## NVIDIA platform vs cloud-managed model APIs

The main strategic choice is whether you run models yourself on NVIDIA infrastructure or consume them through a managed cloud API. The trade-off is control and data locality versus operational simplicity.

| | NVIDIA AI Platform | Amazon Bedrock | Azure OpenAI | CoreWeave GPU cloud |
|---|---|---|---|---|
| **What you get** | GPUs plus model software | Managed model API | Managed model API | Rented raw GPUs |
| **You manage** | Deployment and models | Almost nothing | Almost nothing | Deployment and models |
| **Data locality** | Your data center or cloud | AWS region | Azure region | Provider region |
| **Model choice** | Open and custom models, plus NVIDIA's own Nemotron | Curated catalog | OpenAI family | Any you deploy |
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
- [NVIDIA Nemotron](https://developer.nvidia.com/topics/ai/nemotron): the current open-model family and its sizes.

## Sources

- [NVIDIA NIM](https://developer.nvidia.com/nim)
- [NVIDIA AI platform](https://www.nvidia.com/en-us/ai/)
- [NVIDIA AI and data science](https://www.nvidia.com/en-us/ai-data-science/)
- [NVIDIA NeMo](https://www.nvidia.com/en-us/ai-data-science/products/nemo/)
- [NVIDIA DGX platform](https://www.nvidia.com/en-us/data-center/dgx-platform/)
- [NVIDIA Nemotron topic page](https://developer.nvidia.com/topics/ai/nemotron): current family and 1M context window. Release dates and licence come from NVIDIA's blogs rather than this page.
- [Nemotron 3.5 Lightning and NeMo Switchyard](https://blogs.nvidia.com/blog/nemotron-lightning-switchyard-rtx-dgx/): 11 August 2026 announcement.
- [Nemotron 3 Ultra developer blog](https://developer.nvidia.com/blog/nvidia-nemotron-3-ultra-powers-faster-more-efficient-reasoning-for-long-running-agents/): 4 June 2026.
- [Nemotron 3 Nano on Hugging Face](https://huggingface.co/blog/nvidia/nemotron-3-nano-efficient-open-intelligent-models): December 2025 launch and open-data scope.
- [Nemotron 3 white paper](https://research.nvidia.com/labs/nemotron/files/NVIDIA-Nemotron-3-White-Paper.pdf): architecture and training detail.
- [Nemotron-3-Labs-Ultra-Math-RL model card](https://huggingface.co/nvidia/Nemotron-3-Labs-Ultra-Math-RL): released 3 September 2026, 550B / 55B active, OpenMDW-1.1, part of an IMO 2026 gold-medal-level ensemble.
- [An Open Recipe for IMO Gold: Training Nemotron for Olympiad Mathematics, arXiv 2609.10712](https://arxiv.org/abs/2609.10712): NVIDIA's technical report.
- [Nemotron 3 Diarization model card](https://huggingface.co/nvidia/Nemotron-3-Diarization): up to eight speakers, streaming and offline, OpenMDW-1.1; card release date 23 September 2026.
- [DeepSeek-V4.1-Flash-NVFP4](https://huggingface.co/nvidia/DeepSeek-V4.1-Flash-NVFP4), [GLM-5.3-NVFP4](https://huggingface.co/nvidia/GLM-5.3-NVFP4) and [Qwen3.8-27B-NVFP4](https://huggingface.co/nvidia/Qwen3.8-27B-NVFP4) on Hugging Face: September 2026 NVFP4 quantizations.
- [Artificial Analysis on Nemotron 3 Ultra](https://artificialanalysis.ai/articles/nvidia-nemotron-3-ultra-released): third-party Intelligence Index positioning.
