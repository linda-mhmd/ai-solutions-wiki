---
title: "Model Retirements and Price Changes, November 2026 to January 2027: The Dates to Plan Around"
description: "A dozen model retirements and price steps across Microsoft Foundry, GitHub Copilot, Amazon Bedrock, Google Cloud, the Claude API and the Gemini API between 15 November 2026 and 1 January 2027, with replacements, each checked against the vendor's own page."
date: 2026-11-13
lastmod: 2026-11-13
last_updated: 2026-11-13
last_verified: 2026-11-13
categories: [News]
tags: [model-lifecycle, deprecation, retirement, pricing, azure, bedrock, vertex-ai, github-copilot, anthropic, google]
related:
  - news/claude-fable-5-2-mythos-5-2
  - news/gemini-4-hydrogen
  - tools/claude-anthropic
  - tools/google-gemini
  - tools/amazon-bedrock
---

The next seven weeks hold an unusual number of model retirements and price changes, spread across six platforms. Several apply on one platform but not another: Claude Haiku 4.5 leaves Microsoft Foundry on 15 November but stays Active on the Claude API. Here is the list, in date order, checked against each vendor's own page.

## The calendar

| Date | Platform | What changes | Replacement or action |
| --- | --- | --- | --- |
| **15 Nov 2026** | Microsoft Foundry | **Claude Haiku 4.5** retires (both versions) | Microsoft lists no replacement. `claude-haiku-5-5` is the current Haiku on Foundry |
| **15 Nov 2026** | Microsoft Foundry | **codex-mini** (2025-05-16) retires | None listed |
| **16 Nov 2026** | GitHub Copilot | **Claude Opus 4.8**, **Claude Opus 5** and **GPT-5.6 Terra** deprecated in all Copilot experiences | Opus 5.5 for the Claude models; GPT-6.1 Sol or GPT-6 Luna for Terra. Opus 4.8 stays for individual subscribers on annual plans |
| **19 Nov 2026** | Microsoft Foundry | **o1** and **o1-pro** retire | `gpt-5.6-sol` |
| **19 Nov 2026** | Gemini API and Google Cloud | **Gemini 3.6 Flash** retires | Gemini 3.8 Flash, or Gemini 4 Hydrogen, which Google now recommends for 3.8 Flash users |
| **26 Nov 2026** | Amazon Bedrock | **AI21 Jamba 1.5 Large** and **Jamba 1.5 Mini** reach end of life | No replacement found on AWS's pages |
| **30 Nov 2026** | Claude API | **Claude Sonnet 4.5** (`claude-sonnet-4-5-20250929`) retires | `claude-sonnet-5-5` |
| **30 Nov 2026** | Google Cloud | **Claude Sonnet 4.5** shuts down (deprecated 29 Sep 2026, existing customers only) | Claude Sonnet 5 or 5.5 on Google Cloud |
| **30 Nov 2026** | Amazon Bedrock | **TwelveLabs Marengo Embed 2.7** reaches end of life | Marengo Embed 3.0, listed only in ap-northeast-2 so far |
| **30 Nov 2026** | Claude API | **Fast mode on Claude Opus 4.8** removed. Requests with `speed: "fast"` will return an error | Opus 5.5 fast mode. Opus 4.8 itself stays Active |
| **1 Dec 2026** | Gemini API | **Gemini 4 Argon** and **Gemini 4 Carbon** introductory prices end: $2/$10 becomes **$4/$20** per MTok | Budget for the doubling, or move suitable work to Hydrogen |
| **1 Jan 2027** | Gemini API | **Gemini 3.8 Flash** introductory price ends: $0.75/$3.75 becomes **$1.50/$7.50** | Gemini 4 Hydrogen costs the same from then |

## What to watch for

