<div align="center">

# 🏋️‍♂️ FITLOG
### *Train With Intent. Log Every Set.*

A high-performance, dark-mode gym companion and workout planning web application built with **Next.js 15 (App Router)**, **TypeScript**, and **Tailwind CSS**.

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-087ea4?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178c6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![DaisyUI](https://img.shields.io/badge/DaisyUI-Latest-5A0EF8?style=for-the-badge&logo=daisyui&logoColor=white)](https://daisyui.com/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

<br/>

<p align="center">
  <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop" width="100%" alt="FitLog Hero Preview" style="border-radius: 16px; border: 1px solid rgba(255,255,255,0.1); box-shadow: 0 20px 50px rgba(0,0,0,0.6);" />
</p>

<div align="center">

[**Live Demo Deployment »**](https://fitness-59k1xaqde-md-abdul-mumit-hossain.vercel.app) · [**GitHub Source Code »**](https://github.com/MD-Abdul-Mumit/Fitness-log) · [**Report Issue »**](https://github.com/MD-Abdul-Mumit/Fitness-log/issues)

</div>

<br/>

---

## 📖 Overview

**FitLog** is an athlete-focused workout management engine engineered to eliminate gym-floor guesswork. Athletes can browse a comprehensive library covering major muscle groups, inspect mechanical specifications, structure and enforce a capped daily routine, save lifts for later sessions, and monitor real-time metabolic and volume metrics.

---

## 🖼️ Application Showcase

<table width="100%">
  <tr>
    <td width="50%" align="center">
      <b>3x4 Responsive Workout Library</b><br/><br/>
      <img src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=600&auto=format&fit=crop" alt="Workout Card Library" style="border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);" />
      <br/>
      <em>Real-time catalog displaying target muscle tags, duration, and caloric burn.</em>
    </td>
    <td width="50%" align="center">
      <b>Interactive Technical Details View</b><br/><br/>
      <img src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=600&auto=format&fit=crop" alt="Detailed Workout Spec" style="border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);" />
      <br/>
      <em>Two-column layout detailing sets, reps, equipment specs, and execution cues.</em>
    </td>
  </tr>
  <tr>
    <td width="50%" align="center">
      <b>Live Metrics & Daily Routine Planner</b><br/><br/>
      <img src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=600&auto=format&fit=crop" alt="My Plan Dashboard" style="border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);" />
      <br/>
      <em>Track total volume, completion status, and dynamic caloric totals.</em>
    </td>
    <td width="50%" align="center">
      <b>Saved Routines & Quick Access</b><br/><br/>
      <img src="https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=600&auto=format&fit=crop" alt="Saved Routines" style="border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);" />
      <br/>
      <em>Easily bookmark target exercises and organize training splits.</em>
    </td>
  </tr>
</table>

---

## ✨ Key Features

* **3x4 Responsive Workout Library:** Dynamically loads movement patterns covering every major muscle group with muscle badges, equipment requirements, duration, calorie burn estimations, and community star ratings.
* **Technical Two-Column Workout Breakdown:** Dedicated dynamic routes presenting full-scale visual guides alongside equipment, difficulty, set/rep ranges, and a step-by-step 4-stage instruction sequence.
* **Intelligent 5-Lift Daily Cap:** Strictly limits single-day routines to five lifts to encourage progressive overload while preventing training burnout.
* **Live Metrics Aggregate Dashboard:** Real-time telemetry tracking **Exercises**, **Minutes**, and **Calories** starting at `0` on clean schedules and recalibrating dynamically.
* **Interactive Completion & Routine Logging:** Single-click **Mark as Done** completion states with strikethrough styling and one-touch removal controls.
* **Multi-Criteria Real-Time Sorting:** Sort active workouts or saved logs by **Duration**, **Calories Burned**, or **Community Rating**.
* **Zero-Lag Persistent Storage:** Utilizes React's `useSyncExternalStore` for browser storage syncing that eliminates cascading renders and hydration mismatches.

---

## 🛠️ Technology Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Framework** | [Next.js 15](https://nextjs.org/) (App Router) | Server-Side Rendering, Parallel Route Resolution, Layout Cache |
| **UI Library** | [React 19](https://react.dev/) | Component Lifecycle, Server Actions & Context Management |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) | End-to-End Type Safety & Data Contract Enforcement |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) & [DaisyUI](https://daisyui.com/) | Dark Gym Theme (`#0f0f0f`) with Neon Green Accents (`#ccff00`) |
| **Icons** | [Lucide React](https://lucide.dev/) | Clean, High-Contrast SVG Iconography |
| **Notifications**| [React-Toastify](https://fkhadra.github.io/react-toastify/) | Non-Blocking Toast Alerts for Daily Limits and Saved Items |
| **State Sync** | `useSyncExternalStore` | Real-Time `localStorage` Subscription Without Re-Render Loops |

---

## 🔗 API Reference

The project connects to the following REST endpoints:

```http
# Fetch complete workout catalog
GET [https://api.abcz.workers.dev/api/fitlog](https://api.abcz.workers.dev/api/fitlog)

# Fetch specific workout details
GET [https://api.abcz.workers.dev/api/fitlog/:id](https://api.abcz.workers.dev/api/fitlog/:id)

---

## 📁 Project Structure

```text
fit-log/
├── public/
│   └── workouts.json              # Local fallback dataset
├── src/
│   ├── app/
│   │   ├── book/[bookId]/
│   │   │   └── page.tsx           # Two-column lift detail page
│   │   ├── my-plan/
│   │   │   └── page.tsx           # Dashboard, tabs, live metrics, and sorting
│   │   ├── globals.css            # Dark mode styles & smooth scrolling
│   │   ├── layout.tsx             # Root layout with Provider & Toast container
│   │   ├── not-found.tsx          # Custom 404 error page
│   │   └── page.tsx               # Hero banner and 3x4 exercise library
│   ├── assets/
│   │   ├── logo.png               # Official emblem
│   │   └── banner.png             # Hero visual
│   ├── components/
│   │   └── shared/
│   │       ├── BookCard.tsx       # Standardized exercise card
│   │       ├── Footer.tsx         # Dark brand footer
│   │       └── Navbar.tsx         # Responsive header with plan & saved counter badges
│   ├── context/
│   │   └── WorkoutContext.tsx     # Synchronized store with 5-lift cap guard
│   └── types/
│       └── book.ts                # TypeScript interfaces and sorting types
├── .env.example                   # Public environment variable template
├── next.config.ts                 # External image proxy configuration
├── tailwind.config.js             # Color palette & DaisyUI theme settings
└── tsconfig.json                  # Strict TypeScript compiler options
```
