---
title: "Building RAG Systems - A Step-by-Step Guide"
description: "Document ingestion, chunking strategies, embedding models, vector stores, retrieval tuning, and generation with context for production RAG implementations."
date: 2026-03-24
categories: [Guides]
tags: ["ai-agents", "advanced", "rag", "retrieval", "vector-search", "embeddings", "knowledge-base"]
tools: [amazon-bedrock, amazon-opensearch]
related:
  - glossary/rag
  - patterns/rag-implementation
  - tools/amazon-bedrock
  - tools/amazon-opensearch
  - glossary/embeddings
  - glossary/vector-database
last_updated: 2026-05-30
---

Retrieval-Augmented Generation (RAG) is the standard architecture for giving AI models access to private knowledge without fine-tuning. Instead of baking knowledge into model weights, RAG retrieves relevant documents at query time and includes them in the model's context. The concept is simple; building a production system that works reliably is not.

<div class="bz-arch">
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Indexing</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Ingest documents</span>
      <span class="bz-arch-chip">Clean and chunk</span>
      <span class="bz-arch-chip">Embed chunks</span>
      <span class="bz-arch-chip">Store vectors</span>
      <span class="bz-arch-chip-note">Runs once at setup, then incrementally as the knowledge base updates. Steps 1-4 below</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Query</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Embed query</span>
      <span class="bz-arch-chip">Retrieve top-k</span>
      <span class="bz-arch-chip">Re-rank</span>
      <span class="bz-arch-chip">Generate answer</span>
      <span class="bz-arch-chip-note">Runs on every user request. Steps 5-6 below</span>
    </div>
  </div>
</div>

## Step 1 - Document Ingestion

Before documents can be retrieved, they need to be in a form the system can work with.

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Source</span>
    <span class="bz-flow-step-name">Raw documents</span>
    <span class="bz-flow-step-desc">PDFs, Word, HTML, Markdown, plain text; each format needs its own parser</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Clean</span>
    <span class="bz-flow-step-name">Strip noise</span>
    <span class="bz-flow-step-desc">Remove headers, footers, page numbers, boilerplate; preserve structure and headings</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Chunk</span>
    <span class="bz-flow-step-name">Split content</span>
    <span class="bz-flow-step-desc">Semantic boundaries or 512-token windows with 50-100 token overlap</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Index</span>
    <span class="bz-flow-step-name">Embed and store</span>
    <span class="bz-flow-step-desc">Titan Embeddings to vectors; stored in OpenSearch, pgvector, or Bedrock Knowledge Bases</span>
  </div>
</div>

Document ingestion covers:

**Format handling** - PDFs, Word documents, HTML, Markdown, and plain text all need different extraction pipelines. Amazon Textract handles PDFs with complex layouts (tables, multi-column, scanned documents). For clean text formats, simpler parsers suffice.

**Content cleaning** - Headers, footers, page numbers, boilerplate text, and navigation elements should be stripped before processing. These fragments reduce retrieval quality by adding noise.

**Document structure preservation** - Section headings, table structure, and list formatting carry meaning. Preserving them in the processed text improves both retrieval accuracy and generation quality.

## Step 2 - Chunking Strategy

Documents are split into chunks for embedding and retrieval. Chunking strategy is one of the most impactful variables in RAG performance.

**Fixed-size chunking** - Split every N tokens with M token overlap. Simple and consistent. Overlap prevents important context being split across chunk boundaries. 512-token chunks with 50-100 token overlap is a common starting point.

**Semantic chunking** - Split at meaningful boundaries (paragraphs, sections) rather than fixed token counts. Preserves semantic coherence better but produces variable-size chunks.

**Hierarchical chunking** - Maintain relationships between parent and child chunks. A parent chunk (full section) and child chunks (paragraphs within the section) enable retrieving both specific passages and broader context.

For most use cases, start with semantic chunking at the paragraph level and iterate based on observed retrieval failures.

## Step 3 - Embedding Models

Chunks are converted to dense vectors using embedding models. Vector similarity is the basis for retrieval. Embedding model choice affects:

