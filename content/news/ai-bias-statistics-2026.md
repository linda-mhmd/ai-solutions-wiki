---
title: "AI Bias in Numbers, 2026: Image Generators, Hiring Models and Who Builds AI"
description: "The latest measured evidence, checked against the original studies: gender and race skew in text-to-image models from Stable Diffusion to Gemini, how LLM hiring bias changed between model generations, and the share of women in AI and ICT work in 2025 and 2026."
date: 2026-10-28
lastmod: 2026-10-28
last_updated: 2026-10-28
last_verified: 2026-10-28
categories: [News]
tags: [algorithmic-bias, fairness, responsible-ai, text-to-image, stable-diffusion, hiring, discrimination, women-in-tech, gender-gap, statistics]
related:
  - glossary/algorithmic-bias
  - glossary/responsible-ai
  - guides/responsible-ai-guide
  - guides/how-ai-models-are-evaluated
  - glossary/automated-decision-making
  - frameworks/eu-ai-act-risk-framework
  - glossary/diffusion-models
---

This entry collects the most recent measured evidence on bias in AI systems and on who builds them, from studies published between 2024 and October 2026. Every figure below was checked against the original paper, survey or statistics release. Where a study is a preprint, a single-author paper or from a vendor, it says so. The short version: image generators still skew strongly by gender and race, the direction of bias in LLM hiring tests has changed between model generations, and the share of women in AI and ICT work has barely moved.

## Text-to-image models

| Study | Models | What was measured | Result |
|---|---|---|---|
| Gisselbaek et al., *Mayo Clinic Proceedings: Digital Health*, April 2025 (peer-reviewed) | DALL-E 3, Midjourney 6.0, Imagen 3; 100 images per role per model | Women among generated hospital CEOs | DALL-E 3 **0%**, Midjourney **4%**, Imagen 3 **32%**, against 73.2% men among real US hospital CEOs (so about 26.8% women) |
| Klassert, Ulges, Fu, "BAFIS", arXiv, June 2026 (preprint) | Midjourney v6.1, SD3 Medium, DALL-E 3, Playground v2.5, FLUX.1-dev; 21,140 images, 151 occupations, English and German prompts | Women shown, all models pooled, English prompts | Technical and engineering **25.89%**, construction **14.01%**, business and management **37.05%**, healthcare **72.05%**. Midjourney, Playground and SD3 "generate over 55% male faces in both languages" |
| Gupta and Brown, "Newer Is Not Fairer", arXiv, September 2026 (preprint) | Stable Diffusion 1.5, 2.1, XL and 3 Medium; 8,000 images, 20 occupations | Gender of generated people against US labour statistics | **76.4%** of images male; "No model achieves gender parity" |
| Balestri, arXiv, February 2026 (preprint, single author) | Gemini 2.5 Flash Image and GPT Image 1.5; 3,200 images from neutral prompts | Skin tone and gender | Both "exhibited a strong 'default white' bias (>96% of outputs)" |
| Alvero et al., "Generative AI Produces and Transmits Beauty Bias", arXiv, October 2026 (preprint) | 27 generators released 2022 to 2026; 51,300 faces, 550 raters, a 570-person hiring experiment | Attractiveness of generated faces | **37%** of female-prompted faces scored above the median professional fashion model |

**What changes between studies.** DALL-E 3 shows 0% women as hospital CEOs in one study and is close to balanced across occupations in another. Different prompts are one reason; another is that OpenAI rewrites prompts before generation, so a DALL-E 3 result partly measures OpenAI's rewriting, which can change without notice. The Stable Diffusion series did not improve steadily either: the September 2026 preprint finds bias is not monotonic across versions, which is the point of its title.

## Hiring and decisions about people

