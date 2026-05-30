---
title: "Right to Explanation"
description: "The right under GDPR Article 22 for individuals to obtain meaningful information about the logic involved in automated decisions that significantly affect them."
date: 2026-03-28
categories: [Glossary]
tags: [gdpr, explainability, automated-decision-making, ai-ethics, regulation, transparency]
related:
  - glossary/automated-decision-making
  - glossary/gdpr
  - frameworks/gdpr-ai-framework
  - guides/ai-transparency-obligations
  - patterns/explainability-pattern
last_updated: 2026-05-30
---

The right to explanation refers to the provisions in GDPR that require organizations to provide meaningful information about the logic, significance, and envisaged consequences of automated decision-making. While GDPR does not use the exact phrase "right to explanation," Articles 13(2)(f), 14(2)(g), 15(1)(h), and 22 collectively establish that individuals must be informed about automated processing and can challenge decisions made without human involvement.

## Legal Basis

Article 22 of GDPR gives individuals the right not to be subject to a decision based solely on automated processing, including profiling, which produces legal effects or similarly significantly affects them. When automated decision-making is permitted (through explicit consent, contract necessity, or EU/member state law), the controller must implement suitable safeguards including the right to obtain human intervention, express their point of view, and contest the decision.

## What Must Be Explained

Organizations must provide "meaningful information about the logic involved" in automated decisions. The European Data Protection Board has clarified that this does not require revealing proprietary algorithms or source code. Instead, organizations should explain the categories of data used, the main factors in the decision, the general logic of the system, and the potential consequences for the individual.

## Challenges for AI Systems

Deep learning models and complex ensemble systems create tension with the right to explanation. These models are often described as "black boxes" where even their developers cannot fully articulate why a specific decision was reached. This has driven investment in explainable AI (XAI) techniques including SHAP values, LIME, attention visualization, and counterfactual explanations.

## Practical Approaches

Organizations typically provide layered explanations: a simple description of the decision factors for the data subject, a more technical explanation available on request, and detailed model documentation for regulators. Feature importance scores, decision trees used as surrogate models, and natural language explanations generated from model outputs are common implementation strategies.

The right to explanation is increasingly relevant as AI systems are used for credit scoring, insurance underwriting, recruitment screening, and public services. Organizations that cannot explain their AI decisions face both regulatory risk and reputational damage.

## Sources

- European Parliament and Council. (2016). *Regulation (EU) 2016/679 (GDPR)*, Articles 13(2)(f), 14(2)(g), 15(1)(h), 22. Official Journal of the European Union. (Primary legal source; the provisions collectively establishing explanation obligations.)
- Goodman, B., & Flaxman, S. (2017). European Union regulations on algorithmic decision-making and a "right to explanation." *AI Magazine, 38*(3), 50–57. (First major paper arguing GDPR creates a right to explanation; launched the academic and policy debate.)
- Wachter, S., Mittelstadt, B., & Russell, C. (2017). Counterfactual explanations without opening the black box: Automated decisions and the GDPR. *Harvard Journal of Law and Technology, 31*(2). (Proposed counterfactual explanations as a GDPR-compliant XAI method; highly cited in both law and ML.)
- Doshi-Velez, F., & Kim, B. (2017). Towards a rigorous science of interpretable machine learning. *arXiv:1702.08608*. (Rigorous framework for evaluating interpretability; informs what constitutes a meaningful explanation.)
