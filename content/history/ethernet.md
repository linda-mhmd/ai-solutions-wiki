---
title: "Ethernet"
description: "The local area network technology that lets computers share one medium and resolve collisions, and still the dominant standard for wired networking today."
date: 2026-06-23
categories: [History]
tags: [ethernet, networking, lan, csma-cd, infrastructure, history]
related:
  - explore/it-timeline
  - explore/galaxy
  - history/arpanet
  - history/shannon-info
  - history/integrated-circuit
faqs:
  - question: "Who invented Ethernet and when?"
    answer: "Robert Metcalfe and David Boggs created Ethernet at Xerox PARC. Metcalfe's foundational memo describing the idea dates to 1973, and the paper that defined it for the wider world appeared in Communications of the ACM in 1976."
  - question: "What does CSMA/CD mean?"
    answer: "It stands for carrier sense multiple access with collision detection. A device listens before sending (carrier sense), many devices share one medium (multiple access), and senders watch for two messages overlapping (collision detection), then back off and retry."
  - question: "Is Ethernet still used today?"
    answer: "Yes, very much so. Almost every wired connection in homes, offices, and data centres uses Ethernet. The shared cable and collisions are gone, but the frame format and the name endure across speeds from megabits to terabits per second."
---

Ethernet is a local area network technology that lets many computers share one transmission medium and recover gracefully when two of them transmit at once. Robert Metcalfe and David Boggs created it at Xerox PARC, with Metcalfe's foundational memo dating to 1973. It became the dominant standard for wired networking and still carries most of the world's data inside buildings and data centres.

<figure class="bz-figure">
  <img src="/img/timeline/ethernet.jpg" alt="Photograph of Robert Metcalfe" loading="lazy">
  <figcaption>Photograph of Robert Metcalfe. CC BY-SA 3.0 · Andreu Veà, WiWiW.org · <a href="https://commons.wikimedia.org/wiki/File:With_Bob_Metcalfe_(cropped).jpg" target="_blank" rel="noopener nofollow">source</a></figcaption>
</figure>

## What it was

Ethernet solved a basic problem. How do you let many computers in one building talk to each other over a single shared wire without a central controller deciding who speaks?

The answer was a polite protocol called carrier sense multiple access with collision detection, or CSMA/CD. Each device listens to the cable first. If it hears traffic, it waits. If the line is quiet, it transmits. Two devices can still start at the same moment, which creates a collision. Both detect the clash, stop, wait a random interval, and try again.

Think of a dinner table where everyone shares one conversation. You listen before you speak. If two people start together, both pause, then one waits a little longer than the other before trying again. No host assigns turns, yet the table still works.

Metcalfe named it after the "luminiferous ether", the imagined substance through which light was once thought to travel. The cable was the shared medium, the ether through which data flowed. Data moved in units called frames, each carrying a source address, a destination address, and a payload.

<div class="bz-flow">
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Step 1</span><span class="bz-flow-step-name">Listen</span><span class="bz-flow-step-desc">A device senses the shared cable to check whether another station is already transmitting.</span></div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Step 2</span><span class="bz-flow-step-name">Transmit</span><span class="bz-flow-step-desc">If the line is quiet, the device sends its frame, addressed to a destination on the network.</span></div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Step 3</span><span class="bz-flow-step-name">Detect collision</span><span class="bz-flow-step-desc">If two frames overlap, both senders notice the garbled signal and stop transmitting at once.</span></div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Step 4</span><span class="bz-flow-step-name">Back off and retry</span><span class="bz-flow-step-desc">Each sender waits a random time, then listens again and resends, so the network self-heals.</span></div>
</div>

## Why it mattered

Before Ethernet, connecting computers in one building meant expensive, vendor-specific wiring. Ethernet offered something simpler and cheaper. One coaxial cable could link dozens of machines, and any of them could join by tapping in.

That low cost mattered. As personal computers and workstations spread through the late 1970s and 1980s, offices needed a way to share files and printers. Ethernet fit the need. It was fast enough, cheap enough, and open enough to win.

Openness was decisive. Digital Equipment Corporation, Intel, and Xerox published a joint specification known as DIX in 1980. That work fed into the IEEE 802.3 standard, first published in 1983. A neutral, documented standard let many vendors build compatible equipment, which drove prices down and adoption up. Rival schemes such as Token Ring faded as Ethernet kept getting faster and cheaper.

## How it connects to AI today

Every large AI system runs on networks descended from Ethernet. Training a modern model means thousands of GPUs exchanging gradients constantly. That traffic moves over Ethernet links, now running at speeds of 100, 400, or 800 gigabits per second, with the same frame format Metcalfe's team defined.

The shared cable and collisions are long gone. Modern Ethernet uses switches and dedicated point-to-point links, so two devices no longer fight for one wire. CSMA/CD is now disabled on full-duplex links. What survives is the frame, the addressing scheme, and the name. The protocol evolved while keeping its core contract intact.

In AI data centres, Ethernet competes directly with InfiniBand for the high-speed fabric between accelerators. The Ultra Ethernet Consortium, formed in 2023, develops Ethernet specifically for large AI and HPC clusters, tuning it for the bursty, all-to-all traffic that model training creates. RDMA over Converged Ethernet, known as RoCE, lets GPUs read each other's memory across the network with low overhead.

A builder meets Ethernet constantly. The RJ45 port on a laptop, the cable into a wall jack, the switch in a server rack, and the network interface card in a cloud instance are all Ethernet. When you provision a virtual machine to run inference or fine-tune a model, its virtual network adapter speaks Ethernet frames. The wiring inside that hyperscale data centre, the fabric feeding your API call to a hosted model, is Ethernet at scale.

## Still in use today

Ethernet is active and thriving. It is one of the most successful standards in computing history, maintained continuously by the IEEE 802.3 working group for more than four decades.

The technology persists because it adapts. The original ran at about 3 megabits per second on a shared coaxial cable in 1973, and the 1980 commercial version ran at 10 megabits per second. Today twisted-pair and fibre versions reach hundreds of gigabits, and standards bodies are defining terabit-class links. Each generation keeps backward compatibility in spirit, so the ecosystem of cables, connectors, and skills carries forward.

Wireless networking, mostly Wi-Fi under IEEE 802.11, replaced Ethernet for casual device connections. People rarely plug a phone into a cable. Yet behind the scenes the wireless access point connects to the rest of the world over Ethernet. For anything that needs reliability, low latency, or raw throughput, such as data centres, server rooms, and serious workstations, Ethernet remains the default. It did not get replaced. It became the foundation everything else sits on.

## Further reading

- [IT History Timeline](/explore/it-timeline/): see where Ethernet sits among the milestones of computing.
- [AI Learning Galaxy](/explore/galaxy/): explore how networking connects to the wider map of AI and computing.
- [ARPANET](/history/arpanet/): the wide-area network that, alongside Ethernet's local networks, shaped the internet.
- [Claude Shannon and information theory](/history/shannon-info/): the mathematics of signals and noise that underpins reliable transmission.
- [Ethernet (Wikipedia)](https://en.wikipedia.org/wiki/Ethernet): a thorough overview of the standard, its history, and its variants.
- [Metcalfe and Boggs, "Ethernet: Distributed Packet Switching for Local Computer Networks" (CACM, 1976)](https://dl.acm.org/doi/10.1145/360248.360253): the foundational paper that introduced Ethernet to the wider field.
- [IEEE 802.3 Ethernet Working Group](https://www.ieee802.org/3/): the body that maintains and extends the Ethernet standard today.
