---
title: "Testing Non-Deterministic Systems"
description: "Strategies for testing AI systems where the same input produces different outputs: statistical assertions, distribution testing, confidence intervals, Monte Carlo approaches, and flaky test management."
date: 2026-03-28
categories: [Guides]
tags: [testing, non-determinism, statistics, flaky-tests, ai-engineering]
related:
  - guides/testing-ai-systems
  - patterns/statistical-assertion
  - glossary/flaky-test
  - guides/testing-llm-applications
last_updated: 2026-05-30
---

The core challenge of testing AI systems is non-determinism. The same prompt sent to the same model with the same parameters can produce different outputs on different runs. Temperature, sampling, and internal model state all contribute to output variation. This does not make testing impossible. It means replacing exact-match assertions with statistical assertions that validate distributions and properties.

## Statistical Assertion Patterns

Instead of asserting that a single output matches an expected value, run the test N times and assert that the success rate exceeds a threshold.

```python
import pytest

def test_classification_accuracy():
    """The model should correctly classify sentiment at least 85% of the time."""
    test_cases = [
        ("I love this product!", "positive"),
        ("This is terrible.", "negative"),
        ("The package arrived on Tuesday.", "neutral"),
        # ... 50+ test cases
    ]
    correct = 0
    for text, expected_label in test_cases:
        result = classify_sentiment(text)
        if result.label == expected_label:
            correct += 1

    accuracy = correct / len(test_cases)
    assert accuracy >= 0.85, f"Accuracy {accuracy:.2%} below 85% threshold"
```

This is not a flaky test. The threshold is set below the model's expected accuracy, providing a margin. If the model consistently achieves 92% accuracy, a threshold of 85% will fail only when something is genuinely wrong.

## Distribution Testing

Beyond pass/fail rates, test that the distribution of outputs matches expectations.

```python
from collections import Counter

def test_response_length_distribution():
    """Response lengths should follow expected distribution."""
    lengths = []
    for _ in range(100):
        response = generate_response("Explain photosynthesis in simple terms.")
        lengths.append(len(response.split()))

    avg_length = sum(lengths) / len(lengths)
    assert 30 <= avg_length <= 150, f"Average response length {avg_length} outside expected range"

    # No response should be empty or absurdly long
    assert all(l > 0 for l in lengths), "Empty response detected"
    assert all(l < 500 for l in lengths), "Excessively long response detected"
```

**Label distribution testing.** When a model classifies inputs, verify that the distribution of predicted labels roughly matches the expected distribution of the test set. A model that predicts "positive" for everything will have high accuracy on a positive-heavy test set but fail a distribution test.

## Confidence Intervals for Quality Assertions

When evaluating model quality with a finite test set, account for sampling uncertainty. A model that scores 90% on 50 test cases could have a true accuracy anywhere from roughly 82% to 98% (95% confidence interval).

```python
import math

def wilson_confidence_interval(successes, trials, z=1.96):
    """Wilson score interval for binomial proportion."""
    p_hat = successes / trials
    denominator = 1 + z**2 / trials
    center = (p_hat + z**2 / (2 * trials)) / denominator
    margin = (z / denominator) * math.sqrt(p_hat * (1 - p_hat) / trials + z**2 / (4 * trials**2))
    return center - margin, center + margin

def test_model_accuracy_with_confidence():
    successes = 45
    trials = 50
    lower, upper = wilson_confidence_interval(successes, trials)
    # Assert the lower bound of the confidence interval exceeds minimum
    assert lower >= 0.80, f"Lower CI bound {lower:.2%} below 80% minimum"
```

Use this approach when your test set is small (under 200 cases). With larger test sets, the confidence interval narrows and the point estimate becomes reliable enough for direct threshold comparison.

## Monte Carlo Test Approaches

For complex systems where outputs depend on multiple stochastic components, use Monte Carlo methods to assess overall system behavior.

```python
def test_rag_pipeline_monte_carlo():
    """Run the full pipeline many times and verify aggregate quality."""
    questions = load_test_questions()  # 20 curated questions with ground truth
    results = {"correct": 0, "partially_correct": 0, "incorrect": 0, "error": 0}

    for question in questions:
        for trial in range(5):  # 5 runs per question
            try:
                response = rag_pipeline.run(question.text)
                score = evaluate_response(response, question.ground_truth)
                if score >= 0.8:
                    results["correct"] += 1
                elif score >= 0.5:
                    results["partially_correct"] += 1
                else:
                    results["incorrect"] += 1
            except Exception:
                results["error"] += 1

    total = sum(results.values())
    assert results["correct"] / total >= 0.70, f"Correct rate too low: {results}"
    assert results["error"] / total <= 0.02, f"Error rate too high: {results}"
```

Monte Carlo testing is expensive (N questions times M trials times the cost per call). Reserve it for scheduled test suites, not PR-level checks.

## Hypothesis Testing (Statistical)

Use formal statistical hypothesis testing to compare model versions or configurations.

**The setup:** Run both models on the same test set. Count successes for each. Use a paired test (McNemar's test for classification, paired t-test for continuous scores) to determine whether the difference is statistically significant.

```python
from scipy.stats import binomtest

def test_new_model_not_worse_than_baseline():
    """Verify new model is not significantly worse than baseline."""
    baseline_correct = 87
    new_model_correct = 82
    total = 100

    # One-sided test: is new model significantly worse?
    result = binomtest(new_model_correct, total, baseline_correct / total, alternative="less")
    assert result.pvalue > 0.05, (
        f"New model is significantly worse (p={result.pvalue:.3f}). "
        f"Baseline: {baseline_correct}%, New: {new_model_correct}%"
    )
```

This prevents rejecting a new model based on noise. A drop from 87% to 82% on 100 samples may not be statistically significant.

## Managing Flaky Tests in AI Systems

Some test flakiness is inherent when testing non-deterministic systems. Manage it rather than ignoring it.

**Set thresholds with margin.** If the model typically achieves 92% accuracy, set the test threshold at 85%, not 90%. The margin absorbs run-to-run variation without masking real regressions.

**Increase sample size.** A test that runs one prediction is highly variable. A test that runs 100 predictions is stable. The cost is execution time and API calls.

**Retry with caution.** Retrying flaky tests can mask real issues. If you retry, limit to 2 attempts and log every retry. If a test requires retries more than 5% of the time, the threshold is too tight or the model is unstable.

**Separate deterministic and non-deterministic suites.** Run deterministic tests (unit, mocked integration) on every PR. Run non-deterministic tests (eval with real models) on a schedule. This prevents non-deterministic tests from blocking development velocity.

**Track flake rates.** Monitor which tests fail intermittently and at what rate. A test that fails 20% of the time is providing information: either the model is inconsistent for that case, or the threshold needs adjustment.

## Temperature and Seed Control

When testing, set temperature to 0 and use a seed (if the API supports it) to reduce variability. This does not make outputs fully deterministic (API providers do not guarantee determinism even with seed), but it reduces variation significantly.

```python
response = client.chat.completions.create(
    model="gpt-4o",
    messages=[{"role": "user", "content": prompt}],
    temperature=0,
    seed=42
)
```

Do not rely on this for exact-match assertions. Even with temperature 0 and a seed, outputs can vary across API versions and infrastructure changes. Use it to reduce noise, not eliminate it.
