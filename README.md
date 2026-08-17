# Team Tasks

Team Tasks es un monorepo pequeño de entrenamiento con una API en Go, una aplicación web en Angular y ejemplos de contrato compartidos. Esta rama muestra cómo el contexto explícito del repositorio ayuda a humanos y agentes de código a trabajar con los mismos límites del proyecto.

## Estructura del repositorio

| Ruta | Propósito |
|------|---------|
| `apps/api` | API HTTP en Go para tareas, resúmenes, tareas vencidas y cambios de estado. |
| `apps/web` | Aplicación Angular de una sola página para ver, crear, filtrar y actualizar tareas. |
| `packages/shared` | Contrato compartido y payloads de ejemplo usados como material de referencia. |
| `docs` | Documentación del proyecto sobre arquitectura, desarrollo local y pruebas. |
| `course-guides` | Material del curso. No lo trates como documentación general del proyecto. |

## Requisitos previos

- Go instalado y disponible en `PATH`.
- Node.js y npm instalados.
- Una terminal capaz de ejecutar procesos separados para la API y la web.

## Configuración local

Desde la raíz del repositorio:

```bash
cd apps/web
npm install
```

La API no requiere servicios externos ni configuración de base de datos. Usa un repositorio en memoria con tareas iniciales.

## Ejecutar la API

```bash
cd apps/api
go run ./cmd/server
```

Salida esperada:

```text
Team Tasks API listening on http://localhost:8080
```

Verificación de salud:

```bash
curl http://localhost:8080/health
```

## Ejecutar la aplicación web

En una segunda terminal:

```bash
cd apps/web
npm start -- --host 127.0.0.1 --port 4200
```

Abre `http://127.0.0.1:4200`.

## Comandos de verificación

| Área | Comando |
|------|---------|
| Pruebas de API | `cd apps/api && go test ./...` |
| Ejecutar API | `cd apps/api && go run ./cmd/server` |
| Instalar web | `cd apps/web && npm install` |
| Compilar web | `cd apps/web && npm run build` |
| Ejecutar web | `cd apps/web && npm start -- --host 127.0.0.1 --port 4200` |

## Alcance de entrenamiento y advertencias conocidas

- Los datos están en memoria y se reinician cuando se reinicia la API.
- Las tareas nuevas se crean con estado `todo`.
- Los datos iniciales incluyen tareas `todo`, `in_progress` y `done` para que los filtros y los conteos del resumen tengan datos iniciales útiles.
- Este repositorio es intencionalmente pequeño. Prefiere cambios enfocados antes que reescrituras amplias de framework o arquitectura.
- La consistencia del contrato entre `apps/api`, `apps/web` y `packages/shared` es parte del entrenamiento. Revisa los tres antes de cambiar el comportamiento de la API.

## Más documentación

- [Arquitectura](docs/architecture.md)
- [Desarrollo local](docs/local-development.md)
- [Pruebas](docs/testing.md)
- [Instrucciones para agentes](AGENTS.md)
