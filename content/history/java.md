---
title: "Java (1995)"
description: "A general-purpose language that compiles to bytecode and runs on the Java Virtual Machine, promising write once, run anywhere. It became a backbone of enterprise software."
date: 2026-06-23
categories: [History]
tags: [computing-history, java, jvm, bytecode, enterprise, programming-languages, sun-microsystems]
related:
  - explore/it-timeline
  - explore/galaxy
  - history/c-language
  - history/compiler
  - history/cobol
faqs:
  - question: "Who created Java and when?"
    answer: "A team led by James Gosling at Sun Microsystems created Java. The project began in 1991 under the name Oak. Sun publicly introduced the language as Java on 23 May 1995, and JDK 1.0 shipped in January 1996. Oracle acquired Sun in 2010 and now stewards the language."
  - question: "What does write once, run anywhere mean?"
    answer: "Java source code compiles to bytecode, a portable intermediate format, instead of code tied to one processor. The Java Virtual Machine on each platform runs that same bytecode. So one compiled program can run on Windows, Linux, macOS, and many other systems without being rebuilt for each one."
  - question: "Is Java still used in 2026?"
    answer: "Yes. Java is active and heavily maintained. Oracle ships a new version every six months, with long-term support releases such as Java 17 and Java 21. It runs banking systems, Android apps through related tooling, big data platforms like Hadoop and Spark, and countless enterprise services."
---

Java is a general-purpose, object-oriented language that compiles to bytecode and runs on the Java Virtual Machine, a piece of software that exists on many kinds of computer. Sun Microsystems publicly introduced it on 23 May 1995, and JDK 1.0 shipped in January 1996. Its promise of write once, run anywhere made it a backbone of enterprise software for decades.

<figure class="bz-figure"><img src="/img/enterprise-dark/corridor-red-columns-notext.png" alt="A long dark corridor lined with tall red light columns receding into the distance, suggesting many identical machines running the same code. The repeated columns echo Java bytecode running unchanged across many platforms." loading="lazy"><figcaption>Java's promise was that one compiled program could run down any corridor of machines, each column a different computer running the same bytecode.</figcaption></figure>

## What it was

Most earlier compiled languages, including C, turn source code into machine instructions for one specific kind of processor. Move that program to a different chip or operating system, and you often recompile, sometimes rewrite. Java set out to break that link between a program and the hardware under it.

A Java compiler does not produce native machine code. It produces bytecode, a compact intermediate format that no real processor runs directly. Instead, a separate program called the Java Virtual Machine, or JVM, reads that bytecode and executes it. Each platform has its own JVM, but they all run the same bytecode.

Think of bytecode as a recipe written in a shared cooking notation. The recipe never changes. Every kitchen has a local cook, the JVM, who reads that one notation and prepares the dish with whatever stove and pans are on hand. Write the recipe once, and any equipped kitchen can serve it.

The team led by James Gosling started the project in 1991, first aiming at consumer devices like set-top boxes. They named it Oak. As the web rose, Sun retargeted the language for networked programs, renamed it Java, and launched it in 1995 with small programs called applets that ran inside web browsers.

<div class="bz-flow">
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Step 1</span><span class="bz-flow-step-name">Write source</span><span class="bz-flow-step-desc">A developer writes human-readable Java in .java files.</span></div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Step 2</span><span class="bz-flow-step-name">Compile</span><span class="bz-flow-step-desc">The javac compiler turns source into portable .class bytecode.</span></div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Step 3</span><span class="bz-flow-step-name">Load</span><span class="bz-flow-step-desc">The JVM loads and verifies the bytecode on any platform.</span></div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Step 4</span><span class="bz-flow-step-name">Execute</span><span class="bz-flow-step-desc">The JVM runs the bytecode, often compiling hot paths to native code.</span></div>
</div>

## Why it mattered

Java arrived as the web was exploding and businesses were racing to build networked software. Its portability was a genuine relief. A company could write a program once and deploy it across mixed fleets of servers and desktops without maintaining a separate build for each.

