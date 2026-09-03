---
title: "Backstage vs Red Hat Developer Hub - Build It or Buy the Support Contract"
description: "Backstage and Red Hat Developer Hub are the same software underneath — RHDH is a curated, commercially supported distribution of upstream Backstage. The decision is whether you have, or want to build, the in-house platform engineering capacity to run and upgrade Backstage yourself, or would rather pay a subscription for a vendor to do it with an SLA behind it."
date: 2026-09-03
last_verified: 2026-09-03
categories: [Comparisons]
tags: ["backstage", "red-hat-developer-hub", "platform-engineering", "developer-portal", "build-vs-buy", "open-source", "internal-developer-platform", "openshift"]
tools: [backstage, red-hat-developer-hub]
last_updated: 2026-09-03
lastmod: 2026-09-03
related:
  - tools/backstage
  - tools/red-hat-developer-hub
  - comparisons/managed-vs-self-hosted-developer-platforms
  - comparisons/backstage-vs-port-vs-cortex-vs-opslevel
  - guides/platform-engineering-ai
  - glossary/platform-engineering
---

Red Hat Developer Hub (RHDH) is not a competitor to Backstage — it is Backstage, repackaged. Every RHDH installation runs the open-source Backstage framework underneath, tracking a specific upstream version (RHDH 1.9, shipped March 2026, runs on Backstage 1.45.3). So this is not a features comparison; a feature you find in one is, with enough engineering time, buildable in the other. It is a build-vs-buy decision about who carries the operational weight of running a Node.js application, its plugin ecosystem, and its upgrade cadence: your own platform team, or Red Hat, under a subscription with a support SLA attached. The honest question to ask first is not "which has more features" but "do we have, or want to build, the in-house capability to be Backstage's maintainer" — because that is the job either way; the only variable is who's employed to do it.

## What each one actually is

**Backstage** is a CNCF Incubating open-source project, originally built at Spotify and open-sourced on March 16, 2020. It ships as source code and npm packages — a frontend app, a backend app, a plugin API, a software catalog, a scaffolder, and TechDocs — that an adopter assembles, configures, and operates themselves. There is no vendor, no support contract, and no SLA; the CNCF governs the project, not any single company's roadmap. See [Backstage](/tools/backstage/) for the full framework breakdown.

**Red Hat Developer Hub** is Red Hat's commercially supported product built on that same framework. Red Hat announced general availability on January 16, 2024. It adds dynamic plugin management (install, update, or remove plugins through configuration, without rebuilding the application image), an enterprise RBAC plugin, a three-tier plugin catalog (Red Hat-supported, partner-Certified, and best-effort Community), integrations with the rest of the Red Hat product line (OpenShift, OpenShift GitOps, OpenShift Pipelines, Ansible Automation Platform, Quay), and a published support lifecycle policy. The underlying `redhat-developer/rhdh` repository is itself open source under Apache-2.0; what a subscription buys is the packaging, the curation, and the phone number to call. See [Red Hat Developer Hub](/tools/red-hat-developer-hub/) for the full breakdown.

## What RHDH actually adds, precisely

Stripped of positioning language, the concrete deltas over running upstream Backstage yourself are:

- **Dynamic plugins.** Vanilla Backstage plugins are compiled into the application at build time — adding or removing one normally means a rebuild and redeploy. RHDH's dynamic plugin system loads plugins at runtime from configuration, so a plugin change is a config edit and a restart, not a release.
- **An RBAC plugin.** Backstage's own permission framework exists but ships with no admin UI or role model out of the box; RHDH's RBAC plugin adds fine-grained, role-based control over who can view or act on catalog entities, templates, and plugin actions, plus audit logging.
- **A tiered, curated plugin catalog** instead of the open community plugin directory. Red Hat-supported plugins are covered directly by the subscription; Certified plugins (from partners like Dynatrace and IBM API Connect) are tested for RHDH compatibility and supported by the partner; everything else is Community, best-effort. This trades the breadth of Backstage's 250+ community plugins for a smaller set Red Hat will actually field a support ticket about.
- **Red Hat product integrations.** Bundled and certified plugins connect the catalog and scaffolder to OpenShift, OpenShift GitOps (Argo CD), OpenShift Pipelines (Tekton), Quay, and — via a separate set of Ansible plug-ins Red Hat announced in mid-2024 — Ansible Automation Platform: push-button scaffolding for new Ansible repositories, lint pipelines, and links into Automation Hub and Automation Controller from inside the portal. This integration only pays off if you're already running those Red Hat products; it's not a reason on its own to adopt RHDH.
- **A support lifecycle policy and SLA.** Red Hat publishes a formal Full Support / Maintenance Support phase policy per minor release, with security and bug-fix advisories. Upstream Backstage, as a CNCF project, has none of that by design — fixes land when a maintainer or contributor gets to them.
- **Multi-platform deployment, not just OpenShift.** Despite the OpenShift-centric marketing, RHDH ships an Operator and a Helm chart and is documented for installation on OpenShift as well as Amazon EKS, Google GKE, and Azure AKS.

What it does not add: new capability that isn't achievable in upstream Backstage with enough engineering effort. Everything on this list is operational convenience and support, not a data model or feature ceiling Backstage lacks.

## The comparison

| | Backstage (self-hosted) | Red Hat Developer Hub |
|---|---|---|
| License / cost model | Open source (Apache-2.0), free; you pay in engineering time | Apache-2.0 codebase, but sold as a paid annual subscription |
| Governance | CNCF Incubating project; no vendor roadmap | Red Hat's product roadmap, tracking upstream Backstage with a lag |
| Plugin installation | Compiled into the app; adding a plugin means a rebuild/redeploy | Dynamic plugins: install/update/remove via config, no rebuild |
| Plugin support | Community-maintained; 250+ plugins, no support guarantee | Tiered: Red Hat-supported, partner-Certified, or Community |
| RBAC | Permission framework exists; no admin UI or role model shipped | Dedicated RBAC plugin with roles, fine-grained permissions, audit log |
| Red Hat ecosystem integration | Build it yourself against OpenShift, Argo CD, Tekton, Ansible APIs | Bundled/certified plugins for OpenShift, GitOps, Pipelines, Quay, Ansible AAP |
| Deployment targets | Anywhere you can run the Backstage app and a Postgres database | Operator or Helm chart; documented for OpenShift, EKS, GKE, AKS |
| Support / SLA | None — GitHub issues, Discord, community | Formal support lifecycle policy; security/bug-fix advisories |
| Upgrade cadence you're exposed to | Whatever Backstage releases upstream (roughly monthly minors) | RHDH's own release train (roughly monthly-to-bimonthly), one or more Backstage versions behind current upstream |
| Typical operating headcount | Reported at 3 FTEs in year one, 2 FTEs ongoing, by teams satisfied with self-hosting (vendor-sourced figure, see caveat below) | Reduced — Red Hat maintains the distribution; you still run the cluster it deploys to |
| Data / infrastructure control | Full — catalog and any derived data stay on infrastructure you control | Full if self-hosted on your own cluster; support diagnostics may involve sharing data with Red Hat |
| Exit cost if you leave | N/A — you already own the deployment | Migrating off means either adopting upstream Backstage directly or another distribution; the underlying data model doesn't change, so this is lower-friction than most vendor lock-in |

## The real cost of self-hosting

The number most often cited for what it takes to run Backstage yourself comes from Roadie, a company that sells managed Backstage hosting — so read it as a vendor's framing of the problem it solves, not an independent benchmark. Roadie's own published estimate: organizations "satisfied with their self-hosted setup" typically dedicate 3 to 12 full-time engineers to the platform — 3 FTEs to build and launch in year one, dropping to 2 FTEs for ongoing maintenance — and typically need 6 to 12 months to reach production. Using Roadie's own assumption of a $125,000 fully-loaded cost per senior platform engineer, that works out to roughly $762,000 in total year-one cost and $512,000/year ongoing. Treat the headcount range, not the exact dollar figure, as the useful signal — it says Backstage is not a weekend install for a small platform team, regardless of which vendor is telling you that.

