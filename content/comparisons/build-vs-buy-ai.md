---
title: "Build vs Buy for AI Solutions"
description: "The build-vs-buy AI decision, checked first against the constraints that can rule an option out — regulation, jurisdiction, contracts, and team capability — then compared on cost, lock-in, and differentiation for whichever option survives."
date: 2026-03-28
last_verified: 2026-09-03
categories: [Comparisons]
tags: [build-vs-buy, strategy, AI-development, enterprise, decision-framework, vendor-lock-in]
last_updated: 2026-09-03
lastmod: 2026-09-03
related:
  - guides/constraint-driven-comparisons
  - guides/software-licensing-and-vendor-lock-in
  - glossary/cloud-act
  - glossary/data-sovereignty
  - guides/cloud-exit-costs-and-data-gravity
  - guides/governance-thresholds-as-you-scale
  - guides/shared-responsibility-model
  - comparisons/custom-ml-vs-foundation-models
---

Every AI initiative faces the build-vs-buy decision: develop a custom solution using foundation models and your own engineering team, or purchase a commercial product that solves the problem with configuration rather than code. The question usually gets framed as "what is each option good at" — build gives you control, buy gives you speed — ending in "build if you need X, buy if you need Y." That framing quietly assumes both options are actually available to you, and that the only open question is which one scores higher.

That assumption often does not hold. A jurisdictional rule about where data may be processed, a customer's own security requirements, or simply not having and being unable to hire the team an option requires can rule build or buy out entirely, before cost or differentiation ever enters the discussion. This wiki's [methodology for comparisons](/guides/constraint-driven-comparisons/) calls that a **gate**, distinct from a **tradeoff** — a factor genuinely worth weighing, not one that disqualifies an option outright. Check the gates first.

## Constraints that decide this before cost or differentiation does

**Regulatory and jurisdictional exposure — usually a gate.** If the system's use case falls inside the EU AI Act's Annex III (employment decisions, credit scoring, biometric identification, critical infrastructure, and similar high-risk domains), obligations attach to whichever party is legally the system's "provider" — risk management, technical documentation, human oversight, conformity assessment, EU database registration.[1] Buying a specialized vertical product where the vendor already carries that compliance burden as their own is a materially different regulatory posture than building the same system and becoming its provider yourself. There is also a build-specific version of this: fine-tuning a foundation model past a compute threshold the AI Act's GPAI Guidelines treat as an indicative marker of a "significant modification" can make you the provider of a general-purpose AI model in your own right, with a training-data-summary obligation a team that only calls a hosted API never takes on.[1] [Governance thresholds as you scale](/guides/governance-thresholds-as-you-scale/) covers both triggers — the Annex III domain table and the exact compute threshold — in full; this page does not re-derive them. Separately, if your data carries a residency or sovereignty requirement and no vendor offers compliant in-region processing for your use case, buy is not actually on the table regardless of price or fit — see [data sovereignty](/glossary/data-sovereignty/) for why a vendor's regional data centre does not automatically settle this. Whether your specific system actually falls inside Annex III is a classification exercise on your own system that no general comparison can perform for you.

**Trust and legal control over the relationship — usually a gate for the specific exposure it addresses.** Buying a SaaS product sends your data to the vendor's systems, and if that vendor is subject to US legal process, the US CLOUD Act requires it to "preserve, backup, or disclose" data in its "possession, custody, or control... regardless of whether such communication, record, or other information is located within or outside of the United States."[2] Jurisdiction attaches to the provider, not the data centre, so choosing a vendor's non-US region does not by itself clear this exposure. This is a distinct question from whether today's transfer is GDPR-lawful — the two can conflict, since the European Data Protection Board and Supervisor have taken the position that a CLOUD Act request alone is not a valid legal basis for the transfer under Article 48 GDPR, and that conflict is unresolved. See [the US CLOUD Act](/glossary/cloud-act/) for the full mechanism. Building does not automatically escape this either: a custom system still typically runs on cloud infrastructure, and the [shared responsibility model](/guides/shared-responsibility-model/) means the infrastructure vendor's jurisdiction still governs the layer they operate, even though your application logic and training data are yours. What actually resolves this exposure is infrastructure jurisdiction, not build-vs-buy as a label — build only changes it if it also means infrastructure operated outside the reach that concerns you, not merely that your team wrote the code.

