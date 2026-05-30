---
title: "Error Budget"
description: "What an error budget is, how it balances reliability with feature velocity, and how to implement error budget policies."
date: 2026-03-28
categories: [Glossary]
tags: [error-budget, SRE, reliability, SLO, operations]
related:
  - glossary/site-reliability-engineering
  - glossary/sla-slo-sli
  - glossary/toil
last_updated: 2026-05-30
---

An error budget is the maximum amount of unreliability a service can exhibit before violating its Service Level Objective (SLO). It quantifies acceptable downtime or errors as a concrete number, giving teams a budget they can "spend" on feature releases, experiments, and planned maintenance. When the budget is depleted, the team prioritizes reliability over new features.

## How It Works

If your SLO is 99.9% availability over 30 days, your error budget is 0.1% of total requests or 43.2 minutes of downtime. Every incident, every slow response, every error consumes some of this budget.

The error budget is tracked continuously. When significant budget remains, the team has room for risk: aggressive deployments, experiments, and infrastructure changes. When the budget is nearly consumed, the team slows deployments and focuses on stability.

**Error budget policy** defines what happens when the budget is exhausted: deployment freeze for new features, mandatory reliability improvements, increased testing requirements, or additional review for all changes.

## Why It Matters

Error budgets resolve the fundamental tension between reliability and velocity. Without error budgets, reliability discussions become political: operations wants stability, product wants features, and nobody has an objective framework for deciding.

Error budgets make this decision mechanical: budget remaining means ship features, budget spent means fix reliability. This aligns development and operations teams around a shared metric and removes subjective judgment from the prioritization.

## Practical Application for AI Systems

AI services often have natural error rates (model confidence below thresholds, timeouts on complex queries) that consume error budget even without incidents. Factor these baseline error rates into SLO targets. A model that returns low-confidence results 2% of the time should not have a 99.9% success SLO unless low-confidence results are still counted as successes.

## Practical Guidance

Start with a 30-day rolling window for error budget calculation. Set SLOs based on user expectations, not aspirational targets. Define the error budget policy before the first budget depletion, not during a crisis. Automate budget tracking and alerting (alert at 50% and 75% consumption). Review and adjust SLOs quarterly based on operational experience and changing user needs.

## Sources

- Beyer, B., Jones, C., Petoff, J., & Murphy, N. R. (Eds.). (2016). *Site Reliability Engineering: How Google Runs Production Systems*. O'Reilly Media. Chapter 3: Embracing Risk. (Introduced error budgets as a mechanism to balance reliability and velocity; the primary reference.)
- Beyer, B., Murphy, N. R., Rensin, D. K., Kawahara, K., & Thorne, S. (Eds.). (2018). *The Site Reliability Workbook*. O'Reilly Media. Chapter 2: Implementing SLOs. (Practical guidance on error budget policies, tracking, and enforcement.)
