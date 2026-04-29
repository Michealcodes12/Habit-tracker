# Habit Tracker PWA

A modern, mobile-first Progressive Web Application designed for tracking daily habits, built with Next.js, React, Tailwind CSS v4, and TypeScript. This application strictly adheres to rigorous functional requirements, including robust offline support, an intuitive design system, and full end-to-end test coverage.

## 🚀 How to Run the App

1. **Install Dependencies**
   Ensure you have Node.js installed, then install the required packages:
   ```bash
   npm install
   ```

2. **Start the Development Server**
   ```bash
   npm run dev
   ```
   The application will be available at [http://localhost:3000](http://localhost:3000).

3. **Build for Production**
   ```bash
   npm run build
   npm run start
   ```

## 🧪 How to Run the Tests

This project enforces strict test-driven development (TDD) principles with over 90% code coverage. Tests are split into Unit, Integration, and End-to-End (E2E) suites.

- **Run all tests:** `npm test`
- **Run Unit Tests (Vitest + Coverage):** `npm run test:unit`
- **Run Integration Tests (Vitest + Testing Library):** `npm run test:integration`
- **Run E2E Tests (Playwright):** `npm run test:e2e`

## 🏗️ Assumptions & Trade-offs

- **Local Storage over a Database**: The application uses `localStorage` exclusively to persist sessions and habit data. This tradeoff allows for rapid development, instant offline availability, and zero backend overhead, though it limits cross-device synchronization.
- **Service Worker Caching**: For PWA offline capabilities, a lightweight `sw.js` script with an aggressive GET request caching strategy is implemented. This favors a highly reliable offline app shell for tests and initial loads, at the tradeoff of requiring explicit cache busting for long-term dynamic content invalidation.
- **Date Handling**: All streak and calendar logic is built using native JavaScript `Date` and `Set` primitives rather than heavy libraries (like `date-fns` or `moment`). This drastically reduces the bundle size but requires stricter manual string parsing for `YYYY-MM-DD` compliance.
- **Font Implementation**: Material Icon fonts are imported natively via a `<link>` tag configured to bypass Next.js optimization lint warnings. This was a necessary tradeoff to prevent conflicts with Tailwind v4 `@import` mechanisms and ensure Icons render accurately in production.

## 🗺️ Mapping to Technical Requirements

- **Strict Routing**: Exactly matches the requested routes (`/`, `/login`, `/signup`, `/dashboard`) with programmatic redirection preventing unauthorized dashboard access and bypassing splash screens for authenticated users.
- **PWA & Offline Mode**: Implemented via a `sw.js` registration in the `RootLayout` that seamlessly serves the application shell even when disconnected from the network.
- **Streak Calculation System**: Implements the strict continuous backwards-counting logic exactly as requested. It correctly ignores future dates, handles "today" presence accurately, and aggressively breaks streaks missing a calendar day.
- **DOM Assertions**: All forms, inputs, and buttons expose the exact `data-testid` attributes required for the E2E suite to successfully mount and manipulate them.

## 📂 Test Files Location & Verification

The testing suite strictly maps to the required files and describe blocks to guarantee implementation correctness.

### Unit Tests (`tests/unit/`)
1. **`slug.test.ts`**
   - *Verifies*: The `getHabitSlug` utility accurately handles spaces, collapses internal gaps, enforces lowercase rules, and safely strips non-alphanumeric characters.
2. **`validators.test.ts`**
   - *Verifies*: The `validateHabitName` function enforces empty string prevention, catches string lengths exceeding 60 characters, and applies proper spacing trimmings.
3. **`streaks.test.ts`**
   - *Verifies*: The pure mathematical logic behind `calculateCurrentStreak`, handling empty states, ignoring duplicates, and ensuring proper 0-day resets.
4. **`habits.test.ts`**
   - *Verifies*: The immutability of `toggleHabitCompletion` when safely mutating completion date arrays without modifying the original object references.

### Integration Tests (`tests/integration/`)
1. **`auth-flow.test.tsx`**
   - *Verifies*: The complete React UI workflow for Signup and Login components. Asserts successful user creation, intercepts duplicate email signups with errors, handles invalid credentials, and triggers the Next.js `useRouter` redirects accurately.
2. **`habit-form.test.tsx`**
   - *Verifies*: High-level DOM integration of the Dashboard and Habit Forms. Ensures empty form rejections, simulates habit creations, protects immutable fields during edits, confirms explicit deletion modal flows, and accurately updates streak UI upon toggles.

### End-to-End Tests (`tests/e2e/`)
1. **`app.spec.ts`**
   - *Verifies*: The full browser lifecycle using Playwright. Navigates the splash screen, handles full authentication lifecycles (Signup -> Dashboard -> Logout), tests cross-page data persistence, interacts with realistic form lifecycles, and specifically simulates an active network disconnection to test the offline Service Worker cache shell.
