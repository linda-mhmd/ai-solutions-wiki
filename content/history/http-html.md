---
title: "HTTP and HTML"
description: "The request-response protocol browsers use to fetch resources and the markup language that structures web pages, the pair that made the World Wide Web work and still powers it today."
date: 2026-06-23
categories: [History]
tags: [http, html, web, protocols, tim-berners-lee, cern, internet]
related:
  - explore/it-timeline
  - explore/galaxy
  - history/arpanet
  - history/mosaic-netscape
  - history/email
faqs:
  - question: "Who invented HTTP and HTML, and when?"
    answer: "Tim Berners-Lee invented both at CERN, the European particle physics laboratory near Geneva. He wrote his proposal in 1989, built the first browser, server, and HTML during 1990, and the World Wide Web went public in 1991. HTTP/1.1, the long-lived workhorse version, arrived in 1997."
  - question: "What is the difference between HTTP and HTML?"
    answer: "HTTP is a protocol, the rules two computers follow to request and deliver files over a network. HTML is a markup language, the format of one kind of file HTTP delivers. HTTP is the courier, HTML is the document the courier carries."
  - question: "Are HTTP and HTML still used today?"
    answer: "Yes, both are active and central to the web. HTTP has evolved through HTTP/1.1, HTTP/2, and HTTP/3, and HTML is now maintained as a living standard. Every website you load, and most API calls behind AI products, use them."
---

HTTP and HTML are the two inventions that turned the internet into the web. HTTP is the request-response protocol a browser uses to fetch a resource from a server. HTML is the markup language that structures the page it gets back. Tim Berners-Lee created both at CERN between 1989 and 1991, and together they made it possible to publish and link documents for anyone with a browser.

<figure class="bz-figure"><img src="/img/enterprise-dark/circuit-board-angled-notext.png" alt="A dark circuit board viewed at an angle with glowing red signal traces running between components. HTTP and HTML carry structured requests and pages across networks much like these traces carry signals." loading="lazy"><figcaption>HTTP and HTML define the signals that travel between browser and server, much like the traces routing data across this board.</figcaption></figure>

## What it was

The internet already existed before the web. Networks could move packets between machines, and email and file transfer worked. What was missing was a simple, universal way to publish a document, give it an address, and link it to other documents anywhere in the world.

Berners-Lee solved this with three pieces. The URL gave every resource a unique address. HTTP, the HyperText Transfer Protocol, defined how a client asks for that resource and how a server answers. HTML, the HyperText Markup Language, defined how to write a document with headings, paragraphs, and, crucially, links to other documents.

Think of HTTP and HTML like a library with a postal service. HTML is the format every book follows, with a cover, chapters, and cross-references to other books. HTTP is the courier who takes your slip with a book's address, fetches that exact book, and hands it back. The slip can also say "I only want the index" or "skip it if it has not changed".

A request is plain text. The browser sends a method such as `GET`, the path of the resource, and some headers. The server replies with a status code such as `200 OK` or `404 Not Found`, its own headers, and the body, often an HTML page. HTTP is stateless, so each request stands alone and the server keeps no memory of the last one.

<div class="bz-flow">
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Step 1</span><span class="bz-flow-step-name">Resolve and connect</span><span class="bz-flow-step-desc">The browser turns a URL into a server address and opens a connection to it.</span></div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Step 2</span><span class="bz-flow-step-name">Send request</span><span class="bz-flow-step-desc">It sends an HTTP request line, such as GET /index.html, plus headers describing what it accepts.</span></div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Step 3</span><span class="bz-flow-step-name">Server responds</span><span class="bz-flow-step-desc">The server returns a status code, response headers, and a body, often an HTML document.</span></div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Step 4</span><span class="bz-flow-step-name">Render and follow links</span><span class="bz-flow-step-desc">The browser parses the HTML, draws the page, and fetches linked resources the same way.</span></div>
</div>

## Why it mattered

