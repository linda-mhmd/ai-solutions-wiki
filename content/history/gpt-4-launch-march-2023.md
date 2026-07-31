---
title: "GPT-4 Launch: March 14, 2023"
description: "On March 14, 2023, OpenAI released GPT-4, a multimodal model that could accept image and text inputs. It scored in the top 10% on the bar exam and set new benchmarks across professional and academic tests."
date: 2023-03-14
lastmod: 2026-07-30
last_updated: 2026-07-30
categories: [History]
tags: [openai, gpt-4, llm, ai-history, milestones, multimodal]
related:
  - history/chatgpt-launch-november-2022
  - history/claude-3-launch-march-2024
  - news/openai-gpt-5-5-and-5-6
  - news/chatgpt-agent-mode
  - glossary/multimodal-model
---

On March 14, 2023, OpenAI announced GPT-4, describing it as "the latest milestone in OpenAI's effort in scaling up deep learning." GPT-4 was a multimodal model that could accept both text and image inputs and produce text outputs. It scored in the top 10% of test takers on a simulated bar exam, compared to GPT-3.5's bottom 10% performance, and set new state-of-the-art results on most major academic and professional benchmarks.

## What it was

GPT-4 was the fourth generation of OpenAI's Generative Pre-trained Transformer series. The key advances:

**Multimodal input**: GPT-4 could process images alongside text, enabling users to ask questions about diagrams, photographs, charts, and screenshots. Image input launched in limited preview and later became broadly available.

**Improved reasoning**: GPT-4 demonstrated substantially better performance on complex reasoning tasks. On academic benchmarks:

- **Bar exam**: Top 10% of test takers (GPT-3.5: bottom 10%)
- **SAT Evidence-Based Reading & Writing**: 710/800 (93rd percentile)
- **SAT Math**: 700/800 (89th percentile)
- **GRE Quantitative**: 163/170 (80th percentile)
- **AP Calculus BC**: 4/5
- **AP Chemistry**: 4/5

**Longer context**: GPT-4 launched with an 8,192-token context window, with a 32,768-token (approximately 50 pages) version available to select users.

**Better alignment**: OpenAI reported that GPT-4 was 82% less likely to respond to requests for disallowed content and 29% more likely to respond to sensitive requests in accordance with their policies, compared to GPT-3.5.

**Reduced hallucinations**: GPT-4 scored 40% higher than GPT-3.5 on OpenAI's internal adversarial factuality evaluations.

## What changed for developers

GPT-4 introduced the "system message," allowing developers to prescribe the AI's style, tone, and task boundaries. This gave developers more control over the model's behavior within their applications.

The API launched with a waitlist and initial pricing of $0.03 per 1,000 prompt tokens and $0.06 per 1,000 completion tokens for the 8K context model. The 32K context model was priced at $0.06 per 1,000 prompt tokens and $0.12 per 1,000 completion tokens.

OpenAI also open-sourced OpenAI Evals, a framework for automated evaluation of AI model performance, allowing developers and researchers to benchmark models and report shortcomings.

## Predictable scaling

A significant technical achievement behind GPT-4 was predictable scaling. OpenAI rebuilt its deep learning infrastructure to enable accurate predictions of model performance before training completed. The team accurately predicted GPT-4's final loss on their internal codebase by extrapolating from models trained with 10,000 times less compute.

OpenAI wrote: "We believe that accurately predicting future machine learning capabilities is an important part of safety that doesn't get nearly enough attention relative to its potential impact."

## Limitations OpenAI acknowledged

OpenAI was explicit about GPT-4's limitations in its announcement:

- **Hallucinations**: The model still fabricated facts and made reasoning errors, though at reduced rates.
- **Knowledge cutoff**: GPT-4's training data had a cutoff of September 2021.
- **Bias**: The model retained biases, though OpenAI reported progress on reducing them.
- **Calibration**: Post-training reduced the model's calibration (the match between confidence and accuracy).
- **Jailbreaks**: Adversarial prompts could still elicit disallowed content.

## Safety measures

OpenAI engaged over 50 domain experts in AI alignment, cybersecurity, biorisk, trust and safety, and international security to adversarially test the model before release. The company reported training the model to refuse requests for dangerous information, such as instructions for synthesizing dangerous chemicals.

GPT-4 incorporated a safety reward signal during RLHF training, using a GPT-4 classifier to judge safety boundaries and completion style on safety-related prompts.

## Market impact

GPT-4's launch accelerated the AI race:

- **Microsoft** announced the same day that Bing Chat had been running on GPT-4 since its launch.
- **Google** felt increased pressure to accelerate Bard and what would become Gemini.
- **Anthropic** stepped up development of Claude 2, released in July 2023.
- **Enterprise adoption** accelerated as GPT-4's improved reliability made production deployments more viable.

GPT-4 was retired from ChatGPT in February 2026, replaced by newer models in the GPT-5 series.

## Why it still matters

GPT-4 established several benchmarks that shaped industry expectations:

1. **Multimodal became standard**: Every major lab now ships models that can process images and text together.

2. **Professional benchmarks became routine**: Scoring on bar exams, medical licensing exams, and standardized tests became the default way to communicate model capability.

3. **Predictable scaling became a research priority**: The ability to forecast model performance before training became a key capability for AI labs.

4. **Safety evaluations became standard**: Pre-release red-teaming with domain experts became an industry norm.

For builders, GPT-4 demonstrated that frontier models could be deployed in professional contexts. The 82% reduction in policy violations and 40% reduction in hallucinations made the difference between a research curiosity and a production tool.

## Sources

- OpenAI, "GPT-4" (March 2023): https://openai.com/research/gpt-4/
- OpenAI, "GPT-4 Technical Report" (March 2023): https://cdn.openai.com/papers/gpt-4.pdf
- ArsTechnica, "OpenAI announces GPT-4, its next-generation AI language model" (March 2023): https://arstechnica.com/information-technology/2023/03/openai-announces-gpt-4-its-next-generation-ai-language-model/
- TechCrunch, "OpenAI releases GPT-4, AI that it claims is state-of-the-art" (March 2023): https://techcrunch.com/2023/03/14/openai-releases-gpt-4-ai-that-it-claims-is-state-of-the-art/

## Further reading

- [ChatGPT launch](/history/chatgpt-launch-november-2022/): the product that brought GPT to consumers.
- [Claude 3 launch](/history/claude-3-launch-march-2024/): Anthropic's competitive response.
- [GPT-5.5 and GPT-5.6](/news/openai-gpt-5-5-and-5-6/): the current generation of OpenAI models.
- [What is a multimodal model?](/glossary/multimodal-model/): the concept explained.
