---
title: "Keycloak vs Amazon Cognito vs Azure AD B2C: Identity for Humans and Agents"
description: "A constraint-first look at self-hosted vs AWS-managed vs Azure-managed identity — including why Azure AD B2C is no longer a live option for new adopters, and what each does for machine and AI-agent identity."
date: 2026-09-04
categories: [Comparisons]
tags: ["identity", "iam", "keycloak", "amazon-cognito", "azure-ad-b2c", "authentication", "authorization", "oauth", "oidc", "agent-identity", "non-human-identity"]
tools: ["keycloak", "amazon-cognito", "azure-ad-b2c"]
related:
  - guides/constraint-driven-comparisons
  - guides/agent-identity-and-authorization
  - tools/keycloak
  - tools/amazon-cognito
  - tools/azure-ad-b2c
  - glossary/authentication-and-authorization
  - glossary/oauth
  - glossary/cloud-act
  - glossary/data-sovereignty
  - guides/software-licensing-and-vendor-lock-in
last_verified: 2026-09-04
last_updated: 2026-09-04
lastmod: 2026-09-04
---

Before comparing features, one fact has to be stated plainly because it changes which cell of this comparison is even reachable: **Azure AD B2C has not been purchasable by new customers since May 1, 2025.** Microsoft's own FAQ page states it without qualification — "Effective May 1, 2025 Azure AD B2C will no longer be available to purchase for new customers" — and steers new work toward Microsoft Entra External ID instead [1]. An organization starting a green-field identity decision in September 2026 is not choosing between three live products; it is choosing between two live products (Keycloak, Cognito) and one that already has an announced successor. That is exactly the kind of gate the [constraint-driven methodology](/guides/constraint-driven-comparisons/) says belongs at the top of a comparison, not in a footnote — so it goes there, before anything about MFA flows or pricing tiers.

This page follows that methodology: name the constraints that actually decide this choice, separate what rules an option out from what is merely a tradeoff, and only then compare features — including the machine- and agent-identity angle this wiki cares about specifically, since none of these three products was originally built with AI agents as a first-class principal.

## What each one actually is

**Keycloak** is an open-source (Apache 2.0) identity and access management server, originally built at Red Hat and donated to the CNCF in April 2023, where it remains an Incubating project as of 2026 — it has not reached Graduated status [2][3]. It implements OIDC, OAuth 2.0, and SAML 2.0, and you run it yourself: on your own servers, in your own Kubernetes cluster, or via Red Hat build of Keycloak if you already hold a qualifying Red Hat subscription. The current release line is 26.7.x (26.7.1 shipped August 5, 2026) [4].

**Amazon Cognito** is AWS's managed identity service, split into User Pools (authentication, JWT issuance) and Identity Pools (exchanging those tokens for temporary AWS credentials via STS). It is priced per monthly active user across three feature plans — Lite, Essentials, Plus — introduced in a November 2024 pricing restructure [5].

**Azure AD B2C** is Microsoft's customer-identity (CIAM) product, part of the broader Entra family, built around configurable user flows and an XML-based custom-policy engine (the Identity Experience Framework). It is the one of the three whose product status is actively in transition, detailed below.

## The constraint categories that actually decide this

**Product lifecycle / vendor roadmap.** This is the constraint that dominates every other one for B2C specifically, and it is a gate, not a score — see below.

**Regulatory and jurisdictional exposure, and trust in the operator.** Cognito and Azure AD B2C are both control planes operated by a US-headquartered company, which means both sit under the reach of the US CLOUD Act regardless of which region's data center holds the data — see [the US CLOUD Act](/glossary/cloud-act/) and [data sovereignty](/glossary/data-sovereignty/) for why region selection alone doesn't resolve this. Self-hosted Keycloak is the only one of the three where the operator of the identity control plane can be an entity of the adopter's own choosing, in a jurisdiction of the adopter's own choosing.

**Cost structure.** Cognito and B2C price per monthly active user (MAU) plus, for B2C, a premium tier — a cost that scales roughly linearly with your user base. Keycloak's direct licensing cost is zero at any user count, but its cost is compute, storage, and the engineering time to run it, which does not scale down for a small deployment the way MAU pricing does.

