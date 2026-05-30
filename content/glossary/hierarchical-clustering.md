---
title: "Hierarchical Clustering"
description: "Agglomerative and divisive clustering methods that produce a tree-like hierarchy of clusters visualized through dendrograms."
date: 2026-03-28
categories: [Glossary]
tags: [hierarchical-clustering, clustering, dendrogram, unsupervised-learning, machine-learning]
related:
  - glossary/clustering
  - glossary/k-means
  - glossary/dbscan
  - glossary/dimensionality-reduction
  - glossary/unsupervised-learning
last_updated: 2026-05-30
---

Hierarchical clustering is an unsupervised learning method that builds a tree-like hierarchy of clusters, either by iteratively merging smaller clusters (agglomerative) or by splitting larger ones (divisive). The result is a dendrogram - a tree diagram that shows the sequence of merges or splits and the distance at which they occur.

## Agglomerative (Bottom-Up)

Agglomerative clustering is the more common approach. It starts with each data point as its own cluster and repeatedly merges the two closest clusters until all points belong to a single cluster.

The choice of **linkage method** defines how distance between clusters is measured:

**Single linkage** uses the minimum distance between any two points in the two clusters. It can find elongated, chain-like clusters but is sensitive to noise and outliers that bridge gaps between clusters (chaining effect).

**Complete linkage** uses the maximum distance between any two points. It produces compact, roughly equal-sized clusters but can split natural clusters that have elongated shapes.

**Average linkage** uses the mean distance between all pairs of points across the two clusters. It balances the extremes of single and complete linkage.

**Ward's method** minimizes the total within-cluster variance at each merge step. It tends to produce compact, spherical clusters of similar size and is often the default choice for general-purpose clustering.

## Divisive (Top-Down)

Divisive clustering starts with all points in one cluster and recursively splits the most heterogeneous cluster. It is less commonly used because the number of possible splits grows exponentially. Implementations typically use a flat clustering algorithm (like K-Means with K=2) at each split step.

## Dendrograms

The dendrogram is the key output. The y-axis shows the distance (or dissimilarity) at which clusters merge. Cutting the dendrogram at a chosen height produces a specific number of clusters. This provides a natural way to explore different granularity levels without re-running the algorithm.

Tall vertical lines in the dendrogram indicate well-separated clusters. The optimal number of clusters corresponds to cutting where there is a large jump in merge distance.

## Strengths and Limitations

Hierarchical clustering does not require specifying the number of clusters in advance. The dendrogram provides rich information about data structure at multiple scales. It works with any distance metric and does not assume cluster shapes.

The main limitation is computational cost. Agglomerative clustering is O(n^3) in time and O(n^2) in memory for naive implementations, making it impractical for datasets larger than roughly 10,000-20,000 points. Cluster assignments are also final - once two points are merged or split, this decision cannot be reversed.

## When to Use It

Use hierarchical clustering when you want to explore cluster structure at multiple levels of granularity, when the number of clusters is unknown, or when you need the dendrogram for interpretability. It is well-suited for gene expression analysis, taxonomy construction, and document clustering on small-to-medium datasets. For larger datasets, consider K-Means or DBSCAN.

## Sources

- Ward, J. H. (1963). Hierarchical grouping to optimize an objective function. *Journal of the American Statistical Association, 58*(301), 236–244. (Ward's method; the standard linkage criterion for most hierarchical clustering applications.)
- Murtagh, F., & Legendre, P. (2014). Ward's hierarchical agglomerative clustering method: Which algorithms implement Ward's criterion? *Journal of Classification, 31*(3), 274–295. (Analysis of Ward linkage implementations; clarifies which algorithms correctly implement the criterion.)
- Müllner, D. (2011). Modern hierarchical, agglomerative clustering algorithms. *arXiv:1109.2378*. (Efficient O(n²) implementations of hierarchical clustering that make large-scale use practical.)
