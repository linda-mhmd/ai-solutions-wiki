---
title: "Version Control Fundamentals and Git"
date: 2026-03-31
draft: false
tags: ["software-engineering", "intermediate", "git", "version-control", "devops", "methodology"]
categories: ["Software Engineering"]
related:
  - software-engineering/gitignore-patterns
  - software-engineering/agile-manifesto
last_updated: 2026-05-30
---

Version control is the practice of tracking and managing changes to files over time. In software development, it means that every modification to source code is recorded with a timestamp, an author, and a description of intent. This record forms a complete, queryable history of a project: what changed, when, who changed it, and why. Version control is so foundational to modern software practice that the question is no longer whether to use it but which system to use and how to use it well.

## Historical Context: From Manual Archives to Distributed Systems

Before version control tools existed, programmers managed change by copying directories. A project might live in folders named `project_v1`, `project_v1_backup`, `project_final`, `project_final2`, and `project_FINAL_USE_THIS`. This approach fails at scale: it wastes disk space, provides no structured way to compare versions, and collapses entirely when multiple people work on the same files simultaneously.

**RCS: The Revision Control System (1982)**

Walter Tichy at Purdue University released RCS in 1982. RCS stored the full content of a file's initial version and then stored each subsequent change as a delta, the minimal set of additions and removals needed to transform one version into the next. This reduced storage costs substantially. However, RCS was a single-file tool. It had no concept of a project spanning many files, and it offered no support for concurrent access by multiple developers.

**CVS: The Concurrent Versions System (1986)**

CVS extended RCS to manage entire directory trees and introduced the concept of a central server holding the authoritative repository. Developers would check out a working copy, make changes, and commit those changes back to the server. CVS supported branching and merging, though its merge algorithm was limited and frequently produced conflicts on file renames or directory moves. Because CVS treated directories as first-class objects but could not atomically commit changes across multiple files, a commit operation could leave the repository in an inconsistent state if interrupted.

**Subversion: Atomic Commits and True Renames (2000)**

CollabNet's Subversion (SVN) was designed to be a better CVS. Its central contribution was the atomic commit: all file changes in a commit either succeed together or fail together, leaving the repository in a consistent state. SVN also handled file and directory renames correctly, something CVS fundamentally could not do. SVN continued the centralised model: there was one server, and developers had working copies of whichever branch or directory they checked out. Working offline was severely limited. Branching was inexpensive in SVN (it used copy-on-write semantics) but merging remained difficult because SVN did not record merge history until version 1.5, released in 2008.

**Distributed Version Control: A Conceptual Shift**

The centralised model has a single point of failure and a single point of authority. Every operation that required communication with the server (commit, update, branch, log history) required network access. For teams working across geographies or in environments with unreliable connectivity, this was a practical burden. It also concentrated power: the server administrator controlled access to the full history.

BitKeeper was a commercial distributed version control system (DVCS) that the Linux kernel team used from 2002 onwards. In a DVCS, every developer holds a complete copy of the repository, including the full history. Commits are made locally. Synchronisation between repositories is an explicit operation. There is no inherent single authoritative server, though teams typically designate one.

## Linus Torvalds and the Creation of Git (2005)

In April 2005, BitKeeper withdrew free-of-charge access for open-source projects following a dispute over reverse-engineering attempts. The Linux kernel, one of the largest collaborative software projects in the world, lost its version control system with essentially no notice.

Linus Torvalds, the creator of Linux, evaluated existing alternatives and found none satisfactory for the kernel's requirements. He described those requirements publicly on the linux-kernel mailing list: the system must be fast (patching the kernel required applying many thousands of patches in a reasonable time), it must support distributed workflows (the kernel had hundreds of active contributors across the globe), and it must have strong guarantees of data integrity (silent corruption is worse than detectable corruption). Torvalds began writing Git on 3 April 2005. By 29 April, Git was self-hosting, meaning it was managing its own source code. By June 2005, the Linux kernel 2.6.12 release was managed with Git.

The name "Git" is a British slang term meaning an unpleasant or stupid person. Torvalds has said, with characteristic directness, that he names all his projects after himself: Linux and Git both apply.

## The Internal Model: Directed Acyclic Graphs

Understanding Git's internals is not strictly required to use it, but it resolves many apparent mysteries about Git's behaviour and makes advanced operations intuitive rather than magical.

Git's fundamental storage unit is the object. There are four object types:

**Blob objects** store the raw contents of a file. A blob contains no filename and no metadata, only bytes. Two files with identical contents, regardless of their names or locations, are stored as a single blob.

**Tree objects** represent a directory. A tree records a list of entries, where each entry is a filename, a permission mode, and a pointer (a SHA-1 or SHA-256 hash) to either a blob or another tree. Trees point to blobs and other trees but never directly to commits.

