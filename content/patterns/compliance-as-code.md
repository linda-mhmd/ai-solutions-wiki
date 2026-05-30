---
title: "Compliance as Code for AI Systems"
description: "Encoding regulatory requirements as automated checks: policy-as-code with OPA, automated audit trails, model governance, data privacy enforcement, and continuous compliance monitoring."
date: 2026-03-28
categories: [Patterns]
tags: [compliance, governance, policy-as-code, opa, audit, regulation, ai-engineering]
related:
  - glossary/devsecops
  - patterns/zero-trust-ai
  - guides/devsecops-ai
last_updated: 2026-05-30
---

AI systems operate under increasing regulatory scrutiny. The EU AI Act, GDPR, CCPA, industry-specific regulations (HIPAA, SOX, PCI-DSS), and emerging AI-specific legislation impose requirements on data handling, model transparency, bias monitoring, and audit trails. Manual compliance processes - spreadsheet checklists, periodic audits, documented reviews - do not scale with the pace of AI development. Compliance as code encodes regulatory requirements as automated checks that run continuously in CI/CD pipelines and production environments.

## The Pattern

Instead of documenting compliance requirements in policy documents that engineers must read and follow, encode them as executable rules that are enforced automatically:

```
Regulation → Policy Code → Automated Checks → CI/CD Gates + Runtime Enforcement
```

Compliance failures are caught the same way test failures are caught: automatically, early, and with clear remediation guidance.

## Policy Engines

### Open Policy Agent (OPA)

OPA is the most widely adopted policy engine. Policies are written in Rego, a declarative language:

```rego
# policy/ai_model_deployment.rego
package ai.deployment

# Models must have a completed bias assessment
deny[msg] {
    input.model.bias_assessment_status != "completed"
    msg := sprintf("Model %s cannot be deployed without a completed bias assessment", [input.model.id])
}

# Models processing PII must use encryption at rest
deny[msg] {
    input.model.processes_pii == true
    not input.infrastructure.encryption_at_rest
    msg := "Models processing PII must use encryption at rest"
}

# High-risk models require human-in-the-loop
deny[msg] {
    input.model.risk_level == "high"
    not input.deployment.human_in_the_loop
    msg := "High-risk AI models require human-in-the-loop configuration"
}

# Training data must have documented provenance
deny[msg] {
    not input.model.training_data_provenance
    msg := "Training data provenance must be documented"
}
```

### CI/CD Integration

Evaluate policies as a deployment gate:

```yaml
- name: Compliance check
  run: |
    opa eval \
      --data policy/ \
      --input deployment-manifest.json \
      "data.ai.deployment.deny" \
      --fail-defined
```

If any `deny` rule matches, the deployment fails with a clear message explaining which compliance requirement was not met.

## Automated Audit Trails

Regulators require evidence of what happened, when, and who authorised it. Generate audit trails automatically rather than relying on manual documentation:

### Model Lifecycle Audit

Track every model from training to retirement:

```json
{
  "event": "model_deployed",
  "timestamp": "2026-03-28T10:15:00Z",
  "model_id": "recommendation-v3.2",
  "model_version": "3.2.0",
  "deployed_by": "ci-pipeline-487",
  "approved_by": "jane.smith@company.com",
  "environment": "production",
  "training_data_hash": "sha256:abc123...",
  "evaluation_results": {
    "accuracy": 0.94,
    "bias_metrics": {"demographic_parity": 0.98},
    "test_set_version": "2026-03-25"
  },
  "compliance_checks_passed": [
    "bias_assessment",
    "pii_encryption",
    "data_provenance",
    "model_card_complete"
  ]
}
```

Store audit events in an append-only log (CloudTrail, immutable S3 bucket, or a dedicated audit database). These records must be tamper-evident and retained for the period required by regulation.

### Data Access Audit

Log every access to training data, feature stores, and model artifacts:

- Who accessed the data (identity)
- What data was accessed (resource)
- When the access occurred (timestamp)
- Why the access was needed (purpose, linked to a specific training job or inference request)

## Bias and Fairness Monitoring

Several regulations require ongoing monitoring for bias in AI systems:

```python
# Automated bias check in CI/CD
def check_demographic_parity(predictions, protected_attribute):
    groups = predictions.groupby(protected_attribute)
    positive_rates = groups["prediction"].mean()

    max_disparity = positive_rates.max() - positive_rates.min()
    if max_disparity > BIAS_THRESHOLD:
        raise ComplianceError(
            f"Demographic parity violation: disparity of {max_disparity:.3f} "
            f"exceeds threshold of {BIAS_THRESHOLD}"
        )
```

Run bias checks:
- In CI/CD before model deployment
- Continuously in production on inference results
- On a scheduled basis with updated demographic data

## Data Privacy Enforcement

Encode privacy requirements as automated checks:

```rego
# policy/data_privacy.rego
package ai.privacy

# Training data must not contain raw PII unless anonymised
deny[msg] {
    input.dataset.contains_pii == true
    not input.dataset.anonymisation_applied
    msg := "Training datasets containing PII must be anonymised"
}

# Data retention: delete training data older than policy allows
deny[msg] {
    input.dataset.age_days > input.policy.max_retention_days
    msg := sprintf("Dataset exceeds retention policy: %d days > %d days allowed",
        [input.dataset.age_days, input.policy.max_retention_days])
}

# Right to be forgotten: verify user data removal
deny[msg] {
    count(input.deletion_requests.pending) > 0
    input.deletion_requests.oldest_pending_days > 30
    msg := "Pending deletion requests exceed 30-day SLA"
}
```

## Model Cards and Documentation

Automate model card generation from pipeline metadata:

- Training data description (auto-populated from data catalog)
- Evaluation metrics (auto-populated from evaluation pipeline)
- Bias assessment results (auto-populated from bias checks)
- Intended use and limitations (maintained by the model owner, validated for completeness)
- Deployment history (auto-populated from audit trail)

A model without a complete model card fails the compliance gate and cannot be deployed.

## Continuous Compliance

Compliance is not a pre-deployment checkpoint. It is a continuous state:

- **Pre-deployment** - Policy gates in CI/CD prevent non-compliant models from deploying
- **Runtime** - Policy enforcement at the API gateway, service mesh, and data access layer
- **Post-deployment** - Continuous monitoring for bias drift, data retention violations, and access anomalies
- **Periodic review** - Automated reports for compliance teams, generated from audit trail data

The value of compliance as code is not just catching violations. It is making compliance visible, measurable, and actionable - turning regulatory requirements from a burden into a standard part of the engineering workflow.
