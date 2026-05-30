---
title: "CIA Triad - Confidentiality, Integrity, Availability"
description: "The three fundamental objectives of information security that guide the design and evaluation of security controls."
date: 2026-03-28
categories: [Glossary]
tags: [CIA-triad, security, confidentiality, integrity, availability]
last_updated: 2026-05-30
---

The CIA Triad is a foundational model in information security that identifies three core objectives: Confidentiality, Integrity, and Availability. Every security control, policy, and architecture decision can be evaluated in terms of how it supports or balances these three properties.

## Origins and History

The concepts of confidentiality, integrity, and availability as security objectives developed over decades of computer security research. The idea of confidentiality as a formal security property is traceable to early work on access control and classification systems in the 1970s, including the 1977 NIST publication on security guidelines for federal automated information systems. The Bell-LaPadula model (1973) formalized confidentiality, while the Biba model (1977) formalized integrity. The explicit grouping of these three properties as "the CIA triad" became standard in security education and practice during the 1990s. The triad is referenced as a foundational concept in ISO/IEC 27001, NIST SP 800-53, and virtually every information security textbook and certification program.

## The Three Properties

**Confidentiality** ensures that information is accessible only to authorized individuals, entities, or processes. Controls include encryption, access control lists, authentication mechanisms, and data classification. Breaches of confidentiality include data leaks, unauthorized access, and eavesdropping. **Integrity** ensures that information is accurate, complete, and unaltered except by authorized actions. Controls include checksums, digital signatures, version control, and input validation. Breaches of integrity include data tampering, unauthorized modification, and corruption. **Availability** ensures that information and systems are accessible to authorized users when needed. Controls include redundancy, failover systems, backups, and DDoS mitigation. Breaches of availability include system outages, denial-of-service attacks, and ransomware.

## Practical Applications

Security architects use the CIA triad to classify information assets by sensitivity, to select appropriate security controls during system design, to perform risk assessments by evaluating threats against each property, and to communicate security requirements to non-technical stakeholders in clear terms. Some frameworks extend the triad with additional properties such as authenticity, accountability, and non-repudiation.

## Sources

1. National Bureau of Standards (1977). "Computer Security Guidelines for Implementing the Privacy Act of 1974." FIPS PUB 41.
2. Bell, D.E. and LaPadula, L.J. (1973). "Secure Computer Systems: Mathematical Foundations." MITRE Technical Report 2547.
3. Stallings, W. and Brown, L. (2018). *Computer Security: Principles and Practice*, 4th ed. Pearson.
