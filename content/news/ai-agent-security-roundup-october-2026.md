---
title: "Agent security, October 2026: MCP SDK isolation flaws, Claude Code CVEs, framework advisories"
description: "October 2026 advisories for AI agent infrastructure, read from the GitHub advisory records: MCP SDKs that mixed up clients and sessions, Claude Code CVEs fixed months before their advisories and a Claude Desktop CVE, A2A and framework isolation bugs, vLLM, AutoGPT and MLflow, plus minimum safe versions."
date: 2026-10-23
lastmod: 2026-10-25
last_updated: 2026-10-25
last_verified: 2026-10-25
categories: [News]
tags: [ai-security, ai-agents, mcp, a2a, claude-code, vulnerabilities, cve, multi-tenancy, vllm, langgraph, strands-agents, supply-chain]
related:
  - news/ai-agent-security-roundup-september-2026
  - news/mcp-security-vulnerabilities-2026
  - news/plugin4shell-coding-agents-rce
  - tools/mcp-protocol
  - tools/claude-code
  - tools/strands-agents
  - tools/langgraph
  - tools/microsoft-agent-framework
  - tools/mem0
  - tools/vllm
  - tools/mlflow
  - news/ai-agent-security-incidents-2025-2026
  - patterns/ai-supply-chain-security
---

The [September roundup](/news/ai-agent-security-roundup-september-2026/) was about exploited gateways and poisoned records. October's advisories have a different theme. Most of them are isolation failures: a server, store or gateway that was meant to keep one client, session or tenant apart from the next, and did not. The official Model Context Protocol (MCP) TypeScript SDK delivered one HTTP client's responses to another. The Strands Agents A2A server shared conversation history between callers. LangGraph's Postgres and SQLite stores let one namespace label reach another. Envoy AI Gateway resumed MCP sessions without checking who was resuming them.

The second theme is late disclosure. Several advisories published in October describe fixes that shipped weeks, months or, in one case, more than three years earlier. If you only upgrade when an advisory appears, you were exposed for that whole gap without knowing it. If you were already on current versions, most of this month's list needs no action beyond reading it.

**How the figures here were read.** Every severity, score, version range and date below comes from the advisory record itself, fetched through the GitHub API on 25 October 2026. Many advisories exist twice: as a repository advisory published by the maintainers, and as a reviewed copy in the GitHub Advisory Database, which often appears days or weeks later. Where the two dates differ, both are given, because two research passes for this article disagreed on several dates for exactly that reason. NVD may score the same CVE differently. One CVE in this article is in CISA's Known Exploited Vulnerabilities catalog (catalog version 2026.10.23): the Windows Shell flaw CVE-2026-96951 in section 6, which Microsoft marks as exploited. None of the agent infrastructure CVEs in sections 1 to 5 is in the catalog, none of their records reports exploitation, and two of them (Storybook and Microsoft Agent Framework) say explicitly that no exploitation is known.

## What happened

### 1. The official MCP SDKs

#### TypeScript: one client's messages delivered to another

The headline advisory is **GHSA-jm63-cq47-j5jp** (CVE-2026-111770, High, CVSS 3.1 7.7, CWE-362). An MCP server reached over HTTP could deliver one client's responses and notifications to a different client when clients shared one stateless transport, or one `McpServer` or `Server` instance. The mechanism, in the advisory's words: "Messages were matched to a connection by JSON-RPC `id` alone. SDK clients number requests from 0, so ids collide in normal use." The February 2026 advisory for the 1.x line (below) spelled out what that collision does: "The second client's request overwrites the first client's mapping entry, routing the response to the wrong HTTP stream."

The detail that matters most is where the vulnerable pattern came from. The advisory says: "Until this release, the README examples of `@modelcontextprotocol/hono`, `express`, `fastify` and `node` showed that pattern." Developers who copied the official examples built the bug in.

This is not a new class of bug for this SDK. In February 2026 the same project published GHSA-345p-7cg4-v4c7 (CVE-2026-25536), "Sharing server/transport instances can leak cross-client response data", fixed in `@modelcontextprotocol/sdk` 1.26.0. The new advisory lists "`@modelcontextprotocol/sdk` 1.26.0 and later" as not affected. The affected code is the 2.x line, `@modelcontextprotocol/server` 2.0.0 to 2.2.0; 2.0.0 was published to npm on 27 July 2026. The advisory does not discuss how the 2.x packages came to repeat the 1.x bug, so this article does not either.

The fix is not a plain upgrade. Version 2.3.0 refuses to be shared, so an affected app starts failing requests after upgrading: "a second `connect()` rejects with `ALREADY_CONNECTED`, and a stateless transport rejects its second request." The advisory gives three ways to restructure: a `createMcpHandler()` factory that builds a new server per call, a new server and transport per request, or one server and transport per session via `sessionIdGenerator`. stdio servers are not affected.

The same project published five more advisories between 2 and 15 October. Two of them ship their protection switched off, and the advisories say so in bold: "**Upgrading alone changes nothing.**"

| Package | Advisory / CVE | Severity as published | Affected | Fixed | Published |
| --- | --- | --- | --- | --- | --- |
| `@modelcontextprotocol/server` | GHSA-jm63-cq47-j5jp / CVE-2026-111770: shared transport or server sends one client's messages to another | High, CVSS 3.1 7.7 | 2.0.0 to 2.2.0 | 2.3.0, plus a code change | Repo 15 Oct; database 20 Oct |
| `sdk`, `server` | GHSA-46jr-4wx8-v453 / CVE-2026-111768: one request within the default 4 MiB limit can exhaust memory during validation | High, CVSS 3.1 7.5 | sdk 1.3.0 to 1.31.0; server 2.0.0 to 2.2.0 | sdk 1.32.0; server 2.3.0; then set `maxToolInputElements` (off by default) | Repo 15 Oct; database 20 Oct |
| `sdk`, `server`, `node`, `hono` | GHSA-f897-62hf-6gxq (no CVE in the record): no limit on POST body size or JSON-RPC batch length | High, CVSS 3.1 7.5 | sdk 1.10.0 to 1.30.0; server, node and hono 2.0.0 | sdk 1.30.1; server and node 2.1.0; hono 2.0.1 | Repo 15 Oct; not in the reviewed database when fetched |
| `sdk`, `server`, `express`, `server-legacy` | GHSA-rvq5-wwqv-78pq / CVE-2026-111771: bearer authentication did not check the token's audience | Medium, CVSS 3.1 6.8 | sdk 1.6.0 to 1.31.0; server 2.0.0 to 2.2.0; express 2.0.0 to 2.0.1; server-legacy 2.0.0 to 2.3.0 | sdk 1.32.0; server 2.3.0; express 2.0.2; server-legacy 2.3.1; then set `expectedResource` (off by default) | Repo 5 Oct; database 20 Oct |
| `sdk`, `client` | GHSA-6prh-2h8m-c8cw / CVE-2026-111769: client transports and OAuth requests followed cross-origin redirects | Medium, CVSS 3.1 6.5 | sdk through 1.31.0; client 2.0.0 to 2.2.0 | sdk 1.32.0; client 2.3.0 | Repo 2 Oct; database 20 Oct |
| `sdk` | GHSA-22jm-h49p-29qw / CVE-2026-111767: experimental tasks not tied to the session that created them | High, CVSS 3.1 8.6 | sdk 1.24.0 to 1.31.0 (2.x not affected) | 1.32.0 | Repo 2 Oct; database 20 Oct |

Three of these deserve a sentence each:

