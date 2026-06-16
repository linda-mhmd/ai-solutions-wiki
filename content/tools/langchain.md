---
title: "LangChain - LLM Application Framework"
description: "A comprehensive reference for LangChain: building LLM-powered applications, chains, retrievers, agents, and integration patterns for enterprise AI."
date: 2026-03-28
categories: [Tools]
tags: [langchain, LLM, framework, RAG, agents, python]
related:
  - tools/langgraph
  - tools/llamaindex
  - tools/amazon-bedrock
  - tools/openai-api
alternatives:
  open_source:
    - tools/llamaindex
    - tools/dspy
  aws: tools/amazon-bedrock
  azure: tools/azure-openai
  gcp: tools/google-vertex-ai
solutions:
  - solutions/finance/document-processing
  - solutions/retail/recommendation-engine
last_updated: 2026-06-14
lastmod: 2026-06-14
---

LangChain is the most widely adopted framework for building applications powered by large language models. It provides abstractions for common LLM patterns (retrieval-augmented generation, agents, chains) and integrations with hundreds of models, vector stores, document loaders, and tools. For enterprise AI projects, LangChain accelerates development by providing tested patterns for common workflows and a consistent interface across different LLM providers.

LangChain reached its first stable release, version 1.0, on October 22, 2025. Version 1.0 reorients the framework around agents (a new `create_agent` abstraction built on the LangGraph runtime) and adopts semantic versioning, with a commitment to no breaking changes until 2.0. The release also moved legacy modules into a separate `langchain-classic` package. Version 1.1 followed on December 2, 2025. LangChain is available in both Python and JavaScript or TypeScript, with the Python ecosystem being the more mature of the two.

Official documentation: https://docs.langchain.com/ (the legacy site at https://python.langchain.com/docs/ still resolves).

## Core Concepts

**Models** - Unified interfaces for LLM providers. LangChain wraps OpenAI, Anthropic, Bedrock, Google, Hugging Face, and many others behind a common interface. Switching from OpenAI to Bedrock requires changing one import and one configuration line, not rewriting application logic.

**Prompts** - Template management for model inputs. PromptTemplate and ChatPromptTemplate handle variable interpolation, message formatting, and prompt versioning. Few-shot templates dynamically select examples based on the input.

**Retrievers** - Abstractions for fetching relevant context. Retrievers connect to vector stores (Pinecone, Weaviate, Chroma, pgvector), search engines (Elasticsearch, Kendra), and custom data sources. The retriever interface standardizes the pattern of query-in, documents-out.

**Chains** - Sequences of operations composed together. A basic RAG chain: retrieve relevant documents, format them into a prompt, send to the LLM, parse the output. Chains can be simple (sequential steps) or complex (branching, parallel execution).

**Agents** - LLM-driven decision makers that choose which tools to use. An agent receives a task, decides which tool to call, processes the result, and repeats until the task is complete. Tools can be API calls, database queries, calculations, or any callable function. In LangChain 1.0 the recommended way to build an agent is the `create_agent` function, a minimal, configurable harness that combines a model, tools, prompt, and middleware and runs on the LangGraph runtime.

**Standard content blocks** - A provider-agnostic representation of model output introduced in 1.0. It gives a consistent shape to reasoning traces, citations, and server-side tool calls across OpenAI, Anthropic, and other providers, so application code does not have to special-case each provider's response format.

## LangChain Expression Language (LCEL)

LCEL is a declarative syntax for composing chains using the pipe operator. It handles streaming, batch processing, parallel execution, and fallback logic:

```python
chain = prompt | model | output_parser
result = chain.invoke({"question": "What is the refund policy?"})
```

LCEL chains are inspectable (you can see the internal steps), streamable (partial results flow through as they are generated), and configurable (parameters like model temperature can be adjusted per invocation).

## Agent Middleware

LangChain 1.0 introduced a middleware system that gives fine-grained control at each step of the agent loop. Middleware can run before or after the model call, modify state, or short-circuit execution. Built-in middleware covers common production needs: human-in-the-loop approval, conversation summarization to manage long contexts, and PII redaction. Version 1.1 added more, including a model-retry middleware with configurable exponential backoff for transient provider errors, and content moderation middleware that can apply OpenAI moderation across user input, model responses, and tool output. Version 1.1 also added model profiles, a `.profile` attribute on chat models that describes capabilities such as structured output and function calling, sourced from the open-source models.dev project.

