---
title: "Model Drift and Data Drift"
description: "What drift is, the three types (data, concept, prediction), how to detect them using SageMaker Model Monitor, and when to trigger model retraining."
date: 2026-03-25
categories: [Glossary]
tags: ["devops", "intermediate", "drift-detection", "infrastructure", "configuration", "monitoring", "iac"]
related:
  - patterns/observability-ai
  - patterns/model-versioning
  - tools/aws-cloudwatch
  - guides/ci-cd-ai-detailed
last_updated: 2026-05-30
---

Drift is the gradual degradation of a model's performance or relevance over time, caused by changes in the real-world data the model encounters compared to the data it was trained on. Drift is a fundamental challenge in production machine learning: a model that performed well at deployment will, without monitoring and retraining, eventually produce worse results as the world changes.

Drift does not mean the model has changed. The model's weights are fixed after training. What changes is the gap between the world the model learned from and the world it is now being asked to operate in.

## Types of Drift

**Data drift** (also called feature drift or covariate shift) occurs when the distribution of inputs to the model changes. The model receives queries or data points that are statistically different from the training distribution. Examples:
- A customer support AI trained on 2023 product queries starts receiving queries about a new product line launched in 2025
- A document classifier trained on formal business emails starts receiving informal Slack-style messages
- A fraud detection model trained on desktop web transactions starts seeing a higher proportion of mobile transactions

Data drift does not immediately cause prediction errors. The model may still return valid predictions. But if the input distribution has shifted significantly, the model's accuracy on that new distribution is unknown and likely lower than on the original distribution.

**Concept drift** occurs when the relationship between the input and the correct output changes, even if the input distribution stays the same. The concept the model learned becomes outdated. Examples:
- A sentiment classifier trained before a major brand scandal finds that the same phrases now carry negative connotations where they previously were neutral
- A medical coding model trained on ICD-10 codes needs to handle ICD-11 codes after the standard changes
- A price prediction model encounters a market regime change that makes historical price patterns poor predictors

Concept drift is harder to detect than data drift because the inputs look normal but the correct outputs have changed.

**Prediction drift** (also called output drift) occurs when the model's output distribution changes, regardless of whether the inputs have changed. If a classification model that previously predicted "approved" 40% of the time starts predicting "approved" 70% of the time with no change in the input data, prediction drift has occurred. This is often a symptom of data drift or concept drift but can sometimes be detected earlier, before quality metrics degrade.

## Detection Methods

**Statistical tests on input distributions.** Compare the distribution of recent inputs against a baseline distribution captured at deployment time. Common tests include Population Stability Index (PSI), Kolmogorov-Smirnov test, and Jensen-Shannon divergence. A statistically significant shift triggers a drift alert.

**Monitoring output distributions.** Track the distribution of model outputs (prediction confidence, output class frequencies, response length for LLMs). Significant changes in the output distribution flag potential concept drift.

**Quality metric tracking.** Compare model performance (accuracy, F1, ROUGE score for text generation) on a held-out evaluation set over time. If quality degrades below a threshold, retraining is triggered. This requires access to ground truth labels, which is not always available in production.

**LLM-specific drift.** For large language model deployments, direct quality measurement requires either human evaluation or LLM-as-judge (using a second model to score the first model's outputs). Proxy metrics like user feedback rates, downstream error rates, and guardrail block rates can indicate quality changes without requiring explicit labels.

## SageMaker Model Monitor

Amazon SageMaker Model Monitor provides managed drift detection for SageMaker endpoints. It captures a sample of inference inputs and outputs, runs statistical tests against a baseline, and publishes drift metrics to CloudWatch.

**Setup:**
```python
from sagemaker.model_monitor import DataCaptureConfig, ModelMonitor

# Enable data capture on the endpoint
data_capture_config = DataCaptureConfig(
    enable_capture=True,
    sampling_percentage=20,
    destination_s3_uri='s3://monitoring-bucket/captures/'
)

# Create a monitoring schedule
monitor = ModelMonitor(
    role=role,
    instance_count=1,
    instance_type='ml.m5.xlarge',
    volume_size_in_gb=20,
    max_runtime_in_seconds=3600
)

monitor.create_monitoring_schedule(
    monitor_schedule_name='ai-model-monitor',
    endpoint_input='ai-model-endpoint',
    output_s3_uri='s3://monitoring-bucket/reports/',
    statistics=baseline_statistics,
    constraints=baseline_constraints,
    schedule_cron_expression='cron(0 * ? * * *)'  # hourly
)
```

SageMaker Model Monitor generates a report each scheduled period comparing recent data against the baseline, with a drift score per feature. CloudWatch alarms on these scores trigger notifications or automated retraining workflows.

## Retraining Triggers

Retraining should be triggered when:

- Drift score crosses a statistical threshold (e.g. PSI > 0.2 for a feature)
- Monitored quality metric drops below a defined floor (e.g. accuracy below 80%)
- A significant business event occurs that changes the data distribution (product launch, policy change)
- A scheduled periodic retraining interval is reached (e.g. monthly, regardless of measured drift)

For foundation model applications using Bedrock (rather than fine-tuned models), retraining is not applicable - but prompt template updates, knowledge base refreshes, and model version upgrades serve a similar function: keeping the system's knowledge and behaviour current with the changing world.

## Sources and Further Reading

- AWS Documentation: SageMaker Model Monitor. [https://docs.aws.amazon.com/sagemaker/latest/dg/model-monitor.html](https://docs.aws.amazon.com/sagemaker/latest/dg/model-monitor.html)
- AWS Documentation: Monitor data quality. [https://docs.aws.amazon.com/sagemaker/latest/dg/model-monitor-data-quality.html](https://docs.aws.amazon.com/sagemaker/latest/dg/model-monitor-data-quality.html)
- Gama, J. et al. (2014). "A Survey on Concept Drift Adaptation." ACM Computing Surveys. - The foundational survey on concept drift detection and adaptation methods.
- Klaise, J. et al. (2020). "Alibi Detect: Algorithms for Outlier, Adversarial and Drift Detection." Journal of Machine Learning Research. [https://jmlr.org/papers/v23/21-1427.html](https://jmlr.org/papers/v23/21-1427.html)
