---
title: "Pin a Shared Theme to a Commit: A Case Study of Seven Sites and One Theme"
description: "One Hugo theme, seven public sites, each pinned to an exact theme commit. Twelve weeks of git history show what the pin bought (no surprise changes), what it cost (one failed build, two sites that still lack a fix), and why the same rule applies to model IDs and prompts."
date: 2026-11-13
lastmod: 2026-11-13
last_updated: 2026-11-13
last_verified: 2026-11-13
categories: [Blog]
tags: [dependencies, version-pinning, git-submodules, hugo, reproducibility, supply-chain, case-study]
submitted_by:
  name: "mzzavaa"
  url: "https://mzzavaa.com/"
  source: "https://mzzavaa.com/repos/mzzavaa/incredible-consulting-com/"
  source_label: "incredible-consulting.com repo note on mzzavaa.com"
related:
  - basics/what-is-a-dependency
  - software-engineering/version-control-fundamentals
  - glossary/semantic-versioning
  - glossary/supply-chain-security
  - patterns/model-versioning
  - patterns/ai-supply-chain-security
---

*A note built on a field observation. The learning was submitted by mzzavaa, from the review of a small consulting site: "Pin a shared theme to a commit, so each site upgrades when it chooses to." The repository facts below were read from public git history and deploy logs on 13 November 2026. The literature is cited, and where a claim is a judgement it is labelled as one.*

## Summary

**Question.** When several sites share one theme, should each site record the exact theme commit it builds against, or always build against the newest one?

**Setting.** One public Hugo theme, consumed as a git submodule by seven public sites, observed from 24 August to 13 November 2026.

**Findings.**

1. No theme change reached any site without a commit in that site's own repository. Each of the 20 upgrades is a reviewable one-line change.
2. The pin failed loudly once. A site pushed content that needed a newer theme than its pin recorded. The build stopped, the live site kept its previous version, and the fix took nine minutes.
3. The pin has a carrying cost. Ten weeks after the theme fixed a navigation defect, two of the seven sites still build against a commit that predates the fix.

**Conclusion.** Pinning moves the upgrade decision from the theme author to each site owner. That is the whole benefit, and it is also the whole cost: a decision that is nobody's routine does not get made. Pin, and schedule the upgrade.

## Background: what a pin is

A dependency can be referenced in two ways. A floating reference names something that moves: a branch, a version range, a tag. A pinned reference names something that cannot move: a content hash.

A git submodule is pinned by construction. The parent repository does not store the theme's files. It stores one tree entry, called a gitlink, which "contains the object name of the commit that the superproject expects the submodule's working directory to be at" [1]. Running `git submodule update` checks out "the commit recorded in the superproject", and only the `--remote` flag swaps that for the tip of the theme's branch [2]. Hugo's own quick start installs a theme this way [4]. Hugo Modules offer the same property through a different mechanism, with `go.mod` and `go.sum` "storing version and checksum data" [5].

The property that matters is the one the reproducible builds project defines: "A build is reproducible if given the same source code, build environment and build instructions, any party can recreate bit-by-bit identical copies of all specified artifacts" [6]. SLSA version 0.1 states the precondition: dependencies "fully declared up front with immutable references" [7]. A branch name is not an immutable reference. A commit hash is.

## Method

The data is the public git history of eight repositories under `github.com/mzzavaa`: the theme, `incredible-theme`, and seven sites that mount it at `themes/incredible`. A private portfolio repository that holds a plain copy of the theme is excluded.

For each site, the gitlink recorded on the default branch was read with `git ls-tree`, and the number of commits that changed it was counted with `git log -- themes/incredible`. For the theme, every commit message and diff size was read. For `incredible-consulting.com`, the deploy history was read from GitHub Actions. All readings were taken on 13 November 2026.

This is an observational case study of one small system with one maintainer. It supports claims about mechanism. It does not support claims about how often anything happens elsewhere.

## Observations

