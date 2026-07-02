---
title: "Catastrophic Forgetting"
description: "Why a neural network loses previously learned capabilities when trained on new data, and how LoRA, data replay, and regularization mitigate it during fine-tuning."
date: 2026-07-01
categories: [Glossary]
tags: ["ai-ml", "intermediate", "fine-tuning", "model-training", "continual-learning", "llm"]
related:
  - guides/fine-tuning-llms-guide
  - glossary/lora
  - glossary/fine-tuning
  - glossary/direct-preference-optimization
last_verified: 2026-07-01
---

<figure class="bz-figure">
  <img src="/img/decoding-software/glass-bridge-stress-cracks-notext.png" alt="A transparent glass truss bridge with red glowing stress cracks, a metaphor for a neural network losing prior capabilities under the load of new training." loading="lazy">
  <figcaption>Catastrophic forgetting: training on a new task stresses the shared weights until earlier knowledge cracks and gives way.</figcaption>
</figure>

Catastrophic forgetting (also called catastrophic interference) is the tendency of a neural network to lose previously learned knowledge when it is trained on new data. As the weights update to fit the new task, they overwrite the patterns that encoded the old one. It is the central risk of [fine-tuning](/guides/fine-tuning-llms-guide/) a pre-trained model: teach it your domain, and it can quietly get worse at everything else.

Think of a musician who drills one new piece so intensely that they can no longer play their old repertoire from memory. The hands adapt to the new muscle memory and overwrite the old. The network has the same problem, because it has nowhere else to put the new skill.

## Why it happens

A neural network stores all of its knowledge in the same shared weights. There is no separate slot per task. When you train on new examples, gradient descent moves the weights toward the new objective, and nothing in that objective rewards keeping the old behaviour intact. Parameters that were important to earlier capabilities drift, and the earlier capabilities degrade with them.

The size of the effect scales with how far the weights move. A high learning rate and many epochs push the weights a long way from their pre-trained values, which is exactly when forgetting is worst. Formally, the loss for the new task contains no penalty for raising the loss on the old task, so no force anchors the weights that mattered before.

For large language models this shows up as a narrow fine-tune degrading general reasoning, instruction-following, or safety behaviour, an effect sometimes called the alignment tax or capability regression. A model fine-tuned hard on, say, legal contracts can lose fluency on ordinary conversation.

## How to prevent it

No single fix is always right, so practitioners combine a few. The trade-off is always the same: the more you protect old knowledge, the more slowly the model adapts to the new task.

| Strategy | How it helps | Trade-off |
|---|---|---|
| **Parameter-efficient tuning (LoRA, DoRA)** | Freezes the base weights, trains small adapters | Slightly less task capacity |
| **Lower learning rate** | Smaller weight moves preserve old knowledge | Slower adaptation |
| **Fewer epochs, early stopping** | Less time to overwrite prior skills | May underfit the new task |
| **Data replay (rehearsal)** | Mix general-purpose data back into the training set | Needs representative old data |
| **Regularization (EWC)** | Penalizes changing weights important to old tasks | Extra bookkeeping and compute |

The single most effective practical defence is parameter-efficient fine-tuning. Because [LoRA](/glossary/lora/) leaves the base weights frozen and trains only small low-rank adapters, the original capabilities are preserved by construction rather than by careful tuning. Elastic Weight Consolidation (EWC), introduced by Kirkpatrick et al. in 2017, takes a different route: it adds a penalty proportional to how important each weight was to earlier tasks, estimated from the Fisher information, so the optimiser is free to change unimportant weights but is held back from changing critical ones. Rehearsal, mixing a slice of general data back into the fine-tuning set, is the simplest option and is often enough on its own.

## Catastrophic forgetting vs overfitting

The two are easy to confuse because both are made worse by high learning rates and too many epochs, but they are different failures. Overfitting is memorizing the training set and failing to generalize to new examples of the same task. Catastrophic forgetting is losing capability on different tasks the model used to handle. A model can suffer both at once. Overfitting is caught by a held-out validation set for the new task; forgetting is only caught by re-testing the old capabilities, which is why fine-tuning evaluation should always include a regression check against the base model.

## Further reading

- [Fine-tuning LLMs: a practical guide](/guides/fine-tuning-llms-guide/): where forgetting is one of the named training problems.
- [LoRA and QLoRA](/glossary/lora/): the parameter-efficient approach that structurally avoids most forgetting.
- [Fine-tuning vs prompt engineering vs RAG](/glossary/fine-tuning/): choosing whether to change the model at all.
- [Direct Preference Optimization](/glossary/direct-preference-optimization/): a later alignment stage that also risks regressing earlier behaviour.
- [Overcoming Catastrophic Forgetting in Neural Networks (Kirkpatrick et al., 2017)](https://arxiv.org/abs/1612.00796): the EWC paper, the standard reference for the regularization approach.

## Sources

- McCloskey, M., and Cohen, N. J. "Catastrophic Interference in Connectionist Networks: The Sequential Learning Problem." *Psychology of Learning and Motivation* 24 (1989): 109-165. The paper that first named and characterized the effect.
- French, R. M. "Catastrophic Forgetting in Connectionist Networks." *Trends in Cognitive Sciences* 3, no. 4 (1999): 128-135. A widely cited review of causes and early mitigations.
- Kirkpatrick, J., et al. "Overcoming Catastrophic Forgetting in Neural Networks." *PNAS* 114, no. 13 (2017): 3521-3526. https://arxiv.org/abs/1612.00796. Introduces Elastic Weight Consolidation (EWC).
- Luo, Y., et al. "An Empirical Study of Catastrophic Forgetting in Large Language Models During Continual Fine-tuning." arXiv:2308.08747 (2023). https://arxiv.org/abs/2308.08747. Measures forgetting as LLMs are fine-tuned on successive tasks.
- Hu, E. J., et al. "LoRA: Low-Rank Adaptation of Large Language Models." *ICLR* (2022). https://arxiv.org/abs/2106.09685. The parameter-efficient method that mitigates forgetting by freezing base weights.
