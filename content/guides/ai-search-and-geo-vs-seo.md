---
title: "AI Search and GEO: How Generative Engines Are Changing SEO"
description: "What generative engine optimization (GEO) means, how AI assistants cite content differently from Google ranking, and practical guidance for content creators."
date: 2026-06-25
categories: [Guides]
tags: ["geo", "seo", "ai-search", "content"]
---

<figure class="bz-figure"><img src="/img/shaping-ai/eye-neural-network-notext.png" alt="Close-up of an eye with a red neural web traced across the iris, suggesting machine perception of text." loading="lazy"><figcaption>AI search engines read and re-rank text the way a model parses tokens, not the way a person scans a list of blue links.</figcaption></figure>

Search is splitting into two systems. Classic search ranks a list of links and lets you click. Generative engines, such as Google's AI Overviews, ChatGPT, Perplexity, and Claude, read across many sources and write a single synthesised answer, sometimes citing the pages they used. For anyone publishing content or building with AI, this changes both how readers find you and how a model decides to quote you.

## SEO and GEO in plain words

Search engine optimization (SEO) is the practice of structuring a web page so a search engine ranks it high in a list of results. The goal is a click: the reader sees your link, picks it, and lands on your site.

Generative engine optimization (GEO) is the practice of structuring content so an AI system includes and cites it inside a generated answer. The goal shifts from the click to the citation. The term comes from a 2024 research paper presented at ACM SIGKDD by authors from Princeton University, IIT Delhi, Georgia Tech, and the Allen Institute for AI. They defined a generative engine as a system that answers a query by generating text from multiple sources, then tested which content changes made a source more likely to appear in that answer.

A [large language model](/glossary/llm/) sits at the centre of a generative engine. Many engines also use [retrieval-augmented generation](/glossary/rag/), which fetches relevant documents at query time and feeds them to the model before it writes. That retrieval step is where your content either gets pulled in or left out.

## How a generative engine answers a query

<div class="bz-flow"><div class="bz-flow-step"><span class="bz-flow-step-tag">Step 1</span><span class="bz-flow-step-name">Query</span><span class="bz-flow-step-desc">A user asks a question in natural language, often longer than a keyword search.</span></div><div class="bz-flow-arrow">&rarr;</div><div class="bz-flow-step"><span class="bz-flow-step-tag">Step 2</span><span class="bz-flow-step-name">Retrieve</span><span class="bz-flow-step-desc">The engine searches an index or the live web and selects candidate passages.</span></div><div class="bz-flow-arrow">&rarr;</div><div class="bz-flow-step"><span class="bz-flow-step-tag">Step 3</span><span class="bz-flow-step-name">Synthesise</span><span class="bz-flow-step-desc">The model reads the passages and writes one answer in its own words.</span></div><div class="bz-flow-arrow">&rarr;</div><div class="bz-flow-step"><span class="bz-flow-step-tag">Step 4</span><span class="bz-flow-step-name">Cite</span><span class="bz-flow-step-desc">The engine links some of the sources it relied on, if the product shows citations at all.</span></div></div>

Classic ranking stops at a sorted list. The generative engine adds the synthesis and citation steps, and those steps decide whether your page is quoted, named, or ignored.

## What the data shows about traffic

The shift is measurable. Pew Research Center analysed the browsing activity of 900 US adults during March 2025. When a Google result page included an AI summary, users clicked a traditional link in 8 percent of searches, against 15 percent on pages without a summary. Clicks on the links inside the summary itself were rarer, at about 1 percent of visits. About 18 percent of all Google searches in the study produced an AI summary, and 88 percent of those summaries cited three or more sources.

The prevalence of AI Overviews moved quickly. Semrush, analysing 10 million keywords for Search Engine Land, found coverage rose from roughly 6.5 percent of queries in January 2025 to a peak near 25 percent in July, then fell back under 16 percent by November as Google recalibrated. Over the same period the mix shifted from mostly informational queries toward commercial and transactional ones.

