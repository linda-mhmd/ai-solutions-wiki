---
title: "GitOps"
description: "What GitOps is, how it uses Git as the single source of truth for infrastructure and deployments, and practical implementation."
date: 2026-03-28
categories: [Glossary]
tags: [GitOps, deployment, infrastructure-as-code, Kubernetes, CI-CD]
related:
  - glossary/infrastructure-as-code
  - glossary/immutable-infrastructure
  - glossary/kubernetes
  - glossary/helm-chart
last_updated: 2026-05-30
---

GitOps is an operational framework where Git repositories are the single source of truth for both application code and infrastructure configuration. Changes to production systems are made exclusively through Git commits and pull requests. Automated agents reconcile the actual system state with the desired state declared in Git, applying changes automatically and continuously.

## How It Works

The desired state of the system (Kubernetes manifests, Helm values, Terraform configurations) is stored in a Git repository. A GitOps agent (ArgoCD, Flux) continuously compares the actual cluster state to the desired state in Git. When they diverge (because of a new commit or because of manual drift), the agent reconciles by applying the Git-declared state to the cluster.

**Push-based GitOps** - CI pipeline pushes changes to the cluster after a commit (simpler but less secure; CI needs cluster credentials).

**Pull-based GitOps** - an agent running inside the cluster pulls changes from Git (more secure; cluster credentials stay inside the cluster). ArgoCD and Flux use this model.

## Why It Matters

GitOps provides audit trails (every change is a Git commit with author, timestamp, and reason), rollback capability (revert to any previous Git commit), consistency (the cluster always matches what Git declares), and reduced access requirements (developers commit to Git rather than accessing production clusters directly).

For AI platforms with multiple services, models, and configurations, GitOps ensures that the production state is always documented, reviewable, and recoverable.

## Practical Guidance

Use ArgoCD for Kubernetes-based deployments and Flux for lighter-weight setups. Store application configuration separately from application code (different repos or directories) so configuration changes do not trigger code rebuilds. Use pull requests for all changes, including infrastructure, enabling review before deployment. Implement progressive delivery (canary, blue-green) through GitOps tools rather than manual processes. Protect the main branch with required reviews and automated checks.

## Sources

- Limoncelli, T. A. (2018). GitOps: A path to more self-service IT. *ACM Queue, 16*(3). (Introduced and named GitOps; defined Git as the single source of truth for operational state.)
- Weaveworks. (2017). Guide to GitOps. *Weaveworks blog*. (Foundational GitOps definition from the team that created Flux; defined pull-based reconciliation as the core pattern.)
- Humble, J., & Farley, D. (2010). *Continuous Delivery*. Addison-Wesley. (Deployment pipeline practices GitOps implements; audit trails and rollback through version control.)
