---
title: "Shadow Deployment Pattern for AI Models"
description: "Running new AI models in parallel with production models to compare outputs without affecting users. Implementation, comparison strategies, and promotion criteria."
date: 2026-03-28
categories: [Patterns]
tags: [deployment, testing, shadow-mode, model-evaluation, production]
last_updated: 2026-05-30
---

Shadow deployment runs a new model alongside the production model, processing the same inputs, but only serving the production model's outputs to users. The shadow model's outputs are logged for comparison. This lets you evaluate a new model on real production traffic without any risk to users.

## When to Use Shadow Deployment

Shadow deployment is the right choice when you need to validate a new model on real data that cannot be adequately represented by test datasets. Production traffic includes edge cases, distribution shifts, and input patterns that synthetic test data never captures. If you are replacing a model that handles critical decisions (fraud detection, content moderation, medical triage), shadow deployment is nearly mandatory.

**Not appropriate for** - Generative tasks where the output depends on prior conversation context that only the production model has. Models that take actions with side effects (sending emails, making API calls) since the shadow model would duplicate those actions. Extremely high-volume systems where doubling inference costs is prohibitive.

## Architecture

The shadow deployment pattern inserts a fork in the inference pipeline. Both models receive the same input. The production model's output is served to the user. The shadow model's output is written to a comparison log.

**Synchronous shadow** - Both models are called in parallel, and the response is returned when the production model completes. The shadow model's result is logged asynchronously. This is the simplest approach but doubles compute cost and may increase tail latency if the shadow model is slower.

**Asynchronous shadow** - The input is queued for the shadow model after the production model responds. This avoids latency impact but introduces a delay in comparison data. Suitable when real-time comparison is not needed and cost management is important.

**Sampled shadow** - Only a percentage of traffic is shadowed (e.g., 10-20%). This reduces cost proportionally while still providing statistically significant comparison data for most metrics. Use stratified sampling to ensure coverage across input types.

## Comparison Strategy

Logging shadow outputs is only useful if you have a rigorous comparison methodology.

**Exact match comparison** - For classification and extraction tasks, compare shadow and production outputs directly. Track agreement rate, and for disagreements, determine which was correct (using human review or ground truth data). This produces a clear accuracy comparison.

**Quality scoring** - For generative tasks, exact match is not meaningful. Instead, score both outputs on quality dimensions (relevance, accuracy, completeness, tone) using automated evaluation or human judges. Compare average quality scores across a representative sample.

**Regression detection** - The primary goal is ensuring the new model does not regress on any important metric. Define your quality floor: the new model must match or exceed the production model on all critical metrics before promotion. A model that is 5% better on average but 20% worse on a specific input category is a regression.

## Promotion Criteria

Define promotion criteria before starting the shadow deployment, not after reviewing results. This prevents post-hoc rationalization of mediocre results.

**Minimum sample size** - Process enough shadow traffic to achieve statistical significance on your comparison metrics. For binary classification, this typically means thousands of samples. For rare event detection, you may need weeks of shadow deployment.

**Performance gates** - Define hard gates: accuracy must be >= production model on all segments. Latency P99 must be within acceptable bounds. Error rate must not increase. And soft targets: improvement on the metrics that motivated the model change.

**Rollback plan** - Even after promotion, keep the old model available for rapid rollback. Monitor the promoted model closely for the first week, comparing against the shadow period's performance baseline.
