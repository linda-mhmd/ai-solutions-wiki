---
title: "What is Storage (and Files)?"
description: "Storage is where software keeps the big, heavy things, images, videos and backups, so they survive and can be found again later."
date: 2026-06-15
level: 1
categories: [Basics]
tags: [beginner, storage, files, cloud, s3]
last_updated: 2026-06-15
---

{{< quickanswer >}}
Storage is where the big things are kept so they survive. A file is one of those things: a photo, a video, a document, a backup. When you close an app or turn off a machine, whatever was saved to storage is still there when you come back.
{{< /quickanswer >}}

## What storage actually is

Every app deals with two kinds of remembering. One is small, structured records (a name, an order, a date) and that lives in a [database]({{< relref "basics/what-is-a-database" >}}). The other is the big, heavy stuff: images, videos, audio, backups, anything that is a whole file. That second kind is what storage is for.

A file is just a named lump of data that stays saved: the photo you took, the video you exported, the spreadsheet you wrote. Each one has a name and a size, and it sits in storage until something asks for it again.

The key word is "survive". Some memory in a computer is temporary and disappears the moment the power goes (that is RAM, the short-term memory of a [computer]({{< relref "basics/what-is-a-computer" >}})). Storage is the opposite: it holds on to things even when everything is switched off.

## An everyday analogy: the store room

Think of a working garden. There is the bed you are actively tending today, and then there is the store room out back, where you keep the harvest from each season and the photos of how every bed looked, all kept safe and labelled so you can pull any one of them out later.

Storage is that store room. You do not work inside it every minute, but it is where the finished, valuable, heavy things live so nothing gets lost.

## How it works in practice

The simplest version is the storage on your own laptop or phone: when you hit save, the file is written to the disk and it is there next time. But once software runs for lots of people, files need to live somewhere central that any server can reach.

In the cloud, the common answer is called object storage. You hand it a file, it gives you back an address, and later you use that address to fetch the file again. The best known one is Amazon S3 (Simple Storage Service). It is built to be cheap and almost endless: you can keep a handful of files or billions of them, and you pay mostly for how much you store and how often you read it.

A quick map of what tends to go where:

- images: photos, thumbnails, scans
- videos: uploads, exports, finished cuts
- backups: copies kept safe in case something breaks
- anything that is a file: PDFs, audio, archives, logs

So a video app keeps every raw clip and every finished export in storage like this, and keeps the small records about them (title, length, who uploaded it) in a database. The database holds the labels; the storage holds the heavy thing each label points to.

## Why it matters

Storage is what lets software remember more than a moment. Without it, every photo, document and video would vanish the instant you closed the app. Cloud storage in particular changed what one person can do: you no longer buy and manage rows of hard drives, you rent space by the gigabyte and let it grow as far as you need. That is the same rent-not-own idea behind [the cloud]({{< relref "basics/what-is-the-cloud" >}}) in general.

## Common confusions

- Storage versus a database. A database is for many small, structured records you search through fast. Storage is for whole files. You usually use both, and they point at each other.
- Storage versus RAM. RAM is fast, temporary working memory that clears when power is lost. Storage keeps things permanently. An app loads a file from storage into RAM to work on it, then saves it back.
- "The cloud" is not magic. Cloud storage is still real hard drives in real buildings, just someone else's, rented for you so you do not have to manage them.

## What's next

Next: [What is the Cloud?]({{< relref "basics/what-is-the-cloud" >}}), the rented computers and storage that almost every modern app runs on.
