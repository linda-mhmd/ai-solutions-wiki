---
title: "MongoDB relicenses to SSPL (2018)"
description: "MongoDB moved its Community Server from AGPLv3 to its own Server Side Public License in 2018 to pressure cloud providers, opening the modern wave of source-available database licensing."
date: 2026-06-23
categories: [History]
tags: [computing-history, mongodb, sspl, open-source, licensing, database, cloud]
related:
  - explore/it-timeline
  - explore/galaxy
  - history/sql
  - history/salesforce-saas
  - history/apache-httpd
faqs:
  - question: "Is SSPL an open-source license?"
    answer: "The Open Source Initiative does not approve SSPL as an open-source license. MongoDB drafted SSPL, submitted it for review, then withdrew the submission. The OSI never certified it. The license sits in a category many people call source-available: the source code is public and free to read and modify, but one term breaks the Open Source Definition. That term targets anyone who offers the software as a managed service to others."
  - question: "Why did MongoDB change its license in 2018?"
    answer: "MongoDB wanted to stop cloud providers from selling MongoDB as a hosted service without contributing back. Under the old AGPLv3 license, a provider could run MongoDB at scale, charge customers, and give little in return. SSPL adds a condition: if you offer the database as a service, you must release the full source of your service stack under SSPL too. That requirement is meant to be impractical for most providers."
  - question: "Can I still use MongoDB Community Server for free?"
    answer: "Yes. MongoDB Community Server stays free to download, run, and modify for your own applications. You can build a product on it, ship it to customers, and pay nothing for the license. The SSPL condition only bites when you offer MongoDB itself as a managed service to third parties. For most developers and companies, day-to-day use is unchanged."
---

In October 2018, MongoDB stopped releasing its Community Server under the AGPLv3 open-source license. It switched to a license it wrote itself, the Server Side Public License, or SSPL. The goal was to stop cloud providers from selling MongoDB as a managed service without sharing code back. The move opened a decade of database vendors rewriting their licenses the same way.

<figure class="bz-figure"><img src="/img/shaping-ai/boardroom-wireframe-building-notext.png" alt="Executives sit around a dark boardroom table as a red wireframe building floats above it, a blueprint they all share. The scene mirrors MongoDB redrawing the legal blueprint that governs who may build a business on its database." loading="lazy"><figcaption>MongoDB redrew the legal blueprint for its database, much like a board agreeing on new terms for a shared structure.</figcaption></figure>

## What it was

A software license is a contract. It states what you may do with the code: read it, change it, ship it, sell a service on top of it. For years MongoDB shipped its Community Server under the GNU Affero General Public License version 3, the AGPLv3. That license is a recognised open-source license. It lets anyone use and modify the code, with a duty to share changes under the same terms.

The AGPLv3 had a gap that mattered for MongoDB's business. A cloud provider could take the open code, run it on thousands of machines, and sell access as a hosted database. The provider charged customers and kept the operational tooling private. MongoDB earned little from that traffic, even though it wrote the engine.

On 16 October 2018, MongoDB issued the SSPL to close that gap. The new license keeps most AGPLv3 freedoms. It adds one heavy condition. If you offer the software as a service to others, you must release the entire source of your service stack under SSPL. That covers management, monitoring, backup, and orchestration code. The requirement is meant to be too costly for a provider to accept.

Think of a recipe a chef publishes for free. Anyone may cook it at home, change it, or serve it in their own restaurant. Then the chef adds a rule: if you open a chain that resells this exact dish, you must publish the recipes for your kitchen, your supply chain, and your billing system too. Home cooks notice nothing. A national chain finds the rule impossible to follow.

<div class="bz-flow">
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Step 1</span><span class="bz-flow-step-name">AGPLv3 era</span><span class="bz-flow-step-desc">MongoDB ships Community Server under a recognised open-source license.</span></div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Step 2</span><span class="bz-flow-step-name">Cloud resale</span><span class="bz-flow-step-desc">Providers host MongoDB as a paid managed service, returning little code.</span></div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Step 3</span><span class="bz-flow-step-name">SSPL issued</span><span class="bz-flow-step-desc">MongoDB releases SSPL on 16 October 2018 with a service-source clause.</span></div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Step 4</span><span class="bz-flow-step-name">Industry shift</span><span class="bz-flow-step-desc">Other vendors adopt source-available licenses to defend their cloud revenue.</span></div>
</div>