What that headcount actually buys is upgrade discipline. Backstage's release notes document a steady stream of breaking changes to backend and plugin APIs as the framework matures past 1.0 — most visibly the removal of the legacy backend system's startup mechanism, a change the project itself lists among its 2025 milestones. None of that is unusual for an actively developed framework — it is the normal cost of staying current with any fast-moving open-source project. What's unusual is how invisible falling behind can be: a portal can keep serving traffic for a long time after it has quietly stopped being buildable, because nothing forces the two facts to be compared unless something is checking. RHDH's subscription is, in large part, a way to buy out of being the team responsible for noticing that drift.

## Pricing and licensing

Red Hat does not publish public list pricing for Developer Hub; it is sold as a subscription negotiated through Red Hat or a reseller. The one concrete data point available is third-party reseller pricing: CDW lists a Developer Hub "Premium" subscription, 10 users, 1 year, at $6,027.99 — roughly $603 per user per year at that tier — which is a single observed reseller price, not Red Hat's official rate card, and should be treated accordingly. Backstage itself carries no license fee; its Apache-2.0 license imposes no cost to run, modify, or redistribute it. The cost of self-hosting is entirely the engineering time described above, plus infrastructure (a Postgres database and whatever compute the application and its plugins need).

## Decision framework

**Use self-hosted Backstage when:**
- You already run, or are building, a platform engineering team with the headcount to absorb 3+ FTEs in year one and sustain 2+ FTEs afterward.
- Your catalog needs to feed something no curated distribution's plugin set covers yet — a bespoke plugin, an unusual data pipeline, deep integration with internal systems Red Hat has no certified plugin for.
- You want zero recurring license cost and are comfortable that the tradeoff is 100% of the upgrade and support burden landing on your own team.
- You're not running OpenShift or Ansible Automation Platform, so RHDH's flagship integrations wouldn't pay off anyway.

**Use Red Hat Developer Hub when:**
- You want the Backstage data model and plugin ecosystem without carrying the build, upgrade, and plugin-compatibility burden yourself.
- You need a support contract with an SLA behind it — a community Discord and GitHub issues aren't an acceptable answer when the portal breaks in production.
- You're already running OpenShift, OpenShift GitOps/Pipelines, or Ansible Automation Platform, so the certified integrations save real integration work rather than adding overhead for platforms you don't use.
- A prior self-hosted attempt stalled on maintenance burden specifically, not on the data model — the fix is who operates it, not switching to a different product category (see [managed vs self-hosted developer platforms](/comparisons/managed-vs-self-hosted-developer-platforms/) for the full spectrum, including non-Red-Hat managed options).

## Further reading

- [Managed vs self-hosted developer platforms](/comparisons/managed-vs-self-hosted-developer-platforms/): the broader spectrum this pairwise choice sits inside, including managed hosting and non-Backstage SaaS options
- [Backstage vs Port vs Cortex vs OpsLevel](/comparisons/backstage-vs-port-vs-cortex-vs-opslevel/): how Backstage (and by extension RHDH) compares to catalog products built outside the Backstage ecosystem entirely
- [Platform engineering for AI teams](/guides/platform-engineering-ai/): what to build in an internal developer platform once AI agents are consumers of it, not just humans
- [Backstage as an agent interface](/guides/backstage-as-an-agent-interface/): the token and MCP Actions mechanics for driving either Backstage or RHDH from an agent
- [Cloud exit costs and data gravity](/guides/cloud-exit-costs-and-data-gravity/): the general economics of vendor lock-in, relevant to weighing a RHDH subscription against staying on upstream

## Sources

