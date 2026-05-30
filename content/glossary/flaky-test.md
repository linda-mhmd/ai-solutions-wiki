---
title: "Flaky Test"
description: "What flaky tests are, why they are especially common in AI systems, and strategies for managing non-deterministic test failures."
date: 2026-03-28
categories: [Glossary]
tags: [flaky-test, testing, non-determinism, quality, ai-engineering]
related:
  - guides/testing-non-deterministic-systems
  - guides/testing-ai-systems
  - glossary/unit-testing
  - patterns/statistical-assertion
last_updated: 2026-05-30
---

A flaky test is a test that sometimes passes and sometimes fails without any change to the code being tested. The test result is non-deterministic: run it ten times and it might pass eight times and fail twice. Flaky tests erode trust in the test suite because developers start ignoring test failures, assuming they are flakes rather than real bugs.

## Why Flaky Tests Are Common in AI Systems

AI systems are inherently non-deterministic. Model outputs vary between runs due to temperature sampling, internal state, and API-side changes. A test that asserts `model.generate("What is 2+2?") == "4"` may pass 95% of the time but fail when the model responds "The answer is 4" or "2+2 equals four." This is not a code bug. It is a test that makes too-specific assertions about non-deterministic output.

Other sources of flakiness in AI testing:

- **API latency variation.** A model call that usually takes 2 seconds occasionally takes 15, hitting a timeout.
- **Rate limiting.** Tests that call real APIs may be rate-limited under parallel execution.
- **Embedding non-determinism.** Some embedding APIs return slightly different vectors for the same text across calls, causing similarity threshold tests to fluctuate.
- **Order-dependent tests.** Tests that share state (a vector database, a cache) may pass or fail depending on execution order.

## Managing Flaky Tests

**Set thresholds with margin.** If the model achieves 92% accuracy, set the test threshold at 85%, not 91%. The margin absorbs run-to-run variation.

**Increase sample size.** Instead of testing one model response, test 20 or 50. The aggregate metric is far more stable than individual results.

**Use statistical assertions.** Assert that the success rate exceeds a threshold across multiple runs, not that every individual run succeeds. This is the natural assertion pattern for non-deterministic systems.

**Separate deterministic and non-deterministic tests.** Unit tests and mocked integration tests should never be flaky. If they are, fix the flakiness. Non-deterministic tests (evaluation with real models) should run on a schedule, not on every PR, to avoid blocking development.

**Track flake rates.** Monitor which tests fail intermittently and at what rate. A test that fails 2% of the time is acceptable with retries. A test that fails 20% of the time needs its threshold adjusted or its assertion strategy changed.

**Quarantine persistent flakes.** If a test cannot be stabilized, move it to a quarantine suite that runs but does not block CI. Investigate and fix quarantined tests regularly rather than letting them accumulate.

## The Goal

A healthy test suite has zero flaky deterministic tests and a small, well-managed set of non-deterministic evaluation tests with appropriate statistical thresholds. When a test fails, developers should trust that it indicates a real problem. Achieving this trust requires actively managing flakiness rather than ignoring it.

## Sources

- Luo, Q., Hariri, F., Eloussi, L., & Marinov, D. (2014). An empirical analysis of flaky tests. *Proceedings of the 22nd ACM SIGSOFT International Symposium on Foundations of Software Engineering (FSE)*, 643–653. (Largest empirical study of flaky test causes; async behavior, concurrency, and test order dependence as top causes.)
- Thorve, S., Shenoy, C., & Sarma, A. (2018). An empirical study of flaky tests in Android apps. *2018 IEEE International Conference on Software Maintenance and Evolution (ICSME)*, 534–538. (Flakiness patterns in mobile apps; generalizes to AI mobile inference contexts.)
- Fowler, M. (2011). Eradicating non-determinism in tests. *martinfowler.com*. (Practical strategies for eliminating non-determinism; isolation, statistical sampling, and retry policies.)
