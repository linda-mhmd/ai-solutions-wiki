---
title: "t-SNE"
description: "Non-linear dimensionality reduction technique for visualizing high-dimensional data in two or three dimensions."
date: 2026-03-28
categories: [Glossary]
tags: [t-SNE, dimensionality-reduction, visualization, unsupervised-learning, machine-learning]
related:
  - glossary/umap
  - glossary/pca
  - glossary/dimensionality-reduction
  - glossary/embeddings
  - glossary/clustering
last_updated: 2026-05-30
---

t-SNE (t-distributed Stochastic Neighbor Embedding) is a non-linear dimensionality reduction technique designed specifically for visualizing high-dimensional data in two or three dimensions. It preserves local structure - points that are close in the original high-dimensional space remain close in the visualization - making it excellent at revealing clusters and patterns that linear methods like PCA cannot capture.

## How It Works

t-SNE operates in two stages. First, it converts the high-dimensional distances between points into conditional probabilities that represent similarities. Points that are close together get high probability, while distant points get near-zero probability. A Gaussian distribution centered on each point defines these probabilities in the original space.

Second, it constructs a similar probability distribution in the low-dimensional space using a Student's t-distribution (hence the "t" in t-SNE). The algorithm then minimizes the difference between the two distributions using gradient descent, measured by the Kullback-Leibler divergence. The t-distribution's heavier tails in the low-dimensional space prevent the crowding problem - the tendency for moderate-distance points to collapse together.

## Key Parameters

**Perplexity** (typically 5-50) controls the balance between preserving local and global structure. It roughly corresponds to the number of effective nearest neighbors. Low perplexity emphasizes tight local clusters; high perplexity shows more global organization. Different perplexity values can produce very different visualizations of the same data.

**Learning rate** (typically 10-1000) affects convergence. Too low and the visualization may get stuck in a poor local minimum. Too high and points may oscillate without settling.

**Number of iterations** should be sufficient for convergence (typically 1000+). Early stopping produces misleading results.

## Important Caveats

t-SNE visualizations require careful interpretation. Cluster sizes in the plot do not reflect true cluster sizes - t-SNE expands dense clusters and contracts sparse ones. Distances between clusters are not meaningful - two clusters that appear far apart may or may not be far apart in the original space. Different random seeds and perplexity values produce different layouts, so results should be verified across multiple runs.

t-SNE is a visualization tool, not a general-purpose dimensionality reduction technique. It should not be used for feature extraction or as a preprocessing step for downstream models because it does not preserve global structure and cannot transform new points without re-running the entire algorithm.

## Strengths and Limitations

t-SNE excels at revealing cluster structure in high-dimensional data and is the standard for visualizing embeddings, single-cell genomics data, and feature representations from neural networks.

The main limitations are computational cost (O(n^2) for exact, O(n log n) for Barnes-Hut approximation), non-deterministic results, inability to handle new data points, and the interpretive pitfalls described above. For faster computation and better preservation of global structure, consider UMAP as an alternative.

## When to Use It

Use t-SNE for exploratory visualization of high-dimensional data when you want to understand cluster structure. It is particularly effective for word embeddings, image feature spaces, and biological datasets. Always run it multiple times with different parameters and random seeds to verify that observed patterns are robust.

## Sources

- van der Maaten, L., & Hinton, G. (2008). Visualizing data using t-SNE. *JMLR, 9*, 2579–2605. (Original t-SNE paper.)
- van der Maaten, L. (2014). Accelerating t-SNE using tree-based algorithms. *JMLR, 15*(1), 3221–3245. (Barnes-Hut t-SNE; O(n log n) approximation making t-SNE practical at scale.)
- Wattenberg, M., Viégas, F., & Johnson, I. (2016). How to use t-SNE effectively. *Distill*. (Visual guide to perplexity, initialization, and interpretive pitfalls.)
