---
title: "Experiment Tracking"
description: "What experiment tracking is, why systematic logging of ML experiments is essential, and the tools and practices that make it work."
date: 2026-03-28
categories: [Glossary]
tags: [experiment-tracking, mlops, reproducibility, mlflow, weights-and-biases, hyperparameters]
related:
  - glossary/mlops
  - glossary/model-registry
  - patterns/model-lineage
  - tools/mlflow
  - tools/weights-and-biases
  - guides/experiment-tracking-guide
last_updated: 2026-05-30
---

Experiment tracking is the systematic logging of every parameter, metric, artifact, and configuration associated with each ML training run. It provides a searchable, comparable record of what was tried, what worked, and what did not, enabling teams to make informed decisions about model development rather than relying on memory or scattered notes.

## Why It Matters

ML development is inherently experimental. A team may run hundreds of training experiments varying hyperparameters, data preprocessing steps, feature sets, model architectures, and training configurations. Without systematic tracking, it becomes impossible to answer basic questions: which combination of parameters produced the best results? Can we reproduce last week's best model? What did we already try that did not work?

Experiment tracking also supports collaboration. When multiple team members run experiments independently, a shared tracking system prevents duplicated work and enables the team to collectively navigate the experiment space efficiently.

## What to Track

**Parameters** - All hyperparameters (learning rate, batch size, epochs, dropout rate), model architecture choices, data preprocessing configurations, and feature selections. Anything that was a choice rather than a result.

**Metrics** - Training loss, validation loss, accuracy, precision, recall, F1, AUC, and any domain-specific evaluation metrics. Tracked per epoch or step to enable learning curve analysis.

**Artifacts** - Trained model weights, evaluation plots (confusion matrices, ROC curves, loss curves), sample predictions, and any other output files produced by the run.

**Environment** - Code version (git commit hash), framework versions, hardware specifications, random seeds, and the complete environment needed to reproduce the run.

**Metadata** - Who ran the experiment, when it started and ended, wall-clock duration, compute cost, and any notes or tags for organization.

## Tools

**MLflow** - Open-source platform that provides experiment tracking, model registry, and model serving. Tracks parameters, metrics, and artifacts through a simple API. Self-hosted or managed via Databricks.

**Weights & Biases** - Cloud-hosted experiment tracking with rich visualization, hyperparameter sweep management, and team collaboration features. Provides automatic logging integrations for major ML frameworks.

**Amazon SageMaker Experiments** - Integrated experiment tracking within the SageMaker ecosystem. Tracks training jobs, processing jobs, and pipeline executions with automatic metadata capture.

## Best Practices

Log everything automatically rather than relying on manual logging. Integrate tracking calls into training scripts so that every run is captured by default. Use consistent naming conventions and tags to make experiments searchable. Compare experiments systematically using the tracking tool's comparison features rather than eyeballing individual results. Archive completed experiment groups with summary notes documenting conclusions.

## Sources

- Chen, T., et al. (2016). Training deep nets with sublinear memory cost. *arXiv:1604.06174*. (Gradient checkpointing; highlights the need for systematic tracking of training configurations.)
- Zaharia, M., et al. (2018). Accelerating the machine learning lifecycle with MLflow. *VLDB SIGMOD Workshop on Human-In-the-Loop Data Analytics*. (MLflow introduction by Databricks.)
- Bender, E.M., et al. (2021). On the dangers of stochastic parrots. *FAccT 2021*. (Model documentation and reproducibility imperatives; motivates systematic experiment tracking.)
