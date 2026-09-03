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
last_updated: 2026-09-03
---

<figure class="bz-figure">
  <img src="/img/ai-machine/weaving-conductor-split-notext.png" alt="Hands weaving glowing red threads beside a lone figure conducting a luminous tower, a metaphor for fine-tuning a pre-trained model by threading in new data and steering its behaviour." loading="lazy">
  <figcaption>Fine-tuning is threading new data through a model you did not train from scratch: adapt the weights, then steer the behaviour.</figcaption>
</figure>

Fine-tuning adapts a pre-trained language model to a specific task or domain by training it on additional data. It is one of the most misunderstood techniques in applied AI. Teams often fine-tune when prompting would suffice, or skip fine-tuning when it would provide significant improvements. This guide covers when fine-tuning is appropriate, how to do it effectively, and how to avoid common pitfalls.

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 1</span>
    <span class="bz-flow-step-name">Prepare data</span>
    <span class="bz-flow-step-desc">Collect, review, and split high-quality examples. Quality beats volume.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 2</span>
    <span class="bz-flow-step-name">Choose method</span>
    <span class="bz-flow-step-desc">Full fine-tuning, LoRA, QLoRA, or DoRA, based on budget and GPU memory.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 3</span>
    <span class="bz-flow-step-name">Train</span>
    <span class="bz-flow-step-desc">Run the training loop, watching validation loss for overfitting.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 4</span>
    <span class="bz-flow-step-name">Evaluate</span>
    <span class="bz-flow-step-desc">Compare against the prompted base model on held-out test data.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 5</span>
    <span class="bz-flow-step-name">Deploy and serve</span>
    <span class="bz-flow-step-desc">Serve the adapter or merged model, then plan periodic retraining.</span>
  </div>
</div>

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

At a glance, the four main approaches trade quality against memory and cost:

| | Full fine-tuning | LoRA | QLoRA | DoRA |
|---|---|---|---|---|
| **Updates** | All weights | Small adapters | Adapters on 4-bit base | Direction of decomposed weights |
| **GPU memory** | Highest | Low | Lowest | Low |
| **Quality** | Best | Near-full | Slightly below LoRA | Closest to full |
| **Inference latency** | None added | None when merged | None when merged | None when merged |
| **Best for** | Large data, deep domain shift | Most practical cases | Limited GPU memory | Quality-sensitive adapters |

### Full Fine-Tuning

Update all model parameters on your dataset. Produces the best results but requires significant compute (GPU hours) and stores a full copy of the model weights.

**When to use:** Large datasets (10K+ examples), significant domain adaptation needed, budget for compute.

### LoRA (Low-Rank Adaptation)

Train small adapter matrices that modify the model's behavior without changing the original weights. Much cheaper than full fine-tuning, with results that are often comparable.

The key insight (Hu et al., 2022): the weight updates ΔW needed to adapt a model to a new task are intrinsically low-rank. Rather than updating the full weight matrix W ∈ ℝ^(d×k), LoRA decomposes the update as ΔW = BA where B ∈ ℝ^(d×r) and A ∈ ℝ^(r×k), with rank r ≪ min(d, k). A 4096×4096 weight matrix has 16.8M parameters; at rank 8, the LoRA adapter has only 65K, a 256× reduction in trainable parameters.

**When to use:** Most fine-tuning use cases. LoRA has become the default approach for practical fine-tuning. Hugging Face's `peft` library provides a standard implementation.

**Key parameters:** Rank (r) controls adapter capacity. Start with r=8 or r=16. Higher rank captures more complex adaptations but costs more and risks overfitting. The `alpha` scaling parameter is typically set to r or 2r.

### QLoRA

Combines LoRA with model quantization (Dettmers et al., 2023). The base model is loaded in 4-bit NormalFloat (NF4) precision using bitsandbytes, reducing memory requirements dramatically. A 65B parameter model that requires ~130GB in full precision fits in ~48GB with QLoRA. Enables fine-tuning large models on consumer GPUs.

**When to use:** When GPU memory is limited. Quality is slightly lower than full LoRA but the cost reduction is substantial. The NF4 data type is specifically designed to minimize quantization error for normally-distributed weights.

### Beyond QLoRA: the 2024-2026 PEFT frontier

LoRA started a research line, and several successors now close the small remaining gap to full fine-tuning. You do not need all of them, but it helps to know the landscape.

