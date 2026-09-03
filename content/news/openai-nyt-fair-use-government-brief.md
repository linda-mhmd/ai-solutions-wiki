---
title: "DOJ Backs OpenAI's Fair-Use Defense Against the New York Times"
description: "The US Department of Justice filed a statement of interest on 1 September 2026 in Manhattan federal court arguing that training LLMs on copyrighted text is generally fair use, reportedly the first time the federal government has taken a position in the wave of AI-training copyright suits."
date: 2026-09-01
lastmod: 2026-09-03
categories: [News]
tags: [openai, copyright, litigation, fair-use, regulation, new-york-times]
related:
  - news/ai-copyright-litigation-2026
  - news/us-ai-policy-preemption-2026
  - guides/ai-regulatory-compliance-checklist
---

The US Department of Justice filed a "statement of interest" on 1 September 2026 in the Southern District of New York, arguing that training large language models on copyrighted text is generally fair use — siding with OpenAI in its long-running copyright suit brought by the New York Times and other news publishers. Multiple outlets reported it as apparently the first time the federal government has formally weighed in on the broader wave of AI-training copyright litigation.

## What happened

The 20-page brief was filed in *In re: OpenAI, Inc. Copyright Infringement Litigation* (S.D.N.Y., No. 1:25-md-03143, before Judge Sidney Stein) — the multidistrict litigation that absorbed the Times' original suit (filed as 1:23-cv-11195 in December 2023) along with dozens of other publisher and author suits against OpenAI and Microsoft when it was consolidated in April 2025. The Times case remains the flagship matter within that docket, one of well over 100 AI-training copyright suits filed against AI developers since the Times sued. A "statement of interest" is a filing federal agencies use to put the government's position on the record without joining a case as a party — it is not a ruling, and it does not resolve the underlying lawsuit.

The DOJ's core argument is that LLM training does not reproduce or distribute the works it learns from; instead it uses them to build generalized reasoning and language ability, a process the brief characterizes as "extraordinarily transformative" under fair-use doctrine. The filing frames the stakes in national terms, stating that "the United States has a strong interest in continuing to develop a robust and competitive artificial intelligence industry that sets the standard for the practice and procedure of AI use globally," and warning that "constraining LLM development under a misunderstanding of fair use doctrine would thwart such creative and scientific progress while hindering American prosperity." It also invokes national security, arguing that ceding ground on AI development gives "competitive advantage to foreign adversaries." Reporting indicates the government limited its argument specifically to the act of training on works, leaving separate questions — how training data was acquired and stored, and whether outputs reproduce protected expression — open.

A New York Times spokesperson, Graham James, pushed back: "Both AI and creators can thrive — AI companies simply need to pay fairly for the content that makes their products possible, as copyright law requires." Counsel for another publisher plaintiff in a related suit, Steven Lieberman, called the government's position inconsistent with "the copyright clause of the United States Constitution, which was authored by our founders in order to protect and incentivize the creation of original works."

This wiki's [prior coverage of the case](/news/ai-copyright-litigation-2026/) tracked a separate development in the same docket — the Times' July 2026 motion to sanction OpenAI over deleted ChatGPT logs — which remains unresolved and is unaffected by this filing.

## Why it matters for builders

A statement of interest carries no binding legal weight — Judge Stein is free to disregard it, and the fair-use question in this case (and well over 100 others like it) is still unsettled. Nothing here changes what's legally safe today: provenance of training data, licensing terms, and retention practices remain the same open exposure they were before this filing, as covered in the [AI regulatory compliance checklist](/guides/ai-regulatory-compliance-checklist/).

What is new is a signal of executive-branch posture. This is reportedly the first time the federal government has taken a side in the copyright fights spanning authors, publishers, music labels, and news organizations against AI developers, and it echoes the administration's broader push toward a permissive federal AI policy, including its effort to [preempt state AI regulation](/news/us-ai-policy-preemption-2026/). For builders and legal teams tracking litigation risk, the brief is a data point about where federal policy leans, not a safe harbor — treat "training is fair use" as still an open bet in front of the courts, and keep watching Judge Stein's docket rather than this filing for the outcome that will actually matter.

## Sources

1. TechCrunch, "US government sides with OpenAI on issue of training LLMs on copyrighted material": [https://techcrunch.com/2026/09/02/u-s-government-sides-with-openai-on-issue-of-training-llms-on-copyrighted-material/](https://techcrunch.com/2026/09/02/u-s-government-sides-with-openai-on-issue-of-training-llms-on-copyrighted-material/)
2. Associated Press (via Boston Globe), "Trump administration backs OpenAI in New York Times' copyright fight": [https://www.bostonglobe.com/2026/09/02/business/justice-department-new-york-times-openai/](https://www.bostonglobe.com/2026/09/02/business/justice-department-new-york-times-openai/)
3. Bloomberg Law, "Trump Administration Backs OpenAI in NY Times Copyright Suit": [https://news.bloomberglaw.com/ip-law/trump-administration-backs-openai-in-ny-times-copyright-suit](https://news.bloomberglaw.com/ip-law/trump-administration-backs-openai-in-ny-times-copyright-suit)
4. PYMNTS, "DOJ Sides With OpenAI Against the NY Times in High-Stakes Copyright Case": [https://www.pymnts.com/legal/2026/doj-sides-with-openai-against-the-ny-times-in-high-stakes-copyright-case](https://www.pymnts.com/legal/2026/doj-sides-with-openai-against-the-ny-times-in-high-stakes-copyright-case)
5. New York Daily News (via Yahoo News), "Trump Justice Department weighs in on OpenAI copyright case, citing national security": [https://www.yahoo.com/news/politics/articles/trump-justice-department-weighs-openai-233400177.html](https://www.yahoo.com/news/politics/articles/trump-justice-department-weighs-openai-233400177.html)
6. *In re: OpenAI, Inc. Copyright Infringement Litigation* docket, the consolidated MDL docket where the DOJ statement of interest was filed (S.D.N.Y., No. 1:25-md-03143): [https://www.courtlistener.com/docket/69879510/in-re-openai-inc-copyright-infringement-litigation/](https://www.courtlistener.com/docket/69879510/in-re-openai-inc-copyright-infringement-litigation/)
7. NYT v. Microsoft and OpenAI docket, the Times' original member case now consolidated into the MDL above (S.D.N.Y. 1:23-cv-11195): [https://www.courtlistener.com/docket/68117049/the-new-york-times-company-v-microsoft-corporation/](https://www.courtlistener.com/docket/68117049/the-new-york-times-company-v-microsoft-corporation/)

## Further reading

- [AI copyright litigation broadens in 2026](/news/ai-copyright-litigation-2026/): the sanctions motion and wider docket in this same case, plus parallel suits against Anthropic and Perplexity.
- [The US moves to preempt state AI laws](/news/us-ai-policy-preemption-2026/): the administration's parallel push for a permissive federal AI policy.
- [AI regulatory compliance checklist](/guides/ai-regulatory-compliance-checklist/): how to manage training-data provenance and records while the fair-use question stays open.
