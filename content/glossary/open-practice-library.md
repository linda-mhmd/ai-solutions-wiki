---
title: "Open Practice Library"
description: "What the Open Practice Library is, its key practices for AI projects, and how it structures discovery and delivery for teams building AI-powered products."
date: 2026-03-25
categories: [Glossary]
tags: ["project-management", "beginner", "open-practice-library", "agile", "discovery", "facilitation", "methodology"]
related:
  - guides/open-practice-library
  - frameworks/event-storming-ai
  - frameworks/impact-mapping-ai
  - frameworks/three-workshop-method
  - guides/ai-workshop-facilitation
---

The Open Practice Library (openpracticelibrary.com) is a community-maintained collection of practices for product discovery and software delivery. It was created within Red Hat's consulting practice and open-sourced in 2017. It covers the full delivery lifecycle, from understanding a business problem through to running a product in production.

The library organises practices into two loops:

**The Discovery Loop** covers practices for understanding the problem space before writing code: defining outcomes, understanding users, mapping the business domain, and prioritising what to build.

**The Delivery Loop** covers practices for building and shipping: agile ceremonies, testing approaches, deployment practices, and feedback mechanisms.

A third concept, the **Foundation**, covers the conditions that enable both loops: psychological safety, shared goals, and team agreements.

## Key Practices for AI Projects

**Event Storming** - A collaborative workshop for mapping a business domain using coloured sticky notes. For AI projects, it is used to identify where in a process human judgment currently operates and where AI automation could replace or augment it. See the [Event Storming for AI Use Case Discovery](../event-storming-ai/) framework for a detailed facilitation guide.

**Impact Mapping** - A strategic planning technique that links AI capabilities to measurable business outcomes using a Why-Who-How-What mind map. Prevents technology-first thinking by requiring teams to define the business goal before defining what to build. See the [Impact Mapping for AI Projects](../impact-mapping-ai/) framework.

**User Story Mapping** - Arranges user stories along the user journey and by priority. For AI projects, adds a confidence dimension: how confident is the team that AI can reliably execute this story?

**Mob Programming** - The whole team works at one machine simultaneously. Particularly effective for prompt engineering sessions, evaluation criteria definition, and reviewing model output quality as a group.

**Definition of Ready / Definition of Done** - Standard agile ceremonies extended with AI-specific criteria. A story is Ready only if the evaluation criteria are defined. A story is Done only if the evaluation gate passes.

**Retrospectives** - Post-sprint team reflection. For AI teams, grounded in quality metrics data (evaluation scores, production quality trends) rather than only process observations.

## Why It Suits AI Delivery

AI projects face two specific risks that standard software delivery practices do not address well:

1. **Building the wrong thing** - AI capabilities are often underspecified. Teams build impressive demos that solve the wrong problem. Impact Mapping and Event Storming address this by forcing clarity on business outcomes before technical choices.

2. **Uncertainty about feasibility** - It is not always clear upfront whether an AI approach will work well enough. The library's practice of time-boxed spikes (short investigations to validate a hypothesis before committing to full implementation) handles this well.

The library's emphasis on working in the open, sharing information early, and making decisions visible as a team also suits AI projects, where prompt design, evaluation criteria, and model choices benefit from collective understanding rather than individual expertise.

## Further Reading

The full library is available at openpracticelibrary.com and is continuously updated by the community. Each practice page includes a description, when to use it, how to run it, and links to related practices.

## Linda Mohamed's Experience with the Open Practice Library

Linda Mohamed, AI and Cloud Consultant and AWS Community Hero, has facilitated Open Practice Library workshops at major industry events including the ESA LPS (Living Planet Symposium) Conference. These sessions applied Event Storming and Impact Mapping specifically to AI use case discovery for organizations in the earth observation and geospatial domains.

The workshop format described in this wiki's [Three Workshop Method](../three-workshop-method/) framework draws directly from OPL practices, adapted for AI project delivery in enterprise settings.

## Sources and Further Reading

- Open Practice Library: [https://openpracticelibrary.com/](https://openpracticelibrary.com/)
- Red Hat Open Practice Library GitHub repository: [https://github.com/openpracticelibrary/openpracticelibrary](https://github.com/openpracticelibrary/openpracticelibrary)
- Event Storming practice page: [https://openpracticelibrary.com/practice/event-storming/](https://openpracticelibrary.com/practice/event-storming/)
- Impact Mapping practice page: [https://openpracticelibrary.com/practice/impact-mapping/](https://openpracticelibrary.com/practice/impact-mapping/)
- Linda Mohamed's workshop methodology: [https://ai-workshops.online](https://ai-workshops.online)
