---
title: "EU AI Act Enforcement Begins: Transparency Rules Live, High-Risk Deferred to 2027"
description: "On 2 August 2026 the AI Act's Article 50 transparency duties became enforceable and the AI Office gained GPAI enforcement powers. Days earlier, the Digital Omnibus (Regulation (EU) 2026/1744) had already removed the high-risk deadline from that date."
date: 2026-08-02
lastmod: 2026-09-02
last_updated: 2026-09-02
categories: [News]
tags: [eu-ai-act, gpai, ai-governance, ai-regulation, compliance, transparency, digital-omnibus]
related:
  - news/eu-ai-act-august-2026-obligations
  - guides/eu-ai-act-compliance-checklist
  - guides/ai-transparency-obligations
  - guides/ai-regulatory-compliance-checklist
---

The date the EU AI Act had been building toward since 2024 arrived on 2 August 2026, and it arrived smaller than planned. Five days earlier, the **Digital Omnibus on AI** entered into force and pushed the high-risk obligations out by more than a year. What actually switched on was the transparency regime: labelling of AI-generated content, disclosure that you are talking to a machine, and the enforcement machinery behind both. Our [earlier article on this milestone](/news/eu-ai-act-august-2026-obligations/) was written while the Omnibus was still unpublished; this is what the law now says.

## What happened

Two things landed in the space of a week.

**The Digital Omnibus became law.** Regulation (EU) 2026/1744, dated 8 July 2026, was published in the Official Journal on **24 July 2026** and entered into force on **27 July 2026** — three days after publication, treated as a matter of urgency precisely because the 2 August deadline was days away. It amends Regulation (EU) 2024/1689 (the AI Act) along with Regulations (EU) 2018/1139 and (EU) 2023/1230.

**The transparency duties became enforceable.** On 2 August 2026 the Commission's AI Office and national market surveillance authorities began enforcing the Article 50 obligations, alongside the European Data Protection Supervisor for EU institutions.

## What is actually in force now

Article 50 requires that certain outputs be, in the Commission's words, "clearly and visibly labelled" with machine-readable marks:

- **Deepfakes** — image, audio, or video content resembling real persons, objects, places, or events.
- **Emotion recognition and biometric categorisation** systems must tell the people exposed to them that they are running.
- **AI-generated or manipulated text** published to inform the public on matters of public interest, where it has not been through human editorial review.

Separately, providers must inform users when "they are not interacting with a real person, but an AI system" — chatbots, voice agents, and avatars.

Penalties for breach of the transparency duties run to **15 million euro or 3% of worldwide annual turnover**, whichever is higher, with a **750,000 euro** ceiling for EU institutions and reduced amounts for SMEs and small mid-caps.

The obligations that were already live stayed live: the Article 5 prohibited-practices regime (since 2 February 2025) and the GPAI provider obligations under Articles 51–56 (since 2 August 2025, now enforceable by the AI Office).

## What was deferred

| Obligation | Original date | New date |
|---|---|---|
| Annex III standalone high-risk systems | 2 August 2026 | **2 December 2027** |
| Annex I high-risk AI in regulated products | 2 August 2027 | **2 August 2028** |
| Article 50 transparency | 2 August 2026 | *unchanged* |
| GPAI obligations (Arts. 51–56) | 2 August 2025 | *unchanged* |
| Article 5 prohibitions | 2 February 2025 | *unchanged* |

Annex III covers the categories most enterprises worry about: biometric identification, critical infrastructure, education, employment, essential private and public services such as credit scoring and insurance, law enforcement, migration, and administration of justice. Those systems now have until 2 December 2027 to complete conformity assessment, technical documentation, and registration in the EU database.

The Omnibus does more than move dates. It expands the AI Office's powers, streamlines [conformity assessment](/glossary/conformity-assessment/), extends simplified documentation to medium-sized companies, and lets the Commission adjust AI Act requirements by delegated act where sector-specific law already provides equivalent or higher protection. It also adds two prohibited categories to Article 5 — systems for non-consensual intimate imagery and CSAM — with a grace period to 2 December 2026 for technical safeguards.

## Why it matters for builders

The practical consequence is a reordering of what is urgent.

