---
title: "AI Content Detectors Compared: GPTZero, Turnitin, Originality.ai, Copyleaks"
description: "What independent research actually shows about false-positive rates for GPTZero, Turnitin, Originality.ai, and Copyleaks — plus current pricing and who each tool is really built for — before you trust any of them with an accusation."
date: 2026-09-04
categories: [Comparisons]
tags: ["ai-detector", "gptzero", "turnitin", "originality-ai", "copyleaks", "plagiarism-detection", "academic-integrity", "false-positive", "ai-in-education", "chatgpt-detection", "comparison"]
tools: []
related:
  - solutions/education/plagiarism-detection
  - glossary/ai-watermarking
  - glossary/ai-literacy
  - comparisons/chatgpt-vs-gemini-vs-claude
  - basics/what-is-chatgpt
last_verified: 2026-09-04
last_updated: 2026-09-04
lastmod: 2026-09-04
---

<figure class="bz-figure">
  <img src="/img/decoding-software/glass-bridge-stress-cracks-notext.png" alt="A translucent glass bridge or walkway with visible stress cracks running through it, backlit in cool blue light." loading="lazy">
  <figcaption>AI content detectors look like solid ground for an accusation. Independent testing keeps finding the same cracks.</figcaption>
</figure>

A teacher pastes an essay into GPTZero, gets a score that reads "87% likely AI-generated," and now a student has to prove a negative. That scenario plays out in classrooms every day, and it is the reason this comparison exists: unlike most "which tool should I pick" questions, getting this one wrong has landed real students in academic-misconduct hearings over essays they wrote themselves. This page covers what GPTZero, Turnitin, Originality.ai, and Copyleaks actually do, what they cost, and — because it matters more than any feature list — what independently conducted research (not vendor marketing) says about how often they're wrong.

The short version, up front: every peer-reviewed study that has tested these tools against real human writing has found meaningfully higher error rates than the vendors advertise, and the errors are not evenly distributed — they fall disproportionately on non-native English speakers and, in at least one large study, on Black students. Keep that in mind through everything below.

## What each tool is actually built for

These four did not start from the same place, and that history still shows in who uses them and how.

**GPTZero** was built for this exact problem from day one. Princeton senior Edward Tian coded the first version over winter break in January 2023, days after ChatGPT went mainstream, specifically so teachers could check student writing [1]. It has stayed closest to that original audience — GPTZero markets directly to individual educators and self-describes as used by over a million teachers and 3,500+ colleges, alongside newer expansion into hiring and publishing [2].

**Turnitin** is the incumbent. iParadigms built Turnitin as a plagiarism-matching tool in the late 1990s, long before generative AI existed, and it's now owned by Advance Publications (also the owner of Condé Nast) after a $1.75 billion acquisition in 2019 [3]. Turnitin bolted AI-writing detection onto its existing plagiarism product in April 2023, rolled out to institutional customers with less than 24 hours' notice and, initially, no way to turn it off [4]. That matters for how you should read this article: if your university uses Turnitin, you almost certainly didn't choose it — your institution licensed it, and every paper you submit runs through it whether you like it or not.

**Originality.ai** points at a different audience entirely. It markets to content marketers, publishers, and agencies who need to check freelance writers' submissions for AI use before paying for them, or scan their own site's content before it triggers a search-engine quality penalty [5]. Academic integrity isn't its core pitch — commercial content operations are.

**Copyleaks** sells to institutions and enterprises through an API rather than to individual users browsing a website. It integrates natively with the major learning-management systems (Canvas, Blackboard, Moodle, D2L, Google Classroom) and pitches itself explicitly as "built for institutions, not individuals" — the same buyer profile as Turnitin, but positioned as the more technically flexible, multilingual (30+ languages), API-first alternative [6].

## How these tools actually decide "AI or human"

All four use some version of the same underlying signal: **perplexity** (how statistically predictable each word choice is, given what came before) and **burstiness** (how much sentence length and complexity vary across a passage). Human writing tends to be less predictable and more variable; LLM output — especially from earlier, less-tuned models — tends to be smoother and more uniform. Detectors train a classifier to spot that smoothness. The core problem, covered in detail below, is that this signal doesn't measure "did an AI write this" directly — it measures "does this read like typical, unsurprising English," and there is more than one reason a human might write that way.

