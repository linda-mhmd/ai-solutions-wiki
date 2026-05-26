---
title: "Amazon Cognito - User Authentication for AI Apps"
description: "Amazon Cognito User Pools and Identity Pools: JWT token structure and expiry, MFA options, SAML/OIDC federation, Lambda triggers, rate limits, multi-tenancy patterns, and service quotas."
date: 2026-03-24
categories: [Tools]
tags: ["security", "intermediate", "aws-cognito", "authentication", "authorization", "identity", "aws"]
related:
  - tools/aws-amplify
  - tools/amazon-api-gateway
  - tools/amazon-bedrock
  - foundations/security
  - glossary/jwt
  - glossary/oauth2
  - glossary/saml
---

Amazon Cognito provides user authentication, authorization, and user management for web and mobile applications. It handles sign-up flows, password policies, MFA, social identity providers (Google, Apple, Facebook), and enterprise federation (SAML 2.0, OIDC). For AI applications, it secures the API layer and generates the credentials that authorize calls to AWS services.

Official documentation: https://docs.aws.amazon.com/cognito/latest/developerguide/  
Pricing: https://aws.amazon.com/cognito/pricing/  
Service quotas: https://docs.aws.amazon.com/cognito/latest/developerguide/limits.html

**Azure equivalent:** Azure AD B2C. **GCP equivalent:** Firebase Authentication.

## Two Core Components

Cognito has two distinct services that are frequently confused:

**User Pools** manage user directories and authentication. A User Pool stores user accounts, handles authentication (username/password, social login, enterprise SSO), and issues three JWT tokens: an ID token (user attributes and identity claims), an access token (authorizes resource server operations), and a refresh token (obtains new ID and access tokens without re-authentication). The critical distinction: User Pools authenticate users. They do not grant AWS service access.

**Identity Pools** (Federated Identities) exchange User Pool tokens, or tokens from any OIDC-compatible provider, for temporary AWS credentials via STS `AssumeRoleWithWebIdentity`. These credentials authorize direct calls to AWS services from client code. Identity Pools are what you need when a front-end application needs to call S3, Bedrock, or other AWS services directly, without routing through a backend.

The typical production flow: User Pool authenticates the user → issues JWT → Identity Pool exchanges JWT → issues temporary IAM credentials → client calls AWS services directly.

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

**Email OTP**, Cognito-managed OTP delivery via SES. Available as of 2024. Does not require SMS setup; useful where SMS is unavailable or cost-prohibitive.

MFA can be set as optional (user choice), required (enforced), or off. Lambda triggers can enforce MFA dynamically based on user attributes or login context.

## Rate Limits and Service Quotas

Relevant limits for production systems (adjustable via support ticket):

| Operation | Default limit |
|---|---|
| `InitiateAuth` (sign-in) | 120 requests/second per User Pool |
| `SignUp` | 50 requests/second per User Pool |
| `ForgotPassword` | 30 requests/second per User Pool |
| `ConfirmSignUp` | 30 requests/second per User Pool |
| Custom auth Lambda invocations | Inherit Lambda concurrency limits |
| Users per User Pool | 40 million (soft limit) |
| App Clients per User Pool | 300 |

Authentication failures do not count against rate limits but trigger Cognito's built-in brute force protection (Advanced Security required). Standard protection is available without Advanced Security: accounts lock after a configurable number of consecutive failures.

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

**Hosted UI**, Cognito-managed sign-in/sign-up pages hosted on a `.auth.region.amazoncognito.com` domain or a custom domain with ACM certificate. Supports CSS customization for colors, fonts, and logo. Not suitable for complete UI redesigns, use Amplify UI components or implement the OAuth2 flows manually if full design control is needed.

**Advanced Security**, Adds compromised credential detection, adaptive authentication (risk-based step-up MFA), and detailed security audit logs. Billed per Monthly Active User (MAU) on top of the standard MAU charge. Recommended for user-facing production AI applications.

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

## Sources

- AWS. "Amazon Cognito Developer Guide." https://docs.aws.amazon.com/cognito/latest/developerguide/, Authoritative reference for all Cognito features.
- RFC 6238. "TOTP: Time-Based One-Time Password Algorithm." IETF (2011). https://www.rfc-editor.org/rfc/rfc6238, The standard behind Cognito's TOTP MFA.
- RFC 7519. "JSON Web Token (JWT)." IETF (2015). https://www.rfc-editor.org/rfc/rfc7519, JWT structure and claims specification.
- OpenID Foundation. "OpenID Connect Core 1.0." https://openid.net/specs/openid-connect-core-1_0.html, The OIDC specification underlying Cognito's federation model.
