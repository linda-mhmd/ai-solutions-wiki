---
title: "Dropout"
description: "What dropout is, how it prevents overfitting in neural networks, and practical guidance on when and how to apply it."
date: 2026-03-28
categories: [Glossary]
tags: [dropout, regularization, deep-learning, neural-network, overfitting]
related:
  - glossary/overfitting
  - glossary/neural-network
  - glossary/batch-normalization
  - glossary/deep-learning
last_updated: 2026-05-30
---

Dropout is a regularization technique for neural networks that randomly sets a fraction of neuron activations to zero during each training step. This prevents the network from relying too heavily on any single neuron or co-adapted feature, reducing overfitting and improving generalization to unseen data.

## How It Works

During training, each neuron is independently "dropped" (set to zero) with a specified probability, typically 0.1 to 0.5. This means the network must learn redundant representations - it cannot rely on any single neuron being present. Each training step effectively trains a different random sub-network.

During inference, all neurons are active, but their outputs are scaled by the dropout probability to maintain consistent expected values. Most modern frameworks handle this scaling automatically.

## Why It Matters

Overfitting is one of the most common failure modes in machine learning: the model memorizes training data rather than learning generalizable patterns. Dropout is a simple, effective countermeasure that is standard practice in neural network design.

Conceptually, dropout approximates training an ensemble of many different network architectures simultaneously. Ensemble methods are known to improve generalization, and dropout achieves a similar effect without the cost of training multiple separate models.

## Practical Guidance

**Dropout rate** of 0.1-0.3 is typical for transformer models and most modern architectures. Higher rates (0.5) were common in older fully-connected networks. Too high a rate degrades training performance; too low provides insufficient regularization.

**Where to apply** - dropout is typically applied after attention layers and feed-forward layers in transformers, and after hidden layers in fully-connected networks. It is not commonly applied to convolutional layers (where batch normalization serves a similar regularization role).

**Interaction with other regularization** - dropout combines with weight decay, early stopping, and data augmentation. When using batch normalization, the additional regularization from dropout may be unnecessary; experiment to determine the optimal combination for your specific model.

## When You Encounter Dropout

As a technical leader, you encounter dropout as a hyperparameter in model configuration. If a model is overfitting (high training accuracy, poor validation accuracy), increasing dropout is one of the first interventions to try. If training is slow or the model underfits, reducing dropout may help.

## Sources

1. Srivastava, N., Hinton, G., Krizhevsky, A., Sutskever, I., and Salakhutdinov, R. (2014). "Dropout: A Simple Way to Prevent Neural Networks from Overfitting." *Journal of Machine Learning Research* 15, pp. 1929–1958., Original paper introducing dropout; includes theoretical motivation (ensemble interpretation) and empirical results across vision, speech, and NLP benchmarks. [https://jmlr.org/papers/v15/srivastava14a.html](https://jmlr.org/papers/v15/srivastava14a.html)
