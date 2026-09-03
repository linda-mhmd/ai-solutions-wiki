---
title: "Claude vs ChatGPT: Constraints Before Features"
description: "Claude (Anthropic) and ChatGPT (OpenAI) compared by what actually rules an option out first — jurisdiction, restricted-access model tiers, single-vendor resilience, exit cost, and cloud contracts — before the feature and pricing differences that only matter once both clear your constraints."
date: 2026-03-24
last_verified: 2026-09-03
categories: [Comparisons]
tags: ["ai-ml", "claude", "chatgpt", "gpt", "comparison", "llm", "foundation-models", "image-generation", "claude-design", "vendor-lock-in", "resilience", "constraint-driven", "cloud-strategy"]
last_updated: 2026-09-03
lastmod: 2026-09-03
related:
  - guides/constraint-driven-comparisons
  - comparisons/openai-vs-anthropic
  - glossary/cloud-act
  - guides/preparing-for-ai-provider-restrictions
  - guides/software-licensing-and-vendor-lock-in
  - glossary/model-context-protocol
  - news/claude-fable-5-1-mythos-5-1-ga
  - news/openai-astra-critical-cyber-threshold
---

<figure class="bz-figure">
  <img src="/img/enterprise-dark/twin-gears-red-notext.png" alt="Two dark interlocking gear clusters with red accent teeth, representing two competing AI products evaluated side by side." loading="lazy">
  <figcaption>Claude and ChatGPT are two products built on two model families. Most comparisons ask which is better. The more useful question is what, specifically, rules one of them out for you.</figcaption>
</figure>

People search "Claude vs ChatGPT" when they mean the apps, and "Claude vs GPT" when they mean the models inside them. **ChatGPT** (OpenAI) and **Claude** (Anthropic) are the products you log into. **GPT** and **Claude** are the model families that power them. That distinction still matters, but it is not the one that decides most real evaluations. In practice, an organization rarely ends up on one of these two because it scored higher on a feature grid. Something rules the other one out first, or makes it materially more expensive to adopt: which government can compel your provider to hand over data, whether the model tier you actually need is even open to your organization, what a prior outage already cost you, which cloud contract procurement already signed. This page is organized around those constraints, in the [house methodology](/guides/constraint-driven-comparisons/) this wiki uses for comparisons generally, with the feature and pricing detail that most comparisons lead with pushed to where it belongs: after the constraints that make it relevant.

## Which constraints are actually in play here

Not every constraint category applies to every comparison. For Claude vs ChatGPT specifically:

- **Regulatory and jurisdictional exposure** is mostly a wash between the two, not a differentiator — both are US-headquartered companies subject to the same US legal mechanisms, and both leave you with the same deployment-time obligations under EU law regardless of which model sits behind your product. There is one live exception, addressed below: each vendor now gates its single most capable model tier behind a restricted-access program, for the same underlying reason.
- **Resilience** is a real, sourced differentiator, but not the one you might expect — it has direct precedent for Anthropic and only theoretical precedent (so far) for OpenAI, and the right conclusion is not "avoid the one with precedent."
- **Vendor lock-in and exit cost** is a genuine, shrinking-but-not-gone tradeoff.
- **Contractual and customer-driven requirements** — which cloud your organization already has a signed agreement with — used to be close to a gate. It largely isn't any more, and that change is recent enough that a lot of existing guidance (including older parts of this wiki) has not caught up.
- **Cost structure** is a tradeoff worth a real table, not a paragraph of hand-waving, because both providers publish exact numbers.
- **Data gravity** and **internal capability** are not meaningfully different between these two for most organizations — both are called over a network API, neither requires operating infrastructure, and the skills to integrate one transfer almost entirely to the other. They are not covered as separate sections here for that reason.

## Gate: neither product changes your jurisdiction

If your constraint is "I cannot use a provider a foreign government can compel," this comparison does not resolve it either way. Anthropic and OpenAI are both US-incorporated. Both are therefore providers "subject to US jurisdiction" for the purposes of the **US CLOUD Act** (18 U.S.C. § 2713), which requires disclosure of data in a provider's possession, custody, or control regardless of where in the world it is physically stored — see [the US CLOUD Act](/glossary/cloud-act/) for the statute and its unresolved conflict with Article 48 GDPR. Choosing Claude over ChatGPT, or the reverse, does not touch this exposure. If a hard "no US CLOUD Act reach" requirement is what's actually driving the decision, both products in this comparison are eliminated together, and the reader needs a different comparison — a non-US-domiciled provider, or an on-premise deployment — not a closer read of this one.

