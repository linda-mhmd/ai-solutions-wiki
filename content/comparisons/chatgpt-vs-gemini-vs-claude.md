---
title: "ChatGPT vs Gemini vs Claude: Which AI Assistant to Use"
description: "What ChatGPT, Google Gemini, and Claude actually cost, what each is genuinely best at, and which one fits a student, writer, developer, researcher, or casual user in September 2026."
date: 2026-09-04
categories: [Comparisons]
tags: ["chatgpt", "gemini", "claude", "gpt", "ai-assistant", "comparison", "llm", "pricing", "subscription", "consumer-ai", "google", "openai", "anthropic"]
tools: ["openai-api", "google-gemini", "claude-anthropic"]
related:
  - comparisons/ai-subscription-pricing-2026
  - comparisons/llm-landscape-2026
  - comparisons/claude-vs-chatgpt
  - basics/what-is-chatgpt
  - tools/google-gemini
  - tools/claude-anthropic
last_verified: 2026-09-04
last_updated: 2026-09-04
lastmod: 2026-09-04
---

<figure class="bz-figure">
  <img src="/img/juggling/three-balls-rgb-convergence-notext.png" alt="Three glowing spheres in red, blue, and green with light rays converging on a black background, representing three AI assistants compared side by side." loading="lazy">
  <figcaption>ChatGPT, Gemini, and Claude are converging on the same territory — daily chat, coding help, research, images — from three different starting points.</figcaption>
</figure>

Everyone using AI day to day eventually asks the same question: ChatGPT, Gemini, or Claude? All three now sit near or above a billion monthly users, all three got real upgrades in the last few weeks, and all three are good enough that "which is better" is the wrong question. The better one is which is better *for you* — a student writing essays, a developer shipping code, a researcher digging through PDFs, or someone who just wants quick, reliable answers. This page covers what each product actually costs today, what it's strongest at, where it falls short, and who should pick what.

One naming note before the pricing: Google rebranded its enterprise cloud platform, Vertex AI, to the "Gemini Enterprise Agent Platform" in April 2026. That rebrand is about the developer/cloud product — the thing businesses use to deploy Gemini inside their own applications. It does **not** touch the consumer Gemini app or the gemini.google.com pricing this page covers; if you're comparing everyday chat assistants, ignore anything that references the "Enterprise Agent Platform" — that's a different product for a different audience. See [Google Vertex AI](/tools/google-vertex-ai/) if you actually need that side of it.

## What each one is actually best at

**ChatGPT (OpenAI)** has the largest user base of the three — OpenAI said it passed 1 billion weekly active users on 31 July 2026 [1] — and the broadest single-app feature set: Agent mode, Deep Research, built-in image generation, voice mode, a Codex coding agent, and the widest set of third-party plugins and connectors. If you want one app that does almost everything without switching tools, ChatGPT is that app, and its size means the most tutorials, community troubleshooting, and third-party integrations exist for it.

**Claude (Anthropic)** has the smallest consumer footprint but the strongest reputation among people who write or code for a living. Its instruction-following is unusually reliable for long, structured prompts, it holds up well across very long documents and codebases, and Claude Code is widely regarded as one of the best agentic coding tools available. Anthropic keeps the product surface narrow — three plans, no image generation, less ecosystem sprawl — which some people read as focus and others read as a real capability gap.

**Gemini (Google)** wins on native multimodality and ecosystem depth: one request can take a video, a PDF, and a question together, and if your life already runs on Gmail, Docs, Drive, and Android, Gemini shows up inside all of it rather than living in a separate tab. It also currently offers the largest context window an ordinary paying subscriber can actually use inside the chat app itself, not just the API — more on that below.

## Current model lineups (September 2026)

Each company ships a family of models, not one model, and the names change often enough that it's worth knowing the shape rather than memorizing a specific version.

- **OpenAI**: the **GPT-5.6** family (Sol, Terra, Luna — flagship to budget) has been the generally available default since 9 July 2026. **GPT-6 Astra** began rolling out 3 September 2026 as OpenAI's newest and most capable model — and, by OpenAI's own account, the first OpenAI model to cross the "Critical" threshold for cybersecurity capability in its internal safety framework [2][3]. The rollout has been messy: initial access went to a small vetted cohort, Sam Altman publicly apologized for the confusion, and as of this writing Astra (labeled "GPT-6 Pro" in the app) reaches Pro, Business, and Enterprise plans before Plus [4][5]. Treat Astra's exact availability as still settling.
- **Anthropic**: **Claude Sonnet 5** (GA 30 June 2026) is the mid-tier default, **Claude Opus 5** (GA 24 July 2026) is the flagship, and **Claude Fable 5.1** (GA 1 September 2026) sits above Opus for the hardest reasoning and coding work. A sibling model, **Claude Mythos 5.1**, exists but is restricted to vetted cybersecurity and biosecurity researchers — you will not encounter it as a regular subscriber [6].
- **Google**: **Gemini 3.1 Pro** is the current flagship (it superseded the earlier "Gemini 3 Pro," which is now largely retired), and **Gemini 3.8 Flash**, released 2 September 2026, is the fast workhorse tier — the fourth Flash release in under four months [7]. **Deep Think** is Google's extended-reasoning mode, reserved for the top subscription tier.

