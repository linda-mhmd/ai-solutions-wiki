---
title: "JavaScript"
description: "The dynamically typed scripting language created by Brendan Eich at Netscape in 1995, standardised as ECMAScript, and now the execution environment of the web browser, the server via Node.js, and most AI application front ends."
date: 2026-09-02
categories: [Glossary]
tags: [JavaScript, ECMAScript, web-development, browser, Node.js, DOM, programming-language]
related:
  - glossary/typescript
  - glossary/nodejs
  - glossary/virtual-dom
  - glossary/react
last_updated: 2026-09-02
---

JavaScript is a dynamically typed, garbage-collected programming language with first-class functions and prototype-based inheritance. It is the only language natively executed by every web browser, which makes it the language that manipulates the [Document Object Model](/basics/what-is-the-dom/) and therefore the language in which most user interfaces on the web — including the chat interfaces in front of large language models — are written.

## Origins and History

JavaScript was created by **Brendan Eich** at Netscape Communications in May 1995, famously in about ten days, to give the Netscape Navigator browser a scripting language for interactive web pages [1]. It went through two names before its release: internally *Mocha*, then *LiveScript*, and finally *JavaScript* in December 1995 as part of a marketing agreement with Sun Microsystems. The name has caused permanent confusion ever since: JavaScript is unrelated to Java in design, semantics, or lineage.

Because competing browsers began shipping incompatible implementations, Netscape submitted the language to **Ecma International** for standardisation. The standard is called **ECMAScript** (ECMA-262), with the first edition published in June 1997. The language specification is maintained by the **TC39** committee, and since 2015 has followed an annual release cadence — ES2015, ES2016, and so on — where features ship once they reach the committee's final stage rather than waiting for a large periodic revision [2].

**ES2015 (also called ES6)** was the pivotal revision. It introduced `let` and `const`, classes, native modules, arrow functions, promises, template literals, and destructuring — the features that made large JavaScript codebases tractable and set up the ecosystem that followed.

The second decisive moment was **Node.js**, released in 2009, which paired Google's V8 engine with an event-driven, non-blocking I/O runtime and moved JavaScript to the server [3]. From that point a single language could span browser and back end.

## Core Concepts

**Dynamic typing.** Types are associated with values, not variables. A variable can hold a string and later a number. This is flexible and a common source of defects at scale — the problem [TypeScript](/glossary/typescript/) was built to address by adding a compile-time type layer that erases entirely before execution.

**Prototypal inheritance.** Objects inherit directly from other objects through a prototype chain rather than from classes. The `class` syntax added in ES2015 is largely syntactic sugar over this mechanism, not a separate object model.

**First-class functions and closures.** Functions are values: they can be passed, returned, and stored. A closure captures the variables of its defining scope, which is the basis of most JavaScript patterns for state and asynchrony.

**Single-threaded execution with an event loop.** JavaScript runs on one thread and processes work from a queue. Long-running synchronous work blocks everything, including rendering. Asynchrony is expressed with callbacks, promises, and `async`/`await`, which is why streaming interfaces — such as rendering an LLM response token by token — are a natural fit for the language.

**Multiple engines.** V8 (Chrome, Edge, Node.js, Deno), SpiderMonkey (Firefox), and JavaScriptCore (Safari) are independent implementations of the same specification. Behaviour is standardised; performance characteristics are not.

## Why it matters for AI systems

Almost every interface a user has with a model is JavaScript. Streaming a completion into a page, rendering markdown, managing conversation state, cancelling an in-flight request, and handling the partial-failure cases that non-deterministic back ends produce are all client-side JavaScript concerns. The language's event loop and streaming primitives (`ReadableStream`, server-sent events, `fetch`) are what make token-by-token rendering feel immediate. On the server, Node.js is a common host for [AI gateways](/glossary/ai-gateway/) and orchestration layers, though heavy numerical work stays in Python or compiled code.

## Sources

1. Mozilla Developer Network. "JavaScript." MDN Web Docs. [https://developer.mozilla.org/en-US/docs/Web/JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
2. Ecma International / TC39. "ECMAScript Language Specification (ECMA-262)." [https://tc39.es/ecma262/](https://tc39.es/ecma262/)
3. OpenJS Foundation. "About Node.js." [https://nodejs.org/en/about](https://nodejs.org/en/about)
4. Ecma International. "ECMA-262 standard, editions and history." [https://ecma-international.org/publications-and-standards/standards/ecma-262/](https://ecma-international.org/publications-and-standards/standards/ecma-262/)
