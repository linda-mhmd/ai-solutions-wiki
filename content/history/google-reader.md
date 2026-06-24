---
title: "Google Reader (2005 to 2013)"
description: "A web-based RSS and Atom feed aggregator that let people follow blogs and news in one place, and whose shutdown became the textbook example of a beloved product being killed."
date: 2026-06-23
categories: [History]
tags: [computing-history, google-reader, rss, atom, feed-aggregator, web, content]
related:
  - explore/it-timeline
  - explore/galaxy
  - history/http-html
  - history/xml
  - history/javascript
faqs:
  - question: "What was Google Reader?"
    answer: "Google Reader was a web application that collected updates from many websites in one place. It used RSS and Atom feeds, which are machine-readable files that sites publish when they post new content. You added the feeds you cared about, and Reader checked them and showed every new item in a single unified list. Google launched it through Google Labs on 7 October 2005 and shut it down on 1 July 2013."
  - question: "Why did Google shut down Google Reader?"
    answer: "Google said it was retiring Reader because usage had declined and it wanted to focus its resources on fewer products. The announcement came on 13 March 2013, and the service closed on 1 July 2013. Many users disagreed strongly, since Reader was central to how they followed the web. The shutdown drew petitions and heavy press coverage, and it became a lasting symbol of a popular product being discontinued by its owner."
  - question: "What can I use instead of Google Reader?"
    answer: "Several feed readers grew to fill the gap. Feedly, Inoreader, The Old Reader, NewsBlur, and self-hosted options like FreshRSS and Tiny Tiny RSS all read the same RSS and Atom feeds. They import your old subscription list through a standard file called OPML, so moving between readers is straightforward. RSS itself never went away, so the core technology behind Reader still works everywhere today."
---

Google Reader was a web-based aggregator for RSS and Atom feeds. It gathered new posts from blogs and news sites into one unified reading list, so you followed many sources without visiting each one. Google launched it on 7 October 2005 and shut it down on 1 July 2013, and that shutdown became a landmark example of a loved product being killed.

<figure class="bz-figure"><img src="/img/enterprise-dark/gear-lens-dark-red-notext.png" alt="A heavy industrial gear sits behind a dark red lens in low light, suggesting a machine that quietly watches and focuses many inputs into one view. This mirrors how Google Reader polled many feeds and focused them into a single stream." loading="lazy"><figcaption>Google Reader worked like a focusing lens, pulling scattered web updates into one steady stream you could read in order.</figcaption></figure>

## What it was

Before feed readers, keeping up with many sites meant visiting each one to check for new posts. That wasted time, because most pages had not changed since your last visit. Sites began publishing feeds to solve this. A feed is a machine-readable file, written in RSS or Atom format, that lists a site's latest content.

Google Reader read those feeds for you. You added the addresses of sites you wanted to follow. Reader checked each feed on a schedule, found new items, and showed them in one list, newest first. You marked items as read, starred favourites, and organised feeds into folders.

Think of it as a personal newspaper assembled from sources you chose. You pick the columns and writers you trust. A clipping service then scans every publication, cuts out only the new articles from your list, and hands you one tidy bundle. You never buy each paper or scan pages you have already seen.

Reader also added social features. You could share items publicly and follow what friends shared. For many people, that turned a private reading tool into a small network for passing links around.

<div class="bz-flow">
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Step 1</span><span class="bz-flow-step-name">Subscribe</span><span class="bz-flow-step-desc">You add the RSS or Atom feed address of a site you want to follow.</span></div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Step 2</span><span class="bz-flow-step-name">Poll</span><span class="bz-flow-step-desc">Reader fetches each feed on a schedule and looks for new items.</span></div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Step 3</span><span class="bz-flow-step-name">Aggregate</span><span class="bz-flow-step-desc">It merges new items from every feed into one unified list.</span></div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Step 4</span><span class="bz-flow-step-name">Read</span><span class="bz-flow-step-desc">You scan, star, share, and mark items read in your browser.</span></div>
</div>