- **Audience check (GHSA-rvq5).** Where one authorization server issues tokens for several services, a valid token for another service was accepted by your MCP server. After upgrading you must pass `expectedResource` to `requireBearerAuth()` and return the token's audience from `verifyAccessToken()` as `AuthInfo.resource`. With only the first change, the advisory warns, "every request gets `401`." The no-upgrade workaround is to reject any token whose `aud` does not include your server inside `verifyAccessToken()`.
- **Redirects (GHSA-6prh).** If an MCP or authorization server redirected to another origin, that origin received custom headers such as an `X-API-Key` and the `mcp-session-id` header, and "On a `307` or `308` it also received the request body, including OAuth token requests with their `refresh_token` and `client_secret`." The advisory notes that current runtimes already drop the `Authorization` header across origins. If a redirect may have reached a host you do not control, it says to rotate the API keys and `client_secret` and revoke tokens.
- **Experimental tasks (GHSA-22jm).** Clients sharing one `InMemoryTaskStore` could list, read and cancel each other's tasks. The advisory's own advice is to stop using the feature: "Experimental tasks are deprecated. The 2026-07-28 specification replaced them with a redesigned extension." It offers a one-line check: if `grep -ri taskstore --exclude-dir=node_modules .` finds nothing, you are not affected.

The npm registry shows `@modelcontextprotocol/sdk` 1.32.0 and `@modelcontextprotocol/server` 2.3.0 were both published on 2 October 2026, so the fixes were available before any of the advisories went public. The latest versions on 25 October were sdk 1.32.2 and server 2.4.0 (both 23 October). One related advisory sits just outside the window: GHSA-6qxp-vccf-f47h (CVE-2026-104850, High, CVSS 3.1 7.5; repository 30 September, database 6 October), in which the OAuth client let the MCP server choose which authorization server received the client's credentials, fixed in sdk 1.31.0 and client 2.2.0.

#### Python: sessions that were never reclaimed, fixed three weeks before the advisory

**GHSA-84m7-p3x7-pcfv** (CVE-2026-59951) covers the Python SDK's Streamable HTTP transport in stateful mode, which is the default. Sessions never expired, a client `DELETE` ended a session but left its entry registered, and a session whose first request was refused stayed registered with a running task. "A client that could reach the endpoint could grow server memory without bound using ordinary short requests; only a restart reclaimed it." The advisory adds that "Authentication limits who can open sessions, not how many a token holder can open."

The fix adds `session_idle_timeout` (default 1800 seconds, after which the session ID answers `404`) and `max_sessions` (default 10000, after which new sessions get `503`). The advisory is candid about the limit of that fix: "This bounds retention rather than eliminating it". A live session still holds its `initialize` parameters, "up to roughly twice the 4 MiB body limit". The workaround on unpatched versions is `stateless_http=True` (1.12.0 or later) where no per-session state is needed.

The timeline is the story. `mcp` 1.30.0 and 2.2.0 were released on 7 September 2026. Their release notes describe the change openly but as a behaviour change, under the heading "Idle Streamable HTTP sessions now expire", without calling it a security fix or naming an advisory. The repository advisory followed on 30 September, NVD published the CVE on 14 October, and the reviewed GitHub Advisory Database entry on 15 October. That is 23 days from fixed release to repository advisory and 38 days to the reviewed database entry. Anyone deciding what to patch from advisories alone would have seen nothing for at least the first 23 days. The severity also depends on which record you read: the repository advisory says High with CVSS 3.1 7.5; the database entry says Medium, carrying both CVSS 4.0 6.9 and CVSS 3.1 7.5; NVD shows the CNA's CVSS 4.0 6.9 and the status "Awaiting Analysis".

Two Python advisories mirror TypeScript ones, and both name their fixed versions in the record:

| Package | Advisory / CVE | Severity as published | Affected | Fixed | Published |
| --- | --- | --- | --- | --- | --- |
| `mcp` | GHSA-84m7-p3x7-pcfv / CVE-2026-59951: unbounded session accumulation in Streamable HTTP | Database: Medium (CVSS 4.0 6.9, CVSS 3.1 7.5). Repo: High (CVSS 3.1 7.5) | 1.8.0 to 1.29.1; 2.0.0 to 2.1.1 | 1.30.0; 2.2.0 | Repo 30 Sep; NVD 14 Oct; database 15 Oct |
| `mcp` | GHSA-w4fh-qvv9-3v23 (no CVE in the record): bearer authentication accepted tokens for another resource server | Medium, CVSS 3.1 6.8 | 1.10.0 to 1.29.1; 2.0.0 to 2.1.1 | 1.30.0; 2.2.0; then set `validate_token_resource=True` | Repo 5 Oct |
| `mcp` | GHSA-5h93-6whr-6q8j (no CVE in the record): client transports followed cross-origin redirects with custom headers and bodies | Medium, CVSS 3.1 5.9 | 1.8.0 to 1.29.1; 2.0.0 to 2.1.1 | 1.30.0; 2.2.0; no code change needed | Repo 2 Oct |

The audience advisory repeats the warning: "**Upgrading alone changes nothing.**" It also says `validate_token_resource` "will default to `True` in 3.0." The latest `mcp` release on PyPI on 25 October was 2.3.0 (2 October).

#### FastMCP, Envoy AI Gateway, Nginx UI and Storybook

| Package | Advisory / CVE | Severity as published | Affected | Fixed | Published |
| --- | --- | --- | --- | --- | --- |
| `fastmcp`, `fastmcp-slim` | GHSA-7xgj-8392-5q4r: post-transform component authorization skipped on direct calls | Medium, CVSS 3.1 6.8 | 3.0.0 to 3.4.9; 4.0.0 to 4.1.1 | 3.4.10; 4.1.2 | Repo 20 Oct; database 23 Oct |
| `fastmcp`, `fastmcp-slim` | GHSA-vqqp-x5qm-5qp4: M2M OAuth providers without issuer binding | Medium, CVSS 3.1 5.9 | 4.0.0a1 to 4.1.1 | 4.1.2, then set `issuer=` | Repo 20 Oct; database 23 Oct |
| `github.com/envoyproxy/ai-gateway` | GHSA-953h-535j-jg2v: MCP session resume ignores the embedded subject; Helm chart ships a fixed default seed | Database: Medium, CVSS 4.0 6.8. Repo: High, no score | Database: 0.4.0-rc1 up to 1.2.0-rc1. Repo: up to 1.1.0 | Database: 1.2.0-rc1. Repo: 1.2.0 | Repo 7 Oct; database 19 Oct |
| `github.com/0xJacky/nginx-ui` | GHSA-9jww-cxg5-rj9m / CVE-2026-84318 and GHSA-76pm-mq2q-9gcr / CVE-2026-84317: MCP tool `nginx_config_add` skips directive validation | High, CVSS 3.1 8.8 (both) | Before commit `23d1934` | Go pseudo-version from that commit, dated 3 July 2026 | Repo 17 Jul (both); NVD 12 Oct; database 15 Oct |
| `storybook` and related packages, including `@storybook/addon-mcp` | GHSA-f2ph-cmg5-wxc8 / CVE-2026-114125: missing origin validation in the preview | Critical, CVSS 4.0 9.4 | 8.0.0 to before 8.6.19; 9.x before 9.1.21; 10.x before 10.6.2 (addon-mcp 10.6.0 to 10.6.1) | 8.6.19; 9.1.21; 10.6.2 | Repo 12 Oct; database 21 Oct |

**FastMCP.** A server transform could change the metadata a component's authorization policy depends on. Listing applied the transform and then checked the policy; direct lookups checked the original component and returned the transformed one. The reporter's proof of concept lists no tools to the low-privilege caller and then prints `VULNERABLE: direct call returned PROTECTED SECRET`. The report states that "OpenAI Codex assisted static analysis/PoC/writeup". The reporter places the second FastMCP advisory in "the same vulnerability class as GHSA-qx49-fqc8-xw99 (Python MCP SDK) and GHSA-6qxp-vccf-f47h (TypeScript MCP SDK), applied to fastmcp's wrapper layer". The maintainers write that "Upgrading alone is insufficient": you must pass `issuer=`.

