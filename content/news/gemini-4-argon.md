---
title: "Gemini 4 Argon Ships to Cyber Defenders First, With the Guardrails Off"
description: "Google announced Gemini 4 Argon on 30 September 2026 and released it first to vetted cyber defenders without cyber guardrails. Since 13 October 2026 it is generally available as gemini-4-argon on the paid Gemini API, at $2/$10 per MTok until 30 November and $4/$20 from 1 December."
date: 2026-09-30
lastmod: 2026-10-25
last_updated: 2026-10-25
last_verified: 2026-10-25
categories: [News]
tags: [google, gemini, model-release, cybersecurity, ai-governance, pricing, staged-release]
related:
  - news/gemini-3-8-flash-cyber
  - news/openai-astra-critical-cyber-threshold
  - news/claude-sonnet-5-5
  - tools/google-gemini
  - tools/google-vertex-ai
  - tools/github-copilot
---

Google announced Gemini 4 Argon on 30 September 2026. Two things about it are unusual, and neither is a benchmark.

## Update, 13 October 2026: generally available on paid tiers

Thirteen days after the announcement, Google made Argon generally available. The Gemini API release notes for 13 October 2026 list "Gemini 4 Argon (`gemini-4-argon`) generally available (GA)". Google's launch post, by Koray Kavukcuoglu, says it is "now globally available today for developers and enterprises via the API in AI Studio and Gemini platform, for Google AI Ultra subscribers in Google Antigravity, and Google AI Ultra and Pro subscribers in the Gemini app and AI Mode in Search." The text below, written on 30 September, is kept as it was; the paragraph that said not to plan a launch around Argon is no longer true and is marked where it stands.

What the documentation states, as fetched on 25 October 2026:

| | Gemini 4 Argon |
|---|---|
| Model ID | `gemini-4-argon` (stable) |
| Free tier | Not available. The pricing page: "Gemini 4 Argon is not available on the Free tier." |
| Context | 1,048,576 tokens, one window shared by input, thinking and output |
| Maximum output | 65,536 by default in a synchronous call; up to 1,048,576 minus your input with "long decode", which runs in background execution in hops of up to 64K tokens |
| Inputs / output | Text, image, video, audio and PDF in; text out |
| Not supported | Live API, audio generation, image generation, explicit context caching |
| Computer use | Preview |
| Thinking levels | `low`, `medium` (default), `high` |
| Sampling | `temperature`, `top_p` and `top_k` are ignored if sent |
| Caching | Implicit only, for prompts of at least 4,096 tokens, cached input discounted 95% |

Prices per million tokens on the paid tier, from the pricing page:

| Tier | Input / output / cached input, to 30 Nov 2026 | From 1 Dec 2026 |
|---|---|---|
| Standard | $2.00 / $10.00 / $0.10 | $4.00 / $20.00 / $0.20 |
| Batch and Flex | $1.00 / $5.00 / $0.05 | $2.00 / $10.00 / $0.10 |
| Priority | $3.60 / $18.00 / $0.18 | $7.20 / $36.00 / $0.36 |
| Contributor (invite-only private preview) | $1.00 / $5.00 / $0.05 | $2.00 / $10.00 / $0.10 |

On the Contributor tier, the pricing page answers "Used to improve our products" with "Yes", unlike the other paid tiers. The launch post's footnote on the price adds: "Applies to the Argon model intended for public access only." Google does not say what the defender build costs.

Arithmetic on the corrected limit: a maximum-length response is at most 1,048,576 output tokens minus the input, so at most about $10.49 at the introductory output rate and about $20.97 from 1 December, before input cost. The figure of "about $10" further down was the introductory price only.

**Migration notes from Google's "What's new in Gemini 4 Argon" guide.** Raise `max_output_tokens` to "at least 32,768, since Gemini 4 Argon can spend more of the limit on thinking". Remove calls that create or reference `cachedContents`, because explicit caching "is not supported on Gemini 4 Argon". Remove sampling parameters. "Use background execution, or set HTTP client timeouts to at least 15 minutes." If you set `background: true` without `max_output_tokens`, the guide says "the server stops after 64K tokens."

**Vendor claims, attributed.** Google says Argon ranks "#1 on the Vals Index", scores 87% on the Embodied Reasoning (ERQA) benchmark "relying on pure reasoning", and cuts attack success on the Gray Swan Indirect Prompt Injection benchmark "across 15 adaptive attempts to 0.7%". It also says Argon produced "a 2.85x end-to-end inference speedup on an A100 via vLLM" for Gemma 4 E2B, from about 37,900 to over 108,000 tokens per second. The ratio is consistent (108,000 / 37,900 is 2.85), but the post does not state batch size, concurrency or sequence lengths, so the speedup cannot be compared with anything else. None of these figures has been reproduced independently as of 25 October.

**GitHub Copilot.** GitHub made Gemini 4 Argon generally available in Copilot the same day, for Copilot Pro+, Max, Business and Enterprise, and says it "is billed at provider list pricing under usage-based billing."

## A million tokens of output

Argon raises the output limit to one million tokens, up from a 64K maximum. Context windows have been measured in input for years, and a million tokens of input is now ordinary across the frontier. Output has stayed small, because generation is where cost and latency live.

