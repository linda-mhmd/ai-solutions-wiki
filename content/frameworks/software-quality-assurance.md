---
title: "Software Quality Assurance for AI/ML Projects"
description: "Quality planning, metrics, and gates adapted for AI and ML projects where outputs are probabilistic and data quality is a first-class concern."
date: 2026-03-28
categories: [Frameworks]
tags: [quality-assurance, testing, metrics, gates, SDLC]
related:
  - frameworks/shift-left-testing
  - frameworks/software-requirements-engineering
  - guides/code-review-ai-projects
last_updated: 2026-05-30
---

Quality assurance for AI/ML projects requires a broader definition of quality than traditional software QA. Software QA asks "does it do what we specified?" AI QA asks that question plus "does the model perform well enough, on the right data, without bias, and does it continue to perform well over time?" This framework covers quality planning, metrics selection, and quality gates for AI/ML projects.

## Quality Planning

Quality planning for AI projects must address three distinct quality domains:

**Code quality** covers the training pipelines, serving infrastructure, feature engineering code, and application code. Standard software quality practices apply: code reviews, static analysis, unit tests, integration tests. The difference is that ML code has additional failure modes. A transpose error in a feature matrix may not throw an exception but will silently produce a bad model.

**Model quality** covers the performance of the trained model against defined metrics. This includes accuracy, precision, recall, F1, AUC-ROC, and domain-specific metrics. Model quality is evaluated against held-out test sets and, critically, against data that represents production conditions.

**Data quality** covers the completeness, accuracy, consistency, and timeliness of training and inference data. Poor data quality is the most common cause of AI project failure. A quality plan must specify data quality checks, acceptable thresholds, and remediation procedures.

## Quality Metrics

### Code Metrics

- **Test coverage** for training pipelines and serving code (target: 80%+)
- **Static analysis findings** from linters like pylint, mypy, or ruff
- **Dependency vulnerability counts** from tools like safety or Snyk
- **Pipeline execution reliability** (percentage of training runs that complete without infrastructure errors)

### Model Metrics

- **Primary performance metric** aligned with business objectives (e.g., precision for fraud detection, recall for medical screening)
- **Secondary metrics** that guard against gaming the primary metric (e.g., if optimizing for accuracy, monitor per-class recall to prevent the model from ignoring minority classes)
- **Fairness metrics** across protected groups (demographic parity, equalized odds, calibration across groups)
- **Inference latency** at p50, p95, and p99 percentiles
- **Model size and resource consumption** (memory, CPU/GPU utilization during inference)

### Data Metrics

- **Completeness** (percentage of non-null values for required fields)
- **Freshness** (age of the most recent data point relative to the current time)
- **Distribution drift** (statistical distance between training data and current production data)
- **Label quality** (inter-annotator agreement for labeled datasets)
- **Volume** (record counts compared to expected baselines)

## Quality Gates

Quality gates are checkpoints where the project must demonstrate it meets defined criteria before proceeding. AI projects need gates at stages that traditional software does not have.

**Data readiness gate** - Before model development begins. Criteria: data sources identified and accessible, data quality metrics meet thresholds, data privacy review completed, data schema documented, and minimum data volume requirements met.

**Model validation gate** - Before a model enters the deployment pipeline. Criteria: model meets primary and secondary performance thresholds on the test set, fairness metrics are within acceptable ranges, model performance on adversarial/edge-case test suites is acceptable, and inference latency meets SLA.

**Deployment readiness gate** - Before serving production traffic. Criteria: A/B test or shadow deployment shows no regression against the current production model, monitoring dashboards and alerts are configured, rollback procedure is documented and tested, and model card is complete.

**Post-deployment gate** - After serving production traffic for a defined period (e.g., 7 days). Criteria: production metrics are consistent with pre-deployment validation, no unexpected bias patterns have emerged, and resource consumption is within budget.

## Continuous Quality Monitoring

Unlike traditional software, AI system quality degrades over time even without code changes. Data drift, concept drift, and changes in user behavior all erode model performance. Continuous monitoring must track:

- Model performance metrics on production data (using ground truth labels when available, proxy metrics when not)
- Input data distribution compared to training data distribution
- Prediction distribution shifts (even without labels, a change in the distribution of predictions signals a potential problem)
- Feedback loop health (are corrections being captured and fed back into retraining)

Quality assurance for AI is not a phase. It is a continuous practice that spans the entire model lifecycle from data collection through retirement.
