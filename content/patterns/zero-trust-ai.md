---
title: "Zero Trust for AI Model Serving"
description: "Applying zero trust architecture to AI systems: securing inference endpoints, model artifact access, training data, and service-to-service communication in ML pipelines."
date: 2026-03-28
categories: [Patterns]
tags: [zero-trust, security, model-serving, authentication, authorization, ai-engineering]
related:
  - glossary/zero-trust
  - glossary/devsecops
  - guides/devsecops-ai
  - patterns/compliance-as-code
last_updated: 2026-05-30
---

Traditional perimeter-based security assumes that internal services are trustworthy. In AI systems, this assumption is dangerous. A compromised inference service can exfiltrate model weights (valuable intellectual property). A compromised data pipeline can poison training data. A prompt injection can manipulate model behaviour from outside the perimeter. Zero trust for AI applies "never trust, always verify" to every layer of the ML stack.

## Threat Model for AI Systems

Before applying zero trust, understand what you are protecting:

- **Model artifacts** - Trained weights represent significant investment. Unauthorized access enables model theft or tampering.
- **Training data** - Often contains sensitive information (PII, proprietary data, licensed content). Unauthorised access creates compliance violations.
- **Inference endpoints** - Accept user input that can be adversarial (prompt injection). Produce outputs that may leak training data.
- **Feature stores** - Contain derived data that reveals business logic and customer behaviour.
- **Model registry** - Controls which models are deployed. Compromising the registry enables deploying malicious models.

## Identity and Authentication

### Service Identity

Every component in the ML pipeline gets a verified identity. No shared credentials, no long-lived API keys:

- **Kubernetes Service Accounts** with IRSA (IAM Roles for Service Accounts) or Pod Identity for AWS resource access
- **SPIFFE/SPIRE** for workload identity in multi-cluster or multi-cloud environments
- **Short-lived tokens** issued by the identity provider, rotated automatically

### Mutual TLS (mTLS)

All service-to-service communication is encrypted and mutually authenticated:

```yaml
# Istio PeerAuthentication - require mTLS for all ML services
apiVersion: security.istio.io/v1beta1
kind: PeerAuthentication
metadata:
  name: ml-services-mtls
  namespace: ml-inference
spec:
  mtls:
    mode: STRICT
```

The inference service authenticates the API gateway. The API gateway authenticates the inference service. Neither blindly trusts the other because they share a network.

## Authorization Policies

### Least-Privilege Access

Define granular authorization policies for each ML component:

```yaml
# Istio AuthorizationPolicy - inference service can only call model registry and feature store
apiVersion: security.istio.io/v1beta1
kind: AuthorizationPolicy
metadata:
  name: inference-service-policy
  namespace: ml-inference
spec:
  selector:
    matchLabels:
      app: inference-service
  rules:
    - from:
        - source:
            principals: ["cluster.local/ns/ml-api/sa/api-gateway"]
      to:
        - operation:
            methods: ["POST"]
            paths: ["/v1/predict", "/v1/stream"]
```

The inference service:
- Can be called only by the API gateway
- Can call the model registry (read-only) and feature store (read-only)
- Cannot access training data, the model training pipeline, or production databases
- Cannot make outbound internet requests

### Data Access Controls

Training data access is scoped by purpose:

- **Training pipelines** can read training data buckets but not production data
- **Inference services** can read the feature store but not raw training data
- **Evaluation pipelines** can read test datasets but not production user data
- **No component** has write access to data it does not produce

Implement with IAM policies, bucket policies, and database row-level security.

## Securing Model Artifacts

Model artifacts in the registry are signed and verified:

1. The training pipeline signs the model artifact with a cryptographic signature after training and evaluation pass
2. The deployment pipeline verifies the signature before deploying
3. The inference service verifies the model checksum at load time
4. Unsigned or tampered models are rejected

This prevents supply chain attacks where a malicious model is substituted into the registry.

## Input Validation and Output Filtering

Zero trust extends to the data flowing through the system:

- **Input validation** - Reject malformed requests, enforce input size limits, sanitise prompts against known injection patterns
- **Output filtering** - Scan model outputs for PII leakage, check for known sensitive patterns, enforce output format constraints
- **Audit logging** - Log every inference request and response (or a representative sample) for security review

## Continuous Monitoring

Zero trust requires continuous verification, not one-time checks:

- Monitor service-to-service traffic patterns. Alert on unexpected communication paths.
- Track model registry access. Alert when a service account accesses models it has not accessed before.
- Log and audit all data access. Detect unusual query patterns or bulk data extraction.
- Monitor inference inputs for adversarial patterns at scale.

Zero trust for AI is not a product you buy. It is a set of principles applied consistently across identity, network, data, and application layers. Start with mTLS and service identity. Add authorization policies. Layer in data access controls and artifact signing. Each layer reduces the blast radius of a compromise.
