---
title: "DeepSeek"
description: "DeepSeek is a Chinese AI lab known for open-weight large language models and a focus on training and inference efficiency."
date: 2026-06-29
last_verified: 2026-09-25
tags: ["open-weight", "llm", "reasoning", "mixture-of-experts"]
tool_category: "AI"
related:
  - glossary/llm
  - glossary/foundation-models
  - glossary/inference
  - tools/alibaba-qwen
  - comparisons/llm-landscape-2026
last_updated: 2026-09-25
lastmod: 2026-09-25
---

<figure class="bz-figure">
  <img src="/img/dark-cherry/vortex-complexity.png" alt="A dark spiraling vortex with a red core, representing an efficiency-focused open model lab." loading="lazy">
  <figcaption>DeepSeek pushes intelligence out of a tight efficiency budget, then hands the weights back to everyone.</figcaption>
</figure>

DeepSeek is an AI research lab based in Hangzhou, China. It builds [large language models](/glossary/llm/) and releases them as open-weight models, with the entire current V4 line under the permissive MIT licence. (Older releases vary: DeepSeek-R1 is MIT, but the original DeepSeek-V3 weights ship under the bespoke DeepSeek License Agreement, so check the model card on anything pre-V4.) Its positioning rests on two ideas: publish the model weights so anyone can run them, and reach frontier-level quality on a smaller compute budget than the big closed labs. That combination made DeepSeek one of the most-discussed model families of 2025 and 2026, and DeepSeek is now one of the few labs still shipping a genuinely permissive licence at the flagship tier.

The lab was established on 2023-07-17 by Liang Wenfeng, who also founded the quantitative hedge fund High-Flyer. High-Flyer spun its research group into DeepSeek as a separate company and remains its principal backer. The problem DeepSeek attacks is cost. Training and serving a capable [foundation model](/glossary/foundation-models/) is expensive, and closed APIs lock teams into per-token billing. Open weights plus efficient architecture give teams a path to run strong models on their own hardware.

## Where DeepSeek sits in the stack

<div class="bz-arch">
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Access</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Web chat</span>
      <span class="bz-arch-chip">Mobile app</span>
      <span class="bz-arch-chip">Hosted API</span>
      <span class="bz-arch-chip">Self-hosted weights</span>
      <span class="bz-arch-chip">DeepSeek Harness (dsh)</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Models</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">deepseek-flash (V4.1-Flash)</span>
      <span class="bz-arch-chip">deepseek-v4-pro</span>
      <span class="bz-arch-chip-note">Two API models, MIT-licensed weights, reasoning set per request</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Architecture</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Mixture-of-Experts</span>
      <span class="bz-arch-chip">Sparse activation</span>
      <span class="bz-arch-chip-note">A fraction of total parameters activate per token to cut compute</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Compute</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">GPU clusters</span>
      <span class="bz-arch-chip">Custom training stack</span>
      <span class="bz-arch-chip-note">Efficiency-tuned to train on constrained hardware budgets</span>
    </div>
  </div>
</div>

DeepSeek's headline models use a Mixture-of-Experts design. The model holds a large total parameter count, but only a small subset of parameters activates for any given token. That keeps [inference](/glossary/inference/) cost lower than a dense model of the same nominal size.

## The current model line-up

DeepSeek-V3 shipped in December 2024 and the reasoning-focused DeepSeek-R1 followed in January 2025. Both are historically important and still downloadable, but neither is served on DeepSeek's API any more: the V3 line and the `deepseek-chat` and `deepseek-reasoner` aliases were discontinued on 2026-07-24, three months after the V4 launch announced the deprecation. There is no R2. The Financial Times reported in August 2025 that R2 was delayed after DeepSeek, under official pressure to train on Huawei Ascend hardware, could not complete a training run and fell back to Nvidia GPUs, with data-labelling problems compounding the slip; as of 25 September 2026 no R2 model id, model card, or technical report exists.

As of 25 September 2026 the API serves **two models**, both with a 1,000,000-token context window and a maximum output of 384K tokens: **DeepSeek-V4.1-Flash** under the new name `deepseek-flash`, and **DeepSeek-V4-Pro-0813** under `deepseek-v4-pro`.

