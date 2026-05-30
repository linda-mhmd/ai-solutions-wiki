---
title: "SHAP and LIME"
description: "Post-hoc explanation methods for interpreting predictions of black-box machine learning models."
date: 2026-03-28
categories: [Glossary]
tags: [SHAP, LIME, explainability, interpretability, machine-learning]
related:
  - glossary/gradient-boosting
  - glossary/random-forest
  - glossary/neural-network
  - glossary/deep-learning
  - guides/model-interpretability-guide
last_updated: 2026-05-30
---

SHAP (SHapley Additive exPlanations) and LIME (Local Interpretable Model-agnostic Explanations) are the two most widely used methods for explaining individual predictions from black-box machine learning models. Both answer the question: why did the model make this specific prediction for this specific input?

## LIME - Local Interpretable Model-agnostic Explanations

LIME explains a single prediction by approximating the model's behavior locally with a simple, interpretable model (typically linear regression).

**How it works**: LIME generates perturbed versions of the input by randomly modifying features, gets the black-box model's predictions for these perturbed inputs, weights the perturbed samples by their proximity to the original input, and fits a linear model on this weighted dataset. The coefficients of the linear model indicate each feature's contribution to the prediction.

For tabular data, perturbations replace feature values with samples from the training distribution. For text, perturbations remove words. For images, perturbations mask superpixels. The local linear approximation is valid only near the explained instance - different inputs may have completely different explanations.

**Strengths**: Model-agnostic, intuitive explanations, works with any data type. **Weaknesses**: Explanations vary with the perturbation method and neighborhood definition, can be unstable (similar inputs may get different explanations), and the local fidelity depends on how well a linear model approximates the true decision boundary nearby.

## SHAP - SHapley Additive exPlanations

SHAP uses Shapley values from cooperative game theory to assign each feature a contribution to the prediction. The Shapley value of a feature is its average marginal contribution across all possible combinations of features.

**How it works**: For each feature, SHAP computes how much the prediction changes when that feature is included versus excluded, averaged over all possible subsets of other features. This provides a mathematically rigorous attribution that satisfies several desirable properties: the contributions sum exactly to the difference between the prediction and the average prediction, identical features get identical contributions, and features that contribute nothing get zero.

**TreeSHAP** is an optimized algorithm for tree-based models (XGBoost, LightGBM, Random Forest) that computes exact Shapley values in polynomial time instead of the exponential cost of exact computation. **KernelSHAP** is the model-agnostic version, similar in spirit to LIME but with Shapley value weighting.

## SHAP Visualizations

SHAP provides several standard visualization types:

**Waterfall plots** show how each feature pushes a single prediction from the base value (average prediction) to the final prediction. **Beeswarm plots** show the distribution of SHAP values across an entire dataset, revealing which features are most important overall and how their values affect predictions. **Dependence plots** show the relationship between a feature's value and its SHAP value, revealing non-linear effects and interactions.

## SHAP vs. LIME

SHAP has stronger theoretical foundations (unique solution satisfying the Shapley axioms) and produces more consistent explanations. LIME is faster for model-agnostic explanations and simpler to understand conceptually. In practice, SHAP with TreeSHAP is the standard for tree-based models. LIME remains useful when SHAP is too slow (large neural networks) or when a quick local explanation is sufficient.

## When to Use Them

Use SHAP for systematic model analysis, feature importance ranking, bias detection, and regulatory compliance. Use LIME for quick ad-hoc explanations and when working with non-standard model types. Both are essential tools for building trust in ML systems, debugging model behavior, and meeting explainability requirements in regulated industries.

## Sources

- Ribeiro, M.T., Singh, S., & Guestrin, C. (2016). "Why should I trust you?": Explaining the predictions of any classifier. *KDD 2016*. (LIME original paper.)
- Lundberg, S.M., & Lee, S.I. (2017). A unified approach to interpreting model predictions. *NeurIPS 2017*. (SHAP original paper; unified framework based on Shapley values.)
- Lundberg, S.M., et al. (2020). From local explanations to global understanding with explainable AI for trees. *Nature Machine Intelligence, 2*(1), 56–67. (TreeSHAP; polynomial-time exact Shapley values for tree models.)
- Shapley, L.S. (1953). A value for n-person games. *Contributions to the Theory of Games, 2*, 307–317. (Shapley values; the game theory foundation for SHAP.)
