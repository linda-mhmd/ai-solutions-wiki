---
title: "Event Storming - Collaborative Domain Exploration"
description: "A complete guide to Event Storming, Alberto Brandolini's technique for exploring complex business domains using colour-coded sticky notes to build a shared model that engineers and domain experts can both read."
date: 2026-05-28
categories: [Guides]
tags: [open-practice-library, domain-driven-design, discovery, facilitation, microservices, architecture]
related:
  - guides/impact-mapping
  - guides/user-story-mapping
  - guides/lean-canvas
---

Most technical problems are actually communication problems in disguise. Engineers model the domain one way; business experts understand it another; the system gets built to satisfy a third mental model that belongs to neither. Event Storming, developed by Alberto Brandolini, is a structured workshop format that puts engineers and domain experts in the same room with a roll of paper and a lot of sticky notes, and does not let them leave until they have built one shared model.

The technique works because it externalises tacit knowledge. Instead of someone explaining the business process while everyone nods politely, every participant puts their understanding on the wall. Conflicts surface immediately. Gaps become visible. The model the team builds together is richer than any individual's mental model, and everyone leaves with the same map in their head.

<figure class="bz-figure">
  <img src="/img/wardrobe/waterfall-vs-agile.png" alt="Left side: a sealed curtain with a wax stamp: the sequential, locked approach. Right side: a tailor actively fitting a client: iterative and responsive. Two methodologies, one choice." loading="lazy">
  <figcaption>Two approaches to the same problem. Event Storming is the practice that forces a team to discover which one they are actually running: before they have committed to the wrong one.</figcaption>
</figure>

## The Three Formats

Event Storming comes in three scales. Each is a separate workshop, run at a different stage of a project.

**Big Picture Event Storming** covers the entire business domain. The goal is to understand what happens across the whole system without going deep on any single area. It surfaces the main flows, identifies where the complexity lives, and finds the boundaries between areas of the business. Run this at the start of a new system or when different teams have radically different understandings of the domain.

**Process-Level Event Storming** zooms into a specific process identified in the Big Picture session. It adds commands, actors, and policies to build a detailed model of one area. Run this when you need to design the logic for a bounded context before building it.

**Design-Level Event Storming** zooms further into the software design of one aggregate or service. It produces a model close enough to code that developers can move directly from the session to implementation. Run this immediately before beginning development on a specific component.

## The Colour Coding

The sticky note colours are not decoration, they encode the semantic type of each element in the model.

| Colour | Element | Description |
|---|---|---|
| Orange | Domain Event | Something that happened in the domain. Past tense. "Order placed." "Payment confirmed." "Listing expired." |
| Blue | Command | The action that triggered the event. Imperative. "Place order." "Confirm payment." "Expire listing." |
| Yellow | Aggregate | The domain object that receives commands and emits events. Named as a noun. "Order." "Payment." "Listing." |
| Pink | External System | A system outside your boundary that interacts with the domain. "Payment gateway." "Email provider." "Fraud detection API." |
| Purple | Policy | A business rule that reacts to an event by triggering a command. "Whenever payment confirmed, trigger send confirmation email." |
| Red | Hotspot | A problem, ambiguity, or question. Placed when someone cannot agree or does not know. These become the agenda for follow-up. |

## How to Run a Big Picture Session

**Preparation.** Book a room large enough for 8-12 people to stand comfortably at a long wall. Cover the wall in brown paper or use a long roll of butcher paper: you need at least 4 metres. Provide four colours of sticky notes, markers, and red-triangle hotspot stickers or red notes. Invite: domain experts (people who actually do the work), engineers, a product owner, and a facilitator. Block 4 hours; you can finish a focused domain in 3.

**Step 1: Explore the domain with Domain Events (45 minutes).** Give everyone orange stickies. Ask: "What happens in this domain?" Participants write events in past tense, one per note, and stick them on the paper in rough temporal order. There are no rules yet: let chaos happen. The facilitator encourages: "If you think something is missing, add it. If you see something that looks wrong, add what you believe is correct next to it."

**Step 2: Enforce the timeline (20 minutes).** Walk the wall left to right as a group. Ask: "Does this event happen before or after that one?" Reorder. Remove clear duplicates. Start to see the narrative shape of the domain.

**Step 3: Add hotspots (15 minutes).** Wherever there is disagreement, confusion, or a process no one fully understands, place a red hotspot. Do not resolve them now: just mark them. The density of hotspots reveals where the complexity is concentrated.

