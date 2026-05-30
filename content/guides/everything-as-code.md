---
title: "Everything as Code: Treating All Artifacts as Software"
description: "The principle of defining infrastructure, configuration, documentation, policy, video, and design as version-controlled code artifacts - and why applying it consistently reduces operational risk and increases reproducibility."
date: 2026-03-31
categories: ["Guides"]
tags: ["software-engineering", "intermediate", "infrastructure-as-code", "devops", "automation", "methodology"]
related:
  - build/build-a-code-based-video
  - software-engineering/version-control-fundamentals
  - software-engineering/gitignore-patterns
last_updated: 2026-05-30
---

Infrastructure as Code (IaC) emerged in the early 2010s as a response to a specific problem: production environments were snowflakes. Every server had been configured by hand, through a mix of SSH sessions and undocumented shell commands, and no two servers in a fleet were exactly identical. Reproducing a failed environment from scratch was an archaeological exercise. Martin Fowler described the pattern in 2016 as "the practice of defining infrastructure through source files that can then be treated like any software system," but the concept had been taking shape in tools like Puppet and Chef since 2005. Terraform, released by HashiCorp in 2014, brought declarative infrastructure definition into mainstream adoption.

What has happened since is a generalisation of the same insight: if defining infrastructure in code made infrastructure more reliable, reproducible, and reviewable, the same argument applies to any artifact that a team depends on. The result is a cluster of related practices grouped under the label "everything as code."

## The Core Argument

The case for treating an artifact as code rests on four properties that version-controlled text files provide and binary or manual processes do not.

**Reproducibility.** Given the same input, a code-defined artifact can be recreated exactly. A Terraform configuration applied to a fresh AWS account produces the same VPC, subnet, and security group structure every time. A Docker image built from the same `Dockerfile` produces the same filesystem. This is not true of a server configured interactively, a document edited in a desktop application, or a video assembled in a timeline editor.

**Auditability.** Every change to a code artifact is a commit with an author, a timestamp, and a message. A pull request diff shows exactly what changed between versions. For infrastructure, this means you know who opened port 22 and when. For policy, you know who changed the data retention rule. For documentation, you know which paragraph was updated after the incident.

**Automation.** A code artifact can be consumed by a pipeline. Infrastructure can be deployed by CI/CD. Tests can be run on every commit. A video can be rendered on push. Automation is not possible when the artifact exists only in a tool that requires human interaction.

**Collaboration.** Code review, branching, merging, and conflict resolution are well-understood workflows for code. When documentation, configuration, and other artifacts are expressed as text files, the same workflows apply. A team member can propose a change to infrastructure via a pull request, receive review comments, iterate, and merge - with the same process used for changing application code.

## The Lineage of Practices

**Infrastructure as Code** is the original and most mature instantiation. Tools like Terraform (HashiCorp Configuration Language), AWS CloudFormation (YAML or JSON), Pulumi (TypeScript or Python), and Ansible (YAML playbooks) define cloud resources and server configuration as text files. The state of production infrastructure is a function of the code in the repository, not of manual operations.

**Policy as Code** extends the principle to governance and compliance rules. Open Policy Agent (OPA) defines authorization policies in Rego, a purpose-built policy language. AWS Service Control Policies and Azure Policy use JSON or JSON-like formats. The advantage is the same as with infrastructure: policies can be reviewed, tested, and audited. A policy that previously lived in a PDF document sent to new hires can instead live in a repository, with tests that verify the policy rejects the cases it is supposed to reject.

**Docs as Code** defines technical documentation in lightweight markup formats (Markdown, reStructuredText, AsciiDoc) stored in version control alongside the code they describe. Static site generators (Hugo, Jekyll, Docusaurus, MkDocs) compile these files into published documentation. This wiki is itself an example: every article is a Markdown file, changes go through the same git workflow as code changes, and the site is rebuilt on every push. The alternative, documentation in Confluence or Google Docs, is searchable but not auditable, not reproducible, and not automatable.

**Pipeline as Code** defines CI/CD pipelines as configuration files stored in the repository rather than configured through a web UI. GitHub Actions workflows (`.github/workflows/*.yml`), Jenkins `Jenkinsfile`, and GitLab CI `.gitlab-ci.yml` are all expressions of this principle. A pipeline defined in a file can be reviewed, branched, and rolled back. A pipeline configured only through a web UI is a manual artifact with no history.

**Design as Code** covers design tokens - the color palette, typography scale, spacing system, and other design primitives of a product - defined as JSON or TypeScript constants. Tools like Style Dictionary compile token files into platform-specific outputs: CSS custom properties, iOS Swift constants, Android XML resources. When a brand color changes, the change propagates to all platforms from a single commit. Figma's token plugins and integration with design token repositories are moving design systems closer to this model.

**Video as Code** applies the principle to motion graphics, product demos, and explainer animations. Remotion is the most developed tool in this space: React components render to video frames, animations are expressed as pure functions of frame number and input data, and the entire project is a TypeScript repository. A video built with Remotion can be reviewed as a pull request, parameterised with different content, rendered to multiple output formats from a single command, and rebuilt exactly by anyone who checks out the repository. For content that is structural and data-driven, such as product demos, data visualizations, and marketing variants, this approach replaces manual editing with a reproducible build process.

## The Cultural Shift

Adopting these practices requires a change in how teams think about the artifacts they produce. The transition is not purely technical.

The primary resistance is usually the learning curve of writing code for tasks that previously required no code. Setting up a CloudFormation stack the first time takes longer than clicking through the AWS console. Writing a Hugo Markdown article requires understanding frontmatter; editing a Confluence page does not. The return on this investment comes at the second instance, not the first: the second environment provisioned, the second time someone needs to find who changed a document, the second time a video variant needs to be produced.

A subtler resistance is the discomfort of applying software engineering rigour to domains that have not traditionally had it. Operations teams sometimes resist code review for infrastructure changes because they are accustomed to making changes directly. The shift requires trust in tooling and in process, and it requires that the tooling actually work.

The teams where these practices spread most naturally are those where the same people own multiple domains: engineers who write application code, manage infrastructure, write documentation, and create demo content. When the same person does all of these things, the appeal of a single workflow - `git commit`, pull request, merge, deploy - is obvious. When these responsibilities are separated across specialised teams, the coordination cost of adopting shared workflows is higher.

## Where the Boundary Is

Not everything benefits from being expressed as code. Content that is inherently unstructured, subjective, or dependent on human creative judgment does not gain much from being stored as text files. A product strategy document is a meaningful artifact but it is not parameterised, not rendered by a pipeline, and not reproducible from inputs - there is no build process to automate. Storing it in a git repository adds auditability but none of the other properties.

The useful test is: does this artifact have a build process? If yes, can that build process be automated? If the artifact is currently produced by a human clicking through a tool rather than by a deterministic transformation of inputs, then expressing it as code is likely worth investigating. If it is produced by genuine human judgment that cannot be specified as a function, the overhead of code-based tooling adds friction without adding value.

Infrastructure, policies, documentation, pipelines, design tokens, and programmatic video all pass this test. They are built from defined inputs by a deterministic process. Making that process explicit in code is the contribution of the everything-as-code principle.
