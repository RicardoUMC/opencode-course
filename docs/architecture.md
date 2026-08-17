# Arquitectura

Team Tasks es una aplicación full-stack compacta de entrenamiento. La arquitectura es intencionalmente simple para que quienes contribuyan puedan enfocarse en leer código, revisar contratos y hacer cambios pequeños y verificados.

## Vista general del sistema

| Capa | Ubicación | Responsabilidad |
|-------|----------|----------------|
| UI web | `apps/web` | Renderiza el tablero de tareas, formulario, filtros y resumen. |
| API | `apps/api` | Expone endpoints HTTP para operaciones de tareas. |
| Referencia compartida | `packages/shared` | Documenta campos esperados de tareas, endpoints y payloads de ejemplo. |
| Almacenamiento | `apps/api/internal/task/repository.go` | Mantiene tareas iniciales en memoria para entrenamiento local. |

## Arquitectura backend

La API en Go usa una estructura pequeña por capas dentro de `apps/api`:

| Archivo | Rol |
|------|------|
| `cmd/server/main.go` | Construye dependencias, registra rutas, habilita CORS de desarrollo e inicia el servidor en el puerto `8080`. |
| `internal/task/handler.go` | Maneja solicitudes HTTP, decodifica cuerpos de solicitud, lee parámetros de consulta y escribe respuestas JSON. |
| `internal/task/service.go` | Contiene casos de uso de tareas como creación, cambio de estado, resumen y filtrado de vencidas. |
| `internal/task/repository.go` | Define la interfaz del repositorio y la implementación en memoria con datos iniciales. |
| `internal/task/model.go` | Define las estructuras de tareas, estados, solicitudes y resúmenes. |

La API usa solo estado en memoria. Al reiniciar el servidor, las tareas vuelven a los datos iniciales.

## Arquitectura frontend

La aplicación Angular está en `apps/web` y se organiza alrededor de funcionalidades de tareas:

| Ruta | Rol |
|------|------|
| `src/app/app.component.ts` | Contenedor de la aplicación y layout principal. |
| `src/app/app.routes.ts` | Enruta la aplicación a la pantalla de tareas. |
| `src/app/core/api/task-api.service.ts` | Cliente central de API para llamadas HTTP de tareas. |
| `src/app/features/tasks/task.model.ts` | Tipos frontend de tareas y resumen. |
| `src/app/features/tasks/*component.ts` | Componentes de UI para lista, formulario y resumen de tareas. |

La aplicación web llama a la API en `http://localhost:8080`. Ejecuta la API y la aplicación web en terminales separadas durante la verificación manual.

## Propósito del paquete compartido

`packages/shared` es un área ligera de referencia, no un paquete compilado en la configuración actual.

| Archivo | Propósito |
|------|---------|
| `task-contract.json` | Documenta los campos previstos de tareas y el contrato de endpoints. |
| `examples/task.json` | Proporciona un payload de tarea de ejemplo. |

Cuando cambies comportamiento en un límite de API, revisa juntos el handler backend, el servicio de API frontend, los modelos frontend y el contrato compartido. Las diferencias de contrato deben ser deliberadas, no accidentales.

## Flujo de datos

1. La persona usuaria interactúa con el tablero de tareas en Angular.
2. Los componentes Angular llaman a `TaskApiService`.
3. `TaskApiService` envía solicitudes HTTP a la API en Go.
4. Los handlers de Go decodifican solicitudes y llaman al servicio de tareas.
5. El servicio lee o actualiza el repositorio en memoria.
6. La API devuelve JSON a la aplicación web.
7. La UI actualiza listas de tareas y datos de resumen.

## Ciclo de vida del estado de una tarea

El estado de una tarea está limitado intencionalmente a tres valores:

| Estado | Significado |
|--------|---------|
| `todo` | El trabajo no comenzó. Las tareas nuevas usan este estado por defecto. |
| `in_progress` | El trabajo está activo. Los datos iniciales incluyen este estado para filtros y conteos de resumen. |
| `done` | El trabajo está completo. Las tareas finalizadas se excluyen de los resultados vencidos. |

No introduzcas un flujo de trabajo más amplio salvo que la tarea de entrenamiento lo pida explícitamente.
