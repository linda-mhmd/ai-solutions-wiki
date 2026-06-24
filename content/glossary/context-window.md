---
title: "Context Window - The Token Budget of a Language Model"
description: "What a context window is, why it is a finite resource, how large windows have become in 2026, and why filling it up can still hurt accuracy."
date: 2026-06-23
categories: [Glossary]
tags: ["ai-ml", "intermediate", "context-window", "tokens", "llm", "long-context", "context-engineering"]
related:
  - glossary/tokenization
  - glossary/llm
  - guides/context-engineering
  - guides/ai-agent-memory-management
last_updated: 2026-06-23
---

A context window is the maximum amount of text, measured in tokens, that a language model can process in a single call. It covers both the input you send (system prompt, instructions, retrieved documents, conversation history) and the output the model generates. A token is a sub-word unit, so 1,000 tokens is roughly 750 English words. When a request exceeds the window, the oldest or least relevant content has to be dropped or summarized.

The context window is the model's working memory for one request. Anything outside it does not exist as far as that call is concerned, which is why long-term [memory](/guides/ai-agent-memory-management/) and retrieval exist: they decide what to load into the window at the right moment.

## How large context windows are in 2026

Windows have grown by orders of magnitude. Many frontier model lines now offer a 1,000,000-token window, and Google's Gemini 2.5 Pro documents an input limit of 1,048,576 tokens with a 65,536-token output limit. Anthropic documents 1M-token windows on several current Claude models, with most models at 200,000 tokens.

A 1M-token window holds roughly 750,000 words, about ten average novels. That is enough to drop an entire codebase or a long deposition into a single prompt.

## Bigger is not automatically better

A large window is a ceiling, not a target. Two well-documented effects show that accuracy can fall as you fill the window:

- **Lost in the middle**: Liu et al. found a U-shaped curve where models use information best when it sits at the start or end of the input and worse when it sits in the middle, even on long-context models.
- **Context rot**: a Chroma study across 18 models found performance degrades non-uniformly as input length grows, even on simple retrieval tasks. Anthropic's own documentation adopts the term and describes context as "a finite resource with diminishing marginal returns."

The practical takeaway: what you put in the window matters as much as how much fits. Curating the window is the discipline of [context engineering](/guides/context-engineering/).

## How the window relates to cost

You pay per token, so a larger filled window costs more on every call and adds latency. [Prompt caching](/glossary/prompt-caching/) reduces the cost of reusing a long, stable prefix, and retrieval keeps the window focused instead of stuffing everything in.

## Further reading

- [Context windows](https://platform.claude.com/docs/en/build-with-claude/context-windows): Anthropic's official documentation on window sizes and context management.
- [Lost in the Middle: How Language Models Use Long Contexts](https://arxiv.org/abs/2307.03172): Liu et al., TACL 2024, the primary study of position-based degradation.
- [Context Rot: How Increasing Input Tokens Impacts LLM Performance](https://research.trychroma.com/context-rot): Chroma's 18-model evaluation of long-input degradation.
- [Context Engineering](/guides/context-engineering/): how to curate the window to cut tokens and protect accuracy.
- [Tokenization](/glossary/tokenization/): how text becomes the tokens the window counts.
