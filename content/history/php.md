---
title: "PHP (1995)"
description: "A server-side scripting language that embeds code inside HTML to build dynamic web pages, still one of the most widely used languages on the web in 2026."
date: 2026-06-23
categories: [History]
tags: [computing-history, php, web-development, server-side, scripting, open-source, html]
related:
  - explore/it-timeline
  - explore/galaxy
  - history/http-html
  - history/apache-httpd
  - history/sql
faqs:
  - question: "What does PHP stand for?"
    answer: "PHP first stood for Personal Home Page Tools, the name Rasmus Lerdorf gave it in 1995. As the language grew well beyond personal pages, the meaning changed. Today PHP is a recursive acronym for PHP: Hypertext Preprocessor, a name chosen during the rewrite that became PHP 3 in 1998. The recursive form is a small joke common among programmers."
  - question: "Who created PHP?"
    answer: "Rasmus Lerdorf wrote the original Personal Home Page Tools and announced version 1.0 on 8 June 1995, releasing the source code that month. He built it to track visits to his online resume. Andi Gutmans and Zeev Suraski later rewrote the core engine, which led to PHP 3 in 1998 and the Zend Engine in PHP 4. The language has been open source from the start."
  - question: "Is PHP still used in 2026?"
    answer: "Yes. PHP runs a large share of the public web in 2026, including WordPress, which powers a major portion of all websites. Modern PHP 8 added strong typing options, just-in-time compilation, and big speed gains. Frameworks like Laravel and Symfony keep it productive for new projects, so PHP remains active and maintained rather than legacy."
---

PHP is a server-side scripting language built to embed code directly inside HTML and produce dynamic web pages. Rasmus Lerdorf announced Personal Home Page Tools 1.0 on 8 June 1995 and released its source code that month. It grew into one of the most widely deployed languages on the web.

<figure class="bz-figure"><img src="/img/enterprise-dark/control-room-team-teal-notext.png" alt="A team works at a dark control room lit by teal screens, watching live displays. The scene reflects how PHP generates web pages on the server in real time, page by page, as requests arrive." loading="lazy"><figcaption>PHP runs on the server behind the scenes, assembling each page on demand much like operators building a live view from incoming signals.</figcaption></figure>

## What it was

Before PHP, serving a dynamic web page meant writing a separate program, often in C or Perl, that printed HTML line by line. Mixing logic and markup was awkward. Each page felt like a full application rather than a document with a few dynamic parts.

PHP flipped that model. You write ordinary HTML and drop small blocks of code inside special `<?php ... ?>` tags. The web server runs those blocks, replaces them with their output, and sends plain HTML to the browser. The page stays a page, with logic sprinkled in where needed.

Think of a printed form letter with blanks. The template is fixed, but a clerk fills the name, date, and balance for each recipient before mailing it. PHP is the clerk. The HTML is the template, and PHP fills the blanks fresh for every visitor.

Lerdorf first built it to count visits to his online resume. Early versions added database access and form handling. That combination, HTML plus easy database queries, matched exactly what people needed to build interactive sites.

<div class="bz-flow">
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Step 1</span><span class="bz-flow-step-name">Request</span><span class="bz-flow-step-desc">A browser asks the web server for a .php page.</span></div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Step 2</span><span class="bz-flow-step-name">Interpret</span><span class="bz-flow-step-desc">The PHP engine runs the code blocks inside the HTML file.</span></div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Step 3</span><span class="bz-flow-step-name">Query</span><span class="bz-flow-step-desc">The code reads or writes a database such as MySQL.</span></div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Step 4</span><span class="bz-flow-step-name">Respond</span><span class="bz-flow-step-desc">The engine returns finished HTML to the browser.</span></div>
</div>

## Why it mattered

PHP lowered the bar for building dynamic sites. A beginner could edit an HTML file, add a few lines of PHP, and have a working page. No compile step, no heavy framework, fast feedback. That gentle on-ramp pulled a generation of self-taught developers onto the web.

It arrived at the right moment. The web was growing fast after the first browsers spread in the early 1990s. People wanted guestbooks, forums, shopping carts, and content systems. PHP paired naturally with the Apache web server and the MySQL database, a free stack anyone could run.

That free stack got a name. The LAMP combination, Linux, Apache, MySQL, and PHP, became the default way to host web applications. It cost nothing to start, ran on cheap hosting, and scaled far enough for most sites. Whole hosting businesses grew around it.

The 1998 rewrite by Andi Gutmans and Zeev Suraski turned a clever toolset into a serious language. PHP 3 added a cleaner engine and broad database support. PHP 4 introduced the Zend Engine for speed. From there, PHP spread to a vast share of the world's web servers.

## How it connects to AI today

PHP is where huge volumes of web content live, and that content trains and feeds AI. WordPress, built in PHP, powers a large portion of all websites in 2026. Much of the public text used to train large language models came from PHP-driven sites, forums, and content systems. The language quietly shaped the web's text corpus.

A builder meets PHP through these platforms. Adding AI to a WordPress site, a Magento store, or a Drupal portal means writing or installing PHP code. Plugins call AI services from PHP, sending text to a model and inserting the reply into a page. That is a common, concrete way teams ship AI features today.

PHP connects to models through APIs and SDKs. Official and community libraries let PHP applications call services like the OpenAI and Anthropic APIs over HTTP. A PHP backend collects a user's question, sends it to a model, receives generated text, and renders it inside the same HTML template the language always produced.

AI also helps people write PHP. Coding assistants generate PHP functions, explain legacy code, and refactor old scripts. Because so much PHP exists in public repositories, models predict its patterns well. The 1995 idea of mixing logic into HTML now sits inside AI-assisted development and AI-powered web features alike.

## Still in use today

PHP is active and maintained, not legacy. PHP 8, released in 2020, brought a just-in-time compiler, union types, named arguments, and large performance gains. The core team ships regular versions with security and feature updates, and a public process governs the language's direction.

It persists because the web it built never went away. Millions of sites run WordPress, Drupal, Magento, and custom PHP applications. Rewriting working software is expensive, so these systems keep running and keep getting new PHP features. Demand for PHP developers stays steady as a result.

Modern frameworks keep it competitive for new work. Laravel and Symfony offer routing, security, testing, and database tools that match other ecosystems. Composer manages packages cleanly. A new PHP project in 2026 looks structured and typed, far from the loose scripts of the early years.

Newer languages compete for fresh web backends. JavaScript with Node.js, Python, Go, and others win many greenfield projects. Yet PHP holds a large installed base and a low cost to start. It coexists with these tools, anchored by WordPress and a mature hosting ecosystem rather than fading out.

## Further reading

- [IT History Timeline](/explore/it-timeline/): see where PHP sits among the milestones of computing.
- [AI Learning Galaxy](/explore/galaxy/): explore how early computing connects to modern AI concepts.
- [HTTP and HTML (1989 to 1991)](/history/http-html/): the web protocols and markup that PHP fills with dynamic content.
- [Apache HTTP Server (1995)](/history/apache-httpd/): the web server that paired with PHP to form the LAMP stack.
- [PHP on Wikipedia](https://en.wikipedia.org/wiki/PHP): the language, its history, versions, and major uses.
- [Official PHP documentation](https://www.php.net/docs.php): the reference manual maintained by the PHP project.
- [PHP: History of PHP](https://www.php.net/manual/en/history.php.php): the project's own account of how the language began and evolved.
