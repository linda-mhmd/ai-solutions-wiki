---
title: "Model Context Protocol (MCP)"
description: "An open protocol that standardises how language models connect to tools, data sources, and external systems through a uniform client-server interface."
date: 2026-05-08
lastmod: 2026-09-25
last_verified: 2026-09-25
categories: [Glossary]
tags: ["ai-ml", "intermediate", "agents", "tool-use", "protocols", "anthropic", "interoperability"]
related:
  - glossary/ai-agent
  - glossary/function-calling
  - glossary/tool-use
  - glossary/llm
last_updated: 2026-09-25
---

The Model Context Protocol (MCP) is an open specification that defines how language model applications discover, invoke, and exchange data with external tools and data sources. Introduced by Anthropic on 25 November 2024 and subsequently adopted across the agent ecosystem, MCP separates the model-facing client from tool-side servers via a stable JSON-RPC interface, replacing the bespoke, per-application integration code that previously connected each agent to each tool. On 9 December 2025 Anthropic donated MCP to the Agentic AI Foundation, a directed fund under the Linux Foundation. The protocol is versioned by date. The current revision is 2026-07-28, released on 28 July 2026, which made MCP stateless by default; the previous revision, 2025-11-25, was released on the protocol's first anniversary.

## How It Works

MCP defines three roles:

