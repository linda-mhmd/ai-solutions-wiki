---
title: "OpenAI Says Its Model Refuted the Exponential Time Hypothesis: Claimed, Not Yet Checked"
description: "On 26 October 2026 OpenAI published model-written manuscripts claiming a refutation of the Exponential Time Hypothesis and a proof of Sogge's local smoothing conjecture in every dimension, plus a physics result. Independent review has only just started."
date: 2026-10-26
lastmod: 2026-10-28
last_updated: 2026-10-28
last_verified: 2026-10-28
categories: [News]
tags: [openai, ai-for-science, mathematics, theoretical-computer-science, exponential-time-hypothesis, formal-verification, lean, reasoning-models]
related:
  - news/ai-for-science-2026
  - glossary/complexity-classes
  - glossary/time-complexity
  - glossary/reasoning-models
  - news/openai-astra-critical-cyber-threshold
---

On **26 October 2026** OpenAI published a post titled "Working with academic communities to build scientific understanding". Its feed summary says OpenAI "shares model results on the Kakeya conjecture, Exponential Time Hypothesis, and quantum chromodynamics". The two mathematics results are public, as manuscripts with Lean formalizations in OpenAI's `openai/math` repository on GitHub. The physics result is not. All three were produced by a model OpenAI has not named or released. The computer scientists reviewing the complexity result write that, if it is correct, "it will change an important part of theoretical computer science". As of 28 October, nobody outside OpenAI has confirmed any of the three.

## What happened

### The two mathematics manuscripts

The repository's history entry for 26 October says OpenAI "added two new manuscripts with accompanying Lean formalizations". Both PDFs list "OpenAI" as the author.

**"The Exponential Time Hypothesis is False."** The paper, dated "17 October 2026, revised 25 October 2026", describes "a deterministic algorithm that exactly counts satisfying assignments of fixed-width CNF formulas in subexponential time and polynomial space". Its abstract gives a running time of (n+m)^O_k(1) times 2^(n/(log n)^(1/2+o(1))) and says: "Our algorithm refutes the Exponential Time Hypothesis (ETH), which postulates that deciding 3-SAT on n variables requires 2^Ω(n) time in the worst case."

ETH is a conjecture, not a theorem, but a large body of "fine-grained" complexity results is built on assuming it. A refutation would not settle P versus NP: the claimed algorithm is still super-polynomial. The paper's own appendix derives a circuit lower bound for a large complexity class and notes that "it does not assert a superpolynomial circuit lower bound for NP."

One detail matters for anyone reading "formally verified" in coverage. According to the repository's scope note for this result, the Lean formalization proves a **weaker** running-time bound, with (log log n)² in place of log log n, and the sharper bound in the abstract rests on the manuscript. The refutation of ETH follows from either bound, but the exact headline figure is not what Lean checked.

**"Local smoothing for the Euclidean wave equation."** The history entry says it establishes "Sogge's local smoothing for waves in every spatial dimension at least two" and that it "also yields the Kakeya maximal and dimension conjectures and Stein's spherical restriction estimates throughout the interior of the conjectured range." The repository's catalogue entry adds: "In particular, every Euclidean Kakeya set has full Hausdorff dimension." In OpenAI's 6 October catalogue, this result's entry was "Local smoothing in three dimensions", the model's own manuscript dated 24 September. Some coverage says the conjecture was "previously" proved only in three dimensions without saying that the three-dimensional proof was also OpenAI's model output.

### The physics result: no public material

The feed summary names quantum chromodynamics, and Al Jazeera reports OpenAI calling the result "mathematically rigorous". The physics materials are not in the GitHub repository. Al Jazeera reports that the physics group deferred release to write its own interpretation. Press coverage describes an existence result for four-dimensional QCD and Yang-Mills theory that does not address the mass gap, so it would not solve the Millennium Prize problem. We could not check any of that against a primary source, and OpenAI's own post was not readable to our fetch.

### Who is checking

The history entry says: "An independent working group of computer scientists led by Russell Impagliazzo, Ramamohan Paturi, and Ryan Williams will examine and explain the proof. At the group's request, we are making the materials public immediately." The group's open letter is explicit about what its role is not: "Our involvement should not be taken as certification of the claim." It also says: "If the claim is correct, it will change an important part of theoretical computer science." Williams told Al Jazeera: "We are working to verify and examine their proof and determine if it holds up."

On the analysis side, Alex Iosevich of the University of Rochester told Al Jazeera that OpenAI appeared to have "cracked" the local smoothing conjecture and called it a "historic development". He also noted the conjecture was posed by his own doctoral adviser, Christopher Sogge.

### How this connects to the 6 October release

