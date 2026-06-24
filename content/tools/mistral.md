---
title: "Mistral AI"
description: "European LLM provider with open-weight models and a commercial API. Strong multilingual performance, competitive pricing, and EU data residency options."
date: 2026-06-22
tags: ["llm", "mistral", "open-source", "european-ai", "api", "multilingual"]
tool_category: "AI"
---

<figure class="bz-figure">
  <img src="/img/dark-cherry/prism-precision.png" alt="Black prism refracting a red laser beam into a precise spectrum: Mistral AI transforms raw text into structured, high-quality language outputs." loading="lazy">
  <figcaption>Like a prism that splits light into its precise components, Mistral models decompose language tasks into efficient, targeted outputs without wasting compute.</figcaption>
</figure>

Mistral AI is a Paris-based AI company founded in 2023 that builds and operates large language models. It offers open-weight models you can run yourself and a commercial API called la Plateforme. Mistral has become the default choice for teams that need a capable frontier LLM with EU data residency, strong French and German language performance, and transparent, Apache 2.0 licensing on its open models.

<div class="bz-arch">
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Models</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Mistral Large 2</span>
      <span class="bz-arch-chip">Mistral Small 3.2</span>
      <span class="bz-arch-chip">Codestral</span>
      <span class="bz-arch-chip">Mistral NeMo 12B</span>
      <span class="bz-arch-chip-note">Open-weight: NeMo, 7B, Mixtral 8x7B released under Apache 2.0</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Access</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">la Plateforme API</span>
      <span class="bz-arch-chip">le Chat (Consumer)</span>
      <span class="bz-arch-chip">Azure AI Foundry</span>
      <span class="bz-arch-chip">AWS Bedrock</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Self-host</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Ollama</span>
      <span class="bz-arch-chip">vLLM</span>
      <span class="bz-arch-chip">Hugging Face</span>
      <span class="bz-arch-chip-note">Open-weight models run on a single A100 or Apple M2 Max</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Specialised</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Codestral (code)</span>
      <span class="bz-arch-chip">Mistral Embed</span>
      <span class="bz-arch-chip">Mistral Moderation</span>
    </div>
  </div>
</div>

## Installation

Mistral's API is OpenAI-compatible. Use the official SDK or the `openai` package with a base URL override.

```bash
pip install mistralai
```

```python
from mistralai import Mistral

client = Mistral(api_key="YOUR_MISTRAL_API_KEY")

response = client.chat.complete(
    model="mistral-large-latest",
    messages=[{"role": "user", "content": "Summarise the EU AI Act in three bullet points."}]
)
print(response.choices[0].message.content)
```

Via the `openai` SDK (drop-in replacement):

```python
from openai import OpenAI

client = OpenAI(
    api_key="YOUR_MISTRAL_API_KEY",
    base_url="https://api.mistral.ai/v1"
)

chat = client.chat.completions.create(
    model="mistral-small-latest",
    messages=[{"role": "user", "content": "What is RAG?"}]
)
```

## Function calling

Mistral supports OpenAI-compatible function calling on all large models.

```python
import json
from mistralai import Mistral

client = Mistral(api_key="YOUR_MISTRAL_API_KEY")

tools = [
    {
        "type": "function",
        "function": {
            "name": "get_company_info",
            "description": "Return firmenbuch (company register) data for an Austrian company.",
            "parameters": {
                "type": "object",
                "properties": {
                    "company_name": {"type": "string", "description": "Legal name of the company"},
                    "country": {"type": "string", "enum": ["AT", "DE", "CH"]}
                },
                "required": ["company_name", "country"]
            }
        }
    }
]

response = client.chat.complete(
    model="mistral-large-latest",
    messages=[{"role": "user", "content": "Look up Erste Bank AG in Austria."}],
    tools=tools,
    tool_choice="auto"
)

tool_call = response.choices[0].message.tool_calls[0]
args = json.loads(tool_call.function.arguments)
print(args)  # {'company_name': 'Erste Bank AG', 'country': 'AT'}
```

## Codestral for code generation

