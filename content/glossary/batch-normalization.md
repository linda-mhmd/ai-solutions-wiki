---
title: "Batch Normalization"
description: "What batch normalization is, how it stabilizes neural network training, and when to apply it in model architectures."
date: 2026-03-28
categories: [Glossary]
tags: [batch-normalization, deep-learning, neural-network, training, optimization]
related:
  - glossary/neural-network
  - glossary/deep-learning
  - glossary/dropout
  - glossary/gradient-descent
last_updated: 2026-05-30
---

Batch normalization is a technique that normalizes the inputs to each layer of a neural network by adjusting and scaling the activations using statistics computed across the current mini-batch. Introduced by Ioffe and Szegedy in 2015, it addresses the internal covariate shift problem - the phenomenon where the distribution of layer inputs changes during training as preceding layers update their weights.

## How It Works

For each mini-batch during training, batch normalization computes the mean and variance of the activations at a given layer, then normalizes the activations to have zero mean and unit variance. Two learnable parameters (gamma for scale, beta for shift) allow the network to undo the normalization if that is optimal for the task.

During inference, batch normalization uses running averages of mean and variance computed during training, rather than batch statistics, so predictions are deterministic and do not depend on other samples in the batch.

## Why It Matters

Batch normalization provides several practical benefits for training deep networks:

**Faster training** - normalized activations allow higher learning rates without risk of divergence, significantly reducing training time.

**Reduced sensitivity to initialization** - the model is less dependent on careful weight initialization, making architectures easier to design and train.

**Regularization effect** - the noise introduced by computing statistics over mini-batches acts as a mild regularizer, sometimes reducing the need for dropout.

**Deeper networks** - batch normalization helps gradients flow through many layers, enabling training of deeper architectures that would otherwise suffer from vanishing gradients.

## Practical Considerations

Batch normalization is standard in convolutional neural networks for computer vision. However, it is less common in transformer architectures, where layer normalization (normalizing across features within a single sample rather than across the batch) is preferred. The choice between batch normalization and layer normalization depends on your architecture and whether batch statistics are meaningful (they are not for variable-length sequences or very small batch sizes).

For technical leaders evaluating model architectures, batch normalization is a training optimization detail that affects training speed and stability. It does not change what the model can learn, only how efficiently it learns.

## Sources

1. Ioffe, S. and Szegedy, C. (2015). "Batch Normalization: Accelerating Deep Network Training by Reducing Internal Covariate Shift." *Proceedings of the 32nd International Conference on Machine Learning (ICML 2015).*, Original paper introducing batch normalization; demonstrated 14× faster training on ImageNet classification. [https://arxiv.org/abs/1502.03167](https://arxiv.org/abs/1502.03167)
2. Ba, J.L., Kiros, J.R., and Hinton, G.E. (2016). "Layer Normalization." *arXiv:1607.06450.*, Introduced layer normalization as the alternative that became standard in transformer models, normalizing across features rather than batch dimension. [https://arxiv.org/abs/1607.06450](https://arxiv.org/abs/1607.06450)
