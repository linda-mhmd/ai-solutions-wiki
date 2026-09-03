---
title: "Backstage as an Agent Interface"
description: "How to let a coding agent create real infrastructure through a Backstage scaffolder template: a scoped REST token, the official MCP Actions server as an alternative transport, and where each one's sharp edges are."
date: 2026-09-02
categories: [Guides]
tags: ["agents", "backstage", "platform-engineering", "idp", "governance", "aws", "terraform", "mcp"]
tools: []
related: ["guides/ai-governance-implementation", "guides/agent-identity-and-authorization", "glossary/model-context-protocol", "news/mcp-security-vulnerabilities-2026"]
last_updated: 2026-09-03
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

## An alternative transport: the MCP Actions server

Backstage also ships an official plugin,
[`@backstage/plugin-mcp-actions-backend`](https://github.com/backstage/backstage/blob/master/docs/ai/mcp-actions.md),
that exposes registered backend Actions as [MCP](/glossary/model-context-protocol/)
tools over Streamable HTTP. It lives in the core `backstage/backstage` repository,
not a community add-on, and is worth understanding as a second way to reach the
same template — with a different set of trade-offs, not a strictly better one.

**Get the comparison right first.** MCP is not an alternative to the browser. The
scoped token above already avoids the browser entirely. MCP is an alternative to
*hand-writing REST calls* against the Scaffolder API and parsing the task-status
responses yourself. If your agent harness already speaks MCP natively, that
integration code disappears. If it does not, MCP buys you nothing the token
approach was not already doing.

### What is actually different

| | Scoped REST token | MCP Actions server |
|---|---|---|
| Auth mechanism | `backend.auth.externalAccess`, static token | Same mechanism, or OAuth via Client ID Metadata Documents |
| What is exposed | Whatever endpoints `accessRestrictions` names | Registered **Actions** — the individual steps a template is built from |
| Discovery | None; you read the plugin's API docs | Tool listing and input schemas, over the protocol |
| Granularity | Per plugin (`scaffolder`, `catalog`) | Per action, via named servers with include/exclude filters |
| Protocol | Plain HTTP, whatever shape the plugin's API has | Streamable HTTP, standard MCP tool-call semantics |

### How to enable it

Install the plugin and add it to the backend, the same way as any other module:

```sh
yarn --cwd packages/backend add @backstage/plugin-mcp-actions-backend
```

```ts
// packages/backend/src/index.ts
backend.add(import('@backstage/plugin-mcp-actions-backend'));
```

Authentication reuses the exact block already shown above, pointed at a different
plugin ID:

```yaml
backend:
  auth:
    externalAccess:
      - type: static
        options:
          token: ${MCP_AGENT_TOKEN}
          subject: mcp-clients
        accessRestrictions:
          - plugin: mcp-actions
          - plugin: catalog
```

This is the same lesson as before, one layer up: `accessRestrictions` here scopes
the token to the MCP endpoint at all, not to which actions the endpoint may then
expose. Leave it there and the token can invoke **every action ever registered**
across every plugin in your instance, not only the scaffolder steps you meant to
allow. Narrow it further with a named, filtered server:

```yaml
mcpActions:
  servers:
    scaffolder:
      name: 'Scaffolder actions'
      filter:
        include:
          - id: 'publish:github'
          - id: 'catalog:register'
```

Check which action IDs actually exist in your instance before writing the filter
— they are listed at `/create/actions` in development — rather than guessing at
names.

### What to watch out for

**The "recommended" auth path reopens the exact problem this article opened
with.** Backstage's own docs mark the static-token route as "a temporary
workaround until device authentication is completed," and point integrators
toward OAuth via CIMD instead. But CIMD's flow is a browser-based approval —
which is precisely the borrowed-human-identity pattern the first section of this
guide told you to avoid for an unattended agent. For a caller with nobody at a
keyboard, the static token is currently the only practical option, not a
stopgap you can casually swap out later. Treat it as such, and do not assume a
future Backstage upgrade quietly makes device auth available; check the release
notes before you plan around it.

**Do not follow tutorials that use Dynamic Client Registration.** DCR is
explicitly deprecated for new deployments in favour of CIMD. Older blog posts
and Stack Overflow answers predate this and will lead you to a path Backstage
itself no longer recommends.

**"Action" is narrower than "template," and the two are not fully unified yet.**
An Action is one step — publish to GitHub, register in the catalog — not an
entire multi-step scaffolder template. Whether "run this template end-to-end"
becomes a single invokable tool depends on how its steps are wired into the
Actions Registry, and Backstage's own issue tracker has an open, unresolved
report of Actions-registry actions not surfacing in the scaffolder correctly
([backstage/backstage#31187](https://github.com/backstage/backstage/issues/31187)).
Do not assume MCP gives you one clean tool call per template without checking
your instance.

**The MCP endpoint is shared by default.** Every action any plugin registers is
exposed at the default `/api/mcp-actions/v1` endpoint unless you split it into
named, filtered servers as above. This is the same failure shape as an
unrestricted `accessRestrictions` block: a credential that is far broader than
the one operation you built it for.

**Use the built-in telemetry.** The plugin instruments metrics and tracing for
tool calls, which gives you exactly what an audit trail through a template
should have — who called what, with what subject, and when. Wire it into
whatever already collects your platform's metrics rather than treating it as
optional; this is the observability the `subject: agent` field in the token was
already buying you, now visible per tool call rather than only in access logs.

For the wider pattern this all sits inside — why an agent needs an identity of
its own rather than a borrowed one, and how to scope, rotate, and revoke it —
see [agent identity and authorization](/guides/agent-identity-and-authorization/).
For the failure modes MCP servers accumulate once they scale past one team's use,
see [MCP security vulnerabilities in 2026](/news/mcp-security-vulnerabilities-2026/).

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
