---
title: "Multi-Model Routing"
description: "How to route each query to the right LLM to cut cost and add reliability, using predictive routers, cascades, semantic routing, and AI gateways."
date: 2026-06-23
categories: [Guides]
tags: ["routing", "llm", "cost-optimization", "reliability", "gateways", "inference"]
tools: []
related: [ "guides/llm-gateway-architecture", "comparisons/small-vs-large-language-models", "guides/llm-cost-optimization", "guides/context-engineering", "comparisons/llm-landscape-2026" ]
last_updated: 2026-06-23
---

Sending every query to one frontier model wastes money. Most prompts are easy, and a cheaper model answers them at a fraction of the price. Multi-model routing picks the right model per query, so you pay frontier prices only when a request needs frontier reasoning. Routing also removes a single point of failure: when one provider is down, traffic shifts to another.

<figure class="bz-figure">
  <img src="/img/obsidian-lab/hub-spokes-orchestration-notext.png" alt="A central mechanical hub with copper arms radiating to several connected points. No em-dashes." loading="lazy">
  <figcaption>A router behaves like this hub: each incoming query travels down the one arm that reaches the model best suited to answer it.</figcaption>
</figure>

## The routing decision

Routing is a classification problem. You inspect a query, judge how hard it is, and send it to a model that fits. Easy queries go to a small, cheap model. Hard queries go to a strong, expensive model. A fallback path catches failures.

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 1</span>
    <span class="bz-flow-step-name">Classify query</span>
    <span class="bz-flow-step-desc">Read the prompt and estimate its difficulty, topic, and required capability.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 2</span>
    <span class="bz-flow-step-name">Route by complexity</span>
    <span class="bz-flow-step-desc">Decide whether a weak model can answer or a strong model is needed.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 3</span>
    <span class="bz-flow-step-name">Cheap or strong model</span>
    <span class="bz-flow-step-desc">Call the small model for easy work, the frontier model for hard work.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 4</span>
    <span class="bz-flow-step-name">Fallback</span>
    <span class="bz-flow-step-desc">On error or low confidence, retry on a second model or escalate.</span>
  </div>
</div>

## The problem: one model for everything

One frontier model for every request fails on two fronts.

First, cost. Most production traffic is repetitive and easy: short answers, simple classification, format conversions. A frontier model answers those, but you pay a premium for capability you do not use. Per-token API prices differ by two orders of magnitude across providers, so the gap between the cheapest and most expensive option is large. [4]

Second, reliability. One model means one provider, one API key, one rate limit, and one outage that stops your product. A single dependency is a single point of failure. Spreading traffic across models and providers removes that risk.

Routing answers both problems at once. You match each query to the cheapest model that can handle it, and you keep a backup ready when the primary model fails.

## Routing strategies

Four strategies dominate. They differ in how they decide and in how much they cost to run the decision itself.

### Predictive and preference routing

A predictive router learns to choose between a stronger and a weaker model before either runs. RouteLLM trains router models on human preference data, then picks the right model per query. The paper reports that routing can reduce costs by over 2x in some cases without compromising response quality. [1]

The numbers are concrete. Evaluated on MT Bench, MMLU, and GSM8K, RouteLLM achieved cost reductions of over 85% on MT Bench, 45% on MMLU, and 35% on GSM8K while reaching 95% of GPT-4 performance. [2][3] On MT Bench, it reached 95% of GPT-4 performance while calling GPT-4 only 26% of the time. [2] The other 74% of queries went to a cheaper model and still satisfied users.

Use predictive routing when you have two tiers (one strong, one weak) and want to maximise how much traffic the weak model absorbs.

### Cascades

A cascade tries the cheap model first, then escalates only if the answer looks weak. FrugalGPT names three cost-reduction strategies: prompt adaptation, LLM approximation, and LLM cascade. [4] The cascade calls models in sequence and stops at the first acceptable answer.

FrugalGPT reports it can match the best individual LLM (for example GPT-4) with up to 98% cost reduction, or improve accuracy by 4% at the same cost. [4] The trade-off is latency: an escalated query runs two models instead of one. Use a cascade when you can score answer quality cheaply and most queries pass on the first try.

