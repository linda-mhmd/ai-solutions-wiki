---
title: "Networked Email and the @ Sign (1971)"
description: "How Ray Tomlinson's 1971 network email and the @ sign let people on different computers reach each other, and why both still run the internet today."
date: 2026-06-23
categories: [History]
tags: [email, arpanet, networking, protocols, internet-history, messaging]
related:
  - explore/it-timeline
  - explore/galaxy
  - history/arpanet
  - history/von-neumann
  - history/eniac
faqs:
  - question: "Who invented networked email and the @ sign?"
    answer: "Ray Tomlinson, an engineer at BBN, sent the first network email across the ARPANET in 1971. He picked the @ sign to separate the user name from the host computer name. The symbol already meant 'at' in commerce, so it read naturally as 'user at host'."
  - question: "Was email the first way computers sent messages?"
    answer: "No. Early time-sharing systems let users on the same machine leave messages for each other in shared files. Tomlinson's step was crossing machines. He linked a local message program with a file-transfer program so mail could travel between separate computers on a network."
  - question: "Is the 1971 email design still used today?"
    answer: "Yes, in spirit. The user@host address format is unchanged. Modern mail runs on SMTP, IMAP, and POP3 instead of the original ARPANET tools, but the addressing idea and the store-and-forward model still shape every message you send."
---

Networked email let a person on one computer send a message to a person on a different computer over the ARPANET. In 1971, Ray Tomlinson at the firm BBN built this by combining two existing programs and chose the @ sign to address mail across machines. That single symbol still sits in every email address, social handle, and many code identifiers today.

<figure class="bz-figure">
  <img src="/img/timeline/email.jpg" alt="Photograph of Ray Tomlinson" loading="lazy">
  <figcaption>Photograph of Ray Tomlinson. CC BY-SA 3.0 · Andreu Veà, WiWiW.org · <a href="https://commons.wikimedia.org/wiki/File:Ray_Tomlinson.jpg" target="_blank" rel="noopener nofollow">source</a></figcaption>
</figure>

## What it was

Before 1971, people could already leave each other notes inside a single shared computer. Time-sharing machines let many users log in at once. A user wrote a message into a common file, and the recipient read it when they next logged in. The catch was simple. Both people had to use the same machine.

Tomlinson worked on the ARPANET, the research network that connected separate computers across the United States. He had two tools on hand. One was SNDMSG, a program that wrote local messages into a user's mailbox file. The other was CPYNET, an experimental program that copied files from one machine to another over the network.

Tomlinson connected them. He modified SNDMSG so it could hand a message to CPYNET, which carried it to a mailbox on a remote computer. To name the destination, he needed a format that said both who and where. He chose the @ sign because it was on the keyboard, it was rarely used in names, and it already meant "at" in pricing. The address became user@host, read as "this user at that machine."

<div class="bz-flow">
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Step 1</span><span class="bz-flow-step-name">Compose</span><span class="bz-flow-step-desc">Sender writes a message in SNDMSG and addresses it as user@host.</span></div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Step 2</span><span class="bz-flow-step-name">Read the @</span><span class="bz-flow-step-desc">The program splits the address. Left of @ is the user, right of @ is the target machine.</span></div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Step 3</span><span class="bz-flow-step-name">Transfer</span><span class="bz-flow-step-desc">CPYNET copies the message across the ARPANET to the remote host.</span></div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Step 4</span><span class="bz-flow-step-name">Deliver</span><span class="bz-flow-step-desc">The remote machine appends the message to the recipient's mailbox file.</span></div>
</div>

The real-world analogy is the postal system. A letter needs a name and an address. The name finds the person inside a building. The street and city find the building itself. The @ sign does the same work in one line. It marks where the person stops and the location begins.

## Why it mattered

Email turned the ARPANET from a tool for sharing files and running programs into a way for people to talk. That shift was larger than it sounds. The network was built to share scarce computers. Within a few years, person-to-person mail became one of its heaviest uses.

The design choices held up under pressure. The store-and-forward model meant a message waited in a mailbox until the recipient was ready. Nobody had to be online at the same moment. The user@host format scaled cleanly. Add a new machine to the network, and its users were reachable at once, with no central directory to update.

The @ sign also solved a human problem. It gave a global address a clear, readable shape. People could write an address on paper, say it aloud, and type it without confusion. That clarity helped email spread far beyond the research labs where it began.

## How it connects to AI today

The 1971 design is the backbone of how machines and AI systems still find each other. Every API call to a model provider, every webhook, every login uses addresses built on the same principle Tomlinson set. A name identifies the thing you want. A separator marks where the location begins.

The @ sign itself spread into modern computing far past mail. Developers use it to tag people in code reviews and to mention users in chat tools. Python decorators start with @. Many config files and AI agent frameworks use @-handles to route a request to a named agent or tool. When you type a command to an AI assistant and reference @file or @agent, you echo the 1971 idea of "address this to a specific target."

Email is also a primary surface where AI now works. Spam filters were one of the first large-scale machine learning successes, trained to sort wanted mail from junk. Today's assistants summarize threads, draft replies, and extract action items. AI agents send and receive email to book travel, chase invoices, and file reports. They authenticate with provider APIs, then speak the same store-and-forward protocols a human client uses.

A builder meets this history directly. Connect an agent to the [Gmail or Microsoft mail API](https://developers.google.com/workspace/gmail/api/guides), and you handle user@host addresses, SMTP for sending, and IMAP for reading. The plumbing is modernized, but the address grammar is the one from 1971.

## Still in use today

Networked email is fully active and one of the longest-lived designs in computing. The original ARPANET programs, SNDMSG and CPYNET, are long retired. The concepts they introduced are not.

The user@host address format survives unchanged after more than fifty years. The transport moved to open standards: SMTP carries mail between servers, while IMAP and POP3 let clients fetch it. These protocols are maintained by the Internet Engineering Task Force and updated as security needs grow, with additions like encryption and sender authentication.

Email persists because it is decentralized and open. No single company owns it. Anyone can run a mail server, and any address can reach any other across providers. That neutrality is why it remains the default identity for account signups, password resets, and machine-to-machine alerts. Newer chat and messaging tools sit on top of email or beside it, but none have replaced its role as the internet's universal mailbox.

## Further reading

- [IT History Timeline](/explore/it-timeline/): where networked email sits among the milestones of computing.
- [AI Learning Galaxy](/explore/galaxy/): explore how messaging and AI concepts connect across the wiki.
- [ARPANET](/history/arpanet/): the research network that carried the first email.
- [John von Neumann and the stored-program computer](/history/von-neumann/): the machine design that made programs like SNDMSG possible.
- [Ray Tomlinson on the first email, BBN](https://www.raytheon.com/news/feature/ray-tomlinson-inventor-email): the inventor's own account of the 1971 message and the @ choice.
- [RFC 5321: Simple Mail Transfer Protocol](https://datatracker.ietf.org/doc/html/rfc5321): the current standard that governs how email travels between servers.
- [History of email (Wikipedia)](https://en.wikipedia.org/wiki/History_of_email): a broad, sourced overview of email's development from the 1960s onward.
