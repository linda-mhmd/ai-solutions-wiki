---
title: "What is Fine-tuning?"
description: "Fine-tuning adapts a pre-trained AI model to a specific task or domain using your own data. When it makes sense, what it costs, and when prompt engineering is better."
date: 2026-06-22
level: 2
categories: [Basics]
tags: ["fine-tuning", "lora", "llm", "model-training", "custom-model", "ai-basics"]
docs: "https://platform.openai.com/docs/guides/fine-tuning"
docs_label: "OpenAI Fine-tuning Guide"
faqs:
  - question: "What is the difference between fine-tuning and prompt engineering?"
    answer: "Prompt engineering shapes the model's output through instructions in the prompt. Fine-tuning changes the model's weights (parameters) so it permanently behaves differently. Prompt engineering is fast and cheap but requires the instructions every time. Fine-tuning is expensive and slow upfront but produces a model that has internalized the behavior, runs faster at inference time, and does not need lengthy instructions in every prompt. Try prompt engineering first; fine-tune only if the quality ceiling with prompts is insufficient."
  - question: "How much data do I need to fine-tune a model?"
    answer: "For instruction fine-tuning of a large model, 100-1,000 high-quality examples often produce meaningful improvement. For domain adaptation (teaching the model a technical domain), you may need 10,000+ examples. For fine-tuning a small model from scratch for a narrow task, 50-200 well-curated examples can be enough. Data quality matters far more than quantity: 100 perfect examples beat 10,000 noisy ones."
  - question: "How expensive is fine-tuning?"
    answer: "API fine-tuning (e.g., OpenAI): typically €0.008-€0.025 per 1,000 training tokens, so fine-tuning on 100,000 tokens costs roughly €1-3. LoRA fine-tuning on a rented A100 GPU (€2-4/hour): a 1-hour training run costs about €2-4. Full fine-tuning of a 70B model on 8 A100s for 24 hours: roughly €400-800. The main cost is often not training but the data preparation: labelling 1,000 examples takes significant human time."
  - question: "What is LoRA and why does everyone use it?"
    answer: "LoRA (Low-Rank Adaptation) trains only a small set of additional parameters rather than updating all of the original model's billions of weights. This makes fine-tuning 10-100x cheaper and faster while achieving comparable results. A LoRA adapter is a small file (a few hundred MB) that you apply on top of a base model at inference time. Multiple LoRA adapters can be trained for different tasks and swapped without reloading the full model."
  - question: "Can I fine-tune ChatGPT or Claude?"
    answer: "You can fine-tune some OpenAI models (GPT-4o mini, GPT-3.5 Turbo) via their API. Anthropic does not currently offer public fine-tuning for Claude models (as of June 2026). For open-weight models (Llama 3, Mistral, Phi-3), you can fine-tune on your own infrastructure or via cloud providers including AWS Bedrock and Hugging Face."
---

{{< quickanswer >}}
Fine-tuning is the process of taking a pre-trained AI model and continuing to train it on a smaller, task-specific dataset so it performs better on your particular use case. Instead of training a model from scratch (which costs millions of euros), you take an existing model that already understands language or images, then teach it the specific style, terminology, or decision patterns you need. Fine-tuning changes the model permanently; prompt engineering does not.
{{< /quickanswer >}}

<figure class="bz-figure">
  <img src="/img/obsidian-lab/loom-red-thread-notext.png" alt="Dark industrial loom with a single red thread being guided through complex machinery: fine-tuning threads specialised knowledge through the structure of a pre-trained model." loading="lazy">
  <figcaption>Fine-tuning threads a specific dataset through a pre-existing model structure: the loom (the model) remains the same; the thread (your data) defines the final pattern.</figcaption>
</figure>

## The problem fine-tuning solves

A pre-trained model like GPT-4o or Llama 3 is trained on general internet data. It can write in many styles, discuss many topics, and answer many types of questions. But it does not know:

- Your company's internal terminology
- The exact output format your system expects
- The tone of voice your brand uses
- The regulatory constraints specific to your industry
- Domain-specific concepts that are underrepresented in public training data

You can address some of these with prompt engineering: add instructions to every prompt. But for complex domains, long instruction lists inflate costs and still produce inconsistent results.

Fine-tuning bakes the knowledge or behaviour into the model itself, so you do not need to explain it every time.

## Prompt engineering vs fine-tuning

| | Prompt engineering | Fine-tuning |
|---|---|---|
| **Setup time** | Minutes to hours | Days to weeks |
| **Setup cost** | €0 | €2 to €10,000+ |
| **Inference cost** | Higher (long prompts cost more) | Lower (shorter prompts needed) |
| **Consistency** | Variable | High |
| **Data required** | None | 50 to 100,000+ examples |
| **Model ownership** | No | Yes (if self-hosted) |
| **Best for** | Exploratory, general tasks | High-volume, specialised tasks |

**Rule of thumb**: spend one week on prompt engineering first. If quality is still insufficient after exhausting prompt techniques, evaluate fine-tuning.

## Types of fine-tuning

