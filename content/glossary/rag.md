---
title: "RAG - Retrieval Augmented Generation"
description: "What RAG is, how it works, when to use it, and the common implementation pitfalls that reduce retrieval quality."
date: 2026-03-24
categories: [Glossary]
tags: ["ai-ml", "beginner", "rag", "retrieval", "vector-search", "knowledge-base", "embeddings"]
related:
  - guides/building-rag-systems
  - patterns/rag-implementation
  - tools/amazon-bedrock
  - tools/amazon-opensearch
  - glossary/embeddings
  - glossary/vector-database
last_updated: 2026-05-30
---

Retrieval Augmented Generation (RAG) is an architecture pattern that improves the accuracy and relevance of AI-generated responses by providing the model with relevant source documents at query time, rather than relying solely on knowledge learned during training.

<figure class="bz-figure">
<img src="/img/craft/filing-cabinet-drawer-files-text.png" alt="A filing cabinet with an open drawer revealing organized files, representing how RAG systems retrieve relevant documents from a knowledge base to augment AI responses with accurate, up-to-date information." loading="lazy">
<figcaption>RAG systems retrieve relevant documents from a knowledge base at query time, grounding AI responses in authoritative sources rather than relying solely on training data.</figcaption>
</figure>

## How It Works

A RAG system has three phases:

**Indexing (offline)** - Your knowledge source (documents, FAQs, product data, internal wiki) is processed and stored in a vector database. Each document or document chunk is converted to a high-dimensional numerical vector (an embedding) that captures its semantic meaning. Similar content ends up close together in vector space.

**Retrieval (at query time)** - When a user asks a question, that question is also converted to an embedding using the same model. The vector database performs a similarity search to find the chunks whose embeddings are most similar to the question embedding - these are the most likely relevant source documents.

**Generation (at query time)** - The retrieved documents are added to the prompt sent to the language model, along with the original question and an instruction to answer using the provided context. The model generates a response grounded in the retrieved sources.

## When to Use RAG

RAG is the right pattern when:
- The answer depends on private, proprietary, or frequently updated information that is not in the model's training data
- You need answers with citations or source attribution
- Accuracy on factual questions is critical and hallucination must be minimized
- The knowledge base is too large to fit in a single prompt context window

RAG is not the right pattern when:
- The question requires complex multi-step reasoning over the retrieved information (consider fine-tuning or agents)
- The knowledge base is very small and changes infrequently (a few static documents can simply be included in every prompt)
- Retrieval quality cannot be validated and errors in retrieval would be worse than no retrieval

## Implementation Patterns

**Chunk size matters** - Documents are split into chunks before embedding. Chunks too large lose retrieval precision (the relevant sentence is buried in a large block of irrelevant text). Chunks too small lose context (a sentence pulled from the middle of a paragraph may be ambiguous without surrounding context). 300-500 token chunks with 50-100 token overlap between adjacent chunks is a good starting point for most document types.

**Embedding model selection** - The embedding model determines retrieval quality. Specialized embedding models (Cohere Embed, Amazon Titan Embeddings) generally outperform general-purpose LLM-derived embeddings for search tasks. Test with a representative sample of your actual queries before committing to an embedding model.

**Hybrid search** - Pure vector search misses exact keyword matches. Hybrid search combines vector similarity with BM25 (keyword-based) scoring. For most enterprise knowledge bases, hybrid retrieval outperforms pure vector search, particularly for queries containing specific terms, product codes, or proper nouns.

**Re-ranking** - A re-ranker model takes the top N retrieved chunks and re-orders them by relevance to the specific query. This adds latency but significantly improves the quality of context provided to the generation model. Cohere Rerank and cross-encoder models are common choices.

## Common Pitfalls

**Poor chunking strategy** - Splitting documents mid-sentence or mid-table produces chunks that are meaningless in isolation. Implement semantic chunking (split at natural boundaries like paragraphs or section headers) rather than pure token-count chunking.

**Retrieving irrelevant chunks** - If your similarity threshold is too permissive, the model receives irrelevant context that either confuses the answer or (worse) causes it to generate an incorrect answer grounded in the wrong source. Monitor retrieval precision during development and set a minimum similarity threshold.

**Not attributing sources** - A RAG system that does not return source references with its answers removes the ability for users to verify responses. Always include source metadata in the retrieval output and include it in the response.

