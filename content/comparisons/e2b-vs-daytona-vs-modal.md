---
title: "E2B vs Daytona vs Modal: Sandboxes for AI Agent Code Execution"
description: "A constraint-driven look at three ways to give an AI agent somewhere to run code: E2B's Firecracker microVMs, Daytona's post-pivot (now closed-source) runtime, and Modal's general-purpose serverless platform with sandboxes as one feature among many."
date: 2026-09-04
categories: [Comparisons]
tags: ["ai-agents", "sandbox", "code-execution", "e2b", "daytona", "modal", "isolation", "infrastructure"]
tools: ["e2b", "daytona", "modal"]
related:
  - guides/constraint-driven-comparisons
  - tools/e2b
  - tools/daytona
  - tools/modal
  - patterns/sandbox-testing-agents
  - guides/software-licensing-and-vendor-lock-in
last_verified: 2026-09-04
last_updated: 2026-09-04
lastmod: 2026-09-04
---

An agent that writes code needs somewhere to run it that isn't your production environment. E2B, Daytona, and Modal are the three names that come up most often for that job in 2026, and a feature table across them looks almost identical: all three offer a Python or TypeScript SDK, all three spin up an isolated environment on request, all three bill by the second. The differences that actually decide which one an organization can use are not on that table. They're in what "isolated" means when a kernel-level CVE gets filed against one of them, in whether the product is still the open, self-hostable thing it was pitched as a year ago, and in whether a sandbox is the product or a line item inside a much larger one.

## What each one actually is

**E2B** is open-source infrastructure (the runtime and infra repos are Apache-2.0) built specifically to give AI agents a place to run model-generated code. Every sandbox is a Firecracker microVM — the same KVM-based virtualization AWS built for Lambda — created and destroyed per session [1]. E2B raised a $21M Series A led by Insight Partners on 28 July 2025 and reports that 88% of the Fortune 100 have signed up for the platform [2].

**Daytona** did not start as an agent-sandbox product. It launched in 2023 as a self-hosted developer-workspace tool for human engineers, and only pivoted toward AI agent infrastructure starting in 2024, formalizing the shift by December of that year [3]. It raised a $24M Series A led by FirstMark Capital, announced 5 February 2026, with Datadog and Figma Ventures participating as strategic investors [4]. On 11 June 2026, Daytona announced it was moving its production codebase closed-source, stating the reason plainly: "AI can now be pointed at an open source repository and systematically search it for exploitable flaws, at a speed and scale no human team can match" [5]. The public GitHub repository still exists and remains usable under its original license, but its README now states it "is no longer maintained" and that core development moved to a private codebase [6].

**Modal** is a general-purpose serverless platform for running Python on CPUs and GPUs — training, batch inference, scheduled jobs, web endpoints. Sandboxes were added to that platform in 2024 as one feature among many, not as the reason the company exists [7]. Modal has never been open source and completed its SOC 2 Type II audit with no deviations found, effective 2 January 2025 [8].

All three are, as of 2026, usable as the sandbox backend for Anthropic's Claude Managed Agents self-hosted sandboxes — that integration lists E2B, Daytona, Modal, Cloudflare, Fly.io, and others side by side as supported providers, so ecosystem integration with a specific agent framework is not, on its own, a differentiator among these three right now [9].

## The constraints that actually decide this

**Trust and legal control over the isolation boundary — a gate for anyone whose threat model includes "verify the sandbox actually holds."** This is the sharpest split in the set. E2B's isolation code is publicly auditable Apache-2.0 source. Daytona's is not, as of June 2026 — and the reason the company gave for closing it is specifically that its isolation boundary is the asset an AI-assisted attacker would go looking for in the open repo, which is a candid way of saying the boundary itself was a live enough concern to justify the move [5]. That concern was not hypothetical: in April 2026, Daytona disclosed CVE-2026-31431 ("Copy Fail"), a Linux kernel flaw in the `AF_ALG` interface that let one sandbox write into shared kernel page cache visible to other sandboxes on the same host. Daytona's own postmortem states its internal testing found no full host escape, and it patched affected runners within 12 hours, rotated credentials, and paused new signups as a precaution [10]. Whether "no confirmed host escape, but cross-tenant kernel cache interference" clears an organization's own bar for running other customers' generated code next to yours is not something a comparison page can answer — it's a specific enough incident that a security team should read the postmortem directly rather than take either vendor's summary of it.

