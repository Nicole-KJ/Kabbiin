# Kabbiin Application Documentation

Welcome to the **Kabbiin** codebase documentation. This document is designed to provide coworkers and developers with a comprehensive understanding of the project's current structure, architecture, files, and functional modules.

---

## 📋 Table of Contents
1. [Overview & Tech Stack](#-overview--tech-stack)
2. [Project Folder Structure](#-project-folder-structure)
3. [Folder & File Breakdown](#-folder--file-breakdown)
   - [Root Folder Configurations](#root-folder-configurations)
   - [Source Folder (src)](#source-folder-src)
   - [Application Source (src/app)](#application-source-srcapp)
4. [Current Functionalities](#-current-functionalities)
5. [Architectural Nuances & Mismatches](#-architectural-nuances--mismatches)

---

## 🛠️ Overview & Tech Stack

**Kabbiin** is a lodging and cabin management platform designed to streamline cabin rentals, bookings, task tracking, and financial insights.

### Tech Stack:
- **Framework:** Angular v21 (utilizing Standalone components, Signals, and modern SSR features).
- **Styling:** Vanilla CSS & Tailwind CSS for custom components.
- **Calendar & Timeline:** FullCalendar v6 (Scheduler, DayGrid, Interaction, Resource, and Resource-Timeline plugins).
- **Server Platform:** Node.js (with Express for Angular Server-Side Rendering (SSR) support).

---

## 📁 Project Folder Structure

The project directory structure is laid out as follows:

```text
kabbiin-app/
├── .vscode/               # VS Code IDE configurations
├── public/                # Static public assets (logos, favicons)
└── src/                   # Core application source code
    ├── app/               # Angular application modules
    │   ├── core/          # Services, models, and shared utilities
    │   │   ├── models/    # Data interfaces & models
    │   │   └── services/  # Singleton business logic services
    │   ├── features/      # Main page view components
    │   │   ├── cabins/    # Cabin management modules ("Mis Cabinas")
    │   │   └── dashboard/ # Dashboard metrics & timeline calendar views
    │   ├── layout/        # Modular framing (Header, Sidebar, Main Layout)
    │   └── ...            # Angular configurations (routes, specs, components)
    ├── assets/            # Secondary public asset files
    └── ...
```

---

## 🗃️ Folder & File Breakdown

### Root Folder Configurations

| File / Folder | Purpose |
| :--- | :--- |
| **`.editorconfig`** | Configures code editor formatting settings (indentations, spaces, line endings) for developer consistency. |
| **`.gitignore`** | Declares folders/files to exclude from version control (e.g., `node_modules`, build output folders). |
| **`.vscode/`** | Contains developer environment settings for Visual Studio Code (`launch.json`, `tasks.json`, and extension recommendations). |
| **`angular.json`** | Angular CLI configuration file outlining build options, asset paths, and styles settings. |
| **`package.json`** & **`package-lock.json`** | Manages dependency libraries, metadata, and build scripts (`npm start`, `npm run build`, etc.). |
| **`tailwind.config.js`** | Configurations and content paths for Tailwind CSS utility generation. |
| **`tsconfig.json`**, `tsconfig.app.json`, `tsconfig.spec.json` | TypeScript configurations defining compiler rules and path mappings. |
| **`public/`** | Holds public assets served directly to the root (e.g., `favicon.ico` and `logo.png`). |
| **`README.md`** | Quickstart developer guide for installing dependencies, running local servers, and compiling code. |

---

### Source Folder (`src`)

| File / Folder | Purpose |
| :--- | :--- |
| **`assets/`** | Standard directory for static images and assets referenced in templates. |
| **`index.html`** | Single Page Application HTML shell. Defines the `<app-root>` tag. |
| **`main.ts`** | The client-side entry point that bootstraps the Angular application. |
| **`main.server.ts`** | Entry point for server-side rendering (SSR) bootstrapping. |
| **`server.ts`** | Express web server config to render the Angular application dynamically on the server side (SSR). |
| **`styles.css`** | Global stylesheets. Contains scrollbar resets, typography configurations, and general layout rules. |

---

### Application Source (`src/app`)

#### 1. Core Abstractions (`src/app/core`)

This directory houses cross-cutting components and shared states.

##### **Models (`core/models/`)**
- **`reservation.model.ts`**: Defines the data model for bookings (`Reservation` interface). Captures fields such as `id`, `cabinId`, `title` (guest name), `start`/`end` dates, booking `source` (airbnb, booking, direct, expedia), `status`, pricing, and guest capacity.
- **`user.model.ts`**: Defines the user structure (`User` interface), storing profile identifiers (`uid`), full names (`nombreCompleto`), role tags (`Admin`, `Propietario`, `Mantenimiento`), status flags, and registration dates.

##### **Services (`core/services/`)**
- **`auth.service.ts`**: Handles authentication states. Currently loads a simulated mock administrator user (`Esteban Admin`) on startup, and exposes helper functions like `isAuthenticated()` and `logout()`.
- **`calendar.service.ts`**: Acts as a state channel for calendar notifications. Exposes an `openModal$` RxJS Subject/Observable to trigger the creation modal from separate UI panels (like the sidebar). It also fetches cabin metadata lists via `getCabins()`.
- **`layout.service.ts`**: Controls layout properties (like responsive sidebar states) utilizing **Angular Signals** for reactive toggling (`isSidebarOpen` signal).

---

#### 2. Feature Views (`src/app/features`)

This directory contains functional pages loaded within the workspace shell.

##### **Cabin Management (`features/cabins/`)**
- **`cabins.component.ts`**: Displays the "Mis Cabañas" dashboard. Renders a card grid of all cabins (Mocked items: Familiar, Parejas, Deluxe, Estándar, Económica) containing WiFi availability flags, capacity counts (pax), status indicators (Active vs Maintenance), and daily base rates.

##### **Business Dashboard & Planner (`features/dashboard/`)**
- **`dashboard.component.ts` / `.html` / `.css`**: The central metrics screen featuring:
  - **KPIs**: Monthly income summaries, total active reservations, occupancy rates, and daily check-in indicators.
  - **Task Lists**: Displays pending chores (e.g., repairing leaks) labeled by priority.
  - **Inbox & Activity Logs**: Renders real-time messages and chronological logs.
  - **Check-ins Grid**: Detailed list of upcoming guests, their cabin, platform sources, and date ranges.
- **Calendar Timeline (`features/dashboard/calendar/`)**:
  - **`calendar.component.ts` / `.html` / `.scss`**: Features a timeline visualization using FullCalendar.
    - **Timeline Axis**: Shows cabins on the vertical axis (Y) and calendar dates (Year, Month, or Week views) on the horizontal axis (X).
    - **Hover Tooltips**: Provides detailed information on hover (guest name, dates, nights, price, EV charger requirements, payment type).
    - **Modal Overlay**: Supports editing/saving existing bookings, deleting events, and calculating total cost predictions dynamically (`nights * baseRate`).

---

#### 3. Modular Layout Components (`src/app/layout`)

Although layout features are currently coded inline in the main shell (`app.component.ts`), this directory exists for modular structure:

- **`header/`**: Holds custom header elements.
- **`sidebar/`**: Configures the navigation panel, loaded with material design icons and routing paths.
- **`main-layout/`**: Setup with an Angular Material Sidenav container to enable desktop side panels and responsive mobile views.

---

## ⚡ Current Functionalities

1. **Simulated Authentication State**: Automatically registers a mock owner profile (`Esteban Admin`) to simulate app settings and role privileges.
2. **Dynamic KPI Metrics**: Renders income trends, total active orders, occupancy rates, and visual guest checklist stacks on the Dashboard.
3. **Task & Chores Board**: Supports list checks for operations with High, Medium, or Low priority tags.
4. **Activity Logs & Messages Tracker**: Aggregates recent platform events (e.g., booking creations, message alerts) in lists.
5. **Upcoming Check-ins Table**: Summarizes guest data, showing specific cabin assignments, booking channels (Airbnb, Booking.com, Direct), and check-in schedules.
6. **Timeline Reservation Calendar**: Renders a scheduler layout to visually plan occupancy across cabins:
   - Double-click or click to open/edit.
   - Live estimated cost calculator.
   - Option to delete reservations.
   - Tooltip details on hover.
7. **Cabin Grid Directory**: Evaluates cabin capacities, amenities (Wi-Fi), and operational status (e.g., under maintenance).

---

## ⚠️ Architectural Nuances & Mismatches

> [!IMPORTANT]
> **Manual View Switching vs. Router Configuration**
> 
> The project contains two different routing patterns. It is crucial to understand how they differ to avoid bugs when adding new features:
> 
> 1. **The Routing Config (`app.routes.ts`)**: Defines paths (`/dashboard`, `/calendario`) loading inside a nested `<router-outlet>` in the `MainLayoutComponent`.
> 2. **The Actual Implementation (`app.component.ts`)**: Currently, the application root bypasses the router layout entirely. Instead, `AppComponent` defines a manual sidebar inside its main template and renders components conditionally using `*ngIf` checks on the `currentView` property (e.g., `*ngIf="currentView === 'Calendario'"`).
> 
> If you decide to transition fully to Angular Router, you must replace the view-switching logic in `app.component.ts` with a single `<router-outlet>` and wire up the sidebar buttons to use `routerLink`.
