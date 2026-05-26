---
title: "Fine-Tuning LLMs - A Practical Guide"
description: "When and how to fine-tune large language models, covering data preparation, training approaches (full fine-tuning, LoRA, QLoRA), evaluation, and cost considerations."
date: 2026-03-28
categories: [Guides]
tags: [fine-tuning, LLM, training, machine-learning, models]
related:
  - glossary/fine-tuning
  - glossary/lora
  - guides/llm-evaluation-methods
  - guides/building-rag-systems
  - guides/model-registry-guide
  - glossary/transfer-learning
  - glossary/catastrophic-forgetting
---

Fine-tuning adapts a pre-trained language model to a specific task or domain by training it on additional data. It is one of the most misunderstood techniques in applied AI. Teams often fine-tune when prompting would suffice, or skip fine-tuning when it would provide significant improvements. This guide covers when fine-tuning is appropriate, how to do it effectively, and how to avoid common pitfalls.

## When to Fine-Tune (and When Not To)

### Fine-Tune When

**The task requires a specific output format** that prompting cannot reliably produce. If you need the model to consistently output a particular JSON schema, classification label, or structured format, fine-tuning encodes this behavior more reliably than prompting.

**Domain-specific language is critical.** Legal, medical, financial, or technical domains have specialized terminology and reasoning patterns. Fine-tuning on domain data improves the model's fluency and accuracy in these contexts.

**You need consistent behavior at scale.** A fine-tuned model produces more consistent outputs than a prompted model for the same task. When running thousands of predictions, this consistency matters.

**Cost optimization.** A fine-tuned smaller model can match the performance of a larger prompted model for specific tasks, at significantly lower inference cost.

### Do Not Fine-Tune When

**Prompting works well enough.** If prompt engineering with few-shot examples achieves your quality targets, fine-tuning adds unnecessary complexity and cost.

**You lack sufficient data.** Fine-tuning requires hundreds to thousands of high-quality examples. If you have fewer than 100 examples, prompt engineering with few-shot examples is more practical.

**The task changes frequently.** Fine-tuning creates a fixed model. If requirements change weekly, you will need to retrain constantly. Prompting is more adaptable.

**You need the model's full general capability.** Fine-tuning narrows the model's capabilities to the fine-tuning task. A fine-tuned customer service model may lose capability on unrelated tasks.

## Data Preparation

Data quality is the single most important factor in fine-tuning success.

### Dataset Requirements

**Volume.** Minimum 100 examples for simple tasks, 500-1000 for complex tasks, 2000+ for best results. More data generally helps, but quality matters more than quantity.

**Quality.** Every example should be a perfect example of the desired behavior. If you would not accept the output from a human, do not include it in training data. One bad example can teach the model bad habits.

**Diversity.** Cover the full range of inputs and outputs the model will encounter. Include easy cases, hard cases, edge cases, and examples of every category or output type.

**Format.** Most fine-tuning approaches use conversation format: system prompt, user message, assistant response. Match the format to your inference use case.

### Dataset Creation Process

1. **Collect seed examples.** Gather real examples from your application, or have domain experts create them.
2. **Quality review.** Have multiple reviewers verify each example. Remove or correct any that are ambiguous, incorrect, or inconsistent.
3. **Augment if needed.** Use an LLM to generate additional examples, but always have humans verify the generated examples. Never fine-tune on unreviewed synthetic data.
4. **Split into train/validation/test.** Use 80/10/10 or 90/5/5 splits. Never evaluate on training data.

## Fine-Tuning Approaches

### Full Fine-Tuning

Update all model parameters on your dataset. Produces the best results but requires significant compute (GPU hours) and stores a full copy of the model weights.

**When to use:** Large datasets (10K+ examples), significant domain adaptation needed, budget for compute.

### LoRA (Low-Rank Adaptation)

Train small adapter matrices that modify the model's behavior without changing the original weights. Much cheaper than full fine-tuning, with results that are often comparable.

The key insight (Hu et al., 2022): the weight updates ΔW needed to adapt a model to a new task are intrinsically low-rank. Rather than updating the full weight matrix W ∈ ℝ^(d×k), LoRA decomposes the update as ΔW = BA where B ∈ ℝ^(d×r) and A ∈ ℝ^(r×k), with rank r ≪ min(d, k). A 4096×4096 weight matrix has 16.8M parameters; at rank 8, the LoRA adapter has only 65K, a 245× reduction in trainable parameters.

**When to use:** Most fine-tuning use cases. LoRA has become the default approach for practical fine-tuning. Hugging Face's `peft` library provides a standard implementation.

**Key parameters:** Rank (r) controls adapter capacity. Start with r=8 or r=16. Higher rank captures more complex adaptations but costs more and risks overfitting. The `alpha` scaling parameter is typically set to r or 2r.

