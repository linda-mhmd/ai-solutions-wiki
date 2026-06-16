---
title: "Model Context Protocol (MCP)"
description: "An open protocol that standardises how language models connect to tools, data sources, and external systems through a uniform client-server interface."
date: 2026-05-08
lastmod: 2026-06-14
categories: [Glossary]
tags: ["ai-ml", "intermediate", "agents", "tool-use", "protocols", "anthropic", "interoperability"]
related:
  - glossary/ai-agent
  - glossary/function-calling
  - glossary/tool-use
  - glossary/llm
last_updated: 2026-06-14
---

The Model Context Protocol (MCP) is an open specification that defines how language model applications discover, invoke, and exchange data with external tools and data sources. Introduced by Anthropic on 25 November 2024 and subsequently adopted across the agent ecosystem, MCP separates the model-facing client from tool-side servers via a stable JSON-RPC interface, replacing the bespoke, per-application integration code that previously connected each agent to each tool. The protocol is versioned by date, and the latest stable revision is 2025-11-25, released on the protocol's first anniversary.

## How It Works

MCP defines three roles:

- **Host**: the application that hosts the language model (an IDE assistant, agent runtime, or chat application)
- **Client**: a connector inside the host that speaks MCP to a single server
- **Server**: a process that exposes capabilities to clients. Servers offer tools, resources, and prompts. Clients in turn offer features back to servers: sampling (server-initiated LLM calls), roots (filesystem or URI boundaries), and elicitation (server-initiated requests for input from the user).

Communication happens over JSON-RPC 2.0 across two standard transports: stdio (the server runs as a local subprocess) and Streamable HTTP (the server runs as an independent process serving one HTTP endpoint, optionally using Server-Sent Events to stream responses). Streamable HTTP replaced the earlier HTTP plus SSE transport from the 2024-11-05 revision, and is the recommended path for remote servers. A server advertises its capabilities during initialisation. Clients discover those capabilities at session start, then call tools, fetch resources, or request prompts as the model reasons.

The protocol is transport-agnostic, stateful per session, and supports streaming responses, progress notifications, and cancellation. The 2025-11-25 revision added a Tasks abstraction (SEP-1686) for tracking long-running server work through states such as working, input_required, completed, failed, and cancelled, letting clients poll for status and retrieve results after completion.

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

The protocol does not prescribe authentication; servers handle their own auth (OAuth, API keys, bearer tokens). For remote servers, the OAuth 2.1 profile is the recommended path. The 2025-11-25 revision simplified the enterprise story: it replaced fragile Dynamic Client Registration with URL-based registration via OAuth Client ID Metadata Documents (SEP-991), added client credentials for machine-to-machine authorization (SEP-1046), and introduced URL-mode elicitation (SEP-1036) so users can complete OAuth or payment flows in their own browser without credentials passing through the MCP client.

## Adoption

By 2026 MCP has wide ecosystem adoption: Claude (desktop and API), OpenAI (Agents SDK and ChatGPT desktop), Google (Gemini Code Assist), Microsoft (Copilot Studio), and major agent frameworks (LangGraph, CrewAI, AWS Strands, Amazon Bedrock AgentCore Gateway) all interoperate over MCP.

Two ecosystem milestones are worth noting:

- **Official MCP Registry**: a community-driven, open-source registry of publicly available MCP servers, launched in preview in September 2025 at registry.modelcontextprotocol.io. It acts as a source of truth for server discovery and lets organisations build their own sub-registries, and had grown to roughly two thousand entries by late 2025.
- **MCP Apps (SEP-1865)**: an extension co-authored by Anthropic and OpenAI, released in January 2026, that standardises how servers ship interactive HTML and JavaScript user interfaces (forms, dashboards, visualisations) alongside tool outputs, communicating with the host over JSON-RPC via postMessage.

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
- Model Context Protocol specification, revision 2025-11-25 (current stable). [https://modelcontextprotocol.io/specification/2025-11-25](https://modelcontextprotocol.io/specification/2025-11-25)
- MCP transports specification (stdio and Streamable HTTP). [https://modelcontextprotocol.io/specification/2025-11-25/basic/transports](https://modelcontextprotocol.io/specification/2025-11-25/basic/transports)
- Model Context Protocol blog (2025). *One Year of MCP: November 2025 Spec Release*. [https://blog.modelcontextprotocol.io/posts/2025-11-25-first-mcp-anniversary/](https://blog.modelcontextprotocol.io/posts/2025-11-25-first-mcp-anniversary/)
- Model Context Protocol blog (2025). *Introducing the MCP Registry*. [https://blog.modelcontextprotocol.io/posts/2025-09-08-mcp-registry-preview/](https://blog.modelcontextprotocol.io/posts/2025-09-08-mcp-registry-preview/)
- Model Context Protocol blog (2025). *MCP Apps: Extending servers with interactive user interfaces*. [https://blog.modelcontextprotocol.io/posts/2025-11-21-mcp-apps/](https://blog.modelcontextprotocol.io/posts/2025-11-21-mcp-apps/)
- Reference and community servers: [https://github.com/modelcontextprotocol/servers](https://github.com/modelcontextprotocol/servers)
- JSON-RPC 2.0 specification (the wire format MCP uses). [https://www.jsonrpc.org/specification](https://www.jsonrpc.org/specification)
- AWS (2025). *Amazon Bedrock AgentCore Gateway: turning APIs into MCP tools*. [https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/gateway.html](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/gateway.html)
- Schick, T., Dwivedi-Yu, J., Dessì, R., et al. (2023). *Toolformer: Language Models Can Teach Themselves to Use Tools.* NeurIPS 2023. arXiv:2302.04761. [https://arxiv.org/abs/2302.04761](https://arxiv.org/abs/2302.04761)
- Yao, S., Zhao, J., Yu, D., et al. (2023). *ReAct: Synergizing Reasoning and Acting in Language Models.* ICLR 2023. arXiv:2210.03629. [https://arxiv.org/abs/2210.03629](https://arxiv.org/abs/2210.03629)
