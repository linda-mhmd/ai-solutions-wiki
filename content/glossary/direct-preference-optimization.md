---
title: "Direct Preference Optimization (DPO)"
description: "An alignment method that fine-tunes language models directly on preference data without training an explicit reward model — the practical alternative to RLHF for most production teams."
date: 2026-05-08
lastmod: 2026-05-08
categories: [Glossary]
tags: ["ai-ml", "advanced", "alignment", "fine-tuning", "rlhf", "training"]
related:
  - glossary/fine-tuning
  - glossary/reinforcement-learning
  - glossary/llm
  - glossary/foundation-models
  - glossary/llm-as-a-judge
---

Direct Preference Optimization (DPO) is a method for aligning language models with human preferences by fine-tuning directly on pairs of preferred and dispreferred completions, without training an explicit reward model and without on-policy reinforcement learning. Introduced by Rafailov et al. (NeurIPS 2023), DPO derives a closed-form objective that achieves the same fixed point as RLHF with a KL constraint, replacing the unstable PPO loop with a single supervised-style training pass. It has become the default open-source alignment recipe (LLaMA-3, Qwen2, Tülu 3, DeepSeek post-training, Zephyr, etc.) and is the practical baseline against which subsequent alignment methods are compared.

## Mechanism

The classical RLHF pipeline (Christiano et al., 2017; Ouyang et al., 2022; Bai et al., 2022) has three stages:

1. **Supervised fine-tuning (SFT)** on demonstrations.
2. **Reward model (RM) training** on human preference pairs (chosen vs rejected).
3. **PPO** (or another RL algorithm) optimising the policy against the RM with a KL penalty to the SFT model.

Stage 3 is fragile: PPO is sensitive to hyperparameters, requires on-policy sampling each step, and easily collapses without careful reward shaping.

DPO eliminates stages 2 and 3 by deriving the objective directly. Given preference pair (prompt x, chosen y_w, rejected y_l) from a dataset D, DPO minimises:

$$\mathcal{L}_\text{DPO}(\pi_\theta; \pi_\text{ref}) = -\mathbb{E}_{(x, y_w, y_l) \sim D}\left[\log \sigma\left(\beta \log \frac{\pi_\theta(y_w | x)}{\pi_\text{ref}(y_w | x)} - \beta \log \frac{\pi_\theta(y_l | x)}{\pi_\text{ref}(y_l | x)}\right)\right]$$

where π_θ is the trained policy, π_ref is a frozen reference (typically the SFT model), σ is the sigmoid, and β controls the KL deviation. This is a standard cross-entropy-style loss on the *log-ratio between policy and reference probabilities* of chosen vs rejected completions. It admits standard supervised optimisation (Adam, batch training) without on-policy sampling or a separate RM.

The Rafailov et al. result is that the optimum of this loss is mathematically equivalent to the RLHF optimum under the Bradley–Terry preference model with KL constraint β. Empirically, DPO matches or exceeds PPO-RLHF on summarisation and dialogue benchmarks at a fraction of the engineering complexity.

## Variants and Successors

The DPO line has spawned a family of preference-learning methods, each addressing specific limitations:

- **IPO** (Azar et al., 2024) — Identity Preference Optimisation, removes DPO's susceptibility to overfitting on the Bradley–Terry assumption.
- **KTO** (Ethayarajh et al., 2024) — Kahneman-Tversky Optimisation, requires only single-sample binary feedback (good/bad) rather than pairs. Cheaper data, comparable quality.
- **ORPO** (Hong et al., 2024) — Odds Ratio Preference Optimisation, fuses SFT and preference optimisation into a single training stage, eliminating the need for a separate SFT pass.
- **SimPO** (Meng et al., 2024) — Simple Preference Optimisation, removes the reference policy entirely, using length-normalised log-probabilities.
- **CPO** (Xu et al., 2024) — Contrastive Preference Optimisation, originally for machine translation; tightens the loss with hard-negative contrasting.
- **RLOO / GRPO** (DeepSeek-AI, 2024 / 2025) — return to RL with simpler estimators (REINFORCE-like, group-relative advantage); GRPO underpins DeepSeek-R1's reasoning training.

The 2024–2025 consensus is that DPO is a strong default; SimPO and KTO are increasingly adopted; ORPO is attractive for compute-constrained pipelines; and RL-based methods (PPO, GRPO) remain preferred when the reward signal is verifiable (math, code, reasoning) rather than purely preferential.

## When to Use DPO

DPO is the right tool when:

- A preference dataset (chosen vs rejected pairs) is available — either human-labelled or LLM-as-a-judge labelled (see [LLM-as-a-Judge](/glossary/llm-as-a-judge/))
- The behaviour to align is preference-based (helpfulness, style, safety) rather than verifiable (correctness on a known answer)
- Engineering simplicity matters: no PPO infrastructure, no reward-model training pipeline
- The team has enough compute for a full preference-tuning pass on the SFT model

It is not the right tool when:

- The signal is verifiable (correctness, code passing tests, formal proofs) — RL with verifiable reward (GRPO-style) gets more out of the same data
- Preference data is scarce (consider KTO with single-sample binary feedback)
- The base model is already well-aligned and the goal is narrow behaviour change (consider targeted SFT)
- The deployment is online and requires on-policy adaptation (DPO is offline by construction)

## Engineering Considerations

