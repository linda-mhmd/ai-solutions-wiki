---
title: "Protect the Accounts That Hold Your Keys"
description: "Your GitHub, AI, cloud, and domain accounts are the master keys to everything you build. Set up a password manager, 2FA, and passkeys in one sitting."
date: 2026-07-17
categories: [Guides]
tags: ["security", "beginner", "accounts", "vibe-coding"]
related:
  - guides/vibe-coding-in-public-safety-check
  - guides/secrets-management-ai
  - basics/what-is-security-and-auth
---

Every safety check you run on your app assumes one thing: that you are the only person who can log in to your accounts. Your GitHub account holds your code. Your AI provider account holds your API keys and your billing. Your cloud account holds your database and your users' data. Your domain and email accounts hold the reset links for all of the above. One phished password on an account with no second factor undoes everything the [public safety check](/guides/vibe-coding-in-public-safety-check/) defends.

Here is the good news. Locking all of this down is not a project. It is one sitting, maybe an hour, and you never have to think about most of it again. This guide walks you through that sitting.

<figure class="bz-figure">
  <img src="/img/decoding-software/vault-energy-orb-notext.png" alt="An open vault door in a dark chamber revealing a glowing white orb of energy inside." loading="lazy">
  <figcaption>Your accounts are the vault door standing in front of everything else you build. This guide is about making that door actually lock.</figcaption>
</figure>

## The one-sitting plan

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 1</span>
    <span class="bz-flow-step-name">Password manager</span>
    <span class="bz-flow-step-desc">One strong master password, a unique password for every site.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 2</span>
    <span class="bz-flow-step-name">Turn on 2FA</span>
    <span class="bz-flow-step-desc">GitHub first, then your AI, cloud, and domain accounts.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 3</span>
    <span class="bz-flow-step-name">Upgrade to passkeys</span>
    <span class="bz-flow-step-desc">Phishing-proof sign-in wherever the account offers it.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 4</span>
    <span class="bz-flow-step-name">Store recovery codes</span>
    <span class="bz-flow-step-desc">Somewhere real, so a lost phone is an errand, not a crisis.</span>
  </div>
</div>

## Why these accounts matter more than your code

Attackers rarely break encryption. They log in. The most common way in is phishing: a fake login page that looks exactly like the real one, reached through a convincing email or message. You type your password, the attacker collects it, and from that moment they are you.

Now trace what "being you" unlocks. With your GitHub account, they can read every private repo and every secret that ever slipped into your history. With your AI provider account, they can mint fresh API keys and bill them to your card. With your cloud account, they can open your database and walk out with your users' data. With your domain registrar or email account, they can receive password reset links for everything else. Email is the skeleton key of the whole set, so it gets the same treatment as the rest.

None of this requires the attacker to be clever about your code. It requires one reused password and one convincing fake page. The rest of this guide removes both.

## Step 1: Start with a password manager

A password manager is an app that generates, stores, and fills in your passwords. You remember one strong master password. The manager remembers everything else, and every stored password is long, random, and unique to one site.

That last part is the whole point. When a website gets breached and its password list leaks, attackers take those leaked passwords and try them on every other service. This is called credential stuffing, and it works because most people reuse passwords. A password reused across twenty sites is only as safe as the least secure of those twenty. One strong master password guarding twenty unique random ones beats twenty reused ones every time, because a leak at one site then opens exactly one door.

Two well-established options, described neutrally:

