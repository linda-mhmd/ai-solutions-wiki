---
title: "Semantic Assertion Pattern"
description: "Asserting AI output correctness via semantic similarity rather than exact string match: embedding-based comparison, LLM-as-judge, and threshold tuning."
date: 2026-03-28
categories: [Patterns]
tags: [testing, semantic-similarity, assertions, embeddings, ai-engineering]
related:
  - guides/testing-non-deterministic-systems
  - guides/snapshot-testing-ai
  - patterns/statistical-assertion
  - glossary/snapshot-testing
last_updated: 2026-05-30
---

The semantic assertion pattern replaces exact string comparison in test assertions with semantic similarity checks. Instead of asserting that the AI output equals a specific string, you assert that it means the same thing as the expected output, even if the wording differs.

## The Problem

AI systems express the same answer in many ways. "Paris is the capital of France," "The capital of France is Paris," and "France's capital city is Paris" are all correct answers to the same question. An exact-match assertion fails on two of these three valid responses. This makes tests brittle and produces false failures that waste developer time.

## Embedding-Based Semantic Comparison

Compute embeddings for both the expected and actual outputs, then compare their cosine similarity.

```python
from sentence_transformers import SentenceTransformer, util

_model = SentenceTransformer("all-MiniLM-L6-v2")

def assert_semantically_similar(actual: str, expected: str, threshold: float = 0.80):
    """Assert that actual and expected are semantically similar."""
    embeddings = _model.encode([actual, expected], convert_to_tensor=True)
    similarity = float(util.cos_sim(embeddings[0], embeddings[1]))
    assert similarity >= threshold, (
        f"Semantic similarity {similarity:.3f} below threshold {threshold}.\n"
        f"Expected: {expected}\n"
        f"Actual:   {actual}"
    )
```

Usage in tests:

```python
def test_answer_semantic_correctness():
    response = pipeline.run("What is the capital of France?")
    assert_semantically_similar(
        response.answer,
        "Paris is the capital of France.",
        threshold=0.75
    )
```

The embedding model (`all-MiniLM-L6-v2`) runs locally, costs nothing, and executes in milliseconds. It captures semantic similarity without relying on an external API.

## LLM-as-Judge

For complex outputs where embedding similarity is insufficient (multi-paragraph answers, nuanced reasoning, structured arguments), use an LLM to judge whether the actual output is equivalent to the expected output.

```python
def assert_llm_judged_equivalent(actual: str, expected: str, criteria: str):
    """Use an LLM to judge semantic equivalence."""
    prompt = f"""Determine if the actual response is semantically equivalent to the expected response.

Expected: {expected}
Actual: {actual}
Criteria: {criteria}

Respond with exactly "PASS" or "FAIL" followed by a one-sentence reason."""

    judgment = judge_model.generate(prompt, temperature=0)
    assert judgment.strip().startswith("PASS"), (
        f"LLM judge ruled FAIL.\nExpected: {expected}\nActual: {actual}\nJudgment: {judgment}"
    )
```

LLM-as-judge is more expensive (requires an API call per assertion) and slower, but it understands nuance that embedding similarity misses: factual correctness, logical consistency, and completeness.

## Threshold Tuning

The similarity threshold determines how different the output can be before the test fails.

- **0.90-1.00:** Very strict. Only minor wording changes pass. Use for factual statements where precision matters.
- **0.75-0.90:** Moderate. Paraphrasing passes but different topics fail. Use for most answer quality assertions.
- **0.60-0.75:** Lenient. Topically related content passes. Use for broad relevance checks.
- **Below 0.60:** Too lenient for most test purposes. Even unrelated text may pass.

Calibrate the threshold empirically: collect 20-30 pairs of correct and incorrect responses, compute similarity scores, and set the threshold at the value that separates correct from incorrect with the least overlap.

## Combining with Structural Assertions

Semantic assertions work best combined with structural checks. Assert structure exactly (correct fields, valid types, proper formatting) and assert content semantically (meaning matches expected answer).

```python
def test_rag_response(pipeline):
    result = pipeline.run("What is Python?")

    # Structural assertions: exact
    assert isinstance(result.answer, str)
    assert len(result.sources) > 0
    assert all(hasattr(s, "score") for s in result.sources)

    # Semantic assertion: flexible
    assert_semantically_similar(
        result.answer,
        "Python is a high-level programming language created by Guido van Rossum.",
        threshold=0.75
    )
```

## When to Use

Use semantic assertions when testing AI-generated text where the meaning matters more than the exact wording. Do not use them for deterministic outputs (configuration values, parsed fields, computed scores) where exact-match assertions are appropriate. Semantic assertions add complexity and a dependency on an embedding model, so use them only where exact-match assertions would produce false failures.
