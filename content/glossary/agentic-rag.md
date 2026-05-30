---
title: "Agentic RAG"
description: "Retrieval-Augmented Generation systems in which the language model actively plans, queries, critiques, and re-queries: moving from a single-shot retrieve-then-read pipeline to an agent loop over retrieval tools."
date: 2026-05-08
lastmod: 2026-05-08
categories: [Glossary]
tags: ["ai-ml", "advanced", "rag", "agents", "retrieval", "tool-use"]
related:
  - glossary/rag
  - glossary/ai-agent
  - glossary/tool-use
  - glossary/function-calling
  - glossary/rag-evaluation
  - patterns/rag-implementation
last_updated: 2026-05-30
---

Agentic RAG is a class of retrieval-augmented generation architecture in which the language model is given retrieval as one tool among several and decides at each turn whether and how to query, rather than executing a fixed retrieve-then-read pipeline. The shift from *pipeline RAG* (a single retrieval call followed by a single generation call) to *agentic RAG* (an iterative agent loop over retrieval, search, sub-query decomposition, and self-critique) is one of the dominant architectural patterns in production AI systems built since 2024.

The motivation is empirical: classic RAG (Lewis et al., 2020) performs well on simple lookup queries but degrades on multi-hop questions, ambiguous queries, comparative reasoning, and questions whose answer requires evidence from multiple sources. Agentic patterns address these failure modes by giving the model control over the retrieval process.

## Mechanism

A minimal agentic RAG loop:

1. The agent receives a user query.
2. It plans (explicitly or implicitly): does this question need retrieval? If so, what sub-queries?
3. It calls a retrieval tool (vector search, keyword search, hybrid, web search, structured-database query), typically via [function calling](/glossary/function-calling/) or [MCP](/glossary/model-context-protocol/).
4. It evaluates the retrieved evidence: is it sufficient? relevant? from a trustworthy source?
5. If insufficient, it issues additional queries (with refined keywords, alternate sources, or decomposed sub-questions). If sufficient, it generates an answer with citations.
6. Optionally it self-critiques the draft against the retrieved evidence and revises (Self-RAG; Asai et al., 2024).

The agent loop terminates when the model judges the answer is complete, when a tool budget is exhausted, or when a fixed iteration cap is hit.

## Variants

Several named variants in the literature represent points on a spectrum of agency:

- **Self-RAG** (Asai et al., 2024): the model is post-trained to emit reflection tokens (`Retrieve`, `IsRel`, `IsSup`, `IsUse`) that decide when to retrieve and how to grade evidence.
- **CRAG / Corrective RAG** (Yan et al., 2024): a lightweight retrieval evaluator triages retrieved documents into Correct, Incorrect, Ambiguous; ambiguous and incorrect cases trigger web search.
- **Adaptive-RAG** (Jeong et al., 2024): a query classifier routes simple queries to direct LLM, single-hop queries to single-step retrieval, multi-hop queries to multi-step retrieval.
- **Agentic decomposition**: the agent rewrites the query into sub-questions (HyDE; Gao et al., 2023), retrieves for each, and synthesises.
- **Tool-augmented RAG**: retrieval is one tool alongside calculators, code interpreters, and APIs (ReAct lineage; Yao et al., 2023).
- **Long-context hybrid**: for long-context models, the agent decides whether to retrieve at all or stuff the context window directly. See [RAG vs Long Context](/comparisons/rag-vs-long-context/).

## When to Use Agentic RAG

The right architecture when:

- Queries vary in complexity (mixed simple lookups and multi-hop questions)
- Retrieval quality is high-variance and benefits from re-querying
- Evidence sufficiency check is required (compliance, citation-bearing answers)
- Multiple sources / indices are available and the agent can pick
- The latency budget tolerates 2–5× the inference cost of pipeline RAG

*Not* the right architecture when:

- The query distribution is narrow and pipeline RAG meets the quality bar (cost and latency win)
- Latency is hard-capped at p99 budgets that an agent loop cannot meet
- The retrieval index is high-quality and re-querying provides marginal gains
- Operations cannot tolerate the unpredictability of agent control flow (auditing and debugging are harder)

## Engineering Considerations

- **Bounded loops.** Always cap iterations and tool calls. Without bounds, agents can loop indefinitely or burn budget on unproductive queries.
- **Tool budget routing.** Cheap tools (in-process keyword search) can be called liberally; expensive tools (web search, large reranking) need stricter caps.
- **Query rewriting.** Empirically, query rewriting before retrieval (Ma et al., 2023) improves recall on conversational and multi-hop questions; agentic RAG inherits this.
- **Reranking inside the loop.** Cross-encoder rerankers (e.g. Cohere Rerank, BGE-rerank) reduce the noise the agent must reason over. See the reranking section in the [RAG glossary entry](/glossary/rag/).
- **Evidence grounding for the final answer.** Even with an agent loop, force the generation step to cite specific retrieved chunks; un-cited claims are the dominant failure mode.
- **Faithfulness evaluation.** Use [LLM-as-a-judge](/glossary/llm-as-a-judge/) faithfulness scoring (RAGAS, ARES) to detect cases where the agent answers despite insufficient evidence.

