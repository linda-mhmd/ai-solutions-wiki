---
title: "DeepSeek Releases V4 Open-Weight Models"
description: "On 24 April 2026 DeepSeek released a preview of DeepSeek-V4-Pro and DeepSeek-V4-Flash as open weights under the MIT license on Hugging Face."
date: 2026-07-06
lastmod: 2026-07-06
last_updated: 2026-07-06
categories: [News]
tags: [deepseek, open-weights, mixture-of-experts, long-context, model-release]
related:
  - tools/deepseek
  - glossary/mixture-of-experts
  - glossary/long-context-model
---

On 24 April 2026 DeepSeek released a preview of two new open-weight models, DeepSeek-V4-Pro and DeepSeek-V4-Flash. Both ship with a 1 million token context window under the MIT license on Hugging Face. The release keeps DeepSeek's flagship line fully open.

## What happened

DeepSeek released a preview of DeepSeek-V4 on 24 April 2026. The release includes two models.

DeepSeek-V4-Pro has 1.6 trillion total parameters with 49 billion active. DeepSeek-V4-Flash has 284 billion total parameters with 13 billion active. Both models offer a 1 million token context window, and both are published as open weights under the MIT license on Hugging Face.

## Why it matters for builders

The large gap between total and active parameters marks these as {{< relref "glossary/mixture-of-experts" >}} designs: only a fraction of the network runs per token, so a 1.6 trillion parameter model activates 49 billion at inference. That keeps compute cost far below what the total size implies.

A 1 million token context window makes DeepSeek-V4 a {{< relref "glossary/long-context-model" >}}, suited to long documents, large codebases, and extended agent histories. The MIT license permits commercial use and self-hosting without restriction, which matters for teams that need to run models on their own infrastructure. See {{< relref "tools/deepseek" >}} for deployment options.

## Sources

1. DeepSeek. "DeepSeek-V4 release" (24 April 2026). [https://api-docs.deepseek.com/news/news260424](https://api-docs.deepseek.com/news/news260424)

## Further reading

- [The 2026 LLM landscape](/comparisons/llm-landscape-2026/): how DeepSeek-V4 compares to other open and closed models.
- [What is mixture of experts?](/glossary/mixture-of-experts/): the design behind the large total-versus-active parameter gap.
- [Long-context models](/glossary/long-context-model/): what a 1M-token window does and does not buy you.
- [NVIDIA Nemotron 3 open models](/news/nvidia-nemotron-3/): another major open-weight family from 2026.
