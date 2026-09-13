# Portfolio V3 — System Architecture

**Document Version:** 1.0  
**Project:** Portfolio V3 — Ryan Winata  
**Status:** Active Development  
**Owner:** Ryan Winata  
**Last Updated:** September 2026

---

# 1. Architecture Overview

Portfolio V3 is a static personal portfolio website built using:

- HTML5
- CSS3
- Vanilla JavaScript
- JSON-based content data
- Git
- GitHub

The architecture follows a lightweight, modular, and maintainable
structure.

The project does not currently require a backend server, database server,
authentication system, or front-end framework.

The architecture prioritizes:

- Simplicity
- Maintainability
- Separation of concerns
- Reusability
- Performance
- Accessibility
- Responsive design
- Easy content updates

---

# 2. High-Level Architecture

The application follows the following structure:

```text
User
 │
 ▼
HTML Structure
 │
 ├── Navigation
 ├── Hero
 ├── About
 ├── Experience
 ├── Projects
 ├── Research
 ├── Certifications
 └── Contact
 │
 ▼
CSS Presentation Layer
 │
 ├── Design Tokens
 ├── Layout
 ├── Components
 ├── Section Styles
 └── Responsive Styles
 │
 ▼
JavaScript Behavior Layer
 │
 ├── Application Initialization
 ├── Navigation Behavior
 └── Theme / UI Interactions
 │
 ▼
JSON Data Layer
 │
 ├── Profile
 ├── Experience
 ├── Projects
 └── Certifications