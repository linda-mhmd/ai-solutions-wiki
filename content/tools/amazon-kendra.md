---
title: "Amazon Kendra - Intelligent Enterprise Search"
description: "A comprehensive reference for Amazon Kendra: ML-powered enterprise search, document indexing, natural language queries, and integration patterns for AI projects."
date: 2026-03-28
categories: [Tools]
layer: data
provider: aws
pricing_model: payg
maturity: production
tags: [AWS, search, NLP, enterprise-search, RAG, semantic-search, "aws-service"]
related:
  - tools/amazon-bedrock
  - tools/amazon-opensearch
  - tools/aws-s3
last_updated: 2026-07-17
lastmod: 2026-07-17
enhanced_pass: "2026-06"
status: deprecated
status_detail: "AWS placed Amazon Kendra into maintenance mode effective 30 June 2026: no new features, and closed to new customers from 30 July 2026. Existing customers keep full support, with no shutdown date announced. AWS recommends new retrieval work move to Amazon Bedrock Managed Knowledge Bases. See the 2026 AWS lifecycle wave: /news/aws-service-deprecations-2026/."
---

Amazon Kendra is a managed enterprise search service from AWS that uses machine learning to return relevant answers from unstructured data. Unlike keyword-based search engines, Kendra understands natural language queries and returns precise answers extracted from documents rather than just a list of matching files. For AI projects, Kendra serves as a high-quality retrieval layer that can feed into generative AI workflows or stand alone as an intelligent search solution.

Official documentation: https://docs.aws.amazon.com/kendra/
Pricing: https://aws.amazon.com/kendra/pricing/
Service quotas: https://docs.aws.amazon.com/kendra/latest/dg/quotas.html

> **Lifecycle note (July 2026):** AWS moved Amazon Kendra into maintenance mode on 30 June 2026, and it is closed to new customers from 30 July 2026. Existing customers keep full support with no announced shutdown date, but there are no new features, and AWS recommends new retrieval work go to [Amazon Bedrock Managed Knowledge Bases](/tools/amazon-bedrock/). If you are choosing a retriever today, treat Kendra as a legacy option and read the [2026 AWS lifecycle wave](/news/aws-service-deprecations-2026/). The reference below is preserved for teams already running Kendra.

In December 2024 AWS added the GenAI Enterprise Edition index (often called the "GenAI Index"), built for retrieval augmented generation and reuse across Amazon Bedrock and Amazon Q Business. See the Core Concepts and RAG Retriever sections below.

## Foundations for beginners

If you are new to enterprise search, a few concepts make the rest of this page easier to follow.

- **Search index** - a data structure that stores documents in a form optimized for fast lookup, so a query does not have to scan every file. Kendra builds and manages this index for you.
- **Unstructured data** - content without a fixed schema, such as PDFs, web pages, wiki articles, and support tickets, as opposed to rows in a database. Kendra is built to search across exactly this kind of content.
- **Keyword search vs semantic search** - keyword search matches the literal words you type. Semantic search understands meaning, so a query for "time off policy" can find a document titled "vacation and leave." Kendra leans on semantic understanding. See {{< relref "glossary/embeddings" >}} for how meaning is turned into numbers.
- **Retrieval augmented generation (RAG)** - a pattern where a model first retrieves relevant passages from your own documents, then writes an answer grounded in them. Kendra can be the retrieval half of this pattern. See {{< relref "glossary/rag" >}}.
- **Large language model (LLM)** - the model that reads the retrieved passages and generates a natural language answer. See {{< relref "glossary/llm" >}}.

Where Kendra sits in the AI stack: it is a data-layer retrieval service. It does not generate text itself, it finds the right source passages that a generative model (for example one hosted on {{< relref "tools/amazon-bedrock" >}}) then uses to answer.

## Core Concepts

**Index** - The primary resource in Kendra. An index holds the ingested documents and their metadata. You assign IAM roles for data access and choose one of three index types: GenAI Enterprise Edition (the recommended type, built for RAG and reuse across AWS generative AI services), Enterprise Edition (high availability for production search), and Developer Edition (for testing and proof of concept, not recommended for production). The GenAI Enterprise Edition uses smaller, more granular capacity units and a lower starting price than the other two.

**Data Sources** - Connectors that pull documents into the index. Kendra provides native connectors for S3, RDS, SharePoint, Confluence, Salesforce, ServiceNow, and dozens more. Each connector handles authentication, incremental sync, and document parsing. Custom data sources are supported via the BatchPutDocument API.

**FAQs** - Structured question-answer pairs uploaded as CSV or JSON. Kendra prioritizes FAQ matches when a query closely matches a known question, providing deterministic answers for common queries.

**Experience** - A managed search application with a pre-built UI. Useful for quick deployments where building a custom frontend is not justified.

## How Kendra Differs from OpenSearch

OpenSearch is a general-purpose search and analytics engine that requires you to define index mappings, manage shards, and tune relevance scoring. Kendra abstracts all of this. You point it at documents, and it handles chunking, entity extraction, and semantic understanding automatically. The trade-off is cost and flexibility: a Kendra index runs continuously and bills per hour whether or not you query it, so even the entry tier carries a meaningful monthly floor, while OpenSearch Serverless can be cheaper for simpler workloads. See the Pricing section below for current figures. Choose Kendra when you need high-quality natural language search out of the box. Choose OpenSearch when you need fine-grained control over indexing and ranking or when you are building vector search pipelines with custom embeddings. See {{< relref "tools/amazon-opensearch" >}} for the comparison from the OpenSearch side.

## Kendra as a RAG Retriever

