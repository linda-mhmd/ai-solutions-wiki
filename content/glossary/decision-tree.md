---
title: "Decision Tree"
description: "What decision trees are, how they make predictions through hierarchical rules, and their role as building blocks for ensemble methods."
date: 2026-03-28
categories: [Glossary]
tags: [decision-tree, machine-learning, classification, regression, interpretability]
related:
  - glossary/random-forest
  - glossary/xgboost
  - glossary/ensemble-methods
last_updated: 2026-05-30
---

A decision tree is a model that makes predictions by learning a hierarchy of if-then rules from training data. Starting from the root, each internal node tests a feature condition (e.g., "age > 30"), each branch represents the outcome of that test, and each leaf node contains a prediction. Decision trees are valued for their interpretability and serve as the foundation for random forests and gradient-boosted tree ensembles.

## How It Works

The algorithm builds the tree by selecting the feature and threshold at each node that best separates the data according to some criterion: Gini impurity or entropy for classification, mean squared error for regression. The process repeats recursively, creating branches until a stopping condition is met (maximum depth, minimum samples per leaf, or no further improvement).

At prediction time, a new data point traverses the tree from root to leaf, following the branch at each node that matches its feature values. The leaf provides the prediction.

## Why It Matters

**Interpretability** is the primary strength. A decision tree produces human-readable rules that can be inspected, validated, and explained to stakeholders. In regulated industries (finance, healthcare), the ability to explain exactly why a model made a particular decision is often a compliance requirement.

**No preprocessing required** - decision trees handle numeric and categorical features, missing values, and non-linear relationships without feature scaling or encoding.

**Feature selection** - the features used near the root of the tree are the most important for prediction, providing an intuitive feature ranking.

## Limitations

Individual decision trees tend to overfit. They are highly sensitive to small changes in training data (a phenomenon called high variance). A small change in the dataset can produce a very different tree. This instability is why decision trees are rarely used alone in practice.

## Practical Guidance

Use individual decision trees when interpretability is the primary requirement and accuracy is secondary. For prediction accuracy, use decision trees as building blocks within ensemble methods: random forests (bagging many trees) or gradient-boosted trees (XGBoost, LightGBM). These ensembles retain many of the decision tree's advantages (handling mixed data, no preprocessing, feature importance) while achieving much higher accuracy and stability.

## Sources

- Quinlan, J.R. (1986). Induction of decision trees. *Machine Learning, 1*(1), 81–106. (ID3 algorithm; foundational decision tree induction method.)
- Quinlan, J.R. (1993). *C4.5: Programs for Machine Learning.* Morgan Kaufmann. (C4.5; introduced continuous features, pruning, and missing value handling.)
- Breiman, L., Friedman, J., Stone, C.J., & Olshen, R.A. (1984). *Classification and Regression Trees.* Wadsworth. (CART algorithm; Gini impurity criterion.)