**Vendor lock-in and exit cost — a gate that changed value in 2026 for anyone who chose Daytona specifically for its openness.** If self-hostability with an actively maintained, auditable codebase was the reason a team picked Daytona, that reason no longer holds as stated: the public repository is now a fork point frozen at its last commit, not a living open-source project. A team currently self-hosting Daytona's open build should treat it as unmaintained software they now own the patching of. Modal was never open source, so its customers never had that expectation to lose — a closed-source SaaS platform that's been closed from day one carries a different, more familiar lock-in profile than one that closed after customers had already built around its openness.

**Cost structure — a genuine tradeoff, not a gate, but the shapes differ.** E2B and Daytona publish nearly identical raw compute rates: $0.0504 per vCPU-hour and $0.0162 per GiB-hour, billed per second [11][12]. The difference is in the floor: E2B's usable tier requires a $150/month Pro subscription to get past 1-hour sessions and 20 concurrent sandboxes, while Daytona has no subscription requirement and instead front-loads $200 in signup credit (with startup-program credits up to $50k) [11][12]. Modal's Sandbox and Notebook compute is priced separately from its standard Function compute, at roughly three times the rate — $0.00003942 per core-second versus $0.0000131 per core-second for CPU, and $0.00000667 versus $0.00000222 per GiB-second for memory, per Modal's own pricing page [13]. An independent analysis of the category corroborates that ratio, describing Modal's sandbox pricing as "roughly 3x standard Function pricing" [14]. That's structurally consistent with Modal's own positioning: Sandboxes are the premium, interactive-workload tier of a platform whose economics are built around scheduled and batch Functions, not around sandboxes being the primary product.

**Resilience — a tradeoff, not a gate, but worth checking against something other than vendor copy.** Daytona's own homepage claims "sub-90ms sandbox creation" [15]; neither E2B's nor Modal's own marketing pages headline a specific cold-start number in what's publicly documented today. ComputeSDK runs a daily, methodology-disclosed benchmark that measures time-to-interactive under a concurrent burst of 100 simultaneous sandbox launches rather than one sandbox at a time — a meaningfully different, and more production-representative, test than a single warm request. An independent write-up of that benchmark's late-August 2026 run reported Daytona's median time-to-interactive at 0.27 seconds under concurrent load, but with only a 37% success rate at that concurrency; Modal came in at 0.88 seconds median, and E2B at 1.61 seconds median, with the piece explicitly noting that "vendor claims are not comparable to each other" because marketing numbers are measured sequentially while real agent fleets launch sandboxes concurrently [14][16]. Benchmark rankings on that leaderboard are rerun daily and will move — the number worth taking away is not any single figure but the gap between a vendor's own cold-start claim and what happens under concurrent load, which is the condition an actual agent fleet creates.

## Isolation and persistence, side by side

| | E2B | Daytona | Modal |
|---|---|---|---|
| Isolation | Firecracker microVM (hardware virtualization via KVM) [1] | Sysbox container runtime (Linux user-namespace remapping) for standard sandboxes; a separate VM-backed sandbox class with its own dedicated kernel is offered for stronger isolation, hypervisor unspecified in Daytona's own docs [17] | gVisor (user-space kernel intercepting syscalls) [18] |
| Codebase | Open source, Apache-2.0, self-hostable [1][2] | Public repo frozen and unmaintained since June 2026; core development now closed-source [5][6] | Closed source since inception |
| Persistence model | Pause/resume preserves full filesystem and memory state indefinitely; default timeout 5 minutes; continuous session up to 24h (Pro) or 1h (Hobby), reset by pause/resume [19] | Markets itself as "stateful, indefinitely-running" sandboxes — a direct carryover from its dev-workspace origins [20] | Explicitly ephemeral: default 5-minute lifetime extendable to 24h max, no pause — beyond that, take a filesystem snapshot and restore into a new Sandbox object [21] |
| Compliance posture documented | Trust portal exists at trust.e2b.dev; specific certifications not confirmed in E2B's own enterprise-page copy at time of writing [22] | SOC 2 Type II report issued 28 July 2026 (covering Dec 2025–Mar 2026); HIPAA attestation and ISO 27001 referenced [10] | SOC 2 Type II since 2 January 2025, no deviations found; HIPAA supported on Enterprise via BAA [8][23] |

