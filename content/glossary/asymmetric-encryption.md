---
title: "Asymmetric Encryption"
description: "Public-key cryptography using mathematically related key pairs, including RSA and elliptic curve algorithms."
date: 2026-03-28
categories: [Glossary]
tags: [encryption, asymmetric, RSA, ECC, public-key, cryptography, security]
last_updated: 2026-05-30
---

Asymmetric encryption (public-key cryptography) uses a mathematically related pair of keys: a public key that can be freely distributed and a private key that must be kept secret. Data encrypted with the public key can only be decrypted with the corresponding private key, and vice versa.

## Origins and History

The concept of public-key cryptography was first described by Whitfield Diffie and Martin Hellman in their landmark 1976 paper "New Directions in Cryptography," which introduced the Diffie-Hellman key exchange protocol. In 1977, Ron Rivest, Adi Shamir, and Leonard Adleman at MIT developed the RSA algorithm, the first practical public-key encryption and digital signature scheme, based on the difficulty of factoring large prime numbers. It was later revealed that Clifford Cocks at the UK's GCHQ had independently discovered a similar scheme in 1973, but the work remained classified. Elliptic Curve Cryptography (ECC) was independently proposed by Neal Koblitz and Victor Miller in 1985, offering equivalent security to RSA with significantly smaller key sizes. ECC has become the preferred choice for modern systems due to its efficiency.

## How It Works

The security of asymmetric encryption rests on mathematical problems that are computationally easy in one direction but infeasible to reverse. RSA relies on the difficulty of factoring the product of two large primes. ECC relies on the difficulty of the elliptic curve discrete logarithm problem. In a typical usage pattern, a sender encrypts a message with the recipient's public key, and only the recipient's private key can decrypt it. For digital signatures, the signer uses their private key to create a signature that anyone can verify with the corresponding public key.

## Practical Applications

Asymmetric encryption is used for key exchange in TLS/SSL (establishing symmetric session keys), digital signatures (code signing, document signing, certificates), secure email (PGP/GPG), and SSH authentication. Because asymmetric operations are computationally expensive (orders of magnitude slower than symmetric encryption), hybrid schemes are standard: asymmetric encryption establishes a shared symmetric key, which then encrypts the bulk data.

## Sources

1. Diffie, W. and Hellman, M. (1976). "New Directions in Cryptography." *IEEE Transactions on Information Theory*, 22(6), 644-654.
2. Rivest, R., Shamir, A., and Adleman, L. (1978). "A Method for Obtaining Digital Signatures and Public-Key Cryptosystems." *Communications of the ACM*, 21(2), 120-126.
3. Koblitz, N. (1987). "Elliptic Curve Cryptosystems." *Mathematics of Computation*, 48(177), 203-209.
