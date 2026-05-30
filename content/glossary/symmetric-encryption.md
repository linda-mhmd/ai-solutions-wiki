---
title: "Symmetric Encryption"
description: "Encryption algorithms that use the same key for both encryption and decryption, including AES and DES."
date: 2026-03-28
categories: [Glossary]
tags: [encryption, symmetric, AES, DES, cryptography, security]
last_updated: 2026-05-30
---

Symmetric encryption uses a single shared key for both encrypting plaintext into ciphertext and decrypting ciphertext back into plaintext. It is the fastest form of encryption and is used to protect data at rest and data in transit in virtually all modern systems.

## Origins and History

Symmetric encryption has ancient roots in substitution and transposition ciphers, but modern symmetric cryptography began with the Data Encryption Standard (DES). DES was developed by IBM (based on Horst Feistel's Lucifer cipher) and adopted by NIST as a federal standard in 1977 (FIPS PUB 46). DES uses a 56-bit key, which became vulnerable to brute-force attacks as computing power increased. Triple DES (3DES) extended the effective key length but was slow. In 1997, NIST initiated a public competition for a replacement. In 2001, NIST selected the Rijndael algorithm, designed by Belgian cryptographers Joan Daemen and Vincent Rijmen, as the Advanced Encryption Standard (AES, FIPS PUB 197). AES supports key lengths of 128, 192, and 256 bits and remains the dominant symmetric cipher today.

## How It Works

Symmetric ciphers operate in two main categories. **Block ciphers** (AES, DES) encrypt fixed-size blocks of data and use modes of operation (CBC, CTR, GCM) to handle data larger than one block. AES-GCM is the most widely recommended mode as it provides both confidentiality and authenticity (authenticated encryption). **Stream ciphers** (ChaCha20, RC4) encrypt data one byte or bit at a time, generating a pseudorandom keystream from the key. ChaCha20-Poly1305, designed by Daniel Bernstein, is a modern authenticated stream cipher used in TLS 1.3 and WireGuard.

## Practical Applications

Symmetric encryption protects data at rest (disk encryption with AES-256, database encryption), data in transit (TLS uses symmetric encryption for bulk data after asymmetric key exchange), and data in memory. The primary challenge is key distribution: both parties must possess the same secret key, which is typically solved using asymmetric encryption or key exchange protocols for initial key agreement.

## Sources

1. National Institute of Standards and Technology (1977). "Data Encryption Standard (DES)." FIPS PUB 46.
2. National Institute of Standards and Technology (2001). "Advanced Encryption Standard (AES)." FIPS PUB 197.
3. Daemen, J. and Rijmen, V. (2002). *The Design of Rijndael: AES - The Advanced Encryption Standard*. Springer.
