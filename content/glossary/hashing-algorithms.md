---
title: "Hashing Algorithms"
description: "One-way functions that produce fixed-size digests from arbitrary input, including SHA-256, MD5, and bcrypt."
date: 2026-03-28
categories: [Glossary]
tags: [hashing, SHA-256, MD5, bcrypt, cryptography, security]
last_updated: 2026-05-30
---

A cryptographic hash function is a one-way function that takes an arbitrary-length input and produces a fixed-size output (digest or hash). Good hash functions are deterministic, fast to compute, infeasible to reverse, and produce vastly different outputs for slightly different inputs (avalanche effect).

## Origins and History

Ronald Rivest at MIT developed MD4 (1990) and MD5 (1991, RFC 1321) as fast message digest algorithms. MD5 produces a 128-bit hash and was widely used for integrity verification until collision vulnerabilities were demonstrated by Xiaoyun Wang in 2004. The Secure Hash Algorithm family was developed by the NSA and standardized by NIST. SHA-1 (1995) produces a 160-bit hash but is now considered broken for collision resistance. NIST published the SHA-2 family (SHA-224, SHA-256, SHA-384, SHA-512) in 2001 as FIPS PUB 180-2, with SHA-256 becoming the most widely deployed. SHA-3, based on the Keccak algorithm by Bertoni, Daemen, Peeters, and Van Assche, was standardized in 2015 (FIPS PUB 202) as an alternative (not replacement) to SHA-2. For password hashing specifically, algorithms like bcrypt (Niels Provos and David Mazieres, 1999) and Argon2 (winner of the Password Hashing Competition, 2015) are designed to be intentionally slow and memory-hard to resist brute-force attacks.

## How It Works

A hash function processes input through rounds of mathematical operations (bitwise operations, modular addition, compression functions) to produce a fixed-size digest. SHA-256, for example, processes 512-bit blocks through 64 rounds to produce a 256-bit hash. For password hashing, bcrypt incorporates a salt (random data) and a configurable work factor that controls computational cost, making precomputed rainbow table attacks and brute-force attacks impractical.

## Practical Applications

Hashing is used for data integrity verification (file checksums, Git commit identifiers), password storage (never store plaintext passwords; use bcrypt or Argon2), digital signatures (sign the hash, not the full document), blockchain (SHA-256 in Bitcoin's proof-of-work), and deduplication (content-addressable storage).

## Sources

1. Rivest, R. (1992). "The MD5 Message-Digest Algorithm." RFC 1321, IETF.
2. National Institute of Standards and Technology (2001). "Secure Hash Standard (SHS)." FIPS PUB 180-2.
3. Provos, N. and Mazieres, D. (1999). "A Future-Adaptable Password Scheme." *Proceedings of the USENIX Annual Technical Conference*.
