---
title: "Systematic Experiment Tracking with MLflow and W&B"
description: "How to set up experiment tracking that makes ML research reproducible, comparable, and auditable across your team."
date: 2026-03-28
categories: [Guides]
tags: [experiment-tracking, MLflow, weights-and-biases, reproducibility, MLOps]
related:
  - glossary/experiment-tracking
  - guides/model-registry-guide
  - guides/mlops-getting-started
  - guides/model-evaluation-guide
last_updated: 2026-05-30
---

Experiment tracking is the practice of systematically logging every ML training run: its parameters, metrics, artifacts, and environment. Without it, teams cannot answer basic questions. Which hyperparameters produced the best model? What data was used? Why did last week's model perform better? Experiment tracking transforms ML development from guesswork into a disciplined engineering process.

## What to Track

**Parameters** - Every input that affects the training run: hyperparameters, data paths, feature selections, preprocessing settings, random seeds, and model architecture choices. If changing it could change the result, log it.

**Metrics** - Training loss, validation metrics, and any domain-specific evaluation scores. Log metrics at multiple granularities: per-step, per-epoch, and final. Time-series metrics help diagnose training dynamics (overfitting, learning rate issues).

**Artifacts** - Model checkpoints, evaluation plots (confusion matrices, ROC curves, calibration plots), sample predictions, and any output files. These enable detailed post-hoc analysis without re-running experiments.

**Environment** - Library versions, hardware (GPU type, memory), OS, container image hash, and code commit. Environment differences are a common source of irreproducibility.

**Data** - Dataset version or hash, preprocessing pipeline version, train/test split details, and any data filtering applied. Two identical training scripts produce different models on different data.

## Setting Up MLflow

MLflow is the most widely adopted open-source experiment tracking tool. A basic setup requires:

1. Deploy the MLflow tracking server with a database backend (PostgreSQL) and artifact store (S3 or equivalent). The default file-based store does not scale for teams.
2. Configure your training scripts to log to the tracking server using the MLflow client library. Use `mlflow.autolog()` for framework-specific automatic logging as a starting point, then add custom logging for domain-specific metrics.
3. Organize experiments by project or use case. Each experiment contains runs. Use tags to add additional dimensions (team, dataset version, experiment phase).

## Setting Up Weights & Biases

W&B is a managed platform with stronger collaboration and visualization features. Setup involves:

1. Create a W&B team and configure projects for each ML workstream.
2. Initialize the W&B client in your training scripts with `wandb.init()`. Like MLflow, W&B supports automatic framework integration for PyTorch, TensorFlow, and others.
3. Use W&B Sweeps for hyperparameter search with built-in visualization of parameter importance and correlation.

## Team Practices

**Naming conventions.** Agree on how to name experiments and runs. A scheme like `{project}-{approach}-{date}` or using structured tags prevents the experiment list from becoming an unnavigable mess.

**Mandatory logging.** Define a minimum set of parameters and metrics that every run must log. Enforce this through shared training utilities or pre-commit checks.

**Regular reviews.** Schedule periodic experiment reviews where the team examines recent runs, compares approaches, and decides which directions to pursue. The experiment tracker becomes the shared evidence base for these decisions.

**Baseline runs.** Always maintain a logged baseline model. Every new experiment should be comparable to the baseline using the same metrics and evaluation data.

## Comparing Runs

The real value of experiment tracking emerges when comparing runs. Both MLflow and W&B support:

- Side-by-side parameter and metric comparison for selected runs
- Parallel coordinates plots showing how parameters relate to outcomes
- Metric history overlays to compare training dynamics
- Artifact comparison (prediction samples, evaluation plots)

## From Tracking to Registry

Experiment tracking and model registry are complementary. Tracking captures every run; the registry stores the models worth keeping. The workflow is: track all experiments, identify the best performers, register them in the model registry, and promote through staging to production. The lineage link from registry back to experiment run enables full traceability.
