---
title: "Module 1: Start at zero: the basics"
description: "Module 1 of the AI Film Crew course: the basics. About 4.8 minutes, with the full video and its content to read through."
date: 2026-06-15
last_updated: 2026-06-15
weight: 1
chapter: 1
layer: "Foundations"
duration_min: 4.8
video_file: "m01.mp4"
summary: "Before any cloud words: what code, data, an API, a model, and the cloud actually are, in plain words."
tags: ["course","aws","beginner"]
concepts:
  - serverless
  - inference
  - foundation-models
  - ai-agents
---

This is not really about video. It is about how to build software and AI, and it starts at zero: every word behind every system, in plain words, each one with its garden picture.

{{< still src="m01-a.jpg" caption="Before any cloud words: what code, data, an API, a model, and the cloud actually are, in plain words." >}}

### Software

Software is code organised to do a real job, end to end. In the garden: not one seed, a whole working garden, with beds, paths and watering arranged to produce something. In practice: an app is rarely one big program, it is many small parts (the screen, the logic, the data, the glue between them), each doing one thing and wired together. Build the small parts well and the whole thing stays understandable.


{{< still src="m01-b.jpg" >}}
### A computer

A machine that follows instructions, step by step. It does exactly what it is told, nothing more. In the garden: a bed does only what you plant and water, it never decides anything on its own. In practice: when an app crashes, the computer did not decide to fail, the instructions hit a situation nobody wrote a step for (CPU runs the steps, RAM is short-term memory, storage keeps your files, the OS runs the apps). Programming is just writing those instructions precisely.

### Code

Instructions written in a language a computer understands. In the garden: the planting plan, what to sow, where, and in what order. In practice: a recipe tolerates a pinch of salt, code does not, one wrong character (print(result) versus prnt(result)) and it stops, and that strictness is exactly what keeps computers predictable. Python, JavaScript, SQL: hundreds of languages, one idea, write steps a computer follows.

### A function

A named, reusable step you can run whenever you need it. In the garden: like watering, one defined routine you repeat for any bed, instead of reinventing it each time. In practice: a function takes something in (a dry bed), does one job (water it), and hands a result back (a watered bed), so you call it a hundred times without rewriting it. Most code is just small functions calling each other.

### The terminal

A way to control the computer by typing instructions instead of clicking pictures. In the garden: like giving the gardener spoken instructions instead of walking them to every plant. In practice: everything you do by clicking can be typed (one line can make a folder and step inside it), and many builder tools only work this way. Git, Python and Docker live here, and you reach a server across the world the same way, over SSH.

### The internet

A global network of computers that agreed to speak the same language. In the garden: allotments joined by shared paths and pipes, so every plot can reach every other. In practice: it is a physical thing, undersea cables, buildings full of servers, and the router in your home (you type github.com, DNS looks up the address, a real server answers in milliseconds). The cloud is really data centres joined by cables under the ocean.

### A server

A computer that runs all the time and waits for requests. In the garden: the gardener always on duty, answering whenever someone asks for water or fruit. In practice: always on, no screen, living in a data centre, handling thousands of requests at once (the client asks for the homepage, the server finds and builds it, and sends the page back). Your own laptop becomes a server the moment you run npm run dev.

### An API

A contract for how two pieces of software talk to each other. In the garden: the agreed handoff at the garden gate, bring a crate this size, I fill it. In practice: you are the client, the service is the kitchen, and the API is the menu and the waiter, so you order in the set format and never see how the kitchen works. A weather app calls a weather API, paying calls Stripe's: GET reads, POST creates, PUT updates, DELETE removes.

### Data and JSON

Information, organised in a shape software can read. In the garden: the label on every tray (name, sown date, location) written the same way every time. In practice: JSON is the most common shape, just labelled values like "plant": "tomato", readable by a human and a machine at once. APIs send and receive data in shapes like this all day long.

### A database

An organised system for storing and finding data. In the garden: the seed vault and its records, everything labeled, found in seconds. In practice: a spreadsheet is fine for a hundred rows, but a database finds one row in millions, keeps it safe, and lets thousands read and write at once without clashing (tables, rows, and a query: find every order from June). Every app that remembers anything, your messages, your orders, sits on one.

### State

What the system remembers right now. In the garden: the condition of the bed today, how wet, how warm, what is planted, this very moment. In practice: state is the snapshot of how things are at this instant (logged in: yes, cart: 3 items, job: step 4 of 6), and change something and the state changes. A lot of bugs are really the state ending up in a shape nobody expected.

### Storage and files

Where the big things are kept so they survive. In the garden: the store room, the harvest and the photos of each season, kept safe and labelled. In practice: a database is for structured records, storage is for files (images, videos, backups, anything that is a file), and in the cloud this is object storage, like S3, cheap and almost endless. VideoFlow keeps every clip and every finished cut in storage like this.

### The cloud

Other people's computers, rented by the second. In the garden: you do not buy the land, you rent the plot and the water and pay only for what you use. In practice: own a server and you buy it, power it, replace it, and pay even when it sits idle, but rent the cloud and you start one in seconds and pay only for the minutes you use. This is why one person can now run what used to need a whole data centre.

### Scaling

Handling one user or a million without falling over. In the garden: repotting, when the plant outgrows the pot, you move it to a bigger one before the roots choke. In practice: scaling up gives one machine more power, scaling out adds more machines and shares the work (from one pot, to more pots sharing the load, to a whole automated field), and the cloud does scaling out automatically when demand rises. You design for it early so a sudden crowd is a good day, not an outage.

