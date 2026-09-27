---
title: "Model Context Protocol (MCP) - Universal Tool Interface for AI Agents"
description: "What the Model Context Protocol is, how it enables AI agents to use tools through a standard interface, and server/client architecture."
date: 2026-03-25
categories: [Tools]
tags: ["ai-agents", "intermediate", "mcp", "tool-use", "agents", "protocol", "integration"]
last_updated: 2026-09-25
lastmod: 2026-09-25
last_verified: 2026-09-25
---

Model Context Protocol (MCP) is an open standard for connecting AI models to external tools, data sources, and services. Developed by Anthropic and released as open source in November 2024, it was donated on 9 December 2025 to the Agentic AI Foundation, a directed fund under the Linux Foundation. It defines a uniform interface through which any AI model can discover and invoke capabilities without bespoke integration code per tool.

Official specification and documentation: https://modelcontextprotocol.io/

## The Problem MCP Solves

Before MCP, integrating an AI model with tools required writing custom integration code for every model-tool combination. A RAG pipeline using Claude needed different code to connect to databases, APIs, and file systems than a similar pipeline using an OpenAI model. If you added a new tool, you rewrote integrations for each model. This created an N x M problem - N models by M tools.

MCP solves this by defining a standard wire protocol. Any MCP-compatible tool (MCP server) can be used by any MCP-compatible model host (MCP client). Build the tool once, use it with any compliant model.

## Architecture: Servers and Clients

**MCP servers** expose capabilities. A server defines:
- **Tools** - functions the model can call (e.g., `search_database`, `create_calendar_event`, `run_code`)
- **Resources** - data the model can read (e.g., file contents, database records)
- **Prompts** - reusable prompt templates the model can invoke

Servers can be local processes (running on the same machine as the model host) or remote services accessed over the Streamable HTTP transport, which replaced the original HTTP plus Server-Sent Events (SSE) transport in 2025.

**MCP clients** are the model hosts - applications that orchestrate model calls and handle tool invocations. Claude Desktop, Claude Code, ChatGPT, GitHub Copilot in VS Code, Cursor, Gemini CLI, and custom applications built with the MCP client SDK all act as clients.

## How Tool Invocation Works

1. The client connects to (or starts) an MCP server and requests its tool list (`tools/list`). Since the 2026-07-28 specification revision there is no `initialize` handshake or session: each request carries its protocol version and capabilities
2. The tool list is added to the model's context (system prompt or tool definitions)
3. The model generates a tool call (name, arguments as JSON)
4. The client routes the call to the MCP server (`tools/call`)
5. The server executes the tool and returns a result
6. The result is added to the model's context and the loop continues

This protocol is transport-agnostic: local servers use stdio, remote servers use Streamable HTTP. See [MCP goes stateless](/news/mcp-2026-07-28-stateless/) for the 2026-07-28 revision. The client handles transport; the model sees only JSON tool definitions and results.

## Building MCP Servers

MCP servers can be written in any language with an available SDK. The TypeScript and Python SDKs are most mature. A minimal server in Python:

```python
from mcp.server import MCPServer

mcp = MCPServer("my-server")

@mcp.tool()
def get_weather(city: str) -> str:
    """Return the current weather for a city."""
    return fetch_weather(city)
```

This uses the high-level `MCPServer` API from the Python SDK 2.x line (2.2 as of September 2026); type hints and the docstring become the tool's JSON schema and description. Code written against SDK 1.x imported `FastMCP` from `mcp.server.fastmcp` instead.

## MCP in AI Pipelines on AWS

MCP servers can expose AWS services as tools for agents. An agent hosted on Amazon Bedrock AgentCore (or built with Strands Agents) with an attached MCP server gains access to DynamoDB, S3, and custom Lambda functions through a uniform tool interface, without hardcoding API calls in the agent framework. Strands Agents supports MCP servers natively, and AgentCore Gateway can expose existing APIs and Lambda functions as MCP tools, making this a practical pattern for AWS-native agent development. The older Bedrock Agents service (now "Bedrock Agents Classic") closed to new customers on 30 July 2026, so new AWS agent builds should target AgentCore.

## Related Articles

- [Bedrock AgentCore]({{< relref "bedrock-agentcore.md" >}}) - runtime that hosts MCP-compatible agents
- [Strands Agents]({{< relref "strands-agents.md" >}}) - framework with native MCP support
- [AI Agents]({{< relref "/glossary/ai-agents.md" >}}) - agent fundamentals

## Sources

1. Model Context Protocol specification, revision 2026-07-28 (changelog and transports). https://modelcontextprotocol.io/specification/2026-07-28/changelog
2. Anthropic. "Donating the Model Context Protocol and establishing the Agentic AI Foundation." 9 December 2025. https://www.anthropic.com/news/donating-the-model-context-protocol-and-establishing-of-the-agentic-ai-foundation
3. MCP Python SDK README (`MCPServer` quickstart). https://github.com/modelcontextprotocol/python-sdk
4. AWS. "Amazon Bedrock Agents Classic maintenance mode." https://docs.aws.amazon.com/bedrock/latest/userguide/agents-classic-maintenance-mode.html
