---
title: "Context Engineering"
description: "Curate the optimal set of tokens for every model call to cut cost and improve accuracy across multi-turn agents."
date: 2026-06-23
categories: [Guides]
tags: ["context-engineering", "llm", "agents", "prompt-caching", "rag", "token-optimization"]
tools: []
related: [ "guides/ai-agent-memory-management", "guides/multi-model-routing", "guides/building-rag-systems", "glossary/tokenization", "guides/llm-cost-optimization" ]
last_updated: 2026-06-23
---

Context engineering is the practice of deciding which tokens a model sees on each call, in what order, and at what cost. It treats the context window as a budget, not a bucket. Done well, it cuts token spend and raises answer accuracy at the same time, because the model stops drowning in irrelevant text.

<figure class="bz-figure">
  <img src="/img/obsidian-lab/filing-cabinet-amber-notext.png" alt="A long bank of dark filing cabinets with a single drawer open and glowing amber. No em-dashes." loading="lazy">
  <figcaption>You pull one drawer from a hundred: that selection is the work, the same way curating the optimal set of tokens is the work the model cannot do for you.</figcaption>
</figure>

Anthropic defines context engineering as "the set of strategies for curating and maintaining the optimal set of tokens during LLM inference," and frames it as the natural progression of prompt engineering for multi-turn agents ([Anthropic, 2025](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)). This guide shows you what to select, how to order it, when to compact it, and how caching changes the cost math.

## The context lifecycle

Every agent turn moves tokens through the same stages. Name them, and you can optimize each one.

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 1</span>
    <span class="bz-flow-step-name">Select</span>
    <span class="bz-flow-step-desc">Pick only the chunks, tools, and history this turn needs. Drop the rest.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 2</span>
    <span class="bz-flow-step-name">Order</span>
    <span class="bz-flow-step-desc">Put the most relevant tokens at the start and end, not buried in the middle.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 3</span>
    <span class="bz-flow-step-name">Compact</span>
    <span class="bz-flow-step-desc">Summarize old history near the limit and reinitialize the window.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 4</span>
    <span class="bz-flow-step-name">Cache</span>
    <span class="bz-flow-step-desc">Reuse the stable prefix across calls at a steep discount.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 5</span>
    <span class="bz-flow-step-name">Retrieve</span>
    <span class="bz-flow-step-desc">Load extra data at runtime through tools, only when the turn calls for it.</span>
  </div>
</div>

## Context engineering vs prompt engineering

Prompt engineering is writing the instructions: the system prompt, the few-shot examples, the wording of the task. You craft those once and reuse them.

Context engineering is broader. It decides the whole set of tokens that reaches the model on each inference, across many turns. Anthropic calls it the natural progression of prompt engineering for multi-turn agents ([Anthropic, 2025](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)). A single chatbot reply is mostly a prompt-engineering problem. A 40-turn agent that calls tools, reads files, and tracks state is a context-engineering problem.

