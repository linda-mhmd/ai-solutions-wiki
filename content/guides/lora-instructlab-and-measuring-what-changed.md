---
title: "LoRA, InstructLab, and Measuring What Actually Changed"
description: "How to determine, from two files, exactly which weight matrices a LoRA fine-tune touched and how many parameters that is — plus where InstructLab's LAB method fits on the full-fine-tuning-to-LoRA spectrum."
date: 2026-09-03
lastmod: 2026-09-03
last_updated: 2026-09-03
categories: [Guides]
tags: ["lora", "peft", "instructlab", "fine-tuning", "qlora", "dora", "adapter-weights"]
related:
  - glossary/lora
  - glossary/fine-tuning
  - glossary/quantization
  - glossary/hyperparameter-tuning
  - guides/fine-tuning-llms-guide
  - guides/benchmarking-a-finetuned-model-against-its-lineage
---

"We fine-tuned the model" is a phrase that hides a fact worth being precise about. Run a typical [LoRA](/glossary/lora/) job against a 7B model, targeting the standard attention projections at a modest rank, and well under 1% of the base model's weights ever receive a gradient. The other 99%-plus sits frozen, byte-for-byte identical to the checkpoint you started from. That is not a criticism of LoRA — it is the entire point of the method — but it means "how much of the model changed" is not a vague impression you should be comfortable leaving unanswered. It is a number you can compute from two files, exactly, every time. This page shows how, works a concrete example on a real model architecture, and covers where LoRA does and does not appear inside InstructLab's training pipeline.

## LoRA's mechanism, briefly

The [LoRA glossary entry](/glossary/lora/) covers the concept and the QLoRA/DoRA family in more depth; this section only restates the formula this page builds on. For a pretrained weight matrix `W` of shape `(d, k)`, LoRA freezes `W` and adds a low-rank update: `W' = W + BA`, where `B` has shape `(d, r)` and `A` has shape `(r, k)`, with rank `r` much smaller than `min(d, k)`. Only `B` and `A` are trained. The trainable parameter count contributed by one adapted matrix is:

```
trainable params per matrix = r × (d + k)
```

against `d × k` for full fine-tuning of that same matrix.¹ At `d = k = 4096` and `r = 8`, that is `8 × 8192 = 65,536` trainable values against `16,777,216` in the original matrix — a 256x reduction for that one matrix.

<figure>
<svg viewBox="0 0 620 260" width="100%" role="img" aria-labelledby="lora-svg-title lora-svg-desc" xmlns="http://www.w3.org/2000/svg">
<title id="lora-svg-title">Frozen base weight matrix with a LoRA adapter attached</title>
<desc id="lora-svg-desc">A large frozen weight matrix W next to two small trainable matrices B and A, whose product approximates the update applied to W.</desc>
<text x="110" y="28" text-anchor="middle" font-size="13" font-weight="600" fill="currentColor">Pretrained weight — untouched</text>
<rect x="30" y="40" width="160" height="150" rx="6" fill="none" stroke="currentColor" stroke-width="2"/>
<text x="110" y="105" text-anchor="middle" font-size="30" font-family="monospace" fill="currentColor">W</text>
<text x="110" y="128" text-anchor="middle" font-size="12" fill="currentColor" opacity="0.7">frozen — no gradients</text>
<text x="110" y="207" text-anchor="middle" font-size="12" fill="currentColor" opacity="0.7">shape d × k (e.g. 4096 × 4096)</text>
<text x="222" y="122" text-anchor="middle" font-size="26" fill="currentColor">+</text>
<rect x="250" y="30" width="210" height="195" rx="6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="5 4"/>
<text x="355" y="20" text-anchor="middle" font-size="13" font-weight="600" fill="currentColor">LoRA adapter — trainable</text>
<rect x="270" y="50" width="170" height="46" rx="4" fill="none" stroke="currentColor" stroke-width="2"/>
<text x="355" y="80" text-anchor="middle" font-size="18" font-family="monospace" fill="currentColor">B</text>
<text x="355" y="110" text-anchor="middle" font-size="11" fill="currentColor" opacity="0.7">shape (d, r) — e.g. 4096 × 8</text>
<text x="355" y="128" text-anchor="middle" font-size="20" fill="currentColor">×</text>
<rect x="270" y="145" width="170" height="46" rx="4" fill="none" stroke="currentColor" stroke-width="2"/>
<text x="355" y="175" text-anchor="middle" font-size="18" font-family="monospace" fill="currentColor">A</text>
<text x="355" y="205" text-anchor="middle" font-size="11" fill="currentColor" opacity="0.7">shape (r, k) — e.g. 8 × 4096</text>
<text x="310" y="250" text-anchor="middle" font-size="12" fill="currentColor" opacity="0.85">Only B and A receive gradients. W is never written to during training.</text>
</svg>
<figcaption>Schematic, not to scale: for a 4096×4096 matrix at rank 8, B and A together hold about 0.4% as many values as W.</figcaption>
</figure>

