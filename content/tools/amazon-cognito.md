---
title: "Amazon Cognito - User Authentication and Identity"
description: "What user authentication is and how Amazon Cognito handles sign-up, sign-in, MFA, and federation, with where it fits when you secure an AI application."
date: 2026-03-24
categories: [Tools]
tags: ["security", "beginner", "aws-service", "authentication", "authorization", "identity", "aws"]
related:
  - tools/aws-amplify
  - tools/aws-lambda
  - tools/amazon-bedrock
  - foundations/security
  - glossary/authentication-and-authorization
  - glossary/oauth
  - glossary/security-pillar
layer: infrastructure
provider: aws
pricing_model: payg
maturity: production
last_updated: 2026-06-14
lastmod: 2026-06-14
enhanced_pass: "2026-06"
---

Amazon Cognito is AWS's managed service for user authentication, authorization, and user management. It is a general building block of software, not an AI tool, but it is the piece that secures most applications, including AI ones. It handles sign-up flows, password policies, MFA, social identity providers (Google, Apple, Facebook), and enterprise federation (SAML 2.0, OIDC). In an AI application it secures the API layer and generates the credentials that authorize calls to AWS services such as Amazon Bedrock.

## What is authentication, and why it matters

Before the AWS specifics, the foundation. **Authentication** is proving who a user is: the login step, whether that is a username and password, a one time code, or a fingerprint. **Authorization** is deciding what that user is allowed to do once they are in. Almost every real application needs both. You do not want one user reading another user's data, and you do not want an unauthenticated stranger calling your expensive AI model.

Doing this yourself is harder than it looks. You have to store passwords safely (hashed, never as plain text), handle password resets, add multi factor authentication, defend against bots and credential stuffing, and keep up with shifting security standards. A managed identity service like Amazon Cognito does this work for you, so you can build your product instead of rebuilding login screens and token handling from scratch.

In an AI application this matters twice over. The same login that protects an ordinary web app also protects the route to your model. The token a user receives at sign in is what your backend checks before it spends money on an AI call, and it is how you keep each customer's data and usage separate.

Prerequisite concepts worth reading first: {{< relref "glossary/authentication-and-authorization" >}} (the difference between proving who you are and what you may do), {{< relref "glossary/oauth" >}} (the delegated-authorization standard Cognito implements), and the {{< relref "foundations/security" >}} foundations for how identity fits the wider picture.

Official documentation: https://docs.aws.amazon.com/cognito/latest/developerguide/  
Pricing: https://aws.amazon.com/cognito/pricing/  
Service quotas: https://docs.aws.amazon.com/cognito/latest/developerguide/limits.html

**Azure equivalent:** Azure AD B2C. **GCP equivalent:** Firebase Authentication.

## Two Core Components

Cognito has two distinct services that are frequently confused:

**User Pools** manage user directories and authentication. A User Pool stores user accounts, handles authentication (username/password, social login, enterprise SSO), and issues three JWT tokens: an ID token (user attributes and identity claims), an access token (authorizes resource server operations), and a refresh token (obtains new ID and access tokens without re-authentication). The critical distinction: User Pools authenticate users. They do not grant AWS service access.

**Identity Pools** (Federated Identities) exchange User Pool tokens, or tokens from any OIDC-compatible provider, for temporary AWS credentials via STS `AssumeRoleWithWebIdentity`. These credentials authorize direct calls to AWS services from client code. Identity Pools are what you need when a front-end application needs to call S3, Bedrock, or other AWS services directly, without routing through a backend.

The typical production flow: User Pool authenticates the user, issues a JWT, the Identity Pool exchanges that JWT, issues temporary IAM credentials, and the client calls AWS services directly.

## Feature Plans, Managed Login, and Passwordless

In November 2024 AWS restructured how user pools are packaged and priced. Instead of an a la carte "advanced security features" add-on, a user pool now picks one of three feature plans (set per pool, switchable at any time, the default for new pools is Essentials):

- **Lite** - basic sign-up and sign-in, social/SAML/OIDC providers, the classic hosted UI, MFA with authenticator apps and SMS, and machine-to-machine (M2M) client-credentials tokens. The lowest cost per active user.
- **Essentials** - everything in Lite plus Managed Login, passwordless sign-in (passkeys, email and SMS one-time codes), email MFA, and runtime customization of access-token scopes and claims. This is the tier most new applications use.
- **Plus** - everything in Essentials plus threat protection: compromised-credential and breached-password detection, risk-based adaptive authentication, and exportable user-activity and risk logs. This replaces what used to be sold as the separate Advanced Security Features (ASF) add-on.

**Managed Login** is the modern hosted sign-in and sign-up experience that supersedes the classic Hosted UI. It is configured with a visual branding editor in the console (no custom front-end code required) and is available in the Essentials and Plus plans. The classic hosted UI remains available in all plans.

**Passwordless authentication** (announced 22 November 2024, Essentials and Plus plans) lets users sign in without a password as the first factor:

