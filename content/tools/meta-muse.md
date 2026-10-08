---
title: "Meta Muse: The Personal AI Agent, Explained in Full"
description: "Muse is Meta's personal AI agent, launched in the US on 8 September 2026. How it works, what it costs, its Sentinel security design, the privacy controversies, why it is not available in the EU, and how it compares with OpenAI dots and the Gemini agent."
date: 2026-10-08
lastmod: 2026-10-08
last_updated: 2026-10-08
last_verified: 2026-10-08
categories: [Tools]
tags: ["meta", "muse", "muse-spark", "ai-agents", "personal-agent", "agent-security", "privacy", "gdpr", "eu-availability"]
tool_category: "AI"
related:
  - tools/meta-llama
  - news/meta-muse-first-month
  - news/ai-agent-security-roundup-september-2026
  - news/google-gemini-agent-gemini-at-work
  - news/openai-gpt-6-1-sol
  - tools/claude-cowork
  - glossary/ai-agents
---

<figure class="bz-figure">
  <img src="/img/ai-machine/weaving-conductor-split-notext.png" alt="Split image: hands weaving red laser threads on the left, a small conductor directing a glowing white tower on the right, suggesting a person directing a system that does the work." loading="lazy">
  <figcaption>Muse is the conductor's view of AI: you state the outcome, the agent does the weaving in a cloud computer you never see.</figcaption>
</figure>

**Muse** is Meta's personal AI agent. You talk to it in an app, on the web or in WhatsApp, and it carries out tasks for you on its own computer in Meta's cloud: reading and drafting email, managing your calendar, shopping, booking, researching, and, in a beta, phoning businesses. Meta launched it in the United States on **8 September 2026**. It runs on Meta's own **Muse Spark** model from Meta Superintelligence Labs, the group led by Chief AI Officer Alexandr Wang.

It is also the most-downloaded new AI app of 2026 so far, the product at the centre of Meta's AI strategy, and the subject of more security and privacy reporting in its first month than most agents get in a year. This page collects all of it in one place, says which claims come from Meta and which from reporting, and is honest about what is still unknown.

