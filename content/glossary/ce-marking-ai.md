---
title: "CE Marking for AI"
description: "The CE marking applied to high-risk AI systems under the EU AI Act, indicating conformity with EU requirements and enabling market access."
date: 2026-03-28
categories: [Glossary]
tags: [ce-marking, eu-ai-act, regulation, compliance, high-risk-ai, certification]
related:
  - glossary/conformity-assessment
  - frameworks/eu-ai-act-risk-framework
  - guides/eu-ai-act-compliance
  - guides/ai-regulatory-compliance-checklist
last_updated: 2026-05-30
---

CE marking (Conformite Europeenne) for AI systems is the visible indicator that a high-risk AI system complies with the requirements of the EU AI Act and can be legally placed on the European market. The CE marking requirement for AI follows the same principle used for decades in EU product safety regulation, extending it to software-based systems for the first time at this scale.

## When CE Marking Is Required

CE marking is required for high-risk AI systems as classified under the EU AI Act. This includes AI systems used as safety components of regulated products (medical devices, machinery, vehicles, aviation systems) and standalone high-risk AI systems in areas such as biometric identification, critical infrastructure management, education, employment, essential services access, law enforcement, migration, and administration of justice.

## How to Obtain CE Marking

The provider must complete a conformity assessment (either internal or through a notified body, depending on the category), draw up a declaration of conformity, register the system in the EU database, and then affix the CE marking. The declaration of conformity must state that the AI system meets all applicable requirements and must be updated when changes occur.

## Responsibilities

The provider (developer or manufacturer) is responsible for the conformity assessment and CE marking. Importers must verify that the provider has carried out the assessment and that the CE marking is affixed. Distributors must verify that the system bears the CE marking and that the provider and importer have fulfilled their obligations.

## Practical Implications

For AI developers, CE marking means building compliance into the development lifecycle rather than treating it as a post-deployment exercise. Technical documentation, risk management systems, data governance practices, and monitoring infrastructure must all be established before the system can receive CE marking. Substantial modifications require reassessment, meaning continuous deployment practices for high-risk AI must include compliance checkpoints.

General-purpose AI models are not subject to CE marking, but they become subject to high-risk requirements when integrated into high-risk AI systems by downstream providers.

## Sources

- European Parliament and Council. (2024). *Regulation (EU) 2024/1689 (EU AI Act)*, Articles 43–48: Conformity Assessment and CE Marking. Official Journal of the European Union. (Primary legal source; defines CE marking requirements, declaration of conformity, and provider responsibilities.)
- European Commission. (2022). *Proposal for a Regulation laying down harmonised rules on Artificial Intelligence (Artificial Intelligence Act)*. COM(2021) 206 final. (Impact assessment and legislative history of the AI Act's conformity framework.)
- European Commission. (2014). *New Legislative Framework*. (The product safety framework the EU AI Act CE marking provisions are modeled on; essential context for understanding conformity assessment.)
