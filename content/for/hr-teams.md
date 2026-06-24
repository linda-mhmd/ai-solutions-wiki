---
title: "For HR and People Teams"
description: "AI in recruiting, performance management, onboarding, and learning. Know the tools, the legal risks under Austrian and EU law, and how to use AI without creating liability."
date: 2026-06-22
tags: ["hr", "people-management", "recruiting-ai", "gdpr", "eu-ai-act", "beginner"]
last_updated: 2026-06-22
---

## AI in HR moves fast. The legal risk moves faster.

<figure class="bz-figure">
  <img src="/img/shaping-ai/boardroom-team-red-notext.png" alt="Team seated around a table in a dark boardroom with red-lit displays: people decisions made with AI require human oversight and clear governance." loading="lazy">
  <figcaption>AI in HR accelerates every people process. The oversight, the accountability, and the legal responsibility still sit with you.</figcaption>
</figure>

HR and people teams in 2026 are using AI to screen CVs, write job descriptions, draft performance feedback, personalise onboarding, and analyse engagement data. The productivity gain is real. The legal risk is also real. Under the EU AI Act, automated CV screening and scoring systems that influence hiring decisions are classified as high-risk AI. Under GDPR, processing employee data through third-party AI tools requires a legal basis and a DPA.

This path gives you the vocabulary to evaluate AI tools confidently, ask the right questions before procurement, and avoid the decisions that create liability.

---

### Where AI changes HR work the most

**Job description writing**: Writing a clear, inclusive, legally sound job description takes time. LLMs draft in minutes and, when properly briefed, produce more inclusive language than the average unguided human draft. The human review for accuracy and legal compliance remains essential.

**CV and application screening**: AI screening tools can process hundreds of applications in seconds. Under the EU AI Act, systems that rank or filter candidates based on automated processing of personal data without meaningful human review are high-risk. Know what "meaningful human review" means in your implementation before you deploy.

**Performance feedback drafting**: Managers often produce short, non-specific feedback under time pressure. AI tools that help draft structured, evidence-based feedback increase the quality of the output and reduce bias that comes from rushed writing.

**Onboarding and L&D**: AI-powered learning paths adapt to individual progress and knowledge gaps. Onboarding chatbots answer common questions without waiting for HR availability. Both reduce time-to-productivity for new hires.

**Engagement and exit analysis**: Synthesising survey data, exit interview themes, and engagement patterns from text is a task where LLMs save significant analyst time. They do not replace the human interpretation of what the data means for your organisation.

---

### Your reading path

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Start</span>
    <span class="bz-flow-step-name">What is Generative AI?</span>
    <span class="bz-flow-step-desc">What the technology is, what it can do, and why it makes confident mistakes. Essential before you evaluate any HR AI vendor.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Risk</span>
    <span class="bz-flow-step-name">EU AI Act Framework</span>
    <span class="bz-flow-step-desc">Recruiting, performance, and people analytics tools fall into the high-risk category. Know your obligations before deployment.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Privacy</span>
    <span class="bz-flow-step-name">What is a Database?</span>
    <span class="bz-flow-step-desc">Where employee data lives, how it is processed, and why the data layer matters for GDPR compliance when using AI tools.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Reliability</span>
    <span class="bz-flow-step-name">What is AI Hallucination?</span>
    <span class="bz-flow-step-desc">Why AI-generated performance feedback, interview summaries, and policy documents must always be reviewed before use.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Governance</span>
    <span class="bz-flow-step-name">ISO 42001</span>
    <span class="bz-flow-step-desc">The AI management standard increasingly required in enterprise procurement. Relevant if your organisation is both using and selling AI-assisted HR products.</span>
  </div>
</div>

---

### EU AI Act obligations for HR AI

The EU AI Act explicitly classifies the following HR AI uses as **high-risk**:

