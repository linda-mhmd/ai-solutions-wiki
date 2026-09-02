---
title: "Agent Identity and Authorization: Who Is the Agent Acting As?"
description: "Why a shared service account destroys attribution the moment agents act autonomously, how MCP's OAuth 2.1 model binds tokens to a single resource, and the delegation, scope, and revocation questions to answer before agents reach production."
date: 2026-09-02
lastmod: 2026-09-02
last_updated: 2026-09-02
categories: [Guides]
tags: ["ai-agents", "identity", "authorization", "oauth", "mcp", "security", "zero-trust", "non-human-identity"]
related:
  - patterns/zero-trust-ai
  - glossary/model-context-protocol
  - news/ai-cyber-defense-open-letter-2026
  - guides/ai-security-best-practices
---

Traditional access control answers "which service is calling." Agents break that model, because an agent is not really a service: it is software taking open-ended actions **on behalf of a person**, choosing its own steps, against systems that were designed assuming a human clicked the button. The question stops being *what is this service allowed to do* and becomes **whose authority is this action carrying, and how much of it**.

Get this wrong and two things follow immediately: you cannot attribute an action to a run, and you cannot revoke one agent without revoking everything.

## The shared service account failure

The default path is for an agent to authenticate with a long-lived API key or a service account shared across every agent and every user. It works on day one and fails in four specific ways:

- **No attribution.** Logs show the service account acted. They do not show which agent, which run, or which user's request caused it. After an incident you cannot reconstruct what happened.
- **Union-of-all-permissions.** The account accumulates every permission any agent ever needed. Every agent then holds all of them, which is the opposite of least privilege.
- **All-or-nothing revocation.** Rotating the credential to stop one misbehaving agent stops all of them.
- **No user scoping.** An agent acting for a user with limited access can reach data that user cannot. This is the **confused deputy** problem, and it is the most common serious flaw in agent deployments.

This is what the [collective cyber-defence letter](/news/ai-cyber-defense-open-letter-2026/) meant by asking frontier providers to ensure **"traceable agentic identities."** It is an engineering requirement, not a slogan.

## Three identities, not one

The fix is to stop collapsing distinct things into one credential. Any agent action involves three separable identities:

| Identity | Answers | Typical mechanism |
|---|---|---|
| **Workload** | Which process is running? | SPIFFE/SPIRE, IRSA, managed identity, mTLS certificate |
| **Agent** | Which agent definition and version? | Client ID per agent, registered as an OAuth client |
| **Principal** | On whose authority is it acting? | Delegated user token with explicit scopes |

Workload identity is a solved problem and is covered under [zero trust for AI](/patterns/zero-trust-ai/). The two that are usually missing are agent identity and principal delegation — and the authorisation decision needs all three: *this agent, running as this workload, acting for this user, may perform this action.*

The effective permission set should be the **intersection** of what the agent is allowed and what the user is allowed. Never the union.

## What MCP specifies

The Model Context Protocol's authorization specification is the most concrete published answer for tool-using agents, and it is worth following even outside MCP because it encodes the right defaults [1].

**Roles.** A protected MCP server acts as an **OAuth 2.1 resource server**; the MCP client acts as an **OAuth 2.1 client** making requests on behalf of a resource owner. Authorization is optional in the protocol, and servers using STDIO transport are told *not* to follow it, taking credentials from the environment instead.

