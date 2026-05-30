---
title: "Overfitting"
description: "What overfitting is, how to detect it, and practical strategies to prevent models from memorizing training data instead of learning patterns."
date: 2026-03-28
categories: [Glossary]
tags: [overfitting, regularization, training, machine-learning, generalization]
related:
  - glossary/underfitting
  - glossary/bias-variance-tradeoff
  - glossary/cross-validation
  - glossary/dropout
last_updated: 2026-05-30
---

Overfitting occurs when a machine learning model learns the training data too well - memorizing noise, outliers, and idiosyncrasies rather than learning the underlying patterns that generalize to new data. An overfit model performs excellently on training data but poorly on unseen data, which is the data that actually matters.

## How to Detect Overfitting

The classic signal is a growing gap between training performance and validation performance. Training loss continues to decrease while validation loss plateaus or increases. Training accuracy reaches 99% while validation accuracy stalls at 80%. This divergence means the model is memorizing rather than generalizing.

Always monitor both training and validation metrics during development. A model that looks perfect on training data but fails in production was overfit.

## Why It Happens

**Insufficient data** - small datasets provide too few examples for the model to distinguish signal from noise. The model memorizes the specific examples rather than learning general rules.

**Excessive model complexity** - a model with too many parameters relative to the amount of training data can fit arbitrary patterns, including noise.

**Training too long** - given enough epochs, a sufficiently complex model will eventually memorize the training set.

**Noisy or mislabeled data** - the model tries to learn patterns that explain mislabeled examples, learning noise as if it were signal.

## Prevention Strategies

**More data** is the most effective remedy. More diverse examples make it harder for the model to memorize and easier to learn genuine patterns.

**Regularization** adds constraints that penalize complexity. Dropout randomly disables neurons during training. Weight decay penalizes large weight values. Both prevent the model from relying on fragile, complex patterns.

**Early stopping** monitors validation performance during training and stops when it begins degrading, even if training performance is still improving.

**Data augmentation** creates synthetic variations of training examples (rotations, crops, paraphrases), effectively increasing dataset size and diversity.

**Cross-validation** evaluates the model across multiple train/test splits, providing a more robust estimate of generalization performance than a single split.

## Practical Impact

For technical leaders, overfitting is the primary reason why impressive demo performance does not always translate to production performance. Insist on validation metrics (not training metrics) when evaluating model readiness. Reserve a held-out test set that is never used during development for final evaluation.

## Sources

- Geman, S., Bienenstock, E., & Doursat, R. (1992). Neural networks and the bias/variance dilemma. *Neural Computation, 4*(1), 1–58. (Formal bias-variance decomposition underpinning overfitting theory.)
- Srivastava, N., Hinton, G., Krizhevsky, A., Sutskever, I., & Salakhutdinov, R. (2014). Dropout: A simple way to prevent neural networks from overfitting. *JMLR, 15*(1), 1929–1958. (Dropout; most widely used neural network regularization against overfitting.)
- Tikhonov, A.N. (1963). Solution of incorrectly formulated problems and the regularization method. *Soviet Mathematics Doklady, 4*, 1035–1038. (L2 regularization / weight decay; foundational regularization method.)
