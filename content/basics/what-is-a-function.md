---
title: "What is a Function?"
description: "A function is a named, reusable step in code. You write the job once, give it a name, then run it whenever you need it."
date: 2026-06-15
level: 1
categories: [Basics]
tags: [beginner, functions, programming, code]
last_updated: 2026-06-15
---

{{< quickanswer >}}
A function is a named, reusable step you can run whenever you need it. You write the instructions for one job once, give that job a name, and then you can call it again and again without rewriting it. Most software is just lots of small functions calling each other.
{{< /quickanswer >}}

## What a function actually is

A function takes something in, does one job, and hands a result back. That is the whole idea.

The important word is **reusable**. Instead of writing the same steps over and over, you write them once, name them, and refer to them by that name. Calling the function runs all those steps for you. If you ever need to fix the job, you change it in one place and every part of the program that uses it gets the fix.

Three pieces are worth knowing by name:
- **Input** (also called arguments or parameters): what you hand to the function to work on.
- **The body**: the steps the function carries out.
- **Output** (also called the return value): what the function gives back when it is done.

## An everyday analogy: watering the garden

Think about watering a flower bed. The routine is always the same: check the soil, turn on the water, give the right amount, turn it off. You do not invent a brand new way to water every single bed. You have one defined routine and you repeat it for any bed that needs it.

A function is that routine, written down and given a name. Imagine a function called `water(bed)`:
- **Input**: a dry bed
- The one job: `water(bed)` does the watering
- **Output**: a watered bed

Now you can water the first bed, the tenth bed, and the hundredth bed by calling `water(bed)` each time. You never rewrite the steps. You just point the routine at a different bed. That is exactly what reusing a function feels like.

## How it works in practice

Say you are building an app and you need to greet people by name in several places: a welcome screen, an email, a notification. Instead of writing the greeting logic three times, you write one function.

In plain terms, you define it once:

```python
def greet(name):
    return "Hello, " + name + "!"
```

Then you call it wherever you need a greeting:

```python
greet("Linda")    # gives back: Hello, Linda!
greet("Sam")      # gives back: Hello, Sam!
```

Here `name` is the input, the line inside is the one job, and the text it hands back is the output. You wrote the job once. You can now use it a hundred times without rewriting it. If you later decide greetings should say "Welcome" instead of "Hello", you edit the function once and every greeting in the whole app updates.

## Why it matters

Functions are how code stays manageable. A large program written as one giant list of steps would be almost impossible to read or trust. Broken into small named functions, each doing one clear job, it becomes something you can reason about a piece at a time.

This also matters when you direct AI coding tools. When an assistant writes `calculateTotal()` or `sendEmail()`, you do not need to read every line inside. The name tells you what the job is, the way good chapter titles make a book easy to navigate. If you understand what [code](/basics/what-is-code/) is built from, you can spot when an AI assistant has wired a function in a way that does not match what you asked for.

## Where you will see this

- **APIs**: when you call an [API](/basics/what-is-an-api/), you are often calling a function that lives on someone else's [server](/basics/what-is-a-server/). You send input, it does a job, it sends a result back.
- **Libraries**: most of the shortcuts in programming are just collections of functions other people wrote, ready for you to call.
- **The brackets**: when you see a word followed by `()`, like `water()` or `greet("Sam")`, that is almost always a function being called. The brackets hold the input.

## What's next

Next: [What is an API?](/basics/what-is-an-api/), the way one program calls functions in another program across the internet.
