# Pruebas

Este repositorio actualmente depende de verificaciones de build, compilación de paquetes Go y verificación manual. Todavía no hay archivos de prueba dedicados.

## Estado actual de pruebas

| Área | Estado |
|------|-------|
| Pruebas de API | `go test ./...` pasa y actualmente informa que no hay archivos de prueba. |
| Pruebas web | No hay un script de pruebas dedicado configurado. |
| Build web | `npm run build` es el comando principal de verificación frontend. |
| Verificaciones manuales | Requeridas para el comportamiento end-to-end entre la API y la aplicación web. |

## Comandos que deberían pasar

Desde la raíz del repositorio:

```bash
cd apps/api && go test ./...
```

```bash
cd apps/web && npm run build
```

Para la verificación manual, ejecuta también ambas aplicaciones:

```bash
cd apps/api && go run ./cmd/server
```

```bash
cd apps/web && npm start -- --host 127.0.0.1 --port 4200
```

## Checklist de verificación manual

Con la API y la aplicación web en ejecución:

- [ ] El tablero de tareas carga las tareas iniciales.
- [ ] Los conteos del resumen muestran tareas en `todo`, `in_progress` y `done`.
- [ ] Los filtros pueden mostrar distintos grupos de estado.
- [ ] Crear una tarea agrega una nueva tarea `todo`.
- [ ] Las verificaciones solo de API, como el comportamiento de vencidas, se validan con solicitudes HTTP directas cuando no están expuestas en la UI.
- [ ] La consola del navegador y la pestaña Network se revisan para detectar solicitudes fallidas.
- [ ] Para cualquier cambio en el límite de la API, se comparan rutas backend, llamadas de API frontend, modelos frontend y `packages/shared/task-contract.json`.

## Primeras pruebas sugeridas para agregar después

| Área | Prueba sugerida | Por qué ayuda |
|------|----------------|--------------|
| Servicio de API | Crear una tarea asigna estado `todo` por defecto. | Protege una regla de negocio central. |
| Servicio de API | El resumen cuenta correctamente `todo`, `in_progress` y `done`. | Cubre los estados iniciales del flujo de trabajo. |
| Servicio de API | Las vencidas excluyen tareas `done`. | Captura la interacción entre fecha y estado. |
| Handler de API | JSON inválido devuelve `400`. | Protege el comportamiento de validación de solicitudes. |
| Handler de API | Actualizar estado de tarea inexistente devuelve `404`. | Documenta el comportamiento not-found. |
| Servicio de API web | Las URLs de solicitud coinciden con el contrato compartido y las rutas backend. | Detecta temprano desvíos de contrato. |
| Componentes web | Crear una tarea refresca la lista y el estado del resumen. | Cubre el flujo de usuario más importante. |

Mantén enfocadas las pruebas futuras. Agrega la prueba más pequeña que proteja el comportamiento que se cambia.
