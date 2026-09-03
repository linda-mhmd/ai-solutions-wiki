---
title: "Governance Thresholds as You Scale"
description: "Which of this wiki's governance and compliance guides actually apply to a small AI system that has outgrown its original scope, and the specific regulatory, contractual, or operational condition that triggers each one."
date: 2026-09-03
lastmod: 2026-09-03
last_updated: 2026-09-03
categories: [Guides]
tags: ["ai-governance", "eu-ai-act", "gdpr", "soc-2", "compliance", "scaling", "reliability"]
related:
  - guides/scaling-from-a-long-running-simple-solution
  - guides/eu-ai-act-compliance-checklist
  - guides/ai-transparency-obligations
  - guides/gdpr-for-ai-teams
  - guides/data-protection-impact-assessment
  - glossary/sla-slo-sli
---

A system that has quietly served real users for a year or two accumulates governance exposure the same way it accumulates users: gradually, with no single event announcing it. The team that built it never had a reason to ask whether GDPR requires a Data Protection Officer, whether the EU AI Act applies to them at all, or whether a customer will soon demand a SOC 2 report — until growth makes one of those questions unavoidable.

This wiki already has nine guides that go deep on governance and compliance mechanics, and eighteen more on testing. This page is not a tenth deep-dive. It is the answer to a narrower question: for each governance area, what is the actual condition — regulatory, contractual, or operational — that means it now applies to you, and how do you tell a threshold you have genuinely crossed from one you are imagining because growth feels like it should require more process.

This is a retrofit guide, not a build-order one. [From Zero to Production](/guides/from-zero-to-production/) and [From Localhost to Production](/guides/localhost-to-production-deployment-stages/) cover how to build a system's infrastructure up in stages from nothing. This page assumes the system already exists, already works, and already has real users and real data — the question is what governance to layer onto it, in what order, without a rewrite. See [Scaling a Long-Running Simple Solution](/guides/scaling-from-a-long-running-simple-solution/) for how this fits into the broader retrofit sequence alongside testing and environments.

## Three kinds of threshold, and why the distinction matters

Not every governance obligation is triggered by the same kind of event, and conflating them is where teams waste effort in both directions.

**Use-case triggers** depend on what the system does, not how big it is. A five-user pilot that screens job applicants is high-risk under the EU AI Act on day one. A system serving ten million users that recommends playlists is never high-risk under the Act on the basis of scale alone. Growth does not create this kind of exposure; it only raises the stakes of exposure you already had.

**Scale triggers** depend on the volume and sensitivity of what you process, and some of them come with genuine legal thresholds — a headcount number, a risk designation — even where the number is not the one people assume.

**Customer-driven triggers** are not regulatory at all. Nothing in law requires SOC 2 or a contractual SLA. The trigger is a specific counterparty — an enterprise buyer, a paying customer whose business depends on your uptime — asking for it, or being about to.

Knowing which kind of threshold you are looking at tells you what to watch for. A use-case trigger requires re-examining what the system does, not tracking a metric. A scale trigger requires tracking a real number against a real legal test. A customer-driven trigger requires listening to sales and support, not consulting a regulation at all.

## EU AI Act: calling a model's API does not make you a GPAI provider

The EU AI Act (Regulation (EU) 2024/1689) puts most of its heaviest obligations on the party that trained a general-purpose AI (GPAI) model or placed it on the EU market — the "provider," in the Act's terms — not on whoever calls that model through an API [1]. A team whose AI feature is "call Anthropic's, OpenAI's, or Google's API and use the response" is a **deployer** of that GPAI model. None of the Article 53 obligations — technical documentation, the training-data summary, systemic-risk testing above the 10²⁵ FLOP threshold — fall on a deployer [1][2]. See [AI Transparency Obligations](/guides/ai-transparency-obligations/) for exactly what those Article 53 duties require of the party they do apply to.

Two things do move you into GPAI provider territory, and both are actions you take, not milestones you pass:

**You train your own foundation model** and place it on the market. Uncommon for a team whose starting point was a simple system built on a hosted API.

**You fine-tune an existing model past the compute threshold** the Commission's GPAI Guidelines give as an *indicative* criterion for a significant modification — training compute for the modification exceeding roughly one-third of the compute used to train the original model, or one-third of the relevant presumption threshold (10²³ or 10²⁵ FLOPs) where the original's training compute isn't public. Treat this as a safe-harbor-style signal, not an exclusive bright line: the guidelines are clear that a change to the model's generality or capability can in principle be judged "significant" on qualitative grounds even below that compute ratio, so staying under one-third does not by itself guarantee you're in the clear. Cross the indicative threshold and you become the provider of the modified model, with a training-data summary obligation of your own. [AI Transparency Obligations](/guides/ai-transparency-obligations/) covers this threshold and its sourcing in full; do not re-derive it here.

