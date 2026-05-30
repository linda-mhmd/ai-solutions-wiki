---
title: "Model Lineage Tracking"
description: "End-to-end tracking of data, code, hyperparameters, and artifacts across the ML lifecycle for reproducibility, debugging, and compliance."
date: 2026-03-28
categories: [Patterns]
tags: [model-lineage, provenance, reproducibility, mlops, tracking, compliance, artifacts]
related:
  - glossary/model-lineage-glossary
  - patterns/ai-audit-trail
  - patterns/model-versioning
  - patterns/data-versioning
last_updated: 2026-05-30
---

When a production model produces unexpected results, the first question is: what changed? Model lineage tracking provides the answer by maintaining a connected graph of every artifact, decision, and transformation in the model's history, from raw data through training to deployment.

## What Lineage Captures

**Data lineage** - Which datasets were used for training, validation, and testing. The specific version or snapshot of each dataset. Any preprocessing, filtering, or augmentation applied. The feature definitions and their computation logic.

**Code lineage** - The exact commit hash of training code, feature engineering code, and evaluation code. The versions of all framework dependencies (PyTorch, scikit-learn, etc.). The Docker image or environment specification used for training.

**Experiment lineage** - Hyperparameter values for each training run. Random seeds, batch sizes, learning rates, and architecture choices. Evaluation metrics for every experiment, including those that were not promoted.

**Artifact lineage** - The trained model weights, serialization format, and file hash. Any post-training modifications (quantization, pruning, distillation). The deployment configuration and serving infrastructure details.

## The Lineage Graph

Each artifact in the lineage system is a node in a directed acyclic graph. Edges represent derivation relationships: this model was trained on this dataset using this code with these parameters. The graph supports traversal in both directions. Given a model, trace back to its training data. Given a dataset, find all models trained on it.

This bidirectional traversal is critical for incident response. If a data quality issue is discovered in a source dataset, query the lineage graph to identify every model trained on that data and every production system serving those models.

## Implementation Approaches

**Experiment tracking platforms** - Tools like MLflow, Weights & Biases, and Neptune track experiment parameters and metrics automatically. They capture the training-time lineage but often lack connection to deployment and serving metadata.

**Metadata stores** - Dedicated metadata stores like ML Metadata (MLMD) or Marquez provide a structured lineage graph that spans the full lifecycle. They integrate with orchestrators (Kubeflow, Airflow) to capture lineage automatically as pipeline steps execute.

**Git-based lineage** - For simpler setups, enforce that every training run is launched from a clean git commit. Tag the commit with the resulting model version. Store dataset version references in the repository. This provides basic lineage through version control conventions.

## Querying Lineage

Build a lineage API that supports common queries: given a model version, return its training data, code, and parameters. Given a dataset, return all models derived from it. Given a production incident, trace back to the root cause by walking the lineage graph from the serving model to its inputs.

Surface lineage information in model cards and deployment records so that governance teams can review provenance without querying the lineage system directly.
