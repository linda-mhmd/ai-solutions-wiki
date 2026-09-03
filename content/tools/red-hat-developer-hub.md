---
title: "Red Hat Developer Hub - Supported Backstage Distribution"
description: "Red Hat Developer Hub is Red Hat's commercially supported, enterprise distribution of the open-source Backstage developer portal, adding curated plugins, RBAC, and Red Hat product integrations."
date: 2026-09-03
categories: [Tools]
tags: ["internal-developer-platform", "backstage", "red-hat", "openshift", "developer-portal", "platform-engineering", "rbac", "open-core"]
related:
  - tools/backstage
  - tools/red-hat-openshift
  - comparisons/backstage-vs-red-hat-developer-hub
last_updated: 2026-09-03
---

Red Hat Developer Hub (RHDH) is Red Hat's productized, commercially supported distribution of [Backstage](/tools/backstage/), the open-source developer portal framework originally built at Spotify and now hosted by the CNCF. Red Hat announced RHDH as generally available on January 16, 2024, packaging Backstage with dynamic plugin management, an enterprise role-based access control (RBAC) layer, curated and partner-certified plugins, and integration with the rest of the Red Hat product portfolio — OpenShift, Ansible Automation Platform, OpenShift GitOps, and OpenShift Pipelines. The underlying `redhat-developer/rhdh` repository (formerly `janus-idp/backstage-showcase`) is open source under the Apache-2.0 license; what customers pay for is the supported, versioned product, curated plugin catalog, and Red Hat's subscription entitlements, not the base software itself.

Official documentation: https://docs.redhat.com/en/documentation/red_hat_developer_hub

## Key Capabilities

- **Dynamic plugin management** - Plugins can be installed, updated, or removed at runtime through configuration, without rebuilding and redeploying the Backstage application image, which is required for most plugin changes in vanilla Backstage.
- **Enterprise RBAC** - A Red Hat-built RBAC plugin adds fine-grained, role-based permissions on top of Backstage's permission framework, for controlling who can view or modify catalog entities, templates, and plugin actions.
- **Tiered plugin catalog** - Plugins are published in three support tiers: Red Hat-supported (covered directly by Red Hat's subscription), Certified (tested for RHDH compatibility and supported by the partner, e.g. Dynatrace, IBM API Connect), and Community (best-effort, unsupported).
- **Red Hat product integrations** - Bundled and certified plugins connect the catalog and scaffolder templates to OpenShift, OpenShift GitOps (Argo CD), OpenShift Pipelines (Tekton), Ansible Automation Platform, and Red Hat Quay.
- **Multi-platform deployment** - Despite the OpenShift-centric marketing, RHDH ships an Operator and Helm chart and is documented for installation on OpenShift as well as Amazon EKS, Google GKE, and Azure AKS.
- **Commercial support and lifecycle policy** - Red Hat publishes a formal life-cycle policy for RHDH (Full Support phase through a minor release's supersession, then a Maintenance Support phase), with backing for security and bug-fix advisories that upstream Backstage, as a CNCF project without a vendor SLA, does not provide on its own.

## Origins and History

RHDH's roots trace to the Janus IDP project, a Red Hat-led open-source initiative that extended Backstage with additional plugins and packaging (`janus-idp/backstage-showcase`). Red Hat used Janus as the upstream staging ground before productizing it: the repository was renamed to `redhat-developer/rhdh`, and Red Hat Developer Hub reached general availability on January 16, 2024, as a fully supported IDP offering. The standalone Janus IDP project has since been deprecated as a separate brand; most of its plugins migrated either to the Backstage Community Plugins repository or into Red Hat-maintained repositories that now form part of the RHDH ecosystem.

Since GA, Red Hat has shipped RHDH on a roughly bimonthly-to-quarterly minor-release cadence — nine minor releases (1.0 to 1.9) across the 26 months from GA to March 2026 — adding capabilities such as expanded dynamic-plugin tooling and additional Ansible Automation Platform plugin support. The product is licensed and sold as a Red Hat subscription — retail listings show it packaged as annual, per-user subscriptions (e.g., a "Premium" tier sold in 10-user blocks) rather than folded automatically into an OpenShift entitlement, though it is commonly deployed on OpenShift clusters alongside other Red Hat middleware.

## Sources

1. https://www.redhat.com/en/about/press-releases/red-hat-developer-hub-now-generally-available
2. https://www.redhat.com/en/technologies/cloud-computing/developer-hub
3. https://github.com/redhat-developer/rhdh
4. https://developers.redhat.com/products/rhdh/plugins
5. https://access.redhat.com/support/policy/updates/developerhub
6. https://developers.redhat.com/articles/2023/05/23/developers-guide-red-hat-developer-hub-and-janus
7. https://developers.redhat.com/blog/2026/03/13/whats-new-red-hat-developer-hub-19