## Why it mattered

The change drew sharp reactions. Linux distributions matter here. Debian, Fedora, and others ship only software under licenses they consider truly free. After the switch, several distributions dropped MongoDB from their default repositories. The license no longer met their definition of open source.

MongoDB submitted SSPL to the Open Source Initiative for approval, the body that certifies open-source licenses. The submission drew long debate on the OSI mailing list. Critics argued the service clause discriminated against a field of use, which breaks the Open Source Definition. MongoDB later withdrew the submission. SSPL never gained OSI approval.

The split mattered beyond MongoDB. It forced a hard question across the industry. Who pays to build core infrastructure when a cloud provider can resell it at scale? The answer reshaped how database companies thought about licensing and revenue. MongoDB itself kept growing, and its hosted product, MongoDB Atlas, became its main business.

## How it connects to AI today

The SSPL move started a pattern that now shapes much of the AI and data tooling you use. After 2018, a wave of infrastructure vendors followed similar reasoning. Elastic moved Elasticsearch off its old open-source terms in 2021 and adopted SSPL alongside its own license. Redis changed its terms in 2024. Confluent, Cockroach, and HashiCorp made related moves with their own source-available licenses. The phrase source-available entered everyday use because of this trend.

This matters for anyone building AI systems, because the same databases now store AI workloads. MongoDB added vector search to Atlas, so it holds the embeddings that power retrieval-augmented generation. Elasticsearch and Redis serve vector search and semantic caching for large language model apps. When you pick a vector store for a RAG pipeline, you meet these licenses directly. The terms decide whether you can host the engine yourself or must buy the managed version.

The relicensing also helped trigger forks. Communities that wanted a fully open license forked the code from the last open-available release. The fork of Elasticsearch became OpenSearch, which the OpenSearch Software Foundation now governs. Redis forks led to Valkey, hosted under the Linux Foundation. When you weigh OpenSearch against Elasticsearch, or Valkey against Redis, you are living inside the debate MongoDB opened in 2018.

For a builder today, the practical lesson is concrete. Read the license before you commit infrastructure to a product. Check whether a license is OSI-approved or only source-available. Confirm whether your use is internal application use, which is usually fine, or resale as a service, which the strict clauses target. That habit now belongs in the same checklist as latency, cost, and vector support.

## Still in use today

This relicensing is a milestone, and SSPL is active and maintained. MongoDB still ships Community Server under SSPL in 2026. MongoDB Atlas, the managed cloud service, remains the company's core revenue and is widely used for both classic data and AI vector workloads. The 2018 decision did not slow MongoDB. It sharpened its cloud strategy.

The broader practice that MongoDB normalised is now standard across data infrastructure. Source-available licensing is a common default for venture-backed database and tooling companies that fear cloud resale. The pattern persists because the underlying tension persists. Open code invites large providers to capture the revenue. Vendors answer with licenses that protect the hosted business while keeping the source readable.

So the milestone lives on in two forms. SSPL itself is in active use on real software. And the playbook it demonstrated, trading OSI approval for control over cloud resale, recurs whenever another vendor changes its terms.

## Further reading

- [IT History Timeline](/explore/it-timeline/): place this relicensing in the wider arc of computing milestones.
- [AI Learning Galaxy](/explore/galaxy/): explore how databases and AI infrastructure connect across the wiki.
- [SQL (1974)](/history/sql/): the query language and relational model that databases like MongoDB define themselves against.
- [Salesforce and the rise of SaaS](/history/salesforce-saas/): the software-as-a-service model whose economics drive these licensing fights.
- [Server Side Public License on Wikipedia](https://en.wikipedia.org/wiki/Server_Side_Public_License): history, text, and the debate over the license.
- [MongoDB SSPL FAQ](https://www.mongodb.com/legal/licensing/server-side-public-license/faq): MongoDB's own explanation of why it issued the license and who it affects.
- [The Open Source Definition](https://opensource.org/osd): the criteria the OSI uses, which SSPL is judged against.
