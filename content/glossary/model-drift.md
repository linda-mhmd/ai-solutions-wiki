---
title: "Model Drift"
description: "What model drift is, how model performance degrades over time in production, and the monitoring and response strategies to address it."
date: 2026-03-28
categories: [Glossary]
tags: [model-drift, drift, model-monitoring, mlops, production-ml, degradation]
related:
  - glossary/data-drift
  - glossary/concept-drift
  - glossary/continuous-training
  - patterns/observability-ai
  - guides/drift-detection-guide
last_updated: 2026-05-30
---

Model drift is the degradation of a machine learning model's predictive performance over time after deployment to production. A model that achieved strong evaluation metrics at training time produces increasingly inaccurate predictions as the gap widens between the data it was trained on and the data it encounters in production.

## Causes

Model drift is typically caused by data drift (the input distribution changes), concept drift (the relationship between inputs and outputs changes), or both occurring simultaneously. Additional causes include upstream data pipeline changes that alter feature values, changes in how users interact with the system, and environmental shifts such as economic cycles, seasonal patterns, or competitive dynamics.

## How to Detect It

**Direct performance monitoring** - The most reliable detection method is comparing model predictions against ground truth labels. Track accuracy, precision, recall, and domain-specific metrics over time. A sustained decline signals model drift. The limitation is that ground truth labels are often delayed or expensive to obtain.

**Proxy metrics** - When ground truth is not available in real time, monitor proxy metrics that correlate with model quality. For recommendation systems, track click-through rates or conversion rates. For fraud detection, track manual review rates or customer complaint rates. For classification, track prediction confidence distributions.

**Input monitoring** - Track the distribution of input features over time. Statistical divergence from the training distribution may indicate that model drift is occurring or imminent, even before performance metrics show degradation.

**Prediction distribution monitoring** - Track the distribution of model outputs. If the model suddenly starts predicting one class far more frequently than historical baselines, something has changed.

## Response Strategies

**Retraining** - The primary response to model drift is retraining on more recent data that reflects current conditions. Continuous training pipelines automate this process.

**Model fallback** - Maintain a simpler, more robust fallback model that can serve predictions when the primary model is degraded. Rules-based systems or simpler statistical models often degrade more gracefully than complex models.

**Alerting and investigation** - Not all drift requires automated retraining. Some drift signals indicate data quality issues, pipeline bugs, or business changes that should be investigated and addressed at the source rather than masked by retraining.

Organizations should establish clear ownership and response procedures for model drift alerts. A drift detection system without a clear human or automated response process generates alerts that are ignored until a business impact forces action.

## Sources

- Gama, J., et al. (2014). A survey on concept drift adaptation. *ACM Computing Surveys, 46*(4), 1–37. (Comprehensive survey of drift types and detection methods; standard reference for model drift literature.)
- Baena-García, M., et al. (2006). Early drift detection method. *ECML/PKDD International Workshop on Knowledge Discovery from Data Streams*. (EDDM; statistical method for detecting drift from error rates; one of the foundational drift detection algorithms.)
- Breck, E., et al. (2017). The ML test score: A rubric for ML production readiness. *IEEE Big Data 2017*. (Production ML quality criteria including model monitoring and drift response procedures.)
