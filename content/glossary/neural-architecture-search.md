---
title: "Neural Architecture Search"
description: "How automated methods discover optimal neural network architectures using reinforcement learning, evolutionary algorithms, and differentiable search."
date: 2026-03-28
categories: [Glossary]
tags: [NAS, AutoML, deep-learning, architecture-optimization, model-design]
related:
  - glossary/deep-learning
  - glossary/hyperparameter-tuning
  - glossary/neural-network
  - glossary/reinforcement-learning
last_updated: 2026-05-30
---

Neural architecture search (NAS) is a family of techniques that automate the design of neural network architectures. Rather than relying on human intuition to choose layer types, depths, and connection patterns, NAS algorithms explore a defined search space to find architectures that maximize performance on a given task.

## How It Works

NAS involves three components: a **search space** (the set of possible architectures), a **search strategy** (how candidates are explored), and a **performance estimation** (how each candidate is evaluated).

**Reinforcement learning-based NAS** trains a controller network to propose architectures, using validation accuracy as a reward signal. This approach discovered the NASNet architecture but required thousands of GPU-hours. **Evolutionary methods** maintain a population of architectures, applying mutations (adding layers, changing operations) and selecting the fittest candidates across generations. **Differentiable NAS** (DARTS) relaxes the discrete search into a continuous optimization, allowing gradient-based search over architecture choices in a fraction of the compute.

Weight-sharing strategies, where candidate architectures share parameters within a supernet, dramatically reduced NAS costs from thousands of GPU-days to single GPU-days, making the technique practical for real teams.

## Why It Matters

NAS has produced several architectures that outperform human-designed ones, including EfficientNet, MobileNetV3, and AmoebaNet. It removes the bottleneck of manual architecture engineering and can discover non-obvious design patterns. For organizations with well-defined tasks and sufficient compute budgets, NAS can yield measurable accuracy improvements over off-the-shelf architectures.

## Practical Considerations

Modern NAS is accessible through frameworks like AutoKeras, NNI, and Google Cloud AutoML. However, the search space definition heavily influences results, and NAS can overfit to the proxy task used for evaluation. For most teams, starting with a proven architecture and tuning hyperparameters is more cost-effective than running NAS from scratch. Reserve NAS for high-value tasks where small accuracy gains justify the additional compute and engineering investment.

## Sources

- Zoph, B., & Le, Q.V. (2017). Neural architecture search with reinforcement learning. *ICLR 2017*. (Original NAS paper using RL controller; demonstrated state-of-the-art results at high compute cost.)
- Liu, H., Simonyan, K., & Yang, Y. (2019). DARTS: Differentiable architecture search. *ICLR 2019*. (Differentiable NAS; reduced search to single GPU-days.)
- Tan, M., & Le, Q.V. (2019). EfficientNet: Rethinking model scaling for convolutional neural networks. *ICML 2019*. (NAS-discovered scaling rules; widely deployed architecture.)
