---
title: "Magnetic-core memory"
description: "Computer memory built from tiny magnetizable ferrite rings on a grid of wires, demonstrated in 1953, that gave machines fast, reliable, non-volatile random access."
date: 2026-06-23
categories: [History]
tags: [core-memory, hardware, mit, whirlwind, computing-history, storage, ferrite]
related:
  - explore/it-timeline
  - explore/galaxy
  - history/transistor
  - history/von-neumann
  - history/eniac
faqs:
  - question: "Who invented magnetic-core memory and when?"
    answer: "Jay Forrester at MIT developed coincident-current magnetic-core memory for Project Whirlwind, a real-time flight simulator and air-defence computer. A working core memory ran in the Whirlwind machine in 1953. An Wang and others also contributed key early ideas about magnetic cores, and patent disputes followed, but Forrester's coincident-current scheme is the design that made large core memories practical."
  - question: "Why was core memory so important?"
    answer: "It gave computers fast random access that did not lose data when power went off. Earlier memory used delay lines or storage tubes that were slow, fragile, or unreliable. Core memory was rugged, dependable, and fast enough to keep up with the processor. It became the standard main memory for roughly twenty years and made computing trustworthy enough for business and defence."
  - question: "Is magnetic-core memory still used today?"
    answer: "No, it is discontinued as a mainstream technology. Semiconductor RAM replaced it in the 1970s because chips were smaller, cheaper, and faster. Core memory survives only in museums, in some very old systems still running, and in the word 'core', which lives on in terms like 'core dump' that programmers still use every day."
---

Magnetic-core memory stored each bit in a tiny ring of magnetizable ceramic, threaded onto a grid of fine wires. The direction a ring was magnetized recorded a one or a zero. Jay Forrester at MIT developed this design for Project Whirlwind, and a working core memory ran in 1953. It gave computers fast, reliable, non-volatile random access, and it served as main memory for about two decades.

<figure class="bz-figure"><img src="/img/obsidian-lab/cycle-five-nodes-notext.png" alt="Five dark grey discs joined in a circle by glowing red connectors on slate, resembling small ring-shaped elements linked on a grid, like the magnetic rings wired together in core memory." loading="lazy"><figcaption>Magnetic-core memory linked thousands of tiny rings on a wire grid, each one a single stored bit, much like these connected ring elements.</figcaption></figure>

## What it was

A magnetic core is a small ring of ferrite, a hard ceramic that can be magnetized. Each ring is a doughnut roughly a millimetre across. A ring holds a magnetic field that points one way around the circle or the other way. One direction means a one. The other means a zero. The ring keeps its state with no power, so the memory is non-volatile.

Thin copper wires run through the rings in a grid. To flip a chosen ring, the machine sends half the needed current down one row wire and half down one column wire. Only the ring where both wires cross gets the full current. That ring flips. All other rings on those wires feel half current, which is too weak to change them. This trick is called coincident-current selection, and it lets one pair of wires address one ring out of many.

Think of a city street grid. Send a weak signal down one avenue and a weak signal across one street. Only the single corner where both signals meet gets a strong enough push to act. Every other corner stays put. That is how core memory picks one bit out of thousands.

<div class="bz-flow">
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Step 1</span><span class="bz-flow-step-name">Select</span><span class="bz-flow-step-desc">Send half current down one row wire and one column wire.</span></div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Step 2</span><span class="bz-flow-step-name">Flip</span><span class="bz-flow-step-desc">Only the ring at the crossing gets full current and changes state.</span></div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Step 3</span><span class="bz-flow-step-name">Sense</span><span class="bz-flow-step-desc">A sense wire detects a voltage pulse if the ring flipped, reading the bit.</span></div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Step 4</span><span class="bz-flow-step-name">Rewrite</span><span class="bz-flow-step-desc">Reading erases the bit, so the machine writes it back at once.</span></div>
</div>

Reading a core is destructive. The act of sensing flips the ring, which wipes the value. So every read is followed by an immediate rewrite to restore it. Engineers built this read-then-restore cycle into the hardware, and it ran fast enough to feel instant.

