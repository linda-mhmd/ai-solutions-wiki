---
title: "Red Hat Shifts CentOS to CentOS Stream"
description: "In December 2020, Red Hat ended CentOS Linux, the free downstream rebuild of Red Hat Enterprise Linux, and refocused on CentOS Stream, a branch that tracks ahead of RHEL."
date: 2026-06-23
categories: [History]
tags: [centos, red-hat, linux, rhel, open-source, operating-systems]
related:
  - explore/it-timeline
  - explore/galaxy
  - history/apache-httpd
  - history/openstack
  - history/c-language
faqs:
  - question: "Why did Red Hat change CentOS?"
    answer: "Red Hat wanted a public development branch where the wider community could see and shape RHEL before each release. CentOS Linux sat after RHEL, so it could not feed changes back. CentOS Stream sits before RHEL, so contributions flow upstream. Critics argued the deeper motive was to push free users toward paid subscriptions."
  - question: "What is the difference between CentOS Linux and CentOS Stream?"
    answer: "CentOS Linux was a downstream rebuild. It came after a RHEL release and matched it bug for bug, giving a free, stable clone. CentOS Stream is upstream. It receives changes before they reach the next RHEL minor release, so it previews what RHEL will become rather than copying what it already is."
  - question: "What replaced CentOS Linux for free RHEL-compatible servers?"
    answer: "AlmaLinux and Rocky Linux launched in 2021 as community rebuilds of RHEL, recreating the role CentOS Linux had filled. Red Hat also expanded its free RHEL developer subscription. Many CentOS 8 users migrated to one of these options before the December 2021 end-of-life date."
---

CentOS Linux was a free, community-maintained rebuild of Red Hat Enterprise Linux. For years it gave companies a stable, RHEL-compatible operating system at no cost. On 8 December 2020, Red Hat announced it would discontinue CentOS Linux and shift focus to CentOS Stream, an upstream branch that tracks ahead of RHEL rather than copying it.

<figure class="bz-figure"><img src="/img/enterprise-dark/team-watching-red-brain-notext.png" alt="A team of silhouetted people watching a glowing red neural brain in a dark room. The CentOS Stream decision forced thousands of organisations to rethink the free Linux foundation under their servers." loading="lazy"><figcaption>The CentOS Stream shift sent organisations everywhere back to the planning room to choose a new free Linux foundation.</figcaption></figure>

## What it was

CentOS, the Community Enterprise Operating System, began in 2004. It took the public source code of Red Hat Enterprise Linux, removed Red Hat trademarks, and rebuilt it. The result was binary-compatible with RHEL. Software certified for RHEL ran on CentOS without changes. You got enterprise-grade Linux without a paid subscription.

Think of CentOS Linux as a faithful copy of a tailored suit. A master tailor (Red Hat) cuts the original to exact measurements. CentOS copied that finished suit stitch for stitch and gave it away. The copy arrived after the original and matched it precisely.

CentOS Stream flips the timing. Instead of copying the finished suit, it is the working pattern the tailor edits before the next suit is cut. Changes land in CentOS Stream first, get tested, then flow into the next minor release of RHEL.

<div class="bz-flow">
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Before</span><span class="bz-flow-step-name">Fedora</span><span class="bz-flow-step-desc">Fast-moving upstream where new features are born.</span></div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step"><span class="bz-flow-step-tag">New</span><span class="bz-flow-step-name">CentOS Stream</span><span class="bz-flow-step-desc">Stabilising branch that previews the next RHEL.</span></div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Product</span><span class="bz-flow-step-name">RHEL</span><span class="bz-flow-step-desc">Red Hat's supported, paid enterprise release.</span></div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Old</span><span class="bz-flow-step-name">CentOS Linux</span><span class="bz-flow-step-desc">Downstream rebuild that copied RHEL, now retired.</span></div>
</div>

## Why it mattered

The announcement caused an uproar. CentOS Linux 8, released in 2019, had an expected support window to 2029. Red Hat cut that to 31 December 2021. Organisations that had built infrastructure on a ten-year promise lost eight of those years overnight.

CentOS Linux was everywhere. Web hosts, universities, research labs, and budget-conscious companies ran it on millions of servers. It was the default free choice for anyone who wanted RHEL behaviour without a contract. The shortened timeline forced urgent migration planning across the industry.

The deeper concern was trust. A free, stable rebuild had been a stable assumption for over a decade. Removing it raised a question that still echoes: how much can you depend on a community project that a single company controls? The move also looked like a nudge toward paid RHEL subscriptions.

The community answered fast. Gregory Kurtzer, an original CentOS co-founder, launched Rocky Linux. CloudLinux launched AlmaLinux. Both shipped in 2021 as free, RHEL-compatible rebuilds, restoring the role CentOS Linux had played.

## How it connects to AI today

Linux is the substrate of modern AI. Almost every model trains and serves on Linux servers. The RHEL family sits underneath a large share of enterprise GPU clusters, container hosts, and managed cloud images. When you rent an AI instance, the operating system is very often a RHEL derivative.

CentOS Stream now feeds that pipeline directly. Today it serves as the upstream for both RHEL and its rebuilds. Each new version of RHEL, including the releases that ship as cloud and container base images for AI workloads, takes shape in CentOS Stream first. The kernel, GPU drivers, and container runtime tested there flow into the platforms builders use.

A builder meets this history in concrete ways. The official base image for many container builds is `ubi` (Universal Base Image), derived from RHEL and shaped in Stream. AlmaLinux and Rocky Linux, born from the 2020 decision, are common choices for self-managed AI servers and Kubernetes nodes. When you pick a base image for a model-serving container, you are choosing a descendant of this split.

The episode also taught the AI infrastructure world a governance lesson. Reproducible, vendor-neutral foundations matter when you run expensive, long-lived GPU fleets. The same caution now shapes how teams pick open model licences and open-weights ecosystems. A single vendor changing the rules can reset years of planning, whether the asset is an operating system or a foundation model.

## Still in use today

CentOS Linux is discontinued. CentOS Linux 8 reached end-of-life on 31 December 2021. CentOS Linux 7, the final downstream release, ran its full ten-year cycle and ended on 30 June 2024. No further CentOS Linux versions will appear.

CentOS Stream lives on as the project's only active edition. It is the continuously delivered upstream of RHEL, and Red Hat supports each Stream version for the life of the matching RHEL major release. It targets developers, contributors, and teams that want to test against the next RHEL before it ships.

For the free, stable, RHEL-clone use case that CentOS Linux once filled, AlmaLinux and Rocky Linux are the standard replacements in 2026. Both are widely deployed, actively maintained, and binary-compatible with RHEL. The 2020 decision did not kill the free enterprise Linux idea. It moved the idea into new hands.

## Further reading

- [IT History Timeline](/explore/it-timeline/): place the CentOS Stream shift among other milestones in computing history.
- [AI Learning Galaxy](/explore/galaxy/): explore how operating systems connect to the wider AI and computing map.
- [Apache HTTP Server](/history/apache-httpd/): the web server that ran on countless CentOS machines.
- [OpenStack](/history/openstack/): another open-source enterprise platform that often ran on RHEL-family systems.
- [CentOS Stream official site](https://www.centos.org/centos-stream/): the project's current home and documentation.
- [Red Hat announcement, 8 December 2020](https://blog.centos.org/2020/12/future-is-centos-stream/): the original blog post that ended CentOS Linux.
- [CentOS on Wikipedia](https://en.wikipedia.org/wiki/CentOS): full history of the distribution and the 2020 transition.
