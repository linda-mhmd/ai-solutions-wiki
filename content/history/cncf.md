---
title: "Cloud Native Computing Foundation (2015)"
description: "A Linux Foundation body that hosts and governs vendor-neutral cloud-native open-source projects, starting with Kubernetes, and shapes how modern software runs on cloud infrastructure."
date: 2026-06-23
categories: [History]
tags: [computing-history, cncf, kubernetes, cloud-native, open-source, containers, linux-foundation]
related:
  - explore/it-timeline
  - explore/galaxy
  - history/salesforce-saas
  - history/ethernet
  - history/arpanet
faqs:
  - question: "What is the Cloud Native Computing Foundation?"
    answer: "The Cloud Native Computing Foundation, or CNCF, is a nonprofit hosted under the Linux Foundation. It holds the trademarks and copyrights for a set of cloud-native open-source projects and gives them neutral governance, so no single company controls them. It launched on 21 June 2015 with Kubernetes as its first project. Today it hosts dozens of projects covering containers, networking, observability, storage, and security. Companies, not individuals, become members and fund the work, but the technical direction stays community-driven."
  - question: "What does cloud-native mean?"
    answer: "Cloud-native describes software designed from the start to run on elastic cloud infrastructure rather than fixed servers. Such applications package their code into containers, run many small services instead of one large program, and scale up or down automatically as demand changes. Orchestration tools like Kubernetes schedule those containers across a cluster of machines and restart them when one fails. The CNCF coined no single rigid definition, but its projects together form the standard toolkit for building and running this kind of software."
  - question: "Is the CNCF still active in 2026?"
    answer: "Yes. The CNCF is very active and one of the largest open-source foundations in the world. It hosts well over a hundred projects, runs the KubeCon and CloudNativeCon conferences across several regions each year, and certifies engineers through programs like the Certified Kubernetes Administrator exam. Kubernetes remains its flagship and is now a default substrate for running containers, including the workloads that serve modern AI models. New projects keep joining its sandbox and incubation tiers."
---

The Cloud Native Computing Foundation, or CNCF, is a nonprofit that hosts and governs cloud-native open-source projects under the Linux Foundation. It launched on 21 June 2015 with Kubernetes as its seed project. By giving these projects vendor-neutral homes, it lets rival companies build on shared infrastructure without any one of them owning the result.

<figure class="bz-figure"><img src="/img/enterprise-dark/server-room-corridor-notext.png" alt="A dark server room corridor lined with red-lit equipment racks receding into the distance. The image evokes the large clusters of machines that cloud-native software runs across, the kind Kubernetes and other CNCF projects coordinate." loading="lazy"><figcaption>The CNCF governs the software that turns rows of servers like these into one elastic, self-healing platform.</figcaption></figure>

## What it was

By 2015, containers had changed how software shipped. Docker, released in 2013, let developers package an application with everything it needed into one portable unit. But running thousands of containers across many machines was hard. Something had to decide where each container ran, restart failed ones, and route traffic to them.

Google had solved this internally with a system called Borg. It rebuilt the ideas as an open-source project named Kubernetes and released it in 2014. The risk was clear. A single company controlling such a foundational tool would scare off competitors. So Google donated Kubernetes to a new neutral body, and the CNCF was born.

The CNCF does not write most of the code itself. It holds the trademarks, funds shared services, and provides governance. Projects move through tiers as they mature: sandbox for early work, incubation for growing adoption, and graduated for proven, widely used software. Maintainers come from many companies, and decisions follow community process, not one vendor's roadmap.

Think of it as a conservation trust for shared land. Many farms border one forest. Rather than let the biggest farm fence it off, they place the forest in a trust. Everyone keeps using it, rules are public, and no single owner can lock the gate.

<div class="bz-flow">
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Step 1</span><span class="bz-flow-step-name">Sandbox</span><span class="bz-flow-step-desc">A new project joins for early experiments, gaining a neutral home and basic support.</span></div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Step 2</span><span class="bz-flow-step-name">Incubation</span><span class="bz-flow-step-desc">The project shows real production users and a healthy community of contributors.</span></div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Step 3</span><span class="bz-flow-step-name">Graduated</span><span class="bz-flow-step-desc">It passes a security audit and proves broad adoption, becoming a trusted standard.</span></div>
</div>

## Why it mattered

The CNCF gave the cloud-native ecosystem a center of gravity. Before it, every cloud vendor had an incentive to push its own proprietary orchestration. That would have split the market and locked customers in. Neutral stewardship of Kubernetes meant Amazon, Google, Microsoft, and others could all support the same platform.