**Vendor lock-in and exit cost.** Keycloak's realm/client model exports as portable JSON and speaks standard OIDC/SAML, so migrating between Keycloak instances (or to another OIDC-compliant IdP) is comparatively mechanical. Cognito's User Pool configuration, Lambda triggers, and Identity Pool role mappings are AWS-specific and don't export to another provider's format. B2C's Identity Experience Framework custom policies are XML documents specific to B2C's policy engine, and Microsoft's own migration guidance now points at moving that configuration to a structurally different product (Entra External ID), not a newer version of the same one — see [software licensing and vendor lock-in](/guides/software-licensing-and-vendor-lock-in/) for how to price this concretely.

**Internal capability.** This constraint cuts against self-hosting as often as it cuts for it. Keycloak requires someone to run a clustered, patched, backed-up, highly-available service with its own database — if that capability doesn't exist or won't be funded, "we control our own identity plane" is not actually available to that team regardless of how attractive it sounds, and a managed option is the honest choice, not a compromise.

**Contractual.** Red Hat build of Keycloak, the commercial-support option for Keycloak, is not sold as a standalone product — it is bundled entitlement inside Red Hat Runtimes, Red Hat Application Foundations, or OpenShift subscriptions [6]. A team that wants paid Keycloak support without already buying into one of those platforms doesn't have a simple support contract available; it has upstream community support only.

## Gates

**Azure AD B2C is not available to a new adopter at all, full stop.** New tenant creation for organizations that were not already B2C customers before May 1, 2025 is closed. Existing B2C customers can still create new tenants inside their existing arrangement, using B2C Premium P1 (P2 was discontinued March 15, 2026 and existing P2 tenants were automatically moved to P1 billing) [1]. Microsoft has committed to supporting existing B2C tenants "until at least May 2030" [1], so this is not an immediate shutdown for an organization already running it — but for anyone evaluating this comparison fresh in 2026, B2C is not a cell in the decision table. The live Microsoft-managed CIAM option is Microsoft Entra External ID, a related but distinct product with its own pricing and policy model, generally available since 2024 [7].

**A hard jurisdictional-control requirement rules out both managed options.** If the actual requirement is "no US-headquartered entity can be technically capable of accessing this identity data or being compelled to produce it" (a trust/legal-control constraint, distinct from where a data center physically sits), neither Cognito nor Azure AD B2C — nor its successor — can satisfy that, because AWS and Microsoft are both subject to the CLOUD Act as US companies. Self-hosted Keycloak, deployed on infrastructure and by an operator outside that reach, is the only one of the three that can.

**Absent operational capacity to run a stateful clustered service, self-hosted Keycloak is off the table regardless of its other merits.** This is the internal-capability gate working in the opposite direction from the two above: a team with no one to own database failover, patch cadence, and capacity planning for an IAM system that, if it goes down, takes every application's login down with it, should not treat self-hosting as the sovereign, disciplined choice. It is trading a vendor-dependency risk for a single-point-of-failure-expertise risk, and only one of those is visible on day one.

## Tradeoffs

### Cost at scale

| | Keycloak | Amazon Cognito | Azure AD B2C |
|---|---|---|---|
| Pricing model | Infrastructure + ops cost, no per-user fee | Per-MAU, by feature plan [5] | Per-MAU (P1), premium add-ons |
| Cheapest human-auth tier | N/A (self-hosted) | Lite: $0.0055/MAU (first tier above free), $0.0046/MAU above 100k [5] | P1, MAU-priced, no new tenants for new customers [1] |
| Cost curve vs. user count | Roughly flat (dominated by infra, not users) | Linear with MAU | Linear with MAU |
| M2M / agent token cost | No metered fee (self-hosted compute only) | $0.00225 per successful client-credentials token response, no free tier [8] | Client-credentials support is in **public preview** on B2C itself [9]; the successor (Entra External ID) prices M2M via a separate Premium add-on, $0.001 per token from Nov 1, 2025 [10] |

AWS removed Cognito's separate $6/month-per-app-client M2M fee entirely in November 2025, leaving only the per-token charge — a change specifically aimed at making machine-to-machine authentication cheaper to scale [11]. That is a directly relevant fact for a reader pricing out an agent fleet, each with its own client-credentials client.

### Machine, service, and agent identity — the angle this wiki cares about most

None of these three products was designed with an AI agent as the primary principal, and each has arrived at machine identity from a different direction, which matters for how you'll wire an agent's authority into it. See [agent identity and authorization](/guides/agent-identity-and-authorization/) for the underlying design rules (per-agent client IDs, short-lived scoped tokens, intersection not union of permissions) this section assumes.