1. Red Hat, "Red Hat Developer Hub Now Generally Available" (press release, GA date, RBAC, dynamic plugins, OpenShift integration): [https://www.redhat.com/en/about/press-releases/red-hat-developer-hub-now-generally-available](https://www.redhat.com/en/about/press-releases/red-hat-developer-hub-now-generally-available)
2. Red Hat Developer, "Red Hat Developer Hub" product page (positioning vs community Backstage, RBAC, verified plugin catalog): [https://developers.redhat.com/products/rhdh](https://developers.redhat.com/products/rhdh)
3. Red Hat Developer, "Red Hat Developer Hub simplifies Backstage plug-in management" (dynamic plugins, static-vs-dynamic plugin loading): [https://developers.redhat.com/blog/2025/01/17/red-hat-developer-hub-simplifies-backstage-plug-management](https://developers.redhat.com/blog/2025/01/17/red-hat-developer-hub-simplifies-backstage-plug-management)
4. Red Hat Developer, "RHDH Plugins" catalog page (the three plugin tiers — Red Hat-supported, partner-Certified including Dynatrace and IBM API Connect, and Community): [https://developers.redhat.com/rhdh/plugins](https://developers.redhat.com/rhdh/plugins)
5. Red Hat Developer, "What's new in Red Hat Developer Hub 1.9?" (built on Backstage 1.45.3, release cadence): [https://developers.redhat.com/blog/2026/03/13/whats-new-red-hat-developer-hub-19](https://developers.redhat.com/blog/2026/03/13/whats-new-red-hat-developer-hub-19)
6. Red Hat Customer Portal, Developer Hub update and support lifecycle policy: [https://access.redhat.com/support/policy/updates/developerhub](https://access.redhat.com/support/policy/updates/developerhub)
7. Red Hat, "Introducing Ansible plug-ins for Red Hat Developer Hub" (Automation Hub/Controller links, content scaffolding; a 2024 technical-preview announcement, not a full feature spec): [https://www.redhat.com/en/blog/introducing-ansible-plug-ins-red-hat-developer-hub](https://www.redhat.com/en/blog/introducing-ansible-plug-ins-red-hat-developer-hub)
8. GitHub, `redhat-developer/rhdh` repository (Apache-2.0 license): [https://github.com/redhat-developer/rhdh](https://github.com/redhat-developer/rhdh)
9. GitHub, `redhat-developer/rhdh-plugin-certification` (plugin certification pipeline): [https://github.com/redhat-developer/rhdh-plugin-certification](https://github.com/redhat-developer/rhdh-plugin-certification)
10. Cloud Native Computing Foundation, "Backstage" project page (CNCF acceptance September 8, 2020, and Incubating-status March 15, 2022, dates): [https://www.cncf.io/projects/backstage/](https://www.cncf.io/projects/backstage/)
11. Backstage.io, "Backstage Wrapped 2025" (adopter/contributor/plugin counts, legacy backend system removal as a 2025 milestone): [https://backstage.io/blog/2025/12/30/backstage-wrapped-2025/](https://backstage.io/blog/2025/12/30/backstage-wrapped-2025/)
12. GitHub, `backstage/backstage` repository (Apache-2.0 license): [https://github.com/backstage/backstage](https://github.com/backstage/backstage)
13. Roadie, "Backstage: How much does it really cost?" (self-hosted headcount and cost figures; Roadie is a vendor of the managed alternative, so treat these figures as vendor-sourced, not an independent benchmark): [https://roadie.io/blog/backstage-how-much-does-it-really-cost/](https://roadie.io/blog/backstage-how-much-does-it-really-cost/)
14. CDW, "Red Hat Developer Hub - premium subscription (1 year) - 10 users" product listing (third-party reseller price point; Red Hat does not publish public list pricing, so treat as one observed data point, not an official rate card): [https://www.cdw.com/product/red-hat-developer-hub-premium-subscription-1-year-10-users/7891791](https://www.cdw.com/product/red-hat-developer-hub-premium-subscription-1-year-10-users/7891791)
15. Spotify Engineering, "Celebrating Five Years of Backstage" (open-source date, March 16, 2020): [https://engineering.atspotify.com/2025/4/celebrating-five-years-of-backstage](https://engineering.atspotify.com/2025/4/celebrating-five-years-of-backstage)
