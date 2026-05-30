---
title: "Weights & Biases - ML Experiment Platform"
description: "A comprehensive reference for Weights & Biases: experiment tracking, hyperparameter sweeps, model evaluation, and team collaboration for ML and AI projects."
date: 2026-03-28
categories: [Tools]
tags: [wandb, weights-and-biases, experiment-tracking, MLOps, collaboration]
related:
  - tools/mlflow
  - tools/amazon-sagemaker
  - tools/ray
last_updated: 2026-05-30
---

Weights & Biases (W&B) is a platform for ML experiment tracking, dataset versioning, hyperparameter optimization, and model evaluation. It provides a hosted dashboard where teams can log, compare, and collaborate on ML experiments in real time. For AI projects, W&B is the go-to choice when team collaboration, visualization quality, and managed infrastructure matter more than self-hosting flexibility.

Official documentation: https://docs.wandb.ai/

## Core Products

**Experiments (Runs)** - Log metrics, hyperparameters, system utilization, code, and outputs from training runs. Each run creates a rich, interactive record:

```python
import wandb

wandb.init(project="fraud-detection", config={"lr": 0.001, "epochs": 100})
for epoch in range(100):
    loss, accuracy = train_epoch()
    wandb.log({"loss": loss, "accuracy": accuracy, "epoch": epoch})
wandb.finish()
```

The dashboard updates in real time as training progresses. Team members can watch training curves, spot divergence, and make decisions without waiting for runs to complete.

**Sweeps** - Automated hyperparameter optimization. Define a search space (learning rate range, batch sizes, architecture variants) and a search strategy (random, grid, Bayesian). W&B distributes trials across compute resources and tracks results in a unified dashboard. Bayesian sweeps use early stopping to terminate unpromising runs, reducing total compute cost.

**Artifacts** - Versioned, lineage-tracked datasets and model files. Log a training dataset as an artifact, and every model trained on it automatically links back to that version. When the dataset changes, W&B tracks which models were trained on which version. This lineage is critical for debugging and compliance.

**Tables** - Interactive data tables for model evaluation. Log predictions alongside ground truth, images, audio, or any rich media. Filter, sort, and group to identify systematic errors. This replaces ad-hoc notebook-based evaluation with a persistent, shareable analysis.

**Reports** - Collaborative documents that combine visualizations, tables, and narrative text. Reports pull live data from experiments, so they update as new runs complete. Use reports for experiment summaries, model comparison documents, and stakeholder communication.

## LLM Evaluation with Weave

W&B Weave is the LLM-focused extension that provides tracing, evaluation, and monitoring for LLM applications. It traces multi-step LLM calls (RAG pipelines, agent workflows), logs prompts and completions, and runs evaluations against test datasets with configurable scorers.

Weave integrates with OpenAI, Anthropic, LangChain, and LlamaIndex, capturing traces automatically with minimal code changes.

## Team Collaboration

W&B's collaboration features are its primary differentiator from self-hosted alternatives like MLflow. Team workspaces provide a shared view of all experiments. Team members can annotate runs, tag promising configurations, and discuss results directly in the dashboard. This reduces the friction of ML collaboration that typically happens through Slack messages and screenshots.

## Integration Ecosystem

W&B integrates with major ML frameworks (PyTorch, TensorFlow, Keras, Hugging Face Transformers, scikit-learn), training platforms (SageMaker, Vertex AI), and orchestration tools (Kubeflow, Airflow). The integration is typically a two-line code change: initialize W&B and pass the callback to the training loop.

## Deployment Options

**W&B Cloud** - Fully managed, hosted by W&B. The simplest option with automatic scaling and no infrastructure management. Data is stored in W&B's cloud infrastructure.

**W&B Server** - Self-hosted deployment on your own infrastructure (Kubernetes). Data stays within your environment, meeting data residency and compliance requirements. Available as a licensed product.

**W&B Dedicated Cloud** - A managed instance in a dedicated cloud environment (single-tenant). Combines managed operations with data isolation.

## Pricing

W&B offers a free tier for individuals and small teams (limited tracked hours and storage). Team and Enterprise tiers charge per user with increased limits on tracked hours, storage, and administrative features. The Enterprise tier includes SSO, audit logs, and priority support. Self-hosted (Server) licensing is priced per seat.
