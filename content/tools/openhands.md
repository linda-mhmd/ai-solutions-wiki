---
title: "OpenHands"
description: "An open-source platform for autonomous software-engineering agents that write code, run commands, and browse the web inside a sandboxed Docker runtime. Formerly OpenDevin."
date: 2026-07-06
lastmod: 2026-07-06
last_updated: 2026-07-06
tags: ["ai-agent", "coding-agent", "open-source", "autonomous", "sandbox", "swe-agent"]
tool_category: "AI"
related:
  - tools/opencode
  - tools/cline
  - glossary/agentic-loops
  - glossary/agent-harness
  - glossary/inference
  - comparisons/open-source-coding-agents
---

<figure class="bz-figure">
  <img src="/img/decoding-software/glass-cube-energy-notext.png" alt="A glass cube held by metal brackets containing a swirl of blue energy, suggesting a powerful process contained inside a sandbox." loading="lazy">
  <figcaption>OpenHands runs its agent inside a sealed box: a sandboxed Docker runtime where it can safely write code, run commands, and browse.</figcaption>
</figure>

OpenHands is an open-source platform for building AI agents that work like a human developer: writing code, running commands at a terminal, and browsing the web. The official research paper defines it as "a platform for the development of powerful and flexible AI agents that interact with the world in similar ways to those of a human developer." It was previously called OpenDevin. It is maintained by All-Hands-AI, is written in Python and TypeScript, and is open source under the MIT license, with some bundled components under their own licenses.

The core idea is a sandboxed runtime. OpenHands executes the agent's actions inside a Docker container that gives it a bash shell, a browser, and a Jupyter environment, isolated from your host. That makes autonomous execution safer: the agent can install packages and run code without touching your machine directly. The project has since grown into a broader self-hosted control center for coding agents, with a hosted OpenHands Cloud option and a Python Software Agent SDK; the standalone CLI and the older Docker GUI are now marked as legacy surfaces in the documentation.

## Where OpenHands sits in the stack

<div class="bz-arch">
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Interfaces</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">CLI</span>
      <span class="bz-arch-chip">Web GUI</span>
      <span class="bz-arch-chip">GitHub Action</span>
      <span class="bz-arch-chip">OpenHands Cloud</span>
      <span class="bz-arch-chip">Software Agent SDK</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Agent</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Reasoning loop</span>
      <span class="bz-arch-chip">Emits actions</span>
      <span class="bz-arch-chip-note">Decides the next code edit, command, or web action</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Agent server</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">REST API backend</span>
      <span class="bz-arch-chip">Actions in, observations out</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Runtime (sandbox)</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Docker container</span>
      <span class="bz-arch-chip">Bash shell</span>
      <span class="bz-arch-chip">Browser</span>
      <span class="bz-arch-chip">Jupyter</span>
      <span class="bz-arch-chip-note">Isolated execution of every agent action</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Models</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Any LiteLLM provider</span>
      <span class="bz-arch-chip">Anthropic, OpenAI, Google, Bedrock</span>
      <span class="bz-arch-chip">Local: vLLM, SGLang</span>
    </div>
  </div>
</div>

## Installation

The recommended path uses uv. Docker is a prerequisite, because the agent runs its actions inside a container.

```bash
uv tool install openhands --python 3.12
openhands
```

There is also an official installer script.

```bash
curl -fsSL https://install.openhands.dev/install.sh | sh
openhands
```

OpenHands can also run through a Docker image directly and as a GitHub Action for continuous integration. The Docker image tag is version-specific, so check the current docs for the exact tag rather than pinning an old one.

## Two ways to use it

The first pattern is a local run. You install with uv, launch `openhands` in your terminal, and give it a task. The agent plans, then executes each step inside the Docker sandbox, returning what it did.

```bash
openhands
# then describe the task, for example:
# "Add pagination to the /users endpoint and write a test for it."
```

The second pattern is delegating work in the cloud or in CI. OpenHands Cloud connects to GitHub, GitLab, or Bitbucket and can take an issue through to a pull request, and the GitHub Action runs the same agent headlessly on a trigger.

