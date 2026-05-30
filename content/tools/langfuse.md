---
title: "Langfuse - LLM Observability and Tracing"
description: "Using Langfuse to trace LLM calls, evaluate outputs, and monitor AI application quality in production."
date: 2026-03-24
categories: [Tools]
tags: ["ai-agents", "intermediate", "langfuse", "observability", "llm-monitoring", "tracing", "evaluation"]
last_updated: 2026-05-30
---

Langfuse is an open-source LLM observability platform. It captures traces of AI application execution - every model call, retrieval step, tool invocation, and latency - and provides tooling to evaluate output quality, debug failures, and measure cost over time. For AI applications in production, observability is not optional: without it, quality regressions and cost spikes are invisible.

Official documentation: https://langfuse.com/

## Why LLM Observability Matters

Standard application monitoring (error rates, latency, throughput) is insufficient for LLM applications. You also need to know:
- Which prompts produce poor outputs?
- Are retrieved documents actually relevant to queries?
- How does output quality change as you update prompts?
- What is the token cost per user session?
- Are certain user queries consistently failing?

Traditional APM tools do not capture this semantic layer. Langfuse does.

## Core Concepts

**Traces** are the top-level execution records. A trace represents one user interaction - a question answered, a document processed, a task completed. Traces contain **spans** (named steps within the execution) and **generations** (model calls with full input, output, and token counts).

A RAG trace might look like:
- `Trace: answer_question`
  - `Span: retrieve_context` (200ms, 5 documents retrieved)
  - `Generation: claude-sonnet-4-6` (850ms, 1200 input tokens, 320 output tokens)

**Scores** attach evaluation results to traces. A score can be:
- User feedback (thumbs up/down)
- LLM-as-judge evaluation (relevance, faithfulness, harmlessness rated by another model)
- Rule-based checks (output contains required fields, response is within length limit)

## Integration

Langfuse integrates via SDK or through framework callbacks:

```python
from langfuse import Langfuse
from langfuse.decorators import observe

langfuse = Langfuse()

@observe()
def answer_question(question: str) -> str:
    context = retrieve_documents(question)  # automatically traced
    response = call_bedrock(context, question)  # token counts captured
    return response
```

The `@observe()` decorator instruments functions automatically. For LlamaIndex and LangChain, drop-in callback handlers capture traces without code changes.

## Evals in Production

Langfuse's evaluation pipeline runs automated scoring on a sample of production traces. Define an evaluator (an LLM prompt that scores another model's output) and attach it to a dataset. Run evals on a schedule to detect quality drift between releases.

This is the practical way to answer: "did the prompt change I deployed last Tuesday make things better or worse?"

## Self-Hosted vs Cloud

Langfuse is available as a managed cloud service and as a self-hosted Docker deployment. For applications with data privacy requirements (healthcare, legal, financial), self-hosting is typically necessary. Self-hosting uses PostgreSQL for trace storage and Redis for queuing.

## Related Articles

- [Amazon Bedrock]({{< relref "amazon-bedrock.md" >}}) - LLM provider whose calls Langfuse traces
- [Pydantic AI]({{< relref "pydantic-ai.md" >}}) - agent framework with Langfuse integration
- [LlamaIndex]({{< relref "llamaindex.md" >}}) - RAG framework with Langfuse callbacks
