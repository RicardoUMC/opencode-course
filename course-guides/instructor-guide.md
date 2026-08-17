# Guía del instructor — Curso práctico de OpenCode

Esta guía es un guion de facilitación. Úsala para conducir el curso como 3 sesiones de 2 horas o como un workshop intensivo de 5 a 6 horas.

## Metodología del curso

Cada bloque sigue el mismo ciclo:

1. **Concepto**: explicar qué idea se está practicando.
2. **Demo**: mostrar el uso con un ejemplo pequeño.
3. **Práctica guiada**: pedir al grupo que ejecute un prompt concreto.
4. **Reflexión**: comparar resultado, riesgos y decisiones humanas.
5. **Siguiente nivel**: conectar con el bloque siguiente.

Mensaje central para repetir durante el curso:

> OpenCode no reemplaza tu criterio técnico. Lo amplifica cuando sabes darle contexto, límites y verificación.

## Formatos sugeridos

| Formato | Uso recomendado |
|---------|-----------------|
| 3 sesiones de 2 horas | Mejor para aprendizaje progresivo, pausa entre ejercicios y discusión. |
| 1 workshop de 5 a 6 horas | Mejor para un equipo que necesita una introducción completa en una sola jornada. |

Si se usa workshop único, mantén descansos breves entre exploración, corrección y comparación con contexto.

## Mapa de la jornada

| Etapa | Tiempo sugerido | Lugar en el viaje | Resultado esperado |
|-------|-----------------|-------------------|--------------------|
| 1. Setup y modos de uso | 20-30 min | Preparar herramienta y entorno | Participantes abren OpenCode en el repositorio. |
| 2. Rama sin contexto | 30-40 min | Llegar a un proyecto desconocido | El agente explora sin documentación explícita. |
| 3. Levantar proyecto | 30-45 min | Convertir incertidumbre en pasos ejecutables | Backend y frontend identificados y, si es posible, corriendo. |
| 4. Diagnóstico | 30-45 min | Encontrar un problema con evidencia | El grupo detecta el fallo al marcar una tarea como completada. |
| 5. Corrección controlada | 30-45 min | Cambiar poco y verificar | Un cambio acotado, revisable y explicado. |
| 6. Comparar con contexto | 30-40 min | Ver el valor de README/docs/AGENTS | El agente responde mejor con contexto explícito. |
| 7. Configuración avanzada | 20-30 min | Cerrar con posibilidades y riesgos | MCPs/plugins quedan como tema avanzado, no como foco inicial. |

---

# 1. Apertura, setup y modos de uso

## Objetivo

Instalar o abrir OpenCode, ubicar el repositorio y mostrar que puede usarse desde TUI, IDE y Web UI.

## Framing del instructor

Di algo como:

> Vamos a trabajar como en un proyecto real: primero entendemos, luego ejecutamos, después diagnosticamos y solo al final cambiamos código. Nada de pedir “arregla todo”. El control lo tiene la persona desarrolladora.

Link oficial:

```txt
https://opencode.ai/
```

Modos de uso:

```bash
opencode
opencode .
```

Para VS Code o IDE compatible: abrir el proyecto y usar la terminal integrada para ejecutar `opencode`. El curso no depende de enseñar una extensión específica; si el equipo usa la integración de OpenCode para IDE, trátala como una comodidad adicional para revisar archivos y diffs.

Web UI:

```bash
opencode web
opencode web --port 4096
opencode attach http://localhost:4096
```

## Actividad del participante

Abrir una terminal en la raíz del repositorio y confirmar que OpenCode inicia dentro del proyecto.

## Prompt a usar

```text
Confirma en qué carpeta estoy trabajando y dime qué archivos ves en la raíz.
No modifiques archivos.
```

## Resultado esperado

El agente reconoce el directorio del proyecto y no modifica archivos.

## Pregunta de debrief

¿Qué riesgo aparece si abrimos OpenCode desde la carpeta equivocada?

---

# 2. Exploración en la rama sin contexto

## Objetivo

Mostrar cómo se comporta el agente cuando entra a un repositorio con poco contexto explícito.

## Framing del instructor

La rama inicial simula llegar a un proyecto existente sin README, sin `AGENTS.md`, sin `docs/` y sin instrucciones claras.

## Actividad del participante

Trabajar en la rama sin contexto, normalmente `main`, y pedir exploración sin permitir cambios.

## Prompt a usar

```text
Explora este proyecto y explícame qué parece hacer.
No modifiques archivos todavía.
Dime qué tecnologías usa, cómo está organizado y qué dudas tienes.
```

## Resultado esperado

El agente identifica monorepo, backend Go, frontend Angular y posibles puntos de entrada, pero puede dejar dudas sobre comandos o propósito.

## Pregunta de debrief

¿Qué información tuvo que inferir el agente en vez de leerla de documentación confiable?

---

# 3. Levantar backend y frontend

## Objetivo

Convertir la exploración en comandos verificables para ejecutar el proyecto.

## Framing del instructor

Refuerza que el agente puede proponer comandos, pero el desarrollador debe ejecutarlos, revisar errores y validar resultados.

## Actividad del participante

Pedir primero identificación de comandos, luego ejecutar backend y frontend.

## Prompt a usar

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

## Resultado esperado

Comandos esperados:

```bash
cd apps/api && go run ./cmd/server
cd apps/api && go test ./...
cd apps/web && npm install && npm start -- --host 127.0.0.1 --port 4200
cd apps/web && npm run build
```

Backend disponible en `http://localhost:8080` y frontend en `http://127.0.0.1:4200`.

## Pregunta de debrief

¿Qué parte fue evidencia del repositorio y qué parte fue suposición del agente?

---

# 4. Diagnóstico: acción Mark done

## Objetivo

