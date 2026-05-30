---
title: "MoSCoW Prioritization for AI - Must, Should, Could, Won't"
description: "Applying MoSCoW prioritization to AI project scope: managing stakeholder expectations, defining MVP boundaries, and making explicit trade-offs."
date: 2026-03-28
categories: [Frameworks]
tags: [MoSCoW, prioritization, scope-management, requirements, MVP]
related:
  - frameworks/rice-scoring
  - frameworks/use-case-scoring
  - frameworks/agile-ai-delivery
last_updated: 2026-05-30
---

MoSCoW is a prioritization technique that categorizes requirements into four groups: Must have, Should have, Could have, and Won't have (this time). For AI projects, MoSCoW is particularly useful for managing scope in environments where stakeholders have expansive visions of what AI can do but delivery capacity and timelines are constrained. The explicit "Won't have" category forces conversations about trade-offs that are often avoided.

## The Four Categories

**Must Have** - Requirements without which the AI solution has no value. If the system does not deliver these, the project has failed. For a document classification AI: must correctly classify the top 5 document types (which represent 80% of volume), must integrate with the existing document management system, must meet the 90% accuracy threshold defined in the business case.

**Should Have** - Important requirements that are not critical for initial launch. Omitting these degrades the solution but does not make it worthless. For the document classifier: should classify all 15 document types, should provide confidence scores with each classification, should support batch processing in addition to real-time.

**Could Have** - Desirable features included if time and budget permit. These are genuine nice-to-haves that enhance but do not define the solution. For the classifier: could provide an explanation of why each classification was chosen, could support document summarization alongside classification, could offer a self-service retraining interface.

**Won't Have (This Time)** - Features explicitly excluded from the current scope. Documenting these is critical because it sets expectations and prevents scope creep. For the classifier: won't handle handwritten documents, won't support languages other than English, won't replace the manual review process for regulated document types.

## Why MoSCoW Works for AI Projects

**Managing AI hype expectations** - Stakeholders often expect AI to do everything immediately. MoSCoW forces a conversation about what is achievable in the current iteration. The "Must Have" category anchors the project to its core value proposition.

**Handling uncertainty** - AI projects have uncertain outcomes. By keeping the "Must Have" list small and focused, the team maximizes the probability of delivering core value even if model performance is lower than hoped.

**Defining the AI MVP** - The "Must Have" list is the MVP. If the team can only deliver Must Haves, the project still succeeds. This framing helps resist the temptation to gold-plate the first release with advanced features.

## Running a MoSCoW Session for AI

Conduct MoSCoW prioritization with both business stakeholders and the technical team present. Business stakeholders bring the value perspective (what matters to users and the business). The technical team brings the feasibility perspective (what is achievable with available data, models, and infrastructure).

**Step 1** - List all requirements and features on cards or a shared document. Include both functional requirements (what the AI does) and non-functional requirements (accuracy thresholds, latency, security, scalability).

**Step 2** - For each requirement, discuss and assign a category. The facilitator should challenge every "Must Have": "If we launched without this, would the project fail?" Many requirements initially labeled Must Have are actually Should Have when pressed.

**Step 3** - Validate the Must Have list against capacity. A common rule: Must Haves should consume no more than 60% of estimated capacity. The remaining 40% provides buffer for uncertainty and accommodates some Should Haves.

**Step 4** - Document the Won't Haves explicitly, including the rationale. "Won't support handwritten documents because training data is unavailable and the volume is too low to justify the investment."

## AI-Specific Prioritization Criteria

When debating categories, consider:

**Data availability** - A requirement that depends on data that does not exist or is inaccessible cannot be Must Have for the current release regardless of business value.

**Model capability** - A requirement that exceeds current model capabilities (recognizing sarcasm with 99% accuracy, for example) should be Could Have or Won't Have until feasibility is demonstrated.

**Integration complexity** - A requirement that requires deep integration with legacy systems adds timeline risk. Consider whether a simpler integration satisfies the core need.

**Regulatory gates** - A requirement that triggers additional regulatory review (processing PII, making automated decisions in regulated domains) may need to move to a later release to avoid delaying the entire project.

## Revisiting MoSCoW

MoSCoW categories are not permanent. After the Must Haves are delivered and the AI is in production, the next iteration re-prioritizes: some Should Haves become Must Haves for release 2, some Could Haves get promoted based on user feedback, and new Won't Haves are added as scope is refined.

## When to Use MoSCoW

Use MoSCoW at the start of an AI project to define scope, at each release boundary to reprioritize, and whenever scope creep threatens delivery. It is less useful for research-oriented projects where the scope is exploration rather than defined deliverables.
