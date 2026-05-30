---
title: "Flash Attention"
description: "How Flash Attention makes transformer self-attention memory-efficient by restructuring computation to minimize GPU memory reads and writes."
date: 2026-03-28
categories: [Glossary]
tags: [flash-attention, attention, transformer, GPU-optimization, inference]
related:
  - glossary/attention-mechanism
  - glossary/transformer-architecture
  - glossary/long-context-model
  - glossary/ai-hardware
last_updated: 2026-05-30
---

Flash Attention is an algorithm that computes exact self-attention with significantly reduced memory usage and improved speed by restructuring computation to be aware of the GPU memory hierarchy. Standard attention requires materializing the full n-by-n attention matrix in GPU high-bandwidth memory (HBM), which becomes a bottleneck for long sequences. Flash Attention avoids this by computing attention in tiles, keeping intermediate results in fast on-chip SRAM.

## How It Works

Standard attention computes Q*K^T to produce an n-by-n attention score matrix, applies softmax, then multiplies by V. For a sequence of length 32K, this matrix alone requires gigabytes of memory. Flash Attention restructures this computation using a tiling approach: it loads blocks of Q, K, and V into SRAM, computes partial attention for each block, and accumulates results without ever writing the full attention matrix to HBM.

The key insight is an online softmax algorithm that maintains running statistics (max and sum) across tiles, producing numerically identical results to standard attention. **Flash Attention 2** further improved throughput by optimizing the parallelism across GPU thread blocks and reducing non-matmul FLOPs. **Flash Attention 3** added support for FP8 precision and asynchronous computation on newer GPU architectures like Hopper.

## Why It Matters

Flash Attention is one of the most impactful practical optimizations in modern AI infrastructure. It reduces attention memory from O(n^2) to O(n), enabling models to process much longer sequences without running out of GPU memory. It also provides a 2-4x wall-clock speedup by reducing memory bandwidth bottlenecks. Nearly all major LLM inference and training frameworks now use Flash Attention by default.

## Practical Considerations

Flash Attention is available in PyTorch (via torch.nn.functional.scaled_dot_product_attention), Hugging Face Transformers, vLLM, and TensorRT-LLM. It requires compatible GPU hardware (Ampere or newer for full benefits). When deploying long-context models, Flash Attention is effectively required to keep memory costs manageable. Teams should ensure their inference stack supports it, as it is one of the highest-impact optimizations available with zero accuracy tradeoff.

## Sources

- Dao, T., Fu, D.Y., Ermon, S., Rudra, A., & Ré, C. (2022). FlashAttention: Fast and memory-efficient exact attention with IO-awareness. *NeurIPS 2022*. (Flash Attention 1; introduced tiling approach.)
- Dao, T. (2023). FlashAttention-2: Faster attention with better parallelism and work partitioning. *ICLR 2024*. (Flash Attention 2; 2x throughput improvement.)
- Shah, J., et al. (2024). FlashAttention-3: Fast and accurate attention for H100 GPUs. *NeurIPS 2024 Workshop*. (Flash Attention 3; FP8 and asynchronous compute for Hopper architecture.)
