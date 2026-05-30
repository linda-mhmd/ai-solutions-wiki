---
title: "Security Scanning in AI/ML CI/CD Pipelines"
description: "How to integrate security scanning into AI/ML CI/CD pipelines: dependency scanning, container image analysis, model file validation, secrets detection, and infrastructure-as-code checks."
date: 2026-03-28
categories: [Guides]
tags: [devsecops, security, ci-cd, vulnerability-scanning, ai-engineering]
related:
  - glossary/devsecops
  - guides/ci-cd-for-ai
  - patterns/compliance-as-code
last_updated: 2026-05-30
---

AI/ML projects carry security risks that standard application security scanning does not cover: pickle deserialization attacks in model files, excessive permissions for training jobs, sensitive data in training datasets, and prompt injection vulnerabilities. A DevSecOps pipeline for AI extends standard security scanning with ML-specific checks.

## Pipeline Security Stages

Integrate security checks at every stage rather than adding a single security gate at the end.

### Pre-Commit: Local Checks

Install pre-commit hooks that catch issues before code reaches the repository:

```yaml
# .pre-commit-config.yaml
repos:
  - repo: https://github.com/gitleaks/gitleaks
    rev: v8.18.0
    hooks:
      - id: gitleaks
  - repo: https://github.com/PyCQA/bandit
    rev: 1.7.7
    hooks:
      - id: bandit
        args: ["-c", "pyproject.toml"]
```

Bandit catches common Python security issues: use of `eval()`, insecure random number generation, and hardcoded passwords. Gitleaks detects API keys and credentials before they enter the commit history.

### CI: Automated Scanning

Run these checks on every pull request:

**Dependency Scanning** - Scan `requirements.txt`, `pyproject.toml`, and lock files for known vulnerabilities. ML projects depend on packages with large native code surfaces (PyTorch, TensorFlow, numpy, scipy) where CVEs are common.

```yaml
- name: Scan dependencies
  uses: aquasecurity/trivy-action@master
  with:
    scan-type: 'fs'
    scan-ref: '.'
    severity: 'HIGH,CRITICAL'
    exit-code: '1'
```

**Static Analysis** - Semgrep with ML-specific rules catches unsafe deserialization, SQL injection in data pipelines, and insecure API configurations:

```yaml
- name: Semgrep scan
  uses: returntocorp/semgrep-action@v1
  with:
    config: >-
      p/python
      p/security-audit
      p/owasp-top-ten
```

**Model File Validation** - Reject pickle files in favour of safer serialization formats. Scan model artifacts for known malicious patterns:

```python
# In CI pipeline
def validate_model_format(path):
    """Reject pickle, accept safetensors or ONNX."""
    if path.suffix in ('.pkl', '.pickle'):
        raise SecurityError(
            f"Pickle files are not allowed: {path}. "
            "Use safetensors or ONNX format."
        )
```

**Infrastructure-as-Code Scanning** - Checkov or tfsec validates Terraform and Kubernetes manifests:

```yaml
- name: Checkov IaC scan
  uses: bridgecrewio/checkov-action@master
  with:
    directory: infrastructure/
    framework: terraform,kubernetes
```

### Container Image Scanning

AI inference containers often use large base images with CUDA drivers, increasing the attack surface. Scan images after build:

```yaml
- name: Build image
  run: docker build -t inference-service:${{ github.sha }} .

- name: Scan image
  uses: aquasecurity/trivy-action@master
  with:
    image-ref: 'inference-service:${{ github.sha }}'
    severity: 'HIGH,CRITICAL'
    exit-code: '1'
```

Reduce the attack surface by using minimal base images. Use `nvidia/cuda:12.x-runtime-ubuntu22.04` instead of the full development image. Multi-stage builds keep build tools out of the final image.

### Secrets Management

AI projects handle numerous credentials: model provider API keys, database connections for feature stores, cloud storage credentials for training data. Never store them in code or environment files.

- Use AWS Secrets Manager or HashiCorp Vault for runtime secrets
- Use GitHub Actions secrets or OIDC federation for CI/CD credentials
- Rotate API keys for model providers regularly
- Audit secret access logs for anomalous patterns

## AI-Specific Security Concerns

**Training Data Leakage** - Models can memorise and regurgitate training data. Scan training datasets for PII before training. Use differential privacy techniques for sensitive data. Document data provenance in the model card.

**Prompt Injection** - LLM-based services are vulnerable to prompt injection. Include prompt injection test cases in your CI evaluation suite. Test with adversarial inputs that attempt to override system instructions.

**Model Supply Chain** - Models downloaded from Hugging Face or other hubs can contain malicious code. Verify model checksums, prefer safetensors format, and scan model files before loading.

**Excessive Permissions** - Training jobs often run with overly broad IAM roles. Apply least-privilege: the training job needs read access to the training bucket and write access to the artifact bucket. It does not need access to production databases.

## Balancing Security and Velocity

Security scanning adds pipeline time. Manage this by running fast checks (linting, secrets detection) on every commit and slower checks (full image scan, DAST) on merge to main. Cache scan results for unchanged dependencies. Set severity thresholds: fail on critical and high, warn on medium, ignore low.

The goal is not zero vulnerabilities. It is continuous visibility and rapid remediation of the vulnerabilities that matter.