**Contractual and customer-driven requirements — a gate, and the one this page genuinely cannot resolve for you.** Sometimes the deciding constraint is not a regulation at all but a specific counterparty. An enterprise customer's security questionnaire that prohibits sending their data to a third-party subprocessor rules out a SaaS "buy" option for that line of business, independent of the vendor's actual security posture. In the other direction, a customer that requires a SOC 2 report before signing can make buying from an already-certified vendor faster to revenue than building and then separately pursuing your own certification. Neither of these is governed by the same logic as a regulation — they are a specific buyer's own precondition — and nothing in this comparison, or any general comparison, can tell you what a specific contract or questionnaire actually says. That determination belongs to whoever owns the agreement.

**Internal capability and knowledge retention — usually a gate for build, worth checking in the other direction too.** Building requires ML engineers, data engineers, and software engineers with AI experience, sustained past initial deployment, not just through a prototype. If you do not have that team and cannot hire it, build is not a live option no matter how attractive the control or differentiation case looks — buy becomes the practical choice by elimination, not because it scored higher on anything. The reverse is less obvious: build is not automatically the more sovereign, in-control choice if nobody on the team can operate what they built reliably. That trades one risk — vendor dependency — for another: a single point of failure in whoever on the team actually understands the system, which is a form of lock-in in its own right.

**Vendor lock-in and exit cost — a tradeoff, and a sharper one for buy than build usually assumes.** Lock-in on the buy side is concrete and checkable, not a vague worry: proprietary APIs with no drop-in equivalent, data formats that do not export cleanly, per-seat pricing that compounds with headcount, and contractual minimums.[3] The EU Data Act's Article 29 requires providers of data processing services to stop charging switching fees for the switching process itself from **12 January 2027** — but that removes a fee, not the migration time, the coupling between the vendor's proprietary features and your workflows, or the continuity cost of running both systems during cutover, all of which persist regardless.[4] Build is not automatically lock-in-free either: an open-weight model or an open-source tool still ships under a specific license, and not every "open" model is released under an OSI-approved license — source-available and bespoke licenses can carry their own usage restrictions. [Software licensing and vendor lock-in](/guides/software-licensing-and-vendor-lock-in/) covers the difference between OSI open source and source-available, and [cloud exit costs and data gravity](/guides/cloud-exit-costs-and-data-gravity/) covers why a large trained-on dataset resists moving even once a vendor removes its exit fee.

**Cost structure and sunk investment — a tradeoff, covered in the decision framework below.** Not "which is cheaper" in the abstract, but what you have already committed to and what your actual usage pattern looks like — the total cost of ownership math depends on team size, seat count, and time horizon, worked through below.

None of this tells you whether to build or buy on its own — it determines which of the two you are actually allowed to choose between. If nothing above rules an option out for you, both remain on the table and the rest of this page applies to whichever one, or both, survived.

## What "build" and "buy" actually mean

**Building** means developing a custom AI solution: data pipelines built for your specific sources, models trained or fine-tuned on your own data (or a foundation model wrapped in your own application logic), integration with your existing systems, and a UI and application layer your team designs and owns.

**Buying** means purchasing a commercial AI product that solves the problem out of the box or with configuration: a SaaS AI product (an AI-powered CRM, document processor, or customer-service tool), an AI feature inside a platform you already run (Salesforce Agentforce — the 2025 rebrand that folded the earlier Einstein Copilot into a single AI agent platform[5] — ServiceNow AI Agents, Microsoft Copilot), or a specialized vertical AI product built for one industry (medical AI, legal AI, financial AI).

## The comparison

This table is a tradeoff summary for whichever option (or both) survived the gates above — it is not a substitute for them, and reading it before the section above is exactly the mistake this page's structure is trying to avoid.

| | Build | Buy |
|---|---|---|
| Time to first value | Months — typically 3–9 months of team cost before any return | Weeks |
| Who carries ongoing maintenance | You — models, infrastructure, and updates; commonly 1–2 FTEs post-launch | The vendor |
| Customization ceiling | Full — matches your process exactly, by construction | Bounded by the product's configuration surface |
| Data control default | Stays inside your environment unless you choose otherwise | Leaves your environment to the vendor's systems by default |
| Competitive differentiation | Fully yours to keep | Available to any competitor using the same vendor |
| Primary 3-year cost driver | Engineering headcount and opportunity cost | Per-seat or per-usage licensing, which compounds with scale |

## Decision framework

### Is the capability a differentiator or a commodity?

