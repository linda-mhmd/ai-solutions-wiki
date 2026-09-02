---
title: "EU AI Act: What Takes Effect on 2 August 2026"
description: "On 2 August 2026 the AI Act becomes broadly applicable and GPAI enforcement begins. A Digital Omnibus may defer high-risk deadlines, but it is not yet law."
date: 2026-05-07
lastmod: 2026-09-02
last_updated: 2026-09-02
categories: [News]
tags: [eu-ai-act, gpai, ai-governance, ai-regulation, compliance, foundation-models]
related:
  - news/eu-ai-act-enforcement-begins-2026
  - guides/ai-regulatory-compliance-checklist
  - guides/ai-transparency-obligations
  - guides/ai-governance-implementation
  - guides/ai-model-governance
---

> **Update (2 September 2026):** the Digital Omnibus was published in the Official Journal as
> Regulation (EU) 2026/1744 on 24 July 2026 and entered into force on 27 July 2026. The Annex III
> high-risk deadline moved to **2 December 2027** and the Annex I deadline to **2 August 2028**.
> The Article 50 transparency duties and GPAI obligations went ahead on 2 August 2026 as written.
> This article records the position as it stood before that publication; for what is now in force see
> [EU AI Act enforcement begins](/news/eu-ai-act-enforcement-begins-2026/).

The EU AI Act reaches a major milestone on 2 August 2026. As the law is currently written, most of the regulation becomes applicable on that date: the rules for high-risk AI systems listed in Annex III, the full governance and enforcement framework, and the penalty regime. It is also the day the European Commission and its AI Office gain the power to enforce the general-purpose AI (GPAI) obligations that have technically been in force since 2 August 2025. A separate "Digital Omnibus" reform would push several high-risk deadlines out by more than a year. The Council gave it a final green light on 29 June 2026, and it was subsequently published as Regulation (EU) 2026/1744 on 24 July 2026.

## What happened

The AI Act (Regulation (EU) 2024/1689) entered into force on 1 August 2024 and applies in staged phases. The bans on prohibited practices and the AI literacy duty applied first, on 2 February 2025. The obligations for GPAI model providers and the governance rules applied on 2 August 2025. The next phase lands on 2 August 2026, when the European Commission describes the Act as becoming "fully applicable" with some exceptions. This phase covers Annex III high-risk systems, the governance structure (national competent authorities and the cooperation framework), and the penalty provisions under Article 99.

For GPAI specifically, the obligations already exist, but 2 August 2026 is when the Commission can begin enforcement: requesting information and model access, ordering mitigations or recalls, and imposing fines of up to 3% of worldwide annual turnover or 15 million euro, whichever is higher. Providers of models with systemic risk (presumed when cumulative training compute exceeds 10^25 floating point operations under Article 51) carry extra duties around evaluation, adversarial testing, incident reporting, and cybersecurity.

The complication is the Digital Omnibus. EU negotiators from the Commission, Parliament, and Council reached a provisional political agreement on 7 May 2026, confirmed by member state representatives on 13 May 2026. It would defer the obligations for stand-alone Annex III high-risk systems to 2 December 2027, and for high-risk AI embedded in regulated products (Annex I) to 2 August 2028. The Council gave the package its final green light on 29 June 2026. It still has to clear legal-linguistic revision, formal adoption by both co-legislators, and publication in the Official Journal before it takes legal effect. Publication is expected before 2 August 2026, but until the amendment appears in the Official Journal the original 2 August 2026 high-risk deadline remains the binding text.

## Why it matters for builders

Two practical points follow. First, if you provide a GPAI model in the EU market, the soft-launch period ends on 2 August 2026. Transparency documentation, a copyright policy, and (for systemic-risk models) the heavier safety obligations need to be real and demonstrable, because the AI Office can now act and fine. Models placed on the market before 2 August 2025 have until 2 August 2027 to come into full compliance.

Second, if you build or deploy high-risk systems, the delay is now law: Regulation (EU) 2026/1744 moved the Annex III deadline to 2 December 2027 and the Annex I deadline to 2 August 2028. The requirements themselves did not change, only the date by which you must meet them.

## What to do

- Classify your systems now: prohibited, high-risk (Annex III or Annex I), GPAI, or limited-risk transparency only. Your obligations and timelines depend entirely on the tier.
- GPAI providers: finalise technical documentation, downstream-provider information, and a copyright policy. Consider signing the GPAI Code of Practice, which the Commission treats as a route to demonstrate compliance.
- High-risk operators: keep preparing for 2 August 2026. Build the risk management system, data governance, logging, human oversight, and conformity assessment, and watch the Official Journal for the Omnibus before relying on the 2027 dates.
- Track formal adoption: the deferred deadlines only become real once the amendment is published and enters into force.

## Sources

1. European Commission, AI Act regulatory framework: https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai
2. EU Artificial Intelligence Act, Implementation Timeline: https://artificialintelligenceact.eu/implementation-timeline/
3. Latham & Watkins, GPAI Model Obligations in Force and Final GPAI Code of Practice in Place: https://www.lw.com/en/insights/eu-ai-act-gpai-model-obligations-in-force-and-final-gpai-code-of-practice-in-place
4. Gibson Dunn, EU AI Act Omnibus Agreement, Postponed High-Risk Deadlines and Other Key Changes: https://www.gibsondunn.com/eu-ai-act-omnibus-agreement-postponed-high-risk-deadlines-and-other-key-changes/
5. Latham & Watkins, AI Act Update: EU Resolves to Change Rules and Extend Deadlines: https://www.lw.com/en/insights/ai-act-update-eu-resolves-to-change-rules-and-extend-deadlines
6. EU Artificial Intelligence Act, Article 51 (classification of GPAI models with systemic risk): https://artificialintelligenceact.eu/article/51/
7. EU Artificial Intelligence Act, Article 99 (penalties): https://artificialintelligenceact.eu/article/99/
8. Council of the EU, Artificial Intelligence: Council gives final green light to simplify and streamline rules (29 June 2026): https://www.consilium.europa.eu/en/press/press-releases/2026/06/29/artificial-intelligence-council-gives-final-green-light-to-simplify-and-streamline-rules/

## Further reading

- [EU AI Act enforcement begins](/news/eu-ai-act-enforcement-begins-2026/): what actually took effect on 2 August 2026, after the Omnibus.
- [The US moves to preempt state AI laws](/news/us-ai-policy-preemption-2026/): the contrasting US approach.
- [Beyond the EU: South Korea and Japan's AI laws](/news/asia-ai-laws-2026/): how other jurisdictions regulate.
- [The second International AI Safety Report](/news/international-ai-safety-report-2026/): the evidence base behind the rules.
- [AI regulatory compliance checklist](/guides/ai-regulatory-compliance-checklist/): how to prepare.
