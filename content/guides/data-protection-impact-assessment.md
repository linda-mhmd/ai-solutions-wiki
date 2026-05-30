---
title: "Conducting DPIAs for AI Systems"
description: "Step-by-step guide for conducting Data Protection Impact Assessments for AI and machine learning systems, with templates and practical examples."
date: 2026-03-28
categories: [Guides]
tags: [dpia, gdpr, ai, data-protection, risk-assessment, compliance]
related:
  - glossary/dpia
  - glossary/gdpr
  - glossary/data-controller
  - frameworks/gdpr-ai-framework
  - guides/gdpr-for-ai-teams
  - patterns/gdpr-compliant-ml-pipeline
last_updated: 2026-05-30
---

A DPIA is mandatory under GDPR Article 35 for AI systems that process personal data where the processing is likely to result in high risk to individuals. This guide provides a practical process for conducting DPIAs for AI systems.

## When Is a DPIA Required?

You must conduct a DPIA when your AI system involves systematic and extensive profiling with significant effects on individuals, large-scale processing of special category data (health, biometric, ethnic origin), systematic monitoring of publicly accessible areas, or any processing that appears on your national supervisory authority's list of operations requiring a DPIA. In practice, most AI systems that process personal data for decision-making, profiling, or behavioral analysis require a DPIA.

## Step 1: Describe the Processing

Document the AI system comprehensively. Cover the purpose of the AI system and the business problem it solves, the personal data processed (categories, volume, sources), how data flows through the system (collection, storage, training, inference, output), the lawful basis for processing, who has access to the data and outputs, data retention periods, and any cross-border data transfers.

For AI-specific documentation, also describe the model architecture and type, training data sources and selection criteria, how the model makes decisions, the output format and how outputs are used, whether decisions are fully automated or human-reviewed, and any third-party AI services or models used.

## Step 2: Assess Necessity and Proportionality

Evaluate whether the AI system is necessary for the stated purpose and whether the processing is proportionate. Could you achieve the same goal with less personal data? Could anonymized or synthetic data be used instead? Is the AI system the least privacy-invasive approach to the problem? Are you collecting only the data fields actually needed by the model?

## Step 3: Identify and Assess Risks

Assess risks to individuals across multiple dimensions. **Discrimination risk** - Could the model produce biased outcomes for protected groups? What bias testing has been conducted? **Transparency risk** - Can individuals understand how decisions about them are made? Is the model explainable? **Accuracy risk** - What are the model's error rates? What happens when the model makes incorrect predictions? **Security risk** - Could training data or model outputs be exposed through breaches or model inversion attacks? **Autonomy risk** - Does the system limit individuals' ability to make free choices or exercise their rights?

Rate each risk by likelihood and severity. Consider both the probability of harm and the potential impact on affected individuals.

## Step 4: Identify Mitigation Measures

For each identified risk, document specific mitigation measures. **For discrimination** - Regular bias audits, diverse training data, fairness constraints in model training, monitoring for disparate impact in production. **For transparency** - Explainability mechanisms (SHAP, LIME), user-facing decision explanations, published model cards. **For accuracy** - Confidence thresholds below which human review is required, regular model evaluation, monitoring for drift. **For security** - Encryption, access controls, differential privacy, federated learning, regular penetration testing. **For autonomy** - Human-in-the-loop for significant decisions, easy opt-out mechanisms, accessible complaints process.

## Step 5: Consult Stakeholders

Seek input from your Data Protection Officer, who must be consulted on all DPIAs. Where feasible, consult representatives of affected data subjects. Involve domain experts who understand the real-world impact of AI decisions in your specific context.

## Step 6: Document and Review

Compile the DPIA into a formal document. Include all of the above plus a sign-off from the data controller and DPO's opinion. If residual risks remain high after mitigation, you must consult your supervisory authority before proceeding with the processing.

## Ongoing Review

A DPIA is not a one-time exercise. Review and update it when the AI system is materially modified, when new risks emerge, when the volume or nature of processed data changes significantly, or at regular intervals (annually as a minimum). Integrate DPIA review into your model lifecycle management process.
