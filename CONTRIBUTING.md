# Contributing to QuantumDB

Thanks for contributing. This guide keeps collaboration predictable and production-grade.

## Development Setup

1. Fork the repo and clone your fork.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create local environment config:
   ```bash
   cp .env.local.example .env.local
   ```
4. Configure `MONGODB_URI`, admin passcodes, and Firebase variables.
5. Start the app:
   ```bash
   npm run dev
   ```

Optional sample-data migration:

```bash
npx tsx scripts/migrate-data.ts
```

## Branching

- Create feature branches from `main`.
- Use clear names:
  - `feat/<short-description>`
  - `fix/<short-description>`
  - `docs/<short-description>`

## Commit Style

Use small, focused commits. Conventional-style prefixes are recommended:

- `feat:`
- `fix:`
- `refactor:`
- `docs:`
- `test:`
- `chore:`

Example:

```text
feat: add profile photo fallback for Firebase users
```

## Quality Gate Before PR

Run locally before opening a pull request:

```bash
npm run lint
npm run build
```

If you changed data behavior, also test related APIs and UI flows manually.

## Pull Request Checklist

- PR title clearly states intent.
- Linked issue (if applicable).
- Scope is limited and focused.
- UI changes include screenshots or short video.
- Environment variable changes are reflected in `.env.local.example`.
- README or docs updated if behavior changed.
- No secrets, tokens, or private keys committed.

## Code Standards

- Follow the current TypeScript and component patterns.
- Keep components small and reusable.
- Prefer explicit naming over shorthand.
- Avoid introducing breaking API/shape changes without migration notes.
- Preserve existing visual language unless the PR is explicitly design-focused.

## Security Notes

- Never commit real credentials.
- Replace default passcodes in production.
- Validate and sanitize any user-input data that reaches APIs.

## Reporting Issues

Open an issue with:

- Expected behavior
- Actual behavior
- Steps to reproduce
- Environment details (OS, Node version, browser)
- Screenshots/logs when useful