## What each one costs

Prices below are the current US consumer rates as of early September 2026, fetched directly from each vendor's own pricing page where possible [8][9][10]. All three change pricing often enough that you should treat this as a snapshot, not a permanent fact — click through and check before you buy.

| | Free | Budget | Standard | Premium |
|---|---|---|---|---|
| **ChatGPT** | $0 — unlimited text on GPT-5.6 Luna, images/voice capped, ads shown to US free users | Go, $8/mo — higher limits than Free, no Agent mode or Deep Research | Plus, $20/mo — GPT-5.6 Sol, Agent mode, Deep Research, image and voice tools | Pro, $100–$200/mo — 5x/20x Plus usage, earliest access to GPT-6 Astra |
| **Claude** | $0 — Sonnet 5 and Haiku 4.5, 200K context | *(none — no budget paid tier)* | Pro, $17/mo annual or $20/mo monthly — adds Opus 5, limited Fable 5.1, Claude Code | Max, from $100/mo — 5x or 20x Pro's usage per 5-hour session |
| **Gemini** | $0 — Gemini 3.6 Flash, limited Gemini 3.1 Pro access | AI Plus, $4.99/mo — 2x Free's limits, basic video generation | AI Pro, $19.99/mo — extended Gemini 3.1 Pro, 1M-token context, Deep Research | AI Ultra, $99.99/mo (5x) or $199.99/mo (20x) — full 3.1 Pro access, Deep Think, Project Genie |