If you ship a chatbot, a voice agent, a synthetic-media feature, or anything that generates published text into the EU market, your compliance deadline was **2 August 2026** and it has passed. This is not the paperwork-heavy tier — it is labelling, disclosure, and provenance marking — but it is enforceable now, against a percentage-of-turnover penalty. Machine-readable marking in particular is an engineering task, not a legal one: see [AI watermarking](/glossary/ai-watermarking/) for the mechanisms.

If you build Annex III high-risk systems, you have gained roughly sixteen months. That is genuine relief, and it is also the trap. The requirements did not shrink; the risk management system, data governance, logging, human oversight, and conformity assessment all still have to exist by 2 December 2027. Teams that treat the deferral as cancellation will meet the same wall later with less runway.

If you provide a GPAI model, the change is that the AI Office can now act — request information and model access, order mitigations or recalls, and fine. Documentation that was adequate as a good-faith gesture now has to survive a regulator asking for it.

## What to do

- **Audit your surfaces for Article 50 exposure first.** Every generative output that reaches an EU user is in scope for labelling or disclosure. This is the only tier with a deadline already behind you.
- **Implement machine-readable provenance**, not just visible labels. The text of Article 50 asks for both.
- **Keep the Annex III programme running** on the December 2027 date. Re-baseline the plan; do not shelve it.
- **Re-read your classification** against the amended text. The Omnibus changed conformity-assessment routes and documentation thresholds, so a system assessed under the 2024 text may sit differently now.
- **Watch for delegated acts.** The Commission's new power to adjust requirements where sectoral law overlaps will be exercised through them, and they will move faster than the primary legislation did.

## Sources

1. Regulation (EU) 2026/1744 of the European Parliament and of the Council of 8 July 2026 amending Regulations (EU) 2024/1689, (EU) 2018/1139 and (EU) 2023/1230 (Digital Omnibus on AI), EUR-Lex: [https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng](https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng)
2. European Commission, "Safer and more transparent AI" (2 August 2026): [https://commission.europa.eu/news-and-media/news/safer-and-more-transparent-ai-2026-08-02_en](https://commission.europa.eu/news-and-media/news/safer-and-more-transparent-ai-2026-08-02_en)
3. European Commission, "Commission starts enforcing AI Act rules and new transparency requirements" (31 July 2026): [https://ec.europa.eu/commission/presscorner/detail/en/ip_26_1714](https://ec.europa.eu/commission/presscorner/detail/en/ip_26_1714)
4. European Commission, AI Act regulatory framework: [https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai](https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai)
5. White & Case, "EU AI Omnibus enters into force, amending the AI Act": [https://www.whitecase.com/insight-alert/eu-ai-omnibus-enters-force-amending-ai-act](https://www.whitecase.com/insight-alert/eu-ai-omnibus-enters-force-amending-ai-act)
6. Hunton, "EU Digital Omnibus on AI Enters Into Force": [https://www.hunton.com/privacy-and-cybersecurity-law-blog/eu-digital-omnibus-on-ai-enters-into-force](https://www.hunton.com/privacy-and-cybersecurity-law-blog/eu-digital-omnibus-on-ai-enters-into-force)
7. Cloud Security Alliance, "EU AI Act's High-Risk Deadline: Deferred, Not Cancelled": [https://labs.cloudsecurityalliance.org/research/csa-research-note-eu-ai-act-high-risk-deadline-omnibus-20260/](https://labs.cloudsecurityalliance.org/research/csa-research-note-eu-ai-act-high-risk-deadline-omnibus-20260/)
8. EU Artificial Intelligence Act, Article 50 (transparency obligations): [https://artificialintelligenceact.eu/article/50/](https://artificialintelligenceact.eu/article/50/)

## Further reading

- [EU AI Act: what takes effect on 2 August 2026](/news/eu-ai-act-august-2026-obligations/): the pre-Omnibus analysis this article updates.
- [EU AI Act compliance checklist](/guides/eu-ai-act-compliance-checklist/): the operational steps per tier.
- [AI transparency obligations](/guides/ai-transparency-obligations/): what disclosure and labelling look like in practice.
- [AI watermarking](/glossary/ai-watermarking/): how machine-readable provenance marking actually works.
- [EU vs US AI regulation](/comparisons/eu-vs-us-ai-regulation/): the divergence, now wider.
- [The US moves to preempt state AI laws](/news/us-ai-policy-preemption-2026/): the contrasting direction of travel.
