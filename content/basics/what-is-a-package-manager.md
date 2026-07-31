---
title: "What is a Package Manager?"
description: "npm, yarn, pip, cargo—package managers download and manage code libraries for you. The app store for code."
date: 2026-07-30
level: 1
categories: [Basics]
tags: [beginner, npm, yarn, pip, packages, dependencies, javascript, python]
faqs:
  - question: "Should I use npm or yarn?"
    answer: "For most projects, it doesn't matter much. npm comes with Node.js, so it's the default. yarn is slightly faster and has some extra features. Pick one and stick with it for a project—don't mix them. pnpm is another option that's faster and saves disk space."
  - question: "Why are there so many different package managers?"
    answer: "Different languages have different ecosystems. npm is for JavaScript/Node.js. pip is for Python. cargo is for Rust. Each language community built tools suited to their needs. Within a language, alternatives (npm vs yarn) emerged when people wanted improvements."
  - question: "Is it safe to install packages?"
    answer: "Mostly, but not blindly. Stick to popular, well-maintained packages. Check download counts and recent updates. Be careful with packages from AI suggestions—they might not exist (hallucination). Use `npm audit` to check for known vulnerabilities."
last_updated: 2026-07-30
---

{{< quickanswer >}}
A package manager downloads, installs, and manages code libraries (packages) for your project. Instead of copying code manually, you run `npm install axios` and the package manager handles everything—downloading the code, tracking the version, and managing updates. npm (JavaScript), pip (Python), and cargo (Rust) are the most common ones.
{{< /quickanswer >}}

## What package managers do

Without a package manager, to use someone else's code you'd have to:
1. Find the code
2. Download it
3. Put it in the right place
4. Update it manually when new versions come out
5. Track what version you're using
6. Repeat for every library

Package managers automate all of this:

```bash
npm install axios   # Downloads axios, tracks version in package.json
pip install flask   # Downloads Flask and its dependencies
cargo add serde     # Downloads serde crate
```

## The main package managers

### JavaScript/Node.js

**npm** (Node Package Manager)
- Comes with Node.js
- Most widely used
- Registry: npmjs.com

```bash
npm install package-name     # Install a package
npm install                  # Install all packages from package.json
npm uninstall package-name   # Remove a package
npm update                   # Update packages
npm run dev                  # Run scripts defined in package.json
```

**yarn**
- Alternative to npm
- Slightly faster
- Same registry as npm

```bash
yarn add package-name
yarn                         # Same as npm install
yarn remove package-name
```

**pnpm**
- Faster and uses less disk space
- Growing in popularity

```bash
pnpm install package-name
pnpm install
```

### Python

**pip**
- Comes with Python
- Registry: pypi.org

```bash
pip install package-name
pip install -r requirements.txt  # Install from file
pip uninstall package-name
pip freeze > requirements.txt    # Save installed packages
```

**poetry / pipenv**
- More modern Python package managers
- Better dependency resolution
- Built-in virtual environment management

### Others

| Language | Package Manager | Registry |
|----------|----------------|----------|
| Rust | cargo | crates.io |
| Go | go mod | proxy.golang.org |
| Ruby | gem / bundler | rubygems.org |
| PHP | composer | packagist.org |
| Java | maven / gradle | Maven Central |

## Key concepts

### package.json (JavaScript)

This file defines your project and its dependencies:

```json
{
  "name": "my-project",
  "version": "1.0.0",
  "scripts": {
    "dev": "next dev",
    "build": "next build"
  },
  "dependencies": {
    "react": "^18.2.0",
    "axios": "^1.6.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0"
  }
}
```

- **dependencies**: Packages needed to run your app
- **devDependencies**: Packages only needed during development (testing, building)
- **scripts**: Commands you can run with `npm run <script-name>`

### Lock files

Lock files record the exact versions installed:

| Manager | Lock file |
|---------|-----------|
| npm | package-lock.json |
| yarn | yarn.lock |
| pnpm | pnpm-lock.yaml |
| pip | requirements.txt or Pipfile.lock |

**Always commit lock files to Git.** They ensure everyone gets identical versions.

