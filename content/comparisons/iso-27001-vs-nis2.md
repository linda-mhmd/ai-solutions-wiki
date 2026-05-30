---
title: "ISO 27001 vs NIS2"
description: "Mapping ISO 27001 information security controls to NIS2 requirements, showing how existing ISO certification supports NIS2 compliance and where gaps remain."
date: 2026-03-28
last_verified: 2026-05-30
categories: [Comparisons]
tags: [iso-27001, nis2, cybersecurity, certification, compliance, mapping]
related:
  - glossary/nis2
  - glossary/iso-42001-glossary
  - guides/nis2-implementation-guide
  - comparisons/nis2-vs-dora
  - frameworks/nis2-compliance-framework
last_updated: 2026-05-30
---

Many organizations pursuing NIS2 compliance already hold ISO 27001 certification. Understanding the mapping between ISO 27001 controls and NIS2 requirements helps these organizations identify what additional work is needed rather than starting from scratch.

## Relationship

ISO 27001 is a voluntary international standard for information security management systems. NIS2 is a binding EU directive requiring cybersecurity risk management measures. NIS2 does not mandate ISO 27001 certification, but the directive's recitals acknowledge that international standards can be used to demonstrate compliance. ENISA and several national authorities have indicated that ISO 27001 certification provides a strong foundation for NIS2 compliance.

## Mapping NIS2 Article 21 to ISO 27001

**Risk analysis and information security policies** (NIS2 Art. 21(2)(a)) - Directly covered by ISO 27001 clauses 6.1 (risk assessment) and 5.2 (information security policy). **Incident handling** (NIS2 Art. 21(2)(b)) - Covered by ISO 27001 Annex A control A.5.24-A.5.28 (incident management). However, NIS2's specific reporting timelines (24-hour early warning, 72-hour notification) go beyond ISO 27001's requirements. **Business continuity** (NIS2 Art. 21(2)(c)) - Covered by ISO 27001 Annex A controls A.5.29-A.5.30. **Supply chain security** (NIS2 Art. 21(2)(d)) - Partially covered by ISO 27001 Annex A control A.5.21 (supplier relationships). NIS2 requires more explicit assessment of direct suppliers' security practices. **Network and system security** (NIS2 Art. 21(2)(e)) - Covered by multiple ISO 27001 Annex A controls across technology and operations. **Vulnerability handling** (NIS2 Art. 21(2)(f)) - Covered by ISO 27001 Annex A control A.8.8 (technical vulnerability management). **Risk assessment effectiveness** (NIS2 Art. 21(2)(g)) - Covered by ISO 27001 clause 9 (performance evaluation) and 10 (improvement). **Cybersecurity training** (NIS2 Art. 21(2)(h)) - Covered by ISO 27001 clause 7.2 (competence) and A.6.3 (awareness). **Cryptography** (NIS2 Art. 21(2)(i)) - Covered by ISO 27001 Annex A control A.8.24 (cryptography). **Access control** (NIS2 Art. 21(2)(j)) - Covered by ISO 27001 Annex A controls A.5.15-A.5.18 and A.8.2-A.8.5.

## Where ISO 27001 Falls Short

**Incident reporting timelines** - NIS2 mandates specific reporting to national authorities within defined timeframes. ISO 27001 requires incident management but does not prescribe regulatory reporting timelines. **Management liability** - NIS2 introduces personal liability for management body members. ISO 27001 requires management commitment but does not create personal legal liability. **Supply chain depth** - NIS2 requires assessment of direct suppliers' cybersecurity practices with more specificity than ISO 27001's supplier relationship controls. **Sector-specific requirements** - National transpositions of NIS2 may add sector-specific requirements not addressed by the generic ISO 27001 framework.

## Practical Approach

If you have ISO 27001 certification, treat it as your baseline and conduct a gap analysis against NIS2's specific requirements. Key gaps to address: establish regulatory incident reporting procedures with defined timelines, enhance supply chain security assessments to meet NIS2's depth requirements, ensure management body members understand their personal accountability under NIS2, and verify that your ISMS scope covers all systems relevant to NIS2.

If you do not have ISO 27001 certification, consider pursuing it as part of your NIS2 compliance program. The discipline of implementing an ISO 27001 ISMS will satisfy most of NIS2's risk management requirements, and certification provides third-party assurance that your security measures are effective.
