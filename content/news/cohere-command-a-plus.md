---
title: "Cohere Command A+ Ships Under Apache 2.0"
description: "Cohere announced Command A+ on 20 May 2026, its first Mixture-of-Experts model, released with open weights under Apache 2.0 and support for 48 languages."
date: 2026-07-06
lastmod: 2026-07-06
last_updated: 2026-07-06
categories: [News]
tags: [cohere, apache-2, mixture-of-experts, sovereign-ai, model-release]
related:
  - tools/cohere
  - glossary/mixture-of-experts
  - glossary/sovereign-ai
---

Cohere announced Command A+ on 20 May 2026. It is Cohere's first Mixture-of-Experts model, released with open downloadable weights under Apache 2.0. The model expands language support to 48 languages and targets enterprise and sovereign deployment.

## What happened

Cohere announced Command A+ on 20 May 2026. It is the company's first Mixture-of-Experts model.

Command A+ ships with open downloadable weights under the Apache 2.0 license. It expands language support to 48 languages, including all official European Union languages. Cohere positions the model for enterprise and sovereign deployment.

## Why it matters for builders

Cohere's move to a {{< relref "glossary/mixture-of-experts" >}} architecture brings the efficiency of sparse activation to its Command line, where only part of the network runs per token. That lowers inference cost for the enterprise workloads Cohere targets.

Open weights under Apache 2.0 plus coverage of all official European Union languages make Command A+ a direct fit for {{< relref "glossary/sovereign-ai" >}} programs, where organizations must keep models and data within their own jurisdiction and infrastructure. Teams that need to self-host for legal or residency reasons can download and run the model without a licensing barrier. See {{< relref "tools/cohere" >}} for integration details.

## Sources

1. Cohere. "Introducing Command A+" (20 May 2026). [https://cohere.com/blog/command-a-plus](https://cohere.com/blog/command-a-plus)

## Further reading

- [The 2026 LLM landscape](/comparisons/llm-landscape-2026/): how Command A+ compares to other open-weight models.
- [What is mixture of experts?](/glossary/mixture-of-experts/): the sparse design Command A+ adopts.
- [What is sovereign AI?](/glossary/sovereign-ai/): the self-hosting, data-residency use case it targets.
- [Cohere](/tools/cohere/): models and integration.
