---
title: "Physical AI"
description: "Physical AI is AI that lets machines such as robots and autonomous vehicles perceive, understand and act in the physical world. What the term covers, what makes it harder than software-only AI, and how it relates to world models."
date: 2026-10-28
categories: [Glossary]
tags: [physical-ai, robotics, autonomous-vehicles, world-models, embodied-ai, simulation]
related:
  - /glossary/world-model
  - /glossary/diffusion-models
  - /tools/nvidia-ai
last_updated: 2026-10-28
last_verified: 2026-10-28
---

Physical AI is the term for AI systems that act in the real world through a body: a robot, a vehicle, a machine on a factory floor. NVIDIA, which uses the term most prominently, defines it in its glossary this way: "Physical AI enables autonomous machines, such as robots in factories and robotaxis, to perceive, understand, and perform complex actions in the physical world." The older academic term for much the same idea is embodied AI.

## What it covers

NVIDIA's glossary groups three areas under the term:

- **Robotics**: warehouse robots that navigate around obstacles and people, robot arms that adjust their grip, surgical robots and humanoid robots.
- **Autonomous vehicles and robotaxis**: systems that turn sensor data into driving decisions.
- **Industrial AI**: factories and warehouses that combine robots, cameras, sensors and AI agents.

## Why it is harder than software-only AI

A language model that makes a mistake produces a wrong answer. A physical system that makes a mistake can damage equipment or hurt someone, and it cannot be rolled back. Three consequences follow:

- **Training data is scarce.** There is no internet-scale corpus of robot actions. Much physical AI is therefore trained in simulation, which is where [world models](/glossary/world-model/) come in: models that generate realistic, interactive environments in which a robot can practise.
- **Latency is a safety property.** Perception and control loops have to run in milliseconds, often on the device rather than in a data centre.
- **Testing has to cover the real world.** A model that works in simulation still has to be validated against conditions the simulation did not include.

## Reading the label

The term is used for humanoid robots, robotics foundation models, and the chips and simulation software sold to build them. Check what a product actually does: a chatbot on a robot's screen is not physical AI, and a vendor that uses the term may be selling the simulation tooling rather than the robot.

## Sources

- NVIDIA, "What is Physical AI?", NVIDIA Glossary (undated, fetched 28 October 2026): https://www.nvidia.com/en-us/glossary/generative-physical-ai/

## Further reading

- [World model](/glossary/world-model/): simulation as the training ground for physical AI
- [NVIDIA AI](/tools/nvidia-ai/): the hardware and software stack most often sold under this label
