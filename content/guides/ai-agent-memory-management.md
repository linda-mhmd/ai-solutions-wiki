---
title: "AI Agent Memory Management"
description: "How to give AI agents short-term and long-term memory using summarization, memory files, and vector retrieval, with patterns from MemGPT, Mem0, and Anthropic."
date: 2026-06-23
categories: [Guides]
tags: ["agents", "memory", "context-engineering", "rag", "embeddings", "llm"]
tools: []
related: ["guides/context-engineering", "guides/building-rag-systems", "glossary/embeddings", "glossary/rag", "guides/multi-model-routing"]
last_updated: 2026-06-23
---

An AI agent forgets everything the moment its context window fills or a session ends. Memory management is the practice of storing what matters outside the window and bringing it back when the agent needs it. This guide shows you the architecture, the memory types, and the concrete techniques that production agents use today.

<figure class="bz-figure">
  <img src="/img/dark-cherry/storage-lockers.png" alt="Rows of dark metal storage lockers with red-glowing seams in an industrial corridor. No em-dashes." loading="lazy">
  <figcaption>A labelled locker holds one item until you open it: an agent's long-term store keeps facts out of the window until retrieval pulls the right one back.</figcaption>
</figure>

## The memory architecture at a glance

Agent memory works in layers. The working context lives inside the model's window. Everything else lives in stores you control, and a retrieval step decides what to load.

<div class="bz-arch">
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Working context</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">System prompt</span>
      <span class="bz-arch-chip">Current messages</span>
      <span class="bz-arch-chip-note">in-window, finite, fast</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Short-term thread memory</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Message history</span>
      <span class="bz-arch-chip">Running summary</span>
      <span class="bz-arch-chip-note">one session, recent turns</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Long-term store</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Memory files</span>
      <span class="bz-arch-chip">Vector database</span>
      <span class="bz-arch-chip">Knowledge graph</span>
      <span class="bz-arch-chip-note">across sessions, durable</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Retrieval</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Similarity search</span>
      <span class="bz-arch-chip">Top-k selection</span>
      <span class="bz-arch-chip-note">picks what to load into context</span>
    </div>
  </div>
</div>

## Why agents need memory: the token-cost problem

The naive fix for forgetting is to paste everything into the prompt. That breaks fast. Anthropic frames context as "a finite resource with diminishing marginal returns" and warns about "context rot," where quality degrades as the window fills [7]. Long prompts cost more tokens, run slower, and bury the signal the model needs.

Anthropic lists three mitigations: compaction, structured note-taking (agentic memory), and sub-agents [7]. Each one keeps the working context small while preserving what the agent learned. Memory management is the discipline of choosing which technique fits which need.

## Short-term versus long-term memory

LangChain draws a clear line between the two scopes [8]. Short-term memory is thread-scoped: it holds the message history inside one session. Long-term memory is shared across threads and recallable at any time [8]. A chat that remembers the last ten turns uses short-term memory. An agent that recalls your name three weeks later uses long-term memory.

| | Short-term memory | Long-term memory |
|---|---|---|
| **Scope** | One thread or session [8] | Shared across all threads [8] |
| **Lifespan** | Ends with the session | Persists indefinitely |
| **Storage** | Message history, running summary | Memory files, vector database, graph |
| **Example** | Recent turns in this chat | A user preference recalled weeks later |

## Memory types: episodic, semantic, procedural

LangChain maps human memory onto agents using three categories [8]:

- **Semantic memory** stores facts and knowledge [8]. Example: "The user works in healthcare."
- **Episodic memory** stores past experiences and actions [8]. Example: "Last session the agent booked a flight to Lisbon."
- **Procedural memory** stores instructions and behavior [8]. Example: "Always confirm before sending an email."

You design storage around these types. Semantic facts suit a vector store or key-value file. Episodic traces suit an append-only log. Procedural rules often live in the system prompt or a dedicated instructions file.

## Technique 1: summarization and compaction

When the window approaches its limit, you compress older turns into a summary. Anthropic ships this as compaction, a server-side feature that auto-summarizes older context when the conversation nears the window limit (beta, January 2026) [6]. The agent keeps going without you managing the cutoff by hand.

You can also write compaction yourself. The pattern: watch the token count, and when it crosses a threshold, replace old messages with a model-generated summary.

```python
def maybe_compact(messages, token_count, limit=150_000, keep_recent=6):
    """Summarize older turns when context nears the window limit."""
    if token_count < limit:
        return messages

    older = messages[:-keep_recent]
    recent = messages[-keep_recent:]

    summary = llm.complete(
        "Summarize the conversation below. Keep decisions, facts, "
        "and open tasks. Drop small talk.\n\n" + render(older)
    )

    return [{"role": "system", "content": f"Summary so far: {summary}"}, *recent]
```

This keeps the recent turns verbatim and folds the rest into one compact note. You trade some detail for a much smaller, cheaper context.

## Technique 2: structured note-taking and memory files

Compaction loses detail by design. Memory files do not. Anthropic's memory tool is a client-side, file-based store: a `/memories` directory with view, create, edit, and delete commands [5]. It persists across sessions, and it survives compaction [5]. The agent writes notes to disk and reads them back later.

This is structured note-taking, one of Anthropic's three context mitigations [7]. The agent decides what to record. A common pattern: write semantic facts and procedural rules to memory files, then load the relevant file at the start of each session.