**Audience binding is mandatory.** Clients **MUST** implement Resource Indicators for OAuth 2.0 ([RFC 8707](https://www.rfc-editor.org/rfc/rfc8707.html)), sending a `resource` parameter identifying the intended server in both authorization and token requests. Servers **MUST** validate that a token was issued specifically for them as the intended audience.

**Token passthrough is prohibited.** The specification is explicit: MCP servers **"MUST only accept tokens that are valid for use with their own resources"** and **"MUST NOT accept or transit any other tokens."** Clients must not send tokens issued by anyone other than that server's authorization server.

This last rule is the important one and the most commonly violated. The tempting design — accept the user's token and forward it to whatever downstream API the tool needs — turns every server into a confused deputy and lets a stolen token move laterally. Each hop gets its own audience-bound token.

**Least privilege by construction.** Servers **SHOULD** advertise required scopes in the `WWW-Authenticate` challenge; clients request only what an operation needs and escalate through a **step-up authorization** flow on an `insufficient_scope` error rather than requesting everything up front.

## Design rules

**One OAuth client per agent, not per platform.** Distinct client IDs are what make per-agent revocation and per-agent audit possible.

**Short-lived, narrowly scoped tokens.** Minutes, not months, and scoped to the specific resource. An agent loop that runs for an hour should be refreshing, not holding a long-lived credential.

**Log the full chain.** Every audit record should carry agent identity, agent version, workload identity, principal, and a run or trace ID. Without the run ID you cannot reconstruct a multi-step action; without the principal you cannot answer whether the action was authorised at all.

**Make the risky actions require fresh authority.** Reading and writing are not equivalent. Anything irreversible — sending money, deleting data, emailing externally, deploying — should require step-up authorisation or a human confirmation that names the specific action, not a blanket approval. The same reasoning that applies to [physical device limits](/news/anthropic-model-hardware-standard/) applies here: enforce the constraint in the authorisation layer, not in the prompt. A limit the model can reason its way past is not a limit.

**Do not delegate more than the user has.** Sounds obvious; violated constantly, because the agent is usually built with a platform credential and the user check is left implicit.

**Plan for revocation.** You should be able to answer: how do we stop one agent, right now, without stopping the others? If the answer involves rotating a shared secret, the design is wrong.

## Why this is urgent now

Two protocol shifts made agent identity a live production concern rather than a design exercise. MCP standardised how agents reach tools, and A2A standardises how agents reach **other agents** — both now governed under the same foundation, as covered in [A2A joining the Agentic AI Foundation](/news/a2a-joins-agentic-ai-foundation/). Agent-to-agent delegation is strictly harder than agent-to-tool: authority is passed across an organisational boundary, and each hop must narrow permissions rather than preserve them.

MCP's first year also demonstrated what happens when an agent standard scales faster than its security model — [more than 40 CVEs and a tool-poisoning attack class](/news/mcp-security-vulnerabilities-2026/), with credential exposure the most common problem found in the wild. Identity is the control that limits the blast radius when the other controls fail.

## Further reading

- [Zero trust for AI](/patterns/zero-trust-ai/): workload identity, mTLS, and authorization policy.
- [Model Context Protocol](/glossary/model-context-protocol/): what MCP is and where authorization fits.
- [MCP security vulnerabilities 2026](/news/mcp-security-vulnerabilities-2026/): the failure modes this guards against.
- [A2A joins the Agentic AI Foundation](/news/a2a-joins-agentic-ai-foundation/): agent-to-agent delegation.
- [AI security best practices](/guides/ai-security-best-practices/): the wider control set.
- [Guardrails](/glossary/guardrails/): the complementary control on model behaviour.
- [Authentication and authorization](/glossary/authentication-and-authorization/): the underlying concepts.

## Sources

1. Model Context Protocol. "Authorization" specification. [https://modelcontextprotocol.io/specification/draft/basic/authorization](https://modelcontextprotocol.io/specification/draft/basic/authorization)
2. IETF. "The OAuth 2.1 Authorization Framework" (draft-ietf-oauth-v2-1). [https://datatracker.ietf.org/doc/html/draft-ietf-oauth-v2-1-13](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-v2-1-13)
3. IETF. "Resource Indicators for OAuth 2.0" (RFC 8707). [https://www.rfc-editor.org/rfc/rfc8707.html](https://www.rfc-editor.org/rfc/rfc8707.html)
4. IETF. "OAuth 2.0 Protected Resource Metadata" (RFC 9728). [https://datatracker.ietf.org/doc/html/rfc9728](https://datatracker.ietf.org/doc/html/rfc9728)
5. IETF. "OAuth 2.0 Bearer Token Usage" (RFC 6750). [https://datatracker.ietf.org/doc/html/rfc6750](https://datatracker.ietf.org/doc/html/rfc6750)
6. SPIFFE. "Secure Production Identity Framework for Everyone." [https://spiffe.io/](https://spiffe.io/)
7. OWASP. "Top 10 for Large Language Model Applications." [https://owasp.org/www-project-top-10-for-large-language-model-applications/](https://owasp.org/www-project-top-10-for-large-language-model-applications/)
