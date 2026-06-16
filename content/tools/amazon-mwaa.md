---
title: "Amazon MWAA - Managed Workflows for Apache Airflow"
description: "Amazon MWAA is a fully managed service that runs Apache Airflow on AWS to orchestrate data, ETL, and ML pipelines without managing the infrastructure."
date: 2026-03-28
categories: [Tools]
tags: [AWS, airflow, workflow-orchestration, data-pipelines, managed-service, "aws-service"]
related:
  - tools/apache-airflow
  - tools/google-cloud-composer
  - tools/prefect
layer: orchestration
provider: aws
pricing_model: payg
maturity: production
last_updated: 2026-06-14
lastmod: 2026-06-14
enhanced_pass: "2026-06"
---

Amazon Managed Workflows for Apache Airflow (MWAA) is a fully managed service that runs open-source Apache Airflow on AWS. It handles the provisioning, patching, scaling, and maintenance of Airflow's scheduler, workers, and web server, allowing teams to focus on writing DAGs rather than managing infrastructure. MWAA integrates natively with AWS services including Amazon S3, AWS Glue, Amazon EMR, Amazon SageMaker, and AWS Lambda, making it a common choice for orchestrating data and ML pipelines within the AWS ecosystem.

As of June 2026, Amazon MWAA supports Apache Airflow 3.x (3.0.6 since October 2025 and 3.2.1 since May 2026) alongside the 2.x line (2.11.0 since January 2026), all on Python 3.12. MWAA is generally available, actively maintained, and not deprecated.

Official documentation: https://docs.aws.amazon.com/mwaa/
Pricing: https://aws.amazon.com/managed-workflows-for-apache-airflow/pricing/
Service quotas: https://docs.aws.amazon.com/mwaa/latest/userguide/quotas.html

## Foundations for beginners

If you are new to this area, a few concepts make the rest of the page easier to follow.

- **Workflow orchestration** - coordinating many separate steps (run a script, wait for a file, train a model, send a report) so they run in the right order, retry on failure, and run on a schedule or in response to an event. See {{< relref "glossary/workflow-engine" >}}.
- **DAG (Directed Acyclic Graph)** - the way Airflow describes a workflow: a set of tasks with arrows showing what must finish before what, with no loops back on itself. In Airflow you write a DAG as a Python file.
- **ETL (Extract, Transform, Load)** - a common kind of data pipeline that pulls data from sources, reshapes it, and writes it somewhere usable. Orchestrators like MWAA are most often used to run ETL on a schedule. See {{< relref "glossary/etl" >}}.
- **Managed service** - AWS runs the servers, applies patches, and handles scaling, so you do not install or maintain Airflow yourself. You provide the workflow code, AWS runs the platform.

In an AI context, the same orchestration is what schedules data preparation, model training, batch inference, and retraining loops. That makes MWAA a building block for {{< relref "glossary/mlops" >}}, the practice of operating machine learning systems reliably in production. The underlying engine is the same open-source {{< relref "tools/apache-airflow" >}}, so skills and DAG code are portable between MWAA, self-hosted Airflow, and {{< relref "tools/google-cloud-composer" >}}.

## Key Capabilities

- **Managed Airflow Infrastructure** - Automatically provisions and scales Airflow schedulers, workers, and web servers with no need to manage Amazon EC2 instances, containers, or databases for metadata storage
- **Native AWS Integration** - Pre-configured connections to AWS services via Airflow provider packages, enabling DAGs to orchestrate Amazon S3 operations, AWS Glue crawlers, Amazon EMR clusters, Amazon SageMaker training jobs, and more
- **DAG Storage on Amazon S3** - DAG files, plugins, and requirements are stored in Amazon S3 and automatically synced to the Airflow environment, simplifying CI/CD workflows for pipeline code
- **Private Network Isolation** - Environments run within a customer VPC with configurable public or private web server access, meeting enterprise security requirements
- **Apache Airflow 3 support** - The Airflow 3.x line on MWAA brings a redesigned React-based web UI, DAG versioning, event-driven scheduling backed by assets (formerly datasets), the new Task SDK and Task Execution API (which keeps tasks from accessing the metadata database directly), and scheduler-managed backfills. MWAA stays close to upstream Airflow, so these are the same features the open-source community ships.

## Deployment models: environments and Serverless

MWAA offers two ways to run Airflow, and the right one depends on how steady your workload is.