- Semantic richness (how well the vector captures meaning)
- Multilingual capability (critical for European deployments)
- Vector dimensions (affects storage and search cost)
- Latency (embedding happens both at indexing time and query time)

Amazon Bedrock Titan Embeddings is a practical default for AWS-native implementations. For multilingual requirements, test against your specific language combinations - some models handle mixed-language content better than others.

## Step 4 - Vector Store

Embeddings are stored in a vector database that supports approximate nearest neighbor (ANN) search. Options on AWS:

- **Amazon OpenSearch with vector engine** - Good for hybrid search (keyword + semantic) and existing OpenSearch users
- **pgvector on Amazon RDS** - PostgreSQL extension for teams already using RDS, good for smaller scale
- **Amazon Bedrock Knowledge Bases** - Managed service that handles ingestion, embedding, and retrieval, reducing operational overhead

For production systems over 1 million chunks, or with high query throughput, dedicated vector stores (OpenSearch) outperform general-purpose databases with vector extensions.

## Step 5 - Retrieval Tuning

Retrieval quality is what makes or breaks a RAG system. At query time, the pipeline runs in reverse:

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Query</span>
    <span class="bz-flow-step-name">User question</span>
    <span class="bz-flow-step-desc">Optionally expanded to multiple phrasings before retrieval to improve recall</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Retrieve</span>
    <span class="bz-flow-step-name">Hybrid search</span>
    <span class="bz-flow-step-desc">Semantic similarity + BM25 keyword; fetch top 20 candidates from vector store</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Re-rank</span>
    <span class="bz-flow-step-name">Cross-encoder</span>
    <span class="bz-flow-step-desc">Score all 20; pass only top 5 to generation; significantly improves precision</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Generate</span>
    <span class="bz-flow-step-name">Answer with context</span>
    <span class="bz-flow-step-desc">Context + question → LLM → cited answer at temperature 0.1-0.3</span>
  </div>
</div>

Tuning approaches:

**Hybrid search** - Combine semantic similarity with keyword (BM25) search. Semantic handles conceptual queries; keyword handles specific terms, codes, and names. The combination outperforms either alone for most enterprise knowledge bases.

**Re-ranking** - Retrieve a larger candidate set (top 20) and re-rank with a cross-encoder model before passing the top 5 to generation. More computationally expensive but improves relevance significantly.

**Query expansion** - Use the LLM to generate multiple phrasings of the query before retrieving. Catches relevant documents that use different terminology than the query.

## Step 6 - Generation with Context

Assembling the retrieved chunks and the query into a prompt that produces a good answer:

- Put retrieved context before the question
- Instruct the model to answer only from the provided context and say so when it cannot
- Include source citations in the model's output format
- Set temperature low (0.1-0.3) for factual Q&A - you want determinism, not creativity

Production RAG systems benefit from evaluation infrastructure: regularly testing retrieval recall and answer quality against a ground truth set, and alerting when performance degrades after knowledge base updates.

## Sources

- Lewis, P., Perez, E., Piktus, A., Petroni, F., Karpukhin, V., Goyal, N., ... and Kiela, D. "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks." *NeurIPS* (2020). https://arxiv.org/abs/2005.11401, The original RAG paper introducing the retrieve-then-generate architecture.
- Gao, Y. et al. "Retrieval-Augmented Generation for Large Language Models: A Survey." (2023). https://arxiv.org/abs/2312.10997, Comprehensive survey of RAG variants including Naive RAG, Advanced RAG, and Modular RAG architectures, with a taxonomy of chunking, retrieval, and generation strategies.
- Robertson, S. and Zaragoza, H. "The Probabilistic Relevance Framework: BM25 and Beyond." *Foundations and Trends in Information Retrieval* 3, no. 4 (2009): 333–389., The BM25 algorithm referenced in the hybrid search section; the standard keyword retrieval baseline.
- Nogueira, R. and Cho, K. "Passage Re-ranking with BERT." (2019). https://arxiv.org/abs/1901.04085, Foundational work on cross-encoder re-ranking, which underpins the two-stage retrieve-then-rerank pattern described above.
