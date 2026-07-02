---
title: "Ansible"
description: "Ansible is Red Hat's open-source, agentless automation tool for configuration management and deployment, widely used to make GPU fleets AI-ready with drivers, runtimes, and model servers."
date: 2026-07-01
tags: ["automation", "infrastructure", "configuration-management", "devops", "open-source", "gpu"]
tool_category: "Infrastructure"
related:
  - tools/terraform
  - guides/infrastructure-as-code-ai
  - glossary/infrastructure-as-code
  - glossary/kubernetes
  - tools/nvidia-ai
  - guides/scaling-ai-infrastructure
---

<figure class="bz-figure">
  <img src="/img/obsidian-lab/hub-spokes-orchestration-notext.png" alt="A mechanical hub with copper arms reaching outward, representing one control node pushing configuration to many managed servers." loading="lazy">
  <figcaption>Ansible is a hub with reach. One control node pushes the same declared state out to an entire fleet of machines at once.</figcaption>
</figure>

Ansible is an open-source IT automation tool, maintained by Red Hat, that handles configuration management, application deployment, provisioning, and orchestration from a single control node. It is agentless: it connects to managed machines over SSH or WinRM, pushes small programs that describe the desired state, runs them, and cleans up, so nothing needs to run permanently on the targets. You write automation as declarative YAML playbooks that are idempotent, meaning you can run the same playbook repeatedly and the system converges to the same state without re-applying changes that are already in place. For AI teams, Ansible is the layer that turns bare machines into GPU-ready hosts.

## Where Ansible sits

Ansible runs from a control node that holds your playbooks, inventory, and credentials, and pushes configuration out to managed nodes on demand.

<div class="bz-arch">
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Control node</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Playbooks</span>
      <span class="bz-arch-chip">Inventory</span>
      <span class="bz-arch-chip">Roles and collections</span>
      <span class="bz-arch-chip">ansible-vault secrets</span>
      <span class="bz-arch-chip-note">Where automation and credentials live</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Transport</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">SSH</span>
      <span class="bz-arch-chip">WinRM</span>
      <span class="bz-arch-chip-note">Agentless push, no daemon on the targets</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Managed nodes</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">GPU servers</span>
      <span class="bz-arch-chip">Kubernetes nodes</span>
      <span class="bz-arch-chip">Slurm compute</span>
      <span class="bz-arch-chip">Edge devices</span>
      <span class="bz-arch-chip-note">The machines being configured</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">What gets configured</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">NVIDIA drivers + CUDA</span>
      <span class="bz-arch-chip">Container runtime</span>
      <span class="bz-arch-chip">Model servers</span>
      <span class="bz-arch-chip-note">Triton, vLLM, TGI, Ollama</span>
    </div>
  </div>
</div>

## The core ideas

- **Agentless push.** The control node connects out and pushes modules. Managed nodes need only Python (Linux) or PowerShell (Windows), no agent and no open inbound port. This differs from Puppet and Chef, which run a persistent agent on each node that pulls its config from a master on a schedule.
- **Inventory.** A list of hosts, grouped logically such as `gpu_nodes` or `k8s_workers`. Static inventory is a file; dynamic inventory is generated at runtime by querying a cloud provider or Kubernetes, which keeps the host list current for fleets that change.
- **Playbooks, plays, tasks, modules.** A playbook is YAML. A play maps a group of hosts to a list of tasks. Each task calls a module (the unit of work, such as `apt` or `systemd`) that models a desired state.
- **Idempotency.** Modules check current state and change only what differs from what you declared. Re-running a satisfied playbook changes nothing, which makes Ansible safe to run repeatedly and useful for correcting drift.
- **Roles and collections.** Roles package reusable automation in a standard directory layout. Collections bundle modules, roles, and plugins under a namespace, shared through Ansible Galaxy.

## Ansible for AI infrastructure

This is where Ansible earns its place in an AI stack. After machines exist, Ansible makes them ready to train and serve models:

- **GPU node preparation.** Install and pin NVIDIA drivers, configure persistence mode, and reboot a fleet in a controlled order. NVIDIA maintains an official driver role.
- **Container GPU runtime.** Install Docker or containerd plus the NVIDIA Container Toolkit and run `nvidia-ctk runtime configure`, so containers can reach the GPUs.
- **Cluster configuration.** Configure Kubernetes worker nodes (via the `kubernetes.core` collection) or Slurm HPC clusters for scheduled training jobs.
- **Inference server deployment.** Deploy and configure serving stacks such as [vLLM](/tools/vllm/), Triton, TGI, or [Ollama](/tools/ollama/), template their config, pull model weights, and open the right ports.
- **Hybrid fleet consistency.** Enforce the same driver, CUDA, and toolkit versions across bare metal, colocation, edge, and cloud GPU hosts, and correct drift.

**Ansible and Terraform are complementary, not rivals.** [Terraform](/tools/terraform/) provisions infrastructure and is stateful: it creates, changes, and destroys cloud resources, tracking them in a state file. Ansible configures what runs on that infrastructure and is largely stateless, relying on idempotency instead. The standard pattern for AI infra: Terraform stands up the GPU cluster and networking, then Ansible installs the drivers, runtime, and model server.

## Installing Ansible

The `ansible` community package bundles the `ansible-core` engine plus a large set of curated collections. Install `ansible-core` alone for the minimal engine.

```bash
# Full community package (recommended for most users)
python3 -m pip install --user ansible

# Minimal engine only
python3 -m pip install --user ansible-core
```

Managed nodes need only a compatible Python, not Ansible itself. The control node cannot run on Windows.

## A real playbook: make GPU hosts inference-ready

This playbook installs the NVIDIA driver, Docker, and the NVIDIA Container Toolkit across a group of GPU hosts, then wires the Docker runtime to the GPUs. It is idempotent and safe to re-run.

```yaml
---
- name: Prepare GPU hosts for containerized inference
  hosts: gpu_nodes
  become: true
  tasks:
    - name: Install the NVIDIA driver via the official role
      ansible.builtin.include_role:
        name: nvidia.nvidia_driver
      vars:
        nvidia_driver_branch: "550"
        nvidia_driver_persistence_mode_on: true

    - name: Install Docker and prerequisites
      ansible.builtin.apt:
        name: [docker.io, curl, gnupg]
        state: present
        update_cache: true

    - name: Install the NVIDIA Container Toolkit
      ansible.builtin.apt:
        name: nvidia-container-toolkit
        state: present
        update_cache: true

    - name: Configure Docker to use the NVIDIA runtime
      ansible.builtin.command: nvidia-ctk runtime configure --runtime=docker
      register: ctk
      changed_when: "'runtime' in ctk.stdout"
      notify: Restart Docker

    - name: Verify GPUs are visible
      ansible.builtin.command: nvidia-smi
      changed_when: false

  handlers:
    - name: Restart Docker
      ansible.builtin.systemd:
        name: docker
        state: restarted
```

Pin the driver branch and toolkit version to what your CUDA target requires. The official `nvidia.nvidia_driver` role installs the driver only, so CUDA and the container toolkit are separate steps, as shown.

## Inventory and an ad-hoc command

An inventory file groups your hosts. Ad-hoc commands run a single module across a group without writing a playbook, handy for a quick fleet-wide check.

```ini
# inventory.ini
[gpu_nodes]
gpu01 ansible_host=10.0.4.11
gpu02 ansible_host=10.0.4.12

[all:vars]
ansible_user=ubuntu
ansible_ssh_private_key_file=~/.ssh/gpu_fleet.pem
```

```bash
# Check GPU utilisation across the whole fleet at once
ansible gpu_nodes -i inventory.ini -m ansible.builtin.command \
  -a "nvidia-smi --query-gpu=utilization.gpu,memory.used --format=csv"
```

