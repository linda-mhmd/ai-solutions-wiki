---
title: "Model Context Protocol (MCP) - Universal Tool Interface for AI Agents"
description: "What the Model Context Protocol is, how it enables AI agents to use tools through a standard interface, and server/client architecture."
date: 2026-03-25
categories: [Tools]
tags: ["ai-agents", "intermediate", "mcp", "tool-use", "agents", "protocol", "integration"]
last_updated: 2026-10-25
lastmod: 2026-10-25
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

This uses the high-level `MCPServer` API from the Python SDK 2.x line (v2.3.0, released 2 October 2026, is the latest on 25 October 2026); type hints and the docstring become the tool's JSON schema and description. Code written against SDK 1.x imported `FastMCP` from `mcp.server.fastmcp` instead.

## Security notes: minimum safe SDK versions (October 2026)

Three SDK advisories published in October 2026 set new minimum versions. Each is a GitHub advisory from the MCP SDK maintainers.

| Package | Minimum safe version | Advisory | What it fixes |
|---|---|---|---|
| `mcp` (Python), 1.x | **1.30.0** | GHSA-84m7-p3x7-pcfv / CVE-2026-59951, Medium | Streamable HTTP servers in stateful mode (the default) never reclaimed sessions, so any client that could reach the endpoint could grow server memory without bound |
| `mcp` (Python), 2.x | **2.2.0** | same | same; 2.2.0 adds `session_idle_timeout` (default 1800 s) and `max_sessions` (default 10000) |
| `@modelcontextprotocol/server` | **2.3.0** | GHSA-jm63-cq47-j5jp / CVE-2026-111770, High | A shared transport or shared `McpServer` instance could deliver one HTTP client's responses to another, because messages were matched by JSON-RPC `id` alone and "SDK clients number requests from 0, so ids collide in normal use" |
| `@modelcontextprotocol/sdk` (1.x) | **1.32.0** | GHSA-rvq5-wwqv-78pq / CVE-2026-111771, Medium | Bearer authentication could not check a token's audience, so a token issued for another service was accepted |
| `@modelcontextprotocol/server` (2.x) | **2.3.0**, with `@modelcontextprotocol/express` **2.0.2** and `@modelcontextprotocol/server-legacy` **2.3.1** | same | same |

Two of these need code changes, not just an upgrade:

- **Shared transports.** The TypeScript advisory says that "Until this release, the README examples of `@modelcontextprotocol/hono`, `express`, `fastify` and `node` showed that pattern", meaning one transport or server created once at startup. From 2.3.0 the SDK "now refuses to be shared, so an affected app fails requests after upgrading". Build a new `McpServer` and transport per request, keep one per session with `sessionIdGenerator`, or pass `createMcpHandler()` a factory. `@modelcontextprotocol/sdk` 1.26.0 and later is not affected by this one.
- **Audience check.** "Upgrading alone changes nothing." The fix adds an `expectedResource` option that is off by default. Pass `expectedResource` to `requireBearerAuth()` and return the token's audience from `verifyAccessToken()` as `AuthInfo.resource`; with only the first change, every request gets a 401. On versions you cannot upgrade, reject tokens whose `aud` does not include your server inside `verifyAccessToken()`.

For the Python session issue, servers using `stateless_http=True` (1.12.0 or later), stdio or SSE are not affected. Newer releases exist (TypeScript SDK 1.32.2 and `@modelcontextprotocol/server` 2.4.0 on 23 October 2026); the versions in the table are the minimums the advisories name. See [MCP security vulnerabilities in 2026](/news/mcp-security-vulnerabilities-2026/) and the [October 2026 agent security roundup](/news/ai-agent-security-roundup-october-2026/).

## MCP in AI Pipelines on AWS

MCP servers can expose AWS services as tools for agents. An agent hosted on Amazon Bedrock AgentCore (or built with Strands Agents) with an attached MCP server gains access to DynamoDB, S3, and custom Lambda functions through a uniform tool interface, without hardcoding API calls in the agent framework. Strands Agents supports MCP servers natively, and AgentCore Gateway can expose existing APIs and Lambda functions as MCP tools, making this a practical pattern for AWS-native agent development. The older Bedrock Agents service (now "Bedrock Agents Classic") closed to new customers on 30 July 2026, so new AWS agent builds should target AgentCore.

## Related Articles

- [Bedrock AgentCore]({{< relref "bedrock-agentcore.md" >}}) - runtime that hosts MCP-compatible agents
- [Strands Agents]({{< relref "strands-agents.md" >}}) - framework with native MCP support
- [AI Agents]({{< relref "/glossary/ai-agents.md" >}}) - agent fundamentals
- [AI agent security roundup, October 2026](/news/ai-agent-security-roundup-october-2026/) - the MCP SDK advisories in context

## Sources

1. Model Context Protocol specification, revision 2026-07-28 (changelog and transports). https://modelcontextprotocol.io/specification/2026-07-28/changelog
2. Anthropic. "Donating the Model Context Protocol and establishing the Agentic AI Foundation." 9 December 2025. https://www.anthropic.com/news/donating-the-model-context-protocol-and-establishing-of-the-agentic-ai-foundation
3. MCP Python SDK README (`MCPServer` quickstart). https://github.com/modelcontextprotocol/python-sdk
4. AWS. "Amazon Bedrock Agents Classic maintenance mode." https://docs.aws.amazon.com/bedrock/latest/userguide/agents-classic-maintenance-mode.html
5. MCP Python SDK releases (v2.3.0, 2 October 2026). https://github.com/modelcontextprotocol/python-sdk/releases
6. GHSA-84m7-p3x7-pcfv, "MCP Python SDK: Unbounded Session Accumulation in StreamableHTTP Transport Enables Resource Exhaustion" (GitHub security advisory; reviewed in the GitHub Advisory Database 15 October 2026). https://github.com/modelcontextprotocol/python-sdk/security/advisories/GHSA-84m7-p3x7-pcfv
7. GHSA-jm63-cq47-j5jp, "Shared transport or server instances delivered one HTTP client's messages to another" (20 October 2026). https://github.com/modelcontextprotocol/typescript-sdk/security/advisories/GHSA-jm63-cq47-j5jp
8. GHSA-rvq5-wwqv-78pq, "Server bearer authentication accepted tokens issued for another service" (20 October 2026). https://github.com/modelcontextprotocol/typescript-sdk/security/advisories/GHSA-rvq5-wwqv-78pq
