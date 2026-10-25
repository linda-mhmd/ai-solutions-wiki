---
title: "Node.js October 2026 security release: ten CVEs and a Brotli bug that reaches beyond Node"
description: "Node.js 22.23.4, 24.22.1 and 26.12.1 shipped on 21 October 2026 with fixes for ten CVEs, four rated High. One of them, CVE-2026-111497, is an out-of-bounds write in Google's Brotli decoder that also affects Bun, Envoy, Istio, the PyPI brotli packages and Microsoft .NET."
date: 2026-10-21
lastmod: 2026-10-25
last_updated: 2026-10-25
last_verified: 2026-10-25
categories: [News]
tags: [security, vulnerabilities, cve, nodejs, brotli, tls, undici, openssl, envoy, istio, dotnet, supply-chain]
related:
  - glossary/nodejs
  - glossary/tls-ssl
  - glossary/supply-chain-security
  - patterns/ai-supply-chain-security
  - guides/ai-security-best-practices
  - news/openai-astra-critical-cyber-threshold
  - news/ai-agent-security-roundup-september-2026
---

On 21 October 2026 the Node.js project released 22.23.4 'Jod' (LTS), 24.22.1 'Krypton' (LTS) and 26.12.1 (Current), fixing ten CVEs: four rated High, three Medium and three Low by Node itself. Nine of them are ordinary runtime bugs, most of them in how Node checks a TLS certificate against an IP address. The tenth, CVE-2026-111497, is not really a Node bug at all. It sits in Google's Brotli decompression library, which Node bundles, and the same code ships inside Bun, Envoy, Istio, the Python `brotli` packages and Microsoft .NET, PowerShell and Visual Studio. Node was not the first to ship the fix: Envoy releases of 6 October and Istio releases of 15 October already contained it, without naming the CVE at first, as the timeline below shows.

This entry covers both halves: the Node release, and the Brotli bug with its downstream fixes, severity ratings and timeline.

## What happened: the Node.js release

Antoine du Hamel sent the pre-alert to the oss-security mailing list on 14 October, saying Node would release new 22, 24 and 26 versions "on or shortly after 2026-10-21 in order to address security vulnerabilities, the highest being HIGH." All three releases are dated 21 October and published by du Hamel; the 26.12.1 notes add "prepared by @RafaelGSS". Node's advisory notes that end-of-life release lines "are always affected when a security release occurs."

The advisory changed after release, although the page still says "Last Updated Oct 21, 2026". The nodejs.org repository history shows three edits. On 22 October Matteo Collina changed the Brotli credit from "Thank you, to mcollina for reporting this vulnerability and thank you aduh95 for fixing it." to the OpenAI Codex Security credit below. At 10:41 UTC on 23 October du Hamel replaced the handle "hasanfleyah" with the reporter's full legal name. Later that day Rafael Gonzaga added the technical descriptions of all ten CVEs. Until then, each entry carried only its title, the affected lines and the credits, and the Brotli entry had the placeholder sentence "A flaw in Node.js can cause Node.js Brotli decoder out-of-bounds write permits remote code execution." Every description quoted below is from the 23 October version.

### The ten CVEs

The descriptions below follow Node's advisory. Severity is Node's own rating. The CVSS 3.0 scores are the ones HackerOne, as the CVE Numbering Authority, filed with NVD on 23 October; NVD lists all nine as "Awaiting Analysis", so it has not scored them itself.

| CVE | Node rating | CVSS 3.0 (HackerOne) | Affected lines | What it is |
| --- | --- | --- | --- | --- |
| CVE-2026-105482 | High | 7.4 | 22, 24, 26 | DNS name truncation at a NUL byte |
| CVE-2026-105483 | High | 7.4 | 24, 26 | TLS hostname check with fullwidth-digit IPs |
| CVE-2026-106069 | High | 7.4 | 22, 24, 26 | TLS check against a different IP (leading-zero octets) |
| CVE-2026-111497 | High | see Brotli section | 22, 24, 26 | Brotli decoder out-of-bounds write |
| CVE-2026-105481 | Medium | 6.5 | 22, 24, 26 | Keep-alive socket accepts a pre-sent response |
| CVE-2026-106072 | Medium | 6.7 | 22, 24, 26 | Non-canonical IPv4 spellings matched against DNS SANs |
| CVE-2026-106074 | Medium | 4.8 | 22, 24, 26 | Random caches frozen into startup snapshots and SEAs |
| CVE-2026-106070 | Low | 3.7 | 26 | `zlib.ZipFile` returns attacker-controlled prefix bytes |
| CVE-2026-106071 | Low | 3.6 | 26 | Permission Model wildcard over-grant |
| CVE-2026-106073 | Low | 3.3 | 22, 24, 26 | Permission Model bypass via `fs.realpathSync()` |

