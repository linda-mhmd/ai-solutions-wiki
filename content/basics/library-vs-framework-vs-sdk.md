---
title: "Library vs Framework vs SDK vs API: What is What"
description: "A plain-English guide to the difference between a library, a framework, an SDK, and an API, so you know which tool to reach for."
date: 2026-06-23
level: 2
categories: [Basics]
tags: ["beginner", "library", "framework", "sdk", "api", "open-source", "tooling"]
docs: "https://martinfowler.com/bliki/InversionOfControl.html"
docs_label: "Martin Fowler: Inversion of Control"
faqs:
  - question: "What is the main difference between a library and a framework?"
    answer: "Your code calls a library. A framework calls your code. With a library, you stay in charge of the flow and ask the library to do one task at a time. With a framework, the framework owns the structure and runs your code at the right moments. Martin Fowler calls this reversal Inversion of Control."
  - question: "Is an SDK the same as a library?"
    answer: "No. An SDK is a kit. According to AWS, an SDK is a set of platform-specific building tools that bundles components like compilers, debuggers, libraries, documentation, tutorials, guides, and APIs. A library is one of the things an SDK may contain. Think of the SDK as the whole starter pack and the library as one item inside it."
  - question: "Do I need an API to use an AI model?"
    answer: "Usually yes. If you do not host the AI model yourself, you reach it through an API. AWS defines an API as a contract of service between two applications. You send a request in the format the contract defines, and the service sends a response back. Payment providers and AI models both work this way."
  - question: "Does open source mean I can do anything I want with the code?"
    answer: "Not quite. The Open Source Initiative says open source is more than access to the source code. The license must allow free redistribution, provide the source code, and allow modifications and derived works distributed under the same terms. Each open source license sets its own conditions, so read the license before you ship."
---

{{< quickanswer >}}
A library is code you call to do one job, like formatting a date. A framework is the opposite: it calls your code and decides the overall structure of your app. An SDK is a full toolkit for building on one platform, and it often bundles libraries, tools, and documentation together. An API is the contract two programs use to talk to each other, which is how you reach a service you do not host yourself.
{{< /quickanswer >}}

<figure class="bz-figure">
  <img src="/img/obsidian-lab/lever-chain-mechanism-notext.png" alt="A hand pushing a lever that drives a mechanical chain on dark slate. No em-dashes." loading="lazy">
  <figcaption>Choosing the right lever for the mechanism you want to drive is the same skill as choosing the right tool: a library, a framework, or an SDK.</figcaption>
</figure>

These four words appear in almost every technical document, tutorial, and AI coding prompt. People use them loosely, so they blur together. They are not the same thing. Once you can tell them apart, you read documentation faster and you direct AI tools with more precision. This article gives you a clear mental model for each one.

## Who calls whom: the core idea

The fastest way to tell a library from a framework is to ask one question: who is in charge of the flow? With a library, your code is in charge and you call the library. With a framework, the framework is in charge and it calls your code.

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Library</span>
    <span class="bz-flow-step-name">You call it</span>
    <span class="bz-flow-step-desc">Your code runs. It calls a library function. The function does work and returns control to your code.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Framework</span>
    <span class="bz-flow-step-name">It calls you</span>
    <span class="bz-flow-step-desc">The framework runs. It calls your code at the right moment. Control returns to the framework, not to you.</span>
  </div>
</div>

This reversal has a name. Martin Fowler calls it Inversion of Control, and he describes it as a key part of what makes a framework different from a library. The catchphrase is the Hollywood Principle: "Don't call us, we'll call you." Keep that one line in your head and the rest of this article falls into place.

## A real-world analogy: the kitchen

Picture cooking dinner. Each tool maps to one part of the kitchen.

- **A library** is like buying individual ingredients. You stay the cook. You decide the recipe, the order, and the timing. You reach for flour or salt when you want it. Each ingredient does its job and hands control back to you.
- **A framework** is like a meal-kit subscription. The kit decides the structure of the meal and the sequence of steps. You fill in your part at each stage, but the kit runs the show. It tells you when to chop and when to stir.
- **An SDK** is like a full kitchen starter pack for one brand of appliance. You get the pans, the utensils, the recipe booklet, and the cleaning kit, all chosen to work with that one oven.
- **An API** is like the order window at another kitchen. You do not cook there. You speak through the window using their menu and their rules, and they hand food back out to you.

## The problem these tools solve

You do not build everything from scratch. Writing every line of an app yourself would take years and repeat work that thousands of people already solved. Date handling, web servers, payment processing, and machine learning models are hard to build well. Libraries, frameworks, SDKs, and APIs let you reuse that work. The difference between them is how much structure they hand you and who stays in control.

## Library: your code calls it

A library is a set of functions or classes that your code calls. You decide when to call each one. Each call does some work and returns control to your code. Martin Fowler frames it this way: with a library, you are in charge and you call into the library.

A common example is a date-formatting library. You have a date stored as a long number. You want to show it as "23 June 2026". You call one function from the library and pass the date in.

```javascript
import { format } from "date-fns";

// Your code is in charge. You call the library when you need it.
const today = new Date();
const label = format(today, "d MMMM yyyy"); // "23 June 2026"
```

Notice the shape. Your code runs, calls `format`, gets a string back, and keeps going. The library never decides the flow of your program. You do.

## Framework: it calls your code

A framework embodies a design with built-in behavior. The framework calls your code, not the other way around. This is the Inversion of Control that Martin Fowler describes. You write small pieces of code, and you hand them to the framework. The framework decides when to run each piece.

