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

React 19 + Vite app. No routing, no external state management, no persistence.

**Component tree:**

```
App
├── Summary          — computes and displays totalIncome, totalExpenses, balance from transactions
├── TransactionForm  — owns its own form state; calls onAdd(transaction) prop on submit
└── TransactionList  — owns its own filter state; receives transactions as a prop
```

**State ownership:**
- `App` holds the `transactions` array (`{ id, description, amount, type, category, date }`) and passes it down. `amount` is always stored as a number.
- `TransactionForm` owns `description`, `amount`, `type`, `category` locally and resets them after submit.
- `TransactionList` owns `filterType` and `filterCategory` locally.

**Known intentional issue (part of the course):**
- "Freelance Work" (id 4) is typed as `"expense"` but categorized as `"salary"` — a data bug.
