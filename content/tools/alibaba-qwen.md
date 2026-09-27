---
title: "Alibaba Qwen"
description: "Qwen is Alibaba Cloud's family of large language models, released as a mix of open weights and hosted API tiers and widely used across the open-model ecosystem."
date: 2026-06-29
last_verified: 2026-09-25
tags: ["open weights", "llm", "alibaba", "foundation models"]
tool_category: "AI"
related:
  - glossary/llm
  - glossary/foundation-models
  - tools/deepseek
  - tools/mistral-ai
  - comparisons/llm-landscape-2026
last_updated: 2026-09-25
lastmod: 2026-09-25
---

<figure class="bz-figure">
  <img src="/img/enterprise-dark/pcb-aerial-red-notext.png" alt="An aerial view of a dark circuit board with a red trace network, representing a widely used open model family." loading="lazy">
  <figcaption>Qwen sits deep in the open-model supply chain, powering derivatives and applications well beyond Alibaba's own products.</figcaption>
</figure>

Qwen is the family of [large language models](/glossary/llm/) developed by the Qwen team at Alibaba Cloud, first launched in April 2023 under the Chinese name Tongyi Qianwen. Most Qwen models ship as open weights you can download, run, fine-tune, and use commercially, which has made Qwen one of the most downloaded and forked model families in the open-model ecosystem, with hundreds of thousands of derivative variations published on Hugging Face. What has changed is the licensing: Apache 2.0 was the norm for Qwen 2.5 and Qwen3, but the current flagship-generation releases mostly ship under bespoke Qwen licences with revenue-triggered conditions. Read the licence section below before you assume permissive terms.

The problem Qwen solves is access. Frontier-quality [foundation models](/glossary/foundation-models/) are usually locked behind proprietary APIs. Qwen gives teams a route to run competitive models on their own infrastructure, keep data in their own environment, and avoid per-token API lock-in, while still offering hosted APIs for teams that prefer them.

## Where Qwen sits in the stack

<div class="bz-arch">
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Applications</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Chat assistants</span>
      <span class="bz-arch-chip">Agents</span>
      <span class="bz-arch-chip">RAG pipelines</span>
      <span class="bz-arch-chip-note">Qwen powers Alibaba products and third-party apps</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Access layer</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Open weights</span>
      <span class="bz-arch-chip">Alibaba Cloud Model Studio API</span>
      <span class="bz-arch-chip">QwenCloud API</span>
      <span class="bz-arch-chip">Local runtimes</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Model family</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Qwen3.8-Max (API)</span>
      <span class="bz-arch-chip">Qwen3.8-2.4T-A95B</span>
      <span class="bz-arch-chip">Qwen3.8-27B</span>
      <span class="bz-arch-chip">Qwen3.8-Flash-Next</span>
      <span class="bz-arch-chip">Qwen3.8-Omni-Flash (API)</span>
      <span class="bz-arch-chip">Qwen-Image-2.1</span>
      <span class="bz-arch-chip-note">Natively multimodal base models: text, image, video</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Infrastructure</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Your own GPUs</span>
      <span class="bz-arch-chip">Cloud GPU rental</span>
      <span class="bz-arch-chip">Alibaba Cloud</span>
    </div>
  </div>
</div>

## The model family

Qwen ships fast. The base text line ran through Qwen, Qwen2, Qwen2.5 and Qwen3 (April 2025), then through Qwen3.5 in February 2026, Qwen3.6 in April 2026, Qwen3.7 in May 2026 and Qwen3.8 in August 2026. The current generation is Qwen3.8, and it is structured differently from the family the wiki described a year ago: the separate `-VL` vision line and `-Coder` line have been folded in, because the Qwen3.8 base models are natively multimodal.

The current language-model releases, as of 25 September 2026:

| Model | Released | Shape | Context | Licence |
|---|---|---|---|---|
| **Qwen3.8-Max** (API only; current snapshot `qwen3.8-max-0902`) | Announced 2026-08-03; snapshot 0902 released 2 September 2026 | 2.4T total, ~95B active MoE; text, image and video in | 1,000,000 tokens | Proprietary, hosted |
| **Qwen3.8-Flash** (API only, `qwen3.8-flash`) | 26 August 2026 | Production Flash tier; multimodal | 1,000,000 tokens | Proprietary, hosted |
| **Qwen3.8-2.4T-A95B** | 2026-08-12 | Open-weight checkpoint of the Max tier; text only | 262,144 native, extensible to ~1M | Qwen3.8-Max License |
| **Qwen3.8-27B** | 2026-08-14 | ~27B dense, natively vision-language | 262,144 native, extensible to ~1M via YaRN | Apache 2.0 |
| **Qwen3.8-Flash-Next** | 2026-08-26 | 125B backbone plus a 51B n-gram embedding table and a 4B multi-token-prediction module, ~6B active; multimodal | 262,144 native, extensible to ~1M | Qwen Community License 1.0 |

