---
title: "DeepSeek"
description: "DeepSeek is a Chinese AI lab known for open-weight large language models and a focus on training and inference efficiency."
date: 2026-06-29
tags: ["open-weight", "llm", "reasoning", "mixture-of-experts"]
tool_category: "AI"
related:
  - glossary/llm
  - glossary/foundation-models
  - glossary/inference
  - tools/alibaba-qwen
  - comparisons/llm-landscape-2026
---

<figure class="bz-figure">
  <img src="/img/dark-cherry/vortex-complexity.png" alt="A dark spiraling vortex with a red core, representing an efficiency-focused open model lab." loading="lazy">
  <figcaption>DeepSeek pushes intelligence out of a tight efficiency budget, then hands the weights back to everyone.</figcaption>
</figure>

DeepSeek is an AI research lab based in Hangzhou, China. It builds [large language models](/glossary/llm/) and releases most of them as open-weight models under a permissive licence. Its positioning rests on two ideas: publish the model weights so anyone can run them, and reach frontier-level quality on a smaller compute budget than the big closed labs. That combination made DeepSeek one of the most-discussed model families of 2025 and 2026.

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
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Models</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">DeepSeek-V4 (Pro, Flash)</span>
      <span class="bz-arch-chip">DeepSeek-V3</span>
      <span class="bz-arch-chip">DeepSeek-R1</span>
      <span class="bz-arch-chip-note">Reasoning and general chat variants, MIT-licensed weights</span>
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

DeepSeek's headline models use a Mixture-of-Experts design. The model holds a large total parameter count, but only a small subset of parameters activates for any given token. That keeps [inference](/glossary/inference/) cost lower than a dense model of the same nominal size. DeepSeek-V3 shipped in December 2024, the reasoning-focused DeepSeek-R1 followed in January 2025, and the DeepSeek-V4 family (V4-Pro and V4-Flash) arrived in 2026. Each of these ships under the MIT licence, so you can download the weights, run them privately, fine-tune them, and use them commercially without a usage fee to DeepSeek.

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

For the hosted API, DeepSeek exposes named models such as `deepseek-v4-pro` and `deepseek-v4-flash`, plus the earlier `deepseek-chat` and `deepseek-reasoner` names that mapped to non-thinking and thinking modes. Because the API follows the OpenAI-compatible convention, you point an existing OpenAI SDK at DeepSeek's base URL and set the model name.

```python
from openai import OpenAI

client = OpenAI(
    base_url="https://api.deepseek.com",
    api_key="YOUR_DEEPSEEK_API_KEY",
)

response = client.chat.completions.create(
    model="deepseek-v4-flash",
    messages=[
        {"role": "system", "content": "You are a concise technical assistant."},
        {"role": "user", "content": "Explain Mixture-of-Experts in two sentences."},
    ],
)
print(response.choices[0].message.content)
```

For a reasoning task, select the reasoning-capable model so the response includes an explicit chain of thought before the final answer.

```python
response = client.chat.completions.create(
    model="deepseek-v4-pro",
    messages=[
        {"role": "user", "content": "A train leaves at 14:05 and arrives at 17:20. How long is the trip?"},
    ],
)
print(response.choices[0].message.content)
```

Typical use cases include self-hosted chat assistants where data cannot leave your network, cost-sensitive batch processing over large document sets, coding and reasoning tasks, and research where you need to inspect or fine-tune the actual weights. Verify current model names, context limits, and rates against the official documentation before you build, because DeepSeek deprecates and renames models over time.

## How DeepSeek compares to other open-weight families

DeepSeek competes with other labs that publish open weights rather than closed labs that only sell API access.

| | DeepSeek | Alibaba Qwen | Meta Llama | Mistral AI |
|---|---|---|---|---|
| **Origin** | Hangzhou, China | Alibaba, China | Meta, USA | Paris, France |
| **Weights** | Open, MIT licence | Open, mostly permissive | Open, community licence | Mix of open and commercial |
| **Design focus** | Efficiency, reasoning, MoE | Broad multilingual range | Broad ecosystem support | European open models |
| **Reasoning line** | R1 and V4 reasoning | Yes | Yes | Yes |
| **Best for** | Cost-efficient self-hosting | Multilingual and Chinese | Widest tooling support | EU data residency |

DeepSeek's distinguishing trait is its stated emphasis on doing more with less compute. The company has publicly claimed it trained its V3 model for roughly US$6 million (about 5.5 million euro), a figure it contrasts with far larger reported budgets at other labs. Treat that number as a company claim rather than an independently audited fact. For a broader map of where these families sit, see the [LLM landscape for 2026](/comparisons/llm-landscape-2026/) and the [Qwen page](/tools/alibaba-qwen/).

## When not to use it

DeepSeek is not the right pick for every team.

- **Strict data-sovereignty or regulatory constraints.** DeepSeek is a China-based company and its hosted service processes data on its infrastructure. If your policy forbids sending data to that jurisdiction, either self-host the open weights on hardware you control or choose a provider in your region.
- **You need a single vendor with enterprise support and indemnity.** Managed platforms like [Amazon Bedrock](/tools/amazon-bedrock/) or [Azure OpenAI](/tools/azure-openai/) bundle support, compliance attestations, and billing that some organisations require.
- **You want the deepest agentic tooling and ecosystem today.** [Claude](/tools/claude-anthropic/) and comparable closed models ship mature agent frameworks and integrations. Compare tradeoffs in [Claude vs ChatGPT](/comparisons/claude-vs-chatgpt/).
- **You lack the hardware to self-host large MoE models.** The efficiency gain is relative. The largest DeepSeek models still need substantial GPU memory, so if you cannot host them and do not want the hosted API, an open weight release alone will not help.

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
- DeepSeek API documentation: https://api-docs.deepseek.com/
- DeepSeek on Wikipedia (founding, structure, model releases, licence): https://en.wikipedia.org/wiki/DeepSeek
