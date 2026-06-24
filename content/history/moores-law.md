---
title: "Moore's Law"
description: "Moore's law is the 1965 observation that the number of components on a chip doubles at a steady pace, and it set the rhythm for sixty years of computing and AI progress."
date: 2026-06-23
categories: [History]
tags: [moores-law, semiconductor, chips, hardware, history, scaling]
related:
  - explore/it-timeline
  - explore/galaxy
  - history/integrated-circuit
  - history/transistor
  - history/intel-4004
faqs:
  - question: "Is Moore's law a law of physics?"
    answer: "No. It is an observation about an industry, not a law of nature. Gordon Moore noticed a trend in 1965 and predicted it would continue. The trend held because chipmakers chose to keep meeting it. It became a self-fulfilling roadmap, not a force like gravity."
  - question: "Did Moore say transistors double every 18 months?"
    answer: "Not exactly. His 1965 paper described components doubling about every year. In 1975 he revised the pace to roughly every two years. The popular 18-month figure came later from others, partly by folding in speed gains. The widely cited version is a doubling every two years."
  - question: "Is Moore's law dead?"
    answer: "The classic version has slowed. Shrinking transistors gets harder and more costly each generation as features approach atomic scale. Progress now comes more from chip design, stacking, and specialised hardware than from raw density alone. The trend persists in a changed form rather than ending cleanly."
---

Moore's law is the 1965 observation by Gordon Moore that the number of components on an integrated circuit was doubling at a regular pace. It was a forecast, not a law of nature, yet it shaped the semiconductor industry for decades. The prediction became a shared target that engineers worked to meet, and it set the steady rhythm of cheaper, faster computing.

<figure class="bz-figure">
  <img src="/img/timeline/moores-law.png" alt="Photograph of Gordon Moore" loading="lazy">
  <figcaption>Photograph of Gordon Moore. CC BY-SA 2.0 · Intel Free Press · <a href="https://commons.wikimedia.org/wiki/File:Gordon_Moore_1978_(cropped).png" target="_blank" rel="noopener nofollow">source</a></figcaption>
</figure>

## What it was

In April 1965, Gordon Moore wrote an article for Electronics magazine titled "Cramming more components onto integrated circuits." He was then at Fairchild Semiconductor and later co-founded Intel. He looked at a few years of chip data and spotted a clear trend.

The number of components that fit on a chip, at the lowest cost per component, had been doubling roughly every year. Moore predicted this doubling would continue for at least a decade. In 1975 he revised the pace to about every two years as the technology matured.

Think of a city block. In year one, you fit one house on it. The next year you fit two, then four, then eight, each one smaller and cheaper than the last. The land stays the same size, but it holds far more. Moore saw chips following that same compounding curve.

The doubling is exponential, not steady addition. Each step builds on the one before. Over many years, this turns a handful of components into billions on a single piece of silicon.

<div class="bz-flow">
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Step 1</span><span class="bz-flow-step-name">Observe</span><span class="bz-flow-step-desc">Moore plots component counts on chips over a few early years.</span></div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Step 2</span><span class="bz-flow-step-name">Predict</span><span class="bz-flow-step-desc">He forecasts a steady doubling, later set at about every two years.</span></div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Step 3</span><span class="bz-flow-step-name">Target</span><span class="bz-flow-step-desc">Chipmakers adopt the pace as a planning goal and roadmap.</span></div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Step 4</span><span class="bz-flow-step-name">Compound</span><span class="bz-flow-step-desc">Decades of doubling turn dozens of components into billions per chip.</span></div>
</div>

## Why it mattered

Moore's law turned a guess into a plan. Once the whole industry agreed on the pace, it became a coordination tool. Chip designers, equipment makers, and software firms all built their schedules around the next doubling.

This shared expectation drove huge, confident investment. A company could spend on a new factory knowing the market would demand denser chips on a known timeline. The forecast reduced risk by making the future feel predictable.

The economic effect was profound. The cost of computing fell by orders of magnitude. A calculation that needed a room-sized machine in the 1960s ran on a desktop within a generation, then on a phone. Software grew bolder because hardware kept catching up.

Moore's law also set a cultural mindset. Engineers learned to assume that next year's hardware would be faster and cheaper. That assumption made ambitious projects worth starting, since the machines to finish them would arrive on schedule.

## How it connects to AI today

Modern AI exists because Moore's law delivered cheap, abundant computation. The deep learning boom rests on hardware that grew dense enough to make large models practical.

The numbers tell the story. The [Intel 4004](/history/intel-4004/) of 1971 held around 2,300 transistors. Today a single AI accelerator packs tens of billions onto one chip. That gap is sixty years of doubling, the exact trend Moore described, applied to the [integrated circuit](/history/integrated-circuit/).

Training a large language model takes vast numbers of arithmetic operations. Only the steep fall in cost per operation made that affordable. The GPU, packed with thousands of small cores, is the clearest example of Moore-era density turned toward AI maths.

A builder meets this trend whenever they choose hardware or read a cloud bill. The price of a training run reflects how much compute a euro now buys. Specialised chips such as Google's TPUs and custom accelerators from Amazon and Microsoft push the same goal of more useful operations per chip.

There is a twist worth knowing. As classic transistor scaling slows, AI compute keeps rising through other means. Researchers now track separate curves for how fast the compute used to train top models grows, and it has climbed faster than Moore's law for years. The gains come from larger clusters, better chip design, and parallel hardware rather than density alone. Moore's law set the foundation, and AI now builds on it with new methods.

## Still in use today

Moore's law is a milestone that remains active in spirit, though strained in its original form. It has shaped roadmaps for sixty years and still anchors how the industry talks about progress.

The classic version has slowed. Shrinking transistors toward atomic scale gets harder, slower, and far more expensive each generation. The simple density doubling no longer arrives on its old clock, and many engineers say the strict law has effectively ended.

What replaced it is a broader toolkit. Chipmakers now gain ground through better architecture, stacking chips in three dimensions, packaging several chiplets together, and designing hardware for specific workloads like AI. These methods extend the spirit of Moore's law without relying only on smaller features.

The phrase endures because it captured something real and useful. It taught the industry to expect and plan for exponential improvement. Even as the original curve flattens, that expectation still drives the search for the next source of speed. Moore's law persists as a mindset and a benchmark long after its first decade of validity passed.

## Further reading

- [IT History Timeline](/explore/it-timeline/): see where Moore's law sits among other computing milestones.
- [AI Learning Galaxy](/explore/galaxy/): explore how hardware progress connects to modern AI topics.
- [Integrated Circuit](/history/integrated-circuit/): the chip whose growing component count Moore's law tracked.
- [The Transistor](/history/transistor/): the single switch that chips now pack by the billion.
- [Moore's law (Wikipedia)](https://en.wikipedia.org/wiki/Moore%27s_law): a broad overview of the observation, its history, and its limits.
- [Cramming more components onto integrated circuits (original 1965 paper, IEEE)](https://ieeexplore.ieee.org/document/4785860): a reprint of Gordon Moore's primary article in Electronics magazine.
