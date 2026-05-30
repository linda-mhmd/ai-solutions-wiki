---
title: "Code Review Practices for ML Codebases"
description: "Practical guide to code review for ML projects, covering what to look for in training code, data pipelines, serving code, and experiment notebooks."
date: 2026-03-28
categories: [Guides]
tags: [code-review, ML, best-practices, quality, collaboration]
related:
  - frameworks/software-quality-assurance
  - frameworks/shift-left-testing
  - guides/software-architecture-ai
last_updated: 2026-05-30
---

Code review for ML projects requires reviewers to look beyond standard software concerns. In addition to logic errors, style issues, and security vulnerabilities, ML code reviews must catch data leakage, training-serving skew, silent numerical errors, and experiment reproducibility issues. This guide covers what to look for when reviewing different types of ML code.

## Reviewing Data Pipeline Code

Data pipeline code transforms raw data into training-ready datasets. Common issues:

**Data leakage** - The most consequential bug in ML. Leakage occurs when information from the test set or future data points leaks into training. Look for: fitting scalers or encoders on the full dataset before splitting, using future timestamps in feature computation, or including the target variable (or a proxy for it) as a feature. During review, trace the data flow and verify that all transformations respect the train/test boundary.

**Missing null handling** - Reviewers should check how every feature handles null values. A missing null check may not cause an error (pandas fills with NaN, which many models silently handle) but can degrade performance. Verify that null handling is explicit and matches the documented strategy.

**Schema assumptions** - Code that assumes column names, types, or value ranges without validation will break silently when data sources change. Check for schema validation at pipeline boundaries. Prefer explicit schema definitions (Pandera, Great Expectations) over implicit assumptions.

**Reproducibility** - Random seeds should be set for any operation involving randomness (shuffling, sampling, train/test splitting). Check that data pipeline outputs are deterministic given the same inputs and seeds.

## Reviewing Training Code

Training code defines model architecture, training loops, evaluation, and experiment tracking.

**Metric computation** - Verify that evaluation metrics are computed correctly. Common errors: computing accuracy on imbalanced classes without also reporting per-class metrics, computing metrics on the training set instead of the validation set, and using incorrect averaging methods for multi-class metrics (micro vs macro vs weighted).

**Hyperparameter management** - Hardcoded hyperparameters scattered through the code make experiments unreproducible. Check that hyperparameters are centralized in a configuration file or passed as arguments, and that experiment tracking captures the full configuration.

**Resource management** - Training code that does not release GPU memory, does not handle out-of-memory errors, or loads entire datasets into memory causes infrastructure failures. Check for batch processing, gradient accumulation patterns, and proper cleanup in error handlers.

**Checkpoint and model saving** - Verify that the code saves model checkpoints at appropriate intervals and that the final model artifact includes all necessary components (model weights, tokenizer, preprocessing configuration, feature list).

## Reviewing Serving Code

Serving code handles inference in production. The stakes are higher because bugs affect real users.

**Training-serving skew** - The most common serving bug. The feature computation in serving must exactly match the feature computation used during training. During review, compare the serving feature logic against the training feature logic line by line. Any difference is a potential bug.

**Input validation** - Serving code must validate incoming requests: check for missing required fields, values outside expected ranges, and unexpected data types. Reject invalid inputs with clear error messages rather than passing them to the model, which may produce meaningless predictions.

**Error handling** - What happens when the model fails? When a dependency is unavailable? When latency exceeds the SLA? Review the error handling paths and verify that fallback mechanisms are in place (default predictions, cached responses, graceful degradation).

**Performance** - Check for inefficiencies: loading the model on every request instead of once at startup, synchronous calls to slow dependencies, unnecessary data copies, and missing batching for concurrent requests.

## Reviewing Experiment Notebooks

Notebooks are the most reviewed and least reviewable ML artifact. Make them reviewable:

**Execution order** - Notebooks must run top-to-bottom. During review, check for cells that depend on earlier cells having been run in a non-sequential order. Ask the author to restart the kernel and run all cells before submitting for review.

**Narrative structure** - A notebook should tell a story: problem statement, data exploration, hypothesis, experiment, results, conclusion. Review the narrative for logical coherence, not just code correctness.

**Hardcoded paths and credentials** - Notebooks commonly contain hardcoded file paths, database credentials, and API keys. Flag these during review and require parameterization or environment variable usage.

## Code Review Checklist for ML

For efficient reviews, use a checklist tailored to the PR type:

- [ ] Data pipeline: leakage check, null handling, schema validation, reproducibility
- [ ] Training: metric correctness, hyperparameter management, resource handling, checkpointing
- [ ] Serving: training-serving skew, input validation, error handling, performance
- [ ] Notebook: execution order, narrative clarity, no hardcoded secrets
- [ ] All: tests included, documentation updated, type hints present
