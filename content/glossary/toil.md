---
title: "Toil"
description: "What toil is in the SRE context, how to identify it, and strategies for reducing operational burden through automation."
date: 2026-03-28
categories: [Glossary]
tags: [toil, SRE, automation, operations, DevOps]
related:
  - glossary/site-reliability-engineering
  - glossary/error-budget
  - glossary/infrastructure-as-code
last_updated: 2026-05-30
---

Toil is manual, repetitive, automatable operational work that scales linearly with service size. In the SRE framework, toil is work that has no lasting value: it keeps the system running but does not permanently improve it. Google's SRE practice targets keeping toil below 50% of an engineer's time, with the remainder spent on engineering work that reduces future toil.

## Characteristics of Toil

Work is toil if it is:

**Manual** - a human runs a script, clicks through a console, or performs a procedure that a machine could do.

**Repetitive** - it happens over and over, not as a one-time task.

**Automatable** - no human judgment is required; it follows a defined procedure.

**Reactive** - it is triggered by an event (an alert, a request, a schedule) rather than being proactively planned engineering work.

**Scales with service** - as the service grows, the toil grows proportionally. More users means more manual scaling decisions, more alerts to acknowledge, more access requests to process.

## Common Sources of Toil in AI Systems

**Manual model deployments** - following a checklist to deploy a new model version instead of automating the pipeline.

**Alert response** - acknowledging and resolving alerts that could be auto-remediated (restarting a failed container, scaling up during peak hours).

**Data pipeline maintenance** - manually rerunning failed ETL jobs, fixing data quality issues that recur regularly, manually refreshing vector indexes.

**Access management** - manually provisioning and revoking access to AI resources, model endpoints, and data stores.

**Capacity management** - manually adjusting resource allocation based on usage patterns instead of implementing auto-scaling.

## Why It Matters

Toil consumes engineering capacity that could improve the system. A team spending 80% of its time on toil can only spend 20% on improvements, which means toil tends to increase over time as the system grows. Reducing toil is a compounding investment: each automation frees time for more automation.

## Practical Guidance

Track toil by having the team log manual operational tasks for a sprint. Categorize by time spent, frequency, and automation feasibility. Prioritize automating the highest-frequency, most-automatable tasks first. Use runbooks to document toil tasks, then convert runbooks into automation scripts, then into self-healing systems. Accept that some toil is irreducible - the goal is reduction, not elimination.

## Sources

- Beyer, B., Jones, C., Petoff, J., & Murphy, N. R. (Eds.). (2016). *Site Reliability Engineering: How Google Runs Production Systems*. O'Reilly Media. Chapter 5: Eliminating Toil. (Original SRE definition of toil; the 50% toil budget rule; distinction between toil and overhead work.)
- Beyer, B., Murphy, N. R., Rensin, D. K., Kawahara, K., & Thorne, S. (Eds.). (2018). *The Site Reliability Workbook*. O'Reilly Media. Chapter 6: Eliminating Toil. (Practical toil tracking, categorization, and elimination strategies.)
- Kim, G., Humble, J., Debois, P., & Willis, J. (2016). *The DevOps Handbook*. IT Revolution Press. (Automation as the antidote to toil; the relationship between toil elimination and delivery performance.)
