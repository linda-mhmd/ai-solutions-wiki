---
title: "Strands Agents - AWS-Native Agent SDK"
description: "What Strands Agents is, how it differs from CrewAI and LangGraph, and when to use it for AWS-hosted agent applications."
date: 2026-03-25
categories: [Tools]
tags: ["ai-agents", "intermediate", "strands", "multi-agent", "orchestration", "aws", "framework"]
related:
  - glossary/ai-agents
  - glossary/agentic-ai
  - tools/crewai
  - comparisons/crewai-vs-strands
  - patterns/agentic-workflows
  - guides/multi-agent-systems-101
last_updated: 2026-09-25
lastmod: 2026-09-25
last_verified: 2026-09-25
---

Strands Agents is an open-source (Apache 2.0) SDK for building AI agents in Python and TypeScript, developed by AWS. It defaults to Amazon Bedrock and integrates directly with Bedrock AgentCore for deployment, but it is model-agnostic: the SDK has first-class providers for Bedrock, Anthropic, OpenAI, and Gemini, plus others and custom providers. The project now lives in the `strands-agents/harness-sdk` monorepo, which also ships **Strands harness** (`strands-harness` on PyPI, `@strands-agents/harness` on npm), a pre-assembled agent with default tools, memory, sessions, and context management.

Official documentation: https://strandsagents.com/

## Core Design

Strands follows a minimal, code-first design. An agent is defined by:
- A foundation model (Bedrock by default; other providers are supported)
- A system prompt
- A list of tools (Python functions decorated with `@tool`)

The agent loop is built in: you call `agent(user_message)` and Strands handles model invocation, tool dispatch, result injection, and loop continuation until the agent produces a final response.

```python
from strands import Agent, tool

@tool
def query_database(sql: str) -> str:
    """Execute a SQL query and return results."""
    return run_query(sql)

agent = Agent(
    model="us.anthropic.claude-sonnet-5",  # Sonnet 5 needs a geo/global inference profile on Bedrock
    system_prompt="You are a data analyst...",
    tools=[query_database]
)

response = agent("What were our top 10 customers last month?")
```

## How It Differs from CrewAI

**CrewAI** centers on multi-agent crews: you define agents with roles, assign them tasks, and a crew orchestrator coordinates execution. The framework is explicit about agent hierarchy and task sequencing. CrewAI has a larger ecosystem of pre-built tools and roles, but the multi-agent coordination model adds conceptual overhead for simple single-agent tasks.

**Strands** is flatter. A single agent can handle complex tasks directly, with tools as the primary extension mechanism. Multi-agent patterns in Strands are composed by having tools that call other agents - simpler but less declarative.

## How It Differs from LangGraph

**LangGraph** models agent logic as a state machine graph: nodes are functions, edges define transitions, and you have explicit control over the execution flow. This is powerful for complex, branching workflows where you need fine-grained control, but requires more code to define the graph.

**Strands** uses an implicit loop with model-driven tool selection. The model decides what to do next; you don't define state transitions. This is simpler for tasks where the model's reasoning is sufficient, but less suitable for deterministic workflows with complex branching logic.

## MCP Integration

Strands supports MCP servers as tool sources. Rather than writing individual `@tool` decorators for each capability, you can point Strands at an MCP server and all its tools become available to the agent automatically. This is the recommended pattern for AWS service integration - use AWS-provided MCP servers rather than writing Boto3 calls directly.

## Deployment with AgentCore

Strands agents deploy to Bedrock AgentCore without modification. The same agent code that runs locally runs in production on AgentCore's managed infrastructure. This is the primary deployment advantage over LangGraph and CrewAI, which require more work to fit the AgentCore model.

## Related Articles

- [Bedrock AgentCore]({{< relref "bedrock-agentcore.md" >}}) - deployment target for Strands agents
- [MCP Protocol]({{< relref "mcp-protocol.md" >}}) - tool interface used by Strands
- [Amazon Bedrock]({{< relref "amazon-bedrock.md" >}}) - foundation models for Strands agents

## Sources

1. Strands Agents monorepo README (Python and TypeScript SDKs, Strands harness, model providers; accessed 25 September 2026): https://github.com/strands-agents/harness-sdk
2. strands-agents on PyPI: https://pypi.org/project/strands-agents/
3. Anthropic, "Models overview" (Sonnet 5 on Bedrock is called through an inference profile such as `us.anthropic.claude-sonnet-5`; see the Bedrock model card): https://platform.claude.com/docs/en/about-claude/models/overview
