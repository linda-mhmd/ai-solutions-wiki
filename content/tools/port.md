---
title: "Port - Catalog-First Internal Developer Portal with AI Agents"
description: "A SaaS internal developer portal built around a customizable data model, scorecards, and self-service actions, extended with AI agents that fix scorecard failures and open pull requests for team approval."
date: 2026-09-03
categories: [Tools]
tags: ["internal-developer-portal", "platform-engineering", "software-catalog", "scorecards", "ai-agents", "self-service", "golden-paths", "saas"]
related:
  - tools/backstage
  - tools/cortex
  - tools/opslevel
  - comparisons/backstage-vs-port-vs-cortex-vs-opslevel
  - comparisons/managed-vs-self-hosted-developer-platforms
last_updated: 2026-09-03
---

Port (marketed as port.io, operated by Port IO Ltd.) is a commercial internal developer portal delivered as SaaS. Its core data model is the "blueprint" — a schema, comparable to a class in object-oriented programming, that defines the properties and relations shared by every instance of a catalog type (a "Microservice" blueprint, for example, with an entity like `payment-service` as one instance of it). On top of that catalog, Port layers scorecards for standards compliance, self-service actions for provisioning and day-2 operations, and, more recently, AI agents that act on scorecard and catalog data directly. It competes with the open-source Backstage project (which organizations self-host and build on) as a hosted, configuration-driven alternative — see [Backstage](/tools/backstage/) and the [Backstage vs. Port vs. Cortex vs. OpsLevel comparison](/comparisons/backstage-vs-port-vs-cortex-vs-opslevel/).

Official documentation: https://docs.port.io/

## Key Capabilities

- **Blueprints and entities** - Blueprints are schema definitions (properties, relations) for catalog types; entities are the concrete records that hold each resource's actual data. Blueprints, relations, and entities together form Port's software catalog, and platform teams configure this data model without writing frontend code.
- **Scorecards** - Rules-based checks that grade catalog entities (services, resources) against standards such as ownership, security, or reliability, and track which entities pass or fail each rule over time.
- **Self-service actions** - Forms, backed by a chosen automation backend (webhook, GitHub workflow, GitLab pipeline, Jenkins pipeline, Azure Pipeline, etc.), that let developers trigger scaffolding, provisioning, or day-2 operations while platform engineers pre-define the guardrails — Port describes this pattern as a "golden path" reinforced through the UI and role-based access control.
- **AI agents on scorecards** - An agent can be pointed at a scorecard to read which services fail a standard, pull catalog metadata (language, framework, tier, dependencies) and ownership data for each one, write a fix, and open a pull request routed to the owning team for human review — detailed under Origins and History below.
- **Port MCP server** - A Model Context Protocol server that lets external LLM tools (Port names Claude, Cursor, and GitHub Copilot as examples) query the catalog, analyze scorecards, and create or modify blueprints, entities, actions, and automations through natural language, rather than only through Port's own UI.
- **Port Ocean** - An open-source (Apache 2.0) extensibility framework, maintained on GitHub under `port-labs/ocean`, for building data-ingestion integrations and self-service actions that connect third-party tools to Port's catalog.

## Deployment model: SaaS, not self-hosted

Port itself states it is "a cloud-native SaaS platform," and independent write-ups describe it as multi-tenant by default. There is no option to run the full Port application (catalog store, UI, workflow engine) on customer infrastructure. Two pieces are the exception:

- The **Port execution agent** ("Port Agent") is a self-hosted relay binary, distributed as a Helm chart, that lets self-service-action and workflow webhook invocations reach services inside a private network without exposing a public endpoint — Port publishes a dedicated Kafka topic per customer, and the agent polls or streams from it.
- **Port Ocean** integrations, being open source, can be run and modified by the customer.

For customers with data-residency or security requirements, Port's Enterprise tier offers "flexible deployment options including dedicated tenancy and Private Link connectivity" and, on request, single-tenant deployment — but this is a variant of the hosted SaaS, not an on-premise install. This makes Port a genuinely different procurement and operating model from Backstage: Backstage is a framework you deploy and operate yourself; Port is a vendor-run product you configure. See [Managed vs. self-hosted developer platforms](/comparisons/managed-vs-self-hosted-developer-platforms/) for the tradeoffs.

## AI agents and scorecard enforcement

Port's blog post "Enforcing engineering standards with AI agents" (by Etay Alony, published August 2026) frames the underlying problem as organizational rather than technical: "Governance, not tooling, is the bottleneck." Its proposed mechanism — which it calls an "agentic initiative" — is described in the post's own words:

> "Now you can point an AI agent at the same scorecard. It reads the standard, finds the services that fail it, writes a fix for each one, and opens a pull request routed to the team that owns the service — where a developer will approve the update."

