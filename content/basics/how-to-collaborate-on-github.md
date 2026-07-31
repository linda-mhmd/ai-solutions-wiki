---
title: "How to Collaborate on GitHub"
description: "Pull requests, forks, code review, and contributing to open source projects. How to work with others without breaking each other's code."
date: 2026-07-30
level: 2
categories: [Basics]
tags: [beginner, github, collaboration, pull-request, open-source, fork, code-review]
faqs:
  - question: "What's the difference between a fork and a branch?"
    answer: "A branch is a parallel version within the same repository—you need write access. A fork is your own copy of someone else's repository under your GitHub account. You fork when you can't push to the original, then make a pull request to propose your changes."
  - question: "Do I need permission to contribute to open source?"
    answer: "No. Anyone can fork a public repository, make changes, and open a pull request. The maintainers decide whether to accept it. That's the beauty of open source—you don't need to ask permission to try."
  - question: "What if my pull request gets rejected?"
    answer: "It happens. Maintainers might have different priorities, your approach might conflict with their vision, or the timing might be wrong. Don't take it personally. Ask for feedback, learn from it, and try again—on this project or another."
last_updated: 2026-07-30
---

{{< quickanswer >}}
Collaboration on GitHub happens through branches and pull requests. You work on a branch, open a pull request to propose merging your changes, teammates review the code, and when approved, it merges into main. For projects you don't own, you fork first, then follow the same process.
{{< /quickanswer >}}

## The collaboration model

GitHub's model prevents chaos:

1. **Nobody commits directly to main**—changes go through review
2. **Everyone works on branches**—parallel work without conflicts
3. **Pull requests are proposals**—not demands, proposals to merge
4. **Code review catches mistakes**—and spreads knowledge

This works for two people or two thousand.

## Working with teammates (same repository)

When you have write access to a repository:

### 1. Clone the repository
```bash
git clone https://github.com/team/project.git
cd project
```

### 2. Create a branch for your work
```bash
git checkout -b feature/add-user-settings
```

### 3. Make changes and commit
```bash
# Work on your feature...
git add .
git commit -m "Add user settings page"

# More work...
git add .
git commit -m "Add form validation"
```

### 4. Push your branch
```bash
git push -u origin feature/add-user-settings
```

### 5. Open a pull request

On GitHub:
1. You'll see a prompt to create a PR, or go to **Pull requests** → **New pull request**
2. Select your branch (`feature/add-user-settings`) to merge into `main`
3. Write a description of what you changed and why
4. Add reviewers (teammates who should look at it)
5. Click **Create pull request**

### 6. Address feedback

Reviewers might comment:
- "Can you rename this variable to be clearer?"
- "This could cause a bug if the user isn't logged in"
- "Nice work! Just one small change..."

Make the requested changes:
```bash
# Fix the issues...
git add .
git commit -m "Address review feedback"
git push
```

The PR updates automatically with your new commits.

### 7. Merge when approved

Once reviewers approve:
- Click **Merge pull request**
- Or **Squash and merge** (combines your commits into one)
- Or **Rebase and merge** (replays commits on top of main)

Delete the branch after merging—it's served its purpose.

## Contributing to open source (fork workflow)

When you don't have write access:

### 1. Fork the repository

On the project's GitHub page, click **Fork** (top right). This creates your own copy under your account: `your-username/project`.

### 2. Clone your fork
```bash
git clone https://github.com/YOUR-USERNAME/project.git
cd project
```

### 3. Add the original as "upstream"
```bash
git remote add upstream https://github.com/original-owner/project.git
```

Now you have two remotes:
- `origin` = your fork (you can push here)
- `upstream` = original project (read-only for you)

### 4. Create a branch
```bash
git checkout -b fix/typo-in-readme
```

### 5. Make your changes
```bash
# Edit files...
git add .
git commit -m "Fix typo in README"
```

### 6. Push to your fork
```bash
git push -u origin fix/typo-in-readme
```

### 7. Open a pull request

Go to the original repository (not your fork). GitHub usually shows a banner: "Compare & pull request."

Or:
1. Click **Pull requests** → **New pull request**
2. Click **compare across forks**
3. Set base repo as the original, base branch as `main`
4. Set head repo as your fork, compare branch as your feature branch
5. Write a clear description
6. Click **Create pull request**

The maintainers will review it. Be patient—popular projects get hundreds of PRs.

### 8. Keep your fork updated

Before starting new work:
```bash
git checkout main
git fetch upstream
git merge upstream/main
git push origin main
```

This keeps your fork in sync with the original.

## Writing good pull requests

A good PR description helps reviewers:

