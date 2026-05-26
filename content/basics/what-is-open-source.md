---
title: "What is Open Source?"
description: "Open source means the code is publicly available for anyone to read, use, modify, and contribute to. Most of the internet runs on it."
date: 2026-05-24
level: 2
categories: [Basics]
tags: [beginner, open-source, community, licensing]
youtube_id: "Tyd0FO0tko8"
youtube_title: "What is Open Source Software?"
youtube_channel: "Explained with Dom"
docs: "https://opensource.guide/"
docs_label: "Open Source Guides, GitHub"
faqs:
  - question: "Is open source the same as free?"
    answer: "Open source means the source code is publicly available, not necessarily that it costs nothing. 'Free' in open source refers to freedom (to read, modify, and distribute), not price. Most open source software is also free to use, but companies build commercial products on top of open source code. Red Hat, MongoDB, and Elastic all built major businesses on open source foundations. 'Free software' and 'open source' are related but philosophically distinct terms."
  - question: "Can I use open source code in a commercial product?"
    answer: "It depends on the licence. MIT and Apache 2.0 licences allow commercial use, you can build a paid product using MIT-licensed code, as long as you keep the copyright notice. GPL (GNU General Public Licence) requires that if you distribute software using GPL code, your software must also be GPL (open source). This is called 'copyleft'. Check the licence of every dependency you use. choosealicense.com explains the common ones clearly."
  - question: "How do I find open source projects to contribute to?"
    answer: "GitHub's 'good first issue' label marks tasks maintainers have identified as appropriate for new contributors. Search GitHub for topics you care about plus 'good first issue'. The First Contributions repository (github.com/firstcontributions/first-contributions) walks you through making your first pull request step by step. Hacktoberfest (October each year) is a global event where you can contribute to projects and earn rewards."
---

{{< quickanswer >}}
Open source software is software whose code is publicly available. Anyone can read it, use it, modify it, and distribute it, subject to the terms of the licence. This is how most of the infrastructure of the internet was built: collectively, by thousands of contributors around the world.
{{< /quickanswer >}}

## The idea behind open source

Most commercial software, Microsoft Word, Adobe Photoshop, Salesforce, is **proprietary**. The company keeps the source code private. You can use the software but you cannot see how it works, change it, or build on top of it.

Open source inverts this. The code is public. Anyone can:
- Read it to understand how it works
- Report bugs and verify they are fixed
- Modify it for their own needs
- Contribute improvements back
- Build new software on top of it

The most successful projects attract thousands of contributors from around the world, improving the software faster than any single company could.

## Why most of the internet runs on open source

When you visit almost any website or use almost any app, the underlying infrastructure was built on open source:

- **Linux**, the operating system running the vast majority of the world's servers, all Android phones, and the foundation of macOS. Free and open since 1991.
- **PostgreSQL, MySQL**, the relational databases storing enormous amounts of the world's structured data
- **Python, Node.js, Go, Rust**, the languages that power most modern backend services
- **React, Vue, Angular**, the frameworks that build the user interfaces of most web apps
- **Kubernetes, Docker**, the container orchestration and packaging tools used to deploy software at scale
- **Linux kernel in Android**, every Android device runs Linux at its core

Google, Meta, Amazon, and Microsoft all contribute heavily to open source because they benefit from these shared foundations improving collectively. They also release their own tools as open source (TensorFlow, React, Kubernetes, VS Code) to attract developers to their ecosystems.

## Open source licences

Open source does not mean "do whatever you want." Each project has a **licence** that defines the exact terms of use. The most common ones:

| Licence | Commercial use | Share alike | Notes |
|---|---|---|---|
| **MIT** | Yes | No | Most permissive. Keep copyright notice. Used by React, jQuery, Ruby on Rails. |
| **Apache 2.0** | Yes | No | Like MIT plus an explicit patent grant. Used by Kubernetes, TensorFlow. |
| **GPL v3** | Yes | Yes, must open source your code | "Copyleft", your software must also be GPL if distributed. Used by Linux kernel (v2), Git, WordPress. |
| **LGPL** | Yes | Only the library itself | A weaker copyleft for libraries. Using an LGPL library does not force your whole app to be open. |
| **AGPL** | Yes | Yes, includes network use | Like GPL but also applies if you run the software as a service (SaaS). MongoDB switched to AGPL. |
| **BSL / SSPL** | Restricted |, | "Source available" but not truly open source. Used by some companies to prevent cloud providers competing. |

[choosealicense.com](https://choosealicense.com/) is the clearest guide to picking a licence for your own project and understanding what others' licences mean.

## How open source is funded

Open source software is often assumed to be volunteer work, but there are sustainable funding models:

- **Company-backed projects**: React (Meta), Go (Google), VS Code (Microsoft), Kubernetes (Google/CNCF)
- **Foundation-sponsored**: Linux (Linux Foundation), Python (PSF), Rust (Rust Foundation), Apache (Apache Software Foundation)
- **Dual licensing**: The project is open source for open source use, but commercial users pay for a licence (MySQL, GitLab)
- **Open core**: Core product is open source; enterprise features are proprietary (MongoDB, Elastic)
- **Sponsorships**: GitHub Sponsors, Open Collective, Patreon, individuals and companies fund maintainers directly

Many critical open source projects remain underfunded, maintained by one or two volunteers. The [Log4Shell vulnerability in 2021](https://en.wikipedia.org/wiki/Log4Shell) exposed this: a library maintained by volunteers was embedded in millions of enterprise systems.

## How to use open source in your project

When you build software, you almost never start from scratch. You use **packages**, bundles of open source code published by others, installed via package managers:

```bash
npm install react            # JavaScript/TypeScript
pip install fastapi          # Python
cargo add tokio              # Rust
go get github.com/gin-gonic/gin  # Go
```

The package manager downloads the code, records which exact version you are using (in a lock file), and manages updates. The lock file is crucial: it ensures every developer on the team and every server in production runs exactly the same dependency versions.

Before using a package, check:
1. Its **licence**, is commercial use allowed for your project?
2. Its **maintenance status**, is it actively maintained? When was the last release?
3. Its **download count**, widely used packages tend to be better maintained
4. Its **security record**, does it have known vulnerabilities? ([Snyk Advisor](https://snyk.io/advisor/) helps)

## How to contribute to open source

If you find a bug or want to add a feature to an open source project:

1. **Read CONTRIBUTING.md**, most projects have guidelines for contributors
2. **Find an issue**, look for "good first issue" labels for newcomers
3. **Fork** the repository on GitHub (creates your own copy)
4. **Clone** your fork locally
5. **Create a branch** for your change (`fix/issue-42-null-pointer`)
6. **Make your change** and write a test if applicable
7. **Open a Pull Request** to the original repository
8. **Respond to review feedback**, maintainers will suggest changes
9. **Get merged**, your contribution is now part of the project, used by everyone

[First Contributions](https://firstcontributions.github.io/) walks through this entire flow with a practice repository specifically for first-time contributors.

## Further reading

- [Open Source Guides, GitHub](https://opensource.guide/), how to start a project, build community, and get paid
- [Choose a Licence](https://choosealicense.com/), plain-language explanations of every common licence
- [First Contributions](https://firstcontributions.github.io/), your first pull request, step by step
- [Hacktoberfest](https://hacktoberfest.com/), annual October event, contribute to open source and earn rewards
- [The Cathedral and the Bazaar (essay)](http://www.catb.org/~esr/writings/cathedral-bazaar/), the foundational essay on how open source development works differently from proprietary development
- [Roads and Bridges: The Unseen Labor Behind Our Digital Infrastructure (free PDF)](https://www.fordfoundation.org/work/learning/research-reports/roads-and-bridges-the-unseen-labor-behind-our-digital-infrastructure/), on the open source sustainability problem

## What's next

Next: [What is a Server?](/basics/what-is-a-server/), where code actually runs when it is not running on your laptop.
