---
title: "Google's Gemini Agent: One Agent for Work, Coworker Agents With Their Own Email"
description: "At Gemini at Work 2026 on 8 October, Google Cloud introduced the Gemini agent: a single agent for chat, tasks and code that spawns sub-agents, gives persistent coworker agents their own identity and email address, and routes work to Gemini or Claude models."
date: 2026-10-08
lastmod: 2026-10-08
last_updated: 2026-10-08
last_verified: 2026-10-08
categories: [News]
tags: [google, gemini, ai-agents, enterprise, agent-identity, multi-agent, governance]
related:
  - tools/google-gemini
  - tools/meta-muse
  - news/gemini-4-argon
  - news/microsoft-copilot-autopilot
  - glossary/multi-agent-orchestration
---

Google Cloud CEO Thomas Kurian used the Gemini at Work 2026 keynote on 8 October to introduce **the Gemini agent**: one agent that answers questions, does knowledge work, creates media and writes and runs code, through one interface and one API. It arrived a month after Meta's consumer [Muse](/tools/meta-muse/) and nine days after OpenAI's dots, and it is aimed squarely at enterprises.

## What is actually different

**Sub-agents and coworker agents.** For a multi-step job, Gemini creates temporary, job-specific sub-agents, each with its own identity, and coordinates them in parallel or in sequence over hours or days. **Coworker agents** are the persistent version: an agent with a defined role, its own storage, access only to the context a team gives it, and its own identity, including an `@agents.company.com` email address. In Google Workspace a coworker agent gets a full account with email, calendar, Drive and a directory entry, can be @mentioned in Chat, and suggests edits in Docs under its own name in version history.

**Model choice, including Claude.** Gemini routes each job to the model it judges best. Google says that today includes Gemini models and Anthropic's Claude models, with other private and open models planned. A "Smart Routing" option picks the cheapest model that meets the bar.

**Memory, in four kinds.** Google names session, semantic, procedural (including skills the agent writes for itself) and episodic memory, with one memory and personalisation graph across devices.

**Reach.** Web, iOS, Android, Windows, Mac, the command line, Workspace, Microsoft 365 and Slack, plus a headless mode for embedding in other apps. Connectors cover Confluence, Jira, Salesforce, ServiceNow, BigQuery, Databricks, Snowflake, Postgres and more, and any MCP server.

**Governance.** Each agent has a cryptographically attested identity with least-privilege permissions approved by security administrators; every action is logged against the agent, not a person; agents run in an **Agent Sandbox** with their own network boundary; and an **Agent Gateway** acts as a policy firewall for all agent traffic. Spend caps can pause a project's agent when its budget is hit.

**What Google did not say.** The keynote post gives no pricing, no general-availability date and no regional availability for the agent itself. Launch coverage describes it as a private preview for enterprise customers. Industry versions for financial services and legal are in preview; government, healthcare and retail are "coming soon".

## Why it matters for builders

The identity model is the real news. An agent with its own mailbox, calendar, directory entry and audit trail is treated as a member of staff rather than as a feature of someone's account, which is what security teams have been asking for: you can scope it, review its access and revoke it like a service account. It is the opposite design choice to Muse, which acts *as you* inside your accounts. Microsoft's [Copilot Autopilot](/news/microsoft-copilot-autopilot/) went the same way as Google in September. Expect "does the agent have its own identity?" to become a standard procurement question.

The Claude routing is also worth noting. Google's flagship agent product sends some work to a competitor's models, which says a lot about how much model choice now matters to enterprise buyers, and it means data-processing reviews have to cover more than one model provider behind a single product.

For EU teams: nothing announced is generally available yet, so there is no residency or regional detail to plan against. Ask for it before any pilot.

## Sources

- Google Cloud, "Welcome to Gemini at Work 2026: Introducing the Gemini agent", Thomas Kurian (8 October 2026): https://cloud.google.com/blog/products/ai-machine-learning/welcome-to-gemini-at-work-2026
- TechCrunch, "Google brings agentic AI to Gemini, starting with businesses" (8 October 2026), secondary, for preview status: https://techcrunch.com/2026/10/08/google-brings-agentic-ai-to-gemini-starting-with-businesses/

## Further reading

- [Meta Muse, explained in full](/tools/meta-muse/): the consumer agent, with a comparison of Muse, dots, Gemini and Cowork.
- [Gemini 4 Argon](/news/gemini-4-argon/): the frontier model Google names as the agent's reasoning tier.
- [Microsoft Copilot Autopilot](/news/microsoft-copilot-autopilot/): Microsoft's agents with their own identity.
- [Multi-agent orchestration](/glossary/multi-agent-orchestration/): the pattern behind sub-agents.
