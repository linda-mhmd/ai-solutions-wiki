---
title: "What is a Git Branch?"
description: "A branch lets you work on a new feature without breaking the main code. When it's ready, you merge it back. It's how teams collaborate without stepping on each other's work."
date: 2026-07-30
level: 2
categories: [Basics]
tags: [beginner, git, branch, version control, merge, collaboration]
faqs:
  - question: "What's the difference between main and master?"
    answer: "They're the same concept—the primary branch. 'master' was the historical default; 'main' is the modern convention. GitHub and most tools now default to 'main'. Use whatever your project uses."
  - question: "When should I create a new branch?"
    answer: "Create a branch for any change that takes more than a few minutes or that you want to review before merging. Features, bug fixes, experiments—each gets a branch. Working directly on main is risky because you can break things for everyone."
  - question: "What happens if two people edit the same file?"
    answer: "Git handles different parts of the same file automatically. If you edit different sections, the merge just works. If you edit the same lines, you get a 'merge conflict'—Git shows both versions and you choose which to keep."
last_updated: 2026-07-30
---

{{< quickanswer >}}
A Git branch is an independent line of development. You create a branch, make changes, and the main code stays untouched. When your feature is done and tested, you merge the branch back into main. Branches let multiple people work on different features without interfering with each other.
{{< /quickanswer >}}

## Why branches exist

Without branches, you have one timeline:

```
Commit 1 → Commit 2 → Commit 3 → Commit 4 (everyone's changes)
```

This causes problems:
- Your half-finished feature breaks the app for everyone
- You can't easily undo a feature that turned out badly
- Two people editing the same area creates constant conflicts

With branches, you get parallel timelines:

```
main:     Commit 1 → Commit 2 ─────────────→ Commit 5 (merge)
                         ↘                    ↗
feature:                  Commit 3 → Commit 4
```

Your feature branch is isolated. When it's ready, you merge it back.

## Creating and using branches

```bash
# See what branch you're on
git branch

# Create a new branch
git branch feature/add-login

# Switch to that branch
git checkout feature/add-login

# Or create and switch in one command
git checkout -b feature/add-login

# Modern Git alternative
git switch -c feature/add-login
```

Now any commits you make happen on `feature/add-login`, not on `main`.

## The typical workflow

### 1. Start from main
```bash
git checkout main
git pull  # Get latest changes
```

### 2. Create a feature branch
```bash
git checkout -b feature/user-profile
```

### 3. Make changes and commit
```bash
# Edit files...
git add .
git commit -m "Add user profile page"

# More edits...
git add .
git commit -m "Add profile picture upload"
```

### 4. Push your branch
```bash
git push -u origin feature/user-profile
```

### 5. Open a Pull Request (on GitHub/GitLab)
- Compare `feature/user-profile` to `main`
- Get code review from teammates
- Discuss and make changes if needed

### 6. Merge when approved
- Click "Merge" in the PR
- Or merge locally:
```bash
git checkout main
git merge feature/user-profile
git push
```

### 7. Delete the branch (cleanup)
```bash
git branch -d feature/user-profile
```

## Branch naming conventions

Good branch names describe what's in them:

| Pattern | Example | Use for |
|---------|---------|---------|
| `feature/xyz` | `feature/dark-mode` | New functionality |
| `fix/xyz` | `fix/login-bug` | Bug fixes |
| `chore/xyz` | `chore/update-deps` | Maintenance tasks |
| `experiment/xyz` | `experiment/new-api` | Testing ideas |

Bad branch names: `branch1`, `test`, `johns-stuff`, `asdfgh`

## Seeing what's on each branch

```bash
# List all branches
git branch -a

# See which branch has which commits
git log --oneline --graph --all

# Output:
# * abc123 (feature/dark-mode) Add dark mode toggle
# * def456 (main) Initial commit
```

## Merging branches

When your feature is ready, you merge it into main:

```bash
# Switch to the target branch
git checkout main

# Pull latest (someone else might have merged)
git pull

# Merge your feature branch
git merge feature/dark-mode

# Push the merged main
git push
```

If there are no conflicts, Git combines the histories automatically.

## Merge conflicts

Conflicts happen when two branches edit the same lines. Git can't decide which version to keep.

```bash
git merge feature/dark-mode
# Auto-merging src/styles.css
# CONFLICT (content): Merge conflict in src/styles.css
```

Open the file and you'll see:

```css
<<<<<<< HEAD
background: white;
=======
background: #1a1a1a;
>>>>>>> feature/dark-mode
```

You decide what to keep:
```css
/* Choose one, or combine them */
background: var(--bg-color);  /* I'll make it configurable */
```

Then:
```bash
git add src/styles.css
git commit -m "Resolve merge conflict in styles"
```

Conflicts are normal. They just mean two people touched the same code.

## Rebasing (alternative to merging)

Rebasing replays your commits on top of the latest main:

```bash
# Instead of merge, rebase
git checkout feature/dark-mode
git rebase main
```

**Before rebase:**
```
main:     A → B → C
              ↘
feature:       D → E
```

**After rebase:**
```
main:     A → B → C
                    ↘
feature:            D' → E'
```

**Pros**: Cleaner history, linear timeline
**Cons**: Rewrites commits (don't rebase shared branches)

Use merge for shared branches. Use rebase for local cleanup.

## Remote branches

Branches on GitHub/GitLab are "remote" branches:

```bash
# See remote branches
git branch -r

# Fetch all remote branches
git fetch --all

# Checkout a remote branch someone else created
git checkout -b their-feature origin/their-feature
```

When you `git push -u origin feature-name`, you create a remote branch others can see.

## Common branching strategies

### GitHub Flow (simple)
- `main` is always deployable
- Create a branch for every change
- Open a PR, get review, merge
- Deploy from main

**Good for**: Small teams, continuous deployment

### Git Flow (structured)
- `main` = production code
- `develop` = integration branch
- `feature/*` branches merge to develop
- `release/*` branches for releases
- `hotfix/*` for emergency production fixes

**Good for**: Scheduled releases, larger teams

### Trunk-based development
- Everyone commits to `main` frequently
- Use feature flags to hide incomplete features
- Deploy from main multiple times per day

**Good for**: Fast-moving teams with good testing

For vibecoders starting out: GitHub Flow is simplest. One main branch, feature branches, PRs.

## Git commands cheat sheet

```bash
# Branches
git branch                    # List branches
git branch feature-name       # Create branch
git checkout feature-name     # Switch to branch
git checkout -b feature-name  # Create and switch
git branch -d feature-name    # Delete branch

# Merging
git merge feature-name        # Merge into current branch
git rebase main              # Rebase onto main

# Remote
git push -u origin feature-name  # Push branch to remote
git fetch --all                   # Get latest remote branches
git pull                          # Fetch and merge
```

## Further reading

- [What is Git?](/basics/what-is-git/): The bigger picture of version control
- [What is GitHub?](/basics/what-is-github/): Where branches become pull requests
- [What is CI/CD?](/glossary/ci-cd/): Automating tests when you push branches
