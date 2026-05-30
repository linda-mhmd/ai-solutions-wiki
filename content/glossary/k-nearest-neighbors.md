---
title: "K-Nearest Neighbors (KNN)"
description: "Instance-based lazy learning algorithm that classifies data points by majority vote of their nearest neighbors, using various distance metrics."
date: 2026-03-28
categories: [Glossary]
tags: [KNN, classification, regression, instance-based-learning, machine-learning]
related:
  - glossary/clustering
  - glossary/k-means
  - glossary/dimensionality-reduction
  - glossary/support-vector-machine
  - glossary/cross-validation
last_updated: 2026-05-30
---

K-Nearest Neighbors (KNN) is a non-parametric supervised learning algorithm that makes predictions based on the K closest training examples in the feature space. For classification, it assigns the majority class among the K neighbors. For regression, it averages their values. KNN is called a lazy learner because it stores the entire training set and defers computation until prediction time.

## How It Works

At prediction time, KNN computes the distance between the new data point and every training example, selects the K nearest ones, and aggregates their labels. There is no explicit training phase - the model is the dataset itself.

**Distance metrics** determine how proximity is measured. Euclidean distance is the default for continuous features. Manhattan distance works better when features have different scales or the data lies on a grid. Minkowski distance generalizes both. For categorical features, Hamming distance counts mismatches.

**Choosing K** is the primary hyperparameter decision. Small K values (K=1 or K=3) capture fine-grained patterns but are sensitive to noise. Large K values smooth the decision boundary but may blur class distinctions. Odd values of K avoid ties in binary classification. Cross-validation is the standard approach for selecting K.

## The Curse of Dimensionality

KNN performance degrades significantly as the number of features increases. In high-dimensional spaces, all points become approximately equidistant from each other, making the concept of nearest neighbor meaningless. This is the curse of dimensionality.

Mitigation strategies include dimensionality reduction (PCA, feature selection) before applying KNN, and using distance-weighted voting where closer neighbors have more influence than distant ones.

## Feature Scaling

Because KNN relies on distance calculations, feature scaling is critical. A feature with a range of 0-1000 will dominate distance calculations over a feature with a range of 0-1. StandardScaler (zero mean, unit variance) or MinMaxScaler (0-1 range) should always be applied before using KNN.

## Strengths and Limitations

KNN makes no assumptions about the underlying data distribution, handles multi-class problems naturally, and adapts to any decision boundary shape. It is easy to understand and implement.

The main limitations are prediction speed and memory. Computing distances to all training points for every prediction is O(n*d) where n is the number of training points and d is the number of features. KD-trees and ball trees reduce this for low-dimensional data, but offer little improvement in high dimensions. The entire training set must be stored in memory.

## When to Use It

KNN works well for small-to-medium datasets with low-to-moderate dimensionality, recommendation systems, and as a baseline classifier. It is particularly useful for problems where the decision boundary is highly irregular. For large datasets or high-dimensional data, consider tree-based methods or neural networks instead.

## Sources

- Cover, T., & Hart, P. (1967). Nearest neighbor pattern classification. *IEEE Transactions on Information Theory, 13*(1), 21–27. (Foundational KNN paper; proved that the nearest neighbor error rate is asymptotically bounded by twice the Bayes error rate.)
- Bellman, R. (1957). *Dynamic Programming*. Princeton University Press. (Coined the "curse of dimensionality"; directly explains why KNN degrades in high-dimensional spaces.)
- Muja, M., & Lowe, D. G. (2014). Scalable nearest neighbor algorithms for high dimensional data. *IEEE Transactions on Pattern Analysis and Machine Intelligence, 36*(11), 2227–2240. (FLANN; approximate nearest neighbor algorithms that make KNN practical in higher dimensions.)
