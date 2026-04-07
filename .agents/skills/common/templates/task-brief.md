# Task Brief Template

Use this when scoping work before implementation. Fill every section; remove lines that do not apply.

---

## Goal
One sentence: what user-visible or system outcome is delivered?

## When / Context
- Trigger or ticket reference:
- Who is affected (end users, admins, developers):

## Constraints
- **Technical:** stack, versions, must-not-change areas (e.g. public API shape).
- **UX:** accessibility, copy, locales if relevant.
- **Performance:** Web Vitals, bundle size, or latency budgets if relevant.
- **Security:** data handling, PII, secrets (server-only).

## Out of Scope
Explicitly list what this task does **not** include (prevents scope creep).

## Proposed Approach
1. Files or areas likely to change (paths or modules):
2. High-level steps (numbered):
3. **Risks** and mitigations:

## Data & API Contract (if applicable)
- Inputs (props, query params, body):
- Success response shape:
- Error shape / codes:

## Verification
- **Commands:** e.g. `pnpm --dir weather-app dev`, `pnpm --dir weather-app build`
- **Manual checks:** scenarios to click through
- **Automated:** tests to add or run (if applicable)

## Definition of Done
Align with `.agents/skills/common/checklists/task-delivery.md` (handoff-ready summary, absolute paths in notes).

## Follow-ups
Optional tickets or tech debt to file after merge.
