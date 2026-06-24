---
title: "SQL (1974)"
description: "The declarative query language for relational databases that lets you describe what data you want instead of how to fetch it, still the dominant way to query structured data in 2026."
date: 2026-06-23
categories: [History]
tags: [computing-history, sql, relational-database, query-language, ibm, declarative, data]
related:
  - explore/it-timeline
  - explore/galaxy
  - history/system-360
  - history/cobol
  - history/punched-cards
faqs:
  - question: "What does SQL stand for?"
    answer: "SQL is usually read as Structured Query Language. Its first version was named SEQUEL, short for Structured English Query Language, because the syntax read close to English sentences. IBM renamed it SQL for trademark reasons, since SEQUEL clashed with another company's name. People still pronounce it either as 'sequel' or as the three letters S-Q-L."
  - question: "Who invented SQL?"
    answer: "Donald Chamberlin and Raymond Boyce designed the original language at IBM Research in 1974. They built it on the relational model that Edgar Codd had described in 1970. Their goal was a query language non-specialists could read and write, so they kept the syntax close to plain English. SQL grew out of IBM's System R research project."
  - question: "Why is SQL declarative?"
    answer: "SQL is declarative because you state the result you want, not the steps to compute it. You write that you want orders over 100 euros, and the database decides how to find them. A separate component called the query planner picks the fastest access path. This frees you from managing indexes, file order, and loops by hand."
---

SQL is a declarative query language for relational databases. You describe what data you want, and the database works out how to fetch it. Donald Chamberlin and Raymond Boyce designed it at IBM Research in 1974 as SEQUEL, and it became the common language for working with structured data.

<figure class="bz-figure"><img src="/img/enterprise-dark/boardroom-ai-diagram-notext.png" alt="A team in a dark boardroom studies a glowing three-dimensional data diagram floating above the table. The scene reflects how SQL gives many people a shared, readable way to ask questions of the same structured data." loading="lazy"><figcaption>SQL gave organisations one shared language to question their data, much like a team gathered around a single model of the truth.</figcaption></figure>

## What it was

Before SQL, querying data meant writing code that walked through files by hand. A programmer had to know where records lived on disk, which index to follow, and how to loop through them. Change the storage layout, and the program broke. Each database had its own access routines.

SQL changed the contract between you and the database. You stop describing the journey and describe the destination. You write `SELECT name FROM customers WHERE country = 'IE'`, and the database decides how to satisfy that request. A component called the query planner chooses the access path.

Think of ordering at a restaurant. You ask for a dish by name. You do not tell the kitchen which pan to use, which shelf the ingredients sit on, or what order to chop them. The kitchen owns the method. You own the request. SQL puts you in the diner's seat.

It builds on the relational model that Edgar Codd published in 1970. Data lives in tables of rows and columns. Tables link through shared values, not through pointers fixed in storage. SQL is the language that reads, joins, filters, and updates those tables.

<div class="bz-flow">
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Step 1</span><span class="bz-flow-step-name">Statement</span><span class="bz-flow-step-desc">You write a SELECT describing the rows and columns you want.</span></div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Step 2</span><span class="bz-flow-step-name">Parse</span><span class="bz-flow-step-desc">The database checks the syntax and the named tables and columns.</span></div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Step 3</span><span class="bz-flow-step-name">Plan</span><span class="bz-flow-step-desc">The query planner picks indexes and a join order to run it fast.</span></div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Step 4</span><span class="bz-flow-step-name">Result</span><span class="bz-flow-step-desc">The engine executes the plan and returns a table of rows.</span></div>
</div>

## Why it mattered

SQL separated the question from the storage. A program could ask for data without knowing how the database physically stored it. The database could change its indexes or layout, and the queries kept working. This independence was a major shift in software design.

It made data accessible to more people. Analysts, report writers, and managers could learn enough SQL to answer their own questions. They no longer had to wait for a programmer to write file-walking code for every report. That widened who could work with company data.

SQL became a standard. The American National Standards Institute published the first SQL standard in 1986, and ISO followed in 1987. Vendors competed on speed and features while sharing a core language. A skill learned on one database transferred to the next.

A commercial industry grew around it. Oracle shipped an early commercial SQL database in 1979. IBM released DB2 in 1983. Later came Microsoft SQL Server, PostgreSQL, MySQL, and many others. Relational databases became the default place to store business records, and SQL was how everyone reached them.

## How it connects to AI today

SQL is where most AI projects meet their data. Training sets, feature tables, labels, and event logs live in relational databases and SQL-based warehouses. Platforms like Snowflake, Google BigQuery, Amazon Redshift, and Databricks all speak SQL. A builder writes SQL to assemble the data before any model sees it.

The language stayed declarative, which suits AI tooling well. Because you describe intent and not procedure, a large language model can generate SQL from a plain-English question. Tools now turn "show me revenue by region last quarter" into a working query. This text-to-SQL pattern is a common way AI connects business users to databases.

SQL also adapted to AI workloads directly. Modern databases store vectors, the numeric embeddings that power semantic search and retrieval-augmented generation. PostgreSQL with the pgvector extension lets you store embeddings and run similarity search inside SQL. So a single query can filter by normal columns and rank by vector distance at once.

Retrieval pipelines lean on this. A RAG system often fetches candidate documents with a SQL query, then passes them to the model as context. Agents that answer data questions generate and run SQL as a tool call. The 1974 idea of asking for results by description fits naturally into how AI agents reason about data.

## Still in use today

SQL is active and central, not legacy. It is over fifty years old, yet it remains the dominant way to query structured data in 2026. The ISO standard still evolves, with recent editions adding JSON support, window functions, and graph queries.

It persists because the relational model holds up. Tables, joins, and a declarative query language remain a clear, durable way to organise and question data. New engines keep adopting SQL rather than replacing it, because users already know it and the math behind it is sound.

Alternatives exist but mostly complement SQL. NoSQL stores like MongoDB and key-value databases handle cases where rigid tables fit poorly. Even there, many systems added SQL-like query layers because demand for the language never faded. SQL coexists with these tools rather than losing to them.

The wider ecosystem keeps SQL fresh. Cloud warehouses, streaming engines, and AI feature stores expose SQL interfaces. Learning it remains one of the highest-leverage skills for anyone working with data, including people building AI systems. Few languages from the 1970s stay this current.

## Further reading

- [IT History Timeline](/explore/it-timeline/): see where SQL sits among the milestones of computing.
- [AI Learning Galaxy](/explore/galaxy/): explore how early computing connects to modern AI concepts.
- [IBM System/360 (1964)](/history/system-360/): the mainframe era and IBM research culture that produced System R and SQL.
- [COBOL (1959 to 1960)](/history/cobol/): the business language whose records SQL databases later organised and queried.
- [SQL on Wikipedia](https://en.wikipedia.org/wiki/SQL): the language, its history, standards, and major implementations.
- [SEQUEL: A Structured English Query Language (1974 paper)](https://dl.acm.org/doi/10.1145/800296.811515): the original Chamberlin and Boyce paper that introduced the language.
- [PostgreSQL documentation](https://www.postgresql.org/docs/): reference for a leading open-source SQL database, including modern extensions like pgvector.