**Envoy AI Gateway.** The gateway's client-facing MCP session ID embeds the caller's JWT `sub` claim as an anti-hijacking check, but the resume path never compares it with the current caller. On top of that, the official Helm chart ships `seed: "default-insecure-seed"` as the key seed for encrypting those session IDs, so, the report says, knowing the seed is enough to "both decrypt observed session IDs and encrypt new ones for an arbitrary chosen subject/backend-session combination." The report is marked "code-level, not run against a live cluster". The record's package is `github.com/envoyproxy/ai-gateway`, but its source location points to `theagentrouter/agent-router`. On 25 October the GitHub API resolved `envoyproxy/ai-gateway` to `theagentrouter/agent-router`, which suggests the repository was transferred. This article has not confirmed why.

**Nginx UI** is an older bug that entered the reviewed database in October. A hardening commit on 21 April 2026 added directive validation to three of the four config-write paths and missed the MCP tool `nginx_config_add`, so an authenticated MCP caller "(or an MCP agent induced via prompt injection)" could write `perl` or `js_*` directives and get code execution where those nginx modules are loaded. The fix commit is from 3 July 2026.

**Storybook.** `@storybook/addon-mcp` appears in the affected package list, but the advisory says you are not affected if you "run a dev server that you never open in a web browser (e.g. headless automation, MCP clients)". The attack runs from a malicious website through the browser. This article has not checked whether the MCP addon itself adds an attack path beyond being part of the affected dev server.

No new MCP specification version was released in the window. The latest release in the specification repository is still 2026-07-28.

### 2. Claude Code and Claude Desktop: disclosed in October, Claude Code fixes shipped months earlier

| Package | Advisory / CVE | Severity as published | Affected | Fixed | Published |
| --- | --- | --- | --- | --- | --- |
| Claude Desktop (Windows) | GHSA-4p2j-qj3c-6x84 / CVE-2026-88066: uncontrolled search path for `git.exe` (CWE-427) | High, CVSS 4.0 7.5 | Below 1.8089.0 | 1.8089.0 | 13 Oct |
| `@anthropic-ai/claude-code` | GHSA-5j29-h97v-84ch / CVE-2026-103435: arbitrary file write through write-time symlink following (TOCTOU) | High, CVSS 4.0 7.7 | Below 2.1.129 | 2.1.129, published to npm 5 May 2026 | 5 Oct |
| `@anthropic-ai/claude-code` | GHSA-pq7j-f95f-qfcv / CVE-2026-86063: plugin commit SHA pin bypass ([Plugin4Shell](/news/plugin4shell-coding-agents-rce/)) | Repo: High, CVSS 4.0 7.7. Database: High, CVSS 4.0 7.5 | Below 2.1.179 | 2.1.179, published to npm 16 June 2026 | Repo 9 Oct; NVD 13 Oct; database 15 Oct |

**Claude Desktop on Windows** used `uv_spawn` to run `git.exe` without an absolute path, so Windows searched the current working directory first. A `git.exe` planted in a project, for example in a cloned repository, ran when the user opened that folder. The advisory credits "Junhyuk Im, Jeongmin Choi, and Seungyun Lee of S2W". It does not give a release date for 1.8089.0, and this article has not verified one.

**Claude Code's symlink race** came from checking a path at permission time and resolving it again at write time. An attacker with write access to a shared workspace could swap a project file for a symlink between the two steps and redirect an edit to a file outside the project, "(e.g., shell configuration) in a higher-privileged session." The credit is "hackerone.com/c_h4ck_0". The advisory, published on 5 October, is included here because the September roundup did not cover it.

**Plugin4Shell** now has a CVE: CVE-2026-86063, credited to "Or Nevo Michrowski of Air Security". Anthropic's repository advisory was published on 9 October with CVSS 4.0 7.7; NVD published the CVE on 13 October, and the reviewed database copy followed on 15 October with CVSS 4.0 7.5. The [Plugin4Shell article](/news/plugin4shell-coding-agents-rce/) covers it.

The two Claude Code advisories say "Users on standard Claude Code auto-update have received this fix already." The Claude Desktop one says the same of Claude Desktop auto-update. The current Claude Code release on 23 October was 2.1.310. The two Claude Code fixes therefore predate their advisories by five and four months (5 May to 5 October is 153 days; 16 June to 9 October is 115 days). If you pin Claude Code in CI or a container image, check the version. Otherwise, auto-update has already applied these fixes.

One more advisory from just before the window, also not covered in September: GHSA-v234-4jrq-mgg6 (High, no CVE, 25 September). Claude Desktop on macOS blocks file types that execute when opened from a Cowork shared folder, and the list missed one, so a file written by "a compromised or prompt-injected agent" could run commands if the user opened it. It is fixed in Claude Desktop 1.15962.0.

The Claude Code changelog for the window also contains sandbox fixes that have no advisory. Version 2.1.309 (published to npm 22 October) fixed "sandboxed Bash commands on macOS and Linux running the shell's startup files outside the sandbox before each command" and "sandboxed commands and auto-accepted edits being able to modify the MCP config file passed with `--mcp-config`", and "Changed `claude ultrareview` to require workspace trust". Version 2.1.307 (21 October) added "the `claude_code.safety_event` OpenTelemetry event for each tool call a permission rule, auto mode, a safety check, a hook or the sandbox stopped, prompted or sent back". That event gives teams a way to log blocked actions centrally rather than reading local transcripts.

### 3. A2A servers and agent frameworks

