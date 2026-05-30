---
title: "Model Interpretability Guide"
description: "Practical guide to SHAP, LIME, feature importance, partial dependence plots, and other techniques for understanding ML model behavior."
date: 2026-03-28
categories: [Guides]
tags: [interpretability, explainability, SHAP, LIME, feature-importance, partial-dependence]
related:
  - glossary/shap-lime
  - glossary/gradient-boosting
  - glossary/random-forest
  - glossary/neural-network
  - guides/model-evaluation-guide
last_updated: 2026-05-30
---

Model interpretability is the ability to understand why a model makes the predictions it does. It is essential for debugging models, building stakeholder trust, meeting regulatory requirements, and catching biases before deployment. This guide covers practical techniques from global model understanding to individual prediction explanations.

## Why Interpretability Matters

A model that performs well on test metrics can still fail in production for reasons that only interpretability reveals. It may rely on spurious correlations (predicting hospital readmission based on hospital ID rather than patient health), encode protected characteristics indirectly (using zip code as a proxy for race), or break silently when data distributions shift. Interpretability is not optional - it is how you verify that your model works for the right reasons.

In regulated industries (finance, healthcare, insurance), explainability is often legally required. The EU AI Act and GDPR's right to explanation mandate that automated decisions be explainable to affected individuals.

## Global Interpretability - Understanding the Overall Model

Global methods reveal which features the model considers important and how they influence predictions across the entire dataset.

**Permutation importance** measures how much model performance degrades when a feature's values are randomly shuffled. Features that cause large performance drops when shuffled are important. This method works with any model, uses the actual evaluation metric, and is simple to implement. The main drawback is that correlated features split importance between them.

```python
from sklearn.inspection import permutation_importance
result = permutation_importance(model, X_test, y_test, n_repeats=10, scoring='f1')
```

**SHAP global importance** averages the absolute SHAP values for each feature across all predictions. This provides a more reliable importance ranking than permutation importance because it accounts for feature interactions and is not affected by feature correlation in the same way. The beeswarm plot shows both importance (y-axis ordering) and effect direction (color = feature value, x-axis = SHAP value).

**Tree-based feature importance** is built into Random Forest and gradient boosting models. Impurity-based importance (default in scikit-learn) measures how much each feature reduces impurity across all trees. It is fast but biased toward high-cardinality features. Gain-based importance (default in XGBoost/LightGBM) measures the total gain from splits on each feature and is more reliable.

## Local Interpretability - Explaining Individual Predictions

Local methods explain why the model made a specific prediction for a specific input.

**SHAP waterfall plots** show how each feature pushes a single prediction from the base value (average prediction) to the final value. Each bar represents one feature's contribution, with red indicating a push toward the positive class and blue toward the negative class.

```python
import shap
explainer = shap.TreeExplainer(model)
shap_values = explainer(X_test)
shap.waterfall_plot(shap_values[0])
```

**LIME** generates a local linear explanation by perturbing the input and fitting an interpretable model to the perturbed predictions. It is useful for a quick explanation and works with any model type, including neural networks and pipelines that SHAP cannot handle directly.

**Counterfactual explanations** answer the question: what is the smallest change to the input that would change the prediction? For a denied loan application, a counterfactual might say "if your income were $5,000 higher and your debt $2,000 lower, the application would be approved." These are particularly useful for providing actionable feedback to affected individuals.

## Feature Effects - How Features Influence Predictions

**Partial Dependence Plots (PDP)** show the average effect of a feature on predictions, marginalizing over all other features. They reveal whether a relationship is linear, monotonic, or has thresholds. Two-dimensional PDPs show interaction effects between pairs of features.

```python
from sklearn.inspection import PartialDependenceDisplay
PartialDependenceDisplay.from_estimator(model, X_train, features=['age', 'income'])
```

**Individual Conditional Expectation (ICE) plots** show the effect of a feature for each individual prediction rather than the average. They reveal heterogeneous effects - cases where a feature affects different subgroups differently. When ICE lines cross, it indicates a feature interaction.

**SHAP dependence plots** combine the benefits of PDP and ICE. They plot the feature value (x-axis) against its SHAP value (y-axis) for every prediction, with color indicating the value of an interacting feature. These reveal non-linear effects, interactions, and outlier behavior simultaneously.

## Interpreting Different Model Types

**Linear models** are inherently interpretable. Coefficients directly show each feature's direction and magnitude of effect (after standardizing features). Log-odds ratios in logistic regression have direct probabilistic interpretation.

**Tree-based models** provide built-in importance and can be visualized at the individual tree level (useful for shallow trees). For deep ensembles, SHAP is the standard approach.

**Neural networks** require specialized techniques. Gradient-based methods (saliency maps, Grad-CAM for images, integrated gradients) show which input features the network is sensitive to. Attention weights in transformers provide partial interpretability but should not be treated as reliable explanations without validation.

## Practical Workflow

1. Start with global feature importance (permutation or SHAP) to understand what the model considers important. Verify this aligns with domain knowledge.
2. Use partial dependence plots for the top features to understand how they affect predictions. Check for unexpected non-linearities or threshold effects.
3. For individual predictions that need explanation (customer-facing, audit, debugging), use SHAP waterfall plots or LIME.
4. Check for bias by examining SHAP values across protected subgroups. If the model behaves differently for different demographics, investigate whether this reflects legitimate patterns or encoded bias.
5. Use interpretability during model development, not just after. Feature importance and dependence plots during training help catch data leakage, identify missing features, and guide feature engineering.

## Common Pitfalls

**Trusting importance rankings blindly** - Correlated features dilute each other's importance in all methods. If you remove a feature that shares information with another, the remaining feature's importance will increase. Always consider feature groups, not just individual features.

**Confusing correlation with causation** - SHAP shows that a feature is associated with the prediction, not that it causes the outcome. A model that uses "number of ambulances dispatched" to predict accident severity is detecting a correlation, not a causal mechanism.

**Over-interpreting local explanations** - LIME and SHAP explain the model's behavior, not the real-world phenomenon. If the model is wrong, the explanation faithfully describes why it made the wrong prediction. Verify that explanations make domain sense.
