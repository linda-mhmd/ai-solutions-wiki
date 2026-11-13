---
title: "SPIFFE and SPIRE in Hybrid Cloud: One Workload Identity Across On-Prem and Every Cloud"
description: "How SPIFFE and SPIRE give every workload and AI agent one cryptographic identity across data centres, Kubernetes clusters and several clouds: attestation, trust domains, federation, and swapping SVIDs for cloud credentials without static keys."
date: 2026-11-13
lastmod: 2026-11-13
last_updated: 2026-11-13
last_verified: 2026-11-13
categories: [Guides]
tags: ["spiffe", "spire", "workload-identity", "hybrid cloud", "multi-cloud", "zero-trust", "kubernetes", "openshift", "ai-agents", "non-human-identity"]
related:
  - guides/agent-identity-and-authorization
  - guides/hybrid-and-multicloud-ai
  - patterns/zero-trust-ai
  - glossary/zero-trust
  - tools/red-hat-openshift
---

<figure class="bz-figure">
  <img src="/img/enterprise-dark/gateway-chamber-split-notext.png" alt="A gateway chamber split into two halves, suggesting one identity crossing between separate environments." loading="lazy">
  <figcaption>The point of SPIFFE: a workload proves who it is the same way in your data centre, in every cloud, and across the boundary between them.</figcaption>
</figure>

In a hybrid estate, every environment has its own answer to "who is this workload?": IAM roles on AWS, managed identities on Azure, service accounts on Google Cloud and Kubernetes, and certificates or shared secrets on-premises. None of them recognises the others. The usual workaround is a long-lived API key copied into each environment, which is exactly the credential that leaks.

**SPIFFE** (Secure Production Identity Framework for Everyone) is an open standard for workload identity, and **SPIRE** (the SPIFFE Runtime Environment) is its reference implementation. Both are graduated CNCF projects. Together they give every workload, including every AI agent, one short-lived, cryptographically verifiable identity that works the same everywhere and can be exchanged for each cloud's native credentials.

