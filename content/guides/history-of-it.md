---
title: "The History of IT: From the Abacus to the AI-Native Era"
description: "A sourced, comprehensive history of information technology: hardware, software, cloud, vendors, licensing, and trends. Why each layer exists, what became legacy, and the risk lessons every builder should learn from."
date: 2026-06-23
categories: [Guides]
tags: ["history", "timeline", "legacy", "licensing", "cloud", "virtualization", "architecture", "trends", "beginner"]
tools: []
related:
  - basics/history-of-computing
  - guides/history-of-software-architecture
  - guides/service-lifecycle-and-deprecation
  - guides/software-licensing-and-vendor-lock-in
  - guides/reading-technology-trends
last_updated: 2026-06-23
---

Information technology is not only software and architecture. It is also hardware, vendors, contracts, licenses, and the slow politics of what an organization can and cannot stop using. This guide tells that whole story in one place, from the abacus to AI agents, and it does something a normal timeline does not: it explains *why* each layer exists, *when* each idea genuinely appeared (with the original source), what later became *legacy*, and the *risk lessons* that keep repeating. If you only learn the new thing without its history, you are likely to repeat a mistake someone already made.

<figure class="bz-figure">
  <img src="/img/wardrobe/atelier-archive-overview.png" alt="A full dark atelier seen from above, every zone and archive visible at once. A complete view of how the pieces of IT history fit together." loading="lazy">
  <figcaption>The whole archive at once. IT history is layered: every era solved the previous era's pain and created the next era's constraint.</figcaption>
</figure>

This article is the written companion to the [interactive IT history timeline](/explore/it-timeline/), where you can filter by lifecycle state, follow legacy-to-successor connections, and open the primary source behind every date. For the pure beginner hardware story, start with [a short history of computing](/basics/history-of-computing/). For the architecture-specific deep dive, see [the history of software architecture](/guides/history-of-software-architecture/).

## The one pattern that explains all of it

Read the timeline below and the same shape repeats in every era. A constraint appears or lifts, and the dominant design moves to match it.

- Computers were rare and expensive, so one mainframe served many terminals.
- Cheap microprocessors put a computer on every desk, so work moved off the mainframe.
- The web connected those desks to the world, so businesses moved online.
- Web-scale traffic and large teams broke the monolith into services.
- Rentable cloud made elastic, pay-per-use the default.
- Transformer models turned data into general capability, and AI moved into the stack.

Architecture rarely changes for fashion. It changes when the cost of hardware, the reach of the network, the scale of demand, or the structure of teams makes the old shape too expensive. The same is true of vendors and licenses, which is the part most histories skip.

## The eras at a glance

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">to 1930s</span>
    <span class="bz-flow-step-name">Pre-electronic</span>
    <span class="bz-flow-step-desc">Gears and punched cards automate arithmetic and the first stored instructions.</span>
  </div>
  <div class="bz-flow-arrow">&rarr;</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">1940s-50s</span>
    <span class="bz-flow-step-name">Electronic dawn</span>
    <span class="bz-flow-step-desc">Tubes then transistors. The first commercial computers appear.</span>
  </div>
  <div class="bz-flow-arrow">&rarr;</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">1960s-70s</span>
    <span class="bz-flow-step-name">Mainframe</span>
    <span class="bz-flow-step-desc">One central machine, the relational database, and the first networks.</span>
  </div>
  <div class="bz-flow-arrow">&rarr;</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">1980s-90s</span>
    <span class="bz-flow-step-name">PC and client-server</span>
    <span class="bz-flow-step-desc">A computer on every desk, open standards, and the web.</span>
  </div>
  <div class="bz-flow-arrow">&rarr;</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">1995-2005</span>
    <span class="bz-flow-step-name">Web and enterprise</span>
    <span class="bz-flow-step-desc">Browsers, open-source servers, SaaS, and the dot-com era.</span>
  </div>
  <div class="bz-flow-arrow">&rarr;</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">2006-2010</span>
    <span class="bz-flow-step-name">Cloud</span>
    <span class="bz-flow-step-desc">Rent servers by the hour. Mobile puts computing in every pocket.</span>
  </div>
  <div class="bz-flow-arrow">&rarr;</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">2011-2019</span>
    <span class="bz-flow-step-name">Cloud-native</span>
    <span class="bz-flow-step-desc">Containers, Kubernetes, DevOps, and microservices.</span>
  </div>
  <div class="bz-flow-arrow">&rarr;</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">2020-now</span>
    <span class="bz-flow-step-name">AI-native</span>
    <span class="bz-flow-step-desc">Transformer models, plus a wave of open-source license wars.</span>
  </div>
