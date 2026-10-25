---
title: "Auth0 - Identity as a Service"
description: "What Auth0 does, how it compares with Amazon Cognito, Microsoft Entra External ID and Keycloak, and where it fits when an AI application needs login and token-based authorisation."
date: 2026-10-19
categories: [Tools]
tags: ["security", "authentication", "authorization", "identity", "oauth", "beginner", "infrastructure"]
related:
  - tools/amazon-cognito
  - tools/keycloak
  - comparisons/keycloak-vs-cognito-vs-azure-ad-b2c
  - glossary/authentication-and-authorization
  - glossary/oauth
layer: infrastructure
provider: other
pricing_model: freemium
maturity: production
last_updated: 2026-10-19
lastmod: 2026-10-19
last_verified: 2026-10-19
---

Auth0 is a hosted identity service: sign-up, sign-in, multi-factor, social and enterprise federation, and the tokens your backend checks afterwards. It was acquired by Okta in 2021 and is now the developer-facing half of Okta's customer identity offering, sold separately from Okta's workforce product. Like {{< relref "tools/amazon-cognito" >}} it is not an AI tool, and like Cognito it ends up guarding the route to the model, because that is the route that costs money per call.

Official documentation: https://auth0.com/docs  
Identity fundamentals: https://auth0.com/docs/get-started/identity-fundamentals  
Pricing: https://auth0.com/pricing

**AWS equivalent:** {{< relref "tools/amazon-cognito" >}}.
**Azure equivalent:** Microsoft Entra External ID, the successor to Azure AD B2C.
**Self-hosted equivalent:** {{< relref "tools/keycloak" >}}.

## Foundations for beginners

The difference between proving who someone is and deciding what they may do is covered in {{< relref "glossary/authentication-and-authorization" >}}, and the delegated-authorisation standard everything here implements is in {{< relref "glossary/oauth" >}}.

Auth0 occupies a specific position between the cloud services and the open server. It belongs to no cloud, so it does not pull the rest of your architecture anywhere, and it is not yours to operate, so you do not patch it at two in the morning. You pay for that position, and whether it is worth paying for is the whole decision.

## Core capabilities

**Universal Login.** A hosted login page rather than a form inside your application. Less flexible to style, and considerably harder to get wrong: the credentials never touch your code.

**Connections.** Database users, social providers, and enterprise identity providers over SAML and OIDC. A customer who wants to bring their own corporate directory is configuration here rather than a project.

**Actions.** JavaScript that runs at points in the login flow: enrich a token, call an external system, block a sign-in. This is where most real integrations end up, and where most of the complexity accumulates.

**Organizations.** First-class support for multi-tenant business applications, where one user may belong to several customer organisations with different roles. This is the feature most often cited as the reason to choose Auth0 over Cognito.

**Tokens and APIs.** Standard OIDC and OAuth 2.0. You register an API, define scopes, and your backend validates the access token on every request.

## Where it fits in an AI application

The useful habit is to treat the model as a protected API rather than an internal detail. The user signs in, the backend validates the token, and only then does anything spend tokens. Scopes let you separate who may use a cheap endpoint from who may use an expensive one, and the user identity in the token is what makes per-customer usage limits and per-customer cost attribution possible at all.

## Choosing between Auth0, Cognito, Entra External ID and Keycloak

- **Auth0** when you want the shortest route to a correct, well-documented login with strong multi-tenant support, and the price is acceptable.
- **{{< relref "tools/amazon-cognito" >}}** when the application lives on AWS and the identity pool exchanging a token for temporary AWS credentials is useful to you.
- **Microsoft Entra External ID** when the organisation is already on Microsoft and customers sit next to the employee tenant.
- **{{< relref "tools/keycloak" >}}** when the directory must stay in your own building, or when per-user pricing at your scale is worse than operating a server.

Because all four speak the same protocols, an application written against one can usually be pointed at another later. That is the argument for not agonising over this decision at the start of a project.

See {{< relref "comparisons/keycloak-vs-cognito-vs-azure-ad-b2c" >}} for the detailed comparison of the other three.

## Cost model

A free tier for small applications, then plans priced by monthly active users, with the enterprise features gated into higher tiers. The pattern worth knowing before committing: the cost is a step function tied to features as much as to users, and applications with many low-value accounts are where it bites. Model it against your real expected active users, and verify every number on the pricing page.

## Data residency note

Auth0 lets you choose the region your tenant runs in, including European options. For a project with a hard residency requirement, confirm which region covers which data and whether logging and support access fall inside it, rather than assuming the tenant region settles the question.

## Sources and Further Reading

1. Auth0 Docs. https://auth0.com/docs
2. Auth0 Docs. "Identity fundamentals." https://auth0.com/docs/get-started/identity-fundamentals
3. Auth0. "Pricing." https://auth0.com/pricing
4. Okta. "Customer identity." https://www.okta.com/customer-identity/
5. AWS Documentation. "What is Amazon Cognito?" https://docs.aws.amazon.com/cognito/latest/developerguide/what-is-amazon-cognito.html
6. Keycloak. "Documentation." https://www.keycloak.org/documentation
