---
title: "Cortex - Scorecards and Engineering Operations Platform"
description: "Cortex is a commercial internal developer portal built around service scorecards and time-boxed initiatives, used to measure and drive engineering standards across an organization."
date: 2026-09-03
categories: [Tools]
tags: ["internal-developer-portal", "scorecards", "engineering-intelligence", "platform-engineering", "saas", "service-catalog", "developer-portal"]
related:
  - tools/backstage
  - tools/port
  - tools/opslevel
  - glossary/platform-engineering
  - guides/platform-engineering-ai
  - comparisons/backstage-vs-port-vs-cortex-vs-opslevel
last_updated: 2026-09-03
---

Cortex is a commercial internal developer portal (IDP) built by Cortex (cortex.io), founded in San Francisco in 2019 by Anish Dhar, Ganesh Datta, and Nikhil Unni. Its central mechanism is the **Scorecard**: a set of rules, evaluated automatically against every service or resource in a catalog, that turns engineering standards — production readiness, security posture, operational maturity — into a continuously graded, per-team score. Cortex markets itself as an "Engineering Operations Platform" for organizations that already have a service catalog problem (which team owns what, and whether it meets the org's bar) and want to close the gap between writing a standard and getting teams to actually meet it. It competes directly with [Backstage](/tools/backstage/) (the open-source project it is most often deployed instead of) and with [Port](/tools/port/) (another commercial, scorecard-centric IDP).

Note for disambiguation: this Cortex is unrelated to the CNCF's Cortex project (long-term storage for Prometheus), Palo Alto Networks' Cortex security suite, or Snowflake Cortex.

Official documentation: https://docs.cortex.io/

## Key Capabilities

- **Catalog / Context Graph** - Auto-discovered and manually-registered inventory of services, domains, resources (cloud infrastructure, APIs), and teams, with ownership attached to each entity. Cortex describes newer versions of this as the "Context Graph," and states that AI agents and skills that engineering teams ship become first-class catalog entities alongside services, tracked with their owner and which tools/APIs they call.
- **Scorecards** - Rules written either through a form builder (pre-built checks against connected integrations like GitHub, PagerDuty, Datadog) or in Cortex Query Language (CQL), a query syntax for custom, multi-source, or threshold-based logic. Scorecards run on a schedule (every 4 hours by default) and score entities in one of two modes: **level progression** (tiered ladders such as Bronze/Silver/Gold, where higher levels require passing more/stricter rules — Cortex frames this as gamification) or **point-based** (each rule carries a weighted point value, and overall score is the sum).
- **Scorecards as Code** - Scorecard definitions can be stored as YAML files in a Git repository (under `.cortex/scorecards/`) and managed through a GitOps workflow; once enabled for a scorecard, edits happen through pull requests rather than the UI, giving standards the same review/audit trail as application code.
- **Initiatives** - A layer on top of scorecards for time-boxed rollouts: pick one or more specific scorecard requirements, assign owners, and set a deadline, without having to wait for a whole scorecard level to be met. Initiatives can auto-create linked Jira issues and send Slack notifications on launch and as deadlines approach; assigned developers see prioritized, deadline-sorted action items on their Cortex homepage. Cortex positions this for migrations, security-vulnerability remediation, and tool swaps — short campaigns carved out of a longer-running standard.
- **Workflows** - Self-service templates for scaffolding new services and provisioning infrastructure, intended to make Scorecard-passing configuration (CI, ownership metadata, security baselines) the default rather than something added after the fact.
- **Eng Intelligence** - Dashboards combining DORA metrics (deployment frequency, lead time, change failure rate), cycle time, and incident trends, including a view on AI coding-tool adoption and its measured effect on those metrics.

## AI Features (verified)

Cortex's AI-related features, as documented as of September 2026, are narrower than a general-purpose agent framework and worth stating precisely rather than assuming parity with other IDPs:

- **Cortex MCP Server** - Launched July 29, 2025. A Model Context Protocol server exposing Cortex's catalog entities, Scorecards, Initiatives, and Eng Intelligence data to AI assistants through natural-language queries, so a developer can ask "are we ready to deploy this to production?" from inside an AI coding assistant instead of opening the Cortex UI. Cortex's setup docs and its open-source `cortex-mcp` client list Claude Desktop, Claude Code, Cursor, the JetBrains AI Assistant, and VS Code as supported clients (the launch blog post itself doesn't name specific clients). Cortex's docs state plainly that the server is read-only — "it only handles GET requests and cannot modify or write data" — and the launch post frames letting the assistant "step into action" as a future direction, not a shipped capability, at launch.
- **Context Graph agent cataloging** - Cortex catalogs AI agents that a team's engineers build and deploy as entities in their own right (what's deployed, which tools/APIs an agent calls, who owns it), extending the same ownership and accountability model applied to services. This is cataloging *of* agents your organization runs, not Cortex acting as an agent framework.
- **OpEx Review Agent** - An AI agent product, run on a schedule, that reads across an organization's Scorecard, Eng Intelligence, and other connected signals, surfaces risk patterns and anomalies across teams, and prepares an executive summary ahead of operational-excellence review meetings; users can ask follow-up questions during the review and get answers linked back to source data. This is an analytical/advisory agent — it produces briefings, not infrastructure changes.
- **AI Readiness and AI Governance scorecard templates** - Two separate pre-built Scorecard templates, each with Bronze/Silver/Gold levels. "AI Readiness" grades whether a service has baseline engineering practices — version control, test coverage, incident-response runbooks, audit logging — in place before adopting AI-generated code or AI-powered features. "AI Governance" is aimed at the AI/ML services engineering teams build themselves, covering secrets management, PR-review requirements, data-privacy/PII protections, model access controls, and vendor-risk assessments, with a Silver-level check requiring teams to have reviewed the MITRE ATLAS matrix. These are scorecard content, not a separate execution mechanism.

Taken together, this is a query-and-cataloging posture toward AI, plus one named advisory agent (OpEx Review Agent), rather than a documented framework for building or running autonomous agents that take actions inside the platform. Readers evaluating Cortex specifically for agent-building or agent-orchestration capability should verify current status directly against docs.cortex.io, since this is an area vendors are actively shipping into.

## Deployment Model

Cortex's primary, publicly listed offering is multi-tenant SaaS: its AWS Marketplace listing specifies "Software as a Service (SaaS)" as the delivery method, billed by number of users (a 50-user, 12-month base package is listed there at $39,000). A "Self-Managed" deployment path — with docs pages for SSO and AWS setup under `docs.cortex.io/docs/self-managed/guides/` — was live as of late March 2025, per Internet Archive snapshots of those exact URLs. As of this writing, those same URLs return 404, and no self-managed, self-hosted, or on-premises pages appear anywhere in Cortex's current documentation sitemap, so a self-hosted option does not currently appear to be part of the publicly documented product; a page disappearing from the docs site doesn't rule out the offering still existing off-docs (e.g., sold only through direct enterprise sales), so readers who need it should confirm current availability directly with Cortex. Unlike [Backstage](/tools/backstage/), which is self-hosted open source by default, Cortex's only currently documented path to production is a hosted subscription.

## Origins and History

Cortex was founded in 2019 by Anish Dhar (CEO), Ganesh Datta (CTO), and Nikhil Unni, engineers who had previously worked at companies including Uber and Twilio. Dhar has described the motivation as a problem he saw directly at Uber, where engineers tracked ownership of 200-300 microservices in spreadsheets. The company raised a seed round in May 2021, followed by a $15 million Series A later that year. It raised a $35 million Series B in May 2023, led by IVP with participation from Craft Ventures, Sequoia Capital, Tiger Global, and Y Combinator, bringing total funding to just under $53 million at that point; the company reported 400% year-over-year revenue growth and named customers including TripAdvisor, Docker, Grammarly, Unity, and SoFi. Cortex raised a $60 million Series C on September 4, 2024, led by Scale Venture Partners, with participation from Sequoia, IVP, Y Combinator, World Innovation Labs, Cross Creek, Alpha Square Group, and Stripe co-founders Patrick and John Collison. Cortex is closed-source, proprietary software.

## Sources

1. https://www.cortex.io/ (company positioning)
2. https://www.cortex.io/about-us ("Built by engineers from companies like Uber and Twilio")
3. https://docs.cortex.io/standardize/scorecards/create (form builder vs. CQL, 4-hour default evaluation, level-progression vs. point-based scoring)
4. https://docs.cortex.io/standardize/scorecards/scorecards-as-code (YAML under `.cortex/scorecards/`, GitOps workflow)
5. https://www.cortex.io/post/cortex-initiatives-when-scorecards-need-a-deadline (Initiatives, Jira/Slack integration)
6. https://www.cortex.io/products/context-graph (AI agents cataloged as first-class entities)
7. https://www.cortex.io/products/opex-review-agent (OpEx Review Agent)
8. https://www.cortex.io/post/mcp-server (MCP server launch date, data exposed, "step into action" as future direction)
9. https://docs.cortex.io/get-started/cortex-ai-assistant/mcp/configuring-cortex-mcp (supported MCP clients: Claude Desktop, Claude Code, Cursor, JetBrains AI Assistant, VS Code)
10. https://docs.cortex.io/get-started/cortex-ai-assistant/mcp/using-cortex-mcp ("The MCP is strictly read-only")
11. https://github.com/cortexapps/cortex-mcp (open-source MCP client; "tested this with Claude Desktop, and Cursor")
12. https://docs.cortex.io/guides/ai-excellence/set-benchmarks-for-ai-readiness (AI Readiness scorecard template)
13. https://docs.cortex.io/guides/ai-excellence/establish-consistent-ai-security-controls (AI Governance scorecard template, MITRE ATLAS check)
14. https://aws.amazon.com/marketplace/pp/prodview-x56oxtx647o3c (SaaS delivery method, pricing)
15. https://web.archive.org/web/20250328082027/https://docs.cortex.io/docs/self-managed/guides/sso (archived Self-Managed docs, March 2025)
16. https://techcrunch.com/2021/05/18/cortex-snags-2-25m-seed-to-build-services-catalog-for-development-teams/ (seed round, three founders, Uber/200-300-services origin story)
17. https://techcrunch.com/2021/11/18/cortex-raises-15m-series-a-to-help-development-teams-wrangle-their-microservices/ (Series A, $15M, November 2021)
18. https://techcrunch.com/2023/05/31/cortex-raises-35m-series-b-for-its-internal-developer-portal/ (Series B)
19. https://www.cortex.io/post/announcing-series-c (Series C)
20. https://www.ycombinator.com/companies/cortex (founding year 2019, San Francisco, three named founders)

## Further reading

- [Backstage](/tools/backstage/) - the open-source project Cortex most often replaces or sits beside
- [Port](/tools/port/) - the other commercial, scorecard-centric IDP Cortex is usually shortlisted against
- [OpsLevel](/tools/opslevel/) - a third scorecard/maturity-focused IDP in the same category
- [Backstage vs. Port vs. Cortex vs. OpsLevel](/comparisons/backstage-vs-port-vs-cortex-vs-opslevel/)
- [Platform engineering for AI teams](/guides/platform-engineering-ai/)
- [Platform engineering](/glossary/platform-engineering/)
