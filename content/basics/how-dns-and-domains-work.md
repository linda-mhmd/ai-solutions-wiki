---
title: "How DNS and Domains Work"
description: "How typing a URL turns into connecting to a server. Domain names, DNS records, nameservers, and why changes take time to propagate."
date: 2026-07-30
level: 1
categories: [Basics]
tags: [beginner, dns, domains, networking, web, infrastructure]
faqs:
  - question: "Why do DNS changes take so long?"
    answer: "Caching. DNS responses are cached at multiple levels—your browser, your OS, your ISP, and DNS resolvers worldwide. Each cache has a TTL (time to live) before it refreshes. Lowering TTL before making changes can help, but some caches ignore it."
  - question: "What's the difference between a domain registrar and DNS hosting?"
    answer: "A registrar is where you buy the domain (Namecheap, Google Domains, GoDaddy). DNS hosting is where your DNS records live. They can be the same company or different. Many people buy domains at a registrar but point nameservers to Cloudflare or their hosting provider for DNS."
  - question: "Do I need to understand DNS to deploy an app?"
    answer: "For platforms like Vercel, Railway, or Netlify—barely. They handle most of it. You just need to add a CNAME or A record and maybe change nameservers. But when something breaks, understanding DNS helps you debug why your site isn't loading."
last_updated: 2026-07-30
---

{{< quickanswer >}}
When you type `example.com` in your browser, DNS (Domain Name System) translates that human-readable name into an IP address like `93.184.216.34` that computers use to find each other. It's the internet's phone book—you look up a name, you get an address.
{{< /quickanswer >}}

## The problem DNS solves

Computers find each other using IP addresses: `93.184.216.34` or `2606:2800:220:1:248:1893:25c8:1946`.

Humans can't remember those. We remember names: `google.com`, `github.com`, `yourapp.com`.

DNS bridges this gap. When you visit a website:

```
You type: example.com
DNS returns: 93.184.216.34
Browser connects to: 93.184.216.34
```

## How a DNS lookup works

When you type `www.example.com` and hit enter:

```
1. Browser checks its cache
   ↓ (not found)
2. OS checks its cache
   ↓ (not found)
3. Query goes to DNS resolver (usually your ISP or 8.8.8.8)
   ↓ (not found)
4. Resolver asks root nameservers: "Who handles .com?"
   ↓
5. Root says: "Ask the .com TLD servers"
   ↓
6. Resolver asks .com TLD: "Who handles example.com?"
   ↓
7. TLD says: "Ask ns1.example.com"
   ↓
8. Resolver asks example.com's nameserver: "What's www.example.com?"
   ↓
9. Nameserver returns: "93.184.216.34"
   ↓
10. IP gets cached at every level for next time
```

This looks slow, but caching makes it fast. Most lookups hit a cache and return instantly.

## Domain name anatomy

```
https://blog.example.com/posts/hello
└─┬──┘ └─┬─┘└───┬───┘└─┬┘└────┬────┘
  │     │      │     │      │
protocol│   domain   │    path
     subdomain      TLD
```

| Part | Example | What it is |
|------|---------|------------|
| TLD (Top Level Domain) | `.com`, `.org`, `.io` | Managed by registries |
| Domain | `example` | The name you buy |
| Subdomain | `blog`, `www`, `api` | You create these (free, unlimited) |

**You buy**: `example.com`
**You get for free**: `www.example.com`, `api.example.com`, `anything.example.com`

## DNS record types

DNS records are instructions stored at your nameserver. Different record types do different things.

### A Record
Maps a domain to an IPv4 address.

```
example.com → 93.184.216.34
```

Use for: Pointing your domain to a server's IP address.

### AAAA Record
Maps a domain to an IPv6 address.

```
example.com → 2606:2800:220:1:248:1893:25c8:1946
```

### CNAME Record
Maps a domain to another domain (an alias).

```
www.example.com → example.com
blog.example.com → myapp.vercel.app
```

Use for: Subdomains, pointing to hosting platforms.

**Important**: CNAME cannot be used on the root domain (`example.com`). Only on subdomains (`www.example.com`).

### MX Record
Mail exchange—where to deliver email.

```
example.com MX → mail.example.com (priority 10)
```

Use for: Setting up email (Google Workspace, Fastmail, etc.)

### TXT Record
Text data, often for verification.

```
example.com TXT → "v=spf1 include:_spf.google.com ~all"
```

Use for: Domain verification, email security (SPF, DKIM), proving you own the domain.

### NS Record
Nameserver—which servers are authoritative for this domain.

```
example.com NS → ns1.cloudflare.com
```

Use for: Delegating DNS to a different provider.

## Common DNS tasks

