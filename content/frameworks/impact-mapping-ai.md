---
title: "Impact Mapping for AI Projects"
description: "Applying the Why-Who-How-What Impact Mapping framework to AI projects: grounding AI initiatives in measurable business outcomes and avoiding technology-first thinking."
date: 2026-03-25
categories: [Frameworks]
tags: ["project-management", "intermediate", "impact-mapping", "ai-strategy", "planning", "outcomes", "stakeholders"]
related:
  - glossary/open-practice-library
  - frameworks/event-storming-ai
  - frameworks/use-case-scoring
  - guides/open-practice-library
  - guides/choosing-your-first-ai-use-case
last_updated: 2026-05-30
---

Impact Mapping was created by Gojko Adzic as a strategic planning technique to ensure that software delivery is linked to business outcomes. It structures the reasoning behind a product decision as a mind map with four levels: Why (business goal), Who (actors who can influence the goal), How (impacts on actors), and What (deliverables). For AI projects, Impact Mapping is a powerful antidote to technology-first thinking - the tendency to start with "we should use AI" rather than "we have a business problem."

## The Four Levels Applied to AI

### Why: The Business Goal

The goal is a measurable business outcome, not a technical objective. "Deploy an AI chatbot" is not a goal. "Reduce first-response time for customer support queries from 4 hours to under 30 minutes" is a goal.

A good AI goal is:
- Measurable (you can verify whether it was achieved)
- Time-bound (by when?)
- Business-facing (it matters to stakeholders outside the technical team)
- Realistic but ambitious

Avoid goals defined as capabilities ("implement RAG") or activities ("train a model"). These are deliverables, not outcomes.

### Who: The Actors

Actors are people or systems whose behaviour needs to change to achieve the goal. For AI projects, there are typically two categories:

**Users of the AI** - The people whose productivity or experience will improve. Support agents who will use AI-drafted responses. Analysts who will use AI-generated summaries. These actors need to trust and adopt the AI for the goal to be achieved.

**Those affected by the AI** - People whose experience changes as a result: customers who receive AI-generated responses, employees whose workflows change because AI handles previously manual tasks.

List all actors for each goal. Goals with no clear actors are not goals - they are technology experiments.

### How: The Impacts

For each actor, define the specific behavioural change that connects them to the business goal. This is the impact: how does this actor need to act differently?

For a support agent using AI:
- Use the AI-generated draft as a starting point rather than composing from scratch
- Use the AI knowledge base search instead of searching the internal wiki manually
- Escalate fewer tickets because the AI surfaces relevant policy context proactively

For a customer:
- Receive an immediate response to common questions instead of waiting for an agent
- Self-serve resolution for standard queries

Each impact should be observable and tied to the business goal. If you cannot explain how an actor's changed behaviour produces the goal, the impact is wrong.

### What: The AI Deliverables

Only after defining Why, Who, and How do you define What to build. The deliverables are the specific AI features and integrations that enable each impact.

For "agents use AI-drafted responses":
- AI draft response generation with tone matching to the company voice
- One-click accept or edit workflow integrated into the support tool
- Response quality feedback mechanism (did the agent edit significantly? Was the draft useful?)

For "customers self-serve common questions":
- AI-powered FAQ chatbot trained on product documentation and policy documents
- Escalation path when the AI confidence is below threshold
- Handoff summary passed to the human agent if escalation occurs

## Running an Impact Mapping Session

**Duration:** 90-120 minutes for a single AI initiative.

**Participants:** Product owner, business stakeholders, technical lead. 4-6 people maximum.

**Materials:** A whiteboard or digital collaboration tool. Draw the mind map structure before the session.

**Facilitation sequence:**

1. State the Why as a draft and validate it with stakeholders. Expect 20-30 minutes of discussion to sharpen from "improve support" to a measurable goal.
2. Brainstorm all actors. Ask: "Who needs to change their behaviour for this goal to be achieved?" Allow 10 minutes.
3. For each actor, define the impacts. Ask: "What would this actor do differently if the goal were achieved?" Focus on behaviour, not features. Allow 20-30 minutes.
4. For each impact, brainstorm What deliverables could enable it. This is where AI features appear. Allow 20 minutes.
5. Prioritise: which impacts are most significant for the goal? Which deliverables enable the most important impacts at the lowest effort?

## Using Impact Maps to Scope AI Projects

Impact Maps are particularly useful for scoping AI projects because they reveal when you are building more than you need.

If an AI feature does not appear in the What column of any impact that is connected to the Why, it should not be built. This rule eliminates a large proportion of "nice to have" AI features that get added because they are interesting technically but do not contribute to the business goal.

Impact Maps also reveal when the goal is achievable without AI. If the How column can be filled with process changes, training, or simpler automation, AI is not the right tool. The map makes this visible before you invest in building.

## Example: AI-Assisted Document Review

**Why:** Reduce legal document review time by 50%, allowing the legal team to handle 2x current caseload without headcount increase.

**Who:**
- Legal associates (execute the review)
- Partners (review and approve associate work)
- Clients (submit documents for review)

**How (associates):** Associates spend less time on initial document screening. Associates focus review time on flagged clauses rather than reading documents end-to-end.

**What (for associates):** AI pre-screening that flags non-standard clauses, high-risk language, and missing sections. Summary of flagged items per document. Comparison to standard template.

**How (partners):** Partners review a concise summary of associate findings rather than re-reading documents from scratch.

**What (for partners):** AI-generated review summary that includes associate annotations and AI-flagged items side by side.

The Impact Map makes the scope clear: the AI needs to produce flagged clause summaries and document comparisons. It does not need to generate legal opinions, draft responses, or automate approval decisions - those are not in any How column.

## Sources and Further Reading

- Adzic, G. (2012). *Impact Mapping: Making a Big Impact with Software Products and Projects.* Provoking Thoughts. Available at [https://www.impactmapping.org/](https://www.impactmapping.org/)
- Gojko Adzic's Impact Mapping website: [https://www.impactmapping.org/](https://www.impactmapping.org/)
- Open Practice Library - Impact Mapping practice: [https://openpracticelibrary.com/practice/impact-mapping/](https://openpracticelibrary.com/practice/impact-mapping/)
- Related framework: [Event Storming for AI Use Case Discovery](../event-storming-ai/) - typically precedes Impact Mapping to surface domain events before defining business outcomes.
- Related framework: [Use Case Scoring](../use-case-scoring/) - used after Impact Mapping to prioritize the deliverables identified in the What column.
