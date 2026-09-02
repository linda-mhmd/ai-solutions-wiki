---
title: "Fail Early, Fail Cheap: Ordering Operations in Automation"
description: "Put every cheap, checkable validation before the first irreversible side effect, and resolve names against live system state rather than a hardcoded list. Two rules that decide whether a failed automation run is recoverable or leaves debris."
date: 2026-09-02
lastmod: 2026-09-02
last_updated: 2026-09-02
categories: [Patterns]
tags: ["automation", "validation", "idempotency", "infrastructure-as-code", "error-handling", "self-service", "platform-engineering"]
related:
  - glossary/idempotency
  - guides/when-automation-pays-for-itself
  - guides/infrastructure-as-code-ai
  - glossary/human-in-the-loop
---

Automation that fails is fine. Automation that fails **halfway** is the problem: some resources created, some not, nothing recorded, and a human left to work out what state the world is in. The difference between the two is almost entirely a matter of **the order in which operations run**.

Two rules cover most of it.

## Rule 1: everything checkable happens before anything permanent

Order the stages of an automated workflow by reversibility, not by convenience or by the order the API documentation happens to list them.

| Stage | Examples | Cost of failure |
|---|---|---|
| **Validate** | Does this identifier exist? Is the input well-formed? Are the permissions present? | None |
| **Reversible actions** | Grant access, create a record, write a file | Undo it |
| **Expensive actions** | Provision compute, populate storage | Time and money |
| **Irreversible actions** | Create a tenant or account, send an external notification, sign or publish | Cannot be undone |

Everything in the first row must complete before anything in the last row begins.

The version of this that hurts is the workflow that performs several successful steps, writes real artefacts, and then fails on a final publish or handoff step because a dependency was missing. Every earlier step succeeded and is now debris. The failure is reported at the end, so the operator sees a single error message and no indication of the four things that already happened.

Because validation is free, be exhaustive about it:

- Do all referenced identifiers exist — the group, the role, the permission set, the parent container?
- Does the caller hold the permissions the later stages need? Check this at the start, not at the moment of use.
- Is the input plausible — a well-formed address, a name that is not already taken, a quota that has room?
- Are the downstream systems reachable at all?

## Rule 2: resolve names against the live system, not a hardcoded list

A very common shape in self-service templates is an enumeration written into the template:

```yaml
environment:
  type: string
  enum: [production, development, staging, sandbox]
```

This is correct on the day it is written and wrong the first time someone adds an environment. It then fails in the **most confusing possible direction**: it rejects valid input while offering choices that no longer exist. The operator sees a validation error naming options that are not real, and concludes the system is broken rather than the list is stale.

Resolve the valid set at runtime instead, and make an unknown value fail during the planning phase with the real list in the message:

```hcl
data "aws_organizations_organizational_units" "root" {
  parent_id = data.aws_organizations_organization.org.roots[0].id
}

resource "terraform_data" "container_must_exist" {
  lifecycle {
    precondition {
      condition     = local.matched != null
      error_message = "Container \"${var.target}\" does not exist. Available: ${join(", ", local.names)}."
    }
  }
}
```

Two properties make this work: the valid set is whatever the system currently holds, so it cannot go stale; and the error tells the operator what they *could* have said, which turns a support question into a self-service correction.

The general principle: **a hardcoded list of things that live in another system is a cache with no invalidation.** If the authoritative source is queryable, query it.

## Supporting practices

**Make runs idempotent.** Re-running after a partial failure should converge on the intended state rather than creating duplicates. Where the underlying API has no natural idempotency, generate a deterministic client-side key from the inputs. See [idempotency](/glossary/idempotency/).

**Report what succeeded, not only what failed.** When a run does stop midway, the error message should list the steps that completed and the resources they created. This is the difference between a five-minute cleanup and an afternoon of investigation.

**Put a human decision before the irreversible step, not after it.** Where an action cannot be undone and cannot be fully validated, a confirmation that names the specific thing about to happen is worth more than any amount of prior checking. The confirmation has to be legible — "create account with root address `x@y`, in container `z`" — not "proceed? y/n". See [human in the loop](/glossary/human-in-the-loop/).

**Validate the fields that cannot be changed afterwards, hardest.** Some inputs are effectively permanent once set — a primary identifier, a recovery address, a region. These deserve validation out of proportion to their apparent importance, because the cost of getting them wrong is not a re-run, it is a support case.

## Why this matters more for self-service

A script one author runs occasionally can rely on that author's judgement. A template published for others to run cannot: it will be used by people who do not know its internals, on inputs its author never anticipated, and its error messages are the entire support experience. The two rules above are what let a template fail in a way the operator can act on, rather than in a way that produces a ticket.

This is also the point at which automation stops being a time-saving exercise and starts being a **bottleneck-removal** one — the case for building it no longer rests on the [break-even arithmetic](/guides/when-automation-pays-for-itself/) at all.

## Further reading

- [When automation pays for itself](/guides/when-automation-pays-for-itself/): whether to build the automation in the first place.
- [Idempotency](/glossary/idempotency/): making re-runs safe.
- [Infrastructure as code for AI](/guides/infrastructure-as-code-ai/): where these validations live.
- [Human in the loop](/glossary/human-in-the-loop/): placing confirmation where it counts.
- [Proving a deployment landed](/guides/proving-a-deployment-landed/): the same scepticism applied to delivery.
- [Retry and backoff](/patterns/retry-and-backoff/): handling the failures that are transient rather than structural.

## Sources

1. HashiCorp. "Custom conditions — preconditions and postconditions." [https://developer.hashicorp.com/terraform/language/expressions/custom-conditions](https://developer.hashicorp.com/terraform/language/expressions/custom-conditions)
2. Google. *Site Reliability Engineering*, Chapter 5: "Eliminating Toil." [https://sre.google/sre-book/eliminating-toil/](https://sre.google/sre-book/eliminating-toil/)
3. Amazon Web Services. "Making retries safe with idempotent APIs." Builders' Library. [https://aws.amazon.com/builders-library/making-retries-safe-with-idempotent-APIs/](https://aws.amazon.com/builders-library/making-retries-safe-with-idempotent-APIs/)
4. The Twelve-Factor App. "Config." [https://12factor.net/config](https://12factor.net/config)
5. Nielsen, J. "Error Message Guidelines." Nielsen Norman Group. [https://www.nngroup.com/articles/error-message-guidelines/](https://www.nngroup.com/articles/error-message-guidelines/)