- **MWAA environments (standard)** - You create an environment and pick a size class (for example Small or Large). AWS keeps the scheduler, web server, and a base worker fleet running, and auto-scales extra workers when DAGs get busy. You are billed per hour (at one-second resolution) for the environment, any added workers, schedulers, and web servers, plus metadata database storage. This model suits pipelines that run regularly throughout the day.
- **MWAA Serverless** - Announced on 17 November 2025, this option removes environment provisioning entirely. AWS provisions and scales compute per task, you define workflows as Python DAGs or YAML, and you pay per task for its duration (billed per second, minimum one minute) with no charge for idle infrastructure. It draws on the AWS operators from Apache Airflow 3.0 and gives each workflow its own IAM permissions. This model suits intermittent or bursty workloads where keeping an always-on environment would waste money.

Both run the same open-source Airflow, so DAGs are broadly portable between them.

## AWS/Cloud Equivalent

Amazon MWAA is the AWS-managed version of {{< relref "tools/apache-airflow" >}}. {{< relref "tools/google-cloud-composer" >}} provides the equivalent managed Airflow service on GCP. {{< relref "tools/azure-data-factory" >}} offers a different approach to workflow orchestration with a visual designer rather than code-first DAGs, though Azure also offers managed Airflow through Azure Data Factory's Workflow Orchestration Manager. {{< relref "tools/prefect" >}} and Dagster are modern open-source alternatives that address some of Airflow's architectural limitations, particularly around dynamic workflows and local development experience. Within AWS, {{< relref "tools/aws-step-functions" >}} is a serverless alternative for orchestrating AWS services with a state-machine model rather than Python DAGs.

## Origins and History

Amazon MWAA was announced at AWS re:Invent 2020 and reached general availability in late 2020. The service was created to address the operational complexity of self-hosting Apache Airflow, which requires managing a scheduler, web server, metadata database, and worker fleet. Before MWAA, AWS customers typically ran Airflow on Amazon ECS, Amazon EKS, or Amazon EC2 with significant operational overhead. MWAA tracks upstream Airflow releases, typically making new versions available within a few months of their open-source release.

Recent milestones reflect that cadence. MWAA added Apache Airflow 3.0 support on 1 October 2025, bringing the redesigned UI, event-driven scheduling, the Task SDK, and DAG versioning. On 17 November 2025 AWS introduced the MWAA Serverless deployment option. Airflow 2.11 arrived on 7 January 2026 and Airflow 3.2.1 on 19 May 2026. MWAA follows the Apache Airflow community version policy: it commits to supporting at least three minor versions at a time and announces an end-of-support date at least 180 days in advance. Versions v2.4.3, v2.5.1, and v2.6.3 reached end of support on 30 December 2025, after which they can no longer be used to create new environments.

## Best practices

AWS publishes specific guidance for running MWAA well. For architecture and operations, see the MWAA best practices in the user guide (managing Python dependencies with a `--constraint` file, environment sizing, and monitoring), and apply the broader [AWS Well-Architected Framework](https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html), in particular the Operational Excellence and Cost Optimization pillars, when deciding between standard environments and Serverless. Practical defaults: keep DAG code small and idempotent, pin dependencies, store secrets in AWS Secrets Manager rather than in DAGs, and prefer the latest supported Airflow version for current security and reliability fixes.

## Sources

1. AWS. "Amazon Managed Workflows for Apache Airflow Documentation." https://docs.aws.amazon.com/mwaa/
2. AWS. "Apache Airflow versions on Amazon Managed Workflows for Apache Airflow." https://docs.aws.amazon.com/mwaa/latest/userguide/airflow-versions.html
3. AWS Big Data Blog. "Introducing Apache Airflow 3 on Amazon MWAA: New features and capabilities." 1 October 2025. https://aws.amazon.com/blogs/big-data/introducing-apache-airflow-3-on-amazon-mwaa-new-features-and-capabilities
4. AWS. "Amazon MWAA Introduces Serverless Deployment Option for Apache Airflow Workflows." 17 November 2025. https://aws.amazon.com/about-aws/whats-new/2025/11/mwaa-serverless-deployment-apache-airflow-workflows/
5. AWS. "Amazon MWAA now supports Apache Airflow 3.2." April 2026. https://aws.amazon.com/about-aws/whats-new/2026/04/amazon-mwaa-now-supports-apache-airflow-3-2/
6. AWS. "Amazon Managed Workflows for Apache Airflow Pricing." https://aws.amazon.com/managed-workflows-for-apache-airflow/pricing/
7. Apache Software Foundation. "apache-airflow (source repository)." https://github.com/apache/airflow
8. Apache Airflow. "Amazon provider package documentation." https://airflow.apache.org/docs/apache-airflow-providers-amazon/stable/index.html
