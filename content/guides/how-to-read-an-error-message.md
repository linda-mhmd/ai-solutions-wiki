---
title: "How to Read an Error Message"
description: "The anatomy of an error message, how to read a stack trace, where errors hide, what HTTP status codes mean, and how to report an error so an AI can actually fix it."
date: 2026-07-17
categories: [Guides]
tags: ["beginner", "debugging", "errors", "logs", "vibe-coding", "stack-trace"]
related:
  - for/vibe-coders
  - basics/what-is-a-terminal
  - basics/what-is-monitoring-and-logs
  - guides/getting-unstuck-when-the-ai-loops
---

Cryptic error messages are the wall most beginners hit first. A red block of text appears, it looks like an accusation, and the instinct is to look away and paste it somewhere. Here is the reframe this whole guide builds on: an error message is not an insult. It is the computer telling you, in a rigid but honest format, exactly what went wrong and usually where. Learning to read that format is a 20-minute skill that pays off every single day you build.

<figure class="bz-figure">
  <img src="/img/dark-cherry/terminal-interface.png" alt="A dark industrial terminal with a glowing red screen set into black machinery. No em-dashes." loading="lazy">
  <figcaption>The red screen is not the machine breaking. It is the machine reporting. Every error message is a status report written in a strict format, and the format is learnable.</figcaption>
</figure>

## An error message has anatomy

Almost every error, in every language and every tool, carries the same three parts. Once you can name them, no error looks like random noise again.

<div class="bz-arch">
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Type</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">KeyError</span>
      <span class="bz-arch-chip">TypeError</span>
      <span class="bz-arch-chip">502 Bad Gateway</span>
      <span class="bz-arch-chip-note">The category of failure. One or two words, usually first or last.</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Message</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">'price'</span>
      <span class="bz-arch-chip">Cannot read properties of undefined</span>
      <span class="bz-arch-chip-note">The specifics. What was missing, wrong, or refused.</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Location</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">app.py, line 7</span>
      <span class="bz-arch-chip">app.js:24:18</span>
      <span class="bz-arch-chip-note">The file and line number where it happened. Your map reference.</span>
    </div>
  </div>
</div>

- **Type** answers "what kind of problem is this?". A `TypeError` means a value was the wrong kind of thing. A `KeyError` means a lookup failed. A `404` means an address did not exist.
- **Message** answers "which thing, exactly?". It names the missing key, the undefined variable, the file that could not be found.
- **Location** answers "where in the code?". A file name plus a line number, and sometimes a column number after a second colon.

Read those three parts out loud as a sentence. "A KeyError happened: the key 'price' was missing, at line 7 of app.py." That sentence is usually 80% of the diagnosis.

## Stack traces: find the error line, then find your file

A stack trace (also called a traceback) is the list of function calls that led to the error. A function is a named block of code, and functions call each other, so the trace reads like a chain: this called that, which called that, which failed. It looks overwhelming because it shows the whole chain, including internal code from libraries and frameworks you did not write.

Two rules tame it:

1. **Find the line that names the error.** In Python that line is at the bottom, so read the last line first and work backwards. In JavaScript it is at the top, so read the first line and work downwards.
2. **Find the nearest line that mentions a file you wrote.** Lines pointing into `node_modules`, `site-packages`, or framework internals are the machinery reacting to your bug, not the bug. Skip them without guilt. The line naming your own file is where you open your editor.

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 1</span>
    <span class="bz-flow-step-name">Do not scroll past</span>
    <span class="bz-flow-step-desc">Stop. The answer is probably in the text you are avoiding.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 2</span>
    <span class="bz-flow-step-name">Find the error line</span>
    <span class="bz-flow-step-desc">Last line in Python, first line in JavaScript. Read type and message aloud.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 3</span>
    <span class="bz-flow-step-name">Find your file</span>
    <span class="bz-flow-step-desc">Scan for a file name you recognise. Ignore library and framework paths.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 4</span>
    <span class="bz-flow-step-name">Open that line</span>
    <span class="bz-flow-step-desc">Go to the exact file and line number. Look at what the message names.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 5</span>
    <span class="bz-flow-step-name">Fix or report</span>
    <span class="bz-flow-step-desc">Fix it, or paste the full error into an AI using the template below.</span>
  </div>
