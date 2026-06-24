---
title: "What is an AI Agent?"
description: "An AI agent is software that uses an LLM to plan and take actions autonomously, not just answer questions. Plain-English explanation with real examples."
date: 2026-06-22
level: 1
categories: [Basics]
tags: ["beginner", "ai-agents", "agentic-ai", "llm", "automation", "ai-basics"]
docs: "https://docs.anthropic.com/en/docs/agents-overview"
docs_label: "Anthropic: Agents Overview"
faqs:
  - question: "What is the difference between a chatbot and an AI agent?"
    answer: "A chatbot answers questions. An AI agent takes actions. A chatbot says 'Here is how you would book a flight.' An agent actually books the flight: it searches for options, selects the best one according to your criteria, fills in the payment form, and confirms the booking. Agents use an LLM to plan and reason, then execute sequences of actions using tools like web browsers, APIs, databases, and code execution."
  - question: "What tools do AI agents use?"
    answer: "Common agent tools include: web search (to find current information), code execution (to run calculations or process data), file reading and writing (to work with documents), API calls (to interact with external services like Calendars, CRMs, or Slack), browser automation (to navigate websites and fill forms), and database queries (to retrieve or store structured data). The LLM decides which tools to use and in what order."
  - question: "Are AI agents reliable enough to use in production?"
    answer: "In 2026, AI agents work well for bounded, well-defined tasks with clear success criteria and human oversight available. They are less reliable for open-ended tasks requiring perfect accuracy, tasks where errors are irreversible, and tasks spanning many steps without checkpoints. Best practice: design agents with human-in-the-loop checkpoints for irreversible actions, retry logic, and narrow scope."
  - question: "What is a multi-agent system?"
    answer: "A multi-agent system uses several specialised agents that collaborate on a complex task. One agent might research and gather information, another writes a draft, a third reviews it for accuracy, and an orchestrator coordinates them. Multi-agent systems can parallelise work and apply specialised models to specific subtasks."
  - question: "What is an agentic loop?"
    answer: "An agentic loop is the core execution cycle of an AI agent: (1) observe the current state, (2) plan the next action, (3) execute the action using a tool, (4) observe the result, (5) decide whether the goal is achieved or repeat. The loop continues until the task is complete or a stop condition is met. The LLM handles steps 1, 2, and 4; tools handle step 3."
---

{{< quickanswer >}}
An AI agent is software that uses a large language model to plan and execute multi-step tasks autonomously. Unlike a chatbot that only answers questions, an agent uses tools: web search, code execution, file systems, APIs, and browser automation to take real actions in the world. You give it a goal; it figures out the steps to achieve it. AI agents are the main direction of AI development in 2025-2026.
{{< /quickanswer >}}

<figure class="bz-figure">
  <img src="/img/obsidian-lab/hub-spokes-orchestration-notext.png" alt="Dark mechanical spider hub with six copper-tipped arms radiating outward: an orchestration centre routing tasks to multiple tools and specialised agents." loading="lazy">
  <figcaption>An AI agent sits at the centre of a network of tools, routing tasks outward and synthesising results back into a coherent action plan.</figcaption>
</figure>

## Chatbot vs agent: the key difference

A chatbot has one turn: you ask, it answers. The conversation may continue, but each response is independent of anything outside the conversation window.

An agent has a loop:

1. You give a goal: "Research the top five competitors to our product and write a brief report"
2. The agent plans: "I need to search for competitors, then analyse each one, then write the report"
3. The agent acts: searches the web, reads pages, extracts data
4. The agent evaluates: "Did I find enough? Are there gaps?"
5. The agent acts again: searches for missing data, fills in gaps
6. The agent delivers: produces the report

The agent decides what steps to take, executes them using real tools, evaluates the results, and iterates. You can be away from the keyboard while it works.

## The structure of an AI agent

<div class="bz-arch">
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Goal input</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Natural language task</span>
      <span class="bz-arch-chip">System prompt</span>
      <span class="bz-arch-chip">Context documents</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">LLM (the brain)</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Planning</span>
      <span class="bz-arch-chip">Tool selection</span>
      <span class="bz-arch-chip">Result evaluation</span>
      <span class="bz-arch-chip">Response generation</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Tools (the hands)</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Web search</span>
      <span class="bz-arch-chip">Code execution</span>
      <span class="bz-arch-chip">File read/write</span>
      <span class="bz-arch-chip">API calls</span>
      <span class="bz-arch-chip">Browser automation</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Memory</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Conversation history (short-term)</span>
      <span class="bz-arch-chip">Vector database (long-term)</span>
      <span class="bz-arch-chip">External state store</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Output</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Files created or modified</span>
      <span class="bz-arch-chip">APIs called (emails sent, records created)</span>
      <span class="bz-arch-chip">Reports and summaries</span>
    </div>
  </div>
