---
title: "GPT-6.1 Sol and DevDay 2026: Astra Performance at a Fifth of the Price"
description: "OpenAI released GPT-6.1 Sol on 29 September 2026 at $2 per million input tokens and $10 per million output, claiming it approaches GPT-6 Astra on professional work at one fifth the cost. DevDay the same day added always-on agents, a Decisions API and managed OpenAI agents on Amazon Bedrock."
date: 2026-09-29
lastmod: 2026-10-03
last_updated: 2026-10-03
last_verified: 2026-10-03
categories: [News]
tags: [openai, gpt-6, model-release, pricing, agents, devday, codex, bedrock]
related:
  - news/gpt-6-sol-and-luna
  - news/openai-gpt-5-5-and-5-6
  - news/claude-sonnet-5-5
  - tools/openai-api
  - comparisons/llm-landscape-2026
---

OpenAI released GPT-6.1 Sol on 29 September 2026, the same day as DevDay 2026. The model claim is specific: it approaches GPT-6 Astra on complex professional work at roughly one fifth of Astra's token cost.

## The model

Pricing is $2 per million input tokens, $0.10 per million cached input tokens, and $10 per million output tokens. The cached rate is 95 percent below the standard input price, which is the number to design around if your workload replays a large stable prompt. The model id is `gpt-6-1-sol`. At release it was available in ChatGPT Work and Codex for Plus, Pro, Business, Enterprise and Edu users, and through the API. It was not yet in standard Chat.

OpenAI's published figures, all vendor-reported:

| Benchmark | Result |
| --- | --- |
| DeepSWE v1.1, coding | Matches GPT-6 Astra |
| GDP.pdf, professional documents | Approaches Astra's state of the art |
| AutomationBench | 4.8 points above GPT-6 Sol |
| OSWorld 2.0, computer use | 7 points above GPT-6 Sol |
| Terminal-Bench Science | More than double GPT-6 Sol |
| Factuality error rate, low reasoning effort | 7.7 percent, down from 11.4 percent |

OpenAI notes its evaluations may differ from production ChatGPT output and that the tested scenarios do not represent typical usage. The factuality figure is the one worth holding onto: a drop from 11.4 to 7.7 percent error at low reasoning effort still means roughly one claim in thirteen is wrong at that setting. For anything that gets published or acted on, the model is not the fact checker.

## What DevDay added

The developer announcements matter more than the model for most teams building on OpenAI:

- **GPT-6 Astra Ultrafast**: a speed tier, up to 8 times faster token generation in Codex at around 300 tokens per second, and up to 6 times faster in the API.
- **Decisions API**: narrows Luna to a defined set of user-specified questions and returns an answer against them, with text and image input. A constrained-output endpoint rather than open generation.
- **Agents API with computer use**: software interaction, multi-agent patterns and tool calling in one surface.
- **Managed OpenAI agents on Amazon Bedrock**: OpenAI agents running natively in AWS infrastructure, through an AWS partnership.
- **Codex Cloud, Codex CLI refresh and Codex Security Cloud**: remote development environments, voice-guided task steering, an agents view for delegation, and GitHub repository scanning with prepared fixes.
- **dots**: always-on agents that learn a user's priorities and keep working on ongoing responsibilities, for Pro, Business and eligible Enterprise and Education plans.
- **Private Inference**: a confidential computing preview announced for autumn 2026, alongside zero data retention with private safety processing.

## Why it matters for builders

The interesting pricing move is the cached rate, not the headline. GPT-6.1 Sol keeps GPT-6 Sol's $2/$10, which has been in place since 22 September, but halves cached input from $0.20 to $0.10. On a workload that replays a large stable prompt, cached reads usually dominate the bill, so that is the line item that actually changes.

The headline rate matters for a different reason. [Claude Sonnet 5.5](/news/claude-sonnet-5-5/) and [Gemini 4 Argon](/news/gemini-4-argon/) both landed at the same $2/$10 within two days. Sonnet has been at that rate since June 2026, GPT-6 Sol since September, and Google's frontier tier now arrives there too. Price has stopped being a selection criterion in this capability class. The real questions are cached-input economics, tokens burned per completed task, data residency, and whether the model is reachable on the cloud you already run on.

The Bedrock announcement is the one that changes architecture decisions. OpenAI agents running natively inside AWS removes a class of egress, networking and data-residency objections that previously pushed teams towards Azure OpenAI or Bedrock-native models. If you build on AWS and had ruled out OpenAI on those grounds, that evaluation is now out of date.

The agent announcements, dots in particular, continue a pattern this wiki has tracked all year: always-on autonomous agents are shipping to general users faster than the containment practices around them are maturing. The same week brought a [coordinated distillation campaign](/news/openai-moonshot-distillation-campaign/) disclosure from OpenAI and an [autonomous agent breaching a Dutch security non-profit](/news/divd-zammad-ai-agent-breach/) in seconds. Treat a new always-on agent surface as a new identity with standing access, and scope it the way you would scope a service account.

## Sources

- OpenAI, "Introducing GPT-6.1 Sol" (29 September 2026): https://openai.com/index/introducing-gpt-6-1-sol/
- OpenAI, "Addendum: GPT-6.1 Sol" deployment safety (29 September 2026): https://deploymentsafety.openai.com/gpt-6-1-sol
- OpenAI, "DevDay 2026 Recap" (29 September 2026): https://openai.com/index/devday-2026-recap/
- OpenAI, "Introducing dots" (29 September 2026): https://openai.com/index/introducing-dots/
- OpenAI, "A practical guide to building with GPT-6" (2 October 2026): https://openai.com/index/practical-guide-building-gpt-6/

## Further reading

- [GPT-6 Sol and Luna](/news/gpt-6-sol-and-luna/): the generation GPT-6.1 Sol upgrades.
- [OpenAI API](/tools/openai-api/): endpoints, model ids and retirements.
- [Claude Sonnet 5.5](/news/claude-sonnet-5-5/): the same price point, one day earlier.
