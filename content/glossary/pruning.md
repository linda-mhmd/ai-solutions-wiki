---
title: "Pruning"
description: "How structured and unstructured pruning reduce neural network size by removing redundant weights, neurons, or layers."
date: 2026-03-28
categories: [Glossary]
tags: [pruning, model-compression, inference-optimization, deep-learning, sparsity]
related:
  - glossary/quantization
  - glossary/knowledge-distillation
  - glossary/inference
  - glossary/neural-network
last_updated: 2026-05-30
---

Pruning is a model compression technique that removes unnecessary parameters from a neural network to reduce its size and computational cost. The core insight is that trained neural networks are often over-parameterized: many weights contribute minimally to the output and can be removed (set to zero) with little impact on accuracy. Pruning can reduce model size by 50-90% while maintaining most of the original performance.

## How It Works

**Unstructured pruning** removes individual weights based on a criterion, typically magnitude (smallest weights are removed first). This creates sparse weight matrices with zeros scattered throughout. While unstructured pruning achieves high compression ratios, the resulting irregular sparsity is difficult to accelerate on standard hardware without specialized sparse computation libraries.

**Structured pruning** removes entire neurons, filters, attention heads, or layers. Because it eliminates complete computational units, the resulting model is a standard dense network that runs faster on any hardware without sparse computation support. However, structured pruning typically achieves lower compression ratios than unstructured pruning at the same accuracy level.

The pruning process usually follows an iterative cycle: prune a percentage of parameters, fine-tune the model to recover accuracy, then prune again. The **lottery ticket hypothesis** suggests that within a large network there exists a smaller subnetwork (the "winning ticket") that, when trained from the same initialization, can match the full network's performance.

## Why It Matters

Pruning enables deploying capable models on resource-constrained devices and reducing server-side inference costs. When combined with quantization and distillation, pruning contributes to a compression pipeline that can reduce model size by an order of magnitude. For organizations running models at scale, even modest size reductions translate to significant infrastructure savings.

## Practical Considerations

For immediate impact, structured pruning is more practical because the resulting models accelerate on standard hardware. Unstructured pruning requires sparse computation support (available in NVIDIA Ampere GPUs and newer via 2:4 structured sparsity). Libraries like PyTorch, TensorFlow Model Optimization Toolkit, and Neural Magic's SparseML provide pruning utilities. Start by pruning 20-30% of parameters and evaluating accuracy, then increase gradually. For LLMs, attention head pruning and layer removal are active research areas with promising early results.

## Sources

- LeCun, Y., Denker, J.S., & Solla, S.A. (1990). Optimal brain damage. *NeurIPS 1990*. (Early magnitude-based pruning using second-order weight saliency.)
- Han, S., Pool, J., Tran, J., & Dally, W.J. (2015). Learning both weights and connections for efficient neural networks. *NeurIPS 2015*. (Modern unstructured magnitude pruning achieving 90%+ sparsity.)
- Frankle, J., & Carlin, M. (2019). The lottery ticket hypothesis: Finding sparse, trainable neural networks. *ICLR 2019*. (Lottery ticket hypothesis; winning subnetwork concept.)