There is a second, separate way "provider" status can reach you even while you remain a deployer of the underlying model: if you wrap that API in your own product — a user interface, decision logic, a workflow that acts on the output — you can become the provider of *that downstream system*, with obligations that apply alongside, not instead of, the base model provider's [3]. This is exactly the distinction the next section turns on.

## EU AI Act: high-risk obligations trigger on what the system does

Whether your downstream system carries high-risk obligations has nothing to do with request volume, revenue, or user count. It depends on whether the system's use case falls inside Annex III: employment decisions, credit scoring and insurance risk, biometric identification, critical infrastructure, education, law enforcement, migration, and the administration of justice [4]. [EU AI Act Compliance Checklist](/guides/eu-ai-act-compliance-checklist/) has the full domain table and the obligations each one carries — technical documentation, data governance, human oversight, conformity assessment, EU database registration.

The practical consequence for a growing system: if you built a CV-screening tool two years ago on top of a hosted model's API, and never asked whether Annex III applied because you had five customers and it felt premature, growth does not create a new obligation — it makes the one you already had matter more. The right response to growth here is to go back and answer the classification question honestly, not to wait for a size threshold that does not exist for this obligation.

Two dates matter for how much runway you have. Following the Digital Omnibus (Regulation (EU) 2026/1744), Annex III standalone high-risk obligations now apply from **2 December 2027**, deferred from the original 2 August 2026 date; the deferral is real relief but not cancellation, and the underlying requirements are unchanged. Article 50's transparency duties — labelling AI-generated content, disclosing that a user is talking to a machine — were not deferred and have applied, enforceably, since 2 August 2026 [5]. See [EU AI Act Enforcement Begins](/news/eu-ai-act-enforcement-begins-2026/) for the full timeline.

One obligation in the Act genuinely has no threshold at all: the AI literacy duty (Article 4) has applied to every provider and deployer, regardless of risk tier or scale, since 2 February 2025. It is worth naming precisely because it is the exception to this whole page's premise — a duty that was never gated on growth in the first place.

## GDPR: the trigger is volume and sensitivity of personal data, not headcount

Unlike the AI Act's high-risk tier, GDPR's baseline obligations were never scale-gated to begin with: if you process any personal data belonging to an EU resident, Article 6's lawful-basis requirement has applied since before your system had its first user. What scales are the *additional* duties layered on top of that baseline, and here the law gives a genuine mix of hard numbers and deliberately open standards. [GDPR for AI/ML Teams](/guides/gdpr-for-ai-teams/) covers the lifecycle practice; this is where the actual thresholds sit.

**Data Protection Impact Assessment (Article 35).** Required when processing is "likely to result in a high risk to the rights and freedoms of natural persons" — systematic and extensive profiling with legal or similarly significant effects, large-scale processing of special-category data, or systematic monitoring of a publicly accessible area, among the criteria supervisory authorities publish. There is no user-count number here; the trigger is the nature of the processing. [Conducting DPIAs for AI Systems](/guides/data-protection-impact-assessment/) walks through the assessment itself.

**Mandatory Data Protection Officer (Article 37).** Required when you are a public authority, or your core activities require "regular and systematic monitoring of data subjects on a large scale," or your core activities consist of large-scale processing of special-category (Article 9) or criminal-conviction (Article 10) data [6]. GDPR does not attach a number to "large scale." The Article 29 Working Party's guidelines, endorsed by the EDPB, instead give four factors to weigh: the number of data subjects affected (as a count or a share of a population), the volume and range of data processed, the duration of the processing, and its geographic extent [7]. Getting Article 37 wrong is not a minor infringement — it sits in GDPR's lower fine tier, up to €10 million or 2% of global annual turnover, whichever is higher [8].

**Article 30(5) recordkeeping exemption.** This is the closest GDPR comes to a genuine headcount threshold: organizations with fewer than 250 employees are exempt from maintaining full records of processing activities — *unless* the processing is likely to risk data subjects' rights, is not occasional, or involves special-category or criminal data [9]. Read the exceptions carefully: a production AI system processing personal data on an ongoing basis is, by definition, not "occasional," which means most small teams retrofitting governance onto a real product do not get to rely on this exemption regardless of headcount. It is a real number, and it rarely saves the system this page is written for.

The honest summary: GDPR's baseline duties never had a scale gate, its DPIA and DPO triggers are qualitative and turn on the nature of your processing rather than a count you can track on a dashboard, and its one hard number (250 employees, Article 30(5)) is narrower than it first appears once you read the carve-outs.

