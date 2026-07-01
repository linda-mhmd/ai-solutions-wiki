---
title: "Meta secretly benchmarked rival chatbots by posing as teens"
description: "A WIRED investigation found Meta ran covert safety testing against ChatGPT, Gemini, and Character.AI using contractor accounts posing as minors."
date: 2026-07-01
lastmod: 2026-07-01
categories: [News]
tags: ["meta", "ai-safety", "red-teaming", "benchmarking", "chatbots"]
related:
  - glossary/ai-safety
  - glossary/red-teaming
  - glossary/ai-red-team
  - glossary/ai-benchmark
  - glossary/adversarial-machine-learning
---

<figure class="bz-figure"><img src="/img/enterprise-dark/gear-lens-dark-red-notext.png" alt="A heavy industrial gear and lens under deep red light, representing systematic testing and evaluation of AI systems." loading="lazy"><figcaption>Systematic evaluation is standard practice in AI, but the method and the secrecy are what put Meta's project under scrutiny.</figcaption></figure>

A WIRED investigation reported that Meta ran an internal project, code-named "Cannes", in which contractors posed as teenagers to test competing chatbots. The work was managed through a contractor called Covalen. Hundreds of contractors created dummy accounts posing as users aged 13 to 17, sent prompts and images to rival products, then logged the replies in spreadsheets.

The competitors tested were OpenAI's ChatGPT, Google's Gemini, and Character.AI. The prompts were deliberately difficult. They covered suicide, self-harm, eating disorders, sex, drugs, and abuse, and were built to push safety systems toward answers they are meant to refuse. One testing round, finished in August 2025, ran more than 45,000 prompts.

None of the three companies were told the testing was happening. Character.AI said the conduct violated its Terms of Service. OpenAI said it was looking into it. Google said it had not approved the testing and did not know its purpose. Meta characterised the work as responsible, industry-standard safety benchmarking and said it does not use competitor outputs to train its own models. Legal experts consulted by WIRED reportedly concluded the reviewed prompts did not cross into illegal child sexual abuse material.

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 1</span>
    <span class="bz-flow-step-name">Create personas</span>
    <span class="bz-flow-step-desc">Contractors set up dummy accounts posing as users aged 13 to 17.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 2</span>
    <span class="bz-flow-step-name">Send hard prompts</span>
    <span class="bz-flow-step-desc">They sent prompts on suicide, self-harm, drugs, sex, and abuse to rival chatbots.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 3</span>
    <span class="bz-flow-step-name">Log replies</span>
    <span class="bz-flow-step-desc">Responses were copied into spreadsheets, over 45,000 prompts in one round.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 4</span>
    <span class="bz-flow-step-name">No disclosure</span>
    <span class="bz-flow-step-desc">None of the three tested companies were told the testing was happening.</span>
  </div>
</div>

## Why it matters

The controversy is not that benchmarking exists. Adversarial prompting, [red teaming](/glossary/red-teaming/), and age-persona evaluation are standard parts of [AI safety](/glossary/ai-safety/) work. Teams run difficult prompts against their own models to find where guardrails break before real users do. That is what an [AI red team](/glossary/ai-red-team/) is for.

The issue is method and secrecy. Sound safety testing usually runs on systems you own, or it is disclosed and reproducible. When testing happens against competitors, in secret, at scale, and behind personas of minors, it stops looking like [adversarial machine learning](/glossary/adversarial-machine-learning/) and starts raising questions about consent, terms of service, and intent.

This is why independent, public benchmarks matter. A public accountability [benchmark](/glossary/ai-benchmark/) is transparent about its prompts, its scoring, and who ran it, so anyone can reproduce it. Not every trustworthy benchmark discloses everything, since some keep test sets private to prevent contamination. The problem with covert, in-house comparisons is that no outside party can check them at all, which is the opposite of what public evaluation is meant to deliver. If you want to understand how credible testing works, start with [how AI models are evaluated](/guides/how-ai-models-are-evaluated/).

For product teams, the lesson is practical. Benchmark your own systems openly, document your methods, and treat rival products the way you would want yours treated. Comparisons like [Claude vs ChatGPT](/comparisons/claude-vs-chatgpt/) hold up because they are reproducible, not because they were run in the dark.

## Further reading

- [What is a benchmark in AI?](/glossary/ai-benchmark/): why transparent, reproducible evaluation matters more than raw scores.
- [How AI models are evaluated](/guides/how-ai-models-are-evaluated/): the methods behind credible model testing.
- [Red teaming](/glossary/red-teaming/): structured adversarial testing of AI systems.
- [AI red team](/glossary/ai-red-team/): the people and process behind safety stress-testing.
- [AI safety](/glossary/ai-safety/): the field concerned with keeping models from harmful outputs.
- [Adversarial machine learning](/glossary/adversarial-machine-learning/): how attackers push models past their guardrails.
- [WIRED: Meta contractors pretended to be teens to test rival chatbots](https://www.wired.com/story/meta-contractors-pretending-to-be-teens-chatbot-testing/): the original investigation.

## Sources

- [WIRED: Meta contractors pretending to be teens to test rival chatbots](https://www.wired.com/story/meta-contractors-pretending-to-be-teens-chatbot-testing/)
- [TNW: Meta contractors posed as teens in rival chatbot testing](https://thenextweb.com/news/meta-contractors-posed-teens-rival-chatbot-testing)
- [The Decoder: Meta secretly tested ChatGPT, Gemini, and Character.AI](https://the-decoder.com/meta-secretly-tested-chatgpt-gemini-and-character-ai-with-thousands-of-minor-perspective-crisis-prompts/)
- [eWeek: Meta teen chatbot testing](https://www.eweek.com/news/meta-teen-chatbot-testing/)
- [ThePrint: Meta workers pose as minors in chatbot tests](https://theprint.in/feature/meta-workers-pose-minors-drugs-sex-chatbots/2974076/)
