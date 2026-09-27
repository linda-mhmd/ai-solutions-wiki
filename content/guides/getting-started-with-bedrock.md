---
title: "Getting Started with Amazon Bedrock for Enterprise AI"
description: "A practical introduction to Amazon Bedrock: what it is, which models are available, how pricing works, and how to get your first use case running."
date: 2026-03-24
categories: [Guides]
tags: ["ai-ml", "beginner", "amazon-bedrock", "getting-started", "foundation-models", "aws", "llm"]
tools: [amazon-bedrock]
related:
  - tools/amazon-bedrock
  - glossary/foundation-models
  - glossary/llm
  - guides/building-rag-systems
  - comparisons/sagemaker-vs-bedrock
last_updated: 2026-09-25
lastmod: 2026-09-25
last_verified: 2026-09-25
---

Amazon Bedrock is AWS's fully managed service for accessing large language models and foundation models through a single API. For enterprise teams, it offers a compelling alternative to managing model infrastructure directly: you pay per token consumed, your data stays within your AWS account, and model access is governed through IAM just like any other AWS resource.

## What Bedrock Is (and Is Not)

Bedrock is a model access layer, not a model. You do not run a server - you call an API. AWS handles infrastructure, scaling, and model updates. This makes it well-suited for enterprise environments where operational overhead matters.

What Bedrock is not: a replacement for fine-tuning workflows (though it supports some), a vector database (you integrate it with one), or an autonomous agent runtime out of the box (it provides building blocks, not a complete framework).

## Available Foundation Models

Bedrock provides access to models from multiple providers through a unified API:

- **Anthropic Claude** (current lineup: Claude Opus 5.5, Fable 5.1, Sonnet 5 and Haiku 4.5; Opus 5 and the Claude 4.x models remain available as previous generations) - strongest general reasoning, code, and document analysis. Claude Opus 5.5 (`anthropic.claude-opus-5-5`, 22 September 2026) is Anthropic's recommended starting point for most workloads. See [Amazon Bedrock](/tools/amazon-bedrock/) for the current tier-by-tier breakdown.
- **OpenAI** (GPT-6 Astra, Sol and Luna, the GPT-5.x models, and open-weight gpt-oss) - GPT-6 Sol and Luna reached general availability on Bedrock on 22 September 2026 with up to 1M tokens of context
- **Meta Llama** (Llama 4 Maverick and Scout, plus Llama 3.3, 3.2 and 3.1) - open-weights models, useful where cost matters or an open licence is required
- **Other open-weight models** - including Moonshot AI Kimi K3 (generally available 18 September 2026, 1M-token context), Google Gemma 4, DeepSeek, Qwen, and Z.AI GLM
- **Amazon Nova and Titan** - Amazon's own models: Nova 2 Lite for general work (Nova 2 Pro is still in preview), Nova Micro, Lite and Pro from the first generation, and Titan and Nova Multimodal Embeddings for retrieval
- **Mistral AI** - strong European compliance story, competitive performance for document tasks
- **Cohere** - specialized embedding and re-ranking models, useful in RAG pipelines

Model availability varies by AWS region. For EU data residency requirements, check which models are available in `eu-west-1` or `eu-central-1` before committing to an architecture.

## Key Use Cases

**Document analysis** - Bedrock with Claude handles unstructured document processing well: extracting key fields from contracts, summarizing meeting transcripts, classifying incoming correspondence. Combine with Amazon Textract for scanned documents.

**Chatbots and virtual assistants** - Amazon Bedrock AgentCore is AWS's recommended platform for building agents with tool use: you bring the framework and model, and AgentCore provides the runtime, memory, gateway and identity services. The original Bedrock Agents feature (now "Bedrock Agents Classic") closed to new customers on 30 July 2026. See [Bedrock AgentCore](/tools/bedrock-agentcore/).

**Content generation** - Draft generation, translation, reformatting. Particularly effective for internal tools where output quality requirements allow for human review.

**Code assistance** - Bedrock models perform well on code generation and review tasks. For developer tooling, this is one of the fastest paths to measurable productivity gains.

