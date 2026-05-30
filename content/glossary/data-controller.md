---
title: "Data Controller"
description: "The entity that determines the purposes and means of processing personal data under GDPR, bearing primary responsibility for compliance in AI systems."
date: 2026-03-28
categories: [Glossary]
tags: [gdpr, data-controller, data-protection, compliance, regulation]
related:
  - glossary/data-processor
  - glossary/gdpr
  - glossary/dpia
  - frameworks/gdpr-ai-framework
  - guides/gdpr-for-ai-teams
last_updated: 2026-05-30
---

A data controller, as defined in Article 4(7) of GDPR, is the natural or legal person, public authority, agency, or other body that determines the purposes and means of the processing of personal data. The controller decides why personal data is processed and how it will be processed. This role carries primary accountability for GDPR compliance.

## Responsibilities

The data controller must ensure that all processing has a lawful basis, implement appropriate technical and organizational measures to protect data, respond to data subject rights requests, maintain records of processing activities, conduct Data Protection Impact Assessments when required, report data breaches to supervisory authorities within 72 hours, and ensure that any data processors they engage provide sufficient guarantees of compliance.

## Controller vs. Processor

The distinction between controller and processor is functional, not contractual. An organization is a controller if it decides the purpose and essential means of processing, regardless of what the contract says. Two or more controllers can be joint controllers if they jointly determine purposes and means, in which case they must arrange their respective responsibilities through a transparent agreement.

## AI-Specific Considerations

In AI systems, determining who is the controller can be complex. The organization that commissions an AI system and defines its purpose is typically the controller. If a company uses a third-party AI service to process customer data, the company remains the controller because it decides the purpose of processing. The AI service provider is typically the processor.

However, if the AI provider uses customer data to improve its own models, it may become a controller for that secondary processing. This dual role creates compliance complexity. Organizations deploying AI must clearly define controller and processor relationships in their data processing agreements and ensure that model training, fine-tuning, and inference activities all have clear legal bases attributed to the appropriate party.

When multiple organizations collaborate on an AI system, joint controllership may arise, requiring a formal arrangement under Article 26 of GDPR.

## Sources

- European Parliament and Council. (2016). *Regulation (EU) 2016/679 (GDPR)*, Articles 4(7), 24–27. Official Journal of the European Union. (Primary legal source; defines data controller, controller obligations, and joint controllership.)
- European Data Protection Board. (2021). *Guidelines 07/2020 on the concepts of controller and processor in the GDPR*. EDPB. (Authoritative guidance on distinguishing controllers from processors in complex AI deployment scenarios.)
- Wachter, S., & Mittelstadt, B. (2019). A right to reasonable inferences: Re-thinking data protection law in the age of big data and AI. *Columbia Business Law Review, 2019*(2). (Analyzes controller accountability for AI-generated inferences under GDPR.)
