---
title: "Two-Pizza Team"
description: "A small team of roughly five to ten people, small enough to be fed by two pizzas, with clear ownership so it can move fast and communicate with little overhead."
date: 2026-07-01
tags: ["glossary", "teams", "organization", "amazon", "ai"]
related: ["glossary/working-backwards", "guides/from-zero-to-production", "comparisons/agile-vs-waterfall-ai-projects"]
---

<figure class="bz-figure">
  <img src="/img/juggling/three-balls-rgb-convergence-notext.png" alt="Three glowing spheres converging on a black background, representing a small team coordinating closely." loading="lazy">
  <figcaption>A two-pizza team is small enough that a few people stay in sync without heavy process, like these three points converging on one spot.</figcaption>
</figure>

A **two-pizza team** is a team small enough to be fed by two pizzas, which works out to roughly five to ten people. Amazon never fixed an exact number, and different teams read it differently. The idea comes from Amazon and is attributed to Jeff Bezos. A team this size keeps everyone aware of what everyone else is working on, so it moves fast without heavy meetings or approval chains.

## A plain analogy

Think about cooking dinner. Two people share the kitchen without stepping on each other. They talk as they go, and no one needs a schedule. Now imagine twenty cooks in the same kitchen. You need a rota, a head chef, and constant coordination just to avoid collisions. The two-pizza rule keeps a team in the first situation, where communication is cheap and natural.

## How it works

The rule sets a hard ceiling on team size. Amazon uses ideally fewer than ten people per team. When a service grows too large for one team to own, Amazon splits it into separate two-pizza teams rather than growing a single team past the limit. This keeps the organization flat and each team autonomous.

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Size</span>
    <span class="bz-flow-step-name">Cap the headcount</span>
    <span class="bz-flow-step-desc">No team bigger than two pizzas can feed, ideally under ten people.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Own</span>
    <span class="bz-flow-step-name">Single-threaded ownership</span>
    <span class="bz-flow-step-desc">Each team owns one product or service across its whole lifecycle.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Split</span>
    <span class="bz-flow-step-name">Divide when it grows</span>
    <span class="bz-flow-step-desc">A service that outgrows one team becomes two teams, not one large one.</span>
  </div>
</div>

Two benefits follow from the size limit. First, small teams minimize lines of communication and cut the overhead of bureaucracy and decision-making, so they can focus on customers rather than internal process. Second, each team holds single-threaded ownership over a specific product or service, so responsibility is clear. This ownership model maps directly onto service-oriented and microservices architectures, where each service has one team behind it.

## The two-pizza rule in the AI era

On 2026-06-30, Amazon CTO Werner Vogels published a post titled "A return to two-pizza culture" on his blog, revisiting the idea for a world of AI coding agents. His argument: AI agents let a small team build a working prototype in days instead of months. So teams should build and test first, then write the documentation once it reflects real experience. He describes this as preserving two-pizza culture while adapting the older habit of writing detailed specifications up front. Vogels notes that as companies scale, organizational entropy rises and threatens the speed that made small teams successful, which is why the size discipline still matters.

## How it connects to related concepts

The two-pizza team pairs with [working backwards](/glossary/working-backwards/), Amazon's practice of starting from the customer and writing the desired outcome before building. Vogels argues that AI agents shift the order of those two habits, letting teams prototype before they document. His 2026 post is covered in more depth in the [Werner Vogels two-pizza culture](/news/werner-vogels-two-pizza-culture/) news item, and his wider views appear in coverage of his [final re:Invent keynote](/news/werner-vogels-final-keynote/). If you are shipping a first product with a small team, the [from zero to production](/guides/from-zero-to-production/) guide walks through the practical steps.

## Further reading

- [Working backwards](/glossary/working-backwards/): Amazon's method of starting from the customer outcome and writing it down before building.
- [Werner Vogels two-pizza culture](/news/werner-vogels-two-pizza-culture/): coverage of the June 2026 post revisiting the idea for AI agents.
- [Werner Vogels final keynote](/news/werner-vogels-final-keynote/): context on Vogels' broader engineering-culture arguments.
- [From zero to production](/guides/from-zero-to-production/): a practical path for a small team shipping its first product.
- [Agile vs waterfall for AI projects](/comparisons/agile-vs-waterfall-ai-projects/): how team structure shapes delivery method.
- [Two-pizza teams (AWS Executive Insights)](https://aws.amazon.com/executive-insights/content/amazon-two-pizza-team/): Amazon's own explanation of the size rule and single-threaded ownership.
- [A return to two-pizza culture (Werner Vogels)](https://www.allthingsdistributed.com/2026/06/return-to-two-pizza-culture.html): the primary source for the AI-era argument.

## Sources

- https://aws.amazon.com/executive-insights/content/amazon-two-pizza-team/
- https://www.allthingsdistributed.com/2026/06/return-to-two-pizza-culture.html
