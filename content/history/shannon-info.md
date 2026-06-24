---
title: "Shannon: Switching Logic and Information Theory"
description: "Claude Shannon's 1937 thesis showed switching circuits can do Boolean logic, and his 1948 paper defined information mathematically, gave us the bit, and set the limits of reliable communication."
date: 2026-06-23
categories: [History]
tags: [claude-shannon, information-theory, boolean-algebra, the-bit, switching-circuits, milestone]
related:
  - explore/it-timeline
  - explore/galaxy
  - history/boolean-algebra
  - history/transistor
  - history/turing-machine
faqs:
  - question: "What was Claude Shannon's 1937 thesis about?"
    answer: "His MIT master's thesis showed that electrical switching circuits made of relays can carry out Boolean algebra. A switch that is on or off maps onto a logic value of true or false. This made it possible to design and analyse digital logic with mathematics instead of trial and error."
  - question: "What is a bit and where did the word come from?"
    answer: "A bit is the smallest unit of information, a single yes or no, one or zero. Shannon's 1948 paper popularised the term, crediting the statistician John Tukey for coining it. The bit is now the base unit of all digital storage and communication."
  - question: "What is Shannon's main result in information theory?"
    answer: "He proved every communication channel has a maximum rate, its capacity, at which data can be sent with as few errors as you want. Send slower than capacity and reliable communication is possible. Try to send faster and errors become unavoidable."
---

In 1937 Claude Shannon showed that electrical switching circuits can carry out Boolean logic, the on-or-off algebra of true and false. In 1948 his paper A Mathematical Theory of Communication defined information as a measurable quantity, introduced the bit, and set hard limits on reliable communication. Together these two works are the mathematical bedrock of the digital age.

<figure class="bz-figure">
  <img src="/img/timeline/shannon-info.jpg" alt="Photograph of Claude Shannon" loading="lazy">
  <figcaption>Photograph of Claude Shannon. CC BY 2.0 · Unknown author · <a href="https://commons.wikimedia.org/wiki/File:C.E._Shannon._Tekniska_museet_43069_(2x3_crop).jpg" target="_blank" rel="noopener nofollow">source</a></figcaption>
</figure>

## What it was

Shannon's contribution comes in two parts, separated by eleven years.

The first is his 1937 master's thesis at MIT, titled A Symbolic Analysis of Relay and Switching Circuits. At the time engineers wired telephone exchanges from relays, electromechanical switches that click open or closed. They designed these circuits by intuition and testing. Shannon noticed that a switch has two states, open or closed, and that this matches the two values of Boolean algebra, true or false. He showed you can describe any switching network as a logic equation, then reduce that equation to build a smaller, cheaper circuit.

The second part is the 1948 paper. Shannon asked a basic question: what is information, measured precisely? His answer was to count surprise. A message you could easily predict carries little information. A message that resolves real uncertainty carries a lot. He measured this in bits, where one bit is a single yes or no.

Think of a coin toss. Before the toss you do not know the result. The outcome, heads or tails, resolves exactly one bit of uncertainty. A weather forecast for a place where it always rains carries almost no information. A forecast for a place that swings between sun and storm carries much more.

<div class="bz-flow">
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Step 1</span><span class="bz-flow-step-name">Source</span><span class="bz-flow-step-desc">A message is produced, carrying some amount of information measured in bits.</span></div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Step 2</span><span class="bz-flow-step-name">Encode</span><span class="bz-flow-step-desc">A transmitter turns the message into a signal, often compressed and protected against errors.</span></div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Step 3</span><span class="bz-flow-step-name">Channel</span><span class="bz-flow-step-desc">The signal crosses a noisy medium with a fixed maximum capacity.</span></div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Step 4</span><span class="bz-flow-step-name">Decode</span><span class="bz-flow-step-desc">A receiver reconstructs the original message, correcting errors where it can.</span></div>
</div>

## Why it mattered

The 1937 thesis is often called the most important master's thesis of the twentieth century. It gave engineers a way to design digital logic with mathematics rather than guesswork. Every logic gate, every processor, and every digital chip traces its design discipline back to this idea. Boolean algebra, an abstract system from the 1850s, suddenly had a physical home in switches and wires.

