---
title: "Claude Fable 5.2 and Mythos 5.2: 20% Cheaper, Faster, and Far Fewer Unnecessary Blocks"
description: "Anthropic released Claude Fable 5.2 and Mythos 5.2 on 9 November 2026 at $8/$40 per million tokens, down from $10/$50, with up to 30% faster output, large gains on its own coding and agent benchmarks, and about 55% fewer unnecessary safety blocks. Mythos 5.2 stays limited to verified organisations."
date: 2026-11-09
lastmod: 2026-11-13
last_updated: 2026-11-13
last_verified: 2026-11-13
categories: [News]
tags: [anthropic, claude, fable, mythos, model-release, pricing, bedrock, foundry, safety]
related:
  - tools/claude-anthropic
  - news/claude-fable-5-1-mythos-5-1-ga
  - news/claude-opus-5-5
  - news/gemini-4-hydrogen
  - news/model-retirements-november-2026
---

Anthropic released **Claude Fable 5.2** and **Claude Mythos 5.2** on 9 November 2026. Fable 5.2 replaces Fable 5.1 as Anthropic's most capable generally available model, at a lower price. Mythos 5.2 is the same underlying model "without certain cybersecurity or biology safeguards", offered only to verified organisations.

## What is actually different

**Price.** $8 per million input tokens and $40 output, against $10/$50 for Fable 5.1, a 20% cut. Per Anthropic's model page and pricing documentation:

| | Fable 5.2 / Mythos 5.2 | Fable 5.1 / Mythos 5.1 |
| --- | --- | --- |
| Input | $8.00 | $10.00 |
| Output | $40.00 | $50.00 |
| Cache write, 5 minutes / 1 hour | $10.00 / $16.00 | $12.50 / $20.00 |
| Cache read | $0.20 | $0.25 |
| Batch | $4.00 / $20.00 | $5.00 / $25.00 |
| Fast mode | $16.00 / $80.00 | not offered |

**Speed.** Anthropic reports output "up to 30% faster" than the 5.1 models, and a fast mode that "speeds up token generation by up to 2.5 times".

**Limits and behaviour.** 1M-token context, 128K maximum output (300K on the Batch API with a beta header), June 2026 knowledge cutoff, retirement not sooner than 9 November 2027. Adaptive thinking is always on. The API's default effort is `high`. Anthropic's post says the default in Claude apps and Claude Code is `medium`, so the two differ.

**Breaking changes to check before you switch:**
- Forced tool use (`tool_choice` set to `any` or `tool`) returns a 400.
- Omit `temperature`, `top_p` and `top_k`. Under API version 2026-10-21 they return a 400.
- 30-day data retention is still required. Fable 5.2 is not available under zero data retention unless Anthropic authorises it. Anthropic mentions Enterprise Frontier Safeguards, in private beta, as a route to ZDR-compatible monitoring.

**Model IDs.** `claude-fable-5-2` on the Claude API, Claude Platform on AWS, Microsoft Foundry and both Claude Models on Google Cloud offerings. On Amazon Bedrock it is `global.anthropic.claude-fable-5-2`. Mythos 5.2 is `claude-mythos-5-2`, and its model page does not list Claude Platform on AWS.

## The benchmark claims

All figures are Anthropic's own, with safeguards on and each model at its highest available effort unless noted. None has been reproduced independently. A selection:

| Benchmark | Fable 5.2 | Fable 5.1 | Opus 5.5 | GPT-6 Astra | Gemini 4 Carbon |
| --- | --- | --- | --- | --- | --- |
| FrontierCode 2.0 | 49.1% | 32.4% | 45.5% | 42.8% | 41.1% |
| FrontierSWE v2 | 69.9% | 56.3% | 62.3% | 65.5% | 61.2% |
| OSWorld 2.1 (offline, partial) | 89.3% | 83.5% | 87.2% | 79.5% | 81.5% |
| Humanity's Last Exam, with tools | 74.2% | 65.6% | 67.7% | 57.2% | not reported |
| Remote Labor Index | 41.3% | 17.9% | 21.3% | 20.8% | not reported |
| RoboDojo Sim | 64.9% | 27.6% | 39.4% | 29.8% | not reported |
| AutomationBench | 51.4% | 31.4% | 42.5% | 41.4% | 53.9% |

