---
title: "Red Hat OpenShift"
description: "Red Hat OpenShift is an enterprise Kubernetes platform for running containerized applications consistently across on-prem, cloud, and hybrid environments."
date: 2026-06-29
tags: ["kubernetes", "containers", "hybrid-cloud", "infrastructure", "red-hat"]
tool_category: "Infrastructure"
related:
  - glossary/kubernetes
  - tools/openshift-ai
  - tools/ibm-watsonx
  - guides/hybrid-and-multicloud-ai
  - guides/from-zero-to-production
  - guides/multi-cloud-ai-strategy
---

<figure class="bz-figure">
  <img src="/img/enterprise-dark/cubes-modular-dark-notext.png" alt="Dark modular cubes with a red corner glow, representing a container platform built from many coordinated services." loading="lazy">
  <figcaption>OpenShift assembles the many moving parts of a production container platform into one supported, coordinated whole.</figcaption>
</figure>

Red Hat OpenShift is an enterprise application platform built on [Kubernetes](/glossary/kubernetes/). It runs containerized applications the same way across a company data center, public clouds, and the edge. Plain Kubernetes gives you the orchestration engine, but you still have to assemble networking, storage, security, developer tooling, and updates yourself. OpenShift packages those pieces together, ships opinionated security defaults, and backs the result with a long support lifecycle. That makes it a common foundation for regulated enterprises that need portable, hybrid deployments they can support for years.

## Where it sits in the stack

<div class="bz-arch">
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Applications</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Cloud-native apps</span>
      <span class="bz-arch-chip">Traditional workloads</span>
      <span class="bz-arch-chip">Virtual machines</span>
      <span class="bz-arch-chip">AI and ML workloads</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Platform services</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Web console and CLI</span>
      <span class="bz-arch-chip">OpenShift Pipelines</span>
      <span class="bz-arch-chip">OpenShift GitOps</span>
      <span class="bz-arch-chip">Observability</span>
      <span class="bz-arch-chip-note">CI/CD, monitoring, and developer self-service integrated out of the box</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Operators</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">OperatorHub</span>
      <span class="bz-arch-chip">Certified operators</span>
      <span class="bz-arch-chip-note">Automated install, config, and lifecycle for platform and ISV software</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Kubernetes core</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Scheduling</span>
      <span class="bz-arch-chip">Networking</span>
      <span class="bz-arch-chip">Storage</span>
      <span class="bz-arch-chip">Security defaults</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Host and infrastructure</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">RHEL CoreOS</span>
      <span class="bz-arch-chip">On-prem</span>
      <span class="bz-arch-chip">Public cloud</span>
      <span class="bz-arch-chip">Edge</span>
    </div>
  </div>
</div>

## How it fits and how to use it

You can consume OpenShift in two broad ways: run it yourself, or let a cloud provider run it for you.

**Self-managed editions** run on your own infrastructure or in a cloud account you control. Red Hat groups these into OpenShift Kubernetes Engine (an entry-level tier), OpenShift Container Platform (the standard offering), OpenShift Virtualization Engine (focused on running virtual machines alongside containers), and OpenShift Platform Plus (adds advanced multi-cluster management and security). You operate the clusters, and Red Hat provides the software, updates, and support.

**Managed cloud services** hand day-to-day cluster operations to the provider. Red Hat and its cloud partners offer:

- Red Hat OpenShift Service on AWS (ROSA)
- Microsoft Azure Red Hat OpenShift (ARO)
- Red Hat OpenShift Dedicated on Google Cloud
- Red Hat OpenShift on IBM Cloud

The value of OpenShift over assembling raw Kubernetes yourself comes down to four things:

1. **Developer tooling.** A web console, CLI, integrated CI/CD through OpenShift Pipelines and OpenShift GitOps, automated image builds, and self-service provisioning ship with the platform rather than being bolted on later.
2. **Security defaults.** OpenShift applies enterprise-ready security defaults and integrates with Red Hat Enterprise Linux CoreOS as the container host, so clusters start from a hardened baseline instead of a permissive one.
3. **Operators.** OpenShift includes an embedded OperatorHub, a registry of certified operators from Red Hat, ISVs, and open source projects. Operators automate how Kubernetes-native software is installed, configured, and kept running through continuous reconciliation loops.
4. **Supported lifecycle.** Red Hat provides a long support lifecycle, zero-downtime patching, and a dedicated security response team, so a cluster you build today stays supportable for years.

