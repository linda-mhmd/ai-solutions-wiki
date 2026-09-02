---
title: "Audit, Rebuild, Recover: Repo Hygiene When AI Agents Touch Your Code"
description: "How to audit a codebase on a schedule, rebuild your whole toolchain on a new machine from one command, and understand which things a fresh git clone can never give you back — Terraform state and your .env among them."
date: 2026-09-02
lastmod: 2026-09-02
last_updated: 2026-09-02
categories: [Guides]
tags: ["tooling", "auditing", "reproducibility", "backups", "terraform", "secrets", "ai-agents", "devsecops"]
related:
  - guides/set-up-your-computer-for-building
  - guides/secrets-management-ai
  - guides/everything-as-code
  - basics/what-are-backups
---

There are three moments when a project's hygiene gets tested, and they are usually the same three surprises. An audit you have been meaning to run turns out to have been silently passing for months. A new laptop arrives and nobody remembers how the old one was set up. And something that only ever existed in one place — a Terraform state file, a `.env` — is gone, and no amount of `git clone` brings it back.

AI agents make all three arrive sooner. Not because agents are careless, but because they change more files per hour than you do, they are confident about changes they cannot verify, and **they cannot see the files you told git to ignore**. This guide covers the three practices that hold up under that: auditing on a schedule, rebuilding from one command, and knowing precisely which things are unrecoverable.

## The one idea

> If it is not in the repo, it does not exist — and the small set of things that genuinely cannot be in the repo must be somewhere durable, with a written recovery path.

Everything below is an application of that sentence.

## Part 1: Audit on a schedule, not on a feeling

The failure mode is not "we never audit." It is "we audit by remembering to," which decays, and then it is "our audit passes," which is worse when the audit is broken.

### Put the gate in a command

Auditing you do by hand does not survive contact with a busy week. Put every check behind one target so there is exactly one thing to remember:

```makefile
preflight: doctor check audit secrets ## Full pre-push gate
	@echo ">> preflight passed"
```

Then the instruction to a human, to a new joiner, and to an AI agent is identical: *run `make preflight` before you push.* An agent can run it, read the failure, and fix it. A paragraph in a README describing what you ought to check cannot be executed by anybody.

### Make sure the gate can actually fail

This is the one that bites. A check that cannot fail is worse than no check, because it manufactures confidence.

Here is a real example from this wiki's own Makefile. The build gate captured Hugo's output and grepped it for problems:

```makefile
check:
	@out=$$(hugo --gc --minify 2>&1); echo "$$out"; \
	if echo "$$out" | grep -iqE 'warn|deprecat|error'; then \
		echo ">> FAIL"; exit 1; \
	else echo ">> OK: clean build"; fi
```

On a machine where Hugo was not installed, the shell printed `hugo: command not found` — which contains no "warn", no "error", no "deprecat". The grep found nothing. The gate printed **`>> OK: clean build`** and exited zero. It had never built anything.

Two bugs, one lesson. The check ignored the command's **exit code**, and it never verified its **tools were present**. The fix:

```makefile
check:
	@command -v hugo >/dev/null 2>&1 || { echo ">> missing: hugo"; exit 1; }
	@out=$$(hugo --gc --minify 2>&1); rc=$$?; \
	echo "$$out"; \
	if [ $$rc -ne 0 ]; then echo ">> FAIL: hugo exited $$rc"; exit 1; fi; \
	if echo "$$out" | grep -iqE 'warn|deprecat|error'; then \
		echo ">> FAIL: warnings found"; exit 1; fi; \
	echo ">> OK: clean build"
```

**Test your gates by breaking things on purpose.** Rename the binary, introduce a deliberate warning, drop a fake credential into a file. If the gate stays green, it is decoration. This takes ten minutes and is the highest-value thing in this guide.

### What to actually audit

| Check | Catches | Cadence |
|---|---|---|
| Build with warnings-as-failure | Deprecations before they become breakage | Every push |
| Secret scan, history **and** working tree | Credentials committed or about to be | Every push |
| CI workflow audit | Over-broad permissions, unpinned actions, injection | Every push |
| Dependency vulnerability audit | Known CVEs in your tree | Weekly + every push |
| Toolchain drift (local vs CI) | "Works on my machine" | Every push |
| Dependency freshness | How far behind you are | Monthly |

