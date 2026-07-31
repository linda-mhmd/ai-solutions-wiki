---
title: "What is Open Source?"
description: "Open source means the code is public and you can use, modify, and share it. But there's more: licenses, communities, governance, and an entire ecosystem of how software gets built."
date: 2026-07-30
level: 2
categories: [Basics]
tags: [open-source, licensing, community, github, collaboration, foss]
faqs:
  - question: "Is open source free?"
    answer: "Free as in freedom, not always free as in beer. You can use most open-source software without paying, but 'open source' really means you have freedom to view, modify, and distribute the code. Some companies build businesses on open-source software through support, hosting, or premium features."
  - question: "Can I use open source in my commercial product?"
    answer: "Usually yes, but it depends on the license. MIT and Apache licenses are very permissive—do almost anything. GPL requires you to share your modifications. Always check the license. When in doubt, stick to MIT/Apache licensed dependencies."
  - question: "Why would anyone give away their code for free?"
    answer: "Many reasons: building reputation, solving a shared problem, believing in open collaboration, employer sponsors it, building community around a product, or simply enjoying the work. The Linux kernel is maintained by thousands of contributors, many paid by companies that depend on it."
last_updated: 2026-07-30
---

{{< quickanswer >}}
Open source software has publicly available source code that anyone can view, use, modify, and distribute. This isn't just about price—it's about freedom and collaboration. Linux, Python, React, Kubernetes, and most of the internet's infrastructure are open source. A license defines what you can do with the code. A community maintains and evolves it.
{{< /quickanswer >}}

## The core idea

When you download an app, you usually get compiled code—the machine-readable version. You can run it, but you can't see how it works or change it.

Open source means:
- The **source code** is publicly available
- You can **read** it to understand how it works
- You can **modify** it for your needs
- You can **share** your modifications with others
- A **license** defines exactly what's allowed

This transparency enables collaboration at a scale that proprietary software can't match. The Linux kernel has contributions from thousands of developers across competing companies.

## Why open source matters to you

Even if you never contribute to an open-source project, you use open source constantly:

- **Your web browser** (Chromium, Firefox)
- **Your operating system** (Linux, Android, much of macOS)
- **Your development tools** (VS Code, Git, npm packages)
- **The websites you visit** (React, Next.js, Node.js)
- **The cloud infrastructure** (Kubernetes, Docker, Linux servers)
- **The AI tools you use** (PyTorch, Hugging Face, many models)

Understanding open source helps you:
- Know what you're allowed to do with dependencies
- Find and evaluate libraries and tools
- Participate if you want to
- Understand how modern software is built

## Licenses: what you can actually do

A license is the legal document that defines permissions. No license = all rights reserved = you can't legally use it.

### Permissive licenses (do almost anything)

**MIT License**
- Use, modify, distribute freely
- Must include the license text
- No warranty
- Used by: React, Vue, jQuery, many npm packages

**Apache 2.0**
- Similar to MIT, plus patent protection
- Explicit patent grant protects users
- Used by: Kubernetes, TensorFlow, Apache projects

**BSD Licenses**
- Similar to MIT, several variants
- Used by: FreeBSD, many older projects

**What this means for you**: If a dependency uses MIT or Apache, you can use it in commercial projects without worrying. Just keep the license file.

### Copyleft licenses (share your changes)

**GPL (GNU General Public License)**
- Must release your changes under GPL
- If you distribute modified GPL code, recipients get the same freedoms
- "Viral" license—derived works must also be GPL
- Used by: Linux kernel, GCC, WordPress

**LGPL (Lesser GPL)**
- Weaker copyleft—linking is allowed without sharing your code
- Used by: Many libraries

**AGPL (Affero GPL)**
- Like GPL, but network use counts as distribution
- If you run modified AGPL code as a service, you must share source
- Used by: MongoDB (historically), some privacy-focused projects

**What this means for you**: Be careful using GPL code in proprietary products. AGPL is especially strict—even running it as a SaaS may require sharing your code.

### License compatibility

You can't always combine code with different licenses:

| Combining | MIT + Apache | MIT + GPL | GPL + Apache | GPL + AGPL |
|-----------|--------------|-----------|--------------|------------|
| Result | Works fine | Result is GPL | Works (Apache → GPL) | Result is AGPL |
| Commercial use | Yes | With restrictions | With restrictions | Very restricted |

**Rule of thumb**: Permissive licenses combine freely. Copyleft is contagious. When in doubt, ask or avoid.

## How open source projects work

### The structure

```
Project
├── Maintainers (decision-making authority)
├── Core contributors (regular, trusted contributors)
├── Contributors (anyone who submits accepted changes)
├── Users (people who use but don't contribute)
└── Governance (rules for how decisions are made)
```

### Maintainers

Maintainers have commit access and decide what gets merged. They:
- Review and approve/reject contributions
- Set project direction
- Manage releases
- Handle security issues
- Balance competing interests

Being a maintainer is often unpaid work. Many open-source maintainers burn out from the demands of supporting widely-used software without compensation.

### Contributing

Anyone can contribute to most open-source projects:

