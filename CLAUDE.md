# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install       # install dependencies
npm run dev       # start dev server at http://localhost:5173
npm run build     # production build
npm run preview   # preview production build
npm run lint      # run ESLint
```

No test framework is configured.

## Architecture

This is a React 19 + Vite app with a single component (`src/App.jsx`) that owns all state and rendering — no routing, no external state management, no persistence.

**State in `App`:**
- `transactions` — array of `{ id, description, amount, type, category, date }`
- `description`, `amount`, `type`, `category` — controlled form fields for adding a transaction
- `filterType`, `filterCategory` — filter state for the transaction list

**Known intentional issues (part of the course):**
- `amount` is stored as a string. The `reduce` calls for `totalIncome` and `totalExpenses` use string concatenation instead of numeric addition, producing wrong totals.
- "Freelance Work" (id 4) is typed as `"expense"` but categorized as `"salary"` — a data bug.
- The UI is unstyled and the component is monolithic (no decomposition into smaller components).
