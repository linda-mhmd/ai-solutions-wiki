---
title: "Vibe Coding in Public: The Safety Check Nobody Gave You"
description: "When your vibe-coded app goes live, it is on the public internet. Five plain-English checks to make sure your keys, your database, and your users are not exposed."
date: 2026-07-14
categories: [Guides]
tags: ["security", "beginner", "vibe-coding", "deployment", "secrets"]
related:
  - guides/secrets-management-ai
  - basics/what-is-security-and-auth
  - guides/production-readiness-checklist-ai
last_updated: 2026-07-14
---

The moment you deploy, your app stops being a private thing on your laptop and becomes a public thing anyone in the world can reach. That is the whole point of shipping. It is also the part almost nobody explains to people who build with AI. This guide is not here to scare you away from going live. It is here to give you the five checks that keep you and your users safe once you do.

<figure class="bz-figure">
  <img src="/img/enterprise-dark/gateway-chamber-split-notext.png" alt="A dark industrial gateway split down the middle with a glowing red core, suggesting a controlled threshold between inside and outside." loading="lazy">
  <figcaption>Going live opens a door between your app and the entire internet. These checks decide who gets to walk through it.</figcaption>
</figure>

Every check below has the same three parts: what it means in plain language, how to check it yourself in a few minutes, and how to tell whether you can fix it or you have reached the point where a professional should look. None of this requires you to be an engineer. It requires you to know the door is there.

## The five-minute safety pass

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Check 1</span>
    <span class="bz-flow-step-name">Secret keys</span>
    <span class="bz-flow-step-desc">Are your API keys and passwords hidden, or sitting in your code?</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Check 2</span>
    <span class="bz-flow-step-name">Repo visibility</span>
    <span class="bz-flow-step-desc">Is your code public on GitHub, and did you mean for it to be?</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Check 3</span>
    <span class="bz-flow-step-name">Database access</span>
    <span class="bz-flow-step-desc">Can a stranger read or change the data in your database?</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Check 4</span>
    <span class="bz-flow-step-name">Login and access</span>
    <span class="bz-flow-step-desc">Do the pages that should be private actually require a login?</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Check 5</span>
    <span class="bz-flow-step-name">Search indexing</span>
    <span class="bz-flow-step-desc">What is Google allowed to find and show from your app?</span>
  </div>
</div>

## Check 1: Are your secret keys hidden?

A secret key is a password for a service: your OpenAI or Anthropic API key, your database URL, your Stripe key. Anyone who has one can spend your money or reach your data. The single most common vibe-coding mistake is pasting these straight into the code, then pushing that code to a public repository.

Keys belong in environment variables, which are values your app reads at runtime and which never get committed. Your code refers to a name like `OPENAI_API_KEY`; the real value lives in a `.env` file locally and in your host's settings in production.

```
# .gitignore  - tells git to never track these files
.env
.env.local
*.pem
```

To check whether a key ever slipped into your history, search it:

```bash
# Look through your whole git history for anything that resembles a key
git log -p | grep -iE "api[_-]?key|secret|password|token"
```