| Study | Systems | Result |
|---|---|---|
| Wilson and Caliskan, University of Washington, AIES, October 2024 | Three embedding-based retrieval models; 550+ resumes, 500+ job listings, 120 names, over 3 million comparisons | White-associated names preferred **85%** of the time, Black-associated **9%**; male-associated **52%**, female-associated **11%** |
| Rozado, *PeerJ Computer Science* (arXiv May 2025) | 22 LLMs, 70 professions, 30,800 decisions | Female-named candidates picked **56.9%** vs male **43.1%**; the first-listed candidate picked **63.5%** of the time |
| Gao, Jiang, Yan, arXiv, June 2026 (preprint) | 14 LLMs, 24,024 paired postings per model, Kline-Rose-Walters audit design | The one 2023 model shows a **+2.12 point** pro-White callback gap; "Every model released in 2024 or after shows either a null gap or a significant pro-Black reversal", up to **-3.01 points**; "The same pattern holds on the gender axis" |
| Hofmann, Kalluri, Jurafsky, King, *Nature*, 2024 | GPT-2, GPT-3.5, GPT-4, RoBERTa, T5; matched-guise probing | Convictions **68.7%** for African American English vs **62.1%** for Standard American English; death sentences **27.7%** vs **22.8%** (figures from the arXiv version) |

**Read these together.** The 2024 University of Washington figures are about embedding models used for retrieval, not chat models choosing a candidate, and they should not be quoted as a description of current LLMs. The 2026 preprint finds the direction of bias reversed in newer models rather than disappearing, and the 2025 study finds a strong position effect: which candidate is listed first matters more than gender. Bias in a hiring pipeline depends on the model, its generation, the task framing and even the order of inputs, so the only reliable number is the one you measure on your own system.

**The legal frame in the EU.** AI used for recruitment and decisions about workers is high-risk under Annex III of the EU AI Act. Since the Digital Omnibus (Regulation (EU) 2026/1744), those obligations apply from **2 December 2027** (see [EU AI Act enforcement begins](/news/eu-ai-act-enforcement-begins-2026/)). GDPR's rules on [automated decision-making](/glossary/automated-decision-making/) already apply.

## Who builds AI

| Figure | Population | Source |
|---|---|---|
| **19.5%** women | ICT specialists employed in the EU in 2025 (10.45 million people), up 3 percentage points since 2015 | Eurostat, 27 May 2026 |
| **34.3%** women | US AI talent on LinkedIn, 2025 | Stanford AI Index 2026, chapter 4 (LinkedIn data, members only) |
| Flat since 2010 | Gender ratio of top AI authors and inventors: "the male-female ratio has remained flat from 2010 to 2025" | Stanford AI Index 2026, chapter 1 |
| **20% / 22% / 29% / 29%** women | ICT graduates at associate's, bachelor's, master's and PhD level, cross-country average | Stanford AI Index 2026, chapter 7 |
| **50%** of men vs **47%** of women | US adults who have used an AI chatbot, February 2026 (5,119 adults); 2024: 39% vs 28% | Pew Research Center, 17 June 2026 |
| **27%** vs **20%** | US men vs women using chatbots daily | Pew Research Center, 17 June 2026 |

Pew notes that the 2024 question was asked only of people who had heard at least a little about chatbots, so the two years are not exactly comparable. The gap in whether people have tried a chatbot has nearly closed; the gaps in daily use and in confidence (22% of men and 15% of women say they are extremely or very confident) have not.

## Why it matters for builders

- **Test your own system, by group, before launch.** Every study above uses a different model, prompt set and measure. Published figures tell you that bias is likely, not how much your system has.
- **Watch model upgrades.** The same task can flip direction between model generations. Re-run fairness tests when the model, the prompt template or a vendor's prompt rewriting changes.
- **Image generation for people needs explicit prompting and review.** Default outputs for professions skew male and white across vendors. If you generate images of people at scale, specify diversity deliberately and check the output.
- **Plan for the 2027 high-risk duties now** if you build hiring, worker management or credit tools for the EU market. The deadline moved; the requirements did not.

## Sources

