---
title: "Level 1: How Code Works"
description: "Terminals and code. How developers interact with machines directly, what code actually is, and how instructions become running software."
date: 2026-05-29
level_num: 1
tags: ["beginner", "code", "terminal"]
---

<figure class="bz-figure">
  <img src="/img/dark-cherry/terminal-interface.png" alt="Dark industrial terminal with a red-glowing keyboard and screen interface: direct, unmediated control over a machine through typed commands." loading="lazy">
  <figcaption>The terminal is not a tool for developers only. It is the direct interface to every computer and server. Everything you learn to read here transfers to every system you ever work with.</figcaption>
</figure>

<span class="bz-section-label">Level 1 of 4</span>

## What code actually is

Software looks like a black box from the outside. Applications open, buttons produce results, errors appear without explanation. Level 1 removes the box.

Code is instructions. Precisely written, unambiguous instructions that a computer executes in sequence. The terminal is the direct interface for giving those instructions. Understanding both changes how you communicate with engineers, read error messages, and direct AI tools to build software.

This level covers two articles. Neither requires prior coding experience. Both require a willingness to look at a command line without closing the window.

---

## What you know after Level 1

<div class="bz-arch">
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Terminal</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Shell (bash / zsh)</span>
      <span class="bz-arch-chip">Commands</span>
      <span class="bz-arch-chip">File paths</span>
      <span class="bz-arch-chip-note">The direct text interface to any computer. What a shell is, why it exists, and how to read a command</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">File system</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Directories</span>
      <span class="bz-arch-chip">Paths</span>
      <span class="bz-arch-chip">Permissions</span>
      <span class="bz-arch-chip-note">How operating systems organise files; why /usr/local/bin exists; what rwxr-xr-x means</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Code</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Variables</span>
      <span class="bz-arch-chip">Functions</span>
      <span class="bz-arch-chip">Logic</span>
      <span class="bz-arch-chip">Data types</span>
      <span class="bz-arch-chip-note">The building blocks of all software. Not syntax, but the concepts that every language shares</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Execution</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Compilation</span>
      <span class="bz-arch-chip">Interpretation</span>
      <span class="bz-arch-chip">Runtime errors</span>
      <span class="bz-arch-chip-note">How code written in a text file becomes instructions the CPU executes, and how it fails</span>
    </div>
  </div>
</div>

---

## Learning path

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Start here</span>
    <span class="bz-flow-step-name">Terminal basics</span>
    <span class="bz-flow-step-desc">What the terminal is, what a shell does, and how to read a command without fear.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Layer 2</span>
    <span class="bz-flow-step-name">File system navigation</span>
    <span class="bz-flow-step-desc">Directories, paths, and permissions. The structure every developer assumes you know.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Layer 3</span>
    <span class="bz-flow-step-name">Writing instructions</span>
    <span class="bz-flow-step-desc">Variables, conditionals, loops. The three tools that underpin every program ever written.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Layer 4</span>
    <span class="bz-flow-step-name">Code structure</span>
    <span class="bz-flow-step-desc">Functions, modules, and libraries. How code is organised so it can be maintained and reused.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Ready</span>
    <span class="bz-flow-step-name">Level 2</span>
    <span class="bz-flow-step-desc">You understand what code is and how it runs. Level 2 covers how teams manage code together.</span>
  </div>
</div>

---

## Before and after

| | Before Level 1 | After Level 1 |
|---|---|---|
| **Terminal** | A black window that looks dangerous | A text interface for giving direct instructions to the OS; no more or less dangerous than a browser |
| **"Run this command"** | Nod politely, open a Slack message to an engineer | Open a terminal, paste the command, read the output, know what succeeded or failed |
| **Error messages** | "Something broke" | A stack trace is a list of function calls; the last line is where execution stopped; work backwards |
| **Scripts** | A script is a mystical artefact | A script is a text file of sequential instructions; reading it reveals exactly what it does |
| **Code vs software** | Software appears fully formed | Code is text; a compiler or interpreter turns that text into instructions the CPU can execute |
| **Python vs JavaScript** | Different languages, mysterious differences | Different syntax, same concepts: variables store values; functions group instructions; logic branches |

---

## Articles in this level

### [What is a Terminal?](/basics/what-is-a-terminal/)

The direct command interface to any computer or server. Covers what a shell is, why the terminal exists alongside graphical interfaces, and how to read and write basic commands. Includes file system navigation, common commands (`ls`, `cd`, `mkdir`, `cat`, `grep`), and how to interpret output and error codes.

**You should read this if:** An engineer has ever told you to "run this in the terminal" and you either panicked or googled "how to open terminal" for the fourth time.

### [What is Code?](/basics/what-is-code/)

Instructions, logic, and how software is written. Covers the concepts shared by every programming language: variables, data types, conditionals, loops, functions, and modules. Explains the difference between interpreted and compiled languages, how a text file becomes running software, and why bugs occur at the conceptual level (not the syntax level).

**You should read this if:** You have tried a coding tutorial and understood the syntax but not the purpose, or you want to direct an AI coding tool more precisely by understanding what it is actually producing.

---

## Why this matters in practice

**For vibe coders**: Directing AI tools to write code is dramatically more effective when you understand what the AI is producing. You do not need to write Python. You do need to understand that a function takes inputs and returns an output, that a loop runs until a condition is met, and that an error at line 47 means execution reached line 47 and stopped. These concepts come from Level 1.

**For product managers**: Sprint reviews include decisions about code structure, refactoring, and technical debt. Knowing the difference between "this feature is slow because of an inefficient loop" and "this feature is slow because of a database query" changes the conversation. You can ask better questions and understand the answers.

**For anyone reading logs**: Every deployed application writes logs. Logs are the terminal output of running code. A log entry like `ERROR: undefined is not a function at processPayment (payment.js:127)` is readable once you know what a function is and what undefined means. You do not need to fix it. You need to describe it precisely to the person who can.

**For server interactions**: Every cloud server runs Linux. Every deployment pipeline runs shell commands. Every CI/CD system executes scripts. Knowing what a terminal is and how to read a shell command means you can follow deployment conversations, read CI logs, and understand what infrastructure automation is actually doing.

---

## What comes next

<div class="bz-arch">
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Behind you</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Level 0: The Foundation</span>
      <span class="bz-arch-chip-note">Hardware, operating systems, networks</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">You are here</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Level 1: How Code Works</span>
      <span class="bz-arch-chip-note">Terminal, file systems, variables, functions, execution</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Up next</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Level 2: Managing Work</span>
      <span class="bz-arch-chip-note">Version control, Git, GitHub, collaboration at team scale</span>
    </div>
  </div>
</div>

**[Start Level 2: Managing Work →](/levels/level-2/)**

Code needs to be tracked, versioned, and shared across teams. Level 2 covers the tools that make that possible without chaos.

---

## Further reading

- [What is a Terminal?](/basics/what-is-a-terminal/): shell commands, file navigation, and reading output in plain English
- [What is Code?](/basics/what-is-code/): variables, functions, and logic explained without syntax
- [The Missing Semester of Your CS Education, MIT](https://missing.csail.mit.edu/): free course on terminal, shell scripting, and the tools engineers use daily
- [CS50P: Python for beginners, Harvard](https://cs50.harvard.edu/python/): the gentlest introduction to actual coding; no prior experience required
- [Explain Shell](https://explainshell.com/): paste any shell command and get a plain-English explanation of every flag and argument
- [Linux Command Line for Beginners, Ubuntu](https://ubuntu.com/tutorials/command-line-for-beginners): step-by-step terminal tutorial with no assumed knowledge
