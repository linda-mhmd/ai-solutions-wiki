---
title: "Penetration Testing"
description: "Authorized simulated attacks on systems to identify security vulnerabilities before malicious actors exploit them."
date: 2026-03-28
categories: [Glossary]
tags: [penetration-testing, security, ethical-hacking, vulnerability, red-team]
last_updated: 2026-05-30
---

Penetration testing (pen testing) is an authorized, simulated cyberattack against a system, network, or application performed to identify exploitable security vulnerabilities. Unlike automated vulnerability scanning, penetration testing involves skilled testers who chain vulnerabilities together and exploit them as a real attacker would.

## Origins and History

The concept of deliberately testing computer security through simulated attacks dates to the early 1970s. In 1971, James P. Anderson produced a report for the US Air Force outlining a methodology for testing computer system security. The term "penetration testing" appeared in the RAND Corporation's work on computer security in the 1970s. The practice became more formalized in the 1990s and 2000s with the growth of internet-facing systems. The Open Source Security Testing Methodology Manual (OSSTMM) by Pete Herzog (first published 2001) and the OWASP Testing Guide (first published 2004) provided structured methodologies. The Penetration Testing Execution Standard (PTES) further standardized the process. Professional certifications such as OSCP (Offensive Security Certified Professional, launched 2006) and CEH (Certified Ethical Hacker, by EC-Council, launched 2003) established recognized credentials for practitioners.

## Core Process

A penetration test follows defined phases. **Scoping and planning** defines the target systems, rules of engagement, and legal authorization. **Reconnaissance** gathers information about the target through passive (OSINT) and active (port scanning, service enumeration) techniques. **Vulnerability identification** discovers potential weaknesses using both automated tools and manual analysis. **Exploitation** attempts to leverage vulnerabilities to gain unauthorized access, escalate privileges, or extract data. **Post-exploitation** assesses the impact of successful compromises, including lateral movement and data exfiltration. **Reporting** documents all findings with evidence, risk ratings, and remediation recommendations.

## Practical Applications

Organizations conduct penetration tests for compliance requirements (PCI DSS, SOC 2, ISO 27001), to validate the effectiveness of security controls, before major releases or infrastructure changes, and as part of red team exercises that test detection and response capabilities alongside technical defenses. Testing types include black-box (no prior knowledge), white-box (full system knowledge), and gray-box (partial knowledge).

## Sources

1. Anderson, J.P. (1972). "Computer Security Technology Planning Study." Air Force Electronic Systems Division, ESD-TR-73-51.
2. Herzog, P. (2010). *Open Source Security Testing Methodology Manual (OSSTMM) 3.0*. ISECOM.
3. OWASP Foundation. "OWASP Testing Guide v4." [https://owasp.org/www-project-web-security-testing-guide/](https://owasp.org/www-project-web-security-testing-guide/)
