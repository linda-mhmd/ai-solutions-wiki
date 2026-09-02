---
title: "When Automation Pays For Itself"
description: "A ten-minute manual task and three hours of automation break even at eighteen runs. The arithmetic is simple; what people get wrong is the maintenance cost on the other side of it."
date: 2026-09-02
categories: [Guides]
tags: ["automation", "platform-engineering", "decision-making", "maintenance", "developer-experience"]
tools: []
related: ["guides/the-cost-of-not-updating-your-platform", "guides/backstage-as-an-agent-interface", "guides/what-your-ai-assistant-can-actually-do"]
last_updated: 2026-09-02
---

A task takes ten minutes by hand. Automating it takes three hours. When is that
worth doing?

The arithmetic is trivial. Three hours is 180 minutes; at ten minutes saved per
run, you break even at **eighteen runs**. Run it eighteen times a year and the
automation pays for itself inside twelve months. Run it twice a year and you
have spent three hours to save twenty minutes, and you will spend more than that
again keeping it alive.

That is the whole calculation, and it is worth doing out loud before starting,
because the answer is frequently "don't".

## The break-even table

| Manual time | Build time | Runs to break even |
|---|---|---|
| 10 min | 3 h | 18 |
| 10 min | 1 day | 48 |
| 30 min | 3 h | 6 |
| 30 min | 1 day | 16 |
| 2 h | 1 week | 20 |

Two things fall out immediately.

**Frequency matters more than duration.** A ten-minute task done weekly is worth
automating. A two-hour task done twice a year is not, even though it feels much
more painful.

**Build time is usually underestimated by a factor of two or three,** because the
estimate covers the happy path. The error handling, the input validation, the
thing that only fails in the real environment — those are the second half, and
they are the half nobody quotes.

## The cost the table leaves out

Break-even assumes automation is free once written. It is not.

Automation is code. It has dependencies that drift, credentials that expire,
APIs that deprecate underneath it, and assumptions that quietly stop being true.
A useful rule of thumb is **20% of build time per year in maintenance**, and it
is higher for anything touching a cloud provider.

Fold that in and the honest question is not "will this pay for itself" but "will
this pay for itself *and* the upkeep, before the thing it automates changes
enough that I rewrite it anyway".

That reframing kills a lot of automation that looked marginal, which is the
point.

There is a worse failure than not automating: automation that decays unnoticed.
A pipeline nobody has run in two years is not a time saving, it is a liability
with a green badge on it — and you discover its true state at the moment you
urgently need it.

## When to automate anyway, despite the arithmetic

The calculation is about time. Some reasons to automate are not.

**Consequence, not frequency.** Creating a cloud account has inputs that cannot
be changed afterwards without a support case. That is worth encoding in a form
with validation even if you do it three times, because the cost of getting it
wrong is not measured in minutes.

**Access, not effort.** If only one person can do the task, automation is not
saving ten minutes — it is removing a bottleneck and a single point of failure.
That is worth real money regardless of run count.

**Auditability.** A manual change leaves a person's memory as the record. A
pipeline leaves a log, a diff, and an approval. In a regulated context that
difference is the entire justification and the time saving is incidental.

**Correctness that decays.** Anything with a checklist longer than about five
steps will be done inconsistently by humans, and the inconsistency compounds
silently. Encoding it is worth doing at surprisingly low frequencies.

## When to deliberately not automate

**Once or twice a year, low consequence.** Write it down instead. A good
checklist is ten minutes of work and never breaks.

**The process is still changing.** Automating an unstable process means
rewriting the automation each time it moves, and you pay the build cost
repeatedly. Wait until it has stopped changing.

**One caller.** Generalising a script into a parameterised, validated, reusable
thing typically triples its cost. Do that when the second caller appears, not in
anticipation of one.

**The failure mode is worse than the task.** Automation that half-completes can
leave a system in a state nobody designed for. If the manual version is ten
minutes and the broken-automation version is an afternoon of forensics, the
maths changes.

## The middle ground people skip

The choice is not manual versus fully automated. There is a lot of room between,
and most of the value sits in the cheap end.

- **A written checklist.** Minutes to produce, eliminates the "how did we do this
  last time" problem, and never breaks.
- **A script that does one step.** No parameters, no error handling, no reuse.
  Half an hour, and it removes the fiddliest part.
- **A parameterised script.** A few hours. Now other people can run it.
- **A template with validation and a form.** A day or more. Now anyone can run
  it, safely, with bad input rejected before anything happens.
- **Fully automated, triggered by an event.** Days. Now nobody runs it at all.

Each rung costs several times the one below. Climb only as far as the frequency
justifies. Most tasks should stop at rung one or two, and the instinct to jump
straight to the top is where over-engineering comes from.

## A worked example

A request arrives: create three cloud accounts, one per environment. Someone
says, reasonably, that they are not going to click through a console to do it.

**Manual:** roughly ten minutes per account in the console, plus the contacts,
multi-factor setup and recovery documentation, which are manual either way.

**What automation actually replaces:** the account creation and the access
assignment. Maybe fifteen minutes of the forty-five per account.

**What it costs:** if a vending template already exists, adapting it is a couple
of hours. Building one from nothing is a day or more.

**Runs per year:** three now. Perhaps another handful as projects appear.

By the table, **that does not pay for itself.** Three runs against eighteen.

And yet it is still the right call, for the reasons that are not about time: the
root email cannot be changed afterwards, so validating it before creation has
value out of proportion to the ten minutes; a template makes the operation
repeatable by someone other than the one person who knows the console; and the
resulting audit trail is a compliance requirement, not a convenience.

The tell is that **every one of those justifications is a non-time reason.** If
the only argument had been "it saves ten minutes", the correct answer would have
been a checklist.

Notice also what automation did *not* remove. Contacts, root multi-factor,
recovery documentation, verifying the regions you need — the majority of the
checklist stayed manual. Automating the tractable fraction and describing the
work as done is its own failure mode, and a common one.

## The question to ask first

Before building anything, answer three things:

1. **How many times a year, honestly?** Not "it could be used for". Actual runs.
2. **What is the cost of doing it wrong once?** If that is high, the time
   arithmetic stops being the deciding factor.
3. **Who maintains it, and does it have a scheduled build?** If nobody owns it
   and nothing exercises it on a schedule, it will be broken when you next need
   it, and you will not know until then.

If the answers are "twice", "not much", and "nobody" — write a checklist and go
do something else.
