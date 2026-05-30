---
title: "Lean Canvas - One-Page Business Model for New Products"
description: "A complete guide to the Lean Canvas, Ash Maurya's adaptation of the Business Model Canvas for startups and new product initiatives, covering all nine boxes and how to iterate through assumptions systematically."
date: 2026-05-28
categories: [Guides]
tags: [open-practice-library, product-management, strategy, lean-startup, business-model, discovery]
related:
  - guides/impact-mapping
  - guides/build-measure-learn
  - guides/from-zero-to-production
  - guides/event-storming
last_updated: 2026-05-30
---

Before you write a user story, before you open a code editor, before you provision a single resource, you need a one-page answer to the question: does this business model hold together? The Lean Canvas, developed by Ash Maurya as an adaptation of Osterwalder's Business Model Canvas, is that answer. It is designed for speed: you should be able to fill one in during a 60-90 minute session, and update it in 15 minutes when your assumptions prove wrong.

The Lean Canvas is problem-focused where the Business Model Canvas is customer-focused. That shift matters for early-stage products and AI initiatives: you do not yet know who your exact customer is, but you can state the problem you are solving and test it fast.

<figure class="bz-figure">
  <img src="/img/wardrobe/imposing-grid-discipline.png" alt="A structured grid of fabric swatches arranged in precise rows and columns, each section distinct: a physical canvas of organized, inspectable assumptions." loading="lazy">
  <figcaption>The Lean Canvas is a grid. Nine boxes. Each one a distinct assumption to state and test. The discipline is filling it in honestly, not optimistically.</figcaption>
</figure>

## The Nine Boxes

<div class="bz-arch">
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Problem space</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Problem</span>
      <span class="bz-arch-chip">Customer Segments</span>
      <span class="bz-arch-chip">Existing Alternatives</span>
      <span class="bz-arch-chip-note">The top three problems your customers face. Who has those problems. What they currently do instead of using your solution.</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Value space</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Unique Value Proposition</span>
      <span class="bz-arch-chip">Solution</span>
      <span class="bz-arch-chip">Channels</span>
      <span class="bz-arch-chip-note">The single, clear message that explains why you are different and worth attention. The top three features that deliver on that message. How you reach your customers.</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Business viability</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Revenue Streams</span>
      <span class="bz-arch-chip">Cost Structure</span>
      <span class="bz-arch-chip">Key Metrics</span>
      <span class="bz-arch-chip">Unfair Advantage</span>
      <span class="bz-arch-chip-note">How you make money, what it costs you to operate, the one metric that tells you whether you are succeeding, and what you have that competitors cannot easily copy.</span>
    </div>
  </div>
</div>

**Problem.** List the top three problems your target customer faces related to the area you are working in. Be specific. "Our customers waste 3 hours a week on manual invoice reconciliation" is a problem. "Customers want better software" is not.

**Customer Segments.** Who has those problems? Start narrow: the more specific your early adopter profile, the faster you can validate. You can expand later. For AI products: identify not just who uses the system but who owns the budget and who is affected by the outcome.

**Unique Value Proposition.** One sentence that explains what you do, who it is for, and what makes it different. It should be clear enough that a prospect can read it and immediately understand whether they are the target customer. The UVP sits at the centre of the canvas because every other box either explains it or enables it.

**Solution.** The top three capabilities of your product that directly address the top three problems. Not a feature list: the three most important things. For AI products, resist the urge to lead with the technology ("GPT-4 powered"). Lead with the outcome ("Invoices reconciled automatically, reviewed and approved by finance teams in minutes").

**Channels.** How do customers find out about you, try the product, buy it, and get support? Different channels have different costs and conversion rates. Early-stage products should focus on low-cost, high-feedback channels: direct sales, communities, content.

**Revenue Streams.** How do you make money? Subscription, usage-based, per-seat, one-time, professional services? Include the price point if you have one. "Enterprise contract, TBD" is not a revenue stream.

**Cost Structure.** The top costs to deliver the product. For AI products this almost always includes: model API costs (usage-based and highly variable), cloud infrastructure, labelling or fine-tuning costs, engineering time.