<div class="bz-arch">
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Instruction fine-tuning</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Format: prompt + ideal response pairs</span>
      <span class="bz-arch-chip">Goal: teach the model a specific output style or behaviour</span>
      <span class="bz-arch-chip-note">Example: 500 examples of customer emails paired with ideal support responses in your company's tone</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Domain adaptation</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Format: large corpus of domain text (continued pre-training)</span>
      <span class="bz-arch-chip">Goal: add specialised vocabulary and concepts</span>
      <span class="bz-arch-chip-note">Example: training a model on 50,000 medical case notes so it understands clinical language</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">LoRA / parameter-efficient fine-tuning</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Trains small adapter, not full model</span>
      <span class="bz-arch-chip">10-100x cheaper than full fine-tuning</span>
      <span class="bz-arch-chip-note">Used for: style transfer, task-specific adapters, image generation with custom subject (DreamBooth)</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">RLHF (reinforcement learning from human feedback)</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Human raters rank responses</span>
      <span class="bz-arch-chip">Reward model trained on rankings</span>
      <span class="bz-arch-chip">Base model trained to maximise reward</span>
      <span class="bz-arch-chip-note">Used by OpenAI, Anthropic, and Google to align base models to human preferences</span>
    </div>
  </div>
</div>

## The fine-tuning workflow

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 1</span>
    <span class="bz-flow-step-name">Prepare training data</span>
    <span class="bz-flow-step-desc">Curate high-quality examples: input/output pairs or domain documents. More time spent here directly improves model quality.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 2</span>
    <span class="bz-flow-step-name">Format the data</span>
    <span class="bz-flow-step-desc">Convert to the required format. For instruction fine-tuning, this is typically JSONL with system/user/assistant messages.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 3</span>
    <span class="bz-flow-step-name">Run the training job</span>
    <span class="bz-flow-step-desc">Upload data to the API or run on rented GPU infrastructure. Training takes minutes (API, small dataset) to days (large open-weight model).</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 4</span>
    <span class="bz-flow-step-name">Evaluate and deploy</span>
    <span class="bz-flow-step-desc">Test on a held-out set of examples. Compare accuracy, format consistency, and cost against the baseline prompt-engineered approach. Deploy if quality meets the bar.</span>
  </div>
</div>

## Fine-tuning with the OpenAI API

```bash
pip install openai
```

```python
import json
from openai import OpenAI

client = OpenAI(api_key="YOUR_API_KEY")

# Training data format: JSONL with messages arrays
training_examples = [
    {
        "messages": [
            {"role": "system", "content": "You are a customer support agent for an Austrian fintech company. Reply in formal German."},
            {"role": "user", "content": "Ich habe eine Frage zu meiner Rechnung."},
            {"role": "assistant", "content": "Guten Tag! Ich helfe Ihnen gerne bei Ihrer Frage zur Rechnung. Bitte teilen Sie mir Ihre Kundennummer mit, damit ich Ihr Konto prüfen kann."}
        ]
    },
    # ... add 99+ more examples
]

# Save as JSONL
with open("training.jsonl", "w") as f:
    for ex in training_examples:
        f.write(json.dumps(ex) + "\n")

# Upload training file
with open("training.jsonl", "rb") as f:
    response = client.files.create(file=f, purpose="fine-tune")
    file_id = response.id

# Start fine-tuning job
job = client.fine_tuning.jobs.create(
    training_file=file_id,
    model="gpt-4o-mini",
)
print(f"Fine-tuning job created: {job.id}")
```

## LoRA fine-tuning with Hugging Face

For open-weight models (Llama 3, Mistral), LoRA is the standard approach:

```python
from transformers import AutoModelForCausalLM, AutoTokenizer
from peft import get_peft_model, LoraConfig, TaskType
import torch

model_name = "meta-llama/Meta-Llama-3-8B-Instruct"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name, torch_dtype=torch.bfloat16)

# Configure LoRA: only train a small adapter
lora_config = LoraConfig(
    task_type=TaskType.CAUSAL_LM,
    r=16,               # rank: higher = more capacity, more memory
    lora_alpha=32,
    target_modules=["q_proj", "v_proj"],  # which layers to adapt
    lora_dropout=0.1,
)

model = get_peft_model(model, lora_config)
model.print_trainable_parameters()
# Output: trainable params: 4,194,304 || all params: 8,034,476,032 || 0.05%
# Only 0.05% of parameters are being trained
```

The LoRA adapter saves as a small file. Apply it to the base model at inference time.

## When not to fine-tune

**The prompt engineering ceiling is not actually reached**: Most companies that think they need fine-tuning have not exhausted prompt engineering. Few-shot examples, structured output formats, and chain-of-thought prompting often get 80% of the quality with 0% of the fine-tuning overhead.

**Your task changes frequently**: Fine-tuned models encode the task into weights. Changing the task requires retraining. For rapidly evolving use cases, prompt engineering stays flexible.

**Your dataset has quality problems**: Fine-tuning amplifies patterns in training data. A model trained on inconsistent or low-quality examples learns to be inconsistent and low-quality.

**You are under EU AI Act obligations**: If your use case falls under the EU AI Act's high-risk categories, a fine-tuned model may trigger documentation, evaluation, and compliance obligations that a prompted model using a compliant third-party API does not.

## What's next

- [What is Machine Learning?](/basics/what-is-machine-learning/): The technical foundation that makes fine-tuning work
- [What is a Large Language Model?](/basics/what-is-an-llm/): Understanding what you are actually fine-tuning
- [Custom ML vs Foundation Models](/comparisons/custom-ml-vs-foundation-models/): When to fine-tune vs build a custom model vs prompt a foundation model
- [MLOps: Getting Started](/guides/mlops-getting-started/): How to manage the lifecycle of fine-tuned models in production

## Further reading

- [OpenAI Fine-tuning Guide](https://platform.openai.com/docs/guides/fine-tuning): Step-by-step with data format specs and pricing
- [Hugging Face PEFT documentation](https://huggingface.co/docs/peft): LoRA, prefix tuning, and other parameter-efficient methods
- [AWS Bedrock Fine-tuning](https://docs.aws.amazon.com/bedrock/latest/userguide/custom-models.html): Managed fine-tuning for Titan, Llama 3, and Mistral models
