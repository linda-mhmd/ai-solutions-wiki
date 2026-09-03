---
title: "Amazon Bedrock vs Google Vertex AI - Cloud AI Platforms Compared"
description: "Comparing Amazon Bedrock and Google Vertex AI (now Gemini Enterprise Agent Platform) for models, fine-tuning, RAG, and agents."
date: 2026-03-28
last_verified: 2026-09-03
categories: [Comparisons]
tags: [AWS, Google, Bedrock, Vertex-AI, LLM, cloud, comparison]
last_updated: 2026-09-03
lastmod: 2026-09-03
---

Amazon Bedrock and Google Vertex AI are the primary managed AI platforms from their respective cloud providers. Both offer access to foundation models, fine-tuning capabilities, and RAG infrastructure, but they differ in model selection, ecosystem integration, and architectural approach.

**Naming update (read this first):** On April 22, 2026, at Google Cloud Next, Google retired the Vertex AI name and rebranded the platform as the **Gemini Enterprise Agent Platform**, folding in Google Agentspace to form the unified "Gemini Enterprise" product line. Google's own product page now carries the title "Gemini Enterprise Agent Platform (formerly Vertex AI)." The rebrand is a naming and packaging change, not a new service: existing Vertex AI API calls, SDKs, and billing kept working under the new name, and the console dropped the "Vertex AI" label around May 2026. Individual features were renamed too - notably **Vertex AI Studio is now Agent Studio**, **Vertex AI Search is now Agent Search**, and the managed agent runtime (first shown at launch as "Agent Engine") is now called **Agent Runtime**. The platform bundles a code-first Agent Development Kit (ADK), the low-code Agent Studio, a Model Garden of 200+ Google and third-party models (including Anthropic's Claude family), Agent Runtime, Memory Bank for persistent agent memory, and governance/identity features (Agent Identity, Agent Gateway). This page uses "Vertex AI" and "Gemini Enterprise Agent Platform" interchangeably since most third-party documentation, SDKs, and job postings still say "Vertex AI." See the [Google Vertex AI tool guide]({{< relref "/tools/google-vertex-ai.md" >}}) for a fuller writeup of the rebrand and what changed under the hood.

## Overview

| Aspect | Amazon Bedrock | Google Vertex AI / Gemini Enterprise Agent Platform |
|---|---|---|
| Model Access | Multi-vendor catalog (18+ providers) | Google models + Model Garden (200+ models) |
| Flagship Models | Claude, Llama, Mistral, Amazon Nova, Titan | Gemini (3.x family), Imagen, Veo |
| Fine-tuning | Supported for select models | Supported with Agent Studio (formerly Vertex AI Studio) |
| RAG | Bedrock Knowledge Bases | Agent Search (formerly Vertex AI Search) |
| Agents | Bedrock Agents, Bedrock AgentCore | Agent Studio, ADK, Agent Runtime (formerly Vertex AI Agent Builder / Agent Engine) |
| Safety | Bedrock Guardrails | Responsible AI toolkit, Agent Identity, Agent Gateway |
| Pricing Model | Per-token | Per-token (character-based for some legacy models) |

## Model Selection

Bedrock's primary advantage is model diversity. You access Claude (Anthropic), Llama (Meta), Mistral, Cohere, Amazon Nova, and Amazon Titan models through a single API, with the catalog spanning more than a dozen providers. In early 2026 Bedrock also added several open weights models including DeepSeek, GLM, Kimi, MiniMax, and Qwen variants, so you can evaluate multiple model families without changing your integration code. Cross-region inference distributes requests across regions for higher throughput, and global cross-region inference can route to commercial AWS Regions worldwide for additional capacity.

Vertex AI centers on Google's own Gemini models (the current generation is the Gemini 3.x family - Gemini 3.1 Pro for complex reasoning, the 3.7/3.6/3.5 Flash line for latency-sensitive and agentic work), which are competitive across benchmarks. The Model Garden - rebranded as the Gemini Enterprise Agent Platform Model Garden but functionally unchanged - now lists 200+ Google and third-party models, including open models like Llama, Gemma, Qwen, and DeepSeek and partner models from Anthropic (the full Claude family) and Mistral AI. You can deploy custom models to managed endpoints as before. The first-class experience is still optimized for Gemini, though Google now markets the platform as a full agent stack rather than a model catalog alone.

## RAG and Knowledge Management

Bedrock Knowledge Bases provide managed RAG with automatic document chunking, embedding, and vector storage in OpenSearch Serverless or Pinecone. You point it at an S3 data source, and it handles ingestion and retrieval. The retrieval API integrates directly with Bedrock model invocation.

