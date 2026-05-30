---
title: "Twelve-Factor App"
description: "What the twelve-factor methodology is, how it guides cloud-native application design, and which factors matter most in practice."
date: 2026-03-28
categories: [Glossary]
tags: [twelve-factor, cloud-native, best-practices, DevOps, architecture]
related:
  - glossary/immutable-infrastructure
  - glossary/docker
  - glossary/ci-cd
last_updated: 2026-05-30
---

The twelve-factor app is a methodology for building software-as-a-service applications, published by Heroku co-founder Adam Wiggins in 2011. It defines twelve principles that enable applications to be deployed on cloud platforms with maximum portability, scalability, and operational simplicity. While not all twelve factors apply equally to every application, the methodology remains the foundational reference for cloud-native application design.

## The Twelve Factors

1. **Codebase** - one codebase in version control, many deploys
2. **Dependencies** - explicitly declare and isolate dependencies
3. **Config** - store configuration in environment variables
4. **Backing services** - treat databases, queues, and caches as attached resources
5. **Build, release, run** - strictly separate build, release, and run stages
6. **Processes** - execute the app as stateless processes
7. **Port binding** - export services via port binding
8. **Concurrency** - scale out via the process model
9. **Disposability** - maximize robustness with fast startup and graceful shutdown
10. **Dev/prod parity** - keep development, staging, and production as similar as possible
11. **Logs** - treat logs as event streams
12. **Admin processes** - run admin/management tasks as one-off processes

## Why It Matters

The twelve factors encode the lessons learned from deploying thousands of applications on cloud platforms. Following them produces applications that deploy cleanly on AWS (or any cloud), scale horizontally, and are operationally manageable. Violating them creates applications that are difficult to deploy, fragile under load, and expensive to operate.

## Most Impactful Factors for AI Applications

**Config in environment variables** - AI applications have many configuration values (model IDs, endpoint URLs, feature flags, threshold values). Storing them in environment variables or AWS Systems Manager Parameter Store enables the same code to run across environments.

**Stateless processes** - AI inference services should store no local state between requests. Conversation history, cached results, and session data go in external stores (DynamoDB, Redis). This enables horizontal scaling and zero-downtime deployments.

**Disposability** - containers and Lambda functions start and stop frequently. Fast startup (avoid loading large models on cold start unless using provisioned capacity) and graceful shutdown (complete in-progress requests before terminating) are essential.

**Backing services** - treat the AI model endpoint, vector database, and feature store as attached resources configurable by environment, not hardcoded in application code.

## Sources

- Wiggins, A. (2011). *The Twelve-Factor App*. Heroku. (The original twelve-factor methodology; defines all twelve factors and their rationale.)
- Pivotal. (2015). *Beyond the Twelve-Factor App*. O'Reilly Media. (Extended the twelve-factor app with API-first, telemetry, and security as additional factors for modern cloud-native applications.)
