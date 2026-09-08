---
title: "ChatGPT vs Microsoft Copilot: Same Models, Different Products"
description: "Microsoft Copilot is largely built on OpenAI's models under a commercial partnership, so the real choice against ChatGPT is about pricing, Office integration, and data grounding — not which one is smarter. A buying guide for the consumer and Microsoft 365 Copilot, not GitHub Copilot."
date: 2026-09-04
categories: [Comparisons]
tags: ["chatgpt", "microsoft-copilot", "microsoft-365-copilot", "copilot", "openai", "comparison", "consumer-ai", "ai-assistant", "productivity", "pricing"]
tools: ["openai-api"]
related:
  - comparisons/ai-subscription-pricing-2026
  - comparisons/claude-vs-chatgpt
  - comparisons/claude-code-vs-cursor-vs-codex
  - tools/github-copilot
  - tools/openai-api
  - basics/what-is-chatgpt
last_verified: 2026-09-04
last_updated: 2026-09-04
lastmod: 2026-09-04
---

<figure class="bz-figure">
  <img src="/img/decoding-software/app-iceberg-servers-notext.png" alt="An iceberg diagram: a small app icon visible above the waterline, a much larger server structure hidden beneath it." loading="lazy">
  <figcaption>What you see is a Microsoft-branded chat window. What answers you, most of the time, is an OpenAI model. The comparison that matters is everything built on top of that fact.</figcaption>
</figure>

"ChatGPT vs Copilot" is one of the most-searched AI comparisons precisely because it doesn't resolve the way "Product A vs Product B" normally does. Microsoft Copilot isn't an independent competitor to ChatGPT the way Gemini or Claude are — for most everyday questions, it's substantially the same OpenAI model, wrapped in Microsoft's apps, under a commercial deal between the two companies. That changes what the comparison is actually about. It's not "which one reasons better," because for a lot of daily use the answer underneath is coming from the same lineage. It's "which wrapper gets you more for what you already pay for, or already have."

**First, a name to get out of the way.** If you landed here looking for the AI that writes code inside VS Code, that's **GitHub Copilot**, a completely different Microsoft product built for software development — see [Claude Code vs Cursor vs Codex](/comparisons/claude-code-vs-cursor-vs-codex/) and [open-source coding agents](/comparisons/open-source-coding-agents/) for that comparison. This page is about the general-purpose assistant: the free **Microsoft Copilot** app and website, and **Microsoft 365 Copilot**, the paid assistant built into Word, Excel, Outlook, and Teams.

## The relationship behind the products

Microsoft Copilot exists because Microsoft has a commercial partnership with OpenAI, not because Microsoft built a rival model from scratch. That relationship changed materially in 2026, and it's worth knowing the current shape of it before comparing features, because it explains why the two products keep converging rather than diverging.

On 27 April 2026, Microsoft and OpenAI announced a restructured agreement that replaced the exclusive arrangement in place since 2019 [1][2]. The key terms, as both companies describe them:

- **No more cloud exclusivity.** OpenAI can now sell and serve its models through any cloud provider — it struck a separate, up-to-$50 billion compute deal with AWS around the same time. Azure keeps "primary cloud partner" status and first-look on new OpenAI products, but only where Microsoft can and chooses to support them [1][3].
- **Microsoft's IP license runs through 2032, and it's now non-exclusive.** Other companies can build on OpenAI's models the same way Microsoft does.
- **The AGI clause is gone.** The original deal let Microsoft's rights lapse if OpenAI's board declared artificial general intelligence had been reached. That trigger was removed entirely — Microsoft's access now runs on a fixed calendar, not a contested technical milestone [4].
- **Revenue share is capped.** OpenAI's payments to Microsoft continue through 2030 at roughly 20% of revenue, but now under a hard $38 billion ceiling instead of an open-ended share tied to OpenAI's growth [3][5]. Microsoft no longer owes OpenAI a reciprocal share.
- **Microsoft remains a major shareholder** in OpenAI's for-profit entity (a roughly 27% stake dating to OpenAI's October 2025 restructuring), but is no longer OpenAI's only path to market.

