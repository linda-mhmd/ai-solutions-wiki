---
title: "EU AI Act Compliance Checklist for Enterprises"
description: "A practical EU AI Act compliance checklist: classify your AI systems, identify obligations, and implement the required documentation and controls. Covers the risk tiers, key deadlines, and what high-risk AI systems must do to comply."
date: 2026-06-22
categories: [Guides]
tags: ["eu-ai-act", "compliance", "ai-governance", "regulation", "risk-classification", "enterprise-ai", "gdpr", "austria", "europe"]
related:
  - frameworks/eu-ai-act
  - frameworks/iso-42001
  - glossary/ai-safety
  - glossary/bias
  - glossary/data-governance
  - comparisons/eu-vs-us-ai-regulation
---

<figure class="bz-figure">
  <img src="/img/enterprise-dark/executives-city-view-notext.png" alt="Three executives silhouetted against a night city skyline through floor-to-ceiling windows: the governance conversation happening at the top before the regulation deadline arrives." loading="lazy">
  <figcaption>The EU AI Act does not regulate technology. It regulates the decisions companies make when deploying AI in contexts that affect people.</figcaption>
</figure>

The EU AI Act (Regulation 2024/1689) became law on 1 August 2024. It is the world's first comprehensive legal framework for artificial intelligence. If your company operates in the EU, sells products or services to EU users, or processes data about EU residents using AI, the Act applies to you.

This guide covers the practical steps to reach compliance: inventorying your AI systems, classifying them by risk tier, identifying the specific obligations each tier triggers, and building the documentation and controls the Act requires. It is not legal advice. Engage qualified legal counsel for your specific situation.

## The compliance process

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 1</span>
    <span class="bz-flow-step-name">Inventory</span>
    <span class="bz-flow-step-desc">List every AI system in use or development, including third-party APIs and low-code integrations.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 2</span>
    <span class="bz-flow-step-name">Classify</span>
    <span class="bz-flow-step-desc">Assign a risk tier to each system: unacceptable, high, limited, or minimal.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 3</span>
    <span class="bz-flow-step-name">Identify obligations</span>
    <span class="bz-flow-step-desc">Determine what documentation, controls, and assessments each risk tier legally requires.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 4</span>
    <span class="bz-flow-step-name">Gap analysis</span>
    <span class="bz-flow-step-desc">Compare current documentation and controls against the obligations. Identify what is missing.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 5</span>
    <span class="bz-flow-step-name">Remediate</span>
    <span class="bz-flow-step-desc">Implement the required controls, write the missing documentation, test for bias and robustness.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 6</span>
    <span class="bz-flow-step-name">Document and audit</span>
    <span class="bz-flow-step-desc">Maintain records, register high-risk systems, and prepare for conformity assessment.</span>
  </div>
</div>

## The four risk tiers

The Act classifies AI systems into four tiers. Your obligations depend entirely on which tier your system falls into.

### Unacceptable risk: prohibited systems

These systems are banned in the EU with no exceptions. Deploying them after the February 2025 prohibition date is a criminal matter, not a compliance gap.

Prohibited systems include:
- Social scoring by governments or public authorities: ranking citizens on the basis of behaviour, social characteristics, or personal attributes
- Real-time remote biometric identification in public spaces, used by law enforcement (with narrow exceptions for missing children and imminent terrorist threats)
- AI that manipulates behaviour through subliminal techniques that bypass conscious awareness
- AI that exploits vulnerabilities of specific groups (children, people with disabilities) to distort behaviour
- Emotion recognition systems in workplace and educational settings
- Biometric categorisation systems that infer sensitive characteristics such as race, political opinion, or sexual orientation

If any system in your inventory matches these categories, the only compliant action is to decommission it.

### High risk: regulated systems

High-risk systems remain legal but face substantial obligations. This tier covers AI systems that affect people's safety, rights, or access to essential services. Most enterprise AI compliance work sits in this tier.

