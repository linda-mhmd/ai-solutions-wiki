---
title: "Latent Reasoning (Chain of Continuous Thought)"
description: "Reasoning performed in a continuous latent space instead of by emitting word tokens, decoupling thinking from language."
date: 2026-07-06
lastmod: 2026-07-06
last_updated: 2026-07-06
categories: [Glossary]
tags: ["ai-ml", "advanced", "reasoning", "agents"]
related:
  - glossary/reasoning-models
  - glossary/inference-time-compute
  - glossary/chain-of-thought
---

Latent reasoning is reasoning performed in a continuous latent space instead of by emitting word tokens. The model's last hidden state is fed back as the next input embedding, so its intermediate "thinking" happens as vectors rather than text. This decouples reasoning from language.

## How it works

In token-level {{< relref "glossary/chain-of-thought" >}}, a model writes out its reasoning one word token at a time, and every intermediate step must be expressed in language. Latent reasoning removes that constraint. The model takes its last hidden state and feeds it directly back in as the next input embedding, letting it reason in a continuous latent space before it produces any words. Because the reasoning is not forced through the vocabulary, it is distinct from token-level chain-of-thought.

This makes latent reasoning a different mechanism for the kind of intermediate computation seen in {{< relref "glossary/reasoning-models" >}} and connects to {{< relref "glossary/inference-time-compute" >}}, since the reasoning steps happen at inference. The specific method is named Coconut, short for Chain of Continuous Thought.

## Origins and History

Latent reasoning in this form was introduced by Hao, Sukhbaatar, Su, Li, Hu, Weston, and Tian at Meta FAIR and UC San Diego in "Training Large Language Models to Reason in a Continuous Latent Space" (arXiv 2412.06769), released on 9 December 2024 and presented at COLM 2025. The paper names the method Coconut (Chain of Continuous Thought).

## Sources

1. Hao, Sukhbaatar, Su, Li, Hu, Weston, Tian (Meta FAIR and UC San Diego). "Training Large Language Models to Reason in a Continuous Latent Space" (9 December 2024; COLM 2025). [https://arxiv.org/abs/2412.06769](https://arxiv.org/abs/2412.06769)
