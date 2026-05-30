---
title: "SLA, SLO, and SLI"
description: "What SLAs, SLOs, and SLIs are, how they relate to each other, and how to define them for AI services."
date: 2026-03-28
categories: [Glossary]
tags: [SLA, SLO, SLI, reliability, SRE]
related:
  - glossary/site-reliability-engineering
  - glossary/error-budget
  - glossary/observability
last_updated: 2026-05-30
---

SLA, SLO, and SLI form a hierarchy of reliability concepts. SLIs measure service behavior, SLOs set internal reliability targets, and SLAs define contractual commitments to customers. Together, they provide a structured approach to defining, measuring, and committing to service reliability.

## Definitions

**SLI (Service Level Indicator)** is a quantitative measure of service behavior. Examples: request latency (p99 under 500ms), availability (percentage of successful requests), error rate (percentage of requests returning errors), throughput (requests per second). SLIs are the raw measurements.

**SLO (Service Level Objective)** is an internal target for an SLI. "99.9% of requests will return a successful response within 2 seconds over a 30-day window." SLOs define what "reliable enough" means for your team. They are more aggressive than SLAs and drive engineering priorities through error budgets.

**SLA (Service Level Agreement)** is a contractual commitment to customers with defined consequences (credits, refunds) for violations. "99.5% monthly uptime; if violated, customer receives 10% service credit." SLAs are less aggressive than SLOs because violating an SLA has business consequences.

## The Hierarchy

SLOs should be stricter than SLAs. If your SLA promises 99.5% availability, your SLO might target 99.9%. The gap between SLO and SLA is your safety margin. If you breach the SLO, you have time to fix the issue before it becomes an SLA violation.

## Defining SLIs for AI Services

AI services need SLIs that capture what users experience:

- **Availability** - percentage of inference requests that return a response (not a timeout or 5xx error)
- **Latency** - inference response time at p50, p95, p99
- **Quality** - percentage of responses with confidence above a threshold, or human-rated quality scores
- **Freshness** - time since the knowledge base or model was last updated (relevant for RAG systems)

## Practical Guidance

Start with 2-3 SLIs that directly reflect user experience. Avoid too many SLIs - they become impossible to reason about. Set SLOs based on user needs, not technical capabilities (users do not care about CPU utilization). Measure SLIs continuously and automatically. Review SLOs quarterly and adjust based on operational experience. Only commit to SLAs when you have a track record of meeting the corresponding SLOs with margin to spare.

## Sources

- Beyer, B., Jones, C., Petoff, J., & Murphy, N. R. (Eds.). (2016). *Site Reliability Engineering: How Google Runs Production Systems*. O'Reilly Media. Chapter 4: Service Level Objectives. (Primary reference defining SLI, SLO, and SLA and their relationships; the foundation of reliability engineering practice.)
- Beyer, B., Murphy, N. R., Rensin, D. K., Kawahara, K., & Thorne, S. (Eds.). (2018). *The Site Reliability Workbook*. O'Reilly Media. Chapter 2: Implementing SLOs. (Practical guidance on choosing SLIs, setting SLO targets, and creating measurement infrastructure.)
