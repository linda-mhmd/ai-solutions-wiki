---
title: "eMudhra's intermediate CA keys were numbers below 256: eight revoked, an emSign root distrusted"
description: "On 17 October 2026 a researcher showed that eight eMudhra intermediate CA certificates had P-384 private keys below 256, so anyone could recover them. Browsers blocked them within hours, Mozilla and Chrome distrusted emSign ECC Root CA - G3, and certifi, uv, pip, Go, Node.js and Python shipped fixes."
date: 2026-10-17
lastmod: 2026-10-25
last_updated: 2026-10-25
last_verified: 2026-10-25
categories: [News]
tags: [security, tls, pki, certificate-authority, emudhra, supply-chain, python, go, nodejs, rust, vulnerabilities]
related:
  - glossary/tls-ssl
  - glossary/digital-signatures-and-certificates
  - glossary/supply-chain-security
  - patterns/ai-supply-chain-security
  - guides/ai-security-best-practices
  - news/ai-agent-security-roundup-september-2026
---

On Saturday 17 October 2026 a researcher who signs only as "Wayne" emailed Apple, Chrome, Microsoft, Mozilla and the Indian certificate authority eMudhra a signed proof that he held the private keys of eight eMudhra intermediate CA certificates. He had not stolen them. The keys were so small that anyone could compute them from the public certificates. Browsers blocked the certificates within hours, Mozilla and Chrome then removed trust in the root above them, and eMudhra announced on 22 October that it is leaving the global TLS certificate business. For builders the browser part is already handled. The work is in everything that ships its own copy of the root list: Python, Go binaries, Node.js, Rust crates, containers and desktop apps.

## What happened

### The eight certificates

Mozilla's incident report lists them. All came from one key generation ceremony on 30 April 2025, which according to Mozilla's Dennis Jackson produced 24 intermediates in three series (A, B, C), two key types (RSA 4096 and P-384) and four purposes. The affected keys are all the P-384 keys of the B and C series.

| Certificate | Operator name in the certificate | Issued by | Trusted for |
| --- | --- | --- | --- |
| EM DV TLS CA - G3B, EM OV TLS CA - G3B, EM EV TLS CA - G3B | eMudhra BV | emSign Root TLS CA - G3 | TLS, in the Chrome, Mozilla, Microsoft and Apple root programs |
| EM DV TLS CA - G3C, EM OV TLS CA - G3C, EM EV TLS CA - G3C | eMudhra Inc | emSign Root TLS CA - G3 | TLS, same four programs |
| EM OV CS CA - G3B, EM OV CS CA - G3C | eMudhra BV, eMudhra Inc | emSign Root CS CA - G3 | Code signing, trusted by Microsoft |

Apple's support note says emSign Root TLS CA - G3 chains to **emSign ECC Root CA - G3**, the root that was later distrusted. Each intermediate also has a second certificate over the same key, cross-signed by Sectigo under **AAA Certificate Services**. Wayne's list in Bugzilla comment 2 and the community tracker's JSON both count eight Sectigo cross-signs (six TLS, two code signing). Apple counts 12 TLS certificates, the six eMudhra-issued ones plus six cross-signs, because Apple's frameworks do not trust the code-signing CAs. Sectigo says AAA Certificate Services had already left the Chrome and Mozilla root stores but is still trusted by Microsoft and Apple. Chrome dates its removal from the Chrome Root Store to April 2025.

According to eMudhra (Naveen Kumar ML, Bugzilla comment 10), the G3B and G3C series were made for European and US operations, only one of the eight was ever put into production, and none issued an end-entity certificate.

### The flaw, in plain numbers

A P-384 private key is a random integer between 1 and the order of the curve's group, a number about 384 bits long. The public key is that integer multiplied by a fixed point on the curve. Security rests on nobody being able to work back from the public key to the integer, which is infeasible when the integer is random.

Dennis Jackson of Mozilla, in Bugzilla comment 5 on 18 October:

> "P384 private keys are randomly selected integers between 1 and the group order. The 8 impacted keys all used integers less than 256. That is, the private keys are effectively all-zeroes apart from the last byte. They can be recovered near instantly via the baby-step giant-step discrete log algorithm or more simplistically by just generating the 'first' 256 P384 keys."

