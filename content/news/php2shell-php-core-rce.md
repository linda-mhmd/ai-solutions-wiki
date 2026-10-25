---
title: "PHP2Shell: Two Critical PHP Engine Flaws Allow Unauthenticated Remote Code Execution"
description: "On 21 October 2026 PHP released 8.5.12, 8.4.27, 8.3.36 and 8.2.35 to fix CVE-2026-109618 and CVE-2026-109619, two memory-safety flaws in the engine rated CVSS 4.0 9.2. Found in part with AI tools, leaked a day early, and probed within hours."
date: 2026-10-21
lastmod: 2026-10-25
last_updated: 2026-10-25
last_verified: 2026-10-25
categories: [News]
tags: [security, vulnerabilities, php, cve, remote-code-execution, coordinated-disclosure, ai-security-research, cyber-resilience-act]
related:
  - news/nodejs-october-2026-security-release-brotli
  - news/emudhra-intermediate-ca-key-compromise
  - news/ai-agent-security-roundup-october-2026
  - news/plugin4shell-coding-agents-rce
  - frameworks/cyber-resilience-act
  - guides/ai-security-best-practices
---

On **21 October 2026** the PHP project released **PHP 8.5.12, 8.4.27, 8.3.36 and 8.2.35** to fix two flaws in the PHP engine itself, not in any framework or application: **CVE-2026-109618** and **CVE-2026-109619**. php.net's advisory says they "can allow unauthenticated remote code execution" and asks all PHP users to update immediately. The researchers who found them named the pair **PHP2Shell**. The fixes landed in the same week as the [Node.js security release](/news/nodejs-october-2026-security-release-brotli/), and the discovery story is a prominent case of AI-assisted vulnerability research: Wiz, one of the reporting teams, says the vulnerable code had been present for more than a decade.

## What happened

### The two vulnerabilities

php.net describes both in one sentence each:

- **CVE-2026-109618, "RCE via OOM corruption"** ([GHSA-w8hw-w9fx-j79w](https://github.com/php/php-src/security/advisories/GHSA-w8hw-w9fx-j79w)): "out-of-memory handling can interrupt PHP while internal request data is only partially initialized. Request cleanup may then treat the invalid data as valid."
- **CVE-2026-109619, "RCE via stale global state"** ([GHSA-6wmf-4rv5-p3rp](https://github.com/php/php-src/security/advisories/GHSA-6wmf-4rv5-p3rp)): "request-owned internal state can survive after its backing memory has been freed. A later request handled by the same worker may use that stale state before normal initialization resets it."

Both are memory-safety bugs in how the engine sets up and tears down a request. PHP's CVE records list CWE-416 (use after free) among other weaknesses. This entry deliberately stays at the level of the official advisories and does not describe how the conditions are triggered.

**Who is affected.** In php.net's words: "all PHP installations serving web requests, including PHP-FPM, Apache with mod_php, php-cgi, FrankenPHP and LiteSpeed. We consider the risk highest for mod_php, with a demonstrated exploit where an unauthenticated request can trigger the attack before any application code runs." The GitHub advisories list every release before 8.2.35, 8.3.36, 8.4.27 and 8.5.12 as vulnerable. Because the bug sits below the application, a fully patched WordPress, Drupal or Laravel install on an unpatched PHP is still exposed.

**Severity, and why sources disagree.** PHP, acting as the CVE numbering authority, scores both **CVSS 4.0 9.2**. NVD's own analysis scores CVE-2026-109618 at **CVSS 3.1 9.8** and CVE-2026-109619 at **8.1**; the only difference between NVD's two vectors is attack complexity, which it rates low for the first and high for the second. These are two scoring systems and two analysts, not a contradiction. The **10.0** that circulated before release was wrong, according to the PHP Foundation.

**Unsupported versions.** PHP 8.1 and older get no official releases. Given the severity, the PHP security team published minimal source backports for PHP 7.4, 8.0 and 8.1 for people who build from source, and points everyone else to their distribution or LTS vendor.

**A third, narrower issue.** On 23 October php.net published an informational advisory for **CVE-2026-115560**, a further remote code execution vector that the 21 October releases do not fix. php.net calls it unlikely and says it can only occur under an unusual combination of configuration and application code. PHP will fix it in the next regular release and recommends `session.upload_progress.enabled=0` until then.

### How the bugs were found

The PHP Foundation's account, published on release day, starts in **2024**. PHP's first external audit in years, funded by the Sovereign Tech Agency, organised through OSTIF and carried out by Quarkslab, led a Foundation-contracted core developer to "the first signs of the OOM problem behind CVE-2026-109618". The fix was not finished then.

In 2026 the Foundation brought PHP into the **Patch the Planet** programme. Security firm **Calif** began an audit on **30 July 2026**, and on **11 August** Calif researcher Ryan A reported "an unconditional remote code execution with the same root cause". **Wiz Research** says it found the first vulnerability on **19 August** "using Wiz Atlas, Gemini 4 Argon, and GPT-5.6 Sol", confirmed unauthenticated remote code execution against Drupal on 20 August and WordPress on 21 August, and reported to PHP on **24 August**. Wiz names Gemini 4 Argon for 19 August, six weeks before Google [announced Gemini 4 Argon](/news/gemini-4-argon/) on 30 September; Wiz does not explain the access, so read it as Wiz's statement. The CVE records also credit OpenAI, and the GitHub advisories list four reporters and four remediation developers (Arnaud Le Blanc, Ilija Tovilo, Jakub Zelenka and Nora Dossche).

The Foundation is unusually direct about the delay between those reports and the fix: "We won't pretend otherwise: the delay was a structural failure, caused by both the security team's decision process and its lack of resources." It also describes the load AI-assisted research puts on a small team: the security team has published 15 CVEs since 1 July and worked through more than 100 reports that were invalid, duplicates or not reproducible. The Foundation says it scanned PHP with Anthropic's Claude Mythos through Alpha-Omega earlier in the year and now also uses OpenAI's Daybreak Red to validate reports.

### A leak, a moved date and a broken embargo

The release was planned for **22 October, 14:00 UTC**. According to the PHP Foundation:

- On **20 October at around 15:00 UTC** the two CVE IDs "began circulating on online forums and social media", with a wrong release time and the wrong CVSS score of 10.0. "No technical details leaked."
- PHP published its pre-announcement at **19:30 UTC** that day and moved the release to **21 October, 14:00 UTC**. php.net's pre-announcement says PHP reserved the right to release earlier if details became public or exploitation appeared.
- Around **20:00 UTC**, Calif "mistakenly published a video" of its proof of concept working against several targets. It was deleted, but copies circulated.
- On **21 October at 07:41 UTC**, more than six hours before the coordinated release, "Chainguard unilaterally broke the embargo and published built images containing the fix."

The EU's joint statement gives 13:40 UTC as the time the updates were issued. According to php.net, Linux distributions and LTS vendors received the patches in advance, so their users could check for updated packages at release.

### Exploitation

Reports from security vendors, each attributed to its source:

- **Cloudflare** says it deployed WAF mitigations for all customers while the vulnerability was leaked "and we observed attack traffic targeting our customers".
- **Cisco Talos** said that as of 21 October 14:00 UTC it had not seen exploitation in the wild, and then "began observing exploitation attempts within hours of the vulnerabilities' disclosure. So far, most of the activity is scanning".
- **Unit 42** (Palo Alto Networks, updated 23 October) reports that "At least one European government has taken its website offline as a precaution", and that in one case attackers targeting a European government entity accessed password hashes and multi-factor authentication secrets within two hours of initial exploitation. Unit 42 attributes the post-exploitation activity to "agentic AI attack platforms". That is Unit 42's assessment, not an independently confirmed finding.

The CISA vulnerability enrichment in the CVE records, stamped 21 October, still says "Exploitation: none". Neither CVE was in CISA's Known Exploited Vulnerabilities catalog as of catalog version 2026.10.23. Both statements were true when made; the vendor reports are newer.

### The European response

DG CNECT, ENISA, CERT-EU, Europol's EC3 and the CSIRTs Network issued a **joint statement** urging immediate patching, because the flaws "could allow attackers to remotely execute malicious code on vulnerable servers without authentication". It points to an NCSC-NL repository that tracks third-party products embedding PHP, and reminds manufacturers that since **11 September 2026** they must report actively exploited vulnerabilities through the Cyber Resilience Act's Single Reporting Platform. For many vendors this is the first large, real test of that duty. See the [Cyber Resilience Act](/frameworks/cyber-resilience-act/) page.

### Claims to read with care

Wiz's write-up calls the findings "among the most severe vulnerabilities discovered in PHP, and arguably in software history", and its headline says they affect "70% of the Internet". The 70 percent is a figure for the share of websites that use PHP, not a count of servers shown to be exploitable. php.net's advisory is more conditional than some vendor coverage: the risk is "highest for mod_php", where the exploit runs before any application code. Read the vendor posts as colour and the php.net advisory as the description of the risk.

## Why it matters for builders

**Update the runtime, not just the application.** Check the PHP version your servers, containers and base images actually run (`php -v` inside the running container, not the Dockerfile you think you deployed). The fixed versions are 8.5.12, 8.4.27, 8.3.36 and 8.2.35, or your distribution's patched package. Rebuild images that bundle PHP and restart every worker, because CVE-2026-109619 concerns state that persists inside long-lived workers.

**Find the PHP you did not know you had.** Admin panels, appliances, webmail, monitoring tools and vendor products often embed PHP. The NCSC-NL php2shell repository linked from the EU statement tracks such products. If a vendor ships PHP inside its product, its patch status is yours.

**If you cannot update today, mitigations reduce exposure but do not fix it.** php.net lists them, among others a non-overridable `memory_limit=-1`, a low `post_max_size` (8M without uploads, 32M with), request-size and field-count limits at the web server or proxy, `session.upload_progress.enabled=0` set before request parsing, and on PHP 8.5 `fatal_error_backtraces=0`. It warns explicitly not to use `RLIMIT_AS` or `RLIMIT_DATA` instead, and states that "only an update is a complete solution".

**Plan for leaks.** This disclosure was meant to be coordinated and still went public a day early, with a proof-of-concept video and a vendor shipping fixed images ahead of the embargo. Have a path to roll out a runtime update within hours: a pinned base image you can rebuild, a deployment you can trigger without a release meeting, and an inventory of where each runtime runs.

**AI-assisted research changes the arithmetic.** Calif, OpenAI and Wiz independently reported the same root cause (Calif on 11 August, Wiz on 24 August), Wiz says frontier AI models made the exploit practical, and a small volunteer and Foundation-funded security team then had to triage that alongside more than a hundred reports that were invalid, duplicates or not reproducible. Expect more critical findings in mature open-source runtimes, faster, and expect fix capacity, not discovery, to be the bottleneck. Supporting the maintainers of the runtimes you depend on is part of your own security posture.

## Sources

1. php.net, "Security advisory: Critical remote code execution vulnerabilities, update now" (21 October 2026): [https://www.php.net/archive/2026.php#2026-10-21-5](https://www.php.net/archive/2026.php#2026-10-21-5)
2. php.net, "Upcoming Critical PHP Security Release" (20 October 2026): [https://www.php.net/archive/2026.php#2026-10-20-1](https://www.php.net/archive/2026.php#2026-10-20-1)
3. php.net, "Informational advisory: Session upload progress" (CVE-2026-115560, 23 October 2026): [https://www.php.net/archive/2026.php#2026-10-23-1](https://www.php.net/archive/2026.php#2026-10-23-1)
4. PHP security advisory GHSA-w8hw-w9fx-j79w, "RCE via OOM corruption" (CVE-2026-109618, published 21 October 2026): [https://github.com/php/php-src/security/advisories/GHSA-w8hw-w9fx-j79w](https://github.com/php/php-src/security/advisories/GHSA-w8hw-w9fx-j79w)
5. PHP security advisory GHSA-6wmf-4rv5-p3rp, "RCE via stale global state" (CVE-2026-109619, published 21 October 2026): [https://github.com/php/php-src/security/advisories/GHSA-6wmf-4rv5-p3rp](https://github.com/php/php-src/security/advisories/GHSA-6wmf-4rv5-p3rp)
6. NVD, CVE-2026-109618 (published 21 October 2026, fetched 25 October 2026): [https://nvd.nist.gov/vuln/detail/CVE-2026-109618](https://nvd.nist.gov/vuln/detail/CVE-2026-109618)
7. NVD, CVE-2026-109619 (published 21 October 2026, fetched 25 October 2026): [https://nvd.nist.gov/vuln/detail/CVE-2026-109619](https://nvd.nist.gov/vuln/detail/CVE-2026-109619)
8. The PHP Foundation, "Today's PHP Security Release, and How We're Strengthening PHP Security" (21 October 2026): [https://thephp.foundation/blog/2026/10/21/todays-php-security-release-and-how-were-strengthening-php-security/](https://thephp.foundation/blog/2026/10/21/todays-php-security-release-and-how-were-strengthening-php-security/)
9. European Commission, "Joint statement on critical PHP vulnerabilities" (21 October 2026, last updated 22 October 2026): [https://digital-strategy.ec.europa.eu/en/news/joint-statement-critical-php-vulnerabilities](https://digital-strategy.ec.europa.eu/en/news/joint-statement-critical-php-vulnerabilities)
10. CISA, Known Exploited Vulnerabilities catalog, version 2026.10.23 (fetched 25 October 2026): [https://www.cisa.gov/known-exploited-vulnerabilities-catalog](https://www.cisa.gov/known-exploited-vulnerabilities-catalog)
11. Wiz Research, "PHP2Shell: AI uncovers critical RCE vulnerabilities affecting 70% of the Internet" (21 October 2026, secondary, researcher's own account): [https://www.wiz.io/blog/php2shell-php-rce](https://www.wiz.io/blog/php2shell-php-rce)
12. Cloudflare, "Cloudflare deploys protections against php2shell vulnerability" (21 October 2026, updated 23 October 2026, secondary): [https://blog.cloudflare.com/php-vulnerabilities-waf-protection/](https://blog.cloudflare.com/php-vulnerabilities-waf-protection/)
13. Cisco Talos, "Two critical RCEs in PHP core" (21 October 2026, updated 22 October 2026, secondary): [https://blog.talosintelligence.com/two-critical-rces-in-php-core/](https://blog.talosintelligence.com/two-critical-rces-in-php-core/)
14. Unit 42, "Threat Brief: Critical Vulnerabilities in PHP: CVE-2026-109618, CVE-2026-109619" (updated 23 October 2026, secondary): [https://unit42.paloaltonetworks.com/cve-2026-109618-cve-2026-109619/](https://unit42.paloaltonetworks.com/cve-2026-109618-cve-2026-109619/)
15. NCSC-NL, php2shell repository of affected third-party software (fetched 25 October 2026): [https://github.com/NCSC-NL/php2shell](https://github.com/NCSC-NL/php2shell)

## Further reading

- [Node.js October 2026 security release](/news/nodejs-october-2026-security-release-brotli/): the other runtime release of the same week
- [eMudhra intermediate CA key compromise](/news/emudhra-intermediate-ca-key-compromise/): why certifi and uv changed their trust stores the same week
- [AI agent security, October 2026](/news/ai-agent-security-roundup-october-2026/)
- [Plugin4Shell in coding agents](/news/plugin4shell-coding-agents-rce/)
- [Cyber Resilience Act](/frameworks/cyber-resilience-act/)
- [AI security best practices](/guides/ai-security-best-practices/)
