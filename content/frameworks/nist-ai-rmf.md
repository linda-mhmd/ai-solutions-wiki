---
title: "NIST AI Risk Management Framework - Govern, Map, Measure, Manage"
description: "An overview of the NIST AI RMF 1.0 framework, its four core functions, and how organizations use it to identify and mitigate risks in AI systems."
date: 2026-03-28
categories: [Frameworks]
tags: [frameworks, nist, risk-management, ai-governance, compliance]
related:
  - guides/nist-ai-rmf-implementation
  - guides/ai-audit-readiness
  - guides/responsible-ai-guide
  - frameworks/iso-42001
last_updated: 2026-09-25
lastmod: 2026-09-25
last_verified: 2026-09-25
---

The NIST AI Risk Management Framework (AI RMF 1.0), published in January 2023, provides a voluntary, rights-preserving framework for managing risks throughout the AI system lifecycle. Unlike regulatory mandates, the AI RMF is designed to be flexible and usable by organizations of any size, in any sector, regardless of their stage of AI adoption. It has rapidly become the reference framework for AI risk management in the United States and has influenced policy discussions internationally.

## Why a Risk Management Framework for AI

Traditional software risk frameworks do not adequately address the unique characteristics of AI systems. AI models can produce unexpected outputs, amplify biases present in training data, degrade over time as data distributions shift, and behave differently across demographic groups. These properties require a dedicated risk management approach that accounts for the probabilistic nature of AI and the sociotechnical context in which AI systems operate.

NIST developed the AI RMF through an open, consensus-driven process involving hundreds of stakeholders from industry, academia, civil society, and government. The result is a framework that complements existing organizational risk management practices rather than replacing them.

Source: [NIST AI RMF 1.0](https://www.nist.gov/artificial-intelligence/executive-order-safe-secure-and-trustworthy-artificial-intelligence)

## The Four Core Functions

The AI RMF is organized around four functions that form a continuous cycle. These are not sequential phases but ongoing activities that inform each other throughout the AI system lifecycle.

### Govern

The Govern function establishes the organizational context for AI risk management. It covers policies, processes, accountability structures, and organizational culture. Govern is cross-cutting: it applies to and informs all other functions. Key activities include defining risk tolerances, assigning roles and responsibilities, establishing documentation practices, and ensuring that diverse perspectives are included in AI decision-making. Without effective governance, the other three functions lack the organizational foundation to operate consistently.

### Map

The Map function identifies and contextualizes AI risks. It involves understanding the intended purpose of an AI system, the context in which it will operate, the stakeholders affected, and the potential impacts of both correct and incorrect system behavior. Mapping includes identifying the data used, the assumptions embedded in the model, and the potential for misuse. The output of this function is a comprehensive picture of where risks exist and what their potential severity might be.

### Measure

The Measure function quantifies and tracks the risks identified during mapping. It involves selecting appropriate metrics, developing testing methodologies, and establishing benchmarks for acceptable performance. Measurement applies not only to technical performance metrics like accuracy and latency but also to trustworthiness characteristics such as fairness, explainability, privacy, and security. Effective measurement requires both quantitative metrics and qualitative assessments, particularly for risks that are difficult to reduce to a single number.

### Manage

The Manage function involves prioritizing and acting on the risks that have been measured. It includes allocating resources to risk mitigation, implementing controls, monitoring deployed systems, and establishing processes for incident response and system decommissioning. Risk management decisions are informed by the organization's risk tolerances as established in the Govern function, creating a feedback loop that connects all four functions.

## Trustworthiness Characteristics

The AI RMF defines seven characteristics of trustworthy AI: valid and reliable, safe, secure and resilient, accountable and transparent, explainable and interpretable, privacy-enhanced, and fair with harmful bias managed. These characteristics serve as a shared vocabulary for discussing what good AI system behavior looks like and provide concrete dimensions against which organizations can assess their systems.

## Practical Application

Organizations typically begin by mapping the AI RMF functions to their existing risk management and governance structures. The framework includes a companion Playbook that provides suggested actions and references for each subcategory. Many organizations use the AI RMF alongside sector-specific regulations, internal policies, and other frameworks such as ISO/IEC 42001. The framework does not prescribe specific technical solutions but provides a structured process for ensuring that risks are identified, measured, and managed systematically.

The AI RMF was referenced in the October 2023 Executive Order 14110 on AI safety, which was rescinded in January 2025, and it remains widely cited in procurement requirements for AI systems used by the US federal government. NIST published a companion Generative AI Profile (NIST AI 600-1) on 26 July 2024 and a concept note for a critical-infrastructure profile on 7 April 2026. As of September 2026, NIST states that AI RMF 1.0 "is being revised as part of the White House AI Action Plan"; the July 2025 plan directs NIST to remove references to misinformation, diversity, equity and inclusion, and climate change. Check the NIST page for the current version before citing it in a policy.

## Sources and Further Reading

- [NIST AI Risk Management Framework 1.0](https://www.nist.gov/itl/ai-risk-management-framework) - Official framework document and supporting materials
- [NIST AI RMF Playbook](https://airc.nist.gov/airmf-resources/playbook/) - Practical guidance and suggested actions for implementing the framework
- [Executive Order 14110 on Safe, Secure, and Trustworthy AI](https://www.federalregister.gov/documents/2023/11/01/2023-24283/safe-secure-and-trustworthy-development-and-use-of-artificial-intelligence) - Federal Register text of the 2023 order referencing the AI RMF (rescinded 20 January 2025)
- [NIST AI 600-1: Generative AI Profile](https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence) - NIST, 26 July 2024
- [America's AI Action Plan](https://www.whitehouse.gov/wp-content/uploads/2025/07/Americas-AI-Action-Plan.pdf) - White House, July 2025; directs the AI RMF revision
- [NIST AI RMF Crosswalk](https://airc.nist.gov/airmf-resources/crosswalks/) - Mapping between AI RMF and other frameworks including ISO/IEC 42001
