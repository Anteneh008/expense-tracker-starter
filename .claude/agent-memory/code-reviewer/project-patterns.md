---
name: project-patterns
description: Recurring code patterns, anti-patterns, and conventions observed across the expense-tracker source files (first full review, 2026-06-27)
metadata:
  type: project
---

Patterns and conventions found during the initial full codebase review.

**Why:** Institutional knowledge to avoid re-deriving the same observations in future conversations.
**How to apply:** Use as baseline when reviewing incremental changes; flag regressions against these findings.

## Confirmed conventions
- `categories` array is duplicated verbatim in `TransactionForm.jsx` and `TransactionList.jsx` — treat this as a known duplication, not a new finding, unless the user asks to fix it.
- `amount` is always stored as a number in the `transactions` array; `parseFloat` is applied at form submission in `TransactionForm`.
- Seed data uses `Date.now()` is used as the ID strategy for new transactions (not for seed data).
- `confirm()` (native browser dialog) is used for delete confirmation in `TransactionList` — this is a simplicity choice, not a bug, but worth flagging as an accessibility concern.
- No `useMemo` is used anywhere; `Summary` and `SpendingChart` recompute on every render.
- `handleAdd` in `App` spreads the old array (`[...transactions, transaction]`) instead of using the functional updater form of `setTransactions` — a stale-closure risk under concurrent features.
- `handleDelete` in `App` also uses the snapshot form, same concern.
- `Cell key={index}` in `SpendingChart` uses array index as key — acceptable here since the array is derived from an object and order is stable within a render, but flagged.
- `SpendingChart` aggregates by iterating all transactions on every render with no memoization.
- `TransactionList` performs two sequential `.filter()` passes on every render with no memoization.
- `amount` in `TransactionList` is formatted with `toLocaleString()` but without explicit locale or currency options — output is locale-dependent.
- Amount validation in `TransactionForm` only checks truthiness (`!amount`), which means `0` would be blocked — but `min="0"` on the input and the `parseFloat` call make this acceptable for the course context; worth noting.
- The `form` CSS selector is global (not scoped), so any future `<form>` element outside `.add-transaction` will inherit these styles.
- `prefers-reduced-motion` media query is correctly implemented in CSS.
- `StrictMode` is correctly applied at the root.
- Responsive breakpoint at 600 px is covered.