Qwen3.8-Max is Alibaba's top tier and superseded Qwen3.7-Max (May 2026), which no longer appears in Model Studio's supported-models list. Note that the hosted endpoint moves under you. **`qwen3.8-max-0902`** (alias `qwen3.8-max-2026-09-02`), released on 2 September 2026, is an upgraded Max snapshot that Alibaba says improves long-horizon coding, multi-tool agent work and vision (charts, documents); it keeps the 1M context window, thinking mode and tools, and is API-only. The undated `qwen3.8-max` was automatically transitioned to that snapshot on 5 September 2026 (UTC+8), with billing unchanged.

Keep the two Flash models apart. **`qwen3.8-flash`** is the production, API-only Flash tier (26 August 2026, multimodal, 1M context). **Qwen3.8-Flash-Next** is a separate open-weight release that the Qwen team describes as an experimental architecture preview of Qwen4 rather than a production model. They share a name stem, not weights or limits.

### Omni, speech and realtime models (API)

September added a set of API-only multimodal and speech models on Model Studio (International / Singapore):

| Model ID | Released | What it does |
|---|---|---|
| `qwen3.8-omni-flash` | 17 September 2026 | **Qwen3.8-Omni-Flash**: text, image, audio and video in; text out. Thinking and non-thinking modes, function calling, web search, context caching. |
| `qwen3.8-omni-flash-realtime` | 21 September 2026 | Real-time audio and video interaction with text and audio output; adds multichannel audio, video aggregation and **remote MCP tools**. WebSocket, WebRTC and AOQ access. |
| `qwen-audio-3.1-realtime-plus` | 20 September 2026 | Full-duplex speech conversation on the same protocol as 3.0 Plus, eight new system voices, **262,144-token context**, function calling, web search and voice cloning. |

### Specialist open weights

