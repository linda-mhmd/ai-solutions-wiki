---
title: "Microsoft 365 Outage Takes Down Copilot and the ChatGPT and Claude Connectors"
description: "From 12 November 2026, a Microsoft 365 outage cut off Exchange Online, Outlook, Teams, SharePoint and Microsoft 365 Copilot worldwide for more than a day. The AI assistants kept running but lost the mail and files they depend on, including the Microsoft 365 connectors in ChatGPT and Claude."
date: 2026-11-12
lastmod: 2026-11-13
last_updated: 2026-11-13
last_verified: 2026-11-13
categories: [News]
tags: [outage, reliability, microsoft, microsoft-365, copilot, connectors, incident-response, resilience]
related:
  - news/openai-anthropic-google-outages-sept-2026
  - news/ai-platform-outages-reliability-2026
  - patterns/multi-provider-llm-failover
  - guides/incident-management-ai
  - tools/mcp-protocol
---

<figure class="bz-figure">
  <img src="/img/enterprise-dark/server-room-corridor-notext.png" alt="A long, dim server-room corridor, suggesting the shared infrastructure many services sit on." loading="lazy">
  <figcaption>The AI assistants stayed up. What failed was the mailbox underneath them, and with it everything they were connected to.</figcaption>
</figure>

> **Preliminary.** Microsoft had not published a root cause or a post-incident report when this entry was written on 13 November 2026, and recovery was still in progress. We will update it when Microsoft's report appears.

On Thursday 12 November 2026, Microsoft 365 began failing for users around the world. Exchange Online mailboxes became unreachable, and with them Outlook, then Teams, SharePoint Online, **Microsoft 365 Copilot** and Microsoft Defender XDR. The disruption ran into a second day. For AI builders the interesting part is not that email went down. It is that the AI assistants on top of it, Microsoft's own and its competitors', kept running and simply lost the data they were connected to.

## What happened

All times are as reported; Microsoft's own incident records (EX1550543 for Exchange Online, MO1550821 for the wider Microsoft 365 incident) are in the admin centre and on Microsoft 365 Status, which we could not read directly.

- **Earlier on 12 November**, Microsoft was dealing with a separate Teams incident affecting users in North and South America. It has not said whether that incident is related.
- **Around 16:17 UTC (11:17 a.m. ET)**, Microsoft opened EX1550543: users may be unable to connect to their mailboxes in Exchange Online through multiple connection methods.
- **At 13:26 ET (18:26 UTC)**, the wider incident MO1550821 opened, covering Exchange Online, Teams, SharePoint Online, Microsoft 365 Copilot and Defender XDR.
- **Through the evening**, Microsoft reportedly paused deployments, brought some servers back with a workaround and saw partial recovery in some regions that did not hold. Downdetector counts reported by Reuters reached more than 97,000 Outlook reports at 14:07 ET; another count put the Outlook peak near 128,000.
- **On 13 November**, more than 12 hours in, Microsoft described "marginal success" with users in 74 countries still affected, according to Al Jazeera, then phased recovery across North America, Europe and Asia Pacific, with delayed mail being delivered and a backlog still to clear. Microsoft had not confirmed full restoration at the time of writing.

## What Microsoft has said about the cause

Not much that is final, and the explanation shifted during the day:

- Servers were experiencing **elevated load**, then **a number of servers were unexpectedly unavailable after failing automated health checks**, putting strain on the remaining infrastructure.
- Overnight Microsoft reportedly **began reverting a recent network configuration change** that lined up with the start, and later said it had **not identified a correlated change**. A report attributed to The Verge's Tom Warren linked the incident to Azure virtual-network configuration changes; Microsoft has not confirmed that.
- Microsoft said it saw **no indication of a cyberattack** or malicious activity.

Treat all of these as working explanations, not a root cause. Several administrators' blogs report that Microsoft promised a preliminary post-incident review within two business days and a final one within five; we could not confirm that against Microsoft's own pages.

## What it did to the AI tools

- **Microsoft 365 Copilot** was listed as affected. As BleepingComputer put it, Copilot and other assistants could not reach inboxes because the Exchange services underneath them were down: the assistant answered, but had nothing to work with.
- **ChatGPT**: OpenAI opened an incident on 12 November, "Elevated errors affecting the Microsoft 365 connector", with Connectors and Apps marked degraded.
- **Claude**: Anthropic's status page carried an incident with the same title, saying an issue with an upstream provider was affecting the Microsoft 365 connector. Claude for Outlook was affected too: mail and calendar actions could fail and some users could not open the add-in. Anthropic pointed users to Microsoft's status page. The Claude API and Claude Code were reported operational.
- **A separate Claude login problem on 13 November** was widely reported, with users logged out of Claude Code and OAuth errors at sign-in. Anthropic did not tie it to Microsoft's outage, and we treat it as a separate incident.

