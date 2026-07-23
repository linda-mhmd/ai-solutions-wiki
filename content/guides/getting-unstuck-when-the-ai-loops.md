---
title: "Getting Unstuck When the AI Loops"
description: "Seven escape moves for when the AI keeps regenerating the same broken code: read the error, revert, shrink the ask, add context, restart the chat, change strategy, get help."
date: 2026-07-17
categories: [Guides]
tags: ["beginner", "vibe-coding", "debugging", "getting-started", "git"]
related:
  - guides/how-to-read-an-error-message
  - guides/when-do-you-need-a-professional
  - basics/what-is-git
  - for/vibe-coders
---

You ask the AI to fix a bug. It apologises, rewrites the code, and the same error comes back. You paste the error again, it rewrites almost the same code again, and the two of you circle each other for an hour. This is the wall, and nearly everyone who builds with AI hits it. The way out is not luck or a magic prompt. It is a short ladder of escape moves, and this guide teaches them in the order you should try them.

<figure class="bz-figure">
  <img src="/img/juggling/infinity-loop-breaking-notext.png" alt="A glowing blue neon infinity loop on a black background, shattering into bright fragments at one point along its path." loading="lazy">
  <figcaption>The loop only looks endless. Every AI dead-end has a breaking point, and each escape move in this guide is a place to apply pressure.</figcaption>
</figure>

## Why the AI loops in the first place

The loop feels personal, but it is mechanical. Three properties of chat AI models explain almost every stuck session.

**The AI only knows what is in the chat.** A model's working memory is the transcript of your conversation, called the [context window](/glossary/context-window/). It cannot see your screen, your files, or your error messages unless you paste them. When you type "still broken", you have given it zero new information. All it can do is reshuffle what it already wrote.

**The AI anchors on its own code.** Every broken attempt stays in the transcript, and the model re-reads it on every turn. Its own faulty code becomes the starting point, so each "fix" is a small edit to the same wrong idea rather than a rethink. Research backs this up: a 2023 study by Huang and colleagues found that models rarely repair their own reasoning without new outside information, and often get worse when they try.

**The AI has no memory of what it tried in other chats.** Close a conversation and everything in it is gone. A fresh chat does not remember the four approaches that already failed, which cuts both ways. It can repeat an old mistake, but it also drops the anchor. Move 5 below turns that into an advantage.

There is one more slow poison. As a chat grows long, the transcript fills with failed attempts, apologies, and stale code. Models pay uneven attention across long inputs; a 2023 study by Liu and colleagues showed accuracy drops when the important detail sits in the middle of a long context. The wiki calls this decay [context rot](/glossary/context-rot/). A three-hour debugging chat is mostly noise, and the model is drowning in it.

<div class="bz-diagram">
  <div class="bz-diagram-label">The loop: why every "fix" looks like the last one</div>
  <div class="bz-diagram-body">
    <div class="bz-flow">
      <div class="bz-flow-step">
        <span class="bz-flow-step-tag">You</span>
        <span class="bz-flow-step-name">"Still broken"</span>
        <span class="bz-flow-step-desc">No error text, no file, no new information enters the chat.</span>
      </div>
      <div class="bz-flow-arrow">→</div>
      <div class="bz-flow-step">
        <span class="bz-flow-step-tag">AI</span>
        <span class="bz-flow-step-name">Re-reads the chat</span>
        <span class="bz-flow-step-desc">Its own broken code dominates the transcript it sees.</span>
      </div>
      <div class="bz-flow-arrow">→</div>
      <div class="bz-flow-step">
        <span class="bz-flow-step-tag">AI</span>
        <span class="bz-flow-step-name">Anchors on that code</span>
        <span class="bz-flow-step-desc">It edits the wrong idea instead of questioning it.</span>
      </div>
      <div class="bz-flow-arrow">→</div>
      <div class="bz-flow-step">
        <span class="bz-flow-step-tag">Result</span>
        <span class="bz-flow-step-name">Same bug returns</span>
        <span class="bz-flow-step-desc">The cycle repeats until something new breaks it.</span>
      </div>
    </div>
  </div>
</div>

Every escape move below injects something the loop lacks: new information, a clean starting point, or a different strategy.

## The escape ladder

