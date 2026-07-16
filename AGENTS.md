# Repository Operating Rules

These rules apply to all automated and agent-authored changes in this repository.

## Versioning

- Every user-visible build or deployment change must increment the patch version.
- Keep the version synchronized in `package.json` and `data/site.ts`.
- Use minor or major increments only when explicitly requested or when semantic versioning requires them.

## Change workflow

- Create a focused branch for each requested change.
- Commit all completed changes without waiting for a separate confirmation.
- Open a pull request automatically.
- Merge the pull request automatically when the requested scope is complete and no known validation failure or merge conflict exists.
- Do not auto-merge destructive, security-sensitive, billing-related, or ambiguous changes without explicit confirmation.
- Report the final version, merge result, and any validation limitation after completion.
