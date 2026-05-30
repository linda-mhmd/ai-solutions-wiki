---
title: "DBSCAN"
description: "Density-Based Spatial Clustering of Applications with Noise, a clustering algorithm that discovers arbitrary-shape clusters and identifies outliers."
date: 2026-03-28
categories: [Glossary]
tags: [DBSCAN, clustering, density-based, anomaly-detection, unsupervised-learning]
related:
  - glossary/clustering
  - glossary/k-means
  - glossary/hierarchical-clustering
  - glossary/anomaly-detection
  - glossary/dimensionality-reduction
last_updated: 2026-05-30
---

DBSCAN (Density-Based Spatial Clustering of Applications with Noise) is an unsupervised clustering algorithm that groups together points that are densely packed and marks points in low-density regions as outliers. Unlike K-Means, it does not require specifying the number of clusters in advance and can discover clusters of arbitrary shape.

## How It Works

DBSCAN uses two parameters: **epsilon (eps)** - the maximum distance between two points for them to be considered neighbors, and **min_samples** - the minimum number of points required to form a dense region.

The algorithm classifies each point into one of three types:

**Core points** have at least min_samples neighbors within eps distance. These form the backbone of clusters. **Border points** are within eps distance of a core point but have fewer than min_samples neighbors themselves. They belong to a cluster but do not expand it. **Noise points** are neither core nor border points. They are not assigned to any cluster and are treated as outliers.

A cluster is formed by connecting core points that are within eps distance of each other (density-reachable). Border points are assigned to the cluster of their nearest core point. The algorithm visits each point once, expanding clusters from core points through their reachable neighbors.

## Parameter Selection

**Epsilon** controls the neighborhood radius. Too small, and most points become noise. Too large, and distinct clusters merge. The k-distance plot (plotting the distance to each point's k-th nearest neighbor, sorted) helps identify a good epsilon - look for the elbow in the curve.

**min_samples** is typically set to at least the dimensionality of the data plus one. Higher values produce more conservative clusters with more noise points. For 2D data, min_samples of 4-5 is a common starting point.

## Strengths and Limitations

DBSCAN discovers clusters of any shape (rings, spirals, irregular blobs) that K-Means cannot handle. It automatically determines the number of clusters, identifies outliers naturally, and is robust to noise. It has a single effective parameter to tune (eps, since min_samples is usually fixed).

The main limitation is handling datasets with varying density. Clusters of different densities require different epsilon values, and DBSCAN uses a single global value. HDBSCAN (Hierarchical DBSCAN) addresses this by building a hierarchy of density levels. DBSCAN also struggles with very high-dimensional data due to the curse of dimensionality making distance calculations less meaningful.

## When to Use It

Use DBSCAN when you expect non-convex cluster shapes, do not know the number of clusters, or need to identify outliers as part of clustering. It works well for geographic data, image segmentation, and anomaly detection. For clusters of varying density, prefer HDBSCAN. For well-separated spherical clusters where K is known, K-Means is faster and simpler.

## Sources

- Ester, M., Kriegel, H.P., Sander, J., & Xu, X. (1996). A density-based algorithm for discovering clusters in large spatial databases with noise. *KDD 1996*. (DBSCAN original paper.)
- Campello, R.J.G.B., Moulavi, D., & Sander, J. (2013). Density-based clustering based on hierarchical density estimates. *PAKDD 2013*. (HDBSCAN; hierarchical extension addressing varying density.)
