---
title: "What is GitHub?"
description: "GitHub is where the world's code lives. It hosts Git repositories, enables collaboration, and is where you manage your project's issues, roadmap, and releases."
date: 2026-05-24
level: 2
categories: [Basics]
tags: [beginner, github, collaboration, open-source, pull-request]
youtube_id: "nhNq2kIvi9s"
youtube_title: "GitHub Tutorial for Beginners"
youtube_channel: "GitHub"
docs: "https://docs.github.com/en/get-started"
docs_label: "GitHub Getting Started Docs"
faqs:
  - question: "Is GitHub free?"
    answer: "Yes for most uses. Free accounts get unlimited public and private repositories, GitHub Actions minutes (2,000/month), GitHub Pages hosting, and Codespaces access. Paid plans (Team, Enterprise) add more Actions minutes, advanced security features, and management tools. Open source projects are free at any tier."
  - question: "What is the difference between forking and cloning?"
    answer: "Cloning downloads a copy of a repository to your local machine. Forking creates your own copy of someone else's repository on GitHub itself, under your account. Fork is used when you want to contribute to a project you do not own: fork → clone your fork locally → make changes → push to your fork → open a pull request to the original. Clone is used when you have access to push directly."
  - question: "What is GitHub Pages?"
    answer: "GitHub Pages is free static website hosting built into every GitHub repository. You push HTML, CSS, and JavaScript files to a specific branch (usually `gh-pages` or the `docs/` folder on `main`), and GitHub automatically publishes them at `username.github.io/repo-name`. This wiki and many open source project documentation sites are hosted on GitHub Pages. Hugo, Jekyll, and other static site generators work natively with it."
---

{{< quickanswer >}}
GitHub is a website where developers store their Git repositories online, collaborate with others, track bugs and feature requests, and manage the full lifecycle of a software project. It is where virtually all open-source software in the world is published, and where your project should live if you are building anything serious.
{{< /quickanswer >}}

## Git vs GitHub, the difference

This confuses almost everyone at first.

**Git** is a tool that runs on your computer. It tracks changes locally, creates commits, manages branches. You can use Git with no internet connection and no account anywhere.

**GitHub** (owned by Microsoft since 2018) is a website that hosts Git repositories online and layers collaboration tools on top. It is where you push your code to share it and where teams coordinate their work.

Git is the engine. GitHub is the service built around it.

Alternatives to GitHub: [GitLab](https://gitlab.com/) (excellent for self-hosting and built-in CI/CD), [Bitbucket](https://bitbucket.org/) (common in Atlassian-heavy enterprises). GitHub dominates for open source; all three work for private teams.

## What GitHub gives you

### Hosted remote repository

Your repository lives on GitHub's servers. Push once and your code is accessible from any machine, safely backed up, and shareable with a link. If your laptop breaks, nothing is lost.

### Pull Requests, the centre of collaborative development

A **pull request** (PR) is a proposal to merge changes from one branch into another. When you open a PR, GitHub shows:
- Every file changed
- Every line added (green) and removed (red)
- A comment thread for discussion

Your teammates review the changes, leave inline comments, request improvements, and when satisfied, approve. Only then does the code merge. This code review step catches bugs, shares knowledge, and maintains quality. [More: About pull requests, GitHub Docs](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)

### Issues, the bug and feature tracker

**Issues** are GitHub's built-in task system. Anyone can open an issue to report a bug, propose a feature, or ask a question. You can:
- Assign issues to people
- Add labels (bug, enhancement, help wanted, good first issue)
- Link issues to pull requests (closing an issue when its PR merges)
- Organise issues into milestones (version 1.0, Q3 sprint)

For open source projects, issues are the primary way users communicate with maintainers.

### GitHub Projects, roadmap and kanban

GitHub Projects is a project management tool built directly into repositories. Create boards with columns ("To Do", "In Progress", "In Review", "Done") and link them to Issues and PRs. This gives you a real-time view of your project's state, tightly integrated with the code itself.

No need for a separate Trello or Jira for small-to-medium teams, Projects handles it.

### GitHub Actions, automation

**GitHub Actions** lets you run code automatically in response to events. The most common uses:

- **Run tests** on every push or pull request
- **Deploy** to production when code merges to main
- **Check formatting** and block PRs with linting errors
- **Build and publish** a package when you create a release

Actions are defined in `.github/workflows/` YAML files in your repository. [More: GitHub Actions, GitHub Docs](https://docs.github.com/en/actions)

This is **CI/CD** (Continuous Integration / Continuous Deployment), the practice of automatically testing and deploying code every time it changes.

### GitHub Pages, free hosting

Every repository can publish a website at `username.github.io/repo-name` for free. Static files (HTML, CSS, JS) pushed to the right branch are served automatically. This wiki uses GitHub Pages. [More: GitHub Pages, GitHub Docs](https://docs.github.com/en/pages)

### GitHub Codespaces, dev environment in a browser

**Codespaces** gives you a complete VS Code development environment running in the cloud, accessible in your browser. No local setup required. [More: GitHub Codespaces](https://github.com/features/codespaces)

### GitHub Copilot, AI pair programmer

**GitHub Copilot** is an AI coding assistant built into VS Code, JetBrains, and other editors. It suggests code completions, generates functions from comments, and helps write tests. It is built on OpenAI's models. [More: GitHub Copilot](https://github.com/features/copilot)

## Managing a solo project on GitHub

A practical setup that scales:

1. **Create a repository**, public for open source, private for proprietary work
2. **Add a .gitignore**, use the template for your language
3. **Create Issues** for every feature, bug, or idea you want to build
4. **Create a Project board** and link those issues
5. **Work on branches** named for the issue (`feature/issue-12-user-login`)
6. **Open PRs** when done, even solo, the PR view is useful for reviewing your own changes
7. **Create Releases** when you hit a working milestone

This gives you a complete, linked record of decisions, progress, and history, all connected to the code.

## GitHub for non-developers

You do not need to write code to benefit from GitHub:

- **Product managers** use Issues and Projects to manage feature work alongside developers
- **Technical writers** write and review documentation
- **Designers** store design system assets and changelogs
- **Data analysts** share notebooks and datasets with version history

If you are building with AI tools, GitHub is where your project lives, and where you point developers, collaborators, or potential users.

## Further reading

- [GitHub Docs, Get Started](https://docs.github.com/en/get-started), official documentation, comprehensive
- [GitHub Skills](https://skills.github.com/), interactive courses for learning GitHub with real repositories
- [GitHub Actions documentation](https://docs.github.com/en/actions), everything about automation
- [First Contributions](https://firstcontributions.github.io/), guided walkthrough of your first open source pull request
- [GitHub Pages documentation](https://docs.github.com/en/pages)

## What's next

Next: [What is Open Source?](/basics/what-is-open-source/), what it means when software's code is public, and why it matters.
