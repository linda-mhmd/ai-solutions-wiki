---
title: "Crossplane - Kubernetes-Native Control Plane Framework"
description: "Crossplane is an open-source, CNCF-graduated framework that extends the Kubernetes API with custom resources representing cloud infrastructure, reconciled continuously by controllers."
date: 2026-09-03
categories: [Tools]
tags: ["kubernetes", "control-plane", "infrastructure-as-code", "cncf", "platform-engineering", "open-source", "declarative-api", "cloud-native"]
related:
  - guides/infrastructure-as-code-ai
  - guides/platform-engineering-ai
  - glossary/kubernetes
  - patterns/declarative-control-planes-for-agents
  - glossary/immutable-infrastructure
last_updated: 2026-09-03
---

Crossplane is an open-source framework for building Kubernetes-native control planes. It extends the Kubernetes API with Custom Resource Definitions (CRDs) that represent infrastructure — a cloud database, a VPC, a DNS record, an entire application stack — and uses Kubernetes' own controller pattern to reconcile the declared desired state of those resources against their actual state, continuously and without a human re-running anything. It was created and open-sourced by Upbound in 2018 and is now a Graduated project of the Cloud Native Computing Foundation (CNCF).

Official documentation: https://docs.crossplane.io/

## Key Capabilities

- **Providers** - Plugins that extend the Kubernetes API with CRDs and controllers for a specific system's resources (`provider-aws`, `provider-gcp`, `provider-azure`, `provider-kubernetes`, `provider-helm`, and others); each provider's controllers reconcile the resources it defines against the real infrastructure.
- **Managed Resources (MRs)** - An instance of a provider's CRD in the cluster represents one real external resource — an S3 bucket, an Azure VM — that Crossplane creates, updates, and monitors on an ongoing basis.
- **Composite Resources (XRs) and Compositions** - A Composition defines how a higher-level custom API (an XR — e.g., "PostgresDatabase") is assembled from one or more lower-level resources, letting a platform team expose a simplified, opinionated API instead of the underlying cloud provider's raw resource types.
- **Composition Functions** - Programs that Crossplane calls in a pipeline to decide which resources a Composition should produce; they can be written in general-purpose languages including Go and Python (official guides exist for both), or in the community-supported KCL, CUE, or YAML-template functions, and support loops and conditionals that the older patch-and-transform mechanism could not.
- **Package manager** - Providers, Compositions, and Functions are distributed as OCI-based packages (`xpkg`) that can be installed, versioned, and upgraded declaratively, the same way a cluster installs any other artifact.
- **Reconciliation loop** - Each controller observes desired state and actual state and drives one toward the other continuously; beyond watching for changes, Crossplane double-checks every resource against its default one-hour sync interval regardless of whether anything changed, and each provider rate-limits how often it attempts corrections via a `--max-reconcile-rate` flag that defaults to 10 reconciliations per second.

## Crossplane v2

Crossplane 2.0 shipped on 12 August 2025. It changed several core architectural assumptions from v1:

| | v1 | v2 |
|---|---|---|
| Scope of composite and managed resources | Cluster-scoped | Namespaced by default |
| Claims | A separate "claim" object in a namespace, bound to a cluster-scoped XR | Removed — you create the XR directly in the namespace it belongs to |
| What a Composition can include | Only Crossplane managed resources | Any Kubernetes resource — native objects like Deployments and Services, third-party CRDs, and Crossplane MRs together |
| Native patch-and-transform composition | Available (deprecated starting v1.17) | Removed; composition functions are the only way to compose resources |

Crossplane's own framing of the namespacing change is that it "aligns with Kubernetes conventions and makes multi-tenancy much more intuitive." v2 also added **Operations**, a way to run function pipelines for operational tasks that aren't about creating a resource — one-off (`Operation`), scheduled (`CronOperation`), or triggered by a watched resource (`WatchOperation`) — for things like certificate rotation or scheduled maintenance. Crossplane's documentation states v1-style claims and cluster-scoped resources continue to work in v2 through backward-compatibility support, so a v1 configuration is not required to migrate immediately. See the [upgrade guide](https://docs.crossplane.io/latest/guides/upgrade-to-crossplane-v2/) for the supported migration path.

## Origins and History

Crossplane was created by Upbound, a company founded in late 2017 by Bassam Tabbara — previously a co-creator of the Rook storage project — along with the team behind Rook. Upbound open-sourced Crossplane in 2018 as a project to give a common, Kubernetes-based control plane over infrastructure spread across multiple public clouds. Upbound raised a $9 million Series A in 2018 led by GV, and a $60 million Series B in 2021 led by Altimeter Capital with participation from GV, Intel Capital, and Telstra Ventures, for roughly $69 million raised in total.

Upbound donated Crossplane to the CNCF, which accepted it as a **Sandbox** project on 25 June 2020. The project advanced to **Incubating** on 14 September 2021, and the CNCF's Technical Oversight Committee voted it to **Graduated** status — the foundation's highest maturity tier — on 28 October 2025, announced publicly on 6 November 2025. The CNCF's graduation announcement cites more than 3,000 contributors from over 450 organizations, more than 100 releases, and third-party security audits and a transition of release infrastructure to CNCF-operated systems as part of the graduation requirements. Crossplane is licensed under Apache 2.0 and maintained in the `crossplane/crossplane` GitHub repository.

## Why This Matters for AI Agents

Crossplane's architecture — an agent (or a person) declares a desired end state once, as a Kubernetes object, and a controller keeps reconciling reality toward it indefinitely — is structurally different from an agent that has to script and monitor each provisioning step itself. An agent creating infrastructure through a Crossplane control plane doesn't need to poll a cloud API to check whether a resource finished creating, retry failed steps, or hold that state in its own context; the reconciliation loop already does that, independent of whether the agent that requested it is still running. This is discussed at length, including its limits and failure modes, in [declarative control planes for agents](/patterns/declarative-control-planes-for-agents/).

## Sources

1. https://docs.crossplane.io/latest/whats-new/
2. https://blog.crossplane.io/announcing-crossplane-2-0/
3. https://docs.crossplane.io/latest/guides/upgrade-to-crossplane-v2/
4. https://www.cncf.io/projects/crossplane/
5. https://www.cncf.io/announcements/2025/11/06/cloud-native-computing-foundation-announces-graduation-of-crossplane/
6. https://blog.crossplane.io/crossplane-cncf-graduation/
7. https://www.geekwire.com/2018/seattles-upbound-introduces-crossplane-open-source-project-help-companies-manage-applications-across-multiple-public-clouds/
8. https://www.crunchbase.com/funding_round/upbound-series-b--9b064d81
9. https://github.com/crossplane/crossplane
10. https://docs.crossplane.io/latest/guides/pods/