> **Status on 8 October 2026.** Available in the **United States and Canada** only, for adults (18+). **Not available in the EU, the UK, Switzerland or the rest of the EEA**, and Meta has announced no date. See [Muse and the EU](#muse-and-the-eu) below.

## At a glance

| | |
| --- | --- |
| **What it is** | A consumer personal agent, not a model. It runs on the Muse Spark model. |
| **Who makes it** | Meta Superintelligence Labs (MSL), Meta Platforms |
| **Launched** | 8 September 2026 (US); Canada on 18 September 2026 |
| **Where you use it** | iOS, Android, the web, WhatsApp, a macOS app; AI glasses announced "in the coming months" |
| **Where it works** | Its own virtual machine in Meta's cloud ("Muse Secure VM"), not on your device |
| **Price** | Free tier, plus paid tiers widely reported at $20 and $100 per month (see [Plans and pricing](#plans-and-pricing)) |
| **Age and sign-up** | 18+; reporting says a payment card is required even on the free tier |
| **EU availability** | None, no date announced |
| **Business version** | Muse for Small Business, 29 September 2026 (US) |

## Watch: Alexandr Wang on Muse, with Cleo Abram

{{< youtube-consent id="" title="Huge Conversations: Alexandr Wang on Muse (HUGE*, Cleo Abram)" channel="Cleo Abram's HUGE* channel" fallback="https://www.youtube.com/@CleoAbram" caption="Published on Cleo Abram's YouTube channel on 8 October 2026, according to launch-day reporting. The video stays on YouTube; this page links and, once the upload is confirmed, embeds it with click-to-load so nothing reaches YouTube until you press play." >}}

Science and technology journalist **Cleo Abram** opened her *Huge Conversations* interview series in 2024 with Mark Zuckerberg. On **8 October 2026** her channel published a long conversation with **Alexandr Wang**, Meta's Chief AI Officer and the person responsible for Muse. It is trending as this page is written.

What the conversation covers, according to the only summary we could find on publication day (a Chinese-language write-up, so treat paraphrases as unverified until checked against the video):

- **"The iPhone moment for agents."** Wang frames Muse as the point where agents move from programmers to everyone. He describes a split in which developers' work has already been changed by agents while most people have no idea it is happening, and presents Muse as the product meant to close that gap.
- **Trust, in layers.** Abram presses on what happens to your data when you connect accounts such as Gmail, which is the question most of the privacy reporting below is about.
- **Phone calls on your behalf.** Muse calling businesses and identifying itself. Note the [call-centre episode](#the-phone-call-beta-and-the-human-callers) below when you watch this part.
- **Memory is unsolved.** Wang reportedly acknowledges that agent memory remains an open problem across the industry, a notable admission given the [dossier reporting](#memory-and-the-dossier-reporting).
- **Safety and regulation**, including possible common ground between the US and China on AI safety.
- **Growth**: the 5 million downloads in 22 days figure, which comes from Sensor Tower estimates (see [Adoption](#adoption)).

Two practical notes. First, an interview with the executive who runs the product is a primary source for *what Meta intends*, not for how Muse behaves: weigh it against the independent reporting on this page. Second, if you are in the EU, you can watch the interview, but you cannot use the product it describes.

## What Muse is, and what it is not

Meta now uses the Muse name for a whole family, which causes real confusion:

| Name | What it is | Who it is for |
| --- | --- | --- |
| **Muse** | The personal agent this page covers | Consumers, and small businesses |
| **Muse Spark** (1.1, 1.2, 1.3) | Meta's proprietary frontier model that powers Muse | Developers, via the Meta Model API |
| **Muse Glimmer** | A 30B open-weight model, Apache 2.0 | Developers who self-host |
| **Muse Code** | A terminal coding agent, beta | Developers |
| **Muse Image**, **Muse Voice Transcribe** | Media models on Meta's developer site | Developers |
| **Muse Charm** | A pocket voice device for talking to Muse, previewed at Connect 2026 | Consumers, details later in 2026 |

The models are covered on [Meta Muse Spark and Llama](/tools/meta-llama/). This page is about the agent.

Muse is an applied [AI agent](/glossary/ai-agents/): it plans, uses tools and acts over many steps instead of answering one prompt. The difference from the Meta AI assistant that already lives in Facebook, Instagram and WhatsApp is that Muse is allowed to *do* things in your accounts, and it keeps working in the background after you close the app.

## Timeline

| Date (2026) | Event |
| --- | --- |
| 8 April | Meta Superintelligence Labs announces **Muse Spark**, its first model, closed weights |
| 9 July | Muse Spark 1.1 and the **Meta Model API** (public preview) |
| 5 August | Muse Spark 1.2 and **Muse Code** (beta) |
| 2 September | **Muse Spark 1.3**, the model Muse launches on |
| **8 September** | **Muse launches in the US** on iOS, Android, web and WhatsApp |
| 16 September | Outbound phone-call beta expanded to US businesses (per a Meta engineer's post, as reported) |
| 18 September | Muse reaches **Canada**; Meta opens Muse to developer-built connectors (reported) |
| 20 September | **Amazon blocks Muse** from shopping on Amazon.com |
| 21 September | Ars Technica reports a **zero-day in the Muse macOS app**; Meta ships a hotfix |
| 22 September | Reuters reports Meta tested **human call-centre workers** behind Muse calls; Meta rolls the test back |
| 23 to 24 September | **Connect 2026**: glasses, background voice mode, Muse's own email address, new connectors, Muse Charm |
| 29 September | **Muse for Small Business** (US) |
| 30 September | Sensor Tower: **5 million downloads** in 22 days |
| 6 October | TIME reports Muse keeps **hourly-updated profiles** of users and the people they mention |
| **8 October** | Cleo Abram publishes her interview with Alexandr Wang |

## How Muse works

The design decision that defines Muse is *where the agent runs*. Your phone is only a window. The agent itself lives in a dedicated virtual machine in Meta's cloud, so it can keep working when your phone is locked, run long tasks in the background, and use a full browser.

<div class="bz-arch">
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">You</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Muse app (iOS, Android, macOS)</span>
      <span class="bz-arch-chip">Web</span>
      <span class="bz-arch-chip">WhatsApp</span>
      <span class="bz-arch-chip">Voice, glasses later</span>
      <span class="bz-arch-chip-note">Approval prompts appear here, in the app UI, not in the chat</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Muse Secure VM</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Sealed runtime cell: agent, browser, tools</span>
      <span class="bz-arch-chip">Sentinel approval agent</span>
      <span class="bz-arch-chip">Credential service</span>
      <span class="bz-arch-chip-note">Untrusted content inside the cell, secrets and decisions outside it</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Model</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Muse Spark</span>
      <span class="bz-arch-chip">Injection classifiers outside the cell</span>
      <span class="bz-arch-chip-note">The agent cannot switch its own classifiers off</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">The world</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Email, calendar, files</span>
      <span class="bz-arch-chip">Shops and payments</span>
      <span class="bz-arch-chip">Work tools via connectors</span>
      <span class="bz-arch-chip">Phone calls (beta)</span>
      <span class="bz-arch-chip-note">Every outbound action passes Sentinel</span>
    </div>
  </div>
</div>

Meta described the security architecture in its own engineering post, "How We Built Safety Into Muse". The parts Meta states:

- **A sealed runtime cell.** The agent, its browser and its tools run inside a cell that handles all untrusted content: web pages, emails, downloaded files.
- **Secrets stay outside.** A credential service outside the cell holds your passwords and access tokens. The agent works with stand-in tokens, and the real credential is swapped in only as an approved request leaves the VM. The point: a [prompt injection](/glossary/prompt-injection/) that takes over the agent finds nothing to steal.
- **Sentinel.** A separate agent, running on the same VM but outside the cell, reviews every request the agent wants to send to the internet and decides whether to allow it, block it or ask you.
- **Approval outside the chat.** When Sentinel asks, the agent pauses and the prompt appears in the app's interface, and your answer goes straight to Sentinel. Text injected into the conversation therefore cannot forge your consent.
- **Classifiers the agent cannot reach.** Separate classifiers inspect model inputs and outputs for injection attempts, including injection hidden in web text, images and downloaded files.
- **A layered defence, by Meta's own description:** the model is trained to resist injection, the harness marks untrusted content, deterministic code checks results, and the classifier ensemble runs out of the agent's reach.
- **A bug bounty** of up to $300,000, with up to $130,000 for a prompt injection that affects a single user. The two caps are worded differently in different parts of Meta's post, so check the programme terms before relying on either figure.

Some details in circulation, such as an internal codename and the specific container runtime, appear only in third-party blogs. We have left them out.

**What this design does well.** Separating "the part that reads the internet" from "the part that holds the keys" is the right pattern, and it is the same idea this wiki recommends for any [agent with delegated access](/news/ai-agent-security-roundup-september-2026/). Putting the consent prompt outside the conversation closes a whole class of attacks.

**What it does not solve.** Meta itself says prompt injection is not solved. An agent that is tricked can still take any action Sentinel approves or that you approve out of habit, and approval fatigue is a real weakness of every confirm-each-action design. The September macOS zero-day also shows that the client on your machine is part of the attack surface, however well the cloud side is built.

## What it can do

From Meta's launch and Connect announcements, plus reporting:

- **Email and calendar**: read, triage, draft and send (sending needs your approval), schedule and reschedule. Since Connect 2026, Muse has **its own email address**, so people can write to your agent directly.
- **Shopping and payments**: search, compare and buy. Connectors announced at Connect include Walmart, Best Buy, Sephora, Wayfair, Shop Pay and PayPal. **Amazon is not available**: Amazon blocked Muse on 20 September (see below).
- **Work tools**: connectors including Notion, Granola, GitHub and Box. Developers can build their own connectors (reported from 18 September).
- **Smart home** control.
- **Background voice mode**: a voice conversation that keeps working while Muse acts. Wang has also previewed real-time video chat as "coming soon".
- **Phone calls (beta)**: booking restaurants and appointments, customer-service calls. See the next section before relying on it.
- **AI glasses**: Meta said at Connect that Muse comes to its glasses "in the coming months" and will be able to act on what the wearer is looking at.

### The phone-call beta and the human callers

Muse's outbound calling began with Meta employees in August and was expanded to US businesses in mid-September. On 22 September, Reuters and 404 Media reported, from internal documents, that Meta had tested a **"human agent layer"**: Muse could hand a call to a trained human in a call centre, who placed the call. Meta's internal testing reportedly showed success rates of 95 to 98 percent with humans in the loop, and some testers only found out a person had been involved after the call.

A vice president in Meta Superintelligence Labs called starting the test "without proper disclosures" a "miss", and Meta rolled it back. A spokesperson said Meta will only roll calling out "when it's ready and with the proper disclosures". Reporting is not clear on whether all AI calling was paused or only the human-assisted part.

Why it matters: when an agent says it acts "on your behalf", you should know whether a model or a contractor heard your request, and so should the business on the other end of the line.

## Plans and pricing

Meta's own launch announcement describes a free tier that covers "most of what people need" plus subscription plans, **without naming prices**. Launch coverage across several outlets consistently reports:

| Plan | Price (reported) | Weekly usage (reported) |
| --- | --- | --- |
| Free | $0 | about 100 million Muse tokens |
| Power | $20 per month | about 500 million Muse tokens |
| Maximum | $100 per month | about 3 billion Muse tokens |

Treat the prices as well corroborated but not stated by Meta, and the token allowances as less certain. Reporting also says a payment card is required at sign-up even for the free tier, acting as an extra age and identity check, and that there is no advertising inside Muse at launch. Muse is separate from **Meta One**, Meta's subscription bundle for its apps.

Developers do not pay Muse prices. The Muse Spark model behind it is billed per token through the Meta Model API; see [what Muse Spark costs](/tools/meta-llama/#what-muse-spark-costs).

## Muse for Small Business

Launched in the US on **29 September 2026**, a day after Meta announced its Meta Enterprise Platform. It connects to Facebook Pages, Instagram professional accounts and Meta ad accounts, and to third-party tools including Shopify, Stripe, QuickBooks, Canva, Slack, Klaviyo and Zoom, with Asana, Dropbox, Notion and Figma also listed. Owners use it to review sales and marketing, plan growth, improve ads and content, check finances and handle admin. Meta says **publishing, sending and spending still require user approval**.

The open question for any business is data: whether conversation and customer data from these connectors can be used to train Meta's models, and on what terms. Read the business terms before connecting a shop or an ad account that holds customer data.

## Adoption

- **5 million downloads in 22 days** across the US and Canada, by Sensor Tower's estimate published on 30 September. Sensor Tower says ChatGPT, Grok and Claude took 56, 103 and 492 days to reach the same mark.
- **No. 1 free app** on the US App Store by about 18 September, and No. 1 in Canada shortly after.
- **About 3 million weekly users**, as reported by The Information, and an estimate of around 700,000 daily users in late September from one analysis.
- **Heavy promotion**: Sensor Tower found Meta directed up to half of its daily house-ad impressions to the app.

All of these are third-party estimates, not Meta figures. The honest reading, which CNBC put plainly on 7 October, is that Muse has won the download race with Meta's distribution behind it and now has to become a daily habit.

## Privacy and the controversies

### Memory and the dossier reporting

On **6 October 2026**, TIME reported that Muse's internal instructions, which a researcher got the agent to hand over through chat, tell it to update hourly profiles of the user **and of the people the user mentions** in chats, messages and emails Muse has read, including how contacts met and the "tensions and alliances" in a social circle. A Meta spokesperson did not dispute the findings and said Muse remembers what users choose to share; users can view and delete memories, disconnect services and review an activity log.

Two cautions cut both ways. The finding is about the system's instructions, not a census of real profiles, and one outlet corrected an earlier version that overstated it. But people who never signed up for Muse can still be profiled by a friend's agent, which is exactly the kind of processing EU data-protection law is written about. Meta's launch materials also say sanitised interaction records can be used for training **unless you opt out**.

### Amazon blocks Muse

From **20 September 2026**, Muse users trying to shop on Amazon see a notice that "continued access by an unauthorized AI agent violates Amazon's Conditions of Use". Amazon says Meta did not tell it Muse would browse its store, that the agent does not identify itself, and that it appears to capture and store customer login credentials. Meta says Muse "has no visibility into people's passwords or payment methods". Amazon's choice of a contract-based block follows a Ninth Circuit ruling in August that went against Amazon's preliminary injunction in its case over Perplexity's shopping agent. Expect more retailers to decide, one by one, whether agents are welcome.

### The macOS zero-day

On 21 September, Ars Technica reported a flaw found by Patrick Wardle: any local process on a Mac could change undocumented Muse settings, redirect the transcription endpoint and capture the user's Muse authentication token, effectively taking over an agent with access to email, calendar, payments and more. Meta shipped a hotfix more than 12 hours after publication. Details in [AI agent security, September 2026](/news/ai-agent-security-roundup-september-2026/).

## Muse and the EU

**Muse is not available in any EU country, nor in the UK, Switzerland or the wider EEA.** App store listings in Germany, France, the Netherlands, Spain, Italy and Ireland show nothing, Meta's help centre says only that Muse is "not yet available in all locations", and Meta has published no European date. Some trackers list Mexico; we could not confirm it.

Meta has not said why. The following is analysis, not a Meta statement:

- **GDPR.** Muse processes email, calendars, payments and, per the TIME reporting, information about third parties who never agreed to anything. Training on interaction data by default with an opt-out is the model that led Meta to pause AI training on EU user content in 2024. Meta's lead EU regulator is Ireland's Data Protection Commission, which has fined Meta repeatedly; we found no DPC statement on Muse.
- **The EU AI Act.** General-purpose AI model obligations have applied since 2 August 2025, and the Article 50 transparency duties for systems that interact with people, such as making clear that a caller is an AI, apply from 2 August 2026. The human-caller episode is the kind of thing a European rollout would have to answer for.
- **Precedent.** The Meta AI assistant itself reached the EU only in March 2025, long after its US launch.

**What this means if you are in the EU:**

- You can watch the interview, read the coverage and use Muse Spark through the Meta Model API where Meta's terms allow it. You cannot use the Muse app.
- **Do not route around it with a VPN or a US account.** Beyond Meta's terms, connecting a work mailbox or calendar means handing colleagues' and customers' personal data to a service with no EU offering, no data processing agreement for your organisation and no stated EU data residency. For a company that is a GDPR problem, not a technicality.
- If you need this kind of agent in Europe today, compare the alternatives below on regional availability first: several have their own EEA restrictions too.

## How Muse compares

The autumn of 2026 brought three big "agent that works for you" launches within a month:

| | Meta Muse | OpenAI dots | Google Gemini agent | Claude Cowork |
| --- | --- | --- | --- | --- |
| **Launched** | 8 Sep 2026 | 29 Sep 2026 | 8 Oct 2026 | GA 9 Apr 2026 |
| **Aimed at** | Consumers, small businesses | Pro and business users | Enterprises | Paying Claude users |
| **Model** | Muse Spark | GPT-6 Astra | Gemini models, and Claude models | Claude models |
| **Runs where** | Cloud VM per user | Cloud computer and browser per agent | Cloud, with agent sandbox | Your desktop, now also cloud |
| **Identity** | Own email address | Works in ChatGPT, Slack, Teams | Own workspace identity and email for coworker agents | Your accounts |
| **Price** | Free tier; $20 and $100 reported | First dot included in Pro and Business Premium (reported) | Not published | Part of paid Claude plans |
| **EU** | Not available | Pro excludes EEA, Switzerland and UK (per OpenAI help centre, reported) | Private preview; regions not published | Available |

Read the table as a snapshot; every column is changing month to month. See [OpenAI's DevDay launches](/news/openai-gpt-6-1-sol/), [the Gemini agent](/news/google-gemini-agent-gemini-at-work/) and [Claude Cowork](/tools/claude-cowork/).

## For builders

- **You cannot build on Muse directly** beyond connectors. There is no public Muse agent SDK that we could find. What you can build on is **Muse Spark** through the OpenAI-compatible Meta Model API, see [Meta Muse Spark and Llama](/tools/meta-llama/).
- **Connectors are the platform play.** If you run a consumer service in the US, expect users to ask whether "Muse can do it". Decide your agent policy deliberately, as Amazon and Shopify did in opposite directions.
- **Copy the architecture, not the product.** The sealed cell, out-of-band credentials, a separate approval agent and consent prompts outside the conversation are a good template for any agent you build that holds delegated access.
- **Plan for disclosure.** If your agent calls, emails or messages people, it should say what it is. The Muse calling episode shows how fast that becomes the story.

## When to use it, and when not

**Consider Muse** if you are in the US or Canada, want a consumer agent that already lives in WhatsApp and Meta's apps, and are comfortable with Meta holding a long-running memory of your accounts.

**Hold off** if you are in the EU (it is not offered), if you would connect a work account holding other people's personal data, if your use depends on reliable phone calls with clear disclosure, or if you need Amazon. For businesses, wait for clear terms on training and retention.

## Further reading

- [Meta Muse Spark and Llama](/tools/meta-llama/): the models behind Muse, their prices and licences.
- [Muse's first month](/news/meta-muse-first-month/): the news entry for the launch month and the Wang interview.
- [AI agent security, September 2026](/news/ai-agent-security-roundup-september-2026/): the Muse macOS zero-day alongside four other agent incidents.
- [The Gemini agent](/news/google-gemini-agent-gemini-at-work/): Google's enterprise answer, announced on 8 October.
- [GPT-6.1 Sol and DevDay 2026](/news/openai-gpt-6-1-sol/): where OpenAI announced dots.
- [What are AI agents?](/glossary/ai-agents/): the concept behind all of the above.

## Sources

Meta's own pages are primary sources for what Meta states. Everything else is reporting, used for what Meta has not said, and named as such in the text. Several news sites were not reachable from our research environment on 8 October 2026; claims we could only see through search summaries are marked "reported" in the text.

- [Introducing Muse, Meta newsroom, 8 September 2026](https://about.fb.com/news/2026/09/introducing-muse-personal-ai-agent/): the launch, platforms, the Muse Spark basis and the free-plus-subscription framing without prices.
- [How We Built Safety Into Muse, Meta AI Research](https://research.meta.ai/blog/security-and-safety-for-ai-agents-our-approach-with-muse): the runtime cell, Sentinel, credential service, classifiers, approval UI and bug bounty.
- [The biggest news from Connect 2026, Meta newsroom, 24 September 2026](https://about.fb.com/news/2026/09/the-biggest-news-from-connect-2026/): glasses, voice mode, Muse's own email, connectors and Muse Charm.
- [Meta debuts Muse, Axios, 8 September 2026](https://www.axios.com/2026/09/08/meta-debuts-muse-personal-ai-agent): launch coverage and Wang's comments on the business model.
- [Meta pushes into personal AI agents, CNBC, 8 September 2026](https://www.cnbc.com/2026/09/08/meta-personal-ai-agents-public-reckoning-privacy-safety.html): the $20 and $100 tiers.
- [Everything new coming to Meta's AI agent Muse, TechCrunch, 23 September 2026](https://techcrunch.com/2026/09/23/everything-new-coming-to-metas-ai-agent-muse/): Connect announcements and the Power and Maximum plan names.
- [Muse, Meta's extraordinarily privileged AI assistant, has a serious 0-day, Ars Technica, 21 September 2026](https://arstechnica.com/security/2026/09/muse-metas-extraordinarily-privileged-ai-assistant-has-a-serious-0-day/): the macOS flaw and hotfix.
- [Meta tests Muse AI agent calls that are actually made by humans in a call center, 404 Media, September 2026](https://www.404media.co/meta-tests-muse-ai-agent-calls-that-are-actually-made-by-humans-in-a-call-center/): the human agent layer and Meta's rollback.
- [Amazon blocks Meta's Muse AI agent from its retail site, The Star (Reuters), 22 September 2026](https://www.thestar.com.my/tech/tech-news/2026/09/22/amazon-blocks-metas-muse-ai-agent-from-its-retail-site): Amazon's notice and both companies' positions.
- [Meta's Muse agent is attacking one of the economy's most profitable weak spots, CNBC, 27 September 2026](https://www.cnbc.com/2026/09/27/meta-muse-ai-personal-agent.html): the Amazon dispute in context.
- [Meta is expanding its AI agent Muse to small businesses, TechCrunch, 29 September 2026](https://techcrunch.com/2026/09/29/meta-is-expanding-its-ai-agent-muse-to-small-businesses/) and [Meta launches Muse for Small Business, CNBC, 29 September 2026](https://www.cnbc.com/2026/09/29/meta-launches-muse-for-small-business-zuckerberg-pushes-enterprise-ai.html): integrations and the approval rule.
- [Meta's Muse crosses 5 million downloads, 9to5Mac, 30 September 2026](https://9to5mac.com/2026/09/30/report-metas-muse-crosses-5-million-downloads-amid-massive-advertising-push/): the Sensor Tower estimate and comparison with ChatGPT, Grok and Claude.
- [Meta's Muse reportedly passes 3 million weekly users, The Next Web](https://thenextweb.com/news/meta-muse-3-million-weekly-users-information): weekly user estimate citing The Information.
- [Meta's Muse hits No. 1 in Canada, iPhone in Canada, 22 September 2026](https://www.iphoneincanada.ca/2026/09/22/metas-muse-hits-1-in-canada-outpaces-chatgpts-early-downloads/): the Canadian chart position.
- [Meta's Muse AI agent is building a dossier on you, TIME, 6 October 2026](https://time.com/article/2026/10/06/meta-muse-ai-agent-privacy/): the hourly profiles and Meta's response.
- [Meta's Muse assistant tops app charts. Now it needs to become a habit, CNBC, 7 October 2026](https://www.cnbc.com/2026/10/07/meta-muse-personal-ai-agents-dazzle.html): the retention question.
- [Meta Muse in Europe: not yet available, Moveros, 5 October 2026](https://moveros.dev/availability/muse-europe): app store checks across six EU countries (a third-party tracker).
- [Weibo summary of the Cleo Abram interview with Alexandr Wang, 8 October 2026](https://weibo.com/2/detail/5351734778268849): the only write-up of the interview available on publication day; secondary, unverified against the video.
- [Cleo Abram's YouTube channel](https://www.youtube.com/@CleoAbram): where the interview is published.
- [Cleo Abram, Wikipedia](https://en.wikipedia.org/wiki/Cleo_Abram): the Huge Conversations series and its 2024 Zuckerberg episode.
