# GitLab

## Template

Merge request templates live in one folder:

```sh
git ls-files '.gitlab/merge_request_templates/*.md'
```

- **`Default.md` present** (any case): use it. GitLab applies it to every new MR, so it is the template reviewers expect.
- **Other files only**: pick the file that matches the change's type (bug, feature, docs); if none clearly fits, ask the user.
- **No files**: a default template can also live in the project settings, outside the repo. Check `glab api projects/:fullpath` for a non-empty `merge_requests_template` before falling back.

## Commands

- **issue search**: `glab issue list --search "<keywords>"`
- **create**: `glab mr create -b <base> --assignee "<your username>" --title "<title>" --description "$(cat <file>)" --yes`. `glab api user` gives your username.
- **view body**: `glab mr view --output json`, field `description`
