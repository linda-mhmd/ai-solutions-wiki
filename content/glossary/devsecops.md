---
title: "DevSecOps"
description: "What DevSecOps means, how it integrates security into every stage of CI/CD, and why shifting security left is essential for AI/ML systems handling sensitive data and models."
date: 2026-03-28
categories: [Glossary]
tags: [devsecops, security, ci-cd, vulnerability-scanning, compliance]
related:
  - guides/devsecops-ai
  - guides/ci-cd-for-ai
  - patterns/compliance-as-code
last_updated: 2026-05-30
---

DevSecOps integrates security practices into every phase of the software development lifecycle rather than treating security as a final gate before production. The name combines Development, Security, and Operations to signal that security is a shared responsibility, not a separate team's problem.

<figure class="bz-figure">
  <img src="/img/craft/workbench-shift-left-security-text.png" alt="A workbench with security tools integrated into the development workflow: security checks happening early, not as an afterthought." loading="lazy">
  <figcaption>DevSecOps shifts security left. Instead of a final gate before production, security tools are integrated into the workbench where code is written. Problems are caught early, when they are cheap to fix.</figcaption>
</figure>

In traditional workflows, a security review happens late - after code is written, tested, and staged. Findings at that point are expensive to fix and create friction between teams. DevSecOps shifts security left: scanning dependencies during development, checking infrastructure-as-code before deployment, and running dynamic analysis in staging.

## Key Practices

**Static Application Security Testing (SAST)** - Analyses source code for vulnerabilities without executing it. Tools like Semgrep, SonarQube, and CodeQL run in CI pipelines on every pull request. For AI projects, SAST catches hardcoded API keys, insecure deserialization of model files (pickle), and SQL injection in data pipelines.

**Software Composition Analysis (SCA)** - Scans dependencies for known vulnerabilities. Dependabot, Snyk, and Grype check your requirements.txt, package.json, or Dockerfile against CVE databases. ML projects carry heavy dependency trees (PyTorch, TensorFlow, CUDA libraries) where vulnerabilities are common.

**Dynamic Application Security Testing (DAST)** - Tests running applications by sending crafted requests. OWASP ZAP and Burp Suite probe API endpoints for injection, authentication bypass, and data exposure. For AI APIs, DAST can test prompt injection vectors and model endpoint authentication.

**Infrastructure as Code Scanning** - Checkov, tfsec, and OPA validate Terraform, CloudFormation, and Kubernetes manifests against security policies. Catches overly permissive IAM roles, unencrypted storage, and public-facing endpoints before they reach production.

**Container Image Scanning** - Trivy, Grype, and ECR native scanning check container images for OS-level and application-level vulnerabilities. AI inference containers often use large base images with CUDA drivers, increasing the attack surface.

**Secrets Detection** - GitLeaks, TruffleHog, and GitHub secret scanning identify leaked credentials in code and commit history. AI projects frequently handle API keys for model providers, cloud services, and data sources.

## Why DevSecOps Matters for AI Systems

AI systems amplify security concerns. Models trained on sensitive data can memorise and leak that data. Model files serialised with pickle can execute arbitrary code when loaded. Inference endpoints often have elevated permissions to access data stores. Prompt injection can manipulate model behaviour.

DevSecOps ensures that these AI-specific risks are addressed continuously, not as an afterthought.

## Sources

- Kim, G., Humble, J., Debois, P., & Willis, J. (2016). *The DevOps Handbook*. IT Revolution Press. (Foundational DevOps reference; Chapter 20 covers integrating security into the deployment pipeline.)
- OWASP Foundation. (2021). *OWASP Top 10: 2021*. OWASP. (Standard application security risk reference; SAST/DAST tools in DevSecOps pipelines are evaluated against these categories.)
- National Institute of Standards and Technology. (2022). *NIST SP 800-218: Secure Software Development Framework (SSDF)*. (Federal guidance on integrating security throughout the software development lifecycle; basis for DevSecOps compliance programs.)