### Regions

Where your software physically lives in the world. In the garden: which country your garden is actually planted in, and whether you keep a second one elsewhere. In practice: a region is a cluster of data centres in one place (eu-central-1 in Frankfurt, us-east-1 in Virginia), so pick one near your users for fast responses, and run a copy in a second region for safety. VideoFlow runs the pipeline in one region and the AI crew in another, on purpose.

### AI

Software that learns patterns from data instead of following hand-written rules. In the garden: a gardener who learns your soil and weather over seasons, not one who follows a fixed almanac. In practice: the old way, a human writes the rule (if the email says FREE MONEY, mark it spam), the AI way, you show it a million emails already labelled and it learns the pattern itself, even cases nobody thought to write down. It is also why AI can be confidently wrong: it learned a pattern, it did not look up a fact.

### A model

The learned thing an AI produces and then uses. In the garden: the experienced gardener's instinct, built from many seasons, used to judge a new plant at a glance. In practice: training a model is the slow, expensive part (show it millions of examples until it captures the pattern), and after that using it to answer is fast. When you call Bedrock or OpenAI, you are using a model someone else already trained.

### Prompts

Telling an AI model, in words, what you want. In the garden: the note you leave the gardener, clear and specific gets a good result, vague gets a guess. In practice: a model only has your words to go on, so a vague prompt gets a vague answer, but give it the role, the context, and the format you want back and the output gets dramatically better. Prompting well is a real skill, and it is most of what vibe coding is.

### Version control

A system that tracks every change ever made. In the garden: the garden journal, every planting and change, dated, so you can always go back. In practice: every change is a commit, stamped with who, when, and why, so break something and you step back to any earlier point, and a whole team plants in one garden without overwriting each other (commit, branch, merge). Git is the tool, GitHub is where those gardens live and teams meet.

### GitHub

Where the world's code lives, and where teams build together. In the garden: the shared community plot, everyone's plantings in one place, with a record of who did what. In practice: Git tracks your changes on your machine, GitHub stores them online so others can see them, suggest changes, report problems, and build alongside you (repository, pull request, issues, releases). Almost every open project you have ever used lives on GitHub.

### Open source

Code anyone can read, use, and improve, for free. In the garden: a public field, the seeds are shared, anyone can plant them, and good improvements feed back to everyone. In practice: open-source software is published for anyone to use and change (Linux, Python, React, Remotion), so you build on the work of thousands of people and can give your improvements back. You will use far more open source than you will ever write.

### A framework

A ready-made starting kit so you do not begin from nothing. In the garden: buying an established plant instead of growing from seed, the hard early work is done, you tend it from there. In practice: a framework gives you the common parts already solved (structure, routing, conventions) so you write only the part that is actually yours, with React for screens, Next.js for web apps, FastAPI for backends. Choosing the right framework saves months, and this very video is built in one, Remotion.

### Frontend and backend

The part you see, and the part doing the work behind it. In the garden: the display of fruit at the stall, and the whole growing operation behind the scenes. In practice: the frontend runs in your browser or phone (buttons, screens, what you touch), the backend is the servers, logic, and database it talks to, and they meet at the API. A full-stack builder works on both sides of that line.

### Deployment

Going from working on your laptop to live for the world. In the garden: moving the seedling from your windowsill out into the real field where people can pick from it. In practice: code that runs only on your laptop helps no one, so deploying packages it up and puts it on real servers with an address anyone can reach (make deploy, building, uploading, live), and modern deploys are one command. The goal is deploying often, in small steps, not once in a big scary push.

### Environments

Separate copies of your system: one to experiment, one for real. In the garden: the balcony tray where you test a new seed, kept apart from the main field people actually eat from. In practice: you keep at least two, development where mistakes are free, and production the real one your users touch (with staging as a dress rehearsal in between), so you test in dev and promote to production only when it works. Never test a risky change directly on the field people are eating from.

### Testing

Checking it works before users ever see it. In the garden: inspecting each seedling and only planting the strong ones, instead of finding out at harvest. In practice: a test is a small piece of code that checks another piece does what it should (does login work, does the math add up, did my change break anything), run them automatically on every change and a break shows up in seconds, not in front of a customer. VideoFlow runs real tests against real services, because mocks passed while production failed.

### Monitoring and logs

Watching the live system, and keeping a record of what it did. In the garden: the sensor wall and the log book, live readings now, and the written history of every day. In practice: logs are the written trail of what happened, monitoring watches live numbers (errors, speed, cost) and alarms you when something crosses a line (logs: what happened, metrics: how much and how fast, alarms: tell me when it is wrong). At 2am, a clear log is the difference between a five-minute fix and a lost night.

### Security and auth

Letting the right people in, and keeping everything else out. In the garden: the locked greenhouse, a key for who belongs, walls and alarms for everything that does not. In practice: authentication checks who you are (the login), authorization checks what you are allowed to do, and secrets like passwords and keys are kept locked away in a vault, never written into the code. Give every part the least access it needs, so one mistake cannot open everything.

### Vibe coding

Building software by describing what you want in plain language and letting AI write the code. In the garden: telling an expert crew what you want, letting them plant it, then checking the bed yourself. This is where the course is going: by the end, you describe a change in plain English, read the diff the AI writes, and ship it.
