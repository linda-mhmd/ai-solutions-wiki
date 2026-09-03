---
title: "GDPR vs EU AI Act"
description: "GDPR and the EU AI Act are not alternatives a reader picks between — they run two independent scope tests, and most consequential AI systems end up caught by both at once. This page works the gates first: does each regulation even apply to your system, given where you operate, where your users are, and what the system does with personal data — before it compares the obligations that follow once one or both do."
date: 2026-03-28
last_verified: 2026-09-03
categories: [Comparisons]
tags: [gdpr, eu-ai-act, regulation, compliance, data-protection, ai-governance, digital-omnibus, jurisdiction]
related:
  - guides/constraint-driven-comparisons
  - glossary/gdpr
  - glossary/conformity-assessment
  - glossary/cloud-act
  - glossary/data-sovereignty
  - frameworks/gdpr-ai-framework
  - frameworks/eu-ai-act-risk-framework
  - guides/ai-regulatory-compliance-checklist
  - guides/governance-thresholds-as-you-scale
  - news/eu-ai-act-enforcement-begins-2026
last_updated: 2026-09-03
lastmod: 2026-09-03
---

GDPR and the EU AI Act are not two options to weigh against each other. They are two separate statutes, each with its own scope test, and a system either falls inside a given test or it doesn't — independent of how the other statute reads. The question that actually matters for a specific system is not "which regime is stricter" but **which rules bind this system at all**, based on where it operates, where its users are, and what it does with personal data. For most consequential AI systems the honest answer is "both, simultaneously, and neither compliance program substitutes for the other" — which makes the two scope tests the real gates here, and the obligations that follow the tradeoffs worth comparing only once you know which gates are open.

## Gate 1: does GDPR apply to this system at all

GDPR's territorial scope is set by **Article 3**, and it turns on three independent conditions, any one of which is enough [1]:

- **EU establishment.** The regulation applies to processing "in the context of the activities of an establishment of a controller or a processor in the Union, regardless of whether the processing takes place in the Union or not." Having an EU office or subsidiary is sufficient on its own, even if the actual data processing happens elsewhere.
- **Targeting or monitoring EU data subjects.** A controller or processor with no EU establishment at all is still caught if it offers goods or services to people in the Union, or monitors their behaviour as far as that behaviour takes place in the Union. This is the clause that reaches a US-only company with EU customers or EU website visitors.
- **Public international law.** Processing in a place where Member State law applies by virtue of public international law (an embassy, for instance) — a narrow case, but worth naming for completeness.

None of these conditions require the processing to involve AI. A conventional, non-AI HR database holding EU employees' personal data is squarely inside GDPR and never touches the AI Act at all, because the AI Act's scope is limited to AI systems and general-purpose AI models as it defines them [2].

## Gate 2: does the EU AI Act apply to this system at all

The AI Act's scope is set by **Article 2**, and its geographic reach is, independently, at least as broad as GDPR's [2]:

- **Placing on the market or putting into service in the Union** — providers are covered "irrespective of whether those providers are established or located within the Union or in a third country."
- **Deployers within the Union.**
- **The output-based extraterritorial clause** — Article 2(1)(c) reaches "providers and deployers of AI systems that have their place of establishment or are located in a third country, where the output produced by the AI system is used in the Union." A US-only company with no EU presence and no EU customers can still be in scope if what its AI system produces is used inside the Union.
- Importers, distributors, product manufacturers integrating an AI system, authorised representatives, and affected persons located in the Union.

The Act carves out systems used exclusively for military, defence, or national security purposes, and systems developed and put into service solely for scientific research and development [2]. Outside those exclusions, an AI system that never touches personal data — an industrial-equipment-monitoring model trained only on sensor telemetry, say — can be squarely inside the AI Act's high-risk or transparency obligations while sitting entirely outside GDPR, because nothing in its processing is personal data.

## The common case: both gates open, and clearing one does not clear the other

Most systems this wiki's readers actually build sit inside both gates at once: an AI system (Gate 2) that ingests, generates, or acts on personal data — training data, user prompts, logs tied to an account — and is placed on or used in the EU market. In that overlap, satisfying GDPR does not satisfy the AI Act, and satisfying the AI Act does not satisfy GDPR — they test different things about the same system, and a compliance program that treats either as a proxy for the other will have a real gap.

This is the point where a feature-by-feature comparison of the two regimes actually becomes useful — but only for readers in this overlap. If your system cleared Gate 2 but not Gate 1 (no personal data involved), everything below about GDPR's obligations is not relevant to you; if it cleared Gate 1 but not Gate 2 (no AI system involved), the AI Act's tiers and conformity requirements are not relevant to you either. Confirm which gates are actually open for your system before reading the obligations comparison as if it all applies.

## A third, independent exposure the two EU statutes don't resolve between them

