---
title: "The Cost of Not Updating Your Platform"
description: "A developer portal went two years without an update and stopped being able to build at all, silently. What decays while nothing changes, and why the pipeline never reported it."
date: 2026-09-02
categories: [Guides]
tags: ["platform-engineering", "maintenance", "supply-chain", "ci-cd", "developer-portal", "security"]
tools: []
related: ["guides/proving-a-deployment-landed", "guides/repo-hygiene-with-ai-agents", "guides/when-automation-pays-for-itself"]
last_updated: 2026-09-02
---

An internal developer portal sat untouched for two years. It was running. People
used it. Nothing appeared to be wrong.

It could not be built. Not "would fail its tests" — the container image could not
be produced at all. Nobody knew, because the pipeline that would have discovered
it had never successfully run, and the running service had been deployed by hand
from a laptop.

This is a common shape of failure and it is worth understanding, because the
lesson is not "keep your dependencies current". It is that **a system with no
recent build has no evidence it can still be built**, and that gap widens
invisibly.

## How a working system stops being buildable

Nothing changed in the repository. That is the point.

The application pinned its own toolchain with a caret range — the ordinary,
recommended way to express "this minor version or newer". Over two years, the
transitive dependency graph beneath that range moved. Eventually something deep
in it required a newer language runtime than the container image provided.

The declared dependencies were never edited. The lockfile was never regenerated.
The build simply stopped resolving, at a point in time nobody observed, because
nothing was building.

Three separate decisions had to combine for this:

- A version range that permits drift, which is normal and usually correct
- A runtime pinned in a different file from the one declaring the requirement
- No build running on a schedule, so the two were never compared

Any one alone is fine. Together they produce a system that is, in a real sense,
already broken while continuing to serve traffic.

## What else decays quietly

**Security advisories accumulate against code you did not change.** The same
dependency tree that drifted also collected vulnerabilities. On this project, an
audit found two critical and seventeen high severity advisories, all reached
transitively. None came from application code. All were closed by pinning two
packages — a change measured in minutes, available at any point in the preceding
two years, taken by nobody because no one was looking.

**Your runtime goes out of support.** A pinned base image is stable until the
version stops receiving security patches. Then it is stable and unsupported,
which is worse, because the stability is now the problem.

**Upstream removes what you depend on.** Packages get deprecated and eventually
deleted. Discovering that during an urgent security fix is materially worse than
discovering it on a quiet Tuesday.

**The upgrade path itself expires.** Most projects support migration across a
window of versions. Fall far enough behind and the documented route no longer
exists, and you are reconstructing it. The cost of an upgrade is not linear in
how long you waited.

## What you miss, which is harder to notice

Absent problems are easier to argue about than absent features, but the second
list is usually longer.

Two years of releases on an actively developed platform typically includes
performance work, accessibility fixes, better defaults, and capabilities that
would have solved problems your team worked around by hand. Those workarounds
become load-bearing. Removing them later is its own project.

In this case the two years included a mechanism for granting scoped access to
automated callers — the thing needed to let an agent use the platform at all.
That existed upstream for a year while the team believed it was impossible.

## The pipeline that never ran

The most instructive detail was not the version drift. It was that a build
pipeline had existed the whole time, correctly configured, and had never produced
a usable artefact.

It pushed images to a registry the runtime could not read. The registry was
correct for the organisation's other repositories. The runtime — a managed
container service — could only pull from its cloud provider's own registry. The
two were never reconciled because nothing forced them to be. The service was
running an image someone had pushed manually, once.

**A pipeline that has never delivered is not a pipeline.** It is a diagram of
one. Until an artefact it produced is running in production, it is untested
regardless of how green it looks.

A related trap: pipelines commonly skip cloud authentication on pull requests,
correctly, so that forks never receive credentials. That means the deployment
half is exercised only after merge. A broken credential reference can pass every
check and fail on the first real deploy.

## What actually prevents this

**Build on a schedule, not only on change.** A weekly build of an unchanged
repository is the only thing that detects drift in the graph beneath your pinned
versions. It is cheap and it is the single highest-value item here.

**Run the audit in that same job and fail on new critical findings.** Not a
report someone reads. A failure someone must act on.

**Verify the artefact reaches production.** A deployment is proven by the running
system reporting the new version, not by a green pipeline. Have something you can
check from outside — a version endpoint, an asset fingerprint — and check it.

**Keep runtime versions in one place.** When the language version appears in a
package manifest and separately in a container image, they will diverge. Derive
one from the other, or assert they match in the build.

**Treat "it still works" as an unverified claim.** It is evidence that nothing has
demanded it change recently. That is not the same as being maintainable, and the
gap between them is invisible right up until someone needs to ship a fix.

## The economics

The upgrade in this case was two years of releases and took under a day, because
the platform's own scaffolding tool could generate a current baseline to align
against. Most of the work was mechanical: import paths that had graduated out of
alpha, a prop that no longer existed, two deprecated packages that turned out to
be unused.

Done annually it would have been a few hours each time. Deferred another two
years it would likely have become a rewrite, because the migration path would
have expired.

The cost of maintenance is not the hours. It is that those hours are unglamorous,
never urgent, and always losing to something with a deadline — right up to the
moment the system is simultaneously unbuildable, unpatchable, and load-bearing.
