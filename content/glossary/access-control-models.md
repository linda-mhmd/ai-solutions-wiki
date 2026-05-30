---
title: "Access Control Models"
description: "Frameworks for controlling who can access resources, including DAC, MAC, RBAC, and ABAC."
date: 2026-03-28
categories: [Glossary]
tags: [access-control, RBAC, ABAC, DAC, MAC, security, authorization]
last_updated: 2026-05-30
---

Access control models define the rules and mechanisms by which systems determine whether a subject (user, process, or device) is permitted to perform an action on a resource. The choice of access control model fundamentally shapes a system's security posture and administrative complexity.

## Origins and History

Access control research began in earnest in the 1970s with the development of formal security models for military and government computing. The Bell-LaPadula model (1973) formalized mandatory access control for confidentiality. The Biba model (1977) addressed integrity. Discretionary access control was implemented in early Unix file permissions and formalized in the Trusted Computer System Evaluation Criteria (the Orange Book, 1983). Role-Based Access Control (RBAC) was proposed by David Ferraiolo and Richard Kuhn at NIST in 1992, addressing the administrative burden of managing per-user permissions in large organizations. RBAC was standardized in ANSI INCITS 359-2004. Attribute-Based Access Control (ABAC) emerged in the 2000s as a more flexible model, with NIST publishing SP 800-162 in 2014 defining the ABAC concept and architecture.

## The Four Models

**Discretionary Access Control (DAC)** allows resource owners to grant or revoke access at their discretion. Unix file permissions are a classic example. DAC is flexible but difficult to enforce consistently across large organizations. **Mandatory Access Control (MAC)** enforces access based on classification labels (e.g., Top Secret, Secret, Confidential) assigned by a central authority. Subjects cannot override these labels. MAC is used in military and high-security government systems. **Role-Based Access Control (RBAC)** assigns permissions to roles, and users are assigned to roles. This simplifies administration: when an employee changes position, their role assignment changes rather than individual permissions. **Attribute-Based Access Control (ABAC)** evaluates policies based on attributes of the subject, resource, action, and environment (e.g., "allow if user.department == resource.department AND time is within business hours").

## Practical Applications

Most enterprise systems use RBAC as the baseline, with cloud platforms (AWS IAM, Azure AD) offering RBAC combined with policy-based controls that approach ABAC. ABAC is increasingly used in zero-trust architectures where access decisions depend on dynamic context such as device posture, location, and risk score.

## Sources

1. Ferraiolo, D. and Kuhn, R. (1992). "Role-Based Access Controls." *15th National Computer Security Conference*, NIST.
2. National Institute of Standards and Technology (2014). "Guide to Attribute Based Access Control (ABAC) Definition and Considerations." NIST SP 800-162.
3. Sandhu, R. and Samarati, P. (1994). "Access Control: Principles and Practice." *IEEE Communications Magazine*, 32(9), 40-48.
