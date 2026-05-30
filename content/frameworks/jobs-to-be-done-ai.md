---
title: "Jobs to Be Done for AI - Discovering AI Opportunities"
description: "Applying the Jobs to Be Done framework to identify high-value AI use cases by understanding what users are truly trying to accomplish."
date: 2026-03-28
categories: [Frameworks]
tags: [JTBD, jobs-to-be-done, user-research, use-case-discovery, product-strategy]
related:
  - frameworks/design-thinking-ai
  - frameworks/use-case-scoring
  - frameworks/capability-mapping
last_updated: 2026-05-30
---

The Jobs to Be Done (JTBD) framework focuses on what a user is trying to accomplish (the "job") rather than what they say they want (the "feature request"). Users do not want a chatbot; they want to find answers without waiting for someone to respond. Users do not want a classification model; they want to process incoming documents without reading each one manually. For AI projects, JTBD cuts through the technology hype and identifies use cases where AI delivers genuine value by doing a job better, faster, or cheaper than current alternatives.

## The Framework

A Job to Be Done has three components:

**Functional job** - The practical task the user needs to accomplish. "Route incoming support tickets to the correct team" or "Identify which invoices have errors before they are sent."

**Emotional job** - How the user wants to feel. "Confident that tickets are routed correctly" or "Not anxious about missing errors." AI solutions that ignore the emotional job often fail at adoption: a model that is 95% accurate but provides no explanation makes users more anxious, not less.

**Social job** - How the user wants to be perceived. "Seen as efficient and thorough" or "Not blamed when errors occur." AI solutions must not threaten the user's professional identity.

## Discovering Jobs Through Interviews

JTBD interviews focus on specific instances: "Tell me about the last time you had to [task]. Walk me through exactly what happened." This reveals the actual workflow, workarounds, frustrations, and decision points. Probe for:

**Triggers** - What event initiates the job? (An email arrives, a report is due, a customer calls.)

**Current process** - What steps does the user take today? Where do they spend the most time? Where do they feel uncertain?

**Desired outcomes** - What does success look like? How do they know the job is done well?

**Constraints** - What limitations do they work within? Time pressure, data access, expertise gaps, tool limitations.

**Compensating behaviors** - What workarounds do they use because current tools are inadequate? Manual spreadsheets, Post-it notes, double-checking by a colleague, or simply accepting errors.

## Mapping Jobs to AI Capabilities

Once jobs are identified, map them to AI capabilities that could perform the job:

**Information retrieval jobs** ("Find the relevant policy for this customer's situation") map to RAG and search systems.

**Classification jobs** ("Determine which category this document belongs to") map to classification models.

**Extraction jobs** ("Pull the key terms from this contract") map to NLP extraction.

**Generation jobs** ("Draft a response to this inquiry") map to LLM generation with context.

**Prediction jobs** ("Estimate how long this repair will take") map to predictive models.

**Detection jobs** ("Identify unusual transactions") map to anomaly detection.

Not every job maps to AI. Some jobs are better served by process improvement, better data access, or simpler tooling. JTBD helps identify which jobs genuinely benefit from AI capabilities and which do not.

## Prioritizing AI Jobs

Rank identified jobs by:

**Frequency** - How often is this job performed? Daily jobs across many users have higher impact than monthly jobs for a few users.

**Current satisfaction** - How well do existing solutions serve this job? Jobs where users are frustrated with current solutions are better candidates than jobs where current tools are adequate.

**Importance** - How consequential is the job? High-stakes jobs (medical diagnosis, financial decisions) require high accuracy. Low-stakes jobs (content tagging, email drafting) tolerate lower accuracy and are easier to deploy.

**Overserved vs underserved** - Jobs where users have more solution than they need are overserved (AI adds cost, not value). Jobs where users struggle with inadequate solutions are underserved (AI fills a genuine gap).

## From Jobs to Use Cases

A well-defined job translates directly into an AI use case specification:

- **Job**: "When a customer submits a support ticket, determine which team should handle it, within 5 minutes, with 90%+ accuracy."
- **Use case**: Automated ticket classification using NLP, with human review for low-confidence predictions, integrated into the ticketing system.

The job statement provides the success criteria (5 minutes, 90% accuracy), the scope (support tickets), and the constraints (human review for edge cases) that guide technical implementation.

## When to Use JTBD for AI

Use JTBD at the start of AI strategy work, during use case discovery workshops, and when evaluating whether a proposed AI solution addresses a real need. It is most valuable when the organization has many potential AI projects and needs to identify which ones will deliver genuine value rather than just demonstrating technology.
