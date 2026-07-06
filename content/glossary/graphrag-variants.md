---
title: "GraphRAG Variants (LazyGraphRAG, LightRAG)"
description: "A family of cheaper alternatives to full GraphRAG that cut the cost of graph-based retrieval-augmented generation while keeping strong retrieval quality."
date: 2026-07-06
lastmod: 2026-07-06
categories: [Glossary]
tags: ["ai-ml", "advanced", "rag", "retrieval", "knowledge-graph"]
related:
  - glossary/rag
  - glossary/agentic-rag
  - glossary/knowledge-base
  - glossary/embeddings
  - glossary/vector-database
last_updated: 2026-07-06
---

GraphRAG variants are a family of cheaper alternatives to full GraphRAG that cut the cost of graph-based {{< relref "glossary/rag" >}} (retrieval-augmented generation). Full GraphRAG builds and summarises a knowledge graph over a corpus using an LLM, which is powerful for global questions but expensive to index. The variants keep the graph idea while reducing that cost. Two named examples are LazyGraphRAG from Microsoft Research and LightRAG from HKUDS. Both aim to preserve the quality benefits of graph-structured retrieval over a {{< relref "glossary/knowledge-base" >}} while spending far less on indexing.

## LazyGraphRAG

LazyGraphRAG, from Microsoft Research, cuts cost by deferring LLM use and skipping the upfront summarization step that full GraphRAG performs. Because it does not summarise the graph in advance, Microsoft reports that its indexing cost is comparable to plain vector {{< relref "glossary/rag" >}} and roughly 0.1 percent of the cost of full GraphRAG, at comparable quality on global search. In other words, it delays the expensive LLM work until query time rather than paying for it during indexing, which is where full GraphRAG concentrates its spend. The result is graph-quality global search at close to vector-RAG indexing cost.

## LightRAG

LightRAG, from HKUDS, uses graph-structured indexing combined with a dual-level retrieval scheme. Retrieval operates at two levels, low-level and high-level, so the system can answer both specific and broad queries over the graph. LightRAG also supports incremental updates, so the index can be updated as new data arrives rather than rebuilt from scratch. This makes it a lighter-weight, updatable alternative for graph-based retrieval-augmented generation.

## Where they fit

These variants sit between plain vector RAG, which uses {{< relref "glossary/embeddings" >}} and a {{< relref "glossary/vector-database" >}} for similarity retrieval, and full GraphRAG, which adds an expensive LLM-built and LLM-summarised graph. The variants keep graph structure but lower the indexing bill: LazyGraphRAG by deferring the LLM and skipping upfront summarization, LightRAG by using dual-level retrieval over a graph index with incremental updates. They compose naturally with {{< relref "glossary/agentic-rag" >}} systems that need graph-aware retrieval without full-GraphRAG cost.

## Origins and History

LazyGraphRAG was introduced by Microsoft Research in the blog post "LazyGraphRAG: Setting a new standard for quality and cost" on 25 November 2024, which reports indexing cost comparable to plain vector RAG and roughly 0.1 percent of full GraphRAG cost at comparable global-search quality. LightRAG was introduced by Guo, Xia, Yu, Ao, and Huang (HKUDS) in "LightRAG: Simple and Fast Retrieval-Augmented Generation" (arXiv 2410.05779, EMNLP 2025), which describes graph-structured indexing, dual-level (low and high) retrieval, and support for incremental updates.

## Sources

1. Microsoft Research. *LazyGraphRAG: Setting a new standard for quality and cost.* 25 November 2024. [https://www.microsoft.com/en-us/research/blog/lazygraphrag-setting-a-new-standard-for-quality-and-cost/](https://www.microsoft.com/en-us/research/blog/lazygraphrag-setting-a-new-standard-for-quality-and-cost/)
2. Guo, Z., Xia, L., Yu, Y., Ao, T., Huang, C. (HKUDS). *LightRAG: Simple and Fast Retrieval-Augmented Generation.* EMNLP 2025. arXiv:2410.05779. [https://arxiv.org/abs/2410.05779](https://arxiv.org/abs/2410.05779)
