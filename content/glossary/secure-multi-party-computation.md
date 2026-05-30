---
title: "Secure Multi-Party Computation"
description: "How multiple organizations can collaboratively train ML models or compute joint analytics without sharing their private data."
date: 2026-03-28
categories: [Glossary]
tags: [SMPC, privacy, federated-learning, secure-computation, cryptography]
related:
  - glossary/homomorphic-encryption
  - glossary/data-sovereignty
  - glossary/gdpr
  - glossary/ai-safety
last_updated: 2026-05-30
---

Secure multi-party computation (SMPC) is a cryptographic protocol that allows multiple parties to jointly compute a function over their combined data while keeping each party's input private. No party learns anything about the others' data beyond what can be inferred from the output. Applied to machine learning, SMPC enables collaborative model training and inference across organizations that cannot share raw data due to regulatory, competitive, or privacy constraints.

## How It Works

SMPC protocols distribute computation across parties using techniques like **secret sharing**, where each data value is split into random shares distributed among participants. No individual share reveals anything about the original value, but combining all shares recovers it. Computation proceeds on the shares: additions can be performed locally, while multiplications require interactive communication between parties.

**Garbled circuits** provide an alternative approach where one party encrypts a Boolean circuit representation of the computation, and the other party evaluates it using oblivious transfer. This enables any computable function but has high communication overhead.

For ML training, SMPC can be combined with **federated learning**: each party trains on local data and shares only encrypted gradients or model updates. Secure aggregation protocols ensure the central server only sees the combined update, not individual contributions. This approach powers privacy-preserving analytics in healthcare (combining patient data across hospitals), financial services (fraud detection across institutions), and advertising (measurement without sharing user data).

## Why It Matters

SMPC unlocks datasets that could never be combined under traditional data sharing. Medical research benefits from training on patient records across multiple hospitals without centralizing sensitive health data. Financial institutions can build better fraud detection by jointly analyzing transaction patterns without exposing customer information. SMPC provides mathematical guarantees of privacy, not just policy promises.

## Practical Considerations

SMPC introduces significant computational overhead (10-1000x compared to plaintext) and communication costs between parties. Frameworks like MP-SPDZ, CrypTen (Meta), and TF Encrypted provide implementations. For practical deployment, identify the minimal computation that must be done securely and keep everything else in plaintext. Two-party computation is more efficient than multi-party. Start with secure aggregation for federated learning, which is the most mature and performant application, before attempting full SMPC training pipelines.

## Sources

- Yao, A. C. (1982). Protocols for secure computations. *FOCS 1982*. (Introduced secure two-party computation; the foundational theoretical paper for the field.)
- Goldreich, O., Micali, S., & Wigderson, A. (1987). How to play any mental game. *STOC 1987*. (Extended Yao's result to multi-party computation; proved that any function can be computed securely.)
- Bonawitz, K., et al. (2017). Practical secure aggregation for privacy-preserving machine learning. *ACM CCS 2017*. (Secure aggregation for federated learning; the most practical SMPC application for ML; powers Google's federated learning deployments.)