## The single most important fact: how wrong are these, really?

Every vendor in this category publishes an accuracy number. Turnitin's own testing puts its document-level false positive rate under 1% for submissions where more than 20% of the text is flagged as AI-written, with a sentence-level false positive rate around 4% [7]. Copyleaks claims 99.1% overall accuracy from internal testing on a million samples [6]. GPTZero cites 99% accuracy and points to an independent benchmark, RAID (Dugan et al., ACL 2024, the largest published adversarial-robustness benchmark for AI-text detectors), where it scored well against unmodified text [8][2]. These are the numbers you'll see on every one of these products' marketing pages.

Independent, peer-reviewed research tells a different story:

- **Stanford's Liang et al. (2023)**, published in *Patterns*, ran seven commercial GPT detectors against 91 TOEFL essays written by non-native English speakers and against US eighth-grade essays. Native-English essays scored near-zero false positives. The TOEFL essays — all genuinely human-written — were misclassified as AI-generated at an average rate of **61.3%** across the seven detectors, and 89 of the 91 essays (97.8%) were flagged by at least one detector [9]. The researchers' explanation: non-native writers tend toward simpler, more common vocabulary and sentence structure — lower "perplexity" — which is the exact statistical signature these tools are trained to treat as a sign of AI.
- **Weber-Wulff et al. (2023)**, published in the *International Journal for Educational Integrity* and testing 12 public tools plus Turnitin and PlagiarismCheck, found that all 14 scored below 80% overall accuracy, and only five exceeded 70% [10].
- **The Washington Post's own investigation** (Geoffrey A. Fowler, June 2023) ran 16 writing samples — a mix of human-written and AI-written text — through Turnitin and found it misjudged more than half of them, including flagging portions of a genuinely human-written student essay as AI [11].
- **Common Sense Media's 2024 national survey** of teens found a racial disparity that isn't explained by language alone: 20% of Black teens reported being falsely accused of using AI on schoolwork, compared with 10% of Latino teens and 7% of white teens [12]. The report notes this reflects some mix of detector bias and how teachers apply detector output, not a clean technical measurement — but the pattern of disproportionate false accusation is the documented finding either way.

Turnitin has pushed back on the non-native-English-bias finding specifically, publishing its own research claiming no statistically significant bias against English language learners in its tool [13] — a claim that sits directly opposite Stanford's peer-reviewed result on the same underlying question. That contradiction between vendor-funded and independent research is, itself, the most important fact in this category: you cannot take either side's number at face value, and the independent, peer-reviewed studies consistently find worse and more unevenly distributed error rates than any vendor's own marketing claims.

The consequences of this aren't hypothetical. In August 2023, Vanderbilt University disabled Turnitin's AI detector entirely, writing that if it had been active for their 2022 volume of roughly 75,000 papers at even Turnitin's own claimed 1% false-positive rate, "around 750 student papers could have been incorrectly labeled as having some of it written by AI" [14]. The University of Cambridge, Nottingham, Glasgow, Birmingham, and King's College London separately opted out of or declined to enable Turnitin's AI detector, citing reliability and false-positive concerns [15]. Most recently, the University of Southampton announced in August 2026 that it will not renew its Turnitin contract past the 2026–27 academic year at all, over a separate but related trust issue — Turnitin's proposed rights to use anonymized student submissions to improve its AI models [16].

## Pricing, September 2026

None of these tools price the same way, which makes them hard to compare directly — worth reading the fine print before you commit to any of them.

| | Free tier | Entry paid | Mid tier | Top individual/team tier |
|---|---|---|---|---|
| **GPTZero** | 10,000 words/month, permanent | Essential, ~$8.33–14.99/mo — 150,000 words/month | Premium, ~$12.99–23.99/mo — 300,000 words/month | Professional, ~$24.99–45.99/mo — 500,000 words/month, API access; custom Team/Enterprise above that [17] |
| **Turnitin** | None — institution-only, no self-serve signup | N/A — no individual purchase path | N/A | Institutional license only, roughly $2.50–5/student/year depending on size, quote-based [18] |
| **Originality.ai** | None (pay-as-you-go credits instead, $30 one-time / 3,000 credits) | Pro, $12.95–14.95/mo — 2,000 credits (≈200,000 words AI-only) | — | Enterprise, $136.58–179/mo — 15,000 credits, API access, dedicated support [19] |
| **Copyleaks** | ~10 pages/month, limited | $7.99/mo AI-only or $8.99/mo plagiarism-only (≈300,000 words) | $13.99/mo combined AI + plagiarism | Education/Enterprise — custom quote, seat- and volume-based, LMS integration [6] |

