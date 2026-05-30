---
title: "Juggling and Change"
description: "Drop recovery as incident response. Adding load as organisational change. The instinct to chase the dropped ball is the failure mode of most production incidents and most transformation programmes."
date: 2026-05-30
categories: [Through]
tags: ["beginner", "metaphor", "change-management", "incident-response", "adaptability", "teams"]
---

<figure class="bz-figure">
  <img src="/img/juggling/hand-dropping-club-trail-notext.png" alt="A hand mid-motion with a glowing club falling away, a cyan light trail still tracing the rest of the juggling pattern." loading="lazy">
  <figcaption>The trail is still in the air. The pattern is not over. The instinct is to chase the drop. The skill is not to.</figcaption>
</figure>

Change management has a metaphor problem. Most frameworks reach for icebergs, stages of grief, or freeze-unfreeze diagrams. Useful. Abstract. Hard to feel.

A juggler reaches for the bag. You can put a ball in someone's hand and they will know within ninety seconds what it feels like to add load to a system that was working fine a moment ago. The physical experience transfers in ways that diagrams do not.

---

## The instinct that cascades incidents

There is a moment, in any sustained juggling pattern, when a ball drops. New jugglers respond the way most humans respond to a falling object: they reach for it. Eyes track the ball. Attention collapses to the dropping point.

What this guarantees is that the next two balls also drop.

Experienced jugglers do something else. The dropped ball is, for the moment, lost. The pattern in the air is not. The first action is not to chase the drop. It is to keep the remaining balls moving, find a stable ending point for them, and only then retrieve the one on the floor.

**This is the operating principle of effective incident response:**

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Drop detected</span>
    <span class="bz-flow-step-name">Alert fires</span>
    <span class="bz-flow-step-desc">The visible failure. The ball everyone sees hit the floor.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Wrong instinct</span>
    <span class="bz-flow-step-name">Chase the symptom</span>
    <span class="bz-flow-step-desc">Attention collapses to the dropped ball. The remaining services are still in flight.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Cascade</span>
    <span class="bz-flow-step-name">Two more drop</span>
    <span class="bz-flow-step-desc">The healthy services fail while debugging the original drop. Incident spreads.</span>
  </div>
</div>

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Drop detected</span>
    <span class="bz-flow-step-name">Alert fires</span>
    <span class="bz-flow-step-desc">The visible failure. One service failing.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Stabilise first</span>
    <span class="bz-flow-step-name">Controlled degradation</span>
    <span class="bz-flow-step-desc">Reduce scope to a stable subset. Disable non-critical features. Route to healthy nodes.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Recover</span>
    <span class="bz-flow-step-name">Root cause after</span>
    <span class="bz-flow-step-desc">With the pattern stable, now you can safely pick up the dropped ball.</span>
  </div>
</div>

Teams that practise stabilise-first incident response report fewer cascading failures and shorter total incident durations. The reason is identical to the juggling case: the time saved by not chasing the symptom is paid back many times over by the failures prevented elsewhere.

**Go deeper:** [Reliability Pillar](/glossary/reliability-pillar/) and [Prometheus](/glossary/prometheus/)

---

<div class="bz-cinematic" style="background-image: url('/img/juggling/infinity-loop-breaking-notext.png')">
  <div class="bz-cinematic-body">
    <span class="bz-cinematic-label">The loop breaks at one point</span>
    <h2 class="bz-cinematic-h2">One failure in the pattern is recoverable. Chasing it is what makes it unrecoverable.</h2>
    <p class="bz-cinematic-p">Designed-for failures look different from undesigned ones. The system that expects a drop builds a recovery path before the drop happens.</p>
  </div>
</div>

---

## Adding load while the pattern runs

The limiting factor in change is rarely the new thing being introduced. It is whether the existing pattern stays smooth while the new thing is being added.

Juggling makes this physical. You are running a two-ball pattern. You add a third. The two-ball pattern must stay smooth for the third to land. If you speed up to accommodate the new ball, the original pattern breaks before the third joins. If you slow the throws down, the pattern breathes and the third integrates.