## Why it mattered

Google Reader made following the open web efficient for ordinary people. The technology behind it, RSS and Atom, existed before Reader. Reader brought it to a wide audience with a clean, fast interface and free access. At its peak it was the most widely used feed reader by a large margin.

It shaped how writers and publishers worked. Bloggers measured subscribers in Reader. Newsrooms watched their feed counts. A healthy feed audience meant readers came back without depending on a search engine or a homepage visit. Reader rewarded steady, independent publishing.

It also seeded an ecosystem. Many apps were built on top of Reader's data, using it as a sync engine that kept your read state consistent across devices. Mobile clients let Reader feed into phones and tablets. Reader became quiet infrastructure for following the web.

The shutdown mattered as much as the product. When Google announced the closure on 13 March 2013, the reaction was loud. Petitions gathered hundreds of thousands of signatures. Writers argued that a free, dominant product had crowded out paid rivals and then vanished. Reader became the standard cautionary tale about depending on a single company's free service.

## How it connects to AI today

The core idea behind Reader, structured feeds that machines can parse, is now plumbing for modern data and AI systems. RSS and Atom are still published by news sites, blogs, podcasts, and government portals. Builders use these feeds as a clean, predictable source of fresh text, which is far easier to ingest than scraping raw web pages.

This matters for AI pipelines that need current information. A retrieval-augmented generation system often pulls articles from RSS feeds, stores them, converts the text into embeddings, and lets a language model answer questions over that material. The feed is the intake stage. Reader popularised the pattern of polling many sources and merging them, which is exactly what these ingestion jobs do today.

Podcasts show how durable the format is. Every podcast is an RSS feed with audio attached. AI tools that transcribe, summarise, or search podcasts read that same feed structure Reader handled in 2005. Newsletter and monitoring tools rely on feeds in the same way.

Reader's shutdown also taught a lesson that shapes AI strategy now. Teams learned not to build a business on a single vendor's free product that can disappear. That caution drives interest in open standards, self-hosted tools, and exportable data, including in AI, where lock-in to one model provider carries the same risk Reader users felt. A builder today still meets these feeds whenever they wire a content source into an agent, a search index, or a summarisation service.

## Still in use today

Google Reader is discontinued. Google closed it on 1 July 2013, and it has not returned. The product itself is gone, with no official successor from Google.

The technology it relied on is alive and well. RSS and Atom feeds are still published across the web and read by millions of people. Reader's death did not kill feeds. It pushed users toward other readers and proved demand for the format was real.

Replacements absorbed Reader's audience. Feedly, Inoreader, NewsBlur, and The Old Reader appeared or grew sharply around the 2013 shutdown. Open-source, self-hosted options like FreshRSS and Tiny Tiny RSS let people run a reader they fully control. All of them read the same feeds and import old subscriptions through OPML, a standard list format.

Reader persists most strongly as a reference point. People still invoke it when a company retires a popular tool, and the phrase "they pulled a Google Reader" is shorthand for that outcome. Its legacy is partly the readers that survived it and partly a durable warning about platform dependence.

## Further reading

- [IT History Timeline](/explore/it-timeline/): see where Google Reader sits among the milestones of computing.
- [AI Learning Galaxy](/explore/galaxy/): explore how web infrastructure connects to modern AI concepts.
- [HTTP and HTML](/history/http-html/): the web protocols and markup that feeds and feed readers were built on top of.
- [XML (1998)](/history/xml/): the markup language that RSS and Atom feeds are written in.
- [Google Reader on Wikipedia](https://en.wikipedia.org/wiki/Google_Reader): the product's history, features, and the reaction to its shutdown.
- [The RSS 2.0 specification](https://www.rssboard.org/rss-specification): the official specification for the feed format Google Reader aggregated.
- [The Atom Syndication Format (RFC 4287)](https://www.rfc-editor.org/rfc/rfc4287): the formal standard for Atom, the other feed format Reader supported.
