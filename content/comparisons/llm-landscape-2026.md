---
title: "LLM Landscape 2026: Every Major Model Compared"
description: "A comprehensive reference for every major large language model available in 2026. Covers OpenAI GPT, Anthropic Claude, Google Gemini, Meta Llama, Mistral, DeepSeek, Qwen, xAI Grok, Cohere, Amazon Nova, Microsoft Phi, IBM Granite, OLMo, Falcon, StarCoder2, DBRX, plus inference providers Groq, Together AI, Fireworks AI, Hugging Face, Ollama, vLLM, and hyperscaler platforms Azure AI, Vertex AI, and OCI Generative AI."
date: 2026-06-01
categories: [Comparisons]
tags: ["llm", "gpt", "claude", "gemini", "llama", "mistral", "deepseek", "qwen", "grok", "granite", "ibm", "olmo", "falcon", "starcoder", "dbrx", "groq", "together-ai", "fireworks-ai", "ollama", "vllm", "hugging-face", "azure-ai", "vertex-ai", "oci", "open-source", "inference-providers", "comparison", "foundation-models", "model-selection"]
last_updated: 2026-06-22
related:
  - glossary/llm
  - glossary/foundation-models
  - comparisons/claude-vs-chatgpt
  - guides/llm-evaluation-methods
  - guides/llm-cost-optimization
  - tools/claude-anthropic
  - tools/amazon-bedrock
---

<figure class="bz-figure">
  <img src="/img/enterprise-dark/twin-gears-red-notext.png" alt="Two heavy gear clusters with red-accented teeth interlocking in the dark: parallel systems designed for different loads, each turning independently but driving the same output." loading="lazy">
  <figcaption>Every LLM is a different gear: different tooth count, different torque, different speed. Choosing the wrong one does not mean the system breaks - it means you are working against the grain.</figcaption>
</figure>

The LLM market consolidated rapidly between 2023 and 2026. A handful of providers now offer models that are genuinely competitive for most enterprise tasks, while the open-weight ecosystem has expanded to the point where self-hosted options match hosted APIs for many workloads. This article covers every significant model currently in production use, organized by provider.

Prices listed are approximate as of June 2026 and change frequently. Verify current pricing at each provider before architecture decisions.

---

## How to Read This Reference

Each model entry covers:

- **What it is**: model family, architecture class, release date
- **Context window**: maximum tokens per call (input + output combined unless noted)
- **Strengths**: what this model does measurably better than alternatives
- **Weaknesses**: documented failure modes and known limitations
- **When to use it**: concrete decision guidance
- **API access**: where to call this model

---

## OpenAI

OpenAI maintains the largest commercial LLM portfolio, split between general-purpose GPT models and reasoning-optimized o-series models.

### GPT-4o

**Released:** May 2024. **Context:** 128,000 tokens. **Output limit:** 16,384 tokens.

GPT-4o ("omni") is OpenAI's flagship general-purpose model. It processes text, images, audio, and video natively in a single model rather than through separate pipelines. The -4o suffix signals the multimodal-first architecture.

**Strengths:** Strong general reasoning, excellent instruction following, consistent JSON output, native vision, broad tool use. The most widely tested model in enterprise deployments.

**Weaknesses:** Hallucination rate is meaningful on factual tasks without RAG. Vision understanding lags specialist models. Context window is large but performance degrades at very long contexts. Cost is high relative to smaller alternatives for simple tasks.

**When to use it:** Default choice for complex reasoning, multi-modal tasks, and cases where you need the broadest tested capability surface. Production RAG with complex queries. Customer-facing applications where quality consistency matters more than cost.

**API access:** OpenAI API (`gpt-4o`), Azure OpenAI (`gpt-4o`), Amazon Bedrock.

### GPT-4o mini

**Released:** July 2024. **Context:** 128,000 tokens. **Output limit:** 16,384 tokens.

Smaller, faster, cheaper version of GPT-4o. Matches or exceeds older GPT-4 on many benchmarks at significantly lower cost. Designed for high-volume, latency-sensitive workloads.

**Strengths:** Excellent price-to-performance for classification, extraction, and structured output tasks. Fast inference. Good instruction following.

**Weaknesses:** Noticeably weaker on multi-step reasoning and complex analysis than GPT-4o. Reduced quality on nuanced writing tasks.

**When to use it:** High-volume classification, entity extraction, simple summarization, chatbot responses where cost-per-call matters. Not for complex reasoning chains.

**API access:** OpenAI API (`gpt-4o-mini`), Azure OpenAI.

### o1, o3, o4-mini (Reasoning Series)

**o1 released:** September 2024. **o3 released:** December 2024. **o4-mini:** 2025.

The o-series models use chain-of-thought reasoning internally before producing output. They spend compute at inference time thinking through problems, not just generating the most likely next token. This produces measurably better results on tasks requiring multi-step logic, mathematics, and code analysis.

**o1:** First reasoning model. Strong on graduate-level math and science problems. Slower and more expensive than GPT-4o.

**o3:** Significantly improved reasoning over o1. Top benchmark performance on competitive coding (Codeforces) and mathematics (AIME). High cost.

**o4-mini:** Smaller reasoning model. Surprisingly capable for its size. Best cost-to-reasoning ratio in the OpenAI portfolio.

**Strengths:** Multi-step mathematical reasoning, formal verification, code analysis, science problems with clear correct answers.

