---
title: "AI Agent Security, September 2026: Agentforce, LiteLLM, Azure AI Foundry, MemTensor, and Meta Muse"
description: "Five security disclosures from September 2026 that matter to teams running AI agents: zero-click prompt injection in Salesforce Agentforce, exploited LiteLLM flaws in CISA's KEV catalog, a CVSS 10.0 Azure AI Foundry fix, a compromised agent-memory package on npm and PyPI, and a zero-day in Meta's Muse assistant."
date: 2026-09-25
lastmod: 2026-09-25
categories: [News]
tags: [ai-security, ai-agents, prompt-injection, mcp, litellm, supply-chain, salesforce, azure, meta, vulnerabilities]
related:
  - news/plugin4shell-coding-agents-rce
  - news/openai-agent-medicare-breach
  - news/mcp-security-vulnerabilities-2026
  - news/ai-agent-security-incidents-2025-2026
  - guides/ai-security-best-practices
  - glossary/prompt-injection
  - glossary/supply-chain-security
---

September 2026 produced an unusually dense run of security disclosures touching AI agents and the infrastructure around them. Two of them, [Plugin4Shell](/news/plugin4shell-coding-agents-rce/) in coding agents and the [OpenAI agent that breached an Australian government portal](/news/openai-agent-medicare-breach/), have their own articles. This roundup covers five more. All of them are now fixed or mitigated. They matter less as individual bugs than as a pattern: the weak points are the gateway, the plugin, the untrusted record the agent reads, and the local machine it runs on - not the model.

## What happened

### SalesBleed: zero-click prompt injection in Salesforce Agentforce

On **24 September 2026**, Zenity Labs published three vulnerabilities in **Salesforce Agentforce**, collectively named **SalesBleed**, which it had reported to Salesforce and which Salesforce has fixed; The Register reports the attack chains no longer work. The entry point was Salesforce's public **Web-to-Lead form**: an outsider could submit a lead containing hidden instructions, which stayed dormant until an employee asked an Agentforce agent about their latest leads. The agent then read the poisoned record and followed its instructions - querying other CRM records and leaking values through a request to an attacker-controlled domain, without the employee clicking anything.

The Register attributes the leak path to gaps in Salesforce's **Trusted URLs** controls, which are meant to restrict and redact external destinations: Zenity found hostnames with unrecognised top-level domains and certain characters slipped past the redaction. The third flaw let an attacker have the agent send phishing messages under the agent's own identity. Zenity CTO Michael Bargury told The Register that "secure-by-design remains essential but for agents it may no longer be enough."

### LiteLLM: exploited flaws in CISA's KEV catalog, and a default key left in place

On **2 September 2026**, CISA added seven actively exploited vulnerabilities to its **Known Exploited Vulnerabilities (KEV)** catalog. One is **CVE-2026-59822** (CVSS 8.8), an improper-authentication flaw in the **Model Context Protocol (MCP) Streamable HTTP endpoint** of **LiteLLM**, the widely used open-source AI gateway, which could let an unauthenticated attacker open an authenticated MCP session. The Hacker News reports that Wiz saw exploitation attempts against it on its honeypots, and that a separate LiteLLM flaw, CVE-2026-42271, chained with a Starlette request-smuggling bug (CVE-2026-48710, also added), has been exploited in the wild - Wiz links it to operators associated with the Qilin ransomware group, and Microsoft reported attackers using it to deploy cryptocurrency miners on LiteLLM gateways.

A week later, on **10 September**, The Hacker News covered Wiz research showing that of **3,074 internet-facing LiteLLM gateways** found in a February scan, **294 accepted the example admin key `sk-1234`** from LiteLLM's own setup guide - 103 because the example value was left in place, 191 because no master key was set at all. That key is the gateway's administrator credential: it exposes every stored provider API key, every prompt passing through, and any MCP-connected tools. Wiz also demonstrated that an admin could use LiteLLM's pass-through endpoints to reach the host's cloud metadata service; no one has reported this being done against a real deployment, and LiteLLM treats administrators as trusted, so there is no CVE for it.

