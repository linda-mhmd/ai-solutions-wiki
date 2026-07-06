---
title: "Working Backwards"
description: "Amazon's practice of defining a product by starting from the customer and writing the document first, before any code is written."
date: 2026-07-01
tags: ["product", "amazon", "process", "prototyping"]
related: ["glossary/two-pizza-team", "guides/build-measure-learn", "guides/lean-canvas"]
---

<figure class="bz-figure"><img src="/img/wardrobe/stylists-brief-ai.png" alt="A stylist brief and notes laid out, representing defining a product on paper before building it." loading="lazy"><figcaption>Working Backwards asks you to write the brief for a product before anyone cuts the cloth.</figcaption></figure>

Working Backwards is Amazon's practice of defining a product by starting from the customer and writing the document first, before any code is written. You draft a mock press release and a set of frequently asked questions, together called the PR-FAQ. This forces clarity of thought about what you will build, and why a customer would want it, at a stage where the only cost is words on a page.

## A plain-English analogy

Think of a stylist who writes the brief before touching a single garment. The brief names the person, the occasion, and the promised outcome. If the brief reads flat, you rewrite it. Nobody has cut expensive fabric yet. Working Backwards treats a product the same way: the press release is the brief, and you keep editing it until the promise is clear. Only then do you build.

## How it works

The core artifact is the PR-FAQ: a mock press release plus a frequently-asked-questions document. From there the idea moves through discussion into building.

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 1</span>
    <span class="bz-flow-step-name">Press release</span>
    <span class="bz-flow-step-desc">Write the launch announcement as if the product already shipped. State the customer benefit plainly.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 2</span>
    <span class="bz-flow-step-name">FAQ</span>
    <span class="bz-flow-step-desc">Answer the hard questions a customer and an internal team would ask.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 3</span>
    <span class="bz-flow-step-name">Discuss and refine</span>
    <span class="bz-flow-step-desc">Circulate the PR-FAQ, debate the hard questions, and rewrite until the idea is clear.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 4</span>
    <span class="bz-flow-step-name">Build</span>
    <span class="bz-flow-step-desc">Move to prototype and production once the document earns conviction.</span>
  </div>
</div>

Teams often add supporting documents, such as a customer-experience narrative or a draft user manual, but these are optional artifacts rather than required stages.

Why does it work? Writing surfaces the customer problem and the promised outcome early and cheaply. As Werner Vogels puts it, getting the idea out of your head and onto paper is how you hone the idea. It also democratizes product creation. Anyone with a well-written idea and a compelling argument can define what gets built next, not only the most senior voice in the room.

## The AI-era amendment

In a June 2026 post, Werner Vogels described a change to the sequence. Coding agents now make a working prototype cheap to produce. So when you have conviction about the customer problem but uncertainty about the approach, you can build first.

You build a prototype, use it as a customer would, find the gaps, and only then write the document. Vogels argues you learn more in one evening of building than in two weeks of writing about what you think will happen. The document you write afterward is stronger, because it rests on what you observed rather than on your assumptions. The tool has changed; the goal has not. Working Backwards still starts from the customer. AI only changes where prototyping fits in the sequence, not the customer-first philosophy behind it, and you still seek clarity before you commit real resources.

## How it connects to related concepts

Working Backwards pairs with the [two-pizza team](/glossary/two-pizza-team/), the small autonomous group Amazon uses to own a product from idea to operation. A tight team writing its own PR-FAQ keeps ownership and decision-making in one place.

<figure class="bz-figure">
  <img src="/img/pizza-two-doughs.png" alt="Two rounds of pizza dough resting side by side on a floured surface." loading="lazy">
  <figcaption>The two-pizza team: a group no larger than two pizzas can feed, small enough to own a product end to end.</figcaption>
</figure>

The AI-era prototype-first version echoes the [build-measure-learn](/guides/build-measure-learn/) loop from lean startup thinking: you build a small thing, observe how it behaves, and learn before you scale. The PR-FAQ itself sits close to the [Lean Canvas](/guides/lean-canvas/), another single-page tool that forces you to name the customer and the problem before the solution.

For the wider culture behind the practice, see the coverage of [Werner Vogels on two-pizza culture](/news/werner-vogels-two-pizza-culture/).

## Further reading

- [Two-pizza team](/glossary/two-pizza-team/): the small autonomous team that owns a product end to end.
- [Build-Measure-Learn](/guides/build-measure-learn/): the loop behind learning from a prototype before scaling.
- [Lean Canvas](/guides/lean-canvas/): a one-page tool to name the customer and problem first.
- [Werner Vogels on two-pizza culture](/news/werner-vogels-two-pizza-culture/): the June 2026 post that amended Working Backwards for the AI era.
- [Return to Two-Pizza Culture, Werner Vogels](https://www.allthingsdistributed.com/2026/06/return-to-two-pizza-culture.html): the primary source for the prototype-first amendment.