**Weaknesses:** Significantly slower than non-reasoning models. Not suited for conversational use or tasks where latency matters. Cost can be 10-50x a standard model call. No native tool use (varies by version).

**When to use it:** Mathematical calculations that need to be correct, complex code debugging, scientific reasoning where accuracy matters more than speed. Not for summarization, extraction, or general chat.

**API access:** OpenAI API (`o1`, `o3`, `o4-mini`), Azure OpenAI.

---

## Anthropic: Claude

Anthropic's models are designed around safety, instruction following, and long-document analysis. The Claude 4 family (released 2025) is the current generation.

### Claude 4 Sonnet (claude-sonnet-4-6)

**Context:** 200,000 tokens. **Output limit:** 8,096 tokens (standard), 64,000 (extended thinking).

Claude Sonnet 4.6 is Anthropic's current production workhorse. Strong across coding, analysis, and writing. Supports extended thinking (visible chain-of-thought reasoning mode) for complex tasks.

**Strengths:** Exceptional at long-document analysis and synthesis. Best-in-class instruction following on complex, multi-part prompts. Reliable structured output. Strong code generation and debugging. Extended thinking mode for hard reasoning tasks.

**Weaknesses:** Output token limit per call is lower than some competitors on standard mode. Pricing is higher than smaller alternatives. Vision is solid but not the primary strength.

**When to use it:** Long document processing, legal/financial analysis, complex code tasks, writing that requires nuance. Default choice when instruction-following accuracy matters most.

**API access:** Anthropic API (`claude-sonnet-4-6`), Amazon Bedrock, Google Cloud Vertex AI.

### Claude 4 Opus (claude-opus-4-8)

**Context:** 200,000 tokens. **Output limit:** 8,096 tokens.

Anthropic's most capable model. Higher accuracy on complex tasks, better long-context comprehension, stronger creative and analytical writing.

**Strengths:** Best overall quality in the Claude family. Handles the most ambiguous, complex prompts reliably. Strong research synthesis over many documents.

**Weaknesses:** Highest cost in the Claude lineup. Slower inference. Not necessary for most workloads that Sonnet handles well.

**When to use it:** Tasks where quality is the constraint and cost is not: deep research synthesis, high-value customer interactions, complex reasoning chains.

**API access:** Anthropic API (`claude-opus-4-8`), Amazon Bedrock.

### Claude 4 Haiku (claude-haiku-4-5)

**Context:** 200,000 tokens.

Anthropic's fastest and most cost-efficient model. Trades some reasoning depth for speed and lower cost.

**Strengths:** Fastest response latency in the Claude family. Lowest cost per token. Good for simple tasks and real-time applications.

**When to use it:** Chatbot responses, simple classification, autocomplete-style interactions, high-volume preprocessing.

**API access:** Anthropic API (`claude-haiku-4-5-20251001`), Amazon Bedrock.

### Claude Fable 5

**Context:** 200,000 tokens.

The most capable model in the Anthropic portfolio as of 2026. Designed for the most demanding enterprise tasks.

**When to use it:** Highest-complexity tasks where both quality and context depth are critical.

**API access:** Anthropic API (`claude-fable-5`).

---

## Google: Gemini and Gemma

Google maintains two parallel LLM families: the commercial Gemini series (via API) and the open-weight Gemma series.

### Gemini 2.0 Pro

**Context:** 2,000,000 tokens (experimental).

Google's flagship commercial model. The 2M context window is the largest of any major hosted model as of June 2026. Genuinely useful for full-codebase analysis, entire book ingestion, and long legal document comparison.

**Strengths:** Largest context window in class. Strong multimodal (text, image, video, audio, code). Google Workspace integration. Native grounding to Search.

**Weaknesses:** Very long context performance degrades on retrieval-over-large-context benchmarks (needle-in-haystack). API pricing at large context scales can be significant. Consistency can lag Anthropic and OpenAI on nuanced instruction following.

**When to use it:** Full-codebase analysis, long document comparison (entire contract sets), multimodal workflows, applications that benefit from Search grounding.

**API access:** Google AI Studio, Vertex AI (`gemini-2.0-pro-exp`), Amazon Bedrock.

### Gemini 2.0 Flash

**Context:** 1,000,000 tokens.

Optimized version of Gemini 2.0 for lower latency and cost. The most widely deployed Gemini model for production applications.

**Strengths:** Fast inference, large context, multimodal, cost-efficient. Good for high-volume workloads. Strong coding capability.

**When to use it:** Production applications requiring speed + large context. Replacing GPT-4o mini where large context is needed at competitive pricing.

**API access:** Google AI Studio, Vertex AI, Amazon Bedrock.

### Gemini 1.5 Flash / 1.5 Pro

Earlier generation. Still widely deployed. Flash for speed, Pro for capability. Both support 1M context. Gemini 2.0 Flash is generally preferred for new deployments.

### Gemma 3 (Open Weight)

**Sizes:** 1B, 4B, 12B, 27B parameters. **Context:** Up to 128K tokens.

Google's open-weight model family. Designed for self-hosted deployment. Competitive with much larger models on many benchmarks due to improved training efficiency.

**Strengths:** Open weights (Apache 2.0 license). Runs on commodity hardware at smaller sizes. Strong instruction following for an open model. No API cost.

**When to use it:** Self-hosted deployments, cost-sensitive applications, privacy-sensitive workloads where data cannot leave your infrastructure. Edge or on-device inference at 1B-4B scale.

