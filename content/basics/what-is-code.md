---
title: "What is Code?"
description: "Code is instructions written in a language a computer can understand. You don't need to write it yourself to understand what it does."
date: 2026-05-24
level: 1
categories: [Basics]
tags: [beginner, code, programming, languages]
docs: "https://developer.mozilla.org/en-US/docs/Learn"
docs_label: "Learn web development, MDN"
faqs:
  - question: "Which programming language should I learn first?"
    answer: "Python is the most recommended first language in 2026. It reads like plain English, has minimal syntax overhead, is used heavily in AI and data work, and there are excellent free resources. JavaScript is the right first language if your focus is web apps and browser-based projects. For vibe coders directing AI tools, understanding either, at a conceptual level, is more valuable than fluency in both."
  - question: "Is HTML code?"
    answer: "HTML is a markup language, not a programming language. It describes the structure of a document (this is a heading, this is a paragraph, this is a link) but it cannot make decisions, repeat actions, or do calculations. CSS is also a declarative language, it describes how things should look. JavaScript is the programming language of the web: it can respond to user actions, fetch data, and make decisions."
  - question: "What is the difference between a library and a framework?"
    answer: "A library is a collection of pre-written code you call when you need it, you are in control of the flow. React is technically a library. A framework is a structure you build inside, the framework calls your code. Next.js is a framework built on React. The distinction is called Inversion of Control: in a framework, the framework controls when your code runs."
last_updated: 2026-05-30
---

{{< quickanswer >}}
Code is a set of instructions written in a formal language that a computer can follow. Unlike human languages, code must be precisely correct, a single misplaced character causes it to fail. But this precision is also what makes it powerful: the computer will do exactly what you describe, every time, at billions of operations per second.
{{< /quickanswer >}}

<figure class="bz-figure">
  <img src="/img/obsidian-lab/bolt-mold-joint-triptych-notext.png" alt="A copper bolt, a precision mold, and interlocking joinery blocks side by side: three components each made to a standard, each fitting the next without rework." loading="lazy">
  <figcaption>Code is made of discrete pieces, each with a defined shape and purpose. Like a bolt cut to spec, they fit together without modification because the standard was decided before the cutting started.</figcaption>
</figure>

## Code is a recipe

The clearest analogy for code is a recipe. A recipe defines:
- What ingredients to gather (inputs)
- What steps to follow in what order (logic)
- What the result should be (output)

Code does the same thing. The difference is that a recipe tolerates improvisation ("a pinch of salt"). Code does not. If you write `prnt(result)` instead of `print(result)`, the program stops. This strictness is not a flaw, it is how computers stay predictable.

## What is a programming language?

Computers ultimately understand one thing: electrical signals representing ones and zeros (binary). Writing software in binary would be impossibly slow for humans.

**Programming languages** are a middle layer. They look roughly like English and let humans express ideas clearly. Tools then translate those instructions into the binary that the CPU actually runs. This translation process is called **compiling** or **interpreting** depending on how it works.

There are hundreds of programming languages. The most commonly used ones in 2026:

| Language | Common uses |
|---|---|
| **Python** | AI/ML, data science, scripting, web backends |
| **JavaScript / TypeScript** | Web browsers, Node.js backends, mobile apps |
| **Go** | High-performance servers, infrastructure tools |
| **Rust** | Systems programming, high-performance applications |
| **Swift / Kotlin** | iOS and Android apps |
| **SQL** | Querying databases |

The underlying idea, write instructions a computer follows, is the same in all of them. If you understand one, learning another is mostly learning new syntax.

## Compiled vs interpreted

This distinction comes up often:

**Compiled languages** (Go, Rust, C++) are translated into machine code once before running. The result is fast and self-contained, but compilation adds a step. Errors are caught before the program runs.

**Interpreted languages** (Python, JavaScript, Ruby) are translated and run line by line. Faster to develop with, slightly slower to execute. Errors appear at the exact line that fails.

TypeScript is unusual: it compiles to JavaScript, adding a type-checking step that catches many errors before the code runs.

For practical purposes as a builder: this distinction matters when choosing tools but not when describing what you want to an AI assistant. Focus on use case and ecosystem, not compile model.

## What does code actually look like?

A small piece of Python:

```python
# Get user expenses from a list, calculate the total
expenses = [42.50, 18.00, 95.99, 7.25]
total = sum(expenses)
print(f"Total expenses: {total:.2f}")
```

A piece of JavaScript that runs in a browser:

```javascript
// Show a message when a button is clicked
document.getElementById('submit-btn').addEventListener('click', function() {
  const name = document.getElementById('name-input').value;
  alert(`Hello, ${name}!`);
});
```

Notice: both are readable. Both describe a sequence of steps. Neither requires you to manage bits or memory addresses, the language handles all of that.

## Libraries, frameworks, and packages

Nobody writes everything from scratch. Code is built on layers of shared work:

**Library**, a collection of functions someone else wrote, which you import and call when needed. `pandas` is a Python library for data manipulation. `axios` is a JavaScript library for making HTTP requests.

**Framework**, a structured environment you build inside. The framework defines the overall pattern; you fill in the specifics. `FastAPI` is a Python web framework. `Next.js` is a JavaScript framework for React applications.

**Package manager**, the tool that downloads and manages libraries and frameworks:
- `npm install react` (JavaScript)
- `pip install pandas` (Python)
- `cargo add serde` (Rust)

The [npm registry](https://www.npmjs.com/) alone contains over two million JavaScript packages. Almost any capability you need has already been built and published.

## Frontend vs backend

These terms describe which part of the system code runs in:

**Frontend** code runs in the browser. It creates the interface the user sees and interacts with. Languages: HTML (structure), CSS (style), JavaScript (behaviour). Frameworks: React, Vue, Svelte.

**Backend** code runs on a server. It handles business logic, databases, security, and external services. Languages: Python, Node.js, Go, Ruby, Java, and many others. Frameworks: FastAPI, Express, Django, Rails.

**Full-stack** means working on both.

Most apps you use have both layers. The frontend is the visible part. The backend is what makes it actually do things, check passwords, store data, process payments.

## You do not need to write code to direct it

Understanding what code does, the logic it describes, is more important than being able to write it yourself. AI coding assistants (Claude, GitHub Copilot, Cursor) are translators: you describe the logic in plain language; they write the code.

But if you understand *what* code is doing, you can spot when the translation is wrong. "The AI generated this, but it is checking the wrong condition" is the kind of feedback that leads to good outcomes. "I don't understand any of this" leads to shipping bugs.

Understanding code, even at a conceptual level, makes you a better director of any AI coding tool.

## Further reading

- [Learn web development, MDN](https://developer.mozilla.org/en-US/docs/Learn), the most comprehensive free reference for HTML, CSS, and JavaScript
- [The Python Tutorial, python.org](https://docs.python.org/3/tutorial/), official, well-written, covers the language from basics
- [freeCodeCamp](https://www.freecodecamp.org/), free interactive courses from HTML basics to machine learning
- [Eloquent JavaScript](https://eloquentjavascript.net/), free book, very well written, covers JavaScript deeply
- [The Missing Semester of Your CS Education, MIT](https://missing.csail.mit.edu/), tools every developer uses: terminal, Git, editors, scripting
- [Fireship on YouTube](https://www.youtube.com/@Fireship), 100-second explainers on languages, frameworks, and concepts

## What's next

Next: [What is a Terminal?](/basics/what-is-a-terminal/), the text interface where you run code and control your computer directly.
