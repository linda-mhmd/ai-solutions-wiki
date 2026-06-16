---
title: "GDPR vs EU AI Act"
description: "Comparison of GDPR and the EU AI Act: how they overlap, where they differ, and how organizations must comply with both when deploying AI systems in the EU."
date: 2026-03-28
last_verified: 2026-06-14
categories: [Comparisons]
tags: [gdpr, eu-ai-act, regulation, compliance, data-protection, ai-governance]
related:
  - glossary/gdpr
  - glossary/conformity-assessment
  - frameworks/gdpr-ai-framework
  - frameworks/eu-ai-act-risk-framework
  - guides/ai-regulatory-compliance-checklist
last_updated: 2026-06-14
lastmod: 2026-06-14
---

GDPR and the EU AI Act are complementary regulations, not alternatives. Organizations deploying AI systems that process personal data must comply with both simultaneously. Understanding where they overlap and diverge is essential for building compliant AI systems.

## Scope

**GDPR** applies to any processing of personal data of EU residents, regardless of whether AI is involved. It covers all organizations worldwide that process EU personal data. **EU AI Act** applies to AI systems placed on the EU market or whose output is used in the EU, regardless of whether personal data is involved. An AI system that processes only non-personal data (industrial equipment monitoring, for example) falls under the EU AI Act but not GDPR. An AI system processing personal data falls under both.

## Risk Approach

**GDPR** does not classify processing activities into risk tiers. Instead, it applies baseline requirements to all processing and adds specific obligations (like DPIAs) for high-risk processing. **EU AI Act** explicitly classifies AI systems into four risk categories: unacceptable (banned), high-risk (extensive requirements), limited risk (transparency obligations), and minimal risk (voluntary codes of conduct). This risk-based classification determines which obligations apply.

## Timeline and Current State (2026)

GDPR has applied in full since 25 May 2018 and its core text is unchanged. The EU AI Act entered into force on 1 August 2024 and applies in phases. The bans on unacceptable-risk practices and the AI literacy obligations applied from 2 February 2025. Obligations for providers of general-purpose AI (GPAI) models and the governance rules applied from 2 August 2025. Obligations for high-risk AI systems were originally set to apply from 2 August 2026 (Annex III standalone systems) and 2 August 2027 (Annex I systems embedded in regulated products).

In November 2025 the European Commission published the Digital Omnibus, a package proposing targeted simplifications to both the AI Act and the GDPR. On the AI Act side, the legislators agreed to postpone the high-risk deadlines: standalone high-risk systems move to 2 December 2027 and embedded high-risk systems move to 2 August 2028, on the rationale that supporting standards and guidance should be ready before the obligations bite. On the GDPR side, the package proposes (but as of mid-2026 has not yet enacted) an explicit legitimate-interest basis for processing personal data to develop and train AI models, plus clarifications on the controller-relative assessment of personal data and on processing special category data for bias detection. Treat the GDPR proposals as in flux, not settled law.

## Key Overlapping Requirements

**Transparency** - GDPR requires informing data subjects about automated decision-making and providing meaningful information about the logic involved. The EU AI Act requires disclosing AI interaction, marking AI-generated content, and providing detailed instructions for use of high-risk systems. Both push toward explainable AI, but from different angles. **Risk assessment** - GDPR requires a {{< relref "glossary/dpia" >}} for high-risk processing. The EU AI Act requires risk management systems for high-risk AI. These are different assessments with different scopes, but they can be coordinated. **Human oversight** - GDPR Article 22 governs {{< relref "glossary/automated-decision-making" >}} and requires the option of human intervention in decisions made solely by automated means. The EU AI Act requires human oversight measures for high-risk AI systems. **Documentation** - Both require documentation, but with different focuses: GDPR on data processing records, EU AI Act on technical system documentation.

## Key Differences

| Aspect | GDPR | EU AI Act |
|--------|------|-----------|
| Focus | Personal data protection | AI system safety and rights |
| Applies to | Personal data processing | AI systems on EU market |
| Key roles | Controller, Processor | Provider, Deployer, Importer |
| Enforcement | National DPAs | National AI authorities + market surveillance |
| Max fine | 4% global turnover or 20M EUR | 7% global turnover or 35M EUR |
| Conformity | Not applicable | Required for high-risk AI |

Both regimes use tiered fines rather than a single ceiling. GDPR's highest tier is up to 20M EUR or 4% of worldwide annual turnover, whichever is higher, with a lower tier of up to 10M EUR or 2% for less serious breaches. The EU AI Act reserves its top tier (up to 35M EUR or 7% of turnover) for prohibited practices, with up to 15M EUR or 3% for most other obligations including high-risk requirements, and up to 7.5M EUR or 1% for supplying incorrect information. For small and medium-sized enterprises and startups, the AI Act applies the lower of the fixed amount and the percentage.

## Compliance Strategy

Organizations should not treat GDPR and EU AI Act compliance as separate workstreams. Many controls serve both: data governance supports both GDPR's data quality principle and the EU AI Act's training data requirements. Explainability mechanisms satisfy both GDPR's right to explanation and the EU AI Act's transparency obligations. Risk assessments can be coordinated, with the DPIA addressing data protection risks and the AI Act risk management system addressing broader safety and rights risks.

Build a unified compliance framework that maps each control to the specific articles of each regulation it satisfies. This avoids duplication of effort and ensures that no requirement falls through the cracks between teams.

## Sources

- [Regulation (EU) 2024/1689 (the AI Act), EUR-Lex](https://eur-lex.europa.eu/eli/reg/2024/1689/oj)
- [Regulation (EU) 2016/679 (GDPR), EUR-Lex](https://eur-lex.europa.eu/eli/reg/2016/679/oj)
- [AI Act, Shaping Europe's digital future, European Commission](https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai)
- [Simpler EU digital rules (Digital Omnibus), European Commission](https://digital-strategy.ec.europa.eu/en/news/simpler-eu-digital-rules-and-new-digital-wallets-save-billions-businesses-and-boost-innovation)
- [Artificial Intelligence Act: delayed application, ban on nudifier apps, European Parliament](https://www.europarl.europa.eu/news/en/press-room/20260323IPR38829/artificial-intelligence-act-delayed-application-ban-on-nudifier-apps)
