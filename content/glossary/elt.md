---
title: "ELT - Extract, Load, Transform"
description: "What ELT is, how it differs from ETL, and why modern data architectures favor loading raw data before transforming."
date: 2026-03-28
categories: [Glossary]
tags: [ELT, data-engineering, data-pipeline, data-warehouse, data-lake]
related:
  - glossary/etl
  - glossary/data-warehouse
  - glossary/data-lake
  - glossary/lakehouse
last_updated: 2026-05-30
---

ELT (Extract, Load, Transform) is a data integration pattern that reverses the traditional ETL order: raw data is extracted from sources and loaded directly into the target system, then transformed within the target using its native compute capabilities. The transformation happens inside the data warehouse or lake rather than in a separate processing layer.

## How It Differs from ETL

In ETL, a dedicated processing engine (Spark, Glue) transforms data before it reaches the destination. In ELT, the raw data is loaded first, preserving the original data, and transformations are expressed as SQL or queries that run inside the destination system.

ELT became practical as cloud data warehouses (Redshift, BigQuery, Snowflake) gained the compute power to handle transformation workloads efficiently. The destination system that stores the data also has the resources to transform it.

## Why It Matters

**Raw data preservation** - loading raw data first means the original source data is always available. When business requirements change or new AI use cases emerge, you can re-transform the raw data without re-extracting from source systems.

**Faster iteration** - data analysts and engineers can modify transformations using SQL without changing extraction pipelines. New transformations are just new queries against already-loaded raw data.

**Simpler pipeline architecture** - the extraction and loading pipeline is straightforward (move data as-is). Transformation logic lives in the destination system as SQL models, which are easier to version, test, and debug.

**Tools like dbt** (data build tool) have popularized ELT by providing a framework for managing SQL transformations as code: version control, testing, documentation, and dependency management for transformation logic.

## Practical Guidance

Use ELT when your destination system has sufficient compute for transformations (Redshift, BigQuery) and when you want to preserve raw data for flexibility. Use traditional ETL when transformations require complex processing beyond SQL (ML feature engineering, image processing) or when the destination system lacks transform compute. Many organizations use a hybrid: ELT for structured data transformations and ETL for complex or unstructured data processing.

## Sources

- Stonebraker, M., & Cetintemel, U. (2005). "One size fits all": An idea whose time has come and gone. *ICDE 2005*. (Argued for specialized analytics engines over general-purpose databases; foundational for the cloud warehouse approach ELT relies on.)
- Armbrust, M., et al. (2021). Lakehouse: A new generation of open platforms that unify data warehousing and advanced analytics. *CIDR 2021*. (Lakehouse architecture; unified ELT and ML pipeline patterns.)
- Gorman, C., & Wagner, T. (2021). *The Analytics Engineering Guide*. dbt Labs. (Modern ELT and analytics engineering practices; defines the role of SQL-based transformations as code in ELT workflows.)
