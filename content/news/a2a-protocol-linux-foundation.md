---
title: "Google's A2A Protocol Moves to the Linux Foundation"
description: "Google donated the Agent2Agent (A2A) protocol to the Linux Foundation for vendor-neutral governance. What A2A is and how it relates to MCP."
date: 2025-06-23
lastmod: 2026-06-15
last_updated: 2026-06-15
categories: [News]
tags: ["a2a", "interoperability", "ai-agents", "open-standards", "linux-foundation", "mcp", "multi-agent"]
related:
  - glossary/model-context-protocol
  - guides/multi-agent-systems-101
  - patterns/agentic-workflows
  - tools/bedrock-agentcore
---

If you build with AI agents, the hard part is rarely a single agent. It is getting agents from different vendors and frameworks to talk to each other without bespoke glue for every pair. That is the gap the Agent2Agent (A2A) protocol aims to close, and on June 23, 2025, at Open Source Summit North America in Denver, Google donated A2A to the Linux Foundation for vendor-neutral governance. The new Agent2Agent project launched with Amazon Web Services, Cisco, Google, Microsoft, Salesforce, SAP, and ServiceNow as founding contributors. One year on, the protocol has crossed real adoption milestones, so it is worth understanding what it is and where it fits.

## What happened

Google first announced A2A in April 2025 (April 9, 2025) as an open standard for communication between distinct AI agents. On June 23, 2025, the company transferred the A2A specification, the accompanying SDKs, and developer tooling to the Linux Foundation, which formed the Agent2Agent project to provide long-term neutral governance. The protocol is released under the Apache 2.0 license.

A2A lets independent agents discover each other's capabilities, exchange information securely, and coordinate multi-step tasks across systems. It is built on familiar web foundations: HTTP and JSON-based messaging, with security handled by TLS, JSON Web Tokens, and OpenID Connect. A central concept is the Agent Card, a metadata document that describes what an agent can do and how to reach it, so agents can find and use one another without hand-wired integrations.

In its first year the project reported notable traction. The Linux Foundation says support grew from more than 50 to over 150 organizations, the GitHub repository passed 22,000 stars, and version 1.0, described as the first stable, production-ready specification, was released in March 2026. A2A has also landed in major platforms, including Microsoft Azure AI Foundry and Copilot Studio, AWS Amazon Bedrock AgentCore Runtime, and Google Cloud.

## Why it matters for builders

The most common point of confusion is A2A versus the Model Context Protocol (MCP). They are complementary, not competing. MCP connects a single agent to its tools and data sources. A2A connects agents to other agents, often across organizational boundaries. As Google's open source team put it, MCP manages internal tool integration while A2A handles external coordination between autonomous entities. A serious agent system will likely use both: MCP to give each agent access to tools, A2A to let those agents collaborate.

Vendor-neutral governance under the Linux Foundation matters because interoperability standards only deliver if no single vendor controls them. With AWS, Microsoft, Google, Salesforce, SAP, ServiceNow, and Cisco all contributing, A2A reduces the risk of lock-in and gives you a credible default for multi-agent interoperability rather than a proprietary handshake you have to reimplement per platform.

## What to do

- Treat A2A and MCP as two layers of the same stack, not an either/or choice. Use MCP for tool and data access, A2A for agent-to-agent coordination.
- Before committing, check the v1.0 specification and the official SDKs, and confirm your agent platform's A2A support. Azure AI Foundry, Bedrock AgentCore, and Google Cloud already expose it.
- If you are new to this, start with the fundamentals of [multi-agent systems]({{< relref "guides/multi-agent-systems-101" >}}) and the [Model Context Protocol]({{< relref "glossary/model-context-protocol" >}}), then look at [agentic workflow patterns]({{< relref "patterns/agentic-workflows" >}}) for how coordination plays out in practice.

## Sources

1. Linux Foundation. "Linux Foundation Launches the Agent2Agent Protocol Project to Enable Secure, Intelligent Communication Between AI Agents." (June 23, 2025) [https://www.linuxfoundation.org/press/linux-foundation-launches-the-agent2agent-protocol-project-to-enable-secure-intelligent-communication-between-ai-agents](https://www.linuxfoundation.org/press/linux-foundation-launches-the-agent2agent-protocol-project-to-enable-secure-intelligent-communication-between-ai-agents)
2. Google Developers Blog. "Google Cloud donates A2A to Linux Foundation." (June 23, 2025) [https://developers.googleblog.com/en/google-cloud-donates-a2a-to-linux-foundation/](https://developers.googleblog.com/en/google-cloud-donates-a2a-to-linux-foundation/)
3. Google Open Source Blog. "A year of open collaboration: Celebrating the anniversary of A2A." (April 16, 2026) [https://opensource.googleblog.com/2026/04/a-year-of-open-collaboration-celebrating-the-anniversary-of-a2a.html](https://opensource.googleblog.com/2026/04/a-year-of-open-collaboration-celebrating-the-anniversary-of-a2a.html)
4. Linux Foundation. "A2A Protocol Surpasses 150 Organizations, Lands in Major Cloud Platforms, and Sees Enterprise Production Use in First Year." (April 9, 2026) [https://www.linuxfoundation.org/press/a2a-protocol-surpasses-150-organizations-lands-in-major-cloud-platforms-and-sees-enterprise-production-use-in-first-year](https://www.linuxfoundation.org/press/a2a-protocol-surpasses-150-organizations-lands-in-major-cloud-platforms-and-sees-enterprise-production-use-in-first-year)
5. InfoWorld. "Google's Agent2Agent project moves to Linux Foundation." (June 23, 2025) [https://www.infoworld.com/article/4011301/googles-agent2agent-project-moves-to-linux-foundation.html](https://www.infoworld.com/article/4011301/googles-agent2agent-project-moves-to-linux-foundation.html)
6. Wikipedia. "Agent2Agent." [https://en.wikipedia.org/wiki/Agent2Agent](https://en.wikipedia.org/wiki/Agent2Agent)

## Further reading

- [What is the Model Context Protocol?](/glossary/model-context-protocol/): the tool-access protocol A2A complements.
- [MCP turns one](/news/mcp-turns-one/): the sister protocol's anniversary release.
- [What are multi-agent systems?](/glossary/multi-agent-systems/): the coordination A2A enables.
- [What are AI agents?](/glossary/ai-agents/): the participants an agent-to-agent protocol connects.
