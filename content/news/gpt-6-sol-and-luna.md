---
title: "OpenAI Ships GPT-6 Sol and GPT-6 Luna, Completing the GPT-6 Family"
description: "OpenAI released GPT-6 Sol and GPT-6 Luna on 22 September 2026 at $2/$10 and $0.10/$0.50 per million tokens, with a 1.05M-token context, a pricing surcharge above 272K input tokens, and same-day availability in Microsoft Foundry, Amazon Bedrock, and GitHub Copilot."
date: 2026-09-22
lastmod: 2026-09-25
last_verified: 2026-09-25
categories: [News]
tags: [openai, gpt-6, model-release, pricing, reasoning-models, microsoft-foundry, amazon-bedrock, github-copilot]
related:
  - news/openai-gpt-5-5-and-5-6
  - news/openai-astra-critical-cyber-threshold
  - tools/openai-api
  - comparisons/llm-landscape-2026
---

OpenAI released **GPT-6 Sol (`gpt-6-sol`) and GPT-6 Luna (`gpt-6-luna`) on 22 September 2026**, nineteen days after GPT-6 Astra reached the API. The two models fill out the GPT-6 family beneath Astra: Sol for demanding reasoning and coding work, Luna for high-volume, repeatable tasks. They launched the same day in Microsoft Foundry, Amazon Bedrock, and GitHub Copilot. There is **no GPT-6 Terra**, and the GPT-5.6 Sol, Terra, and Luna models all remain available.

## What happened

Both are reasoning models that accept text and image input and return text. On OpenAI's model pages each has a **1,050,000-token context window** (922,000 input tokens, 128,000 output tokens). Knowledge cutoffs are **20 April 2026 for Sol** and **18 May 2026 for Luna**. Both support reasoning effort `none`, `low`, `medium` (the default), `high`, `xhigh`, and `max`, which gives them a `none` setting that Astra does not have. They are served on the Responses API, Chat Completions, and Batch. They are not available on Realtime, the Live endpoint, or fine-tuning.

On the Responses API the models support OpenAI's full hosted tool set: web search, file search, image generation, code interpreter, hosted shell, `apply_patch`, skills, computer use, MCP, and tool search. Chat Completions supports function calling only when `reasoning_effort` is `none`, so any workload that reasons and calls tools has to run on Responses.

**Pricing per 1M tokens, Standard tier, prompts up to 272K input tokens:**

| Model | Input | Cached input | Cache write | Output |
|---|---|---|---|---|
| GPT-6 Astra | $10.00 | $1.00 | $12.50 | $50.00 |
| **GPT-6 Sol** | **$2.00** | **$0.20** | **$2.50** | **$10.00** |
| **GPT-6 Luna** | **$0.10** | **$0.01** | **$0.125** | **$0.50** |
| GPT-5.6 Sol (promotional) | $4.00 | $0.40 | $5.00 | $20.00 |
| GPT-5.6 Terra | $2.00 | $0.20 | $2.50 | $12.00 |
| GPT-5.6 Luna | $0.20 | $0.02 | $0.25 | $1.20 |

Cache writes for GPT-5.6 and later are billed at 1.25x the uncached input rate, and cache reads at 0.1x. Four modifiers matter for cost modelling:

- **Long prompts cost more.** Once a prompt passes **272K input tokens**, the whole request is billed at **2x input and cache rates and 1.5x output**. For Sol that means $4 input, $0.40 cached, and $15 output per million.
- **Batch and Flex** cost 50% of Standard.
- **Fast mode** costs 2x the applicable rate.
- **Regional processing** adds 10% where it is offered. EU data residency works only with Standard processing.

Sol takes over a tier that GPT-5.6 Terra used to hold. It costs the same as Terra per input token and less per output token ($10 against $12), and costs half of GPT-5.6 Sol's promotional rate. Luna costs half of GPT-5.6 Luna. OpenAI's changelog does not describe either as a replacement. The docs describe Astra as offering "our highest level of capability" and Sol as offering "strong reasoning on demanding tasks". GitHub's changelog calls Sol "a balanced model" and Luna "the lowest-cost option in the GPT-6 family". OpenAI's GPT-5.6 Sol model page says that model's promotional $4/$20 pricing runs "at least through November 21, 2026", and describes it as a 20% input and 33% output reduction.

**Availability on 22 September:**

- **Microsoft Foundry:** generally available alongside Astra. Standard deployment covers all 28 Global regions plus the US and EU Data Zones. Provisioned Throughput is offered for Sol, and Priority Processing for Sol in Global regions and the US Data Zone.
- **Amazon Bedrock:** generally available with up to 1M tokens of context. AWS's announcement relays an OpenAI claim that on an internal factuality evaluation Sol "makes roughly half as many mistakes as GPT-5.6 Sol".
- **GitHub Copilot:** Sol is available on Pro+, Max, Business, and Enterprise, and Luna on Pro and above. Both are billed under usage-based billing.

## Why it matters for builders

**Model names no longer carry across generations.** In GPT-5.6, "Sol" was the flagship. In GPT-6 it is the middle tier, priced like the old Terra, and Astra sits above it. If your routing config, cost dashboards, or internal docs assume "Sol means top tier", fix them before someone swaps `gpt-5.6-sol` for `gpt-6-sol` and expects equivalent capability at a fifth of the input price. Choose the tier by evaluation, not by name.

