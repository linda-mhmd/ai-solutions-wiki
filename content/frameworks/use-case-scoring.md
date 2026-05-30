---
title: "The Use Case Scoring Framework - From 57 Ideas to 3 Prototypes"
description: "A structured WSJF-inspired scoring methodology to cut through workshop noise and identify the AI use cases worth building first."
date: 2026-03-24
categories: [Frameworks]
tags: ["project-management", "intermediate", "use-case-scoring", "prioritization", "ai-adoption", "evaluation", "roi"]
last_updated: 2026-05-30
---

This framework was developed by Linda Mohamed based on WSJF (Weighted Shortest Job First) principles adapted for AI use case prioritization across dozens of enterprise workshops.

When organizations run their first AI ideation workshop, they rarely leave with too few ideas. They leave with too many - Post-it notes covering three whiteboards, a shared document with 57 bullet points, and no clear path forward. The Use Case Scoring Framework exists to solve exactly that problem.

## Why Generic Prioritization Fails for AI

Standard backlog prioritization tools like MoSCoW or simple effort/impact matrices miss dimensions that matter specifically for AI projects. They do not account for data sensitivity risks, which can turn a promising automation into a compliance problem. They do not weight customer reach in a way that distinguishes between a tool used by 3 internal analysts and one that touches every customer invoice. This framework adds those dimensions explicitly.

## The Scoring Dimensions

Each use case is scored across five dimensions. The maximum weighted score is 100 points.

**Time Savings (0-40 points)** - This is the highest-weighted dimension because time savings translate directly into FTE cost reduction or capacity reallocation. Score based on hours saved per week across all users: under 5 hours scores 0-10, 5-20 hours scores 10-25, over 20 hours scores 25-40.

**Customer Reach (0-35 points)** - How many end customers or users does the automation touch? Internal tools affecting fewer than 10 people score low. Customer-facing workflows touching thousands score at the top of this range. Reach amplifies impact in ways that pure efficiency metrics miss.

**Data Sensitivity (0-25 points, inverted)** - This dimension is a risk gate. A use case processing public web data scores 20-25. One touching regulated financial data or health records scores 0-5. This is intentionally harsh: high-sensitivity use cases require compliance reviews, security architecture, and longer delivery timelines that often kill ROI.

**Effort (1-10, separate axis)** - Scored independently. Not blended into the 100-point total. This creates a classic effort/value quadrant when plotted.

**Business Impact (1-10, separate axis)** - Strategic alignment score. Does this use case support a stated company objective? Rated by the business sponsor, not the technical team.

## Running the Scoring Workshop

The workshop works best with 6-8 participants: one business sponsor per use case cluster, two technical leads, and a facilitator who does not score.

1. Present each use case in 90 seconds - problem, proposed solution, rough data requirements.
2. Each participant scores independently on paper or a shared spreadsheet.
3. Facilitator reveals scores and discusses outliers (scores differing by more than 3 points).
4. Recalibrate where there was genuine information asymmetry, not just disagreement.
5. Plot final scores on the effort/value matrix.

The top-right quadrant (high value, low effort) becomes your prototype shortlist - typically 3-5 candidates from an original pool of 40-60 ideas.

## When to Use This Framework

This framework is most effective after a discovery workshop where use cases have already been loosely defined. It is not a replacement for discovery - it is the filter that follows it. Use it when you have more viable ideas than capacity to prototype, and when you need a defensible, documented rationale for what you chose to build first.

For organizations running their first AI program, the scoring session itself is valuable beyond the output: it forces business and technical stakeholders to agree on what good looks like before any code is written.

## Sources and Further Reading

- Reinertsen, D. G. (2009). *The Principles of Product Development Flow: Second Generation Lean Product Development.* Celeritas Publishing. - The source of WSJF (Weighted Shortest Job First) principles on which this framework's scoring approach is based.
- Scaled Agile Framework (SAFe) documentation on WSJF: [https://scaledagileframework.com/wsjf/](https://scaledagileframework.com/wsjf/)
- Mohamed, L. *Use Case Scoring Framework.* Original prioritization methodology adapted from WSJF for AI project selection, developed through enterprise consulting practice.
- Related framework: [Three Workshop Method](../three-workshop-method/) - the structured workshop process in which this scoring tool is used.
