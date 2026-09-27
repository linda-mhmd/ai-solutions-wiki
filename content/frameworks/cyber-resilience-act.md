---
title: "EU Cyber Resilience Act"
description: "Overview of the EU Cyber Resilience Act and its implications for AI products, covering security requirements, vulnerability handling, and compliance obligations for products with digital elements."
date: 2026-03-28
categories: [Frameworks]
tags: [cyber-resilience-act, eu, cybersecurity, regulation, compliance, product-security]
related:
  - glossary/nis2
  - glossary/supply-chain-security
  - frameworks/ai-regulatory-landscape
  - glossary/ce-marking-ai
  - glossary/conformity-assessment
last_updated: 2026-09-25
lastmod: 2026-09-25
last_verified: 2026-09-25
---

The Cyber Resilience Act (CRA), Regulation (EU) 2024/2847, establishes mandatory cybersecurity requirements for products with digital elements sold in the EU market. It entered into force on 10 December 2024 and applies in stages: provisions on conformity assessment bodies from 11 June 2026, the manufacturer reporting obligations for actively exploited vulnerabilities and severe incidents from **11 September 2026** (now in effect), and the remaining obligations from 11 December 2027. The CRA is the first EU-wide horizontal legislation imposing cybersecurity requirements on hardware and software products, including AI systems distributed as products.

## Scope and Relevance to AI

The CRA applies to products with digital elements, defined as any software or hardware product and its remote data processing solutions. This includes AI software products sold or distributed in the EU: on-premises AI applications, AI-enabled devices (edge AI hardware), software libraries and frameworks used in products, and AI components integrated into larger products. Open-source software developed in a non-commercial context is generally excluded, but open-source AI models that are commercialized fall within scope.

## Essential Cybersecurity Requirements

Products must be designed, developed, and produced to ensure an appropriate level of cybersecurity. Specific requirements include delivering products without known exploitable vulnerabilities, implementing security by default configuration, protecting the confidentiality and integrity of data (including training data for AI products), minimizing the attack surface, and ensuring that security updates can be delivered throughout the product's support period.

## Vulnerability Handling

Manufacturers must establish and maintain a coordinated vulnerability disclosure policy, document and address vulnerabilities without delay, provide security updates free of charge for the support period (minimum 5 years or the expected product lifetime), and report actively exploited vulnerabilities and severe incidents through ENISA's single reporting platform to the designated national CSIRT and ENISA, with an early warning within 24 hours. This reporting duty has applied since 11 September 2026, including for products already on the market.

For AI products, this means monitoring for AI-specific vulnerabilities (adversarial inputs, model extraction attacks, data poisoning) and having processes to address them. Security updates for AI products may include model updates, guardrail improvements, or patches to inference infrastructure.

## Product Classification

The CRA classifies products into default, important (Class I and Class II), and critical categories based on their cybersecurity risk. Class II and critical products require third-party conformity assessment; Class I products can self-assess only if they fully apply harmonised standards or common specifications. Default products can use self-assessment. AI products used in critical infrastructure, security functions, or safety-relevant applications are likely to fall into higher categories requiring third-party assessment.

## Software Bill of Materials

Manufacturers must create and maintain a Software Bill of Materials (SBOM) for each product. For AI products, this should include ML framework versions, model dependencies, data processing libraries, and any pre-trained model components. The SBOM must be provided to market surveillance authorities on request.

## Relationship with Other Regulations

The CRA complements NIS2 (which covers the organizations using the products) and the EU AI Act (which covers the AI-specific requirements). A product that is both a product with digital elements (CRA) and a high-risk AI system (EU AI Act) must meet the requirements of both. The CRA's cybersecurity requirements and the EU AI Act's cybersecurity requirements for high-risk AI are aligned to avoid contradiction, but manufacturers must verify compliance with both.

## Practical Implications

AI product companies must integrate security into the development lifecycle (security by design), establish vulnerability monitoring and response processes, create and maintain SBOMs, plan for long-term security support including AI-specific updates, and prepare for conformity assessment appropriate to their product's classification. These requirements apply to the product as placed on the market, so both the initial release and all subsequent updates must maintain compliance.

## Sources

1. European Commission, "Cyber Resilience Act – Summary": [https://digital-strategy.ec.europa.eu/en/policies/cra-summary](https://digital-strategy.ec.europa.eu/en/policies/cra-summary)
2. Regulation (EU) 2024/2847, EUR-Lex: [https://eur-lex.europa.eu/eli/reg/2024/2847/oj/eng](https://eur-lex.europa.eu/eli/reg/2024/2847/oj/eng)
