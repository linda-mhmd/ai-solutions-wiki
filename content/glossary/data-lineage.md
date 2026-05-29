---
title: "Data Lineage"
description: "What data lineage is, how tracking data from origin through transformations supports compliance, debugging, and trust in AI systems."
date: 2026-03-28
categories: [Glossary]
tags: [data-lineage, provenance, data-governance, compliance, traceability, metadata]
related:
  - glossary/model-lineage-glossary
  - patterns/model-lineage
  - patterns/data-versioning
  - patterns/data-pipeline-patterns
  - patterns/ai-audit-trail
---

Data lineage is the practice of tracking data from its point of origin through every transformation, movement, and aggregation it undergoes until it reaches its final use. In AI systems, data lineage answers the question: where did the data used to train or serve this model come from, and what happened to it along the way?


<figure class="bz-figure">
  <img src="/img/dark-cherry/data-projection.png" alt="A dark industrial cylinder projecting ordered rows of red points onto a surface: every point traceable back to the source that emitted it." loading="lazy">
  <figcaption>Data lineage is the projection record. Every data point in a dashboard or model output came from somewhere. Lineage tracks the path from source to destination so you can answer: where did this number come from?</figcaption>
</figure>

## Why Data Lineage Matters for AI

AI model quality is bounded by data quality. When a model produces unexpected outputs, the investigation often traces back to a data issue: a broken ETL job, a schema change in a source system, a filtering step that excluded important records, or a labeling error. Without data lineage, this investigation requires manual detective work across multiple systems. With data lineage, you can trace from the model's training dataset back through every transformation to the original source records.

Regulatory compliance increasingly demands data traceability. The EU AI Act requires that providers of high-risk AI systems maintain documentation of the data used for training, validation, and testing. GDPR's right to explanation and right to erasure both require knowing which data influenced which model. Data lineage provides the foundation for meeting these requirements.

## What Lineage Captures

**Source tracking** - Which source systems, databases, APIs, or files provided the raw data. Timestamps for when data was extracted. Credentials and access methods used.

**Transformation history** - Every cleaning, filtering, joining, aggregating, and feature engineering step applied to the data. The code version and configuration for each transformation. Input and output row counts at each stage.

**Schema evolution** - How data schemas changed over time. Which columns were added, removed, renamed, or retyped. How schema changes propagated through downstream transformations.

**Quality annotations** - Results of data quality checks at each stage. Which records were flagged, filtered, or imputed. Completeness, accuracy, and freshness metrics.

## Implementation Approaches

**Pipeline-integrated lineage** - Orchestration tools like Apache Airflow, dbt, and AWS Glue can emit lineage metadata as part of their normal execution. Each pipeline step records its inputs, outputs, and transformation logic.

**Metadata catalog integration** - Centralized metadata catalogs like AWS Glue Data Catalog, DataHub, or OpenMetadata aggregate lineage information from multiple pipeline systems into a unified graph that supports cross-system tracing.

**Column-level lineage** - The most granular form of lineage tracks how individual columns flow through transformations. This enables precise impact analysis: if a source column changes, which downstream features and models are affected?

Data lineage is not a one-time documentation exercise. It must be captured automatically as part of pipeline execution and maintained continuously as pipelines evolve.

## Sources

- Bose, R., & Frew, J. (2005). Lineage retrieval for scientific data processing: A survey. *ACM Computing Surveys, 37*(1), 1–28. (Survey of provenance/lineage models in scientific computing.)
- Buneman, P., & Tan, W.C. (2019). Data provenance. *Communications of the ACM, 62*(12), 31–33.
- European Parliament and Council. (2024). *Regulation (EU) 2024/1689 (EU AI Act)*, Annex IV, Technical documentation requirements for high-risk AI systems, including training data provenance.
