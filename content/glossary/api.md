---
title: "API - Application Programming Interface"
description: "What an API is, REST vs GraphQL vs gRPC, authentication patterns, rate limiting, and how AI services are accessed through standardized API contracts."
date: 2026-03-26
categories: [Glossary]
tags: ["software-engineering", "beginner", "api", "rest", "integration", "http", "endpoints"]
related:
  - guides/programming-languages-for-ai
  - glossary/hardware-constraints
  - guides/aws-bedrock-101
---

An API (Application Programming Interface) is a defined contract that lets two pieces of software communicate. One side exposes endpoints and operations; the other side calls them. The implementation details on either side are hidden - you do not need to know how Bedrock runs inference to call the Bedrock API.


<figure class="bz-figure">
  <img src="/img/dark-cherry/cable-sparks.png" alt="An industrial cable connection with red sparks at the junction: two systems making contact, transferring data at the boundary." loading="lazy">
  <figcaption>An API is the defined junction between two systems. The sparks are the requests and responses. The cable is the agreed protocol. Without it, the systems cannot communicate.</figcaption>
</figure>

## What an API Is

When you call `bedrock_client.invoke_model(modelId="...", body=...)`, you are using an API. The API defines: what endpoint to call, what parameters to pass, what authentication to provide, and what response to expect. The internal implementation - which GPU processed the request, how the model is loaded - is invisible to the caller.

APIs enable modularity: services can be replaced, scaled, and improved without breaking callers that use the defined interface. They are the primary mechanism for AI systems to access specialized capabilities (vision, speech, language) without owning the underlying models.

## REST: The Dominant Pattern

REST (Representational State Transfer) is an architectural style defined by Roy Fielding in his 2000 dissertation. Most modern web APIs follow REST conventions:

- Resources are identified by URLs (`/models/{modelId}`, `/images/{imageId}`)
- Standard HTTP methods define operations: GET (retrieve), POST (create/invoke), PUT (replace), DELETE (remove)
- Responses are typically JSON
- State is not stored on the server between requests (stateless)

AWS service APIs - Bedrock, Rekognition, Transcribe, S3 - are all REST APIs. SDKs like boto3 are wrappers that translate Python method calls into HTTP requests to these APIs.

## GraphQL

GraphQL is a query language for APIs, developed by Facebook. Rather than fixed endpoints, it exposes a single endpoint where clients specify exactly what data they need. This eliminates over-fetching (receiving more data than needed) and under-fetching (needing multiple requests to get related data).

GraphQL is common in complex frontend applications where different views need different subsets of the same data. It is less common in AI infrastructure, where REST endpoints are standard.

## gRPC

gRPC is a high-performance RPC (Remote Procedure Call) framework from Google, using Protocol Buffers for serialization rather than JSON. It is faster and more compact than REST/JSON but requires schema definition files and more complex tooling.

gRPC is used in performance-critical systems: model serving frameworks like Triton Inference Server expose gRPC endpoints, and internal microservices at large scale often use gRPC where REST overhead is unacceptable.

## Authentication

**API keys**: A secret string passed with each request, typically in a header (`x-api-key: ...`). Simple but offers limited control - a leaked key grants full access until revoked. OpenAI, Anthropic, and many AI services use API keys.

**OAuth 2.0**: A delegated authorization framework where a user grants a third-party application limited access to a service on their behalf. Used for consumer applications that act on behalf of users (e.g., a tool that posts to Twitter with your account).

**AWS IAM**: AWS services authenticate via IAM (Identity and Access Management). Rather than API keys, you authenticate with temporary credentials derived from an IAM role. This is the recommended pattern for AWS services: Lambda functions, EC2 instances, and ECS tasks assume IAM roles that grant specific permissions. No static secrets are needed.

## Rate Limiting

APIs enforce rate limits to protect service stability. AWS Bedrock has per-account token per minute (TPM) and request per minute (RPM) limits that vary by model. Hitting a rate limit returns an HTTP 429 (Too Many Requests) response.

Handling rate limits requires retry logic with exponential backoff: wait, then retry after progressively longer intervals. Most AWS SDKs include this automatically.

## Versioning

APIs change over time. Versioning strategies include URL versioning (`/v1/`, `/v2/`), header-based versioning (`API-Version: 2024-01-01`), and semantic versioning. AWS typically uses date-based API versions. Breaking changes require a new API version; non-breaking additions do not.

## MCP: APIs for AI Agent Tool Use

The Model Context Protocol (MCP) is a standard for exposing tools to AI agents. It defines how a model can call external capabilities - file systems, databases, APIs - through a consistent interface. MCP servers expose tools as structured endpoints; MCP clients (AI agents) call them.

MCP is essentially an API standard designed for the specific contract between an AI model and its tools. Where REST standardized web service communication, MCP standardizes agent-tool communication.

## Sources

- Fielding, R. T. *Architectural Styles and the Design of Network-Based Software Architectures*. Doctoral dissertation, University of California, Irvine, 2000. https://www.ics.uci.edu/~fielding/pubs/dissertation/top.htm
