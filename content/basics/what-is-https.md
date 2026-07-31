---
title: "What is HTTPS?"
description: "HTTPS is HTTP with encryption—it means the connection between your browser and the server is secure. The padlock icon means your data can't be intercepted."
date: 2026-07-30
level: 1
categories: [Basics]
tags: [beginner, https, ssl, tls, security, certificates, encryption]
faqs:
  - question: "What's the difference between HTTP and HTTPS?"
    answer: "HTTP sends data in plain text—anyone monitoring the network can read it. HTTPS encrypts everything, so even if someone intercepts the traffic, they can't understand it. The 'S' stands for 'Secure'."
  - question: "Do I need HTTPS for my site?"
    answer: "Yes. Browsers now mark HTTP sites as 'Not Secure'. Search engines penalize HTTP. APIs require HTTPS. There's no good reason to use plain HTTP in 2026—free certificates from Let's Encrypt make the cost argument moot."
  - question: "What does the padlock icon mean?"
    answer: "It means the connection is encrypted and the site has a valid certificate. It does NOT mean the site is trustworthy or safe—a scam site can have HTTPS too. It just means your communication with that server is private."
last_updated: 2026-07-30
---

{{< quickanswer >}}
HTTPS (HyperText Transfer Protocol Secure) encrypts the connection between your browser and a website. When you see the padlock icon, it means your data—passwords, credit cards, messages—is encrypted in transit and can't be read by anyone intercepting the network traffic.
{{< /quickanswer >}}

## Why HTTPS matters

Without HTTPS, everything you send travels in plain text:

```
HTTP (insecure):
Your laptop → Coffee shop WiFi → Internet → Server
             ↑
             Anyone on the WiFi can see:
             "username=john&password=hunter2"
```

With HTTPS, it's encrypted:

```
HTTPS (secure):
Your laptop → Coffee shop WiFi → Internet → Server
             ↑
             They see:
             "xK9#mQ!zP2@vN8..."
```

Even if someone is monitoring the network—at a coffee shop, airport, or compromised router—they can't read your data.

## How HTTPS works (simplified)

When you visit `https://example.com`:

1. **Your browser asks for the server's certificate**: "Prove you're really example.com"

2. **The server sends its certificate**: A file that says "I am example.com, vouched for by [Certificate Authority]"

3. **Your browser verifies the certificate**: Checks it's signed by a trusted authority and hasn't expired

4. **They agree on encryption**: Browser and server negotiate an encryption method

5. **Everything is now encrypted**: All data between you and the server is scrambled

This happens in milliseconds, before you see the page.

## SSL vs. TLS (the naming confusion)

You'll hear "SSL certificate" everywhere, but SSL is actually dead:

- **SSL (Secure Sockets Layer)**: The original protocol, versions 1.0-3.0. All versions have serious vulnerabilities. Don't use.
- **TLS (Transport Layer Security)**: The replacement. TLS 1.2 and 1.3 are what you should use today.

Everyone still says "SSL certificate" out of habit, but the actual protocol is TLS. When you buy an "SSL certificate," you're getting a certificate that works with TLS.

## The padlock icon

| Icon | Meaning |
|------|---------|
| 🔒 Padlock | Connection encrypted, valid certificate |
| ⚠️ Warning | HTTP or certificate problem |
| 🔓 No padlock | Insecure connection |

Clicking the padlock shows certificate details: who issued it, when it expires, and what domain it covers.

**Important**: The padlock means the *connection* is secure. It does NOT mean the *website* is safe. Phishing sites can have HTTPS too. The padlock only guarantees privacy between you and the server—it doesn't vouch for what the server does with your data.

## Getting HTTPS for your site

**Option 1: Let's Encrypt (free)**

Let's Encrypt provides free certificates. Most hosting platforms integrate it automatically:
- Vercel: Automatic HTTPS for all deployments
- Netlify: Automatic HTTPS
- Cloudflare: Free SSL for any site using their DNS
- AWS: Use Certificate Manager (free for AWS services)

**Option 2: Platform-managed**

If you deploy on Vercel, Netlify, Railway, or similar platforms, they handle HTTPS automatically. You don't configure anything.

**Option 3: Traditional purchase**

For enterprise needs (Extended Validation certificates, specific warranties), you can buy from DigiCert, Comodo, etc. This is rarely necessary for vibecoders.

## HTTPS for local development

Your localhost doesn't have HTTPS by default, which can cause issues:

**Problem**: Some features require HTTPS (like certain browser APIs, secure cookies, OAuth callbacks).

**Solutions**:

1. **Use a tunnel service**: ngrok gives you a public HTTPS URL that forwards to localhost
   ```bash
   ngrok http 3000
   # Get https://abc123.ngrok.io → localhost:3000
   ```

2. **Generate local certificates**: mkcert creates locally-trusted certificates
   ```bash
   mkcert localhost
   # Creates localhost.pem and localhost-key.pem
   ```

3. **Accept the risk during development**: Some frameworks let you click through the browser warning for local testing

## HTTPS and API keys

When you call AI APIs, HTTPS protects your API key in transit:

```javascript
// This request travels encrypted
const response = await fetch('https://api.openai.com/v1/chat/completions', {
  headers: {
    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,  // Encrypted!
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ model: 'gpt-4', messages: [...] })  // Encrypted!
});
```

If you accidentally use `http://` instead of `https://`, your API key is exposed to anyone monitoring the network. Most API providers reject HTTP requests entirely for this reason.

## Mixed content warnings

If your HTTPS page loads resources over HTTP, browsers block or warn about "mixed content":

```html
<!-- Your page is https://example.com -->

<!-- ❌ Blocked: HTTP resource on HTTPS page -->
<script src="http://cdn.example.com/script.js"></script>

<!-- ✅ Works: HTTPS resource -->
<script src="https://cdn.example.com/script.js"></script>

<!-- ✅ Works: Protocol-relative (inherits page protocol) -->
<script src="//cdn.example.com/script.js"></script>
```

Fix mixed content by ensuring all resources use HTTPS.

## Common HTTPS errors

| Error | Meaning | Fix |
|-------|---------|-----|
| `NET::ERR_CERT_DATE_INVALID` | Certificate expired | Renew the certificate |
| `NET::ERR_CERT_COMMON_NAME_INVALID` | Certificate doesn't match domain | Get certificate for correct domain |
| `NET::ERR_CERT_AUTHORITY_INVALID` | Untrusted certificate authority | Use a recognized CA |
| `SSL_ERROR_HANDSHAKE_FAILURE` | TLS version mismatch | Update server TLS config |

If you see these on sites you own, check your certificate configuration. If you see them on other sites, it might be a man-in-the-middle attack—don't proceed.

## HTTPS is the default now

Modern expectations:
- Browsers mark HTTP as "Not Secure"
- Google ranks HTTPS sites higher in search
- Many browser features (geolocation, camera, service workers) require HTTPS
- APIs reject HTTP connections
- Payment processors require HTTPS

There's no reason not to use HTTPS in 2026. Free certificates from Let's Encrypt eliminated the cost barrier. The question isn't "do I need HTTPS?" but "why would I ever use plain HTTP?"

## Further reading

- [What is an API key?](/basics/what-is-an-api-key/): What HTTPS protects in API calls
- [What is authentication vs. authorization?](/basics/what-is-authentication-vs-authorization/): The security layer on top of HTTPS
- [What is localhost?](/basics/what-is-localhost/): HTTPS in local development
