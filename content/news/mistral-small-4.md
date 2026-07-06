---
title: "Mistral Small 4 Unifies Reasoning, Vision, and Coding"
description: "Mistral AI announced Mistral Small 4 on 16 March 2026 under Apache 2.0, its first model to unify reasoning, multimodal, and agentic coding in one self-hostable model."
date: 2026-07-06
lastmod: 2026-07-06
last_updated: 2026-07-06
categories: [News]
tags: [mistral, apache-2, mixture-of-experts, multimodal, model-release]
related:
  - tools/mistral-ai
  - glossary/mixture-of-experts
  - glossary/multimodal-model
---

Mistral AI announced Mistral Small 4 on 16 March 2026 under the Apache 2.0 license. It is the first Mistral model to unify reasoning, multimodal, and agentic coding capabilities in a single self-hostable model. The design folds three prior model lines into one.

## What happened

Mistral AI announced Mistral Small 4 on 16 March 2026 under the Apache 2.0 license.

It is the first Mistral model to unify the capabilities of Magistral (reasoning), Pixtral (multimodal), and Devstral (agentic coding) into a single self-hostable model. Mistral Small 4 has 119 billion total parameters with about 6 billion active and a 256K context window.

## Why it matters for builders

Combining reasoning, vision, and coding in one model removes the need to route between three separate systems. For teams building agents, one model that reasons, reads images, and writes code simplifies the stack and cuts the coordination overhead of switching between specialized checkpoints.

The parameter split - 119 billion total with about 6 billion active - marks a {{< relref "glossary/mixture-of-experts" >}} design that keeps inference cost low relative to the total size. Because it inherits Pixtral's vision, Mistral Small 4 acts as a {{< relref "glossary/multimodal-model" >}} in the same package. The Apache 2.0 license and self-hostable form make it a fit for on-premise and regulated deployments. See {{< relref "tools/mistral-ai" >}} for details.

## Sources

1. Mistral AI. "Mistral Small 4" (16 March 2026). [https://mistral.ai/news/mistral-small-4/](https://mistral.ai/news/mistral-small-4/)
