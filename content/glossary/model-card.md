---
title: "Model Card"
description: "What a model card is, why standardized ML model documentation matters, and what information a model card should contain."
date: 2026-03-28
categories: [Glossary]
tags: [model-card, documentation, transparency, governance, responsible-ai, compliance]
related:
  - glossary/responsible-ai
  - glossary/model-registry
  - glossary/mlops
  - patterns/ai-governance
  - patterns/ai-audit-trail
last_updated: 2026-05-30
---

A model card is a standardized document that accompanies a machine learning model, describing its intended use, performance characteristics, limitations, ethical considerations, and evaluation results. Introduced by Mitchell et al. at Google in 2019, model cards provide a consistent format for communicating essential information about a model to developers, users, auditors, and regulators.

## Why Model Cards Matter

Without standardized documentation, critical information about a model lives in scattered notebooks, Slack messages, and the memories of the people who built it. When those people leave or the model is used by a different team, context is lost. Model cards formalize this information in a format that travels with the model artifact.

Regulatory frameworks are making model documentation mandatory. The EU AI Act requires technical documentation for high-risk AI systems that covers the model's capabilities, limitations, and intended use. Model cards provide a practical format for meeting these requirements.

## Standard Sections

**Model details** - Model name, version, type, architecture, framework, training date, and the team or organization responsible for the model.

**Intended use** - The specific tasks and domains the model is designed for. Equally important: the use cases the model is explicitly not designed for and should not be applied to.

**Training data** - Description of the training dataset including size, source, collection methodology, time period, and any known biases or limitations. Enough detail for a reviewer to assess whether the training data is appropriate for the intended use.

**Evaluation data** - The datasets used for evaluation, how they differ from training data, and why they were chosen.

**Performance metrics** - Quantitative evaluation results on the evaluation datasets. Metrics broken down by relevant subgroups (demographics, geographies, use case categories) to surface performance disparities.

**Limitations and biases** - Known limitations, failure modes, and biases. Conditions under which the model is expected to perform poorly. Populations or scenarios that are underrepresented in training data.

**Ethical considerations** - Potential risks of the model's use, sensitive use cases, and any mitigations in place.

## Maintaining Model Cards

A model card is not a one-time document. It must be updated when the model is retrained, when new limitations are discovered, when evaluation results change, or when the intended use evolves. Integrate model card updates into the model deployment pipeline so that a model cannot be promoted to production without a current, reviewed model card.

## Sources

- Mitchell, M., et al. (2019). Model cards for model reporting. *FAccT 2019*. (Introduced the model card concept; the foundational paper defining the format and rationale for standardized model documentation.)
- Gebru, T., et al. (2021). Datasheets for datasets. *Communications of the ACM, 64*(12), 86–92. (Companion to model cards; datasheet standard for training data documentation, the two standards are used together.)
- Hutchinson, B., et al. (2022). Evaluation gaps in machine learning practice. *FAccT 2022*. (Analysis of evaluation documentation gaps; motivates why model cards need performance breakdowns by subgroup.)
