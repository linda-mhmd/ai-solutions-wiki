---
title: "Amazon Bedrock - Enterprise AI Foundation"
description: "A comprehensive reference for Amazon Bedrock: available models, key features, use cases, and pricing patterns for enterprise teams."
date: 2026-03-24
categories: [Tools]
tags: ["ai-ml", "beginner", "amazon-bedrock", "foundation-models", "aws", "llm", "managed-ai"]
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
last_updated: 2026-05-30
---

Amazon Bedrock is AWS's managed service for foundation model access. It provides a single API to call multiple large language models from different providers, alongside managed infrastructure for knowledge bases, agents, and output safety controls. For enterprise teams building on AWS, it is the primary integration point for generative AI capabilities.

Official documentation: https://docs.aws.amazon.com/bedrock/latest/userguide/  
Pricing: https://aws.amazon.com/bedrock/pricing/  
Service quotas: https://docs.aws.amazon.com/bedrock/latest/userguide/quotas.html

## Available Models

Bedrock provides access to models from several providers. Model availability varies by region.

**Anthropic Claude** - The strongest general-purpose models available on Bedrock. Claude 3.5 Sonnet offers the best balance of capability and cost for most enterprise tasks. Claude 3 Haiku is the fastest and cheapest option for high-volume, simpler tasks. Claude 3 Opus handles the most complex reasoning requirements. Particularly strong for: document analysis, long-context tasks, code generation, structured output extraction.

**Meta Llama** - Open-weights models (Llama 3.1 8B, 70B, 405B; Llama 3.2 1B, 3B, 11B, 90B). Useful when cost is the primary constraint and task complexity is moderate. The 8B model is competitive with older GPT-3.5 class models at a fraction of the cost.

**Amazon Titan** - Amazon's proprietary models. Titan Text is a competent general-purpose model with strong AWS ecosystem integration. Titan Embeddings is well-suited for vector search applications, particularly when used with Bedrock Knowledge Bases.

**Mistral AI** - Mistral 7B, Mistral 8x7B, Mistral Large. European AI provider with a strong compliance story relevant to GDPR and EU AI Act contexts. Competitive performance on instruction-following and summarization tasks.

**Cohere** - Command and Embed models. Cohere's embedding models are particularly strong for semantic search. Command R and Command R+ are optimized for RAG and tool-use workflows.

## Key Features

**Knowledge Bases** - Managed RAG infrastructure. You provide documents (stored in S3), Bedrock handles chunking, embedding, and vector storage. At query time, Bedrock retrieves relevant chunks and augments the prompt. Reduces the infrastructure overhead of building RAG pipelines from scratch. Supports multiple vector stores including OpenSearch Serverless and Aurora PostgreSQL pgvector.

**Agents** - Managed agent runtime. Define actions (Lambda functions, API calls, knowledge base queries) and Bedrock handles the reasoning loop: the model decides which action to take, executes it, processes the result, and continues until the task is complete. Human-in-the-loop patterns are supported via the agent's approval mechanism.

**Guardrails** - Output safety and compliance controls. Configure topic filters (block specified subjects), content filters (harmful content categories with adjustable thresholds), sensitive data redaction (PII detection and masking), and grounding checks (detect hallucinations relative to a provided source document). Guardrails apply to both inputs and outputs and work with any Bedrock model.

**Model evaluation** - Built-in tooling to compare model outputs across a test set. Useful for selecting models and measuring prompt improvements quantitatively rather than through manual review.

## Pricing Patterns

Bedrock uses on-demand pricing (per input/output token) for most use cases, with Provisioned Throughput as an option for guaranteed capacity. On-demand pricing ranges from approximately 0.0003 EUR per 1,000 input tokens (Titan Text Lite) to 0.015 EUR per 1,000 input tokens (Claude 3.5 Sonnet) in eu-west-1. Output tokens are priced 3-5x higher than input tokens.

Cross-region inference (where Bedrock routes requests to the most available region) can improve throughput during peak demand without additional configuration.

For workloads over 40-50 API calls per minute sustained, Provisioned Throughput provides cost predictability. For spiky or low-volume workloads, on-demand is almost always the right choice.

## Origins and History

AWS announced Amazon Bedrock in April 2023 during a special announcement event, positioning it as the primary way to access foundation models within the AWS ecosystem. The service reached general availability on September 28, 2023, with an announcement describing five generative AI innovations aimed at making it easier for organizations to "build new generative AI applications, enhance employee productivity, and transform businesses."

At GA launch, Bedrock offered models from AI21 Labs, Anthropic (Claude), Cohere, Stability AI, and Amazon (Titan), with Meta's Llama models following shortly after. The serverless architecture meant customers had no infrastructure to provision -- they made API calls and paid per token.

At re:Invent 2023 (November/December), AWS announced significant expansions: access to Anthropic's Claude 2.1 with a 200,000-token context window, general availability of Agents for Amazon Bedrock (enabling multi-step task execution using company systems and data), and the introduction of Guardrails for Amazon Bedrock (allowing companies to define content filtering policies). Subsequent re:Invent cycles in 2024 and 2025 added Amazon's own Nova model family, Bedrock Knowledge Bases for RAG, reranking capabilities, and model evaluation tools.

## Sources

1. About Amazon. "Amazon Bedrock General Availability Generative AI Innovations." September 28, 2023. [https://www.aboutamazon.com/news/aws/aws-amazon-bedrock-general-availability-generative-ai-innovations](https://www.aboutamazon.com/news/aws/aws-amazon-bedrock-general-availability-generative-ai-innovations)
2. About Amazon. "AWS Announces More Model Choice and Powerful New Capabilities in Amazon Bedrock." November 2023. [https://press.aboutamazon.com/2023/11/aws-announces-more-model-choice-and-powerful-new-capabilities-in-amazon-bedrock-to-securely-build-and-scale-generative-ai-applications](https://press.aboutamazon.com/2023/11/aws-announces-more-model-choice-and-powerful-new-capabilities-in-amazon-bedrock-to-securely-build-and-scale-generative-ai-applications)
3. AWS Blog. "Top announcements of AWS re:Invent 2023." [https://aws.amazon.com/blogs/aws/top-announcements-of-aws-reinvent-2023/](https://aws.amazon.com/blogs/aws/top-announcements-of-aws-reinvent-2023/)
4. AWS Documentation. "Amazon Bedrock." [https://docs.aws.amazon.com/bedrock/](https://docs.aws.amazon.com/bedrock/)
