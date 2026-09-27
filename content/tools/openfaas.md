---
title: "OpenFaaS - Serverless Functions Made Simple"
description: "OpenFaaS is a framework for building and deploying serverless functions and microservices on Kubernetes or a single host with faasd."
date: 2026-03-28
categories: [Tools]
tags: [open-source, serverless, faas, functions, kubernetes, docker]
related:
  - tools/aws-lambda
  - tools/knative
  - tools/temporal
last_updated: 2026-09-25
lastmod: 2026-09-25
last_verified: 2026-09-25
---

OpenFaaS (Functions as a Service) is a framework that makes it simple to deploy serverless functions and existing microservices to Kubernetes (including K3s and OpenShift) or to a single host with faasd. Docker Swarm support was dropped years ago; the `faas-swarm` provider is archived. Its design philosophy emphasizes simplicity and developer experience: any process that can be packaged in a Docker container can be deployed as a function on OpenFaaS, supporting any programming language or binary. This container-first approach avoids the language-specific constraints of many FaaS platforms and makes it straightforward to migrate existing services to a serverless model.

OpenFaaS provides a complete function lifecycle: a CLI and UI for building, deploying, and invoking functions; an API gateway that handles routing, metrics collection, and auto-scaling; a built-in Prometheus-based auto-scaler that scales functions from zero to many replicas based on request rate or queue depth; and an asynchronous invocation system backed by NATS JetStream (earlier versions used NATS Streaming) for long-running tasks. Functions are defined using templates that provide language-specific scaffolding, with official templates for Node.js, Python, Go, Java, C#, Ruby, and PHP. The watchdog component handles HTTP request/response mediation between the gateway and function processes.

OpenFaaS has been adopted by developers and organizations seeking a simpler alternative to Knative for running functions on Kubernetes. Its lower operational complexity and gentle learning curve make it popular for smaller teams and edge computing scenarios. OpenFaaS Ltd sells OpenFaaS Standard (listed at $1,250 per month in September 2026) and OpenFaaS for Enterprises, which add enhanced auto-scaling, single sign-on, event connectors such as Kafka, and support; OpenFaaS Edge (faasd-pro) covers single-host deployments.

**Licensing caution:** OpenFaaS Community Edition is not a permissively licensed open-source product for commercial use. Contributions from Alex Ellis and OpenFaaS Ltd are licensed under the OpenFaaS CE EULA (third-party contributions remain MIT), and OpenFaaS states that CE is for proofs of concept, non-production, or experimental use, limited to 15 functions and public function repositories, with a 60-day limit on commercial use of its binaries and images. Production commercial use needs a paid license.

## Key Capabilities

- **Any Container as a Function** - Deploy any Docker container as a serverless function, supporting all languages, frameworks, and binaries
- **Auto-Scaling** - Prometheus-driven scaling from zero to thousands of replicas based on requests per second or queue depth
- **Async Invocations** - Built-in asynchronous function execution via NATS JetStream for long-running tasks with callback support
- **Developer CLI** - faas-cli for building, pushing, deploying, and invoking functions with YAML-based stack definitions

## Cloud Equivalents

OpenFaaS is the open-source alternative to AWS Lambda, Azure Functions, and Google Cloud Functions. Cloud FaaS platforms offer deeper ecosystem integration and true pay-per-invocation pricing, while OpenFaaS provides language-agnostic function deployment on any Kubernetes cluster with no cold start penalties for pre-scaled functions.

## Origins and History

OpenFaaS was created by Alex Ellis in December 2016, initially as a proof of concept for running serverless functions on Docker Swarm. The project was open-sourced in 2017 and quickly gained popularity, accumulating over 25,000 GitHub stars. OpenFaaS was originally released under the MIT License; the Community Edition has since moved to the OpenFaaS CE EULA for contributions from OpenFaaS Ltd, and commercial use requires a license. Ellis founded OpenFaaS Ltd to provide commercial support and the Pro edition. The project later added full Kubernetes support via the faas-netes provider, which became the primary deployment target.

## Sources

1. https://www.openfaas.com/
2. https://github.com/openfaas/faas (LICENSE: OpenFaaS CE EULA plus MIT for third-party contributions)
3. OpenFaaS. Plans and pricing (CE limits, Standard, Enterprises). https://www.openfaas.com/pricing/
4. OpenFaaS docs. Asynchronous functions (NATS JetStream). https://docs.openfaas.com/reference/async/
5. OpenFaaS docs. Deployment (Kubernetes, K3s, OpenShift, faasd). https://docs.openfaas.com/deployment/
