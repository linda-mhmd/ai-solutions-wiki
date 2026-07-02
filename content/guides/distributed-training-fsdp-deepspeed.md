---
title: "Distributed Training: FSDP, DeepSpeed, and Parallelism"
description: "How to train models too large for one GPU, covering data, tensor, and pipeline parallelism, ZeRO sharding, PyTorch FSDP, and how to choose between them."
date: 2026-07-02
categories: [Guides]
tags: [distributed-training, fsdp, deepspeed, gpu, model-training, machine-learning]
related:
  - tools/pytorch
  - guides/fine-tuning-llms-guide
  - guides/scaling-ai-infrastructure
  - guides/gpu-scheduling-for-ai
  - comparisons/gpu-clouds-and-neoclouds
  - glossary/hardware-constraints
last_verified: 2026-07-02
---

<figure class="bz-figure">
  <img src="/img/ai-machine/giant-gears-red-notext.png" alt="Massive dark industrial gears turning together under red light, a metaphor for many GPUs working in lockstep to train one model." loading="lazy">
  <figcaption>Distributed training is many GPUs turning in lockstep on one model. The hard part is keeping them synchronised without stalling.</figcaption>
</figure>

Distributed training splits a single training job across many GPUs, and often many machines, so you can train models that do not fit on one device or would take too long on one device. Once a model passes a few billion parameters, you have no choice: the weights, gradients, and optimizer state overflow even an 80GB GPU. This guide explains why, the three axes of parallelism, and how the two dominant toolkits, [PyTorch](/tools/pytorch/) FSDP and DeepSpeed ZeRO, actually reduce memory.

## Why one GPU runs out

The memory a training step needs is far larger than the model itself. With mixed-precision training using the Adam optimizer, each parameter costs roughly 16 bytes: 2 bytes for the bf16 weight, 2 for its gradient, and about 12 for the optimizer state (fp32 master weight plus first and second moments). Activations, saved for the backward pass, add more on top and scale with batch size and sequence length.

<div class="bz-arch">
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Per training step</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Parameters (2 B/param)</span>
      <span class="bz-arch-chip">Gradients (2 B/param)</span>
      <span class="bz-arch-chip">Optimizer state (~12 B/param)</span>
      <span class="bz-arch-chip">Activations (batch-dependent)</span>
      <span class="bz-arch-chip-note">Mixed-precision Adam: about 16 bytes per parameter before activations</span>
    </div>
  </div>
</div>

At 16 bytes per parameter, a 7B model needs about 112GB just for weights, gradients, and optimizer state, before a single activation. That is why a 7B model does not train on one 80GB GPU without help, and a 70B model needs tens of GPUs. Distributed training exists to spread this cost.

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 1</span>
    <span class="bz-flow-step-name">Place</span>
    <span class="bz-flow-step-desc">Replicate or shard the model and data across GPUs.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 2</span>
    <span class="bz-flow-step-name">Forward</span>
    <span class="bz-flow-step-desc">Each GPU computes a loss on its slice of the batch.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 3</span>
    <span class="bz-flow-step-name">Backward</span>
    <span class="bz-flow-step-desc">Each GPU computes local gradients.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 4</span>
    <span class="bz-flow-step-name">Synchronise</span>
    <span class="bz-flow-step-desc">All-reduce or all-gather so every GPU agrees on the update.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 5</span>
    <span class="bz-flow-step-name">Update</span>
    <span class="bz-flow-step-desc">Apply the optimizer step and repeat.</span>
  </div>
</div>

## The three axes of parallelism

Every distributed strategy is a combination of three independent ways to split the work.

### Data parallelism

Every GPU holds a full copy of the model and processes a different slice of the batch. After the backward pass, the GPUs average their gradients with an all-reduce so all replicas stay identical. This is the simplest and most common form, implemented as DistributedDataParallel (DDP) in PyTorch. The bandwidth-optimal way to do the averaging is ring all-reduce, popularised by Horovod, where each gradient is passed around a ring of GPUs so total traffic does not grow with GPU count.

Data parallelism speeds up training but does not save memory: each GPU still stores the whole model. It stops working the moment the model no longer fits on one device.

### Tensor parallelism

Tensor parallelism splits individual layers. A large matrix multiply inside an attention or feed-forward block is divided column-wise or row-wise across GPUs, and partial results are combined. Introduced at scale by Megatron-LM, it lets a single layer exceed one GPU's memory. The cost is heavy communication inside every forward and backward pass, so tensor parallelism is normally kept within one machine where GPUs share a fast NVLink interconnect.

### Pipeline parallelism

Pipeline parallelism splits the model by depth: GPU 0 holds the first group of layers, GPU 1 the next, and so on. Activations flow forward down the pipeline and gradients flow back up. The naive version leaves GPUs idle (the pipeline bubble), so GPipe splits each batch into micro-batches that keep every stage busy. Pipeline parallelism crosses machines well because it communicates only at stage boundaries.

## Sharding: FSDP and ZeRO

The breakthrough that made trillion-parameter training practical was to stop replicating what data parallelism duplicates. ZeRO (Zero Redundancy Optimizer), from DeepSpeed, shards the optimizer state, gradients, and parameters across the data-parallel GPUs instead of copying them, then gathers each shard only when needed.

- **ZeRO stage 1** shards optimizer state.
- **ZeRO stage 2** also shards gradients.
- **ZeRO stage 3** also shards parameters, so no GPU ever holds the full model.

