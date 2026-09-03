---
title: "Golden Paths as Agent Contracts"
description: "Golden paths were written as documentation for humans to follow. In 2026, platform teams are rewriting the same paved paths as machine-consumable contracts an agent can dispatch against, with the approval gate moved from the doc to the pull request."
date: 2026-09-03
lastmod: 2026-09-03
last_updated: 2026-09-03
categories: [Guides]
tags: ["golden-paths", "platform-engineering", "ai-agents", "developer-portals", "scorecards", "dispatch-controls", "software-catalog", "governance"]
related:
  - guides/platform-engineering-ai
  - guides/catalog-as-agent-context
  - patterns/fail-early-automation
  - guides/agent-identity-and-authorization
  - guides/durable-execution-for-agent-workflows
---

A golden path is the supported way to do a common task in a platform-engineering org: scaffold a new service, add a database, onboard a repo to the catalog. Spotify, whose 2020 engineering-blog post is the reference definition for the platform-engineering sense of the term (the phrase itself, by that post's own account, is borrowed from Frank Herbert's *Dune* novels, not original to Spotify), defines a golden path as "the 'opinionated and supported' path to 'build something'" — a tutorial, a template, and a set of defaults that steer engineers away from "rumour-driven development" toward one blessed route, according to [Spotify's engineering blog](https://engineering.atspotify.com/2020/08/how-we-use-golden-paths-to-solve-fragmentation-in-our-software-ecosystem). That definition assumes a human reader who can interpret prose, notice when a step doesn't apply, and ask someone before doing something risky.

An agent can't do any of that by default. It can't infer intent from a README, and it doesn't inherently know which of its own actions are reversible. So when a platform team wants an agent to run a golden path — not just read about one — the path has to stop being a document and start being a contract: a schema the agent calls, with typed inputs, declared side effects, and an explicit point where control returns to a human. This is the shift Datadog documents in its August 2026 post on adapting golden paths for autonomous agents, and it's the shift this page walks through, alongside the concrete mechanism — scorecard-driven pull requests — that several developer-portal vendors have already shipped to enforce it.

## What changes when the user of a golden path is an agent

[Datadog's post](https://www.datadoghq.com/blog/golden-paths-for-ai-agents/), published August 25, 2026 and authored by Candace Shamieh, Shlomo Benyaminov, and James Eastham, frames the problem as one of enforcement location. A human-facing golden path relies on the human to know when to stop and ask; an agent-facing one has to put that check somewhere the agent cannot reason its way around. The post's central claim is that this requires **machine-consumable contracts** and enforcement "outside the agent's own judgment," not better documentation.

Concretely, the post says a capability an agent can call needs "a clear description, typed inputs and outputs, stable and versioned schemas, machine-readable limits and error categories, declared side effects, preconditions, and approval requirements." That is a stricter bar than most internal golden-path docs meet today — most describe a `terraform apply` or a scaffolder template in prose, with the safety rails implied rather than declared. A [Model Context Protocol](/glossary/model-context-protocol/) tool definition or an MCP Actions server exposing a scaffolder template — the pattern [Backstage](/guides/backstage-as-an-agent-interface/) uses — is one concrete shape this kind of contract can take; MCP's own history of [tool-poisoning and prompt-injection incidents](/news/mcp-security-vulnerabilities-2026/) is part of why declared side effects and approval requirements matter as much as the schema itself.

### Execution patterns aren't interchangeable

The post also argues that platform teams have to pick an execution pattern deliberately, based on the workload's latency, durability, isolation, and API requirements, rather than defaulting to whatever request/response shape the platform already has:

| Pattern | When it fits | Characteristics |
|---|---|---|
| Synchronous / low-latency | Real-time conversational agents | Runs in "seconds to a few minutes"; the caller waits on the response |
| Durable / resumable | Long-running agents | "Asynchronously on tasks that continue for hours or days"; must survive restarts, retries, and process crashes |
| Isolated sandbox | Agents that need to run code | Execution kept separate "from the primary agent service" so a runaway or malicious code path can't touch the rest of the platform |

The durable pattern is the one most golden paths — provisioning infrastructure, running a multi-step migration, waiting on a human approval that might not arrive for hours — actually need, which is why [durable execution engines](/guides/durable-execution-for-agent-workflows/) like [Temporal](/tools/temporal/) and Kubernetes-native [workflow engines](/glossary/workflow-engine/) such as [Argo Workflows](/tools/argo-workflows/) show up as the runtime underneath agent-facing golden paths rather than a plain webhook or CI job.

### Dispatch is the control point, not the endpoint

Datadog names the boundary explicitly: "Dispatch is the platform step that converts a signal into a bounded, authorized agent run." The post traces the flow as signal → curated context → task identity → allowed capabilities → execution target → recorded output. Each of those nouns is doing work: a *task identity* scoped to this one run (not a shared service credential — see [agent identity and authorization](/guides/agent-identity-and-authorization/)), *allowed capabilities* that are a subset of everything the platform can do, and *recorded output* so the run can be audited or its result [verified after the fact](/guides/proving-a-deployment-landed/).

The post's term for the resulting design is a **hybrid golden path**: one that "allow[s] probabilistic operations in a workflow where progression remains under deterministic control," using tests, security scans, and approvals as the gates between an agent's judgment and any consequential action. The agent can be creative about how it writes a fix; it cannot be creative about whether that fix ships.

## The pattern in practice: scorecard, fix, routed PR

The most concrete version of a hybrid golden path documented so far is a workflow Port has shipped and written up: an agent reads a scorecard that defines a standard, finds the services that fail it, writes a fix for each one, and opens a pull request. According to [Port's own blog post on enforcing engineering standards with AI](https://www.port.io/blog/enforcing-engineering-standards-with-ai-agents), the platform "reads the standard, finds the services that fail it, writes a fix for each one, and opens a pull request routed to the team that owns the service." The post is explicit that this stops short of merging: "a developer will approve the update," because — in the post's framing — agents cannot judge when a rule shouldn't apply due to business context that isn't in the catalog. The vendor-specific detail of how Port's scorecards and workflow automations wire this together is covered in [Backstage vs. Port vs. Cortex vs. OpsLevel](/comparisons/backstage-vs-port-vs-cortex-vs-opslevel/); what matters here is the shape of the pattern, because it generalizes past any one vendor.

Strip the product names and three preconditions fall out — each one a place the pattern breaks if a platform team skips it.

**1. The standard has to be machine-readable.** A scorecard is a rubric an agent can evaluate against a catalog entry — this service has an owner field, this service has a CODEOWNERS file, this service's base image is less than 90 days old — not a paragraph in an internal wiki telling engineers what good looks like. Port's post makes the same point about the underlying mechanism: a scorecard's governance rules act as "deterministic guardrails... that constrain what the agent is allowed to do," and catalog context is "the input that makes the agent correct." A golden path that only exists as prose has nothing for an agent to evaluate; turning it into a contract starts with turning its acceptance criteria into a scorecard or an equivalent rubric.

**2. The catalog needs accurate ownership metadata.** Finding which services fail a standard is only half the job — the agent then has to know who to send the fix to. Port's post is blunt about what happens without that data: "Give it no ownership data, and 200 correct fixes land as 200 pull requests on one platform engineer." Ownership metadata is a precondition for both grounding the agent's understanding of a service and routing the output of its work — the same duality covered in [catalog as agent context](/guides/catalog-as-agent-context/). A catalog that's stale on ownership doesn't just give an agent wrong context; it breaks the delivery mechanism for anything the agent produces.

**3. The dispatch boundary sits at PR-open, not merge.** Opening a pull request is reversible — a reviewer can close it, request changes, or let it sit. Merging is the point past which the change is live (or heading there through CI/CD). Putting the human checkpoint at PR-open rather than merge is the same reversible-versus-irreversible distinction covered in [fail-early automation](/patterns/fail-early-automation/) and in how [agent identity and authorization](/guides/agent-identity-and-authorization/) scopes what an agent's credentials are allowed to touch: an agent identity that can open PRs but holds no merge permission enforces the boundary at the credential layer, not just at the process layer, so the constraint holds even if the agent's own judgment about risk is wrong.

None of the three is optional in isolation. A machine-readable scorecard with no ownership data produces correct fixes nobody is on the hook to review. Accurate ownership with no dispatch boundary produces an agent that can merge its own fixes into services it doesn't own. And a scorecard plus routing plus a PR-only boundary, run against a catalog nobody keeps current, produces confidently wrong fixes routed to the wrong team.

## What to build if golden paths already exist

This isn't a starting point — it's the next step for a team that already has [platform engineering AI](/guides/platform-engineering-ai/) fundamentals in place: a catalog, at least one working golden path, some CI/CD maturity. Turning an existing golden path into an agent contract is mostly a matter of making implicit structure explicit:

- **Write the schema down.** Take the golden path's inputs (service name, team, database type, region) and outputs (repo URL, deployed endpoint, catalog entry) and give them types, not just a form in a scaffolder UI. An [MCP](/glossary/model-context-protocol/) tool definition or an OpenAPI spec both work; what matters is that an agent can validate a call against it before making one.
- **Pick the execution pattern on purpose.** A path that provisions a database through [infrastructure as code](/guides/infrastructure-as-code-ai/) — a Crossplane claim, a Terraform apply — is a durable workload, not a synchronous request/response call; wire it through a [workflow engine](/glossary/workflow-engine/) that survives a restart, not a webhook that doesn't. [Declarative control planes](/patterns/declarative-control-planes-for-agents/) are the underlying pattern for the infrastructure-provisioning half of this.
- **Fix the catalog before fixing the agent.** If ownership, tier, or dependency data in the catalog is wrong, an agent dispatched against a golden path will route work incorrectly no matter how well the contract is written. This is catalog hygiene work, not agent-tooling work, and it has to happen first.
- **Put the approval gate at the same place every time.** PR-open, not merge, for anything a scorecard or a golden path triggers autonomously — and enforce it with scoped credentials, not just workflow logic, so a bug in the agent's reasoning can't route around it.

The result looks less like a wiki page and more like an API: versioned, typed, with a documented failure mode and an explicit human checkpoint. The wiki page can still exist — for the human engineers who'd rather read prose than a schema — but it stops being the thing an agent has to parse to act.

## Sources

1. Datadog, "How to adapt Golden Paths for autonomous AI agents": [https://www.datadoghq.com/blog/golden-paths-for-ai-agents/](https://www.datadoghq.com/blog/golden-paths-for-ai-agents/)
2. Port.io, "How Platform Engineers Enforce Engineering Standards With AI": [https://www.port.io/blog/enforcing-engineering-standards-with-ai-agents](https://www.port.io/blog/enforcing-engineering-standards-with-ai-agents)
3. Spotify Engineering, "How We Use Golden Paths to Solve Fragmentation in Our Software Ecosystem": [https://engineering.atspotify.com/2020/08/how-we-use-golden-paths-to-solve-fragmentation-in-our-software-ecosystem](https://engineering.atspotify.com/2020/08/how-we-use-golden-paths-to-solve-fragmentation-in-our-software-ecosystem)

## Further reading

- [Platform engineering for AI teams](/guides/platform-engineering-ai/): the foundations — catalog, golden paths, CI/CD maturity — this page assumes are already in place
- [Catalog as agent context](/guides/catalog-as-agent-context/): why catalog accuracy is a precondition for both grounding an agent and routing its output
- [Fail-early automation](/patterns/fail-early-automation/): the general case for ordering validation before irreversible actions
- [Agent identity and authorization](/guides/agent-identity-and-authorization/): scoping an agent's credentials so the dispatch boundary holds even when its reasoning doesn't
- [Durable execution for agent workflows](/guides/durable-execution-for-agent-workflows/): the runtime pattern behind long-running, resumable golden paths
- [Backstage vs. Port vs. Cortex vs. OpsLevel](/comparisons/backstage-vs-port-vs-cortex-vs-opslevel/): the vendor-specific detail behind the scorecard-to-PR mechanism described here
