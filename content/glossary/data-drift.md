---
title: "Data Drift"
description: "What data drift is, how input data distributions change over time, and methods for detecting and responding to drift in production ML systems."
date: 2026-03-28
categories: [Glossary]
tags: [data-drift, drift, model-monitoring, mlops, production-ml, distribution-shift]
related:
  - glossary/concept-drift
  - glossary/model-drift
  - glossary/training-serving-skew
  - patterns/observability-ai
  - guides/drift-detection-guide
last_updated: 2026-05-30
---

Data drift occurs when the statistical distribution of input data in production diverges from the distribution the model was trained on. The model's learned decision boundaries were optimized for the training distribution. When the input distribution shifts, the model may be operating in regions of the feature space where it has little training signal, leading to degraded predictions even though the underlying relationship between features and target has not changed.

## Examples

A credit scoring model trained on data from a stable economy encounters applications during a recession. Income distributions shift downward, employment tenure shortens, and debt ratios increase. The model receives inputs that are statistically different from its training data, even though the fundamental rules of creditworthiness have not changed.

An image classification model trained on professional product photos is deployed on user-submitted images taken with phone cameras in variable lighting. The pixel distributions differ significantly from training data.

## How It Differs from Concept Drift

Data drift is about the inputs changing. Concept drift is about the relationship between inputs and outputs changing. They can occur independently or together. Data drift without concept drift means the model encounters unfamiliar inputs but the correct decision rules are unchanged. Concept drift without data drift means the inputs look the same but the correct answers have changed.

## Detection Methods

**Statistical tests** - Compare the distribution of each input feature between a reference dataset (training data or a recent baseline) and current production data. Common tests include the Kolmogorov-Smirnov test for continuous features, chi-squared tests for categorical features, and the Population Stability Index (PSI).

**Distance metrics** - Compute distribution distance measures such as Jensen-Shannon divergence, Wasserstein distance, or KL divergence between reference and current feature distributions.

**Multivariate detection** - Individual feature monitoring can miss drift that only manifests in feature interactions. Multivariate methods like Maximum Mean Discrepancy (MMD) or domain classifier approaches detect joint distribution shifts.

## Response Strategies

When data drift is detected, evaluate whether model performance has actually degraded. Not all drift is harmful; the model may generalize well to the new distribution. If performance has degraded, retrain on data that includes the new distribution. If drift is temporary or seasonal, consider maintaining multiple model versions or using a windowed training approach. Investigate the root cause of the drift to determine whether it represents a genuine change in the operating environment or a data quality issue that should be fixed upstream.

## Sources

- Quiñonero-Candela, J., et al. (Eds.). (2009). *Dataset Shift in Machine Learning.* MIT Press. (Comprehensive treatment of covariate, prior probability, and concept shifts.)
- Sugiyama, M., & Kawanabe, M. (2012). *Machine Learning in Non-Stationary Environments.* MIT Press.
- Gretton, A., et al. (2012). A kernel two-sample test. *JMLR, 13*, 723–773. (Maximum Mean Discrepancy; standard multivariate drift detection test.)
- Klaise, J., et al. (2020). Alibi Detect: Algorithms for outlier, adversarial and drift detection. *JMLR, 23*(1). (Open-source drift detection library with reference implementations.)
