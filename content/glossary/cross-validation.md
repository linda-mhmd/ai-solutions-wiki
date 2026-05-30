---
title: "Cross-Validation"
description: "What cross-validation is, how it provides robust model performance estimates, and when to use different cross-validation strategies."
date: 2026-03-28
categories: [Glossary]
tags: [cross-validation, model-evaluation, machine-learning, training, overfitting]
related:
  - glossary/overfitting
  - glossary/bias-variance-tradeoff
  - glossary/hyperparameter-tuning
  - glossary/supervised-learning
last_updated: 2026-05-30
---

Cross-validation is a model evaluation technique that tests how well a model generalizes to unseen data by systematically training and evaluating on different subsets of the available data. Instead of a single train/test split (which may be unrepresentative), cross-validation uses multiple splits to produce a more reliable performance estimate.

## How It Works

**K-fold cross-validation** divides the dataset into K equal parts (folds). The model is trained K times, each time using K-1 folds for training and the remaining fold for validation. The final performance metric is the average across all K evaluations. K=5 or K=10 are standard choices.

**Stratified K-fold** ensures each fold has the same proportion of classes as the full dataset. Essential for imbalanced classification problems where random splits might produce folds with no examples of the minority class.

**Leave-one-out** uses each individual sample as a single-element test set, training on all remaining samples. Computationally expensive but provides the lowest-bias estimate. Practical only for small datasets.

**Time-series split** respects temporal ordering: each fold uses earlier data for training and later data for testing. Standard time-based cross-validation prevents data leakage from future information.

## Why It Matters

A single train/test split can be misleading. If the split happens to put easy examples in the test set, performance looks better than reality. If hard examples land in the test set, performance looks worse. Cross-validation averages over multiple splits, giving a more honest and stable estimate of how the model will perform on new data.

The variance across folds is also informative. High variance in cross-validation scores indicates the model is sensitive to the particular training data, suggesting high variance (overfitting risk) or inconsistencies in the dataset.

## Practical Guidance

Use K-fold cross-validation during model development and hyperparameter tuning. Reserve a completely separate holdout test set for final evaluation - this test set should never be used during development. For time-series data, always use temporal splits to avoid the subtle but devastating data leakage that random splits introduce. For large datasets where K-fold is computationally prohibitive, a single stratified split with a sufficiently large test set may be adequate.

## Sources

- Stone, M. (1974). Cross-validatory choice and assessment of statistical predictions. *Journal of the Royal Statistical Society B, 36*(2), 111–147. (Original cross-validation paper.)
- Kohavi, R. (1995). A study of cross-validation and bootstrap for accuracy estimation and model selection. *IJCAI 1995*. (Systematic comparison of K-fold, LOO, and bootstrap; standard reference for K=10 choice.)
- Hastie, T., Tibshirani, R., & Friedman, J. (2009). *The Elements of Statistical Learning*, 2nd ed. Springer. Chapter 7: Model Assessment and Selection.
