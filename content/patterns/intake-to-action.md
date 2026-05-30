---
title: "The Intake-to-Action Pattern - Structured Data from Unstructured Input"
description: "A reusable pattern for converting unstructured inputs - forms, emails, documents - into structured data with risk flags and suggested next actions. Used across insurance, government, legal, and HR."
date: 2026-03-24
categories: [Patterns]
tags: [patterns, intake, document-processing, automation]
last_updated: 2026-05-30
---

The intake-to-action pattern appears wherever an organization receives unstructured information from external parties and needs to act on it. Claims arrive as document packets. Benefit applications arrive as scanned forms. Legal referrals arrive as narrative descriptions. In every case, the same fundamental transformation is needed: convert the unstructured input into a structured record, identify what is missing or flagged, and determine what should happen next.

## The Core Transformation

The pattern has three stages:

**Extraction** - Parse the raw input and extract structured fields. This uses OCR for scanned documents, document parsing for PDFs, and structured extraction prompts for free-text inputs. The output is a JSON record with the fields relevant to the domain: claimant details, dates, referenced documents, reported facts, stated requests.

**Enrichment** - Augment the extracted data with information from internal systems. Look up the applicant's prior history. Retrieve the relevant policy or case record. Cross-reference extracted entities against known databases. The enrichment step is what turns isolated extracted data into a contextualized intake record.

**Classification and routing** - Apply rules and model-based scoring to the enriched record to produce two outputs: a set of flags (what about this intake is incomplete, anomalous, or requires attention?) and a routing decision (which queue or process should handle this intake next?).

## What "Flags" Should Actually Be

Flags are the pattern's most important design decision. Poorly designed flag systems produce either too many low-quality signals (staff stop paying attention) or too few signals (risks are missed). Good flags are:

- **Specific** - not "something looks unusual" but "claim amount is 3.4x the average for this damage type in this region"
- **Sourced** - each flag identifies which document or data point triggered it
- **Actionable** - each flag maps to a defined response (request additional documentation, route to specialist, escalate to supervisor)

A flag is not a decision. It is information that a human reviewer needs to make a better decision than they would make without it.

## Suggested Next Actions

Next action suggestions are generated from the intake profile after flags are resolved. They are domain-specific templates triggered by intake type and profile:

- Intake type: first-time benefit application + flag: income documentation incomplete = action: request income verification documents
- Intake type: insurance claim + flag: high fraud signal score = action: route to fraud specialist queue
- Intake type: legal referral + no flags = action: schedule initial client interview, request discovery materials

The action suggestions are advisory. The caseworker, adjuster, or intake processor accepts, modifies, or overrides them. The system never acts on its own suggestions.

## Where This Pattern Applies

The intake-to-action pattern is the right choice when:
- Input volume is high enough that manual processing creates backlogs or inconsistency
- Inputs are semi-structured (not fully free-form, but not already structured)
- Missing information is a common problem and early detection has value
- The downstream process has defined routing logic that can be formalized

It is less useful when inputs are genuinely free-form with high variance (hard to extract reliably), when volume is low enough that manual review is feasible, or when the routing logic is too context-dependent to formalize.

## Implementation Notes

The extraction step benefits from few-shot prompting with examples of the target JSON structure and sample inputs from your domain. Use structured output (JSON mode) from your LLM to ensure consistent field names.

The enrichment step requires integration with your systems of record. Start with the most impactful joins - usually prior history lookup - before building out the full enrichment graph.

Build the flag rules explicitly before using model-based anomaly detection. Rule-based flags are more auditable and easier to tune. Add model-based detection only for patterns too complex to express as rules.
