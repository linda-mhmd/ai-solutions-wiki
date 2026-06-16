---
title: "NIS2 vs DORA for Financial Services"
description: "Comparison of NIS2 and DORA requirements for financial services organizations, covering scope, security measures, incident reporting, and how to comply with both."
date: 2026-03-28
last_verified: 2026-06-14
categories: [Comparisons]
tags: [nis2, dora, financial-services, compliance, cybersecurity, regulation]
related:
  - glossary/nis2
  - glossary/dora
  - glossary/supply-chain-security
  - guides/nis2-implementation-guide
  - guides/dora-compliance-guide
last_updated: 2026-06-14
lastmod: 2026-06-14
---

Financial services organizations must comply with both NIS2 and DORA. While DORA is the sector-specific regulation (lex specialis) that takes precedence where requirements overlap, NIS2 still applies and may impose additional obligations. Understanding the relationship between these two regulations is critical for efficient compliance.

DORA (Regulation EU 2022/2554) entered into application on 17 January 2025 and applies directly across all member states, with no separate national transposition step. NIS2 (Directive EU 2022/2555) had a transposition deadline of 17 October 2024, but many member states missed it: in 2025 the European Commission issued reasoned opinions against 19 member states for incomplete transposition, and several national laws were still working through their legislative process in 2026. Because NIS2 is a directive, the exact obligations depend on each member state's implementing law.

## Scope

**NIS2** covers essential and important entities across multiple sectors. Banks and financial market infrastructure are classified as essential entities. **DORA** covers a comprehensive list of financial entities: credit institutions, payment institutions, investment firms, insurance and reinsurance undertakings, crypto-asset service providers, and their critical ICT third-party providers. DORA's scope within financial services is more granular and exhaustive than NIS2's.

## Lex Specialis Principle

Where DORA and NIS2 overlap, DORA takes precedence as the sector-specific regulation. NIS2 Article 4 sets out this lex specialis mechanism: where a sector-specific Union legal act imposes cybersecurity risk management or incident notification requirements at least equivalent in effect to NIS2, the corresponding NIS2 provisions do not apply to those entities. DORA Recital 28 confirms that DORA is lex specialis to NIS2 for the financial sector. However, NIS2 requirements that go beyond DORA's scope still apply. In practice, an organization that fully complies with DORA will meet most NIS2 requirements, but should verify coverage of any NIS2-specific obligations.

## Risk Management Comparison

| Aspect | NIS2 | DORA |
|--------|------|------|
| Scope | General cybersecurity risk | ICT risk specifically |
| Specificity | Ten areas of measures | Five detailed pillars |
| Supply chain | Security of direct suppliers | Detailed third-party ICT risk framework |
| Testing | Appropriate testing | Specific testing program including TLPT |
| Third-party oversight | Assessment of suppliers | Contractual provisions, exit strategies, concentration risk |

DORA's requirements are more prescriptive and detailed than NIS2's, particularly regarding third-party ICT risk management and resilience testing.

## Incident Reporting

**NIS2** requires early warning within 24 hours, incident notification within 72 hours, and a final report within one month, reported to national CSIRTs. **DORA** requires initial notification, intermediate reports, and a final report using specific templates defined by the European Supervisory Authorities, reported to financial competent authorities. The timelines are broadly similar, but the reporting channels and templates differ. Organizations should establish processes that can satisfy both reporting requirements simultaneously.

The overlap in incident reporting is a known pain point, and the EU is moving to reduce it. The Commission's Digital Omnibus package (published 19 November 2025) and a follow-up proposal to amend NIS2 (published 20 January 2026) aim to streamline cyber incident reporting and clarify how NIS2 interacts with sectoral regimes such as DORA and the CER Directive. As of mid-2026 these are proposals working through the EU legislative process, not yet in force, so the obligations above remain the current baseline.

## Third-Party Risk

This is where DORA goes significantly further than NIS2. DORA requires specific contractual provisions for ICT service providers (including audit rights, data location, and exit strategies), concentration risk assessment when multiple functions depend on the same provider, and oversight of critical ICT third-party providers (CTPPs) by the European Supervisory Authorities. NIS2 requires supply chain security assessment but with less prescriptive detail.

On 18 November 2025 the European Supervisory Authorities (the European Banking Authority, the European Insurance and Occupational Pensions Authority, and the European Securities and Markets Authority) published the first list of designated CTPPs under DORA, comprising 19 providers and including major cloud platforms such as Amazon Web Services, Microsoft Azure, and Google Cloud. Each designated provider is assigned a lead overseer that can request information, conduct investigations, and carry out on-site inspections. The ESAs intend to keep the list under review and update it over time. This direct oversight of third-party providers has no equivalent under NIS2, where supervision runs through the in-scope entities themselves rather than their suppliers.

## Enforcement

**NIS2** fines up to 10M EUR or 2% of turnover for essential entities, with personal liability for management. **DORA** fines determined by national competent authorities per member state law, with the European Supervisory Authorities empowered to impose periodic penalty payments on critical ICT third-party providers.

## Practical Compliance Approach

Start with DORA compliance as the more detailed and prescriptive framework. Map DORA controls to NIS2 requirements to identify any gaps. Address NIS2-specific obligations not covered by DORA. Establish unified incident reporting processes that satisfy both frameworks. Use a single risk management system that meets DORA's ICT risk requirements while also covering NIS2's broader cybersecurity risk areas.

## Sources

- [DORA, Regulation (EU) 2022/2554 (EUR-Lex)](https://eur-lex.europa.eu/eli/reg/2022/2554/oj)
- [NIS2, Directive (EU) 2022/2555 (EUR-Lex)](https://eur-lex.europa.eu/eli/dir/2022/2555/oj)
- [EIOPA: European Supervisory Authorities designate critical ICT third-party providers under DORA (18 November 2025)](https://www.eiopa.europa.eu/european-supervisory-authorities-designate-critical-ict-third-party-providers-under-digital-2025-11-18_en)
- [European Commission: cybersecurity rules, Commission calls on member states to fully transpose the NIS2 Directive](https://digital-strategy.ec.europa.eu/en/news/commission-calls-19-member-states-fully-transpose-nis2-directive)