The shift matters because context is finite. Anthropic frames it as "a finite resource with diminishing marginal returns" and uses the term "context rot": as token count grows, accuracy and recall degrade ([Anthropic, 2025](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents); [Anthropic context windows docs](https://platform.claude.com/docs/en/build-with-claude/context-windows)). More tokens is not more intelligence. Past a point, more tokens is less.

## The lost-in-the-middle and context-rot problem

Two studies explain why stuffing the window backfires.

Liu et al. found a U-shaped accuracy curve. Models answer best when the relevant information sits at the start or the end of the context, and accuracy degrades when that information lands in the middle. The effect holds even for models built for long contexts ([Liu et al., TACL 2024](https://arxiv.org/abs/2307.03172)). Picture a reader who remembers the first page and the last page of a report, but skims the hundred pages between.

Chroma's "Context Rot" study tested 18 models and found performance degrades non-uniformly as input length grows, even on simple retrieval tasks ([Hong, Troynikov, Huber, Chroma, 2025](https://research.trychroma.com/context-rot)). The model does not fail gracefully at a clean cutoff. It gets unreliable in patches as the window fills.

Together these mean two things. First, position is a lever you control: put the load-bearing tokens at the edges. Second, length is a cost even when you are under the limit: a 1M-token window does not mean you should fill it. 1M-token windows are now common across frontier model lines as of 2026 ([Anthropic context windows docs](https://platform.claude.com/docs/en/build-with-claude/context-windows)), which makes disciplined selection more important, not less.

## Techniques to cut tokens

Anthropic names a set of techniques for keeping the window lean ([Anthropic, 2025](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)). Use them together.

### Selection and curation

Load only what the turn needs. If the user asks about one invoice, do not load the whole ledger. Selection is the highest-leverage step, because every token you do not add is a token that cannot rot the rest.

### Ordering

Place the most relevant content where the model reads it best: at the start or the end. Liu et al. give you the rule directly ([Liu et al., TACL 2024](https://arxiv.org/abs/2307.03172)). Keep retrieved chunks ranked by relevance, and put the question last so it sits at the high-recall tail.

### Compaction

When history approaches the window limit, summarize the earlier turns and reinitialize the context with that summary plus recent turns ([Anthropic, 2025](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)). You trade exact transcript for a compact gist, and you reclaim room to keep going. A long support conversation becomes a three-line summary plus the last few exchanges.

### Structured note-taking and memory

Persist notes outside the window. The agent writes findings to a file or a store, then reads them back later instead of carrying every detail in-context ([Anthropic, 2025](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)). This is how an agent remembers across sessions without paying to re-read its whole history each turn.

### Just-in-time retrieval

Load data at runtime through tools rather than front-loading it ([Anthropic, 2025](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)). The model asks for a record when it needs one, and the tool result enters context only then. Tool-result clearing removes those results once they are no longer needed, keeping the window from filling with stale lookups.

### Sub-agent architectures

Hand focused work to sub-agents with clean windows. Each sub-agent runs its own narrow task and returns a condensed summary to the main agent ([Anthropic, 2025](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)). The main agent never sees the sub-agent's full scratch work, only the result.

Here is a context-assembly function that selects and orders only the relevant chunks before the model ever sees them.

```python
def assemble_context(query, chunks, max_chunk_tokens=4000):
    """Select and order chunks so the model reads the best ones at the edges."""
    # 1. Score every candidate chunk for relevance to the query.
    scored = [(score(query, c), c) for c in chunks]
    scored.sort(key=lambda pair: pair[0], reverse=True)

    # 2. Select only chunks that fit the budget. Drop the long tail.
    selected, used = [], 0
    for relevance, chunk in scored:
        if used + chunk.tokens > max_chunk_tokens:
            break
        selected.append((relevance, chunk))
        used += chunk.tokens

    # 3. Order so the strongest chunk sits first and the second sits last,
    #    keeping weaker chunks in the middle where recall matters least.
    selected.sort(key=lambda pair: pair[0], reverse=True)
    ranked = [chunk for _, chunk in selected]
    edges = ranked[:1] + ranked[2:] + ranked[1:2]

    # 4. Put the question last so it lands at the high-recall tail.
    return "\n\n".join(c.text for c in edges) + f"\n\nQuestion: {query}"
```

## Prompt caching and the real discount

Caching reuses a processed prompt prefix across calls, so you pay full price for the stable part once instead of every request. The discounts are steep and worth designing around.

OpenAI caches automatically for prompts at or above 1,024 tokens, and states up to 80% lower latency and up to 90% lower input cost on cache hits ([OpenAI prompt caching](https://openai.com/index/api-prompt-caching/)). Anthropic prices cache reads at 0.1x base input, about 90% off, with cache writes at 1.25x base input for a 5-minute time-to-live or 2x for a 1-hour time-to-live ([Anthropic prompt caching docs](https://platform.claude.com/docs/en/build-with-claude/prompt-caching)). Google Gemini turns implicit caching on by default for Gemini 2.5 and newer, with a 4,096-token minimum, and passes the savings on automatically ([Google Gemini context caching](https://ai.google.dev/gemini-api/docs/caching)).

The design rule that follows: put stable content first, volatile content last. A cached prefix only pays off if its bytes stay identical across calls. Below, the long system prompt and the document carry the cache breakpoint, while the per-request question stays outside it.

```python
# Anthropic: mark the stable prefix as cacheable; keep the question outside it.
response = client.messages.create(
    model="claude-opus-4-8",
    max_tokens=1024,
    system=[
        {
            "type": "text",
            "text": LARGE_STABLE_DOCUMENT,        # reused every call
            "cache_control": {"type": "ephemeral"},  # cache write 1.25x, read 0.1x
        }
    ],
    messages=[{"role": "user", "content": user_question}],  # changes per call, not cached
)

# Verify the cache is working. If this stays zero, a silent change is breaking the prefix.
print(response.usage.cache_read_input_tokens)
```

Watch one trap: any byte change in the prefix invalidates the cache for everything after it. A timestamp or a per-request ID near the top means you pay the write premium every call and never get a read.

| | Selection | Compaction | Structured notes | Just-in-time retrieval | Prompt caching |
|---|---|---|---|---|---|
| **What it does** | Loads only relevant tokens | Summarizes old history | Persists state outside window | Loads data at runtime via tools | Reuses a stable prefix |
| **When to use** | Every turn | History nears the limit | State spans sessions | Data is large or optional | Prefix repeats across calls |
| **Typical saving** | Removes the long tail | Reclaims window room | Avoids re-reading history | Avoids front-loading data | Up to 90% off cached input |

## Long context vs RAG

A 1M-token window invites a tempting shortcut: skip retrieval and paste everything in. The evidence says it depends.

Li et al. found that long context generally beats retrieval-augmented generation (RAG) on question-answering tasks. But summarization-based retrieval is comparable, RAG keeps advantages on dialogue and general queries, and neither approach is universally best ([Li et al., 2024](https://arxiv.org/abs/2501.01880)). RAG is the pattern of fetching relevant chunks from a store and adding them to the prompt, instead of carrying the full corpus.

So treat it as a routing decision, not a dogma. For a single dense document and a factual question, long context often wins. For dialogue, broad queries, or a corpus too large to ever fit, retrieval earns its place. And the two are not exclusive: you can retrieve into a long window, then apply selection and ordering inside it. Context engineering is what makes either approach pay off, because both still face context rot once the window fills.

## Further reading

- [Effective context engineering for AI agents, Anthropic (2025)](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents): the source for compaction, structured note-taking, sub-agents, and just-in-time retrieval.
- [Lost in the Middle: How Language Models Use Long Contexts, Liu et al., TACL 2024](https://arxiv.org/abs/2307.03172): the U-shaped accuracy curve that drives ordering decisions.
- [Context Rot: How Increasing Input Tokens Impacts LLM Performance, Chroma (2025)](https://research.trychroma.com/context-rot): 18-model evidence that performance degrades non-uniformly as input grows.
- [Long Context vs. RAG for LLMs: An Evaluation and Revisits, Li et al. (2024)](https://arxiv.org/abs/2501.01880): when long context beats RAG and when it does not.
- [Anthropic prompt caching docs](https://platform.claude.com/docs/en/build-with-claude/prompt-caching): cache read and write multipliers and time-to-live options.
- [OpenAI prompt caching](https://openai.com/index/api-prompt-caching/): automatic caching threshold and the latency and cost savings.
- [Google Gemini context caching](https://ai.google.dev/gemini-api/docs/caching): implicit caching defaults and the token minimum.
- [Anthropic context windows docs](https://platform.claude.com/docs/en/build-with-claude/context-windows): context window sizes and token management.
- [Managing AI agent memory](/guides/ai-agent-memory-management/): persisting state outside the window across sessions.
- [Multi-model routing](/guides/multi-model-routing/): choosing the right model per request to control cost.
- [Building RAG systems](/guides/building-rag-systems/): the retrieval pattern this guide weighs against long context.
- [LLM cost optimization](/guides/llm-cost-optimization/): caching, model choice, and token discipline together.
- [Small vs large language models](/comparisons/small-vs-large-language-models/): how model size interacts with context budget.
