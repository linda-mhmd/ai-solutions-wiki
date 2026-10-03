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
last_updated: 2026-09-26
lastmod: 2026-09-26
last_verified: 2026-09-26
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

Bedrock provides access to models from 18 providers. Model availability varies by region, and Bedrock sets its own lifecycle dates that can differ from the provider's (see [Model lifecycle](#model-lifecycle) below). The provider list below follows AWS's "Models at a glance" page as fetched on 25 September 2026.

**Anthropic Claude** - The current Claude lineup on Bedrock is **Claude Opus 5.5** (`anthropic.claude-opus-5-5`, available since 22 September 2026, including in AWS GovCloud (US), with zero data retention support by default according to AWS), **Claude Fable 5.1** (`anthropic.claude-fable-5-1`, 1 September 2026), **Claude Sonnet 5** and **Claude Haiku 4.5**. Sonnet 5 and Haiku 4.5 can only be called on demand through a geo or global inference profile (for example `us.anthropic.claude-sonnet-5` or `global.anthropic.claude-haiku-4-5-20251001-v1:0`); the bare model ID is rejected on the standard `bedrock-runtime` endpoint. **Claude Mythos 5.1** is also listed but is restricted to organizations admitted through Anthropic's vetted-access programs. Opus 5.5 is Anthropic's recommended starting point for most workloads; Fable 5.1 sits above it for the most demanding reasoning and long-horizon agentic work; Sonnet 5 gives the best balance of capability and cost for high-volume enterprise tasks; Haiku 4.5 is the fastest and cheapest. All but Haiku 4.5 offer 1M-token context windows. Previous generations remain listed - Claude Opus 5 (previous generation, superseded by Opus 5.5), Fable 5 and Mythos 5, Opus 4.8, 4.7, 4.6 and 4.5, Sonnet 4.6, 4.5 and 4, Opus 4.1, and Claude 3.5 Haiku and 3 Haiku - but they are not the recommended default for new work. Anthropic has said Claude Sonnet 5.5 and Haiku 5.5 will follow "in the coming weeks"; neither was available as of 25 September 2026. See [Claude by Anthropic](/tools/claude-anthropic/) for tiers and first-party pricing.

**OpenAI** - OpenAI's closed frontier models now run on Bedrock, alongside the open-weight `gpt-oss` models. **GPT-6 Sol** and **GPT-6 Luna** reached general availability on 22 September 2026 with up to 1M tokens of context, joining **GPT-6 Astra** in the GPT-6 family. AWS positions Sol as the daily model for complex tasks and software development and Luna as the efficient model for high-volume summarization, extraction, classification and routing. The GPT-5.x generation (GPT-5.6 Sol, Terra and Luna, GPT-5.5, GPT-5.4, and the Daybreak cyber variants) remains listed, as do gpt-oss-120b, gpt-oss-20b and the GPT OSS Safeguard models. Bedrock recommends the `bedrock-runtime` endpoint for new OpenAI-compatible Responses API and Chat Completions integrations.

**Amazon Nova** - Amazon's own first-party family. The current generation is **Nova 2**: Nova 2 Lite and Nova 2 Sonic are listed on Bedrock, alongside Nova Multimodal Embeddings; Nova 2 Pro and Nova 2 Omni remain in preview. Of the first generation, Nova Micro, Lite and Pro are still active, while Nova Premier and Nova Sonic v1 reached end of life on 14 September 2026 and Nova Canvas and Nova Reel reach end of life on 30 September 2026. See [Amazon Nova](/tools/amazon-nova/) for the full picture.