The isolation row is the one worth reading carefully rather than skimming: "microVM," "container runtime," and "gVisor" are not three flavors of the same guarantee. A Firecracker microVM's isolation boundary is enforced by the hardware virtualization layer (KVM) itself. gVisor intercepts and mediates system calls in user space without a full hardware boundary — Modal's own security documentation describes this as giving "stronger isolation than most other container runtimes," which is a comparison against containers, not against a hardware VM boundary [18]. Daytona's default runtime, Sysbox, remaps Linux namespaces so a sandbox's root user maps to an unprivileged host user — real isolation, but sharing a kernel by default, which is exactly the layer CVE-2026-31431 lived in [10][17].

## What this comparison cannot resolve

Whether a specific organization's threat model tolerates a shared-kernel isolation boundary, a user-space-mediated one, or requires hardware virtualization is a security-team decision this page cannot make for a reader — it depends on what the agent's generated code can reach if isolation fails, which is workload-specific. Current regional availability and data-residency guarantees for each vendor change quickly enough (E2B lists US/EU regions as "coming soon" on its enterprise page as of this writing [22]) that a reader with a residency requirement needs to verify current status directly with each vendor rather than trust a snapshot taken today. Exact enterprise pricing, SLA terms, and BYOC/on-premises deployment terms are negotiated and not fully public for any of the three. And the ComputeSDK benchmark cited above reruns daily — the specific percentages here are a dated snapshot of a moving target, useful for the pattern (marketing numbers diverge from concurrent-load reality) more than for the exact figures a reader should expect on the day they test it themselves.

## Further reading

- [Constraint-driven comparisons](/guides/constraint-driven-comparisons/): the methodology this page follows.
- [E2B](/tools/e2b/): the tool page, including installation and SDK examples.
- [Daytona](/tools/daytona/): the tool page — note its "Open source: Yes" comparison table predates the June 2026 closed-source move covered above.
- [Modal](/tools/modal/): the tool page, covering Modal's broader GPU and serverless positioning.
- [Sandbox testing pattern for AI agents](/patterns/sandbox-testing-agents/): isolation strategies for testing agents generally, independent of which vendor supplies the sandbox.
- [Software licensing and vendor lock-in](/guides/software-licensing-and-vendor-lock-in/): how to evaluate an open-source-to-closed-source change like Daytona's as a concrete exit-cost question rather than a vague worry.

## Sources

