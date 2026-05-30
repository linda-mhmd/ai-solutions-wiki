---
title: "MVC - Model-View-Controller"
description: "An architectural pattern that separates application concerns into model (data), view (presentation), and controller (input handling)."
date: 2026-03-28
categories: [Glossary]
tags: [MVC, architecture-patterns, software-design, UI, separation-of-concerns]
last_updated: 2026-05-30
---

Model-View-Controller (MVC) is an architectural pattern that divides an application into three interconnected components: the Model (data and business logic), the View (user interface presentation), and the Controller (input handling and coordination). This separation enables independent development, testing, and modification of each concern.

## Origins and History

MVC was conceived by Trygve Reenskaug while visiting the Xerox Palo Alto Research Center (PARC) in 1978-1979. Reenskaug developed the pattern while working on Smalltalk-76 and Smalltalk-80 to address the challenge of letting users interact with large, complex data sets through graphical interfaces. His original description used the terms "Thing-Model-View-Editor" before settling on Model-View-Controller. The pattern was implemented in the Smalltalk-80 class library and documented by Steve Burbeck and others. MVC gained massive adoption in web development with frameworks such as Ruby on Rails (2004), ASP.NET MVC (2009), and Spring MVC, which adapted the pattern for the HTTP request-response cycle. The pattern also influenced numerous derivative patterns including MVP (Model-View-Presenter) and MVVM (Model-View-ViewModel).

## How It Works

The **Model** represents the application's data, business rules, and state. It is independent of the user interface and notifies observers (Views) when its state changes. The **View** renders the Model's data for the user and sends user actions to the Controller. A single Model can have multiple Views. The **Controller** receives user input from the View, interprets it, and updates the Model or selects a different View accordingly. In web MVC frameworks, the Controller typically maps to a request handler, the Model to domain objects and services, and the View to a template or rendered response.

## Practical Applications

MVC is the dominant pattern in web application frameworks (Rails, Django, Laravel, Spring MVC, ASP.NET MVC). It enables parallel development (front-end and back-end teams work independently), facilitates unit testing (Models can be tested without UI), and supports multiple presentation formats (web, mobile, API) from the same Model and Controller logic.

## Sources

1. Reenskaug, T. (1979). "Models - Views - Controllers." Xerox PARC technical note. [https://folk.universitetetioslo.no/trygver/themes/mvc/mvc-index.html](https://folk.universitetetioslo.no/trygver/themes/mvc/mvc-index.html)
2. Burbeck, S. (1992). "Applications Programming in Smalltalk-80: How to Use Model-View-Controller (MVC)." University of Illinois.
3. Gamma, E., Helm, R., Johnson, R., and Vlissides, J. (1994). *Design Patterns: Elements of Reusable Object-Oriented Software*. Addison-Wesley.
