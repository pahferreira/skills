# Destinations

## Choosing one (first run)

Look at the MCP servers in your tool list (`mcp__<server>__*` tools, loaded or deferred) and offer the user, in this order:

1. **Notion**, when a Notion server is connected: a **QA Plans** database, one entry per plan. Recommend it. Ask which page should hold the database.
2. **Any other connected docs or wiki tool** (Confluence, Google Drive, Claude Docs, and so on): one page or doc per plan, in a folder or parent page the user names.
3. **Markdown in `.qa-plans/`**, always offered last: one file per plan, committed with the code.

Ask once, with these as the choices. Then set up the chosen destination as below.

## Recording it

Add this section to the repo's `CLAUDE.md`, filled in, so later runs skip the choice:

```markdown
## QA plans

QA plans land in <destination, with the ids needed to reach it>. Write them with the `qa-plan` skill.
```

For Notion, record the database URL and its `collection://` data source id.

## Notion

**Setup:** create the database under the page the user named:

```sql
CREATE TABLE ("Plan" TITLE, "Status" STATUS('To do':gray:to_do, 'In progress':blue:in_progress, 'Done':green:complete), "Issue" RICH_TEXT, "Created" CREATED_TIME)
```

**Filing:** create a page in the data source with `Plan` set to the title, `Status` set to `To do`, and `Issue` set to `#n` (empty when there is no issue). Use 🧪 as the icon and the template as the content. Before writing, read the Notion-flavored Markdown spec through the Notion fetch tool (`notion://docs/notion-flavored-markdown-spec`). Checkboxes are `- [ ]`.

## Other docs tools

**Setup:** none beyond the parent the user named.

**Filing:** one page or doc per plan, titled `QA — <title> (#n)`, with the template as its content in the tool's own markup. Write the goal as a callout or a quote block.

## Markdown (`.qa-plans/`)

**Setup:** create `.qa-plans/` at the repo root.

**Filing:** write `.qa-plans/<n>-<kebab-title>.md` (drop `<n>-` when there is no issue), starting with this frontmatter, then the template:

```markdown
---
status: To do
issue: "#<n>"
created: <YYYY-MM-DD>
---
```

Commit the file only if the user asks.
