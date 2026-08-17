# Desarrollo local

Usa dos terminales: una para la API en Go y otra para la aplicación web en Angular.

## Requisitos previos

| Herramienta | Uso |
|------|----------|
| Go | Ejecutar y probar la API. |
| Node.js | Instalar y ejecutar la aplicación Angular. |
| npm | Instalar dependencias web y ejecutar scripts. |

## Configuración inicial

Desde la raíz del repositorio:

```bash
cd apps/web
npm install
```

No se requiere base de datos, contenedor ni servicio externo. La API almacena tareas en memoria.

## Ejecutar la API

```bash
cd apps/api
go run ./cmd/server
```

Salida esperada:

```text
Team Tasks API listening on http://localhost:8080
```

Verificación de salud opcional:

```bash
curl http://localhost:8080/health
```

Respuesta esperada:

```json
{"status":"ok"}
```

## Ejecutar la aplicación web

En una segunda terminal:

```bash
cd apps/web
npm start -- --host 127.0.0.1 --port 4200
```

Abre:

```text
http://127.0.0.1:4200
```

## Comandos útiles de verificación

```bash
cd apps/api && go test ./...
cd apps/web && npm run build
```

## Solución de problemas

### Página en blanco

- Confirma que el servidor de desarrollo web siga ejecutándose.
- Revisa la consola del navegador para detectar errores de Angular o de red.
- Ejecuta `cd apps/web && npm run build` para detectar problemas de compilación.
- Confirma que abriste `http://127.0.0.1:4200`, no la URL de la API.

### Los datos de la API no cargan

- Confirma que la API se esté ejecutando en `http://localhost:8080`.
- Visita `http://localhost:8080/health` y espera `{"status":"ok"}`.
- Revisa la pestaña Network del navegador para detectar solicitudes fallidas.
- Si el comportamiento cruza el límite de la API, revisa `apps/api`, `apps/web` y `packages/shared` antes de editar.

### Errores de CORS

- La API permite orígenes de desarrollo que empiezan con `http://localhost:` y `http://127.0.0.1:`.
- Inicia la aplicación web con `--host 127.0.0.1 --port 4200` para coincidir con la configuración local esperada.
- Reinicia la API después de cambiar código relacionado con CORS.

### Puerto ya en uso

- Valor por defecto de la API: `8080`.
- Valor por defecto de la web en los comandos de este repositorio: `4200`.
- Detén el proceso que usa el puerto, o elige otro puerto web y abre la URL correspondiente.
- Si cambias el puerto de la API, actualiza la configuración de la API en frontend de forma deliberada.

### `npm install` falla

- Verifica que Node.js y npm estén instalados y disponibles en `PATH`.
- Ejecuta el comando desde `apps/web`, no desde la raíz del repositorio.
- Si las dependencias ya están instaladas pero fallan, elimina `apps/web/node_modules` y ejecuta `npm install` de nuevo.

### `npm run build` falla

- Lee el primer error de TypeScript o Angular en la salida; los errores posteriores pueden ser fallos en cascada.
- Confirma que el comando se ejecute desde `apps/web`.
- Revisa ediciones recientes en componentes, modelos y el servicio de API.

### El servidor Go no inicia

- Confirma que el comando se ejecute desde `apps/api`.
- Ejecuta `go test ./...` para detectar errores de compilación.
- Si el puerto `8080` ya está en uso, detén el proceso existente antes de reiniciar la API.
