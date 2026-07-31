---
title: "How to Set Up a Project on GitHub"
description: "A step-by-step guide to creating your first GitHub repository, connecting it to your local code, and establishing good habits from the start."
date: 2026-07-30
level: 1
categories: [Basics]
tags: [beginner, github, git, project-setup, repository]
faqs:
  - question: "Should I create the repo on GitHub first or locally first?"
    answer: "Either works, but starting on GitHub is easier for beginners. You get a README, .gitignore, and license set up correctly, then clone to your computer. Starting locally and connecting to GitHub requires more Git commands."
  - question: "Public or private repository?"
    answer: "Private if you're not ready to share or if it contains anything sensitive. Public if you want others to see your work or if it's open source. You can change this later. When in doubt, start private."
  - question: "What if I already have code on my computer?"
    answer: "Create an empty repo on GitHub (no README or .gitignore), then follow the 'push an existing repository' instructions GitHub shows you. It's just a few Git commands to connect your local folder to the remote repo."
last_updated: 2026-07-30
---

{{< quickanswer >}}
Create a repository on GitHub, clone it to your computer, add your files, commit them, and push. That's it. This guide walks through each step with the exact commands and what they do.
{{< /quickanswer >}}

## Before you start

You need:
1. A **GitHub account** (free at github.com)
2. **Git installed** on your computer (`git --version` should show a version number)
3. **A terminal** (Terminal on Mac, Git Bash on Windows, or the terminal in VS Code)

If Git isn't installed, download it from [git-scm.com](https://git-scm.com/).

## Method 1: Start on GitHub (recommended for beginners)

This is the cleanest way to start a new project.

### Step 1: Create the repository on GitHub