```markdown
## What this PR does

Adds a female avatar option to the juggler animation.

## Why

The current default avatar reads as male to many users. This adds an
alternative and refactors the code to make adding more avatars easier.

## How to test

1. Run the app
2. Go to Settings → Appearance
3. Select "Avatar style"
4. Confirm both options render correctly

## Screenshots

[Before/after images if visual changes]

## Related issues

Closes #42
```

### Good PR practices

- **Keep PRs small**—easier to review, faster to merge
- **One PR = one thing**—don't mix unrelated changes
- **Describe the why**—not just what you changed
- **Link related issues**—`Closes #42` auto-closes the issue when merged
- **Add screenshots**—if there are visual changes
- **Test your own code**—before asking others to review

## Code review

### As a reviewer

When reviewing someone's PR:

- **Be kind**—there's a person on the other end
- **Explain why**—not just "change this" but "change this because..."
- **Ask questions**—"What happens if the user isn't logged in?"
- **Acknowledge good work**—"Nice refactor!" matters
- **Approve when ready**—don't block unnecessarily

Common review comments:
- "Could you add a comment explaining this logic?"
- "This might break if the array is empty"
- "Consider extracting this into a separate function"
- "Love this solution—much cleaner than what we had"

### Responding to review

- **Don't take it personally**—feedback improves the code
- **Ask for clarification**—if you don't understand
- **Explain your reasoning**—if you disagree
- **Make the changes**—then push and comment "Done"
- **Thank reviewers**—they spent time helping you

## Handling merge conflicts

When your branch and main have both changed the same lines:

```bash
# Update your branch with latest main
git checkout feature/my-work
git fetch origin
git merge origin/main

# If there are conflicts:
# Auto-merging src/index.js
# CONFLICT (content): Merge conflict in src/index.js
```

Open the conflicted file:
```javascript
<<<<<<< HEAD
const greeting = "Hello";
=======
const greeting = "Hi there";
>>>>>>> origin/main
```

Decide what to keep, remove the conflict markers:
```javascript
const greeting = "Hello";  // or combine them, or pick the other
```

Then:
```bash
git add src/index.js
git commit -m "Resolve merge conflict"
git push
```

The PR updates automatically.

## GitHub features that help collaboration

### Draft pull requests

Not ready for review? Open as a draft:
- Shows you're working on it
- Prevents premature reviews
- Convert to ready when done

### Requested reviewers

Assign specific people to review. They get notified.

### Labels

Categorize PRs: `bug`, `enhancement`, `documentation`, `help wanted`, `good first issue`

### Milestones

Group PRs and issues into releases: "v2.0", "Q3 Sprint"

### Branch protection rules

Require:
- Pull request reviews before merging
- Status checks (tests) to pass
- No force pushes to main

Set up in **Settings** → **Branches** → **Branch protection rules**

## Your first open source contribution

Start easy:

1. **Find a project you use**—you understand it and care about it
2. **Look for "good first issue" labels**—maintainers mark beginner-friendly issues
3. **Read CONTRIBUTING.md**—most projects explain how to contribute
4. **Start small**—documentation fixes, typos, small bugs
5. **Be patient**—maintainers are often volunteers

Resources:
- [First Contributions](https://firstcontributions.github.io/)—guided tutorial
- [Good First Issues](https://goodfirstissues.com/)—aggregates beginner issues
- [Up For Grabs](https://up-for-grabs.net/)—projects welcoming new contributors

## Common mistakes

### Pushing directly to main
Always use branches, even for small changes. Branch protection can enforce this.

### Giant PRs
A 50-file PR is hard to review. Break it into smaller, logical pieces.

### Vague commit messages
"Fixed stuff" tells reviewers nothing. Be specific.

### Not pulling before pushing
`git pull` first, or you'll create merge conflicts for yourself.

### Ignoring CI failures
If tests fail, fix them before asking for review.

## Git commands for collaboration

```bash
# Get latest changes from remote
git fetch origin
git pull origin main

# See all branches (local and remote)
git branch -a

# Switch to a coworker's branch
git checkout -b their-feature origin/their-feature

# Rebase your branch onto latest main
git checkout feature/mine
git rebase origin/main

# Push after rebase (requires force)
git push --force-with-lease

# Delete a merged branch
git branch -d feature/done
git push origin --delete feature/done
```

## Further reading

- [Git vs GitHub](/basics/git-vs-github/): Understanding the fundamentals
- [What is a Git branch?](/basics/what-is-a-git-branch/): Branching in detail
- [How to set up a GitHub project](/basics/how-to-setup-github-project/): Getting started
- [What is open source?](/basics/what-is-open-source/): The culture and licensing
- [First Contributions](https://firstcontributions.github.io/)—practice your first PR
