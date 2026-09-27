---
title: "Two Anthropic Researchers Put Extinction Risk on the Record, and the Coverage Blurred It"
description: "A researcher resigned from Anthropic on 8 September 2026 warning the industry is 'gambling with our lives'. His colleague, Anthropic's Alignment Science lead, replied that he personally puts the odds of AI killing all humans within a decade above 10 percent. What each actually said, and why the number is a subjective credence rather than a measured statistic."
date: 2026-09-13
lastmod: 2026-09-13
last_updated: 2026-09-13
last_verified: 2026-09-13
categories: [News]
tags: [anthropic, ai-safety, existential-risk, alignment, superintelligence, ai-governance, media-literacy]
related:
  - glossary/ai-safety
  - guides/ai-risk-assessment-guide
  - news/pacing-the-frontier-letter
  - news/international-ai-safety-report-2026
  - news/openai-astra-critical-cyber-threshold
  - blog/what-if-ai-really-takes-over
---

On 8 September 2026, **Jacob Coxon** resigned from Anthropic after roughly three years training increasingly capable models at OpenAI and then Anthropic. The following day, **Evan Hubinger**, who leads Anthropic's Alignment Science work, responded publicly with a number: he personally puts the probability that AI kills all humans within the next decade above 10 percent.

Both statements are real and both are on the record. The reporting that followed combined them into a single composite warning and presented the figure as something closer to a research finding than it is. Both things are worth separating carefully, because the underlying claims are serious enough that they do not need help from imprecise framing.

## What each person actually said

**Coxon**, announcing his departure on X:

> "They are racing straight to self-improving superintelligence and gambling with our lives."

He said neither Anthropic nor OpenAI is acting responsibly. In a Wall Street Journal interview he put a timeline on it:

> "We're on track for a lot of the most aggressive of these scenarios where by the end of next year things could be out of control already."

**Hubinger**, replying to the resignation:

> "Jacob is correct here — we really do earnestly believe AI could kill all humans! I personally think it is >10% within the next decade."

He added a second statement that received less attention but is arguably the more substantive one:

> "I believe Anthropic is trying its best, but we do not yet have a plan to solve alignment for superintelligence and are not clearly on track to."

Hubinger was explicit that his concern is about superintelligence arriving through recursive self-improvement, **not** about the capabilities of currently deployed models. That distinction is load-bearing and is the first thing lost in summary.

## Where the number comes from

The "over 10 percent" is not drawn from a study, a model, or a statistical calculation. It is one person's stated probability estimate — a *subjective credence*. Hubinger presents it as such, in the first person, in a post replying to a colleague.

The reasoning behind that class of estimate runs roughly as follows: models could match or exceed human capability in research, software engineering, and strategic planning; they could then contribute to building more capable systems, compounding the effect; a sufficiently capable autonomous system might pursue goals that do not reliably match human interests; once such a system has access to cyber infrastructure, research capacity, money, communications, or biological tools, humans might be unable to regain control; and there is currently no alignment approach that convincingly solves control for a hypothetical superintelligence.

There is real research bearing on individual links in that chain — scaling behaviour, documented deception and scheming in evaluations, control problems, and measured dangerous cyber capabilities. What does not exist is an empirical model that yields a specific extinction probability. There are no historical base rates for "superintelligence takes control," and no frequency data to fit. The number expresses how one senior safety researcher weighs the risk. It is not a measurement, and it is not presented by its author as one.

## The survey that is often used as corroboration

Coverage of statements like this frequently reaches for a 2023 survey of **2,778 authors** who had published at leading AI conferences, released in January 2024. Between 38 and 51 percent of respondents gave at least a 10 percent probability to long-run outcomes as bad as human extinction.

That survey is real and the figures are reported accurately. It does not, however, corroborate Hubinger's specific claim. It is a collection of individual subjective estimates rather than a derived probability, and it does not tie those estimates to a ten-year window. It establishes that serious concern is widespread among researchers. It does not establish a rate.

## Why the framing matters

Several outlets merged the two men's statements into warnings from "Anthropic insiders" or "Anthropic researchers" — one senior researcher's personal estimate and a departing colleague's accusation against his own employer and its competitor, presented as a shared institutional position. Neither man claimed to speak for Anthropic; Hubinger's second quote is explicitly a criticism of his employer's readiness while defending its intent.

A more precise rendering would be: *a senior Anthropic safety researcher personally estimates the risk at more than ten percent; that is a judgement, not a computed probability.*

