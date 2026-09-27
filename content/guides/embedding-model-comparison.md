---
title: "Embedding Model Comparison and Selection Guide"
description: "How to choose embedding models for semantic search, RAG, and similarity tasks, comparing popular models across quality, speed, cost, and dimensionality."
date: 2026-03-28
categories: [Guides]
tags: [embeddings, models, RAG, semantic-search, evaluation]
last_updated: 2026-09-25
lastmod: 2026-09-25
last_verified: 2026-09-25
---

Embedding models convert text, images, or other data into numerical vectors that capture semantic meaning. The choice of embedding model directly impacts the quality of semantic search, RAG retrieval, and recommendation systems. With dozens of options available, selecting the right one requires understanding the tradeoffs between quality, speed, cost, and dimensionality.

## What Makes a Good Embedding Model

**Retrieval quality.** The model should place semantically similar content close together in vector space. Measured by benchmarks like MTEB (Massive Text Embedding Benchmark) for text embeddings.

**Dimensionality.** Higher dimensions capture more nuance but increase storage cost and search latency. Common dimensions: 384, 768, 1024, 1536, 3072.

**Speed.** How fast the model generates embeddings. Important for real-time applications and large-scale batch processing.

**Context window.** How much text can the model process at once. Models with larger context windows can embed longer documents without chunking.

**Cost.** API-based models charge per token. Self-hosted models have compute costs. The cost per million embeddings varies by orders of magnitude.

## Popular Models Compared

### API-Based Models

**OpenAI text-embedding-3-large.** 3072 dimensions (configurable). Strong benchmark performance. $0.13 per million tokens. 8191 token context window. Easy to use but creates vendor dependency.

**OpenAI text-embedding-3-small.** 1536 dimensions. Good quality at lower cost ($0.02 per million tokens). Suitable when budget is constrained or storage is a concern.

**Amazon Titan Text Embeddings V2 and Nova Multimodal Embeddings.** Titan V2 (1024 dimensions) remains available through Amazon Bedrock; Amazon Nova Multimodal Embeddings is Amazon's newer model and also embeds images, video and audio. Good choice for AWS-centric architectures to keep data within AWS.

**Cohere Embed v4.** 1536 dimensions by default (256, 512 and 1024 also supported), 128K-token context, and embeds text, images and mixed documents such as PDFs. Strong multilingual performance. Available through Bedrock and the Cohere API. The earlier embed-v3 models (1024 dimensions, 512-token context) are still offered.

**Voyage AI.** The voyage-4 series (voyage-4-large, voyage-4, voyage-4-lite, plus voyage-code-4) with 32K-token context and 1024 dimensions by default (256 to 2048 selectable), and domain variants for finance and law. Embeddings from all voyage-4 models are compatible with each other. Competitive with OpenAI on domain-specific tasks.

**Google Gemini Embedding 2.** `gemini-embedding-2`, a stable multimodal model that maps text, images, video, audio and PDFs into one embedding space. 8,192-token input, flexible output dimensions from 128 to 3072.

### Open Source / Self-Hosted Models

**BGE-large-en-v1.5.** 1024 dimensions. Consistently near the top of MTEB benchmarks. Open source (MIT license). Can be self-hosted for zero per-token cost.

**E5-large-v2.** 1024 dimensions. Strong general-purpose embeddings. From Microsoft Research. Open source.

**GTE-large.** 1024 dimensions. From Alibaba DAMO Academy. Competitive benchmark performance. Apache 2.0 license.

**all-MiniLM-L6-v2.** 384 dimensions. Much smaller and faster than the above models. Lower quality but excellent for prototyping and resource-constrained environments.

**Nomic-embed-text.** 768 dimensions. Open source with strong performance. Supports long context (8192 tokens).

**Newer open-weight options.** The models above date from 2023-2024. More recent open-weight embedders include Alibaba's Qwen3-Embedding family (June 2025, Apache 2.0), Google's EmbeddingGemma (300M parameters, Gemma licence) and Voyage's open-weight voyage-4-nano. Check the current MTEB leaderboard before defaulting to an older model.

## Selection Criteria

### By Use Case

**RAG retrieval.** Prioritize retrieval quality. Use a model that scores well on MTEB retrieval benchmarks. OpenAI text-embedding-3-large or BGE-large are strong choices.

