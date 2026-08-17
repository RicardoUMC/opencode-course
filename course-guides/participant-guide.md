# Guía del participante

Esta guía te ayuda a usar OpenCode durante el curso sin perder el control técnico del repositorio. La idea no es “pedirle código a la IA”, sino aprender a dirigir un agente con intención, contexto y verificación.

## Audiencia

Este material es para desarrolladores que:

- trabajan con Git, terminal y un editor como VS Code;
- quieren usar OpenCode dentro de un proyecto realista;
- necesitan practicar exploración, diagnóstico, cambios pequeños y revisión;
- entienden que el criterio técnico sigue siendo responsabilidad humana.

## Checklist antes del curso

- [ ] Tengo acceso al repositorio del curso.
- [ ] Tengo Git instalado y puedo clonar repositorios.
- [ ] Tengo una terminal funcional.
- [ ] Tengo VS Code o un editor equivalente.
- [ ] Tengo Go disponible si quiero ejecutar el backend.
- [ ] Tengo Node.js disponible si quiero inspeccionar el frontend.
- [ ] Revisé la instalación oficial de OpenCode en `https://opencode.ai/`.
- [ ] Tengo credenciales o configuración para el proveedor/modelo que usará OpenCode.
- [ ] Sé revisar un `diff` antes de aceptar cambios.

## Instalación y primer uso

Sitio oficial y documentación:

```txt
https://opencode.ai/
```

Checklist recomendado:

- [ ] Instalar OpenCode siguiendo la documentación oficial o las instrucciones del equipo.
- [ ] Abrir una terminal en la raíz del repositorio.
- [ ] Ejecutar OpenCode desde el repositorio, no desde una carpeta cualquiera.
- [ ] Confirmar qué modelo/proveedor está usando.
- [ ] Hacer una primera pregunta de exploración, sin pedir cambios todavía.
- [ ] Revisar qué archivos leyó o modificó el agente.
- [ ] Ejecutar comandos de verificación manualmente cuando corresponda.

Primer prompt sugerido:

```txt
Explora este repositorio y dime qué tipo de proyecto parece ser. No modifiques archivos todavía.
```

## Modos de uso de OpenCode

### TUI

Usa la TUI para trabajo interactivo y revisión paso a paso:

```bash
opencode
opencode .
```

- mantén el repositorio como directorio actual;
- pide cambios pequeños y verificables;
- revisa cada archivo antes de aceptar;
- corta la tarea si el agente empieza a ampliar el alcance.

### VS Code o IDE compatible

Usa la terminal integrada de VS Code o de un IDE compatible cuando quieras ver código, diffs y ejecución en el mismo entorno:

- abre la terminal en la raíz del proyecto;
- ejecuta `opencode` ahí para que el contexto sea correcto;
- usa el editor para revisar archivos, diffs y Source Control mientras OpenCode corre en la terminal integrada;
- si tu entorno tiene integración o extensión de OpenCode, úsala como apoyo visual, no como requisito del curso;
- mantén visible el panel de Source Control;
- revisa cambios con el diff del editor antes de continuar.

### Web UI

Puedes abrir la interfaz web con:

```bash
opencode web
```

Opcionalmente, puedes elegir puerto y adjuntar una TUI al servidor web:

```bash
opencode web --port 4096
opencode attach http://localhost:4096
```

## Patrones de prompting seguro

Buenos prompts tienen tres partes: objetivo, alcance y restricción.

```txt
Encuentra el punto de entrada del backend. No modifiques archivos. Resume los comandos necesarios para ejecutarlo.
```

```txt
Corrige solo el problema de validación de creación de tareas. No refactorices la estructura. Después dime qué comando debería ejecutar para verificarlo.
```

```txt
Revisa este cambio como si fuera un PR. Señala riesgos concretos con archivo y línea cuando sea posible.
```

Evita prompts ambiguos como:

```txt
Arregla el proyecto.
```

```txt
Mejora todo lo que veas.
```

## Flujo de ejercicios

### 1. Confirmar contexto

```txt
Confirma en qué carpeta estoy trabajando y dime qué archivos ves en la raíz.
No modifiques archivos.
```

Resultado esperado: OpenCode reconoce el repositorio correcto antes de cualquier cambio.

### 2. Explorar sin modificar

