---
title: "Set Up Your Computer for Building"
description: "Install Git, Node, and Python with a package manager, verify each one works, pick an editor, and know when the browser is the better place to start."
date: 2026-07-17
categories: [Guides]
tags: ["beginner", "setup", "terminal", "tooling", "git", "python"]
related:
  - basics/what-is-a-terminal
  - basics/what-is-git
  - guides/when-do-you-need-a-professional
---

Every "getting started" tutorial assumes your computer is already set up for building software. Almost nobody explains what that setup actually is, why it happens in a terminal, or what to do when a command fails. This guide walks you through the whole thing once, properly: a package manager, Git, Node, Python, and an editor. It also tells you when to skip all of it and work in the browser instead.

<figure class="bz-figure">
  <img src="/img/wardrobe/fitting-room-local-dev.png" alt="A man stands before an ornate mirror in a dark, warmly lit fitting room, adjusting his jacket in private." loading="lazy">
  <figcaption>Your own computer is the fitting room: a private space where you assemble and adjust everything before anyone else sees it.</figcaption>
</figure>

## What "installing a developer tool" actually means

When you install a normal app, you download it, click through a wizard, and get an icon. Developer tools break every part of that expectation. Most of them have no icon, no window, and no wizard. They are programs you run by typing their name into a [terminal](/basics/what-is-a-terminal/): the text window where you talk to your computer in commands.

That has two consequences worth knowing before you start:

- **You install tools by typing a command**, not by visiting a website. A program called a package manager does the downloading for you.
- **You check an install worked by asking the tool for its version.** No icon appears. Type `git --version` and a version number printed back means Git is installed and reachable.

That version check is the heartbeat of this whole guide. Every step below ends with one.

## The setup sequence

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 1</span>
    <span class="bz-flow-step-name">Package manager</span>
    <span class="bz-flow-step-desc">Install Homebrew (macOS) or use winget (Windows). Everything else flows through this.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 2</span>
    <span class="bz-flow-step-name">Git</span>
    <span class="bz-flow-step-desc">Version control. Saves snapshots of your work and talks to GitHub.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 3</span>
    <span class="bz-flow-step-name">Node.js</span>
    <span class="bz-flow-step-desc">Runs JavaScript outside the browser. Comes with npm.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 4</span>
    <span class="bz-flow-step-name">Python</span>
    <span class="bz-flow-step-desc">The default language of AI tooling and scripts.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 5</span>
    <span class="bz-flow-step-name">Editor</span>
    <span class="bz-flow-step-desc">Install VS Code. This is where you read and write code.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 6</span>
    <span class="bz-flow-step-name">Verify</span>
    <span class="bz-flow-step-desc">Run four version checks. All pass, you are done.</span>
  </div>
</div>

## Step 1: Get a package manager

A package manager is an app store for developer tools that lives in the terminal. You tell it a name, it downloads the right version for your machine, puts it in the right place, and handles updates later. It removes the single biggest beginner hazard: hunting for downloads on the open web and picking the wrong one.

### macOS: Homebrew

