---
title: "Gemini 1.5 Pro Launch: February 15, 2024"
description: "On February 15, 2024, Google announced Gemini 1.5 with a breakthrough one-million-token context window, the longest of any large-scale foundation model at the time."
date: 2024-02-15
lastmod: 2026-07-30
last_updated: 2026-07-30
categories: [History]
tags: [google, gemini, llm, ai-history, milestones, long-context]
related:
  - history/claude-3-launch-march-2024
  - history/gpt-4-launch-march-2023
  - news/mcp-2026-07-28-stateless
  - glossary/context-window
  - comparisons/rag-vs-long-context
---

On February 15, 2024, Google announced Gemini 1.5, the next generation of its AI model family. The headline feature was a one-million-token context window, the longest of any large-scale foundation model at the time. This meant the model could process approximately one hour of video, 11 hours of audio, over 30,000 lines of code, or more than 700,000 words in a single prompt.

## What it was

Gemini 1.5 Pro was a mid-size multimodal model that performed at a similar level to Gemini 1.0 Ultra (Google's largest model) while using less compute. The model was built on a Mixture-of-Experts (MoE) architecture, where different "expert" neural networks activate depending on the type of input. This specialization made the model more efficient than traditional Transformer architectures.

Google CEO Sundar Pichai wrote in his announcement: "We've been able to significantly increase the amount of information our models can process — running up to 1 million tokens consistently, achieving the longest context window of any large-scale foundation model yet."

The research team had also successfully tested the model at 10 million tokens internally.

## Why the context window mattered

Before Gemini 1.5, most production models had context windows of 8,000 to 128,000 tokens. A one-million-token window fundamentally changed what was possible:

**Video understanding**: The model could watch an entire hour-long video and answer questions about it, reasoning across scenes, identifying plot points, and catching details that might be missed in a quick viewing.

**Codebase analysis**: With over 30,000 lines of code in context, the model could reason about entire codebases rather than individual files, suggesting modifications and explaining how different parts interact.

**Document processing**: Over 700,000 words meant entire books, lengthy reports, or large documentation sets could be processed in a single prompt.

**In-context learning**: Perhaps most striking, Google demonstrated that Gemini 1.5 Pro could learn a new skill from a grammar manual given in the prompt. When provided documentation for Kalamang (a language with fewer than 200 speakers worldwide), the model learned to translate English to Kalamang at a level similar to a person learning from the same content.

## Technical approach

Google had been an early pioneer of the Mixture-of-Experts technique through research including Sparsely-Gated MoE, GShard-Transformer, and Switch-Transformer. In an MoE model, not all parameters activate for every input. Instead, the model routes inputs to specialized "expert" subnetworks, reducing computational cost while maintaining capability.

The result was a model that could be both more capable and more efficient to run. Google stated that Gemini 1.5 Pro achieved "comparable quality to 1.0 Ultra, while using less compute."

## Benchmark performance

Gemini 1.5 Pro outperformed Gemini 1.0 Pro on 87% of benchmarks used for developing large language models. When compared to 1.0 Ultra, it performed at "a broadly similar level."

On the Needle in a Haystack evaluation, which tests whether a model can find a small piece of information hidden in a large block of text, Gemini 1.5 Pro found the embedded text 99% of the time across data blocks as long as one million tokens.

## Availability

Gemini 1.5 Pro launched with a standard 128,000-token context window, with the full one-million-token window available in limited preview through Google AI Studio and Vertex AI. Google stated that early testers could try the million-token context at no cost during the testing period, though with longer latency times.

By May 2024, Gemini 1.5 Pro with the one-million-token context window became available to Gemini Advanced subscribers, making it "the longest context window of any widely available consumer chatbot."

## Market impact

The Gemini 1.5 launch reshaped expectations around context length:

- **Anthropic** responded by expanding Claude's context windows, eventually reaching one million tokens.
- **OpenAI** increased GPT-4's context options through the Turbo series.
- **Long-context use cases** became a standard consideration in AI application design.
- **RAG vs. long context debates** intensified as developers weighed whether to retrieve relevant context or simply pass everything to the model.

## Why it still matters

Gemini 1.5 established that context length was a competitive dimension, not just a technical specification. The ability to process an hour of video or an entire codebase in a single prompt opened use cases that were previously impossible or required complex chunking and retrieval pipelines.

For builders, the lesson was that context length changes what problems you can solve. A 128K context window means you need RAG or chunking strategies for large documents. A million-token window means you might not. This architectural choice affects cost, latency, accuracy, and system complexity.

## Sources

- Google, "Introducing Gemini 1.5, Google's next-generation AI model" (February 15, 2024): https://blog.google/technology/ai/google-gemini-next-generation-model-february-2024/
- Google, "Access to 1.5 Pro and new features" (May 2024): https://blog.google/products/gemini/google-gemini-update-may-2024
- Google Developers Blog, "Gemini 1.5 Pro Now Available in 180+ Countries" (April 2024): https://developers.googleblog.com/2024/04/gemini-15-pro-in-public-preview-with-new-features.html
- 9to5Google, "Google announces Gemini 1.5 with expanded context window" (February 2024): https://9to5google.com/2024/02/15/gemini-1-5-announcement/

## Further reading

- [Claude 3 launch](/history/claude-3-launch-march-2024/): Anthropic's competitive release a month later.
- [What is a context window?](/glossary/context-window/): the concept explained.
- [RAG vs long context](/comparisons/rag-vs-long-context/): when to use each approach.
