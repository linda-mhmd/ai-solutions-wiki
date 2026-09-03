---
title: "Google Ships Gemini 3.8 Flash and a Gated Cybersecurity Variant, Flash Cyber"
description: "Google released Gemini 3.8 Flash on 2 September 2026, twenty days after Gemini 3.7 Flash, alongside Gemini 3.8 Flash Cyber, a vulnerability-discovery and patching model restricted to vetted defenders through a new Fairwind Program."
date: 2026-09-02
lastmod: 2026-09-03
categories: [News]
tags: [google, gemini, model-release, cybersecurity, vulnerability-discovery, ai-agents, pricing]
related:
  - news/gemini-3-7-flash
  - news/openai-astra-critical-cyber-threshold
  - news/ai-cyber-defense-open-letter-2026
  - guides/ai-security-best-practices
  - comparisons/llm-landscape-2026
---

Google released **Gemini 3.8 Flash on 2 September 2026** — twenty days after [Gemini 3.7 Flash](/news/gemini-3-7-flash/) — and alongside it, **Gemini 3.8 Flash Cyber**, a cybersecurity-tuned variant built for autonomous vulnerability discovery and patch generation. The Cyber model is not in the public API: Google is distributing it to vetted defenders through a new **Fairwind Program**, prioritizing government cyber authorities, critical infrastructure operators, and maintainers of widely-used software.

## What happened

Gemini 3.8 Flash is the fourth Flash-tier release in the 3.x line in under four months, following [3.5 Flash](/news/gemini-3-5-flash/) at I/O, 3.6 Flash on 21 July, and [3.7 Flash](/news/gemini-3-7-flash/) on 13 August. Google's own post frames it as "our most intelligent workhorse model," delivering improvements over 3.7 Flash across software engineering, agentic tasks, and complex, multi-step reasoning in specialized domains. On Google's own evaluations it improves on DeepSWE v1.1 (software engineering), the Vals Finance Agent V2 benchmark, and Harvey's Legal Agent Benchmark, and scores 54.9% on HLE-Verified. As an independent cross-check, [Artificial Analysis](https://artificialanalysis.ai/) put Gemini 3.8 Flash's Intelligence Index at 59 in high-reasoning mode — three points above 3.7 Flash's 56, and roughly level with GPT-5.6 Sol and Grok 4.6, though behind Claude Opus 5 and Claude Fable 5.1. The Register reported the model also spends about 40% more tokens than 3.7 Flash to get there, which matters more for a cost model than the headline price does.

**Pricing and specs are otherwise unchanged from 3.7 Flash.** Introductory rates stay at **$0.75 per million input tokens and $3.75 per million output tokens** through 31 December 2026, rising to the standard **$1.50/$7.50** on 1 January 2027 — the same numbers 3.7 Flash launched at, so this release is not a repricing. The model keeps the same **1,048,576-token context window** and **65,536-token output limit**, and accepts text, image, video, audio, and PDF input. It ships in the Gemini app for Pro and Ultra subscribers, Search's AI Mode, Gemini in Sheets, Google AI Studio, the Gemini API, Android Studio, Stitch, Google Antigravity, and the Gemini Enterprise platform.

**Gemini 3.8 Flash Cyber** is a separately-tuned variant of the same base model, aimed specifically at finding and fixing vulnerabilities. Google's launch post states it reaches **a success rate exceeding 70%** on an internal benchmark spanning 20 programming languages, and posts **47.2% pass@1 on CWE-Bench**, its external patch-quality benchmark — which Google says puts it "on the Pareto frontier," within a point of an unnamed "leading frontier model" at 47.8%, at markedly lower cost. On CyberGym, the standard industry benchmark for vulnerability discovery, Google's post describes "frontier-level performance" that "surpasses both 3.5 Flash Cyber as well as significantly larger frontier models" but states the comparison only as a chart rather than a number in the text; the benchmark tracker llm-stats.com, reading that chart, reports the score as **86.2% pass@1**. Google also cites third-party validation: its Chrome Security team found the model produces 2.6x more correct patches than commercial competitors, and cloud security firm Wiz reported 7.5–9.7% higher recall of real-world vulnerabilities at 2.3–5.2x lower cost than frontier alternatives it tested against.

Google says the general-purpose 3.8 Flash ships with standard safeguards against CBRN and cyber-offense misuse under its Frontier Safety Framework, while the Cyber variant "ships with a more permissive set of mitigations for cybersecurity, and as such, is only available to trusted defenders who require a more comprehensive set of cyber capabilities" — precisely why it isn't openly available. Google also reports an improvement on Gray Swan's prompt-injection robustness benchmark, without publishing the score.

**The Fairwind Program** is the access gate. Per Google DeepMind's program page, it "gives high-priority defenders … early access to advanced models that help them build better defenses, before new threats arrive," and pairs Gemini 3.8 Flash Cyber with CodeMender, Google's existing automated code-fixing agent. Eligibility is limited to three groups: governments and national cyber authorities, critical infrastructure operators (healthcare, telecoms, energy, financial services), and maintainers of core software platforms — each vetted to confirm "a proven track record of ethical operations and research." Approved organizations must restrict use to internal security and incident-response teams, limit activity to authorized threat simulation, reverse engineering, and malware analysis, enforce phishing-resistant multi-factor authentication, and may not redistribute or resell access; zero-data-retention is available through the Gemini Enterprise Agent Platform. Applications go through a form on the program page, reviewed by Google.