Homebrew is the standard package manager for macOS. It supports macOS Sonoma 14 and newer. Open the Terminal app and paste this command from [brew.sh](https://brew.sh/):

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

The script explains what it will do and pauses before doing it. Read its output: at the end it prints any follow-up commands you need to run so your terminal can find `brew`. Run them, then verify:

```bash
brew --version
```

### Windows: winget, and WSL for later

Windows 11 and modern Windows 10 ship with **winget**, the Windows Package Manager, already installed. Open PowerShell and check with `winget --version`. You search with `winget search <appname>` and install with `winget install <appname>`. No separate setup needed.

There is a second, more powerful option to know about: **WSL**, the Windows Subsystem for Linux. It runs a real Linux environment inside Windows, which matches how most servers and most AI tooling run. One command in an administrator PowerShell installs it, with Ubuntu as the default Linux distribution:

```powershell
wsl --install
```

Restart the machine afterwards. For your first setup, native Windows with winget is enough. Come back to WSL when a tutorial assumes Linux commands and yours keep failing.

## Step 2: Install and verify Git

[Git](/basics/what-is-git/) is version control: it saves snapshots of your project so you can always get back to a working state. Every AI coding tool assumes it exists.

On macOS:

```bash
brew install git
```

On Windows, in PowerShell (this is the exact command from [git-scm.com](https://git-scm.com/install/windows)):

```powershell
winget install --id Git.Git -e --source winget
```

Close and reopen your terminal, then verify:

```bash
git --version
```

You should see something like `git version 2.x.x`. While you are here, tell Git who you are. It stamps this name and email on every snapshot you save:

```bash
git config --global user.name "Your Name"
git config --global user.email you@example.com
```

## Step 3: Install and verify Node.js

[Node.js](/glossary/nodejs/) runs JavaScript outside the browser. Most web app tutorials, AI coding assistants, and command-line tools depend on it. It ships with **npm**, the package manager for JavaScript libraries.

Node versions come in two lines: **LTS** (long-term support, the stable line) and **Current** (the newest features). Pick LTS when a tutorial gives you a choice.

On macOS:

```bash
brew install node
```

Note that Homebrew's `node` installs the newest release rather than the LTS line. For a first setup, either line works fine.

On Windows, download the LTS installer for Windows from [nodejs.org/en/download](https://nodejs.org/en/download) and run it. This is one of the few developer tools that does come with a normal installer.

Verify both Node and npm:

```bash
node --version
npm --version
```

## Step 4: Install and verify Python

Python is the default language of AI: scripts, data work, and most machine learning libraries. Installing it is where beginners hit the most trouble, because your machine may already contain a Python you should not touch. More on that in the traps section.

On macOS, python.org recommends its own official installer: download the current version from [python.org/downloads](https://www.python.org/downloads/) and run the `.pkg` file. It runs natively on both Apple Silicon and Intel Macs. Homebrew users can install a versioned formula instead, for example `brew install python@3.13`, which provides the `python3` and `pip3` commands.

On Windows, python.org recommends the **Python install manager**. Get it from [python.org/downloads](https://www.python.org/downloads/) or the Microsoft Store. It gives you the global `python` command plus a `py` command that manages versions: `py list` shows every runtime installed on the machine.

Verify:

```bash
python3 --version
```

On Windows, run `python --version` instead. If Windows opens the Microsoft Store rather than printing a version, see the PATH trap below.

## Step 5: Install an editor (VS Code)

A code editor is a word processor for code. It saves plain text, colours the syntax so structure is visible, warns about errors as you type, and embeds a terminal so everything happens in one window.

**Visual Studio Code (VS Code)** is the free editor most of the industry standardised on, and the one most AI pairing tools plug into. Download it from [code.visualstudio.com](https://code.visualstudio.com/). On macOS, drag the app into your Applications folder. On Windows, run the User installer, which needs no administrator permissions.

VS Code is also the AI-era on-ramp. Extensions add an AI assistant directly into the editor: [GitHub Copilot](/tools/github-copilot/) is the built-in route, and [Claude Code](/tools/claude-code/) runs in the terminal you already set up. [Cursor](/tools/cursor-ai/) is a separate editor built on the same foundation if you want AI deeper in the workflow later.

## Step 6: Verify everything

Open a fresh terminal window and run all four checks:

```bash
git --version
node --version
npm --version
python3 --version
```

Four version numbers means your machine is ready to build. Any line that prints `command not found` instead means one of the traps below caught you.

## The three classic traps

### Trap 1: "command not found" right after installing

The terminal finds programs by searching a list of folders called the **PATH**. If a tool installs into a folder that is not on that list, the terminal cannot see it, even though the install succeeded.

Two fixes cover most cases. First, close the terminal and open a new one: the PATH loads when a terminal starts, so a window opened before the install has a stale list. Second, read the installer's final output: Homebrew in particular prints the exact commands that add it to your PATH. On Windows, if `python` opens the Microsoft Store, open "Manage app execution aliases" from the Start menu and check the Python aliases are enabled.

### Trap 2: multiple Pythons

Your machine can hold several Python versions at once, and the wrong one answering is a classic source of confusion. macOS ships an Apple-controlled `/usr/bin/python3` for its own developer tools: never modify or delete it, and do not mistake it for your install. On Windows, old installs pile up; `py list` shows every runtime present.

Keep one Python you installed yourself, and check which one answers with `which python3` (macOS) or `where python` (Windows). When a library later refuses to install into your main Python, that is the system protecting itself: the standard fix is a virtual environment, a disposable per-project copy created with `python3 -m venv`.

### Trap 3: permission errors

An error containing `EACCES`, `Permission denied`, or `Access is denied` means the tool tried to write into a folder the operating system protects. The reflex fix you will find online is `sudo`, a command that runs the install with full administrator power. Resist it: forcing a write into system folders creates deeper problems later.

Install into your own user space instead. Homebrew is designed to work without `sudo`. npm's official fix for `EACCES` on global installs is a Node version manager, and `npx` runs most tools without a global install at all. On Windows, prefer installers that offer a per-user setup, as VS Code does.

## Install locally or work in the browser?

All of the above is optional. Cloud environments give you the same tools, preinstalled, behind a browser tab. Here is the honest trade-off:

| | Install locally | GitHub Codespaces | Browser playgrounds |
|---|---|---|---|
| **Setup time** | One afternoon | Minutes, GitHub account | None |
| **Cost** | Free | Free monthly quota, then paid | Free tiers |
| **Works offline** | Yes | No | No |
| **Where files live** | Your own disk | GitHub's cloud | The platform's cloud |
| **Power and control** | Full | Near-full VS Code | Whatever the platform allows |
| **Best for** | Ongoing real projects | Real projects, zero install | First experiments |

## The zero-install alternative

If this guide feels like too much today, that is a valid signal, not a failure. Start in the browser and come back.

**GitHub Codespaces** is a full development environment hosted in the cloud: VS Code, a terminal, Git, Node, and Python, running in a container on a virtual machine you reach through your browser. You need a [GitHub](/basics/what-is-github/) account, and every personal account includes a monthly quota of free use. Nothing touches your machine, and a broken environment is discarded and recreated in minutes.

For even lighter experiments, the [Playgrounds](/playgrounds/) page collects browser tools where you can try prompts, code, and models with no account gymnastics at all. Skills built there transfer directly: the terminal in Codespaces is the same terminal this guide teaches, so the browser path and the local path converge.

## What's next

With a working setup, the next steps are small and concrete:

- [Your first LLM API call](/guides/your-first-llm-api-call/): use the terminal and Python you installed today.
- [How to read an error message](/guides/how-to-read-an-error-message/): the skill this guide's traps section previewed.
- [Protect your accounts](/guides/protect-your-accounts/): lock down GitHub and API accounts before you build.
- [Set spending limits before you ship](/guides/set-spending-limits-before-you-ship/): guard rails before your first paid API key.

## Further reading

- [What is a Terminal?](/basics/what-is-a-terminal/): the plain-English basics behind every command in this guide
- [How to read an error message](/guides/how-to-read-an-error-message/): turn failing commands into information instead of panic
- [Playgrounds](/playgrounds/): browser tools for experimenting with zero setup
- [Homebrew documentation](https://docs.brew.sh/): official manual for the macOS package manager
- [Set up a WSL development environment](https://learn.microsoft.com/en-us/windows/wsl/setup/environment): Microsoft's best-practice walkthrough for Linux on Windows
- [VS Code documentation](https://code.visualstudio.com/docs): official setup and usage docs for the editor
- [GitHub Codespaces quickstart](https://docs.github.com/en/codespaces/getting-started/quickstart): create your first cloud development environment
- [Getting Started: First-Time Git Setup](https://git-scm.com/book/en/v2/Getting-Started-First-Time-Git-Setup): the official Git book on identity and configuration

## Sources

- [Homebrew](https://brew.sh/): official install command and supported macOS versions
- [Git: Install on macOS](https://git-scm.com/install/mac): Homebrew and Xcode Command Line Tools options
- [Git: Install on Windows](https://git-scm.com/install/windows): official winget install command
- [Pro Git: First-Time Git Setup](https://git-scm.com/book/en/v2/Getting-Started-First-Time-Git-Setup): git config identity commands
- [Microsoft Learn: Install WSL](https://learn.microsoft.com/en-us/windows/wsl/install): the wsl --install command and Ubuntu default
- [Microsoft Learn: WinGet](https://learn.microsoft.com/en-us/windows/package-manager/winget/): availability, search, and install commands
- [Node.js downloads](https://nodejs.org/en/download): LTS installers and platform options
- [Homebrew formula: node](https://formulae.brew.sh/formula/node): install command and tracked version
- [Python docs: Using Python on macOS](https://docs.python.org/3/using/mac.html): official installer recommendation and system Python warning
- [Python docs: Using Python on Windows](https://docs.python.org/3/using/windows.html): Python install manager, py command, and alias troubleshooting
- [Homebrew and Python](https://docs.brew.sh/Homebrew-and-Python): python@3.y formulae, python3 and pip3, virtual environments
- [npm docs: Resolving EACCES permissions errors](https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally): version manager recommendation
- [VS Code: Setup on Windows](https://code.visualstudio.com/docs/setup/windows): User setup without administrator permissions
- [GitHub Docs: Codespaces overview](https://docs.github.com/en/codespaces/overview): cloud environment architecture and free monthly quota