</div>

## The timeline

<div class="bz-timeline">

  <div class="bz-tl-era">
    <div class="bz-tl-era-head">
      <span class="bz-tl-era-name">Pre-electronic computing</span>
      <span class="bz-tl-era-span">Antiquity to 1930s</span>
    </div>
    <p class="bz-tl-era-why"><strong>The driver:</strong> calculation was done by hand. Each device automated one more step of arithmetic or logic, building the ideas electronic computers would later run.</p>
    <ol class="bz-tl-list">
      <li class="bz-tl-item">
        <span class="bz-tl-year">1804</span>
        <div class="bz-tl-card">
          <span class="bz-tl-title">The Jacquard loom and the punched card</span>
          <p class="bz-tl-what">A loom controlled by a chain of punched cards. Changing the cards changed the woven pattern.</p>
          <p class="bz-tl-reason"><span class="bz-tl-reason-label">Why</span> It was the first stored, interchangeable set of instructions, the seed of the program. It led directly to Babbage's engines and to the punched cards that built IBM.</p>
        </div>
      </li>
      <li class="bz-tl-item">
        <span class="bz-tl-year">1843</span>
        <div class="bz-tl-card">
          <span class="bz-tl-title">Ada Lovelace's algorithm</span>
          <p class="bz-tl-what">A published method for computing Bernoulli numbers on Babbage's unbuilt Analytical Engine.</p>
          <p class="bz-tl-reason"><span class="bz-tl-reason-label">Why</span> It showed a machine could manipulate any symbol, not only numbers. That is the idea behind every application.</p>
        </div>
      </li>
      <li class="bz-tl-item">
        <span class="bz-tl-year">1936</span>
        <div class="bz-tl-card">
          <span class="bz-tl-title">The Turing machine</span>
          <p class="bz-tl-what">Alan Turing defined what is computable and described a universal machine that could run any program.</p>
          <p class="bz-tl-reason"><span class="bz-tl-reason-label">Why</span> It is the theoretical blueprint of the general-purpose computer, the reason one device can run any software.</p>
        </div>
      </li>
    </ol>
  </div>

  <div class="bz-tl-era">
    <div class="bz-tl-era-head">
      <span class="bz-tl-era-name">The electronic dawn</span>
      <span class="bz-tl-era-span">1940s to 1950s</span>
    </div>
    <p class="bz-tl-era-why"><strong>The driver:</strong> vacuum tubes then the transistor let machines compute with electricity instead of moving parts. Computing went from lab experiment to commercial machine.</p>
    <ol class="bz-tl-list">
      <li class="bz-tl-item">
        <span class="bz-tl-year">1945</span>
        <div class="bz-tl-card">
          <span class="bz-tl-title">ENIAC and the stored-program design</span>
          <p class="bz-tl-what">ENIAC, with about 17,000 vacuum tubes, ran in 1945. The same year, von Neumann described keeping program and data in one memory.</p>
          <p class="bz-tl-reason"><span class="bz-tl-reason-label">Why</span> The von Neumann architecture is still how nearly every computer works, from your phone to a data center.</p>
        </div>
      </li>
      <li class="bz-tl-item">
        <span class="bz-tl-year">1947</span>
        <div class="bz-tl-card">
          <span class="bz-tl-title">The transistor</span>
          <p class="bz-tl-what">Bell Labs demonstrated a small, solid electronic switch with no fragile glass or moving parts.</p>
          <p class="bz-tl-reason"><span class="bz-tl-reason-label">Why</span> It is the fundamental building block of all modern electronics and every chip.</p>
        </div>
      </li>
      <li class="bz-tl-item">
        <span class="bz-tl-year">1957-59</span>
        <div class="bz-tl-card">
          <span class="bz-tl-title">FORTRAN and COBOL</span>
          <p class="bz-tl-what">The first widely used high-level languages, for science (FORTRAN) and business (COBOL).</p>
          <p class="bz-tl-reason"><span class="bz-tl-reason-label">Why</span> They made programming usable beyond machine-code specialists. COBOL still runs core banking and government systems today, a vivid example of accepted legacy.</p>
        </div>
      </li>
    </ol>
  </div>

  <div class="bz-tl-era">
    <div class="bz-tl-era-head">
      <span class="bz-tl-era-name">The mainframe era</span>
      <span class="bz-tl-era-span">1960s to 1970s</span>
    </div>
    <p class="bz-tl-era-why"><strong>The driver:</strong> computers were rare, huge, and expensive, so one central machine served many users. Shared architectures, the relational database, and the first networks appeared.</p>
    <ol class="bz-tl-list">
      <li class="bz-tl-item">
        <span class="bz-tl-year">1964</span>
        <div class="bz-tl-card">
          <span class="bz-tl-title">IBM System/360</span>
          <p class="bz-tl-what">The first family of computers to share one architecture across many machine sizes.</p>
          <p class="bz-tl-reason"><span class="bz-tl-reason-label">Why</span> It created the idea of an instruction set that outlives any single machine. IBM Z mainframes still run that lineage, which is exactly why so much critical software cannot be moved off it.</p>
        </div>
      </li>
      <li class="bz-tl-item">
        <span class="bz-tl-year">1969-74</span>
        <div class="bz-tl-card">
          <span class="bz-tl-title">Unix, the relational model, and TCP/IP</span>
          <p class="bz-tl-what">Unix (1969) shaped operating systems. Codd's relational model (1970) gave databases a rigorous foundation. Cerf and Kahn's TCP/IP (1974) let networks interconnect.</p>
          <p class="bz-tl-reason"><span class="bz-tl-reason-label">Why</span> Three of the most durable ideas in computing. They underpin Linux, every SQL database, and the internet itself.</p>
        </div>
      </li>
    </ol>
  </div>

  <div class="bz-tl-era">
    <div class="bz-tl-era-head">
      <span class="bz-tl-era-name">PC and client-server</span>
      <span class="bz-tl-era-span">1980s to early 1990s</span>
    </div>
    <p class="bz-tl-era-why"><strong>The driver:</strong> cheap microprocessors put a computer on every desk. Work moved off the central machine, and open standards let independent vendors build a whole ecosystem.</p>
    <ol class="bz-tl-list">
      <li class="bz-tl-item">
        <span class="bz-tl-year">1981</span>
        <div class="bz-tl-card">
          <span class="bz-tl-title">The IBM PC</span>
          <p class="bz-tl-what">An open, documented architecture that let third parties build compatible hardware and software.</p>
          <p class="bz-tl-reason"><span class="bz-tl-reason-label">Why</span> Openness created the PC ecosystem and Microsoft's dominance through MS-DOS and Windows.</p>
        </div>
      </li>
      <li class="bz-tl-item">
        <span class="bz-tl-year">1983-89</span>
        <div class="bz-tl-card">
          <span class="bz-tl-title">GNU and the GPL</span>
          <p class="bz-tl-what">Richard Stallman launched the GNU Project (1983) and published the GPL (1989), the copyleft license.</p>
          <p class="bz-tl-reason"><span class="bz-tl-reason-label">Why</span> This is the legal foundation of open source. Understanding it is the start of understanding the license wars 30 years later.</p>
        </div>
      </li>
      <li class="bz-tl-item">
        <span class="bz-tl-year">1989-91</span>
        <div class="bz-tl-card">
          <span class="bz-tl-title">The World Wide Web and Linux</span>
          <p class="bz-tl-what">Tim Berners-Lee proposed the web at CERN (1989); CERN put the code in the public domain in 1993. Linus Torvalds released Linux (1991).</p>
          <p class="bz-tl-reason"><span class="bz-tl-reason-label">Why</span> A free web standard and a free operating system kernel became the backbone of everything that followed.</p>
        </div>
      </li>
    </ol>
  </div>

  <div class="bz-tl-era">
    <div class="bz-tl-era-head">
      <span class="bz-tl-era-name">The web and enterprise</span>
      <span class="bz-tl-era-span">mid-1990s to 2005</span>
    </div>
    <p class="bz-tl-era-why"><strong>The driver:</strong> the web connected personal computers to the world. Browsers, open-source servers, and the first internet businesses defined the dot-com era.</p>
    <ol class="bz-tl-list">
      <li class="bz-tl-item">
        <span class="bz-tl-year">1995</span>
        <div class="bz-tl-card">
          <span class="bz-tl-title">Java, JavaScript, PHP, MySQL, Apache</span>
          <p class="bz-tl-what">A wave of languages and open-source servers arrived in a single year.</p>
          <p class="bz-tl-reason"><span class="bz-tl-reason-label">Why</span> They made dynamic, database-backed websites cheap to build, and the open-source LAMP stack powered the early web.</p>
        </div>
      </li>
      <li class="bz-tl-item">
        <span class="bz-tl-year">1999-2001</span>
        <div class="bz-tl-card">
          <span class="bz-tl-title">Salesforce, VMware, and REST</span>
          <p class="bz-tl-what">Salesforce delivered software as a subscription (SaaS). VMware made x86 virtualization practical. Roy Fielding defined REST.</p>
          <p class="bz-tl-reason"><span class="bz-tl-reason-label">Why</span> SaaS, virtualization, and simple web APIs are three of the pillars the cloud was about to be built on.</p>
        </div>
      </li>
    </ol>
  </div>

  <div class="bz-tl-era">
    <div class="bz-tl-era-head">
      <span class="bz-tl-era-name">The cloud era</span>
      <span class="bz-tl-era-span">2006 to 2010</span>
    </div>
    <p class="bz-tl-era-why"><strong>The driver:</strong> renting computing by the hour replaced buying servers. Amazon, Google, and Microsoft turned infrastructure into a utility, and the smartphone put it in every pocket.</p>
    <ol class="bz-tl-list">
      <li class="bz-tl-item">
        <span class="bz-tl-year">2006</span>
        <div class="bz-tl-card">
          <span class="bz-tl-title">AWS launches, and "cloud" gets its name</span>
          <p class="bz-tl-what">Amazon launched S3 (March) and EC2 (August). Google's Eric Schmidt popularized the phrase "cloud computing" the same year.</p>
          <p class="bz-tl-reason"><span class="bz-tl-reason-label">Why</span> Pay-as-you-go infrastructure removed the need to buy hardware upfront, which reshaped how every company builds software.</p>
        </div>
      </li>
      <li class="bz-tl-item">
        <span class="bz-tl-year">2007-08</span>
        <div class="bz-tl-card">
          <span class="bz-tl-title">iPhone, Android, and GitHub</span>
          <p class="bz-tl-what">The smartphone launched the mobile-first era. GitHub made collaborative coding social.</p>
          <p class="bz-tl-reason"><span class="bz-tl-reason-label">Why</span> Mobile became the dominant way people reach software, and GitHub became the center of how it gets built.</p>
        </div>
      </li>
    </ol>
  </div>

  <div class="bz-tl-era">
    <div class="bz-tl-era-head">
      <span class="bz-tl-era-name">Cloud-native and DevOps</span>
      <span class="bz-tl-era-span">2011 to 2019</span>
    </div>
    <p class="bz-tl-era-why"><strong>The driver:</strong> containers and orchestration made software portable and elastic. Teams adopted DevOps, microservices, and automation to ship continuously at scale.</p>
    <ol class="bz-tl-list">
      <li class="bz-tl-item">
        <span class="bz-tl-year">2013-14</span>
        <div class="bz-tl-card">
          <span class="bz-tl-title">Docker, Kubernetes, Terraform</span>
          <p class="bz-tl-what">Docker (2013) made containers easy. Kubernetes (2014) orchestrated them. Terraform (2014) defined infrastructure as code.</p>
          <p class="bz-tl-reason"><span class="bz-tl-reason-label">Why</span> Containers are the newer abstraction that largely replaced full virtual machines for packaging apps, the layer above what VMware pioneered.</p>
        </div>
      </li>
      <li class="bz-tl-item">
        <span class="bz-tl-year">2017</span>
        <div class="bz-tl-card">
          <span class="bz-tl-title">The Transformer</span>
          <p class="bz-tl-what">Google's paper "Attention Is All You Need" introduced the Transformer architecture.</p>
          <p class="bz-tl-reason"><span class="bz-tl-reason-label">Why</span> It made models highly scalable and is the direct foundation of every modern large language model.</p>
        </div>
      </li>
    </ol>
  </div>

  <div class="bz-tl-era">
    <div class="bz-tl-era-head">
      <span class="bz-tl-era-name">AI-native and the license wars</span>
      <span class="bz-tl-era-span">2020 to now</span>
    </div>
    <p class="bz-tl-era-why"><strong>The driver:</strong> transformer models turned data into general capability, while a wave of relicensing and vendor consolidation reminded everyone that IT is contracts as much as code.</p>
    <ol class="bz-tl-list">
      <li class="bz-tl-item">
        <span class="bz-tl-year">2022-23</span>
        <div class="bz-tl-card">
          <span class="bz-tl-title">ChatGPT and frontier models</span>
          <p class="bz-tl-what">ChatGPT (2022) brought generative AI to the mainstream. GPT-4 and Claude launched the same day in March 2023.</p>
          <p class="bz-tl-reason"><span class="bz-tl-reason-label">Why</span> Capable models became a competitive platform layer for building applications, the way the cloud became a platform layer before it.</p>
        </div>
      </li>
      <li class="bz-tl-item">
        <span class="bz-tl-year">2023</span>
        <div class="bz-tl-card">
          <span class="bz-tl-title">HashiCorp's BSL and Broadcom's VMware</span>
          <p class="bz-tl-what">HashiCorp relicensed Terraform to the source-available BSL, prompting the OpenTofu fork. Broadcom bought VMware and ended perpetual licenses.</p>
          <p class="bz-tl-reason"><span class="bz-tl-reason-label">Why</span> Two reminders in one year that the license and the contract, not just the technology, decide your real cost and your freedom to leave.</p>
        </div>
      </li>
    </ol>
  </div>

