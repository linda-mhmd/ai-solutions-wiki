---
title: "Deep Reinforcement Learning"
description: "How deep RL algorithms like DQN, PPO, and A3C combine neural networks with reward-based learning, including RLHF for aligning LLMs."
date: 2026-03-28
categories: [Glossary]
tags: [reinforcement-learning, DQN, PPO, RLHF, deep-learning]
related:
  - glossary/reinforcement-learning
  - glossary/neural-network
  - glossary/llm
  - glossary/ai-safety
last_updated: 2026-05-30
---

Deep reinforcement learning (deep RL) combines reinforcement learning algorithms with deep neural networks to learn policies for complex tasks directly from high-dimensional inputs. An agent interacts with an environment, receives rewards, and learns to maximize cumulative reward over time. Deep RL has achieved superhuman performance in games, enabled robotic control, and become the primary mechanism for aligning large language models with human preferences.

## How It Works

**DQN** (Deep Q-Network) uses a neural network to approximate the Q-function, which estimates the expected reward for taking an action in a given state. Experience replay and target networks stabilize training. DQN demonstrated that deep RL could learn directly from raw pixels in Atari games.

**Policy gradient methods** directly optimize the policy (action probabilities) rather than estimating value functions. **A3C** (Asynchronous Advantage Actor-Critic) runs multiple agents in parallel environments, combining a policy network (actor) with a value network (critic). **PPO** (Proximal Policy Optimization) constrains policy updates to a trust region, preventing destructively large changes. PPO's stability and ease of tuning have made it the default choice for many deep RL applications.

**RLHF** (Reinforcement Learning from Human Feedback) applies PPO to align LLMs with human preferences. A reward model is trained on human preference data (comparisons of model outputs), then PPO optimizes the language model's policy to maximize this learned reward while staying close to the original model. RLHF is a key step in training ChatGPT, Claude, and other instruction-following models. Variants like DPO (Direct Preference Optimization) simplify this by eliminating the separate reward model.

## Why It Matters

Deep RL is the primary technique for producing AI systems that act in complex environments and align with human intent. RLHF transformed LLMs from next-token predictors into useful assistants. Beyond language, deep RL powers robotics, autonomous systems, game AI, and resource optimization.

## Practical Considerations

Deep RL is notoriously sample-inefficient and sensitive to hyperparameters. For LLM alignment, RLHF requires high-quality preference data and careful reward model design to avoid reward hacking. Teams should consider whether DPO or other simpler alignment methods suffice before investing in full RLHF pipelines. For non-language applications, simulation environments are essential since real-world data collection is too slow and expensive for deep RL's data requirements.

## Sources

- Mnih, V., et al. (2015). Human-level control through deep reinforcement learning. *Nature, 518*, 529–533. (DQN; first deep RL system achieving human-level Atari game performance.)
- Mnih, V., et al. (2016). Asynchronous methods for deep reinforcement learning. *ICML 2016*. (A3C.)
- Schulman, J., et al. (2017). Proximal policy optimization algorithms. *arXiv:1707.06347*. (PPO; widely-used policy gradient method for LLM alignment and robotics.)
- Ouyang, L., et al. (2022). Training language models to follow instructions with human feedback. *NeurIPS 2022*. (InstructGPT/RLHF applied to LLMs.)
- Rafailov, R., et al. (2023). Direct preference optimization: Your language model is secretly a reward model. *NeurIPS 2023*. (DPO; eliminates separate reward model step.)