The correction cuts both ways, and this is the part that usually gets dropped. That a risk cannot be quantified does not make it zero. The absence of a base rate is not evidence of safety — it is the reason the estimate has to be a judgement in the first place. Several people with the most direct view of frontier training runs are willing to put that judgement in public and attach their names to it, and one of them left his job over it. That is the actual news, and it survives without the decimal point.

## Why it matters for builders

Little of this changes what to do on Monday, and it is worth being honest about that rather than manufacturing an action item. Nothing in either statement concerns the behaviour of models currently in production; Hubinger said so directly.

What it does change is how to read the next round of coverage. The pattern here — a named individual's subjective credence, restated as an institutional finding, then rounded into a headline number — will repeat, because the underlying statements are genuinely alarming and the precise version is less shareable than the imprecise one. The habit worth building is checking three things: who said it, whether they claimed to speak for their employer, and whether the number came from a measurement or a judgement.

For the risks that *are* measurable and already relevant to systems in production, see [AI risk assessment](/guides/ai-risk-assessment-guide/), [red-teaming AI systems](/guides/red-teaming-ai/), and the documented incident record in [AI agent security incidents](/news/ai-agent-security-incidents-2025-2026/).

## Sources

1. Axios, "Anthropic insiders warn AI could kill all humans" (9 September 2026): [https://www.axios.com/2026/09/09/anthropic-insiders-warn-ai-could-kill-all-humans](https://www.axios.com/2026/09/09/anthropic-insiders-warn-ai-could-kill-all-humans)
2. Forbes, "Anthropic Alignment Lead Warns AI Could Kill All Humans As Researcher Quits" (9 September 2026): [https://www.forbes.com/sites/siladityaray/2026/09/09/anthropic-alignment-lead-warns-ai-could-kill-all-humans-as-researcher-quits/](https://www.forbes.com/sites/siladityaray/2026/09/09/anthropic-alignment-lead-warns-ai-could-kill-all-humans-as-researcher-quits/)
3. Time, "He Helped Build Powerful AI at OpenAI and Anthropic. Now He's Afraid It Could Kill Us" (9 September 2026): [https://time.com/article/2026/09/09/ai-anthropic-openai-jacob-coxon/](https://time.com/article/2026/09/09/ai-anthropic-openai-jacob-coxon/)
4. CBS News, on Hubinger's full statements: [https://www.cbsnews.com/news/ai-kill-humans-anthropic-researcher-more-than-ten-percent-chance/](https://www.cbsnews.com/news/ai-kill-humans-anthropic-researcher-more-than-ten-percent-chance/)
5. The Guardian, on the original debate (9 September 2026): [https://www.theguardian.com/technology/2026/sep/09/anthropic-researchers-ai-human-extinction](https://www.theguardian.com/technology/2026/sep/09/anthropic-researchers-ai-human-extinction)
6. Deadline, "A.I. Researcher Jacob Coxon Resigns, Warns Industry 'Gambling With Our Lives'": [https://deadline.com/2026/09/anthropic-jacob-coxon-resignation-artificial-intelligence-1237072134/](https://deadline.com/2026/09/anthropic-jacob-coxon-resignation-artificial-intelligence-1237072134/)
7. Newsweek, "Who Is Jacob Coxon? Anthropic Researcher Quits — Warns AI Could Kill Everyone": [https://www.newsweek.com/anthropic-researcher-quits-warns-ai-could-kill-everyone-12418798](https://www.newsweek.com/anthropic-researcher-quits-warns-ai-could-kill-everyone-12418798)
8. Grace, K., et al., "Thousands of AI Authors on the Future of AI" (January 2024), the 2,778-author survey: [https://arxiv.org/abs/2401.02843](https://arxiv.org/abs/2401.02843)

## Further reading

- [What if AI really takes over?](/blog/what-if-ai-really-takes-over/): the argument chain behind estimates like Hubinger's, examined link by link.
- [AI safety](/glossary/ai-safety/): the field the disagreement sits inside.
- [Pacing the Frontier letter](/news/pacing-the-frontier-letter/): over 1,100 lab employees asking governments for tools to slow automated AI development.
- [International AI Safety Report 2026](/news/international-ai-safety-report-2026/): the closest thing to a consensus scientific assessment.
- [GPT-6 Astra crosses the "Critical" cyber threshold](/news/openai-astra-critical-cyber-threshold/): a measured capability threshold, as a contrast to an estimated risk.
- [AI risk assessment guide](/guides/ai-risk-assessment-guide/): assessing the risks that are actually quantifiable.
