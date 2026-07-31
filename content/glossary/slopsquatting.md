---
title: "Slopsquatting"
description: "A supply chain attack where malicious actors register software package names that AI coding assistants hallucinate, exploiting developers who install the fake packages."
date: 2026-07-30
lastmod: 2026-07-30
categories: [Glossary]
tags: [AI security, supply chain, hallucination, software development, vibe coding]
related:
  - /glossary/hallucination
  - /glossary/ai-slop
  - /glossary/prompt-injection
  - /basics/what-is-a-dependency
  - /glossary/supply-chain-security
---

Slopsquatting is a type of supply chain attack where malicious actors register software package names that large language models hallucinate in their code suggestions. When a developer copies AI-generated code that references a non-existent package, they may unknowingly install malware that an attacker has pre-registered under that hallucinated name.

The name is a portmanteau of "[AI slop]({{< relref "glossary/ai-slop" >}})" (low-quality AI-generated content) and "typosquatting" (registering misspelled domain or package names).

## How it works

1. An AI coding assistant hallucinates a plausible but non-existent package name (for example, `securehashlib` instead of `hashlib`)
2. An attacker monitors for commonly hallucinated package names and pre-registers them on package registries (PyPI, npm, etc.)
3. A developer copies the AI-generated code without verifying the package exists
4. The developer runs `pip install` or `npm install`, pulling the attacker's malicious package
5. The malicious package executes arbitrary code or establishes persistence

## Origins

In 2023, security researcher Bar Lanyado demonstrated the attack vector by noting that LLMs hallucinated a package named `huggingface-cli`. While this sounds like the command-line tool for HuggingFace Hub, the correct installation command is `pip install -U "huggingface_hub[cli]"`. Lanyado uploaded an empty package under the hallucinated name; in three months it received over 30,000 downloads ([Wikipedia](https://en.wikipedia.org/wiki/Slopsquatting)).

The term "slopsquatting" was coined in April 2025 by Seth Larson, Developer-in-Residence at the Python Software Foundation, and popularized by Andrew Nesbitt of Ecosyste.ms ([The Register, 2025](https://www.theregister.com/2025/04/12/ai_code_suggestions_sabotage_supply_chain/)).

## Research findings

In May 2025, the academic paper "We Have a Package for You! A Comprehensive Analysis of Package Hallucinations by Code Generating LLMs" documented the scale of the problem:

- **19.7%** of LLM-recommended packages did not exist
- Open-source models hallucinated far more frequently (**21.7%** on average) compared to proprietary models (**5.2%**)
- CodeLlama 7B and CodeLlama 34B hallucinated in over a third of outputs
- Researchers observed over **205,000 unique hallucinated package names** across all models tested

([Spracklen et al., arXiv:2406.10279](https://arxiv.org/abs/2406.10279))

## Vibe coding risk

Feross Aboukhadijeh, CEO of security firm Socket, warns that developers practicing [vibe coding]({{< relref "basics/what-is-vibe-coding" >}}) may be particularly susceptible. Vibe coding often involves accepting AI-generated code without line-by-line review, which means hallucinated dependencies can slip through unnoticed ([Wikipedia](https://en.wikipedia.org/wiki/Slopsquatting)).

## Prevention

- **Manually verify package names** before installation
- **Use dependency scanners** that check packages against known registries
- **Use lock files and hash verification** to pin known, trusted package versions
- **Never assume AI-generated code is safe** without review
- **Check the package's download count and publication date** on the registry before installing

## Current status

As of July 2026, there has not yet been a reported case where slopsquatting has been successfully used as a cyberattack in the wild. The threat remains theoretical but credible given the research demonstrating high hallucination rates and the ease of pre-registering package names.

## Sources

1. Wikipedia. "Slopsquatting." [https://en.wikipedia.org/wiki/Slopsquatting](https://en.wikipedia.org/wiki/Slopsquatting)
2. Claburn, Thomas. "LLMs can't stop making up software dependencies and sabotaging everything." The Register (12 April 2025). [https://www.theregister.com/2025/04/12/ai_code_suggestions_sabotage_supply_chain/](https://www.theregister.com/2025/04/12/ai_code_suggestions_sabotage_supply_chain/)
3. Spracklen, Joseph et al. "We Have a Package for You! A Comprehensive Analysis of Package Hallucinations by Code Generating LLMs." arXiv:2406.10279 (May 2025). [https://arxiv.org/abs/2406.10279](https://arxiv.org/abs/2406.10279)
4. SecurityWeek. "AI Hallucinations Create a New Software Supply Chain Threat." (April 2025). [https://www.securityweek.com/ai-hallucinations-create-a-new-software-supply-chain-threat](https://www.securityweek.com/ai-hallucinations-create-a-new-software-supply-chain-threat)
5. Cloud Security Alliance. "Slopsquatting: AI Code Hallucinations Fuel Supply Chain Attacks." (April 2026). [https://labs.cloudsecurityalliance.org/](https://labs.cloudsecurityalliance.org/)


## Further reading

- [What is a dependency?](/basics/what-is-a-dependency/): Understanding npm install and why projects break — the attack surface slopsquatting exploits.
- [Hallucination](/glossary/hallucination/): The AI behavior that makes package names up in the first place.
- [AI slop](/glossary/ai-slop/): Low-quality AI content — "slop" in slopsquatting comes from this term.
- [Model collapse](/glossary/model-collapse/): As AI trains on AI, hallucination patterns may become more common.