**Commit objects** represent a snapshot of the entire project at a moment in time. A commit records: a pointer to the root tree (the root directory of the project), a list of pointers to parent commits (zero for the initial commit, one for a normal commit, two or more for a merge commit), the author's name, email address, and timestamp, the committer's name, email address, and timestamp, and the commit message. The commit object is hashed using SHA-1 (or SHA-256 in newer Git versions), producing the commit's identifier.

**Tag objects** are annotated tags that point to any other object (usually a commit) and include the tagger's identity, a date, and a message.

The commit history forms a directed acyclic graph. Each commit points to its parents (the direction), but no sequence of parent pointers can return to a starting commit (acyclic). This graph structure is what makes Git's branching and merging model work: a branch is simply a named pointer to a commit, and the full history reachable from that commit by following parent pointers constitutes the branch's history.

Because each commit's hash is computed over its contents, its parent hashes, and its metadata, any alteration to any commit in history changes its hash, which changes the hash of all descendant commits. The SHA-1 hash chain is therefore a cryptographic guarantee: a repository with a given commit hash contains exactly the history that hash represents.

## Core Concepts

**Repository**

A Git repository is a directory containing a `.git` subdirectory. The `.git` directory holds the object database, the reference database (branches and tags), configuration, and other operational data. Everything outside `.git` is the working tree: the files you read and edit. The repository contains the complete history; the working tree contains one snapshot checked out for editing.

**Commits**

A commit is an immutable snapshot of the project. It does not store diffs; it stores pointers to the full set of tree and blob objects representing the project at that moment. Git computes diffs on demand by comparing the trees of two commits. Because blobs are deduplicated by content hash, storing a new snapshot is efficient: only changed files produce new blob objects; unchanged files are referenced by the same blob object as before.

**Branches**

A branch is a mutable pointer to a commit. The default branch is conventionally called `main` (historically `master`). When you commit on a branch, Git creates the new commit with the current commit as its parent, then moves the branch pointer forward to the new commit. Branches are cheap: a branch is a file in `.git/refs/heads/` containing a 40-character hash. Creating or deleting a branch requires no copying of objects.

The special pointer `HEAD` records which branch (or commit) is currently checked out. When `HEAD` points to a branch name, Git is in "attached HEAD" state and new commits advance the branch. When `HEAD` points directly to a commit hash (not via a branch), Git is in "detached HEAD" state and new commits are not reachable from any branch unless explicitly tagged or branched.

**Staging Area (Index)**

Between the working tree and the repository sits the staging area, also called the index. The index records which changes are prepared for the next commit. `git add` copies the current state of a file into the index. `git commit` creates a commit from the index's content. This three-way distinction (working tree, index, repository) allows selective commits: you can modify ten files but commit only three, staging precisely the changes that belong together.

**Remotes**

A remote is a named reference to another repository. The conventional name for the primary remote is `origin`. `git fetch` downloads objects and updates remote-tracking branches (such as `origin/main`) without modifying local branches. `git pull` fetches and then merges (or rebases) the remote-tracking branch into the current branch. `git push` uploads local commits to the remote. Because every repository holds the full history, "remote" and "local" are symmetric: any repository can push to or fetch from any other.

**Merging**

A merge commit has two or more parents. Git's three-way merge algorithm finds the common ancestor of the two commits being merged, computes the diff from the ancestor to each commit, and applies both sets of changes to the ancestor. Where both sides changed the same region of a file differently, Git records a conflict and defers resolution to the developer. Fast-forward merges, which occur when the current branch has not diverged from the incoming branch, simply move the branch pointer forward without creating a merge commit.

**Rebasing**

Rebase replays commits from one branch on top of another. Instead of creating a merge commit, rebase rewrites each commit in the sequence with a new parent, producing a linear history. The trade-off is that rebasing rewrites commit hashes, which is safe on private branches but disruptive on shared branches because others' repositories still reference the old hashes.

## Branching Strategies

Branching strategy describes the conventions a team adopts for creating, naming, and merging branches. No single strategy is universally correct; the right choice depends on team size, release cadence, and deployment model.

**Trunk-Based Development**

In trunk-based development, all developers commit frequently (at least daily) to a single shared branch, called the trunk or main. Feature branches, if used at all, are short-lived: measured in hours or a small number of days, not weeks. The strategy relies heavily on feature flags to hide incomplete features from users without hiding the code from the branch. Trunk-based development minimises merge conflicts because integration happens continuously rather than in large batches. It requires discipline: every commit to trunk must leave the codebase in a deployable state.

**GitFlow**

Introduced by Vincent Driessen in 2010, GitFlow defines a specific set of branch types. A `main` branch always reflects production-ready code. A `develop` branch integrates completed features. Feature branches branch from `develop` and merge back to `develop`. Release branches branch from `develop`, receive only bug fixes, and merge to both `main` and `develop`. Hotfix branches branch from `main` for emergency production fixes and merge to both `main` and `develop`. GitFlow suits projects with explicit release cycles and a need to maintain multiple versions simultaneously, such as software libraries. It has been criticised for being unnecessarily complex for projects that deploy continuously.

