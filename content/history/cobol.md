---
title: "COBOL (1959 to 1960)"
description: "The English-like business programming language defined by the CODASYL committee, still running a large share of the world's banking, insurance, and government transactions in 2026."
date: 2026-06-23
categories: [History]
tags: [computing-history, cobol, programming-language, business-computing, grace-hopper, codasyl, mainframe]
related:
  - explore/it-timeline
  - explore/galaxy
  - history/fortran
  - history/compiler
  - history/univac
faqs:
  - question: "What does COBOL stand for?"
    answer: "COBOL is short for COmmon Business-Oriented Language. The name captures both goals of the project. Common means one language that runs across machines from different vendors. Business-oriented means it targets record-keeping, payroll, and accounting rather than scientific maths. The design favoured readable, English-like statements so that managers and auditors could follow the logic."
  - question: "Who created COBOL?"
    answer: "No single person created COBOL. The CODASYL committee defined it in 1959 and 1960, convened with backing from the US Department of Defense. Grace Hopper did not write the specification herself, but her earlier language FLOW-MATIC heavily shaped the English-like design. Many people from industry, academia, and government contributed to the first standard."
  - question: "Is COBOL still used in 2026?"
    answer: "Yes, heavily. Banks, insurers, and government agencies still run core systems written in COBOL on mainframes. Industry estimates put hundreds of billions of lines in production, processing a large share of daily financial transactions. The code is rarely rewritten because it is proven, audited, and tied to systems that cannot fail."
---

COBOL, short for COmmon Business-Oriented Language, is a high-level language built for business data processing. The CODASYL committee defined it in 1959 and 1960, with backing from the US Department of Defense. Its English-like syntax let programs read almost like prose, so that non-specialists could follow the logic.

<figure class="bz-figure"><img src="/img/obsidian-lab/lens-cylinder-copper-notext.png" alt="A precision-machined copper lens cylinder resting on dark slate, suggesting a well-formed component built to exact tolerances. The image evokes COBOL's design goal of producing clear, durable business programs that outlast the machines they run on." loading="lazy"><figcaption>COBOL was engineered like a precision part: built for clarity and longevity, so business logic written once could run for decades.</figcaption></figure>

## What it was

Before COBOL, business programs were tied to one machine and written in machine-specific code. A payroll system built for one computer could not move to another. Each vendor offered its own language. Companies that switched hardware often rewrote everything from scratch.

COBOL changed two things at once. It set a common standard, so a program could run on machines from different vendors. It also made the source readable. You wrote statements like `ADD OVERTIME-PAY TO GROSS-PAY GIVING TOTAL-PAY`, close to a sentence an accountant would understand.

Think of a legal contract. A contract uses plain, structured language so that parties, lawyers, and courts all read the same meaning. COBOL aimed for the same clarity. A manager or auditor could read the code and check that the rules matched the business policy.

The language splits a program into four divisions. The Identification Division names it. The Environment Division describes the machine and files. The Data Division defines the records and fields. The Procedure Division holds the logic. This rigid structure made large programs easier to navigate and maintain.

<div class="bz-arch">
  <div class="bz-arch-layer"><span class="bz-arch-layer-label">Identification</span><div class="bz-arch-layer-content"><span class="bz-arch-chip">Program name</span><span class="bz-arch-chip-note">Who wrote it and what it is called</span></div></div>
  <div class="bz-arch-layer"><span class="bz-arch-layer-label">Environment</span><div class="bz-arch-layer-content"><span class="bz-arch-chip">Machine</span><span class="bz-arch-chip">File mapping</span><span class="bz-arch-chip-note">Ties the program to hardware and storage</span></div></div>
  <div class="bz-arch-layer"><span class="bz-arch-layer-label">Data</span><div class="bz-arch-layer-content"><span class="bz-arch-chip">Records</span><span class="bz-arch-chip">Fields</span><span class="bz-arch-chip-note">Describes the shape of every record</span></div></div>
  <div class="bz-arch-layer"><span class="bz-arch-layer-label">Procedure</span><div class="bz-arch-layer-content"><span class="bz-arch-chip">Business logic</span><span class="bz-arch-chip-note">The steps that read, compute, and write data</span></div></div>
