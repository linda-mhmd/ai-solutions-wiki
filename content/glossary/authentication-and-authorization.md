---
title: "Authentication and Authorization (AuthN/AuthZ)"
description: "The distinction between verifying identity (authentication) and granting access permissions (authorization), including the AAA model."
date: 2026-03-28
categories: [Glossary]
tags: [authentication, authorization, AAA, identity, access-control, security]
last_updated: 2026-05-30
---

Authentication (AuthN) and Authorization (AuthZ) are two distinct but closely related security functions. Authentication verifies who a user or system is. Authorization determines what that authenticated identity is allowed to do. Conflating the two is a common source of security vulnerabilities.

## Origins and History

Authentication mechanisms have evolved alongside computing itself. Early mainframe systems of the 1960s used simple password-based login. The concept of separating authentication from authorization became formalized through access control research in the 1970s and 1980s. The AAA (Authentication, Authorization, and Accounting) model was developed for network access control, notably implemented in the RADIUS protocol (Remote Authentication Dial-In User Service), first described in 1997 in RFC 2058 by Carl Rigney and others at Livingston Enterprises, and the TACACS+ protocol by Cisco. The emergence of web applications drove the development of standards such as SAML (2002), OAuth 2.0 (RFC 6749, 2012), and OpenID Connect (2014) that separated identity verification from permission granting across distributed systems.

## Core Concepts

**Authentication** answers "who are you?" through one or more factors: something you know (password, PIN), something you have (hardware token, phone), or something you are (fingerprint, face recognition). Multi-factor authentication (MFA) requires two or more factors. **Authorization** answers "what are you allowed to do?" and is enforced through access control models such as role-based access control (RBAC), attribute-based access control (ABAC), and policy engines. **Accounting** (the third A in AAA) tracks what authenticated and authorized users actually did, providing audit trails for security monitoring and compliance.

## Practical Applications

Modern systems implement authentication through identity providers (IdP) using protocols like SAML and OpenID Connect, often with single sign-on (SSO). Authorization is enforced at the application layer through permission models, API gateway policies, or external policy engines like Open Policy Agent (OPA). The separation of concerns allows organizations to centralize identity management while distributing authorization decisions to individual services.

## Sources

1. Rigney, C. et al. (2000). "Remote Authentication Dial In User Service (RADIUS)." RFC 2865, IETF.
2. Hardt, D. (2012). "The OAuth 2.0 Authorization Framework." RFC 6749, IETF.
3. Sandhu, R. and Samarati, P. (1994). "Access Control: Principles and Practice." *IEEE Communications Magazine*, 32(9), 40-48.