The 1948 paper founded an entire field, information theory. Before it, communication was an engineering craft full of rules of thumb. After it, communication had a science with exact quantities and provable limits.

Shannon's deepest result is the channel capacity theorem, also called the noisy-channel coding theorem. He proved that every channel, however noisy, has a fixed capacity. Below that rate you can drive errors as close to zero as you wish, given clever enough coding. Above it, errors become unavoidable. This told engineers that near-perfect communication over an imperfect line is possible, and exactly how fast they could push.

He also separated two jobs that had been tangled together: compression, removing the predictable parts of a message, and error correction, adding controlled redundancy to survive noise. Treating these as distinct problems shaped decades of progress.

## How it connects to AI today

Shannon's work sits underneath almost everything in modern computing and AI, often invisibly.

The switching idea became the digital logic that runs every machine. A transistor is a tiny switch, on or off. Billions of them form the logic gates inside a CPU or a GPU. When a graphics card trains a neural network, it executes the same Boolean operations Shannon mapped onto relays in 1937, now at a scale of trillions per second.

The bit is the universal unit. Model weights, training data, and prompts are all bits. When you read that a large language model has 70 billion parameters stored at 16 bits each, you are quoting Shannon's measure directly. Quantisation, the trick of shrinking a model by storing weights in fewer bits, is an exercise in trading precision against information content.

Information theory shapes how models learn. The standard training objective for language models is cross-entropy loss, which measures, in bits, how surprised the model is by the next token. A model that predicts well has low surprise and low loss. This is Shannon's entropy applied directly. Perplexity, the headline metric for language models, is two raised to that entropy, a Shannon quantity by another name.

Compression and intelligence are now seen as close cousins. Predicting the next word well means modelling the structure of language, which means compressing it. Shannon's source coding theorem set the floor for how far any compressor, neural or classical, can go.

A builder meets these ideas constantly. Every file you store and every token counted against an API limit is a bit count. Error-correcting codes from Shannon's framework protect data in SSDs, mobile signals, QR codes, and deep-space links. The Wi-Fi and 5G that carry your model's responses run as close to channel capacity as engineers can manage.

## Still in use today

Shannon's two contributions are foundational milestones that remain fully active, not legacy curiosities.

Boolean switching logic was never replaced. It was scaled. Relays gave way to vacuum tubes, then transistors, then integrated circuits, but the underlying logic is identical. The on-or-off switch is still the atom of digital hardware.

Information theory is a living field. Its core theorems are settled and taught in every electrical engineering and computer science programme. They guide the design of modems, storage media, and the codes that make streaming and video calls possible. Modern standards like 5G and Wi-Fi 6 lean on coding schemes, such as LDPC and turbo codes, that approach the Shannon limit he proved in 1948.

The concepts persist because they describe limits set by mathematics, not by any one technology. A channel capacity does not become outdated when hardware improves. The hardware only gets closer to the limit Shannon already named. That permanence ranks his work among the deepest results in engineering.

Shannon is widely called the father of information theory, and the unit of information, the shannon, carries his name alongside the more common bit.

## Further reading

- [IT History Timeline](/explore/it-timeline/): where Shannon's work sits among the milestones of computing.
- [AI Learning Galaxy](/explore/galaxy/): explore how foundational ideas connect to modern AI topics.
- [Boolean Algebra](/history/boolean-algebra/): the 1850s logic system Shannon mapped onto electrical switches.
- [The Transistor](/history/transistor/): the switch that turned Shannon's logic into dense, fast hardware.
- [A Mathematical Theory of Communication (1948 paper, PDF)](https://people.math.harvard.edu/~ctm/home/text/others/shannon/entropy/entropy.pdf): Shannon's original paper that founded information theory.
- [Claude Shannon on Wikipedia](https://en.wikipedia.org/wiki/Claude_Shannon): biography and overview of both the thesis and the 1948 paper.
- [A Symbolic Analysis of Relay and Switching Circuits](https://en.wikipedia.org/wiki/A_Symbolic_Analysis_of_Relay_and_Switching_Circuits): the 1937 master's thesis and its lasting influence.
