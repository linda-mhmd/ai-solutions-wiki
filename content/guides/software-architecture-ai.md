---
title: "Software Architecture for AI Systems"
description: "Architecture decisions, ADRs, and trade-offs for AI systems covering serving patterns, training infrastructure, and system decomposition."
date: 2026-03-28
categories: [Guides]
tags: [architecture, design, ADR, trade-offs, AI-systems]
related:
  - frameworks/architecture-decision-records
  - guides/requirements-engineering-ai
  - comparisons/grpc-vs-rest-ai
last_updated: 2026-05-30
---

Architecture for AI systems must accommodate two fundamentally different workloads: training (batch, compute-intensive, experimental) and serving (real-time, latency-sensitive, production-grade). Most AI architecture failures come from treating these as one system or from building serving infrastructure before the model is validated. This guide covers the key architecture decisions, how to document them, and the trade-offs involved.

## System Decomposition

An AI system typically decomposes into five subsystems:

**Data ingestion and preparation** - Collects raw data, validates it, transforms it, and stores it in a format suitable for training and serving. This subsystem must handle both batch (historical data) and streaming (real-time events) data sources.

**Feature engineering and storage** - Transforms raw data into features, stores feature definitions for reuse, and serves features at inference time with consistent logic. A feature store (Feast, Tecton, Vertex Feature Store) addresses the training-serving skew problem by ensuring the same feature computation runs in both contexts.

**Training and experimentation** - Runs experiments, trains models, evaluates performance, and registers validated models. This subsystem is batch-oriented, GPU-intensive, and managed by data scientists. It must support experiment tracking, hyperparameter tuning, and reproducibility.

**Model serving** - Serves predictions in real-time or batch. This is the production-facing subsystem and must meet latency, throughput, and availability SLAs. It includes model loading, request preprocessing, inference, postprocessing, and response formatting.

**Monitoring and feedback** - Tracks model performance in production, detects data and concept drift, captures ground truth labels when available, and triggers retraining when performance degrades.

## Key Architecture Decisions

### Batch vs Real-Time Serving

**Batch inference** precomputes predictions on a schedule and stores results for lookup. Use batch when predictions are needed for a known set of inputs (e.g., daily product recommendations for all users) and latency tolerance is high (minutes to hours).

**Real-time inference** computes predictions on demand. Use real-time when inputs are unknown in advance (e.g., classifying a just-received email) or when freshness matters (e.g., fraud detection on a transaction in progress).

**Near-real-time** combines both: batch-compute features periodically, then combine with real-time features at inference time. This is common for recommendation systems where user profiles are batch-computed but session behavior is real-time.

Document this decision in an ADR with the latency requirements, throughput requirements, cost constraints, and data freshness needs that drove the choice.

### Monolith vs Microservices

For early-stage AI products, a monolith is usually the right choice. The overhead of managing multiple services, network calls, and distributed tracing is not justified when the team is still iterating on the model and the data pipeline. A monolith with clear internal module boundaries can be decomposed later.

Decompose into microservices when: different components need to scale independently (e.g., the serving layer scales with traffic while the training pipeline scales with data volume), different teams own different components, or components have different deployment cadences.

### Embedding Models vs API-Based Models

**Self-hosted models** give full control over latency, cost, and data privacy but require infrastructure management. Use self-hosted when latency SLAs are strict (under 50ms), data cannot leave your infrastructure, or per-prediction cost at scale makes API pricing prohibitive.

**API-based models** (OpenAI, Anthropic, Google) reduce infrastructure burden but introduce latency variability, vendor dependency, and data transmission concerns. Use API-based models for prototyping, low-volume use cases, or when the API provider offers capabilities that are impractical to replicate.

Document the decision with cost projections at current and projected volumes, latency benchmarks, and a risk assessment for vendor dependency.

## Architecture Documentation

Use Architecture Decision Records for every significant decision. Beyond ADRs, maintain:

**Context diagrams** showing the AI system's boundaries and its interactions with external systems (data sources, downstream consumers, monitoring tools).

**Data flow diagrams** tracing data from source through ingestion, feature engineering, training, and serving. These diagrams are essential for debugging data quality issues and for compliance reviews.

**Deployment diagrams** showing how components are deployed across infrastructure (Kubernetes clusters, managed services, GPU instances). Include autoscaling policies and failover mechanisms.

## Common Anti-Patterns

**The notebook-to-production pipeline** - Deploying Jupyter notebooks directly as serving code. Notebooks are for exploration, not production. Extract validated logic into tested Python modules.

**The shared database** - Training and serving reading from the same database. Training queries (full table scans) interfere with serving queries (low-latency lookups). Separate the data stores.

**The big bang deployment** - Replacing the entire system with a new model version in one step. Use canary deployments, shadow mode, or A/B tests to validate new models in production before full rollout.
