---
title: "Alibaba Cloud Model Studio"
description: "Alibaba Cloud's managed platform for building generative AI applications on the Qwen model family and third-party models, with fine-tuning, RAG, and agent tooling."
date: 2026-06-29
last_verified: 2026-09-25
tags: ["alibaba", "generative-ai", "qwen", "llm-platform", "rag"]
tool_category: "AI"
related:
  - tools/alibaba-qwen
  - tools/amazon-bedrock
  - tools/azure-openai
  - glossary/foundation-models
  - glossary/rag
  - glossary/fine-tuning
  - guides/multi-cloud-ai-strategy
last_updated: 2026-09-25
lastmod: 2026-09-25
---

<figure class="bz-figure">
  <img src="/img/rapid-ai/holographic-radar-icons-green-notext.png" alt="A holographic radar with capability icons, representing a cloud platform for building with many models." loading="lazy">
  <figcaption>Model Studio bundles many model types and building blocks behind one radar of capabilities.</figcaption>
</figure>

Alibaba Cloud Model Studio is a managed platform for building generative AI applications. It gives you API access to the full Qwen model family and a set of mainstream third-party models, so you do not manage the GPUs or serving infrastructure yourself. On top of raw model access, it adds the building blocks most applications need: prompt tuning, fine-tuning, retrieval-augmented generation over your own documents, and agent applications that call tools. If you have used the Qwen models directly, Model Studio is the hosted control plane that wraps them, alongside models from other vendors, behind one account and one billing relationship. Since 2026-05-26 it is no longer the only official Alibaba route to Qwen: QwenCloud is a second, agent-focused front end onto the same models, covered below.

The problem it solves is the gap between a strong open model and a working product. Qwen is a capable [foundation model](/glossary/foundation-models/) family, but a foundation model alone does not answer questions about your private data, stay within your prompt conventions, or take actions. Model Studio supplies the layers that turn a model into an application without you standing up your own inference stack.

<div class="bz-arch">
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Your application</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Chat UI</span>
      <span class="bz-arch-chip">Backend service</span>
      <span class="bz-arch-chip-note">Calls Model Studio over HTTPS</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Access layer</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">OpenAI-compatible API</span>
      <span class="bz-arch-chip">DashScope API</span>
      <span class="bz-arch-chip-note">API key, base URL, model name</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Building blocks</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Prompt tuning</span>
      <span class="bz-arch-chip">Fine-tuning</span>
      <span class="bz-arch-chip">RAG knowledge base</span>
      <span class="bz-arch-chip">Agent applications</span>
      <span class="bz-arch-chip">Plugins</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Models</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">qwen3.8-max</span>
      <span class="bz-arch-chip">qwen3.7-plus</span>
      <span class="bz-arch-chip">qwen3.8-flash</span>
      <span class="bz-arch-chip">qwen3.8-omni-flash</span>
      <span class="bz-arch-chip">DeepSeek, Kimi, GLM</span>
      <span class="bz-arch-chip-note">Text, vision, image, audio, embeddings</span>
    </div>
  </div>
</div>

## How it fits and how to use it

Model Studio sits between your code and the models. You do not install a runtime. You create an account on Alibaba Cloud, get an API key, and call the platform over HTTPS. Two API styles are available: the OpenAI-compatible API, which lets you point an existing OpenAI client at Model Studio by changing the API key, base URL, and model name, and the DashScope API, Alibaba's own interface for the Qwen models.

The catalog centres on three flagship Qwen text tiers, which Alibaba positions as a cost and capability ladder. As of 25 September 2026 the supported-models page lists them as:

- **`qwen3.8-max`**: the highest-performing tier, suited to complex, multi-step tasks. The alias currently points at the `qwen3.8-max-0902` snapshot (alias `qwen3.8-max-2026-09-02`, released 2 September 2026), which Alibaba says improves long-horizon coding, multi-tool agent work and vision. Announced 2026-08-03, roughly 2.4T total parameters with about 95B active, a 1,000,000-token context window, and native image and video input. It replaced `qwen3.7-max`, which is simply absent from the current model list rather than formally sunset.
- **`qwen3.7-plus`**: a balance of performance, speed, and cost, recommended as the default for most scenarios. Note the version skew - the Plus tier is still on 3.7 while Max and Flash have moved to 3.8, so "Plus" and "Max" are not two rungs of the same generation.
- **`qwen3.8-flash`**: low cost and low latency for simpler, high-volume tasks. Released 26 August 2026, multimodal, 1M context. This is an API model and is not the same thing as the open-weight Qwen3.8-Flash-Next preview.

