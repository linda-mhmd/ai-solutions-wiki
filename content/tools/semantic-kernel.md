---
title: "Semantic Kernel - Microsoft's AI Orchestration SDK"
description: "A comprehensive reference for Semantic Kernel: Microsoft's SDK for integrating LLMs into applications, plugin architecture, planners, and enterprise .NET/Python AI development."
date: 2026-03-28
categories: [Tools]
tags: [semantic-kernel, Microsoft, SDK, dotnet, python, AI-orchestration, plugins]
related:
  - tools/langchain
  - tools/azure-openai
  - tools/autogen
status: deprecated
status_detail: "Microsoft unified Semantic Kernel and AutoGen into the Microsoft Agent Framework, released as version 1.0 on 3 April 2026 and positioned as the enterprise-ready successor. Semantic Kernel continues in maintenance for existing applications; new projects should use Agent Framework."
status_source: "https://github.com/microsoft/semantic-kernel"
last_updated: 2026-07-05
lastmod: 2026-07-05
---

Semantic Kernel is Microsoft's open-source SDK for integrating large language models into applications. It supports C#, Python, and Java, making it the primary choice for enterprise teams working in the .NET ecosystem. Unlike LangChain (which is Python/JavaScript-first), Semantic Kernel treats C# as a first-class citizen, with strong typing, dependency injection integration, and patterns that align with enterprise .NET development practices.

Official documentation: https://learn.microsoft.com/en-us/semantic-kernel/

## Core Concepts

**Kernel** - The central orchestration object. The kernel manages AI service connections (OpenAI, Azure OpenAI, Hugging Face), registered plugins, and execution configuration. You configure the kernel once and use it throughout your application.

**Plugin** - A collection of related functions that the kernel can invoke. Plugins come in two flavors: native functions (C#/Python methods annotated with descriptions) and prompt functions (templated prompts that generate LLM responses). The model decides which plugin functions to call based on their descriptions.

**Function** - A single callable unit within a plugin. Functions have typed parameters with descriptions that the LLM uses to decide when and how to call them. This is Semantic Kernel's implementation of tool use / function calling.

**Planner** - An AI-powered component that decomposes complex tasks into a sequence of function calls. Given a goal and available plugins, the planner creates an execution plan. The Handlebars planner generates template-based plans, while the Stepwise planner iteratively decides the next step.

**Memory** - Abstractions for vector storage and retrieval. Semantic Kernel provides memory connectors for Azure AI Search, Qdrant, Chroma, Pinecone, and others. Memory integrates with the kernel so that plugins can retrieve relevant context automatically.

## Plugin Architecture

The plugin model is Semantic Kernel's most distinctive feature. By defining functions with clear descriptions and typed parameters, you create a tool catalog that the LLM can navigate:

```csharp
[KernelFunction, Description("Gets the current weather for a city")]
public async Task<string> GetWeather(
    [Description("The city name")] string city)
{
    // Implementation
}
```

The kernel, with auto function calling enabled, will invoke this function when the user's request requires weather information. This pattern scales well to enterprise applications with dozens of business functions: the model selects the right function based on context without explicit routing logic.

## Integration with Azure OpenAI

Semantic Kernel has deep integration with Azure OpenAI, including support for Azure AD authentication, content filtering configuration, and Azure AI Search for RAG. For Microsoft-stack enterprises, the combination of Semantic Kernel + Azure OpenAI + Azure AI Search provides a fully Microsoft-supported AI application architecture.

## Filters (Middleware)

Semantic Kernel supports filters that intercept function and prompt invocations. Filters enable cross-cutting concerns: logging all LLM calls, validating inputs before they reach the model, modifying outputs after generation, implementing retry logic, and enforcing content policies. This middleware pattern is familiar to .NET developers from ASP.NET.

## Comparison with LangChain

Semantic Kernel and LangChain solve similar problems with different design philosophies. Semantic Kernel emphasizes strong typing, IDE support, and enterprise .NET patterns. LangChain emphasizes rapid prototyping, a massive integration ecosystem, and Python-first development. For teams using C#, Semantic Kernel is the clear choice. For Python teams, both are viable; LangChain has a larger community and more integrations, while Semantic Kernel offers a cleaner abstraction model.

## Process Framework

Semantic Kernel includes a Process Framework for building long-running, stateful business processes. Processes consist of steps (individual units of work), events (triggers that move between steps), and state (persisted across process execution). This extends Semantic Kernel beyond request-response AI into durable workflow automation.

## Pricing

Semantic Kernel is open-source (MIT license) and free. Costs are determined by the underlying AI services (Azure OpenAI, search, infrastructure) and the development effort to build and maintain plugins.
