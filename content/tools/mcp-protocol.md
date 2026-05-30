---
title: "Model Context Protocol (MCP) - Universal Tool Interface for AI Agents"
description: "What the Model Context Protocol is, how it enables AI agents to use tools through a standard interface, and server/client architecture."
date: 2026-03-25
categories: [Tools]
tags: ["ai-agents", "intermediate", "mcp", "tool-use", "agents", "protocol", "integration"]
last_updated: 2026-05-30
---

Model Context Protocol (MCP) is an open standard for connecting AI models to external tools, data sources, and services. Developed by Anthropic and released as open source, it defines a uniform interface through which any AI model can discover and invoke capabilities without bespoke integration code per tool.

Official specification and documentation: https://modelcontextprotocol.io/

## The Problem MCP Solves

Before MCP, integrating an AI model with tools required writing custom integration code for every model-tool combination. A RAG pipeline using Claude needed different code to connect to databases, APIs, and file systems than a similar pipeline using GPT-4. If you added a new tool, you rewrote integrations for each model. This created an N x M problem - N models by M tools.

MCP solves this by defining a standard wire protocol. Any MCP-compatible tool (MCP server) can be used by any MCP-compatible model host (MCP client). Build the tool once, use it with any compliant model.

## Architecture: Servers and Clients

**MCP servers** expose capabilities. A server defines:
- **Tools** - functions the model can call (e.g., `search_database`, `create_calendar_event`, `run_code`)
- **Resources** - data the model can read (e.g., file contents, database records)
- **Prompts** - reusable prompt templates the model can invoke

Servers can be local processes (running on the same machine as the model host) or remote services accessed over HTTP using Server-Sent Events (SSE) transport.

**MCP clients** are the model hosts - applications that orchestrate model calls and handle tool invocations. Claude Desktop, VS Code with Claude extension, Cursor, and custom applications built with the MCP client SDK all act as clients.

## How Tool Invocation Works

1. The client starts an MCP server and requests its tool list (`tools/list`)
2. The tool list is added to the model's context (system prompt or tool definitions)
3. The model generates a tool call (name, arguments as JSON)
4. The client routes the call to the MCP server (`tools/call`)
5. The server executes the tool and returns a result
6. The result is added to the model's context and the loop continues

This protocol is transport-agnostic: local servers use stdio, remote servers use HTTP/SSE. The client handles transport; the model sees only JSON tool definitions and results.

## Building MCP Servers

MCP servers can be written in any language with an available SDK. The TypeScript and Python SDKs are most mature. A minimal server in Python:

```python
from mcp.server import Server
from mcp.server.stdio import stdio_server

server = Server("my-server")

@server.list_tools()
async def list_tools():
    return [Tool(name="get_weather", description="...", inputSchema={...})]

@server.call_tool()
async def call_tool(name, arguments):
    if name == "get_weather":
        return [TextContent(text=fetch_weather(arguments["city"]))]
```

## MCP in AI Pipelines on AWS

MCP servers can expose AWS services as tools for agents. A Bedrock agent with an attached MCP server gains access to DynamoDB, S3, and custom Lambda functions through a uniform tool interface, without hardcoding API calls in the agent framework. Strands Agents supports MCP servers natively, making this a practical pattern for AWS-native agent development.

## Related Articles

- [Bedrock AgentCore]({{< relref "bedrock-agentcore.md" >}}) - runtime that hosts MCP-compatible agents
- [Strands Agents]({{< relref "strands-agents.md" >}}) - framework with native MCP support
- [AI Agents]({{< relref "/glossary/ai-agents.md" >}}) - agent fundamentals