### Semantic and embedding routing

Semantic routing makes the decision in embedding space, without calling an LLM to classify. The semantic-router library from Aurelio Labs maps a query to vectors and matches it against predefined routes. This cuts routing latency from about 5000ms to about 100ms compared to using an LLM as the classifier. [11]

Embedding routing scales to large workloads. The vLLM semantic router paper reports a 10.2 percentage-point accuracy gain on MMLU-Pro while cutting latency 47.1% and token use 48.5% versus direct inference. [5] The router decides which queries need step-by-step reasoning and which do not, so you spend reasoning tokens only where they help.

Use semantic routing when routing latency matters and your routes map to clear topics or intents.

### Task-complexity routing

Task-complexity routing groups queries by the capability they demand. Code generation, long-context analysis, and multi-step math go to strong models. Summaries, extraction, and classification go to small models. You can implement this with simple rules, with a classifier, or with the embedding approach above. It pairs well with the comparison in [small vs large language models](/comparisons/small-vs-large-language-models/).

## LLM gateways and what they add

A gateway sits between your code and the model providers. It gives you one API for many models, plus the operational features you would otherwise build yourself.

LiteLLM gives one OpenAI-format interface to 100+ LLM APIs with cost tracking, load balancing, and logging. [6] You write OpenAI-style calls and swap the model name to switch providers. Portkey's AI Gateway routes to 1,600+ LLMs with fallback on failed requests, weighted load balancing, and conditional routing. [7] Cloudflare AI Gateway offers caching, rate limiting, request retry and fallback, and dynamic routing. [8] OpenRouter exposes one OpenAI-compatible endpoint to 500+ models from 60+ providers, and a `models` array enables fallback on context-length errors, moderation, rate limits, and downtime. [9]

The shared value is the same: one API, automatic fallback, load balancing, and caching. You get reliability features without writing retry loops and provider adapters by hand. For a deeper architectural view, see the [LLM gateway architecture](/guides/llm-gateway-architecture/) guide.

<div class="bz-arch">
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Your app</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Chat endpoint</span>
      <span class="bz-arch-chip">Agent loop</span>
      <span class="bz-arch-chip-note">Speaks one API format</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Gateway</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Routing</span>
      <span class="bz-arch-chip">Fallback</span>
      <span class="bz-arch-chip">Caching</span>
      <span class="bz-arch-chip">Load balancing</span>
      <span class="bz-arch-chip-note">One place for cost and reliability</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Providers</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Small model</span>
      <span class="bz-arch-chip">Frontier model</span>
      <span class="bz-arch-chip">Local model</span>
      <span class="bz-arch-chip-note">Swapped by name, not by rewrite</span>
    </div>
  </div>
</div>

## Recommenders versus proxies

Two designs route traffic, and they sit in different places.

A proxy stands in the request path. Your call goes to the proxy, the proxy calls the model, and the response comes back through the proxy. LiteLLM, Portkey, Cloudflare AI Gateway, and OpenRouter work this way. The proxy sees your prompt, so it can cache, log, and fail over. The cost is that your traffic flows through another service.

A recommender stays out of the path. It predicts the best model for an input, you call that model yourself, and your prompts never touch the recommender. Not Diamond is a recommender, not a proxy. It predicts the best model per input and supports cost or latency trade-offs, and prompts and keys do not pass through its servers. [10] Choose a recommender when you want routing intelligence but must keep prompts and keys on your own infrastructure.

## Reliability and failover

Routing is also a reliability tool. The same gateways that cut cost give you automatic failover.

Cloudflare AI Gateway offers caching, rate limiting, request retry and fallback, and dynamic routing, so a failed call retries or shifts to another model without app changes. [8] OpenRouter's `models` array enables fallback on context-length errors, moderation, rate limits, and downtime. [9] You list models in priority order, and the gateway walks the list until one succeeds.

Build failover into the default path, not as an afterthought. List a primary model, a same-capability backup from a second provider, and a small model as a last resort. When the primary fails, traffic moves on its own.

## Code: a gateway call with fallbacks

This example uses LiteLLM. It tries a cheap model first and falls back through a list when a call fails. LiteLLM speaks the OpenAI format, so the same code targets any supported provider by name. [6]

