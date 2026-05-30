---
title: "Setting Up Model Versioning and Registry"
description: "How to implement a model registry that tracks model versions, metadata, lineage, and approval status across the ML lifecycle."
date: 2026-03-28
categories: [Guides]
tags: [model-registry, model-versioning, MLOps, model-deployment, governance]
related:
  - glossary/model-registry
  - guides/mlops-getting-started
  - guides/experiment-tracking-guide
  - guides/ai-governance-implementation
  - glossary/model-card
last_updated: 2026-05-30
---

A model registry is a versioned store for trained ML models and their metadata. It answers questions that every production ML team eventually faces: which model is currently deployed, what data was it trained on, who approved it, and how does it compare to the previous version. Without a registry, this information lives in spreadsheets, Slack messages, and individual memory.

## What a Model Registry Stores

**Model artifacts** - The serialized model files (weights, architecture, preprocessing pipelines) that can be loaded for inference. Each version is immutable and addressable.

**Metadata** - Training parameters, evaluation metrics, dataset references, training duration, framework version, and any custom properties relevant to your domain.

**Lineage** - Links to the experiment run that produced the model, the training data version, the feature definitions used, and the code commit. This chain enables full reproducibility.

**Stage labels** - A model version moves through stages: development, staging, production, archived. Stage transitions can be gated by automated checks and human approval.

## Designing Your Registry Workflow

**Registration.** When an experiment produces a model worth preserving, it is registered with its artifacts and metadata. Automated pipelines should register models that pass evaluation thresholds. Data scientists can also register models manually from exploratory work.

**Evaluation.** Before a model advances to staging, run it through your evaluation suite: aggregate metrics, slice-based analysis, fairness checks, latency benchmarks, and comparison against the current production model. Store all evaluation results as metadata on the model version.

**Approval.** Define who can promote a model to production. For low-risk applications, automated promotion based on evaluation results may suffice. For high-risk applications, require human review and sign-off. The registry records who approved each transition and when.

**Deployment.** The deployment pipeline pulls the production-stage model from the registry. This decouples model training from model deployment. You can retrain frequently and deploy selectively.

**Retirement.** When a model version is replaced, archive it rather than deleting it. You may need to roll back, audit past decisions, or compare performance trends across versions.

## Implementation Options

**MLflow Model Registry** is the most widely adopted open-source option. It integrates with MLflow tracking, supports stage transitions, and provides a UI and API for model management. It works well for teams already using MLflow for experiment tracking.

**SageMaker Model Registry** integrates tightly with the AWS ML ecosystem. It supports approval workflows, model groups, and direct deployment to SageMaker endpoints.

**Weights & Biases Model Registry** connects model versions to experiment runs and provides collaborative review features. Strong choice for teams using W&B for experiment tracking.

**Custom registries** built on object storage and a metadata database are an option for teams with unique requirements, but the operational overhead is significant and rarely justified.

## Best Practices

**Automate registration from pipelines.** Manual registration leads to inconsistency and missing metadata. Your training pipeline should register models automatically with all relevant metadata.

**Version everything together.** A model is not just weights. Version the preprocessing code, feature definitions, and inference code alongside the model artifacts. When you load a model version, you should get everything needed to run it.

**Enforce metadata requirements.** Require minimum metadata before a model can be registered: dataset version, evaluation metrics, training parameters. Missing metadata makes a registry useless for governance and debugging.

**Tag models meaningfully.** Beyond stage labels, use tags for the use case, team, regulatory classification, and deployment target. Tags make the registry searchable as it grows.

**Monitor after deployment.** The registry should link to production monitoring dashboards for each deployed model. When drift is detected, the alert should reference the specific model version and its lineage.