Vertex AI Search (formerly Enterprise Search, and renamed again to **Agent Search** under the April 2026 Gemini Enterprise Agent Platform rebrand) provides similar managed RAG capabilities with support for unstructured documents, structured data, and websites. It includes advanced retrieval features like extractive answers and search tuning, plus a newer Agent Retrieval capability (evolved from Vertex AI Vector Search) for agent-facing lookups. Agent Search integrates with Google's broader search technology stack.

## Agents

Bedrock Agents support multi-step task execution with tool use, knowledge base access, and code interpretation. Agents use a ReAct-style reasoning loop and support action groups that map to Lambda functions or API schemas. For production agents, AWS added Amazon Bedrock AgentCore, which reached general availability in October 2025. AgentCore is a framework-agnostic platform to deploy and operate agents at scale, with a managed runtime (extended execution windows and session isolation), short and long term memory, a gateway that exposes APIs and Lambda functions as tools, and support for the Model Context Protocol (MCP) and the Agent2Agent (A2A) protocol.

What was Vertex AI Agent Builder is now split across two entry points under the Gemini Enterprise Agent Platform: **Agent Studio**, a low-code, visual builder (the renamed Vertex AI Studio), and the **Agent Development Kit (ADK)**, a code-first framework now in the 2.x line that supports graph-based orchestration of sub-agents. Both deploy onto **Agent Runtime** (the service originally previewed as "Agent Engine" at the April 2026 launch), a managed execution environment with long-running operations (up to 7 days), sub-second cold starts, and Memory Bank for persistent agent memory. Google has adopted the Agent2Agent (A2A) protocol - now at v1.0 - as the default interoperability layer, alongside MCP support in ADK. Dialogflow CX remains available for conversational agents, and the agent platform benefits from integration with Google Workspace and Google Search grounding. Governance additions include Agent Identity (cryptographic per-agent identities) and Agent Gateway for controlling tool access.

## Fine-tuning

Both platforms support fine-tuning, but the experience differs. Bedrock offers fine-tuning for select models (Titan, Llama, Cohere) through an S3-based workflow. You upload training data to S3 and create a fine-tuning job through the API.

Vertex AI provides fine-tuning through what is now called **Agent Studio** (formerly Vertex AI Studio) with a more interactive experience. Supervised fine-tuning, reinforcement learning from human feedback (RLHF), and distillation are supported for Gemini models. The notebook integration (Colab Enterprise / Workbench, both renamed under the Gemini Enterprise Agent Platform but otherwise unchanged) makes experimentation more fluid.

## Model Lifecycle Notes (as of September 2026)

Both vendors retire specific model versions on published schedules, and two currently in the retirement window affect the models discussed above:

- **Bedrock:** `amazon.nova-reel-v1:1` (Nova Reel's multi-shot video generation model) entered Legacy status on March 30, 2026, and reaches end-of-life on **September 30, 2026** - the same EOL date as the original `amazon.nova-reel-v1:0` and Nova Canvas v1:0. Requests to the retired model IDs will fail after that date; migrate to the current Nova Reel or Nova Canvas releases before then.
- **Vertex AI / Gemini Enterprise Agent Platform:** `gemini-omni-flash-preview`, the preview conversational-video model released June 30, 2026, is now deprecated with a shutdown date of **September 30, 2026**. Google shipped `gemini-omni-1.1-flash` to general availability on August 27, 2026 as the replacement, adding 40-second scene extension, keyframe control, and 4K upscaling.

Given both organizations' pace of model churn, treat any specific model ID cited on this page as a snapshot - check the vendor's own lifecycle page before locking in a model for a long-lived production workload.

## Enterprise Integration

Bedrock integrates natively with the AWS ecosystem: IAM for access control, CloudWatch for monitoring, CloudTrail for audit logging, VPC endpoints for private connectivity, and S3 for data storage. For organizations already running on AWS, Bedrock requires no new infrastructure patterns.

Vertex AI integrates with Google Cloud's ecosystem: IAM, Cloud Logging, Cloud Monitoring, and VPC Service Controls - these underlying integrations were unaffected by the Gemini Enterprise Agent Platform rebrand. It has unique advantages for organizations using Google Workspace, BigQuery, and Google's data analytics stack. BigQuery ML allows direct model invocation from SQL queries.

## When to Choose Bedrock

Choose Bedrock when model diversity matters - when you need to evaluate or switch between multiple model providers. If your infrastructure is on AWS, Bedrock is the path of least resistance. Bedrock is also strong for RAG workloads that need tight S3 integration and for organizations that want Anthropic's Claude models as their primary LLM.

## When to Choose Vertex AI

Choose Vertex AI when you want deep integration with Google's data and analytics stack, when Gemini models meet your needs, or when you need Google Search grounding for factual accuracy. Organizations using BigQuery, Google Workspace, or Dialogflow will find Vertex AI provides the most integrated experience.

## Practical Recommendation

The model availability question often drives this decision. If your evaluation shows that Claude or Mistral is the best model for your use case, Bedrock is the natural platform. If Gemini performs best, Vertex AI is the clear choice. For organizations not locked into either cloud, run parallel evaluations - the API integration cost is low, and the performance differences between models can be significant for specific tasks.

## Related

- [Amazon Bedrock]({{< relref "/tools/amazon-bedrock.md" >}}) - detailed Bedrock guide
- [Google Vertex AI]({{< relref "/tools/google-vertex-ai.md" >}}) - what changed and stayed the same in the Gemini Enterprise Agent Platform rebrand
- [SageMaker vs Vertex AI](/comparisons/sagemaker-vs-vertex-ai/)
- [Bedrock vs Azure OpenAI](/comparisons/bedrock-vs-azure-openai/)
- [AgentCore vs Bedrock Agents](/comparisons/agentcore-vs-bedrock-agents/)

## Sources and Further Reading

- AWS. *Supported foundation models in Amazon Bedrock.* [https://docs.aws.amazon.com/bedrock/latest/userguide/models-supported.html](https://docs.aws.amazon.com/bedrock/latest/userguide/models-supported.html)
- AWS (2026). *Amazon Bedrock adds support for six fully-managed open weights models (February 10, 2026: DeepSeek V3.2, MiniMax M2.1, GLM 4.7, GLM 4.7 Flash, Kimi K2.5, Qwen3 Coder Next).* [https://aws.amazon.com/about-aws/whats-new/2026/02/amazon-bedrock-adds-support-six-open-weights-models](https://aws.amazon.com/about-aws/whats-new/2026/02/amazon-bedrock-adds-support-six-open-weights-models)
- AWS (2025). *Amazon Bedrock AgentCore is now generally available (October 13, 2025).* [https://aws.amazon.com/about-aws/whats-new/2025/10/amazon-bedrock-agentcore-available](https://aws.amazon.com/about-aws/whats-new/2025/10/amazon-bedrock-agentcore-available)
- AWS. *Model lifecycle - Amazon Bedrock (Nova Reel v1:0/v1:1 and Nova Canvas v1:0 EOL September 30, 2026).* [https://docs.aws.amazon.com/bedrock/latest/userguide/model-lifecycle.html](https://docs.aws.amazon.com/bedrock/latest/userguide/model-lifecycle.html)
- Google Cloud. *Google models on the Gemini Enterprise Agent Platform (formerly Vertex AI).* [https://docs.cloud.google.com/vertex-ai/generative-ai/docs/models](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/models)
- Google Cloud. *Gemini Enterprise Agent Platform (formerly Vertex AI) - product page.* [https://cloud.google.com/products/gemini-enterprise-agent-platform](https://cloud.google.com/products/gemini-enterprise-agent-platform)
- Google Cloud. *Gemini Enterprise Agent Platform name changes (full old-name/new-name mapping table).* [https://docs.cloud.google.com/gemini-enterprise-agent-platform/vertex-ai-name-changes](https://docs.cloud.google.com/gemini-enterprise-agent-platform/vertex-ai-name-changes)
- Google Cloud. *Gemini Enterprise Agent Platform release notes (April 22, 2026 initial release entry: Agent Builder → Agent Platform, Agent Engine → Agent Runtime).* [https://docs.cloud.google.com/gemini-enterprise-agent-platform/release-notes](https://docs.cloud.google.com/gemini-enterprise-agent-platform/release-notes)
- Google Cloud Blog (April 22, 2026). *The new Gemini Enterprise: one platform for agent development.* [https://cloud.google.com/blog/products/ai-machine-learning/the-new-gemini-enterprise-one-platform-for-agent-development](https://cloud.google.com/blog/products/ai-machine-learning/the-new-gemini-enterprise-one-platform-for-agent-development)
- Google AI for Developers. *Gemini API deprecations (gemini-omni-flash-preview shutdown September 30, 2026; replacement gemini-omni-1.1-flash).* [https://ai.google.dev/gemini-api/docs/deprecations](https://ai.google.dev/gemini-api/docs/deprecations)
- Google Cloud. *Model Garden.* [https://cloud.google.com/model-garden](https://cloud.google.com/model-garden)
