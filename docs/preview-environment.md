# The preview environment

Every pull request gets its own full build of the wiki at a public URL, so a new
version can be reviewed from a phone before anything reaches the live domain.

```
live     https://ai-solutions.wiki                                  main, deploy.yml
preview  https://linda-mhmd.github.io/ai-solutions-wiki-preview/pr-<N>/   any open PR
```

## Why a second repository

GitHub serves one Pages site per repository, so the repo that serves
`ai-solutions.wiki` cannot also serve previews. An account can run any number of
project sites, one per repo, which is what this uses.

The live custom domain is not affected. Domain inheritance only applies when a
custom domain is set on the *user* site, `linda-mhmd.github.io`, which does not
exist on this account (it returns 404). Several project sites on this account
already serve at `linda-mhmd.github.io/<repo>/` while this repo serves its own
domain, so the arrangement is already proven here.

## One-time setup

```
bash ci/setup-automation.sh
```

That is the whole thing. It uses the `gh` you are already logged in to and
creates nothing by hand: the preview repo, Pages on `main` at root, an ed25519
deploy key scoped to that one repo, the public half registered there with write
access, the private half stored here as the `PREVIEW_DEPLOY_KEY` secret, and
both halves wiped from disk. It is safe to run twice.

A deploy key rather than a personal access token on purpose: a deploy key can
push to exactly one repository and can do nothing else. It cannot read your
other repos, cannot open pull requests, and cannot act as you. There is also no
expiry to remember.

Until the secret exists, `pr-preview.yml` logs a warning and skips. It never
fails a PR over a missing preview.

### Why not the live Pages site

Previews under `ai-solutions.wiki/preview/pr-<N>/` would need no second repo and
no secret, and it is still the wrong answer. GitHub restricts the `github-pages`
environment to the default branch, so a pull request cannot deploy there without
loosening a protection rule. And with one Pages site per repo, every deploy
replaces the whole site, so a preview build would share a blast radius and a
domain with the live wiki. A broken preview should not be able to touch
production, and preview pages should not be duplicate content on the domain that
has to rank.

## What the workflow does

On open, push and reopen, for branches in this repo:

1. Builds with Hugo 0.165.0, the same version `deploy.yml` uses, with
   `--baseURL` pointed at the preview path so every link resolves.
2. Builds the Pagefind index, so search works in the preview.
3. Injects `<meta name="robots" content="noindex,nofollow">` into every built
   page, and fails if the injection did not take.
4. Pushes the build into `pr-<N>/` in the preview repo.
5. Posts, or updates, one comment on the PR with the links.

On close it deletes `pr-<N>/` and updates the preview repo's README index.

### Why noindex instead of robots.txt

On a project site, `robots.txt` is served at
`linda-mhmd.github.io/ai-solutions-wiki-preview/robots.txt`. Crawlers only read
`robots.txt` at a domain root, and this account has no user site to put one in.
Without the injected meta tag, previews would be crawlable duplicates of the
live wiki, which is an SEO problem for the live site rather than a cosmetic one.

### Fork pull requests

The publish job is skipped for PRs from forks, because secrets are not available
to them. `pr-checks.yml` still runs: build, content gate, link check, secret
scan and workflow audit. Fork reviewers get the build artifact rather than a
URL.

## Checks that run on every PR

`pr-checks.yml`, three jobs:

| Job | What fails it |
|---|---|
| Build and content gate | hugo errors, or any warning or deprecation; front matter, date, sourcing or house-style violations on changed content; an internal link on a changed page that the build did not produce |
| Secret scan | gitleaks finding anything in history or the working tree |
| Workflow audit | zizmor findings on the workflow files |

The content gate is `ci/check_content.py`. It is arithmetic and pattern
matching, no model judges the writing. Structural rules (front matter, dates,
`## Sources`, `last_verified`) apply to the whole changed file. Style rules
(em dashes, en dashes, filler openers, marketing words) apply only to the lines
a PR adds, because the repo carries a legacy backlog:

```
python3 ci/check_content.py --backlog
```

at the time of writing reports 3,766 em dashes and 456 en dashes across 402
files. Clearing that is its own pull request, not a blocker on new content.

## Running the checks before you push

```
make preflight                      # toolchain, zero-warning build, zizmor, gitleaks
hugo --gc --minify
python3 ci/check_content.py --diff-base origin/main $(git diff --name-only origin/main -- 'content/**/*.md')
python3 ci/check_links.py --site public --pages $(git diff --name-only origin/main -- 'content/**/*.md')
```
