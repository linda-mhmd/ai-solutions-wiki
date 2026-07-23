---
title: "Amazon Kendra vs OpenSearch for RAG Retrieval"
description: "Comparing Amazon Kendra and OpenSearch as the retrieval layer for RAG architectures, covering relevance, connectors, and cost."
date: 2026-03-28
last_verified: 2026-06-14
categories: [Comparisons]
tags: [Kendra, OpenSearch, RAG, retrieval, AWS, comparison]
last_updated: 2026-06-14
lastmod: 2026-06-14
---

RAG architectures need a retrieval layer that finds relevant documents to ground LLM responses. On AWS, two primary options are Amazon Kendra (an intelligent search service) and Amazon OpenSearch (a search and analytics engine with vector capabilities). They approach retrieval differently and suit different use cases.

> **Lifecycle note (July 2026):** AWS moved Amazon Kendra into maintenance mode on 30 June 2026 (closed to new customers from 30 July 2026, existing customers still supported), and recommends new retrieval work go to Amazon Bedrock Managed Knowledge Bases. For a new build, weigh OpenSearch or a Bedrock Knowledge Base rather than starting on Kendra. See the [2026 AWS lifecycle wave](/news/aws-service-deprecations-2026/). The comparison below stands for teams already on Kendra. For RAG specifically, AWS added the Amazon Kendra GenAI Enterprise Edition index (announced December 2024), often called the Kendra GenAI Index, which combines hybrid keyword and vector search with semantic embedding and re-ranker models and plugs directly into Amazon Bedrock Knowledge Bases as a managed retriever.

## Overview

| Aspect | Amazon Kendra | Amazon OpenSearch |
|---|---|---|
| Type | Managed intelligent search | Search and analytics engine |
| Search Method | Hybrid keyword and vector plus re-ranker (GenAI Index); neural ranking on classic indexes | BM25 plus vector (k-NN) |
| Data Connectors | 40+ built-in connectors (43 on the GenAI Index) | Custom ingestion required |
| Document Formats | Native support for many formats | Requires preprocessing |
| Access Control | Built-in ACL-aware search (classic editions); limited on GenAI Index | Custom implementation |
| Pricing | Per-index (GenAI Index uses smaller, lower-cost units) | Per-instance or serverless |
| Customization | Limited | Highly customizable |

## Retrieval Quality

Kendra uses ranking models trained by AWS to re-rank search results. It understands natural language queries well and can extract precise answers from documents, not just return relevant passages. The GenAI Enterprise Edition index goes further by combining hybrid search (keyword and vector), semantic embedding, and re-ranker models, which AWS positions as the highest-accuracy option for the Retrieve API and RAG use cases. For enterprise document search across varied content types, Kendra's out-of-the-box relevance is strong.

OpenSearch provides vector search via the k-NN plugin, BM25 keyword search, and hybrid combinations. Retrieval quality depends heavily on your embedding model, chunking strategy, and hybrid scoring configuration. With good embeddings and tuned retrieval, OpenSearch can match or exceed Kendra's relevance, but it requires more engineering effort to get there. OpenSearch 3.x (Amazon OpenSearch Service added support through OpenSearch 3.3 in November 2025) brought sizeable vector engine improvements, including faster k-NN query performance, GPU-accelerated index builds, and agentic search that takes natural language input.

## Data Ingestion

Kendra's built-in connectors are its standout feature. It can crawl S3, SharePoint, Confluence, Salesforce, databases, and 40+ other sources with minimal configuration. Document processing handles PDFs, Word documents, HTML, and other formats natively. ACL-aware search respects source system permissions.

OpenSearch requires you to build ingestion pipelines. Documents must be chunked, embedded, and indexed through custom code or tools like LangChain. This gives you full control over preprocessing but requires engineering effort. For RAG specifically, Bedrock Knowledge Bases can automate this pipeline with OpenSearch as the vector store.

## Cost

Kendra pricing is index-based, billed per hour while an index runs regardless of query volume. The classic Enterprise Edition index has a meaningful baseline cost, which historically made Kendra expensive for experimentation and small-scale deployments. The newer GenAI Enterprise Edition index uses smaller, more granular capacity units and a lower starting price than the classic editions, which softens that entry cost, but it is still a continuously running, capacity-based service rather than pay-per-query. Check the AWS Kendra pricing page for current rates, since these change over time.

OpenSearch pricing is instance-based (or consumption-based with Serverless). For small deployments, OpenSearch Serverless can be cost-effective, though it carries a baseline cost even when idle. For large-scale deployments, dedicated OpenSearch clusters provide predictable pricing that scales more linearly with data volume. For cost-sensitive RAG, AWS also offers Amazon S3 Vectors (generally available since December 2025) as a low-cost vector store that AWS says can reduce the cost to store and query vectors by up to 90 percent versus traditional approaches, at the expense of higher query latency for frequent workloads.