**Step 4: Add Commands and Policies (30 minutes).** For each event, ask: "What triggered this?" Add blue command notes. For events that automatically trigger other commands, add purple policy notes between them. The pattern becomes: Command → Event → Policy → Command → Event.

**Step 5: Identify Bounded Contexts (20 minutes).** Step back and look at the full timeline. Ask: "Where do the domain language and the team ownership change?" Draw vertical lines to indicate context boundaries. These are the natural seams in the system: candidates for separate services, teams, or modules.

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Trigger</span>
    <span class="bz-flow-step-name">User action or time-based trigger</span>
    <span class="bz-flow-step-desc">Something initiates the process. a user clicks, a timer fires, an external system sends a signal</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Command (blue)</span>
    <span class="bz-flow-step-name">Imperative instruction</span>
    <span class="bz-flow-step-desc">"Place order". the intent expressed as an action directed at a domain object</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Event (orange)</span>
    <span class="bz-flow-step-name">Something happened</span>
    <span class="bz-flow-step-desc">"Order placed". a fact recorded in the domain. Immutable. The command succeeded.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Policy (purple)</span>
    <span class="bz-flow-step-name">Business rule reacts</span>
    <span class="bz-flow-step-desc">"Whenever order placed, trigger reserve inventory". the rule that decides what happens next</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Command (blue)</span>
    <span class="bz-flow-step-name">Next action triggered</span>
    <span class="bz-flow-step-desc">"Reserve inventory". the chain continues through the domain</span>
  </div>
</div>

## What You Walk Away With

A completed Big Picture Event Storming session produces:

**A shared domain model.** Everyone in the room has read the same events, challenged the same assumptions, and agreed on the terminology. This shared understanding is the primary output: more valuable than any diagram.

**Identified bounded contexts.** The vertical lines on the timeline show where the domain splits into coherent sub-domains. These are the natural candidates for service boundaries in a microservices architecture.

**A hotspot backlog.** The red stickies are a prioritised list of problems to solve: missing business logic, conflicting definitions, processes nobody owns, external dependencies that are unclear. This feeds directly into technical risk assessment.

**A vocabulary.** The language used on the stickies becomes the ubiquitous language for the project. Engineers and domain experts should use the same words for the same concepts: Event Storming makes that language explicit.

## Common Mistakes

**Running it without real domain experts.** Event Storming with only engineers produces an engineer's model of the domain, not the domain itself. You need at least two or three people who actually do the work being modelled.

**Trying to resolve every hotspot in the session.** Hotspots are for flagging, not resolving. Trying to solve every ambiguity in a four-hour session extends the session indefinitely and exhausts everyone. Mark them and follow up.

**Starting with swimlanes or BPMN.** The structural freedom of Event Storming: no formal notation, no forced lanes: is what makes it productive. Imposing structure prematurely stops people from contributing their tacit knowledge.

**Running it once and calling it done.** Event Storming produces a first model. That model will be wrong in places. It should be revisited when the team discovers that reality does not match the map.

## Connecting to Other Practices

| Before Event Storming | After Event Storming |
|---|---|
| Stakeholder mapping, know who to invite | User Story Mapping, map user journeys using the domain vocabulary from the session |
| Business process documentation, brings existing process knowledge to the session | Domain-driven design, bounded contexts identified in the session become the basis for aggregate and service design |
| | Microservices architecture, context boundaries drive service decomposition |
| | Impact Mapping, domain events help identify what behaviours matter for business outcomes |

{{< seealso >}}
- [Impact Mapping](/guides/impact-mapping/): use the domain vocabulary from your Event Storming session to map user behaviours to business goals.
- [User Story Mapping](/guides/user-story-mapping/): arrange user journeys using the language and events from the Event Storming output.
- [Lean Canvas](/guides/lean-canvas/): fill in the Problem and Unique Value Proposition boxes using what the storming session revealed.
- [Build-Measure-Learn](/guides/build-measure-learn/): once you know the domain, use BML to validate which parts to build first.
{{< /seealso >}}

## Further Reading

- [User Story Mapping](/guides/user-story-mapping/): arrange stories using the domain model and language from your Event Storming session
- [Impact Mapping](/guides/impact-mapping/): connect the domain model to business goals
- [AI Architecture Patterns](/guides/ai-architecture-patterns/): how domain-driven thinking shapes AI system architecture
- [Software Architecture for AI](/guides/software-architecture-ai/): broader architectural considerations when building AI systems
- [Open Practice Library overview](/guides/open-practice-library/): the full context for Event Storming alongside related practices
- [Open Practice Library source](https://openpracticelibrary.com/practice/event-storming/): the community-maintained practice definition
