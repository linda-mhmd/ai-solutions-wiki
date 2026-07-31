---
title: "AI in the Real World: Successes, Failures, and What They Teach"
description: "The biggest real AI deployments of 2024 to 2026, wins and failures, biggest companies first. Every number labeled vendor-reported or independently verified, with a primary source, plus the patterns that separate success from failure."
date: 2026-06-23
categories: [Guides]
tags: ["use-cases", "case-studies", "enterprise-ai", "failures", "roi", "trends", "risk", "intermediate"]
tools: []
related:
  - guides/history-of-it
  - guides/service-lifecycle-and-deprecation
  - guides/reading-technology-trends
  - guides/software-licensing-and-vendor-lock-in
  - news/deepfake-fraud-epidemic-2026
  - history/mata-v-avianca-ai-hallucinations-legal
last_updated: 2026-07-30
---

Most AI writing is either a press release or a panic. This guide is neither. It collects the biggest real AI deployments from 2024 to 2026, the wins and the failures, and grades each one by how trustworthy the evidence is. The single most useful habit when reading any AI claim is to ask two questions: who is the source, and was it independently checked? Throughout this page, every number is tagged **(vendor-reported)** when it comes from the company that benefits from it, or **(independently verified)** when it comes from a court, a regulator, a peer-reviewed study, or an audited filing. Treat the second kind as far stronger than the first.

<figure class="bz-figure">
  <img src="/img/enterprise-dark/crowd-watching-red-flame-notext.png" alt="Silhouettes at a railing watching a glowing red AI system below. Real AI outcomes are judged by the people who depend on them, not by the launch announcement." loading="lazy">
  <figcaption>An AI system is judged by what it does in production, not by what its launch post claims. This page separates the two.</figcaption>
</figure>

## The hype-to-reality arc

Nearly every big AI story follows the same shape. Learn the shape and you can place any new headline on it.

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Stage 1</span>
    <span class="bz-flow-step-name">Announcement</span>
    <span class="bz-flow-step-desc">A company publishes an impressive metric. It is vendor-reported and rarely audited.</span>
  </div>
  <div class="bz-flow-arrow">&rarr;</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Stage 2</span>
    <span class="bz-flow-step-name">Adoption</span>
    <span class="bz-flow-step-desc">Others deploy on the strength of the claim, often before evidence exists.</span>
  </div>
  <div class="bz-flow-arrow">&rarr;</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Stage 3</span>
    <span class="bz-flow-step-name">Measurement</span>
    <span class="bz-flow-step-desc">Independent studies, regulators, or real use test the claim.</span>
  </div>
  <div class="bz-flow-arrow">&rarr;</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Stage 4</span>
    <span class="bz-flow-step-name">Outcome</span>
    <span class="bz-flow-step-desc">The win holds, gets revised down, or reverses. This is the part that matters.</span>
  </div>
</div>

## The biggest successes

Ordered with the most independently verified evidence first, because that is the evidence you can trust.

### Independently verified wins

**DeepMind AlphaFold predicted 200M+ protein structures (independently verified).** AlphaFold's structure database expanded known protein structures roughly 200-fold to over 200 million, and is used by more than 2 million researchers. Demis Hassabis and John Jumper won the [2024 Nobel Prize in Chemistry](https://www.nobelprize.org/prizes/chemistry/2024/press-release/) for it. This is the clearest large-scale scientific AI win, validated by citations, patents, and a Nobel rather than a marketing page.

