---
title: "DeepSeek Sparse Attention (DSA)"
description: "A trainable sparse-attention mechanism that scores query-key relevance and attends only to the most relevant tokens, reducing core attention cost from quadratic toward near-linear in sequence length."
date: 2026-07-06
lastmod: 2026-07-06
last_updated: 2026-07-06
categories: [Glossary]
tags: ["ai-ml", "advanced", "attention", "llm"]
related:
  - glossary/flash-attention
  - glossary/attention-mechanism
  - glossary/kv-cache
  - glossary/long-context-model
---

DeepSeek Sparse Attention (DSA) is a trainable sparse-attention mechanism. A lightweight component called a "lightning indexer" scores how relevant each earlier token is to the current query, and a top-K selector then attends only to the most relevant tokens rather than to all of them. Because attention is computed over a fixed budget of selected tokens instead of the whole sequence, the core attention cost moves from quadratic toward near-linear in sequence length while quality is preserved. DSA shipped in DeepSeek-V3.2-Exp, released in late September 2025.

## How it works
Standard {{< relref "glossary/attention-mechanism" >}} lets every query attend to every earlier token, so cost grows with the square of the sequence length. DSA inserts two trainable pieces ahead of the main attention. The lightning indexer produces a cheap relevance score between the current query and each candidate token. The top-K selector keeps only the highest-scoring tokens, and the expensive attention computation runs over that reduced set. Both pieces are trained, so the model learns which tokens matter rather than relying on a fixed heuristic pattern.

## Distinct from dense-kernel work
DSA changes which tokens are attended to. This is different from dense-kernel optimizations such as {{< relref "glossary/flash-attention" >}}, which change how the dense computation is tiled and moved through the GPU memory hierarchy but still attend to every token. The two ideas are complementary: one reduces the number of interactions, the other makes each interaction cheaper to compute. DSA also reduces pressure on the {{< relref "glossary/kv-cache" >}} pathway because attention touches fewer cached entries per step.

## Why it matters for long context
The quadratic cost of dense attention is the main obstacle to efficient {{< relref "glossary/long-context-model" >}} serving. By pushing core attention toward near-linear scaling, DSA aims to make long-context inference cheaper without a quality regression, which is the goal DeepSeek states for the V3.2-Exp release.

## Origins and History
DeepSeek Sparse Attention was introduced by DeepSeek-AI in the DeepSeek-V3.2-Exp technical report in 2025, accompanying the model's release in late September 2025. The report frames DSA as an experimental step toward more efficient long-context computation, with the lightning indexer and top-K token selection as its defining components.

## Sources

1. DeepSeek-AI. "DeepSeek-V3.2-Exp: Boosting Long-Context Efficiency with DeepSeek Sparse Attention" (technical report, 2025). [https://github.com/deepseek-ai/DeepSeek-V3.2-Exp](https://github.com/deepseek-ai/DeepSeek-V3.2-Exp)
