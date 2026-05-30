---
title: "DORA - Digital Operational Resilience Act Framework"
description: "DORA framework for financial services: ICT risk management, incident reporting, digital operational resilience testing, third-party risk management, and information sharing."
date: 2026-03-28
categories: [Frameworks]
tags: [dora, financial-services, cybersecurity, ict-risk, compliance, regulation, eu]
related:
  - guides/dora-compliance-guide
  - glossary/dora
  - comparisons/nis2-vs-dora
  - frameworks/nis2-compliance-framework
  - frameworks/gdpr-ai-framework
  - guides/ai-regulatory-compliance-checklist
last_updated: 2026-05-30
---

The Digital Operational Resilience Act (Regulation 2022/2554) is an EU regulation that strengthens the digital resilience of financial entities. DORA entered into application on 17 January 2025 and applies to 20 types of financial entities and their ICT third-party service providers. It harmonizes ICT risk management rules across the financial sector, replacing fragmented national approaches with a single EU-wide framework.

## Scope

DORA applies to banks and credit institutions, investment firms, insurance and reinsurance undertakings, payment institutions, electronic money institutions, crypto-asset service providers, central securities depositories, central counterparties, trading venues, trade repositories, managers of alternative investment funds and UCITS, crowdfunding service providers, and ICT third-party service providers serving financial entities.

The regulation applies regardless of entity size, though proportionality principles allow smaller entities to implement simpler measures.

## Five Pillars of DORA

### Pillar 1: ICT Risk Management

Chapter II requires financial entities to establish a comprehensive ICT risk management framework. This framework must include strategies, policies, and procedures to protect all ICT assets and infrastructure, identify and classify ICT-supported business functions and assets, continuously monitor ICT risks and threats, implement protection and prevention measures, establish detection mechanisms for anomalous activities, and maintain response and recovery plans.

The ICT risk management framework must be documented, reviewed at least annually, and improved based on lessons learned from incidents and testing. The management body is directly responsible for defining and approving the framework, overseeing its implementation, and allocating sufficient budget and resources.

### Pillar 2: ICT-Related Incident Management and Reporting

Chapter III establishes a standardized incident classification and reporting process. Financial entities must classify ICT-related incidents using criteria defined in regulatory technical standards, including the number of clients affected, duration, geographic spread, data losses, criticality of services affected, and economic impact.

Major incident reporting follows a structured timeline. An initial notification must be submitted within 4 hours of classifying an incident as major (and no later than 24 hours from awareness). An intermediate report is due within 72 hours with updated information. A final report is due within one month containing root cause analysis, actual impact assessment, and remedial actions.

### Pillar 3: Digital Operational Resilience Testing

Chapter IV requires financial entities to establish and maintain a digital operational resilience testing program. This includes regular testing of ICT systems at least annually, covering vulnerability assessments and scans, open-source analysis, network security assessments, gap analyses, physical security reviews, and source code reviews where feasible.

Significant financial entities must conduct threat-led penetration testing (TLPT) at least every three years. TLPT must cover critical and important functions, be performed on live production systems, and follow recognized frameworks such as TIBER-EU.

### Pillar 4: ICT Third-Party Risk Management

Chapter V addresses the management of ICT third-party risk. Financial entities must maintain a register of all contractual arrangements with ICT third-party service providers, conduct due diligence before engaging providers, include mandatory contractual provisions covering security, data access, audit rights, and exit strategies, and monitor ICT third-party risk on an ongoing basis.

The regulation introduces an EU-level oversight framework for critical ICT third-party providers (CTPPs). The European Supervisory Authorities (ESAs) designate CTPPs based on the systemic importance of the financial entities they serve, the degree of reliance on the provider, and the substitutability of the provider. CTPPs are subject to direct oversight by a Lead Overseer, which can issue recommendations, request remediation plans, and levy fines of up to 1% of average daily worldwide turnover.

### Pillar 5: Information Sharing

Chapter VI encourages financial entities to exchange cyber threat intelligence with other financial entities and relevant authorities. Participation is voluntary, but entities must establish arrangements to protect sensitive information shared within trusted communities.

## DORA and AI in Financial Services

AI systems used in financial services fall squarely within DORA's scope. AI-powered credit scoring, algorithmic trading, fraud detection, and customer onboarding all rely on ICT systems that must meet DORA's resilience requirements. Specific implications include that AI models are ICT assets that must be inventoried and risk-assessed, AI-related incidents (model failures, adversarial attacks, data corruption) must be reported under the incident management framework, AI vendors and cloud providers hosting AI workloads are ICT third-party providers subject to DORA's third-party risk requirements, and AI systems must be included in resilience testing programs.

Financial entities using AI must also consider the intersection with the EU AI Act, which imposes additional risk classification and transparency requirements on AI systems used in high-risk financial use cases.

## Penalties

DORA allows member states to set penalties. Financial penalties can reach up to 2% of total annual turnover for financial entities and up to 1% of average daily worldwide turnover for ICT third-party providers. Non-financial penalties include public statements, remediation orders, and withdrawal of authorizations.

## Implementation Status

DORA entered into application on 17 January 2025. The ESAs began collecting Registers of Information from competent authorities by 30 April 2025 to identify CTPPs. Criticality assessments and CTPP designations were completed by July 2025. Financial entities should now have their ICT risk management frameworks, incident reporting processes, and third-party risk management arrangements fully operational.
