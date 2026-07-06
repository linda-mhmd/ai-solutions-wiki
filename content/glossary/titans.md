---
title: "Titans (Learning to Memorize at Test Time)"
description: "A neural architecture with a long-term memory module that updates its own parameters during inference based on a surprise signal defined as the gradient of the loss on the incoming token."
date: 2026-07-06
lastmod: 2026-07-06
last_updated: 2026-07-06
categories: [Glossary]
tags: ["ai-ml", "advanced", "memory", "llm"]
related:
  - glossary/state-space-model
  - glossary/attention-mechanism
  - glossary/long-context-model
  - glossary/kv-cache
---

Titans is a neural architecture that adds a long-term memory module which updates its own parameters during inference. As new tokens arrive, the memory decides how much to store based on a "surprise" signal, defined as the gradient of the loss on the incoming token: the larger the gradient, the more surprising the input, and the more strongly the memory updates. Titans offers a third axis for handling long context, sitting alongside attention and state-space models rather than replacing either.

## Learning to memorize at test time
Most model parameters are frozen after training. Titans keeps a dedicated memory module whose parameters keep changing while the model runs. For each incoming token, the module computes how poorly it currently predicts that token and uses the gradient of that loss as a surprise measure. Surprising tokens, which the memory did not expect, drive larger updates and are written more strongly into memory. Unsurprising tokens leave it mostly unchanged. This lets the network memorize salient information from a long stream at test time rather than only at training time.

## A third axis for long context
Two established ways to reach long context are the {{< relref "glossary/attention-mechanism" >}}, which compares tokens directly but scales poorly with length, and the {{< relref "glossary/state-space-model" >}}, which carries a compressed recurrent state. Titans adds a distinct mechanism: a learned long-term memory updated by surprise. It can be combined with attention so the model keeps precise short-range detail while offloading longer-range information into memory, which is central to its use as a {{< relref "glossary/long-context-model" >}}.

## Relation to the KV cache
Attention-based models keep a growing {{< relref "glossary/kv-cache" >}} of past keys and values to attend over history. Titans instead compresses history into the parameters of its memory module, so what it retains is a learned summary updated online rather than a verbatim cache of every past token.

## Origins and History
Titans was introduced by Ali Behrouz, Peilin Zhong, and Vahab Mirrokni at Google in "Titans: Learning to Memorize at Test Time," posted to arXiv on 31 December 2024. The paper defines the surprise-driven long-term memory module and shows how to combine it with attention for long-context modeling.

## Sources

1. Behrouz, A., Zhong, P., Mirrokni, V. (Google). "Titans: Learning to Memorize at Test Time" (arXiv 2501.00663, 31 December 2024). [https://arxiv.org/abs/2501.00663](https://arxiv.org/abs/2501.00663)
