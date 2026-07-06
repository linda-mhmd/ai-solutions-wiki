---
title: "Multi-Head Latent Attention (MLA)"
description: "An attention mechanism that compresses the key-value cache into a low-rank latent vector, cutting memory per token while matching full multi-head attention quality."
date: 2026-07-06
lastmod: 2026-07-06
last_updated: 2026-07-06
categories: [Glossary]
tags: ["ai-ml", "advanced", "attention", "llm"]
related:
  - glossary/kv-cache
  - glossary/attention-mechanism
  - glossary/transformer-architecture
  - glossary/mixture-of-experts
---

Multi-Head Latent Attention (MLA) is an attention mechanism that compresses the {{< relref "glossary/kv-cache" >}} into a low-rank latent vector. Instead of storing a full set of keys and values for every attention head, MLA stores a single small latent representation per token and reconstructs the per-head keys and values on the fly. This cuts the memory each token consumes during generation while matching the quality of standard full multi-head attention. It was introduced by DeepSeek-AI in the DeepSeek-V2 paper.

## The problem it solves
During generation, a transformer caches the keys and values of every previous token so it does not recompute them at each step. This {{< relref "glossary/kv-cache" >}} grows with sequence length and with the number of heads, and it quickly dominates memory use for long contexts and large batches. A smaller cache means you can serve longer contexts, bigger batches, or both on the same hardware.

## How it works
MLA applies a low-rank joint compression to the keys and values. Each token is projected down into a compact latent vector, and that latent vector is what gets cached. When the model needs the keys and values for a given head, it projects the shared latent vector back up. Because only the latent vector is stored, the cache footprint shrinks substantially compared with caching full keys and values for each head. The queries can be compressed in a similar way to reduce activation memory during training.

## Relation to other attention variants
MLA is a change to the {{< relref "glossary/attention-mechanism" >}} inside the {{< relref "glossary/transformer-architecture" >}}. It differs from multi-query and grouped-query attention, which reduce cache size by sharing keys and values across heads; MLA instead compresses them into a latent space and reconstructs per-head projections. In DeepSeek-V2, MLA is paired with a {{< relref "glossary/mixture-of-experts" >}} feed-forward design, so the model is economical in both attention memory and active parameters per token.

## Origins and History
Multi-Head Latent Attention was introduced by DeepSeek-AI in "DeepSeek-V2: A Strong, Economical, and Efficient Mixture-of-Experts Language Model," posted to arXiv on 7 May 2024. The paper presents MLA as the attention component that lets DeepSeek-V2 reduce the key-value cache during inference while preserving performance, alongside the DeepSeekMoE architecture for the feed-forward layers.

## Sources

1. DeepSeek-AI. "DeepSeek-V2: A Strong, Economical, and Efficient Mixture-of-Experts Language Model" (arXiv 2405.04434, 7 May 2024). [https://arxiv.org/abs/2405.04434](https://arxiv.org/abs/2405.04434)
