---
title: "Anthropic Cancels the Sonnet 5 Price Rise and Makes $2/$10 Permanent"
description: "Claude Sonnet 5's introductory pricing was due to rise 50% to $3/$15 per million tokens on 1 September 2026. On 10 August Anthropic cancelled the increase and made the introductory rate the standard rate."
date: 2026-08-10
lastmod: 2026-09-02
last_updated: 2026-09-02
categories: [News]
tags: [anthropic, claude, pricing, llm-cost, model-release]
related:
  - news/claude-sonnet-5
  - guides/llm-cost-optimization
  - comparisons/ai-subscription-pricing-2026
  - tools/claude-anthropic
---

Claude Sonnet 5 launched with introductory API pricing of **$2 per million input tokens and $10 per million output tokens**, scheduled to rise to **$3/$15** — a 50% increase across the board — on **1 September 2026**. On **10 August 2026** Anthropic cancelled the increase and made the introductory rate permanent.

## What happened

| | Input (per 1M tokens) | Output (per 1M tokens) |
|---|---|---|
| Introductory rate (from launch) | $2.00 | $10.00 |
| Planned standard rate, 1 Sep 2026 | $3.00 | $15.00 |
| **Actual rate from 10 Aug 2026** | **$2.00** | **$10.00** |

Anthropic's own pricing documentation now records it directly: "The $2/$10 per million input/output token pricing for
Claude Sonnet 5, announced at launch as introductory pricing through August 31, 2026, is now the standard price.
The previously scheduled increase to $3/$15 per million input/output tokens on September 1, 2026 will not occur."

A scheduled price rise being cancelled is unusual enough to be worth recording precisely, because plenty of secondary coverage described it as a "price freeze" or a "cut." It was neither: the list price never changed. What changed is that a temporary rate became the standard rate, and a budgeted 50% increase disappeared. Batch API pricing follows at 50% of standard, so **$1/$5** per million tokens.

## Why it matters for builders

**Delete the September increase from your 2026 forecast.** If you built a cost model for Sonnet 5 workloads that steps up on 1 September — which was the correct thing to do at launch — that step is gone. For a workload running at, say, 500M input and 100M output tokens a month, the cancelled rise is roughly **$1,000/month** that will not now be spent. Check your [FinOps](/guides/finops-for-ai/) assumptions and your reserved-budget alerts.

**Inference pricing is now a competitive instrument, and it moves in both directions.** Within the same month, Anthropic removed a scheduled increase and Google shipped [Gemini 3.7 Flash](/news/gemini-3-7-flash/) at an introductory $0.75/$3.75 that **expires on 31 December 2026** and doubles in January. The lesson is symmetrical: do not treat an introductory rate as permanent, and do not assume a scheduled increase will actually land. Both are marketing decisions taken against a competitor's price sheet, not costs passed through.

**Model your bill against list price, with a dated review.** The defensible practice is to budget on the standard rate, record the date any introductory or promotional rate expires, and re-check before that date. Anything else leaves you exposed to a doubling you did not plan for — or, more happily, blind to a saving you already had.

**Price stability is worth something on its own.** Anthropic making a rate permanent, weeks before a rise it had already announced, is a signal aimed at enterprise buyers who need to commit to unit economics over a contract term. Read it alongside the competitive pressure on business users described in [OpenAI's enterprise crossover](/news/openai-enterprise-revenue-overtakes-consumer/).

## Sources

1. Claude (Anthropic), announcement that Sonnet 5's introductory pricing is permanent (10 August 2026): [https://x.com/claudeai/status/2086891169217122586](https://x.com/claudeai/status/2086891169217122586)
2. Anthropic, Claude platform pricing documentation (states the cancelled increase explicitly): [https://platform.claude.com/docs/en/about-claude/pricing](https://platform.claude.com/docs/en/about-claude/pricing)
3. Anthropic, Claude pricing: [https://claude.com/pricing](https://claude.com/pricing)
4. Enterprise DNA, "Claude Sonnet 5 Price Freeze: What It Means for Business": [https://enterprisedna.co/resources/news/anthropic-claude-sonnet-5-pricing-permanent-reversal-august-2026/](https://enterprisedna.co/resources/news/anthropic-claude-sonnet-5-pricing-permanent-reversal-august-2026/)
5. Big Hat Group, "Claude Weekly: Sonnet 5 Price Hike Canceled" (20 August 2026): [https://www.bighatgroup.com/blog/claude-weekly-2026-08-20/](https://www.bighatgroup.com/blog/claude-weekly-2026-08-20/)

## Further reading

- [Anthropic releases Claude Sonnet 5](/news/claude-sonnet-5/): the launch this pricing belongs to.
- [Google ships Gemini 3.7 Flash](/news/gemini-3-7-flash/): the introductory rate moving the other way.
- [LLM cost optimization](/guides/llm-cost-optimization/): reducing the bill regardless of list price.
- [FinOps for AI](/guides/finops-for-ai/): budgeting against rates that move.
- [AI subscription pricing 2026](/comparisons/ai-subscription-pricing-2026/): the seat-based side of the same question.
