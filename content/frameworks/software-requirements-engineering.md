---
title: "Software Requirements Engineering for AI Systems"
description: "Elicitation, analysis, and specification techniques adapted for AI and ML projects, where requirements are probabilistic and data-dependent."
date: 2026-03-28
categories: [Frameworks]
tags: [requirements, elicitation, specification, analysis, SDLC]
related:
  - guides/requirements-engineering-ai
  - frameworks/agile-ai-delivery
  - guides/ai-product-management
last_updated: 2026-05-30
---

Requirements engineering for AI systems diverges from traditional software requirements in a fundamental way: you cannot specify exact behavior. A classification model's accuracy is a target, not a guarantee. A recommendation engine's relevance is measured statistically, not deterministically. This framework covers how to adapt elicitation, analysis, and specification practices for systems where uncertainty is inherent.

## Elicitation for AI Projects

Traditional elicitation techniques (interviews, workshops, document analysis) still apply, but the questions change. Instead of asking "what should the system do when X happens," you ask "what is an acceptable error rate when classifying X" and "what happens when the system gets it wrong."

**Stakeholder interviews** must cover tolerance for errors. Business stakeholders rarely think in terms of precision and recall until prompted. Ask: "If the system flags 100 transactions as fraudulent and 15 are actually legitimate, is that acceptable?" This surfaces the precision threshold in business terms.

**Data discovery sessions** are unique to AI requirements. Before writing any functional requirement, the team must assess whether the data needed to fulfill it exists, is accessible, and is of sufficient quality. A requirement like "predict customer churn 30 days in advance" is only achievable if 30-day historical churn labels exist in the training data.

**Observational studies** help identify where AI adds value versus where rules suffice. Watch users perform the task the AI is meant to automate. If they follow a clear decision tree, a rules engine may be better. If they rely on pattern recognition and intuition, ML is more appropriate.

## Requirements Analysis

Analysis for AI projects adds a feasibility dimension that traditional software analysis does not require.

**Feasibility analysis** asks whether the requirement is achievable with available data and current ML techniques. This is not a theoretical exercise. It requires a data scientist to examine sample data, assess signal strength, and estimate whether a model can meet the specified performance threshold. Requirements that fail feasibility analysis are either revised or deferred.

**Conflict resolution** between stakeholders takes on new dimensions. Marketing may want a recommendation engine that maximizes engagement, while the ethics team requires it to avoid filter bubbles. These conflicts must be surfaced during analysis because they affect model objective functions, not just UI behavior.

**Requirement dependency mapping** must include data dependencies. A requirement to "personalize content for new users" depends on having enough interaction data, which creates a cold-start problem. Analysis should identify these data dependencies and specify fallback behaviors.

## Specification Techniques

**Performance-based specifications** replace deterministic ones. Instead of "the system shall correctly identify all fraudulent transactions," write "the system shall identify fraudulent transactions with a minimum recall of 95% and a minimum precision of 80%, measured on a monthly holdout test set of at least 1,000 transactions."

Each specification should include:

- **Metric** - The specific measure (accuracy, precision, recall, F1, latency, throughput)
- **Threshold** - The minimum acceptable value
- **Measurement method** - How and when the metric is evaluated
- **Test dataset** - What data the metric is measured against
- **Degradation policy** - What happens when performance drops below threshold

**Behavioral specifications** handle edge cases that statistical metrics miss. "The model shall not produce offensive content" is a behavioral requirement that cannot be captured by accuracy alone. These require separate testing frameworks, often involving human review panels.

**Data requirements specifications** document the data the system needs. Specify data sources, refresh frequencies, minimum volumes, quality thresholds (completeness, accuracy, timeliness), and retention policies. These are first-class requirements, not implementation details.

## Managing Requirements Volatility

AI requirements change as the team learns what is achievable. A two-phase approach helps:

**Phase 1 (Exploration)** - Requirements are expressed as hypotheses: "We believe we can classify support tickets into 12 categories with 85% accuracy using historical ticket data." The output of this phase is validated or revised requirements.

**Phase 2 (Production)** - Requirements are firmed into specifications with thresholds, measurement methods, and SLAs. These requirements are baselined and managed through traditional change control.

This two-phase approach prevents the common failure of either over-specifying requirements before feasibility is known or under-specifying them when the system goes to production. The transition between phases is a formal milestone that requires stakeholder sign-off on the validated performance levels.
