---
title: "Thinking Machines Lab Releases Inkling, Its First Model, as Open Weights"
description: "Thinking Machines Lab released Inkling, its first model: a mixture-of-experts transformer with 975 billion total parameters, a 1 million token context, and open weights on Hugging Face."
date: 2026-07-17
lastmod: 2026-07-17
last_updated: 2026-07-17
categories: [News]
tags: [thinking-machines, inkling, open-weights, mixture-of-experts, model-release]
related:
  - comparisons/llm-landscape-2026
  - news/deepseek-v4
  - glossary/mixture-of-experts
---

Thinking Machines Lab, the research company founded by former OpenAI CTO Mira Murati, shipped its first model on 15 July 2026. It is called Inkling, and the notable choice is that the lab released it as open weights rather than behind an API. A new, well-funded frontier lab entering on the open side strengthens the case that open-weight models can sit at the frontier, not a step behind it.

<figure class="bz-figure">
  <img src="/img/hidden-ecosystem/pod-jungle-floor-notext.png" alt="A glowing blue and gold pod resting on a dark jungle floor under a shaft of light, suggesting a new artifact discovered in the wild." loading="lazy">
  <figcaption>Inkling is a lab's first release, and it arrives as downloadable weights rather than a closed endpoint.</figcaption>
</figure>

## What happened

Per the lab's announcement, **Inkling** is a mixture-of-experts transformer:

- **975 billion total parameters, about 41 billion active** per token (256 routed experts plus 2 shared, 6 active per token). A [mixture-of-experts](/glossary/mixture-of-experts/) design keeps inference cost tied to the active parameters, not the total.
- **Up to a 1 million token context window.**
- **Pretrained on 45 trillion tokens** across text, image, audio, and video.
- **Released as open weights** on Hugging Face, under the Apache 2.0 license.

## Why it matters for builders

The open-weight tier keeps gaining serious entrants. Inkling joins [DeepSeek-V4](/news/deepseek-v4/) and other open families as a frontier-scale model you can download, inspect, fine-tune, and self-host. For teams that need data residency, offline deployment, or independence from a single vendor's pricing and availability, each new open release widens the set of options that are genuinely frontier-adjacent rather than a compromise.

As always, "open weights" is the start of the evaluation, not the end. Check the license terms for how you are allowed to use and redistribute the model, confirm the hardware you would need to serve 41 billion active parameters at your latency target, and run your own [evaluations](/guides/how-ai-models-are-evaluated/) rather than trusting a launch benchmark. A first model from a new lab is promising, but promise is not production evidence.

## Sources

- Thinking Machines Lab, "Introducing Inkling": https://thinkingmachines.ai/news/introducing-inkling/

## Further reading

- [DeepSeek releases V4 open-weight models](/news/deepseek-v4/): another leading open-weight family.
- [The 2026 LLM landscape](/comparisons/llm-landscape-2026/): how open and closed models compare.
- [What is a mixture of experts?](/glossary/mixture-of-experts/): why a 975B model can be affordable to run.
