---
title: "Explainability Service"
description: "On-demand model explanations for auditors, regulators, and end users: SHAP, LIME, attention visualization, and counterfactual explanations served as a platform capability."
date: 2026-03-28
categories: [Patterns]
tags: [explainability, interpretability, shap, lime, audit, compliance, xai]
related:
  - patterns/ai-audit-trail
  - patterns/ai-governance
  - glossary/nist-ai-rmf-glossary
  - glossary/iso-42001-glossary
last_updated: 2026-05-30
---

Regulators ask why a model made a specific decision. Customers ask why their loan was denied. Internal reviewers ask which features drove a risk score. An explainability service provides on-demand explanations for individual predictions, decoupled from the model serving infrastructure so that explanation generation does not impact inference latency.

## Why a Dedicated Service

Computing explanations is expensive. SHAP values require hundreds or thousands of model evaluations per explanation. LIME fits a local surrogate model for each instance. Running these computations inline with inference requests would multiply latency by orders of magnitude. A dedicated service computes explanations asynchronously, caches results, and serves them through a separate API.

## Explanation Methods

**SHAP (SHapley Additive exPlanations)** - Assigns each feature a contribution value based on cooperative game theory. Provides consistent, theoretically grounded feature importance for individual predictions. Computationally expensive for large models; use KernelSHAP or TreeSHAP approximations.

**LIME (Local Interpretable Model-agnostic Explanations)** - Perturbs the input around the instance being explained and fits a simple linear model to the perturbation results. Produces human-readable explanations that highlight which input features most influenced the prediction. Less computationally expensive than exact SHAP but less theoretically rigorous.

**Attention visualization** - For transformer-based models, visualize attention weights to show which parts of the input the model focused on. Useful for text and image models. Attention weights are not causal explanations, but they provide useful signal for debugging and review.

**Counterfactual explanations** - Identify the smallest change to the input that would change the model's decision. "Your loan would have been approved if your debt-to-income ratio were below 0.4." Counterfactuals are the most actionable explanation type for end users.

## Service Architecture

The explainability service exposes a REST API that accepts a model identifier, input data, and desired explanation type. It loads the specified model, computes the requested explanation, and returns structured results. Explanations are cached by model version and input hash so that repeated requests for the same explanation are served instantly.

For batch audit scenarios, the service accepts a list of prediction IDs and generates explanations in bulk, writing results to a report format suitable for regulatory submission.

## Access Control

Different audiences need different explanation formats. Auditors receive full SHAP value vectors with technical detail. Customers receive simplified natural-language explanations generated from the underlying explanation data. Internal reviewers receive interactive dashboards. The service applies role-based formatting to the same underlying explanation data.

## Integration with Audit Trail

Link explanations to the audit trail by prediction ID. When an auditor queries why a specific decision was made, the audit trail provides the inputs, model version, and output, while the explainability service provides the reasoning behind the output. Together, they form a complete accountability record.