The Act defines high-risk systems across eight domains:

| Domain | Examples |
|---|---|
| **HR and employment** | CV screening, performance ranking, promotion or dismissal decisions |
| **Credit and financial services** | Credit scoring, insurance risk assessment, loan eligibility |
| **Healthcare** | Medical diagnosis, treatment recommendation, surgical robotics |
| **Education** | Exam scoring, student assessment, access to educational institutions |
| **Critical infrastructure** | AI managing electricity grids, water systems, transport networks |
| **Law enforcement** | Predictive policing, evidence analysis, criminal risk assessment |
| **Border control and migration** | Document verification, asylum assessment, border crossing AI |
| **Justice and democracy** | AI assisting courts, AI influencing elections |

If your AI system makes or materially influences decisions in any of these domains, treat it as high-risk until a qualified assessment concludes otherwise.

### Limited risk: transparency obligations

Limited-risk systems face a single core obligation: tell users they are interacting with AI. Examples:

- Chatbots and virtual assistants: users must know they are not talking to a human
- AI-generated content presented as real: deepfakes and synthetic media must be labelled
- Emotion recognition systems used outside prohibited contexts: users must be informed

The required disclosure is explicit. A small footer note or buried terms-of-service reference does not satisfy the obligation.

### Minimal risk: no specific obligations

Most consumer AI falls into this tier. Spam filters, AI in video games, recommendation engines for playlists, and similar systems face no EU AI Act obligations. You can still apply voluntary codes of conduct, and the Act encourages this.

## High-risk system obligations

The following obligations apply to every AI system classified as high-risk. Each maps to a specific article in the regulation.

### Technical documentation (Article 11)

Before deployment, you must create and maintain documentation that covers:

- The system's purpose and intended use context
- The design and architecture of the model
- Training, validation, and testing data sources and processes
- Performance metrics on the relevant benchmarks
- Known limitations and foreseeable misuse scenarios
- Post-market monitoring plan

Documentation must be updated whenever the system is materially modified. A one-time document written at launch and never updated does not satisfy this requirement.

### Data governance (Article 10)

Training, validation, and testing data must meet specific quality requirements:

- Data must be relevant, representative, and free from errors to the extent possible
- Bias testing against protected characteristics is mandatory, not optional
- Data lineage must be documented: where the data came from, how it was processed, what transformations were applied
- Sensitive data may only be used for bias detection under strict conditions

This requirement has direct overlap with GDPR obligations. Run data protection impact assessments (DPIAs) for AI systems that process personal data.

### Transparency and instructions for use (Article 13)

High-risk systems must be deployed with instructions that tell operators and users:

- What the system does and what decisions it influences
- The level of accuracy and any known performance gaps across demographic groups
- What human oversight the system requires
- How to interpret outputs correctly
- What the system cannot do

Instructions must be in language that the intended operator or user can understand. Technical documentation written for data scientists does not satisfy the obligation for a system operated by HR managers.

### Human oversight (Article 14)

Every high-risk system must be designed so that humans can:

- Monitor the system's operation in real time
- Understand the system's outputs well enough to detect anomalies
- Override, interrupt, or shut down the system
- Refuse to act on the system's output when it appears incorrect

The override mechanism must be implemented in the system design, not just described in a policy document. An HR manager who cannot actually reject a CV-screening system's output does not constitute meaningful human oversight.

### Accuracy, robustness, and cybersecurity (Article 15)

High-risk systems must achieve and maintain an appropriate level of:

- **Accuracy**: defined performance targets, benchmarked and documented before deployment
- **Robustness**: stable performance under variation in inputs, including edge cases and adversarial conditions
- **Cybersecurity**: resistance to attempts to manipulate the system's outputs through poisoned inputs or model extraction attacks

Testing must be ongoing. Initial deployment tests do not satisfy the requirement for systems that continue learning or that face evolving input distributions in production.

### Conformity assessment

