---
title: "Amazon HealthLake - Healthcare Data Store"
description: "AWS HealthLake reference: FHIR R4 healthcare data store with built-in medical NLP and SQL-on-FHIR analytics for health AI."
date: 2026-03-28
categories: [Tools]
tags: [AWS, healthcare, FHIR, NLP, compliance, "aws-service"]
related:
  - tools/amazon-comprehend
  - tools/amazon-bedrock
  - tools/aws-s3
  - tools/azure-health-data-services
  - tools/google-cloud-healthcare-api
layer: data
provider: aws
pricing_model: payg
maturity: production
last_updated: 2026-06-14
lastmod: 2026-06-14
enhanced_pass: "2026-06"
---

Amazon HealthLake (branded AWS HealthLake in current AWS documentation) is a HIPAA-eligible, FHIR-compliant data store for healthcare and life sciences data. It ingests, stores, and normalizes health data in the FHIR R4 standard format, then automatically enriches it using built-in medical natural language processing (NLP) to extract medical entities, relationships, traits, and protected health information (PHI) from unstructured clinical text. For AI projects in healthcare, HealthLake solves the foundational data problem: getting diverse health data into a queryable, standards-compliant format that machine learning models can consume. As of June 2026 it is a live, fully managed AWS service, not deprecated or in maintenance only.

Before the specifics, a few plain-language foundations:

- **FHIR (Fast Healthcare Interoperability Resources)** - an HL7 standard that defines a common data model and REST API for health records, so a Patient, an Observation (like a lab result), or a Condition (a diagnosis) has the same shape no matter which system produced it. HealthLake uses FHIR release 4 (R4).
- **HIPAA-eligible** - AWS has assessed the service against the U.S. Health Insurance Portability and Accountability Act and will sign a Business Associate Agreement (BAA) for it, so you may store protected health information on it under the AWS shared responsibility model.
- **Data store** - in HealthLake this is the managed FHIR repository you create; it behaves like a database plus a standards-based API.
- **NLP (natural language processing)** - software that reads free text and pulls out structured meaning, here turning a typed clinical note into coded medical facts.

It sits in the data layer of the AI stack: it is where health data is collected, standardized, and made queryable before models are trained or run on it. See {{< relref "glossary/data-lake" >}} and {{< relref "glossary/etl" >}} for the underlying data concepts, and {{< relref "glossary/llm" >}} for the model layer that consumes this data.

Official documentation: https://docs.aws.amazon.com/healthlake/latest/devguide/what-is.html
Pricing: https://aws.amazon.com/healthlake/pricing/
Service quotas: https://docs.aws.amazon.com/healthlake/latest/devguide/healthlake-quotas.html

## Core Concepts

**Data Store** - The primary resource. A HealthLake data store is a FHIR-compliant repository that accepts, stores, and serves FHIR resources (Patient, Observation, Condition, MedicationRequest, and all other FHIR R4 resource types). Data stores are encrypted at rest with AWS KMS and support fine-grained access control.

**FHIR Resources** - The unit of data in HealthLake. Each resource follows the FHIR R4 specification with a defined schema. Resources are created, read, updated, and deleted through a standard FHIR REST API. HealthLake supports individual resource operations and bundle operations for bulk processing.

**Integrated NLP** - HealthLake runs integrated medical NLP (the same models behind Amazon Comprehend Medical) on ingested data to extract medical entities, entity relationships, entity traits, and PHI. When a clinical note is stored as a DocumentReference resource, HealthLake extracts conditions, medications, dosages, procedures, and anatomical references, storing them as structured FHIR R4 resources linked to the source document. The extracted resources can then be read through the FHIR API or queried with SQL in Amazon Athena.

**Integrated analytics (SQL on FHIR)** - During an import job, HealthLake automatically transforms nested FHIR JSON into the Apache Iceberg open table format in Amazon S3, with each FHIR resource type represented as its own table. This lets you run SQL on your FHIR data directly through Amazon Athena without first exporting it, which is the basis for population health, risk stratification, and patient 360 use cases. See {{< relref "tools/amazon-athena" >}}.

**Export** - Bulk data export to S3 in NDJSON format using the FHIR Bulk Data Access (`$export`) operation. This remains useful for moving data into external systems or custom pipelines. Exports can be filtered by resource type and date range. For in-place analytics, the integrated Athena path above usually replaces the export-then-crawl pattern.

## Why FHIR Matters for AI

Health data is notoriously fragmented. A single patient's information might be spread across electronic health record (EHR) systems, lab systems, imaging systems, and claims databases, each with different formats. FHIR provides a common schema that normalizes this diversity. When your ML models consume FHIR resources, they get a consistent structure regardless of the data's origin. This removes a large category of data engineering work, the data wrangling that commonly dominates healthcare AI project timelines, so teams spend more time on modeling and less on plumbing.

## Data Ingestion Patterns