- **Qwen-Image-2.1** (Hugging Face, 14 September 2026): a unified text-to-image and image-editing model with a **7B DiT image generator** (32 single-stream layers). It can output transparent **RGBA** images, edit transparent layers, and take **up to 10 reference images** for editing, with local edits marked by circles, annotations or masks. It runs through a new `QwenImage21Pipeline` in diffusers. Check the licence carefully: the weights ship under the **Qwen Research License Agreement, which is non-commercial** (research and evaluation only); commercial use needs a separate licence from Alibaba.
- **Qwen-Drive-1.0-4B** (Hugging Face, 27 August 2026, Apache 2.0): an autonomous-driving model built on Qwen3.5-4B that combines 3D perception (a bird's-eye-view head), visual question answering and motion planning.

The important nuance for 2026 is that **open weights at the Max tier are not the same product as the Max API**. On 2026-08-12 Alibaba published Max-class weights for the first time, as Qwen3.8-2.4T-A95B, reversing the closed-flagship posture it had held since Qwen3-Max. But the downloadable checkpoint is trimmed: it is text-only where the hosted model accepts image and video, its native context is 262K rather than the API's 1M, thinking mode is forced on, and it ships without built-in tools. If you benchmark the open checkpoint and plan around the API, or the reverse, you will be surprised.

Superseded lines you may still see referenced: Qwen 2.5 and Qwen 2.5 72B, Qwen2.5-Coder, Qwen-VL and Qwen2-VL, and QwQ-32B. All but QwQ-32B are replaced by the natively multimodal Qwen3.8 base models; QwQ-32B's role is covered by the thinking mode built into every Qwen3.x model.

### Licensing

Qwen's licensing is now the part most likely to trip up a procurement review. Of the current generation, only **Qwen3.8-27B is Apache 2.0**. The other two open releases carry bespoke licences with conditions that switch on above a revenue or user-count threshold:

- **Qwen3.8-Max License** (Qwen3.8-2.4T-A95B): the model name must be displayed prominently once you pass 100 million monthly active users or US$20 million in monthly revenue, and a separate licence is required for Model-as-a-Service or AI-assistant businesses above US$50 million in revenue over any consecutive twelve months. Purely internal use with no third-party exposure is exempt.
- **Qwen Community License 1.0** (Qwen3.8-Flash-Next): equivalent attribution and Model-as-a-Service triggers.
- **Qwen Research License Agreement** (Qwen-Image-2.1): non-commercial use only. Qwen-Drive-1.0-4B, by contrast, is Apache 2.0.

The old advice to check the licence on each model card still holds. What has changed is the default assumption behind it: for the current flagship generation, permissive is the exception rather than the rule. This is an ecosystem-wide shift, not a Qwen quirk — Kimi K3, GLM-5.3 and MiniMax-M3 all landed under bespoke licences in the same window, and DeepSeek's V4 line (MIT), Qwen3.8-27B (Apache 2.0) and GLM-5.3-Flash (MIT) are the current permissive exceptions.

## How to access it

You can use Qwen in four ways, depending on how much control you need.

1. **Download the open weights.** Open-weight Qwen models are published on Hugging Face and ModelScope. You pull the weights and run them on hardware you control. This keeps your prompts and data in your own environment.
2. **Run it locally or self-host.** Qwen open-weight models run through common runtimes such as llama.cpp, Ollama, and LM Studio for local use, or through serving stacks like vLLM for production. You can also [fine-tune](/glossary/fine-tuning/) the open weights on your own data. Realistically, Qwen3.8-27B is the largest current-generation model a normal team can self-host; the 2.4T Max checkpoint is not.
3. **Call Alibaba Cloud Model Studio.** [Model Studio](/tools/alibaba-model-studio/) exposes the Qwen API tiers — currently `qwen3.8-max` (snapshot `qwen3.8-max-0902`), `qwen3.7-plus`, `qwen3.8-flash` and the omni and realtime models above — alongside third-party models, with fine-tuning, RAG and agent tooling around them.
4. **Call QwenCloud.** Alibaba launched a second Qwen-branded API front end, QwenCloud, on 2026-05-26 out of Singapore. It is compatible with both the OpenAI and Anthropic protocols and is aimed at agent workloads (Skills, a CLI). It is not a separate account: API keys still come from Model Studio, and its "Token Plan" subscription (from US$6 per month for the Lite tier) is documented and purchased as a Model Studio service in the Singapore region. QwenCloud publishes per-token rates as well, and is where Qwen quotes the production Qwen3.8-Flash at $0.15 per 1M input, $0.47 per 1M output and $0.016 per 1M on cache hits — figures from the Qwen team's own social post rather than a price table.

Alibaba does not publish per-token Model Studio prices in a form that survives automated retrieval; the tables live behind the console and marketplace. Secondary sources put Qwen3.8-Max at roughly $2.00 per 1M input and $6.00 per 1M output, flat across the full 1M context, with a prompt-cache discount around 90% and a 50% batch discount. Check the console before you build a cost model on those numbers.

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 1</span>
    <span class="bz-flow-step-name">Pick a model</span>
    <span class="bz-flow-step-desc">Qwen3.8-27B for self-hosting, Qwen3.8-Max on the API for the hardest tasks.</span>
  </div>
  <div class="bz-flow-arrow">&rarr;</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 2</span>
    <span class="bz-flow-step-name">Check the license</span>
    <span class="bz-flow-step-desc">Only Qwen3.8-27B is Apache 2.0. Read the model card for revenue and MAU triggers.</span>
  </div>
  <div class="bz-flow-arrow">&rarr;</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 3</span>
    <span class="bz-flow-step-name">Deploy or call the API</span>
    <span class="bz-flow-step-desc">Serve the weights on your own GPUs, or call Model Studio or QwenCloud.</span>
  </div>
  <div class="bz-flow-arrow">&rarr;</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 4</span>
    <span class="bz-flow-step-name">Adapt</span>
    <span class="bz-flow-step-desc">Fine-tune on your data or wire the model into an agent or RAG pipeline.</span>
  </div>
</div>

## How it compares

Qwen competes most directly with other open-weight model families. The table compares it against three widely used alternatives.

| | Alibaba Qwen | Meta Llama | Mistral AI | DeepSeek |
|---|---|---|---|---|
| **Maker** | Alibaba Cloud | Meta | Mistral AI (France) | DeepSeek (China) |
| **Open weights** | Yes, most releases | Yes | Yes, several models | Yes |
| **Common license** | Bespoke Qwen licences at the flagship tier; Apache 2.0 on Qwen3.8-27B | Llama community license | Apache 2.0 (varies) | MIT across the V4 and V4.1 lines |
| **Architectures** | Dense and MoE | Dense and MoE | Dense and MoE | Dense and MoE |
| **Multimodal** | Native text, image and video in the current generation; audio in Omni models | Varies by release | Varies by release | Image input on V4.1-Flash |
| **Best for** | Multilingual, wide size range | Large community, tooling | European hosting, efficiency | Reasoning, cost efficiency |

For a broader view of where these families sit, see the [2026 LLM landscape comparison](/comparisons/llm-landscape-2026/), [Mistral AI](/tools/mistral-ai/), and [DeepSeek](/tools/deepseek/).

## When not to use it

- **You need a fully managed frontier product with enterprise support baked in.** A proprietary hosted API from a single vendor may fit your procurement and support needs better than self-hosting open weights.
- **You have strict data-residency or vendor-governance rules that exclude the provider.** Some organizations restrict models developed by specific companies or countries. Confirm your policy before adopting Qwen through either hosted API.
- **You cannot run the model you want.** The largest MoE models need serious GPU capacity, and Qwen3.8-2.4T-A95B is far beyond a single node. If you lack that hardware and do not want to pay for a hosted API, Qwen3.8-27B or a different provider may suit you.
- **The license does not permit your use.** Not every Qwen release is Apache 2.0, and the current flagship weights are not. If your business is Model-as-a-Service, or you expect to cross 100 million MAU or the revenue thresholds above, you need a separate agreement with Alibaba, not just a download.
- **You need a stable pinned checkpoint on the API.** Undated ids like `qwen3.8-max` are transitioned to new snapshots automatically. Pin a dated snapshot if reproducibility matters.

## Further reading

- [What is an LLM?](/glossary/llm/): the plain-English explanation of large language models.
- [Foundation models](/glossary/foundation-models/): why large pretrained models are reused across many tasks.
- [Alibaba Cloud Model Studio](/tools/alibaba-model-studio/): the hosted platform that serves the Qwen API tiers.
- [Mistral AI](/tools/mistral-ai/): a European open-weight model family and a common Qwen alternative.
- [DeepSeek](/tools/deepseek/): another open-weight family known for reasoning and cost efficiency.
- [The 2026 LLM landscape](/comparisons/llm-landscape-2026/): where open and closed model families sit relative to each other.
- [Qwen official site](https://qwen.ai/): the Qwen team's home page.
- [Qwen on Hugging Face](https://huggingface.co/Qwen): current model cards, sizes, and licences.

## Sources

- Qwen official site: https://qwen.ai/
- Qwen on Hugging Face (current releases and their dates): https://huggingface.co/Qwen
- Qwen3.8-2.4T-A95B model card and LICENSE (2.4T/95B, text-only, 262,144 native context, Qwen3.8-Max License triggers): https://huggingface.co/Qwen/Qwen3.8-2.4T-A95B
- Qwen3.8-27B model card (Apache 2.0, ~27B dense, native vision): https://huggingface.co/Qwen/Qwen3.8-27B
- Qwen3.8-Flash-Next model card (Qwen Community License 1.0, architecture, thinking mode): https://huggingface.co/Qwen/Qwen3.8-Flash-Next
- Alibaba Cloud press room, Qwen3.8-Max announcement (2026-08-03, 2.4T/95B, 1M context, multimodal): https://www.alibabacloud.com/en/press-room/alibaba-unveils-qwen3-8-max
- Model Studio supported models (current API tiers: qwen3.8-max, qwen3.7-plus, qwen3.8-flash): https://www.alibabacloud.com/help/en/model-studio/models
- Model Studio, "Model lifecycle and updates" (newly released models: qwen3.8-max-0902 on 2 September, qwen3.8-omni-flash on 17 September, qwen-audio-3.1-realtime-plus on 20 September, qwen3.8-omni-flash-realtime on 21 September 2026; updated 24 September 2026): https://www.alibabacloud.com/help/en/model-studio/newly-released-models
- Qwen-Image-2.1 model card and LICENSE (14 September 2026; 7B DiT, RGBA, 10 reference images, Qwen Research License, non-commercial): https://huggingface.co/Qwen/Qwen-Image-2.1
- Qwen blog, Qwen-Image-2.1: https://qwen.ai/blog?id=qwen-image-2.1
- Qwen-Drive-1.0-4B model card (27 August 2026, Apache 2.0, built on Qwen3.5-4B): https://huggingface.co/Qwen/Qwen-Drive-1.0-4B
- Model Studio update notice, qwen3.8-max moves to the qwen3.8-max-0902 snapshot on 2026-09-05: https://www.alibabacloud.com/en/notice/model_studio_update_notice_for_qwen38max_models_863
- Alibaba Cloud launches QwenCloud for global markets (2026-05-26, Singapore, Skills/CLI/web access): https://www.alibabacloud.com/blog/alibaba-cloud-launches-qwen-cloud-for-global-markets_603191
- Token Plan overview, Alibaba Cloud docs (Token Plan is a Model Studio subscription, Singapore region only, Lite from US$6/month): https://www.alibabacloud.com/help/en/model-studio/token-plan-overview
- Qwen team post quoting Qwen3.8-Flash rates ($0.15 in, $0.47 out, $0.016 cache hit, per 1M tokens): https://x.com/Alibaba_Qwen/status/2092867093385613760
- DataCamp on Qwen3.8-Max (reported per-token pricing, secondary source): https://www.datacamp.com/blog/qwen3-8-max
- Qwen on Wikipedia: https://en.wikipedia.org/wiki/Qwen
