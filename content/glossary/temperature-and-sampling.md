---
title: "Temperature and Sampling"
description: "The parameters that control how an LLM picks its next token: temperature scales the probability distribution, top_p and top_k trim it. Low values favour consistency, high values favour variety."
date: 2026-07-17
lastmod: 2026-07-17
categories: [Glossary]
tags: ["ai-ml", "beginner", "llm", "inference", "api"]
related:
  - glossary/llm
  - glossary/prompt-engineering
  - glossary/transformer-architecture
---

At every step of generation, an LLM produces a probability for every token in its vocabulary and then picks one. Sampling is that picking process, and temperature, top_p, and top_k are the dials that control it. They are set per request in the API call, and choosing them well is one of the cheapest quality improvements available: no prompt change, no model change, one parameter.

## The dials

**Temperature** rescales the probability distribution before picking. Values below 1 sharpen it, so likely tokens become even more likely and the output gets more focused and repeatable. Values above 1 flatten it, so unlikely tokens get more chances and the output gets more varied. At temperature 0 the model picks the single most likely token at every step, called greedy decoding.

**top_p (nucleus sampling)** keeps only the smallest set of tokens whose probabilities add up to p, then samples within that set. With top_p 0.9, the model samples from the top 90% of probability mass and discards the long tail of unlikely tokens.

**top_k** keeps only the k most likely tokens and samples among them. top_k 40 means the 41st-most-likely token can never be picked.

Providers recommend adjusting temperature or top_p, not both at once, because they interact: both trim or spread the same distribution, and combined effects are hard to reason about.

## Which value for which task

| | Low (0 to 0.3) | Medium (0.5 to 0.8) | High (0.9+) |
|---|---|---|---|
| **Behaviour** | Focused, repeatable | Balanced | Varied, surprising |
| **Good for** | Extraction, classification, code | General chat, drafting | Brainstorming, fiction |
| **Risk** | Repetitive phrasing | Middle ground | More hallucination-prone drift |

## The determinism caveat

Temperature 0 makes output more repeatable, not guaranteed identical. Providers document that even greedy decoding can vary slightly between runs, because of floating-point non-determinism on parallel hardware and serving-stack differences. Treat temperature 0 as "as consistent as this model gets," not as a bit-identical contract. If your test suite asserts exact string equality on model output, it will flake; evaluate meaning, structure, or score instead, as covered in [From Deterministic Code to LLM Systems](/guides/llm-mental-model-for-engineers/).

## Where you set it

Both major APIs accept these as top-level request parameters, documented in the [Anthropic Messages API reference](https://docs.anthropic.com/en/api/messages) and the [OpenAI API reference](https://platform.openai.com/docs/api-reference/chat). If you do not set them, the provider's defaults apply, which are tuned for general chat rather than for your task.

## Further reading

- [Your First LLM API Call](/guides/your-first-llm-api-call/): see the parameters in a real request.
- [From Deterministic Code to LLM Systems](/guides/llm-mental-model-for-engineers/): why sampling changes how you test.
- [Prompt Engineering](/glossary/prompt-engineering/): the other half of controlling output quality.
- [Anthropic Messages API reference](https://docs.anthropic.com/en/api/messages): official parameter documentation.
- [OpenAI API reference](https://platform.openai.com/docs/api-reference/chat): the same parameters on the OpenAI side.