**Stale index** - If your source documents are updated but the vector index is not refreshed, the system returns outdated information confidently. Implement incremental indexing tied to your document update workflow.

## Chunking Strategies

Chunking is one of the highest-leverage decisions in a RAG implementation. Common strategies:

**Fixed-size chunking** - Split every N tokens with M tokens of overlap. Simple to implement. Works adequately for uniform document types (product descriptions, FAQs) but breaks poorly across paragraph and section boundaries.

**Semantic chunking** - Split at natural language boundaries (sentences, paragraphs, section headings). Produces more coherent chunks. Requires a parser that understands document structure. Preferred for narrative documents like policies, reports, and technical documentation.

**Recursive character splitting** - Tries a hierarchy of separators (double newline, single newline, sentence boundary, word boundary) until chunks fall within the target size. A practical middle ground between fixed-size and fully semantic chunking.

**Document-aware chunking** - Respects document structure: split PDFs at page boundaries, HTML at heading tags, Markdown at `##` headers. Tables and code blocks are kept intact and not split mid-structure.

**Parent-child chunking** - Small child chunks (100-200 tokens) are used for retrieval precision; the larger parent chunk (500-1000 tokens) is passed to the generation model for context. Retrieves specific passages but provides the model with sufficient surrounding context.

## Embedding Models

The embedding model is a significant driver of retrieval quality. It must be fixed for the lifetime of the index - changing the model requires re-embedding the entire corpus.

**Amazon Titan Embeddings v2** - Available via Amazon Bedrock. Supports embedding dimensions of 256, 512, or 1024. Good general-purpose performance with native integration into Bedrock Knowledge Bases.

**Cohere Embed v3** - Strong retrieval performance on benchmarks. Supports multilingual embeddings across 100+ languages. Available via Bedrock and directly from Cohere.

**Sentence-BERT family** - Open-source models from Reimers and Gurevych (2019) that produce semantically meaningful sentence embeddings. Models like `all-mpnet-base-v2` and `all-MiniLM-L6-v2` are widely used baselines. Run on your own infrastructure.

**OpenAI text-embedding-3-large** - Strong benchmark performance, available via OpenAI API. 3072 dimensions (can be reduced via Matryoshka representation).

Test embedding model performance on a held-out set of your actual queries and documents before committing. Benchmark performance on MTEB (Massive Text Embedding Benchmark) does not always transfer to domain-specific enterprise content.

## Reranking

A reranker is a cross-encoder model that takes the query and each retrieved chunk as a pair and produces a relevance score. Unlike bi-encoder embeddings (which encode query and document independently), cross-encoders compare them jointly, producing more accurate relevance scores at the cost of higher latency.

The standard pattern: retrieve top 20 chunks via vector similarity, rerank to get the top 5, pass those 5 to the generation model. The expanded initial retrieval (20 vs 5) compensates for the approximate nature of ANN search; the reranker provides the precision.

**Cohere Rerank** - Available via API and via Amazon Bedrock. Strong out-of-the-box performance with no fine-tuning required.

**Cross-encoder/ms-marco** - Open-source cross-encoder models from the sentence-transformers library, trained on the MS MARCO passage ranking dataset. Deployable on your own infrastructure.

**Amazon Bedrock Reranking** - Managed reranking integrated directly into Bedrock Knowledge Bases retrieval pipelines.

## Sources and Further Reading

- Lewis, P., Perez, E., Piktus, A., et al. (2020). "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks." *arXiv:2005.11401*. [https://arxiv.org/abs/2005.11401](https://arxiv.org/abs/2005.11401)
- AWS Documentation: Amazon Bedrock Knowledge Bases. [https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base.html](https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base.html)
- AWS Documentation: Amazon Bedrock Reranking. [https://docs.aws.amazon.com/bedrock/latest/userguide/rerank.html](https://docs.aws.amazon.com/bedrock/latest/userguide/rerank.html)
- Reimers, N., and Gurevych, I. (2019). "Sentence-BERT: Sentence Embeddings using Siamese BERT-Networks." *arXiv:1908.10084*. [https://arxiv.org/abs/1908.10084](https://arxiv.org/abs/1908.10084)
- MTEB Leaderboard (Massive Text Embedding Benchmark): [https://huggingface.co/spaces/mteb/leaderboard](https://huggingface.co/spaces/mteb/leaderboard)
