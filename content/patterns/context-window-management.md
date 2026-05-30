---
title: "Context Window Management Patterns"
description: "Summarization, sliding window, retrieval-augmented, and hierarchical context patterns for handling conversations and documents that exceed model limits."
date: 2026-03-24
categories: [Patterns]
tags: ["ai-ml", "intermediate", "context-window", "prompt-management", "llm", "chunking", "memory"]
tools: [amazon-bedrock]
last_updated: 2026-05-30
---

Every language model has a context window - the maximum amount of text it can process in a single call. Claude 3.5 Sonnet supports 200,000 tokens; GPT-4o supports 128,000. These are large, but real-world applications regularly exceed them: long documents, extended conversations, large codebases, multi-document research. Context window management is the set of patterns for handling content that does not fit.

## Summarization Pattern

Compress past content to make room for new content. In a long conversation, replace the oldest turns with a summary when approaching the context limit.

**Implementation** - Track cumulative token count. When it exceeds a threshold (e.g., 80% of the limit), call the model to summarize the oldest N turns, replace them in the conversation history with the summary, and continue.

**Trade-offs** - Summarization loses detail. Fine-grained facts mentioned early in a conversation may be lost in the summary. For tasks where precise recall of earlier content matters, summarization is insufficient.

**Best for** - Conversational assistants, customer support bots, long coding sessions where the working context shifts over time.

## Sliding Window Pattern

Maintain a fixed-size window of the most recent N tokens, discarding everything older. Simple to implement and predictable.

**Implementation** - Truncate from the beginning of the conversation, preserving the system prompt and the most recent turns.

**Trade-offs** - Hard cutoff means anything outside the window is completely unavailable. No compression or synthesis of older content.

**Best for** - Real-time applications where only recent context matters (chatbots, live transcription assistance). Not suitable when historical context is frequently relevant.

## Retrieval-Augmented Context

Instead of keeping all content in context, store it externally and retrieve relevant sections at query time. The active context contains only what is currently relevant.

**Implementation** - The full document or conversation history is chunked, embedded, and stored in a vector database. Each new query retrieves the top-K most semantically similar chunks and includes them in the prompt.

**Trade-offs** - Retrieval is imperfect. Relevant content may not be retrieved if the query does not match it semantically. Retrieval adds latency (50-200ms typical).

**Best for** - Large knowledge bases, document Q&A systems, enterprise search. The standard pattern for "chat with your documents" applications.

## Hierarchical Context Pattern

Maintain different levels of granularity simultaneously. A high-level summary in the system prompt, mid-level summaries of major sections or time periods, and full detail for recent or current content.

**Implementation** - Requires a context management layer that maintains and updates multiple summary levels as the interaction progresses. More complex to implement but more robust than pure summarization or sliding window.

**Trade-offs** - Implementation complexity. Multiple model calls to maintain summary hierarchy adds cost and latency.

**Best for** - Long-running agents that need persistent memory of past actions; research assistants that work through multi-stage analysis over time.

## Choosing the Right Pattern

| Scenario | Recommended pattern |
|---|---|
| Chatbot, general assistant | Summarization or sliding window |
| Document Q&A | Retrieval-augmented |
| Long document analysis | Direct (if fits) or chunked processing |
| Multi-session persistent agent | Hierarchical |
| Real-time conversation | Sliding window |

## Token Budget Management

Regardless of which pattern you use, track token consumption explicitly. Cost per call scales with input token count; unexpected context growth causes cost spikes. Set hard limits at the application layer and log any cases that approach or exceed them. Context management bugs - where the context grows unboundedly rather than being managed - are one of the most common causes of AI cost overruns in production.
