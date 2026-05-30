---
title: "Tool Use Pattern - Function Calling for AI Agents"
description: "Enabling LLMs to invoke external tools and APIs through function calling, extending model capabilities beyond text generation."
date: 2026-03-28
categories: [Patterns]
tags: [agentic-AI, tool-use, function-calling, API, integration]
related:
  - patterns/react-pattern-ai
  - patterns/agentic-workflows
  - patterns/guardrails-pattern
  - patterns/orchestrator-worker
last_updated: 2026-05-30
---

Tool use (also called function calling) lets an LLM invoke external functions, APIs, and services during a conversation. Instead of the model guessing at information or admitting it cannot perform an action, it calls a tool: look up a database record, execute code, search the web, send an email, or query an internal system. The model decides which tool to call, what parameters to pass, and how to incorporate the result into its response.

## How Tool Use Works

**Tool definition** - You provide the model with a list of available tools, each described with a name, description, and parameter schema (typically JSON Schema). The descriptions are critical - the model uses them to decide when and how to invoke each tool.

**Tool selection** - Based on the user's request and the tool descriptions, the model decides whether to call a tool and which one. It generates a structured tool call with the appropriate parameters.

**Tool execution** - Your application code receives the tool call, validates the parameters, executes the function, and returns the result to the model.

**Response synthesis** - The model receives the tool result and incorporates it into a natural language response. It may call additional tools or provide its final answer.

## Designing Good Tool Interfaces

**Clear descriptions** - The tool description is a prompt to the model. Write it as if explaining the tool to a new team member. Include what the tool does, when to use it, what it returns, and common parameter values. Vague descriptions lead to incorrect tool selection.

**Minimal parameter sets** - Each tool should have the fewest parameters necessary. Optional parameters with sensible defaults reduce the burden on the model. Complex parameter schemas with nested objects increase the chance of malformed calls.

**Focused tools** - One tool should do one thing well. A tool called "database" that accepts arbitrary SQL is dangerous and hard for the model to use correctly. Instead, create specific tools: "lookup_customer," "get_order_status," "search_products." Each with a clear, narrow purpose.

**Consistent return formats** - Standardize tool return formats. Always return a structured object with a status field, a data field, and an error field. The model handles consistent formats more reliably than varying structures.

## Security Considerations

Tool use introduces significant security concerns because the model is now triggering real actions based on user input.

**Input validation** - Never pass model-generated parameters directly to sensitive operations without validation. The model might be manipulated through prompt injection to call tools with malicious parameters. Validate all tool inputs against expected types, ranges, and patterns.

**Permission scoping** - Give tools the minimum permissions necessary. A tool that queries a database should have read-only access. A tool that sends emails should have rate limits and recipient restrictions. Treat the model as an untrusted intermediary.

**Human-in-the-loop for destructive actions** - Tools that modify data, spend money, or send communications should require human approval before execution. Present the proposed action to the user and wait for confirmation.

**Audit logging** - Log every tool call with the full request and response. This creates an audit trail for debugging and compliance. Include the conversation context that led to the tool call.

## Common Patterns

**Read-only tools** - Safest starting point. Give the model tools that retrieve information but cannot modify anything. Knowledge base search, database queries, API lookups. Build trust in the system before adding write operations.

**Confirmation tools** - The model proposes an action and the tool returns a preview instead of executing. The user confirms, and a second tool call executes. This adds a safety layer for consequential actions.

**Multi-tool chains** - The model calls several tools in sequence to accomplish a complex task. Look up a customer, check their order history, find relevant promotions, and draft a personalized email. Each tool call builds on the results of the previous one.

## Debugging Tool Use

When tool use fails, the problem is usually in one of three places: the tool description is ambiguous (model picks the wrong tool), the parameter schema is unclear (model passes wrong parameters), or the tool result format is confusing (model misinterprets the response). Check each layer systematically before assuming the model is at fault.
