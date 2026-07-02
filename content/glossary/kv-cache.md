---
title: "KV Cache"
description: "The key-value cache stores attention keys and values for tokens a transformer has already processed, so each new token is generated without recomputing them."
date: 2026-06-29
tags: ["inference", "transformers", "gpu", "serving", "long-context"]
related:
  - glossary/inference
  - glossary/continuous-batching
  - glossary/speculative-decoding
  - glossary/llm
---

<figure class="bz-figure">
  <img src="/img/dark-cherry/storage-lockers.png" alt="Dark metal lockers with red-glowing rows, representing cached key-value state reused during generation." loading="lazy">
  <figcaption>Each locker holds work already done, ready to reuse instead of redoing it - the same idea behind the KV cache.</figcaption>
</figure>

The KV cache (key-value cache) is memory a transformer keeps on the GPU while it generates text. When a model reads a prompt and produces one token at a time, the attention mechanism computes a key and a value vector for every token. The KV cache stores those keys and values so the model does not recompute them for the next token. This makes generation much faster, but the cache grows with every token, and that growth is one of the main limits on serving cost and context length.

## A plain analogy

Imagine reading a long book and writing a new sentence that has to fit the whole story so far. Without notes, you would reread every earlier page before writing each new word. That is slow and repetitive.

Instead, you keep running notes in the margin. Each time you finish a page, you jot down what matters. To write the next word, you glance at your notes rather than reread the book. The KV cache is those notes. The keys tell the model where to look, and the values are what it finds there. The model builds the notes once per token, then reuses them for every token that follows.

## How it works

A transformer generates text one token at a time, a process called autoregressive decoding. Each new token attends to all previous tokens. Attention needs three projections per token: a query, a key, and a value. The query comes from the current token. The keys and values come from every token seen so far.

The insight is that keys and values for past tokens never change once computed. Only the new token adds a new key and value. So the model caches them. Without a cache, generating token number 1,000 would recompute keys and values for the previous 999 tokens. With the cache, it computes them once and reads them back.

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 1</span>
    <span class="bz-flow-step-name">Process the prompt</span>
    <span class="bz-flow-step-desc">Compute keys and values for every prompt token and store them in the cache.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 2</span>
    <span class="bz-flow-step-name">Generate a token</span>
    <span class="bz-flow-step-desc">The new token attends to cached keys and values, plus its own.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 3</span>
    <span class="bz-flow-step-name">Append and repeat</span>
    <span class="bz-flow-step-desc">Add the new token's key and value to the cache, then generate the next.</span>
  </div>
</div>

The trade-off is memory. The cache grows linearly with the number of tokens, and it scales with the number of layers and attention heads in the model. A single long conversation can hold gigabytes of keys and values on the GPU. When many users share one GPU, their caches compete for the same limited memory. This is why a longer context window costs more to serve, and why the KV cache is central to both serving cost and long-context limits.

## Managing cache memory

Because the cache dominates GPU memory during serving, how it is stored matters. The vLLM system, introduced by Kwon and colleagues in 2023, describes the KV cache as memory that grows and shrinks dynamically per request and that naive systems waste through fragmentation. Their PagedAttention method borrows the paging idea from operating systems: it splits each cache into fixed-size blocks that need not sit next to each other in memory. The paper reports near-zero waste in KV cache memory and throughput 2 to 4 times higher than prior systems at the same latency, with larger gains on longer sequences.

Other techniques trim the cache itself. Grouped-query attention lets several query heads share one set of keys and values, shrinking the cache without a separate optimization step. Quantization stores keys and values in lower precision. Eviction and compression drop or summarize older entries. Each method trades a little accuracy or complexity for room to serve longer contexts or more users.

## Connections to related concepts

The KV cache is the engine of [inference](/glossary/inference/), the phase where a trained model produces output. It is what makes an [LLM](/glossary/llm/) fast enough to respond token by token in real time.

Two serving techniques build directly on it. [Continuous batching](/glossary/continuous-batching/) packs many requests onto one GPU, and their KV caches share that GPU's memory, so efficient cache management decides how many requests fit. [Speculative decoding](/glossary/speculative-decoding/) proposes several tokens at once with a small draft model, then verifies them against the cache in a single pass, cutting the number of full forward steps.

## Further reading

- [What is inference?](/glossary/inference/): the phase where the KV cache does its work.
- [Continuous batching](/glossary/continuous-batching/): how servers share KV cache memory across many requests.
- [Speculative decoding](/glossary/speculative-decoding/): generating multiple tokens per step against the cache.
- [Efficient Memory Management for Large Language Model Serving with PagedAttention](https://arxiv.org/abs/2309.06180): the vLLM paper that treats the KV cache like paged virtual memory.
- [Attention Is All You Need](https://arxiv.org/abs/1706.03762): the original transformer paper that defines the keys, values, and queries the cache stores.
- [vLLM documentation](https://docs.vllm.ai/): official docs for the serving engine built around PagedAttention and KV cache management.
