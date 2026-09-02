---
title: "What Your AI Assistant Can Actually Do"
description: "The same model behaves very differently depending on which product it runs in. A practical map of filesystem, shell, browser and network access, plus the invisible limits that surprise people."
date: 2026-09-02
categories: [Guides]
tags: ["agents", "tooling", "governance", "developer-experience", "llm"]
tools: []
related: ["guides/backstage-as-an-agent-interface", "guides/ai-governance-implementation", "glossary/agents"]
last_updated: 2026-09-02
---

"Can you just open a tab and click it?"

It is a reasonable question, and the answer is genuinely different depending on
which product you are typing into — even when the model is identical. That
distinction is invisible in the interface, which is why it causes so much
frustration.

This is a practical map. It is written about Claude because that is what we use,
but every assistant with multiple delivery surfaces has the same structure, and
the failure modes generalise.

## The model is not the assistant

The thing people call "the AI" is at least three separate things:

1. **The model** — the weights. Identical across products.
2. **The tools** — what it can actually do. Wildly different across products.
3. **The scopes** — what those tools are permitted to do in your environment.

Almost every surprising limitation comes from layers two and three. When
something "can't" be done, the model has usually understood the request perfectly
and simply has no instrument for it.

## What differs between surfaces

| Capability | Terminal / IDE agent | Browser-based agent | Browser extension | Chat |
|---|---|---|---|---|
| Read and write your files | yes | partial | no | no |
| Run shell commands | yes | no | no | no |
| See and click a web page | no | yes | yes | no |
| Act as your logged-in browser session | no | yes | yes | no |
| Use your CLI credentials | yes | no | no | no |
| Fetch a public URL | usually | yes | yes | sometimes |

The two useful columns are the outer ones, and they are close to opposites. A
terminal agent has your filesystem, your shell and your authenticated
command-line tools, and no eyes on a rendered page. A browser agent can see and
click, and cannot touch your disk.

The practical consequence: **a terminal agent cannot verify what a page looks
like, and a browser agent cannot run your test suite.** Asking either to do the
other's job produces either a refusal or, worse, a confident guess.

## The limits nobody mentions

Beyond the capability grid there are constraints that are real, consequential,
and almost never surfaced in the interface.

**Permission systems intervene without explaining themselves.** A coding agent
may be blocked from certain actions by a policy layer sitting between it and the
tool — merging a pull request, changing a repository setting, writing to a shared
resource. From the outside this looks like the assistant declining. It is not.
Something else refused, and it usually cannot say much about why. If an assistant
suddenly cannot do something it plainly did five minutes ago, suspect this first.

**Memory does not persist unless something wrote it down.** Sessions generally
start with no recollection of previous ones. If yesterday's context matters,
either it was explicitly saved or it is gone. An assistant that says it does not
remember a prior session is usually telling the literal truth.

**Long conversations get compacted.** As context fills, earlier turns are
summarised rather than retained verbatim. Detail decays. This is why an assistant
can be sharp about a decision made an hour ago and vague about the reasoning
behind it.

**Launching is not driving.** A terminal agent can typically open a URL in your
browser. It sees nothing back. "It opened a tab" and "it can use the web
interface" are entirely different capabilities, and the first is frequently
mistaken for evidence of the second.

**Credentials are inherited, not held.** A terminal agent uses the CLI tools you
have already authenticated. If your cloud CLI is not installed or your session has
expired, the agent cannot do cloud work — not because it lacks permission, but
because the instrument is not there. "It's not installed" and "you're not
authorised" produce very similar-looking failures and need completely different
fixes.

## Why not just give the agent your browser session

Because it is a worse answer than it looks.

An agent driving your authenticated browser is you, in every log, with your full
authority in every system that session reaches. It cannot be scoped to one
application. It cannot be attributed separately. It cannot be revoked without
logging you out. And it expires unpredictably.

A scoped service token is better in every dimension that matters: restricted to
named capabilities, attributable to a distinct subject, revocable independently,
and stable. Most platforms that matter support one. Prefer it.

The uncomfortable version: if a system offers no way to grant an agent a scoped
credential, that is information. It is telling you it was designed for humans
only, and automating it means impersonating one.

## How to work with this rather than against it

**Ask what tools it has, early.** Not "can you do X" but "what can you actually
reach". The answer takes seconds and prevents an entire class of dead end.

**Match the surface to the task.** Filesystem and shell work goes to a terminal
agent. Anything requiring sight of a rendered page goes to a browser agent. Do
not fight the boundary; route around it.

**Have it write things down.** A handover document, a decision record, a comment
explaining a non-obvious choice. This is the only mechanism by which anything
survives a session boundary, and it is the difference between accumulating
knowledge and rediscovering the same facts weekly.

**Ask for verification, not assurance.** "Did the build pass" invites a
plausible answer. "Show me the build output" produces evidence. Anything an agent
cannot verify, it is inferring — and an assistant that reports inference as fact
is a much bigger problem than one that lacks a capability.

**Treat "I can't" as a beginning.** It is rarely the end of the conversation.
Usually there is a different route: a CLI instead of a UI, an API instead of a
form, a token instead of a session. Ask what the alternative is.

## The short version

The model is the same everywhere. The tools are not. Most of what feels like the
assistant being obtuse is a missing instrument, an invisible policy layer, or a
session boundary — and each of those has a different workaround.

Knowing which one you have hit is most of the skill.
