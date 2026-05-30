---
title: "DPIA - Data Protection Impact Assessment"
description: "A structured process required under GDPR Article 35 to identify and mitigate data protection risks in high-risk processing, including most AI systems that handle personal data."
date: 2026-03-28
categories: [Glossary]
tags: [dpia, gdpr, data-protection, risk-assessment, compliance, privacy]
related:
  - guides/data-protection-impact-assessment
  - frameworks/gdpr-ai-framework
  - glossary/gdpr
  - glossary/data-controller
  - glossary/automated-decision-making
last_updated: 2026-05-30
---

A Data Protection Impact Assessment (DPIA) is a process mandated by Article 35 of GDPR that requires organizations to assess the impact of data processing activities on the privacy of individuals before the processing begins. DPIAs are mandatory when processing is likely to result in a high risk to the rights and freedoms of natural persons.

## When a DPIA Is Required

GDPR specifies that a DPIA is required for systematic and extensive profiling with significant effects, large-scale processing of special category data, and systematic monitoring of publicly accessible areas. National supervisory authorities publish additional lists of processing operations that require DPIAs. For AI systems, a DPIA is almost always required when the system processes personal data for profiling, automated decision-making, or behavioral analysis.

## What a DPIA Must Contain

A DPIA must include a systematic description of the processing operations and their purposes, an assessment of the necessity and proportionality of the processing, an assessment of risks to individuals' rights and freedoms, and the measures planned to address those risks. For AI systems, this means documenting the training data sources, model architecture decisions that affect privacy, data retention policies, and safeguards against discriminatory outcomes.

## Process

The data controller is responsible for conducting the DPIA, though they should seek the advice of the Data Protection Officer (DPO) where one is designated. Where appropriate, the controller should also seek the views of the data subjects or their representatives. If the DPIA indicates that the processing would result in high risk that cannot be mitigated, the controller must consult the supervisory authority before proceeding.

## AI-Specific Considerations

AI systems present unique DPIA challenges. Training data may contain biases that lead to discriminatory outcomes. Model opacity makes it difficult to explain decisions to data subjects. Continuous learning systems may drift from their original processing purpose. A thorough DPIA for AI should address data provenance, bias testing results, explainability mechanisms, and ongoing monitoring plans.

## Sources

- European Parliament and Council. (2016). *Regulation (EU) 2016/679 (GDPR)*, Article 35: Data Protection Impact Assessment. Official Journal of the European Union. (Primary legal source; defines the mandatory DPIA requirement and minimum content.)
- Article 29 Working Party. (2017). *Guidelines on Data Protection Impact Assessment (DPIA)*. WP248rev.01. (Authoritative supervisory authority guidance on when DPIAs are required and how to conduct them.)
- Information Commissioner's Office. (2021). *Data Protection Impact Assessments for AI*. ICO. (Practical regulator guidance specifically addressing DPIA requirements for machine learning systems.)
