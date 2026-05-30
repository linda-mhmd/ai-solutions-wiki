---
title: "RICE Scoring for AI - Quantitative Use Case Prioritization"
description: "Applying the RICE scoring model (Reach, Impact, Confidence, Effort) to prioritize AI use cases with transparent, repeatable evaluation criteria."
date: 2026-03-28
categories: [Frameworks]
tags: [RICE, prioritization, scoring, use-case-selection, product-management]
related:
  - frameworks/use-case-scoring
  - frameworks/moscow-prioritization
  - frameworks/cost-benefit-analysis-ai
last_updated: 2026-05-30
---

RICE is a scoring framework developed by Intercom for prioritizing product features. It scores each initiative on four dimensions: Reach, Impact, Confidence, and Effort. The RICE score is calculated as (Reach x Impact x Confidence) / Effort, producing a single number that enables direct comparison across candidates. For AI use case prioritization, RICE provides a more structured alternative to gut-feel ranking while remaining simple enough to use in a workshop setting.

## The Four Dimensions for AI

### Reach

How many people or transactions does this AI use case affect in a given time period? Measure reach in a consistent unit: users per month, transactions per day, or documents per week.

**High reach examples** - An AI that classifies every incoming customer email (10,000/day). An AI that personalizes the homepage for every visitor (100,000/month).

**Low reach examples** - An AI that assists the three analysts who write quarterly reports. An AI that optimizes the weekly warehouse restocking decision.

Reach prevents the bias toward interesting or technically impressive projects that only affect a small number of people. A simple AI that touches every customer interaction often delivers more value than a sophisticated AI used by a handful of internal staff.

### Impact

How much does this AI improve the outcome for each person or transaction it reaches? Score on a standard scale: 3 = massive improvement, 2 = high, 1 = medium, 0.5 = low, 0.25 = minimal.

For AI use cases, impact maps to measurable outcomes:

- **3 (Massive)** - Eliminates the task entirely, or improves the key metric by >50%. AI processes invoices end-to-end, eliminating manual data entry.
- **2 (High)** - Significantly reduces time or errors, 25-50% improvement. AI pre-fills forms and highlights anomalies, reducing review time by half.
- **1 (Medium)** - Noticeable improvement, 10-25%. AI suggests responses that agents edit before sending.
- **0.5 (Low)** - Minor improvement, <10%. AI sorts items in a slightly more relevant order.

### Confidence

How confident are you in the Reach, Impact, and Effort estimates? This is where AI prioritization diverges most from standard product prioritization. AI projects have unique confidence factors:

- **Data confidence** - Is the required training data available and of sufficient quality? Have you verified this with actual data profiling, or is it an assumption?
- **Technical confidence** - Has the approach been validated with a POC, or is it theoretical? Published benchmarks on similar tasks increase confidence.
- **Adoption confidence** - Have users expressed enthusiasm for this solution, or is it an internal hypothesis about what users need?

Score as a percentage: 100% (high confidence, strong evidence), 80% (medium, some evidence), 50% (low, mostly assumptions). Below 50%, the initiative likely needs a feasibility study before committing resources.

### Effort

How many person-months will this AI use case require to reach production? Include all effort: data preparation, model development, integration, testing, and deployment. For AI projects, effort estimation should include:

- Data acquisition and preparation (often 40-60% of total effort)
- Model development and training
- Integration with existing systems
- Monitoring and operational setup
- User training and change management

Effort is the denominator in the RICE formula, so higher effort reduces the score. This naturally favors quick wins over ambitious multi-month projects, which is appropriate for initial AI portfolio construction.

## Calculating the RICE Score

RICE Score = (Reach x Impact x Confidence) / Effort

Example comparison:

| Use Case | Reach | Impact | Confidence | Effort | RICE Score |
|---|---|---|---|---|---|
| Email classification | 10,000/mo | 2 | 80% | 2 person-months | 8,000 |
| Quarterly report AI | 12/mo | 3 | 50% | 4 person-months | 4.5 |
| Invoice extraction | 5,000/mo | 3 | 90% | 3 person-months | 4,500 |

The email classification dominates because of its massive reach combined with reasonable impact and high confidence.

## Running a RICE Scoring Workshop

Gather business stakeholders (for Reach and Impact estimates) and technical leads (for Confidence and Effort estimates). Score each use case individually first, then discuss outliers where estimates differ significantly. Use the discussion to surface assumptions: a high confidence score is only valid if someone has actually examined the data.

## Limitations

RICE does not account for strategic alignment, regulatory risk, or dependencies between use cases. It is a good first-pass prioritization that should be supplemented with qualitative assessment. Use RICE to reduce a long list of candidates to a short list, then apply deeper analysis (cost-benefit analysis, feasibility study) to the top candidates.

## When to Use RICE

Use RICE when you have 10+ AI use case candidates and need to prioritize quickly. It works best in workshop settings where teams need a transparent, defensible ranking. For fewer than 5 candidates, the overhead of formal scoring is not justified; simple discussion and consensus are sufficient.
