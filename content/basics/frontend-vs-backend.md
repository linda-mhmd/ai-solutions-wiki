---
title: "Frontend vs Backend: The Layers of an App"
description: "A plain-English guide to the frontend, backend, database, and infrastructure layers that make up every modern app."
date: 2026-06-23
level: 1
categories: [Basics]
tags: ["beginner", "frontend", "backend", "full-stack", "web-development", "architecture", "api"]
docs: "https://developer.mozilla.org/en-US/docs/Learn"
docs_label: "MDN Web Docs: Learn Web Development"
faqs:
  - question: "What is the difference between frontend and backend?"
    answer: "The frontend is the part of an app you see and touch: the screens, buttons, and text in your browser or phone. The backend is the part you never see: the logic, the security checks, and the database access that run on a server somewhere else. The frontend asks the backend for things, and the backend answers."
  - question: "Do I need to learn both frontend and backend?"
    answer: "Not to start. Many people learn one side first and get useful work done with it. If you want to build a complete app on your own, you eventually touch both. A person who works across both sides is called a full-stack developer."
  - question: "Is JavaScript a frontend or a backend language?"
    answer: "Both. JavaScript started in the browser as a frontend language. A tool called Node.js lets the same language run on a server, so you can also write backend code in JavaScript. That is one reason JavaScript is so popular: one language covers both sides."
  - question: "Where does the database fit in?"
    answer: "The database sits behind the backend. The frontend never talks to the database directly. The backend reads from and writes to the database on the frontend's behalf, which keeps your data safe. You can read more in our guide on what a database is."
---

{{< quickanswer >}}
Every app is built in layers. The **frontend** is what you see and click, running in your browser or phone. The **backend** is the hidden logic running on a server: it checks who you are, applies the rules, and reaches the data. The **database** stores that data. The **infrastructure** is the servers, cloud, and networking everything runs on. The frontend talks to the backend over an API across the internet. Knowing which layer does what helps you decide what to learn first, or what to ask an AI tool to build.
{{< /quickanswer >}}

<figure class="bz-figure">
  <img src="/img/dark-cherry/grid-foundation.png" alt="A dark floor with glowing red neon grid seams receding into the distance. No em-dashes." loading="lazy">
  <figcaption>An app rests on layers the way a floor rests on a foundation grid: each layer carries the one above it.</figcaption>
</figure>

When you open an app, it looks like one smooth thing. Behind that surface sit four layers, each with its own job. Understanding these layers is the single most useful map you can carry into web development. Once you see the layers, every tutorial, job title, and AI prompt starts to make sense.

## The four layers at a glance

Read this stack from top to bottom. The top is closest to you. The bottom is closest to the metal.

<div class="bz-arch">
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Frontend</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">HTML</span>
      <span class="bz-arch-chip">CSS</span>
      <span class="bz-arch-chip">JavaScript</span>
      <span class="bz-arch-chip-note">Runs in the browser or app. This is what the user sees and clicks.</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Backend</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Business logic</span>
      <span class="bz-arch-chip">Authentication</span>
      <span class="bz-arch-chip">API endpoints</span>
      <span class="bz-arch-chip-note">Runs on a server. The user never sees this code.</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Database</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Tables</span>
      <span class="bz-arch-chip">Records</span>
      <span class="bz-arch-chip">Queries</span>
      <span class="bz-arch-chip-note">Where data is stored and retrieved. The backend talks to it, not the frontend.</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Infrastructure</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Servers</span>
      <span class="bz-arch-chip">Cloud</span>
      <span class="bz-arch-chip">Networking</span>
      <span class="bz-arch-chip-note">The physical and virtual machines all the code runs on.</span>
    </div>
  </div>
</div>

## A restaurant you already understand

The layers map onto a restaurant almost perfectly. Hold this picture in your head and the rest of the article will click.

The **dining room and the menu** are the frontend. This is what you, the guest, see and touch. You read the menu, point at a dish, and watch your plate arrive. You never walk into the back.

