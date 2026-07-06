---
title: "Deliberative Alignment"
description: "A safety-training method where a model explicitly recalls and reasons over a safety specification before it answers."
date: 2026-07-06
lastmod: 2026-07-06
last_updated: 2026-07-06
categories: [Glossary]
tags: ["ai-ml", "advanced", "safety", "agents"]
related:
  - glossary/ai-safety
  - glossary/guardrails
  - glossary/red-teaming
  - glossary/reasoning-models
  - glossary/chain-of-thought
  - glossary/responsible-ai
---

Deliberative alignment is a safety-training method in which a model is taught to explicitly recall and reason over the text of a safety specification before it answers, rather than relying only on learned reflexes. The model reads the relevant rules, thinks about how they apply to the request, and then responds.

## How it works

Most alignment approaches train a model to produce safe outputs through examples, so the model develops reflex-like behaviour without direct access to the rules it is following. Deliberative alignment instead teaches the model the text of the safety specification and trains it to reason over that specification at answer time. This explicit reasoning step draws on {{< relref "glossary/chain-of-thought" >}} and fits naturally with {{< relref "glossary/reasoning-models" >}}, which already produce intermediate reasoning before a final answer.

By grounding responses in a written policy, deliberative alignment contributes to {{< relref "glossary/ai-safety" >}} and {{< relref "glossary/responsible-ai" >}}, and complements runtime {{< relref "glossary/guardrails" >}} and {{< relref "glossary/red-teaming" >}} rather than replacing them. The approach was used to align OpenAI's o-series reasoning models.

## Origins and History

Deliberative alignment was introduced by Guan, Wallace, Barak, Wei, Glaese, and colleagues at OpenAI in "Deliberative Alignment: Reasoning Enables Safer Language Models" (arXiv 2412.16339), released on 20 December 2024. OpenAI describes the method as the technique used to align its o-series reasoning models, teaching them to reason explicitly over safety specifications before responding.

## Sources

1. Guan, Wallace, Barak, Wei, Glaese, et al. (OpenAI). "Deliberative Alignment: Reasoning Enables Safer Language Models" (20 December 2024). [https://arxiv.org/abs/2412.16339](https://arxiv.org/abs/2412.16339)
2. OpenAI. "Deliberative alignment." [https://openai.com/index/deliberative-alignment/](https://openai.com/index/deliberative-alignment/)