### QLoRA

Combines LoRA with model quantization (Dettmers et al., 2023). The base model is loaded in 4-bit NormalFloat (NF4) precision using bitsandbytes, reducing memory requirements dramatically. A 65B parameter model that requires ~130GB in full precision fits in ~48GB with QLoRA. Enables fine-tuning large models on consumer GPUs.

**When to use:** When GPU memory is limited. Quality is slightly lower than full LoRA but the cost reduction is substantial. The NF4 data type is specifically designed to minimize quantization error for normally-distributed weights.

## Training Process

### Hyperparameters

**Learning rate.** Start with 1e-5 to 2e-5 for full fine-tuning, 1e-4 to 3e-4 for LoRA. Too high causes catastrophic forgetting; too low produces minimal adaptation.

**Epochs.** 2-5 epochs for most datasets. Monitor validation loss to detect overfitting. Stop when validation loss starts increasing.

**Batch size.** Larger is generally better for training stability. Use the largest batch size that fits in GPU memory, with gradient accumulation if needed.

### Monitoring Training

Track during training:
- Training loss (should decrease steadily)
- Validation loss (should decrease, then plateau; increasing indicates overfitting)
- Learning rate schedule (warmup then decay is standard)

### Common Training Problems

**Catastrophic forgetting.** The model loses general capabilities while learning the fine-tuning task. Reduce learning rate, reduce epochs, or mix general-purpose data into the fine-tuning dataset.

**Overfitting.** The model memorizes training examples but does not generalize. Reduce epochs, add more diverse training data, or increase regularization (dropout, weight decay).

**Mode collapse.** The model produces the same output regardless of input. Usually caused by insufficient data diversity or too many epochs. Add more diverse examples.

## Evaluation

Evaluate fine-tuned models rigorously:

**Compare to baseline.** Always compare against the base model with good prompting. If fine-tuning does not significantly improve over prompting, it is not worth the ongoing maintenance cost.

**Use held-out test data.** Evaluate on examples the model never saw during training. Training set performance is meaningless.

**Evaluate multiple dimensions.** Check not just task accuracy but also output quality, format compliance, and edge case handling.

**Check for regressions.** Test capabilities that the model should retain from pre-training. Fine-tuning should not break general-purpose capabilities unless that is intentional.

## Cost Considerations

**Training cost.** Fine-tuning via API (OpenAI, Bedrock) costs approximately $8–$25 per million training tokens as of early 2026, verify current pricing at provider documentation before budgeting, as these figures change. Self-hosted fine-tuning costs GPU hours ($1–$5/hour for single-GPU on cloud providers, more for multi-GPU).

**Inference cost.** Fine-tuned models are often the same cost to run as base models. The savings come from using a smaller fine-tuned model instead of a larger prompted model.

**Maintenance cost.** Fine-tuned models need periodic retraining as data and requirements change. Budget for quarterly or monthly retraining cycles.

Fine-tuning is a powerful technique when applied to the right problems. The decision to fine-tune should be driven by data: you have enough quality examples, prompting is demonstrably insufficient, and the improvement justifies the ongoing maintenance cost.

## Sources

- Hu, E. J., Shen, Y., Wallis, P., Allen-Zhu, Z., Li, Y., Wang, S., Wang, L., and Chen, W. "LoRA: Low-Rank Adaptation of Large Language Models." *ICLR* (2022). https://arxiv.org/abs/2106.09685, The original LoRA paper. Demonstrates that intrinsic rank of weight updates is low, enabling efficient fine-tuning with adapter matrices.
- Dettmers, T., Pagnoni, A., Holtzman, A., and Zettlemoyer, L. "QLoRA: Efficient Finetuning of Quantized LLMs." *NeurIPS* (2023). https://arxiv.org/abs/2305.14314, Introduces NF4 quantization and the double quantization technique that enables fine-tuning 65B models on a single 48GB GPU.
- Hu, E. J. et al. "Towards a Unified View of Parameter-Efficient Transfer Learning." *ICLR* (2022). https://arxiv.org/abs/2110.04366, Unified framework comparing LoRA, adapters, prefix tuning, and prompt tuning. Useful for understanding when each PEFT method is appropriate.
- Kirkpatrick, J. et al. "Overcoming Catastrophic Forgetting in Neural Networks." *PNAS* 114, no. 13 (2017): 3521–3526. https://arxiv.org/abs/1612.00796, Elastic Weight Consolidation (EWC), a regularization approach to catastrophic forgetting mentioned in the training problems section.
- Hugging Face. "PEFT: State-of-the-Art Parameter-Efficient Fine-Tuning." https://github.com/huggingface/peft, The standard Python library for LoRA, QLoRA, prompt tuning, and other PEFT methods referenced in this guide.
