---
title: "Claude Sonnet 5.5 Lands at $2/$10, Faster and Cheaper Than Sonnet 5"
description: "Anthropic released Claude Sonnet 5.5 on 28 September 2026 at $2 per million input tokens and $10 per million output, saying it runs over 30 percent faster than Sonnet 5 and needs fewer tokens per task. It also ships classifiers aimed at distillation attacks."
date: 2026-09-28
lastmod: 2026-10-08
last_updated: 2026-10-08
last_verified: 2026-10-08
categories: [News]
tags: [anthropic, claude, sonnet, model-release, pricing, bedrock, distillation]
related:
  - news/claude-opus-5-5
  - news/claude-sonnet-5
  - news/claude-sonnet-5-pricing-permanent
  - tools/claude-anthropic
  - comparisons/llm-landscape-2026
---

Anthropic released Claude Sonnet 5.5 on 28 September 2026. The headline for anyone running Sonnet in production is not a new capability tier but the cost curve: Anthropic says the model runs more than 30 percent faster than Sonnet 5 and costs up to 30 percent less for most work, partly because it needs fewer tokens to finish a task.

## What is actually different

Pricing is $2 per million input tokens and $10 per million output tokens, with cache reads at $0.20 and cache writes at $2.50. (Update, 8 October 2026: Anthropic halved Sonnet 5.5 cache reads to $0.10 on 7 October, alongside the [Haiku 5.5 release](/news/claude-haiku-5-5/). Anthropic's pricing page and models overview now also publish the 1M-token context window and 128K maximum output that the release post left out.) The model id is `claude-sonnet-5-5`. It is available on the Claude Platform and through Amazon Web Services, Google Cloud and Microsoft Azure, with a zero data retention option.

The benchmark numbers below are Anthropic's own, published with the release, and have not been independently reproduced:

| Benchmark | Sonnet 5.5 |
| --- | --- |
| Terminal-Bench 4.0 | 70.6 percent (Sonnet 5: 10.3 percent) |
| FrontierCode 1.1, Max effort | 46.2 percent |
| CursorBench 4.0 | 55.5 percent |
| GDPval-AA v2.1 | 1844 |
| OSWorld 2.1, partial | 80.1 percent |
| Chartography, no tools | 61.6 percent |

The Terminal-Bench jump from 10.3 to 70.6 percent is large enough to be worth treating with care. A gap that size usually means the harness, the scaffold or the scoring changed alongside the model, not that one model generation improved sevenfold at the same task. Read it as a vendor claim until someone outside Anthropic runs it.

Anthropic also states Sonnet 5.5 is the first Sonnet model to finish Pokemon Red from screenshots alone. That is a long-horizon agentic signal rather than a production benchmark, but it is the kind of task that breaks on context handling and state tracking rather than on raw reasoning.

## Why it matters for builders

Three practical points.

First, the price did not move. Sonnet 5.5 holds Sonnet 5's $2/$10, which has been the Sonnet rate since June 2026 and was made permanent in August. What is new is the company it keeps: OpenAI's [GPT-6.1 Sol](/news/openai-gpt-6-1-sol/) arrived a day later carrying GPT-6 Sol's existing $2/$10, and Google's [Gemini 4 Argon](/news/gemini-4-argon/) was announced two days later at $2/$10 introductory. So this is not three vendors cutting prices in one week. It is a price point that has held for a quarter, now reached from above by Google's frontier tier as well. For cost modelling, $2/$10 is the number to plan against for this capability class, and the real differentiators are cached-input rates, latency, and how many tokens a model burns per completed task.

Second, the token efficiency claim matters more than the per-token price. A model that costs 30 percent less per token and also uses fewer tokens compounds. It also makes benchmark cost comparisons unreliable unless they measure total tokens spent per completed task rather than price per million.

Third, the safeguards. Anthropic says Sonnet 5.5 ships with cybersecurity safeguards comparable to Opus 5.5, keeps the same biology safeguards as Sonnet 5, and adds safety classifiers aimed at distillation attacks. That last one is not a detail. In the same week, OpenAI published its account of a [coordinated distillation campaign](/news/openai-moonshot-distillation-campaign/) against its reasoning traces. Model vendors are now treating their own intermediate reasoning as an asset to defend, which has a direct consequence for builders: expect hidden reasoning to stay hidden, and do not design systems that depend on reading it.

## Sources

- Anthropic, "Introducing Claude Sonnet 5.5" (28 September 2026): https://www.anthropic.com/claude-sonnet-5-5
- Anthropic newsroom index (accessed 3 October 2026): https://www.anthropic.com/news
- Anthropic, "Pricing" (fetched 8 October 2026), for the 7 October cache-read cut: https://platform.claude.com/docs/en/about-claude/pricing

## Further reading

- [Claude Opus 5.5](/news/claude-opus-5-5/): the Opus tier released six days earlier.
- [Claude by Anthropic](/tools/claude-anthropic/): the full current lineup and access options.
- [The LLM landscape in 2026](/comparisons/llm-landscape-2026/): how the tiers compare across vendors.