Work through these in order. The early moves are cheap and fix most loops. The later moves cost more but break the stubborn ones.

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Move 1</span>
    <span class="bz-flow-step-name">Read the error</span>
    <span class="bz-flow-step-desc">Stop pasting blind. Find the type, message, and line number.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Move 2</span>
    <span class="bz-flow-step-name">Revert</span>
    <span class="bz-flow-step-desc">Go back to the last working state. Git is your undo button.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Move 3</span>
    <span class="bz-flow-step-name">Shrink the ask</span>
    <span class="bz-flow-step-desc">One small change instead of the whole feature.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Move 4</span>
    <span class="bz-flow-step-name">Add context</span>
    <span class="bz-flow-step-desc">Paste the file, the exact error, expected vs actual.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Move 5</span>
    <span class="bz-flow-step-name">Fresh chat</span>
    <span class="bz-flow-step-desc">Drop the anchor. Start clean with a written handoff.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Move 6</span>
    <span class="bz-flow-step-name">Change approach</span>
    <span class="bz-flow-step-desc">Ask for three strategies before any new code.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Move 7</span>
    <span class="bz-flow-step-name">Get help</span>
    <span class="bz-flow-step-desc">Recognise the line where a person beats another prompt.</span>
  </div>
</div>

## Move 1: Stop and read the actual error

The loop usually starts because nobody in the conversation has read the error. Not you, and not the AI, because you pasted a screenshot description or typed "it crashes" instead of the real text.

Break the reflex. Before you send another message:

1. Copy the exact error text, all of it, from the terminal or browser console.
2. Find the error type and message. They name the category of failure and the specifics.
3. Find the file name and line number. Open that file and look at that line.

A surprising share of loops end right here. The error says an API key is missing, a package is not installed, or a name is spelled two different ways. You can see that yourself in under a minute. The skill takes 20 minutes to learn, and the wiki teaches it: [how to read an error message](/guides/how-to-read-an-error-message/).

Even when you cannot fix it yourself, reading the error changes your next prompt from "still broken" to "the error is a TypeError on line 42 of app.js". That is new information, and new information breaks loops.

## Move 2: Revert to the last working state

When the code has been rewritten four times, it is usually further from working than when you started. Do not ask the AI to dig out of the hole. Climb out. [Git](/basics/what-is-git/) is the undo button for your whole project: it stores snapshots, called commits, that you can return to at any time.

If the mess is not committed yet, check what changed and throw it away:

```bash
git status        # which files changed since the last snapshot?
git diff          # show the exact changed lines
git restore .     # discard every uncommitted change
```

If you committed the mess, go back to an older snapshot:

```bash
git log --oneline                # list snapshots, newest first
git restore --source=a1b2c3d .   # bring all files back to that snapshot
```

Replace `a1b2c3d` with the short code shown next to the last commit that worked. This rewinds your files but keeps your history, so nothing is lost.

Two habits make this move available when you need it:

- Commit every time something works: `git add -A && git commit -m "working: login form"`. You cannot revert to a snapshot you never took.
- Commit before every AI session. Then the worst case of any session is `git restore .`.

Many AI app builders ship their own version history with a restore button. The principle is identical: get back to green before you try again.

## Move 3: Shrink the ask

Big prompts produce big failures. "Build the login flow with Google sign-in, password reset, and a profile page" gives the AI a dozen places to go wrong at once, and gives you a wall of code you cannot check.

Ask for one small change instead:

- Too big: "Add user accounts to my app."
- Small enough: "Add a Log in button that prints 'clicked' to the console when pressed."

Then build up: make the button open a form. Make the form submit. Store one user. Each step either works, in which case you commit it (Move 2), or it fails with a short, readable error tied to a tiny change (Move 1). Small steps keep the blast radius of every failure small, and they keep you understanding your own app.

A good rule: if you could not describe the change in one sentence to a friend, it is too big for one prompt.

## Move 4: Add the missing context

Remember the mechanics: the AI knows only what is in the transcript. When it loops, it is often guessing about code it has never seen. Stop making it guess. One well-packed message beats ten rounds of ping-pong:

```text
Here is the full file (src/notes.js): [paste the whole file]

Here is the exact error: [paste the complete error text]

Expected: clicking Save stores the note and shows it in the list.
Actual: the page reloads and the note disappears.

Already tried: renaming the function, restarting the server.
Neither changed the error.
```

Each part earns its place. The full file replaces the AI's stale mental copy of your code. The exact error gives it the machine's own diagnosis. Expected vs actual defines what "fixed" means, so it cannot declare victory early. The list of failed attempts stops it from re-suggesting them.

If your tool can see your files directly, name the file and the error anyway. Pointing the AI at the right spot beats hoping it looks there.

## Move 5: Start a fresh conversation

