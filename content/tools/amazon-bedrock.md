---
title: "Amazon Bedrock - Enterprise AI Foundation"
description: "A comprehensive reference for Amazon Bedrock: available models, key features, use cases, and pricing patterns for enterprise teams."
date: 2026-03-24
categories: [Tools]
layer: models
tags: ["ai-ml", "beginner", "amazon-bedrock", "foundation-models", "aws", "llm", "managed-ai", "aws-service"]
related:
  - tools/amazon-sagemaker
  - tools/amazon-opensearch
  - tools/claude-anthropic
  - comparisons/sagemaker-vs-bedrock
  - comparisons/bedrock-vs-azure-openai
  - guides/getting-started-with-bedrock
  - tools/azure-openai
  - tools/google-vertex-ai
  - tools/ollama
  - tools/vllm
alternatives:
  open_source:
    - tools/ollama
    - tools/vllm
  azure: tools/azure-openai
  gcp: tools/google-vertex-ai
solutions:
  - solutions/finance/fraud-detection
  - solutions/finance/credit-scoring
  - solutions/retail/recommendation-engine
  - solutions/healthcare/medical-imaging
last_updated: 2026-06-14
lastmod: 2026-06-14
---

Amazon Bedrock is AWS's managed service for foundation model access. It provides a single API to call multiple large language models from different providers, alongside managed infrastructure for knowledge bases, agents, and output safety controls. For enterprise teams building on AWS, it is the primary integration point for generative AI capabilities.

Official documentation: https://docs.aws.amazon.com/bedrock/latest/userguide/  
Pricing: https://aws.amazon.com/bedrock/pricing/  
Service quotas: https://docs.aws.amazon.com/bedrock/latest/userguide/quotas.html

## Watch: Amazon Bedrock (documentation overview)
{{< video src="screencasts/Bedrock.mp4" title="Amazon Bedrock: AWS documentation overview" caption="A short walkthrough of Amazon Bedrock: access to frontier models through one managed API." >}}

The garden way to picture it: the model is the experienced gardener's judgement, learned over many seasons and applied to a new plant at a glance.

{{< video src="garden/sensors-living-data.mp4" metaphor="true" title="The garden metaphor" caption="Learned judgement over living data. From the AI Film Crew course." >}}

## Available Models

Bedrock provides access to models from several providers. Model availability varies by region.

**Anthropic Claude** - The strongest general-purpose models available on Bedrock. The lineup is now the Claude 4 family and later (for example Opus, Sonnet, and Haiku 4.x, plus Claude Opus 4.7, which became available on Bedrock on April 16, 2026, and the newer Claude Fable 5 generation). Within a generation, Opus class models handle the most complex reasoning and long-running agentic work, Sonnet class models give the best balance of capability and cost for most enterprise tasks, and Haiku class models are the fastest and cheapest option for high-volume, simpler tasks. Particularly strong for: document analysis, long-context tasks (Sonnet and Opus offer context windows up to 1 million tokens), code generation, structured output extraction. Older Claude 3 and 3.5 models remain available but are no longer the recommended default.

**Meta Llama** - Open-weights models (Llama 3.1 8B, 70B, 405B; Llama 3.2 1B, 3B, 11B, 90B; later Llama 3.3 and Llama 4 generations). Useful when cost is the primary constraint and task complexity is moderate, or when an open-weights license matters.

**Amazon Nova** - Amazon's own foundation model family, introduced at re:Invent 2024 and now Amazon's primary first-party model line on Bedrock. The text and multimodal tier spans Nova Micro (text-only, lowest latency), Nova Lite, Nova Pro, and Nova Premier, with Nova Canvas (image generation) and Nova Reel (video generation) for creative content. The Nova 2 generation (Nova 2 Lite and Nova 2 Pro in preview), announced at re:Invent 2025, adds extended reasoning with selectable thinking intensity, built-in tools, and a one-million-token context window.

**Amazon Titan** - Amazon's earlier proprietary models. Titan Text is a competent general-purpose model with strong AWS ecosystem integration, and Titan Embeddings is well-suited for vector search applications, particularly when used with Bedrock Knowledge Bases. For new general-purpose work, Amazon now positions the Nova family ahead of Titan.

**Mistral AI** - Mistral 7B, Mistral 8x7B, Mistral Large. European AI provider with a strong compliance story relevant to GDPR and EU AI Act contexts. Competitive performance on instruction-following and summarization tasks.

**Cohere** - Command and Embed models. Cohere's embedding models are particularly strong for semantic search. Command R and Command R+ are optimized for RAG and tool-use workflows.

## Key Features

**Knowledge Bases** - Managed RAG infrastructure. You provide documents (stored in S3), Bedrock handles chunking, embedding, and vector storage. At query time, Bedrock retrieves relevant chunks and augments the prompt. Reduces the infrastructure overhead of building RAG pipelines from scratch. Supports multiple vector stores including OpenSearch Serverless and Aurora PostgreSQL pgvector.

**Agents** - Managed agent runtime. Define actions (Lambda functions, API calls, knowledge base queries) and Bedrock handles the reasoning loop: the model decides which action to take, executes it, processes the result, and continues until the task is complete. Human-in-the-loop patterns are supported via the agent's approval mechanism.

**Guardrails** - Output safety and compliance controls. Configure topic filters (block specified subjects), content filters (harmful content categories with adjustable thresholds), sensitive data redaction (PII detection and masking), and grounding checks (detect hallucinations relative to a provided source document). Guardrails apply to both inputs and outputs and work with any Bedrock model.

