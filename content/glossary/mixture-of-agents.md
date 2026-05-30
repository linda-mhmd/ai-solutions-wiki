---
title: "Mixture of Agents"
description: "How multi-LLM collaboration frameworks improve response quality by combining outputs from diverse language models."
date: 2026-03-28
categories: [Glossary]
tags: [mixture-of-agents, multi-LLM, ensemble, AI-collaboration, LLM]
related:
  - glossary/multi-agent-systems
  - glossary/multi-agent-orchestration
  - glossary/llm
  - glossary/ensemble-methods
last_updated: 2026-05-30
---

Mixture of Agents (MoA) is an approach where multiple large language models collaborate to produce higher-quality responses than any single model achieves alone. Rather than relying on one LLM, MoA routes a query through several models and synthesizes their outputs, leveraging the observation that LLMs can improve their responses when given other models' outputs as reference.

## How It Works

In a typical MoA setup, the process operates in layers. In the first layer, multiple diverse LLMs (called proposers) independently generate responses to the input query. In the second layer, one or more aggregator models receive all first-layer responses along with the original query and produce a refined synthesis. This can be extended to multiple layers, with each layer refining the previous layer's outputs.

The key insight is the **collaborativeness** property: most LLMs generate better responses when given reference answers from other models, even if those references are individually lower quality. By combining models with different strengths (one might excel at reasoning, another at factual accuracy, another at clear writing), the aggregated output captures the best aspects of each.

MoA differs from Mixture of Experts (MoE), which is an intra-model architecture. MoA operates at the system level, orchestrating multiple complete models. It can combine open-source and proprietary models, using cheaper models as proposers and a stronger model as the aggregator.

## Why It Matters

MoA demonstrates that model collaboration can surpass individual model capabilities without training new models. Benchmarks have shown MoA systems achieving scores above GPT-4 by combining multiple open-source models. This offers a path to state-of-the-art quality using commodity models and provides resilience against single-provider outages or limitations.

## Practical Considerations

MoA increases latency and cost proportionally to the number of models and layers. A two-layer MoA with three proposers and one aggregator requires four LLM calls per query. This is best suited for high-value, latency-tolerant applications like report generation, complex analysis, or quality-critical content. For real-time applications, single-model inference is usually more practical. Consider MoA when quality improvement justifies the cost multiplier, and start with a simple two-model setup before scaling to more complex configurations.

## Sources

- Wang, J., et al. (2024). Mixture-of-Agents enhances large language model capabilities. *arXiv:2406.04692*. (Original MoA paper; demonstrated collaborative LLM systems surpassing individual models.)
- Schuster, T., et al. (2022). Confident adaptive language modeling. *NeurIPS 2022*. (Adaptive compute allocation across multiple model tiers; conceptually related to MoA.)