Alibaba does not publish these per-token prices in a form an automated reader can retrieve; the tables sit behind the Model Studio console and marketplace. Secondary sources put `qwen3.8-max` at roughly $2.00 per 1M input tokens and $6.00 per 1M output, flat across the full context, with a prompt-cache discount around 90% and a 50% batch discount. Confirm in the console before you build a budget on it.

Beyond Qwen, the platform also serves selected third-party models, including DeepSeek, Kimi, and GLM, so you can compare or route across providers without leaving the account.

### Recent additions (August to September 2026)

Alibaba's "Model lifecycle and updates" page (International / Singapore service scope) lists these among the recent releases:

| Date | Model ID | What it is |
|---|---|---|
| 19 August 2026 | `kimi-k3` | Moonshot's Kimi K3 (2.8T parameters, native vision, 1M context) |
| 2 September 2026 | `qwen3.8-max-0902` | Upgraded Qwen3.8-Max snapshot; 1M context, thinking mode, tools |
| 13 September 2026 | `deepseek-v4.1-flash` | [DeepSeek](/tools/deepseek/)-V4.1-Flash, released by DeepSeek on 10 September: 552B MoE, 8B active on input and 16B on output, native image understanding, 1M context, 384K max output |
| 17 September 2026 | `qwen3.8-omni-flash` | Qwen3.8-Omni-Flash: text, image, audio and video in, text out; thinking and non-thinking modes |
| 20 September 2026 | `qwen-audio-3.1-realtime-plus` | Full-duplex speech conversation, 262,144-token context, function calling, web search, voice cloning |
| 21 September 2026 | `qwen3.8-omni-flash-realtime` | Real-time audio and video with text and audio output, remote MCP tools; WebSocket, WebRTC and AOQ access |

The same list includes Vidu video and image models (14 September), HappyOyster world models (17 September) and a structured `decision-model-preview` for classification and scoring (24 September). Availability differs by region, so check the entry for your deployment region; the Model Studio id for DeepSeek's model is `deepseek-v4.1-flash`, not DeepSeek's own `deepseek-flash`, and Model Studio sets its own price for it. The catalog spans several modalities: text generation, visual understanding, image generation, video generation, speech recognition and synthesis, and embeddings. Embedding and reranking models exist specifically to support retrieval, which feeds the RAG features below.

Three building blocks turn model access into an application:

- **Prompt tuning and fine-tuning**: refine a model's behaviour, from adjusting system prompts to fine-tuning Qwen models over the HTTP API. Alibaba documents supervised fine-tuning and LoRA among the supported techniques. See [fine-tuning](/glossary/fine-tuning/) for what this means and when it pays off.
- **RAG knowledge base**: connect a model to your own documents so answers cite retrieved passages instead of relying on the model's training data alone. This raises accuracy on private or domain-specific questions and reduces hallucination. Read [what RAG is](/glossary/rag/) for the pattern in detail.
- **Agent applications**: build an assistant by choosing a model, tuning the system prompt, attaching a knowledge base, and calling plugins such as code execution, web search, or text-to-image. Model Studio ships official plugins and lets you add custom ones.

A typical build follows this sequence.

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 1</span>
    <span class="bz-flow-step-name">Pick a model</span>
    <span class="bz-flow-step-desc">Start with qwen3.7-plus for most cases; move to qwen3.8-max for hard tasks or qwen3.8-flash for volume.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 2</span>
    <span class="bz-flow-step-name">Shape behaviour</span>
    <span class="bz-flow-step-desc">Tune the system prompt, then fine-tune if prompting alone misses your quality bar.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 3</span>
    <span class="bz-flow-step-name">Add your data</span>
    <span class="bz-flow-step-desc">Build a RAG knowledge base so answers ground in your documents.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 4</span>
    <span class="bz-flow-step-name">Connect tools</span>
    <span class="bz-flow-step-desc">Attach plugins for search, code execution, or image generation to make an agent.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 5</span>
    <span class="bz-flow-step-name">Call from your app</span>
    <span class="bz-flow-step-desc">Invoke the OpenAI-compatible or DashScope API from your backend.</span>
  </div>