### Azure AI Foundry: a CVSS 10.0 fix, no customer action needed

Microsoft published an advisory on **17 September 2026** for **CVE-2026-85889**, rated **CVSS 10.0**: "Missing authentication for critical function in Azure AI Foundry allows an unauthorized attacker to elevate privileges over a network." It is a cloud-side vulnerability that Microsoft has fully mitigated; customers do not need to do anything, and Microsoft says there is no evidence of exploitation. The same batch included a CVSS 9.9 command-injection flaw in Microsoft 365 Copilot (CVE-2026-85885), also mitigated service-side.

### MemTensor: an agent-memory plugin turned credential stealer

On **23 September 2026**, several supply-chain security firms (Aikido, SafeDep, Socket, and StepSecurity) reported that two **MemTensor** packages had been compromised: the npm package **`@memtensor/memos-cloud-openclaw-plugin`** (versions 0.1.21, 0.1.23, and 0.1.25) and the PyPI package **MemoryOS** (version 2.0.34). The malicious versions launched a cross-platform Go implant, named **sckit**, which harvests credentials - cloud keys, GitHub, GitLab, npm and PyPI tokens, Hugging Face and Vault secrets - and contains templates to spread itself into other npm packages, Python packages, and GitHub Actions workflows. SafeDep says the attacker got the publishing tokens by pushing commits that made MemTensor's own GitHub Actions release pipeline hand them over.

The placement is the point: the plugin connects the OpenClaw agent runtime to a memory service, so it runs inside a process that sees user prompts and often inherits whatever credentials the agent has. The malicious versions have since been removed; the clean versions are **0.1.24** (npm) and **2.0.33** (PyPI).

### Meta Muse on macOS: any local process could take over the agent

