---
title: "dbt - Data Build Tool for Analytics Engineering"
description: "dbt (data build tool) is an open-source transformation framework that enables analytics engineers to transform data in warehouses using SQL SELECT statements."
date: 2026-03-28
categories: [Tools]
tags: [open-source, data-transformation, analytics-engineering, sql, etl, data-warehouse]
related:
  - tools/amazon-redshift
  - tools/clickhouse
  - tools/apache-airflow
  - tools/great-expectations
  - tools/prefect
last_updated: 2026-05-30
---

dbt (data build tool) is an open-source command-line tool that enables analytics engineers to transform data inside their data warehouses by writing SQL SELECT statements. dbt handles the boilerplate of materializing those SELECT statements as tables and views, managing dependencies between models, running tests, generating documentation, and building a dependency-aware execution graph. By applying software engineering practices -- version control, testing, documentation, modularity, and CI/CD -- to the analytics workflow, dbt has defined the discipline of "analytics engineering."

dbt operates on the ELT (Extract, Load, Transform) paradigm: data is first loaded into a warehouse by extraction tools (Fivetran, Airbyte, Stitch), and then dbt handles the "T" (Transform) inside the warehouse using the warehouse's own compute. Models are SQL files that define transformations as SELECT statements, with Jinja templating for dynamic SQL generation, macros for reusable logic, and ref() functions for dependency management. dbt automatically infers the DAG of model dependencies and executes them in the correct order. Built-in testing validates data assumptions (uniqueness, not-null, referential integrity, accepted values), and dbt generates a browsable documentation site with lineage graphs.

dbt supports all major analytical databases including Snowflake, BigQuery, Redshift, Databricks, PostgreSQL, DuckDB, and many others via community-maintained adapters. It has become an essential tool in the modern data stack, used by thousands of companies from startups to enterprises including JetBlue, Hubspot, and GitLab.

## Key Capabilities

- **SQL-Based Transformations** - Define data models as SELECT statements with Jinja templating, macros, and automatic dependency resolution
- **Data Testing** - Built-in and custom tests for schema validation, data quality assertions, and referential integrity checks
- **Documentation and Lineage** - Auto-generated documentation site with column descriptions, model descriptions, and interactive DAG lineage visualization
- **Multi-Warehouse Support** - Adapters for Snowflake, BigQuery, Redshift, Databricks, PostgreSQL, DuckDB, and 30+ other databases

## Cloud Equivalents

dbt is the open-source alternative to the transformation capabilities in AWS Glue, Azure Data Factory Mapping Data Flows, and Google Cloud Dataform (which Google acquired and integrated with BigQuery). Unlike visual ETL tools, dbt embraces SQL and software engineering practices, making transformations testable, version-controlled, and reviewable.

## Origins and History

dbt was created by Tristan Handy and Drew Banin at RJMetrics in 2016. After RJMetrics was acquired, they founded Fishtown Analytics (later renamed dbt Labs) to develop dbt full-time. dbt Core is licensed under the Apache License 2.0. dbt Labs offers dbt Cloud, a managed IDE and orchestration service with CI/CD, scheduling, and collaboration features. dbt Labs has raised over $400 million in venture funding, reaching a $4.2 billion valuation. The dbt Community has grown to over 70,000 practitioners in the dbt Slack community.

## Sources

1. https://www.getdbt.com/
2. https://github.com/dbt-labs/dbt-core