A **differentiator** is central to your competitive advantage — how you process data, make predictions, or automate decisions is different from competitors' and creates unique value: proprietary trading algorithms, a recommendation engine trained on data no competitor has, a domain-specific model built on proprietary data. A **commodity** capability is standard and similar across companies — you need it to operate, but it does not differentiate you: spam filtering, standard document OCR, a generic FAQ chatbot.

The strongest recent evidence weighs toward buy for the commodity case specifically. MIT's NANDA initiative, in its 2025 "State of AI in Business" report, found that around 95% of enterprise generative AI pilots delivered no measurable return, and that buying tools from specialized vendors succeeded roughly twice as often as building the equivalent capability in-house.[6][7] The lesson is not "never build" — it is "do not build a commodity": reserve custom engineering for the capability that genuinely sets you apart, and for a use case with genuinely specific requirements that no commercial product accommodates. Where requirements are standard, or standard with minor customization, buying and configuring is the better-evidenced default; a highly specific process built on proprietary data is the case where build is actually necessary because no product fits.

### What does the total cost of ownership actually look like?

Compare costs over 3 years. These are illustrative planning ranges, not a specific vendor's quoted price — model your own inputs before committing to either.

**Build TCO:**
- Team cost: 3–5 engineers × $200K/year × 3 years = $1.8M–$3M
- Infrastructure: $2K–$20K/month × 36 months = $72K–$720K
- Development time before first value: 3–9 months of team cost with no return
- Ongoing maintenance: 1–2 FTEs dedicated after launch

**Buy TCO:**
- License/subscription: $50–$500/seat/month × seats × 36 months
- Implementation and integration: $50K–$500K (one-time)
- Customization: $20K–$200K (ongoing)
- Data migration and training: $10K–$50K

For 100 users at $200/seat/month, the 3-year buy cost is $720K plus implementation — often less than the build cost once the opportunity cost of engineering time is included, though the gap narrows or reverses at large seat counts, which is exactly where per-seat licensing starts to compound past what a fixed engineering team would have cost.

Team capability is covered as a gate above rather than repeated here: if you cannot staff build, this section is moot regardless of how the TCO math reads.

## The hybrid approach

Many organizations find the best answer is a combination — and it is worth being explicit that this relocates the constraints above rather than removing them.

**Buy the platform, build the differentiation.** Use commercial AI infrastructure (Amazon Bedrock, Amazon SageMaker AI) for the platform layer, and build custom models, prompts, and business logic on top. This provides infrastructure without the full operational burden while preserving customization — but the infrastructure vendor's jurisdiction and shared-responsibility boundary from the gates above still apply to that layer; "build" here means owning the application and data layer, not escaping the underlying platform's constraints. The line between these tools has blurred: since Amazon SageMaker Unified Studio became generally available in March 2025, Bedrock foundation models, Knowledge Bases, Guardrails, and Agents are accessible inside the same environment as SageMaker's custom training and tuning, and Amazon Bedrock AgentCore provides managed runtime, memory, identity, and tooling for production agents built on any open-source framework.[8][9] For the underlying trade-off one layer down, see [custom ML models vs. foundation models](/comparisons/custom-ml-vs-foundation-models/).

**Buy for some use cases, build for others.** Use commercial products for commodity AI needs and build custom solutions for differentiated capabilities — applying the differentiator/commodity split above per use case rather than as one organization-wide decision.

**Start with buy, then build.** Purchase a commercial product to deliver value quickly, learn what your actual requirements are, then build a custom solution if the product's limitations become significant. This is the pattern where data gravity matters most: the longer a workload runs on a vendor's platform, the more data accumulates there, and moving it later is not free just because a switching fee has been removed — see [cloud exit costs and data gravity](/guides/cloud-exit-costs-and-data-gravity/) for why time, coupling, and continuity cost persist regardless of price. "We'll decide later" is itself a decision with a shelf life.

## Common mistakes

**Building everything from scratch.** Some teams default to building because they want complete control. This is expensive and slow for capabilities available commercially — and, per the NANDA findings above, statistically less likely to return value for commodity work.

**Buying when the fit is poor.** Purchasing a product that covers 60% of requirements and then spending extensive effort customizing it to cover the remaining 40% can cost more than building from scratch.

**Not accounting for maintenance.** Build decisions often undercount the ongoing cost of maintaining, monitoring, and improving a custom AI system. Models degrade, data changes, and infrastructure needs updates.

