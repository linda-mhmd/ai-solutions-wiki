---
title: "AWS Glue - Serverless ETL and Data Integration"
description: "A reference for AWS Glue: serverless data integration, ETL jobs, the Data Catalog, and data preparation for AI and ML pipelines."
date: 2026-03-28
categories: [Tools]
tags: [AWS, ETL, data-integration, data-catalog, serverless, "aws-service"]
related:
  - tools/aws-s3
  - tools/amazon-athena
  - tools/amazon-sagemaker
  - tools/amazon-redshift
  - tools/amazon-emr
  - tools/apache-spark
  - tools/azure-data-factory
  - tools/google-cloud-dataflow
  - tools/dbt
layer: data
provider: aws
pricing_model: payg
maturity: production
last_updated: 2026-06-14
lastmod: 2026-06-14
enhanced_pass: "2026-06"
---

AWS Glue (officially AWS Glue, sometimes written Amazon Glue) is a serverless data integration service that provides ETL (Extract, Transform, Load) capabilities and a centralized metadata catalog. Data integration is the work of moving data from where it is produced (databases, files, applications, event streams) into a form and a place where it can be analyzed or used to train models. Glue does this work for you without provisioning servers: it crawls data sources to discover their structure, runs transformation jobs on managed Apache Spark, and keeps a catalog that makes the data discoverable across an organization. For AI projects, Glue handles the data engineering that precedes model training: discovering schemas, cleaning raw data into usable features, and recording where each dataset came from.

Official documentation: https://docs.aws.amazon.com/glue/
Pricing: https://aws.amazon.com/glue/pricing/
Service quotas: https://docs.aws.amazon.com/glue/latest/dg/limits.html

## Foundations to know first

If these ideas are new, read them before the specifics below.

- **ETL** - extract data from sources, transform it (clean, reshape, join), and load it into a target. See {{< relref "glossary/etl" >}} and the related {{< relref "glossary/elt" >}} pattern.
- **Serverless** - you run code without managing servers; the provider scales capacity and you pay only for what runs. See {{< relref "glossary/serverless" >}}.
- **Data Catalog** - a searchable index of what data you have and what its columns mean. See {{< relref "glossary/data-catalog" >}}.
- **Data lake** - a central store (usually object storage) holding raw and processed data in open formats. See {{< relref "glossary/data-lake" >}} and {{< relref "tools/aws-s3" >}}.
- **Apache Spark** - the distributed processing engine Glue uses to transform large datasets in parallel. See {{< relref "tools/apache-spark" >}}.

## Core Concepts

**Data Catalog** - A centralized metadata repository that stores table definitions, schemas, and partition information. It is a drop-in replacement for the Apache Hive Metastore. Crawlers automatically populate the catalog by scanning data sources (Amazon S3, Amazon RDS, Amazon Redshift, Amazon DynamoDB, and others). Once cataloged, data is queryable through Amazon Athena, Amazon Redshift Spectrum, and Amazon EMR without manual schema definition. Access can be governed with AWS Identity and Access Management (IAM) and AWS Lake Formation.

**Crawler** - An automated process that connects to a data store, infers the schema, and creates or updates table definitions in the Data Catalog. Crawlers handle format detection (CSV, JSON, Parquet, Avro, ORC), schema inference (column names and types), and partition detection (for data organized in Hive-style partitions like year=2025/month=03/).

**ETL Job** - A processing job that reads data from sources, applies transformations, and writes results to targets. Spark jobs can be authored in Python (PySpark) or Scala, using either the Glue-specific DynamicFrame API or standard Spark DataFrames. Glue also offers Python shell jobs for lightweight, single-node tasks. Glue provisions and manages the infrastructure automatically. You can build jobs visually on a canvas (AWS Glue Studio) or write the script directly.

**Workflow and trigger** - Orchestration mechanisms that chain crawlers, ETL jobs, and other steps into a sequence. Triggers start jobs on a schedule, on demand, or on an event such as the arrival of new data. Workflows define dependencies between jobs and handle conditional execution and error handling.

**Streaming ETL** - Continuously running jobs built on Spark Structured Streaming that ingest from Amazon Kinesis Data Streams, Apache Kafka, and Amazon MSK, then clean and load the data into Amazon S3 or JDBC stores. Use it for clickstreams, IoT, and log data. See {{< relref "glossary/stream-processing" >}}.

## Glue for ML Data Preparation

The typical ML data preparation pipeline in Glue follows this pattern:

1. Crawl source data (databases, S3 files, APIs via custom connectors) to catalog schemas.
2. Run ETL jobs to clean data: handle nulls, deduplicate, standardize formats, resolve schema inconsistencies.
3. Compute features: aggregate, join, pivot, and derive new columns from raw data.
4. Write output to S3 in Parquet format, partitioned by date or entity, ready for SageMaker training.

Glue is well-suited for data preparation tasks up to moderate scale (tens of GB to low TB). For datasets in the multi-TB range, Amazon EMR provides more control and often better performance. See {{< relref "tools/amazon-emr" >}}.

## Glue versions and engines

The Glue version you select for a job determines the Apache Spark and Python runtime. As of June 2026, AWS Glue 5.1 (released 26 November 2025) is the latest and the default for new Spark jobs. It runs Apache Spark 3.5.6, Python 3.11, and Java 17. AWS Glue 5.0 (December 2024) introduced Spark 3.5.x and Python 3.11. Older versions are reaching end of life: AWS Glue 2.0, 1.0, and 0.9 ended support on 1 April 2026, so existing jobs on those versions should be migrated to 5.x. Always confirm the current default and supported versions in the release notes before pinning a version.

