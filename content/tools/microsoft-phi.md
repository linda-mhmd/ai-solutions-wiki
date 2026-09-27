---
title: "Microsoft Phi"
description: "Microsoft Phi is a family of small, open-weight language models built to stay capable at sizes that run on-device and cut inference cost."
date: 2026-06-29
last_updated: 2026-09-25
lastmod: 2026-09-25
last_verified: 2026-09-25
tags: ["ai", "small language models", "open weights", "microsoft", "on-device"]
tool_category: "AI"
related:
  - glossary/foundation-models
  - glossary/llm
  - glossary/inference
  - glossary/mixture-of-experts
  - tools/azure-openai
  - tools/mistral-ai
  - tools/deepseek
---

<figure class="bz-figure">
  <img src="/img/juggling/three-balls-rgb-convergence-notext.png" alt="Three small glowing spheres converging, representing a family of small, efficient language models." loading="lazy">
  <figcaption>Phi is a family of small models tuned so that quality does not have to scale with size.</figcaption>
</figure>

Microsoft Phi is a family of small language models (SLMs) released as open weights under the MIT license. The models solve a specific problem: most capable [large language models](/glossary/llm/) are big, slow, and expensive to run, which puts them out of reach for phones, laptops, and cost-sensitive workloads. Phi trades raw scale for carefully curated training data, aiming to keep quality high while the parameter count stays small enough to run on modest hardware.

A small language model is a [foundation model](/glossary/foundation-models/) with far fewer parameters than a frontier system. Parameters are the learned weights a model uses to generate output. Fewer parameters mean smaller memory footprint, faster [inference](/glossary/inference/), and lower cost per request. Microsoft's bet with Phi is that data quality, not sheer size, drives much of a model's usefulness. Phi models are trained on heavily filtered and synthetic "textbook-quality" data rather than the whole web.

## Where Phi sits

Phi occupies the small end of the model-size spectrum. You reach for it when a frontier model is more than the task needs, or when the deployment target cannot host one.

<div class="bz-arch">
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Frontier models</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">GPT class</span>
      <span class="bz-arch-chip">Claude</span>
      <span class="bz-arch-chip-note">Highest capability, hosted, higher cost and latency</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Mid-size open models</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Llama</span>
      <span class="bz-arch-chip">Mistral</span>
      <span class="bz-arch-chip-note">Strong general models, still need server-class GPUs</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Small language models</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Phi-4</span>
      <span class="bz-arch-chip">Phi-4-mini</span>
      <span class="bz-arch-chip">Phi-4-multimodal</span>
      <span class="bz-arch-chip">Phi-4-reasoning-vision</span>
      <span class="bz-arch-chip-note">Runs on-device or on cheap GPUs, low latency, open weights</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Deployment target</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Laptop</span>
      <span class="bz-arch-chip">Phone</span>
      <span class="bz-arch-chip">Edge device</span>
      <span class="bz-arch-chip">Small cloud instance</span>
    </div>
  </div>
</div>

## The Phi family

Microsoft has shipped several generations. The current Phi-4 line covers a text model, a compact model, a multimodal model, reasoning-tuned variants, and, since March 2026, a vision-language reasoning model. There is no Phi-5: third-party sites describing one are not backed by any Microsoft announcement or model card. **No new Phi model has shipped since May 2026.** A check of Microsoft's Hugging Face organisation on 25 September 2026 shows Phi-Ground-Any as the most recent Phi-branded upload. It is a GUI-grounding model, not a new general-purpose Phi. Microsoft's new model releases over the summer have all been MAI models (see below).

- **Phi-4-reasoning-vision-15B** is the newest general-purpose member, published on 4 March 2026. It is a 15 billion parameter vision-language reasoning model built on the Phi-4-Reasoning backbone with a SigLIP-2 vision encoder in a mid-fusion design. Its distinguishing feature is *selective* reasoning: the model decides when to emit a chain of thought and when to answer directly, which keeps token cost down on easy inputs. Microsoft published the weights, fine-tuning code, and benchmark logs under the MIT licence on Hugging Face, GitHub, and Microsoft Foundry. If you are picking a Phi variant today for anything involving images plus reasoning, start here - but check the context length first: the research blog omits it, and the model card puts it at 16,384 tokens, the same short window as base Phi-4 rather than the 128k of Phi-4-multimodal.
- **Phi-4** is a 14 billion parameter text model, first presented in December 2024. It is built on a decoder-only Transformer, was pretrained on roughly 10 trillion tokens of curated and synthetic data, and supports a 16k-token context length. Microsoft targeted mathematics and multi-step reasoning with this release.
- **Phi-4-mini** is a 3.8 billion parameter model aimed at even lighter deployment.
- **Phi-4-multimodal** is a 5.6 billion parameter model that handles speech, vision, and text in one model using a mixture-of-LoRAs design, with a 128k-token context length. Microsoft reports it ranked first on the Hugging Face OpenASR leaderboard with a 6.14% word error rate at the time of release.
- **Phi-4-reasoning** (14B) and **Phi-4-reasoning-plus** (14B) are reasoning-tuned variants. Phi-4-reasoning-plus is further trained with reinforcement learning to spend more inference-time compute. Phi-4-reasoning-plus supports a 32k-token context by default.
- **Phi-4-mini-reasoning** (3.8B) targets multi-step mathematical problem solving at small size.

