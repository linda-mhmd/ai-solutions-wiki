---
title: "Homomorphic Encryption"
description: "How homomorphic encryption enables computation on encrypted data, allowing ML inference without exposing sensitive inputs."
date: 2026-03-28
categories: [Glossary]
tags: [homomorphic-encryption, privacy, FHE, encrypted-computation, security]
related:
  - glossary/secure-multi-party-computation
  - glossary/data-sovereignty
  - glossary/gdpr
  - glossary/ai-safety
last_updated: 2026-05-30
---

Homomorphic encryption (HE) is a cryptographic technique that allows computations to be performed directly on encrypted data without decrypting it first. The encrypted result, when decrypted, matches what would have been produced by running the same computation on the plaintext. This enables privacy-preserving machine learning where a cloud provider can run inference on sensitive data without ever seeing the data in the clear.

## How It Works

HE schemes define mathematical operations over ciphertexts that correspond to operations on plaintexts. **Partially homomorphic encryption** supports only one operation type (either addition or multiplication). **Somewhat homomorphic encryption** supports both but for a limited number of operations before noise accumulates and decryption fails. **Fully homomorphic encryption (FHE)** supports arbitrary computations by periodically "bootstrapping" (refreshing) the ciphertext to reduce noise, though at significant computational cost.

Modern FHE schemes like TFHE, CKKS, and BGV/BFV support different computation profiles. CKKS is suited for approximate arithmetic on real numbers, making it practical for ML inference. TFHE supports fast Boolean operations. Libraries like Microsoft SEAL, OpenFHE, and Zama's Concrete ML provide accessible interfaces for implementing HE computations.

For ML inference, the model weights can remain in plaintext on the server while the input data remains encrypted throughout computation. The server computes the forward pass on encrypted inputs and returns encrypted predictions that only the data owner can decrypt.

## Why It Matters

HE addresses a fundamental tension in cloud AI: organizations want the capabilities of powerful cloud-hosted models but cannot expose sensitive data (medical records, financial data, proprietary information). HE enables a data owner to use a third-party ML service without trusting the service provider with their data, which is critical for regulated industries like healthcare and finance.

## Practical Considerations

FHE inference is currently 1000-10000x slower than plaintext inference, making it impractical for most real-time applications. However, performance is improving rapidly: specialized FHE hardware accelerators and optimized neural network architectures are closing the gap. For production use today, consider HE for batch processing of highly sensitive data where latency is less important than privacy. Hybrid approaches that encrypt only the most sensitive features while processing non-sensitive features in plaintext offer a practical middle ground.

## Sources

- Gentry, C. (2009). Fully homomorphic encryption using ideal lattices. *ACM STOC 2009*. (First FHE construction; proved FHE was possible.)
- Cheon, J.H., et al. (2017). Homomorphic encryption for arithmetic of approximate numbers. *ASIACRYPT 2017*. (CKKS scheme; practical FHE for real-number ML inference.)
- Chillotti, I., et al. (2020). TFHE: Fast fully homomorphic encryption over the torus. *Journal of Cryptology, 33*(1), 34–91. (TFHE; fast Boolean circuit FHE.)
- Bourse, F., et al. (2018). Fast homomorphic evaluation of deep discretized neural networks. *CRYPTO 2018*. (FHE applied to neural network inference.)
