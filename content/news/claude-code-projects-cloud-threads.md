---
title: "Claude Code Relaunches Projects as Coordinated Parallel Cloud Threads"
description: "On 17 September 2026 Anthropic released redesigned projects in beta for select Claude Pro and Max users of Claude Code: a coordinator splits a goal into parallel threads, each a full Claude Code cloud session on its own branch, with shared memory and a file library. Anthropic warns projects reach usage limits faster."
date: 2026-09-17
lastmod: 2026-09-25
last_verified: 2026-09-25
categories: [News]
tags: [anthropic, claude-code, coding-agents, multi-agent, cloud-sessions, developer-tools]
related:
  - tools/claude-code
  - news/coding-agents-2026
  - guides/multi-agent-systems-101
---

Anthropic released **redesigned projects in Claude Code** on 17 September 2026, in beta for **select Claude Pro and Max subscribers**. The old projects feature was a folder-like workspace with its own chat history and knowledge base. In the new version, a project is a conversation with a **coordinator** that takes a goal, splits it up, and runs the work as **parallel threads**. Each thread is a full Claude Code cloud session with its own Git branch and its own copy of the repository. In Anthropic's words, Claude "scopes the request, delegates the work, coordinates parallel threads, reviews the outputs, and assembles the finished result."

## What happened

**How it works.** When starting a project, the user sets a goal and connects one or more repos or other context. They can also configure the project's cloud environment, connectors, plugins, instructions and model. Claude first suggests work it can pick up right away. The user can steer everything from the main project chat or go into an individual thread, including from a phone, and work continues after the user steps away. With repositories connected, threads open pull requests and run tests. With documents, they read and draft.

Anthropic gives two examples. One is reducing an app's checkout p75 latency by profiling each endpoint, testing optimisations and opening PRs in parallel threads. The other is retiring a deprecated v1 endpoint across API, web and mobile repos, with one thread per repo migrating callers and running tests. In that example the coordinator also reports which PRs need to merge first.

**Coordination model.** The coordinator keeps the work organised, but it does not prevent collisions. **If two threads touch the same code, the overlap shows up as an ordinary merge conflict**, just like any other PR. Each thread can split its own work further using subagents, loops and workflows.

**Memory and library.** Every thread adds to and reads from a **shared project memory**. Anthropic's examples of what it retains include that "the release moved to Friday," why an export was dropped, or who to check with before touching the billing service. The memory also records the user's working style, such as how often to check in and how detailed updates should be. A **library** collects the files the user adds and the artifacts Claude produces.

**Cost warning.** Anthropic says it plainly: "Projects can run several threads at once, and each one is a full Claude Code session. Because of this, projects can reach usage limits faster." Users can see project-specific usage and choose the model and effort level separately for the coordinator and the worker threads. The Register headlined its story "work and pay in parallel."

**Availability.**

- Beta at launch for select Pro and Max subscribers who use cloud sessions in Claude Code and have **no existing projects** on the web or desktop.
- Access expands to more Pro and Max Claude Code users over the following week. Others can join a waitlist.
- Updated projects across all of Claude (chat and Cowork) and for **Team and Enterprise** plans come after that.
- Existing projects keep working as before and will be upgraded as the rollout reaches chat and Cowork.
- Threads run only in the cloud for now. Anthropic says running them locally, alongside local tools and behind a company network, is "coming very soon."

**Where it fits.** The Register counts five ways Claude Code can now run work in parallel: subagents within a session, Agent View for monitoring independent tasks, Agent Teams for coordinating Claude Code instances that talk to each other, Dynamic Workflows for script-orchestrated subagents, and now projects. The Register says projects are aimed at work that spans multiple repositories, migrations that need more than one session, or ongoing non-code work such as a support-ticket queue.

## Why it matters for builders

**Plan for merge conflicts, not seamless coordination.** Because threads work on separate branches and overlaps surface as ordinary PR conflicts, the design works best when the goal splits cleanly, for example by repo, service or endpoint. For tasks that repeatedly touch the same files, expect conflict resolution work at the end. Break goals into independent units before handing them to the coordinator. [Multi-agent systems 101](/guides/multi-agent-systems-101/) covers the trade-offs.

**Parallelism multiplies spend.** Every thread is a full session, so a project with five threads uses roughly five sessions' worth of limits. Use the separate model and effort settings, for example a lighter model for routine worker threads, and watch the project usage view during early runs.

**Review is still yours.** Threads open PRs and run your tests, which is a good fit for existing branch protection and CI. Keep required reviews in place, because the coordinator's own review of thread output does not replace them. Shared memory also means a mistaken note, such as a wrong deadline or a misremembered constraint, can carry into later threads. It is worth checking what the project has "learned" from time to time. For the tool itself, see [Claude Code](/tools/claude-code/). For the wider market move towards parallel agents, see [coding agents in 2026](/news/coding-agents-2026/).

## Sources

1. Anthropic, "Projects redesigned: from folder to conversation" (17 September 2026): [https://claude.com/blog/projects-redesigned](https://claude.com/blog/projects-redesigned)
2. The Verge, "Claude Code relaunches Projects to manage multiple AI agents in the cloud" (17 September 2026): [https://www.theverge.com/ai-artificial-intelligence/997134/anthropic-claude-code-projects](https://www.theverge.com/ai-artificial-intelligence/997134/anthropic-claude-code-projects)
3. The Register, "Claude Code revamps projects so you can work and pay in parallel" (18 September 2026): [https://www.theregister.com/ai-and-ml/2026/09/18/claude-code-revamps-projects-so-you-can-work-and-pay-in-parallel/5297532](https://www.theregister.com/ai-and-ml/2026/09/18/claude-code-revamps-projects-so-you-can-work-and-pay-in-parallel/5297532)

## Further reading

- [Claude Code](/tools/claude-code/): the tool page.
- [Claude Cowork](/tools/claude-cowork/): where updated projects are due to arrive next.
- [Multi-agent systems 101](/guides/multi-agent-systems-101/): coordinator/worker patterns and their failure modes.
