---
title: "Trunk-Based Development"
description: "What trunk-based development is, how it differs from long-lived branches, and why it accelerates delivery."
date: 2026-03-28
categories: [Glossary]
tags: [trunk-based-development, branching, CI-CD, DevOps, version-control]
related:
  - glossary/feature-branching
  - glossary/ci-cd
  - glossary/feature-flags
last_updated: 2026-05-30
---

Trunk-based development is a source control strategy where developers integrate their changes into a single shared branch (trunk or main) frequently - at least once per day. Long-lived feature branches are avoided. Instead, developers work in small increments, committing directly to trunk or through very short-lived branches (hours, not days or weeks).

## How It Works

Developers pull from trunk, make a small, focused change, run tests locally, and push to trunk (or open a short-lived pull request that is merged within hours). CI runs on every commit to trunk, providing immediate feedback. If a test fails, it is fixed immediately because the change that broke it is small and recent.

Incomplete features are hidden behind feature flags rather than isolated on branches. This allows code to be integrated and tested continuously even when the feature is not yet ready for users.

## Why It Matters

Trunk-based development enables continuous integration and continuous delivery. When developers integrate frequently, merge conflicts are small and easy to resolve. The trunk is always in a releasable state because every commit passes CI. Releases become low-risk, routine events rather than high-stress merge marathons.

Research from the DORA (DevOps Research and Assessment) team consistently shows that trunk-based development correlates with higher software delivery performance: more frequent deployments, shorter lead times, lower change failure rates, and faster recovery from incidents.

## Trunk-Based vs. Feature Branching

Feature branches isolate work but delay integration. The longer a branch lives, the harder the merge. Trunk-based development prioritizes integration speed over isolation. The tradeoff is that incomplete code reaches trunk (managed by feature flags) and CI must be fast and reliable.

## Practical Guidance

Start with the discipline of small, incremental commits. Each commit should be a complete, working change. Use feature flags (LaunchDarkly, AWS AppConfig) to hide incomplete features. Invest in fast, reliable CI - if CI takes 30 minutes, developers will not integrate frequently. Code review through short-lived pull requests (merged within hours) is compatible with trunk-based development; week-long review cycles are not.

## Sources

- Forsgren, N., Humble, J., & Kim, G. (2018). *Accelerate: The Science of Lean Software and DevOps*. IT Revolution Press. (DORA research; empirically demonstrated trunk-based development as a key predictor of software delivery performance.)
- Hammant, P. (2014). *Trunk Based Development*. trunkbaseddevelopment.com. (Comprehensive reference for trunk-based development practices, branching models, and feature flags integration.)
- Fowler, M., & Foemmel, M. (2006). Continuous integration. *ThoughtWorks*. (Continuous integration requires frequent mainline integration; the foundational argument for trunk-based development.)