The post explains what makes this possible without any new data source: the agent reuses the catalog and ownership model Port already maintains.

> "The scorecard defines the standard and tracks which services pass it. The catalog holds the metadata (language, framework, tier, dependencies) per service. The ownership data indicates which team gets the pull request."

Rather than one agent executing every change, the post describes the platform engineer's role as directing and approving a distributed process:

> "...an agent proposes and routes the fixes, and you govern the rollout instead of executing every step on your own."

The post lists practices it says the pattern depends on: an existing scorecard/catalog/ownership data foundation for the agent to reason over; an audit trail explaining why a given fix was chosen; a human review step for exceptions and business context that don't fit the automated fix; iterating from failed runs rather than restarting; and routing changes to owning teams in parallel instead of funneling every pull request through a central platform team.

A related Port guide, "Auto-fix services when scorecards degrade," documents one concrete implementation of this loop: an automation triggers when a service's scorecard statistics decrease (comparing before/after scorecard state on a catalog change), an AI agent is scoped to address only the specific rules that flipped from passing to failing, it creates a tracked task entity with remediation instructions, and — in Port's reference setup — GitHub Copilot generates the actual code fix and pull request, tagged with a Port task identifier so the resulting PR maps back to the originating scorecard failure. This indicates Port's own layer handles scoping, tracking, and routing the fix, while code generation itself can be delegated to a third-party coding agent such as GitHub Copilot rather than necessarily being performed by a Port-native model. The pull-request-with-human-approval structure keeps a person in the loop before any change merges, similar in spirit to the review gate described in [Agent identity and authorization](/guides/agent-identity-and-authorization/) and the ordering discipline in [Fail-early automation](/patterns/fail-early-automation/).

## Origins and History

Port was founded by Zohar Einy (CEO) and Yonatan Boguslavsky (CTO) in 2022; the company, Port IO Ltd., is based in Tel Aviv. Funding history, per Port's own announcements: a $7 million seed round in November 2022 led by TLV Partners, an $18 million Series A in September 2023 led by Team8, a $35 million Series B in October 2024 co-led by Accel and Bessemer Venture Partners (with existing investors Team8 and TLV Partners also reported as participating by third-party coverage of the round), and a $100 million Series C in December 2025 led by General Atlantic with Accel, Bessemer Venture Partners, and Team8 participating — bringing total reported funding to $158 million at an $800 million valuation. Port's own announcement of the Series B round said the company's user base had grown "eightfold" over the prior year and named GitHub, LG, and British Telecom among its customers.

Port later released Port Ocean, an Apache 2.0-licensed open-source framework (`port-labs/ocean` on GitHub) for building integrations against its catalog API, separate from the closed-source core SaaS platform. More recently, Port's own documentation has repositioned the product beyond "internal developer portal" toward an "agentic SDLC platform," introducing terms like "Context Lake" for its unified data layer and "Port AI" for a natural-language interface over the catalog — reflecting the same shift toward AI-agent workflows described above.

## Sources

1. https://www.port.io/blog/enforcing-engineering-standards-with-ai-agents (agentic initiative mechanism, direct quotes)
2. https://docs.port.io/guides/all/self-heal-scorecards-with-ai/ (auto-fix scorecard workflow, GitHub Copilot PR generation)
3. https://docs.port.io/context-lake/data-model/setup-blueprint/overview/ (blueprint/entity data model)
4. https://docs.port.io/troubleshooting/ and https://docs.port.io/actions-and-automations/setup-backend/webhook/port-execution-agent/ (Port execution agent, self-hosted component)
5. https://www.port.io/pricing (deployment tiers, dedicated tenancy/Private Link language)
6. https://www.port.io/blog/port-raises-to-build-internal-developer-portal-that-fits-any-engineering-organization (seed round: $7M, November 2022, led by TLV Partners; founding timeline; Tel Aviv dateline)
7. https://www.port.io/blog/port-raises-18m-to-grow-its-popular-open-internal-developer-portal (Series A: $18M, September 2023, led by Team8)
8. https://www.port.io/blog/port-raises-35m-for-its-end-to-end-internal-developer-portal (Series B: $35M, October 2024, co-led by Accel and Bessemer Venture Partners, customers)
9. https://siliconangle.com/2024/10/15/developer-tooling-startup-port-sails-away-35m-funding/ (third-party corroboration of Team8/TLV Partners participating in the Series B)
10. https://www.port.io/blog/port-100m-series-c (Series C: $100M, December 2025, led by General Atlantic; total funding $158M at $800M valuation)
11. https://github.com/port-labs/ocean (Port Ocean, Apache 2.0 license)
12. https://docs.port.io/agent-management/port-mcp-server/overview/ (Port MCP server)
13. https://www.port.io/legal/terms-of-service (legal entity name "Port Io Ltd", Israeli incorporation)