**API access:** Hugging Face, Ollama, self-hosted via vLLM, Google Cloud Vertex AI.

---

## Meta: Llama

Meta's Llama family is the dominant open-weight LLM family, with broad community adoption and extensive fine-tuning ecosystem.

### Llama 3.3 70B

**Released:** December 2024. **Context:** 128,000 tokens.

The best open-weight model per parameter count as of its release. Outperforms Llama 3.1 405B on many benchmarks at 70B parameters, due to improved training.

**Strengths:** Best open-weight quality-to-size ratio. 128K context. Strong coding and reasoning. Widely available via inference providers. No usage restrictions for most commercial use.

**When to use it:** Self-hosted deployments where you need flagship-class quality. Fine-tuning base model for domain-specific tasks. Applications requiring full data control.

**API access:** Together AI, Groq, Fireworks AI, AWS Bedrock, Azure AI, Hugging Face Inference, Ollama (self-hosted).

### Llama 3.2 (Multimodal)

**Sizes:** 1B, 3B (text), 11B, 90B (vision).

The 3.2 family introduced vision capabilities to the Llama line. The 1B and 3B models are optimized for on-device and edge deployment.

**When to use it:** 1B/3B for mobile/edge applications. 11B/90B for self-hosted multimodal workflows.

### Llama 3.1 405B

**Context:** 128,000 tokens.

The largest Llama model. Competitive with GPT-4 on many tasks. Requires substantial hardware for self-hosting (8x H100 or equivalent). Available via hosted inference.

**When to use it:** Maximum capability from open weights. Research and evaluation. Hosted via inference providers when hardware is not available.

---

## Mistral AI

Mistral produces both open-weight models and commercial APIs. Known for efficient architectures and strong European data residency story.

### Mistral Large 2

**Context:** 128,000 tokens. **Released:** July 2024.

Mistral's flagship commercial model. Strong coding, reasoning, and multilingual performance. French-language capability is notably better than American competitors.

**Strengths:** Multilingual (especially French, German, Spanish, Italian). Strong coding. Available with EU data residency (important for GDPR compliance). Competitive pricing vs GPT-4o.

**When to use it:** European enterprise deployments with data residency requirements. Multilingual applications. Cost-competitive alternative to GPT-4o.

**API access:** Mistral API (`mistral-large-latest`), Azure AI, AWS Bedrock.

### Mistral Small 3

**Context:** 128,000 tokens.

High-quality small model. Competitive with much larger models on many tasks.

**When to use it:** High-volume workloads where cost matters. Classification, extraction, simple reasoning.

**API access:** Mistral API, AWS Bedrock.

### Mixtral 8x22B (Open Weight)

Mixture-of-Experts architecture. 141B total parameters but only activates 39B per forward pass. High quality at lower inference cost than dense models of equivalent capability.

**Strengths:** Open weights (Apache 2.0). Strong coding and reasoning. Efficient inference due to MoE architecture.

**When to use it:** Self-hosted deployments needing high capability with manageable inference cost.

### Codestral

Mistral's code-specialized model. Trained on 80+ programming languages. Supports code completion, fill-in-the-middle, and instruction-following for code tasks.

**When to use it:** Coding assistants, code review automation, IDE integrations.

### Pixtral Large

Mistral's multimodal model. Combines Mistral Large 2 text capability with a purpose-built vision encoder.

**When to use it:** Document understanding, image analysis, multimodal RAG.

---

## DeepSeek

DeepSeek is a Chinese AI lab that released several models with benchmark performance matching or exceeding much larger Western models.

### DeepSeek V3

**Released:** December 2024. **Context:** 128,000 tokens. **Parameters:** 671B MoE (37B active).

Trained at significantly lower cost than comparable Western models due to architectural and infrastructure innovations. Benchmark performance matches GPT-4o on many tasks.

**Strengths:** Exceptional price-to-performance on the API. Strong coding, mathematics, and reasoning. Open weights available.

**Weaknesses:** Data privacy concerns for enterprise use (Chinese ownership). Safety filtering behavior may differ from Western models. Knowledge cutoff may lag.

**When to use it:** Price-sensitive applications where data sovereignty is not a concern. Benchmarking and evaluation. Open-weight deployment where GPU cost is a constraint.

**API access:** DeepSeek API, Together AI, Fireworks AI, AWS Bedrock (via open weights).

### DeepSeek R1

**Released:** January 2025.

DeepSeek's reasoning model. Competitive with OpenAI o1 on mathematics and coding benchmarks. Released open-weight with MIT license - one of the most permissive licenses for a reasoning model.

**Strengths:** Open weights with MIT license. Strong mathematical and coding reasoning. Cheaper than comparable OpenAI o-series.

**When to use it:** Self-hosted reasoning tasks. Mathematical problem solving. Code analysis where reasoning depth matters.

**API access:** DeepSeek API, Groq, Together AI, AWS Bedrock, self-hosted.

---

## Alibaba: Qwen

Alibaba's Qwen (Tongyi Qianwen) family covers general-purpose, code, math, and vision tasks. Strong multilingual with excellent Chinese-language capability.

### Qwen 2.5 72B

**Context:** 128,000 tokens.

Alibaba's best general-purpose open-weight model. Competitive on coding and mathematics benchmarks. Available under Apache 2.0.

**Strengths:** Strong coding and math. Excellent Chinese-language performance. Open weights. Efficient inference.

**When to use it:** Chinese-language applications. Self-hosted deployments. Cost-efficient coding assistance.

