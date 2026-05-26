---
title: "Prompt Caching"
description: "Server-side caching of attention key/value tensors for repeated prompt prefixes, reducing latency and cost for applications that issue many requests sharing a long shared context."
date: 2026-05-08
lastmod: 2026-05-08
categories: [Glossary]
tags: ["ai-ml", "intermediate", "llm", "performance", "cost-optimization", "inference"]
related:
  - glossary/llm
  - glossary/prompt-engineering
  - glossary/inference-time-compute
  - glossary/transformer-architecture
  - glossary/long-context-model
---

Prompt caching is an LLM serving optimisation in which the attention key/value (KV) tensors computed for a shared prompt prefix are stored and reused across subsequent requests, instead of being recomputed each time. For applications that send many requests with the same long prefix — system prompts, document context, agent histories, few-shot examples, RAG-augmented prompts — prompt caching reduces both time-to-first-token latency and per-call cost by an amount proportional to the cached prefix length. Cache discounts of 50–90% are typical at provider APIs (Anthropic, OpenAI, Google, AWS Bedrock).

## Mechanism

A transformer's attention layer computes Query, Key, and Value tensors for each token. For autoregressive generation, the KV tensors of the input tokens do not depend on tokens to their right, so once computed they can be reused. This is *KV caching* and it is the standard inference optimisation for generation within a single request.

Prompt caching extends this across requests. The server identifies a shared prefix between a new request and a recent request, retrieves the cached KV tensors for that prefix, and skips the prefill computation for those tokens. The prefill phase — typically the latency bottleneck for long prompts — collapses to the suffix only.

For the cache hit to be valid, the prefix must be identical *bit-for-bit*: same tokens, same model version, same model parameters. Even one differing token invalidates the prefix from that point on. Provider implementations specify the granularity (Anthropic uses explicit `cache_control` markers; OpenAI's automatic caching keys on the first ~1024 tokens; Bedrock and Google have similar semantics).

## When Prompt Caching Pays Off

Caching is most valuable when:

- A long prefix (system prompt, document, knowledge-base context) is shared across many requests
- Requests arrive close enough in time to hit the cache TTL (typically 5 minutes; sometimes extended to hours for paid tiers)
- The suffix (per-request user input) is much shorter than the prefix
- The application is latency-sensitive (chat interfaces, agent loops)

It does not help when:

- Each request has a unique prompt structure
- The prefix is short (the cache lookup overhead dominates the savings)
- Cache TTL is too short for the request arrival rate (cache misses every time)
- The application is throughput-bounded rather than latency-bounded (caching reduces per-request compute but does not increase server peak throughput)

## Provider Semantics (2024–2026)

Provider implementations differ in important details:

- **Anthropic Claude**: explicit `cache_control: {"type": "ephemeral"}` markers in messages declare cache breakpoints. Up to four breakpoints per request. 5-minute or 1-hour TTL. Cache writes cost ~25% more than base, cache reads cost ~10% of base; net win at >2 reuses.
- **OpenAI**: automatic caching for prompts above 1024 tokens, in 128-token blocks. No explicit markers. ~50% discount on cached input tokens. Cache TTL ~5–10 minutes.
- **Google Gemini**: explicit context caching API (`CachedContent`) with controllable TTL. Storage cost separate from per-request cost.
- **AWS Bedrock**: prompt caching support varies by model (Claude on Bedrock supports `cachePoint` blocks via Converse API, mirroring Anthropic semantics).

The economics shift with the discount and TTL. A long system prompt shared across an active chat session is almost always profitable to cache. A document referenced once and then dropped is not.

## Engineering Patterns

- **Cache the static prefix, vary the suffix.** Move all per-request variation to the end of the prompt. Reorder system instructions, RAG context, and tool definitions to be prefix-stable.
- **Tokenisation discipline.** Pre-tokenise the static prefix and keep it identical (same whitespace, same JSON formatting) across requests. Subtle formatting differences (trailing spaces, key order in JSON) invalidate the cache.
- **Batch independent calls.** When using the same long prefix for N parallel calls (evaluation, batch inference), stagger them so the second call onward hits the cache.
- **Mind the TTL.** For low-volume but latency-sensitive applications, the cache TTL may expire between calls; consider keep-alive requests or longer TTL tiers.
- **Measure end-to-end.** Provider-reported cache hit rates do not always translate one-to-one to user-visible latency. Measure TTFT (time-to-first-token) on representative traffic.

## Relation to KV Caching and Speculative Decoding

Prompt caching is *cross-request* KV cache reuse. Within a single request, *intra-request* KV caching (the standard generation optimisation) is always on. *Speculative decoding* (Leviathan et al., 2023; Chen et al., 2023) is a separate optimisation that accelerates the decode phase by drafting multiple tokens with a small model and verifying with the large model. Prompt caching, KV caching, and speculative decoding compose; together they account for most of the serving-cost gap between a naive implementation and production-grade LLM serving.

## Related Concepts

- [Inference-Time Compute](/glossary/inference-time-compute/) — orthogonal scaling axis; caching is about *reducing* inference compute
- [Long-Context Model](/glossary/long-context-model/) — long-context use cases benefit most from caching
- [Prompt Engineering](/glossary/prompt-engineering/) — schema design for cache-friendliness is part of prompt engineering
- [Token Budget](/glossary/token-budget/) — caching changes the cost calculus for token-heavy prompts
- [Transformer Architecture](/glossary/transformer-architecture/) — the substrate KV caching exploits

## Sources and Further Reading

- Pope, R., Douglas, S., Chowdhery, A., et al. (2023). *Efficiently Scaling Transformer Inference.* MLSys 2023. arXiv:2211.05102. [https://arxiv.org/abs/2211.05102](https://arxiv.org/abs/2211.05102)
- Kwon, W., Li, Z., Zhuang, S., et al. (2023). *Efficient Memory Management for Large Language Model Serving with PagedAttention (vLLM).* SOSP 2023. arXiv:2309.06180. [https://arxiv.org/abs/2309.06180](https://arxiv.org/abs/2309.06180)
- Zheng, L., Yin, L., Xie, Z., et al. (2024). *SGLang: Efficient Execution of Structured Language Model Programs.* arXiv:2312.07104. [https://arxiv.org/abs/2312.07104](https://arxiv.org/abs/2312.07104) (RadixAttention; prefix-tree-based KV reuse)
- Leviathan, Y., Kalman, M., Matias, Y. (2023). *Fast Inference from Transformers via Speculative Decoding.* ICML 2023. arXiv:2211.17192. [https://arxiv.org/abs/2211.17192](https://arxiv.org/abs/2211.17192)
- Chen, C., Borgeaud, S., Irving, G., et al. (2023). *Accelerating Large Language Model Decoding with Speculative Sampling.* arXiv:2302.01318. [https://arxiv.org/abs/2302.01318](https://arxiv.org/abs/2302.01318)
- Anthropic. *Prompt caching.* [https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching](https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching)
- OpenAI. *Prompt caching.* [https://platform.openai.com/docs/guides/prompt-caching](https://platform.openai.com/docs/guides/prompt-caching)
- Google. *Gemini context caching.* [https://ai.google.dev/gemini-api/docs/caching](https://ai.google.dev/gemini-api/docs/caching)
- AWS. *Amazon Bedrock prompt caching.* [https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-caching.html](https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-caching.html)
