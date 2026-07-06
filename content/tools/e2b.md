---
title: "E2B"
description: "E2B is an open-source runtime that gives AI agents secure, isolated sandboxes for running model-generated code."
date: 2026-07-06
lastmod: 2026-07-06
last_updated: 2026-07-06
tags: ["ai-agents", "sandbox", "code-execution", "firecracker", "infrastructure"]
tool_category: "Infrastructure"
related:
  - tools/daytona
  - tools/modal
  - glossary/ai-agent
  - glossary/agent-harness
---

<figure class="bz-figure">
  <img src="/img/dark-cherry/grid-foundation.png" alt="A dark floor with a glowing red neon grid, representing isolated compute cells that agents run inside." loading="lazy">
  <figcaption>E2B gives each agent its own isolated cell of compute, so untrusted code runs without touching your systems.</figcaption>
</figure>

E2B is an open-source runtime that gives [AI agents](/glossary/ai-agent/) secure sandboxes to run code. It solves a safety problem: when a language model writes code and you execute it, that code is untrusted. Running it on your own machine or server risks damage, data leaks, or abuse. E2B runs each sandbox in a Firecracker microVM, the same lightweight virtualization technology behind AWS Lambda, so model-generated code executes in a strongly isolated environment that you create and destroy on demand. It ships Python and JavaScript SDKs and is most often used for code interpreting and agentic code execution.

## Where it sits in the stack

E2B sits between your agent and raw compute. Your agent decides what code to run; E2B spins up an isolated microVM, runs the code there, and streams results back. Your own infrastructure never executes the untrusted code directly.

<div class="bz-arch">
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Your agent</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">LLM</span>
      <span class="bz-arch-chip">Code interpreter</span>
      <span class="bz-arch-chip">Data analysis agent</span>
      <span class="bz-arch-chip-note">Decides what code to run</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">E2B SDK</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Python SDK</span>
      <span class="bz-arch-chip">JavaScript SDK</span>
      <span class="bz-arch-chip-note">Create and control sandboxes</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Sandbox</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Code execution</span>
      <span class="bz-arch-chip">Filesystem</span>
      <span class="bz-arch-chip">Shell commands</span>
      <span class="bz-arch-chip-note">Isolated per session</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Isolation</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Firecracker microVM</span>
      <span class="bz-arch-chip-note">Same tech as AWS Lambda</span>
    </div>
  </div>
</div>

## Installation

E2B provides an SDK for both Python and JavaScript. For a code interpreter, install the code-interpreter package. The `python-dotenv` package loads your API key from a `.env` file.

```bash
pip install e2b-code-interpreter python-dotenv
```

For JavaScript or TypeScript projects, install the equivalent package with npm.

```bash
npm i @e2b/code-interpreter dotenv
```

Get an API key from the E2B dashboard and place it in a `.env` file in your project root.

```bash
E2B_API_KEY=your_api_key_here
```

## Running code in a sandbox

The core pattern creates a sandbox, runs code inside it, and reads the output. This Python example follows the official quickstart: load the key, create the sandbox, and execute a snippet.

```python
from dotenv import load_dotenv
load_dotenv()

from e2b_code_interpreter import Sandbox

sbx = Sandbox.create()
execution = sbx.run_code("print('hello world')")
print(execution.logs)
```

Each sandbox is a full Linux environment, so an agent can install packages, write files, and process data. This example runs a small data task and reads the result.

```python
from dotenv import load_dotenv
load_dotenv()

from e2b_code_interpreter import Sandbox

sbx = Sandbox.create()

code = """
import statistics
values = [12, 8, 5, 20, 15]
print("mean:", statistics.mean(values))
print("stdev:", round(statistics.stdev(values), 2))
"""

execution = sbx.run_code(code)
print(execution.logs)
```

You can also run raw shell commands inside the sandbox. The base sandbox exposes a `commands.run` method for terminal commands.

```python
from e2b import Sandbox

sandbox = Sandbox.create()
result = sandbox.commands.run("ls -l")
print(result)
```

## How a sandbox request flows

The lifecycle of an agent code-execution step is short and repeatable. The sandbox exists only as long as you need it.

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 1</span>
    <span class="bz-flow-step-name">Agent writes code</span>
    <span class="bz-flow-step-desc">The model produces a snippet to run.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 2</span>
    <span class="bz-flow-step-name">Create sandbox</span>
    <span class="bz-flow-step-desc">The SDK spins up a fresh Firecracker microVM.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 3</span>
    <span class="bz-flow-step-name">Execute</span>
    <span class="bz-flow-step-desc">Code runs in isolation and produces logs or files.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 4</span>
    <span class="bz-flow-step-name">Return and close</span>
    <span class="bz-flow-step-desc">Results go back to the agent; the sandbox is torn down.</span>
  </div>
</div>

## How it compares

Several products give agents somewhere safe to run code. E2B's focus is fast, disposable microVM sandboxes for code execution. The table compares it with Daytona, Modal, and a plain container.

| | E2B | [Daytona](/tools/daytona/) | [Modal](/tools/modal/) | Plain container |
|---|---|---|---|---|
| **Isolation** | Firecracker microVM | microVM sandbox | gVisor sandbox | Namespace only |
| **Primary use** | Agent code execution | Agent code execution | Serverless functions | General workloads |
| **Cold start** | Sub-second | About 27 ms | Sub-second | Varies |
| **Open source** | Yes | Yes | No | Yes |
| **Best for** | Code interpreters | Regulated enterprises | Batch and GPU jobs | Full manual control |

## When not to use it

E2B is not the right tool in every case.

- **Your code is fully trusted.** If you wrote the code yourself and control every input, the isolation overhead buys you little. Run it in your normal environment.
- **You need long-running services.** Sandboxes are built for short, disposable tasks. A persistent web service or database belongs on standard infrastructure like [Modal](/tools/modal/) or a managed host.
- **You have strict data-residency rules and cannot use a hosted service.** The managed E2B service runs code in its cloud. If code and data must stay in your own network, self-host the open-source runtime or evaluate a competitor with that guarantee.
- **You only need heavy GPU batch jobs.** For large training or inference workloads, a compute platform designed for GPUs is a better fit than a code sandbox.

## Further reading

- [E2B documentation](https://e2b.dev/docs): official docs, quickstart, and SDK reference.
- [E2B official site](https://e2b.dev/): product overview and use cases for agent code execution.
- [E2B on GitHub](https://github.com/e2b-dev): the open-source runtime and SDK source code.
- [Daytona](/tools/daytona/): a competing agent-runtime sandbox to compare against.
- [Modal](/tools/modal/): serverless compute for functions, batch jobs, and GPU workloads.
- [What is an AI agent?](/glossary/ai-agent/): the systems that use sandboxes like E2B to run code.
- [What is an agent harness?](/glossary/agent-harness/): the scaffolding around an agent, including tools like code execution.

## Sources

- [E2B docs - quickstart](https://e2b.dev/docs/quickstart)
- [E2B docs - running commands](https://e2b.dev/docs/commands)
- [E2B official site](https://e2b.dev/)
- [E2B GitHub organization](https://github.com/e2b-dev)
