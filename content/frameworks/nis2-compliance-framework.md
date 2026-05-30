---
title: "NIS2 Directive Compliance Framework"
description: "NIS2 Directive cybersecurity requirements for essential and important entities: risk management, incident reporting, supply chain security, board accountability, and penalties."
date: 2026-03-28
categories: [Frameworks]
tags: [nis2, cybersecurity, compliance, regulation, eu, incident-reporting, supply-chain]
related:
  - guides/nis2-implementation-guide
  - glossary/nis2
  - glossary/essential-entity-nis2
  - glossary/supply-chain-security
  - comparisons/nis2-vs-dora
  - comparisons/iso-27001-vs-nis2
  - frameworks/dora-framework
  - frameworks/cyber-resilience-act
last_updated: 2026-05-30
---

The NIS2 Directive (Directive 2022/2555) is the EU's updated cybersecurity legislation that replaced the original NIS Directive. It establishes a unified legal framework for cybersecurity across 18 critical sectors and applies to essential and important entities operating in the EU. Member states were required to transpose NIS2 into national law by 17 October 2024, and enforcement is now active across the EU.

## Scope: Essential and Important Entities

NIS2 significantly expanded the scope of the original directive. Essential entities include organizations in sectors such as energy, transport, banking, financial market infrastructure, health, drinking water, wastewater, digital infrastructure, ICT service management, public administration, and space. Important entities include postal services, waste management, chemicals, food, manufacturing, digital providers, and research organizations.

The classification depends on sector and size. Generally, medium-sized enterprises (50+ employees or 10M+ euro turnover) and large enterprises in covered sectors fall within scope. Some entities are classified as essential regardless of size, including DNS service providers, top-level domain name registries, and providers of public electronic communications networks.

## Core Requirements

### Risk Management Measures

Article 21 requires entities to take appropriate and proportionate technical, organizational, and operational measures to manage risks to the security of network and information systems. These measures must include risk analysis and information system security policies, incident handling procedures, business continuity and crisis management, supply chain security, security in network and information system acquisition and development, policies for assessing the effectiveness of cybersecurity measures, cyber hygiene practices and cybersecurity training, cryptography and encryption policies, human resources security and access control, and multi-factor authentication and secured communications.

The measures must be proportionate to the risk, taking into account the state of the art, relevant standards, the cost of implementation, and the size and nature of the entity.

### Incident Reporting

NIS2 introduces a structured incident reporting timeline. Within 24 hours of becoming aware of a significant incident, entities must submit an early warning to the national competent authority or CSIRT. Within 72 hours, a detailed notification is required including an initial assessment of severity, impact, and indicators of compromise. Within one month, a final report must be submitted with a detailed description of the incident, root cause analysis, and remedial actions taken.

A significant incident is one that has caused or is capable of causing severe operational disruption or financial loss, or has affected or is capable of affecting other entities by causing considerable material or non-material damage.

### Supply Chain Security

Article 21(2)(d) specifically addresses supply chain security. Entities must assess and manage cybersecurity risks in their supply chains, including the security of relationships with direct suppliers and service providers. This includes assessing the overall quality of products and cybersecurity practices of suppliers, vulnerability handling procedures, and the results of supply chain risk assessments.

For organizations using AI systems from third-party providers, this means evaluating the cybersecurity posture of AI vendors, cloud providers hosting AI workloads, and data pipeline providers.

### Board Accountability

NIS2 places direct responsibility on senior management. Article 20 requires management bodies of essential and important entities to approve cybersecurity risk management measures, oversee their implementation, and be held liable for non-compliance. Management bodies must also undergo cybersecurity training and offer similar training to employees on a regular basis.

This is a significant shift from the original NIS Directive. Board members and executives can face personal consequences including fines, legal action, or temporary bans from management roles if the organization fails to implement proper cybersecurity measures.

## Penalties

Essential entities face fines of up to 10 million euros or 2% of global annual turnover, whichever is higher. Important entities face fines of up to 7 million euros or 1.4% of global annual turnover. Beyond financial penalties, national authorities can impose temporary suspensions of certifications or authorizations, temporary bans on individuals exercising managerial functions, and mandatory compliance audits.

## 2026 Implementation Status

Most EU member states have now transposed NIS2 into national law. Germany passed the NIS2 Implementation and Cybersecurity Act in November 2025. In January 2026, the European Commission proposed targeted amendments to NIS2 to increase legal clarity and simplify compliance, particularly for smaller entities. The basic structure of NIS2 remains unchanged, but obligations will be more easily verifiable through EU cybersecurity certifications and established standards.

Essential entities face a major deadline on 30 June 2026 to complete their first formal compliance audit. Organizations should have registered on their national portals and established baseline cybersecurity measures well before this date.

## Intersection with AI Systems

AI systems used in essential services fall under NIS2's cybersecurity risk management requirements while simultaneously being subject to the EU AI Act's transparency and risk classification rules. Organizations deploying AI in covered sectors must address both regulatory frameworks, ensuring their AI systems meet NIS2 cybersecurity standards and AI Act compliance requirements simultaneously.