**The change management equivalents:**

| Juggling | Organisational change |
|---|---|
| Adding the third ball without losing the two-ball pattern | Rolling out a new tool without breaking the current workflow |
| Eyes up at the apex, never on the catch | Lead with the destination, not the intermediate steps |
| Drop a ball; finish the pattern with what is still in the air | When a workstream slips, protect the other workstreams first |
| Slow the throws, do not lower them | When overwhelmed, stretch the cadence before cutting scope |
| Three different-coloured balls following the same pattern at different rates | Diverse teams move through the same change at different speeds |

The physical experience of adding a third ball while keeping two in the air teaches the single most important change management principle: the new thing does not get its own separate attention. It enters the existing rhythm or it does not enter cleanly.

---

## The outer orbit: rings at scale

Not every team has the same relationship to a change. The department closest to the originating team feels the change daily. The department five steps removed has a wider orbit.

In juggling, this is the difference between balls (close, frequent, forgiving), clubs (technical, demanding, loud when dropped), and rings (wide arc, infrequent return, different scale entirely).

A ring in flight takes longer to complete its orbit than a ball. That does not mean it is unengaged. It means its arc is wider. The outer-orbit legal team that raises a compliance question in month eight of a twelve-month programme is not resistant or late. Its ring was always in a wider orbit. Month eight is when its arc brings it closest to the centre.

A change programme that measures engagement by centre-orbit metrics will consistently misread the outer orbit. The outer-orbit department does not engage at the same frequency or in the same format. It engages more slowly, in longer cycles, with concerns that are larger in scope.

The practical implication: create the space for the outer-orbit conversation before month eight. Do not be surprised by it. Anticipate the arc.

**Go deeper:** [Concept Drift](/glossary/concept-drift/) and [LLMOps](/glossary/llmops/)

---

<div class="bz-cinematic" style="background-image: url('/img/juggling/silhouettes-chaos-light-trails-notext.png')">
  <div class="bz-cinematic-body">
    <span class="bz-cinematic-label">Many patterns, one space</span>
    <h2 class="bz-cinematic-h2">Each person in a team has a different arc. The skill is holding all of them without collision.</h2>
    <p class="bz-cinematic-p">Chaos and complexity are not the same thing. Chaos has no structure. Complexity has structure you have not mapped yet. The pattern becomes readable when you find the arcs.</p>
  </div>
</div>

---

## What you take from a workshop

The Juggling Company runs change management sessions using this framework. Three blocks:

1. **Add load:** everyone learns one ball, then two, then three. Failures are public and harmless. The room reframes "drop" from failure to data.
2. **Pattern recognition:** swap props. Different weights. Sometimes AI-based object detection overlays trajectory predictions on a wall, making the brain's hidden tracking visible.
3. **Translate:** small groups map their juggling experience onto a real change they are leading. The mapping is rarely the obvious one.

Nobody has to be vulnerable about the change they are scared of. They have to be vulnerable about dropping a ball. The transfer happens after, in the debrief. Quieter. It sticks.

**[Book a workshop at The Juggling Company](https://thejugglingcompany.com)**

---

## Further reading

- [Juggling and Technology](/through/juggling-and-tech/): the cascade as a distributed system and props as AI agent types
- [Juggling and the Brain](/through/juggling-and-brain/): how pattern recognition and attention work
- [Juggling and Change](https://thejugglingcompany.com/learn/change): the full change management deep-dive at The Juggling Company
- [Reliability Pillar](/glossary/reliability-pillar/): fault tolerance and recovery at the system level
- [Concept Drift](/glossary/concept-drift/): when the pattern you trained on no longer matches the world
- [Capacity Planning for AI](/guides/capacity-planning-ai/): knowing when a system has exceeded its pattern budget
- [The Craft of Software](/through/craft/): the same ideas through analogue craftsmanship
