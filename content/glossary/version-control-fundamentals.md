---
title: "Version Control Fundamentals"
description: "Core concepts of version control systems including branching, merging, and distributed workflows with Git."
date: 2026-03-28
categories: [Glossary]
tags: [version-control, Git, branching, merging, source-control, VCS]
related:
  - software-engineering/version-control-fundamentals
  - software-engineering/gitignore-patterns
  - glossary/ci-cd
  - foundations/ci-cd
last_updated: 2026-05-30
---

Version control (also called source control or revision control) is the practice of tracking and managing changes to files, particularly source code, over time. A version control system (VCS) records every modification, who made it, and when, enabling teams to collaborate on code, review changes, and recover previous states.

<figure class="bz-figure">
  <img src="/img/basics/diagram-version-control.png" alt="A diagram showing version control concepts: branches diverging and merging, commits as snapshots in time, and history as a navigable timeline." loading="lazy">
  <figcaption>Version control records every change as a snapshot. Branches let teams work in parallel. Merging brings the work back together. The complete history is always available.</figcaption>
</figure>

## Origins and History

Version control evolved through several generations. Early systems like SCCS (Source Code Control System, Marc Rochkind, Bell Labs, 1972) and RCS (Revision Control System, Walter Tichy, 1982) managed individual file histories on a single machine. Centralized VCS systems like CVS (Concurrent Versions System, 1990) and Subversion (SVN, 2000) added network access and concurrent multi-user editing with a single central repository. The distributed VCS revolution began with BitKeeper (used by the Linux kernel project from 2002-2005) and was cemented by Git, created by Linus Torvalds in April 2005 after the BitKeeper license was revoked. Torvalds designed Git to be fast, distributed, and capable of handling the Linux kernel's scale (tens of thousands of files, thousands of contributors). Mercurial, created by Matt Mackall around the same time, offered a similar distributed model. Git became the dominant VCS through GitHub's launch in 2008, which combined Git hosting with social coding features, and is now used by the vast majority of software projects worldwide.

## Core Concepts

A **repository** stores the complete history of a project. In Git, every clone is a full repository with complete history. A **commit** records a snapshot of all tracked files at a point in time, with a message describing the change. **Branching** creates a divergent line of development: developers create feature branches, work independently, and merge back when complete. **Merging** integrates changes from one branch into another, with Git automatically resolving non-conflicting changes and flagging conflicts for manual resolution. **Pull requests** (or merge requests) provide a review workflow before merging branches.

## Practical Applications

Version control is essential for team collaboration, code review, release management, auditing, and continuous integration. Git branching strategies (Gitflow, trunk-based development, GitHub Flow) define how teams organize concurrent work. Git's distributed nature enables offline work, fast operations, and flexible backup.

## Sources

1. Torvalds, L. (2005). "Git: A Distributed Version Control System." [https://git-scm.com](https://git-scm.com)
2. Chacon, S. and Straub, B. (2014). *Pro Git*, 2nd ed. Apress. [https://git-scm.com/book/en/v2](https://git-scm.com/book/en/v2)
3. Rochkind, M.J. (1975). "The Source Code Control System." *IEEE Transactions on Software Engineering*, SE-1(4), 364-370.
