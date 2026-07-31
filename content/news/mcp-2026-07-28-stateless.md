---
title: "MCP Goes Stateless: The 2026-07-28 Specification Rewrites the Protocol"
description: "The Model Context Protocol's 2026-07-28 revision removes sessions by default, makes every request self-contained, and introduces Multi Round-Trip Requests for interactive tools. It is the largest change since MCP launched."
date: 2026-07-28
lastmod: 2026-07-30
last_updated: 2026-07-30
categories: [News]
tags: [mcp, model-context-protocol, agentic-ai, developer-tools, protocol]
related:
  - news/mcp-turns-one
  - tools/mcp
  - glossary/mcp
---

The Model Context Protocol released its 2026-07-28 specification on 28 July 2026, the largest revision since the protocol launched. The headline change: MCP is now stateless by default. The initialize handshake and session IDs are gone. Every request is self-contained, so any server instance can handle any request without sticky routing or session synchronization. For tools that need user input mid-call, a new mechanism called Multi Round-Trip Requests replaces the old server-initiated pattern.

## What changed

The 2026-07-28 revision is a coordinated set of Specification Enhancement Proposals (SEPs). The key changes:

**Stateless by default.** The required `initialize` / `initialized` handshake is removed (SEP-2575). The `Mcp-Session-Id` header is removed (SEP-2567). Protocol version and capabilities now travel with each request. Any server instance can handle any request without shared state.

**Standardized HTTP headers.** New headers (`Mcp-Method`, `Mcp-Name`, `Mcp-Param-*`) mirror the JSON-RPC body so load balancers, proxies, and gateways can route MCP traffic without parsing the body (SEP-2243). A tool parameter can be promoted to a header with a single attribute, enabling geo-distributed routing on ordinary HTTP infrastructure.

**Multi Round-Trip Requests (MRTR).** When a tool needs user confirmation, LLM sampling, or workspace roots mid-call, it returns an `input_required` result with an opaque `requestState`. The client satisfies the inputs and re-issues the call. This works without any session because all continuity travels in the payload (SEP-2322).

**Deprecations.** Server-initiated requests for elicitation, sampling, and roots are deprecated on stateless servers; MRTR replaces them. Logging notifications are deprecated in favor of stderr and OpenTelemetry.

**Extensions become first-class.** Tasks (long-running tools with polling) and Apps (interactive UI) are now opt-in extension packages, not baked into the core protocol.

SDK 2.0 releases shipped the same day for TypeScript, Python, Go, and C#. Microsoft, Cloudflare, and AWS published support within hours.

## Why it matters for builders

Three practical implications.

**Scaling is simpler.** Stateless MCP servers are ordinary HTTP services. Drop one behind a round-robin load balancer, scale to as many instances as you need, and there is nothing to synchronize between them. Serverless, multi-instance, and edge deployments work without session affinity or shared stores.

**Existing infrastructure works.** Because routing metadata now lives in HTTP headers, your existing proxies, gateways, WAFs, and observability tools can act on MCP traffic without deep packet inspection. Promote a parameter to a header and a global load balancer can dispatch on it directly.

**Interactive tools survive.** MRTR means a tool can pause, ask for user confirmation, resume, and complete, all without a persistent session. The model threads an identifier from one call to the next, which is often more powerful than hidden transport state because the model can reason about it and compose it across tools.

If you maintain MCP servers, the migration path is straightforward: SDK 2.0 defaults to stateless, and older clients still work because the SDK falls back to the legacy handshake when needed. If you adopted the experimental Tasks extension from the 2025-11-25 spec, that is the one breaking change; the new Tasks design (SEP-2663) is not wire-compatible with the old one.

## Sources

- Model Context Protocol, "Specification 2026-07-28": https://modelcontextprotocol.io/specification/2026-07-28
- Microsoft .NET Blog, "Announcing v2.0 of the official MCP C# SDK" (28 July 2026): https://devblogs.microsoft.com/dotnet/announcing-v20-of-the-official-mcp-csharp-sdk/
- Cloudflare, "Cloudflare MCP servers support the new MCP 2026-07-28 Specification" (28 July 2026): https://developers.cloudflare.com/changelog/post/2026-07-28-cloudflare-mcp-servers-mcp-2026-07-28/
- AWS, "How AgentCore Gateway supports the MCP 2026-07-28 spec" (July 2026): https://aws.amazon.com/blogs/machine-learning/how-agentcore-gateway-supports-the-mcp-2026-07-28-spec/

## Further reading

- [MCP turns one](/news/mcp-turns-one/): the protocol's first year and earlier milestones.
- [What is MCP?](/glossary/mcp/): the protocol explained from scratch.
- [Bedrock AgentCore](/news/bedrock-agentcore-general-availability/): AWS's MCP-compatible agent infrastructure.