That shared base accelerated everything. Kubernetes became the standard way to run containers within a few years. Around it grew a stack of complementary projects that each filled a gap.

<div class="bz-arch">
  <div class="bz-arch-layer"><span class="bz-arch-layer-label">Orchestration</span><div class="bz-arch-layer-content"><span class="bz-arch-chip">Kubernetes</span><span class="bz-arch-chip-note">Schedules and heals containers across a cluster</span></div></div>
  <div class="bz-arch-layer"><span class="bz-arch-layer-label">Networking</span><div class="bz-arch-layer-content"><span class="bz-arch-chip">Envoy</span><span class="bz-arch-chip">CoreDNS</span><span class="bz-arch-chip-note">Routes and resolves traffic between services</span></div></div>
  <div class="bz-arch-layer"><span class="bz-arch-layer-label">Observability</span><div class="bz-arch-layer-content"><span class="bz-arch-chip">Prometheus</span><span class="bz-arch-chip">OpenTelemetry</span><span class="bz-arch-chip-note">Collects metrics and traces from running systems</span></div></div>
  <div class="bz-arch-layer"><span class="bz-arch-layer-label">Packaging</span><div class="bz-arch-layer-content"><span class="bz-arch-chip">Helm</span><span class="bz-arch-chip">containerd</span><span class="bz-arch-chip-note">Packages apps and runs container images</span></div></div>
</div>

The foundation also built trust through process. Graduated projects pass independent security audits. Public governance documents spell out how maintainers are chosen. KubeCon conferences, held across several regions each year, gave the community a place to meet and grow. Certification exams gave engineers a recognized credential.

## How it connects to AI today

Modern AI runs on cloud-native infrastructure, and the CNCF stack is its backbone. When you call a large language model API, your request often hits a service running inside a Kubernetes cluster. The model server is a container. Kubernetes places it on a machine with the right GPU, scales the number of replicas as traffic rises, and restarts it if it crashes.

The match is not accidental. AI inference is bursty and expensive. Demand spikes when users arrive and falls when they leave. Kubernetes was built for exactly this elastic, failure-prone world, so AI teams adopted it rather than reinventing it.

Several CNCF projects now target AI work directly. Kubernetes added device plugins so it can schedule GPUs and other accelerators. Projects like Kubeflow, KServe, and Ray run on Kubernetes to serve models and manage training pipelines. The Open Container Initiative image format, closely tied to this ecosystem, is how model-serving images ship.

A builder meets the CNCF stack constantly. If you deploy an AI app to Amazon EKS, Google GKE, or Azure AKS, you are running managed Kubernetes. If you watch a dashboard of request latency, that is often Prometheus and Grafana. If you trace a slow inference call across services, OpenTelemetry likely captured it. The vendor neutrality the CNCF protects is why the same skills carry across all three big clouds.

## Still in use today

The CNCF is active and growing, not a historical artifact. It is one of the largest open-source foundations in the world, hosting well over a hundred projects across many maturity tiers. Nothing has replaced it, because its neutral-governance model is the reason it works. A competing vendor-owned body would defeat the purpose.

Kubernetes remains the flagship and the de facto standard for container orchestration. Its core is mature and stable, so attention has shifted to the layers around it: security, cost control, developer experience, and AI workloads. New projects keep entering the sandbox, and KubeCon and CloudNativeCon events continue to draw large crowds. The certifications it created are now common requirements in cloud job listings. The CNCF persists because shared, trusted infrastructure benefits everyone who builds on the cloud.

## Further reading

- [IT History Timeline](/explore/it-timeline/): see where the CNCF and Kubernetes sit in the wider story of computing.
- [AI Learning Galaxy](/explore/galaxy/): explore how cloud-native infrastructure connects to AI concepts.
- [Software as a Service (Salesforce)](/history/salesforce-saas/): the cloud delivery model that cloud-native tooling now powers.
- [Ethernet](/history/ethernet/): the networking standard whose descendants connect the clusters Kubernetes manages.
- [Cloud Native Computing Foundation](https://www.cncf.io/): the official site, with the full project landscape and governance documents.
- [Kubernetes documentation](https://kubernetes.io/docs/home/): official guides for the CNCF's flagship orchestration project.
- [CNCF on Wikipedia](https://en.wikipedia.org/wiki/Cloud_Native_Computing_Foundation): a concise overview of the foundation's history and structure.
