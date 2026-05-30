---
title: "LLM Routing"
description: "Architectures that direct each request to one of several available language models based on cost, capability, latency, or quality requirements: the multi-model production pattern."
date: 2026-05-08
lastmod: 2026-05-08
categories: [Glossary]
tags: ["ai-ml", "intermediate", "llm", "architecture", "cost-optimization", "production"]
related:
  - glossary/llm
  - glossary/foundation-models
  - glossary/ai-gateway
  - glossary/reasoning-models
  - glossary/llm-as-a-judge
  - glossary/inference-time-compute
last_updated: 2026-05-30
---

LLM routing is the architectural pattern of dispatching each incoming request to one of several available language models, chosen at runtime based on the request's characteristics and the models' cost, capability, latency, and reliability profiles. Routing is the production answer to a market with heterogeneous models: cheap fast models (Haiku, Mini, Flash, 8B-class open models) handle the majority of traffic, while expensive capable models (Opus, GPT-5, Sonnet thinking, Gemini 2.5 Pro, R1) are reserved for the queries that need them. A well-tuned router reduces aggregate cost by 5–20× over an "always use the most capable model" baseline while preserving end-to-end quality.

## Why Routing Matters

The cost gap between flagship and economy tier models within the same provider is typically 10–30× per token; cross-provider it can exceed 100×. Most production traffic is dominated by simple queries, extractions, classifications, lookups, formatted summaries, that economy-tier models handle indistinguishably from flagship models. Sending all traffic to the flagship is a structural waste; sending all traffic to the economy tier degrades quality on the hard subset. Routing recovers the Pareto frontier.

The empirical result (Ong et al., 2024, RouteLLM; Šakota et al., 2024, FORC; Hu et al., 2024, RouterBench) is that learned routers can match flagship-only quality at 30–80% of the cost on representative production workloads.

## Routing Strategies

Routers fall into a few well-studied classes:

### 1. Static rule-based routing

Hand-coded rules dispatch by request type, user tier, query length, or task. Cheap to operate, transparent, easy to audit. Sufficient when the request distribution decomposes cleanly (e.g. "summarisation → cheap; code generation → flagship"). Fragile when distributions shift.

### 2. Cascading

Try the cheap model first; if a quality check fails, escalate to the expensive model. The cheap-first call is "wasted" on hard queries but free on easy ones. Quality checks include:

- Self-rated confidence (the model rates its own answer)
- Verifier checks (compile, test, schema validation)
- LLM-as-a-judge gating
- Heuristics (length, refusal patterns, hedging)

The classical FrugalGPT result (Chen et al., 2023) showed cascades can match GPT-4 quality at ~2% of the cost on standard benchmarks.

### 3. Learned predictive routing

Train a small classifier, a few-billion-parameter model or even a sentence-transformer, to predict which model will produce the highest-quality answer for a given query. RouteLLM (Ong et al., 2024) trains routers on Chatbot Arena preference data; FrugalGPT (Chen et al., 2023) routes between API tiers; Hybrid LLM (Ding et al., 2024) routes between local and remote models.

The classifier inference cost (typically <1ms) is negligible relative to LLM inference, so the routing decision is effectively free.

### 4. Speculative routing

The cheap model generates a draft; the expensive model is invoked only on verification or refinement (related to but distinct from speculative decoding within a single model). Common in reasoning-heavy pipelines where the cheap model proposes and the expensive model checks.

### 5. Capability-aware routing

The router knows the *capability profile* of each model (function calling support, vision, tool use, max context length, language coverage, jurisdictional residency) and routes by hard requirements. A request involving a 200K-token document goes only to long-context models; a request from an EU customer with data-residency requirements is routed only to EU-region endpoints.

## Engineering Considerations

- **Cost vs quality measurement is non-trivial.** "Cheap model is 95% as good" is meaningless without per-segment evaluation. Measure quality on representative slices of production traffic, not generic benchmarks.
- **Drift.** Provider model updates (silent quality shifts on the same model name) and traffic distribution changes both invalidate the router. Continuous evaluation, not one-shot calibration.
- **Latency vs cost.** A cascade adds latency on the escalation path; predictive routing adds a (small) fixed inference. For interactive chat, predictive routing usually wins; for batch, cascades may.
- **Failover separate from routing.** Provider outages happen. Capability-aware routers should have circuit breakers and fallback paths that are *independent* of the cost/quality routing logic.
- **Rate limit awareness.** Routers should know per-provider quotas and back off before hitting them, dispatching overflow to alternates.
- **Observability.** Log every routing decision, the chosen model, the request features, and the outcome. Without this, the router is unauditable and unimprovable.
- **Alignment with caching.** [Prompt caching](/glossary/prompt-caching/) is per-model. A request that hits the cache on model A is much cheaper there than on model B; the router should incorporate cache-state when relevant.