Two knobs besides `r` and `target_modules` show up in every config but don't change the parameter count: `lora_alpha` is a scaling factor applied to the adapter's output (the effective scaling is `lora_alpha / r`),² and `lora_dropout` regularizes the adapter during training. Neither adds or removes a trainable weight.

## What adapter_config.json tells you — and what it rules out

Every adapter saved with Hugging Face's [PEFT](https://huggingface.co/docs/peft) library carries an `adapter_config.json`. It is the authoritative record of which weight matrices were targeted — not an inference you make from behavior, a field you read. The library's own checkpoint documentation states that a LoRA config's minimum required fields are `target_modules` and `peft_type`, and that everything relevant to loading the adapter — rank, alpha, dropout, target modules — lives in this one file.³ A realistic example, shaped after that documentation and using the worked numbers above:

```json
{
  "base_model_name_or_path": "meta-llama/Llama-2-7b-hf",
  "peft_type": "LORA",
  "task_type": "CAUSAL_LM",
  "r": 8,
  "lora_alpha": 16,
  "lora_dropout": 0.05,
  "bias": "none",
  "target_modules": ["q_proj", "v_proj"],
  "use_dora": false,
  "use_rslora": false,
  "modules_to_save": null
}
```

This is illustrative — the exact field set above is invented to match the running example, not copied from one specific published adapter. But real published adapters follow this identical structure. `abacusai/Fewshot-Metamath-OrcaVicuna-Mistral-10B` on Hugging Face, for instance, publishes a genuine `adapter_config.json` with `r: 8`, `lora_alpha: 16`, and `target_modules` listing all seven linear projections in each transformer block (`q_proj, k_proj, v_proj, o_proj, gate_proj, up_proj, down_proj`) against a `mistralai/Mistral-7B-v0.1` base.⁴ The mechanics are the same regardless of which modules are listed.

The rule this file gives you is absolute, not statistical: **`target_modules` is the complete, exhaustive list of weight matrices this adapter ever touched.** If `k_proj` and `o_proj` are not named, they were not adapted — not "adapted a little," not touched at all. There is no other channel through which a LoRA adapter changes a weight; the config is the ground truth for scope, the same way a [model card](/glossary/model-card/) is supposed to be the ground truth for training details, except this one is machine-checkable rather than self-reported.

## Reading the adapter's own weights: adapter_model.safetensors

The config tells you which modules were targeted; the adapter's own weight file tells you the exact shapes actually saved. When you call PEFT's `save_pretrained()`, the state dict it writes to `adapter_model.safetensors` (or `adapter_model.bin`, an older, less-safe pickle-based format PEFT still supports) **contains only the adapter's own parameters** — `lora_A` and `lora_B` for every targeted module, and nothing else. The base model's weights are not in this file at all.³ Keys follow a fixed pattern: a `base_model.model.` prefix, then the original module's dotted path inside the wrapped model, then `.lora_A.weight` / `.lora_B.weight`.³ For a Llama-style model with `target_modules = ["q_proj", "v_proj"]`, listing the file's keys and shapes looks like this:

```python
from safetensors.torch import load_file

sd = load_file("adapter_model.safetensors")
for name, tensor in sorted(sd.items()):
    print(name, tuple(tensor.shape))

# base_model.model.model.layers.0.self_attn.q_proj.lora_A.weight   (8, 4096)
# base_model.model.model.layers.0.self_attn.q_proj.lora_B.weight   (4096, 8)
# base_model.model.model.layers.0.self_attn.v_proj.lora_A.weight   (8, 4096)
# base_model.model.model.layers.0.self_attn.v_proj.lora_B.weight   (4096, 8)
# ... repeats for layers 1 through 31, and for no other module
```

