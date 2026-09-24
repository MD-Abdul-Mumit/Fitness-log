# 🏋️‍♂️ FitLog — Workout Library & Routine Planner

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![DaisyUI](https://img.shields.io/badge/DaisyUI-Latest-5A0EF8?style=for-the-badge&logo=daisyui&logoColor=white)](https://daisyui.com/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

**FitLog** is a dark-mode, performance-focused gym companion and routine planning application. Athletes and fitness enthusiasts can browse exercises across major muscle groups, inspect mechanical specifications, structure and enforce a capped daily routine, save lifts for later sessions, and monitor real-time workout metrics.

---

## 🔗 Live Demo & API Endpoints

- **Live Application URL:** [https://your-project-name.vercel.app](https://your-project-name.vercel.app)
- **Workouts API Endpoint:** `https://api.abcz.workers.dev/api/fitlog`
- **Single Workout Endpoint:** `https://api.abcz.workers.dev/api/fitlog/:id`

---

## 🌟 Key Features

1. **Responsive Workout Library (3x4 Grid):**
   - Automatically loads exercises from the remote API in a clean, responsive layout.
   - Every card details muscle group badges (`CHEST`, `ARMS`), equipment specifications, duration, calorie burn estimations, and star ratings.

2. **Technical Two-Column Workout Details:**
   - Full-width exercise illustration paired with comprehensive technical specs (Equipment, Difficulty, Sets, Reps, Duration, Calories, Rating).
   - An ordered 4-step instruction sequence guiding proper posture, eccentric lowering, and lockout cues.

3. **Strict 5-Lift Daily Cap:**
   - Enforces a dedicated limit of five lifts for Today's Plan to keep training sessions focused.
   - Prevents duplicate entries and triggers alert toasts when limits are exceeded.

4. **Dynamic Metrics Summary Dashboard:**
   - Live dashboard row tracking **Exercises**, **Minutes**, and **Calories** starting at 0.
   - Updates instantly as workouts are scheduled, marked as completed, or removed.

5. **Routine Logging & Real-time Action Controls:**
   - Seamlessly toggle **Mark as Done** with visual strikethrough styling.
   - Includes quick removal controls with instant confirmation feedback across both **Today's Plan** and **Saved** lists.

6. **Multi-Criteria Real-Time Sorting:**
   - Interactive dropdown allowing users to sort their routines by **Duration**, **Calories**, or **Rating**.

7. **Zero-Lag Persistent Storage:**
   - Built on React's `useSyncExternalStore` for browser storage syncing that eliminates cascading renders and hydration mismatches.

---

## 🛠️ Technologies Used

| Layer          | Technology                                                                 | Purpose                                                                |
| :------------- | :------------------------------------------------------------------------- | :--------------------------------------------------------------------- |
| **Framework**  | [Next.js 15](https://nextjs.org/) (App Router)                             | Server-Side Rendering, Dynamic Routes, and Layout Management           |
| **Language**   | [TypeScript](https://www.typescriptlang.org/)                              | End-to-end interface typing and safe state contracts                   |
| **Styling**    | [Tailwind CSS](https://tailwindcss.com/) & [DaisyUI](https://daisyui.com/) | Dark gym aesthetic (`#0f0f0f`) with high-visibility accent (`#ccff00`) |
| **Icons**      | [Lucide React](https://lucide.dev/)                                        | Clean, lightweight SVG iconography                                     |
| **Feedback**   | [React-Toastify](https://fkhadra.github.io/react-toastify/)                | Interactive, floating notifications for plan actions                   |
| **State Sync** | `useSyncExternalStore`                                                     | Event-driven browser storage synchronization without cascading effects |

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