For builders this changes what a single call can be. Work that had to be chunked and stitched, such as translating a large codebase, generating a full test suite, or producing a long structured document in one pass, becomes a single request with one coherent plan behind it. It also changes the cost shape: at $10 per million output tokens, one maximum-length Argon response costs about $10. Introductory pricing is $2 per million input tokens, $10 per million output, with cached input discounted 95 percent.

## Released to defenders first, deliberately unguarded

The rollout is the more interesting part. Argon is going first to a set of trusted cyber defenders through Google's Fairwind Program, and for those defenders and Google's own internal teams it is released **without cyber guardrails**, so they can use its full cybersecurity capability. The guarded version is what everyone else will eventually get. Google says safely releasing frontier capability at this level requires a phased approach, that it is gathering feedback from early testers while it iterates on guardrails, and that it is taking part in the United States government's voluntary process for pre-release model access. Broader availability starts with paid API customers and Google AI Ultra subscribers.

Alongside Argon, Google shipped the Gemini 3.8 series: 3.8 Flash with better reasoning and coding at the same speed and cost as 3.7, 3.8 Flash Cyber for autonomous vulnerability discovery and patching through Fairwind, 3.8 Live for natural audio conversation, and 3.8 Live Extended Thinking, a speech-to-speech model for multi-step reasoning.

## Why it matters for builders

Three things.

First, as written on 30 September: do not plan a launch around Argon. It is announced, not generally available, and the access ladder puts vetted defenders ahead of paid API customers ahead of everyone else. (Superseded on 13 October 2026: Argon is now generally available on the paid Gemini API, see the update above. It is still not on the Free tier, and its price doubles on 1 December 2026, which is the thing to plan around now. [Gemini 3.8 Flash](/news/gemini-3-8-flash-cyber/) remains the cheaper production choice.)

Second, this is now an industry pattern rather than one vendor's choice. OpenAI treated GPT-6 Astra as crossing a [critical cyber capability threshold](/news/openai-astra-critical-cyber-threshold/) and gated it accordingly. Anthropic shipped [Sonnet 5.5](/news/claude-sonnet-5-5/) with cybersecurity safeguards carried over from its Opus tier. Google is gating Argon and running an unguarded build for defenders. Capability-triggered staged release has moved from policy paper to shipping practice at all three frontier labs inside one quarter. If you write AI policy for an organisation, the assumption that the newest model is the one you can buy no longer holds.

Third, the unguarded defender build deserves plain reading. Google is saying the model's cyber capability is strong enough that guardrails measurably reduce its usefulness to defenders, which is the same thing as saying the capability is strong enough to matter to attackers. The [DIVD breach](/news/divd-zammad-ai-agent-breach/) disclosed the same week, where an autonomous agent chained two Zammad zero-days to root in seconds, is what that capability looks like pointed the other way.

## Sources

- Google, "Gemini 4 Argon: our next era of frontier intelligence" (30 September 2026): https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-4-argon/
- Google, "The latest AI news we announced in September 2026" (2 October 2026): https://blog.google/innovation-and-ai/technology/ai/google-ai-updates-september-2026/
- VentureBeat, "Google unveils Gemini 4 Argon, retaking benchmark lead over OpenAI and Anthropic, but in limited release" (30 September 2026): https://venturebeat.com/technology/google-unveils-gemini-4-argon-retaking-benchmark-lead-over-openai-and-anthropic-but-in-limited-release
- SecurityWeek, "Google Launches Gemini 4 Argon With Guardrail-Free Access for Vetted Defenders" (30 September 2026): https://www.securityweek.com/google-launches-gemini-4-argon-with-guardrail-free-access-for-vetted-defenders/
- Google, "Gemini 4 Argon: Built to solve your hardest problems", Koray Kavukcuoglu (13 October 2026): https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-argon/
- Google AI for Developers, Gemini API release notes, 13 October 2026 entry (fetched 25 October 2026): https://ai.google.dev/gemini-api/docs/changelog
- Google AI for Developers, "What's new in Gemini 4 Argon" (last updated 16 October 2026, fetched 25 October 2026): https://ai.google.dev/gemini-api/docs/latest-model
- Google AI for Developers, Gemini 4 Argon model page (last updated 14 October 2026, fetched 25 October 2026): https://ai.google.dev/gemini-api/docs/models/gemini-4-argon
- Google AI for Developers, Gemini Developer API pricing (fetched 25 October 2026): https://ai.google.dev/gemini-api/docs/pricing
- GitHub Changelog, "Gemini 4 Argon in GitHub Copilot" (13 October 2026): https://github.blog/changelog/2026-10-13-gemini-4-argon-in-github-copilot

## Further reading

- [Gemini 3.8 Flash Cyber](/news/gemini-3-8-flash-cyber/): the Fairwind Program's earlier model.
- [Google Gemini](/tools/google-gemini/): the current family and what each tier costs.
- [GPT-6.1 Sol and DevDay 2026](/news/openai-gpt-6-1-sol/): the same price point, one day earlier.
- [GitHub Copilot](/tools/github-copilot/): which Copilot plans get Argon.