A few things stand out. **Turnitin is the only one of the four you cannot simply buy** — there's no individual signup at any price; access exists only if your school licenses it, and the per-student cost is negotiated, not published. **GPTZero and Copyleaks both have genuinely usable free tiers**; Originality.ai does not offer a recurring free tier, only pay-as-you-go credits that eventually run out. **Copyleaks and GPTZero are the cheapest self-serve entry points** for someone checking their own or a small volume of others' writing, at under $10/month.

## Who actually picks up which tool

If a student is being told to run their own paper through something before submitting, it's usually **GPTZero** — free, fast, and built for exactly that use case, though running your own paper through a detector before submission tells you nothing reliable given everything above. If a student is being **investigated** based on a detector flag, it's almost always **Turnitin**, because that's what the institution already licenses — the student had no say in the matter. **Content marketers and agencies** vetting freelance writers reach for **Originality.ai** because it's built around exactly that workflow (batch scanning, team credit-sharing, freelancer accountability). **Copyleaks** shows up wherever a school or company wants AI/plagiarism checks wired directly into existing infrastructure — an LMS, a document pipeline, or another product — rather than a standalone website someone visits.

## So — do they actually work?

Not reliably enough to be the sole basis for an accusation, and every credible independent study on this page says the same thing in different words. These tools are reasonably good at spotting *unedited* output from mainstream models on *longer* passages of text — genuinely useful as a first-pass signal. They are measurably worse than advertised at the edges that matter most: short passages, lightly edited or "humanized" AI text, and — the finding you should weigh most heavily — writing by non-native English speakers and, per Common Sense Media's data, Black students specifically. A percentage score from any of these tools is evidence to investigate, structured the same way a spam filter score is: worth a second look, never proof on its own. No detector on this page should end an academic-integrity case by itself, and several major universities have concluded exactly that and turned the tools off entirely.

## Practical guidance

**If you're a student worried about a false accusation:** keep your drafts, revision history (Google Docs' version history or Word's track changes), and any outlining or notes — that paper trail is far stronger evidence of authorship than any detector score is evidence of AI use, in either direction. If you're a non-native English speaker, know that the research specifically documents your writing as more likely to be flagged incorrectly — that's not a reason to panic, but it is a reason to keep your process evidence.

**If you're an instructor or administrator choosing a policy:** treat any single detector score as a prompt to have a conversation, not a verdict — and if your institution licenses Turnitin, know that its AI-detection feature is very likely on by default and worth actively reviewing rather than assuming it's calibrated for your student population.

**If you're a content marketer or agency vetting freelance writers:** Originality.ai is genuinely built for this workflow and reasonably priced for it, but apply the same skepticism — a flagged piece is a reason to ask a writer for their drafts or process, not to withhold payment outright.

**If you want to self-check writing before submitting anywhere:** GPTZero's or Copyleaks' free tiers are the cheapest way to get a signal, but understand you're getting a noisy signal, not a clean pass/fail — and running your own text through one of these tools doesn't establish anything reliable about how it will read to someone else's detector or institution.

**If you're picking a tool for institutional deployment:** Copyleaks' API-first, multilingual approach is worth evaluating specifically if your student or employee population includes a meaningful share of non-native English writers, given that this is precisely where every detector on this page performs worst.

## What this page can't settle for you

Whether a specific flagged document is genuinely AI-written is not something any of these tools, or this page, can tell you with certainty — that's the entire point of everything above. Pricing on all four changes without much notice; verify current rates before budgeting. And whether your institution's specific detector configuration and threshold produces the same error patterns documented in the studies above is a question only testing against your own population can answer — the published research describes averages across specific test sets, not a guarantee about any single case.

## Further reading