**GitHub Flow**

GitHub Flow, described by Scott Chacon in 2011, is simpler than GitFlow. There is one long-lived branch: `main`. Any new work is done on a descriptively named branch created from `main`. When the work is ready, a pull request is opened against `main`. After review and passing automated checks, the branch is merged and deleted. `main` is deployed immediately or on a short cycle. GitHub Flow assumes continuous deployment or near-continuous deployment and fits teams that ship frequently to a single production environment.

## Why .gitignore Matters

Not every file in a working tree should be committed to the repository. The `.gitignore` file tells Git which files and directories to treat as untracked and to exclude from `git add` and `git status` output.

**Build Artifacts**

Compilers, bundlers, and build tools produce output files: `.class` files from the Java compiler, `*.pyc` bytecode from the CPython interpreter, compiled binaries, minified JavaScript bundles, static site output. These files are derived from source: given the source and the right tools, they can be reproduced exactly. Committing them wastes storage, clutters diffs with noise, and causes merge conflicts when two developers build on different platforms or with different tool versions and produce binary output with different internal layouts.

**Operating System Files**

macOS creates `.DS_Store` files in every directory it traverses via Finder. Windows creates `Thumbs.db`. These files carry no project-relevant information. Committing them is at best harmless noise and at worst a source of spurious conflicts across operating systems.

**Editor and IDE Configuration**

Editors store their workspace state in directories like `.idea/` (JetBrains IDEs), `.vscode/` (Visual Studio Code), or `.project` and `.classpath` (Eclipse). Some of this configuration is personal and should not be imposed on collaborators using different tools. An exception applies when the team agrees to standardise on a particular editor: shared launch configurations or shared formatter settings may be appropriate to commit.

**Dependency Directories**

Package managers install dependencies into directories: `node_modules/` for npm, `.venv/` for Python's venv. These directories can contain tens of thousands of files and hundreds of megabytes. They should be reproducible from the lockfile (`package-lock.json`, `requirements.txt`, `Pipfile.lock`). Committing them bloats the repository and creates unmanageable diffs when dependency versions change.

**Secrets and Credentials**

Environment variable files (`.env`), private keys, service account credentials, and API tokens must never be committed. Once a secret appears in a Git commit, it is in the history permanently unless the history is rewritten, a destructive and disruptive operation. If the repository is ever made public or the remote service is compromised, the secret is exposed. The `git log` command makes it trivial to recover deleted files from history. Secrets belong in dedicated secrets management systems (HashiCorp Vault, AWS Secrets Manager, environment variable injection at runtime) and are referenced by name in configuration, not stored in files that could accidentally be committed.

See [.gitignore Patterns](/software-engineering/gitignore-patterns) for a detailed treatment of gitignore syntax and common patterns by project type.

## Best Practices

**Atomic Commits**

An atomic commit contains exactly one logical change: a bug fix, a refactor of a single function, the addition of a feature flag. It does not mix unrelated changes. Atomic commits make the history readable as a narrative of decisions, make `git bisect` effective for locating regressions, and make `git revert` safe when a change must be undone without disturbing surrounding work.

**Meaningful Commit Messages**

The convention established by Tim Pope and popularised by the Linux kernel community: the first line of a commit message is a subject of no more than 72 characters, written in the imperative mood ("Add rate limiting to the API endpoint"), followed by a blank line, followed by a body that explains the motivation for the change and any non-obvious implementation decisions. The diff shows what changed. The commit message should explain why.

**Never Commit Secrets**

This bears repetition. No credential, API key, private key, password, or token belongs in version-controlled source code. The damage from an accidental credential commit is not limited to the moment of discovery: the credential exists in history until that history is surgically rewritten. Tools such as `git-secrets`, `truffleHog`, and `detect-secrets` can be configured as pre-commit hooks to prevent accidental secret commits.

**Use Pull Requests for Review**

Even on small teams, opening a pull request before merging to the main branch creates a structured opportunity for review. CI checks run against the proposed change before it lands. Comments are recorded and searchable. The merged pull request provides a link between the code change and its discussion context. On distributed teams, asynchronous code review via pull requests is often the primary mechanism for knowledge transfer and quality assurance.

## Sources

- Torvalds, L. (2005). "git - the stupid content tracker." Initial Git announcement on the git mailing list, 7 April 2005.
- Chacon, S., and Straub, B. (2014). *Pro Git*, 2nd edition. Apress. Available freely at git-scm.com/book.
- Loeliger, J., and McCullough, M. (2012). *Version Control with Git*, 2nd edition. O'Reilly Media.
- Tichy, W.F. (1985). "RCS - A System for Version Control." *Software: Practice and Experience*, 15(7), 637-654.
- Driessen, V. (2010). "A successful Git branching model." nvie.com.
- Chacon, S. (2011). "GitHub Flow." scottchacon.com.
- Spinellis, D. (2005). "Version Control Systems." *IEEE Software*, 22(5), 108-109.