**Retirement means errors, not a slower model.** On Bedrock, AWS says an end-of-life model "becomes completely inaccessible across all AWS Regions", and migration "doesn't happen automatically". Microsoft says retirement dates are not extendable. Anthropic's fast mode page says requests to the removed configuration "will return an error". Search your code and infrastructure for these model IDs now, including in prompt templates, configuration files and evaluation harnesses.

**The same model can retire on one platform and stay on another.** Claude Haiku 4.5 retires on Foundry on 15 November but is still listed as Active on the Claude API, even though its own published floor of 15 October 2026 has passed. Claude Sonnet 4.5 retires on 30 November on both the Claude API and Google Cloud, and Bedrock sets its own date. Check the platform you actually call, not the model vendor's page alone.

**Copilot changes defaults for you.** GitHub says the suggested replacements are enabled automatically for Copilot Business and Enterprise unless an administrator has turned off default model enablement. If your organisation pins models for compliance reasons, review the setting before 16 November.

**Embeddings are the hard case.** Moving from Marengo Embed 2.7 to 3.0 is not a drop-in swap: vectors from different embedding models are not comparable, so the index has to be rebuilt. AWS lists Marengo Embed 3.0 only in ap-northeast-2 so far, which may also be a data-residency question for EU workloads.

**Price steps are also deadlines.** The 1 December Argon and Carbon step and the 1 January 3.8 Flash step double the cost of unchanged workloads. Put both in your cost model now.

**Not this month:** Claude Opus 4.5 has a retirement floor of 24 November 2026 on the Claude API, but no deprecation notice. Anthropic commits to at least 60 days' notice, so it cannot retire in November.

## Sources

- Microsoft, "Model retirement schedule - Microsoft Foundry": https://learn.microsoft.com/en-us/azure/foundry/openai/concepts/model-retirement-schedule
- Microsoft, "Foundry Models lifecycle and support policy": https://learn.microsoft.com/en-us/azure/foundry/openai/concepts/model-retirements
- GitHub Changelog, "Upcoming deprecation of selected GitHub Copilot models in mid-November" (15 October 2026): https://github.blog/changelog/2026-10-15-upcoming-deprecation-of-selected-github-copilot-models-in-mid-november/
- Google Cloud, Gemini 3.6 Flash model page and lifecycle table: https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-6-flash and https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/model-versions
- Google Cloud, partner model deprecations (Claude Sonnet 4.5): https://docs.cloud.google.com/vertex-ai/generative-ai/docs/deprecations/partner-models
- AWS, Amazon Bedrock model lifecycle (Legacy), with the Jamba 1.5 and Marengo Embed 2.7 dates: https://docs.aws.amazon.com/bedrock/latest/userguide/model-lifecycle-legacy.html
- AWS, Marengo Embed v2.7 model card: https://docs.aws.amazon.com/bedrock/latest/userguide/model-card-twelvelabs-marengo-embed-v2-7.html
- AWS, Jamba 1.5 Large model card: https://docs.aws.amazon.com/bedrock/latest/userguide/model-card-ai21-labs-jamba-1-5-large.html
- Anthropic, Model deprecations (fetched 13 November 2026): https://platform.claude.com/docs/en/about-claude/model-deprecations
- Anthropic, Fast mode (fetched 13 November 2026): https://platform.claude.com/docs/en/build-with-claude/fast-mode
- Google, "Gemini 4 Carbon is now available" (10 November 2026), for the 1 December price: https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-4-carbon-now-available/
- Google, Gemini Developer API pricing, for the Argon and 3.8 Flash price steps: https://ai.google.dev/gemini-api/docs/pricing

## Further reading

- [Claude Fable 5.2 and Mythos 5.2](/news/claude-fable-5-2-mythos-5-2/) and [Gemini 4 Hydrogen](/news/gemini-4-hydrogen/): this month's new models, and the obvious replacements for some of the above.
- [Claude by Anthropic](/tools/claude-anthropic/), [Google Gemini](/tools/google-gemini/) and [Amazon Bedrock](/tools/amazon-bedrock/): current lineups per platform.
