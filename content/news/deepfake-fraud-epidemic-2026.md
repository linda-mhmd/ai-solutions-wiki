---
title: "Deepfake Fraud Reaches $3.7 Billion in Documented Losses"
description: "Deepfake-related fraud losses have reached $3.7 billion globally, with 89% occurring in 2025 and the first half of 2026. The Arup $25.6M video call scam showed how live video is no longer proof of identity."
date: 2026-07-30
lastmod: 2026-07-30
last_updated: 2026-07-30
categories: [News]
tags: [deepfake, fraud, security, identity, arup, social-engineering]
related:
  - guides/ai-in-the-real-world
  - glossary/ai-safety
  - news/ai-privacy-regulation-2026
  - frameworks/eu-ai-act-risk-framework
---

Documented losses from deepfake-related fraud reached $3.7 billion globally between January 2020 and June 2026, according to research published by Surfshark. The acceleration is stark: losses totaled $83 million between 2020 and 2023, rose to $335 million in 2024, surged to $2.5 billion in 2025, and reached $764 million in the first half of 2026 alone. Together, 2025 and the first six months of 2026 account for 89% of all recorded losses.

The numbers are certainly undercounts. Most victims never report deepfake fraud, whether out of embarrassment, lack of awareness that they were victimized, or inability to prove the method of attack. Every published total represents the floor, not the ceiling.

## The Arup case: $25.6 million in a single video call

The most widely cited corporate deepfake fraud occurred in January 2024 at Arup, the British engineering firm behind buildings including the Sydney Opera House. An employee in the Hong Kong finance department received a message appearing to come from the company's UK-based chief financial officer, requesting a video call about a confidential transaction.

The employee joined the call. On screen were what appeared to be the CFO and several other senior executives. All of them were AI-generated deepfakes, created using publicly available video and audio of the real executives. Acting on instructions from the fake CFO, the employee made 15 separate wire transfers totaling HK$200 million ($25.6 million) to five local bank accounts.

The fraud was discovered about a week later when the employee contacted headquarters and learned no such transaction had been authorized. Hong Kong police confirmed it was the first case they had encountered involving a deepfake video conference.

Arup confirmed the incident in May 2024. The Financial Times, CNN, and the South China Morning Post all independently verified the case with the company and law enforcement. The deepfakes were reportedly convincing enough that the employee set aside initial suspicions after seeing familiar faces on the call.

## The broader pattern

The Arup case is the largest single documented deepfake fraud, but it is not anomalous. The Shufti Identity Fraud Index projects a nearly 500% increase in deepfake identity fraud in 2026 compared to 2025, the sharpest year-on-year acceleration in their dataset.

Attack patterns include:

**Executive impersonation.** Deepfake video or voice of senior leaders used to authorize fraudulent transfers, often combined with social engineering that creates urgency and discourages verification.

**Romance and investment scams.** AI-generated personas used in long-running social engineering campaigns, particularly on social media platforms. Surfshark found that social media was the largest origin category, accounting for $1.73 billion (47%) of documented losses.

**Identity verification bypass.** Deepfakes used to defeat video-based identity checks, enabling account takeover, fraudulent account creation, and loan fraud.

**Job interview fraud.** Candidates using real-time deepfake tools to impersonate others during video interviews for remote positions.

## Why the surge now

Three factors converged to make 2025–2026 the inflection point:

**Cost collapse.** The cost of creating convincing deepfakes dropped by an order of magnitude. Tools that once required specialized hardware and expertise became accessible as consumer-grade software. A convincing video deepfake that cost thousands of dollars in 2022 can now be generated for under $100 or with free tools.

**Real-time capability.** Early deepfakes were pre-recorded. Current tools can run in real time, allowing live video calls where the attacker speaks and the deepfake mirrors their movements with minimal latency. This defeated the common advice to "just get them on a video call" as a verification method.

**Training data availability.** Executives, public figures, and many employees have abundant video and audio online: conference talks, interviews, social media posts. Attackers need only minutes of footage to train a convincing deepfake.

## What defenders are doing

The World Economic Forum, analyzing the Arup case in February 2025, identified several defensive measures:

**Out-of-band verification.** Before executing large transfers, verify instructions through a separate channel: call back on a known number, confirm in person, or use a pre-established code word. The Arup attack would have failed if the employee had called the CFO's known number before transferring.

**Payment controls.** Multi-signature requirements, transfer limits, and mandatory delays for large transactions create friction that makes single-call fraud harder.

**Detection tools.** AI-based deepfake detection tools are improving, but remain in an arms race with generation quality. No tool provides reliable detection across all deepfake types.

**Training and awareness.** Employees who know deepfakes exist and understand the attack pattern are more likely to pause and verify.

## Why it matters for builders

If you are building products that rely on video or voice for identity, authentication, or authorization, the threat model has changed. Live video is no longer proof of identity. Voice is no longer proof of identity. The implications:

- **Identity verification systems** need liveness detection and multi-factor approaches that do not rely solely on biometric matching against video or voice.
- **Financial systems** need transaction controls that assume any single authorization channel can be compromised.
- **Communication systems** need to consider whether they are the attack surface for social engineering campaigns.

The Arup case is a reference point for any AI safety or security discussion. It demonstrates that the failure mode is not a technical flaw in AI systems but a social engineering attack enabled by AI capabilities. The defense is process and verification, not detection alone.

## Sources

- Surfshark, "Global deepfake fraud reaches $2.19B — US leads in losses" (2026): https://surfshark.com/research/chart/deepfake-fraud-countries
- Surfshark, "$3.7B lost to deepfakes, social media is the primary origin" (2026): https://surfshark.com/research/chart/deepfake-fraud-origins
- Financial Times, "Arup lost $25mn in Hong Kong deepfake video conference scam" (February 2025): https://www.ft.com/content/b977e8d4-664c-4ae4-8a8e-eb93bdf785ea
- CNN, "British engineering giant Arup revealed as $25 million deepfake scam victim" (May 2024): https://www.cnn.com/2024/05/16/tech/arup-deepfake-scam-loss-hong-kong-intl-hnk
- South China Morning Post, "UK multinational Arup confirmed as victim of HK$200 million deepfake scam" (May 2024): https://www.scmp.com/news/hong-kong/law-and-crime/article/3263151
- World Economic Forum, "Cybercrime: Lessons learned from a $25m deepfake attack" (February 2025): https://www.weforum.org/stories/2025/02/deepfake-ai-cybercrime-arup/
- Shufti Pro, "Deepfake Identity Fraud Index Report 2026": https://shuftipro.com/resources/whitepapers-reports/deepfake-identity-fraud-index-report-2026/
- Veriff, "What deepfake fraud actually costs businesses in 2025–2026": https://www.veriff.com/fraud/deepfake-fraud-cost-2026
- ASIS International, "Deepfake Identity Fraud Poised to Increase Nearly 500 Percent in 2026" (June 2026): https://www.asisonline.org/security-management-magazine/latest-news/today-in-security/2026/june/deepfake-identity-fraud/

## Further reading

- [AI in the real world](/guides/ai-in-the-real-world/): documented AI failures and what they teach.
- [AI privacy regulation 2026](/news/ai-privacy-regulation-2026/): the regulatory response to AI-enabled threats.
- [EU AI Act risk framework](/frameworks/eu-ai-act-risk-framework/): deepfake disclosure requirements under European law.