### The theme changed seven times

| Commit | Date | Change | Size |
|---|---|---|---|
| `28ee9a8` | 24 Aug | Initial theme | 40 files |
| `c01379b` | 24 Aug | Imprint shortcode, conditional footer links | 3 files |
| `ec9261a` | 24 Aug | Fix: "a nested */ closed the template comment early" | 1 line |
| `f27a218` | 24 Aug | Privacy shortcode | 1 file |
| `67b105f` | 4 Sep | Shared image library, navigation fix, image quality fix | 33 files |
| `36f6a86` | 7 Sep | Homepage hero reads a plain `image` parameter | 1 file |
| `07cff7d` | 25 Oct | Ignore local secret and cache files | 1 file |

Two details matter for the argument. Commit `c01379b` contained a defect in a shortcode added by that commit, repaired one commit later; no site ever recorded `c01379b` as its pin. Commit `67b105f` is not a small change: it rewrites how the navigation decides which entry is current, and how every image is resized.

### Seven sites, two theme versions, at the same moment

| Site | Pinned theme commit | Pins recorded | Last site commit |
|---|---|---|---|
| incredible-company.com | `f27a218` (24 Aug) | 3 | 24 Aug |
| incredible.community | `f27a218` (24 Aug) | 3 | 24 Aug |
| incredible-consulting.com | `36f6a86` (7 Sep) | 5 | 13 Nov |
| incredible-consulting.org | `36f6a86` (7 Sep) | 4 | 25 Oct |
| incredible.builders | `36f6a86` (7 Sep) | 4 | 25 Oct |
| incredible.training | `36f6a86` (7 Sep) | 4 | 25 Oct |
| incredibleconsulting.org | `36f6a86` (7 Sep) | 4 | 25 Oct |

"Pins recorded" counts the commits in each site that set the gitlink, including the first.

On 13 November two versions of one theme are in production. No site points at the newest theme commit, and for the five sites on `36f6a86` that costs nothing, because the only commit they lack changes a `.gitignore` file and no rendered output.

Across the seven sites the pin was recorded 27 times: seven first installs and 20 upgrades. Every one is a commit in the site's own history, with a date, an author and a message.

The sites did not upgrade together, and they did not all take the same path. `incredible-consulting.com` took theme commit `67b105f` on the day it was written, because its new pages needed it. Four other sites never recorded `67b105f` at all: they stayed on `f27a218` until 25 October and then moved straight to `36f6a86`. Two have not moved since August. That spread is the learning in one table: each site upgraded when it chose to.

### One build failed, and it failed safely

On 4 September 2026 at 12:10 UTC, `incredible-consulting.com` pushed a content commit. Its pages referenced an icon partial and 26 images that exist only from theme commit `67b105f` onward. The site's gitlink still recorded `f27a218`. The build failed "on the first missing partial", in the words of the commit that repaired it. That commit moved the pin and nothing else, and its deploy succeeded at 12:19 UTC.

Three things made this a nine-minute event and not an outage. The workflow checks out submodules at the recorded commit. The build runs with `--panicOnWarning`, so a missing template is an error and not a blank space on a page. And the deploy job depends on the build job, so a failed build publishes nothing and the previous version of the site stays up.

### Two sites still lack a fix

Theme commit `67b105f` states that the navigation "never highlighted the current page, on any site in the family", and fixes it. Seventy days later, `incredible-company.com` and `incredible.community` still pin `f27a218`. Neither repository has had a commit since 24 August. By the theme's own account, both still ship the defect.

## Analysis

### What the pin bought

**Upgrades became reviewable events.** With a floating reference, the event "the theme changed under this site" leaves no trace in the site's repository. The site's history shows nothing, and its output differs. With a pin, the same event is a one-line diff that can be reviewed, tested, reverted, and found later with `git bisect`.