**AI-supported mammography found ~29% more cancers (independently verified).** The Swedish MASAI randomized trial of about 106,000 women found that AI-supported screening detected roughly 29% more cancers while cutting radiologist reading workload by about 44%, published in [The Lancet Digital Health](https://www.thelancet.com/journals/landig/article/PIIS2589-7500(24)00267-X/fulltext). It kept a human radiologist as the final reader, which is a recurring feature of durable healthcare AI.

### Vendor-reported wins (strong, but unaudited)

**Klarna's AI assistant did "the work of 700 agents" (vendor-reported, later partly reversed).** Klarna and OpenAI said the assistant handled 2.3 million chats in its first month, cut resolution time from 11 minutes to under 2, and was on track for about $40M in profit improvement, per [Klarna's press release](https://www.klarna.com/international/press/klarna-ai-assistant-handles-two-thirds-of-customer-service-chats-in-its-first-month/). Read this one with its sequel below: in 2025 Klarna said it cut too far and began rehiring humans.

**Salesforce Agentforce resolves ~75% of internal support autonomously (vendor-reported).** Salesforce reports its own help portal handled over 1 million conversations a year at roughly a 75% autonomous resolution rate, per the [Salesforce blog](https://www.salesforce.com/blog/support-requests-agentforce/). It is a credible "dogfooding" example, but the numbers are the vendor's own.

**Anthropic's Claude Code grew from $0 to about $8B run-rate in under a year (vendor-reported).** Anthropic reports Claude Code reached roughly $1B annualized within about six months of launch and around $8B by mid-2026, and that 80%+ of code merged to production at Anthropic in May 2025 was Claude-authored, per [Anthropic's Series G announcement](https://www.anthropic.com/news/anthropic-raises-30-billion-series-g-funding-380-billion-post-money-valuation). Treat the 80% figure as a best case from a company using its own tool.

**GitHub Copilot made developers 55% faster on a benchmark task (vendor-reported, scope caveat).** A randomized study by GitHub authors found Copilot users completed a specific task (building an HTTP server) about 55.8% faster, published on [arXiv](https://arxiv.org/abs/2302.06590). The design was randomized, which is good, but the task was a greenfield toy, not maintenance of a mature codebase. See the contradicting independent study below.

**Other notable vendor-reported wins.** JPMorgan's COIN reportedly reviews commercial loan contracts and saves around 360,000 lawyer hours a year (a [widely cited](https://www.digitaldefynd.com/IQ/jp-morgan-using-ai-case-study/) but aging 2017 figure). Mastercard says generative AI lifts fraud detection by about 20% on average, scoring transactions in under 50 milliseconds, per [CNBC](https://www.cnbc.com/2024/02/01/mastercard-launches-gpt-like-ai-model-to-help-banks-detect-fraud.html). Insilico Medicine reported a positive Phase IIa topline for an AI-designed drug for idiopathic pulmonary fibrosis, per [Insilico](https://insilico.com/news/tnik-ipf-phase2a) (early-stage, vendor topline). Moderna deployed 750+ custom GPTs across the company, per [OpenAI's case study](https://openai.com/index/moderna/) (adoption, not audited P&L).

## The biggest failures and reversals

This is the half of the story your competitors leave out. Each one is a lesson.

**Klarna and Commonwealth Bank reversed AI-for-headcount cuts (independently verified).** Klarna's CEO told Bloomberg the company "went too far," quality dropped, and it began rehiring human agents, per [Fortune](https://fortune.com/2025/05/09/klarna-ai-humans-return-on-investment/). Commonwealth Bank of Australia cut 45 support roles citing a bot that "reduced calls by 2,000 a week," then admitted an "error" and reinstated the workers after the union showed call volumes were actually rising, per [Bloomberg](https://www.bloomberg.com/news/articles/2025-08-21/commonwealth-bank-reverses-job-cuts-decision-over-ai-chatbots). Lesson: cutting humans before quality is proven gets reversed in public.

**AI tools made experienced developers 19% slower (independently verified).** In a randomized trial by the nonprofit METR, 16 experienced open-source developers working in mature repositories with Cursor and Claude were 19% slower with AI, even though they predicted a 24% speedup. The time went into verifying unreliable output. Published on [arXiv](https://arxiv.org/abs/2507.09089). Lesson: the productivity feeling and the productivity fact can point in opposite directions.

**Builder.ai collapsed; its "AI" allegedly relied on about 700 human engineers (alleged, under investigation).** The Microsoft-backed startup once valued near $1.5B went insolvent in 2025 amid reports of revenue round-tripping and human-powered "AI," per [TechCrunch](https://techcrunch.com/2025/05/20/once-worth-over-1b-microsoft-backed-builder-ai-is-running-out-of-money/). The fraud allegations are not yet adjudicated. Lesson: "AI" branding can hide outsourced labor.

**Zillow's home-buying algorithm lost over $500M (independently verified).** Zillow's pricing model overpaid as the market turned, forcing a $304M inventory write-down, the shutdown of Zillow Offers, and roughly 2,000 job cuts, per Zillow's own [SEC filing](https://www.sec.gov/Archives/edgar/data/0001617640/000161764021000101/exhibit991.htm). Lesson: a model trained on one market regime breaks when the regime shifts.

**IBM Watson for Oncology was abandoned after $62M (independently verified).** A partnership with MD Anderson cost over $62M, never integrated with the hospital's records system, and was shelved without treating a patient outside Houston, per [IEEE Spectrum](https://spectrum.ieee.org/how-ibm-watson-overpromised-and-underdelivered-on-ai-health-care). Lesson: the canonical case of AI overpromising in healthcare.

**Amazon's "Just Walk Out" and McDonald's drive-thru AI were pulled (independently reported).** Amazon's cashierless checkout reportedly relied on around 1,000 reviewers in India and was dropped from Fresh grocery stores, per the [Washington Times](https://www.washingtontimes.com/news/2024/apr/4/amazons-just-walk-out-stores-relied-on-1000-people/) (Amazon disputes the framing). McDonald's ended its IBM voice-ordering test after viral errors, per [CNBC](https://www.cnbc.com/2024/06/17/mcdonalds-to-end-ibm-ai-drive-thru-test.html). Lesson: "autonomous" often hides a human, and narrow tasks still fail below a high accuracy bar.

**Air Canada was held liable for its chatbot's wrong advice (independently verified).** A tribunal rejected the airline's argument that its chatbot was a separate entity and ordered it to honor a policy the bot invented, per [McCarthy Tetrault](https://www.mccarthy.ca/en/insights/blogs/techlex/moffatt-v-air-canada-misrepresentation-ai-chatbot). Lesson: you own whatever your AI tells a customer.

**Deloitte refunded a government over AI-fabricated citations (independently reported).** A paid report for the Australian government contained nonexistent references and a fabricated court quote produced with a language model; Deloitte refunded part of the fee, per [Fortune](https://fortune.com/2025/10/07/deloitte-ai-australia-government-report-hallucinations-technology-290000-refund/). Lesson: hallucinations reach paid professional deliverables. Verify every citation.

**Cruise hid a pedestrian-dragging incident and shut down (independently verified).** After its robotaxi dragged a pedestrian about 20 feet, Cruise filed a misleading report, paid a $500K federal penalty, lost its permits, and was folded into GM, per the [US Department of Justice](https://www.justice.gov/usao-ndca/pr/cruise-admits-submitting-false-report-influence-federal-investigation-and-agrees-pay). Lesson: concealing the failure ended the company, not the crash alone.

**A deepfake video call cost engineering firm Arup about $25.6M (independently reported).** An employee joined a video call where every other participant was an AI deepfake of company executives, then made 15 transfers, per [CNN](https://www.cnn.com/2024/05/16/tech/arup-deepfake-scam-loss-hong-kong-intl-hnk). Lesson: live video and voice are no longer proof of identity. Verify large transfers out of band. See [deepfake fraud epidemic 2026](/news/deepfake-fraud-epidemic-2026/) for the broader $3.7 billion problem.

## The systemic reality: most pilots do not pay off

The single most important number for anyone planning an AI project: an [MIT report](https://fortune.com/2025/08/18/mit-report-95-percent-generative-ai-pilots-at-companies-failing-cfo/) found that about **95% of enterprise generative-AI pilots showed no measurable profit-and-loss impact**, despite $30B to $40B invested (independent, though its method has been debated). The same study found that buying or partnering succeeded roughly twice as often as building in-house, and that the biggest returns came from back-office automation, not the customer-facing projects that attract the most budget. This is the backdrop against which every success story above should be read.

## What separates a win from a failure

The pattern across all of this is consistent.

| Factor | AI wins look like | AI failures look like |
|---|---|---|
| **Task type** | Narrow, with a clear correct answer | Open-ended, no ground truth |
| **Human role** | Human in the loop, AI assists | Full replacement, no fallback |
| **Where value lands** | Back-office and operations | Customer-facing flash |
| **Build vs buy** | Buy or partner, proven tools | Big in-house bet, unproven |
| **Validation** | Independent or peer-reviewed | Vendor metric, unaudited |
| **Failure handling** | Reversible, monitored | Concealed, no rollback |

## How to use this page

When you read the next big AI announcement, run it through the arc. Is the number vendor-reported or independently verified? Is the task narrow with a clear answer, or open-ended? Is a human still in the loop? Is there a fallback if it fails? The companies that got burned skipped these questions. The ones that succeeded, quietly, almost always answered yes to the boring ones.

This page is a living snapshot and will be updated as outcomes change. For the longer arc of why technologies rise and fade, see [the history of IT](/guides/history-of-it/) and [how technology dies](/guides/service-lifecycle-and-deprecation/). For where the claims come from in the first place, see [how to read technology trends](/guides/reading-technology-trends/).

## Further reading

- [Did big tech lay off workers because AI replaced them?](/news/big-tech-ai-layoffs-2026/): what Meta's and Amazon's own statements say, versus the viral version.
- [How to read technology trends](/guides/reading-technology-trends/): Gartner, the hype cycle, and telling signal from noise.
- [How technology dies: the service lifecycle](/guides/service-lifecycle-and-deprecation/): why even successful tools fade, and how to plan for it.
- [Software licensing and vendor lock-in](/guides/software-licensing-and-vendor-lock-in/): the contract risks behind the products in this page.
- [The History of IT](/guides/history-of-it/): the full arc of hardware, software, cloud, and AI.
- [Mata v. Avianca and AI hallucinations in legal filings](/history/mata-v-avianca-ai-hallucinations-legal/): the landmark case and the 1,000+ incidents that followed.
- [Deepfake fraud epidemic](/news/deepfake-fraud-epidemic-2026/): the $3.7 billion problem.
- [Stanford HAI AI Index](https://hai.stanford.edu/ai-index/2025-ai-index-report): an independent annual measurement of AI adoption and capability.
- [MIT report on enterprise GenAI pilots](https://fortune.com/2025/08/18/mit-report-95-percent-generative-ai-pilots-at-companies-failing-cfo/): the 95% no-P&L-impact finding in context.
- [METR study on AI and developer productivity](https://arxiv.org/abs/2507.09089): the randomized trial that measured a slowdown.
