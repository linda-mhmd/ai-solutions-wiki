---
title: "GDPR Compliance for AI/ML Teams"
description: "A practical guide for AI and machine learning teams on meeting GDPR requirements across the ML lifecycle, from data collection through model deployment and monitoring."
date: 2026-03-28
categories: [Guides]
tags: [gdpr, ai, machine-learning, data-protection, compliance, practical]
related:
  - frameworks/gdpr-ai-framework
  - glossary/gdpr
  - glossary/dpia
  - glossary/data-controller
  - glossary/data-processor
  - glossary/right-to-explanation
  - glossary/automated-decision-making
  - guides/data-protection-impact-assessment
  - patterns/gdpr-compliant-ml-pipeline
last_updated: 2026-05-30
---

GDPR compliance is not optional for AI teams processing personal data of EU residents. This guide covers the practical steps ML engineers and data scientists need to take at each stage of the ML lifecycle.

## Before You Start: Establish Legal Basis

Every processing activity needs a lawful basis under Article 6. Work with your legal team to determine whether you are relying on consent, legitimate interest, or another basis. Document this decision. If using legitimate interest, complete and document the balancing test. If using consent, ensure it specifically covers AI/ML training use and can be withdrawn.

## Data Collection and Preparation

**Data minimization** - Collect only the personal data fields necessary for your model's purpose. If you can achieve similar model performance without certain personal data fields, remove them. **Purpose limitation** - Training data collected for one purpose cannot be repurposed for a different model without a compatible legal basis. Document the purpose for each dataset. **Special category data** - If your data includes race, health, political opinions, or other special categories, you need explicit consent or another Article 9 basis. This data requires enhanced protection.

**Practical steps:** Maintain a data inventory that maps each training dataset to its lawful basis, retention period, and data subjects. Implement pseudonymization or anonymization where possible. Use data processing agreements with any third-party data providers.

## Model Training

**Data subject rights** - You must be able to respond to access, rectification, and erasure requests. This means knowing which data subjects are in your training data and having a process to handle requests. For erasure, you may need to retrain the model if removing the data materially affects it. **Transparency** - Document your training process, including data sources, preprocessing steps, and model architecture choices. This documentation supports your accountability obligations and any future DPIA.

**Practical steps:** Version your training data so you can identify what was used for each model version. Implement data lineage tracking. Build tooling to search your training data for specific individuals. Consider privacy-preserving techniques like differential privacy or federated learning.

## Model Deployment

**Automated decision-making** - If your model makes decisions with legal or significant effects on individuals (credit scoring, hiring, insurance pricing), Article 22 applies. Either ensure meaningful human review of decisions or establish one of the permitted exceptions with appropriate safeguards. **Right to explanation** - Implement explainability mechanisms so you can provide meaningful information about decision logic. This does not mean revealing your algorithm, but you must explain the key factors and general logic.

**Practical steps:** Implement SHAP or LIME for feature importance explanations. Build a process for human review of automated decisions. Create user-facing explanations appropriate for your audience. Log decisions and the factors that influenced them.

## Ongoing Monitoring

**Data Protection Impact Assessment** - Conduct a DPIA before deploying any AI system that processes personal data at scale or for profiling. Review and update the DPIA when the system changes materially. **Breach notification** - Have a process to detect and report data breaches within 72 hours. AI systems that ingest personal data are potential breach vectors. **Model drift** - If your model drifts from its original purpose or starts making decisions outside its intended scope, this may constitute new processing requiring a new legal basis assessment.

**Practical steps:** Schedule regular DPIA reviews. Monitor model behavior for drift. Implement access controls on training data and model artifacts. Train your team on data subject rights request handling.

## Cross-Border Considerations

If your training data originates from multiple EU member states, or if you transfer data outside the EU for cloud-based training, you need appropriate transfer mechanisms (Standard Contractual Clauses, adequacy decisions, or Binding Corporate Rules). Ensure your cloud provider's data processing agreement covers AI workloads specifically.

## Common Pitfalls

Using web-scraped personal data without a lawful basis. Assuming anonymization when the data is merely pseudonymized. Failing to document the legal basis before starting data collection. Treating model retraining as the same processing activity when the purpose has changed. Not having a process for erasure requests that may require model retraining.
