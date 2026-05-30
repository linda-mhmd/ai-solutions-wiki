---
title: "LLM - Large Language Model"
description: "What large language models are, how they work at a high level, key characteristics, and what they can and cannot do reliably."
date: 2026-03-24
categories: [Glossary]
tags: ["ai-ml", "beginner", "llm", "large-language-model", "transformers", "pre-training", "foundation-models"]
related:
  - glossary/foundation-models
  - glossary/prompt-engineering
  - glossary/fine-tuning
  - tools/claude-anthropic
  - tools/amazon-bedrock
  - guides/getting-started-with-bedrock
last_updated: 2026-05-30
---

A Large Language Model (LLM) is a type of AI model trained on large volumes of text to understand and generate language. LLMs are the technology behind products like Claude, ChatGPT, and Gemini, and they power most practical AI applications in enterprise settings today.

<figure class="bz-figure">
  <img src="/img/rapid-ai/brain-glass-shell-green-notext.png" alt="A glowing brain encased in a protective glass shell: the model's intelligence contained within infrastructure that makes it accessible and safe." loading="lazy">
  <figcaption>An LLM is intelligence in a container. The model's capabilities are accessed through APIs, wrapped in guardrails, and deployed within infrastructure that manages cost, latency, and safety.</figcaption>
</figure>

## How They Work (Simplified)

LLMs are neural networks trained on the task of predicting what comes next in a sequence of text. Given the text "The capital of France is", the model learns to predict "Paris" - not by memorizing that exact string, but by learning statistical patterns across billions of examples that encode factual and linguistic knowledge.

Training involves exposing the model to vast amounts of text (web pages, books, code, academic papers) and adjusting millions to billions of parameters until the model's predictions match the training data well. After training, the model has encoded a compressed, generalized representation of language and knowledge in those parameters.

The "large" in LLM refers to the number of parameters: modern models range from a few billion to several hundred billion parameters. More parameters generally means more capability, but also higher compute cost for inference.

## What LLMs Can Do

**Text generation** - Producing fluent, contextually appropriate text given a prompt. This powers everything from email drafting to article generation.

**Instruction following** - Following complex instructions in natural language. "Summarize this document in three bullet points, focusing on financial implications" - LLMs handle multi-part instructions reliably.

**Reasoning and analysis** - Working through multi-step problems, analyzing arguments, identifying inconsistencies. Quality varies by model and task complexity.

**Classification** - Assigning categories to text inputs (sentiment, topic, intent) based on examples or descriptions in the prompt.

**Extraction** - Pulling structured information out of unstructured text: entities, facts, dates, amounts.

**Code** - Generating, debugging, explaining, and transforming code. Most modern LLMs have strong code capabilities.

**Translation and transformation** - Converting between languages, formats, styles, and levels of formality.

## What LLMs Cannot Do Reliably

**Real-time knowledge** - LLMs have a training cutoff date and do not know about events after that date unless given tools to retrieve current information.

**Precise arithmetic** - LLMs generate plausible-looking calculations but make arithmetic errors, especially on multi-step calculations. Always verify numerical results programmatically.

**Guaranteed factual accuracy** - LLMs can generate confident-sounding false statements (hallucinations). For factual applications, ground responses in retrieved source documents (RAG) rather than relying on the model's parametric knowledge.

**Exact reproduction** - LLMs do not reliably reproduce specific text verbatim from their training data. They paraphrase and reconstruct.

## Key Parameters to Understand

**Temperature** - Controls randomness in generation. Temperature 0 produces the most likely (most deterministic) output; higher temperature produces more varied, creative output. For extraction and classification tasks, use temperature 0.

**Context window** - The maximum amount of text the model can process in a single call (input plus output). Modern models range from 8,000 to 200,000+ tokens. One token is approximately 0.75 English words.

**Tokens** - The basic unit of text processing. LLMs do not process characters or words directly; they process tokens (subword units). Pricing for LLM APIs is always per token.

## Sources and Further Reading

- Vaswani, A., Shazeer, N., Parmar, N., et al. (2017). "Attention Is All You Need." *arXiv:1706.03762*. [https://arxiv.org/abs/1706.03762](https://arxiv.org/abs/1706.03762) - The foundational paper introducing the transformer architecture that underlies all modern LLMs.
- Anthropic Claude Documentation: [https://docs.anthropic.com/](https://docs.anthropic.com/)
- AWS Documentation: Supported foundation models in Amazon Bedrock. [https://docs.aws.amazon.com/bedrock/latest/userguide/models-supported.html](https://docs.aws.amazon.com/bedrock/latest/userguide/models-supported.html)
- Brown, T., Mann, B., et al. (2020). "Language Models are Few-Shot Learners" (GPT-3 paper). *arXiv:2005.14165*. [https://arxiv.org/abs/2005.14165](https://arxiv.org/abs/2005.14165)
- Anthropic Model Documentation (Claude API): [https://docs.anthropic.com/en/docs/about-claude/models/overview](https://docs.anthropic.com/en/docs/about-claude/models/overview)
