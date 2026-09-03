---
title: "Claude Fable 5.1 Reaches General Availability, Mythos 5.1 Stays Gated"
description: "Anthropic shipped Claude Fable 5.1 to general availability on September 1, 2026 at unchanged headline pricing but with cache reads cut 75%, while Mythos 5.1 launched alongside it restricted to vetted cybersecurity and life-sciences organizations."
date: 2026-09-01
lastmod: 2026-09-03
categories: [News]
tags: [anthropic, claude, fable-5-1, mythos-5-1, model-release, pricing, cybersecurity, life-sciences]
related:
  - news/anthropic-fable-mythos-us-restriction
  - news/fable-5-export-controls-lifted
  - tools/claude-anthropic
  - comparisons/llm-landscape-2026
---

Anthropic released Claude Fable 5.1 to general availability on September 1, 2026, positioning it as its most capable model for programming and complex knowledge work, at the same headline API price as Fable 5 but with cache reads cut 75%. Alongside it, Anthropic launched Claude Mythos 5.1 — the same underlying model with fewer safeguards, built for cybersecurity and life-sciences research — but access to Mythos 5.1 stays restricted to a small set of vetted organizations rather than shipping generally available.

## What happened

Fable 5.1 is available immediately across the Claude API, Claude Code, Claude Enterprise, and Claude Platform, and through Amazon Web Services, Google Cloud, and Microsoft Azure. Anthropic describes it as its most advanced model for coding, knowledge work, and long-running problem-solving, and reports these benchmark gains over Fable 5: Terminal-Bench-Science 0.1 rose from 24.7% to 52.6%, Terminal-Bench 4.0 from 42.0% to 55.8%, CursorBench 3.2.0 from 70.5% to 73.4%, and Humanity's Last Exam (with tools) from 63.8% to 65.0%. Anthropic also says Claude Code users see an average of around 60% fewer interventions per session from its cybersecurity safeguards on Fable 5.1 than they did under Fable 5's safeguards, and that the model can identify software vulnerabilities but not generate exploits.

Pricing did not change at the token level: $10 per million input tokens and $50 per million output tokens, same as Fable 5, confirmed on Anthropic's own pricing page. What did change is cache-read pricing — cut from $1 to $0.25 per million tokens, a 75% reduction, because Fable 5.1 and Mythos 5.1 use a 0.025x multiplier on the base input rate for cache hits instead of the 0.1x multiplier every other current Claude model uses. Anthropic says this brings typical workload costs down about 25% and highly agentic workload costs down by up to 45%, since agentic sessions re-read large amounts of cached context on every turn.

Mythos 5.1 launched the same day but did not ship generally available. It is the identical model to Fable 5.1 with a different, lighter safeguard stack, aimed at cyberdefenders and life-science researchers who need capabilities the general-availability safeguards would otherwise block. Anthropic's pricing page lists Mythos 5.1 at the same rates as Fable 5.1 — including the same $0.25/MTok cache-read price — but marks it "limited availability," linking to Anthropic's Project Glasswing access page. As of launch, access is limited to a set of US organizations; Anthropic says it is coordinating with the US government to extend access to more domestic and international partners. Two named verification programs sit under that access structure: the Cyber Verification Program (CVP), which today grants vetted defenders reduced-safeguard access to Opus- and Sonnet-class models and which Anthropic says will extend to Mythos-class models "in the near future" — not yet, as of this launch; and the Life Sciences Verification Program (LSVP), run in partnership with the US government, which Anthropic says has already enrolled its first participants and plans to expand to the broader life-sciences community.

This article covers only the GA announcement itself. It does not re-cover the June 2026 US national-security order that took the prior Fable 5 and Mythos 5 offline for everyone, or the July 2026 reversal that restored them — see [Why the US restricted Anthropic's Fable 5 and Mythos 5](/news/anthropic-fable-mythos-us-restriction/) and [US lifts export controls on Fable 5 and Mythos 5](/news/fable-5-export-controls-lifted/) for that history.

## Why it matters for builders

For most teams already on Fable 5, this is a low-friction upgrade: same per-token price, better benchmark results, and a real cost lever if your workload leans on prompt caching — agentic coding and long-running tool-use sessions that repeatedly re-read the same context stand to save the most from the cache-read cut.

For teams whose roadmap depends on frontier cybersecurity or biological-research capability, Mythos 5.1 is a reminder that this tier of Claude is not a self-serve API key. Access runs through an application and verification process (CVP for defensive security, LSVP for life sciences), it is currently US-only, and even the CVP's own Mythos-class coverage is described as forthcoming rather than live at launch. If a product plan assumes near-term access to Mythos-class capability, budget lead time for verification rather than assuming a signup form. It is also worth reading this launch next to the restriction history above: the same capability class that makes Mythos attractive to defenders is exactly what triggered a government-mandated shutdown of the previous generation less than three months earlier — the gated access model on Mythos 5.1 is Anthropic operating inside that lesson, not despite it.

## Sources

1. Anthropic, "Introducing Claude Fable 5.1 and Claude Mythos 5.1": [https://www.anthropic.com/claude-fable-and-mythos-5-1](https://www.anthropic.com/claude-fable-and-mythos-5-1)
2. Anthropic, "Pricing": [https://platform.claude.com/docs/en/about-claude/pricing](https://platform.claude.com/docs/en/about-claude/pricing)
3. Anthropic, "Project Glasswing": [https://anthropic.com/glasswing](https://anthropic.com/glasswing)
4. MacRumors, "Anthropic Launches Claude Fable 5.1 With Lower Costs and Fewer False Positives" (September 1, 2026): [https://www.macrumors.com/2026/09/01/anthropic-claude-fable-5-1/](https://www.macrumors.com/2026/09/01/anthropic-claude-fable-5-1/)
5. VentureBeat, "Anthropic's Claude Fable 5.1 and Mythos 5.1 arrive with a 75% cost reduction for Fable cache reads" (September 1, 2026): [https://venturebeat.com/technology/anthropics-claude-fable-5-1-and-mythos-5-1-arrive-with-a-75-cost-reduction-for-fable-cache-reads](https://venturebeat.com/technology/anthropics-claude-fable-5-1-and-mythos-5-1-arrive-with-a-75-cost-reduction-for-fable-cache-reads)

## Further reading

- [Why the US restricted Anthropic's Fable 5 and Mythos 5](/news/anthropic-fable-mythos-us-restriction/): the June 2026 national-security shutdown of the predecessor models.
- [US lifts export controls on Fable 5 and Mythos 5](/news/fable-5-export-controls-lifted/): how that restriction was reversed weeks before 5.1 shipped.
- [Claude and Anthropic](/tools/claude-anthropic/): the full Claude model lineup and access tiers.
- [The 2026 LLM landscape](/comparisons/llm-landscape-2026/): how Fable 5.1 compares to competing frontier models.