| Model | API id | Status | Weights |
|---|---|---|---|
| **DeepSeek-V4.1-Flash** | `deepseek-flash` | Released 10 September 2026 | `deepseek-ai/DeepSeek-V4.1-Flash`, MIT |
| **DeepSeek-V4-Pro** (checkpoint V4-Pro-0813) | `deepseek-v4-pro` | GA since 13 August 2026, continues unchanged | `deepseek-ai/DeepSeek-V4-Pro-0813`, MIT |
| DeepSeek-V4-Flash (checkpoint V4-Flash-0731) | `deepseek-v4-flash` (legacy alias) | Retired 10 September 2026 (previous generation, superseded by V4.1-Flash) | `deepseek-ai/DeepSeek-V4-Flash-0731`, MIT |
| DeepSeek-V4-Flash-Vision-Exp | `deepseek-v4-flash-vision-exp` (legacy alias) | Retired 10 September 2026 (previous generation, superseded by V4.1-Flash) | On Hugging Face, MIT |

### DeepSeek-V4.1-Flash

DeepSeek released **DeepSeek-V4.1-Flash on 10 September 2026**, describing it as the smallest model in a new architecture family, with native multimodal visual understanding. The weights are on Hugging Face under the **MIT licence**. Per the model card:

- **Size:** a Mixture-of-Experts model with a **552B-parameter backbone**, activating **8B parameters per token during prefill and 16B during decode**. It adds a separate **196B-parameter "Engram" conditional memory**, accessed sparsely by token-based lookup. Each MoE layer has 1 shared expert and 384 routed experts, with 6 routed experts active per token.
- **Architecture:** a Causal Encoder-Decoder (a 20-layer causal encoder followed by a 20-layer decoder, where the decoder's KV cache is projected from the encoder output), Compressed Sparse Attention 2 (CSA2), and **FP4 KV caching**. DeepSeek puts the global KV cache at 890 bytes per token, roughly **a quarter of V4-Flash's**. The low prefill activation is aimed at input-heavy agent workloads.
- **Modalities:** image and text in, text out. A vision encoder is trained jointly with the language model from the start of pre-training.
- **Training and limits:** 45T training tokens; 1M-token context; 384K maximum output.
- **Reasoning effort:** the model itself supports a continuous reasoning effort from 1 to 100 (the card's benchmarks use `reasoning_effort=100`). DeepSeek's own API examples still pass a named level such as `"high"`.
- **Prompt format:** there is no Jinja chat template. DeepSeek ships a Python reference encoder in the repository and **`deepseek-recipe`**, a Rust toolkit with Python bindings that converts Messages, Chat Completions and Responses API requests into the V4/V4.1 prompt format. Self-hosters need one of the two.

DeepSeek's changelog lists vendor-reported scores including GPQA Diamond 90.9, Terminal-Bench 2.1 90.6 and DeepSWE v1.1 74.2. Treat these as DeepSeek's own numbers until independent evaluations appear.

### What happened to V4-Flash and V4-Pro

With the V4.1-Flash launch, **V4-Flash (0731) and V4-Flash-Vision-Exp were retired**. For compatibility, the old ids `deepseek-v4-flash` and `deepseek-v4-flash-vision-exp` are **temporarily routed to V4.1-Flash and billed at the Flash price**. DeepSeek calls this temporary, so move code to `deepseek-flash` now.

**V4-Pro is not affected.** DeepSeek's changelog says that "in response to user demand" it will continue providing API services for DeepSeek V4 Pro after 14 September 2026, with billing unchanged. `deepseek-v4-pro` still serves V4-Pro-0813. Some secondary outlets reported before the launch that V4-Pro requests would be routed to V4.1-Flash; that did not happen. Note that V4-Pro has **no image input**, so image work must go to `deepseek-flash`.

Hugging Face lists the V4-Pro-0813 repository at 1.7 trillion parameters, roughly 893 GB of weights. The model card does not state an active-parameter count, and secondary sources disagree (48B to 49B), so treat any active figure you see as unconfirmed.

Two changes are worth internalising if you last looked at DeepSeek in 2025:

- **Reasoning is a parameter, not a model.** There is no separate reasoning line. Both API models support thinking (the default) and non-thinking modes, and accept a `reasoning_effort` value. Choosing between Pro and Flash is a capability and cost decision, not a reasoning decision.
- **DeepSeek is no longer text-only.** V4.1-Flash is natively multimodal and supports vision on the API. It replaces the experimental V4-Flash-Vision-Exp (21 August 2026), which was the family's first image-input model.

Alongside the models, DeepSeek published **DeepSeek Harness** (`dsh`) on 2026-08-13, an MIT-licensed open-source agent runtime built on the Cordis framework where, in DeepSeek's framing, everything is a plugin. It is a v0.1 developer preview, but it means DeepSeek now ships agent tooling of its own rather than leaving that entirely to third parties.

## How to access it and typical use

You can reach DeepSeek four ways, depending on how much control you need.

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Path 1</span>
    <span class="bz-flow-step-name">Web and app</span>
    <span class="bz-flow-step-desc">Use the DeepSeek chat interface at chat.deepseek.com or the mobile app for quick, no-setup conversations.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Path 2</span>
    <span class="bz-flow-step-name">Hosted API</span>
    <span class="bz-flow-step-desc">Call the DeepSeek API. The endpoint is compatible with the OpenAI and Anthropic formats, so existing client code often works with a base-URL swap.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Path 3</span>
    <span class="bz-flow-step-name">Third-party host</span>
    <span class="bz-flow-step-desc">Run the open weights through an inference provider that serves DeepSeek models, when you want a managed endpoint outside DeepSeek.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Path 4</span>
    <span class="bz-flow-step-name">Self-host</span>
    <span class="bz-flow-step-desc">Download the MIT-licensed weights and serve them on your own GPUs for full data control and no per-token fees.</span>
  </div>
</div>

For the hosted API, use the current ids: `deepseek-flash` and `deepseek-v4-pro`. The legacy `deepseek-v4-flash` and `deepseek-v4-flash-vision-exp` names are temporarily routed to V4.1-Flash, and the older `deepseek-chat` and `deepseek-reasoner` names no longer resolve, so code copied from older tutorials will fail. Because the API follows the OpenAI-compatible convention, you point an existing OpenAI SDK at DeepSeek's base URL and set the model name; V4 also supports the OpenAI Responses API natively.

```python
from openai import OpenAI

client = OpenAI(
    base_url="https://api.deepseek.com",
    api_key="YOUR_DEEPSEEK_API_KEY",
)

response = client.chat.completions.create(
    model="deepseek-flash",
    messages=[
        {"role": "system", "content": "You are a concise technical assistant."},
        {"role": "user", "content": "Explain Mixture-of-Experts in two sentences."},
    ],
)
print(response.choices[0].message.content)
```

For a reasoning task, keep the model you were using and raise the reasoning effort. Both API models reason; the parameter controls how much thinking it does before answering.

```python
response = client.chat.completions.create(
    model="deepseek-v4-pro",
    messages=[
        {"role": "user", "content": "A train leaves at 14:05 and arrives at 17:20. How long is the trip?"},
    ],
    reasoning_effort="high",
    extra_body={"thinking": {"type": "enabled"}},
)
print(response.choices[0].message.content)
```

Typical use cases include self-hosted chat assistants where data cannot leave your network, cost-sensitive batch processing over large document sets, coding and reasoning tasks, and research where you need to inspect or fine-tune the actual weights. Verify current model names, context limits, and rates against the official documentation before you build, because DeepSeek deprecates and renames models over time.

## Pricing and the peak/off-peak model

DeepSeek's reputation was built on very low flat rates, and that is no longer how it bills. On 16 August 2026 at 16:00 UTC DeepSeek raised prices and moved to **peak/off-peak billing**. Peak hours are **01:00-04:00 and 06:00-10:00 UTC, Monday to Friday**; everything else is off-peak, charged at half the peak rate. Since the V4.1-Flash launch the pricing page also states that **Chinese public holidays are off-peak in full**, including hours that would otherwise fall in a peak window. (China's National Day holiday in early October is the next one to plan around.)

With V4.1-Flash, DeepSeek cut Flash prices on 10 September 2026. V4-Pro prices did not change.

Prices in USD per 1M tokens, shown as off-peak / peak:

| Model | Input (cache hit) | Input (cache miss) | Output |
|---|---|---|---|
| `deepseek-flash` (V4.1-Flash; also legacy Flash aliases) | **$0.003 / $0.006** | **$0.15 / $0.30** | **$0.60 / $1.20** |
| `deepseek-v4-pro` | $0.022 / $0.044 | $0.66 / $1.32 | $1.98 / $3.96 |
| Previous V4-Flash rate (16 Aug to 10 Sep 2026) | $0.007 / $0.014 | $0.22 / $0.44 | $0.66 / $1.32 |

The Flash cut is largest on cached input (down by more than half) and smallest on output (about 9%). V4.1-Flash also carries a concurrency limit of 2,500, against 500 for V4-Pro.

For context, the August increase was substantial. DeepSeek's own before-and-after comparison is published as an image that machine readers cannot parse, but Engadget and Quartz both reported the previous flat output rates as $0.28 per 1M for V4-Flash and $0.87 per 1M for V4-Pro. Those flat rates were themselves a promotional discount, originally due to expire on 31 May 2026, that DeepSeek made permanent on 23 May 2026 and then reversed. Even after the September cut, V4.1-Flash output at peak costs more than four times the old flat V4-Flash rate.

The structural change matters more than the numbers. Scheduling is now a real cost lever on DeepSeek: moving batch work outside the two peak windows halves the bill, and prompt caching is worth roughly fifty times on input tokens for Flash. Design for both if DeepSeek is your cost play, and re-check the [pricing page](https://api-docs.deepseek.com/quick_start/pricing) before you commit to a budget.

### Third-party availability

V4.1-Flash reached other platforms within a week of launch: **Alibaba Cloud Model Studio** added `deepseek-v4.1-flash` on 13 September 2026 (see [Alibaba Model Studio](/tools/alibaba-model-studio/)), **[Fireworks AI](/tools/fireworks-ai/)** on 14 September, and **NVIDIA** published an NVFP4 quantization, `nvidia/DeepSeek-V4.1-Flash-NVFP4`, on 16 September (see [NVIDIA AI](/tools/nvidia-ai/)). Third-party hosts set their own prices and do not follow DeepSeek's peak/off-peak schedule unless they say so.

## How DeepSeek compares to other open-weight families

DeepSeek competes with other labs that publish open weights rather than closed labs that only sell API access.

| | DeepSeek | Alibaba Qwen | Meta Llama | Mistral AI |
|---|---|---|---|---|
| **Origin** | Hangzhou, China | Alibaba, China | Meta, USA | Paris, France |
| **Weights** | Open, MIT licence across the V4 and V4.1 lines | Open, but bespoke licences at the flagship tier | Open, community licence | Mix of open and commercial |
| **Design focus** | Efficiency, reasoning, MoE | Broad multilingual range | Broad ecosystem support | European open models |
| **Reasoning line** | No separate line; `reasoning_effort` per request | Thinking mode built into Qwen3.x | Yes | Yes |
| **Best for** | Cost-efficient self-hosting | Multilingual and Chinese | Widest tooling support | EU data residency |

The licence column is the one to read twice. Through July and August 2026, bespoke revenue-gated licences became the norm across Chinese open-weight releases: the Qwen3.8-Max License, Qwen Community License 1.0, the Kimi K3 License, the GLM-5.3 License, and the MiniMax Community License all attach conditions tied to revenue or monthly active users. DeepSeek's V4 and V4.1 lines, Qwen3.8-27B (Apache 2.0), and GLM-5.3-Flash (MIT) are the current exceptions. If you are clearing a model through procurement, DeepSeek is the least complicated of the frontier Chinese options.

DeepSeek's other distinguishing trait is its stated emphasis on doing more with less compute. The company has publicly claimed it trained its V3 model for roughly US$6 million (about 5.5 million euro), a figure it contrasts with far larger reported budgets at other labs. Treat that number as a company claim rather than an independently audited fact. For a broader map of where these families sit, see the [LLM landscape for 2026](/comparisons/llm-landscape-2026/) and the [Qwen page](/tools/alibaba-qwen/).

## When not to use it

DeepSeek is not the right pick for every team.

- **Strict data-sovereignty or regulatory constraints.** DeepSeek is a China-based company and its hosted service processes data on its infrastructure. If your policy forbids sending data to that jurisdiction, either self-host the open weights on hardware you control or choose a provider in your region.
- **You need a single vendor with enterprise support and indemnity.** Managed platforms like [Amazon Bedrock](/tools/amazon-bedrock/) or [Azure OpenAI](/tools/azure-openai/) bundle support, compliance attestations, and billing that some organisations require.
- **You need a mature agent ecosystem today.** DeepSeek Harness is real but it is a v0.1 developer preview released in August 2026. [Claude](/tools/claude-anthropic/) and comparable closed models ship agent frameworks and integrations with years of production use behind them. Compare tradeoffs in [Claude vs ChatGPT](/comparisons/claude-vs-chatgpt/).
- **You need broad multimodality.** V4.1-Flash accepts images, but V4-Pro does not, and there is no audio or video input and no image generation.
- **You lack the hardware to self-host large MoE models.** The efficiency gain is relative. V4-Pro-0813 is roughly 893 GB of weights, well past a single 8-GPU node, so self-hosting the flagship is out of reach for most teams. V4.1-Flash is smaller in backbone terms (552B plus 196B of Engram memory) and has community quantizations such as NVIDIA's NVFP4 build, but it still needs a multi-GPU server and DeepSeek's own prompt-format tooling.
- **You are budgeting on 2025 prices.** The August 2026 rise and the September 2026 Flash cut mean any DeepSeek cost model older than a few weeks is wrong.

## Further reading

- [What is a large language model?](/glossary/llm/): the model class DeepSeek builds and releases.
- [What are foundation models?](/glossary/foundation-models/): why open weights matter for teams that fine-tune.
- [What is inference?](/glossary/inference/): the runtime cost that Mixture-of-Experts is designed to cut.
- [Alibaba Qwen](/tools/alibaba-qwen/): another major open-weight family to compare against DeepSeek.
- [The LLM landscape in 2026](/comparisons/llm-landscape-2026/): where DeepSeek fits among open and closed labs.
- [DeepSeek official site](https://www.deepseek.com/): product pages, model list, and links to weights and API.
- [DeepSeek API documentation](https://api-docs.deepseek.com/): current model names, endpoints, and compatibility notes.

## Sources

- DeepSeek official site: https://www.deepseek.com/
- DeepSeek API, "Models & Pricing" (`deepseek-flash` and `deepseek-v4-pro`, legacy alias routing, off-peak/peak prices, Chinese public holiday rule; accessed 25 September 2026): https://api-docs.deepseek.com/quick_start/pricing
- DeepSeek API changelog, "DeepSeek-V4.1-Flash Release" (10 September 2026: V4-Flash and V4-Flash-Vision-Exp retired, V4-Pro continued with billing unchanged; also V4 launch, V4-Flash, V4-Pro GA, vision preview): https://api-docs.deepseek.com/updates
- DeepSeek-V4.1-Flash model card (10 September 2026; MIT licence, 552B backbone, 8B/16B active, Engram memory, CSA2, FP4 KV cache, 45T tokens, reasoning effort 1-100, deepseek-recipe): https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash
- Alibaba Cloud Model Studio, newly released models (`deepseek-v4.1-flash`, 13 September 2026): https://www.alibabacloud.com/help/en/model-studio/newly-released-models
- NVIDIA DeepSeek-V4.1-Flash-NVFP4 (16 September 2026): https://huggingface.co/nvidia/DeepSeek-V4.1-Flash-NVFP4
- DeepSeek V4-Pro release note (GA 2026-08-13, reasoning-effort levels, pricing effective 16:00 UTC 2026-08-16): https://api-docs.deepseek.com/news/news260813
- DeepSeek-V4-Pro-0813 model card (MIT licence, `reasoning_effort`, 384K recommended max output): https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro-0813
- DeepSeek-V4-Flash-Vision-Exp model card (MIT licence, image-text-to-text): https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-Vision-Exp
- DeepSeek on Hugging Face (checkpoint sizes and dates): https://huggingface.co/deepseek-ai
- Engadget on the August 2026 price rise (previous flat rates and promotional history, secondary source): https://www.engadget.com/2236912/deepseek-ai-models-get-four-times-pricier/
- The New Stack on DeepSeek Harness (MIT-licensed plugin-based agent runtime): https://thenewstack.io/deepseek-harness-open-source-plugins/
- The Register, summarising the Financial Times reporting on the R2 delay and the failed Huawei Ascend training run (secondary source): https://www.theregister.com/software/2025/08/14/dodgy-huawei-chips-nearly-sunk-deepseeks-next-gen-r2-mode/753616
- DeepSeek on Wikipedia (founding, structure, model releases, licence): https://en.wikipedia.org/wiki/DeepSeek