```python
from litellm import completion

# Models in priority order: cheap first, strong backups after.
model_list = [
    "openai/gpt-4o-mini",          # cheap default
    "anthropic/claude-haiku-4-5",  # backup, different provider
    "openai/gpt-4o",               # strong last resort
]

def route_with_fallback(prompt: str) -> str:
    messages = [{"role": "user", "content": prompt}]
    last_error = None
    for model in model_list:
        try:
            response = completion(model=model, messages=messages)
            return response["choices"][0]["message"]["content"]
        except Exception as error:  # rate limit, outage, context length
            last_error = error
            continue
    raise RuntimeError(f"All models failed. Last error: {last_error}")

print(route_with_fallback("Summarise this support ticket in one line."))
```

For a cascade, you escalate by quality instead of by error. Call the cheap model, score its answer, and call the strong model only when the score is low.

```python
from litellm import completion

def confidence(answer: str) -> float:
    # Replace with a real scorer: a judge model, a heuristic, or logprobs.
    return 0.9 if len(answer) > 20 else 0.3

def cascade(prompt: str, threshold: float = 0.5) -> str:
    messages = [{"role": "user", "content": prompt}]

    cheap = completion(model="openai/gpt-4o-mini", messages=messages)
    cheap_answer = cheap["choices"][0]["message"]["content"]
    if confidence(cheap_answer) >= threshold:
        return cheap_answer  # most queries stop here

    strong = completion(model="openai/gpt-4o", messages=messages)
    return strong["choices"][0]["message"]["content"]

print(cascade("Explain the trade-offs of optimistic locking."))
```

## Comparison: gateways and routers

| | Type | Key feature | Prompts pass through |
|---|---|---|---|
| **LiteLLM** | Proxy / library | OpenAI format for 100+ APIs, cost tracking | Yes |
| **OpenRouter** | Proxy | One endpoint to 500+ models, `models` fallback array | Yes |
| **Portkey** | Proxy | 1,600+ LLMs, conditional routing, weighted balancing | Yes |
| **Cloudflare AI Gateway** | Proxy | Caching, rate limiting, retry, dynamic routing | Yes |
| **Not Diamond** | Recommender | Predicts best model per input, cost or latency tuning | No |
| **semantic-router** | Library | Embedding-space routing, about 100ms decisions | No |

## Further reading

- [RouteLLM: Learning to Route LLMs with Preference Data](https://arxiv.org/abs/2406.18665): the paper behind preference-based routing and the over 2x cost results.
- [RouteLLM blog (LMSYS)](https://www.lmsys.org/blog/2024-07-01-routellm/): the benchmark results on MT Bench, MMLU, and GSM8K explained.
- [FrugalGPT](https://arxiv.org/abs/2305.05176): prompt adaptation, LLM approximation, and cascades, with up to 98% cost reduction.
- [When to Reason: Semantic Router for vLLM](https://arxiv.org/abs/2510.08731): embedding routing that cuts latency and tokens while raising accuracy.
- [semantic-router (Aurelio Labs)](https://github.com/aurelio-labs/semantic-router): MIT library for routing decisions in embedding space.
- [LiteLLM](https://github.com/BerriAI/litellm): OpenAI-format gateway for 100+ LLM APIs with fallback and cost tracking.
- [Cloudflare AI Gateway docs](https://developers.cloudflare.com/ai-gateway/): caching, retry, fallback, and dynamic routing as a managed service.
- [Not Diamond routing docs](https://docs.notdiamond.ai/docs/quickstart-routing): a recommender that keeps prompts and keys off its servers.
- [LLM gateway architecture](/guides/llm-gateway-architecture/): how to place a gateway in your stack.
- [Small vs large language models](/comparisons/small-vs-large-language-models/): how to pick the model tier each route targets.
- [LLM cost optimization](/guides/llm-cost-optimization/): broader tactics beyond routing to lower spend.
- [Context engineering](/guides/context-engineering/): shaping inputs so each model performs at its best.
- [LLM landscape 2026](/comparisons/llm-landscape-2026/): the models you route between this year.