</div>

## Why it mattered

COBOL made business computing portable and durable. The same program could move across vendors, which freed companies from being locked to one manufacturer. That portability was rare and valuable in the early 1960s.

Its readability changed who could work with code. Because statements read like English, more people could understand and review business programs. This widened the pool of programmers and helped large organisations trust their systems.

The US government pushed adoption hard. Federal agencies required COBOL support on machines they bought, which forced vendors to provide compilers. That mandate turned COBOL into a near-universal standard for administrative and financial computing.

COBOL also advanced the idea of a formal language standard. The American National Standards Institute published COBOL standards starting in 1968, with major revisions later. A program written to the standard ran on many compilers, which made business code a long-lived asset rather than a single-machine artifact.

## How it connects to AI today

COBOL still sits underneath a large share of the data that modern AI consumes. Banks, insurers, and government agencies run their core ledgers on COBOL systems. When an AI model scores credit risk, detects fraud, or forecasts cash flow, the training data often originates in transactions a COBOL program wrote. A builder meets COBOL the moment a project touches enterprise finance data.

This creates a concrete integration problem. Modern AI tools live in Python, on cloud platforms, behind APIs. COBOL records live on mainframes in fixed-width formats. Teams build pipelines that extract mainframe data, convert it, and feed it to models and analytics. Tools from IBM, AWS, and others offer mainframe connectors precisely to bridge this gap.

The language itself is now an AI use case. Large organisations want to modernise or document decades-old COBOL with too few people who can read it. Vendors including IBM and Google have built code assistants that explain COBOL, translate it to Java, and generate tests. IBM's watsonx Code Assistant for Z is one public example aimed at this exact task. So an AI model is increasingly the tool used to understand and migrate legacy COBOL.

There is a workforce angle too. The shortage of COBOL programmers is a known operational risk for banks and agencies. AI assistants help a smaller team maintain systems they did not write. The English-like syntax that made COBOL readable for humans also makes it tractable for language models trained on text.

## Still in use today

COBOL is legacy-accepted. It is old, proven, and still in heavy active service, even though almost no new systems start in it. The language evolved through ANSI and ISO standards, gaining structured programming, then object-oriented features, while keeping its core business strengths.

It persists for clear reasons. Decades of audited business logic, validated against real money and regulators, are written in COBOL. Rewriting that code risks errors in systems that handle payroll, pensions, and payments where failure is unacceptable. The cost and risk of replacement usually outweigh the cost of maintenance.

Modern platforms keep it running. IBM mainframes still execute COBOL at massive scale, and compilers exist for other systems, including Micro Focus and the open-source GnuCOBOL. Industry estimates describe hundreds of billions of lines in production and a large share of daily financial transactions touching COBOL code.

Replacement happens slowly, system by system, often by wrapping COBOL behind APIs rather than removing it. New code rarely uses COBOL outside these existing estates. The old code, though, is maintained, extended, and trusted. That is the heart of legacy-accepted: too critical to retire, too embedded to ignore.

## Further reading

- [IT History Timeline](/explore/it-timeline/): see where COBOL sits among the milestones of computing.
- [AI Learning Galaxy](/explore/galaxy/): explore how early computing connects to modern AI concepts.
- [FORTRAN (1957)](/history/fortran/): the scientific counterpart to COBOL, born in the same high-level language era.
- [The first compiler](/history/compiler/): Grace Hopper's work on compilers that led toward English-like languages.
- [COBOL on Wikipedia](https://en.wikipedia.org/wiki/COBOL): the language, its history, divisions, and modern standards.
- [Grace Hopper and FLOW-MATIC (Computer History Museum)](https://computerhistory.org/profile/grace-murray-hopper/): the work that shaped COBOL's readable design.
- [GnuCOBOL project](https://gnucobol.sourceforge.io/): a free, open-source COBOL compiler still maintained today.
