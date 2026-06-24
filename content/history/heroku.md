---
title: "Heroku: The Git Push That Replaced the Server"
description: "Heroku is the platform-as-a-service that let developers deploy apps with a git push, popularizing the developer-friendly PaaS model that shapes AI deployment today."
date: 2026-06-23
categories: [History]
tags: [heroku, paas, cloud, deployment, devops, ruby, salesforce]
related:
  - explore/it-timeline
  - explore/galaxy
  - history/salesforce-saas
  - history/three-tier
  - history/apache-httpd
faqs:
  - question: "What was Heroku and what did it do?"
    answer: "Heroku was a platform-as-a-service (PaaS). You ran git push and Heroku built, packaged, and ran your web application on managed servers. You wrote code and never touched the operating system, web server, or scaling configuration directly."
  - question: "Is Heroku still around in 2026?"
    answer: "Yes, Heroku still runs and is owned by Salesforce. It is in maintenance mode for most builders. It removed its free tier in November 2022, which pushed many small projects toward newer platforms like Railway, Render, Fly.io, and Vercel."
  - question: "Why does Heroku matter for AI developers?"
    answer: "Heroku invented the deploy-with-one-command model that modern AI tooling depends on. The same git push workflow now ships AI agents, RAG backends, and inference APIs on platforms that copied Heroku's design directly."
---

Heroku is a platform-as-a-service (PaaS) that lets developers deploy a web application by running `git push heroku main`, with no server administration. Launched commercially with Ruby support in 2009, it turned deployment from a multi-day operations task into a single command. Salesforce acquired it in 2010, and its developer-first model became the template that almost every modern app platform copies.

<figure class="bz-figure"><img src="/img/enterprise-dark/hands-hologram-interface-notext.png" alt="Two hands resting on a glowing holographic control interface in a dark room, suggesting direct control over a system without touching the machinery beneath it, much like Heroku let developers run apps without managing servers." loading="lazy"><figcaption>Heroku gave developers a clean control surface and hid the servers, networking, and scaling underneath.</figcaption></figure>

## What it was

Before Heroku, shipping a web app meant renting a server, installing an operating system, configuring a web server, opening firewall ports, and wiring up a database by hand. This took days and demanded operations skills that many developers lacked.

Heroku removed all of that. You pushed your code with Git, and Heroku detected the language, installed dependencies, and ran your app on managed infrastructure. It introduced the idea of a "dyno", a lightweight isolated container that runs one process. Need more capacity? You scale by adding dynos, not by provisioning machines.

Think of it like valet parking for code. You hand over the keys at the door and walk straight in. Someone else parks the car, refuels it, and brings it back when you need it. You never see the garage.

Heroku also popularized the "buildpack", a recipe that turns raw source code into a runnable image. It published the Twelve-Factor App methodology, a set of rules for building software that scales cleanly on cloud platforms. Those rules still guide cloud-native design in 2026.

<div class="bz-flow">
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Step 1</span><span class="bz-flow-step-name">git push</span><span class="bz-flow-step-desc">You push your code to the Heroku remote from your terminal.</span></div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Step 2</span><span class="bz-flow-step-name">Buildpack</span><span class="bz-flow-step-desc">Heroku detects the language and builds a runnable image called a slug.</span></div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Step 3</span><span class="bz-flow-step-name">Release</span><span class="bz-flow-step-desc">Config vars and add-ons attach, and the new version is staged.</span></div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Step 4</span><span class="bz-flow-step-name">Run dynos</span><span class="bz-flow-step-desc">Dynos start the app, routed and load-balanced, live on a URL.</span></div>
</div>

## Why it mattered

Heroku changed who was allowed to ship software. A solo developer or a small startup could now launch a production app without hiring an operations team. This lowered the cost and the skill barrier for going live.

It proved that deployment could be a developer experience, not an infrastructure chore. The `git push` deploy felt magical in 2009, and it set a standard that users now expect from every platform.

Heroku's add-on marketplace was equally influential. You attached a managed database, a cache, a logging service, or an email sender with one command. This modular, plug-in-a-service approach showed how cloud applications could be assembled from composable parts rather than built from scratch.

Its Twelve-Factor App guide gave the industry a shared vocabulary. Stateless processes, configuration in the environment, and disposable instances all became default assumptions for cloud software. The methodology outlived many of the tools that inspired it.

## How it connects to AI today

Heroku's core idea, ship code with one command and let the platform run it, is now the foundation of how AI products reach users. The `git push` deploy pattern is everywhere. Modern platforms like Railway, Render, Fly.io, and Vercel are direct descendants. They borrowed Heroku's developer experience and rebuilt it on newer infrastructure.

A builder shipping an AI feature in 2026 meets this lineage constantly. You write a Python backend that calls a large language model, push it to a PaaS, and the platform runs your inference API without you touching a server. That entire workflow is the Heroku model applied to AI.

The container-per-process idea behind dynos previewed how AI inference now scales. Today you run model endpoints and agent workers as horizontally scalable containers, adding instances under load. Serverless GPU platforms apply the same scale-by-instance logic to expensive model calls.

Heroku's add-on marketplace prefigured today's AI service composition. A modern AI app attaches a vector database, an observability tool, and a model provider as managed services, exactly as Heroku users once attached Postgres and Redis. The Twelve-Factor rule of keeping secrets in environment variables is now how you store API keys for AI providers safely. Even AI coding agents that deploy on your behalf assume a one-command deploy target exists, an expectation Heroku created.

## Still in use today

Heroku is in maintenance mode. It still runs, and Salesforce continues to operate it, but it is no longer the default choice for new projects. The product receives security updates and incremental improvements rather than bold reinvention.

The turning point came in November 2022, when Heroku removed its free tier. Hobby projects and student apps that had run for free now needed a paid plan. Many builders moved to newer platforms that offered generous free usage and faster deploys, and that exodus cemented Heroku's shift toward established enterprise customers.

Heroku persists because its model works and its inertia is strong. Large organizations run stable production workloads on it, and the Salesforce ecosystem keeps it relevant for enterprise integration. New entrants did not kill the concept. They refined it. The git-push-to-deploy idea is more dominant than ever, even as the original platform that proved it settles into a steady, supporting role.

## Further reading

- [IT History Timeline](/explore/it-timeline/): see where Heroku sits in the broader story of computing and the cloud.
- [AI Learning Galaxy](/explore/galaxy/): explore how deployment platforms connect to modern AI building.
- [Salesforce and SaaS](/history/salesforce-saas/): the company that acquired Heroku and pioneered software as a service.
- [The Three-Tier Architecture](/history/three-tier/): the web app structure Heroku was built to deploy cleanly.
- [Heroku (Wikipedia)](https://en.wikipedia.org/wiki/Heroku): history, acquisition, and product timeline.
- [The Twelve-Factor App](https://12factor.net/): the cloud-native methodology Heroku authored and published.
