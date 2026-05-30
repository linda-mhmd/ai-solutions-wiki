---
title: "Case Pattern: Automated Content Generation for a News Agency"
description: "How a news agency automated structured report generation from data feeds - producing hundreds of articles per day from financial, sports, and weather data sources."
date: 2026-03-24
categories: [Case Patterns]
tags: ["ai-ml", "advanced", "content-generation", "news", "llm", "automation", "media"]
image: /img/shaping-ai/operator-red-data-streams-notext.png
image_alt: "A figure surrounded by red streaming data ribbons in a circular space, representing the continuous flow of news signals that an automated content system must process and publish."
image_caption: "Data arrives. The model structures it. The editor reviews what the algorithm could not judge."
last_updated: 2026-05-30
---

A regional news agency automated the production of structured data-driven articles: financial results summaries, sports match reports, weather briefings, and local government data roundups. These articles follow predictable formats and are produced in high volume - work well suited to AI generation, freeing journalists for investigative and analytical work.

## What Was Automated

**Financial results reports** - When companies publish quarterly results via regulatory filing systems, the pipeline extracts key figures (revenue, earnings, guidance) and generates a 300-word summary article following the agency's house style. The article is queued for editor review and publication.

**Sports match reports** - Live score data from sports APIs triggers report generation at final whistle. The model receives structured match data (teams, scores, scorers, timeline) and generates a 250-word match report. For league matches covered by the agency's sports editors, reports are reviewed before publication. For minor leagues, reports publish automatically with a 15-minute review window.

**Weather briefings** - Twice-daily weather briefings are generated from NWS/meteorological service data. These are almost fully automated given the low editorial risk of weather content.

**Council and planning data** - Weekly summaries of local planning applications, council decisions, and public body agendas are generated from public data feeds and formatted as digestible roundups for local coverage areas.

## Architecture

**Data ingestion** - AWS EventBridge rules trigger Lambda functions when new data arrives in monitored sources (RSS feeds, API polling, S3 drops from data providers). Data is normalized to canonical schemas per content type.

**Generation** - A Bedrock call with content-type-specific prompts produces the draft article. Prompts encode house style guidelines, word count targets, required sections, and what not to include (e.g., speculation on causes of financial results without supporting data in the input).

**Review workflow** - Generated articles enter a lightweight CMS review queue. Editors see the source data alongside the generated article, making fact-checking fast. Articles can be published, edited, or rejected in one click. Editorial metrics (acceptance rate, edit distance, review time) are tracked per content type and feed back into prompt refinement.

**Guardrails** - The generation prompts explicitly prohibit: adding information not present in the source data, making claims about causes or intent, naming individuals in negative contexts without direct data support, and generating comparative statements the data does not support.

## Key Lessons

**Separate prompts per content type outperform a general prompt.** A single flexible prompt was initially used for all content types. Content-type-specific prompts with encoded style guides and examples reduced editorial rejection rates from 22% to 7% across all types.

**Source data quality directly determines output quality.** Articles generated from well-structured, complete data sources publish with minimal editing. Articles from inconsistently formatted or incomplete data sources require significant revision. Investing time in data normalization before the generation step pays off in downstream quality.

**Editors need to trust the system to use it.** Early versions were positioned as "drafts for editing" which created a psychology of always finding something to change. Positioning as "structured reports for review and publication" - with metrics showing high acceptance rates - changed editor behavior and increased throughput.

**Automated content requires clear labeling.** All automatically generated content is labeled as such in the agency's CMS and in the published byline. This is both an editorial integrity requirement and a practical one - if the system generates an error, the label helps readers report it and editors trace it.
