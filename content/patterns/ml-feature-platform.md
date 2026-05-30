---
title: "ML Feature Platform"
description: "Centralized feature computation, storage, and serving for ML systems: eliminating training-serving skew, enabling feature reuse, and providing consistent feature access."
date: 2026-03-28
categories: [Patterns]
tags: [feature-store, feature-platform, ml-engineering, training-serving-skew, feature-reuse, production]
related:
  - patterns/real-time-feature-serving
  - patterns/ml-feature-platform
  - patterns/data-pipeline-patterns
  - patterns/continuous-training-pattern
last_updated: 2026-05-30
---

Most ML teams compute features in ad-hoc scripts that differ between training notebooks and production serving code. The same feature gets reimplemented in Python for training and Java for serving, with subtle differences that cause training-serving skew. A feature platform centralizes feature definitions, computation, and serving so that the same feature logic is used everywhere.

## The Training-Serving Skew Problem

Training-serving skew occurs when the features used during model training differ from those used during inference. This happens when feature logic is implemented twice: once in a batch training pipeline and again in a real-time serving path. Even minor differences in timestamp handling, null treatment, or aggregation windows produce different feature values that degrade model accuracy silently.

## Core Components

**Feature definitions** - Declarative specifications of how each feature is computed from raw data. A feature definition includes the source data, transformation logic, entity key, and value type. Definitions are version-controlled and shared across teams.

**Batch computation** - A scheduled pipeline that computes feature values over historical data for training. Reads from the data warehouse or lake, applies feature transformations, and writes results to the offline feature store. Training jobs read features from this store rather than computing them inline.

**Stream computation** - A real-time pipeline that computes feature values from streaming data sources for online serving. Uses the same transformation logic as batch computation but operates on event streams (Kafka, Kinesis). Writes results to the online feature store.

**Online store** - A low-latency key-value store (Redis, DynamoDB) that serves feature values for real-time inference. Keyed by entity ID, it returns the latest feature vector in single-digit milliseconds.

**Offline store** - A columnar store (Parquet on S3, BigQuery) that provides point-in-time correct feature values for training. Supports time-travel queries so that training examples use only features that were available at prediction time, preventing data leakage.

## Feature Reuse

A feature platform enables feature reuse across teams and models. A feature like "customer_30day_purchase_count" computed once by the payments team can be consumed by the fraud model, the churn model, and the recommendation system. The feature registry catalogs all available features with metadata on ownership, freshness, and quality.

## Implementation Considerations

Start with the offline store and batch computation. This solves training-serving skew and feature reuse immediately. Add the online store and stream computation when you have models that require real-time features. Use existing infrastructure (Feast, Tecton, or cloud-native feature stores) rather than building from scratch unless you have specific requirements that off-the-shelf solutions cannot meet.

Monitor feature freshness, completeness, and distribution drift. A stale or corrupted feature in the online store will silently degrade every model that consumes it.
