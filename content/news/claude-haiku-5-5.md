---
title: "Claude Haiku 5.5 Ships at $0.10/$0.50, and Sonnet 5.5 Cache Reads Halve"
description: "Anthropic released Claude Haiku 5.5 on 7 October 2026 at $0.10 per million input tokens and $0.50 output for prompts up to 100k tokens, about 75 percent cheaper than Haiku 4.5 on average, with the first effort setting on a Haiku model. Sonnet 5.5 cache reads drop to $0.10."
date: 2026-10-07
lastmod: 2026-10-08
last_updated: 2026-10-08
last_verified: 2026-10-08
categories: [News]
tags: [anthropic, claude, haiku, model-release, pricing, prompt-caching]
related:
  - news/claude-sonnet-5-5
  - news/claude-opus-5-5
  - tools/claude-anthropic
  - comparisons/llm-landscape-2026
---

Anthropic released Claude Haiku 5.5 on 7 October 2026, completing the 5.5 generation it announced alongside Opus 5.5 on 22 September. The model ID is `claude-haiku-5-5`. It is the cheapest Claude model by a wide margin, and the same release halved the cache-read price of Sonnet 5.5.

## What is actually different

**Price, in two tiers.** Haiku 5.5 is the first Claude model with a prompt-length price tier. Per million tokens:

| | Prompts up to 100k tokens | Prompts over 100k tokens | Haiku 4.5, for comparison |
| --- | --- | --- | --- |
| Input | $0.10 | $0.50 | $1.00 |
| Output | $0.50 | $2.50 | $5.00 |
| Cache reads | $0.01 | $0.05 | $0.10 |
| Cache writes (5 minutes) | $0.125 | $0.625 | $1.25 |
| Cache writes (1 hour) | $0.20 | $1.00 | $2.00 |

Anthropic says that works out at about 75 percent cheaper to run than Haiku 4.5 on average: 90 percent cheaper up to 100k tokens and 50 percent cheaper above. It also says Haiku 5.5 uses an updated tokenizer that produces slightly more tokens per task, so the real saving on your workload will be a little smaller than the per-token rates suggest. Measure it.

**Effort control.** Haiku 5.5 is the first Haiku-class model with an adjustable effort setting (low, medium, high, xhigh, max), so you can trade latency for quality per request rather than switching models.

**Speed.** Anthropic calls it its fastest model at standard speed, though Opus in fast mode is faster.

**Benchmarks.** Anthropic's own figures, not independently reproduced, set against Haiku 4.5 and Sonnet 5.5:

| Benchmark | Haiku 5.5 | Haiku 4.5 | Sonnet 5.5 |
| --- | --- | --- | --- |
| OSWorld 2.1 (offline subset) | 72.4% | 15.7% | 83.9% |
| Terminal-Bench 4.0 | 39.2% | 0.0% | 70.6% |
| Humanity's Last Exam, with tools | 57.4% | 18.7% | 64.5% |
| GDPval-AA v2.1 (Elo) | 1620 | 735 | 1840 |

The jumps over Haiku 4.5 are very large, and Haiku 4.5's 0.0 percent on Terminal-Bench 4.0 says more about how much the benchmark has moved since that model shipped than about either model. Compare Haiku 5.5 with what you use today on your own tasks, not with its predecessor's score.

**Sonnet 5.5 cache reads halve.** From the same day, Sonnet 5.5 cache reads drop from $0.20 to $0.10 per million tokens. Anthropic estimates that makes typical agentic work about 20 percent cheaper, because agent loops re-read long cached contexts on every turn.

**Also announced:** Max 5x plans now include $100 a month in API credits, Max 20x $200, and Team plans up to $500 pooled; and the Python and TypeScript SDKs add beta support for computer use and browser use.

Availability: the Claude Platform, Amazon Web Services, Google Cloud and Microsoft Azure. The announcement itself does not state limits, but Anthropic's models overview lists a 1 million token context window, 128K maximum output (300K on the Batches API with a beta header), adaptive thinking with a default effort of `medium`, a June 2026 knowledge cutoff, and retirement not sooner than 7 October 2027. The same page now lists Haiku 4.5 as a legacy model. Its published retirement floor is 15 October 2026, so if you still run it, migrate now.

## Why it matters for builders

The interesting number is the $0.01 cache read. Agents spend most of their tokens re-reading the same system prompt, tool definitions and history, and at $0.01 per million cached tokens that overhead nearly disappears for small-model sub-agents, routers and classifiers. If you run a large model as an orchestrator over many cheap workers, Haiku 5.5 is the new default worker to test.

Watch the 100k boundary. A prompt of 100,001 tokens is billed at five times the rate of one at 100,000, so long-context jobs are where Haiku 5.5 stops being dramatically cheaper. Keeping worker contexts short is now a cost lever, not only a quality one.

## Sources

- Anthropic, "Introducing Claude Haiku 5.5" (7 October 2026): https://www.anthropic.com/claude-haiku-5-5
- Anthropic newsroom index (accessed 8 October 2026): https://www.anthropic.com/news
- Anthropic, "Pricing" (fetched 8 October 2026), for both Haiku 5.5 price tiers including the 1-hour cache write and the Sonnet 5.5 cache-read rate: https://platform.claude.com/docs/en/about-claude/pricing
- Anthropic, "Models overview" (fetched 8 October 2026), for context window, maximum output, default effort, knowledge cutoff and retirement date: https://platform.claude.com/docs/en/about-claude/models/overview

## Further reading

- [Claude Sonnet 5.5](/news/claude-sonnet-5-5/): the middle tier, released on 28 September.
- [Claude Opus 5.5](/news/claude-opus-5-5/): the top tier and the original announcement of the 5.5 generation.
- [Claude by Anthropic](/tools/claude-anthropic/): the full lineup and access options.
- [The LLM landscape in 2026](/comparisons/llm-landscape-2026/): how small models compare across vendors.
