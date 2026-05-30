---
title: "Model Risk Management Framework"
description: "A comprehensive framework based on SR 11-7 guidance for managing model risk across development, validation, and governance, applicable to both traditional ML and LLMs in regulated industries."
date: 2026-03-28
categories: [Frameworks]
tags: [model-risk, governance, financial-services, regulation, sr-11-7]
related:
  - guides/ai-governance-implementation
  - frameworks/nist-ai-rmf
  - guides/ai-regulatory-compliance-checklist
last_updated: 2026-05-30
---

Model risk management is the discipline of identifying, measuring, and controlling the risk that arises from using quantitative models to make business decisions. In regulated industries, particularly financial services, model risk management is not optional. It is a supervisory requirement with specific expectations for how organizations develop, validate, and govern their models.

## Origins and History

The formal regulatory framework for model risk management originates from SR 11-7, "Guidance on Model Risk Management," issued jointly by the Board of Governors of the Federal Reserve System and the Office of the Comptroller of the Currency (OCC) on April 4, 2011 [1]. This guidance was prompted by the 2008 financial crisis, which revealed that financial institutions had placed excessive reliance on models (particularly for mortgage-backed securities pricing and risk measurement) without adequate validation or governance. SR 11-7 defined model risk as the potential for adverse consequences from decisions based on incorrect or misused model outputs. It established the three pillars that remain the foundation of model risk management today: model development, model validation, and model governance [1]. As machine learning models entered financial services in the mid-2010s, regulators clarified that SR 11-7 applies regardless of modeling technique. The OCC's 2021 bulletin on the use of AI in banking reinforced that ML and AI models are subject to the same risk management expectations [2]. The European Central Bank's 2023 guide on AI further extended these principles in the European regulatory context [3].

## The Three Pillars

**Model development** requires that models have a clear purpose, sound theoretical basis, and rigorous testing before deployment. Documentation must cover the model's intended use, methodology, assumptions, limitations, and known failure modes. For LLMs, this means documenting prompt design, fine-tuning data, evaluation benchmarks, and the specific tasks the model is approved to perform.

**Model validation** is performed by a team independent of the model developers. Validators assess conceptual soundness, verify implementation correctness, and run outcome analysis comparing model predictions against actual results. For LLMs, validation includes red-teaming, bias testing, and evaluation on held-out datasets that reflect production conditions.

**Model governance** establishes the organizational structure for oversight. This includes a model inventory that catalogs every model in use, a tiering system that assigns risk levels based on materiality, and a change control process that governs model updates.

## Key Practices

**Model inventory** is a centralized registry of all models, including their purpose, owner, risk tier, validation status, and next review date. Organizations that lack a complete inventory cannot manage model risk because they do not know what models they are running.

**Challenger models** are alternative models maintained to benchmark the primary model's performance. If a challenger consistently outperforms the production model, it signals that the production model may need replacement.

**Ongoing monitoring** tracks model performance in production through metrics appropriate to the model's purpose. Drift detection identifies when input data distributions shift away from training data. Performance degradation triggers re-validation.

**Materiality assessment** determines how much risk management rigor each model requires. A model that influences a billion dollars in lending decisions requires more validation than a model that recommends internal training content. Tiering ensures that governance resources are allocated proportionally to risk.

## Application to LLMs

LLMs challenge traditional model risk frameworks in several ways. They are general-purpose rather than task-specific, making it harder to define scope. Their behavior changes with prompt wording rather than retraining. They may produce plausible but incorrect outputs (hallucinations) that are difficult to detect without domain expertise. Organizations adapting SR 11-7 for LLMs typically add requirements for prompt management, output validation layers, and human-in-the-loop review for high-stakes decisions.

## Sources

1. Board of Governors of the Federal Reserve System and Office of the Comptroller of the Currency. "Supervisory Guidance on Model Risk Management" (SR 11-7 / OCC 2011-12), April 4, 2011.
2. Office of the Comptroller of the Currency. "Comptroller's Handbook: Model Risk Management," August 2021. Updated guidance addressing AI/ML models.
3. European Central Bank. "Guide on artificial intelligence and machine learning for credit institutions," 2023.