## SOC 2 and security attestations: a sales threshold, not a legal one

No regulator requires SOC 2. It is a voluntary attestation, administered against the AICPA's Trust Services Criteria, and nothing in the EU AI Act, GDPR, or general software law compels a company to obtain one [10]. The actual trigger is almost always a specific enterprise buyer's procurement or security-review process making it a condition of the sale [10][11]. This is a genuinely different kind of threshold from everything above it on this page — contractual and sales-driven, not statutory — and it is worth naming as such rather than folding it into "compliance" as if it were governed by the same logic.

The practical signal is not a revenue milestone or a user count. It is your sales team repeatedly fielding a security questionnaire, or one specific deal stalling on "do you have a SOC 2 report." A consumer product with a million users and no enterprise customers may never need one. A five-person B2B startup with a single enterprise pilot in the pipeline may need to start the conversation now.

Timing matters because SOC 2 comes in two forms with very different lead times: a Type I report attests to controls at a single point in time and can be produced relatively quickly; a Type II report attests that those controls operated effectively over an observation window, typically three to twelve months, and therefore has to be started well before the deal that needs it closes [10]. Start the clock the moment a real enterprise deal makes SOC 2 likely, not once it is contractually due.

## Reliability formalization: the trigger is a customer who depends on you

Formal SLAs, tracked SLOs, and a real incident response process have no headcount or revenue threshold either. The trigger is a paying customer whose own business depends on your uptime. Once that is true, "it's usually up" stops being an adequate answer, whether that customer is your fiftieth or your fifth.

[SLA, SLO, and SLI](/glossary/sla-slo-sli/) and [Error Budget](/glossary/error-budget/) cover the mechanics — the internal target you engineer to should be stricter than the external commitment you sell, so a breach of your own SLO gives you room to fix things before it becomes a breached SLA. The sequencing point worth adding here: build the internal SLO and start measuring against it *before* a customer forces the external SLA conversation, not after. A number you have never tracked is not a number you can responsibly promise in a contract.

The same customer-driven trigger extends to incident response. [AI Incident Response](/guides/ai-incident-response/) covers building the process itself; the point here is narrower — a documented, rehearsed process for detecting, communicating, and resolving an incident becomes worth the engineering time once someone outside your own team is affected by an outage, not before.

## The other failure mode: governance before it's warranted

Everything above argues for adding rigor. The opposite mistake is just as real, and small teams retrofitting governance make it just as often: starting a SOC 2 Type II audit before a single enterprise deal has asked for one, hiring a DPO before the system processes any special-category data at meaningful volume, writing Annex III-grade technical documentation for a system that is legally minimal-risk under the Act, or spending weeks drafting a formal SLA before there is one paying customer to offer it to.

This is not a lesser failure than under-investing. Engineering time is the scarcest resource for the team this page is written for, and every hour spent on a control nobody has asked for and no regulation requires yet is an hour not spent on the product that is generating the growth in the first place. Premature process carries a second, quieter cost: built without a real deal or a real regulatory finding pressure-testing it, it is frequently built wrong — designed around a guess at what an auditor or a regulator will want, rather than around what one actually asked for — and has to be redone once a real requirement finally shows up.

The calibration heuristic is the same one this whole page has been applying: process should follow a specific, current, nameable trigger — a regulation article whose conditions you actually meet, a named customer asking a named question, a use case you are actually building — not a milestone pulled from a growth projection. "We might need this eventually" is true of almost every control on this page at almost every point in a company's life. It is not, by itself, a reason to build it now.

## Governance thresholds at a glance

