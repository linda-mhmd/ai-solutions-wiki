---
title: "Supply Chain Security"
description: "Cybersecurity practices for managing risks across the chain of vendors, open-source components, and third-party services that AI systems depend on."
date: 2026-03-28
categories: [Glossary]
tags: [supply-chain, cybersecurity, security, nis2, dora, third-party-risk]
related:
  - glossary/nis2
  - glossary/dora
  - patterns/ai-supply-chain-security
  - guides/nis2-implementation-guide
  - frameworks/cyber-resilience-act
last_updated: 2026-05-30
---

Supply chain security in the context of AI and cybersecurity refers to the practices, controls, and governance mechanisms used to manage risks introduced by third-party components, services, and providers that an AI system depends on. Modern AI systems have extensive supply chains that include pre-trained foundation models, open-source libraries, cloud infrastructure, data providers, labeling services, and MLOps tooling.

## Why It Matters

AI supply chains introduce risks at every layer. Pre-trained models may contain backdoors or biases from their training data. Open-source ML libraries may have vulnerabilities that expose inference infrastructure. Cloud API dependencies create availability risks. Data providers may supply poisoned or mislabeled training data. A compromise at any point in this chain can affect the integrity, availability, or confidentiality of the AI system.

## Regulatory Requirements

NIS2 explicitly requires covered entities to address supply chain cybersecurity, including assessing the security practices of direct suppliers and service providers. DORA requires financial entities to manage ICT third-party risk with specific contractual provisions. The EU Cyber Resilience Act introduces security requirements for products with digital elements throughout their lifecycle, including vulnerability handling and software updates.

## Key Practices

Effective AI supply chain security includes maintaining a software bill of materials (SBOM) that inventories all dependencies, conducting security assessments of model providers and data suppliers, verifying model integrity through checksums and provenance tracking, monitoring open-source dependencies for known vulnerabilities, implementing access controls for model registries and artifact stores, and establishing contractual security requirements with all providers.

## Model Supply Chain Risks

Unique to AI is the model supply chain. Models downloaded from public repositories (Hugging Face, GitHub) may be tampered with. Fine-tuning on untrusted data can introduce vulnerabilities. Model serialization formats like pickle allow arbitrary code execution. Organizations should verify model provenance, scan model files for malicious payloads, and maintain internal model registries with integrity verification.

## Sources

- Squire, M., et al. (2021). Backstabber's knife collection: A review of open source supply chain attacks. *DIMVA 2020*. (Systematic taxonomy of supply chain attacks against open-source software; directly applicable to ML library and model supply chains.)
- Stonebraker, M. (2021). *Software bill of materials (SBOM)*. NTIA. (US government definition and minimum elements for SBOMs; the baseline for AI supply chain inventory.)
- Carlini, N., et al. (2024). Poisoning web-scale training datasets is practical. *IEEE S&P 2024*. (Demonstrated that training data poisoning is feasible at scale; motivates data supply chain integrity controls.)
