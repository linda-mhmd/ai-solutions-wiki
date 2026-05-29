---
title: "Impact Mapping - Connecting Goals to Deliverables"
description: "A step-by-step guide to Impact Mapping, the strategic planning technique that stops teams building features nobody asked for by anchoring every deliverable to a business goal."
date: 2026-05-28
categories: [Guides]
tags: [open-practice-library, product-management, discovery, facilitation, agile, strategy]
related:
  - guides/user-story-mapping
  - guides/event-storming
  - guides/lean-canvas
  - guides/build-measure-learn
---

Most teams skip straight to the feature list. Impact Mapping is the practice that stops them. It is a strategic planning technique developed by Gojko Adzic that forces a team to connect every deliverable back to a measurable business outcome before a single story is written. If a feature cannot be traced to an impact on an actor who is connected to a goal, it does not belong in the plan.

The practice is documented in the Open Practice Library at [openpracticelibrary.com/practice/impact-mapping](https://openpracticelibrary.com/practice/impact-mapping/).

<figure class="bz-figure">
  <img src="/img/wardrobe/atelier-archive-overview.png" alt="A person browsing a curated archive of dark garments on long rails: exploring the collection with intent, not impulse." loading="lazy">
  <figcaption>Browsing the archive with purpose. Impact Mapping is the discipline of only pulling items that serve a specific goal: not adding to the rail because they look interesting.</figcaption>
</figure>

## The Four Levels

An Impact Map is a tree with four levels. Reading left to right, each level answers one question.

<div class="bz-arch">
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Why</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Business goal</span>
      <span class="bz-arch-chip-note">A measurable outcome the organisation wants to achieve. Expressed in business terms, not technical ones. Example: increase marketplace gross merchandise value by 30% in Q3.</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Who</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Buyers</span>
      <span class="bz-arch-chip">Sellers</span>
      <span class="bz-arch-chip">Support agents</span>
      <span class="bz-arch-chip-note">Actors who can influence the goal. users, customers, partners, internal teams, even the system itself. Ask: who helps us achieve this? Who could block it?</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">How</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Buyers list more items</span>
      <span class="bz-arch-chip">Sellers publish faster</span>
      <span class="bz-arch-chip">Agents resolve disputes quicker</span>
      <span class="bz-arch-chip-note">Impacts. changes in actor behaviour that move the needle on the goal. These are not features. They are behaviour changes you want to create.</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">What</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Saved searches</span>
      <span class="bz-arch-chip">Bulk listing tool</span>
      <span class="bz-arch-chip">AI draft response</span>
      <span class="bz-arch-chip-note">Deliverables. the features, content, and systems you build to support the impacts. Only reach this level after the Why, Who, and How are agreed.</span>
    </div>
  </div>
</div>

**Why** is always a business goal with a measurable target and a timeframe. Vague goals like "improve the user experience" are not acceptable: they cannot be used to evaluate whether a feature is worth building.

**Who** covers all actors with a stake in the outcome: primary users, secondary users, administrators, third-party partners, and occasionally the automated system itself. Each actor gets its own branch.

**How** captures the behaviour change you want from that actor. This is the hardest level to fill in correctly because teams default to writing features. If it sounds like a button or a page, it is a What, not a How.

**What** is the deliverable: software features, content, integrations, process changes: that makes the impact plausible. Multiple Whats can serve the same How.

## When to Use Impact Mapping

Run Impact Mapping before starting any significant product initiative: at the beginning of a new product, at the start of a quarter, or whenever scope has grown beyond what can be justified. It is also the right tool when a product team and stakeholders are arguing about priorities, the map makes explicit which features serve which goals and lets the room decide based on evidence rather than opinion.

Do not use Impact Mapping for pure maintenance work or for well-understood technical initiatives where the goal is already operationally clear.

## How to Run the Session

**Before the session (15 minutes of preparation).** Invite the right people: a product owner or sponsor who can articulate the business goal, engineers who understand technical constraints, and at least one person with direct knowledge of user behaviour. Book 90 minutes for a focused initiative or half a day for a full product. Prepare a blank whiteboard or a digital canvas (Miro, FigJam) with the four column headings.

**Step 1: Agree the goal (15 minutes).** Write the business goal at the centre-left of the board. Challenge it until it is specific and measurable. "Grow revenue" becomes "increase monthly recurring revenue from the enterprise tier by 20% by end of Q3." If the room cannot agree on a single goal, you have a governance problem that Impact Mapping will surface but cannot solve.

**Step 2: Identify actors (20 minutes).** Brainstorm all actors who can influence the goal. Use sticky notes, one actor per note. Group them: primary users, secondary users, system-level actors, partners. Remove duplicates. Challenge each: "If this actor changed their behaviour, would it move our goal?" If not, remove them.

**Step 3: Map impacts (25 minutes).** For each actor, ask: "What behaviour change from this actor would help us reach the goal?" Write impacts on sticky notes branching from each actor. Keep impacts in behaviour language: "Buyers complete checkout in a single session" not "one-click checkout button."

**Step 4: List deliverables (20 minutes).** For each impact, brainstorm the smallest set of deliverables that could create that behaviour change. This is where features appear. Resist the urge to be exhaustive: the goal is to see options, not to write every story.

**Step 5: Prioritise (10 minutes).** Mark the highest-priority actor-impact-deliverable paths with a dot vote or explicit discussion. These become the first items in your backlog.

## Common Mistakes

**Starting with the What.** The most common failure. Teams with existing backlogs map their features onto the tree and call it an Impact Map. This defeats the purpose. Start with Why every time.

**Confusing impacts with features.** "Add a search filter" is not an impact. "Buyers find relevant listings on their first search" is. If your How column looks like a feature list, rewrite it in behaviour language.

**Setting unmeasurable goals.** "Improve user satisfaction" cannot be evaluated. "Increase NPS from 32 to 45 by end of quarter" can. Unmeasurable goals make the map useless for prioritisation.

**Inviting only one function.** Impact Mapping needs business, product, and engineering in the room together. A map produced by product alone will be disconnected from technical reality; a map produced by engineering alone will miss business context.

## Connecting to Other Practices

| After Impact Mapping | Use it for |
|---|---|
| User Story Mapping | Turn the What column into stories arranged along the user journey |
| Sprint Planning | Use impact-prioritised deliverables to fill sprint backlogs |
| OKRs | The Why level maps directly onto Key Results; the Who/How levels map onto Initiatives |
| Lean Canvas | The Why level aligns with the Problem and UVP boxes; the How level with Channels |

## Further Reading

- [User Story Mapping](/guides/user-story-mapping/): the natural next step after Impact Mapping
- [Lean Canvas](/guides/lean-canvas/): for articulating the Why at a business model level
- [Build-Measure-Learn](/guides/build-measure-learn/): for validating whether your impacts are actually happening
- [Open Practice Library overview](/guides/open-practice-library/): the full collection of practices
- [Backlog Prioritisation for AI](/guides/backlog-prioritization-ai/): applying these techniques in AI product contexts
- [AI Product Management](/guides/ai-product-management/): broader product management for AI teams
