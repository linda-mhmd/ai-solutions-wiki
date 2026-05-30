---
title: "Event Storming for AI Use Case Discovery"
description: "How to run an Event Storming workshop specifically for discovering AI automation opportunities: domain events, commands, policies, and identifying where AI adds the most value."
date: 2026-03-25
categories: [Frameworks]
tags: ["project-management", "intermediate", "event-storming", "domain-modeling", "ai-integration", "discovery", "workshop"]
related:
  - glossary/open-practice-library
  - frameworks/impact-mapping-ai
  - frameworks/three-workshop-method
  - guides/open-practice-library
  - guides/ai-workshop-facilitation
last_updated: 2026-05-30
---

Event Storming is a collaborative modelling technique invented by Alberto Brandolini. It uses coloured sticky notes on a long paper roll to map a business domain in a single room with a cross-functional group. For AI projects, Event Storming is a powerful discovery tool because it makes visible exactly where human judgment is currently applied in a process - and judgment is what AI can potentially automate.

## Workshop Setup

**Duration:** 3-4 hours for a focused domain. Full-day sessions for complex end-to-end processes.

**Participants:** 6-12 people. Include business domain experts (they know the process), operations staff (they execute the process), and technical team members (they will build the solution). AI expertise is not required from participants - you are discovering requirements, not designing solutions.

**Materials:** A long roll of paper or whiteboard spanning at least 5 metres. Sticky notes in 6 colours: orange (events), blue (commands), yellow (actors), pink (external systems), purple (policies), red (hotspots/problems).

**Room setup:** All chairs removed from the modelling area. Participants stand at the paper. This is deliberate - standing keeps energy high and prevents one person from dominating.

## The Four Phases

### Phase 1: Domain Event Exploration (60 minutes)

A domain event is something that happened in the business domain, expressed in past tense: "Invoice Received," "Document Classified," "Customer Complaint Filed," "Payment Processed."

Ask participants: "What happens in this domain?" Hand out orange sticky notes and ask everyone to write events independently, then place them on the paper in rough chronological order from left to right. Do not interrupt or discuss at this stage - generate events first.

After the first burst, the facilitator walks the timeline aloud and participants add clarifications, correct sequencing, and surface gaps. Aim for 50-150 events for a moderately complex process.

**AI lens during this phase:** Mentally flag events that are produced by human decision-making rather than by automated systems. These are the events where AI might contribute.

### Phase 2: Add Commands and Actors (30 minutes)

A command is the action that triggers an event: "Classify Document" triggers "Document Classified." Commands are expressed as imperatives.

Add blue command notes to the left of each event. Add yellow actor notes above commands when the actor is a person (rather than a system). Yellow actors are your AI automation candidates.

### Phase 3: Identify Policies (30 minutes)

A policy is a business rule that links an event to a command: "Whenever [event], [command]." Policies are expressed in purple.

Example: "Whenever a Complaint Filed event occurs, Create Support Ticket command is triggered." If a human is currently executing that policy (reading the complaint, deciding the category, creating the ticket), that is a potential AI automation: the human's classification judgment can be replaced with a model.

Map every policy that currently requires a human actor. Each one is an AI opportunity worth evaluating.

### Phase 4: AI Opportunity Scoring (30 minutes)

With the full event map visible, walk through each human-actor policy and evaluate it against four dimensions:

**Data availability (1-3):** Do we have historical examples of a human executing this policy correctly? Score 3 if we have thousands of labelled examples, 1 if we have none.

**Output clarity (1-3):** Is the correct output unambiguous and verifiable? Score 3 if there is a clear right answer, 1 if the policy requires significant contextual judgment.

**Error cost (1-3, inverted):** How costly is an error? Score 3 if errors are low-stakes and easily corrected, 1 if errors are high-stakes or hard to reverse. High error cost reduces AI suitability.

**Volume (1-3):** How frequently does this policy execute? Score 3 if it runs hundreds of times daily, 1 if it is rare.

Total score 8-12: Strong AI automation candidate. Prioritise.
Total score 5-7: Feasible with validation. Run a spike before committing.
Total score below 5: Not ready for AI automation. Flag as a future opportunity.

## Producing the Output

After the workshop, photograph the full model and transcribe it digitally. Produce a one-page summary of the top AI opportunities with their scores, the data requirements for each, and a proposed spike to validate feasibility.

This output feeds directly into Impact Mapping (to confirm business value) and then backlog refinement (to break opportunities into buildable stories).

## Common Facilitation Mistakes

**Letting domain experts dominate** - Everyone should write events, not just the experts. Quieter participants often surface the most valuable edge cases.

**Jumping to solutions** - When someone says "we could use AI for that," acknowledge it and move on. Solutions come after the map is complete, not during.

**Skipping the policy phase** - The policies are where the AI opportunities live. Do not end the session at commands and events.

**Running too long** - Cognitive fatigue sets in after 4 hours. Break earlier and schedule a follow-up session rather than pushing through to a lower-quality output.

## Sources and Further Reading

- Brandolini, A. (2021). *Introducing EventStorming: An act of deliberate collective sensemaking.* Leanpub. Available at [https://www.eventstorming.com/book/](https://www.eventstorming.com/book/)
- Alberto Brandolini's Event Storming website: [https://www.eventstorming.com/](https://www.eventstorming.com/)
- Open Practice Library - Event Storming practice: [https://openpracticelibrary.com/practice/event-storming/](https://openpracticelibrary.com/practice/event-storming/)
- Related framework: [Impact Mapping for AI Projects](../impact-mapping-ai/) - follows Event Storming to confirm business value of identified opportunities.
- Mohamed, L. *Three Workshop Method.* Incorporates Event Storming as a discovery phase technique in structured enterprise AI adoption.