- [Bitwarden](https://bitwarden.com/): open source, with a usable free tier and paid plans.
- [1Password](https://1password.com/): a polished paid product with strong team features.

The password managers built into your platform, such as Apple's Passwords app or Google Password Manager, are also a fine starting point. Any reputable manager beats no manager.

Do this now: install one, then move your email, GitHub, AI provider, cloud, and domain accounts into it first. Let it generate a new random password for each as you go. Modern managers also store passkeys, two-factor codes, and secure notes, which the next steps use.

## Step 2: Turn on 2FA today, starting with GitHub

Two-factor authentication (2FA) means signing in takes two proofs instead of one. Your password is something you know. The second factor is something you have: your phone, a security key, or a device that can approve the login. A phished password alone is no longer enough to get in.

Walk through GitHub first, because it takes three minutes:

1. On GitHub, select your profile photo, then **Settings**.
2. Open **Password and authentication**.
3. Select **Enable two-factor authentication**.
4. Scan the QR code with an authenticator app. This is a free app that shows a fresh six-digit code every 30 seconds. Many password managers can play this role too.
5. Enter the current code to confirm, then download the recovery codes GitHub shows you. Step 4 covers where they go.

GitHub's own documentation recommends an authenticator app over SMS, with security keys or passkeys as backups. GitHub has also required 2FA for most code contributors since March 2023, which tells you how seriously the platform takes this one control.

Then repeat the idea across the rest of your keyring:

- **AI providers** (Anthropic, OpenAI, and others): open the account security settings and enable the strongest option offered. If you sign in with Google or Apple instead of a password, that Google or Apple account is the real front door. Enable 2FA there.
- **Cloud accounts**: AWS enforces MFA for the root user of every account type and recommends phishing-resistant methods such as passkeys and security keys. AWS has ended support for enabling SMS-based MFA entirely. Hosts like Railway, Supabase, and Vercel all offer 2FA in their account settings.
- **Domain registrar**: enable 2FA, and turn on the registrar's transfer lock while you are there. Whoever controls your domain controls where your site and email actually point.
- **Email**: last on this list, first in importance. Every reset link lands here.

## Step 3: Passkeys, in plain English

A passkey lets you sign in to a website the same way you unlock your phone: with your fingerprint, your face, or a PIN. There is no password to type and none to steal. Behind the scenes, your device holds a private cryptographic key that never leaves it, and the website only ever sees a one-time signed proof. The FIDO Alliance, the industry body behind the standard, describes passkeys as phishing-resistant by design.

Phishing-resistant is the property worth understanding. A passkey is bound to the genuine website's address. On a fake login page, it does not work at all, no matter how convincing the page looks. There is nothing for you to type into the wrong box, so there is nothing for an attacker to collect.

Compare that with codes sent by text message. An SMS code can be typed into a fake page like any password. And it has a second weakness: SIM swapping. An attacker calls your mobile carrier, pretends to be you, and convinces the carrier to move your phone number to their SIM card. From then on, your texts, including your login codes, arrive on their phone. No malware, no hacking, only a persuasive phone call to a call centre. This is why NIST's digital identity guidelines classify codes sent over the phone network as a restricted method and tell services to watch for SIM changes and number porting.

| | SMS code | Authenticator app | Passkey |
|---|---|---|---|
| **What you do** | Type a texted code | Type a 30-second code | Use fingerprint, face, or PIN |
| **On a fake site** | Code can be stolen | Code can be stolen | Does not work at all |
| **SIM swap risk** | Yes | No | No |
| **Needs mobile signal** | Yes | No | No |
| **Best role** | Better than nothing | Solid everyday 2FA | Strongest option available |

Keep the ranking gentle: SMS 2FA still beats no 2FA by a wide margin. The move is not "feel bad about SMS." The move is: turn on the best option each account offers, and pick the passkey when you see one. GitHub, Google, Apple, Microsoft, and AWS all support passkeys today, and password managers like Bitwarden and 1Password can store them across your devices.

## Step 4: Store recovery codes somewhere real

Recovery codes are one-time backup codes that let you into an account when your second factor is gone: a lost phone, a wiped laptop, a security key that went through the washing machine. Every service that offers 2FA hands you a set at setup. GitHub keeps them under **Settings**, then **Password and authentication**, then **Recovery codes**, and its docs tell you to save them somewhere secure.

<figure class="bz-figure">
  <img src="/img/wardrobe/safety-archive-backups.png" alt="Neatly labelled archival boxes stored on shelves in a dark wardrobe interior." loading="lazy">
  <figcaption>Recovery codes belong in a place you could name out loud right now. An archive works because you know exactly where things are.</figcaption>
</figure>

"Somewhere real" means a place you could name right now, sight unseen:

- A secure note in your password manager, which is what GitHub's own documentation suggests.
- Printed on paper in a folder or drawer at home, if you prefer something offline.

Not somewhere real: a screenshot lost in your Downloads folder, a file committed to a repo, or an email you sent to yourself. Treat the codes like cash. Each one works once, and anyone holding them can skip your 2FA entirely.

Two minutes of filing now turns a lost phone into an errand instead of a locked-out week. This matters most for accounts with no human support line to call.

## The five-minute checklist

Work down this table in one sitting. Most rows take a minute.

| | Enable today | Best upgrade | Where to find it |
|---|---|---|---|
| **Email** | 2FA with authenticator app | Passkey | Provider security settings |
| **GitHub** | 2FA with authenticator app | Passkey or security key | Settings, Password and authentication |
| **AI provider** | 2FA, or 2FA on linked Google/Apple | Passkey where offered | Account security settings |
| **Cloud host** | MFA on root or owner account | Passkey or security key | IAM or account security |
| **Domain registrar** | 2FA | Transfer lock as well | Registrar security settings |
| **Password manager** | Strong unique master password | 2FA on the manager itself | Manager security settings |

When every row is done, the failure mode changes completely. A phished or leaked password stops being a master key and becomes a dead end. That is the entire goal.

One boundary worth naming: this guide protects the accounts you log in to. The API keys your app uses at runtime are a separate topic with their own rules, covered in [secrets management for AI](/guides/secrets-management-ai/). And if an account you use for real users or real money has already been compromised, that is a moment to [bring in help](/get-help/) rather than clean up alone.

## Further reading

- [Vibe coding in public: the safety check](/guides/vibe-coding-in-public-safety-check/): the five checks this guide's accounts sit in front of.
- [Secrets management for AI](/guides/secrets-management-ai/): protecting the keys your code uses, as opposed to the accounts you log in to.
- [What is security and auth?](/basics/what-is-security-and-auth/): the plain-English foundations behind passwords, sessions, and factors.
- [Set spending limits before you ship](/guides/set-spending-limits-before-you-ship/): the billing guardrail that pairs with a locked-down AI account.
- [GitHub Docs: configuring two-factor authentication](https://docs.github.com/en/authentication/securing-your-account-with-two-factor-authentication-2fa/configuring-two-factor-authentication): the official walkthrough behind Step 2.
- [FIDO Alliance: passkeys](https://fidoalliance.org/passkeys/): the standards body's own explanation of how passkeys work.
- [AWS IAM: multi-factor authentication](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_mfa.html): AWS's guidance on MFA types and phishing-resistant methods.
- [NIST SP 800-63B: authentication guidelines](https://pages.nist.gov/800-63-4/sp800-63b.html): the source for why phone-network codes are a restricted method.

## Sources

- [GitHub Docs: Configuring two-factor authentication](https://docs.github.com/en/authentication/securing-your-account-with-two-factor-authentication-2fa/configuring-two-factor-authentication): setup flow, available methods, and the recommendation of TOTP apps over SMS.
- [GitHub Docs: Configuring two-factor authentication recovery methods](https://docs.github.com/en/authentication/securing-your-account-with-two-factor-authentication-2fa/configuring-two-factor-authentication-recovery-methods): recovery codes location and storage guidance.
- [GitHub Docs: About mandatory two-factor authentication](https://docs.github.com/en/authentication/securing-your-account-with-two-factor-authentication-2fa/about-mandatory-two-factor-authentication): the March 2023 2FA requirement for contributors.
- [FIDO Alliance: Passkeys](https://fidoalliance.org/passkeys/): definition of passkeys and their phishing resistance.
- [NIST SP 800-63B-4, Digital Identity Guidelines: Authentication and Authenticator Management](https://pages.nist.gov/800-63-4/sp800-63b.html) (final, 2025-07-31): restricted status of PSTN out-of-band authentication and SIM-change risk indicators.
- [AWS IAM User Guide: Multi-factor authentication in IAM](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_mfa.html): MFA enforcement for root users, supported MFA types, and the end of SMS MFA support.
- [Bitwarden](https://bitwarden.com/) and [1Password](https://1password.com/): official product sites for the password managers named above.
