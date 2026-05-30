---
title: "Inference - Running AI Models in Production"
description: "What inference means in AI context, the key operational parameters that matter (latency, throughput, cost), and the main deployment options for enterprise workloads."
date: 2026-03-24
categories: [Glossary]
tags: ["ai-ml", "beginner", "inference", "model-serving", "prediction", "llm", "latency"]
last_updated: 2026-05-30
---

Inference is the process of running a trained AI model to produce an output (a prediction, a generated text response, a classification) given a new input. Training is what happens before deployment; inference is what happens when users and applications actually use the model.

For enterprise teams, inference is where most of the operational complexity and cost resides. Understanding inference well is essential for building AI systems that are reliable and cost-effective at scale.

## Key Metrics

**Latency** - How long a single request takes from submission to response. Measured as time-to-first-token (how quickly the model starts generating) and time-to-last-token (total response time). For interactive applications, total latency under 3 seconds is typically acceptable; under 1 second is better.

**Throughput** - How many requests the system can process per unit of time. Throughput and latency are often in tension: you can increase throughput by batching requests together, but this increases individual request latency.

**Tokens per second** - For text generation models, the rate at which the model produces output tokens. Faster tokens-per-second means shorter time-to-last-token for a given output length.

**Concurrency** - How many simultaneous requests the system handles. Most managed model endpoints have configurable concurrency limits.

## Inference Deployment Options

**Managed APIs (Bedrock, Anthropic API, OpenAI API)** - You send requests to an API and pay per token. No infrastructure to manage. Auto-scaling is handled by the provider. Suitable for most enterprise use cases.

**Provisioned throughput (Bedrock)** - Reserved model capacity at a fixed hourly rate, providing guaranteed throughput and consistent latency. Becomes cost-effective for sustained loads above roughly 40-50 requests per minute. Eliminates the risk of throttling during traffic spikes.

**Self-hosted on SageMaker** - You host the model on SageMaker inference endpoints. More operational overhead but full control over model selection, configuration, and cost optimization. Required when using custom or fine-tuned models.

**Self-hosted on EC2 or containers** - Maximum control, highest operational overhead. Suitable for specialized inference requirements: extreme latency sensitivity, unusual model architectures, or strict data isolation requirements.

## Cost Drivers

For managed LLM APIs, cost is primarily driven by:
- Input token count (what you send to the model)
- Output token count (what the model generates)
- Model tier (Haiku is much cheaper than Opus per token)

Input tokens are usually cheaper than output tokens. For extraction and classification tasks where output is short, input token cost dominates. For generation tasks, output token cost dominates.

Prompt caching (available on some platforms) reduces cost for applications that send the same system prompt with every request - the cached portion is billed at a lower rate.

## Batching for Cost Efficiency

For non-interactive workloads (processing a backlog of documents, nightly batch jobs), batching requests reduces per-request cost and can increase total throughput. Bedrock Batch Inference processes large datasets from S3 at lower per-token rates than synchronous API calls, in exchange for higher latency (hours rather than seconds).

Use synchronous inference for interactive applications where users wait for responses. Use batch inference for background processing jobs where same-day completion is acceptable.

## Sources

- Crankshaw, D., et al. (2017). Clipper: A low-latency online prediction serving system. *NSDI 2017*. (Early systematic treatment of ML serving; defined the latency-throughput tradeoffs and batching strategies.)
- Kwon, W., et al. (2023). Efficient memory management for large language model serving with PagedAttention. *SOSP 2023*. (vLLM PagedAttention; current standard for high-throughput LLM inference by treating KV-cache as virtual memory.)
- Pope, R., et al. (2023). Efficiently scaling transformer inference. *MLSys 2023*. (Google analysis of LLM inference bottlenecks; introduced partitioning strategies for multi-accelerator serving.)