- **Host**: the application that hosts the language model (an IDE assistant, agent runtime, or chat application)
- **Client**: a connector inside the host that speaks MCP to a single server
- **Server**: a process that exposes capabilities to clients. Servers offer tools, resources, and prompts. Clients in turn offer features back to servers: sampling (LLM calls on the server's behalf), roots (filesystem or URI boundaries), and elicitation (requests for input from the user). Since the 2026-07-28 revision, a server obtains these through Multi Round-Trip Requests: it returns an `input_required` result listing what it needs, and the client retries the original request with the answers, instead of the server sending its own requests to the client.

Communication happens over JSON-RPC 2.0 across two standard transports: stdio (the server runs as a local subprocess) and Streamable HTTP (the server runs as an independent process serving one HTTP endpoint, optionally using Server-Sent Events to stream responses). Streamable HTTP replaced the earlier HTTP plus SSE transport from the 2024-11-05 revision, and is the recommended path for remote servers. Up to the 2025-11-25 revision, a server advertised its capabilities during an `initialize` handshake that opened a session. The 2026-07-28 revision removed the handshake and the `Mcp-Session-Id` header: every request now carries its protocol version and client capabilities, and servers expose a `server/discover` method so clients can check versions and capabilities up front. Clients then call tools, fetch resources, or request prompts as the model reasons.

The protocol is transport-agnostic and supports streaming responses, progress notifications, and cancellation. Since 2026-07-28 it is stateless by default: any server instance can handle any request, so remote servers can sit behind an ordinary load balancer without sticky sessions, and servers that need cross-call state pass explicit handles as tool arguments. The 2025-11-25 revision added an experimental Tasks abstraction (SEP-1686) for tracking long-running server work through states such as working, input_required, completed, failed, and cancelled. The 2026-07-28 revision moved Tasks out of the core protocol into an official extension with a redesign (SEP-2663) that is not wire-compatible with the 2025-11-25 version. See [MCP goes stateless](/news/mcp-2026-07-28-stateless/) for the full change list.

## When to Use MCP

MCP is the right abstraction when:

- An agent needs to integrate with multiple tool ecosystems (filesystem, database, APIs, internal services) and the integration set evolves
- Multiple host applications (IDE, agent runtime, chat client) need to share the same tool implementations
- Tools need to be developed and operated independently from the agent that uses them
- The team wants to avoid lock-in to a specific framework's tool format

MCP is not the right abstraction when:

- The agent integrates with one or two tools owned by the same team and lifecycle co-evolution is acceptable
- Latency-critical paths cannot tolerate the protocol overhead
- The runtime already provides a native tool model the team is committed to

## Tools, Resources, and Prompts

MCP servers expose three primary capability classes:

- **Tools**: model-invoked functions with structured input/output (analogous to function calling, but over a standard transport)
- **Resources**: read-only data the host can attach to model context (file contents, database rows, API responses)
- **Prompts**: server-curated prompt templates the user or model can invoke

This separation matters: tools are *actions* the model decides to take, resources are *context* the user or host supplies, and prompts are *workflows* the server publishes. Conflating them produces poorer agent behaviour because the model cannot reason about authority and side effects.

## Security Model

MCP servers run with their own permissions. The host mediates between the model and the server: tool calls require explicit host approval (auto-approved or user-confirmed), resources require explicit attachment, and the host can sandbox or rate-limit any server. Sensitive servers (filesystem, shell, payment APIs) should run with minimal privileges and require user consent per call.

The protocol does not prescribe authentication; servers handle their own auth (OAuth, API keys, bearer tokens). For remote servers, the OAuth 2.1 profile is the recommended path. The 2025-11-25 revision simplified the enterprise story: it replaced fragile Dynamic Client Registration with URL-based registration via OAuth Client ID Metadata Documents (SEP-991), added client credentials for machine-to-machine authorization (SEP-1046), and introduced URL-mode elicitation (SEP-1036) so users can complete OAuth or payment flows in their own browser without credentials passing through the MCP client. The 2026-07-28 revision tightened this further, for example requiring clients to validate the `iss` parameter in authorization responses (RFC 9207) and to bind stored client credentials to the authorization server that issued them.

## Adoption

By 2026 MCP has wide ecosystem adoption: Claude (desktop and API), OpenAI (Agents SDK and ChatGPT desktop), Google (Gemini Code Assist), Microsoft (Copilot Studio), and major agent frameworks (LangGraph, CrewAI, AWS Strands, Amazon Bedrock AgentCore Gateway) all interoperate over MCP.

Two ecosystem milestones are worth noting:

- **Official MCP Registry**: a community-driven, open-source registry of publicly available MCP servers, launched in preview in September 2025 at registry.modelcontextprotocol.io. It acts as a source of truth for server discovery and lets organisations build their own sub-registries, and had grown to roughly two thousand entries by late 2025.
- **MCP Apps (SEP-1865)**: an optional extension co-authored by Anthropic and OpenAI, released in January 2026, that standardises how servers ship interactive HTML and JavaScript user interfaces (forms, dashboards, visualisations) alongside tool outputs, communicating with the host over JSON-RPC via postMessage.

## Trade-offs vs Native Function Calling

| Dimension | MCP | Native function calling |
|---|---|---|
| Tool portability | Across hosts and frameworks | Tied to one framework |
| Discovery | Runtime, via manifest | Compile-time, via registration |
| Independent deployment | Yes (server is a separate process) | Coupled to agent code |
| Latency overhead | Higher (protocol + transport) | Lower (in-process call) |
| Operational complexity | Higher (server lifecycle) | Lower (single deployable) |

For production agent platforms with many tools and many hosts, the operational complexity is paid back by the portability. For single-purpose agents with a fixed tool set, native function calling is often simpler.

## Related Concepts

- [Function Calling](/glossary/function-calling/): the in-process tool-invocation primitive MCP standardises across processes
- [Tool Use](/glossary/tool-use/): the broader behaviour MCP enables in LLM agents
- [AI Agent](/glossary/ai-agent/): the consumer of MCP tools and resources
- [AI Gateway](/glossary/ai-gateway/): runtime layer often paired with MCP for policy enforcement
- [AWS AgentCore](/glossary/aws-agentcore/): AgentCore Gateway exposes tools over MCP

## Sources and Further Reading

- Anthropic (2024). *Introducing the Model Context Protocol*. [https://www.anthropic.com/news/model-context-protocol](https://www.anthropic.com/news/model-context-protocol)
- Model Context Protocol specification, revision 2026-07-28 (current). [https://modelcontextprotocol.io/specification/2026-07-28](https://modelcontextprotocol.io/specification/2026-07-28)
- Model Context Protocol, *Key Changes* in revision 2026-07-28 (accessed 25 September 2026). [https://modelcontextprotocol.io/specification/2026-07-28/changelog](https://modelcontextprotocol.io/specification/2026-07-28/changelog)
- Model Context Protocol specification, revision 2025-11-25 (previous). [https://modelcontextprotocol.io/specification/2025-11-25](https://modelcontextprotocol.io/specification/2025-11-25)
- MCP transports specification (stdio and Streamable HTTP). [https://modelcontextprotocol.io/specification/2026-07-28/basic/transports](https://modelcontextprotocol.io/specification/2026-07-28/basic/transports)
- Anthropic (2025). *Donating the Model Context Protocol and establishing the Agentic AI Foundation*. [https://www.anthropic.com/news/donating-the-model-context-protocol-and-establishing-of-the-agentic-ai-foundation](https://www.anthropic.com/news/donating-the-model-context-protocol-and-establishing-of-the-agentic-ai-foundation)
- Model Context Protocol blog (2025). *One Year of MCP: November 2025 Spec Release*. [https://blog.modelcontextprotocol.io/posts/2025-11-25-first-mcp-anniversary/](https://blog.modelcontextprotocol.io/posts/2025-11-25-first-mcp-anniversary/)
- Model Context Protocol blog (2025). *Introducing the MCP Registry*. [https://blog.modelcontextprotocol.io/posts/2025-09-08-mcp-registry-preview/](https://blog.modelcontextprotocol.io/posts/2025-09-08-mcp-registry-preview/)
- Model Context Protocol blog (2025). *MCP Apps: Extending servers with interactive user interfaces*. [https://blog.modelcontextprotocol.io/posts/2025-11-21-mcp-apps/](https://blog.modelcontextprotocol.io/posts/2025-11-21-mcp-apps/)
- Reference and community servers: [https://github.com/modelcontextprotocol/servers](https://github.com/modelcontextprotocol/servers)
- JSON-RPC 2.0 specification (the wire format MCP uses). [https://www.jsonrpc.org/specification](https://www.jsonrpc.org/specification)
- AWS (2025). *Amazon Bedrock AgentCore Gateway: turning APIs into MCP tools*. [https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/gateway.html](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/gateway.html)
- Schick, T., Dwivedi-Yu, J., Dessì, R., et al. (2023). *Toolformer: Language Models Can Teach Themselves to Use Tools.* NeurIPS 2023. arXiv:2302.04761. [https://arxiv.org/abs/2302.04761](https://arxiv.org/abs/2302.04761)
- Yao, S., Zhao, J., Yu, D., et al. (2023). *ReAct: Synergizing Reasoning and Acting in Language Models.* ICLR 2023. arXiv:2210.03629. [https://arxiv.org/abs/2210.03629](https://arxiv.org/abs/2210.03629)
