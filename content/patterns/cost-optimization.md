---
title: "AI Cost Optimization Patterns"
description: "Model selection by task, caching strategies, batch vs real-time processing, and tiered inference with Haiku, Sonnet, and Opus."
date: 2026-03-24
categories: [Patterns]
tags: ["architecture", "intermediate", "cost-optimization", "ai-costs", "efficiency", "budgeting", "llm"]
tools: [amazon-bedrock, claude-anthropic]
last_updated: 2026-05-30
---

AI inference costs in production are real and can be significant if not managed. A production system processing thousands of calls per day at premium model rates can easily accumulate 10,000-50,000 EUR per month in API costs. Cost optimization does not mean accepting lower quality - it means applying the right capability to each task at the right price.

## Tiered Model Selection

Not all tasks require the same capability. Claude's model family illustrates the spectrum:

- **Haiku** - Fastest, lowest cost. Suitable for: classification, extraction, routing decisions, simple summarization, validation tasks. Haiku costs roughly 10-15x less than Sonnet per token.
- **Sonnet** - Balanced capability and cost. Suitable for: complex extraction, multi-step reasoning, document analysis, code generation, customer-facing responses. The default choice for most production tasks.
- **Opus** - Highest capability, highest cost. Suitable for: complex analysis requiring deep reasoning, multi-document synthesis, tasks where quality difference is measurable and valuable.

The cost optimization strategy: default to Haiku for the first processing step (classify/route/validate), escalate to Sonnet for tasks that require it, and reserve Opus for tasks where the quality delta is demonstrably worth the cost premium. A well-tuned tiered system can reduce costs by 40-60% versus using Sonnet for everything.

Implementation pattern: after Haiku processes a request, include a confidence signal in the output. If confidence is below a threshold, escalate to Sonnet. This ensures the cost saving only applies when Haiku's output is actually sufficient.

## Caching

Prompt caching stores the computed representation of a prompt prefix, avoiding recomputation on repeated calls. Effective when: system prompts are long, knowledge base context is frequently reused, or the same documents are queried repeatedly.

Amazon Bedrock prompt caching (available for Claude models) can reduce costs by 60-80% for workloads where the same long context is used across many calls. A RAG system that retrieves the same 3 documents for 80% of queries benefits significantly from caching.

Semantic caching at the application layer stores previous responses and returns them for semantically similar queries. Useful for FAQ-type use cases where many users ask equivalent questions with different wording. Requires a similarity threshold: too high returns irrelevant cached results; too low misses valid cache hits.

## Batch vs. Real-Time Processing

Many AI workloads do not require real-time responses. Document processing, report generation, batch classification, and overnight analytics jobs can tolerate multi-minute or multi-hour latency. Batch processing is typically 50% cheaper than real-time inference for equivalent work.

Amazon Bedrock Batch Inference processes large volumes of requests asynchronously at reduced rates. Route non-time-sensitive workloads to batch endpoints. Examples: nightly processing of day's documents, weekly report generation, bulk metadata tagging of archive content.

## Input Optimization

Token costs scale with input size. Reducing input token count without sacrificing relevant context is free cost savings.

- Strip HTML, headers, footers, and navigation from web content before sending to the model
- Remove duplicate or redundant content (repeated boilerplate across documents)
- Truncate at relevant content rather than sending entire documents when only a section is needed
- Use structured prompts that are concise rather than verbose

For high-volume pipelines, a 10% reduction in average input tokens is a 10% cost reduction with zero quality impact if the removed tokens were not relevant to the task.

## Monitoring and Alerting

Set cost budgets and alerts. AWS Cost Explorer with daily granularity and budget alerts prevents unexpected spikes from going undetected. Log token consumption per workflow and per endpoint. Anomalies (an endpoint suddenly using 3x normal tokens) indicate bugs (context growing unboundedly, prompt template errors) before they become expensive.
