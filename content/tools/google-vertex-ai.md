---
title: "Google Vertex AI - Unified ML Platform"
description: "Vertex AI is now the Gemini Enterprise Agent Platform. A reference for what changed, what stayed the same, and how the Gemini models, Model Garden, training tools, and pipelines work today."
date: 2026-03-28
categories: [Tools]
tags: [google-vertex-ai, gemini-enterprise-agent-platform, GCP, Gemini, ML, foundation-models, agents]
related:
  - tools/google-gemini
  - tools/google-automl
  - tools/amazon-bedrock
  - tools/amazon-sagemaker
  - tools/azure-openai
  - tools/bedrock-agentcore
  - comparisons/aws-vs-gcp-ai
last_updated: 2026-09-03
lastmod: 2026-09-03
---

Google Vertex AI is now called the **Gemini Enterprise Agent Platform**. Google announced the rebrand on 22 April 2026 at Google Cloud Next and made it generally available the same day; the console name finished rolling over from "Vertex AI" to the new name by late May 2026. Google's own product page states it plainly: "Gemini Enterprise Agent Platform (formerly Vertex AI)."

This page keeps the "Vertex AI" title and URL because that is still the term people search for and the name most existing documentation, tutorials, and third-party integrations use — not because it is the product's current name. Everywhere below, "Vertex AI" and "Gemini Enterprise Agent Platform" refer to the same underlying Google Cloud service.

Official documentation: https://docs.cloud.google.com/gemini-enterprise-agent-platform | Product page: https://cloud.google.com/products/gemini-enterprise-agent-platform

## The rebrand, in plain terms

The April 2026 change was more than a coat of paint, but it also was not a forced migration. Three things happened at once:

1. **Vertex AI became the Gemini Enterprise Agent Platform.** The core ML platform — model access, training, pipelines, endpoints — kept working under existing project IDs, APIs, and billing. Google Cloud CEO Thomas Kurian framed it as an expansion of Vertex AI's agent-building surface, not a replacement of the underlying service.
2. **Google Agentspace became Gemini Enterprise**, a separate but related product: a search-and-agents application for end users (integrating with Workspace, Salesforce, ServiceNow, and other line-of-business systems through connectors), distinct from the developer platform. Agents you build on the Agent Platform get *published to* Gemini Enterprise for business users to run.
3. **New agent-lifecycle tooling was bundled in**: the Agent Development Kit (ADK, a code-first, open-source multi-agent framework), Agent Studio (a low-code visual builder), a re-engineered Agent Runtime/Agent Engine for sub-second cold starts and long-running (multi-day) agent sessions, Memory Bank for persistent cross-session memory, and governance tools — Agent Identity, Agent Registry, Agent Gateway, and Agent Anomaly Detection — for tracking and constraining what agents can do.

**What existing customers actually need to do:** nothing forced at the product level — existing Vertex AI resources, endpoints, and IAM roles continued running under the new name. The one concrete deadline to know about is narrower and technical: the older `vertexai.generative_models`, `vertexai.language_models`, `vertexai.vision_models`, `vertexai.tuning`, and `vertexai.caching` modules in the Python `google-cloud-aiplatform` SDK were deprecated 24 June 2025 and are scheduled for removal on **24 June 2026**. Code that imports them directly will break after that date; the replacement is the unified `google-genai` SDK, which Google says has full feature parity. Calls made over HTTP directly to `aiplatform.googleapis.com`, or through the OpenAI-compatible endpoint, are unaffected.

## Foundation Models (Gemini)

The Gemini Enterprise Agent Platform gives access to Google's Gemini models through the Generative AI API, and Gemini has moved through many generations since the 1.5 series. As of early September 2026, the current lineup is built around Gemini 3.x:

**Gemini 3.1 Pro** — the current flagship reasoning tier, in preview since February 2026, for complex problem-solving, agentic workflows, and "vibe coding" with a roughly 1-million-token context window. Google announced a Gemini 3.5 Pro at I/O in May 2026, but as of this writing it has repeatedly missed its own release targets and has not shipped; do not assume it is available without checking the current model list.

**Gemini 3.x Flash** — the workhorse tier, and the one Google iterates on fastest: Gemini 3.5 Flash shipped at I/O on 19 May 2026, 3.6 Flash on 21 July, 3.7 Flash on 13 August, and 3.8 Flash on 2 September — four releases in under four months. Gemini 3.7 Flash ships with a 1,048,576-token context window and up to 65,536 output tokens; Gemini 3.8 Flash is pitched specifically at long-horizon software engineering and autonomous agents. This pace is a deliberate reminder to **pin a specific model version** in production rather than an alias, and to budget on standard pricing, not introductory pricing, since Google has run time-limited launch discounts on recent Flash releases (see [Gemini 3.7 Flash](/news/gemini-3-7-flash/) for a worked example).

