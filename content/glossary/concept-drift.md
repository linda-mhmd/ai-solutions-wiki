---
title: "Concept Drift"
description: "What concept drift is, how the relationship between inputs and outputs changes over time, and strategies for detecting and responding to it in production ML systems."
date: 2026-03-28
categories: [Glossary]
tags: [concept-drift, drift, model-monitoring, mlops, production-ml, model-degradation]
related:
  - glossary/data-drift
  - glossary/model-drift
  - patterns/continuous-training-pattern
  - guides/drift-detection-guide
  - patterns/observability-ai
last_updated: 2026-05-30
---

Concept drift occurs when the statistical relationship between input features and the target variable changes over time. The model learned a mapping from inputs to outputs during training, but that mapping no longer reflects reality. The inputs may look the same, but what they mean in terms of the correct prediction has shifted.

## How It Differs from Data Drift

Data drift is a change in the distribution of input features. Concept drift is a change in the relationship between those features and the target. A fraud detection model might see the same distribution of transaction amounts (no data drift), but the patterns that indicate fraud have changed because attackers adapted their techniques (concept drift). The inputs look normal; the correct labels have changed.

## Types of Concept Drift

**Sudden drift** - The relationship changes abruptly. A regulatory change that redefines eligibility criteria causes immediate concept drift in an approval model.

**Gradual drift** - The old concept and new concept coexist for a period, with the new concept slowly becoming dominant. Consumer preferences shifting over months is gradual drift.

**Recurring drift** - The concept oscillates between known states. Seasonal patterns in purchasing behavior represent recurring drift where the relationship between features and buying decisions changes predictably.

**Incremental drift** - The concept changes through many small, continuous shifts that are individually imperceptible but accumulate over time.

## Detection Methods

Concept drift is harder to detect than data drift because it requires access to ground truth labels, which are often delayed or expensive to obtain. Common detection approaches include monitoring model performance metrics over time (accuracy, precision, recall declining indicates potential concept drift), statistical tests on prediction residuals, and drift detection algorithms like DDM (Drift Detection Method), ADWIN, and Page-Hinkley that monitor error rates for statistically significant changes.

When ground truth labels are not available in real time, proxy metrics such as prediction confidence distributions, customer complaint rates, or downstream business metrics can serve as early warning indicators.

## Response Strategies

When concept drift is detected, the model must be updated to reflect the new relationship. Retraining on recent data that reflects the current concept is the most common response. Windowed retraining, where only the most recent N months of data are used, naturally adapts to gradual drift. For sudden drift, the model may need to be retrained immediately on post-drift data, accepting a temporary period of reduced performance while sufficient new labeled data accumulates.

## Sources

- Widmer, G., & Kubat, M. (1996). Learning in the presence of concept drift and hidden contexts. *Machine Learning, 23*(1), 69–101. (Early formal treatment of concept drift types.)
- Gama, J., et al. (2014). A survey on concept drift adaptation. *ACM Computing Surveys, 46*(4). (Comprehensive survey of detection methods and adaptation strategies.)
- Bifet, A., & Gavalda, R. (2007). Learning from time-changing data with adaptive windowing. *SIAM International Conference on Data Mining*. (ADWIN algorithm for adaptive windowing.)
- Gama, J., et al. (2004). Learning with drift detection. *Brazilian Symposium on Artificial Intelligence*. (DDM, Drift Detection Method.)
