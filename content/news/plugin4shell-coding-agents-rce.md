---
title: "Plugin4Shell: A Zero-Click Plugin Flaw in Claude Code, Codex, GitHub Copilot and Gemini CLI"
description: "AIR Security disclosed Plugin4Shell on 17 September 2026. Four major coding agents checked out a marketplace-pinned plugin commit but never verified the result, so an attacker controlling the plugin repo could swap in code that auto-updates silently. Claude Code and Codex are patched; Copilot had no fix at disclosure and Gemini CLI will not get one."
date: 2026-09-18
lastmod: 2026-09-25
last_verified: 2026-09-25
categories: [News]
tags: [coding-agents, supply-chain-security, plugins, claude-code, codex, github-copilot, gemini-cli, vulnerability]
related:
  - news/coding-agents-2026
  - tools/claude-code
  - tools/github-copilot
  - patterns/ai-supply-chain-security
---

The AI security firm **AIR Security** disclosed **Plugin4Shell** on 17 September 2026. It is a zero-click remote code execution flaw that affected the plugin systems of the four most widely used coding agents: **Anthropic's Claude Code, OpenAI's Codex, GitHub Copilot, and Google's Gemini CLI**. The bug is a single missing check that each vendor made independently. Every agent checked out the plugin commit that its marketplace had pinned, but none confirmed that the working tree actually ended up at that commit. **Anthropic and OpenAI have patched. Microsoft had not shipped a fix for Copilot at the time of disclosure. Google says the consumer Gemini CLI is deprecated and will not be fixed.** No exploitation in the wild has been reported.

## What happened

Plugin marketplaces for coding agents use **SHA pinning** as their main safeguard against a "rug pull". A reviewer approves a plugin at a specific 40-character Git commit hash, and agents are supposed to install exactly that commit, whatever happens in the upstream repository later. AIR's write-up shows how Git's own reference resolution breaks that guarantee.

**Variant 1 (Claude Code, Codex, GitHub Copilot).** The agents clone the plugin repository and run `git checkout <pinned-sha>`. An attacker who controls the upstream repository creates a **branch named exactly like the pinned 40-hex SHA**, points it at malicious code, and makes it the default branch. When a name is both a valid ref and an object ID, Git prefers the ref and only prints a "refname is ambiguous" warning. The branch gets checked out, and the agent reports a successful install at the pinned commit.

**Variant 2 (Gemini CLI).** Gemini fetches the pinned commit and then runs `git checkout FETCH_HEAD`. If the repository's default branch is itself named `FETCH_HEAD`, the checkout resolves to that branch and the fetched commit is silently discarded.

**What makes it zero-click is auto-update.** AIR says Claude Code and Codex update installed plugins in the background by default. An attacker can publish a benign plugin, get it reviewed and adopted, ship a routine benign update that changes the pin, and then create the SHA-named branch. Every agent that auto-updates then pulls the malicious code without any prompt. AIR's second path is to take over a legitimate author's repository. The company points to its earlier "SkillJacking" research, where it says 925 skills were hijacked by taking over the repositories behind them.

**Where it works.** The branch-name variant needs a Git host that allows branch names shaped like hashes. **GitHub rejects them**, and cybersecuritynews.com reports that GitHub pointed to this in response. AIR names **Bitbucket and any self-hosted Git server** as hosts that allow such names, and heise's report adds GitLab to that list. AIR notes that Anthropic's own documentation lists Bitbucket and self-hosted Git as supported marketplace backends. The Gemini `FETCH_HEAD` variant is not blocked by GitHub's rule.

**Fix status, per AIR's timeline:**

| Agent | Status |
|---|---|
| Claude Code | Fixed in **2.1.179** (AIR confirmed 17 June 2026) |
| OpenAI Codex | Fixed in **0.146.0** (verified 12 August 2026) |
| GitHub Copilot | **No fix** at disclosure; AIR says Microsoft had not responded |
| Gemini CLI (consumer) | **Will not be fixed**; Google told AIR on 4 August that it is deprecated and advised migrating to Antigravity |

AIR found the flaw in May 2026 with a working proof of concept against all four agents and disclosed it to the vendors in June. Heise reports that enterprise Gemini access through Gemini Code Assist or Google Cloud is not affected. It also reports that Antigravity CLI has no comparable SHA-pinning mechanism for marketplace plugins, which is why the attack does not apply there. Heise asked GitHub for a statement.

AIR's recommended fix is one assertion, run inside the agent after checkout:

```bash
test "$(git rev-parse HEAD)" = "<pinned-sha>" || abort
```

It has to check the resolved `HEAD`, not the ref that was requested. That difference is exactly what the Gemini variant exploits.

## Why it matters for builders

**Update now where a patch exists.** Get Claude Code to 2.1.179 or later and Codex to 0.146.0 or later. The pin is resolved on the client, so AIR argues that no marketplace can fully close this and an agent update is the only complete mitigation. If your organisation still runs the consumer Gemini CLI, treat it as permanently exposed for plugin installs.

**Review marketplace sources while Copilot is unpatched.** If your teams use Copilot with plugin marketplaces hosted anywhere other than GitHub, that is the configuration AIR says is exposed. Limit plugin sources to hosts that reject SHA-shaped branch names where you can. Watch plugin repositories for unexpected default-branch changes or ownership transfers.

**Pinning is only as good as the verification behind it.** This is the same lesson as [GitHub Actions pinning](/guides/github-actions-security/): a pin states what you want to run, and something still has to check that this is what actually ran. Plugins run with the developer's own permissions over source code, cloud credentials, SSH keys and CI secrets, so a swapped plugin gives the attacker the developer's full reach. If you build internal tooling that installs Git-hosted extensions, add the post-checkout `rev-parse` assertion. See [AI supply chain security](/patterns/ai-supply-chain-security/) for the wider pattern, and [coding agents in 2026](/news/coding-agents-2026/) for how plugin ecosystems grew this quickly.

## Sources

1. AIR Security, "Plugin4Shell - Zero Click RCE Vulnerability found in top 4 most popular coding agents" (17 September 2026): [https://www.air.security/blog-posts/plugin4shell](https://www.air.security/blog-posts/plugin4shell)
2. Cyber Security News, "Plugin4Shell Zero-Click RCE Hits Claude Code, Codex, Copilot and Gemini CLI" (18 September 2026): [https://cybersecuritynews.com/plugin4shell-zero-click-rce/](https://cybersecuritynews.com/plugin4shell-zero-click-rce/)
3. heise online, "Critical flaw in Claude Code, OpenAI Codex, GitHub Copilot, and Gemini CLI" (21 September 2026): [https://www.heise.de/en/news/Critical-flaw-in-Claude-Code-OpenAI-Codex-GitHub-Copilot-and-Gemini-CLI-11460259.html](https://www.heise.de/en/news/Critical-flaw-in-Claude-Code-OpenAI-Codex-GitHub-Copilot-and-Gemini-CLI-11460259.html)

## Further reading

- [Claude Code](/tools/claude-code/) and [GitHub Copilot](/tools/github-copilot/): tool pages for two of the affected agents.
- [AI agent security incidents 2025-2026](/news/ai-agent-security-incidents-2025-2026/): the broader record of agent-related incidents.
- [AI supply chain security](/patterns/ai-supply-chain-security/): controls for third-party models, packages and extensions.