Clearing both EU gates still leaves open a separate question that neither regulation answers: which government can compel your processor to hand data over, regardless of where that processor's servers sit. If any part of the processing chain — a model API, a logging pipeline, a managed database — runs through a provider subject to US jurisdiction, the **US CLOUD Act** attaches independently of both EU tests, and it collides directly with GDPR's Article 48, which does not recognise a foreign authority's order as a valid basis for transferring personal data absent an international agreement like an MLAT [3][4]. The EDPB and EDPS' own joint assessment concluded a CLOUD Act request alone is not a GDPR legal basis for the transfer it demands — a genuine, unresolved conflict of laws, not a compliance gap either side can close unilaterally. The AI Act contains no comparable provision: its conformity-assessment and market-surveillance machinery addresses product safety and fundamental-rights risk, not a third country's compelled disclosure of a provider's data. See [the US CLOUD Act](/glossary/cloud-act/) for the mechanism in full, and [data sovereignty](/glossary/data-sovereignty/) for why residency (where data sits) and sovereignty (whose law governs it) are not the same guarantee. This exposure is worth tracking as its own line item — it is orthogonal to both GDPR and AI Act compliance, not a subset of either.

## Where the obligations diverge once both apply (tradeoffs, not gates)

Once a system clears both gates, the two regimes impose genuinely different obligations that happen to touch overlapping ground. None of these are gates — none of them rule an option out — but treating any one as interchangeable with its counterpart under the other statute is the specific mistake a unified compliance program has to avoid.

**Risk approach.** GDPR does not sort processing into risk tiers; it applies baseline obligations to all processing and layers extra duties — a DPIA under Article 35, a mandatory DPO under Article 37 — onto processing that meets qualitative, fact-specific tests, not a fixed classification list [5]. The AI Act instead codifies four risk tiers in law — unacceptable (banned), high-risk (extensive pre-market and ongoing obligations), limited risk (transparency duties), minimal risk (voluntary) — with the high-risk tier keyed to enumerated Annex III use cases (employment, credit and insurance, biometric identification, critical infrastructure, education, law enforcement, migration, administration of justice) [6]. A system can be GDPR high-risk (triggering a DPIA) without being AI Act high-risk, and vice versa; the two "high-risk" labels are not the same test.

**Transparency.** GDPR requires informing data subjects about automated decision-making and giving meaningful information about the logic involved (Article 22). The AI Act's Article 50 requires disclosing AI interaction, labelling AI-generated content with machine-readable marks, and — for emotion-recognition and biometric-categorisation systems — telling exposed individuals the system is running [7]. Both push toward disclosure, but they disclose different things to different audiences for different reasons, and a UI notice that satisfies one does not automatically satisfy the other.

**Risk assessment.** GDPR's DPIA (Article 35) and the AI Act's risk management system (Article 9, required for high-risk AI) are different documents with different scopes — one assesses risk to data subjects' rights and freedoms, the other assesses broader safety and fundamental-rights risk across the system's lifecycle. They can and should be coordinated procedurally; neither substitutes for the other on its own terms. See [conducting DPIAs for AI systems](/guides/data-protection-impact-assessment/).

**Human oversight.** GDPR Article 22 governs [automated decision-making](/glossary/automated-decision-making/) and requires the option of human intervention in decisions made solely by automated means with legal or similarly significant effects. The AI Act requires human oversight measures for high-risk AI systems more broadly, regardless of whether a specific decision is "solely automated" in Article 22's sense.

**Documentation, roles, and enforcement.** GDPR's recordkeeping centres on processing activities and is carried by controllers and processors, enforced by national data protection authorities. The AI Act's technical documentation (Annex IV) centres on the system itself and is carried by providers, deployers, importers, and distributors — a different cast of roles from GDPR's — with high-risk systems additionally needing a [conformity assessment](/glossary/conformity-assessment/) before market placement, something GDPR has no equivalent of. Enforcement runs through national market surveillance and AI authorities, with the Commission's AI Office holding direct enforcement power over GPAI model providers since 2 August 2026 [8]. Building one control that happens to serve both regimes (a documented data-governance process, for instance) is efficient; assuming it discharges both regulations' distinct duties without checking is not.

**Fines.** Both regimes use tiered penalties rather than a single ceiling, and the tiers don't line up one-to-one [9][10]:

| | GDPR (Article 83) | EU AI Act (Article 99) |
|---|---|---|
| Top tier | €20M or 4% global turnover, whichever is higher | €35M or 7% global turnover — reserved for prohibited (Article 5) practices |
| Mid tier | €10M or 2% — lower-severity breaches | €15M or 3% — most other obligations, including high-risk and GPAI duties, and Article 50 transparency breaches |
| Lower tier | — | €7.5M or 1% — supplying incorrect information |
| SME/startup treatment | Same tiers apply | Lower of the fixed amount and the percentage applies |