1. Go to [github.com](https://github.com) and sign in
2. Click the **+** icon in the top right → **New repository**
3. Fill in:
   - **Repository name**: `my-project` (lowercase, hyphens for spaces)
   - **Description**: Optional but helpful
   - **Public or Private**: Your choice
   - **Add a README file**: ✓ Check this
   - **Add .gitignore**: Select your language (Node, Python, etc.)
   - **Choose a license**: MIT is common for open source; skip if private
4. Click **Create repository**

You now have a repository on GitHub with a README, .gitignore, and optionally a license.

### Step 2: Clone to your computer

On your new repository page, click the green **Code** button and copy the URL.

In your terminal:
```bash
# Navigate to where you want the project
cd ~/code  # or wherever you keep projects

# Clone the repository
git clone https://github.com/YOUR-USERNAME/my-project.git

# Enter the project folder
cd my-project
```

You now have a local copy connected to GitHub.

### Step 3: Add your files

Put your project files in this folder. If you're starting fresh:
```bash
# Create some files
touch index.html
touch styles.css
touch app.js
```

Or copy existing files into the folder.

### Step 4: Stage, commit, push

```bash
# See what's new or changed
git status

# Stage all changes
git add .

# Commit with a message
git commit -m "Add initial project files"

# Push to GitHub
git push
```

Done. Your files are now on GitHub.

## Method 2: Start locally, connect to GitHub

Use this if you already have code on your computer.

### Step 1: Initialize Git in your folder

```bash
# Navigate to your project folder
cd ~/code/my-existing-project

# Initialize Git
git init

# Stage all files
git add .

# Make your first commit
git commit -m "Initial commit"
```

### Step 2: Create an empty repo on GitHub

1. Go to GitHub → **New repository**
2. Name it the same as your folder
3. **Don't** add README, .gitignore, or license (you already have files)
4. Click **Create repository**

GitHub shows instructions. Follow the "push an existing repository" section.

### Step 3: Connect and push

```bash
# Connect your local repo to GitHub
git remote add origin https://github.com/YOUR-USERNAME/my-existing-project.git

# Rename your branch to main (if needed)
git branch -M main

# Push your code
git push -u origin main
```

The `-u` flag sets up tracking so future pushes just need `git push`.

## Setting up .gitignore

The `.gitignore` file tells Git which files to ignore—files that should never be committed.

**Always ignore:**
```
# Dependencies
node_modules/
.venv/
__pycache__/

# Environment/secrets
.env
.env.local
*.key
*.pem

# System files
.DS_Store
Thumbs.db

# Build outputs
dist/
build/
.next/
out/

# IDE settings (optional)
.vscode/
.idea/
```

If you didn't add a .gitignore when creating the repo, create one now:
```bash
# Create .gitignore
touch .gitignore

# Edit it and add the patterns above
```

Then commit it:
```bash
git add .gitignore
git commit -m "Add .gitignore"
git push
```

GitHub provides templates for every language: [github.com/github/gitignore](https://github.com/github/gitignore)

## Writing a good README

The README.md is the first thing people see. At minimum, include:

```markdown
# Project Name

One-sentence description of what this does.

## Getting Started

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

## What it does

- Feature 1
- Feature 2
- Feature 3

## License

MIT
```

For a side project, that's enough. Expand as the project grows.

## The daily workflow

Once set up, your routine is:

```bash
# Start of session: get latest changes
git pull

# Make changes to files...

# End of session: save and upload
git add .
git commit -m "Describe what changed"
git push
```

Commit often. Small, frequent commits are better than one massive commit at the end of the day.

## Good commit messages

Bad:
- "Update"
- "Fixed stuff"
- "asdfgh"
- "WIP"

Good:
- "Add user login form"
- "Fix redirect after password reset"
- "Remove unused dependencies"
- "Update README with setup instructions"

The message should complete the sentence: "This commit will..."

## Using branches (even solo)

Even when working alone, branches protect you:

```bash
# Create a branch for your feature
git checkout -b feature/add-dark-mode

# Make changes, commit as usual
git add .
git commit -m "Add dark mode toggle"
git push -u origin feature/add-dark-mode

# When done, merge into main
git checkout main
git merge feature/add-dark-mode
git push

# Delete the feature branch
git branch -d feature/add-dark-mode
```

If your feature turns out badly, you can abandon the branch. Main stays clean.

## When things go wrong

### "I committed something I shouldn't have"
```bash
# Undo the last commit, keep changes staged
git reset --soft HEAD~1
```

### "I need to undo changes to a file"
```bash
# Discard changes in working directory
git checkout -- filename.js
```

### "I committed to main when I meant to use a branch"
```bash
# Create a branch from current state
git branch feature/my-work

# Reset main to before your commits
git reset --hard HEAD~1

# Switch to your new branch
git checkout feature/my-work
```

### "I pushed secrets by accident"
1. Immediately revoke/rotate the exposed credentials
2. Remove from history (complex—look up `git filter-branch` or BFG Repo-Cleaner)
3. Force push the cleaned history
4. Consider the secret permanently compromised

Prevention is better: always use .gitignore and environment variables.

## VS Code integration

If you use VS Code, Git is built in:

- **Source Control panel** (Ctrl/Cmd + Shift + G): See changes, stage, commit
- **GitLens extension**: Rich history, blame annotations, visual diffs
- **Terminal**: All Git commands work here too

You can do everything through the GUI or the terminal—whatever feels right.

## Checklist for new projects

- [ ] Repository created on GitHub
- [ ] Cloned locally
- [ ] .gitignore added with appropriate patterns
- [ ] README.md with basic information
- [ ] First commit pushed
- [ ] (Optional) LICENSE file added
- [ ] (Optional) Branch protection on main

## Further reading

- [Git vs GitHub](/basics/git-vs-github/): Understanding the difference
- [What is Git?](/basics/what-is-git/): The full story of version control
- [What is a Git branch?](/basics/what-is-a-git-branch/): Working with branches
- [How to collaborate on GitHub](/basics/how-to-collaborate-on-github/): Working with others
- [What is an environment variable?](/basics/what-is-an-environment-variable/): Keeping secrets out of your repo
