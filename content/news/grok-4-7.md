---
title: "Grok 4.7: New Base Model, Same Price, and a Fast Variant Only in Cursor"
description: "SpaceXAI released Grok 4.7 on 21 September 2026. It uses a larger base model than Grok 4.6 at unchanged $2/$6 pricing with a 500K context. A 2x-priced Grok 4.7 Fast is served only through Cursor and Grok Build, and GitHub Copilot added the model the same day."
date: 2026-09-21
lastmod: 2026-09-25
last_verified: 2026-09-25
categories: [News]
tags: [xai, spacexai, grok, model-release, pricing, github-copilot, cursor, ai-coding]
related:
  - news/grok-4-5-and-qwen-open-models
  - tools/xai-grok
  - comparisons/llm-landscape-2026
---

SpaceXAI released **Grok 4.7 (`grok-4.7`) on 21 September 2026**, about six weeks after Grok 4.6. SpaceXAI is the name xAI's documentation and site now use. The company calls Grok 4.7 its "most capable model for coding and knowledge work". It is built on **a new, larger base model** than Grok 4.6, and it is **served at the same price as 4.6**. A faster variant, **Grok 4.7 Fast**, costs twice as much and is not on the public API at all: it is available only in Cursor and SpaceXAI's own Grok Build coding agent.

## What happened

According to the launch post, Grok 4.7 was trained with a longer reinforcement-learning run on "a harder mix of tasks, weighted toward problems that take many hours to complete". SpaceXAI says it is better at verifying its own work and managing long context. It was also trained to "natively understand the Grok Bot harness", SpaceXAI's persistent-agent product.

**Specs (xAI developer docs):**

- 500,000-token context window
- Text and image input, text output
- No text output limit
- Knowledge cutoff: May 2026
- Reasoning effort: `low`, `medium`, `high` (the default), or `xhigh`
- Tools: function calling, web search, X search, and code execution, on both the Responses API and Chat Completions

On the Responses API, `grok-4.7` **always returns `reasoning.encrypted_content`**, even when `include` does not ask for it. SpaceXAI tells developers to pass those reasoning items back unchanged on the next turn.

**Pricing per 1M tokens:**

| Model | Prompt size | Input | Cached input | Output |
|---|---|---|---|---|
| **grok-4.7** | below 200K | **$2.00** | **$0.50** | **$6.00** |
| grok-4.7 | 200K and above | $4.00 | $1.00 | $12.00 |
| Grok 4.7 Fast (Cursor, Grok Build only) | below 200K | $4.00 | $1.00 | $12.00 |
| Grok 4.7 Fast (Cursor, Grok Build only) | above 200K | $6.00 | $1.50 | $18.00 |
| grok-4.6 (previous generation) | below 200K | $2.00 | $0.50 | $6.00 |
| grok-4.5 | below 200K | $2.00 | $0.30 | $6.00 |

The long-context rate applies to **every token in the request** once the prompt reaches 200K tokens, not only to the tokens beyond that point. The US regional endpoint (`https://us.api.x.ai/v1`) keeps inference in the United States for a 10% premium, which works out to $2.20 / $0.55 / $6.60 below 200K. Cached input on 4.6 and 4.7 costs $0.50, against $0.30 on Grok 4.5. Cache-heavy agents did not get cheaper when they moved off 4.5.

