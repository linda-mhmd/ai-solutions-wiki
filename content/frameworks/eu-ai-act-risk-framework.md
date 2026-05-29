---
title: "EU AI Act Risk Classification Framework"
description: "Complete EU AI Act risk classification system: unacceptable, high, limited, and minimal risk tiers with compliance requirements, conformity assessment, and enforcement timelines."
date: 2026-03-28
categories: [Frameworks]
tags: [eu-ai-act, risk-classification, compliance, regulation, ai-governance, high-risk-ai]
related:
  - guides/eu-ai-act-compliance-guide
  - guides/eu-ai-act-compliance
  - glossary/conformity-assessment
  - glossary/ce-marking-ai
  - glossary/automated-decision-making
  - frameworks/gdpr-ai-framework
  - frameworks/ai-regulatory-landscape
  - comparisons/gdpr-vs-eu-ai-act
  - comparisons/eu-vs-us-ai-regulation
---

The EU AI Act (Regulation 2024/1689) is the first comprehensive AI regulation worldwide. It classifies AI systems into four risk tiers and scales compliance requirements accordingly. The Act applies to any organization that develops, deploys, or distributes AI systems in the EU market, regardless of where the organization is headquartered. This framework document details the risk classification system, requirements per tier, and implementation timeline.


<figure class="bz-figure">
  <img src="/img/dark-cherry/vortex-complexity.png" alt="A dark spiraling vortex with a deep red core: unmanaged risk that pulls systems and organisations toward the center." loading="lazy">
  <figcaption>The EU AI Act risk framework exists to prevent this. Unclassified risk compounds. The framework gives you a map: four risk tiers, defined obligations at each level, a path through the spiral.</figcaption>
</figure>

## Risk Tier 1: Unacceptable Risk (Prohibited)

Article 5 bans AI systems that pose an unacceptable risk to fundamental rights. These prohibitions took effect on 2 February 2025. Prohibited practices include AI systems that use subliminal, manipulative, or deceptive techniques to distort behavior and cause significant harm, systems that exploit vulnerabilities related to age, disability, or socioeconomic situation, social scoring systems that evaluate individuals based on social behavior or personal characteristics leading to detrimental treatment, real-time remote biometric identification in publicly accessible spaces for law enforcement (with narrow exceptions), emotion recognition systems in workplaces and educational institutions, untargeted scraping of facial images from the internet or CCTV to build facial recognition databases, and biometric categorization systems that infer sensitive attributes such as race, political opinions, or sexual orientation.

## Risk Tier 2: High Risk

High-risk AI systems face the most detailed compliance burden. Requirements become enforceable on 2 August 2026 for Annex III systems and 2 August 2027 for systems embedded in regulated products.

### High-Risk Use Cases (Annex III)

High-risk domains include biometrics (remote biometric identification, emotion recognition where not banned, biometric categorization), critical infrastructure (AI systems used as safety components in management and operation of road traffic, water, gas, heating, and electricity supply), education and vocational training (systems determining access to education, evaluating learning outcomes, monitoring cheating), employment and worker management (recruitment, screening, hiring decisions, task allocation, performance monitoring, termination), access to essential services (credit scoring, insurance pricing, emergency services dispatching), law enforcement (individual risk assessment, polygraphs, evidence evaluation, crime prediction), migration and border control (risk assessment, document authentication, asylum application processing), and administration of justice (legal research, sentencing, dispute resolution).

Any AI system that performs profiling of individuals is automatically classified as high-risk.

### Compliance Requirements for High-Risk Systems

Providers of high-risk AI systems must comply with Articles 8 through 15 throughout the system's lifecycle.

**Risk Management System (Article 9):** Implement a continuous risk management process covering identification, analysis, estimation, and evaluation of risks from intended use and reasonably foreseeable misuse. The system must be maintained and updated throughout the AI system lifecycle.

**Data Governance (Article 10):** Training, validation, and testing datasets must be relevant, sufficiently representative, and as free of errors as possible. Data governance must include examination for biases, documentation of data sources and characteristics, and appropriate preprocessing.

**Technical Documentation (Article 11):** Comprehensive documentation demonstrating compliance, including system description, design specifications, development process, risk management, and performance metrics.

**Record-Keeping (Article 12):** High-risk systems must automatically log events relevant to identifying risks, including input data, system outputs, and human oversight actions.

**Transparency (Article 13):** Systems must be designed to allow deployers to interpret outputs and use them appropriately. Instructions for use must include system capabilities, limitations, and intended purpose.

**Human Oversight (Article 14):** Systems must enable effective human oversight, including the ability to understand system capabilities, monitor operation, interpret outputs, and override or reverse outputs.

**Accuracy, Robustness, and Cybersecurity (Article 15):** Systems must achieve appropriate levels of accuracy and be resilient against errors, faults, and adversarial attacks.

**Quality Management (Article 17):** Providers must establish a quality management system ensuring ongoing compliance.

**Conformity Assessment (Article 43):** Before placing a high-risk system on the market, providers must complete a conformity assessment, prepare technical documentation, affix CE marking, and register in the EU database.

## Risk Tier 3: Limited Risk

Limited-risk AI systems face transparency obligations only. These include AI systems that interact with natural persons (chatbots must disclose they are AI), systems that generate synthetic content (deepfakes, AI-generated images or text must be labeled), and emotion recognition or biometric categorization systems that are not prohibited.

Transparency requirements under Article 50 took effect on 2 August 2025. Deployers must ensure users are informed they are interacting with AI, and AI-generated content must be machine-readable as such.

## Risk Tier 4: Minimal Risk

Most AI systems fall into the minimal risk category and face no mandatory requirements under the Act. Examples include spam filters, AI-powered video games, and inventory management systems. The Commission encourages voluntary adoption of codes of conduct for these systems.

## General-Purpose AI Models

The Act includes specific provisions for general-purpose AI (GPAI) models. All GPAI providers must maintain technical documentation, provide information to downstream deployers, comply with copyright requirements, and publish training content summaries. GPAI models with systemic risk (trained with more than 10^25 FLOPs or designated by the Commission) face additional obligations including model evaluation, adversarial testing, incident tracking, and cybersecurity protections.

## Penalties

Non-compliance penalties are tiered. Prohibited practices carry fines up to 35 million euros or 7% of global annual turnover. High-risk system violations carry fines up to 15 million euros or 3% of turnover. Providing incorrect information to authorities carries fines up to 7.5 million euros or 1% of turnover. SMEs and startups face proportionate caps.

## Enforcement Timeline

February 2025: Prohibitions on unacceptable risk systems in effect. August 2025: Transparency obligations and GPAI rules in effect. February 2026: Commission publishes guidelines on high-risk classification with practical examples. August 2026: Full requirements for Annex III high-risk systems enforceable. August 2027: Requirements for high-risk AI in regulated products enforceable.

## Sources

1. European Parliament and Council. "Regulation (EU) 2024/1689 of the European Parliament and of the Council of 13 June 2024 laying down harmonised rules on artificial intelligence (Artificial Intelligence Act)." *Official Journal of the European Union* L Series, 12 July 2024. [https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=OJ:L_202401689](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=OJ:L_202401689), The primary legal text.
2. European Commission. "AI Act Explorer." [https://artificialintelligenceact.eu/](https://artificialintelligenceact.eu/), Article-by-article annotated reference maintained by the Future of Life Institute.
3. European Commission. "High-Level Expert Group on Artificial Intelligence: Ethics Guidelines for Trustworthy AI." April 2019., The precursor guidelines that shaped the Act's risk classification principles.
