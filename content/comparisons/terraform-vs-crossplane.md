---
title: "Terraform vs Crossplane"
description: "Two different answers to declarative infrastructure control: Terraform's apply-time provisioning, now under a source-available license IBM owns, against Crossplane's continuously-reconciling, CNCF-graduated Kubernetes control plane — and the license, capability, and operating-model constraints that actually decide between them."
date: 2026-09-04
categories: [Comparisons]
tags: ["terraform", "crossplane", "infrastructure-as-code", "kubernetes", "gitops", "vendor-lock-in", "licensing", "platform-engineering", "control-plane", "opentofu"]
tools: ["terraform", "crossplane"]
related:
  - guides/constraint-driven-comparisons
  - tools/terraform
  - tools/crossplane
  - guides/software-licensing-and-vendor-lock-in
  - patterns/declarative-control-planes-for-agents
  - glossary/gitops
last_verified: 2026-09-04
last_updated: 2026-09-04
lastmod: 2026-09-04
---

Terraform and Crossplane are both, in the loosest sense, "declarative infrastructure" tools: you describe a desired state and something makes reality match it. Past that one sentence they stop being comparable on the same axis. Terraform is a CLI-driven provisioning tool: it computes a diff between configuration and a tracked state file, and applies that diff when a person or a CI job tells it to. Crossplane is a Kubernetes-native framework: desired state lives as a Kubernetes object, and a controller reconciles actual state toward it continuously, on its own schedule, for as long as the object exists. One runs when invoked; the other runs forever until deleted. That is an operating-model difference, not a feature gap.

It sits on top of a second difference that is not architectural at all. Since August 2023, the tool most people mean when they say "Terraform" has not been open source in the OSI sense — it ships under a source-available license now owned by IBM — while Crossplane is Apache 2.0 and, as of late 2025, a CNCF Graduated project. That is a license-risk and governance question, and for some organizations it is a harder constraint than anything in either tool's feature set.

This page follows the [constraint-driven methodology](/guides/constraint-driven-comparisons/) used across this wiki: name what actually rules an option out for a given reader before comparing features, and keep that separate from what is merely worth weighing.

## What each one actually is