## Timeline: what's actually in force, September 2026

GDPR has applied in full since 25 May 2018 and its core operative text is unchanged. Its own reform track — the **Data Omnibus** (Commission proposal COM(2025) 837 final, 19 November 2025, procedure 2025/0360(COD)) — is still a proposal, not law, as of this writing: it would clarify that scientific research is a legitimate interest and add a route (a proposed Article 88c-style basis, with an unconditional opt-out) for AI providers to rely on legitimate interest for training and development, plus a narrower carve-out for "residual" special-category data surfaced incidentally during AI training [11][12]. Treat all of this as unsettled: as of September 2026 it has cleared neither Parliament nor Council — the Council's negotiating-mandate vote scheduled for 26 June 2026 was cancelled for lack of agreement, and the file is continuing under the Irish Council Presidency [16]. Data-protection practitioners have separately criticised the drafting of the legitimate-interest provision itself, arguing its opt-out mechanism cannot work for data scraped from the open web [11].

The AI Act's own reform track has already become law. The **Digital Omnibus on AI** — Regulation (EU) 2026/1744, dated 8 July 2026 — was published in the Official Journal on 24 July 2026 and entered into force on 27 July 2026 [8][13]. It deferred the high-risk deadlines: standalone Annex III systems now have until **2 December 2027** (from 2 August 2026), and Annex I high-risk AI embedded in regulated products until **2 August 2028** (from 2 August 2027). It did not touch Article 50: the transparency duties — deepfake and AI-generated-content labelling, disclosure that a user is talking to a machine — took effect and became enforceable exactly as scheduled, on 2 August 2026, alongside the AI Office's new enforcement power over GPAI providers [8]. The bans on unacceptable-risk practices and the AI literacy duty have applied since 2 February 2025 and were unaffected; the Omnibus separately added two new prohibited categories — AI-generated non-consensual intimate imagery (including "nudifier" tools) and CSAM — but this is a new prohibition taking effect on 2 December 2026, not an existing ban with a compliance grace period: nothing in the AI Act itself bars this conduct before that date. Providers get a narrow safe harbour where they've implemented technical safeguards that reliably prevent such outputs [8].

The practical read: the AI Act's high-risk deferral bought real time, but not for transparency, not for GPAI, and not for the prohibited practices already in force since February 2025 — those obligations are live now, against the fine tiers above. The two newest prohibited categories are the exception: NCII and CSAM generation are not yet banned under the AI Act as of this writing and won't be until 2 December 2026. GDPR did not move at all in this window. See [EU AI Act enforcement begins](/news/eu-ai-act-enforcement-begins-2026/) for the full timeline and [governance thresholds as you scale](/guides/governance-thresholds-as-you-scale/) for the specific conditions that trigger each obligation on a growing system.

## What this comparison can't resolve for you

**Whether your specific system is Annex III high-risk.** That's a use-case classification exercise against the enumerated domains, not something a general comparison can settle — work through [the EU AI Act compliance checklist](/guides/eu-ai-act-compliance-checklist/).

**Whether your specific processing triggers a DPIA or a mandatory DPO.** Both tests are qualitative — "likely to result in high risk," "large scale" — with no universal headcount or volume number attached; see [GDPR for AI/ML teams](/guides/gdpr-for-ai-teams/) for how to make that call for your own processing.

**Whether the Data Omnibus's legitimate-interest provision becomes law, and in what form.** This page cannot resolve pending EU legislation; track it directly rather than building a compliance program on a provision that may be amended or dropped before adoption.

**Whether a CLOUD Act conflict actually materialises for your specific vendor relationship.** That depends on your contract, your encryption architecture, and whether your provider actually holds the keys — a question for your own legal and architecture review, not a general rule. [The US CLOUD Act](/glossary/cloud-act/) covers the mechanism; it does not tell you your own exposure.

**How a specific national DPA or AI authority will read a borderline case.** Enforcement bodies are national even where the law is EU-wide, and their interpretive practice is not something a wiki page can substitute for.

None of this is resolved by comparing the two statutes more carefully — it requires the reader's own facts, applied by someone qualified to apply them.

## Sources