**Keycloak** treats machine identity as a first-class, mature feature: any client can have a "service account" enabled, which is a standing identity that authenticates via the standard OAuth 2.0 client-credentials grant and can be assigned its own roles independent of any human user [12]. As of Keycloak 26.2 (May 2025), Keycloak also ships an officially supported implementation of RFC 8693 standard token exchange, letting one client swap its token for a differently-scoped token issued to another client within the same realm — a primitive directly useful for an agent-to-tool or agent-to-agent hop that needs to narrow permissions rather than forward its own token wholesale [13].

**Cognito** supports client-credentials M2M tokens starting at its lowest (Lite) feature plan, priced as above, and issues the same RS256 JWTs whether the caller is a human User Pool session or an M2M client [5]. On AWS's agent-specific side, Amazon Bedrock AgentCore Identity is a separate, newer service purpose-built for agent workload identity — it functions as its own registry for agent workload identities — a role AWS's docs describe as complementary to, and commentators have compared to, a Cognito User Pool but scoped to agents — and is designed to sit in front of an existing IdP, including Cognito, Okta, or Microsoft Entra ID, rather than replace it [14]. That means the realistic AWS-native pattern for agent identity in 2026 is Cognito (or another IdP) plus AgentCore Identity, not Cognito alone.

**Azure AD B2C's own client-credentials support is explicitly marked "This feature is in public preview"** in Microsoft's current documentation for the flow [9] — a materially different maturity signal than Keycloak's or Cognito's GA support for the same grant type. Microsoft's actual 2026 investment in agent identity is happening in a different product entirely: Microsoft Entra Agent ID, generally available as of the version documented May 1, 2026, which is built on Microsoft Entra ID (the workforce-tenant product) rather than on B2C or its CIAM successor, and ships purpose-built constructs — agent identity "blueprints," Conditional Access policies scoped to autonomous vs. on-behalf-of agents, and documented integration patterns for securing non-Microsoft agents including Amazon Bedrock agents [15]. In other words: the interesting Microsoft agent-identity work is real and current, but it lives outside the B2C lineage this comparison is otherwise about.

### Standards depth and extensibility

Keycloak's Identity Experience Framework equivalent — its Service Provider Interface (SPI) — lets you write custom authenticators, user storage providers, and protocol mappers in Java and load them into the server, which is a materially different extensibility model than a hosted product's configuration surface: it is code you own and can audit, not a vendor's black box. B2C's custom policies (XML-based user journeys) reach comparable depth for identity-flow customization but are specific to B2C's policy engine and, per the gate above, are not the product Microsoft is actively investing in. Cognito's extensibility model is Lambda triggers at fixed lifecycle hook points (pre-signup, pre-token-generation, and similar) — narrower than either alternative, but simpler to reason about and to keep inside AWS's own IAM and audit tooling.

## What this comparison cannot resolve

Several things here are genuinely organization-specific and this page cannot settle them:

- **The real all-in cost of self-hosting Keycloak** depends entirely on a team's existing Kubernetes/Postgres operating maturity — a team already running stateful services at scale might find this near-zero marginal cost; a team starting from nothing will not.
- **Whether a specific regulator or customer security questionnaire treats "hosted by a US company, EU region" as sufficient** is a legal question specific to the contract and the regulator, not something a product comparison can answer — get that read by counsel, not inferred from a vendor's compliance page.
- **The actual migration cost from an existing Azure AD B2C tenant to Entra External ID**, for a reader already on B2C, is not addressed here — Microsoft's own migration documentation should be the starting point, and the answer will vary enormously with how much custom-policy logic is in play.
- **Whether Bedrock AgentCore Identity or Microsoft Entra Agent ID actually fits a specific agent architecture** is a design question this page raises but does not resolve — both are new enough (2025–2026) that public case studies at scale are thin.

## Further reading

- [Constraint-driven comparisons](/guides/constraint-driven-comparisons/): the methodology behind this page's structure.
- [Agent identity and authorization](/guides/agent-identity-and-authorization/): the design rules for scoping and attributing what an agent does, referenced throughout the machine-identity section above.
- [Keycloak](/tools/keycloak/), [Amazon Cognito](/tools/amazon-cognito/), [Azure AD B2C](/tools/azure-ad-b2c/): the dedicated tool pages this comparison draws on.
- [Authentication and authorization](/glossary/authentication-and-authorization/) and [OAuth](/glossary/oauth/): the underlying vocabulary.
- [The US CLOUD Act](/glossary/cloud-act/) and [data sovereignty](/glossary/data-sovereignty/): the trust/jurisdiction constraint applied above.
- [Software licensing and vendor lock-in](/guides/software-licensing-and-vendor-lock-in/): how to price the exit-cost constraint concretely for any of the three.

