---
title: "AI Hardware"
description: "Comparing GPUs, TPUs, and custom ASICs from NVIDIA, Google, Groq, and Cerebras for training and inference workloads."
date: 2026-03-28
categories: [Glossary]
tags: [GPU, TPU, ASIC, Groq, Cerebras, AI-infrastructure]
related:
  - glossary/inference
  - glossary/quantization
  - glossary/flash-attention
  - glossary/edge-computing
last_updated: 2026-05-30
---

AI hardware refers to specialized processors designed to accelerate the matrix multiplications and tensor operations that dominate machine learning workloads. The choice of hardware directly impacts training time, inference latency, throughput, and cost per query. The market spans general-purpose GPUs, Google's TPUs, and purpose-built ASICs from companies like Groq and Cerebras.

## How It Works

**NVIDIA GPUs** dominate AI training and inference. The H100 and B200 GPUs provide thousands of CUDA and Tensor Cores optimized for mixed-precision matrix operations. NVIDIA's ecosystem advantage (CUDA, cuDNN, TensorRT) means virtually all ML frameworks are optimized for their hardware first. NVLink and NVSwitch enable multi-GPU communication at high bandwidth for distributed training.

**Google TPUs** (Tensor Processing Units) are custom ASICs designed specifically for neural network computation. TPU v5p and Trillium pods provide high-bandwidth interconnects for large-scale training. TPUs are available through Google Cloud and power Google's own models. Their systolic array architecture excels at the large matrix multiplications in transformer models.

**Groq** uses a deterministic architecture called the Language Processing Unit (LPU) that eliminates the scheduling overhead of GPUs. By executing computations in a precisely timed pipeline, Groq achieves extremely low latency inference, delivering hundreds of tokens per second for LLMs. **Cerebras** takes a different approach with its wafer-scale engine (WSE), a single chip the size of an entire silicon wafer containing hundreds of thousands of cores, eliminating the inter-chip communication overhead that limits multi-GPU training.

## Why It Matters

Hardware choice determines the economics of AI deployment. Training a frontier model requires thousands of GPUs for months. Inference cost per token depends on hardware throughput and utilization. For technical decision-makers, understanding hardware tradeoffs is essential for infrastructure planning, vendor selection, and cost forecasting.

## Practical Considerations

For most organizations, NVIDIA GPUs offer the safest choice due to ecosystem maturity and broad framework support. TPUs are compelling for Google Cloud-committed teams running large training jobs. Groq is worth evaluating for latency-critical inference workloads. When planning capacity, consider not just raw performance but availability, software compatibility, and the cost of engineering effort to optimize for non-NVIDIA platforms. Multi-cloud strategies may benefit from hardware diversity to avoid single-vendor dependency.

## Sources

- Jouppi, N., et al. (2017). In-datacenter performance analysis of a tensor processing unit. *ISCA 2017*. (Original Google TPU paper; established domain-specific accelerators as the standard for ML compute.)
- Dally, W., Turakhia, Y., & Han, S. (2020). Domain-specific hardware accelerators. *Communications of the ACM, 63*(7), 48–57. (Survey explaining why custom hardware beats general-purpose CPUs/GPUs for neural network workloads.)
- Reuther, A., et al. (2020). Survey of machine learning accelerators. *IEEE High Performance Extreme Computing Conference (HPEC)*. (Comprehensive landscape survey of GPU, TPU, and ASIC alternatives for ML.)
- Patterson, D., et al. (2022). The carbon footprint of machine learning training will plateau, then shrink. *Computer, 55*(7), 18–28. (Analysis of hardware efficiency gains; informs sustainability and cost-per-FLOP decisions.)
