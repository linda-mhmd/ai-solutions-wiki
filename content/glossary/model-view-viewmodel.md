---
title: "MVVM - Model-View-ViewModel"
description: "An architectural pattern that uses data binding to connect the View to a ViewModel, enabling separation of UI from business logic."
date: 2026-03-28
categories: [Glossary]
tags: [MVVM, architecture-patterns, software-design, UI, data-binding]
last_updated: 2026-05-30
---

Model-View-ViewModel (MVVM) is an architectural pattern that separates the graphical user interface from business logic by introducing a ViewModel layer that exposes data and commands the View can bind to declaratively. The View has no direct knowledge of the Model, and the ViewModel has no direct knowledge of the View.

## Origins and History

MVVM was introduced by John Gossman at Microsoft in 2005, originally described in his blog post as the pattern underlying Windows Presentation Foundation (WPF) and Silverlight development. The pattern evolved from Martin Fowler's Presentation Model pattern (2004) and was designed to take full advantage of WPF's powerful data binding system. Gossman recognized that WPF's binding infrastructure made it possible to eliminate virtually all code-behind in Views, enabling a clean separation between UI designers (working in XAML) and developers (working on ViewModels in C#). MVVM has since been adopted far beyond the Microsoft ecosystem, becoming the standard pattern in modern front-end frameworks including Angular (2010+), Vue.js (2014), and SwiftUI (2019), as well as Android's Jetpack Architecture Components.

## How It Works

The **Model** represents the domain data and business logic, identical to MVC's Model. The **View** is the visual layout and UI elements, defined declaratively (XAML, HTML templates, SwiftUI views). The View binds to properties and commands exposed by the ViewModel. The **ViewModel** acts as an abstraction of the View, exposing data properties and command objects that the View binds to. When the Model changes, the ViewModel updates its properties; the data binding framework automatically reflects these changes in the View. User actions in the View trigger commands on the ViewModel, which updates the Model. The ViewModel never references the View directly, enabling complete testability without a running UI.

## Practical Applications

MVVM is the standard pattern in WPF and .NET MAUI desktop applications, Angular and Vue.js single-page applications, SwiftUI iOS applications, and Android Jetpack Compose applications. Its primary advantage is testability: ViewModels can be fully unit-tested without UI frameworks or visual rendering.

## Sources

1. Gossman, J. (2005). "Introduction to Model/View/ViewModel pattern for building WPF apps." Microsoft Blog.
2. Fowler, M. (2004). "Presentation Model." [https://martinfowler.com/eaDev/PresentationModel.html](https://martinfowler.com/eaDev/PresentationModel.html)
3. Smith, J. (2009). "WPF Apps With The Model-View-ViewModel Design Pattern." *MSDN Magazine*, February 2009.
