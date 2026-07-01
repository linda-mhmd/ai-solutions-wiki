---
title: "Werner Vogels revisits two-pizza teams and Working Backwards for the AI era"
description: "Amazon CTO Werner Vogels argues that cheap AI-assisted prototyping lets teams build first and write the document second, amending the classic Working Backwards process."
date: 2026-06-30
lastmod: 2026-07-01
categories: [News]
tags: ["werner vogels", "amazon", "two-pizza teams", "working backwards", "product development", "ai prototyping"]
related:
  - glossary/two-pizza-team
  - glossary/working-backwards
  - glossary/ai-agents
  - tools/claude-code
---

<figure class="bz-figure">
  <img src="/img/wardrobe/junior-partner-collaboration.png" alt="Two people working closely together at a shared table, representing a small, self-contained team." loading="lazy">
  <figcaption>A two-pizza team is small enough that everyone knows what everyone else is working on, without heavy meetings.</figcaption>
</figure>

On 2026-06-30, Amazon CTO Werner Vogels published a post titled "A return to two-pizza culture" on his All Things Distributed blog. It revisits two ideas that shaped how Amazon builds products, and argues that cheap [AI-assisted prototyping](/glossary/ai-agents/) changes when it may make sense to prototype before writing the full document.

The first idea is the [two-pizza team](/glossary/two-pizza-team/). The rule, attributed to Jeff Bezos, is that no team should be larger than two pizzas can feed, which usually means fewer than ten people. A small team means everyone knows what everyone else is working on without long meetings. Each team owns one service or product across its full lifecycle, from build through operations.

The second idea is [Working Backwards](/glossary/working-backwards/). Amazon defines a product by writing the document first, often a mock press release and a set of FAQs, before writing any code. The point is clarity of thought. Writing forces you to think through the customer problem, and it lets people who do not code define what a product should be. Vogels notes the limitation: the document grounds decisions in assumptions rather than in reality.

## What changed

Vogels argues that a shift in how software gets built now lets teams amend the order. When there is conviction about a customer problem but uncertainty about whether an approach will work, prototyping is cheap enough to do first. A team can build a rough version, use it the way a customer would, find the gaps, share it with colleagues, and only then write the document.

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 1</span>
    <span class="bz-flow-step-name">Build a prototype</span>
    <span class="bz-flow-step-desc">Start when you have conviction about the problem but doubt about the approach. AI-assisted building makes this fast.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 2</span>
    <span class="bz-flow-step-name">Use it as a customer would</span>
    <span class="bz-flow-step-desc">Click through the real thing. Reality reveals gaps that theoretical planning misses.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 3</span>
    <span class="bz-flow-step-name">Share with colleagues</span>
    <span class="bz-flow-step-desc">Something tangible to react to sharpens feedback and surfaces disagreement early.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 4</span>
    <span class="bz-flow-step-name">Then write the document</span>
    <span class="bz-flow-step-desc">The write-up is grounded in evidence, not speculation. The result is a better document.</span>
  </div>
</div>

Vogels puts the trade-off plainly. In his words, "You will learn more in one evening of building than in two weeks of writing about what you think will happen." He adds that "the document you produce after building is fundamentally better than the one you would have written before," because having something to click through as you write changes its quality.

This is not a rejection of Working Backwards. The document still matters, and the two-pizza team is still the unit that owns the work. The change is narrow. When prototyping costs days instead of weeks, building can come first and inform the writing rather than follow it.

## Why it matters

Working Backwards became one of the most copied product practices in the industry, so a public amendment from Amazon's CTO carries weight. The core argument is about sequence, not principle. Writing to reach clarity still works. What changed is the cost of getting a real prototype in front of people.

For teams adopting AI-assisted building, the practical takeaway is concrete. When you are confident about the problem but unsure about the solution, build something you can use before you commit the plan to paper. The prototype is not the deliverable. It is a research instrument that makes the eventual document sharper. This mirrors older build-first thinking, such as the [build-measure-learn loop](/guides/build-measure-learn/), and it fits how many teams now use coding assistants like [Claude Code](/tools/claude-code/) to reach a working version quickly.

## Further reading

- [What is a two-pizza team?](/glossary/two-pizza-team/): the small-team structure Amazon uses to keep ownership and speed
- [What is Working Backwards?](/glossary/working-backwards/): Amazon's practice of writing the document before building the product
- [Build-Measure-Learn](/guides/build-measure-learn/): the feedback loop that treats early builds as experiments
- [Lean Canvas](/guides/lean-canvas/): a one-page way to capture a business idea before you commit to it
- [Werner Vogels' final keynote](/news/werner-vogels-final-keynote/): more on how Vogels frames building at scale
- [A return to two-pizza culture](https://www.allthingsdistributed.com/2026/06/return-to-two-pizza-culture.html): the primary post by Werner Vogels
- [Amazon's two-pizza team model](https://aws.amazon.com/executive-insights/content/amazon-two-pizza-team/): AWS explainer on the origin and structure

## Sources

- Werner Vogels, "A return to two-pizza culture", All Things Distributed, 2026-06-30: https://www.allthingsdistributed.com/2026/06/return-to-two-pizza-culture.html
- AWS Executive Insights, "Amazon's two-pizza team": https://aws.amazon.com/executive-insights/content/amazon-two-pizza-team/