> **From the talk.** This guide is the written companion to the identity part of [**Your Agent Is the New Layer 8: Prompted, Tricked, and Overprivileged**](https://www.lindamohamed.com/cloud-native-meetup-vienna?utm_source=ai-solutions.wiki&utm_medium=guide&utm_campaign=spiffe-spire-hybrid-cloud), given by Linda Mohamed with Philipp Bergsmann (Red Hat) at the Cloud Native Vienna meetup on 12 November 2026. The talk treats an AI agent like a new employee: it gets its own identity, only the access its job needs, and an audit trail. Its demos covered workload identity with SPIRE, token exchange with RFC 8693, and Kubernetes constrained impersonation on Red Hat OpenShift Service on AWS. The talk page has the slides.

## The four ideas you need

**1. The SPIFFE ID.** A workload's name, written as a URI:

```
spiffe://prod.example.com/ns/payments/sa/invoice-agent
```

The part after `spiffe://` is the **trust domain**, usually one per organisation or per environment. The path names the workload however you choose: by Kubernetes namespace and service account, by region, by team, or by agent role.

**2. The SVID (SPIFFE Verifiable Identity Document).** The credential that proves the ID. It comes in two forms:

- **X.509-SVID**: a short-lived certificate with the SPIFFE ID in its URI SAN. Used for mutual TLS (mTLS) between services.
- **JWT-SVID**: a signed token with the SPIFFE ID as its subject and an audience. Used where TLS is not end to end, and for exchanging into cloud credentials.

SVIDs typically live for minutes to an hour and rotate automatically, so there is nothing long-lived to steal.

**3. The Workload API.** A local endpoint, a Unix domain socket on each node, where a workload asks "who am I?" and receives its SVIDs and the trust bundle it needs to verify others. The workload presents no secret to get them. That is the key property: **no bootstrap credential to leak**.

**4. The trust bundle.** The set of CA certificates and JWT signing keys for a trust domain. A workload uses it to decide whether a peer's SVID is genuine.

## How SPIRE decides who a workload is

SPIRE has two parts: a **SPIRE Server**, which is the certificate authority for a trust domain and holds the registration entries, and a **SPIRE Agent** on every node, which serves the Workload API. Identity is issued in two attestation steps, which is what makes it work in a hybrid estate.

<div class="bz-flow">
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Step 1</span><span class="bz-flow-step-name">Node attestation</span><span class="bz-flow-step-desc">The agent proves which machine it runs on, using evidence the platform itself vouches for.</span></div>
  <div class="bz-flow-arrow">&rarr;</div>
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Step 2</span><span class="bz-flow-step-name">Workload attestation</span><span class="bz-flow-step-desc">The agent inspects the calling process: its pod, namespace, service account, container image or Unix user.</span></div>
  <div class="bz-flow-arrow">&rarr;</div>
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Step 3</span><span class="bz-flow-step-name">Match</span><span class="bz-flow-step-desc">The selectors are matched against registration entries on the server.</span></div>
  <div class="bz-flow-arrow">&rarr;</div>
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Step 4</span><span class="bz-flow-step-name">Issue</span><span class="bz-flow-step-desc">The workload receives a short-lived SVID, rotated automatically.</span></div>
</div>

**Node attestation is where hybrid becomes easy.** Each environment proves itself with its own native evidence, through SPIRE's node attestor plugins:

| Where the node runs | Node attestor | Evidence |
| --- | --- | --- |
| AWS EC2 | `aws_iid` | The signed EC2 instance identity document |
| Azure VMs | `azure_msi` / `azure_imds` | A token or document from the Azure instance metadata service |
| Google Cloud | `gcp_iit` | The signed instance identity token |
| Kubernetes, any cloud or on-prem | `k8s_psat` | A projected service account token for the agent pod, validated against the cluster |
| On-prem servers with TPMs | `tpm_devid` | A device identity certificate rooted in the TPM |
| Servers with existing certificates | `x509pop` / `sshpop` | Proof of possession of an existing X.509 or SSH host certificate |
| Anything else, for bootstrapping | `join_token` | A one-time token. Use sparingly: it is the weakest option |

The result: an agent pod on EKS, a batch job on an Azure VM and a model server in your own data centre each prove themselves differently, but all three end up with the same kind of SPIFFE ID, verified the same way. The AWS attestor's own documentation notes one subtlety: the instance identity document is readable by any process on the node, so SPIRE uses trust on first use and attests each node only once.

## Three hybrid topologies

**One trust domain, one SPIRE Server, agents everywhere.** The simplest design. Agents in every environment connect to one highly available server. It works when the network allows it and one team owns identity for everything. The server is a single point of trust, so run it highly available with a proper datastore.

**Nested SPIRE.** A root server holds the trust domain, and downstream SPIRE Servers in each cloud or cluster get their signing authority from it. Each environment keeps issuing identities if the link to the root drops. Good for many clusters under one organisation.

**Federation: separate trust domains that trust each other.** Each environment, or each organisation, runs its own SPIRE with its own trust domain, for example `spiffe://onprem.example.com` and `spiffe://aws.example.com`. They exchange trust bundles through a **bundle endpoint**, using the SPIFFE federation profiles `https_web` (authenticated with ordinary Web PKI) or `https_spiffe` (authenticated with SPIFFE itself). A workload in one domain can then verify an SVID from the other, while each side keeps full control of its own issuing. This is the natural fit for hybrid estates with separate teams, for mergers, and for partner integrations. Red Hat's OpenShift operator lists multi-cluster federation as one of the features it adds to upstream SPIRE.

## Turning a SPIFFE identity into cloud access, without static keys

This is the step that removes long-lived cloud keys from on-prem and cross-cloud workloads.

- **AWS, through OIDC federation.** SPIRE's **OIDC Discovery Provider** publishes the trust domain's JWT signing keys as a standard JWKS endpoint. Register it as an OIDC identity provider in IAM, write a role trust policy that matches the audience and the workload's SPIFFE ID as subject, and the workload calls `AssumeRoleWithWebIdentity` with its JWT-SVID to get temporary STS credentials. The SPIFFE project documents this pattern step by step.
- **AWS, through IAM Roles Anywhere.** Alternatively, register SPIRE's CA as a Roles Anywhere trust anchor and exchange an X.509-SVID for temporary credentials. Some practitioners prefer this, because it uses the certificate the workload already has.
- **Azure and Google Cloud.** Both accept external OIDC issuers: Microsoft Entra workload identity federation through federated identity credentials, and Google Cloud workload identity federation through a workload identity pool with an OIDC provider. The JWT-SVID is the token they validate.
- **Watch the details.** One engineering team reported in 2024 that it had to fix a data-type mismatch before AWS STS would accept SPIRE's JWT-SVIDs. Test the exchange early.

Inside the estate, X.509-SVIDs give you **mTLS between services**, directly or through a service mesh. Envoy fetches SVIDs over its secret discovery service, and Istio and OpenShift Service Mesh use SPIFFE identities for workload certificates.

## Why this matters for AI agents

Everything above applies to agents, with higher stakes. An agent chooses its own actions, often under pressure from content it has just read, so the [shared service account failure](/guides/agent-identity-and-authorization/) is worse for agents than for ordinary services. SPIFFE gives each agent, or each agent role, its own identity, which enables three controls:

- **Least privilege per agent.** Policies and cloud roles are bound to `spiffe://.../agent/invoice-reader`, not to a shared key used by every agent.
- **Attribution.** Every call carries a verifiable workload identity, so the audit log says which agent did it.
- **Delegation done properly.** When an agent acts for a person, combine its workload identity with an OAuth token exchange (RFC 8693), so the downstream service sees both who the agent is and on whose behalf it acts, with the narrowest scope that does the job. The Vienna talk's demo section is called "only what both allow": the agent ends up with the intersection of its own permissions and the user's, never the union.

Vendors are converging on the same design. Google's agent platform describes per-agent identity "using open standard based SPIFFE"; see [Google's Agent Compute Engine](/news/google-agent-compute-engine-microvm-agents/).

