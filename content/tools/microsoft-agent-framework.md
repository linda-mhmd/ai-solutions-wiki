---
title: "Microsoft Agent Framework"
description: "Microsoft Agent Framework is an open-source, production SDK for building AI agents and multi-agent workflows in .NET and Python."
date: 2026-07-06
lastmod: 2026-07-06
last_updated: 2026-07-06
tags: ["ai-agents", "multi-agent", "orchestration", "dotnet", "python"]
tool_category: "AI"
related:
  - tools/autogen
  - tools/semantic-kernel
  - tools/langchain
  - tools/crewai
  - glossary/multi-agent-systems
---

<figure class="bz-figure">
  <img src="/img/obsidian-lab/hub-spokes-orchestration-notext.png" alt="A mechanical hub with six copper arms radiating outward, representing one framework orchestrating many agents." loading="lazy">
  <figcaption>Microsoft Agent Framework acts as the hub that coordinates individual agents into a working multi-agent system.</figcaption>
</figure>

Microsoft Agent Framework is an open-source SDK for building AI agents and multi-agent workflows. It solves a fragmentation problem: Microsoft previously shipped two overlapping agent projects, [AutoGen](/tools/autogen/) for research-style multi-agent experiments and [Semantic Kernel](/tools/semantic-kernel/) for production integration. Developers had to choose one and lose the strengths of the other. Agent Framework merges both into a single supported SDK for .NET and Python, with graph-based orchestration and declarative YAML agent definitions. Version 1.0, the general availability release with stable APIs and long-term support, was announced on 3 April 2026. AutoGen and Semantic Kernel are now in maintenance mode, and Agent Framework is the recommended path forward.

## Where it sits in the stack

Agent Framework occupies the orchestration layer between your application and the model provider. You define agents and the workflow that connects them; the framework handles tool calls, message passing, and multi-agent coordination.

<div class="bz-arch">
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Your application</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Copilot</span>
      <span class="bz-arch-chip">Backend service</span>
      <span class="bz-arch-chip">Automation</span>
      <span class="bz-arch-chip-note">.NET or Python host process</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Agent Framework</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Agents</span>
      <span class="bz-arch-chip">Graph workflows</span>
      <span class="bz-arch-chip">Declarative YAML</span>
      <span class="bz-arch-chip">Tools and functions</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Model clients</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Azure AI Foundry</span>
      <span class="bz-arch-chip">Azure OpenAI</span>
      <span class="bz-arch-chip">OpenAI</span>
      <span class="bz-arch-chip-note">Chat clients that back each agent</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Runtime and telemetry</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">.NET runtime</span>
      <span class="bz-arch-chip">Python 3.10+</span>
      <span class="bz-arch-chip">OpenTelemetry</span>
      <span class="bz-arch-chip-note">Observability built in</span>
    </div>
  </div>
</div>

## Installation

Agent Framework ships as a Python package on PyPI and a set of NuGet packages for .NET. For Python, install the SDK alongside an Azure identity library for authentication.

```bash
pip install agent-framework azure-identity
```

For .NET, add the packages to your project with the dotnet CLI. The 1.0 packages are stable, so the prerelease flag is no longer required for the core libraries.

```bash
dotnet add package Microsoft.Agents.AI
dotnet add package Azure.Identity
```

Sign in to Azure so the credential classes can obtain a token, then set your project endpoint and model deployment name as environment variables.

```bash
az login
export AZURE_AI_PROJECT_ENDPOINT="https://your-project.services.ai.azure.com"
```

## Creating a single agent

The smallest useful program creates one agent backed by a chat client and runs a prompt. This Python example follows the official quickstart: build a client, wrap it in an agent, and call `run`.

```python
import asyncio
from agent_framework import Agent
from agent_framework.azure import FoundryChatClient
from azure.identity import AzureCliCredential

async def main():
    client = FoundryChatClient(
        project_endpoint="https://your-project.services.ai.azure.com",
        model="gpt-4o",
        credential=AzureCliCredential(),
    )

    agent = Agent(
        client=client,
        name="HelloAgent",
        instructions="You are a friendly assistant. Keep your answers brief.",
    )

    result = await agent.run("What is the capital of France?")
    print(f"Agent: {result}")

asyncio.run(main())
```

## Giving an agent a tool

Agents become useful when they can call functions. You pass Python functions as tools, and the framework exposes them to the model, calls them when the model asks, and feeds results back into the conversation.

