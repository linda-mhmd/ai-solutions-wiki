---
title: "Gemini 4 Hydrogen: Google's New Workhorse at $1.50/$7.50, Flat Across 1M Tokens"
description: "Google released Gemini 4 Hydrogen on 12 November 2026, the successor to Gemini 3.8 Flash, at $1.50 per million input tokens and $7.50 output, flat across its 1M-token context, on every tier of the Gemini API. Gemini 4 Carbon became available to developers two days earlier."
date: 2026-11-12
lastmod: 2026-11-13
last_updated: 2026-11-13
last_verified: 2026-11-13
categories: [News]
tags: [google, gemini, model-release, pricing, agents, vertex-ai]
related:
  - tools/google-gemini
  - news/gemini-4-argon
  - news/claude-fable-5-2-mythos-5-2
  - news/model-retirements-november-2026
---

Google released **Gemini 4 Hydrogen** on 12 November 2026. It is the everyday model of the Gemini 4 generation, adapted from Gemini 4 Carbon according to its model card, and Google positions it for coding, agentic workflows, multimodal analysis and tool use. Its migration guidance points users of `gemini-3.8-flash` to `gemini-4-hydrogen`. Two days earlier, on 10 November, the frontier **Gemini 4 Carbon** became generally available to paying developers.

## What is actually different

**Price, and no long-context premium.** Google gives $1.50 per million input tokens and $7.50 output, "flat across its entire 1 million-token context window". Google Cloud's pricing page lists $1.65 input on non-global endpoints. A flat price matters because the previous Pro tier, and Anthropic's Haiku 5.5, charge more once a prompt passes a threshold.

**Limits.** Model ID `gemini-4-hydrogen`. Input and output share a 1,048,576-token limit, which also covers thinking and function calls. Thinking levels are LOW, MEDIUM, HIGH (the default) and XHIGH, with XHIGH new on Hydrogen. The model card gives a March 2026 knowledge cutoff and notes "occasional slowness or timeout issues". Python users need google-genai 2.34.0 or newer.

**Speed.** Google says Hydrogen finishes tasks 2.5 times faster than Gemini 3.8 Flash at its high default setting, and that partners saw 2x to 2.8x in early testing. These are vendor figures.

**Where it is available.** All tiers of Google AI Studio and the Gemini API, Gemini for business, the Gemini app, Google Search globally, Google Antigravity for AI Pro and Ultra subscribers, and Google Cloud's Gemini Enterprise Agent Platform (formerly Vertex AI). On Google Cloud it runs on the global endpoint and in the US and EU multi-regions. Secondary coverage describes Hydrogen as the first Gemini 4 model on the free tier and as the end of the "Flash" name. Google's pages say "all tiers" but we have not seen the Flash point in Google's own words.

**Benchmarks, as Google reports them.** Against Claude Sonnet 5.5 and GPT-6.1 Terra, Google's model card shows Hydrogen ahead on some agent and reasoning tests (Agents' Last Exam v1.1 71.6%, HLE-Diamond 58.8%) and behind Sonnet 5.5 on Terminal-Bench 4.1 (57.0% against 63.9%) and OSWorld-2.1 (77.6% against 83.9%). None of these is independently reproduced.

## Gemini 4 Carbon, now available

Announced on 28 October, `gemini-4-carbon` became generally available on 10 November 2026 through the Gemini API and AI Studio, Gemini for business and Google Cloud, for paying developers and enterprises. A `gemini-4-carbon-cyber-permissive` variant is allowlisted for defensive security work. Carbon's introductory price matches Argon's, **$2/$10 per MTok until 30 November 2026, then $4/$20**. Google Cloud's pricing page shows different introductory figures for some endpoints, so check the endpoint you use. GitHub added Carbon to Copilot the same day.

## Why it matters for builders

- **Moving off 3.8 Flash is now about cost, not just quality.** 3.8 Flash's introductory $0.75/$3.75 ends on 31 December 2026 and becomes $1.50/$7.50 on 1 January 2027, Hydrogen's price. From January the two cost the same, and Google is steering 3.8 Flash users to Hydrogen. Plan the migration and re-run your evaluations in December rather than discovering the bill in January.
- **Flat long-context pricing changes the arithmetic for retrieval-heavy agents.** If you were chunking aggressively to stay under a price threshold, Hydrogen removes that reason. Latency and the reported timeouts on long decodes are the remaining limits.
- **Two Gemini 4 price steps arrive on 1 December.** Argon and Carbon both double after their introductory period ends on 30 November. See [model retirements and price changes, November 2026](/news/model-retirements-november-2026/).

## Sources

- Google, "Introducing Gemini 4 Hydrogen for Agentic Workflows" (12 November 2026): https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-hydrogen/
- Google, "Gemini 4 Hydrogen: everyday coding and agentic workflows for developers" (12 November 2026): https://blog.google/innovation-and-ai/technology/developers-tools/build-with-gemini-4-hydrogen/
- Google, "Google Search gets a major upgrade with Gemini 4 Hydrogen" (12 November 2026): https://blog.google/products-and-platforms/products/search/gemini-4-hydrogen-search-upgrade/
- Google DeepMind, Gemini 4 Hydrogen model card: https://deepmind.google/models/model-cards/gemini-4-hydrogen/
- Google Cloud, "Developer's guide to Gemini 4 Hydrogen": https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/guides/gemini-4-hydrogen
- Google Cloud, Agent Platform pricing: https://cloud.google.com/model-garden/pricing
- Google, "Gemini 4 Carbon is now available" (10 November 2026): https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-4-carbon-now-available/
- Google Cloud, Gemini 4 Carbon model page: https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/4-carbon
- Google, Gemini Developer API pricing, for the 3.8 Flash price change: https://ai.google.dev/gemini-api/docs/pricing
- GitHub Changelog, "Gemini 4 Carbon in GitHub Copilot" (10 November 2026): https://github.blog/changelog/2026-11-10-gemini-4-carbon-in-github-copilot/
- MarkTechPost, "Google Releases Gemini 4 Hydrogen" (13 November 2026), secondary, for the free-tier and Flash-name reporting: https://www.marktechpost.com/2026/11/13/google-gemini-4-hydrogen/

## Further reading

- [Google Gemini](/tools/google-gemini/): the full lineup and prices.
- [Gemini 4 Argon](/news/gemini-4-argon/): the first Gemini 4 model.
- [Claude Fable 5.2 and Mythos 5.2](/news/claude-fable-5-2-mythos-5-2/): Anthropic's release the same week.
- [Model retirements and price changes, November 2026](/news/model-retirements-november-2026/): the dates to plan around.