**Ignoring the team you have.** The best technical decision is irrelevant if your team cannot execute it. This is the internal-capability gate above, not a minor implementation detail — match the approach to your team's actual capability, not the one you wish you had.

**Committing to buy without reading the exit path.** Understanding data portability, contract termination terms, and migration options belongs in the vendor lock-in tradeoff above, before signing — not after a switching decision is already forced.

The build-vs-buy decision should be revisited periodically, and the gates above should be re-checked, not just the cost math: as AI technology matures, more capabilities become commodity, favoring buy; as your organization's AI maturity grows, more custom options become genuinely staffable; and as your regulatory or customer exposure changes, a gate that did not apply at launch can start to.

## Further reading

- [Constraint-driven comparisons](/guides/constraint-driven-comparisons/): the methodology behind this page's structure — why gates and tradeoffs are separated instead of folded into one feature grid.
- [Governance thresholds as you scale](/guides/governance-thresholds-as-you-scale/): the exact Annex III domain table and the GPAI significant-modification compute threshold behind the regulatory gate above.
- [The US CLOUD Act](/glossary/cloud-act/): the full mechanism behind the trust/legal-control gate, including why choosing a vendor's regional data centre does not resolve it on its own.
- [Data sovereignty](/glossary/data-sovereignty/): residency vs. sovereignty as distinct constraints, load-bearing for the regulatory gate above.
- [Software licensing and vendor lock-in](/guides/software-licensing-and-vendor-lock-in/): making the lock-in category concrete — OSI open source vs. source-available, and the four places lock-in typically hides.
- [Cloud exit costs and data gravity](/guides/cloud-exit-costs-and-data-gravity/): what leaving a vendor or platform actually costs once data volume grows, beyond any switching fee.
- [The shared responsibility model for AI on AWS](/guides/shared-responsibility-model/): the operational-responsibility boundary behind the internal-capability gate, and why building on cloud infrastructure does not mean total control.
- [Custom ML models vs. foundation models](/comparisons/custom-ml-vs-foundation-models/): the build-vs-buy question one layer down, once you've decided to build on top of cloud AI infrastructure.

## Sources

1. Regulation (EU) 2024/1689 (AI Act), Article 3 (definitions), Annex III (high-risk use cases), and Articles 51–56 (general-purpose AI model obligations), EUR-Lex: [https://eur-lex.europa.eu/eli/reg/2024/1689/oj](https://eur-lex.europa.eu/eli/reg/2024/1689/oj)
2. 18 U.S.C. § 2713 — "Required preservation and disclosure of communications and records," Cornell Legal Information Institute: [https://www.law.cornell.edu/uscode/text/18/2713](https://www.law.cornell.edu/uscode/text/18/2713)
3. This wiki's own treatment of the four common lock-in mechanisms — data formats, proprietary APIs, subscription shifts, and platform dependence — is sourced in full in [Software licensing and vendor lock-in](/guides/software-licensing-and-vendor-lock-in/).
4. Regulation (EU) 2023/2854 (Data Act), Article 29 — Gradual withdrawal of switching charges, EUR-Lex: [https://eur-lex.europa.eu/eli/reg/2023/2854/oj](https://eur-lex.europa.eu/eli/reg/2023/2854/oj)
5. Salesforce, "Agentforce: The AI Agent Platform" (the rebrand that folded Einstein Copilot into Agentforce): [https://www.salesforce.com/agentforce/](https://www.salesforce.com/agentforce/)
6. MIT NANDA, "The GenAI Divide: State of AI in Business 2025" (the report behind the 95% no-return and buy-over-build findings): [mlq.ai mirror](https://mlq.ai/media/quarterly_decks/v0.1_State_of_AI_in_Business_2025_Report.pdf)
7. Fortune, "MIT report: 95% of generative AI pilots at companies are failing" (summary of the NANDA findings, including buy vs. build success rates): [fortune.com](https://fortune.com/2025/08/18/mit-report-95-percent-generative-ai-pilots-at-companies-failing-cfo/)
8. AWS, "Amazon SageMaker Unified Studio is now generally available" (March 13, 2025): [aws.amazon.com](https://aws.amazon.com/about-aws/whats-new/2025/03/amazon-sagemaker-unified-studio-generally-available/)
9. AWS, "Amazon Bedrock in SageMaker Unified Studio" (Bedrock capabilities within the unified environment): [aws.amazon.com/bedrock/unifiedstudio](https://aws.amazon.com/bedrock/unifiedstudio/)