**High.**

- **CVE-2026-105482.** `dns.resolve*()` and `dns.reverse()` pass the name to the c-ares library as a C string, so a NUL byte ends it early. Node's example: resolving `attacker.example\0.trusted.example` queries `attacker.example` "and returns its records without any error." An application that checks a hostname against an allowlist and then resolves it can act on records for a different name. Node calls this an incomplete fix of CVE-2026-48930, which covered only `dns.lookup()` and the `net` and `tls` host options.
- **CVE-2026-105483.** `tls.checkServerIdentity()` did not recognise an IPv4 host written with non-ASCII characters such as fullwidth digits (`１２７.0.0.1`) as an IP address, although it normalises and resolves to an ordinary one, and matched it against the certificate's DNS names instead. A certificate containing `DNS:127.0.0.1` or `DNS:*.0.0.1` could be accepted for an IP endpoint it was not issued for. Node describes it as "a regression introduced after the fix for CVE-2026-48618"; only 24.x and 26.x are affected.
- **CVE-2026-106069.** `tls.checkServerIdentity()` normalises hosts under the WHATWG URL rules, which read a leading-zero octet as octal, so `0127.0.0.1` becomes `87.0.0.1`. The connection itself goes through the operating system resolver, which on some platforms, Node names macOS, reads it as decimal, `127.0.0.1`. The certificate is therefore checked against a different IP address than the one the client connected to.
- **CVE-2026-111497.** The Brotli bug, covered in its own section below.

**Medium.**

- **CVE-2026-105481.** The guard that destroys an idle keep-alive socket when unexpected data arrives only runs when the event loop polls for I/O. If an unsolicited response is already sitting unread on the socket when it is handed to a new request, for example because the event loop was busy with synchronous work, the guard is removed without seeing it and the data is parsed as the response to the new request. An incomplete fix of CVE-2026-48931.
- **CVE-2026-106072.** Other non-canonical IPv4 spellings, `0177.0.0.1`, `0x7f.0.0.1`, `2130706433` or `127.1`, were not classified as IP addresses but were normalised and matched against DNS names, so a certificate with `DNS:127.0.0.1` and no IP Address SAN was accepted. Node notes exploitation needs a certificate with a numeric DNS SAN from a CA the client trusts, and a resolver that accepts these spellings, "such as glibc."
- **CVE-2026-106074.** The internal entropy caches behind `crypto.randomUUID()`, `crypto.randomUUIDv7()` and `crypto.randomInt()` were saved into user-land startup snapshots (`--build-snapshot`) and into single executable applications (SEAs) built with `useSnapshot`. If any of those functions, or an API that uses them such as `URL.createObjectURL()`, ran while the snapshot was built, every process started from it returns the same values "until the cache is refilled: up to 127 UUIDs and about 1,000 randomInt() values." Node's consequence: identifiers can collide across processes, "and values issued by one process can be predicted by observing another."

**Low.**

- **CVE-2026-106070** (26.x only). After `zlib.ZipFile` header validation failed, a parsed local header stayed cached without a content offset, so a later read returned attacker-controlled bytes from the start of the file. CRC-32 still passes because the attacker controls the central directory CRC, so a Node-based scanner can approve different content from what another ZIP tool extracts.
- **CVE-2026-106071** (26.x only). A radix-tree lookup in the Permission Model stopped comparing early when the requested path was shorter than a wildcard grant's prefix: `--allow-fs-read=/etc/passwd.*` also allowed reading `/etc/passwd`. It needs the wildcard grant to sit directly under the root of the permission tree.
- **CVE-2026-106073.** `fs.realpathSync()` skipped the Permission Model's read checks, so code under `--permission` could test file existence, resolve symlinks and enumerate paths outside the allowed directories. An incomplete fix of CVE-2026-21715, which covered only `fs.realpathSync.native()`.

