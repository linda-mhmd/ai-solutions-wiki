---
title: "A/B Testing Patterns for Machine Learning Models"
description: "Designing and running A/B tests for ML model changes. Traffic splitting, metric selection, statistical rigor, and common pitfalls."
date: 2026-03-28
categories: [Patterns]
tags: [ab-testing, experimentation, deployment, model-evaluation, statistics]
last_updated: 2026-05-30
---

A/B testing ML models is fundamentally different from A/B testing UI changes. Model outputs are probabilistic, effects can be subtle, and the interaction between model behavior and user behavior creates feedback loops that confuse naive analysis. Getting A/B testing right for ML requires careful experimental design.

## Traffic Splitting

How you split traffic between model variants matters more than you think.

**User-level splitting** - Each user is consistently assigned to one variant for the duration of the test. This prevents the confusion of a user experiencing different model behaviors across interactions. Hash the user ID to a variant assignment for deterministic, consistent splitting.

**Session-level splitting** - Each session is independently assigned. This produces faster statistical convergence but can confuse users who get different experiences across sessions. Appropriate for low-frequency interactions where users are unlikely to notice inconsistency.

**Request-level splitting** - Each individual request is randomly assigned. This is the simplest to implement but produces the noisiest results and the most inconsistent user experience. Only appropriate for backend systems where the user does not directly observe model output.

## Metric Selection

Choosing the right metrics determines whether your A/B test produces actionable results or noise.

**Primary metric** - Define a single primary metric that the model change is intended to improve. This is the metric you will use to make the ship/no-ship decision. For a recommendation model, this might be click-through rate. For a classification model, this might be accuracy or F1 score. Having a single primary metric prevents p-hacking across multiple metrics.

**Guardrail metrics** - Metrics that must not degrade, even if the primary metric improves. Latency, error rate, and user satisfaction are common guardrails. A model that improves click-through rate by 3% but increases latency by 200ms may not be a net positive.

**Leading vs. lagging indicators** - The ultimate business metric you care about (revenue, retention) may take weeks to measure. Identify leading indicators that correlate with the business metric and can be measured within the test duration. Validate that leading indicators actually predict the lagging metric using historical data.

## Statistical Rigor

ML A/B tests require more statistical care than typical product experiments.

**Power analysis** - Before starting the test, calculate the required sample size to detect the expected effect size with adequate statistical power (typically 80%). Under-powered tests waste time and resources. For subtle model improvements (1-2% accuracy gains), you may need tens of thousands of samples.

**Multiple testing correction** - If you analyze multiple metrics, apply correction for multiple comparisons (Bonferroni, Benjamini-Hochberg). Without correction, a test with 20 metrics will produce at least one "significant" result by chance alone.

**Novelty and primacy effects** - Users may initially engage more (or less) with a new model simply because it is different. Wait until the novelty effect dissipates before measuring steady-state performance. This typically requires 1-2 weeks of test duration beyond the minimum sample size requirement.

## Common Pitfalls

**Feedback loops** - A recommendation model influences what users see, which influences their behavior, which influences the data used to evaluate the model. This circularity can inflate apparent gains. Use holdout evaluations on pre-intervention data to validate.

**Simpson's paradox** - A model that appears better overall may actually be worse in every subgroup if the traffic split is imbalanced across segments. Always analyze results by key segments (user type, device, region) in addition to the overall metric.

**Peeking** - Checking results before the predetermined sample size is reached and stopping early when results look good inflates false positive rates. Use sequential testing methods (e.g., always valid p-values) if early stopping is operationally necessary.

**Interference** - In systems where users interact (social networks, marketplaces), treatment effects spill over between variants. A user in the control group may be affected by a treated user's changed behavior. Network-aware experimental designs (cluster randomization) address this but are complex to implement.

## Running the Test

**Duration** - Run for at least one full business cycle (typically one week minimum) to capture day-of-week effects. Two weeks is standard for most ML tests. Longer tests capture more variance but increase the opportunity cost of not shipping an improvement.

**Monitoring** - Monitor guardrail metrics in real-time during the test. Set automatic kill switches that terminate the test and revert to the control if any guardrail metric degrades beyond a defined threshold. Do not wait for the test to complete if something is clearly wrong.
