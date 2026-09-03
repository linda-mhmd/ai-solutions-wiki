---
title: "ChatGPT, Claude, and Gemini Go Down the Same Morning"
description: "OpenAI and Anthropic both confirmed multi-hour incidents within the same overlapping window on 3 September 2026, alongside a smaller, less-confirmed Gemini disruption and a separate Grok outage. No shared root cause was established."
date: 2026-09-03
lastmod: 2026-09-03
categories: [News]
tags: [outage, reliability, openai, anthropic, google, incident-response, resilience]
related:
  - news/ai-platform-outages-reliability-2026
  - patterns/multi-provider-llm-failover
  - guides/preparing-for-ai-provider-restrictions
  - guides/incident-management-ai
---

OpenAI and Anthropic both confirmed, on their own status pages, real incidents that overlapped for roughly eighty minutes on the morning of Thursday, 3 September 2026 — OpenAI's from 14:58 to 16:55 UTC (10:58 a.m.–12:55 p.m. ET), Anthropic's from 13:26 to 16:16 UTC (9:26 a.m.–12:16 p.m. ET). Google's Gemini and xAI's Grok also saw disruption reports in roughly the same window, though the evidence behind each is weaker: Grok's own status page logged an outage, while Google's Workspace and Cloud status dashboards show no incident at all for that date despite a real, smaller spike in user reports. No outlet, and none of the companies' own status pages, established a shared technical cause across any of them.

## What happened

OpenAI and Anthropic logged real, status-page-confirmed incidents that overlapped in time; Gemini and Grok saw disruption too, with thinner evidence behind each:

**OpenAI.** OpenAI's status page opened an incident, "Elevated errors across ChatGPT and Codex," at **14:58:23 UTC (10:58 a.m. ET)**. A mitigation was applied 19 minutes later, at 15:17 UTC, and the incident was marked resolved at **16:55:49 UTC (12:55 p.m. ET)** — just under two hours end to end. Fifteen ChatGPT components were listed as affected, including conversations, login, search, file uploads, voice mode, image generation, and Deep Research, plus four Codex components; OpenAI noted some Codex remote-control users would need to re-pair their device afterward. Downdetector logged more than 37,000 reports for ChatGPT at the peak, around 11 a.m. ET.

**Anthropic.** Anthropic's status page shows investigation starting at **13:26 UTC (roughly 9:26 a.m. ET)**, with a cause identified 15 minutes later and a full list of affected models confirmed by 13:50 UTC: Claude Mythos 5.1, Fable 5.1, Mythos 5, Fable 5, Opus 5, Opus 4.8, and Opus 4.6, across claude.ai, the Claude API, Claude Code, and Claude Cowork. Most models recovered by 15:25 UTC; Opus 4.8 and Opus 5 remained affected until a fix was deployed at 16:06 UTC, with impact ending at **16:16 UTC (12:16 p.m. ET)** — about two hours and fifty minutes total; Anthropic's resolution message was posted seven minutes later, at 16:23 UTC. Downdetector logged roughly 1,300 reports for Claude.

**Google.** Gemini is the weakest-evidenced of the four: Downdetector logged only about 500 reports, the smallest count, and neither Google's Workspace status dashboard nor its Cloud status dashboard listed an incident for 3 September 2026 at the time of writing — both showed "no incidents" / "no broad severe incidents" when checked. Some coverage pointed to a narrower, separate Gemini API problem involving newly issued API keys failing against OpenAI-compatible endpoints, but that traces to Google's ongoing, previously scheduled migration of Gemini API keys to a new format, not a same-day outage Google itself confirmed. Real user reports, no confirmed incident: treat Gemini's inclusion in this story as reported, not established.

