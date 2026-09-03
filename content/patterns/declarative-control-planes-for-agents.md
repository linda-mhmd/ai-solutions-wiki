---
title: "Declarative Control Planes for Agents"
description: "Two different answers to how an agent safely changes infrastructure: run a fixed sequence of steps once, or state a desired end state and let a reconciliation loop converge on it. Neither one is the general-purpose answer."
date: 2026-09-03
lastmod: 2026-09-03
last_updated: 2026-09-03
categories: [Patterns]
tags: ["control-plane", "crossplane", "kubernetes", "reconciliation", "agents", "declarative-infrastructure", "platform-engineering", "custom-resources"]
related:
  - guides/backstage-as-an-agent-interface
  - tools/crossplane
  - patterns/fail-early-automation
  - guides/infrastructure-as-code-ai
  - glossary/kubernetes
  - guides/agent-identity-and-authorization
---

An agent that needs to change infrastructure has to interact with something that turns its request into real-world effect. There are two architecturally different shapes for that something, and the choice is not stylistic — it determines what "safe" and "reviewable" even mean for a given operation.

The **imperative template model** hands the agent a fixed, ordered sequence of steps — a Backstage scaffolder template, a CI pipeline, a runbook script — and the agent (or a runner acting on its request) executes that sequence once, top to bottom. The **declarative control-plane model** hands the agent an API for stating a desired end state — a Kubernetes-style Custom Resource — and a controller's reconciliation loop drives actual state toward that declaration continuously, on its own schedule, independent of whether the agent is still watching. This page is about that architectural split: what each model is actually good at, where the current vendor argument for the declarative side overstates its case, and a decision rule for picking between them.

## Two ways to make a change happen

The imperative model is covered in detail in [Backstage as an agent interface](/guides/backstage-as-an-agent-interface/), which frames it this way: "a scaffolder template is a typed, versioned, reviewable description of an operation: these are the inputs, these are their constraints, this is what happens, this is what comes out. When an agent runs one, the agent is not improvising infrastructure. It is filling in a form that a human wrote, reviewed and merged." The template *is* the contract. Reviewing it once, in a pull request, answers "is this correct" for every future invocation — the review question never has to be re-asked per run.