A related, separate obligation sits on you rather than on either vendor. If you ship a chatbot, voice agent, or generated-content feature to users in the EU, the AI Act's Article 50 transparency duties — disclosure that a user is talking to a machine, labelling of AI-generated content — became enforceable on 2 August 2026, and they apply to what you build and where you ship it, not to which underlying model you picked. See [EU AI Act enforcement begins](/news/eu-ai-act-enforcement-begins-2026/) for exactly what is and is not in force, following the Digital Omnibus (Regulation (EU) 2026/1744) that deferred the Annex III high-risk deadline to 2 December 2027 while leaving Article 50 on schedule. Neither Claude nor ChatGPT satisfies this obligation for you by default; it is implemented at your application layer regardless of which one you call.

## Gate: the most capable tier on each side is not open access

This is new since this page was last substantially revised, and it is the one place jurisdiction actually bites asymmetrically within this comparison — not between Claude and ChatGPT, but between each vendor's mainstream models and their own most capable model.

**On the Anthropic side:** Claude Fable 5.1 reached general availability on 1 September 2026 at the same pricing as Fable 5 ($10/MTok input, $50/MTok output), with a companion model, **Claude Mythos 5.1**, released the same day at identical pricing but gated behind Anthropic's verification programs — the Cyber Verification Program (CVP) and the Life Sciences Verification Program (LSVP) — rather than sold as open access the way the rest of the lineup is. As of launch, access is US-only and CVP's own coverage of Mythos-class models (as opposed to the Opus- and Sonnet-class access it already grants) is described by Anthropic as forthcoming, not yet live. This is not a one-off: in June 2026, a US national-security order required Anthropic to disable the prior generation, Fable 5 and Mythos 5, for every user worldwide with essentially no notice, specifically because of Mythos's unusually strong vulnerability-discovery capability; access was restored on 1 July 2026 after the order was lifted. See [why the US restricted Fable 5 and Mythos 5](/news/anthropic-fable-mythos-us-restriction/), [the restrictions being lifted](/news/fable-5-export-controls-lifted/), and [Fable 5.1 reaching general availability while Mythos 5.1 stays gated](/news/claude-fable-5-1-mythos-5-1-ga/) for the full detail this section summarizes. Pricing above is Anthropic's own documentation, verified this session.

