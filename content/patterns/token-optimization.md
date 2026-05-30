---
title: "Token Optimization Patterns for LLM Applications"
description: "Strategies for reducing token usage without sacrificing output quality. Prompt compression, context pruning, output formatting, and cost monitoring."
date: 2026-03-28
categories: [Patterns]
tags: [token-optimization, cost-management, prompt-engineering, performance]
last_updated: 2026-05-30
---

Token usage drives LLM costs directly. Every unnecessary token in your prompt or response is money spent on content that does not improve the output. Token optimization is not about being cheap - it is about being precise with what you send to the model and what you ask it to produce.

## Input Token Optimization

Reducing input tokens means sending the model less text while preserving the information it needs to produce good output.

**Context pruning** - Not all context is equally relevant. In RAG systems, retrieved documents often contain paragraphs of irrelevant text alongside the relevant passage. Extract and send only the relevant sections. A simple relevance scoring step between retrieval and generation can reduce input tokens by 40-60% with no quality loss.

**Prompt compression** - Verbose instructions consume tokens without improving output. "Please carefully analyze the following document and provide a detailed summary that captures the key points, main arguments, and important details" says the same thing as "Summarize this document covering key points and main arguments." Audit your prompts for verbosity regularly.

**Few-shot example selection** - If you use few-shot examples, select the minimum number that produces reliable output. Three well-chosen examples often perform as well as ten. For production systems, dynamically select examples most similar to the current input rather than using a static set.

**System prompt optimization** - System prompts are sent with every request. A 500-token system prompt on a system handling 100,000 requests per day consumes 50 million tokens per day. Minimize the system prompt to essential behavioral instructions and move detailed reference information to the user message only when needed.

## Output Token Optimization

Reducing output tokens means getting the model to produce concise, structured responses rather than verbose prose.

**Structured output formats** - Request JSON, CSV, or other structured formats instead of prose when the output will be parsed by code. Structured formats eliminate filler words and transitional phrases that add tokens without adding information.

**Maximum token limits** - Set appropriate max_tokens for each use case. A classification task needs 10 tokens, not the default 4096. A summary needs 200-500 tokens. Set limits per prompt template based on the expected output size plus a reasonable buffer.

**Stop sequences** - Define stop sequences that terminate generation when the useful output is complete. For structured outputs, the closing delimiter (closing brace, end tag) is a natural stop sequence. This prevents the model from generating additional unwanted text after the useful output.

## Architectural Optimizations

**Tiered model usage** - Use cheaper models for simple tasks and expensive models only for complex ones. A request router that sends 70% of traffic to a smaller model at one-tenth the per-token cost reduces total spend significantly.

**Batch processing** - For non-real-time workloads, batch multiple items into a single prompt when possible. Processing 10 items in one call is cheaper than 10 separate calls because the system prompt and instructions are paid once instead of ten times.

**Caching** - Cache responses for repeated or similar queries. Exact-match caching handles identical requests. Semantic caching handles rephrased versions of the same question. Even modest cache hit rates produce meaningful savings at scale.

## Cost Monitoring

**Per-prompt tracking** - Track token usage per prompt template, not just in aggregate. This identifies which prompts are the most expensive and where optimization effort will have the most impact.

**Budget alerting** - Set token budget alerts per application, per team, and per prompt. A sudden increase in token usage often indicates a bug (infinite loop, context window stuffing) rather than legitimate traffic growth.

**Cost attribution** - Attribute token costs to business functions or features. This enables informed decisions about which AI features are worth their cost and which need optimization or removal.