- **Phi-Ground-Any-4B** (Hugging Face `microsoft/Phi-Ground-Any`, published May 2026, MIT) is a specialist. It is fine-tuned from Phi-3.5-vision-instruct for GUI grounding in computer-use agents, locating on-screen elements from an instruction, and it requires a fixed 1680×1008 input resolution. Pick it only if you are building a computer-use agent, not as a general Phi model.

Earlier generations remain available too. The Phi-3.5 line, released in August 2024, includes Phi-3.5-mini (3.82B), Phi-3.5-vision (4.15B), and Phi-3.5-MoE, a [mixture-of-experts](/glossary/mixture-of-experts/) model with 41.9 billion total parameters that activates about 6.6 billion per token. All three support a 128k-token context.

## Phi is no longer the whole Microsoft model story

Phi is Microsoft's small-model research line. Since Build 2026 it is not Microsoft's only first-party model family, and the MAI line is where Microsoft's new releases are now happening.

**The June launch.** On 2 June 2026 Microsoft AI announced seven **MAI** models. The body text of that announcement names the versions shipped then: MAI-Thinking-1 (reasoning), MAI-Code-1-Flash (agentic coding, 5B active parameters, built for GitHub Copilot and VS Code), MAI-Image-2.5 with a Flash variant, MAI-Transcribe-1.5 (43 languages), MAI-Voice-2 (15 languages), and MAI-Voice-2-Flash ("coming soon"). The page has since been edited, last modified 29 July, and some headings now carry later version numbers such as MAI-Image-2.6 and MAI-Transcribe-2. That explains the version inconsistency earlier versions of this page flagged. Those later versions are separate releases, listed below.

**What shipped between August and September 2026**, per Microsoft AI's own announcements:

| Model | Date | What it is | Availability |
|---|---|---|---|
| **MAI-Image-2.6** | 10 August 2026 | Text-to-image and editing; Microsoft reports No. 2 on the Arena text-to-image leaderboard, +79 Elo over MAI-Image-2.5 | Public preview in Microsoft Foundry from 4 September |
| **MAI-Code-1.1-Flash** | 11 August 2026 | Successor to MAI-Code-1-Flash; Microsoft claims 25% fewer tokens per task, 22% better on Terminal-Bench 2.1 in Copilot CLI, at a quarter of 1.0's price | In production in GitHub Copilot; GitHub deprecated MAI-Code-1-Flash on 10 September 2026 |
| **MAI-Thinking-1** | 12 August 2026 | Mid-size reasoning model: a sparse mixture-of-experts with 35B active and roughly 1T total parameters; Microsoft reports 97.0% on AIME 2025, parity with Claude Opus 4.6 on SWE-Bench Pro, and a preference over Claude Sonnet 4.6 in blind human side-by-sides (1,276 tasks, rated by Surge) | Public preview in Microsoft Foundry; no price published |
| **MAI-Cyber-1-Flash** | 13 August 2026 | Vulnerability-finding model embedded in MDASH, Microsoft's multi-agent vulnerability identification and remediation harness; designed to handle about 90% of tasks and hand the hardest 10% to a larger model (GPT-5.4); Microsoft claims 96% on CyberGym at half the cost of its previous MDASH configuration | Inside MDASH, not announced as a standalone API model |
| **MAI-Transcribe-2** | 3 September 2026 | Speech-to-text with diarization, configurable verbatim/clean styles, word-level timestamps and code-switching; Microsoft reports first place on FLEURS across 60 languages at 5.2% average WER | Microsoft Foundry, MAI Playground and OpenRouter; **$0.10 per audio hour** as a limited-time offer to the end of 2026 |
| **MAI-Image-2.6-Flash** | 4 September 2026 | Faster sibling of MAI-Image-2.6 for high-throughput work; Microsoft claims 2.8x faster than GPT-Image-2-Medium; both 2.6 models support multi-image reference editing, web grounding and dynamic aspect ratios | Public preview in Microsoft Foundry |

