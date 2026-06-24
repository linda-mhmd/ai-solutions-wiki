---
title: "Software Licensing and Vendor Lock-In: The Legal History Every Builder Needs"
description: "A plain-English guide to software licenses, from MIT and GPL to source-available BSL and SSPL, the relicensing wars, vendor lock-in, and how to protect your project."
date: 2026-06-23
categories: [Guides]
tags: ["licensing", "open-source", "vendor-lock-in", "legal", "risk", "governance", "beginner"]
tools: []
related:
  - basics/what-is-open-source
  - tools/terraform
  - glossary/virtualization-fundamentals
  - guides/service-lifecycle-and-deprecation
  - guides/history-of-it
last_updated: 2026-06-23
---

A technology choice is also a legal choice. The code can be excellent, the docs can be clear, the community can be huge, and the contract can still ruin you. Beginners pick tools by features and benchmarks, then discover too late that a license clause or a renewal term controls their future.

<figure class="bz-figure">
  <img src="/img/shaping-ai/documents-cube-vs-neon-orbit-notext.png" alt="On the left a dense cube of stacked documents, on the right a glowing neon orbital ring. Software is both legal documents and live technology." loading="lazy">
  <figcaption>Every piece of software is two things at once: a working system and a stack of legal terms. Ignore the second at your peril.</figcaption>
</figure>

## The license spectrum

Licenses sit on a spectrum from total freedom to total vendor control. The diagram below moves from the most permissive at the top to the most restrictive at the bottom. Most of the pain comes from teams that assume the source is visible and the rights are open. Those are two different things.

<div class="bz-arch">
  <div class="bz-arch-layer"><span class="bz-arch-layer-label">Public domain</span><div class="bz-arch-layer-content"><span class="bz-arch-chip">CC0</span><span class="bz-arch-chip-note">No restrictions at all</span></div></div>
  <div class="bz-arch-layer"><span class="bz-arch-layer-label">Permissive</span><div class="bz-arch-layer-content"><span class="bz-arch-chip">MIT</span><span class="bz-arch-chip">Apache 2.0</span><span class="bz-arch-chip">BSD</span><span class="bz-arch-chip-note">Use freely, keep the notice</span></div></div>
  <div class="bz-arch-layer"><span class="bz-arch-layer-label">Copyleft</span><div class="bz-arch-layer-content"><span class="bz-arch-chip">GPL</span><span class="bz-arch-chip">AGPL</span><span class="bz-arch-chip-note">Share changes under the same license</span></div></div>
  <div class="bz-arch-layer"><span class="bz-arch-layer-label">Source-available</span><div class="bz-arch-layer-content"><span class="bz-arch-chip">BSL</span><span class="bz-arch-chip">SSPL</span><span class="bz-arch-chip">Elastic License</span><span class="bz-arch-chip-note">Source visible, competitive use restricted, not OSI open source</span></div></div>
  <div class="bz-arch-layer"><span class="bz-arch-layer-label">Proprietary</span><div class="bz-arch-layer-content"><span class="bz-arch-chip">Closed source</span><span class="bz-arch-chip-note">Binary only, full vendor control</span></div></div>
</div>

## What each category actually means

**Public domain** means no one holds rights. With a tool like CC0, you can do anything with the code and owe nothing in return. This is rare for full applications and more common for small snippets or sample code.

**Permissive licenses** let you use, modify, and redistribute the code, including inside closed commercial products. You keep the original copyright notice, and that is almost the only rule. MIT, Apache 2.0, and BSD are the big three. Apache 2.0 adds an explicit patent grant, which is why large companies favor it.

**Copyleft licenses** also grant broad rights, but they attach a condition. If you distribute software built on copyleft code, you must release your changes under the same license. The GNU General Public License (GPL) covers distributed software. The Affero GPL (AGPL) closes the network gap, so running modified code as a hosted service also triggers the share-back rule. Copyleft keeps derivatives open, which some companies treat as a risk.

