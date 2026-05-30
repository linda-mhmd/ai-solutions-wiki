---
title: "PCA - Principal Component Analysis"
description: "What PCA is, how it identifies principal components, and when to use it for dimensionality reduction in ML pipelines."
date: 2026-03-28
categories: [Glossary]
tags: [PCA, dimensionality-reduction, feature-engineering, statistics, machine-learning]
related:
  - glossary/dimensionality-reduction
  - glossary/unsupervised-learning
  - glossary/clustering
last_updated: 2026-05-30
---

Principal Component Analysis (PCA) is a linear dimensionality reduction technique that transforms data into a new coordinate system where the axes (principal components) are ordered by the amount of variance they capture. The first principal component captures the most variance, the second captures the next most (orthogonal to the first), and so on. By keeping only the top-K components, you reduce dimensionality while retaining most of the data's information.

## How It Works

PCA computes the eigenvectors of the data's covariance matrix. Each eigenvector defines a principal component direction, and its corresponding eigenvalue indicates how much variance that component explains. The data is projected onto the top-K eigenvectors to produce the reduced representation.

In practice, PCA is implemented via singular value decomposition (SVD), which is numerically stable and efficient. Standardizing features (zero mean, unit variance) before PCA is essential - otherwise, high-magnitude features dominate the principal components regardless of their informational value.

## When to Use PCA

**Reducing feature count** - when you have hundreds or thousands of features but many are correlated. PCA identifies the underlying independent factors.

**Visualization** - reducing to 2-3 components enables plotting and visual inspection of data structure.

**Preprocessing** - reducing dimensions before training a downstream model can improve training speed and reduce overfitting, particularly when samples are limited relative to features.

**Noise filtering** - components with small eigenvalues often capture noise rather than signal. Discarding them can improve model robustness.

## Limitations

PCA captures only linear relationships. If the meaningful structure in your data is non-linear, PCA will miss it (consider autoencoders or kernel PCA instead). PCA components are linear combinations of all original features, making them harder to interpret than individual features. The explained variance ratio for each component indicates how much information is retained but not what that information represents.

## Practical Guidance

Examine the cumulative explained variance to choose the number of components - retaining 90-95% of variance is a common threshold. Always standardize features first. Use PCA as a quick first step for dimensionality reduction; if results are insufficient, move to non-linear methods. For very large datasets, randomized PCA implementations (available in scikit-learn) provide significant speedup with minimal accuracy loss.

## Sources

- Pearson, K. (1901). On lines and planes of closest fit to systems of points in space. *Philosophical Magazine, 2*(11), 559–572. (Original PCA formulation.)
- Hotelling, H. (1933). Analysis of a complex of statistical variables into principal components. *Journal of Educational Psychology, 24*(6), 417–441. (Independent modern formulation of PCA.)
- Jolliffe, I.T. (2002). *Principal Component Analysis*, 2nd ed. Springer. (Standard reference textbook.)
