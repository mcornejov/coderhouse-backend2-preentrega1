# Café Aurora · Plataforma de Eventos e Inscripciones

Base arquitectónica del proyecto de **Backend II** de CoderHouse: una API REST con Express
organizada por capas y preparada para crecer hacia una plataforma completa de eventos con
autenticación, roles, inscripciones y control de cupos.

## Temática elegida

**Café Aurora** es una cafetería de especialidad (marca que acompaña todos mis proyectos de la
carrera Fullstack) que organiza eventos para su comunidad: catas de café, talleres de barismo,
charlas con productores y noches de música en vivo. La plataforma permitirá publicar esos eventos
y gestionar las inscripciones de los clientes.

En esta primera entrega se construye únicamente la **estructura base**: servidor Express,
variables de entorno, separación en capas y modelos iniciales de `User` y `Event`. La lógica de
autenticación, eventos completos e inscripciones se incorpora en las próximas entregas.

## Tecnologías

| Tecnología | Uso |
|------------|-----|
| Node.js (>= 20.19) | Entorno de ejecución, módulos ESM |
| Express 5 | Servidor HTTP y enrutamiento |
| dotenv | Variables de entorno |
| Mongoose | Definición de modelos (`User`, `Event`); conexión opcional en esta etapa |
| node:test + supertest | Tests de integración de la API |
| pnpm | Gestor de paquetes |

## Instalación

```bash
git clone https://github.com/mcornejov/coderhouse-backend2-preentrega1.git
cd coderhouse-backend2-preentrega1
pnpm install
```

> Si no usas pnpm, `npm install` también funciona.

## Configuración de variables de entorno

Copia el archivo de ejemplo y ajusta los valores:

```bash
cp .env.example .env
```

| Variable | Descripción | Obligatoria |
|----------|-------------|-------------|
| `PORT` | Puerto donde escucha el servidor | Sí |
| `NODE_ENV` | Entorno: `development`, `production` o `test` | Sí |
| `MONGO_URL` | Cadena de conexión a MongoDB. Si está vacía o no se puede conectar, el servidor arranca sin base de datos (los datos viven en memoria) | No, por ahora |
| `JWT_SECRET` | Secreto para firmar tokens JWT (se usará en la autenticación) | No, por ahora |

El archivo `.env` está excluido del repositorio mediante `.gitignore`; nunca se versionan
credenciales.

## Cómo ejecutar

```bash
pnpm start      # producción: node src/server.js
pnpm dev        # desarrollo: reinicia automáticamente al guardar cambios
pnpm test       # ejecuta la suite de tests
```

Con la configuración por defecto el servidor queda disponible en `http://localhost:8080`.

## Estructura de carpetas

```
coderhouse-backend2-preentrega1/
├── src/
│   ├── app.js                    # configura Express (middlewares y routers); no levanta el server
│   ├── server.js                 # punto de entrada: conecta la base y levanta el servidor
│   ├── config/
│   │   ├── env.config.js         # carga y valida variables de entorno (Fail-Fast)
│   │   └── db.config.js          # conexión a MongoDB (opcional en esta etapa)
│   ├── routes/
│   │   ├── index.js              # router principal: monta los recursos bajo /api
│   │   ├── health.router.js
│   │   ├── events.router.js
│   │   └── sessions.router.js
│   ├── controllers/
│   │   ├── health.controller.js
│   │   ├── events.controller.js
│   │   └── sessions.controller.js
│   ├── services/
│   │   └── events.service.js     # reglas de negocio de eventos
│   ├── repositories/
│   │   └── events.repository.js  # abstracción del acceso a datos
│   ├── dao/
│   │   └── events.dao.js         # persistencia (en memoria en esta etapa)
│   ├── models/
│   │   ├── User.js               # esquema base de usuario
│   │   └── Event.js              # esquema base de evento
│   ├── middlewares/
│   │   ├── notFound.middleware.js
│   │   └── error.middleware.js   # manejador global de errores
│   └── utils/
│       ├── errors.util.js        # errores con código HTTP (HttpError, NotFoundError, ...)
│       └── responses.util.js     # helpers de respuesta uniforme
├── test/
│   └── api.test.js
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

### Flujo de una petición

```
Cliente → routes → controllers → services → repositories → dao → (models / base de datos)
```

- **routes**: mapean URL y método HTTP al controlador.
- **controllers**: extraen datos de la petición y responden en HTTP; no contienen lógica de negocio.
- **services**: reglas de negocio; no conocen HTTP ni la base de datos.
- **repositories**: abstraen el acceso a datos y, más adelante, la transformación a DTO.
- **dao**: única capa que sabe cómo se guardan los datos.
- **middlewares**: lógica transversal (404, manejo global de errores; luego autenticación y validación).

## Rutas disponibles

| Método | Ruta | Descripción | Respuesta |
|--------|------|-------------|-----------|
| GET | `/api/health` | Estado del servidor | `200` `{ "status": "ok", "message": "Servidor activo" }` |
| GET | `/api/events` | Lista de eventos (vacía al inicio) | `200` `{ "status": "success", "payload": [] }` |
| GET | `/api/events/:eid` | Detalle de un evento | `200` con el evento, o `404` si no existe |
| POST | `/api/sessions/register` | Registro de usuario | `501` hasta implementar la autenticación |
| POST | `/api/sessions/login` | Inicio de sesión | `501` hasta implementar la autenticación |
| GET | `/api/sessions/current` | Usuario autenticado actual | `501` hasta implementar la autenticación |
| POST | `/api/sessions/logout` | Cierre de sesión | `501` hasta implementar la autenticación |

Cualquier ruta no definida responde `404`; un cuerpo JSON inválido o una URL mal codificada
responden `400`. Todos los errores usan el formato `{ "status": "error", "error": "..." }`.

### Ejemplo

```bash
curl http://localhost:8080/api/health
# {"status":"ok","message":"Servidor activo"}

curl http://localhost:8080/api/events
# {"status":"success","payload":[]}
```

## Modelos iniciales

- **User**: `first_name`, `last_name`, `email` (único), `age`, `password`, `role` (`user` | `admin`).
- **Event**: `title`, `description`, `date`, `location`, `capacity`, `price`, `status`
  (`draft` | `published` | `cancelled` | `finished`), `organizer` (referencia a `User`).

## Próximos pasos

Registro y login con bcrypt, Passport y JWT, autorización por roles, CRUD completo de eventos con
MongoDB Atlas, inscripciones con control de cupos y notificaciones.
