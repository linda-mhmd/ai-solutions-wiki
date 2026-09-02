---
title: "A2A Moves Again: Google's Agent Protocol Joins MCP at the Agentic AI Foundation"
description: "On 17 August 2026 the Agent2Agent protocol was accepted as a Growth Stage project at the Linux Foundation's Agentic AI Foundation, putting the agent-to-agent and agent-to-tool standards under one governance body."
date: 2026-08-17
lastmod: 2026-09-02
last_updated: 2026-09-02
categories: [News]
tags: [a2a, mcp, open-standards, interoperability, ai-agents, linux-foundation, governance]
related:
  - news/a2a-protocol-linux-foundation
  - glossary/model-context-protocol
  - guides/multi-agent-systems-101
  - patterns/agentic-workflows
---

On **17 August 2026** the **Agent2Agent (A2A)** protocol was accepted as a **Growth Stage project at the Agentic AI Foundation (AAIF)**, the Linux Foundation body created in December 2025 to host agent standards. A2A had already been at the Linux Foundation since [Google donated it in June 2025](/news/a2a-protocol-linux-foundation/); this move consolidates it alongside the **Model Context Protocol** under a single foundation and technical governance structure.

## What happened

The AAIF was announced by the Linux Foundation on **9 December 2025** with three founding projects: Anthropic's **MCP**, Block's **goose**, and OpenAI's **AGENTS.md**. It was co-founded by Anthropic, Block, and OpenAI, with support from Google, Microsoft, AWS, Cloudflare, and Bloomberg.

A2A's acceptance as a Growth Stage project puts the two halves of the agent interoperability problem in the same place:

| Layer | Standard | Question it answers |
|---|---|---|
| Agent → tools and data | **MCP** | How does one agent reach a database, an API, a file? |
| Agent → agent | **A2A** | How do agents from different vendors discover each other and delegate work? |

A2A itself is unchanged: HTTP and JSON messaging, **Agent Cards** as the capability-description format, TLS and OIDC for security, Apache 2.0. It is governed by a technical steering committee drawn from eight companies. Reporting puts AAIF membership growth from fewer than 40 at launch to more than 250 by August 2026 — a figure worth treating as approximate, since foundation membership tiers are counted differently by different sources.

## Why it matters for builders

**The "which protocol wins" question is largely settled, and the answer is neither.** MCP and A2A are complementary layers, and they now share a governance home, a set of members, and overlapping technical leadership. If you have been deferring a multi-agent architecture decision waiting for consolidation, the consolidation happened. Build with both: MCP to give each agent tools, A2A to let agents cooperate across organisational boundaries. See [multi-agent systems 101](/guides/multi-agent-systems-101/).

**Neutral governance is the substantive change, not the technical one.** Nothing about A2A's wire format changed on 17 August. What changed is that Google no longer sits at the top of its escalation path, and the same is true of Anthropic and MCP. For anyone whose procurement or architecture review asks "what happens if the vendor deprecates this," a Linux Foundation project with a multi-company TSC is a materially better answer than a vendor specification.

**One governance body is also one concentration point.** Consolidation reduces fragmentation and increases the consequence of the foundation's decisions. The security record here is not clean — MCP accumulated [more than 40 CVEs and a tool-poisoning attack class](/news/mcp-security-vulnerabilities-2026/) during its first year of rapid adoption, and A2A's cross-organisational trust model is a strictly harder problem than MCP's. Watch what the AAIF does about authorization and agent identity across the two specs; that is where the next round of vulnerabilities will be.

**Anthropic's [Model Hardware Standard](/news/anthropic-model-hardware-standard/), previewed ten days later, uses MCP as one of its transports.** The stack is stratifying: hardware under tools under agents, each with its own spec, increasingly under one roof.

## Sources

1. A2A Protocol project blog, announcements: [https://a2a-protocol.org/latest/blog/category/announcements/](https://a2a-protocol.org/latest/blog/category/announcements/)
2. Axios, "Google's A2A protocol gets a new home" (17 August 2026): [https://www.axios.com/2026/08/17/a2a-agentic-ai-foundation-open-ai-standards](https://www.axios.com/2026/08/17/a2a-agentic-ai-foundation-open-ai-standards)
3. Linux Foundation, "Linux Foundation Announces the Formation of the Agentic AI Foundation" (9 December 2025): [https://www.linuxfoundation.org/press/linux-foundation-announces-the-formation-of-the-agentic-ai-foundation](https://www.linuxfoundation.org/press/linux-foundation-announces-the-formation-of-the-agentic-ai-foundation)
4. Model Context Protocol blog, "MCP joins the Agentic AI Foundation" (9 December 2025): [https://blog.modelcontextprotocol.io/posts/2025-12-09-mcp-joins-agentic-ai-foundation/](https://blog.modelcontextprotocol.io/posts/2025-12-09-mcp-joins-agentic-ai-foundation/)
5. OpenAI, "OpenAI co-founds the Agentic AI Foundation under the Linux Foundation": [https://openai.com/index/agentic-ai-foundation/](https://openai.com/index/agentic-ai-foundation/)
6. Techstrong.ai, "Google Moves A2A Under Agentic AI Foundation": [https://techstrong.ai/articles/google-moves-a2a-under-agentic-ai-foundation/](https://techstrong.ai/articles/google-moves-a2a-under-agentic-ai-foundation/)
7. arXiv, "Security Threat Modeling for Emerging AI-Agent Protocols: A Comparative Analysis of MCP, A2A, Agora, and ANP": [https://arxiv.org/pdf/2602.11327](https://arxiv.org/pdf/2602.11327)

## Further reading

- [Google's A2A protocol moves to the Linux Foundation](/news/a2a-protocol-linux-foundation/): the 2025 donation and what A2A actually does.
- [MCP security vulnerabilities 2026](/news/mcp-security-vulnerabilities-2026/): what happened the last time an agent standard scaled fast.
- [Multi-agent systems 101](/guides/multi-agent-systems-101/): where each protocol fits in a real architecture.
- [Single agent vs multi-agent](/comparisons/single-agent-vs-multi-agent/): whether you need A2A at all.
- [Agentic workflows](/patterns/agentic-workflows/): the patterns these standards serve.