</div>

The timeline above is a selection. The [interactive timeline](/explore/it-timeline/) holds the full set of milestones with primary sources, lifecycle states, and connections.

## How technology dies (the lifecycle thread)

Nobody outside IT understands why a bank still runs software from the 1980s. The reason is that technology does not die all at once. It fades through stages, and at each stage the cost of leaving rises.

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Stage 1</span>
    <span class="bz-flow-step-name">Active</span>
    <span class="bz-flow-step-desc">Current, recommended, getting new features.</span>
  </div>
  <div class="bz-flow-arrow">&rarr;</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Stage 2</span>
    <span class="bz-flow-step-name">Maintenance</span>
    <span class="bz-flow-step-desc">Supported, but no major new features. Past its peak.</span>
  </div>
  <div class="bz-flow-arrow">&rarr;</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Stage 3</span>
    <span class="bz-flow-step-name">Closed to new customers</span>
    <span class="bz-flow-step-desc">Existing users kept, the old model no longer sold.</span>
  </div>
  <div class="bz-flow-arrow">&rarr;</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Stage 4</span>
    <span class="bz-flow-step-name">Legacy, still running</span>
    <span class="bz-flow-step-desc">Past its prime, kept because replacing it costs too much.</span>
  </div>
  <div class="bz-flow-arrow">&rarr;</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Stage 5</span>
    <span class="bz-flow-step-name">Discontinued</span>
    <span class="bz-flow-step-desc">End of life. No support, no security fixes.</span>
  </div>
