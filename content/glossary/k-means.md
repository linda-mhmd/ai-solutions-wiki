---
title: "K-Means Clustering"
description: "What K-means clustering is, how the algorithm works, and practical guidance for applying it to enterprise data."
date: 2026-03-28
categories: [Glossary]
tags: [k-means, clustering, unsupervised-learning, segmentation, machine-learning]
related:
  - glossary/clustering
  - glossary/unsupervised-learning
  - glossary/dimensionality-reduction
last_updated: 2026-05-30
---

K-means is the most widely used clustering algorithm. It partitions data into K clusters by iteratively assigning each data point to the nearest cluster center (centroid) and then updating each centroid to be the mean of its assigned points. The algorithm converges when assignments stabilize.

## How It Works

1. **Initialize** K centroids randomly (or using K-means++ for smarter initialization).
2. **Assign** each data point to the nearest centroid based on Euclidean distance.
3. **Update** each centroid to the mean of all points assigned to it.
4. **Repeat** steps 2-3 until centroids no longer move significantly.

The algorithm minimizes the within-cluster sum of squared distances. It typically converges in 10-50 iterations and is computationally efficient even on large datasets.

## Choosing K

Selecting the right number of clusters is the most important and most difficult decision:

**Elbow method** - plot the within-cluster sum of squares for K=1 to K=20 and look for the "elbow" where adding more clusters yields diminishing returns.

**Silhouette score** - measures how similar each point is to its own cluster versus the nearest other cluster. Higher scores indicate better-defined clusters.

**Domain knowledge** - often the most practical approach. If you are segmenting customers for marketing campaigns, the number of segments is constrained by how many distinct campaigns you can execute.

## Limitations

K-means assumes clusters are spherical and roughly equal in size. It struggles with elongated, irregularly shaped, or overlapping clusters. It is sensitive to initialization (K-means++ mitigates this) and to outliers (which can pull centroids away from true cluster centers). Features must be normalized to prevent high-magnitude features from dominating distance calculations.

## Practical Applications

K-means is used for customer segmentation (grouping users by behavior), image compression (reducing color palettes), document clustering (grouping similar text), and as a preprocessing step for more complex analyses. For datasets where K-means assumptions hold, it is fast, simple, and effective. When clusters are non-spherical or vary significantly in density, consider DBSCAN or Gaussian Mixture Models instead.

## Sources

- Lloyd, S.P. (1982). Least squares quantization in PCM. *IEEE Transactions on Information Theory, 28*(2), 129–137. (K-means algorithm; original publication predating the 1982 journal article.)
- Arthur, D., & Vassilvitskii, S. (2007). K-means++: The advantages of careful seeding. *ACM SODA 2007*. (K-means++ initialization; reduces sensitivity to random starting points.)