## Trade-offs vs Pipeline RAG

| Dimension | Pipeline RAG | Agentic RAG |
|---|---|---|
| Architecture | Linear: retrieve → generate | Loop: plan → retrieve → critique → ... |
| Latency | Predictable, low | Variable, higher |
| Cost per query | 1 retrieval + 1 generation | N retrievals + M generations |
| Multi-hop quality | Weak | Strong |
| Debuggability | High (single step) | Lower (multi-step trace) |
| Sufficient when | Queries are simple lookups | Queries are heterogeneous or complex |

## Related Concepts

- [RAG](/glossary/rag/): the underlying retrieval pattern
- [AI Agent](/glossary/ai-agent/): the broader agent paradigm
- [Tool Use](/glossary/tool-use/) and [Function Calling](/glossary/function-calling/): the mechanisms by which retrieval becomes a tool
- [Vector Database](/glossary/vector-database/): the storage backing most retrieval tools
- [RAG Evaluation](/glossary/rag-evaluation/): measuring agentic RAG is harder than pipeline RAG
- [Long-Context Model](/glossary/long-context-model/): the alternative to retrieval for some tasks

## Sources and Further Reading

- Lewis, P., Perez, E., Piktus, A., et al. (2020). *Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks.* NeurIPS 2020. arXiv:2005.11401. [https://arxiv.org/abs/2005.11401](https://arxiv.org/abs/2005.11401)
- Asai, A., Wu, Z., Wang, Y., Sil, A., Hajishirzi, H. (2024). *Self-RAG: Learning to Retrieve, Generate, and Critique through Self-Reflection.* ICLR 2024. arXiv:2310.11511. [https://arxiv.org/abs/2310.11511](https://arxiv.org/abs/2310.11511)
- Yan, S., Gu, J., Zhu, Y., Ling, Z. (2024). *Corrective Retrieval Augmented Generation.* arXiv:2401.15884. [https://arxiv.org/abs/2401.15884](https://arxiv.org/abs/2401.15884)
- Jeong, S., Baek, J., Cho, S., Hwang, S. J., Park, J. C. (2024). *Adaptive-RAG: Learning to Adapt Retrieval-Augmented Large Language Models through Question Complexity.* NAACL 2024. arXiv:2403.14403. [https://arxiv.org/abs/2403.14403](https://arxiv.org/abs/2403.14403)
- Gao, L., Ma, X., Lin, J., Callan, J. (2023). *Precise Zero-Shot Dense Retrieval without Relevance Labels (HyDE).* ACL 2023. arXiv:2212.10496. [https://arxiv.org/abs/2212.10496](https://arxiv.org/abs/2212.10496)
- Ma, X., Gong, Y., He, P., Zhao, H., Duan, N. (2023). *Query Rewriting for Retrieval-Augmented Large Language Models.* EMNLP 2023. arXiv:2305.14283. [https://arxiv.org/abs/2305.14283](https://arxiv.org/abs/2305.14283)
- Yao, S., Zhao, J., Yu, D., et al. (2023). *ReAct: Synergizing Reasoning and Acting in Language Models.* ICLR 2023. arXiv:2210.03629. [https://arxiv.org/abs/2210.03629](https://arxiv.org/abs/2210.03629)
- Edge, D., Trinh, H., Cheng, N., et al. (2024). *From Local to Global: A Graph RAG Approach to Query-Focused Summarization.* arXiv:2404.16130. [https://arxiv.org/abs/2404.16130](https://arxiv.org/abs/2404.16130)
- Es, S., James, J., Espinosa-Anke, L., Schockaert, S. (2024). *RAGAS: Automated Evaluation of Retrieval Augmented Generation.* EACL 2024. arXiv:2309.15217. [https://arxiv.org/abs/2309.15217](https://arxiv.org/abs/2309.15217)
- Saad-Falcon, J., Khattab, O., Potts, C., Zaharia, M. (2024). *ARES: An Automated Evaluation Framework for Retrieval-Augmented Generation Systems.* NAACL 2024. arXiv:2311.09476. [https://arxiv.org/abs/2311.09476](https://arxiv.org/abs/2311.09476)
- Gao, Y., Xiong, Y., Gao, X., et al. (2023). *Retrieval-Augmented Generation for Large Language Models: A Survey.* arXiv:2312.10997. [https://arxiv.org/abs/2312.10997](https://arxiv.org/abs/2312.10997)