**A defective theme commit could not propagate on its own.** The theme history contains a commit that needed a repair one commit later, and a 33-file commit that changed navigation and image handling for every consumer. Under a floating reference, each of those would have reached all seven sites at their next build, including sites nobody was looking at that week. This is a counterfactual, and it is offered as a judgement: nothing was measured, because no site floats.

**The legal pages are the sharpest example.** The theme carries the shared imprint and privacy shortcodes, and the privacy text describes what the built site does: no cookies, no analytics, no forms. Its commit message warns that adding any of those "makes this text wrong". A site that builds against a moving theme can have its legal text or its behaviour changed by a commit its owner never saw. A pinned site cannot.

### What the pin cost

**Coordination.** The failed build is the cost in its purest form. Content and theme are two repositories, and the pin is the only thing that says which pair belongs together. Forgetting to move it breaks the build. This cost is real and it is also the mechanism working: the failure named a missing file, at build time, before publication.

**Lag.** The research literature calls the distance between the version in use and the newest version technical lag, and it is the standard objection to pinning. Kula and colleagues studied more than 4,600 GitHub projects and found that "81.5% of the studied systems still keep their outdated dependencies" [12]. Cox and colleagues, on 75 industry systems, found those with outdated dependencies about four times as likely to have security issues [13]. The two quiet sites in this case study are a small instance of the same pattern: nothing forces the upgrade, so it does not happen.

### The strongest counter-argument

He, Vasilescu and Kästner titled a 2025 paper "Pinning Is Futile" [11]. Simulating a year of npm dependency resolution, they found that pinning direct dependencies raises the cost of staying current and, in large dependency graphs, can increase exposure to malicious updates, because the transitive dependencies still float. Their threshold is 498 or more dependencies. Their recommendation is not to float. It is to "freeze their entire dependency graph with a shared lock file".

That result does not transfer to this case as an argument against the pin, for a structural reason: this theme has no dependencies of its own, so one commit hash freezes the entire graph. In their terms a submodule gitlink behaves like a lock file, not like a pinned version range. That reading is an inference from the paper, not a statement in it. Their cost finding does transfer unchanged, and the two lagging sites confirm it.

### Why not trust version numbers instead

A common middle path is to float within a version range and rely on semantic versioning, where a minor release adds functionality "in a backward compatible manner" [8]. The evidence on whether releases keep that promise is mixed. Raemaekers, van Deursen and Visser found that in Maven Central "around one third of all releases introduce at least one breaking change", with almost no difference between major and minor releases [9]. A 2021 replication by Ochoa and colleagues, with a different method, found 83.4 percent of upgrades compliant [10]. Both studies concern Java libraries with declared APIs. A theme has no declared API at all: every template, class name and parameter is a surface a site may depend on. This theme also publishes no version tags, so a commit hash is the only stable name available.

### The same rule, one layer down

The deploy workflow of the same site pins each GitHub Action to a full commit hash and pins the Hugo version. GitHub's guidance explains why a hash and not a tag: "a tag can be moved or deleted if a bad actor gains access to the repository storing the action" [14]. That happened in March 2025, when attackers "retroactively modified multiple version tags to reference a malicious commit" in the `tj-actions/changed-files` action [15]. According to the security vendor Wiz, which is a secondary source, workflows pinned to a known-good hash were not affected unless the pin had been moved to the malicious commit during the attack window [16]. OpenSSF Scorecard checks for hash pinning for the same reason [17], and He and colleagues argue it should not be scored at all [11]. The disagreement is about what pinning proves, not about whether a tag can move.

## Why this belongs on a wiki about AI systems

The pattern is not about themes. Any system that consumes something another party can change has the same choice, and AI systems consume several such things:

- **Model identifiers.** An alias that resolves to "the latest model" is a floating reference. A dated model ID is a pin. See [model versioning](/patterns/model-versioning/), which also covers the lag side: a pinned model still reaches end of life.
- **Prompts and evaluation sets.** A prompt template read from a branch can change between an evaluation and a deployment. One read from a commit cannot.
- **Packages and model weights.** [AI supply chain security](/patterns/ai-supply-chain-security/) covers hash verification for both.