```txt
Explora este proyecto y explícame qué parece hacer.
No modifiques archivos todavía.
Dime qué tecnologías usa, cómo está organizado y qué dudas tienes.
```

Resultado esperado: identificas estructura, tecnologías y puntos de entrada.

### 3. Levantar el proyecto

```txt
Ayúdame a levantar este proyecto localmente por primera vez.
Primero identifica los comandos necesarios.
No modifiques archivos todavía.
```

Luego:

```txt
Ahora ayúdame a ejecutar el backend y frontend.
Si falla algo, explícame la causa probable y propón una solución mínima.
```

Resultado esperado: obtienes comandos concretos para backend y frontend.

### 4. Diagnosticar con evidencia

```txt
La acción para marcar una tarea como completada falla.
Diagnostica la causa revisando frontend, backend y cualquier contrato compartido.
No modifiques archivos todavía.
Indica la evidencia concreta con rutas de archivo.
```

Resultado esperado: entiendes el problema antes de pedir cambios. No necesitas memorizar la respuesta; necesitas pedir evidencia.

### 5. Pedir plan antes de implementar

```txt
Propón un plan mínimo para corregir solo este problema de contrato.
No modifiques archivos todavía.
Indica qué archivo cambiarías y cómo verificaríamos el resultado.
```

Resultado esperado: apruebas o ajustas el plan antes de tocar archivos.

### 6. Corregir con alcance limitado

```txt
Implementa solo el cambio aprobado.
Restricciones:
- No cambies comportamiento no relacionado.
- No hagas refactors grandes.
- Mantén el cambio pequeño y revisable.
- Al final explica el diff y cómo verificarlo.
```

Resultado esperado: cambio pequeño, diff revisable y verificación clara.

### 7. Comparar con contexto

```txt
Explora este proyecto otra vez.
Usa la documentación disponible y dime si ahora puedes explicar mejor cómo levantarlo, probarlo y modificarlo.
No modifiques archivos.
```

Resultado esperado: comparas la calidad de respuesta entre una rama sin contexto y `with-agent-context`.

### 8. Reflexionar sobre documentación para agentes

```txt
Revisa README.md, AGENTS.md y docs/.
Resume qué información ayuda a una persona y qué información ayuda específicamente a un agente.
No modifiques archivos.
```

Resultado esperado: distingues documentación humana, documentación técnica e instrucciones para agentes.

## Estado local verificado

El proyecto práctico ya puede levantarse localmente con backend y frontend.

### Backend

Desde la raíz del repositorio:

```bash
cd apps/api
go run ./cmd/server
```

Resultado esperado:

- API disponible en `http://localhost:8080`.

Verificación disponible:

```bash
go test ./...
```

Nota: hoy pasa, pero todavía no hay archivos de prueba.

### Frontend

Desde la raíz del repositorio:

```bash
cd apps/web
npm install
npm start -- --host 127.0.0.1 --port 4200
```

Resultado esperado:

- aplicación disponible en `http://127.0.0.1:4200`;
- la pantalla carga y consume la API local;
- crear y listar tareas funciona.

Verificación disponible:

```bash
npm run build
```

### Qué observar

- El frontend usa CSS simple del proyecto, no Tailwind.
- Esto evita instalar herramientas extra durante el entrenamiento.
- Si una acción de estado falla, trátala como ejercicio de diagnóstico de contrato frontend/backend.

## Notas de seguridad sobre MCPs y plugins

- No conectes MCPs que den acceso a secretos, producción o datos sensibles durante ejercicios.
- Revisa qué permisos tiene cada plugin antes de activarlo.
- No pegues tokens, contraseñas ni datos personales en prompts.
- Si un MCP puede escribir en sistemas externos, úsalo solo con aprobación explícita.
- Prefiere entornos de práctica, cuentas sandbox y datos ficticios.

## Autoevaluación final

- [ ] Puedo explicar qué hizo OpenCode y por qué.
- [ ] Revisé los cambios antes de aceptarlos.
- [ ] Pedí tareas pequeñas y con límites claros.
- [ ] Verifiqué con comandos o inspección manual.
- [ ] Identifiqué al menos un riesgo de usar agentes sin contexto.
- [ ] Sé cuándo detener al agente y reformular el pedido.