Before the web, online information lived in scattered, incompatible systems. Each service had its own access method, its own commands, and its own format. Finding and linking knowledge across them was hard.

The web changed that with three properties. It was universal, so any document could link to any other regardless of which computer held it. It was open, with no licence fee and published specifications anyone could implement. It was easy to author, since HTML was readable text you could write in any editor.

That combination spread fast. CERN released the web technology into the public domain in 1993, removing any barrier to adoption. The Mosaic browser made pages graphical and easy, and the number of websites grew from a handful to millions within a few years. The web became the default way to publish, shop, learn, and communicate.

HTTP/1.1, standardised in 1997, made the growing web efficient. It allowed persistent connections, so a browser could reuse one connection for many requests instead of reopening one each time. It added virtual hosting, letting many sites share one server, and better caching. That version carried the web for nearly two decades.

## How it connects to AI today

HTTP is the backbone of modern AI, not as a relic but as the live plumbing. When you call an AI model through an API, you send an HTTP request. The prompt travels as a `POST` body, usually formatted as JSON, to an endpoint such as a chat completions URL. The model's answer comes back as an HTTP response. Every major model provider, including Anthropic's Claude API, exposes its models this way.

Streaming responses, where tokens appear one at a time, ride on HTTP too. Providers use server-sent events over a long-lived HTTP response, so the connection stays open and the server pushes chunks as the model generates them. The same protocol Berners-Lee designed for fetching documents now delivers AI output word by word.

HTML is equally central to AI's data side. The text that trained large language models came in large part from web pages, which are HTML. Web crawlers fetch pages over HTTP, then strip HTML tags to extract the readable text that feeds training and retrieval systems. When an AI agent browses the web or a retrieval-augmented system pulls a source, it parses HTML to find the content.

A builder meets both constantly. You read HTTP status codes when an API returns `429 Too Many Requests` during rate limiting, or `401` for a bad key. You set HTTP headers to pass your API token. The Model Context Protocol, which connects AI assistants to tools, commonly runs over HTTP. And the chat interface you type into is an HTML page in your browser, fetched over HTTP, talking to a model over more HTTP underneath.

## Still in use today

HTTP and HTML are active and central, among the most used technologies on earth. Neither was replaced. Both kept evolving while preserving the original contract of requests, responses, and linked documents.

HTTP advanced through clear stages. HTTP/2, standardised in 2015, multiplexes many requests over one connection to cut latency. HTTP/3, finalised in 2022, runs over the QUIC transport instead of TCP, reducing delays on lossy networks. The methods, status codes, and header model from the early web still apply, so the mental model carries forward intact.

HTML moved from numbered versions to a living standard. The WHATWG maintains HTML continuously rather than freezing it as a version, and HTML5 era features brought native video, canvas drawing, and richer forms. The W3C and WHATWG steer the web's standards, keeping them open and royalty-free, the same principle CERN set when it gave the technology away.

These technologies persist because their core idea, addressable resources fetched by a stateless protocol and structured with a simple markup, proved both general and durable. They scaled from one physicist's documents at CERN to the entire global web, and now to the API calls behind nearly every AI product. The web's foundation is the same one laid in 1991.

## Further reading

- [IT History Timeline](/explore/it-timeline/): see where the web sits among the milestones of computing.
- [AI Learning Galaxy](/explore/galaxy/): explore how the web connects to the wider map of AI and computing.
- [ARPANET](/history/arpanet/): the network that became the internet the web was built on.
- [Mosaic and Netscape](/history/mosaic-netscape/): the graphical browsers that turned the web into a mass medium.
- [Tim Berners-Lee's original 1989 proposal (W3C)](https://www.w3.org/History/1989/proposal.html): the document that started the web, "Information Management: A Proposal".
- [HTTP overview (MDN Web Docs)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview): a clear, current reference for how HTTP works.
- [HTML Living Standard (WHATWG)](https://html.spec.whatwg.org/): the authoritative, continuously maintained specification for HTML.