Long debugging chats poison themselves. The context window fills with failed attempts, and the AI keeps anchoring on its own broken code because that code dominates everything it can see. Past a certain point, no prompt in the old chat will out-shout the transcript.

Start a new conversation. The AI will remember nothing from the old one, so carry over the good parts yourself in a short handoff:

```text
I am building a note-taking web app with plain JavaScript.
The app works except for one bug.

Goal: clicking Save should store the note and show it in the list.
Bug: the page reloads and the note disappears.

Here is the current file: [paste the working-state file from Move 2]
Here is the exact error: [paste it]

Do not rewrite the whole file. Propose the smallest change
that could fix this, and explain why.
```

Notice what stays out of the handoff: the four failed approaches, the apologies, the dead code. You are curating the context on purpose. The new chat starts anchored on your description of the problem instead of the AI's broken solution, and that alone breaks many loops.

## Move 6: Change the approach

If the same plan has failed three times with good context, suspect the plan, not the code. The AI committed to a strategy early, and every fix since has been loyalty to that first guess.

Force the rethink by banning code for one message:

```text
Do not write any code yet. List three different ways to add
search to my notes app. For each: how it works in one sentence,
what can go wrong, and how hard it is for a beginner to maintain.
```

Now you are choosing between strategies instead of watching one strategy fail in new ways. Pick the one you understand best, then ask for its smallest first step (Move 3).

Two variations of the same move:

- Ask a different AI model. A second model carries no anchor on the first one's code and will often spot the wrong assumption immediately.
- Ask the AI to argue against itself: "What assumption in the current code could be wrong? List the top three suspects before changing anything."

## Move 7: Know when this is the line

Some walls hide a missing fact, and Moves 1 to 6 will find it. Other walls mark the edge of what you should push through alone. Learn to tell them apart. The line is close when:

- Real users, real money, or private data now depend on the thing that is broken.
- The bug touches login, payments, or anything security-shaped.
- You can no longer explain to yourself what your own app does.
- The same bug has eaten three sessions across multiple days.

Reaching this line is not failure. The loop has already cost you hours; a person who has seen this exact bug before costs less than another lost weekend. Read [when do you actually need a professional](/guides/when-do-you-need-a-professional/) for the full self-assessment, and the [get help](/get-help/) page for how to find someone good and what to prepare so the first hour counts.

## Which move do I reach for?

| | Reach for | First action |
|---|---|---|
| **Same error twice in a row** | Move 1: read the error | Copy exact text, find the line |
| **Code got worse, not better** | Move 2: revert | Run `git restore .` |
| **Big feature, nothing works** | Move 3: shrink the ask | One tiny change, then commit |
| **AI guesses, you ping-pong** | Move 4: add context | Paste file, error, expected vs actual |
| **Long chat, answers degrade** | Move 5: fresh chat | Write a short handoff |
| **Three failures, same plan** | Move 6: change approach | Ask for three strategies first |
| **Money, users, or security** | Move 7: get help | Read the get-help page |

Print this table, or keep the pattern in your head: cheap moves first, information before rewrites, and a hard line where help beats persistence.

## Sources

- Liu et al., Lost in the Middle: How Language Models Use Long Contexts (arXiv:2307.03172): [arxiv.org/abs/2307.03172](https://arxiv.org/abs/2307.03172)
- Huang et al., Large Language Models Cannot Self-Correct Reasoning Yet (arXiv:2310.01798): [arxiv.org/abs/2310.01798](https://arxiv.org/abs/2310.01798)
- Anthropic, Context windows: [platform.claude.com/docs/en/build-with-claude/context-windows](https://platform.claude.com/docs/en/build-with-claude/context-windows)
- Git documentation, git-restore: [git-scm.com/docs/git-restore](https://git-scm.com/docs/git-restore)
- Pro Git (official free book), Git Basics: [git-scm.com/book/en/v2](https://git-scm.com/book/en/v2)

## Further reading

- [How to read an error message](/guides/how-to-read-an-error-message/): the 20-minute skill behind Move 1
- [What is Git?](/basics/what-is-git/): the undo button explained from zero, snapshots and branches included
- [When do you actually need a professional?](/guides/when-do-you-need-a-professional/): the full self-assessment behind Move 7
- [Get help](/get-help/): how to find good help and prepare for the first session
- [Context window](/glossary/context-window/): the working memory that fills up and causes Move 5
- [Context rot](/glossary/context-rot/): why long chats degrade even without errors
- [Pro Git book](https://git-scm.com/book/en/v2): the official, free, definitive Git reference
- [Anthropic prompt engineering guide](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview): official patterns for clearer asks and better context
