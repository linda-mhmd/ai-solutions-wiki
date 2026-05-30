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
last_updated: 2026-05-30
---

LangChain is the most widely adopted framework for building applications powered by large language models. It provides abstractions for common LLM patterns (retrieval-augmented generation, agents, chains) and integrations with hundreds of models, vector stores, document loaders, and tools. For enterprise AI projects, LangChain accelerates development by providing tested patterns for common workflows and a consistent interface across different LLM providers.

Official documentation: https://python.langchain.com/docs/

## Core Concepts

**Models** - Unified interfaces for LLM providers. LangChain wraps OpenAI, Anthropic, Bedrock, Google, Hugging Face, and many others behind a common interface. Switching from OpenAI to Bedrock requires changing one import and one configuration line, not rewriting application logic.

**Prompts** - Template management for model inputs. PromptTemplate and ChatPromptTemplate handle variable interpolation, message formatting, and prompt versioning. Few-shot templates dynamically select examples based on the input.

**Retrievers** - Abstractions for fetching relevant context. Retrievers connect to vector stores (Pinecone, Weaviate, Chroma, pgvector), search engines (Elasticsearch, Kendra), and custom data sources. The retriever interface standardizes the pattern of query-in, documents-out.

**Chains** - Sequences of operations composed together. A basic RAG chain: retrieve relevant documents, format them into a prompt, send to the LLM, parse the output. Chains can be simple (sequential steps) or complex (branching, parallel execution).

**Agents** - LLM-driven decision makers that choose which tools to use. An agent receives a task, decides which tool to call, processes the result, and repeats until the task is complete. Tools can be API calls, database queries, calculations, or any callable function.

## LangChain Expression Language (LCEL)

LCEL is a declarative syntax for composing chains using the pipe operator. It handles streaming, batch processing, parallel execution, and fallback logic:

```python
chain = prompt | model | output_parser
result = chain.invoke({"question": "What is the refund policy?"})
```

LCEL chains are inspectable (you can see the internal steps), streamable (partial results flow through as they are generated), and configurable (parameters like model temperature can be adjusted per invocation).

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

## Relationship to LangGraph

LangGraph is a separate library from the LangChain ecosystem for building stateful, multi-actor applications. While LangChain chains execute linearly, LangGraph supports cycles, conditional branching, and persistent state. For complex agent architectures, LangGraph is the recommended approach. See the LangGraph article for details.

## Pricing

LangChain is open-source (MIT license) and free. LangSmith has a free tier and paid tiers for higher trace volumes and team features. The cost of using LangChain is determined by the underlying services it calls (LLM API costs, vector database costs, infrastructure).

## Sources and Further Reading

- [LangChain Documentation](https://python.langchain.com/docs/) - Official documentation covering all components, integrations, and usage patterns
- [LangChain GitHub Repository](https://github.com/langchain-ai/langchain) - Source code, examples, and community contributions
- [LangSmith Documentation](https://docs.smith.langchain.com/) - Observability platform documentation for tracing and evaluation
- [LangChain Blog](https://blog.langchain.dev/) - Technical articles on new features, best practices, and use cases