</div>

Windows XP (2001) reached the "legacy, still running" stage and stayed there for years past its 2014 end of support, because ATMs and industrial machines were too costly to migrate. Mainframes and COBOL are the same story at a larger scale. At the other end, Adobe Flash and Google Reader were discontinued outright. The full treatment, with how to plan for it, is in [how technology dies: the service lifecycle](/guides/service-lifecycle-and-deprecation/).

## IT is contracts, not just code (the legal thread)

The part of IT history that beginners never hear is that a technology choice is also a legal choice. The code can be excellent and the contract can still ruin you.

- **SAP** was founded in 1972 by five ex-IBM engineers to run finance, supply chain, and HR on one connected data model. Its R/3 suite (1992) became the system of record for much of the global economy. That is exactly why SAP is "like it is" today: sprawling, expensive, and very hard to leave, because it sits at the center of how a company actually runs.
- **Broadcom and VMware.** VMware's x86 virtualization (from 1999) made the cloud economically possible. After Broadcom completed its acquisition on 22 November 2023, it [ended perpetual licenses](https://blogs.vmware.com/cloud-foundation/2024/01/22/vmware-end-of-availability-of-perpetual-licensing-and-saas-services/) within weeks and moved to subscription-only bundles. Companies locked into VMware faced sharp price increases with no quick exit.
- **HashiCorp and Terraform.** On 10 August 2023, HashiCorp [relicensed Terraform](https://www.hashicorp.com/en/blog/hashicorp-adopts-business-source-license) from open source to the Business Source License. The community responded by forking it into [OpenTofu](https://www.linuxfoundation.org/press/announcing-opentofu) under the Linux Foundation. The same pattern hit MongoDB (2018), Elastic (2021), and Red Hat's CentOS (2020).

The lesson is that you should treat the license and the exit cost as first-class criteria, not an afterthought. The full history and a protection checklist are in [software licensing and vendor lock-in](/guides/software-licensing-and-vendor-lock-in/).

## Why Dynatrace started exactly when AWS did

This is a good example of history explaining the present. Dynatrace was founded in 2005. AWS launched S3 and EC2 in 2006. That timing is not a coincidence.

Before the cloud, debugging meant logging into the one server your app ran on. As applications moved to cloud infrastructure and split into many services across many machines, that approach broke. You could no longer see the whole transaction from one place. Application performance monitoring, and later observability, arose precisely to trace a single request as it crossed dozens of services. The cloud created the problem that observability solves, which is why the two industries grew up together. To go deeper, see [observability](/glossary/observability/).

## Is virtualization expensive legacy now?

The honest answer: it depends on whether you can leave. Virtualization itself is not obsolete. It still runs underneath most of the cloud. But the *VMware* product, after Broadcom's licensing changes, has become an expensive commitment for organizations that cannot move off it. Containers (Docker and Kubernetes) are the newer abstraction for packaging and running applications, and some teams are moving to open hypervisors like Proxmox or KVM, or to public cloud. So for a company that is locked in and cannot migrate, yes, it has become expensive legacy. For one that can, it is just one option among several. See [virtualization fundamentals](/glossary/virtualization-fundamentals/) for the technical picture.

## Where trends come from (and how to read them)

If you want to know what is rising and what is fading, you need to know where the signals are. The most cited is **Gartner**, the analyst firm founded in 1979. Its **Magic Quadrant** plots vendors on two axes, completeness of vision and ability to execute, sorting them into Leaders, Challengers, Visionaries, and Niche Players. Its **Hype Cycle**, introduced by Jackie Fenn in 1995, charts how expectations for a new technology rise to a peak, crash into a trough, and then recover to a realistic plateau.

These tools are useful and also much debated, because vendors pay to engage with analysts and because hype is hard to separate from substance. Other signals worth tracking include the ThoughtWorks Technology Radar, the CNCF landscape, and the Stack Overflow Developer Survey. The full guide is [how to read technology trends](/guides/reading-technology-trends/).

## The mistakes that keep repeating

History is most useful as a list of errors you do not have to make again.

| Lesson from history | The mistake | How to avoid it |
|---|---|---|
| **Lock-in is a contract risk** | Building on VMware or a single cloud with no exit plan | Treat exit cost and license terms as first-class selection criteria |
| **Free tiers can vanish** | Depending on Google Reader or free CentOS for production | Have a paid or self-hostable fallback for anything critical |
| **Open source can be relicensed** | Assuming Terraform or Elasticsearch will stay open forever | Prefer foundation-governed projects; watch who controls the license |
| **Legacy is a slow trap** | Letting Windows XP or a mainframe app become un-migratable | Budget for migration before the cost of staying exceeds the cost of leaving |
| **Hype is not adoption** | Buying the peak of a hype cycle | Wait for the slope of enlightenment; pilot before you commit |
| **Dependencies are your risk** | Ignoring a deep library like Log4j until it breaks | Maintain a software bill of materials and patch plan |

## Further reading

- [The History of IT: interactive timeline](/explore/it-timeline/): every milestone, filterable by lifecycle, with the original source behind each date.
- [A short history of computing](/basics/history-of-computing/): the beginner hardware story, from the abacus to the chip.
- [The history of software architecture](/guides/history-of-software-architecture/): the architecture-specific deep dive from mainframes to AI-native.
- [How technology dies: the service lifecycle](/guides/service-lifecycle-and-deprecation/): the maintained-to-legacy lifecycle and how to plan for it.
- [Software licensing and vendor lock-in](/guides/software-licensing-and-vendor-lock-in/): the legal history every builder should know.
- [How to read technology trends](/guides/reading-technology-trends/): Gartner, the hype cycle, and where to find real signal.
- [Computer History Museum: Timeline of Computer History](https://www.computerhistory.org/timeline/): the definitive public history of computing.