- **DoRA (Weight-Decomposed Low-Rank Adaptation).** Splits each weight into a magnitude and a direction, then applies LoRA to the direction only. It tracks full fine-tuning quality more closely than plain LoRA and keeps the merge-back property, so it adds no inference latency. A common 2026 starting point is DoRA at r=16 targeting all linear layers.
- **PiSSA.** Initialises the adapters from the principal singular vectors of the original weights rather than at random, which speeds and stabilises convergence.
- **VeRA.** Freezes a shared pair of random matrices and trains only tiny scaling vectors, cutting trainable parameters even further than LoRA for large multi-adapter fleets.
- **GaLore.** Projects the gradients (not the weights) into a low-rank subspace, which allows full-parameter training in far less memory. It is a different trade-off from LoRA: full weights update, but the optimiser footprint shrinks.

For the mechanism behind all of these, see the dedicated glossary entry on [LoRA and QLoRA](/glossary/lora/).

### Supervised fine-tuning vs preference tuning

Everything above is supervised fine-tuning (SFT): you show the model input-output pairs. A second stage, preference tuning, teaches the model which of two responses is better. [Direct Preference Optimization](/glossary/direct-preference-optimization/) (DPO) has largely displaced full [RLHF](/glossary/rlhf/) pipelines for this, because it optimises directly on preference pairs without training a separate reward model. A typical recipe is SFT first to fix behaviour and format, then DPO to align tone and preferences. Preference tuning needs preference data (pairs labelled better or worse), which is a different and often harder dataset to build than SFT examples.

### The tooling you will actually use

You rarely implement any of this by hand. The Hugging Face `peft` library provides the adapters, `transformers` and `trl` provide the training and preference-tuning loops, and higher-level wrappers such as Axolotl, Unsloth, and torchtune package the whole flow with sensible defaults. All of them run on [PyTorch](/tools/pytorch/). For serving, frameworks like [vLLM](/tools/vllm/) can hot-swap many LoRA adapters against one base model, so a single deployment serves many fine-tuned variants economically.

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

## Measuring What Actually Changed

"I fine-tuned it" describes an action taken, not a result. It does not say which weight matrices moved, how many parameters that represents, or whether an improvement on a benchmark reflects the intended adaptation rather than noise in the run. Those questions have precise, checkable answers, and treating "I fine-tuned it" as sufficient explanation skips past them.

For a LoRA-style adapter, the checkable answer is exact rather than inferred: the adapted matrices are exactly the ones named in the adapter's `target_modules` configuration, and the trainable parameter count per adapted matrix is exactly r × (d + k), against d × k for full fine-tuning of that same matrix (see [LoRA and QLoRA](/glossary/lora/) for the underlying mechanism). Every layer not listed in `target_modules` was never touched during training, full stop — this is not a statistical inference from the model's behavior, it is enumerated directly in the adapter's own config and weight files.

The same discipline applies to methods that do not use low-rank adapters at all. IBM and Red Hat's InstructLab (the LAB method) changes what data the model saw and in what curriculum — taxonomy-driven synthetic data generated by a teacher model, trained in phases with replay buffers to limit catastrophic forgetting — which is a different kind of "what changed" than a parameter count, and needs its own kind of verification.

This guide stops at the "why this matters" level, not the step-by-step mechanics. To inspect a PEFT adapter's `adapter_config.json` and `adapter_model.safetensors` yourself, the [Hugging Face PEFT documentation](https://huggingface.co/docs/peft) covers the file formats and the API for loading and introspecting an adapter. To trace an InstructLab taxonomy and training run, see the [InstructLab documentation](https://docs.instructlab.ai/).

## Evaluation

Evaluate fine-tuned models rigorously:

**Compare to baseline.** Always compare against the base model with good prompting. If fine-tuning does not significantly improve over prompting, it is not worth the ongoing maintenance cost.

**Benchmark the base model and the fine-tuned model on the same test set, before and after.** A single score for the final fine-tuned checkpoint, evaluated in isolation, cannot tell you what fine-tuning actually bought you or cost you elsewhere. Run the identical held-out test set through the pre-fine-tuning base model and the fine-tuned result and compare directly; see [LLM evaluation methods](/guides/llm-evaluation-methods/) for the evaluation protocols and metrics to run on both sides of that comparison.

**Use held-out test data.** Evaluate on examples the model never saw during training. Training set performance is meaningless.

**Evaluate multiple dimensions.** Check not just task accuracy but also output quality, format compliance, and edge case handling.