## Sources

1. Microsoft Learn, "Frequently asked questions (FAQ) for Azure Active Directory B2C" — end-of-sale date, P1/P2 status, and the "until at least May 2030" support commitment: [https://learn.microsoft.com/en-us/azure/active-directory-b2c/faq](https://learn.microsoft.com/en-us/azure/active-directory-b2c/faq)
2. CNCF, "Keycloak joins CNCF as an incubating project" (April 2023): [https://www.cncf.io/blog/2023/04/11/keycloak-joins-cncf-as-an-incubating-project/](https://www.cncf.io/blog/2023/04/11/keycloak-joins-cncf-as-an-incubating-project/)
3. CNCF, Keycloak project page (maturity level): [https://www.cncf.io/projects/keycloak/](https://www.cncf.io/projects/keycloak/)
4. Keycloak, "Keycloak 26.7.1 released" (August 5, 2026): [https://www.keycloak.org/2026/08/keycloak-2671-released](https://www.keycloak.org/2026/08/keycloak-2671-released)
5. AWS, "Amazon Cognito pricing" (Lite/Essentials/Plus feature-plan MAU pricing): [https://aws.amazon.com/cognito/pricing/](https://aws.amazon.com/cognito/pricing/)
6. Red Hat, "Subscriptions or Entitlements Requirements for Red Hat build of Keycloak": [https://access.redhat.com/articles/7044244](https://access.redhat.com/articles/7044244)
7. Microsoft Learn, "External Tenant Overview - Microsoft Entra External ID": [https://learn.microsoft.com/en-us/entra/external-id/customers/overview-customers-ciam](https://learn.microsoft.com/en-us/entra/external-id/customers/overview-customers-ciam)
8. AWS, "Amazon Cognito pricing" — machine-to-machine token-response pricing: [https://aws.amazon.com/cognito/pricing/](https://aws.amazon.com/cognito/pricing/)
9. Microsoft Learn, "Set up OAuth 2.0 client credentials flow - Azure AD B2C" — marked public preview: [https://learn.microsoft.com/en-us/azure/active-directory-b2c/client-credentials-grant-flow](https://learn.microsoft.com/en-us/azure/active-directory-b2c/client-credentials-grant-flow)
10. Microsoft, "Microsoft Entra External ID pricing" — M2M Authentication Premium add-on, $0.001 per client-credentials token from November 1, 2025 (Microsoft's docs page names the M2M Authentication add-on but defers the live number to this pricing page): [https://azure.microsoft.com/en-us/pricing/details/microsoft-entra-external-id/](https://azure.microsoft.com/en-us/pricing/details/microsoft-entra-external-id/)
11. AWS, "Amazon Cognito removes Machine-to-Machine app client price dimension" (November 3, 2025): [https://aws.amazon.com/about-aws/whats-new/2025/11/amazon-cognito-removes-machine-machine-app-client-price-dimension/](https://aws.amazon.com/about-aws/whats-new/2025/11/amazon-cognito-removes-machine-machine-app-client-price-dimension/)
12. Keycloak, Server Administration Guide — service accounts and the client-credentials grant: [https://www.keycloak.org/docs/latest/server_admin/index.html](https://www.keycloak.org/docs/latest/server_admin/index.html)
13. Keycloak, "Standard Token Exchange is now officially supported in Keycloak 26.2" (May 2025), implementing RFC 8693: [https://www.keycloak.org/2025/05/standard-token-exchange-kc-26-2](https://www.keycloak.org/2025/05/standard-token-exchange-kc-26-2)
14. AWS, "Introducing Amazon Bedrock AgentCore Identity: Securing agentic AI at scale": [https://aws.amazon.com/blogs/machine-learning/introducing-amazon-bedrock-agentcore-identity-securing-agentic-ai-at-scale/](https://aws.amazon.com/blogs/machine-learning/introducing-amazon-bedrock-agentcore-identity-securing-agentic-ai-at-scale/)
15. Microsoft Learn, "What's new in Microsoft Entra Agent ID" — GA status, agent identity constructs, non-Microsoft agent integration including Bedrock: [https://learn.microsoft.com/en-us/entra/agent-id/whats-new-agent-id](https://learn.microsoft.com/en-us/entra/agent-id/whats-new-agent-id)