In each case the trade is the one measured here: a pin converts silent change into a visible decision, and a visible decision needs an owner.

## Recommendations

These follow from the observations and are judgements, not measurements.

1. **Pin shared code to a commit hash**, not a branch and not a tag.
2. **Move the pin in its own commit**, with a message that names what the new version brings. Those commits are why this case study could be written.
3. **Make the build fail when the pin is wrong.** Treat warnings as errors and let deployment depend on the build. A wrong pin should cost minutes, not a broken page.
4. **Schedule the upgrade.** A pin without a review date is how two of seven sites came to lack a ten-week-old fix. A calendar entry, or a bot that opens a pull request for a person to review, both work.
5. **Write down which sites are on which version.** The table above took four commands to produce and did not exist before this note.
6. **Freeze the whole graph.** If the pinned thing has dependencies of its own, a pin on the top level alone is the case the literature warns about [11]. Use a lock file.

## Limitations

- One theme, seven sites, one maintainer, twelve weeks. Nothing here estimates frequency.
- The counterfactual, what a floating reference would have broken, is reasoned and not observed.
- The claim that two sites still show the navigation defect rests on the theme's commit message and the recorded pins. The rendered pages were not inspected.
- The private portfolio repository was not included.
- Figures quoted from the literature come from Java, npm and GitHub Actions ecosystems, not from Hugo themes.

## Sources

Repository evidence, all read on 13 November 2026:

