---
title: "Model Cards - AI Transparency Documentation"
description: "What model cards document, why they matter for AI governance, and how to create one."
date: 2026-03-24
categories: [Glossary]
tags: ["ai-ml", "beginner", "model-cards", "documentation", "responsible-ai", "transparency", "evaluation"]
last_updated: 2026-05-30
---

A model card is a short document that describes an AI model: what it does, how it was built, how well it works, and where it should and should not be used. Originally proposed by Google researchers in 2018, model cards have become a standard artifact in responsible AI development and are increasingly required by enterprise procurement, regulatory bodies, and AI governance frameworks.

## What a Model Card Contains

The standard model card structure covers:

**Model details** - Model name, version, type (classification, generation, regression), framework used, and who created it. Basic provenance information.

**Intended use** - What tasks the model is designed for and what it is explicitly not intended for. This is important for liability and governance: a model card that says "not intended for use in employment decisions" makes clear that downstream misuse is outside the documented scope.

**Training data** - Where training data came from, what time period it covers, known gaps or biases in the training population. If training data includes personal data, how consent and privacy requirements were handled.

**Performance** - Evaluation metrics (accuracy, precision, recall, F1) on relevant test sets. Crucially, performance should be broken down by meaningful subgroups, not just reported as a single overall number. A sentiment model that is 92% accurate overall but 78% accurate on text from non-native English speakers has a significant gap that the overall number hides.

**Known limitations** - Edge cases where the model performs poorly. Input types that are out of distribution. Contexts where results should be treated with additional skepticism.

**Ethical considerations** - Potential for misuse, fairness considerations, and any bias testing that was conducted.

**Update history** - When the model was last retrained, what changed, and why.

## Why Model Cards Matter

**Enterprise procurement** - Many organizations require model cards as part of AI vendor assessment. A vendor or internal team that cannot produce a model card signals that governance has not been considered.

**Incident investigation** - When an AI system produces unexpected output, a model card provides the starting point for investigation: was the input within the documented scope? Was the model evaluated on this type of data?

**EU AI Act compliance** - The EU AI Act requires technical documentation for high-risk AI systems that covers much of what a model card documents. Building model cards from the start aligns with this requirement.

**Trust and accountability** - A model card is a statement of accountability. It records what you know about the model, what you tested, and what you do not know. Organizations that publish model cards (internally or externally) signal that they have thought about these questions.

## Creating a Model Card

For custom models, create the model card during development, not after deployment. The information is most available when the team is actively building. Template: Google's original model card template is freely available and widely used. Hugging Face's model card format is standard in the open source community.

For third-party models, the provider's model card (Anthropic publishes model cards for Claude; Amazon publishes them for Titan and other Bedrock models) covers the base model. Your organization should supplement it with documentation of how you are using it: what system prompts, what guardrails, what use case, and what evaluation you have done on your specific deployment.

## Sources

- Mitchell, M., et al. (2019). Model cards for model reporting. *FAccT 2019*. (Original model card paper by Google researchers; defined the format and rationale.)
- Gebru, T., et al. (2021). Datasheets for datasets. *Communications of the ACM, 64*(12), 86–92. (Companion standard for training data documentation; used alongside model cards for full provenance.)
- European Parliament and Council. (2024). *Regulation (EU) 2024/1689 (EU AI Act)*, Article 13 and Annex IV: Transparency and Technical Documentation. (Regulatory requirement driving model card adoption for high-risk AI systems in the EU.)