The **kitchen** is the backend. It is hidden behind a door. The cooks take your order, follow the recipe, decide what is allowed, and prepare the dish. You trust the kitchen, but you do not see it work.

The **pantry and the fridge** are the database. This is where ingredients are stored. The kitchen reaches in to grab what it needs and puts new stock away. You, the guest, never open the fridge yourself.

The **building and its utilities**, the walls, the power, the water, and the gas, are the infrastructure. Nothing else works without them, yet a happy guest rarely thinks about them.

The **waiter carrying orders** between your table and the kitchen is the API. The waiter takes your request to the kitchen and brings the result back. The frontend and backend never shout across the room. They pass messages through this messenger, in a format both sides agree on.

## How a single click travels

Here is what happens when you tap a button, told as a journey across the layers.

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 1</span>
    <span class="bz-flow-step-name">You click in the frontend</span>
    <span class="bz-flow-step-desc">You tap "Save" in the browser. The frontend gathers your input and prepares a request.</span>
  </div>
  <div class="bz-flow-arrow">&rarr;</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 2</span>
    <span class="bz-flow-step-name">The request crosses the internet</span>
    <span class="bz-flow-step-desc">The request travels over the internet and reaches the backend through an API endpoint.</span>
  </div>
  <div class="bz-flow-arrow">&rarr;</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 3</span>
    <span class="bz-flow-step-name">The backend reads or writes the database</span>
    <span class="bz-flow-step-desc">The backend checks who you are, applies the rules, and stores or fetches data in the database.</span>
  </div>
  <div class="bz-flow-arrow">&rarr;</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 4</span>
    <span class="bz-flow-step-name">The response returns to the frontend</span>
    <span class="bz-flow-step-desc">The backend sends a result back over the internet. The frontend updates the screen you see.</span>
  </div>
</div>

This round trip usually finishes in a fraction of a second. It happens every time you log in, post a comment, or load a list.

## What the frontend is

The frontend is the **client side**: the part that runs on your device. Open any website, and the frontend is everything the browser draws. It is built from three core technologies that work together.

**HTML** provides the structure. It marks up what each piece of content is: a heading, a paragraph, an image, a button. Think of HTML as the skeleton of the page.

**CSS** provides the style. It controls colour, spacing, fonts, and layout. CSS turns a plain skeleton into something that looks designed. It decides whether a button is red and round or grey and square.

**JavaScript** provides the behaviour. It reacts when you click, type, or scroll. JavaScript makes the page interactive: it opens menus, validates forms, and sends requests to the backend.

The frontend runs in the browser on a phone, tablet, or laptop. Because it runs on the user's own device, anyone can view its code. That is why secrets, like passwords and payment logic, never live in the frontend.

## What the backend is

The backend is the **server side**: the part that runs on a server, a computer you do not own and never see. The backend handles the work that must stay private and trusted.

The backend holds the **business logic**: the rules of your app. It decides whether a discount applies, whether an order can ship, or whether a username is taken. These rules live on the server so no user can tamper with them.

The backend handles **authentication**: confirming who you are. It checks your password, issues a login token, and decides what you are allowed to see. This must be private, so it cannot live in the frontend.

The backend also handles **database access**. It reads and writes the stored data on the frontend's behalf. The frontend never touches the database directly, which keeps your data protected behind one trusted gatekeeper.

Backends are built in many languages. Common choices include **Python**, **Java**, **PHP**, **C#**, **Go**, **Ruby**, and **JavaScript** through Node.js. Each has strengths, but they all do the same kind of work: receive a request, apply logic, talk to the database, and return a response.

## The database layer

The database is where your app's data lives for the long term. Every user account, order, message, and setting sits in a database, ready to be retrieved later.

When you sign up, your details get stored in a database. When you log in months later, the backend fetches those same details and recognises you. Without a database, an app would forget everything the moment you closed it.