A web framework is the clearest example. It owns the request flow. A request arrives from a browser. The framework receives it, decides which of your functions handles that address, and calls that function for you. You never write the loop that listens for requests. The framework runs that loop and calls you when it has work.

```python
from flask import Flask

app = Flask(__name__)

# You write this function. You do not call it yourself.
# The framework calls it when a request arrives at "/hello".
@app.route("/hello")
def hello():
    return "Hello"
```

You wrote `hello`, but you never call it. The framework calls it. That is the Hollywood Principle in action: "Don't call us, we'll call you." This is the single most useful idea for telling a framework from a library.

## SDK: a kit for one platform

An SDK is a Software Development Kit. AWS defines it as a set of platform-specific building tools for developers. An SDK bundles many things into one place: components like compilers, debuggers, and libraries, plus documentation, tutorials, guides, APIs, and sometimes frameworks. AWS sums it up as everything you need to develop and run software in one place.

So an SDK is bigger than a library. A library is one ingredient. An SDK is the whole kit, and a library may live inside it.

You meet SDKs in two common places. The AWS SDK gives you code that talks to AWS services without you writing the raw network requests by hand. A mobile SDK gives you the tools to build an app for one phone platform, with the libraries, build tools, and guides already chosen for you.

```python
# The AWS SDK for Python (boto3) bundles the code to call AWS services.
import boto3

# The SDK handles the network details so you call a method instead.
s3 = boto3.client("s3")
s3.upload_file("report.pdf", "my-bucket", "report.pdf")
```

You called a library-style method here, but it came from inside a larger kit. That kit is the SDK.

## API: a contract between programs

An API is an Application Programming Interface. AWS describes an API as a mechanism that lets two software components communicate using a set of definitions and protocols. AWS also calls it a contract of service between two applications. One program promises to accept requests in a fixed format and to send responses in a fixed format. The other program relies on that promise.

An API is not code you install. It is the agreement. You reach it across a network, often over the internet. To go deeper, read [What is an API?](/basics/what-is-an-api/).

The key distinction: a library and an SDK run inside your app, on your machine. An API lives somewhere else and you talk to it across the wire.

## Open source vs proprietary

Many libraries, frameworks, and SDKs are open source. The Open Source Initiative publishes the Open Source Definition, and it is stricter than people expect. Open source is not only access to the source code. The license must allow free redistribution, provide the source code, and allow modifications and derived works distributed under the same terms.

This matters for two reasons. First, open source tools let you read the code, fix it, and adapt it, which reduces your risk of being stuck. Second, the license sets conditions, so you read it before you ship a product on top. Proprietary tools keep the source code closed and set their own commercial terms. Neither is better in every case. The right choice depends on your budget, your control needs, and your legal constraints.

## When you need an API specifically

Reach for an API when you want to use a service you do not host yourself. You cannot install an entire AI model or a payment network onto your laptop and run it. Instead, the company that runs it exposes an API. You send a request to their address, and they send a response back.

Two everyday cases:

- **An AI model.** You send your text to the model provider's API and get the generated reply back. The heavy computing happens on their servers, not yours.
- **A payment provider.** You send the payment details to the provider's API and get a confirmation back. They handle the money movement and the compliance.

In both cases the work lives on someone else's machine, so an API is the only way in.

## How this maps to directing AI tools

When you direct an AI coding tool, you make these same choices, and naming them well improves the result. You tell the AI which library, framework, or SDK to use. A vague prompt like "build me a web app" leaves the AI to guess. A precise prompt names the tools.

Compare these two instructions. "Make a date show nicely" is vague. "Use the date-fns library to format the date as day, full month, year" is precise, because you named the library and the output. The same holds for frameworks and SDKs. "Build the backend with the FastAPI framework" or "call AWS using the boto3 SDK" tells the AI exactly which structure and toolkit to build on. The clearer your vocabulary, the more controllable the AI becomes.

## Comparison table

| | Library | Framework | SDK | API |
|---|---|---|---|---|
| **What it is** | A set of functions you call | A design with built-in behavior | A kit of tools for one platform | A contract between two programs |
| **Who calls whom** | You call it | It calls you (Inversion of Control) | You use its tools and libraries | You send requests, it sends responses |
| **Where it runs** | Inside your app | Around your app | Inside your build and your app | On another machine, across a network |
| **Example** | A date-formatting library | A web framework owning the request flow | The AWS SDK or a mobile SDK | An AI model or a payment provider |

## What's next

- [What is an API?](/basics/what-is-an-api/): the contract that lets your code talk to a service you do not host.
- [Frontend vs Backend](/basics/frontend-vs-backend/): where these tools sit in a real application.

## Further reading

- [Martin Fowler: Inversion of Control](https://martinfowler.com/bliki/InversionOfControl.html): the source for why a framework calls your code while you call a library.
- [AWS: What is an API?](https://aws.amazon.com/what-is/api/): the definition of an API as a contract of service between two applications.
- [AWS: What is an SDK?](https://aws.amazon.com/what-is/sdk/): the definition of an SDK as a set of platform-specific building tools.
- [Open Source Initiative: The Open Source Definition](https://opensource.org/osd): the conditions a license must meet to count as open source.
- [What is an API?](/basics/what-is-an-api/): a plain-English explainer on the wiki, with examples.
- [What is a Programming Language?](/basics/what-is-a-programming-language/): the foundation these tools are written in.
- [Frontend vs Backend](/basics/frontend-vs-backend/): how the pieces of an application fit together.
