---
title: "Claude Opus 5.5 Launches at $4/$20, With Thinking Always On"
description: "Anthropic released Claude Opus 5.5 on 22 September 2026, the first Claude 5.5 model. Anthropic says it performs at Fable 5.1's level on most work and costs about 40% less to run than Opus 5. It has a 1M-token context, adaptive thinking that cannot be turned off, and several request settings that now return errors."
date: 2026-09-22
lastmod: 2026-09-25
last_verified: 2026-09-25
categories: [News]
tags: [anthropic, claude, opus-5-5, model-release, pricing, migration, cybersecurity, amazon-bedrock, github-copilot]
related:
  - news/claude-fable-5-1-mythos-5-1-ga
  - news/claude-sonnet-5
  - tools/claude-anthropic
  - comparisons/llm-landscape-2026
---

Anthropic released **Claude Opus 5.5 (`claude-opus-5-5`) to general availability on 22 September 2026**. It is the first model in the Claude 5.5 family. Anthropic's headline claim is that Opus 5.5 "performs at the level of Claude Fable 5.1 on most work and costs 40% less to run than Opus 5". Part of that comes from lower per-token prices and part from using fewer tokens per task. Anthropic says **Claude Sonnet 5.5 and Claude Haiku 5.5 will follow "in the coming weeks"**. As of 25 September neither has shipped.

## What happened

**Pricing per 1M tokens:**

| Model | Input | Output | Cache reads | Cache writes |
|---|---|---|---|---|
| **Claude Opus 5.5** | **$4** | **$20** | **$0.20** | **$5** |
| Claude Opus 5 (previous generation) | $5 | $25 | $0.50 | $6.25 |
| Claude Fable 5.1 | $10 | $50 | $0.25 | - |
| Claude Sonnet 5 | $2 | $10 | - | - |

Input and output prices are 20% lower than Opus 5, and cache reads are 60% lower. Anthropic notes that cache reads "make up the majority of agentic and coding work costs". Opus 5.5 cache reads are now cheaper than Fable 5.1's. **Fast mode** runs up to 2.5x faster at $8 input and $40 output per million tokens, in Claude Code and on the Claude Platform. Anthropic also says Opus 5.5 generates output more than 30% faster than Opus 5 at standard speed.

**Specs, from Anthropic's models overview:**

- 1M-token context window, the default with no beta header
- 128K maximum output
- Reliable knowledge cutoff: June 2026
- Default effort: `medium`
- Adaptive thinking: always on
- Retirement: not sooner than 22 September 2027

**Availability.** The model shipped the same day on:

- the Claude API
- Claude Platform on AWS
- Amazon Bedrock (`anthropic.claude-opus-5-5`), including AWS GovCloud (US)
- Google Cloud Vertex AI
- Microsoft Foundry
- GitHub Copilot, for Pro+, Max, Business, and Enterprise users

GitHub's changelog also notes that Opus 5.5 watermarks its text outputs. According to GitHub, the watermark does not change meaning or add tokens or cost.

