---
title: "What is Git?"
description: "Git is the version control tool used by almost every software team on earth. Here is what it does and why it matters for anyone building software."
date: 2026-05-24
level: 2
categories: [Basics]
tags: [beginner, git, version-control, commits, branches]
youtube_id: "8JJ101D3knE"
youtube_title: "Git Tutorial for Beginners: Learn Git in 1 Hour"
youtube_channel: "Programming with Mosh"
docs: "https://git-scm.com/book/en/v2"
docs_label: "Pro Git, free official book"
faqs:
  - question: "What should I write in a commit message?"
    answer: "Write what changed and why, not what you did. Bad: 'Updated file'. Good: 'Fix login redirect after password reset'. Use the imperative: 'Add', 'Fix', 'Remove', 'Update'. First line should be under 72 characters, it shows in logs. If more explanation is needed, add a blank line and a longer description below. The test: can someone reading this in 6 months understand what changed and why without opening the diff?"
  - question: "What is .gitignore?"
    answer: ".gitignore is a file in your project that tells Git which files and folders to ignore, never track, never commit. You add things like node_modules/ (hundreds of megabytes of packages), .env (your secret API keys), and system files like .DS_Store. Without .gitignore, Git would try to track everything including secrets and gigantic auto-generated files. GitHub provides standard .gitignore templates for every language and framework."
  - question: "What is the difference between git clone and git init?"
    answer: "git init creates a new Git repository in an existing folder. You use it when starting a project from scratch. git clone copies an existing repository from a URL (usually GitHub) to your local machine. It downloads the complete history. You use clone when joining an existing project or when you created a repo on GitHub first and now want to work on it locally."
last_updated: 2026-05-30
---

{{< quickanswer >}}
Git is a free, open-source tool that runs on your computer and tracks every change you make to your project files. It is the industry-standard version control system. Almost every software team, open-source project, and AI coding tool assumes you are using Git.
{{< /quickanswer >}}

Git was created by Linus Torvalds in 2005 to manage development of the Linux kernel after the previous version control tool lost its free license. It was designed for speed, distributed workflows, and handling large codebases. Today it is used by virtually every software project regardless of size.

<figure class="bz-figure">
  <img src="/img/wardrobe/polaroid-wall-git-commits.png" alt="A cork board covered in Polaroid photographs of outfits arranged chronologically, each pinned with a deep red pin: commits pinned to the wall of project history." loading="lazy">
  <figcaption>Every Git commit is a Polaroid pinned to the wall. Each snapshot has a timestamp, a label, and a fixed state. You can navigate the wall in any direction: forward, backward, or sideways onto a different branch.</figcaption>
</figure>

## Git lives on your computer

Unlike most tools you use, Git does not run in the browser. It runs locally on your machine. When you use Git, you are working with a database of changes stored in a hidden folder called `.git` inside your project.

This means:
- Git works **offline**, you can commit, view history, and switch branches without internet
- Every developer has the **complete project history** on their machine
- There is no single server that, if it fails, blocks everyone's work

When you push to GitHub, you are syncing your local history to a remote copy. The history itself lives with you.

## The key concepts

### Repository (repo)
A repository is a project folder that Git is tracking. When you run `git init` inside a folder, Git creates the `.git` database and starts recording changes. When you `git clone` a repository, you get a full copy including the entire history.

### Commit
A commit is a saved snapshot of your project at a specific point in time. Think of commits as photographs of the codebase, taken whenever you decide. Each commit has:
- A unique **SHA hash** (like `a3f5c2d8e4`) that identifies it permanently
- A **timestamp**
- The **author's name and email**
- A **message** describing what changed and why
- A pointer to the **previous commit** (creating the history chain)

Commits are permanent. You cannot quietly edit history without leaving a trace. This is what makes Git a reliable audit trail.

### The staging area (index)
Git has an intermediate step between changing files and committing them: the **staging area** (also called the index). You choose which changes to include in the next commit using `git add`.

Why? Because you might change three files but only want to commit two. Or you want to commit parts of a file but not all of it. The staging area gives you precise control over what goes into each commit.

<div class="bz-diagram">
<div class="bz-diagram-label">Git's three-zone model</div>
<div class="bz-diagram-body">
<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Zone 1</span>
    <span class="bz-flow-step-name">Working directory</span>
    <span class="bz-flow-step-desc">Files you can see and edit. Changes are untracked until you explicitly add them.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">git add</span>
    <span class="bz-flow-step-name">Staging area</span>
    <span class="bz-flow-step-desc">A holding area. Only staged changes go into the next commit, giving you precise control.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">git commit</span>
    <span class="bz-flow-step-name">Local history</span>
    <span class="bz-flow-step-desc">A permanent, immutable snapshot with a SHA hash, timestamp, and author. Survives offline.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">git push</span>
    <span class="bz-flow-step-name">Remote (GitHub)</span>
    <span class="bz-flow-step-desc">Your commits synced to a shared server. Teammates can pull from here.</span>
  </div>
