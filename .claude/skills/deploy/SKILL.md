---
description: Deploy to staging — lint, build production bundle, push to origin/staging
---

Run these three steps in order. Stop and report failure if any step exits non-zero.

## Step 1 — Lint

```bash
npm run lint
```

Report any lint errors to the user. Do not proceed if lint fails.

## Step 2 — Production build

```bash
npm run build
```

Confirm the build succeeds and note the output bundle sizes.

## Step 3 — Push to staging

```bash
git push origin staging
```

Confirm the push succeeds and report the remote ref that was updated.

## Report

When all three steps pass, summarise:
- Lint: passed
- Build: passed (include bundle size)
- Staging: pushed (include the ref)

If any step fails, stop immediately, show the error output, and tell the user what needs to be fixed before deploying.
