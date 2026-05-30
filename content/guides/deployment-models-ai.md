---
title: "AI Deployment Models - SaaS, PaaS, IaaS, and Serverless"
description: "How the four cloud deployment models apply to AI workloads: when to use managed models, platform endpoints, GPU instances, or serverless patterns, with cost implications."
date: 2026-03-25
categories: [Guides]
tags: ["cloud-computing", "intermediate", "deployment-models", "cloud", "edge", "on-premises", "ai-infrastructure"]
related:
  - guides/shared-responsibility-model
  - guides/infrastructure-as-code-ai
  - tools/amazon-bedrock
  - patterns/blue-green-deployment
  - glossary/shared-responsibility
last_updated: 2026-05-30
---

Cloud deployment models - SaaS, PaaS, IaaS, and Serverless - are typically introduced in the context of business applications. They apply equally to AI systems, but the trade-offs look different when the workload is model inference rather than a web application. This article maps each deployment model to concrete AI use cases, explains when each is appropriate, and covers cost implications.

## SaaS AI: Fully Managed Foundation Models

**What it is.** SaaS AI means consuming a model as a fully managed service where the provider handles everything below the API: model weights, inference infrastructure, scaling, updates, and hardware. You call an API and receive a response.

**AWS implementation.** Amazon Bedrock is the primary SaaS AI offering on AWS. You call `bedrock:InvokeModel` or use the Converse API, and Bedrock handles everything else. The foundation models available - Anthropic Claude, Meta Llama, Amazon Nova, Mistral - are maintained by AWS and the model providers.

**When to use it:**

- You need to ship quickly and do not have ML engineering capacity
- You want access to the latest models without managing model updates
- Your use case fits a general-purpose foundation model without fine-tuning
- You need compliance certifications that Bedrock provides (HIPAA, SOC 2, ISO 27001)
- Traffic is variable and you cannot justify reserved capacity

**Limitations:**

- No control over model internals or training data
- Subject to provider pricing changes
- Rate limits apply at the account level, not just per application
- Not suitable when data residency requirements prohibit sending data to a third-party model provider's infrastructure

**Cost model.** Pay per token (input tokens + output tokens). For Amazon Bedrock, as of 2026, Anthropic Claude Sonnet costs approximately $0.003 per 1,000 input tokens and $0.015 per 1,000 output tokens. There is no base fee and no minimum commitment.

## PaaS AI: Platform-Managed Model Endpoints

**What it is.** PaaS AI means deploying your own model (or a curated model) onto a managed platform that handles the compute infrastructure, scaling, and serving layer. You bring the model; the platform handles the runtime.

**AWS implementation.** Amazon SageMaker is the canonical PaaS AI offering. You bring a model artifact (a fine-tuned Llama, a Hugging Face model, a custom PyTorch checkpoint), define a container, and SageMaker manages the endpoint. SageMaker also offers JumpStart, which provides pre-packaged models deployable in one click.

**When to use it:**

- You have fine-tuned a model and need to serve it at scale
- Your data cannot leave your AWS account and managed inference is not acceptable
- You need dedicated compute (reserved instance capacity for guaranteed performance)
- You are running a model not available on Bedrock
- You need custom inference logic (pre/post processing, multi-model routing) in the serving container

**Limitations:**

- Requires ML engineering expertise to manage containers and endpoint configurations
- Endpoint costs accrue continuously even when idle (unless using serverless inference)
- Model updates require endpoint redeployment with careful version management

**Cost model.** Pay per instance-hour for the endpoint instance. An ml.g5.2xlarge (a GPU instance suitable for 7B parameter models) runs approximately $1.52 per hour. For production, you typically run multiple instances for availability, multiplying that cost. SageMaker Serverless Inference eliminates idle costs but adds cold start latency.

## IaaS AI: EC2 with GPUs

**What it is.** IaaS AI means provisioning raw compute instances - typically GPU instances - and running your own model server stack on top of them. You control everything from the OS to the model serving framework.

**AWS implementation.** EC2 GPU instances: p3 (NVIDIA V100), p4 (A100), p5 (H100), g5 (A10G for inference). You install CUDA, your framework (vLLM, TGI, TorchServe), and your model weights. You manage patching, scaling, and availability.

**When to use it:**