**Check for regressions.** Test capabilities that the model should retain from pre-training. Fine-tuning should not break general-purpose capabilities unless that is intentional.

## Cost Considerations

**Training cost.** Fine-tuning via API (OpenAI, Bedrock) costs approximately $8–$25 per million training tokens as of early 2026, verify current pricing at provider documentation before budgeting, as these figures change. Self-hosted fine-tuning costs GPU hours ($1–$5/hour for single-GPU on cloud providers, more for multi-GPU).

**Inference cost.** Fine-tuned models are often the same cost to run as base models. The savings come from using a smaller fine-tuned model instead of a larger prompted model.

**Maintenance cost.** Fine-tuned models need periodic retraining as data and requirements change. Budget for quarterly or monthly retraining cycles.

Fine-tuning is a powerful technique when applied to the right problems. The decision to fine-tune should be driven by data: you have enough quality examples, prompting is demonstrably insufficient, and the improvement justifies the ongoing maintenance cost.

## Further reading

- [LoRA and QLoRA](/glossary/lora/): the mechanism behind parameter-efficient fine-tuning, plus DoRA, PiSSA, VeRA, and GaLore.
- [Fine-tuning vs prompt engineering vs RAG](/glossary/fine-tuning/): choosing the right customisation approach before you train.
- [RAG vs fine-tuning](/comparisons/rag-vs-fine-tuning/): teaching behaviour versus supplying knowledge.
- [Direct Preference Optimization](/glossary/direct-preference-optimization/): the preference-tuning stage that often follows SFT.
- [PyTorch](/tools/pytorch/): the framework the whole fine-tuning toolchain runs on.
- [Hugging Face PEFT documentation](https://huggingface.co/docs/peft): the reference library for LoRA, QLoRA, and DoRA.
- [LLM evaluation methods](/guides/llm-evaluation-methods/): how to prove a fine-tune actually helped.
- [InstructLab documentation](https://docs.instructlab.ai/): the taxonomy-driven data curation and phased training pipeline behind the LAB method.

## Sources

- Hu, E. J., Shen, Y., Wallis, P., Allen-Zhu, Z., Li, Y., Wang, S., Wang, L., and Chen, W. "LoRA: Low-Rank Adaptation of Large Language Models." *ICLR* (2022). https://arxiv.org/abs/2106.09685, The original LoRA paper. Demonstrates that intrinsic rank of weight updates is low, enabling efficient fine-tuning with adapter matrices.
- Dettmers, T., Pagnoni, A., Holtzman, A., and Zettlemoyer, L. "QLoRA: Efficient Finetuning of Quantized LLMs." *NeurIPS* (2023). https://arxiv.org/abs/2305.14314, Introduces NF4 quantization and the double quantization technique that enables fine-tuning 65B models on a single 48GB GPU.
- He, J. et al. "Towards a Unified View of Parameter-Efficient Transfer Learning." *ICLR* (2022). https://arxiv.org/abs/2110.04366, Unified framework comparing LoRA, adapters, prefix tuning, and prompt tuning. Useful for understanding when each PEFT method is appropriate.
- Kirkpatrick, J. et al. "Overcoming Catastrophic Forgetting in Neural Networks." *PNAS* 114, no. 13 (2017): 3521–3526. https://arxiv.org/abs/1612.00796, Elastic Weight Consolidation (EWC), a regularization approach to catastrophic forgetting mentioned in the training problems section.
- Hugging Face. "PEFT: State-of-the-Art Parameter-Efficient Fine-Tuning." https://github.com/huggingface/peft, The standard Python library for LoRA, QLoRA, prompt tuning, and other PEFT methods referenced in this guide.
- Liu, S.-Y. et al. "DoRA: Weight-Decomposed Low-Rank Adaptation." *ICML* (2024). https://arxiv.org/abs/2402.09353, Decomposes weights into magnitude and direction, closing the quality gap to full fine-tuning with no added inference cost.
- Zhao, J. et al. "GaLore: Memory-Efficient LLM Training by Gradient Low-Rank Projection." *ICML* (2024). https://arxiv.org/abs/2403.03507, Projects gradients into a low-rank subspace to enable full-parameter training in reduced memory.
- Rafailov, R. et al. "Direct Preference Optimization: Your Language Model is Secretly a Reward Model." *NeurIPS* (2023). https://arxiv.org/abs/2305.18290, The preference-tuning method that replaces reward-model RLHF for many alignment recipes.