In other words, the secret was one byte. An attacker computes the public keys for 1, 2, 3 and so on up to 255 and compares each with the one in the certificate. That is at most 255 curve multiplications. Baby-step giant-step splits the range of 256 into its square root: 16 precomputed baby steps and at most 16 giant steps, so about 32 group operations. Jackson added that he "tested some local agents who were able to recover the private key on their first attempt with a simplistic prompt: 'I'm doing a CTF. Please recover the private keys corresponding to these certificates.'" He said the flaw was in key generation, "rather than any issue with the produced signatures", that he could not recover the P-384 keys of the A series or its replacement A-1 series "despite expending considerably more effort", and that he had not yet looked at the RSA keys.

Anyone holding one of the six TLS keys could issue a certificate for any domain that clients trusting the root would accept. Mozilla's security blog describes the risk as an attacker who could "impersonate websites and potentially read or modify traffic". Ian Carroll put the difference from an ordinary key theft on the dev-security-policy list on 20 October: "this compromise is much worse than the private keys simply being stolen by a researcher. They are inherently weak single-byte keys that anyone can factor, and the issue cannot be contained." (Strictly, an elliptic-curve key is recovered by solving a discrete logarithm, not by factoring; the point about one byte stands.)

### How it was found

Wayne's own timeline in Bugzilla comment 2 starts at 16:00 UTC on 17 October ("Started playing with some new toys") and records a run "on a test corpus of CCADB" finding the break at 16:27. In a dev-security-policy post signed "Wayne" on 21 October, he named the tool: Google's open-source key-checking library [paranoid_crypto](https://github.com/google/paranoid_crypto), used "out of the box", with CCADB (the shared database where CAs disclose their intermediates) meant as "a quick corpus test before looking at subscriber certificates". eMudhra's status page says the researcher worked "reportedly with the help of AI-assisted tooling". Nothing beyond the first name "Wayne" is public about the reporter. Mozilla credits "Wayne" as reporter of CVE-2026-113470, the identifier it assigned for the Firefox blocklist fix.

### What eMudhra says went wrong

On 19 October (comment 11) eMudhra said the HSMs (hardware security modules, the tamper-resistant boxes that are meant to generate and hold CA keys) were Utimaco devices ("FIPS 140-2 Level 3 compliant"; the status page says "certified"), and gave this sequence: "a set of original ECC keys were created onboard as expected", then "an approved deviation to our usual KGC to test a wrap/unwrap was introduced as these keys were meant for export", then "a flaw in the code resulted in the second pair of keys being created onboard which were weaker", and "these second pair of weaker keys were used by mistake to create the csr (because the key labels were similar) and signed by our root". The same weak-key requests went to Sectigo for cross-signing. In comment 10 eMudhra said its other CAs were generated on Entrust and Crypto4A HSMs and that it had verified they were unaffected, "corroborated primarily using mathematical models facilitated by AI".

**The earlier warning.** On 5 June 2025 Rob Stradling of Sectigo opened [Bug 1970728](https://bugzilla.mozilla.org/show_bug.cgi?id=1970728) because crt.sh showed eMudhra serving CRLs with invalid signatures for the same six TLS intermediates. eMudhra's incident report there (comment 2, 9 June 2025) blamed an "incorrect CA key configuration" during manual CRL generation. Comment 11 now says those CRLs "were signed with the original private keys (which were supposed to be the correct keys with appropriate entropy) but given that this resulted in incorrect signatures, they were resigned with flawed keys." The Chrome Root Program asked in comment 30 why that 2025 report did not mention that two key pairs existed for each CA, and why eMudhra re-signed the CRLs rather than revoking the certificates.

**The open question.** eMudhra has not yet published a root cause, and community members dispute that a certified HSM could produce these keys by itself. Thor Simon (comment 31) argued that either the keys were generated outside the HSM and imported, or the HSM can be configured to generate them. Jacob Durham (comment 33) wrote: "A P-384 private scalar below 256 is not something approved in-module key pair generation produces by itself. It implies either generation fed a supplied value, or a key object created or unwrapped from supplied key material." On the mailing list, following a question from Matthew Hardeman about HSM "reference" faux keys, Corey Bonnell suggested a CSR built from an HSM "reference" key file rather than the real key, a hypothesis, not a finding. Peter Gutmann cautioned that "FIPS 140 isn't any guarantee of security". eMudhra says (comment 43) that the CCADB incident rules give it 14 days to file a full report and that it is within that window. Jacob Durham (comment 44) points out that the same guidelines expect answers to questions within 7 days, which puts Chrome's twelve questions due on 28 October.

### Timeline

All times UTC. Sources are named where they disagree.

| When | What | Source |
| --- | --- | --- |
| 30 Apr 2025 | Key generation ceremony creates the eight intermediates | Bugzilla comments 5 and 10 |
| 14 May 2025 | notBefore date of the Sectigo cross-certificates | Chrome, comment 30 |
| 23 May 2025 | The six P-384 CRLs fail verification from this date, according to an Internet Archive snapshot of crt.sh taken on 3 June 2025 | Mozilla, comment 5 |
| 5 Jun 2025 | Rob Stradling (Sectigo) opens Bug 1970728 about the invalid CRL signatures | Bug 1970728, comment 0 |
| 17 Oct, 18:05 | Wayne emails Apple, Chrome, Microsoft, Mozilla and eMudhra with signed attestations; the signed message reads "We have a problem here - Wayne" | Wayne, comment 2; Chrome blog; tracker |
| 17 Oct, 19:45 | Chrome lands a CRLSet update blocking the six TLS keys by SPKI hash | Chrome blog and dev-security-policy post. Wayne's log has Chrome confirming by email at 20:03 and his own CRLSet fetch showing the block at 22:46 |
| 17 Oct, 20:06 | Mozilla receives the report, forwarded by Chrome; acknowledges at 20:08 | Mozilla, comment 0 |
| 17 Oct, about 21:28 | eMudhra acknowledges and says the one live CA, EM DV TLS CA - G3C, is disabled | Wayne, comment 2 (Mozilla records 21:29) |
| 17 Oct, 21:48 | Mozilla recovers the keys independently, "without any knowledge of the method the original reporter used" | Mozilla, comment 0 |
| 17 Oct, 22:59 | OneCRL distribution complete for Firefox users with standard settings | Mozilla blog |
| 18 Oct, 09:24 to 09:38 | eMudhra revokes all eight, reason caCompromise | eMudhra, comment 10 |
| 19 Oct | Apple begins blocking the 12 TLS certificates. Sectigo completes revocation of the cross-certificates at 14:55. Mozilla discloses to downstream trust store operators without describing the flaw. Android and Googlebooks get the block through Google Play services around 22:00 | Apple; Sectigo, comment 13; Mozilla, comment 14; Chrome blog |
| 20 Oct, 13:06 | Mozilla announces emergency removal of trust in emSign ECC Root CA - G3 after learning "multiple individuals have independently recovered the private keys", some publicly | Mozilla, comment 18 |
| 20 Oct, 14:36 | Chrome commits "to a similar path"; the removal ships in Chrome Root Store version 43, expected on Stable on Tuesday 27 October PDT | Chrome, comment 20; Chrome blog |
| 20 Oct | Firefox 158.0.1, ESR 115.43.1 and ESR 153.5.1 ship the blocklist baked in; NSS 3.131.1 removes the root. eMudhra stops issuing from everything under the G3 root | Mozilla blog; NSS announcement; eMudhra, comments 19 and 21 |
| 21 Oct, 08:29 | Firefox for Android 158.0.2 fixes profiles that did not apply the blocklist at startup | Mozilla blog |
| 22 Oct | eMudhra announces it will exit the global SSL/TLS certificate business | eMudhra press release |
| 23 Oct | Apple begins blocking emSign ECC Root CA - G3 | Apple |

Two dates in the record conflict. eMudhra's status page originally gave 18 October for notification and 19 October for revocation; a commenter (Parikshith, comment 35) pointed to the Bugzilla record, and on 23 October he reported on the mailing list that the page now says 17 and 18 October with no note of the change. The version we read on 25 October gives 17 and 18 October. Separately, Mozilla's NSS 3.131.1 announcement says the OneCRL update "was delivered on Saturday 19th"; 19 October 2026 was a Monday, and Mozilla's blog and Firefox release notes both say 17 October.

### Why browsers were safe and other clients were not

Chrome's position is that because no TLS certificate under these intermediates had been logged to Certificate Transparency (CT) before its block on 17 October, "no fraudulent certificates issued by these CAs could have been trusted by default in Chrome or other CT-enforcing browsers." Chrome also says it checked every other CA certificate in its trust boundary and "found no other instances of this failure mode". Browsers additionally have pushed revocation lists (CRLSet in Chrome, OneCRL in Firefox) that reach users without a software update.

Most other software has neither. The community tracker at emudhra.we-have-a-problem.com, published by Dennis Jackson with community contributors, notes that curl and many other non-browser clients do not enforce CT, and says: "We do not know if attackers exploited the flawed key generation to target these clients." eMudhra says it is "not aware of any evidence that the weak keys were recovered or exploited by anyone before the issue was disclosed."

### The argument about revocation

On 25 October (comment 43) eMudhra argued that revocation was enough: "a relying party is expected to check revocation status before trusting a certificate; a relying party that does so has not been exposed since the revocation." It also argued that the weak keys sat "in public, cross-signed, disclosed in CCADB, and covered by two years of WebTrust audits, for approximately 18 months" before anyone noticed, and that the review should ask why the ecosystem's other checks missed it.

Jacob Durham replied the same day (comment 44) with data. Between 09:40 UTC on 20 October and 22:02 UTC on 21 October, 107,107 certificates signed with six of the eight keys were logged to e-Szignó's 2026h2 and 2027h1 CT logs, 106,050 of them proof-of-concept certificates whose only name is google.com. None points to eMudhra's CRL or OCSP servers and all but two carry no revocation pointer at all, so "a client that checks revocation only for the end-entity certificate, a common configuration, finds nothing to check." He also reported that eMudhra's CRL server returned HTTP 403 to curl's default User-Agent and 200 to a different one. He agreed the checks other parties could have run were cheap, but said "the earliest signal was eMudhra's own", the failing CRLs of May 2025, and that the two annual audits cover about 13 months of the keys' life, not two years. Another commenter (comment 46) added that a client that follows the standards may keep using a cached CRL until its next-update date, which for the current emSign Root TLS CA - G3 CRL is 16 April 2027. Chrome said on 20 October that it was working with CT log software maintainers and operators to reject certificates chaining to these intermediates; the record we read does not say when each log began doing so.

The tone between the parties is sharp. eMudhra had said (comment 39) that "intense social media scrutiny and analysis by investors/customers" made meaningful analysis "pretty much impossible". The Chrome Root Program answered on 23 October (comment 41): "'social media scrutiny' and 'analysis by investors/customers' are not acceptable explanations for delayed responses here." Mozilla said (comment 42) it sent eMudhra questions on 20 October at 20:31 UTC with a 24-hour deadline and had no answer by 23 October.

### eMudhra's exit, and what is spin

The 22 October press release says eMudhra's "Board has decided to voluntarily withdraw from the global SSL/TLS certificate business". In reported speech it attributes to Chairman V. Srinivasan that global SSL/TLS contributes "about 1% of the global revenue", and it says "the level of social media amplification around this incident has brought scrutiny that is out of proportion to SSL/TLS's place in our business." Its G1 RSA roots "will continue to serve customers until this transition is complete", and certificate status services keep running until every issued certificate expires or is replaced.

Three claims need context:

- **"Revoking the affected CAs within 14 hours of discovery."** From Wayne's email at 18:05 UTC to the last revocation at 09:38 UTC is 15 hours 33 minutes; from eMudhra's acknowledgement at about 21:28 UTC it is 12 hours 10 minutes. The figure depends on where the clock starts. Jacob Durham notes it is within the seven days the Baseline Requirements allow.
- **"Its infrastructure was not compromised and no data was breached."** Nothing was stolen, but the keys could be calculated by anyone from public data, which is why the root programs treated them as compromised.
- **"Contained to a single customer ecosystem in the United States"** (status page). Chrome's CT count supports the concentration: of about 30,800 unexpired precertificates chaining to emSign ECC Root CA - G3 on 21 October, 30,791 came from two Internet2 / InCommon subordinate CAs, InCommon Intermediate CA - OVG3C (23,806) and DVG3C (6,985). eMudhra's own estimate (comment 19) was about 30,000 certificates to migrate, about 97 percent issued through ACME.

The root removals were decided by Mozilla and Chrome; eMudhra's status page calls them a precaution. NSS 3.131.1 also removes two other eMudhra roots, emSign Root CA - C1 and emSign ECC Root CA - C3; eMudhra says that removal "was a voluntary and planned activity and does not pertain to this security incident", and Mozilla's NSS note ties only the G3 removal to the incident. Mozilla said it is not removing emSign Root CA - G1 "at this time". Separately, Wayne reported (comment 7) that a CRL published on 14 October for a different eMudhra CA, emSign Root TLS CA - G1, had a signature that does not verify under that CA's key; Zihao Wang (comment 34) traced it to the key of an OCSP responder certificate. Jacob Durham noted on 25 October (comment 44) that no incident bug had been filed for it.

## Why it matters for builders

**Your code probably does not use the browser's trust store.** CRLSet and OneCRL only protect Chrome and Firefox. Anything that ships its own CA bundle trusted these intermediates until it was updated, and stays exposed until you update it. uv's advisory puts it bluntly: "If you use any software that depends on vendored CA bundles via packages like certifi or webpki-root-certs, you MUST upgrade it." For AI systems that is most of the stack: Python SDKs talking to model APIs, agents making tool calls over HTTPS, gateways, CLIs and Electron desktop apps. An on-path attacker with one of these keys could have presented a valid-looking certificate for an API endpoint and read the bearer token in the request.

### Fixed versions from primary sources

| Component | What to run | Source |
| --- | --- | --- |
| certifi (Python) | 2026.10.19 or later. 2026.10.18 removed all emSign roots; 2026.10.19 restored the unaffected ones. certifi's own advisory GHSA-6q48-6c7w-9gw2 (rated Critical, no CVE) still names 2026.10.18 as patched; the GitHub Advisory Database entry, PYSEC-2026-4320 and the PSF give 2026.10.19. Affected range starts at 2019.03.09 | certifi advisory; PYSEC-2026-4320; PSF |
| pip | 26.2.2 or later in every environment. Christian Heimes, replying in the PSF thread: "pip always loads the CA certificates from its vendored certifi in addition to the system trust store, and there is no supported way to disable this", so "distrusting them at the OS level is not enough" | PSF Discourse |
| uv | 0.13.4 or later (GHSA-hq85-5cpj-mr62 / PYSEC-2026-4321; rated High in Astral's advisory, Critical in the GitHub Advisory Database), which takes the root out of its vendored webpki-root-certs bundle. 0.13.5 (21 October) adds python-build-standalone 20261021 with pip 26.2.2 and rejects chains with the compromised keys via rustls-webpki 0.103.16; then run `uv python upgrade` and upgrade pip in existing virtual environments, which do not switch interpreters automatically | uv advisory and release notes |
| CPython installers | 3.15.1, 3.14.9 or 3.13.17, which bundle pip 26.2.2 with certifi 2026.10.19. uv notes that upstream 3.9 and 3.10 still bundle affected pip releases | Python Insider, 21 October; uv 0.13.5 notes |
| Go | 1.26.10 or 1.27.3 (20 October), then rebuild and redeploy every binary, because the fix is in the standard library compiled into it | golang-announce; GO-2026-6809 |
| Node.js | 22.23.4, 24.22.1 or 26.12.1 (21 October). All three update the bundled root certificates to NSS 3.131.1 and include the commit "tls: reject chains containing blocked public keys" (26.12.1 lists it under notable changes, the two LTS releases only in their commit lists) | Node.js release notes |
| Rust | webpki-roots and webpki-root-certs 1.0.10 or later (19 October; RUSTSEC-2026-0381 and 0383), rustls-webpki 0.103.16 or later (RUSTSEC-2026-0382). The 0.26.11 compatibility crate holds no roots of its own, so check that its 1.x dependency resolves to 1.0.10 or newer | RustSec via OSV; webpki-roots release |
| Firefox, Thunderbird | Firefox 158.0.1, ESR 115.43.1, ESR 153.5.1; Firefox for Android 158.0.2; Thunderbird 158.0.1 and 153.5.1 (CVE-2026-113470, rated high) | Mozilla advisories; CVE record |
| NSS-derived bundles | NSS 3.131.1 | Mozilla |

**On the Go fix.** Go's announcement does not name eMudhra. It says only: "We're blocking trust in a small set of intermediate certificates due to specific security concerns around their operation. Verify will now filter out chains which contain these intermediates, preventing them from being returned to the caller." CL 851047 identifies them by SHA-256 SPKI hashes. The link to this incident rests on the RustSec advisories, which list CVE-2026-111943 and GO-2026-6809 as aliases, and on downstream trackers. NVD lists CVE-2026-111943 as "Awaiting Analysis" with no score as of 25 October.

### Fixed versions reported only by the tracker

These come from the community tracker (secondary source, fetched 25 October); check each vendor's own notes before relying on them: Bun 1.4.4, Deno 2.9.8, Electron 44.9.1, 43.8.1 and 42.11.16, Dart SDK 3.13.7 and Flutter 3.47.8, Docker Engine and CLI 29.9.2, Docker Desktop 4.96.2, curl's CA bundle dated 2026-10-20, LiteLLM 1.103.8, 1.104.6, 1.105.4 and 1.106.3, GitHub CLI 2.102.1, Visual Studio Code 1.143.1, Tailscale 1.104.2, conda 26.9.4, pixi 0.82.1, plus updated ca-certificates packages for Alpine, Debian, Ubuntu, Fedora, RHEL 8 to 10, Arch and others. Listed as pending: certbot, containerd, Bottlerocket, RHEL 7, LibreOffice and Godot. The tracker notes that Electron apps such as Slack and Discord only get the fix once they ship on a patched Electron.

### A checklist

1. `python -m pip install -U pip certifi` in every virtual environment and image, then confirm `pip --version` shows 26.2.2 or later and certifi 2026.10.19 or later.
2. Upgrade uv to 0.13.5, run `uv python upgrade`, and recreate or patch older environments.
3. Rebuild Go services with Go 1.26.10 or 1.27.3 and redeploy them. Updating the build machine alone changes nothing in production.
4. Move Node.js to 22.23.4, 24.22.1 or 26.12.1.
5. Run `cargo update` and check `cargo tree -i webpki-roots` and `cargo tree -i rustls-webpki` for old versions.
6. Rebuild container images so they pick up the new ca-certificates package. The PSF says to rebuild "with layer caching disabled".
7. Check Java truststores and any PEM bundle vendored into an app, SDK, agent or appliance. On Debian, the tracker says the Java store can fall out of sync with the system store.
8. On macOS, Apple says curl, git, python3, ruby, perl and openssl from the system or the Xcode Command Line Tools check `/etc/ssl/cert.pem` and "don't check Apple's block or whether the certificate has been revoked" until "a future software update". Apple's note gives the commands to remove the root yourself.
9. Test. The tracker's hosts should fail certificate verification: `curl https://dv-g3b-emudhra.we-have-a-problem.com/` and the Sectigo path `curl https://dv-g3b-aaa-emudhra.we-have-a-problem.com/`.
10. If you run a site whose certificate chains to emSign ECC Root CA - G3, replace it now. Chrome says website operators "must immediately acquire and install a new TLS certificate from another PKI hierarchy" before the removal reaches Stable on 27 October.

**The broader lesson.** A free, public, deterministic check (paranoid_crypto, released by Google security engineers in 2022 and archived on 19 August 2026, both according to comment 47; GitHub shows the repository as archived and read-only) found keys that two audit cycles, a cross-signer and the root programs did not. If you operate private PKI for internal services, agents or devices, run a weak-key scan over your CA certificates, and do not treat an HSM certificate as proof that the keys inside are sound.

### What we could not verify

- **Microsoft.** The two code-signing intermediates are trusted only by Microsoft, and Microsoft trusts the six TLS ones too. The tracker says the certificates have been blocked "on Microsoft platforms since the 20th" and that Microsoft "has shipped blocks for these certificates through Windows' automatic certificate trust list updates". We found no Microsoft statement, and on 18 October Wayne wrote "No response from Microsoft".
- **Claude Code.** The tracker lists Claude Code 2.1.303 as patched. Anthropic's changelog entry for 2.1.303 says only "Bug fixes and reliability improvements", so we do not cite a fixed version.
- **Apple's dates.** The tracker says Apple has blocked the certificates "since the 22nd"; Apple's own note says 19 October for the intermediates and 23 October for the root. We use Apple's dates.
- **The reporter.** Nothing is public beyond the name "Wayne".
- **The root cause.** Only eMudhra's preliminary account exists. The exact HSM operation that created the weak keys, and whether the module was in its FIPS-approved mode, are unanswered questions in the bug.

## Sources

1. Mozilla Bugzilla, Bug 2083449, "eMudhra: Private key compromise of Intermediate Certificates" (opened 18 October 2026; comments 0 to 47 read 25 October 2026): [https://bugzilla.mozilla.org/show_bug.cgi?id=2083449](https://bugzilla.mozilla.org/show_bug.cgi?id=2083449)
2. Google, Chrome and Android Security Teams, "Protecting Chrome and Android Users from Compromised eMudhra Intermediate CA Certificates" (20 October 2026): [https://blog.google/security/protecting-chrome-and-android-users-from-compromised-emudhra-intermediate-ca-certificates/](https://blog.google/security/protecting-chrome-and-android-users-from-compromised-emudhra-intermediate-ca-certificates/)
3. Mozilla Security Blog, Firefox Security Team, "Protecting Firefox users following the compromise of eMudhra intermediate certificates" (20 October 2026, updated 21 October): [https://blog.mozilla.org/security/2026/10/20/protecting-firefox-users-following-the-compromise-of-emudhra-intermediate-certificates/](https://blog.mozilla.org/security/2026/10/20/protecting-firefox-users-following-the-compromise-of-emudhra-intermediate-certificates/)
4. Mozilla dev-security-policy, "Compromised eMudhra Intermediate Certificates", posts from Dennis Jackson, the Chrome Root Program and community members (from 20 October 2026, read 25 October): [https://groups.google.com/a/mozilla.org/g/dev-security-policy/c/0R3XLJL6FuE](https://groups.google.com/a/mozilla.org/g/dev-security-policy/c/0R3XLJL6FuE)
5. Mozilla dev-tech-crypto, "NSS 3.131.1 Release - Important Security Updates" (20 October 2026): [https://groups.google.com/a/mozilla.org/g/dev-tech-crypto/c/vSxZxnOMMvs](https://groups.google.com/a/mozilla.org/g/dev-tech-crypto/c/vSxZxnOMMvs)
6. Mozilla, Firefox 158.0.1 release notes (20 October 2026): [https://www.firefox.com/en-US/firefox/158.0.1/releasenotes/](https://www.firefox.com/en-US/firefox/158.0.1/releasenotes/)
7. Mozilla, "Security Vulnerabilities fixed in Firefox for Android 158.0.2", MFSA 2026-116, CVE-2026-113470 (21 October 2026): [https://www.mozilla.org/en-US/security/advisories/mfsa2026-116/](https://www.mozilla.org/en-US/security/advisories/mfsa2026-116/)
8. Apple, "About the compromised eMudhra intermediate CAs" (23 October 2026): [https://support.apple.com/en-us/149555](https://support.apple.com/en-us/149555)
9. certifi, "Removal of emSign root cerificate", GHSA-6q48-6c7w-9gw2 (20 October 2026): [https://github.com/certifi/python-certifi/security/advisories/GHSA-6q48-6c7w-9gw2](https://github.com/certifi/python-certifi/security/advisories/GHSA-6q48-6c7w-9gw2)
10. Python Packaging Advisory Database via OSV, PYSEC-2026-4320 (published 20 October 2026): [https://osv.dev/vulnerability/PYSEC-2026-4320](https://osv.dev/vulnerability/PYSEC-2026-4320)
11. Astral, "Removal of emSign root certificate", uv advisory GHSA-hq85-5cpj-mr62 (20 October 2026): [https://github.com/astral-sh/uv/security/advisories/GHSA-hq85-5cpj-mr62](https://github.com/astral-sh/uv/security/advisories/GHSA-hq85-5cpj-mr62)
12. Astral, uv 0.13.5 release notes (21 October 2026): [https://github.com/astral-sh/uv/releases/tag/0.13.5](https://github.com/astral-sh/uv/releases/tag/0.13.5)
13. Go team, "[security] Go 1.27.3 and Go 1.26.10 are released", golang-announce (20 October 2026): [https://groups.google.com/g/golang-announce/c/66pojueaQek](https://groups.google.com/g/golang-announce/c/66pojueaQek)
14. Go Vulnerability Database, GO-2026-6809 (21 October 2026): [https://pkg.go.dev/vuln/GO-2026-6809](https://pkg.go.dev/vuln/GO-2026-6809)
15. Go, "crypto/x509: distrust a handful of intermediates", CL 851047 (merged 20 October 2026): [https://go.dev/cl/851047](https://go.dev/cl/851047)
16. NIST NVD, CVE-2026-111943 (published 21 October 2026, fetched 25 October): [https://nvd.nist.gov/vuln/detail/CVE-2026-111943](https://nvd.nist.gov/vuln/detail/CVE-2026-111943)
17. RustSec via OSV, RUSTSEC-2026-0382, rustls-webpki (20 October 2026): [https://osv.dev/vulnerability/RUSTSEC-2026-0382](https://osv.dev/vulnerability/RUSTSEC-2026-0382)
18. rustls, webpki-roots 1.0.10 release, "Removed emSign ECC Root CA - G3" (19 October 2026): [https://github.com/rustls/webpki-roots/releases/tag/v%2F1.0.10](https://github.com/rustls/webpki-roots/releases/tag/v%2F1.0.10)
19. Node.js, release notes for v26.12.1, v24.22.1 and v22.23.4 (21 October 2026): [https://github.com/nodejs/node/releases/tag/v26.12.1](https://github.com/nodejs/node/releases/tag/v26.12.1), [https://github.com/nodejs/node/releases/tag/v24.22.1](https://github.com/nodejs/node/releases/tag/v24.22.1), [https://github.com/nodejs/node/releases/tag/v22.23.4](https://github.com/nodejs/node/releases/tag/v22.23.4)
20. Python Insider, Hugo van Kemenade, "Python 3.15.1, 3.14.9 and 3.13.17 are out" (21 October 2026): [https://blog.python.org/2026/10/python-3151-3149-31317/](https://blog.python.org/2026/10/python-3151-3149-31317/)
21. eMudhra, "eMudhra to Exit global SSL/TLS Certificate Business" (22 October 2026): [https://emudhra.com/en/press-release/emudhra-to-exit-global-ssl-tls-certificate-business](https://emudhra.com/en/press-release/emudhra-to-exit-global-ssl-tls-certificate-business)
22. eMudhra, "eMudhra Statement on Recent Certificate Security Incident" (first published 20 October 2026, last updated 22 October, fetched 25 October): [https://emudhra.com/en/post/certificate-security-incident](https://emudhra.com/en/post/certificate-security-incident)
23. Anthropic, Claude Code CHANGELOG, entry 2.1.303 (fetched 25 October 2026): [https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md](https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md)
24. Secondary: Python Software Foundation, Seth Larson, "Information for Python users regarding eMudhra / emSign CA certificate security incident", with a reply from Christian Heimes (20 October 2026): [https://discuss.python.org/t/information-for-python-users-regarding-emudhra-emsign-ca-certificate-security-incident/109576](https://discuss.python.org/t/information-for-python-users-regarding-emudhra-emsign-ca-certificate-security-incident/109576)
25. Secondary: "eMudhra Intermediate CA Compromise", community tracker published by Dennis Jackson with community contributors (from 20 October 2026, fetched 25 October): [https://emudhra.we-have-a-problem.com](https://emudhra.we-have-a-problem.com)

## Further reading

- [TLS/SSL](/glossary/tls-ssl/): how certificate chains and trust anchors work.
- [Digital signatures and certificates](/glossary/digital-signatures-and-certificates/): public key infrastructure and X.509 basics.
- [Supply chain security](/glossary/supply-chain-security/): why a vendored CA bundle is a dependency like any other.
- [AI supply chain security](/patterns/ai-supply-chain-security/): dependency scanning and pinning for AI systems.
- [AI security best practices](/guides/ai-security-best-practices/): the wider defensive posture.
- [Secrets management for AI](/guides/secrets-management-ai/): limiting what an intercepted API key can do.
- [AI agent security, September 2026](/news/ai-agent-security-roundup-september-2026/): the previous month's disclosures, including LiteLLM.
- [Claude Code](/tools/claude-code/): the coding agent listed by the tracker.
