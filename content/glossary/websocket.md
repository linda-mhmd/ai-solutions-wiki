---
title: "WebSocket"
description: "What WebSockets are, how they enable real-time bidirectional communication, and why they are used for streaming LLM token delivery to clients."
date: 2026-03-28
categories: [Glossary]
tags: [websocket, real-time, streaming, llm, api, frontend]
related:
  - glossary/grpc
  - guides/api-rate-limiting-ai
  - patterns/microservices-for-ai
last_updated: 2026-05-30
---

WebSocket is a communication protocol that provides full-duplex, bidirectional communication between a client and server over a single, long-lived TCP connection. Unlike HTTP's request-response model where the client initiates every exchange, WebSocket allows either side to send messages at any time after the connection is established.

The protocol starts with an HTTP upgrade handshake. Once upgraded, the connection remains open and both parties can send frames independently. This eliminates the overhead of establishing new connections for each message and enables true real-time communication.

## How WebSocket Differs from HTTP

**HTTP** - Client sends a request, server sends a response, connection may close or be reused for the next request. Server cannot push data without the client asking. Server-Sent Events (SSE) provide server-to-client streaming but not bidirectional communication.

**WebSocket** - After the initial handshake, both client and server send messages freely. No request-response pairing. No headers on each message. Lower latency, lower overhead.

**Server-Sent Events (SSE)** - A simpler alternative for server-to-client streaming over HTTP. SSE uses a standard HTTP connection with `text/event-stream` content type. The server pushes events; the client only listens. SSE is simpler to implement, works through most proxies and load balancers without special configuration, and supports automatic reconnection. For many LLM streaming use cases, SSE is sufficient and preferred over WebSocket.

## WebSocket for LLM Token Delivery

LLMs generate tokens sequentially. Without streaming, the user waits for the entire response to complete before seeing anything. With streaming, tokens are sent as they are generated, creating a typewriter effect that dramatically improves perceived responsiveness.

WebSocket is one option for this streaming delivery:

- The client opens a WebSocket connection and sends a prompt
- The server forwards the prompt to the LLM
- As each token is generated, the server pushes it through the WebSocket
- The client renders tokens incrementally
- Either side can close the connection (enabling user-initiated cancellation)

## Practical Considerations

**Load Balancing** - WebSocket connections are long-lived and stateful. Traditional round-robin load balancing assigns the connection once; all subsequent messages go to the same backend. This can create hotspots. Use connection-aware load balancing.

**Scaling** - Each WebSocket connection consumes server resources (memory, file descriptor). An inference service handling thousands of concurrent streaming requests needs careful resource planning.

**Fallback** - Not all networks support WebSocket (some corporate proxies block the upgrade). Implement SSE or long-polling fallback for resilience.

For most LLM streaming scenarios, SSE is simpler and sufficient. Choose WebSocket when you need bidirectional communication - for example, interactive AI applications where the user can send follow-up messages or cancel mid-stream.

## Sources

- Fette, I., & Melnikov, A. (2011). *The WebSocket Protocol*. RFC 6455. IETF. (The formal WebSocket specification; upgrade handshake, frame format, and close handshake.)
- Grigorik, I. (2013). *High Performance Browser Networking*. O'Reilly Media. Chapter 17: WebSocket. (WebSocket architecture; multiplexing, framing, and the performance characteristics compared to HTTP polling and SSE.)
- HTML Living Standard. (2023). *Server-Sent Events*. WHATWG. (SSE as an alternative to WebSocket for server-to-client streaming; the comparison relevant to LLM token streaming decisions.)
