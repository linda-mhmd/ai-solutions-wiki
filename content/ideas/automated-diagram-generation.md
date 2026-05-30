---
title: "AI-Generated Architecture Diagrams from Code"
description: "Automatically generate and update architecture diagrams by having AI analyze codebases, infrastructure-as-code, and service dependencies."
date: 2026-03-28
categories: [Ideas]
tags: [architecture, diagrams, visualization, developer-tools, daily-ai-spark]
last_updated: 2026-05-30
---

Architecture diagrams are outdated within weeks of being drawn. Nobody updates them because it means opening a diagramming tool, remembering the current state of the system, and manually adjusting boxes and arrows. Meanwhile, the actual architecture is fully described in code - service definitions, infrastructure-as-code, API calls between services, and database schemas.

## The AI Approach

An LLM reads your codebase, Terraform/CloudFormation files, Docker Compose files, and service-to-service API calls to generate architecture diagrams in a text-based format like Mermaid, PlantUML, or D2.

## Three-Step Build

1. **Extract structure** - Parse infrastructure-as-code for deployed services, databases, and queues. Scan application code for HTTP client calls, message queue producers/consumers, and database connections to map dependencies.
2. **Generate diagram code** - Feed the extracted structure to an LLM with a prompt that produces a Mermaid or PlantUML diagram. Instruct it to group services by domain, show data flows, and highlight external dependencies.
3. **Render and publish** - Convert the text-based diagram to an image and embed it in your documentation wiki or README. Re-run on each merge to main.

## Where It Breaks

Complex systems with hundreds of services produce unreadable diagrams. The AI needs guidance on abstraction level - show me the system context, not every microservice. Dynamic service discovery and runtime routing are invisible in code.

## The Production Path

Generate diagrams at multiple abstraction levels: system context, container, and component (following the C4 model). Run as a CI job that updates diagrams on merge. Add a diff view that highlights what changed since the last version, making architecture evolution visible over time.