| Governance area | Actual triggering condition | Go deeper |
|---|---|---|
| EU AI Act — GPAI provider obligations | You trained your own model, or fine-tuned one past the ~one-third compute threshold | [AI Transparency Obligations](/guides/ai-transparency-obligations/) |
| EU AI Act — high-risk system obligations | Your use case falls in an Annex III domain (employment, credit, biometric ID, etc.) — not user count or revenue | [EU AI Act Compliance Checklist](/guides/eu-ai-act-compliance-checklist/) |
| EU AI Act — Article 50 transparency | You generate synthetic media or interact with users as if you might be human — applies regardless of scale | [AI Transparency Obligations](/guides/ai-transparency-obligations/) |
| EU AI Act — AI literacy (Article 4) | Always, for every provider and deployer, since 2 February 2025 | [EU AI Act Enforcement Begins](/news/eu-ai-act-enforcement-begins-2026/) |
| GDPR — baseline lawful basis | You process any EU resident's personal data — day one, not scale-gated | [GDPR for AI/ML Teams](/guides/gdpr-for-ai-teams/) |
| GDPR — DPIA (Article 35) | Processing "likely to result in high risk": large-scale profiling, sensitive categories, systematic monitoring | [Conducting DPIAs for AI Systems](/guides/data-protection-impact-assessment/) |
| GDPR — mandatory DPO (Article 37) | Public authority, or core activity = regular/systematic large-scale monitoring, or large-scale special-category data — no fixed number | [GDPR for AI/ML Teams](/guides/gdpr-for-ai-teams/) |
| GDPR — Article 30(5) recordkeeping | Exempt only under 250 employees *and* occasional, low-risk, non-sensitive processing — rarely both true for a live AI product | [GDPR for AI/ML Teams](/guides/gdpr-for-ai-teams/) |
| SOC 2 / security attestation | An enterprise customer's procurement process requires it as a sale condition — contractual, not legal | *(no wiki page yet — start the Type II clock months before the deal closes)* |
| SLA / formal reliability commitment | A paying customer's business depends on your uptime, and has asked or will ask for a guarantee | [SLA, SLO, and SLI](/glossary/sla-slo-sli/), [Error Budget](/glossary/error-budget/) |
| Formal incident response process | Someone outside your own team is materially affected by an outage | [AI Incident Response](/guides/ai-incident-response/) |

## Sources

1. Regulation (EU) 2024/1689 (AI Act), Articles 3, 51–56, EUR-Lex: [https://eur-lex.europa.eu/eli/reg/2024/1689/oj](https://eur-lex.europa.eu/eli/reg/2024/1689/oj)
2. Montro, "EU AI Act: Provider vs Deployer — What Actually Differs": [https://montro.io/blog/eu-ai-act-provider-vs-deployer](https://montro.io/blog/eu-ai-act-provider-vs-deployer)
3. Pitch Law, "Provider vs Deployer: Understanding Your Role Under the AI Act": [https://www.pitch.law/knowledge-base/provider-vs-deployer-ai-act](https://www.pitch.law/knowledge-base/provider-vs-deployer-ai-act)
4. artificialintelligenceact.eu, "Annex III: High-Risk AI Systems": [https://artificialintelligenceact.eu/annex/3/](https://artificialintelligenceact.eu/annex/3/)
5. Regulation (EU) 2026/1744 (Digital Omnibus on AI), EUR-Lex: [https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng](https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng)
6. Regulation (EU) 2016/679 (GDPR), Article 37: [https://gdpr-info.eu/art-37-gdpr/](https://gdpr-info.eu/art-37-gdpr/)
7. Article 29 Data Protection Working Party (endorsed by the EDPB), "Guidelines on Data Protection Officers ('DPOs')" (WP243 rev.01, 5 April 2017): [https://ec.europa.eu/information_society/newsroom/image/document/2016-51/wp243_en_40855.pdf](https://ec.europa.eu/information_society/newsroom/image/document/2016-51/wp243_en_40855.pdf)
8. Regulation (EU) 2016/679 (GDPR), Article 83: [https://gdpr-info.eu/art-83-gdpr/](https://gdpr-info.eu/art-83-gdpr/)
9. Regulation (EU) 2016/679 (GDPR), Article 30(5): [https://gdpr-info.eu/art-30-gdpr/](https://gdpr-info.eu/art-30-gdpr/)
10. Drata, "Who Needs SOC 2 Compliance? A Complete Breakdown": [https://drata.com/learn/soc-2/overview](https://drata.com/learn/soc-2/overview)
11. Vanta, "What is SOC 2? Your complete compliance guide": [https://www.vanta.com/collection/soc-2/what-is-soc-2](https://www.vanta.com/collection/soc-2/what-is-soc-2)

## Further reading

- [Scaling a Long-Running Simple Solution](/guides/scaling-from-a-long-running-simple-solution/): where this governance sequencing fits alongside testing and environments in the broader retrofit.
- [EU AI Act Compliance Checklist](/guides/eu-ai-act-compliance-checklist/): the full risk-tier classification process and obligation checklist once you know which tier applies.
- [AI Transparency Obligations](/guides/ai-transparency-obligations/): the Article 53 training-data summary duty and the one-third compute threshold in full.
- [GDPR for AI/ML Teams](/guides/gdpr-for-ai-teams/): practical GDPR steps across the ML lifecycle, from lawful basis through deployment.
- [Conducting DPIAs for AI Systems](/guides/data-protection-impact-assessment/): the assessment process itself, once Article 35 applies to you.
- [SLA, SLO, and SLI](/glossary/sla-slo-sli/): why the internal target should be stricter than the external promise.
