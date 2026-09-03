---
title: "AI Transparency Obligations Across EU Regulations"
description: "Guide to transparency requirements for AI systems under the EU AI Act, GDPR, and related regulations, covering disclosure, explainability, and documentation obligations."
date: 2026-03-28
categories: [Guides]
tags: [transparency, eu-ai-act, gdpr, explainability, regulation, compliance]
related:
  - glossary/right-to-explanation
  - glossary/automated-decision-making
  - glossary/conformity-assessment
  - frameworks/eu-ai-act-risk-framework
  - frameworks/gdpr-ai-framework
  - guides/eu-ai-act-compliance
last_updated: 2026-09-03
lastmod: 2026-09-03
---

Transparency is a cross-cutting requirement across multiple EU regulations affecting AI. This guide consolidates transparency obligations from the EU AI Act, GDPR, and related frameworks to help organizations build comprehensive transparency practices.

## EU AI Act Transparency Requirements

The EU AI Act imposes transparency obligations at multiple levels.

**All AI systems interacting with humans** must disclose that the user is interacting with an AI system, unless this is obvious from the context. This applies to chatbots, voice assistants, and any system where a user might reasonably believe they are interacting with a human.

**AI-generated content** - Systems that generate synthetic audio, image, video, or text must mark outputs as artificially generated in a machine-readable format. Deepfakes must be disclosed. Exceptions exist for content that is obviously artistic or satirical.

**High-risk AI systems** carry the most extensive transparency obligations. Providers must supply deployers with clear instructions for use covering the system's intended purpose, known limitations, accuracy metrics, and conditions that may affect performance. Deployers must inform individuals that they are subject to a high-risk AI system and provide meaningful information about the decision.

**General-purpose AI models** require providers to publish a sufficiently detailed summary of the training data content.

## Training Data Transparency Under the EU AI Act

Article 53(1)(d) of Regulation (EU) 2024/1689 (the AI Act) obligates every provider of a general-purpose AI (GPAI) model to draw up and make publicly available a "sufficiently detailed summary" of the content used to train the model, following a template drawn up by the AI Office [1]. This duty sits inside the wider set of GPAI provider obligations in Articles 51-56, which have applied since 2 August 2025 [1][3].

**The template.** The Commission published the mandatory template on 24 July 2025 [2]. It asks providers to disclose, in structured form [2][4]:

| Template covers | What it requires |
|---|---|
| Modality | Text, image, audio, video, and other content types used in training |
| Scale | Size bands rather than exact dataset sizes |
| Languages | Languages represented in the training content |
| Collection period | The time window over which the content was gathered |
| Major datasets | Identifiers for the main public datasets used |
| Web crawling | Specifications and purpose of crawlers used, including a summary of the domains scraped |
| Licensed data | Whether commercially licensed data was used |
| TDM opt-outs | How text-and-data-mining opt-outs under the Copyright Directive were honored |

**Update cadence.** Providers must refresh the summary at least every six months, or sooner following a material change such as further training [4][5].

**Deadline for models already on the market.** GPAI models placed on the market before 2 August 2025 have until 2 August 2027 to publish a compliant summary, under the transitional rule in Article 111(3) [1][3].

**No open-source carve-out.** Article 53(2) exempts GPAI models released under free and open-source licenses from the technical-documentation duties in Article 53(1)(a) and (b) — it does not extend to the training-data summary in 53(1)(d), which applies to every GPAI model regardless of license [4][5]. An open-weights model with a full training-data summary published and a closed-weights model that has published nothing are both possible outcomes; the license attached to the weights says nothing about compliance with this specific obligation.

**Flag gaps rather than leaving them blank.** Where a provider genuinely cannot obtain information the template asks for, or could only obtain it at unreasonable cost, the provider is expected to say so explicitly in the summary after a documented good-faith effort, rather than leaving the field empty [5].

### Provider Disclosure vs. Evaluator Need

Article 53(1)(d) places the disclosure duty on the party that trained the model and is placing it on the EU market — the provider. It does not create a parallel duty, or a parallel need, for someone downstream who is deciding whether to use that model.

