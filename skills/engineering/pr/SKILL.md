---
name: pr
description: Open a pull request (GitHub) or merge request (GitLab) for the finished implementation, filled from the repo's template.
argument-hint: "[base-branch]"
disable-model-invocation: true
---

Open a pull request for the work on the current branch. On GitLab it is a merge request; "PR" below means either.

Base branch: `$ARGUMENTS`, or `main` when empty.

## 1. Branch and commits

Get the branch ready to push:

- On the base branch: create `<type>/<kebab-slug>` (e.g. `feat/subscription-skills-filters`, `fix/candidates-sort`) and switch to it.
- Uncommitted changes present: show `git status --short` and ask whether to commit them. Commit only on a yes.

Done when the branch is not the base, the working tree is clean, and `git log <base>..HEAD` lists at least one commit.

## 2. Find the host

Read `git remote get-url origin`:

- `github.com`, or a GitHub Enterprise host: read [`github.md`](./github.md).
- `gitlab.com`, or a self-hosted GitLab: read [`gitlab.md`](./gitlab.md).

When the host is ambiguous, ask the user. Done when you have read exactly one host file. Its commands replace the `<host: …>` slots below.

## 3. Pick the template

The repo's template is the single source of truth for the body's headings; read it fresh each run. Search the locations the host file lists and follow its selection rules. When the search finds nothing, use the fallback, [`pr-template.md`](./pr-template.md).

Done when you hold exactly one template.

## 4. Find the issue

The body links the issue this work implements. Look in order:

1. The issue already discussed in this session (a ticket fetched, a `#n` mentioned).
2. `<host: issue search>` with keywords from the diff.

Done when you hold one issue number you are confident in. If you're unsure, ask the user, and offer "no issue" as a choice.

Put `Resolves #<n>` in the template's issue slot. When the template has no slot, open the first section with it. On "no issue", drop the slot's line entirely.

## 5. Write the PR

Read the full change: `git log <base>..HEAD` and `git diff <base>...HEAD`. Write from the diff, plus the session's reasoning where it explains a choice.

**Title**: a Conventional Commit, `type(scope): summary`, lowercase and imperative, matching `git log --format=%s -15 <base>` (`feat:`, `fix:`, `feat(api):`, `docs:`). PRs are squash-merged, so the title becomes the commit on the base.

**Body**: keep the template's headings verbatim and in order. Replace every placeholder (bracketed sentences, `<!-- -->` comments) with real content. Tick only the checkboxes that are true; leave the rest unticked. A section that does not apply gets a one-line `N/A` with the reason.

Whatever the headings, each fact lands in the section closest to it:

- **What and why for the user**: what changed for the user or the business, in the product's own words (the page and field names the UI shows). Bold the key nouns. Add a short bullet list for product decisions the reviewer should know were deliberate.
- **How and why technically**: the approach, the rejected alternative, the constraint that forced the shape, the convention it follows.
- **Root cause** (fixes): the mechanism, and why it went unnoticed.
- **Tests**: what was added, and the suite results you actually ran.
- **Notes for reviewers**: pre-existing issues you noticed but left alone, and anything bundled that could have been its own PR.

With the fallback template, the first two go under **Overview** and **Solution**; the rest become `####` subsections of **Solution** when they earn their place.

Write the body to a scratch file. Shell quoting breaks markdown.

## 6. Push and open

```sh
git push -u origin HEAD
```

Then `<host: create>`. The body ends with the last section's content. It has no attribution footer and no "Generated with" line.

Done when `<host: view body>` keeps every template heading and contains none of the template's placeholder text. Reply with the PR URL.