- You need maximum control over the inference stack (custom kernels, quantization strategies)
- Running very large models (70B+ parameters) where SageMaker container constraints are limiting
- Research or experimentation requiring full environment control
- Cost optimization at very high scale where managed services add overhead
- Compliance environments that require fully isolated compute with specific networking configurations

**Limitations:**

- Highest operational burden: OS patching, CUDA updates, framework version management
- Scaling requires Auto Scaling Group configuration and a load balancer
- No managed model registry or A/B testing built in
- Cold starts when scaling from zero are slow (GPU instance provisioning takes minutes)

**Cost model.** A p4d.24xlarge (8 x A100 GPUs) costs approximately $32.77 per hour on-demand. Reserved instances (1-year commitment) reduce this by 30-40%. Spot instances can reduce cost by 60-70% but introduce interruption risk, making them suitable for batch inference, not real-time serving.

## Serverless AI: Lambda and AgentCore

**What it is.** Serverless AI pairs event-driven compute (Lambda) with a managed model API (Bedrock) to eliminate all infrastructure management and pay only for actual execution time. For agentic workflows, Amazon Bedrock AgentCore provides a managed agent runtime.

**AWS implementation:**

- **Lambda + Bedrock**: The most common pattern. Lambda receives a trigger (API Gateway, SQS, EventBridge), calls Bedrock, processes the response, and returns. Lambda scales automatically from zero to thousands of concurrent executions.
- **AgentCore**: Managed runtime for multi-agent workflows. Handles session management, memory, tool execution, and agent-to-agent communication without managing compute.

**When to use it:**

- Traffic is bursty or unpredictable
- You want zero infrastructure management
- Tasks are short-lived (under 15 minutes per Lambda invocation)
- You are building event-driven AI pipelines (document processing on S3 upload, Slack bot responses)
- You are building agentic workflows where AgentCore handles the runtime complexity

**Limitations:**

- Lambda has a 15-minute maximum execution time, which limits long-running agent tasks (mitigated by Step Functions for orchestration)
- Lambda cold starts add latency (typically 100-500ms for Python with Bedrock SDK)
- Not suitable for running your own model weights (you are always calling a managed model API)
- AgentCore is a newer service with a maturing feature set

**Cost model.** Lambda charges per invocation ($0.0000002 per request) and per GB-second of execution. A Lambda function calling Bedrock Claude Sonnet for a 1-second invocation with 1GB memory costs approximately $0.0000016 in Lambda compute, plus the Bedrock token cost. At moderate scale, serverless AI is typically the lowest-cost deployment model.

## Choosing a Deployment Model

| Factor | SaaS (Bedrock) | PaaS (SageMaker) | IaaS (EC2) | Serverless (Lambda) |
|---|---|---|---|---|
| Speed to ship | Fastest | Medium | Slowest | Fast |
| Infrastructure control | None | Medium | Full | None |
| Data isolation | Managed | Customer VPC | Customer VPC | Managed |
| Idle cost | Zero | High | High | Zero |
| Scale to zero | Yes | Serverless option | No | Yes |
| Custom models | Via fine-tune import | Yes | Yes | No |
| ML ops burden | Minimal | Medium | High | Minimal |

Most production AI systems use more than one model. A common pattern: Lambda + Bedrock for real-time user-facing queries (serverless, fast, low cost at low volume), SageMaker endpoints for serving proprietary fine-tuned models that require dedicated capacity, and S3 + Bedrock Batch Inference for high-volume asynchronous processing (document summarisation, classification at scale).

## Sources and Further Reading

- AWS Documentation: Types of Cloud Computing. [https://aws.amazon.com/types-of-cloud-computing/](https://aws.amazon.com/types-of-cloud-computing/)
- AWS Documentation: Amazon Bedrock pricing. [https://aws.amazon.com/bedrock/pricing/](https://aws.amazon.com/bedrock/pricing/)
- AWS Documentation: Amazon SageMaker pricing. [https://aws.amazon.com/sagemaker/pricing/](https://aws.amazon.com/sagemaker/pricing/)
- AWS Documentation: Amazon Bedrock AgentCore. [https://docs.aws.amazon.com/bedrock/latest/userguide/agentcore.html](https://docs.aws.amazon.com/bedrock/latest/userguide/agentcore.html)
- Mohamed, L. (2026). "AI Deployment Models - SaaS, PaaS, IaaS, and Serverless." AI Solutions Wiki. Linda Mohamed, AI & Cloud Consultant.
