---
title: "Humanitec - Score Specification and Platform Orchestrator"
description: "Humanitec builds the Platform Orchestrator, a SaaS engine that turns Score workload declarations into environment-specific infrastructure on every deployment, and created Score, the CNCF Sandbox workload specification other platforms also implement."
date: 2026-09-03
categories: [Tools]
tags: ["platform-engineering", "internal-developer-platform", "score-spec", "infrastructure-orchestration", "cncf-sandbox", "dynamic-configuration-management", "kubernetes", "terraform"]
related:
  - tools/crossplane
  - tools/backstage
  - comparisons/backstage-vs-port-vs-cortex-vs-opslevel
  - guides/infrastructure-as-code-ai
  - glossary/platform-engineering
last_updated: 2026-09-03
---

Humanitec is a Berlin-based platform engineering company that builds the Platform Orchestrator, a SaaS configuration engine for internal developer platforms (IDPs), and created Score, an open-source workload specification now governed as a Cloud Native Computing Foundation (CNCF) Sandbox project. Where catalog-first IDP tools such as Port, Cortex, and OpsLevel start from a software catalog and layer provisioning workflows on top of it, Humanitec starts from the opposite end: a developer declares a workload once, in Score or another supported interface, and the Platform Orchestrator resolves that declaration against baselines the platform team defined, then generates and manages the actual infrastructure and environment configuration behind it — on every deployment, not as a one-time scaffold. The company is led by CEO Kaspar von Grünberg.

Official documentation: https://developer.humanitec.com/platform-orchestrator/docs/introduction/overview/

## Key Capabilities

- **Score** - An open-source, platform-agnostic, container-based workload specification that Humanitec created and continues to contribute to. A developer writes one `score.yaml` describing a workload and the resources it depends on; a Score implementation translates that file for a given target — Kubernetes, Docker Compose, or the Humanitec Platform Orchestrator itself.
- **Platform Orchestrator** - Humanitec's core SaaS product, described in its own docs as "the configuration engine at the center of your IDP." It sits between developer-facing interfaces (Score, CLI, Portal, Terraform) and the target infrastructure, matching each request against platform-team-defined baselines and provisioning or updating whatever the workload needs to run.
- **Dynamic Configuration Management (DCM)** - Humanitec's name for the pattern the Orchestrator implements: instead of a developer or platform team maintaining a static config file per environment, resource baselines are defined once and the concrete configuration is derived dynamically at deploy time. Humanitec documents this as a four-step "RMCD" loop: Read the workload spec and context, Match it to a configuration baseline, Create the application configuration and any infrastructure resources, Deploy the workload wired up to its dependencies.
- **Resource Definitions and Resource Graph** - Platform engineers pre-model infrastructure patterns as Resource Definitions (an S3 bucket plus its IAM role, bucket policy, service account, and pod-identity wiring, for example); the Orchestrator selects the matching definition by environment, project, and resource class. The Resource Graph is a live map of everything provisioned this way and how the pieces connect.
- **Drivers** - The Orchestrator provisions through pluggable drivers rather than reimplementing cloud clients: a built-in Terraform driver plus drivers for common databases, DNS, and Kubernetes resources. Crossplane, OpenTofu, and Pulumi are not driven natively the way Terraform is — Humanitec's own documentation states plainly that each "is not yet natively supported" and that integration "is possible via the Container Driver or a Custom Driver," positioning the Orchestrator as something that can sit above any of these tools rather than compete with them directly. See [Crossplane](/tools/crossplane/) for the alternative model of pushing infrastructure declarations through the Kubernetes API itself.
- **Humanitec Portal** - A web UI over the Orchestrator for developer self-service and platform-team resource management. Humanitec's own documentation frames this as optional and interchangeable with third-party developer portals, and publishes integrations that let [Backstage](/tools/backstage/) or Port use the Orchestrator as their backend instead.

## Score: origin, scope, and CNCF governance

Humanitec's developer documentation describes Score as "an open-source, platform-agnostic, container-based workload specification to which Humanitec is a contributor" — language that reflects a project Humanitec started but no longer solely controls. The specification exists to let a workload's runtime requirements (what it needs) be declared once, separately from how a given platform meets those needs.

