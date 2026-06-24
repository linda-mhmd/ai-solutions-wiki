---
title: "XML 1.0 (1998)"
description: "A text format for marking up structured data so machines and people can both read it, still common in config files, documents, and web service messages in 2026."
date: 2026-06-23
categories: [History]
tags: [computing-history, xml, markup-language, data-exchange, w3c, sgml, config]
related:
  - explore/it-timeline
  - explore/galaxy
  - history/http-html
  - history/sql
  - history/java
faqs:
  - question: "What does XML stand for?"
    answer: "XML stands for Extensible Markup Language. It is extensible because you invent your own tags to fit your data, unlike HTML, which has a fixed set of tags for web pages. The World Wide Web Consortium, known as the W3C, published the XML 1.0 recommendation in February 1998. The goal was a simple, strict text format that any program could read and write."
  - question: "What is the difference between XML and HTML?"
    answer: "HTML describes how a web page looks, using a fixed vocabulary of tags like p and a. XML describes what data means, using tags you define yourself, such as invoice or customer. HTML is forgiving about errors, while XML is strict and rejects malformed documents. Both descend from an older standard called SGML, but they solve different problems."
  - question: "Is XML still used today?"
    answer: "Yes, XML is widely used but rarely chosen for new web work. It runs office document formats like .docx, build files such as Maven pom.xml, Android layouts, RSS feeds, and many enterprise messaging systems. For new APIs, developers usually pick JSON because it is lighter. XML persists where strict validation, namespaces, or legacy systems matter."
---

XML 1.0 is a text format for marking up structured data so machines and people can both read it. A World Wide Web Consortium working group published it in February 1998 as a simplified subset of an older standard called SGML. It became the common format for config files, documents, and web service messages.

<figure class="bz-figure"><img src="/img/enterprise-dark/executives-city-view-notext.png" alt="Three executives stand against a night city view of lit towers, looking out over a connected landscape. The scene reflects how XML gave organisations a shared, structured language to exchange data across systems and companies." loading="lazy"><figcaption>XML let separate organisations agree on one structured language for their data, much like a shared view across a connected city.</figcaption></figure>

## What it was

Before XML, every program tended to invent its own file format. One application saved data in a way no other tool could read. Moving information between systems meant writing custom parsers for each format. There was no common, strict, text-based way to describe structured data.

XML fixed this with a simple idea. You wrap each piece of data in tags that you name yourself. A tag like `<price>20</price>` says the value 20 is a price. Tags nest inside other tags to show structure, so an invoice contains line items, and each item contains a name and a price.

Think of a shipping label on a parcel. The label has clear fields: sender, recipient, weight, and contents. Anyone can read it, and any depot can sort by it, because the fields are labelled. XML puts that kind of labelling around digital data. The data carries its own description.

Two rules made XML reliable. A document is well-formed when every tag closes and tags nest correctly. A document is valid when it also matches a schema that defines which tags are allowed. A schema acts like the rules of a form, listing required fields and their types.

<div class="bz-flow">
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Step 1</span><span class="bz-flow-step-name">Author</span><span class="bz-flow-step-desc">You write data inside named tags, nesting them to show structure.</span></div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Step 2</span><span class="bz-flow-step-name">Parse</span><span class="bz-flow-step-desc">A parser reads the tags and checks the document is well-formed.</span></div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Step 3</span><span class="bz-flow-step-name">Validate</span><span class="bz-flow-step-desc">An optional schema confirms the tags and values follow the rules.</span></div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Step 4</span><span class="bz-flow-step-name">Use</span><span class="bz-flow-step-desc">Another program reads the structured data and acts on it.</span></div>
</div>

## Why it mattered

XML gave the industry a neutral format that no single vendor owned. Two systems built by different teams, in different languages, could exchange data if both agreed on an XML structure. This portability made XML the default for data exchange across the early 2000s.

It carried its own meaning. Because tags name each value, a person can read a raw XML file and understand it without documentation. A machine can read the same file and process it. This dual readability was rare in earlier binary formats.

XML grew a large family of supporting standards. XML Schema defined strict rules for documents. XSLT transformed one XML shape into another. XPath located parts of a document. Namespaces let documents mix vocabularies without name clashes. Together these formed a complete toolkit for structured data.

Whole technologies were built on it. SOAP web services sent XML messages between businesses. RSS feeds delivered news in XML. Office suites moved to XML-based document formats. Configuration files for servers and build tools adopted XML as a reliable, parseable format.

## How it connects to AI today

XML still surrounds the systems that AI runs on. Build files like Maven `pom.xml`, Android layout files, and many enterprise configuration files use XML. A builder deploying an AI model into a Java or Android stack edits XML to wire the pieces together. The format did not disappear; it moved into the plumbing.

JSON grew out of the same need XML served, and it now dominates AI APIs. When you call a large language model, the request and response usually travel as JSON, a lighter format with the same goal of structured, readable data. XML proved the idea that data should carry its own labels, and JSON carried that idea into modern web and AI services.

XML matters as training and source data too. Wikipedia ships full database dumps in XML. RSS and Atom feeds, both XML, supply text that feeds search and retrieval systems. Models learn from these labelled documents, and retrieval pipelines parse them to pull facts.

The most direct link is structured output. Some AI tools ask a model to return answers wrapped in tags, such as `<answer>` and `<reasoning>`, because tags are easy to parse and hard to confuse. This is the same tag-and-nest pattern XML introduced. The vocabulary is lighter, but the principle traces straight back to XML 1.0.

## Still in use today

XML is legacy-accepted. The W3C maintains the recommendation, current parsers support it, and major formats still depend on it. It is not deprecated, but developers rarely choose it for new web APIs. Its role has narrowed to specific, durable niches.

It persists where its strengths still win. Strict validation through schemas, support for mixed namespaces, and decades of installed tooling keep XML alive in office documents, publishing, government data, and enterprise messaging. These systems value precision and stability over the lighter weight of newer formats.

JSON replaced XML for most new APIs and web traffic because it is shorter and maps directly onto common programming data types. YAML and TOML took over many configuration files for the same reason. Yet none of these fully match XML's strict validation and namespace features, so XML holds its ground where those features are required.

## Further reading

- [IT History Timeline](/explore/it-timeline/): see where XML 1.0 sits among the milestones of computing and data.
- [AI Learning Galaxy](/explore/galaxy/): explore how data formats connect to the wider map of AI and computing topics.
- [HTTP and HTML](/history/http-html/): the web standards that XML was designed to complement and extend.
- [SQL (1974)](/history/sql/): the query language for structured data that often sits behind XML exchanges.
- [Extensible Markup Language (XML) 1.0, W3C Recommendation](https://www.w3.org/TR/xml/): the official specification, still maintained by the W3C.
- [XML on Wikipedia](https://en.wikipedia.org/wiki/XML): a broad overview of the format, its history, and its related standards.
