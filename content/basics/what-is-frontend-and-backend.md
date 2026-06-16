---
title: "What is Frontend and Backend?"
description: "Frontend is the part of an app you see and touch. Backend is the part doing the work behind it. They talk to each other through an API."
date: 2026-06-15
level: 1
categories: [Basics]
tags: [beginner, frontend, backend, full-stack, api]
last_updated: 2026-06-15
---

{{< quickanswer >}}
The frontend is the part of an app you actually see and click: the buttons, screens, and text. The backend is everything happening behind it: the servers, the logic, and the database where information is stored. They are two halves of the same app, and they talk to each other through a connection called an API.
{{< /quickanswer >}}

## What it actually means

Every app you use has two sides.

The **frontend** runs on your device, in your web browser or in the app on your phone. It is the part you can point at: the search box, the colours, the "Add to cart" button. Its job is to show you things and react when you tap.

The **backend** runs somewhere else, on a server (a computer that runs all the time so other computers can reach it). You never see it. Its job is the real work: checking your password, saving your order, doing the maths, talking to other systems.

The two meet at the **API**, which is just an agreed way for the frontend to ask the backend for something and get an answer back. Think of it as a contract: "if I ask for your orders, you send them back in this exact shape."

## An everyday analogy: the stall and the operation behind it

Picture a fruit stall at a market.

The **frontend** is the display at the front: the fruit laid out neatly, the prices, the sign, the person you talk to. It is what the customer sees and touches.

The **backend** is the whole growing operation behind the scenes: the field, the watering, the workers picking and sorting, the records of what is ripe and how much is left. The customer never sees any of that, but without it there would be nothing on the stall.

When you ask "do you have any strawberries?" you are sending a request. Someone checks the stock in the back and comes back with an answer. That back-and-forth is the API.

## How it works in practice

Here is the path when you click a button in a real app:

- **Frontend** is what you see and click (the screen, the button)
- **API** is the contract between the two sides (how they ask and answer)
- **Backend** is the logic, the data, and the actual work

Say you log in. The frontend takes the email and password you typed and sends them through the API to the backend. The backend checks them against the database, decides whether you are allowed in, and sends back a yes or no. The frontend then shows you either your home screen or an error message.

The frontend never checks the password itself, and it never stores everyone's account details. That work stays on the backend, where it is safe and out of reach. This split is deliberate: the visible part stays simple, and the important, sensitive work happens somewhere protected.

## Why it matters

Knowing which side does what helps you understand any app you use or build.

- If something looks wrong but the data is correct, it is usually a frontend issue (how it is shown).
- If the data itself is wrong or missing, it is usually a backend issue (how it is stored or calculated).
- A person who works on both sides is called a **full-stack** builder. "Stack" just means the whole pile of technology, top to bottom.

When you direct an AI coding tool, saying "this is a frontend change, just move the button" versus "this is a backend change, the total is being calculated wrong" points it at the right half of the app and gets you a better result.

## Where you will see this

- Every website and mobile app you use has both. A weather app: the frontend is the sun-and-clouds screen, the backend pulls the live forecast.
- Job listings split this way. "Frontend developer" means the visible side. "Backend developer" means the behind-the-scenes side. "Full-stack" means both.
- On phones, the frontend is often built with tools like [React Native]({{< relref "basics/what-is-react-native" >}}).

## Related pages

- [What is an API?]({{< relref "basics/what-is-an-api" >}}), the contract that lets the two sides talk
- [What is a Server?]({{< relref "basics/what-is-a-server" >}}), the always-on computer the backend runs on
- [What is a Database?]({{< relref "basics/what-is-a-database" >}}), where the backend keeps its data
- [What is Code?]({{< relref "basics/what-is-code" >}}), the instructions both sides are written in