Two things stand out. First, Claude has no cheap paid tier — you go from free straight to $17–20/month, while ChatGPT and Gemini both offer a sub-$10 middle option. Second, Gemini is the only one of the three with no mid-priced path to its best reasoning mode: Deep Think is reserved entirely for AI Ultra ($99.99+/month), while Anthropic bundles Opus into the $20/month Claude Pro plan and OpenAI puts GPT-5.6 Sol on the $20/month Plus plan. (All three vendors' top all-around tiers — AI Ultra, Claude Max, ChatGPT Pro — land in the same $100–$200 band; the gap is in what the cheaper mid-tier plans include, not in what the priciest tier costs.)

## Context window: the number that's more confusing than it looks

"Context window" gets thrown around as a single spec, but what a paying subscriber actually gets inside the chat app is not the same as what the underlying API supports, and the gap differs by vendor in a way worth knowing before you assume a bigger number automatically applies to you.

**Claude's consumer app caps out at 200,000 tokens on every plan — Free, Pro, and Max alike.** Sonnet 5, Opus 5, and Fable 5.1 all support a 1-million-token context window through the API and in Claude Code, but that larger window is not something a Pro or Max subscription unlocks inside claude.ai itself [11]. If you've heard "Claude has a million-token context" and assumed your $20/month plan includes it, it doesn't — that figure describes the developer product, not the consumer chat app.

**Gemini goes the other direction: AI Pro and AI Ultra subscribers get the full 1-million-token window inside the ordinary Gemini app**, confirmed directly on Google's own pricing page [9]. That makes Gemini, at $19.99/month, the only one of the three that hands an everyday subscriber the full context window as a native part of the product rather than a developer-only feature.

**ChatGPT's consumer context behavior is the least clearly published of the three.** OpenAI's API documents a 1.05-million-token window for GPT-5.6 [12], but the effective window inside the ChatGPT app varies by mode — the fast "instant" response is meaningfully smaller than what you get switching to a reasoning ("Thinking") mode — and OpenAI doesn't publish one clean per-tier number the way Anthropic and Google do. If long-document work inside the chat app itself is your actual use case, test it with your own documents rather than trusting either vendor's headline figure.

## Real limitations, not the marketing version

**ChatGPT's biggest practical downside is its own size and sprawl.** Six subscription tiers (Free, Go, Plus, Pro at two price points, Business, Enterprise) is harder to navigate than Claude's three or Gemini's four, and GPT-6 Astra's rollout — gated access, a CEO apology over the confusion, and a Pro-before-Plus staged release — shows OpenAI's newest capability isn't always cleanly available to whichever plan you're already paying for [4][5]. Free-tier images, voice, and file uploads stay capped even though free-tier text messaging became effectively unlimited in August 2026.

**Claude's biggest practical downside is the narrowest feature set of the three.** There is still no native image generation — Anthropic has no first-party text-to-image model, so "draw me a picture" sends a Claude user elsewhere every time. Usage limits on Free and Pro aren't published as a fixed message count either; Anthropic describes them relatively ("at least 5x more than Free") rather than in absolute terms, which makes it hard to know in advance what a given plan gets you in a busy week [13].

**Gemini's biggest practical downside is version churn and a paywalled ceiling on its best reasoning.** Four Flash releases in under four months (3.5 → 3.6 → 3.7 → 3.8) between May and September 2026 is genuinely hard to track, and the free and even AI Plus tiers run a version behind whatever Google just shipped [7][9]. Deep Think, Gemini's strongest reasoning mode, is reserved for AI Ultra — so the best version of Gemini costs $99.99 a month minimum, well above where Claude Opus or GPT-5.6 Sol sit on a $20 plan.

## Which one fits which kind of user

**Casual, everyday user.** Start free on whichever ecosystem you're already in — Gemini if your life runs on Gmail and Android, ChatGPT otherwise, since it has the largest community of tutorials and troubleshooting if you get stuck. Don't pay for anything until a free tier's limits actually bother you.

**Student.** Check the free-tier deals before paying for anything: Google is giving US college students a full free year of AI Pro (international students get a free year of AI Plus) through 31 December 2026 sign-up [14], and OpenAI is running a Back to School promotion giving eligible US students four free months of ChatGPT Plus through 31 October 2026 [15]. Anthropic offers no individual student discount at all — Claude access for students depends on your university having a campus-wide Claude for Education agreement [16]. If your school doesn't have one, Claude is the most expensive of the three for a student to reach.

**Writer.** Claude, for most people who care about prose quality — its writing tends to sound less generically "AI" and holds tone and style instructions more reliably across a long piece. ChatGPT's Canvas mode is a reasonable second choice if you also want inline image generation for the same piece of work.

**Developer.** Claude Code remains the most-cited agentic coding tool of the three, but ChatGPT's Codex and Agent mode are a legitimate alternative, especially if you're already paying for Plus for other reasons. Gemini's coding tooling (the newer Antigravity CLI, replacing Gemini CLI) is the least mature of the three as of this writing.

**Researcher.** Gemini's combination of Deep Research, native PDF/video ingestion, and the full 1M-token context window inside the app at $19.99/month is hard to beat for source-heavy work. Claude is the stronger choice specifically for synthesizing many long documents into careful, well-cited prose once you've gathered the sources.

**Nobody needs all three.** If you're paying for a subscription rather than staying free, pick based on the single task you do most — writing, coding, research, or everything-in-one-app — rather than trying to average across all of them.

## What this page can't tell you

Exact usage limits on any plan (none of the three publish a fixed message count), how GPT-6 Astra's access settles once its staged rollout finishes, and whether a given promotional student offer is still live by the time you read this — check the linked official pages directly, since all three vendors change these terms with little notice.

## Further reading

- [AI subscription pricing 2026](/comparisons/ai-subscription-pricing-2026/): the broader pricing comparison, including Microsoft 365 Copilot and Perplexity alongside these three.
- [The 2026 LLM landscape](/comparisons/llm-landscape-2026/): every other model family, for context on where these three sit in the wider market.
- [Claude vs ChatGPT](/comparisons/claude-vs-chatgpt/): the deeper enterprise/API-side comparison, for readers building on these platforms rather than chatting with them.
- [What is ChatGPT](/basics/what-is-chatgpt/), [What is an LLM](/basics/what-is-an-llm/): background if any of this is new territory.
- [Google Gemini](/tools/google-gemini/), [Claude by Anthropic](/tools/claude-anthropic/): the fuller model-lineup and pricing detail behind the tables above.
- [Google Vertex AI](/tools/google-vertex-ai/): the enterprise-cloud rebrand ("Gemini Enterprise Agent Platform") this page distinguishes from the consumer Gemini app.
- [Context window (glossary)](/glossary/context-window/): what a context window actually is and why bigger isn't always usable.
- [Astra becomes the first OpenAI model to cross the "Critical" cyber threshold](/news/openai-astra-critical-cyber-threshold/), [Google ships Gemini 3.8 Flash](/news/gemini-3-8-flash-cyber/): this wiki's coverage of the two releases referenced above.

## Sources

1. OpenAI, confirming more than 1 billion weekly active users (31 July 2026), widely reported including by [Axios](https://www.axios.com/2026/09/03/openai-astra-gpt-6-agi-brockman) and other outlets tracking OpenAI usage disclosures.
2. OpenAI, "GPT-6 Astra: A new generation of intelligence" (3 September 2026): [https://openai.com/index/gpt-6-astra/](https://openai.com/index/gpt-6-astra/)
3. CNBC, "OpenAI announces rollout of GPT-6 Astra model" (3 September 2026): [https://www.cnbc.com/2026/09/03/open-ai-astra-gpt-6-cyber.html](https://www.cnbc.com/2026/09/03/open-ai-astra-gpt-6-cyber.html)
4. Dataconomy, "OpenAI Launches GPT-6 Astra With Limited Rollout Starting Today" (4 September 2026): [https://dataconomy.com/2026/09/04/gpt-6-astra-launch-openai-limited-rollout/](https://dataconomy.com/2026/09/04/gpt-6-astra-launch-openai-limited-rollout/)
5. Simon Willison, "GPT-6 Astra" (3 September 2026), on rollout scope, pricing, and benchmark detail: [https://simonwillison.net/2026/Sep/3/gpt6-astra/](https://simonwillison.net/2026/Sep/3/gpt6-astra/)
6. Anthropic, "Introducing Claude Fable 5.1 and Claude Mythos 5.1" (1 September 2026) — see this wiki's [Fable 5.1 reaches GA, Mythos 5.1 stays gated](/news/claude-fable-5-1-mythos-5-1-ga/)
7. Google, "Introducing Gemini 3.8 Flash and 3.8 Flash Cyber" (2 September 2026) — see this wiki's [Gemini 3.8 Flash coverage](/news/gemini-3-8-flash-cyber/)
8. Anthropic, Claude pricing page, fetched 4 September 2026: [https://claude.com/pricing](https://claude.com/pricing)
9. Google, Gemini subscriptions pricing page, fetched 4 September 2026: [https://gemini.google/subscriptions/](https://gemini.google/subscriptions/)
10. Aggregated from multiple current trackers cross-checked against official OpenAI Help Center pricing detail, since chatgpt.com/pricing blocks automated fetching: [https://www.cloudzero.com/blog/how-much-does-chatgpt-cost/](https://www.cloudzero.com/blog/how-much-does-chatgpt-cost/), OpenAI Help Center, "About ChatGPT Pro tiers": [https://help.openai.com/en/articles/9793128-about-chatgpt-pro-tiers](https://help.openai.com/en/articles/9793128-about-chatgpt-pro-tiers)
11. Claude.com pricing page and Anthropic model documentation, on the 200K consumer-app ceiling versus the 1M API/Claude Code window, fetched 4 September 2026: [https://claude.com/pricing](https://claude.com/pricing), [https://platform.claude.com/docs/en/models/overview](https://platform.claude.com/docs/en/models/overview)
12. OpenAI Developer Platform, pricing and models documentation (GPT-5.6 1.05M context window), fetched 4 September 2026: [https://developers.openai.com/api/docs/pricing](https://developers.openai.com/api/docs/pricing)
13. Anthropic Support, "What is the Pro plan?": [https://support.claude.com/en/articles/8325606-what-is-the-pro-plan](https://support.claude.com/en/articles/8325606-what-is-the-pro-plan)
14. Google, "College students get 12 months of Google AI free" (August 2026): [https://blog.google/innovation-and-ai/products/gemini-app/student-offer-google-ai/](https://blog.google/innovation-and-ai/products/gemini-app/student-offer-google-ai/)
15. OpenAI Help Center, "ChatGPT Back to School offer for students": [https://help.openai.com/en/articles/20001493-chatgpt-back-to-school-offer-for-students](https://help.openai.com/en/articles/20001493-chatgpt-back-to-school-offer-for-students)
16. Anthropic, on Claude for Education as an institution-level product rather than an individual student discount, cross-checked across multiple current pricing trackers, e.g. [https://costbench.com/software/ai-chatbots/claude/discounts/](https://costbench.com/software/ai-chatbots/claude/discounts/)
17. Google, "Google Vertex AI is now the Gemini Enterprise Agent Platform" (22 April 2026) — see this wiki's [Google Vertex AI](/tools/google-vertex-ai/) for the full rebrand detail and why it doesn't touch the consumer Gemini app covered on this page.