- Theme history: [https://github.com/mzzavaa/incredible-theme/commits/main](https://github.com/mzzavaa/incredible-theme/commits/main)
- Site history and the repairing commit `f674334`: [https://github.com/mzzavaa/incredible-consulting.com/commits/main](https://github.com/mzzavaa/incredible-consulting.com/commits/main)
- Deploy runs, including the failed run of 4 September 2026: [https://github.com/mzzavaa/incredible-consulting.com/actions](https://github.com/mzzavaa/incredible-consulting.com/actions)

References, all accessed 13 November 2026:

1. Git project. "gitsubmodules: Mounting one repository inside another." [https://git-scm.com/docs/gitsubmodules](https://git-scm.com/docs/gitsubmodules)
2. Git project. "git-submodule: Initialize, update or inspect submodules." [https://git-scm.com/docs/git-submodule](https://git-scm.com/docs/git-submodule)
3. Chacon, S., and Straub, B. (2014). *Pro Git*, 2nd edition, section 7.11, "Git Tools: Submodules." [https://git-scm.com/book/en/v2/Git-Tools-Submodules](https://git-scm.com/book/en/v2/Git-Tools-Submodules)
4. Hugo documentation. "Quick start." [https://gohugo.io/getting-started/quick-start/](https://gohugo.io/getting-started/quick-start/)
5. Hugo documentation. "Use modules." [https://gohugo.io/hugo-modules/use-modules/](https://gohugo.io/hugo-modules/use-modules/)
6. Reproducible Builds project. "Definitions." [https://reproducible-builds.org/docs/definition/](https://reproducible-builds.org/docs/definition/)
7. SLSA. "Requirements," version 0.1. The hermetic and reproducible definitions appear in this version of the specification. [https://slsa.dev/spec/v0.1/requirements](https://slsa.dev/spec/v0.1/requirements)
8. Preston-Werner, T. "Semantic Versioning 2.0.0." [https://semver.org/spec/v2.0.0.html](https://semver.org/spec/v2.0.0.html)
9. Raemaekers, S., van Deursen, A., and Visser, J. (2017). "Semantic versioning and impact of breaking changes in the Maven repository." *Journal of Systems and Software*, 129, 140 to 158. DOI 10.1016/j.jss.2016.04.008. Read through the TU Delft record: [https://research.tudelft.nl/en/publications/semantic-versioning-and-impact-of-breaking-changes-in-the-maven-r/](https://research.tudelft.nl/en/publications/semantic-versioning-and-impact-of-breaking-changes-in-the-maven-r/)
10. Ochoa, L., Degueule, T., Falleri, J.-R., and Vinju, J. (2021). "Breaking Bad? Semantic Versioning and Impact of Breaking Changes in Maven Central." arXiv:2110.07889. [https://arxiv.org/abs/2110.07889](https://arxiv.org/abs/2110.07889)
11. He, H., Vasilescu, B., and Kästner, C. (2025). "Pinning Is Futile: You Need More Than Local Dependency Versioning to Defend against Supply Chain Attacks." *Proceedings of the ACM on Software Engineering*, 2 (FSE), article FSE013. DOI 10.1145/3715728. [https://arxiv.org/abs/2502.06662](https://arxiv.org/abs/2502.06662)
12. Kula, R. G., German, D. M., Ouni, A., Ishio, T., and Inoue, K. (2018). "Do developers update their library dependencies? An empirical study on the impact of security advisories on library migration." *Empirical Software Engineering*, 23(1), 384 to 417. DOI 10.1007/s10664-017-9521-5. [https://arxiv.org/abs/1709.04621](https://arxiv.org/abs/1709.04621)
13. Cox, J., Bouwers, E., van Eekelen, M., and Visser, J. (2015). "Measuring Dependency Freshness in Software Systems." ICSE 2015. DOI 10.1109/ICSE.2015.140. [https://ericbouwers.github.io/papers/icse15.pdf](https://ericbouwers.github.io/papers/icse15.pdf)
14. GitHub Docs. "Secure use reference," section "Pin actions to a full-length commit SHA." [https://docs.github.com/en/actions/reference/security/secure-use](https://docs.github.com/en/actions/reference/security/secure-use)
15. GitHub Advisory Database. "tj-actions/changed-files through 45.0.7 allows remote attackers to discover secrets by reading actions logs" (GHSA-mrrh-fwg8-r2c3, CVE-2025-30066), published 15 March 2025. [https://github.com/advisories/GHSA-mrrh-fwg8-r2c3](https://github.com/advisories/GHSA-mrrh-fwg8-r2c3)
16. Wiz Research (2025). "GitHub Action tj-actions/changed-files supply chain attack." Secondary source, security vendor. [https://www.wiz.io/blog/github-action-tj-actions-changed-files-supply-chain-attack-cve-2025-30066](https://www.wiz.io/blog/github-action-tj-actions-changed-files-supply-chain-attack-cve-2025-30066)
17. OpenSSF Scorecard. "Check documentation: Pinned-Dependencies." [https://github.com/ossf/scorecard/blob/main/docs/checks.md#pinned-dependencies](https://github.com/ossf/scorecard/blob/main/docs/checks.md#pinned-dependencies)
18. Cox, R. (2019). "Our Software Dependency Problem." Also published as "Surviving Software Dependencies" in *ACM Queue* and *Communications of the ACM*. [https://research.swtch.com/deps](https://research.swtch.com/deps)

## Further reading

- [What is a dependency?](/basics/what-is-a-dependency/): the beginner version, including lock files and why projects break after six months untouched.
- [Version control fundamentals](/software-engineering/version-control-fundamentals/): commits, hashes and history, which is what makes a pin possible.
- [Semantic versioning](/glossary/semantic-versioning/): what a version number promises, and what it cannot enforce.
- [Model versioning and artifact management](/patterns/model-versioning/): the same rule applied to model IDs, prompts and artifacts.
- [AI supply chain security](/patterns/ai-supply-chain-security/): hash pinning for packages and model weights.
- [GitHub Actions](/tools/github-actions/): the Hugo deploy pattern with submodules checked out at the recorded commit.
- Cox, R., "Our Software Dependency Problem" [18]: the best single essay on choosing, pinning and upgrading dependencies.