AWS Glue for Ray (a Python-native engine for distributed compute) will no longer be open to new customers from 30 April 2026. Existing users can continue, but AWS recommends Amazon Elastic Kubernetes Service (EKS) with the open-source KubeRay operator for new Ray workloads. Spark and Python shell jobs are unaffected.

## Glue DataBrew

Glue DataBrew is a visual data preparation tool for users who prefer a no-code interface. It provides 250+ pre-built transformations (string cleaning, date parsing, statistical imputation, outlier detection) accessible through a visual interface. DataBrew generates profiling reports that summarize data quality metrics, distributions, and correlations.

For AI projects, DataBrew is useful during the exploration phase: data scientists can profile datasets, understand distributions, and prototype transformations visually before codifying them in ETL jobs for production.

## Glue Data Quality

Glue Data Quality (built on the open-source Deequ library) enables you to define and evaluate data quality rules. Rules check for completeness (column X is never null), uniqueness (column Y has no duplicates), freshness (data was updated within the last 24 hours), and statistical bounds (column Z mean is between 10 and 20). It can recommend rules automatically and detect anomalies in data patterns over time. See {{< relref "glossary/data-quality" >}}.

Integrate data quality checks into your ML pipeline to catch data issues before they corrupt model training. A quality check failure can trigger an alert or halt the pipeline before bad data reaches the training job. Glue also offers sensitive data detection that uses pattern matching and machine learning to identify and mask personally identifiable information (PII) such as government IDs and credit card numbers during a job.

## Job Bookmarks

Glue Job Bookmarks track which data has already been processed, enabling incremental ETL. When a job runs with bookmarks enabled, it only processes new or modified data since the last run. This is essential for daily or hourly pipeline runs where reprocessing the entire dataset would be wasteful. For source-side incremental loading at the database level, pair this with {{< relref "glossary/change-data-capture" >}}.

## Recent developments (2024-2026)

- **Generative AI assistance.** AWS added generative AI upgrades for Apache Spark, powered by Amazon Bedrock, that analyze an existing Spark job and propose the script and configuration changes needed to move it to a newer Glue version. AWS Glue Studio also includes an AI assistant (Amazon Q) for authoring and troubleshooting ETL.
- **Zero-ETL integrations.** Glue and the broader AWS data stack now support fully managed zero-ETL integrations that replicate data from applications such as Salesforce, SAP, ServiceNow, and Zendesk into Amazon SageMaker Lakehouse and Amazon Redshift, reducing the need to hand-build pipelines for common sources.
- **SageMaker Lakehouse and Apache Iceberg.** Glue is a primary engine for Amazon SageMaker Lakehouse, which unifies Amazon S3 data lakes and Amazon Redshift warehouses behind the Apache Iceberg REST Catalog so multiple engines can query one copy of the data.

## Pricing

AWS Glue is pay-as-you-go with no upfront cost. ETL jobs and interactive sessions are billed per second (with a 1-minute minimum per run) at $0.44 per DPU-hour, where each DPU (Data Processing Unit) provides 4 vCPUs and 16 GB of memory. For latency-tolerant batch jobs, Flex execution uses spare capacity at a lower $0.29 per DPU-hour. Crawlers are also billed per DPU-hour consumed. The Data Catalog stores the first million objects and serves the first million requests per month for free, then charges $1 per 100,000 objects per month above that. Rates can change and vary by Region, so confirm current numbers on the pricing page. For cost control, right-size the number of workers, use Flex for non-urgent jobs, and use job bookmarks to avoid reprocessing data.

## Best practices

Glue is the data integration layer of an analytics platform, so apply the data and cost guidance in the AWS Well-Architected Framework: see the [Data Analytics Lens](https://docs.aws.amazon.com/wellarchitected/latest/analytics-lens/analytics-lens.html) for pipeline design, and the [Cost Optimization Pillar](https://docs.aws.amazon.com/wellarchitected/latest/cost-optimization-pillar/welcome.html) for right-sizing workers and choosing Flex. For internal context, see {{< relref "foundations/well-architected" >}}. Govern catalog access with AWS Lake Formation and IAM, and record dataset provenance with {{< relref "glossary/data-lineage" >}}.

## Sources

- AWS Glue product page: https://aws.amazon.com/glue/
- AWS Glue features: https://aws.amazon.com/glue/features/
- AWS Glue versions and release notes: https://docs.aws.amazon.com/glue/latest/dg/release-notes.html
- AWS Glue version support policy: https://docs.aws.amazon.com/glue/latest/dg/glue-version-support-policy.html
- AWS Glue pricing: https://aws.amazon.com/glue/pricing/
- AWS Glue components overview: https://docs.aws.amazon.com/glue/latest/dg/components-overview.html
- AWS Glue for Ray end of support: https://docs.aws.amazon.com/glue/latest/dg/awsglue-ray-jobs-availability-change.html
- Generative AI upgrades for Apache Spark in AWS Glue: https://aws.amazon.com/about-aws/whats-new/2024/11/generative-ai-upgrades-apache-spark-glue-preview
- AWS Glue zero-ETL integrations: https://docs.aws.amazon.com/glue/latest/dg/zero-etl-using.html
- AWS Glue DataBrew (visual data preparation): https://aws.amazon.com/glue/features/databrew/
- AWS Glue Data Quality and the Deequ project: https://github.com/awslabs/deequ