## Getting Started: First Steps

1. **Enable Bedrock in your AWS account** - Navigate to the Bedrock console and request access to the models you need. Access for most models is granted within minutes, though some require additional business verification.

2. **Set up IAM permissions** - Create an IAM role with `bedrock:InvokeModel` permission. For production, scope this to specific model ARNs.

3. **Test with the console playground** - Before writing code, use the Bedrock console's chat interface to experiment with prompts for your use case. This is the fastest way to calibrate expectations.

4. **Integrate via SDK** - Use the AWS SDK (boto3 for Python, or the JavaScript/TypeScript SDK). The `InvokeModel` API takes a JSON body specific to each model provider; the `Converse` API provides a unified interface across providers.

5. **Add guardrails** - For production use, configure Bedrock Guardrails to filter harmful content, enforce topic restrictions, and detect sensitive data patterns in inputs and outputs.

## Pricing Model

Bedrock pricing is per-token (input and output tokens priced separately) with no minimum commitment. Prices vary significantly by model - Claude Haiku 4.5 is Anthropic's cheapest tier, roughly 10x cheaper than the flagship Claude Fable 5.1 tier (per Anthropic's first-party rates; Bedrock pricing is partner-set by AWS and can differ), making model selection an important cost lever. For high-volume workloads, Provisioned Throughput provides reserved capacity at a fixed hourly rate, which becomes cost-effective at sustained load above roughly 40-50 API calls per minute.

There is no charge for API calls that return an error, and no charge for the model access request process itself.

Two September 2026 changes are worth knowing before you plan capacity. Since 21 September, the daily token quota on the `bedrock-runtime` endpoint is a single cross-model quota per account and Region, not a per-model one, so one busy workload can consume the daily budget for all the others in the same account. And for models launched on or after 7 September 2026, each Bedrock model card shows an "EOL no sooner than" date and a Legacy notice period (usually six months), which is the date to plan migrations against — not the model provider's own retirement date.

## Sources

1. AWS Documentation, "Models at a glance" (fetched 25 September 2026): [https://docs.aws.amazon.com/bedrock/latest/userguide/model-cards.html](https://docs.aws.amazon.com/bedrock/latest/userguide/model-cards.html)
2. AWS, "Claude Opus 5.5 is now available on AWS" (22 September 2026): [https://aws.amazon.com/about-aws/whats-new/2026/09/claude-opus-5-5-aws/](https://aws.amazon.com/about-aws/whats-new/2026/09/claude-opus-5-5-aws/)
3. AWS, "OpenAI GPT-6 Sol and GPT-6 Luna are now generally available on Amazon Bedrock" (22 September 2026): [https://aws.amazon.com/about-aws/whats-new/2026/09/openai-gpt-6-sol-luna-on-amazon-bedrock/](https://aws.amazon.com/about-aws/whats-new/2026/09/openai-gpt-6-sol-luna-on-amazon-bedrock/)
4. AWS, "Kimi K3 by Moonshot AI is now generally available on Amazon Bedrock" (18 September 2026): [https://aws.amazon.com/about-aws/whats-new/2026/09/moonshot-ai-kimi-k3-on-amazon-bedrock/](https://aws.amazon.com/about-aws/whats-new/2026/09/moonshot-ai-kimi-k3-on-amazon-bedrock/)
5. AWS Documentation, "Model lifecycle": [https://docs.aws.amazon.com/bedrock/latest/userguide/model-lifecycle.html](https://docs.aws.amazon.com/bedrock/latest/userguide/model-lifecycle.html)
6. AWS Documentation, "Document history for the Amazon Bedrock User Guide" (21 September 2026 quota entries): [https://docs.aws.amazon.com/bedrock/latest/userguide/doc-history.html](https://docs.aws.amazon.com/bedrock/latest/userguide/doc-history.html)
7. Anthropic, "Pricing" (Haiku 4.5 at $1/$5 and Fable 5.1 at $10/$50 per million tokens): [https://platform.claude.com/docs/en/about-claude/pricing](https://platform.claude.com/docs/en/about-claude/pricing)