| Package | Advisory / CVE | Severity as published | Affected | Fixed | Published |
| --- | --- | --- | --- | --- | --- |
| `strands-agents`, `@strands-agents/sdk` | GHSA-4v6f-7vjh-6x4m / CVE-2026-115419: A2A server shared conversation history across `context_id` values | High. Database: CVSS 3.1 8.1 and CVSS 4.0 8.6. Repo: CVSS 3.1 8.1 only | Python below 1.43.0; TypeScript below 1.5.0 | 1.43.0 and 1.5.0, both published 12 June 2026 | Repo 22 Oct; NVD 22 Oct; database 23 Oct |
| `strands-agents` | GHSA-3w55-933p-8pv5: symlink attack in default session file storage, local privilege escalation | High (no score in the metadata; the report text gives CVSS 3.1 7.1) | Below 1.48.0 | 1.48.0, published 17 July 2026 | Repo 5 Oct |
| `strands-agents` | GHSA-763v-5pjm-fx36: default `FileSessionManager` storage world-readable | Medium (no score) | Below 1.48.0 | 1.48.0 | Repo 5 Oct |
| `a2a-java-sdk-server-common` | GHSA-qw47-mcm5-934w / CVE-2026-111764: fail-open default task authorization | High, CVSS 3.1 7.5 | Below 1.3.0.Final | 1.3.0.Final | Repo 28 Aug; NVD and database 20 Oct |
| `a2a-java-sdk-http-client-android` | GHSA-4fpj-g9jf-9rgg / CVE-2026-111765: credentials forwarded across authorities after an incomplete redirect fix | High, CVSS 3.1 7.5 | 1.3.0.Final to 1.3.1.Final | 1.3.2.Final | Repo 9 Sep; NVD and database 20 Oct |
| `a2a-java-sdk-server-common` | GHSA-q78c-5jjq-57g8 / CVE-2026-111761: SSRF in push-notification delivery | Medium, CVSS 3.1 5.8 | Below 1.3.0.Final | 1.3.0.Final | Repo 28 Aug; NVD and database 20 Oct |
| `a2a-java-sdk-parent` | GHSA-9rhm-2h4x-jwmx / CVE-2026-111763: credentials sent under a server-controlled header name | Database: Medium, CVSS 4.0 5.7. Repo: Medium, no score | Below 1.3.0.Final | 1.3.0.Final | Repo 28 Aug; NVD and database 20 Oct |
| `a2a-java-sdk-transport-rest` | GHSA-x32g-jvvm-4725 / CVE-2026-111762: push-notification credentials logged in cleartext | Database: Medium, CVSS 4.0 5.7. Repo: Medium, no score | Below 1.3.0.Final | 1.3.0.Final | Repo 28 Aug; NVD and database 20 Oct |
| `langgraph-checkpoint-postgres`, `langgraph-checkpoint-sqlite` | GHSA-6hmw-9432-67qq / CVE-2026-115883: namespace labels containing `.` reach other namespaces | Medium, CVSS 4.0 6.0 | Postgres below 3.1.3; SQLite below 3.1.2 | 3.1.3; 3.1.2 (both need `langgraph-checkpoint` 4.3.0) | Repo 21 Oct; database 23 Oct |
| `langgraph-cli` | GHSA-8prr-f582-jqq3 / CVE-2026-115885: registry push token printed by `langgraph deploy --verbose` | Medium, CVSS 4.0 4.1 | 0.4.15 to 0.4.31 | 0.4.32, published 23 September 2026 | Repo 19 Oct |
| `Microsoft.Agents.AI.Workflows.Declarative` | GHSA-9f26-7mqc-9vc4: protected values forwarded to external MCP servers | High, CVSS 3.1 7.5 | Below 1.24.0 | 1.24.0 | Repo 7 Oct |
| `Microsoft.Agents.AI.Workflows` and `.Declarative` | Five further advisories (GHSA-4532-fhjf-wq2q, GHSA-8j78-92fm-c727, GHSA-f92h-h85c-p8w6, GHSA-68cw-g4g7-7h9f, GHSA-r8fg-8q6m-6c5m) | Medium | Below 1.26.0 | 1.26.0 | Repo 23 Oct |
| `mem0ai` | GHSA-7587-9684-52r6 / CVE-2026-115324: SQL injection in the Databricks vector store | Critical, CVSS 4.0 9.2 (CVSS 3.1 8.1) | 0.1.117 to below 1.0.8 | 1.0.8, published 26 March 2026 | NVD and database 22 Oct |
| `pydantic-ai-harness` | GHSA-3589-pxp7-3gj8 / CVE-2026-114386: tool-call limit bypass in nested CodeMode calls | Medium, CVSS 4.0 6.3 (CVSS 3.1 4.8) | Below 0.59.0 | 0.59.0, published 21 October 2026 | NVD and database 21 Oct |

**Strands Agents A2A.** The A2A server "shares conversation history across callers with different context\_id values", and the impact statement is direct: "In multi-tenant deployments, an authenticated remote user could access another caller's conversation history or influence model behavior for other callers". The fix makes the server build a fresh agent per A2A `context_id` through an agent factory. There is no full workaround: "do not expose an A2A server to more than one user or tenant", or run one server per tenant. Two research passes disagreed on the score (8.1 or 8.6) and the date (22 or 23 October). The records resolve both: the database copy carries both scores (8.6 is CVSS 4.0, 8.1 is CVSS 3.1) while the repository advisory carries only the CVSS 3.1 8.1, and the repository advisory and NVD entry are dated 22 October, the database copy 23 October. The fix shipped on 12 June 2026, 132 days before the advisory. The current Python release is 1.62.0 (21 October), so anyone on a recent version was covered long before the advisory appeared. The record's source location is `strands-agents/harness-sdk`, and the API resolves the older `strands-agents/sdk-python` URL to that repository. The two session-storage advisories describe the default `FileSessionManager` writing to `/tmp/strands/sessions/` with predictable paths and permissions taken from the umask. The high-severity one also notes that tampered session files enable "persistent prompt injection".

**A2A Java SDK.** Five advisories arrived in the database on 20 October; the maintainers had published four of them in the repository on 28 August and the Android one on 9 September. The most serious is a fail-open default: the in-memory task store's no-argument constructor sets no authorization provider, so "A caller can read a task created by another caller simply by knowing or guessing its id." The Android credential-forwarding advisory exists because an earlier redirect fix (GHSA-9rhm) was overwritten by a later assignment in the synchronous POST path. Two oddities in the records are worth knowing before you quote them. The published GHSA-qw47 text still opens with "Draft text for GHSA-qw47-mcm5-934w" and an unfilled patched-version placeholder. GHSA-9rhm and GHSA-x32g end with a "Verification" line, "2/3 lens verifiers confirmed" in GHSA-9rhm and "3/3 lens verifiers confirmed" in GHSA-x32g, which suggests automated triage, though the records do not explain it.

**LangGraph.** The Postgres and SQLite stores turn a namespace into text with `".".join(namespace)`, so `("tenant", "bob")` and `("tenant.bob",)` become the same stored namespace. `put` rejected labels containing `.`, but `get`, `search`, `delete`, `list_namespaces` and `batch` did not, so untrusted input choosing a namespace label could read, overwrite or delete another tenant's items. `InMemoryStore` compares tuples and is not affected. The CLI advisory is smaller: the push token printed by `--verbose` lived "at most 12 hours".

**Microsoft Agent Framework.** The 7 October advisory: `Microsoft.Agents.AI.Workflows.Declarative` "did not enforce its protected-value boundary when evaluating inputs for an `InvokeMcpTool` action", so a declarative workflow from a less-trusted author could send environment-scoped secrets to a workflow-chosen MCP server. Microsoft writes that "This is not a cross-tenant issue, and no exploitation or customer impact is known." The five medium advisories on 23 October are variations on protected-value leaks, plus one (GHSA-8j78-92fm-c727) about "Cross-session state and chat-message disclosure in reused .NET workflow executors", which fits this month's isolation theme.

**mem0** and **Pydantic AI Harness** have short records. mem0's Databricks vector store interpolated memory text, metadata and message names into SQL, so content an attacker can get stored as memory could inject SQL. The fix shipped in March, 210 days before the advisory. The Pydantic AI Harness record says nested tool calls from `run_code` in CodeMode skipped `UsageLimits.tool_calls_limit`, so "Users or prompt-injected content" could exceed operator limits on costly or side-effecting tools.

### 4. Inference and ML platforms