**Grok, briefly.** xAI is not a company this wiki tracks closely, but for completeness: Grok's own status page recorded a "models outage" starting at about 9:30 a.m. ET, lasting roughly three hours and thirty-seven minutes, with users seeing "this model is overloaded" errors across web, iOS, and Android. Downdetector logged roughly 1,300 reports for Grok, comparable to Claude's. Its status-page detail is thinner than OpenAI's or Anthropic's, so treat these figures as less independently verified.

**What is not confirmed.** Microsoft Azure also saw a spike in outage reports that morning, and several outlets — none of them the companies' own statements — floated Azure as a possible shared dependency, since OpenAI and others run production traffic on it. One outlet [reported](https://www.techtimes.com/articles/326509/20260903/gemini-survived-when-chatgpt-claude-grok-collapsed-azure-fault.htm) that a status-aggregator site had logged a user-submitted note of Azure's East US region seeing ingress failures starting around 10:26 a.m. PT (1:26 p.m. ET) — a single, unverified report, not an Azure-confirmed incident. Azure's own official status-history page lists no incident logged for 3 September 2026 (its most recent prior entry is a West US network incident from 23 July 2026), and no company confirmed Azure, DNS, or a DDoS attack as the cause of its own incident. One outlet explicitly cross-checked the providers' status pages and concluded the affected components and update cadences differed enough that the incidents should be treated as separate, not as one confirmed failure. Write this down as: two confirmed, overlapping incidents (OpenAI, Anthropic), two more with weaker evidence (Gemini, Grok), one popular shared-cause theory, and zero confirmation of that theory from anyone in a position to know.

One footnote that is color, not cause: OpenAI's ChatGPT account had posted a cryptic "the stars are almost aligned" teaser shortly before the outage, widely read as hinting at the [Astra](https://openai.com/index/path-to-astra/) model launch that landed later that same day. OpenAI did not say whether the outage was related to Astra preparation, and reporting treated a connection as unlikely given how frequently ChatGPT has had unrelated incidents in 2026.

## Why it matters for builders

Whether or not a common cause is ever confirmed, multiple frontier providers having a bad morning within the same overlapping window is itself the story, for two separate reasons.

**First, it is evidence, not just noise, for concentration risk.** This wiki [documented the broader 2026 reliability trend](/news/ai-platform-outages-reliability-2026/) in July: high-disruption days across major AI platforms rose from 6 in Q1 2025 to 51 in Q1 2026. A single bad quarter is one thing; independent providers overlapping on the same day, even with unrelated root causes, is what happens when an entire industry runs on a small number of hyperscale clouds, similar GPU supply chains, and comparably young operational maturity for a product category that only recently became load-bearing infrastructure. Causes that cluster in time without being the same cause are still a resilience problem for anyone downstream, because the thing that actually matters to your users — "is any model available right now" — doesn't care whether the failures were related.

**Second, "multi-provider" only helps if your failover is real.** A team routing 100% of production traffic to one vendor had no good options during any of these windows; a team with a tested secondary path could have shifted traffic within minutes. See [multi-provider LLM failover](/patterns/multi-provider-llm-failover/) for the concrete mechanics — health checking, routing strategies, and response normalization — and [preparing for AI provider restrictions](/guides/preparing-for-ai-provider-restrictions/) for the related discipline of not being structurally dependent on a single vendor's availability or policy decisions. An untested failover path is not a mitigation; it is an assumption. If you have not actually cut traffic over to your fallback provider recently, under load, you do not know it works.

Two smaller notes worth carrying forward: don't let "everyone was down" become an excuse to skip your own postmortem — your incident response and your customer communication are still yours to own regardless of whose infrastructure failed, see [AI incident response](/guides/ai-incident-response/) and [incident management for AI systems](/guides/incident-management-ai/). And be skeptical of any tidy single-cause narrative that circulates in the hours after an event like this — the Azure theory here is plausible, widely repeated, and still unconfirmed by any of the parties who would actually know.

## Sources