**Benchmarks (SpaceXAI's own).** Grok 4.7 at xhigh effort, against Grok 4.6 at high effort:

- CursorBench 4.0: 46.3%, up from 40.4%
- Terminal-Bench 4.0: 37.6%, up from 20.3%
- DeepSWE v1.1: 71.0% at high effort

The same table puts Claude Fable 5.1 (max) at 51.8% on CursorBench and 57.9% on Terminal-Bench 4.0, so on SpaceXAI's own numbers Grok 4.7 is not the leader in raw coding scores. The company's pitch is price-performance: "at the frontier" on a cost-per-task chart, at $2/$6 against Fable 5.1's $10/$50. On safety, SpaceXAI says Grok 4.7 has "an entirely new safeguard stack". It reports that the model let through only 3.3% of risky dual-use prompts on its internal HackerBench v0.3, and it says select cybersecurity partners are getting invite-only access to red-team capabilities.

**Where it runs.** Grok 4.7 is available on:

- the xAI API
- Grok Build, as the default model
- Cursor, on all plans
- the OpenRouter, Vercel, and Cloudflare model gateways
- **GitHub Copilot**, from 21 September, for Pro, Pro+, Max, Business, and Enterprise, billed at provider list price under usage-based billing

**Grok 4.6 is now the previous generation, superseded by Grok 4.7.** Grok 4.6 itself only reached Google's Vertex AI Model Garden as GA on 18 September.

## Why it matters for builders

**A free capability bump if you are on 4.6.** Same price, same context, same effort levels, same endpoints: moving from `grok-4.6` to `grok-4.7` needs a model-string change and an evaluation run. The one behaviour change to handle is encrypted reasoning. If your multi-turn code rebuilds the `input` array without the reasoning items, you lose the model's carried-over reasoning. SpaceXAI also "highly recommends" setting `prompt_cache_key` (or the `x-grok-conv-id` header on Chat Completions). Without it, requests can land on a cache-cold server and pay full input price.

**The fast variant is a distribution decision, not a technical one.** Grok 4.7 Fast is "the same model served on faster infrastructure", but you cannot call it from your own code. It is reserved for Cursor and Grok Build, and even there Grok Build's free tier excludes it. If your product needs Grok 4.7 at lower latency, your options today are the standard API or working inside those two tools. Don't design an architecture around an API tier that doesn't exist. See [Cursor](/tools/cursor-ai/).

**Copilot users: the Grok 4.5 cut-off points to 4.6, not 4.7.** GitHub's 18 September notice deprecates Grok 4.5 across all Copilot experiences on **19 October 2026** and names Grok 4.6 as the suggested alternative. Business and Enterprise administrators who rely on default model enablement will have 4.6 switched on automatically. If you want your teams on 4.7, enable it explicitly in the Copilot model policy. See [GitHub Copilot](/tools/github-copilot/).

**Treat the benchmark table as directional.** Every figure above is SpaceXAI's own, run at each model's best effort setting. The competing numbers are taken from other labs' reports, so they come from different harnesses. Run your own [evals](/guides/llm-evaluation-methods/) before switching production traffic, and weigh cost per task alongside accuracy.

## Sources

1. SpaceXAI, "Introducing Grok 4.7" (21 September 2026): [https://x.ai/news/grok-4-7](https://x.ai/news/grok-4-7)
2. xAI developer docs, "Grok 4.7": [https://docs.x.ai/developers/grok-4-7](https://docs.x.ai/developers/grok-4-7)
3. xAI developer docs, Release notes (September 2026): [https://docs.x.ai/docs/release-notes](https://docs.x.ai/docs/release-notes)
4. xAI developer docs, Pricing (Grok 4.7 Fast and regional endpoint rates): [https://docs.x.ai/developers/pricing](https://docs.x.ai/developers/pricing)
5. GitHub Changelog, "Grok 4.7 is now available in GitHub Copilot" (21 September 2026): [https://github.blog/changelog/2026-09-21-grok-4-7-is-now-available-in-github-copilot](https://github.blog/changelog/2026-09-21-grok-4-7-is-now-available-in-github-copilot)
6. GitHub Changelog, "Upcoming deprecation of selected GitHub Copilot models in mid-October" (18 September 2026): [https://github.blog/changelog/2026-09-18-upcoming-deprecation-of-selected-github-copilot-models-in-mid-october](https://github.blog/changelog/2026-09-18-upcoming-deprecation-of-selected-github-copilot-models-in-mid-october)

## Further reading

- [More 2026 model releases: Grok 4.5 and Qwen's open family](/news/grok-4-5-and-qwen-open-models/): the Grok 4.5 launch this line builds on.
- [xAI Grok](/tools/xai-grok/): full model lineup, pricing tiers, and API details.
- [Claude Opus 5.5 launches at $4/$20](/news/claude-opus-5-5/) and [GPT-6 Sol and Luna](/news/gpt-6-sol-and-luna/): the competing releases from the following day.
- [The 2026 LLM landscape](/comparisons/llm-landscape-2026/): cross-provider comparison.
