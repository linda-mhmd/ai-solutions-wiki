---
title: "AI Supply Chain Security"
description: "Verifying model weights, scanning dependencies, and securing the end-to-end supply chain for AI artifacts from training to deployment."
date: 2026-03-28
categories: [Patterns]
tags: [supply-chain, security, model-weights, dependency-scanning, sbom, ai-engineering]
related:
  - patterns/model-lineage
  - patterns/ai-governance
  - patterns/policy-as-code-ml
  - patterns/llmops-pipeline
last_updated: 2026-05-30
---

AI systems depend on artifacts that traditional software supply chain security does not cover: pretrained model weights, tokenizer files, embedding models, dataset snapshots, and specialized inference runtimes. A compromised model weight file can introduce backdoors that are invisible to standard code review. AI supply chain security extends software supply chain practices to cover these AI-specific artifacts.

## Attack Surface

**Poisoned model weights** - An attacker modifies pretrained weights to introduce a backdoor that activates on specific trigger inputs. The model performs normally on standard benchmarks but produces attacker-controlled outputs when the trigger is present. Weight files downloaded from public repositories without verification are vulnerable.

**Malicious serialization** - Pickle files, the default serialization format for many ML frameworks, can execute arbitrary code on deserialization. A model file that appears to contain only weights can run arbitrary Python when loaded. This is a direct remote code execution vector.

**Compromised dependencies** - ML pipelines depend on Python packages, CUDA libraries, and framework extensions. A typosquatted or compromised package in the dependency chain can exfiltrate training data or inject backdoors during training.

**Dataset poisoning** - Training data sourced from untrusted origins can contain examples specifically designed to introduce biased or malicious behavior into the trained model.

## Defense Strategies

**Model weight verification** - Publish and verify cryptographic hashes for all model artifacts. Use sigstore or similar signing infrastructure to establish provenance. Before loading any model file, verify its hash against a trusted manifest. Reject unsigned or unverified weights.

**Safe serialization formats** - Use safetensors or ONNX instead of pickle for model weight storage. These formats contain only tensor data and cannot execute code on load. Enforce this as a policy in your model registry.

**Dependency scanning and pinning** - Pin all Python dependencies with exact versions and hash verification. Scan the dependency tree for known vulnerabilities using tools like pip-audit or Safety. Run dependency resolution in an isolated environment and audit new packages before adding them.

**SBOM for AI** - Generate a software bill of materials that includes not just code dependencies but also model provenance, training data lineage, and hardware environment details. This AI-specific SBOM enables auditors to trace any deployed model back to its full supply chain.

**Isolated build environments** - Train and build models in air-gapped or network-restricted environments. Prevent training jobs from making outbound network calls that could exfiltrate data. Use container images built from verified base layers.

## Operational Practices

Integrate supply chain checks into your CI/CD pipeline as blocking gates. No model artifact proceeds to staging or production without passing provenance verification, vulnerability scanning, and format validation. Treat a failed supply chain check with the same severity as a failed security scan in traditional software.