## Why it mattered

Before core memory, computers struggled to store working data reliably. Mercury delay lines pushed data through tubes of liquid and read it back in a loop, which was slow and sequential. Williams tubes stored bits as charge spots on a screen, but they drifted and failed often. Neither gave dependable, fast, random access.

Core memory fixed this at once. Any address could be reached in the same short time, true random access. The rings held their state through power loss, so a crash did not erase memory. They were rugged and did not drift. Access times reached a few microseconds, fast enough to match the processors of the day.

This reliability changed what computers could be trusted to do. Project Whirlwind needed real-time response for air-defence work, and core memory delivered it. Through the late 1950s and 1960s, core became the standard main memory across the industry. Most mainframes of the era relied on it. Core memory was the dependable workbench on which the computing industry grew up.

## How it connects to AI today

Magnetic-core memory is the direct ancestor of the RAM that every AI system depends on. It established the idea of main memory as a fast, randomly addressable workspace that sits between the processor and slower storage. That role never went away. It was handed to semiconductor chips, then scaled enormously.

The connection is concrete. When you train or run a model, the system holds weights, activations, and input data in RAM, and on a GPU in high-bandwidth memory. That is the same job core memory did: keep the working numbers close to the compute and reachable in any order. The [transistor](/history/transistor/) made it possible to shrink each memory cell from a millimetre-wide ring to a microscopic circuit, so a chip now holds billions of bits where a core plane held thousands.

The deeper inheritance is the [von Neumann](/history/von-neumann/) model, where a single addressable memory holds both data and instructions. Core memory was the first storage rugged and fast enough to serve that model well at scale. Modern AI lives inside the same model and bumps against its limits. The famous memory wall, where moving data costs more than computing on it, is a direct descendant of the gap core memory first bridged.

A builder meets this legacy daily, often through language. A program crash that writes the contents of memory to a file is still called a core dump, decades after the cores vanished. When you size a training run by how much it fits in GPU memory, or when you batch inference to reuse data already loaded, you are managing the same scarce resource Forrester's rings provided. Core memory set the pattern of fast working memory that all of AI computing still follows.

## Still in use today

Magnetic-core memory is discontinued. Semiconductor memory, first static RAM and then dynamic RAM on integrated circuits, replaced it through the early 1970s. Chips were smaller, cheaper to make, faster, and they used far less power. Core memory was hand-threaded or machine-woven at significant cost, and it could not compete once silicon memory matured.

A few traits kept core in service longer than expected. Its non-volatility mattered for spacecraft and military systems, where keeping data through a power loss was vital. The Apollo Guidance Computer used a related rope-core memory for its programs. Some aerospace systems ran on core into the 1980s because the hardware was proven and radiation-tolerant.

Today core memory exists in museums, in restoration projects, and in the vocabulary of computing. The word core survives in core dump and in phrases about a machine's main memory. The technology itself is a closed chapter, but it set the template for the random-access main memory that every computer, phone, and AI accelerator uses now. It persists as an idea rather than a product.

## Further reading

- [IT History Timeline](/explore/it-timeline/): where core memory sits in the wider story of computing hardware.
- [AI Learning Galaxy](/explore/galaxy/): explore how memory and hardware progress connect to modern AI concepts.
- [The transistor](/history/transistor/): the device that let memory cells shrink from rings to microscopic circuits.
- [The von Neumann architecture](/history/von-neumann/): the model of addressable main memory that core memory served so well.
- [Magnetic-core memory (Wikipedia)](https://en.wikipedia.org/wiki/Magnetic-core_memory): detailed history, physics, and patents of the technology.
- [Computer History Museum: memory and storage](https://www.computerhistory.org/revolution/memory-storage/8/253): primary material on core memory and Project Whirlwind.
- [MIT: Project Whirlwind](https://www.mit.edu/~klund/whirlwind/): background on the machine where core memory was first demonstrated.
