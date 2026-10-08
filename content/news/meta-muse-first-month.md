---
title: "Muse's First Month: 5 Million Downloads, Four Controversies, No EU Date"
description: "A month after launch, Meta's Muse agent tops the app charts while dealing with an Amazon block, a macOS zero-day, human callers behind AI calls and hourly user profiles. Alexandr Wang's interview with Cleo Abram calls it the iPhone moment for agents. It is still not available in the EU."
date: 2026-10-08
lastmod: 2026-10-08
last_updated: 2026-10-08
last_verified: 2026-10-08
categories: [News]
tags: [meta, muse, ai-agents, personal-agent, privacy, eu-availability, agent-security]
related:
  - tools/meta-muse
  - tools/meta-llama
  - news/ai-agent-security-roundup-september-2026
  - news/google-gemini-agent-gemini-at-work
---

Meta launched Muse, its personal AI agent, on 8 September 2026. One month on, it is the fastest-growing new AI app of the year by download count, the centrepiece of Meta's AI strategy, and the subject of four separate controversies. On 8 October, Cleo Abram's channel published a long interview with Alexandr Wang, the Meta executive responsible for it, which is trending as we write. Muse is still available only in the US and Canada.

The full explainer, with the architecture, pricing, the EU position and a comparison with OpenAI dots and the Gemini agent, is on the new [Meta Muse](/tools/meta-muse/) page. This entry is the month in brief.

## What happened

- **Growth.** Sensor Tower estimated 5 million downloads across the US and Canada within 22 days, against 56 days for ChatGPT, 103 for Grok and 492 for Claude. Muse reached No. 1 on the US App Store free chart. Sensor Tower also found Meta pointed up to half of its daily house-ad impressions at the app, and The Information reported about 3 million weekly users, so the download figure says as much about Meta's distribution as about demand.
- **Small business.** Muse for Small Business launched on 29 September with connectors to Meta ad accounts, Shopify, Stripe, QuickBooks and others. Publishing, sending and spending still need the owner's approval.
- **Amazon block (20 September).** Amazon blocked Muse from shopping on Amazon.com, citing its Conditions of Use and saying the agent does not identify itself. Meta disputes Amazon's claim about credentials.
- **macOS zero-day (21 September).** A local process could take over a user's Muse account token through the Mac app. Meta hotfixed it.
- **Human callers (22 September).** Reuters and 404 Media reported Meta had tested routing some Muse phone calls to human call-centre workers, sometimes without testers knowing. Meta called it a "miss" and rolled it back.
- **Profiles of people you mention (6 October).** TIME reported that Muse's instructions tell it to keep hourly-updated profiles of users and the people they mention. Meta did not dispute it and said users control their memories.

## The interview

Cleo Abram's *Huge Conversations* series began in 2024 with Mark Zuckerberg. Her conversation with Wang, published on 8 October, is the most extended public explanation of Muse from the person running it. According to a publication-day summary, the one written account we could find, Wang calls Muse the "iPhone moment" for agents, Abram presses him on where users' data goes when they connect accounts, and Wang concedes that agent memory is still unsolved across the industry. We could not reach the video itself from our research environment, so the quotes above are paraphrases from that summary. The [Muse page](/tools/meta-muse/#watch-alexandr-wang-on-muse-with-cleo-abram) has the details and the video.

The memory admission is the line to watch for. It sits directly beside the TIME reporting: an agent whose memory is described by its own builder as unsolved is also, by its instructions, building profiles of people who never signed up.

## Why it matters for builders

Muse is the first mass-market test of an agent with standing access to people's email, calendars and money. Three lessons are already clear. The architecture matters but is not enough: Meta's sealed VM and Sentinel approval agent are a sound design, and the month's incidents happened in the Mac client, in a human process and in memory policy, not in the parts the design protects. Disclosure is now the issue, both to the businesses an agent calls and to the people an agent remembers. And retailers are deciding individually whether agents are welcome, so an agent that depends on third-party sites needs a plan for being blocked.

## Still not in the EU

Meta has given no European date. Its help centre says only that Muse is "not yet available in all locations". Given Muse's handling of third-party personal data and training by default with an opt-out, a European launch will have to answer GDPR and AI Act questions that a US launch did not. If you are in the EU, do not connect a work account through a VPN or a US account: there is no EU offering and no data processing agreement behind it.

## Sources

- Meta, "Introducing Muse" (8 September 2026): https://about.fb.com/news/2026/09/introducing-muse-personal-ai-agent/
- 9to5Mac, "Meta's Muse crosses 5 million downloads amid massive advertising push" (30 September 2026), reporting Sensor Tower estimates: https://9to5mac.com/2026/09/30/report-metas-muse-crosses-5-million-downloads-amid-massive-advertising-push/
- TechCrunch, "Meta is expanding its AI agent Muse to small businesses" (29 September 2026): https://techcrunch.com/2026/09/29/meta-is-expanding-its-ai-agent-muse-to-small-businesses/
- The Star (Reuters), "Amazon blocks Meta's Muse AI agent from its retail site" (22 September 2026): https://www.thestar.com.my/tech/tech-news/2026/09/22/amazon-blocks-metas-muse-ai-agent-from-its-retail-site
- 404 Media, "Meta tests Muse AI agent calls that are actually made by humans in a call center" (September 2026): https://www.404media.co/meta-tests-muse-ai-agent-calls-that-are-actually-made-by-humans-in-a-call-center/
- TIME, "Meta's Muse AI agent is building a dossier on you" (6 October 2026): https://time.com/article/2026/10/06/meta-muse-ai-agent-privacy/
- CNBC, "Meta's Muse assistant tops app charts. Now it needs to become a habit" (7 October 2026): https://www.cnbc.com/2026/10/07/meta-muse-personal-ai-agents-dazzle.html
- Weibo summary of the Cleo Abram interview with Alexandr Wang (8 October 2026), secondary: https://weibo.com/2/detail/5351734778268849
- Cleo Abram on YouTube: https://www.youtube.com/@CleoAbram

## Further reading

- [Meta Muse, explained in full](/tools/meta-muse/): the deep dive this entry summarises.
- [Meta Muse Spark and Llama](/tools/meta-llama/): the models behind Muse.
- [AI agent security, September 2026](/news/ai-agent-security-roundup-september-2026/): the Muse macOS zero-day in context.
- [Google's Gemini agent](/news/google-gemini-agent-gemini-at-work/): the enterprise counterpart announced the same day as the interview.
