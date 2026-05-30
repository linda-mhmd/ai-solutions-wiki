---
title: "WSJF - Weighted Shortest Job First"
description: "Definition, formula, and how to adapt WSJF for scoring and prioritizing AI use cases and backlog items."
date: 2026-03-24
categories: [Glossary]
tags: [glossary, prioritization, agile]
last_updated: 2026-05-30
---

Weighted Shortest Job First (WSJF) is a prioritization method from scaled agile (SAFe) that ranks work items by dividing their cost of delay by their job duration. Items with high cost of delay and short duration score highest and get done first.

## The Formula

**WSJF = Cost of Delay / Job Duration (or relative effort)**

**Cost of Delay** combines three components, typically scored on a Fibonacci scale (1, 2, 3, 5, 8, 13, 20):

- **User/business value** - How much value does this deliver? What is the direct benefit to users or the business?
- **Time criticality** - Does the value decay if we delay? Is there a deadline, a market window, or a compliance date?
- **Risk reduction / opportunity enablement** - Does this item unblock future work or reduce a significant risk?

Cost of Delay is the sum of these three components.

**Job Duration** is the relative size of the effort required to complete the item. Use story points or T-shirt sizing. You do not need precise estimates - relative sizing (this is about twice as large as that) is sufficient.

## A Worked Example

Two AI use case candidates:

**Use Case A - Automated invoice processing**
- User value: 8 (high volume, clear efficiency gain)
- Time criticality: 3 (no specific deadline)
- Risk reduction: 2 (minor)
- Cost of Delay: 13
- Effort: 5
- WSJF: 13/5 = **2.6**

**Use Case B - Regulatory compliance report automation**
- User value: 5 (moderate efficiency gain)
- Time criticality: 13 (compliance deadline in 6 weeks)
- Risk reduction: 8 (significant regulatory risk if not automated)
- Cost of Delay: 26
- Effort: 8
- WSJF: 26/8 = **3.25**

Use Case B scores higher despite lower user value because the time criticality and risk reduction create a high cost of delay.

## Adapting WSJF for AI Use Case Scoring

Standard WSJF scores features against a current development sprint. For AI use case prioritization, the same logic applies but the scoring criteria may need adaptation:

- Add a **data availability** factor: use cases where good training or context data already exists should score higher than equivalent use cases requiring significant data work first
- Add a **implementation risk** factor: use cases where the AI approach is well-established score higher than speculative approaches
- Treat **regulatory or compliance pressure** as a time criticality signal that should significantly inflate cost of delay

The scoring is always relative. Its purpose is to facilitate structured conversation about trade-offs, not to produce a mechanically correct ordering. Use the scores to prompt discussion rather than treating them as authoritative.

## Limitations

WSJF assumes effort estimates are independent. In practice, doing one item may reduce the effort of a related item. It also does not handle dependencies - sometimes you must do a lower-scoring item before a higher-scoring one is possible.

Use WSJF as a starting point for prioritization, then apply dependency and sequencing analysis as a second pass. The WSJF score identifies where value is concentrated; the dependency analysis identifies what order is actually feasible.

## Sources

- Leffingwell, D. (2011). *Agile Software Requirements: Lean Requirements Practices for Teams, Programs, and the Enterprise*. Addison-Wesley. (Weighted Shortest Job First as the SAFe prioritization method; cost of delay as the primary economic signal.)
- Black, S. W. (1990). Box-office dynamite: Why Hollywood films bomb. (Cost of delay concept in production economics; the opportunity cost of delay vs. investment in shorter lead times.)
- Reinertsen, D. G. (2009). *The Principles of Product Development Flow*. Celeritas Publishing. Chapter 2: The Economics of Product Development. (Cost of delay as the foundational concept; why WSJF is derived from lean economics rather than simple effort estimation.)
