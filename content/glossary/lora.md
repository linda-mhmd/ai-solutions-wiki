---
title: "LoRA and QLoRA"
description: "Low-Rank Adaptation freezes a model and trains a small pair of low-rank matrices instead, the dominant parameter-efficient way to fine-tune large models."
date: 2026-07-01
categories: [Glossary]
tags: ["ai-ml", "intermediate", "fine-tuning", "lora", "peft", "quantization", "llm", "model-training"]
related:
  - glossary/fine-tuning
  - glossary/quantization
  - glossary/transfer-learning
  - glossary/foundation-models
  - guides/fine-tuning-llms-guide
  - comparisons/rag-vs-fine-tuning
---

<figure class="bz-figure">
  <img src="/img/obsidian-lab/loom-red-thread-notext.png" alt="A dark industrial loom threading a single red wire through a fixed frame, representing a small trainable adapter woven into a frozen model." loading="lazy">
  <figcaption>LoRA leaves the loom (the pre-trained model) untouched and threads one thin adjustable wire through it. The frame stays fixed; only the thread learns.</figcaption>
</figure>

LoRA, short for Low-Rank Adaptation, is a method for fine-tuning a large model by freezing its original weights and training a small pair of low-rank matrices instead. It was introduced by Hu et al. in 2021. The insight is that the change a model needs to learn a new task has a low intrinsic rank, so you do not have to update all of its billions of parameters. You can capture the update with two much smaller matrices. LoRA is the most widely used member of a family called PEFT, parameter-efficient fine-tuning.

## A plain analogy

Think of a tailored suit. Full [fine-tuning](/glossary/fine-tuning/) is re-cutting the whole garment from scratch every time you want a different fit: expensive, slow, and you need a second suit's worth of fabric to store the result. LoRA is a set of clip-on alterations. The original suit is left exactly as it was, and a few small, cheap adjustments sit on top. You can keep dozens of these alteration sets in a drawer and clip on whichever one suits the occasion, all sharing the same base suit. That is why one GPU can serve many LoRA-tuned variants of a single base model at once.

## The problem LoRA solves

A modern foundation model has billions of parameters. Full fine-tuning updates every one of them and, because optimisers like Adam store two extra values per parameter (momentum and variance), the memory bill is several times the size of the model itself. Fine-tuning GPT-3 175B this way needs enormous GPU clusters, and each finished model is a full 175B-parameter copy to store and serve.

LoRA attacks this directly. The original paper reports that on GPT-3 175B it cuts the number of trainable parameters by up to 10,000 times and the GPU memory requirement by about 3 times, while matching or beating full fine-tuning quality on RoBERTa, DeBERTa, GPT-2, and GPT-3. Treat those as the paper's headline figures and expect your own numbers to vary by task.

## How LoRA works

A neural network layer applies a weight matrix `W` to its input. Fine-tuning learns an update `ΔW` so the layer behaves as `W + ΔW`. LoRA's move is to constrain that update to be low-rank. Instead of learning the full `ΔW` (which is the same size as `W`), it factors the update into two thin matrices: `ΔW = B · A`, where `A` maps down to a small rank `r` and `B` maps back up. If `W` is a 4096 by 4096 matrix, a rank `r = 8` adapter trains roughly 4096 by 8 plus 8 by 4096 values, a tiny fraction of the original.

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 1</span>
    <span class="bz-flow-step-name">Freeze the base</span>
    <span class="bz-flow-step-desc">The pre-trained weights W stay fixed. No gradients flow into them.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 2</span>
    <span class="bz-flow-step-name">Inject adapters</span>
    <span class="bz-flow-step-desc">Add two small matrices A and B of rank r alongside chosen layers.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 3</span>
    <span class="bz-flow-step-name">Train only A and B</span>
    <span class="bz-flow-step-desc">Gradients update the adapters only, so memory and compute drop sharply.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 4</span>
    <span class="bz-flow-step-name">Merge or swap</span>
    <span class="bz-flow-step-desc">Merge B·A back into W for zero extra latency, or keep it separate to hot-swap adapters.</span>
  </div>
</div>

Two details matter in practice. Because the adapter can be merged back into `W` after training (`W_new = W + B·A`), LoRA adds no inference latency, unlike older adapter methods that inserted extra layers. And because the adapter is small (often a few megabytes), you can store many task-specific adapters against one shared base model and load the one you need on demand.

## The knobs that matter

- **Rank `r`**: the size of the bottleneck. Higher rank means more capacity and more parameters. Common values run from 8 to 64. Higher is not always better.
- **Alpha**: a scaling factor applied to the adapter output. A common heuristic sets alpha to twice the rank, though this is a starting point, not a law.
- **Target modules**: which layers get adapters. Early LoRA targeted only attention projections. Current practice often targets all linear layers (`target_modules="all-linear"`) for stronger results.
- **Dropout**: light dropout on the adapter can help regularise small datasets.

## QLoRA: LoRA on a quantized base

