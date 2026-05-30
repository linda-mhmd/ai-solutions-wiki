---
title: "Data Catalog"
description: "What a data catalog is, how metadata management and data discovery tools help AI teams find, understand, and trust their data assets."
date: 2026-03-28
categories: [Glossary]
tags: [data-catalog, metadata, data-discovery, data-governance, data-engineering]
related:
  - guides/data-catalog-implementation
  - glossary/data-contract
  - glossary/data-quality
last_updated: 2026-05-30
---

A data catalog is a centralised inventory of an organisation's data assets with metadata that describes what data exists, where it lives, who owns it, how it was created, and how it should be used. It is a search engine for data.

In organisations with hundreds of databases, data lakes, and streaming pipelines, data discovery is a real problem. Data scientists spend significant time finding and understanding data rather than using it. A data catalog reduces this discovery time from days to minutes.

## Core Capabilities

**Automated Metadata Ingestion** - Crawlers connect to databases, data lakes, warehouses, and streaming platforms to automatically catalogue tables, columns, schemas, and statistics. This eliminates manual registration and keeps the catalog current.

**Search and Discovery** - Full-text search across table names, column names, descriptions, and tags. Users search for "customer churn" and find relevant tables, dashboards, and pipelines across the entire data estate.

**Data Lineage** - Visual representation of how data flows from source to destination. Lineage shows which upstream tables feed a model's training data, which transformations were applied, and which downstream reports depend on a given table. This is critical for debugging data quality issues and assessing change impact.

**Ownership and Documentation** - Each dataset has a designated owner, description, and usage notes. Domain experts annotate columns with business context that technical metadata alone cannot convey.

**Classification and Tagging** - Automated PII detection, sensitivity classification, and custom tagging. AI teams need to know which datasets contain personal data, which are approved for training, and which have licensing restrictions.

**Usage Analytics** - Tracks which datasets are queried most frequently, by whom, and how recently. Popular datasets are likely well-maintained. Datasets with no recent queries may be candidates for deprecation.

## Key Tools

**DataHub** (LinkedIn, open-source) - A metadata platform with automated ingestion, lineage, and governance features. Supports a wide range of connectors.

**OpenMetadata** - An open-source catalog emphasising data quality, lineage, and collaboration. Provides a clean UI and strong API.

**AWS Glue Data Catalog** - A managed metadata store integrated with Athena, Redshift, EMR, and Lake Formation. Best suited for AWS-centric architectures.

**Amundsen** (Lyft, open-source) - Focused on search and discovery with a simple, effective interface.

For AI teams, a data catalog answers the most common question: "Is there data I can use for this, and can I trust it?"

## Sources

- Dama International. (2017). *DAMA-DMBOK: Data Management Body of Knowledge* (2nd ed.). Technics Publications. (Standard reference for data governance including catalog and metadata management practices.)
- Terrizzano, I., Schwarz, P., Roth, M., & Colino, J. (2015). Data wrangling: The challenging journey from the wild to the lake. *CIDR 2015*. (Described data discovery challenges that motivated modern data catalog solutions.)
- Hai, R., Geisler, S., & Quix, C. (2016). Constance: An intelligent data lake system. *SIGMOD 2016*. (Early academic data lake catalog system; foundation for modern automated metadata ingestion approaches.)
