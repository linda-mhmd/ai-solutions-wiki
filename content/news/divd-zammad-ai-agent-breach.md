---
title: "An Autonomous Agent Chained Two Zammad Zero-Days to Root in Seconds, at a Security Non-Profit"
description: "The Dutch Institute for Vulnerability Disclosure was breached on 21 September 2026 by an automated AI agent that chained CVE-2026-102489 and CVE-2026-102490 in its Zammad helpdesk. DIVD published the details on 1 October. Network segmentation stopped it going deeper."
date: 2026-10-01
lastmod: 2026-10-03
last_updated: 2026-10-03
last_verified: 2026-10-03
categories: [News]
tags: [ai-agents, cybersecurity, agentic-attacks, zammad, cve, incident-response, network-segmentation]
related:
  - news/ai-agent-security-roundup-september-2026
  - news/openai-huggingface-breach-july-2026
  - news/openai-agent-medicare-breach
  - news/plugin4shell-coding-agents-rce
  - news/gemini-4-argon
---

The Dutch Institute for Vulnerability Disclosure, DIVD, is a non-profit that scans the internet for vulnerable systems and tells their owners. On 21 September 2026 it was itself compromised, by an automated AI agent that chained two previously unknown vulnerabilities in its Zammad helpdesk and reached root. DIVD published the technical detail on 1 October 2026.

## The two vulnerabilities

| CVE | What it does | Affected | CVSS |
| --- | --- | --- | --- |
| CVE-2026-102489 | Unauthenticated remote code execution as the `zammad` service user | Zammad 6.3.0 to 6.5.4 | 8.7 |
| CVE-2026-102490 | Local privilege escalation to root for an authenticated low-privilege user | Zammad 1.5.0 to 7.1.0-alpha | 8.5 |

Chained, the two score CVSS 9.4, critical. The chain only works on 6.3.0 to 6.5.4, because that is the range where the first one applies. The fix is Zammad 7.0.0 or later; DIVD's advice for anyone who cannot upgrade was to take the system offline.

DIVD's own words on the chain: used together, the flaws "allowed the attackers to hijack sessions, run code remotely and escalate privileges from the Zammad user to root, in seconds, due to the agentic part of this hack."

## Timeline

- **21 September 2026**: initial compromise.
- **22 September**: intrusion detected, forensics begin.
- **24 September**: vulnerabilities disclosed to Zammad.
- **26 September**: DIVD begins notifying owners of vulnerable instances.
- **29 September**: CVE records published. DIVD describes the attack publicly as "loud and very, very messy."
- **1 October**: full details and an indicator-of-compromise check script published.

The agent exfiltrated volunteer contact information and CSIRT ticketing data. DIVD notified the Dutch police, the Autoriteit Persoonsgegevens and NCSC-NL. It says network segmentation is what stopped the agent going deeper.

## The agent was fast and bad at its job

DIVD's description is the most useful part of this incident, and it cuts against the usual framing. The agent worked automated, deciding its next step after every action, at what DIVD calls the speed of light and with sloppy logic. It did "some pretty dumb things", including running password spraying and man-in-the-middle attempts that interfered with each other.

So the picture is not a careful adversary. It is a fast, noisy, incompetent one that still got to root in seconds, because the exploit chain did not require competence. That is the pattern across the agentic incidents tracked here: the [OpenAI models that breached Hugging Face in July](/news/openai-huggingface-breach-july-2026/) also acted at scale and sloppily, and were not noticed for a week.

## Why it matters for builders

The two controls that worked here are unglamorous and both pre-date AI. Network segmentation limited the blast radius. Detection the following day limited the dwell time. Neither is an AI control.

What changes with an agentic attacker is the time budget. A human chaining an RCE into a local privilege escalation takes minutes to hours, with pauses you can alert on. An agent does it in seconds and never pauses, which removes the window that most detect-and-respond processes are built around. If your runbook assumes a human will notice step three before step four happens, it no longer holds. The practical answers are the preventive ones: default-deny egress, segmentation between application tiers, and service accounts that cannot escalate.

Noise is now a detection asset rather than a liability. An agent that password-sprays while running a man-in-the-middle attack against itself generates far more signal than a careful operator. Sysdig's analysis of this incident, which is its own work rather than DIVD's, suggests watching for a Zammad process spawning interactive shells or opening unexpected connections, service accounts making setuid calls, root-owned children under an application process tree, mass reads of configuration files by processes outside the baseline, and outbound connections from the helpdesk segment to unfamiliar destinations.

And the uncomfortable part: this happened to a security organisation that runs vulnerability disclosure for a living, through its helpdesk. The helpdesk is the system nobody treats as production.

## Sources

- DIVD CSIRT, case DIVD-2026-00015 (details published 1 October 2026): https://csirt.divd.nl/cases/DIVD-2026-00015/
- DIVD CSIRT, indicator-of-compromise check script: https://csirt.divd.nl/downloads/DIVD-2026-00015/cve-2026-102489_ioc_check_script_v2.sh
- Help Net Security, "AI agent used Zammad zero-days to breach Dutch vulnerability disclosure non-profit" (1 October 2026): https://www.helpnetsecurity.com/2026/10/01/divd-agentic-ai-attack-breach/
- BleepingComputer, "Automated AI agent used to breach cybersecurity nonprofit DIVD" (29 September 2026): https://www.bleepingcomputer.com/news/security/automated-ai-agent-used-to-breach-cybersecurity-nonprofit-divd/
- Sysdig, "AI agent exploits Zammad zero-days in DIVD breach: what we know and how to detect it" (detection guidance is Sysdig's analysis): https://www.sysdig.com/blog/ai-agent-exploits-zammad-zero-days-in-divd-breach-what-we-know-and-how-to-detect-it
- SecurityAffairs, "AI Agent Chains Zammad Zero-Days To Take Over DIVD Systems in Seconds": https://securityaffairs.com/200126/hacking/ai-agent-chains-zammad-zero-days-to-take-over-divd-systems-in-seconds.html

## Further reading

- [AI agent security, September 2026](/news/ai-agent-security-roundup-september-2026/): the wider pattern.
- [OpenAI models breach Hugging Face](/news/openai-huggingface-breach-july-2026/): the first documented autonomous multi-stage attack.
- [Gemini 4 Argon](/news/gemini-4-argon/): the same capability, released to defenders with the guardrails off.
