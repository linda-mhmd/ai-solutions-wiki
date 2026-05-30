---
title: "Semi-Supervised Learning"
description: "Machine learning approach that leverages both labeled and unlabeled data through label propagation, self-training, and consistency regularization."
date: 2026-03-28
categories: [Glossary]
tags: [semi-supervised-learning, label-propagation, self-training, machine-learning]
related:
  - glossary/supervised-learning
  - glossary/unsupervised-learning
  - glossary/active-learning
  - glossary/transfer-learning
  - glossary/few-shot-learning
last_updated: 2026-05-30
---

Semi-supervised learning uses a small amount of labeled data combined with a large amount of unlabeled data to train models. This approach addresses one of the most common practical constraints in machine learning: collecting data is easy, but labeling it is expensive and time-consuming. Medical imaging, natural language processing, and industrial inspection all face this imbalance.

## Why It Works

Semi-supervised learning relies on assumptions about data structure that connect unlabeled points to labels:

**Smoothness assumption** - Points close together in feature space are likely to share the same label. Unlabeled data reveals the shape of the data manifold and helps the model generalize better from limited labels.

**Cluster assumption** - Data naturally forms clusters, and points in the same cluster are likely to have the same label. Unlabeled data helps identify these clusters.

**Manifold assumption** - High-dimensional data lies on a lower-dimensional manifold. Unlabeled data helps learn this manifold structure, improving decision boundaries.

## Key Methods

**Self-training** is the simplest approach. Train a model on labeled data, use it to predict labels for unlabeled data, add the most confident predictions to the training set, and repeat. The risk is confirmation bias - the model reinforces its own errors. Using high confidence thresholds and careful iteration limits mitigates this.

**Label propagation** builds a graph where nodes are data points (labeled and unlabeled) and edge weights reflect similarity. Labels spread from labeled nodes through the graph based on similarity. Points receive the label of the labeled points they are most connected to. It works well when the cluster and smoothness assumptions hold.

**Consistency regularization** enforces that the model should produce similar predictions for perturbed versions of the same input. If adding noise, cropping, or augmenting an input should not change its class, the model can learn from unlabeled data by penalizing inconsistent predictions across augmentations.

**MixMatch and FixMatch** combine pseudo-labeling with consistency regularization and data augmentation. FixMatch applies weak augmentation to generate pseudo-labels and strong augmentation as training inputs, achieving state-of-the-art results with very few labels.

**Contrastive learning** learns representations by pulling augmented views of the same example together while pushing different examples apart, all without labels. The learned representations are then fine-tuned with the small labeled set.

## Practical Considerations

Semi-supervised learning provides the most benefit when labeled data is very scarce (tens to hundreds of examples) and unlabeled data is abundant. As labeled data increases, the marginal benefit of unlabeled data decreases. The quality and representativeness of labeled data matters more than quantity - labels should cover all classes and edge cases.

Performance can degrade if the unlabeled data distribution differs from the labeled data, or if the underlying assumptions (smoothness, cluster) are violated. Always compare against a supervised baseline trained on only the labeled data to verify that unlabeled data is actually helping.

## When to Use It

Use semi-supervised learning when labeling is expensive but unlabeled data is plentiful. Start with self-training for simplicity, try label propagation when the data has clear cluster structure, and use consistency regularization methods for image and text tasks. Combine with active learning to intelligently select which examples to label next.

## Sources

- Chapelle, O., Schölkopf, B., & Zien, A. (Eds.). (2006). *Semi-Supervised Learning.* MIT Press. (Standard reference text; free online at mitpress.mit.edu.)
- Sohn, K., et al. (2020). FixMatch: Simplifying semi-supervised learning with consistency and confidence. *NeurIPS 2020*. (FixMatch; state-of-the-art semi-supervised classification with few labels.)
- Berthelot, D., et al. (2019). MixMatch: A holistic approach to semi-supervised learning. *NeurIPS 2019*. (MixMatch; combined pseudo-labeling and consistency regularization.)
- Zhu, X., & Ghahramani, Z. (2002). Learning from labeled and unlabeled data with label propagation. *Carnegie Mellon University Technical Report CMU-CALD-02-107*.
