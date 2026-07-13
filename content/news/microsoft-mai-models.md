---
title: "Microsoft Builds Its Own MAI Models to Reduce OpenAI Reliance"
description: "Across the first half of 2026 Microsoft shipped its own MAI model family, from Foundry-available speech and image models in April to seven new models led by MAI-Thinking-1 at Build in June, plus the open-weight Phi-4-reasoning-vision."
date: 2026-06-02
lastmod: 2026-07-13
last_updated: 2026-07-13
categories: [News]
tags: [microsoft, mai, phi, model-release, reasoning, foundry]
related:
  - comparisons/llm-landscape-2026
  - glossary/reasoning-models
  - news/claude-opus-4-8
---

Through the first half of 2026 Microsoft moved from being primarily a consumer of OpenAI's models to shipping a growing family of its own, called MAI. At Build on 2 June 2026 it unveiled seven new in-house MAI models led by MAI-Thinking-1, its first in-house reasoning model, after opening its first MAI models to developers in April. Microsoft states the models were trained from scratch without distillation from third-party models, which is the strategic point: reducing dependence on OpenAI.

## What happened

The rollout came in stages. On 2 April 2026 Microsoft released its first in-house models into Microsoft Foundry for third-party developers: MAI-Transcribe-1 (multilingual speech-to-text), MAI-Voice-1 (fast expressive text-to-speech with voice cloning), and MAI-Image-2 (its highest-capability text-to-image model), the same models already powering Copilot and Bing. On 4 March 2026 Microsoft Research had released Phi-4-reasoning-vision, a 15-billion-parameter open-weight multimodal reasoning model that extends the small-model Phi line into vision and document understanding.

At Build on 2 June 2026, Microsoft AI unveiled the broader MAI family, led by MAI-Thinking-1 (a mid-weight reasoning model) alongside image, speech, voice, and code models. The consistent message is that these are Microsoft's own models, trained in-house, positioned to run its products and to be offered to developers through Foundry.

## Why it matters for builders

For years the Microsoft AI story was Azure plus OpenAI. A full in-house stack, spanning reasoning, image, speech, and code, changes the relationship: Microsoft now has models it controls end to end, which affects pricing, availability, and roadmap independence for anyone building on its platforms. It also adds another serious [reasoning model](/glossary/reasoning-models/) option to evaluate.

The open-weight Phi-4-reasoning-vision matters for a different reason: it is small enough to self-host and run on modest hardware, which suits agentic and document workflows where you want control and low cost rather than a frontier API. If you build on Microsoft Foundry, you now have first-party MAI models alongside OpenAI and Anthropic models in one place; benchmark them against your workload rather than assuming the default. See the [2026 LLM landscape](/comparisons/llm-landscape-2026/) for the wider field.

## Sources

- Microsoft AI, "Building a hill-climbing machine: launching seven new MAI models" (2 June 2026): https://microsoft.ai/news/building-a-hillclimbing-machine-launching-seven-new-mai-models/
- Microsoft AI, "Announcing 3 new world-class MAI models available in Foundry" (2 April 2026): https://microsoft.ai/news/today-were-announcing-3-new-world-class-mai-models-available-in-foundry/
- Microsoft Research, "Phi-4-reasoning-vision and the lessons of training a multimodal reasoning model" (4 March 2026): https://www.microsoft.com/en-us/research/blog/phi-4-reasoning-vision-and-the-lessons-of-training-a-multimodal-reasoning-model/

## Further reading

- [The 2026 LLM landscape](/comparisons/llm-landscape-2026/): where MAI sits among the frontier and open models.
- [What are reasoning models?](/glossary/reasoning-models/): the class MAI-Thinking-1 belongs to.
- [Claude Opus 4.8](/news/claude-opus-4-8/): one of the third-party models still offered alongside MAI in Foundry.
