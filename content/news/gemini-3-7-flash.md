---
title: "Google Ships Gemini 3.7 Flash Three Weeks After 3.6, at Half the Price"
description: "Gemini 3.7 Flash launched on 13 August 2026 with large gains on coding and agentic benchmarks over 3.6 Flash, at introductory pricing of $0.75/$3.75 per million tokens. Google shipped two Flash-tier models in 23 days."
date: 2026-08-13
lastmod: 2026-09-02
last_updated: 2026-09-02
categories: [News]
tags: [google, gemini, model-release, coding-agents, agentic-ai, pricing]
related:
  - tools/google-gemini
  - news/gemini-3-5-flash
  - comparisons/llm-landscape-2026
  - glossary/reasoning-models
---

Google released **Gemini 3.7 Flash on 13 August 2026**, twenty-three days after Gemini 3.6 Flash. Google calls it "our most intelligent workhorse model yet for coding and agents." The benchmark deltas over its three-week-old predecessor are large, and the introductory price is half what 3.6 Flash cost. The interesting fact here is not any single number; it is the cadence.

## What happened

Gemini 3.7 Flash is the third Flash-tier release in the 3.x line this year, after [Gemini 3.5 Flash](/news/gemini-3-5-flash/) at I/O on 19 May 2026 and Gemini 3.6 Flash on 21 July 2026. Google positions it as the default workhorse: not the frontier reasoning tier, but the model most production traffic is expected to run on.

Google's published comparison against Gemini 3.6 Flash:

| Benchmark | Gemini 3.7 Flash | Gemini 3.6 Flash |
|---|---|---|
| FrontierCode 1.1 | 43.6% | 34.4% |
| DeepSWE v1.1 | 65.3% | 49.0% |
| WebDev Arena (Elo) | 1588 | 1538 |
| GDP.pdf | 34.0% | 22.0% |
| AutomationBench | 30.4% | 17.0% |

These are Google's own evaluations. The independent [Artificial Analysis](https://artificialanalysis.ai/) Intelligence Index placed Gemini 3.7 Flash at 56 — useful as a cross-check, because vendor-run agentic benchmarks are among the least comparable numbers in the industry.

**Pricing.** Introductory rates of **$0.75 per million input tokens and $3.75 per million output tokens** run through 31 December 2026, rising to **$1.50/$7.50** on 1 January 2027. The standard rate is what 3.6 Flash charged, so the introductory period is a genuine 50% discount rather than a repricing — third-party listings show it flagged as exactly that. The model is documented with a **1,048,576-token context window** and up to **65,536 output tokens**.

**Availability.** Google Antigravity, the Gemini API through AI Studio and Android Studio, the Gemini Enterprise Agent Platform, and Gemini Spark for Pro and Ultra subscribers across 160+ countries.

## The rest of Google's August

Gemini 3.7 Flash did not ship alone. In the same month Google announced:

- **Gemini 3.5 Transcribe**, a speech-to-text model aimed at voice agents, live captioning, and post-call analytics, with better handling of noise and technical jargon.
- **Gemini Omni 1.1 Flash**, a video generation model adding scene extension, frame interpolation, and 4K upscaling, in Flow, AI Studio, and the Gemini app.
- The **Gemini app passing one billion monthly active users**, which Google describes as the fastest-growing product in its history.
- **Gemma** passing one billion cumulative downloads.
- **WeatherNext 2**, an open-sourced cyclone prediction model.
- The **Pixel 11** series on Tensor G6, running Gemini Nano on device.

## Why it matters for builders

Three weeks between workhorse releases changes how you should hold model choice.

**Pin your model version.** A 16-point jump on DeepSWE is welcome; an unannounced behaviour change under an unpinned alias is not. If your prompts, evals, or tool-calling logic were tuned against 3.6 Flash, treat 3.7 as a migration with its own eval run, not a free upgrade.

**Budget on the standard price, not the introductory one.** $0.75/$3.75 expires on 31 December 2026. A cost model built on introductory rates doubles in January. This is the second time in a month a lab has moved a headline price — Anthropic went the other way and [made Sonnet 5's introductory pricing permanent](/news/claude-sonnet-5-pricing-permanent/) — which is a reminder that inference pricing is currently a competitive instrument, not a stable input.

**The Flash tier is where the interesting competition is.** The frontier tier gets the headlines, but a model at $0.75 per million input tokens scoring 65.3% on DeepSWE is what changes unit economics for agent loops, where every step pays for the last step's output. See [model tier routing](/patterns/model-tier-routing/) for how to exploit that without hardcoding a single vendor, and [LLM cost optimization](/guides/llm-cost-optimization/) for the arithmetic.

## Sources

1. Google, "Gemini 3.7 Flash: our most intelligent workhorse model" (13 August 2026): [https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-3-7-flash/](https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-3-7-flash/)
2. Google, "The latest AI news we announced in August 2026": [https://blog.google/innovation-and-ai/technology/google-ai-updates-august-2026/](https://blog.google/innovation-and-ai/technology/google-ai-updates-august-2026/)
3. Google Cloud, "Gemini 3.7 Flash" model documentation: [https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-7-flash](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-7-flash)
4. Google, Gemini API release notes: [https://ai.google.dev/gemini-api/docs/changelog](https://ai.google.dev/gemini-api/docs/changelog)
5. OpenRouter, Gemini 3.7 Flash model card (context length, output limit, live pricing): [https://openrouter.ai/google/gemini-3.7-flash](https://openrouter.ai/google/gemini-3.7-flash)
6. 9to5Google, "Gemini 3.7 Flash launches three weeks after last model, live in Spark" (13 August 2026): [https://9to5google.com/2026/08/13/gemini-3-7-flash-launch/](https://9to5google.com/2026/08/13/gemini-3-7-flash-launch/)
7. TechCrunch, "Google releases three new Gemini models — but no 3.5 Pro" (21 July 2026): [https://techcrunch.com/2026/07/21/google-releases-three-new-gemini-models-but-no-3-5-pro/](https://techcrunch.com/2026/07/21/google-releases-three-new-gemini-models-but-no-3-5-pro/)

## Further reading

- [Google ships Gemini 3.5 Flash at I/O 2026](/news/gemini-3-5-flash/): where this line started.
- [The 2026 LLM landscape](/comparisons/llm-landscape-2026/): how the Flash tier compares across providers.
- [Model tier routing](/patterns/model-tier-routing/): send cheap work to cheap models without hardcoding a vendor.
- [LLM cost optimization](/guides/llm-cost-optimization/): what a price change actually does to your bill.
- [Google Gemini](/tools/google-gemini/): API and tooling details.