- [AI-enhanced plagiarism detection](/solutions/education/plagiarism-detection/): the technical architecture behind institutional detection systems, including the false-positive and due-process considerations covered from the buyer's side.
- [AI watermarking](/glossary/ai-watermarking/): the alternative approach — building detectability into AI output at generation time, rather than trying to reverse-engineer it after the fact.
- [AI literacy](/glossary/ai-literacy/): why understanding what these tools can and can't do is itself a core competency for students and educators right now.
- [ChatGPT vs Gemini vs Claude](/comparisons/chatgpt-vs-gemini-vs-claude/): the AI writing tools these detectors are trying (and often failing) to catch.
- [What is ChatGPT?](/basics/what-is-chatgpt/): background if you're new to what these detectors are actually detecting.

## Sources

1. Daily Princetonian, "Edward Tian '23 creates GPTZero, software to detect plagiarism by AI" (January 2023): [https://www.dailyprincetonian.com/article/2023/01/edward-tian-gptzero-chatgpt-ai-software-princeton-plagiarism](https://www.dailyprincetonian.com/article/2023/01/edward-tian-gptzero-chatgpt-ai-software-princeton-plagiarism)
2. GPTZero, homepage and product pages, fetched 4 September 2026: [https://gptzero.me/](https://gptzero.me/)
3. EdSurge, "Turnitin to Be Acquired by Advance Publications for $1.75B" (6 March 2019): [https://www.edsurge.com/news/2019-03-06-turnitin-to-be-acquired-by-advance-publications-for-1-75b](https://www.edsurge.com/news/2019-03-06-turnitin-to-be-acquired-by-advance-publications-for-1-75b)
4. The Register, "Anti-plagiarism tool Turnitin turns on AI-writing detection" (5 April 2023): [https://www.theregister.com/2023/04/05/turntin_plagiarism_ai/](https://www.theregister.com/2023/04/05/turntin_plagiarism_ai/); Vanderbilt University Brightspace Blog, "Guidance on AI Detection and Why We're Disabling Turnitin's AI Detector" (16 August 2023), on the sub-24-hour notice and initial lack of an opt-out: [https://www.vanderbilt.edu/brightspace/2023/08/16/guidance-on-ai-detection-and-why-were-disabling-turnitins-ai-detector/](https://www.vanderbilt.edu/brightspace/2023/08/16/guidance-on-ai-detection-and-why-were-disabling-turnitins-ai-detector/)
5. Originality.ai, "About" and pricing pages, on its content-marketer/publisher/agency positioning, fetched 4 September 2026: [https://originality.ai/about](https://originality.ai/about), [https://originality.ai/pricing](https://originality.ai/pricing)
6. Copyleaks, pricing page and product documentation on institutional/enterprise positioning, LMS integrations, and accuracy claims, fetched 4 September 2026: [https://copyleaks.com/pricing](https://copyleaks.com/pricing), [https://docs.copyleaks.com/concepts/use-cases/academic-integrity/](https://docs.copyleaks.com/concepts/use-cases/academic-integrity/)
7. Turnitin, "Turnitin's AI Writing Detection Model Architecture and Testing Protocol" white paper, on the sub-1% document-level and ~4% sentence-level false-positive figures for documents with 20%+ flagged AI content: [https://www.turnitin.com/blog/understanding-the-false-positive-rate-for-sentences-of-our-ai-writing-detection-capability](https://www.turnitin.com/blog/understanding-the-false-positive-rate-for-sentences-of-our-ai-writing-detection-capability)
8. Dugan, L., Hwang, A., Trhlík, F., et al., "RAID: A Shared Benchmark for Robust Evaluation of Machine-Generated Text Detectors," *Proceedings of the 62nd Annual Meeting of the Association for Computational Linguistics* (ACL 2024): [https://aclanthology.org/2024.acl-long.674/](https://aclanthology.org/2024.acl-long.674/)
9. Liang, W., Yuksekgonul, M., Mao, Y., Wu, E., Zou, J., "GPT detectors are biased against non-native English writers," *Patterns* 4(7) (July 2023): [https://www.cell.com/patterns/fulltext/S2666-3899(23)00130-7](https://www.cell.com/patterns/fulltext/S2666-3899(23)00130-7) — preprint: [https://arxiv.org/abs/2304.02819](https://arxiv.org/abs/2304.02819)
10. Weber-Wulff, D., Anohina-Naumeca, A., Bjelobaba, S., et al., "Testing of detection tools for AI-generated text," *International Journal for Educational Integrity* 19, 26 (2023): [https://edintegrity.biomedcentral.com/articles/10.1007/s40979-023-00146-z](https://edintegrity.biomedcentral.com/articles/10.1007/s40979-023-00146-z)
11. The Washington Post, Geoffrey A. Fowler, "Turnitin says its AI cheating detector isn't always reliable, but it might still flag your work" (2 June 2023): [https://www.washingtonpost.com/technology/2023/06/02/turnitin-ai-cheating-detector-accuracy/](https://www.washingtonpost.com/technology/2023/06/02/turnitin-ai-cheating-detector-accuracy/)
12. Common Sense Media, "The Dawn of the AI Era: Teens, Parents, and the Adoption of Generative AI at Home and School" (September 2024), on the 20%/10%/7% racial disparity in false AI-use accusations: [https://www.commonsensemedia.org/sites/default/files/research/report/2024-the-dawn-of-the-ai-era_final-release-for-web.pdf](https://www.commonsensemedia.org/sites/default/files/research/report/2024-the-dawn-of-the-ai-era_final-release-for-web.pdf); reported independently by Education Week, "Black Students Are More Likely to Be Falsely Accused of Using AI to Cheat" (September 2024): [https://www.edweek.org/technology/black-students-are-more-likely-to-be-falsely-accused-of-using-ai-to-cheat/2024/09](https://www.edweek.org/technology/black-students-are-more-likely-to-be-falsely-accused-of-using-ai-to-cheat/2024/09)
13. Turnitin, "New research: Turnitin's AI detector shows no statistically significant bias against English language learners": [https://www.turnitin.com/blog/new-research-turnitin-s-ai-detector-shows-no-statistically-significant-bias-against-english-language-learners](https://www.turnitin.com/blog/new-research-turnitin-s-ai-detector-shows-no-statistically-significant-bias-against-english-language-learners)
14. Vanderbilt University Brightspace Blog, "Guidance on AI Detection and Why We're Disabling Turnitin's AI Detector" (16 August 2023), on the ~750-paper estimate at Turnitin's own claimed false-positive rate against Vanderbilt's 2022 submission volume: [https://www.vanderbilt.edu/brightspace/2023/08/16/guidance-on-ai-detection-and-why-were-disabling-turnitins-ai-detector/](https://www.vanderbilt.edu/brightspace/2023/08/16/guidance-on-ai-detection-and-why-were-disabling-turnitins-ai-detector/)
15. Reporting on UK Russell Group universities opting out of or declining to enable Turnitin's AI detector (Cambridge, Nottingham, Glasgow, Birmingham, King's College London), 2023–2024: [https://www.genutext.ai/uk-university-ai-detection-policies](https://www.genutext.ai/uk-university-ai-detection-policies); The Register, "Anti-plagiarism tool Turnitin turns on AI-writing detection" (5 April 2023): [https://www.theregister.com/2023/04/05/turntin_plagiarism_ai/](https://www.theregister.com/2023/04/05/turntin_plagiarism_ai/)
16. Times Higher Education, "Southampton dumps Turnitin over use of students' work to train AI" (19 August 2026): [https://www.timeshighereducation.com/news/southampton-dumps-turnitin-over-use-students-work-train-ai](https://www.timeshighereducation.com/news/southampton-dumps-turnitin-over-use-students-work-train-ai)
17. GPTZero, pricing page, cross-checked against independent pricing trackers for exact current tier amounts (chatgpt.com-style bot-blocking made direct primary fetch partial), fetched 4 September 2026: [https://gptzero.me/pricing](https://gptzero.me/pricing)
18. Turnitin does not publish per-student pricing; range aggregated from institutional contract disclosures and pricing trackers, fetched 4 September 2026: [https://www.edusageai.com/blogs/turnitin-pricing-for-teachers-and-schools-in-2026-what-you-can-actually-buy](https://www.edusageai.com/blogs/turnitin-pricing-for-teachers-and-schools-in-2026-what-you-can-actually-buy) — treat as a third-party estimate, not a vendor-published figure.
19. Originality.ai, pricing page, fetched 4 September 2026: [https://originality.ai/pricing](https://originality.ai/pricing)
