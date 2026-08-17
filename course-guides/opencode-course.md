# Curso práctico de OpenCode para equipos de desarrollo

## Objetivo

Que el equipo aprenda a usar OpenCode como asistente de desarrollo real: desde instalación y primer uso, hasta exploración de código, levantamiento de proyectos, corrección de problemas pequeños, documentación del sistema y uso introductorio de MCPs/plugins.

El curso está diseñado alrededor de un monorepo práctico con Go y Angular.

## Cómo usar estos documentos

Este archivo es el temario maestro y la vista general del curso. Para ejecutar la clase en vivo, usa `course-guides/instructor-guide.md`: allí está el flujo canónico de entrega, con tiempos, prompts, notas de facilitación y debriefs.

Los demás documentos cumplen roles específicos:

- `participant-guide.md`: cuaderno breve de prompts y checklist para participantes.
- `training-repo-plan.md`: plan técnico del repositorio de laboratorio, no guion de facilitación.

## Enfoque del curso

La narrativa principal será:

> Entramos a un proyecto desconocido, lo levantamos, lo entendemos, encontramos problemas, lo mejoramos y después agregamos contexto para que el agente trabaje mejor.

El curso evita ejemplos aislados. En su lugar, usa un proyecto realista con estructura de monorepo, sin documentación inicial y con algunos errores intencionales.

## Audiencia

Este curso está pensado para desarrolladores que:

- trabajan con repositorios reales;
- usan terminal, VS Code o ambos;
- tienen experiencia básica con Git;
- quieren aprender a usar OpenCode sin perder control técnico;
- necesitan entender cómo dirigir un agente dentro de un proyecto.

## Duración sugerida

Formato recomendado:

- 3 sesiones de 2 horas.

Formato alternativo:

- 1 workshop intensivo de 5 a 6 horas.

## Requisitos previos

Antes del curso, cada participante debería tener:

- Git instalado.
- Acceso al repositorio del curso.
- Un editor de código, preferentemente VS Code o compatible.
- Terminal funcional.
- Go disponible para ejecutar el backend.
- Node.js disponible para instalar y ejecutar el frontend.
- OpenCode instalado o listo para instalar durante la sesión.
- Acceso configurado al proveedor/modelo que usará OpenCode.

## Estructura del repositorio del curso

```txt
opencode-course/
  course-guides/
    instructor-guide.md
    opencode-course.md
    participant-guide.md
    training-repo-plan.md

  apps/
    api/
    web/

  packages/
    shared/
```

En una rama posterior del ejercicio se agregarán archivos de contexto para el agente:

```txt
README.md
AGENTS.md
docs/
  architecture.md
  local-development.md
  testing.md
```

La carpeta `course-guides/` contiene el material del curso:

- `opencode-course.md`: temario maestro y vista general del curso.
- `instructor-guide.md`: fuente de verdad del flujo canónico de entrega en vivo.
- `participant-guide.md`: cuaderno breve de ejercicios, prompts y checklist para participantes.
- `training-repo-plan.md`: plan técnico del repositorio de laboratorio; no define la secuencia de clase.

La carpeta `docs/` se reserva para documentación real del proyecto durante el ejercicio de comparación con contexto para agentes.

---

# Sesión 1 — Fundamentos, instalación y primer contacto

## Objetivo

Que el equipo entienda qué es OpenCode, lo instale y lo use para explorar un proyecto desconocido.

## Temas

### 1. Qué es OpenCode

OpenCode es una herramienta para trabajar con agentes de desarrollo dentro de un proyecto.

No debe entenderse como un simple chat de IA. La diferencia principal es que OpenCode puede trabajar con el contexto del repositorio, leer archivos, proponer cambios, modificar código, ejecutar comandos y ayudar a razonar sobre el sistema.

### 2. Casos de uso

OpenCode puede ayudar en tareas como:

- entender un proyecto desconocido;
- encontrar puntos de entrada;
- explicar arquitectura;
- levantar un proyecto localmente;
- detectar errores o riesgos;
- proponer refactors pequeños;
- escribir o mejorar documentación;
- generar pruebas;
- revisar cambios antes de un pull request.

### 3. Límites importantes

OpenCode no reemplaza el criterio técnico del desarrollador.

Reglas importantes:

- No aceptar cambios sin revisar el diff.
- No pedir cambios demasiado grandes.
- No compartir secretos o credenciales.
- No dejar que el agente adivine reglas de negocio.
- Pedir explicación cuando algo no se entiende.
- Pedir primero exploración y plan antes de implementar.

### 4. Formas de uso

Durante el curso se cubrirán tres formas principales:

- TUI.
- VS Code o editores compatibles.
- Web UI.

La TUI es útil para trabajar con foco desde terminal.

VS Code o un IDE compatible es útil como entorno visual mientras OpenCode corre desde la terminal integrada. La integración/extensión de IDE puede mencionarse como apoyo, pero no es requisito para completar el curso.

La Web UI es útil para una experiencia visual desde navegador y puede combinarse con la TUI cuando se usa `opencode attach`.

