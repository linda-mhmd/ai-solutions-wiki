---
title: "Aider"
description: "An open-source terminal tool for AI pair programming that edits your local files, builds a map of your repository, and commits every change to git automatically."
date: 2026-07-06
lastmod: 2026-07-06
last_updated: 2026-07-06
tags: ["ai-coding", "coding-agent", "terminal", "open-source", "git", "pair-programming"]
tool_category: "AI"
related:
  - tools/opencode
  - tools/claude-code
  - glossary/agentic-loops
  - glossary/llm
  - comparisons/open-source-coding-agents
  - comparisons/claude-code-vs-cursor-vs-codex
---

<figure class="bz-figure">
  <img src="/img/wardrobe/polaroid-wall-git-commits.png" alt="A wall of Polaroid photographs pinned in a grid, suggesting a running history of small, tracked changes." loading="lazy">
  <figcaption>Aider treats every edit like a Polaroid on the wall: each change is a separate git commit you can read, keep, or undo.</figcaption>
</figure>

Aider is an open-source tool for AI pair programming in your terminal. You run it inside a git repository, tell it what you want, and it edits your local files to make the change. Its defining habit is that it commits each change to git with a written commit message, so every step the model takes is tracked and reversible. It is released under the Apache-2.0 license and is written in Python.

Aider works with your existing editor rather than replacing it. You keep editing files however you normally do, and Aider watches the repository, applies its own edits as commits, and can pick up comments you leave in the code as instructions. This makes it a common choice for engineers who want an [agentic loop](/glossary/agentic-loops/) over their code without leaving the command line or adopting a new IDE.

## Where Aider sits in the stack

<div class="bz-arch">
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Interface</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Terminal chat</span>
      <span class="bz-arch-chip">Watch mode in your editor</span>
      <span class="bz-arch-chip">Voice-to-code</span>
      <span class="bz-arch-chip-note">Runs alongside your normal editing workflow</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Context</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Repository map</span>
      <span class="bz-arch-chip">Added files</span>
      <span class="bz-arch-chip">Images and web pages</span>
      <span class="bz-arch-chip-note">Maps the whole codebase to work on larger projects</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Git integration</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Automatic commit per change</span>
      <span class="bz-arch-chip">Generated commit messages</span>
      <span class="bz-arch-chip">/undo to revert</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Models</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Claude</span>
      <span class="bz-arch-chip">GPT and o-series</span>
      <span class="bz-arch-chip">DeepSeek</span>
      <span class="bz-arch-chip">Local models</span>
    </div>
  </div>
</div>

## Installation

The recommended installer sets up Aider in its own isolated environment so it does not clash with your project's Python packages.

```bash
python -m pip install aider-install
aider-install
```

There are also one-line installers for each platform.

```bash
# macOS and Linux
curl -LsSf https://aider.chat/install.sh | sh
```

## Two ways to use it

The first pattern is to launch Aider against a model with an API key. You start it in your project directory, and it opens a chat where you describe changes.

```bash
cd /to/your/project
aider --model sonnet --api-key anthropic=<key>
# or another provider
aider --model deepseek --api-key deepseek=<key>
```

The second pattern is Aider's two-step **architect** mode. One model acts as the architect and proposes a solution in plain language; a second editor model turns that proposal into concrete file edits. This often produces better results on harder changes than asking a single model to plan and edit at once.

```bash
# inside an aider session
/ask how should we add rate limiting to the API layer?   # discuss, no edits
/architect add token-bucket rate limiting to the API      # plan, then edit
/undo                                                      # revert the last change if needed
```

By default Aider is in code mode and edits directly. `/ask` discusses without touching files, and `/architect` runs the plan-then-edit workflow. Every edit becomes its own git commit.

## Typical workflow

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 1</span>
    <span class="bz-flow-step-name">Launch in a repo</span>
    <span class="bz-flow-step-desc">Start aider in a git project and add the files you want to work on.</span>
  </div>
  <div class="bz-flow-arrow">&rarr;</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 2</span>
    <span class="bz-flow-step-name">Describe the change</span>
    <span class="bz-flow-step-desc">Ask in plain language, or use /architect to plan first on a hard task.</span>
  </div>
  <div class="bz-flow-arrow">&rarr;</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 3</span>
    <span class="bz-flow-step-name">Auto-commit</span>
    <span class="bz-flow-step-desc">Aider edits the files and commits each change with a written message.</span>
  </div>
  <div class="bz-flow-arrow">&rarr;</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 4</span>
    <span class="bz-flow-step-name">Review or undo</span>
    <span class="bz-flow-step-desc">Read the diff in git; keep it, or run /undo to roll the commit back.</span>
  </div>
</div>

## How it compares

| | Aider | OpenCode | Claude Code | Cline |
|---|---|---|---|---|
| **Maintainer** | Aider community | Anomaly (SST) | Anthropic | Cline Bot |
| **License** | Apache-2.0 | MIT | Proprietary | Apache-2.0 |
| **Surface** | Terminal | Terminal, IDE, web | Terminal, VS Code | VS Code, CLI |
| **Model coupling** | Any provider | Any provider | Anthropic only | Any provider |
| **Signature feature** | Auto-commit per change | Build and plan agents | Subagents and hooks | Plan and act modes |
| **Best for** | Git-centric terminal coding | Multi-surface work | Anthropic-native depth | In-editor approvals |

## When not to use it

- **You do not use git.** Aider's commit-per-change workflow is the core of the tool. Without a git repository you lose the tracking and `/undo` that make it valuable.
- **You want a graphical editor.** Aider is terminal-first. If you want an AI panel inside a full IDE, [Cursor](/tools/cursor-ai/) or [Cline](/tools/cline/) fits better.
- **You want a bundled free model.** Aider is bring-your-own-model. You supply an API key for a cloud model or run a local one; there is no included allowance.
- **You need multi-surface access.** Aider runs in one terminal on one machine. For a persistent agent reachable from chat apps, see [Hermes Agent](/tools/hermes-agent/).

## Further reading

- [Aider documentation](https://aider.chat/): official install, model setup, and usage guides.
- [Aider on GitHub](https://github.com/Aider-AI/aider): source and issues under the Apache-2.0 license.
- [Aider modes reference](https://aider.chat/docs/usage/modes.html): the code, architect, and ask modes explained.
- [Open-source coding agents compared](/comparisons/open-source-coding-agents/): where Aider sits among the alternatives.
- [OpenCode](/tools/opencode/): a provider-agnostic terminal agent with a build and plan agent system.
- [Agentic loops](/glossary/agentic-loops/): the read-plan-edit-run cycle every coding agent runs.

## Sources

- [Aider website](https://aider.chat/): definition, feature list, git auto-commit, repository map, and supported models.
- [Aider install guide](https://aider.chat/docs/install.html): official install commands and Python version support.
- [Aider on GitHub](https://github.com/Aider-AI/aider): Apache-2.0 license, Python, and release history.
