---
title: "ARPANET"
description: "The first operational packet-switched computer network and the direct ancestor of the internet, born in 1969."
date: 2026-06-23
categories: [History]
tags: [arpanet, networking, packet-switching, internet, history, infrastructure]
related:
  - explore/it-timeline
  - explore/galaxy
  - history/turing-machine
  - history/shannon-info
  - history/von-neumann
faqs:
  - question: "What was the first message sent over ARPANET?"
    answer: "On 29 October 1969, a team at UCLA tried to log in to a computer at SRI. The system crashed after two characters, so the first text transmitted was 'lo'. The connection worked fully about an hour later."
  - question: "Is ARPANET the same as the internet?"
    answer: "No, but it is the direct ancestor. ARPANET was a single research network. The internet is a network of networks that grew out of ARPANET once the TCP/IP protocols linked many separate networks together in the early 1980s."
  - question: "When was ARPANET shut down?"
    answer: "ARPANET was formally decommissioned in 1990. By then its functions had moved to newer networks built on TCP/IP, including NSFNET, which carried much of the early internet traffic."
---

ARPANET was the first operational packet-switched computer network and the direct ancestor of today's internet. Funded by the US Advanced Research Projects Agency, it connected research computers so they could share data and resources. Its first host-to-host message travelled between UCLA and SRI in 1969, and the ideas it proved still underpin every network you use.

<figure class="bz-figure"><img src="/img/obsidian-lab/mechanical-system-composite-notext.png" alt="A dark composite of industrial machinery: a loom, braided cables, a filing cabinet, and scaffolding, evoking a connected system of separate parts. ARPANET wired separate computers into one working system." loading="lazy"><figcaption>ARPANET wove separate, incompatible computers into a single working system, much like this composite of connected mechanical parts.</figcaption></figure>

## What it was

ARPANET was a network that let computers at different universities and labs talk to each other. Before it, each computer stood alone. To use a machine, you needed to be in the same room or wired directly to it. ARPANET changed that by passing data over shared telephone lines.

The key idea was packet switching. Instead of holding a single phone line open for a whole conversation, ARPANET chopped each message into small packets. Each packet carried its own address. The network routed packets independently, then reassembled them at the destination.

Think of it like a postal system rather than a single dedicated courier. You do not rent a truck for one letter. You drop many letters into a shared system, and each finds its own path to the same address. If one road is blocked, a letter takes another route.

A small computer called an Interface Message Processor, or IMP, sat at each site. The IMP handled the packet routing so the host computer did not have to. The first four IMPs went to UCLA, SRI, UC Santa Barbara, and the University of Utah.

<div class="bz-flow">
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Step 1</span><span class="bz-flow-step-name">Split into packets</span><span class="bz-flow-step-desc">The sending host breaks a message into small numbered packets, each with a destination address.</span></div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Step 2</span><span class="bz-flow-step-name">Hand to the IMP</span><span class="bz-flow-step-desc">The host passes packets to its Interface Message Processor, the dedicated routing computer.</span></div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Step 3</span><span class="bz-flow-step-name">Route hop by hop</span><span class="bz-flow-step-desc">IMPs forward each packet across phone lines, choosing a path toward the destination.</span></div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Step 4</span><span class="bz-flow-step-name">Reassemble</span><span class="bz-flow-step-desc">The receiving IMP and host put the packets back in order and deliver the message.</span></div>
</div>

## Why it mattered

ARPANET proved that packet switching worked at scale. Many engineers had doubted that data could move reliably without a dedicated line. ARPANET showed it could, and it did so cheaply by sharing infrastructure.

The first host-to-host message captured the moment. On 29 October 1969, a UCLA team tried to log in to the SRI machine. The connection crashed after two characters. So the first text ever sent was the word "lo", from an attempt to type "login". The full link worked about an hour later.

ARPANET also forced a culture of open standards. Researchers documented protocols in public notes called Requests for Comments, or RFCs. The RFC process still governs internet standards today. This openness let many groups build compatible software without a central gatekeeper.

By the early 1970s the network spread across the United States and reached Europe. Email emerged on it in 1971 and quickly became its most popular use. The network had become a place people worked, not a lab demo.

## How it connects to AI today

Every modern AI system depends on the network architecture ARPANET pioneered. When you call a large language model, your request travels as packets across the internet to a data centre, gets processed, and returns the same way. That packet-switched, address-based routing is a direct descendant of ARPANET.

ARPANET's most lasting gift is the layered design that became TCP/IP. The work that produced TCP/IP began in the 1970s and let separate networks join into one internet. Today TCP/IP carries every AI API request, every model download, and every token streamed back to your screen.

You meet this layering as a builder constantly. When you send a prompt to an AI provider over HTTPS, your data rides on TCP, which rides on IP, which routes packets exactly as ARPANET's IMPs once did. The principle that a network should move packets and leave intelligence at the edges shaped how distributed AI works now.

Modern AI training depends on the same ideas at huge scale. Training a large model spreads work across thousands of GPUs that exchange gradients over high-speed networks. The pattern is ARPANET's grandchild: many independent machines coordinating by passing addressed messages.

The RFC tradition matters for AI too. Protocols that AI tools rely on, including HTTP and the standards behind APIs and agent communication, are still defined through open, public specifications in the spirit ARPANET started. When you read a spec for an AI integration, you are reading the same kind of document.

## Still in use today

ARPANET itself is legacy and was formally decommissioned in 1990. The original IMPs, the 56 kilobit links, and the early protocols are gone. You will not connect to ARPANET, because it no longer exists as a running network.

What persists is everything it created. Packet switching, layered protocols, the end-to-end principle, and the open standards process are all alive and dominant. They live on in TCP/IP, which runs the entire internet, and in the RFC documents that still define how networks behave.

So ARPANET counts as legacy-accepted: the system is retired, but its design choices are foundational and uncontested. NSFNET and then the commercial internet replaced it, yet they kept its core architecture. Few technologies have been so completely replaced while leaving their ideas so completely intact.

## Further reading

- [IT History Timeline](/explore/it-timeline/): see where ARPANET sits in the wider story of computing.
- [AI Learning Galaxy](/explore/galaxy/): explore how networking connects to modern AI topics.
- [Shannon and information theory](/history/shannon-info/): the mathematics of reliable communication that underpins data networks.
- [The Turing machine](/history/turing-machine/): the theory of computation behind the machines ARPANET connected.
- [ARPANET on Wikipedia](https://en.wikipedia.org/wiki/ARPANET): a detailed history with sources and timelines.
- [A Brief History of the Internet (Internet Society)](https://www.internetsociety.org/internet/history-internet/brief-history-internet/): an account written by several of the network's original designers.
