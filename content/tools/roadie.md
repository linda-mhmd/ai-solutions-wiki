---
title: "Roadie - Managed Backstage Hosting"
description: "Roadie is a commercial SaaS product that hosts and operates a Backstage instance for a customer, adding its own plugins, a scaffolder-actions directory, and AI-agent context tooling on top of the open-source framework."
date: 2026-09-03
categories: [Tools]
tags: ["backstage", "managed-backstage", "developer-portal", "platform-engineering", "saas", "scaffolder", "mcp-server"]
related:
  - tools/backstage
  - tools/red-hat-developer-hub
  - comparisons/managed-vs-self-hosted-developer-platforms
  - comparisons/backstage-vs-red-hat-developer-hub
  - guides/backstage-as-an-agent-interface
  - guides/catalog-as-agent-context
last_updated: 2026-09-03
---

Roadie is a commercial SaaS product, built by Dublin-based Roadie (roadie.io), that runs [Backstage](/tools/backstage/) as a hosted service: the company operates the Backstage backend, database, and upgrade cycle for a customer, so the customer gets a working developer portal without standing up and maintaining the underlying application. Roadie was founded in 2020, close to when Spotify open-sourced Backstage, and its business is built entirely around that one open-source framework rather than a separate product of its own design.

Official documentation: https://roadie.io/docs/

## Key Capabilities

- **Hosted Backstage instance** - Roadie provisions, runs, and automatically upgrades a production Backstage deployment (frontend, backend, and database) on the customer's behalf, keeping it current with upstream Backstage releases rather than requiring the customer to manage that upgrade cycle itself.
- **RoadieHQ plugin set** - Roadie publishes and maintains a collection of Backstage plugins under the `RoadieHQ` GitHub organization (AWS, ArgoCD, Jira, Datadog, GitHub Insights, Security Insights, and others), licensed under the Apache License 2.0 and usable in both Roadie-hosted and self-hosted Backstage instances. Roadie's own pricing page describes its Teams plan as including "75+ open-source plugins."
- **Scaffolder Actions Directory** - a public, browsable catalog at roadie.io/backstage/scaffolder-actions/ documenting Backstage scaffolder actions with their inputs, outputs, and source package — spanning actions from Backstage core (e.g. `@backstage/plugin-scaffolder-backend-module-github`), the wider community, and Roadie's own modules, not only Roadie's own actions.
- **Self-hosted custom actions** - customers can run their own custom scaffolder actions from within Roadie-hosted templates using Roadie's published "Roadie Agent" JavaScript/TypeScript library, without needing to fork or redeploy the backend Roadie operates.
- **Tech Insights and Scorecards** - a software-maturity and compliance-scoring feature (an evolution of Backstage's Tech Insights concept) for measuring catalog entities against organization-defined checks; listed as an optional paid add-on on Roadie's pricing page.
- **AI-agent context tooling** - as of this writing, Roadie markets RAG-based AI search and Model Context Protocol (MCP) server access bundled into its Teams plan, plus a separate "Enterprise Context" product line that exposes a continuously updated software graph, drawn from the same catalog and integrations, to coding agents via MCP servers and a REST API.

## Managed Backstage vs. Self-Hosted Backstage vs. Spotify Portal

Backstage itself ships as source code and libraries, not a deployable product: running it means building, hosting, and upgrading a Backstage application yourself. Roadie sits in the "managed Backstage" category that exists specifically to remove that operational burden — the customer still gets the standard Backstage catalog, scaffolder, TechDocs, and plugin API, but Roadie runs the hosting, database, and upgrade path. A third-party comparison of Backstage alternatives summarized Roadie as providing "the same UI and plugin ecosystem without running the hosting, upgrades, or plugin compatibility yourself," while noting it "fixes the operational problem, not the architectural one" — teams still work inside Backstage's data model and plugin boundaries, just without operating the infrastructure.

Roadie is not the only vendor in that managed-Backstage category. Spotify itself sells a competing hosted offering, Spotify Portal for Backstage, built by Backstage's original authors and reaching general availability in October 2025. [Red Hat Developer Hub](/tools/red-hat-developer-hub/) is a related but distinct model: a supported, self-hosted (or Red Hat-managed) product distribution of Backstage rather than a third-party SaaS layered on top of it. Roadie, Spotify Portal, and Red Hat Developer Hub are all built on the same upstream Backstage project and Apache 2.0 core; they differ in who operates the instance and what proprietary layer each vendor adds on top. See [managed vs. self-hosted developer platforms](/comparisons/managed-vs-self-hosted-developer-platforms/) for the fuller tradeoff.

## Origins and History

Roadie was founded in 2020 in Dublin, Ireland (registered as Larder Software Limited), and began offering Backstage as a hosted service close to the framework's open-source release that same year. CEO David Tuite previously worked at Workday, including on internal developer-platform and tooling work there, before founding Roadie.

Roadie is sometimes described as having been founded by members of Spotify's original Backstage team. That is not accurate for its CEO: David Tuite's own professional background is at Workday, not Spotify, and Roadie's current team listing does not show a Spotify affiliation for any named member of its leadership. Roadie's relationship to Backstage is as an early adopter and heavy upstream contributor to the open-source project Spotify created, rather than a case of shared founding personnel.

Roadie is widely reported as the second-largest contributor to the Backstage open-source project after Spotify itself, reflecting both its RoadieHQ plugin set and ongoing upstream contributions. According to Crunchbase, Roadie has raised at least $3.7 million in a seed round from investors including Boldstart Ventures and Firstminute Capital; the company has not publicly disclosed a larger, later-stage round as of this writing. Roadie's hosted product itself is closed-source commercial software (priced per developer per month, plus a separate custom-priced context/AI product line); only its published plugin and action modules are open source. As of this writing, Roadie's public self-serve pricing tiers (Teams and Growth) are both marked "existing subscribers only" on its pricing page, indicating new customers are onboarded through a custom, sales-led process rather than self-serve signup.

## Sources

1. https://roadie.io/pricing/
2. https://roadie.io/about/
3. https://github.com/RoadieHQ/roadie-backstage-plugins
4. https://encore.dev/articles/backstage-alternatives
5. https://boldstart.vc/companies/roadie/
6. https://tfir.io/roadie-addresses-discoverability-standardization-to-help-companies-adopt-spotifys-backstage/
7. https://sdtimes.com/softwaredev/spotify-portal-now-generally-available-and-packed-with-features-for-improving-dev-experience/
