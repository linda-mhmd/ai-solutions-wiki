---
title: "Clustering"
description: "What clustering is, major clustering algorithms, and practical applications for grouping data without labels."
date: 2026-03-28
categories: [Glossary]
tags: [clustering, unsupervised-learning, k-means, segmentation, machine-learning]
related:
  - glossary/unsupervised-learning
  - glossary/k-means
  - glossary/dimensionality-reduction
last_updated: 2026-05-30
---

Clustering is an unsupervised learning technique that groups data points into clusters based on similarity, without predefined labels. Points within a cluster are more similar to each other than to points in other clusters. Clustering discovers natural structure in data, enabling segmentation, anomaly detection, and exploratory analysis.

## Common Algorithms

**K-means** partitions data into K clusters by iteratively assigning points to the nearest centroid and updating centroids. Fast and scalable, but assumes spherical clusters of similar size and requires specifying K in advance.

**DBSCAN** (Density-Based Spatial Clustering) groups points that are closely packed together and marks isolated points as outliers. Does not require specifying the number of clusters and can discover arbitrarily shaped clusters. Sensitive to the distance threshold and minimum points parameters.

**Hierarchical clustering** builds a tree of nested clusters by iteratively merging (agglomerative) or splitting (divisive) clusters. Produces a dendrogram that shows cluster relationships at all levels. Useful for understanding hierarchical structure but does not scale well to large datasets.

**Gaussian Mixture Models (GMM)** model data as a mixture of Gaussian distributions, assigning each point a probability of belonging to each cluster. More flexible than K-means (supports elliptical clusters) and provides soft cluster assignments.

## Enterprise Applications

**Customer segmentation** groups customers by behavior for targeted marketing, product recommendations, and service differentiation.

**Document clustering** organizes large document collections by topic for discovery, deduplication, and routing.

**Anomaly detection** identifies data points that do not belong to any cluster, flagging potential fraud, defects, or security incidents.

**Data preprocessing** creates meaningful groupings that serve as features for supervised models or reduce the complexity of large datasets.

## Practical Guidance

Choosing K (the number of clusters) is the hardest part. Use the elbow method, silhouette scores, or domain knowledge to select an appropriate number. Always validate clusters with domain experts - statistically distinct clusters are not always meaningful. Normalize features before clustering to prevent high-magnitude features from dominating distance calculations.

## Sources

- Lloyd, S.P. (1982). Least squares quantization in PCM. *IEEE Transactions on Information Theory, 28*(2), 129–137. (K-means algorithm; original publication.)
- MacQueen, J.B. (1967). Some methods for classification and analysis of multivariate observations. *5th Berkeley Symposium on Mathematical Statistics and Probability*, 281–297. (K-means early formulation.)
- Ester, M., et al. (1996). A density-based algorithm for discovering clusters in large spatial databases with noise. *KDD 1996*. (DBSCAN original paper.)
- Rousseeuw, P.J. (1987). Silhouettes: A graphical aid to the interpretation and validation of cluster analysis. *Journal of Computational and Applied Mathematics, 20*, 53–65. (Silhouette coefficient for cluster validation.)
- Dempster, A.P., Laird, N.M., & Rubin, D.B. (1977). Maximum likelihood from incomplete data via the EM algorithm. *Journal of the Royal Statistical Society B, 39*(1), 1–38. (EM algorithm underlying Gaussian Mixture Models.)
