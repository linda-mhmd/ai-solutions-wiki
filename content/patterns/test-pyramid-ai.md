---
title: "AI-Adapted Test Pyramid"
description: "The testing pyramid adapted for AI systems: unit tests for deterministic logic, integration tests with mocked models, evaluation tests with real models, and production monitoring."
date: 2026-03-28
categories: [Patterns]
tags: [testing, test-pyramid, architecture, ai-engineering, quality]
related:
  - guides/testing-ai-systems
  - guides/unit-testing-ai-applications
  - guides/integration-testing-ai-pipelines
  - guides/ci-cd-testing-ai
last_updated: 2026-05-30
---

The traditional test pyramid (many unit tests, fewer integration tests, fewest E2E tests) applies to AI systems but needs an additional layer: evaluation tests that validate model output quality. The AI test pyramid has four layers, each with distinct characteristics.

## Layer 1: Unit Tests (Deterministic Logic)

**What they test:** Prompt template rendering, output parsers, input validators, chunking functions, embedding preprocessing, configuration loading, error handling, and all other deterministic code.

**Characteristics:**
- Run in milliseconds
- No external dependencies (no API calls, no databases)
- Deterministic: same input always produces same output
- Free: zero API cost

**Volume:** Hundreds of tests. This is the largest layer.

**When they run:** Every commit, every PR. Must all pass before merge.

```python
def test_prompt_template_renders():
    prompt = render_prompt(question="test", context=["chunk1"])
    assert "test" in prompt
    assert "chunk1" in prompt
```

## Layer 2: Integration Tests (Mocked Models)

**What they test:** Component interactions: retrieval pipeline produces correct format for prompt builder, prompt builder produces valid request for model API, response parser handles model output correctly. Model APIs are mocked with deterministic stubs.

**Characteristics:**
- Run in seconds
- Use mocked model clients and containerized infrastructure (vector DBs, caches)
- Deterministic with mocked models
- Free: zero API cost

**Volume:** Tens of tests. Focus on interface verification, not exhaustive input coverage.

**When they run:** Every PR. Should complete within 5 minutes.

```python
def test_rag_pipeline_integration(seeded_vector_db, mock_model):
    pipeline = RAGPipeline(vector_store=seeded_vector_db, model=mock_model)
    result = pipeline.run("Who created Python?")
    assert result.answer is not None
    assert len(result.sources) > 0
```

## Layer 3: Evaluation Tests (Real Models)

**What they test:** Model output quality against curated test cases. Uses real model APIs (or lightweight proxy models) to validate that the system produces good answers, not just structurally valid ones.

**Characteristics:**
- Run in minutes
- Call real model APIs
- Non-deterministic: use statistical assertions
- Costly: consumes API tokens

**Volume:** 50-500 test cases with defined quality thresholds.

**When they run:** On merge to main (focused subset) and on a nightly schedule (full suite). Not on every PR.

```python
def test_golden_dataset_accuracy():
    golden = load_golden_dataset()
    correct = sum(1 for case in golden if evaluate(pipeline.run(case.input), case.expected) >= 0.8)
    assert correct / len(golden) >= 0.85
```

## Layer 4: Production Monitoring

**What it tests:** Real-world system quality with live traffic. Catches distribution shift, model degradation, and edge cases that no test suite covers.

**Characteristics:**
- Runs continuously
- Samples and evaluates production traffic
- Alerts on quality degradation
- No additional API cost (uses production traffic)

**Volume:** Continuous. Evaluates 5-10% of production requests.

**When it runs:** Always. This is monitoring, not testing.

## The Shape of the Pyramid

```
        /\
       /  \   Production Monitoring (continuous)
      /    \
     /------\  Evaluation Tests (50-500 cases, scheduled)
    /        \
   /----------\  Integration Tests (tens, every PR)
  /            \
 /--------------\  Unit Tests (hundreds, every commit)
```

The width of each layer represents volume. The pyramid is widest at the bottom (many fast, cheap unit tests) and narrowest at the top (continuous monitoring of sampled production traffic).

## Anti-Patterns

**Inverted pyramid.** Too many eval tests, too few unit tests. The test suite is slow, expensive, and flaky. Most bugs that eval tests catch could be caught faster and cheaper with unit and integration tests.

**Missing evaluation layer.** Only unit and integration tests. The system is structurally correct but output quality is unknown. Quality regressions reach production undetected.

**No production monitoring.** All layers below production are covered, but nobody knows if production quality is degrading. Distribution shift and model provider changes go unnoticed.

**Evaluating everything everywhere.** Running the full eval suite on every PR. This is slow, expensive, and blocks development velocity. Reserve costly evaluation for merge-to-main and scheduled runs.

## Implementation

Map each layer to a CI/CD stage. Use pytest markers, directory structure, or both to separate the layers. Configure GitHub Actions (or your CI system) to run the appropriate tests at each stage. Set cost budgets for the evaluation layer to prevent runaway spending.