The practical upshot: Copilot isn't locked to OpenAI forever, and it isn't locked to *only* OpenAI right now, either. As of OpenAI's own July 2026 announcement, **GPT-5.6 is the "preferred model" across Microsoft 365 Copilot** — Word, Excel, PowerPoint, Chat, and Microsoft's agent-orchestration surface Copilot Cowork all default to it [6][7]. But since September 2025, Microsoft has also offered **Anthropic's Claude models as a selectable alternative** inside Copilot — Claude Sonnet and Opus power specific features like Excel's Agent Mode and the Researcher agent — and as of January 2026, Anthropic models are enabled by default in many commercial tenants rather than requiring opt-in [8][9]. So Copilot is, today, a multi-model product with OpenAI as the default. ChatGPT, by definition, only ever runs OpenAI models.

## What you're actually choosing between

"Copilot" alone is ambiguous even once you've ruled out GitHub Copilot, because Microsoft sells it in layers:

| Tier | What it is | Data it can see | Price |
|---|---|---|---|
| Microsoft Copilot (free) | Web app, Windows taskbar, Copilot mobile app | The open web, whatever you paste in | Free |
| Microsoft 365 Copilot Chat | Bundled with qualifying M365 plans | Web + whatever you type — **not** your mailbox or files | Free with a qualifying license |
| Microsoft 365 Personal / Family | Copilot inside consumer Word/Excel/Outlook | Your own documents in that app | $9.99–$12.99/mo |
| Microsoft 365 Premium | Adds Researcher, Analyst, Actions, higher limits | Your documents + agent tools | $19.99/mo ($199.99/yr) — replaced the standalone Copilot Pro plan |
| Microsoft 365 Copilot Business | SMB add-on, up to 300 seats | Tenant mail, files, calendar, Teams (Graph-grounded) | $21/user/mo ($18 promo through 31 Dec 2026) |
| Microsoft 365 Copilot (Enterprise) | Add-on to E3/E5/Business Premium | Full Microsoft Graph grounding, Copilot Studio agents | $30/user/mo, annual commitment |

Sources: Microsoft's own pricing pages [10][11][12].

Against that, ChatGPT's ladder is simpler:

| Tier | Price | Notes |
|---|---|---|
| Free | $0 | Rate-limited, latest models throttled |
| Go | ~$8/mo | Entry paid tier, higher limits, ad-supported (US pricing; priced regionally elsewhere) |
| Plus | $20/mo | Higher limits, Canvas, voice, image generation, early feature access |
| Pro ($100 tier) | $100/mo | 5x Plus usage limits, added in April 2026 as a mid-tier option |
| Pro ($200 tier) | $200/mo | 20x Plus usage limits, 1M-token context, unlimited Sora |
| Business | ~$20–25/user/mo (2-seat minimum) | Admin console, no training on inputs |
| Enterprise | Custom | SSO, higher context limits, dedicated support |

Sources: OpenAI's pricing pages and current third-party pricing trackers cross-checked against them [13][14].

The comparison that actually matters isn't Free-vs-Free or Plus-vs-Premium in isolation — it's whether you already pay for Microsoft 365 seats. If you do, Microsoft 365 Copilot is an *add-on* to a cost you're already carrying. If you don't, you're comparing it to ChatGPT as a full standalone subscription, and the calculus is different.

## What Copilot adds beyond the OpenAI model itself

This is the part that's genuinely Microsoft's, not OpenAI's, and it's the actual case for paying for Copilot instead of ChatGPT:

- **Inline app integration.** Copilot drafts in the Word document you have open, writes formulas inside the live Excel sheet, summarizes the specific Teams meeting you were just in, and drafts replies inside the Outlook thread you're reading — without you copying anything in or out. ChatGPT's Canvas is a capable writing/editing surface, but it's ChatGPT's own surface, not a live edit inside your actual .docx or .xlsx file.
- **Microsoft Graph grounding.** The paid enterprise and business tiers can search across your mailbox, calendar, OneDrive, SharePoint, and Teams history and cite it in an answer — "what did legal say about this contract last week" works because Copilot has access to that data natively. ChatGPT can do something similar, but only once you set up connectors to those same systems yourself; it isn't grounded in your Microsoft tenant by default.
- **Windows integration.** A dedicated Copilot key ships on new Windows keyboards, "Ask Copilot" is rolling into the Windows 11 taskbar and File Explorer, and Copilot+ PCs run **Click to Do**, a local, on-device vision feature that can act on whatever's on your screen without sending it to the cloud [15]. This is OS-level surface area ChatGPT's desktop app doesn't have.
- **Copilot Studio.** Lets an organization build custom, tenant-aware agents on top of Copilot without writing code — the closer enterprise analogue is OpenAI's own agent-building tools, but Copilot Studio is more tightly wired into Microsoft's own data and identity stack out of the box.
- **Admin and compliance controls.** For an organization already inside Microsoft's compliance perimeter (Purview, EU Data Boundary, existing tenant policies), turning on Copilot inherits those controls. Standing up equivalent governance around ChatGPT Enterprise means configuring a second vendor's compliance surface from scratch.

## Where it's genuinely the same product in different clothes

For a large share of what people actually do — draft this email, explain this concept, summarize this article, brainstorm names — the quality of the answer from free Copilot and free ChatGPT, or from Microsoft 365 Copilot and ChatGPT Plus, tracks the underlying model more than the wrapper. When GPT-5.6 is the model behind both, the raw reasoning and writing quality is not a meaningfully different product decision. Image generation is a similar story: Copilot draws on both OpenAI's image models and Microsoft's own MAI-Image line, while ChatGPT uses OpenAI's `gpt-image-2` directly — outputs are broadly comparable for typical prompts, and neither is a clear, durable winner worth switching products over.

## Real weaknesses on both sides

Neither product is simply the better one across the board.

**Copilot's weaknesses are largely about product stability, not the model.** Microsoft has cycled the Copilot lineup hard: the standalone Copilot Pro plan was retired into Microsoft 365 Premium; and in August 2026, Microsoft announced it was merging the consumer Copilot and Microsoft 365 Copilot apps into one experience while discontinuing Group Chats, AI-generated podcasts, the Mico avatar, and the experimental Copilot Labs tools — and moving Deep Research behind the Microsoft 365 Premium paywall [16]. That's a lot of feature churn in under a year, and it makes Copilot a moving target compared to ChatGPT's comparatively settled tier structure. The free tier is also more conservatively rate-limited in practice than free ChatGPT for equivalent tasks, and "three-plus products all named Copilot" (this one, GitHub Copilot, Copilot Studio, Security Copilot) is a genuinely confusing brand to search and buy correctly — this article exists partly because of that confusion.

**ChatGPT's weaknesses are mostly about the enterprise data layer.** It has no native equivalent to Graph grounding — connecting it to your company's live mailbox, files, and calendar requires configuring connectors yourself, where Copilot gets that natively inside a Microsoft tenant. It has no OS-level presence comparable to Windows integration (a desktop and mobile app, but not a taskbar key or File Explorer hook). And because it's single-model by design, you don't get Copilot's option to route a task to Claude when OpenAI's model isn't your first choice for it.

## Who should actually pick what

<div class="bz-flow">
<div class="bz-flow-step"><span class="bz-flow-step-tag">If</span><span class="bz-flow-step-name">Your org already pays for M365 E3/E5 or Business Premium</span><span class="bz-flow-step-desc">The incremental $21–30/user buys Office integration and Graph grounding you'd otherwise have to build yourself.</span></div>
<div class="bz-flow-arrow">&rarr;</div>
<div class="bz-flow-step"><span class="bz-flow-step-tag">Pick</span><span class="bz-flow-step-name">Microsoft 365 Copilot</span></div>
</div>

<div class="bz-flow">
<div class="bz-flow-step"><span class="bz-flow-step-tag">If</span><span class="bz-flow-step-name">You want the newest OpenAI features first, or need a model ChatGPT offers that Copilot doesn't yet expose</span><span class="bz-flow-step-desc">Voice mode, Sora video, the newest reasoning tiers, and Canvas all ship on ChatGPT before — sometimes long before — they reach Copilot.</span></div>
<div class="bz-flow-arrow">&rarr;</div>
<div class="bz-flow-step"><span class="bz-flow-step-tag">Pick</span><span class="bz-flow-step-name">ChatGPT Plus or Pro</span></div>
</div>

