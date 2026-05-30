---
title: "Team Topologies for AI - Organizing AI Teams"
description: "Applying Team Topologies to AI organizations: stream-aligned, platform, enabling, and complicated-subsystem teams for effective AI delivery."
date: 2026-03-28
categories: [Frameworks]
tags: [team-topologies, organization, team-structure, platform, collaboration]
related:
  - frameworks/inverse-conway-ai
  - frameworks/safe-for-ai
  - frameworks/capability-mapping
last_updated: 2026-05-30
---

Team Topologies, developed by Matthew Skelton and Manuel Pais, defines four fundamental team types and three interaction modes for organizing technology teams. The framework optimizes for fast flow of change by reducing cognitive load, clarifying team boundaries, and designing deliberate interaction patterns. For AI organizations, Team Topologies addresses the structural question that every scaling AI program faces: how to organize data scientists, ML engineers, data engineers, and platform engineers into teams that deliver effectively without creating bottlenecks.


<figure class="bz-figure">
  <img src="/img/dark-cherry/gears-mechanism.png" alt="Dark industrial gears under red light: each component sized and positioned so the mechanism works without friction." loading="lazy">
  <figcaption>Team Topologies is the discipline of sizing and positioning teams so the organisation works like this mechanism. Cognitive load is the friction. The framework reduces it by design.</figcaption>
</figure>

## The Four Team Types Applied to AI

### Stream-Aligned Teams

Stream-aligned teams are organized around a flow of work that delivers value to users or customers. In AI organizations, stream-aligned teams own end-to-end AI solutions for specific domains:

- A **fraud detection team** that owns the models, data pipelines, serving infrastructure, and monitoring for fraud use cases.
- A **customer intelligence team** that owns recommendation models, personalization, and customer analytics.
- A **document processing team** that owns extraction, classification, and summarization for document workflows.

Each stream-aligned team has the full capability needed to deliver: data engineering, model development, software engineering, and operational skills. They can build, deploy, and maintain their AI solutions without depending on other teams for every change.

This is the primary team type. Most people in the AI organization should be in stream-aligned teams.

### Platform Teams

Platform teams provide self-service infrastructure and tools that stream-aligned teams consume. In AI organizations, the platform team builds and maintains:

- **ML platform** - Model training infrastructure, experiment tracking, model registry, and deployment pipelines. Stream-aligned teams use the platform to train and deploy models without managing infrastructure.
- **Data platform** - Data lake/warehouse, data quality monitoring, feature stores, and data access governance. Stream-aligned teams access data through the platform without building data pipelines from scratch.
- **AI observability** - Monitoring dashboards, alerting, drift detection, and logging infrastructure. Stream-aligned teams instrument their models using platform-provided tools.

The platform team's success is measured by adoption and developer experience, not by features built. If stream-aligned teams work around the platform (building their own deployment scripts, maintaining their own monitoring), the platform is failing.

### Enabling Teams

Enabling teams help stream-aligned teams adopt new skills and technologies. In AI organizations, enabling roles include:

- **MLOps enablement** - Helping stream-aligned teams adopt CI/CD for models, automated testing, and monitoring best practices. The enabling team works with each stream-aligned team temporarily, transfers skills, and moves on.
- **AI ethics and governance** - Guiding teams on bias testing, fairness assessment, and responsible AI practices. This team does not own governance enforcement (that belongs to the platform) but helps teams understand and implement responsible AI.

Enabling teams have a defined end state: once the stream-aligned team can perform the capability independently, the enabling team's engagement ends.

### Complicated-Subsystem Teams

Complicated-subsystem teams own components that require deep specialist knowledge. In AI organizations, these might include:

- A **custom model training team** that develops novel model architectures requiring deep ML research expertise.
- An **optimization and performance team** that handles model compression, quantization, and serving optimization.

These teams are rare and should only be created when the subsystem's complexity genuinely requires specialist knowledge that cannot be reasonably absorbed by stream-aligned teams.

## Interaction Modes

### Collaboration

Two teams work closely together for a defined period. Use collaboration mode when a stream-aligned team needs help from the platform team to adopt a new capability, or when two stream-aligned teams are building an integrated AI solution. Collaboration has a defined end date; permanent collaboration indicates a team boundary problem.

### X-as-a-Service

One team provides a capability that another team consumes through a well-defined interface (API, CLI, UI). The platform team's relationship with stream-aligned teams should primarily be X-as-a-Service. Stream-aligned teams use the ML platform through documented interfaces, not by asking the platform team to do work for them.

### Facilitating

The enabling team facilitates skill transfer to a stream-aligned team. This is a temporary, teaching-oriented interaction. The enabling team is successful when the stream-aligned team no longer needs facilitation.

## Common AI Organization Anti-Patterns

**The centralized AI team** - One team of data scientists that serves all AI requests from across the organization. This creates a bottleneck, context-switching overhead, and weak ownership. Distribute AI capability into stream-aligned teams.

**The "throw it over the wall" pattern** - Data scientists build models, then hand them to a separate engineering team for deployment. This causes friction, delays, and models that do not work in production. Stream-aligned teams should own the full lifecycle.

**No platform, all custom** - Every stream-aligned team builds its own training pipeline, deployment scripts, and monitoring. This duplicates effort and creates inconsistent practices. Invest in a platform team when you have 3+ stream-aligned AI teams.

## When to Apply Team Topologies

Apply Team Topologies when the AI organization has grown beyond a single team (typically 10+ people), when delivery is slowing due to dependencies and handoffs, or when a platform investment decision is needed. For small teams (under 10), the overhead of distinct team types is not justified.

## Sources

1. Skelton, M. and Pais, M. (2019). *Team Topologies: Organizing Business and Technology Teams for Fast Flow.* IT Revolution Press., Primary source for the four team types (stream-aligned, platform, enabling, complicated-subsystem) and three interaction modes (collaboration, X-as-a-Service, facilitating) described in this article.
2. Skelton, M. and Pais, M. (2021). *Remote Team Interactions Workbook: Using Team Topologies Patterns for Remote, Hybrid, and In-Person Teams.* IT Revolution Press., Extension of the framework for distributed teams.
3. Conway, M.E. (1968). "How Do Committees Invent?" *Datamation* 14(4), pp. 28–31., Conway's Law, which Team Topologies operationalizes: "Organizations which design systems are constrained to produce designs which are copies of the communication structures of these organizations."