**Evaluating a model for fit requires none of this.** Benchmarking a proprietary model's behavior against your own test set — comparing accuracy, latency, refusal behavior, or task performance the way described in [Benchmarking a Fine-Tuned Model Against Its Lineage](/guides/benchmarking-a-finetuned-model-against-its-lineage/) — is black-box evaluation. It measures observed outputs against your own golden dataset and eval harness, and it works the same way whether or not the provider has published a training-data summary. Article 53(1)(d) visibility is not a precondition for this kind of assessment.

Training-data visibility becomes relevant to you in two specific, and different, situations — easy to conflate, worth keeping apart:

1. **Fine-tuning can make you a GPAI provider.** The Commission's GPAI Guidelines set out an indicative criterion: a downstream actor that significantly modifies an existing GPAI model — for example through further training or fine-tuning — is treated as the provider of a new model once the compute used for the modification exceeds one-third of the compute used to train the original model. Where the original model's own training compute isn't known, the Guidelines substitute one-third of whichever presumption threshold applies to it instead: one-third of 10²⁵ FLOPs if the original model is itself presumed to carry systemic risk, or one-third of 10²³ FLOPs (the general GPAI-model presumption) otherwise [6][7]. Recital 109 covers a related but separate point: once a modification does trigger provider status, the resulting obligations are limited to the modification itself rather than the full base model — the recital doesn't state the one-third figure. Crossing the compute threshold pulls the modification into Article 53, including a training-data summary obligation of its own. Below the threshold, no new-provider obligations attach for the modification. Published Commission guidance does not spell out with certainty whether a fine-tuner's summary need only cover the fine-tuning data or must also restate the base model's original corpus — treat that scoping question as open rather than settled. See [LoRA and QLoRA](/glossary/lora/) and the [fine-tuning guide](/guides/fine-tuning-llms-guide/) for how much of a model's weights a given fine-tuning run actually touches, which is relevant context for judging where a project sits against that compute threshold.
2. **Annex III high-risk data governance is a different Article entirely.** If you deploy a high-risk AI system under Annex III (biometric identification, employment, credit scoring, and similar categories), Article 10's data-governance duties apply to your own training, validation, and testing datasets for that deployed system — not to a foundation model's original training corpus, and not under Article 53 [8]. Following the Digital Omnibus (Regulation (EU) 2026/1744), these Annex III duties now apply from 2 December 2027, deferred from the original 2 August 2026 date; see [EU AI Act Enforcement Begins](/news/eu-ai-act-enforcement-begins-2026/) for the full deferral timeline [9]. Treat Article 53 (what a GPAI provider discloses about its own training data) and Article 10 (what you must govern about your own deployed system's data) as separate obligations covering separate data — satisfying one does not address the other.

For the combined compliance timeline across both tracks, see [EU AI Act Compliance Checklist](/guides/eu-ai-act-compliance-checklist/).

## GDPR Transparency Requirements

GDPR Articles 13 and 14 require that data subjects be informed about automated decision-making, including meaningful information about the logic involved, the significance, and the envisaged consequences. Article 22 adds the right to human intervention, the right to express a point of view, and the right to contest automated decisions.

In practice, this means providing layered explanations: a concise notice at the point of data collection, a more detailed privacy notice explaining the AI processing, and the ability to request a specific explanation of an individual decision.

## Practical Implementation

**User-facing disclosure** - Clearly label AI interactions. For chatbots, display "You are chatting with an AI assistant." For AI-generated content, include visible and machine-readable markers. For AI-assisted decisions, inform the subject before the decision is made.

**Decision explanations** - Implement explainability tools (SHAP, LIME, counterfactual explanations) that can generate per-decision explanations. Create templates for different audiences: simple language for data subjects, technical detail for regulators, and comprehensive documentation for auditors.

**Technical documentation** - For high-risk AI systems, maintain documentation covering the system description, development methodology, training data, performance metrics, risk management measures, and human oversight arrangements. This documentation must be available to regulators on request.

**Training data transparency** - For general-purpose AI models, prepare a training data summary describing the data sources, data types, and any filtering or preprocessing applied. The summary should be sufficiently detailed for downstream providers to assess suitability.

## Building a Transparency Framework

Establish organizational standards for AI transparency. Define which AI systems require which level of disclosure. Create reusable explanation templates and disclosure notices. Build transparency requirements into the AI development lifecycle so that documentation and explanation capabilities are designed in from the start rather than retrofitted. Train customer-facing staff to handle AI-related questions from individuals exercising their rights.

Audit transparency practices regularly. Test whether explanations are actually meaningful to their intended audience. Verify that AI interaction disclosures are visible and understandable. Ensure documentation stays current as systems evolve.

## Sources

1. Regulation (EU) 2024/1689 (AI Act), Articles 10, 53, and 111, EUR-Lex: [https://eur-lex.europa.eu/eli/reg/2024/1689/oj](https://eur-lex.europa.eu/eli/reg/2024/1689/oj)
2. European Commission, "Commission presents template for general-purpose AI model providers to summarise data used to train their models" (24 July 2025): [https://digital-strategy.ec.europa.eu/en/news/commission-presents-template-general-purpose-ai-model-providers-summarise-data-used-train-their](https://digital-strategy.ec.europa.eu/en/news/commission-presents-template-general-purpose-ai-model-providers-summarise-data-used-train-their)
3. European Commission, "EU rules on general-purpose AI models start to apply, bringing more transparency, safety and accountability": [https://digital-strategy.ec.europa.eu/en/news/eu-rules-general-purpose-ai-models-start-apply-bringing-more-transparency-safety-and-accountability](https://digital-strategy.ec.europa.eu/en/news/eu-rules-general-purpose-ai-models-start-apply-bringing-more-transparency-safety-and-accountability)
4. WilmerHale, "European Commission Releases Mandatory Template for Public Disclosure of AI Training Data": [https://www.wilmerhale.com/en/insights/blogs/wilmerhale-privacy-and-cybersecurity-law/european-commission-releases-mandatory-template-for-public-disclosure-of-ai-training-data](https://www.wilmerhale.com/en/insights/blogs/wilmerhale-privacy-and-cybersecurity-law/european-commission-releases-mandatory-template-for-public-disclosure-of-ai-training-data)
5. securiti.ai, "EU Publishes Template for Public Summaries of AI Training Content": [https://securiti.ai/eu-publishes-template-for-public-summaries-of-ai-training-content/](https://securiti.ai/eu-publishes-template-for-public-summaries-of-ai-training-content/)
6. WilmerHale, "European Commission Issues Guidelines for Providers of General-Purpose AI Models" (18 July 2025): [https://www.wilmerhale.com/en/insights/blogs/wilmerhale-privacy-and-cybersecurity-law/20250724-european-commission-issues-guidelines-for-providers-of-general-purpose-ai-models](https://www.wilmerhale.com/en/insights/blogs/wilmerhale-privacy-and-cybersecurity-law/20250724-european-commission-issues-guidelines-for-providers-of-general-purpose-ai-models)
7. Center for Democracy & Technology, "EU AI Act Brief, Part 5: General-Purpose AI Models" (GPAI Guidelines' one-third compute threshold for downstream modifiers): [https://cdt.org/insights/eu-ai-act-brief-pt-5-general-purpose-ai-models/](https://cdt.org/insights/eu-ai-act-brief-pt-5-general-purpose-ai-models/)
8. artificialintelligenceact.eu, "Article 10: Data and Data Governance": [https://artificialintelligenceact.eu/article/10/](https://artificialintelligenceact.eu/article/10/)
9. Regulation (EU) 2026/1744 (Digital Omnibus on AI), EUR-Lex: [https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng](https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng)

## Further reading

- [Benchmarking a Fine-Tuned Model Against Its Lineage](/guides/benchmarking-a-finetuned-model-against-its-lineage/) — the black-box evaluation workflow that needs no training-data visibility at all.
- [LoRA and QLoRA](/glossary/lora/) — how parameter-efficient fine-tuning touches only a small, targeted slice of a model's weights, relevant to the one-third compute threshold above.
- [Fine-Tuning LLMs Guide](/guides/fine-tuning-llms-guide/) — the general fine-tuning workflow this section's provider-threshold discussion assumes.
- [EU AI Act Compliance Checklist](/guides/eu-ai-act-compliance-checklist/) — the combined obligation timeline across GPAI, high-risk, and transparency tracks.
- [EU AI Act Enforcement Begins](/news/eu-ai-act-enforcement-begins-2026/) — the Digital Omnibus deferral of Annex III deadlines to 2 December 2027, and what stayed on schedule.
- [Model Lineage](/glossary/model-lineage-glossary/) — tracking a fine-tuned model's ancestry, relevant to scoping a provider's own training-data summary.
