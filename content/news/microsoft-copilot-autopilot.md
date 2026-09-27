---
title: "Microsoft Rebuilds Copilot Around Home, Code and Autopilot, and Moves Agentic Work to Usage-Based Billing"
description: "On 25 September 2026 Microsoft split the Copilot app into Home, Code and Autopilot, a persistent cloud-hosted agent formerly called Scout. Cowork, Code, Autopilot and frontier models such as Astra and Fable move to usage-based billing, while the per-user licence keeps Chat and the Office apps."
date: 2026-09-25
lastmod: 2026-09-25
last_verified: 2026-09-25
categories: [News]
tags: [microsoft, copilot, ai-agents, autopilot, pricing, usage-based-billing, enterprise-ai, finops]
related:
  - news/microsoft-frontier-company
  - tools/github-copilot
  - guides/ai-cost-accounting
  - guides/agent-identity-and-authorization
---

Microsoft announced a restructured **Microsoft Copilot** on 25 September 2026, in a post by Jared Spataro, Microsoft's Chief Marketing Officer for AI at Work. The Copilot app now has three capabilities: **Home**, which merges Chat and Cowork and builds Word, Excel and PowerPoint into Copilot; **Code**, a natural-language app builder that runs on the same underlying technology as GitHub Copilot; and **Autopilot**, a persistent, cloud-hosted agent that keeps working when the user is away. The more consequential change for buyers is billing. **Cowork, Code, Autopilot and frontier models such as OpenAI's Astra and Anthropic's Fable now run on usage-based billing**, while the per-user licence covers everyday Chat and Office use.

## What happened

**Home.** Microsoft calls Home the new starting point. It combines **Chat**, for quick questions and drafts, with **Cowork**, where a user defines a task and Copilot runs it end to end, for example an RFP response or a financial close package. With **Office in Copilot**, a request from Home creates or updates a real, editable Word document, Excel workbook or PowerPoint deck that stays in sync with the Office apps. Microsoft says a future update will route requests to Chat, Cowork or Code automatically. A proactive **Today** view across mail, calendar, Teams and tasks enters private preview in October.

**Code.** Users describe an app, tracker, dashboard, automation or workflow, and Copilot builds it, from desktop widgets to cloud-hosted internal apps that can be shared with a team. Code runs in a sandbox and can be hosted within the customer's tenant. Microsoft says developers will keep using GitHub Copilot for day-to-day work. Alongside Code, Microsoft introduced **Copilot Managed Runtime**, hosting infrastructure that runs code inside a company's Microsoft 365 environment under IT governance. It is in preview and open to third-party and pro-code developers. **Code rolls out to the Frontier program at the end of September**, with broad availability in the coming weeks and a preview for Microsoft 365 Premium and Pro subscribers later this year.

**Autopilot.** Previously called **Scout**, Autopilot is described as a digital teammate. The user gives it a name, a role and a goal, and it watches channels, follows up on threads, runs recurring work and picks a project back up days later "without waiting for a prompt." Per Microsoft, each Autopilot **lives in the customer's tenant with its own identity, memory, computer and workspace**. It is grounded in Microsoft IQ, can be @mentioned in Teams, Outlook, chats and documents, and comes with permissions, audit and governance. **Autopilot expands to private preview at the end of September.** The Decoder reported that Autopilot is built on OpenClaw. Microsoft's announcement does not say this. The Decoder also reported that Satya Nadella intends to bring Autopilot to consumers eventually.

**Billing.** Microsoft now splits Copilot spend in two:

| | User subscription licence (USL) | Usage-based billing (UBB) |
|---|---|---|
| Covers | Copilot Chat; Copilot in Word, Excel, PowerPoint, Outlook, Teams; model selection; "Auto" routing | Cowork, Code, Autopilot, other long-running agentic capabilities, frontier models such as Astra and Fable |
| Cost model | Fixed per user | Metered to usage |

**Auto** weighs accuracy, speed and cost on each request to pick a model. Admins can restrict which model families are available to which user groups, and those settings also limit what Auto can choose. The Decoder described the split as Microsoft pulling back from subsidising AI usage through flat-rate plans.

**Other announcements.** New **FinOps for AI** controls extend cost management in Agent 365 to Code and Copilot Managed Runtime, with Copilot Studio agents planned for October. The controls include API-managed spending policies, credit-request approval workflows, and credit balances that end users can see. A **plugin registry** brings Microsoft, partner and custom plugins into one catalogue that IT approves centrally. **Fabric IQ** grounding, drawing on Power BI semantic models, is generally available in Chat and Cowork, and Dynamics 365 and Power Platform grounding enters public preview over the next month. **@Copilot in Teams**, which shares a channel's or meeting's context with the whole team, enters private preview by the end of the month.

## Why it matters for builders

**Budget agentic Copilot use as metered consumption, not a seat.** For organisations that treated Copilot as a flat per-user cost, the licence now covers only the chat-and-Office layer. Delegated tasks, generated apps, background agents and frontier-model access are all metered. Before rolling Cowork or Autopilot out widely, set up the new spending policies and model-family restrictions, and decide who approves credit requests. See [AI cost accounting](/guides/ai-cost-accounting/) for the allocation side.

**Autopilot is another non-human identity in your tenant.** An agent with its own identity, memory and cloud computer, acting in Teams and Outlook without a prompt, needs the same scoping as a service account: least-privilege permissions, a named owner, and audit review. [Agent identity and authorization](/guides/agent-identity-and-authorization/) covers the controls.

**Citizen-built apps will need governance.** Code and Managed Runtime make it easy for non-developers to ship internal apps connected to live data. Tenant hosting and central plugin approval help, but IT will still need an inventory of what gets built and what data each app can reach. This is the [shadow AI](/glossary/shadow-ai/) problem, now running inside sanctioned infrastructure. For context on how Microsoft has been positioning its agent strategy, see [Microsoft's "Frontier company" push](/news/microsoft-frontier-company/).

## Sources

1. Microsoft, "Introducing the new Copilot with Home, Code and Autopilot", Jared Spataro (25 September 2026): [https://blogs.microsoft.com/blog/2026/09/25/introducing-the-new-copilot-with-home-code-and-autopilot/](https://blogs.microsoft.com/blog/2026/09/25/introducing-the-new-copilot-with-home-code-and-autopilot/)
2. The Decoder, "Microsoft gives Copilot another makeover, adding an Autopilot agent and usage-based billing" (25 September 2026): [https://the-decoder.com/microsoft-gives-copilot-another-makeover-adding-an-autopilot-agent-and-usage-based-billing/](https://the-decoder.com/microsoft-gives-copilot-another-makeover-adding-an-autopilot-agent-and-usage-based-billing/)

## Further reading

- [GitHub Copilot](/tools/github-copilot/): the developer tool whose technology underpins Code.
- [Microsoft's "Frontier company" push](/news/microsoft-frontier-company/): earlier context on Microsoft's agent strategy.
- [Claude Cowork](/tools/claude-cowork/): a comparable delegated-work product from Anthropic.