[Terraform](/tools/terraform/) is HashiCorp's — now IBM's — infrastructure-as-code tool, first released in 2014. You write HCL, run `terraform plan` to see a diff against a tracked state file, and `terraform apply` to execute it. Nothing changes between applies unless a person or a pipeline reruns the tool; on the paid HCP Terraform tier, a scheduled health assessment can detect drift and surface it, but a human still has to queue and apply the fix — the platform does not self-heal it ([HCP Terraform docs, "Health assessments"](https://developer.hashicorp.com/terraform/cloud-docs/workspaces/health)). The current release is Terraform 1.16.1, published September 2, 2026 ([GitHub releases](https://github.com/hashicorp/terraform/releases)). Since Terraform 1.6 it has shipped under the Business Source License 1.1 (BSL); the project's own license file lists **International Business Machines Corporation** as the licensor, permits free production use but forbids offering Terraform to third parties as a hosted service competing with IBM's paid products, and converts each release to MPL 2.0 four years after it ships ([`hashicorp/terraform` LICENSE](https://github.com/hashicorp/terraform/blob/main/LICENSE)).

[Crossplane](/tools/crossplane/) is a CNCF framework, originally built by Upbound and open-sourced in 2018, that extends the Kubernetes API with Custom Resource Definitions representing external infrastructure — a cloud database, a VPC, an entire application stack. A platform team defines a Composition mapping a custom API (an XR) to underlying Managed Resources; a requester creates an instance of that API and Crossplane's controllers reconcile the cluster's actual state toward it, on a default one-hour full resync plus event-driven updates the moment a watched object changes ([Crossplane docs, "Pods"](https://docs.crossplane.io/latest/guides/pods/)). The current release is v2.4.0, published August 20, 2026 ([GitHub releases](https://github.com/crossplane/crossplane/releases)). Crossplane is licensed Apache 2.0, and the CNCF's Technical Oversight Committee voted it to **Graduated** status — the foundation's top maturity tier — on October 28, 2025, citing over 3,000 contributors from more than 450 organizations and completed third-party security audits ([CNCF graduation announcement](https://www.cncf.io/announcements/2025/11/06/cloud-native-computing-foundation-announces-graduation-of-crossplane/)).

## The constraint categories that actually apply here

Of the general categories this wiki uses to structure a comparison, four carry real weight for this specific choice: **vendor lock-in and license risk** (the BSL fork history, not a footnote), **internal capability** (does the team already run Kubernetes as a control plane, or would adopting Crossplane mean adopting that operating model too), **cost structure** (per-resource SaaS pricing against self-hosted operational cost), and **resilience / operating-model fit** (apply-time correction against continuous reconciliation). Regulatory jurisdiction and data-residency rules apply to what each tool provisions, not to the tools themselves, so they are not a distinguishing constraint here — see [software licensing and vendor lock-in](/guides/software-licensing-and-vendor-lock-in/) for the general treatment of the first category, which this page applies concretely.

## Gates: what rules an option out entirely

**A hard "OSI-approved open source only" procurement policy rules out Terraform itself, not infrastructure-as-code generally.** Some enterprises, public-sector bodies, and vendors with their own downstream licensing obligations require every dependency to carry an OSI-approved license. The BSL is explicitly not one — the Open Source Initiative does not recognize it, precisely because it restricts a class of commercial use ([software licensing and vendor lock-in](/guides/software-licensing-and-vendor-lock-in/)). For a reader in that position, Terraform proper is disqualified regardless of how well it otherwise fits, but the gate does not extend to the *operating model* — [OpenTofu](https://opentofu.org/), the Linux Foundation–governed, MPL 2.0–licensed fork created within days of HashiCorp's 2023 relicensing, is a drop-in replacement that preserves the same HCL configuration, the same provider ecosystem, and the same plan/apply workflow ([OpenTofu.org](https://opentofu.org/)). A reader gated off Terraform by license policy is not gated off the apply-time provisioning model — they are gated off one specific vendor's binary.

**No existing Kubernetes control-plane capability, and no intent to build one, rules out Crossplane as a near-term choice — not because of any feature gap, but because the failure modes require Kubernetes-operator literacy to diagnose.** Crossplane's unit of review is a Composition's function pipeline, whose actual output depends on runtime-observed cluster state, not a linear, top-to-bottom script; understanding what a Claim will actually produce requires understanding CRDs, the XRD/Composition split, and reconciliation semantics, none of which a team fluent in HCL or general-purpose scripting already has by default. This tradeoff, including why it is a genuine adoption cost and not a marketing objection, is worked through in [declarative control planes for agents](/patterns/declarative-control-planes-for-agents/). A platform team without Kubernetes operational depth, and without the intent to acquire it, is choosing to run production infrastructure through a system it cannot troubleshoot from first principles — that is a capability gate, not a preference.

**A one-shot, non-recurring business action is not infrastructure Crossplane's model fits, regardless of team capability.** Reconciliation exists to converge toward an ongoing desired state; an action that should happen exactly once — onboard this specific customer, issue this specific certificate — has no stable state to reconcile toward, and forcing it into a Custom Resource means building a controller whose entire job is "has this run yet," which is a worse implementation of a one-shot operation than a script that just runs it once ([declarative control planes for agents](/patterns/declarative-control-planes-for-agents/)). This gates specific *workloads* out of Crossplane, not the tool as a whole — most real platforms run some infrastructure through a reconciling control plane and some one-shot actions through something else entirely.

## Tradeoffs: worth weighing, not disqualifying

**Cost structure diverges sharply once a reader looks past "both have a free tier."** HCP Terraform's paid tiers bill per managed resource, per month, at published rates of $0.10 (Essentials), $0.47 (Standard), and $0.99 (Premium), metered hourly on peak usage in the hour ([HashiCorp, HCP Terraform pricing](https://www.hashicorp.com/en/products/terraform/pricing)); Terraform Enterprise, the self-hosted option, is quote-based. Crossplane itself carries no license fee at any scale — it is Apache 2.0 and self-hostable indefinitely — but Upbound's commercial layer, needed for managed hosting or certain runtime features (backup/restore, autoscaling for providers), starts at $1,000/month on the Standard tier plus per-resource metering, with Business Critical and Enterprise tiers priced individually ([Upbound pricing](https://www.upbound.io/pricing)). The honest comparison is not "Terraform costs money and Crossplane is free" — it is SaaS metering against the operational cost of running and maintaining your own Kubernetes cluster as a control plane, which is not free either, just accounted for differently.

**Provider and resource ecosystem breadth still favors Terraform by a wide margin, though the gap is narrower than the raw provider counts suggest.** The Terraform Registry's own API reported 7,191 listed providers as of September 2026 (queried directly against `registry.terraform.io/v2/providers`), spanning everything from the three hyperscalers to single-maintainer community providers for niche SaaS tools. Crossplane's Upbound Marketplace listed 154 providers as of the same date ([marketplace.upbound.io/providers](https://marketplace.upbound.io/providers)) — a much smaller number, though Upbound's official AWS, Azure, and GCP "family" providers alone cover well over 1,000, 900, and 500 managed resources respectively, so raw provider counts overstate the practical gap for the three major clouds specifically and understate it for everything long-tail. Crossplane can also delegate to Terraform or OpenTofu modules directly through `provider-terraform` / `provider-opentofu`, wrapping an existing module as a `Workspace` managed resource inside a Composition — a genuine bridge for coverage gaps, though `provider-terraform` itself is now a casualty of the licensing split this page opens with: its maintainers have frozen it at Terraform 1.5.7, the last MPL 2.0 release before the BSL switch, and say explicitly it will not adopt any Terraform version released under the BSL, pointing teams at `provider-opentofu` instead for anything newer ([`crossplane-contrib/provider-terraform` README](https://github.com/crossplane-contrib/provider-terraform)).

**The operating-model split — apply-time versus continuous reconciliation — is the tradeoff most worth naming on its own, since it is not really about which tool is "better" at drift.** Terraform's default mode never notices drift unless someone runs `plan` again; HCP Terraform's paid health assessments narrow that gap by detecting drift automatically, but stop at detection — a human still queues the corrective apply ([HCP Terraform, "Health assessments"](https://developer.hashicorp.com/terraform/cloud-docs/workspaces/health)). Crossplane's controllers reconcile by default, with no paid tier required, which is a genuine resilience advantage for infrastructure that should self-heal — and a genuine cost for infrastructure where an unattended, automatic correction is exactly what you don't want (a manually-adjusted setting silently reverting is a feature in one context and an incident in another).

**GitOps fit is asymmetric.** Crossplane's Custom Resources are ordinary Kubernetes objects, so tools like Argo CD or Flux apply them the same way they apply any manifest — reconciliation is the native mode, not an add-on (see [GitOps](/glossary/gitops/)). Terraform can be run inside a GitOps-style pipeline (Atlantis, or HCP Terraform's own VCS-driven runs), but the tool itself is not GitOps-native the way a Kubernetes controller is; the CLI's own execution model is invoke-and-exit regardless of what triggers the invocation.

## Side by side

| | Terraform | Crossplane |
|---|---|---|
| License | Business Source License 1.1; licensor IBM ([source](https://github.com/hashicorp/terraform/blob/main/LICENSE)) | Apache 2.0 |
| Governance | Single vendor (IBM) | CNCF Graduated (Oct. 2025) |
| OSI open source | No | Yes |
| Config surface | HCL, plan/apply | Kubernetes CRDs (XRDs/Compositions) |
| Execution trigger | Human or CI invokes `apply` | Controller reconciles continuously |
| Drift handling | Manual re-plan, or paid-tier detect-only | Reconciled automatically by default |
| State storage | Separate state file (S3, Terraform Cloud, etc.) | Live Kubernetes objects (etcd) |
| Current release (Sept. 2026) | 1.16.1 | v2.4.0 |
| Listed providers | 7,191 (Terraform Registry API) | 154 (Upbound Marketplace) |
| Natural fit | General IaC users, multi-cloud/SaaS provisioning, teams wanting a readable `plan` diff | Kubernetes-heavy platform-engineering shops building a self-service internal developer platform |

## What this comparison cannot resolve

Whether the BSL's "does not compete with IBM's paid version" carve-out is acceptable under a *specific* organization's software-approval policy is a legal reading this page cannot make for a reader — some procurement teams read source-available licenses as categorically excluded, others accept them for internal, non-resold use, and the license text itself is the only authoritative answer for a specific use case. Whether a team's existing Kubernetes footprint is deep enough to absorb Crossplane's operational model, or whether that footprint would have to be built from nothing, is a capability assessment specific to the team, not something a general comparison can measure. Provider coverage for any one reader's specific, less-common target system (a niche SaaS product, an internal system) has to be checked directly in the Terraform Registry or the Upbound Marketplace at the time of evaluation, since both ecosystems' community tiers change month to month. And the actual cost crossover point between HCP Terraform's per-resource metering and the fully-loaded cost of self-hosting a Crossplane control plane (cluster, on-call, upgrade burden) depends on a specific resource count and a specific team's existing Kubernetes operating cost, neither of which a general comparison can price.

## Further reading

- [Terraform](/tools/terraform/): the provisioning tool in depth, including state management and module design.
- [Crossplane](/tools/crossplane/): the control-plane framework in depth, including the v2 namespacing changes.
- [Declarative control planes for agents](/patterns/declarative-control-planes-for-agents/): the imperative-versus-reconciliation split worked through in full, including where the case for Crossplane overstates itself.
- [Software licensing and vendor lock-in](/guides/software-licensing-and-vendor-lock-in/): the BSL relicensing wave in its full context, alongside MongoDB, Elastic, and Red Hat/CentOS.
- [GitOps](/glossary/gitops/): the reconciliation-from-Git pattern Crossplane's resources fit natively.
- [Infrastructure as code for AI](/guides/infrastructure-as-code-ai/): where either tool sits inside a broader AI-platform IaC workflow.
- [Terraform vs Ansible](/comparisons/terraform-vs-ansible/): the provisioning-versus-configuration split, for the adjacent question of what runs after either tool provisions a node.

## Sources

1. `hashicorp/terraform` LICENSE file (Business Source License 1.1, licensor IBM): [https://github.com/hashicorp/terraform/blob/main/LICENSE](https://github.com/hashicorp/terraform/blob/main/LICENSE)
2. HashiCorp Blog, "HashiCorp officially joins the IBM family" (acquisition closed February 27, 2025): [https://www.hashicorp.com/en/blog/hashicorp-officially-joins-the-ibm-family](https://www.hashicorp.com/en/blog/hashicorp-officially-joins-the-ibm-family)
3. `hashicorp/terraform` GitHub Releases (current release 1.16.1, September 2, 2026): [https://github.com/hashicorp/terraform/releases](https://github.com/hashicorp/terraform/releases)
4. `crossplane/crossplane` GitHub Releases (current release v2.4.0, August 20, 2026): [https://github.com/crossplane/crossplane/releases](https://github.com/crossplane/crossplane/releases)
5. CNCF, "Cloud Native Computing Foundation Announces Graduation of Crossplane," November 6, 2025: [https://www.cncf.io/announcements/2025/11/06/cloud-native-computing-foundation-announces-graduation-of-crossplane/](https://www.cncf.io/announcements/2025/11/06/cloud-native-computing-foundation-announces-graduation-of-crossplane/)
6. OpenTofu, official project site (Linux Foundation stewardship, MPL 2.0, drop-in replacement, feature list including native state encryption): [https://opentofu.org/](https://opentofu.org/)
7. HashiCorp, HCP Terraform pricing page (Essentials/Standard/Premium per-resource rates): [https://www.hashicorp.com/en/products/terraform/pricing](https://www.hashicorp.com/en/products/terraform/pricing)
8. Upbound, pricing page (Community/Standard/Business Critical/Enterprise tiers): [https://www.upbound.io/pricing](https://www.upbound.io/pricing)
9. Upbound Marketplace, providers listing (154 providers as of September 2026): [https://marketplace.upbound.io/providers](https://marketplace.upbound.io/providers)
10. Terraform Registry API, `/v2/providers` (7,191 total providers, queried September 2026): [https://registry.terraform.io/v2/providers](https://registry.terraform.io/v2/providers)
11. HashiCorp, HCP Terraform docs, "Health assessments" (drift detection is detect-only; correction requires a manually queued apply): [https://developer.hashicorp.com/terraform/cloud-docs/workspaces/health](https://developer.hashicorp.com/terraform/cloud-docs/workspaces/health)
12. Crossplane documentation, "Pods" (default one-hour full reconciliation sync interval): [https://docs.crossplane.io/latest/guides/pods/](https://docs.crossplane.io/latest/guides/pods/)
13. `crossplane-contrib/provider-terraform` README (provider wrapping Terraform modules as Crossplane Workspace resources; frozen at Terraform 1.5.7 and will not adopt BSL-licensed Terraform releases): [https://github.com/crossplane-contrib/provider-terraform](https://github.com/crossplane-contrib/provider-terraform)
