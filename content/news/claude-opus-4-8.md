---
title: "Anthropic Releases Claude Opus 4.8"
description: "Anthropic launched Claude Opus 4.8 on 28 May 2026, its flagship model, with sharper agentic judgment, user-controllable effort levels, and a stated large reduction in letting flaws in its own code pass unremarked."
date: 2026-05-28
lastmod: 2026-07-13
last_updated: 2026-07-13
categories: [News]
tags: [anthropic, claude, agentic-ai, reasoning, model-release, coding]
related:
  - tools/claude-anthropic
  - news/claude-sonnet-5
  - comparisons/llm-landscape-2026
---

Anthropic released Claude Opus 4.8 on 28 May 2026 as its flagship model. It succeeds Opus 4.7 (16 April 2026) and lands at the same price as its predecessor. Anthropic frames the release around agentic reliability: better judgment on long-running tasks, user-controllable effort levels, and a stated roughly fourfold reduction, versus Opus 4.7, in the rate at which the model lets flaws in its own code pass without comment.

## What happened

Opus 4.8 is positioned for demanding agentic and software-engineering work. Two changes stand out. First, callers can now steer how much effort the model spends, trading latency and cost against depth on a per-request basis. Second, Anthropic pairs the model with Claude Code "dynamic workflows" that can run large numbers of subagents in parallel, aimed at tasks that decompose into many independent pieces.

The self-review claim is the headline: Anthropic reports Opus 4.8 is about four times less likely than Opus 4.7 to let a flaw in code it wrote go unremarked. That figure is Anthropic's own measurement rather than an independent benchmark, so treat it as a vendor claim.

## Why it matters for builders

For teams running [agentic AI](/glossary/agentic-ai/), the value of a flagship is less about raw intelligence and more about not compounding its own mistakes over a long task loop. A model that flags its own errors more often reduces the review burden and the risk of a bad step propagating. The user-controllable effort level also matters for cost: you can dial depth up for hard steps and down for routine ones, rather than paying peak cost on every call.

Opus 4.8 sits above [Claude Sonnet 5](/news/claude-sonnet-5/), the mid-tier model Anthropic released a month later for high-volume automation. If you are choosing between tiers, benchmark both on your own workload; see the [2026 LLM landscape](/comparisons/llm-landscape-2026/) for how the field compares. Integration details are on the [Claude and Anthropic](/tools/claude-anthropic/) page.

## Sources

- Anthropic, "Claude Opus 4.8" (28 May 2026): https://www.anthropic.com/news/claude-opus-4-8
- Anthropic, "Claude Opus 4.7" (16 April 2026): https://www.anthropic.com/news/claude-opus-4-7

## Further reading

- [Claude Sonnet 5](/news/claude-sonnet-5/): the mid-tier model that approaches Opus quality at lower cost.
- [The 2026 LLM landscape](/comparisons/llm-landscape-2026/): how the flagship models compare.
- [Claude and Anthropic](/tools/claude-anthropic/): models, APIs, and integration.
