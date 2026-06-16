---
title: "What is Testing?"
description: "Testing is checking that software works the way it should before real users ever touch it. It catches mistakes in seconds, not in front of a customer."
date: 2026-06-15
level: 1
categories: [Basics]
tags: [beginner, testing, quality, software]
last_updated: 2026-06-15
---

{{< quickanswer >}}
Testing means checking that software does what it is supposed to do before anyone relies on it. In practice, a test is a small piece of code that runs another piece of code and confirms the result is correct. Run those checks automatically on every change, and a mistake shows up in seconds instead of in front of a customer.
{{< /quickanswer >}}

## What testing actually is

When you build software, it is very easy to break something without noticing. You fix one thing, and a different part quietly stops working. Testing is how you find out, on your own terms, before the problem reaches a real person.

A test asks a simple question and demands a clear answer. "Does login work?" "Did my change break anything?" If the answer is no, it fails loudly and tells you where to look.

The key idea is automation. You write the check once, and the computer runs it for you every time the code changes. No need to remember to test by hand or click through the whole app to be sure it still works.

## An everyday analogy: choosing the strongest seedlings

Imagine you are planting a garden. You have a tray of seedlings, and not all of them are healthy. You can plant everything and hope for the best, then discover at harvest, months later, that half your plants never produced anything. Or you can inspect each seedling now, keep only the strong ones, and plant with confidence.

Testing is that inspection. It happens early, when fixing a problem is cheap and quick, instead of late, when the cost is a broken app and an unhappy user.

## How it works in practice

The goal is simple: catch it before the user does.

A test is a small piece of code that checks another piece does what it should. You give it a known input, run the real code, and confirm you got the expected output. If the output is wrong, the test fails. Teams collect many of these small checks and run them together, automatically, on every change. Common things they check:

- Does login work?
- Does the math add up?
- Did my change break anything?

Because the checks run in seconds, a break shows up right away, while the change is still fresh in mind, instead of a customer hitting it days later.

One real lesson from building production software: test against the real thing where it matters. It is common to replace a database or external service with a fake stand-in (a "mock") to make tests faster. But mocks can pass while the real system fails, because the fake never behaves exactly like production. The strongest tests run against real services, so a green light actually means something.

## Why it matters

Software is full of moving parts wired together (see [What is Software?]({{< relref "basics/what-is-software" >}})). Change one part and you can disturb another without realising it. Without tests, the only way to find out is for a user to find it for you, the worst possible time. Good tests give you confidence to change things: improve code, add a feature, or accept a fix from an AI assistant, then run the tests and instantly know whether anything broke.

## Where you will see this

- In [code]({{< relref "basics/what-is-code" >}}), tests usually live alongside the code they check, in files with names like `test_login.py` or `login.test.js`.
- Each test typically targets a small [function]({{< relref "basics/what-is-a-function" >}}), confirming it returns the right answer for a given input.
- Tests almost always run automatically before [deployment]({{< relref "basics/what-is-deployment" >}}). If one fails, the new version is blocked from going live, so a broken build never reaches users.

You do not need to write tests yourself to benefit from them. If you are directing an AI coding tool, asking "did you add a test for this?" is one of the most useful questions you can ask. A change with a passing test is a change you can trust.
