---
title: "Data Contract"
description: "What data contracts are, how schema-first agreements between data producers and consumers prevent breaking changes, and why AI systems need explicit data contracts."
date: 2026-03-28
categories: [Glossary]
tags: [data-contract, data-engineering, schema, data-quality, governance]
related:
  - patterns/data-contract-pattern
  - glossary/data-quality
  - glossary/openapi
---

A data contract is a formal agreement between a data producer and its consumers that defines the structure, semantics, quality guarantees, and service level objectives for a dataset or data stream. It is the data equivalent of an API contract.


<figure class="bz-figure">
  <img src="/img/dark-cherry/storage-lockers.png" alt="Dark metal storage lockers with consistent red-lit rows: each compartment conforming to the same dimensions, interface, and access protocol." loading="lazy">
  <figcaption>A data contract specifies the interface between data producers and consumers. The lockers are identical by agreement. The producer promises the schema. The consumer relies on it. When the promise breaks, the pipeline breaks.</figcaption>
</figure>

Without data contracts, upstream teams change column names, alter data types, or modify business logic without notifying downstream consumers. The result: broken dashboards, failed pipelines, and degraded model performance. Data contracts make these dependencies explicit and enforceable.

## What a Data Contract Specifies

**Schema Definition** - Column names, data types, nullability constraints, and nested structure. Typically defined using JSON Schema, Avro, Protocol Buffers, or a dedicated data contract specification like the Open Data Contract Standard (ODCS).

**Semantic Descriptions** - What each field means in business terms. A column named `amount` is ambiguous. A data contract specifies: "Transaction amount in USD cents, always positive, represents the gross amount before tax."

**Quality Rules** - Expectations about data completeness, uniqueness, freshness, and validity. Examples: "customer_id is never null," "event_timestamp is within the last 24 hours," "email matches a valid format."

**SLOs and Freshness** - How often the data is updated, maximum acceptable latency, and availability targets. A real-time feature pipeline might require sub-second freshness. A daily training dataset might accept 24-hour latency.

**Ownership and Contact** - Which team owns the data, who to contact when issues arise, and what the change notification process is.

**Versioning and Compatibility** - How the contract evolves. Breaking changes (removing a field, changing a type) require a new major version. Additive changes (new optional fields) are backward compatible.

## Why AI Systems Need Data Contracts

AI models are sensitive to data distribution changes that traditional software tolerates. A categorical field that gains a new value, a numeric field that shifts range, or a timestamp field that changes timezone can silently degrade model accuracy without raising errors.

Data contracts provide the early warning system. When a producer proposes a schema change, the contract validation catches the incompatibility before it reaches the model training pipeline or feature store.

Data contracts shift the relationship between data teams from reactive ("why did our pipeline break?") to proactive ("here is what changed and here is the migration path").

## Sources

- Majchrzak, T. A., Heidari, S., & Spinczyk, O. (2020). Data contracts for API-based data ecosystems. *IEEE International Conference on Web Services*. (Academic framework for formalizing data contracts in API-driven architectures.)
- Breck, E., et al. (2017). The ML test score: A rubric for ML production readiness. *IEEE Big Data 2017*. (Google ML readiness criteria; data schema validation and monitoring is a core test.)
- Kleppmann, M. (2017). *Designing Data-Intensive Applications*. O'Reilly Media. Chapter 4: Encoding and Evolution. (Foundational treatment of schema evolution, backward/forward compatibility, the technical basis for data contract versioning.)
