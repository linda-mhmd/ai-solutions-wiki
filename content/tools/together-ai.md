---
title: "Together AI"
description: "Together AI is a cloud platform for running, fine-tuning, and serving open-weight models through an API, backed by GPU clusters."
date: 2026-06-29
tags: ["inference", "open-weight-models", "fine-tuning", "gpu-cloud"]
tool_category: "AI"
related:
  - glossary/inference
  - glossary/fine-tuning
  - glossary/foundation-models
  - tools/fireworks-ai
  - tools/amazon-bedrock
  - comparisons/llm-landscape-2026
---

<figure class="bz-figure">
  <img src="/img/rapid-ai/microservices-platforms-purple-notext.png" alt="Floating interconnected purple and teal nodes, representing a platform serving many open models." loading="lazy">
  <figcaption>Together AI serves hundreds of open-weight models behind one API, so you switch models without switching vendors.</figcaption>
</figure>

Together AI is a cloud platform for running, fine-tuning, and serving open-weight models through an API. It solves a specific problem: open models like Llama, Qwen, DeepSeek, and Mixtral are free to download, but standing up your own GPU servers to serve them at production speed and scale is hard. Together AI hosts those models for you, exposes them through an OpenAI-compatible API, and also rents GPU clusters when you need dedicated capacity. The company describes itself as an "AI native cloud" and was founded in 2022.

## Where it sits in the stack

Together AI occupies the layer between raw GPU hardware and your application code. You send a prompt to its API and get [inference](/glossary/inference/) back, without managing servers.

<div class="bz-arch">
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Your application</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Chatbot</span>
      <span class="bz-arch-chip">Agent</span>
      <span class="bz-arch-chip">RAG pipeline</span>
      <span class="bz-arch-chip-note">Calls an OpenAI-compatible endpoint</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Together AI platform</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Serverless inference</span>
      <span class="bz-arch-chip">Batch inference</span>
      <span class="bz-arch-chip">Fine-tuning</span>
      <span class="bz-arch-chip">Dedicated endpoints</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Model catalog</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Llama</span>
      <span class="bz-arch-chip">Qwen</span>
      <span class="bz-arch-chip">DeepSeek</span>
      <span class="bz-arch-chip">Mixtral</span>
      <span class="bz-arch-chip-note">Open-weight foundation models</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Compute</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">GPU clusters</span>
      <span class="bz-arch-chip">Managed storage</span>
      <span class="bz-arch-chip-note">NVIDIA GPUs, including B200 class</span>
    </div>
  </div>
</div>

## How to access it and typical use

You use Together AI through its API, not a local install. Create an account, generate an API key, and call the endpoint. The API is OpenAI-compatible, so if your code already targets OpenAI, you point it at Together and change the model name.

A typical inference request against a hosted open model looks like this:

```python
from together import Together

client = Together(api_key="YOUR_API_KEY")

response = client.chat.completions.create(
    model="meta-llama/Llama-3.3-70B-Instruct-Turbo",
    messages=[
        {"role": "user", "content": "Summarize this support ticket in one line."}
    ],
)
print(response.choices[0].message.content)
```

Because the API follows the OpenAI schema, you can also use the OpenAI SDK and change only the base URL and model:

```python
from openai import OpenAI

client = OpenAI(
    api_key="YOUR_TOGETHER_API_KEY",
    base_url="https://api.together.xyz/v1",
)

response = client.chat.completions.create(
    model="Qwen/Qwen2.5-72B-Instruct-Turbo",
    messages=[{"role": "user", "content": "Write a SQL query for monthly active users."}],
)
print(response.choices[0].message.content)
```

Beyond serverless calls, the platform runs three other workloads. Batch inference handles large asynchronous jobs where latency does not matter. [Fine-tuning](/glossary/fine-tuning/) lets you adapt an open model to your data using LoRA or full-parameter training, then deploy the result. GPU clusters give you dedicated NVIDIA capacity when you need reserved compute rather than shared serverless endpoints.

The workflow for a custom model runs end to end on the platform:

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 1</span>
    <span class="bz-flow-step-name">Pick a base model</span>
    <span class="bz-flow-step-desc">Choose an open-weight model from the catalog.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 2</span>
    <span class="bz-flow-step-name">Fine-tune</span>
    <span class="bz-flow-step-desc">Upload your dataset and run a training job.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 3</span>
    <span class="bz-flow-step-name">Deploy</span>
    <span class="bz-flow-step-desc">Serve the tuned model on a dedicated or serverless endpoint.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 4</span>
    <span class="bz-flow-step-name">Call the API</span>
    <span class="bz-flow-step-desc">Your app sends requests and receives completions.</span>
  </div>
</div>

Together AI's niche is open-model serving. Anthropic and OpenAI serve their own proprietary models. Together serves the models anyone can download, which matters when you want to avoid lock-in, run a model you fine-tuned yourself, or move workloads between providers.

## How it compares

The open-model inference space includes several specialized providers plus the hyperscaler model APIs. The table below compares Together AI with two other open-model specialists and one hyperscaler managed service.

| | Together AI | [Fireworks AI](/tools/fireworks-ai/) | Groq | [Amazon Bedrock](/tools/amazon-bedrock/) |
|---|---|---|---|---|
| **Focus** | Open models, tuning, clusters | Open-model serving | Fast open-model serving | Managed model marketplace |
| **API style** | OpenAI-compatible | OpenAI-compatible | OpenAI-compatible | AWS SDK |
| **Fine-tuning** | Yes, LoRA and full | Yes | No | Some models |
| **Own GPU clusters** | Yes | Limited | Custom hardware | Runs on AWS |
| **Best for** | Open-model teams | Open-model apps | Low-latency serving | AWS-native teams |

## When not to use it

Together AI is not the right fit in a few cases.

- **You want a specific proprietary model.** If your app depends on Claude or GPT, use the vendor directly. See the [Claude and Anthropic tool page](/tools/claude-anthropic/) or [Azure OpenAI](/tools/azure-openai/).
- **You are locked into one cloud's ecosystem.** If your data, IAM, and billing all live in AWS, a managed marketplace like Amazon Bedrock may reduce integration work.
- **You need only a handful of calls.** For tiny hobby projects, running a small model locally can be cheaper and simpler than any hosted API.
- **You require on-premise deployment.** A hosted API sends data to Together's cloud. Regulated workloads that cannot leave your own network need a self-hosted stack instead.

## Further reading

- [What is inference?](/glossary/inference/): how models turn a prompt into an output, and why serving speed matters.
- [What is fine-tuning?](/glossary/fine-tuning/): adapting an open model to your own data.
- [What are foundation models?](/glossary/foundation-models/): the large pretrained models that providers like Together serve.
- [Fireworks AI](/tools/fireworks-ai/): another open-model inference provider to compare against.
- [The LLM landscape in 2026](/comparisons/llm-landscape-2026/): where open-model clouds fit among the major providers.
- [Together AI official site](https://www.together.ai/): product pages for inference, fine-tuning, and GPU clusters.
- [Together AI products](https://www.together.ai/products): the full list of platform offerings.

## Sources

- [Together AI - home](https://www.together.ai/)
- [Together AI - products](https://www.together.ai/products)
- [Together AI - serverless inference](https://www.together.ai/serverless-inference)
- [Together AI - fine-tuning](https://www.together.ai/fine-tuning)
- [Together AI - pricing](https://www.together.ai/pricing)
