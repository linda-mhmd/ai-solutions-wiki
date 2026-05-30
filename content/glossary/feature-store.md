---
title: "Feature Store"
description: "What a feature store is, how it serves as a centralized repository for ML features, and why it solves the training-serving skew problem."
date: 2026-03-28
categories: [Glossary]
tags: [feature-store, mlops, features, training-serving-skew, data-engineering, ml-platform]
related:
  - glossary/training-serving-skew
  - glossary/mlops
  - patterns/ml-feature-platform
  - patterns/real-time-feature-serving
  - guides/feature-store-guide
last_updated: 2026-05-30
---

A feature store is a centralized system for defining, computing, storing, and serving ML features consistently across training and inference. It ensures that the same feature computation logic produces the same values whether features are being generated for a training dataset or served in real time for a production prediction request.

## The Problem It Solves

In most ML teams, feature engineering code is duplicated. Data scientists write feature computation in Python notebooks for training. Engineers rewrite the same logic in a different language or framework for production serving. These two implementations inevitably diverge, causing training-serving skew: the model was trained on features computed one way but serves predictions using features computed a slightly different way. This silent inconsistency degrades model performance in production without any obvious error.

Feature stores eliminate this duplication by providing a single source of truth for feature definitions and computation logic, used identically for both training and serving.

## Components

**Feature definitions** - Declarative specifications of how each feature is computed from raw data. The definition includes the data source, transformation logic, data type, and freshness requirements.

**Offline store** - Historical feature values optimized for training. Supports point-in-time lookups so that training datasets contain the feature values as they existed at the time of each training example, avoiding data leakage from future information.

**Online store** - Low-latency feature serving for real-time inference. Typically backed by a key-value store (Redis, DynamoDB) that serves the latest feature values for a given entity in single-digit milliseconds.

**Feature serving API** - A unified API that retrieves features by entity key and feature set. Training pipelines call the offline store for batch feature retrieval. Serving infrastructure calls the online store for real-time feature retrieval.

## Benefits

Beyond solving training-serving skew, feature stores enable feature reuse across teams and models. A customer lifetime value feature computed by one team can be discovered and used by another team without reimplementation. This reduces duplicated effort and ensures consistent definitions across the organization.

Feature stores also simplify compliance and auditing. Because feature computation is centralized and versioned, it is possible to trace which features were used to train a specific model version and how those features were computed.

## Tools

Common feature store implementations include Amazon SageMaker Feature Store, Feast (open-source), Tecton, Hopsworks, and Databricks Feature Store. Each provides the core offline/online serving capability with varying levels of integration into the broader ML platform ecosystem.

## Sources

- Uber Engineering. (2017). Meet Michelangelo: Uber's machine learning platform. *Uber Engineering Blog*. (First major public description of a feature store in production.)
- Gojek Tech. (2020). Feast: Feature Store for Machine Learning. *GitHub: feast-dev/feast*. (Open-source feature store; most widely adopted implementation.)
- Sculley, D., et al. (2015). Hidden technical debt in machine learning systems. *NeurIPS 2015*. (Training-serving skew as a key source of ML technical debt; the core problem feature stores address.)
