# Plan del repositorio práctico

## Propósito

Este documento define el proyecto práctico que se usará durante el curso de OpenCode.

El repositorio debe funcionar como un monorepo realista con backend en Go y frontend en Angular. La intención no es construir una aplicación compleja, sino un sistema suficientemente familiar para que el equipo practique cómo usar OpenCode para entender, levantar, diagnosticar, corregir y documentar un proyecto.

## Principio del ejercicio

La experiencia debe sentirse como llegar a un proyecto existente sin contexto.

Por eso, la rama inicial debe evitar ayudas explícitas como README, documentación, pruebas o instrucciones para agentes. Después, una segunda rama agregará contexto para comparar cómo cambia la calidad del trabajo del agente.

## Estructura base

```txt
opencode-course/
  course-guides/
    opencode-course.md
    participant-guide.md
    training-repo-plan.md

  apps/
    api/
    web/

  packages/
    shared/
```

## Repositorio remoto

```txt
https://github.com/RicardoUMC/opencode-course.git
```

## Aplicación propuesta

La aplicación será un sistema simple de gestión de tareas de equipo.

Nombre sugerido:

```txt
Team Tasks
```

La aplicación permite:

- listar tareas;
- crear tareas;
- cambiar estado de una tarea;
- asignar responsable;
- consultar resumen por estado;
- consultar tareas vencidas.

Nota de alcance: en la rama inicial, el formulario crea tareas nuevas con estado `todo` por defecto. Los estados `in_progress` y `done` existen en los datos iniciales para alimentar filtros, resumen y diagnóstico, pero no se modela todavía el flujo completo para establecer cualquier estado inicial desde la UI.

Este dominio es útil porque es fácil de entender, pero permite introducir errores lógicos, validaciones faltantes, estados inconsistentes y problemas simples de integración frontend/backend.

## Estado verificado actual

El proyecto práctico ya corre localmente.

| Área | Estado |
|------|--------|
| Backend | `cd apps/api && go run ./cmd/server`, disponible en `http://localhost:8080`. |
| Backend tests | `go test ./...` pasa, aunque todavía no existen archivos de prueba. |
| Frontend | `cd apps/web && npm install && npm start -- --host 127.0.0.1 --port 4200`, disponible en `http://127.0.0.1:4200`. |
| Frontend build | `npm run build` pasa. |
| Integración local | CORS/preflight está configurado para llamadas desde Angular al backend Go. |
| Angular runtime | `zone.js` y `<base href="/">` ya están configurados. |
| Estilos | Usa CSS simple del proyecto; Tailwind se dejó fuera a propósito para reducir setup. |

Nota para instructores: se mantiene un problema educativo de contrato. El frontend/contrato compartido usa `PATCH /tasks/{id}/status`, pero el backend expone `PATCH /tasks/status?id=...`. La acción de marcar una tarea como completada debe fallar o abrir una conversación sobre deriva de contrato frontend/backend.

Nota de alcance de estados: las tareas nuevas nacen como `todo`; `in_progress` aparece en datos semilla para representar un estado existente del dominio y permitir ejercicios de filtro/resumen. No es necesario resolver quién lo asigna durante esta primera práctica.

## Backend Go

Ubicación:

```txt
apps/api/
```

Responsabilidades:

- exponer API HTTP;
- manejar tareas;
- validar entradas;
- calcular resúmenes;
- simular persistencia en memoria o archivo local;
- devolver respuestas JSON.

Estructura sugerida:

```txt
apps/api/
  cmd/
    server/
      main.go
  internal/
    task/
      handler.go
      service.go
      repository.go
      model.go
    platform/
      http/
        router.go
  go.mod
  go.sum
```

## Frontend Angular

Ubicación:

```txt
apps/web/
```

Responsabilidades:

- mostrar lista de tareas;
- crear tareas;
- filtrar por estado;
- mostrar resumen;
- consumir API Go;
- manejar estados de carga y error.

Estructura sugerida:

```txt
apps/web/
  src/
    app/
      core/
        api/
          task-api.service.ts
      features/
        tasks/
          task-list.component.ts
          task-form.component.ts
          task-summary.component.ts
          task.model.ts
      app.component.ts
      app.routes.ts
  angular.json
  package.json
  tsconfig.json
```

## Paquete compartido opcional

Ubicación:

```txt
packages/shared/
```

Uso posible:

- documentar contratos de API;
- guardar ejemplos JSON;
- centralizar esquemas o fixtures simples.

