---
title: "Gemini 4 Argon Ships to Cyber Defenders First, With the Guardrails Off"
description: "Google announced Gemini 4 Argon on 30 September 2026 with a one million token output limit, up from 64K, and released it first to vetted cyber defenders through the Fairwind Program without cyber guardrails. General access follows later, starting with paid API customers."
date: 2026-09-30
lastmod: 2026-10-03
last_updated: 2026-10-03
last_verified: 2026-10-03
categories: [News]
tags: [google, gemini, model-release, cybersecurity, ai-governance, pricing, staged-release]
related:
  - news/gemini-3-8-flash-cyber
  - news/openai-astra-critical-cyber-threshold
  - news/claude-sonnet-5-5
  - tools/google-gemini
  - tools/google-vertex-ai
---

Google announced Gemini 4 Argon on 30 September 2026. Two things about it are unusual, and neither is a benchmark.

## A million tokens of output

Argon raises the output limit to one million tokens, up from a 64K maximum. Context windows have been measured in input for years, and a million tokens of input is now ordinary across the frontier. Output has stayed small, because generation is where cost and latency live.

For builders this changes what a single call can be. Work that had to be chunked and stitched, such as translating a large codebase, generating a full test suite, or producing a long structured document in one pass, becomes a single request with one coherent plan behind it. It also changes the cost shape: at $10 per million output tokens, one maximum-length Argon response costs about $10. Introductory pricing is $2 per million input tokens, $10 per million output, with cached input discounted 95 percent.

## Released to defenders first, deliberately unguarded

The rollout is the more interesting part. Argon is going first to a set of trusted cyber defenders through Google's Fairwind Program, and for those defenders and Google's own internal teams it is released **without cyber guardrails**, so they can use its full cybersecurity capability. The guarded version is what everyone else will eventually get. Google says safely releasing frontier capability at this level requires a phased approach, that it is gathering feedback from early testers while it iterates on guardrails, and that it is taking part in the United States government's voluntary process for pre-release model access. Broader availability starts with paid API customers and Google AI Ultra subscribers.

Alongside Argon, Google shipped the Gemini 3.8 series: 3.8 Flash with better reasoning and coding at the same speed and cost as 3.7, 3.8 Flash Cyber for autonomous vulnerability discovery and patching through Fairwind, 3.8 Live for natural audio conversation, and 3.8 Live Extended Thinking, a speech-to-speech model for multi-step reasoning.

## Why it matters for builders

Three things.

First, do not plan a launch around Argon. It is announced, not generally available, and the access ladder puts vetted defenders ahead of paid API customers ahead of everyone else. If you need a Google model in production this quarter, that is [Gemini 3.8 Flash](/news/gemini-3-8-flash-cyber/) or the 3.1 Pro tier, not Argon.

Second, this is now an industry pattern rather than one vendor's choice. OpenAI treated GPT-6 Astra as crossing a [critical cyber capability threshold](/news/openai-astra-critical-cyber-threshold/) and gated it accordingly. Anthropic shipped [Sonnet 5.5](/news/claude-sonnet-5-5/) with cybersecurity safeguards carried over from its Opus tier. Google is gating Argon and running an unguarded build for defenders. Capability-triggered staged release has moved from policy paper to shipping practice at all three frontier labs inside one quarter. If you write AI policy for an organisation, the assumption that the newest model is the one you can buy no longer holds.

Third, the unguarded defender build deserves plain reading. Google is saying the model's cyber capability is strong enough that guardrails measurably reduce its usefulness to defenders, which is the same thing as saying the capability is strong enough to matter to attackers. The [DIVD breach](/news/divd-zammad-ai-agent-breach/) disclosed the same week, where an autonomous agent chained two Zammad zero-days to root in seconds, is what that capability looks like pointed the other way.

## Sources

- Google, "Gemini 4 Argon: our next era of frontier intelligence" (30 September 2026): https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-4-argon/
- Google, "The latest AI news we announced in September 2026" (2 October 2026): https://blog.google/innovation-and-ai/technology/ai/google-ai-updates-september-2026/
- VentureBeat, "Google unveils Gemini 4 Argon, retaking benchmark lead over OpenAI and Anthropic, but in limited release" (30 September 2026): https://venturebeat.com/technology/google-unveils-gemini-4-argon-retaking-benchmark-lead-over-openai-and-anthropic-but-in-limited-release
- SecurityWeek, "Google Launches Gemini 4 Argon With Guardrail-Free Access for Vetted Defenders" (30 September 2026): https://www.securityweek.com/google-launches-gemini-4-argon-with-guardrail-free-access-for-vetted-defenders/

## Further reading

- [Gemini 3.8 Flash Cyber](/news/gemini-3-8-flash-cyber/): the Fairwind Program's earlier model.
- [Google Gemini](/tools/google-gemini/): the current family and what each tier costs.
- [GPT-6.1 Sol and DevDay 2026](/news/openai-gpt-6-1-sol/): the same price point, one day earlier.