- **Passkeys** - FIDO2/WebAuthn credentials backed by a built-in authenticator such as Touch ID, Windows Hello, or a security key. Passkeys are phishing resistant because the private key never leaves the device. A user can register up to 20 passkey authenticators.
- **Email or SMS one-time codes** - a single-use code sent to the user's inbox or phone as the first factor, no stored password at all.

For a beginner securing an AI app today, Essentials with Managed Login and passkeys is a sensible default, and Plus is worth it once you have real users to protect.

## JWT Token Structure and Expiry

Cognito JWTs follow the standard three-part base64url-encoded structure: `header.payload.signature`. Key payload claims:

| Claim | Meaning |
|---|---|
| `sub` | User's unique identifier (UUID, immutable) |
| `aud` | Audience, the App Client ID |
| `iss` | Issuer, the User Pool URL |
| `exp` | Expiration timestamp (Unix epoch) |
| `iat` | Issued-at timestamp |
| `auth_time` | When the user authenticated |
| `token_use` | `"id"` or `"access"` |
| `cognito:username` | Username in the User Pool |
| `cognito:groups` | Group memberships (for access control) |

**Token expiry (configurable per App Client):**
- Access token: 5 minutes to 24 hours (default: 1 hour)
- ID token: 5 minutes to 24 hours (default: 1 hour)
- Refresh token: 60 minutes to 3,650 days (default: 30 days)

Tokens are validated by API Gateway's Cognito authorizer or by the application using Cognito's JWKS endpoint at `https://cognito-idp.<region>.amazonaws.com/<userPoolId>/.well-known/jwks.json`. Signature validation uses RS256 (RSA + SHA-256).

## Multi-Factor Authentication

Cognito supports three MFA mechanisms:

**TOTP (Time-based One-Time Password)**, Users enroll an authenticator app (Google Authenticator, Authy, any RFC 6238-compliant app). Cognito generates a TOTP secret during setup; the app generates 6-digit codes that rotate every 30 seconds. TOTP requires no SMS infrastructure and works offline. Recommended default choice.

**SMS MFA**, A 6-digit code delivered via SMS. Requires an SNS sandbox approval for production send rates above 1 SMS/second. Per-message cost applies. SMS delivery is unreliable in some regions and subject to SIM-swapping attacks.

**Email MFA**, A 6-digit code delivered by email. It requires the Essentials or Plus feature plan and that the user pool sends mail through your own Amazon SES configuration (the built-in Cognito email sender is capped and not for production volume). Useful where SMS is unavailable or cost prohibitive.

MFA can be set as optional (user choice), required (enforced), or off. Lambda triggers can enforce MFA dynamically based on user attributes or login context. Note that email or SMS one-time codes can also be used as a passwordless first factor (see Feature Plans above), which is different from using them as a second factor after a password.

## Rate Limits and Service Quotas

Request-rate quotas are enforced per category of operations (not per individual API), measured across all user pools in one AWS account in one Region. The defaults relevant to most production systems (some adjustable, you purchase additional capacity in Service Quotas):

| Category | Example operations | Default quota (RPS) |
|---|---|---|
| `UserAuthentication` | `InitiateAuth`, `AdminInitiateAuth` (sign-in) | 120 |
| `UserCreation` | `SignUp`, `ConfirmSignUp`, `AdminCreateUser` | 50 |
| `UserAccountRecovery` | `ForgotPassword`, `ConfirmForgotPassword` | 30 |
| `UserFederation` | SAML, OIDC, and social IdP responses | 25 |
| `ClientAuthentication` | M2M `client_credentials` token requests | 150 |

Resource quotas (some adjustable):

| Resource | Default | Adjustable |
|---|---|---|
| Users per user pool | 40,000,000 | Yes |
| App clients per user pool | 1,000 | Yes (up to 10,000) |
| User pools per Region | 1,000 | Yes |
| Identity providers per user pool | 300 | Yes |
| Passkey/WebAuthn authenticators per user | 20 | No |

Authentication failures do not count against the rate quotas but trigger Cognito's account-protection behavior. Risk-based adaptive authentication and breached-credential detection require the Plus feature plan; basic password-policy enforcement and standard lockout behavior are available in all plans.

## Enterprise Federation: SAML and OIDC

For B2B applications where enterprise users authenticate via their company's identity provider:

**SAML 2.0 federation**, Configure the enterprise IdP (Okta, Azure AD, Ping) as a SAML identity provider in the User Pool. Users clicking "Sign in with your company account" are redirected to the enterprise IdP, which authenticates them and returns a SAML assertion. Cognito maps SAML attributes to User Pool attributes. The application receives standard Cognito JWTs regardless of the underlying IdP.

**OIDC federation**, Works the same way but uses the OIDC protocol. Better for modern IdPs.

Both patterns require the enterprise IT team to configure a Cognito service provider entry in their IdP. The Cognito-provided metadata URL contains all required configuration.

## JWT Token Flow for AI APIs

Standard pattern for AI applications:

