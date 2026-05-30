---
title: "Azure AD B2C - Customer Identity and Access Management"
description: "Azure Active Directory B2C is a customer identity management service that provides authentication, authorization, and user profile management for consumer-facing applications."
date: 2026-03-28
categories: [Tools]
tags: [azure, identity, authentication, b2c, ciam]
related:
  - tools/amazon-cognito
  - tools/azure-openai
last_updated: 2026-05-30
---

Azure Active Directory B2C (Azure AD B2C), part of the Microsoft Entra product family, is a customer identity and access management (CIAM) service that enables businesses to customize and control how users sign up, sign in, and manage their profiles when using consumer-facing applications. Unlike Azure AD (now Microsoft Entra ID), which manages employee identities, Azure AD B2C is designed for external customer identities at massive scale, supporting hundreds of millions of users and billions of authentications per day. In AI solution architectures, Azure AD B2C provides the identity layer that gates access to AI-powered APIs, personalizes AI experiences per user, and maintains the user context needed for recommendation engines and personalization models.

The service supports multiple identity providers out of the box, including local email/password accounts, social logins (Google, Facebook, Apple, Twitter/X), and enterprise identity providers via SAML or OpenID Connect federation. Custom user flows define the authentication experience -- sign-up, sign-in, password reset, and profile editing -- with configurable UI customization through HTML/CSS templates. For more complex scenarios, the Identity Experience Framework (IEF) provides a policy engine that defines identity journeys as XML-based custom policies, enabling integration with external systems for identity verification, fraud detection, and conditional access logic.

Azure AD B2C issues OAuth 2.0 access tokens and OpenID Connect ID tokens that downstream services validate to authorize API access. This integrates cleanly with Azure API Management, Azure Functions, and Azure App Service for protecting AI-powered API endpoints. Custom claims in tokens can carry user attributes that AI services use for personalization -- for example, language preference for translation APIs or user tier for rate limiting AI feature access. The service includes built-in protection against credential stuffing, brute force attacks, and bot traffic through Microsoft's Identity Protection intelligence.

Official documentation: https://learn.microsoft.com/en-us/azure/active-directory-b2c/

## Key Capabilities

- **Social and Enterprise Federation** - Built-in connectors for Google, Facebook, Apple, and any SAML/OpenID Connect identity provider enable flexible authentication options
- **Customizable User Flows** - Configurable sign-up, sign-in, and profile management experiences with full HTML/CSS UI customization and custom policy extensibility
- **Identity Protection** - Built-in protection against credential stuffing, brute force, and bot attacks using Microsoft's threat intelligence
- **API Connectors** - Call external REST APIs during user flows for identity verification, custom validation, approval workflows, and fraud detection

## AWS Equivalent

Azure AD B2C is Azure's counterpart to Amazon Cognito. Both provide customer identity management with social login support, customizable authentication flows, and OAuth/OIDC token issuance. Azure AD B2C offers more sophisticated identity journey customization through its policy engine and benefits from Microsoft's enterprise identity heritage, while Cognito provides simpler setup, tighter Lambda trigger integration, and more straightforward pricing.

## Origins and History

Azure AD B2C was first announced in preview at the Build 2015 conference and reached general availability in September 2016. The Identity Experience Framework, enabling fully custom identity journeys via XML policies, was released shortly after. Microsoft began the transition of Azure AD branding to Microsoft Entra ID in July 2023, though Azure AD B2C retains its name within the Entra External ID product family. API connectors for integrating external services into user flows were added in GA in 2021, and integration with Microsoft Entra Verified ID for decentralized identity verification was introduced in 2023.

## Sources

1. Microsoft Learn. "What is Azure Active Directory B2C?" https://learn.microsoft.com/en-us/azure/active-directory-b2c/overview
2. Microsoft Azure Blog. "Azure AD B2C general availability." September 2016. https://azure.microsoft.com/en-us/blog/azure-ad-b2c-generally-available/