If something turns up, two things are true. First, adding `.gitignore` now does not erase what is already in your history: the key is still there in old commits. Second, if that repository was ever public, treat the key as compromised. **Rotate it** (generate a new one in the provider's dashboard and delete the old one). Rotating is the real fix. Removing it from history is cleanup.

**Fix it yourself** if the repo was always private and you are just tidying up. **Get help** if a key was public and real money or user data has moved through your app.

## Check 2: Is your repository public on purpose?

A public GitHub repository means the whole world can read every file, every commit, and every comment you ever wrote in the code. That is wonderful for open-source projects and a problem for a private product with secrets or business logic you did not mean to share.

Open your repository on GitHub and look for the `Public` or `Private` label next to its name. If it says Public and you did not choose that deliberately, go to Settings and change it to Private. This takes ten seconds and is one of the highest-value fixes on this list.

**Fix it yourself:** flipping to private is a one-click change. **Get help** if you cannot tell what was exposed while it was public, or whether anyone copied it.

## Check 3: Can a stranger read your database?

This is the check that surprises people most. Many AI-built apps use a hosted database like Supabase, which can expose your tables through an automatic API using a key that ships in your app's front-end. If you have not turned on access rules, that key lets anyone read, and sometimes change, every row in your database. Your users' emails, their messages, everything.

The protection is called Row Level Security (RLS). It is off by default on new tables, and turning it on plus writing a policy is what limits each person to their own data.

```sql
-- Turn on Row Level Security for a table
alter table profiles enable row level security;

-- Add a rule: a signed-in user can read only their own row
create policy "Read own profile"
  on profiles for select
  using ( auth.uid() = user_id );
```

Here is the self-check that needs no code. Open a **private or incognito browser window** so you are logged out, and visit your live app. Try to reach a page that should show only your data. If you can see real data while logged out, so can a stranger who finds the link.

**Fix it yourself** on a hobby project with no real users: enable RLS and follow your database provider's starter policy. **Get help** the moment real people, personal data, or anything you would not want published is in that database. Getting access rules subtly wrong is easy, and the cost of getting them wrong is a data leak.

And remember whose data it is. Once other people use your app, that database holds their private information, not yours: their names, their messages, their files. If it leaks, that is a personal data breach, and in Europe you are legally required to report it to the regulator, often within 72 hours. You are the custodian of everything they trusted you with, and that responsibility does not wait until you feel ready for it.

## Check 4: Do private pages require a login?

Hiding a page is not the same as protecting it. A common pattern is an admin dashboard at a URL like `/admin` that has no login on it, on the theory that nobody knows the address. Addresses get found: through links, browser history, and automated scanners that try common paths all day long.

Use the incognito test again. Logged out, type the addresses of the pages only you should see. If any of them load, they are open to everyone. Real protection is authentication: the page checks who you are and refuses to load until you prove it.

**Fix it yourself:** adding a sign-in to a simple app using an auth provider is within reach for a motivated beginner. **Get help** as soon as you have paying users, different roles (admin versus normal user), or anything money touches. Authentication is one of those areas where "almost right" is the same as "wrong."

## Check 5: What is Google allowed to find?

Search engines send crawlers that follow links and index whatever they can reach, including test pages and dashboards you forgot were public. People reach for `robots.txt` to stop this, but `robots.txt` is a request, not a lock. Google's own documentation is explicit that it is not a way to keep a page out of search and is not a security mechanism.

```
# robots.txt  - politely asks well-behaved crawlers to skip a path.
# It does NOT stop anyone from visiting the URL, and it can even
# advertise the path you were trying to hide.
User-agent: *
Disallow: /admin
```

To keep a page out of search results, use a `noindex` instruction on the page itself. To keep it away from people, use a login (Check 4). Those are two different jobs: `noindex` handles search results, authentication handles access.

**Fix it yourself:** adding `noindex` to a page is straightforward. **Get help** if something sensitive has already been indexed, because then you also need to remove the cached copy and work out what was seen.

## Can I fix it, or do I need help?

| | What good looks like | You can likely fix it | Bring in help when |
|---|---|---|---|
| **Secret keys** | Keys in env vars, never in code | Move to `.env`, rotate leaked keys | Keys were public and money or data moved |
| **Repo visibility** | Private unless meant to be open | Flip the repo to private | You cannot tell what already leaked |
| **Database access** | RLS on, policies written | Enable RLS on a hobby project | Real users or personal data are involved |
| **Login and access** | Private pages require sign-in | Add auth to a toy app | Payments, roles, or real accounts exist |
| **Search indexing** | Only public pages indexed | Add `noindex`, fix `robots.txt` | Sensitive pages were already indexed |

The pattern down the right-hand column is the same every time: the moment real people, real money, or personal data are involved, the stakes stop being about your side project and start being about other humans who trusted you with something. That is not a failure on your part. It is the normal point where every product brings in someone who does this for a living.

If your app is past that line, the next guide is [When do you actually need a professional?](/guides/when-do-you-need-a-professional/), and you can always [ask for a review](/get-help/) before real users find the gaps.

## One newer risk: handing an AI agent the keys

There is a version of all this that catches even careful builders. AI agents and automations can now act on your behalf. They read and write your database, call other services, send emails, and spend from your accounts. To do that, they hold your keys. And an agent with your keys can do anything those keys allow.

That cuts two ways. An agent that misunderstands an instruction can delete real data or run up a real bill in seconds, with no human pausing to ask "are you sure?" And an agent that reads outside input, a support email, a web page, a message from a user, can be steered by that input into doing something you never intended. This is called prompt injection, and it is not theoretical. If an agent can be talked into an action, sooner or later someone will try to talk it into a harmful one.

The protections are the ones professionals use everywhere:

- **Least privilege.** Give an agent the narrowest access that lets it do its job, never your master or admin keys. An agent that replies to support tickets does not need permission to delete accounts.
- **Separate keys for separate jobs,** so you can revoke one without breaking everything, and so a single leak is contained.
- **A human in the loop for anything destructive or costly.** Deleting data, moving money, or emailing all your users should ask before it acts, not after.
- **Limits and logging.** Caps on how much an agent can spend or do, and a record of what it did, so a runaway is both bounded and visible.

If you have wired an agent into a real system with broad access, that is a strong signal you are in the territory of the [next guide](/guides/when-do-you-need-a-professional/), and a good thing to have [reviewed](/get-help/) before it acts on real data.

## Further reading

- [When do you actually need a professional?](/guides/when-do-you-need-a-professional/): an honest self-check for knowing you have reached the line above.
- [Secrets management for AI](/guides/secrets-management-ai/): the deeper version of Check 1, for when you are ready.
- [What is security and auth?](/basics/what-is-security-and-auth/): the plain-English foundations behind Checks 3 and 4.
- [Production readiness checklist for AI](/guides/production-readiness-checklist-ai/): everything else to confirm before you call something live.
- [OWASP Top 10 for LLM applications](/guides/owasp-top-10-llm/): the standard reference for prompt injection and giving an AI agent too much power.
- [Protect the accounts that hold your keys](/guides/protect-your-accounts/): password managers, 2FA, and passkeys for your own GitHub, AI, and cloud accounts.
- [Set spending limits before you ship](/guides/set-spending-limits-before-you-ship/): the sixth check in practice, so a runaway loop cannot become a runaway bill.
- [Supabase: Row Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security): the official guide to the database rules in Check 3.
- [Google Search Central: intro to robots.txt](https://developers.google.com/search/docs/crawling-indexing/robots/intro): Google's own statement that robots.txt is not for hiding or securing pages.
- [OWASP Top 10](https://owasp.org/www-project-top-ten/): the industry reference for the most common web security risks.
