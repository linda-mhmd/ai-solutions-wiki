---
title: "OpenAI Launches ChatGPT Agent Mode, Combining Operator and Deep Research"
description: "ChatGPT can now browse the web, run code, and deliver finished documents using its own virtual computer. Agent mode merges Operator's browser control with deep research's synthesis into a single agentic system."
date: 2026-07-29
lastmod: 2026-07-30
last_updated: 2026-07-30
categories: [News]
tags: [openai, chatgpt, ai-agents, operator, deep-research]
related:
  - history/chatgpt-launch-november-2022
  - news/openai-gpt-5-5-and-5-6
  - news/coding-agents-2026
  - glossary/ai-agents
---

OpenAI launched ChatGPT agent mode on 29 July 2026, merging the browser-control capabilities of Operator with the synthesis capabilities of deep research into a unified agentic system. ChatGPT can now navigate websites, log into services, run code in a terminal, and deliver editable slideshows and spreadsheets, all using its own virtual computer. The Operator research preview will be sunset in the coming weeks.

## What it does

Agent mode gives ChatGPT a suite of tools: a visual browser for GUI interaction, a text-based browser for reasoning over large pages, a terminal for code execution, and direct API access. Users can connect apps through ChatGPT connectors (Gmail, GitHub, and others) so the agent can pull context from those services. When a site requires authentication, users take over the browser, log in, and hand control back.

The agent works iteratively. Users can interrupt at any point to clarify, steer, or change the task entirely. ChatGPT may ask for additional details when needed. If a task takes longer than expected, users can pause, request a progress summary, or stop and receive partial results. Completed tasks can be scheduled to recur automatically.

OpenAI says the model sets new state-of-the-art results on several benchmarks:

- **Humanity's Last Exam**: 41.6% pass@1, rising to 44.4% with parallel rollouts.
- **FrontierMath**: 27.4% accuracy with tool use, described as the hardest known math benchmark.
- **SpreadsheetBench**: 45.5% when editing spreadsheets directly, compared to 20.0% for Copilot in Excel.
- **BrowseComp**: 68.9%, 17.4 percentage points higher than deep research alone.

Slideshow generation is in beta. OpenAI notes that outputs can feel "rudimentary in formatting and polish" and that the next iteration is already in training.

## Availability and limits

Agent mode is rolling out to Pro, Plus, and Team users starting 29 July 2026. Pro users get 400 messages per month; other paid tiers get 40 messages monthly with additional usage available via credits. Enterprise and Education access follows in the coming weeks. The feature is not yet available in the European Economic Area or Switzerland.

Deep research remains available as a separate option in the composer dropdown for users who prefer longer, more detailed responses by default.

## Safety and risks

Because agent mode can take real-world actions, OpenAI implemented explicit user confirmation before consequential actions, active supervision ("Watch Mode") for critical tasks like sending emails, and proactive refusal of high-risk tasks like bank transfers. Users can delete all browsing data and log out of all sessions with a single click. Inputs entered during browser takeover are not collected or stored.

OpenAI treats the model as "High Biological and Chemical capabilities" under its Preparedness Framework and has activated corresponding safeguards, including dual-use refusal training, always-on classifiers, and reasoning monitors.

Prompt injection remains a risk for agentic systems. A malicious instruction hidden in a webpage could attempt to manipulate the agent. OpenAI says it has trained and tested the agent on identifying and resisting prompt injections and uses monitoring to detect attacks, but advises users to weigh tradeoffs when deciding what information to provide and to disable connectors when they are not needed for a task.

## Why it matters for builders

Agent mode is OpenAI's answer to the same question everyone building AI tooling is asking: how do you move from a model that answers questions to a model that finishes work? The architecture, a virtual computer with browser, terminal, and API access, is the pattern emerging across the industry.

For builders, two things to watch. First, the connector model (Gmail, GitHub, and more to come) is how OpenAI is handling data access. If you are building integrations, this is the surface your users will expect. Second, the explicit confirmation and Watch Mode patterns are worth studying as a template for how to ship agentic features safely.

## Sources

- OpenAI, "Introducing ChatGPT agent: bridging research and action" (29 July 2026): https://openai.com/index/introducing-chatgpt-agent/

## Further reading

- [ChatGPT launch](/history/chatgpt-launch-november-2022/): where it all began.
- [GPT-5.5 and GPT-5.6](/news/openai-gpt-5-5-and-5-6/): the models powering agent mode.
- [Coding agents in 2026](/news/coding-agents-2026/): how the broader agent landscape is evolving.
- [What are AI agents?](/glossary/ai-agents/): the concept explained.
