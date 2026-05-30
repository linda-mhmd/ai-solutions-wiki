---
title: "Immutable Infrastructure"
description: "What immutable infrastructure means, how it replaces mutable servers with disposable instances, and why it improves reliability."
date: 2026-03-28
categories: [Glossary]
tags: [immutable-infrastructure, DevOps, infrastructure-as-code, deployment, containers]
related:
  - glossary/infrastructure-as-code
  - glossary/docker
  - glossary/gitops
  - glossary/twelve-factor-app
last_updated: 2026-05-30
---

Immutable infrastructure is the practice of never modifying servers or containers after deployment. Instead of patching, updating, or configuring running systems, you build a new image (AMI, container image) with the desired state and replace the old instances entirely. Infrastructure is treated as disposable and replaceable, not as long-lived pets to be maintained.

## How It Works

The workflow for changes is: modify the configuration or code, build a new image, test the image, deploy by replacing existing instances with new ones running the updated image. The old instances are terminated. No SSH access, no in-place patches, no configuration drift.

On AWS, this translates to: build AMIs with Packer or container images with Docker, deploy through auto-scaling group instance refresh or ECS service update, and terminate old instances automatically. Blue-green and canary deployment strategies make the replacement safe and reversible.

## Why It Matters

Mutable infrastructure accumulates configuration drift: manual patches, ad-hoc configuration changes, and undocumented modifications make each server unique and unreproducible. When something fails, you cannot reliably recreate the server's exact state. Debugging is difficult because the running state may not match any documented configuration.

Immutable infrastructure eliminates drift by definition. Every instance running the same image is identical. If an instance fails, a new identical instance replaces it automatically. The image is the single source of truth for what is running in production.

## Practical Benefits

**Reproducibility** - any instance can be exactly recreated from the image.

**Rollback** - reverting to the previous version means deploying the previous image, not trying to undo changes on running servers.

**Security** - no SSH access needed to production servers eliminates a major attack vector. Patches are applied by building a new image, not by accessing running systems.

**Consistency** - no snowflake servers with unique, undocumented configurations.

## Practical Guidance

Use containers (Docker + ECS/EKS) as the primary mechanism for immutable deployments. Store all configuration in environment variables, parameter store, or config maps - never baked into images. Automate image building in CI/CD pipelines. Disable SSH access to production instances. For AI inference endpoints, immutable deployment means updating the model by deploying a new container image with the new model, not by replacing model files on a running server.

## Sources

- Morris, K. (2016). *Infrastructure as Code*. O'Reilly Media. Chapter 8: Immutable infrastructure. (Immutable server pattern vs. mutable server anti-pattern; golden image pipeline and blue-green deployments.)
- Humble, J., & Farley, D. (2010). *Continuous Delivery*. Addison-Wesley. Chapter 5: Anatomy of the Deployment Pipeline. (Immutable deployments through pipeline stages; the relationship between immutable infrastructure and continuous delivery.)
- Rebentisch, E. (2017). Immutable infrastructure: The key to scaling containers. *Docker Blog*. (Container-based immutable infrastructure patterns; Docker image as the immutable artifact replacing traditional server management.)