**Key Metrics.** The one number that tells you whether the business is working. Not a dashboard of twenty metrics: the one leading indicator. For a SaaS product: monthly active users, or activation rate, or expansion revenue. Choose the metric that, if it goes up, you are confident everything else follows.

**Unfair Advantage.** What do you have that a well-funded competitor could not copy in six months? Proprietary data, exclusive partnerships, regulatory certification, an expert team, a distribution relationship. This is often the hardest box to fill honestly. If you cannot fill it, treat that as a risk.

## How It Differs From the Business Model Canvas

| Lean Canvas | Business Model Canvas |
|---|---|
| Problem-focused | Customer-focused |
| Designed for startups and new initiatives | Designed for existing businesses |
| Replaces Key Partners, Key Activities, Key Resources with Problem, Solution, Key Metrics | Includes those partner and activity boxes |
| Optimised for speed, fill it in one session | More comprehensive, suited to strategic planning exercises |
| Intended to be wrong and updated frequently | Intended to document a known, working business model |

Both tools share the Revenue Streams, Cost Structure, Channels, Customer Segments, and Value Proposition boxes.

## Recommended Filling Order

The boxes are designed to be filled in a specific order that mirrors the logic of business validation, not the spatial layout of the canvas.

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">1</span>
    <span class="bz-flow-step-name">Problem</span>
    <span class="bz-flow-step-desc">What are the top three problems? If you cannot state them, you are not ready to build.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">2</span>
    <span class="bz-flow-step-name">Customer Segments</span>
    <span class="bz-flow-step-desc">Who has those problems? Define the early adopter profile specifically.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">3</span>
    <span class="bz-flow-step-name">Unique Value Proposition</span>
    <span class="bz-flow-step-desc">What is your single clear message? Write it before you touch the Solution box.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">4</span>
    <span class="bz-flow-step-name">Solution → Channels → Revenue → Cost → Metrics → Advantage</span>
    <span class="bz-flow-step-desc">Fill these in order, each informed by what you wrote before. Finish with Unfair Advantage. it requires honest self-assessment.</span>
  </div>
</div>

## The Iterate Loop

A Lean Canvas is not a document you produce once. It is a living artefact that changes as you learn. Ash Maurya's process is explicit about this:

1. Fill the canvas with your current best assumptions.
2. Rank each assumption by riskiness, which one, if wrong, kills the business?
3. Design the smallest experiment that tests the riskiest assumption.
4. Run the experiment (a customer interview, a landing page, a prototype, a manual process).
5. Update the canvas with what you learned.
6. Repeat.

The canvas evolves through three stages. Version 1 is almost entirely assumptions. Version 3 is mostly validated learning. The gap between those versions is the work of product discovery.

## How It Connects to Impact Mapping

The Lean Canvas and Impact Mapping operate at complementary levels. The Lean Canvas answers: "Is this a viable business?" Impact Mapping answers: "Given that we are building this, what should we actually build?"

The Why column of an Impact Map should align with the business goal implicit in your Lean Canvas. The Problem and UVP boxes on the canvas should inform the actors and impacts on the map. Run Lean Canvas first to validate the business model, then run Impact Mapping to plan the product work.

## When to Use It

Fill a Lean Canvas before writing a single line of code on any new product initiative. Use it when pivoting to ensure the new direction has a coherent business model. Use it when pitching to investors or internal stakeholders, a well-filled canvas communicates the business logic in 90 seconds.

## Further Reading

- [Impact Mapping](/guides/impact-mapping/): the next step after Lean Canvas; plan the product work that delivers on your UVP
- [Build-Measure-Learn](/guides/build-measure-learn/): the iterative process for testing Lean Canvas assumptions
- [AI Monetization Strategies](/guides/ai-monetization-strategies/): pricing models specific to AI products; feeds into Revenue Streams and Cost Structure
- [AI Product Management](/guides/ai-product-management/): broader product management context for AI initiatives
- [AI Product Metrics](/guides/ai-product-metrics/): how to pick the right Key Metrics for an AI product
- [Choosing Your First AI Use Case](/guides/choosing-your-first-ai-use-case/): the Lean Canvas is the right tool to evaluate AI use case candidates