1. **Find an issue** labeled "good first issue" or "help wanted"
2. **Fork the repository** (make your own copy)
3. **Make changes** in a branch
4. **Open a pull request** proposing your changes
5. **Respond to feedback** from maintainers
6. **Get merged** (or not—rejection is normal)

Contributions aren't just code:
- Documentation improvements
- Bug reports with reproduction steps
- Translations
- Design work
- Answering questions in forums
- Testing and feedback

### Governance models

**BDFL (Benevolent Dictator for Life)**
- One person makes final decisions
- Python (Guido van Rossum, now retired)
- Linux (Linus Torvalds)

**Committee/Foundation**
- Elected or appointed group decides
- Apache projects, Kubernetes, Node.js

**Corporate-backed**
- One company controls direction
- React (Meta), Angular (Google), Swift (Apple)

**Community-governed**
- Democratic processes, votes
- Debian, some Linux distributions

Governance matters because it determines who decides the project's future.

## The economics of open source

### How projects sustain themselves

**Volunteer labor**: Many projects run on donated time. This is fragile—maintainers burn out or move on.

**Corporate sponsorship**: Companies pay developers to work on open source. Google, Microsoft, Red Hat, and others employ many open-source contributors.

**Open-core model**: Core is open source, premium features are proprietary. GitLab, MongoDB (historically), many developer tools.

**Support and services**: Software is free, support is paid. Red Hat's model.

**Cloud hosting**: Offer managed hosting of open-source software. AWS, various SaaS companies.

**Donations**: GitHub Sponsors, Open Collective, Patreon. Often insufficient for full-time work.

### The sustainability problem

Many critical projects are maintained by one or two unpaid volunteers:

- A single maintainer controls packages used by millions
- Security vulnerabilities go unpatched due to lack of time
- Maintainers burn out, projects become abandoned
- Companies extract billions in value from free labor

This is a known problem without a clear solution. Some foundations try to fund critical infrastructure, but gaps remain.

## Upstream and downstream

These terms describe relationships between projects:

**Upstream**: The original project where development happens.

**Downstream**: Projects that use or build on upstream.

```
Linux kernel (upstream)
    ↓
Fedora (downstream of Linux, upstream of RHEL)
    ↓
CentOS Stream (midstream)
    ↓
Red Hat Enterprise Linux (downstream)
    ↓
Your company's servers (downstream)
```

Why it matters:
- Bugs should be fixed upstream if possible
- Downstream projects inherit upstream changes
- Contributing upstream helps everyone downstream
- Upstream decisions affect downstream users (sometimes negatively)

## Common open-source foundations

**Linux Foundation**: Linux, Kubernetes, Node.js, many critical projects. Corporate members fund projects.

**Apache Software Foundation**: Apache web server, Kafka, Spark, Hadoop. Focus on governance and sustainability.

**Cloud Native Computing Foundation (CNCF)**: Kubernetes, Prometheus, Envoy. Cloud infrastructure projects.

**Python Software Foundation**: Python language, PyCon conferences.

**Mozilla Foundation**: Firefox, Rust (now separate), privacy advocacy.

**OpenJS Foundation**: jQuery, Node.js, Electron, webpack.

Foundations provide:
- Legal protection for contributors
- Governance frameworks
- Funding mechanisms
- Trademark management
- Neutral ground for competing companies

## The culture

Open source has cultural norms:

**Show your work**: Public discussions, transparent decisions, documented reasoning.

**Assume good faith**: Contributors mean well, even when wrong.

**Code speaks**: Working code over arguments. Prove your point with implementation.

**Meritocracy (in theory)**: Ideas judged on merit, not source. (In practice, biases exist.)

**Give credit**: Acknowledge contributors, maintain attribution.

**Respect maintainers' time**: Good bug reports, clear PRs, patience.

Violating these norms gets you ignored or banned. Following them gets your contributions accepted.

## Why companies open source their code

**Build community and ecosystem**: More users, more contributors, more integrations.

**Hiring**: Developers want to work on open-source projects.

**Standard-setting**: Open source can become the industry standard.

**Commoditize complements**: Make competitors' advantages free to reduce their leverage.

**Trust and transparency**: Users can verify security claims.

**Competitive moat**: If your open-source project dominates, competitors build on your foundation.

Not all open source is altruistic. Corporate strategy often drives decisions.

## Red flags in open-source projects

Before depending on a project, check:

- **When was the last commit?** Abandoned projects don't get security fixes.
- **Who maintains it?** One person? A company? A foundation?
- **What's the bus factor?** How many maintainers would need to be hit by a bus to kill the project?
- **What license?** Ensure it's compatible with your use case.
- **How are issues handled?** Responsive or ignored?
- **Is there a security policy?** Can vulnerabilities be reported responsibly?

A widely-used library maintained by one volunteer is a risk.

## Further reading

- [How to contribute to open source](/basics/how-to-contribute-to-open-source/): Getting started as a contributor
- [Git vs GitHub](/basics/git-vs-github/): Where open source lives
- [GitHub alternatives](/basics/github-alternatives/): Other platforms for open source
- [Developer community programs](/basics/developer-community-programs/): Formal programs around open source
