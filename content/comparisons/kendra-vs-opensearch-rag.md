---
title: "Amazon Kendra vs OpenSearch for RAG Retrieval"
description: "Comparing Amazon Kendra and OpenSearch as the retrieval layer for RAG architectures, covering relevance, connectors, and cost."
date: 2026-03-28
last_verified: 2026-05-30
categories: [Comparisons]
tags: [Kendra, OpenSearch, RAG, retrieval, AWS, comparison]
last_updated: 2026-05-30
---

RAG architectures need a retrieval layer that finds relevant documents to ground LLM responses. On AWS, the two primary options are Amazon Kendra (an intelligent search service) and OpenSearch (a search and analytics engine with vector capabilities). They approach retrieval differently and suit different use cases.

## Overview

| Aspect | Amazon Kendra | OpenSearch |
|---|---|---|
| Type | Managed intelligent search | Search and analytics engine |
| Search Method | Neural ranking + keyword | BM25 + vector (k-NN) |
| Data Connectors | 40+ built-in connectors | Custom ingestion required |
| Document Formats | Native support for many formats | Requires preprocessing |
| Access Control | Built-in ACL-aware search | Custom implementation |
| Pricing | Per-index (can be expensive) | Per-instance or serverless |
| Customization | Limited | Highly customizable |

## Retrieval Quality

Kendra uses a neural ranking model trained by AWS to re-rank search results. It understands natural language queries well and can extract precise answers from documents, not just return relevant passages. For enterprise document search across varied content types, Kendra's out-of-the-box relevance is strong.

OpenSearch provides vector search via the k-NN plugin, BM25 keyword search, and hybrid combinations. Retrieval quality depends heavily on your embedding model, chunking strategy, and hybrid scoring configuration. With good embeddings and tuned retrieval, OpenSearch can match or exceed Kendra's relevance, but it requires more engineering effort to get there.

## Data Ingestion

Kendra's built-in connectors are its standout feature. It can crawl S3, SharePoint, Confluence, Salesforce, databases, and 40+ other sources with minimal configuration. Document processing handles PDFs, Word documents, HTML, and other formats natively. ACL-aware search respects source system permissions.

OpenSearch requires you to build ingestion pipelines. Documents must be chunked, embedded, and indexed through custom code or tools like LangChain. This gives you full control over preprocessing but requires engineering effort. For RAG specifically, Bedrock Knowledge Bases can automate this pipeline with OpenSearch as the vector store.

## Cost

Kendra pricing is index-based and can be significant. An Enterprise Edition index starts at a meaningful monthly cost regardless of query volume. This makes Kendra expensive for experimentation and small-scale deployments.

OpenSearch pricing is instance-based (or consumption-based with Serverless). For small deployments, OpenSearch Serverless can be cost-effective. For large-scale deployments, dedicated OpenSearch clusters provide predictable pricing that scales more linearly with data volume.

## Integration with Bedrock

Both integrate with Amazon Bedrock for RAG, but the integration paths differ. Bedrock Knowledge Bases use OpenSearch Serverless as a default vector store, with automated chunking, embedding, and indexing. This is the smoothest RAG setup on AWS.

Kendra integrates with Bedrock through the Retrieve API, which can be called from Bedrock Agents or custom orchestration. Kendra's integration preserves its ACL-aware retrieval, which is valuable for enterprise use cases where different users should see different documents.

## When to Choose Kendra

Choose Kendra when you need to search across many enterprise data sources with minimal engineering effort. Kendra excels when ACL-aware search is required, when your documents span multiple formats and sources, and when you want strong out-of-the-box relevance without tuning embeddings and retrieval parameters.

## When to Choose OpenSearch

Choose OpenSearch when you need full control over the retrieval pipeline, when cost sensitivity matters, or when you are already using OpenSearch for other workloads. OpenSearch is the better choice for high-volume RAG applications where per-query cost matters and for use cases that need custom embedding models or hybrid search tuning.

## Practical Recommendation

For enterprise knowledge base RAG where documents live in SharePoint, Confluence, and similar systems, Kendra's connectors save weeks of integration work. For purpose-built RAG applications with controlled document sources, OpenSearch with Bedrock Knowledge Bases provides better cost efficiency and more control. Consider Kendra for the connector ecosystem and OpenSearch for the retrieval flexibility.