## RAG with LangChain

The most common LangChain pattern is RAG. A minimal implementation:

1. Load documents using a document loader (PDF, web page, database, S3).
2. Split documents into chunks using a text splitter (recursive character, token-based).
3. Embed chunks and store in a vector store.
4. Create a retrieval chain that queries the vector store and generates answers.

LangChain provides dozens of document loaders and text splitters, making it straightforward to ingest diverse data sources. The retriever abstraction supports re-ranking, multi-query retrieval, and ensemble retrieval for improved accuracy.

## LangSmith (Observability)

LangSmith is LangChain's companion platform for tracing, evaluating, and monitoring LLM applications. It captures every step of a chain execution: inputs, outputs, latency, token usage, and errors. This is critical for debugging and optimizing LLM applications, where the non-deterministic nature of model outputs makes traditional debugging inadequate.

LangSmith also supports evaluation datasets: define input-output pairs, run your chain against them, and measure quality with built-in or custom evaluators. This enables systematic prompt improvement and regression testing.

## When to Use LangChain

LangChain fits well when you are building a Python-based LLM application that combines multiple steps (retrieval, generation, tool use), when you want to swap between LLM providers without rewriting code, and when you value a large ecosystem of integrations over minimal dependencies.

LangChain is less suitable when you need a minimal, dependency-light solution (consider calling APIs directly), when you are building in a language other than Python or JavaScript (LangChain supports both, but the Python ecosystem is significantly more mature), or when your use case is a single LLM call without retrieval or tool use.

## LangGraph and Deep Agents

LangGraph is a separate library in the LangChain ecosystem for building stateful, multi-actor applications. It supports cycles, conditional branching, and persistent state, and LangGraph reached its own 1.0 release in October 2025. As of LangChain 1.0 the two are closely linked: `create_agent` is built on the LangGraph runtime, so a LangChain agent inherits LangGraph features like streaming, checkpointing, and human-in-the-loop. LangChain now frames its agent stack as three layers: LangGraph for low-level orchestration, LangChain (`create_agent`) for a configurable agent harness, and Deep Agents for a higher-level, batteries-included option. See the {{< relref "tools/langgraph" >}} article for details.

Deep Agents is a newer, standalone agent harness from LangChain (released in 2026) aimed at long-running, multi-step tasks. It packages sensible defaults around the tool-calling loop: a planning tool to break work into steps, file-system style tools to offload large outputs and avoid context overflow, sub-agent delegation for specialized tasks, and persistent memory across threads via the LangGraph store. Like `create_agent`, it runs on the LangGraph runtime.

## Pricing

LangChain is open-source (MIT license) and free. LangSmith is the commercial side of the business and is priced in tiers: a free Developer tier for a single user (a monthly allowance of base traces, then pay-as-you-go), a paid Plus tier billed per seat for teams (currently $39 per seat per month, with a larger trace allowance and a free developer-sized agent deployment), and a custom-priced Enterprise tier that adds hybrid or self-hosted deployment, SSO, RBAC, SLAs, and dedicated support. LangChain (the company behind the framework) raised a Series B in October 2025 led by IVP, reaching a valuation of roughly 1.25 billion dollars. The cost of using LangChain itself is determined by the underlying services it calls (LLM API costs, vector database costs, infrastructure).

## Sources and Further Reading

- [LangChain Documentation](https://docs.langchain.com/) - Official unified documentation covering all components, integrations, and usage patterns
- [LangChain 1.0 release announcement](https://changelog.langchain.com/announcements/langchain-1-0-now-generally-available) - Official changelog entry detailing create_agent, middleware, standard content blocks, and the stability commitment
- [LangChain GitHub Repository](https://github.com/langchain-ai/langchain) - Source code, examples, and community contributions
- [LangSmith Documentation](https://docs.smith.langchain.com/) - Observability platform documentation for tracing and evaluation
- [LangChain Blog](https://www.langchain.com/blog) - Technical articles on new features, best practices, and use cases
