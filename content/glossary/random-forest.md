---
title: "Random Forest"
description: "What random forests are, how they combine decision trees for robust predictions, and when they are the right model choice."
date: 2026-03-28
categories: [Glossary]
tags: [random-forest, ensemble-methods, decision-tree, classification, regression]
related:
  - glossary/ensemble-methods
  - glossary/decision-tree
  - glossary/xgboost
  - glossary/bias-variance-tradeoff
---

A random forest is an ensemble method that combines many decision trees, each trained on a random subset of the data and features, and aggregates their predictions through majority voting (classification) or averaging (regression). The randomness in data sampling and feature selection makes individual trees diverse, and their combination produces robust, accurate predictions.

## How It Works

Each tree in the forest is built using a bootstrap sample (random sample with replacement) of the training data. At each split point in the tree, only a random subset of features is considered. This double randomness ensures that individual trees are different from each other.

For a classification prediction, each tree votes for a class, and the forest returns the majority vote. For regression, trees produce individual estimates, and the forest returns the average.

## Why It Matters

Random forests are one of the most practical and reliable models for structured data. Key advantages:

**Robust out of the box** - random forests work well with minimal hyperparameter tuning. Default settings produce competitive results for most problems.

**Feature importance** - random forests naturally rank features by their contribution to predictions, providing interpretability that supports feature engineering and data quality improvement.

**Handles diverse data** - categorical features, missing values, non-linear relationships, and feature interactions are handled naturally without extensive preprocessing.

**Resistant to overfitting** - adding more trees improves performance without overfitting (unlike boosting, which can overfit with too many rounds). This makes random forests safe to use without careful early stopping.

## Limitations

Random forests generally cannot match the accuracy of gradient-boosted trees (XGBoost, LightGBM) on the same data. They also do not extrapolate well beyond the range of training data (a known limitation of all tree-based methods) and are not suitable for unstructured data like images or text.

## Practical Guidance

Use random forests as a strong baseline model for any structured data problem. They train quickly in parallel, require little preprocessing, and provide feature importance for free. If you need the best possible accuracy on structured data, move to gradient-boosted trees. If you need real-time inference with minimal latency, note that random forests require running every tree at prediction time, though this is still fast for forests of reasonable size (100-500 trees).

## Sources

1. Breiman, L. (2001). "Random Forests." *Machine Learning* 45(1), pp. 5–32., Original paper introducing random forests, defining the bagging + random feature selection combination and proving convergence. [https://link.springer.com/article/10.1023/A:1010933404324](https://link.springer.com/article/10.1023/A:1010933404324)
2. Breiman, L. (1996). "Bagging Predictors." *Machine Learning* 24(2), pp. 123–140., Introduced bootstrap aggregating (bagging), the ensemble technique that random forests extend with feature randomization.
3. Strobl, C., Boulesteix, A.-L., Zeileis, A., and Hothorn, T. (2007). "Bias in Random Forest Variable Importance Measures: Illustrations, Sources and a Solution." *BMC Bioinformatics* 8:25., Analysis of feature importance measurement in random forests; important reading for anyone using importance scores to interpret models.
