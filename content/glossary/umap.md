---
title: "UMAP"
description: "Uniform Manifold Approximation and Projection for faster dimensionality reduction that preserves both local and global structure."
date: 2026-03-28
categories: [Glossary]
tags: [UMAP, dimensionality-reduction, visualization, manifold-learning, machine-learning]
related:
  - glossary/t-sne
  - glossary/pca
  - glossary/dimensionality-reduction
  - glossary/embeddings
  - glossary/clustering
last_updated: 2026-05-30
---

UMAP (Uniform Manifold Approximation and Projection) is a non-linear dimensionality reduction technique that produces visualizations similar to t-SNE but with significant practical advantages: faster computation, better preservation of global structure, and the ability to transform new data points. It has become the preferred method for high-dimensional data visualization and is increasingly used for general-purpose dimensionality reduction.

## How It Works

UMAP is grounded in manifold theory and topological data analysis, though the practical intuition is straightforward. It constructs a weighted graph representing the high-dimensional data's topology by connecting each point to its nearest neighbors with edge weights based on distance. It then optimizes a low-dimensional layout that preserves this graph structure as faithfully as possible.

The algorithm finds a balance between attracting connected points (preserving local structure) and repelling unconnected points (preserving global structure). This balance is controlled by the optimization process and produces layouts where both clusters and their relative positions are meaningful.

## Key Parameters

**n_neighbors** (typically 5-50) controls the size of the local neighborhood. Small values preserve fine-grained local structure at the expense of global patterns. Large values capture broader structure but may miss small clusters. This is analogous to t-SNE's perplexity.

**min_dist** (typically 0.0-0.99) controls how tightly points are packed in the output. Small values produce tight clusters with clear separation. Larger values distribute points more evenly and preserve broader topological structure.

**n_components** sets the output dimensionality. While 2 and 3 are common for visualization, UMAP works well with higher output dimensions (10-50) for general-purpose dimensionality reduction as a preprocessing step.

**metric** specifies the distance function. UMAP supports Euclidean, cosine, Manhattan, and many others, including custom distance functions. Cosine distance is standard for text embeddings and high-dimensional sparse data.

## Advantages Over t-SNE

UMAP is significantly faster than t-SNE, scaling roughly O(n) compared to t-SNE's O(n log n) with the Barnes-Hut approximation. It handles millions of points where t-SNE becomes impractical. UMAP better preserves global structure - the relative positions of clusters in the output are more meaningful. It supports a transform method that maps new data points into an existing embedding without re-running the algorithm, making it usable in production pipelines.

## Limitations

Like t-SNE, UMAP is stochastic and different runs produce different layouts. Cluster sizes and inter-cluster distances are more meaningful than in t-SNE but still should not be interpreted as exact. The theoretical foundations, while rigorous, make it harder to explain exactly why certain structures appear. UMAP can also create artificial structure in random data, so observed patterns should be validated.

## When to Use It

Use UMAP as the default choice for high-dimensional data visualization, replacing t-SNE in most scenarios. It is the standard for exploring embeddings, single-cell RNA sequencing, and any large-scale visualization task. Use it for general-purpose dimensionality reduction when PCA's linear assumption is too restrictive. Combine UMAP with clustering algorithms (HDBSCAN is a natural pairing) for exploratory data analysis.

## Sources

- McInnes, L., Healy, J., & Melville, J. (2018). UMAP: Uniform manifold approximation and projection for dimension reduction. *arXiv:1802.03426*. (Original UMAP paper; theoretical foundations in Riemannian geometry and algebraic topology.)
- McInnes, L., Healy, J., & Astels, S. (2017). HDBSCAN: Hierarchical density based clustering. *Journal of Open Source Software, 2*(11). (Companion clustering algorithm; UMAP + HDBSCAN is the standard pipeline for exploratory analysis.)
- Becht, E., et al. (2019). Dimensionality reduction for visualizing single-cell data using UMAP. *Nature Biotechnology, 37*, 38–44. (Demonstrated UMAP superiority over t-SNE for single-cell RNA sequencing; drove widespread adoption.)
