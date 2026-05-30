---
title: "Retrieval Routing Pattern"
description: "Smart routing between multiple knowledge sources based on query intent, selecting the optimal retrieval strategy for each request across vector stores, databases, APIs, and search engines."
date: 2026-03-28
categories: [Patterns]
tags: [retrieval, routing, rag, knowledge-management, vector-search, ai-engineering]
related:
  - patterns/rag-implementation
  - patterns/multi-model-routing
  - patterns/model-tier-routing
  - patterns/embedding-pipeline
  - patterns/vector-search-optimization
last_updated: 2026-05-30
---

Not every question should hit the same knowledge source. A question about company policy should query the policy document store. A question about a customer's order status should query the transactional database. A question about recent industry news should query a web search API. The retrieval routing pattern classifies incoming queries and directs each to the most appropriate knowledge source.

## Why Route

A naive RAG implementation sends every query to a single vector store. This breaks down as the knowledge base grows and diversifies. When product documentation, HR policies, engineering specs, and customer data all live in the same vector index, retrieval quality degrades. Irrelevant chunks from one domain pollute the context for queries about another domain.

Retrieval routing solves this by maintaining separate, domain-specific knowledge sources and intelligently selecting which ones to query for each request.

## Routing Strategies

**Classifier-based routing** - A lightweight model or a set of rules classifies the query intent and maps it to one or more knowledge sources. "What is our vacation policy?" routes to HR documents. "How do I configure the API rate limiter?" routes to engineering docs. Classification can use a small fine-tuned model, keyword matching, or an LLM call with a routing prompt.

**Embedding-based routing** - Compute the query embedding and compare it against representative embeddings for each knowledge source. Route to the source whose representative embeddings are most similar. This handles queries that do not match simple keyword rules.

**LLM-based routing** - Ask an LLM to analyze the query and select the appropriate sources. More flexible but slower and more expensive. Best reserved for ambiguous queries where simpler methods fail.

**Hybrid routing** - Try the cheap method first. If confidence is low, escalate to a more expensive method. Most queries are straightforward enough for keyword or embedding-based routing.

## Multi-Source Retrieval

Some queries require information from multiple sources. "Compare our Q3 revenue to the industry average" needs both internal financial data and external market data. The router identifies these multi-source queries and fans out retrieval to all relevant sources, then merges results before passing them to the LLM.

Result merging requires deduplication and relevance re-ranking across sources. A cross-source reranker scores all retrieved chunks together, regardless of origin, and selects the top results for the final context.

## Fallback Behavior

When the router has low confidence in its source selection, or when the selected source returns no relevant results, a fallback strategy is essential. Common fallbacks include broadening the search to additional sources, falling back to web search, or returning an honest "I don't have information about that" rather than generating an answer from insufficient context.

## Implementation Tips

Start with two or three clearly distinct knowledge sources and a simple keyword-based router. Measure retrieval quality per source. Add routing sophistication only when you have evidence that simple routing is making mistakes. Log every routing decision so you can audit and improve the classifier over time.
