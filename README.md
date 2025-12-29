# Dallas Discovery Planner

Dallas Discovery Planner is a **React + TypeScript** single-page application that helps users explore the best activities, attractions, and neighborhoods in Dallas. Users can select a date range, browse curated experiences, and build the perfect trip based on their preferences.

This project focuses on clean UI, fast performance, and a smooth browsing experience even with many images.

---

## 🚀 Features

- **Interactive Date Range Picker**  
  Built using `react-day-picker` and `date-fns`, allowing users to define the duration of their trip.

- **Curated Activity Explorer**  
  A visually rich grid of attractions, restaurants, neighborhoods, and experiences in Dallas.

- **Smart Filtering**  
  Explore activities by category, neighborhood, and trip dates.

- **Performance Optimized**
  - `ActivityCard` memoized using `React.memo`.
  - Images use `loading="lazy"` and `decoding="async"`.

- **Fully Responsive UI**  
  Tailwind CSS ensures the interface looks great on mobile, tablet, and desktop.

- **Lightweight and Fast**  
  Built with **Vite** for instant dev server startup and optimized production builds.

---

## 🏗️ Architecture Overview

Dallas Discovery Planner is structured as a **client-side React SPA**, designed for easy static hosting and extensibility.

### Frontend Structure

- **React + TypeScript** for component-based architecture
- **Vite** for bundling and fast HMR
- **Tailwind CSS** as the styling framework
- **shadcn-style components** for consistent UI primitives
- **Lucide-react** for icons

### Core Components

- **`DateRangePicker`**  
  Wraps `react-day-picker` and uses `date-fns` to normalize and format dates. Exposes a typed `{ from, to }` model.

- **`ActivityCard`**  
  Displays a single activity with image, title, description, tags, and neighborhood.

- **Activity Grid / Results List**  
  Displays a curated dataset of activities filtered by user input.

### State Management

- Managed via React hooks (`useState`, `useMemo`)
- Source-of-truth state (dates, filters, activity list) is held at the App level
- Child components receive props and callbacks for controlled updates

### Data Layer

- Uses a **static structured dataset** (JSON or TypeScript objects)
- Filtering is done **in memory**, allowing static hosting
- Architecture supports future migration to a backend API

---

## 📦 Tech Stack

| Category | Tools |
|---------|-------|
| Framework | React + TypeScript |
| Build Tool | Vite |
| Styling | Tailwind CSS |
| UI Components | shadcn-style components, Lucide-react |
| Date Handling | react-day-picker, date-fns |
| State | React Hooks |
| Package Manager | npm / bun |

---

## 🛠️ Installation & Setup

### 1. Clone the Repo
```bash
git clone https://github.com/Tomigames/dallas-discovery-planner.git
cd dallas-discovery-planner
