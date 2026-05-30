---
title: "DORA Compliance Guide for Financial AI"
description: "Practical guide for implementing DORA requirements in financial services organizations that deploy AI systems for trading, risk management, fraud detection, and customer service."
date: 2026-03-28
categories: [Guides]
tags: [dora, financial-services, compliance, resilience, ai, regulation]
related:
  - glossary/dora
  - comparisons/nis2-vs-dora
  - glossary/supply-chain-security
  - guides/ai-security-best-practices
  - guides/ai-incident-response
last_updated: 2026-05-30
---

DORA applies to financial entities from January 2025 and covers all ICT systems, including AI. This guide focuses on the specific compliance requirements for AI systems in financial services.

## ICT Risk Management for AI Systems

DORA requires a comprehensive ICT risk management framework. For AI systems, this means documenting all AI components in your ICT asset inventory, classifying AI systems by criticality (a credit scoring model is more critical than a marketing recommendation engine), and assessing risks specific to AI: model drift, adversarial attacks, training data quality degradation, and vendor dependency.

**Practical steps:** Add AI models to your configuration management database. Define risk criteria specific to AI components. Conduct threat modeling for each AI system considering both cybersecurity and operational risks. Establish risk tolerance levels for model performance degradation.

## Incident Reporting for AI

DORA requires reporting major ICT incidents to competent authorities. For AI systems, define what constitutes a major incident. Consider: AI model producing materially incorrect outputs affecting client transactions, training data breach exposing client information, AI service outage affecting critical business functions, or detection of an adversarial attack against a production model.

**Practical steps:** Establish monitoring that can detect AI-specific incidents (output quality degradation, anomalous input patterns, unexpected model behavior). Map AI incidents to DORA's classification criteria (affected clients, data losses, duration, geographic spread). Pre-draft incident reports for common AI failure scenarios.

## Digital Operational Resilience Testing

DORA requires regular testing including vulnerability assessments, scenario-based testing, and for significant institutions, threat-led penetration testing (TLPT). AI systems must be included in the testing scope.

**Practical steps:** Include AI infrastructure in vulnerability scanning. Conduct penetration testing against AI-facing APIs and model serving endpoints. Test AI model robustness against adversarial inputs as part of scenario-based testing. For TLPT, include AI-specific attack scenarios such as model extraction, data poisoning, and prompt injection. Test business continuity procedures for AI service outages, including fallback to manual processes or alternative models.

## ICT Third-Party Risk Management

DORA places significant requirements on managing third-party ICT providers, including AI service providers. If you use external LLM APIs, cloud-hosted ML platforms, or third-party AI models, these relationships fall under DORA's third-party risk management requirements.

**Practical steps:** Register all AI-related ICT third-party providers. Ensure contracts include provisions for audit rights, security requirements, incident notification, data location, and exit strategies. Assess concentration risk if multiple critical AI functions depend on the same provider. Maintain exit strategies that include the ability to switch AI providers or bring capabilities in-house. Monitor the European Supervisory Authorities' designation of critical ICT third-party providers.

## Information Sharing

DORA encourages sharing of cyber threat intelligence. Participate in financial sector information sharing and analysis centers (ISACs) and share intelligence on AI-specific threats such as new adversarial attack techniques, model vulnerabilities, and supply chain compromises affecting financial AI systems.

## Governance Requirements

Ensure the management body approves and oversees the ICT risk management framework including AI components. Management must understand AI-specific risks at a sufficient level to make informed governance decisions. Include AI risk metrics in board reporting. Assign clear ownership for AI operational resilience within the organization.