**API access:** Alibaba Cloud, Hugging Face, Together AI, AWS Bedrock, self-hosted.

### QwQ-32B (Reasoning)

Qwen's reasoning model. Chain-of-thought style reasoning trained similarly to DeepSeek R1. Competitive on AIME and coding benchmarks.

**When to use it:** Reasoning tasks, especially mathematical and logical problems. Self-hosted alternative to o1.

### Qwen 2.5 Coder

Code-specialized variant of Qwen 2.5. Available in multiple sizes (1.5B to 72B).

**When to use it:** Code generation, code completion, programming assistance. Smaller variants suitable for IDE integration.

### Qwen VL (Vision-Language)

Multimodal variant supporting text and image input.

**When to use it:** Document understanding, image analysis tasks where Chinese-language support is needed.

---

## xAI: Grok

Grok is developed by xAI (Elon Musk's company). Integrated into X (formerly Twitter) and available via API.

### Grok 3

**Context:** 131,072 tokens.

xAI's current flagship. Competitive on reasoning and coding benchmarks. Trained on X platform data, giving unique exposure to real-time social media content.

**Strengths:** Access to X real-time data when integrated with X platform. Strong STEM reasoning. Competitive coding. Less restricted content filtering than some competitors.

**Weaknesses:** Smaller model ecosystem and tooling than OpenAI or Anthropic. Data provenance concerns from X training data. Less enterprise testing than GPT or Claude.

**When to use it:** Applications integrated with X data or real-time social content. Coding tasks. Less filtered content generation for appropriate use cases.

**API access:** xAI API (`grok-3`), PromptLayer.

### Grok 3 mini

Smaller, faster Grok variant for cost-sensitive applications.

---

## Cohere: Command

Cohere focuses on enterprise RAG and search use cases. Models are optimized for retrieval-augmented generation rather than general-purpose chat.

### Command R+

**Context:** 128,000 tokens.

Cohere's flagship retrieval-focused model. Supports RAG natively with citations, and has strong multilingual performance.

**Strengths:** Native RAG with grounded citations. Strong multilingual (100+ languages). Enterprise-focused with data privacy controls. Optimized for document retrieval tasks. Long context with reliable retrieval over the full window.

**Weaknesses:** General reasoning and creative tasks lag GPT-4o. Smaller ecosystem.

**When to use it:** Enterprise RAG where citation accuracy and multilingual support matter. Legal, financial, and compliance document analysis.

**API access:** Cohere API, AWS Bedrock, Azure AI.

### Command A

**Context:** 256,000 tokens.

Cohere's newest model with extended context and improved RAG performance.

---

## Amazon: Nova

Amazon's own model family, available exclusively on Amazon Bedrock. Designed for tight AWS ecosystem integration.

### Nova Pro

**Released:** December 2024. **Context:** 300,000 tokens. **Modalities:** Text, image, video.

Amazon's highest-capability Nova model. Competitive with GPT-4o on general tasks. Native multimodal including video understanding.

**Strengths:** No data egress from AWS (data stays in your AWS account). Native integration with Bedrock, S3, Lambda. Competitive pricing for AWS-native workloads. Video understanding is strong.

**When to use it:** AWS-native architectures where data residency in AWS matters. Multi-modal pipelines with video. Cost optimization when already operating on AWS.

**API access:** Amazon Bedrock only.

### Nova Lite

**Context:** 300,000 tokens. **Modalities:** Text, image, video.

Faster, cheaper version of Nova Pro. Best price-to-performance in the Nova family.

### Nova Micro

**Context:** 128,000 tokens. **Modalities:** Text only.

Lowest cost Nova model. Text-only, optimized for high-volume simple tasks.

---

## Microsoft: Phi

Microsoft's Phi family demonstrates that model quality is not strictly proportional to size. Phi models punch well above their parameter count.

### Phi-4

**Parameters:** 14B. **Context:** 16,000 tokens.

Microsoft's current flagship small model. Outperforms many much larger models on reasoning and coding benchmarks due to high-quality synthetic training data.

**Strengths:** Runs on commodity hardware. Strong reasoning for size. Available on Hugging Face and Azure AI. MIT license.

**Weaknesses:** Context window is small compared to larger models. General knowledge can lag on niche topics.

**When to use it:** On-device inference, edge applications, cost-sensitive enterprise deployments. Runs on laptop-class hardware.

**API access:** Azure AI, Hugging Face, Ollama (self-hosted).

### Phi-3 Mini / Small / Medium

Earlier Phi generation. Still widely deployed. Good baseline for small-model comparison.

---

## IBM: Granite

IBM's Granite model family is one of the few LLM families that qualifies as genuinely open source under the OSI definition. IBM discloses not only weights but the sources and composition of training data. No web-scraped general internet content: Granite is trained on curated, enterprise-appropriate sources with documented provenance. This makes it the default choice when your industry (finance, healthcare, legal) requires that you be able to audit what the model learned from.

### Granite 3.2

**Parameters:** 2B and 8B. **Context:** 128,000 tokens. **License:** Apache 2.0.

Current generation Granite general-purpose models. Strong instruction following for their size. IBM watsonx.ai provides fine-tuning and governance tooling on top.

**Strengths:** Genuinely open source (weights + training data + code). Enterprise-appropriate training data sources. IBM provides compliance documentation for regulated industries. Runs on modest hardware.

**Weaknesses:** Parameter count is small compared to frontier models. General reasoning quality lags GPT-4o. Brand recognition is lower than Llama in the open-source community.

**When to use it:** Regulated enterprise environments where training data provenance must be documented. Self-hosted deployments in financial services, healthcare, or legal. Fine-tuning base for domain-specific tasks.

**API access:** IBM watsonx.ai, Hugging Face (`ibm-granite/granite-3.2-8b-instruct`), Ollama, self-hosted.

### Granite Code

**Sizes:** 3B, 8B, 20B, 34B. **License:** Apache 2.0.

Code generation variants trained on 116 programming languages. Used inside IBM's and Red Hat's AI coding assistants.

**When to use it:** Enterprise coding assistance where you need open-source weights with clean data provenance. Runs well on a single GPU for the 8B variant.

---

## Allen Institute for AI: OLMo

OLMo (Open Language Model) from the Allen Institute for AI (AllenAI) is the benchmark for transparent LLM development. Everything is released publicly under Apache 2.0: model weights, training code, training data (Dolmino dataset), training logs on Weights and Biases, and evaluation results. There is no comparable level of transparency from any other lab at this capability level.

### OLMo 2

**Released:** November 2024. **Parameters:** 7B and 13B. **Context:** 4,096 tokens (base). **License:** Apache 2.0.

Performance competitive with Llama 3.1 8B and Mistral 7B on standard benchmarks. The differentiator is not raw capability but what you can know about how it was built.

**Strengths:** True open source. Full training transparency. Reproducible. Academic and research community backing. No usage restrictions.

**Weaknesses:** Context window is limited compared to commercially trained models. Performance is competitive but not frontier. Less optimization for instruction following than RLHF-trained models.

**When to use it:** Research requiring fully reproducible LLM experiments. Academic work that needs to cite training data sources. Any context where "open source" must be auditable all the way to the training run.

**API access:** Hugging Face (`allenai/OLMo-2-1124-7B`), self-hosted.

---

## Databricks: DBRX

DBRX is Databricks' open model, released March 2024. It uses a fine-grained Mixture-of-Experts architecture with 132B total parameters and 36B active per forward pass.

**Context:** 32,768 tokens. **License:** Databricks Open Model License (permissive commercial).

**Strengths:** Strong on coding, instruction following, and mathematics at release. Naturally integrates with the Databricks Lakehouse platform for fine-tuning and serving pipelines.

**When to use it:** Teams already using Databricks for data pipelines who want an open model that runs natively in their existing platform. Less relevant outside the Databricks ecosystem.

**API access:** Databricks Model Serving, Together AI, self-hosted.

---

## Technology Innovation Institute: Falcon

Falcon is developed by the Technology Innovation Institute (TII) in Abu Dhabi, UAE. It was briefly the leading open-weight model in 2023 and the Falcon 2 series continues to be actively maintained.

### Falcon 2 11B

**Parameters:** 11B. **License:** Apache 2.0.

Competitive with Llama 3 8B on standard benchmarks. A multimodal variant (Falcon 2 11B VL) adds vision capabilities. Strong performance in Arabic, giving it an advantage in MENA-region deployments.

**Strengths:** Apache 2.0 (no Meta-style community license restrictions). Vision-language variant available. Arabic-language capability is a differentiator.

**When to use it:** Arabic-language applications. Open-weight deployments where you need clean Apache 2.0 licensing without Meta's community license restrictions.

**API access:** Hugging Face (`tiiuae/falcon-11b`), self-hosted.

---

## BigCode: StarCoder2

StarCoder2 is developed by BigCode, a collaboration between Hugging Face and ServiceNow Research. It is a code-specialized model trained on The Stack v2, a curated dataset of permissively licensed code.

### StarCoder2-15B

**Parameters:** 15.5B. **Context:** 16,384 tokens. **License:** BigCode OpenRAIL-M (permissive, prohibits harmful use).

Trained on 600+ programming languages with fill-in-the-middle capability for code completion. Competitive with GPT-3.5 on code benchmarks at a fraction of the inference cost when self-hosted.

**Strengths:** Strong fill-in-the-middle (code completion). Large programming language coverage. Permissive license for commercial use. Available on Hugging Face and Ollama.

**Weaknesses:** Not general-purpose. Smaller context window than frontier models. Instruction-following quality lags Codestral and Claude for code review tasks.

**When to use it:** Self-hosted IDE autocomplete. Code search and indexing. Any coding tool where cost-per-completion matters and a dedicated code model beats a general model.

**API access:** Hugging Face (`bigcode/starcoder2-15b`), Ollama, self-hosted.

---

## Open Source vs Open Weight: What the Distinction Means

"Open source" is used loosely across the LLM industry. The distinction matters for legal, compliance, and reproducibility reasons.

| Term | Weights | Training Code | Training Data | License |
|---|---|---|---|---|
| **Truly open source** | Yes | Yes | Yes, disclosed | OSI-compatible (Apache 2.0, MIT) |
| **Open weight** | Yes | Sometimes | No | Custom (Llama Community, Gemma Terms) |
| **Research release** | Restricted | No | No | Non-commercial only |
| **Proprietary** | No | No | No | API only |

**Truly open source** (weights + training data + code): IBM Granite, OLMo 2, Pythia (EleutherAI), BLOOM (BigScience RAIL), SmolLM (HuggingFace).

**Open weight but not fully open**: Llama 3.x (Meta community license, no training data), Gemma 3 (Gemma Terms, no training data), Mistral 7B (Apache 2.0 for weights, no training data details).

**The practical consequence:** "Open weight" models can be self-hosted and fine-tuned, but you cannot audit, reproduce, or publish the training process. For regulated industries with AI governance requirements, this distinction is increasingly scrutinized under frameworks like the EU AI Act's transparency obligations.

---

## Inference Providers

The models above are available through multiple inference providers beyond their original developers. The provider choice affects latency, cost, available model versions, and the compliance posture of your deployment.

### Groq

Groq builds custom LPU (Language Processing Unit) hardware designed specifically for LLM inference. The architecture eliminates the memory bandwidth bottlenecks that limit GPU throughput for sequential token generation. The result: 10-20x faster token output than GPU-based inference at comparable cost.

**Available models:** Llama 3.3 70B, Llama 3.1 8B, Mixtral 8x7B, DeepSeek R1 Distill variants, Gemma 2, Qwen 2.5.

**Strengths:** Fastest time-to-first-token and tokens-per-second of any hosted provider. OpenAI-compatible API (swap one line of code). Competitive pricing.

**Weaknesses:** Model selection is limited to what Groq has ported to their hardware. No model fine-tuning or hosting.

**When to use it:** Real-time chat interfaces where response latency is a product requirement. Streaming applications. Any workload where Llama 70B quality is needed but GPT-4o-style latency is unacceptable.

**API access:** Groq API (`api.groq.com/openai/v1`), OpenAI SDK compatible.

### Together AI

GPU cloud with 100+ open-weight models and custom fine-tuned model hosting.

**Available models:** Full Llama 3 family, DeepSeek V3 and R1, Qwen 2.5, Mistral, Falcon, DBRX, Qwen Coder, Nous Hermes fine-tunes, and more.

**Strengths:** Largest open-model catalog of any inference provider. Custom model deployment (upload your fine-tuned weights). Competitive pricing for large models. Fine-tuning API.

**When to use it:** Open-weight model inference without GPU infrastructure. Evaluating multiple models against each other before committing to self-hosting. Hosting your own fine-tuned Llama or Mistral.

**API access:** Together AI API (OpenAI-compatible), Together Python SDK.

### Fireworks AI

Inference provider focused on production throughput and structured output reliability.

**Available models:** Llama 3, Mistral, Qwen, DeepSeek, Gemma, Phi, and more.

**Differentiator:** "FireOptimizer" applies automatic quantization and batching for cost reduction without measurable quality loss. Structured output (JSON schema) is fully supported across all major open models, not just proprietary APIs. Function calling reliability is documented and tested.

**When to use it:** Production pipelines requiring reliable structured output from open models. High-throughput batch inference. When switching from OpenAI function calling to an open-model alternative.

**API access:** Fireworks AI API (OpenAI-compatible).

### Hugging Face

Hugging Face operates both a model hub (the largest public model repository) and managed inference.

**Serverless Inference API:** Free-tier access to thousands of models for development and prototyping. Rate-limited.

**Inference Endpoints:** Dedicated GPU instances for production. Any model from the hub. Pay per hour of endpoint uptime.

**Strengths:** Virtually any open-weight model available. Consistent API format across models. Hosting for fine-tuned model checkpoints.

**When to use it:** Prototyping with models not available elsewhere. Hosting your fine-tuned weights for team access. Production inference for models that inference providers do not carry.

**API access:** Inference API (model-specific URL), Inference Endpoints (custom URL), `huggingface_hub` Python library.

### Replicate

API-first platform hosting open-weight models and community fine-tunes via a simple REST API.

**Available models:** Llama, Mistral, Stable Diffusion, Whisper, Flux (image generation), and thousands of community models.

**Strengths:** Zero infrastructure management. Any community model accessible in minutes. Image generation models alongside text on the same API.

**When to use it:** Rapid prototyping with any model in the Replicate catalog. Multimodal workflows mixing text generation and image generation.

**API access:** Replicate API, Replicate Python and JavaScript SDKs.

### Ollama

Open-source tool for running LLMs locally on your own hardware. Downloads and manages GGUF-quantized model weights, runs an inference server, and exposes an OpenAI-compatible API on localhost.

**Available models:** Llama 3, Mistral, Gemma, Phi, DeepSeek, Qwen, Granite, StarCoder2, and more. Install any model with `ollama pull model-name`.

**Strengths:** No API cost. Full privacy (data never leaves your machine). No internet connection required after download. OpenAI-compatible API enables drop-in replacement for local development. Works on Apple Silicon with Metal GPU acceleration.

**When to use it:** Local development and testing. Privacy-sensitive personal use. Offline operation. Zero-cost local inference on a developer machine.

**API:** `http://localhost:11434` (Ollama native) or `http://localhost:11434/v1` (OpenAI-compatible).

### vLLM

Open-source inference server for self-hosted LLMs at production scale. Uses PagedAttention for efficient KV-cache memory management, enabling significantly higher request throughput than naive inference.

**Available models:** Any Hugging Face model. Supports all major architectures (Llama, Mistral, Qwen, Falcon, Gemma, Phi, Mixtral, and more).

**Strengths:** Highest throughput of any open-source inference server. OpenAI-compatible API. Tensor parallelism for distributing a model across multiple GPUs. Streaming support. Active development with frequent releases.

**When to use it:** Self-hosted production inference at scale. Running Llama 70B or larger across multiple GPUs. Kubernetes-based inference services with autoscaling.

**API:** OpenAI-compatible (`/v1/completions`, `/v1/chat/completions`).

---

## Hyperscaler AI Platforms

The major cloud providers wrap multiple models with enterprise controls, compliance certifications, and native cloud integrations. The model itself is often secondary to the platform's governance, data residency, and ecosystem integration story.

### Azure AI (Microsoft)

**Azure OpenAI Service:** OpenAI GPT-4o, o-series reasoning models, and DALL-E on Azure infrastructure. Enterprise SLA, EU and US data residency options, Azure Active Directory integration, content filtering. The most commonly chosen path when an enterprise already holds a Microsoft Enterprise Agreement.

**Azure AI Foundry (formerly Azure AI Studio):** Development platform for building AI applications. Model catalog includes OpenAI, Meta Llama, Mistral, Cohere, and Phi. Includes prompt flow, RAG pipeline tooling, evaluation, content safety, and fine-tuning.

**Azure AI Search:** Managed vector and hybrid search. Integrates directly with Azure OpenAI for RAG pipelines without data leaving the Azure tenant.

**Compliance:** ISO 27001, SOC 2, GDPR, HIPAA, FedRAMP. Required for many regulated US and EU enterprise deployments.

**When to use it:** Enterprises with Microsoft agreements needing OpenAI models on Azure infrastructure. Regulated industries requiring documented compliance certifications. Teams already using Azure AD, Key Vault, and Azure Monitor.

### Google Cloud: Vertex AI

**Vertex AI:** Google's managed ML platform. Gemini 2.0 access (including the 2M context experimental model), Model Garden with 150+ open and commercial models, Llama, Mistral, Gemma, and more. Fine-tuning, evaluation, and serving pipelines.

**Vertex AI Search:** Managed RAG with grounding options. Search grounding links LLM answers to Google Search results for factual queries.

**Vertex AI Pipelines:** MLOps orchestration for training and evaluation. Native integration with BigQuery for large-scale data.

**When to use it:** GCP-native architectures. Teams using BigQuery for data. Workloads where Gemini 2.0's 2M context window is a meaningful advantage. Production ML pipelines with training and evaluation workflows.

### Oracle Cloud Infrastructure: OCI Generative AI

**OCI Generative AI Service:** Managed LLM inference on Oracle Cloud. Available models: Cohere Command R+, Meta Llama 3, Cohere Embed. Available in select OCI regions.

**OCI AI Vector Search (Oracle Database 23ai):** Vector similarity search built directly into Oracle Database. Enables RAG without a separate vector database. Queries run inside the same database that holds production transactional data.

**The Oracle differentiator:** If your data already lives in Oracle Database, AI Vector Search eliminates the data movement that separate vector databases require. For regulated industries with strict data residency, keeping vectors and source data in the same Oracle Database instance simplifies compliance.

**When to use it:** Enterprises with existing Oracle Database agreements. Regulated financial services or healthcare workloads where data cannot be moved to a separate vector store. Oracle Database 23ai as a combined operational + AI data store.

---

## Comparison Tables

### Context Window

| Model | Context Window |
|---|---|
| Gemini 2.0 Pro (experimental) | 2,000,000 tokens |
| Gemini 1.5 Pro | 1,000,000 tokens |
| Gemini 2.0 Flash | 1,000,000 tokens |
| Command A (Cohere) | 256,000 tokens |
| Nova Pro / Nova Lite (Amazon) | 300,000 tokens |
| Claude 4 family | 200,000 tokens |
| GPT-4o | 128,000 tokens |
| Llama 3.x | 128,000 tokens |
| Mistral Large 2 | 128,000 tokens |
| Qwen 2.5 | 128,000 tokens |
| DeepSeek V3 | 128,000 tokens |
| Grok 3 | 131,072 tokens |
| Phi-4 | 16,000 tokens |

### Licensing

| Model | License | Self-Hostable | Training Data Open |
|---|---|---|---|
| IBM Granite 3.2 | Apache 2.0 | Yes | Yes (documented sources) |
| OLMo 2 | Apache 2.0 | Yes | Yes (Dolmino dataset) |
| Falcon 2 | Apache 2.0 | Yes | No |
| StarCoder2 | BigCode OpenRAIL-M | Yes | Yes (The Stack v2) |
| Mistral 7B / Mixtral | Apache 2.0 | Yes | No |
| Qwen 2.5 | Apache 2.0 | Yes | No |
| DeepSeek V3 | MIT | Yes | No |
| DeepSeek R1 | MIT | Yes | No |
| Phi-4 | MIT | Yes | No |
| DBRX | Databricks Open Model License | Yes | No |
| Llama 3.x | Llama Community License | Yes | No |
| Gemma 3 | Gemma Terms of Use | Yes | No |
| Mistral Large | Mistral Research License | Yes (non-commercial) | No |
| GPT-4o | Proprietary | No | No |
| Claude 4 | Proprietary | No | No |
| Gemini 2.0 | Proprietary | No | No |
| Grok 3 | Proprietary | No | No |
| Command R+ | Proprietary | No | No |

### Recommended by Use Case

| Use Case | Primary Choice | Alternative |
|---|---|---|
| Complex reasoning and analysis | Claude 4 Sonnet or Opus | GPT-4o |
| Long document processing | Gemini 2.0 Pro or Claude 4 | Command R+ |
| Mathematics and proofs | o3, o4-mini | DeepSeek R1 |
| Code generation | Claude 4 Sonnet | GPT-4o |
| Code completion (IDE) | Codestral | StarCoder2 |
| Self-hosted: best quality | Llama 3.3 70B | DeepSeek V3 |
| Self-hosted: on-device | Phi-4 14B | Gemma 3 4B |
| Truly open source (auditable) | IBM Granite 3.2 | OLMo 2 |
| Regulated industry, clean data | IBM Granite 3.2 | Mistral 7B |
| Arabic-language applications | Falcon 2 11B | GPT-4o |
| Enterprise RAG with citations | Command R+ | Claude 4 |
| Multilingual (European) | Mistral Large 2 | GPT-4o |
| Chinese language | Qwen 2.5 | DeepSeek V3 |
| Multimodal with video | Gemini 2.0 Pro | Nova Pro |
| AWS-native, data residency | Nova Pro | Claude 4 via Bedrock |
| Azure enterprise, OpenAI models | Azure OpenAI Service | Azure AI Foundry |
| GCP-native, 2M context | Vertex AI + Gemini 2.0 | Vertex AI Search + Gemini |
| Oracle Database environment | OCI AI Vector Search | OCI Generative AI |
| Real-time social data | Grok 3 | GPT-4o + search |
| Ultra-low latency (Llama 70B) | Groq | Fireworks AI |
| Many open models, one API | Together AI | Fireworks AI |
| Local development, zero cost | Ollama | LM Studio |
| Self-hosted production serving | vLLM | TGI (HuggingFace) |
| High volume, low cost | GPT-4o mini or Haiku 4 | Gemini 2.0 Flash |

---

## Architectural Distinctions

### Dense vs. Mixture-of-Experts

Most LLMs are **dense models**: every parameter is active for every forward pass. **Mixture-of-Experts (MoE)** models route each token through a subset of specialist sub-networks, reducing active parameter count while maintaining total model capacity.

MoE models: Mixtral 8x22B, DeepSeek V3 (671B total, 37B active), GPT-4 (widely believed to be MoE but not confirmed).

The practical implication: MoE models at a given quality level require less compute per inference call, but need to load the full model into memory.

### Standard vs. Reasoning Models

**Standard models** generate output token by token based on learned patterns. **Reasoning models** (o1, o3, o4-mini, DeepSeek R1, QwQ) generate an internal chain-of-thought before producing the final answer, spending more compute per call in exchange for higher accuracy on tasks with definite correct answers.

Reasoning models are not better on all tasks. They are slower, more expensive, and their advantage concentrates on mathematics, formal logic, and complex code analysis. For summarization, translation, or general chat, a standard model is faster and cheaper with equivalent quality.

---

## Further Reading

- [LLM Glossary Entry](/glossary/llm/): technical foundations of how large language models work
- [Claude vs ChatGPT: Enterprise Comparison](/comparisons/claude-vs-chatgpt/): detailed side-by-side of the two most deployed models
- [LLM Evaluation Methods](/guides/llm-evaluation-methods/): how to evaluate which model fits your workload
- [LLM Cost Optimization](/guides/llm-cost-optimization/): reducing inference spend across providers
- [LLM Gateway Architecture](/guides/llm-gateway-architecture/): routing between providers, fallback, and cost control
- [Multi-Provider LLM Failover](/patterns/multi-provider-llm-failover/): resilience patterns across model providers
- [Amazon Bedrock](/tools/amazon-bedrock/): accessing multiple models via a single AWS API
- [Anthropic Model Overview](https://docs.anthropic.com/en/docs/about-claude/models/overview): official model IDs and capabilities
- [OpenAI Model Index](https://platform.openai.com/docs/models): official OpenAI model documentation
- [Google Gemini API Models](https://ai.google.dev/gemini-api/docs/models/gemini): official Gemini model reference
- [Meta Llama Model Cards](https://llama.meta.com/): official Llama licensing and model details
- [Mistral Models Documentation](https://docs.mistral.ai/getting-started/models/): Mistral API reference and pricing
- [IBM Granite Models on Hugging Face](https://huggingface.co/ibm-granite): official IBM Granite model cards with training data disclosure
- [AllenAI OLMo on Hugging Face](https://huggingface.co/allenai): OLMo model weights, training code, and Dolmino dataset
- [BigCode StarCoder2 on Hugging Face](https://huggingface.co/bigcode): StarCoder2 model cards and The Stack v2 dataset documentation
- [TII Falcon Models](https://huggingface.co/tiiuae): Falcon 2 model cards from the Technology Innovation Institute
- [Groq API Documentation](https://console.groq.com/docs/openai): OpenAI-compatible API reference and available models
- [Together AI Model Catalog](https://docs.together.ai/docs/inference-models): full list of hosted open-weight models and pricing
- [Fireworks AI Models](https://fireworks.ai/models): model catalog with structured output documentation
- [Ollama Model Library](https://ollama.com/library): searchable catalog of locally runnable models and pull commands
- [vLLM Documentation](https://docs.vllm.ai/): installation, configuration, and OpenAI-compatible server setup
- [Azure AI Foundry Model Catalog](https://ai.azure.com/explore/models): browsable model catalog with deployment options
- [Vertex AI Model Garden](https://cloud.google.com/vertex-ai/generative-ai/docs/model-garden/explore-models): GCP-hosted open and commercial models
- [OCI Generative AI Service](https://docs.oracle.com/en-us/iaas/Content/generative-ai/home.htm): Oracle's managed LLM API documentation