Para mantener el curso introductorio, este paquete puede quedar mínimo o incluso vacío al inicio.

## Ramas del ejercicio

### Rama `main`

La rama inicial simula un proyecto sin contexto explícito.

Debe tener:

- código de backend Go;
- código de frontend Angular;
- configuración mínima para correr ambos;
- errores intencionales pequeños;
- implementación suficientemente limpia para que el agente pueda razonar sobre ella;
- ausencia de documentación de producto o instrucciones para el agente.

No debe tener:

- `README.md`;
- `AGENTS.md`;
- carpeta `docs/`;
- pruebas automatizadas;
- `.env.example`, al menos inicialmente;
- instrucciones claras de arranque.

### Rama `with-agent-context`

La segunda rama demuestra cómo mejora el agente cuando tiene contexto.

Debe agregar:

```txt
README.md
AGENTS.md
docs/
  architecture.md
  local-development.md
  testing.md
```

Puede agregar también:

- `.env.example`;
- scripts más claros;
- pruebas mínimas;
- documentación de endpoints;
- guía de troubleshooting.

## Errores intencionales

Los errores deben ser pequeños y educativos. No deben bloquear completamente el curso ni convertir el ejercicio en debugging frustrante.

### Backend

#### 1. Validación incompleta al crear tarea

Ejemplo:

- permite crear una tarea sin título;
- permite fecha vencida sin advertencia;
- asigna `todo` por defecto al crear tarea, sin permitir elegir estado inicial desde el formulario.

Aprendizaje esperado:

- pedir al agente identificar validaciones faltantes;
- distinguir entre comportamiento esperado y bug real;
- limitar el cambio;
- agregar verificación manual o test sugerido.

#### 2. Cálculo incorrecto de tareas vencidas

Ejemplo:

- considera vencidas tareas ya completadas;
- compara fechas usando zona horaria incorrecta;
- usa `<=` cuando debería usar `<`.

Aprendizaje esperado:

- detectar errores lógicos;
- pedir explicación del bug;
- corregir comportamiento sin refactor grande.

#### 3. Manejo de errores HTTP inconsistente

Ejemplo:

- algunos errores devuelven `500` cuando deberían devolver `400`;
- respuesta de error no tiene formato consistente.

Aprendizaje esperado:

- pedir revisión de API;
- identificar contratos implícitos;
- mejorar consistencia de forma pequeña.

#### 4. Repositorio en memoria con comportamiento confuso

Ejemplo:

- IDs generados de forma no determinista;
- actualización silenciosa cuando una tarea no existe;
- búsqueda por estado sensible a mayúsculas/minúsculas.

Aprendizaje esperado:

- revisar comportamiento de persistencia;
- pedir escenarios de prueba;
- separar bug real de preferencia de implementación.

### Frontend

#### 1. Estado de carga mal manejado

Ejemplo:

- `loading` queda activo si la API falla;
- se muestra lista vacía sin mensaje de error;
- se duplican peticiones al recargar.

Aprendizaje esperado:

- pedir al agente revisar flujo de estado;
- corregir UI sin reestructurar toda la pantalla.

#### 2. Responsabilidad mezclada en componente

Ejemplo:

- el componente de lista filtra, transforma y llama directamente a múltiples endpoints;
- parte de la lógica debería vivir en un servicio.

Aprendizaje esperado:

- identificar deuda técnica pequeña;
- discutir cuándo refactorizar y cuándo no.

#### 3. Filtro de estado inconsistente

Ejemplo:

- frontend usa `done`, backend espera `completed`;
- el filtro visual no coincide con el query parameter.

Aprendizaje esperado:

- encontrar problemas de contrato frontend/backend;
- pedir al agente rastrear el flujo completo.

#### 3b. Ruta de cambio de estado incompatible

Estado actual:

- frontend/contrato compartido: `PATCH /tasks/{id}/status`;
- backend: `PATCH /tasks/status?id=...`.

Aprendizaje esperado:

- descubrir deriva de contrato sin resolverla por intuición;
- pedir evidencia en frontend, contrato compartido y router Go;
- corregir una sola fuente de verdad cuando el instructor lo indique.

#### 4. Mensajes de error genéricos

Ejemplo:

- siempre muestra `Something went wrong`;
- no distingue validación de error de servidor.

Aprendizaje esperado:

- mejorar UX sin hacer rediseño grande;
- conectar errores del backend con mensajes útiles.

## Problemas de configuración intencionales

La configuración debe ser descubrible, pero no perfectamente documentada en `main`.