All benchmark figures in the table are Microsoft's own and have not been independently reproduced here. On 14 September 2026 Microsoft AI also published a **draft Code of Conduct for MAI models** for a six-week public consultation. It sets out how the models are meant to behave, what they must never do and who they answer to. It is worth reading if you are assessing MAI for regulated use.

Two things make MAI strategically different from Phi. First, Microsoft states the models were trained from scratch on commercially licensed, "clean, traceable" data with no distillation from third-party models, a deliberate step away from depending on OpenAI for frontier capability. Second, they are hosted services distributed through Microsoft Foundry and third-party hosts such as OpenRouter, Fireworks and Baseten, not open-weight downloads. The June announcement said developers could tune the weights themselves, but no open-weight licence has been published. If you need something you can download and run inside your own perimeter, Phi is still Microsoft's only option. Most MAI models are in public preview, so confirm availability, pricing and SLA terms with Microsoft before you design around one.

## How to access it

Phi models are open weights. You do not need a Microsoft account to download and run them.

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 1</span>
    <span class="bz-flow-step-name">Pick a variant</span>
    <span class="bz-flow-step-desc">Match model size to hardware and task. Use mini for edge, Phi-4 for general text, multimodal for speech and vision, Phi-4-reasoning-vision for image-plus-reasoning work.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 2</span>
    <span class="bz-flow-step-name">Get the weights</span>
    <span class="bz-flow-step-desc">Download from Hugging Face under the MIT license, or select the model in Microsoft Foundry (formerly Azure AI Foundry).</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 3</span>
    <span class="bz-flow-step-name">Run or host</span>
    <span class="bz-flow-step-desc">Run locally with common inference runtimes, or serve it as a managed endpoint through Azure.</span>
  </div>
</div>

The MIT license allows free use, modification, and distribution, including for commercial products. Phi-4 and the reasoning variants are published on Hugging Face and in the Microsoft Foundry catalog - Microsoft's 2026 announcements use "Microsoft Foundry" for what was previously branded Azure AI Foundry. If you already run other Microsoft-hosted models through [Azure OpenAI Service](/tools/azure-openai/), Foundry gives you Phi, the MAI models, and hosted OpenAI models in one catalog without changing clouds.

## How it compares

Phi competes with other small and open model families. The comparison below is about positioning, not a benchmark ranking.

| | Phi-4 line | Mistral small models | DeepSeek distills |
|---|---|---|---|
| **Maker** | Microsoft | Mistral AI | DeepSeek |
| **Size focus** | 3.8B to 15B | 3B to 119B (MoE) | Distilled small variants |
| **License** | MIT and permissive (open weights) | Apache 2.0 on Ministral 3 and Small 4 | Open weights on many models |
| **Strength** | Reasoning at small size | General European multilingual | Distilled reasoning |
| **Best for** | On-device, cost-sensitive apps | Broad general use | Reasoning on a budget |

For the mid-size and multilingual end, see [Mistral AI](/tools/mistral-ai/). For distilled reasoning models released as open weights, see [DeepSeek](/tools/deepseek/).

## When not to use it

Small models trade capability for size. Phi is the wrong choice when:

- **You need frontier-level breadth.** For the hardest open-ended reasoning, broad world knowledge, or long complex documents, a large model still leads. Phi-4's base text context is 16k tokens, smaller than many hosted frontier models.
- **You need the widest tool and ecosystem support.** Frontier hosted APIs ship mature tool-calling, function-calling, and safety tooling. Verify Phi's support for your exact features before committing.
- **Accuracy on rare edge cases is safety-critical.** A smaller parameter count means less capacity to memorise long-tail facts. Add retrieval or human review for high-stakes output.
- **You have no capacity to self-host and want a fully managed frontier experience.** In that case a hosted API may be less operational work, even at higher cost per call. Within Microsoft's own catalog that now means the MAI models or hosted OpenAI models in Foundry rather than a Phi download.

Match the model to the job. Phi shines when latency, cost, or on-device privacy matter more than absolute peak capability.

## Further reading

