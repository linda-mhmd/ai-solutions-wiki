---
title: "Knowledge Distillation"
description: "How teacher-student training compresses large models into smaller, faster ones while preserving most of the original accuracy."
date: 2026-03-28
categories: [Glossary]
tags: [knowledge-distillation, model-compression, deep-learning, inference-optimization, teacher-student]
related:
  - glossary/quantization
  - glossary/pruning
  - glossary/fine-tuning
  - glossary/transfer-learning
last_updated: 2026-05-30
---

Knowledge distillation is a model compression technique where a large, high-performing model (the teacher) transfers its learned behavior to a smaller, more efficient model (the student). The student is trained not only on ground-truth labels but also on the teacher's soft probability outputs, which encode richer information about inter-class relationships than hard labels alone.

## How It Works

During standard training, a model learns from one-hot labels (e.g., "cat" = 1, everything else = 0). In distillation, the teacher's output probabilities are softened using a temperature parameter, which amplifies the signal in low-probability classes. For example, the teacher might assign 0.7 to "cat," 0.15 to "tiger," and 0.05 to "dog," revealing that cats are visually closer to tigers than to airplanes. The student learns from a weighted combination of the hard labels (cross-entropy with ground truth) and soft labels (KL divergence with the teacher's softened outputs).

This approach works because the teacher's soft predictions contain "dark knowledge" about data structure that hard labels lack. The student can learn these patterns even with significantly fewer parameters.

## Why It Matters

Distillation enables deploying powerful AI capabilities on resource-constrained platforms. DistilBERT, for example, retains 97% of BERT's accuracy with 40% fewer parameters and 60% faster inference. This technique is widely used to produce models suitable for mobile devices, edge deployments, and latency-sensitive applications where running the full teacher model is impractical or too expensive.

## Practical Considerations

Effective distillation requires a well-trained teacher and careful selection of the temperature parameter (typically 2-20). The student architecture should be chosen to match deployment constraints. Distillation can be combined with quantization and pruning for compounding compression gains. For LLM deployments, distillation is increasingly used to create task-specific smaller models from general-purpose large models, reducing per-query inference costs while maintaining acceptable quality for specific use cases.

## Sources

- Hinton, G., Vinyals, O., & Dean, J. (2015). Distilling the knowledge in a neural network. *NeurIPS Deep Learning Workshop 2015*. (Original knowledge distillation paper; introduced soft targets and temperature scaling.)
- Sanh, V., et al. (2019). DistilBERT, a distilled version of BERT: Smaller, faster, cheaper and lighter. *NeurIPS Energy Efficient NLP Workshop 2019*. (DistilBERT; prominent LM distillation example.)
- Romero, A., et al. (2015). FitNets: Hints for thin deep nets. *ICLR 2015*. (Intermediate representation distillation beyond soft output targets.)
