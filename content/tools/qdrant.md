---
title: "Qdrant - High-Performance Vector Search Engine"
description: "A comprehensive reference for Qdrant: vector similarity search, payload filtering, collection management, and deployment patterns for production AI applications."
date: 2026-03-28
categories: [Tools]
tags: [qdrant, vector-database, similarity-search, RAG, rust, open-source]
related:
  - tools/pinecone
  - tools/weaviate
  - tools/chroma-db
last_updated: 2026-05-30
---

Qdrant (pronounced "quadrant") is an open-source vector similarity search engine written in Rust. It combines high performance (Rust's memory safety and speed), rich filtering capabilities, and a production-ready feature set (replication, sharding, snapshots). For AI projects, Qdrant occupies the space between lightweight databases like Chroma and fully managed services like Pinecone: it offers enterprise features while remaining open-source and self-hostable.

Official documentation: https://qdrant.tech/documentation/

## Core Concepts

**Collection** - A named set of vectors with a defined dimension, distance metric, and indexing configuration. Collections support multiple named vectors per point, enabling multi-modal search (for example, storing both text and image embeddings for the same document).

**Point** - A record in a collection, consisting of an ID, one or more vectors, and an optional payload (structured metadata). Points are the units of storage and retrieval.

**Payload** - Structured metadata attached to a point. Payloads support nested JSON, typed fields, and rich filtering. Qdrant indexes payload fields automatically for efficient filtered search.

**Segment** - Internal storage units within a collection. Qdrant manages segments automatically, optimizing between immutable segments (optimized for search) and mutable segments (accepting writes). Understanding segments is not necessary for basic use but helps when tuning performance.

## Search Capabilities

**Vector search** - Approximate nearest neighbor search using HNSW indexing. Qdrant's Rust implementation provides consistently low latency, typically under 10ms for top-10 retrieval on collections with millions of points.

**Filtered search** - Apply payload filters alongside vector search. Qdrant applies filters during the search process (not as post-processing), ensuring the requested number of results is returned even with restrictive filters. This is a significant advantage over implementations that filter after retrieval, which can return fewer results than requested.

**Multi-vector search** - Query using multiple named vectors simultaneously or search across different vector spaces. Useful for multi-modal retrieval where text and image vectors contribute to ranking.

**Recommendation API** - Provide positive and negative example points, and Qdrant finds similar points to the positives and dissimilar to the negatives. This enables recommendation features without an external model.

**Scroll and count** - Iterate through all points matching filter conditions without vector search. Useful for data management and analytics operations.

## Named Vectors

A distinguishing feature of Qdrant is support for multiple named vectors per point. A single document can have a title_vector, content_vector, and summary_vector stored together. Queries specify which vector space to search in, or you can search across multiple spaces with configurable weights.

This eliminates the need for separate collections for different embedding models or different representations of the same content.

## Deployment Options

**Qdrant Cloud** - Managed clusters with automated scaling, backups, and monitoring. Available on AWS, GCP, and Azure. The simplest path to production.

**Self-hosted (Docker)** - Single-node deployment for development and moderate workloads. A single Qdrant instance handles tens of millions of vectors on standard hardware.

**Self-hosted (Kubernetes)** - Distributed deployment with replication and sharding using the Qdrant Helm chart. Sharding distributes data across nodes for larger-than-single-node datasets. Replication provides high availability and read scaling.

## Quantization

Qdrant supports scalar and product quantization to reduce memory usage and improve search speed. Quantization compresses vectors from 32-bit floats to lower precision with minimal accuracy loss. This can reduce memory usage by 4x (scalar quantization) or up to 64x (product quantization), enabling larger collections on the same hardware.

## Snapshots and Backups

Qdrant provides snapshot functionality for backups and migration. Create a snapshot of a collection, download it, and restore it on another instance. This enables disaster recovery, environment migration, and offline analysis workflows.

## Pricing

Qdrant is open-source (Apache 2.0 license) and free to self-host. Qdrant Cloud pricing is based on cluster size (CPU, memory, storage) with no per-query charges. The per-cluster pricing model is predictable and does not penalize high query volumes. Free tier clusters are available for development and evaluation.