### 5. Instalación y primer comando

Comando base:

```bash
opencode
```

Desde la raíz de un proyecto:

```bash
opencode .
```

O indicando un proyecto:

```bash
opencode path/to/project
```

## Ejercicio práctico

Usar la rama inicial del proyecto, sin README, sin tests, sin documentación y sin AGENTS.md.

Prompt sugerido:

```text
Explora este proyecto y explícame qué parece hacer.
No modifiques archivos todavía.
Dime qué tecnologías usa, cómo está organizado y qué dudas tienes.
```

## Entregable de la sesión

Al final de la sesión, cada participante debería poder responder:

- Qué parece hacer el proyecto.
- Qué tecnologías usa.
- Cómo está organizado.
- Qué información falta.
- Qué archivos parecen importantes.

---

# Sesión 2 — Levantar, entender y mejorar el proyecto

## Objetivo

Usar OpenCode para trabajar como en un caso real: levantar el proyecto, detectar problemas y corregir algo pequeño.

## Temas

### 1. Levantar el proyecto por primera vez

Estado verificado para el instructor:

| Parte | Comando | Resultado esperado |
|-------|---------|--------------------|
| Backend | `cd apps/api && go run ./cmd/server` | API en `http://localhost:8080`. |
| Backend tests | `cd apps/api && go test ./...` | Pasa; aún no hay archivos de prueba. |
| Frontend | `cd apps/web && npm install && npm start -- --host 127.0.0.1 --port 4200` | App en `http://127.0.0.1:4200`. |
| Frontend build | `cd apps/web && npm run build` | Build exitoso. |

La UI usa CSS simple, no Tailwind. La decisión reduce dependencias y evita distraer la sesión con setup de estilos.

Prompt sugerido:

```text
Ayúdame a levantar este proyecto localmente por primera vez.
Primero identifica los comandos necesarios.
No modifiques archivos todavía.
```

Luego:

```text
Ahora ayúdame a ejecutar el backend y frontend.
Si falla algo, explícame la causa probable y propón una solución mínima.
```

### 2. Explorar backend Go

Prompt sugerido:

```text
Explora la aplicación Go.
Dime cuáles son sus capas principales, dónde están los handlers, servicios y acceso a datos.
No modifiques archivos.
```

### 3. Explorar frontend Angular

Prompt sugerido:

```text
Explora la aplicación Angular.
Dime qué pantallas tiene, cómo consume el backend y dónde está la lógica principal.
No modifiques archivos.
```

### 4. Detectar problemas intencionales

Prompt sugerido:

```text
Busca errores lógicos, malas implementaciones pequeñas o riesgos claros.
Prioriza problemas que puedan explicarse y corregirse en menos de 20 minutos.
No modifiques archivos todavía.
```

### 5. Corregir un problema pequeño

Prompt sugerido:

```text
Corrige solo el primer problema recomendado.
Restricciones:
- No cambies comportamiento no relacionado.
- No hagas refactors grandes.
- Explica el diff al final.
- Sugiere cómo verificarlo.
```

## Entregable de la sesión

Al final de la sesión, cada participante debería tener:

- Un problema identificado.
- Un cambio pequeño aplicado.
- Un diff revisado.
- Una explicación de cómo verificar el cambio.

---

# Sesión 3 — Contexto para agentes, README, AGENTS, MCPs y plugins

## Objetivo

Mostrar cómo mejora OpenCode cuando el proyecto tiene contexto explícito.

## Temas

### 1. Cambiar a la rama con contexto

Rama sugerida:

```bash
with-agent-context
```

Esta rama incluye:

```txt
README.md
AGENTS.md
docs/
  architecture.md
  local-development.md
  testing.md
```

### 2. Comparar comportamiento del agente

Prompt sugerido:

```text
Explora este proyecto otra vez.
Usa la documentación disponible y dime si ahora puedes explicar mejor cómo levantarlo, probarlo y modificarlo.
```

Comparar contra la sesión 1:

- ¿Pidió menos información?
- ¿Entendió mejor la estructura?
- ¿Propuso mejores pasos?
- ¿Evitó asumir cosas?
- ¿Fue más útil para levantar el proyecto?

Mensaje clave:

> La calidad del agente depende muchísimo de la calidad del contexto que le damos.

### 3. README práctico

Un buen README para este ejercicio debería incluir:

- propósito del proyecto;
- stack tecnológico;
- requisitos previos;
- instalación;
- cómo correr backend;
- cómo correr frontend;
- comandos útiles;
- troubleshooting básico.

### 4. AGENTS.md básico

El archivo `AGENTS.md` sirve para darle instrucciones al agente sobre cómo trabajar dentro del proyecto.

Ejemplo:

```md
# Agent Instructions

## Project Overview

This is a training monorepo with a Go API and Angular frontend.

## Rules

- Do not make broad refactors unless explicitly requested.
- Prefer small, reviewable changes.
- Explain risks before modifying files.
- When changing behavior, suggest verification steps.

## Backend

The API is located in `apps/api`.

## Frontend

The Angular app is located in `apps/web`.
```

