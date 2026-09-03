---
title: "OpsLevel - Service Maturity and Ownership Platform"
description: "An internal developer portal SaaS product, founded in 2018 by former PagerDuty engineers, that centers its catalog on tracked service ownership and rubric-based maturity scoring."
date: 2026-09-03
categories: [Tools]
tags: ["internal-developer-portal", "service-catalog", "service-ownership", "platform-engineering", "scorecards", "mcp-server", "ai-agents"]
related:
  - tools/backstage
  - tools/port
  - tools/cortex
  - guides/platform-engineering-ai
  - glossary/platform-engineering
last_updated: 2026-09-03
---

OpsLevel is a commercial internal developer portal (IDP) built by OpsLevel Inc., founded in 2018 in Toronto by John Laban and Kenneth Rose, both former engineers at PagerDuty. Where Backstage is an open-source framework teams assemble themselves, OpsLevel is a hosted product whose service catalog is organized primarily around two linked concepts: who owns each service, and how mature that service is against a rubric of checks. The company has raised a total of roughly $20 million, including a $5 million seed round (2020, led by Vertex Ventures) and a $15 million Series A (2022, led by Threshold Ventures).

Official documentation: https://docs.opslevel.com/

## Key Capabilities

- **Rubric and Checks** - Individual, automatable pass/fail tests (a service has an owner, a README, an on-call rotation, a passing security scan) are grouped into categories such as security, reliability, and observability, and organized into ordered levels — Bronze, Silver, Gold by default. A service must pass every check at a level, and at all levels below it, to hold that level's rating; one failing Gold-tier check keeps a service capped at Silver even if every other Gold check passes.
- **Scorecards** - A more flexible, service- or team-specific companion to the Rubric, used for standards that don't fit the fixed maturity-level model — for example a one-off migration checklist or a standard that only applies to a subset of services.
- **Service Ownership** - Every catalog entry can be assigned an owning team, and OpsLevel's own materials frame ownership as inseparable from maturity: a service isn't "owned" unless someone is accountable for improving it, which is what the Rubric checks measure.
- **Campaigns** - Time-boxed, targeted initiatives that platform teams use to drive check adoption across many services and owning teams at once, rather than relying on ad hoc requests.
- **AI catalog enrichment** - OpsLevel AI scans connected repositories and integrations to detect undocumented services, flag likely duplicates or aliases, generate service descriptions, summarize API/tech docs, and suggest an owning team where one is missing.
- **Maintenance Agent** - An AI coding agent (also listed in OpsLevel's own navigation as "OpsLevel Agent") that a platform team points at a defined change (a config standardization, a framework upgrade, a deprecated-API removal) across many repositories at once. OpsLevel has also spun this capability out as a standalone product called Tidra.
- **MCP server** - A hosted Model Context Protocol server (`https://app.opslevel.com/mcp`) that exposes catalog data — components, checks, teams, repositories, systems, domains, infrastructure, actions, filters, and documentation (API & Tech Docs) — to AI assistants and IDE agents; OpsLevel's own docs state it "currently... only uses read-only access to your OpsLevel account."

### The Maintenance Agent's approval gate

OpsLevel's own product page describes the Maintenance Agent as a four-step, human-reviewed flow rather than a fire-and-forget automation: it imports connected repositories, analyzes the codebase to build a plan for a described change, generates a proposed diff per repository that a person reviews and can send back for regeneration, and only after that review opens pull requests — which teams then verify and merge through their normal process. The review step happens before any PR is opened, not after; OpsLevel's product page states the resulting PRs "include clear descriptions, pass CI, and are ready for your team to review and merge," but does not elaborate on which checks run or how "passing" is enforced beyond a target repository's own existing pipeline.

## Ownership and Maturity Model in Practice

OpsLevel describes its own methodology as four sequential phases: **Catalog** (inventory every service and its metadata), **Measure** (Checks assess current state against the Rubric), **Improve** (Campaigns drive adoption of missing checks), and **Automate** (Custom Actions and templates remove manual toil). Enforcement is largely incentive-based rather than a hard gate: OpsLevel's guidance suggests tying maturity levels to OKRs, or using a service's Rubric level to create an "express lane" in a deploy pipeline for higher-maturity services — not blocking deploys outright by default. This distinguishes it from a hard [fail-early](/patterns/fail-early-automation/) gate; the mechanism is closer to visible pressure than to an enforced policy.

## Deployment Model

OpsLevel is sold primarily as SaaS — its docs say the SaaS offering "will work best for most organizations" — but it also offers a self-hosted option, distributed and supported through Replicated, running as a Kubernetes application; OpsLevel's pricing page lists "on-prem and single tenancy options" as an Enterprise-tier feature. OpsLevel's own documentation lists a default self-hosted deployment as requiring a Kubernetes cluster with at least 24 CPU cores, 48 GB RAM, capacity for at least 25 pods, and 120 GiB of disk (less if the database is hosted externally), and notes that self-hosted operators are expected to harden their own MySQL, Postgres, Redis, and Elasticsearch instances for production and must set up their own ingress, since integrations that push data via webhook require the instance to be reachable from the internet.

## Origins and History

OpsLevel was founded in 2018 by John Laban and Kenneth Rose, both former PagerDuty engineers (their earlier careers also included Amazon and Shopify), and is headquartered in Toronto, Canada. The company's $5 million seed round closed in November 2020, led by Vertex Ventures with participation from S28 Capital, Webb Investment Network, Union Capital, and angel investors including PagerDuty's co-founders; a $15 million Series A closed in March 2022, led by Threshold Ventures with participation from Vertex Ventures, S28 Capital, Webb Investment Network, and executives from companies including eBay, PagerDuty, and Sentry. The product's early positioning centered on service ownership and production-readiness as microservice sprawl made "who owns this and is it healthy" hard to answer manually — the same problem the company's founders had seen inside PagerDuty's own incident-response practice. OpsLevel remains privately held; no acquisition or IPO has been reported as of this writing.

## Comparison to Backstage, Port, and Cortex

Unlike [Backstage](/tools/backstage/), which is an open-source framework a team runs and extends itself, OpsLevel is a closed-source, primarily SaaS product with a narrower, more opinionated data model centered on the Rubric. Relative to [Port](/tools/port/) and [Cortex](/tools/cortex/) — both of which also build IDPs around scorecards and ownership — OpsLevel's own comparison pages position it as offering more automated, pre-built catalog discovery (services detected from repositories and CI/CD without manual data modeling) versus Port's more flexible, build-your-own blueprint model, and as a lighter-weight, faster-to-deploy alternative to Cortex's more extensive enterprise integrations and engineering-intelligence features. Independent, third-party analysis placing OpsLevel precisely "between" Port and Cortex on configuration depth was not found during research for this page; that framing recurs in secondary aggregator commentary without a verifiable primary source behind it, so it is omitted here.

## Sources

1. https://betakit.com/opslevel-raises-15-million-series-a-funding-for-developer-portal/
2. https://www.opslevel.com/resources/the-opslevel-ownership-framework
3. https://www.opslevel.com/resources/how-scorecards-work-in-opslevel-a-truly-flexible-model
4. https://www.opslevel.com/ai
5. https://www.opslevel.com/use-cases/maintenance-agent
6. https://docs.opslevel.com/docs/mcp
7. https://docs.opslevel.com/docs/self-hosted
8. https://docs.opslevel.com/docs/getting-started-with-self-hosted-opslevel
9. https://docs.opslevel.com/docs/getting-started-with-rubrics
10. https://www.opslevel.com/pricing
11. https://techcrunch.com/2022/03/01/opslevel-raises-15m-to-help-developers-manage-their-microservices/
12. https://www.opslevel.com/opslevel-vs-getport
13. https://www.opslevel.com/opslevel-vs-cortex
