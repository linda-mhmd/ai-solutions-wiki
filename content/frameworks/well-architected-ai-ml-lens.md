---
title: "AWS Well-Architected AI/ML Lens - Applying Best Practices to Machine Learning"
description: "The AWS ML Lens extends the Well-Architected Framework to cover ML lifecycle phases, ML pipeline automation, model security, inference reliability, and AI-specific cost and sustainability patterns."
date: 2026-03-26
categories: [Frameworks]
tags: ["architecture", "intermediate", "well-architected", "ai-ml-lens", "aws", "mlops", "best-practices"]
related:
  - frameworks/well-architected-framework
  - glossary/operational-excellence
  - glossary/reliability-pillar
  - glossary/security-pillar
  - glossary/cost-optimization-pillar
  - glossary/performance-efficiency
  - glossary/sustainability-pillar
last_updated: 2026-05-30
---

The AWS Well-Architected Framework covers principles that apply to any cloud workload. Machine learning introduces a distinct set of challenges - training pipelines, model drift, prompt injection, inference cost volatility - that the base framework does not fully address. The AWS Well-Architected ML Lens is a published extension that maps each of the six pillars to the ML lifecycle and provides ML-specific best practices.

Source: [AWS Well-Architected ML Lens](https://docs.aws.amazon.com/wellarchitected/latest/machine-learning-lens/machine-learning-lens.html)

## What the ML Lens Adds

The base Well-Architected Framework asks questions like "Do you have automated alerting?" and "Do you encrypt data at rest?" These are necessary but not sufficient for ML workloads. The ML Lens adds questions specific to the ML lifecycle: How do you detect model drift after deployment? How do you protect training data from unauthorized access? How do you manage experiment versioning so results are reproducible? How do you decide when to retrain a model?

The ML Lens covers six lifecycle phases and applies all six pillars across each phase. The lifecycle phases are:

1. **Business goal identification** - defining the problem and success criteria before any technical work begins
2. **ML problem framing** - translating the business goal into an ML task (classification, regression, generation, retrieval)
3. **Data processing** - collecting, cleaning, labeling, and preparing training data
4. **Model development** - training, evaluating, and selecting models
5. **Deployment** - packaging models and serving them through endpoints or batch jobs
6. **Monitoring** - tracking model performance, data drift, and infrastructure health in production

## Operational Excellence in ML

Operational excellence for ML means treating the ML pipeline as a software system: version-controlled, automated, monitored, and recoverable. Key practices include automating the training pipeline so that retraining does not require manual steps, using experiment tracking tools to record hyperparameters and metrics for every run, and implementing model registries to manage model versions and their deployment status.

ML-specific operational concerns include defining retraining triggers - conditions under which a model should be retrained based on performance degradation, data drift, or concept drift. Runbooks should cover not just infrastructure incidents but also model quality incidents: what to do when a model's accuracy drops below a threshold, or when input data distribution shifts unexpectedly.

## Security in ML

Security for ML workloads extends standard cloud security practices to data and model assets. Training datasets often contain sensitive information: customer records, medical data, internal documents. Encryption at rest and in transit applies to training data stored in S3 and to data flowing through SageMaker pipelines. Access control must extend to the data lake layer, not just the compute layer.

Model access control covers who can invoke model endpoints and who can update deployed models. For foundation models accessed through Amazon Bedrock, security practices include configuring guardrails to prevent the model from handling certain content categories, and logging all inference requests for audit purposes.

Prompt injection is an AI-specific security concern not addressed by traditional cloud security frameworks. It refers to attempts by malicious input to override the intended behavior of a model through the prompt itself. Defenses include input validation, system prompt hardening, and output filtering. AWS Bedrock Guardrails provides managed controls for content filtering, PII detection, and topic restriction.

Source: [AWS Bedrock Security](https://docs.aws.amazon.com/bedrock/latest/userguide/security.html)

## Reliability in ML

Reliability for ML means that the system continues to deliver correct outputs under load, failure, and model degradation. Infrastructure reliability covers model endpoint scaling - SageMaker endpoints can be configured for auto-scaling based on request volume - and health checks that detect when an endpoint has become unresponsive.

ML-specific reliability concerns include fallback models: when a primary model endpoint fails or produces a confidence score below a threshold, the system should degrade gracefully rather than returning an error to the user. This might mean routing to a smaller cached model, returning a cached response, or falling back to a rule-based system. Graceful degradation is especially important for AI features embedded in customer-facing products.

## Performance Efficiency in ML

Performance efficiency for ML starts with model selection. Choosing the smallest model that meets quality requirements has a direct impact on inference latency and throughput. For Bedrock, this means benchmarking multiple foundation models against the target task before committing to one. For self-managed models on SageMaker, it means evaluating model quantization - reducing the numerical precision of model weights to reduce memory footprint and increase inference throughput.

Batching is a key inference optimization pattern. Rather than processing each request independently, batch inference groups multiple requests together and processes them in a single forward pass. This significantly increases GPU utilization and reduces per-request cost, at the expense of latency. The choice between real-time inference and batch inference should be driven by the latency requirements of the use case.

## Cost Optimization in ML

Training is where ML costs are most concentrated and most variable. Spot instances for training jobs can reduce compute costs by 60 to 90 percent compared to on-demand pricing, with the trade-off that jobs must be checkpointed and resumable. SageMaker managed spot training handles checkpoint management automatically.

For inference, cost optimization involves choosing the right deployment pattern. Bedrock pricing is per-token with no infrastructure to manage; SageMaker endpoint pricing is per hour of endpoint uptime regardless of request volume. For low-traffic workloads, Bedrock is typically cheaper. For high-throughput workloads with predictable load, a dedicated SageMaker endpoint may be more cost-effective.

Caching is one of the highest-impact cost optimization strategies for generative AI: identical or semantically similar prompts can be served from cache rather than invoking the model. Prompt caching reduces both cost and latency for workloads with repeated queries.

## Sustainability in ML

Large model training runs have significant energy footprints. The ML Lens recommends selecting the smallest model that meets quality requirements, because smaller models consume less compute per inference and enable more requests per unit of GPU capacity. Fine-tuning a smaller model on domain-specific data often outperforms a much larger general-purpose model on a narrow task, at a fraction of the operational cost and energy consumption.

Training job scheduling for renewable energy regions - AWS regions powered by a higher percentage of renewable energy - is a practice for organizations with sustainability commitments. AWS publishes the carbon footprint of each region, enabling teams to make informed choices about where to run compute-intensive training jobs.