## How a change reaches the fleet

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 1</span>
    <span class="bz-flow-step-name">Declare</span>
    <span class="bz-flow-step-desc">Write the desired state as tasks in a playbook.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 2</span>
    <span class="bz-flow-step-name">Target</span>
    <span class="bz-flow-step-desc">Select host groups from inventory, static or dynamic.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 3</span>
    <span class="bz-flow-step-name">Push</span>
    <span class="bz-flow-step-desc">Ansible connects over SSH and runs modules on each node.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 4</span>
    <span class="bz-flow-step-name">Converge</span>
    <span class="bz-flow-step-desc">Idempotent modules change only what differs, then report.</span>
  </div>
</div>

For enterprise scale, Red Hat Ansible Automation Platform (AAP) adds a web controller, role-based access, and distributed execution. AAP 2.6 reached general availability in October 2025 with a self-service portal and expanded Event-Driven Ansible, where rulebooks listen to monitoring alerts or webhooks and trigger remediation automatically. Ansible Lightspeed, the generative-AI assistant that turns natural language into Ansible tasks, added support for bringing your own model provider through 2025.

## How it compares

| | Ansible | [Terraform](/tools/terraform/) | Puppet / Chef | Kubernetes-native |
|---|---|---|---|---|
| **Paradigm** | Config and deploy | Infra provisioning | Config management | Workload orchestration |
| **Model** | Push, on demand | Declarative provisioning | Pull, scheduled | Reconciliation loop |
| **Agent** | Agentless (SSH) | Agentless (cloud APIs) | Agent per node | In-cluster controllers |
| **State** | Stateless, idempotent | Stateful (state file) | Stateful | Cluster is the state |
| **Best for** | Configuring GPU hosts, app deploy | Standing up cloud infra | Continuous compliance at scale | Containers inside a cluster |

## When not to use Ansible

- **Full cloud-resource lifecycle.** Ansible lacks a state file, so it does not track create, change, and destroy the way Terraform does. Use Terraform to provision, Ansible to configure.
- **Real-time orchestration.** For continuous scheduling, self-healing, and autoscaling of containers, Kubernetes is the right layer. Ansible triggers and configures; it does not run a reconciliation loop.
- **Thousands of nodes without tuning.** The push model is bound by the control node's SSH concurrency. Very large fleets need tuning or AAP execution nodes.
- **Constant drift enforcement.** Without an agent, Ansible corrects drift only when a playbook runs. For continuous auto-remediation, an agent-based tool or Event-Driven Ansible fits better.
- **Heavy branching logic.** Large playbooks with deep Jinja2 templating and conditionals become hard to read and test. Logic-heavy automation strains a YAML-first tool.

## Further reading

- [Ansible documentation](https://docs.ansible.com/): official installation and playbook guides.
- [Red Hat Ansible Automation Platform](https://www.redhat.com/en/technologies/management/ansible): the enterprise product and Event-Driven Ansible.
- [Ansible vs Terraform (Red Hat)](https://www.redhat.com/en/topics/automation/ansible-vs-terraform): why the two are complementary.
- [Terraform](/tools/terraform/): the provisioning half of the pair.
- [Infrastructure as code](/glossary/infrastructure-as-code/): the practice Ansible fits into.
- [Infrastructure as code for AI](/guides/infrastructure-as-code-ai/): applying these tools to AI systems.
- [Scaling AI infrastructure](/guides/scaling-ai-infrastructure/): where fleet automation becomes essential.

## Sources

- Ansible community documentation. https://docs.ansible.com/
- Ansible installation guide (pip, core vs community). https://docs.ansible.com/projects/ansible/latest/installation_guide/intro_installation.html
- Red Hat. Ansible vs Terraform. https://www.redhat.com/en/topics/automation/ansible-vs-terraform
- Red Hat Developer. What's new in Ansible Automation Platform 2.6 (2025). https://developers.redhat.com/articles/2025/10/08/whats-new-ansible-automation-platform-2-6
- NVIDIA. Official Ansible driver role. https://github.com/NVIDIA/ansible-role-nvidia-driver