<div class="bz-flow">
<div class="bz-flow-step"><span class="bz-flow-step-tag">If</span><span class="bz-flow-step-name">You're a casual Windows user who wants free AI without a subscription</span><span class="bz-flow-step-desc">Free Copilot and free ChatGPT are close enough in everyday quality that "already on my taskbar" is a legitimate deciding factor.</span></div>
<div class="bz-flow-arrow">&rarr;</div>
<div class="bz-flow-step"><span class="bz-flow-step-tag">Pick</span><span class="bz-flow-step-name">Whichever is already in front of you</span></div>
</div>

<div class="bz-flow">
<div class="bz-flow-step"><span class="bz-flow-step-tag">If</span><span class="bz-flow-step-name">You run a small business without an enterprise Microsoft agreement</span><span class="bz-flow-step-desc">Compare Copilot Business ($18–21/seat) against ChatGPT Business (~$20–25/seat) on the integrations you'll actually use, not the sticker price alone — Copilot wins if your files already live in SharePoint/OneDrive; ChatGPT wins if they don't.</span></div>
<div class="bz-flow-arrow">&rarr;</div>
<div class="bz-flow-step"><span class="bz-flow-step-tag">Pick</span><span class="bz-flow-step-name">Whichever matches where your files already live</span></div>
</div>

One thing not to do: don't pay for both tiers expecting materially different answers to "explain this to me" or "draft this email." When the model underneath is the same, you're paying twice for one brain in two houses — pay for the house (the integration) that fits where your work already lives.

## Further reading

- [AI subscription pricing 2026](/comparisons/ai-subscription-pricing-2026/): the wider consumer AI pricing landscape, including Claude and Gemini, tracked separately from this page's Microsoft/OpenAI-specific detail.
- [Claude vs ChatGPT](/comparisons/claude-vs-chatgpt/): how ChatGPT compares to a genuinely independent model vendor, as a contrast to the same-model relationship covered here.
- [Claude Code vs Cursor vs Codex](/comparisons/claude-code-vs-cursor-vs-codex/) and [Open-source coding agents](/comparisons/open-source-coding-agents/): where GitHub Copilot and its alternatives are actually covered.
- [GitHub Copilot](/tools/github-copilot/): the coding-specific product this page deliberately does not re-cover.
- [OpenAI API](/tools/openai-api/): the model lineup (GPT-5.6, GPT-6 Astra) that powers both ChatGPT and, by default, Microsoft 365 Copilot.
- [What is ChatGPT?](/basics/what-is-chatgpt/): a plain-language introduction if you're starting from zero.

## Sources

