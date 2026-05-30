---
title: "Pipe and Filter Architecture"
description: "An architecture pattern where data flows through a sequence of independent processing components connected by channels."
date: 2026-03-28
categories: [Glossary]
tags: [pipe-and-filter, architecture-patterns, data-processing, Unix, streaming]
last_updated: 2026-05-30
---

The pipe and filter architecture pattern structures a system as a chain of processing elements (filters) connected by channels (pipes). Each filter receives input, transforms it, and passes the result to the next filter through a pipe. Filters are independent and unaware of other filters in the chain.

## Origins and History

The pipe and filter pattern was pioneered by Doug McIlroy at Bell Labs, who proposed the concept of connecting programs together in 1964. The idea was implemented in the Unix operating system in 1973 by Ken Thompson based on McIlroy's design. The Unix pipeline, using the | operator to chain commands (e.g., `cat file | grep pattern | sort | uniq`), became the defining example of this pattern and one of the most influential ideas in software design. McIlroy described it succinctly: "Write programs that do one thing and do it well. Write programs to work together." The pattern was formally documented in the software architecture literature by Mary Shaw and David Garlan in their 1996 book *Software Architecture: Perspectives on an Emerging Discipline* and in the Pattern-Oriented Software Architecture (POSA) series.

## How It Works

A **filter** is a self-contained processing component that reads data from its input, transforms it, and writes the result to its output. Filters do not share state with other filters and can be reordered, replaced, or composed independently. A **pipe** is a connector that transmits the output of one filter to the input of the next. Pipes may buffer data and can be synchronous (blocking) or asynchronous. The overall system is defined by the topology of connected filters and pipes, which can form linear pipelines, parallel branches, or directed acyclic graphs.

## Practical Applications

Pipe and filter architecture is used in Unix/Linux command-line processing, compiler design (lexer, parser, optimizer, code generator as sequential phases), ETL data pipelines, stream processing systems (Apache Kafka Streams, Apache Flink), image and signal processing chains, and CI/CD build pipelines. The pattern excels when processing is naturally decomposed into independent, reusable transformation steps.

## Sources

1. McIlroy, M.D. (1964). Internal Bell Labs memorandum proposing Unix pipes. Documented in McIlroy, M.D., Pinson, E.N., and Tague, B.A. (1978). "UNIX Time-Sharing System: Foreword." *Bell System Technical Journal*, 57(6), 1899-1904.
2. Shaw, M. and Garlan, D. (1996). *Software Architecture: Perspectives on an Emerging Discipline*. Prentice Hall.
3. Buschmann, F. et al. (1996). *Pattern-Oriented Software Architecture, Volume 1*. Wiley.
