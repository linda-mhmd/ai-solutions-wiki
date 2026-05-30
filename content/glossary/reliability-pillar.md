---
title: "Reliability (Well-Architected Pillar)"
description: "The Well-Architected pillar covering fault tolerance, disaster recovery, health checks, and scaling - and how it applies to AI workloads including model endpoint failover and graceful degradation."
date: 2026-03-26
categories: [Glossary]
tags: ["architecture", "beginner", "reliability", "well-architected", "aws", "fault-tolerance", "resilience"]
related:
  - frameworks/well-architected-framework
  - frameworks/well-architected-ai-ml-lens
  - glossary/operational-excellence
  - glossary/performance-efficiency
last_updated: 2026-05-30
---

Reliability is one of the six pillars of the AWS Well-Architected Framework. It covers the ability of a workload to perform its intended function correctly and consistently over its expected lifetime. A reliable workload recovers from failures automatically, scales to meet demand, and is designed so that the failure of one component does not cascade into a failure of the entire system.

Source: [AWS Well-Architected Reliability Pillar](https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/welcome.html)

## Core Concepts

**Fault tolerance** is the ability of a system to continue operating correctly when one or more of its components fail. Fault tolerance is achieved by eliminating single points of failure - components whose failure would take down the entire system. Common patterns include deploying across multiple Availability Zones so that a hardware failure in one data center does not affect another, and using redundant instances behind a load balancer so that traffic can be rerouted when an instance becomes unhealthy.

**Disaster recovery** covers the processes and infrastructure needed to restore operations after a major failure event. Two key metrics define a disaster recovery posture: Recovery Time Objective (RTO) is the maximum acceptable time the system can be unavailable; Recovery Point Objective (RPO) is the maximum acceptable amount of data loss measured in time. Lower RTO and RPO require more investment in standby capacity and data replication. AWS defines four disaster recovery strategies in order of increasing cost and decreasing recovery time: backup and restore, pilot light, warm standby, and multi-site active/active.

**Scaling** is the ability of a system to handle increased load without degrading performance. Horizontal scaling adds more instances to handle more requests. Vertical scaling increases the size of individual instances. Auto-scaling policies trigger scaling events based on load metrics, ensuring that capacity is available when needed without requiring manual intervention. Scaling also applies to the demand side: load shedding and request throttling protect the system when demand exceeds safe capacity.

**Health checks** are automated tests that verify a component is functioning correctly. Load balancers use health checks to route traffic only to healthy instances. Orchestrators like ECS and Kubernetes use health checks to restart containers that have stopped responding. Effective health checks test the critical path of the application - they should verify that the application can connect to its database and process a request, not just that the process is running.

## Application to AI Workloads

AI workloads introduce reliability concerns that go beyond standard infrastructure reliability.

**Model endpoint failover** applies the same patterns as application server failover to ML inference endpoints. A SageMaker endpoint can be configured with multiple production variants that receive traffic in proportion to defined weights. If a primary endpoint becomes unhealthy, traffic can shift to a secondary endpoint. Multi-region deployments provide geographic redundancy for high-criticality AI features.

**Fallback models** address the ML-specific failure mode where an endpoint is healthy but the model produces outputs below an acceptable quality threshold. A well-designed AI feature has a fallback strategy: route to a simpler, more reliable model; return a cached response for similar queries; or degrade to a rule-based system that handles the most common cases. The appropriate fallback depends on the user impact of the degraded experience versus a complete failure.

**Graceful degradation** when AI is unavailable means that the application continues to function - with reduced capability - rather than failing entirely. If an AI-powered recommendation engine is unavailable, the application should display popular items or user history rather than a blank page or error. Graceful degradation requires that AI features are architected as enhancements to core functionality rather than dependencies of it.

Reliability design for AI systems also includes testing: load testing inference endpoints to validate scaling behavior, chaos testing to verify fallback logic, and periodic drills to verify that disaster recovery procedures work as documented.

## Sources

- AWS. (2023). *AWS Well-Architected Framework: Reliability Pillar*. Amazon Web Services. (Definitive reference for the four reliability design principles: automatically recover from failure, test recovery procedures, scale horizontally, and manage change in automation.)
- Nygard, M. T. (2018). *Release It!* (2nd ed.). Pragmatic Bookshelf. (Stability patterns: circuit breakers, bulkheads, timeouts, and fail-fast design, the engineering basis for reliable distributed systems.)
- Beyer, B., Jones, C., Petoff, J., & Murphy, N. R. (Eds.). (2016). *Site Reliability Engineering*. O'Reilly Media. Chapter 3: Embracing Risk. (Error budgets and the tradeoff between reliability and development velocity; the framework underlying the reliability pillar.)