## Why it matters for builders

**Most builders will only ever touch the general model, and the economics there are stable, not cheaper.** Unlike the jump from 3.6 to 3.7 Flash — which halved the price — 3.8 Flash launches at the exact rate 3.7 Flash already charged. If your cost model assumed each Flash release gets cheaper, check the token-efficiency number instead: a ~40% increase in tokens spent reasoning can erase the benefit of an unchanged per-token price. Re-run your usage-weighted cost estimate before treating this as a free upgrade, and see [LLM cost optimization](/guides/llm-cost-optimization/) for the arithmetic.

**A capable cyber-offense-adjacent model with no public API is becoming the industry's default shape for this category, not an exception.** Google chose to gate Gemini 3.8 Flash Cyber behind an application process rather than ship it in AI Studio alongside its sibling — the same week [OpenAI restricted its own frontier cyber capabilities](/news/openai-astra-critical-cyber-threshold/) after Astra became the first OpenAI model to cross its Preparedness Framework's "Critical" cybersecurity threshold. If your organization is a critical infrastructure operator or maintains widely-used software, the Fairwind Program is worth applying to directly rather than waiting for the capability to show up in a general release; see [AI security best practices](/guides/ai-security-best-practices/) for the broader defensive posture this fits into, and the industry's own [collective cyber-defense letter](/news/ai-cyber-defense-open-letter-2026/) for why labs are moving this way.

**Treat the CyberGym 86.2% figure as Google-sourced but not Google-stated in plain text.** It comes from a chart in Google's launch post, corroborated by an independent benchmark tracker reading that chart, not from a sentence in Google's own prose the way the CWE-Bench and real-world-discovery numbers are. That distinction is small but real when you're citing it onward — the underlying claim is Google's, the precise digits are a third-party transcription of Google's own chart.

## Sources

1. Google, "Introducing Gemini 3.8 Flash and 3.8 Flash Cyber" (2 September 2026): [https://blog.google/innovation-and-ai/models-and-research/gemini-models/3-8-flash-and-3-8-flash-cyber/](https://blog.google/innovation-and-ai/models-and-research/gemini-models/3-8-flash-and-3-8-flash-cyber/)
2. Google DeepMind, "Fairwind Program": [https://deepmind.google/fairwind-program/](https://deepmind.google/fairwind-program/)
3. Google, Gemini API model documentation, "Gemini 3.8 Flash" (context window, output limit, modalities): [https://ai.google.dev/gemini-api/docs/models/gemini-3.8-flash](https://ai.google.dev/gemini-api/docs/models/gemini-3.8-flash)
4. llm-stats.com, Gemini 3.8 Flash Cyber benchmark tracker (CyberGym pass@1 figure): [https://llm-stats.com/models/gemini-3.8-flash-cyber](https://llm-stats.com/models/gemini-3.8-flash-cyber)
5. 9to5Google, "Gemini 3.8 Flash rolling out three weeks after last release" (2 September 2026): [https://9to5google.com/2026/09/02/gemini-3-8-flash-launch/](https://9to5google.com/2026/09/02/gemini-3-8-flash-launch/)
6. The Register, "With Gemini 3.8 Flash, Google reminds everyone it's still in the race" (2 September 2026): [https://www.theregister.com/ai-and-ml/2026/09/02/with-gemini-38-flash-google-reminds-everyone-its-still-in-the-race/5294049](https://www.theregister.com/ai-and-ml/2026/09/02/with-gemini-38-flash-google-reminds-everyone-its-still-in-the-race/5294049)
7. VentureBeat, "Google's Gemini 3.8 Flash is built for agents, while its Cyber twin hunts vulnerabilities" (2 September 2026): [https://venturebeat.com/security/googles-gemini-3-8-flash-is-built-for-agents-while-its-cyber-twin-hunts-vulnerabilities](https://venturebeat.com/security/googles-gemini-3-8-flash-is-built-for-agents-while-its-cyber-twin-hunts-vulnerabilities)

## Further reading

- [Gemini 3.7 Flash launches three weeks after 3.6](/news/gemini-3-7-flash/): the prior release this model's cadence and pricing build on.
- [Astra becomes the first OpenAI model to cross the "Critical" cyber threshold](/news/openai-astra-critical-cyber-threshold/): the contemporaneous example of another lab restricting its own frontier cyber capabilities, days either side of this release.
- [116 companies sign a collective cyber-defense letter on AI-enabled attacks](/news/ai-cyber-defense-open-letter-2026/): the industry backdrop Fairwind-style gated access fits into.
- [AI security best practices](/guides/ai-security-best-practices/): defense-in-depth guidance for teams evaluating tools like this.
- [The 2026 LLM landscape](/comparisons/llm-landscape-2026/): how the Flash tier compares across providers.
- [Google Gemini](/tools/google-gemini/): API and tooling details for the general-purpose model line.