The language also handled memory for you. Earlier systems languages made the programmer track and free memory by hand, a frequent source of crashes and security holes. Java added automatic garbage collection, which reclaims unused memory on its own. That made large programs safer to write and easier to maintain.

Java carried a clean object-oriented design, a large standard library, and built-in support for networking and threads. By the late 1990s, the platform expanded into editions for servers and enterprise systems. Java became the default language for banking, telecom, and corporate back-office software, where reliability matters more than raw speed.

Its reach grew further when Google built the Android operating system using the Java language and its libraries. For years, writing an Android app meant writing Java. That put the language on billions of phones and made it one of the most taught and most used languages in the world.

## How it connects to AI today

Java sits at the foundation of the big data systems that feed modern AI. Apache Hadoop and Apache Spark, two of the most influential platforms for processing data at scale, are written largely in Java and run on the JVM. The huge datasets used to train machine learning models are often cleaned, joined, and transformed by these JVM-based tools before a model ever sees them.

The JVM itself became a shared home for many languages. Scala, Kotlin, and Clojure all compile to Java bytecode and run on the same virtual machine. Spark's expressive interface is written in Scala on the JVM. Apache Kafka, the streaming backbone that moves event data into real-time AI pipelines, runs on the JVM too. A data engineer building AI infrastructure meets this ecosystem constantly.

A builder also meets Java directly when adding AI to enterprise systems. Banks, insurers, and large retailers run core software in Java, so connecting a model means calling an AI service from Java code. Official and community libraries, including the AWS, OpenAI, and Anthropic client tooling, let a Java service send text to a model over HTTP and use the reply. Frameworks like Spring keep these services structured and testable.

Specialised libraries bring machine learning onto the JVM as well. Deeplearning4j runs neural networks in Java, and the Deep Java Library, known as DJL, lets Java applications load and serve models trained elsewhere. Coding assistants now generate and explain Java fluently, since decades of open-source Java code taught them its patterns. The 1995 idea of portable, managed code still shapes how AI reaches the systems people rely on.

## Still in use today

Java is active and heavily maintained. Oracle ships a new feature release every six months, with long-term support versions such as Java 17 in 2021 and Java 21 in 2023 that organisations adopt for years. The OpenJDK project develops the reference implementation in the open, and many vendors distribute their own builds.

The language keeps evolving. Recent versions added records, pattern matching, sealed classes, and a preview of lightweight virtual threads for high-concurrency servers. These updates keep Java competitive for the data-heavy, highly concurrent workloads that AI infrastructure demands.

Java persists because the world depends on the software written in it. Core banking systems, payment networks, telecom platforms, and government services run on Java and would be expensive and risky to rewrite. The big data and streaming ecosystem around the JVM keeps drawing new projects rather than fading.

Newer languages compete for fresh work. Go and Rust win some systems and cloud projects, Python dominates data science and AI research, and Kotlin now leads Android development while still running on the JVM. Java coexists with all of them, anchored by an enormous installed base, a mature ecosystem, and steady demand for developers more than thirty years after its launch.

## Further reading

- [IT History Timeline](/explore/it-timeline/): see where Java sits among the milestones of computing.
- [AI Learning Galaxy](/explore/galaxy/): explore how programming languages connect to modern AI concepts.
- [C: the systems language behind Unix](/history/c-language/): the lower-level language whose syntax Java borrowed and whose memory handling it replaced.
- [The first compiler](/history/compiler/): the idea of turning source into runnable code that Java extends with bytecode and a virtual machine.
- [Java on Wikipedia](https://en.wikipedia.org/wiki/Java_(programming_language)): the language, its history, editions, and major uses.
- [Oracle Java documentation](https://docs.oracle.com/en/java/): the official reference for the current Java platform.
- [The OpenJDK project](https://openjdk.org/): the open-source development home of the Java Development Kit.
