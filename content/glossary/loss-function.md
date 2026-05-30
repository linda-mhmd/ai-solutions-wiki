---
title: "Loss Function"
description: "What loss functions are, how they guide model training, and which loss functions apply to common AI tasks."
date: 2026-03-28
categories: [Glossary]
tags: [loss-function, optimization, training, deep-learning, machine-learning]
related:
  - glossary/gradient-descent
  - glossary/backpropagation
  - glossary/neural-network
  - glossary/supervised-learning
last_updated: 2026-05-30
---

A loss function (also called a cost function or objective function) is a mathematical measure of how wrong a model's predictions are compared to the true values. During training, the optimization algorithm minimizes the loss function by adjusting model weights. The choice of loss function defines what "correct" means for your model.

## Common Loss Functions

**Cross-entropy loss** is used for classification tasks. It measures the difference between the predicted probability distribution and the true label. Binary cross-entropy handles two-class problems; categorical cross-entropy handles multi-class problems. This is the standard loss for text classification, image classification, and language modeling (next-token prediction).

**Mean squared error (MSE)** measures the average squared difference between predicted and true continuous values. Used for regression tasks like price prediction, demand forecasting, and sensor value estimation.

**Mean absolute error (MAE)** measures the average absolute difference. Less sensitive to outliers than MSE, making it preferable when your data contains extreme values you do not want to dominate training.

**Contrastive loss** and **triplet loss** are used in embedding learning, training models to produce similar embeddings for similar items and distant embeddings for dissimilar items. This is how embedding models for RAG systems are trained.

## Why It Matters

The loss function is what the model optimizes, so it must align with your actual business objective. A model that minimizes MSE treats all errors equally - a 10% error on a $100 item and a $10,000 item contribute differently to business impact but equally to MSE. Custom loss functions or class-weighted losses can align training with business priorities.

## Practical Considerations

For most standard tasks, use the established loss function: cross-entropy for classification, MSE or MAE for regression. When standard losses produce models that are technically accurate but misaligned with business needs, consider custom losses that weight different types of errors according to their business impact. For example, in fraud detection, the cost of missing a fraudulent transaction far exceeds the cost of a false positive, which justifies asymmetric loss weighting.

Monitor both the loss value and business metrics during training. A decreasing loss that does not improve business metrics indicates a misalignment between the loss function and the actual objective.

## Sources

- Goodfellow, I., Bengio, Y., & Courville, A. (2016). *Deep Learning.* MIT Press. Chapter 6: Deep Feedforward Networks, cross-entropy and MSE loss derivations. Free online at deeplearningbook.org.
- Vapnik, V. (1998). *Statistical Learning Theory.* Wiley. (Theoretical foundation relating loss functions to generalization risk.)
- Schroff, F., Kalenichenko, D., & Philbin, J. (2015). FaceNet: A unified embedding for face recognition and clustering. *CVPR 2015*. (Triplet loss for metric learning.)
