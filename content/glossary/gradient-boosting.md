---
title: "Gradient Boosting"
description: "Ensemble learning method that builds models sequentially to correct previous errors, including XGBoost, LightGBM, and CatBoost implementations."
date: 2026-03-28
categories: [Glossary]
tags: [gradient-boosting, ensemble-methods, XGBoost, LightGBM, CatBoost, machine-learning]
related:
  - glossary/xgboost
  - glossary/random-forest
  - glossary/decision-tree
  - glossary/ensemble-methods
  - glossary/hyperparameter-tuning
last_updated: 2026-05-30
---

Gradient boosting is an ensemble learning technique that combines many weak learners (typically shallow decision trees) sequentially, where each new tree corrects the errors of the combined ensemble so far. It is consistently among the top-performing algorithms for structured/tabular data and dominates machine learning competitions.

## How It Works

The algorithm starts with a simple prediction (often the mean of the target). Each subsequent tree is trained to predict the residual errors (technically, the negative gradient of the loss function) of the current ensemble. The new tree's predictions are scaled by a learning rate and added to the running total. This process repeats for a specified number of iterations.

The key insight is that by fitting each tree to the gradient of the loss function, the method can optimize any differentiable loss - not just squared error. This makes gradient boosting flexible for regression, classification, ranking, and custom objectives.

**Learning rate** controls how much each tree contributes. Smaller values require more trees but generally produce better results. **Tree depth** controls the complexity of individual trees - shallow trees (depth 3-8) work best because the ensemble builds complexity through combination. **Number of trees** must be tuned alongside the learning rate, typically using early stopping on a validation set.

## Major Implementations

**XGBoost** introduced regularization terms in the objective function, efficient handling of sparse data, and parallel tree construction. It popularized gradient boosting through Kaggle competitions and remains widely used.

**LightGBM** from Microsoft uses histogram-based splitting and leaf-wise tree growth instead of level-wise. This makes it significantly faster than XGBoost on large datasets while achieving comparable or better accuracy. It also handles categorical features natively.

**CatBoost** from Yandex introduces ordered boosting to reduce prediction shift (a subtle form of target leakage in standard gradient boosting) and handles categorical features through target-based statistics with built-in overfitting prevention. It often requires less hyperparameter tuning than XGBoost or LightGBM.

## Key Hyperparameters

Beyond learning rate, depth, and number of trees, important parameters include: **subsample** (fraction of training data used per tree), **colsample_bytree** (fraction of features considered per tree), **min_child_weight** or **min_data_in_leaf** (minimum samples to create a leaf), and **regularization terms** (L1/L2 penalties on leaf weights). Bayesian optimization or random search with early stopping is the recommended tuning approach.

## Strengths and Limitations

Gradient boosting handles mixed feature types, missing values, non-linear relationships, and feature interactions automatically. It requires less feature engineering than linear models and achieves state-of-the-art results on tabular data.

Training is inherently sequential (each tree depends on previous ones), though individual tree construction can be parallelized. Gradient boosting is prone to overfitting without proper regularization and early stopping. Models are less interpretable than linear models, though SHAP values provide good post-hoc explanations.

## When to Use It

Gradient boosting should be your default algorithm for structured/tabular data problems. Start with LightGBM for speed, try CatBoost if you have many categorical features, and use XGBoost when you need maximum ecosystem support. Reserve deep learning for unstructured data (text, images, audio) where gradient boosting does not compete.

## Sources

1. Friedman, J.H. (2001). "Greedy Function Approximation: A Gradient Boosting Machine." *The Annals of Statistics* 29(5), pp. 1189–1232., Original gradient boosting paper establishing the general framework; named the algorithm and proved its connection to gradient descent in function space.
2. Chen, T. and Guestrin, C. (2016). "XGBoost: A Scalable Tree Boosting System." *Proceedings of the 22nd ACM SIGKDD International Conference on Knowledge Discovery and Data Mining.*, XGBoost paper; most cited implementation reference. [https://arxiv.org/abs/1603.02754](https://arxiv.org/abs/1603.02754)
3. Ke, G. et al. (2017). "LightGBM: A Highly Efficient Gradient Boosting Decision Tree." *Advances in Neural Information Processing Systems 30 (NIPS 2017).*, LightGBM paper introducing histogram-based splitting and leaf-wise growth for large-scale datasets. [https://proceedings.neurips.cc/paper/2017/hash/6449f44a102fde848669bdd9eb6b76fa-Abstract.html](https://proceedings.neurips.cc/paper/2017/hash/6449f44a102fde848669bdd9eb6b76fa-Abstract.html)
4. Prokhorenkova, L. et al. (2018). "CatBoost: Unbiased Boosting with Categorical Features." *NeurIPS 2018.*, CatBoost paper introducing ordered boosting and native categorical feature handling. [https://arxiv.org/abs/1706.09516](https://arxiv.org/abs/1706.09516)
