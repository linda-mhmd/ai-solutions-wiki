# AI Solutions Wiki

> Built and maintained by **[Linda Mohamed](https://www.lindamohamed.com)** — AWS Community Hero · AI Solutions Architect · Speaker
>
> [📅 Book a free call](https://outlook.office.com/book/Letstalk1@lindamohamed.com/) · [🎓 Workshops](https://www.lindamohamed.com/workshops) · [LinkedIn](https://linkedin.com/in/lindamohamed) · [YouTube](https://youtube.com/@mrs_lee_g) · [GitHub](https://github.com/linda-mhmd)

---

A knowledge base for building production AI systems. Think of it as a Wikipedia for the full stack of AI engineering — not just "call the API" tutorials, but everything required to take an AI system to production and keep it running.

**Live site:** [ai-solutions.wiki](https://ai-solutions.wiki)

---

## What This Is

Most AI content is optimized for the fastest path to a demo. That is useful for learning a capability. It is not useful for building a system that works reliably at 3am when something breaks.

The gap between "I got it working in a notebook" and "it is running reliably in production" is an engineering problem. This wiki maps that problem and its solutions, organized for the engineers who need to apply them.

The organizing principle: **AI systems are software systems.** They need the same engineering discipline as any distributed system — reliability, observability, deployment automation, configuration management, security — plus a layer of complexity unique to non-deterministic behavior, data dependencies, and model lifecycle management.

---

## Who It Is For

Two audiences:

**Vibe coders learning while building** — you have the AI working, now you want to understand why it breaks and how to fix it. The glossary, guides, and frameworks sections give you vocabulary and structure.

**Experienced engineers building AI systems** — you want a reference for patterns, decisions, and trade-offs without re-reading vendor documentation every time. The patterns, architecture, and comparisons sections are aimed at you.

---

## The Four-Layer Model

Every production AI system operates across four layers. The wiki is organized around them.

**Layer 1 — AI Capabilities**
Models, embeddings, agents, fine-tuning, evaluation, prompt engineering. This is what most tutorials cover. It is necessary but not sufficient.

**Layer 2 — Engineering Patterns**
RAG, orchestration, prompt versioning, observability, dataset lifecycle. The translation layer between AI capability and working software.

**Layer 3 — Software Engineering Foundations**
Version control, CI/CD, testing, configuration management, secrets handling, dependency management. Not AI-specific, but frequently omitted from AI content. Omitting them is how prototypes stay prototypes.

**Layer 4 — Infrastructure**
Compute patterns, storage architecture, data pipelines, event-driven architectures. What makes systems scalable and reliable under real conditions.

A full treatment is in the [ai-systems-are-software-systems](https://ai-solutions.wiki/guides/ai-systems-are-software-systems/) article.

---

## Content Structure

| Section | What it contains |
|---|---|
| `/guides/` | Step-by-step implementations and how-to articles |
| `/patterns/` | Reusable technical patterns (RAG, agents, pipelines) |
| `/architecture/` | Architecture decisions and system design |
| `/foundations/` | Software engineering foundations applied to AI |
| `/solutions/` | Industry-specific AI application patterns |
| `/tools/` | Coverage of AI platforms and frameworks |
| `/comparisons/` | Side-by-side analysis for common decisions |
| `/frameworks/` | Structured thinking tools for AI projects |
| `/glossary/` | Plain-English definitions |

Articles cross-link to related articles. Follow the links to discover the full set of concerns a given problem entails.

---

## Work With Linda

This wiki is maintained by **Linda Mohamed**, AWS Community Hero and AI Solutions Architect based in Austria. If you are building AI systems and want expert guidance:

- **[Free 30-min discovery call](https://outlook.office.com/book/Letstalk1@lindamohamed.com/)** — discuss your AI use case, architecture questions, or team challenges
- **[AI Workshops](https://www.lindamohamed.com/workshops)** — hands-on sessions for teams getting started with production AI on AWS
- **[AI Workshops Online](https://ai-workshops.online)** — self-paced and live online workshops
- **[lindamohamed.com](https://www.lindamohamed.com)** — consulting, speaking, and advisory

---

## Tech Stack

- **[Hugo](https://gohugo.io/)** — static site generator
- **[GitHub Pages](https://pages.github.com/)** — hosting
- **[Pagefind](https://pagefind.app/)** — static full-text search (runs in the browser, no server required)

---

## Running Locally

You need Hugo installed. See [gohugo.io/installation](https://gohugo.io/installation/) for instructions.

```bash
git clone https://github.com/linda-mhmd/ai-solutions-wiki.git
cd ai-solutions-wiki
hugo server
```

The site runs at `http://localhost:1313`. Hugo watches for file changes and reloads automatically.

To build the static site:

```bash
hugo
```

Output goes to `public/`.

---

## Contributing

Contributions are welcome. Articles get better when people who have built production systems add what they know.

**What to contribute:**

- Corrections to technical inaccuracies
- New articles on topics that are missing
- Cross-links between related articles that should be connected
- References to original papers, official documentation, or whitepapers
- Real examples that make abstract concepts concrete

**How to contribute:**

1. Fork the repository
2. Create or edit an article in `content/`
3. Use the front matter format from an existing article (title, description, date, categories, tags, related)
4. Submit a pull request

**Article standards:**

- No filler language ("revolutionizing", "cutting-edge", "seamlessly"). State what something does.
- Version numbers and API details where relevant. Readers need specifics, not generalities.
- Cross-reference related articles in the `related` field. The wiki should be browsable.
- Cite the source. If an approach comes from a paper, whitepaper, or official documentation, link to it.
- Acknowledge limitations. An article that says something works in all cases is probably wrong.

---

## Why This Exists

The AI industry produces enormous amounts of content. Most of it is tutorials that stop at the prototype stage, vendor marketing, or research papers that assume graduate-level background knowledge.

There is a consistent gap: no reference resource for the engineering required between "working prototype" and "production system." The patterns exist (they are discovered by every team that has shipped AI to production), but they are not organized anywhere that a newcomer can find them.

This wiki is an attempt to fill that gap.

---

**Created by [Linda Mohamed](https://www.lindamohamed.com)** · [ai-solutions.wiki](https://ai-solutions.wiki) · [github.com/linda-mhmd](https://github.com/linda-mhmd)