| Package | Advisory / CVE | Severity as published | Affected | Fixed | Published |
| --- | --- | --- | --- | --- | --- |
| `vllm` | GHSA-h3rc-6mm3-gc2m: request-controlled `mm_processor_kwargs.code_revision` allows code execution when `--trust-remote-code` is on | High, CVSS 3.1 8.1 | 0.7.3 to below 0.31.0 | 0.31.0, published 5 October 2026 | Repo 6 Oct |
| `vllm` | GHSA-h3rc-j82p-2c3h: untrusted EPS input can reach Ghostscript | High, CVSS 3.1 8.1 | 0.30.0 | 0.32.0, published 18 October 2026 | Repo 20 Oct |
| `vllm` | GHSA-6757-hggm-hp2w: forged multimodal SHM handle reaches `pickle.loads()` | High; metadata CVSS 3.1 7.5 (AC:H), advisory text 8.8 (AC:L) | Metadata: up to 0.25.1 | 0.32.0 | Repo 20 Oct |
| `vllm` | GHSA-gx7p-2j49-hfq4 / CVE-2026-114055: denial of service via unvalidated `mm_processor_kwargs` | High, CVSS 3.1 7.5 | 0.7.3 to below 0.31.0 | 0.31.0 | Repo 6 Oct; database 23 Oct |
| `vllm` | GHSA-p92p-rxj5-7p2x / CVE-2026-114050: forged multimodal UUID crashes the engine | Medium, CVSS 3.1 6.5 | Below 0.31.0 | 0.31.0 | Repo 6 Oct; database 23 Oct |
| `autogpt-platform-backend` | GHSA-24q6-6h89-f9p7: hardcoded default JWT secret | Critical, CVSS 3.1 10.0 | 0.6.26 to 0.7.4 | 0.8.0, released 19 September 2026 | Repo 5 Oct |
| `autogpt-platform-backend` | GHSA-57mf-wqwq-6g6x: hardcoded default Fernet encryption key | High, CVSS 3.1 8.2 | 0.6.23 to 0.7.4 | 0.8.0 | Repo 5 Oct |
| `mlflow` | GHSA-wqmh-qccw-pqwf / CVE-2026-53995: FileStore trace-ID path traversal and arbitrary file writes | High, CVSS 4.0 8.8 (CVSS 3.1 8.2) | Up to 3.17.1 | 3.17.2 | NVD 19 Oct; database 20 Oct |
| `mlflow` | GHSA-2wqp-q3c6-ccj5 / CVE-2026-115886: SSRF via third-party scorer kwargs on unauthenticated servers | Medium, CVSS 3.1 6.5 | 3.12.0rc0 to below 3.17.0 | 3.17.0, published 7 October 2026 | Repo 22 Oct; database 23 Oct |
| `jupyter-server` | GHSA-354v-3q48-cv69 / CVE-2026-114135: gateway WebSocket handler skips kernel execute authorization | High, CVSS 3.1 8.8 | 2.0.0 to 2.5.0 | 2.6.0, published 25 May 2023 | Repo 10 Sep 2026; NVD 21 Oct; database 22 Oct |

**vLLM** published 27 repository advisories between 6 and 20 October (7 on 6 October, 11 on 9 October, 9 on 20 October), most of them denial-of-service bugs reachable from a single request. Three stand out:

- The `code_revision` advisory lets a request choose which revision of a model's processor code Transformers imports, which "is arbitrary code execution in the vLLM API/renderer process." It needs `--trust-remote-code` and an attacker able to create a revision in the served model repository, such as a Hugging Face community pull-request ref. It also points out that `/tokenize` "remains unauthenticated even when `--api-key` is configured". The record says the "Affected release range has not been bisected", while its metadata gives 0.7.3 to below 0.31.0.
- The EPS advisory is a dependency chain, not a new Ghostscript flaw. vLLM 0.30.0 let Pillow detect the image format from the bytes, so an EPS file labelled `image/png` reached the host's Ghostscript, and where Ghostscript is still vulnerable to CVE-2024-29510 that means command execution. The report says the loader-level execution was reproduced, and "the HTTP request path is source-traced but was not exercised end to end."
- The SHM advisory contradicts itself: the metadata scores it CVSS 3.1 7.5 with attack complexity High, while the text gives 8.8 with attack complexity Low. Both are reported here. It applies only with `--mm-processor-cache-type shm` and does not require `VLLM_ALLOW_INSECURE_SERIALIZATION=1`.

**AutoGPT Platform** shipped `JWT_VERIFY_KEY=your-super-secret-jwt-token-with-at-least-32-characters-long` in its `.env.default` files. With HS256, anyone who knows that value can sign tokens for any user or for the admin role. A self-hosted deployment that copied the default file unchanged was open to anyone. A companion advisory covers the default Fernet key that encrypts every stored OAuth token and API key. If you self-host, search your `.env` for those defaults, then rotate the keys and the credentials they protected. Upgrading the code does not change a key that is already in use.

**MLflow's** path traversal matters most on deployments using FileStore, which the record says was the default tracking backend before MLflow 3.7.0. On the record's own dates, the NVD entry (19 October) and the database entry (20 October 00:31 UTC) were published before 3.17.2 reached PyPI (21 October 02:08 UTC).

**Jupyter Server** is the longest disclosure gap in this roundup. The bug affects gateway mode with a restrictive custom Authorizer in 2.0.0 to 2.5.0. The fix in 2.6.0 dates from May 2023, but the advisory was published in September 2026 and reached the reviewed database in October. The record notes that the deprecated handler "is still present in current releases and can still be registered directly."

### 5. Defensive changes in coding agents

Three coding agents shipped trust and sandbox changes in the window:

- **Kiro CLI 2.33.0** (20 October), in interactive V3 sessions, asks you to trust a folder before it loads that folder's hooks, agents, MCP servers, steering, workflows or language server configuration. The changelog puts it plainly: "A cloned repository can no longer change how the agent behaves until you say so."
- **Gemini CLI 0.65.0** (20 October) includes the change "enforce read-only workspace settings in untrusted folders".
- **Codex CLI 0.163.0** (15 October) says "The network proxy now checks permission before a DNS lookup, rejects duplicate `Host` headers, and prevents credential aliases from bypassing inspection hooks." **0.164.0** (23 October) adds credential masking "during supported remote Bash commands and Zsh snapshot sessions" and "Hardened sandbox checks for case-variant metadata paths on macOS and replaceable symlinks used to locate executables."

Read together with the Claude Desktop `git.exe` and Claude Code symlink advisories, the direction is the same across vendors: a cloned repository is treated as untrusted input until the user says otherwise.

### 6. AI models credited as the finder

The **Chrome 156** stable release post (20 October, Chrome Releases blog) says "This update includes 353 security fixes". By count of the post, 6 are Critical, 61 High, 197 Medium and 89 Low. Five fixes are credited to "Xinyang Ge (Anthropic), assisted by Claude", one of them Critical (CVE-2026-113271, use after free in Accessibility). Four are credited to "OpenAI Codex Security", one of them Critical (CVE-2026-113303, memory corruption in WebRTC). Ten more fixes, three of them Critical, are credited to "Xinyang Ge" with no affiliation or tool named; this article does not assume how those were found. The post does not describe any of the 353 as exploited in the wild.

Microsoft's October Patch Tuesday (13 October) included **CVE-2026-96951**, a Windows Shell security feature bypass that evades Mark of the Web, rated Important with CVSS 3.1 8.8 and marked "Exploitation Detected". CISA added it to KEV the same day with a due date of 16 October. Among its four acknowledgements is "Benoit Sevens using Claude with Anthropic". The acknowledgement says only that much. It does not say how Claude was used, and nothing here should be read as saying the model found the exploitation.

These credits are evidence that AI-assisted research is now producing a share of browser and OS fixes. They are not evidence of what share, because most credit lines do not name tools at all.

### 7. Malicious packages

GitHub's malware advisory feed listed 686 malware advisories published between 9 October and the afternoon (UTC) of 25 October 2026, of which 660 are npm (526) and PyPI (134); two more npm entries were added at 18:30 UTC on 25 October. A keyword filter on package names finds 13 with AI-agent themes. Examples include skill bundles (`opencode-skills-collection`, `agentic-awesome-skills`, `skillward`), setup helpers (`codex-setup`, `@decoopus/claude-setup`, `claude-desktop-setup`), names close to the real SDKs (`aanthropic` on PyPI, `api-anthropic` on npm) and an MCP server (`@revizahoshii/hoshino-mcp-server`). The feed shows no compromise of an established, widely used package in the window. This article did not search press coverage or check download counts, so it cannot rule out an incident reported elsewhere.

## What is actually new

