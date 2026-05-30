---
title: "Response Streaming Patterns for AI Applications"
description: "Implementing streaming responses from LLMs for improved perceived latency. Server-sent events, chunked processing, and progressive rendering."
date: 2026-03-28
categories: [Patterns]
tags: [streaming, latency, user-experience, architecture, real-time]
last_updated: 2026-05-30
---

LLM responses take seconds to generate fully, but they are produced token by token. Streaming sends tokens to the user as they are generated rather than waiting for the complete response. This dramatically improves perceived latency - the user sees content appear within milliseconds instead of waiting seconds for a complete response.

## Why Streaming Matters

Time-to-first-token (TTFT) is the metric that matters for user perception. A response that takes 5 seconds to generate fully but starts streaming after 200ms feels fast. The same response delivered all at once after 5 seconds feels slow. Streaming does not reduce total generation time, but it transforms the user experience from waiting to reading.

**When to stream** - User-facing conversational interfaces, chat applications, code generation tools, and any scenario where the user reads the response progressively. Streaming is most valuable for long responses where the total generation time is noticeable.

**When not to stream** - When the response needs to be processed as a complete unit before taking action (JSON parsing, function calling, classification decisions). When the response is short enough that total generation time is under one second. When downstream systems cannot handle partial data.

## Server-Sent Events (SSE)

The most common transport for streaming LLM responses to web clients.

**Implementation** - The server establishes an SSE connection with the client. As tokens arrive from the model API, they are forwarded to the client as SSE events. The client renders tokens as they arrive. When generation is complete, the server sends a final event to close the stream.

**Error handling** - SSE connections can drop due to network issues, proxy timeouts, or load balancer limits. Implement automatic reconnection with the ability to resume from the last received token. Include sequence numbers in events so the client can detect gaps.

**Proxy considerations** - Many reverse proxies and CDNs buffer responses by default, which breaks streaming. Configure proxies to pass through chunked responses without buffering. Nginx requires `proxy_buffering off`. CloudFront requires chunked transfer encoding support.

## Chunked Processing

For backend pipelines that process model output, chunking handles partial responses as they arrive.

**Sentence-level chunking** - Buffer streamed tokens until a sentence boundary is detected (period, newline, closing bracket for structured output). Process complete sentences as they arrive. This is useful for translation pipelines, text-to-speech, and progressive summarization.

**Structured output chunking** - For JSON or structured responses, buffer until a complete object or field is received. Parse and validate each complete chunk independently. This enables progressive processing of structured outputs without waiting for the full response.

## Progressive Rendering

On the client side, render streamed content in a way that is visually smooth and readable.

**Text rendering** - Append tokens to the display as they arrive. Apply formatting (markdown rendering, code highlighting) incrementally. Avoid re-rendering the entire response on each new token - this causes visual jitter and performance issues on long responses.

**Typing indicator** - Show a typing indicator or cursor at the end of the streamed text to signal that more content is coming. Remove it when generation is complete. This sets correct user expectations about the response length.

## Architecture Patterns

**Stream multiplexing** - When multiple model calls contribute to a single response (parallel tool calls, multi-step reasoning), multiplex their streams into a single client connection. Present results as they become available from each source.

**Stream transformation** - Insert processing steps between the model stream and the client. Moderation filters, citation injection, and formatting transformations can operate on the stream in real-time without buffering the entire response.

**Stream persistence** - Write the complete streamed response to storage after generation completes. This enables response caching, audit logging, and conversation history without requiring the client to send the response back to the server.
