---
title: "MCP Turns One: Async Tasks, a Registry, and Apps Built With OpenAI"
description: "MCP's first anniversary spec (2025-11-25) adds async Tasks and simpler OAuth, alongside the official MCP Registry and the OpenAI co-authored Apps extension."
date: 2025-11-25
lastmod: 2026-06-15
last_updated: 2026-06-15
categories: [News]
tags: ["mcp", "ai-agents", "tool-use", "protocol", "integration", "intermediate", "anthropic"]
related:
  - tools/mcp-protocol
  - glossary/model-context-protocol
  - glossary/tool-use
  - tools/bedrock-agentcore
---

One year after Anthropic introduced it, the Model Context Protocol (MCP) has gone from a single company's idea to the default way AI agents connect to tools and data. On November 25, 2025, the project shipped the 2025-11-25 specification revision, marking the protocol's first birthday with three changes that matter to anyone wiring a model up to the real world: an experimental Tasks primitive for long-running work, a simpler and more standards-based authorization model, and a growing official Registry of servers. Around the same window, Anthropic and OpenAI, normally rivals, co-authored an Apps extension so that MCP servers can ship interactive interfaces, not just text.

## What happened

The headline of the 2025-11-25 revision is the experimental Tasks primitive (SEP-1686). Tasks turn any MCP request into a "call now, fetch later" operation: the client can start work, poll its status, and retrieve results within a server-defined window. A task moves through states (working, input_required, completed, failed, cancelled), which makes multi-step and long-running agent operations far easier to coordinate than the previous request-and-wait model.

The same revision reworked authorization. It adds OpenID Connect Discovery 1.0 for finding the authorization server, incremental scope consent via the WWW-Authenticate header (SEP-835), and OAuth Client ID Metadata Documents as the recommended client registration mechanism (SEP-991), moving the ecosystem away from Dynamic Client Registration. Other additions include URL mode elicitation for out-of-band credential flows (SEP-1036) and tool calling support in sampling (SEP-1577).

Two ecosystem pieces sit alongside the spec. The official MCP Registry, an open catalog and API for discovering public MCP servers at registry.modelcontextprotocol.io, launched in preview on September 8, 2025 and grew to close to two thousand entries by the anniversary. Separately, the MCP Apps extension (SEP-1865) was published on November 21, 2025, co-authored by core maintainers at Anthropic and OpenAI together with the MCP-UI creators. It standardizes how servers declare UI resources, link them to tools, and exchange messages with the host, so a server can render a real interface inside clients such as Claude, ChatGPT, Goose, and VS Code.

The momentum did not stop there. On December 9, 2025, Anthropic donated MCP to the Agentic AI Foundation, a directed fund under the Linux Foundation, with Block and OpenAI as co-founders and Google, Microsoft, AWS, Cloudflare, and Bloomberg as supporting organizations.

## Why it matters for builders

MCP is now the closest thing the industry has to a universal port for AI tooling, and the 2025-11-25 release is the first big sign of it maturing past the experimental stage:

- Tasks make MCP usable for real agent workloads. Indexing a repository, running a long report, or waiting on human approval no longer needs a custom side channel.
- The authorization changes lower the barrier to secure enterprise deployment. Standard OAuth discovery and metadata-based registration mean fewer bespoke integrations and a cleaner path through corporate identity providers.
- Cross-vendor governance reduces lock-in risk. With OpenAI and Anthropic co-authoring extensions and a neutral foundation now stewarding the spec, betting on MCP is less of a bet on any one company.

## What to do

- Pin to a known spec version. Tasks is experimental, so treat it as opt-in and confirm both your client and server negotiate 2025-11-25 before relying on it.
- Review your auth path. If you built on Dynamic Client Registration, plan a move toward OAuth Client ID Metadata Documents and OpenID Connect Discovery.
- Publish and discover through the Registry, but note it is still a preview without durability guarantees, so do not treat it as production infrastructure yet.
- If you want richer than text output, evaluate the Apps extension and the MCP-UI SDKs rather than inventing your own UI channel.

## Sources

1. Model Context Protocol Blog. "One Year of MCP: November 2025 Spec Release." [https://blog.modelcontextprotocol.io/posts/2025-11-25-first-mcp-anniversary/](https://blog.modelcontextprotocol.io/posts/2025-11-25-first-mcp-anniversary/)
2. Model Context Protocol. "Key Changes (2025-11-25)." [https://modelcontextprotocol.io/specification/2025-11-25/changelog](https://modelcontextprotocol.io/specification/2025-11-25/changelog)
3. Model Context Protocol Blog. "MCP Apps: Extending servers with interactive user interfaces." [https://blog.modelcontextprotocol.io/posts/2025-11-21-mcp-apps/](https://blog.modelcontextprotocol.io/posts/2025-11-21-mcp-apps/)
4. Model Context Protocol Blog. "Introducing the MCP Registry." [https://blog.modelcontextprotocol.io/posts/2025-09-08-mcp-registry-preview/](https://blog.modelcontextprotocol.io/posts/2025-09-08-mcp-registry-preview/)
5. Anthropic. "Donating the Model Context Protocol and establishing the Agentic AI Foundation." [https://www.anthropic.com/news/donating-the-model-context-protocol-and-establishing-of-the-agentic-ai-foundation](https://www.anthropic.com/news/donating-the-model-context-protocol-and-establishing-of-the-agentic-ai-foundation)
