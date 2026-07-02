---
title: "RLHF (Reinforcement Learning from Human Feedback)"
description: "How RLHF aligns language models with human preferences using a reward model and reinforcement learning, and how DPO and RLAIF now simplify or replace it."
date: 2026-07-02
categories: [Glossary]
tags: ["ai-ml", "intermediate", "alignment", "fine-tuning", "reinforcement-learning", "llm"]
related:
  - glossary/reinforcement-learning
  - glossary/direct-preference-optimization
  - guides/fine-tuning-llms-guide
  - glossary/fine-tuning
  - glossary/ai-safety
  - glossary/reasoning-models
last_verified: 2026-07-02
---

<figure class="bz-figure">
  <img src="/img/obsidian-lab/lever-chain-mechanism-notext.png" alt="A hand pushing a lever through a mechanical chain, a metaphor for human feedback steering the behaviour of a language model." loading="lazy">
  <figcaption>RLHF puts a human in the loop: people rank the model's outputs, and that signal is turned into a force that steers the model's behaviour.</figcaption>
</figure>

Reinforcement Learning from Human Feedback (RLHF) is a training technique that aligns a language model with human preferences. Instead of training only on "correct" text, RLHF learns from human judgments about which of several model outputs is better, turns those judgments into a reward signal, and uses [reinforcement learning](/glossary/reinforcement-learning/) to push the model toward outputs people prefer. It is the method that turned raw, capable-but-unruly base models into helpful assistants. InstructGPT, the direct ancestor of the modern chat assistant, was trained this way.

The problem RLHF solves is that "good" is hard to write down. You cannot easily specify a loss function for "helpful, honest, and harmless." But people can reliably say which of two answers is better. RLHF is a way to learn from that comparative signal. Think of coaching a writer not by handing them a rulebook, but by consistently saying "this draft is better than that one" until they internalise your taste.

## The three-stage pipeline

Classic RLHF has three stages, run in order.

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Stage 1</span>
    <span class="bz-flow-step-name">Supervised fine-tuning</span>
    <span class="bz-flow-step-desc">Fine-tune the base model on high-quality example responses to set the baseline behaviour.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Stage 2</span>
    <span class="bz-flow-step-name">Reward model</span>
    <span class="bz-flow-step-desc">Humans rank pairs of outputs; a reward model learns to predict which the human prefers.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Stage 3</span>
    <span class="bz-flow-step-name">RL optimization</span>
    <span class="bz-flow-step-desc">PPO updates the model to maximise reward, with a KL penalty keeping it close to the fine-tuned model.</span>
  </div>
</div>

**The reward model** is a copy of the language model with its final layer replaced by one that outputs a single scalar: how good is this response. It is trained on human preference pairs, learning to score a preferred response higher than a rejected one. Once trained, it can score any output automatically, which is what makes the reinforcement-learning stage affordable, because you no longer need a human in the loop for every update.

**The RL stage** treats the language model as a policy and the reward model as the environment's reward. Proximal Policy Optimization (PPO) is the standard algorithm: it nudges the model to produce higher-reward outputs while a Kullback-Leibler (KL) penalty stops it drifting too far from the supervised model. That penalty matters. Without it, the model learns to exploit quirks in the reward model, a failure called reward hacking, and produces gibberish that scores highly but reads terribly.

## RLHF, RLAIF, and DPO

The classic PPO pipeline is powerful but heavy: it juggles four models at once (the policy, a reference copy, the reward model, and a value model) and is notoriously finicky to tune. Two newer approaches address that.

| | RLHF (PPO) | RLAIF | DPO |
|---|---|---|---|
| **Feedback source** | Human comparisons | AI comparisons from a principle set | Human comparisons |
| **Separate reward model** | Yes | Yes | No |
| **Optimizer** | PPO reinforcement learning | PPO reinforcement learning | Direct supervised loss |
| **Complexity** | High | High | Low |
| **Best for** | Frontier alignment budgets | Scaling feedback cheaply | Most practical alignment |

**RLAIF (RL from AI Feedback)**, introduced with Constitutional AI, replaces human labelers with an AI model that judges outputs against a written set of principles. It scales the feedback step far more cheaply than paying humans for millions of comparisons.

**[Direct Preference Optimization](/glossary/direct-preference-optimization/) (DPO)** skips the reward model and the RL loop entirely. It shows, mathematically, that the same preference objective can be optimised with a simple supervised loss directly on preference pairs. Because it is so much easier to run, DPO has displaced PPO-based RLHF for a large share of practical alignment work since 2024. A common modern recipe is supervised fine-tuning, then DPO.

The pendulum has swung part way back for reasoning models. Training models to reason with reinforcement learning, using verifiable rewards and algorithms such as GRPO, brought RL-based post-training back to the frontier in 2024 to 2026, this time optimising for correctness on math and code rather than human preference alone.

## Limitations

- **Reward hacking.** The model exploits flaws in the reward model rather than genuinely improving. The KL penalty mitigates but does not eliminate this.
- **The alignment tax.** Aligning a model can slightly reduce raw capability or cause [catastrophic forgetting](/glossary/catastrophic-forgetting/) of earlier skills.
- **Preference data is expensive.** High-quality human comparisons are slow and costly to collect, and their quality caps the result.
- **Whose preferences?** The model inherits the values and biases of whoever labels the data, which is an [AI safety](/glossary/ai-safety/) and governance question, not just a technical one.

## Further reading

- [Direct Preference Optimization](/glossary/direct-preference-optimization/): the simpler method that now replaces PPO for much alignment work.
- [Fine-tuning LLMs: a practical guide](/guides/fine-tuning-llms-guide/): where preference tuning fits after supervised fine-tuning.
- [Reinforcement learning](/glossary/reinforcement-learning/): the underlying paradigm RLHF adapts to language.
- [Reasoning models](/glossary/reasoning-models/): where reinforcement learning returned to post-training.
- [Illustrating RLHF (Hugging Face)](https://huggingface.co/blog/rlhf): a clear, diagram-led walkthrough of the pipeline.

## Sources

- Christiano, P., et al. "Deep Reinforcement Learning from Human Preferences." *NeurIPS* (2017). https://arxiv.org/abs/1706.03741. The paper that introduced learning a reward model from human comparisons.
- Ouyang, L., et al. "Training Language Models to Follow Instructions with Human Feedback." *NeurIPS* (2022). https://arxiv.org/abs/2203.02155. InstructGPT, the three-stage RLHF recipe for assistants.
- Bai, Y., et al. "Training a Helpful and Harmless Assistant with Reinforcement Learning from Human Feedback." arXiv:2204.05862 (2022). https://arxiv.org/abs/2204.05862. Anthropic's HH-RLHF study.
- Schulman, J., et al. "Proximal Policy Optimization Algorithms." arXiv:1707.06347 (2017). https://arxiv.org/abs/1707.06347. The RL algorithm used in the optimization stage.
- Bai, Y., et al. "Constitutional AI: Harmlessness from AI Feedback." arXiv:2212.08073 (2022). https://arxiv.org/abs/2212.08073. Introduces RLAIF, replacing human labels with AI feedback against principles.
- Rafailov, R., et al. "Direct Preference Optimization: Your Language Model is Secretly a Reward Model." *NeurIPS* (2023). https://arxiv.org/abs/2305.18290. The reward-model-free alternative to PPO-RLHF.