Four of the ten are, in Node's own words, incomplete fixes of or regressions after earlier CVEs (105482, 105483, 105481, 106073), and three (105483, 106069, 106072) are the same family: IPv4 literals that one layer reads as an IP address and another does not.

### Who reported and fixed what

As credited in Node's advisory, in its 23 October version (the 21 October version credited mcollina as the reporter of CVE-2026-111497, see above). The release notes attribute the Brotli cherry-pick itself to Evgenii Kliuchnikov, the author of the upstream Google commit.

| CVE | Reported by | Fixed by |
| --- | --- | --- |
| CVE-2026-105482 | Hasan Flayyih Abdullah | jasnell |
| CVE-2026-105483 | Hasan Flayyih Abdullah | jasnell |
| CVE-2026-106069 | anagnorisis2peripeteia | mcollina |
| CVE-2026-111497 | OpenAI Codex Security: Khai Tran and Sylvie Mayer | mcollina and aduh95 |
| CVE-2026-105481 | Hasan Flayyih Abdullah | jasnell |
| CVE-2026-106072 | br41ny | mcollina |
| CVE-2026-106074 | gesposito | panva |
| CVE-2026-106070 | startimeash | mcollina |
| CVE-2026-106071 | malikhamzaiqbal | jasnell |
| CVE-2026-106073 | 0xoroot | RafaelGSS |

### Bundled dependency updates

Node's advisory lists dependency updates "to address public vulnerabilities". The release notes give the versions:

