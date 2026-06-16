---
title: "What is State?"
description: "State is what a system remembers right now: who is logged in, what is in the cart, which step a job reached. Change something and the state changes."
date: 2026-06-15
level: 1
categories: [Basics]
tags: [beginner, state, frontend, debugging]
last_updated: 2026-06-15
---

{{< quickanswer >}}
State is simply what a system remembers right now. It is the snapshot of how things are at this exact moment: who is logged in, what is sitting in the shopping cart, which step a task has reached. When you do something, like add an item or log out, the state changes to match.
{{< /quickanswer >}}

## What state actually is

Every app you use is keeping track of where things stand right at this instant. That live picture is called its **state**.

State is not the long history of everything that ever happened. It is the *now*. Think of the difference between a diary (the whole story, written down) and a photograph taken this second (just how things look right now). State is the photograph.

A simple example: open a music app. Right now its state might be "song playing, volume at 40 percent, you are logged in as Sam." Pause the song and the state becomes "song paused." Nothing about the past changed; the current snapshot did.

## An everyday analogy: a garden bed

Picture a single garden bed. Its state is the condition of that bed today: how wet the soil is, how warm it is, what is planted in it, this very moment.

Water it, and the "how wet" part of the state changes. The sun comes out, and "how warm" changes. Plant a seed, and "what is planted" changes. The bed is the same bed, but its state is different from one hour to the next. You can always look at the bed and read its current state without needing to know the entire season's weather.

That is exactly how software state works. It is the current reading, and it shifts every time something happens.

## How it works in practice

State is the snapshot of how things are at this instant. Here is a real one for an online shop while you browse:

- logged in: yes
- cart: 3 items
- job: step 4 of 6

Each line is one piece of the current state. Add a fourth item and "cart: 3 items" becomes "cart: 4 items." Log out and "logged in: yes" becomes "logged in: no." The job finishing its next task moves it from "step 4 of 6" to "step 5 of 6."

The app constantly reads this state to decide what to show you. If "logged in" is yes, it shows your name and a logout button. If the cart has items, it shows the checkout button. Change the state, and the screen updates to match.

## Why state matters

State is where a huge share of software bugs actually come from. A lot of bugs are really the state ending up in a shape nobody expected.

For example: the screen says your cart has 3 items, but the system secretly thinks it has 2, so checkout charges the wrong amount. Nothing is wrong with the buttons or the design. The state got out of sync with reality. When you hear a developer say "it works on my machine" or "try refreshing," they are often chasing a state that drifted into a surprising shape.

Understanding state helps you describe problems clearly. "After I log out and log back in, the cart still shows the old items" tells a builder exactly which piece of state is misbehaving.

## Where you will see this

- In the browser: every interactive page tracks state (which tab is open, what you typed into a form, whether a menu is expanded). Front end frameworks like React are built almost entirely around managing state.
- In your account: "logged in" is a piece of state held about you, usually so the system does not ask for your password on every click.
- In long tasks: a video upload or an AI job often shows "step 4 of 6," which is the job reporting its current state.

## Common confusions

- **State versus a database.** State is the live, right now snapshot. A [database]({{< relref "basics/what-is-a-database" >}}) is the long term, saved record. Close the app and most in memory state vanishes; the database keeps what was saved.
- **State versus history.** History is everything that happened. State is only where things stand now. You can rebuild state from history, but they are not the same thing.

Related reading: [What is Code?]({{< relref "basics/what-is-code" >}}), [What is an API?]({{< relref "basics/what-is-an-api" >}}), and [What is a Server?]({{< relref "basics/what-is-a-server" >}}).