OpenShift is also the platform that [OpenShift AI](/tools/openshift-ai/) builds on. OpenShift AI adds the model training, serving, and lifecycle management layer, while OpenShift provides the underlying container platform, GPU scheduling, and hybrid portability that AI workloads run on. If you plan to move AI projects from experimentation to production across hybrid environments, OpenShift is the foundation and OpenShift AI is the layer above it.

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 1</span>
    <span class="bz-flow-step-name">Provision</span>
    <span class="bz-flow-step-desc">Install a self-managed cluster or spin up a managed service like ROSA or ARO.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 2</span>
    <span class="bz-flow-step-name">Build</span>
    <span class="bz-flow-step-desc">Use OpenShift Pipelines and image builds to turn source code into container images.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 3</span>
    <span class="bz-flow-step-name">Deploy</span>
    <span class="bz-flow-step-desc">Roll out through OpenShift GitOps with security defaults and operator automation applied.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 4</span>
    <span class="bz-flow-step-name">Operate</span>
    <span class="bz-flow-step-desc">Monitor with built-in observability and patch clusters with zero-downtime updates.</span>
  </div>
</div>

## How it compares

| | OpenShift | Plain Kubernetes | Managed Kubernetes (EKS, AKS, GKE) |
|---|---|---|---|
| **What you get** | Complete platform | Orchestration engine | Managed control plane |
| **CI/CD and dev tooling** | Built in | Assemble yourself | Assemble yourself |
| **Security posture** | Hardened defaults | Permissive by default | Provider baseline |
| **Operators registry** | Embedded OperatorHub | Community add-on | Marketplace varies |
| **Support** | Red Hat, long lifecycle | Community | Cloud provider |
| **Portability** | On-prem, cloud, edge | Anywhere you run it | Tied to one cloud |
| **Best for** | Regulated, hybrid enterprises | Teams wanting full control | Teams committed to one cloud |

Managed Kubernetes services from the major clouds handle the control plane for you, but they stop at Kubernetes. You still integrate CI/CD, security, registries, and observability yourself, and each service is specific to its cloud. OpenShift trades some of that per-cloud tuning for a consistent platform and toolset that runs the same way in a data center, on AWS, on Azure, on Google Cloud, and at the edge. That consistency is the point for organizations pursuing a [hybrid and multicloud strategy](/guides/hybrid-and-multicloud-ai/).

## When not to use it

- **A single small app on one cloud.** If you run one service on one provider and never plan to move, a managed Kubernetes service or a simpler platform-as-a-service gets you to [production](/guides/from-zero-to-production/) with less to learn and lower cost.
- **You want the leanest possible stack.** OpenShift adds many integrated components. Teams that prefer to pick each tool themselves and keep the surface area minimal may find plain Kubernetes a better fit.
- **Budget is the hard constraint.** OpenShift subscriptions and the operational skill to run them carry real cost. If you cannot fund a supported platform, community Kubernetes or a managed service may be the pragmatic choice.
- **No hybrid or portability need.** If you are fully committed to one cloud and value its native integrations above portability, that cloud's managed Kubernetes may serve you better than an abstraction layer on top.

## Further reading

- [What is Kubernetes?](/glossary/kubernetes/): the orchestration engine OpenShift is built on.
- [OpenShift AI](/tools/openshift-ai/): the model lifecycle layer that runs on OpenShift.
- [Hybrid and multicloud AI](/guides/hybrid-and-multicloud-ai/): why enterprises spread AI workloads across environments.
- [Multi-cloud AI strategy](/guides/multi-cloud-ai-strategy/): planning workloads across more than one provider.
- [From zero to production](/guides/from-zero-to-production/): taking an application through the deployment lifecycle.
- [Red Hat OpenShift overview](https://www.redhat.com/en/technologies/cloud-computing/openshift): the official product page and consumption models.
- [OpenShift vs Kubernetes](https://www.redhat.com/en/technologies/cloud-computing/openshift/red-hat-openshift-kubernetes): Red Hat's own comparison of the two.

## Sources

- Red Hat OpenShift product overview: https://www.redhat.com/en/technologies/cloud-computing/openshift
- Red Hat OpenShift vs Kubernetes: https://www.redhat.com/en/technologies/cloud-computing/openshift/red-hat-openshift-kubernetes
- Red Hat OpenShift Kubernetes Engine: https://www.redhat.com/en/technologies/cloud-computing/openshift/kubernetes-engine
- What are Red Hat OpenShift Operators: https://www.redhat.com/en/technologies/cloud-computing/openshift/what-are-openshift-operators
