---
title: "Zero Trust Architecture"
description: "What zero trust means, how it replaces perimeter-based security, and why AI model serving and data access require zero trust principles."
date: 2026-03-28
categories: [Glossary]
tags: [zero-trust, security, authentication, authorization, networking]
related:
  - patterns/zero-trust-ai
  - glossary/devsecops
  - guides/devsecops-ai
last_updated: 2026-05-30
---

Zero trust is a security model based on the principle "never trust, always verify." Instead of assuming that entities inside a network perimeter are trustworthy, zero trust requires every request to be authenticated, authorised, and encrypted regardless of where it originates.

Traditional perimeter security creates a hard outer shell and a soft interior. Once an attacker breaches the perimeter (or a compromised insider is already inside), they can move laterally with minimal resistance. Zero trust eliminates this assumption.

## Core Principles

**Verify Explicitly** - Every request is authenticated and authorised based on all available data points: user identity, device health, location, resource sensitivity, and anomaly signals. No request gets a free pass because it came from an internal IP.

**Least Privilege Access** - Grant the minimum permissions needed for the task at hand. Use just-in-time and just-enough-access policies. An ML engineer who needs to deploy a model should not have permanent access to production databases.

**Assume Breach** - Design systems as if an attacker is already inside the network. Segment access, encrypt all traffic (including east-west within the data centre), and monitor continuously for anomalous behaviour.

## Key Components

**Identity Provider** - Centralised authentication (Okta, Azure AD, AWS IAM Identity Center). Every human and service authenticates through the identity provider. No shared credentials, no long-lived API keys.

**Service Mesh** - Istio, Linkerd, or AWS App Mesh provide mutual TLS (mTLS) between services automatically. Every service-to-service call is encrypted and authenticated. The mesh enforces authorisation policies at the network level.

**Policy Engine** - Open Policy Agent (OPA), Cedar, or AWS Verified Permissions evaluate access decisions against fine-grained policies. Policies are code, versioned, tested, and deployed through CI/CD.

**Micro-Segmentation** - Network segmentation at the workload level rather than the subnet level. An inference service can communicate with the model registry but not with the billing database, enforced by network policy.

**Continuous Monitoring** - Every access decision is logged. Anomaly detection identifies unusual patterns: a service account accessing data it has never accessed before, a spike in API calls from a single identity, or access from an unusual location.

## Zero Trust for AI

AI systems present unique security challenges. Models may contain memorised training data. Inference endpoints accept free-form input (prompt injection). Model artifacts are valuable intellectual property. Training data often includes sensitive information. Zero trust principles applied to AI systems ensure that model access, data access, and inference endpoints are protected at every layer.

## Sources

- Rose, S., et al. (2020). *Zero Trust Architecture*. NIST SP 800-207. (US government definition and architecture principles for zero trust; the authoritative framework reference.)
- Kindervag, J. (2010). *Build security into your network's DNA: The zero trust network architecture*. Forrester Research. (Coined "zero trust" and defined the "never trust, always verify" principle.)
- National Security Agency. (2021). *Embracing a zero trust security model*. NSA. (NSA guidance on zero trust implementation for critical systems; directly relevant for AI infrastructure handling sensitive data.)
