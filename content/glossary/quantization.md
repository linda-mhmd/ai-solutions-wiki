---
title: "Quantization"
description: "How INT8 and INT4 quantization compress neural network models for faster inference and lower memory usage with minimal accuracy loss."
date: 2026-03-28
categories: [Glossary]
tags: [quantization, model-compression, inference-optimization, INT8, deep-learning]
related:
  - glossary/pruning
  - glossary/knowledge-distillation
  - glossary/inference
  - glossary/ai-hardware
last_updated: 2026-05-30
---

Quantization reduces the numerical precision of a neural network's weights and activations, typically from 32-bit floating point (FP32) to lower bit-widths like INT8, INT4, or even binary. This compression shrinks model size, reduces memory bandwidth requirements, and enables faster inference on hardware with integer arithmetic support, often with minimal impact on accuracy.

## How It Works

**Post-training quantization (PTQ)** converts a pre-trained model's weights to lower precision without retraining. A calibration dataset is passed through the model to determine the range of values for each layer, which sets the quantization scale and zero-point. Weights and optionally activations are then mapped to the lower bit-width. PTQ is fast and requires no training infrastructure but can degrade accuracy on sensitive models.

**Quantization-aware training (QAT)** simulates quantization during training by inserting fake quantization operations into the forward pass. The model learns to be robust to precision loss, typically recovering most of the accuracy gap. QAT produces better results than PTQ but requires the full training pipeline.

**Weight-only quantization** reduces only the weights (to INT4 or lower) while keeping activations in higher precision. This is especially effective for LLMs, where the memory bottleneck is loading billions of weight parameters. Methods like GPTQ, AWQ, and GGUF enable running 70B-parameter models on consumer GPUs by quantizing weights to 4-bit.

## Why It Matters

Quantization is one of the most practical levers for reducing AI inference costs. An INT8 model uses half the memory of FP16 and can run 2-4x faster on supported hardware. For LLM deployments, 4-bit quantization can reduce GPU requirements by 4x, transforming a multi-GPU workload into a single-GPU one. This directly translates to lower infrastructure costs and broader deployment options.

## Practical Considerations

Modern inference frameworks (vLLM, TensorRT-LLM, llama.cpp) support quantized models natively. For LLMs, 4-bit weight-only quantization (GPTQ, AWQ) typically preserves over 95% of the original model's quality on benchmarks. Always evaluate quantized models on your specific task, as accuracy degradation varies by domain. INT8 quantization is safe for most applications; INT4 requires more careful validation. Combine quantization with Flash Attention and batching for maximum inference efficiency.

## Sources

- Jacob, B., et al. (2018). Quantization and training of neural networks for efficient integer-arithmetic-only inference. *CVPR 2018*. (QAT for integer arithmetic; standard reference for quantization-aware training.)
- Frantar, E., et al. (2022). GPTQ: Accurate post-training quantization for generative pre-trained transformers. *arXiv:2210.17323*. (GPTQ; 4-bit weight-only quantization for LLMs.)
- Lin, J., et al. (2023). AWQ: Activation-aware weight quantization for LLM compression and acceleration. *MLSys 2024*. (AWQ; weight-only quantization that preserves salient weights.)
- Dettmers, T., et al. (2022). LLM.int8(): 8-bit matrix multiplication for transformers at scale. *NeurIPS 2022*. (INT8 quantization for large language models.)
