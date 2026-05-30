---
title: "Software Configuration Management"
description: "The discipline of tracking and controlling changes to software artifacts, rooted in military standards and formalized by IEEE 828, encompassing configuration items, baselines, and change control."
date: 2026-03-28
categories: [Glossary]
tags: [configuration-management, software-engineering, version-control]
related:
  - glossary/version-control-fundamentals
  - glossary/continuous-integration-fundamentals
  - glossary/technical-debt
last_updated: 2026-05-30
---

Software Configuration Management (SCM) is the discipline of identifying, organizing, and controlling changes to the software artifacts that make up a system. It ensures that teams can reproduce any version of the software, trace every change to its origin, and maintain consistency across development, testing, and production environments.

## Origins and History

Configuration management originated in the United States defense industry during the 1960s as a method for controlling changes to complex weapons systems. The Department of Defense published MIL-STD-483, "Configuration Management Practices for Systems, Equipment, Munitions, and Computer Programs," in 1970, establishing formal procedures for configuration identification, control, status accounting, and auditing [1]. These military standards influenced the IEEE, which published IEEE 828, "Standard for Software Configuration Management Plans," first released in 1983 and revised in 1990, 1998, and 2012 [2]. IEEE 828 adapted the defense concepts specifically for software, defining the activities, responsibilities, and documentation required for effective SCM. As software development practices evolved, SCM principles were embedded into version control systems. From RCS (1982) and CVS (1990) through Subversion (2000) and Git (2005, created by Linus Torvalds), each generation of tooling automated more of the identification, control, and auditing activities that SCM originally required as manual processes [3].

## Core Concepts

**Configuration items** are the individually identified artifacts placed under configuration management. Source code files, build scripts, database schemas, configuration files, test data, and documentation can all be configuration items. The key decision is granularity: too coarse and you cannot track changes precisely; too fine and the overhead of managing items becomes burdensome.

**Baselines** are approved snapshots of a set of configuration items at a point in time. A functional baseline captures requirements. A development baseline captures the current working state. A product baseline captures what is released. Baselines provide the reference points against which changes are measured.

**Change control boards** (CCBs) are the governance mechanism for approving changes to baselined items. In formal environments, a CCB reviews proposed changes, assesses impact, and approves or rejects them before implementation. In modern agile teams, automated CI/CD pipelines, pull request reviews, and branch protection rules serve the same function with less ceremony.

**Status accounting** records and reports the state of all configuration items: current version, pending changes, change history, and approval status. Modern tools automate this through commit logs, issue trackers, and deployment dashboards.

## Modern Practice

Today, SCM principles are so deeply embedded in development workflows that teams practice them without using the term. Git branches are baselines. Pull request approvals are change control. CI pipelines are configuration audits. Understanding the underlying SCM concepts helps teams recognize when their tooling gaps leave configuration management holes, such as unversioned infrastructure configuration or database migrations tracked outside version control.

## Sources

1. United States Department of Defense. "MIL-STD-483: Configuration Management Practices for Systems, Equipment, Munitions, and Computer Programs," 1970.
2. IEEE Computer Society. "IEEE 828: Standard for Software Configuration Management Plans," 1983 (revised 1990, 1998, 2012).
3. Torvalds, L. Git version control system, first released April 2005. Distributed SCM tool that became the dominant platform for software configuration management.
