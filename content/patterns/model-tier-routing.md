---
title: "Model Tier Routing - Matching Request Complexity to Model Cost"
description: "Route AI requests to different model tiers based on complexity, cost sensitivity, and quality requirements. Reduce spend without sacrificing quality where it matters."
date: 2026-03-28
categories: [Patterns]
tags: [cost-optimization, routing, multi-model, inference, architecture]
related:
  - patterns/ai-gateway-pattern
  - patterns/fallback-chain
  - patterns/plan-and-execute
  - patterns/direct-model-interface
last_updated: 2026-05-30
---

Not every request needs your most expensive model. A simple classification task does not require the same compute as a complex multi-step analysis. Model tier routing evaluates incoming requests and directs them to the appropriate model tier - small, medium, or large - based on task complexity, quality requirements, and cost constraints. Organizations that implement tiered routing typically reduce their inference costs by 40-70% while maintaining output quality on the requests that matter most.

## Tiering Strategy

**Tier 1: Small models** - Fast, cheap, high throughput. Handle classification, entity extraction, simple Q&A, format conversion, and other well-defined tasks. Models like Claude Haiku or GPT-4o-mini. Cost per million tokens is a fraction of larger models.

**Tier 2: Mid-range models** - Balance of capability and cost. Handle summarization, moderate reasoning tasks, code generation for common patterns, and multi-step tasks with known structure. Claude Sonnet class models sit here.

**Tier 3: Frontier models** - Maximum capability. Reserved for complex reasoning, novel problem-solving, nuanced writing, and tasks where quality directly impacts business outcomes. Claude Opus class or equivalent. Use sparingly and deliberately.

## Routing Mechanisms

**Keyword and pattern-based routing** - Simple rules that match request patterns to tiers. Requests containing "classify," "extract," or "translate" route to Tier 1. Requests with "analyze," "compare," or "summarize" route to Tier 2. Everything else defaults to Tier 3. This is crude but effective as a starting point and adds zero latency.

**Classifier-based routing** - A small model evaluates each request and predicts which tier should handle it. Train the classifier on labeled examples of requests and their optimal tier assignments. The classifier adds a small latency overhead (50-100ms) but produces better routing decisions than static rules.

**Confidence-based escalation** - Route everything to Tier 1 first. If the small model's confidence score is below a threshold, escalate to Tier 2. If Tier 2 is also uncertain, escalate to Tier 3. This optimistic approach minimizes cost because most requests never leave Tier 1, but adds latency for escalated requests due to multiple model calls.

**User-segment routing** - Different user segments get different default tiers. Free-tier users route to Tier 1, standard users to Tier 2, enterprise users to Tier 3. Simple to implement and aligns cost with revenue.

## Implementation Considerations

**Measure before routing** - Before building a routing system, profile your actual request distribution. Sample 1,000 requests and run them through all tiers. Compare output quality. You may discover that 80% of your requests produce identical quality across all tiers, making the routing decision obvious for the majority of traffic.

**Set quality baselines** - Define minimum acceptable quality for each request type. Use automated evaluation (LLM-as-judge, regex checks, schema validation) to verify that the assigned tier meets the quality bar. If quality drops below the threshold, escalate.

**Monitor tier distribution** - Track what percentage of requests route to each tier over time. If Tier 3 usage is climbing, investigate whether the routing logic is degrading or whether request complexity is genuinely increasing.

**Avoid over-engineering** - A three-tier system handles most use cases. Adding more tiers increases routing complexity without proportional benefit. Start with two tiers (cheap and capable) and add a middle tier only when you have clear evidence it improves the cost-quality trade-off.

## Cost Modeling

Build a cost model that maps request types to tiers and projects monthly spend. Include: average tokens per request by type, request volume by type, cost per token by tier, and expected quality scores. Update the model monthly with actual usage data. This model becomes your primary tool for optimizing the routing configuration.

The cost difference between tiers is substantial. At current pricing, routing a million requests from a frontier model to a small model can save thousands of dollars monthly. Even modest improvements in routing accuracy translate to significant cost reductions at scale.