1. User signs in via User Pool (directly or through Hosted UI)
2. Cognito returns ID token, access token, refresh token
3. Front-end includes the access token as a Bearer token in API Gateway requests
4. API Gateway validates the token using a Cognito authorizer (no Lambda needed)
5. Lambda receives the validated request; user identity is in `requestContext.authorizer.claims`

Access token validation by API Gateway is performed against the User Pool's JWKS endpoint. Invalid or expired tokens return HTTP 401 before Lambda is invoked.

## User Pool Features

**Lambda Triggers**, Lambda functions invoked at authentication lifecycle events. Most commonly used:
- `pre-signup`, custom validation before user registration
- `post-confirmation`, webhook after email/phone verification
- `pre-token-generation`, add custom claims to JWTs (e.g., `tenant_id`, role overrides, subscription tier)
- `custom-message`, customize verification email/SMS content
- `user-migration`, migrate users from legacy auth systems on first login without a bulk migration

**Managed Login (and the classic Hosted UI)**, Cognito-hosted sign-in and sign-up pages served on a `.auth.<region>.amazoncognito.com` domain or a custom domain with an ACM certificate. Managed Login (Essentials and Plus plans) adds a visual branding editor for colors, fonts, and logos and pre-built passwordless flows. The older classic Hosted UI (all plans) supports CSS customization only. For full design control, use AWS Amplify UI components or implement the OAuth 2.0 flows yourself.

**Threat protection (Plus plan)**, Adds compromised-credential and breached-password detection, adaptive authentication (risk-based step-up MFA), and exportable user-activity and risk logs. This is the capability formerly sold as the standalone Advanced Security Features add-on, now bundled into the Plus feature plan and billed per Monthly Active User. Recommended for user-facing production AI applications.

## Multi-Tenancy Patterns

For B2B AI applications where each customer is a separate tenant:

**Single User Pool with `tenant_id` attribute:**
- Custom attribute `custom:tenant_id` set during sign-up
- Lambda `pre-token-generation` trigger adds `tenant_id` as a claim in the access token
- API and data layer scope all operations to the claim value
- Simpler operations; no cross-pool user lookups

**Separate User Pool per tenant:**
- Stronger isolation; tenant configuration (MFA policy, password policy, IdP) is independent
- More operational overhead; requires dynamic pool selection in front-end and API code
- Appropriate when tenants have different compliance or federation requirements

## Best practices

For authoritative guidance, follow the AWS Well-Architected Framework Security Pillar section on identity and access management: grant least privilege to the IAM roles your Identity Pool hands out, prefer short-lived temporary credentials over long-lived keys, validate JWTs on the client and at the edge, and turn on MFA. For how the Security Pillar applies to AI workloads specifically, see {{< relref "glossary/security-pillar" >}}.

## Sources

- AWS. "Amazon Cognito Developer Guide." https://docs.aws.amazon.com/cognito/latest/developerguide/, Authoritative reference for all Cognito features.
- AWS. "User pool feature plans." Cognito Developer Guide. https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-sign-in-feature-plans.html, Defines the Lite, Essentials, and Plus plans and which features each includes.
- AWS. "Amazon Cognito pricing." https://aws.amazon.com/cognito/pricing/, Current MAU-based pricing per feature plan and machine-to-machine token pricing.
- AWS. "Quotas in Amazon Cognito." Developer Guide. https://docs.aws.amazon.com/cognito/latest/developerguide/quotas.html, Source for the category request-rate and resource quotas cited above.
- AWS. "Amazon Cognito now supports passwordless authentication for low-friction and secure logins." 22 November 2024. https://aws.amazon.com/about-aws/whats-new/2024/11/amazon-cognito-passwordless-authentication-low-friction-secure-logins, Announcement of passkeys and email/SMS one-time-code sign-in.
- AWS. "Amazon Cognito introduces Managed Login to support rich branding for end user journeys." November 2024. https://aws.amazon.com/about-aws/whats-new/2024/11/amazon-cognito-managed-login, Announcement of the Managed Login hosted experience.
- AWS. "Identity and access management." AWS Well-Architected Framework, Security Pillar. https://docs.aws.amazon.com/wellarchitected/latest/security-pillar/identity-and-access-management.html, Authoritative best-practice guidance for identity on AWS.
- aws-samples. "amazon-cognito-passwordless-auth." GitHub. https://github.com/aws-samples/amazon-cognito-passwordless-auth, Reference implementation of FIDO2/passkey, magic link, and SMS OTP flows on Cognito.
- RFC 6238. "TOTP: Time-Based One-Time Password Algorithm." IETF (2011). https://www.rfc-editor.org/rfc/rfc6238, The standard behind Cognito's TOTP MFA.
- RFC 7519. "JSON Web Token (JWT)." IETF (2015). https://www.rfc-editor.org/rfc/rfc7519, JWT structure and claims specification.
- OpenID Foundation. "OpenID Connect Core 1.0." https://openid.net/specs/openid-connect-core-1_0.html, The OIDC specification underlying Cognito's federation model.
