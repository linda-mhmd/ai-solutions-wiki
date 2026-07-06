---
title: "Test-Time Training (TTT)"
description: "A class of layers whose hidden state is itself a small model updated by self-supervised gradient steps on the test sequence as it arrives."
date: 2026-07-06
lastmod: 2026-07-06
last_updated: 2026-07-06
categories: [Glossary]
tags: ["ai-ml", "advanced", "memory", "llm"]
related:
  - glossary/state-space-model
  - glossary/long-context-model
  - glossary/titans
---

Test-Time Training (TTT) is a class of sequence-model layers whose hidden state is itself a small model. Rather than carrying a fixed vector of numbers as its state, a TTT layer keeps a compact learner and updates it with self-supervised gradient steps on the test sequence as tokens arrive. Two variants are TTT-Linear, where the inner state is a linear model, and TTT-MLP, where it is a small multi-layer perceptron. This makes the hidden state more expressive than a plain recurrent vector, since it can keep learning from the input at inference time.

## The hidden state as a model
In a recurrent network or a {{< relref "glossary/state-space-model" >}}, the hidden state is a vector updated by a fixed rule. TTT replaces that vector with a tiny model and replaces the update rule with a gradient step. As each token comes in, the layer forms a self-supervised objective from the sequence, computes a gradient, and updates the inner model. The result is a hidden state that adapts to the specific sequence it is processing, so the layer effectively learns while it runs.

## TTT-Linear and TTT-MLP
The two named variants differ in how expressive the inner state is. TTT-Linear uses a linear model as the hidden state, which is cheap and fast. TTT-MLP uses a small multi-layer perceptron, which can capture more structure at higher cost. Because the update is a gradient step on incoming data, both variants scale in sequence length without keeping a growing cache of past tokens, which is what makes them relevant for a {{< relref "glossary/long-context-model" >}}.

## Related to but distinct from Titans
TTT is a companion idea to {{< relref "glossary/titans" >}}. Both let part of the network keep learning at inference time rather than freezing after training. They differ in framing: TTT casts the hidden state of a layer as a small self-supervised learner updated per token, while Titans adds a dedicated long-term memory module driven by a surprise signal. The two lines of work explore the same broad direction from different angles.

## Origins and History
Test-Time Training layers of this kind were introduced by Yu Sun, Xinhao Li, Karan Dalal, and colleagues in "Learning to (Learn at Test Time): RNNs with Expressive Hidden States," posted to arXiv in July 2024. The paper defines the TTT layer, its self-supervised inner update, and the TTT-Linear and TTT-MLP variants.

## Sources

1. Sun, Y., Li, X., Dalal, K., et al. "Learning to (Learn at Test Time): RNNs with Expressive Hidden States" (arXiv 2407.04620, July 2024). [https://arxiv.org/abs/2407.04620](https://arxiv.org/abs/2407.04620)
