---
title: "Implementing a Data Catalog for AI Teams"
description: "How to implement metadata management with DataHub or OpenMetadata: automated ingestion, data lineage, ownership, classification, and integration with ML workflows."
date: 2026-03-28
categories: [Guides]
tags: [data-catalog, metadata, datahub, openmetadata, data-governance, data-engineering]
related:
  - glossary/data-catalog
  - glossary/data-contract
  - guides/data-quality-ai
last_updated: 2026-05-30
---

AI teams spend a disproportionate amount of time finding and understanding data. A data catalog reduces discovery time from days to minutes by providing searchable metadata, lineage tracking, and ownership information for every dataset in the organisation. This guide covers implementing a data catalog using DataHub or OpenMetadata, with a focus on serving AI/ML use cases.

## Choosing a Catalog Platform

### DataHub (LinkedIn)

DataHub is a metadata platform with a rich feature set:

- **Automated ingestion** from 50+ sources (databases, warehouses, dashboards, pipelines)
- **Data lineage** across transformation layers
- **Fine-grained access control** and data classification
- **GraphQL API** for programmatic access
- **Active open-source community** with enterprise support available

Best for organisations with complex data estates and strong governance requirements.

### OpenMetadata

OpenMetadata emphasises simplicity and collaboration:

- **Clean UI** with good search and discovery
- **Built-in data quality** integration (Great Expectations, Deequ)
- **Data profiling** with automated statistics
- **Collaboration features** (conversations, tasks, announcements on datasets)
- **REST API** for integrations

Best for teams that want a catalog up and running quickly with less configuration overhead.

### AWS Glue Data Catalog

For AWS-centric architectures, Glue Data Catalog provides basic cataloging integrated with Athena, Redshift, EMR, and Lake Formation. It lacks the lineage and collaboration features of DataHub or OpenMetadata but requires no infrastructure to manage.

## Implementation Steps

### Step 1: Inventory Your Data Sources

Before deploying a catalog, map the data landscape:

- Databases (PostgreSQL, MySQL, DynamoDB)
- Data warehouses (Redshift, BigQuery, Snowflake)
- Object storage (S3 buckets with training data, model artifacts)
- Streaming platforms (Kafka topics)
- Feature stores (Feast, Tecton)
- ML experiment tracking (MLflow, Weights & Biases)

### Step 2: Deploy and Configure Ingestion

DataHub example with Docker Compose for initial deployment:

```bash
# Deploy DataHub
python3 -m datahub docker quickstart

# Configure a PostgreSQL ingestion source
datahub ingest -c postgres_recipe.yaml
```

Ingestion recipe for a PostgreSQL database:

```yaml
source:
  type: postgres
  config:
    host_port: "postgres.internal:5432"
    database: ml_features
    username: "${POSTGRES_USER}"
    password: "${POSTGRES_PASSWORD}"
    include_tables: true
    include_views: true
    profiling:
      enabled: true
      profile_table_level_only: false

sink:
  type: datahub-rest
  config:
    server: "http://datahub:8080"
```

Schedule ingestion to run on a cron (every 6-12 hours) to keep metadata current.

### Step 3: Establish Ownership

Assign every dataset an owner. Ownership means:

- Responding to questions about the data
- Reviewing and approving schema changes
- Maintaining documentation and quality expectations
- Being the contact point when downstream consumers have issues

Enforce ownership through automation: reject catalog entries without an assigned owner.

### Step 4: Add Business Context

Technical metadata (column types, row counts) is automatically ingested. Business context requires human input:

- **Descriptions** - What does this table represent? What business process produces it?
- **Column documentation** - What does each column mean in business terms?
- **Tags and glossary terms** - Map columns to business glossary terms (revenue, churn, LTV)
- **Classification** - PII, confidential, public, licensed data

Start with the 20 most-used datasets. Populate metadata during team onboarding or data review sessions.

### Step 5: Enable Data Lineage

Lineage shows how data flows from source to destination. Configure lineage ingestion for:

- **ETL/ELT tools** - Airflow, dbt, Spark jobs
- **Streaming pipelines** - Kafka topic-to-topic transformations
- **ML pipelines** - Which datasets feed which models

DataHub and OpenMetadata can ingest lineage from Airflow DAGs, dbt manifests, and Spark query plans automatically.

### Step 6: Integrate with ML Workflows

Make the catalog useful for ML teams specifically:

- **Training data discovery** - ML engineers search the catalog for datasets relevant to their use case
- **Feature store integration** - Catalog feature definitions with their computation logic and source data
- **Model-to-data lineage** - Link models in the model registry to the training data in the catalog
- **Data quality integration** - Surface Great Expectations or Deequ results alongside dataset metadata

## Driving Adoption

A catalog only provides value if people use it. Drive adoption by:

- Making the catalog the first place people look for data (bookmark it, integrate with Slack)
- Including catalog links in pipeline code, notebooks, and documentation
- Tracking adoption metrics: search volume, dataset views, documentation coverage
- Recognising teams that maintain excellent metadata

A data catalog is not a project with an end date. It is an ongoing practice that improves as more metadata is added and more teams contribute.