Codestral is a 22B model trained specifically on code, with a 256K context window. It supports 80+ programming languages and is available under a separate commercial licence.

```python
client = Mistral(api_key="YOUR_MISTRAL_API_KEY")

response = client.chat.complete(
    model="codestral-latest",
    messages=[
        {
            "role": "user",
            "content": "Write a FastAPI endpoint that accepts a PDF and returns extracted text using AWS Textract."
        }
    ]
)
print(response.choices[0].message.content)
```

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 1</span>
    <span class="bz-flow-step-name">Choose model tier</span>
    <span class="bz-flow-step-desc">Mistral Small for high-volume, cost-sensitive tasks. Large for complex reasoning and long context.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 2</span>
    <span class="bz-flow-step-name">Select access route</span>
    <span class="bz-flow-step-desc">la Plateforme for direct API, Azure AI Foundry for Microsoft compliance envelope, Bedrock for AWS VPC.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 3</span>
    <span class="bz-flow-step-name">Integrate</span>
    <span class="bz-flow-step-desc">OpenAI-compatible. Swap base URL; existing code works without refactoring.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 4</span>
    <span class="bz-flow-step-name">Monitor costs</span>
    <span class="bz-flow-step-desc">Set budget alerts on la Plateforme dashboard. Mistral Small is 10-20x cheaper than Large for the same prompt.</span>
  </div>
</div>

## Pricing (la Plateforme, as of June 2026)

| Model | Input per 1M tokens | Output per 1M tokens |
|---|---|---|
| **Mistral Small 3.2** | €0.10 | €0.30 |
| **Mistral Large 2** | €2.00 | €6.00 |
| **Codestral** | €0.20 | €0.60 |
| **Mistral NeMo 12B** | €0.10 | €0.30 |
| **Mistral Embed** | €0.10 | n/a |

## Comparison with alternatives

| | Mistral Large 2 | GPT-4o | Claude Sonnet 4.6 | Llama 3.3 70B |
|---|---|---|---|---|
| **Data residency** | EU (Paris) | US | US | Self-host or US |
| **Open weight** | No | No | No | Yes (Apache 2.0) |
| **Languages** | 12 (strong FR/DE) | 50+ | 10+ | 50+ |
| **Context window** | 128K | 128K | 200K | 128K |
| **Price (input/1M)** | €2.00 | ~€4.50 | ~€3.00 | ~€0.80 |
| **GDPR DPA** | Yes (EU entity) | SCCs required | SCCs required | Self-host |
| **Best for** | EU-regulated enterprise | General purpose | Long documents | Cost-sensitive |

## When not to use Mistral

**Very long documents**: Mistral Large 2 tops out at 128K tokens. If you need 500K+ context, use Gemini 2.0 or Claude claude-opus-4-8 with their 1-2M windows.

**Computer vision**: Mistral has no multimodal image input in the current API. Use GPT-4o or Gemini 2.0 Flash for image understanding.

**Highly specific fine-tuning at scale**: Mistral does offer fine-tuning, but Llama 3 gives you more control over training data and infrastructure at volume.

**English-only consumer apps**: If your users are English-only and price is not a primary concern, GPT-4o or Claude have marginally better benchmark results on pure English tasks.

## Further reading

- [la Plateforme documentation](https://docs.mistral.ai/): API reference, model cards, rate limits
- [Mistral model overview](https://mistral.ai/technology/): Benchmark results and architecture notes for each model
- [Mistralai Python SDK on PyPI](https://pypi.org/project/mistralai/): Package source and changelog
- [Codestral licence](https://mistral.ai/licenses/MNPL-0.1.md): Commercial licence terms for code models
- [LLM Landscape 2026](/comparisons/llm-landscape-2026/): Full comparison of all major LLM providers
- [Building RAG Systems](/guides/building-rag-systems/): How to build a retrieval-augmented generation pipeline with any LLM provider
- [LLM Gateway Architecture](/guides/llm-gateway-architecture/): Route between Mistral, OpenAI, and Anthropic with fallback logic
