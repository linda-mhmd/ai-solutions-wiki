---
title: "Feature Branching"
description: "What feature branching is, how it isolates development work, and the tradeoffs compared to trunk-based development."
date: 2026-03-28
categories: [Glossary]
tags: [feature-branching, git, branching, version-control, CI-CD]
related:
  - glossary/trunk-based-development
  - glossary/ci-cd
  - glossary/feature-flags
last_updated: 2026-05-30
---

Feature branching is a version control strategy where each new feature, bug fix, or task is developed on a separate branch created from the main branch. The feature branch is merged back into main via a pull request after development is complete, reviewed, and tested. This isolates in-progress work from the stable main branch.

## How It Works

A developer creates a branch (feature/add-document-upload), implements the feature with multiple commits, opens a pull request, receives code review, addresses feedback, and merges when approved. CI typically runs on both the feature branch (to catch issues early) and after merge (to verify integration).

Gitflow, GitHub Flow, and GitLab Flow are popular branching models built on feature branching with different conventions for release management.

## Advantages

**Isolation** - incomplete or experimental work does not affect the main branch. Other developers are not impacted by half-finished features.

**Code review** - pull requests provide a natural review point with clear diff, discussion, and approval workflow.

**Traceability** - each feature has a branch, a pull request, and a merge commit, providing a clear history of what changed and why.

## Tradeoffs

**Integration delay** - the longer a branch lives, the more it diverges from main. Merging a two-week-old branch often involves significant conflict resolution and re-testing.

**Reduced feedback** - changes are not tested against other developers' changes until merge time, potentially revealing integration issues late.

**Merge complexity** - multiple long-lived branches diverging simultaneously create exponentially complex merge scenarios.

## Practical Guidance

If using feature branches, keep them short-lived (1-3 days maximum). Merge frequently from main into the feature branch to reduce divergence. Run CI on feature branches to catch issues before the merge. Consider whether trunk-based development with feature flags would better serve your team's delivery speed, particularly for teams that are experiencing painful merges, slow release cycles, or integration failures.

Many successful teams use a hybrid: short-lived feature branches (hours to a couple of days) that function essentially as trunk-based development with code review gates.

## Sources

- Driessen, V. (2010). A successful Git branching model. *nvie.com*. (Original Gitflow model; feature branches, release branches, and hotfix branches, the most widely cited feature-branching strategy.)
- Fowler, M. (2020). Patterns for managing source code branches. *martinfowler.com*. (Comprehensive taxonomy of branching strategies; trade-offs between feature branching, trunk-based development, and hybrid models.)
- Forsgren, N., Humble, J., & Kim, G. (2018). *Accelerate: The Science of Lean Software and DevOps*. IT Revolution Press. (DORA research showing trunk-based development outperforms long-lived feature branches on delivery performance metrics.)