</div>

Model Studio is available in several regions, including Singapore, US (Virginia), Japan (Tokyo), Germany (Frankfurt), and mainland China and Hong Kong regions. Region choice matters for latency and for where your data is processed.

### Snapshots and decommissioning

Pin deliberately. An undated id like `qwen3.8-max` is an alias that Alibaba moves: on 2026-09-05 (UTC+8) it was automatically transitioned to the `qwen3.8-max-0902` snapshot, with billing unchanged but the underlying checkpoint different. If you need reproducible behaviour, call a dated snapshot id and upgrade on your own schedule. Alibaba's model-decommissioning policy gives snapshot models 30 days of sunset notice and mainline models three months, so a pinned snapshot buys you a shorter runway than a mainline id - which is the tradeoff to weigh.

## How it compares

Model Studio plays the same role as the managed model platforms from the other hyperscalers: a hosted way to reach many models plus tooling for fine-tuning, retrieval, and agents. The main difference is the model catalog and the cloud you run on. (The table below refers to Google Vertex AI, rebranded Gemini Enterprise Agent Platform in April 2026 - see [Google Vertex AI](/tools/google-vertex-ai/) for the full story.)

| | Alibaba Model Studio | [Amazon Bedrock](/tools/amazon-bedrock/) | [Azure OpenAI](/tools/azure-openai/) | Google Vertex AI |
|---|---|---|---|---|
| **Cloud** | Alibaba Cloud | AWS | Microsoft Azure | Google Cloud |
| **Flagship models** | Qwen3.8 family (qwen3.8-max, qwen3.7-plus, qwen3.8-flash, qwen3.8-omni-flash) | Multiple third-party plus Nova | OpenAI GPT family | Gemini family |
| **Third-party models** | DeepSeek, Kimi, GLM | Anthropic, Meta, Mistral, others | Focused on OpenAI | Some third-party via Model Garden |
| **API style** | OpenAI-compatible, DashScope | Bedrock API | OpenAI-compatible, Azure API | Vertex API |
| **Fine-tuning, RAG, agents** | Yes | Yes | Yes | Yes |
| **Strongest for** | Qwen access, Asia-Pacific reach | Broad model choice on AWS | Teams standardised on OpenAI models | Teams on Google Cloud and Gemini |

One comparison the table above cannot capture is the one inside Alibaba. On 2026-05-26 Alibaba Cloud launched **QwenCloud** out of Singapore as a second, agent-first front end onto the Qwen models: compatible with both the OpenAI and Anthropic protocols, reached through Skills, a CLI, or the web, and marketed alongside a "Token Plan" subscription that starts around US$6 per month for the Lite tier. Read the boundary carefully, because it is a branding split rather than a separate account: QwenCloud API keys are still Model Studio keys, and Token Plan is documented as a Model Studio subscription service, currently only in the Singapore region. Model Studio remains where fine-tuning, RAG knowledge bases, third-party models, and enterprise region choice live. If you are choosing an Alibaba route, compare both surfaces rather than assuming the Model Studio console is the only door.

For a wider view of how these platforms and models line up, see the [multi-cloud AI strategy guide](/guides/multi-cloud-ai-strategy/) and the [LLM landscape comparison](/comparisons/llm-landscape-2026/).

## When not to use it

Model Studio is a strong fit when Qwen suits your workload or you already run on Alibaba Cloud. It is a weaker fit in several cases.

