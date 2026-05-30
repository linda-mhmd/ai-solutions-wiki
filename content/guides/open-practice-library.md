---
title: "Open Practice Library for AI Projects - Discovery to Delivery"
description: "Applying Open Practice Library practices to AI: Event Storming for AI use case discovery, Impact Mapping for AI value, User Story Mapping for AI features, and Mob Programming for AI development."
date: 2026-03-25
categories: [Guides]
tags: ["project-management", "intermediate", "open-practice-library", "agile", "discovery", "delivery", "facilitation"]
related:
  - glossary/open-practice-library
  - frameworks/event-storming-ai
  - frameworks/impact-mapping-ai
  - frameworks/three-workshop-method
  - guides/ai-workshop-facilitation
last_updated: 2026-05-30
---

The Open Practice Library (openpracticelibrary.com) is a community-maintained collection of practices for product and software delivery. Originally developed within Red Hat's consulting practice, it covers the full delivery lifecycle from discovery through delivery. Many of its practices translate directly to AI projects - and some work even better for AI than for conventional software because AI introduces more uncertainty about what to build and what it will be capable of.

## The Discovery Loop for AI

The Open Practice Library structures work into a Discovery Loop (understanding the problem and users) and a Delivery Loop (building and shipping solutions). For AI projects, the Discovery Loop is particularly critical because the feasibility of an AI solution is not always obvious upfront, and building the wrong thing is expensive.

### Event Storming for AI Use Case Discovery

Event Storming is a collaborative workshop technique for exploring complex business domains. Participants use coloured sticky notes to map domain events, commands, and the policies that link them. For AI projects, Event Storming is useful for identifying where in a business process an AI could automate a decision, classify an input, generate a draft, or extract information.

Run the workshop in three phases:

**Big Picture Event Storming** - Map the entire business process end-to-end with domain events (orange notes). Ask: "What happens in this domain?" Look for manual handoffs, classification decisions, and information extraction steps - these are AI candidates.

**Process Modelling** - Add commands (blue) and policies (purple). A policy is "when [event] happens, [command] is triggered." Policies that currently require human judgement are the strongest AI candidates.

**AI Opportunity Annotation** - Revisit each policy and ask: "Could an AI model execute this policy reliably?" Mark candidates with a distinct colour. For each candidate, identify the input (what information does the human currently use?) and the output (what decision or action results?).

### Impact Mapping for AI Value

Impact Mapping answers: Why are we building this? Who will it change? How will they change? What do we build?

For AI projects, Impact Mapping forces clarity on a question that is often skipped: what business outcome is the AI actually supposed to produce?

A completed Impact Map for an AI use case:

- **Why:** Reduce customer support ticket resolution time by 40%
- **Who:** Support agents (AI helps them); customers (AI may respond directly)
- **How (agents):** Agents surface relevant knowledge base articles faster; agents get draft responses they can edit rather than composing from scratch
- **What:** AI-powered knowledge base search; AI draft response generation with tone matching
- **How (customers):** Customers with common questions get immediate resolution without waiting for an agent
- **What:** AI-powered first-response chatbot with escalation to human agent

Impact Mapping prevents building AI for its own sake. If you cannot complete the Why and Who columns with specific, measurable outcomes, the use case is not ready to build.

### User Story Mapping for AI Features

User Story Mapping arranges user stories along two dimensions: the user journey (horizontal axis) and priority (vertical axis). For AI features, it adds a third dimension: confidence in AI capability.

Map the user journey across the top. For each step, add story cards representing the AI-assisted version of that step. Annotate each card with:
- The current human activity it replaces or augments
- The AI approach (classification, generation, retrieval, extraction)
- Confidence level: High (straightforward task with good training data), Medium (feasible but needs validation), Low (research spike required)

Use the confidence annotations to sequence work. Build high-confidence features first to demonstrate value. Treat low-confidence features as spikes with a defined timebox before committing to full implementation.

### Backlog Refinement with AI Spikes

Standard agile refinement adds an AI-specific item: the feasibility spike. Before estimating an AI user story, timebox a spike to validate that the approach works.

A spike definition:
- **Hypothesis:** A fine-tuned classifier can categorise incoming support tickets into 12 categories with >85% accuracy.
- **Timebox:** 3 days
- **Inputs:** 500 labelled historical tickets
- **Done when:** Classifier accuracy measured on held-out test set, go/no-go recommendation documented.

Spike results feed directly into refinement. If the hypothesis is validated, estimate the implementation story. If not, revise the approach or escalate the risk.

## The Delivery Loop for AI

### Mob Programming for AI Development

Mob Programming (a whole-team-at-one-keyboard practice) works particularly well for AI development because the team needs to share understanding of prompt design, evaluation criteria, and model behaviour - knowledge that is hard to transfer through code review alone.

Apply mob programming to:
- Initial prompt engineering for a new use case
- Defining evaluation criteria and test cases
- Debugging quality regressions
- Reviewing model outputs as a team to calibrate quality expectations

Rotate the "driver" (the person at the keyboard) every 15-25 minutes. Everyone else navigates: suggesting tests, questioning outputs, proposing alternative phrasings. A shared quality bar emerges naturally from the session.

### Definition of Done for AI Stories

Extend the standard Definition of Done with AI-specific criteria:

- Unit tests pass
- Integration tests pass with mocked model
- Evaluation gate passes (quality metrics at or above baseline)
- Prompt version documented in the configuration
- Fallback behaviour tested
- Monitoring/alerting configured for the new feature
- Cost estimate per request documented

The evaluation gate criterion prevents "done" from meaning "the code runs" rather than "the AI output is good enough."

### Retrospectives with Quality Data

Retrospectives in AI teams should include quality metrics alongside team process reflections. Before the retro, pull:

- Evaluation scores for the sprint's deliverables
- Production quality metrics (if in production)
- Number of evaluation gate failures and why they failed
- Token costs for the sprint's features

This grounds the retro in observable data rather than subjective impressions. It also surfaces patterns: if evaluation gates are failing frequently, the team may need to invest in better test case coverage or faster evaluation tooling.