- **c-ares 1.34.9** on all three lines. The c-ares 1.34.9 release, dated 19 October and published on GitHub on 20 October, is a security release with eleven advisories: six use-after-free bugs, a memory corruption on cancelled lookups, a buffer overflow when `ares_dup()` or `ares_save_options()` runs while another thread changes the servers, uninitialised memory for a numeric IPv6 name with a prefix length, a query cache that could return an answer obtained with different EDNS options, and a DNS reply that "arrived from a different server than the one queried could be accepted." UDP replies must now come from the server's port as well as its address.
- **undici 6.29.1** (22.x), **7.30.1** (24.x) and **8.12.2** (26.x). undici is the HTTP client behind Node's built-in `fetch()`. All three were published on 15 October. 6.29.1 lists five CVEs and 7.30.1 and 8.12.2 eight each, including CVE-2026-109869 (High, CVSS 3.1 7.5 in GHSA-xjj6-f33q-929c): a malicious server returns more than five content codings and closes the connection early, and an error on an orphaned internal stream crashes the process "even when the application correctly catches the `fetch()` rejection." The others include a TLS validation bypass where `Agent` dropped function-valued TLS options such as `checkServerIdentity` (CVE-2026-109383), an EventSource memory exhaustion (CVE-2026-109924) and, on 7.x and 8.x, a Subresource Integrity bypass through non-lowercase algorithm tokens (CVE-2026-109841).
- **OpenSSL 3.5.9** on 22.x and 24.x. The OpenSSL advisory of 29 September covers fourteen issues. The only High one, CVE-2026-84782, is in DTLS: a retransmission is read from the offset where a suspended handshake write stopped, which can send heap memory to the peer or crash. Of the rest, one is Moderate and twelve are Low. Node's advisory does not say which of the fourteen affect Node.
- **SQLite 3.53.4** on 22.x.
- **Root certificates updated to NSS 3.131.1** on all three lines, listed in the advisory as "ca-cert (eMudhra Intermediate CA Compromise) on 26.x, 24.x, 22.x". The post does not explain the change further. The commit lists of all three releases also carry "tls: reject chains containing blocked public keys" (Ulises Gascón, PR #66871).

### Small inconsistencies in the record

- The 26.12.1 notable-changes list omits CVE-2026-106071 and the undici 8.12.2 update, although its commit list contains both ("src: fix the fs permission tree node on wildcard nodes", c273a408c9, and 7895a5cd2d) and the Security Working Group record marks 106071 patched in `^26.12.1`.
- The Security Working Group's machine-readable `vuln/core/index.json` was last regenerated on 25 August 2026, so the October CVEs are only in the individual records `vuln/core/195.json` to `204.json`, synced on 22 October. A scanner that reads only the index will not see them yet. Record `204.json` for CVE-2026-111497 still carries the original placeholder overview rather than the 23 October description.

## What is actually different: the Brotli bug

### The mechanism

Brotli is the compression format behind `Content-Encoding: br` on the web and inside WOFF2 fonts. CVE-2026-111497 is in the decoder, `c/dec/decode.c` in `google/brotli`, and Google is the CNA. Node's description of the root cause:

> "An invalid block switch was reported as a temporary need for more input instead of a permanent format error, so the streaming decoder kept appending input bytes to an eight-byte internal buffer."

The fix commit shows the shape of it. The function that decodes a block switch used to return one false value for two different situations: the stream asked for a block switch although it declares only one block type, which is a format error, and the bit reader had run out of input. The patched function returns a distinct error code, `BROTLI_DECODER_ERROR_FORMAT_BLOCK_SWITCH`, for the first case and `BROTLI_DECODER_NEEDS_MORE_INPUT` for the second. Node now exposes that new code in `zlib.constants`. Node's assessment is that an attacker who can supply Brotli data an application decompresses with `node:zlib` "can corrupt process memory, which can lead to a crash, disclosure of process memory, or remote code execution."

The CVE record, as published on NVD on 22 October, says Brotli 1.0.3 through 1.2.0 are affected on all platforms and tells users to move to 1.0.10, 1.1.1 or 1.2.1. Google tagged all three on 21 October. Anything that decompresses attacker-supplied Brotli is exposed: request bodies sent with `Content-Encoding: br`, responses from servers you do not control, compressed files and fonts. Patch the Planet adds that only compressing outgoing data with Brotli "does not by itself establish exposure."

### How severe: five ratings, all attributed

| Who | Rating | Notes |
| --- | --- | --- |
| Google (CNA), via NVD | CVSS 4.0 9.2, Critical | `AT:P`: attack requirements present. CWE-252 and CWE-787. |
| Node.js | High | Node's own scale |
| Microsoft | Critical for .NET and Visual Studio, Important for PowerShell; CVSS 3.1 8.1 | Classed as Elevation of Privilege. "Exploitation More Likely". |
| Envoy, in GHSA-3wvj-j6qm-62mr | Critical, CVSS 4.0 9.2 | Same vector as Google's |
| Ubuntu | Priority "Medium" | The `brotli` and `nodejs` packages "Needs evaluation" on every listed release as of 23 October |

Istio's bulletin does not score CVE-2026-111497 on its own. The single "CVSS Impact Score" in its header, 7.7 with vector `AV:N/AC:L/PR:L/UI:N/S:C/C:N/I:N/A:H`, is the same score the bulletin gives the istiod denial of service (GHSA-7p2q-4xvg-vxc6) it also covers, so it should not be read as Istio's rating of the Brotli bug.

The ratings differ because each one scores the bug from its own scale and product. Google, Envoy and Microsoft score the memory corruption as potential code execution; Node uses its own three-level scale; Ubuntu's priority is a triage label. On real-world exploitation the official records agree: CISA's SSVC entry of 23 October records exploitation "none", automatable "no" and technical impact "total"; Microsoft lists "Exploited: No"; and the CVE is not in CISA's Known Exploited Vulnerabilities catalog (version 2026.10.23). "Exploitation More Likely" is Microsoft's forecast, not a report of attacks.

Code execution has, however, been demonstrated in a lab. On 22 October Imperva Red Team (post by Ron Masas) reported that its "standalone proof of concept ran code carried in a Brotli response or request body inside applications using the official Node.js 24.22.0 Linux arm64 image", through both the built-in `fetch()` and Express 5 with body-parser 2. "The same inputs were rejected by 24.22.1." Imperva adds that "execution took multiple attempts in our setup" and that it "did not test every Node.js build or application." It published a description and a demo video, not the exploit code, and none of the sources read for this entry reports an independent reproduction. This is a vendor's own test result, in a post that also announces Imperva's WAF rules for the CVE. Node's regression test, added in commit 0392385841, does contain a 22-byte input that triggers the invalid block switch, which is a trigger, not an exploit.

### Who fixed it, and when

| Date (2026) | Project | Fixed version | Source |
| --- | --- | --- | --- |
| 27 February | google/brotli main branch | commit 0ed4268a, "Detect and report invalid stream earlier." | GitHub |
| 6 October | Envoy | 1.39.3, 1.38.6, 1.37.8, 1.36.12 | Envoy releases |
| 13 October | Envoy | 1.40.0 | Envoy releases |
| 15 October | Istio | 1.29.9, 1.30.6, 1.31.2 (ISTIO-SECURITY-2026-007) | Istio |
| 21 October | Google Brotli | 1.0.10, 1.1.1, 1.2.1 | GitHub releases |
| 21 October | Node.js | 22.23.4, 24.22.1, 26.12.1 | Node.js |
| 22 October | Bun | 1.4.4 (Brotli 1.2.0 to 1.2.1) | Bun |
| 22 October | PyPI `brotli` and `brotlicffi` | 1.2.1 and 1.2.1.0 (GHSA-9v8h-qqgm-4m35) | GitHub Advisory Database, PyPI |
| 23 October | Debian 12 bookworm | `brotli` 1.0.9-2+deb12u1 (DLA-4855-1) | Debian LTS |
| 23 October | Debian 13 trixie | `brotli` 1.1.0-2+deb13u1 (DSA-6582-1) | Debian Security |
| 23 October | Envoy | advisory GHSA-3wvj-j6qm-62mr published; no new Brotli release (the 1.40.1, 1.39.5, 1.38.8 and 1.37.10 releases of 22 and 23 October address the eMudhra CA compromise) | Envoy |
| 25 October | Microsoft | .NET 8, 9, 10 and 11, PowerShell 7.4 to 7.6, Visual Studio 2019 16.11, 2022 17.14, 2026 18.11 and 18.12 | Microsoft Security Update Guide |

Details worth knowing behind those rows:

- **The fix was public eight months before the CVE.** The commit Node cherry-picked, 0ed4268a, landed on the `google/brotli` main branch on 27 February 2026 with the message "Detect and report invalid stream earlier." and no mention of security. No tagged release contained it until 21 October, when Google backported it to the 1.0, 1.1 and 1.2 branches. Neither Google nor Node has said when the bug was reported, or whether the February commit was made as a security fix.
- **Envoy shipped first, quietly.** Its 6 October releases updated the bundled Brotli to a newer main-branch commit ("[v1.39] Update brotli to 42a2ed4", PR #48031); the release notes list two other advisories and do not mention Brotli. The Envoy advisory, published on 23 October, says impact is limited to "Envoy deployments that have Brotli decompressor configured" and credits "OpenAI Security Research". Its affected list names only the release immediately before each fix (1.39.2, 1.38.5, 1.37.7, 1.36.11), so it should not be read as a version range; use the Brotli range above. Patch the Planet notes that 1.36 is unsupported.
- **Istio added the CVE later.** The bulletin is dated 15 October, but the line naming CVE-2026-111497 was added to it on 20 October, according to the istio.io repository history. Istio says users "who enable Brotli decompression, for example with an EnvoyFilter, should upgrade". 1.29.9 is the final 1.29 release; 1.29 reached end of life on 15 October.
- **Microsoft's mitigation note** says Brotli decompression "is not enabled by default in an out-of-the-box .NET or ASP.NET Core install"; applications have to opt in to ASP.NET Core request decompression, `HttpClient` response decompression, or call the Brotli APIs directly. Two of the fixed builds Microsoft lists are pre-release: .NET 11 `11.0.100-rc.3.26522.148` and Visual Studio 2026 "18.12 Insiders 3".
- **"Node2Shell".** The name comes from Imperva: its 22 October post says "Node2Shell is Imperva Red Team's name for our analysis of CVE-2026-111497". The GitHub advisory for the Python packages carries it in its title, and Aikido's posts use it, Aikido also mentioning "Broccoli2Shell". The name is misleading: the bug is in Brotli, not Node.

### The story behind it

Node credits Khai Tran and Sylvie Mayer of OpenAI Codex Security with the report, and the Envoy advisory credits OpenAI Security Research. OpenAI's public guidance is on Patch the Planet, a disclosure site that describes itself as "An OpenAI Daybreak initiative", whose Brotli page was last updated on 23 October. Its acknowledgments thank "the OpenJS Foundation for helping coordinate the response" and name Matteo Collina, Antoine du Hamel, Rafael Gonzaga, Ulises Gascón, Robin Ginn, Yan Avlasov and Petr McAllister. None of the pages read for this entry says whether the bug was found by a model, by people using Codex Security, or both. OpenAI's own announcement page for Patch the Planet could not be fetched for this entry (it returned HTTP 403).

On oss-security the thread ran over three days. On 22 October Alan Coopersmith of Oracle Solaris engineering reposted the advisory to the list, noting "I didn't see a followup", with the original one-line Brotli text and credits. On 23 October Jan Schaumann replied to that repost: "It's not quite obvious from this advisory, but the underlying problem is not restricted to Node.js alone, but rather in Google brotli ... this could have ramifications everywhere." He wrote it to stop readers concluding "I don't use Node.js, so nothing to worry about", and questioned whether operating system vendors were treating it with enough urgency, citing Ubuntu's "medium" priority. He also speculated that OpenSSL's handling of Brotli-compressed certificates might be affected; no vendor has confirmed that. Michael Orlitzky answered that only software that bundles or statically links its dependencies is exposed this way, adding "NodeJS has a --shared-brotli option, so NodeJS should not be an issue for distros that are paying attention." Debian's tracker makes the same point for its own package: "nodejs uses system provided brotli library". On 24 October Coopersmith pointed readers to Patch the Planet's list, the Brotli 1.2.1 release and Aikido's post on the PyPI packages.

Patch the Planet's interim mitigations, until you can patch:

- **Incoming requests:** reject `Content-Encoding: br` before any proxy, middleware or body parser decompresses it, on direct-to-origin routes as well.
- **Express:** a guard registered before every body parser that returns HTTP 415 for anything other than `identity`, `gzip` or `deflate`; as a fallback, `inflate: false` on every body parser, which rejects all compressed bodies, gzip included.
- **Next.js:** set `images.unoptimized = true` until Node is patched, so the built-in image optimizer stops fetching and decoding remote images. Patch the Planet notes this "does not protect other server-side fetches, custom image loaders, or other Brotli decoders."
- **Envoy and Istio:** remove or disable only the decompressor filter that uses the Brotli library, in both directions, and keep the gzip and zstd filters.
- It adds that turning off Brotli response compression on a CDN or web server "does not disable request or client-side decompression", and that removing `br` from `Accept-Encoding` alone does not stop a server from sending it.

## What is new, and what is not

New: a single upstream decoder bug that every major runtime and proxy bundles, with fixes spread over 19 days, from Envoy on 6 October to Microsoft on 25 October, and four advisory formats. The Brotli fix itself is small, a function that now tells "bad stream" apart from "need more bytes".

Not new: Node's TLS identity checks and Permission Model have been patched in the same places before, as four of the ten CVEs say about themselves. And the claims at the edges deserve care. "Remote code execution" is the worst case every rater names. Imperva reports demonstrating it in a lab on one official build, without publishing the exploit, and CISA records no exploitation in the wild. The Critical labels come from Google's, Envoy's and Microsoft's scoring. They do not describe what is happening in the wild.

## Why it matters for builders

- **Upgrade Node in your base images, not only on laptops.** 22.23.4, 24.22.1 or 26.12.1. Rebuild container images that pin an older `node:` tag, then restart every service, worker and scheduled job; a running process keeps the old binary. Older release lines get no fix.
- **Rebuild SEAs and startup snapshots.** An SEA embeds the Node binary, so it only gets the fixes when you rebuild it with a patched Node. For CVE-2026-106074 the bad values live in the snapshot itself, so rebuild snapshot blobs with the patched release too. Until then, do not call `crypto.randomUUID()` or `randomInt()` while a snapshot is being built.
- **Look for Brotli outside Node.** Check `pip show brotli brotlicffi` in Python images (fixed 1.2.1 and 1.2.1.0), Bun (1.4.4), Envoy (1.40.0, 1.39.3, 1.38.6, 1.37.8) and Istio meshes (1.30.6 or 1.31.2; move off 1.29), and distribution `brotli` packages (Debian 12 and 13 are fixed; Ubuntu had not evaluated them as of 23 October). A distribution Node built against the system library, such as Debian's, gets the fix through that `brotli` package, not through a Node update. Patch the Planet also flags Electron apps, which can carry a Brotli copy in both Chromium and the embedded Node runtime. For .NET, PowerShell and Visual Studio, install the 25 October servicing updates, and check whether your code opts in to Brotli request or response decompression.
- **If you cannot patch today**, block `Content-Encoding: br` before decompression and turn off automatic Brotli decoding in HTTP clients for untrusted servers, as listed above.
- **Treat hostnames as untrusted input.** Three of the TLS bugs turn on IPv4 literals that different layers read differently. If your code accepts hosts from users, configuration or a model's tool call, canonicalise them once, reject non-canonical forms, and use the same parsed value for both the connection and the certificate check. The same goes for names passed to `dns.resolve*()`: reject NUL bytes before validation.
- **Rely on the per-record files for scanning.** Tools that read the Security Working Group's `index.json` did not see the October CVEs as of 25 October. Checking `node --version` against the fixed versions is more reliable.

## Sources

1. Node.js, "Wednesday, October 21, 2026 Security Releases" (21 October 2026; credits revised 22 and 23 October, CVE descriptions added 23 October; fetched 25 October 2026): https://nodejs.org/en/blog/vulnerability/october-2026-security-releases
2. Node.js, "Node.js 24.22.1 (LTS)" release notes (21 October 2026): https://nodejs.org/en/blog/release/v24.22.1
3. Node.js, "Node.js 22.23.4 (LTS)" release notes (21 October 2026): https://nodejs.org/en/blog/release/v22.23.4
4. Node.js, "Node.js 26.12.1 (Current)" release notes (21 October 2026): https://nodejs.org/en/blog/release/v26.12.1
5. Antoine du Hamel, "Upcoming Node.js security release 2026/10/21", oss-security (14 October 2026): https://www.openwall.com/lists/oss-security/2026/10/14/10
6. Node.js Security Working Group, vulnerability records `vuln/core/195.json` to `204.json` (synced 22 October 2026) and `index.json` (last regenerated 25 August 2026), fetched 25 October 2026: https://github.com/nodejs/security-wg/tree/main/vuln/core
7. NIST NVD, CVE-2026-105482, with the HackerOne CVSS 3.0 score (published 23 October 2026; the other eight Node CVEs follow the same URL pattern): https://nvd.nist.gov/vuln/detail/CVE-2026-105482
8. NIST NVD, CVE-2026-111497, with the Google CVSS 4.0 score and CISA SSVC entry (published 22 October 2026, last modified 24 October 2026): https://nvd.nist.gov/vuln/detail/CVE-2026-111497
9. Google, Brotli v1.2.1 release (21 October 2026); v1.1.1 and v1.0.10 published the same day: https://github.com/google/brotli/releases/tag/v1.2.1
10. Google, Brotli commit 0ed4268a, "Detect and report invalid stream earlier." (27 February 2026): https://github.com/google/brotli/commit/0ed4268a4401abcb4472096340477cf4af7d1a2b
11. GitHub Advisory Database, GHSA-9v8h-qqgm-4m35, Brotli in the PyPI `brotli` and `brotlicffi` packages (published 22 October 2026, updated 23 October 2026): https://github.com/advisories/GHSA-9v8h-qqgm-4m35
12. Envoy, GHSA-3wvj-j6qm-62mr, "Out-of-Bounds Write in Brotli Decompressor" (23 October 2026): https://github.com/envoyproxy/envoy/security/advisories/GHSA-3wvj-j6qm-62mr
13. Envoy, v1.39.3 release (6 October 2026) and PR #48031, "[v1.39] Update brotli to 42a2ed4": https://github.com/envoyproxy/envoy/releases/tag/v1.39.3
14. Istio, ISTIO-SECURITY-2026-007 (15 October 2026; CVE-2026-111497 added 20 October 2026): https://istio.io/latest/news/security/istio-security-2026-007/
15. Bun, "Bun v1.4.4" (Jarred Sumner, 22 October 2026): https://bun.com/blog/bun-v1.4.4
16. Bun, PR #46392, "Fix regressions since 1.4.3 ... and update brotli" (merged 22 October 2026 UTC): https://github.com/oven-sh/bun/pull/46392
17. Microsoft Security Response Center, Security Update Guide, CVE-2026-111497 (25 October 2026): https://msrc.microsoft.com/update-guide/vulnerability/CVE-2026-111497
18. Patch the Planet, "Brotli decoder vulnerability" (updated 23 October 2026, fetched 25 October 2026): https://patchtheplanet.org/brotli
19. Debian LTS, DLA-4855-1, "brotli security update" (23 October 2026): https://lists.debian.org/debian-lts-announce/2026/10/msg00049.html
20. Ubuntu, CVE-2026-111497 (published 23 October 2026, fetched 25 October 2026): https://ubuntu.com/security/CVE-2026-111497
21. CISA, Known Exploited Vulnerabilities Catalog, version 2026.10.23 (fetched 25 October 2026): https://www.cisa.gov/known-exploited-vulnerabilities-catalog
22. undici, v7.30.1 security release (15 October 2026); v6.29.1 and v8.12.2 published the same day: https://github.com/nodejs/undici/releases/tag/v7.30.1
23. GitHub Advisory Database, GHSA-xjj6-f33q-929c, undici excessive content-encodings DoS, CVE-2026-109869 (published 23 October 2026): https://github.com/advisories/GHSA-xjj6-f33q-929c
24. c-ares, 1.34.9 release (19 October 2026, published on GitHub 20 October 2026): https://github.com/c-ares/c-ares/releases/tag/v1.34.9
25. OpenSSL, "OpenSSL Security Advisory [29th September 2026]": https://openssl-library.org/news/secadv/20260929.txt
26. nodejs.org repository, commit history of the October 2026 advisory (commits of 14, 21, 22 and 23 October 2026, fetched 25 October 2026): https://github.com/nodejs/nodejs.org/commits/main/apps/site/pages/en/blog/vulnerability/october-2026-security-releases.md
27. Node.js, commit 0392385841, "src: expose `BROTLI_DECODER_ERROR_FORMAT_BLOCK_SWITCH`", with the regression test (committed 20 October 2026, released in 26.12.1 on 21 October 2026): https://github.com/nodejs/node/commit/0392385841
28. Debian Security, DSA-6582-1, "brotli security update" (23 October 2026): https://lists.debian.org/debian-security-announce/2026/msg00498.html
29. Debian security tracker, CVE-2026-111497 (fetched 25 October 2026): https://security-tracker.debian.org/tracker/CVE-2026-111497
30. Imperva Threat Research, Ron Masas, "Node2Shell: From Brotli Data to Remote Code Execution" (22 October 2026, modified the same day; primary for Imperva's own test results, not independently reproduced): https://www.imperva.com/blog/node2shell-from-brotli-data-to-remote-code-execution/
31. Secondary, for colour: Alan Coopersmith, "Re: Upcoming Node.js security release 2026/10/21", oss-security (22 October 2026): https://www.openwall.com/lists/oss-security/2026/10/22/8
32. Secondary, for colour: Jan Schaumann, "Re: Upcoming Node.js security release 2026/10/21", oss-security (23 October 2026): https://www.openwall.com/lists/oss-security/2026/10/23/25
33. Secondary, for colour: Michael Orlitzky, "Re: Upcoming Node.js security release 2026/10/21", oss-security (23 October 2026, archived under 24 October): https://www.openwall.com/lists/oss-security/2026/10/24/3
34. Secondary, for colour: Alan Coopersmith, "Re: Brotli CVE-2026-111497", oss-security (24 October 2026): https://www.openwall.com/lists/oss-security/2026/10/24/6
35. Secondary, for colour: Dania Durnas, Aikido, "Node2Shell evolves to HTTP2Shell" (23 October 2026, updated 25 October 2026): https://www.aikido.dev/blog/python-packages-vulnerable-node2shell-brotli-cve-2026-111497

## Further reading

- [Node.js](/glossary/nodejs/): what the runtime is and how it is built.
- [TLS/SSL](/glossary/tls-ssl/): how certificates and hostname verification work, the background to three of the CVEs.
- [Supply Chain Security](/glossary/supply-chain-security/): why one bundled library can reach this many products.
- [AI Supply Chain Security](/patterns/ai-supply-chain-security/): the same problem for model-serving stacks.
- [Istio](/glossary/istio/) and [Service Mesh](/glossary/service-mesh/): where the Envoy Brotli filter sits.
- [AI Security Best Practices](/guides/ai-security-best-practices/): the broader defensive posture.
- [Astra Becomes the First OpenAI Model to Cross the 'Critical' Cyber Threshold](/news/openai-astra-critical-cyber-threshold/): OpenAI's own account of AI-driven vulnerability discovery.
- [AI Agent Security, September 2026](/news/ai-agent-security-roundup-september-2026/): the previous month's security roundup.
