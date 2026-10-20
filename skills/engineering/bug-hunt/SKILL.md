---
name: bug-hunt
description: Hunt a bug with 2–3 parallel Anbu investigators, then align with the user on ranked root-cause hypotheses.
argument-hint: "<bug description | issue #/URL | ticket ref>"
disable-model-invocation: true
---

Hunt the bug in `$ARGUMENTS` with parallel **hunters**, then align with the user on what caused it. This skill investigates; it ends at an agreed hypothesis, with no code changed.

## 1. Write the brief

Resolve `$ARGUMENTS` into a **bug brief**:

- Plain description: use it as is.
- Issue or ticket reference (`#123`, a URL, a tracker key): fetch it with whatever tool reaches it (`gh issue view <n> --comments` for GitHub, the tracker's MCP otherwise), comments included.
- Empty or unreachable: ask the user to paste it.

The brief has: symptom (expected vs actual), repro steps, environment, error text or stack, onset (when it started, or "always"), impact.

Done when every field is filled or marked `unknown`. Hunters treat `unknown` as something to determine, so mark rather than guess.

## 2. Map the surface

Find the codebase's **layers** from the environment: workspaces (`package.json`, `go.work`, …), top-level app directories, the project `CLAUDE.md`. Start where the symptom shows (a screen, a response, a log line, a job) and trace one hop in each direction to see which layers it crosses.

Done when every layer is listed with its path and marked implicated or cleared, with a one-line reason for each.

## 3. Pick the hunters

Each hunter owns a **slice**: a lens plus a scope that no other hunter covers. Apply in order:

1. One **trace** hunter per implicated layer, at most two.
2. Add a **history** hunter when the bug is a regression or its onset is `unknown`.
3. Add a **boundary** hunter when two layers are implicated.
4. Clamp to 2–3. Below 2: add history. Above 3: drop boundary. High impact (production, data loss, many users): fill up to 3.

[`hunter.md`](hunter.md) defines each lens.

Post the line-up in one line per hunter (lens, scope) and go on without waiting.

## 4. Dispatch

Launch every hunter in one message as parallel `general-purpose` agents with `model: opus`. Each prompt carries:

- first line: "Read `<absolute path to this skill's hunter.md>` and follow it."
- the bug brief, verbatim
- its slice: lens and scope paths
- the other hunters' slices, so it leaves those alone

Hunters never see each other's reports. Their **independence** is what makes convergence mean something.

Done when every hunter has returned its report.

## 5. Synthesise

Merge the reports into one ranked hypothesis list:

- **Converged**: two or more hunters reached the same cause independently. This is the strongest signal the hunt produces, so rank it up and cite each hunter.
- **Conflicting**: one hunter's evidence contradicts another's. Keep both, and name the check that settles it.
- **Solo**: keep the hunter's own likelihood.

Every entry carries: cause, evidence (`file:line`), falsifiable prediction, cheapest check, and the hunters that found it. Fold each report's "Ruled out" items into a cleared list.

Merge the reports' **fixer notes** into one set:

- **Repro seam**: the cheapest seam any hunter named, plus the existing tests that miss the bug.
- **Same pattern**: every site, deduplicated.
- **Collateral**: every affected store or system. Flag it when the fix needs a data repair as well as a code change.
- **Introduced by**: the history hunter's commit or PR, if it ran and found one.

Done when every hypothesis from every report sits in the list as ranked, merged into another, or discarded with a reason, and every fixer-notes item from every report sits in the merged set.

## 6. Align

Show the user: the brief in one line, the line-up, the ranked list, the cleared list, the fixer notes, and the open questions whose answers would re-rank the list. Ask them to confirm, re-rank, or rule out. Their domain knowledge often settles in one sentence what code-reading cannot.

Done when the user names the hypothesis to pursue.

## 7. Hand off

Ask the user how the fixer receives the hunt:

- **Context**: the fix continues in this session, carried by the conversation.
- **Report**: write the hunt to `.bug-hunts/<slug>.md`, or to a path the user names. It holds the brief, the chosen hypothesis, the ranked list, the cleared list, the fixer notes, and the open questions. A fresh session starts from that file.

Either way, the fixer's first move is to prove the chosen hypothesis with a feedback loop that goes red on the bug, built at the repro seam (`diagnosing-bugs` Phase 1, when installed).

Done when the user has chosen and, for a report, the file exists and its path has been given to the user.
