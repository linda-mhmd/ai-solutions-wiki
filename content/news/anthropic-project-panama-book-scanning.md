---
title: "Anthropic Bought and Destroyed Millions of Books to Train Claude"
description: "Court documents reveal Anthropic's Project Panama: a program that purchased millions of physical books, scanned them, and discarded the originals. A federal judge ruled the practice legal under fair use, while a separate $1.5 billion settlement covered pirated digital books."
date: 2026-07-29
lastmod: 2026-07-30
last_updated: 2026-07-30
categories: [News]
tags: [anthropic, training-data, copyright, ai-ethics, claude]
related:
  - news/ai-copyright-litigation-2026
  - tools/claude-anthropic
  - news/model-collapse-ai-slop
---

Unsealed court documents reveal that Anthropic ran a large-scale program, internally called Project Panama, to acquire millions of physical books, scan them, and destroy the originals. A federal judge ruled in June 2025 that converting lawfully purchased print books into internal digital copies qualifies as fair use. A separate $1.5 billion settlement, finalized in July 2026, resolved claims over pirated digital books from sources like Library Genesis.

## What happened

Anthropic hired Tom Turvey, former head of partnerships for Google's book-scanning project, in February 2024. Internal documents filed in copyright litigation describe Project Panama as "our effort to destructively scan all the books in the world." The company purchased millions of books, often used and in batches of tens of thousands, from sellers including Better World Books and Britain's World of Books. Vendors then stripped the bindings, cut the pages, scanned them, and recycled the paper. A proposal cited capacity for 500,000 to 2 million books over six months. The Washington Post reported that Anthropic spent tens of millions of dollars on the operation.

In June 2025, US District Judge William Alsup found that converting lawfully purchased print books into internal digital replacements qualified as fair use on the specific record before him. Each physical copy was discarded, the format change did not increase the number of library copies, and the digital replacements were not distributed outside Anthropic. The ruling also found that using books to train language models was transformative. Because the parties later settled, the ruling was not reviewed on appeal.

The fair-use finding did not cover pirated books. The court separately found that Anthropic had downloaded over 7 million copies from Books3, Library Genesis, and Pirate Library Mirror. On 20 July 2026, a different federal judge granted final approval to a $1.5 billion settlement covering 482,460 works from those pirated collections.

A cottage industry has since emerged. ISBNdb now markets bulk physical-book acquisition to AI developers, offering to source between 1,000 and 1 million books per engagement and promoting older print as human-written material uncontaminated by AI-generated content. The identities of ISBNdb's customers and what happens to the books remain undisclosed.

## Why it matters for builders

The legal question is narrower than the headlines suggest. The Alsup ruling applies to one company's specific practice, scan a purchased copy, destroy the original, keep the digital version internal, and was not tested on appeal. It does not bless all book scanning or all training-data acquisition. The $1.5 billion piracy settlement shows that downloading copyrighted works without purchase remains risky and expensive.

For builders, the signal is that frontier labs are going to extraordinary lengths to secure high-quality, human-written training data as the open web becomes saturated with AI-generated content. Books, in Anthropic's internal framing, teach models "how to write well" instead of mimicking "low quality internet speak." If you are building your own models or fine-tuning, the legal status of your training data matters, and the line between permissible and actionable is still being drawn case by case. See [AI copyright litigation in 2026](/news/ai-copyright-litigation-2026/) for the broader landscape.

## Sources

- Washington Post, "Inside one company's secret plan to destructively scan every book in the world" (27 January 2026)
- MLQ, "What the Evidence Actually Shows About AI Companies Destroying Books" (29 July 2026): https://mlq.ai/news/what-the-evidence-actually-shows-about-ai-companies-destroying-books/
- Court filings, Bartz et al. v. Anthropic PBC (N.D. Cal.), summary judgment order (June 2025)
- Court filings, settlement approval order (20 July 2026)
- Futurism, "Anthropic Knew the Public Would Be Disgusted by How It Was Destroying Physical Books" (January 2026): https://futurism.com/future-society/anthropic-destroying-books

## Further reading

- [AI copyright litigation in 2026](/news/ai-copyright-litigation-2026/): the broader legal landscape for training data.
- [Claude and Anthropic](/tools/claude-anthropic/): the models trained on this data.
- [Model collapse and AI slop](/news/model-collapse-ai-slop/): why labs are hunting for pre-AI human-written text.
