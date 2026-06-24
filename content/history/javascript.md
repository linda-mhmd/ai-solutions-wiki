---
title: "JavaScript (1995)"
description: "The scripting language that made web pages interactive and later spread to servers, tooling, and almost every part of software, still the most widely used language in 2026."
date: 2026-06-23
categories: [History]
tags: [computing-history, javascript, web-development, scripting, browsers, netscape, ecmascript]
related:
  - explore/it-timeline
  - explore/galaxy
  - history/mosaic-netscape
  - history/http-html
  - history/java
faqs:
  - question: "Who created JavaScript and how long did it take?"
    answer: "Brendan Eich created the first prototype at Netscape in about ten days in May 1995. The language shipped in Netscape Navigator 2.0 later that year. It was first called Mocha, then LiveScript, and was renamed JavaScript in December 1995. The name was a marketing decision tied to the popularity of Java, a separate language. Despite the shared name, JavaScript and Java are different languages with different designs and uses."
  - question: "Is JavaScript the same as Java?"
    answer: "No. They are separate languages with different designs, despite the similar names. Java is a compiled, strongly typed language from Sun Microsystems. JavaScript is an interpreted scripting language that runs in browsers and on servers. The shared name came from a 1995 marketing arrangement when Java was popular. A common saying captures it: JavaScript is to Java as ham is to hamster. The two are not related in any technical sense."
  - question: "Is JavaScript still used in 2026?"
    answer: "Yes, heavily. JavaScript runs in every web browser and is consistently the most used programming language in developer surveys. It also runs on servers through Node.js, in mobile apps, in desktop apps, and in build tooling. The language is standardised as ECMAScript and gets a new version every year. Far from legacy, it is active, evolving, and central to modern software, including many AI-powered web features."
---

JavaScript is the scripting language that runs inside web browsers to make pages interactive. Brendan Eich created the first prototype at Netscape in about ten days in May 1995, and it shipped in Navigator 2.0 that year. It later spread far beyond the browser to servers, mobile apps, and tooling, becoming one of the most widely used languages in software.

<figure class="bz-figure"><img src="/img/enterprise-dark/crowd-watching-red-flame-notext.png" alt="Silhouettes of people stand at a railing watching a glowing red system in a dark hall. The crowd suggests the vast number of developers and browsers that adopted JavaScript across the web." loading="lazy"><figcaption>JavaScript spread to a huge audience of browsers and developers, the way a crowd gathers around a single bright source.</figcaption></figure>

## What it was

Before JavaScript, a web page was static. The browser downloaded HTML, drew it on screen, and stopped. Any change, such as checking a form or updating a value, meant sending a new request to the server and waiting for a whole new page. The experience felt slow and disconnected.

JavaScript added a small programming language directly inside the browser. Code embedded in a page could react to clicks, edit text on screen, validate a form, and change the layout without contacting the server. The page became a live document rather than a fixed sheet.

Think of a printed poster versus a vending machine. A poster shows the same thing to everyone and never responds. A vending machine reacts to your buttons, lights up, and hands back a result. JavaScript turned web pages from posters into vending machines.

Eich built the first version in days under intense deadline pressure. It was first named Mocha, then LiveScript, and was renamed JavaScript in December 1995. The browser reads the code line by line and runs it, so there is no separate compile step.

<div class="bz-flow">
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Step 1</span><span class="bz-flow-step-name">Load</span><span class="bz-flow-step-desc">The browser downloads an HTML page that includes JavaScript.</span></div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Step 2</span><span class="bz-flow-step-name">Parse</span><span class="bz-flow-step-desc">The engine reads the script and builds it into runnable code.</span></div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Step 3</span><span class="bz-flow-step-name">React</span><span class="bz-flow-step-desc">Code responds to clicks, typing, and timers as the user acts.</span></div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Step 4</span><span class="bz-flow-step-name">Update</span><span class="bz-flow-step-desc">The page changes on screen without reloading from the server.</span></div>
</div>

## Why it mattered

JavaScript made the web feel alive. Forms could check input before sending it. Menus could open and close. Content could change in place. These small interactions, multiplied across millions of sites, shifted the web from a library of documents toward a platform for applications.

It arrived during the browser boom. Netscape Navigator was the dominant browser, and the web was growing fast. Microsoft soon shipped its own compatible version called JScript in Internet Explorer. Two competing browsers running the same kind of language pushed the technology onto nearly every computer.

To keep the two versions in line, Netscape submitted the language for standardisation. The result was ECMAScript, first published by Ecma International in 1997. That standard meant code could run the same way across different browsers, which made the language safe to build on.

A major leap came in 2005 with a technique called Ajax. It let JavaScript fetch data in the background and update part of a page without a full reload. Web apps like email and maps started to feel as smooth as desktop software, and the modern web application was born.

## How it connects to AI today

JavaScript runs the interface of almost every AI product you use in a browser. When you type into a chat assistant, a JavaScript front end captures your message, sends it to a model over the network, and streams the reply onto the screen token by token. The smooth, live feel of these tools comes from JavaScript in the browser.

It also runs on servers. In 2009, Node.js took the browser's JavaScript engine and let the language run outside the browser. Today many AI backends are written in Node.js. A server reads a user's prompt, calls a model, and returns generated text, all in the same language that powers the page.

Builders meet JavaScript through official AI software development kits. Companies such as OpenAI and Anthropic publish JavaScript and TypeScript libraries that call their models over HTTP. A developer installs one package, writes a few lines, and connects a web app to a large language model. This is one of the most common ways AI features ship.

The wider ecosystem leans on JavaScript too. Frameworks like React, used to build chat and dashboard interfaces, are written in it. TypeScript, a typed layer on top of JavaScript, is now standard for large AI applications. Models also generate JavaScript well, because so much of it sits in public code repositories used for training.

## Still in use today

JavaScript is active and evolving, far from legacy. It runs in every web browser and tops developer usage surveys year after year. The standard, ECMAScript, gets a new edition annually, adding features in a careful, backward-compatible way so old code keeps working.

It persists because it owns a unique position. JavaScript is the only programming language every browser runs natively. No replacement can dislodge it without every browser agreeing to a new standard, so it remains the default language of the web's front end.

Its reach grew well beyond the browser. Node.js powers servers and command-line tools. Frameworks like React Native and Electron build mobile and desktop apps from JavaScript. The same language now spans the front end, the back end, and the build tools in between.

Newer technologies extend it rather than replace it. TypeScript adds type checking but compiles down to JavaScript. WebAssembly runs other languages in the browser at speed, yet it works alongside JavaScript, not instead of it. The 1995 prototype built in ten days now underpins a vast share of modern software.

## Further reading

- [IT History Timeline](/explore/it-timeline/): see where JavaScript sits among the milestones of computing.
- [AI Learning Galaxy](/explore/galaxy/): explore how early computing connects to modern AI concepts.
- [Mosaic and Netscape (1993 to 1994)](/history/mosaic-netscape/): the browsers that created the platform JavaScript was built for.
- [Java (1995)](/history/java/): the separate language whose popularity gave JavaScript its name.
- [JavaScript on Wikipedia](https://en.wikipedia.org/wiki/JavaScript): the language, its history, versions, and major uses.
- [MDN Web Docs: JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript): the reference manual and guides maintained by Mozilla.
- [ECMAScript language specification](https://tc39.es/ecma262/): the official standard that defines the language, maintained by TC39 at Ecma International.
