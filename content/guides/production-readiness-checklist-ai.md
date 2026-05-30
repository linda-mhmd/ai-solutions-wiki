---
title: "Production Readiness Checklist for AI Systems"
description: "A concrete checklist covering model quality, infrastructure, security, monitoring, documentation, compliance, and rollback planning for deploying AI systems to production."
date: 2026-03-28
categories: [Guides]
tags: [production, deployment, checklist, mlops]
related: [guides/deployment-models-ai, patterns/blue-green-deployment, guides/monitoring-ai-production]
last_updated: 2026-05-30
---

Deploying an AI model to production is not the same as deploying a web application. Models degrade silently. Input data distributions shift without warning. A model that passed all offline evaluations can fail catastrophically in production because the evaluation dataset did not represent real-world conditions. A production readiness checklist forces teams to verify critical requirements before deployment rather than discovering gaps through incidents.

## Origins and History

Production readiness reviews originated at Google, where Site Reliability Engineering (SRE) teams formalized the practice of assessing services against operational criteria before launch. Google's SRE book, published in 2016, described the Production Readiness Review (PRR) process [1]. The practice was adapted for ML systems as organizations recognized that ML introduced additional failure modes beyond traditional software. Google's 2017 paper on ML system testing and monitoring (Breck et al., "The ML Test Score") proposed a rubric of 28 tests covering data, model, infrastructure, and monitoring [2]. This work established that ML production readiness required domain-specific criteria beyond standard software checklists.

## Model Quality

- [ ] Offline evaluation metrics (accuracy, F1, AUC, BLEU, or domain-specific) meet agreed thresholds
- [ ] Evaluation performed on a held-out test set that was never used during training or hyperparameter tuning
- [ ] Model performance tested across key subgroups (demographic, geographic, use-case segments) to detect bias
- [ ] Performance compared against the current production model (if one exists) and a simple baseline
- [ ] Edge cases and adversarial inputs tested explicitly
- [ ] Model size and inference latency meet serving requirements

## Infrastructure

- [ ] Serving infrastructure provisioned with auto-scaling configured and tested under load
- [ ] Load testing completed at 2x expected peak traffic
- [ ] Health check endpoints implemented and verified
- [ ] Resource limits (CPU, memory, GPU) set to prevent noisy-neighbor issues
- [ ] Cold start time measured and acceptable for the use case
- [ ] Deployment pipeline tested end-to-end in staging environment

## Security

- [ ] Model inputs validated and sanitized to prevent injection attacks
- [ ] Authentication and authorization enforced on all inference endpoints
- [ ] Model artifacts stored in access-controlled registries with integrity verification
- [ ] No secrets, API keys, or credentials embedded in model artifacts or container images
- [ ] Network access restricted to required services only (principle of least privilege)
- [ ] PII handling reviewed and compliant with data protection requirements

## Monitoring

- [ ] Inference latency tracked at P50, P95, and P99 with alerting thresholds defined
- [ ] Model prediction distribution monitored for drift against a reference distribution
- [ ] Input feature distributions monitored for data drift
- [ ] Error rates and HTTP status codes tracked with anomaly detection
- [ ] GPU utilization, memory, and queue depth monitored
- [ ] Business-level metrics (conversion rate, user satisfaction) linked to model performance

## Documentation

- [ ] Model card completed: intended use, limitations, training data summary, evaluation results
- [ ] API documentation published with request/response schemas and example calls
- [ ] Runbook created covering common failure modes and remediation steps
- [ ] Architecture diagram updated to reflect the new model's position in the system
- [ ] On-call team identified and briefed on the new deployment

## Compliance

- [ ] Data lineage documented from source to model training to serving
- [ ] Regulatory requirements identified and addressed (GDPR, EU AI Act, sector-specific)
- [ ] Ethics review completed for high-risk applications
- [ ] Audit trail for model versioning and deployment decisions maintained
- [ ] Data retention and deletion policies configured

## Rollback Plan

- [ ] Previous model version retained and deployable within minutes
- [ ] Rollback procedure documented and tested in staging
- [ ] Rollback trigger criteria defined (latency exceeds X, error rate exceeds Y, drift score exceeds Z)
- [ ] Feature flags or traffic splitting configured for gradual rollout
- [ ] Communication plan for stakeholders if rollback is needed

## Sources

1. Beyer, B., et al. *Site Reliability Engineering: How Google Runs Production Systems.* O'Reilly Media, 2016.
2. Breck, E., et al. "The ML Test Score: A Rubric for ML Production Readiness and Technical Debt Reduction." *Proceedings of IEEE Big Data* (2017).
