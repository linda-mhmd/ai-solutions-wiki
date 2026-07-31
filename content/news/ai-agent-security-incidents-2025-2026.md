---
title: "AI Agent Security Incidents 2025-2026: The Year Agentic AI Became an Attack Vector"
description: "A documented wave of AI agent security breaches, from prompt injection CVEs to government hacks. Nearly 9 in 10 organizations running AI agents have experienced security incidents."
date: 2026-07-30
lastmod: 2026-07-30
categories: [News]
tags: [AI security, agents, prompt injection, CVE, MCP, breaches]
related:
  - /glossary/prompt-injection
  - /glossary/prompt-injection-defense
  - /glossary/owasp-top-10-llm
  - /glossary/ai-security-best-practices
---

2025 and 2026 marked the transition of AI agent security from research curiosity to enterprise crisis. Prompt injection received its first CVEs in shipped products, AI agents were used to breach government agencies, and security researchers documented that nearly 9 in 10 organizations running AI agents in production have experienced at least one security incident.

## The incident rate

Axis Intelligence Research calculates that the **agentic AI security incident rate among deploying enterprises stands at 88% in 2026**, meaning nearly nine in ten organizations running AI agents in production have experienced at least one security incident. The data is synthesized from Gartner and OWASP's State of Agentic AI Security v2 ([Axis Intelligence, 2026](https://axis-intelligence.com/agentic-ai-security-statistics/)).

CrowdStrike and Mandiant data from 2025 and early 2026 confirm that **1 in 8 enterprise security breaches now involves an agentic system**, either as a target or as the attack vector ([Digital Applied, 2025](https://www.digitalapplied.com/blog/ai-agent-security-2026-1-in-8-breaches-agentic-systems)).

## EchoLeak: the first zero-click CVE

In June 2025, security researchers at Aim Labs disclosed **EchoLeak (CVE-2025-32711)**, the first weaponized indirect prompt injection in a deployed mainstream LLM product.

An attacker sent the target an ordinary email. The user never opened it. Microsoft 365 Copilot read it during normal background processing. A later, unrelated query triggered the data exfiltration. The attack proved that zero-click data exfiltration against enterprise AI assistants was not theoretical ([Sysdig, 2026](https://www.sysdig.com/learn-cloud-native/prompt-injection)).

This was the inflection point: indirect prompt injection stopped being a research curiosity and started receiving CVE numbers in shipped Microsoft, OpenAI, Perplexity, and Brave products.

## Mexican government breaches

Between December 2025 and February 2026, a single attacker used Anthropic's Claude Code and OpenAI's GPT-4.1 to breach **nine Mexican government agencies**, including the federal tax authority (SAT), Mexico City's civil registry, and the electoral institute (INE).

Check Point Research documented the attack: "AI now participates directly at every stage of the attack chain, from writing malware to executing commands inside live networks with minimal human direction between steps" ([Check Point, 2026](https://blog.checkpoint.com/ai-security/ai-security-threats-in-2026-insights-from-check-point-research/)).

## LiteLLM supply chain compromise

In March 2026, a backdoor was discovered on PyPI in LiteLLM, the language-model gateway used by CrewAI, DSPy, Microsoft GraphRAG, and dozens of other AI agent frameworks. The compromised package sat on the registry for three hours before detection, during which it received **nearly 47,000 downloads** ([Help Net Security, 2026](https://www.helpnetsecurity.com/2026/06/11/owasp-prompt-injection-ai-security-failures/)).

This incident demonstrated the blast radius of AI agent supply chain attacks: a single compromised dependency can propagate across the entire agentic AI ecosystem.

## Google's indirect prompt injection scan

Google's web scan found **malicious injection attempts increased 32% between November 2025 and February 2026**, with no sign of slowing. Most attacks were unsophisticated, but the trend line showed attackers actively probing AI-connected applications for injection vulnerabilities ([Maverc, 2026](https://maverc.com/blog/indirect-prompt-injection-google-research-2026)).

## The unsolved problem

Both UK NCSC and OpenAI's head of Preparedness have said publicly that prompt injection may never be fully solved at the model layer. The model cannot architecturally distinguish trusted instructions from untrusted input when both appear as tokens in the same context window.

The consensus defense is architectural, not prompt-engineering:

- **Capability scoping**: Limit what tools an agent can access
- **Content separation**: Isolate untrusted content from instructions
- **Deterministic egress monitoring**: Monitor what data leaves the system
- **Human approval for sensitive actions**: Keep humans in the loop for high-stakes operations

## Incident catalog

The airekt.fail security incident catalog documents **817 AI-related incidents from February–July 2026**, with root causes, attack chains, and prevention guidance for each ([airekt.fail, 2026](https://airekt.fail/)).

AIMultiple's catalog documents **192 real-life AI agent incidents** through mid-2026, with 2025 as the peak year (104 incidents). The breakdown: 51 safety failures, 47 security exploits, and 6 data-exposure cases ([AIMultiple, 2026](https://aimultiple.com/ai-agent-vulnerability)).

## Why it matters for builders

The attack surface grows with the capability surface. Every tool access, web browsing capability, RAG retrieval, MCP integration, long-term memory, and multi-agent coordination adds a new surface through which an adversary can deliver an injection.

Your agent's tool permissions, egress filters, and audit logs are the defenses adversaries cannot talk their way past. Model-layer safety is necessary but not sufficient.

## Sources

1. Axis Intelligence. "Agentic AI Security Statistics 2026: Incidents, Vulnerabilities & Market Data." [https://axis-intelligence.com/agentic-ai-security-statistics/](https://axis-intelligence.com/agentic-ai-security-statistics/)
2. Digital Applied. "1 in 8 Breaches From Agentic Systems." (2025). [https://www.digitalapplied.com/blog/ai-agent-security-2026-1-in-8-breaches-agentic-systems](https://www.digitalapplied.com/blog/ai-agent-security-2026-1-in-8-breaches-agentic-systems)
3. Sysdig. "The Comprehensive Guide to Prompt Injection Attacks in 2026." [https://www.sysdig.com/learn-cloud-native/prompt-injection](https://www.sysdig.com/learn-cloud-native/prompt-injection)
4. Check Point. "AI Security Threats in 2026: Insights from Check Point Research." [https://blog.checkpoint.com/ai-security/ai-security-threats-in-2026-insights-from-check-point-research/](https://blog.checkpoint.com/ai-security/ai-security-threats-in-2026-insights-from-check-point-research/)
5. Help Net Security. "Prompt injection still drives most agentic AI security failures in production." (June 2026). [https://www.helpnetsecurity.com/2026/06/11/owasp-prompt-injection-ai-security-failures/](https://www.helpnetsecurity.com/2026/06/11/owasp-prompt-injection-ai-security-failures/)
6. AIMultiple. "AI Agent Vulnerability with 192 Real-life Incidents." [https://aimultiple.com/ai-agent-vulnerability](https://aimultiple.com/ai-agent-vulnerability)
7. airekt.fail. "AI Security Incident Catalog." [https://airekt.fail/](https://airekt.fail/)
