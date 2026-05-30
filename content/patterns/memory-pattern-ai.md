---
title: "Memory Patterns for Conversational AI - Short-Term and Long-Term"
description: "Architectural patterns for giving AI systems memory across conversations, from sliding context windows to persistent vector stores and user profiles."
date: 2026-03-28
categories: [Patterns]
tags: [memory, conversation, context-window, personalization, architecture]
related:
  - patterns/react-pattern-ai
  - patterns/agentic-workflows
  - patterns/retrieval-routing
last_updated: 2026-05-30
---

LLMs are stateless by default. Each API call starts fresh with no memory of previous interactions. Conversational applications need memory to maintain context within a session and across sessions. Memory patterns range from simple conversation history management to sophisticated long-term knowledge stores that make the AI feel like it knows the user.

## Short-Term Memory: Within a Conversation

**Full conversation history** - Append every user message and assistant response to the context window. Simple and effective for short conversations. Breaks down when the conversation exceeds the context window limit, which causes either truncation or errors.

**Sliding window** - Keep only the last N turns of conversation. Older messages are dropped. The model loses context from early in the conversation but stays within token limits. Works well when recent context is more important than historical context, which is true for most task-oriented conversations.

**Summarization buffer** - When the conversation grows long, summarize older messages into a condensed form and prepend the summary to recent messages. The model retains the gist of the full conversation while staying within token limits. The summarization can be done by a cheap model to minimize cost.

**Hierarchical memory** - Combine a summary of the full conversation, the last N turns in full detail, and any explicitly flagged important facts. This gives the model both the broad arc and the recent detail. More complex to implement but handles long conversations gracefully.

## Long-Term Memory: Across Conversations

**User profile store** - Extract and persist key facts about the user: preferences, past decisions, stated goals, expertise level. At the start of each new conversation, inject the user profile into the system prompt. The model appears to remember the user even though each session starts fresh.

**Conversation summaries** - At the end of each conversation, generate a summary and store it. At the start of the next conversation, retrieve and inject relevant past conversation summaries. This gives continuity without replaying entire past conversations.

**Vector memory** - Embed conversation turns and store them in a vector database. At the start of each interaction, retrieve the most semantically relevant past interactions based on the current query. This is selective - only related past context is loaded, not everything.

**Entity memory** - Track entities (people, projects, decisions) mentioned across conversations. Maintain a knowledge graph or structured store that links entities to facts and events. When an entity is mentioned in a new conversation, retrieve its full context.

## Implementation Considerations

**What to remember** - Not everything is worth persisting. Filter for facts, decisions, preferences, and unresolved questions. Discard small talk, repeated information, and routine interactions. A memory system that stores everything becomes noisy and expensive.

**When to forget** - Memory needs decay or expiration. User preferences change. Projects end. Stale information can cause the model to make incorrect assumptions. Implement time-based decay, explicit user deletion, or confidence-weighted retrieval that favors recent memories.

**Privacy and compliance** - Persistent memory stores contain personal information. Ensure compliance with data protection regulations (GDPR, CCPA). Give users the ability to view, edit, and delete their stored memories. Encrypt memory stores at rest and in transit.

**Memory consistency** - When the user corrects a previous statement ("Actually, I use Python, not Java"), update the stored memory. Contradictory memories confuse the model. Implement conflict resolution: newer information overrides older information for the same fact.

## Practical Architecture

A production memory system typically combines multiple patterns. Within a conversation, use a sliding window with summarization. Across conversations, maintain a user profile with vector-indexed past interactions. The system prompt assembles: the user profile, relevant past interaction snippets retrieved by semantic search, and the current conversation window.

Keep the memory retrieval fast. Memory injection happens on every turn, so retrieval latency directly impacts response time. Vector database queries should complete in under 100ms. Cache frequently accessed user profiles.

**Memory budget** - Allocate a fixed token budget for memory within the context window. For a 200K token context, you might allocate 5K tokens for user profile, 5K for past conversation retrieval, and reserve the rest for the current conversation and model output. Adjust these budgets based on your application's needs.