**"Open source" has a precise meaning.** The Open Source Initiative (OSI) maintains the Open Source Definition. To qualify, a license must grant four freedoms: the freedom to use the software for any purpose, study how it works, modify it, and redistribute it (including commercially). Permissive and copyleft licenses both meet this bar.

**Source-available is not the same thing.** Licenses like the Business Source License (BSL), the Server Side Public License (SSPL), and the Elastic License let you read the source and often modify it. They also forbid certain uses, usually offering the product as a competing managed service. Because they restrict use, the OSI does not recognize them as open source. The source being visible does not make the license open. This single distinction is the root of the relicensing wars below.

**Proprietary software** ships as a binary. You get no source, you cannot modify it, and the vendor controls pricing, terms, and your exit. This is normal for commercial products, but it concentrates risk in the contract.

## The relicensing wars

A pattern repeats across the last decade of infrastructure software. A company builds a popular project under an open source license, grows a large community, then watches cloud providers sell that project as a managed service without paying back. The company responds by relicensing to a source-available license that blocks the cloud providers. The community, now cut off from open terms, forks the project under its old license. Below is that playbook as a flow.

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 1</span>
    <span class="bz-flow-step-name">Build on open source</span>
    <span class="bz-flow-step-desc">Ship under a permissive or copyleft license to attract contributors and trust.</span>
  </div>
  <div class="bz-flow-arrow">&rarr;</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 2</span>
    <span class="bz-flow-step-name">Grow adoption</span>
    <span class="bz-flow-step-desc">The project becomes a standard and cloud providers start hosting it.</span>
  </div>
  <div class="bz-flow-arrow">&rarr;</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 3</span>
    <span class="bz-flow-step-name">Relicense to source-available</span>
    <span class="bz-flow-step-desc">Switch to BSL or SSPL to stop competitors offering it as a managed service.</span>
  </div>
  <div class="bz-flow-arrow">&rarr;</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 4</span>
    <span class="bz-flow-step-name">Community forks</span>
    <span class="bz-flow-step-desc">Users and rivals fork the last open version and keep it alive.</span>
  </div>
</div>

These are the real events, in order.

**MongoDB (2018).** On 2018-10-16, MongoDB relicensed its Community Server from AGPLv3 to its own Server Side Public License (SSPL). The SSPL requires any organization offering MongoDB as a service to open source the entire stack used to run that service. The target was cloud providers selling managed MongoDB. The OSI did not accept the SSPL as an open source license.

**Red Hat and CentOS (2020).** CentOS Linux was a free rebuild of Red Hat Enterprise Linux (RHEL), used widely as a no-cost server base. On 2020-12-08, Red Hat ended CentOS Linux in favor of CentOS Stream, a rolling preview that sits upstream of RHEL rather than downstream. The move cut CentOS 8 support from 2029 to the end of 2021. The backlash produced two new free RHEL rebuilds: Rocky Linux and AlmaLinux.

**Elastic (2021).** On 2021-01-14, Elastic moved Elasticsearch and Kibana from Apache 2.0 to a dual license of SSPL and the Elastic License. The aim was Amazon's managed Elasticsearch service. AWS responded by forking both projects into OpenSearch under Apache 2.0. Elastic later re-added an AGPLv3 option in 2024, restoring an OSI open source path.

**HashiCorp (2023).** On 2023-08-10, HashiCorp relicensed Terraform and its other core products from the Mozilla Public License 2.0 (MPL 2.0) to the Business Source License (BSL). The community reacted within days. The OpenTF manifesto appeared on 2023-08-15, the fork became OpenTofu, and it joined the Linux Foundation on 2023-09-20. The BSL is source-available, not OSI open source, but it has a time fuse: each released version converts to MPL 2.0 four years after release.

**Broadcom and VMware (2023).** Broadcom completed its acquisition of VMware on 2023-11-22. On 2023-12-11, it ended perpetual VMware licenses and moved customers to subscription-only bundles. Existing customers with perpetual licenses must convert to subscription at renewal. The change drove sharp price increases and forced many teams to re-evaluate their virtualization platform.