**Model the 272K cliff explicitly.** Take a 300K-token prompt with 5K output on Sol. It costs about $1.28, against about $0.59 if the same prompt is trimmed to 270K. Crossing the line more than doubles the bill, because the multiplier applies to the whole request, not just the tokens above the threshold. Agent loops that accumulate context are the usual way to cross it without noticing. [Compaction](/glossary/context-window/) or retrieval that keeps prompts under 272K is now a pricing decision as well as a quality one. See [LLM cost optimization](/guides/llm-cost-optimization/).

**Migration from GPT-5.6 is mostly parameter hygiene.** OpenAI's GPT-6 migration checklist includes:

- Remove `temperature`, `top_p`, and `top_logprobs` whenever reasoning effort is not `none`.
- Move reasoning-plus-tools workloads to the Responses API.
- If you are coming from GPT-5.5 or earlier, replace `prompt_cache_retention` with `prompt_cache_options.ttl: "30m"`.

GPT-6 also adds explicit [prompt caching](/glossary/prompt-caching/) breakpoints (up to four cache writes per request) and `configuration_update` input items. These items change reasoning effort mid-conversation without invalidating the cached prefix. Since cache writes are billed at 1.25x, placing breakpoints deliberately is now worth the engineering time on high-reuse prompts.

**Don't rush off the GPT-5.6 Sol promo.** GPT-5.6 Sol at $4/$20 stays available at least until 21 November 2026, and GitHub's 19 October Copilot deprecations point GPT-5.5 and GPT-5.4 users to GPT-5.6 Sol, not to GPT-6. That gives you a stable baseline for a side-by-side evaluation. Run GPT-6 Sol against GPT-5.6 Sol and Terra on your own tasks and compare cost per completed task, not cost per token. Microsoft's Foundry post makes the same point. Reasoning models at different effort levels can use very different numbers of tokens for the same result.

**Luna changes the economics of routing layers.** At $0.10/$0.50 with a 1M context and reasoning effort available, Luna is a candidate for classification, extraction, and triage in front of more expensive models. If your router currently sends that work to GPT-5.6 Luna, re-test and expect roughly half the bill.

## Sources

1. OpenAI, API changelog, entry for 22 September 2026: [https://developers.openai.com/api/docs/changelog](https://developers.openai.com/api/docs/changelog)
2. OpenAI, "GPT-6 Sol" model page (context, cutoff, pricing, 272K rule, endpoints, tools): [https://developers.openai.com/api/docs/models/gpt-6-sol](https://developers.openai.com/api/docs/models/gpt-6-sol)
3. OpenAI, "GPT-6 Luna" model page: [https://developers.openai.com/api/docs/models/gpt-6-luna](https://developers.openai.com/api/docs/models/gpt-6-luna)
4. OpenAI, "Using GPT-6" (latest-model guide and migration quickstart): [https://developers.openai.com/api/docs/guides/latest-model](https://developers.openai.com/api/docs/guides/latest-model)
5. OpenAI, "Prompt caching" guide (explicit breakpoints, cache-write billing): [https://developers.openai.com/api/docs/guides/prompt-caching](https://developers.openai.com/api/docs/guides/prompt-caching)
6. OpenAI, "GPT-5.6 Sol" model page (promotional pricing): [https://developers.openai.com/api/docs/models/gpt-5.6-sol](https://developers.openai.com/api/docs/models/gpt-5.6-sol)
7. OpenAI, "Introducing GPT-6 Sol and GPT-6 Luna" (22 September 2026): [https://openai.com/index/introducing-gpt-6-sol-and-luna](https://openai.com/index/introducing-gpt-6-sol-and-luna)
8. Microsoft Azure Blog, "GPT-6 Astra, Sol, and Luna: For production agents in Microsoft Foundry" (22 September 2026): [https://azure.microsoft.com/en-us/blog/gpt-6-astra-sol-and-luna-for-production-agents-in-microsoft-foundry/](https://azure.microsoft.com/en-us/blog/gpt-6-astra-sol-and-luna-for-production-agents-in-microsoft-foundry/)
9. AWS What's New, "OpenAI GPT-6 Sol and GPT-6 Luna are now generally available on Amazon Bedrock" (22 September 2026): [https://aws.amazon.com/about-aws/whats-new/2026/09/openai-gpt-6-sol-luna-on-amazon-bedrock/](https://aws.amazon.com/about-aws/whats-new/2026/09/openai-gpt-6-sol-luna-on-amazon-bedrock/)
10. GitHub Changelog, "OpenAI's GPT-6 Sol and GPT-6 Luna now available" (22 September 2026): [https://github.blog/changelog/2026-09-22-openais-gpt-6-sol-and-gpt-6-luna-now-available](https://github.blog/changelog/2026-09-22-openais-gpt-6-sol-and-gpt-6-luna-now-available)
11. GitHub Changelog, "Upcoming deprecation of selected GitHub Copilot models in mid-October" (18 September 2026): [https://github.blog/changelog/2026-09-18-upcoming-deprecation-of-selected-github-copilot-models-in-mid-october](https://github.blog/changelog/2026-09-18-upcoming-deprecation-of-selected-github-copilot-models-in-mid-october)

## Further reading

- [OpenAI ships GPT-5.5, then the GPT-5.6 Sol/Terra/Luna family](/news/openai-gpt-5-5-and-5-6/): the generation these models sit alongside.
- [Astra becomes the first OpenAI model to cross the "Critical" cyber threshold](/news/openai-astra-critical-cyber-threshold/): the GPT-6 flagship above Sol and Luna.
- [OpenAI API](/tools/openai-api/): endpoints, tiers, and tooling.
- [Claude Opus 5.5 launches at $4/$20](/news/claude-opus-5-5/): the Anthropic release that shipped the same day.
- [The 2026 LLM landscape](/comparisons/llm-landscape-2026/): cross-provider comparison.