**Open-weight models** - Bedrock serves a broad set of open-weight models as fully managed endpoints within the same security boundary as proprietary ones:
- **Moonshot AI Kimi K3** - generally available since 18 September 2026, with native vision, a 1M-token context window, and cross-Region inference in all Bedrock Regions. It is the first open-weight model on Bedrock to support explicit prompt caching. Kimi K2.5 and K2 Thinking remain listed.
- **Meta Llama** - Llama 4 Maverick 17B and Llama 4 Scout 17B, plus the Llama 3.x line (3.3 70B, 3.2 1B-90B, 3.1 8B-405B). Useful when an open-weights licence matters; Meta's newer Muse Spark models are not open-weight and are not on Bedrock.
- **Google Gemma** - Gemma 4 31B, 26B-A4B and E2B (Apache 2.0), with Gemma 3 still listed. Separately, Gemma-4-31B-it-assistant and an NVIDIA NVFP4 quantization arrived on SageMaker JumpStart on 14 September 2026 for self-managed deployment.
- **Mistral AI** - Mistral Large 3, Devstral 2 123B, Magistral Small, Pixtral Large, the Ministral 3 series and Voxtral speech models, with older Mistral 7B, Mixtral 8x7B and Mistral Large still listed. Mistral remains the European provider option for teams with GDPR and EU AI Act sensitivities.
- **Also available**: DeepSeek (V3.2, V3.1, R1), Qwen (Qwen3 235B, Qwen3 Coder 480B, Qwen3 Next, Qwen3 VL), Z.AI (GLM 5, GLM 4.7), MiniMax (M2.5), NVIDIA Nemotron (including Nemotron 3 Super 120B), and xAI Grok 4.6 and 4.3. Note that the Bedrock-listed versions often trail each provider's own latest release - for example, xAI's current flagship is Grok 4.7 and DeepSeek's latest API model is V4.1-Flash, neither listed on Bedrock as of 25 September 2026.

**Cohere** - Command R and Command R+ for RAG and tool use, plus Embed v4, Embed English/Multilingual and Rerank 3.5. Cohere's embedding and rerank models remain particularly strong for semantic search. Cohere's newer Command A-series models are not listed on Bedrock's models page.

**Other providers** - AI21 Labs (Jamba 1.5 Large and Mini, in Legacy status since 26 May 2026 with end-of-life on 26 November 2026), Writer (Palmyra X5, X4), TwelveLabs (Marengo Embed 3.0 and Pegasus video models) and Stability AI (Stable Image editing tools). **Amazon Titan** embeddings and the Titan Image Generator G1 v2 remain available; the Titan Text generation models are no longer listed in Bedrock's model catalogue, and for text work Amazon positions Nova 2 Lite instead.

### Model lifecycle

For models launched on Bedrock **on or after 7 September 2026**, AWS applies a new lifecycle policy with three states: **Active**, **Legacy** and **End-of-Life (EOL)**. Every model card now shows an **"EOL no sooner than" date** and the model's **Legacy period** - the notice window before EOL, either **6 months** (most models) or **45 days**. The state is returned in the `modelLifecycle` field of `GetFoundationModel` and `ListFoundationModels`. Once a model enters Legacy, new customers cannot adopt it, existing customers may lose access after 15 days of inactivity, and you cannot create new Provisioned Throughput or fine-tuning jobs on it. After EOL, requests fail; migration is never automatic. AWS is explicit that **Bedrock's dates can differ from the model provider's** - Anthropic's retirement commitments, for example, apply to Anthropic-operated platforms, and for Bedrock usage only the dates on the Bedrock model card apply. Models launched before 7 September 2026 stay under the older lifecycle policy.

## Key Features

**Knowledge Bases** - Managed RAG infrastructure. You provide documents (stored in S3), Bedrock handles chunking, embedding, and vector storage. At query time, Bedrock retrieves relevant chunks and augments the prompt. Reduces the infrastructure overhead of building RAG pipelines from scratch. Supports multiple vector stores including OpenSearch Serverless and Aurora PostgreSQL pgvector.

**Agents (now Agents Classic)** - The original managed agent runtime. Define actions (Lambda functions, API calls, knowledge base queries) and Bedrock handles the reasoning loop: the model decides which action to take, executes it, processes the result, and continues until the task is complete. Human-in-the-loop patterns are supported via the agent's approval mechanism. Since 30 July 2026 this feature is "Amazon Bedrock Agents Classic": it is in maintenance mode and closed to new customers, and AWS recommends migrating existing agents to AgentCore (below).

**Guardrails** - Output safety and compliance controls. Configure topic filters (block specified subjects), content filters (harmful content categories with adjustable thresholds), sensitive data redaction (PII detection and masking), and grounding checks (detect hallucinations relative to a provided source document). Guardrails apply to both inputs and outputs and work with any Bedrock model.

