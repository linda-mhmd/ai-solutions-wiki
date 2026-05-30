---
title: "Floating-Point Arithmetic and Model Precision"
description: "IEEE 754, FP32, FP16, BF16, and INT8 - how number precision determines model size, inference speed, and accuracy tradeoffs in AI deployment."
date: 2026-03-26
categories: [Glossary]
tags: ["cs-fundamentals", "beginner", "floating-point", "ieee-754", "precision", "computer-science", "numbers"]
related:
  - glossary/binary-system
  - glossary/hardware-constraints
  - guides/aws-bedrock-101
last_updated: 2026-05-30
---

Floating-point arithmetic is how computers represent real numbers (numbers with fractional parts) in binary. The precision of this representation - how many bits are used - directly determines how large an AI model is, how fast it runs, and how accurately it performs.

## IEEE 754: The Standard

The IEEE 754 standard defines how floating-point numbers are represented in binary. A floating-point number has three components:

- **Sign bit**: 1 bit, 0 for positive, 1 for negative
- **Exponent**: Encodes the magnitude (the power of 2)
- **Mantissa (significand)**: Encodes the precision

This structure allows the same bit width to represent both very small (0.000001) and very large (1,000,000) numbers by adjusting the exponent, at the cost of precision (the significand has limited resolution).

## Common Precision Formats

**FP32 (Single Precision)**: 32 bits total (1 sign + 8 exponent + 23 mantissa). Four bytes per number. The historical standard for neural network training. Sufficient precision for gradients to update accurately during backpropagation.

**FP16 (Half Precision)**: 16 bits total (1 sign + 5 exponent + 10 mantissa). Two bytes per number. Half the memory of FP32. Supported natively on NVIDIA GPUs since the Pascal architecture (2016). Widely used for inference and mixed-precision training. The reduced exponent range (5 vs 8 bits) means FP16 can overflow or underflow on values with extreme magnitudes.

**BF16 (Brain Floating Point)**: 16 bits total (1 sign + 8 exponent + 7 mantissa). Developed by Google Brain. Same exponent range as FP32 (avoiding the overflow issue of FP16) but with less mantissa precision. Preferred over FP16 for training because it handles the gradient magnitude range better. Native support on TPUs, NVIDIA Ampere (A100) and later GPUs.

**INT8 (8-bit Integer)**: 8 bits, representing integers from -128 to 127 (or 0 to 255 unsigned). One byte per weight. Not a floating-point format - it represents integers only. Converting from FP32 to INT8 requires quantization: scaling and rounding the weights to fit the integer range. This introduces quantization error.

**INT4**: 4 bits per weight. Aggressive quantization that fits two weights per byte. Used in extreme compression scenarios (GPTQ, GGUF formats). Accuracy degradation is measurable but often acceptable for instruction-following tasks.

## Why Precision Matters for AI

A model's precision determines its memory footprint:

| Model Size | FP32 | FP16 / BF16 | INT8 | INT4 |
|------------|------|-------------|------|------|
| 7B params  | 28 GB | 14 GB | 7 GB | 3.5 GB |
| 13B params | 52 GB | 26 GB | 13 GB | 6.5 GB |
| 70B params | 280 GB | 140 GB | 70 GB | 35 GB |

Memory determines what hardware can run the model. A 7B INT8 model fits on a single consumer GPU (8GB VRAM). A 7B FP32 model requires a professional GPU or multiple consumer GPUs.

Precision also affects inference speed. GPU tensor cores perform INT8 matrix multiplications approximately 2-4x faster than FP16 on supported hardware. This is why quantized models are not only smaller but faster.

## Quantization

Quantization is the process of converting a model's weights from a higher-precision format to a lower-precision one. A model trained in FP32 can be quantized to INT8 for deployment.

The main approaches:

**Post-training quantization (PTQ)**: Quantize the weights after training is complete. Fast and simple, but can lose accuracy, especially for sensitive layers.

**Quantization-aware training (QAT)**: Simulate quantization during training so the model learns to be robust to the lower precision. Better accuracy but requires retraining.

**GPTQ and AWQ**: Modern quantization algorithms that minimize quantization error by adjusting weights to compensate for precision loss. Enable aggressive quantization (INT4, INT3) with minimal accuracy degradation.

## AWS and Precision

Bedrock handles precision transparently. The service selects the optimal precision for each model and hardware configuration; callers do not control this.

On SageMaker, deploying a model requires explicit choices. The instance type determines what precision is supported (not all instances have INT8 tensor cores). The model artifact format determines the precision used. These decisions affect cost (smaller model = cheaper instance), throughput (lower precision = faster inference), and accuracy.

Inf2 instances with AWS Inferentia2 use NeuronCore architecture that natively supports BF16 and INT8, often providing better price-performance than GPU instances for supported models.

## Sources

- IEEE. *IEEE 754-2019: Standard for Floating-Point Arithmetic*. https://standards.ieee.org/ieee/754/6210/
- Wang, N., Felix, J., et al. "Training Deep Neural Networks on Noisy Labels with Bootstrapping." Google Brain BF16 work: Kalamkar, D. et al. "A Study of BFLOAT16 for Deep Learning Training." *arXiv:1905.12322*, 2019.
- Amazon Web Services. *Amazon SageMaker - Optimize Model Inference*. https://docs.aws.amazon.com/sagemaker/latest/dg/model-optimize.html
