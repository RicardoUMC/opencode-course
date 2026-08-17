# Agent Instructions

Use this file as the working agreement for coding agents in this repository. Keep changes small, evidence-based, and aligned with the training purpose of the branch.

## Project overview

Team Tasks is a training monorepo:

| Path | Role |
|------|------|
| `apps/api` | Go HTTP API with in-memory task storage. |
| `apps/web` | Angular app that calls the API from `http://localhost:8080`. |
| `packages/shared` | Shared contract and example task payloads. |
| `docs` | Project documentation for humans and agents. |
| `course-guides` | Course-facing material; avoid changing unless explicitly requested. |

## Boundaries

- Make the smallest useful change for the requested task.
- Do not broad-refactor, reorganize, or modernize unrelated code.
- Do not modify generated/build artifacts unless the task explicitly requires it.
- Preserve the repo's training intent, including intentional opportunities to inspect contract consistency.
- Before changing API behavior, compare `apps/api`, `apps/web`, and `packages/shared` so route, payload, and response expectations stay deliberate.
- Prefer evidence before changes: read the relevant code and docs, then edit.

## Commands

| Need | Command |
|------|---------|
| Run API | `cd apps/api && go run ./cmd/server` |
| Test API | `cd apps/api && go test ./...` |
| Install web deps | `cd apps/web && npm install` |
| Run web app | `cd apps/web && npm start -- --host 127.0.0.1 --port 4200` |
| Build web app | `cd apps/web && npm run build` |

## Testing and verification expectations

- Run the narrowest relevant verification command after code changes.
- For API changes, run `cd apps/api && go test ./...`.
- For web changes, run `cd apps/web && npm run build`.
- For behavior touching both sides, run both commands and manually check the app with the API running.
- Document any command not run and why.

## Documentation references

- Architecture: `docs/architecture.md`
- Local setup and troubleshooting: `docs/local-development.md`
- Testing state and manual checks: `docs/testing.md`
