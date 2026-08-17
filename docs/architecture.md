# Architecture

Team Tasks is a compact full-stack training app. The architecture is intentionally simple so contributors can focus on reading code, checking contracts, and making small verified changes.

## System overview

| Layer | Location | Responsibility |
|-------|----------|----------------|
| Web UI | `apps/web` | Renders the task board, form, filters, and summary. |
| API | `apps/api` | Exposes HTTP endpoints for task operations. |
| Shared reference | `packages/shared` | Documents expected task fields, endpoints, and example payloads. |
| Storage | `apps/api/internal/task/repository.go` | Keeps seeded tasks in memory for local training use. |

## Backend architecture

The Go API uses a small layered structure under `apps/api`:

| File | Role |
|------|------|
| `cmd/server/main.go` | Builds dependencies, registers routes, enables development CORS, and starts the server on port `8080`. |
| `internal/task/handler.go` | Handles HTTP requests, decodes request bodies, reads query parameters, and writes JSON responses. |
| `internal/task/service.go` | Contains task use cases such as create, status change, summary, and overdue filtering. |
| `internal/task/repository.go` | Defines the repository interface and in-memory implementation with seeded data. |
| `internal/task/model.go` | Defines task, status, request, and summary shapes. |

The API uses only in-memory state. Restarting the server resets tasks to the seeded data.

## Frontend architecture

The Angular app lives in `apps/web` and is organized around task features:

| Path | Role |
|------|------|
| `src/app/app.component.ts` | Application shell and hero layout. |
| `src/app/app.routes.ts` | Routes the app to the task feature screen. |
| `src/app/core/api/task-api.service.ts` | Central API client for task HTTP calls. |
| `src/app/features/tasks/task.model.ts` | Frontend task and summary types. |
| `src/app/features/tasks/*component.ts` | Task list, form, and summary UI components. |

The web app calls the API at `http://localhost:8080`. Run the API and web app in separate terminals during manual verification.

## Shared package purpose

`packages/shared` is a lightweight reference area, not a compiled package in the current setup.

| File | Purpose |
|------|---------|
| `task-contract.json` | Documents the intended task fields and endpoint contract. |
| `examples/task.json` | Provides a sample task payload. |

When changing behavior at an API boundary, inspect the backend handler, frontend API service, frontend models, and shared contract together. Contract differences should be deliberate, not accidental.

## Data flow

1. The user interacts with the Angular task board.
2. Angular components call `TaskApiService`.
3. `TaskApiService` sends HTTP requests to the Go API.
4. Go handlers decode requests and call the task service.
5. The service reads or updates the in-memory repository.
6. The API returns JSON to the web app.
7. The UI refreshes task lists and summary data.

## Task status lifecycle

Task status is intentionally limited to three values:

| Status | Meaning |
|--------|---------|
| `todo` | Work has not started. New tasks default to this status. |
| `in_progress` | Work is active. Seeded data includes this state for filters and summary counts. |
| `done` | Work is complete. Done tasks are excluded from overdue results. |

Do not introduce a broader workflow unless the training task explicitly asks for it.