**Benchmarks (Anthropic's own).** On Terminal-Bench 4.0 Anthropic reports:

- Opus 5.5: 66.4%
- Fable 5.1: 55.8%
- Opus 5: 52.3%
- GPT-6 Astra: 57.9%, as reported by OpenAI

Other results include 54.4% on FrontierCode v1.1 and 81.8% on OSWorld 2.0. Anthropic also cautions that at this level "benchmark margins have become a less reliable guide to real-world differences". The efficiency claims matter more for cost planning. Anthropic says Opus 5.5 at default effort beats Opus 5 at max effort on Terminal-Bench 4.0 "for about a fifth of the cost". It also says a C-to-Rust port of HAProxy cost 51% less on Opus 5.5 than on Fable 5.1.

**Safeguards and re-routing.** Anthropic says Opus 5.5 is comparable to Claude Mythos 5.1 in biology and cybersecurity. It is the first Opus model to ship with Fable 5.1-class safeguards on cybersecurity, biology, and distillation, and these "fall back to another model transparently". In practice, routine bug-finding and fixing stays on Opus 5.5, but **most cybersecurity tasks are re-routed to Claude Opus 4.8**. In Anthropic's benchmark footnotes, biology and frontier-LLM-development tasks that tripped safeguards were completed by Opus 5. Vetted organizations can apply to the Life Sciences Verification Program now. Anthropic says the Cyber Verification Program will "soon" expand to Opus 5.5, with three tiers of increasingly permissive access that extend to Mythos models.

**Lineup changes.** Anthropic's current-models list is now:

- Fable 5.1
- Opus 5.5
- Sonnet 5
- Haiku 4.5

**Claude Opus 5 is now the previous generation, superseded by Opus 5.5.** It stays active on the deprecations page, with retirement not sooner than 24 July 2027.

## Why it matters for builders

**This is not a drop-in model-ID swap.** Anthropic's migration guide lists request settings that return a 400 error on Opus 5.5, even for code that works on Opus 5:

- `thinking: {"type": "disabled"}` and manual `budget_tokens`. Thinking is always on, and `effort` is the only control.
- Forced tool choice (`{"type": "any"}` or `{"type": "tool", ...}`). Only `auto` and `none` are accepted.
- Non-default `temperature`, `top_p`, or `top_k`.
- A prefilled final assistant turn.
- On the Claude API and Google Cloud, the old `computer_20251124` tool. Use the `computer_toolset_20260801` toolset instead.

Responses can now begin with `thinking` blocks, so code that reads `content[0].text` will break. Read blocks by `type`, and pass thinking blocks back unmodified in tool loops. Text the model writes between tool calls now arrives inside thinking blocks, so progress UIs go quiet unless you set `thinking.display`. The guide includes a `/claude-api migrate` command in Claude Code that applies these changes.

**Re-baseline cost and quality at the new default effort.** The default effort dropped from `high` on Opus 5 to `medium`, so requests that omit `effort` now think less. Workloads that used to disable thinking will now produce thinking tokens, which are billed as output. The headline 40% saving is Anthropic's number for "typical workloads at default settings". Measure cost per task on your own traffic before you build a budget on it. See [LLM cost optimization](/guides/llm-cost-optimization/) and [prompt caching](/glossary/prompt-caching/). The cheaper cache reads help most in long agentic sessions.

**Plan for safety fallbacks in your agent loop.** Opus 5.5 can return `stop_reason: "refusal"` with a broader set of `stop_details` categories than Opus 5, including `bio` and `reasoning_extraction` as well as `cyber`. If your product does security work, expect some requests to be served by [Opus 4.8](/news/claude-opus-4-8/) and not by Opus 5.5. Test outputs for those paths separately. Security-focused teams may also want to apply to the Cyber Verification Program once it opens to Opus 5.5.

**Watch the Haiku and Sonnet 4.5 dates.** Anthropic lists Claude Sonnet 4.5 (`claude-sonnet-4-5-20250929`) for retirement **not sooner than 29 September 2026**, and Claude Haiku 4.5 (`claude-haiku-4-5-20251001`) not sooner than **15 October 2026**. Opus 4.5 follows no sooner than 24 November 2026. Haiku 4.5 is still the current Haiku, and Haiku 5.5 has not shipped. Teams on the cheapest tier should have a fallback ready, either [Sonnet 5](/news/claude-sonnet-5/) or a competitor, in case Haiku 5.5 arrives after Haiku 4.5 is retired. GitHub Copilot already dropped Sonnet 4.5 on 1 September.

**Opus is now priced against GPT-6 Sol, not Astra.** Opus 5.5 at $4/$20 shipped the same day as [OpenAI's GPT-6 Sol at $2/$10](/news/gpt-6-sol-and-luna/). Anthropic compared itself with GPT-6 Astra on capability, but the price is closer to Sol's. Run both against your own tasks.

## Sources

1. Anthropic, "Claude Opus 5.5" (22 September 2026): [https://www.anthropic.com/claude-opus-5-5](https://www.anthropic.com/claude-opus-5-5)
2. Anthropic, Models overview: [https://platform.claude.com/docs/en/about-claude/models/overview](https://platform.claude.com/docs/en/about-claude/models/overview)
3. Anthropic, "Migrating to Claude Opus 5.5": [https://platform.claude.com/docs/en/models/opus-5-5/migration-guide](https://platform.claude.com/docs/en/models/opus-5-5/migration-guide)
4. Anthropic, Model deprecations: [https://platform.claude.com/docs/en/about-claude/model-deprecations](https://platform.claude.com/docs/en/about-claude/model-deprecations)
5. AWS What's New, "Claude Opus 5.5 is now available on AWS" (22 September 2026): [https://aws.amazon.com/about-aws/whats-new/2026/09/claude-opus-5-5-aws/](https://aws.amazon.com/about-aws/whats-new/2026/09/claude-opus-5-5-aws/)
6. AWS What's New, "Claude Opus 5.5 is now available on AWS GovCloud (US)" (22 September 2026): [https://aws.amazon.com/about-aws/whats-new/2026/09/claude-opus-5-5-aws-govcloud/](https://aws.amazon.com/about-aws/whats-new/2026/09/claude-opus-5-5-aws-govcloud/)
7. GitHub Changelog, "Claude Opus 5.5 is now available in GitHub Copilot" (22 September 2026): [https://github.blog/changelog/2026-09-22-claude-opus-5-5-is-now-available-in-github-copilot](https://github.blog/changelog/2026-09-22-claude-opus-5-5-is-now-available-in-github-copilot)

## Further reading

- [Claude Fable 5.1 reaches general availability, Mythos 5.1 stays gated](/news/claude-fable-5-1-mythos-5-1-ga/): the model Opus 5.5 is benchmarked against, and the safeguard stack it now shares.
- [Claude Sonnet 5](/news/claude-sonnet-5/): the current mid-tier model until Sonnet 5.5 ships.
- [Claude Opus 4.8](/news/claude-opus-4-8/): the model that now handles re-routed cybersecurity requests.
- [Claude and Anthropic](/tools/claude-anthropic/): the full lineup and access tiers.
- [The 2026 LLM landscape](/comparisons/llm-landscape-2026/): cross-provider comparison.