```python
import asyncio
from agent_framework import Agent
from agent_framework.azure import FoundryChatClient
from azure.identity import AzureCliCredential

def get_weather(city: str) -> str:
    """Return a short weather summary for a city."""
    return f"It is 18 degrees and clear in {city}."

async def main():
    client = FoundryChatClient(
        project_endpoint="https://your-project.services.ai.azure.com",
        model="gpt-4o",
        credential=AzureCliCredential(),
    )

    agent = Agent(
        client=client,
        name="WeatherAgent",
        instructions="Answer weather questions using the tools you have.",
        tools=[get_weather],
    )

    result = await agent.run("What is the weather in Berlin?")
    print(result)

asyncio.run(main())
```

The exact tool-registration surface is evolving between preview builds, so treat this pattern as conceptual and check the current quickstart before you copy it into production. Beyond single agents, the framework adds graph-based workflows that route messages between multiple agents, and declarative YAML definitions that let you describe an agent's model, instructions, and tools in a config file instead of code.

## How a multi-agent workflow runs

A graph workflow connects agents as nodes and defines how a task flows between them. A typical pattern hands work from a planner to specialists and back to a reviewer.

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 1</span>
    <span class="bz-flow-step-name">Define agents</span>
    <span class="bz-flow-step-desc">Create each agent with its own instructions and tools.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 2</span>
    <span class="bz-flow-step-name">Build the graph</span>
    <span class="bz-flow-step-desc">Connect agents as nodes and set the routing between them.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 3</span>
    <span class="bz-flow-step-name">Run the workflow</span>
    <span class="bz-flow-step-desc">Send a task; messages pass between agents until it completes.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 4</span>
    <span class="bz-flow-step-name">Observe</span>
    <span class="bz-flow-step-desc">OpenTelemetry traces every step for debugging and cost tracking.</span>
  </div>
</div>

## How it compares

The multi-agent framework space is crowded. Agent Framework's distinguishing features are first-class .NET support and its position as the successor to two Microsoft projects. The table compares it with LangGraph, CrewAI, and its own predecessors.

| | Microsoft Agent Framework | LangGraph | [CrewAI](/tools/crewai/) | [AutoGen](/tools/autogen/) + [Semantic Kernel](/tools/semantic-kernel/) |
|---|---|---|---|---|
| **Languages** | Python and .NET | Python and JS | Python | Python and .NET |
| **Orchestration** | Graph-based | Graph-based | Role and crew | Conversation and plugins |
| **Config style** | Code or YAML | Code | Code or YAML | Code |
| **Status** | GA, long-term support | Actively developed | Actively developed | Maintenance mode |
| **Best for** | Microsoft-stack teams | Custom graph logic | Role-based crews | Legacy projects only |

## When not to use it

Agent Framework is not the right choice in a few situations.

- **You are not on the Microsoft stack.** The framework works best with Azure AI Foundry and Azure OpenAI. If your models and infrastructure live entirely in another ecosystem, a provider-neutral option like [LangChain](/tools/langchain/) may fit better.
- **You need a mature ecosystem today.** Version 1.0 is recent. If you want years of community examples and third-party integrations, a longer-established framework has more to draw on.
- **Your task is a single prompt.** If you only call one model once with no tools or coordination, an agent framework adds overhead. Call the model API directly.
- **You are already invested in AutoGen or Semantic Kernel.** Those projects still work, but they are in maintenance mode. Plan a migration rather than starting new work on them.

## Further reading

- [Agent Framework documentation](https://learn.microsoft.com/agent-framework/): official docs, tutorials, and API reference from Microsoft Learn.
- [Agent Framework 1.0 announcement](https://devblogs.microsoft.com/agent-framework/microsoft-agent-framework-version-1-0/): the general availability post explaining stable APIs and long-term support.
- [Agent Framework repository](https://github.com/microsoft/agent-framework): source code, samples, and issue tracker.
- [AutoGen](/tools/autogen/): the research-focused predecessor, now in maintenance mode.
- [Semantic Kernel](/tools/semantic-kernel/): the production-integration predecessor, now in maintenance mode.
- [What are multi-agent systems?](/glossary/multi-agent-systems/): the pattern Agent Framework is built to orchestrate.

## Sources

- [Microsoft Agent Framework 1.0 announcement](https://devblogs.microsoft.com/agent-framework/microsoft-agent-framework-version-1-0/)
- [Agent Framework docs - your first agent](https://learn.microsoft.com/agent-framework/get-started/your-first-agent)
- [Agent Framework documentation home](https://learn.microsoft.com/agent-framework/)
- [Agent Framework GitHub repository](https://github.com/microsoft/agent-framework)
