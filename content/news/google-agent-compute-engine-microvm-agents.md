---
title: "Google Agent Compute Engine: One MicroVM per Agent, Paused While It Waits"
description: "On 22 October 2026 Google Cloud announced Agent Compute Engine, a microVM service that gives each agent its own isolated computer with snapshot and resume, plus Agent Substrate for GKE and new Agent Gateway controls. Preview is months away; here is what is available now."
date: 2026-10-22
lastmod: 2026-10-28
last_updated: 2026-10-28
last_verified: 2026-10-28
categories: [News]
tags: [google-cloud, ai-agents, agent-infrastructure, sandboxing, microvm, gke, agent-governance, agent-identity]
related:
  - tools/google-vertex-ai
  - news/google-gemini-agent-gemini-at-work
  - guides/agent-identity-and-authorization
  - glossary/zero-trust
  - news/anthropic-unintended-model-actions-georgia-data
  - news/ai-agent-security-roundup-october-2026
---

On **22 October 2026** Google Cloud announced **Agent Compute Engine**, "a purpose-built compute service that already powers Gemini as an agent for work tasks" and "gives every Gemini agent its own high-performance, secure computer". The same post introduced **Agent Substrate**, an open-source way to run agents the same way on GKE, and new governance features for **Agent Gateway**. Only Agent Substrate is usable today. Agent Compute Engine "will be available in preview in the coming months", with no price or region list published.

## What happened

### Agent Compute Engine

Google describes four properties:

- **Hardware isolation per agent.** Each session runs in a microVM behind "a hardware-isolated Cloud Hypervisor boundary with its own guest kernel and root access", on Google's Titanium hardware.
- **Pause and resume.** Google says it can "pause a running microVM while an agent waits on a human or an external system, and quickly resume it from snapshots", and uses "copy-on-write memory sharing to run multiple agents on a single operating system template". Agents spend much of their time waiting for tools, approvals or people, and paying for an idle VM during that time is the cost problem this addresses.
- **Persistent workspace.** "Each Agent Compute Engine microVM has its own Hyperdisk, enabling persistence of execution workspaces and agent context."
- **Credentials kept outside the agent.** "Each microVM runs its agent's own identity, using short-lived credentials. Every microVM also gets its own cryptographically verified ID, and service credentials are injected in egress outside the microVM." The agent can use a service without ever holding its secret.

The only named user is Gemini itself. Gautham Thambidorai of the Gemini team is quoted: the microVMs "give us the responsiveness, hardware isolation, and workload density needed to deliver interactive agent sandboxes to our users around the world." Customers are promised access "soon" for their own agents.

### Agent Substrate: available now, on GKE

Agent Substrate is open source and runs on GKE: "Try it on GKE today by visiting its open-source repository." It offers microVM or gVisor isolation, snapshot and resume of idle agents and Filestore-backed agent volumes, and Google says it "works with any agent framework or harness, including Claude Code, OpenClaw, and Hermes." Google reports a test of 200,000 agents with 500 activations per second and suspend and resume under 500 ms, and claims "as much as 10x higher compute density". These are Google's figures, not independently measured.

### Agent Gateway and governance

The post lists Agent Gateway, Agent Registry, Agent Identity ("unique secure ID using open standard based SPIFFE") and OpenTelemetry-based observability as core governance capabilities, without a status label. Statuses that are given:

| Feature | Status in the 22 October post |
|---|---|
| Agent Compute Engine | "preview in the coming months" |
| Agent Substrate on GKE | Available, open source |
| Cross-cloud policy enforcement points (Envoy-based) | "in preview soon" |
| Governance for local coding agents such as Claude Code and Antigravity CLI on managed devices | "in preview soon" |
| Agent Gateway token and cost governance, model routing policies, Service Extensions bindings, delegated user authorization (Ping Identity, SailPoint, Saviynt), Express Link for Cloud Run | "coming this quarter in preview" |

## What is actually different

Google already offers sandboxes on its agent platform: the Computer Use and Shell sandboxes became generally available on 9 September 2026 (see [Google Vertex AI](/tools/google-vertex-ai/)). What is new is a compute product shaped around the agent lifecycle: one VM-grade isolation boundary per agent, paid capacity released while the agent waits, and secrets injected outside the agent's reach. AWS has sold "managed, isolated execution for agents" as [AgentCore Runtime](/news/bedrock-agentcore-general-availability/) since October 2025; with this announcement, both of the largest clouds treat where an agent runs as a product of its own rather than a hosting detail.

## Why it matters for builders

- **Nothing to buy yet.** For managed Google infrastructure today, the GA option remains the existing Agent Platform sandboxes. To try the model now, Agent Substrate on GKE is the route.
- **Copy the credential pattern regardless of cloud.** Injecting service credentials at egress, outside the sandbox, means a prompt-injected or misbehaving agent cannot read and leak the secret. Anthropic's [report on unintended model actions](/news/anthropic-unintended-model-actions-georgia-data/) the same month is a reminder of why agents should not hold more access than the task needs.
- **Plan for per-agent identity.** SPIFFE-based identities per agent, logged against every action, are becoming the default design across vendors. See [agent identity and authorization](/guides/agent-identity-and-authorization/).
- **Ask about idle cost.** Agents that wait on humans for minutes or hours are expensive on always-on compute. Snapshot and resume is the feature to compare when the preview arrives.

## Sources

1. Google Cloud blog, Nirav Mehta, Michael Bachman and Kevin Hutchins, "Introducing Agent Compute Engine and expanded agent governance" (22 October 2026): [https://cloud.google.com/blog/topics/ai-infrastructure/introducing-agent-compute-engine-and-expanded-agent-governance](https://cloud.google.com/blog/topics/ai-infrastructure/introducing-agent-compute-engine-and-expanded-agent-governance)
2. Virtualization Review, "Google Builds a Cloud Runtime for AI Agents" (26 October 2026, secondary): [https://virtualizationreview.com/articles/2026/10/26/google-unveils-compute-engine-for-ai-agents.aspx](https://virtualizationreview.com/articles/2026/10/26/google-unveils-compute-engine-for-ai-agents.aspx)

## Further reading

- [Google Vertex AI and the Gemini Enterprise Agent Platform](/tools/google-vertex-ai/): the sandboxes that are GA today
- [Google's Gemini Agent](/news/google-gemini-agent-gemini-at-work/): the product Agent Compute Engine already runs
- [Amazon Bedrock AgentCore GA](/news/bedrock-agentcore-general-availability/)
- [Agent identity and authorization](/guides/agent-identity-and-authorization/)
- [Zero trust](/glossary/zero-trust/)
