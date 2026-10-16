# GitHub

## Template

GitHub matches the name case-insensitively in the repo root, `.github/`, and `docs/`:

```sh
git ls-files | grep -iE '^(\.github/|docs/)?pull_request_template(\.md)?$|^(\.github/|docs/)?pull_request_template/'
```

- **One file**: use it.
- **A `PULL_REQUEST_TEMPLATE/` folder**: GitHub applies none of them by default. Pick the file that matches the change's type (bug, feature, docs); if none clearly fits, ask the user.

## Commands

- **issue search**: `gh issue list --state open --search "<keywords>"`
- **create**: `gh pr create -B <base> -a @me --title "<title>" --body-file <file>`
- **view body**: `gh pr view --json body -q .body`