</div>
</div>
</div>

### Branch
A branch is a separate line of development. The default branch is called `main`. When you create a branch, you are saying "let me work on this in isolation without touching main." When done, you merge the branch back.

Teams typically have:
- `main`, production-ready code, always stable
- `dev` or `develop`, integration branch for features before they go to main
- `feature/user-authentication`, a specific feature in progress
- `fix/login-bug`, a specific bug fix

<figure class="bz-figure">
<img src="/img/wardrobe/racks-git-branches.png" alt="Two dark clothing racks side by side in an atelier: parallel tracks of work in progress, each isolated until the merge point." loading="lazy">
<figcaption>Branches are parallel tracks. Each rack holds its own work in progress. Nothing merges into main until it is ready and reviewed.</figcaption>
</figure>

### Merge and rebase
**Merging** combines changes from one branch into another. Git creates a "merge commit" that has two parents, preserving the full branch history.

**Rebasing** replays commits from one branch on top of another, producing a cleaner linear history. The trade-off: rebasing rewrites history, which can be confusing if others are using the branch.

For beginners, use merge. Learn rebase later.

## The everyday workflow

Most Git usage is four commands:

```bash
git add .                          # stage all changed files
git commit -m "Add user login page"  # save a snapshot with a message
git push                           # send commits to GitHub
git pull                           # download latest commits from GitHub
```

And a few more you will use constantly:

```bash
git status          # what has changed since last commit?
git log             # show the history of commits
git log --oneline   # compact view of history
git diff            # show exact line-by-line changes
git branch          # list branches
git switch -c feature/new-thing   # create and switch to a new branch
git switch main     # switch back to main
git merge feature/new-thing       # merge a branch into current branch
```

## What to put in a .gitignore file

When you start a project, create a `.gitignore` file immediately. At minimum:

```
# Dependencies, never commit these, install from package.json/requirements.txt
node_modules/
.venv/
__pycache__/

# Secrets, NEVER commit these
.env
.env.local
*.key

# System files
.DS_Store    # macOS desktop metadata
Thumbs.db    # Windows thumbnail cache

# Build output, generated files, not source
dist/
build/
.next/
```

[GitHub's collection of .gitignore templates](https://github.com/github/gitignore) covers every language and framework. Use the right one for your stack.

## Why you need Git even if you are solo

Even without collaborators, Git gives you:

- **Complete undo history**, every commit is a restore point. The command `git revert` undoes any commit non-destructively. `git stash` saves work-in-progress changes temporarily.
- **Safe experimentation**, create a branch, try something risky, abandon it if it does not work. Main stays clean.
- **Collaboration readiness**, when you want help from a developer or AI coding tool, they can read your history to understand what has already been tried.
- **Backup**, push to GitHub and your code is safe even if your laptop dies.

## What Git is not

Git is not GitHub. Git is the tool. GitHub is a website that hosts Git repositories online. You can use Git locally with no internet, with no GitHub account, with no remote at all. GitHub just adds sharing, collaboration, and a web interface on top.

There are also alternatives to GitHub: [GitLab](https://gitlab.com/) (popular for self-hosting and CI/CD) and [Bitbucket](https://bitbucket.org/) (common in enterprise Jira-heavy teams).

<figure class="bz-figure">
<img src="/img/dark-cherry/gears-mechanism.png" alt="Dark industrial gears interlocked under red light: local and remote mechanisms synchronised, each change driving the state of the other." loading="lazy">
<figcaption>Git runs locally. GitHub is the shared remote. Push and pull keep every machine in sync. The gears only move together when developers communicate through the same remote.</figcaption>
</figure>

## Further reading

- [Pro Git, free official book](https://git-scm.com/book/en/v2), the complete reference, well-written, covers everything from basics to internals
- [Learn Git Branching, interactive visual tool](https://learngitbranching.js.org/), the best way to understand branches and merges visually
- [Oh Shit, Git!](https://ohshitgit.com/), plain-language recipes for common Git disasters ("I committed to main when I meant to commit to a branch")
- [Git Immersion](https://gitimmersion.com/), guided walkthrough of Git fundamentals
- [.gitignore templates, GitHub](https://github.com/github/gitignore), official templates for every language

## What's next

Next: [What is GitHub?](/basics/what-is-github/), the platform that hosts Git repositories and where most of the world's open-source code lives.
