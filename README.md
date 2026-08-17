# Team Tasks

Team Tasks is a small training monorepo with a Go API, an Angular web app, and shared contract examples. This branch demonstrates how explicit repository context helps humans and coding agents work with the same project boundaries.

## Repository structure

| Path | Purpose |
|------|---------|
| `apps/api` | Go HTTP API for tasks, summaries, overdue tasks, and status changes. |
| `apps/web` | Angular single-page app for viewing, creating, filtering, and updating tasks. |
| `packages/shared` | Shared contract and example payloads used as reference material. |
| `docs` | Project documentation for architecture, local development, and testing. |
| `course-guides` | Course-facing material. Do not treat it as general project documentation. |

## Prerequisites

- Go installed and available on `PATH`.
- Node.js and npm installed.
- A terminal capable of running separate API and web processes.

## Local setup

From the repository root:

```bash
cd apps/web
npm install
```

The API has no external services or database setup. It uses an in-memory repository with seeded tasks.

## Run the API

```bash
cd apps/api
go run ./cmd/server
```

Expected output:

```text
Team Tasks API listening on http://localhost:8080
```

Health check:

```bash
curl http://localhost:8080/health
```

## Run the web app

In a second terminal:

```bash
cd apps/web
npm start -- --host 127.0.0.1 --port 4200
```

Open `http://127.0.0.1:4200`.

## Verification commands

| Area | Command |
|------|---------|
| API tests | `cd apps/api && go test ./...` |
| API run | `cd apps/api && go run ./cmd/server` |
| Web install | `cd apps/web && npm install` |
| Web build | `cd apps/web && npm run build` |
| Web run | `cd apps/web && npm start -- --host 127.0.0.1 --port 4200` |

## Known training scope and caveats

- Data is in memory and resets when the API restarts.
- New tasks are created with `todo` status.
- Seeded data includes `todo`, `in_progress`, and `done` tasks so filters and summary counts have meaningful starting data.
- This repo is intentionally small. Prefer focused changes over broad framework or architecture rewrites.
- Contract consistency across `apps/api`, `apps/web`, and `packages/shared` is part of the training surface. Inspect all three before changing API behavior.

## More documentation

- [Architecture](docs/architecture.md)
- [Local development](docs/local-development.md)
- [Testing](docs/testing.md)
- [Agent instructions](AGENTS.md)
