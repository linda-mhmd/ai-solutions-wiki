---
title: "Policy as Code for ML"
description: "Executable governance rules in ML CI/CD pipelines: automated compliance checks, deployment gates, and enforceable organizational policies for AI systems."
date: 2026-03-28
categories: [Patterns]
tags: [policy-as-code, governance, compliance, ci-cd, opa, ml-pipeline, automation]
related:
  - patterns/ai-governance
  - patterns/ai-audit-trail
  - patterns/llmops-pipeline
  - glossary/nist-ai-rmf-glossary
last_updated: 2026-05-30
---

Governance policies for AI systems are often documented in spreadsheets, wiki pages, and slide decks that nobody enforces consistently. Policy as code converts these human-readable rules into executable checks that run automatically in the ML CI/CD pipeline. A model that violates a policy cannot be deployed because the pipeline blocks it, not because someone remembered to check.

## Why Policies Must Be Code

Manual governance review does not scale. An organization deploying dozens of models across multiple teams cannot rely on a governance board to manually review every model promotion. Manual reviews are slow, inconsistent, and create bottlenecks. Executable policies run in seconds, apply consistently to every deployment, and produce auditable pass/fail records.

## Policy Categories

**Fairness constraints** - Enforce that model predictions do not exceed a maximum disparity across protected groups. Define thresholds for demographic parity, equalized odds, or other fairness metrics. The pipeline evaluates these metrics on a held-out test set and blocks deployment if any threshold is violated.

**Performance baselines** - Require that a new model version meets minimum accuracy, latency, and throughput requirements before promotion. Prevent regressions by comparing against the currently deployed model.

**Data quality gates** - Validate that training data meets schema requirements, contains no prohibited data categories, and has been through required preprocessing steps. Check for data drift between training and serving distributions.

**Security requirements** - Enforce model artifact signing, dependency vulnerability scanning, and safe serialization formats. Block models that use pickle serialization or have unsigned weight files.

**Documentation requirements** - Require that model cards, data sheets, and risk assessments exist and are current before deployment. Check that required fields are populated, not just that the file exists.

## Implementation with OPA

Open Policy Agent (OPA) is a widely adopted policy engine that evaluates policies written in Rego against structured input. Define your ML policies as Rego rules. Feed model metadata, evaluation results, and artifact manifests to OPA as input. OPA returns allow or deny decisions with explanations.

Integrate OPA evaluation as a pipeline step between model evaluation and deployment. The pipeline collects all required metadata, submits it to OPA, and proceeds only if all policies pass. Failed policies generate detailed explanations that tell the model developer exactly what needs to be fixed.

## Policy Lifecycle

Store policies in a version-controlled repository separate from model code. Policies have their own review and approval process. Policy changes trigger re-evaluation of all currently deployed models against the new rules. Alert model owners when their deployed models no longer comply with updated policies.

Track policy evaluation results as part of the audit trail. Auditors can query which policies were enforced at the time of any given model deployment.
