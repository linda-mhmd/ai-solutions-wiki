---
title: "Azure Data Factory - Cloud Data Integration and ETL"
description: "Azure Data Factory is a managed cloud ETL service for building data integration pipelines that move and transform data at scale across cloud and on-premises sources."
date: 2026-03-28
categories: [Tools]
tags: [azure, etl, data-integration, data-pipeline, orchestration]
related:
  - tools/amazon-glue
  - tools/azure-synapse-analytics
last_updated: 2026-05-30
---

Azure Data Factory (ADF) is Microsoft Azure's cloud-based data integration service that enables the creation of data-driven workflows for orchestrating and automating data movement and data transformation at scale. It provides a visual authoring environment for building ETL (Extract, Transform, Load) and ELT pipelines that connect to more than 100 built-in data connectors spanning cloud services, on-premises databases, SaaS applications, and file systems. For AI workloads, Data Factory is the primary tool for preparing and delivering training data to Azure Machine Learning, populating feature stores, and moving model outputs to downstream analytics systems.

Data Factory pipelines are composed of activities that define actions to perform on data. Copy activities move data between source and sink data stores. Data flow activities perform code-free data transformations using a visual designer that generates Spark code under the hood. External activities execute processing in other services such as Azure Databricks, Azure Machine Learning, or stored procedures in SQL databases. Pipelines support branching, looping, parameterization, and dependency chaining, enabling complex orchestration scenarios. Triggers start pipeline execution on a schedule, in response to events (such as new files arriving in Blob Storage), or based on tumbling windows for incremental data processing.

The managed integration runtime handles data movement and transformation execution. A self-hosted integration runtime enables connectivity to on-premises data sources behind firewalls without opening inbound ports. ADF also provides built-in data lineage tracking through Microsoft Purview integration, giving teams visibility into where data originates, how it is transformed, and where it is consumed -- critical for regulated AI applications that require data provenance documentation.

Official documentation: https://learn.microsoft.com/en-us/azure/data-factory/

## Key Capabilities

- **100+ Connectors** - Built-in connectors to cloud services, databases, SaaS applications, file systems, and REST APIs enable data movement from virtually any source
- **Mapping Data Flows** - Visual, code-free data transformation designer that generates optimized Spark code for execution on managed compute clusters
- **Event-Driven Triggers** - Storage event triggers, custom event triggers, and tumbling window triggers enable reactive and incremental data processing patterns
- **Data Lineage** - Integration with Microsoft Purview provides automatic data lineage tracking across the entire data estate

## AWS Equivalent

Azure Data Factory is Azure's counterpart to AWS Glue. Both provide managed ETL and data integration, but ADF emphasizes a visual pipeline orchestration model with extensive connector support, while Glue leans more heavily on code-first Spark ETL with its crawlers and data catalog. ADF's pipeline orchestration capabilities are broader, covering workflow orchestration that AWS typically addresses with Step Functions.

## Origins and History

Azure Data Factory v1 launched in general availability in August 2015, offering basic data movement pipelines. Data Factory v2, a major rewrite with support for branching, looping, parameterization, and SSIS integration runtime, reached GA in November 2018. Mapping Data Flows, the visual transformation capability powered by Spark, was added in GA in September 2019. The service has been progressively enhanced with features including CI/CD integration with Azure DevOps, managed virtual network support, and Microsoft Purview lineage integration throughout 2020-2023.

## Sources

1. Microsoft Learn. "What is Azure Data Factory?" https://learn.microsoft.com/en-us/azure/data-factory/introduction
2. Microsoft Azure Blog. "Azure Data Factory V2 is now generally available." November 2018. https://azure.microsoft.com/en-us/blog/azure-data-factory-now-generally-available/
