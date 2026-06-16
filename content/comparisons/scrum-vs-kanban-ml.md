---
title: "Scrum vs Kanban for Machine Learning Teams"
description: "Comparing Scrum and Kanban frameworks for ML teams, covering ceremonies, metrics, work management, and guidance on which fits different ML work types."
date: 2026-03-28
last_verified: 2026-06-14
categories: [Comparisons]
tags: [scrum, kanban, agile, machine-learning, project-management]
last_updated: 2026-06-14
lastmod: 2026-06-14
---

Scrum and Kanban are both agile frameworks, but they manage work differently. Scrum uses time-boxed sprints with defined commitments. Kanban uses continuous flow with work-in-progress limits. For ML teams, the choice depends on the type of work and how predictable it is.

## Framework Comparison

| Aspect | Scrum | Kanban |
|---|---|---|
| Work cadence | Fixed sprints (1-4 weeks) | Continuous flow |
| Planning | Sprint planning per sprint | On-demand (pull when capacity available) |
| Commitments | Sprint goal and backlog | WIP limits only |
| Roles | Product Owner, Scrum Master, Developers | No required roles (optional Service Delivery Manager, Service Request Manager) |
| Ceremonies | Planning, standup, review, retro | Daily board review (optional) |
| Metrics | Velocity (points per sprint) | Cycle time, throughput |
| Change during cycle | Discouraged within sprint | Allowed anytime |
| Board | Sprint backlog (refreshed per sprint) | Continuous (work flows through) |

A note on official terminology. The 2020 Scrum Guide (the current edition) defines three accountabilities: Product Owner, Scrum Master, and Developers (it dropped the older phrase "Development Team"). It also does not define velocity, which is a widely used team practice rather than an official Scrum metric. Kanban is defined by The Official Guide to The Kanban Method (Kanban University) as a method rather than a process framework, so it prescribes no required roles, though it recognizes two optional emerging roles: the Service Delivery Manager (manages flow through the system) and the Service Request Manager (manages flow into the system).

## ML Work Type Analysis

### Research and Experimentation

ML research (trying new model architectures, feature engineering experiments, hyperparameter tuning) is inherently unpredictable. An experiment might take 2 hours or 2 weeks.

**Scrum challenges:** Research stories are hard to estimate. Sprint commitments feel artificial because outcomes are uncertain. A sprint where all experiments "failed" (produced useful negative results) looks like zero velocity.

**Kanban advantages:** No sprint commitments means no penalty for experiments that take longer than expected. Continuous flow accommodates variable-duration work naturally. WIP limits prevent the team from running too many experiments simultaneously.

**Recommendation:** Kanban for research-heavy phases

### Production Engineering

Building data pipelines, model serving APIs, monitoring dashboards, and CI/CD infrastructure is predictable engineering work with clear requirements and estimable effort.

**Scrum advantages:** Sprint commitments provide delivery cadence. Stakeholders get regular demonstrations. Velocity tracking enables capacity planning. Sprint goals focus the team.

**Kanban challenges:** Without sprint cadence, there is no natural point for stakeholder demos or team retrospectives. Continuous flow can feel directionless without sprint goals.

**Recommendation:** Scrum for engineering-heavy phases

### Operations and Maintenance

Model monitoring, incident response, retraining, and infrastructure maintenance are interrupt-driven. Work arrives unpredictably and varies in urgency.

**Scrum challenges:** Unplanned work disrupts sprint commitments. Reserving capacity for "unknown" interrupts is imprecise. Sprint planning for unpredictable work is wasteful.

**Kanban advantages:** Work items enter the backlog as they arrive. The team pulls work based on priority and capacity. Service-level expectations (incidents resolved within 4 hours, standard requests within 5 days) replace sprint commitments.

**Recommendation:** Kanban for operations teams

## Metrics Comparison

### Scrum Metrics for ML

**Velocity** (story points per sprint) is the primary Scrum metric. For ML teams, velocity is unreliable because research story estimates have high variance. A more useful metric is the number of experiments completed per sprint (experiment throughput), regardless of their outcome.

**Sprint goal completion** tracks whether the team achieves its sprint objective. For ML sprints, goals should be outcome-based ("determine whether approach X is viable") rather than output-based ("complete stories A, B, C").

### Kanban Metrics for ML

**Cycle time** measures how long work items take from start to finish. Track separately by work type: experiment cycle time, engineering cycle time, incident resolution time. Decreasing cycle time indicates improving team efficiency.

**Throughput** measures completed items per time period. For ML teams, track experiments completed per week and engineering items completed per week separately.

**Cumulative flow diagram** shows work distribution across board columns over time. Widening bands indicate bottlenecks. For ML teams, this often reveals that "in review" or "waiting for data" columns accumulate work.

## Hybrid Approaches

Many ML teams use elements of both:

### Scrumban

Coined by Corey Ladas (the term appeared around 2008 and was expanded in his 2009 book), Scrumban originally described a way to transition a Scrum team toward Kanban, and it has since become a standalone hybrid. In practice it pairs sprint cadence with Kanban-style work management:
- Sprint planning sets a goal and timeframe
- During the sprint, work is pulled from a prioritized backlog (Kanban style)
- No rigid sprint commitment - the sprint goal provides direction without rigid story commitment
- Sprint reviews and retrospectives provide regular feedback points
- WIP limits prevent overcommitment

### Dual-Track

Separate tracks with different frameworks:
- Research track uses Kanban (continuous flow, WIP limits)
- Engineering track uses Scrum (sprint commitments, velocity tracking)
- Both tracks align on shared goals and dependencies

This approach acknowledges that different types of ML work need different management approaches.

## Transitioning Between Frameworks

ML projects naturally transition between phases that favor different frameworks:

**Early phase (exploration):** Kanban. The team explores data, tests approaches, and experiments freely. Work is unpredictable.

**Middle phase (development):** Scrum. The approach is validated, and the team builds the production system. Work is more predictable and benefits from sprint structure.

**Late phase (operations):** Kanban. The system is in production, and the team handles monitoring, incidents, and improvements. Work is interrupt-driven.

Rather than picking one framework for the entire project, adapt the framework to the current phase.

## Recommendation

**Start with Kanban** if your ML team is new to agile practices. Kanban's simplicity (visualize work, limit WIP, manage flow) is easier to adopt than Scrum's full ceremony structure. Add Scrum elements (sprint cadence, planning, reviews) as the team matures and as the work becomes more predictable.

**Start with Scrum** if your ML team needs structure, stakeholder communication rhythm, and delivery predictability. Adapt ceremonies and metrics for ML work (experiment stories, research velocity, time-boxed spikes).

The best framework is the one the team will actually follow. Choose based on team preference and work type, then iterate.

## Sources

- [The Scrum Guide (2020)](https://scrumguides.org/scrum-guide.html) - Schwaber and Sutherland, the definitive guide to Scrum roles, events, and artifacts.
- [The Official Guide to The Kanban Method](https://kanban.university/kanban-guide/) - Kanban University, the practices, flow metrics, and emerging roles of Kanban.
- [Scrumban](https://agilealliance.org/scrumban/) - Agile Alliance, excerpt from Corey Ladas on the origin of the Scrumban hybrid.