- **You are standardised on another cloud.** If your data, identity, and networking live in AWS, Azure, or Google Cloud, the matching platform reduces egress and integration friction. Adding a second cloud for one service adds operational cost.
- **You need a specific proprietary model.** If your application depends on a particular GPT or Claude version, use the platform that hosts it. Model Studio centres on Qwen and a curated set of third-party models.
- **You must self-host for compliance.** Model Studio is a managed service. If a regulation requires the model to run in your own datacentre, you need the open Qwen weights on your own infrastructure, not the hosted platform. See [the Qwen models page](/tools/alibaba-qwen/) for the open-weight option.
- **Your data cannot leave a specific jurisdiction not offered.** Region availability is finite. Confirm a compliant region exists before you commit.
- **You only want Qwen for agent work on a subscription.** If you are not using fine-tuning, knowledge bases, or third-party models, the QwenCloud surface and a Token Plan subscription may be a simpler and cheaper fit than building on the full Model Studio console - though you still sign up for Model Studio to get the key, and Token Plan is Singapore-region only.

## Further reading

- [Alibaba Qwen models](/tools/alibaba-qwen/): the open model family that Model Studio serves and hosts.
- [Amazon Bedrock](/tools/amazon-bedrock/): the AWS equivalent, useful for a direct feature comparison.
- [Azure OpenAI](/tools/azure-openai/): the Azure equivalent, centred on the OpenAI model family.
- [What is retrieval-augmented generation](/glossary/rag/): the pattern behind Model Studio knowledge bases.
- [What is fine-tuning](/glossary/fine-tuning/): when adapting a model beats prompting alone.
- [Multi-cloud AI strategy](/guides/multi-cloud-ai-strategy/): how to choose and combine model platforms across clouds.
- [What is a foundation model](/glossary/foundation-models/): the base that all these platforms build on.

## Sources

- [Model Studio product page, Alibaba Cloud](https://www.alibabacloud.com/en/product/modelstudio)
- [What is Model Studio, Alibaba Cloud docs](https://www.alibabacloud.com/help/en/model-studio/what-is-model-studio)
- [Supported models and capabilities, Alibaba Cloud docs](https://www.alibabacloud.com/help/en/model-studio/models)
- [Fine-tune Qwen LLMs with HTTP API, Alibaba Cloud docs](https://www.alibabacloud.com/help/en/model-studio/text-generation-model-tuning)
- [RAG knowledge base, Alibaba Cloud docs](https://www.alibabacloud.com/help/en/model-studio/rag-knowledge-base)
- [Agent application architecture, Alibaba Cloud docs](https://www.alibabacloud.com/help/en/model-studio/single-agent-application)
- [Model lifecycle and updates, newly released models (kimi-k3 19 Aug; qwen3.8-max-0902 2 Sep; deepseek-v4.1-flash 13 Sep; qwen3.8-omni-flash 17 Sep; qwen-audio-3.1-realtime-plus 20 Sep; qwen3.8-omni-flash-realtime 21 Sep 2026; page updated 24 September 2026), Alibaba Cloud docs](https://www.alibabacloud.com/help/en/model-studio/newly-released-models)
- [DeepSeek API changelog, DeepSeek-V4.1-Flash release (10 September 2026)](https://api-docs.deepseek.com/updates)
- [Model Studio update notice: qwen3.8-max moves to the qwen3.8-max-0902 snapshot on 2026-09-05, Alibaba Cloud](https://www.alibabacloud.com/en/notice/model_studio_update_notice_for_qwen38max_models_863)
- [Model decommissioning policy (30 days for snapshots, 3 months for mainline models), Alibaba Cloud docs](https://help.aliyun.com/en/model-studio/model-depreciation)
- [Alibaba unveils Qwen3.8-Max, Alibaba Cloud press room](https://www.alibabacloud.com/en/press-room/alibaba-unveils-qwen3-8-max)
- [Alibaba Cloud launches QwenCloud for global markets, Alibaba Cloud blog](https://www.alibabacloud.com/blog/alibaba-cloud-launches-qwen-cloud-for-global-markets_603191)
- [Token Plan overview, Alibaba Cloud docs (a Model Studio subscription, Singapore region only, Lite from US$6/month)](https://www.alibabacloud.com/help/en/model-studio/token-plan-overview)
- [Qwen3.8-Max pricing overview, DataCamp (secondary source for per-token rates)](https://www.datacamp.com/blog/qwen3-8-max)
