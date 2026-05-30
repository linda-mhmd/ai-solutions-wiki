---
title: "Programming Languages for AI - Python, TypeScript, HCL"
description: "A practical guide to the three languages used across a modern AI stack: Python for agents and models, TypeScript for frontends and video rendering, and HCL for infrastructure."
date: 2026-03-26
categories: [Guides]
tags: ["software-engineering", "intermediate", "python", "typescript", "hcl", "programming-languages", "ai-development"]
related:
  - glossary/object-oriented-programming
  - glossary/api
  - guides/infrastructure-as-code-ai
  - guides/multi-agent-systems-101
last_updated: 2026-05-30
---

Modern AI systems rarely live in a single language. A production pipeline might use Python to call a model API, TypeScript to render the output as video, and HCL to provision the infrastructure that runs it all. Each language has a defined role. Understanding that division prevents the wrong-tool-for-the-job failures that make AI systems fragile.

## Python: The Language of AI Agents

Python is the standard language for AI and machine learning work. The library ecosystem is the primary reason: PyTorch, Hugging Face Transformers, LangChain, CrewAI, Strands, and the AWS Bedrock SDK (boto3) are all Python-first. Virtually every AI framework publishes a Python package before anything else.

Python's syntax is readable enough that non-engineers can review pipelines and prompts without a long ramp-up. The REPL and Jupyter notebooks support iterative development where you run a cell, inspect output, and adjust. This workflow fits AI development well because so much of the work is exploratory.

The weaknesses are real. Python is slow for CPU-bound computation, which is why ML frameworks offload the heavy work to C++ backends. The Global Interpreter Lock limits CPU parallelism in a single process. Deployment requires careful dependency management, often handled with Docker or virtual environments.

For agents specifically, Python is where orchestration logic lives: deciding which tool to call, passing results between steps, handling retries, formatting model outputs. Linda Mohamed uses Python for all agent work, including Bedrock API calls, CrewAI orchestration, Rekognition integrations, and AWS Lambda functions in AI pipelines.

Documentation: https://docs.python.org/3/

## TypeScript: Type-Safe JavaScript for the Presentation Layer

TypeScript is JavaScript with static types. It compiles to JavaScript and runs in browsers and Node.js. The type system is the core value: type errors surface at compile time rather than runtime, which matters when parsing structured model outputs or building interfaces that depend on specific response shapes.

Tooling quality is high because editors have full type information. Autocompletion, rename refactoring, and inline documentation work reliably in a way they do not in plain JavaScript.

TypeScript is not a machine learning language. Running inference from TypeScript means calling an API. That is not a limitation for most product work: the AI logic lives in Python, and TypeScript handles the interface.

Remotion is the clearest example. Remotion renders React components to video. A TypeScript component describes what the video frame looks like; Python upstream handles what goes into it. Linda uses TypeScript for all Remotion video templates and Next.js web applications that surface AI outputs.

Documentation: https://www.typescriptlang.org/docs/

## HCL: Declarative Infrastructure

HCL (HashiCorp Configuration Language) is the language of Terraform. It is not a general-purpose language. It describes the desired state of infrastructure resources, and Terraform determines what to create, modify, or destroy to reach that state.

The plan/apply cycle is the key feature. Running `terraform plan` shows exactly what will change before any action is taken. This makes infrastructure changes reviewable in code review the same way application code is reviewed.

HCL has limited logic. It supports conditionals and loops, but complex dynamic behavior quickly becomes unreadable. For those cases, AWS CDK in Python or TypeScript offers more flexibility. For straightforward infrastructure declarations, HCL is clearer than a general-purpose language.

HCL provisions the foundation that AI systems run on: S3 buckets, Lambda functions, SQS queues, IAM roles, VPCs, DynamoDB tables, and Bedrock endpoint configurations. Linda uses Terraform and HCL for all AWS infrastructure across AI projects.

Documentation: https://developer.hashicorp.com/terraform/docs

## How the Three Layers Fit Together

| Layer | Language | Examples |
|-------|----------|---------|
| Intelligence | Python | Bedrock calls, CrewAI agents, Lambda pipeline logic |
| Presentation | TypeScript | Remotion video, Next.js web UI |
| Infrastructure | HCL | Terraform, AWS resources |

Each layer communicates with the others through APIs and S3 artifacts rather than sharing codebases. Python produces output, TypeScript renders it, HCL provisions the services that run both. The separation keeps each layer independently deployable and testable.

## Sources

- Python Software Foundation. *Python 3 Documentation*. https://docs.python.org/3/
- Microsoft. *TypeScript Documentation*. https://www.typescriptlang.org/docs/
- HashiCorp. *Terraform Documentation*. https://developer.hashicorp.com/terraform/docs
