---
title: "DORA - Digital Operational Resilience Act"
description: "EU regulation requiring financial entities to ensure ICT resilience, covering risk management, incident reporting, testing, and third-party provider oversight for AI systems in finance."
date: 2026-03-28
categories: [Glossary]
tags: [dora, financial-services, regulation, eu, resilience, compliance]
related:
  - guides/dora-compliance-guide
  - comparisons/nis2-vs-dora
  - glossary/nis2
  - glossary/supply-chain-security
last_updated: 2026-05-30
---

The Digital Operational Resilience Act (DORA), formally Regulation (EU) 2022/2554, is an EU regulation that establishes uniform requirements for the security of network and information systems in the financial sector. It applies from January 2025 and covers banks, insurance companies, investment firms, payment providers, crypto-asset service providers, and critically, their ICT third-party service providers.

## Five Pillars

DORA is structured around five core areas:

**ICT Risk Management** - Financial entities must maintain comprehensive ICT risk management frameworks covering identification, protection, detection, response, and recovery. This includes AI systems used for trading, credit scoring, fraud detection, and customer service.

**ICT Incident Reporting** - Major ICT-related incidents must be reported to competent authorities using standardized templates. The regulation defines classification criteria based on the number of affected clients, data losses, geographic spread, and duration.

**Digital Operational Resilience Testing** - Entities must conduct regular testing including vulnerability assessments, penetration testing, and for significant institutions, threat-led penetration testing (TLPT) at least every three years.

**ICT Third-Party Risk Management** - Financial entities must manage risks from ICT service providers, including cloud providers and AI model providers. Contracts must include specific clauses on security, audit rights, and exit strategies.

**Information Sharing** - Voluntary sharing of cyber threat intelligence among financial entities is encouraged and given legal protection.

## AI-Specific Implications

AI systems in financial services are ICT systems under DORA. This means AI models used for credit decisions, algorithmic trading, or fraud detection must be included in the ICT risk management framework, tested for operational resilience, and their third-party dependencies (such as cloud AI APIs) must be contractually governed. Model failures that affect service availability or data integrity are reportable incidents.

## Sources

- European Parliament and Council. (2022). *Regulation (EU) 2022/2554 (DORA)*. Official Journal of the European Union, L 333/1. (The regulation itself; all compliance obligations derive from this primary source.)
- European Banking Authority. (2023). *Joint ESA technical standards under DORA*. (Regulatory technical standards specifying incident classification, testing requirements, and third-party contract clauses.)
- European Systemic Risk Board. (2022). *Systemic cyber risk*. Occasional Paper No. 19. (Analysis of ICT systemic risk in financial services; motivates DORA's requirements for concentrated third-party provider risk.)
