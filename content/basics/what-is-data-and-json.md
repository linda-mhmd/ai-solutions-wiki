---
title: "What is Data (and JSON)?"
description: "Data is information organised in a shape software can read. JSON is the most common shape: labelled values a human and a machine can both understand."
date: 2026-06-15
level: 1
categories: [Basics]
tags: [beginner, data, json, api]
last_updated: 2026-06-15
---

{{< quickanswer >}}
Data is just information, organised in a shape that software can read. The most common shape on the web is called JSON. JSON is a way of writing down labelled values (a name and a value, over and over) so that a person and a computer can both read the same thing without confusion.
{{< /quickanswer >}}

## What data actually is

When people say "data," they do not mean anything mysterious. They mean facts written down in a tidy, predictable way: a name, a date, a price, a status. The important word is predictable. If every record is written the same way every time, software can read thousands of them in a blink and never get lost.

Raw information becomes useful data the moment it has structure. A pile of sticky notes is information. A spreadsheet with the same columns on every row is data.

## An everyday analogy: the label on the tray

Picture a plant nursery. Every tray of seedlings has a small label, and every label has the same three things in the same order: the plant name, the date it was sown, and where it lives. Name, sown date, location, written the same way on every single tray.

Because the labels are consistent, anyone can walk down the row and find what they need instantly. A machine reading the labels does not have to guess either. That consistency is exactly what data structure gives software. The shape is agreed in advance, so both sides know what to expect.

## How it works in practice: a shape both sides agree on

JSON (it stands for JavaScript Object Notation, but you do not need to remember that) is the most common shape for data on the internet. It is just labelled values, readable by a human and a machine at once. Here is what one little tray label looks like in JSON:

```json
{
  "plant": "tomato",
  "stage": "ripening",
  "days_left": 6
}
```

Read it like a list of labels and answers:
- The label `plant` has the value `tomato`.
- The label `stage` has the value `ripening`.
- The label `days_left` has the value `6`.

The curly braces `{ }` just mark the start and end of one record. Text values sit inside quotation marks; numbers like `6` do not. That is most of the rules. JSON is deliberately simple so that nothing gets lost in translation.

## Why it matters

Software is constantly handing information to other software. When two systems exchange data, they have to agree on the shape first, otherwise one side sends a mess the other cannot read. JSON is the agreement most of the web has settled on.

When an app loads your messages, fetches the weather, or shows your order history, JSON is almost certainly travelling back and forth behind the scenes. {{< relref "basics/what-is-an-api" >}} are the connectors that pass it around, and they send and receive data in shapes like this all day long.

## Where you will see this

- API responses: ask a weather service for today's forecast and you usually get JSON back.
- Config files: many tools store their settings in a JSON file you can open and read.
- Saved records: a {{< relref "basics/what-is-a-database" >}} stores structured data and often hands it back as JSON.

## Common confusions

- "Is data the same as JSON?" No. Data is the information. JSON is one popular way of writing it down. CSV, XML, and YAML are other shapes for the same idea.
- "Do I need to write JSON by hand?" Rarely. Tools generate and read it for you. It just helps to recognise it.
- "Is JSON code?" Not really. {{< relref "basics/what-is-code" >}} gives instructions a computer follows. JSON just describes information; code reads it.

## What's next

Next: [What is an API?](/basics/what-is-an-api/), the connector that carries data like this between apps all day long.