**Model evaluation** - Built-in tooling to compare model outputs across a test set. Useful for selecting models and measuring prompt improvements quantitatively rather than through manual review.

**AgentCore** - Amazon Bedrock AgentCore is a framework-agnostic platform for building, deploying, and operating production agents at scale, generally available since October 13, 2025. It works with any model, framework (for example CrewAI, LangGraph, LlamaIndex), or protocol, and its component services include AgentCore Runtime (isolated, long-running execution), Memory, Gateway (turns APIs and AWS Lambda functions into agent tools, with Model Context Protocol support), Identity (OAuth-based authorization), and Observability (Amazon CloudWatch dashboards, OpenTelemetry compatible). It is now the recommended way to build agents on AWS: the original in-Bedrock Agents feature became "Bedrock Agents Classic" and closed to new customers on 30 July 2026 (see the [2026 AWS lifecycle wave](/news/aws-service-deprecations-2026/)). Bedrock itself, Knowledge Bases, and Guardrails are unaffected.

On **18 September 2026** AWS made the **next-generation AgentCore Runtime** available. It keeps the serverless microVM model (no pre-provisioning, scale to zero, hardware-enforced session isolation) but changes two things that affect cost and latency: **elastic memory** allocates memory on demand and reclaims it during the session, so you pay for actual usage rather than the peak, and **snapshot-based cold starts** restore every new instance from a prepared snapshot. AWS reports a P75 cold start of 1.9-2.0 seconds for 200 MB to 2 GB container images, against 5.4-30 seconds on V1. It is opt-in - set `platformVersion` to `V2` when creating or updating a runtime - and at launch is limited to us-east-1, us-east-2, us-west-2, eu-west-1 and ap-northeast-1. See [Bedrock AgentCore](/tools/bedrock-agentcore/).

**Prompt caching and batch inference** - Prompt caching (generally available since April 2025) reuses cached prompt prefixes such as system prompts and retrieved context across calls, reducing cost and latency for repeated requests. Batch inference processes large input sets asynchronously at a discount to on-demand pricing. Priority and Flex service tiers let you trade latency against cost for interactive versus non-interactive workloads. Kimi K3 is the first open-weight model on Bedrock with explicit prompt caching.

**Quotas** - Since **21 September 2026**, the tokens-per-day limit on the `bedrock-runtime` endpoint is a single **cross-model, per-account, per-Region quota** ("Cross-Model Max Tokens Per Day") across all supported models, replacing the per-model "Model invocation max tokens per day" quota. A high-volume batch job on one model can now exhaust the daily budget for every other model in the same account and Region, so separate noisy workloads into different accounts or request an increase before consolidating. The `bedrock-mantle` endpoint keeps its own separate quota allocations.

## Pricing Patterns