- [What is a large language model?](/glossary/llm/): how model size and parameters shape capability and cost.
- [Foundation models](/glossary/foundation-models/): the broad category Phi belongs to.
- [Inference](/glossary/inference/): why running a model is where the cost and latency of small models pays off.
- [Mixture of experts](/glossary/mixture-of-experts/): the architecture behind Phi-3.5-MoE.
- [Azure OpenAI Service](/tools/azure-openai/): Microsoft's hosted model platform, where Phi is also available.
- [Phi open models on Azure](https://azure.microsoft.com/en-us/products/phi): Microsoft's official product page for the family. Note that it lags the research blog: as of September 2026 it still lists Phi-4-multimodal as the newest model.

## Sources

- [Phi-4-reasoning-vision and the lessons of training a multimodal reasoning model, Microsoft Research](https://www.microsoft.com/en-us/research/blog/phi-4-reasoning-vision-and-the-lessons-of-training-a-multimodal-reasoning-model/): the 4 March 2026 announcement, selective reasoning, and architecture.
- [microsoft/Phi-4-reasoning-vision-15B, Hugging Face](https://huggingface.co/microsoft/Phi-4-reasoning-vision-15B): model card and licence.
- [Building a hillclimbing machine: launching seven new MAI models, Microsoft AI](https://microsoft.ai/news/building-a-hillclimbing-machine-launching-seven-new-mai-models/): the 2 June 2026 MAI launch, availability, and distribution partners (page last modified 29 July 2026).
- [Introducing MAI-Thinking-1, Microsoft AI](https://microsoft.ai/news/introducing-mai-thinking-1/): 12 August 2026 public preview in Foundry, architecture and benchmark claims.
- [Introducing MAI-Cyber-1-Flash inside MDASH, Microsoft AI](https://microsoft.ai/news/introducing-mai-cyber-1-flash-inside-mdash/): 13 August 2026.
- [MAI-Code-1.1-Flash: Better, faster, at a quarter of the cost, Microsoft AI](https://microsoft.ai/news/mai-code-1-1-flash-br-better-faster-at-a-quarter-of-the-cost/): 11 August 2026.
- [MAI-Image-2.6 launches at No. 2 on Arena, Microsoft AI](https://microsoft.ai/news/mai-image-2-6-launches-at-no-2-on-arena-ahead-of-google-meta-and-xai/): 10 August 2026, updated 4 September 2026.
- [Pushing the quality-cost frontier with MAI-Image-2.6, Microsoft AI](https://microsoft.ai/news/pushing-the-quality-cost-frontier-with-mai-image-2-6/): 4 September 2026 Foundry availability and MAI-Image-2.6-Flash.
- [MAI-Transcribe-2, Microsoft AI](https://microsoft.ai/news/mai-transcribe-2-is-the-fastest-most-accurate-and-cheapest-speech-recognition-model-in-the-world/): 3 September 2026, pricing and FLEURS results.
- [Humanist AI in practice: a public consultation on our Code of Conduct for MAI Models, Microsoft AI](https://microsoft.ai/news/mai-code-of-conduct/): 14 September 2026.
- [MAI-Code-1-Flash deprecated, GitHub Changelog](https://github.blog/changelog/2026-09-10-mai-code-1-flash-deprecated): 10 September 2026, replacement MAI-Code-1.1-Flash.
- [microsoft/Phi-Ground-Any, Hugging Face](https://huggingface.co/microsoft/Phi-Ground-Any): model card, MIT licence, base model and input format.
- [Phi (language model), Wikipedia](https://en.wikipedia.org/wiki/Phi_(language_model)): generation history and MIT licensing.
- [Phi Open Models, Microsoft Azure](https://azure.microsoft.com/en-us/products/phi): official product page for the Phi family.
- [Empowering innovation: the next generation of the Phi family, Microsoft Azure Blog](https://azure.microsoft.com/en-us/blog/empowering-innovation-the-next-generation-of-the-phi-family/): Phi-4-mini and Phi-4-multimodal announcement.
- [Microsoft launches Phi-4-reasoning-plus, VentureBeat](https://venturebeat.com/ai/microsoft-launches-phi-4-reasoning-plus-a-small-powerful-open-weights-reasoning-model): reasoning variant sizes and context length.
- [Microsoft AI released Phi-4 under the MIT license, MarkTechPost](https://www.marktechpost.com/2025/01/08/microsoft-ai-just-fully-open-sourced-phi-4-a-small-language-model-available-on-hugging-face-under-the-mit-license/): open weights and MIT licensing.
- [Microsoft AI releases Phi-3.5 mini, MoE and Vision, MarkTechPost](https://www.marktechpost.com/2024/08/21/microsoft-ai-releases-phi-3-5-mini-moe-and-vision-with-128k-context-multilingual-and-mit-license/): Phi-3.5 family sizes and context.
- [microsoft/phi-4, Hugging Face](https://huggingface.co/microsoft/phi-4): model card for the 14B text model.
