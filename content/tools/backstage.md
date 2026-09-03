---
title: "Backstage - Open-Source Developer Portal Framework"
description: "Backstage is a CNCF-hosted, open-source framework for building internal developer portals, originally built at Spotify, that organizations assemble a portal on top of rather than run as a turnkey product."
date: 2026-09-03
categories: [Tools]
tags: ["backstage", "developer-portal", "platform-engineering", "cncf", "service-catalog", "open-source", "spotify", "plugin-architecture"]
related:
  - tools/red-hat-developer-hub
  - tools/roadie
  - guides/backstage-as-an-agent-interface
  - guides/platform-engineering-ai
  - glossary/platform-engineering
  - comparisons/backstage-vs-red-hat-developer-hub
last_updated: 2026-09-03
---

Backstage is an open-source framework for building internal developer portals (IDPs). It was built at Spotify, open-sourced on March 16, 2020, and is now hosted by the Cloud Native Computing Foundation (CNCF). Backstage's core proposition is a centralized software catalog plus a set of tools — a project scaffolder, a documentation system, and a plugin API — that engineering organizations use to build a portal tailored to their own services, infrastructure, and workflows, rather than adopt a fixed, pre-built product.

Official documentation: https://backstage.io/docs/overview/what-is-backstage/

## Key Capabilities

- **Software Catalog** - a metadata model and API for registering microservices, libraries, websites, data pipelines, ML models, APIs, and other components, each with an owner, so ownership and dependencies are queryable in one place instead of scattered across wikis and spreadsheets.
- **Software Templates (the scaffolder)** - a code-generation tool that runs parameterized templates to create new projects: it fills in a code skeleton, wires up CI, and publishes the result to a repository, giving teams a starting point that already conforms to organizational conventions.
- **TechDocs** - a "docs-like-code" documentation system that builds Markdown files kept alongside source code into a static site (via MkDocs) and surfaces it directly on a component's catalog page, rather than in a separate wiki.
- **Plugin architecture** - nearly all portal functionality, including the catalog and scaffolder UI themselves, is delivered as plugins. The official plugin directory listed 254 active plugins as of this writing, spanning CI/CD, cost visibility, security scanning, and more.
- **New backend system** - a dependency-injection-based backend architecture, introduced as alpha in Backstage v1.11 (February 2023) and later made the default, that replaced an organically-grown legacy backend. It standardizes how plugins declare dependencies and extension points; the Backstage team cited it cutting a typical backend installation from hundreds of lines of wiring code to about two dozen. Support for the legacy backend system was removed from the project in early 2025.
- **MCP Actions backend plugin** - the official `@backstage/plugin-mcp-actions-backend` plugin exposes actions registered with Backstage's (alpha-stage) Actions Registry as Model Context Protocol tools, letting an MCP client discover and invoke registered Backstage actions (such as scaffolder template runs) directly. See [Backstage as an agent interface](/guides/backstage-as-an-agent-interface/) for how this is used to drive Backstage from an agent, including the scoped-token identity model.

## Framework, Not a Product

Backstage ships as source code and npm packages you assemble into an application, not as a downloadable or hosted product. Standing up a Backstage instance means creating a frontend app and a backend app from the official templates, choosing which plugins to install, configuring a database (PostgreSQL is the supported production choice) and an identity provider, and then operating and upgrading that application yourself. This is the reason a market of productized and managed variants exists around it: teams that want catalog, scaffolder, and TechDocs functionality without building and running the underlying application choose a distribution like [Red Hat Developer Hub](/tools/red-hat-developer-hub/) (a supported, packaged Backstage) or a managed hosting service like [Roadie](/tools/roadie/), or Spotify's own commercial offering, Spotify Portal for Backstage, which reached general availability in October 2025. See [Backstage vs. Red Hat Developer Hub](/comparisons/backstage-vs-red-hat-developer-hub/) for how one such distribution differs from running upstream Backstage directly.

## Origins and History

Backstage was built internally at Spotify to address the coordination cost of a large microservices estate — discovering what services exist, who owns them, and how to create a new one that follows house conventions. Spotify open-sourced it on March 16, 2020, describing it as the company's first major open-source infrastructure platform. Spotify donated the project to the CNCF, which accepted it into the Sandbox on September 8, 2020; the project moved up to CNCF Incubating status on March 15, 2022, where it remains as of this writing (it has not reached CNCF Graduated status). Backstage is licensed under the Apache License 2.0 and is governed as a CNCF project with contributions from Spotify, Red Hat, Roadie, and other companies alongside individual maintainers.

On its fifth anniversary in April 2025, Spotify's engineering blog reported that Backstage was in use at more than 3,000 companies to build their own developer portals, and that more than 700 R&D squads at Spotify itself relied on it daily. The plugin ecosystem, initially built almost entirely by Spotify, now includes substantial community-contributed plugins alongside the small set of core plugins maintained by the Backstage team.

## Sources

1. https://backstage.io/docs/overview/what-is-backstage/
2. https://backstage.io/docs/plugins/new-backend-system/
3. https://backstage.io/blog/2023/02/15/backend-system-alpha/
4. https://www.cncf.io/projects/backstage/
5. https://github.com/backstage/backstage
6. https://engineering.atspotify.com/2025/4/celebrating-five-years-of-backstage
7. https://backstage.io/docs/ai/mcp-actions/
8. https://backstage.io/plugins/
