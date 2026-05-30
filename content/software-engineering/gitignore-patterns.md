---
title: ".gitignore Patterns and Best Practices"
date: 2026-03-31
draft: false
tags: ["software-engineering", "beginner", "git", "version-control", "devops", "security"]
categories: ["Software Engineering"]
related:
  - software-engineering/version-control-fundamentals
last_updated: 2026-05-30
---

A `.gitignore` file tells Git which files and directories to exclude from version control. Without it, running `git status` in a typical project would show hundreds of generated, cached, and temporary files alongside your source code, and an undiscriminating `git add .` would commit files that have no place in a repository. Understanding how `.gitignore` works and what to exclude is one of the first practical skills for working with Git effectively.

## How .gitignore Works

Git has three states for any file in the working tree: tracked (the file has been committed at least once), untracked (Git has never seen a commit containing this file), and ignored. Ignored files are excluded from `git status` output, from `git add .` expansion, and from most other Git operations. Ignoring a file does not delete it from the working tree; it simply makes Git pretend it is not there.

The `.gitignore` file contains a list of patterns. Git reads every `.gitignore` file in the repository and applies the patterns relative to the directory containing that file. The `.gitignore` at the repository root governs the entire repository; a `.gitignore` inside `src/` governs only `src/` and its subdirectories.

Git only ignores files that are currently untracked. If a file is already tracked (has been committed), adding it to `.gitignore` will not make Git ignore it. To stop tracking a previously committed file, you must run `git rm --cached <file>` to remove it from the index while leaving it in the working tree, then commit the removal.

## Pattern Matching Rules

Git's pattern syntax is a variant of shell glob patterns with a few additions.

**Blank lines and comments**

Blank lines are ignored. Lines beginning with `#` are comments. A trailing `#` on a pattern line is not a comment; only lines where `#` is the first character are treated as comments.

**Literal file and directory names**

A pattern with no special characters matches any file or directory with that exact name, anywhere in the repository tree. The pattern `secrets.json` ignores any file named `secrets.json` at any depth.

**Wildcards**

The `*` wildcard matches any sequence of characters that does not include a slash. The pattern `*.log` ignores every file whose name ends in `.log`. The `?` wildcard matches exactly one character other than a slash. The `[abc]` syntax matches any one of the listed characters.

The double wildcard `**` matches across directory boundaries. The pattern `**/logs` ignores any directory named `logs` at any depth. The pattern `logs/**` ignores everything inside a top-level `logs` directory. The pattern `src/**/test` ignores any path matching `src/`, then any sequence of directories, then `test`.

**Directory-only patterns**

A trailing slash restricts the pattern to directories. The pattern `public/` ignores the directory named `public` and everything inside it, but does not ignore a file named `public` (without a trailing slash). For build output directories, always use the trailing slash form.

**Rooted patterns**

A leading slash anchors the pattern to the repository root. The pattern `/TODO` ignores only `TODO` at the root, not `src/TODO`. Without the leading slash, `TODO` ignores any file or directory named `TODO` anywhere in the tree.

**Negation patterns**

A leading `!` negates a pattern: a file that matches a negation pattern is not ignored, even if an earlier pattern would have ignored it. Negation requires that the file's parent directory is not itself ignored. If `build/` is ignored, no pattern can un-ignore `build/output.txt` because Git never inspects directories that are already ignored. The workaround is to ignore the files inside the directory individually rather than ignoring the directory as a whole.

Example of negation in practice:

```
*.log
!important.log
```

This ignores all `.log` files except `important.log`.

**Order of precedence**

Later patterns in the same file take precedence over earlier ones. A more specific `.gitignore` in a subdirectory takes precedence over a less specific one in a parent directory.

## Common Patterns by Project Type

### Python

```gitignore
# Bytecode cache
__pycache__/
*.py[cod]
*.pyo

# Distribution and packaging
dist/
build/
*.egg-info/
*.egg

# Virtual environments
.venv/
venv/
env/
ENV/

# Environment variables
.env
.env.local
.env.*.local

# Testing
.pytest_cache/
.coverage
htmlcov/

# Type checkers
.mypy_cache/
.ruff_cache/
```

Python's `__pycache__` directories and `.pyc` files are bytecode compiled by the CPython interpreter. They are platform-specific and version-specific: the same `.py` file produces different bytecode on Python 3.10 versus Python 3.12. Committing them causes spurious conflicts and bloat.

Virtual environment directories contain the full CPython interpreter installation plus all installed packages, potentially gigabytes of files. The environment is entirely reproducible from `requirements.txt` or `pyproject.toml`.

### Node.js and JavaScript

```gitignore
# Dependencies
node_modules/

# Build output
dist/
build/
.next/
.nuxt/
out/

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Caches
.cache/
.parcel-cache/
.eslintcache

# Coverage
coverage/
```

`node_modules/` is the canonical example of a dependency directory that must never be committed. A fresh `npm install` or `yarn install` recreates it from `package-lock.json` or `yarn.lock`. A committed `node_modules/` in a large project can contain tens of thousands of files and hundreds of megabytes, making every `git clone` and every `git status` far slower than necessary.

### Hugo Static Sites

```gitignore
# Generated site output
public/

# Hugo's internal cache
resources/_gen/

# Build lock file
.hugo_build.lock
```

Hugo generates the entire `public/` directory from source on every build. Committing it means committing the same content twice (once as source, once as rendered HTML, CSS, and JavaScript) and creates conflicts when two people regenerate the site independently. If you use a CI/CD pipeline to deploy, the pipeline builds `public/` from source on demand.

The `resources/_gen/` directory caches processed resources such as SASS-compiled CSS and image transforms. Like `public/`, this is derived output.

