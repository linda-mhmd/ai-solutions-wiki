---
title: "Agentic Context Engineering (ACE)"
description: "A self-improvement method where an agent curates its own context as a growing playbook using Generator, Reflector, and Curator roles."
date: 2026-07-06
lastmod: 2026-07-06
last_updated: 2026-07-06
categories: [Glossary]
tags: ["ai-ml", "advanced", "context", "agents"]
related:
  - glossary/context-engineering
  - glossary/agent-memory
  - glossary/context-rot
  - glossary/fine-tuning
---

Agentic Context Engineering (ACE) is a self-improvement method in which an agent curates its own context as a growing "playbook." Rather than updating the model's weights, the agent accumulates and refines the information it carries in context, so it improves from experience over time.

## How it works

ACE builds on {{< relref "glossary/context-engineering" >}} and organizes self-improvement around three roles. A Generator produces candidate behaviour and outputs. A Reflector reviews that behaviour and extracts lessons. A Curator decides what to keep, folding useful detail into the evolving playbook. This treats context as durable {{< relref "glossary/agent-memory" >}} that the agent maintains itself.

Because the playbook grows through curation, ACE lets an agent improve without {{< relref "glossary/fine-tuning" >}}, avoiding the cost of retraining. The curation step is designed to prevent "context collapse," the loss of accumulated detail that can occur when context is rewritten carelessly, a failure mode related to {{< relref "glossary/context-rot" >}}.

## Origins and History

Agentic Context Engineering was introduced by Zhang, Hu, Olukotun, Zou, and colleagues at Stanford, SambaNova, and UC Berkeley in "Agentic Context Engineering: Evolving Contexts for Self-Improving Language Models" (arXiv 2510.04618), released on 6 October 2025. The paper defines the Generator, Reflector, and Curator roles and frames ACE as a way for language models to self-improve by evolving their contexts while avoiding context collapse.

## Sources

1. Zhang, Hu, Olukotun, Zou, et al. (Stanford, SambaNova, UC Berkeley). "Agentic Context Engineering: Evolving Contexts for Self-Improving Language Models" (6 October 2025). [https://arxiv.org/abs/2510.04618](https://arxiv.org/abs/2510.04618)
