---
title: "MLOps - Machine Learning Operations"
description: "What MLOps is, how it applies DevOps principles to machine learning, and the practices that enable reliable, repeatable ML system delivery."
date: 2026-03-28
categories: [Glossary]
tags: [mlops, machine-learning, devops, ci-cd, model-deployment, automation, production-ml]
related:
  - glossary/llmops
  - glossary/continuous-training
  - glossary/experiment-tracking
  - glossary/model-registry
  - glossary/feature-store
  - patterns/llmops-pipeline
  - guides/mlops-getting-started
last_updated: 2026-05-30
---

MLOps (Machine Learning Operations) is the set of practices, tools, and organizational patterns for deploying and maintaining machine learning models in production reliably and efficiently. It applies the principles of DevOps -- automation, continuous integration, continuous delivery, monitoring, and collaboration -- to the unique challenges of machine learning systems.

<figure class="bz-figure">
  <img src="/img/obsidian-lab/cycle-five-nodes-notext.png" alt="A continuous cycle connecting five nodes: the MLOps lifecycle of data, training, evaluation, deployment, and monitoring in perpetual motion." loading="lazy">
  <figcaption>MLOps is a continuous cycle. Data flows to training, training produces models, models are evaluated and deployed, production monitoring detects drift, and the cycle begins again. Automation keeps it turning.</figcaption>
</figure>

## Why MLOps Exists

Traditional software is deterministic: given the same input, it produces the same output. ML systems are probabilistic and data-dependent. A model's behavior is shaped by its training data, and that behavior can degrade over time as the real world diverges from the training distribution. This introduces challenges that standard DevOps practices do not address: data versioning, experiment tracking, model validation, drift detection, and continuous retraining.

Without MLOps practices, organizations experience a common failure pattern. A data scientist builds a model in a notebook that performs well in evaluation. Handing it off to engineering for production deployment takes months. Once deployed, nobody monitors whether the model's predictions are still accurate. Performance degrades silently until a business stakeholder notices bad results.

## Core Practices

**Version control for everything** - Not just code, but also data, model artifacts, feature definitions, and pipeline configurations. Every training run should be reproducible from its versioned inputs.

**Automated pipelines** - End-to-end pipelines that take raw data through feature engineering, training, evaluation, validation, and deployment without manual intervention. Pipelines are triggered by schedules, data arrival events, or drift detection alerts.

**Model validation gates** - Automated checks that compare a new model against the current production model on held-out evaluation data, fairness metrics, latency benchmarks, and policy compliance before allowing promotion.

**Production monitoring** - Continuous tracking of model performance metrics, data drift, prediction distributions, and system health. Alerts when metrics cross defined thresholds trigger investigation or automated retraining.

**Experiment tracking** - Systematic logging of every training run's parameters, metrics, and artifacts to enable comparison, reproducibility, and knowledge accumulation across the team.

## Maturity Levels

MLOps maturity is often described in levels. Level 0 is manual: models are trained in notebooks and deployed manually. Level 1 automates the training pipeline but deploys manually. Level 2 automates both training and deployment with CI/CD for ML. Level 3 adds automated monitoring, drift detection, and continuous retraining, creating a fully autonomous ML lifecycle.

Most organizations operate at Level 0 or 1. Reaching Level 2 or 3 requires investment in infrastructure, tooling, and organizational processes, but it is the difference between ML as a one-off experiment and ML as a reliable production capability.

## Sources

- Sculley, D., et al. (2015). Hidden technical debt in machine learning systems. *NeurIPS 2015*. (Identified the engineering challenges motivating MLOps: entanglement, pipeline jungle, dead experimental code paths.)
- Baylor, D., et al. (2017). TFX: A TensorFlow-based production-scale machine learning platform. *KDD 2017*. (Google's end-to-end ML platform; influenced MLOps tooling design.)
- Alla, S., & Adari, S.K. (2021). *Beginning MLOps with MLFlow.* Apress. (Practitioner reference for MLOps with MLflow.)
- Google Cloud. (2021). *MLOps: Continuous delivery and automation pipelines in machine learning*. cloud.google.com. (MLOps maturity level model.)