**Semantic search.** Similar to RAG but may need multilingual support. Cohere Embed v4 or voyage-4 for multilingual; OpenAI or BGE for English-focused.

**Classification or clustering.** Some models are optimized for these tasks separately. Check task-specific benchmarks, not just overall MTEB scores.

**Code search.** Use models trained on code, such as voyage-code-4, or a general model evaluated on your own code corpus.

### By Constraint

**Latency-sensitive.** Smaller models (MiniLM, small variants) generate embeddings faster. Consider batch pre-computation.

**Cost-sensitive.** Self-hosted open source models eliminate per-token costs. The trade-off is infrastructure management. For API models, OpenAI text-embedding-3-small is the best value.

**Privacy-sensitive.** Self-hosted models keep data on your infrastructure. No data is sent to third-party APIs. BGE, E5, and GTE are excellent self-hosted options.

**Multilingual.** Cohere Embed v4, the voyage-4 series and multilingual-e5-large handle multiple languages well. English-only models will produce poor results on non-English text.

## Evaluation Methodology

Do not rely solely on public benchmarks. Evaluate on your actual data:

### Step 1: Create an Evaluation Dataset

Build a dataset of queries and relevant documents from your domain. 100-200 query-document pairs is sufficient for initial evaluation. Have domain experts label relevance.

### Step 2: Generate Embeddings

Embed your evaluation dataset with each candidate model. Record time and cost.

### Step 3: Measure Retrieval Quality

For each query, retrieve the top-K documents using vector similarity. Compute:
- **Recall@K:** What fraction of relevant documents appear in the top K results?
- **MRR (Mean Reciprocal Rank):** How high does the first relevant result appear?
- **nDCG:** How well are the relevant results ordered?

### Step 4: Compare Tradeoffs

Plot quality vs. cost and quality vs. latency. The best model depends on where your constraints are:
- If quality is paramount and budget allows: OpenAI text-embedding-3-large or BGE-large self-hosted
- If cost is the primary constraint: OpenAI text-embedding-3-small or self-hosted MiniLM
- If latency is critical: smallest model that meets quality requirements

## Practical Considerations

**Embedding dimension reduction.** OpenAI's text-embedding-3 models support Matryoshka representation learning, allowing you to truncate dimensions without retraining. This lets you trade quality for efficiency.

**Batch processing.** Pre-compute embeddings for your document corpus and store them. Only compute embeddings at query time for the user's query. This makes model speed less critical for the document side.

**Model updates.** When you switch embedding models, you must re-embed your entire corpus. Plan for this migration cost when evaluating models.

**Hybrid search.** Combining embedding-based search with keyword-based search (BM25) often outperforms either alone. Consider this before investing in a more expensive embedding model.

The embedding model is a foundational choice that affects the entire retrieval pipeline. Invest the time to evaluate properly on your data - public benchmarks predict general performance but not domain-specific results.

## Sources

1. OpenAI, "Vector embeddings" guide and API pricing (text-embedding-3-small $0.02, text-embedding-3-large $0.13 per million tokens; fetched 25 September 2026): [https://developers.openai.com/api/docs/guides/embeddings](https://developers.openai.com/api/docs/guides/embeddings)
2. Cohere, "Models overview" (Embed v4 and v3 specifications): [https://docs.cohere.com/docs/models](https://docs.cohere.com/docs/models)
3. Voyage AI, "Text embeddings" (voyage-4 series): [https://docs.voyageai.com/docs/embeddings](https://docs.voyageai.com/docs/embeddings)
4. Google, "Gemini Embedding 2" model page: [https://ai.google.dev/gemini-api/docs/models/gemini-embedding-2](https://ai.google.dev/gemini-api/docs/models/gemini-embedding-2)
5. AWS Documentation, "Models at a glance" (Amazon Nova Multimodal Embeddings, Titan Text Embeddings V2, Cohere Embed v4): [https://docs.aws.amazon.com/bedrock/latest/userguide/model-cards.html](https://docs.aws.amazon.com/bedrock/latest/userguide/model-cards.html)
6. Hugging Face, Qwen/Qwen3-Embedding-8B: [https://huggingface.co/Qwen/Qwen3-Embedding-8B](https://huggingface.co/Qwen/Qwen3-Embedding-8B)