## Getting started

1. **Pick trust domains.** One per organisation is the default; one per environment if separate teams own them and you plan to federate.
2. **Run SPIRE Server highly available**, with a persistent datastore. Keep its signing keys in a cloud KMS through a KeyManager plugin (`aws_kms`, `gcp_kms` or `azure_key_vault`), or chain it to an existing CA through an UpstreamAuthority plugin.
3. **Deploy agents with the strongest node attestor each environment offers:** `aws_iid`, `azure_msi` or `azure_imds`, `gcp_iit`, `k8s_psat` with a service-account allow list, or `tpm_devid` on-prem. Avoid `join_token` except for bootstrapping.
4. **Register workloads with specific selectors** (namespace plus service account, or image digest), not broad ones. On Kubernetes, the SPIRE controller manager can create entries from custom resources, and the SPIFFE CSI driver mounts the Workload API socket into pods.
5. **Replace one static cloud key first.** An on-prem job that reads from S3 is a good candidate: OIDC Discovery Provider, IAM OIDC provider, role trust policy on the SPIFFE ID.
6. **Add mTLS and federation** once the first path works.

On OpenShift, Red Hat's **Zero Trust Workload Identity Manager** packages SPIRE as a supported operator. Red Hat lists version 1.0 as generally available from 12 December 2025, bundling SPIRE 1.13.3; version 1.1 added SPIFFE Helper support and OpenShift Service Mesh integration, and extended availability to standard OpenShift Container Platform entitlements.

## When not to use it

- **You run in one cloud, on that cloud's managed compute only.** IAM roles for service accounts on EKS, managed identities on Azure or workload identity on GKE already give you short-lived workload identity, and SPIRE adds a system to run.
- **You cannot run it properly.** SPIRE Server is a certificate authority. If it is down, new workloads cannot get identities. If its key is compromised, every identity is. Treat it as tier-0 infrastructure or do not deploy it.
- **The problem is user identity, not workload identity.** SPIFFE says which workload is calling. Who the user is and what they may do still need OAuth, OIDC and an authorisation layer.

## Further reading

- [Your Agent Is the New Layer 8](https://www.lindamohamed.com/cloud-native-meetup-vienna?utm_source=ai-solutions.wiki&utm_medium=guide&utm_campaign=spiffe-spire-hybrid-cloud): the talk this guide accompanies, with slides.
- [Agent identity and authorization](/guides/agent-identity-and-authorization/): who an agent is acting as, and why shared service accounts fail.
- [Hybrid and multi-cloud AI](/guides/hybrid-and-multicloud-ai/): the wider building blocks for running AI across on-prem and clouds.
- [Zero trust for AI](/patterns/zero-trust-ai/): the pattern SPIFFE implements for workloads.
- [Red Hat OpenShift](/tools/red-hat-openshift/): the platform behind the talk's demo environment.

## Sources

- SPIFFE project, documentation and specifications (accessed 13 November 2026): https://spiffe.io/
- SPIFFE project, "AWS OIDC Authentication" (OIDC Discovery Provider and AssumeRoleWithWebIdentity): https://spiffe.io/docs/latest/keyless/oidc-federation-aws/
- SPIRE Server configuration reference, including the node attestor plugins: https://spiffe.io/docs/latest/deploying/spire_server/
- SPIRE Agent configuration reference: https://spiffe.io/docs/latest/deploying/spire_agent/
- SPIRE, `aws_iid` node attestor documentation (trust on first use): https://github.com/spiffe/spire/blob/main/doc/plugin_server_nodeattestor_aws_iid.md
- SPIRE, `k8s_psat` node attestor documentation: https://github.com/spiffe/spire/blob/main/doc/plugin_agent_nodeattestor_k8s_psat.md
- Red Hat, "Zero trust workload identity manager generally available on Red Hat OpenShift": https://www.redhat.com/en/blog/zero-trust-workload-identity-manager-generally-available-red-hat-openshift
- Red Hat, "Zero trust workload identity manager 1.1 generally available": https://www.redhat.com/en/blog/zero-trust-workload-identity-manager-11-generally-available-red-hat-openshift
- Red Hat, OpenShift Container Platform 4.21 documentation, Zero Trust Workload Identity Manager: https://docs.redhat.com/ja/documentation/openshift_container_platform/4.21/html/security_and_compliance/zero-trust-workload-identity-manager
- Indeed Engineering, "Secure Workload Identity with SPIRE and OIDC" (July 2024), on the STS compatibility fix: https://engineering.indeedblog.com/blog/2024/07/workload-identity-with-spire-oidc-for-k8s-istio/
- GitGuardian, "Getting Started With SPIFFE for Multi-Cloud Secure Workload Authentication", on Roles Anywhere versus OIDC: https://blog.gitguardian.com/getting-started-with-spiffe/
- Linda Mohamed and Philipp Bergsmann, "Your Agent Is the New Layer 8: Prompted, Tricked, and Overprivileged", Cloud Native Vienna, 12 November 2026: https://www.lindamohamed.com/cloud-native-meetup-vienna
