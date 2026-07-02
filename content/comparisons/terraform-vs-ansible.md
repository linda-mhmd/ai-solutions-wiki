---
title: "Terraform vs Ansible"
description: "How Terraform and Ansible differ for AI infrastructure, provisioning versus configuration, declarative versus procedural, and why most teams use both together."
date: 2026-07-02
categories: [Comparisons]
tags: [terraform, ansible, infrastructure-as-code, automation, ai-infrastructure, comparison]
related:
  - tools/terraform
  - tools/ansible
  - comparisons/terraform-vs-cdk
  - guides/infrastructure-as-code-ai
  - guides/everything-as-code
  - glossary/idempotency
last_verified: 2026-07-02
---

<figure class="bz-figure">
  <img src="/img/enterprise-dark/twin-gears-red-notext.png" alt="Two dark gear clusters meshing under red light, a metaphor for Terraform and Ansible as two complementary automation tools." loading="lazy">
  <figcaption>Terraform and Ansible are usually framed as rivals. In practice they are two gears that mesh: one builds the machine, the other configures it.</figcaption>
</figure>

Terraform and Ansible are the two most common tools for automating infrastructure, and they are constantly compared as if you must pick one. You usually do not. They solve different halves of the same problem: [Terraform](/tools/terraform/) provisions infrastructure (create the servers, networks, and clusters), and [Ansible](/tools/ansible/) configures it (install and set up what runs on those servers). For AI teams standing up GPU clusters, understanding the split saves a lot of wasted effort.

## Comparison table

| | Terraform | Ansible |
|---|---|---|
| **Primary job** | Provision infrastructure | Configure and deploy |
| **Paradigm** | Declarative (desired state) | Procedural, but idempotent |
| **State** | Tracks a state file | Stateless, checks live system |
| **Agent** | Agentless (cloud APIs) | Agentless (SSH or WinRM) |
| **Language** | HCL | YAML playbooks |
| **Strength** | Cloud resource lifecycle | OS, packages, app config |
| **Weakness** | In-server configuration | Full lifecycle and dependency graphs |
| **Best for** | Creating GPU nodes, VPCs, clusters | Installing drivers, CUDA, services |

## What each one is built for

### Terraform: provisioning

Terraform is declarative. You describe the infrastructure you want, GPU instances, a VPC, a Kubernetes cluster, object storage, and Terraform works out the create, update, and delete actions to reach that state. It records what it has built in a state file, so it can detect drift and tear everything down cleanly. This lifecycle management is its core strength and pairs naturally with an immutable-infrastructure style, where you replace servers rather than patch them.

Its main limits are inside the machine. Terraform provisions a GPU node, but it is awkward at the follow-on work of installing a specific driver version, compiling a kernel module, or restarting a service in the right order. One note on licensing: HashiCorp moved Terraform to the Business Source License in 2023, which prompted the MPL-licensed OpenTofu fork, now a drop-in alternative worth knowing about.

### Ansible: configuration

Ansible is agentless and push-based: it connects over SSH and runs tasks on the target machines, so there is nothing to install on them first. Its modules are idempotent, meaning running the same playbook twice leaves the system in the same state, which is what makes configuration management safe to repeat. Playbooks are ordered lists of tasks, so Ansible shines at "do these steps, in this sequence" work: install packages, render config files, manage services, deploy an application.

Its weak spot is the mirror image of Terraform's strength. Ansible has no built-in model of your full cloud estate or its dependency graph, so using it as your primary provisioner means reinventing state tracking and lifecycle management that Terraform gives you for free.

## The AI infrastructure split

On a real GPU cluster the division of labour is clean, and it maps directly onto the two tools:

- **Terraform provisions** the GPU instances (for example H100 or Blackwell nodes), the VPC and subnets, the managed Kubernetes cluster, shared storage, and IAM roles.
- **Ansible configures** each node once it exists: the matching NVIDIA driver, the CUDA toolkit, the container toolkit, Slurm or the Kubernetes agent, monitoring, and any model-serving runtime.

That is why the two appear together in most AI platform playbooks. The GPU driver and CUDA version are exactly the kind of in-server, order-sensitive configuration Terraform handles poorly and Ansible handles well.

## Using them together

The standard pattern runs Terraform first, then hands off to Ansible.

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 1</span>
    <span class="bz-flow-step-name">Provision</span>
    <span class="bz-flow-step-desc">Terraform creates the GPU nodes, network, and cluster, and outputs their addresses.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 2</span>
    <span class="bz-flow-step-name">Configure</span>
    <span class="bz-flow-step-desc">Ansible installs drivers, CUDA, the container toolkit, and services on each node.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 3</span>
    <span class="bz-flow-step-name">Deploy</span>
    <span class="bz-flow-step-desc">Ship the training or serving workload onto the ready cluster.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 4</span>
    <span class="bz-flow-step-name">Maintain</span>
    <span class="bz-flow-step-desc">Terraform manages the estate lifecycle; Ansible re-runs to keep config in line.</span>
  </div>
</div>

Ansible can consume Terraform's outputs as its inventory, so the addresses of freshly provisioned nodes flow straight into the configuration step with no manual copying.

## When to choose which

**Choose Terraform alone** when your work is pure cloud provisioning and the machines are configured from prebuilt images, so there is little in-server setup to do.

**Choose Ansible alone** when the infrastructure already exists (on-premise servers, for example) and you only need to configure and deploy onto it.

**Choose both** for anything involving custom GPU nodes: Terraform to build the fleet, Ansible to make each node ready to train or serve. This is the default for serious AI infrastructure.

If your question is really Terraform versus a cloud-native provisioner rather than versus Ansible, see [Terraform vs CDK](/comparisons/terraform-vs-cdk/).

## Further reading

- [Terraform](/tools/terraform/): the provisioning tool in depth.
- [Ansible](/tools/ansible/): the configuration tool in depth, including a GPU-node playbook.
- [Infrastructure as code for AI](/guides/infrastructure-as-code-ai/): the wider practice both tools serve.
- [Everything as code](/guides/everything-as-code/): where provisioning and configuration sit in a codified stack.
- [Terraform vs CDK](/comparisons/terraform-vs-cdk/): the other common Terraform comparison.
- [Terraform documentation](https://developer.hashicorp.com/terraform/docs): official provisioning reference.
- [Ansible documentation](https://docs.ansible.com/): official configuration and playbook reference.

## Sources

- HashiCorp. "Terraform Documentation." https://developer.hashicorp.com/terraform/docs. Declarative provisioning, state, and the resource lifecycle.
- Red Hat. "Ansible Documentation." https://docs.ansible.com/. Agentless architecture, idempotent modules, and playbooks.
- OpenTofu. "OpenTofu: An open-source, community fork of Terraform." https://opentofu.org/. The MPL-licensed fork created after the 2023 license change.
- Morris, K. *Infrastructure as Code: Dynamic Systems for the Cloud Age*, 2nd ed. O'Reilly (2020). The provisioning-versus-configuration distinction and IaC patterns.