</div>

## Walkthrough 1: a Python traceback

You run a small script that totals a shopping cart, and this appears in your [terminal](/basics/what-is-a-terminal/):

```text
Traceback (most recent call last):
  File "app.py", line 12, in <module>
    total = calculate_total(cart)
  File "app.py", line 7, in calculate_total
    return sum(item["price"] for item in items)
KeyError: 'price'
```

Line by line, bottom to top:

- `KeyError: 'price'` is the error line. Type: `KeyError`, a dictionary lookup failed. Message: the missing key is `'price'`. A dictionary is a labelled collection of values, and your code asked for a label that one item does not have.
- `File "app.py", line 7, in calculate_total` is the location. Your file, line 7, inside the function `calculate_total`. The next line shows the exact code: `item["price"]`.
- `File "app.py", line 12, in <module>` is one step earlier in the chain. Line 12 called `calculate_total`, which then failed at line 7. `<module>` means "the top level of the file", not inside any function.
- `Traceback (most recent call last)` is Python telling you how to read the list: the most recent call, the one that failed, is printed last. This is why you read Python tracebacks from the bottom.

Diagnosis in one sentence: one item in the cart has no `price` field. The fix is in your data or in line 7, for example `item.get("price", 0)`, which returns 0 when the key is missing. Notice that you did not need to understand all of Python. You needed three lines.

## Walkthrough 2: a JavaScript console error

Your web page has a button, you click it, nothing happens. You open the browser console and see:

```text
Uncaught TypeError: Cannot read properties of undefined (reading 'map')
    at renderList (app.js:24:18)
    at HTMLButtonElement.<anonymous> (app.js:41:5)
```

Line by line, top to bottom this time:

- `Uncaught TypeError: Cannot read properties of undefined (reading 'map')` is the error line. Type: `TypeError`. Message: your code called `.map` on a value that is `undefined`, which means "no value was ever put here". Something you expected to be a list does not exist yet.
- `at renderList (app.js:24:18)` is the location: your file `app.js`, line 24, column 18, inside the function `renderList`. That is where `.map` was called on the missing value.
- `at HTMLButtonElement.<anonymous>` is the step before: the button's click handler called `renderList`. It gives context, but line 24 is where you look.

Diagnosis in one sentence: at line 24, the variable before `.map` is `undefined`, probably because the data has not loaded or has a different name. This exact error is one of the most common in all of web development, and it always means the same thing: the value to the left of the dot does not exist.

## Walkthrough 3: a 502 after a deploy

You deploy your app to a hosting platform such as [Railway](/tools/railway/). The build succeeds, you open the public URL, and the browser shows:

```text
502 Bad Gateway
Application failed to respond
```

First lesson: **the 502 is not the error.** It is a symptom. A 502 means the platform's front door (a proxy, the server that forwards visitors to your app) tried to reach your app and got no answer. The real error is in the deploy logs. You open them and find:

```text
Starting Container
> node server.js
node:internal/modules/cjs/loader:1145
  throw err;
  ^
Error: Cannot find module 'express'
    at Function.Module._resolveFilename (node:internal/modules/cjs/loader:1142:15)
    at Function.Module._load (node:internal/modules/cjs/loader:983:27)
Process exited with code 1
```

Line by line:

- `Starting Container` and `> node server.js`: the platform started your app. So far so good.
- `Error: Cannot find module 'express'` is the error line. Type and message together: Node.js could not find the `express` library. It was never installed on the server, usually because it is missing from `package.json`, the file that lists your app's dependencies.
- The `at Function.Module...` lines all point into `node:internal`, Node's own machinery. Framework noise. Skip them.
- `Process exited with code 1`: your app crashed on startup. A dead app cannot answer the proxy, and that is why visitors see 502.