### Version numbers

Packages use semantic versioning: `MAJOR.MINOR.PATCH` (e.g., `2.3.1`)

- **MAJOR**: Breaking changes (2.x → 3.x might break your code)
- **MINOR**: New features, backwards compatible (2.3 → 2.4)
- **PATCH**: Bug fixes (2.3.0 → 2.3.1)

In package.json, prefixes control what gets installed:

| Prefix | Meaning | Example |
|--------|---------|---------|
| `^` | Compatible updates | `^2.3.0` installs 2.x.x (not 3.0.0) |
| `~` | Patch updates only | `~2.3.0` installs 2.3.x (not 2.4.0) |
| none | Exact version | `2.3.0` installs exactly 2.3.0 |

### node_modules

When you run `npm install`, packages go into the `node_modules` folder. This folder:
- Can be huge (hundreds of MB)
- Contains thousands of files
- Should NOT be committed to Git
- Can be regenerated anytime from package.json + lock file

Add to `.gitignore`:
```
node_modules/
```

## Common workflows

### Starting a new project

```bash
# JavaScript
npm init -y                  # Creates package.json
npm install react next       # Install packages

# Python
python -m venv venv          # Create virtual environment
source venv/bin/activate     # Activate it (Mac/Linux)
pip install flask            # Install packages
pip freeze > requirements.txt
```

### Cloning an existing project

```bash
git clone https://github.com/user/repo.git
cd repo

# JavaScript
npm install                  # Installs everything from package.json

# Python
pip install -r requirements.txt
```

### Adding a package

```bash
# JavaScript (production dependency)
npm install axios

# JavaScript (dev dependency)
npm install -D typescript

# Python
pip install requests
```

### Updating packages

```bash
# See what's outdated
npm outdated

# Update all
npm update

# Update a specific package
npm install axios@latest
```

### Removing a package

```bash
npm uninstall axios
pip uninstall requests
```

## Common problems

### "npm install" fails

```bash
# Delete and reinstall
rm -rf node_modules package-lock.json
npm install

# If it's a permissions issue (Mac/Linux)
sudo chown -R $(whoami) ~/.npm
```

### Wrong Node version

Some projects need specific Node versions. Use nvm (Node Version Manager):

```bash
# Install nvm, then:
nvm install 18
nvm use 18
```

### Conflicting dependencies

```bash
npm install --legacy-peer-deps
# or
npm install --force
```

### Python virtual environment issues

Always use virtual environments to avoid conflicts:

```bash
# Create
python -m venv venv

# Activate (Mac/Linux)
source venv/bin/activate

# Activate (Windows)
.\venv\Scripts\activate

# Now pip installs go to this environment only
pip install flask
```

## The registry

Packages live in registries:

- **npmjs.com**: Browse JavaScript packages
- **pypi.org**: Browse Python packages
- **crates.io**: Browse Rust packages

Before installing a package, check:
- Download count (popular = probably safe)
- Last updated (actively maintained?)
- GitHub stars and issues
- Security advisories

## Package manager commands cheat sheet

| Task | npm | yarn | pip |
|------|-----|------|-----|
| Install all | `npm install` | `yarn` | `pip install -r requirements.txt` |
| Add package | `npm install pkg` | `yarn add pkg` | `pip install pkg` |
| Add dev package | `npm install -D pkg` | `yarn add -D pkg` | (no distinction) |
| Remove | `npm uninstall pkg` | `yarn remove pkg` | `pip uninstall pkg` |
| Update all | `npm update` | `yarn upgrade` | `pip install --upgrade -r requirements.txt` |
| Run script | `npm run dev` | `yarn dev` | N/A |
| List installed | `npm list` | `yarn list` | `pip list` |
| Check outdated | `npm outdated` | `yarn outdated` | `pip list --outdated` |

## Further reading

- [What is a dependency?](/basics/what-is-a-dependency/): Understanding what gets installed
- [Common error messages explained](/basics/common-error-messages-explained/): When npm fails
- [What is an environment variable?](/basics/what-is-an-environment-variable/): Configuration alongside packages
