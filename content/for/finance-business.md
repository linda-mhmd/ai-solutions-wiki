---
aliases: ["/finance-business/"]
title: "For Finance and Business"
description: "AI projects have costs, timelines, and regulatory risks. Evaluate them with confidence instead of relying entirely on the engineering team."
date: 2026-05-29
tags: ["finance", "business", "governance", "risk", "beginner"]
last_updated: 2026-05-30
---

## Evaluate AI projects like an investor, not a bystander.

<figure class="bz-figure">
  <img src="/img/wardrobe/imposing-grid-discipline.png" alt="Grid of structured fabric swatches in a dark, disciplined arrangement." loading="lazy">
  <figcaption>A budget without a model is guesswork. AI costs need the same grid discipline as any capital investment.</figcaption>
</figure>

AI project budgets are hard to read from the outside. Engineering teams talk in tokens, compute hours, and inference costs. Vendors quote per-seat prices that hide the infrastructure underneath. Regulators are adding obligations that nobody has fully mapped yet.

Your job is not to become a machine learning engineer. It is to ask the questions that an informed investor would ask: what does this cost at scale, what are the compliance obligations, and what happens when the system fails?

This wiki gives you the vocabulary to ask those questions with precision.

---

### Where AI budgets go wrong

**Infrastructure costs balloon in production.** A prototype that costs €50 a month can cost €5,000 a month under real traffic. The difference is inference volume, data storage, and the model tier chosen. Understanding the cloud layer tells you what to look for in a cost estimate.

**"AI-powered" is not a cost category.** When an engineering team says "we use AI," that can mean a €0.002-per-call API, a fine-tuned model requiring dedicated GPU compute, or a third-party SaaS layer with unpredictable pricing. Each has a different cost structure and a different risk profile.

**Regulatory obligations are arriving fast.** The EU AI Act creates tiered obligations based on risk classification. ISO 42001 establishes an AI management system standard. Neither is optional for organisations operating in Europe. The frameworks section of this wiki covers both in plain language.

---

### Your reading path

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Start</span>
    <span class="bz-flow-step-name">What is the Cloud?</span>
    <span class="bz-flow-step-desc">Cloud cost is the primary variable in AI infrastructure budgets. Start with the fundamentals.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Costs</span>
    <span class="bz-flow-step-name">AI Cost Accounting</span>
    <span class="bz-flow-step-desc">How to model AI project costs, identify the cost drivers, and build a realistic budget.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Scale</span>
    <span class="bz-flow-step-name">Capacity Planning for AI</span>
    <span class="bz-flow-step-desc">What happens to your cost model when usage grows by 10x. Plan before it happens.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Compliance</span>
    <span class="bz-flow-step-name">EU AI Act Risk Framework</span>
    <span class="bz-flow-step-desc">The four risk tiers, your obligations at each tier, and what non-compliance costs.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Standards</span>
    <span class="bz-flow-step-name">ISO 42001</span>
    <span class="bz-flow-step-desc">The international standard for AI management systems. Increasingly required in procurement.</span>
  </div>
</div>

---

### The financial questions that change AI proposals

- What is the cost per 1,000 API calls, and what is the projected monthly call volume?
- Does this cost model scale linearly or does it have step-change thresholds?
- Which AI Act risk tier does this system fall into, and what are the compliance costs at that tier?
- What is the cost of a model failure? Is there a fallback system?
- Which components are vendor-locked, and what is the switching cost?

These are not technical questions. They are financial due-diligence questions applied to an AI context. Any engineering team that cannot answer them has not modelled the business case properly.

---

### Regulatory vocabulary you will need

**EU AI Act risk tiers:** Unacceptable risk (prohibited), high risk (conformity assessment required), limited risk (transparency obligations), minimal risk (voluntary). Where your system lands determines your compliance workload.

**ISO 42001:** An ISO management system standard for AI. Auditable. Certification-ready. Increasingly required by enterprise procurement teams and public sector contracts.

**AI governance:** The policies, roles, and processes that ensure AI systems are accurate, safe, and legally compliant. Not the same as data governance, though the two overlap.

---

**Start here:** [What is the Cloud?](/basics/what-is-the-cloud/)

## Also useful

- [AI Cost Accounting](/guides/ai-cost-accounting/): a structured approach to modelling and controlling AI infrastructure spend
- [EU AI Act Risk Framework](/frameworks/eu-ai-act-risk-framework/): the regulatory framework your legal and compliance teams need to understand
- [ISO 42001](/frameworks/iso-42001/): the management system standard that enterprise procurement is starting to require
- [Capacity Planning for AI](/guides/capacity-planning-ai/): how usage growth translates into infrastructure cost, before it becomes a surprise
