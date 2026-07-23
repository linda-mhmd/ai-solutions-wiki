---
title: "Meta Ships Muse Spark 1.1 and Opens the Meta Model API"
description: "Meta Superintelligence Labs released Muse Spark 1.1, a multimodal reasoning model with a 1 million token context, and opened the Meta Model API in public preview, the first official developer API for Meta's own models."
date: 2026-07-17
lastmod: 2026-07-17
last_updated: 2026-07-17
categories: [News]
tags: [meta, muse-spark, model-api, multimodal, model-release]
related:
  - comparisons/llm-landscape-2026
  - news/apple-foundation-models-3
  - glossary/mixture-of-experts
---

Meta has models you can download and, until now, no official way to just call them. That changed on 9 July 2026, when Meta Superintelligence Labs released Muse Spark 1.1 and opened the Meta Model API in public preview. For the first time, Meta offers a first-party developer API for its own models, not only open weights you host yourself.

<figure class="bz-figure">
  <img src="/img/ai-machine/light-beams-junction-notext.png" alt="White light beams passing through dark-red junction machinery, suggesting routing and interconnection between systems." loading="lazy">
  <figcaption>An official API turns Meta's models from something you host into something you can call, changing the build-versus-download decision.</figcaption>
</figure>

## What happened

Meta Superintelligence Labs announced **Muse Spark 1.1**, a multimodal reasoning model aimed at agentic tasks, with a **1 million token context window**. It ships in a "Thinking" mode inside the Meta AI app and on meta.ai, and, more importantly for builders, through the new **Meta Model API**, which entered public preview alongside it.

The API is the headline. Meta's models have been available as open weights for years, which suited teams that could self-host but excluded everyone who wanted a hosted endpoint. A first-party Meta API means you can now reach Meta's models the same way you reach Anthropic's or OpenAI's: a key, an endpoint, pay per use.

## Why it matters for builders

This narrows a real gap. Until now, "use a Meta model" meant "run infrastructure," which put Llama and its successors out of reach for teams that just wanted an API call. A hosted Meta endpoint changes the [build-versus-buy calculus](/comparisons/llm-landscape-2026/): you can prototype against Meta models without a GPU, then decide later whether to self-host for control or cost.

Two caveats keep this grounded. It is a public preview, so treat availability, pricing, and rate limits as provisional until general availability. And an official API is a different trade-off from open weights: you gain convenience and lose the data-residency and offline guarantees that made Meta's open releases attractive in the first place. Choose the access path that matches your constraints, not the newest one.

## Sources

- Meta, "Introducing Muse Spark and the Meta Model API": https://ai.meta.com/blog/introducing-muse-spark-meta-model-api/

## Further reading

- [The 2026 LLM landscape](/comparisons/llm-landscape-2026/): how the model families and their access models compare.
- [Apple's on-device Foundation Models](/news/apple-foundation-models-3/): a different answer to the hosted-versus-local question.
- [What is a mixture of experts?](/glossary/mixture-of-experts/): the architecture behind most current multimodal models.