1. OpenAI Status, "Elevated errors across ChatGPT and Codex" (3 September 2026): [https://status.openai.com/incidents/01M1KWEDH417T2CF44YYHZDFCR](https://status.openai.com/incidents/01M1KWEDH417T2CF44YYHZDFCR)
2. Claude Status, incident timeline for Mythos 5.1, Fable 5.1, Opus 5, Opus 4.8 (3 September 2026): [https://status.claude.com/](https://status.claude.com/)
3. Grok (xAI) Status, "Models outage": [https://status.x.ai/grok-com](https://status.x.ai/grok-com)
4. Azure Status History (checked 3 September 2026, no incident listed for that date): [https://azure.status.microsoft/en-us/status/history/](https://azure.status.microsoft/en-us/status/history/)
5. Google Cloud Status Dashboard (checked 3 September 2026, "No broad severe incidents"): [https://status.cloud.google.com/](https://status.cloud.google.com/)
6. BleepingComputer, "OpenAI confirms ChatGPT is down ahead of 'Astra' model launch" (3 September 2026): [https://www.bleepingcomputer.com/news/artificial-intelligence/openai-confirms-chatgpt-is-down-ahead-of-astra-model-launch/](https://www.bleepingcomputer.com/news/artificial-intelligence/openai-confirms-chatgpt-is-down-ahead-of-astra-model-launch/)
7. BleepingComputer, "Anthropic confirms Claude is down, multiple models affected" (3 September 2026): [https://www.bleepingcomputer.com/news/artificial-intelligence/anthropic-confirms-claude-is-down-multiple-models-affected/](https://www.bleepingcomputer.com/news/artificial-intelligence/anthropic-confirms-claude-is-down-multiple-models-affected/)
8. DailyVoice, "ChatGPT, Claude, Grok and Gemini Hit By Widespread AI Outage" (3 September 2026): [https://dailyvoice.com/article/chatgpt-claude-grok-gemini-hit-by-widespread-ai-outage/](https://dailyvoice.com/article/chatgpt-claude-grok-gemini-hit-by-widespread-ai-outage/)
9. tbreak, "ChatGPT Claude Grok outage: what happened" (3 September 2026), status-page cross-check concluding no confirmed common cause: [https://tbreak.com/chatgpt-claude-grok-outage-september-2026/](https://tbreak.com/chatgpt-claude-grok-outage-september-2026/)
10. LADbible, "ChatGPT, Gemini, Grok and Claude down as AI services experience outage" (3 September 2026): [https://www.ladbible.com/technology/ai-chatgpt-gemini-grok-claude-down-921448-20260903](https://www.ladbible.com/technology/ai-chatgpt-gemini-grok-claude-down-921448-20260903)
11. Tech Times, "Gemini Survived When ChatGPT, Claude, Grok Collapsed: Azure Fault" (3 September 2026), source for the unconfirmed Azure East US user report: [https://www.techtimes.com/articles/326509/20260903/gemini-survived-when-chatgpt-claude-grok-collapsed-azure-fault.htm](https://www.techtimes.com/articles/326509/20260903/gemini-survived-when-chatgpt-claude-grok-collapsed-azure-fault.htm)

## Further reading

- [AI platform outages surge as enterprise adoption grows](/news/ai-platform-outages-reliability-2026/): the year-long reliability trend this incident sits inside.
- [Multi-provider LLM failover](/patterns/multi-provider-llm-failover/): the pattern that turns an outage like this into a non-event.
- [Preparing for AI provider restrictions](/guides/preparing-for-ai-provider-restrictions/): the broader discipline of not being structurally dependent on one vendor.
- [AI incident response](/guides/ai-incident-response/): running your own postmortem when the failure originated upstream.
- [Claude Fable 5.1 reaches general availability](/news/claude-fable-5-1-mythos-5-1-ga/): context on the Claude model family affected by this incident.
- [Circuit breaker pattern](/patterns/circuit-breaker-ai/): the building block that stops one provider's failure from cascading through your system.
