---
title: "Training-Serving Skew"
description: "What training-serving skew is, how mismatches between training and serving environments degrade model performance, and strategies to prevent it."
date: 2026-03-28
categories: [Glossary]
tags: [training-serving-skew, mlops, feature-store, production-ml, data-pipeline, consistency]
related:
  - glossary/feature-store
  - glossary/mlops
  - glossary/data-drift
  - patterns/ml-feature-platform
  - patterns/real-time-feature-serving
last_updated: 2026-05-30
---

Training-serving skew is the mismatch between the data, features, or environment used during model training and what the model encounters during production inference. A model trained on features computed one way but served features computed a slightly different way will produce degraded predictions, even if the underlying model is sound. Training-serving skew is one of the most common and insidious causes of ML production failures because it produces no error messages -- the model runs and returns predictions, they are just wrong.

## Common Causes

**Feature computation inconsistency** - Feature engineering code is implemented once in Python for training (batch, offline) and reimplemented in a different language or framework for serving (real-time, online). The two implementations diverge due to differences in null handling, rounding, date parsing, or aggregation logic.

**Data leakage in training** - Training features computed using future information that would not be available at serving time. A model trained on features that include next-month's data produces optimistic training metrics but cannot access that data in production.

**Preprocessing differences** - Text normalization, image resizing, tokenization, or numerical scaling applied differently between training and serving pipelines. Even small differences in preprocessing can significantly affect model behavior.

**Stale features** - Online serving uses cached feature values that are not refreshed at the same frequency as the training data. A model trained on daily-updated features but served hourly-cached features encounters a temporal skew.

## Prevention Strategies

**Shared feature computation** - Use a feature store that computes and serves features from the same code path for both training and inference. This eliminates the most common source of skew.

**Data validation** - Compare the statistical distributions of features at training time against serving time. Flag significant divergences as potential skew indicators.

**End-to-end testing** - Send known inputs through the full serving pipeline and compare the features and predictions against the training pipeline's output for the same inputs. Differences indicate skew.

**Immutable pipelines** - Version all preprocessing and feature engineering code alongside the model. Deploy the exact code version that was used during training to the serving environment.

## Impact

Training-serving skew is particularly dangerous because standard offline model evaluation does not detect it. The model evaluates well on test data processed through the training pipeline. Performance only degrades when the model is served through the production pipeline where the skew exists. This is why production monitoring with real-world ground truth is essential for catching skew that offline evaluation misses.

## Sources

- Sculley, D., et al. (2015). Hidden technical debt in machine learning systems. *NeurIPS 2015*. (Described training-serving skew as "pipeline jungles"; seminal paper on ML production reliability.)
- Breck, E., et al. (2017). The ML test score: A rubric for ML production readiness and technical debt reduction. *IEEE Big Data 2017*. (Google's ML readiness rubric; explicitly tests training-serving consistency as a production requirement.)
- Polyzotis, N., et al. (2018). Data validation for machine learning. *SysML 2018*. (TFX data validation; automated detection of distribution skew between training and serving data.)
