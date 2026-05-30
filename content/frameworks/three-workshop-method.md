---
title: "From AI Idea to Working Prototype in 3 Workshops"
description: "A structured three-workshop methodology that takes an organization from AI curiosity to a validated, buildable prototype with stakeholder alignment."
date: 2026-03-24
categories: [Frameworks]
tags: ["project-management", "intermediate", "workshop-method", "discovery", "facilitation", "ai-adoption", "agile"]
last_updated: 2026-05-30
---

The 3-Workshop Method was developed by Linda Mohamed, AWS Community Hero and AI and Cloud Consultant, as a structured approach to taking enterprises from AI idea to working prototype.

Most AI projects fail not because the technology does not work, but because organizations skip the hard early conversations and jump straight to implementation. The Three Workshop Method structures those conversations into a repeatable process that ends with a working prototype and a team that understands what they built and why.

## The Core Principle

The gap between workshops is where reality validates assumptions. What a business sponsor believes on Monday morning looks different after a data analyst has spent three days trying to actually query the dataset. What a developer thinks is technically straightforward often turns out to require data that does not exist. The workshop structure creates deliberate checkpoints where those realities surface before they become expensive surprises.

## Workshop 1: Goal Workshop

**Duration:** Half day
**Participants:** Business sponsor, operations lead, 1-2 end users of the process being automated
**Facilitators:** 1 AI consultant, 1 note-taker

The Goal Workshop has one objective: define the problem precisely enough that you know what success looks like. This sounds obvious and routinely is not.

The session opens with a structured problem statement exercise. Participants describe the current process in detail - every manual step, every handoff, every exception. This is usually where the first surprises emerge: steps that are assumed to be simple turn out to have 12 edge cases, or a process that looks like a 5-minute task takes 45 minutes because of a legacy system login requirement.

The second half of the workshop surfaces use case ideas. After seeing the full problem landscape, ideas come naturally. These are logged and roughly scored (see the Use Case Scoring Framework) to identify the 2-3 candidates worth taking into Workshop 2.

**Output:** A signed-off problem statement, a use case shortlist, and defined success criteria.

## Workshop 2: Concept Workshop

**Duration:** Full day
**Participants:** Business sponsor, technical lead, data engineer, AI architect
**Facilitators:** 1 AI consultant

This is a technical deep-dive. The goal is to validate feasibility and design an architecture.

The morning focuses on data: Where does it live? What does it look like? Can it actually be accessed within the project's security constraints? This session is where high data-sensitivity use cases often get deprioritized - not because they are bad ideas, but because the compliance path would extend the timeline beyond acceptable limits.

The afternoon covers architecture. Which AWS services are appropriate? What does the integration with existing systems look like? What is the human review layer? For most enterprise use cases, the answer is not "pure AI automation" but rather "AI plus human review for exceptions" - and defining that boundary is the most important architectural decision made in Workshop 2.

**Output:** Technical architecture diagram, data access confirmation, identified risks, revised scope if needed.

## Workshop 3: Decision Workshop

**Duration:** Half day
**Participants:** Executive sponsor, all previous participants
**Facilitators:** 1 AI consultant

Workshop 3 opens with a working prototype demonstration. Not a slide deck. Not wireframes. A live system, even if limited in scope, that processes real (or real-format) data and produces real output.

The prototype exists to change the conversation. Stakeholders who were nodding politely at architecture diagrams become concrete and specific when they see the actual output: "This field should be formatted differently," "We need to flag when confidence is below 80%," "Can it handle the cases where the document is a scanned PDF?"

Those reactions are the most valuable output of the workshop. They feed directly into the prototype roadmap.

The session ends with a go/no-go decision and, if go, a prioritized roadmap with resource commitments.

**Output:** Validated prototype, approved roadmap, resource allocation, defined next milestone.

## What This Method Is Not

It is not a replacement for agile development once the prototype is approved. It is the structured front end that produces the clarity and alignment that makes agile development move fast instead of going in circles.

## Sources and Further Reading

- Mohamed, L. *Three Workshop Method.* Original methodology for structured enterprise AI adoption, developed through consulting practice.
- Related framework: [Use Case Scoring](../use-case-scoring/) - the prioritization tool used in Workshop 1 to select which use cases proceed to Workshop 2.
- Related framework: [Event Storming for AI Use Case Discovery](../event-storming-ai/) - a technique that feeds naturally into the Goal Workshop.
- Related framework: [Impact Mapping for AI Projects](../impact-mapping-ai/) - the strategic framing technique used alongside the Goal Workshop.
- Open Practice Library (practices referenced in all three workshops): [https://openpracticelibrary.com/](https://openpracticelibrary.com/)
