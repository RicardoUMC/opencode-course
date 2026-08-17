# Local Development

Use two terminals: one for the Go API and one for the Angular web app.

## Prerequisites

| Tool | Used for |
|------|----------|
| Go | Running and testing the API. |
| Node.js | Installing and running the Angular app. |
| npm | Web dependency installation and scripts. |

## First-time setup

From the repository root:

```bash
cd apps/web
npm install
```

No database, container, or external service is required. The API stores tasks in memory.

## Run the API

```bash
cd apps/api
go run ./cmd/server
```

Expected output:

```text
Team Tasks API listening on http://localhost:8080
```

Optional health check:

```bash
curl http://localhost:8080/health
```

Expected response:

```json
{"status":"ok"}
```

## Run the web app

In a second terminal:

```bash
cd apps/web
npm start -- --host 127.0.0.1 --port 4200
```

Open:

```text
http://127.0.0.1:4200
```

## Useful verification commands

```bash
cd apps/api && go test ./...
cd apps/web && npm run build
```

## Troubleshooting

### Blank page

- Confirm the web dev server is still running.
- Check the browser console for Angular or network errors.
- Run `cd apps/web && npm run build` to catch compile-time issues.
- Confirm you opened `http://127.0.0.1:4200`, not the API URL.

### API data does not load

- Confirm the API is running on `http://localhost:8080`.
- Visit `http://localhost:8080/health` and expect `{"status":"ok"}`.
- Check the browser Network tab for failed requests.
- If behavior crosses the API boundary, inspect `apps/api`, `apps/web`, and `packages/shared` before editing.

### CORS errors

- The API allows development origins beginning with `http://localhost:` and `http://127.0.0.1:`.
- Start the web app with `--host 127.0.0.1 --port 4200` to match the expected local setup.
- Restart the API after changing CORS-related code.

### Port already in use

- API default: `8080`.
- Web default in this repo's commands: `4200`.
- Stop the process using the port, or choose a different web port and open the matching URL.
- If changing the API port, update frontend API configuration deliberately.

### `npm install` fails

- Verify Node.js and npm are installed and available on `PATH`.
- Run the command from `apps/web`, not the repository root.
- If dependencies are already installed but broken, remove `apps/web/node_modules` and run `npm install` again.

### `npm run build` fails

- Read the first TypeScript or Angular error in the output; later errors may be cascading failures.
- Confirm the command is run from `apps/web`.
- Check recent edits to components, models, and the API service.

### Go server fails to start

- Confirm the command is run from `apps/api`.
- Run `go test ./...` to catch compile errors.
- If port `8080` is already in use, stop the existing process before restarting the API.
