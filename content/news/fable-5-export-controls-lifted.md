---
title: "US Lifts Export Controls on Anthropic's Fable 5 and Mythos 5"
description: "The US restrictions that took Claude Fable 5 and Mythos 5 offline for everyone in June 2026 were lifted. Anthropic announced on 30 June 2026 that it was redeploying the models, with access restored from 1 July."
date: 2026-07-17
lastmod: 2026-07-17
last_updated: 2026-07-17
categories: [News]
tags: [anthropic, fable-5, mythos-5, export-controls, ai-governance, resilience]
related:
  - news/anthropic-fable-mythos-us-restriction
  - news/claude-opus-4-8
  - news/us-ai-policy-preemption-2026
---

In June 2026, a US national security order took Claude Fable 5 and Mythos 5 offline for everyone, worldwide, with almost no notice. That restriction has now been lifted. Anthropic announced on 30 June 2026 that it was redeploying the models, and access was restored from 1 July. For teams that scrambled to reroute workloads three weeks earlier, the models are back, though the episode leaves a lasting lesson about depending on a single provider.

<figure class="bz-figure">
  <img src="/img/enterprise-dark/chamber-red-arches-notext.png" alt="A dark chamber framed with glowing red neon arches, suggesting a controlled gateway reopening." loading="lazy">
  <figcaption>Access was switched off by order and then switched back on. The models returned, but the risk it exposed did not.</figcaption>
</figure>

## What happened

Per Anthropic's announcement, the restrictions imposed on 12 June 2026 were lifted, and Anthropic began redeploying Fable 5 from 1 July 2026 across the Claude Platform, Claude.ai, Claude Code, and Claude Cowork. To manage the surge as the models came back, Anthropic initially capped Fable 5 at 50% of weekly usage limits through 7 July 2026 for Pro, Max, Team, and select Enterprise plans, then moved to serving the remainder via usage credits.

This is the other half of a story the wiki covered when it began: [the June restriction](/news/anthropic-fable-mythos-us-restriction/) was widely described as the first time the US restricted a specific commercial AI model itself, rather than the chips behind it. The reversal is announced by Anthropic; the wiki cites Anthropic's own statement for the redeployment and does not assert a specific government instrument it cannot verify.

## Why it matters for builders

The models are back, but the risk the episode revealed is permanent: a model you depend on can be switched off for everyone by government order, with no notice, and switched back on weeks later on someone else's schedule. That is not a hypothetical anymore. It happened, and it happened to the frontier models many production systems were built on.

The takeaway is unchanged from June, and now better evidenced. Keep a fallback model wired and tested, abstract your provider behind an interface so switching is a config change rather than a rebuild, and treat "which model can I legally serve, to whom" as an architectural question, not just a procurement one. See [preparing for AI provider restrictions](/guides/preparing-for-ai-provider-restrictions/) for the concrete patterns.

## Sources

- Anthropic, "Redeploying Fable 5": https://www.anthropic.com/news/redeploying-fable-5

## Further reading

- [Why the US restricted Anthropic's Fable 5 and Mythos 5](/news/anthropic-fable-mythos-us-restriction/): the original restriction this reverses.
- [Preparing for AI provider restrictions](/guides/preparing-for-ai-provider-restrictions/): how to build so a provider outage or ban is survivable.
- [The US moves to preempt state AI laws](/news/us-ai-policy-preemption-2026/): the wider US policy backdrop.