| Use case | Risk classification | What this means |
|---|---|---|
| **CV and application filtering** | High-risk | Human review required, transparency to applicants, bias testing, documentation |
| **Candidate ranking and scoring** | High-risk | Explainability required, right to human review on request |
| **Performance evaluation AI** | High-risk | Documentation, audit trail, right to contest automated decisions |
| **Promotion and termination scoring** | High-risk | Same as above, plus works council notification in AT/DE |
| **Employee monitoring and analytics** | High-risk | Impact assessment, proportionality review under GDPR |
| **Chatbots for internal HR queries** | Limited risk | Transparency disclosure required ("you are talking to an AI") |

High-risk systems require:
- Technical documentation of the AI system
- Human oversight mechanisms
- Accuracy, robustness, and bias testing before deployment
- A conformity assessment
- Registration in the EU AI Act database (for providers)

The provider of an HR AI tool bears many of these obligations. But you, as the deploying organisation, bear the obligation to verify that any tool you deploy meets them.

---

### GDPR considerations when using AI in HR

**Processing employee data through third-party APIs**: If you send CV text, performance data, or survey responses to an LLM API (OpenAI, Anthropic, Google), that is a data processing activity. You need a Data Processing Agreement (DPA) with that vendor and a legitimate basis for the processing under GDPR Article 6.

**Austrian Arbeitsverfassungsgesetz (ArbVG)**: In Austria, introducing AI tools that affect working conditions, monitoring, or performance assessment may require consultation with the Betriebsrat (works council) under §96 ArbVG before deployment. This is commonly overlooked when HR teams adopt AI tools quickly.

**Purpose limitation**: Data collected for one purpose (recruitment) cannot be repurposed for another (performance management) without a new legal basis. If your ATS data feeds an AI system that also does performance prediction, that may be a GDPR violation.

**Data minimisation**: AI tools that request full employee datasets for training or processing need to be evaluated for whether all that data is necessary. Provide only what is required for the specific task.

---

### Practical questions before deploying any HR AI tool

1. Does the tool process personal data of EU residents? If yes, where is that data processed and by whom?
2. Does the vendor have a GDPR-compliant Data Processing Agreement available?
3. Does the tool fall into an EU AI Act high-risk category?
4. If high-risk: can the vendor provide the required documentation (technical documentation, bias testing results, conformity assessment)?
5. Does Austrian Arbeitsverfassungsgesetz require Betriebsrat consultation before deployment?
6. What is the human oversight mechanism? Who reviews and can override AI-generated outputs?
7. What is the vendor's data retention policy for employee data processed through the tool?

---

### AI tools HR teams use in 2026

| Tool | HR use case | Key consideration |
|---|---|---|
| **Claude or ChatGPT** | JD writing, feedback drafts, policy summarisation | No employee personal data in prompts without DPA |
| **Perplexity** | Compensation benchmarking, labour law research | Output needs expert verification for legal accuracy |
| **Gamma** | Onboarding decks, L&D presentations, HR strategy briefs | No personal data; safe for general content |
| **Specialised ATS AI** (Greenhouse, Lever with AI features) | Application screening and scheduling | Check for EU AI Act compliance documentation |
| **Notion AI or Microsoft Copilot** | HR policy drafting, meeting notes, offboarding checklists | Verify data processing terms for employee data |

---

### Further reading

- [What is Generative AI?](/basics/what-is-generative-ai/): what the technology does and where it makes mistakes
- [What is AI Hallucination?](/basics/what-is-ai-hallucination/): why AI-generated HR content needs human review before use
- [EU AI Act Framework](/frameworks/eu-ai-act/): the four risk tiers and what high-risk classification means for HR tools
- [ISO 42001](/frameworks/iso-42001/): the AI management standard relevant to enterprise HR AI procurement
- [Prompt Engineering Best Practices](/guides/prompt-engineering-enterprise/): writing prompts that produce consistent, policy-compliant HR content
- [EU AI Act Compliance Checklist](/guides/eu-ai-act-compliance-checklist/): step-by-step checklist for evaluating any AI tool before deployment
