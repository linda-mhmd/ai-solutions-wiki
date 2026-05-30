---
title: "Security Threat Modeling"
description: "Structured approaches for identifying and prioritizing security threats, including STRIDE, DREAD, and attack trees."
date: 2026-03-28
categories: [Glossary]
tags: [threat-modeling, STRIDE, DREAD, attack-trees, security, risk]
last_updated: 2026-05-30
---

Threat modeling is a structured approach to identifying, analyzing, and prioritizing potential security threats to a system. It is performed during the design phase to find vulnerabilities before they are built into the system, making it one of the most cost-effective security activities.

## Origins and History

Formal threat modeling has roots in attack tree analysis, introduced by Bruce Schneier in 1999, which represented attacks as hierarchical tree structures. Microsoft developed the STRIDE threat classification model in 1999 as part of its Trustworthy Computing initiative, driven by the work of Loren Kohnfelder and Praerit Garg. STRIDE was paired with the DREAD risk rating model for prioritization. Microsoft's Security Development Lifecycle (SDL), formalized in 2004, made threat modeling a required activity for all Microsoft products. Adam Shostack, while at Microsoft, further refined the practice and published the comprehensive reference *Threat Modeling: Designing for Security* in 2014. Alternative methodologies include PASTA (Process for Attack Simulation and Threat Analysis), VAST (Visual, Agile, and Simple Threat modeling), and OCTAVE (Operationally Critical Threat, Asset, and Vulnerability Evaluation) from Carnegie Mellon's SEI.

## Core Approaches

**STRIDE** classifies threats into six categories: Spoofing (impersonating something or someone), Tampering (modifying data or code), Repudiation (denying actions), Information Disclosure (exposing information), Denial of Service (making systems unavailable), and Elevation of Privilege (gaining unauthorized capabilities). **DREAD** scores threats on five dimensions: Damage potential, Reproducibility, Exploitability, Affected users, and Discoverability. Each dimension is rated 1-10, producing a composite risk score. **Attack trees** decompose a high-level attack goal into sub-goals connected by AND/OR nodes, revealing all possible attack paths and their prerequisites.

## Practical Applications

Teams perform threat modeling during system design by creating data flow diagrams, identifying trust boundaries, applying STRIDE to each element crossing a boundary, and prioritizing mitigations. Threat models are living documents updated as the system evolves. Modern tools such as Microsoft Threat Modeling Tool, OWASP Threat Dragon, and IriusRisk automate parts of the process.

## Sources

1. Kohnfelder, L. and Garg, P. (1999). "The Threats to Our Products." Microsoft internal document.
2. Shostack, A. (2014). *Threat Modeling: Designing for Security*. Wiley.
3. Schneier, B. (1999). "Attack Trees." *Dr. Dobb's Journal*, 24(12), 21-29.
