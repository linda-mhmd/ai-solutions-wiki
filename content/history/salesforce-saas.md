---
title: "Salesforce and Software-as-a-Service"
description: "How Salesforce delivered enterprise CRM over the web on a subscription in 1999, pioneering the Software-as-a-Service model that still powers cloud applications and AI products today."
date: 2026-06-23
categories: [History]
tags: [saas, cloud, salesforce, crm, subscription, multitenancy, web]
related:
  - explore/it-timeline
  - explore/galaxy
  - history/three-tier
  - history/http-html
  - history/sql
faqs:
  - question: "What does Software-as-a-Service mean?"
    answer: "Software-as-a-Service means you use an application through a web browser instead of installing it on your own computer. The vendor runs the software on its servers and you pay a recurring fee, often per user per month. You never download an installer or manage a server. Salesforce popularised this model for business software in 1999."
  - question: "Why was Salesforce's 'No Software' slogan important?"
    answer: "At the time, business software arrived on discs and needed expensive servers, installation, and ongoing maintenance. The 'No Software' message told buyers they could skip all of that and log in to a website instead. It reframed software as a service you subscribe to, not a product you own. The slogan made the shift easy to understand for non-technical buyers."
  - question: "Is Salesforce still relevant in the age of AI?"
    answer: "Yes. Salesforce remains one of the largest enterprise software companies and an active SaaS platform. It now embeds AI features for sales forecasting, support replies, and data analysis directly in the browser. The subscription delivery model it pioneered is also how most AI products reach users today."
---

Salesforce launched in 1999 as a customer relationship management (CRM) application that ran entirely in a web browser. Customers paid a per-user subscription instead of buying discs, servers, and installation. This delivery model became known as Software-as-a-Service, and it reshaped how the world buys and runs business software.

<figure class="bz-figure"><img src="/img/enterprise-dark/furnace-molten-red-notext.png" alt="Red-hot molten metal pouring from a dark industrial furnace, representing a foundational transformation in how software is delivered and consumed." loading="lazy"><figcaption>Salesforce poured the foundation for an industry shift: software as a metered service running on someone else's machines, not a product you install.</figcaption></figure>

## What it was

Salesforce delivered CRM, the system that tracks sales contacts, deals, and customer history, through a website. Marc Benioff and his co-founders started the company in 1999 with a blunt marketing message: "No Software." There was nothing to buy on disc, nothing to install, and no server to maintain in your own building.

Instead, you opened a browser, logged in, and the application ran on Salesforce's own servers. You paid a recurring fee per user. A single shared system served many companies at once, a design called multitenancy. Each customer saw only its own data, but everyone ran the same underlying software.

Think of it like electricity. You do not build a power plant in your basement. You plug in and pay for what you use, and the utility handles the generators, the upgrades, and the repairs. Salesforce treated software the same way.

<div class="bz-arch">
  <div class="bz-arch-layer"><span class="bz-arch-layer-label">Client</span><div class="bz-arch-layer-content"><span class="bz-arch-chip">Web browser</span><span class="bz-arch-chip-note">No install, no local server, login over the internet</span></div></div>
  <div class="bz-arch-layer"><span class="bz-arch-layer-label">Application</span><div class="bz-arch-layer-content"><span class="bz-arch-chip">Shared CRM logic</span><span class="bz-arch-chip">Multitenant</span><span class="bz-arch-chip-note">One codebase serves every customer at once</span></div></div>
  <div class="bz-arch-layer"><span class="bz-arch-layer-label">Data</span><div class="bz-arch-layer-content"><span class="bz-arch-chip">Isolated per tenant</span><span class="bz-arch-chip-note">Each company sees only its own records</span></div></div>
  <div class="bz-arch-layer"><span class="bz-arch-layer-label">Operations</span><div class="bz-arch-layer-content"><span class="bz-arch-chip">Vendor-run servers</span><span class="bz-arch-chip">Subscription billing</span><span class="bz-arch-chip-note">Salesforce handles updates, uptime, and security</span></div></div>
</div>

## Why it mattered

Before Salesforce, enterprise software was a heavy purchase. A company bought licences, then spent months on servers, installation, and consultants. Upgrades meant more disruption and more cost. Only large firms with big IT teams could keep up.

The subscription model lowered the barrier. A small team could sign up, configure the system in days, and start working. The vendor pushed updates to everyone at once, so every customer ran the current version. There were no painful upgrade projects.

This shifted the economics of the whole industry. Vendors earned predictable recurring revenue instead of large one-time fees. Customers turned a capital purchase into an operating expense. The approach proved that mission-critical business software could live on the public internet, an idea many enterprises had resisted. Salesforce grew into one of the largest software companies in the world and made "the cloud" a normal place to run a business.

## How it connects to AI today

Software-as-a-Service is the delivery model behind almost every AI product you use. When you open ChatGPT, Claude, or an AI image tool in a browser and pay a monthly subscription, you are using SaaS. The model runs on the vendor's servers. You bring the input and pay for access. The "No Software" idea from 1999 is now the default for AI.

The technical pattern matters too. Modern AI services are multitenant, like Salesforce. One large model serves thousands of customers, each isolated from the others. Vendors update the model centrally, and every user gets the improvement at once. This is why an AI assistant can get smarter overnight without you installing anything.

Pricing evolved from this lineage. Per-user subscriptions led to usage-based and per-token billing, where AI APIs charge for the amount of text processed. A builder meets this directly when calling a model API: you authenticate over the web, send a request, and pay for what you consume.

Salesforce itself is now an AI company. It embeds AI into its CRM through features that draft sales emails, summarise support cases, score leads, and answer questions about your data in plain language. The same browser, the same subscription, with intelligence added on top. The SaaS chassis it built in 1999 turned out to be the ideal vehicle for delivering AI to non-technical business users at scale.

## Still in use today

Software-as-a-Service is active and dominant. It is the standard way both consumers and companies buy software in 2026. Salesforce remains a leading SaaS platform and one of the largest enterprise software vendors.

Nothing replaced SaaS. It absorbed and outgrew the old model of installed, on-premises software, which now survives mostly in regulated or specialised settings. SaaS itself expanded into related cloud models such as Platform-as-a-Service and Infrastructure-as-a-Service, where vendors rent out development tools and raw computing power on the same subscription logic.

The reasons SaaS persists are the reasons it won: no installation, automatic updates, predictable cost, and access from any device with a browser. AI has reinforced rather than threatened the model. Delivering large models economically requires central servers, shared infrastructure, and metered billing, exactly what Salesforce normalised more than two decades ago.

## Further reading

- [IT History Timeline](/explore/it-timeline/): where Salesforce and SaaS sit in the wider story of computing.
- [AI Learning Galaxy](/explore/galaxy/): explore how cloud delivery connects to modern AI concepts.
- [Three-tier architecture](/history/three-tier/): the client, application, and data layering that web SaaS depends on.
- [HTTP and HTML](/history/http-html/): the web protocols that made browser-delivered software possible.
- [Salesforce on Wikipedia](https://en.wikipedia.org/wiki/Salesforce): company history, products, and the rise of its cloud platform.
- [Software as a service (Wikipedia)](https://en.wikipedia.org/wiki/Software_as_a_service): definition, multitenancy, and the broader cloud-computing context.
