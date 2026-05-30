---
title: "Hardware Constraints for AI Systems"
description: "CPU vs GPU, VRAM limits, memory bandwidth, and how hardware choices determine what AI models you can run and at what cost."
date: 2026-03-26
categories: [Glossary]
tags: ["cs-fundamentals", "intermediate", "hardware-constraints", "memory", "cpu", "gpu", "performance"]
related:
  - glossary/floating-point
  - glossary/binary-system
  - guides/aws-bedrock-101
last_updated: 2026-05-30
---

AI model performance is ultimately bounded by hardware. Understanding the constraints - what limits inference speed, what determines whether a model fits in memory, what drives cloud costs - is essential for designing cost-effective AI systems.

## CPU vs GPU

A CPU (Central Processing Unit) has a small number of powerful cores optimized for sequential tasks with complex logic and branching. A modern server CPU has 32-128 cores. A GPU (Graphics Processing Unit) has thousands of smaller, simpler cores designed for parallel operations.

Neural network inference and training are matrix multiplication operations. Multiplying a 4,096 x 4,096 matrix by another is embarrassingly parallel: every element of the result can be computed independently. A GPU with thousands of cores can perform these multiplications simultaneously; a CPU serializes them. For matrix-heavy workloads, GPUs provide orders of magnitude higher throughput.

This is why GPU availability is the primary constraint for running large language models locally or on cloud instances.

## VRAM: The Binding Constraint

VRAM (Video RAM) is the memory on a GPU. It is separate from system RAM and faster, but limited in size. Consumer GPUs have 8-24 GB VRAM. Professional GPUs (NVIDIA A100, H100) have 40-80 GB.

A model must fit entirely in VRAM to run efficiently. If the model weights do not fit, the system either fails or uses slow CPU memory offloading (dramatically reducing throughput).

The math is straightforward: a 7-billion-parameter model in FP32 (4 bytes per parameter) requires 28 GB VRAM. The same model in INT8 (1 byte per parameter) requires 7 GB. This is why quantization matters for self-hosted models - it determines whether a model fits on available hardware.

A 70-billion-parameter model in FP16 requires 140 GB. This exceeds a single A100 80GB. Running it requires tensor parallelism across multiple GPUs.

## Memory Bandwidth

Even when a model fits in VRAM, memory bandwidth - the rate at which data can be transferred from VRAM to the GPU cores - is often the bottleneck for inference. The GPU cores finish computation before the next batch of weights arrives from VRAM.

This is why inference throughput does not scale linearly with the number of GPU cores. A faster interconnect (HBM3 vs HBM2e) can matter more than raw compute for inference-bound workloads.

## Storage I/O

Training data must be loaded from storage during training. If the storage system cannot deliver data fast enough, GPU utilization drops as the GPU waits. This is the "data pipeline bottleneck" - training throughput is limited not by compute but by how fast you can read training examples.

Solutions include:
- High-speed NVMe SSDs with low latency
- Preprocessing and caching data in RAM
- Streaming from fast object storage (S3 with optimized throughput)
- Data loading workers that prefetch ahead of the training loop

For inference (not training), storage matters when loading a model for the first time. Large model weights take seconds to load from disk. Keeping models loaded in memory (warm instances) eliminates this latency.

## Network Latency

For distributed training across multiple GPUs or nodes, network bandwidth and latency directly affect training speed. Gradient synchronization between nodes requires transferring large tensors; slow interconnects create bottlenecks. NVIDIA NVLink (within a single node) and InfiniBand (between nodes) are the high-performance options for distributed training.

For inference, network latency affects every API call. Bedrock inference from a Lambda function in the same AWS region adds single-digit milliseconds of network overhead. Cross-region calls add 50-150ms. This matters for real-time applications.

## AWS GPU Instance Types

AWS offers several GPU instance families for AI workloads:

- **P4d instances**: NVIDIA A100 40GB GPUs, 8 per instance, connected by NVLink. Used for large model training and inference.
- **P5 instances**: NVIDIA H100 80GB GPUs. Current highest-performance training instances.
- **Inf2 instances**: AWS Inferentia2, custom silicon optimized for inference. Lower cost per inference token than GPU instances for supported models.
- **G5 instances**: NVIDIA A10G GPUs. Cost-effective for smaller models and batch inference.

## Serverless AI and Bedrock

AWS Bedrock abstracts hardware entirely. You send an API request; Bedrock handles model loading, hardware allocation, and scaling. You pay per input and output token, not per GPU-hour.

This trades hardware visibility for operational simplicity. You cannot choose the quantization level or GPU type. The tradeoff is correct for most production applications: the hardware complexity is real but not your problem. It becomes your concern if you need specific model versions, custom fine-tuning, or hardware-level performance tuning - which is when SageMaker endpoints with explicit instance selection become relevant.

## The Quantization Connection

Model quantization exists precisely because of VRAM constraints. Reducing model precision from FP32 to INT8 halves or quarters the VRAM required, potentially enabling a model to fit on cheaper hardware or allowing a larger batch size on the same hardware. The accuracy cost is typically small for well-quantized models. This is a hardware constraint driving a software solution.

## Sources

- NVIDIA. *NVIDIA Data Center GPUs*. https://www.nvidia.com/en-us/data-center/
- Amazon Web Services. *Amazon EC2 Instance Types*. https://aws.amazon.com/ec2/instance-types/
