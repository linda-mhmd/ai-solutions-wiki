---
title: "GDPR - General Data Protection Regulation"
description: "The EU's comprehensive data protection law governing how personal data is collected, processed, and stored, with significant implications for AI systems."
date: 2026-03-28
categories: [Glossary]
tags: [gdpr, data-protection, regulation, eu, privacy, compliance]
related:
  - frameworks/gdpr-ai-framework
  - guides/gdpr-for-ai-teams
  - glossary/dpia
  - glossary/data-controller
  - glossary/data-processor
  - glossary/right-to-explanation
  - glossary/automated-decision-making
  - comparisons/gdpr-vs-eu-ai-act
last_updated: 2026-05-30
---

The General Data Protection Regulation (GDPR) is the European Union's data protection law, in force since May 2018. It governs how organizations collect, process, store, and transfer personal data of individuals located in the EU. GDPR applies to any organization worldwide that processes EU residents' personal data, regardless of where the organization is headquartered.

## Core Principles

GDPR establishes seven principles for data processing:

**Lawfulness, fairness, and transparency** - Data must be processed legally, fairly, and in a way the data subject can understand. **Purpose limitation** - Data collected for one purpose cannot be repurposed without a compatible legal basis. **Data minimization** - Only the minimum data necessary for the stated purpose should be collected. **Accuracy** - Personal data must be kept accurate and up to date. **Storage limitation** - Data should not be retained longer than necessary. **Integrity and confidentiality** - Appropriate security measures must protect personal data. **Accountability** - The data controller must demonstrate compliance with all principles.

## Key Rights for Data Subjects

GDPR grants individuals specific rights over their data: the right of access, right to rectification, right to erasure (right to be forgotten), right to restrict processing, right to data portability, and the right to object to processing. For AI systems, Article 22 is particularly important as it gives individuals the right not to be subject to decisions based solely on automated processing that produce legal or similarly significant effects.

## Relevance to AI Systems

GDPR was not designed specifically for AI, but its provisions create binding constraints on machine learning workflows. Training data must have a lawful basis. Models trained on personal data must respect data subject rights, including the right to erasure, which raises questions about model retraining. Data Protection Impact Assessments (DPIAs) are mandatory for high-risk processing, which includes most AI systems that profile individuals or make automated decisions.

## Enforcement

Supervisory authorities in each EU member state enforce GDPR. Maximum fines are 20 million euros or 4% of annual global turnover, whichever is higher. Since 2018, regulators have issued billions of euros in cumulative fines, with enforcement increasingly focused on AI-related processing activities.

## Interaction with Other Regulations

GDPR works alongside the EU AI Act, NIS2 Directive, and DORA. Organizations building AI systems in the EU must comply with GDPR as a baseline, with additional requirements layered on by sector-specific and AI-specific regulations.

## Sources

- European Parliament and Council. (2016). *Regulation (EU) 2016/679 (General Data Protection Regulation)*. Official Journal of the European Union, L 119/1. (The regulation itself; all compliance obligations derive from this primary source.)
- Article 29 Working Party. (2018). *Guidelines on Data Protection Impact Assessment (DPIA)*. WP248rev.01. (Authoritative guidance on when DPIAs are mandatory; directly applicable to AI systems that profile individuals.)
- Wachter, S., Mittelstadt, B., & Floridi, L. (2017). Why a right to explanation of automated decision-making does not exist in the general data protection regulation. *International Data Privacy Law, 7*(2), 76–99. (Influential academic analysis of GDPR's AI provisions; frames the Article 22 debate.)
- Information Commissioner's Office. (2022). *Guidance on AI and Data Protection*. ICO. (Practical regulator guidance on applying GDPR principles to machine learning systems.)
