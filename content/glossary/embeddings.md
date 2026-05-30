---
title: "Embeddings - Vector Representations for AI Search"
description: "What embeddings are, how they enable semantic search, which embedding models to use, and how to choose vector database infrastructure."
date: 2026-03-24
categories: [Glossary]
tags: ["ai-ml", "intermediate", "embeddings", "vector-representations", "nlp", "semantic-search", "transformers"]
related:
  - glossary/rag
  - glossary/vector-database
  - guides/building-rag-systems
  - tools/amazon-bedrock
  - patterns/rag-implementation
last_updated: 2026-05-30
---

An embedding is a numerical representation of a piece of text (or image, audio, or other data) as a vector of floating-point numbers. The key property of embeddings is that similar content produces similar vectors - measured by cosine similarity or dot product distance.

This property makes embeddings the foundation of semantic search: instead of matching keywords, you match meaning. "Car" and "automobile" have very different character sequences but similar embeddings, so a search for "car" retrieves content about automobiles.

## How Embeddings Work

An embedding model processes a text input and produces a fixed-length vector (typically 768 to 4096 dimensions). The model is trained so that semantically similar texts produce vectors that are close together in the high-dimensional vector space.

For example:
- "Invoice payment terms" and "accounts payable due date" would produce similar embeddings (same semantic domain)
- "Invoice payment terms" and "quarterly earnings report" would produce more distant embeddings (different semantic domain)

This semantic closeness is what enables RAG retrieval: the user's question is embedded, and the most similar document chunks (by vector distance) are retrieved as the relevant context.

## Embedding Models

Different embedding models have different characteristics:

**Amazon Titan Embeddings** - Available through Bedrock, tightly integrated with Bedrock Knowledge Bases. Good general-purpose performance, straightforward AWS integration.

**Cohere Embed** - Strong performance on retrieval tasks, available through Bedrock. Supports multilingual embeddings, which matters for non-English content.

**OpenAI text-embedding-3** - Widely used benchmark model. Available via OpenAI API.

**Sentence-transformers (open source)** - A family of open-source embedding models deployable on your own infrastructure. Useful when you need to host embeddings without sending data to external APIs.

The choice of embedding model affects retrieval quality significantly. Always test with a representative sample of your actual queries and documents before committing to an embedding model - benchmark performance on standard datasets does not always transfer to domain-specific enterprise content.

## Vector Databases

A vector database stores embeddings and provides fast approximate nearest-neighbor (ANN) search to find the most similar vectors to a query. Common options:

**Amazon OpenSearch with k-NN** - Native vector search in a service most enterprise teams already use for other search workloads. Good choice for teams with existing OpenSearch infrastructure.

**Amazon Bedrock Knowledge Bases** - Managed RAG infrastructure that handles embedding, storage (backed by OpenSearch or Aurora PostgreSQL), and retrieval. Lowest operational overhead for standard RAG use cases.

**pgvector (PostgreSQL extension)** - Vector storage in PostgreSQL. Good for teams with existing PostgreSQL infrastructure who want to avoid adding a new database service.

**Pinecone, Weaviate, Qdrant** - Purpose-built vector databases with more advanced indexing options. Consider for very large indexes (100M+ vectors) or specialized retrieval requirements.

## Chunking and Embedding Strategy

Before embedding, documents must be split into chunks of appropriate size. Chunks too large produce embeddings that average over too much content, reducing retrieval precision. Chunks too small lose context.

Embed the chunk text plus its surrounding context (section heading, document title). This metadata enriches the embedding and improves retrieval for queries that include contextual terms not present in the chunk itself.

For multilingual content, use a multilingual embedding model and ensure queries are embedded with the same model, regardless of language.

## Sources and Further Reading

- Reimers, N., and Gurevych, I. (2019). "Sentence-BERT: Sentence Embeddings using Siamese BERT-Networks." *arXiv:1908.10084*. [https://arxiv.org/abs/1908.10084](https://arxiv.org/abs/1908.10084) - The paper that established the sentence embedding approach used by most modern embedding models.
- AWS Documentation: Amazon Titan Embeddings models. [https://docs.aws.amazon.com/bedrock/latest/userguide/titan-embedding-models.html](https://docs.aws.amazon.com/bedrock/latest/userguide/titan-embedding-models.html)
- AWS Documentation: Amazon Bedrock Knowledge Bases (managed RAG with embeddings). [https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base.html](https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base.html)
- Sentence-Transformers library documentation: [https://www.sbert.net/](https://www.sbert.net/)
- MTEB Leaderboard - Massive Text Embedding Benchmark: [https://huggingface.co/spaces/mteb/leaderboard](https://huggingface.co/spaces/mteb/leaderboard)
- Cohere Embed documentation: [https://docs.cohere.com/docs/embeddings](https://docs.cohere.com/docs/embeddings)