Diagnosis in one sentence: the app crashes at startup because a dependency is not installed, so the platform serves 502 to everyone. The chain "browser shows 502, real cause lives in the logs" repeats constantly in deployment. Always walk upstream to the logs.

## The four places errors appear

Beginners often look in the wrong window. Errors surface in four distinct places, and each belongs to a different part of your system.

| | What runs there | Typical errors | How to open it |
|---|---|---|---|
| **Browser console** | Front-end JavaScript | TypeError, failed requests | F12, then Console tab |
| **Terminal** | Commands and local servers | Tracebacks, install failures | The window you ran it in |
| **Build and deploy logs** | Packaging and shipping | Missing modules, failed builds | Hosting dashboard, deploy view |
| **Server logs** | Your live back end | Crashes, 500s, timeouts | Hosting dashboard, logs tab |

In more detail:

1. **Browser console.** Errors in code running on the visitor's machine. Open with F12, or Ctrl+Shift+J (Windows and Linux) or Cmd+Option+J (Mac) in Chrome and Edge, Ctrl+Shift+K or Cmd+Option+K in Firefox. In Safari, enable the Develop menu in Settings first, then press Cmd+Option+C.
2. **Terminal.** Errors from commands you run and from servers running locally. The message appears in the same window where you typed the command. If you closed it, run the command again. New to the terminal? Start with [What is a Terminal](/basics/what-is-a-terminal/).
3. **Build and deploy logs.** Errors that happen while your code is packaged and shipped. Every hosting platform has a deployments view with a log per attempt. On Railway, open the service, then the failed deployment, then its build and deploy logs. GitHub Actions shows the same thing per workflow run.
4. **Server logs.** Errors from your live back end after a successful deploy. When a user reports "it broke", this is where the truth lives. The concept has its own page: [What is Monitoring and Logs](/basics/what-is-monitoring-and-logs/).

Rule of thumb: a blank or broken page sends you to the browser console. A failed command sends you to the terminal. A site that never comes up sends you to deploy logs. A site that worked and then broke sends you to server logs.

## HTTP status codes in plain English

When your app talks over the web using [HTTP](/glossary/http-and-https/), every response carries a three-digit status code. Five of them cover most real debugging. The most useful question each code answers is: whose problem is it?

| | Name | Plain English | Whose problem |
|---|---|---|---|
| **403** | Forbidden | You are known, but not allowed | Permissions or API key |
| **404** | Not Found | Nothing lives at this address | Your URL or route |
| **429** | Too Many Requests | Slow down, limit reached | Your request rate |
| **500** | Internal Server Error | The server's code crashed | The server's code |
| **502** | Bad Gateway | The proxy got no valid answer | The app behind the proxy |

Three distinctions worth memorising:

- **404 vs 500**: a 404 means you asked for the wrong thing. A 500 means you asked for the right thing and the server's code crashed handling it. Fix a 404 in the URL or route. Fix a 500 in the server logs.
- **500 vs 502**: a 500 means your app ran and crashed. A 502 means your app never answered at all, usually because it is down or listening on the wrong port. Both send you to the logs, but 502 means "check whether it is even running" first.
- **403 vs 429**: both are refusals. 403 means your key or account lacks permission. 429 means your key is fine but you called too often, a normal event when working with AI model APIs, as covered in [Your First LLM API Call](/guides/your-first-llm-api-call/). Wait and retry more slowly.

The first digit carries the pattern: 4xx codes mean the request side (you) got something wrong, 5xx codes mean the server side failed. The full list lives in the HTTP standard, RFC 9110.

## Reporting an error to an AI assistant

An AI assistant is excellent at reading errors, but only when you give it the whole error. The most common beginner mistake is paraphrasing: "it says something about undefined". The exact text is the evidence. Paste all of it, unedited, stack trace included. Use this template:

```text
I am building [what the app is] with [languages, frameworks, hosting].

What I did:
[the exact action: the command you ran, the button you clicked, the URL you opened]

What I expected:
[what should have happened]

What happened instead:
[what actually happened, including where the error appeared: browser console, terminal, deploy logs, or server logs]

Full error, unedited:
[paste the complete error and stack trace here]

This started after I:
[the last change you made before it broke, if you know it]
```

Why each part matters: the context tells the AI which language's rules apply. "What I did" makes the failure reproducible. Expected versus actual defines the gap to close. The full error carries the type, message, and location. The last change points at the likely cause, because most errors come from the most recent edit. A report in this shape usually gets a correct fix on the first reply instead of the fifth.

## When the same error keeps coming back

If you have pasted the same error into an AI three times and it still appears, stop. Do not paste it a fourth time. Read it slowly, out loud, every word. The answer is usually in it, and repetition means something in your loop is broken, not something in the AI. Check, in order:

1. **Is it actually the same error?** Compare type, message, and line number word by word. A new line number means progress: the fix worked and uncovered the next problem.
2. **Did the fix reach the running code?** Save the file. Restart the server. Rerun the build. Hard-refresh the browser with Ctrl+Shift+R or Cmd+Shift+R. An old process happily keeps serving old code.
3. **Are you editing the file that is running?** The location line names the exact file and path. Confirm it matches the file in your editor. Duplicated files and wrong folders cause endless ghost errors.
4. **Does the message name something specific?** A missing key, an `undefined` variable, a module name. Go look at that specific thing yourself before asking again.

If all four check out and the error persists, the loop itself is the problem, and that has its own guide: [Getting Unstuck When the AI Loops](/guides/getting-unstuck-when-the-ai-loops/).

## What this skill unlocks

Reading errors is the difference between building with AI and being stuck with AI. Every walkthrough above followed the same three moves: find the type, read the message, go to the location. Tools change, languages change, the anatomy does not. The next time red text appears, you have a procedure instead of a wall. For the broader beginner path, start at the [vibe coders hub](/for/vibe-coders/) or the wider practice of [vibe coding](/basics/what-is-vibe-coding/).

## Further reading

- [For Vibe Coders](/for/vibe-coders/): the hub page for building with AI as a beginner
- [What is a Terminal](/basics/what-is-a-terminal/): the window where half of all errors appear
- [What is Monitoring and Logs](/basics/what-is-monitoring-and-logs/): where production errors live and how to read them at scale
- [Getting Unstuck When the AI Loops](/guides/getting-unstuck-when-the-ai-loops/): what to do when fixes stop landing
- [Your First LLM API Call](/guides/your-first-llm-api-call/): where 401, 429, and 500 show up in practice
- [Errors and Exceptions, Python tutorial](https://docs.python.org/3/tutorial/errors.html): the official guide to Python tracebacks and exception types
- [JavaScript error reference, MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors): every standard JavaScript error explained with examples
- [Console overview, Chrome DevTools](https://developer.chrome.com/docs/devtools/console): the official guide to the browser console

## Sources

- [Python documentation: Errors and Exceptions](https://docs.python.org/3/tutorial/errors.html)
- [Python documentation: Built-in Exceptions](https://docs.python.org/3/library/exceptions.html)
- [MDN Web Docs: HTTP response status codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status)
- [RFC 9110: HTTP Semantics, section 15 (status codes)](https://www.rfc-editor.org/rfc/rfc9110.html#name-status-codes)
- [RFC 6585: Additional HTTP Status Codes (defines 429)](https://www.rfc-editor.org/rfc/rfc6585)
- [Chrome DevTools documentation: Console](https://developer.chrome.com/docs/devtools/console)
- [Firefox DevTools User Docs: Web Console](https://firefox-source-docs.mozilla.org/devtools-user/web_console/)
