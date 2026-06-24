---
title: "OpenStack"
description: "OpenStack is an open-source platform for building private and public clouds, providing compute, storage and networking as a free alternative to proprietary cloud providers."
date: 2026-06-23
categories: [History]
tags: [openstack, cloud, infrastructure, open-source, virtualization, iaas]
related:
  - explore/it-timeline
  - explore/galaxy
  - history/salesforce-saas
  - history/apache-httpd
  - history/ethernet
faqs:
  - question: "Who created OpenStack?"
    answer: "Rackspace and NASA created it together. Rackspace contributed its object storage code. NASA contributed Nebula, its compute platform. They announced the project in July 2010 and shipped the first release, code-named Austin, in October 2010."
  - question: "Is OpenStack the same as AWS?"
    answer: "No. AWS is a public cloud you rent from Amazon. OpenStack is software you install and run yourself to build your own cloud. You can use OpenStack to build a private cloud inside your own data center, or a public cloud you sell to others."
  - question: "Is OpenStack still used in 2026?"
    answer: "Yes, but mainly in maintenance mode. It runs in telecoms, research labs, and some enterprises that need on-premises control. New green-field projects more often choose managed public clouds or Kubernetes-based platforms instead."
---

OpenStack is an open-source platform for building and running clouds. It pools compute, storage and networking from many servers and hands them out as virtual machines, disks and networks through a shared API. Launched in 2010, it offered organisations an open alternative to proprietary clouds such as Amazon Web Services.

<figure class="bz-figure"><img src="/img/enterprise-dark/server-cpu-split-notext.png" alt="A dark server room on the left and a red-lit CPU chip on the right, joined as one image. OpenStack turns rooms full of physical servers into pooled, programmable cloud compute." loading="lazy"><figcaption>OpenStack takes rooms full of physical servers and presents them as one programmable pool of compute, storage and networking.</figcaption></figure>

## What it was

OpenStack is a collection of software services that turn a fleet of ordinary servers into a cloud. Instead of treating each machine as a separate box, OpenStack pools their CPU, memory, disk and network. Users then request resources through an API or web dashboard. The platform decides which physical server runs the work.

Think of a large hotel. Guests do not pick a specific brick or pipe. They ask for a room with two beds, and the front desk assigns one from the available stock. OpenStack is the front desk for a data center. You ask for "a virtual machine with 4 CPUs and 8 GB of memory", and it places that request on whichever server has space.

Each capability lives in its own service, named like a person. Nova handles compute. Swift handles object storage. Cinder handles block storage. Neutron handles networking. Keystone handles identity and authentication. Glance stores virtual machine images. Horizon is the web dashboard.

<div class="bz-arch">
  <div class="bz-arch-layer"><span class="bz-arch-layer-label">User access</span><div class="bz-arch-layer-content"><span class="bz-arch-chip">Horizon dashboard</span><span class="bz-arch-chip">REST API</span><span class="bz-arch-chip">CLI</span></div></div>
  <div class="bz-arch-layer"><span class="bz-arch-layer-label">Identity</span><div class="bz-arch-layer-content"><span class="bz-arch-chip">Keystone</span><span class="bz-arch-chip-note">Authentication and service catalog</span></div></div>
  <div class="bz-arch-layer"><span class="bz-arch-layer-label">Core services</span><div class="bz-arch-layer-content"><span class="bz-arch-chip">Nova (compute)</span><span class="bz-arch-chip">Neutron (network)</span><span class="bz-arch-chip">Cinder (block storage)</span><span class="bz-arch-chip">Swift (object storage)</span><span class="bz-arch-chip">Glance (images)</span></div></div>
  <div class="bz-arch-layer"><span class="bz-arch-layer-label">Physical layer</span><div class="bz-arch-layer-content"><span class="bz-arch-chip">Hypervisors</span><span class="bz-arch-chip">Disks</span><span class="bz-arch-chip">Switches</span><span class="bz-arch-chip-note">Commodity servers in racks</span></div></div>
</div>

## Why it mattered

Before OpenStack, building a cloud meant buying expensive proprietary software or trusting a single vendor's public cloud. OpenStack gave organisations a third option. They could build their own cloud on commodity hardware, with no licence fees and no lock-in to one supplier.

The project grew fast. Hundreds of companies joined, including IBM, Red Hat, HP, Cisco and Intel. The OpenStack Foundation, formed in 2012, governed the work in the open. For a time, OpenStack was one of the most active open-source projects in the world, second only to the Linux kernel in contributor numbers.

Telecoms and research bodies adopted it heavily. CERN ran one of the largest known OpenStack clouds to process particle-physics data. Telecom operators used it to run network functions on standard servers instead of dedicated hardware. OpenStack proved that an open community could build cloud infrastructure at serious scale.

## How it connects to AI today

OpenStack matters for AI because it is one of the clearest expressions of infrastructure as code: ask for compute through an API, and the platform provisions it. Every modern AI workload depends on this idea. Training a model means requesting GPU servers, storage for datasets, and networking between nodes. OpenStack helped make that request-driven model standard practice.

A builder meets OpenStack today in three concrete places. First, private and sovereign AI clouds. Organisations that cannot send sensitive data to a public cloud, such as banks, hospitals and government bodies, often run GPU clusters on OpenStack inside their own walls. OpenStack supports GPU passthrough, so a virtual machine can use a physical NVIDIA card for model training and inference.

Second, telecom and edge AI. Operators run OpenStack at the network edge to host AI inference close to users, cutting latency for tasks like video analysis.

Third, the layer underneath Kubernetes. Many teams run Kubernetes, the container platform that orchestrates AI services, on top of OpenStack virtual machines. OpenStack provides the raw machines and networks. Kubernetes schedules the containers. This pairing remains common in private data centers.

OpenStack itself did not become the dominant cloud. Public providers like AWS, Azure and Google Cloud won most new workloads. But the pattern OpenStack championed, a programmable pool of resources behind an API, is exactly how today's AI infrastructure is built and rented.

## Still in use today

OpenStack is in maintenance. The software is active and maintained, with regular releases from the OpenInfra Foundation, the renamed body that now stewards it. Production deployments persist in telecoms, scientific computing, and enterprises that demand on-premises or sovereign control over their data.

It is no longer the centre of cloud excitement. Most new green-field projects choose a managed public cloud for speed, or a Kubernetes-based platform for portability. Running OpenStack well needs deep operational skill, which limited its spread to smaller teams.

It persists for two reasons. Some workloads cannot legally or practically leave a private data center. And large existing OpenStack clouds, including CERN's, are too valuable to rebuild. So OpenStack continues as durable, specialised infrastructure rather than a fast-growing trend. Vendors such as Red Hat and Canonical still ship supported distributions, which keeps it viable for regulated industries.

## Further reading

- [IT History Timeline](/explore/it-timeline/): where OpenStack sits in the broader story of computing infrastructure.
- [AI Learning Galaxy](/explore/galaxy/): how cloud platforms connect to the wider map of AI and computing concepts.
- [Salesforce and the rise of SaaS](/history/salesforce-saas/): the software-as-a-service shift that set the stage for cloud computing.
- [Apache HTTP Server](/history/apache-httpd/): an earlier open-source project that proved community software could run critical infrastructure.
- [OpenStack official website](https://www.openstack.org/): documentation, releases and the project governance model.
- [OpenStack on Wikipedia](https://en.wikipedia.org/wiki/OpenStack): history, architecture and the list of core services.
