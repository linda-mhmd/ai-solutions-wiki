---
title: "Google Performance Max: The Spam Lead Problem That Won't Go Away"
description: "Advertisers report that Google's AI-driven Performance Max campaigns generate fake calls, bot form fills, and low-quality leads. Industry data suggests up to 51% of PMax spend may be at risk from fraud."
date: 2026-07-30
lastmod: 2026-07-30
last_updated: 2026-07-30
categories: [News]
tags: [google-ads, performance-max, ad-fraud, ai-advertising, lead-generation]
related:
  - news/ai-search-and-geo-vs-seo
  - guides/ai-search-and-geo-vs-seo
  - glossary/ai-gateway
---

Google's Performance Max (PMax) campaigns promise AI-driven automation that finds customers across Google's entire inventory: Search, Display, YouTube, Gmail, Maps, and Discover. But advertisers, especially those running lead-generation campaigns, report a persistent problem: spam leads, fake calls, and bot form submissions that consume budget while delivering nothing of value. Industry research suggests the scale is substantial.

## What advertisers are reporting

The complaints follow a consistent pattern across forums, agency reports, and industry publications:

**Fake call leads**: Agencies report taking over accounts where the majority of calls from PMax campaigns were spam. One agency documented receiving 8 call bookings from PMax in the first week of a new account; 6 were spam. Another recorded that "75% of calls booked were either spam or unqualified."

**Bot form submissions**: Bots submit lead forms, which PMax's algorithm interprets as conversions. Because the algorithm optimizes toward what appears to be working, it then seeks more traffic from similar sources, creating a feedback loop that compounds the problem.

**Made-for-advertising (MFA) site placements**: PMax's opaque placement reporting makes it difficult to see where ads run. Some traffic ends up on low-quality sites designed to generate clicks rather than genuine engagement. Advertisers often cannot identify these placements until they audit at the account level.

**Scam calls**: Some advertisers report receiving calls that appear to be scam attempts rather than genuine leads, suggesting their campaigns are reaching or attracting bad actors.

## The scale of the problem

Spider AF, an ad fraud detection company, analyzed Performance Max campaigns and found that "up to 51.8% of spend can be at risk" from various forms of fraud and low-quality traffic. Their data also showed that "fake leads convert at half the rate of real ones," meaning advertisers pay for leads that never become customers.

Search Engine Land published analysis explaining the mechanism: "Traffic bots fill out the form and Google thinks it got you a quality lead. It pats itself on the back, and even worse, starts to go after more of the same low-quality traffic." The algorithmic feedback loop makes the problem self-reinforcing.

PPC Land reported that advertisers spending above $100,000 per month increasingly question whether PMax can perform at scale, citing trust erosion around lead quality and placement transparency.

## Why PMax is vulnerable

Performance Max is designed to be hands-off. Advertisers provide creative assets, conversion goals, and audience signals; the AI handles everything else. That automation is the product's value proposition, but it also creates vulnerabilities:

**Limited visibility**: Advertisers cannot see granular placement data the way they can with standard campaigns. If traffic comes from a made-for-advertising site or a mobile app with accidental clicks, it may not be obvious.

**Conversion optimization without qualification**: PMax optimizes toward whatever you track as a conversion. If bot submissions count as conversions, the algorithm treats them as success signals.

**No negative keyword list by default**: Search campaigns let advertisers exclude irrelevant queries. PMax only recently added limited negative keyword support, and many advertisers never set them up.

**Audience signal dependence**: The quality of PMax output depends heavily on the quality of the audience signals and first-party data you provide. Weak signals produce weak targeting.

## How to mitigate

Industry practitioners recommend several defenses, none of which eliminate the problem entirely:

1. **Use offline conversion imports**: Feed back actual sales data, not just form submissions, so the algorithm learns what real customers look like.

2. **Add negative keywords**: Though limited, PMax now supports account-level negative keywords. Use them aggressively.

3. **Monitor placement reports**: Request account-level placement reporting and exclude low-quality sources manually.

4. **Implement form honeypots and CAPTCHA**: Technical defenses at the form level can reduce bot submissions before they become conversion signals.

5. **Use third-party fraud detection**: Services like Spider AF, ClickCease, and ClickPatrol monitor for invalid clicks and fraudulent submissions.

6. **Consider pulling lead-gen from PMax entirely**: Some agencies recommend using PMax only for ecommerce where transaction data provides clear conversion signals, and running lead-gen through standard Search campaigns with more control.

## Why it matters

The Performance Max problem illustrates a broader tension in AI-driven advertising: automation requires trusting the algorithm with decisions you used to make yourself. When the algorithm's incentives (maximizing reported conversions) diverge from your incentives (acquiring real customers), the gap shows up as wasted budget.

For builders and marketers, the lesson is familiar from other AI systems: garbage in, garbage out. If you feed PMax weak signals, if you count bot submissions as conversions, if you never look at where your ads actually run, the AI will optimize toward whatever data you gave it. The AI is not broken; it is doing exactly what you asked, and that is the problem.

Google has made incremental improvements: better placement reporting, negative keyword support, and fraud detection. But the fundamental architecture, an opaque system that optimizes toward conversion signals you define, puts the burden on advertisers to ensure those signals reflect reality.

## Sources

- Spider AF, "PMax Ad Fraud: How Performance Max Gets Exploited and How to Stop It" (2026): https://spideraf.com/articles/pmax-ad-fraud-how-performance-max-gets-exploited-and-how-to-stop-it
- Spider AF, "Performance Max Spam Leads — What They Are and How to Fight" (2026): https://spideraf.com/articles/performance-max-spam-leads
- TNT Growth, "How to Fix a Google PMax Campaign Generating Spam Leads" (2026): https://tntgrowth.com/blog/fix-pmax-spam-leads
- Search Engine Land, "Why Performance Max for lead generation often fails and how to make it work" (2023): https://searchengineland.com/why-performance-max-lead-generation-fails-make-it-work-393038
- Search Engine Land, "How to reduce low-quality leads from Performance Max campaigns" (2025): https://searchengineland.com/how-to-reduce-low-quality-leads-from-performance-max-campaigns-468687
- PPC Land, "Performance Max at Scale: Advertisers question if PMax can hold up above $100k/month" (2025): https://ppc.land/performance-max-at-scale-advertisers-question-if-pmax-can-hold-up-above-100k-month/
- Full Stack PPC Dispatch, "PMax: The Spam Magnet" (May 2026): https://fullstackppcdispatch.substack.com/p/pmax-the-spam-magnet

## Further reading

- [AI search and the future of SEO](/guides/ai-search-and-geo-vs-seo/): how AI is changing discovery.
- [FinOps for AI](/guides/finops-for-ai/): managing AI-related costs.
