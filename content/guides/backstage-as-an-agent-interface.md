---
title: "Backstage as an Agent Interface"
description: "How to let a coding agent create real infrastructure through a Backstage scaffolder template, using a scoped service token instead of a borrowed browser session."
date: 2026-09-02
categories: [Guides]
tags: ["agents", "backstage", "platform-engineering", "idp", "governance", "aws", "terraform"]
tools: []
related: ["guides/ai-governance-implementation", "glossary/agents", "guides/context-engineering"]
last_updated: 2026-09-02
---

An internal developer portal and a coding agent want the same thing: a way to
perform a repeatable operation without reconstructing it from scratch each time.
A Backstage scaffolder template is already that. What is usually missing is a way
for anything other than a person at a browser to run one.

This guide covers how to close that gap, and — more usefully — where the sharp
edges are, because most of them are not obvious until something has gone wrong.

## The problem with letting an agent "use the UI"

The instinctive answer to "can an agent create the account for me" is to have it
drive the browser. Resist it.

A browser session is a person's identity. An agent acting through it inherits
everything that person can do, in every plugin, with no scope and no separate
audit trail. Every action it takes is attributed to the human. When something
later needs explaining — who provisioned this account, under what authority —
the log says the person did it, and that is simply false.

The session is also short-lived, so the capability disappears without warning,
and re-establishing it means re-authenticating through an OAuth flow that was
designed specifically to involve a human.

None of that is a limitation of agents. It is a mismatch between a credential
built for people and a caller that is not one.

## What to do instead: a scoped service token

Backstage supports external access tokens for exactly this. The relevant
configuration lives under `backend.auth`:

```yaml
backend:
  auth:
    externalAccess:
      - type: static
        options:
          token: ${BACKSTAGE_AGENT_TOKEN}
          subject: agent
        accessRestrictions:
          - plugin: scaffolder
          - plugin: catalog
```

Three properties matter here, and each one is the answer to a question someone
will eventually ask.

**`subject: agent`** means the caller is distinguishable in logs. A person signs
in through the identity provider; a machine presents this token. The two never
look the same.

**`accessRestrictions`** is the part most implementations skip. Without it the
token reaches every endpoint in the backend, which is dramatically more than
running one template requires. Naming the plugins the agent actually needs turns
a general-purpose credential into a specific one.

**A single environment variable** means revocation is one deletion. Nothing to
rotate across systems, no session to hunt down.

Generate the token with something that is actually random:

```sh
node -p "require('crypto').randomBytes(32).toString('base64')"
```

## The template is the contract

This is the idea worth taking away, independent of Backstage.

A scaffolder template is a typed, versioned, reviewable description of an
operation: these are the inputs, these are their constraints, this is what
happens, this is what comes out. When an agent runs one, the agent is not
improvising infrastructure. It is filling in a form that a human wrote, reviewed
and merged.

That changes the review question from *"is this generated Terraform correct"* —
which requires reading it every time — to *"is this template correct"*, which is
answered once, in a pull request, by whoever owns the platform.

It also means the blast radius is bounded by the template rather than by the
agent's judgement. An agent with a shell can do anything the shell can do. An
agent with a scaffolder token can do what the template does, with the inputs the
schema permits.

## Where the token still cannot help

Be clear about the boundary. A scaffolder token lets an agent submit a task and
read the result. It does not let it do the things a template does not do.

In a realistic account-vending template, the automated part is: create the
account, put it in the right organisational unit, assign access. The manual part
is: configure billing and security contacts, enable MFA on the root user, store
the recovery material, verify the regions you need are enabled, and record the
resulting account ID somewhere a human will find it.

On a typical governance checklist, the manual part is the majority. An agent that
runs the template has done the tractable fraction of the work, and reporting that
as "the issue is done" would be wrong. Say which criteria were satisfied and
which were not.

## Design the template so failures land early

The single most valuable property of a template an agent runs is that bad input
fails before anything is created, not after.

Two patterns are worth copying.

**Resolve names against the live system, not a list in the template.** A
hardcoded enum of environments or permission sets is correct on the day it is
written and wrong the first time someone adds one. Worse, it fails in the most
confusing direction: it rejects valid input while offering choices that no longer
exist. Looking the value up during `terraform plan` means the set of valid inputs
is always whatever the system currently holds, and an unknown value fails with
the real list in the error message.

**Order the stages so the irreversible one is last.** Creating an AWS account is
effectively permanent — the display name and root email cannot be changed without
support, and the address must be globally unique. Assigning access is trivially
reversible. If a username is wrong, you want that to fail during planning, not
after an account exists with nobody able to reach it.

The general form: everything cheap and checkable happens before anything
expensive and permanent.

## Things that will bite you

These are not hypothetical. Each one is a real failure mode with a
non-obvious cause.

**A passing pull request does not mean a working deployment.** Pipelines commonly
skip cloud authentication on pull requests, because a fork should never receive
credentials. That is correct — and it means a broken role reference can pass
every check and only fail after merge. If the deploy path has steps that never run
on a pull request, those steps are untested until they run for real.

**Defaults that are silently wrong are worse than missing ones.** A Terraform
variable with a default the pipeline never overrides will use the default while
appearing to use your configuration. A missing value fails loudly; a wrong
default fails in a way that looks like something else entirely.

**Adopt existing resources rather than recreating them.** If infrastructure
already exists and something already watches it, creating a parallel copy is
worse than the original problem. The build goes green, the artefact lands
somewhere nothing is looking, and the running system carries on unchanged. A data
source that reads the existing resource is the fix.

**Some cloud operations replace an entire configuration block.** Update APIs that
take a whole configuration object will drop anything you omit, including secrets
set by hand elsewhere. Read the live configuration, modify the field you care
about, write the whole thing back. Never construct the object from scratch.

**Record what you are about to replace.** When a deployment moves a mutable tag,
the digest of the previously working artefact is only knowable in the moment
before it moves. Capture and print it. A rollback should be something to copy,
not something to reconstruct while a service is down.

## What this buys you

Not fewer tokens spent by the model, which is the usual claim and is mostly
untrue. What it buys is work the agent never has to do at all.

An operation described as a template executes deterministically. It is not
re-derived, re-reviewed, or re-explained on each use, and it does not vary
between two runs on different days. The agent's contribution is choosing the
inputs and interpreting the outcome — the parts that genuinely need judgement.

That is also why the template deserves the same review standard as application
code. It is the artefact doing the work.
