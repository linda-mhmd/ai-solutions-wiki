---
title: "Context Rot"
description: "The measurable degradation of an LLM's output quality as its input grows longer, even when the input stays well within the model's stated context window."
date: 2026-07-05
lastmod: 2026-07-05
last_updated: 2026-07-05
categories: [Glossary]
tags: ["ai-ml", "intermediate", "context-engineering", "long-context-model", "llm", "evaluation"]
related:
  - glossary/context-engineering
  - glossary/context-window
  - glossary/long-context-model
  - glossary/kv-cache
  - glossary/rag
  - glossary/hallucination
---

Context rot is the degradation of a language model's output quality as the number of input tokens grows, even when the input stays well within the model's advertised context window. A model rated for a one-million-token window does not use all of those tokens equally well: as the prompt gets longer, accuracy, instruction-following, and retrieval reliability tend to fall, and they fall unevenly rather than at a clean cutoff. Context rot names this effect and treats it as a property of how attention works, not a bug that a bigger window fixes.

## Why it happens

A transformer attends over every token in its window, and attention has a finite amount of focus to spread across all of them. As the sequence grows, the tokens that matter compete with more low-signal and distracting tokens for that focus. Models are also trained on far more short sequences than very long ones, so their behaviour on a near-full window is less well practised. The consequence is that "the model supports one million tokens" and "the model reasons reliably over one million tokens" are two different claims, and the gap between them is context rot. This is why [context engineering]({{< relref "glossary/context-engineering" >}}) treats the window as a finite attention budget rather than free space to fill.

## What the research found

The term was coined by Chroma Research in a July 2025 report that evaluated 18 frontier models, including GPT, Claude, and Gemini families, on controlled long-context tasks. The central finding is that performance degrades non-uniformly as input length increases, well before the stated context limit is reached. The report also showed the effect is sensitive to more than raw length: where the relevant information sits in the window, whether the query matches the target lexically or only semantically, and the presence of plausible-but-wrong distractor passages all change how fast quality drops. Tasks that models solve easily at short lengths become unreliable when the same content is padded out to tens of thousands of tokens. It generalized earlier position-bias findings (often summarized as "lost in the middle") across many models and task types.

## Why it matters for builders

Context rot is the evidence behind a practical rule: do not solve a retrieval or memory problem by pouring more text into the prompt. A longer window can make results worse, and it always costs more. The responses are the standard [context engineering]({{< relref "glossary/context-engineering" >}}) techniques: retrieve the smallest high-signal set of tokens, compact and summarize long histories, keep distractors out, and place the most important material where the model attends to it best. It also shapes evaluation. A model's headline context length is a capacity spec, not a performance guarantee, so long-context behaviour has to be measured on your own task rather than assumed. Context rot is distinct from [hallucination]({{< relref "glossary/hallucination" >}}): the model is not inventing facts, it is failing to use facts that are present but buried.

## Origins and History

The specific term "context rot" was introduced by Chroma Research (Kelly Hong, Anton Troynikov, and Jeff Huber) in the report "Context Rot: How Increasing Input Tokens Impacts LLM Performance," published on 14 July 2025. It built on and sharpened earlier "lost in the middle" work on position bias in long contexts, generalizing it across a broad set of current models. Practitioners adopted the phrase quickly as shorthand for why [long-context models]({{< relref "glossary/long-context-model" >}}) underdeliver in production and why context engineering is necessary rather than optional.

## Sources

1. Chroma Research. "Context Rot: How Increasing Input Tokens Impacts LLM Performance" (14 July 2025). [https://research.trychroma.com/context-rot](https://research.trychroma.com/context-rot)