### Pointing a domain to your app

**Scenario**: You bought `myapp.com` and want it to load your app hosted on Vercel/Railway/Render.

**Option 1: CNAME (for subdomains)**
```
www.myapp.com CNAME → cname.vercel-dns.com
```

**Option 2: A record (for root domain)**
```
myapp.com A → 76.76.21.21
```

Your hosting provider tells you which records to add.

### Setting up a subdomain

Want `api.myapp.com` to point somewhere different?

```
api.myapp.com A → 123.45.67.89
```

Or point it to another service:
```
api.myapp.com CNAME → my-api.railway.app
```

### Verifying domain ownership

Services like Google, Mailchimp, or Stripe ask you to prove you own a domain. They give you a TXT record to add:

```
myapp.com TXT → "google-site-verification=abc123..."
```

Once you add it and they can query it, ownership is verified.

## Where to manage DNS

### Domain registrar
Where you bought the domain: Namecheap, Google Domains, GoDaddy, Cloudflare.

Most registrars include basic DNS hosting. You can manage records there.

### Dedicated DNS hosting
For more features (faster propagation, DDoS protection, analytics):
- **Cloudflare** (free tier, very popular)
- **AWS Route 53**
- **Google Cloud DNS**

To use these, you change your domain's nameservers at your registrar to point to the DNS host.

### Your hosting provider
Vercel, Netlify, Railway often handle DNS for you if you let them manage the domain.

## DNS propagation

When you change a DNS record, it doesn't update instantly everywhere. The old value is cached.

**TTL (Time To Live)** controls how long caches keep the old value. Measured in seconds.

| TTL | Meaning |
|-----|---------|
| 300 | 5 minutes |
| 3600 | 1 hour |
| 86400 | 24 hours |

**Before making changes**: Lower TTL to 300 a day ahead. Then caches expire faster when you make the real change.

**Propagation time**: Usually 5 minutes to 48 hours. Most changes are visible within an hour.

**Check propagation**: Use [dnschecker.org](https://dnschecker.org) or [whatsmydns.net](https://whatsmydns.net) to see if your change has propagated worldwide.

## Debugging DNS issues

### "Site not loading" after DNS change

1. **Check propagation**: Has it spread to your location yet?
2. **Flush local cache**:
   ```bash
   # Mac
   sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder
   
   # Windows
   ipconfig /flushdns
   ```
3. **Try a different DNS resolver**: Temporarily use 8.8.8.8 (Google) or 1.1.1.1 (Cloudflare)

### Check what DNS returns

```bash
# Basic lookup
nslookup example.com

# More detailed
dig example.com

# Check specific record type
dig example.com MX
dig example.com TXT
```

### "DNS_PROBE_FINISHED_NXDOMAIN"

The domain doesn't exist or DNS can't find it.

Causes:
- Domain expired
- Nameservers misconfigured
- Typo in domain
- DNS propagation not complete

## Domain buying checklist

1. **Choose a registrar**: Namecheap, Cloudflare, Porkbun are popular
2. **Check availability**: The name you want might be taken
3. **Pick TLD**: `.com` is standard, `.io` is tech-popular, `.dev` requires HTTPS
4. **Enable auto-renew**: Domains expire and can be grabbed by others
5. **Enable WHOIS privacy**: Hides your personal info from public lookup
6. **Set up DNS**: Point to your hosting

## Domain pricing

| Aspect | Typical cost |
|--------|--------------|
| Registration | $10-15/year for .com |
| Premium domains | $100-$10,000+ for desirable names |
| Renewal | Often same as registration |
| WHOIS privacy | Usually free now |
| DNS hosting | Free at registrar or Cloudflare |

Watch for: Low first-year prices with expensive renewals.

## Quick reference: DNS record examples

```
# Website on a server
example.com         A       93.184.216.34

# WWW subdomain (alias to root)
www.example.com     CNAME   example.com

# App on Vercel
app.example.com     CNAME   cname.vercel-dns.com

# API on separate server
api.example.com     A       123.45.67.89

# Email with Google Workspace
example.com         MX      aspmx.l.google.com (priority 1)
example.com         MX      alt1.aspmx.l.google.com (priority 5)

# Domain verification
example.com         TXT     "google-site-verification=xyz..."

# Email security
example.com         TXT     "v=spf1 include:_spf.google.com ~all"
```

## Further reading

- [What is hosting?](/basics/what-is-hosting/): Where your code runs
- [What is a server?](/basics/what-is-a-server/): The machine DNS points to
- [What is HTTPS?](/basics/what-is-https/): Secure connections after DNS resolves
- [What is deployment?](/basics/what-is-deployment/): Getting your code live