Two things worth checking in that output. First, `k_proj` and `o_proj` genuinely do not appear — the file confirms what the config already claimed. Second, the shapes are a direct cross-check on the formula: `lora_A` is `(r, k) = (8, 4096)` and `lora_B` is `(d, r) = (4096, 8)`, so summing every element in this one matrix pair gives `8×4096 + 4096×8 = 65,536`, which is exactly `r × (d + k)` from the formula above. If a hand-computed total and a direct sum over the state dict's tensor shapes ever disagree, something about your assumed `d`, `k`, or `r` is wrong — the state dict is the tie-breaker.

## A worked example: how many weights changed, on a real architecture

To make "how much of the model was fine-tuned" a concrete percentage rather than an impression, this section uses Llama-2-7B's published architecture: `hidden_size = 4096`, `num_hidden_layers = 32`, `num_attention_heads = 32`, `num_key_value_heads = 32` (standard multi-head attention, not grouped-query — that arrives at the 70B size in this family), `intermediate_size = 11008`, `vocab_size = 32000`.⁵ Because attention heads equal key/value heads here, all four attention projections (`q_proj`, `k_proj`, `v_proj`, `o_proj`) are square 4096×4096 matrices. Summing every weight matrix across all 32 layers plus the embedding and output head gives a total of **6,738,415,616 parameters** — a figure this derivation reaches independently and that matches the number commonly cited for this model. The specific 4096-dimension figures are real, published values for this model; treat any other model's exact dimensions as something to look up in its own config before reusing this math.

At `r = 8`, the choice of `target_modules` changes the trainable-parameter total by roughly 5x from the narrowest to the broadest common option:

| `target_modules` choice | Matrices per layer | Matrix shape(s) | Trainable params per matrix (r=8) | Total across 32 layers | % of 6,738,415,616 base params |
|---|---|---|---|---|---|
| `q_proj`, `v_proj` only | 2 | 4096 × 4096 | 65,536 | 4,194,304 | ~0.062% |
| `q_proj`, `k_proj`, `v_proj`, `o_proj` | 4 | 4096 × 4096 | 65,536 | 8,388,608 | ~0.124% |
| "all-linear" (adds `gate_proj`, `up_proj`, `down_proj`) | 7 | 4 × (4096×4096), 3 × (4096×11008 or 11008×4096) | 65,536 (attn) / 120,832 (MLP) | 19,988,480 | ~0.297% |

Even the broadest common option — every linear layer in every transformer block — leaves about 99.7% of the base model's weights untouched. That is the actual, computed answer to "how much of the model was fine-tuned," not a rounding of "a small amount." It is derived the same way for any model: read `target_modules` and `r` from `adapter_config.json`, look up (or read directly from the saved tensors) the `d, k` shape of each named module, apply `r × (d + k)` per matrix, sum, and divide by the base model's total parameter count.

## Where LoRA fits inside InstructLab's LAB method

