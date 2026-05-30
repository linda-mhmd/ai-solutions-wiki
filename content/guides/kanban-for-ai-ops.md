---
title: "Kanban for AI Operations - Flow-Based Management"
description: "Implementing Kanban for AI operations teams managing model deployments, monitoring, retraining, and incident response in production ML systems."
date: 2026-03-28
categories: [Guides]
tags: [kanban, AI-ops, MLOps, project-management, operations]
last_updated: 2026-05-30
---

Kanban is a flow-based work management method that visualizes work, limits work in progress, and optimizes throughput. For AI operations teams - the people who keep models running in production - Kanban is often a better fit than Scrum. Operations work is interrupt-driven, unpredictable in volume, and does not fit neatly into sprint commitments. Kanban accommodates this reality.

## Why Kanban Fits AI Ops

AI operations teams handle a mix of planned and unplanned work:

**Planned work.** Scheduled model retraining, infrastructure upgrades, monitoring dashboard improvements, pipeline optimizations, cost optimization reviews.

**Unplanned work.** Model drift alerts, data pipeline failures, latency spikes, stakeholder escalations, security patches, incident investigations.

Scrum struggles with this mix because unplanned work disrupts sprint commitments. Kanban handles it naturally because there are no sprint commitments to disrupt - work flows continuously, and the team pulls new work as capacity allows.

## Board Design for AI Ops

A Kanban board for AI operations should reflect the actual workflow stages:

**Incoming** - New requests, alerts, and tickets arrive here. This is the queue of work waiting to be triaged.

**Triaged** - Work that has been assessed for priority and effort. Each item has a clear definition of what "done" means.

**In Progress** - Work actively being performed. This column has a WIP (work in progress) limit - the most important rule in Kanban.

**In Review** - Changes awaiting code review, testing, or validation. For model changes, this includes evaluation against test datasets.

**Deployed / Done** - Work that has been deployed to production and verified.

**Blocked** - A visible column (or tag) for work that cannot proceed. Common AI Ops blocks: waiting for data, waiting for compute resources, waiting for stakeholder approval.

Some teams add columns specific to ML work:

**Training** - Model retraining jobs in progress. These can run for hours or days, and the board should reflect that the work is active but not requiring human attention.

**Validation** - Model evaluation and comparison against the current production model. This is a distinct phase from code review.

## WIP Limits

Work-in-progress limits are the core mechanism of Kanban. They prevent the team from starting too much work and finishing none of it.

**Set WIP limits per column.** A common starting point for an AI ops team of four: In Progress limit of 6 (roughly 1.5 items per person), In Review limit of 4, Training limit of 3 (constrained by compute resources, not people).

**WIP limits force prioritization.** When the In Progress column is full, the team must finish or abandon something before starting something new. This is uncomfortable at first but dramatically improves throughput and reduces context switching.

**Adjust WIP limits based on data.** Track cycle time (how long items take from start to finish) and throughput (how many items complete per week). If cycle time is increasing, the WIP limits may be too high. If the team has idle capacity, they may be too low.

## Work Item Types

Define explicit work item types with different service-level expectations:

**Incident.** Production impact. Target response: immediate. Target resolution: same day. These bypass normal WIP limits - if production is down, everything else pauses.

**Urgent request.** High-priority stakeholder request or time-sensitive change. Target: 2-3 business days. Limited to one or two active at any time to prevent "everything is urgent" syndrome.

**Standard request.** Normal operational work. Target: 1-2 weeks. The bulk of the work.

**Improvement.** Internal optimization, automation, technical debt reduction. No external deadline. Allocate at least 20% of capacity to improvements, or operational efficiency degrades over time.

## Metrics and Flow

Kanban teams track flow metrics rather than velocity:

**Cycle time** is the elapsed time from when work starts to when it is done. Track this per work item type. Model retraining might average 3 days; infrastructure changes might average 5 days. Monitor trends - increasing cycle time indicates a systemic problem.

**Throughput** is the number of items completed per time period (usually per week). This is the Kanban equivalent of velocity. Plot it on a run chart to identify trends and anomalies.

**Lead time** is the elapsed time from when work is requested to when it is done. This is what the customer experiences. The gap between lead time and cycle time is queue time - how long items wait before someone starts them.

**Cumulative flow diagram** shows the distribution of work across board columns over time. It reveals bottlenecks visually: if the "In Review" band is growing wider while "Done" stays flat, reviews are the bottleneck.

## Handling Model Drift and Retraining

Model drift monitoring generates a steady stream of operational work. Integrate it into the Kanban system:

**Automated alerts create work items.** When drift detection systems flag a model, automatically create a work item in the Incoming column with the model name, drift metric, and severity.

**Define retraining runbooks.** Standard retraining should be a documented, repeatable process. The work item is "retrain model X per runbook," not "figure out how to retrain model X."

**Track retraining cycle time.** How long does it take from drift detection to updated model in production? This end-to-end metric captures the full operational response capability.

## Daily Operations Meeting

Replace the daily standup with a board-focused meeting:

1. Walk the board right to left (starting from items closest to done)
2. Identify blocked items and assign actions to unblock them
3. Check WIP limits - are any columns over limit?
4. Review the incoming queue - anything that needs immediate attention?
5. Total time: 10-15 minutes

This is faster than a standup because the focus is on the work, not on individual status updates.

## When to Use Kanban vs Scrum for AI

Use Kanban for AI Ops when the team primarily handles operational work, incident response, and maintenance. Use Scrum when the team is primarily building new models and features. Many organizations have both: a Scrum-based development team and a Kanban-based operations team, with a clear handoff process between them.