Ejemplos:

- backend usa puerto `8080`;
- frontend espera API en `http://localhost:8080`;
- falta `.env.example`;
- scripts de arranque están en `apps/web/package.json`, pero no en la raíz;
- no hay comando único para levantar todo;
- CORS/preflight ya está configurado para el desarrollo local actual.

Estos problemas permiten el ejercicio:

```text
Ayúdame a configurar este proyecto para poder echarlo a andar por primera vez.
```

## Flujo de ejercicios

### Ejercicio 1 — Exploración inicial

Objetivo:

- entender tecnologías, estructura y puntos de entrada.

Prompt:

```text
Explora este proyecto y explícame qué parece hacer.
No modifiques archivos todavía.
Dime qué tecnologías usa, cómo está organizado y qué dudas tienes.
```

### Ejercicio 2 — Levantar el proyecto

Objetivo:

- identificar comandos necesarios para backend y frontend.

Prompt:

```text
Ayúdame a levantar este proyecto localmente por primera vez.
Primero identifica los comandos necesarios.
No modifiques archivos todavía.
```

### Ejercicio 3 — Diagnóstico de problemas

Objetivo:

- usar el agente para encontrar errores lógicos o malas implementaciones pequeñas.

Prompt:

```text
Busca errores lógicos, malas implementaciones pequeñas o riesgos claros.
Prioriza problemas que puedan explicarse y corregirse en menos de 20 minutos.
No modifiques archivos todavía.
```

### Ejercicio 4 — Corrección limitada

Objetivo:

- corregir un problema sin dejar que el agente haga cambios amplios.

Prompt:

```text
Corrige solo el primer problema recomendado.
Restricciones:
- No cambies comportamiento no relacionado.
- No hagas refactors grandes.
- Explica el diff al final.
- Sugiere cómo verificarlo.
```

### Ejercicio 5 — Crear documentación inicial

Objetivo:

- pedir al agente que documente lo aprendido.

Prompt:

```text
Crea una guía breve para levantar este proyecto localmente.
Incluye requisitos, comandos principales y problemas comunes.
No inventes comandos: básate en lo que encontraste en el repositorio.
```

### Ejercicio 6 — Comparar con contexto para agente

Objetivo:

- cambiar a `with-agent-context` y comparar comportamiento.

Prompt:

```text
Explora este proyecto otra vez.
Usa la documentación disponible y dime si ahora puedes explicar mejor cómo levantarlo, probarlo y modificarlo.
```

## Archivos de contexto en `with-agent-context`

### `README.md`

Debe incluir:

- descripción del proyecto;
- stack;
- requisitos;
- instalación;
- ejecución de backend;
- ejecución de frontend;
- comandos útiles;
- troubleshooting.

### `AGENTS.md`

Debe incluir:

- resumen del proyecto;
- reglas de trabajo para el agente;
- ubicación de backend y frontend;
- restricciones de cambio;
- cómo verificar cambios;
- indicación de preferir cambios pequeños.

### `docs/architecture.md`

Debe explicar:

- arquitectura general;
- separación backend/frontend;
- flujo de datos;
- responsabilidades por carpeta.

### `docs/local-development.md`

Debe explicar:

- instalación local;
- comandos de arranque;
- puertos;
- variables de entorno;
- problemas comunes.

### `docs/testing.md`

Debe explicar:

- estado actual de pruebas;
- cómo correr pruebas cuando existan;
- estrategia mínima recomendada;
- qué debería probarse primero.

## Criterios de calidad del proyecto práctico

El proyecto debe ser:

- suficientemente pequeño para revisarse en una sesión;
- suficientemente realista para practicar exploración;
- familiar para el equipo;
- no trivial;
- con errores intencionales claros;
- sin trampas excesivas;
- seguro para que el agente modifique archivos sin riesgo.

El proyecto no debe ser:

- una aplicación demasiado grande;
- un sistema con demasiadas dependencias;
- un ejemplo artificial de una sola función;
- un lab imposible de levantar;
- una prueba de memorización de comandos.

## Resultado esperado

Al terminar de construir el repo práctico, el curso debe permitir demostrar:

- cómo OpenCode explora un proyecto sin contexto;
- cómo ayuda a levantar backend y frontend;
- cómo identifica errores lógicos simples;
- cómo corrige cambios pequeños;
- cómo mejora su comportamiento con README y AGENTS.md;
- por qué el contexto explícito reduce ambigüedad;
- por qué el desarrollador sigue siendo responsable de revisar y decidir.