**Model evaluation** - Built-in tooling to compare model outputs across a test set. Useful for selecting models and measuring prompt improvements quantitatively rather than through manual review.

**AgentCore** - Amazon Bedrock AgentCore is a framework-agnostic platform for building, deploying, and operating production agents at scale, generally available since October 13, 2025. It works with any model, framework (for example CrewAI, LangGraph, LlamaIndex), or protocol, and its component services include AgentCore Runtime (isolated, long-running execution), Memory, Gateway (turns APIs and AWS Lambda functions into agent tools, with Model Context Protocol support), Identity (OAuth-based authorization), and Observability (Amazon CloudWatch dashboards, OpenTelemetry compatible). It is now the recommended way to build agents on AWS: the original in-Bedrock Agents feature became "Bedrock Agents Classic" and closed to new customers on 30 July 2026 (see the [2026 AWS lifecycle wave](/news/aws-service-deprecations-2026/)). Bedrock itself, Knowledge Bases, and Guardrails are unaffected.

**Prompt caching and batch inference** - Prompt caching (generally available since April 2025) reuses cached prompt prefixes such as system prompts and retrieved context across calls, reducing cost and latency for repeated requests. Batch inference processes large input sets asynchronously at a discount to on-demand pricing. Priority and Flex service tiers let you trade latency against cost for interactive versus non-interactive workloads.

## Pricing Patterns

Bedrock uses on-demand pricing (per input/output token) for most use cases, with Provisioned Throughput as an option for guaranteed capacity. On-demand pricing ranges from approximately 0.0003 EUR per 1,000 input tokens (Titan Text Lite) to 0.015 EUR per 1,000 input tokens (Claude 3.5 Sonnet) in eu-west-1. Output tokens are priced 3-5x higher than input tokens.

Cross-region inference (where Bedrock routes requests to the most available region) can improve throughput during peak demand without additional configuration.

For workloads over 40-50 API calls per minute sustained, Provisioned Throughput provides cost predictability. For spiky or low-volume workloads, on-demand is almost always the right choice.

## Origins and History

AWS announced Amazon Bedrock in April 2023 during a special announcement event, positioning it as the primary way to access foundation models within the AWS ecosystem. The service reached general availability on September 28, 2023, with an announcement describing five generative AI innovations aimed at making it easier for organizations to "build new generative AI applications, enhance employee productivity, and transform businesses."

At GA launch, Bedrock offered models from AI21 Labs, Anthropic (Claude), Cohere, Stability AI, and Amazon (Titan), with Meta's Llama models following shortly after. The serverless architecture meant customers had no infrastructure to provision -- they made API calls and paid per token.

At re:Invent 2023 (November/December), AWS announced significant expansions: access to Anthropic's Claude 2.1 with a 200,000-token context window, general availability of Agents for Amazon Bedrock (enabling multi-step task execution using company systems and data), and the introduction of Guardrails for Amazon Bedrock (allowing companies to define content filtering policies). At re:Invent 2024 (December), AWS introduced Amazon's own Nova model family (Micro, Lite, Pro, and Premier, plus Nova Canvas and Nova Reel), alongside Bedrock Knowledge Bases for RAG, reranking capabilities, and model evaluation tools. At re:Invent 2025 (December), AWS announced the Amazon Nova 2 generation (Nova 2 Lite and Nova 2 Pro in preview) and made Amazon Bedrock AgentCore, its production agent platform, generally available (October 2025).

## Sources

1. About Amazon. "Amazon Bedrock General Availability Generative AI Innovations." September 28, 2023. [https://www.aboutamazon.com/news/aws/aws-amazon-bedrock-general-availability-generative-ai-innovations](https://www.aboutamazon.com/news/aws/aws-amazon-bedrock-general-availability-generative-ai-innovations)
2. About Amazon. "AWS Announces More Model Choice and Powerful New Capabilities in Amazon Bedrock." November 2023. [https://press.aboutamazon.com/2023/11/aws-announces-more-model-choice-and-powerful-new-capabilities-in-amazon-bedrock-to-securely-build-and-scale-generative-ai-applications](https://press.aboutamazon.com/2023/11/aws-announces-more-model-choice-and-powerful-new-capabilities-in-amazon-bedrock-to-securely-build-and-scale-generative-ai-applications)
3. AWS Blog. "Top announcements of AWS re:Invent 2023." [https://aws.amazon.com/blogs/aws/top-announcements-of-aws-reinvent-2023/](https://aws.amazon.com/blogs/aws/top-announcements-of-aws-reinvent-2023/)
4. AWS Documentation. "Amazon Bedrock." [https://docs.aws.amazon.com/bedrock/](https://docs.aws.amazon.com/bedrock/)
5. AWS. "Amazon Bedrock AgentCore is now generally available." October 13, 2025. [https://aws.amazon.com/about-aws/whats-new/2025/10/amazon-bedrock-agentcore-available](https://aws.amazon.com/about-aws/whats-new/2025/10/amazon-bedrock-agentcore-available)
6. AWS. "Announcing Amazon Nova 2 foundation models now available in Amazon Bedrock." December 2, 2025. [https://aws.amazon.com/about-aws/whats-new/2025/12/nova-2-foundation-models-amazon-bedrock](https://aws.amazon.com/about-aws/whats-new/2025/12/nova-2-foundation-models-amazon-bedrock)
7. AWS. "Claude Opus 4.7 is now available in Amazon Bedrock." April 16, 2026. [https://aws.amazon.com/about-aws/whats-new/2026/04/claude-opus-4.7-amazon-bedrock/](https://aws.amazon.com/about-aws/whats-new/2026/04/claude-opus-4.7-amazon-bedrock/)
