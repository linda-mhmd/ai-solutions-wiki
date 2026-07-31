---
title: "What is a Domain Name?"
description: "A domain name is the human-readable address for your website. It's how people find you on the internet instead of typing an IP address like 142.250.185.78."
date: 2026-07-30
level: 1
categories: [Basics]
tags: [beginner, domain, dns, web, hosting]
faqs:
  - question: "How much does a domain cost?"
    answer: "Typically $10-15/year for common extensions like .com, .io, or .co. Some trendy extensions like .ai cost more ($50-100/year). You pay annually to keep it. If you stop paying, you lose it and someone else can buy it."
  - question: "What's the difference between a domain and hosting?"
    answer: "A domain is the address (myapp.com). Hosting is where your website files actually live. You need both. It's like the difference between your street address and your actual house. The domain tells people where to go; hosting is where they arrive."
  - question: "Should I get the .com version?"
    answer: "If it's available and affordable, yes. People still type .com by habit. But .io is perfectly respectable for tech products, and .co, .app, or country-specific domains work fine too. Don't pay $10,000 for a premium .com when a $15 .io works."
last_updated: 2026-07-30
---

{{< quickanswer >}}
A domain name is the address people type to reach your website—like google.com or myawesomeapp.io. It's a human-friendly name that points to a server's actual IP address. You buy domains from registrars like Namecheap, Google Domains, or Cloudflare, and you have to renew them yearly to keep them.
{{< /quickanswer >}}

## Why domain names exist

Every computer on the internet has an IP address, a number like `142.250.185.78`. That's how computers find each other. But nobody wants to memorize numbers.

Domain names are the phonebook of the internet. When you type `google.com`, a system called DNS (Domain Name System) looks up which IP address that name points to, then sends you there.

## The parts of a domain

```
    https://www.shop.mycompany.com/products
    │       │   │    │         │   │
    │       │   │    │         │   └── Path (page on the site)
    │       │   │    │         └── Top-level domain (TLD)
    │       │   │    └── Second-level domain (your main name)
    │       │   └── Subdomain
    │       └── Another subdomain (www is just tradition)
    └── Protocol
```

**mycompany** = the name you buy and own

**.com** = the top-level domain (TLD). Others: .io, .co, .org, .ai, .app

**www** = a subdomain. It's optional and mostly traditional. `mycompany.com` and `www.mycompany.com` can be set up to go to the same place.

**shop** = another subdomain. You can create as many as you want for free once you own the main domain.

## How to get a domain

1. **Pick a name**: Check if it's available using any registrar's search
2. **Choose a registrar**: Namecheap, Cloudflare, Porkbun, Google Domains (now Squarespace)
3. **Buy it**: Usually $10-15/year for .com, .io, .co
4. **Point it somewhere**: Connect it to your hosting provider

Popular registrars:
- **Cloudflare** - Sells at cost, no markup. Good if you'll use their other services.
- **Namecheap** - Cheap, straightforward, been around forever.
- **Porkbun** - Cheap, good UI, quirky branding.
- **Google Domains** (now Squarespace) - Simple, integrates with Google services.

Avoid: GoDaddy (aggressive upselling), generic "web builder" registrars (overpriced).

## Connecting your domain to your app

Once you own a domain, you need to point it at your server. This involves DNS records.

**A record**: Points your domain to an IP address
```
myapp.com → 123.45.67.89
```

**CNAME record**: Points your domain to another domain (common for hosting platforms)
```
myapp.com → cname.vercel-dns.com
```

Most hosting platforms (Vercel, Netlify, Railway) give you instructions: "Add this CNAME record to your DNS settings." You do that in your registrar's dashboard.

After adding the record, wait. DNS changes take time to spread across the internet—anywhere from a few minutes to 48 hours (usually closer to minutes these days).

## Subdomains are free

Once you own `mycompany.com`, you can create unlimited subdomains at no extra cost:

- `app.mycompany.com` - your main app
- `api.mycompany.com` - your backend API
- `docs.mycompany.com` - documentation
- `staging.mycompany.com` - test environment
- `blog.mycompany.com` - company blog

Each subdomain can point to a different server or service.

## What about HTTPS?

HTTPS is the secure version of HTTP. You need it. Browsers show scary warnings for sites without it, and search engines penalize them.

Good news: HTTPS is free now. Services like Let's Encrypt provide free certificates, and most hosting platforms (Vercel, Netlify, Cloudflare) set up HTTPS automatically when you add a domain.

If you're managing your own server, you'll need to set up certificates yourself (usually with Certbot and Let's Encrypt).

## Domain mistakes to avoid

**Letting it expire**: Set up auto-renewal. If your domain expires, someone else can buy it and hold it hostage.

**Buying from your hosting provider**: Keep domains and hosting separate. If you want to switch hosts, you don't want your domain locked in.

**Ignoring WHOIS privacy**: Domain registration is public by default. Your name, address, and phone number will be visible. Most registrars offer free WHOIS privacy—enable it.

**Picking a hard-to-spell name**: If people can't type it correctly, they can't find you.

## The www question

`www.myapp.com` and `myapp.com` are technically different addresses. You should:
1. Pick one as your canonical (official) version
2. Redirect the other to it

Most modern sites use the non-www version (`myapp.com`) as canonical. It's shorter and cleaner. But either works—just be consistent.

## Further reading

- [What is hosting?](/basics/what-is-hosting/): Where your app actually lives
- [What is the internet?](/basics/what-is-the-internet/): How all of this connects
- [What is deployment?](/basics/what-is-deployment/): Getting your app online