Bedrock uses on-demand pricing (per input/output token) for most use cases, with Provisioned Throughput as an option for guaranteed capacity. On-demand pricing ranges from fractions of a cent per 1,000 input tokens for the smallest models (such as Nova Micro) up to the flagship tier -- at the providers' own list prices, Claude Fable 5.1, Claude Mythos 5.1 and OpenAI GPT-6 Astra (each $10 input / $50 output per million tokens first-party) are the most expensive models in the catalogue, and Claude Opus 5.5 is priced below its predecessor Opus 5. Bedrock's rates are set by AWS and can differ. Output tokens are priced 3-5x higher than input tokens. Exact per-model rates are set independently by AWS and change often; check [Bedrock pricing](https://aws.amazon.com/bedrock/pricing/) for current numbers before budgeting.

Cross-region inference (where Bedrock routes requests to the most available region) can improve throughput during peak demand without additional configuration.

**Example: Claude and Nova in Frankfurt (eu-central-1), per million input / output tokens, checked 26 September 2026** ([aws.amazon.com/bedrock/pricing](https://aws.amazon.com/bedrock/pricing/)):

| Model | Global cross-Region | Geo / in-Region |
|---|---|---|
| Claude Opus 5.5 | $4.00 / $20.00 | $4.40 / $22.00 |
| Claude Sonnet 5 | not listed for eu-central-1 | $2.20 / $11.00 |
| Claude Haiku 4.5 | $1.00 / $5.00 | $1.10 / $5.50 |
| Nova 2 Lite (Standard) | $0.39 / $3.27 | $0.429 / $3.597 |

Geo and in-Region calls cost about 10% more than global routing, but keep data inside the geography, which is usually what an EU data-residency requirement needs. For Opus 5.5 the page also lists cache writes at $5 (5-minute) and $8 (1-hour) per million tokens and cache reads at $0.20; there is no batch price for Opus 5.5.

For workloads over 40-50 API calls per minute sustained, Provisioned Throughput provides cost predictability. For spiky or low-volume workloads, on-demand is almost always the right choice.

## Origins and History

AWS announced Amazon Bedrock in April 2023 during a special announcement event, positioning it as the primary way to access foundation models within the AWS ecosystem. The service reached general availability on September 28, 2023, with an announcement describing five generative AI innovations aimed at making it easier for organizations to "build new generative AI applications, enhance employee productivity, and transform businesses."

At GA launch, Bedrock offered models from AI21 Labs, Anthropic (Claude), Cohere, Stability AI, and Amazon (Titan), with Meta's Llama models following shortly after. The serverless architecture meant customers had no infrastructure to provision -- they made API calls and paid per token.

At re:Invent 2023 (November/December), AWS announced significant expansions: access to Anthropic's Claude 2.1 with a 200,000-token context window, general availability of Agents for Amazon Bedrock (enabling multi-step task execution using company systems and data), and the introduction of Guardrails for Amazon Bedrock (allowing companies to define content filtering policies). At re:Invent 2024 (December), AWS introduced Amazon's own Nova model family (Micro, Lite, Pro, and Premier, plus Nova Canvas and Nova Reel), alongside Bedrock Knowledge Bases for RAG, reranking capabilities, and model evaluation tools. At re:Invent 2025 (December), AWS announced the Amazon Nova 2 generation (Nova 2 Lite and Nova 2 Pro in preview) and made Amazon Bedrock AgentCore, its production agent platform, generally available (October 2025). In 2026 Bedrock broadened well beyond its original providers: OpenAI's closed GPT-5.x and GPT-6 models, Moonshot AI's Kimi, Z.AI's GLM, MiniMax and xAI's Grok joined the catalogue, and in September 2026 AWS introduced a new model lifecycle policy, a cross-model tokens-per-day quota and the next-generation AgentCore Runtime.

## Sources

1. About Amazon. "Amazon Bedrock General Availability Generative AI Innovations." September 28, 2023. [https://www.aboutamazon.com/news/aws/aws-amazon-bedrock-general-availability-generative-ai-innovations](https://www.aboutamazon.com/news/aws/aws-amazon-bedrock-general-availability-generative-ai-innovations)
2. About Amazon. "AWS Announces More Model Choice and Powerful New Capabilities in Amazon Bedrock." November 2023. [https://press.aboutamazon.com/2023/11/aws-announces-more-model-choice-and-powerful-new-capabilities-in-amazon-bedrock-to-securely-build-and-scale-generative-ai-applications](https://press.aboutamazon.com/2023/11/aws-announces-more-model-choice-and-powerful-new-capabilities-in-amazon-bedrock-to-securely-build-and-scale-generative-ai-applications)
3. AWS Blog. "Top announcements of AWS re:Invent 2023." [https://aws.amazon.com/blogs/aws/top-announcements-of-aws-reinvent-2023/](https://aws.amazon.com/blogs/aws/top-announcements-of-aws-reinvent-2023/)
4. AWS Documentation. "Amazon Bedrock." [https://docs.aws.amazon.com/bedrock/](https://docs.aws.amazon.com/bedrock/)
5. AWS. "Amazon Bedrock AgentCore is now generally available." October 13, 2025. [https://aws.amazon.com/about-aws/whats-new/2025/10/amazon-bedrock-agentcore-available](https://aws.amazon.com/about-aws/whats-new/2025/10/amazon-bedrock-agentcore-available)
6. AWS. "Announcing Amazon Nova 2 foundation models now available in Amazon Bedrock." December 2, 2025. [https://aws.amazon.com/about-aws/whats-new/2025/12/nova-2-foundation-models-amazon-bedrock](https://aws.amazon.com/about-aws/whats-new/2025/12/nova-2-foundation-models-amazon-bedrock)
7. AWS. "Claude Opus 4.7 is now available in Amazon Bedrock." April 16, 2026. [https://aws.amazon.com/about-aws/whats-new/2026/04/claude-opus-4.7-amazon-bedrock/](https://aws.amazon.com/about-aws/whats-new/2026/04/claude-opus-4.7-amazon-bedrock/)
8. AWS Documentation. "Models at a glance" (fetched September 25, 2026; current provider and model list). [https://docs.aws.amazon.com/bedrock/latest/userguide/model-cards.html](https://docs.aws.amazon.com/bedrock/latest/userguide/model-cards.html)
9. AWS Documentation. "Model lifecycle" (policy for models launched on or after September 7, 2026). [https://docs.aws.amazon.com/bedrock/latest/userguide/model-lifecycle.html](https://docs.aws.amazon.com/bedrock/latest/userguide/model-lifecycle.html)
10. AWS Documentation. "Document history for the Amazon Bedrock User Guide" (September 21, 2026 entries on the cross-model tokens-per-day quota; September 15, 2026 entry on bedrock-runtime for OpenAI-compatible APIs). [https://docs.aws.amazon.com/bedrock/latest/userguide/doc-history.html](https://docs.aws.amazon.com/bedrock/latest/userguide/doc-history.html)
11. AWS. "Claude Opus 5.5 is now available on AWS." September 22, 2026. [https://aws.amazon.com/about-aws/whats-new/2026/09/claude-opus-5-5-aws/](https://aws.amazon.com/about-aws/whats-new/2026/09/claude-opus-5-5-aws/) and "Claude Opus 5.5 is now available on AWS GovCloud (US)." September 22, 2026. [https://aws.amazon.com/about-aws/whats-new/2026/09/claude-opus-5-5-aws-govcloud/](https://aws.amazon.com/about-aws/whats-new/2026/09/claude-opus-5-5-aws-govcloud/)
12. AWS. "OpenAI GPT-6 Sol and GPT-6 Luna are now generally available on Amazon Bedrock." September 22, 2026. [https://aws.amazon.com/about-aws/whats-new/2026/09/openai-gpt-6-sol-luna-on-amazon-bedrock/](https://aws.amazon.com/about-aws/whats-new/2026/09/openai-gpt-6-sol-luna-on-amazon-bedrock/)
13. AWS. "Kimi K3 by Moonshot AI is now generally available on Amazon Bedrock." September 18, 2026. [https://aws.amazon.com/about-aws/whats-new/2026/09/moonshot-ai-kimi-k3-on-amazon-bedrock/](https://aws.amazon.com/about-aws/whats-new/2026/09/moonshot-ai-kimi-k3-on-amazon-bedrock/)
14. AWS. "The new AgentCore Runtime is now available in Amazon Bedrock AgentCore." September 18, 2026. [https://aws.amazon.com/about-aws/whats-new/2026/09/new-agentcore-runtime-generally-available](https://aws.amazon.com/about-aws/whats-new/2026/09/new-agentcore-runtime-generally-available)
15. AWS. "Gemma-4-31B-it-assistant and Gemma-4-31B-IT-NVFP4 models now available on Amazon SageMaker JumpStart." September 14, 2026. [https://aws.amazon.com/about-aws/whats-new/2026/01/gemma-4-31b-it-assistant-gemma-4-31b-it-nvfp4-jumpstart/](https://aws.amazon.com/about-aws/whats-new/2026/01/gemma-4-31b-it-assistant-gemma-4-31b-it-nvfp4-jumpstart/)
16. AWS Documentation. "Amazon Bedrock Agents Classic maintenance mode" (closed to new customers July 30, 2026; fetched September 25, 2026). [https://docs.aws.amazon.com/bedrock/latest/userguide/agents-classic-maintenance-mode.html](https://docs.aws.amazon.com/bedrock/latest/userguide/agents-classic-maintenance-mode.html)
17. AWS Documentation. "Model lifecycle (Legacy)" (Jamba 1.5 Legacy May 26, 2026, EOL November 26, 2026; fetched September 25, 2026). [https://docs.aws.amazon.com/bedrock/latest/userguide/model-lifecycle-legacy.html](https://docs.aws.amazon.com/bedrock/latest/userguide/model-lifecycle-legacy.html)
