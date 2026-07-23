---
title: "Why the US Restricted Anthropic's Fable 5 and Mythos 5"
description: "On June 12, 2026 the US government restricted Anthropic's two most capable models, Claude Fable 5 and Mythos 5, on national security grounds. What happened, why it matters, and what builders should learn from it."
date: 2026-06-14
lastmod: 2026-06-14
last_updated: 2026-06-14
categories: [News]
tags: ["ai-governance", "intermediate", "anthropic", "export-controls", "ai-regulation", "resilience"]
related:
  - guides/preparing-for-ai-provider-restrictions
  - frameworks/ai-regulatory-landscape
  - comparisons/eu-vs-us-ai-regulation
  - patterns/ai-governance
---

> **Update (July 2026):** These restrictions were lifted. Anthropic announced on 30 June 2026 that it was redeploying Fable 5, with access restored from 1 July 2026. See [US lifts export controls on Fable 5 and Mythos 5](/news/fable-5-export-controls-lifted/). The original account below is preserved for the record, because the risk it exposed outlasts the restriction itself.

For anyone who builds on frontier AI, this is the scenario you plan for and hope never comes: a model you depend on is switched off by government order, for everyone, with no notice. On Friday, June 12, 2026, it happened. A US national security directive ordered Anthropic to cut off foreign access to its two most capable models, Claude Fable 5 and Claude Mythos 5. The scope was not practical to enforce one user at a time, so Anthropic disabled both models for everyone, worldwide. It is widely described as the first time the US has restricted a specific commercial AI model itself, rather than the chips that run it.

## What happened

The order, which Anthropic says it received at 5:21pm ET on Friday, June 12, directed the company to stop providing Fable 5 and Mythos 5 to any foreign national, including foreign nationals inside the United States and Anthropic's own non-citizen employees. Because that scope was not practical to enforce per user, Anthropic responded by turning both models off entirely. Less capable Claude models were not affected.

The stated reason was national security. Mythos 5 is reported to be unusually strong at finding software and cybersecurity vulnerabilities, including some that had gone undiscovered for years. The immediate trigger, according to reporting, was a jailbreak that bypassed Fable 5's safeguards, which raised concern that the same techniques could unlock Mythos 5's vulnerability-finding capability for foreign adversaries.

## The mechanism is not fully public

Reporting describes this as a national security export control directive. As of publication, the precise legal authority has not been made public: no specific export control classification number, executive order, or statute has been confirmed by the outlets covering it, and the order itself reportedly did not spell out the details. Treat the exact legal basis as not yet verified. What is consistent across coverage is the shape of the event: an emergency, government-ordered restriction on access to a specific commercial model.

## Anthropic's response

Anthropic complied but publicly disagreed. The company argued that the jailbreak was a narrow, single instance, that the underlying capability is already available from competing models, and warned that if the same standard were applied across the industry it would effectively halt new model deployments for every frontier provider. That tension, between fast-moving capability and slow, blunt policy tools, is the part most likely to repeat.

## Why it matters for builders

Three takeaways:

- A model is now a thing that can be restricted, not just the hardware. Capability, not only compute, is becoming a control point.
- Restrictions can arrive with no notice and apply to everyone, not just a target country. The Fable and Mythos shutdown hit all users because the per-user version was unworkable.
- Your exposure is a function of how tightly your product is wired to one provider and one model. The teams least affected by this kind of event are the ones that can switch providers with a config change.

If a model your product depends on were disabled tomorrow, how long would it take you to recover? The practical answer to that question is an architecture decision you make in advance. See the companion guide, [how to prepare for sudden AI provider restrictions]({{< relref "guides/preparing-for-ai-provider-restrictions" >}}), and the broader [AI regulatory landscape]({{< relref "frameworks/ai-regulatory-landscape" >}}).

## Sources

1. CNN. "Anthropic's Mythos model and national security." [https://www.cnn.com/2026/06/13/business/anthropic-mythos-model-national-security](https://www.cnn.com/2026/06/13/business/anthropic-mythos-model-national-security)
2. Fortune. "Anthropic disables Fable, Mythos after export controls." [https://fortune.com/2026/06/13/anthropic-disables-fable-mythos-export-controls-national-security-threat/](https://fortune.com/2026/06/13/anthropic-disables-fable-mythos-export-controls-national-security-threat/)
3. Time. "Anthropic's Fable and Mythos ban." [https://time.com/article/2026/06/13/anthropic-fable-mythos-ban-US-security/](https://time.com/article/2026/06/13/anthropic-fable-mythos-ban-US-security/)
4. Bloomberg. "US limits foreign access to Fable 5, Mythos 5." [https://www.bloomberg.com/news/articles/2026-06-13/anthropic-says-us-limits-foreign-access-to-fable-5-mythos-5](https://www.bloomberg.com/news/articles/2026-06-13/anthropic-says-us-limits-foreign-access-to-fable-5-mythos-5)
5. Decrypt. "US government orders Anthropic to pull Claude Fable, Mythos." [https://decrypt.co/371027/us-government-orders-anthropic-pull-claude-fable-mythos-ai-models](https://decrypt.co/371027/us-government-orders-anthropic-pull-claude-fable-mythos-ai-models)
6. WION. "US restricts access to Anthropic's Mythos and Fable." [https://www.wionews.com/world/us-restricts-access-of-anthropic-s-mythos-and-fable-to-americans-only-1781372168111](https://www.wionews.com/world/us-restricts-access-of-anthropic-s-mythos-and-fable-to-americans-only-1781372168111)
7. CNBC. "Anthropic disables access to Fable 5 and Mythos 5 to comply with government directive." (June 12, 2026) [https://www.cnbc.com/2026/06/12/anthropic-disables-access-to-fable-5-and-mythos-5-to-comply-with-government-directive.html](https://www.cnbc.com/2026/06/12/anthropic-disables-access-to-fable-5-and-mythos-5-to-comply-with-government-directive.html)
8. TechCrunch. "Anthropic's safety warnings may have just backfired." (June 12, 2026) [https://techcrunch.com/2026/06/12/anthropics-safety-warnings-may-have-just-backfired-the-government-has-pulled-the-plug-on-its-most-powerful-ai/](https://techcrunch.com/2026/06/12/anthropics-safety-warnings-may-have-just-backfired-the-government-has-pulled-the-plug-on-its-most-powerful-ai/)
9. Quartz. "Anthropic disables Claude Fable 5 and Mythos 5 after U.S. export order." (June 12, 2026) [https://qz.com/anthropic-fable-5-mythos-5-export-control-directive-061226](https://qz.com/anthropic-fable-5-mythos-5-export-control-directive-061226)

## Further reading

- [Claude Opus 4.8](/news/claude-opus-4-8/): Anthropic's flagship in the same period.
- [Claude and Anthropic](/tools/claude-anthropic/): the model lineup and access.
- [The US moves to preempt state AI laws](/news/us-ai-policy-preemption-2026/): the wider US AI-policy context.
- [The 2026 LLM landscape](/comparisons/llm-landscape-2026/): how the Claude tiers compare.