## Why it matters for builders

**Your agent is only as available as its least available connector.** This was not a model outage. The models behind Copilot, ChatGPT and Claude were all fine. What failed was the system of record they read from and write to. As assistants move from answering questions to doing work inside email, calendars and documents, an outage in that layer turns a working agent into one that fails every task. In the [September outages](/news/openai-anthropic-google-outages-sept-2026/) the models went down; this time the data did.

**Design for a dead connector.** Concretely:

- **Fail visibly.** An agent that cannot reach a mailbox should say so, not hallucinate an empty inbox or retry a send until it double-sends when service returns. Make tool errors explicit in your [MCP](/tools/mcp-protocol/) servers and connectors and teach the agent to stop.
- **Make writes idempotent.** Delayed mail was delivered as Exchange recovered. Any agent action queued during an outage, a reply, an invite, a file write, should carry an idempotency key so recovery does not run it twice.
- **Check the dependency, not just the model.** Health checks and status alerts for an AI feature should cover the services it acts on: Microsoft 365 Status, Google Workspace status, your CRM. Model-provider status pages would have shown this as a connector incident at best.
- **Do not count on failover.** [Multi-provider failover](/patterns/multi-provider-llm-failover/) protects you from a model outage. It did nothing here, because every provider's connector hit the same Exchange backend. If the mailbox is the single point of failure, the fallback is a human process, not another model.

**Concentration, again.** The same week brought a leadership crisis at [NVIDIA](/news/nvidia-ceo-jensen-huang-resigns/). Different layer, same lesson: a great deal of AI work now rests on a small number of vendors, and resilience planning has to name them.

## Sources

Reporting (we could not reach Microsoft 365 Status, the OpenAI status page or the Anthropic status page directly from our research environment; their wording above is as quoted by the outlets below):

- BleepingComputer, "Massive Microsoft 365 outage disrupts Outlook, Teams, Copilot worldwide" (12 November 2026): https://www.bleepingcomputer.com/news/microsoft/massive-microsoft-365-outage-disrupts-outlook-teams-copilot-worldwide/
- Al Jazeera, "Microsoft hit by global outages: What happened and why?" (13 November 2026): https://www.aljazeera.com/news/2026/11/13/microsoft-hit-by-global-outages-what-happened-and-why
- CNN, Microsoft outage live updates (12 to 13 November 2026): https://www.cnn.com/2026/11/12/business/live-news/microsoft-global-outage-intl-hnk
- ABC News, "Microsoft Outlook outage updates: 'Progress toward recovery' as email disruption now on 2nd day" (13 November 2026): https://abcnews.com/US/outlook-down-microsoft-outage-reported-mail/story?id=138088203
- The Hill, "Microsoft 'seeing encouraging recovery progress' in global Outlook, Teams outage" (13 November 2026): https://thehill.com/policy/technology/6218199-microsoft-outage-recovery-process/
- XDA Developers, on the reported Azure VNET link and partial recovery: https://www.xda-developers.com/microsoft-massive-outage-easing-up-outlook-teams-onedrive-other-services-remain-disrupted/
- Cybersecurity News, on MO1550821 and the affected services: https://cybersecuritynews.com/massive-microsoft-365-outage/
- Azure Blog UK, timeline, the reverted configuration change and the reported post-incident review schedule (third-party): https://azureblog.co.uk/posts/microsoft-365-outage-12-november-2026/
- Microsoft 365 Status on X, recovery update (13 November 2026): https://x.com/MSFT365Status/status/2121234739562450970
- The Next Web, on the outage passing 12 hours and its effect on AI services: https://thenextweb.com/news/microsoft-outage-outlook-teams-12-hours-global
- Indian Startup News, on the ChatGPT and Claude connectors: https://indianstartupnews.com/news/microsofts-massive-outage-enters-day-two-takes-chatgpt-and-claude-connectors-down-with-it-12806735
- Men's Journal, on the separate Claude login problem (13 November 2026): https://www.mensjournal.com/news/claude-suffers-major-outage-as-microsoft-struggles-to-restore-outlook
- Anthropic status page: https://status.claude.com/

## Further reading

- [ChatGPT, Claude and Gemini go down the same morning](/news/openai-anthropic-google-outages-sept-2026/): September's model-layer outages, for contrast.
- [AI platform outages and reliability in 2026](/news/ai-platform-outages-reliability-2026/): the year's pattern.
- [Multi-provider LLM failover](/patterns/multi-provider-llm-failover/): what it protects against, and what it does not.
- [Incident management for AI systems](/guides/incident-management-ai/): running an incident when the failing part is not yours.
