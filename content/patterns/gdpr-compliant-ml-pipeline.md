---
title: "GDPR-Compliant ML Pipeline"
description: "Architecture pattern for building machine learning training and inference pipelines that satisfy GDPR requirements for data minimization, consent management, erasure, and explainability."
date: 2026-03-28
categories: [Patterns]
tags: [gdpr, ml-pipeline, data-protection, compliance, privacy, architecture]
related:
  - frameworks/gdpr-ai-framework
  - guides/gdpr-for-ai-teams
  - glossary/gdpr
  - glossary/data-controller
  - glossary/dpia
  - patterns/privacy-preserving-ai
  - patterns/pii-redaction-pipeline
last_updated: 2026-05-30
---

Building an ML pipeline that satisfies GDPR requires embedding data protection controls at every stage, from data ingestion through model serving. This pattern describes the architectural components needed.

## Data Ingestion Layer

The ingestion layer must enforce lawful basis verification before any personal data enters the pipeline. Implement a consent management service that checks whether valid consent exists for each data subject before their data is included in training datasets. For legitimate interest processing, verify that the balancing test has been documented. Tag every data record with its lawful basis, retention period, and the data subject identifier (pseudonymized).

Implement data minimization at ingestion: strip fields not needed for the model's purpose before data enters the pipeline. Use a PII detection service to identify and flag personal data fields, ensuring only the minimum necessary personal data proceeds to training.

## Data Versioning and Lineage

Version all training datasets so you can identify exactly which data was used for each model version. This is essential for responding to erasure requests: if a data subject requests deletion, you need to know which model versions included their data. Use tools like DVC or LakeFS to version datasets alongside the training code. Maintain a data lineage catalog that maps each dataset version to its source systems, processing steps, and downstream model versions.

## Training with Privacy Controls

Apply pseudonymization or anonymization before training where feasible. If true anonymization is possible (the data cannot be re-identified even with additional information), GDPR no longer applies to that data. If only pseudonymization is used, GDPR still applies but the risk is reduced.

Consider differential privacy during training, which adds calibrated noise to prevent the model from memorizing individual records. This provides a mathematical guarantee that no individual's data significantly influences the model's outputs. Federated learning is an alternative when data cannot leave its origin jurisdiction: the model travels to the data rather than the data traveling to the model.

## Erasure and Rectification Pipeline

Build an automated pipeline that handles data subject rights requests. When an erasure request arrives: remove the subject's data from all training datasets, determine whether the model needs retraining (if the subject's data materially influenced the model), trigger retraining if necessary, and update the data lineage catalog. For rectification requests, update the data and assess whether the correction affects model outputs.

Machine unlearning techniques can sometimes remove the influence of specific records without full retraining, but these are still maturing and may not fully satisfy regulatory expectations.

## Inference Layer

At inference time, implement explainability mechanisms that can provide per-prediction explanations. Log inference requests and responses with enough detail to respond to access requests but implement appropriate retention limits. Apply access controls so that inference outputs containing personal data are only accessible to authorized consumers.

For automated decision-making under Article 22, implement a human review queue that routes decisions with legal or significant effects to a human reviewer before they are actioned. The reviewer must have the authority and information needed to override the model's recommendation.

## Monitoring and Compliance

Continuously monitor the pipeline for compliance. Track consent withdrawals and ensure they trigger data removal. Monitor data retention and automatically delete or anonymize data that exceeds its retention period. Audit access logs to verify that only authorized personnel and systems access personal data. Generate compliance reports showing the current state of data processing activities.
