---
title: "Amazon Kendra - Intelligent Enterprise Search"
description: "A comprehensive reference for Amazon Kendra: ML-powered enterprise search, document indexing, natural language queries, and integration patterns for AI projects."
date: 2026-03-28
categories: [Tools]
tags: [amazon-kendra, AWS, search, NLP, enterprise-search, RAG]
related:
  - tools/amazon-bedrock
  - tools/amazon-opensearch
  - tools/aws-s3
last_updated: 2026-05-30
---

Amazon Kendra is a managed enterprise search service from AWS that uses machine learning to return relevant answers from unstructured data. Unlike keyword-based search engines, Kendra understands natural language queries and returns precise answers extracted from documents rather than just a list of matching files. For AI projects, Kendra serves as a high-quality retrieval layer that can feed into generative AI workflows or stand alone as an intelligent search solution.

Official documentation: https://docs.aws.amazon.com/kendra/
Pricing: https://aws.amazon.com/kendra/pricing/
Service quotas: https://docs.aws.amazon.com/kendra/latest/dg/quotas.html

## Core Concepts

**Index** - The primary resource in Kendra. An index holds the ingested documents and their metadata. You configure the index with an edition (Developer for prototyping, Enterprise for production) and assign IAM roles for data access.

**Data Sources** - Connectors that pull documents into the index. Kendra provides native connectors for S3, RDS, SharePoint, Confluence, Salesforce, ServiceNow, and dozens more. Each connector handles authentication, incremental sync, and document parsing. Custom data sources are supported via the BatchPutDocument API.

**FAQs** - Structured question-answer pairs uploaded as CSV or JSON. Kendra prioritizes FAQ matches when a query closely matches a known question, providing deterministic answers for common queries.

**Experience** - A managed search application with a pre-built UI. Useful for quick deployments where building a custom frontend is not justified.

## How Kendra Differs from OpenSearch

OpenSearch is a general-purpose search and analytics engine that requires you to define index mappings, manage shards, and tune relevance scoring. Kendra abstracts all of this. You point it at documents, and it handles chunking, entity extraction, and semantic understanding automatically. The trade-off is cost and flexibility: Kendra's Enterprise edition starts at approximately $810/month for the base index, while OpenSearch Serverless can be cheaper for simpler workloads. Choose Kendra when you need high-quality natural language search out of the box. Choose OpenSearch when you need fine-grained control over indexing and ranking or when you are building vector search pipelines with custom embeddings.

## Kendra as a RAG Retriever

Kendra integrates directly with Amazon Bedrock Knowledge Bases as a retrieval source. This pattern is particularly effective because Kendra's ML-based retrieval often surfaces more relevant passages than pure vector similarity search. The integration works as follows: a user query hits Bedrock, Bedrock calls Kendra to retrieve relevant document passages, and the foundation model generates a response grounded in those passages.

For teams already using Kendra for enterprise search, adding a generative AI layer through Bedrock requires minimal additional infrastructure. The Kendra Retrieve API returns passages with confidence scores and source attribution, which the generative model can use to produce cited answers.

## Document Enrichment

Kendra supports custom document enrichment through Lambda functions that run during ingestion. Common enrichment patterns include extracting metadata from document headers, classifying documents by type, translating content, or calling Amazon Comprehend to detect entities and sentiment. Enrichment runs as a pre-processing or post-processing step and stores the results as searchable metadata fields.

## Access Control

Kendra supports document-level access control through Access Control Lists (ACLs). When documents are ingested from SharePoint or Confluence, Kendra preserves the original permissions. At query time, you pass a user token, and Kendra filters results to only documents that user is authorized to see. This is critical for enterprise deployments where search results must respect existing permission boundaries.

## Pricing Considerations

Kendra pricing has two components: the index (base cost per hour) and document storage (per document scanned). The Developer edition is capped at lower throughput and document counts but costs significantly less. For proof-of-concept work, use the Developer edition and plan for Enterprise in production. Document sync frequency also affects cost since each sync operation scans documents for changes.

## When to Use Kendra

Kendra fits well when the organization has large volumes of unstructured documents spread across multiple repositories, users need natural language search rather than keyword matching, and the team does not want to build and maintain a custom search relevance pipeline. It is less suitable for highly structured data queries (use Athena or Redshift), real-time log search (use OpenSearch), or scenarios where cost sensitivity demands a self-managed solution.