The frontend never reaches the database itself. It asks the backend, and the backend reads or writes the data. This single gate keeps your data safe and consistent. To go deeper, read [what is a database?](/basics/what-is-a-database/).

## The infrastructure layer

Infrastructure is the foundation everything else stands on: the **servers**, the **cloud**, and the **networking**. Your backend code does not float in space. It runs on real computers, often rented from a cloud provider.

Infrastructure also covers how those computers connect to the internet, how traffic is routed, and how the system scales when more people show up. When an app stays fast under heavy load, good infrastructure is doing quiet work in the background.

For most beginners, infrastructure is the last layer to worry about. Modern platforms handle much of it for you, so you can focus on the frontend and backend first.

## How the layers communicate

The frontend and backend live in different places and often run in different languages. They still need to cooperate. They do it through an **API**, which stands for application programming interface.

An API is an agreed set of requests the backend will answer. The frontend sends a request to an API endpoint, the request crosses the **internet**, and the backend replies with data. Both sides agree on the format ahead of time, so neither needs to know how the other is built internally.

This separation is powerful. You can rebuild the entire frontend without touching the backend, as long as the API stays the same. To understand this handshake in depth, read [what is an API?](/basics/what-is-an-api/) and [what is the internet?](/basics/what-is-the-internet/).

## What "full-stack" means

A **full-stack** developer works across both the frontend and the backend. "Stack" refers to the layered set of technologies an app is built from. To be full-stack is to be comfortable up and down that stack.

A full-stack developer can build a button, wire it to an API, write the backend logic behind it, and store the result in a database. Many people specialise in one side and go deep. Others stay full-stack and go broad. Both paths are valid, and neither is better.

## Which languages live where

Languages tend to settle into one layer, though some cross over. This table shows the typical home of each.

| | Frontend | Backend |
|---|---|---|
| **Runs where** | In the browser, on the user's device | On a server, away from the user |
| **Main job** | Show the interface and handle clicks | Apply logic, check access, reach the data |
| **Example languages and tools** | HTML, CSS, JavaScript | Python, Java, PHP, C#, Go, Ruby, Node.js |
| **Who sees it** | Everyone can view the code | Hidden from users, stays private |

Notice that JavaScript appears on both sides. In the browser it is frontend. Through Node.js it runs on the server as backend. That overlap is one reason JavaScript is so widely used.

## Mapping this to what you learn or build

This layered map turns a vague goal into a clear plan. Once you know the layers, you can aim your effort.

If you love design and want quick visual results, **start with the frontend**: learn HTML, then CSS, then JavaScript. If you enjoy logic, rules, and data, **start with the backend**: pick one language, such as Python, and learn to build an API. There is no wrong door.

The same map sharpens what you ask an AI tool to build. Instead of "make me an app", you can say "build a frontend form in HTML and JavaScript that sends the data to a Python backend, which saves it to a database". You name the layers, name the languages, and describe how they talk. Clear requests across the layers produce far better results.

## What's next

- [What is an API?](/basics/what-is-an-api/): how the frontend and backend pass messages to each other.
- [Library vs Framework vs SDK](/basics/library-vs-framework-vs-sdk/): the building blocks you use inside each layer.

## Further reading

- [MDN Web Docs: Learn Web Development](https://developer.mozilla.org/en-US/docs/Learn): the trusted, free starting point for HTML, CSS, JavaScript, and the web.
- [What is a programming language?](/basics/what-is-a-programming-language/): the foundation under both frontend and backend code.
- [What is an API?](/basics/what-is-an-api/): the contract that lets the frontend and backend cooperate.
- [What is a database?](/basics/what-is-a-database/): where your app stores data for the long term.
- [What is the internet?](/basics/what-is-the-internet/): the network every request travels across.
- [Library vs Framework vs SDK](/basics/library-vs-framework-vs-sdk/): how to tell apart the tools you build each layer with.
