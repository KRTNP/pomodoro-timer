# Focus Timer: Productivity & Workflow Management

A modern, responsive web application designed to enhance personal productivity through the Pomodoro Technique. This project demonstrates a clean, component-driven architecture using React and Vite, focusing on performance and maintainable state logic.

## Overview

This application provides a distraction-free interface for managing work sessions and breaks. Unlike standard timer implementations, it leverages a custom React Hook (`usePomodoro`) to encapsulate timer logic, state transitions, and audio feedback, ensuring the UI layer remains purely presentational.

**Key Design Principles:**
* **Separation of Concerns:** Business logic is isolated in custom hooks, making the codebase testable and reusable.
* **Performance First:** Built with Vite for instant server start and optimized production builds.
* **Utility-First Styling:** Utilizes Tailwind CSS for a highly responsive and maintainable design system without style bloat.

## Technical Architecture

The project is structured to demonstrate scalable frontend patterns:

1.  **Custom Hooks (`src/hooks/usePomodoro.js`):**
    * Manages the internal timer state (tick mechanism, duration switching).
    * Handles mode transitions (Focus, Short Break, Long Break).
    * Exposes a clean API (`timeLeft`, `isRunning`, `toggleTimer`, `resetTimer`) to consuming components.

2.  **Component Composition:**
    * `TimerDisplay`: Pure component responsible for rendering the digital clock face.
    * `ModePills`: Handles user interaction for session type switching.
    * `StatCard`: Visualizes session metrics.

## Technology Stack

**Frontend Framework**
![React](https://img.shields.io/badge/-React-61DAFB?style=flat&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/-Vite-646CFF?style=flat&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/-Tailwind_CSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white)

**Language & Quality**
![JavaScript](https://img.shields.io/badge/-JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![ESLint](https://img.shields.io/badge/-ESLint-4B32C3?style=flat&logo=eslint&logoColor=white)

## Getting Started

### Prerequisites
* Node.js (v16 or higher)
* npm or yarn

### Installation

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/yourusername/pomodoro-focus-timer.git](https://github.com/yourusername/pomodoro-focus-timer.git)
    cd pomodoro-focus-timer
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Run Development Server**
    ```bash
    npm run dev
    ```
    Access the application at `http://localhost:5173`.

### Building for Production

To create an optimized static build:
```bash
npm run build

```

The artifacts will be generated in the `dist/` directory, ready for deployment to Vercel, Netlify, or AWS S3.

## Logic Implementation

The core timer logic avoids drift by calculating delta time or using robust interval management within the React lifecycle:

```javascript
// Conceptual logic inside usePomodoro hook
useEffect(() => {
  let interval = null;
  if (isActive && seconds > 0) {
    interval = setInterval(() => {
      setSeconds(seconds => seconds - 1);
    }, 1000);
  } else if (seconds === 0) {
    clearInterval(interval);
    setIsActive(false);
  }
  return () => clearInterval(interval);
}, [isActive, seconds]);

```