1. E2B, official site — Firecracker microVM isolation claim: [https://e2b.dev/](https://e2b.dev/)
2. E2B Blog, "We Raised $21M to Give Fortune 100 Cloud for AI Agents" (28 July 2025) — funding, lead investor, Fortune 100 adoption figure: [https://e2b.dev/blog/series-a](https://e2b.dev/blog/series-a)
3. Daytona, "From Dev Environments to AI Runtimes" — origin as a developer-workspace product and the 2024 pivot: [https://www.daytona.io/dotfiles/from-dev-environments-to-ai-runtimes](https://www.daytona.io/dotfiles/from-dev-environments-to-ai-runtimes)
4. Daytona, "Daytona Raises $24M Series A to Give Every Agent a Computer" (5 February 2026) — round size, lead investor, participants: [https://www.daytona.io/dotfiles/daytona-raises-24m-series-a-to-give-every-agent-a-computer](https://www.daytona.io/dotfiles/daytona-raises-24m-series-a-to-give-every-agent-a-computer)
5. Daytona, "Daytona is going closed source. Here's why." (11 June 2026) — the announcement and stated rationale: [https://www.daytona.io/dotfiles/updates/daytona-is-going-closed-source](https://www.daytona.io/dotfiles/updates/daytona-is-going-closed-source)
6. Daytona, GitHub repository (README notice: "no longer maintained" as of June 2026): [https://github.com/daytonaio/daytona](https://github.com/daytonaio/daytona)
7. Modal, "Best Code Execution Sandboxes for AI Agents in 2026" — Sandboxes positioned within Modal's wider platform (inference, training, batch, notebooks): [https://modal.com/resources/best-code-execution-sandboxes-ai-agents](https://modal.com/resources/best-code-execution-sandboxes-ai-agents)
8. Modal Blog, "Modal is SOC 2 Type II compliant" — audit completion date and result: [https://modal.com/blog/soc2type2](https://modal.com/blog/soc2type2)
9. Anthropic, Claude Platform Docs, "Self-hosted sandboxes" — provider list including E2B, Daytona, and Modal: [https://platform.claude.com/docs/en/managed-agents/self-hosted-sandboxes](https://platform.claude.com/docs/en/managed-agents/self-hosted-sandboxes)
10. Daytona Trust Center and "Security Update: CVE-2026-31431 ('Copy Fail')" — vulnerability details, response timeline, and compliance certifications: [https://trust.daytona.io/](https://trust.daytona.io/) and [https://www.daytona.io/dotfiles/updates/security-update-cve-2026-31431-copy-fail](https://www.daytona.io/dotfiles/updates/security-update-cve-2026-31431-copy-fail)
11. E2B Pricing — per-second CPU/memory rates, Hobby and Pro tiers: [https://e2b.dev/pricing](https://e2b.dev/pricing)
12. Daytona Pricing — per-second CPU/memory/storage rates, signup and startup credits: [https://www.daytona.io/pricing](https://www.daytona.io/pricing)
13. Modal Pricing — Sandbox/Notebook-specific compute rates versus standard Function rates: [https://modal.com/pricing](https://modal.com/pricing)
14. MarkTechPost, "Best Agent Sandboxes in 2026: Cold Start, Per-Second Pricing, and Network Policy" (27 August 2026) — independent cost and benchmark analysis, methodology disclosed: [https://www.marktechpost.com/2026/08/27/best-agent-sandboxes-2026-cold-start-pricing-network-policy/](https://www.marktechpost.com/2026/08/27/best-agent-sandboxes-2026-cold-start-pricing-network-policy/)
15. Daytona, official site — "sub-90ms sandbox creation" claim: [https://www.daytona.io/](https://www.daytona.io/)
16. ComputeSDK, Sandbox Provider Leaderboard — daily concurrent-burst time-to-interactive benchmark and methodology: [https://www.computesdk.com/benchmarks/sandboxes/](https://www.computesdk.com/benchmarks/sandboxes/)
17. Daytona Trust Center — Sysbox as the runtime isolation boundary, referenced directly in the CVE-2026-31431 postmortem: [https://trust.daytona.io/](https://trust.daytona.io/)
18. Modal Docs, "Networking and security" — gVisor isolation description and default network restrictions for Sandboxes: [https://modal.com/docs/guide/sandbox-networking](https://modal.com/docs/guide/sandbox-networking)
19. E2B Docs, "Sandbox persistence" — pause/resume state model, timeouts, and session limits: [https://docs.e2b.dev/sandbox/persistence](https://docs.e2b.dev/sandbox/persistence)
20. Daytona, official site — "stateful, indefinitely-running sandboxes" positioning: [https://www.daytona.io/](https://www.daytona.io/)
21. Modal Docs, "Sandbox" guide — default and maximum sandbox lifetime, filesystem snapshot for longer-lived state: [https://modal.com/docs/guide/sandbox](https://modal.com/docs/guide/sandbox)
22. E2B, "Enterprise" — BYOC, self-hosting, and on-premises deployment options; US/EU region availability: [https://e2b.dev/enterprise](https://e2b.dev/enterprise)
23. Modal Blog, "Modal supports HIPAA compliance" — HIPAA support via Business Associate Agreement on Enterprise plans: [https://modal.com/blog/hipaa](https://modal.com/blog/hipaa)