PyTorch's Fully Sharded Data Parallel (FSDP) is the native equivalent of ZeRO stage 3. It shards parameters, gradients, and optimizer state, then all-gathers each layer's parameters just in time for its forward and backward pass and frees them immediately after. The current API, FSDP2, shards on a per-parameter basis using DTensor, which composes cleanly with tensor parallelism and quantization.

<figure class="bz-figure">
  <img src="/img/ai-machine/light-beams-junction-notext.png" alt="Bright light beams routed through heavy industrial junction machinery, a metaphor for gradients and parameters flowing between GPUs over the interconnect." loading="lazy">
  <figcaption>Sharding trades memory for communication: parameters are gathered over the interconnect exactly when a layer needs them, then released.</figcaption>
</figure>

FSDP2 wrapping is only a few lines. You launch one process per GPU with `torchrun`, then shard each transformer block and the root module:

```python
import torch
from torch.distributed.fsdp import fully_shard

# torchrun --nproc_per_node=8 train.py
# each process owns one GPU via its LOCAL_RANK

model = build_transformer()            # your nn.Module

for block in model.layers:             # shard each transformer block
    fully_shard(block)
fully_shard(model)                     # shard the root module

# from here the training loop is normal: forward, backward, optimizer.step()
optimizer = torch.optim.AdamW(model.parameters(), lr=2e-4)
```

For the largest models you combine all three axes, known as 3D parallelism: tensor parallelism inside a node, pipeline parallelism across a few nodes, and data-parallel sharding across the rest. Two memory-saving techniques almost always accompany it: mixed precision (bf16 compute) and activation checkpointing, which recomputes activations in the backward pass instead of storing them.

## How to choose

| | DDP | FSDP / ZeRO-3 | Tensor parallel | Pipeline parallel |
|---|---|---|---|---|
| **Splits** | The batch | Params, grads, optimizer state | Individual layers | Groups of layers |
| **Saves memory** | No | Yes, a lot | Yes | Yes |
| **Communication** | Gradients once per step | Params gathered per layer | Heavy, inside each layer | Light, at stage edges |
| **Interconnect** | Tolerant | Fast preferred | NVLink required | Cross-node friendly |
| **Best for** | Model fits on one GPU | Model too big for one GPU | Single huge layers | Very deep models across nodes |

A simple decision rule works for most teams:

1. **Model fits on one GPU?** Use DDP and scale out for speed.
2. **Model too big, but fits when sharded?** Use FSDP or DeepSpeed ZeRO-3. This covers most fine-tuning and mid-scale pretraining.
3. **Single layers too big, or training a frontier model?** Add tensor and pipeline parallelism on top, using a stack like Megatron-DeepSpeed.

## When not to distribute

- **Your model fits comfortably on one GPU.** A single device avoids all communication overhead and complexity. Reach for parameter-efficient methods like [LoRA](/glossary/lora/) before multi-GPU training.
- **Your bottleneck is data, not compute.** If the GPU sits idle waiting for the input pipeline, fix data loading first. More GPUs will not help.
- **You have a slow interconnect.** Sharding and tensor parallelism assume fast links between GPUs. Over slow networking, communication can erase the speedup.
- **The job is short.** For a one-off small fine-tune, the setup cost of a distributed run rarely pays off.

## Further reading

- [Fine-tuning LLMs: a practical guide](/guides/fine-tuning-llms-guide/): most fine-tunes need LoRA before they need multi-GPU training.
- [GPU scheduling for AI](/guides/gpu-scheduling-for-ai/): how the GPUs a distributed job needs get allocated in a cluster.
- [Scaling AI infrastructure](/guides/scaling-ai-infrastructure/): the wider infrastructure picture around large training jobs.
- [GPU clouds and neoclouds](/comparisons/gpu-clouds-and-neoclouds/): where to rent the multi-GPU nodes these strategies assume.
- [PyTorch](/tools/pytorch/): the framework FSDP is built into.
- [PyTorch FSDP documentation](https://docs.pytorch.org/docs/stable/fsdp.html): the official reference for the sharding API.
- [DeepSpeed documentation](https://www.deepspeed.ai/): ZeRO stages, offload, and 3D parallelism.

## Sources

- Rajbhandari, S., Rasley, J., Ruwase, O., and He, Y. "ZeRO: Memory Optimizations Toward Training Trillion Parameter Models." *SC* (2020). https://arxiv.org/abs/1910.02054. Introduces the three ZeRO sharding stages behind DeepSpeed.
- Zhao, Y., et al. "PyTorch FSDP: Experiences on Scaling Fully Sharded Data Parallel." *VLDB* (2023). https://arxiv.org/abs/2304.11277. The design and lessons behind PyTorch's native sharding.
- Shoeybi, M., et al. "Megatron-LM: Training Multi-Billion Parameter Language Models Using Model Parallelism." arXiv:1909.08053 (2019). https://arxiv.org/abs/1909.08053. Tensor parallelism for transformers.
- Huang, Y., et al. "GPipe: Efficient Training of Giant Neural Networks using Pipeline Parallelism." *NeurIPS* (2019). https://arxiv.org/abs/1811.06965. Micro-batched pipeline parallelism.
- Sergeev, A., and Del Balso, M. "Horovod: Fast and Easy Distributed Deep Learning in TensorFlow." arXiv:1802.05799 (2018). https://arxiv.org/abs/1802.05799. Ring all-reduce for gradient averaging.
