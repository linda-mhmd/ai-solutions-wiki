---
title: "A/B Testing for AI Systems"
description: "How to design and run A/B tests for AI models and features, covering experiment design, traffic splitting, metrics selection, and statistical analysis."
date: 2026-03-28
categories: [Guides]
tags: [a-b-testing, experimentation, evaluation, production, AI-development]
related:
  - guides/testing-ai-systems
  - guides/testing-llm-applications
  - guides/llm-evaluation-methods
  - patterns/feature-flags-ai
  - patterns/observability-ai
last_updated: 2026-05-30
---

A/B testing AI systems is more complex than A/B testing traditional software changes. Model improvements that look significant in offline evaluation may show no impact in production. Conversely, changes that seem marginal offline can produce meaningful business improvements. A/B testing is the only reliable way to validate AI changes in production.

## Why Offline Evaluation Is Not Enough

Offline evaluation (testing on a held-out dataset) has fundamental limitations:

**The test set is static.** Production data changes over time. A model that performs well on a test set from three months ago may not perform well on today's traffic.

**User behavior is not captured.** Offline metrics measure prediction accuracy. They do not measure whether users trust the predictions, act on them, or find them useful.

**System effects are invisible.** A faster model might increase user engagement even at the same accuracy level. A model with better explainability might increase user trust and adoption. These effects are invisible offline.

**Feedback loops exist.** In production, model predictions influence user behavior, which influences future data. These dynamics cannot be simulated in offline evaluation.

## Experiment Design

### Defining the Hypothesis

Every A/B test should start with a clear hypothesis: "Replacing model A with model B will increase click-through rate by at least 3% because model B has 5% higher offline accuracy on recent data."

The hypothesis should specify:
- **The change:** What is different between control and treatment?
- **The expected effect:** What metric will change, and by how much?
- **The mechanism:** Why do you expect this change?

### Choosing Metrics

**Primary metric.** The single metric that determines success or failure. Choose a business metric, not a model metric. "Click-through rate" or "task completion rate" rather than "model accuracy."

**Secondary metrics.** Additional metrics that provide context. Model accuracy, latency, error rates, user satisfaction scores. These help explain why the primary metric changed (or did not).

**Guardrail metrics.** Metrics that must not degrade. Even if the primary metric improves, a degradation in guardrail metrics (latency exceeding SLA, error rate increasing, fairness metrics worsening) should block the change.

### Sample Size Calculation

Determine how long to run the test before you start:

The required sample size depends on:
- **Baseline conversion rate.** What is the current value of the primary metric?
- **Minimum detectable effect.** What is the smallest improvement worth detecting?
- **Statistical significance level.** Typically 0.05 (5% false positive rate).
- **Statistical power.** Typically 0.80 (80% chance of detecting a real effect).

For common scenarios: detecting a 2% relative improvement in a 10% baseline conversion rate at 95% confidence and 80% power requires approximately 40,000 observations per group. At 1,000 observations per day, that is a 40-day experiment.

Running an experiment for too short a period produces unreliable results. Running too long wastes time and exposes users to a potentially inferior experience.

### Traffic Splitting

**Random assignment.** Users (or requests) are randomly assigned to control or treatment groups. Random assignment is essential - non-random splits invalidate the results.

**User-level assignment.** For AI features that users interact with repeatedly, assign at the user level, not the request level. A user should see the same model consistently to avoid confusion.

**Gradual ramp-up.** Start with a small treatment group (5-10%) to catch severe problems, then increase to 50/50 once the treatment appears safe.

**Sticky assignment.** Ensure that assignment is deterministic - the same user always sees the same variant. Use a hash of user ID modulo the number of buckets.

## Running the Experiment

**Pre-experiment validation.** Before exposing users, run an A/A test (both groups see the same model) to verify that the splitting mechanism is working correctly and that metrics are comparable across groups.

**Monitor continuously.** Check for data quality issues, traffic imbalances, and extreme metric values daily. Do not check for statistical significance daily (that leads to early stopping bias).

**Document everything.** Record the start date, end date, hypothesis, traffic split, any configuration changes during the experiment, and the final results.

## Analysis

### Statistical Testing

Compare the primary metric between control and treatment using an appropriate test:

**For proportions** (click-through rate, conversion rate): use a two-proportion z-test or chi-squared test.

**For continuous metrics** (revenue, time on task): use a two-sample t-test or Mann-Whitney U test if the distribution is skewed.

**For count metrics** (number of errors, support tickets): use a Poisson rate test.

Report the p-value and the confidence interval for the effect size. A statistically significant result with a tiny effect size may not be worth the engineering cost of deployment.

### Segment Analysis

Check whether the effect is consistent across user segments:
- New vs. returning users
- Different geographic regions
- Different device types
- Different use case categories

A model that improves the average metric but degrades performance for a critical segment should not be deployed.

### Interpreting Results

**Statistically significant positive result.** The treatment is better. Deploy it, but continue monitoring post-deployment.

**Statistically significant negative result.** The treatment is worse. Do not deploy. Investigate why offline improvements did not translate to online improvements.

**Not statistically significant.** The experiment is inconclusive. Either the effect is too small to detect with the current sample size, or there is genuinely no effect. Decide whether to run a longer experiment, try a different change, or accept the current model.

## Common Mistakes

**Peeking at results.** Checking for significance daily and stopping the experiment when p < 0.05 inflates the false positive rate dramatically. Commit to a sample size and run the full experiment.

**Testing too many variants.** Each additional variant requires more sample size for reliable results. Limit to 2-3 variants maximum.

**Ignoring novelty effects.** Users may engage more with a new feature simply because it is new. Run experiments long enough (at least 2-4 weeks) for novelty effects to fade.

**No post-deployment monitoring.** The experiment showed an improvement, but conditions change. Monitor the deployed model continuously.

A/B testing is the gold standard for validating AI changes in production. The investment in proper experiment infrastructure pays for itself by preventing the deployment of changes that look good on paper but hurt the business in practice.
