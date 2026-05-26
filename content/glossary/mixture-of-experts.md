---
title: "Mixture of Experts (MoE)"
description: "A neural network architecture in which only a small subset of parameters is activated for each input, enabling scaling parameter count far beyond what dense models support at the same compute budget."
date: 2026-05-08
lastmod: 2026-05-08
categories: [Glossary]
tags: ["ai-ml", "advanced", "architecture", "llm", "scaling", "moe"]
related:
  - glossary/transformer-architecture
  - glossary/attention-mechanism
  - glossary/llm
  - glossary/foundation-models
  - glossary/inference-time-compute
---

Mixture of Experts (MoE) is a neural network architecture pattern in which a layer is replaced by a set of *expert* sub-networks plus a *router* (or *gating function*) that selects which experts to activate for each input token. Only the selected experts contribute to the forward pass, so the number of parameters touched per token is far smaller than the total parameter count. This decouples model *capacity* (total parameters) from *compute* (parameters per token), allowing models with hundreds of billions of total parameters to run at the inference cost of much smaller dense models. MoE is the architecture behind several major 2024–2026 LLMs, including Mixtral 8x7B / 8x22B (Jiang et al., 2024), DeepSeek-V2 / V3 / R1 (DeepSeek-AI, 2024 / 2025), Qwen2-MoE, and reportedly GPT-4 and Gemini 1.5.

## Mechanism

A standard transformer block has a self-attention sublayer followed by a feed-forward (MLP) sublayer. In an MoE transformer, the MLP sublayer is replaced by N experts (each itself an MLP) and a router. For each token:

1. The router (typically a small linear layer followed by a softmax) computes a score for each expert given the token's hidden state.
2. The top-k experts (commonly k=2) are selected by score.
3. Each selected expert processes the token; outputs are weighted by the router scores and summed.
4. Tokens not routed to a given expert do not consume its compute.

Total parameter count = (parameters per expert) × N + shared parameters. *Active* parameters per token ≈ (parameters per expert) × k + shared parameters. For Mixtral 8x7B: 8 experts × ~7B per expert (in MLPs) → ~47B total parameters but only ~13B active per token (Jiang et al., 2024).

The router is typically trained end-to-end with the rest of the model. To prevent expert collapse (the router routes everything to a few experts), training adds an *auxiliary load-balancing loss* (Shazeer et al., 2017; Fedus et al., 2022) or uses expert-choice routing (Zhou et al., 2022) where experts pick tokens rather than tokens picking experts.

## Why MoE Matters

The empirical result, established across Switch Transformer (Fedus et al., 2022), GLaM (Du et al., 2022), and the Mixtral / DeepSeek line: at fixed compute budget, MoE models reach lower loss than dense models with the same active-parameter count, because the additional capacity in the un-activated experts encodes specialised knowledge the router can dispatch to as needed. The trade-off is memory — all experts must be loaded for routing to be possible, even though only k are used per token.

For inference economics, this means MoE models offer dense-model-like *speed* with much-larger-model-like *quality*, at the cost of dense-model-like-N× *memory*. This shifts the bottleneck from compute to memory bandwidth, with implications for serving infrastructure (high-memory GPUs, model parallelism strategies that shard experts across devices).

## Routing Variants

- **Token-choice top-k routing** (original MoE; Shazeer et al., 2017). Each token picks its top-k experts.
- **Expert-choice routing** (Zhou et al., 2022). Each expert picks its top-N tokens. Naturally load-balanced; may drop some tokens.
- **Hash routing** (Roller et al., 2021). Tokens routed by a fixed hash; simpler but less learned specialisation.
- **Soft mixing / SoftMoE** (Puigcerver et al., 2024). All experts process all tokens, weighted by router scores; differentiable end-to-end but loses sparsity savings.
- **Sparse upcycling** (Komatsuzaki et al., 2023). Initialise an MoE from a dense model checkpoint; cheaper than training MoE from scratch.

## Engineering Considerations

- **Memory dominates.** The full expert set must be resident for routing. For Mixtral 8x7B, this is ~47B parameters in memory but ~13B in compute per token. Plan VRAM accordingly.
- **Expert parallelism.** Shard experts across devices so each GPU holds a subset; route tokens across devices via all-to-all collectives. The communication cost is the dominant inference overhead in distributed MoE serving.
- **Batching dynamics.** MoE throughput depends on token-to-expert distribution. If a batch is dominated by tokens routing to the same few experts, the others are idle. Production servers (vLLM, TensorRT-LLM, SGLang) handle this with expert-aware scheduling.
- **Quantisation interacts with sparsity.** Quantising an MoE is harder than quantising a dense model because outliers concentrate in specific experts; specialised methods (e.g. QMoE; Frantar & Alistarh, 2024) are required to preserve quality at low bit-widths.
- **Fine-tuning is sensitive.** Naive fine-tuning can destabilise the router. LoRA on the experts and frozen router is a common, stable approach.