Usar OpenCode para diagnosticar un fallo realista sin adelantar la respuesta.

## Framing del instructor

Pide al grupo observar la UI y probar acciones básicas. Si la acción `Mark done` falla, no reveles de inmediato la causa. Haz que pidan evidencia en frontend, backend y contrato compartido.

Nota para instructor: el desalineamiento intencional es `PATCH /tasks/{id}/status` en frontend/contrato compartido contra `PATCH /tasks/status?id=...` en backend.

## Actividad del participante

Reproducir el fallo y pedir un diagnóstico sin cambios.

## Prompt a usar

```text
La acción para marcar una tarea como completada falla.
Diagnostica la causa revisando frontend, backend y cualquier contrato compartido.
No modifiques archivos todavía.
Indica la evidencia concreta con rutas de archivo.
```

## Resultado esperado

El agente rastrea la llamada desde Angular, el contrato compartido y el router/handler Go, y encuentra una incompatibilidad de ruta.

## Pregunta de debrief

¿Por qué es peligroso corregir “lo primero que parece roto” sin rastrear ambos lados del contrato?

---

# 5. Corrección controlada

## Objetivo

Practicar una modificación quirúrgica: un problema, un cambio pequeño, verificación clara.

## Framing del instructor

Di algo como:

> Este es el momento donde más disciplina necesitamos. Si el agente intenta refactorizar media app, paramos. El objetivo es corregir el contrato con el menor cambio razonable.

## Actividad del participante

Aprobar un plan mínimo antes de modificar y luego revisar el diff.

## Prompt a usar

```text
Propón un plan mínimo para corregir solo este problema de contrato.
No modifiques archivos todavía.
Indica qué archivo cambiarías y cómo verificaríamos el resultado.
```

Después de aprobar el plan:

```text
Implementa solo el cambio aprobado.
Restricciones:
- No cambies comportamiento no relacionado.
- No hagas refactors grandes.
- Mantén el cambio pequeño y revisable.
- Al final explica el diff y cómo verificarlo.
```

## Resultado esperado

Un diff pequeño, explicación del cambio y pasos de verificación con build/test o prueba manual.

## Pregunta de debrief

¿Qué señales nos dicen que el cambio sigue siendo revisable?

---

# 6. Comparación con `with-agent-context`

## Objetivo

Demostrar cómo cambia la calidad del agente cuando el repositorio incluye contexto explícito.

## Framing del instructor

La comparación no busca “hacer trampa”; busca mostrar que los agentes trabajan mejor cuando el proyecto documenta intención, comandos y límites.

## Actividad del participante

Cambiar a la rama `with-agent-context` y repetir una exploración similar.

## Prompt a usar

```text
Explora este proyecto otra vez.
Usa la documentación disponible y dime si ahora puedes explicar mejor cómo levantarlo, probarlo y modificarlo.
No modifiques archivos.
```

## Resultado esperado

El agente usa `README.md`, `docs/` y posiblemente `AGENTS.md` para dar respuestas más concretas y con menos suposiciones.

## Pregunta de debrief

¿Qué mejoró: comandos, límites, arquitectura, verificación o confianza en la respuesta?

---

# 7. README, docs y `AGENTS.md`

## Objetivo

Mostrar qué contexto conviene escribir para personas y para agentes sin profundizar demasiado en configuración avanzada.

## Framing del instructor

Presenta `README.md` y `docs/` como documentación humana reutilizable. Presenta `AGENTS.md` tarde en el curso como un acuerdo de trabajo para agentes, no como magia.

## Actividad del participante

Pedir al agente que evalúe qué documentación ayudó y qué reglas seguiría para cambios futuros.

## Prompt a usar

```text
Revisa README.md, AGENTS.md y docs/.
Resume qué información ayuda a una persona y qué información ayuda específicamente a un agente.
No modifiques archivos.
```

## Resultado esperado

El grupo distingue documentación de proyecto, guías de desarrollo e instrucciones específicas para agentes.

## Pregunta de debrief

¿Qué debería vivir en README/docs y qué debería vivir en `AGENTS.md`?

---

# 8. MCPs y plugins como temas avanzados

## Objetivo

Cerrar mostrando posibilidades de configuración sin convertir el curso introductorio en una sesión de infraestructura.

## Framing del instructor

Di algo como:

> MCPs y plugins son poderosos, pero aumentan permisos y superficie de riesgo. Primero aprendemos a dirigir bien al agente dentro del repo; después conectamos herramientas externas.

## Actividad del participante

Discutir casos de uso y riesgos. No conectar herramientas reales con secretos durante el curso.

## Prompt a usar

```text
Explícame, a nivel introductorio, qué diferencia hay entre MCPs y plugins en OpenCode.
Incluye riesgos de permisos y datos sensibles.
No configures nada todavía.
```

## Resultado esperado

El grupo entiende que MCP conecta herramientas/fuentes externas y plugins extienden o personalizan OpenCode.

## Pregunta de debrief

¿Qué permisos aceptaríamos en un entorno de práctica y cuáles nunca activaríamos sin aprobación?

---

# Checklist de cierre

- [ ] Cada participante abrió OpenCode desde la raíz correcta.
- [ ] Se practicó exploración sin modificar archivos.
- [ ] Se identificaron comandos de backend y frontend.
- [ ] Se diagnosticó un problema con evidencia, no por intuición.
- [ ] Se aplicó o discutió una corrección pequeña y verificable.
- [ ] Se comparó la rama sin contexto con `with-agent-context`.
- [ ] Se explicó el valor de README, docs y `AGENTS.md`.
- [ ] MCPs/plugins quedaron como tema avanzado con énfasis en permisos.
- [ ] El grupo terminó con la regla: explorar, planear, limitar, verificar y revisar diff.
