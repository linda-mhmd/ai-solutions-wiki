---
title: "Automated Decision-Making"
description: "The legal framework under GDPR Article 22 governing decisions made solely by automated systems, including AI, that produce legal or significant effects on individuals."
date: 2026-03-28
categories: [Glossary]
tags: [automated-decision-making, gdpr, ai-ethics, regulation, transparency, compliance]
related:
  - glossary/right-to-explanation
  - glossary/gdpr
  - glossary/dpia
  - frameworks/gdpr-ai-framework
  - guides/gdpr-for-ai-teams
  - patterns/human-in-the-loop
last_updated: 2026-05-30
---

Automated decision-making (ADM) refers to decisions made by technological means without human involvement. Under GDPR Article 22, individuals have the right not to be subject to decisions based solely on automated processing, including profiling, that produce legal effects concerning them or similarly significantly affect them. This provision has become one of the most important regulatory constraints on AI deployment in the EU.

## Scope of Article 22

Article 22 applies when three conditions are met: the decision is based solely on automated processing (no meaningful human intervention), the processing includes profiling or other automated evaluation, and the decision produces legal effects (such as denial of a loan) or similarly significantly affects the individual (such as determining insurance premiums or employment eligibility).

## Exceptions

Automated decision-making is permitted in three circumstances: when it is necessary for entering into or performing a contract, when it is authorized by EU or member state law, or when it is based on the data subject's explicit consent. Even when an exception applies, organizations must implement suitable safeguards.

## Safeguards

Required safeguards include the right to obtain human intervention from the controller, the right to express one's point of view, and the right to contest the decision. Organizations must also provide meaningful information about the logic involved and the significance and envisaged consequences of the processing. Special category data (race, health, political opinions) cannot be used for automated decision-making unless explicit consent is given or substantial public interest justifies it.

## Practical Impact on AI Systems

Many AI deployments technically fall under Article 22's restrictions. Credit scoring systems, automated recruitment tools, insurance pricing algorithms, and welfare eligibility assessments all make decisions that significantly affect individuals. Organizations must either ensure meaningful human review of AI-generated recommendations (making the decision not solely automated) or rely on one of the exceptions with appropriate safeguards.

The definition of "meaningful human intervention" is critical. A human who rubber-stamps every AI recommendation without genuine review does not constitute meaningful intervention. The human reviewer must have the authority and competence to override the automated decision and must actually exercise independent judgment.

## Sources

- European Parliament and Council. (2016). *Regulation (EU) 2016/679 (GDPR)*, Article 22: Automated individual decision-making, including profiling. Official Journal of the European Union.
- Article 29 Working Party. (2018). *Guidelines on Automated Individual Decision-Making and Profiling*. WP251rev.01. (Authoritative guidance on GDPR Article 22 scope and interpretation.)
- Wachter, S., Mittelstadt, B., & Russell, C. (2017). Counterfactual explanations without opening the black box: Automated decisions and the GDPR. *Harvard Journal of Law and Technology, 31*(2). (Analysis of right-to-explanation under GDPR.)