**Oracle and Java.** Oracle has changed Java licensing several times, including a per-employee subscription model that prices the whole organization rather than the users who actually run Java. Many buyers were surprised by audits and bills well above what they expected. It is a reminder that commercial license terms can shift under a tool you already depend on.

## Vendor lock-in

Vendor lock-in is the cost of leaving. The higher that cost, the more power the vendor holds over your roadmap, your budget, and your terms. Lock-in is rarely one big trap. It builds quietly through dependencies that feel convenient at the time.

It bites in four common places.

- **Data formats.** When your data lives in a proprietary format, exporting it cleanly is hard or impossible. Your records become hostage to one product.
- **Proprietary APIs.** Code written against a vendor-specific API will not move to a competitor without a rewrite. Every integration deepens the dependence.
- **Perpetual-to-subscription shifts.** A tool you bought once can become a tool you rent forever. The VMware change shows how fast a paid-up asset turns into a recurring cost.
- **Deep platform dependence.** Heavy reliance on a single ecosystem, like SAP for business processes or one cloud for everything, ties your operations to one vendor's pricing and survival.

## Comparing the categories

This table shows the four working categories side by side. "Can a competitor offer it as a service" is the clause that started the relicensing wars.

| | Can you read the source | Can you modify and redistribute | Can a competitor offer it as a service | OSI open source |
|---|---|---|---|---|
| **Permissive** | Yes | Yes | Yes | Yes |
| **Copyleft** | Yes | Yes, under the same license | Yes, if shared back | Yes |
| **Source-available** | Yes | Often, with use limits | No, that is the point | No |
| **Proprietary** | No | No | No | No |

## How to protect yourself

You cannot stop a vendor from changing its license. You can stop that change from being a crisis. Treat licensing and exit cost as engineering decisions, not legal afterthoughts.

- **Make exit cost a first-class selection criterion.** Before you adopt a tool, ask how you would leave it. If the answer is "we could not," that is your real total cost.
- **Read the license before you build on it.** Know whether it is permissive, copyleft, source-available, or proprietary. Do not assume "open" because the source is on GitHub.
- **Prefer foundation-governed projects.** Tools held by the Linux Foundation, the Apache Software Foundation, or the Cloud Native Computing Foundation (CNCF) cannot be relicensed at one company's whim. Shared governance is a structural protection.
- **Favor open standards and data portability.** Choose formats and protocols you can export and import elsewhere. Portable data is the difference between switching vendors and being stuck.
- **Keep a fallback for free tiers.** A generous free tier is a business decision the vendor can reverse. Know your paid path and your alternative before you depend on it.
- **Consider source code escrow for critical proprietary software.** An escrow agreement releases the source to you if the vendor fails or breaches terms. For a system you cannot afford to lose, it buys continuity.
- **Watch for the relicensing signals.** A fast-growing single-company project under a permissive license, with cloud providers circling, is a candidate for the next relicense. Plan accordingly.

The lesson from the last decade is consistent. The teams that survived these changes had read the terms, valued portability, and knew their exit. The code was never the problem. The contract was.

## Further reading

- [The history of IT](/guides/history-of-it/): how computing, networks, and the open source movement reached this point.
- [What is open source](/basics/what-is-open-source/): the OSI definition and why "source-available" is not the same thing.
- [Terraform](/tools/terraform/): the tool at the centre of the 2023 BSL relicensing and the OpenTofu fork.
- [Service lifecycle and deprecation](/guides/service-lifecycle-and-deprecation/): how vendors retire products and shift terms, and how to plan for it.
- [HashiCorp adopts the Business Source License](https://www.hashicorp.com/en/blog/hashicorp-adopts-business-source-license): the official announcement that triggered the OpenTofu fork.
- [Linux Foundation announces OpenTofu](https://www.linuxfoundation.org/press/announcing-opentofu): the foundation-governed open source fork of Terraform.
- [Open Source Initiative licenses](https://opensource.org/licenses): the authoritative list of OSI-approved open source licenses and the Open Source Definition.
