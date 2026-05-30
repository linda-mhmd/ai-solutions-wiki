---
title: "Data Warehouse"
description: "What a data warehouse is, how it supports analytical queries on structured data, and how it complements data lakes for AI workloads."
date: 2026-03-28
categories: [Glossary]
tags: [data-warehouse, Redshift, analytics, BI, structured-data]
related:
  - glossary/data-lake
  - glossary/lakehouse
  - glossary/etl
  - glossary/elt
last_updated: 2026-05-30
---

A data warehouse is a centralized repository of structured, processed data optimized for fast analytical queries. Data is transformed and loaded into a predefined schema (schema-on-write), enabling consistent, repeatable queries for business intelligence, reporting, and dashboards.

## How It Works

Data from operational systems (databases, CRMs, ERPs, SaaS applications) is extracted, transformed to match the warehouse schema, and loaded through ETL or ELT pipelines. The warehouse stores data in columnar format, optimized for aggregations, joins, and scans across large datasets. Indexing and query optimization engines enable sub-second response times for complex analytical queries.

**Amazon Redshift** is AWS's managed data warehouse. It uses columnar storage, massively parallel processing (MPP), and result caching to deliver fast query performance at petabyte scale. Redshift Serverless eliminates capacity management, automatically scaling compute for query demand.

## Data Warehouse vs. Data Lake

Data warehouses enforce structure: data must conform to a schema before loading. This guarantees data quality and query consistency but requires upfront schema design and ETL development. Changes to the schema are disruptive. Data lakes accept any format and apply schema at read time, offering flexibility at the cost of less guaranteed consistency.

## Why It Matters for AI

Data warehouses serve as the source of clean, business-curated data for AI feature engineering. Feature stores often pull from warehouse tables because the data has already been validated, deduplicated, and conformed to business definitions. Warehouse data is also the ground truth against which model predictions are evaluated.

The pattern for most organizations: raw data lands in the data lake, ETL pipelines transform and load it into the warehouse, and both the lake (for ML training on raw data) and the warehouse (for features and business metrics) feed AI workloads.

## Practical Guidance

Use Redshift Serverless to avoid over-provisioning. Partition tables by date for time-series data. Use materialized views for frequently executed queries. Monitor query performance and costs using Redshift query monitoring rules. For organizations starting fresh, consider a lakehouse architecture that combines warehouse query performance with lake flexibility.

## Sources

- Inmon, W. H. (1992). *Building the Data Warehouse*. QED Publishing. (Coined "data warehouse"; defined the subject-oriented, integrated, non-volatile, time-variant storage concept.)
- Kimball, R., & Ross, M. (2013). *The Data Warehouse Toolkit: The Definitive Guide to Dimensional Modeling* (3rd ed.). Wiley. (Dimensional modeling standard; star schema and snowflake schema designs used in all major data warehouses.)
- Armbrust, M., et al. (2021). Lakehouse: A new generation of open platforms that unify data warehousing and advanced analytics. *CIDR 2021*. (Introduced the lakehouse concept; directly relevant to understanding how warehouses are evolving for AI workloads.)