## GEO and SEO compared

| | Classic SEO | Generative engine optimization (GEO) |
|---|---|---|
| **Goal** | Rank high, earn the click | Get included and cited in the answer |
| **Unit of competition** | A ranked link | A quoted passage or named source |
| **What the system returns** | A list of results | One synthesised answer |
| **Reader action** | Clicks through to your page | May read the answer and never click |
| **Signals that help** | Keywords, backlinks, page speed | Clear facts, quotations, statistics, citations |
| **Measurement** | Rank position, click-through rate | Citation rate, share of AI answers |

GEO does not replace SEO. The same crawlable, well-structured page can rank in classic search and be retrieved by a generative engine. The two practices overlap, but they reward partly different things.

## What the GEO research found helps

The Princeton-led study tested content changes across a benchmark of queries in many domains and measured how often a source appeared in the generated answer. Several edits raised visibility. Adding relevant quotations, citing sources, and including statistics each produced double-digit gains, and the paper reports an overall lift of up to 40 percent for sources optimised with these methods. The authors also note that the best tactic varies by domain, so results are not uniform.

These findings point to neutral, durable practices rather than tricks:

- **Answer the question early.** State the direct answer in the first few sentences, then expand. Engines tend to draw from passages that resolve the query plainly.
- **Use clear structure.** Descriptive headings, short paragraphs, and lists make passages easy to retrieve and quote.
- **Make facts citable.** Attach specific numbers, dates, and named sources to claims. A sentence with a verifiable statistic is easier for a model to lift and attribute.
- **Cite primary sources.** Link to official documentation, research papers, and original data rather than second-hand summaries. This raises the credibility of your own page as a source.
- **Keep content fresh.** Update figures and dates. Engines weight current, maintained pages, and stale numbers reduce the chance of being quoted.
- **Stay technically crawlable.** A generative engine still needs to read the page. Server-rendered, accessible HTML remains a baseline requirement.

## Things to watch and avoid

GEO is a young field, and many vendor claims outrun the peer-reviewed evidence. Treat single-number promises with caution and test on your own content. Stuffing keywords or padding with statistics that do not support the point can reduce clarity for human readers, which is the opposite of the goal. Citation behaviour also differs by product: some engines show sources prominently, others bury or omit them, and the same query can return different answers over time.

For teams building their own AI search or assistant, the same principles apply in reverse. If you run retrieval over your documents, well-structured source content with clear facts and headings improves what your system can retrieve and cite. See the [guides](/guides/) section for related implementation material.

## Further reading

- [What is a large language model?](/glossary/llm/): the model at the centre of every generative engine.
- [Retrieval-augmented generation](/glossary/rag/): how engines fetch your content before they answer.
- [Guides](/guides/): related material on building and operating AI systems.
- [GEO: Generative Engine Optimization (arXiv)](https://arxiv.org/abs/2311.09735): the original research paper and method.
- [Do people click on links in Google AI summaries? (Pew Research Center)](https://www.pewresearch.org/short-reads/2025/07/22/google-users-are-less-likely-to-click-on-links-when-an-ai-summary-appears-in-the-results/): independent click-behaviour data.

## Sources

- [arXiv: GEO: Generative Engine Optimization](https://arxiv.org/abs/2311.09735)
- [Pew Research Center: Google users are less likely to click on links when an AI summary appears](https://www.pewresearch.org/short-reads/2025/07/22/google-users-are-less-likely-to-click-on-links-when-an-ai-summary-appears-in-the-results/)
- [Search Engine Land: Google AI Overviews surged in 2025, then pulled back](https://searchengineland.com/google-ai-overviews-surge-pullback-data-466314)
- [Search Engine Land: Generative engine optimization framework introduced in research paper](https://searchengineland.com/generative-engine-optimization-framework-introduced-research-paper-435855)