```python
# The agent records a durable fact during a session.
memory.create("/memories/user-profile.md",
              "- Works in healthcare\n- Prefers concise replies")

# A later session reads it back into context.
profile = memory.view("/memories/user-profile.md")
context = f"What you remember about this user:\n{profile}"
```

## Technique 3: vector memory and similarity retrieval

For large or open-ended memory, you cannot load every note. Vector databases serve as long-term memory by embedding stored experiences and facts, then retrieving by similarity [4][7]. This is the same RAG and embeddings pattern you use for documents, applied to the agent's own history.

An embedding turns text into a numeric vector. Similar meanings land near each other. At recall time, you embed the query, search for the nearest stored vectors, and load the top matches into context.

```python
def remember(text, store):
    """Store a fact with its embedding for later similarity search."""
    vector = embed(text)
    store.add(text=text, vector=vector)

def recall(query, store, k=5):
    """Retrieve the top-k most relevant memories for this query."""
    query_vector = embed(query)
    hits = store.search(query_vector, top_k=k)
    return "\n".join(hit.text for hit in hits)

# Inject retrieved memory into the prompt.
relevant = recall("What does the user do for work?", store)
prompt = f"Relevant memory:\n{relevant}\n\nUser: {user_message}"
```

You store many facts cheaply and load only the few that match the current turn. This is how an agent recalls one detail from thousands without filling the window.

## MemGPT: virtual context management and Letta

MemGPT introduces "virtual context management," an operating-system-inspired technique [1]. It pages data between a fixed in-window main context and external out-of-window context [1]. This extends the effective context beyond the model's window, the way an OS pages memory between RAM and disk [1]. The agent itself decides what to page in and out. The open-source successor to MemGPT is Letta [1][9].

The lesson for builders: treat the window as scarce RAM and your store as cheap disk. Move data across that boundary on demand rather than holding everything resident.

## Generative Agents: the memory stream and reflection

The Generative Agents work from Stanford and Google, published at UIST '23, shows a richer model [2]. Each agent stored a complete natural-language "memory stream" of its experiences [2]. It synthesized higher-level "reflections" from those raw memories, and it retrieved memories dynamically to plan behavior [2].

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 1</span>
    <span class="bz-flow-step-name">Observe</span>
    <span class="bz-flow-step-desc">Record each experience to the memory stream as natural language.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 2</span>
    <span class="bz-flow-step-name">Reflect</span>
    <span class="bz-flow-step-desc">Synthesize higher-level insights from clusters of raw memories.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 3</span>
    <span class="bz-flow-step-name">Retrieve</span>
    <span class="bz-flow-step-desc">Pull relevant memories dynamically to plan the next action.</span>
  </div>
</div>

Reflection matters because raw logs grow noisy. Summarizing experiences into stable insights gives the agent a usable long-term view instead of an unbounded transcript.

## Mem0: production results

Mem0 packages these ideas for production. It dynamically extracts, consolidates, and retrieves salient information, and a graph variant captures relationships between memories [3]. Rather than storing every message, it keeps the facts worth keeping.

On the LOCOMO benchmark, Mem0 reports a 26% relative improvement over OpenAI's memory system, about 91% lower p95 latency, and over 90% token cost savings versus passing full context [3]. Those numbers show the payoff: a curated memory layer beats stuffing the window on quality, speed, and cost at once [3].

## Putting it together

Use short-term memory for the live session and long-term stores for everything that must outlast it [8]. Compact when you need to stay under the window and can lose detail [6]. Write memory files when the agent must keep a fact exactly [5]. Use vector retrieval when the store grows past what fits in context [4]. Match the technique to the memory type, and the agent remembers what matters without paying for what it does not.

## Further reading

- [MemGPT: Towards LLMs as Operating Systems](https://arxiv.org/abs/2310.08560): Packer et al., 2023, introduces virtual context management and paging between in-window and external context.
- [Generative Agents: Interactive Simulacra of Human Behavior](https://arxiv.org/abs/2304.03442): Park et al., UIST '23, defines the memory stream and reflection pattern.
- [Mem0: Building Production-Ready AI Agents with Scalable Long-Term Memory](https://arxiv.org/abs/2504.19413): Chhikara et al., 2025, reports LOCOMO benchmark results for extraction and consolidation.
- [A Survey on the Memory Mechanism of LLM based Agents](https://arxiv.org/abs/2404.13501): Zhang et al., 2024, surveys memory designs including vector-based retrieval.
- [Anthropic memory tool docs](https://platform.claude.com/docs/en/agents-and-tools/tool-use/memory-tool): the client-side, file-based memory store that persists across sessions and compaction.
- [Anthropic compaction docs](https://platform.claude.com/docs/en/build-with-claude/compaction): server-side auto-summarization of older context near the window limit.
- [Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents): Anthropic on context as a finite resource and the three mitigations.
- [LangChain memory overview](https://docs.langchain.com/oss/python/concepts/memory): short-term versus long-term scope and the semantic, episodic, procedural types.
- [mem0 official repo](https://github.com/mem0ai/mem0): the open-source implementation, including the graph variant.
- [Context engineering](/guides/context-engineering/): how to shape what goes into the window before memory ever loads.
- [Building RAG systems](/guides/building-rag-systems/): the retrieval pattern that vector memory reuses.
- [Embeddings](/glossary/embeddings/): how text becomes the vectors that similarity search compares.
- [RAG](/glossary/rag/): retrieval-augmented generation, the foundation of vector memory.
- [Multi-model routing](/guides/multi-model-routing/): pairing a cheap model for summarization with a strong model for reasoning.
