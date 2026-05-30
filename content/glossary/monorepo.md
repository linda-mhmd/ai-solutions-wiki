---
title: "Monorepo"
description: "What a monorepo is, how Google's approach was documented in the landmark 2016 ACM paper, and how modern tools like Nx and Turborepo make monorepos practical."
date: 2026-03-28
categories: [Glossary]
tags: [monorepo, version-control, Nx, Turborepo, workspace, build-systems]
related:
  - glossary/trunk-based-development
  - glossary/ci-cd
  - glossary/semantic-versioning
last_updated: 2026-05-30
---

A monorepo (monolithic repository) is a version control strategy where multiple projects, libraries, and services are stored in a single repository. Rather than maintaining separate repositories for each package or service, all code lives together, sharing a unified version history, dependency graph, and build infrastructure.

## Origins and History

The monorepo approach predates the term itself. Google has used a single repository for virtually all of its code since the company's founding, and the practice was formally documented in the landmark paper "Why Google Stores Billions of Lines of Code in a Single Repository" by Rachel Potvin and Josh Levenberg, published in *Communications of the ACM*, Volume 59, Issue 7 (July 2016). The paper reported data as of January 2015.

The scale described was extraordinary: approximately one billion files, 35 million commits spanning Google's eighteen-year history, 86 terabytes of data, two billion lines of code across nine million unique source files, and over 25,000 developers committing roughly 16,000 changes per workday (plus 24,000 automated commits). The repository served billions of file read requests daily, peaking at approximately 800,000 queries per second.

Google used a custom-built version control system called Piper (having migrated from CVS to Perforce and then to Piper) and practiced trunk-based development at scale. Engineers committed to the main branch with mandatory code review, eliminating merge conflicts from long-lived branches. Ninety-five percent of Google's source code lived in the monorepo, with Chrome and Android being notable exceptions on separate repositories.

Other major technology companies adopted similar approaches: Facebook (now Meta) uses a large Mercurial monorepo, Microsoft migrated the Windows codebase to a Git monorepo using their custom VFS for Git (now Scalar), and Twitter used a Pants-managed monorepo.

## Advantages

**Atomic changes** -- A single commit can modify a library and all of its consumers simultaneously. When a shared API changes, the library update and all call-site updates land together, eliminating version coordination across repositories.

**Unified dependency graph** -- All internal dependencies are resolved from source rather than from published packages. This eliminates "dependency hell" -- the situation where service A requires library v2 but service B is stuck on library v1 with an incompatible change.

**Code visibility** -- Any engineer can search, read, and learn from any code in the organization. Cross-team code reuse is discovered through search rather than through documentation or word of mouth.

**Consistent tooling** -- Linting rules, test frameworks, build configurations, and CI pipelines are defined once and applied uniformly across all projects.

## Challenges

**Build performance** -- As the repository grows, naive build systems that rebuild everything become unusable. Monorepos require build tools that understand the dependency graph and only rebuild what changed.

**CI/CD complexity** -- A commit to a shared library may trigger tests across dozens of dependent projects. Without intelligent change detection, CI pipelines run unnecessary work.

**Repository size** -- Git was not designed for repositories at the scale Google operates. Large monorepos can strain Git's performance for clone, fetch, and status operations.

## Modern Monorepo Tools

**Nx** (by Nrwl, now Nx) provides dependency graph analysis, computation caching (local and remote), and affected-project detection for JavaScript/TypeScript monorepos. It supports React, Angular, Node.js, and other frameworks with code generators and migration tooling.

**Turborepo** (acquired by Vercel in 2021) focuses on build caching and task orchestration. It computes content hashes for each package, skips tasks whose inputs have not changed, and supports remote caching for sharing build artifacts across CI and developer machines.

**pnpm workspaces**, **npm workspaces**, and **Yarn workspaces** provide package-level dependency management within a monorepo, allowing each package to declare its own dependencies while hoisting shared dependencies for efficiency.

**Bazel** (open-sourced by Google in 2015) and **Pants** bring Google-scale build system capabilities to the open-source community, with content-addressable caching and remote execution.

## Sources

1. Potvin, R. and Levenberg, J. "Why Google Stores Billions of Lines of Code in a Single Repository." *Communications of the ACM*, 59(7), pp. 78-87. July 2016. [https://dl.acm.org/doi/10.1145/2854146](https://dl.acm.org/doi/10.1145/2854146)
2. Google Research. "Why Google Stores Billions of Lines of Code in a Single Repository." [https://research.google/pubs/pub45424/](https://research.google/pubs/pub45424/)
3. Nx Documentation. [https://nx.dev](https://nx.dev)
4. Turborepo Documentation. [https://turbo.build/repo](https://turbo.build/repo)