Two things to read carefully. First, some jumps are very large for one point release: Remote Labor Index more than doubles and RoboDojo more than doubles. Those are the numbers to verify on your own tasks before believing. Second, the gap to Opus 5.5 is much smaller than the gap to Fable 5.1. Anthropic's post compares Fable 5.2 at High effort with Opus 5.5 on FrontierCode, 45.3% against 45.5%, "at about half the cost per task". Per-token price alone is therefore a poor guide: Fable 5.2 costs twice as much per token, so any saving has to come from using fewer tokens per task. Measure cost per completed task on your own workload. Anthropic's recommendation is unchanged: start on Opus 5.5 for most coding and knowledge work, and move up to Fable only where your evaluations need it.

## Safety, and the blocks that frustrated users

Anthropic says the cyber and biology safeguards are "as robust as those of Fable 5.1 but produce fewer unnecessary blocks": in early testing across claude.ai, Claude Code and Cowork, about **55% fewer blocks** overall, about 60% fewer in cybersecurity and 40% fewer in biology. Blocked requests now fall back to Opus 4.8 for cyber and Opus 5 for biology. Anthropic also describes its "strongest protections against distillation attacks" so far, and says preserved thinking now applies to all accounts.

**Mythos 5.2 access.** Through the Cyber Verification Program or the Life Sciences Verification Program. Claude Enterprise customers can also use it inside Claude Security without separate verification. On Anthropic's internal CVE Rediscovery evaluation, Mythos 5.2 scored 89.6% against 78.3% for Mythos 5.1.

## Why it matters for builders

- **If you are on Fable 5.1, moving is mostly a price cut.** The breaking changes above were already in force on 5.1, so most 5.1 integrations should only need the model ID changed. Fable 5.1 stays Active with a retirement floor of 1 September 2027, so there is no forced deadline.
- **If you are on Opus 5.5, do not switch by default.** The two are close on Anthropic's own coding numbers, and Opus 5.5 costs half as much per token; compare cost per completed task before moving. Fable 5.2 earns its price on long-horizon agent work, computer use and research tasks, where its claimed lead is largest.
- **The block-rate change matters for security and life-sciences teams.** If Fable 5.1 refusals pushed you to apply for Mythos access, test Fable 5.2 first.
- **It is everywhere on day one:** the Claude API, Bedrock, Google Cloud, Microsoft Foundry and GitHub Copilot, which added it the same day.

## Sources

- Anthropic, "Introducing Claude Fable 5.2 and Claude Mythos 5.2" (9 November 2026): https://www.anthropic.com/claude-fable-and-mythos-5-2
- Anthropic, Claude Fable 5.2 model overview (fetched 13 November 2026): https://platform.claude.com/docs/en/models/fable-5-2/overview
- Anthropic, Claude Mythos 5.2 model overview (fetched 13 November 2026): https://platform.claude.com/docs/en/models/mythos-5-2/overview
- Anthropic, Pricing (fetched 13 November 2026): https://platform.claude.com/docs/en/about-claude/pricing
- Anthropic, Model deprecations (fetched 13 November 2026), for Fable 5.1's retirement floor: https://platform.claude.com/docs/en/about-claude/model-deprecations
- GitHub Changelog, "Claude Fable 5.2 in GitHub Copilot" (9 November 2026): https://github.blog/changelog/2026-11-09-claude-fable-5-2-in-github-copilot/

## Further reading

- [Claude by Anthropic](/tools/claude-anthropic/): the full lineup, prices and access options.
- [Claude Fable 5.1 and Mythos 5.1](/news/claude-fable-5-1-mythos-5-1-ga/): the generation this replaces.
- [Claude Opus 5.5](/news/claude-opus-5-5/): the model Anthropic still recommends starting on.
- [Gemini 4 Hydrogen](/news/gemini-4-hydrogen/): Google's release the same week.
- [Model retirements, November 2026](/news/model-retirements-november-2026/): what leaves this month, and where.
