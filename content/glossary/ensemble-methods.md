---
title: "Ensemble Methods"
description: "What ensemble methods are, how combining models improves predictions, and when to use bagging, boosting, and stacking."
date: 2026-03-28
categories: [Glossary]
tags: [ensemble-methods, random-forest, boosting, bagging, machine-learning]
related:
  - glossary/random-forest
  - glossary/xgboost
  - glossary/decision-tree
  - glossary/bias-variance-tradeoff
last_updated: 2026-05-30
---

Ensemble methods combine predictions from multiple models to produce a result that is more accurate and robust than any single model. The core insight is that individual models make different errors, and combining their predictions cancels out individual mistakes. Ensembles are consistently among the top-performing approaches for tabular data.

## How They Work

**Bagging (Bootstrap Aggregating)** trains multiple models on different random subsets of the training data (sampled with replacement). Predictions are averaged (regression) or voted on (classification). Bagging reduces variance without increasing bias. Random Forest is the most well-known bagging method.

**Boosting** trains models sequentially, with each new model focusing on the examples that previous models got wrong. This reduces bias by iteratively correcting errors. Gradient boosting (XGBoost, LightGBM, CatBoost) is the dominant boosting approach and frequently wins structured data competitions.

**Stacking** trains a meta-model to combine predictions from multiple diverse base models. Each base model makes predictions on held-out data, and the meta-model learns which base models to trust for which types of inputs.

## Why It Matters

For tabular/structured data (customer records, financial data, sensor data), ensemble methods - particularly gradient-boosted trees - often outperform deep learning. They handle mixed feature types, missing values, and feature interactions naturally, with less data and compute than neural networks require.

For technical leaders, this means deep learning is not always the answer. Many enterprise prediction tasks (churn, fraud, demand forecasting) are better served by well-tuned gradient boosting than by neural networks. Reserve deep learning for unstructured data (images, text, audio) where it genuinely excels.

## Practical Guidance

Start with gradient-boosted trees (XGBoost or LightGBM) for any structured data problem. They are fast to train, handle missing data gracefully, provide feature importance rankings, and achieve strong performance with minimal hyperparameter tuning. Move to neural networks only if the data is unstructured, the dataset is very large, or gradient boosting proves insufficient for your accuracy requirements.

## Sources

- Breiman, L. (1996). Bagging predictors. *Machine Learning, 24*(2), 123–140. (Bagging / Bootstrap Aggregating original paper.)
- Schapire, R.E. (1990). The strength of weak learnability. *Machine Learning, 5*(2), 197–227. (Theoretical foundation of boosting.)
- Freund, Y., & Schapire, R.E. (1997). A decision-theoretic generalization of on-line learning and an application to boosting. *Journal of Computer and System Sciences, 55*(1), 119–139. (AdaBoost algorithm.)
- Breiman, L. (2001). Random forests. *Machine Learning, 45*(1), 5–32. (Random Forest; most influential bagging ensemble.)
- Friedman, J.H. (2001). Greedy function approximation: A gradient boosting machine. *The Annals of Statistics, 29*(5), 1189–1232. (Gradient Boosting Machines; foundation for XGBoost/LightGBM.)