- The `score-spec/spec` repository was created on GitHub on October 31, 2022, and is Apache-2.0-licensed. Humanitec's own August 2024 CNCF announcement describes Score as having "grown so much since its launch on GitHub just a short 18 months" earlier, putting the project's public launch at roughly early-to-mid 2023.
- Score was accepted as a CNCF **Sandbox** project on July 8, 2024.
- On Score's first anniversary as a CNCF project, Score maintainer Mathieu Benoit wrote that "Humanitec has played an important role for the Score project, since its creation, through the donation to the CNCF" — confirming Humanitec created Score and then donated it into CNCF governance, rather than Score starting as a multi-vendor effort from day one.
- By that same post (July 2025), 50% of Score's maintainers and 90% of its contributors were outside Humanitec. The project cites collaboration with other CNCF projects including Dapr, Backstage, Microcks, and Podman.
- The repository publishes a `GOVERNANCE.md` and `CODE_OF_CONDUCT.md`. As of September 2026 it had roughly 8,100 GitHub stars and 2,100 forks.
- Reference implementations exist for Kubernetes (`score-k8s`, which converts a Score file into Kubernetes manifests) and Docker Compose (`score-compose`, aimed at local development). Humanitec's own CLI, `humctl`, also consumes Score files natively as one path into the Platform Orchestrator.

## Infrastructure-first, not catalog-first

Humanitec's own comparison documentation is explicit that it does not compete in the same category as Backstage, Port, or Cortex: those tools are developer portals — "the interface through which developers can discover and access internal developer platform capabilities," in the Gartner framing Humanitec's blog cites — while the Platform Orchestrator is the backend that actually provisions and configures infrastructure. Humanitec documents pluggable integrations that let Backstage or Port sit in front of the Orchestrator as the UI layer, and describes the Orchestrator itself as usable with or without any developer portal at all. This is the reverse emphasis from Port, Cortex, and OpsLevel, which start from a service catalog and scorecards and add provisioning actions on top — see the [Backstage vs. Port vs. Cortex vs. OpsLevel comparison](/comparisons/backstage-vs-port-vs-cortex-vs-opslevel/) for how those three catalog-first tools differ from each other.

The Platform Orchestrator itself is a SaaS product operated by Humanitec, not something a customer self-hosts wholesale. Two components narrow that: the **Humanitec Operator** runs inside the customer's own cluster to keep secrets in the customer's chosen store and perform the final rendering step there instead of in Humanitec's SaaS backend; the **Humanitec Agent** (announced February 7, 2024) is a separate, unrelated-to-AI network component — a container that opens a secure outbound tunnel from a private network to the Platform Orchestrator so deployments can reach clusters or databases that aren't publicly reachable. Neither is an AI agent; both predate Humanitec's 2026 AI-agent-oriented marketing described below, and the naming overlap is coincidental.

## AI agents: what's actually documented, as of September 2026

Humanitec's public marketing has adopted AI-agent framing. The company's homepage states: "Humanitec lets AI agents provision infrastructure — within the rules your platform team defines. No tickets. No manual reviews. No surprises." Its Platform Orchestrator product page headlines the same idea — "Unifies infrastructure management for humans and AI agents" — under a "Stay in control" section titled "The features that let agents act — safely." The mechanisms it names for this are all pre-existing Orchestrator primitives rather than a distinct agent-specific product: automatic policy enforcement and driver/resource-class matching when a request comes in ("Agent requests a database. The Orchestrator picks the right Terraform module... No human in the loop. No wrong config."), the Resource Graph for visibility into what an agent provisioned, and drift detection. The product page's dedicated "interfaces" section names four ways users reach the Orchestrator — "Agents and AI Assistants," Portal, CLI, and Terraform — treating agents as one more persona alongside developers and pipelines rather than describing a distinct agent-only API or protocol. A separate feature blurb on the same page reinforces this: "One API for every agent, developer, and pipeline — regardless of where it's running."

Separately, and more concretely, Humanitec shipped an actual MCP (Model Context Protocol) server on January 15, 2026 (announced as "Humanitec keeps being cutting edge with MCP support"). It is a product-knowledge assistant, not an infrastructure-provisioning endpoint: it exposes the same documentation Q&A assistant available in Humanitec's docs (powered by kapa.ai) to coding tools such as Cursor, VS Code, Claude Code, Cline, and ChatGPT Desktop, so an engineer (or their AI pair-programming tool) can ask Orchestrator product questions and get Score/Resource-Definition code suggestions without leaving their editor. Authentication is a Google-account sign-in used only to issue an anonymous rate-limiting ID. Deploying or provisioning anything still goes through the Orchestrator's own API, CLI, Portal, or Score interface — the MCP server does not itself provision infrastructure.

