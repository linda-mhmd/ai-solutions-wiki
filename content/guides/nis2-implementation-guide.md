---
title: "NIS2 Implementation Guide"
description: "Step-by-step guide for implementing NIS2 Directive compliance, covering risk assessment, security measures, incident reporting, and supply chain management for organizations with AI systems."
date: 2026-03-28
categories: [Guides]
tags: [nis2, cybersecurity, compliance, implementation, eu, critical-infrastructure]
related:
  - glossary/nis2
  - glossary/supply-chain-security
  - frameworks/nis2-compliance-framework
  - comparisons/nis2-vs-dora
  - comparisons/iso-27001-vs-nis2
  - guides/ai-security-best-practices
last_updated: 2026-05-30
---

NIS2 requires essential and important entities to implement cybersecurity risk management measures. This guide walks through the implementation steps, with particular attention to AI systems within scope.

## Step 1: Determine If You Are In Scope

Check whether your organization falls under NIS2's essential or important entity categories. Essential entities include energy, transport, banking, health, water, digital infrastructure, ICT service management, public administration, and space. Important entities include postal, waste, chemicals, food, manufacturing, digital providers, and research. Medium and large organizations in these sectors are automatically in scope. Check your national transposition law for any extensions to smaller entities.

## Step 2: Assign Management Accountability

NIS2 requires management bodies to approve cybersecurity risk management measures and oversee their implementation. Senior management can be held personally liable for non-compliance. Appoint a responsible executive, ensure the board receives regular cybersecurity briefings, and require management to undergo cybersecurity training.

## Step 3: Conduct a Risk Assessment

Perform a comprehensive risk assessment covering all ICT systems, including AI components. Identify threats specific to your sector and AI deployments: model poisoning, adversarial attacks, data pipeline compromise, and AI service provider outages. Assess the impact of each risk on service continuity and data integrity. Prioritize risks based on likelihood and impact.

## Step 4: Implement Risk Management Measures

NIS2 Article 21 requires measures in ten specific areas:

**Risk analysis and information security policies** - Document and maintain policies covering all ICT systems including AI. **Incident handling** - Establish detection, response, and recovery procedures for cybersecurity incidents affecting AI systems. **Business continuity and crisis management** - Ensure AI-dependent services have fallback procedures when AI components fail. **Supply chain security** - Assess the security practices of AI model providers, cloud services, and data suppliers. **Security in network and information systems acquisition, development, and maintenance** - Apply secure development practices to AI systems. **Vulnerability handling and disclosure** - Monitor for and patch vulnerabilities in AI frameworks, libraries, and infrastructure. **Cybersecurity risk assessment effectiveness** - Regularly test and audit your risk management measures. **Cybersecurity hygiene and training** - Train staff on AI-specific security risks. **Cryptography and encryption** - Encrypt data at rest and in transit, including training data and model artifacts. **Access control and asset management** - Implement least-privilege access to AI systems, training data, and model registries.

## Step 5: Establish Incident Reporting

Set up processes to meet NIS2's reporting timeline: early warning within 24 hours, incident notification within 72 hours, and final report within one month. For AI systems, define what constitutes a significant incident: model compromise, training data breach, AI service outage affecting critical functions, or adversarial attack detection. Pre-draft reporting templates and establish communication channels with your national CSIRT.

## Step 6: Address Supply Chain Security

Map your AI supply chain: foundation model providers, cloud infrastructure, open-source libraries, data providers, and MLOps tools. For each critical supplier, assess their security posture, establish contractual security requirements, and define incident notification obligations. Monitor for supply chain compromises such as backdoored models or compromised packages.

## Step 7: Test and Validate

Conduct regular security testing including vulnerability assessments of AI infrastructure, penetration testing of AI-facing APIs, adversarial testing of AI models, and tabletop exercises for AI-related incident scenarios. Document results and track remediation of findings.

## Step 8: Maintain and Improve

NIS2 compliance is ongoing. Review risk assessments when AI systems change. Update incident response procedures based on lessons learned. Monitor regulatory guidance from your national authority for sector-specific expectations. Keep management informed of the cybersecurity posture and emerging AI-specific threats.
