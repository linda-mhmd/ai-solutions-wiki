---
title: "What is a Terminal?"
description: "The terminal is a text-based interface for controlling your computer. It looks intimidating but it is just a faster way to tell the computer what to do."
date: 2026-05-24
level: 1
categories: [Basics]
tags: [beginner, terminal, command-line, shell, cli]
youtube_id: "5XgBd6rjuDQ"
youtube_title: "Terminal for Beginners"
youtube_channel: "TechWorld with Nana"
docs: "https://missing.csail.mit.edu/"
docs_label: "The Missing Semester of Your CS Education, MIT"
faqs:
  - question: "What is the difference between terminal, shell, command line, and CLI?"
    answer: "Terminal is the window, the application you open. Shell is the program running inside it that interprets your commands (bash, zsh, fish). Command line is the general concept of text-based interaction. CLI (Command Line Interface) usually refers to a specific tool that has a command-line interface, e.g. 'the Git CLI'. In practice, people use all four terms loosely to mean the same thing."
  - question: "Do I need to memorise all these commands?"
    answer: "No. Developers don't memorise commands. They remember the 10-15 they use daily, and look up the rest. Tools like tldr.sh give simplified examples. explainshell.com breaks down any command you paste. AI tools like Claude can explain or generate any command. The goal is to understand what a command does when you see it, not to recall it from memory."
  - question: "Is PowerShell the same as a Linux terminal?"
    answer: "No. PowerShell uses different commands and syntax. Linux and macOS terminals use Unix-style commands (ls, cd, grep, cat). Windows PowerShell uses its own command verbs (Get-ChildItem, Set-Location). If you are on Windows and want Unix-style commands, install WSL (Windows Subsystem for Linux), it gives you a real Linux terminal inside Windows and is the standard setup for developers."
---

{{< quickanswer >}}
The terminal (also called the command line or shell) is a text-based way to control your computer. Instead of clicking buttons, you type commands. Developers use it because it is faster, more precise, and many developer tools only work through it.
{{< /quickanswer >}}

## It looks scary. It is not.

The terminal is just a different way of talking to your computer, text instead of clicks. Everything you do by clicking icons and menus can also be done in the terminal. And many things you need to do as a builder can *only* be done in the terminal.

When you open a terminal, you see something like:

```
lindamohamed@macbook ~ %
```

This is the **prompt**. The `~` symbol means you are in your home directory. The `%` (or `$` on some systems) signals that the shell is waiting for input. Type a command and press Enter.

## Terminal, shell, command line, what's what

These terms overlap and people use them interchangeably. The technical distinctions:

- **Terminal**, the window application (Terminal.app, iTerm2, Windows Terminal)
- **Shell**, the program running inside it that interprets commands. On macOS the default is **zsh**. On Linux, usually **bash**. [Fish](https://fishshell.com/) is popular for its auto-suggestions.
- **Command line / CLI**, the general concept of text-based interaction, or a specific tool's text interface ("the Git CLI")

When someone says "open your terminal", they mean: open the application and get to a shell prompt.

## Why developers use the terminal

**Speed.** `mkdir my-project && cd my-project` creates a folder and enters it in under a second. The equivalent click path takes much longer.

**Power.** You can chain commands, search through thousands of files, rename hundreds of files at once, or run scripts that automate repetitive tasks, none of which is practical with a graphical interface.

**Tools.** Git, Node.js, Python, Docker, package managers, virtually every developer tool is primarily or exclusively terminal-based.

**Remote access.** You cannot click a server sitting in a data centre in another country. You connect to it via **SSH** (Secure Shell), a terminal connection over the internet. Most server management happens this way.

**Reproducibility.** A series of terminal commands can be saved as a script and run exactly the same way on any machine. This is how automation and deployment pipelines work.

## Common commands you will see

You will encounter these constantly. You do not need to memorise them now.

| Command | What it does |
|---|---|
| `ls` | List files in the current directory |
| `ls -la` | List all files including hidden ones, with details |
| `cd projects` | Move into the "projects" folder |
| `cd ..` | Go up one level to the parent folder |
| `pwd` | Print the full path of the current directory |
| `mkdir my-app` | Create a new folder |
| `rm file.txt` | Delete a file (permanent, no trash) |
| `rm -rf folder/` | Delete a folder and everything in it (be careful) |
| `cp file.txt backup.txt` | Copy a file |
| `mv file.txt new-name.txt` | Move or rename a file |
| `cat file.txt` | Print a file's contents to the screen |
| `grep "error" logs.txt` | Search for "error" inside a file |

And developer-specific commands:

| Command | What it does |
|---|---|
| `git status` | Check what has changed in a Git repository |
| `git add .` | Stage all changes for a commit |
| `npm install` | Install JavaScript packages listed in package.json |
| `npm run dev` | Start the development server |
| `python app.py` | Run a Python file |
| `docker ps` | List running containers |

## Paths: where things are

The terminal works with file paths. Understanding paths removes a lot of confusion.

**Absolute path**: starts from the root, like `/Users/linda/projects/my-app`. Unambiguous, works from anywhere.

**Relative path**: relative to your current location. If you are in `/Users/linda`, then `projects/my-app` points to the same place. `..` means "up one level". `./` means "current directory".

When you see `cd /var/log` in an instruction, that is an absolute path. When you see `cd ../src`, that is relative.

## Setting up your terminal

**Mac**: Terminal is built in. Go to Applications → Utilities → Terminal. Most developers install [iTerm2](https://iterm2.com/) for better features. macOS uses zsh by default; consider [Oh My Zsh](https://ohmyz.sh/) for a better experience.

**Windows**: Install [Windows Terminal](https://apps.microsoft.com/detail/9n0dx20hk701) (free, from Microsoft Store). Then install [WSL 2](https://learn.microsoft.com/en-us/windows/wsl/install) (Windows Subsystem for Linux) to get a real Ubuntu terminal. This is the standard developer setup on Windows.

**Linux**: Any terminal emulator works, GNOME Terminal, Konsole, Alacritty.

Cloud editors like [GitHub Codespaces](https://github.com/features/codespaces), [Replit](https://replit.com), and [StackBlitz](https://stackblitz.com/) have terminals built in. You can develop entirely in the browser without installing anything locally.

## AI tools and the terminal

When you use Claude Code, Cursor, or similar AI coding tools, they run commands in the terminal on your behalf. Understanding what those commands are, at a high level, means you can:
- Catch mistakes before they cause damage (`rm -rf` on the wrong folder)
- Ask smarter follow-up questions ("what does that flag do?")
- Run commands yourself when the AI gets it wrong

When an AI assistant says "run `npm run dev` in your terminal", you now know: it is asking you to open the text interface, navigate to your project folder, and type that command to start the development server.

## Further reading

- [The Missing Semester of Your CS Education, MIT](https://missing.csail.mit.edu/), free course covering terminal, shell scripting, Git, editors, and more. Widely considered the best resource for exactly this gap.
- [tldr.sh](https://tldr.sh/), simplified, example-based documentation for hundreds of commands. Much more practical than man pages.
- [explainshell.com](https://explainshell.com/), paste any command and it breaks down every part
- [Oh My Zsh](https://ohmyz.sh/), configuration framework for zsh; makes your terminal much more usable
- [Command line crash course, MDN](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Understanding_client-side_tools/Command_line)
- [NetworkChuck on YouTube](https://www.youtube.com/@NetworkChuck), Linux and networking for beginners, practical and entertaining

## What's next

Next: [What is Version Control?](/basics/what-is-version-control/), how developers track every change they make to their code.
