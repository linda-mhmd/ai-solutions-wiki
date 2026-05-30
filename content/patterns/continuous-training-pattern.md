---
title: "Continuous Training Pattern"
description: "Automated model retraining with promotion gates: scheduling strategies, data validation, evaluation pipelines, and safe production rollout."
date: 2026-03-28
categories: [Patterns]
tags: [continuous-training, retraining, automation, mlops, promotion-gates, production]
related:
  - patterns/self-healing-model
  - patterns/model-versioning
  - patterns/policy-as-code-ml
  - patterns/ml-feature-platform
last_updated: 2026-05-30
---

Models trained once on a static dataset become stale as the world changes. Customer behavior shifts, product catalogs update, and seasonal patterns emerge. Continuous training automates the retraining cycle so that models stay current without requiring an engineer to manually trigger each training run, evaluate results, and promote the new version.

## Trigger Strategies

**Scheduled retraining** - Train on a fixed cadence (daily, weekly, monthly) regardless of whether drift has been detected. Simple to implement and predictable in cost. Appropriate when data distribution changes gradually and the retraining cost is low.

**Drift-triggered retraining** - Monitor data drift or performance metrics and retrain only when degradation is detected. More cost-efficient than scheduled retraining but requires a robust monitoring system. Use this when retraining is expensive or data changes are infrequent and unpredictable.

**Data-volume triggered** - Retrain when a threshold of new labeled data is available. Appropriate for systems where label acquisition is the bottleneck (human-in-the-loop systems, crowdsourced labeling).

## Pipeline Stages

**Data validation** - Before training begins, validate the new training data. Check for schema violations, unexpected null rates, distribution anomalies, and minimum sample sizes. A data validation failure aborts the training run before compute resources are consumed.

**Training** - Execute the training job with the same hyperparameters and architecture as the previous successful run. Use deterministic seeds where possible for reproducibility. Log all training metadata: data snapshot ID, hyperparameters, hardware configuration, and training duration.

**Evaluation** - Evaluate the newly trained model against a held-out test set and against the currently deployed model. Compare on accuracy, fairness metrics, latency, and model size. Record all evaluation metrics as structured data for audit and comparison.

**Promotion gates** - A set of automated checks that determine whether the new model proceeds to production. Gates include: accuracy exceeds minimum threshold, no fairness metric regression, latency within SLA, and all governance policies pass. If any gate fails, the new model is rejected and the current production model remains deployed.

**Deployment** - If all gates pass, deploy the new model using the organization's standard deployment strategy (canary, blue-green, shadow). Monitor the new model closely during the rollout period and roll back automatically if production metrics degrade.

## Data Windowing

Decide how much historical data to include in each training run. A sliding window (e.g., the last 90 days) keeps the model focused on recent patterns. An expanding window (all data since inception) preserves long-term patterns. The right choice depends on whether your domain changes rapidly or has stable long-term trends.

## Safeguards

Set a maximum retraining frequency to prevent runaway costs. Implement a cooldown period after each training run. Never deploy a model that scores below the current production baseline, even if it passes absolute thresholds. Alert the team when consecutive retraining runs fail to improve on the current model, as this may indicate a fundamental data or modeling problem.
