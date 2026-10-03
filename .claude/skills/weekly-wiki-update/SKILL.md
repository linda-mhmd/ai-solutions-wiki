---
name: weekly-wiki-update
description: The weekly news and verification pass for ai-solutions.wiki. Research from primary sources, write three to five news entries, verify the pages the week's news affects, run the gates, and open a pull request. Never merges.
allowed-tools: Bash, Read, Write, Edit, Glob, Grep, WebSearch, WebFetch
---

# Weekly wiki update

You research, write and open a pull request. You never merge. Nothing reaches
the live site without a person reading it first, and that is the point of this
job rather than a limitation of it.

Write in English. No emoji. No em dashes and no en dashes: the content gate
fails a pull request over them. Never invent a figure, a date or a claim.

> **Where the rules live.** Linda keeps the readable version of this runbook in
> her Notion, on the "ai-solutions.wiki weekly update" page under the AI
> Solutions Wiki project. This file is the copy the automation actually follows,
> because the GitHub runner has no access to Notion. If the two ever disagree,
> her Notion page is the decision and this file is out of date; say so in the
> pull request rather than guessing which to follow.

## Scope of one run

- Three to five news entries under `content/news/`
- A verification pass on the pages the week's news affects: model tables,
  prices, availability, `last_verified`
- One `data/corrections.yaml` entry for everything the wiki had wrong, in
  public, newest first

Not in scope: new guides, new tool pages, restructuring. Those are their own
pull requests.

## The sourcing rules

Not negotiable, because accuracy is the only reason anyone trusts a wiki over a
search result.

1. **Primary source first.** The vendor's own release post, the model card, the
   official changelog, the CVE record, the court filing, the regulator's text.
   Not a roundup, not an aggregator, not another wiki.
2. **Date every source.** Publication date in the citation, and the date it was
   fetched where the page can change underneath.
3. **Attribute, do not assert.** A vendor benchmark is a vendor benchmark. Write
   "Anthropic reports", and say when a figure has not been reproduced
   independently.
4. **Say what is missing.** If a release post does not state a context window,
   the table cell says "not published". It never inherits the previous model's
   number and it never gets an estimate.
5. **Flag the implausible.** A benchmark jump too large to be a model
   improvement alone is worth one sentence saying so. Repeating a number without
   noticing it is strange is how wrongness spreads.
6. **Secondary sources are for colour and corroboration**, named as such, and
   never the only support for a factual claim.
7. **Arithmetic is allowed, inference is not.** Deriving a one-hour cache-write
   rate from a documented 2x rule is fine if you say so. Guessing a price is not.

## 1. Set up

```
HV=$(sed -n 's/^[[:space:]]*HUGO_VERSION:[[:space:]]*\([0-9.]*\).*/\1/p' .github/workflows/deploy.yml | head -1)
wget -qO /tmp/hugo.deb "https://github.com/gohugoio/hugo/releases/download/v${HV}/hugo_extended_${HV}_linux-amd64.deb"
sudo dpkg -i /tmp/hugo.deb
python3 -m pip install --quiet pyyaml
git config user.name "github-actions[bot]"
git config user.email "41898282+github-actions[bot]@users.noreply.github.com"
git checkout -b "news/$(date -u +%G)-w$(date -u +%V)-weekly-update"
```

## 2. Read what is already there

`ls content/news/` and grep for this week's topics. There are over a hundred
entries and duplicating one is worse than missing one. Note which existing
entries the new ones should link to under Further reading.

## 3. Research

Vendor newsrooms first: Anthropic, OpenAI, Google, Meta, Mistral, Alibaba,
Moonshot, DeepSeek, Z.ai. Then regulators and standards bodies, then CVE records
and security disclosures, then the press only for corroboration. Collect exact
figures, dates and URLs as you go, not afterwards.

Cross-check every claim against the wiki's own pages before writing it. The wiki
is a source about the past. A draft once claimed three vendors had converged on
a price that week; the repository's own `content/tools/openai-api.md` showed the
price had been in place for over a month.

## 4. Write

Entries follow the house shape: what happened, what is actually different, why
it matters for builders, then `## Sources` with at least two dated links, then
`## Further reading` with internal links. Front matter carries title,
description, date (the event date), lastmod, last_updated, last_verified
(today), categories, tags and related.

## 5. Verification pass

For each tool or comparison page the week's news affects: correct what is now
wrong, add the new model row, bump `last_updated`, `lastmod` and
`last_verified`, and add the new primary source to that page's source list. Add
one entry per correction at the TOP of `data/corrections.yaml`.

Never write a `last_verified` date onto a page you did not actually verify
against its primary source. `python3 ci/check_content.py --legacy-report` lists
the entries below the current bar; work two or three of them off properly on a
quiet week rather than stamping dates.

## 6. Gate it

```
hugo --gc --minify --cleanDestinationDir
CHANGED=$(git status --porcelain | awk '{print $2}' | grep '^content/.*\.md$' | tr '\n' ' ')
NEW=$(git status --porcelain | grep '^??' | awk '{print $2}' | grep '^content/.*\.md$' | tr '\n' ' ')
python3 ci/check_content.py --diff-base HEAD --new-files $NEW -- $CHANGED
python3 ci/check_links.py --site public --pages $CHANGED
```

The build must emit no warnings, deprecations or errors. The content gate must
report zero errors. The link check must report zero broken links on changed
pages. Fix and rerun if any fails. Never weaken a check to make it pass.

## 7. Commit and open the pull request

`rm -rf public resources` first so build output is not committed. Write a commit
message saying what each entry covers and what the verification pass corrected.

```
git add -A && git commit -F /tmp/commit-message.txt
git push -u origin HEAD
gh pr create --base main --title "..." --body-file /tmp/pr-body.md
```

The PR body lists every page added and every page changed with the reason, the
gate results with their real numbers, and anything found that needs a decision.
The review should be reading a summary, not a diff.

`pr-checks.yml` and `pr-preview.yml` then run on their own. The preview comment
carries the link. Do not wait for them.

## Hard limits

- Never merge, and never push to `main`.
- Never weaken, skip or edit a check to make a gate pass.
- Never write a `last_verified` date onto a page you did not verify.
- On a genuinely quiet week, three entries is a complete run. Padding with thin
  entries is worse than a short run.
