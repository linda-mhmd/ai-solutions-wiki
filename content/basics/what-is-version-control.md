---
title: "What is Version Control?"
description: "Version control is a system that tracks every change ever made to a file. It is the reason developers can work in teams without overwriting each other's work."
date: 2026-05-24
level: 2
categories: [Basics]
tags: [beginner, version-control, git, collaboration]
youtube_id: "Yc8sCSeMhi4"
youtube_title: "Git Tutorial for Beginners, Git & GitHub Fundamentals In Depth"
youtube_channel: "TechWorld with Nana"
docs: "https://git-scm.com/book/en/v2/Getting-Started-About-Version-Control"
docs_label: "About Version Control, Pro Git Book"
faqs:
  - question: "Do I need version control for a personal project?"
    answer: "Yes. Even solo, version control gives you a complete undo history, the ability to experiment without fear, and a backup if your computer fails. The question is not whether to use it, it is when to start (the answer is from day one). Most AI coding tools like Claude Code and Cursor also work much better with Git set up, since they can read your project history to understand context."
  - question: "What is a merge conflict and how do I fix it?"
    answer: "A merge conflict happens when two people changed the same part of the same file in ways that cannot be automatically combined. Git marks the conflicting section in the file showing both versions. You edit the file to keep what you want (and remove the conflict markers), then commit the result. Most modern code editors show a visual diff and let you choose with a click. Conflicts sound scary but resolving a simple one takes under a minute."
  - question: "Is version control only for code?"
    answer: "No. The principle, track changes, enable collaboration, allow rollback, applies anywhere. Figma has version history for design files. Google Docs tracks edits and lets you restore previous versions. Data teams use DVC (Data Version Control) for datasets. Writers use Git for manuscripts. Governments use it for legislation. The software world just formalised the practice because the consequences of errors are severe."
---

{{< quickanswer >}}
Version control is a system that records every change made to a set of files over time. You can go back to any previous version, see exactly what changed and who changed it, and work with other people on the same files without creating chaos.
{{< /quickanswer >}}

<figure class="bz-figure">
  <img src="/img/dark-cherry/vortex-complexity.png" alt="A dark spiraling vortex with a deep red core: complexity that would pull you under without a system to navigate it." loading="lazy">
  <figcaption>Without version control, software projects become this. Every change is a risk. Every mistake is permanent. Version control gives you a map of the spiral and the ability to climb back out.</figcaption>
</figure>

## The problem it solves

You have done this. Everyone has done this:

```
proposal_v1.docx
proposal_v2.docx
proposal_FINAL.docx
proposal_FINAL_really.docx
proposal_FINAL_v2_USE_THIS_ONE.docx
```

This is a terrible version control system. You cannot easily see what changed between versions. You cannot collaborate without emailing files back and forth and manually merging edits. When something breaks, finding the version where it last worked requires opening every file.

For a document, this is painful. For code with thousands of files that hundreds of people edit simultaneously, it would be catastrophic. Version control is the solution.

## What version control actually does

A version control system (VCS) keeps a complete history of every change made to a set of files. Every time you save a snapshot, called a **commit**, the system records:

- **What changed**, exactly which lines were added, removed, or modified
- **When** it happened, timestamp down to the second
- **Who** made the change, the author's identity
- **Why**, a message you write explaining the reason for the change

You can:
- Go back to any previous commit instantly
- Compare any two versions to see exactly what changed
- Find the exact commit that introduced a bug
- Restore accidentally deleted files
- See the complete history of how the project evolved from its first line

## Branching: working without fear

The most powerful idea in version control is **branching**. A branch is a separate copy of the codebase where you can make changes without affecting the main version.

Think of it as a parallel universe. You create a branch, build your feature, and if it works, you merge it back. If it does not work, you delete the branch and nothing was harmed. The main codebase is untouched throughout.

This is why developers can:
- Build risky features without breaking what is already working
- Run experiments that may be discarded
- Have multiple people working on different features simultaneously without conflict

The main branch (usually called `main`) is the version of truth, the code that is tested, reviewed, and deployed.

## Working with other people

Version control makes team collaboration possible. Instead of emailing files:

1. Everyone has a copy of the project locally (a **clone**)
2. Each person makes changes in their own **branch**
3. When ready, they open a **pull request** to propose merging their branch
4. Others review the changes, suggest improvements, and approve
5. The branch is **merged** into main
6. Everyone pulls the updated main to get the latest changes

If two people changed the same line of the same file in different ways, the system flags a **merge conflict** and asks a human to resolve it. This is far better than the alternative: one person's work silently overwriting another's.

## A brief history: from chaos to Git

Before modern version control, teams used methods that ranged from "email the file" to early systems like **RCS** (1982) and **CVS** (1986) that tracked changes but poorly handled simultaneous editing.

**Subversion (SVN)**, released in 2000, became the dominant system for most of the 2000s. It used a centralised model: one server held the history and everyone committed to it. If the server went down, nobody could commit.

**Git**, created by Linus Torvalds in 2005 for the Linux kernel, changed the model to **distributed**: every developer has the full history of the project. There is no single point of failure. Everyone can commit locally, even offline. [More: Git, Wikipedia](https://en.wikipedia.org/wiki/Git)

Git won. By the mid-2010s it had become the near-universal standard. If you learn one version control tool, learn Git.

## Version control beyond code

The same principles apply beyond software:

- **Design files**: Figma has built-in version history. Teams version Figma files like code.
- **Data**: [DVC (Data Version Control)](https://dvc.org/) tracks datasets and ML model versions alongside code. Reproducible research requires this.
- **Documents**: Google Docs, Notion, and Confluence all offer revision history.
- **Infrastructure**: "Infrastructure as code" means server configurations are version-controlled too. [Terraform](https://www.terraform.io/) configurations live in Git like any other code.

Anywhere there are files that change over time and multiple people working on them, version control applies.

## Further reading

- [Pro Git (free online book)](https://git-scm.com/book/en/v2), the definitive reference for Git, free, thorough, and well-written
- [About version control, Git documentation](https://git-scm.com/book/en/v2/Getting-Started-About-Version-Control)
- [What is version control?, Atlassian](https://www.atlassian.com/git/tutorials/what-is-version-control), practical tutorial with good diagrams
- [DVC: Data Version Control](https://dvc.org/), version control for ML datasets and models
- [GitHub Skills](https://skills.github.com/), interactive courses for learning Git and GitHub

## What's next

Next: [What is Git?](/basics/what-is-git/), the specific tool that powers version control for almost every software project on earth.
