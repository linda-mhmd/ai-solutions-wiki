---
title: "Kiro"
description: "What Kiro is, how AWS's spec-driven AI IDE structures development through requirements, design, and task specifications, and how it differs from pure AI code assistants."
date: 2026-03-28
categories: [Glossary]
tags: [Kiro, AI-IDE, spec-driven-development, agentic-AI, AWS, developer-tools]
related:
  - glossary/agentic-ai
  - glossary/ai-agents
  - glossary/prompt-engineering
  - tools/amazon-bedrock
last_updated: 2026-05-30
---

Kiro is an AI-powered integrated development environment (IDE) created by AWS that emphasizes spec-driven development over unstructured AI code generation. Built on the Code OSS platform (the open-source foundation of VS Code), Kiro guides developers through a structured workflow of requirements gathering, technical design, and task decomposition before generating code.

## Origins and History

AWS launched Kiro in public preview on July 15, 2025, at the AWS Summit in New York City. The IDE was introduced as a response to what the industry had begun calling "vibe coding" -- the practice of using AI assistants to generate code from informal natural language prompts without formal specification or design. Kiro's thesis was that production-quality software requires structured planning, and that AI agents perform better when guided by explicit specifications.

Kiro reached general availability on November 17, 2025, with an expanded feature set announced at AWS re:Invent 2025. The GA release introduced autonomous agents for individual developers, GitHub integration with issue assignment workflows, property-based testing, checkpointing for rollback, a CLI with agent capabilities, and enterprise management through IAM Identity Center. AWS announced that it was standardizing its own internal developers on Kiro.

During preview, Kiro was free to use. Post-GA pricing includes a free tier (50 agentic interactions per month), Kiro Pro ($19/month, 1,000 interactions), and Kiro Pro+ ($39/month, 3,000 interactions). Kiro uses Anthropic's Claude Sonnet models as its AI backend.

## Spec-Driven Development

Kiro's core workflow centers on three specification files that structure the development process.

**requirements.md** captures what needs to be built. Kiro generates user stories with acceptance criteria written in EARS (Easy Approach to Requirements Syntax) format. The developer reviews, refines, and approves these requirements before any code is written.

**design.md** outlines the technical architecture. Based on the approved requirements, Kiro produces a design document including component diagrams, data models, API schemas, and interface definitions. This document serves as the blueprint for implementation.

**tasks.md** breaks the design into an ordered checklist of implementation tasks. Each task is concrete and testable, giving the AI agent clear, bounded work items rather than open-ended prompts.

This three-phase structure means the AI operates within explicit constraints at each stage. Rather than generating code from a vague prompt and hoping for the best, Kiro's agents implement a reviewed specification with defined boundaries.

## Hooks

Hooks are event-driven automations that trigger AI agents in the background in response to developer actions. When a developer saves a file, creates a file, or deletes a file, configured hooks can automatically run tasks such as updating related documentation, running linting, generating tests, or validating consistency with the specification. Manual trigger hooks can also be invoked on demand. Hooks act as a persistent quality layer, catching issues that would normally require a human reviewer.

## Architecture and Compatibility

Kiro is built on Code OSS, making it compatible with existing VS Code settings, keybindings, and Open VSX extensions. It supports the Model Context Protocol (MCP) for connecting specialized tools, and steering rules for guiding AI behavior at the project level. This means teams migrating from VS Code retain their existing configuration while gaining Kiro's spec-driven capabilities.

## Sources

1. Kiro Blog. "Introducing Kiro." July 15, 2025. [https://kiro.dev/blog/introducing-kiro/](https://kiro.dev/blog/introducing-kiro/)
2. Kiro Blog. "Kiro is generally available." November 17, 2025. [https://kiro.dev/blog/general-availability/](https://kiro.dev/blog/general-availability/)
3. InfoQ. "Beyond Vibe Coding: Amazon Introduces Kiro, the Spec-Driven Agentic AI IDE." August 2025. [https://www.infoq.com/news/2025/08/aws-kiro-spec-driven-agent/](https://www.infoq.com/news/2025/08/aws-kiro-spec-driven-agent/)
4. SiliconANGLE. "AWS launches Kiro: a 'spec coding' developer environment integrated with AI agents." July 14, 2025. [https://siliconangle.com/2025/07/14/aws-launches-kiro-spec-coding-developer-environment-integrated-ai-agents/](https://siliconangle.com/2025/07/14/aws-launches-kiro-spec-coding-developer-environment-integrated-ai-agents/)
