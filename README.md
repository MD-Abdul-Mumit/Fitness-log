# 🏋️‍♂️ FitLog — Workout Library & Gym Companion

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![DaisyUI](https://img.shields.io/badge/DaisyUI-Latest-5A0EF8?style=for-the-badge&logo=daisyui&logoColor=white)](https://daisyui.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

**FitLog** is a dark-mode, performance-first workout library and training companion designed to help lifters and athletes train with intent and log every set. Users can explore a comprehensive library of exercises covering all primary muscle groups, inspect detailed mechanics and specifications, schedule workouts into a capped daily training plan, save favorites for future sessions, and monitor real-time metabolic and volume metrics.

---

## 🌟 Key Features

1. **Curated Workout Library (3x4 Responsive Grid):**
   * Dynamically loads exercises via remote API endpoints (`https://api.abcz.workers.dev/api/fitlog`).
   * Displays muscle-group category tag badges (`CHEST`, `ARMS`, `LEGS`), primary equipment, duration, estimated caloric burn, and community ratings.

2. **Comprehensive Two-Column Exercise Showcase:**
   * Features high-resolution visual demonstrations alongside technical lifting breakdowns.
   * Standardized Key Specs dashboard displaying Equipment, Difficulty Level, Target Sets, Rep Ranges, Execution Duration, Estimated Calories, and Ratings.
   * Step-by-step instruction guides detailing initial setup, execution trajectory, and lockout cues.

3. **Intelligent Daily Training Cap (Enforced Max-5 Limit):**
   * Encourages focused workout sessions by enforcing an operational cap of five lifts for any single day.
   * Prevents accidental duplicates and notifies users with instant context-aware feedback toasts.

4. **Live Metrics Summary Engine:**
   * Real-time aggregate calculation engine that dynamically tallies **Total Exercises**, **Accumulated Minutes**, and **Total Burned Calories** starting at zero on a pristine plan.
   * Computes adjustments instantly as movements are logged, marked complete, or cleared.

5. **Interactive Execution Tracking & Persistence:**
   * Complete routine management with **Mark as Done** completion toggling (visual strikethrough state) and single-click removal.
   * Segregated navigation tabs between active sessions (**Today's Plan**) and bookmarked routines (**Saved Workouts**).
   * Fully hydrated browser storage via `useSyncExternalStore` ensuring continuous state persistence across device reloads without hydration discrepancies.

6. **Multi-Criteria Real-Time Sorting:**
   * Flexible sorting dropdown allowing instant reorganization of current training lists by **Duration**, **Calories Burned**, or **Community Rating**.

---

## 🛠️ Tech Stack & Architecture

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Framework** | [Next.js](https://nextjs.org/) (App Router) | Hybrid Server & Client Rendering, Nested Layouts, Dynamic Segment Routes |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | Strict end-to-end interface typing, eliminating runtime shape mismatches |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) & [DaisyUI](https://daisyui.com/) | Custom dark gym aesthetic (`#0f0f0f`), high-visibility accent (`#ccff00`) |
| **Icons** | [Lucide React](https://lucide.dev/) | Clean, accessible, lightweight vector iconography |
| **Notifications** | [React-Toastify](https://fkhadra.github.io/react-toastify/) | Non-blocking user interaction confirmations and limit alerts |
| **State Sync** | React `useSyncExternalStore` | Safe external subscription to LocalStorage avoiding cascading renders |

---

## 🔗 API Endpoints

* **All Workouts Catalog:**
  ```http
  GET [https://api.abcz.workers.dev/api/fitlog](https://api.abcz.workers.dev/api/fitlog)