Before deploying a high-risk system, you must complete a conformity assessment. For most high-risk systems, this is a self-assessment against the requirements above. For certain specific categories (biometric identification, critical infrastructure, law enforcement), third-party assessment by a notified body is required.

Complete the self-assessment and retain the records. You will need them for EU database registration and for any regulatory inquiry.

### EU AI database registration

High-risk AI systems must be registered in the EU AI Office's public database before deployment. The database is operated by the European AI Office. Registration requires the basic information from your technical documentation: provider identity, system name, intended purpose, risk classification, and conformity assessment status.

## Practical compliance checklist

Work through this checklist for each AI system in your inventory.

**Inventory and classification**

- [ ] List every AI system in use or in development, including third-party APIs that make or influence decisions
- [ ] For each system, document its purpose, data inputs, outputs, and affected user groups
- [ ] Classify each system against the four risk tiers using the Act's Annex III categories
- [ ] Flag any system that may meet the prohibited categories for immediate legal review

**For each high-risk system**

- [ ] Assign a named responsible person (the "provider" or "deployer" in the Act's language)
- [ ] Create technical documentation covering design, training data, performance metrics, and known limitations
- [ ] Document data lineage for all training, validation, and testing data
- [ ] Test training data for bias against protected characteristics (age, gender, race, disability, etc.)
- [ ] Benchmark accuracy and robustness against defined performance targets
- [ ] Implement a human override mechanism that operators can actually use
- [ ] Draft user-facing transparency notices explaining what the system does and its limitations
- [ ] Complete a conformity assessment and retain the records
- [ ] Register the system in the EU AI database before deployment

**For limited-risk systems**

- [ ] Add explicit AI disclosure to all chatbot, virtual assistant, and deepfake interfaces
- [ ] Verify the disclosure is visible at the point of first interaction, not buried in terms of service

**Ongoing obligations**

- [ ] Establish a post-market monitoring process to detect performance drift and adverse incidents
- [ ] Define and test your incident reporting process: serious incidents affecting health, safety, or fundamental rights must be reported to the national supervisory authority within 15 days
- [ ] Map EU AI Act obligations to existing GDPR data governance controls to avoid duplicating work
- [ ] Review and update technical documentation whenever a high-risk system is materially changed
- [ ] Schedule annual AI literacy training for staff involved in AI development, operation, and oversight

## Key deadlines

The Act introduces obligations in stages. Missing a deadline is not a minor procedural issue: fines for non-compliance reach €35 million or 7% of global annual turnover, whichever is higher, for the most serious violations.

| Date | Obligation |
|---|---|
| **1 August 2024** | Act enters into force |
| **2 February 2025** | Prohibited AI systems banned; AI literacy obligations apply |
| **2 August 2025** | GPAI model obligations apply (transparency, copyright compliance, systemic risk controls) |
| **2 August 2026** | High-risk AI system obligations fully apply |
| **2 August 2027** | High-risk AI systems already regulated under Annex I sectoral law come into scope |

The August 2026 deadline is the one most enterprises are preparing for now. That gives you until then to complete technical documentation, conformity assessments, and EU database registration for every high-risk system in your portfolio. That timeline is tighter than it looks once you account for legal review, technical remediation, and procurement processes for third-party systems.

## GPAI models and LLM providers

General Purpose AI (GPAI) models, the foundation models and large language models that power most enterprise AI, face a separate set of obligations that apply from August 2025.

**If you use a commercial LLM API** (such as those from Anthropic, OpenAI, or Google), the GPAI model obligations fall primarily on the API provider. Your obligation is to use the model in a way consistent with its intended purpose and the provider's documentation.

**If you fine-tune a foundation model** on your own data and deploy it internally or to customers, you become the GPAI provider for that fine-tuned model. The fine-tuning obligation applies even if the base model came from a third party.

**Systemic risk threshold**: models trained with more than 10^25 floating point operations (FLOPs) face additional obligations, including adversarial testing, incident reporting to the European AI Office, and cybersecurity measures. GPT-4 scale models and above are likely to meet this threshold. If you are training at this scale, engage the European AI Office proactively.

All GPAI providers must:

- Maintain technical documentation of the model's design, training data, and capabilities
- Comply with EU copyright law regarding training data
- Publish a summary of the training data used (sufficient for copyright compliance verification)
- Put in place policies to comply with EU copyright law

## What Austria-based companies need to know

Austria has designated the Datenschutzbehörde (DSB) as the national AI supervisory authority, coordinating with the European AI Office in Brussels. The DSB already handles GDPR enforcement in Austria and will apply the same data protection principles to AI Act compliance.

**GDPR and AI Act overlap**: any AI system that processes personal data faces obligations under both regulations simultaneously. In practice, this means:

- GDPR lawful basis requirements apply to the personal data your AI system uses
- DPIAs already required under GDPR for high-risk processing also support AI Act technical documentation
- Data subject rights (access, erasure, objection to automated decisions under GDPR Article 22) apply to AI-driven decisions about individuals

**Austrian public sector AI**: AI systems used in administrative decisions by Austrian public authorities face stricter rules than their private-sector equivalents. If your company provides AI to Austrian public authorities, the procurement process must include conformity documentation, and the authority must complete its own deployer obligations under the Act.

**Language requirements**: documentation and transparency notices for Austrian users must be available in German. This includes the instructions for use for high-risk systems deployed to Austrian operators.

## Where ISO 42001 helps

ISO/IEC 42001:2023 is the international standard for AI management systems. It defines how organisations should govern AI across its full lifecycle: development, deployment, monitoring, and retirement.

The standard maps directly to many EU AI Act requirements:

| EU AI Act requirement | ISO 42001 clause |
|---|---|
| Technical documentation | 8.4 (AI system documentation) |
| Data governance | 8.3 (Data for AI systems) |
| Risk management | 6.1 (Actions to address risks) |
| Human oversight | 8.6 (Responsible use) |
| Post-market monitoring | 9.1 (Monitoring, measurement, analysis) |
| Incident reporting | 10.1 (Nonconformity and corrective action) |

Achieving ISO 42001 certification does not automatically satisfy EU AI Act conformity assessment. However, a certified management system provides auditable evidence of the governance processes the Act requires. Regulators and notified bodies view ISO 42001 certification favourably when evaluating conformity assessment submissions.

If your organisation is beginning its AI governance programme, implementing ISO 42001 first is a practical approach. The management system you build will contain most of the documentation the EU AI Act requires.

## Further reading

- [EU AI Act full text (EUR-Lex)](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1689): the official regulation text, including Annexes I to XIII which define prohibited and high-risk system categories
- [European AI Office](https://digital-strategy.ec.europa.eu/en/policies/european-ai-office): the central EU body overseeing GPAI models and coordinating national supervisory authorities
- [EU AI Act compliance guidance (AI Office)](https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai): official guidance documents, technical standards references, and the GPAI Code of Practice
- [Austrian Datenschutzbehörde (DSB)](https://www.dsb.gv.at/): Austria's national data protection and AI supervisory authority; publishes guidance in German and English
- [EU AI Act risk classification tool (AI Office)](https://artificialintelligenceact.eu/assessment/eu-ai-act-compliance-checker/): interactive tool for classifying your AI systems against the Act's categories
- [ISO/IEC 42001:2023](https://www.iso.org/standard/81230.html): the AI management system standard; purchase required, but the scope and structure are publicly available
- [EU AI Act and GDPR interaction (EDPB)](https://www.edpb.europa.eu/): the European Data Protection Board publishes guidance on the intersection of GDPR and AI Act obligations
- [EU AI Act: frameworks overview](/frameworks/eu-ai-act-risk-framework/): the wiki's deep-dive into the regulation's structure, definitions, and governance model