1. Regulation (EU) 2016/679 (GDPR), Article 3 — Territorial scope: [https://gdpr-info.eu/art-3-gdpr/](https://gdpr-info.eu/art-3-gdpr/)
2. Regulation (EU) 2024/1689 (AI Act), Article 2 — Scope: [https://artificialintelligenceact.eu/article/2/](https://artificialintelligenceact.eu/article/2/)
3. Regulation (EU) 2016/679 (GDPR), Article 48 — Transfers or disclosures not authorised by Union law: [https://gdpr-info.eu/art-48-gdpr/](https://gdpr-info.eu/art-48-gdpr/)
4. EDPB and EDPS, "Initial legal assessment of the impact of the US CLOUD Act on the EU legal framework for the protection of personal data" (12 July 2019): [https://www.edpb.europa.eu/our-work-tools/our-documents/letters/edpb-edps-joint-response-libe-committee-impact-us-cloud-act_en](https://www.edpb.europa.eu/our-work-tools/our-documents/letters/edpb-edps-joint-response-libe-committee-impact-us-cloud-act_en)
5. Regulation (EU) 2016/679 (GDPR), Articles 35 and 37: [https://gdpr-info.eu/art-35-gdpr/](https://gdpr-info.eu/art-35-gdpr/), [https://gdpr-info.eu/art-37-gdpr/](https://gdpr-info.eu/art-37-gdpr/)
6. artificialintelligenceact.eu, "Annex III: High-Risk AI Systems": [https://artificialintelligenceact.eu/annex/3/](https://artificialintelligenceact.eu/annex/3/)
7. EU Artificial Intelligence Act, Article 50 (transparency obligations): [https://artificialintelligenceact.eu/article/50/](https://artificialintelligenceact.eu/article/50/)
8. "EU AI Act Enforcement Begins: Transparency Rules Live, High-Risk Deferred to 2027," this wiki: [/news/eu-ai-act-enforcement-begins-2026/](/news/eu-ai-act-enforcement-begins-2026/)
9. Regulation (EU) 2016/679 (GDPR), Article 83 — General conditions for imposing administrative fines: [https://gdpr-info.eu/art-83-gdpr/](https://gdpr-info.eu/art-83-gdpr/)
10. EU Artificial Intelligence Act, Article 99 (penalties): [https://artificialintelligenceact.eu/article/99/](https://artificialintelligenceact.eu/article/99/)
11. IAPP, "EU Digital Omnibus amendments to GDPR to facilitate AI training miss the mark": [https://iapp.org/news/a/eu-digital-omnibus-amendments-to-gdpr-to-facilitate-ai-training-miss-the-mark](https://iapp.org/news/a/eu-digital-omnibus-amendments-to-gdpr-to-facilitate-ai-training-miss-the-mark)
12. European Commission, Proposal COM(2025) 837 final (Data Omnibus, procedure 2025/0360(COD)), 19 November 2025: [https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:52025PC0837](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:52025PC0837)
13. Regulation (EU) 2026/1744 of 8 July 2026 (Digital Omnibus on AI), EUR-Lex: [https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng](https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng)
14. Regulation (EU) 2024/1689 (the AI Act), EUR-Lex: [https://eur-lex.europa.eu/eli/reg/2024/1689/oj](https://eur-lex.europa.eu/eli/reg/2024/1689/oj)
15. Regulation (EU) 2016/679 (GDPR), EUR-Lex: [https://eur-lex.europa.eu/eli/reg/2016/679/oj](https://eur-lex.europa.eu/eli/reg/2016/679/oj)
16. European Parliament, Legislative Train Schedule — "Digital Omnibus Regulation," status entry noting the cancelled 26 June 2026 Council mandate vote and continued negotiation under the Irish Presidency: [https://www.europarl.europa.eu/legislative-train/theme-a-new-plan-for-europe-s-sustainable-prosperity-and-competitiveness/file-digital-package](https://www.europarl.europa.eu/legislative-train/theme-a-new-plan-for-europe-s-sustainable-prosperity-and-competitiveness/file-digital-package)

## Further reading

- [Constraint-driven comparisons](/guides/constraint-driven-comparisons/): the methodology this page follows — gates before tradeoffs, and why a feature grid alone misleads.
- [The US CLOUD Act](/glossary/cloud-act/): the third exposure that neither GDPR nor the AI Act resolves on its own.
- [Data sovereignty](/glossary/data-sovereignty/): why residency and sovereignty are different guarantees.
- [Governance thresholds as you scale](/guides/governance-thresholds-as-you-scale/): the specific triggers — not size, not revenue — that bring each obligation into force on a real system.
- [EU AI Act compliance checklist](/guides/eu-ai-act-compliance-checklist/): the Annex III classification exercise in full.
- [GDPR for AI/ML teams](/guides/gdpr-for-ai-teams/): practical GDPR steps across the ML lifecycle.
- [Conducting DPIAs for AI systems](/guides/data-protection-impact-assessment/): the Article 35 assessment process.
- [AI transparency obligations](/guides/ai-transparency-obligations/): what Article 50 disclosure and labelling require in practice.
- [EU AI Act enforcement begins](/news/eu-ai-act-enforcement-begins-2026/): the full post-Omnibus timeline.
- [EU AI Act vs US AI regulation](/comparisons/eu-vs-us-ai-regulation/): how this EU-internal overlap compares to the separate EU/US jurisdictional question.
