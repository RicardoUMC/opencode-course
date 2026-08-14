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
- [ ] Tengo credenciales o configuración para el proveedor/modelo que usará OpenCode.
- [ ] Sé revisar un `diff` antes de aceptar cambios.

## Instalación y primer uso

Checklist recomendado:

- [ ] Instalar OpenCode según las instrucciones del equipo.
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

## Uso en TUI y terminal de VS Code

### TUI

Usa la TUI para trabajo interactivo y revisión paso a paso:

- mantén el repositorio como directorio actual;
- pide cambios pequeños y verificables;
- revisa cada archivo antes de aceptar;
- corta la tarea si el agente empieza a ampliar el alcance.

### Terminal integrada de VS Code

Usa la terminal de VS Code cuando quieras ver código, diffs y ejecución en el mismo entorno:

- abre la terminal en la raíz del proyecto;
- ejecuta OpenCode ahí para que el contexto sea correcto;
- mantén visible el panel de Source Control;
- revisa cambios con el diff del editor antes de continuar.

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

1. **Explorar**: entender estructura, lenguajes y puntos de entrada.
2. **Levantar**: identificar comandos para backend y frontend.
3. **Diagnosticar**: encontrar problemas pequeños con evidencia.
4. **Corregir**: pedir cambios quirúrgicos, no refactors grandes.
5. **Verificar**: ejecutar comandos y revisar resultados.
6. **Documentar**: capturar lo aprendido para futuros agentes y personas.
7. **Comparar**: repetir con más contexto y observar si mejora la calidad del agente.

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