- **Reference model choice.** DPO requires KL anchor π_ref. Standard practice: SFT model. For a continuation of post-training (DPO on a DPO-tuned model), the previous DPO checkpoint is the new reference.
- **Beta tuning.** β is the most important hyperparameter; controls how far the policy drifts from π_ref. Typical values 0.1–0.5. Too small → reward hacking, mode collapse; too large → no learning.
- **Length bias.** DPO has a documented bias toward longer completions (similar to RLHF; Singhal et al., 2023). Mitigations: length-normalised variants (SimPO), length-controlled evaluation (Dubois et al., 2024), explicit length penalties in the dataset.
- **Reward hacking is still possible.** Even without an explicit RM, DPO can exploit superficial features of the preference dataset. Clean preference data and held-out evaluation are mandatory.
- **Memory: 2× the SFT model.** Both π_θ and π_ref are loaded. For 70B-class models, DPO requires the same multi-GPU setup as RLHF.

## Relation to RLHF and SFT

| Method | Stages | On-policy? | Typical use |
|---|---|---|---|
| **SFT** | 1 | n/a | Initial post-training; demonstration-based |
| **RLHF (PPO)** | 3 (SFT, RM, PPO) | Yes | Frontier-lab alignment; complex but powerful |
| **DPO** | 2 (SFT, DPO) | No | Default open-source alignment recipe |
| **KTO** | 2 (SFT, KTO) | No | When only binary feedback is available |
| **ORPO** | 1 (combined) | No | Compute-constrained; merges SFT and preference |
| **GRPO** | 3 (SFT, RM/verifier, GRPO) | Yes | Reasoning training with verifiable rewards |

## Related Concepts

- [Fine-Tuning](/glossary/fine-tuning/) — DPO is a specialised post-training fine-tuning method
- [Reinforcement Learning](/glossary/reinforcement-learning/) — DPO bypasses RL but the objective is RL-derived
- [LLM-as-a-Judge](/glossary/llm-as-a-judge/) — frequently used to label preference pairs at scale
- [Foundation Models](/glossary/foundation-models/) — most modern foundation models are post-trained with DPO or a successor
- [Hallucination](/glossary/hallucination/) — alignment methods including DPO partially mitigate it

## Sources and Further Reading

- Rafailov, R., Sharma, A., Mitchell, E., Manning, C. D., Ermon, S., Finn, C. (2023). *Direct Preference Optimization: Your Language Model is Secretly a Reward Model.* NeurIPS 2023. arXiv:2305.18290. [https://arxiv.org/abs/2305.18290](https://arxiv.org/abs/2305.18290)
- Christiano, P. F., Leike, J., Brown, T. B., et al. (2017). *Deep Reinforcement Learning from Human Preferences.* NeurIPS 2017. arXiv:1706.03741. [https://arxiv.org/abs/1706.03741](https://arxiv.org/abs/1706.03741)
- Ouyang, L., Wu, J., Jiang, X., et al. (2022). *Training Language Models to Follow Instructions with Human Feedback (InstructGPT).* NeurIPS 2022. arXiv:2203.02155. [https://arxiv.org/abs/2203.02155](https://arxiv.org/abs/2203.02155)
- Bai, Y., Jones, A., Ndousse, K., et al. (2022). *Training a Helpful and Harmless Assistant with RLHF.* arXiv:2204.05862. [https://arxiv.org/abs/2204.05862](https://arxiv.org/abs/2204.05862)
- Azar, M. G., Rowland, M., Piot, B., et al. (2024). *A General Theoretical Paradigm to Understand Learning from Human Preferences (IPO).* AISTATS 2024. arXiv:2310.12036. [https://arxiv.org/abs/2310.12036](https://arxiv.org/abs/2310.12036)
- Ethayarajh, K., Xu, W., Muennighoff, N., Jurafsky, D., Kiela, D. (2024). *KTO: Model Alignment as Prospect Theoretic Optimization.* ICML 2024. arXiv:2402.01306. [https://arxiv.org/abs/2402.01306](https://arxiv.org/abs/2402.01306)
- Hong, J., Lee, N., Thorne, J. (2024). *ORPO: Monolithic Preference Optimization without Reference Model.* EMNLP 2024. arXiv:2403.07691. [https://arxiv.org/abs/2403.07691](https://arxiv.org/abs/2403.07691)
- Meng, Y., Xia, M., Chen, D. (2024). *SimPO: Simple Preference Optimization with a Reference-Free Reward.* NeurIPS 2024. arXiv:2405.14734. [https://arxiv.org/abs/2405.14734](https://arxiv.org/abs/2405.14734)
- Xu, H., Sharaf, A., Chen, Y., et al. (2024). *Contrastive Preference Optimization (CPO).* ICML 2024. arXiv:2401.08417. [https://arxiv.org/abs/2401.08417](https://arxiv.org/abs/2401.08417)
- DeepSeek-AI (2025). *DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning.* arXiv:2501.12948. [https://arxiv.org/abs/2501.12948](https://arxiv.org/abs/2501.12948)
- Singhal, P., Goyal, T., Xu, J., Durrett, G. (2023). *A Long Way to Go: Investigating Length Correlations in RLHF.* arXiv:2310.03716. [https://arxiv.org/abs/2310.03716](https://arxiv.org/abs/2310.03716)
- Lambert, N., Pyatkin, V., Morrison, J., et al. (2024). *Tülu 3: Pushing Frontiers in Open Language Model Post-Training.* arXiv:2411.15124. [https://arxiv.org/abs/2411.15124](https://arxiv.org/abs/2411.15124)