**On the OpenAI side, the same pattern showed up this week.** OpenAI published "Path to Astra" on 1 September 2026, disclosing that **Astra** — which shipped generally on 3 September 2026 under the combined name **GPT-6 Astra** — is the first OpenAI model to cross the "Critical" cybersecurity threshold in its own Preparedness Framework: in testing, it chained two previously-unknown vulnerabilities into a working exploit without a human directing each step. Rather than a normal tiered rollout, initial access at launch went to a small set of vetted alpha testers reported to include US government bodies and critical-infrastructure defenders, with broader defensive access following through "Daybreak Blue" (part of OpenAI's existing Daybreak cybersecurity trusted-access program) and general availability to ChatGPT Plus, Pro, Business, and Enterprise plans, the API, and Amazon Bedrock in the days after. See [Astra becomes the first OpenAI model to cross the "Critical" cyber threshold](/news/openai-astra-critical-cyber-threshold/) for the full account, including what is primary-sourced (the Preparedness Framework mechanics) versus well-corroborated secondary reporting (the exact shape of Daybreak Blue eligibility).

Two things follow, and they cut against the framing that usually accompanies news like this. First, this is not a reason to prefer one vendor over the other — both are now demonstrating that a frontier lab's single most capable model can be withheld or clawed back on national-security grounds, and Anthropic has one realized incident to OpenAI's zero only because Anthropic's most capable model reached that capability threshold first; the underlying exposure is a function of being a frontier US AI lab, not of which one you pick. Second, if your actual requirement is "access to whichever model is the absolute frontier, on demand," neither vendor currently guarantees that as a product for an unverified organization — this is a live example of the "internal capability and organizational eligibility" constraint applying at the vendor's discretion rather than at your budget. Treat both facts as current-as-of-publication: the GPT-6 Astra rollout was two days old at the time this page was verified, and the details of its broader release are still moving.

## Tradeoff: what a single-vendor outage actually costs

The June 2026 Fable/Mythos shutdown is worth returning to on its own terms, separate from the access-gating point above, because it is the clearest concrete evidence either vendor has produced for the generic "resilience" line item that a feature table usually reduces to a checkmark. A model a production system depended on was switched off, for everyone, by government order, with about an hour's notice to the vendor and none to its customers — and switched back on three weeks later on a timeline the affected organizations did not control. No comparable event has yet happened to an OpenAI model. That asymmetry is real, but it is evidence of timing, not of a durable difference in exposure: both companies operate under the same government's jurisdiction and the same category of authority was invoked once already at exactly the point one lab's model crossed a capability threshold OpenAI's models have, per this week's Critical-threshold classification of Astra, now also crossed.

The actionable version of this constraint is the same regardless of which vendor you're evaluating: if a model your product depends on were disabled tomorrow, how long would recovery take, and is that number acceptable? [Preparing for AI provider restrictions](/guides/preparing-for-ai-provider-restrictions/) covers the concrete architecture pattern — abstracting the provider behind an interface, keeping a tested fallback model wired in, treating "which model can I legally serve to whom" as an architecture decision rather than a procurement afterthought. That pattern is identical whether the primary vendor is Anthropic or OpenAI, which is itself the point: this constraint argues for multi-vendor resilience engineering, not for choosing one of these two products over the other.

## Tradeoff: exit cost and lock-in

Genuine lock-in here is lower than it was a couple of years ago, and higher than zero. The Model Context Protocol (MCP), the open standard Anthropic introduced in late 2024 for connecting a model to external tools, is now supported by OpenAI, Google, and Microsoft as well, so a tool-calling integration built around MCP is no longer wedded to one vendor's proprietary function-calling format — see [Model Context Protocol](/glossary/model-context-protocol/) and [tool use](/glossary/tool-use/). That standardization is the single biggest reduction in switching cost either vendor has shipped.

What remains sticky is everything each vendor built on top of the shared model layer. Claude Code's agentic coding workflows, Claude Design's design-system extraction, and Claude Managed Agents' session model do not have exact OpenAI equivalents to port to; OpenAI's Codex tooling, its embeddings family (`text-embedding-3-*`, which Anthropic does not offer a first-party equivalent to), and its multi-agent orchestration beta are the same kind of one-way dependency in the other direction. A RAG pipeline built on OpenAI embeddings is not a config change away from Claude, because there is no first-party Claude embedding model to switch to — that specific piece of infrastructure has to move to a third party regardless of which chat model you pick. [Software licensing and vendor lock-in](/guides/software-licensing-and-vendor-lock-in/) covers how to keep this kind of dependency concentrated in the layers that are cheap to replace, which is the actionable version of this constraint: keep the parts you build with MCP and portable data formats, and go in with eyes open about the parts — orchestration surfaces, embeddings, fine-tuned checkpoints — that are not portable regardless of provider.

## Tradeoff: which cloud contract you already have

This used to be close to a gate: Claude effectively meant AWS, GPT effectively meant Azure. That framing is now out of date on both sides, and it is worth being precise about how, because a lot of secondary material (including older passes of this page) has not caught up.

**Claude** is available directly from Anthropic, and also through Amazon Bedrock, Google Cloud Vertex AI, and Microsoft Foundry — three-cloud availability that removes the old "Claude is AWS-only" assumption entirely. **GPT** models are available directly from OpenAI and through Microsoft Foundry as before, but as of June 2026, OpenAI's frontier models — GPT-5.4, GPT-5.5, and from July 2026 the GPT-5.6 Sol/Terra/Luna family, plus Codex — also reached general availability on **Amazon Bedrock**, at the same pricing as OpenAI's direct API. That is a genuine change: the AWS-vs-Azure axis that used to steer this decision toward Claude for AWS shops and GPT for Microsoft shops no longer maps cleanly to vendor choice at all, because both model families now sit on both clouds' managed platforms (plus GCP, for Claude).

What this leaves as the actual, still-real constraint is narrower and more mundane than "which cloud do you use": which specific vendor relationship, data processing agreement, and security review has your organization already completed. A signed Azure Enterprise Agreement or AWS Enterprise Discount Program commitment, and the compliance review that goes with it, is a genuine source of friction and cost when adding a net-new vendor — but it is friction on the *contracting relationship*, not a technical wall that keeps one model family off your cloud of choice. For a team already deep into one cloud's IAM, logging, and billing, staying inside a model that's reachable through that same managed platform (whichever model that turns out to be) is usually still the lower-friction path — just note that this is now a statement about contracting and integration effort, not about which models are technically reachable from which cloud.

## Tradeoff: cost, in current numbers

Both providers publish exact per-token rates, so this is worth a real table rather than the "roughly comparable" hand-waving a feature comparison usually settles for. All figures below were verified against each provider's own pricing documentation this session and are current as of 3 September 2026; both providers change pricing without much notice, so treat these as a snapshot, not a standing fact.

**Claude (Anthropic), per million tokens:**

| Model | Input | Output | Cache read | Context |
|---|---|---|---|---|
| Haiku 4.5 | $1 | $5 | $0.10 | 200K |
| Sonnet 5 | $2 | $10 | $0.20 | 1M |
| Opus 5 | $5 | $25 | $0.50 | 1M |
| Fable 5.1 | $10 | $50 | $0.25 | 1M |
| Mythos 5.1 *(verified orgs only)* | $10 | $50 | $0.25 | 1M |

Sonnet 5's $2/$10 rate was introductory pricing scheduled to rise 50% to $3/$15 on 1 September 2026; Anthropic cancelled that increase on 10 August 2026 and made $2/$10 the permanent standard rate — see [Anthropic cancels the Sonnet 5 price rise](/news/claude-sonnet-5-pricing-permanent/). Opus 5 reached general availability on 24 July 2026, succeeding Opus 4.8 as the strongest model in the Opus family (and the default on Claude Max) at unchanged pricing — the table above reflects the current flagship, not the 4.8 generation. Fable 5.1 and Mythos 5.1 also carry a sharper prompt-caching discount than the rest of the lineup (a cache read costs 2.5% of the base input rate, versus the standard 10% multiplier), which matters disproportionately for the long-context, tool-heavy workloads these tiers target.

**GPT (OpenAI), per million tokens:**

| Model | Input (short / long context) | Output (short / long) | Context |
|---|---|---|---|
| GPT-5.6 Luna | $0.20 / $0.40 | $1.20 / $1.80 | ~1.05M |
| GPT-5.6 Terra | $2 / $4 | $12 / $18 | ~1.05M |
| GPT-5.6 Sol | $4 *(promo, to 21 Nov 2026)* / $8 | $20 / $30 | ~1.05M |

GPT-5.6 replaced the earlier point-release naming (GPT-5.5) with these three named tiers — Sol for the hardest work, Terra for balanced production use, Luna for high-volume cost-sensitive work — generally available 9 July 2026; see [OpenAI ships GPT-5.5, then GPT-5.6](/news/openai-gpt-5-5-and-5-6/) for how the transition happened. Sol's standard rate is $5/$30; OpenAI cut it to a $4/$20 promotional rate on 24 August 2026, currently scheduled to run through 21 November 2026 — the same caution that applies to any introductory rate applies here (see the Sonnet 5 note above: budget to the standard rate and track the expiry date). GPT-6 Astra, released 3 September 2026, is not in this table because its general pricing was not fully public at the time this page was last verified; OpenAI's own pricing documentation lists API rates of $10/$50 (short context) and $20/$75 (long context) per million tokens, while OpenAI's launch materials describe initial ChatGPT usage as covered within existing subscription allowances — both can be true at once, but neither should be treated as settled two days after launch.

Both providers offer roughly 50% off standard rates through batch processing, and both apply a premium (around 1.1–2x) for requests that push well past the low hundreds of thousands of input tokens, so a large context window is not free just because the sticker price looks flat. For consumer seat pricing (ChatGPT Plus/Pro vs Claude Pro/Max) rather than API rates, see [AI subscription pricing 2026](/comparisons/ai-subscription-pricing-2026/), which tracks that separately.

## For the constraint-eligible set: feature and capability differences

If none of the gates above eliminate an option for your situation, and the tradeoffs above don't already decide it, the remaining differences are the ordinary feature and quality ones — real, but genuinely secondary to everything above.

**Image generation is still the clearest product-level gap.** ChatGPT generates images natively; Claude does not and has no first-party text-to-image model. If the requirement is "type a prompt, get a picture," ChatGPT or a dedicated diffusion model such as [Stable Diffusion](/tools/stable-diffusion/) does this and Claude cannot, full stop — this is closer to a small gate than a tradeoff for that specific requirement.

**Claude Design is not a substitute for image generation, and gets confused with it often enough to be worth restating.** Launched 17 April 2026 and powered by Claude Opus 4.7, Claude Design produces interactive HTML/CSS prototypes, slides, and one-pagers from conversation — exportable to PDF, PPTX, or standalone HTML, and able to read a codebase or Figma file to extract and reapply an existing design system. It makes shippable layouts, not pixels. See [Claude Design](/tools/claude-design/) for the full detail.

<div class="bz-flow"><div class="bz-flow-step"><span class="bz-flow-step-tag">Need</span><span class="bz-flow-step-name">A photo or artwork</span><span class="bz-flow-step-desc">Photorealistic images, illustrations, or social graphics from a text prompt.</span></div><div class="bz-flow-arrow">&rarr;</div><div class="bz-flow-step"><span class="bz-flow-step-tag">Use</span><span class="bz-flow-step-name">ChatGPT or Stable Diffusion</span><span class="bz-flow-step-desc">Native image generation. Claude cannot do this.</span></div></div>
<div class="bz-flow"><div class="bz-flow-step"><span class="bz-flow-step-tag">Need</span><span class="bz-flow-step-name">A UI or document layout</span><span class="bz-flow-step-desc">An interface mockup, slide deck, or one-pager you can edit and ship.</span></div><div class="bz-flow-arrow">&rarr;</div><div class="bz-flow-step"><span class="bz-flow-step-tag">Use</span><span class="bz-flow-step-name">Claude Design or ChatGPT Canvas</span><span class="bz-flow-step-desc">Structured, editable output. Claude Design exports HTML, PDF, and PPTX.</span></div></div>

**General capability differences are narrower than the tier gaps within each family.** The gap between Haiku, Sonnet, and Opus/Fable within Claude, or between Luna, Terra, and Sol within GPT-5.6, is larger than the gap between comparably-priced tiers across the two families. Where a consistent pattern still shows up: Claude tends to hold an edge on long, structured instruction-following and whole-codebase or long-document analysis; GPT's ecosystem tooling (fine-tuning breadth, first-party embeddings and speech models, Microsoft 365 Copilot integration) is broader than Claude's, which stays deliberately focused on the model layer plus coding and agent tooling. Benchmark your own workload before trusting either generalization — both change with every release.

| | Claude | GPT |
|---|---|---|
| Native image generation | No | Yes |
| First-party embeddings | No | Yes |
| Speech (STT/TTS) | No | Yes |
| Fine-tuning | Limited | Broad |
| Design/prototype output | Claude Design (HTML/CSS) | Canvas |
| Reachable via all 3 major clouds | Yes (Bedrock, Vertex, Foundry) | Partial (Bedrock, Foundry; not Vertex) |
| Restricted top-tier model | Yes (Mythos 5.1) | Yes (GPT-6 Astra, initial rollout) |

## What this page can't resolve for you

A few things genuinely require your own review rather than a general comparison:

- **Whether your specific use case triggers EU AI Act obligations, and at which tier.** That depends on what you built, not which model sits behind it, and the Digital Omnibus changed several deadlines in mid-2026 — verify current status directly rather than relying on this page's date.
- **Whether your organization would qualify for CVP/LSVP-verified access to Mythos 5.1, or for Daybreak Blue access to GPT-6 Astra's full cyber capability**, and on what timeline. Both are vendor-discretionary verification processes that were, at the time of writing, still being extended to new applicants.
- **The exact terms of your own procurement relationship** with AWS, Azure, or GCP, and what switching or adding a vendor actually costs given your specific discount agreements — those are negotiated per-customer and not something a general comparison can price.
- **How GPT-6 Astra's capabilities, pricing, and access restrictions settle once the rollout completes.** This page was verified two days after that model's announcement; treat everything above about it as a snapshot of a still-moving release, not a stable fact to build a 2027 budget on.

## Further Reading

- [Constraint-driven comparisons](/guides/constraint-driven-comparisons/): the methodology this page follows.
- [OpenAI vs Anthropic](/comparisons/openai-vs-anthropic/): the broader platform-level comparison, including safety philosophy and enterprise features not repeated here.
- [The US CLOUD Act](/glossary/cloud-act/): the jurisdictional mechanism that applies equally to both vendors.
- [Preparing for AI provider restrictions](/guides/preparing-for-ai-provider-restrictions/): the architecture pattern the Fable/Mythos incident argues for.
- [Software licensing and vendor lock-in](/guides/software-licensing-and-vendor-lock-in/): making exit cost concrete rather than rhetorical.
- [Why the US restricted Fable 5 and Mythos 5](/news/anthropic-fable-mythos-us-restriction/), [the restrictions being lifted](/news/fable-5-export-controls-lifted/), and [Fable 5.1 reaching GA while Mythos 5.1 stays gated](/news/claude-fable-5-1-mythos-5-1-ga/): the resilience case study in full, start to finish.
- [Astra becomes the first OpenAI model to cross the "Critical" cyber threshold](/news/openai-astra-critical-cyber-threshold/): the full account of GPT-6 Astra's Preparedness Framework classification and the Daybreak Blue access model, summarized above.
- [Anthropic cancels the Sonnet 5 price rise](/news/claude-sonnet-5-pricing-permanent/) and [OpenAI ships GPT-5.5, then GPT-5.6](/news/openai-gpt-5-5-and-5-6/): the pricing history behind the current-numbers table above.
- [EU AI Act enforcement begins](/news/eu-ai-act-enforcement-begins-2026/): what actually binds a generative-AI deployer in the EU right now, independent of model choice.
- [Model Context Protocol](/glossary/model-context-protocol/), [Tool Use](/glossary/tool-use/), [Function Calling](/glossary/function-calling/): the standardization that lowers switching cost.
- [AI subscription pricing 2026](/comparisons/ai-subscription-pricing-2026/): consumer seat pricing, tracked separately from the API rates above.
- [LLM (glossary)](/glossary/llm/), [Foundation Models](/glossary/foundation-models/), [Long-Context Model](/glossary/long-context-model/)
- [Stable Diffusion](/tools/stable-diffusion/), [What is generative AI](/basics/what-is-generative-ai/)
- [Claude Tag in Slack](/news/anthropic-claude-agents-in-slack/), [What is ChatGPT](/basics/what-is-chatgpt/)
- [The 2026 LLM landscape](/comparisons/llm-landscape-2026/): every other model family, for context on where these two sit in the wider market.

## Sources

1. Anthropic, Claude platform pricing documentation, fetched 3 September 2026 (Fable 5.1, Mythos 5.1, Opus 5, Sonnet 5, Haiku 4.5 rates and cache-pricing multipliers): [https://platform.claude.com/docs/en/about-claude/pricing](https://platform.claude.com/docs/en/about-claude/pricing)
2. Anthropic, statement that Sonnet 5's $2/$10 introductory pricing is now permanent (10 August 2026): [https://x.com/claudeai/status/2086891169217122586](https://x.com/claudeai/status/2086891169217122586) — see also this wiki's [Claude Sonnet 5 pricing permanent](/news/claude-sonnet-5-pricing-permanent/)
3. Anthropic, "Claude Opus 5" (24 July 2026), on Opus 5 succeeding Opus 4.8 as flagship at unchanged pricing: [https://www.anthropic.com/news/claude-opus-5](https://www.anthropic.com/news/claude-opus-5)
4. CNN, Fortune, Bloomberg, CNBC, TechCrunch and others, reporting on the June 2026 Fable 5/Mythos 5 US export-control shutdown — full citation list at [why the US restricted Fable 5 and Mythos 5](/news/anthropic-fable-mythos-us-restriction/)
5. Anthropic, "Redeploying Fable 5" (30 June 2026): [https://www.anthropic.com/news/redeploying-fable-5](https://www.anthropic.com/news/redeploying-fable-5)
6. Anthropic, "Introducing Claude Fable 5.1 and Claude Mythos 5.1" (1 September 2026), and Project Glasswing (CVP/LSVP access) — full citation list at this wiki's [Fable 5.1 reaches GA, Mythos 5.1 stays gated](/news/claude-fable-5-1-mythos-5-1-ga/)
7. OpenAI, developer pricing documentation, fetched 3 September 2026 (GPT-5.6 Sol/Terra/Luna and GPT-6 Astra rates): [https://developers.openai.com/api/docs/pricing](https://developers.openai.com/api/docs/pricing)
8. OpenAI, "GPT-5.6" (preview 25 June 2026, GA 9 July 2026): [https://openai.com/index/gpt-5-6/](https://openai.com/index/gpt-5-6/) — see also this wiki's [OpenAI ships GPT-5.5, then GPT-5.6](/news/openai-gpt-5-5-and-5-6/)
9. OpenAI, "Preparedness Framework" v2 (15 April 2025) and "Path to Astra" (1 September 2026); NBC News, CNBC, Fortune, TechCrunch, VentureBeat and others on the GPT-6 Astra rollout and Daybreak Blue access — full citation list at this wiki's [Astra crosses the "Critical" cyber threshold](/news/openai-astra-critical-cyber-threshold/)
10. AWS, "OpenAI GPT-5.6 Sol, Terra, and Luna are now generally available on Amazon Bedrock" (13 July 2026): [https://aws.amazon.com/blogs/machine-learning/openai-gpt-5-6-sol-terra-and-luna-are-now-generally-available-on-amazon-bedrock/](https://aws.amazon.com/blogs/machine-learning/openai-gpt-5-6-sol-terra-and-luna-are-now-generally-available-on-amazon-bedrock/)
11. AWS, "OpenAI models and Codex on Amazon Bedrock are now generally available" (1 June 2026): [https://aws.amazon.com/blogs/machine-learning/openai-models-and-codex-on-amazon-bedrock-are-now-generally-available/](https://aws.amazon.com/blogs/machine-learning/openai-models-and-codex-on-amazon-bedrock-are-now-generally-available/)
12. Google Cloud, Vertex AI Model Garden partner-model listing, fetched 3 September 2026 (confirms Claude is offered as a Vertex AI partner model and GPT is not): [https://docs.cloud.google.com/vertex-ai/generative-ai/docs/models](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/models)
13. 18 U.S.C. § 2713 (CLOUD Act) and EDPB/EDPS joint assessment of its conflict with GDPR Article 48 — full citations at [the US CLOUD Act](/glossary/cloud-act/)
14. European Commission and EUR-Lex, on the Digital Omnibus and Article 50 transparency enforcement — full citations at [EU AI Act enforcement begins](/news/eu-ai-act-enforcement-begins-2026/)
15. Anthropic (2026). *Introducing Claude Design (Anthropic Labs).* [https://www.anthropic.com/news/claude-design-anthropic-labs](https://www.anthropic.com/news/claude-design-anthropic-labs)
16. OpenAI (2025). *Introducing 4o Image Generation.* [https://openai.com/index/introducing-4o-image-generation/](https://openai.com/index/introducing-4o-image-generation/)
17. Anthropic. *Constitutional AI: Harmlessness from AI Feedback.* arXiv:2212.08073. [https://arxiv.org/abs/2212.08073](https://arxiv.org/abs/2212.08073)
18. Chiang, W.-L., Zheng, L., Sheng, Y., et al. (2024). *Chatbot Arena: An Open Platform for Evaluating LLMs by Human Preference.* ICML 2024. arXiv:2403.04132. [https://arxiv.org/abs/2403.04132](https://arxiv.org/abs/2403.04132)
19. Anthropic API documentation. [https://platform.claude.com/docs/](https://platform.claude.com/docs/)
20. OpenAI Platform documentation. [https://platform.openai.com/docs/](https://platform.openai.com/docs/)