## Frameworks and Tools

- **LiteLLM**: universal proxy with built-in routing, fallbacks, retries, cost tracking.
- **OpenRouter**: managed routing service with curated model catalogue.
- **Portkey, Helicone, Langfuse, Datadog LLM Observability**: gateway / observability layers that include routing primitives.
- **AWS Bedrock + intelligent prompt routing**: managed routing across Bedrock-hosted models.
- **NVIDIA NIM, vLLM, SGLang**: local-serving stacks with routing primitives for self-hosted multi-model setups.
- **RouteLLM, RouterBench**: open research routers and benchmarks.

See also [AI Gateway](/glossary/ai-gateway/) for the broader operational layer.

## When Not to Route

Routing is overhead. Skip it when:

- A single model meets quality and cost requirements (don't add complexity for nothing).
- The request volume is low enough that flagship-only cost is already trivial.
- Strict reproducibility / determinism is required (routing across model versions makes outputs harder to reproduce).
- Compliance constraints require a single audited model (financial services with specific model attestation requirements).

## Related Concepts

- [AI Gateway](/glossary/ai-gateway/): the runtime layer that often hosts routing
- [LLM as a Judge](/glossary/llm-as-a-judge/): frequently used as the quality gate in cascading routers
- [Inference-Time Compute](/glossary/inference-time-compute/): routing is a way to allocate inference compute optimally
- [Reasoning Models](/glossary/reasoning-models/): common to route only the hardest queries to reasoning models
- [Prompt Caching](/glossary/prompt-caching/): interacts with routing decisions
- [Cost Optimization (AWS Well-Architected pillar)](/glossary/cost-optimization-pillar/)

## Sources and Further Reading

- Chen, L., Zaharia, M., Zou, J. (2023). *FrugalGPT: How to Use Large Language Models While Reducing Cost and Improving Performance.* arXiv:2305.05176. [https://arxiv.org/abs/2305.05176](https://arxiv.org/abs/2305.05176)
- Ong, I., Almahairi, A., Wu, V., et al. (2024). *RouteLLM: Learning to Route LLMs with Preference Data.* arXiv:2406.18665. [https://arxiv.org/abs/2406.18665](https://arxiv.org/abs/2406.18665)
- Šakota, M., Peyrard, M., West, R. (2024). *FORC: Fly-Swat or Cannon? Cost-Effective Language Model Choice via Meta-Modeling.* WSDM 2024. arXiv:2308.06077. [https://arxiv.org/abs/2308.06077](https://arxiv.org/abs/2308.06077)
- Hu, Q. J., Bieker, J., Li, X., et al. (2024). *RouterBench: A Benchmark for Multi-LLM Routing System.* arXiv:2403.12031. [https://arxiv.org/abs/2403.12031](https://arxiv.org/abs/2403.12031)
- Ding, D., Mallick, A., Wang, C., et al. (2024). *Hybrid LLM: Cost-Efficient and Quality-Aware Query Routing.* ICLR 2024. arXiv:2404.14618. [https://arxiv.org/abs/2404.14618](https://arxiv.org/abs/2404.14618)
- Lu, K., Yuan, H., Lin, R., et al. (2024). *Routing to the Expert: Efficient Reward-guided Ensemble of Large Language Models.* NAACL 2024. arXiv:2311.08692. [https://arxiv.org/abs/2311.08692](https://arxiv.org/abs/2311.08692)
- Jiang, D., Ren, X., Lin, B. Y. (2023). *LLM-Blender: Ensembling Large Language Models with Pairwise Ranking and Generative Fusion.* ACL 2023. arXiv:2306.02561. [https://arxiv.org/abs/2306.02561](https://arxiv.org/abs/2306.02561)
- AWS. *Amazon Bedrock intelligent prompt routing.* [https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-routing.html](https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-routing.html)
- LiteLLM documentation. [https://docs.litellm.ai/](https://docs.litellm.ai/)