**FHIR API** - Direct create and update operations for real-time data flows. Suitable for integration with EHR systems that support FHIR natively (Epic, Cerner, and others increasingly expose FHIR APIs).

**Bulk Import** - Load large volumes of FHIR resources from S3. Use this for initial data loads and batch migrations. The import format is NDJSON with one FHIR resource per line.

**HL7v2 and C-CDA Transformation** - Many healthcare systems still use older standards. HealthLake itself ingests FHIR R4, so legacy formats must be converted first. AWS publishes sample serverless solutions for this (for example the open-source `aws-samples/mapper-for-fhir` project) and maintains an AWS HealthLake Partner network and AWS Marketplace listings (such as HiPaaS and InterSystems) that transform HL7v2 messages and C-CDA documents into FHIR. The widely used standalone FHIR Converter open-source project is maintained by Microsoft, not AWS.

## Analytics Integration

The modern pattern uses HealthLake's integrated analytics: because import jobs write Apache Iceberg tables to S3 automatically, you can query FHIR data with SQL in {{< relref "tools/amazon-athena" >}} right away, with no separate export, Glue crawler, or custom data warehouse. The older export-then-crawl pattern (export FHIR to S3, catalog it with {{< relref "tools/amazon-glue" >}}, query with Athena) still works and is useful when you need data outside AWS or in a non-Iceberg layout.

For ML workflows, the analytics-ready data feeds into {{< relref "tools/amazon-sagemaker" >}} for model training, and HealthLake data can be combined with AWS HealthImaging and AWS HealthOmics for multimodal, precision-medicine use cases. Common healthcare ML tasks include predicting readmission risk, identifying patients likely to benefit from interventions, and detecting anomalies in lab results. You can also use the standardized data to ground or fine-tune models on {{< relref "tools/amazon-bedrock" >}}.

## Compliance and Security

HealthLake is HIPAA-eligible, meaning AWS has included it in their Business Associate Agreement (BAA). Data is encrypted at rest and in transit. Access is controlled through IAM policies and SMART on FHIR authorization for clinical application integration.

Audit logging through CloudTrail captures all API calls, providing a complete access trail for compliance reporting. This is non-negotiable for healthcare data and HealthLake handles it natively. HealthLake also supports the SMART App Launch framework with OAuth 2.0 and OpenID Connect, and conforms to current ONC and CMS interoperability and patient-access rules (HL7 FHIR R4 APIs, FHIR Bulk Data Access, US Core, and SMART on FHIR).

**Best practices** - For designing on AWS, follow the AWS Well-Architected Framework, in particular the Security pillar (https://docs.aws.amazon.com/wellarchitected/latest/security-pillar/welcome.html). Encryption uses AWS KMS; see {{< relref "glossary/symmetric-encryption" >}} for the underlying concept.

## Pricing

Pricing is pay-as-you-go and changed from the early model. Confirm current rates on the official pricing page before you estimate, but the dimensions are:

- **Data store hours** - you pay per active data store per hour. This included allowance covers a baseline of FHIR queries per hour and a baseline of storage across your data stores.
- **Additional storage** - per GB per month beyond the included baseline, with separate Standard and Advanced tiers.
- **Additional FHIR query capacity** - per block of queries beyond the included baseline, again with Standard and Advanced tiers.
- **Integrated medical NLP** - charged separately, per unit of analyzed text. This is not bundled into a write cost.
- **Export and FHIR subscriptions** - export to S3 and event delivery (for example via Amazon EventBridge) are billed by volume.

For large-scale deployments, NLP on high-volume free text and the per-data-store-hour charge are usually the cost drivers, so estimate based on the volume of unstructured text and the number of always-on data stores. Use the AWS Pricing Calculator (https://calculator.aws/#/addService/HealthLake) for a current estimate.

## Sources

- What is AWS HealthLake (official developer guide): https://docs.aws.amazon.com/healthlake/latest/devguide/what-is.html
- Querying HealthLake data with Amazon Athena (Apache Iceberg / SQL on FHIR): https://docs.aws.amazon.com/healthlake/latest/devguide/integrating-athena.html
- AWS HealthLake pricing: https://aws.amazon.com/healthlake/pricing/
- AWS HealthLake product page: https://aws.amazon.com/healthlake/
- New FHIR API capabilities for ONC and CMS interoperability and patient access rules (AWS for Industries blog): https://aws.amazon.com/blogs/industries/new-fhir-api-capabilities-on-amazon-healthlake-helps-customers-accelerate-data-exchange-and-meet-onc-and-cms-interoperability-and-patient-access-rules/
- HL7 FHIR R4 specification: https://hl7.org/fhir/R4/
- AWS sample: HL7v2 to FHIR mapper (`aws-samples/mapper-for-fhir`): https://github.com/aws-samples/mapper-for-fhir
- FHIR Converter open-source project (Microsoft): https://github.com/microsoft/FHIR-Converter
