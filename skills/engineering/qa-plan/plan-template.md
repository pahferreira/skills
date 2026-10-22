# QA plan template

Title the plan after the feature in the product's own words (`Edit & Delete Meeting`). Keep the issue number in its own field (Notion property, frontmatter), out of the title.

```markdown
<callout icon="🎯">**Goal:** <one sentence: what a passing run proves, in user terms>. Branch `<branch>`.</callout>

## Setup
- <the data and accounts to prepare, concrete: which teams, roles, records, and in what state>

## Out of scope
- <the issue's own out-of-scope list, plus nearby features this change leaves untouched>

## What changed
- <one bullet per user-visible change, in the product's words>
- <API or permission changes, one line each>

## What to test
### <Area>
- [ ] <action> → <observable outcome>
```

The `<callout>` tag is Notion markup. Outside Notion, write the goal as a `>` blockquote that starts with `**Goal:**`.
