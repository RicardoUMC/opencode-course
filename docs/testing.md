# Testing

This repo currently relies on build checks, Go package compilation, and manual verification. There are no dedicated test files yet.

## Current testing state

| Area | State |
|------|-------|
| API tests | `go test ./...` passes and currently reports no test files. |
| Web tests | No dedicated test script is configured. |
| Web build | `npm run build` is the primary frontend verification command. |
| Manual checks | Required for end-to-end behavior across the API and web app. |

## Commands that should pass

From the repository root:

```bash
cd apps/api && go test ./...
```

```bash
cd apps/web && npm run build
```

For manual verification, also run both apps:

```bash
cd apps/api && go run ./cmd/server
```

```bash
cd apps/web && npm start -- --host 127.0.0.1 --port 4200
```

## Manual verification checklist

With the API and web app running:

- [ ] The task board loads seeded tasks.
- [ ] Summary counts show tasks across `todo`, `in_progress`, and `done`.
- [ ] Filters can show different status groups.
- [ ] Creating a task adds a new `todo` task.
- [ ] API-only checks, such as overdue behavior, are verified with direct HTTP requests when they are not exposed in the UI.
- [ ] Browser console and Network tab are checked for failed requests.
- [ ] For any API-boundary change, backend routes, frontend API calls, frontend models, and `packages/shared/task-contract.json` are compared.

## Suggested first tests to add later

| Area | Suggested test | Why it helps |
|------|----------------|--------------|
| API service | Creating a task defaults status to `todo`. | Protects a core business rule. |
| API service | Summary counts `todo`, `in_progress`, and `done` correctly. | Covers seeded workflow states. |
| API service | Overdue excludes `done` tasks. | Captures date/status interaction. |
| API handler | Invalid JSON returns `400`. | Protects request validation behavior. |
| API handler | Missing task status update returns `404`. | Documents not-found behavior. |
| Web API service | Request URLs match the shared contract and backend routes. | Catches contract drift early. |
| Web components | Creating a task refreshes list and summary state. | Covers the most important user flow. |

Keep future tests focused. Add the smallest test that protects the behavior being changed.
