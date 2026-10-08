---
title: "Anthropic Launches the Cyber Mission: Free Model Scans for Open Source, Help for Grid Operators"
description: "On 8 October 2026 Anthropic announced the Anthropic Cyber Mission: an opt-in OSS Scanner giving open-source projects free vulnerability scans with proof-of-concept exploits, and a Critical Infrastructure Defense Program with 11 founding partners. Project Glasswing folds into the Cyber Verification Program."
date: 2026-10-08
lastmod: 2026-10-08
last_updated: 2026-10-08
last_verified: 2026-10-08
categories: [News]
tags: [anthropic, security, open-source, critical-infrastructure, vulnerability-scanning, cyber-defense]
related:
  - news/ai-cyber-defense-open-letter-2026
  - news/gemini-4-argon
  - news/openai-astra-critical-cyber-threshold
  - tools/claude-anthropic
---

Anthropic announced the **Anthropic Cyber Mission** on 8 October 2026, a long-term programme to put its strongest models to work for defenders. It starts in two places, open-source software and critical infrastructure, and it follows the expansion of Anthropic's Cyber Verification Program two days earlier.

## What happened

**OSS Scanner.** An opt-in service: enrolled open-source projects get periodic free scans by Anthropic's strongest models, with proof-of-concept exploits, explanations and suggested fixes where available. Anthropic says it expects a true-positive rate above 90 percent. It will offer the scanner to projects that can keep up with the findings and keep human-verified disclosure for those that cannot, which is a sensible response to the real risk: a flood of correct findings can overwhelm a volunteer maintainer as badly as a flood of wrong ones.

**Critical Infrastructure Defense Program (CIDP).** Frontier Claude models, on-site engineers and threat research for organisations that secure operational technology for power grids, water, transport and government systems. It has 11 founding partners: Accenture, Booz Allen, CrowdStrike, Deloitte, Dragos, Hitachi, Insane Cyber, Nozomi Networks, Palo Alto Networks, PwC and Rockwell Automation.

**Money and maintainers.** Anthropic says it will fund organisations behind widely used open-source code, naming the Python Software Foundation, Alpha-Omega, OpenSSF and the Apache Software Foundation, plus groups that coordinate vulnerability reports. The scanner is funded through its Defender Advantage Fund, and maintainers can get free Claude Max subscriptions through Claude for Open Source.

**Glasswing folds in.** Project Glasswing, the restricted cyber programme around the Mythos models, is merged into the expanded Cyber Verification Program.

Anthropic also states a forecast: that AI will favour defence over offence in about two years. That is a forecast, not a finding, and the post itself notes that some operational-technology fixes take decades to deploy.

## Why it matters for builders

If you maintain an open-source project that others depend on, this is worth enrolling in, with your eyes open about triage capacity. Decide before the first scan who reads the reports, how fast you can ship fixes, and how you handle proof-of-concept exploits arriving in your inbox.

If you consume open source, the effect is indirect but real: more of your dependencies will be scanned by frontier models, by Anthropic and by others. That shortens the gap between a bug existing and someone knowing about it, on both sides. Patch cadence, not scanning, is now the bottleneck, so make sure your own dependency updates are routine rather than heroic.

## Sources

- Anthropic, "Introducing the Anthropic Cyber Mission" (8 October 2026): https://www.anthropic.com/news/anthropic-cyber-mission
- Anthropic, "Expanding the Cyber Verification Program" (6 October 2026): https://www.anthropic.com/news/cyber-verification-program

## Further reading

- [The AI cyber-defence open letter](/news/ai-cyber-defense-open-letter-2026/): the wider debate about who gets offensive-grade models.
- [Gemini 4 Argon](/news/gemini-4-argon/): Google's frontier model shipping to cyber defenders first.
- [OpenAI's Astra and the critical cyber threshold](/news/openai-astra-critical-cyber-threshold/): how OpenAI handles the same capability.
- [Claude by Anthropic](/tools/claude-anthropic/): the models and the Cyber Verification Program tiers.
