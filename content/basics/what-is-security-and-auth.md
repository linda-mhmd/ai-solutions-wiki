---
title: "What is Security and Auth?"
description: "Security and auth are how software lets the right people in and keeps everyone else out, by checking who you are and what you are allowed to do."
date: 2026-06-15
level: 1
categories: [Basics]
tags: [beginner, security, authentication, authorization]
last_updated: 2026-06-15
---

{{< quickanswer >}}
Security is everything an app does to let the right people in and keep everyone else out. "Auth" covers two jobs that do most of that work: authentication, which checks who you are (the login), and authorization, which checks what you are allowed to do. Secrets like passwords and keys are kept locked away, never written into the code.
{{< /quickanswer >}}

## What it actually is

Every app that holds something worth protecting (your messages, your money, your files) needs a way to tell friend from stranger. That whole effort is "security", and most of it comes down to two questions the software asks:

- Who are you? Proving your identity is called **authentication**. This is the login: a password, a code sent to your phone, a fingerprint, or a "sign in with Google" button.
- What may you do? Deciding what you are allowed to touch is called **authorization**. Being logged in does not mean you can do anything. A regular user can read their own files; an admin can also delete other people's.

A third piece sits behind both: **secrets**. Passwords, keys, and access tokens are the digital master keys. They are kept in a locked, separate place (often called a vault) and never typed directly into the code, because code gets shared, copied, and published.

## An everyday analogy

Picture a locked greenhouse: a key for the people who belong, and walls and alarms for everything that does not.

Your key fitting the lock is authentication, it proves you are meant to be here. But the front-gate key does not also open the seed cupboard or the pesticide locker. Who can open which door is authorization. And nobody tapes the master key to the gate where anyone could photograph it; it lives in a safe. That is how secrets are handled.

## How it works in practice

A simple way to remember it: who are you, and what may you do.

When you sign in, authentication runs first. You prove your identity, and the app hands you something like a temporary wristband (a session or token) that says "this person is logged in". After that, every time you try to do something, authorization checks that wristband against the rules: is this person allowed to open this page, edit this record, see this list?

The three pieces working together:

- **Authentication** checks who you are. The login.
- **Authorization** checks what you are allowed to do. The permissions.
- **Secrets** (passwords, keys) are kept in a vault, never hard-coded.

The guiding rule professionals follow is **least access**: give every person and every part of the system only the access it actually needs. That way, if one account is compromised, the damage stays small. One mistake cannot open everything.

## Why it matters

Security is not a feature you bolt on at the end. Most real-world breaches are not dramatic hacking; they are simple mistakes: a password left inside published code, a permission set too wide, an admin door left unlocked. Understanding the who-are-you and what-may-you-do split lets you ask the right questions of any AI assistant building for you: where does the login happen, who can do what, and where are the secrets kept?

## Where you will see this

- The **login screen** of any app, that is authentication.
- "You do not have permission to view this page", that is authorization saying no.
- "Sign in with Google", a trusted service handling authentication for you.
- Two-factor codes and fingerprint unlocks, extra proof of identity.
- Secret managers and environment variables, where keys live instead of in the code (see {{< relref "basics/what-are-environments" >}}).

## Common confusions

- **Authentication is not authorization.** Logging in proves who you are; it does not decide what you can do. They are two separate checks, and apps need both.
- **A locked login does not mean the app is secure.** If permissions are too loose or secrets sit inside the code, the front door being locked does not help.
- **HTTPS is not the whole story.** The browser padlock encrypts data in transit so nobody can snoop on it, but it says nothing about who may do what inside the app.

Most security work happens on the {{< relref "basics/what-is-frontend-and-backend" >}} backend and across {{< relref "basics/what-is-the-cloud" >}} cloud services, reached through an {{< relref "basics/what-is-an-api" >}}.