The declarative model looks different from the moment of invocation onward. The agent (or a human) doesn't ask a pipeline to run — it writes an object into an API and stops. In Kubernetes' own words, a controller is a control loop that "watches the state of your cluster, then makes or requests changes where needed," tracking a resource type whose `spec` field "represents the desired state," where "the controller(s) for that resource are responsible for making the current state come closer to that desired state," according to [Kubernetes' own documentation](https://kubernetes.io/docs/concepts/architecture/controller/). Desired state and actual state are separate, persistent, inspectable objects (`spec` and `status`), and a background process — not the caller — is responsible for closing the gap between them, repeatedly, for as long as the object exists.

[Crossplane](/tools/crossplane/) is the reference implementation of this pattern applied to infrastructure outside the cluster itself: cloud databases, object storage, networking, SaaS resources. It works by letting a platform team define a **CompositeResourceDefinition (XRD)** — a custom API schema, analogous to a Kubernetes CustomResourceDefinition — and a **Composition** that maps a request against that API to a set of underlying managed resources. According to [Crossplane's own documentation](https://docs.crossplane.io/latest/composition/compositions/), "Compositions are a template for creating multiple Kubernetes resources as a single *composite* resource," and each function in a Composition's pipeline "adds to or updates the desired state and then passes it on" to the next; "when the last function in the pipeline has run, Crossplane applies the desired state it returns" — Crossplane then reconciles the cluster toward that applied state continuously. An agent that wants a Postgres instance does not call a provisioning script; it creates (or applies) a Claim object and leaves. Retries, drift correction, and convergence are the controller's problem, not the agent's.

| | Imperative template | Declarative control plane |
|---|---|---|
| What the agent submits | A filled-in form (template parameters) | A desired-state object (Custom Resource / Claim) |
| Who drives execution | The runner, once, top to bottom | A controller, continuously, until the object is deleted |
| What "done" means | The last step returned success | Actual state currently matches declared state |
| How drift is handled | Not handled — rerun the template | Reconciled automatically on the next loop |
| Unit of review | The template (steps, inputs, constraints) | The XRD/Composition (schema and mapping logic) |
| Failure mode | Halts partway; may leave debris (see [Fail early, fail cheap](/patterns/fail-early-automation/)) | Retries on its own; object stays in a `status` that says why it hasn't converged |

## What the declarative side actually argues, in its own words

The current, specific case for this pattern in the context of AI agents was made by Ana Margarita Medina, a CNCF Ambassador, in a post [cross-published on the CNCF blog in March 2026](https://www.cncf.io/blog/2026/03/20/crossplane-and-ai-the-case-for-api-first-infrastructure/) (originally published on [Crossplane's own blog](https://blog.crossplane.io/crossplane-ai-the-case-for-api-first-infrastructure/) in February 2026). The argument, quoted directly rather than paraphrased:

> "Agents require a unified, structured, machine-readable interface. They need explicit governance rules, readable historical patterns, and discoverable dependencies."

On what happens when an agent meets infrastructure that was never built with an API-first interface:

> "The agent hits a wall, not because it lacks capability, but because the platform wasn't built for programmatic access."

On the mechanics of the reconciliation model specifically:

> "Desired state lives in `spec`, actual state is reflected in `status`, and controllers observe the difference and reconcile continuously."

> "Crossplane extends this model beyond containers to all infrastructure and applications: cloud databases, object storage, networking, SaaS systems, clusters, and custom platform APIs."

And the summary claim the whole post is building toward:

> "Without a control plane, agents become fragile orchestrators. With one, they become declarative participants."

That last line is the strongest version of the argument, and it's worth taking seriously: an agent that has to sequence its own retries, remember what it already did, and re-check state after every step is doing coordination work a controller already does better, because a controller keeps trying after the agent's context window is gone. Framing an agent as a "declarative participant" rather than an orchestrator is a real reduction in what has to go right inside the agent's own reasoning for an operation to succeed.

## What that argument leaves out

The post makes its case entirely against a straw-man alternative — a platform where, in its own description, "policies are buried in pipeline configs" and organizational knowledge sits in "wikis no one reads," governed by "reviews, tickets, Slack threads" rather than a unified API. It does not compare the declarative model against the other structured alternative: a well-designed imperative template, of the kind described in [Backstage as an agent interface](/guides/backstage-as-an-agent-interface/). Set against *that* comparison, three costs of the declarative model stand out, none of which the CNCF/Crossplane post addresses.

**The learning curve is real and front-loaded.** Reading a scaffolder template requires reading YAML top to bottom: these inputs, these steps, in this order. Reading a Crossplane Composition requires understanding CRDs, the XRD/Composition/Claim split, the function pipeline model, and reconciliation semantics — none of which map onto anything a general-purpose software engineer already knows unless they've worked with Kubernetes operators specifically. A platform team adopting this pattern is adopting Kubernetes' extension model as infrastructure, not just as a runtime for their agent tooling.

**Reviewability is genuinely harder, not just different.** A scaffolder template's steps are fixed and visible in one file: step 3 always runs after step 2, with the arguments the template defines. A Composition's actual behavior depends on the function pipeline's runtime evaluation of *observed* state — what a given claim resolves to depends on what already exists in the cluster, what the provider currently returns, and how each function in the pipeline transforms that input. Two claims with identical `spec` fields, submitted an hour apart, can compose differently if the environment they're reconciled against has changed. Reading the Composition's YAML tells you the *shape* of what can happen; it doesn't tell you what *will* happen the way a linear template's ordered list does. That's not a defect in Crossplane — it's the direct cost of buying continuous convergence: the same runtime flexibility that lets a controller correct drift also makes "what will this actually do" a question you can only answer by running it, not by reading it.

**It only helps where the target is already Kubernetes-API-shaped.** The entire pattern rests on the target system being representable as a Custom Resource with a meaningful `spec`/`status` split, watched and reconciled by a controller. A cloud database, a DNS record, an IAM policy — these map cleanly. A one-time business action — send this invoice, close this ticket, onboard this specific customer with a specific signed agreement — does not have a stable "desired state" to reconcile toward, because there is no ongoing state to maintain; there is only an event that should happen exactly once. Forcing that into a Custom Resource means either modeling a business process as if it were infrastructure, or building and maintaining a controller whose entire reconciliation loop does nothing more than "has this run yet — if not, run it," which is a worse implementation of a one-shot operation than a template that just runs it.

## The decision rule

Use the declarative control-plane model when the operation is inherently about **achieving and maintaining a state**, and drift correction has ongoing value:

- A database that should exist with N replicas, right now and next Tuesday.
- A running service that should stay at a given version and scale, correcting itself if a node dies or someone manually changes a setting out of band.
- Any resource where "what's true right now" can diverge from "what should be true" for reasons outside the agent's control, and re-converging automatically is worth more than an audit trail of exact steps taken.

Use the imperative template model when the operation is a **one-shot, auditable business process**, where "did the exact right steps run, in order, once" matters more than continuous convergence:

- Create this account, provision this specific engagement, onboard this customer.
- Anything where a human reviewer needs to answer "what happened" by reading a fixed, ordered list of steps rather than inferring behavior from a schema and the state of the world at the time it ran.
- Anything that shouldn't self-correct if run twice — a duplicate customer record is a bug, not drift to reconcile away.

The two models are not mutually exclusive within one platform. A scaffolder template's last step is commonly "write a Custom Resource" — the imperative model handles the one-shot, reviewable act of requesting something, and the declarative model takes over maintaining it afterward. [Backstage](/tools/backstage/), for instance, is frequently used as the request-and-review front end for infrastructure that [Crossplane](/tools/crossplane/) actually reconciles. The two-model view is also why not every Kubernetes-native automation tool sits on the declarative side of this line: [Argo Workflows](/tools/argo-workflows/) runs a DAG of steps to completion and stops — closer in shape to the imperative template model than to a controller that reconciles forever — even though it, too, runs natively as Kubernetes resources.

## Ordering validation still matters, in both models

[Fail early, fail cheap](/patterns/fail-early-automation/) argues that cheap, checkable validation should run before any irreversible side effect, and that names should be resolved against live system state rather than a hardcoded list. Both rules apply to declarative control planes, but they show up in a different place than they do in a template.

In the imperative model, validation is a *step* — usually the first one — that runs once, blocks the rest of the pipeline on failure, and is done. In the declarative model, there is no single validation step to point to: an XRD's OpenAPI schema validates the *shape* of a submitted Claim at admission time (malformed input is rejected immediately, which is the reconciliation-model equivalent of Rule 1's cheap up-front check), but semantic validation — does the referenced network actually exist, does the caller's quota have room — happens inside the reconciliation loop itself, on every pass, not just the first one. That is stricter in one sense (a Claim that becomes invalid *after* being accepted, because something it depended on was deleted, gets caught on the next reconcile rather than silently drifting) and weaker in another: there is no single moment called "validation passed" to point to in an audit log, only a `status` field that says "not yet reconciled" until it doesn't. Rule 2 — resolve names against live state, not a hardcoded enum — is close to automatic in the declarative model, since the controller re-reads live state on every loop by construction; it's the imperative model that has to be deliberately designed to avoid a stale hardcoded list, as that pattern's own page describes.

## Sources

1. Medina, Ana Margarita. "Crossplane and AI: The case for API-first infrastructure." CNCF Blog, March 20, 2026: [https://www.cncf.io/blog/2026/03/20/crossplane-and-ai-the-case-for-api-first-infrastructure/](https://www.cncf.io/blog/2026/03/20/crossplane-and-ai-the-case-for-api-first-infrastructure/)
2. Medina, Ana Margarita. "Crossplane & AI: The Case for API-First Infrastructure." Crossplane Blog, February 25, 2026: [https://blog.crossplane.io/crossplane-ai-the-case-for-api-first-infrastructure/](https://blog.crossplane.io/crossplane-ai-the-case-for-api-first-infrastructure/)
3. Kubernetes documentation. "Controllers": [https://kubernetes.io/docs/concepts/architecture/controller/](https://kubernetes.io/docs/concepts/architecture/controller/)
4. Crossplane documentation. "Compositions": [https://docs.crossplane.io/latest/composition/compositions/](https://docs.crossplane.io/latest/composition/compositions/)
5. Crossplane documentation. "Composite Resource Definitions": [https://docs.crossplane.io/latest/composition/composite-resource-definitions/](https://docs.crossplane.io/latest/composition/composite-resource-definitions/)
6. CNCF. "Cloud Native Computing Foundation Announces Graduation of Crossplane," November 6, 2025: [https://www.cncf.io/announcements/2025/11/06/cloud-native-computing-foundation-announces-graduation-of-crossplane/](https://www.cncf.io/announcements/2025/11/06/cloud-native-computing-foundation-announces-graduation-of-crossplane/)

## Further reading

- [Backstage as an agent interface](/guides/backstage-as-an-agent-interface/): the imperative side of this pattern worked through in full, including the "template is the contract" framing.
- [Crossplane](/tools/crossplane/): the control-plane framework used as the worked example on this page.
- [Fail early, fail cheap](/patterns/fail-early-automation/): the validation-ordering principle referenced above, and how it differs between a linear template and a reconciliation loop.
- [Infrastructure as code for AI](/guides/infrastructure-as-code-ai/): how agents fit into IaC workflows more broadly, declarative or not.
- [Argo Workflows](/tools/argo-workflows/): a Kubernetes-native tool that stays on the imperative side of this split despite running as Kubernetes resources.
- [Durable execution for agent workflows](/guides/durable-execution-for-agent-workflows/): how imperative pipelines get retry and crash-recovery properties without becoming a reconciliation loop.
