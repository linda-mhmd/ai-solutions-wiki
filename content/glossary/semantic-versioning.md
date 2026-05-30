---
title: "Semantic Versioning"
description: "What semantic versioning is, how MAJOR.MINOR.PATCH communicates change impact, and best practices for versioning APIs and models."
date: 2026-03-28
categories: [Glossary]
tags: [semantic-versioning, semver, API, versioning, release-management]
related:
  - glossary/contract-testing
  - glossary/ci-cd
  - glossary/api
last_updated: 2026-05-30
---

Semantic versioning (semver) is a versioning scheme that uses a three-part number - MAJOR.MINOR.PATCH - to communicate the nature and impact of changes. Each component has a specific meaning: incrementing MAJOR signals breaking changes, MINOR signals backward-compatible new features, and PATCH signals backward-compatible bug fixes.

## How It Works

Given version 2.3.1:
- **PATCH** increment (2.3.2) - bug fix, no API changes, safe to upgrade automatically
- **MINOR** increment (2.4.0) - new feature, backward compatible, existing integrations continue working
- **MAJOR** increment (3.0.0) - breaking change, existing integrations may need updates

Pre-release versions (2.4.0-beta.1) and build metadata (2.4.0+build.123) extend the scheme for development and CI workflows.

## Why It Matters

Semantic versioning creates a shared understanding between producers and consumers of software about what kind of change a new version represents. API consumers can automatically adopt patch and minor updates with confidence while flagging major updates for manual review.

For AI platforms, versioning applies to APIs (endpoint contracts), models (model performance and behavior), client libraries (SDK compatibility), and infrastructure modules (Terraform modules, Helm charts).

## Versioning AI Models

AI models present a unique versioning challenge because model behavior can change significantly without any API change. A model that returns the same response format (no API breaking change) but produces different predictions (behavior change) is a functional breaking change even though the semver rules based on API compatibility would suggest a minor or patch update.

Consider a model versioning strategy that accounts for both API compatibility and behavioral compatibility. Some teams use separate version tracks: API version (v1, v2) for endpoint contracts and model version (2024-03-15) for the underlying model.

## Practical Guidance

Adopt semver for all shared interfaces: APIs, libraries, infrastructure modules. Automate version bumps based on commit message conventions (Conventional Commits). For internal services with a single consumer, strict semver may be unnecessary overhead. For public APIs or shared libraries, semver is essential for managing consumer expectations and enabling safe automated upgrades.

## Sources

- Preston-Werner, T. (2013). *Semantic Versioning 2.0.0*. semver.org. (The official specification defining major, minor, and patch versioning semantics and compatibility guarantees.)
- Raemaekers, S., van Deursen, A., & Visser, J. (2014). Semantic versioning versus breaking changes: A study of the Maven repository. *2014 IEEE 14th International Working Conference on Source Code Analysis and Manipulation*, 215–224. (Empirical study of semver compliance in practice; how often packages actually follow their stated versioning semantics.)
- Conventional Commits Authors. (2019). *Conventional Commits 1.0.0*. conventionalcommits.org. (Commit message convention for automating semver version bumps; directly integrates with CI pipelines.)