```yaml
# .github/workflows/openhands.yml (illustrative)
name: OpenHands
on:
  issues:
    types: [labeled]
jobs:
  resolve:
    runs-on: ubuntu-latest
    steps:
      - uses: All-Hands-AI/OpenHands-Action@main
        with:
          issue-number: ${{ github.event.issue.number }}
```

## Typical workflow

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 1</span>
    <span class="bz-flow-step-name">Install and start</span>
    <span class="bz-flow-step-desc">Install with uv and launch openhands, with Docker running.</span>
  </div>
  <div class="bz-flow-arrow">&rarr;</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 2</span>
    <span class="bz-flow-step-name">Give a task</span>
    <span class="bz-flow-step-desc">Describe the change; the agent plans the steps to complete it.</span>
  </div>
  <div class="bz-flow-arrow">&rarr;</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 3</span>
    <span class="bz-flow-step-name">Act in the sandbox</span>
    <span class="bz-flow-step-desc">It writes code, runs commands, and browses inside the Docker runtime.</span>
  </div>
  <div class="bz-flow-arrow">&rarr;</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 4</span>
    <span class="bz-flow-step-name">Deliver</span>
    <span class="bz-flow-step-desc">Review the result locally, or let the cloud agent open a pull request.</span>
  </div>
</div>

## How it compares

The clearest way to place OpenHands is on the autonomy axis: it is built to run tasks end to end, where a tool like Cline is built to pause for your approval at each step.

| | OpenHands | Cline | Goose | OpenCode |
|---|---|---|---|---|
| **Autonomy** | Runs tasks end to end | Approval per action | On-machine, interactive | Interactive, plan agent gates |
| **Isolation** | Docker sandbox | Runs in your IDE | Runs on your machine | Runs on your machine |
| **License** | MIT (mixed) | Apache-2.0 | Apache-2.0 | MIT |
| **Surfaces** | CLI, GUI, CI, cloud, SDK | VS Code, CLI | Desktop, CLI, API | Terminal, IDE, web |
| **Best for** | Autonomous, sandboxed tasks | Reviewed IDE edits | On-machine automation | Provider-agnostic coding |

## When not to use it

- **You cannot run Docker.** The sandboxed runtime depends on Docker. In environments where you cannot run containers or grant Docker access, OpenHands will not work.
- **You want to approve every action.** OpenHands is designed for autonomous execution. If you need a human confirming each edit and command, [Cline](/tools/cline/) is built around that gate.
- **You want a lightweight terminal tool.** Running a sandbox and an agent server is heavier than a single-binary CLI. For quick local edits, [Aider](/tools/aider/) or [OpenCode](/tools/opencode/) is lighter.
- **You need a stable, unchanging interface.** The product is repositioning around its control center, Cloud, and SDK, with older surfaces marked legacy. Check the current docs before standardising a team on one entry point.

## Further reading

- [OpenHands documentation](https://docs.openhands.dev/): official install, runtime, LLM setup, and cloud usage.
- [OpenHands on GitHub](https://github.com/All-Hands-AI/OpenHands): source and issues; the LICENSE file details the mixed licensing.
- [OpenHands paper (arXiv 2407.16741)](https://arxiv.org/abs/2407.16741): the platform's definition and the OpenDevin to OpenHands rename.
- [Open-source coding agents compared](/comparisons/open-source-coding-agents/): where OpenHands sits among the alternatives.
- [Cline](/tools/cline/): the approval-gated counterpoint to OpenHands' autonomy.
- [What is an agent harness?](/glossary/agent-harness/): the scaffolding that turns a model into an acting agent.

## Sources

- [OpenHands documentation](https://docs.openhands.dev/): install commands, Docker sandbox runtime, interfaces, and LiteLLM provider support.
- [OpenHands on GitHub](https://github.com/All-Hands-AI/OpenHands): All-Hands-AI, Python and TypeScript, MIT license with mixed components.
- [OpenHands: An Open Platform for AI Software Developers as Generalist Agents](https://arxiv.org/abs/2407.16741): official paper, definition, and the OpenDevin rename.