### 5. AGENTS avanzado

Este tema solo se menciona de forma introductoria.

En proyectos más maduros, `AGENTS.md` puede mantenerse pequeño y enlazar a documentos más específicos, por ejemplo:

- arquitectura;
- testing;
- convenciones de frontend;
- convenciones de backend;
- flujos de pull request;
- reglas de seguridad;
- skills o flujos especializados.

Ejercicio opcional:

```text
Propón una versión mejorada de este AGENTS.md.
Mantén el archivo principal corto y enlaza documentos específicos cuando tenga sentido.
```

### 6. MCPs

MCP permite conectar OpenCode con herramientas o fuentes de información externas.

Ejemplos de uso:

- documentación actualizada;
- GitHub;
- búsqueda externa;
- herramientas internas;
- bases de datos;
- Jira, Notion o Slack, si aplica.

Comando:

```bash
opencode mcp add
```

Riesgos a considerar:

- permisos;
- credenciales;
- datos sensibles;
- servidores remotos;
- acceso excesivo a herramientas internas.

### 7. Plugins

Los plugins permiten extender o personalizar el comportamiento de OpenCode.

Comando:

```bash
opencode plugin <module>
```

Alias:

```bash
opencode plug <module>
```

Diferencia general:

- MCP conecta herramientas externas.
- Plugin extiende el comportamiento de OpenCode.

---

# Proyecto práctico del curso

## Rama inicial

Rama sugerida:

```bash
main
```

Características:

- Sin README.
- Sin AGENTS.md.
- Sin documentación.
- Sin pruebas.
- Proyecto funcional de forma parcial.
- Arquitectura razonable.
- Errores pequeños e intencionales.

Ejemplos de problemas intencionales:

- endpoint Go que no valida un campo obligatorio;
- cálculo incorrecto en un servicio;
- error de manejo de estados en Angular;
- contrato de cambio de estado desalineado entre frontend y backend;
- mensaje de error genérico;
- servicio Angular con responsabilidad mezclada;
- comando de arranque no documentado;
- falta de `.env.example`;
- configuración local poco clara.

Nota para instructores: el caso concreto de contrato es `PATCH /tasks/{id}/status` en frontend/contrato compartido contra `PATCH /tasks/status?id=...` en backend. No conviene anticiparlo a participantes antes del ejercicio de diagnóstico.

## Rama con contexto

Rama sugerida:

```bash
with-agent-context
```

Debe agregar:

- `README.md`;
- `AGENTS.md`;
- `docs/architecture.md`;
- `docs/local-development.md`;
- `docs/testing.md`;
- opcionalmente pruebas mínimas.

---

# Prompts base del curso

## Explorar sin modificar

```text
Explora este proyecto y explícame cómo está organizado.
No modifiques archivos.
Dime qué tecnologías usa, cuáles son los puntos de entrada y qué dudas tienes.
```

## Pedir plan antes de implementar

```text
Quiero resolver el siguiente problema: [describir problema].
Primero explora el código relacionado y propón un plan.
No modifiques archivos todavía.
```

## Implementar con alcance limitado

```text
Implementa solo el cambio aprobado.
Restricciones:
- No cambies comportamiento no relacionado.
- No hagas refactors grandes.
- Mantén el cambio pequeño y revisable.
- Al final explica el diff y cómo verificarlo.
```

## Revisar cambios

```text
Revisa este diff como si fueras reviewer.
Enfócate en:
- bugs;
- regresiones;
- seguridad;
- legibilidad;
- pruebas faltantes.
```

## Documentar aprendizaje

```text
Crea una guía breve para levantar este proyecto localmente.
Incluye requisitos, comandos principales y problemas comunes.
```

---

# Buenas prácticas para el equipo

## Hacer

- Pedir exploración antes de cambios.
- Pedir planes antes de implementar.
- Mantener cambios pequeños.
- Revisar siempre el diff.
- Ejecutar pruebas o verificaciones.
- Pedir explicación del cambio.
- Usar Git como red de seguridad.
- Dar contexto claro al agente.

## Evitar

- Pedir cambios enormes.
- Aceptar código sin entenderlo.
- Compartir secretos.
- Mezclar muchas tareas en una sola petición.
- Dejar que el agente invente reglas de negocio.
- Usar MCPs o plugins sin entender permisos.

---

# Resultado esperado

Al finalizar el curso, el equipo debería poder:

- instalar y abrir OpenCode;
- usar OpenCode desde TUI, VS Code/IDE compatible o Web UI;
- explorar un repositorio desconocido;
- levantar un proyecto con ayuda del agente;
- pedir planes antes de implementar;
- detectar errores pequeños;
- aplicar cambios controlados;
- revisar diffs;
- entender para qué sirven README y AGENTS.md;
- conocer el propósito básico de MCPs y plugins;
- usar OpenCode como herramienta sin perder criterio técnico.

## Frase de cierre

> OpenCode no reemplaza tu criterio. Amplifica tu capacidad cuando sabes dirigirlo.
