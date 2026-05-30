---
title: "Keycloak - Open-Source Identity and Access Management"
description: "Keycloak is an open-source identity and access management solution providing single sign-on, user federation, and identity brokering for applications."
date: 2026-03-28
categories: [Tools]
tags: [open-source, identity, authentication, authorization, sso, oidc, saml]
related:
  - tools/amazon-cognito
  - tools/supabase
last_updated: 2026-05-30
---

Keycloak is an open-source Identity and Access Management (IAM) solution that provides authentication, authorization, and user management for applications and services. It implements standard protocols including OpenID Connect (OIDC), OAuth 2.0, and SAML 2.0, enabling single sign-on (SSO) across multiple applications without requiring each application to implement its own authentication logic. Keycloak handles the complexity of identity management so that application developers can focus on business logic.

Keycloak's feature set covers the full spectrum of enterprise identity requirements: user registration and self-service account management, social login (Google, Facebook, GitHub, and many others), identity brokering with external identity providers, user federation with LDAP and Active Directory, multi-factor authentication (TOTP, WebAuthn/FIDO2), fine-grained authorization policies, client-scoped role mappings, and customizable login pages via themes. The admin console provides a web-based interface for managing realms (tenants), users, groups, roles, clients, and authentication flows. Keycloak's SPI (Service Provider Interface) architecture makes it highly extensible, allowing custom authentication flows, user storage providers, event listeners, and protocol mappers.

Keycloak is the most widely adopted open-source IAM solution, used by enterprises, government agencies, and organizations of all sizes as the identity layer for web applications, APIs, microservices, and mobile apps. It is a CNCF incubating project and has a large contributor community. Organizations including Bosch, the U.S. Department of Defense, and numerous European public sector entities deploy Keycloak for secure identity management.

## Key Capabilities

- **Single Sign-On** - SSO across applications using OpenID Connect, OAuth 2.0, and SAML 2.0 with session management and token exchange
- **Identity Brokering** - Federate with external identity providers including social logins, enterprise SAML/OIDC providers, and LDAP/Active Directory
- **Fine-Grained Authorization** - Policy-based access control with support for role-based, attribute-based, and custom authorization policies
- **Multi-Factor Authentication** - Built-in support for TOTP authenticator apps, WebAuthn/FIDO2 security keys, and customizable MFA flows

## Cloud Equivalents

Keycloak is the open-source alternative to AWS Cognito, Azure AD B2C (now Entra External ID), and Google Identity Platform. Cloud identity services integrate seamlessly with their respective ecosystems and eliminate operational overhead, while Keycloak provides full data sovereignty, unlimited users at no license cost, and deep customization of authentication flows.

## Origins and History

Keycloak was created by Bill Burke and Stian Thorgersen at Red Hat and first released in September 2014. The project was built on Red Hat's experience with JBoss and PicketLink identity frameworks. Keycloak is licensed under the Apache License 2.0. It was donated to the Cloud Native Computing Foundation (CNCF) in April 2023 as an incubating project. Keycloak migrated from the WildFly application server to Quarkus as its runtime in version 20 (2022), significantly reducing startup time and memory footprint.

## Sources

1. https://www.keycloak.org/
2. https://github.com/keycloak/keycloak
