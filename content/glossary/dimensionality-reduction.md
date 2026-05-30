---
title: "Dimensionality Reduction"
description: "What dimensionality reduction is, common techniques including PCA and t-SNE, and when to reduce feature dimensions in your ML pipeline."
date: 2026-03-28
categories: [Glossary]
tags: [dimensionality-reduction, PCA, t-SNE, feature-engineering, machine-learning]
related:
  - glossary/pca
  - glossary/embeddings
  - glossary/clustering
  - glossary/autoencoder
last_updated: 2026-05-30
---

Dimensionality reduction transforms high-dimensional data into a lower-dimensional representation while preserving the most important structure and relationships. It addresses the curse of dimensionality (model performance degrades as feature count grows relative to sample count) and enables visualization of complex datasets.

## Why It Matters

High-dimensional data creates practical problems: models overfit more easily, training takes longer, storage costs increase, and distances between points become less meaningful (all points appear equidistant in very high dimensions). Dimensionality reduction addresses these issues by compressing data to its essential structure.

## Common Techniques

**PCA (Principal Component Analysis)** finds the directions of maximum variance in the data and projects onto the top-K directions. Linear, fast, and widely used for preprocessing. Effective when the data lies near a linear subspace.

**t-SNE** maps high-dimensional data to 2D or 3D for visualization, preserving local neighborhood structure. Excellent for visualizing clusters in embeddings or feature spaces. Not suitable for preprocessing (it is non-parametric and cannot transform new data points).

**UMAP** is a faster alternative to t-SNE that better preserves global structure. Preferred for visualizing large datasets and can be used as a preprocessing step.

**Autoencoders** use neural networks to learn non-linear compressed representations. More powerful than PCA for complex data but require more data and compute to train.

## Practical Applications

**Visualization** - reduce high-dimensional embeddings to 2D for human exploration. Useful for understanding cluster structure, identifying outliers, and validating model behavior.

**Preprocessing** - reduce feature dimensions before training a downstream model, especially when features outnumber samples.

**Storage and compute optimization** - lower-dimensional representations require less storage and enable faster similarity search (critical for vector databases).

**Noise reduction** - by retaining only the principal components, dimensionality reduction can filter out noise present in low-variance dimensions.

## Practical Guidance

Start with PCA when you need a simple, fast, interpretable reduction. Use t-SNE or UMAP for visualization. Use autoencoders when PCA's linear assumption is too limiting and you have enough data to train a neural network. Always evaluate whether dimensionality reduction improves or degrades downstream task performance - it is not always beneficial.

## Sources

- Pearson, K. (1901). On lines and planes of closest fit to systems of points in space. *Philosophical Magazine, 2*(11), 559–572. (Original PCA formulation.)
- van der Maaten, L., & Hinton, G. (2008). Visualizing data using t-SNE. *JMLR, 9*, 2579–2605. (t-SNE algorithm; standard reference for high-dimensional visualization.)
- McInnes, L., Healy, J., & Melville, J. (2018). UMAP: Uniform manifold approximation and projection for dimension reduction. *arXiv:1802.03426*. (UMAP; faster and more scalable alternative to t-SNE.)
- Bellman, R. (1961). *Adaptive Control Processes: A Guided Tour.* Princeton University Press. (Curse of dimensionality first formulated here.)