No dedicated feature announcement, blog post, or documentation page was found describing a distinct agent-identity primitive (separate from Humanitec's existing service users, RBAC, and OIDC provider), an agent-specific SDK, or a named "agentic" product comparable to what some competing IDP vendors have published. What is verifiable is marketing-level positioning of the existing governance stack (policy enforcement, Resource Graph, drift detection, RBAC) as what makes it safe to let an AI agent be one more caller of the same Orchestrator API a human or a CI pipeline would use — plus the MCP knowledge-server integration described above. Readers evaluating agent-driven infrastructure changes against a policy layer may find the general treatment in [Agent identity and authorization](/guides/agent-identity-and-authorization/) more directly useful than Humanitec's own agent-specific documentation, which as of this writing is thin relative to the marketing claim.

## Origins and History

Humanitec is headquartered in Berlin, Germany (its legal entity, Ternki GmbH, trades as Humanitec and is registered there), and led by founder and CEO Kaspar von Grünberg. Public company-data aggregators disagree on the company's exact founding year, with accounts ranging from 2014 to 2018, and Humanitec's own marketing materials do not state a specific founding date, so none is reported here. Von Grünberg has been publicly identified as CEO since at least 2018. Third-party bios sometimes also credit him as a founder of PlatformCon, an annual platform engineering conference, but as of this writing PlatformCon's own site credits "Platform Engineering and Weave Intelligence" and makes no mention of Humanitec or von Grünberg, so no current Humanitec–PlatformCon association is reported here. Humanitec has raised venture funding since at least a 2018 seed round; third-party financial aggregators report conflicting or incomplete figures for later rounds, so specific funding amounts are not reported here.

Score originated inside Humanitec as the workload-specification layer for the Platform Orchestrator before being spun out as an independently governed open-source project and donated to the CNCF, which accepted it as a Sandbox project in July 2024 — see the dedicated section above for the sourced detail on that transition.

## Sources

1. https://developer.humanitec.com/platform-orchestrator/docs/introduction/overview/ (Platform Orchestrator description, "contributor" wording for Score)
2. https://humanitec.com/ (homepage AI-agent positioning)
3. https://humanitec.com/products/platform-orchestrator (product-page AI-agent feature claims)
4. https://developer.humanitec.com/platform-orchestrator/docs/platform-orchestrator/mcp-knowledge-server/ (MCP knowledge server setup and scope)
5. https://humanitec.com/blog/feature-announcement-mcp-knowledge-server (MCP server launch, dated January 15, 2026)
6. https://score.dev/blog/celebrating-1-year-as-cncf-sandbox/ (Score governance stats, "since its creation" donation quote, CNCF collaborations)
7. https://www.cncf.io/blog/2024/08/08/score-accepted-as-a-cncf-sandbox-project/ (CNCF Sandbox acceptance date, reference implementations, named contributors)
8. https://github.com/score-spec/spec (repository creation date, license, star/fork counts, governance files)
9. https://humanitec.com/blog/generate-a-complex-resource-estate-from-three-lines-of-code (worked example of Score-to-infrastructure expansion)
10. https://humanitec.com/blog/humanitec-vs-backstage-friends-or-foes (RMCD execution pattern, portal-vs-orchestrator distinction)
11. https://humanitec.com/blog/feature-announcement-the-humanitec-agent (Humanitec Agent network-bridge feature, dated February 7, 2024)
12. https://developer.humanitec.com/platform-orchestrator/docs/humanitec-vs-others/terraform-crossplane-pulumi-etc./ (driver-based relationship to Terraform, Crossplane, OpenTofu, Pulumi — confirms only Terraform is natively driven)
13. https://humanitec.com/imprint (legal entity Ternki GmbH, registered address in Berlin, Germany)
14. https://platformcon.com/ (current organizer credit, "Powered by Platform Engineering and Weave Intelligence," no Humanitec mention)