## Integration with Bedrock

Both integrate with Amazon Bedrock for RAG, but the integration paths differ. Bedrock Knowledge Bases handle automated chunking, embedding, and indexing, and now support a range of vector stores: Amazon OpenSearch Serverless, Amazon OpenSearch Managed Cluster (added March 2025), Amazon S3 Vectors, Amazon Aurora PostgreSQL with pgvector, Amazon Neptune Analytics for GraphRAG, Pinecone, MongoDB Atlas, and Redis Enterprise Cloud. OpenSearch Serverless remains a common quick-create choice, and is one of the few options that supports binary vector embeddings.

Kendra integrates with Bedrock in two ways. The classic editions are queried through the Retrieve API, which can be called from Bedrock Agents or custom orchestration and preserves Kendra's ACL-aware retrieval, valuable for enterprise use cases where different users should see different documents. The GenAI Enterprise Edition index goes further and acts as a managed retriever inside a Bedrock knowledge base, so you can reuse the same index across Bedrock Agents, Prompt Flows, and Amazon Q Business without rebuilding it.

## When to Choose Kendra

Choose Kendra when you need to search across many enterprise data sources with minimal engineering effort. Kendra excels when ACL-aware search is required, when your documents span multiple formats and sources, and when you want strong out-of-the-box relevance without tuning embeddings and retrieval parameters.

One caveat on access control: the classic Enterprise and Developer Edition indexes support token-based and user or group based document access control, but the GenAI Enterprise Edition index does not. The GenAI Index can only filter by user attributes for user context, supports English content only, requires v2.0 data source connectors, and at the time of writing is available only in US East (N. Virginia) and US West (Oregon). If you need fine grained ACLs together with the highest RAG accuracy, weigh those limits carefully.

## When to Choose OpenSearch

Choose OpenSearch when you need full control over the retrieval pipeline, when cost sensitivity matters, or when you are already using OpenSearch for other workloads. OpenSearch is the better choice for high-volume RAG applications where per-query cost matters and for use cases that need custom embedding models or hybrid search tuning.

## Practical Recommendation

For enterprise knowledge base RAG where documents live in SharePoint, Confluence, and similar systems, Kendra's connectors save weeks of integration work, and the GenAI Index gives you that connector ecosystem with the highest out-of-the-box RAG accuracy (subject to the access control and region limits noted above). For purpose-built RAG applications with controlled document sources, OpenSearch with Bedrock Knowledge Bases provides more control, and pairing Bedrock Knowledge Bases with Amazon S3 Vectors can cut storage and query costs further when query volume is modest. Consider Kendra for the connector ecosystem and OpenSearch for the retrieval flexibility.

For deeper dives on related choices, see {{< relref "comparisons/pinecone-vs-opensearch" >}}, {{< relref "comparisons/opensearch-vs-elasticsearch" >}}, and {{< relref "comparisons/rag-vs-fine-tuning" >}}.

## Sources and Further Reading

- AWS. *Index types in Amazon Kendra* (GenAI Enterprise Edition, Enterprise Edition, Developer Edition). [https://docs.aws.amazon.com/kendra/latest/dg/hiw-index-types.html](https://docs.aws.amazon.com/kendra/latest/dg/hiw-index-types.html)
- AWS. *Announcing GenAI Index in Amazon Kendra* (December 4, 2024). [https://aws.amazon.com/about-aws/whats-new/2024/12/genai-index-amazon-kendra/](https://aws.amazon.com/about-aws/whats-new/2024/12/genai-index-amazon-kendra/)
- AWS. *Build an Amazon Bedrock knowledge base with an Amazon Kendra GenAI index.* [https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base-build-kendra-genai-index.html](https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base-build-kendra-genai-index.html)
- AWS. *Prerequisites for using a vector store you created for a knowledge base* (supported vector stores for Amazon Bedrock Knowledge Bases). [https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base-setup.html](https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base-setup.html)
- AWS. *Amazon S3 Vectors is now generally available* (December 2, 2025). [https://aws.amazon.com/about-aws/whats-new/2025/12/amazon-s3-vectors-generally-available/](https://aws.amazon.com/about-aws/whats-new/2025/12/amazon-s3-vectors-generally-available/)
- AWS. *Amazon OpenSearch Service now supports OpenSearch version 3.3* (November 24, 2025). [https://aws.amazon.com/about-aws/whats-new/2025/11/amazon-opensearch-service-opensearch-version-3-3/](https://aws.amazon.com/about-aws/whats-new/2025/11/amazon-opensearch-service-opensearch-version-3-3/)
