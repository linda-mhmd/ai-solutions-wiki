---
title: "Daytona"
description: "Daytona is secure, elastic infrastructure for running AI-generated code, positioned as a fast sandbox runtime for agents."
date: 2026-07-06
lastmod: 2026-07-06
last_updated: 2026-07-06
tags: ["ai-agents", "sandbox", "code-execution", "infrastructure", "enterprise"]
tool_category: "Infrastructure"
related:
  - tools/e2b
  - tools/modal
  - glossary/ai-agent
---

<figure class="bz-figure">
  <img src="/img/dark-cherry/storage-lockers.png" alt="A dark bank of metal lockers with rows glowing red, representing a warm pool of ready sandboxes." loading="lazy">
  <figcaption>Daytona keeps a pool of pre-warmed sandboxes ready, so an agent gets compute in milliseconds instead of seconds.</figcaption>
</figure>

Daytona is secure, elastic infrastructure for running AI-generated code, repositioned as an agent runtime. It targets a specific pain point: [AI agents](/glossary/ai-agent/) generate code that must run somewhere safe, and slow sandbox startup breaks the flow of an interactive agent. Daytona reports very fast cold starts, about 27 milliseconds using pre-warmed pools of sandboxes, and aims at regulated enterprises that need strong isolation with production performance. The company raised a 24 million dollar Series A led by FirstMark Capital, announced on 5 February 2026.

## Where it sits in the stack

Daytona sits between your agent and the compute that runs untrusted code. Your agent asks for a sandbox; Daytona hands over one from a warm pool almost instantly, runs the code, and returns the result.

<div class="bz-arch">
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Your agent</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">LLM</span>
      <span class="bz-arch-chip">Coding agent</span>
      <span class="bz-arch-chip">Data agent</span>
      <span class="bz-arch-chip-note">Requests compute on demand</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Daytona SDK</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Python SDK</span>
      <span class="bz-arch-chip">TypeScript SDK</span>
      <span class="bz-arch-chip-note">Create and drive sandboxes</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Sandbox services</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Code execution</span>
      <span class="bz-arch-chip">Filesystem</span>
      <span class="bz-arch-chip">Git operations</span>
      <span class="bz-arch-chip">Computer use</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Elastic runtime</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Pre-warmed pools</span>
      <span class="bz-arch-chip">Isolated sandboxes</span>
      <span class="bz-arch-chip-note">Cold starts around 27 ms</span>
    </div>
  </div>
</div>

## Installation

Daytona provides SDKs for Python and TypeScript. Install the Python SDK from PyPI.

```bash
pip install daytona
```

For a TypeScript or JavaScript project, install the SDK with npm.

```bash
npm install @daytona/sdk
```

Create an API key in the Daytona dashboard and export it so the SDK can authenticate.

```bash
export DAYTONA_API_KEY="your_api_key_here"
```

## Running code in a sandbox

The core pattern configures a client, creates a sandbox, and runs code inside it. This Python example follows the official quickstart.

```python
from daytona import Daytona, DaytonaConfig

config = DaytonaConfig(api_key="YOUR_API_KEY")
daytona = Daytona(config)

sandbox = daytona.create()
response = sandbox.process.code_run('print("Hello World")')
print(response.result)
```

Because each sandbox is a full environment, an agent can run multi-line programs and read structured output. This example computes a result and prints it.

```python
from daytona import Daytona, DaytonaConfig

config = DaytonaConfig(api_key="YOUR_API_KEY")
daytona = Daytona(config)

sandbox = daytona.create()

code = """
numbers = [4, 9, 16, 25]
roots = [n ** 0.5 for n in numbers]
print(roots)
"""

response = sandbox.process.code_run(code)
print(response.result)
```

The SDK also runs raw shell commands through `sandbox.process.exec`, which suits Git operations, package installs, and file inspection.

```python
from daytona import Daytona, DaytonaConfig

config = DaytonaConfig(api_key="YOUR_API_KEY")
daytona = Daytona(config)

sandbox = daytona.create()
response = sandbox.process.exec("echo 'Hello, World!'")
print(response.result)
```

## How a sandbox request flows

The lifecycle of a Daytona sandbox is short. The warm pool is what makes the create step fast enough for interactive agents.

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 1</span>
    <span class="bz-flow-step-name">Agent requests compute</span>
    <span class="bz-flow-step-desc">The agent needs to run generated code.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 2</span>
    <span class="bz-flow-step-name">Claim from pool</span>
    <span class="bz-flow-step-desc">A pre-warmed sandbox is handed over in about 27 ms.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 3</span>
    <span class="bz-flow-step-name">Execute</span>
    <span class="bz-flow-step-desc">Code or commands run inside the isolated sandbox.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 4</span>
    <span class="bz-flow-step-name">Return result</span>
    <span class="bz-flow-step-desc">Output goes back to the agent; the sandbox is released.</span>
  </div>
</div>

## How it compares

The agent-sandbox market has a handful of serious players. Daytona competes on cold-start speed and its enterprise, regulated-industry positioning. The table compares it with E2B, Modal, and self-managed containers.

| | Daytona | [E2B](/tools/e2b/) | [Modal](/tools/modal/) | Self-managed containers |
|---|---|---|---|---|
| **Primary use** | Agent code execution | Agent code execution | Serverless functions | General workloads |
| **Cold start** | About 27 ms | Sub-second | Sub-second | Varies widely |
| **Positioning** | Regulated enterprise | Open-source runtime | GPU and batch compute | Full control, more work |
| **Open source** | Yes | Yes | No | Yes |
| **Best for** | Speed-sensitive agents | Code interpreters | Heavy compute jobs | Custom infrastructure |

## When not to use it

Daytona is not the right choice in every situation.

- **You run trusted code you wrote yourself.** Sandbox isolation protects against untrusted, model-generated code. For your own controlled code, standard infrastructure is simpler.
- **You need long-lived services.** Sandboxes suit short, disposable tasks. A persistent API or database belongs on a platform built for always-on services.
- **You want the largest open-source community.** [E2B](/tools/e2b/) is an established open-source sandbox runtime with wide adoption. If community size drives your choice, weigh that directly.
- **Your workload is GPU-heavy batch compute.** For large-scale training or inference, a compute platform like [Modal](/tools/modal/) designed around GPUs fits better than a code sandbox.

## Further reading

- [Daytona documentation](https://www.daytona.io/docs): official docs, SDK reference, and getting-started guide.
- [Daytona official site](https://www.daytona.io/): product overview and the case for a fast agent runtime.
- [Daytona on GitHub](https://github.com/daytonaio/daytona): the open-source infrastructure for running AI-generated code.
- [E2B](/tools/e2b/): a competing open-source agent sandbox to compare against.
- [Modal](/tools/modal/): serverless compute for functions, batch jobs, and GPU workloads.
- [What is an AI agent?](/glossary/ai-agent/): the systems that generate the code Daytona runs.

## Sources

- [Daytona documentation](https://www.daytona.io/docs/en/)
- [Daytona Python SDK reference](https://www.daytona.io/docs/en/python-sdk/)
- [Daytona official site](https://www.daytona.io/)
- [Daytona GitHub repository](https://github.com/daytonaio/daytona)