## When MoE Wins (and When It Does Not)

MoE is the right choice when:

- Inference compute (tokens/sec/$) is the bottleneck and memory is available.
- The training set is large enough to fill the additional expert capacity (small datasets do not benefit; experts collapse to redundancy).
- Latency targets allow the additional all-to-all communication of distributed serving.

Dense models remain preferable when:

- Memory is the bottleneck (single-GPU deployment, edge inference). A dense 13B model fits where Mixtral 8x7B does not.
- Cold-start latency matters and loading 47B of weights is too slow.
- The task is narrow and the additional capacity has nothing to specialise on.

## Related Concepts

- [Transformer Architecture](/glossary/transformer-architecture/) — the substrate MoE replaces the MLP sublayer in
- [Foundation Models](/glossary/foundation-models/) — many recent foundation models are MoE
- [Quantization](/glossary/quantization/) — interacts non-trivially with MoE sparsity
- [Inference-Time Compute](/glossary/inference-time-compute/) — orthogonal scaling axis
- [Knowledge Distillation](/glossary/knowledge-distillation/) — MoE → dense distillation is a common deployment pattern

## Sources and Further Reading

- Shazeer, N., Mirhoseini, A., Maziarz, K., et al. (2017). *Outrageously Large Neural Networks: The Sparsely-Gated Mixture-of-Experts Layer.* ICLR 2017. arXiv:1701.06538. [https://arxiv.org/abs/1701.06538](https://arxiv.org/abs/1701.06538)
- Fedus, W., Zoph, B., Shazeer, N. (2022). *Switch Transformers: Scaling to Trillion Parameter Models with Simple and Efficient Sparsity.* JMLR 2022. arXiv:2101.03961. [https://arxiv.org/abs/2101.03961](https://arxiv.org/abs/2101.03961)
- Du, N., Huang, Y., Dai, A. M., et al. (2022). *GLaM: Efficient Scaling of Language Models with Mixture-of-Experts.* ICML 2022. arXiv:2112.06905. [https://arxiv.org/abs/2112.06905](https://arxiv.org/abs/2112.06905)
- Zhou, Y., Lei, T., Liu, H., et al. (2022). *Mixture-of-Experts with Expert Choice Routing.* NeurIPS 2022. arXiv:2202.09368. [https://arxiv.org/abs/2202.09368](https://arxiv.org/abs/2202.09368)
- Roller, S., Sukhbaatar, S., Szlam, A., Weston, J. (2021). *Hash Layers For Large Sparse Models.* NeurIPS 2021. arXiv:2106.04426. [https://arxiv.org/abs/2106.04426](https://arxiv.org/abs/2106.04426)
- Jiang, A. Q., Sablayrolles, A., Roux, A., et al. (2024). *Mixtral of Experts.* arXiv:2401.04088. [https://arxiv.org/abs/2401.04088](https://arxiv.org/abs/2401.04088)
- DeepSeek-AI (2024). *DeepSeek-V2: A Strong, Economical, and Efficient Mixture-of-Experts Language Model.* arXiv:2405.04434. [https://arxiv.org/abs/2405.04434](https://arxiv.org/abs/2405.04434)
- DeepSeek-AI (2024). *DeepSeek-V3 Technical Report.* arXiv:2412.19437. [https://arxiv.org/abs/2412.19437](https://arxiv.org/abs/2412.19437)
- Komatsuzaki, A., Puigcerver, J., Lee-Thorp, J., et al. (2023). *Sparse Upcycling: Training Mixture-of-Experts from Dense Checkpoints.* ICLR 2023. arXiv:2212.05055. [https://arxiv.org/abs/2212.05055](https://arxiv.org/abs/2212.05055)
- Puigcerver, J., Riquelme, C., Mustafa, B., Houlsby, N. (2024). *From Sparse to Soft Mixtures of Experts.* ICLR 2024. arXiv:2308.00951. [https://arxiv.org/abs/2308.00951](https://arxiv.org/abs/2308.00951)
- Frantar, E., Alistarh, D. (2024). *QMoE: Practical Sub-1-Bit Compression of Trillion-Parameter Models.* MLSys 2024. arXiv:2310.16795. [https://arxiv.org/abs/2310.16795](https://arxiv.org/abs/2310.16795)