**Gemini 3.x Flash-Lite** — the cheapest, highest-throughput tier, for routine, high-volume tasks where Flash-tier reasoning is unnecessary overhead.

**Gemini Embedding models** — text and multimodal embedding models (the latest generation maps text, images, video, audio, and PDFs into a shared embedding space) for semantic search and RAG, available at multiple output dimensions to trade off accuracy against storage cost.

Google's own model list and the wiki's [Google Gemini](/tools/google-gemini/) page and [news coverage](/news/gemini-3-7-flash/) are the places to check before you pin a version — this list will already be behind by the time you read it.

## Model Garden

Model Garden is the catalog of first-party, third-party, and open models deployable on the platform — Google now describes it as covering **200+ models**. It spans:

- **Google first-party**: the Gemini family, Imagen and Nano Banana (image generation), Veo (video generation), Lyria (music), Chirp and Gemini Transcribe (speech-to-text), and Gemma (open-weight).
- **Third-party partner models**: Anthropic's Claude family (Opus, Sonnet, Haiku), Mistral AI, and xAI's Grok, served as fully managed endpoints alongside Google's own models — no separate Anthropic, Mistral, or xAI account needed. Grok is reachable through the OpenAI-compatible API surface specifically.
- **Open models for self-deployment**: Meta's Llama family, DeepSeek, Qwen, OpenAI's open-weight gpt-oss models, and others, deployable via prebuilt containers, as pay-per-token Model-as-a-Service endpoints, or via a custom vLLM setup on your own compute. (This is OpenAI's open-weight `gpt-oss` release, not the closed GPT-4/5-class models — Model Garden hosts the former, not the latter.)

You can deploy from the garden to managed endpoints in a few clicks, or self-host an open model on dedicated infrastructure. This mirrors Bedrock's model marketplace: teams evaluate and swap models without re-architecting the surrounding application, though Vertex/Agent Platform's catalog leans further into self-hosted open models than Bedrock's does.

## AutoML: retired as a standalone product

**Legacy AutoML Vision, the standalone no-code image-model product that predates Vertex AI, was deprecated on 23 January 2023 and shut down on 31 July 2024** (per Google's own deprecations table). Google folded that generation of AutoML — and AutoML Natural Language, AutoML Tables, and AutoML Video Intelligence alongside it — into Vertex AI's unified console starting in 2021, and retired the legacy standalone product once the migration window closed. Treat "AutoML" as a capability inside the platform's training tooling now, not a separate product you sign up for.

Since then the no-code path has narrowed further: **AutoML Text (classification, entity extraction, sentiment analysis) stopped accepting new training as of September 2024**, with legacy models usable through mid-2025 before shutdown. Google's guidance is to move that workload to Gemini prompting or fine-tuning instead — for well-labeled text tasks, a Gemini model with a few-shot prompt or a light fine-tune now generally matches or beats what AutoML Text produced, without the separate training pipeline.

**AutoML for images, tabular data, and edge export is still available** under the platform's training documentation (the object detection, image classification, and tabular AutoML tutorials are current), so the no-code path has not disappeared everywhere — it has been narrowed to the domains where it still earns its keep. AutoML Tables remains the strongest fit: structured, labeled tabular data where it competes directly with hand-tuned XGBoost or SageMaker Autopilot output. For text, foundation-model prompting has mostly displaced it. See [Google AutoML](/tools/google-automl/) for the fuller history and current scope.

## Custom Training

For teams that need full control, the platform provides managed training with custom containers: package training code (PyTorch, TensorFlow, JAX, or any framework) into a Docker container, specify hardware (CPU, GPU type and count, or TPU), and the platform handles provisioning, execution, and artifact storage. This layer is largely unchanged by the rebrand — it is still the same serverless and dedicated-cluster training infrastructure, now documented under the Gemini Enterprise Agent Platform docs rather than the Vertex AI ones.

Training supports distributed jobs across multiple GPUs and TPUs, hyperparameter tuning, and experiment tracking with TensorBoard integration. TPU access remains a distinguishing GCP advantage for teams training large models from scratch. On the generative-AI side specifically, the platform separately documents supervised fine-tuning, reinforcement-learning fine-tuning, and preference tuning for adapting Gemini and other Model Garden models to your own data.

## Vertex AI Pipelines

Pipelines still orchestrate ML workflows as directed acyclic graphs (DAGs), built on Kubeflow Pipelines: custom Python components, prebuilt components for common tasks (processing, training, evaluation, deployment), and caching of intermediate artifacts to skip recomputation. This layer's mechanics have not changed with the rebrand; what changed around it is what feeds it — pipelines are as likely now to orchestrate an agent-evaluation or fine-tuning step as a classic training job.

## Comparison with AWS

The Gemini Enterprise Agent Platform still combines capabilities AWS splits across two products, and the rebrand sharpened that split further on the agent side specifically:

| Capability | Google (this platform) | AWS |
|---|---|---|
| Foundation model access | Model Garden (200+ models: Gemini, Claude, Llama, and more) | [Amazon Bedrock](/tools/amazon-bedrock/) |
| Custom model training | Custom Training (containers, TPU/GPU) | [Amazon SageMaker](/tools/amazon-sagemaker/) |
| No-code training | AutoML (tabular, image, edge — text retired) | SageMaker Autopilot / Canvas |
| Managed agent runtime | Agent Engine / Agent Runtime | [Bedrock AgentCore](/tools/bedrock-agentcore/) |
| Agent orchestration framework | Agent Development Kit (ADK) | Bedrock Agents / open frameworks |
| Low-code agent builder | Agent Studio | Bedrock Agents console |

Gemini models compete directly with Anthropic Claude and OpenAI's GPT models available on Bedrock — and, notably, Claude itself is also available inside Model Garden, so "Google vs. Anthropic" is not strictly either/or for a GCP-committed team. For multi-cloud organizations, this platform is the GCP pillar of the ML and agent strategy; for AWS-primary organizations, its relevance is mostly competitive awareness and understanding client environments built on GCP. See [AWS AI services vs Google Cloud AI](/comparisons/aws-vs-gcp-ai/) for the fuller service-by-service map.

## Pricing

Pricing still varies by service and was not restructured by the rebrand. Gemini API calls charge per input/output token, with pricing tiers that shift as new model generations ship (introductory pricing on new releases has recently run at a discount to standard pricing, then risen — see the [Gemini 3.7 Flash](/news/gemini-3-7-flash/) pricing note). AutoML charges per training hour and per prediction. Custom training charges per compute hour based on machine type and accelerators. Agent Engine and prediction endpoints charge per node-hour or per invocation depending on the service. Confirm current rates against the official pricing page before estimating a production bill — this is one of the fastest-moving numbers on the platform.

## Further reading

- [Google Gemini](/tools/google-gemini/): the model family this platform serves, across all its access surfaces.
- [Google AutoML](/tools/google-automl/): the fuller history of AutoML's rise, consolidation, and partial retirement.
- [Amazon Bedrock](/tools/amazon-bedrock/) and [Amazon SageMaker](/tools/amazon-sagemaker/): the AWS-side equivalents this page compares against.
- [Bedrock AgentCore](/tools/bedrock-agentcore/): AWS's closest analogue to Agent Engine.
- [AWS AI services vs Google Cloud AI](/comparisons/aws-vs-gcp-ai/): a full service-by-service decision map.
- [Gemini 3.7 Flash](/news/gemini-3-7-flash/) and [Google I/O 2026](/news/google-io-2026/): this wiki's news coverage of the current Gemini release cadence and the rebrand's own announcement.

## Sources

1. Google Cloud, product page: "Gemini Enterprise Agent Platform (formerly Vertex AI)" — https://cloud.google.com/products/gemini-enterprise-agent-platform
2. Google Cloud Blog, "Introducing Gemini Enterprise Agent Platform" (22 April 2026) — https://cloud.google.com/blog/products/ai-machine-learning/introducing-gemini-enterprise-agent-platform
3. Google Cloud, Vertex AI SDK migration guide (generative AI modules deprecated 24 June 2025, removed 24 June 2026) — https://docs.cloud.google.com/vertex-ai/generative-ai/docs/deprecations/genai-vertexai-sdk
4. Google Cloud, Model Garden overview — https://cloud.google.com/model-garden and https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/model-garden/explore-models
5. Google Cloud, AutoML text migration guide (AutoML Text training ended, migrate to Gemini) — https://docs.cloud.google.com/vertex-ai/docs/start/migrating-to-gemini
6. Google Cloud, training overview (current AutoML and custom training options) — https://docs.cloud.google.com/gemini-enterprise-agent-platform/machine-learning/training/overview
7. TechTarget, "Gemini Enterprise Agent Platform adds 'connective tissue' to Vertex AI" (April 2026) — https://www.techtarget.com/searchitoperations/news/366642175/Gemini-Enterprise-Agent-Platform-adds-connective-tissue-to-Vertex-AI
8. This wiki, [Gemini 3.7 Flash](/news/gemini-3-7-flash/) and [Google I/O 2026](/news/google-io-2026/) — current-generation model details and rebrand context, cross-checked against Google's own release notes.
9. 9to5Google, "Gemini 3.8 Flash rolling out three weeks after last release" (2 September 2026) — https://9to5google.com/2026/09/02/gemini-3-8-flash-launch/
10. Google Cloud, deprecations table (Legacy AutoML Vision: deprecated 23 January 2023, shutdown 31 July 2024) — https://docs.cloud.google.com/vertex-ai/docs/deprecations
11. Google Cloud, xAI Grok partner-model docs (confirms Grok as a managed Model Garden partner model) — https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/partner-models/grok
