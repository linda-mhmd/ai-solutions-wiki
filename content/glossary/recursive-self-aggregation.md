---
title: "Recursive Self-Aggregation (RSA)"
description: "A test-time scaling method that keeps a population of candidate reasoning chains and repeatedly aggregates and refines subsets of them, so a smaller model can approach larger reasoning-model quality."
date: 2026-07-06
lastmod: 2026-07-06
categories: [Glossary]
tags: ["ai-ml", "advanced", "reasoning", "inference-time-compute", "test-time-scaling"]
related:
  - glossary/inference-time-compute
  - glossary/reasoning-models
  - glossary/chain-of-thought
last_updated: 2026-07-06
---

Recursive Self-Aggregation (RSA) is a test-time scaling method for large language models. It keeps a population of candidate reasoning chains and repeatedly aggregates and refines subsets of them, so that quality improves as more {{< relref "glossary/inference-time-compute" >}} is spent. The effect is that a smaller model can approach the quality of larger {{< relref "glossary/reasoning-models" >}} when given more inference compute. RSA is presented as a named alternative to best-of-N sampling and tree search, two other ways of turning extra test-time compute into better answers.

## How it works

RSA operates on a population of candidate reasoning chains rather than a single {{< relref "glossary/chain-of-thought" >}}. The method proceeds recursively: it takes subsets of the current population, aggregates them, and refines the result, then repeats. Each round of aggregation and refinement lets the model combine partial progress across candidates and improve on it. Because the loop can run for more or fewer rounds, RSA gives a direct lever on how much test-time compute to spend, more rounds of self-aggregation for harder problems. This is what lets a smaller model reach toward the performance of larger reasoning models: the extra compute is spent on iteratively improving a pool of reasoning chains rather than on a larger network.

## How it compares

RSA is positioned against two established test-time scaling strategies. Best-of-N sampling draws many independent candidates and keeps the best one; tree search explores a branching space of partial solutions. RSA differs by maintaining a population and recursively aggregating and refining subsets of it, so information flows between candidates across rounds instead of each candidate being scored in isolation. The framing in the paper is that RSA unlocks "deep thinking" by scaling this aggregation process at test time.

## Why it matters

Test-time scaling is attractive because it improves results without retraining or enlarging the model. RSA's contribution is a specific mechanism, recursive aggregation and refinement over a population of reasoning chains, that converts additional inference compute into higher accuracy. The headline implication is efficiency: with enough inference compute, a smaller model using RSA can approach the quality of larger reasoning models, which changes the trade-off between model size and per-query compute.

## Origins and History

Recursive Self-Aggregation was introduced in "Recursive Self-Aggregation Unlocks Deep Thinking in Large Language Models" (arXiv 2509.26626), released on 30 September 2025, by Venkatraman, Jain, and colleagues, including Bengio and Jain. The paper presents RSA as a test-time scaling method that maintains and recursively aggregates a population of reasoning chains, and positions it as an alternative to best-of-N sampling and tree search for unlocking deeper reasoning from a given model.

## Sources

1. Venkatraman, S., Jain, M., ..., Bengio, Y., Jain, M., et al. *Recursive Self-Aggregation Unlocks Deep Thinking in Large Language Models.* arXiv:2509.26626, 30 September 2025. [https://arxiv.org/abs/2509.26626](https://arxiv.org/abs/2509.26626)