1. Microsoft, "The next phase of the Microsoft-OpenAI partnership" (27 April 2026): [https://blogs.microsoft.com/blog/2026/04/27/the-next-phase-of-the-microsoft-openai-partnership/](https://blogs.microsoft.com/blog/2026/04/27/the-next-phase-of-the-microsoft-openai-partnership/)
2. OpenAI, "The next phase of the Microsoft-OpenAI partnership" (27 April 2026): [https://openai.com/index/next-phase-of-microsoft-partnership/](https://openai.com/index/next-phase-of-microsoft-partnership/)
3. CNBC, "OpenAI shakes up partnership with Microsoft, capping revenue share" (27 April 2026): [https://www.cnbc.com/2026/04/27/openai-microsoft-partnership-revenue-cap.html](https://www.cnbc.com/2026/04/27/openai-microsoft-partnership-revenue-cap.html)
4. Simon Willison, "Tracking the history of the now-deceased OpenAI Microsoft AGI clause" (27 April 2026): [https://simonwillison.net/2026/Apr/27/now-deceased-agi-clause/](https://simonwillison.net/2026/Apr/27/now-deceased-agi-clause/)
5. AI Magazine, "OpenAI Caps Microsoft Revenue Share at US$38bn in New Deal": [https://aimagazine.com/news/openai-caps-microsoft-revenue-share-at-us-38bn-in-new-deal](https://aimagazine.com/news/openai-caps-microsoft-revenue-share-at-us-38bn-in-new-deal)
6. OpenAI, "GPT-5.6 is now the preferred model in Microsoft 365 Copilot" (July 2026): [https://openai.com/index/gpt-5-6-preferred-model-microsoft-365-copilot/](https://openai.com/index/gpt-5-6-preferred-model-microsoft-365-copilot/)
7. TechCrunch, "OpenAI says GPT-5.6 is the 'preferred model' for Microsoft Copilot amid breakup chatter" (9 July 2026): [https://techcrunch.com/2026/07/09/openai-says-gpt-5-6-is-the-preferred-model-for-microsoft-copilot-amid-breakup-chatter/](https://techcrunch.com/2026/07/09/openai-says-gpt-5-6-is-the-preferred-model-for-microsoft-copilot-amid-breakup-chatter/)
8. Microsoft 365 Blog, "Expanding model choice in Microsoft 365 Copilot" (24 September 2025): [https://www.microsoft.com/en-us/microsoft-365/blog/2025/09/24/expanding-model-choice-in-microsoft-365-copilot/](https://www.microsoft.com/en-us/microsoft-365/blog/2025/09/24/expanding-model-choice-in-microsoft-365-copilot/)
9. CNBC, "Microsoft adds Anthropic model to Microsoft 365 Copilot" (24 September 2025): [https://www.cnbc.com/2025/09/24/microsoft-adds-anthropic-model-to-microsoft-365-copilot.html](https://www.cnbc.com/2025/09/24/microsoft-adds-anthropic-model-to-microsoft-365-copilot.html)
10. Microsoft, Microsoft 365 Copilot pricing for individuals, fetched 4 September 2026: [https://www.microsoft.com/en-us/microsoft-365-copilot/pricing/individuals](https://www.microsoft.com/en-us/microsoft-365-copilot/pricing/individuals)
11. Microsoft, Microsoft 365 Copilot enterprise pricing, fetched 4 September 2026: [https://www.microsoft.com/en-us/microsoft-365-copilot/pricing/enterprise](https://www.microsoft.com/en-us/microsoft-365-copilot/pricing/enterprise)
12. Microsoft Tech Community, "Act Now: Lock in Current Pricing on Microsoft 365 Copilot Business Bundles": [https://techcommunity.microsoft.com/blog/microsoft365copilotblog/act-now-lock-in-current-pricing-on-microsoft-365-copilot-business-bundles/4502628](https://techcommunity.microsoft.com/blog/microsoft365copilotblog/act-now-lock-in-current-pricing-on-microsoft-365-copilot-business-bundles/4502628)
13. OpenAI, ChatGPT Pricing: [https://chatgpt.com/pricing](https://chatgpt.com/pricing/)
14. This wiki, [AI subscription pricing 2026](/comparisons/ai-subscription-pricing-2026/), for cross-checked ChatGPT/Copilot consumer tier figures.
15. Windows Latest, "Microsoft confirms Ask Copilot is coming to the Windows 11 taskbar" (27 May 2026): [https://www.windowslatest.com/2026/05/27/microsoft-confirms-ask-copilot-is-coming-to-the-windows-11-taskbar-in-mid-2026/](https://www.windowslatest.com/2026/05/27/microsoft-confirms-ask-copilot-is-coming-to-the-windows-11-taskbar-in-mid-2026/)
16. TechCrunch, "Microsoft kills off unsuccessful AI features while merging its separate Copilot apps" (13 August 2026): [https://techcrunch.com/2026/08/13/microsoft-kills-off-unsuccessful-ai-features-while-merging-its-separate-copilot-apps/](https://techcrunch.com/2026/08/13/microsoft-kills-off-unsuccessful-ai-features-while-merging-its-separate-copilot-apps/)
17. This wiki, [OpenAI API](/tools/openai-api/): current GPT model lineup and pricing referenced throughout.