On 6 October OpenAI published "Sharing AI progress in mathematics" and created the `openai/math` repository. Its README at that first commit described "722 manuscripts organized into 372 families" produced by "an unnamed internal OpenAI model", with "each result used three hours of ChatGPT Pro thinking compute" on average across "approximately 4,000 problems". The README calls them "a form of raw research data, rather than polished academic papers" and warns that "Some of the unformalized results could have issues." On 7 October OpenAI withdrew three manuscripts because "a sign error invalidates a stabilization-trace cancellation argument", revised 14 others, and reported 300 of 719 top-line results formalized, about 42 percent. A figure of "377" that circulated in coverage is the highest family number in the catalogue, which has gaps, not a count of results.

## What is actually different

Earlier AI-for-science results, such as those in our [May overview](/news/ai-for-science-2026/), were bounded: an open problem from a list, a counterexample, a contribution under expert guidance. These claims target central conjectures, and the materials come as model output plus machine-checked proofs, released for public scrutiny before peer review, with a named independent review group. That format is new. So is the scale of the claim, and with it the cost of being wrong.

## Why it matters for builders

- **Do not repeat "proved" or "disproved" yet.** The correct wording today is "claimed, with partial Lean formalization, under independent review". The review group has proposed a community meeting before the end of 2026.
- **There is no faster SAT solver to download.** The paper gives asymptotic worst-case bounds, with no implementation and no benchmarks. A worst-case bound says nothing on its own about how a method performs on the instances production solvers handle, so nothing in your constraint-solving stack changes today.
- **"Formally verified" needs a scope.** Lean checks the statement it is given. Here, the formalized statement is weaker than the abstract. When you evaluate AI-generated proofs or code, check what exactly was verified, not that something was.
- **The model is not available.** None of this is a capability you can call through the OpenAI API today, and OpenAI does not say which internal model produced the 26 October results.

## Sources

1. OpenAI, "Working with academic communities to build scientific understanding" (26 October 2026, from the OpenAI news feed; the page itself returned an access error to our fetch): [https://openai.com/index/building-scientific-understanding-with-academic-communities](https://openai.com/index/building-scientific-understanding-with-academic-communities)
2. OpenAI, `openai/math` repository, history.md, entries of 7 and 26 October 2026 (fetched 28 October 2026): [https://github.com/openai/math/blob/main/history.md](https://github.com/openai/math/blob/main/history.md)
3. OpenAI, "The Exponential Time Hypothesis is False" (dated 17 October 2026, revised 25 October 2026), in the `openai/math` repository: [https://github.com/openai/math](https://github.com/openai/math)
4. OpenAI, Lean scope note for family 378 (ETH result, fetched 28 October 2026): [https://github.com/openai/math/blob/main/lean/docs/378.md](https://github.com/openai/math/blob/main/lean/docs/378.md)
5. OpenAI, Lean scope note for family 079 (local smoothing, fetched 28 October 2026): [https://github.com/openai/math/blob/main/lean/docs/079.md](https://github.com/openai/math/blob/main/lean/docs/079.md)
6. OpenAI, "Sharing AI progress in mathematics" (6 October 2026): [https://openai.com/index/sharing-ai-progress-in-mathematics](https://openai.com/index/sharing-ai-progress-in-mathematics)
7. Russell Impagliazzo, Ramamohan Paturi and Ryan Williams, open letter on the examination of the ETH claim (undated, linked 26 October 2026): [https://docs.google.com/document/d/1adB0IhJgLzsmbfCgoLrtoJTjnlPf74UnyjMo35P5JHo](https://docs.google.com/document/d/1adB0IhJgLzsmbfCgoLrtoJTjnlPf74UnyjMo35P5JHo)
8. Al Jazeera, John Power, "AI makes discoveries in mathematics, computer science, physics, OpenAI says" (27 October 2026, secondary, for the expert quotes): [https://www.aljazeera.com/economy/2026/10/27/ai-makes-discoveries-in-mathematics-computer-science-physics-openai-says](https://www.aljazeera.com/economy/2026/10/27/ai-makes-discoveries-in-mathematics-computer-science-physics-openai-says)
9. The Next Web, report on OpenAI's 26 October results (26 October 2026, secondary, for the physics description): [https://thenextweb.com/news/openai-exponential-time-hypothesis-false-kakeya-yang-mills](https://thenextweb.com/news/openai-exponential-time-hypothesis-false-kakeya-yang-mills)

## Further reading

- [AI starts doing real science](/news/ai-for-science-2026/): the Co-Scientist, Erdős and Deep Think results from earlier in 2026
- [Complexity classes](/glossary/complexity-classes/) and [time complexity](/glossary/time-complexity/): the background for what ETH says
- [Reasoning models](/glossary/reasoning-models/)