QLoRA, from Dettmers et al. in 2023, is the change that let people fine-tune very large models on a single consumer or workstation GPU. It keeps LoRA's adapter idea but first [quantizes](/glossary/quantization/) the frozen base model to 4-bit, then backpropagates through that frozen 4-bit model into the (higher-precision) LoRA adapters. It introduced three techniques: the 4-bit NormalFloat (NF4) data type suited to the bell-curve distribution of weights, double quantization to compress the quantization constants themselves, and paged optimizers that offload optimizer state to CPU memory to survive memory spikes. QLoRA made it possible to fine-tune a 65B model on a single 48GB GPU with quality close to 16-bit full fine-tuning.

## Beyond LoRA: the 2024-2026 PEFT family

LoRA started a research line. The notable variants you will meet in 2026:

| Method | Core idea | Why it exists |
|---|---|---|
| **LoRA** | Low-rank update `B·A` | The baseline, cheap and effective |
| **QLoRA** | LoRA over a 4-bit base | Fits big models on one GPU |
| **DoRA** | Split weights into magnitude + direction | Closes the gap to full fine-tuning, no extra inference cost |
| **AdaLoRA** | Allocate rank adaptively per layer | Spend parameters where they help most |
| **PiSSA** | Init adapters from principal singular vectors | Faster, more stable convergence |
| **VeRA** | Share frozen random matrices, train tiny vectors | Even fewer parameters than LoRA |
| **GaLore** | Low-rank projection of gradients, not weights | Enables full-parameter training in low memory |

A common 2026 starting point cited in practitioner guides is DoRA at rank `r = 16` targeting all linear layers, then adjust from there. DoRA (Weight-Decomposed Low-Rank Adaptation) decomposes each pre-trained weight into a magnitude and a direction, applies LoRA to the direction, and tends to track full fine-tuning quality more closely than plain LoRA while keeping the merge-back property that avoids inference overhead.

## Where LoRA fits in the toolchain

You rarely implement LoRA by hand. The Hugging Face `peft` library provides the adapters, `transformers` and `trl` provide the training loop, and tools like Axolotl, Unsloth, and torchtune wrap the whole flow. Serving frameworks such as [vLLM](/tools/vllm/) can load and hot-swap multiple LoRA adapters against one base model, which is how a single deployment serves many fine-tuned variants economically.

## When LoRA is the right choice

- You want to change a model's behaviour, tone, or format on a specialised task and have a few thousand good examples.
- You cannot afford full fine-tuning compute, or you need to keep many task-specific variants.
- You want to serve several tuned models from one base without paying for several full copies.

LoRA does not add new factual knowledge reliably. For fresh or proprietary facts, prefer [retrieval-augmented generation](/glossary/rag/). For the full decision between approaches, see [RAG vs fine-tuning](/comparisons/rag-vs-fine-tuning/) and the [fine-tuning LLMs guide](/guides/fine-tuning-llms-guide/).

## Further reading

- [What is fine-tuning?](/glossary/fine-tuning/): the broader family LoRA belongs to, and when to fine-tune at all.
- [Fine-tuning LLMs guide](/guides/fine-tuning-llms-guide/): a practical walkthrough that puts LoRA and QLoRA to work.
- [Quantization](/glossary/quantization/): the 4-bit compression QLoRA depends on.
- [RAG vs fine-tuning](/comparisons/rag-vs-fine-tuning/): choosing between teaching behaviour and supplying knowledge.
- [Hugging Face PEFT documentation](https://huggingface.co/docs/peft): the reference library for LoRA, QLoRA, DoRA, and more.
- [LoRA paper (Hu et al., 2021)](https://arxiv.org/abs/2106.09685): the original method and its rank-deficiency evidence.

## Sources

- Hu, E.J., et al. (2021). LoRA: Low-Rank Adaptation of Large Language Models. *ICLR 2022*. arXiv:2106.09685. (Core method; up to 10,000x fewer trainable parameters and about 3x less GPU memory on GPT-3 175B, with no added inference latency.)
- Dettmers, T., et al. (2023). QLoRA: Efficient Finetuning of Quantized LLMs. *NeurIPS 2023*. arXiv:2305.14314. (4-bit NF4, double quantization, paged optimizers; fine-tunes a 65B model on one 48GB GPU.)
- Liu, S.-Y., et al. (2024). DoRA: Weight-Decomposed Low-Rank Adaptation. *ICML 2024*. arXiv:2402.09353. (Magnitude and direction decomposition; closes the quality gap to full fine-tuning.)
- Zhang, Q., et al. (2023). AdaLoRA: Adaptive Budget Allocation for Parameter-Efficient Fine-Tuning. arXiv:2303.10512.
- Meng, F., et al. (2024). PiSSA: Principal Singular Values and Singular Vectors Adaptation. arXiv:2404.02948.
- Kopiczko, D.J., et al. (2024). VeRA: Vector-based Random Matrix Adaptation. *ICLR 2024*. arXiv:2310.11454.
- Zhao, J., et al. (2024). GaLore: Memory-Efficient LLM Training by Gradient Low-Rank Projection. *ICML 2024*. arXiv:2403.03507.
- Hugging Face. PEFT library documentation. https://huggingface.co/docs/peft