- **Isolation failures across vendors.** The MCP TypeScript SDK, the Strands A2A server, the A2A Java task store, LangGraph's stores, Envoy AI Gateway and Microsoft's .NET workflow executors all failed to keep callers apart in October's advisories. Agent infrastructure is moving from one developer on localhost to shared multi-tenant services, and the code underneath has not caught up. In the MCP case the pattern was in the official examples.
- **Opt-in fixes.** Four advisories (MCP TypeScript audience and input-size limits, MCP Python audience, FastMCP issuer binding) ship the protection switched off. A dependency scanner will mark you fixed after the upgrade, but you are still exposed until you change the configuration.
- **Long gaps between fix and advisory.** The table below uses dates from the records and package registries.

| Fix | Fixed release | Advisory | Gap |
| --- | --- | --- | --- |
| Jupyter Server gateway authorization | 2.6.0, 25 May 2023 | Repo 10 Sep 2026; database 22 Oct 2026 | More than three years |
| mem0 Databricks SQL injection | 1.0.8, 26 Mar 2026 | 22 Oct 2026 | 210 days |
| Claude Code symlink TOCTOU | 2.1.129, 5 May 2026 | 5 Oct 2026 | 153 days |
| Strands A2A session sharing | 1.43.0, 12 Jun 2026 | 22 Oct 2026 | 132 days |
| Claude Code plugin SHA pin (Plugin4Shell) | 2.1.179, 16 Jun 2026 | 9 Oct 2026 | 115 days (publicly reported by Air Security in September) |
| Strands session storage | 1.48.0, 17 Jul 2026 | 5 Oct 2026 | 80 days |
| MCP Python session accumulation | 1.30.0 and 2.2.0, 7 Sep 2026 | Repo 30 Sep; database 15 Oct 2026 | 23 and 38 days |
| LangGraph CLI token in logs | 0.4.32, 23 Sep 2026 | 19 Oct 2026 | 26 days |
| AutoGPT default keys | 0.8.0, 19 Sep 2026 | 5 Oct 2026 | 16 days |

- **What is not new.** Apart from the Windows Shell CVE in section 6, which Microsoft marks as exploited and CISA lists in KEV, none of these is reported as exploited in its record, and none is a flaw in a model. Severity scores are the maintainers' or reporters' own, and several records carry two scores that disagree.

## Why it matters for builders

**If you serve MCP over HTTP to more than one client, check how you construct the server.** Search your code for a `McpServer` or transport created once at startup and reused. Move to a per-request or per-session construction, or `createMcpHandler()` with a factory, then upgrade to `@modelcontextprotocol/server` 2.3.0 or later. On Python, upgrade to `mcp` 2.2.0 or 1.30.0 and size `session_idle_timeout` and `max_sessions` for your host.

**Turn on the opt-in checks.** Set `expectedResource` and return `AuthInfo.resource` (TypeScript), `validate_token_resource=True` (Python), `issuer=` on FastMCP's M2M providers, and `maxToolInputElements` plus `maxRequestBodySize`. Then send one test request with a token issued for a different service and confirm it gets `401`.

**Treat multi-tenant agent servers as untrusted by default.** For A2A servers and agent stores, give each tenant its own instance or prove isolation with a test that uses two identities. Do not let user input choose a namespace label or context ID without validating it.

**Replace default secrets you inherited from examples.** That means AutoGPT's `.env.default` keys and Envoy AI Gateway's `default-insecure-seed`, and the September roundup's LiteLLM `sk-1234` belongs on the same list. Rotate anything those keys protected.

**Watch releases, not only advisories.** The gap table is the argument. Subscribe to release notes for the agent frameworks you run, keep coding agents on auto-update or on a short pinning cycle, and read "behaviour change" sections as possible security fixes.

**Run inference servers behind a proxy that authenticates every path.** vLLM's `/tokenize` stays unauthenticated even with `--api-key`, and its advisory count this month shows how much attack surface a multimodal request has. Leave `--trust-remote-code` off unless you need it.

**Log what agents were stopped from doing.** If you use Claude Code across a team, collect the `claude_code.safety_event` OpenTelemetry event, so you can see when the sandbox or a hook blocked a tool call.

For the wider set of controls, see [AI security best practices](/guides/ai-security-best-practices/), [secrets management for AI](/guides/secrets-management-ai/) and [AI supply chain security](/patterns/ai-supply-chain-security/).

### Minimum safe versions

As stated in the advisory records, for the issues in this article. Later versions are fine; latest versions are as of 25 October 2026.

- `@modelcontextprotocol/sdk` 1.32.0 (latest 1.32.2), and set `expectedResource` and `maxToolInputElements`
- `@modelcontextprotocol/server` 2.3.0 (latest 2.4.0), with a per-request or per-session server; `@modelcontextprotocol/client` 2.3.0; `@modelcontextprotocol/express` 2.0.2; `@modelcontextprotocol/server-legacy` 2.3.1
- `mcp` (Python) 2.2.0 or 1.30.0 (latest 2.3.0), and set `validate_token_resource=True`
- `fastmcp` 4.1.2 or 3.4.10 (latest 4.1.3), and set `issuer=` on M2M providers
- Envoy AI Gateway 1.2.0 (1.2.0-rc1 in the database record), with a random session encryption seed
- Claude Code 2.1.179 for the advisories and 2.1.309 for the sandbox fixes (current 2.1.310); Claude Desktop 1.15962.0 on macOS and 1.8089.0 or later on Windows
- `strands-agents` 1.48.0 (latest 1.62.0); `@strands-agents/sdk` 1.5.0 (latest 1.22.0)
- A2A Java SDK 1.3.0.Final, and 1.3.2.Final for the Android HTTP client
- `langgraph-checkpoint-postgres` 3.1.3, `langgraph-checkpoint-sqlite` 3.1.2, `langgraph-checkpoint` 4.3.0, `langgraph-cli` 0.4.32
- `Microsoft.Agents.AI.Workflows` and `Microsoft.Agents.AI.Workflows.Declarative` 1.26.0
- `mem0ai` 1.0.8; `pydantic-ai-harness` 0.59.0
- `vllm` 0.32.0
- `autogpt-platform-backend` 0.8.0, plus new `JWT_VERIFY_KEY` and `ENCRYPTION_KEY` values
- `mlflow` 3.17.2; `jupyter-server` 2.6.0
- Storybook 8.6.19, 9.1.21 or 10.6.2
- Kiro CLI 2.33.0, Gemini CLI 0.65.0 and Codex CLI 0.164.0 for the defensive changes, which have no advisories

## Sources

All GitHub advisory records were fetched through the GitHub API on 25 October 2026; "published" dates are the record's own.