On **21 September 2026**, Ars Technica reported a zero-day found by macOS security researcher **Patrick Wardle** in the Mac app for **Muse**, [Meta's new personal AI agent](/tools/meta-llama/). Any locally installed app or terminal command could change undocumented Muse settings, including the endpoint used for voice transcription, without needing any macOS permissions. Redirecting that endpoint let an attacker insert commands into the user's voice prompts and capture the account's authentication token - effectively borrowing an agent that already had access to the user's WhatsApp, email, calendar, files, microphone, and camera. Wardle said a variant of the "ClickFix" social-engineering technique was enough to get started. Meta shipped a hotfix more than 12 hours after the story was published.

## Why it matters for builders

**Treat every record an agent reads as untrusted input.** SalesBleed didn't need access to Salesforce at all - only a public form whose contents an agent would later read with an employee's privileges. Any agent that summarises tickets, leads, emails, or web pages is exposed to the same pattern. Restrict what the agent can query in a single turn, block or proxy outbound fetches (including image URLs rendered in the UI), and log tool calls triggered while processing external content. See [prompt injection](/glossary/prompt-injection/) for the underlying mechanism.

**Your AI gateway is now a target, and a very valuable one.** LiteLLM-style gateways hold every provider key and see every prompt. If you run one, patch to a current release, confirm a strong, unique master key is set (never the example value, never unset), keep the admin interface off the public internet, and don't give the gateway's workload broader cloud permissions than it needs. CISA KEV status means federal agencies have a patch deadline; everyone else should treat it the same way.

**Agent plugins and memory packages are software supply chain, with worse blast radius.** A compromised dependency inside an agent runtime gets the agent's prompts and credentials, not just a build machine's. Pin versions with lockfiles and integrity hashes, review new versions of anything that runs inside the agent process, use short-lived and narrowly scoped tokens in CI, and rotate secrets on any machine that installed an affected version. The [supply chain security](/glossary/supply-chain-security/) and [secrets management](/guides/secrets-management-ai/) pages cover the controls in more depth.

**Local agents inherit the trust of the whole machine.** The Muse flaw is a reminder that an assistant holding broad account access and OS permissions turns any local foothold into a much bigger one. When evaluating desktop agents for staff, ask how settings and endpoints are protected from other local processes, whether speech and data processing can stay on device, and how quickly the vendor ships fixes.

**Managed-cloud CVEs usually need no action, but still belong in your risk register.** The Azure AI Foundry fix required nothing from customers. It is still worth recording which managed AI platforms you depend on and following their advisories, because a service-side authentication flaw in the platform hosting your agents is outside every control you own.

For the broader defensive posture, see [AI security best practices](/guides/ai-security-best-practices/) and the running log of [AI agent security incidents](/news/ai-agent-security-incidents-2025-2026/).

## Sources

1. The Register, "Salesforce Agentforce vulns allowed 0-click CRM data theft, anonymous phishing" (24 September 2026): [https://www.theregister.com/security/2026/09/24/salesforce-agentforce-vulns-allowed-0-click-crm-data-theft-anonymous-phishing/5298958](https://www.theregister.com/security/2026/09/24/salesforce-agentforce-vulns-allowed-0-click-crm-data-theft-anonymous-phishing/5298958)
2. SecurityWeek, "SalesBleed Flaws in Salesforce Agentforce Enabled Zero-Click Data Exfiltration" (25 September 2026): [https://www.securityweek.com/salesbleed-flaws-in-salesforce-agentforce-enabled-zero-click-data-exfiltration/](https://www.securityweek.com/salesbleed-flaws-in-salesforce-agentforce-enabled-zero-click-data-exfiltration/)
3. The Hacker News, "CISA Adds Seven Exploited Flaws as Attackers Deploy Reverse Shells and Crypto Miners" (3 September 2026): [https://thehackernews.com/2026/09/cisa-adds-seven-exploited-flaws-as.html](https://thehackernews.com/2026/09/cisa-adds-seven-exploited-flaws-as.html)
4. The Hacker News, "Nearly 1 in 10 Exposed LiteLLM Gateways Accepted the Example 'sk-1234' Admin Key" (10 September 2026): [https://thehackernews.com/2026/09/nearly-1-in-10-exposed-litellm-gateways.html](https://thehackernews.com/2026/09/nearly-1-in-10-exposed-litellm-gateways.html)
5. CISA, Known Exploited Vulnerabilities Catalog: [https://www.cisa.gov/known-exploited-vulnerabilities-catalog](https://www.cisa.gov/known-exploited-vulnerabilities-catalog)
6. The Hacker News, "Microsoft Patches CVSS 10.0 Azure AI Foundry Flaw Enabling Unauthorized Privilege Escalation" (18 September 2026): [https://thehackernews.com/2026/09/microsoft-patches-cvss-100-azure-ai.html](https://thehackernews.com/2026/09/microsoft-patches-cvss-100-azure-ai.html)
7. The Hacker News, "Compromised MemTensor Packages Deliver sckit Credential Stealer via npm and PyPI" (23 September 2026): [https://thehackernews.com/2026/09/compromised-memtensor-packages-deliver.html](https://thehackernews.com/2026/09/compromised-memtensor-packages-deliver.html)
8. SC Media, "MemTensor npm, PyPI packages compromised with cross-platform credential stealer" (24 September 2026): [https://www.scworld.com/news/memtensor-npm-pypi-packages-compromised-with-cross-platform-credential-stealer](https://www.scworld.com/news/memtensor-npm-pypi-packages-compromised-with-cross-platform-credential-stealer)
9. Ars Technica, "Muse, Meta's extraordinarily privileged AI assistant, has a serious 0-day" (21 September 2026): [https://arstechnica.com/security/2026/09/muse-metas-extraordinarily-privileged-ai-assistant-has-a-serious-0-day/](https://arstechnica.com/security/2026/09/muse-metas-extraordinarily-privileged-ai-assistant-has-a-serious-0-day/)
