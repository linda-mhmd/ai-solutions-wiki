---
title: "TDSP: Microsoft's Team Data Science Process"
description: "A structured, agile methodology for delivering data science and AI solutions in teams, emphasizing collaboration, standardized project structures, and production deployment."
date: 2026-03-28
categories: [Frameworks]
tags: [tdsp, data-science, methodology, microsoft, team-collaboration, mlops]
related:
  - frameworks/crisp-dm
  - frameworks/agile-ai-delivery
  - frameworks/dora-framework
  - frameworks/build-measure-learn
  - frameworks/well-architected-framework
last_updated: 2026-05-30
---

The Team Data Science Process (TDSP) is Microsoft's methodology for executing data science projects in collaborative team settings. While CRISP-DM provides a process framework, TDSP goes further by defining team roles, standardized project structures, infrastructure recommendations, and explicit integration with agile development practices. It was designed to address the common failure mode where individual data scientists build models that never make it to production because the handoff to engineering was never planned.

## Core Lifecycle

TDSP follows five lifecycle stages that parallel CRISP-DM but add team-oriented and production-oriented structure:

### 1. Business Understanding

Define objectives and identify data sources. TDSP emphasizes formalizing this as a charter document with specific, measurable goals. The charter specifies: what is the business question, what data is available, where will the model be deployed, and what does the minimum viable model look like?

Unlike informal kickoff conversations, the charter creates accountability. It is reviewed and signed off by both the data science team and the business stakeholder before work begins.

### 2. Data Acquisition and Understanding

Ingest data into an analytics environment, explore it, and assess quality. TDSP specifies a standardized project directory structure where raw data, processed data, and data documentation live in predictable locations. This matters when multiple team members work on the same project or when a new member joins.

Data exploration results are documented as versioned reports, not just notebook outputs. This creates an audit trail of what was discovered and what decisions were made based on the data.

### 3. Modeling

Feature engineering, model training, and model evaluation. TDSP recommends tracking all experiments with parameters, metrics, and artifacts in a centralized experiment tracking system. Every model run is reproducible because the code, data version, and configuration are recorded together.

TDSP explicitly calls for evaluating models against the business success criteria from the charter, not just technical metrics. A model that optimizes log-loss but does not improve the business KPI defined in the charter has not succeeded.

### 4. Deployment

Operationalize the model as a service or embedded component. TDSP treats deployment as a first-class phase, not an afterthought. The deployment plan includes API design, scaling requirements, monitoring setup, and rollback procedures.

Models are deployed with logging that captures input distributions, prediction distributions, and latency. These logs feed the monitoring system that detects drift and degradation.

### 5. Customer Acceptance

Validate that the deployed system meets the business objectives in production. This includes A/B testing, user acceptance testing, and measurement against the charter's success criteria. Only after customer acceptance is the project considered complete.

## Team Roles

TDSP defines four key roles:

**Group Manager** - Manages the data science group, sets standards, and ensures methodology adherence across projects.

**Team Lead** - Manages a specific project team, coordinates work, and handles stakeholder communication.

**Project Lead (Data Scientist)** - Executes the data science work: exploration, modeling, evaluation. Collaborates with the data engineer on data pipelines and with the application developer on deployment.

**Project Lead (Application Developer)** - Builds the production infrastructure: APIs, data pipelines, monitoring, and CI/CD. Works alongside the data scientist to ensure models are deployable from the start.

The explicit inclusion of an application developer role addresses the most common reason data science projects fail to reach production: nobody planned for the engineering work required to operationalize the model.

## Standardized Project Structure

TDSP prescribes a directory structure for all projects:

- `/docs` - Charter, data dictionaries, model reports
- `/code` - Source code for data processing, modeling, and deployment
- `/data` - Raw data, processed data, feature sets (with versioning)
- `/models` - Serialized models, model metadata
- `/outputs` - Experiment results, evaluation reports

This standardization means any team member can navigate any project. It also enables tooling that automates common tasks across projects.

## TDSP vs. CRISP-DM

CRISP-DM is a process model - it describes what phases to follow. TDSP is a methodology - it prescribes how to execute those phases in a team setting. CRISP-DM does not address team structure, project organization, or infrastructure. TDSP builds on a similar lifecycle but adds the operational scaffolding that teams need to deliver reliably.

Teams often use both: CRISP-DM's iterative mindset for the analytical work, and TDSP's structure for team coordination and production delivery.

## Limitations

TDSP was designed in the context of Microsoft's Azure ecosystem and maps most naturally to Azure ML services. The principles are platform-agnostic, but some of the prescribed tooling (Azure DevOps, Azure ML) may not apply to teams on other platforms. The framework also assumes a certain team size - solo data scientists or very small teams may find the role definitions and documentation requirements heavy for their context.
