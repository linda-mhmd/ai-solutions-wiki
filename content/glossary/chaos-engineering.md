---
title: "Chaos Engineering"
description: "What chaos engineering is, how controlled experiments improve system resilience, and how to start practicing it safely."
date: 2026-03-28
categories: [Glossary]
tags: [chaos-engineering, resilience, reliability, testing, SRE]
related:
  - glossary/site-reliability-engineering
  - glossary/circuit-breaker
  - glossary/error-budget
last_updated: 2026-05-30
---

Chaos engineering is the practice of deliberately introducing controlled failures into a system to discover weaknesses before they cause unplanned outages. By proactively testing how the system responds to disrupted networks, failed services, increased latency, and resource exhaustion, teams build confidence that the system handles real-world failures gracefully.

## How It Works

A chaos experiment follows a structured process:

1. **Define steady state** - establish the normal behavior metrics (latency, error rate, throughput) that indicate the system is healthy.
2. **Hypothesize** - predict what will happen when a specific failure is introduced ("if we terminate one inference container, latency will increase briefly but no requests will fail").
3. **Inject failure** - introduce the failure in a controlled manner with a clear blast radius and abort conditions.
4. **Observe** - monitor whether the system maintains steady state or degrades.
5. **Learn** - if the system behaved as expected, confidence increases. If not, fix the weakness and re-test.

**AWS Fault Injection Service (FIS)** provides managed chaos experiments: terminate EC2 instances, inject API errors, add network latency, stress CPU/memory, and throttle EBS I/O, with built-in safety controls (automatic stop conditions, rollback).

## Why It Matters

Systems fail in production. The question is whether you discover failure modes proactively (through chaos experiments during business hours with the team ready) or reactively (during an outage at 2 AM). Chaos engineering converts unknown failure modes into known, tested, and handled failure modes.

For AI platforms, relevant experiments include: What happens when the model endpoint is slow? When the vector database is unavailable? When the message queue fills up? When an upstream data feed stops?

## Practical Guidance

Start small: terminate a single container in a non-production environment and verify that the system recovers. Expand scope gradually. Use AWS FIS for managed experiments with automatic rollback. Always have abort conditions defined before starting. Run chaos experiments during business hours when the team can respond. Build a culture where chaos experiments are routine engineering practice, not special events requiring management approval.

## Sources

- Basiri, A., et al. (2016). Chaos engineering. *IEEE Software, 33*(3), 35–41. (Netflix; foundational paper that defined and named chaos engineering as a discipline.)
- Nygard, M. T. (2018). *Release It!: Design and Deploy Production-Ready Software* (2nd ed.). Pragmatic Bookshelf. (Stability patterns including circuit breakers, timeouts, and bulkheads that chaos engineering validates.)
- Principles of Chaos Engineering. (2019). *Principles of chaos engineering*. principlesofchaos.org. (Community-authored specification defining steady-state hypothesis and experiment methodology.)
