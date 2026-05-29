---
title: "Level 0: The Foundation"
description: "Computers and the internet. How hardware works, how networks transmit data, and why every piece of software ultimately runs on physical machines."
date: 2026-05-29
level_num: 0
tags: ["beginner", "foundation", "computer-science"]
---

<figure class="bz-figure">
  <img src="/img/dark-cherry/grid-foundation.png" alt="Dark industrial floor with glowing red neon grid seams running in precise lines: the invisible infrastructure beneath every digital system." loading="lazy">
  <figcaption>Every cloud service, every API, every AI model runs on physical hardware connected by physical networks. Level 0 is where that reality becomes visible.</figcaption>
</figure>

<span class="bz-section-label">Level 0 of 4</span>

## The foundation beneath everything

Before containers, before APIs, before language models, there is hardware. Processors, memory, storage, and cables. Software is instructions. Instructions need a machine to run on. Networks carry results from one machine to another.

Level 0 covers exactly that physical and network reality. Two articles. No prior knowledge assumed. By the end, you have the mental model that makes every later concept make sense.

---

## What you know after Level 0

<div class="bz-arch">
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Hardware</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">CPU</span>
      <span class="bz-arch-chip">RAM</span>
      <span class="bz-arch-chip">Storage</span>
      <span class="bz-arch-chip">GPU</span>
      <span class="bz-arch-chip-note">Four components that define every computing device, from phone to data centre server</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Operating System</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Windows / macOS / Linux</span>
      <span class="bz-arch-chip">iOS / Android</span>
      <span class="bz-arch-chip-note">The software layer that manages hardware and lets applications run on top</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Networking</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">IP addresses</span>
      <span class="bz-arch-chip">DNS</span>
      <span class="bz-arch-chip">TCP/IP</span>
      <span class="bz-arch-chip">HTTP</span>
      <span class="bz-arch-chip-note">Protocols that define how data travels from one machine to another, globally</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Data encoding</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Bits and bytes</span>
      <span class="bz-arch-chip">Packets</span>
      <span class="bz-arch-chip">Binary</span>
      <span class="bz-arch-chip-note">How everything, text, images, video, becomes numbers that machines can transmit and store</span>
    </div>
  </div>
</div>

---

## Learning path

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Start here</span>
    <span class="bz-flow-step-name">Hardware basics</span>
    <span class="bz-flow-step-desc">CPU, RAM, storage, GPU. What each does and why the four work together.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Layer 2</span>
    <span class="bz-flow-step-name">Operating systems</span>
    <span class="bz-flow-step-desc">The software that sits between hardware and applications. Why it exists and what it manages.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Layer 3</span>
    <span class="bz-flow-step-name">Network protocols</span>
    <span class="bz-flow-step-desc">IP, DNS, TCP. The agreed standards that let any machine talk to any other machine.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Layer 4</span>
    <span class="bz-flow-step-name">Data transmission</span>
    <span class="bz-flow-step-desc">How data becomes packets, travels across fibre and radio, and reassembles at its destination.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Ready</span>
    <span class="bz-flow-step-name">Level 1</span>
    <span class="bz-flow-step-desc">You now understand what runs software and how machines communicate. Level 1 starts where this ends.</span>
  </div>
</div>

---

## Before and after

| | Before Level 0 | After Level 0 |
|---|---|---|
| **Hardware** | "My laptop has 16GB" but no idea what that means | RAM holds running processes; storage holds files; 16GB RAM means 16 billion bytes of working memory |
| **The internet** | "Data goes through the internet somehow" | IP addresses identify machines; DNS translates names; TCP breaks data into packets and reassembles them |
| **Cloud vs local** | Both run software, unclear what differs | Cloud is hardware in a data centre; local is hardware on your desk; the OS and protocols are identical |
| **AI hardware** | "AI needs special computers" | GPUs run AI because they do parallel arithmetic; the same GPUs that render games train language models |
| **Network delays** | "It's slow" | Latency is the physical time for packets to travel; distance and hops between servers are measurable |
| **Crashes and failures** | "It stopped working" | Hardware state, OS resource limits, and network failures are distinct, diagnosable categories |

---

## Articles in this level

### [What is a Computer?](/basics/what-is-a-computer/)

The four components that define any computing device, from a phone to a server rack. Covers CPU, RAM, storage, and GPU in plain English. Explains why binary is the underlying language of all digital systems and why GPUs became the hardware of the AI era. Includes the layered architecture diagram from transistor to application.

**You should read this if:** You use software every day but could not explain what a CPU does or why a server is different from a laptop.

### [What is the Internet?](/basics/what-is-the-internet/)

How data moves between machines across the globe. Covers IP addresses, DNS, TCP/IP, HTTP, and the physical infrastructure of cables and routers that make global communication possible. Explains what actually happens between the moment you press Enter and the moment a webpage appears.

**You should read this if:** You know the internet exists but have never thought about what IP addresses are, what DNS resolves, or why some requests are slower than others.

---

## Why this matters in practice

Knowing the physical and network layer beneath software is not optional background knowledge. It shapes real decisions.

**Scale decisions**: When a product team asks "can this handle a million users?", the answer depends on CPU cores, memory limits, network bandwidth, and database connections. You cannot answer that question without understanding what those terms mean at a hardware level.

**Latency decisions**: "Why is the API slow for users in Australia?" is a geography and network question. Understanding that packets travel at the speed of light across physical cables makes that question answerable. Putting a CDN edge node closer to those users reduces the physical distance data travels.

**AI infrastructure decisions**: Every language model runs on GPU clusters. Every inference request is a network call. The cost of running an AI product is, at its core, a compute and bandwidth cost. Level 0 gives you the vocabulary to read a cloud bill and understand what you are paying for.

**Debugging conversations**: When an engineer tells you "the pod ran out of memory" or "the DNS change hasn't propagated yet", you will follow the conversation instead of nodding along. That matters in sprint reviews, incident retrospectives, and vendor negotiations.

---

## What comes next

<div class="bz-arch">
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">You are here</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Level 0: The Foundation</span>
      <span class="bz-arch-chip-note">Hardware, operating systems, networks, data transmission</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Up next</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Level 1: How Code Works</span>
      <span class="bz-arch-chip-note">Terminals, file systems, instructions, and how code becomes running software</span>
    </div>
  </div>
</div>

**[Start Level 1: How Code Works →](/levels/level-1/)**

The terminal is the direct interface to everything you learned in Level 0. Level 1 shows you how developers use it and what code actually is.

---

## Further reading

- [What is a Computer?](/basics/what-is-a-computer/): the four-component hardware model explained for non-engineers
- [What is the Internet?](/basics/what-is-the-internet/): global data transmission, DNS, and TCP/IP in plain English
- [CS50 by Harvard](https://cs50.harvard.edu/x/): the most rigorous free introduction to computer science available; starts at binary
- [How the Internet works, Mozilla Developer Network](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Web_mechanics/How_does_the_Internet_work): authoritative technical overview with diagrams
- [Crash Course Computer Science](https://www.youtube.com/playlist?list=PL8dPuuaLjXtNlUrzyH5r6jN9ulIgZBpdo): 40-episode YouTube series from binary arithmetic to machine learning
- [Cloudflare Learning Center](https://www.cloudflare.com/learning/): free reference on DNS, HTTP, networking, and security with clear diagrams