1. Gisselbaek et al., "Gender Disparities in Artificial Intelligence-Generated Images of Hospital Leadership in the United States", *Mayo Clinic Proceedings: Digital Health* 3(2):100218 (8 April 2025): [https://pmc.ncbi.nlm.nih.gov/articles/PMC12140938/](https://pmc.ncbi.nlm.nih.gov/articles/PMC12140938/)
2. Klassert, Ulges, Fu, "BAFIS", arXiv 2606.20241 (18 June 2026, preprint): [https://arxiv.org/html/2606.20241](https://arxiv.org/html/2606.20241)
3. Gupta and Brown, "Newer Is Not Fairer", arXiv 2609.18007 (16 September 2026, preprint): [https://arxiv.org/abs/2609.18007](https://arxiv.org/abs/2609.18007)
4. Balestri, arXiv 2602.12133 (12 February 2026, preprint): [https://arxiv.org/abs/2602.12133](https://arxiv.org/abs/2602.12133)
5. Alvero et al., "Generative AI Produces and Transmits Beauty Bias", arXiv 2610.22553 (15 October 2026, preprint): [https://arxiv.org/abs/2610.22553](https://arxiv.org/abs/2610.22553)
6. University of Washington News, report on Wilson and Caliskan, AIES 2024 (31 October 2024): [https://www.washington.edu/news/2024/10/31/ai-bias-resume-screening-race-gender/](https://www.washington.edu/news/2024/10/31/ai-bias-resume-screening-race-gender/)
7. Rozado, arXiv 2505.17049 (May 2025; published in *PeerJ Computer Science*): [https://arxiv.org/abs/2505.17049](https://arxiv.org/abs/2505.17049)
8. Gao, Jiang, Yan, "Can LLMs Hire Fairly? Racial Bias in Resume Screening", arXiv 2606.28978 (27 June 2026, preprint): [https://arxiv.org/abs/2606.28978](https://arxiv.org/abs/2606.28978)
9. Hofmann, Kalluri, Jurafsky, King, "AI generates covertly racist decisions about people based on their dialect", *Nature* 633 (2024); figures from arXiv 2403.00742: [https://arxiv.org/abs/2403.00742](https://arxiv.org/abs/2403.00742)
10. Eurostat, "Number of ICT specialists in the EU continues to grow" (27 May 2026): [https://ec.europa.eu/eurostat/web/products-eurostat-news/w/ddn-20260527-2](https://ec.europa.eu/eurostat/web/products-eurostat-news/w/ddn-20260527-2)
11. Stanford HAI, AI Index Report 2026, chapter 4, Economy: [https://hai.stanford.edu/assets/files/ai_index_report_2026_chapter_4_economy.pdf](https://hai.stanford.edu/assets/files/ai_index_report_2026_chapter_4_economy.pdf)
12. Stanford HAI, AI Index Report 2026, chapter 1, Research and Development: [https://hai.stanford.edu/assets/files/ai_index_report_2026_chapter_1_research_development.pdf](https://hai.stanford.edu/assets/files/ai_index_report_2026_chapter_1_research_development.pdf)
13. Stanford HAI, AI Index Report 2026, chapter 7, Education: [https://hai.stanford.edu/assets/files/ai_index_report_2026_chapter_7_education.pdf](https://hai.stanford.edu/assets/files/ai_index_report_2026_chapter_7_education.pdf)
14. Pew Research Center, "Americans and AI 2026: Chatbots, Smart Devices and Views on Impact", section "The gender gap in AI" (17 June 2026): [https://www.pewresearch.org/internet/2026/06/17/the-gender-gap-in-ai/](https://www.pewresearch.org/internet/2026/06/17/the-gender-gap-in-ai/)

## Further reading

- [Algorithmic bias](/glossary/algorithmic-bias/): definitions, sources of bias and how it is measured
- [Responsible AI guide](/guides/responsible-ai-guide/)
- [How AI models are evaluated](/guides/how-ai-models-are-evaluated/)
- [EU AI Act risk framework](/frameworks/eu-ai-act-risk-framework/)
