---
title: "OAuth"
description: "OAuth is an open standard for delegated authorization, originating from Blaine Cook and Chris Messina's work at Twitter in 2006-2007 and formalized as OAuth 2.0 in RFC 6749 (2012)."
date: 2026-03-28
categories: [Glossary]
tags: [oauth, authorization, authentication, security, api, tokens]
related:
  - glossary/api
  - glossary/api-gateway
  - glossary/webhooks
last_updated: 2026-05-30
---

OAuth is an open standard for delegated authorization that allows users to grant third-party applications limited access to their resources on a service without sharing their passwords. Instead of handing credentials to a third-party app, the user authenticates directly with the resource provider, which issues a scoped, time-limited access token to the third party. OAuth is the authorization protocol behind "Sign in with Google," "Sign in with GitHub," and virtually every third-party API integration on the modern web.

## Origins and History

OAuth originated in November 2006 when Blaine Cook, lead developer at Twitter, was implementing Twitter's OpenID integration and needed a way to delegate API access to third-party applications [1]. The common practice at the time was for users to give their passwords directly to third-party apps, a pattern with obvious security risks. Cook contacted Chris Messina to explore combining OpenID with API access delegation.

Cook, Messina, and Larry Halff from Magnolia met with David Recordon and concluded that no open standard existed for API access delegation. In April 2007, they created a Google Group to draft an open protocol. DeWitt Clinton from Google joined the effort, along with contributors from AOL and other companies, recognizing that the problem was not unique to Twitter [2].

Eran Hammer-Lahav joined and coordinated the specification effort. On October 3, 2007, the OAuth Core 1.0 final draft was released at the Internet Identity Workshop [3]. OAuth 1.0 used cryptographic signatures (HMAC-SHA1) on every request, which provided strong security but was notoriously difficult to implement correctly. Developers struggled with signature base string construction, nonce generation, and parameter encoding.

## OAuth 2.0

OAuth 2.0, published as RFC 6749 in October 2012 by the IETF, was a complete redesign led by Eran Hammer, David Recordon, and Dick Hardt [4]. It replaced the cryptographic signatures of OAuth 1.0 with bearer tokens transmitted over TLS, dramatically simplifying implementation. OAuth 2.0 introduced multiple grant types to support different application architectures: Authorization Code (for server-side applications), Implicit (for browser-based apps, now deprecated), Resource Owner Password Credentials, and Client Credentials (for service-to-service communication).

The Authorization Code flow, enhanced with PKCE (Proof Key for Code Exchange, RFC 7636), became the recommended flow for nearly all application types. In this flow, the user is redirected to the authorization server, authenticates, grants permission, and is redirected back to the application with a short-lived authorization code that is exchanged for an access token through a back-channel request.

## OAuth vs. Authentication

OAuth is an authorization protocol, not an authentication protocol. It answers "what is this application allowed to do?" not "who is this user?" OpenID Connect (OIDC), built as a layer on top of OAuth 2.0 and published in 2014, adds authentication by including an ID token (a signed JWT) that contains user identity claims. The common "Sign in with Google" flow uses OpenID Connect on top of OAuth 2.0.

## Scopes and Tokens

OAuth uses scopes to limit the access granted to third-party applications. When requesting authorization, the application specifies which scopes it needs (for example, `read:user` and `repo` on GitHub). The user sees the requested scopes and can grant or deny access. Access tokens are scoped and time-limited, and refresh tokens allow obtaining new access tokens without requiring the user to re-authenticate.

## Sources

1. OAuth.net. "Introduction." [https://oauth.net/about/introduction/](https://oauth.net/about/introduction/)
2. OAuth - Wikipedia. [https://en.wikipedia.org/wiki/OAuth](https://en.wikipedia.org/wiki/OAuth)
3. Hammer-Lahav, E., ed. (2007). "OAuth Core 1.0." Released October 3, 2007.
4. Hardt, D., ed. (2012). "The OAuth 2.0 Authorization Framework." RFC 6749, IETF. [https://datatracker.ietf.org/doc/html/rfc6749](https://datatracker.ietf.org/doc/html/rfc6749)
