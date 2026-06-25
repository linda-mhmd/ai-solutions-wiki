---
title: "Anthropic brings Claude agents into Slack workflows"
description: "Anthropic launched Claude Tag, a shared Claude agent that teams tag inside Slack channels to delegate work asynchronously."
date: 2026-06-25
lastmod: 2026-06-25
categories: [News]
tags: ["anthropic", "claude", "ai-agents", "slack", "enterprise"]
related:
  - glossary/ai-agents
  - glossary/agentic-loops
  - glossary/model-context-protocol
---

<figure class="bz-figure"><img src="/img/juggling/neural-network-nodes-notext.png" alt="Interconnected glowing nodes forming a network on a black background, suggesting many people sharing one assistant." loading="lazy"><figcaption>One Claude per channel, shared across a whole team, is the structural change behind Claude Tag.</figcaption></figure>

On 23 June 2026, Anthropic launched Claude Tag, a way to bring a Claude agent directly into Slack channels. Team members type `@Claude`, hand it a task in plain language, and it works through the task in stages while posting threaded updates. The product matters because it moves Claude from a private chatbot into a shared workspace teammate, which is the kind of agentic workflow many enterprises are now trying to adopt.

## What Claude Tag does

According to Anthropic's release notes and reporting from VentureBeat, TechCrunch, and Fortune, Claude Tag has three behaviors that separate it from a standard chat assistant.

- **Delegated tasks.** Anyone in a channel tags `@Claude`, describes the work, and Claude breaks it into stages and works through them using connected tools, posting progress in the thread.
- **Shared identity and memory.** Within a channel there is one Claude that everyone interacts with. It retains context over time, so teammates can see what it is doing and continue tasks others started without re-explaining the background.
- **Asynchronous and proactive work.** With "ambient" mode enabled, Claude can surface relevant information on its own, follow up on threads that have gone quiet, and pursue projects over hours or days while the team works on other things.

This is an applied [AI agent](/glossary/ai-agents/): a system that plans a task, calls tools, and acts across multiple steps rather than answering a single prompt. The staged, post-as-you-go behavior is a visible [agentic loop](/glossary/agentic-loops/) running inside a chat thread.

## How a delegated task flows

<div class="bz-flow"><div class="bz-flow-step"><span class="bz-flow-step-tag">Step 1</span><span class="bz-flow-step-name">Tag</span><span class="bz-flow-step-desc">A team member types @Claude in a channel and describes the task in plain language.</span></div><div class="bz-flow-arrow">&rarr;</div><div class="bz-flow-step"><span class="bz-flow-step-tag">Step 2</span><span class="bz-flow-step-name">Plan</span><span class="bz-flow-step-desc">Claude breaks the request into stages and selects from the tools an admin has approved.</span></div><div class="bz-flow-arrow">&rarr;</div><div class="bz-flow-step"><span class="bz-flow-step-tag">Step 3</span><span class="bz-flow-step-name">Work</span><span class="bz-flow-step-desc">It works asynchronously, posting threaded updates so the channel can follow along.</span></div><div class="bz-flow-arrow">&rarr;</div><div class="bz-flow-step"><span class="bz-flow-step-tag">Step 4</span><span class="bz-flow-step-name">Hand off</span><span class="bz-flow-step-desc">A teammate continues the task or builds on it, using the shared context Claude holds.</span></div></div>

## The enterprise controls

Claude Tag uses an agent-identity model. In a channel, Claude works under the organization's identity with tools and access defined by an administrator, and usage is billed to the organization rather than to an individual. As reported, separate Claude identities stay scoped to their channels, so a sales Claude does not share data or memory with an engineering Claude. Administrators can set token-spend limits per channel and for the organization.

For teams connecting Claude to other systems, the relevant plumbing is the [Model Context Protocol](/glossary/model-context-protocol/), the open standard Anthropic introduced for linking AI assistants to tools and data sources.

## How it compares to what came before

| | Older Claude in Slack | Claude Tag |
|---|---|---|
| **Who it serves** | One user at a time | A whole channel, shared |
| **Memory** | Per conversation | Persistent across the channel |
| **Work style** | On-demand replies | Async, multi-stage, proactive |
| **Identity** | Personal account | Organization identity, admin-scoped |
| **Status** | Being retired | Beta for Enterprise and Team |

Anthropic says Claude Tag replaces the existing Claude in Slack app, which is reported to be discontinued on 3 August 2026, with administrators given 30 days to migrate and eligible organizations receiving launch credit. It is in beta for Claude Enterprise and Claude Team customers, with expansion to other platforms planned. One report states the agent runs on the Opus 4.8 model, though Anthropic's public notes do not stress a specific model, so treat that as reported.

Anthropic also offered an internal data point. Reporting describes it two ways: that 65% of its product team's code is created by its internal version of Claude Tag, and that the tool already incorporates 65% of the code changes the product team submits. The exact framing varies by source.

## Why it matters

Through 2025 the competitive question was mostly "which model is smartest." In 2026 the question is shifting to "which agent can actually do the work" inside the tools people already use. Putting a shared, memory-keeping agent into Slack channels is a direct expression of that shift. For enterprises, the appealing parts are the shared context and the admin-scoped access; the parts that need scrutiny are proactive behavior, data boundaries between teams, and how token spend is governed at scale. The agent-identity model is Anthropic's attempt to answer those governance questions up front.

## Further reading

- [What is an AI agent](/glossary/ai-agents/): how planning, tool use, and multi-step action differ from a single prompt
- [Agentic loops](/glossary/agentic-loops/): the plan-act-observe cycle behind staged, in-thread task execution
- [Model Context Protocol](/glossary/model-context-protocol/): the open standard for connecting assistants to tools and data
- [The 2026 LLM landscape](/comparisons/llm-landscape-2026/): how the major models and providers compare this year
- [VentureBeat](https://venturebeat.com/technology/anthropic-launches-claude-tag-replacing-its-slack-app-with-a-persistent-ai-teammate-that-learns-monitors-and-works-autonomously): launch coverage of Claude Tag and its autonomous behavior
- [TechCrunch](https://techcrunch.com/2026/06/23/anthropics-claude-tag-is-learning-your-company-one-slack-message-at-a-time/): how Claude Tag learns company context over time

## Sources

- [Anthropic release notes (via releasebot)](https://releasebot.io/updates/anthropic)
- [VentureBeat](https://venturebeat.com/technology/anthropic-launches-claude-tag-replacing-its-slack-app-with-a-persistent-ai-teammate-that-learns-monitors-and-works-autonomously)
- [TechCrunch](https://techcrunch.com/2026/06/23/anthropics-claude-tag-is-learning-your-company-one-slack-message-at-a-time/)
- [Fortune](https://fortune.com/2026/06/23/anthropic-claude-tag-virtual-employee-tool-slack/)
