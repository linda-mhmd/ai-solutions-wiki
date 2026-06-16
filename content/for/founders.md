---
aliases: ["/founders/"]
title: "For Founders and Entrepreneurs"
description: "Know what you are building before the first sprint. Understand the technical architecture well enough to scope, hire, and make the right calls early."
date: 2026-05-29
tags: ["founder", "entrepreneur", "strategy", "product"]
last_updated: 2026-05-30
---

## Know what you are building before the first sprint.

<figure class="bz-figure">
  <img src="/img/wardrobe/stepping-out-deployment.png" alt="Silhouette of a person stepping out of a doorway into amber street light, committing to forward motion." loading="lazy">
  <figcaption>Shipping is a decision. The architecture you commit to before the first sprint shapes every decision after it.</figcaption>
</figure>

You are spending money on engineers and vendors before you have a working product. Every architecture decision made in the first two sprints will still be visible in production two years later. Scope creep, wrong-stack hiring, and vendor lock-in all trace back to decisions made without enough information.

You do not need to write the code. You need to understand the structure of what is being built well enough to evaluate proposals, ask the right questions in hiring conversations, and recognise when a vendor is selling you something you do not need.

---

### The decisions that cost founders most

**Hiring for the wrong stack** is the most expensive early mistake. A team hired to build a Python backend cannot easily absorb a sudden requirement for a React Native mobile app. Understanding what you are building before you hire means knowing which skills are genuinely required.

**Scope creep from architectural ambiguity** happens when the founding team cannot evaluate what is feasible. An engineer proposes three approaches. Without a working model of the tradeoffs, you defer to whoever is most confident. That is not a technical decision. It is an information asymmetry problem.

**Vendor lock-in that was not visible until too late.** Some infrastructure choices are easy to change. Others are load-bearing. Knowing which is which before you sign a contract is worth more than any discount a vendor offers.

---

### Your reading path

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Start</span>
    <span class="bz-flow-step-name">What is the Cloud?</span>
    <span class="bz-flow-step-desc">Where your product runs, how costs scale, and what "infrastructure" actually means in practice.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Connections</span>
    <span class="bz-flow-step-name">What is an API?</span>
    <span class="bz-flow-step-desc">How every component in your system talks to every other component. The connective tissue.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">AI Architecture</span>
    <span class="bz-flow-step-name">Building RAG Systems</span>
    <span class="bz-flow-step-desc">The most common AI architecture your team will propose. Know the components before they pitch it.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Full Picture</span>
    <span class="bz-flow-step-name">From Zero to Production</span>
    <span class="bz-flow-step-desc">The complete journey from idea to live product. See the map before you draw the roadmap.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Team</span>
    <span class="bz-flow-step-name">Team Topologies for AI</span>
    <span class="bz-flow-step-desc">How to structure a technical team around AI systems. Relevant before your first engineering hire.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Strategy</span>
    <span class="bz-flow-step-name">Wardley Mapping for AI</span>
    <span class="bz-flow-step-desc">A visual tool for mapping where AI creates genuine competitive advantage versus where it is commodity.</span>
  </div>
</div>

---

### Technical vocabulary that changes hiring conversations

When you interview an engineer, these terms tell you whether they have production experience or only tutorial experience.

**Horizontal scaling:** Adding more machines to handle more traffic. Contrast with vertical scaling, which means upgrading one machine. The choice between them affects both cost and architecture.

**Latency vs. throughput:** Latency is how long one request takes. Throughput is how many requests per second the system handles. A system optimised for one may perform poorly on the other. Ask about both.

**Stateless services:** Services that do not store session information between requests. Stateless services are easier to scale. Ask whether proposed services are stateless or stateful and why.

**Idempotency:** A property of an operation that produces the same result whether it runs once or ten times. Critical for payment processing and any operation that must not be duplicated.

These are not exam questions. They are calibration signals. An engineer who cannot explain the tradeoffs in plain language when asked probably has not encountered them in production.

---

### On AI specifically

Most AI features at the early stage are built on foundation models you access via an API. You are not training a model. You are paying per call. The cost model is predictable at low volume and requires careful management at scale.

The question to ask before committing to any AI feature is: what does this do when the model is wrong? Every AI system has a failure mode. The architecture around the model determines how visible and how costly that failure mode is.

---

**Start here:** [What is the Cloud?](/basics/what-is-the-cloud/)

## Also useful

- [Building RAG Systems](/guides/building-rag-systems/): the architecture behind most AI product features, explained at the structural level
- [Team Topologies for AI](/frameworks/team-topologies-ai/): how to organise an engineering team around AI systems before you make your first hire
- [Wardley Mapping for AI](/frameworks/wardley-mapping-ai/): a strategic framework for identifying where AI investment creates real advantage
- [From Zero to Production](/guides/from-zero-to-production/): the full production journey from first commit to live product