1. GitHub, MCP TypeScript SDK advisory GHSA-jm63-cq47-j5jp, "Shared transport or server instances delivered one HTTP client's messages to another" (repository 15 October 2026; database 20 October 2026): [https://github.com/modelcontextprotocol/typescript-sdk/security/advisories/GHSA-jm63-cq47-j5jp](https://github.com/modelcontextprotocol/typescript-sdk/security/advisories/GHSA-jm63-cq47-j5jp)
2. GitHub, MCP TypeScript SDK advisory GHSA-46jr-4wx8-v453, memory exhaustion during validation (repository 15 October 2026; database 20 October 2026): [https://github.com/advisories/GHSA-46jr-4wx8-v453](https://github.com/advisories/GHSA-46jr-4wx8-v453)
3. GitHub, MCP TypeScript SDK advisory GHSA-f897-62hf-6gxq, no request body or batch limit (repository 15 October 2026): [https://github.com/modelcontextprotocol/typescript-sdk/security/advisories/GHSA-f897-62hf-6gxq](https://github.com/modelcontextprotocol/typescript-sdk/security/advisories/GHSA-f897-62hf-6gxq)
4. GitHub, MCP TypeScript SDK advisory GHSA-rvq5-wwqv-78pq, bearer authentication audience (repository 5 October 2026; database 20 October 2026): [https://github.com/modelcontextprotocol/typescript-sdk/security/advisories/GHSA-rvq5-wwqv-78pq](https://github.com/modelcontextprotocol/typescript-sdk/security/advisories/GHSA-rvq5-wwqv-78pq)
5. GitHub, MCP TypeScript SDK advisory GHSA-6prh-2h8m-c8cw, cross-origin redirects (repository 2 October 2026; database 20 October 2026): [https://github.com/advisories/GHSA-6prh-2h8m-c8cw](https://github.com/advisories/GHSA-6prh-2h8m-c8cw)
6. GitHub, MCP TypeScript SDK advisory GHSA-22jm-h49p-29qw, experimental tasks (repository 2 October 2026; database 20 October 2026): [https://github.com/modelcontextprotocol/typescript-sdk/security/advisories/GHSA-22jm-h49p-29qw](https://github.com/modelcontextprotocol/typescript-sdk/security/advisories/GHSA-22jm-h49p-29qw)
7. GitHub, MCP TypeScript SDK advisory GHSA-345p-7cg4-v4c7 / CVE-2026-25536, "Sharing server/transport instances can leak cross-client response data" (4 February 2026): [https://github.com/modelcontextprotocol/typescript-sdk/security/advisories/GHSA-345p-7cg4-v4c7](https://github.com/modelcontextprotocol/typescript-sdk/security/advisories/GHSA-345p-7cg4-v4c7)
8. GitHub, MCP Python SDK advisory GHSA-84m7-p3x7-pcfv, "Unbounded Session Accumulation in StreamableHTTP Transport" (repository 30 September 2026; database 15 October 2026): [https://github.com/modelcontextprotocol/python-sdk/security/advisories/GHSA-84m7-p3x7-pcfv](https://github.com/modelcontextprotocol/python-sdk/security/advisories/GHSA-84m7-p3x7-pcfv)
9. NIST NVD, CVE-2026-59951 (published 14 October 2026, status Awaiting Analysis when fetched 25 October 2026): [https://nvd.nist.gov/vuln/detail/CVE-2026-59951](https://nvd.nist.gov/vuln/detail/CVE-2026-59951)
10. GitHub, MCP Python SDK release v1.30.0 (7 September 2026): [https://github.com/modelcontextprotocol/python-sdk/releases/tag/v1.30.0](https://github.com/modelcontextprotocol/python-sdk/releases/tag/v1.30.0)
11. GitHub, MCP Python SDK advisories GHSA-w4fh-qvv9-3v23 (5 October 2026) and GHSA-5h93-6whr-6q8j (2 October 2026): [https://github.com/modelcontextprotocol/python-sdk/security/advisories/GHSA-w4fh-qvv9-3v23](https://github.com/modelcontextprotocol/python-sdk/security/advisories/GHSA-w4fh-qvv9-3v23) and [https://github.com/modelcontextprotocol/python-sdk/security/advisories/GHSA-5h93-6whr-6q8j](https://github.com/modelcontextprotocol/python-sdk/security/advisories/GHSA-5h93-6whr-6q8j)
12. GitHub Advisory Database, FastMCP GHSA-7xgj-8392-5q4r and GHSA-vqqp-x5qm-5qp4 (23 October 2026): [https://github.com/advisories/GHSA-7xgj-8392-5q4r](https://github.com/advisories/GHSA-7xgj-8392-5q4r) and [https://github.com/advisories/GHSA-vqqp-x5qm-5qp4](https://github.com/advisories/GHSA-vqqp-x5qm-5qp4)
13. GitHub Advisory Database, Envoy AI Gateway GHSA-953h-535j-jg2v (19 October 2026): [https://github.com/advisories/GHSA-953h-535j-jg2v](https://github.com/advisories/GHSA-953h-535j-jg2v)
14. GitHub Advisory Database, Nginx UI GHSA-9jww-cxg5-rj9m and GHSA-76pm-mq2q-9gcr (15 October 2026): [https://github.com/advisories/GHSA-9jww-cxg5-rj9m](https://github.com/advisories/GHSA-9jww-cxg5-rj9m) and [https://github.com/advisories/GHSA-76pm-mq2q-9gcr](https://github.com/advisories/GHSA-76pm-mq2q-9gcr)
15. GitHub Advisory Database, Storybook GHSA-f2ph-cmg5-wxc8 (21 October 2026): [https://github.com/advisories/GHSA-f2ph-cmg5-wxc8](https://github.com/advisories/GHSA-f2ph-cmg5-wxc8)
16. Anthropic, Claude Desktop advisory GHSA-4p2j-qj3c-6x84 (13 October 2026): [https://github.com/anthropics/claude-code/security/advisories/GHSA-4p2j-qj3c-6x84](https://github.com/anthropics/claude-code/security/advisories/GHSA-4p2j-qj3c-6x84)
17. Anthropic, Claude Code advisory GHSA-5j29-h97v-84ch (5 October 2026): [https://github.com/anthropics/claude-code/security/advisories/GHSA-5j29-h97v-84ch](https://github.com/anthropics/claude-code/security/advisories/GHSA-5j29-h97v-84ch)
18. Anthropic, Claude Code advisory GHSA-pq7j-f95f-qfcv (repository 9 October 2026; database copy 15 October 2026) and Claude Desktop advisory GHSA-v234-4jrq-mgg6 (25 September 2026): [https://github.com/anthropics/claude-code/security/advisories/GHSA-pq7j-f95f-qfcv](https://github.com/anthropics/claude-code/security/advisories/GHSA-pq7j-f95f-qfcv) and [https://github.com/anthropics/claude-code/security/advisories/GHSA-v234-4jrq-mgg6](https://github.com/anthropics/claude-code/security/advisories/GHSA-v234-4jrq-mgg6)
19. Anthropic, Claude Code CHANGELOG, versions 2.1.307 to 2.1.310 (fetched 25 October 2026): [https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md](https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md)
20. AWS, Strands Agents advisory GHSA-4v6f-7vjh-6x4m (repository 22 October 2026; database 23 October 2026): [https://github.com/strands-agents/harness-sdk/security/advisories/GHSA-4v6f-7vjh-6x4m](https://github.com/strands-agents/harness-sdk/security/advisories/GHSA-4v6f-7vjh-6x4m)
21. Strands Agents advisories GHSA-3w55-933p-8pv5 and GHSA-763v-5pjm-fx36 (5 October 2026): [https://github.com/strands-agents/harness-sdk/security/advisories/GHSA-3w55-933p-8pv5](https://github.com/strands-agents/harness-sdk/security/advisories/GHSA-3w55-933p-8pv5) and [https://github.com/strands-agents/harness-sdk/security/advisories/GHSA-763v-5pjm-fx36](https://github.com/strands-agents/harness-sdk/security/advisories/GHSA-763v-5pjm-fx36)
22. GitHub Advisory Database, A2A Java SDK GHSA-qw47-mcm5-934w, with GHSA-4fpj-g9jf-9rgg, GHSA-q78c-5jjq-57g8, GHSA-9rhm-2h4x-jwmx and GHSA-x32g-jvvm-4725 (all database 20 October 2026; repository 28 August 2026, GHSA-4fpj 9 September 2026): [https://github.com/advisories/GHSA-qw47-mcm5-934w](https://github.com/advisories/GHSA-qw47-mcm5-934w)
23. LangChain, LangGraph advisories GHSA-6hmw-9432-67qq (repository 21 October 2026; database 23 October 2026) and GHSA-8prr-f582-jqq3 (19 October 2026): [https://github.com/langchain-ai/langgraph/security/advisories/GHSA-6hmw-9432-67qq](https://github.com/langchain-ai/langgraph/security/advisories/GHSA-6hmw-9432-67qq) and [https://github.com/langchain-ai/langgraph/security/advisories/GHSA-8prr-f582-jqq3](https://github.com/langchain-ai/langgraph/security/advisories/GHSA-8prr-f582-jqq3)
24. Microsoft, Agent Framework advisory GHSA-9f26-7mqc-9vc4 (7 October 2026) and the repository's advisory list for the 23 October advisories: [https://github.com/microsoft/agent-framework/security/advisories/GHSA-9f26-7mqc-9vc4](https://github.com/microsoft/agent-framework/security/advisories/GHSA-9f26-7mqc-9vc4) and [https://github.com/microsoft/agent-framework/security/advisories](https://github.com/microsoft/agent-framework/security/advisories)
25. GitHub Advisory Database, mem0ai GHSA-7587-9684-52r6 (22 October 2026) and Pydantic AI Harness GHSA-3589-pxp7-3gj8 (21 October 2026): [https://github.com/advisories/GHSA-7587-9684-52r6](https://github.com/advisories/GHSA-7587-9684-52r6) and [https://github.com/advisories/GHSA-3589-pxp7-3gj8](https://github.com/advisories/GHSA-3589-pxp7-3gj8)
26. vLLM, advisories GHSA-h3rc-6mm3-gc2m (6 October 2026), GHSA-h3rc-j82p-2c3h and GHSA-6757-hggm-hp2w (20 October 2026), and the repository's advisory list: [https://github.com/vllm-project/vllm/security/advisories/GHSA-h3rc-6mm3-gc2m](https://github.com/vllm-project/vllm/security/advisories/GHSA-h3rc-6mm3-gc2m), [https://github.com/vllm-project/vllm/security/advisories/GHSA-h3rc-j82p-2c3h](https://github.com/vllm-project/vllm/security/advisories/GHSA-h3rc-j82p-2c3h), [https://github.com/vllm-project/vllm/security/advisories/GHSA-6757-hggm-hp2w](https://github.com/vllm-project/vllm/security/advisories/GHSA-6757-hggm-hp2w) and [https://github.com/vllm-project/vllm/security/advisories](https://github.com/vllm-project/vllm/security/advisories)
27. AutoGPT, advisories GHSA-24q6-6h89-f9p7 and GHSA-57mf-wqwq-6g6x (5 October 2026): [https://github.com/Significant-Gravitas/AutoGPT/security/advisories/GHSA-24q6-6h89-f9p7](https://github.com/Significant-Gravitas/AutoGPT/security/advisories/GHSA-24q6-6h89-f9p7) and [https://github.com/Significant-Gravitas/AutoGPT/security/advisories/GHSA-57mf-wqwq-6g6x](https://github.com/Significant-Gravitas/AutoGPT/security/advisories/GHSA-57mf-wqwq-6g6x)
28. GitHub Advisory Database, MLflow GHSA-wqmh-qccw-pqwf (20 October 2026) and GHSA-2wqp-q3c6-ccj5 (repository 22 October 2026; database 23 October 2026): [https://github.com/advisories/GHSA-wqmh-qccw-pqwf](https://github.com/advisories/GHSA-wqmh-qccw-pqwf) and [https://github.com/advisories/GHSA-2wqp-q3c6-ccj5](https://github.com/advisories/GHSA-2wqp-q3c6-ccj5)
29. GitHub Advisory Database, Jupyter Server GHSA-354v-3q48-cv69 (22 October 2026): [https://github.com/advisories/GHSA-354v-3q48-cv69](https://github.com/advisories/GHSA-354v-3q48-cv69)
30. Kiro, Changelog, CLI 2.33.0 (20 October 2026): [https://kiro.dev/changelog/](https://kiro.dev/changelog/)
31. Google, Gemini CLI release v0.65.0 (20 October 2026): [https://github.com/google-gemini/gemini-cli/releases/tag/v0.65.0](https://github.com/google-gemini/gemini-cli/releases/tag/v0.65.0)
32. OpenAI, Codex releases rust-v0.163.0 (15 October 2026) and rust-v0.164.0 (23 October 2026): [https://github.com/openai/codex/releases/tag/rust-v0.163.0](https://github.com/openai/codex/releases/tag/rust-v0.163.0) and [https://github.com/openai/codex/releases/tag/rust-v0.164.0](https://github.com/openai/codex/releases/tag/rust-v0.164.0)
33. Google, Chrome Releases, "Stable Channel Update for Desktop", Chrome 156 (20 October 2026): [https://chromereleases.googleblog.com/2026/10/stable-channel-update-for-desktop_02018666648.html](https://chromereleases.googleblog.com/2026/10/stable-channel-update-for-desktop_02018666648.html)
34. Microsoft Security Response Center, CVE-2026-96951, Windows Shell Security Feature Bypass Vulnerability (13 October 2026), with acknowledgements from the October 2026 CVRF document: [https://msrc.microsoft.com/update-guide/vulnerability/CVE-2026-96951](https://msrc.microsoft.com/update-guide/vulnerability/CVE-2026-96951)
35. CISA, Known Exploited Vulnerabilities Catalog (catalog version 2026.10.23, fetched 25 October 2026): [https://www.cisa.gov/known-exploited-vulnerabilities-catalog](https://www.cisa.gov/known-exploited-vulnerabilities-catalog)
36. GitHub Advisory Database, malware advisories (fetched 25 October 2026): [https://github.com/advisories?query=type%3Amalware](https://github.com/advisories?query=type%3Amalware)
37. GitHub, MCP TypeScript SDK advisory GHSA-6qxp-vccf-f47h, OAuth client credentials sent to an MCP-server-chosen authorization server (repository 30 September 2026; database 6 October 2026): [https://github.com/modelcontextprotocol/typescript-sdk/security/advisories/GHSA-6qxp-vccf-f47h](https://github.com/modelcontextprotocol/typescript-sdk/security/advisories/GHSA-6qxp-vccf-f47h)
38. NIST NVD, CVE-2026-86063 (published 13 October 2026): [https://nvd.nist.gov/vuln/detail/CVE-2026-86063](https://nvd.nist.gov/vuln/detail/CVE-2026-86063)
39. npm registry and PyPI release metadata for the fixed and latest versions named above (fetched 25 October 2026): [https://registry.npmjs.org/@modelcontextprotocol/server](https://registry.npmjs.org/@modelcontextprotocol/server) and [https://pypi.org/project/mcp/](https://pypi.org/project/mcp/)

## Further reading

- [AI agent security roundup, September 2026](/news/ai-agent-security-roundup-september-2026/): Agentforce, LiteLLM, Azure AI Foundry, MemTensor and Meta Muse.
- [Plugin4Shell](/news/plugin4shell-coding-agents-rce/): the plugin pin bypass that now carries CVE-2026-86063.
- [MCP security vulnerabilities in 2026](/news/mcp-security-vulnerabilities-2026/): the earlier MCP CVEs this month builds on.
- [Model Context Protocol](/tools/mcp-protocol/): how MCP transports, sessions and authorization work.
- [Claude Code](/tools/claude-code/): the coding agent and its sandbox.
- [Strands Agents](/tools/strands-agents/), [LangGraph](/tools/langgraph/), [Microsoft Agent Framework](/tools/microsoft-agent-framework/) and [Mem0](/tools/mem0/): the frameworks with advisories this month.
- [vLLM](/tools/vllm/) and [MLflow](/tools/mlflow/): the serving and MLOps platforms in section 4.
- [AI agent security incidents 2025 to 2026](/news/ai-agent-security-incidents-2025-2026/): the running log.
- [AI supply chain security](/patterns/ai-supply-chain-security/) and [prompt injection](/glossary/prompt-injection/): the underlying patterns.
