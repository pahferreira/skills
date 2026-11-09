# pahferreira-skills

Agent skills for day-to-day engineering. Works in Claude Code and Pi.

## Skills

### Engineering

| Skill | What it does |
| --- | --- |
| `pr` | Opens a GitHub PR or GitLab MR, filled from the repo's template. |
| `bug-hunt` | Runs 2–4 parallel investigators, then agrees ranked root-cause hypotheses with you. Changes no code. |
| `qa-plan` | Writes a manual QA plan from the branch diff and issue, then files it (Notion, another tool, or `.qa-plans/`). |

`bug-hunt` and `qa-plan` run only when you call them. The model can call `pr` on its own.

## Install

### Claude Code

```
/plugin marketplace add pahferreira/skills
/plugin install pahferreira-skills@pahferreira
```

Run: `/pahferreira-skills:pr [base-branch]`

### Pi

From npm:

```bash
pi install npm:pahferreira-skills
```

From git (tracks `main`):

```bash
pi install git:github.com/pahferreira/skills
```

Add `-l` to install for the current project only.

Run: `/skill:pr [base-branch]`

Update: `pi update`