---
title: "Node.js"
description: "The server-side JavaScript runtime created by Ryan Dahl in 2009, built on Chrome's V8 engine with an event-driven, non-blocking I/O architecture that brought JavaScript to the server."
date: 2026-03-28
categories: [Glossary]
tags: [Node.js, JavaScript, runtime, V8, event-driven, server-side, Ryan-Dahl, non-blocking-IO]
related:
  - glossary/npm
  - glossary/react
  - glossary/nextjs
  - glossary/typescript
last_updated: 2026-05-30
---

Node.js is a server-side JavaScript runtime built on Google's V8 JavaScript engine. Created by Ryan Dahl in 2009, Node.js introduced an event-driven, non-blocking I/O model that made JavaScript viable for high-performance server applications. It unified the language used on client and server, enabling a single language across the entire web stack.

## Origins and History

On November 8, 2009, Ryan Dahl presented "Node.js, Evented I/O for V8 Javascript" at the inaugural JSConf EU in Berlin to an audience of approximately 150 developers [1]. The presentation earned a standing ovation --- a first for the conference.

Dahl's argument was architectural. Traditional web servers like Apache used a thread-per-connection model: each incoming connection spawned a thread that blocked while waiting for I/O operations (database queries, file reads, network calls). Under high concurrency, this model consumed enormous memory and CPU for context switching between thousands of blocked threads. Dahl argued that event loops, not threads, were the correct abstraction for I/O-bound network servers [2].

Dahl chose JavaScript deliberately. JavaScript was the only mainstream language that had no existing server-side I/O paradigm to conflict with. It was single-threaded by design (browsers enforced this), had first-class functions for callbacks, and its event loop model (familiar from browser DOM event handling) mapped naturally to network event processing. Google's V8 engine, released open-source in 2008 with Chrome, provided the high-performance compilation layer --- V8 compiled JavaScript directly to machine code rather than interpreting it.

Before Node.js, Dahl had built Ebb, a lightweight web server in C, and contributed an event-driven module to Nginx. His experience with these systems informed Node.js's design: a single-threaded event loop for orchestrating I/O, with a thread pool (via libuv) handling operations that could not be made non-blocking (DNS resolution, file system access on some platforms).

## Key Concepts

**Event-driven, non-blocking I/O.** Node.js uses a single-threaded event loop to handle concurrent connections. When a request requires I/O (reading a file, querying a database), Node.js initiates the operation and immediately moves to the next request. When the I/O completes, a callback fires. This allows a single Node.js process to handle thousands of concurrent connections with minimal memory overhead.

**The V8 engine.** Node.js embeds Google's V8 JavaScript engine, which compiles JavaScript to optimized machine code using just-in-time (JIT) compilation. V8's performance made JavaScript competitive with traditionally faster languages for server workloads.

**CommonJS modules (and later ESM).** Node.js adopted the CommonJS module system (`require`/`module.exports`) to enable modular code organization on the server. Node.js 12+ added support for ES modules (`import`/`export`), and by Node.js 18, ESM support reached stability.

**The callback pattern and its evolution.** Node.js initially relied on error-first callbacks (`function(err, result)`) for asynchronous operations. The community evolved through Promises (native in Node.js 4+), async/await (Node.js 7.6+), and the Streams API for processing data incrementally.

## Impact on Web Development

Node.js transformed the JavaScript ecosystem. Before 2009, JavaScript was a browser-only language. Node.js made it possible to write servers, CLI tools, build systems, and desktop applications in JavaScript. The npm package registry, created by Isaac Schlueter in 2010 to serve the Node.js ecosystem, grew to become the world's largest software registry.

In January 2012, Dahl stepped down as Node.js project lead, handing stewardship to Schlueter. The project later experienced a community governance crisis that led to the io.js fork in 2014, which was resolved with the formation of the Node.js Foundation in 2015 under the Linux Foundation.

In 2018, Dahl presented "10 Things I Regret About Node.js" at JSConf EU, critiquing decisions around the module system, security model, and build system. That talk led to the creation of Deno, a new JavaScript/TypeScript runtime addressing those regrets.

## Sources

1. JSConf EU. (2009). "Ryan Dahl: Node.js, Evented I/O for V8 Javascript." https://www.jsconf.eu/2009/video_nodejs_by_ryan_dahl.html
2. Dahl, R. (2009). Original Node.js presentation video. https://www.youtube.com/watch?v=ztspvPYybIY
3. Node.js Foundation. https://nodejs.org
4. Node.js GitHub Repository. https://github.com/nodejs/node
