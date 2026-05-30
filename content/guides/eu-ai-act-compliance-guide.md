---
title: "EU AI Act Compliance Guide"
description: "Practical steps for achieving compliance with the EU AI Act, covering risk classification, conformity assessment, documentation, and organizational readiness."
date: 2026-03-28
categories: [Guides]
tags: [eu-ai-act, compliance, regulation, risk-classification, governance, documentation]
related:
  - frameworks/eu-ai-act-risk-framework
  - glossary/ai-literacy
  - glossary/responsible-ai
  - glossary/model-card
  - guides/ai-regulatory-compliance-checklist
  - guides/ai-audit-readiness
last_updated: 2026-05-30
---

The EU AI Act (Regulation (EU) 2024/1689) is the first comprehensive legal framework for artificial intelligence. It entered into force on August 1, 2024, with obligations phased in between February 2025 and August 2027. This guide provides practical steps for organizations that need to comply.

## Timeline

**February 2, 2025** - Prohibitions on unacceptable-risk AI practices take effect. Bans on social scoring, real-time biometric identification in public spaces (with exceptions), and manipulative AI systems.

**August 2, 2025** - Obligations for general-purpose AI (GPAI) models take effect. Providers of GPAI models must comply with transparency and documentation requirements.

**August 2, 2026** - Obligations for high-risk AI systems take effect. This is the most impactful deadline for most organizations.

**August 2, 2027** - Obligations for high-risk AI systems embedded in products covered by existing EU harmonized legislation (medical devices, machinery, vehicles) take effect.

## Step 1: Inventory Your AI Systems

Create a complete inventory of all AI systems your organization develops, deploys, or uses. For each system, document its purpose, the decisions it makes or influences, the data it processes, and who is affected by its outputs. Include systems built with third-party APIs -- if you use an LLM to influence business decisions, that is an AI system under the Act.

## Step 2: Classify Risk

The EU AI Act defines four risk categories. Map each system in your inventory to a category.

**Unacceptable risk** - Prohibited practices including social scoring, manipulative techniques targeting vulnerabilities, and certain biometric identification uses. If any of your systems fall here, they must be discontinued.

**High risk** - AI systems listed in Annex III (biometric identification, critical infrastructure management, education access, employment decisions, creditworthiness assessment, law enforcement, migration management) or AI systems used as safety components of products covered by EU harmonized legislation. High-risk systems face the full set of compliance obligations.

**Limited risk** - AI systems with specific transparency obligations, primarily chatbots and deepfake generators. Users must be informed they are interacting with AI or viewing AI-generated content.

**Minimal risk** - Everything else. No specific obligations beyond voluntary codes of conduct.

## Step 3: Implement High-Risk System Requirements

For each high-risk AI system, implement the following:

**Risk management system** - Establish a continuous risk management process that identifies, analyzes, evaluates, and mitigates risks throughout the AI system lifecycle. Document residual risks and the measures taken to address them.

**Data governance** - Ensure training, validation, and testing datasets are relevant, representative, and free from errors to the extent possible. Document data provenance, preprocessing, and any known limitations.

**Technical documentation** - Maintain comprehensive documentation covering system design, development process, capabilities, limitations, performance metrics, and intended use. This documentation must be sufficient for authorities to assess compliance.

**Record keeping** - Implement automatic logging of events relevant to the system's functioning, including inputs, outputs, and system actions. Logs must be retained for a period appropriate to the system's intended purpose.

**Transparency** - Provide clear instructions for use to deployers, including the system's intended purpose, level of accuracy, and known risks. Users must be informed when they are subject to decisions made by high-risk AI systems.

**Human oversight** - Design the system to allow effective human oversight. Humans must be able to understand the system's capabilities and limitations, monitor its operation, and intervene or override its outputs.

**Accuracy, robustness, and cybersecurity** - Achieve appropriate levels of accuracy and robustness for the system's intended purpose. Implement cybersecurity measures to protect against attacks that could manipulate the system.

## Step 4: AI Literacy

Article 4 requires that staff involved in AI development and deployment have adequate AI literacy. Implement role-specific training programs and document completion records.

## Step 5: Establish Governance

Designate responsibility for AI Act compliance within your organization. Establish review processes for new AI use cases, monitoring procedures for deployed systems, and incident response procedures for AI-related issues. Consider establishing an AI ethics board to provide structured oversight.

## Step 6: Prepare for Conformity Assessment

High-risk AI systems require conformity assessment before being placed on the market. For most systems, this is a self-assessment based on internal checks. For biometric identification systems, an independent third-party assessment is required. Build the conformity assessment process into your deployment pipeline so it becomes a standard gate rather than a last-minute exercise.
