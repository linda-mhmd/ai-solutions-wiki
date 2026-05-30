---
title: "Testing AI Systems - Unit Tests to Production Monitoring"
description: "A practical testing strategy for AI systems: property-based testing, integration testing with mocked models, evaluation frameworks, and production monitoring that catches quality regressions."
date: 2026-03-25
categories: [Guides]
tags: ["software-engineering", "intermediate", "testing", "ai-testing", "evaluation", "quality-assurance", "llm"]
related:
  - glossary/property-based-testing
  - guides/ci-cd-for-ai
  - patterns/circuit-breaker-ai
  - patterns/feature-flags-ai
  - tools/langfuse
last_updated: 2026-05-30
---

Testing AI systems is harder than testing deterministic software because the outputs are probabilistic. The same input can produce different outputs on different runs. But "harder" does not mean "impossible" - it means applying a different testing strategy that validates properties and distributions rather than exact outputs.

## The Testing Pyramid for AI Systems

The standard testing pyramid (unit, integration, end-to-end) applies, with AI-specific adaptations at each layer.

**Unit tests** - Test deterministic logic: chunking functions, prompt template rendering, output parsers, metadata extraction, data validation. These run in milliseconds and do not call the model API. They should constitute the majority of your test suite.

**Integration tests with mocked models** - Test that your pipeline assembles correctly: that the retrieval service returns results in the expected format, that the inference service sends the right prompt structure, that the output service formats responses correctly. Mock the model API with a deterministic stub that returns fixture responses.

**Evaluation tests** - Run a set of test cases through the real model (or a fast proxy model) and evaluate outputs against quality criteria. These are slower and more expensive. Run them in CI on the main branch and on every proposed model or prompt change.

**Production monitoring** - Continuously sample and evaluate live traffic. Alert when quality metrics degrade. This is the only layer that catches distribution shift (when the real-world query distribution changes and your model starts performing worse).

## Property-Based Testing for AI Pipelines

Property-based testing generates many inputs and checks that properties hold across all of them, rather than checking exact outputs for specific inputs. For AI systems, this is particularly valuable because model outputs are varied but should satisfy invariants.

Properties to test in a RAG system:
- Retrieved chunks always come from the source collection (no hallucinated sources)
- Confidence scores are always between 0 and 1
- The response length never exceeds the configured maximum
- Responses are never empty for non-empty, valid queries
- Structured output (JSON) always parses successfully when the model is instructed to return JSON

Using Hypothesis (Python):

```python
from hypothesis import given, strategies as st
from your_pipeline import chunk_document, validate_chunk

@given(st.text(min_size=1, max_size=10000))
def test_chunker_never_produces_empty_chunks(text):
    chunks = chunk_document(text, chunk_size=500, overlap=50)
    assert all(len(c.text) > 0 for c in chunks)

@given(st.text(min_size=1, max_size=10000))
def test_chunker_covers_all_input(text):
    chunks = chunk_document(text, chunk_size=500, overlap=50)
    reconstructed = " ".join(c.text for c in chunks)
    # Every word in the input appears in at least one chunk
    for word in text.split():
        assert word in reconstructed
```

## Mocking Model APIs in Integration Tests

Do not call real model APIs in integration tests. Use deterministic stubs that return fixture responses for known inputs, or programmatic responses based on input properties.

```python
class MockBedrockClient:
    def __init__(self, responses: dict):
        self.responses = responses
        self.calls = []

    def invoke_model(self, modelId, body):
        self.calls.append({"modelId": modelId, "body": body})
        prompt_hash = hashlib.md5(body.encode()).hexdigest()
        if prompt_hash in self.responses:
            return self.responses[prompt_hash]
        # Default: return a valid but generic response
        return json.dumps({"completion": "This is a test response.", "stop_reason": "end_turn"})
```

This lets you test that your pipeline sends correctly formatted requests, handles the response correctly, and propagates errors properly - all without spending tokens or depending on API availability.

## Evaluation Frameworks

An evaluation framework runs a set of curated test cases through the pipeline and measures output quality. The test cases include the input, and one of:
- A reference answer (for exact-match or similarity-based evaluation)
- A set of criteria the answer should satisfy (for rubric-based evaluation)
- A set of facts that should appear in the answer (for factual recall evaluation)

**LLM-as-judge** - Use a capable model to score outputs. Provide the input, the output, and an evaluation rubric. The judge model returns a score and a reason. This scales better than human evaluation for large test sets, but requires validating that the judge's scores correlate with human judgement.

**Ragas** - An open-source framework specifically for RAG evaluation. Measures faithfulness (does the answer stay within the retrieved context?), answer relevance (does the answer address the question?), and context recall (did retrieval surface the right chunks?).

**Langfuse** - An LLM observability platform that includes evaluation workflows. Logs traces (prompt + response + metadata) and allows running evaluators against logged traces, including production traces sampled at a defined rate.

## Evaluating Retrieval Separately from Generation

RAG systems have two distinct quality dimensions. Evaluate them separately.

**Retrieval quality** - Given a question and the ground-truth document that contains the answer, does the retrieval system return that document in the top K results? Measure recall@K and mean reciprocal rank across your test set. Retrieval quality degrades as the index grows or when query distributions shift.

**Generation quality** - Given the correct context, does the model generate an accurate, faithful, well-formatted response? Test this by providing the ground-truth context (bypassing retrieval) and evaluating the model's response directly.

Separating these makes it much easier to diagnose quality regressions: if retrieval recall drops, that is a vector index or embedding model problem. If generation quality drops with the same context, that is a prompt or model problem.

## Production Monitoring

Tests run before deployment. Monitoring catches what tests miss: production traffic that looks different from your test set.

**Structured logging** - Log every request with its input, retrieved chunks, prompt (or prompt hash), response, and metadata. Store in a format that allows querying (CloudWatch Logs Insights, S3 + Athena, or a dedicated LLM observability tool like Langfuse).

**Sampling and evaluation** - Sample 5-10% of production traffic and run automated evaluators against it. Track evaluator scores over time. Alert when the 7-day rolling average drops more than 10% below the baseline established at deployment.

**Error rate monitoring** - Track model API errors (timeouts, rate limits, parse failures) separately from evaluation quality. Both can indicate problems, but they require different responses.

**Latency tracking** - p50, p95, and p99 latency by model and by pipeline stage. Latency increases before full failures, making it an early warning indicator.