Concretely, for most stacks: `npm audit` / `pip-audit` / `cargo audit` for dependencies; [gitleaks](https://github.com/gitleaks/gitleaks) for secrets; [zizmor](https://docs.zizmor.sh/) for GitHub Actions; and your build tool run with warnings escalated.

### Tune the scanner instead of ignoring it

Secret scanners produce false positives, and the tempting fix is a broad exclusion. Resist it.

This repo's scan flagged five "leaked keys," all of them teaching placeholders like `sk-proj-abc123xyz789` inside tutorial code blocks captioned *"WRONG — never do this."* Genuinely false positives. The tempting fix:

```toml
# DON'T: silences every future real key in these files too
[[allowlists]]
paths = ['''content/basics/.*\.md''']
```

The safe fix matches **the placeholder itself**, not the location:

```toml
# DO: only the literal abc123 placeholders are exempt
[[allowlists]]
description = "Placeholder keys in tutorials that demonstrate what NOT to do"
regexes = ['''(?i)sk[-_](proj|live|test)?[-_]?abc123[a-z0-9]*''']
```

Then **prove it**: drop a realistic fake key into one of those same files and confirm the scanner still reports it. When that test was run here, the path-based version silently swallowed it — which is exactly how an allowlist written in a hurry turns into a permanent blind spot.

### Watch for drift between your machine and CI

The subtlest audit finding is a version mismatch. If CI builds with Hugo 0.164.0 and your laptop has 0.165.0, your green local build is evidence about a configuration nobody ships. Read the pinned version out of the CI config rather than duplicating it, so the two cannot diverge:

```makefile
WORKFLOW := .github/workflows/deploy.yml
CI_HUGO_VERSION := $(shell sed -n 's/^[[:space:]]*HUGO_VERSION:[[:space:]]*\([0-9.]*\).*/\1/p' $(WORKFLOW) | head -1)
```

and fail `make doctor` when the local version differs. Resolve drift deliberately — either pin your machine down, or upgrade CI *after* verifying a clean build on the new version. Do not let it sit.

## Part 2: Rebuilding on a new machine

The test of a repo's setup story is a machine you have never used, with no backup and no access to the old one. Can you get to a passing build?

### One command to install, one to verify

Two targets, kept separate on purpose:

```makefile
install:  ## Install the toolchain (new machine)
	brew install hugo gitleaks zizmor

doctor:   ## Verify what is installed, and that it matches CI
```

`install` changes your machine. `doctor` only reports — which version of each tool, whether it is the right build variant, and whether it matches CI. Keeping them separate means you can run `doctor` any time without side effects, and it becomes the first step of every debugging session: *is my toolchain actually what I think it is?*

Make `doctor` specific. "hugo: found" is nearly useless. "hugo 0.165.0, but CI builds with 0.164.0, and this is the extended build as required" tells you what to do next.

### The order that works

1. **Package manager first** (Homebrew, apt, winget). See [Set up your computer for building](/guides/set-up-your-computer-for-building/) if this is new.
2. **`git clone`** the repo — it should carry its own setup instructions.
3. **`make install`**, or whatever the repo calls its bootstrap.
4. **`make doctor`** to verify, including version drift.
5. **`make preflight`** — if the gate passes on a clean machine, the setup story is real.
6. **Restore the things git could not carry.** This is Part 3, and it is where people get stuck.

### Pin versions, and say where the pin lives

"Install Node" is not a setup instruction. `.nvmrc`, `.tool-versions`, `engines` in `package.json`, a pinned `HUGO_VERSION` in CI — one file that names the version, referenced everywhere else. A toolchain that resolves to "whatever was latest the day you ran it" is not reproducible, it is just currently working.

## Part 3: What a fresh clone cannot give you back

Steps 1 to 5 are solved problems. Step 6 is where projects actually die. Sort everything your project depends on into three buckets:

| Bucket | Examples | Recovery |
|---|---|---|
| **Reproducible** | source, config, IaC, lockfiles, CI | `git clone` |
| **Recoverable** | Terraform state, secrets, databases, uploaded files | Only if you set up durable storage *in advance* |
| **Irrecoverable** | anything that exists in exactly one place | Nothing. Move it to bucket two today. |

The dangerous bucket is the third, and things end up there by default rather than by decision.

### Terraform state: the classic irrecoverable

Terraform state is a JSON file recording the mapping between your configuration and the real resources it created. HashiCorp is explicit that "Terraform uses state to determine which changes to make to your infrastructure." It stores resource identity and metadata — which real S3 bucket, which specific VM, corresponds to which block in your `.tf` files.

If `terraform.tfstate` lives only on your laptop and the laptop dies, **your infrastructure keeps running and Terraform loses all knowledge of it**. You have not lost the servers; you have lost the map. Concretely:

- The next `terraform apply` sees zero managed resources and tries to **create everything again** — duplicate resources, or errors on names that already exist.
- A `terraform destroy` intended as cleanup destroys nothing, because it believes it manages nothing.
- Recovery means `terraform import` (or `import` blocks, Terraform 1.5+) for **every resource, one at a time**, matching each real cloud ID to the right address by hand. For a real estate this is days of work and is easy to get subtly wrong.

The fix is a remote backend, and it must be set up *before* you need it:

```hcl
terraform {
  backend "s3" {
    bucket       = "my-tfstate"
    key          = "prod/terraform.tfstate"
    region       = "eu-central-1"
    encrypt      = true
    use_lockfile = true   # native S3 locking, Terraform 1.10+
  }
}
```

Three properties matter, and people commonly configure only the first:

1. **Durability** — the state lives in object storage, not on a laptop.
2. **Versioning** — enable **S3 bucket versioning**. A corrupted or truncated state is at least as common as a lost one, and versioning is what lets you roll back to yesterday's.
3. **Locking** — prevents two applies writing state at once and corrupting it. Terraform 1.10 added native S3 locking via `use_lockfile = true`, which writes a `.tflock` file beside the state; the older `dynamodb_table` argument is deprecated and slated for removal.

And do **not** commit state to git. HashiCorp warns against storing state in version control "because doing so can result in data loss or exposure of secrets stored in the state file" — state routinely contains secrets in plaintext, whatever your configuration does.

### The missing `.env`

The other classic: a project that runs fine for months, then a new machine, and nothing starts. `.env` is in `.gitignore` — correctly, because it holds secrets — so a fresh clone has no configuration at all, and no record of what configuration it *needed*.

The mistake is treating one file as both "the secret values" and "the list of required settings." Split them:

- **Commit `.env.example`** with every key present and the values blanked or made obviously fake. It is documentation that cannot drift, because a missing key breaks startup for everyone.
- **Fail loudly at startup** on a missing variable, naming it. A clear "`DATABASE_URL` is not set" beats a null-pointer twenty frames deep.
- **Keep real values in a secret manager** — 1Password, Vault, AWS Secrets Manager, SSM Parameter Store, your CI's encrypted secrets. That, not your laptop, is the source of truth. See [Secrets management for AI systems](/guides/secrets-management-ai/).
- **Commit non-secret config properly.** Ports, feature flags, region names and endpoints are not secrets. They belong in a checked-in config file, not smuggled into `.env` where they vanish with it.

The [twelve-factor](/glossary/twelve-factor-app/) rule of thumb: config that varies between environments comes from the environment; the *schema* of that config lives in the repo.

### Run the drill

A backup you have never restored is a hypothesis. Once a quarter, on a scratch machine or a clean container: clone, bootstrap, restore config from the secret manager, point at a non-production backend, and bring the thing up. Write down every step you needed that was not already documented — that list *is* the gap. See [Disaster recovery for AI systems](/guides/disaster-recovery-ai/) for the same discipline applied to models, vector indexes, and feature stores.

## Part 4: What changes when an AI agent is doing the work

Everything above is ordinary good practice. Agents raise the stakes in four specific ways.

**Volume.** An agent can touch forty files in a session. Review capacity, not generation capacity, is now your bottleneck — which is precisely why the gate has to be a command the agent runs itself, not a habit you maintain.

**Confident, unverified changes.** An agent that cannot run your build will still tell you the change is fine. This is not dishonesty; it is the absence of feedback. Give agents the ability to run the gate and they will catch their own mistakes; withhold it and you have outsourced authorship while keeping all the verification.

**Agents cannot see what git ignores.** This is the sharpest one. Your agent does not read `.env`. It does not see `terraform.tfstate`. It will refactor a config loader without knowing which variables are actually set in production, and it will be entirely plausible about it. Keep a committed `.env.example` and a documented config schema **for the agent's benefit as much as your own** — you are giving it the map it otherwise lacks.

**Agents generate realistic-looking secrets.** Placeholder credentials in examples, fixtures, and docs will trip your scanner — as they did here. Tune with narrow, pattern-based allowlists and re-test, or you will be taught to ignore the scanner.

**One hard rule:** never let an agent run a destructive state operation unattended. `terraform apply` in production, `terraform state rm`, `DROP TABLE`, `git push --force`, `rm -rf`. Not because agents are uniquely dangerous, but because these are the operations where no gate exists downstream to catch the error. Require confirmation, and make sure the thing being confirmed is legible.

## The checklist

**Weekly, automated**
- [ ] Dependency vulnerability audit; patch and minor fixes applied
- [ ] Secret scan over history and working tree
- [ ] CI workflow audit

**Every push, via one command**
- [ ] Toolchain present and matching CI (`doctor`)
- [ ] Build clean, warnings treated as failures, **exit code checked**
- [ ] No new secrets

**Monthly**
- [ ] Dependency freshness: how far behind are the direct deps?
- [ ] Are pinned CI action SHAs still current?
- [ ] Deliberately break each gate and confirm it fails

**Quarterly**
- [ ] Full rebuild on a clean machine or container
- [ ] Restore config from the secret manager, not from a laptop
- [ ] Confirm remote state has durability, versioning **and** locking
- [ ] Confirm nothing critical sits in exactly one place

## Further reading

- [Set up your computer for building](/guides/set-up-your-computer-for-building/): the ground-floor version of Part 2.
- [Secrets management for AI systems](/guides/secrets-management-ai/): where the real values should live.
- [What are backups?](/basics/what-are-backups/): the concept underneath Part 3.
- [Disaster recovery for AI systems](/guides/disaster-recovery-ai/): RTO, RPO, and restoring model artefacts and indexes.
- [Everything as code](/guides/everything-as-code/): why the repo is the source of truth.
- [Working with multiple environments](/guides/working-with-multiple-environments/): promoting one artefact across environments.
- [GitHub Actions security](/guides/github-actions-security/): pinning, permissions, and what zizmor looks for.
- [Infrastructure as code](/glossary/infrastructure-as-code/): the practice Terraform state belongs to.
- [The twelve-factor app](/glossary/twelve-factor-app/): the config rule quoted above.
- [AI supply chain security](/patterns/ai-supply-chain-security/): auditing what you depend on.

## Sources

1. HashiCorp, "State" (Terraform language documentation): [https://developer.hashicorp.com/terraform/language/state](https://developer.hashicorp.com/terraform/language/state)
2. HashiCorp, "Backend Type: s3" (native locking via `use_lockfile`, deprecation of `dynamodb_table`): [https://developer.hashicorp.com/terraform/language/backend/s3](https://developer.hashicorp.com/terraform/language/backend/s3)
3. HashiCorp, "Import" and `import` blocks: [https://developer.hashicorp.com/terraform/language/import](https://developer.hashicorp.com/terraform/language/import)
4. AWS Prescriptive Guidance, "Backend best practices" for the Terraform AWS provider: [https://docs.aws.amazon.com/prescriptive-guidance/latest/terraform-aws-provider-best-practices/backend.html](https://docs.aws.amazon.com/prescriptive-guidance/latest/terraform-aws-provider-best-practices/backend.html)
5. gitleaks, configuration and allowlists: [https://github.com/gitleaks/gitleaks](https://github.com/gitleaks/gitleaks)
6. zizmor, GitHub Actions static analysis: [https://docs.zizmor.sh/](https://docs.zizmor.sh/)
7. The Twelve-Factor App, "Config": [https://12factor.net/config](https://12factor.net/config)
8. GitHub, "Security hardening for GitHub Actions": [https://docs.github.com/en/actions/security-for-github-actions/security-guides/security-hardening-for-github-actions](https://docs.github.com/en/actions/security-for-github-actions/security-guides/security-hardening-for-github-actions)