[InstructLab](https://docs.instructlab.ai/) is IBM Research and Red Hat's implementation of LAB — Large-scale Alignment for chatBots — a taxonomy-driven synthetic data method, not a fine-tuning algorithm in itself. A taxonomy is a tree of small, human-curated seed examples split into three branches: knowledge, foundational skills, and compositional skills.⁶ A teacher model is prompted with the seed examples at each taxonomy leaf to generate a much larger synthetic dataset that preserves the intent of that leaf, then a second pass has the teacher model act as evaluator to filter low-quality generations before they reach training.⁶ The original LAB paper used the open-weight Mixtral-8x7B-Instruct as the teacher, producing about 1.2 million synthetic training samples split roughly evenly between knowledge and skills, and applied the method to Llama-2-13B and Mistral-7B base models to produce two released models, Labradorite-13B and Merlinite-7B.⁶

Training itself runs in two phases specifically to avoid catastrophic forgetting: a knowledge-tuning phase — first on short-response knowledge data, then on long-response knowledge data together with the foundational-skills data, replaying the first step's data — followed by a skills-tuning phase on compositional-skills data, replaying data from both prior knowledge-tuning steps.⁶ This structure is the source of the "replay buffer" framing: each step deliberately re-trains on a sample of earlier steps' data so new material doesn't overwrite what came before.

**Does this use LoRA or full fine-tuning?** Both are supported, but they are not equally the default, and this is worth stating precisely rather than assuming. The original LAB paper's published training runs are full-parameter: its hyperparameter table reports a learning rate, batch size, and epoch count per phase with no mention of an adapter, rank, or target modules — every weight in Labradorite-13B and Merlinite-7B received gradients.⁶ The production `instructlab/training` library that backs the `ilab model train` CLI carries this forward: its `TrainingArgs` class declares `lora: LoraOptions | None = None` — LoRA is opt-in, and omitting it (the default) means every parameter in the base model is trainable, exactly like the paper.⁷ When you do enable it, `LoraOptions` defaults to `rank=4` (the low end of the typical 4–32 range), `alpha=32`, `dropout=0.1`, and `target_modules=None`, which the library's own comment defines as "all projection layers in the model (matching `_proj`)" — the "all-linear"-style broad option from the table above, not the narrower q/v-only default some other PEFT workflows use.⁷ In short: **InstructLab's reference multi-phase pipeline defaults to full fine-tuning; LoRA is an explicit opt-in for lower-resource setups, and when chosen it targets a broad set of projections by default.** A consequence worth being direct about: on a default InstructLab run, none of the `adapter_config.json` / `adapter_model.safetensors` introspection above applies at all — there is no adapter file, because the entire model's state dict changed. That inspection only becomes relevant the moment you pass `--lora-enabled` (or a `LoraOptions` object) to an InstructLab training run.

## Full fine-tuning, LoRA, QLoRA, and DoRA, by weights actually touched

| Method | What's frozen | What's trainable | Fraction of base weights trainable | What changes vs. plain LoRA |
|---|---|---|---|---|
| **Full fine-tuning** | Nothing | Every parameter in the model | 100% | The baseline everything else is compared to. See the [fine-tuning guide](/guides/fine-tuning-llms-guide/) for its full memory cost (roughly 16 bytes/parameter under mixed-precision Adam, before activations). |
| **LoRA** | The base matrix `W`, at its original precision | `B` and `A` per targeted module | Typically well under 1% on a multi-billion-parameter model (see the worked table above) | — |
| **QLoRA** | The base matrix `W`, [quantized](/glossary/quantization/) to 4-bit NF4 | The same `B`/`A` matrices as LoRA, kept in higher precision | Identical fraction to LoRA at equal rank and `target_modules` — QLoRA changes how much memory the frozen 99%+ costs to hold, not how many weights are trainable | Adds double quantization and paged optimizers; made it possible to fine-tune a 65B model on one 48GB GPU.⁸ |
| **DoRA** (Weight-Decomposed LoRA) | The base matrix's decomposed direction component | `B`/`A` as in LoRA, plus one trainable magnitude scalar per output dimension of each targeted matrix | Marginally more than plain LoRA — the added magnitude vector has length equal to the matrix's output dimension, negligible next to `r×(d+k)` | Implemented in PEFT as `use_dora=True` on a standard `LoraConfig`, not a separate library.⁹ PEFT's own benchmark on Llama-3.1-8B reports roughly 139% longer training time and 4% more memory than plain LoRA without further optimization (about 17% slower / 41% more memory using its eval-mode caching option instead).⁹ Closes some of the quality gap to full fine-tuning; merges back into `W` with the same zero added inference latency as plain LoRA.¹⁰ |

QLoRA's row is the one most often misread: quantizing the base model does not change which weights are being fine-tuned, only what it costs to keep the untouched ones resident during training. If you inspect a QLoRA adapter's own `adapter_config.json` and `adapter_model.safetensors`, they look exactly like a LoRA adapter's — same `target_modules`, same `r`, same `lora_A`/`lora_B` shapes. Everything covered above for LoRA introspection applies to QLoRA adapters unchanged.

## Sources

1. Hu, E.J., et al. (2021), "LoRA: Low-Rank Adaptation of Large Language Models," arXiv:2106.09685: [https://arxiv.org/abs/2106.09685](https://arxiv.org/abs/2106.09685)
2. Hugging Face, "LoRA" PEFT package reference (target module matching rules, `r`, `lora_alpha` scaling): [https://huggingface.co/docs/peft/en/package_reference/lora](https://huggingface.co/docs/peft/en/package_reference/lora)
3. Hugging Face, "PEFT checkpoint format" (adapter_config.json required fields; adapter_model.safetensors state-dict scope and key naming): [https://huggingface.co/docs/peft/en/developer_guides/checkpoint](https://huggingface.co/docs/peft/en/developer_guides/checkpoint)
4. Hugging Face Hub, `abacusai/Fewshot-Metamath-OrcaVicuna-Mistral-10B`, `adapter_config.json`: [https://huggingface.co/abacusai/Fewshot-Metamath-OrcaVicuna-Mistral-10B/blob/main/adapter_config.json](https://huggingface.co/abacusai/Fewshot-Metamath-OrcaVicuna-Mistral-10B/blob/main/adapter_config.json)
5. Hugging Face Hub, `NousResearch/Llama-2-7b-hf`, `config.json` (architecture dimensions), corroborating Touvron, H., et al. (2023), "Llama 2: Open Foundation and Fine-Tuned Chat Models," arXiv:2307.09288: [https://huggingface.co/NousResearch/Llama-2-7b-hf/blob/main/config.json](https://huggingface.co/NousResearch/Llama-2-7b-hf/blob/main/config.json)
6. Sudalairaj, S., Bhandwaldar, A., Pareja, A., Xu, K., Cox, D.D., Srivastava, A. (2024), "LAB: Large-Scale Alignment for ChatBots," MIT-IBM Watson AI Lab / IBM Research, arXiv:2403.01081: [https://arxiv.org/abs/2403.01081](https://arxiv.org/abs/2403.01081)
7. InstructLab, `instructlab/training` source, `TrainingArgs` and `LoraOptions` defaults: [https://github.com/instructlab/training/blob/main/src/instructlab/training/config.py](https://github.com/instructlab/training/blob/main/src/instructlab/training/config.py)
8. Dettmers, T., Pagnoni, A., Holtzman, A., Zettlemoyer, L. (2023), "QLoRA: Efficient Finetuning of Quantized LLMs," arXiv:2305.14314: [https://arxiv.org/abs/2305.14314](https://arxiv.org/abs/2305.14314)
9. Hugging Face, "Weight-Decomposed Low-Rank Adaptation (DoRA)," PEFT docs: [https://huggingface.co/docs/peft/package_reference/lora_variant_dora](https://huggingface.co/docs/peft/package_reference/lora_variant_dora)
10. Liu, S.-Y., et al. (2024), "DoRA: Weight-Decomposed Low-Rank Adaptation," ICML 2024, arXiv:2402.09353: [https://arxiv.org/abs/2402.09353](https://arxiv.org/abs/2402.09353)
11. Red Hat, "What is InstructLab?": [https://www.redhat.com/en/topics/ai/what-is-instructlab](https://www.redhat.com/en/topics/ai/what-is-instructlab)
12. InstructLab, community FAQ: [https://docs.instructlab.ai/community/FAQ/](https://docs.instructlab.ai/community/FAQ/)

## Further reading

- [LoRA and QLoRA (glossary)](/glossary/lora/): the concept, the tailoring analogy, and the wider PEFT family (AdaLoRA, PiSSA, VeRA, GaLore).
- [Fine-tuning LLMs guide](/guides/fine-tuning-llms-guide/): when to fine-tune at all, and full fine-tuning's memory cost in detail.
- [Quantization (glossary)](/glossary/quantization/): the 4-bit compression QLoRA depends on, and its accuracy tradeoffs.
- [Hyperparameter tuning (glossary)](/glossary/hyperparameter-tuning/): how rank, alpha, and learning rate fit into the broader tuning problem.
- [Benchmarking a fine-tuned model against its lineage](/guides/benchmarking-a-finetuned-model-against-its-lineage/): once you know what changed structurally, how to measure what changed behaviorally.
- [Fine-tuning (glossary)](/glossary/fine-tuning/): the parent concept LoRA is one technique within.
