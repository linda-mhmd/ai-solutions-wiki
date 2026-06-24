---
title: "Kubernetes Removes dockershim"
description: "Kubernetes dropped the shim that connected the kubelet to Docker, standardizing on CRI runtimes like containerd while keeping Docker-built images working everywhere."
date: 2026-06-23
categories: [History]
tags: [kubernetes, containers, containerd, docker, cri, infrastructure]
related:
  - explore/it-timeline
  - explore/galaxy
  - history/three-tier
  - history/system-360
faqs:
  - question: "Did removing dockershim break Docker images?"
    answer: "No. Docker builds images in the standard OCI format. Those images run unchanged on containerd, CRI-O, and every other CRI runtime. Only the kubelet's direct link to the Docker daemon went away. The images you built before still work."
  - question: "What replaced dockershim?"
    answer: "CRI-compliant container runtimes. Most clusters moved to containerd, which Docker already used internally. Some chose CRI-O. The kubelet now talks to these runtimes through the Container Runtime Interface instead of a Docker-specific shim."
  - question: "When exactly did this happen?"
    answer: "Kubernetes announced the deprecation for v1.20 on 2 December 2020. The dockershim code was removed in v1.24, released in May 2022. That gave operators roughly eighteen months to migrate their nodes."
---

Kubernetes once shipped a small adapter called dockershim. It let the kubelet, the agent that runs containers on each node, talk to the Docker daemon. In 2020 the project deprecated that adapter, and in 2022 it removed the code, standardizing on runtimes that speak the Container Runtime Interface (CRI) directly.

<figure class="bz-figure"><img src="/img/enterprise-dark/twin-gears-red-notext.png" alt="Two dark interlocking gear clusters with red-lit teeth meshing in low light, suggesting two systems coupled together. Kubernetes once needed an adapter to mesh the kubelet with Docker." loading="lazy"><figcaption>dockershim was the small gear that let the kubelet mesh with Docker until a cleaner interface replaced it.</figcaption></figure>

## What it was

The kubelet needs a container runtime to start, stop, and inspect containers on a node. Early Kubernetes hard-wired support for Docker. As more runtimes appeared, the project defined the Container Runtime Interface, a stable contract any runtime could implement. Docker predates that contract and never spoke CRI natively.

dockershim was the translation layer that filled the gap. It accepted CRI calls from the kubelet and converted them into Docker API calls. Think of it as a phrasebook between two people who speak different languages. The kubelet spoke CRI. Docker spoke its own dialect. dockershim sat in the middle and translated every request.

The catch was who maintained it. The shim lived inside the core Kubernetes codebase, so Kubernetes maintainers carried the burden of keeping a Docker-specific component working, even though Docker itself already used a CRI-capable runtime named containerd under the hood.

<div class="bz-flow">
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Before</span><span class="bz-flow-step-name">kubelet</span><span class="bz-flow-step-desc">Issues container commands using the CRI contract.</span></div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Shim</span><span class="bz-flow-step-name">dockershim</span><span class="bz-flow-step-desc">Translates CRI calls into Docker API calls.</span></div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Runtime</span><span class="bz-flow-step-name">Docker daemon</span><span class="bz-flow-step-desc">Hands work to containerd, which runs the container.</span></div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step"><span class="bz-flow-step-tag">After</span><span class="bz-flow-step-name">containerd direct</span><span class="bz-flow-step-desc">kubelet talks straight to containerd over CRI. No shim.</span></div>
</div>

## Why it mattered

The 2020 announcement caused a wave of confusion. Many operators read "Kubernetes is deprecating Docker" and feared their images would stop running. That fear was misplaced. Docker builds images in the Open Container Initiative (OCI) format, and OCI images run on every CRI runtime. The change touched node runtimes, not image formats.

What actually mattered was operational. Cluster administrators had to confirm which runtime their nodes used and migrate any node still relying on the shim before upgrading to v1.24. Managed services like Amazon EKS, Google GKE, and Azure AKS moved their default nodes to containerd ahead of the deadline, so most cloud users felt little disruption.

The deeper significance was architectural. Removing dockershim proved that Kubernetes meant the CRI contract. A clean interface let new runtimes compete on merit. It cut a tightly coupled dependency out of the core. That is healthy engineering. The project shed code it should not have owned and pushed the ecosystem toward a single, well-defined boundary.

## How it connects to AI today

This story is the foundation of how modern AI workloads run. Almost every large machine learning platform schedules training and inference on Kubernetes, and every one of those clusters now uses a CRI runtime, usually containerd, as the direct result of this transition.

When you run a GPU training job, the kubelet asks containerd to start your container. The NVIDIA device plugin and the NVIDIA Container Toolkit hook into that runtime to expose GPUs to the pod. This GPU passthrough is cleaner because the runtime path is standardized. No Docker daemon sits in the middle adding a translation hop and an extra failure point.

Inference platforms depend on the same plumbing. KServe, Ray on Kubernetes, and Kubeflow all package models as OCI images and let containerd pull and run them. The OCI image format that survived this change is also how teams now ship model artifacts and even model weights, using OCI registries as a distribution channel. A builder meets this history every time they write a Dockerfile, push to a registry, and deploy to a cluster. The Dockerfile still works. Docker the build tool stayed useful. The runtime underneath changed quietly.

Lightweight runtimes that grew from the same CRI ecosystem now serve AI security needs. gVisor and Kata Containers add sandboxing for multi-tenant model serving, where you run untrusted code or isolate customer workloads. None of that flexibility would exist if the kubelet were still wired to one specific daemon.

## Still in use today

This is a settled milestone, not a living component. dockershim is gone from Kubernetes core and will not return. The replacement, CRI plus containerd or CRI-O, is active, maintained, and now the universal default across self-managed and cloud-managed clusters.

containerd is a graduated project of the Cloud Native Computing Foundation and powers the vast majority of production nodes. CRI-O remains the default on OpenShift and other Red Hat distributions. Docker continues as a popular developer tool for building and running images locally. Its build output remains fully compatible with these runtimes.

For a brief window, a community project called cri-dockerd offered an external adapter for teams that still wanted Docker Engine as their node runtime. It moved the maintenance burden out of Kubernetes core. Most clusters never needed it and standardized on containerd instead. The lesson endures: stable interfaces outlast the implementations behind them.

## Further reading

- [IT History Timeline](/explore/it-timeline/): where dockershim removal sits among container and cloud milestones.
- [AI Learning Galaxy](/explore/galaxy/): how container orchestration connects to the broader AI knowledge map.
- [Three-tier architecture](/history/three-tier/): the layered server model that containers and Kubernetes later reshaped.
- [Don't Panic: Kubernetes and Docker](https://kubernetes.io/blog/2020/12/02/dont-panic-kubernetes-and-docker/): the official 2 December 2020 blog post that announced the deprecation.
- [Updated: Dockershim Removal FAQ](https://kubernetes.io/blog/2022/02/17/dockershim-faq/): the Kubernetes project's detailed migration and compatibility guidance.
- [Container Runtime Interface (CRI)](https://kubernetes.io/docs/concepts/architecture/cri/): the official documentation for the contract that replaced the shim.
- [containerd project](https://containerd.io/): the CNCF graduated runtime that most clusters adopted.