### Java

```gitignore
# Compiled bytecode
*.class

# Build output
target/
build/

# Package files
*.jar
*.war
*.ear

# IDE files
.idea/
*.iml
.classpath
.project
.settings/
```

### General Patterns (Any Project)

```gitignore
# macOS
.DS_Store
.AppleDouble
.LSOverride

# Windows
Thumbs.db
ehthumbs.db
Desktop.ini

# Linux
*~

# Editor swap files (Vim/Neovim)
*.swp
*.swo

# JetBrains IDEs
.idea/

# Visual Studio Code
.vscode/

# Log files
*.log
logs/

# Temporary files
*.tmp
*.temp
```

## Levels of .gitignore

**Repository-level `.gitignore`**

A `.gitignore` file at the repository root is committed to the repository and applies to every developer who clones it. This is where project-specific ignores live: build output directories, dependency directories, and generated files. Because it is committed, it is shared automatically.

**Subdirectory `.gitignore` files**

Any directory in the repository can contain its own `.gitignore`. The patterns in it apply relative to that directory. This is useful for monorepos where different subdirectories have different build systems, or when a specific directory generates output that the root `.gitignore` does not need to know about.

**Global `.gitignore`**

Git allows a per-user global gitignore file, configured with:

```
git config --global core.excludesFile ~/.gitignore_global
```

The global gitignore applies to every repository on the machine. It is not committed anywhere; it lives only on the local system. The global gitignore is the correct place for patterns that are specific to the developer's environment rather than the project: `.DS_Store` (if the developer is on macOS), `.idea/` (if the developer uses JetBrains IDEs), or `*.swp` (if the developer uses Vim). This keeps the repository-level `.gitignore` focused on project-specific patterns and avoids the awkward situation of one developer's editor preferences appearing in the repository's committed `.gitignore`.

**`.git/info/exclude`**

This file, located inside the `.git` directory, works like a local `.gitignore` that is never committed and applies only to the current repository. It is useful for ignoring files that are specific to the developer's local setup for this particular repository but that would be inappropriate to add to either the global gitignore or the committed `.gitignore`.

## The Security Angle: Secrets in Repositories

The most consequential mistake in version control practice is committing credentials to a repository. The damage is not limited to the moment of discovery.

**Git history is permanent.** Deleting a file with `git rm` removes it from the working tree and from the index, but not from the history. Anyone who clones the repository or has an existing clone can recover the deleted file using `git log --all --full-history` and `git show`. Removing a secret from history requires rewriting history using `git filter-repo` or the BFG Repo Cleaner, which changes every commit hash in the affected part of the history, invalidating every clone and open pull request.

**Remote repositories cache content.** Even after rewriting history and force-pushing, the remote host may retain cached copies of the old content for hours or longer. If the repository is or was public, web crawlers, archive services, and other tools may have already indexed the secret.

**The blast radius of leaked credentials is wide.** A leaked AWS access key can result in significant cloud spend from unauthorised resource creation. A leaked private key for a TLS certificate allows man-in-the-middle attacks. A leaked database password exposes customer data.

Common categories of files that should never be committed:

- `.env` files containing `DATABASE_URL`, `API_KEY`, `SECRET_KEY`, and similar variables
- Private key files (`*.pem`, `*.key`, `id_rsa`, `*.pfx`)
- Service account credential files (`credentials.json`, `service-account.json`)
- Configuration files that embed credentials (`config/database.yml` in Rails, `appsettings.json` in .NET when it contains connection strings)
- OAuth client secrets and tokens

The correct approach is to store secrets in a dedicated secrets management system and reference them by name in the application. Environment variable injection at deployment time, using tools like HashiCorp Vault, AWS Secrets Manager, Google Secret Manager, or the secrets management features of the CI/CD platform, is the standard pattern. The repository stores only the names of the expected environment variables, never their values.

Pre-commit hooks that scan for credential patterns can prevent accidental commits. Tools that provide this functionality include `git-secrets` (AWS), `detect-secrets` (Yelp), and `truffleHog` (Truffle Security).

## Tools for Generating .gitignore Files

**gitignore.io**

gitignore.io (also accessible as the `gi` command-line tool) generates `.gitignore` files from a list of project types, languages, and editors. Requesting a gitignore for `python,django,visualstudiocode` produces a comprehensive file covering all three environments. The service is maintained by the community and updated as new tools emerge.

**GitHub's gitignore Templates**

The GitHub repository at `github/gitignore` contains community-maintained templates for hundreds of languages and frameworks. When you create a new repository through GitHub's web interface, you can select a language and GitHub will initialise the repository with the corresponding template. These templates are also the source gitignore.io uses.

**Keeping .gitignore Up to Date**

A `.gitignore` file is not a one-time artefact. As a project adopts new tools, introduces new build steps, or changes its structure, the `.gitignore` should be updated accordingly. If `git status` begins showing unexpected files that clearly should not be committed, that is a signal to add the relevant pattern. If the team switches editors or adds a new CI/CD tool that produces local output, update the file. Reviewing the `.gitignore` whenever new tooling is added to the project is a low-effort habit with high return.

## Sources

- Chacon, S., and Straub, B. (2014). *Pro Git*, 2nd edition. Apress. Chapter 2.2: "Recording Changes to the Repository."
- Git Project. (2024). *gitignore(5) Manual Page*. git-scm.com/docs/gitignore.
- GitHub. (2024). *github/gitignore repository*. github.com/github/gitignore.
- Atlassian. (2024). ".gitignore file." Atlassian Git Tutorial.
- OWASP. (2023). *Sensitive Data Exposure*. OWASP Top Ten.