Kendra integrates directly with Amazon Bedrock Knowledge Bases as a retrieval source. This pattern is particularly effective because Kendra's ML-based retrieval combines keyword and vector (hybrid) search, which often surfaces more relevant passages than pure vector similarity search alone. The integration works as follows: a user query hits Bedrock, Bedrock calls Kendra to retrieve relevant document passages, and the foundation model generates a response grounded in those passages.

The recommended path is the GenAI Enterprise Edition index, which can be attached to a Bedrock knowledge base as a managed retriever and used with Bedrock agents and prompt flows. Its retrieval pipeline uses hybrid search, semantic embeddings, and re-ranker models tuned for RAG accuracy. The Kendra Retrieve API returns passages with confidence scores and source attribution, which the generative model can use to produce cited answers.

A practical advantage of the GenAI Index is data mobility: you index your content once and reuse the same index across AWS generative AI services, including Amazon Bedrock Knowledge Bases and Amazon Q Business, without rebuilding it. For teams already using Kendra for enterprise search, adding a generative AI layer requires minimal additional infrastructure.

## Document Enrichment

Kendra supports custom document enrichment through Lambda functions that run during ingestion. Common enrichment patterns include extracting metadata from document headers, classifying documents by type, translating content, or calling Amazon Comprehend to detect entities and sentiment. Enrichment runs as a pre-processing or post-processing step and stores the results as searchable metadata fields.

## Access Control

Kendra supports document-level access control through Access Control Lists (ACLs). When documents are ingested from SharePoint or Confluence, the Enterprise and Developer Edition indexes preserve the original permissions. At query time, you pass a user token, and Kendra filters results to only documents that user is authorized to see. This is critical for enterprise deployments where search results must respect existing permission boundaries. Foundational concepts here are covered in {{< relref "glossary/access-control-models" >}} and {{< relref "glossary/authentication-and-authorization" >}}.

Access control on the GenAI Enterprise Edition index works differently and is more limited: per the AWS documentation, the GenAI Index does not support token-based access control or user ID and group based access control, and you filter by user context using user attributes only. If you require ACL-preserving, token-based filtering, use the Enterprise Edition index. Confirm the current behavior in the Kendra index types documentation before designing around it.

## Pricing

Pricing is pay as you go and billed primarily on running index capacity, not per query result. The index runs continuously and bills per hour from the moment you create it until you delete it, regardless of usage, so an idle index still costs money. Figures below are from the AWS Kendra pricing page and were verified in June 2026. Always confirm current rates and your Region on that page, as prices change.

- **GenAI Enterprise Edition** (recommended): base index $0.32 per hour, including up to 20,000 documents (or 200MB of extracted text) and 0.1 queries per second. You scale up by adding storage units ($0.25 per hour each) and query units ($0.07 per hour each). Connectors are a flat $30 per index per month, which includes 500 hours of sync usage.
- **Enterprise Edition**: base index $1.40 per hour, including up to 100,000 documents (or 30GB) and 0.1 queries per second, with additional storage and query units available.
- **Developer Edition** (testing only, not for production): base index $1.125 per hour, including up to 10,000 documents (or 3GB) and 0.05 queries per second, with no option to add capacity. Roughly $810 per month if left running continuously, which is why you should delete idle development indexes.

AWS offers a free tier of 750 hours over the first 30 days on the GenAI or Developer Edition (connector costs excluded). For new projects, the GenAI Enterprise Edition is both the recommended index type and the lowest entry price.

## When to Use Kendra

Kendra fits well when the organization has large volumes of unstructured documents spread across multiple repositories, users need natural language search rather than keyword matching, and the team does not want to build and maintain a custom search relevance pipeline. It is less suitable for highly structured data queries (use Athena or Redshift), real-time log search (use OpenSearch), or scenarios where cost sensitivity demands a self-managed solution.

## Best practices

For RAG and search workloads on AWS, the authoritative guidance is the AWS Well-Architected Framework. The Generative AI Lens covers retrieval augmented generation architectures directly, and the Machine Learning Lens covers the broader ML lifecycle. See {{< relref "foundations/well-architected" >}} for an overview, then the official lenses:

- Generative AI Lens (RAG, foundation model selection, governance): https://docs.aws.amazon.com/wellarchitected/latest/generative-ai-lens/generative-ai-lens.html
- Machine Learning Lens: https://docs.aws.amazon.com/wellarchitected/latest/machine-learning-lens/machine-learning-lens.html

Two operational habits matter most for Kendra cost and quality: delete idle indexes (capacity bills per hour whether or not you query), and prefer the GenAI Enterprise Edition index for new RAG work unless you specifically need token-based ACL filtering, which only the Enterprise Edition supports.

## Sources

- Amazon Kendra documentation: https://docs.aws.amazon.com/kendra/
- Index types in Amazon Kendra (editions, features, limitations): https://docs.aws.amazon.com/kendra/latest/dg/hiw-index-types.html
- Amazon Kendra pricing: https://aws.amazon.com/kendra/pricing/
- Announcing GenAI Index in Amazon Kendra (AWS What's New, December 2024): https://aws.amazon.com/about-aws/whats-new/2024/12/genai-index-amazon-kendra/
- Introducing Amazon Kendra GenAI Index, enhanced semantic search and retrieval (AWS ML Blog): https://aws.amazon.com/blogs/machine-learning/introducing-amazon-kendra-genai-index-enhanced-semantic-search-and-retrieval-capabilities/
- Amazon Kendra GenAI Index now available in Europe (Ireland) and Asia Pacific (Sydney) (AWS What's New, April 2025): https://aws.amazon.com/about-aws/whats-new/2025/04/amazon-kendra-genai-index-ireland-sydney-regions/
- Create a knowledge base with an Amazon Kendra GenAI index (Amazon Bedrock docs): https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base-kendra-genai-index-create.html
