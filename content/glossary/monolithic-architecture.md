---
title: "Monolithic Architecture"
description: "A software architecture where all components are built and deployed as a single, self-contained unit."
date: 2026-03-28
categories: [Glossary]
tags: [monolithic-architecture, architecture-patterns, deployment, software-design]
last_updated: 2026-05-30
---

A monolithic architecture structures an application as a single deployable unit where all components -- user interface, business logic, and data access -- are tightly integrated and run within a single process. It is the traditional and most straightforward approach to building applications.

## Origins and History

Monolithic architecture is the original and default way software has been built since the earliest days of computing. Mainframe applications of the 1960s and 1970s were inherently monolithic, with all code compiled and executed as a single program. Client-server applications of the 1980s and 1990s split the UI to the client but kept the server-side as a monolith. Early web applications (PHP, Java EE, ASP.NET) were typically deployed as single WAR/EAR files or unified codebases on application servers. The term "monolithic" gained its current connotation primarily in contrast to microservices architecture. Martin Fowler and James Lewis's influential 2014 article on microservices explicitly defined the monolith as the starting point from which organizations might decompose into services. Notably, many successful large-scale systems (Shopify, Stack Overflow, Basecamp) have remained monolithic by choice, demonstrating that the pattern scales further than is sometimes assumed.

## How It Works

In a monolithic application, all functionality resides in a single codebase, is compiled into a single artifact (JAR, WAR, executable), and runs in a single process or application server instance. Components communicate through in-process function calls rather than network requests. Scaling is done by replicating the entire application behind a load balancer (horizontal scaling) or by increasing the resources of the single server (vertical scaling).

## Practical Applications

Monolithic architecture is well-suited for small-to-medium applications, early-stage products where requirements are evolving rapidly, teams that are small enough to work in a shared codebase without excessive coordination overhead, and systems where the latency of in-process calls is a significant advantage. The "modular monolith" approach maintains a single deployment while enforcing strict module boundaries internally, combining the simplicity of monolithic deployment with the organizational benefits of clear component separation.

## Sources

1. Fowler, M. and Lewis, J. (2014). "Microservices: A Definition of This New Architectural Term." [https://martinfowler.com/articles/microservices.html](https://martinfowler.com/articles/microservices.html)
2. Richards, M. (2015). *Software Architecture Patterns*. O'Reilly Media.
3. Newman, S. (2021). *Building Microservices*, 2nd ed. O'Reilly Media, Chapter 1.
