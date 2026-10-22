---
name: qa-plan
description: Write a QA plan for the current branch from its diff and its issue, then file it where the repo keeps QA plans (Notion, another connected tool, or `.qa-plans/`).
argument-hint: "[issue] [base-branch]"
---

Write a manual QA plan for the work on the current branch: what changed, and a checklist a tester can run in the app.

Arguments: `$ARGUMENTS` may name the issue (`#280`) and the base branch. The base defaults to `main`.

## 1. Find the destination

The **destination** is where QA plans land. Read the repo's `CLAUDE.md` (and `AGENTS.md` when present) for a **QA plans** section.

- **Found**: use it.
- **Missing** (first run): read [`destinations.md`](./destinations.md), offer the options it lists, set up the one the user picks, and record it in `CLAUDE.md`.

Done when you hold one destination and `CLAUDE.md` names it.

## 2. Gather the change

- **Diff**: `git log <base>..HEAD` and `git diff <base>...HEAD`, plus uncommitted work (`git status --short`).
- **Issue**: the argument, else a `#n` in the branch name or commit messages (`Refs #n`, `Resolves #n`), else the one discussed this session. If none is clear, ask, and offer "no issue". Read the issue's body and comments with the repo's tracker (`CLAUDE.md` names it). When it points at a parent epic, read that as well: an epic's later decisions override the ticket.

Done when you can name every **user-visible change** in the diff (page, button, message, rule, permission) and every acceptance criterion in the issue.

## 3. Write the plan

Fill [`plan-template.md`](./plan-template.md). Its sections and their order are fixed.

Each **check** under *What to test* is one checkbox: an action a tester takes, and the outcome they should see. Quote the UI's own copy (labels, toasts, error messages) exactly as the code renders it, in the product's language. Group checks by area under `###` headings, such as the feature's main flow, validation, destructive actions, side effects on other screens, and permissions.

Go after the cases the diff makes possible: empty states, error states and their messages, double-submits and slow networks, stale data across tabs, and every role the change guards. Write a check that can't be run from the UI (a direct API call, a second account) with the way to run it, for example "via DevTools or curl".

Done when every acceptance criterion and every user-visible change from step 2 maps to at least one check, and every check names an observable outcome.

## 4. File it

Create the plan at the destination with status **To do**, as [`destinations.md`](./destinations.md) describes for that destination.

Done when the plan exists at the destination. Reply with its link or path and the number of checks per area.