</div>

## A concrete example: the research agent

Task given to the agent: "Find the last five press releases from our top three competitors and summarise what they are announcing."

**The agent's execution:**
1. Calls web search tool: "press releases Competitor A 2026"
2. Reads the top results, extracts press release text
3. Calls web search tool: "press releases Competitor B 2026"
4. Reads results
5. Calls web search tool: "press releases Competitor C 2026"
6. Reads results
7. Calls code execution tool: Python script to sort by date and filter last five per company
8. Generates structured summary from all gathered data

The LLM decides each step. It interprets search results, realises when it needs more data, and knows when it has enough to write the final summary.

## The agentic loop

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">1</span>
    <span class="bz-flow-step-name">Observe</span>
    <span class="bz-flow-step-desc">The LLM reads the current state: the goal, conversation history, previous tool results, and any available context documents.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">2</span>
    <span class="bz-flow-step-name">Plan</span>
    <span class="bz-flow-step-desc">The LLM decides what to do next: which tool to call, with what inputs. This decision appears as a structured tool call in the model output.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">3</span>
    <span class="bz-flow-step-name">Act</span>
    <span class="bz-flow-step-desc">The tool is executed: a web search returns results, code runs and returns output, an API call returns a response.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">4</span>
    <span class="bz-flow-step-name">Evaluate</span>
    <span class="bz-flow-step-desc">The LLM reads the tool output. Did this move toward the goal? Is the task done? What is missing? Loop back to step 1 or deliver the final result.</span>
  </div>
</div>

## Real-world agent applications in 2026

| Use case | What the agent does | Tools used |
|---|---|---|
| **Customer support** | Reads ticket, queries CRM, drafts reply, escalates if needed | CRM API, email API, knowledge base |
| **Code review** | Reads PR, runs tests, checks style, posts review comments | GitHub API, code execution |
| **Research assistant** | Searches web, reads papers, extracts data, writes report | Web search, file reader, summarisation |
| **Data pipeline** | Reads new files, transforms data, writes to database, sends alert | File system, SQL, Slack API |
| **Sales outreach** | Finds prospects, personalises emails, sends at optimal time | CRM, email, web search |

## Frameworks for building agents

| Framework | Language | Best for |
|---|---|---|
| **Claude claude-code** | Any | Coding tasks, file operations |
| **LangGraph** | Python | Complex stateful agent workflows |
| **CrewAI** | Python | Multi-agent collaboration |
| **AutoGen** | Python | Research and code agents |
| **Strands** | Python | AWS-native agent workflows |
| **AWS Bedrock Agents** | Any | Fully managed, enterprise-scale |

## Risks and design principles

**Irreversibility**: Agents can take actions you cannot undo (sending emails, deleting files, making purchases). Design agents to ask for confirmation before irreversible actions.

**Error propagation**: Mistakes in step 3 can cascade through steps 4, 5, and 6. Use checkpointing: save intermediate state and allow resumption from a checkpoint on failure.

**Scope creep**: Agents given broad goals may take unintended actions. Constrain the action space: define exactly which tools are available and what they can do.

**Cost**: Each tool call and LLM inference costs money. A 50-step agent run on GPT-4o might cost €0.50-5. Profile before deploying at scale.

## What's next

- [Multi-Agent Systems 101](/guides/multi-agent-systems-101/): How to design systems with multiple collaborating agents
- [Building RAG Systems](/guides/building-rag-systems/): Giving agents access to private knowledge bases
- [What is an LLM?](/basics/what-is-an-llm/): The AI brain at the centre of every agent

## Further reading

- [Anthropic: Agents Overview](https://docs.anthropic.com/en/docs/agents-overview): Technical documentation with code examples
- [LangGraph documentation](https://langchain-ai.github.io/langgraph/): Python framework for building stateful agent workflows
- [CrewAI documentation](https://docs.crewai.com): Multi-agent framework with role-based agent design
- [Agentic Loops (Glossary)](/glossary/agentic-loops/): Technical definition of the core agent execution pattern
