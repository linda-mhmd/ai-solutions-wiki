---
title: "TLS/SSL"
description: "Transport Layer Security and its predecessor Secure Sockets Layer, cryptographic protocols that provide encrypted communication and authentication over networks."
date: 2026-03-28
categories: [Glossary]
tags: [networking, tls, ssl, encryption, security, certificates]
last_updated: 2026-05-30
---

Transport Layer Security (TLS) is a cryptographic protocol that provides privacy, data integrity, and authentication for communication over computer networks. It is the protocol behind the padlock icon in web browsers and the "S" in HTTPS. SSL (Secure Sockets Layer) is the predecessor protocol that TLS replaced; the term "SSL" is still commonly used colloquially, but all modern implementations use TLS.

## How the TLS Handshake Works

Before encrypted data exchange begins, the client and server perform a handshake to establish shared encryption keys.

**TLS 1.2 handshake** involves multiple round trips. The client sends a ClientHello with supported cipher suites and a random value. The server responds with a ServerHello, its certificate, and a selected cipher suite. The client verifies the certificate against trusted Certificate Authorities (CAs), then both sides derive session keys using a key exchange algorithm (typically ECDHE). The handshake completes in two round trips.

**TLS 1.3 handshake** reduces this to a single round trip. The client sends key shares along with its ClientHello, and the server can compute the shared secret immediately. TLS 1.3 also removed support for legacy algorithms (RSA key exchange, CBC-mode ciphers, SHA-1) that had known weaknesses. A 0-RTT mode allows resumed sessions to send data immediately, though with replay attack considerations.

## What TLS Provides

**Confidentiality** - Data is encrypted with symmetric ciphers (AES-GCM or ChaCha20-Poly1305), preventing eavesdroppers from reading the content.

**Integrity** - Each record includes an authentication tag (AEAD), detecting any modification in transit.

**Authentication** - The server presents an X.509 certificate signed by a trusted Certificate Authority, proving its identity to the client. Mutual TLS (mTLS) optionally requires the client to present a certificate as well, commonly used for service-to-service communication.

## Certificates and Certificate Authorities

A TLS certificate binds a domain name to a public key. Certificate Authorities (CAs) verify domain ownership before issuing certificates. Let's Encrypt provides free, automated certificates and has dramatically increased HTTPS adoption. Certificate transparency logs provide a public, auditable record of issued certificates to detect misissuance.

## Origins and History

Netscape Communications developed SSL 2.0 in 1995 as the first widely deployed protocol for secure web communication [1]. SSL 3.0 followed in 1996 with significant security improvements. The IETF standardized TLS 1.0 in RFC 2246 (1999) as an evolution of SSL 3.0 [2]. Subsequent versions addressed vulnerabilities: TLS 1.1 (2006), TLS 1.2 (2008) [3], and TLS 1.3 (2018) [4]. SSL 2.0, SSL 3.0, TLS 1.0, and TLS 1.1 are all deprecated due to known vulnerabilities.

## Sources

1. Netscape Communications (1995). "The SSL Protocol Version 2.0." Internet Draft.
2. Dierks, T. & Allen, C. (1999). "The TLS Protocol Version 1.0." RFC 2246. IETF.
3. Dierks, T. & Rescorla, E. (2008). "The Transport Layer Security (TLS) Protocol Version 1.2." RFC 5246. IETF.
4. Rescorla, E. (2018). "The Transport Layer Security (TLS) Protocol Version 1.3." RFC 8446. IETF.
