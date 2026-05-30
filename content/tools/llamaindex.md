---
title: "LlamaIndex - RAG and Agent Framework"
description: "Using LlamaIndex for retrieval-augmented generation, data connectors, and agent workflows, with Bedrock and OpenSearch integration."
date: 2026-03-24
categories: [Tools]
tags: ["ai-agents", "intermediate", "llamaindex", "rag", "data-connectors", "indexing", "retrieval"]
last_updated: 2026-05-30
---

LlamaIndex is a Python data framework for building LLM applications over your own data. Its focus is connecting models to external data sources through retrieval-augmented generation (RAG), with a comprehensive set of data connectors, index types, and query pipelines. It also supports agent workflows, though its primary strength is data-heavy applications.

Official documentation: https://www.llamaindex.ai/

## Core Abstraction: The Index

LlamaIndex organizes your data into an **index** - a structure optimized for retrieval. The most common is `VectorStoreIndex`, which embeds documents and stores vectors for k-NN search. Other index types include `SummaryIndex` (for summarization over a collection) and `KnowledgeGraphIndex` (for graph-based traversal).

Building an index:
```python
from llama_index.core import VectorStoreIndex, SimpleDirectoryReader
from llama_index.llms.bedrock import Bedrock
from llama_index.embeddings.bedrock import BedrockEmbedding

documents = SimpleDirectoryReader("./docs").load_data()
index = VectorStoreIndex.from_documents(
    documents,
    embed_model=BedrockEmbedding(model_id="amazon.titan-embed-text-v2:0")
)
query_engine = index.as_query_engine(
    llm=Bedrock(model="us.anthropic.claude-sonnet-4-6")
)
response = query_engine.query("What is our refund policy?")
```

## How It Differs from LangChain

Both frameworks support RAG and agents, but they have different philosophies:

**LlamaIndex** is data-centric. Its abstractions are designed around loading, indexing, and retrieving data. The query pipeline is declarative and optimized for information retrieval use cases. It is generally simpler to set up a production RAG pipeline in LlamaIndex than in LangChain.

**LangChain** is chain-centric. It excels at composing sequences of LLM calls, tool uses, and data transformations. Its LCEL (LangChain Expression Language) and broader ecosystem (many pre-built tools and integrations) make it more flexible for complex multi-step workflows.

For pure RAG (document Q&A, knowledge base search), LlamaIndex is the more focused tool. For complex agent workflows that happen to include retrieval, LangGraph (part of the LangChain ecosystem) may be better.

## Bedrock Integration

LlamaIndex supports Bedrock models and embeddings through dedicated integration packages. Configure Bedrock as both the LLM and the embedding model to keep everything within the AWS environment - no OpenAI API keys, no external calls, billing through AWS.

## OpenSearch Integration

LlamaIndex integrates with Amazon OpenSearch Service as a persistent vector store. Instead of rebuilding the index on each Lambda cold start, persist vectors to OpenSearch Serverless and retrieve them at query time.

## Data Connectors

LlamaIndex has 160+ data connectors (via LlamaHub) covering databases, SaaS tools, document formats, and APIs. Connectors for Notion, Confluence, Google Drive, S3, and SQL databases load data into the indexing pipeline without custom ETL code.

## Related Articles

- [Amazon OpenSearch Service]({{< relref "amazon-opensearch.md" >}}) - vector store backend
- [Amazon Bedrock]({{< relref "amazon-bedrock.md" >}}) - LLM and embedding provider
- [Knowledge Base]({{< relref "/glossary/knowledge-base.md" >}}) - concept LlamaIndex implements
