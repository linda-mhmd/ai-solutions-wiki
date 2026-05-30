---
title: "Statistical Assertion Pattern"
description: "A testing pattern for non-deterministic AI outputs: run N times, assert success rate exceeds threshold, use confidence intervals to account for sampling noise."
date: 2026-03-28
categories: [Patterns]
tags: [testing, statistics, non-determinism, assertions, ai-engineering]
related:
  - guides/testing-non-deterministic-systems
  - guides/testing-ai-systems
  - glossary/flaky-test
  - patterns/semantic-assertion
last_updated: 2026-05-30
---

The statistical assertion pattern replaces exact-match test assertions with aggregate success rate checks across multiple runs. Instead of asserting that a single AI output matches an expected value, you run the test N times and assert that the success rate exceeds a threshold with statistical confidence.

## The Problem

AI systems produce different outputs for the same input. A test that asserts `response == "Paris"` will pass when the model says "Paris" and fail when it says "The capital of France is Paris." Both answers are correct, but exact-match assertions cannot accommodate this variation. The result is a flaky test that erodes trust in the test suite.

## The Pattern

```python
def test_classification_accuracy():
    test_cases = load_golden_dataset()
    correct = 0

    for case in test_cases:
        result = classify(case["input"])
        if result.label == case["expected_label"]:
            correct += 1

    accuracy = correct / len(test_cases)
    assert accuracy >= 0.85, f"Accuracy {accuracy:.2%} below 85% threshold"
```

**Key elements:**

1. **Multiple test cases.** Run against a dataset, not a single example. More cases produce more stable metrics.
2. **Threshold with margin.** Set the threshold below the model's typical performance. If the model usually achieves 92%, set the threshold at 85%. The margin absorbs natural variation without masking real regressions.
3. **Clear failure message.** Report the actual metric value so developers can assess severity.

## Adding Confidence Intervals

With small test sets, the observed accuracy has wide uncertainty. A model that scores 90% on 20 test cases could have true accuracy anywhere from 70% to 98%. Use confidence intervals to account for this.

```python
import math

def wilson_ci_lower(successes: int, trials: int, z: float = 1.96) -> float:
    """Lower bound of Wilson score confidence interval."""
    p = successes / trials
    denominator = 1 + z**2 / trials
    center = (p + z**2 / (2 * trials)) / denominator
    margin = (z / denominator) * math.sqrt(p * (1 - p) / trials + z**2 / (4 * trials**2))
    return center - margin

def test_with_confidence_interval():
    successes = 45
    trials = 50
    lower_bound = wilson_ci_lower(successes, trials)
    assert lower_bound >= 0.80, (
        f"Lower 95% CI bound ({lower_bound:.2%}) below 80% minimum. "
        f"Observed: {successes}/{trials} = {successes/trials:.2%}"
    )
```

Assert on the lower bound of the confidence interval rather than the point estimate. This prevents accepting a model that just happened to score well on a small sample.

## When to Use

Use statistical assertions for any test that evaluates model output quality: classification accuracy, retrieval recall, answer relevance, guardrail trigger rates, and generation quality scores. Do not use them for deterministic logic (prompt rendering, parsing, validation), where exact-match assertions are appropriate and flakiness indicates a real bug.

## Choosing Parameters

**Sample size (N).** More samples produce tighter confidence intervals. For CI-friendly test suites, 50-200 cases balance precision with execution time and cost. For nightly regression suites, use 500 or more.

**Threshold.** Set 5-10 percentage points below expected performance. Review and adjust the threshold quarterly as the model improves or the task changes.

**Confidence level.** The standard 95% confidence level (z=1.96) works for most cases. Use 99% (z=2.576) for safety-critical applications where you need stronger assurance.
